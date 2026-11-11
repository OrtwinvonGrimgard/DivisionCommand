/**
 * Bots: „Schloter“ (gewichteter Zufall) und „Test“ (Brett- und Handbewertung).
 *
 * t254: Der Test-Bot ordnet seinen Zug in Stufen (dringende Neutralisierung, Ausrüstung und
 * starke Fähigkeiten, Angriffe mit Vernichtung, übrige Ausspielungen, Rest), findet aktivierbare
 * Fähigkeiten eigener Karten, bewertet lageabhängige Soforteinsätze durch Vorausschau auf einer
 * Kopie (nur `dispatch`, keine nachgebauten Regeln) und prüft jede gewählte Aktion vorab.
 * Doku: docs/balance/BOT_KI_T254.md.
 *
 * Einziger erlaubter Regelzugriff ist `engine.listActions` / `engine.dispatch`
 * bzw. `Bot.step(engine, playerId)`. Keine eigenen Regeln.
 * Export: `window.DCBot`.
 */
(function (global) {
  'use strict';

  var DEFAULTS = {
    playChance: 75,
    instantChance: 30,
    delayMs: 350,
    model: 'test',
    aggression: 45,
    allowUnit: 1,
    allowSupport: 1,
    allowEquip: 1,
    allowInstant: 1,
    allowAttack: 1,
    holdAp: 1,
    // t254: Zugreihenfolge in Stufen (1) statt „erst alles ausspielen“ (0).
    tiered: 1,
    // t254: Sonder-Soforteinsätze und Fähigkeiten auf einer Kopie durchspielen und bewerten.
    lookahead: 1,
    // t254: gewählte Aktion vorher auf einer Kopie prüfen; scheitert sie, die nächstbeste nehmen.
    probe: 1,
    // t254: Bewertungspunkte, die ein AP in der Vorausschau kostet.
    apWeight: 4,
    // t254: Angriffe auf einer Kopie ausführen und Siegpunkt-Gewinne (Doktrinziele, Durchbruch) einpreisen.
    vpLook: 1
  };

  var cfg = {};
  Object.keys(DEFAULTS).forEach(function (k) { cfg[k] = DEFAULTS[k]; });

  /**
   * Zufälliges Element oder null.
   * @param {Array} arr
   * @returns {*}
   */
  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Ganzzahl aus der Bot-Konfiguration, begrenzt auf [min, max].
   * @param {string} key
   * @param {number} min
   * @param {number} max
   * @param {number} fallback
   * @returns {number}
   */
  function n(key, min, max, fallback) {
    var v = Number(cfg[key]);
    if (!isFinite(v)) v = fallback;
    return Math.max(min, Math.min(max, v));
  }

  /**
   * Katalogdefinition einer Hand- oder Feldkarte.
   * @param {object} engine
   * @param {object} card
   * @returns {object|null}
   */
  function defOf(engine, card) {
    try { return engine.defOf(card); } catch (e) { return {}; }
  }

  /**
   * Effektcodes der Definition.
   * @param {object} d
   * @returns {string[]}
   */
  function codes(d) {
    return ((d && d.effects) || []).map(function (x) { return x.code; });
  }

  /**
   * True, wenn die Definition den Effektcode besitzt.
   * @param {object} d
   * @param {string} code
   * @returns {boolean}
   */
  function hasCode(d, code) {
    return codes(d).indexOf(code) >= 0;
  }

  /* ------------------------------------------------------------------
   * t254: Vorausschau auf einer Kopie der Partie.
   * Der Bot rechnet keine Regeln nach: er spielt eine legale Aktion auf
   * einer tiefen Kopie über `dispatch` durch und bewertet das Brett danach.
   * ------------------------------------------------------------------ */

  /** Soforteinsätze, deren Wert stark von der Lage abhängt (Vorausschau statt Pauschalwert). */
  var LOOK_CODES = ['MASS_DEPLOY', 'EMPTY_STREETS', 'COMMAND_ATTACK', 'LAST_STAND', 'MOBILIZE_INF'];

  /** Effektcodes, hinter denen eine aktivierbare Fähigkeit stehen kann (Einheit, Unterstützung, Ausrüstung). */
  var ABILITY_CODES = ['FIRE_MISSION', 'DRONE_STRIKE', 'FEINT', 'HOSPITAL', 'REATTACK', 'SCOUT_DECK',
    'FETCH_EQUIP', 'SAT_PEEK', 'FOG_TOKEN', 'VERSCHIEBEN', 'JAM_DRONE', 'HIJACK_DRONE', 'TACTIC_DISCOUNT',
    'NEST_BED', 'REVEAL_STRIKE', 'AUFKLAERUNG', 'EQUIP_ONCE_PAIN_ATK', 'EQUIP_ONCE_DRAW_PAIN',
    'TACTICAL_INTERDICT', 'TACTICAL_COVER', 'TACTICAL_BIND'];

  /** Rekursionssperre: in der Vorausschau keine weitere Vorausschau und keine Probe. */
  var depth = 0;

  /**
   * True, wenn die Definition einen der Codes trägt.
   * @param {object} d
   * @param {string[]} list
   * @returns {boolean}
   */
  function hasAny(d, list) {
    return codes(d).some(function (c) { return list.indexOf(c) >= 0; });
  }

  /**
   * True, wenn die ausliegende Karte (oder eine angehängte Ausrüstung) eine Fähigkeit haben kann.
   * @param {object} engine
   * @param {object} inst
   * @returns {boolean}
   */
  function mayHaveAbility(engine, inst) {
    if (!inst || inst.facedown) return false;
    if (hasAny(defOf(engine, inst), ABILITY_CODES)) return true;
    return (inst.attachments || []).some(function (eq) { return hasAny(defOf(engine, eq), ABILITY_CODES); });
  }

  /**
   * Aktuelle Werte einer Instanz (Auren eingerechnet, wenn die Engine sie liefert).
   * @param {object} engine
   * @param {object} inst
   * @returns {{atk: number, def: number}}
   */
  function statsOf(engine, inst) {
    var d = defOf(engine, inst);
    var atk = inst.atk != null ? inst.atk : (Number(d.atk) || 0);
    var dv = inst.def != null ? inst.def : (Number(d.def) || 0);
    try {
      if (engine.currentAtkDef) {
        var c = engine.currentAtkDef(inst);
        if (c && isFinite(c.atk)) atk = c.atk;
        if (c && isFinite(c.def)) dv = c.def;
      }
    } catch (e) { /* Werte aus der Instanz genügen */ }
    return { atk: Number(atk) || 0, def: Number(dv) || 0 };
  }

  /**
   * Grober Materialwert einer Seite: Front, Unterstützung, Hand, Siegpunkte.
   * @param {object} engine
   * @param {object} p Spieler
   * @returns {number}
   */
  function sideValue(engine, p) {
    var v = 0;
    engine.frontList(p).forEach(function (l) {
      var st = statsOf(engine, l.inst);
      v += 8 + st.atk * 3 + Math.max(0, st.def) * 2;
      // „Der Letzte der steht“: fällt sie, bekommt der Gegner 1 SP.
      if (l.inst.flags && l.inst.flags.letzterDerSteht) v -= 14;
    });
    (p.support || []).forEach(function (s) { if (s) v += 7; });
    v += (p.hand || []).length * 3;
    v += (Number(p.vp) || 0) * 30;
    return v;
  }

  /**
   * Brettbewertung aus Sicht von `pid` (eigener minus gegnerischer Wert, Sieg/Niederlage dominiert).
   * @param {object} engine
   * @param {number} pid
   * @returns {number}
   */
  function evalBoard(engine, pid) {
    var st = engine.state;
    if (st && st.winner != null) return st.winner === pid ? 1e4 : (st.winner === null ? 0 : -1e4);
    return sideValue(engine, engine.player(pid)) - sideValue(engine, engine.opponent(pid));
  }

  /**
   * Tiefe Kopie der Partie für Proben. Gleicher Prototyp, eigener Zustand, eigener Zufall,
   * stumme Ereignisse; der echte Spielstand und sein Zufallsstrom bleiben unberührt.
   * @param {object} engine
   * @returns {object}
   */
  function cloneEngine(engine) {
    var c = Object.create(Object.getPrototypeOf(engine));
    // t256: Keine eigenen Funktions-Properties übernehmen. Die Oberfläche hängt Hooks als
    // eigenes `dispatch` an (Playtest-Logger, LAN). Kopiert, liefen Proben über den an die
    // ECHTE Engine gebundenen Hook: der Bot veränderte den echten Stand, und der Logger rief
    // bei jeder Probe erneut DCBot.step auf (Rekursion → Browser hing beim Ausspielen).
    Object.keys(engine).forEach(function (k) {
      if (typeof engine[k] === 'function') return;
      if (k === '_playLogHooked' || k === '_dcNetHooked') return;
      c[k] = engine[k];
    });
    c.state = JSON.parse(JSON.stringify(engine.state));
    c.state._muteEvents = true;
    c.log = [];
    var s = (((engine.state && engine.state.seq) || 1) * 2654435761) >>> 0 || 1;
    c.rand = function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
    return c;
  }

  /**
   * Prüft eine Aktion auf einer Kopie. Ändert den echten Stand nicht.
   * @param {object} engine
   * @param {object} act
   * @returns {boolean} true, wenn `dispatch` die Aktion annimmt
   */
  function probeOk(engine, act) {
    try {
      var c = cloneEngine(engine);
      var r = c.dispatch(act);
      return !!(r && r.ok);
    } catch (e) { return false; }
  }


  /**
   * t254: Siegpunkt-Saldo einer Aktion (eigene minus gegnerische SP-Änderung) auf einer Kopie.
   * Erfasst Doktrinziele, Elite-Abschüsse, Durchbruch und den SP aus „Der Letzte der steht“ ohne eigene Regeln.
   * @param {object} engine
   * @param {number} pid
   * @param {object} act
   * @returns {number|null} null, wenn `dispatch` die Aktion ablehnt
   */
  function vpSwing(engine, pid, act) {
    try {
      var c = cloneEngine(engine);
      var me0 = Number(engine.player(pid).vp) || 0, op0 = Number(engine.opponent(pid).vp) || 0;
      var r = c.dispatch(act);
      if (!r || !r.ok) return null;
      if (c.state.winner === pid) return 10;
      var d = (Number(c.player(pid).vp) || 0) - me0 - ((Number(c.opponent(pid).vp) || 0) - op0);
      if (c.state.winner != null && c.state.winner !== pid) d -= 10;
      return d;
    } catch (e) { return null; }
  }

  /**
   * Spielt `act` auf einer Kopie und löst eigene Folgewahlen mit dem Bot selbst auf.
   * @param {object} engine
   * @param {number} pid
   * @param {object} act
   * @returns {{ok: boolean, delta?: number, apSpent?: number}}
   */
  function lookahead(engine, pid, act) {
    if (depth > 0) return { ok: false };
    var before = evalBoard(engine, pid);
    var ap0 = engine.player(pid).ap;
    depth++;
    try {
      var c = cloneEngine(engine);
      var r = c.dispatch(act);
      if (!r || !r.ok) return { ok: false };
      var steps = 0;
      while (c.state.winner == null && c.state.pending && c.state.pending.player === pid && steps++ < 40) {
        var a = stepTest(c, pid, {});
        if (!a || a.type === 'END_TURN') break;
        if (a.player == null) a.player = pid;
        var r2 = c.dispatch(a);
        if (!r2 || !r2.ok) { try { c.dispatch({ type: 'CANCEL_PENDING', player: pid }); } catch (e2) { /* egal */ } break; }
      }
      return { ok: true, delta: evalBoard(c, pid) - before, apSpent: ap0 - c.player(pid).ap };
    } catch (e) {
      return { ok: false };
    } finally {
      depth--;
    }
  }

  /**
   * Vorausschau-Ergebnis in die Bewertungsskala von `scorePlay` übersetzen.
   * Eine 2/3-Einheit für 2 AP liegt dort bei etwa 30 Punkten.
   * @param {{delta: number, apSpent: number}} la
   * @returns {number}
   */
  function lookScore(la) {
    var w = n('apWeight', 0, 20, 4);
    return 10 + 1.4 * la.delta - w * Math.max(0, la.apSpent);
  }

  /**
   * Anzahl eigener Fronteinheiten.
   * @param {object} engine
   * @param {number} pid
   * @returns {number}
   */
  function frontCount(engine, pid) {
    var p = engine.player(pid);
    return engine.frontList(p).length;
  }

  /**
   * Anzahl leerer eigener Frontstellungen.
   * @param {object} engine
   * @param {number} pid
   * @returns {number}
   */
  function emptyFront(engine, pid) {
    return 9 - frontCount(engine, pid);
  }

  /**
   * Grobe Bedrohungsschätzung (gegnerische Frontstärke).
   * @param {object} engine
   * @param {number} pid
   * @returns {number}
   */
  function threat(engine, pid) {
    var opp = engine.opponent(pid);
    var t = 0;
    engine.frontList(opp).forEach(function (l) {
      var d = defOf(engine, l.inst);
      t += (Number(d.atk) || 0) + (Number(d.def) || 0) * 0.4;
    });
    return t;
  }

  /**
   * Wie sehr der Bot noch Einheiten nachlegen sollte.
   * @param {object} engine
   * @param {number} pid
   * @returns {number}
   */
  function reserveNeed(engine, pid) {
    var p = engine.player(pid);
    var need = 1;
    p.hand.forEach(function (c) {
      var d = defOf(engine, c);
      if (d.typ !== 'Soforteinsatz') return;
      if (hasCode(d, 'CANCEL_AIR_DAMAGE') || hasCode(d, 'PAUSE_UNIT') || hasCode(d, 'LAY_MINE') || hasCode(d, 'AMMO_COOK')) need = Math.max(need, 1);
    });
    return need;
  }


  /**
   * t254: Schlagwert gegen ein feindliches Ziel bei `dmg` Schaden (Vernichtung zählt am meisten).
   * @param {object} engine
   * @param {object} loc Ziel (findInst)
   * @param {number} dmg
   * @returns {number}
   */
  function hitValue(engine, loc, dmg) {
    var st = statsOf(engine, loc.inst);
    var v = st.atk * 2 + 2;
    if (dmg >= st.def) v += 20 + st.atk * 2 + Math.min(st.def, 6);
    else v += Math.max(0, 6 - (st.def - dmg) * 2);
    if (loc.inst.facedown) v += 3;
    if (loc.zone === 'support') v += 4;
    return v;
  }

  /**
   * t254: Antworten auf Wahlfenster mit eigener Logik (Überlebende, befohlene Angriffe, Schadensziele).
   * Liefert null, wenn die allgemeine Bewertung greifen soll.
   * @param {object} engine
   * @param {number} pid
   * @param {object} act
   * @param {object} pend
   * @returns {number|null}
   */
  function scorePendingKind(engine, pid, act, pend) {
    if (!pend || act.confirm || !act.target) return null;
    // Deck-Suchen (Mobilisierung, Einsame Gassen): stärkste Einheiten aus dem Pool nehmen.
    var poolCard = (pend.pool || []).find(function (c) { return c && typeof c === 'object' && c.uid === act.target; });
    if (poolCard) {
      var pd = defOf(engine, poolCard);
      return 10 + (Number(pd.atk) || 0) * 3 + (Number(pd.def) || 0) * 2;
    }
    var loc = engine.findInst(act.target);
    if (!loc) return null;
    var mine = loc.player && loc.player.id === pid;
    var st = statsOf(engine, loc.inst);
    if (pend.kind === 'last-stand' && mine) {
      // Überlebende: stärkste Einheit, Elite bevorzugt.
      var d = defOf(engine, loc.inst);
      return 10 + st.atk * 3 + st.def * 2 + (d.klasse === 'Elite' ? 4 : 0);
    }
    if ((pend.kind === 'command-atk' || pend.kind === 'attack-target') && !mine) {
      var aUid = pend.attackerUid || pend.attacker;
      var aLoc = aUid ? engine.findInst(aUid) : null;
      var dmg = aLoc ? statsOf(engine, aLoc.inst).atk : 0;
      var v = 10 + hitValue(engine, loc, dmg);
      // Gegenschlag einer überlebenden Einheit einpreisen.
      if (aLoc && dmg < st.def) v -= st.atk * 1.2;
      if (act.cost != null && pend.baseCostSpent != null && act.cost > pend.baseCostSpent) v -= (act.cost - pend.baseCostSpent) * 3;
      return v;
    }
    if (pend.kind === 'fire-mission' && !mine) {
      return 10 + hitValue(engine, loc, Number(pend.dmg || 3));
    }
    return null;
  }

  /**
   * Bewertet eine Antwort auf ein offenes `pending`.
   * @param {object} engine
   * @param {number} pid
   * @param {object} act
   * @returns {number}
   */
  function scorePending(engine, pid, act) {
    var s = 1;
    var pend = engine.state && engine.state.pending;
    var special = scorePendingKind(engine, pid, act, pend);
    if (special != null) return special + Math.random() * 0.5;
    if (act.confirm) {
      // Massen/Mobilisierung: erst Einheiten wählen, wenn noch welche offen sind.
      var left = ((pend && pend.choices) || []).some(function (c) {
        return c.target && ((pend.selected || []).indexOf(c.target) < 0);
      });
      if (pend && (pend.kind === 'mass-pick' || pend.kind === 'mob-pick') && left) return -3 + Math.random();
      return 4 + Math.random();
    }
    var loc = act.target ? engine.findInst(act.target) : null;
    if (!loc && act.target && engine.player) {
      var pl = engine.player(pid);
      var handC = (pl.hand || []).find(function (c) { return c.uid === act.target; });
      if (handC) {
        var hd = defOf(engine, handC);
        return 10 + (Number(hd.atk) || 0) + (Number(hd.def) || 0) * 0.5 + Math.random();
      }
    }
    if (act.slot) {
      s += 8;
      if (act.slot.section === 'C') s += 2;
      return s + Math.random();
    }
    if (!loc) return s + Math.random();
    var mine = loc.player && loc.player.id === pid;
    var d = defOf(engine, loc.inst);
    if (mine) {
      s += (Number(d.atk) || 0) + (Number(d.def) || 0) * 0.5;
    } else {
      s += (Number(d.atk) || 0) * 2 + (Number(d.def) || 0);
      if (loc.inst.facedown) s += 6;
      if ((loc.inst.def || 0) <= 3) s += 8;
    }
    return s + Math.random();
  }


  /**
   * t254: True, wenn der Spieler eine Doktrin mit dem Effektcode hat.
   * @param {object} engine
   * @param {object} p
   * @param {string} code
   * @returns {boolean}
   */
  function ownDoctrine(engine, p, code) {
    try { return !!(engine._hasDoctrine && engine._hasDoctrine(p, code)); } catch (e) { return false; }
  }

  /**
   * t254: Anzahl offener gegnerischer Unterstützungskarten mit aktivierbarer Fähigkeit.
   * @param {object} engine
   * @param {number} pid
   * @returns {number}
   */
  function foeActiveSupports(engine, pid) {
    var opp = engine.opponent(pid);
    return (opp.support || []).filter(function (x) { return x && mayHaveAbility(engine, x); }).length;
  }

  /**
   * t254: True, wenn die Blitzkrieg-Sperre gegen den Gegner schon für seinen nächsten Zug steht.
   * @param {object} engine
   * @param {number} pid
   * @returns {boolean}
   */
  function lockAlreadySet(engine, pid) {
    var opp = engine.opponent(pid);
    return !!(opp.flags && opp.flags.blitzLock > 1);
  }

  /**
   * t259: Bewertet „Armageddon“ nach dem vollständigen Kartentext: Spielfeld beider Seiten
   * leer, beide Hände abgeworfen, beide ziehen 5. Lohnt nur, wenn der Gegner auf dem Brett
   * klar vorne liegt; der Handsaldo zählt mit (eigene Resthand geht verloren, Gegner bekommt
   * ebenfalls 5 frische Karten).
   * @param {object} engine
   * @param {number} pid
   * @param {object} act PLAY-Aktion mit Armageddon
   * @returns {number} Wert; deutlich negativ = Karte behalten
   */
  function scoreArmageddon(engine, pid, act) {
    var p = engine.player(pid), o = engine.opponent(pid);
    var board = evalBoard(engine, pid); // > 0: eigenes Brett stärker → Armageddon schadet
    var ownRest = Math.max(0, p.hand.length - 1); // ohne Armageddon selbst
    var handSwing = (5 - ownRest) - (5 - o.hand.length);
    var s = -board * 1.2 + handSwing * 3 - 10;
    if (frontCount(engine, o.id) === 0 && (o.support || []).every(function (x) { return !x; })) s -= 60;
    return s > 0 ? 10 + s : -150;
  }

  /**
   * Bewertet eine PLAY-Aktion (Test-Bot).
   * @param {object} engine
   * @param {number} pid
   * @param {object} act
   * @returns {number}
   */
  function scorePlay(engine, pid, act) {
    var p = engine.player(pid);
    var d = engine.byId ? engine.byId[act.cardId] : null;
    if (!d) {
      var card = p.hand.find(function (c) { return c.uid === act.uid; });
      d = card ? defOf(engine, card) : {};
    }
    var cost = Number(act.cost || d.ap || 0);
    var apAfter = p.ap - cost;
    var empty = emptyFront(engine, pid);
    var s = 0;
    var tag = (d.tags || []).join(' ');

    if (d.typ === 'Einheit') {
      s += 18 + (Number(d.atk) || 0) * 3.2 + (Number(d.def) || 0) * 2.2;
      if (empty <= 0) s -= 90;
      else if (empty >= 6) s += 10;
      if (tag.indexOf('artillerie') >= 0) s += 7;
      if (tag.indexOf('aufklaerung') >= 0 && threat(engine, pid) > 8) s += 6;
      if (hasCode(d, 'ATTACK_ANY_FRONT')) s += 8;
      if (frontCount(engine, pid) === 0) s += 14;
    } else if (d.typ === 'Unterstützung') {
      s += 16;
      if (empty >= 7 && frontCount(engine, pid) === 0) s -= 6;
    } else if (d.typ === 'Ausrüstung') {
      s += frontCount(engine, pid) ? 20 : -50;
      if (hasCode(d, 'EQUIP_STAT') || hasCode(d, 'SCHANZEN') || hasCode(d, 'MEDIZIN')) s += 6;
    } else if (d.typ === 'Soforteinsatz') {
      s += 4;
      if (hasCode(d, 'CANCEL_AIR_DAMAGE')) s -= 25;
      if (hasCode(d, 'PAUSE_UNIT') && frontCount(engine, engine.opponent(pid).id) > 0) s += 8;
      if (hasCode(d, 'LAY_MINE')) s += frontCount(engine, pid) ? 10 : 0;
      if (hasCode(d, 'NAPALM') || hasCode(d, 'AIR_STRIKE')) s += threat(engine, pid) > 12 ? 12 : 2;
      if (hasCode(d, 'ARMAGEDDON')) return Number(cfg.allowInstant) ? scoreArmageddon(engine, pid, act) : -200;
    }

    // t254: Doktrin Blitzkrieg — Panzer ausspielen sperrt im nächsten gegnerischen Zug dessen Unterstützungsfähigkeiten.
    if (d.typ === 'Einheit' && tag.toLowerCase().indexOf('panzer') >= 0 && ownDoctrine(engine, p, 'BLITZ_LOCK_SUPPORT')) {
      s += 5;
      if (foeActiveSupports(engine, pid) > 0 && !lockAlreadySet(engine, pid)) s += 12;
      if ((d.keywords || []).indexOf('Gefechtsbereit') >= 0 && frontCount(engine, engine.opponent(pid).id) > 0) s += 4;
      // Trophy-Doktrinziel „Kill mit Panzer innerhalb von 2 Zügen nach Einrücken“ noch offen: frische Panzer bringen es.
      var row = p.trophy && p.trophy.doctrineProg && p.trophy.doctrineProg.dc_dok_blitzkrieg;
      if (row && !row.done && frontCount(engine, engine.opponent(pid).id) > 0) s += 6;
    }
    // t254: Vertragsclip (Soforteinsätze −1 AP) lohnt sich mit Soforteinsätzen auf der Hand.
    if (hasCode(d, 'EQUIP_DISCOUNT_AURA')) {
      var inst = 0;
      p.hand.forEach(function (c) { if (c.uid !== act.uid && defOf(engine, c).typ === 'Soforteinsatz') inst++; });
      s += inst ? inst * 4 - 8 : -30;
    }
    // t254: lageabhängige Soforteinsätze auf einer Kopie durchspielen statt pauschal bewerten.
    if (d.typ === 'Soforteinsatz' && Number(cfg.lookahead) && depth === 0 && hasAny(d, LOOK_CODES)) {
      var la = lookahead(engine, pid, { type: 'PLAY', player: pid, uid: act.uid });
      if (!la.ok) return -500;
      // Bringt der Einsatz auf dem Brett nichts (z. B. Massen ohne Einheiten auf der Hand), Karte behalten.
      if (la.delta <= 0) return -150;
      s = lookScore(la);
      if (!Number(cfg.allowInstant)) s = -200;
      return s;
    }

    var agg = n('aggression', 1, 100, 45);
    var hold = Number(cfg.holdAp) ? reserveNeed(engine, pid) : 0;
    if (agg >= 90) hold = 0;
    hold = Math.round(hold * (100 - agg) / 100);
    if (apAfter < hold) s -= (hold - apAfter) * 7;
    if (p.ap <= 2 && cost >= 3 && empty > 2 && agg < 70) s -= 12;
    if (d.typ === 'Einheit' && !Number(cfg.allowUnit)) s = -200;
    if (d.typ === 'Unterstützung' && !Number(cfg.allowSupport)) s = -200;
    if (d.typ === 'Ausrüstung' && !Number(cfg.allowEquip)) s = -200;
    if (d.typ === 'Soforteinsatz' && !Number(cfg.allowInstant)) s = -200;
    try {
      if (engine._trophyActive && engine._trophyActive() && d.typ === 'Einheit') {
        var frontN = 0;
        engine.frontList(p).forEach(function () { frontN++; });
        if (frontN === 0) s += 40; // avoid empty-front safety / get board presence
        else if (frontN <= 2) s += 12;
        var needVp2 = engine._trophyVpToWin ? engine._trophyVpToWin() : 5;
        if ((p.vp || 0) >= needVp2 - 2) s += 8;
      }
    } catch (eP) {}
    return s;
  }

  /**
   * Bewertet einen Angriff (Test-Bot).
   * @param {object} engine
   * @param {number} pid
   * @param {object} act
   * @returns {number}
   */
  function scoreAttack(engine, pid, act) {
    var p = engine.player(pid);
    var aLoc = engine.findInst(act.uid);
    if (!aLoc) return -1;
    var ad = defOf(engine, aLoc.inst);
    var isArtyAtk = false;
    try {
      isArtyAtk = !!(engine._isArtilleryAttacker && engine._isArtilleryAttacker(aLoc.inst));
    } catch (eAr) { isArtyAtk = ((ad.tags || []).join(' ').toLowerCase().indexOf('artillerie') >= 0); }
    var best = null;
    var bestS = -99;
    var bestKill = false;
    (act.targets || []).forEach(function (t) {
      var tCost = Number(t.cost != null ? t.cost : (act.cost || 1));
      if (p.ap < tCost) return;
      var loc = engine.findInst(t.uid);
      var ts = 6;
      var tk = false;
      if (tCost > 1) ts -= (tCost - 1) * 2;
      if (loc) {
        var td = defOf(engine, loc.inst);
        var atk = Number((engine.currentAtkDef && engine.currentAtkDef(aLoc.inst).atk) || ad.atk || 0);
        var defv = Number(loc.inst.def || td.def || 0);
        var tAtk = Number((engine.currentAtkDef && engine.currentAtkDef(loc.inst).atk) || td.atk || 0);
        ts += atk;
        if (atk >= defv) ts += 28;
        else ts += Math.max(0, 10 - (defv - atk));
        ts += tAtk * 1.4;
        if (loc.inst.facedown) ts += 5;
        tk = atk >= defv;
        // Trophy mode: actively pursue VP (elite, Durchbruch, doctrine, race)
        try {
          if (engine._trophyActive && engine._trophyActive()) {
            var me = engine.player(pid);
            var needVp = engine._trophyVpToWin ? engine._trophyVpToWin() : 5;
            var myVp = (me && me.vp) || 0;
            var race = myVp >= needVp - 2;
            var elite = engine._isEliteDef ? engine._isEliteDef(td) : ((td.tags || []).join(' ').toLowerCase().indexOf('elite') >= 0 || td.klasse === 'Elite');
            if (elite && atk >= defv) ts += 48 + (race ? 20 : 0);
            else if (elite) ts += 18;
            if (atk >= defv) {
              ts += 10 + (race ? 14 : 0); // any kill advances doctrine / tempo
              var bagA = ((ad.tags || []).join(' ') + ' ' + (ad.klasse || '')).toLowerCase();
              if (bagA.indexOf('infanterie') >= 0) ts += 10;
              if (engine._isArtilleryAttacker && engine._isArtilleryAttacker(aLoc.inst)) ts += 8;
            }
            if (loc.zone === 'front') {
              var foeLeft = 0;
              engine.frontList(engine.player(loc.player.id)).forEach(function (l) {
                if (l.section === loc.section) foeLeft++;
              });
              if (foeLeft <= 1 && atk >= defv) ts += 22 + (race ? 12 : 0); // Durchbruch clear
              else if (foeLeft <= 2 && atk >= defv) ts += 8;
            }
            if (me && me.trophy && me.trophy.doctrineProg) {
              Object.keys(me.trophy.doctrineProg).forEach(function (k) {
                var row = me.trophy.doctrineProg[k];
                if (!row || row.done) return;
                if (row.cur >= row.need - 1) ts += 12;
                else if (row.cur >= row.need - 2) ts += 5;
              });
            }
          }
        } catch (eT) {}
        var canCounter = true;
        if (isArtyAtk && engine._canReachForCounter) {
          try { canCounter = !!engine._canReachForCounter(loc, aLoc); } catch (e2) { canCounter = true; }
        } else if (!isArtyAtk) {
          canCounter = true;
        }
        if (isArtyAtk && !canCounter) {
          tk = true;
          ts += 22; // sicherer Artillerieschuss außer Reichweite
        } else if (canCounter && atk < defv) {
          ts -= tAtk * 1.6; // Gegenschlag-Risiko bei Nicht-Kill
        }
      }
      if (ts > bestS) { bestS = ts; best = t; bestKill = tk; }
    });
    var agg = n('aggression', 1, 100, 45);
    bestS += (agg - 50) * 0.55;
    if (agg >= 85) bestS += 12;
    var hold = Number(cfg.holdAp) && agg < 90 ? reserveNeed(engine, pid) : 0;
    if (p.ap - 1 < hold && bestS < 30) bestS -= 10;
    if (!Number(cfg.allowAttack)) bestS = -200;
    return { score: bestS, target: best && best.uid, kill: bestKill };
  }

  /**
   * True, wenn die Aktion ein Ausspielen von der Hand ist.
   * @param {object} a
   * @returns {boolean}
   */
  function playable(a) {
    if (!a || a.type !== 'PLAY') return false;
    if (a.typ === 'Einheit' && !Number(cfg.allowUnit)) return false;
    if (a.typ === 'Unterstützung' && !Number(cfg.allowSupport)) return false;
    if (a.typ === 'Ausrüstung' && !Number(cfg.allowEquip)) return false;
    if (a.typ === 'Soforteinsatz' && !Number(cfg.allowInstant)) return false;
    return true;
  }

  /**
   * Baut eine Bot-Aktion mit gesetztem `player`.
   * @param {number} pid
   * @param {object} row
   * @returns {object}
   */
  function emit(pid, row) {
    if (!row) return { type: 'END_TURN', player: pid };
    if (row.act.type === 'ATTACK') return { type: 'ATTACK', player: pid, uid: row.act.uid, target: row.target };
    return Object.assign({ player: pid }, row.act);
  }

  /**
   * Stabile Signatur einer Aktion, um Wiederholungen zu sperren.
   * @param {object} a
   * @returns {string}
   */
  function actKey(a) {
    if (!a) return '';
    var slot = a.slot ? (a.slot.section + ':' + a.slot.row) : '';
    return [a.type || '', a.uid || '', a.cardId || '', a.target || '', slot].join('|');
  }


  /**
   * Gibt eine legale Pass-/Weiter-Aktion zurück, sonst Ende des Zugs.
   * @param {object[]} acts
   * @param {object} [skip]
   * Weitergeben/Schließen offener Fenster (REACT_PASS, PEEK_DONE …), von der Engine als pass:true geliefert.
   * @returns {object|null}
   */
  function passAction(acts, skip) {
    return (acts || []).find(function (a) { return a.pass && !(skip && skip[actKey(a)]); }) || null;
  }

  /**
   * Wählt unter den legalen Antworten auf `pending`.
   * @param {object} engine
   * @param {number} pid
   * @param {object[]} pendingActs
   * @returns {object|null}
   */
  function pickPending(engine, pid, pendingActs) {
    var pend = engine.state && engine.state.pending;
    var selected = (pend && pend.selected) || [];
    var need = (pend && pend.needCount) || 1;
    var candidates = pendingActs.slice();
    // Mehrfachwahl ohne upto: bereits gewählte Ziele nicht wieder antippen (sonst Soft-Lock durch Toggle).
    if (pend && !pend.upto && need > 1 && selected.length < need) {
      var unsel = pendingActs.filter(function (a) {
        return a.target && selected.indexOf(a.target) < 0;
      });
      if (unsel.length) candidates = unsel;
    }
    // upto: wenn schon etwas gewählt und Confirm verfügbar, abschließen
    if (pend && pend.upto && selected.length > 0) {
      var conf = pendingActs.find(function (a) { return a.confirm; });
      if (conf && (selected.length >= need || !pendingActs.some(function (a) {
        return a.target && selected.indexOf(a.target) < 0;
      }))) {
        return [conf];
      }
      var unsel2 = pendingActs.filter(function (a) {
        return a.target && selected.indexOf(a.target) < 0;
      });
      if (unsel2.length && selected.length < need) candidates = unsel2;
    }
    return candidates;
  }

  /**
   * True, wenn die Aktion eine gegnerische Schläferzelle neutralisiert.
   * @param {object} a
   * @returns {boolean}
   */
  function isNeutralize(a) {
    return a && (a.ability === 'NEUTRALIZE' || ((a.type === 'ACTIVATE_SUPPORT' || a.type === 'USE_ABILITY' || a.type === 'NEUTRALIZE') && a.label === 'Neutralisieren'));
  }

  /**
   * Bewertung: gegnerische Schläferzelle für 2 AP entfernen, bevor sie zündet.
   * t254: Dringlichkeit als Stufe. Zündet sie zu Beginn des nächsten gegnerischen Zuges
   * (Restzähler 1) und steht eine eigene Einheit mit AP ≤ 3 an der Front, kommt sie vor allem anderen.
   * @param {object} engine
   * @param {number} pid
   * @param {object} a
   * @returns {{score: number, tier: number}}
   */
  function scoreNeutralize(engine, pid, a) {
    var loc = engine.findInst(a.uid);
    var left = loc && loc.inst && loc.inst.flags && loc.inst.flags.sleeper != null ? Number(loc.inst.flags.sleeper) : 3;
    var vuln = 0;
    var best = 0;
    engine.frontList(engine.player(pid)).forEach(function (l) {
      var d = defOf(engine, l.inst);
      if (Number(d.ap != null ? d.ap : 99) <= 3) {
        vuln += 1;
        var st = statsOf(engine, l.inst);
        best = Math.max(best, st.atk * 3 + st.def * 2);
      }
    });
    var cost = Number(a.cost || 2);
    if (!vuln) return { score: 3 - cost, tier: 0 };
    if (left <= 1) return { score: 60 + best + vuln * 4 - cost, tier: 4 };
    if (left === 2) return { score: 30 + vuln * 4 - cost, tier: 1 };
    return { score: 12 + vuln * 3 - cost, tier: 0 };
  }

  /**
   * t254: Aktivierbare Fähigkeiten eigener offener Karten finden, die `listActions` nicht aufzählt
   * (Grundset-Unterstützungen, Aufklärung, Einmal-Ausrüstung). Jede Kandidatin wird auf einer Kopie
   * durchgespielt; nur was `dispatch` annimmt, kommt in die Auswahl.
   * @param {object} engine
   * @param {number} pid
   * @param {object[]} acts bereits gelistete Aktionen
   * @param {object} [skip]
   * @returns {object[]} Zeilen {act, score, tier}
   */
  function abilityCandidates(engine, pid, acts, skip) {
    if (!Number(cfg.lookahead) || depth > 0) return [];
    var p = engine.player(pid);
    var seen = {};
    var out = [];
    var srcs = [];
    acts.forEach(function (a) {
      if (a.type === 'USE_ABILITY' && a.uid) { seen[a.uid] = 1; srcs.push({ type: 'USE_ABILITY', uid: a.uid }); }
    });
    engine.frontList(p).forEach(function (l) {
      if (!seen[l.inst.uid] && mayHaveAbility(engine, l.inst)) { seen[l.inst.uid] = 1; srcs.push({ type: 'USE_ABILITY', uid: l.inst.uid }); }
    });
    (p.support || []).forEach(function (x) {
      if (x && !seen[x.uid] && mayHaveAbility(engine, x)) { seen[x.uid] = 1; srcs.push({ type: 'ACTIVATE_SUPPORT', uid: x.uid }); }
    });
    srcs.forEach(function (src) {
      var act = { type: src.type, player: pid, uid: src.uid };
      if (skip && skip[actKey(act)]) return;
      var la = lookahead(engine, pid, act);
      if (!la.ok) return;
      var sc = lookScore(la);
      // Aufklärung/Blick: Information hat einen kleinen Eigenwert, den die Materialbewertung nicht sieht.
      if (la.apSpent <= 1) sc += 2;
      if (sc <= 4) return;
      out.push({ act: src, score: sc, tier: sc >= 24 ? 3 : 1, probed: true });
    });
    return out;
  }

  /**
   * t254: Stufe einer Hauptphasen-Aktion. Höhere Stufen kommen zuerst:
   * 4 dringend (Schläferzelle kurz vor dem Zünden), 3 Vorbereitung (Ausrüstung, starke Fähigkeiten und
   * Sondereinsätze), 2 Angriffe mit Vernichtung, 1 übrige Ausspielungen, 0 Rest.
   * @param {object} engine
   * @param {number} pid
   * @param {object} row
   * @returns {number}
   */
  function tierOf(engine, pid, row) {
    var a = row.act;
    if (row.tier != null) return row.tier;
    if (!Number(cfg.tiered)) return a.type === 'PLAY' ? 1 : 0;
    if (a.type === 'PLAY') {
      var d = engine.byId ? engine.byId[a.cardId] : null;
      if (!d) d = {};
      // Kampfausrüstung vor den Angriffen; der Kosten-Rabatt (Vertragsclip) zählt nicht dazu.
      if (d.typ === 'Ausrüstung' && frontCount(engine, pid) > 0 && !hasCode(d, 'EQUIP_DISCOUNT_AURA')) return 3;
      if (d.typ === 'Soforteinsatz' && hasAny(d, LOOK_CODES) && row.score >= 24) return 3;
      return 1;
    }
    if (a.type === 'ATTACK') return row.kill ? 2 : 0;
    return 0;
  }

  /**
   * Ein Schritt des Test-Bots (Bewertung).
   * t254: alle Hauptphasen-Optionen (Ausspielen, Angriff, Fähigkeit, Neutralisieren, Verlegung) in einer
   * Liste nach Stufe und Wert; die beste wird vorab auf einer Kopie geprüft.
   * @param {object} engine
   * @param {number} pid
   * @param {object} [skip]
   * @returns {object|null} Aktion oder null
   */
  function stepTest(engine, pid, skip) {
    var acts = engine.listActions(pid);
    if (!acts.length) return { type: 'END_TURN', player: pid };

    var pending = acts.filter(function (a) {
      return a.type === 'RESOLVE_PENDING' && !(skip && skip[actKey(a)]);
    });
    if (!pending.length) {
      var passT = passAction(acts, skip);
      if (passT) return Object.assign({ player: pid }, passT);
    }
    if (pending.length) {
      pending = pickPending(engine, pid, pending);
      var bestP = pending[0];
      var bestPs = -1e9;
      pending.forEach(function (a) {
        var s = scorePending(engine, pid, a);
        if (s > bestPs) { bestPs = s; bestP = a; }
      });
      return Object.assign({ player: pid }, bestP);
    }

    var scored = [];
    acts.forEach(function (a) {
      if (skip && skip[actKey(a)]) return;
      if (a.type === 'CONCEDE' || a.type === 'PROPOSE_PEACE' || a.type === 'ACCEPT_PEACE') return;
      if (a.type === 'END_TURN') return;
      if (a.type === 'PLAY') {
        if (!playable(a)) return;
        var ps = scorePlay(engine, pid, a);
        // t254: klar schädliche Ausspielungen (volle Front, aussichtsloser Sondereinsatz) auslassen.
        if (Number(cfg.tiered) && ps <= -100) return;
        scored.push({ act: a, score: ps });
        return;
      }
      if (a.type === 'ATTACK') {
        if (!Number(cfg.allowAttack)) return;
        var ev = scoreAttack(engine, pid, a);
        if (!ev.target) return;
        if (Number(cfg.vpLook) && depth === 0) {
          var vp = vpSwing(engine, pid, { type: 'ATTACK', player: pid, uid: a.uid, target: ev.target });
          if (vp == null) return;
          ev.score += vp * 35;
          if (vp > 0) ev.kill = true;
        }
        if (skip && skip[actKey({ type: 'ATTACK', uid: a.uid, target: ev.target })]) return;
        scored.push({ act: a, score: ev.score, target: ev.target, kill: ev.kill });
        return;
      }
      if (a.type === 'REVEAL_UNIT') scored.push({ act: a, score: 3 });
      if (a.type === 'DOK_SHIFT') {
        var sc = 6 - 3 * Number(a.cost || 0);
        if (a.slot && a.slot.section === 'C') sc += 4;
        scored.push({ act: a, score: sc });
      }
      if (isNeutralize(a)) {
        var nz = scoreNeutralize(engine, pid, a);
        scored.push({ act: a, score: nz.score, tier: Number(cfg.tiered) ? nz.tier : 0 });
      }
    });
    if (Number(cfg.tiered)) abilityCandidates(engine, pid, acts, skip).forEach(function (r) { scored.push(r); });
    if (!scored.length) return { type: 'END_TURN', player: pid };
    scored.forEach(function (r) { r.tierN = tierOf(engine, pid, r); });
    scored.sort(function (x, y) { return (y.tierN - x.tierN) || (y.score - x.score); });
    var useProbe = Number(cfg.probe) && depth === 0;
    for (var i = 0; i < scored.length; i++) {
      var out = emit(pid, scored[i]);
      if (!useProbe || scored[i].probed || i >= 6 || probeOk(engine, out)) return out;
      // Probe gescheitert: die nächstbeste Aktion versuchen (die Sperrliste des Aufrufers bleibt unberührt).
    }
    return { type: 'END_TURN', player: pid };
  }

  /**
   * Ein Schritt des Schloter-Bots (gewichteter Zufall).
   * @param {object} engine
   * @param {number} pid
   * @param {object} [skip]
   * @returns {object|null}
   */
  function stepSchloter(engine, pid, skip) {
    var acts = engine.listActions(pid);
    if (!acts.length) return { type: 'END_TURN', player: pid };
    var pendingChoices = acts.filter(function (a) {
      return a.type === 'RESOLVE_PENDING' && !(skip && skip[actKey(a)]);
    });
    if (!pendingChoices.length) {
      var passS = passAction(acts, skip);
      if (passS) return Object.assign({ player: pid }, passS);
    }
    if (pendingChoices.length) {
      pendingChoices = pickPending(engine, pid, pendingChoices);
      return Object.assign({ player: pid }, pick(pendingChoices));
    }
    var plays = acts.filter(function (a) { return playable(a) && !(skip && skip[actKey(a)]); });
    var attacks = acts.filter(function (a) { return a.type === 'ATTACK' && Number(cfg.allowAttack) && !(skip && skip[actKey(a)]); });
    if (plays.length) return Object.assign({ player: pid }, pick(plays));
    if (attacks.length) {
      var at = pick(attacks);
      var me = engine.player(pid);
      var affordable = (at.targets || []).filter(function (t) {
        return me.ap >= Number(t.cost != null ? t.cost : (at.cost || 1));
      });
      var target = affordable.length ? pick(affordable).uid : null;
      if (!target) return { type: 'END_TURN', player: pid };
      return { type: 'ATTACK', player: pid, uid: at.uid, target: target };
    }
    var shifts = acts.filter(function (a) { return a.type === 'DOK_SHIFT'; });
    if (shifts.length) return Object.assign({ player: pid }, pick(shifts));
    var reveal = acts.find(function (a) { return a.type === 'REVEAL_UNIT'; });
    if (reveal) return Object.assign({ player: pid }, reveal);
    var neut = acts.filter(function (a) { return isNeutralize(a) && !(skip && skip[actKey(a)]); });
    if (neut.length) return Object.assign({ player: pid }, pick(neut));
    var end = acts.find(function (a) { return a.type === 'END_TURN'; });
    return end ? { type: 'END_TURN', player: pid } : Object.assign({ player: pid }, pick(acts));
  }

  /**
   * Öffentliche Bot-API: nächste Aktion für `playerId`, oder null wenn nichts legal ist.
   * Liest nur `listActions` und erzeugt ein Aktionsobjekt — der Aufrufer macht `dispatch`.
   * @param {object} engine
   * @param {number} pid
   * @param {object} [skip] bereits gescheiterte Aktions-Schlüssel
   * @returns {object|null}
   */
  function step(engine, pid, skip) {
    var act;
    if ((cfg.model || 'test') === 'schloter') act = stepSchloter(engine, pid, skip);
    else act = stepTest(engine, pid, skip);
    var pend = engine.state && engine.state.pending;
    if (pend && pend.player === pid) {
      // Nie Zug beenden solange eigene Wahl offen — sonst Soft-Lock.
      if (!act || act.type === 'END_TURN' || act.type === 'CANCEL_PENDING') {
        var acts = engine.listActions(pid) || [];
        var opts = acts.filter(function (a) {
          return a.type === 'RESOLVE_PENDING' && !(skip && skip[actKey(a)]);
        });
        opts = pickPending(engine, pid, opts);
        if (!opts.length) {
          // Skip-Karte erschöpft: trotzdem irgendein Ziel erzwingen (besser als Abbruch-Schleife).
          opts = pickPending(engine, pid, acts.filter(function (a) {
            return a.type === 'RESOLVE_PENDING' && (a.target || a.slot || a.confirm);
          }));
        }
        var passF = passAction(acts, null);
        if (opts.length) act = Object.assign({ player: pid }, opts[0]);
        else if (passF) act = Object.assign({ player: pid }, passF);
        else act = { type: 'CANCEL_PENDING', player: pid };
      }
    }
    return act;
  }

  /**
   * Überschreibt Bot-Parameter (Chancen, erlaubte Aktionstypen).
   * @param {object} next
   */
  function applyCfg(next) {
    if (!next) return;
    Object.keys(DEFAULTS).forEach(function (k) {
      if (next[k] != null) cfg[k] = k === 'model' ? String(next[k]) : Number(next[k]);
    });
    if (next.model) cfg.model = String(next.model);
  }

  /**
   * Setzt die Bot-Konfiguration auf die Standardwerte zurück.
   */
  function useDefaults() {
    var m = cfg.model;
    applyCfg(DEFAULTS);
    cfg.model = m;
  }

  global.DCBot = {
    name: 'Test',
    defaults: DEFAULTS,
    cfg: cfg,
    step: step,
    actKey: actKey,
    applyCfg: applyCfg,
    useDefaults: useDefaults
  };
})(window);
