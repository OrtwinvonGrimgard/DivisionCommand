/**
 * Trophy-Siegmodus (`victory_mode: 'trophy'`, Kandidat K).
 *
 * Vorgabe im Katalog ist Trophy; Legacy `classic` bleibt wählbar.
 * Knöpfe (K): 5 SP, Safety 26/28, Doktrin-Bedarf ×0,65, Elite +2 SP.
 * Doktrin-Ziele sind nicht nationsgebunden. Siehe `docs/regeln/SIEGBEDINGUNGEN.md`.
 *
 * Installiert sich am Engine-Prototyp, sobald die Datei nach `engine.js` lädt.
 */
(function (root) {
  'use strict';

  /** @type {Record<string, {id:string, name:string, label:string, need:number, event:string}>} */
  var OBJECTIVES = {
    dc_dok_abloesung: { id: 'dc_dok_abloesung', name: 'Ablösung', label: '4 Einheiten im Abschnitt nach eigenem Verlust nachrücken', need: 4, event: 'replace_after_loss' },
    dc_dok_abnutzung: { id: 'dc_dok_abnutzung', name: 'Abnutzung', label: '6 gegnerische Fronteinheiten zerstören', need: 6, event: 'enemy_front_kill'},
    dc_dok_abriegeln: { id: 'dc_dok_abriegeln', name: 'Abriegeln', label: '1 Artillerieangriff auf Abschnitt mit ≤1 Feind', need: 1, event: 'arty_thin_section'},
    dc_dok_abschluss: { id: 'dc_dok_abschluss', name: 'Abschluss', label: '2 Kills mit derselben Einheit in der Partie', need: 2, event: 'same_unit_kills' },
    dc_dok_auffangen: { id: 'dc_dok_auffangen', name: 'Auffangen', label: '1 Angriff bei Unterzahl/Gleichstand überleben', need: 1, event: 'survive_outnumbered'},
    dc_dok_aufklaerungsschlag: { id: 'dc_dok_aufklaerungsschlag', name: 'Aufklärungsschlag', label: '8 Schaden an aufgeklärten Feinden', need: 8, event: 'dmg_revealed'},
    dc_dok_ausharren: { id: 'dc_dok_ausharren', name: 'Ausharren', label: '2 Schaden aus Abschnitten ohne eigene Unterstützung', need: 2, event: 'dmg_no_support'},
    dc_dok_auswertung: { id: 'dc_dok_auswertung', name: 'Auswertung', label: '3 Schaden im Zug nach erlittenem Angriff', need: 3, event: 'dmg_after_attacked' },
    dc_dok_blitzkrieg: { id: 'dc_dok_blitzkrieg', name: 'Blitzkrieg', label: '1 Kill mit Panzer innerhalb von 2 Zügen nach Einrücken', need: 1, event: 'blitz_panzer_kill' },
    dc_dok_bollwerk: { id: 'dc_dok_bollwerk', name: 'Bollwerk', label: '4 Schaden aus Abschnitten mit ≥2 eigenen Einheiten', need: 4, event: 'dmg_massed' },
    dc_dok_breites_aufgebot: { id: 'dc_dok_breites_aufgebot', name: 'Breites Aufgebot', label: '4 Infanterie ausspielen', need: 4, event: 'play_infantry'},
    dc_dok_entsatz: { id: 'dc_dok_entsatz', name: 'Entsatz', label: '7 Schaden aus Abschnitten mit ≥2 eigenen Einheiten', need: 7, event: 'dmg_massed'},
    dc_dok_etappensicherung: { id: 'dc_dok_etappensicherung', name: 'Etappensicherung', label: '3 Züge ohne eigenen Frontverlust beenden', need: 3, event: 'clean_end_turn'},
    dc_dok_feuerplan: { id: 'dc_dok_feuerplan', name: 'Feuerplan', label: '7 Schaden an aufgeklärten Feinden', need: 7, event: 'dmg_revealed'},
    dc_dok_feuerwalze: { id: 'dc_dok_feuerwalze', name: 'Feuerwalze', label: '1 Artillerie-Kill', need: 1, event: 'arty_kill'},
    dc_dok_gegenstoss: { id: 'dc_dok_gegenstoss', name: 'Gegenstoß', label: '4 Schaden im Zug nach erlittenem Angriff', need: 4, event: 'dmg_after_attacked' },
    dc_dok_gepanzerter_fuss: { id: 'dc_dok_gepanzerter_fuss', name: 'Gepanzerter Fuß', label: '2 Infanterie ausspielen', need: 2, event: 'play_infantry'},
    dc_dok_lauer: { id: 'dc_dok_lauer', name: 'Lauer', label: '4 gegnerische Fronteinheiten zerstören', need: 4, event: 'enemy_front_kill' },
    dc_dok_linienkrieg: { id: 'dc_dok_linienkrieg', name: 'Linienkrieg', label: '6 Schaden aus Abschnitten mit ≥2 eigenen Einheiten', need: 6, event: 'dmg_massed' },
    dc_dok_lokalisierung: { id: 'dc_dok_lokalisierung', name: 'Lokalisierung', label: '5 Schaden an aufgeklärten Feinden', need: 5, event: 'dmg_revealed'},
    dc_dok_marsch_aus_dem_vollen: { id: 'dc_dok_marsch_aus_dem_vollen', name: 'Marsch aus dem Vollen', label: '3 Einheiten in Abschnitte mit Unterstützung spielen', need: 3, event: 'play_with_support' },
    dc_dok_materialersatz: { id: 'dc_dok_materialersatz', name: 'Materialersatz', label: '4 Panzer oder Artillerie ausspielen', need: 4, event: 'play_heavy'},
    dc_dok_normverband: { id: 'dc_dok_normverband', name: 'Normverband', label: '3 gegnerische Fronteinheiten zerstören', need: 3, event: 'enemy_front_kill'},
    dc_dok_punktfeuer: { id: 'dc_dok_punktfeuer', name: 'Punktfeuer', label: '1 Artillerie-Kill', need: 1, event: 'arty_kill' },
    dc_dok_rasten: { id: 'dc_dok_rasten', name: 'Rasten', label: '5 Schaden mit Einheiten, die letzten Zug nicht angriffen', need: 5, event: 'dmg_rested' },
    dc_dok_scheinschwerpunkt: { id: 'dc_dok_scheinschwerpunkt', name: 'Scheinschwerpunkt', label: '2 Züge mit Einheiten in ≥2 Abschnitten beenden', need: 2, event: 'multi_section_end' },
    dc_dok_schwerpunkt: { id: 'dc_dok_schwerpunkt', name: 'Schwerpunkt', label: '8 Schaden aus dem stärksten eigenen Abschnitt', need: 8, event: 'dmg_main_effort' },
    dc_dok_sicherer_nachschub: { id: 'dc_dok_sicherer_nachschub', name: 'Sicherer Nachschub', label: '3 Einheiten in Abschnitte mit Unterstützung spielen', need: 3, event: 'play_with_support' },
    dc_dok_stosstrupp: { id: 'dc_dok_stosstrupp', name: 'Stoßtrupp', label: '2 Kills mit Infanterie', need: 2, event: 'kill_infantry'},
    dc_dok_sturmangriff: { id: 'dc_dok_sturmangriff', name: 'Sturmangriff', label: '2 Kills mit Infanterie', need: 2, event: 'kill_infantry'},
    dc_dok_tiefenverteidigung: { id: 'dc_dok_tiefenverteidigung', name: 'Tiefenverteidigung', label: '3 gegnerische Fronteinheiten zerstören', need: 3, event: 'enemy_front_kill' },
    dc_dok_umgehen: { id: 'dc_dok_umgehen', name: 'Umgehen', label: '4 Schaden bei lokaler Überzahl', need: 4, event: 'dmg_outnumber' },
    dc_dok_verlegung: { id: 'dc_dok_verlegung', name: 'Verlegung', label: '3 Züge mit Einheiten in ≥2 Abschnitten beenden', need: 3, event: 'multi_section_end'},
    dc_dok_verteilte_stellung: { id: 'dc_dok_verteilte_stellung', name: 'Verteilte Stellung', label: '2 Schaden als alleinige Einheit im Abschnitt', need: 2, event: 'dmg_alone'},
    dc_dok_weiterkaempfen: { id: 'dc_dok_weiterkaempfen', name: 'Weiterkämpfen', label: '4 Schaden mit beschädigten Einheiten', need: 4, event: 'dmg_damaged' },
    dc_dok_zielangriff: { id: 'dc_dok_zielangriff', name: 'Zielangriff', label: '3 gegnerische Fronteinheiten zerstören', need: 3, event: 'enemy_front_kill'}
  };

  var VP_WIN = 5;
  var SAFETY_EMPTY_FROM = 26;
  var SAFETY_VP_CAP_TURN = 28;

  function isEliteDef(def) {
    if (!def) return false;
    if (def.elite || def.klasse === 'Elite' || def.typ === 'Elite') return true;
    var bag = [].concat(def.tags || []).concat(def.klasse_tags || []).concat(String(def.klasse || '').split(','));
    return bag.some(function (x) { return String(x).trim().toLowerCase() === 'elite'; });
  }

  function frontCount(engine, p) {
    return engine.frontList(p).length;
  }

  function sectionCount(engine, p, sec) {
    return engine.frontList(p).filter(function (l) { return l.section === sec; }).length;
  }

  function hasSupport(p) {
    return (p.support || []).some(Boolean);
  }

  function initTrophy(player, doctrines) {
    var prog = {};
    (doctrines || []).forEach(function (d) {
      var id = d.cardId || d.id || (d.def && d.def.id);
      if (!id && d.cardId == null && typeof d === 'object' && d.uid) {
        // instance — cardId set on inst
        id = d.cardId;
      }
      if (!id) return;
      var obj = OBJECTIVES[id];
      if (!obj) return;
      prog[id] = { cur: 0, need: obj.need, done: false, label: obj.label, name: obj.name, event: obj.event };
    });
    player.trophy = {
      sources: { elite: 0, durchbruch: 0, doctrine: 0, other: 0 },
      durchbruchClaims: { L: 0, C: 0, R: 0 },
      durchbruchClaimed: { L: false, C: false, R: false }, // legacy mirror: true when claims >= max
      durchbruchCooldownUntil: { L: 0, C: 0, R: 0 },
      durchbruchArmed: { L: null, C: null, R: null }, // turn when emptied while own presence
      doctrineProg: prog,
      turnArtyKills: 0,
      unitKillCounts: {},
      lostSectionsThisTurn: {},
      attackedThisTurn: false,
      damagedThisTurn: false,
      ownFrontLostThisTurn: false
    };
  }

  function resolveDoctrineIds(engine, player) {
    return (player.doctrines || []).map(function (d) {
      var def = engine.defOf(d);
      return def && def.id;
    }).filter(Boolean);
  }

  function bump(engine, player, event, amount, meta) {
    if (!engine._trophyActive()) return;
    if (!player || !player.trophy) return;
    amount = Number(amount) || 1;
    meta = meta || {};
    var prog = player.trophy.doctrineProg || {};
    Object.keys(prog).forEach(function (dokId) {
      var row = prog[dokId];
      if (!row || row.done) return;
      if (row.event !== event) return;
      // special: same_unit_kills needs unit uid reaching need
      if (event === 'same_unit_kills') {
        var uid = meta.uid;
        if (!uid) return;
        player.trophy.unitKillCounts[uid] = (player.trophy.unitKillCounts[uid] || 0) + amount;
        var kc = player.trophy.unitKillCounts[uid];
        if (kc > row.cur) row.cur = Math.min(row.need, kc);
      } else if (event === 'arty_kills_one_turn') {
        player.trophy.turnArtyKills = (player.trophy.turnArtyKills || 0) + amount;
        row.cur = Math.max(row.cur, Math.min(row.need, player.trophy.turnArtyKills));
      } else {
        row.cur = Math.min(row.need, row.cur + amount);
      }
      if (row.cur >= row.need && !row.done) {
        row.done = true;
        engine._trophyGrantVp(player, 1, 'doctrine', 'Doktrin-Ziel „' + row.name + '“');
      }
    });
  }

  function patchEngine(bundle) {
    var Eng = bundle && (bundle.Engine || bundle);
    if (!Eng || !Eng.prototype) return;
    if (Eng.prototype._trophyPatched) return;
    var proto = Eng.prototype;
    proto._trophyPatched = true;

    proto._trophyActive = function () {
      return String((this.rules && this.rules.victory_mode) || 'classic') === 'trophy';
    };

    proto._trophyVpToWin = function () {
      if (!this._trophyActive()) return Number(this.rules.vp_to_win || 10);
      return Number((this.rules && this.rules.trophy_vp_to_win) || VP_WIN);
    };

    proto._trophyEliteVp = function () {
      return Number((this.rules && this.rules.trophy_elite_vp) || 2);
    };

    proto._trophySafetyEmptyFrom = function () {
      return Number((this.rules && this.rules.trophy_safety_empty_from) || SAFETY_EMPTY_FROM);
    };

    proto._trophySafetyVpCap = function () {
      return Number((this.rules && this.rules.trophy_safety_vp_cap) || SAFETY_VP_CAP_TURN);
    };

    proto._trophyDurchbruchMaxClaims = function () {
      // per sector: 1 = once/match (legacy), 2+ = reuse up to N
      return Math.max(1, Number((this.rules && this.rules.trophy_durchbruch_max_claims) || 1));
    };

    proto._trophyDurchbruchCooldownTurns = function () {
      // turns after a claim before sector can re-arm (0 = immediate if maxClaims allows)
      return Math.max(0, Number((this.rules && this.rules.trophy_durchbruch_cooldown) || 0));
    };

    proto._trophyDoctrineNeedScale = function () {
      // <1 eases doctrine VP (e.g. 0.75 → need ceil(need*0.75), min 1)
      var s = Number((this.rules && this.rules.trophy_doctrine_need_scale));
      if (!isFinite(s) || s <= 0) return 1;
      return s;
    };

    proto._isEliteDef = function (def) { return isEliteDef(def); };

    proto._trophyGrantVp = function (player, n, source, reason) {
      if (!this._trophyActive() || !player || this.state.winner != null) return;
      n = Number(n) || 0;
      if (n <= 0) return;
      player.vp = (player.vp || 0) + n;
      if (player.trophy && player.trophy.sources) {
        var key = source || 'other';
        if (player.trophy.sources[key] == null) player.trophy.sources[key] = 0;
        player.trophy.sources[key] += n;
      }
      this._log(player.name + ' +' + n + ' SP (' + reason + ') → ' + player.vp + '/' + this._trophyVpToWin());
      this._evt('vp', null, player.name + ': +' + n + ' SP — ' + reason, { player: player.id, vp: player.vp, source: source });
      this._checkVictory();
    };

    proto._trophyInitPlayers = function () {
      if (!this._trophyActive() || !this.state) return;
      var self = this;
      var scale = this._trophyDoctrineNeedScale();
      this.state.players.forEach(function (p) {
        initTrophy(p, p.doctrines);
        // re-key by resolved card ids
        var prog = {};
        resolveDoctrineIds(self, p).forEach(function (id) {
          var obj = OBJECTIVES[id];
          if (!obj) return;
          var need = obj.need;
          if (scale !== 1) need = Math.max(1, Math.ceil(obj.need * scale));
          prog[id] = { cur: 0, need: need, done: false, label: obj.label, name: obj.name, event: obj.event };
        });
        p.trophy.doctrineProg = prog;
      });
      // override win threshold in-state for UI
      this.rules = Object.assign({}, this.rules, { vp_to_win: this._trophyVpToWin() });
    };

    proto._trophyOnDestroy = function (loc, meta) {
      if (!this._trophyActive() || !loc || !loc.inst || !loc.player) return;
      if (loc.zone !== 'front') return;
      var def = this.defOf(loc.inst);
      if (!def || def.typ !== 'Einheit') return;
      var victim = loc.player;
      var killer = this.opponent(victim.id);
      victim.trophy = victim.trophy || {};
      victim.trophy.ownFrontLostThisTurn = true;
      victim.trophy.lostSectionsThisTurn = victim.trophy.lostSectionsThisTurn || {};
      victim.trophy.lostSectionsThisTurn[loc.section] = true;

      // elite VP to killer
      if (isEliteDef(def) && killer) {
        this._trophyGrantVp(killer, this._trophyEliteVp(), 'elite', 'Elite zerstört: ' + def.name);
      }

      // doctrine progress for killer
      if (killer) {
        bump(this, killer, 'enemy_front_kill', 1, {});
        if (meta && meta.attackerUid) {
          bump(this, killer, 'same_unit_kills', 1, { uid: meta.attackerUid });
        }
        if (meta && meta.attackerIsArty) {
          bump(this, killer, 'arty_kill', 1, {});
          bump(this, killer, 'arty_kills_one_turn', 1, {});
        }
        if (meta && meta.attackerIsInf) bump(this, killer, 'kill_infantry', 1, {});
        if (meta && meta.attackerIsInf && meta.attackerDamaged) bump(this, killer, 'kill_damaged_inf', 1, {});
        if (meta && meta.attackerIsPanzer && meta.attackerFresh) bump(this, killer, 'blitz_panzer_kill', 1, {});
        if (meta && meta.targetObserved) bump(this, killer, 'kill_observed', 1, {});
        if (meta && meta.targetMarked) bump(this, killer, 'kill_marked', 1, {});
        if (this._hasDoctrine(killer, 'BLOOD_AP')) bump(this, killer, 'blood_ap', 1, {});
      }
    };

    proto._trophyOnCombatDamage = function (ctx) {
      if (!this._trophyActive() || !ctx) return;
      var atkP = ctx.attackerPlayer;
      var defP = ctx.defenderPlayer;
      var aLoc = ctx.aLoc;
      var tLoc = ctx.tLoc;
      var dmg = Number(ctx.dmgToT) || 0;
      if (!atkP || !aLoc || dmg <= 0) return;
      var aDef = this.defOf(aLoc.inst);
      var tInst = tLoc && tLoc.inst;
      var tDef = tInst ? this.defOf(tInst) : null;
      var sec = aLoc.section;
      var ownN = sectionCount(this, atkP, sec);
      var foeN = tLoc ? sectionCount(this, tLoc.player, tLoc.section) : 0;

      if (tInst && !tInst.facedown) bump(this, atkP, 'dmg_revealed', dmg, {});
      if (!hasSupport(atkP) || !(atkP.support || []).some(Boolean)) {
        // section without support: no support card at all OR none "in section" — use global no-support-ish: no support cards
      }
      var anySupport = (atkP.support || []).some(Boolean);
      if (!anySupport) bump(this, atkP, 'dmg_no_support', dmg, {});

      if (atkP.trophy && atkP.trophy.damagedThisTurn) bump(this, atkP, 'dmg_after_hurt', dmg, {});
      if (atkP.trophy && atkP.trophy.attackedThisTurn) bump(this, atkP, 'dmg_after_attacked', dmg, {});

      if (this._hasCover && this._hasCover(atkP, aLoc.section, aLoc.row)) bump(this, atkP, 'dmg_from_cover', dmg, {});
      if (aLoc.inst.summonedTurn === this.state.turn || aLoc.inst.summonedTurn === this.state.turn - 1) {
        bump(this, atkP, 'dmg_fresh_section', dmg, {});
      }
      if (tInst && tInst.summonedTurn === this.state.turn) bump(this, atkP, 'dmg_fresh_enemy', dmg, {});
      if (ownN >= 2) bump(this, atkP, 'dmg_massed', dmg, {});
      if ((aLoc.inst.attachments || []).length && (root.isInfantry ? null : null)) {
        // infantry check via tags
        var tags = ((aDef.tags || []).join(' ') + ' ' + (aDef.klasse || '')).toLowerCase();
        if (tags.indexOf('infanterie') >= 0 && (aLoc.inst.attachments || []).length) bump(this, atkP, 'dmg_equipped_inf', dmg, {});
        if (tags.indexOf('infanterie') >= 0) bump(this, atkP, 'dmg_infantry', dmg, {});
      }
      // combined arms
      var hasInf = false, hasPz = false, hasArt = false;
      this.frontList(atkP).forEach(function (l) {
        var d = this.defOf(l.inst);
        var bag = ((d.tags || []).join(' ') + ' ' + (d.klasse || '')).toLowerCase();
        if (bag.indexOf('infanterie') >= 0) hasInf = true;
        if (bag.indexOf('panzer') >= 0) hasPz = true;
        if (bag.indexOf('artillerie') >= 0 || bag.indexOf('haubitze') >= 0) hasArt = true;
      }.bind(this));
      if (hasInf && hasPz && hasArt) bump(this, atkP, 'dmg_combined_arms', dmg, {});

      if (!aLoc.inst.attackUsed && aLoc.inst.flags && aLoc.inst.flags._restedReady) bump(this, atkP, 'dmg_rested', dmg, {});
      // rested: did not attack previous own turn — approximate via !flags.attackedLastOwnTurn
      if (aLoc.inst.flags && aLoc.inst.flags.attackedLastOwnTurn === false) bump(this, atkP, 'dmg_rested', dmg, {});

      // main effort = section with most own units
      var maxSec = 0;
      ['L', 'C', 'R'].forEach(function (s) { maxSec = Math.max(maxSec, sectionCount(this, atkP, s)); }.bind(this));
      if (ownN >= maxSec && ownN >= 2) bump(this, atkP, 'dmg_main_effort', dmg, {});

      if (ownN > foeN) bump(this, atkP, 'dmg_outnumber', dmg, {});
      if (ownN === 1) bump(this, atkP, 'dmg_alone', dmg, {});

      var maxHp = aLoc.inst.defMax != null ? aLoc.inst.defMax : (aDef && aDef.def);
      if (maxHp != null && aLoc.inst.def < maxHp) bump(this, atkP, 'dmg_damaged', dmg, {});

      if (this._isArtilleryAttacker && this._isArtilleryAttacker(aLoc.inst) && foeN <= 1) {
        bump(this, atkP, 'arty_thin_section', 1, {});
      }

      if (defP && defP.trophy) {
        defP.trophy.attackedThisTurn = true;
        defP.trophy.damagedThisTurn = true;
        if (ownN /* defender outnumbered in its section */) {
          var dOwn = tLoc ? sectionCount(this, defP, tLoc.section) : 0;
          var dFoe = tLoc ? sectionCount(this, atkP, tLoc.section) : 0;
          if (dOwn < dFoe && tInst && !(this._isDead && this._isDead(tInst))) {
            // survive check happens after damage in combat — handled in _trophyAfterCombat
          }
        }
      }
    };

    proto._trophyAfterCombat = function (ctx) {
      if (!this._trophyActive() || !ctx || !ctx.tLoc || !ctx.defenderPlayer) return;
      var tInst = ctx.tLoc.inst;
      if (!tInst) return;
      if (this._isDead(tInst)) return;
      var defP = ctx.defenderPlayer;
      var atkP = ctx.attackerPlayer;
      var dOwn = sectionCount(this, defP, ctx.tLoc.section);
      var dFoe = sectionCount(this, atkP, ctx.tLoc.section);
      if (dOwn <= dFoe) bump(this, defP, 'survive_outnumbered', 1, {});
    };

    proto._trophyOnPlay = function (player, card, zone, section) {
      if (!this._trophyActive() || !player) return;
      var def = this.defOf(card);
      if (!def) return;
      var bag = ((def.tags || []).join(' ') + ' ' + (def.klasse || '')).toLowerCase();
      if (zone === 'front' && bag.indexOf('infanterie') >= 0) bump(this, player, 'play_infantry', 1, {});
      if (zone === 'front' && (bag.indexOf('panzer') >= 0 || bag.indexOf('artillerie') >= 0 || bag.indexOf('haubitze') >= 0)) bump(this, player, 'play_heavy', 1, {});
      if (zone === 'front' && player.trophy && player.trophy.lostSectionsThisTurn && player.trophy.lostSectionsThisTurn[section]) {
        bump(this, player, 'replace_after_loss', 1, {});
      }
      if (zone === 'front' && hasSupport(player)) bump(this, player, 'play_with_support', 1, {});
      if (zone === 'front' && (bag.indexOf('panzer') >= 0 || bag.indexOf('artillerie') >= 0 || bag.indexOf('haubitze') >= 0)) {
        if (card.flags && card.flags._wasDeployedBefore) bump(this, player, 'redeploy_heavy', 1, {});
        // mark for future redeploy: any heavy that leaves and returns — approximate: if grave had same cardId earlier
        var wasInGrave = (player.grave || []).some(function (g) { return g && g.cardId === card.cardId && g.uid !== card.uid; });
        if (wasInGrave) bump(this, player, 'redeploy_heavy', 1, {});
      }
      if (zone === 'support') bump(this, player, 'support_or_heal', 1, {});
    };

    proto._trophyOnMove = function (player) {
      if (!this._trophyActive() || !player) return;
      bump(this, player, 'move_unit', 1, {});
    };

    proto._trophyOnHealArmored = function (player) {
      if (!this._trophyActive() || !player) return;
      bump(this, player, 'support_or_heal', 1, {});
    };

    proto._trophyArmDurchbruch = function () {
      if (!this._trophyActive() || !this.state) return;
      var self = this;
      this.state.players.forEach(function (p) {
        var opp = self.opponent(p.id);
        var maxC = self._trophyDurchbruchMaxClaims();
        ['L', 'C', 'R'].forEach(function (sec) {
          var claims = (p.trophy.durchbruchClaims && p.trophy.durchbruchClaims[sec]) || 0;
          p.trophy.durchbruchClaimed[sec] = claims >= maxC;
          if (claims >= maxC) return;
          if ((p.trophy.durchbruchCooldownUntil && p.trophy.durchbruchCooldownUntil[sec] || 0) > self.state.turn) return;
          var own = sectionCount(self, p, sec);
          var foe = sectionCount(self, opp, sec);
          if (own >= 1 && foe === 0) {
            if (p.trophy.durchbruchArmed[sec] == null) {
              p.trophy.durchbruchArmed[sec] = self.state.turn;
            }
          } else {
            p.trophy.durchbruchArmed[sec] = null;
          }
        });
      });
    };

    proto._trophyResolveDurchbruch = function (endingPid) {
      if (!this._trophyActive()) return;
      var p = this.player(endingPid);
      var opp = this.opponent(endingPid);
      var self = this;
      var maxC = self._trophyDurchbruchMaxClaims();
      var cd = self._trophyDurchbruchCooldownTurns();
      ['L', 'C', 'R'].forEach(function (sec) {
        if (!p.trophy) return;
        var claims = (p.trophy.durchbruchClaims && p.trophy.durchbruchClaims[sec]) || 0;
        if (claims >= maxC) return;
        if ((p.trophy.durchbruchCooldownUntil && p.trophy.durchbruchCooldownUntil[sec] || 0) > self.state.turn) return;
        var armed = p.trophy.durchbruchArmed[sec];
        if (armed == null) return;
        // Hold empty through end of your next turn after arming (state.turn > armed).
        if (self.state.turn <= armed) return;
        var own = sectionCount(self, p, sec);
        var foe = sectionCount(self, opp, sec);
        if (own >= 1 && foe === 0) {
          p.trophy.durchbruchClaims[sec] = claims + 1;
          p.trophy.durchbruchClaimed[sec] = p.trophy.durchbruchClaims[sec] >= maxC;
          p.trophy.durchbruchCooldownUntil[sec] = self.state.turn + cd;
          p.trophy.durchbruchArmed[sec] = null;
          self._trophyGrantVp(p, 1, 'durchbruch', 'Durchbruch Abschnitt ' + sec + (maxC > 1 ? ' (' + p.trophy.durchbruchClaims[sec] + '/' + maxC + ')' : ''));
        } else {
          p.trophy.durchbruchArmed[sec] = null;
        }
      });
    };

    proto._trophyEndTurnSafety = function (endingPid) {
      if (!this._trophyActive() || this.state.winner != null) return;
      var p = this.player(endingPid);
      var turn = this.state.turn;

      if (!p.trophy.ownFrontLostThisTurn) bump(this, p, 'clean_end_turn', 1, {});
      var secs = {};
      this.frontList(p).forEach(function (l) { secs[l.section] = true; });
      if (Object.keys(secs).length >= 2) bump(this, p, 'multi_section_end', 1, {});
      if (Object.keys(secs).length >= 3) bump(this, p, 'triple_section_end', 1, {});

      var emptyFrom = this._trophySafetyEmptyFrom();
      var vpCap = this._trophySafetyVpCap();

      // Safety: empty front
      if (turn >= emptyFrom && frontCount(this, p) === 0) {
        this._end(endingPid === 0 ? 1 : 0, 'Keine Front ab Zug ' + emptyFrom);
        return;
      }

      // Soft cap: most VP; tie → board share; still tie → white peace
      if (turn >= vpCap) {
        var a = this.player(0);
        var b = this.player(1);
        if (a.vp !== b.vp) {
          this._end(a.vp > b.vp ? 0 : 1, 'Zuglimit ' + vpCap + ' (mehr SP)');
          return;
        }
        var fa = frontCount(this, a);
        var fb = frontCount(this, b);
        if (fa !== fb) {
          this._end(fa > fb ? 0 : 1, 'Zuglimit ' + vpCap + ' (Brettanteil)');
          return;
        }
        this._end(null, 'Zuglimit ' + vpCap + ' — unentschieden');
      }
    };

    proto._trophyResetTurnFlags = function (pid) {
      if (!this._trophyActive()) return;
      var p = this.player(pid);
      if (!p.trophy) return;
      p.trophy.turnArtyKills = 0;
      p.trophy.lostSectionsThisTurn = {};
      p.trophy.attackedThisTurn = false;
      p.trophy.damagedThisTurn = false;
      p.trophy.ownFrontLostThisTurn = false;
      // mark rested units for next attack scoring
      this.frontList(p).forEach(function (l) {
        l.inst.flags = l.inst.flags || {};
        l.inst.flags.attackedLastOwnTurn = !!l.inst.attackUsed;
      });
    };

    proto.trophyObjectiveFor = function (dokId) {
      return OBJECTIVES[dokId] || null;
    };

    proto.trophyProgressFor = function (pid, dokId) {
      var p = this.player(pid);
      if (!p || !p.trophy) return null;
      return p.trophy.doctrineProg[dokId] || null;
    };

    // Wrap createMatch
    var _create = proto.createMatch;
    proto.createMatch = function (opts) {
      var st = _create.call(this, opts);
      this._trophyInitPlayers();
      return st;
    };

    // Wrap _checkVictory for trophy threshold
    var _cv = proto._checkVictory;
    proto._checkVictory = function () {
      if (!this._trophyActive()) return _cv.call(this);
      var self = this;
      var need = this._trophyVpToWin();
      this.state.players.forEach(function (p) {
        if (self.state.winner != null) return;
        if (p.vp >= need) self._end(p.id, p.vp + ' Siegpunkte (Trophy)');
      });
    };

    // Wrap _destroy
    var _destroy = proto._destroy;
    proto._destroy = function (loc, meta) {
      var atkMeta = meta || {};
      // try enrich from combat context
      if (this.state && this.state._trophyCombatMeta) {
        atkMeta = Object.assign({}, this.state._trophyCombatMeta, atkMeta);
      }
      var ret = _destroy.call(this, loc, meta);
      try { this._trophyOnDestroy(loc, atkMeta); } catch (e) { /* ignore trophy errors */ }
      return ret;
    };

    // Wrap _actEnd
    var _actEnd = proto._actEnd;
    proto._actEnd = function (pid) {
      if (this._trophyActive()) {
        try {
          this._trophyResolveDurchbruch(pid);
          this._trophyArmDurchbruch();
          this._trophyEndTurnSafety(pid);
          if (this.state.winner != null) return { ok: true };
        } catch (e) { /* continue end turn */ }
      }
      var ret = _actEnd.call(this, pid);
      if (this._trophyActive() && this.state && this.state.winner == null) {
        try {
          // reset flags for the player who will act next? reset ending player's turn counters after end processed
          this._trophyResetTurnFlags(pid);
          this._trophyArmDurchbruch();
        } catch (e2) {}
      }
      return ret;
    };

    // Wrap _actPlay / _actSlot for deploy + support play tracking
    var _actPlay = proto._actPlay;
    proto._actPlay = function (pid, a) {
      var ret = _actPlay.call(this, pid, a);
      if (this._trophyActive() && ret && ret.ok !== false && !(ret && ret.need)) {
        try {
          var p = this.player(pid);
          var loc = a && a.uid ? this.findInst(a.uid) : null;
          if (loc) this._trophyOnPlay(p, loc.inst, loc.zone, loc.section);
        } catch (e) {}
      }
      return ret;
    };
    if (proto._actSlot) {
      var _actSlot = proto._actSlot;
      proto._actSlot = function (pid, a) {
        var pend = this.state && this.state.pending;
        var uid = pend && pend.uid;
        var ret = _actSlot.call(this, pid, a);
        if (this._trophyActive() && ret && ret.ok !== false && uid) {
          try {
            var p = this.player(pid);
            var loc = this.findInst(uid);
            if (loc) this._trophyOnPlay(p, loc.inst, loc.zone, loc.section);
          } catch (e) {}
        }
        return ret;
      };
    }


    // Wrap heal armored
    if (proto._actHealArmored) {
      var _heal = proto._actHealArmored;
      proto._actHealArmored = function (pid, a) {
        var ret = _heal.call(this, pid, a);
        try { if (this._trophyActive()) this._trophyOnHealArmored(this.player(pid)); } catch (e) {}
        return ret;
      };
    }

    // Wrap MOVE_SLOTS via effect resolve is hard; also wrap dispatch for MOVE-like
    var _dispatch = proto.dispatch;
    proto.dispatch = function (a) {
      var ret = _dispatch.call(this, a);
      if (this._trophyActive() && ret && ret.ok !== false && a) {
        try {
          var typ = a.type;
          if (typ === 'MOVE' || typ === 'SHIFT' || typ === 'VERLEGUNG' || typ === 'MOVE_UNIT') {
            this._trophyOnMove(this.player(a.player));
          }
        } catch (e) {}
      }
      return ret;
    };

    // Wrap _resolveCombat for damage/kill meta
    var _rc = proto._resolveCombat;
    proto._resolveCombat = function (pid, aUid, tUid) {
      if (!this._trophyActive()) return _rc.call(this, pid, aUid, tUid);
      var aLoc = this.findInst(aUid);
      var tLoc = this.findInst(tUid);
      var aDef = aLoc ? this.defOf(aLoc.inst) : null;
      var isArty = !!(aLoc && this._isArtilleryAttacker && this._isArtilleryAttacker(aLoc.inst));
      var bag = aDef ? ((aDef.tags || []).join(' ') + ' ' + (aDef.klasse || '')).toLowerCase() : '';
      var isInf = bag.indexOf('infanterie') >= 0;
      var isPz = bag.indexOf('panzer') >= 0;
      var maxHp = aLoc && aLoc.inst ? (aLoc.inst.defMax != null ? aLoc.inst.defMax : (aDef && aDef.def)) : null;
      var damaged = aLoc && maxHp != null && aLoc.inst.def < maxHp;
      var fresh = aLoc && aLoc.inst.summonedTurn != null && (this.state.turn - aLoc.inst.summonedTurn) <= 2;
      var observed = tLoc && tLoc.inst && (tLoc.inst.flags && (tLoc.inst.flags.observed || tLoc.inst.flags.zielangriff));
      var marked = tLoc && tLoc.inst && tLoc.inst.flags && tLoc.inst.flags.zielangriff;
      this.state._trophyCombatMeta = {
        attackerUid: aUid,
        attackerIsArty: isArty,
        attackerIsInf: isInf,
        attackerIsPanzer: isPz,
        attackerDamaged: damaged,
        attackerFresh: fresh,
        targetObserved: !!observed,
        targetMarked: !!marked
      };
      // pre-damage snapshot for trophy damage ticks — hook after via monkey on _applyCombatHits if needed
      var beforeDef = tLoc && tLoc.inst ? tLoc.inst.def : null;
      var ret = _rc.call(this, pid, aUid, tUid);
      try {
        var afterLoc = this.findInst(tUid);
        var dmg = 0;
        if (beforeDef != null) {
          if (!afterLoc) dmg = beforeDef; // destroyed
          else dmg = Math.max(0, beforeDef - (afterLoc.inst.def || 0));
        }
        var ctx = {
          attackerPlayer: this.player(pid),
          defenderPlayer: tLoc ? tLoc.player : null,
          aLoc: aLoc,
          tLoc: afterLoc || tLoc,
          dmgToT: dmg
        };
        this._trophyOnCombatDamage(ctx);
        this._trophyAfterCombat(ctx);
      } catch (e) {}
      this.state._trophyCombatMeta = null;
      return ret;
    };
  }

  root.DC_TROPHY_OBJECTIVES = OBJECTIVES;
  root.DC_TROPHY = {
    OBJECTIVES: OBJECTIVES,
    VP_WIN: VP_WIN,
    SAFETY_EMPTY_FROM: SAFETY_EMPTY_FROM,
    SAFETY_VP_CAP_TURN: SAFETY_VP_CAP_TURN,
    isEliteDef: isEliteDef,
    patchEngine: patchEngine
  };

  function tryPatch() {
    if (root.DCEngine) patchEngine(root.DCEngine);
  }
  tryPatch();
  // If engine loads after this file, caller should invoke DC_TROPHY.patchEngine(DCEngine).
})(typeof window !== 'undefined' ? window : globalThis);
