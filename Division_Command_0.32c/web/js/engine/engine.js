/**
 * Regelmaschine von Division Command.
 *
 * Nur diese Datei entscheidet, was ein Zug bewirkt. Die Oberfläche
 * darf createMatch, dispatch, getState und listActions aufrufen.
 *
 * Zustand (state): Zugnummer, wer handelt, beide Spieler mit Front
 * (L/C/R je drei Stellungen), Support, Hand, Deck, Friedhof, AP, SP.
 * pending hält eine offene Wahl (Stellung, Ziel, Münze).
 * events speist die Rundenübersicht.
 *
 * dispatch({ type, player, ... }) führt genau eine Aktion aus oder
 * wirft / liefert { ok:false }. Nach Erfolg liegt der neue Stand in state.
 */
/* Division Command — authoritative engine (offline v1)
 * UI and net adapters may only call Engine.create / dispatch / getState / listActions.
 */
(function (global) { // Funktion
  'use strict'; // nächster Schritt im Ablauf

  const SECTIONS = ['L', 'C', 'R']; // unveränderliche Bindung in diesem Block
  const ROWS = [0, 1, 2]; // unveränderliche Bindung in diesem Block

  function rng(seed) { // Zufallsstart
    let s = (seed >>> 0) || 1; // Zufallsstart
    return function () { // Wert zurückgeben
      s = (s * 1664525 + 1013904223) >>> 0; // nächster Schritt im Ablauf
      return s / 4294967296; // Wert zurückgeben
    };
  }

  function shuffle(arr, rand) { // Funktion
    const a = arr.slice(); // unveränderliche Bindung in diesem Block
    for (let i = a.length - 1; i > 0; i--) { // Schleife
      const j = Math.floor(rand() * (i + 1)); // unveränderliche Bindung in diesem Block
      [a[i], a[j]] = [a[j], a[i]]; // nächster Schritt im Ablauf
    }
    return a; // Wert zurückgeben
  }

  function uid(prefix, rand) { // Funktion
    return prefix + '-' + Math.floor(rand() * 1e9).toString(36); // Wert zurückgeben
  }

  function catalogMap(catalog) { // Funktion
    const m = {}; // unveränderliche Bindung in diesem Block
    catalog.cards.forEach((c) => { m[c.id] = c; }); // jedes Element
    return m; // Wert zurückgeben
  }

  function hasTag(card, tag) { // Funktion
    const t = (tag || '').toLowerCase(); // unveränderliche Bindung in diesem Block
    const bag = [] // unveränderliche Bindung in diesem Block
      .concat(card.klasse_tags || []) // nächster Schritt im Ablauf
      .concat(card.tags || []) // nächster Schritt im Ablauf
      .concat((card.klasse || '').split(',')) // nächster Schritt im Ablauf
      .map((x) => String(x).trim().toLowerCase()); // Liste umformen
    return bag.some((x) => x === t || x.includes(t)); // Wert zurückgeben
  }

  function isInfantry(card) { // Funktion
    return hasTag(card, 'infanterie'); // Wert zurückgeben
  }
  function isArmored(card) { // Funktion
    return hasTag(card, 'gepanzert') || hasTag(card, 'kette'); // Wert zurückgeben
  }
  function isArtillery(card) { // Funktion
    return hasTag(card, 'artillerie') || (card.effects || []).some((e) => e.code === 'ATTACK_ANY_FRONT'); // Wert zurückgeben
  }

  function emptyFront() { // Funktion
    const f = {}; // unveränderliche Bindung in diesem Block
    SECTIONS.forEach((s) => { // jedes Element
      f[s] = [null, null, null]; // nächster Schritt im Ablauf
    }); // nächster Schritt im Ablauf
    return f; // Wert zurückgeben
  }

  function opposite(section) { // Funktion
    return section; // Wert zurückgeben
  }

  function adjacentSections(section) { // Funktion
    if (section === 'C') return ['L', 'R']; // Wert zurückgeben
    if (section === 'L') return ['C']; // Wert zurückgeben
    return ['C']; // Wert zurückgeben
  }

  function clone(o) { // Funktion
    return JSON.parse(JSON.stringify(o)); // JSON lesen
  }

  class Engine { // Klasse
    // Katalog laden, Regeln mergen, Zufall setzen.
    constructor(catalog, options) { // nächster Schritt im Ablauf
      this.catalog = catalog; // Feld der Engine-Instanz
      this.byId = catalogMap(catalog); // Feld der Engine-Instanz
      this.rules = Object.assign({}, catalog.rules, (options && options.rules) || {}); // Feld der Engine-Instanz
      this.rand = rng((options && options.seed) || Date.now()); // Zufallsstart
      this.log = []; // Feld der Engine-Instanz
      this._uid = 0; // Feld der Engine-Instanz
      this.state = null; // Feld der Engine-Instanz
    }

    // Nächste Instanz-Id aus dem Zufallszahlengenerator.
    nextId(prefix) { // nächster Schritt im Ablauf
      this._uid += 1; // Feld der Engine-Instanz
      return prefix + '-' + this._uid; // Wert zurückgeben
    }

    // Spielinstanz aus einer Katalogkarte erzeugen.
    instFromId(cardId, owner) { // nächster Schritt im Ablauf
      const def = this.byId[cardId]; // unveränderliche Bindung in diesem Block
      if (!def) throw new Error('unknown card ' + cardId); // Regelverstoß, Zug ungültig
      return { // Wert zurückgeben
        uid: this.nextId('c'), // Feld der Engine-Instanz
        cardId: def.id, // nächster Schritt im Ablauf
        owner, // nächster Schritt im Ablauf
        facedown: false, // verdeckte Lage
        atk: def.atk, // nächster Schritt im Ablauf
        def: def.def, // nächster Schritt im Ablauf
        defMax: def.def, // nächster Schritt im Ablauf
        attachments: [], // nächster Schritt im Ablauf
        tokens: [], // nächster Schritt im Ablauf
        flags: {}, // nächster Schritt im Ablauf
        summonedTurn: 0, // nächster Schritt im Ablauf
        tapped: false, // nächster Schritt im Ablauf
        attackUsed: false, // nächster Schritt im Ablauf
      };
    }

    // Katalogdefinition zu einer Instanz.
    defOf(inst) { // nächster Schritt im Ablauf
      return this.byId[inst.cardId]; // Wert zurückgeben
    }

    // Zwei Spieler, gemischte Decks, Starthand, Zug 1.
    createMatch(opts) { // Partie mit zwei Spielern anlegen
      const p0 = this._makePlayer(0, opts.deck0, opts.doctrine0, opts.name0); // Doktrin
      const p1 = this._makePlayer(1, opts.deck1, opts.doctrine1, opts.name1); // Doktrin
      this.state = { // Feld der Engine-Instanz
        version: '0.25',
        seed: (opts && opts.seed) || 0,
        mode: opts.mode || 'hotseat', // nächster Schritt im Ablauf
        turn: 1, // nächster Schritt im Ablauf
        active: 0, // nächster Schritt im Ablauf
        phase: 'main', // nächster Schritt im Ablauf
        winner: null, // nächster Schritt im Ablauf
        endReason: null, // nächster Schritt im Ablauf
        peaceOffer: null, // nächster Schritt im Ablauf
        stack: [], // nächster Schritt im Ablauf
        pending: null, // offene Wahl des Spielers
        events: [], // nächster Schritt im Ablauf
        players: [p0, p1], // nächster Schritt im Ablauf
        tokensOnBoard: [],
        seq: 0,
      };
      this._draw(p0, this.rules.hand_start); // Karten vom Deck auf die Hand
      this._draw(p1, this.rules.hand_start); // Karten vom Deck auf die Hand
      this._log('Partie beginnt. 5 AP, Front 3×3, Soforteinsätze 0 AP (Test).'); // Zeile ins Protokoll
      return this.getState(); // Stand kopieren
    }

    // Einen Spieler mit Deck, Doktrinen und leerem Feld bauen.
    _makePlayer(id, deckIds, doctrineIds, name) { // Doktrin
      const deckDefs = (deckIds || []).filter((cid) => this.byId[cid] && this.byId[cid].typ !== 'Doktrin' && this.byId[cid].typ !== 'Token' && this.byId[cid].typ !== 'Asset');
      // Liste einschränken
      const deck = shuffle(deckDefs.map((cid) => this.instFromId(cid, id)), this.rand); // Liste umformen
      const doctrines = (doctrineIds || []).map((cid) => this.instFromId(cid, id)); // Doktrin
      return { // Wert zurückgeben
        id, // nächster Schritt im Ablauf
        flags: {}, // nächster Schritt im Ablauf
        name: (name && String(name).trim()) || (id === 0 ? 'Spieler A' : 'Spieler B'), // nächster Schritt im Ablauf
        ap: this.rules.ap_per_turn, // Feld der Engine-Instanz
        apBank: 0, // nächster Schritt im Ablauf
        vp: 0, // nächster Schritt im Ablauf
        doctrines, // Doktrin
        deck, // nächster Schritt im Ablauf
        hand: [], // Handkarten
        grave: [], // Friedhof
        support: new Array(this.rules.support_slots || 18).fill(null), // Unterstützungszone
        front: emptyFront(),
        nml: emptyFront(),
        delayed: [],
      };
    }

    // Abzug des Stands für UI und LAN.
    getState() {
      const raw = this.state || {};
      try {
        return JSON.parse(JSON.stringify(raw, function (k, v) {
          if (v && typeof v === 'object') {
            if (v.uid && v.cardId && v.attachments && k === 'patient') return v.uid;
          }
          return v;
        }));
      } catch (e) {
        return { seq: raw.seq || 0, error: 'Stand nicht kopierbar', turn: raw.turn, active: raw.active, pending: raw.pending, players: raw.players };
      }
    }

    // Eine Protokollzeile anhängen.
    _log(msg, extra) { // Zeile ins Protokoll
      this.log.push({ t: this.state ? this.state.turn : 0, a: this.state ? this.state.active : 0, msg, extra: extra || null });
      // Feld der Engine-Instanz
      if (this.log.length > 400) this.log.shift(); // Zweig nur bei zutreffender Bedingung
    }

    // Sichtbares Ereignis für die Rundenübersicht plus Log.
    _evt(kind, def, text, extra) {
      if (this.state && this.state._muteEvents) return;
      if (!this.state.events) this.state.events = []; // Zweig nur bei zutreffender Bedingung
      this.state.events.push({ // Feld der Engine-Instanz
        turn: this.state.turn, // Feld der Engine-Instanz
        actor: this.state.active, // Feld der Engine-Instanz
        kind, // nächster Schritt im Ablauf
        cardId: def && def.id, // nächster Schritt im Ablauf
        image: def && def.image, // nächster Schritt im Ablauf
        name: def && def.name, // nächster Schritt im Ablauf
        text: text || '',
        owner: extra && extra.owner,
        uid: extra && extra.uid
      });
      if (this.state.events.length > 80) this.state.events.splice(0, this.state.events.length - 80); // Zweig nur bei zutreffender Bedingung
      if (text) this._log(text); // Zeile ins Protokoll
    }

    // Spieler 0 oder 1.
    player(id) { // nächster Schritt im Ablauf
      return this.state.players[id]; // Wert zurückgeben
    }

    // Der jeweils andere.
    opponent(id) { // nächster Schritt im Ablauf
      return this.state.players[id === 0 ? 1 : 0]; // Wert zurückgeben
    }

    // n Karten ziehen, Handlimit 10, Friedhof-Nachmischen.
    _shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(this.rand() * (i + 1));
        const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
      }
    }

    _draw(p, n) { // Karten vom Deck auf die Hand
      for (let i = 0; i < n; i++) { // Schleife
        if (!p.deck.length) this._reshuffle(p); // Zweig nur bei zutreffender Bedingung
        if (!p.deck.length) break; // Zweig nur bei zutreffender Bedingung
        const c = p.deck.shift(); // unveränderliche Bindung in diesem Block
        if (p.hand.length >= (this.rules.max_hand || 7)) { // Handkarten
          p.grave.push(c); // Friedhof
          this._log(p.name + ' wirft ' + this.defOf(c).name + ' ab (Hand voll).'); // Zeile ins Protokoll
        } else {
          p.hand.push(c);
          this._evt('draw', this.defOf(c), p.name + ' zieht eine Karte.', { owner: p.id, uid: c.uid });
        }
      }
    }

    _reshuffle(p) { // nächster Schritt im Ablauf
      if (!p.grave.length) return; // Friedhof
      this._log(p.name + ': Friedhof wird gemischt — der Kampf endet nicht.'); // Zeile ins Protokoll
      p.deck = shuffle(p.grave, this.rand); // Friedhof
      p.grave = []; // Friedhof
    }

    // Instanz irgendwo auf dem Tisch finden.
    findInst(uid) { // nächster Schritt im Ablauf
      for (const p of this.state.players) { // Schleife
        for (const s of SECTIONS) { // Schleife
          for (let r = 0; r < 3; r++) { // Schleife
            const u = p.front[s][r]; // unveränderliche Bindung in diesem Block
            if (u && u.uid === uid) return { inst: u, player: p, zone: 'front', section: s, row: r };
            const tok = p.nml && p.nml[s] && p.nml[s][r];
            if (tok && tok.uid === uid) return { inst: tok, player: p, zone: 'nml', section: s, row: r };
            if (u) { // Zweig nur bei zutreffender Bedingung
              for (const a of u.attachments) { // Schleife
                if (a.uid === uid) return { inst: a, player: p, zone: 'equip', host: u, section: s, row: r }; // Wert zurückgeben
              }
            }
          }
        }
        for (let i = 0; i < p.support.length; i++) { // Unterstützungszone
          const u = p.support[i]; // Unterstützungszone
          if (u && u.uid === uid) return { inst: u, player: p, zone: 'support', index: i }; // Unterstützungszone
        }
        for (const u of p.hand) if (u.uid === uid) return { inst: u, player: p, zone: 'hand' }; // Handkarten
        for (const u of p.doctrines) if (u.uid === uid) return { inst: u, player: p, zone: 'doctrine' }; // Doktrin
      }
      return null; // Wert zurückgeben
    }

    _canAct(inst, pid) {
      if (!inst) return false;
      const def = this.defOf(inst);
      if (def.typ === 'Doktrin') return true;
      if (inst.flags && inst.flags.exhausted) return false;
      if (inst.flags && inst.flags.paused) return false;
      if (inst.flags && inst.flags.noCombatUntil === this.state.turn) return false;
      if (inst.attackUsed) return false;
      if (inst.summonedTurn != null && inst.summonedTurn >= this.state.turn) return false;
      if (inst.summonedTurn === this.state.turn - 1 && this.state.active !== inst.owner) return false;
      return pid == null || inst.owner === pid;
    }

    nmlAt(p, section, row) {
      if (!p.nml || !p.nml[section]) return null;
      return p.nml[section][row] || null;
    }

    _fortValueBonus(owner) {
      return this._hasDoctrine(owner, 'BOLLWERK_TOKEN_PLUS') ? 1 : 0;
    }

    _hasCover(p, section, row) {
      const tok = this.nmlAt(p, section, row);
      if (tok) return true;
      return (p.support || []).some((s) => s && hasTag(this.defOf(s), 'befestigung'));
    }

    frontList(p) {
      const out = []; // unveränderliche Bindung in diesem Block
      SECTIONS.forEach((s) => { // jedes Element
        ROWS.forEach((r) => { // jedes Element
          const u = p.front[s][r]; // unveränderliche Bindung in diesem Block
          if (u) out.push({ inst: u, section: s, row: r }); // Zweig nur bei zutreffender Bedingung
        }); // nächster Schritt im Ablauf
      }); // nächster Schritt im Ablauf
      return out; // Wert zurückgeben
    }

    // Freie Frontstellungen.
    emptySlots(p) { // nächster Schritt im Ablauf
      const out = []; // unveränderliche Bindung in diesem Block
      SECTIONS.forEach((s) => { // jedes Element
        ROWS.forEach((r) => { // jedes Element
          if (!p.front[s][r]) out.push({ section: s, row: r }); // Zweig nur bei zutreffender Bedingung
        }); // nächster Schritt im Ablauf
      }); // nächster Schritt im Ablauf
      return out; // Wert zurückgeben
    }

    // Aktuelle AP-Kosten inkl. Auren.
    _istStellung(def) {
      if (hasTag(def, 'stellung') || hasTag(def, 'artillerie')) return def.name !== 'Festungsanlage';
      return false;
    }

    costOf(def, player, kind, inst) {
      if (inst && inst.flags && inst.flags.freePlayOnTurn === this.state.turn) return 0;
      if (kind === 'instant' || def.typ === 'Soforteinsatz') return this.rules.instant_ap_test || 0;
      let cost = Number(def.ap || 0);
      if (def.typ === 'Ausrüstung') cost = Number(def.ap || 0) + Number(this.rules.equip_ap_test || 0);
      // AURA_COST_MOD from own support / doctrines
      this._auras(player).forEach((a) => { // jedes Element
        if (a.code === 'AURA_COST_MOD') { // Zweig nur bei zutreffender Bedingung
          const filter = String(a.param.filter || '').toLowerCase(); // unveränderliche Bindung in diesem Block
          const ok = // unveränderliche Bindung in diesem Block
            !filter || // nächster Schritt im Ablauf
            filter === 'front_unit' && def.typ === 'Einheit' || // nächster Schritt im Ablauf
            filter.includes('infanterie') && isInfantry(def) ||
            filter.includes('unterstuetzung') && def.typ === 'Unterstützung' ||
            filter.includes('all');
          if (ok) cost += Number(a.param.delta || 0);
        }
      });
      if (def.typ === 'Ausrüstung' && player) {
        const n = (player.support || []).filter((s) => s && (this.defOf(s).effects || []).some((x) => x.code === 'EQUIP_DISCOUNT')).length;
        cost -= n;
      }
      if (def.typ === 'Einheit' && player) {
        const n = (player.support || []).filter((s) => s && (this.defOf(s).effects || []).some((x) => x.code === 'UNIT_DISCOUNT')).length;
        cost -= n;
      }
      if (player && player.flags && player.flags.tacticDiscount && def.typ !== 'Soforteinsatz') {
        cost -= 1;
      }
      return Math.max(1, cost);
    }

    _auras(player) { // nächster Schritt im Ablauf
      const list = []; // unveränderliche Bindung in diesem Block
      const add = (inst) => { // unveränderliche Bindung in diesem Block
        if (!inst) return; // Zweig nur bei zutreffender Bedingung
        const def = this.defOf(inst); // unveränderliche Bindung in diesem Block
        (def.effects || []).forEach((e) => { // jedes Element
          if (e.code === 'AURA_STAT' || e.code === 'AURA_COST_MOD') list.push({ code: e.code, param: e.param, source: inst });
          // Zweig nur bei zutreffender Bedingung
        }); // nächster Schritt im Ablauf
      };
      player.doctrines.forEach(add); // Doktrin
      player.support.forEach(add); // Unterstützungszone
      this.frontList(player).forEach((x) => add(x.inst)); // jedes Element
      return list; // Wert zurückgeben
    }

    // A/V nach Buffs und Ausrüstung.
    _hasDoctrine(p, code) {
      return (p.doctrines || []).some((d) => {
        const def = this.defOf(d);
        return (def.effects || []).some((x) => x.code === code);
      });
    }

    currentAtkDef(inst) { // nächster Schritt im Ablauf
      const def = this.defOf(inst); // unveränderliche Bindung in diesem Block
      let atk = inst.atk == null ? (Number(def.atk) || 0) : inst.atk;
      let dv = inst.def == null ? (Number(def.def) || 0) : inst.def;
      if (inst.flags && inst.flags.buffAtk) atk += inst.flags.buffAtk;
      const locOwn = this.findInst(inst.uid);
      const owner = (locOwn && locOwn.player) || (inst.owner != null ? this.player(inst.owner) : null);
      if (owner) this._auras(owner).forEach((a) => {
        if (a.code !== 'AURA_STAT') return; // Zweig nur bei zutreffender Bedingung
        const f = String(a.param.filter || ''); // unveränderliche Bindung in diesem Block
        const okFront = f.includes('front') || f.includes('all') || f === '';
        const needInf = f.includes('infanterie');
        const needArt = f.includes('artillerie');
        let typeOk = true;
        if (needInf || needArt) {
          typeOk = (needInf && isInfantry(def)) || (needArt && isArtillery(def)) || hasTag(def, 'infanterie') || hasTag(def, 'artillerie');
        }
        if (okFront && typeOk) {
          atk += Number(a.param.atk || 0);
          dv += Number(a.param.def || 0);
        }
      }); // nächster Schritt im Ablauf
      inst.attachments.forEach((eq) => { // jedes Element
        const ed = this.defOf(eq); // unveränderliche Bindung in diesem Block
        (ed.effects || []).forEach((e) => { // jedes Element
          if (e.code === 'BUFF' || e.code === 'AURA_STAT') { // Zweig nur bei zutreffender Bedingung
            atk += Number(e.param.atk || 0); // nächster Schritt im Ablauf
            dv += Number(e.param.def || 0); // nächster Schritt im Ablauf
          }
        }); // nächster Schritt im Ablauf
      }); // nächster Schritt im Ablauf
      if (inst.flags.buffAtk) atk += inst.flags.buffAtk;
      if (inst.flags.buffDef) dv += inst.flags.buffDef;
      if (!inst.facedown && inst.summonedTurn === this.state.turn && owner && this._hasDoctrine(owner, 'BLITZ_SUMMON_ATK')) {
        if (hasTag(def, 'panzer') || hasTag(def, 'mech-infanterie')) atk += 1;
      }
      if (inst.flags && inst.flags.kavUntil === this.state.turn) atk += 2;
      if (inst.flags && inst.flags.lageUntil === this.state.turn) atk += 1;
      if (inst.flags && inst.flags.ehrenUntil === this.state.turn) atk += 2;
      if (inst.flags && inst.flags.eiferUntil === this.state.turn) atk += 3;
      if (inst.flags && inst.flags.standUntil === this.state.turn) atk += 2;
      if (inst.flags && inst.flags.formUntil === this.state.turn) atk += 1;
      if (inst.flags && inst.flags.volkUntil === this.state.turn) atk += 2;
      if (inst.flags && inst.flags.pact) atk += 2;
      if (owner) {
        const loc = this.findInst(inst.uid);
        if (loc && loc.zone === 'front') {
          this._neighbors(owner, loc.section, loc.row).forEach((n) => {
            if (n.inst && (this.defOf(n.inst).effects || []).some((x) => x.code === 'FLANK_DEF')) dv += 2;
          });
        }
      }
      if (owner) {
        (owner.support || []).forEach((s) => {
          if (!s) return;
          const sd = this.defOf(s);
          if ((sd.effects || []).some((x) => x.code === 'AURA_FRONT_ATK')) atk += 1;
          if ((sd.effects || []).some((x) => x.code === 'AURA_FRONT_DEF')) dv += 2;
          if ((sd.effects || []).some((x) => x.code === 'AURA_FRONT_DEF_GEN')) dv += 2;
        });
        const foe = this.opponent(owner.id);
        (foe.support || []).forEach((s) => {
          if (s && (this.defOf(s).effects || []).some((x) => x.code === 'AURA_ENEMY_ATK')) atk -= 1;
        });
      }
      if (owner && this._hasDoctrine(owner, 'BOLLWERK_COVER_ATK')) {
        const loc = this.findInst(inst.uid);
        if (loc && loc.zone === 'front' && this._hasCover(owner, loc.section, loc.row)) atk += 1;
      }
      return { atk, def: dv };
    }

    explainStats(inst) {
      const def = this.defOf(inst);
      const printedAtk = Number(def.atk) || 0;
      const printedDef = Number(def.def) || 0;
      const now = this.currentAtkDef(inst);
      const atkWhy = ['Druckwert Angriff: ' + printedAtk];
      const defWhy = ['Druckwert Verteidigung: ' + printedDef];
      if (inst.def != null && inst.def !== printedDef) defWhy.push('Aktuelle Stabilität: ' + inst.def + ' (Schaden oder Heilung)');
      if (inst.flags && inst.flags.buffAtk) atkWhy.push('Effekt +' + inst.flags.buffAtk + ' Angriff');
      if (inst.flags && inst.flags.buffDef) defWhy.push('Effekt +' + inst.flags.buffDef + ' Verteidigung');
      const locOwn = this.findInst(inst.uid);
      const owner = (locOwn && locOwn.player) || (inst.owner != null ? this.player(inst.owner) : null);
      if (owner) {
        this._auras(owner).forEach((a) => {
          if (a.code !== 'AURA_STAT') return;
          const src = a.source ? this.defOf(a.source).name : 'Aura';
          const da = Number(a.param.atk || 0);
          const dd = Number(a.param.def || 0);
          if (da) atkWhy.push(src + ': ' + (da > 0 ? '+' : '') + da + ' Angriff');
          if (dd) defWhy.push(src + ': ' + (dd > 0 ? '+' : '') + dd + ' Verteidigung');
        });
      }
      (inst.attachments || []).forEach((eq) => {
        const ed = this.defOf(eq);
        const da = ((ed.effects || []).filter((e) => e.code === 'BUFF' || e.code === 'AURA_STAT')).reduce((s, e) => s + Number(e.param.atk || 0), 0);
        const dd = ((ed.effects || []).filter((e) => e.code === 'BUFF' || e.code === 'AURA_STAT')).reduce((s, e) => s + Number(e.param.def || 0), 0);
        if (da) atkWhy.push(ed.name + ': ' + (da > 0 ? '+' : '') + da + ' Angriff');
        if (dd) defWhy.push(ed.name + ': ' + (dd > 0 ? '+' : '') + dd + ' Verteidigung');
      });
      if (inst.flags && inst.flags.kavUntil === this.state.turn) atkWhy.push('Eingriff der Kavallerie: +2 Angriff');
      if (inst.flags && inst.flags.lageUntil === this.state.turn) atkWhy.push('Lagebesprechung: +1 Angriff');
      if (inst.flags && inst.flags.ehrenUntil === this.state.turn) atkWhy.push('Militärische Ehren: +2 Angriff');
      if (inst.flags && inst.flags.eiferUntil === this.state.turn) atkWhy.push('Religiöser Eifer: +3 Angriff');
      if (inst.flags && inst.flags.standUntil === this.state.turn) atkWhy.push('Standgericht: +2 Angriff');
      if (inst.flags && inst.flags.formUntil === this.state.turn) atkWhy.push('Standhafte Formation: +1 Angriff');
      if (inst.flags && inst.flags.volkUntil === this.state.turn) atkWhy.push('Wille des Volkes: +2 Angriff');
      if (inst.flags && inst.flags.pact) atkWhy.push('Uralter Pakt: +2 Angriff');
      if (inst.flags && inst.flags.schanzen) defWhy.push('Schanzen: +' + inst.flags.schanzen + ' Verteidigung');
      if (owner) {
        (owner.support || []).forEach((s) => {
          if (!s) return;
          const sd = this.defOf(s);
          if ((sd.effects || []).some((x) => x.code === 'AURA_FRONT_ATK')) atkWhy.push(sd.name + ': +1 Angriff');
          if ((sd.effects || []).some((x) => x.code === 'AURA_FRONT_DEF' || x.code === 'AURA_FRONT_DEF_GEN')) defWhy.push(sd.name + ': +2 Verteidigung');
        });
        const foe = this.opponent(owner.id);
        (foe.support || []).forEach((s) => {
          if (s && (this.defOf(s).effects || []).some((x) => x.code === 'AURA_ENEMY_ATK')) atkWhy.push(this.defOf(s).name + ': −1 Angriff');
        });
      }
      return {
        atk: now.atk,
        def: now.def,
        printedAtk: printedAtk,
        printedDef: printedDef,
        atkWhy: atkWhy,
        defWhy: defWhy
      };
    }

    // Ziele gegenüber und auf den Nachbarflanken.
    legalAttackTargets(attackerLoc) { // nächster Schritt im Ablauf
      const att = attackerLoc.inst; // unveränderliche Bindung in diesem Block
      const defn = this.defOf(att); // unveränderliche Bindung in diesem Block
      const ownerId = (attackerLoc.player && attackerLoc.player.id != null) ? attackerLoc.player.id : att.owner;
      const enemy = this.opponent(ownerId);
      const owner = this.player(ownerId);
      const out = []; // unveränderliche Bindung in diesem Block
      const anyFront = (defn.effects || []).some((e) => e.code === 'ATTACK_ANY_FRONT') || isArtillery(defn);
      // unveränderliche Bindung in diesem Block
      const hasScout = this.frontList(owner).some((l) => hasTag(this.defOf(l.inst), 'aufklaerung'));
      const pipe = hasTag(defn, 'rohrartillerie') || hasTag(defn, 'artillerie');
      const canSupport = (defn.effects || []).some((e) => e.code === 'ATTACK_SUPPORT') ||
        (this._hasDoctrine(owner, 'SPOTTER_SUPPORT_ATK') && pipe && hasScout);
      this.frontList(enemy).forEach((t) => { // jedes Element
        if (anyFront) { // Zweig nur bei zutreffender Bedingung
          out.push(t); // nächster Schritt im Ablauf
          return; // nächster Schritt im Ablauf
        }
        if (t.section === attackerLoc.section) out.push(t); // Zweig nur bei zutreffender Bedingung
        else if (adjacentSections(attackerLoc.section).includes(t.section) && t.row === attackerLoc.row) out.push(t);
        // Zweig nur bei zutreffender Bedingung
        else if (t.section === attackerLoc.section) out.push(t); // Zweig nur bei zutreffender Bedingung
        // opposite + left/right: same row adjacent sections OR same section any? Rules: "Einheit vor sich und links und rechts"
        // Interpret: facing slot + neighboring slots in the enemy front of adjacent sections at same depth.
      }); // nächster Schritt im Ablauf
      // Tighten: facing = same section + same row; left/right = adjacent section, same row.
      const tight = []; // unveränderliche Bindung in diesem Block
      this.frontList(enemy).forEach((t) => { // jedes Element
        if (anyFront) tight.push(t); // Zweig nur bei zutreffender Bedingung
        else if (t.section === attackerLoc.section && t.row === attackerLoc.row) tight.push(t); // Zweig nur bei zutreffender Bedingung
        else if (adjacentSections(attackerLoc.section).includes(t.section) && t.row === attackerLoc.row) tight.push(t);
        // Zweig nur bei zutreffender Bedingung
        else if (t.section === attackerLoc.section && Math.abs(t.row - attackerLoc.row) === 1) tight.push(t);
        // Zweig nur bei zutreffender Bedingung
      }); // nächster Schritt im Ablauf
      if (canSupport) {
        (enemy.support || []).forEach((s, i) => {
          if (s) tight.push({ inst: s, player: enemy, zone: 'support', index: i, section: 'C', row: 0 });
        });
      }
      const filtered = tight.filter((t) => {
        if (t.inst.flags && t.inst.flags.noCombatUntil === this.state.turn) return false;
        if (t.inst.facedown && (this.defOf(t.inst).effects || []).some((x) => x.code === 'GUERRILLA_HIDE')) return false;
        const td = this.defOf(t.inst);
        if ((td.name || '').includes('Himmelhund')) { // Zweig nur bei zutreffender Bedingung
          // needs two shouldered attackers — v1: only legal if attacker has a neighbor
          const neighbors = this._neighbors(this.player(att.owner), attackerLoc.section, attackerLoc.row);
          // unveränderliche Bindung in diesem Block
          return neighbors.length >= 1; // Wert zurückgeben
        }
        return true; // Wert zurückgeben
      }); // nächster Schritt im Ablauf
      if (canSupport) { // Zweig nur bei zutreffender Bedingung
        enemy.support.forEach((s, i) => { // Unterstützungszone
          if (s) filtered.push({ inst: s, zone: 'support', index: i, section: 'SUP', row: i }); // Unterstützungszone
        }); // nächster Schritt im Ablauf
      }
      return filtered; // Wert zurückgeben
    }

    // Benachbarte Stellungen derselben Flanke-Linie.
    _neighbors(p, section, row) { // nächster Schritt im Ablauf
      const n = []; // unveränderliche Bindung in diesem Block
      adjacentSections(section).forEach((s) => { // jedes Element
        const u = p.front[s][row]; // unveränderliche Bindung in diesem Block
        if (u) n.push({ inst: u, section: s, row }); // Zweig nur bei zutreffender Bedingung
      }); // nächster Schritt im Ablauf
      if (row > 0 && p.front[section][row - 1]) n.push({ inst: p.front[section][row - 1], section, row: row - 1 });
      // Zweig nur bei zutreffender Bedingung
      if (row < 2 && p.front[section][row + 1]) n.push({ inst: p.front[section][row + 1], section, row: row + 1 });
      // Zweig nur bei zutreffender Bedingung
      return n; // Wert zurückgeben
    }

    // Was der Spieler jetzt tun darf (für Bot und Prüfungen).
    listActions(playerId) { // erlaubte Züge aufzählen
      const st = this.state; // unveränderliche Bindung in diesem Block
      if (!st || st.winner != null) return []; // Wert zurückgeben
      const p = this.player(playerId); // unveränderliche Bindung in diesem Block
      const acts = []; // unveränderliche Bindung in diesem Block
      const isActive = st.active === playerId && st.phase === 'main'; // unveränderliche Bindung in diesem Block
      const canReact = st.active !== playerId && p.ap > 0 && st.phase !== 'gameover'; // unveränderliche Bindung in diesem Block

      if (st.pending && st.pending.player === playerId) { // offene Wahl des Spielers
        return st.pending.choices.map((c) => Object.assign({ type: 'RESOLVE_PENDING' }, c)); // offene Wahl des Spielers
      }

      if (isActive || canReact) { // Zweig nur bei zutreffender Bedingung
        p.hand.forEach((c) => { // Handkarten
          const d = this.defOf(c); // unveränderliche Bindung in diesem Block
          const cost = this.costOf(d, p); // unveränderliche Bindung in diesem Block
          if (d.typ === 'Soforteinsatz' && p.ap >= cost) { // Zweig nur bei zutreffender Bedingung
            acts.push({ type: 'PLAY', uid: c.uid, cardId: d.id, name: d.name, typ: d.typ, cost }); // nächster Schritt im Ablauf
          } else if (isActive && p.ap >= cost) { // Zweig nur bei zutreffender Bedingung
            acts.push({ type: 'PLAY', uid: c.uid, cardId: d.id, name: d.name, typ: d.typ, cost }); // nächster Schritt im Ablauf
          }
        }); // nächster Schritt im Ablauf
      }

      if (isActive) { // Zweig nur bei zutreffender Bedingung
        this.frontList(p).forEach((loc) => { // jedes Element
          if (loc.inst.facedown) { // verdeckte Lage
            acts.push({ type: 'REVEAL_UNIT', uid: loc.inst.uid, name: this.defOf(loc.inst).name }); // Feld der Engine-Instanz
          }
          if (!loc.inst.facedown && this._canAct(loc.inst, playerId) && !loc.inst.flags.noAttack) {
            const targets = this.legalAttackTargets(loc); // unveränderliche Bindung in diesem Block
            if (targets.length && p.ap >= this.rules.attack_ap) { // Zweig nur bei zutreffender Bedingung
              acts.push({ // nächster Schritt im Ablauf
                type: 'ATTACK', // nächster Schritt im Ablauf
                uid: loc.inst.uid, // nächster Schritt im Ablauf
                name: this.defOf(loc.inst).name, // Feld der Engine-Instanz
                cost: this.rules.attack_ap, // Feld der Engine-Instanz
                targets: targets.map((t) => ({ uid: t.inst.uid, name: t.inst.facedown ? 'Verdeckte Einheit' : this.defOf(t.inst).name })),
                // verdeckte Lage
              }); // nächster Schritt im Ablauf
            }
          }
        }); // nächster Schritt im Ablauf
        acts.push({ type: 'END_TURN' }); // nächster Schritt im Ablauf
        acts.push({ type: 'PROPOSE_PEACE' }); // nächster Schritt im Ablauf
      }

      if (st.peaceOffer != null && st.peaceOffer !== playerId) { // Zweig nur bei zutreffender Bedingung
        acts.push({ type: 'ACCEPT_PEACE' }); // nächster Schritt im Ablauf
        acts.push({ type: 'REJECT_PEACE' }); // nächster Schritt im Ablauf
      }
      acts.push({ type: 'CONCEDE' }); // nächster Schritt im Ablauf
      return acts; // Wert zurückgeben
    }

    // Eine Aktion ausführen. Einziger Eingang für Züge.
    dispatch(action) { // eine Aktion durch die Regeln jagen
      if (!this.state || this.state.winner != null) return { ok: false, error: 'Spiel ist vorbei' }; // Ergebnis an den Aufrufer
      const a = action || {}; // unveränderliche Bindung in diesem Block
      const pid = a.player; // unveränderliche Bindung in diesem Block
      if (pid !== 0 && pid !== 1) return { ok: false, error: 'Spieler fehlt' }; // Ergebnis an den Aufrufer
      try { // Fehler auffangen
        switch (a.type) { // Aktionstyp unterscheiden
          case 'PLAY': return this._actPlay(pid, a); // Karte aus der Hand spielen
          case 'CHOOSE_SLOT': return this._actSlot(pid, a); // Einheit auf eine Stellung legen
          case 'CHOOSE_TARGET': return this._actTarget(pid, a); // Ziel aufnehmen oder Kampf lösen
          case 'ATTACK': return this._actAttack(pid, a); // Angriff einleiten
          case 'CANCEL_PENDING': return this._actCancel(pid, a); // offene Wahl verwerfen
          case 'COIN_FLIP': return this._actCoin(pid, a); // Münze werfen
          case 'CONFIRM_TARGETS': return this._actConfirmTargets(pid, a); // Wert zurückgeben
          case 'REVEAL_UNIT': return this._actReveal(pid, a); // Wert zurückgeben
          case 'END_TURN': return this._actEnd(pid);
          case 'USE_ABILITY': return this._actUseAbility(pid, a);
          case 'ACTIVATE_SUPPORT': return this._actUseAbility(pid, a);
          case 'SCHUTZWALL': return this._actSchutzwall(pid, a);
          case 'SAM_BLOCK': return this._resolveSam(pid, true);
          case 'SAM_PASS': return this._resolveSam(pid, false);
          case 'GEIST_PASS': return this._passGeist();
          case 'REACT_PASS': return this._resumeAfterReact(pid);
          case 'PEEK_DONE': return this._finishPeek(pid);
          case 'COMM_COORD': return this._commCoord(pid, a);
          case 'COMM_SCOUT': return this._commScout(pid, a);
          case 'SPY_KEEP': this.state.pending = null; return { ok: true };
          case 'SPY_BOTTOM': return this._spyBottom(pid);
          case 'BRUMM_JAM': return this._brummJam(pid, a);
          case 'BRUMM_HIJACK': return this._brummHijack(pid, a);
          case 'HEAL_ARMORED': return this._actHealArmored(pid, a);
          case 'UEBERSCHUSS': return this._actUeberschuss(pid, a);
          case 'CONCEDE': return this._end(pid === 0 ? 1 : 0, 'Aufgabe'); // Wert zurückgeben
          case 'PROPOSE_PEACE': // dieser Aktionstyp
            this.state.peaceOffer = pid; // Feld der Engine-Instanz
            this._log(this.player(pid).name + ' bietet weißen Frieden.'); // Zeile ins Protokoll
            return { ok: true }; // Ergebnis an den Aufrufer
          case 'ACCEPT_PEACE': // dieser Aktionstyp
            return this._end(null, 'Weißer Frieden'); // Wert zurückgeben
          case 'REJECT_PEACE': // dieser Aktionstyp
            this.state.peaceOffer = null; // Feld der Engine-Instanz
            this._log('Frieden abgelehnt.'); // Zeile ins Protokoll
            return { ok: true }; // Ergebnis an den Aufrufer
          case 'RESOLVE_PENDING': // dieser Aktionstyp
            return this._resolvePending(pid, a); // Wert zurückgeben
          default: // unbekannter Fall
            return { ok: false, error: 'Unbekannte Aktion ' + a.type }; // Ergebnis an den Aufrufer
        }
      } catch (err) {
        return { ok: false, error: String(err.message || err) };
      } finally {
        if (this.state) this.state.seq = (this.state.seq || 0) + 1;
      }
    }

    // Partie beenden.
    _end(winner, reason) { // nächster Schritt im Ablauf
      this.state.winner = winner; // Feld der Engine-Instanz
      this.state.endReason = reason; // Feld der Engine-Instanz
      this.state.phase = 'gameover'; // Feld der Engine-Instanz
      if (winner == null) this._log('Weißer Frieden. Der Krieg ist nicht mehr führbar.'); // Zeile ins Protokoll
      else this._log(this.player(winner).name + ' siegt (' + reason + ').'); // Zeile ins Protokoll
      return { ok: true, gameover: true }; // Ergebnis an den Aufrufer
    }

    // AP abziehen oder Fehler.
    _spend(p, n) { // Aktionspunkte abziehen
      if (p.ap < n) throw new Error('Nicht genug AP (' + p.ap + '/' + n + ')'); // Regelverstoß, Zug ungültig
      p.ap -= n; // nächster Schritt im Ablauf
    }

    // Karte aus der Hand: Einheit, Support, Gerät, Soforteinsatz.
    _actPlay(pid, a) { // Karte aus der Hand spielen
      const p = this.player(pid); // unveränderliche Bindung in diesem Block
      const found = p.hand.find((c) => c.uid === a.uid); // Handkarten
      if (!found) throw new Error('Karte nicht auf der Hand'); // Regelverstoß, Zug ungültig
      const def = this.defOf(found); // unveränderliche Bindung in diesem Block
      const cost = this.costOf(def, p, null, found);
      const isActive = this.state.active === pid && this.state.phase === 'main'; // unveränderliche Bindung in diesem Block
      if (def.typ !== 'Soforteinsatz' && !isActive) throw new Error('Nur Soforteinsätze als Reaktion'); // Regelverstoß, Zug ungültig
      if (def.typ !== 'Einheit') {
        this._spend(p, cost);
        if (p.flags && p.flags.tacticDiscount && def.typ !== 'Soforteinsatz') p.flags.tacticDiscount = false;
      }

      if (a.facedown && this._istStellung(def) && def.typ === 'Unterstützung') {
        const idx = p.support.findIndex((x) => !x);
        if (idx < 0) { p.ap += cost; throw new Error('Support voll'); }
        p.hand = p.hand.filter((c) => c.uid !== found.uid);
        found.facedown = true;
        found.summonedTurn = this.state.turn;
        p.support[idx] = found;
        this._log(def.name + ' liegt verdeckt im Support (Stellung).');
        return { ok: true };
      }
      if (def.typ === 'Einheit') {
        const slots = this.emptySlots(p);
        if (!slots.length) throw new Error('Keine freie Stellung');
        const picked = a.slot && a.slot.section != null && String(a.slot.section) !== ''
          ? { section: a.slot.section, row: Number(a.slot.row) }
          : null;
        if (p.ap < cost) throw new Error('Nicht genug AP (' + p.ap + '/' + cost + ')');
        const apBefore = p.ap;
        this.state.pending = this._sealPending({
          kind: 'deploy',
          player: pid,
          uid: found.uid,
          facedown: !!a.facedown && def.verdeckt_ok,
          paid: 0,
          cost: cost,
          choices: slots.map((s) => ({ slot: s, label: s.section + (s.row + 1) })),
        });
        if (!picked) return { ok: true, need: 'slot' };
        let chosen = picked;
        const exact = p.front[chosen.section] && chosen.row >= 0 && chosen.row <= 2 && !p.front[chosen.section][chosen.row];
        if (!exact) {
          const free = this.emptySlots(p)[0];
          if (!free) throw new Error('Keine freie Stellung');
          chosen = free;
        }
        try {
          const placed = this._actSlot(pid, { slot: chosen });
          const there = p.front[chosen.section] && p.front[chosen.section][chosen.row] && p.front[chosen.section][chosen.row].uid === found.uid;
          if (!there) throw new Error('Karte nicht gelegt');
          if (p.flags && p.flags.tacticDiscount) p.flags.tacticDiscount = false;
          return placed;
        } catch (err) {
          const onSlot = p.front[chosen.section] && p.front[chosen.section][chosen.row] && p.front[chosen.section][chosen.row].uid === found.uid;
          if (onSlot) return { ok: true };
          this.state.pending = null;
          if (p.front[chosen.section] && p.front[chosen.section][chosen.row] && p.front[chosen.section][chosen.row].uid === found.uid) {
            p.front[chosen.section][chosen.row] = null;
          }
          if (!p.hand.some((c) => c.uid === found.uid)) p.hand.push(found);
          p.ap = apBefore;
          throw err;
        }
      }
      if (def.typ === 'Unterstützung') { // Zweig nur bei zutreffender Bedingung
        let idx = -1;
        if (a.slot && a.slot.section === 'support' && a.slot.row != null) {
          const want = Number(a.slot.row);
          if (want >= 0 && want < p.support.length && !p.support[want]) idx = want;
        }
        if (idx < 0) idx = p.support.findIndex((x) => !x);
        if (idx < 0) { // Zweig nur bei zutreffender Bedingung
          p.ap += cost; // nächster Schritt im Ablauf
          throw new Error('Support voll'); // Regelverstoß, Zug ungültig
        }
        p.hand = p.hand.filter((c) => c.uid !== found.uid);
        found.summonedTurn = this.state.turn;
        if (a.facedown) {
          const trap = (def.effects || []).some((e) => ['LAY_MINE','CANCEL_AIR_DAMAGE','AMMO_COOK','PAUSE_UNIT','SILVER_ANGEL','COURT_MARTIAL','FORMATION','RESIST','HONORS'].indexOf(e.code) >= 0);
          if (this._istStellung(def) || trap) found.facedown = true;
        }
        p.support[idx] = found;
        this._evt('support', def, p.name + ' legt ' + (found.facedown ? 'eine verdeckte Karte' : def.name) + ' in den Support.'); // Ereignis für die Rundenübersicht
        this._onEnter(found, 'support');
        this._applySatAura(p);
        if ((def.effects || []).some((x) => x.code === 'SLEEPER')) found.flags.sleeper = 3;
        if ((def.effects || []).some((x) => x.code === 'NO_FACE_DOWN')) {
          this.frontList(this.opponent(p.id)).forEach((l) => { l.inst.facedown = false; });
        }
        if ((def.effects || []).some((x) => x.code === 'PACT_BOND')) {
          const units = this.frontList(p);
          if (units.length) {
            this.state.pending = this._sealPending({
              kind: 'pact',
              player: p.id,
              srcUid: found.uid,
              choices: units.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
            });
            return { ok: true, need: 'target' };
          }
        }
        return { ok: true };
      }
      if (def.typ === 'Ausrüstung') { // Zweig nur bei zutreffender Bedingung
        let hosts = this.frontList(p);
        if ((def.effects || []).some((x) => x.param && x.param.only === 'infanterie')) {
          hosts = hosts.filter((h) => isInfantry(this.defOf(h.inst)));
        }
        if (!hosts.length) {
          p.ap += cost; // nächster Schritt im Ablauf
          throw new Error('Keine Einheit für Ausrüstung'); // Regelverstoß, Zug ungültig
        }
        this.state.pending = this._sealPending({
          kind: 'equip',
          player: pid,
          uid: found.uid,
          paid: cost,
          choices: hosts.map((h) => ({ target: h.inst.uid, label: this.defOf(h.inst).name })),
        });
        return { ok: true, need: 'target' }; // Ergebnis an den Aufrufer
      }
      if (def.typ === 'Soforteinsatz') { // Zweig nur bei zutreffender Bedingung
        return this._playInstant(p, found, a.target, a.facedown); // Wert zurückgeben
      }
      p.ap += cost; // nächster Schritt im Ablauf
      throw new Error('Typ nicht spielbar: ' + def.typ); // Regelverstoß, Zug ungültig
    }

    // Gewählte Frontstellung für eine wartende Einheit.
    _actSlot(pid, a) { // Einheit auf eine Stellung legen
      const pend = this.state.pending; // offene Wahl des Spielers
      if (pend && pend.kind === 'gassen-slot' && pend.player === pid) return this._gassenPlace(pid, a.slot);
      if (!pend || pend.player !== pid || pend.kind !== 'deploy') throw new Error('Kein Auslegen offen'); // Regelverstoß, Zug ungültig
      const p = this.player(pid); // unveränderliche Bindung in diesem Block
      const card = p.hand.find((c) => c.uid === pend.uid); // Handkarten
      if (!card) throw new Error('Karte weg'); // Regelverstoß, Zug ungültig
      const slot = a.slot; // unveränderliche Bindung in diesem Block
      if (!slot || !p.front[slot.section] || !(slot.row >= 0 && slot.row <= 2)) throw new Error('Ungültige Stellung');
      if (p.front[slot.section][slot.row]) throw new Error('Stellung belegt'); // Regelverstoß, Zug ungültig
      const due = pend.paid ? 0 : (pend.cost != null ? pend.cost : this.costOf(this.defOf(card), p, null, card));
      if (!pend.paid && p.ap < due) throw new Error('Nicht genug AP (' + p.ap + '/' + due + ')');
      p.hand = p.hand.filter((c) => c.uid !== card.uid); // Handkarten
      card.facedown = !!pend.facedown; // verdeckte Lage
      card.summonedTurn = this.state.turn; // Feld der Engine-Instanz
      p.front[slot.section][slot.row] = card; // nächster Schritt im Ablauf
      if (!pend.paid) {
        this._spend(p, due);
        pend.paid = due;
      }
      const def = this.defOf(card); // unveränderliche Bindung in diesem Block
      this._evt('deploy', def, p.name + ' stellt ' + (card.facedown ? 'eine verdeckte Einheit' : def.name) + ' auf ' + slot.section + (slot.row + 1) + '.');
      // Ereignis für die Rundenübersicht
      this.state.pending = null; // offene Wahl des Spielers
      if (!card.facedown) this._onEnter(card, 'front');
      const d2 = this.defOf(card);
      if ((d2.effects || []).some((x) => x.code === 'AUFKLAERUNG' && x.param && x.param.onEnter)) {
        const hid = this.frontList(this.opponent(pid)).filter((l) => l.inst.facedown);
        if (hid.length) {
          this.state.pending = this._sealPending({ kind: 'scout-rev', player: pid, uid: card.uid, left: 1, free: true, choices: hid.map((l) => ({ target: l.inst.uid, label: 'Verdeckt' })) });
        }
      }
      if ((d2.effects || []).some((x) => x.code === 'HAND_PEEK')) {
        const opp = this.opponent(pid);
        if (opp.hand.length) {
          this.state.pending = this._sealPending({ kind: 'hand-peek', player: pid, needCount: Math.min(2, opp.hand.length), selected: [], choices: opp.hand.map((c) => ({ target: c.uid, label: 'Verdeckt' })) });
        }
      }
      this._applyMech(this.player(pid));
      this._applyFuehrung(this.player(pid));
      this._applyFlankDef(this.player(pid));
      return { ok: true };
    }

    // Ein Ziel für Gerät, Soforteinsatz, Angriff; sammelt Mehrfachziele.
    _actTarget(pid, a) { // Ziel aufnehmen oder Kampf lösen
      const pend = this.state.pending; // offene Wahl des Spielers
      if (!pend || pend.player !== pid) throw new Error('Kein Ziel offen');
      if (pend.kind === 'command-atk') return this._resolveCommandStep(pid, a.target);
      if (pend.kind === 'last-stand') return this._resolveLastStand(pid, a.target);
      if (pend.kind === 'cover-seek') return this._resolveCoverSeek(pid, a.target);
      if (pend.kind === 'geist-unit') {
        const loc = this.findInst(a.target);
        if (!loc || loc.player.id !== pid || loc.zone !== 'front') throw new Error('Keine eigene Einheit');
        const tA = this.findInst(pend.attackerUid);
        const legal = this.legalAttackTargets(loc);
        const canHitAtk = tA && legal.some((x) => x.inst.uid === pend.attackerUid);
        if (canHitAtk && legal.length === 1) {
          return this._finishGeist(pid, loc.inst.uid, pend.attackerUid);
        }
        this.state.pending = this._sealPending({
          kind: 'geist-tgt',
          player: pid,
          unitUid: loc.inst.uid,
          attackerUid: pend.attackerUid,
          targetUid: pend.targetUid,
          atkPlayer: pend.atkPlayer,
          choices: legal.map((x) => ({ target: x.inst.uid, label: this.defOf(x.inst).name }))
        });
        if (!legal.length) return this._resumeGeistAttack(pend);
        return { ok: true, need: 'target' };
      }
      if (pend.kind === 'hand-peek') {
        if (!pend.selected) pend.selected = [];
        const id = a.target;
        const ix = pend.selected.indexOf(id);
        if (ix >= 0) pend.selected.splice(ix, 1);
        else pend.selected.push(id);
        if (pend.selected.length >= pend.needCount) {
          const opp = this.opponent(pid);
          const names = pend.selected.map((u) => {
            const c = opp.hand.find((h) => h.uid === u);
            return c ? this.defOf(c).name : '?';
          });
          this._log('Handkarten: ' + names.join(', '));
          this.state.pending = this._sealPending({ kind: 'hand-show', player: pid, names: names });
        }
        return { ok: true, need: 'peek' };
      }
      if (pend.kind === 'hero-jump') {
        const p = this.player(pid);
        const card = p.hand.find((c) => c.uid === pend.uid);
        if (card && !p.front[pend.section][pend.row]) {
          p.hand = p.hand.filter((c) => c.uid !== card.uid);
          card.facedown = false;
          card.summonedTurn = this.state.turn;
          p.front[pend.section][pend.row] = card;
          this._log('Helden springen in die Bresche.');
        }
        this.state.pending = null;
        return { ok: true };
      }
      if (pend.kind === 'pact') {
        const loc = this.findInst(a.target);
        const src = this.findInst(pend.srcUid);
        if (loc && loc.player.id === pid) {
          loc.inst.flags.pact = true;
          loc.inst.def = (loc.inst.def || 0) + 2;
          loc.inst.defMax = (loc.inst.defMax || loc.inst.def) + 2;
          if (src) src.flags.bonded = loc.inst.uid;
        }
        this.state.pending = null;
        return { ok: true };
      }
      if (pend.kind === 'brumm-jam') return this._brummJam(pid, a);
      if (pend.kind === 'brumm-hijack') return this._brummHijack(pid, a);
      if (pend.kind === 'verschieben') {
        const loc = this.findInst(pend.uid);
        const p = this.player(pid);
        const raw = String(a.target || '');
        if (this._handHasEffect(this.opponent(pid), 'CANCEL_AIR_DAMAGE')) {
          this.state.pending = this._sealPending({ kind: 'sam', player: this.opponent(pid).id, spell: true, moveUid: pend.uid, dest: raw, fromS: pend.fromS, fromR: pend.fromR, dmgToT: 0, prompt: 'Flug' });
          return { ok: true, need: 'sam' };
        }
        this._finishFlug(p, loc, raw, pend);
        return { ok: true };
      }
      if (pend.kind === 'scout-rev') {
        const src = this.findInst(pend.uid);
        if (!pend.free && pend.left === (pend.choices && 1)) {
          this._spend(this.player(pid), 1);
          if (src) src.inst.flags.exhausted = true;
        } else if (!pend.free && pend.left === Math.min(2, (pend.choices || []).length)) {
          this._spend(this.player(pid), 1);
          if (src) src.inst.flags.exhausted = true;
        }
        this._revealScout(a.target);
        pend.left -= 1;
        if (pend.left <= 0) this.state.pending = null;
        return { ok: true };
      }
      if (pend.kind === 'nest') {
        const src = this.findInst(pend.uid);
        const loc = this.findInst(a.target);
        this._spend(this.player(pid), pend.cost);
        if (src) src.inst.flags.exhausted = true;
        if (loc && loc.zone === 'front') {
          src.inst.flags.patientUid = loc.inst.uid;
          src.inst.flags.home = { section: loc.section, row: loc.row };
          src.inst.flags.nestReturn = true;
          loc.player.front[loc.section][loc.row] = null;
        }
        this.state.pending = null;
        return { ok: true };
      }
      if (pend.kind === 'hospital') {
        const src = this.findInst(pend.uid);
        const loc = this.findInst(a.target);
        this._spend(this.player(pid), pend.cost);
        if (src) src.inst.flags.exhausted = true;
        if (loc && loc.zone === 'front') {
          src.inst.flags.patientUid = loc.inst.uid;
          src.inst.flags.home = { section: loc.section, row: loc.row };
          loc.player.front[loc.section][loc.row] = null;
        }
        this.state.pending = null;
        return { ok: true };
      }
      if (pend.kind === 'fog-place') {
        const src = this.findInst(pend.uid);
        this._spend(this.player(pid), pend.cost);
        if (src) src.inst.flags.exhausted = true;
        const loc = this.findInst(a.target);
        if (loc && loc.zone === 'front') {
          loc.inst.flags.fogTurns = 2;
          loc.inst.tokens = loc.inst.tokens || [];
          loc.inst.tokens.push({ type: 'nebelfeld', turns: 2 });
          const cur = loc.player.nml[loc.section][loc.row];
          if (!cur) {
            loc.player.nml[loc.section][loc.row] = { uid: 'fog-' + loc.inst.uid, cardId: 'token_fog', image: this.pickFogArt(), flags: { type: 'fog', turns: 2 }, def: 0 };
          } else {
            cur.flags = cur.flags || {};
            cur.flags.fog = true;
            cur.flags.fogTurns = 2;
          }
        }
        this.state.pending = null;
        this._log('Nebelfeld liegt.');
        return { ok: true };
      }
      if (pend.kind === 'comm-unit') return this._commCoord(pid, a);
      if (pend.kind === 'comm-order') {
        const opp = this.opponent(pid);
        const card = pend.pool.find((c) => c.uid === a.target);
        if (card && pend.selected.indexOf(card) < 0) pend.selected.push(card);
        if (pend.selected.length >= pend.pool.length) {
          pend.selected.slice().reverse().forEach((c) => opp.deck.unshift(c));
          this.state.pending = null;
        }
        return { ok: true };
      }
      if (pend.kind === 'feint') {
        const src = this.findInst(pend.uid);
        this._spend(this.player(pid), pend.cost);
        if (src) src.inst.flags.exhausted = true;
        const loc = this.findInst(a.target);
        if (loc) {
          loc.inst.flags.noCombatUntil = this.state.turn;
          loc.inst.flags.noAttack = true;
        }
        this.state.pending = null;
        this._log('Finte: Ziel außer Gefecht.');
        return { ok: true };
      }
      if (pend.kind === 'drone') {
        const src = this.findInst(pend.uid);
        const p = this.player(pid);
        this._spend(p, pend.cost);
        if (src) src.inst.flags.exhausted = true;
        const loc = this.findInst(a.target);
        this.state.pending = null;
        let aa = 0;
        const opp = this.opponent(pid);
        this.frontList(opp).forEach((l) => { if (hasTag(this.defOf(l.inst), 'luftverteidigung')) aa += 1; });
        (opp.support || []).forEach((s) => { if (s && hasTag(this.defOf(s), 'luftverteidigung')) aa += 1; });
        const dmg = Math.max(0, 6 - aa);
        if (loc && this._handHasEffect(loc.player, 'CANCEL_AIR_DAMAGE')) {
          this.state.pending = this._sealPending({ kind: 'sam', player: loc.player.id, spell: true, targetUid: a.target, dmgToT: dmg, prompt: 'Drohnenangriff' });
          return { ok: true, need: 'sam' };
        }
        if (loc) {
          this._evt('shout', { name: 'Dronenkommando', image: 'Dronenkommando.jpg' }, 'Drohnenangriff! (' + dmg + ')');
          this._applyAirDmg(loc, dmg);
        }
        return { ok: true };
      }
      if (pend.kind === 'attrition') {
        const loc = this.findInst(a.target);
        const src = this.findInst(pend.srcUid);
        if (loc) this._destroy(loc);
        const opp = this.opponent(pid);
        const left = this.frontList(opp).length + (opp.support || []).filter(Boolean).length;
        if (left <= 0 && src) this._destroy(src);
        this.state.pending = null;
        this._evt('shout', { name: 'Bis niemand mehr lebt', image: 'Bis niemand mehr lebt.jpg' }, 'Bis niemand mehr lebt!');
        return { ok: true };
      }
      if (pend.kind === 'fire-mission') {
        const src = this.findInst(pend.uid);
        if (!src) { this.state.pending = null; return { ok: true }; }
        return this._doFireMission(pid, src.inst, a.target, pend.cost, pend.dmg);
      }
      if (pend.kind === 'resist-unit') {
        this.state.pending = this._sealPending({ kind: 'resist-coin', player: pid, card: pend.card, unitUid: a.target });
        return { ok: true, need: 'coin' };
      }
      if (pend.kind === 'clear-atk') {
        const loc = this.findInst(a.target);
        if (!loc || loc.player.id !== pid) throw new Error('Keine eigene Einheit');
        if ((loc.inst.flags.buffAtk || 0) < 0) loc.inst.flags.buffAtk = 0;
        const pl = this.player(pid);
        if (pend.card) pl.grave.push(pend.card);
        this.state.pending = null;
        this._log('Waffenlieferung: Angriffs-Malus von ' + this.defOf(loc.inst).name + ' entfernt.');
        if (this.state.heldAttack) return this._resumeAfterReact();
        return { ok: true };
      }
      if (pend.kind === 'rations') {
        const loc = this.findInst(a.target);
        if (!loc || loc.player.id !== pid) throw new Error('Keine eigene Infanterie');
        loc.inst.def = (loc.inst.def || 0) + 1;
        loc.inst.defMax = (loc.inst.defMax || loc.inst.def) + 1;
        loc.inst.flags.noAttack = true;
        pend.left -= 1;
        if (pend.left <= 0) {
          const pl = this.player(pid);
          if (pend.card) pl.grave.push(pend.card);
          this.state.pending = null;
          if (this.state.heldAttack) return this._resumeAfterReact();
          return { ok: true };
        }
        return { ok: true, need: 'target' };
      }
      if (pend.kind === 'radiation') return this._doRadiation(pid, a.target, pend);
      if (pend.kind === 'formation') {
        const loc = this.findInst(a.target);
        if (!loc || loc.player.id !== pid) throw new Error('Keine eigene Einheit');
        loc.inst.flags.formUntil = this.state.turn;
        loc.inst.def = (loc.inst.def || 0) + 2;
        loc.inst.defMax = (loc.inst.defMax || loc.inst.def) + 2;
        const pl = this.player(pid);
        if (pend.card) pl.grave.push(pend.card);
        this.state.pending = null;
        if (this.state.heldAttack) return this._resumeAfterReact();
        return { ok: true };
      }
      if (pend.kind === 'court') {
        const loc = this.findInst(a.target);
        if (!loc || loc.player.id !== pid || loc.zone !== 'front') throw new Error('Keine eigene Einheit');
        const owner = loc.player;
        this._destroy(loc);
        this.frontList(owner).forEach((l) => { l.inst.flags.standUntil = this.state.turn; });
        const pl = this.player(pid);
        if (pend.card) pl.grave.push(pend.card);
        this.state.pending = null;
        this._evt('shout', { name: 'Standgericht', image: 'Standgericht.jpg' }, 'Standgericht!');
        if (this.state.heldAttack) return this._resumeAfterReact();
        return { ok: true };
      }
      if (pend.kind === 'angel-unit') {
        this.state.pending = this._sealPending({ kind: 'angel-coin', player: pid, card: pend.card, unitUid: a.target });
        return { ok: true, need: 'coin' };
      }
      if (pend.kind === 'selfsac-self') {
        const loc = this.findInst(a.target);
        if (!loc || loc.player.id !== pid || loc.zone !== 'front') throw new Error('Keine eigene Einheit');
        const tg = this.legalAttackTargets(loc);
        this._destroy(loc);
        if (!tg.length) {
          const pl = this.player(pid);
          if (pend.card) pl.grave.push(pend.card);
          this.state.pending = null;
          return { ok: true };
        }
        this.state.pending = this._sealPending({
          kind: 'selfsac-foe',
          player: pid,
          card: pend.card,
          needCount: Math.min(2, tg.length),
          selected: [],
          choices: tg.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if (pend.kind === 'selfsac-foe') {
        if (a.target && pend.selected.indexOf(a.target) < 0) pend.selected.push(a.target);
        if (pend.selected.length >= pend.needCount) {
          pend.selected.forEach((uid) => {
            const loc = this.findInst(uid);
            if (loc) this._destroy(loc);
          });
          const pl = this.player(pid);
          if (pend.card) pl.grave.push(pend.card);
          this.state.pending = null;
          this._evt('shout', { name: 'Selbstopfer', image: 'Selbstopfer.jpg' }, 'Selbstopfer!');
          return { ok: true };
        }
        return { ok: true, need: 'target' };
      }
      if (pend.kind === 'zeal') {
        const loc = this.findInst(a.target);
        if (!loc || loc.player.id !== pid) throw new Error('Keine eigene Infanterie');
        loc.inst.flags.eiferUntil = this.state.turn;
        const pl = this.player(pid);
        if (pend.card) pl.grave.push(pend.card);
        this.state.pending = null;
        this._log(this.defOf(loc.inst).name + ' +3 A bis Zugende, danach 2 Schaden.');
        return { ok: true };
      }
      if (pend.kind === 'clear-mine') {
        const opp = this.opponent(pid);
        SECTIONS.forEach((s) => {
          for (let r = 0; r < 3; r++) {
            const tok = opp.nml[s][r];
            if (tok && tok.uid === a.target) {
              opp.grave.push(tok);
              opp.nml[s][r] = null;
            }
          }
        });
        const pl = this.player(pid);
        if (pend.card) pl.grave.push(pend.card);
        this.state.pending = null;
        this._evt('shout', { name: 'Räumkommando', image: 'Raeumkommando.jpg' }, 'Räumkommando!');
        if (this.state.heldAttack) return this._resumeAfterReact();
        return { ok: true };
      }
      if (pend.kind === 'mass-pick') {
        const p = this.player(pid);
        const card = p.hand.find((c) => c.uid === a.target);
        if (!card || this.defOf(card).typ !== 'Einheit') {
          this.state.pending = null;
          return { ok: true };
        }
        card.flags.freePlayOnTurn = this.state.turn;
        this.state.pending = this._sealPending({ kind: 'deploy', player: pid, uid: card.uid, facedown: false, free: true, mass: true });
        return { ok: true, need: 'slot' };
      }
      if (pend.kind === 'pause-unit') return this._applyPause(pid, a.target, pend);
      if (pend.kind === 'napalm') return this._doNapalm(pid, a.target, pend);
      if (pend.kind === 'react-window') {
        return this._actPlay(pid, { uid: a.target });
      }
      if (pend.kind === 'mob-pick') {
        if (a.target && pend.selected.indexOf(a.target) < 0) pend.selected.push(a.target);
        if (pend.selected.length >= 2) {
          const p = this.player(pid);
          pend.pool.forEach((c) => {
            if (pend.selected.indexOf(c.uid) >= 0) p.hand.push(c);
            else p.deck.push(c);
          });
          this._shuffle(p.deck);
          const taken = pend.selected.slice();
          this.state.pending = this._sealPending({
            kind: 'mob-play',
            player: pid,
            pool: taken,
            choices: taken.map((uid) => {
              const c = this.player(pid).hand.find((x) => x.uid === uid);
              return { target: uid, label: c ? this.defOf(c).name : uid };
            })
          });
          return { ok: true, need: 'target' };
        }
        return { ok: true, need: 'target' };
      }
      if (pend.kind === 'mob-play') {
        const p = this.player(pid);
        const card = p.hand.find((c) => c.uid === a.target);
        if (!card || pend.pool.indexOf(a.target) < 0) {
          this.state.pending = null;
          return { ok: true };
        }
        this.state.pending = this._sealPending({ kind: 'deploy', player: pid, uid: card.uid, facedown: false, free: true });
        card.flags.freePlayOnTurn = this.state.turn;
        return { ok: true, need: 'slot' };
      }
      if (pend.kind === 'lay-mine') {
        const loc = this.findInst(a.target);
        if (!loc || loc.player.id !== pid || loc.zone !== 'front') throw new Error('Keine eigene Einheit');
        if (!loc.player.nml) loc.player.nml = { L: [null,null,null], C: [null,null,null], R: [null,null,null] };
        if (!loc.player.nml[loc.section]) loc.player.nml[loc.section] = [null,null,null];
        if (loc.player.nml[loc.section][loc.row]) throw new Error('Bereits vermint');
        const tokDef = this.byId('dc_tok_minenfeld');
        const tok = this._makeInst(tokDef ? tokDef.id : 'dc_tok_minenfeld', pid);
        tok.facedown = false;
        tok.image = tok.image || 'MINE.png';
        tok.flags.type = 'minenfeld';
        tok.flags.charges = 2;
        tok.charges = 2;
        loc.player.nml[loc.section][loc.row] = tok;
        const pl = this.player(pid);
        if (pend.card) pl.grave.push(pend.card);
        this.state.pending = null;
        this._evt('shout', { name: 'Minenfeld', image: 'Minenfeld.jpg' }, 'Minenfeld!');
        if (this.state.heldAttack) return this._resumeAfterReact(pid);
        return { ok: true };
      }
      if (pend.kind === 'honors') {
        if (a.target && pend.selected.indexOf(a.target) < 0) pend.selected.push(a.target);
        if (pend.selected.length >= pend.needCount) return this._finishHonors(pid);
        return { ok: true, need: 'target' };
      }
      if (pend.kind === 'martyr-self') {
        const loc = this.findInst(a.target);
        if (!loc || loc.player.id !== pid || loc.zone !== 'front') throw new Error('Keine eigene Einheit');
        this._destroy(loc);
        const foe = this.frontList(this.opponent(pid));
        if (!foe.length) {
          const pl = this.player(pid);
          if (pend.card) pl.grave.push(pend.card);
          this.state.pending = null;
          return { ok: true };
        }
        this.state.pending = this._sealPending({
          kind: 'martyr-foe',
          player: pid,
          card: pend.card,
          choices: foe.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if (pend.kind === 'martyr-foe') {
        const loc = this.findInst(a.target);
        const pl = this.player(pid);
        if (pend.card) pl.grave.push(pend.card);
        this.state.pending = null;
        if (loc && loc.zone === 'front') {
          this._damage(loc.inst, 4, { tag: 'martyr' });
          if (this._isDead(loc.inst)) this._destroy(loc);
        }
        return { ok: true };
      }
      if (pend.kind === 'air-strike') return this._doAirStrike(pid, a.target, pend);
      if (pend.kind === 'briefing') {
        if (a.target && pend.selected.indexOf(a.target) < 0) pend.selected.push(a.target);
        if (pend.selected.length >= 2) {
          pend.selected.forEach((uid) => {
            const loc = this.findInst(uid);
            if (loc) loc.inst.flags.lageUntil = this.state.turn;
          });
          const pl = this.player(pid);
          if (pend.card) pl.grave.push(pend.card);
          this.state.pending = null;
          this._log('Lagebesprechung: zwei Einheiten +1 A bis Zugende.');
          return { ok: true };
        }
        return { ok: true, need: 'target' };
      }
      if (pend.kind === 'repair-bounce') {
        const loc = this.findInst(a.target);
        if (!loc || loc.player.id !== pid || loc.zone !== 'front') throw new Error('Kein Fahrzeug');
        const d = this.defOf(loc.inst);
        loc.inst.atk = d.atk;
        loc.inst.def = d.def;
        loc.inst.defMax = d.def;
        loc.inst.flags.buffAtk = Math.max(0, loc.inst.flags.buffAtk || 0);
        loc.inst.flags.buffDef = Math.max(0, loc.inst.flags.buffDef || 0);
        loc.inst.flags.exhausted = false;
        loc.inst.flags.noAttack = false;
        loc.inst.attackUsed = false;
        loc.inst.flags.freePlayOnTurn = this.state.turn + 2;
        loc.player.front[loc.section][loc.row] = null;
        loc.player.hand.push(loc.inst);
        const pl = this.player(pid);
        if (pend.card) pl.grave.push(pend.card);
        this.state.pending = null;
        this._log(d.name + ' geht in die Werkstatt (Hand, nächster Zug 0 AP).');
        return { ok: true };
      }
      if (pend.kind === 'double-dmg') {
        const loc = this.findInst(a.target);
        if (!loc || loc.player.id !== pid) throw new Error('Keine eigene Einheit');
        loc.inst.flags.doubleDmgUntil = this.state.turn;
        const pl = this.player(pid);
        if (pend.card) pl.grave.push(pend.card);
        this.state.pending = null;
        this._log(this.defOf(loc.inst).name + ' verursacht doppelten Kampfschaden bis Zugende.');
        return { ok: true };
      }
      if (pend.kind === 'geist-tgt') {
        return this._finishGeist(pid, pend.unitUid, a.target);
      }
      if (pend.kind === 'discard-hand') {
        const pl = this.player(pid);
        if (a.target && pend.selected.indexOf(a.target) < 0) pend.selected.push(a.target);
        if (pend.selected.length >= pend.needCount) {
          pend.selected.forEach((uid) => {
            const c = pl.hand.find((x) => x.uid === uid);
            if (!c) return;
            pl.hand = pl.hand.filter((x) => x.uid !== uid);
            pl.grave.push(c);
          });
          this.state.pending = null;
          this._log(pl.name + ' wirft ' + pend.needCount + ' Karten ab.');
          if (pend.afterEnd) return this._actEnd(pid);
          return { ok: true };
        }
        return { ok: true, need: 'target' };
      }
      if (pend.kind === 'gassen-pick') {
        if (a.target && pend.selected.indexOf(a.target) < 0) pend.selected.push(a.target);
        if (pend.selected.length >= pend.needCount) return this._gassenAfterPick(pid);
        return { ok: true, need: 'target' };
      }
      if (pend.kind === 'equip') { // Zweig nur bei zutreffender Bedingung
        const p = this.player(pid); // unveränderliche Bindung in diesem Block
        const card = p.hand.find((c) => c.uid === pend.uid); // Handkarten
        const host = this.findInst(a.target); // unveränderliche Bindung in diesem Block
        if (!card || !host || host.player.id !== pid || host.zone !== 'front') throw new Error('Ungültiges Ziel'); // Regelverstoß, Zug ungültig
        p.hand = p.hand.filter((c) => c.uid !== card.uid); // Handkarten
        host.inst.attachments.push(card);
        const ed = this.defOf(card);
        (ed.effects || []).forEach((x) => {
          if (x.code === 'EQUIP_STAT') {
            host.inst.flags.buffAtk = (host.inst.flags.buffAtk || 0) + Number(x.param.atk || 0);
            host.inst.def = (host.inst.def || 0) + Number(x.param.def || 0);
            host.inst.defMax = (host.inst.defMax || host.inst.def) + Number(x.param.def || 0);
          }
        });
        this._evt('equip', ed, p.name + ' rüstet ' + this.defOf(host.inst).name + ' mit ' + ed.name + ' aus.');
        // Ereignis für die Rundenübersicht
        this.state.pending = null; // offene Wahl des Spielers
        return { ok: true }; // Ergebnis an den Aufrufer
      }
      if (pend.kind === 'instant-target') { // Zweig nur bei zutreffender Bedingung
        if (!pend.selected) pend.selected = []; // Zweig nur bei zutreffender Bedingung
        const id = a.target; // unveränderliche Bindung in diesem Block
        const ix = pend.selected.indexOf(id); // unveränderliche Bindung in diesem Block
        if (ix >= 0) pend.selected.splice(ix, 1); // Zweig nur bei zutreffender Bedingung
        else pend.selected.push(id); // sonst
        const need = pend.needCount || 1; // unveränderliche Bindung in diesem Block
        if (!pend.upto && pend.selected.length >= need) { // Zweig nur bei zutreffender Bedingung
          return this._finishInstant(pid, pend, pend.selected); // Wert zurückgeben
        }
        return { ok: true, need: 'target', selected: pend.selected.slice() }; // Ergebnis an den Aufrufer
      }
      if (pend.kind === 'shoulder-2') {
        const a1 = this.findInst(pend.uid);
        const a2 = this.findInst(a.target);
        const t = this.findInst(pend.boss);
        if (!a2 || a2.player.id !== pid) throw new Error('Zweite Einheit fehlt');
        this.state.pending = null;
        if (a1 && t) this._resolveCombat(pid, a1.inst.uid, t.inst.uid);
        const still = this.findInst(pend.boss);
        if (a2 && still) this._resolveCombat(pid, a2.inst.uid, still.inst.uid);
        if (a2) { a2.inst.flags.exhausted = true; a2.inst.attackUsed = true; }
        return { ok: true };
      }
      if (pend.kind === 'attack-target') {
        const loc = this.findInst(pend.attacker || pend.uid);
        const tgt = this.findInst(a.target);
        if (loc) {
          const ad = this.defOf(loc.inst);
          const tn = tgt ? (tgt.inst.facedown ? 'eine verdeckte Einheit' : this.defOf(tgt.inst).name) : 'ein Ziel';
          this._evt('attack', ad, ad.name + ' wird ausgewählt.');
          this._evt('attack', ad, ad.name + ' greift ' + tn + ' an.');
        }
        if (loc && tgt && (this.defOf(tgt.inst).effects || []).some((x) => x.code === 'NEED_SHOULDER') && !(this.defOf(loc.inst).effects || []).some((x) => x.code === 'ATTACK_ANY_FRONT') && !isArtillery(this.defOf(loc.inst))) {
          const mates = this._neighbors(this.player(pid), loc.section, loc.row).filter((n) => n.inst && n.inst.uid !== loc.inst.uid);
          if (!mates.length) throw new Error('Kein Schulterschluss');
          this.state.pending = this._sealPending({
            kind: 'shoulder-2',
            player: pid,
            uid: loc.inst.uid,
            boss: tgt.inst.uid,
            choices: mates.map((n) => ({ target: n.inst.uid, label: this.defOf(n.inst).name }))
          });
          return { ok: true, need: 'target' };
        }
        return this._resolveCombat(pid, pend.attacker || loc.inst.uid, a.target);
      }
      throw new Error('Unbekanntes Pending'); // Regelverstoß, Zug ungültig
    }

    // Soforteinsatz: Münze, Zielwahl oder sofort auflösen.
    _playInstant(p, card, targetUid, facedown) {
      const def = this.defOf(card);
      p.hand = p.hand.filter((c) => c.uid !== card.uid);
      const TRAP_CODES = ['CANCEL_AIR_DAMAGE', 'LAY_MINE', 'AMMO_COOK', 'HONORS', 'PAUSE_UNIT', 'SILVER_ANGEL', 'COURT_MARTIAL', 'FORMATION', 'RESIST'];
      const codes = (def.effects || []).map((x) => x.code);
      if (facedown && codes.some((c) => TRAP_CODES.indexOf(c) >= 0)) {
        const i = p.support.findIndex((s) => !s);
        card.facedown = true;
        card.flags.trap = true;
        if (i < 0) p.support.push(card);
        else p.support[i] = card;
        this._log(p.name + ' legt ' + def.name + ' verdeckt in den Support.');
        return { ok: true };
      }
      if ((def.effects || []).some((e) => e.code === 'WILL_PEOPLE')) {
        this.state.players.forEach((pl) => {
          this.frontList(pl).forEach((l) => {
            if (isInfantry(this.defOf(l.inst))) l.inst.flags.volkUntil = this.state.turn;
          });
        });
        p.flags.volkDraw = this.state.turn;
        p.grave.push(card);
        this._evt('instant', def, 'Wille des Volkes: alle Infanterie +2 A.');
        if (this.state.heldAttack) return this._resumeAfterReact();
        return { ok: true };
      }
      if ((def.effects || []).some((e) => e.code === 'RESIST')) {
        if (this.state.active !== p.id) {
          p.hand.push(card);
          return { ok: false, error: 'Widerstand nur im eigenen Zug.', code: 'OWN_TURN' };
        }
        const foe = this.frontList(this.opponent(p.id));
        if (!foe.length) {
          p.hand.push(card);
          return { ok: false, error: 'Keine gegnerische Front.', code: 'NO_TGT' };
        }
        this.state.pending = this._sealPending({
          kind: 'resist-unit',
          player: p.id,
          card: card,
          choices: foe.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'CLEAR_ATK_MALUS')) {
        const units = this.frontList(p);
        if (!units.length) {
          p.hand.push(card);
          return { ok: false, error: 'Keine eigene Front.', code: 'NO_TGT' };
        }
        this.state.pending = this._sealPending({
          kind: 'clear-atk',
          player: p.id,
          card: card,
          choices: units.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'RATIONS')) {
        const units = this.frontList(p).filter((l) => isInfantry(this.defOf(l.inst)));
        if (!units.length) {
          p.hand.push(card);
          return { ok: false, error: 'Keine Infanterie.', code: 'NO_INF' };
        }
        this.state.pending = this._sealPending({
          kind: 'rations',
          player: p.id,
          card: card,
          left: 3,
          upto: true,
          choices: units.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'RADIATION')) {
        if (this.state.active !== p.id) {
          p.hand.push(card);
          return { ok: false, error: 'Strahlung nur im eigenen Zug.', code: 'OWN_TURN' };
        }
        const foe = this.frontList(this.opponent(p.id));
        if (!foe.length) {
          p.hand.push(card);
          return { ok: false, error: 'Keine gegnerische Front.', code: 'NO_TGT' };
        }
        this.state.pending = this._sealPending({
          kind: 'radiation',
          player: p.id,
          card: card,
          choices: foe.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'FORMATION')) {
        const units = this.frontList(p);
        if (!units.length) {
          p.hand.push(card);
          return { ok: false, error: 'Keine eigene Front.', code: 'NO_TGT' };
        }
        this.state.pending = this._sealPending({
          kind: 'formation',
          player: p.id,
          card: card,
          choices: units.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'COURT_MARTIAL')) {
        const units = this.frontList(p);
        if (units.length < 2) {
          p.hand.push(card);
          return { ok: false, error: 'Mindestens zwei eigene Fronteinheiten.', code: 'NEED_TWO' };
        }
        this.state.pending = this._sealPending({
          kind: 'court',
          player: p.id,
          card: card,
          choices: units.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'SILVER_ANGEL')) {
        const units = this.frontList(p).filter((l) => isInfantry(this.defOf(l.inst)));
        if (!units.length) {
          p.hand.push(card);
          return { ok: false, error: 'Keine Infanterie.', code: 'NO_INF' };
        }
        this.state.pending = this._sealPending({
          kind: 'angel-unit',
          player: p.id,
          card: card,
          choices: units.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'SELF_SAC')) {
        const mine = this.frontList(p);
        if (!mine.length) {
          p.hand.push(card);
          return { ok: false, error: 'Keine eigene Front.', code: 'NO_TGT' };
        }
        this.state.pending = this._sealPending({
          kind: 'selfsac-self',
          player: p.id,
          card: card,
          choices: mine.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'ZEAL')) {
        const units = this.frontList(p).filter((l) => isInfantry(this.defOf(l.inst)));
        if (!units.length) {
          p.hand.push(card);
          return { ok: false, error: 'Keine eigene Infanterie.', code: 'NO_INF' };
        }
        this.state.pending = this._sealPending({
          kind: 'zeal',
          player: p.id,
          card: card,
          choices: units.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'CLEAR_MINE')) {
        const opp = this.opponent(p.id);
        const mines = [];
        SECTIONS.forEach((s) => {
          for (let r = 0; r < 3; r++) {
            if (opp.nml[s][r]) mines.push({ section: s, row: r, tok: opp.nml[s][r] });
          }
        });
        if (!mines.length) {
          p.hand.push(card);
          return { ok: false, error: 'Kein feindliches Minenfeld.', code: 'NO_MINE' };
        }
        if (mines.length === 1) {
          const m = mines[0];
          opp.grave.push(m.tok);
          opp.nml[m.section][m.row] = null;
          p.grave.push(card);
          this._evt('shout', def, 'Räumkommando!');
          if (this.state.heldAttack) return this._resumeAfterReact();
          return { ok: true };
        }
        this.state.pending = this._sealPending({
          kind: 'clear-mine',
          player: p.id,
          card: card,
          choices: mines.map((m) => ({ target: m.tok.uid, label: m.section + (m.row + 1) }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'MASS_DEPLOY')) {
        if (this.state.active !== p.id) {
          p.hand.push(card);
          return { ok: false, error: 'Psychologie der Massen nur im eigenen Zug.', code: 'OWN_TURN' };
        }
        p.grave.push(card);
        const units = p.hand.filter((c) => this.defOf(c).typ === 'Einheit');
        if (!units.length || !this._emptyFrontSlots(p).length) return { ok: true };
        this.state.pending = this._sealPending({
          kind: 'mass-pick',
          player: p.id,
          upto: true,
          choices: units.map((c) => ({ target: c.uid, label: this.defOf(c).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'PAUSE_UNIT')) {
        const units = this.frontList(p).concat(this.frontList(this.opponent(p.id)));
        if (!units.length) {
          p.hand.push(card);
          return { ok: false, error: 'Keine Einheit.', code: 'NO_TGT' };
        }
        this.state.pending = this._sealPending({
          kind: 'pause-unit',
          player: p.id,
          card: card,
          choices: units.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'NAPALM')) {
        const foe = this.frontList(this.opponent(p.id));
        if (!foe.length) {
          p.hand.push(card);
          return { ok: false, error: 'Keine gegnerische Front.', code: 'NO_TGT' };
        }
        this.state.pending = this._sealPending({
          kind: 'napalm',
          player: p.id,
          card: card,
          choices: foe.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'AMMO_COOK')) {
        p.flags.ammoCook = this.state.turn;
        p.grave.push(card);
        this._log(p.name + ' bereitet einen Munitionstreffer vor.');
        if (this.state.heldAttack) return this._resumeAfterReact(p.id);
        return { ok: true };
      }
      if ((def.effects || []).some((e) => e.code === 'MOBILIZE_INF')) {
        if (this.state.active !== p.id) {
          p.hand.push(card);
          return { ok: false, error: 'Mobilisierung nur im eigenen Zug.', code: 'OWN_TURN' };
        }
        p.grave.push(card);
        const inf = p.deck.filter((c) => isInfantry(this.defOf(c)));
        p.deck = p.deck.filter((c) => !isInfantry(this.defOf(c)));
        if (inf.length <= 2) {
          inf.forEach((c) => p.hand.push(c));
          this._shuffle(p.deck);
          if (!inf.length) return { ok: true };
          this.state.pending = this._sealPending({
            kind: 'mob-play',
            player: p.id,
            pool: inf.map((c) => c.uid),
            choices: inf.map((c) => ({ target: c.uid, label: this.defOf(c).name }))
          });
          return { ok: true, need: 'target' };
        }
        this.state.pending = this._sealPending({
          kind: 'mob-pick',
          player: p.id,
          pool: inf,
          needCount: 2,
          upto: true,
          selected: [],
          choices: inf.map((c) => ({ target: c.uid, label: this.defOf(c).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'LAY_MINE')) {
        const units = this.frontList(p).filter((l) => !p.nml[l.section][l.row]);
        if (!units.length) {
          p.hand.push(card);
          return { ok: false, error: 'Kein freier Minenplatz vor einer Einheit.', code: 'NO_MINE_SLOT' };
        }
        this.state.pending = this._sealPending({
          kind: 'lay-mine',
          player: p.id,
          card: card,
          choices: units.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'HONORS')) {
        const vets = this.frontList(p).filter((l) => (l.inst.flags.kills || 0) >= 1);
        if (!vets.length) {
          p.hand.push(card);
          return { ok: false, error: 'Keine Veteranen an der Front.', code: 'NO_VET' };
        }
        this.state.pending = this._sealPending({
          kind: 'honors',
          player: p.id,
          card: card,
          needCount: Math.min(3, vets.length),
          upto: true,
          selected: [],
          choices: vets.map((l) => ({ target: l.inst.uid, label: this.defOf(l.inst).name + ' (' + (l.inst.flags.kills || 0) + ')' }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'MARTYR')) {
        const mine = this.frontList(p);
        const foe = this.frontList(this.opponent(p.id));
        if (!mine.length || !foe.length) {
          p.hand.push(card);
          return { ok: false, error: 'Martyrium braucht eigene und feindliche Front.', code: 'NO_TGT' };
        }
        this.state.pending = this._sealPending({
          kind: 'martyr-self',
          player: p.id,
          card: card,
          choices: mine.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'AIR_STRIKE')) {
        if (this.state.active !== p.id) {
          p.hand.push(card);
          return { ok: false, error: 'Luftschlag nur im eigenen Zug.', code: 'OWN_TURN' };
        }
        const opp = this.opponent(p.id);
        const tg = [];
        this.frontList(opp).forEach((l) => tg.push(l));
        (opp.support || []).forEach((s, i) => { if (s) tg.push({ inst: s, player: opp, zone: 'support', index: i }); });
        if (!tg.length) {
          p.hand.push(card);
          return { ok: false, error: 'Kein Ziel.', code: 'NO_TGT' };
        }
        this.state.pending = this._sealPending({
          kind: 'air-strike',
          player: p.id,
          card: card,
          dmg: 5,
          choices: tg.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'BRIEFING')) {
        const units = this.frontList(p);
        if (units.length < 2) {
          p.hand.push(card);
          return { ok: false, error: 'Zwei eigene Fronteinheiten nötig.', code: 'NEED_TWO' };
        }
        this.state.pending = this._sealPending({
          kind: 'briefing',
          player: p.id,
          card: card,
          needCount: 2,
          selected: [],
          choices: units.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'REPAIR_BOUNCE')) {
        if (this.state.active !== p.id) {
          p.hand.push(card);
          return { ok: false, error: 'Instandsetzung nur im eigenen Zug.', code: 'OWN_TURN' };
        }
        const units = this.frontList(p).filter((l) => hasTag(this.defOf(l.inst), 'fahrzeug'));
        if (!units.length) {
          p.hand.push(card);
          return { ok: false, error: 'Kein Fahrzeug an der Front.', code: 'NO_VEH' };
        }
        this.state.pending = this._sealPending({
          kind: 'repair-bounce',
          player: p.id,
          card: card,
          choices: units.map((l) => ({ target: l.inst.uid, label: this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'DOUBLE_COMBAT')) {
        const units = this.frontList(p).filter((l) => hasTag(this.defOf(l.inst), 'gepanzert'));
        if (!units.length) {
          p.hand.push(card);
          return { ok: false, error: 'Keine gepanzerte Einheit.', code: 'NO_ARMOR' };
        }
        this.state.pending = this._sealPending({
          kind: 'double-dmg',
          player: p.id,
          card: card,
          choices: units.map((l) => ({ target: l.inst.uid, label: this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'DRAW_AP')) {
        if (this.state.active !== p.id) {
          p.hand.push(card);
          return { ok: false, error: 'Generalmobilmachung nur im eigenen Zug.', code: 'OWN_TURN' };
        }
        p.grave.push(card);
        this._draw(p, 3);
        p.ap += 2;
        this._evt('instant', def, p.name + ' zieht 3 und erhält 2 AP.');
        return { ok: true };
      }
      if ((def.effects || []).some((e) => e.code === 'GHOST_STRIKE')) {
        if (!this.state.pending || this.state.pending.kind !== 'geist-window') {
          p.hand.push(card);
          return { ok: false, error: 'Kein Angriff im Gange.', code: 'NO_ATK' };
        }
        p.grave.push(card);
        const units = this.frontList(p).filter((l) => !(l.inst.flags && l.inst.flags.exhausted) && !l.inst.attackUsed);
        if (!units.length) return this._passGeist();
        const w = this.state.pending;
        this.state.pending = this._sealPending({
          kind: 'geist-unit',
          player: p.id,
          attackerUid: w.attackerUid,
          targetUid: w.targetUid,
          atkPlayer: w.atkPlayer,
          choices: units.map((l) => ({ target: l.inst.uid, label: this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'GHOST_RUINS')) {
        if (this.state.active !== p.id) {
          p.hand.push(card);
          return { ok: false, error: 'Geist in den Trümmern nur im eigenen Zug.', code: 'OWN_TURN' };
        }
        const opp = this.opponent(p.id);
        if (opp.flags.lostSupportTurn !== this.state.turn - 1) {
          p.hand.push(card);
          return { ok: false, error: 'Im letzten Zug keine Unterstützung auf dem Ablagestapel.', code: 'NO_GHOST' };
        }
        p.grave.push(card);
        const n = Math.min(2, opp.hand.length);
        if (!n) return { ok: true };
        this.state.pending = this._sealPending({
          kind: 'discard-hand',
          player: opp.id,
          needCount: n,
          selected: [],
          choices: opp.hand.map((c) => ({ target: c.uid, label: this.defOf(c).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'EMPTY_STREETS')) {
        if (this.state.active !== p.id) {
          p.hand.push(card);
          return { ok: false, error: 'Einsame Gassen nur im eigenen Zug.', code: 'OWN_TURN' };
        }
        p.grave.push(card);
        return this._startGassen(p);
      }
      if ((def.effects || []).some((e) => e.code === 'CAVALRY_ATK')) {
        let n = 0;
        this.frontList(p).forEach((l) => {
          const d = this.defOf(l.inst);
          if (hasTag(d, 'fahrzeug') && hasTag(d, 'gepanzert')) {
            l.inst.flags.kavUntil = this.state.turn;
            n += 1;
          }
        });
        p.grave.push(card);
        this._evt('instant', def, n ? (p.name + ': ' + n + ' gepanzerte Fahrzeuge +2 A bis Zugende.') : (p.name + ': kein gepanzertes Fahrzeug.'));
        return { ok: true };
      }
      if ((def.effects || []).some((e) => e.code === 'COVER_SEEK')) {
        const units = this.frontList(p).concat(this.frontList(this.opponent(p.id)));
        if (!units.length) {
          p.hand.push(card);
          return { ok: false, error: 'Keine Fronteinheit.', code: 'NO_FRONT' };
        }
        this.state.pending = this._sealPending({
          kind: 'cover-seek',
          player: p.id,
          card: card,
          choices: units.map((l) => ({ target: l.inst.uid, label: (l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name) }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'LAST_STAND')) {
        if (this.state.active !== p.id) {
          p.hand.push(card);
          return { ok: false, error: 'Der Letzte der steht nur im eigenen Zug.', code: 'OWN_TURN' };
        }
        const units = this.frontList(p);
        if (units.length < 2) {
          p.hand.push(card);
          return { ok: false, error: 'Mindestens zwei Fronteinheiten nötig.', code: 'NEED_TWO' };
        }
        this.state.pending = this._sealPending({
          kind: 'last-stand',
          player: p.id,
          card: card,
          choices: units.map((l) => ({ target: l.inst.uid, label: this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if ((def.effects || []).some((e) => e.code === 'CLEAR_ENEMY_SUPPORT')) {
        const opp = this.opponent(p.id);
        let n = 0;
        (opp.support || []).forEach((s, i) => {
          if (!s) return;
          opp.grave.push(s);
          opp.support[i] = null;
          n += 1;
        });
        if (n) opp.flags.lostSupportTurn = this.state.turn;
        p.grave.push(card);
        this._evt('instant', def, p.name + ' reißt die Unterstützung von ' + opp.name + ' ein (' + n + ').');
        return { ok: true };
      }
      if ((def.effects || []).some((e) => e.code === 'CANCEL_AIR_DAMAGE')) {
        if (this.state.pending && this.state.pending.kind === 'sam') {
          p.hand.push(card); // still in playInstant already removed - put back then resolve
          return this._resolveSam(p.id, true);
        }
        p.hand.push(card);
        return { ok: false, error: 'Kein Luftangriff im Gange.', code: 'NO_AIR' };
      }
      if ((def.effects || []).some((e) => e.code === 'COMMAND_ATTACK')) {
        if (this.state.active !== p.id) {
          p.hand.push(card);
          return { ok: false, error: 'Blinder Gehorsam nur im eigenen Zug.', code: 'OWN_TURN' };
        }
        p.grave.push(card);
        return this._startCommandAttack(p, 2);
      }
      if ((def.effects || []).some((e) => e.code === 'ARMAGEDDON')) {
        this._armageddonSweep(p, card);
        this.state.pending = this._sealPending({ kind: 'coin', player: p.id, card: null, reason: 'armageddon', prompt: 'Wer beginnt erneut?' });
        return { ok: true, need: 'coin' };
      }
      if ((def.effects || []).some((e) => e.code === 'COIN_PREVENT') || /Münze|muenzwurf|Kopf/i.test(def.text || '')) {
      // Zweig nur bei zutreffender Bedingung
        this.state.pending = this._sealPending({ kind: 'coin', player: p.id, card, prompt: def.name }); // offene Wahl des Spielers
        return { ok: true, need: 'coin' }; // Ergebnis an den Aufrufer
      }
      const needs = this._instantNeedsTarget(def); // unveränderliche Bindung in diesem Block
      if (needs && !targetUid) { // Zweig nur bei zutreffender Bedingung
        const choices = this._instantTargets(p, def); // unveränderliche Bindung in diesem Block
        if (!choices.length) { // Zweig nur bei zutreffender Bedingung
          p.grave.push(card); // Friedhof
          this._log(def.name + ' verpufft — kein Ziel.'); // Zeile ins Protokoll
          return { ok: true }; // Ergebnis an den Aufrufer
        }
        const need = this._targetNeed(def); // unveränderliche Bindung in diesem Block
        this.state.pending = this._sealPending({ // offene Wahl des Spielers
          kind: 'instant-target', // nächster Schritt im Ablauf
          player: p.id, // nächster Schritt im Ablauf
          uid: card.uid, // nächster Schritt im Ablauf
          card, // nächster Schritt im Ablauf
          needCount: need.count, // nächster Schritt im Ablauf
          upto: need.upto, // nächster Schritt im Ablauf
          selected: [], // nächster Schritt im Ablauf
          choices: choices.map((t) => ({ target: t.uid, label: t.label })), // Liste umformen
        });
        return { ok: true, need: 'target' }; // Ergebnis an den Aufrufer
      }
      this._resolveEffects(p, card, targetUid); // Karteneffekte der Reihe nach
      p.grave.push(card); // Friedhof
      return { ok: true }; // Ergebnis an den Aufrufer
    }

    // Wie viele Ziele der Kartentext verlangt.
    _targetNeed(def) { // nächster Schritt im Ablauf
      const t = def.text || ''; // unveränderliche Bindung in diesem Block
      const m = t.match(/[Bb]is\s*(\d+)/) || t.match(/(\d+)\s*(?:benachbarte|gegnerische|feindliche|Einheiten)/);
      // unveränderliche Bindung in diesem Block
      let count = 1; // veränderliche Bindung
      if (m) count = Number(m[1]); // Zweig nur bei zutreffender Bedingung
      (def.effects || []).forEach((e) => { // jedes Element
        if (e.param && e.param.count) count = Number(e.param.count); // Zweig nur bei zutreffender Bedingung
        if (e.param && e.param.then_destroy) count = Math.max(count, 1 + Number(e.param.then_destroy)); // Karte vom Feld auf den Friedhof
      }); // nächster Schritt im Ablauf
      const upto = /bis\s*\d+/i.test(t); // unveränderliche Bindung in diesem Block
      return { count: count || 1, upto: upto }; // Wert zurückgeben
    }

    // Effekt je gewähltes Ziel, Karte auf den Friedhof.
    _finishInstant(pid, pend, targetUid) { // nächster Schritt im Ablauf
      const p = this.player(pid); // unveränderliche Bindung in diesem Block
      const targets = Array.isArray(targetUid) ? targetUid : (targetUid ? [targetUid] : (pend.selected || []));
      // unveränderliche Bindung in diesem Block
      if (!targets.length) this._resolveEffects(p, pend.card, null); // Karteneffekte der Reihe nach
      else targets.forEach((tid) => this._resolveEffects(p, pend.card, tid)); // Karteneffekte der Reihe nach
      p.grave.push(pend.card); // Friedhof
      this.state.pending = null; // offene Wahl des Spielers
      return { ok: true }; // Ergebnis an den Aufrufer
    }

    // „Bis zu N“ abschließen.
    _actConfirmTargets(pid, a) { // nächster Schritt im Ablauf
      const pend = this.state.pending; // offene Wahl des Spielers
      if (pend && pend.kind === 'rations' && pend.player === pid) {
        const pl = this.player(pid);
        if (pend.card) pl.grave.push(pend.card);
        this.state.pending = null;
        if (this.state.heldAttack) return this._resumeAfterReact();
        return { ok: true };
      }
      if (pend && pend.kind === 'honors' && pend.player === pid) return this._finishHonors(pid);
      if (!pend || pend.player !== pid || pend.kind !== 'instant-target') throw new Error('Keine Mehrfachwahl'); // Regelverstoß, Zug ungültig
      return this._finishInstant(pid, pend, pend.selected || []); // Wert zurückgeben
    }

    // Münze werfen. Kopf setzt Infanterie-Schutz für diesen Zug.
    _actCoin(pid, a) {
      const pend = this.state.pending;
      if (!pend || pend.player !== pid || (pend.kind !== 'coin' && pend.kind !== 'angel-coin' && pend.kind !== 'resist-coin')) throw new Error('Kein Münzwurf');
      const face = this.rand() < 0.5 ? 'kopf' : 'zahl'; // unveränderliche Bindung in diesem Block
      const p = this.player(pid); // unveränderliche Bindung in diesem Block
      this._log(p.name + ' wirft eine Münze: ' + (face === 'kopf' ? 'Kopf' : 'Zahl') + '.'); // Zeile ins Protokoll
      this.state.pending = null;
      if (pend.kind === 'resist-coin') {
        const loc = this.findInst(pend.unitUid);
        if (pend.card) p.grave.push(pend.card);
        const dir = face === 'kopf' ? 1 : -1;
        this._evt('coin', { name: 'Widerstand', image: 'Widerstand.jpg' }, face === 'kopf' ? 'Kopf — rechte Flanke.' : 'Zahl — linke Flanke.');
        if (!loc) return { ok: true, face };
        const idx = this._lineIndex(loc.section, loc.row);
        const nb = this._slotAt(loc.player, idx + dir);
        loc.inst.facedown = false;
        if (!nb || !nb.inst) {
          this._log('Kein Flankenschutz auf dieser Seite.');
          return { ok: true, face };
        }
        nb.inst.facedown = false;
        this.state._skipMines = true;
        this._resolveCombat(loc.player.id, loc.inst.uid, nb.inst.uid);
        this.state._skipMines = false;
        return { ok: true, face };
      }
      if (pend.kind === 'angel-coin') {
        const loc = this.findInst(pend.unitUid);
        if (pend.card) p.grave.push(pend.card);
        this._evt('coin', { name: 'Silberner Engel', image: 'Silberner Engel.jpg' }, face === 'kopf' ? 'Kopf — Silberner Engel.' : 'Zahl — kein Schutz.');
        if (face === 'kopf' && loc) loc.inst.flags.angelUntil = this.state.turn;
        if (this.state.heldAttack) return this._resumeAfterReact();
        return { ok: true, face };
      }
      if (pend.reason === 'armageddon') {
        const winner = face === 'kopf' ? pid : (pid === 0 ? 1 : 0);
        this.state.active = winner;
        this.player(winner).ap = this.rules.ap_per_turn;
        const name = this.player(winner).name;
        this._log('Münze: ' + (face === 'kopf' ? 'Kopf' : 'Zahl') + ' — ' + name + ' beginnt erneut.');
        return { ok: true, face, coinWinner: name, code: 'COIN_WINNER' };
      }
      if (face === 'kopf' && pend.card) {
        p.flags = p.flags || {};
        p.flags.coinPreventInfantry = this.state.turn;
        this._log('Kopf — Infanterie-Schaden in diesem Zug kann negiert werden.');
      } else {
        this._log('Zahl — kein Schutz.');
      }
      if (pend.card) p.grave.push(pend.card);
      const wname = face === 'kopf' ? p.name : this.opponent(pid).name;
      return { ok: true, face, coinWinner: wname, code: 'COIN_WINNER' };
    }

    // Ob der Einsatz ein Ziel braucht.
    _instantNeedsTarget(def) { // nächster Schritt im Ablauf
      const codes = (def.effects || []).map((e) => e.code); // Liste umformen
      return codes.some((c) => // Wert zurückgeben
        ['DEAL_DAMAGE', 'HEAL', 'DESTROY', 'SACRIFICE', 'BUFF', 'RETURN_TO_HAND', 'MOVE_FRONT', 'OUT_OF_COMBAT', 'PLACE_TOKEN', 'REMOVE_TOKEN', 'REVEAL'].includes(c)
        // nächster Schritt im Ablauf
      ) || /eine |gewählte|ziel|einheit/i.test(def.text || ''); // nächster Schritt im Ablauf
    }

    // Kandidatenliste aus dem Kartentext.
    _instantTargets(p, def) { // nächster Schritt im Ablauf
      const out = []; // unveränderliche Bindung in diesem Block
      const allUnits = () => { // unveränderliche Bindung in diesem Block
        this.state.players.forEach((pl) => { // jedes Element
          this.frontList(pl).forEach((l) => { // jedes Element
            out.push({ uid: l.inst.uid, label: (pl.id === p.id ? 'Eigene ' : 'Feind ') + (l.inst.facedown ? '???' : this.defOf(l.inst).name) });
            // verdeckte Lage
          }); // nächster Schritt im Ablauf
        }); // nächster Schritt im Ablauf
      };
      const text = (def.text || '') + ' ' + (def.effects || []).map((e) => e.code).join(' '); // Liste umformen
      if (/eigene/i.test(def.text) && !/gegner/i.test(def.text)) { // Zweig nur bei zutreffender Bedingung
        this.frontList(p).forEach((l) => out.push({ uid: l.inst.uid, label: this.defOf(l.inst).name })); // jedes Element
      } else if (/gegner|feind/i.test(def.text)) { // Zweig nur bei zutreffender Bedingung
        this.frontList(this.opponent(p.id)).forEach((l) => // jedes Element
          out.push({ uid: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }) // verdeckte Lage
        );
      } else { // sonst
        allUnits(); // nächster Schritt im Ablauf
      }
      if (/minenfeld/i.test(text)) { // Zweig nur bei zutreffender Bedingung
        this.state.players.forEach((pl) => { // jedes Element
          this.frontList(pl).forEach((l) => { // jedes Element
            if (l.inst.tokens.some((t) => t.type === 'minenfeld')) { // Zweig nur bei zutreffender Bedingung
              out.push({ uid: l.inst.uid, label: 'Mine an ' + this.defOf(l.inst).name }); // Feld der Engine-Instanz
            }
          }); // nächster Schritt im Ablauf
        }); // nächster Schritt im Ablauf
      }
      // unique
      const seen = {}; // unveränderliche Bindung in diesem Block
      return out.filter((x) => (seen[x.uid] ? false : (seen[x.uid] = true))); // Wert zurückgeben
    }

    // Alle Effect-Codes der Karte anwenden.
    _resolveEffects(p, inst, targetUid) { // Karteneffekte der Reihe nach
      const def = this.defOf(inst); // unveränderliche Bindung in diesem Block
      this._evt('instant', def, p.name + ' spielt ' + def.name + '.'); // Ereignis für die Rundenübersicht
      const effects = def.effects && def.effects.length ? def.effects : this._inferEffects(def); // Effekt aus dem Fließtext raten
      effects.forEach((e) => this._applyEffect(p, inst, e, targetUid)); // einen Effect-Code ausführen
    }

    // Falls keine Codes: grob aus dem Fließtext lesen.
    _inferEffects(def) { // Effekt aus dem Fließtext raten
      const t = def.text || ''; // unveränderliche Bindung in diesem Block
      const out = []; // unveränderliche Bindung in diesem Block
      const dmg = t.match(/(\d+)\s*Schaden/i); // unveränderliche Bindung in diesem Block
      if (dmg) out.push({ code: 'DEAL_DAMAGE', param: { value: +dmg[1] } }); // Zweig nur bei zutreffender Bedingung
      const draw = t.match(/(\d+)\s*Karten?/i); // unveränderliche Bindung in diesem Block
      if (/zieh/i.test(t) && draw) out.push({ code: 'DRAW', param: { value: +draw[1] } }); // Zweig nur bei zutreffender Bedingung
      if (/AP/.test(t) && /erhält|erhalt|gewinnt/i.test(t)) { // Zweig nur bei zutreffender Bedingung
        const ap = t.match(/(\d+)\s*AP/i); // unveränderliche Bindung in diesem Block
        if (ap) out.push({ code: 'GAIN_AP', param: { value: +ap[1] } }); // Zweig nur bei zutreffender Bedingung
      }
      return out; // Wert zurückgeben
    }

    // Ein einzelner Effect-Code.
    _applyEffect(p, src, e, targetUid) { // einen Effect-Code ausführen
      const code = e.code; // unveränderliche Bindung in diesem Block
      const par = e.param || {}; // unveränderliche Bindung in diesem Block
      const opp = this.opponent(p.id); // unveränderliche Bindung in diesem Block
      if (code === 'DRAW') this._draw(p, Number(par.value || 1)); // Karten vom Deck auf die Hand
      else if (code === 'GAIN_AP') p.ap += Number(par.value || 1); // Zweig nur bei zutreffender Bedingung
      else if (code === 'DEAL_DAMAGE') { // Zweig nur bei zutreffender Bedingung
        const loc = this.findInst(targetUid); // unveränderliche Bindung in diesem Block
        if (loc) this._damage(loc.inst, Number(par.value || 1), { tag: par.tag }); // Verteidigung verringern
      } else if (code === 'HEAL') { // Zweig nur bei zutreffender Bedingung
        const loc = this.findInst(targetUid); // unveränderliche Bindung in diesem Block
        if (loc) { // Zweig nur bei zutreffender Bedingung
          const v = Number(par.value || par.host || 1); // unveränderliche Bindung in diesem Block
          loc.inst.def = Math.min(loc.inst.defMax || loc.inst.def, (loc.inst.def || 0) + v); // nächster Schritt im Ablauf
        }
      } else if (code === 'DESTROY') { // Zweig nur bei zutreffender Bedingung
        const loc = this.findInst(targetUid); // unveränderliche Bindung in diesem Block
        if (loc) this._destroy(loc); // Karte vom Feld auf den Friedhof
      } else if (code === 'SACRIFICE') { // Zweig nur bei zutreffender Bedingung
        const loc = this.findInst(targetUid); // unveränderliche Bindung in diesem Block
        if (loc && loc.player.id === p.id) { // Zweig nur bei zutreffender Bedingung
          this._destroy(loc); // Karte vom Feld auf den Friedhof
          const n = Number(par.then_destroy || 2); // Karte vom Feld auf den Friedhof
          // destroy up to n enemy front units cheapest
          const enemies = this.frontList(opp).slice(0, n); // unveränderliche Bindung in diesem Block
          enemies.forEach((en) => this._destroy({ inst: en.inst, player: opp, zone: 'front', section: en.section, row: en.row }));
          // Karte vom Feld auf den Friedhof
        }
      } else if (code === 'BUFF') { // Zweig nur bei zutreffender Bedingung
        const loc = this.findInst(targetUid); // unveränderliche Bindung in diesem Block
        if (loc) { // Zweig nur bei zutreffender Bedingung
          loc.inst.flags.buffAtk = (loc.inst.flags.buffAtk || 0) + Number(par.atk || 0); // nächster Schritt im Ablauf
          loc.inst.flags.buffDef = (loc.inst.flags.buffDef || 0) + Number(par.def || 0); // nächster Schritt im Ablauf
        }
      } else if (code === 'REVEAL') { // Zweig nur bei zutreffender Bedingung
        const n = Number(par.count || 1); // unveränderliche Bindung in diesem Block
        let revealed = 0; // veränderliche Bindung
        this.frontList(opp).forEach((l) => { // jedes Element
          if (l.inst.facedown && revealed < n) { // verdeckte Lage
            l.inst.facedown = false; // verdeckte Lage
            revealed += 1; // nächster Schritt im Ablauf
            this._log('Aufgedeckt: ' + this.defOf(l.inst).name); // Zeile ins Protokoll
          }
        }); // nächster Schritt im Ablauf
      } else if (code === 'SEARCH_DECK' || code === 'PLAY_FREE') { // Zweig nur bei zutreffender Bedingung
        const want = code === 'PLAY_FREE' ? 99 : Number(par.count || 1); // unveränderliche Bindung in diesem Block
        const fromHand = code === 'PLAY_FREE'; // unveränderliche Bindung in diesem Block
        const pool = fromHand ? p.hand.slice() : p.deck.slice(); // Handkarten
        const units = pool.filter((c) => this.defOf(c).typ === 'Einheit'); // Liste einschränken
        let placed = 0; // veränderliche Bindung
        units.forEach((c) => { // jedes Element
          if (placed >= want) return; // Zweig nur bei zutreffender Bedingung
          const slot = this.emptySlots(p)[0]; // unveränderliche Bindung in diesem Block
          if (!slot) return; // Zweig nur bei zutreffender Bedingung
          if (fromHand) p.hand = p.hand.filter((x) => x.uid !== c.uid); // Handkarten
          else p.deck = p.deck.filter((x) => x.uid !== c.uid); // sonst
          p.front[slot.section][slot.row] = c; // nächster Schritt im Ablauf
          placed += 1; // nächster Schritt im Ablauf
          this._log(this.defOf(c).name + ' kommt kostenlos auf ' + slot.section + (slot.row + 1) + '.'); // Zeile ins Protokoll
        }); // nächster Schritt im Ablauf
      } else if (code === 'PLACE_TOKEN') { // Zweig nur bei zutreffender Bedingung
        const loc = this.findInst(targetUid); // unveränderliche Bindung in diesem Block
        const typ = String(par.token || defToken(par) || 'minenfeld').toLowerCase(); // unveränderliche Bindung in diesem Block
        if (loc && loc.zone === 'front') { // Zweig nur bei zutreffender Bedingung
          loc.inst.tokens.push({ type: typ, charges: typ === 'minenfeld' ? 2 : 2 }); // nächster Schritt im Ablauf
          this._log('Token ' + typ + ' auf ' + this.defOf(loc.inst).name); // Zeile ins Protokoll
        }
      } else if (code === 'REMOVE_TOKEN') { // Zweig nur bei zutreffender Bedingung
        const loc = this.findInst(targetUid); // unveränderliche Bindung in diesem Block
        if (loc) loc.inst.tokens = loc.inst.tokens.filter((t) => t.type !== 'minenfeld'); // Zweig nur bei zutreffender Bedingung
      } else if (code === 'OUT_OF_COMBAT') { // Zweig nur bei zutreffender Bedingung
        const loc = this.findInst(targetUid); // unveränderliche Bindung in diesem Block
        if (loc) loc.inst.flags.noAttack = true; // Zweig nur bei zutreffender Bedingung
      } else if (code === 'RETURN_TO_HAND') { // Zweig nur bei zutreffender Bedingung
        const loc = this.findInst(targetUid); // unveränderliche Bindung in diesem Block
        if (loc && loc.zone === 'front') { // Zweig nur bei zutreffender Bedingung
          loc.player.front[loc.section][loc.row] = null; // nächster Schritt im Ablauf
          loc.player.hand.push(loc.inst); // Handkarten
        }
      } else if (code === 'LOOK_HAND') { // Zweig nur bei zutreffender Bedingung
        this._log('Hand des Gegners: ' + opp.hand.map((c) => this.defOf(c).name).join(', ') || '(leer)'); // Zeile ins Protokoll
      } else if (code === 'LOOK_TOP') { // Zweig nur bei zutreffender Bedingung
        const n = Number(par.count || 2); // unveränderliche Bindung in diesem Block
        this._log('Deckspitze: ' + p.deck.slice(0, n).map((c) => this.defOf(c).name).join(', ')); // Zeile ins Protokoll
      }
    }

    _applyMech(p) {
      this.frontList(p).forEach((l) => {
        if (!isInfantry(this.defOf(l.inst))) return;
        const n = this._neighbors(p, l.section, l.row).filter((x) => x.inst && (this.defOf(x.inst).effects || []).some((e) => e.code === 'MECH_AURA')).length;
        const want = n;
        const prev = l.inst.flags.mechAura || 0;
        const d = want - prev;
        if (d) {
          l.inst.def = (l.inst.def || 0) + d;
          l.inst.defMax = (l.inst.defMax || l.inst.def) + d;
          l.inst.flags.buffAtk = (l.inst.flags.buffAtk || 0) + d;
          l.inst.flags.mechAura = want;
        }
      });
    }

    _applyFuehrung(p) {
      this.frontList(p).forEach((l) => {
        if (!(this.defOf(l.inst).effects || []).some((x) => x.code === 'FUEHRUNG_V')) return;
        const sides = this._neighbors(p, l.section, l.row);
        const ok = sides.some((n) => n.inst && hasTag(this.defOf(n.inst), 'gepanzert'));
        const want = ok ? 2 : 0;
        const prev = l.inst.flags.fuehrungV || 0;
        const d = want - prev;
        if (d) {
          l.inst.def = (l.inst.def || 0) + d;
          l.inst.defMax = (l.inst.defMax || l.inst.def) + d;
          l.inst.flags.fuehrungV = want;
        }
      });
    }

    _applyFlankDef(p) {
      this.frontList(p).forEach((l) => {
        const want = this._neighbors(p, l.section, l.row).filter((n) => n.inst && (this.defOf(n.inst).effects || []).some((x) => x.code === 'FLANK_DEF')).length * 2;
        const prev = l.inst.flags.flankDef || 0;
        const d = want - prev;
        if (d) {
          l.inst.def = (l.inst.def || 0) + d;
          l.inst.defMax = (l.inst.defMax || l.inst.def) + d;
          l.inst.flags.flankDef = want;
        }
      });
    }

    _satCount(p) {
      return (p.support || []).filter((s) => s && (this.defOf(s).effects || []).some((x) => x.code === 'AURA_FRONT_DEF' || x.code === 'AURA_FRONT_DEF_GEN')).length;
    }

    _applySatAura(p) {
      const n = this._satCount(p);
      this.frontList(p).forEach((l) => {
        const prev = l.inst.flags.satAura || 0;
        const dlt = (n * 2) - prev;
        if (dlt) {
          l.inst.def = (l.inst.def || 0) + dlt;
          l.inst.defMax = (l.inst.defMax || l.inst.def) + dlt;
          l.inst.flags.satAura = n * 2;
        }
      });
    }

    _onEnter(inst, zone) {
      const def = this.defOf(inst); // unveränderliche Bindung in diesem Block
      const locOwn = this.findInst(inst.uid); // unveränderliche Bindung in diesem Block
      if (locOwn && locOwn.player && locOwn.player.flags && locOwn.player.flags.coinPreventInfantry === this.state.turn) {
      // Zweig nur bei zutreffender Bedingung
        const kl = ((def.klasse || '') + ' ' + (def.tags || []).join(' ') + ' ' + (def.text || '')).toLowerCase();
        // unveränderliche Bindung in diesem Block
        if (kl.includes('infanter')) { // Zweig nur bei zutreffender Bedingung
          this._log(def.name + ': Schaden durch Münzwurf (Kopf) verhindert.'); // Zeile ins Protokoll
          return; // nächster Schritt im Ablauf
        }
      }
      (def.effects || []).forEach((e) => { // jedes Element
        if (e.code === 'REVEAL' || e.code === 'LOOK_HAND' || e.code === 'DRAW') { // Zweig nur bei zutreffender Bedingung
          this._applyEffect(this.player(inst.owner), inst, e, null); // einen Effect-Code ausführen
        }
      }); // nächster Schritt im Ablauf
    }

    // Verdeckte eigene Einheit aufdecken.

    _emptyFrontSlots(p) {
      const out = [];
      SECTIONS.forEach((s) => {
        for (let r = 0; r < 3; r++) if (!p.front[s][r]) out.push({ section: s, row: r });
      });
      return out;
    }

    _handHasEffect(pl, code) {
      return (pl.hand || []).some((c) => (this.defOf(c).effects || []).some((x) => x.code === code));
    }

    _attackReactChoices(defender, attacker, target) {
      const out = [];
      const aDef = this.defOf(attacker);
      (defender.support || []).forEach((c) => {
        if (!c || !c.facedown) return;
        const d = this.defOf(c);
        const codes = (d.effects || []).map((x) => x.code);
        if (codes.indexOf('AMMO_COOK') >= 0 && hasTag(aDef, 'gepanzert')) out.push({ target: c.uid, label: d.name + ' (verdeckt)' });
        else if (codes.indexOf('CANCEL_AIR_DAMAGE') >= 0 && isAir(aDef)) out.push({ target: c.uid, label: d.name + ' (verdeckt)' });
        else if (codes.indexOf('LAY_MINE') >= 0) out.push({ target: c.uid, label: d.name + ' (verdeckt)' });
        else if (codes.indexOf('HONORS') >= 0) out.push({ target: c.uid, label: d.name + ' (verdeckt)' });
        else if (codes.indexOf('PAUSE_UNIT') >= 0) out.push({ target: c.uid, label: d.name + ' (verdeckt)' });
        else if (codes.indexOf('SILVER_ANGEL') >= 0 && target && isInfantry(this.defOf(target))) out.push({ target: c.uid, label: d.name + ' (verdeckt)' });
        else if (codes.indexOf('COURT_MARTIAL') >= 0) out.push({ target: c.uid, label: d.name + ' (verdeckt)' });
        else if (codes.indexOf('FORMATION') >= 0) out.push({ target: c.uid, label: d.name + ' (verdeckt)' });
      });
      defender.hand.forEach((c) => {
        const d = this.defOf(c);
        const codes = (d.effects || []).map((x) => x.code);
        if (codes.indexOf('AMMO_COOK') >= 0 && hasTag(aDef, 'gepanzert')) out.push({ target: c.uid, label: d.name });
        else if (codes.indexOf('GHOST_STRIKE') >= 0) out.push({ target: c.uid, label: d.name });
        else if (codes.indexOf('CANCEL_AIR_DAMAGE') >= 0 && isAir(aDef)) out.push({ target: c.uid, label: d.name });
        else if (codes.indexOf('LAY_MINE') >= 0) out.push({ target: c.uid, label: d.name });
        else if (codes.indexOf('COVER_SEEK') >= 0) out.push({ target: c.uid, label: d.name });
        else if (codes.indexOf('NAPALM') >= 0) out.push({ target: c.uid, label: d.name });
        else if (codes.indexOf('PAUSE_UNIT') >= 0) out.push({ target: c.uid, label: d.name });
        else if (codes.indexOf('HONORS') >= 0) out.push({ target: c.uid, label: d.name });
        else if (codes.indexOf('CLEAR_MINE') >= 0) out.push({ target: c.uid, label: d.name });
        else if (codes.indexOf('SELF_SAC') >= 0) out.push({ target: c.uid, label: d.name });
        else if (codes.indexOf('SILVER_ANGEL') >= 0 && target && isInfantry(this.defOf(target))) out.push({ target: c.uid, label: d.name });
        else if (codes.indexOf('COURT_MARTIAL') >= 0) out.push({ target: c.uid, label: d.name });
        else if (codes.indexOf('FORMATION') >= 0) out.push({ target: c.uid, label: d.name });
        else if (codes.indexOf('RATIONS') >= 0) out.push({ target: c.uid, label: d.name });
        else if (codes.indexOf('CLEAR_ATK_MALUS') >= 0) out.push({ target: c.uid, label: d.name });
        else if (codes.indexOf('WILL_PEOPLE') >= 0) out.push({ target: c.uid, label: d.name });
      });
      return out;
    }

    _resumeAfterReact() {
      const w = this.state.heldAttack;
      this.state.pending = null;
      if (!w || !w.attackerUid) return { ok: true };
      this.state._reactLock = true;
      const a = this.findInst(w.attackerUid);
      if (!a || this._isDead(a.inst)) {
        this.state.heldAttack = null;
        this.state._reactLock = false;
        this._log('Angriff fällt aus.');
        return { ok: true };
      }
      const res = this._resolveCombat(w.atkPlayer, w.attackerUid, w.targetUid);
      this.state.heldAttack = null;
      this.state._reactLock = false;
      return res;
    }

    _passGeist() { return this._resumeAfterReact(); }

    _resumeGeistAttack(w) {
      this.state.pending = null;
      this.state.heldAttack = { atkPlayer: w.atkPlayer, attackerUid: w.attackerUid, targetUid: w.targetUid };
      return this._resumeAfterReact();
    }

    _finishGeist(pid, unitUid, tgtUid) {
      const w = this.state.pending;
      this.state._geistLock = true;
      this._resolveCombat(pid, unitUid, tgtUid);
      this.state._geistLock = false;
      this.state.heldAttack = { atkPlayer: w.atkPlayer, attackerUid: w.attackerUid, targetUid: w.targetUid };
      return this._resumeAfterReact();
    }

    _applyPause(pid, uid, pend) {
      const loc = this.findInst(uid);
      const p = this.player(pid);
      if (pend && pend.card) p.grave.push(pend.card);
      this.state.pending = null;
      if (!loc) return { ok: true };
      loc.inst.flags.paused = true;
      loc.inst.flags.exhausted = true;
      loc.inst.attackUsed = true;
      if (this.state.heldAttack && this.state.heldAttack.attackerUid === uid) {
        this.state.heldAttack = null;
        this._log('Angriff abgebrochen (Pause).');
      }
      this._evt('shout', { name: 'Pause', image: 'Pause.jpg' }, 'Pause!');
      if (this.state.heldAttack) return this._resumeAfterReact();
      return { ok: true };
    }

    _applyAirDmg(loc, dmg) {
      if (!loc) return;
      if (loc.inst.def == null) { this._destroy(loc); return; }
      this._damage(loc.inst, dmg, { tag: 'air' });
      if (this._isDead(loc.inst)) this._destroy(loc);
    }

    _applyNapalm(loc, dmg) {
      if (!loc) return;
      this._evt('shout', { name: 'Napalm', image: 'Napalm.jpg' }, 'Napalm!');
      this._damage(loc.inst, dmg, { tag: 'air' });
      if (this._isDead(loc.inst)) this._destroy(loc);
      else loc.inst.flags.napalm = true;
    }

    _doNapalm(pid, uid, pend) {
      const loc = this.findInst(uid);
      const p = this.player(pid);
      if (pend && pend.card) p.grave.push(pend.card);
      this.state.pending = null;
      if (!loc || loc.zone !== 'front') return { ok: true };
      if (this._handHasEffect(loc.player, 'CANCEL_AIR_DAMAGE')) {
        this.state.pending = this._sealPending({ kind: 'sam', player: loc.player.id, spell: true, napalm: true, targetUid: uid, dmgToT: 3, prompt: 'Napalm' });
        return { ok: true, need: 'sam' };
      }
      this._applyNapalm(loc, 3);
      return { ok: true };
    }

    _doAirStrike(pid, uid, pend) {
      const loc = this.findInst(uid);
      const p = this.player(pid);
      if (pend && pend.card) p.grave.push(pend.card);
      if (!loc) { this.state.pending = null; return { ok: true }; }
      if (this._handHasEffect(loc.player, 'CANCEL_AIR_DAMAGE')) {
        this.state.pending = this._sealPending({ kind: 'sam', player: loc.player.id, spell: true, targetUid: uid, dmgToT: 5, prompt: 'Luftschlag' });
        return { ok: true, need: 'sam' };
      }
      this.state.pending = null;
      this._applyAirDmg(loc, 5);
      return { ok: true };
    }

    _applyCombatHits(aLoc, tLoc, dmgToT, dmgToA, fog) {
      const A = aLoc.inst, T = tLoc.inst;
      this._evt('attack', this.defOf(A), this.defOf(A).name + ' — Kampfhandlung.');
      if (fog) {
        this._evt('shout', this.defOf(T), this.defOf(T).name + ' setzt Erstschlag ein (Nebel).');
        this._damage(A, dmgToA, { tag: 'first-strike' });
        if (!this._isDead(A)) this._damage(T, dmgToT, { tag: 'attack' });
      } else {
        this._damage(T, dmgToT, { tag: 'attack' });
        if (tLoc.zone === 'front' && !this._isDead(T)) this._damage(A, dmgToA, { tag: 'counter' });
      }
    }

    _resolveSam(pid, block) {
      const pend = this.state.pending;
      if (!pend || pend.kind !== 'sam') throw new Error('Kein Luftangriff offen');
      this.state.pending = null;
      if (block) {
        const p = this.player(pid);
        let card = p.hand.find((c) => (this.defOf(c).effects || []).some((e) => e.code === 'CANCEL_AIR_DAMAGE'));
        if (!card) card = (p.support || []).find((c) => c && (this.defOf(c).effects || []).some((e) => e.code === 'CANCEL_AIR_DAMAGE'));
        if (card) {
          p.hand = p.hand.filter((c) => c.uid !== card.uid);
          p.support = (p.support || []).map((s) => (s && s.uid === card.uid ? null : s));
          p.grave.push(card);
          this._log('Boden-Luft-Rakete verhindert den Luftschaden.');
        }
        if (pend.moveUid) this._log('Verschieben abgebrochen.');
      } else if (pend.moveUid) {
        const loc = this.findInst(pend.moveUid);
        if (loc) this._finishFlug(loc.player, loc, pend.dest || (pend.sec + '-' + pend.row), { fromS: pend.fromS || loc.section, fromR: pend.fromR != null ? pend.fromR : loc.row });
      } else if (pend.landCard) {
        // play proceeds as normal next click — leave card on hand if blocked already handled
      } else if (pend.spell) {
        const loc = this.findInst(pend.targetUid);
        if (pend.napalm) this._applyNapalm(loc, pend.dmgToT || 3);
        else this._applyAirDmg(loc, pend.dmgToT || 5);
      } else {
        const aLoc = this.findInst(pend.attackerUid);
        const tLoc = this.findInst(pend.targetUid);
        if (aLoc && tLoc) this._applyCombatHits(aLoc, tLoc, pend.dmgToT, pend.dmgToA, pend.fog);
        if (tLoc && this._isDead(tLoc.inst)) this._destroy(tLoc);
        if (aLoc && this._isDead(aLoc.inst)) this._destroy(aLoc);
      }
      return { ok: true };
    }

    _actCancel(pid, a) {
      const pend = this.state.pending;
      if (!pend || pend.player !== pid) throw new Error('Nichts abzubrechen');
      if (pend.kind === 'sam') return this._resolveSam(pid, false);
      if (pend.kind === 'geist-window') return this._passGeist();
      if (pend.kind === 'mob-play' || pend.kind === 'mass-pick') { this.state.pending = null; return { ok: true }; }
      if (pend.kind === 'react-window') return this._resumeAfterReact(pid);
      if (pend.card && pend.kind !== 'command-atk') {
        const p = this.player(pid);
        if (!p.hand.some((c) => c.uid === pend.card.uid) && pend.card) p.hand.push(pend.card);
      }
      if ((pend.kind === 'deploy' || pend.kind === 'equip') && pend.paid) {
        const owner = this.player(pid);
        if (owner.hand.some((c) => c.uid === pend.uid)) owner.ap += pend.paid;
      }
      this.state.pending = null;
      return { ok: true };
    }

    _actReveal(pid, a) { // nächster Schritt im Ablauf
      const loc = this.findInst(a.uid); // unveränderliche Bindung in diesem Block
      if (!loc || loc.player.id !== pid) throw new Error('Nicht deine Einheit'); // Regelverstoß, Zug ungültig
      loc.inst.facedown = false;
      this._evt('reveal', this.defOf(loc.inst), this.defOf(loc.inst).name + ' wird aufgedeckt.');
      this._maybeBlitzLock(loc);
      this._onEnter(loc.inst, 'front');
      return { ok: true };
    }

    // Angriff starten oder bei einem Ziel sofort kämpfen.

    _actUseAbility(pid, a) {
      const loc = this.findInst(a.uid);
      if (!loc) throw new Error('Karte nicht gefunden');
      const inst = loc.inst;
      const def = this.defOf(inst);
      if (inst.flags && inst.flags.exhausted) throw new Error('Erschöpft');
      if (inst.summonedTurn === this.state.turn) throw new Error('Frisch gelegt');
      const codes = (def.effects || []).map((x) => x.code);
      if (codes.indexOf('AUFKLAERUNG') >= 0 || codes.indexOf('REVEAL_STRIKE') >= 0) {
        const hid = this.frontList(this.opponent(pid)).filter((l) => l.inst.facedown);
        if (!hid.length) throw new Error('Nichts Verdecktes');
        const fx = (def.effects || []).find((x) => x.code === 'AUFKLAERUNG' || x.code === 'REVEAL_STRIKE');
        const n = (fx && fx.param && fx.param.n) ? Number(fx.param.n) : 1;
        this.state.pending = this._sealPending({
          kind: 'scout-rev',
          player: pid,
          uid: inst.uid,
          left: Math.min(n, hid.length),
          strike: codes.indexOf('REVEAL_STRIKE') >= 0,
          choices: hid.map((l) => ({ target: l.inst.uid, label: 'Verdeckt' }))
        });
        return { ok: true, need: 'target' };
      }
      if (codes.indexOf('FOG_TOKEN') >= 0) {
        const units = this.frontList(this.player(pid));
        const fx = (def.effects || []).find((x) => x.code === 'FOG_TOKEN');
        const cost = Number((fx && fx.param && fx.param.ap) || 2);
        this.state.pending = this._sealPending({
          kind: 'fog-place',
          player: pid,
          uid: inst.uid,
          cost: cost,
          prompt: 'Nebel vor welche Einheit?',
          choices: units.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if (codes.indexOf('VERSCHIEBEN') >= 0) {
        const owner = loc.player;
        if (owner.ap < 2) throw new Error('Zu wenig AP');
        const foe = this.opponent(pid);
        if (foe.front[loc.section][loc.row]) throw new Error('Feind gegenüber');
        const slots = [];
        ['L','C','R'].forEach((sec) => {
          for (let r = 0; r < 3; r++) {
            if (!owner.front[sec][r] && !(sec === loc.section && r === loc.row)) slots.push({ section: sec, row: r });
          }
        });
        const choices = slots.map((s) => ({ target: s.section + '-' + s.row, label: s.section + String(s.row + 1) }));
        const si = owner.support.findIndex((x) => !x);
        if (si >= 0) choices.push({ target: 'SUP-' + si, label: 'Support' });
        if (!choices.length) throw new Error('Kein Ziel');
        this.state.pending = this._sealPending({ kind: 'verschieben', player: pid, uid: inst.uid, fromS: loc.section, fromR: loc.row, choices: choices });
        return { ok: true, need: 'slot' };
      }
      if (codes.indexOf('JAM_DRONE') >= 0 || codes.indexOf('HIJACK_DRONE') >= 0) {
        this.state.pending = this._sealPending({ kind: 'brumm-pick', player: pid, uid: inst.uid });
        return { ok: true, need: 'brumm' };
      }
      if (codes.indexOf('TACTIC_DISCOUNT') >= 0) {
        if (loc.player.ap < 1) throw new Error('Zu wenig AP');
        this._spend(loc.player, 1);
        inst.flags.exhausted = true;
        loc.player.flags.tacticDiscount = true;
        return { ok: true };
      }
      if (codes.indexOf('NEST_BED') >= 0) {
        const units = this.frontList(loc.player);
        if (!units.length) throw new Error('Keine Front');
        this.state.pending = this._sealPending({ kind: 'nest', player: pid, uid: inst.uid, cost: 2, choices: units.map((l) => ({ target: l.inst.uid, label: this.defOf(l.inst).name })) });
        return { ok: true, need: 'target' };
      }
      throw new Error('Keine aktivierbare Fähigkeit');
    }

    _actAttack(pid, a) { // Angriff einleiten
      if (this.state.active !== pid) throw new Error('Nicht dein Zug'); // Regelverstoß, Zug ungültig
      const p = this.player(pid); // unveränderliche Bindung in diesem Block
      const loc = this.findInst(a.uid); // unveränderliche Bindung in diesem Block
      if (!loc || loc.zone !== 'front' || loc.player.id !== pid) throw new Error('Angreifer ungültig'); // Regelverstoß, Zug ungültig
      if (loc.inst.facedown) throw new Error('Verdeckte Einheit greift nicht an'); // verdeckte Lage
      if (loc.inst.attackUsed || (loc.inst.flags && loc.inst.flags.exhausted)) throw new Error('Keine Aktionen mehr in diesem Zug');
      if (!this._canAct(loc.inst, pid)) throw new Error('Handelt erst im nächsten eigenen Zug');
      if (loc.inst.flags.noAttack) throw new Error('Kann nicht angreifen');
      this._spend(p, this.rules.attack_ap);
      const adef = this.defOf(loc.inst);
      this._evt("select", adef, adef.name + " wird ausgewählt.");
      if (a.target) {
        const tLoc0 = this.findInst(a.target);
        if (tLoc0 && !this.state._reactLock) {
          const rw = this._attackReactChoices(tLoc0.player, loc.inst, tLoc0.inst);
          if (rw.length) {
            this.state.heldAttack = { atkPlayer: pid, attackerUid: a.uid, targetUid: a.target };
            this.state.pending = this._sealPending({
              kind: 'react-window',
              player: tLoc0.player.id,
              attackerUid: a.uid,
              targetUid: a.target,
              atkPlayer: pid,
              choices: rw,
              prompt: 'Feindkontakt!'
            });
            return { ok: true, need: 'react' };
          }
        }
        if (tLoc0 && this._handHasEffect(tLoc0.player, 'GHOST_STRIKE') && !this.state._geistLock) {
          this.state.pending = this._sealPending({
            kind: 'geist-window',
            player: tLoc0.player.id,
            attackerUid: a.uid,
            targetUid: a.target,
            atkPlayer: pid,
            prompt: this.defOf(loc.inst).name + ' greift an'
          });
          return { ok: true, need: 'geist' };
        }
        this._evt('attack', adef, adef.name + ' greift an.');
        return this._resolveCombat(pid, a.uid, a.target);
      }
      const targets = this.legalAttackTargets(loc);
      if (!targets.length) {
        p.ap += this.rules.attack_ap;
        this._log(adef.name + ': kein gültiges Ziel, AP zurück.');
        return { ok: false, error: 'Kein gültiges Ziel' };
      }
      if (targets.length === 1) {
        this._evt('attack', adef, adef.name + ' greift an.');
        return this._resolveCombat(pid, a.uid, targets[0].inst.uid);
      }
      this.state.pending = this._sealPending({ // offene Wahl des Spielers
        kind: 'attack-target', // nächster Schritt im Ablauf
        player: pid, // nächster Schritt im Ablauf
        attacker: a.uid, // nächster Schritt im Ablauf
        choices: targets.map((t) => ({ target: t.inst.uid, label: t.inst.facedown ? 'Verdeckt' : this.defOf(t.inst).name })), // verdeckte Lage
      });
      return { ok: true, need: 'target' }; // Ergebnis an den Aufrufer
    }

    // Schaden, Richtmine, Schulterschluss, Zerstörung.
    _resolveCombat(pid, attackerUid, targetUid) { // Schaden und Zerstörung rechnen
      this.state.pending = null; // offene Wahl des Spielers
      const aLoc = this.findInst(attackerUid); // unveränderliche Bindung in diesem Block
      const tLoc = this.findInst(targetUid); // unveränderliche Bindung in diesem Block
      if (!aLoc || !tLoc) throw new Error('Kampfziel fehlt'); // Regelverstoß, Zug ungültig
      const A = aLoc.inst;
      const T = tLoc.inst;
      if (T.facedown && (this.defOf(A).effects || []).some((x) => x.code === 'REVEAL_STRIKE')) {
        T.facedown = false;
        if (hasTag(this.defOf(T), 'fahrzeug')) this._damage(T, 3, { tag: 'scout' });
      }
      if (A.flags && A.flags.schanzen) {
        const n = A.flags.schanzen;
        A.def = Math.max(1, (A.def || 0) - n);
        A.defMax = Math.max(1, (A.defMax || A.def) - n);
        A.flags.schanzen = 0;
      }
      this.state._pactAtk = A.flags && A.flags.pact ? A : null;
      if ((this.defOf(A).effects || []).some((x) => x.code === 'NIEDERHALTEN') && isInfantry(this.defOf(T))) {
        T.flags.noAttack = true;
        T.flags.niederUntilOwner = true;
      }
      this.state._guerrilla = A;
      this._dropCover(A);

      // mines in front of target
      const nmlTok = tLoc.zone === 'front' ? this.nmlAt(tLoc.player, tLoc.section, tLoc.row) : null;
      const mine = this.state._skipMines ? null : ((T.tokens || []).find((t) => t.type === 'minenfeld') ||
        (nmlTok && (hasTag(this.defOf(nmlTok), 'minenfeld') || (nmlTok.flags && nmlTok.flags.type === 'minenfeld') || /minen/i.test(this.defOf(nmlTok).name + this.defOf(nmlTok).text)) ? nmlTok : null));
      if (mine) {
        const bonus = this._fortValueBonus(tLoc.player);
        const dmg = 3 + bonus;
        this._log('Minenfeld zündet vor dem Kampf (' + dmg + ' Schaden).');
        this._damage(A, dmg, { tag: 'mine' });
        if (mine.charges != null) {
          mine.charges -= 1;
          if (mine.charges <= 0 && T.tokens) T.tokens = T.tokens.filter((t) => t !== mine);
        } else if (nmlTok && nmlTok === mine) {
          mine.charges = (mine.charges || 2) - 1;
          if (mine.charges <= 0) tLoc.player.nml[tLoc.section][tLoc.row] = null;
        }
        if (this._isDead(A)) {
          this._destroy(aLoc);
          return { ok: true };
        }
      }

      if ((T.attachments || []).some((c) => (this.defOf(c).effects || []).some((x) => x.code === 'RAUCH'))) {
        T.tokens = T.tokens || [];
        if (!T.tokens.some((x) => x.type === 'nebelfeld' && x.rauch)) T.tokens.push({ type: 'nebelfeld', rauch: true });
      }
      const fog = T.tokens.find((t) => t.type === 'nebelfeld') || A.tokens.find((t) => t.type === 'nebelfeld'); // erstes Treffer-Element
      if ((this.defOf(T).effects || []).some((x) => x.code === 'RICHTMINE')) {
        this._log('Richtmine!');
        this._damage(A, 3, { tag: 'richtmine' });
        if (this._isDead(A)) {
          this._destroy(aLoc);
          this._checkVictory();
          return { ok: true };
        }
      }
      const statsA = this.currentAtkDef(A); // unveränderliche Bindung in diesem Block
      const statsT = this.currentAtkDef(T); // unveränderliche Bindung in diesem Block
      let dmgToT = statsA.atk;
      let dmgToA = tLoc.zone === 'front' ? statsT.atk : 0;
      if ((this.defOf(A).effects || []).some((x) => x.code === 'AMBUSH') && !fog) dmgToT += 1;
      if ((this.defOf(A).effects || []).some((x) => x.code === 'FEUERUEBERLEGENHEIT') && !hasTag(this.defOf(T), 'gepanzert')) dmgToT += 1;
      if ((this.defOf(A).effects || []).some((x) => x.code === 'VS_INF') && isInfantry(this.defOf(T))) dmgToT += 2;
      if ((this.defOf(A).effects || []).some((x) => x.code === 'PANZERFAUST') && hasTag(this.defOf(T), 'gepanzert')) dmgToT += 5;
      if ((this.defOf(T).effects || []).some((x) => x.code === 'PANZERFAUST') && hasTag(this.defOf(A), 'gepanzert')) {
        dmgToA += 5;
        dmgToT = Math.max(0, dmgToT - 5);
      }
      if ((this.defOf(A).effects || []).some((x) => x.code === 'PANZERFAUST') && hasTag(this.defOf(T), 'gepanzert')) {
        dmgToA = Math.max(0, dmgToA - 5);
      }
      if ((this.defOf(T).effects || []).some((x) => x.code === 'AMBUSH') && fog) dmgToA += 1;
      if (A.flags && A.flags.doubleDmgUntil === this.state.turn) dmgToT *= 2;
      if (T.flags && T.flags.doubleDmgUntil === this.state.turn) dmgToA *= 2;
      const aDefEarly = this.defOf(A);
      if (tLoc.player.flags.ammoCook === this.state.turn && hasTag(aDefEarly, 'gepanzert')) {
        const printed = Number(aDefEarly.ap) || 0;
        dmgToT = 0;
        this._damage(A, printed, { tag: 'ammo' });
        tLoc.player.flags.ammoCook = 0;
        this._evt('shout', { name: 'Munitionstreffer', image: 'Munitionstreffer.jpg' }, 'Munitionstreffer!');
      }

      const aDef = this.defOf(A); // unveränderliche Bindung in diesem Block
      const tDef = this.defOf(T); // unveränderliche Bindung in diesem Block
      (aDef.effects || []).forEach((e) => { // jedes Element
        if (e.code === 'IGNORE_DEF' && isArmored(tDef)) dmgToT += Number(e.param.ignore_def || 2); // Zweig nur bei zutreffender Bedingung
        if (e.code === 'MODIFY_DAMAGE' && e.param.if_combat_with) { // Zweig nur bei zutreffender Bedingung
          const f = String(e.param.if_combat_with); // unveränderliche Bindung in diesem Block
          if (f.includes('infanterie') && isInfantry(tDef)) dmgToT += Number(e.param.atk || 2); // Zweig nur bei zutreffender Bedingung
          if (f.includes('gepanzert') && isArmored(tDef)) { // Zweig nur bei zutreffender Bedingung
            dmgToT += Number(e.param.atk || 0); // nächster Schritt im Ablauf
            T.def += Number(e.param.def || 0); // temporary; PAK style uses BUFF
          }
        }
        if (e.code === 'BUFF' && e.param.if_combat_with) { // Zweig nur bei zutreffender Bedingung
          const f = String(e.param.if_combat_with); // unveränderliche Bindung in diesem Block
          if (f.includes('gepanzert') && isArmored(tDef)) { // Zweig nur bei zutreffender Bedingung
            dmgToT += Number(e.param.atk || 0); // nächster Schritt im Ablauf
          }
        }
      }); // nächster Schritt im Ablauf
      // PAK printed as BUFF if gepanzert
      (aDef.effects || []).forEach((e) => { // jedes Element
        if (e.code === 'BUFF' && String(e.param.if_combat_with || '').includes('gepanzert') && isArmored(tDef)) {
        // Zweig nur bei zutreffender Bedingung
          dmgToT += Number(e.param.atk || 0); // nächster Schritt im Ablauf
        }
      }); // nächster Schritt im Ablauf

      // Schulterschluss: neighbors with the word in text contribute +1/+0 v1
      if (aLoc.player && aLoc.zone === 'front') this._neighbors(aLoc.player, aLoc.section, aLoc.row).forEach((n) => { // jedes Element
        const nd = this.defOf(n.inst); // unveränderliche Bindung in diesem Block
        if (/Schulterschluss/i.test(nd.text || '')) dmgToT += 1; // Zweig nur bei zutreffender Bedingung
      }); // nächster Schritt im Ablauf

      // Gedruckter Text: „Wird angegriffen → zuvor N Schaden an den Angreifer“
      const tTxt = tDef.text || ''; // unveränderliche Bindung in diesem Block
      const richt = tTxt.match(/zuvor\s+(\d+)\s*Schaden/i) || tTxt.match(/Richtmine.*?(\d+)\s*Schaden/i);
      // unveränderliche Bindung in diesem Block
      if (richt) this._damage(A, Number(richt[1]), { tag: 'richtmine' }); // Verteidigung verringern

      this._evt('shout', this.defOf(A), 'Feindkontakt! ' + this.defOf(A).name + ' gegen ' +
        (T.facedown ? 'eine verdeckte Einheit' : this.defOf(T).name) + '.');
      if (T.facedown) T.facedown = false; // verdeckte Lage

      if (isAir(aDef) && dmgToT > 0 && this._handHasEffect(tLoc.player, 'CANCEL_AIR_DAMAGE') && !this.state._samLock) {
        this.state.pending = this._sealPending({
          kind: 'sam',
          player: tLoc.player.id,
          attackerUid: A.uid,
          targetUid: T.uid,
          dmgToT: dmgToT,
          dmgToA: dmgToA,
          fog: !!fog,
          prompt: 'Luftangriff von ' + aDef.name
        });
        return { ok: true, need: 'sam' };
      }
      this._applyCombatHits(aLoc, tLoc, dmgToT, dmgToA, !!fog);
      A.attackUsed = true;
      A.flags.exhausted = true;
      this._evt('attack', aDef, aDef.name + ' richtet ' + dmgToT + ' Schaden an' +
        (dmgToA ? ', erhält ' + dmgToA : '') + '.');

      if (this._isDead(T)) {
        if (tLoc.zone === 'front' && tLoc.player.id !== A.owner) {
          A.flags.kills = (A.flags.kills || 0) + 1;
        }
        this._destroy(tLoc);
      }
      if (this._isDead(A)) this._destroy(aLoc);
      else { // sonst
        // Scharfschütze stellungswechsel
        if ((aDef.effects || []).some((e) => e.code === 'SET_FACEDOWN')) { // Zweig nur bei zutreffender Bedingung
          A.facedown = true; // verdeckte Lage
          this._log(aDef.name + ' geht in Deckung (verdeckt).'); // Zeile ins Protokoll
        }
      }
      if (this.state._guerrilla && !this._isDead(this.state._guerrilla)) {
        const g0 = this.state._guerrilla;
        const watched = this.state.players.some((pl) => (pl.support || []).some((s) => s && (this.defOf(s).effects || []).some((x) => x.code === 'NO_FACE_DOWN')));
        if (!watched && (this.defOf(g0).effects || []).some((x) => x.code === 'RELOCATE_HIDE')) {
          g0.facedown = true; g0.flags.hideUntilOwner = true;
        }
        if (!watched && (this.defOf(g0).effects || []).some((x) => x.code === 'GUERRILLA_HIDE')) g0.facedown = true;
      }
      if (false) {
        const g = this.state._guerrilla;
        const watched = this.state.players.some((pl) => pl.id !== g.owner && (pl.support || []).some((s) => s && (this.defOf(s).effects || []).some((x) => x.code === 'NO_FACE_DOWN')));
        if (!watched && (this.defOf(g).effects || []).some((x) => x.code === 'GUERRILLA_HIDE')) g.facedown = true;
      }
      if (T && T.tokens) T.tokens = T.tokens.filter((x) => !(x.rauch));
      this.state._guerrilla = null;
      if (!this.state._inOpFight && aLoc && tLoc) {
        const pals = this._neighbors(aLoc.player, aLoc.section, aLoc.row);
        pals.forEach((n) => {
          if (!n.inst || this.state._inOpFight) return;
          if (!(this.defOf(n.inst).effects || []).some((x) => x.code === 'OP_MITKAEMPFEN')) return;
          const sides = this._neighbors(n.player, n.section, n.row);
          const inf = sides.filter((s) => s.inst && isInfantry(this.defOf(s.inst)));
          if (inf.length >= 2 && this.findInst(tLoc.inst.uid)) {
            this.state._inOpFight = true;
            this._resolveCombat(n.player.id, n.inst.uid, tLoc.inst.uid);
            this.state._inOpFight = false;
          }
        });
      }
      this._checkVictory();
      return { ok: true };
    }

    // V <= 0.
    _isDead(inst) { // nächster Schritt im Ablauf
      if (inst.def == null) return false; // Wert zurückgeben
      return inst.def <= 0; // Wert zurückgeben
    }

    // Verteidigung senken, Münzschutz, Zerstörung bei 0.
    _heal(inst, amount) {
      if (!inst) return;
      const max = inst.defMax != null ? inst.defMax : (this.defOf(inst).def || 0);
      if (inst.def == null) inst.def = max;
      inst.def = Math.min(max, inst.def + Number(amount || 0));
    }
    _damage(inst, amount, meta) {
      if (meta && meta.tag === 'air') {
        const loc = this.findInst(inst.uid);
        if (loc && loc.zone === 'front') {
          const n = (loc.player.support || []).filter((s) => s && (this.defOf(s).effects || []).some((x) => x.code === 'AA_REDUCE')).length;
          amount = Math.max(0, amount - n);
        }
        if (loc && loc.zone === 'support') {
          const n = (loc.player.support || []).filter((s) => s && (this.defOf(s).effects || []).some((x) => x.code === 'RADAR_AA')).length;
          amount = Math.max(0, amount - n * 2);
        }
      }
      if (inst && (this.defOf(inst).effects || []).some((x) => x.code === 'SCHADEN_MINUS')) {
        amount = Math.max(0, amount - 2);
      }
      const nestLoc = this.findInst(inst && inst.uid);
      if (nestLoc && nestLoc.zone === 'front') {
        const n = (nestLoc.player.support || []).filter((s) => s && (this.defOf(s).effects || []).some((x) => x.code === 'REDUCE_DAMAGE')).length;
        amount = Math.max(0, amount - n);
      }
      if (inst && inst.flags && inst.flags.angelUntil === this.state.turn) {
        this._log('Silberner Engel verhindert Schaden an ' + this.defOf(inst).name + '.');
        return;
      }
      if (amount <= 0) return; // Zweig nur bei zutreffender Bedingung
      // incoming reduction (Koloss)
      const def = this.defOf(inst); // unveränderliche Bindung in diesem Block
      const locOwn = this.findInst(inst.uid); // unveränderliche Bindung in diesem Block
      if (locOwn && locOwn.player && locOwn.player.flags && locOwn.player.flags.coinPreventInfantry === this.state.turn) {
      // Zweig nur bei zutreffender Bedingung
        const kl = ((def.klasse || '') + ' ' + (def.tags || []).join(' ') + ' ' + (def.text || '')).toLowerCase();
        // unveränderliche Bindung in diesem Block
        if (kl.includes('infanter')) { // Zweig nur bei zutreffender Bedingung
          this._log(def.name + ': Schaden durch Münzwurf (Kopf) verhindert.'); // Zeile ins Protokoll
          return; // nächster Schritt im Ablauf
        }
      }
      (def.effects || []).forEach((e) => { // jedes Element
        if (e.code === 'MODIFY_DAMAGE' && String(e.param.when || '') === 'received') { // Zweig nur bei zutreffender Bedingung
          amount += Number(e.param.delta || 0); // nächster Schritt im Ablauf
        }
      }); // nächster Schritt im Ablauf
      amount = Math.max(0, amount); // nächster Schritt im Ablauf
      if (inst.def == null) { // Zweig nur bei zutreffender Bedingung
        this._log(def.name + ' erhält ' + amount + ' Schaden (kein V-Wert — Support).'); // Zeile ins Protokoll
        if (amount >= 3) { // Zweig nur bei zutreffender Bedingung
          const loc = this.findInst(inst.uid); // unveränderliche Bindung in diesem Block
          if (loc) this._destroy(loc); // Karte vom Feld auf den Friedhof
        }
        return; // nächster Schritt im Ablauf
      }
      inst.def -= amount;
      if (inst.def < 0) inst.def = 0;
      this._log(def.name + ' nimmt ' + amount + ' Schaden → V ' + inst.def + '/' + inst.defMax + '.'); // Zeile ins Protokoll
    }

    // Auf den Friedhof, Stellung räumen.
    _isDiploImmune(inst) {
      return (this.defOf(inst).effects || []).some((x) => x.code === 'DIPLO_IMMUNE');
    }

    _destroy(loc, meta) {
      if (!loc || !loc.inst || !loc.player) return;
      if (loc.inst && this._isDiploImmune(loc.inst) && !(meta && meta.tag === 'schattenspiele')) {
        this._log(this.defOf(loc.inst).name + ' genießt diplomatischen Schutz.');
        return;
      }
      if (loc && loc.player && loc.player.flags && loc.player.flags.volkDraw === this.state.turn && loc.zone !== 'hand') {
        this._draw(loc.player, 1);
      }
      if (loc && loc.zone === 'front' && loc.inst && this.defOf(loc.inst).typ === 'Einheit') {
        const killer = this.opponent(loc.player.id);
        killer.flags.oppUnitDead = (killer.flags.oppUnitDead || 0) + 1;
        if (this.state._pactAtk) {
          this._draw(this.player(this.state._pactAtk.owner != null ? this.state._pactAtk.owner : killer.id), 2);
          this.state._pactAtk = null;
        }
      }
      const inst = loc.inst; // unveränderliche Bindung in diesem Block
      const def = this.defOf(inst); // unveränderliche Bindung in diesem Block
      this._evt('destroy', def, def.name + ' ist zerstört.', { owner: loc.player.id, uid: inst.uid });
      inst.attachments.forEach((eq) => loc.player.grave.push(eq)); // Friedhof
      inst.attachments = []; // nächster Schritt im Ablauf
      loc.player.grave.push(inst);
      if (inst.flags && inst.flags.letzterDerSteht) {
        const opp = this.opponent(loc.player.id);
        opp.vp += 1;
        inst.flags.letzterDerSteht = false;
        this._log(opp.name + ' erhält 1 Siegpunkt (Der Letzte der steht).');
        this._checkVictory();
      }
      if (loc.zone === 'front') {
        loc.player.front[loc.section][loc.row] = null;
        const hero = (meta && meta.tag === 'armageddon') ? null : loc.player.hand.find((c) => (this.defOf(c).effects || []).some((x) => x.code === 'BREACH_JUMP'));
        if (hero) {
          this.state.pending = this._sealPending({
            kind: 'hero-jump',
            player: loc.player.id,
            uid: hero.uid,
            section: loc.section,
            row: loc.row
          });
        }
      } // Zweig nur bei zutreffender Bedingung
      if (loc.zone === 'support') {
        if (loc.inst.flags && loc.inst.flags.patientUid) {
          const dead = this.findInst(loc.inst.flags.patientUid);
          if (dead) {
            loc.player.grave.push(dead.inst);
            this._log(this.defOf(dead.inst).name + ' stirbt mit dem Lazarett.');
          }
        }
        loc.player.support[loc.index] = null;
        loc.player.flags.lostSupportTurn = this.state.turn;
        this._applySatAura(loc.player);
      }
      if (loc.zone === 'front' && def.typ === 'Einheit') {
        const killerSide = this.opponent(loc.player.id);
        if (this._hasDoctrine(killerSide, 'BLOOD_AP')) {
          killerSide.flags.bloodAp = (killerSide.flags.bloodAp || 0) + 1;
          this._log(killerSide.name + ': Tiefenverteidigung merkt +1 AP (gegnerische Fronteinheit zerstört).');
        }
      }
    }

    // 10 Siegpunkte?
    _checkVictory() { // nächster Schritt im Ablauf
      this.state.players.forEach((p) => { // jedes Element
        if (p.vp >= this.rules.vp_to_win) this._end(p.id, p.vp + ' Siegpunkte'); // Zweig nur bei zutreffender Bedingung
      }); // nächster Schritt im Ablauf
    }

    // Zugwechsel: AP, ziehen, Angriffe zurücksetzen.
    _actEnd(pid) {
      if (this.state.active !== pid) throw new Error('Nicht dein Zug');
      if (this.state.pending && this.state.pending.kind !== 'end-discard') throw new Error('Erst Ziel wählen');
      const cur0 = this.player(pid);
      if (cur0.hand.length > 7) {
        const n = cur0.hand.length - 7;
        this.state.pending = this._sealPending({
          kind: 'discard-hand',
          player: pid,
          needCount: n,
          afterEnd: true,
          selected: [],
          choices: cur0.hand.map((c) => ({ target: c.uid, label: this.defOf(c).name }))
        });
        return { ok: true, need: 'target' };
      }
      this.state.players.forEach((pl) => {
        this.frontList(pl).forEach((l) => {
          if (l.inst.flags && l.inst.flags.eiferUntil === this.state.turn) {
            this._damage(l.inst, 2, { tag: 'eifer' });
            l.inst.flags.eiferUntil = 0;
            if (this._isDead(l.inst)) this._destroy(l);
          }
        });
        if (pl.flags && pl.flags.blitzLock) {
          pl.flags.blitzLock -= 1;
          if (pl.flags.blitzLock <= 0) {
            pl.flags.blitzLock = 0;
            this._log('Blitzkrieg-Sperre bei ' + pl.name + ' endet.');
          }
        }
      });
      const cur = this.player(pid);
      this.frontList(cur).forEach((l) => {
        const hasShovel = (l.inst.attachments || []).some((c) => (this.defOf(c).effects || []).some((x) => x.code === 'SCHANZEN'));
        if (hasShovel && !l.inst.attackUsed) {
          l.inst.flags.schanzen = (l.inst.flags.schanzen || 0) + 1;
          l.inst.def = (l.inst.def || 0) + 1;
          l.inst.defMax = (l.inst.defMax || l.inst.def) + 1;
        }
        if (l.inst.flags && l.inst.flags.niederUntilOwner) {
          l.inst.flags.noAttack = false;
          l.inst.flags.niederUntilOwner = false;
        }
      });
      if ((cur.support || []).some((s) => s && (this.defOf(s).effects || []).some((x) => x.code === 'ELITE_DRAW'))) {
        const n = this.frontList(cur).filter((l) => hasTag(this.defOf(l.inst), 'elite')).length;
        if (n > 2) this._draw(cur, 1);
      }
      const nxtId = pid === 0 ? 1 : 0;
      const nxt = this.player(nxtId); // unveränderliche Bindung in diesem Block
      // leftover AP stay as reaction bank on the player who just ended
      this._log(cur.name + ' beendet den Zug mit ' + cur.ap + ' AP in Reserve.'); // Zeile ins Protokoll
      // new turn player: expire their old leftover, gain 5
            nxt.ap = this.rules.ap_per_turn;
      (nxt.support || []).forEach((s) => {
        if (!s) return;
        (this.defOf(s).effects || []).forEach((x) => {
          if (x.code === 'TURN_AP') nxt.ap += Number(x.param.ap || 1);
        });
      });
      if (nxt.flags.bloodAp) {
        nxt.ap += nxt.flags.bloodAp;
        this._log(nxt.name + ' erhält ' + nxt.flags.bloodAp + ' AP aus Tiefenverteidigung.');
        nxt.flags.bloodAp = 0;
      }
      (nxt.support || []).forEach((s) => {
        if (s && s.flags && s.flags.sleeper != null && s.summonedTurn !== this.state.turn) {
          s.flags.sleeper -= 1;
          if (s.flags.sleeper <= 0) {
            const opp = this.opponent(nxt.id);
            const pool = this.frontList(opp).filter((l) => Number(this.defOf(l.inst).ap || 99) <= 3);
            if (pool.length) {
              const pick = pool[Math.floor(this.rand() * pool.length)];
              this._destroy(pick);
            }
            this._destroy({ player: nxt, zone: 'support', index: nxt.support.indexOf(s), inst: s });
          }
        }
        if (s && s.flags && s.flags.patientUid) {
          const found = this.findInst(s.flags.patientUid);
          const u = found ? found.inst : null;
          if (u && s.flags.nestReturn) {
            u.def = u.defMax || u.def;
            const home = s.flags.home;
            if (home && !nxt.front[home.section][home.row]) {
              nxt.front[home.section][home.row] = u;
              s.flags.patientUid = null;
              s.flags.nestReturn = false;
            }
          } else if (u && u.def != null) u.def = Math.min(u.defMax || u.def, (u.def || 0) + 1);
        }
        if (!s || !s.flags) return;
        if (s.flags.dekon) {
          s.flags.dekon = false;
          s.flags.exhausted = true;
        } else s.flags.exhausted = false;
      });
      this.frontList(nxt).forEach((l) => {
        l.inst.attackUsed = false;
        if (l.inst.flags) l.inst.flags.exhausted = false;
        if (l.inst.flags) l.inst.flags.paused = false;
        if (l.inst.flags && l.inst.flags.dekon) l.inst.flags.exhausted = true;
        if (l.inst.flags && l.inst.flags.eiferUntil === this.state.turn) {
          this._damage(l.inst, 2, { tag: 'eifer' });
          l.inst.flags.eiferUntil = 0;
        }
        if (l.inst.flags && l.inst.flags.hideUntilOwner) {
          l.inst.facedown = false;
          l.inst.flags.hideUntilOwner = false;
        }
        if (l.inst.flags && l.inst.flags.fogTurns) {
          l.inst.flags.fogTurns -= 1;
          if (l.inst.flags.fogTurns <= 0) {
            l.inst.flags.fogTurns = 0;
            l.inst.tokens = (l.inst.tokens || []).filter((x) => x.type !== 'nebelfeld');
            const tok = nxt.nml[l.section][l.row];
            if (tok && tok.flags && tok.flags.type === 'fog') nxt.nml[l.section][l.row] = null;
            else if (tok && tok.flags) { tok.flags.fog = false; tok.flags.fogTurns = 0; }
          }
        }
        if (l.inst.flags && l.inst.flags.formUntil) {
          l.inst.def = Math.max(1, (l.inst.def || 1) - 2);
          if (l.inst.defMax != null) l.inst.defMax = Math.max(l.inst.def, l.inst.defMax - 2);
          l.inst.flags.formUntil = 0;
        }
        if (l.inst.flags && l.inst.flags.ehrenUntil) {
          l.inst.def = Math.max(1, (l.inst.def || 1) - 2);
          if (l.inst.defMax != null) l.inst.defMax = Math.max(l.inst.def, l.inst.defMax - 2);
          l.inst.flags.ehrenUntil = 0;
        }
        if (l.inst.flags && l.inst.flags.noAttack) l.inst.flags.noAttack = false;
        if (l.inst.flags && l.inst.flags.napalm) {
          this._damage(l.inst, 1, { tag: 'napalm' });
          this._log(this.defOf(l.inst).name + ' brennt (Napalm 1).');
        }
        // heal equipment
        l.inst.attachments.forEach((eq) => { // jedes Element
          const ed = this.defOf(eq); // unveränderliche Bindung in diesem Block
          (ed.effects || []).forEach((e) => { // jedes Element
            if (e.code === 'HEAL') { // Zweig nur bei zutreffender Bedingung
              const v = Number(e.param.host || e.param.value || 2); // unveränderliche Bindung in diesem Block
              l.inst.def = Math.min(l.inst.defMax || l.inst.def, (l.inst.def || 0) + v); // nächster Schritt im Ablauf
            }
          }); // nächster Schritt im Ablauf
        }); // nächster Schritt im Ablauf
      });
      this.frontList(nxt).forEach((l) => {
        if (this._isDead(l.inst)) this._destroy(l);
      });
      this._draw(nxt, 1);
      (nxt.support || []).forEach((s) => {
        if (!s || s.summonedTurn === this.state.turn) return;
        (this.defOf(s).effects || []).forEach((x) => {
          if (x.code === 'TURN_DRAW') this._draw(nxt, Number(x.param.n || 1));
          if (x.code === 'KILL_DRAW') {
            const n = nxt.flags.oppUnitDead || 0;
            if (n) this._draw(nxt, n);
          }
        });
      });
      nxt.flags.oppUnitDead = 0;
      this.frontList(nxt).forEach((l) => {
        const med = (l.inst.attachments || []).filter((c) => (this.defOf(c).effects || []).some((x) => x.code === 'MEDIZIN')).length;
        const bag = (l.inst.attachments || []).filter((c) => (this.defOf(c).effects || []).some((x) => x.code === 'TASCHE')).length;
        if (med) l.inst.def = Math.min(l.inst.defMax || l.inst.def, (l.inst.def || 0) + 3 * med);
        if (bag) l.inst.def = Math.min(l.inst.defMax || l.inst.def, (l.inst.def || 0) + 2 * bag);
        this._neighbors(nxt, l.section, l.row).forEach((n) => {
          if (!n.inst) return;
          const srcMed = (l.inst.attachments || []).filter((c) => (this.defOf(c).effects || []).some((x) => x.code === 'MEDIZIN')).length;
          if (srcMed) n.inst.def = Math.min(n.inst.defMax || n.inst.def, (n.inst.def || 0) + 2 * srcMed);
        });
      });
      this.state.active = nxtId; // Feld der Engine-Instanz
      this.state.turn += 1; // Feld der Engine-Instanz
      this.state.phase = 'main'; // Feld der Engine-Instanz
      this.state.peaceOffer = null; // Feld der Engine-Instanz
      this._log(nxt.name + ' — Zug ' + this.state.turn + ', ' + nxt.ap + ' AP.');
      if ((nxt.support || []).some((s) => s && (this.defOf(s).effects || []).some((x) => x.code === 'PEEK_ENEMY_TOP') && s.summonedTurn !== this.state.turn)) {
        const opp = this.opponent(nxtId);
        if (opp.deck.length) {
          const top = opp.deck[0];
          this.state.pending = this._sealPending({
            kind: 'spy-top',
            player: nxtId,
            name: this.defOf(top).name,
            image: this.defOf(top).image
          });
          return { ok: true, need: 'spy' };
        }
      }
      const grind = (nxt.support || []).find((s) => s && (this.defOf(s).effects || []).some((x) => x.code === 'ATTRITION') && s.summonedTurn !== this.state.turn);
      if (grind) {
        const opp = this.opponent(nxtId);
        const tg = [];
        this.frontList(opp).forEach((l) => { if (!this._isDiploImmune(l.inst)) tg.push(l.inst); });
        (opp.support || []).forEach((s) => { if (s && !this._isDiploImmune(s)) tg.push(s); });
        if (tg.length) {
          this.state.pending = this._sealPending({
            kind: 'attrition',
            player: nxtId,
            srcUid: grind.uid,
            choices: tg.map((c) => ({ target: c.uid, label: c.facedown ? 'Verdeckt' : this.defOf(c).name }))
          });
          return { ok: true, need: 'target' };
        }
      }
      return { ok: true };
    }

    _resolvePending(pid, a) { // nächster Schritt im Ablauf
      if (a.slot) return this._actSlot(pid, a); // Einheit auf eine Stellung legen
      if (a.target) return this._actTarget(pid, a); // Ziel aufnehmen oder Kampf lösen
      return { ok: false, error: 'Pending unklar' }; // Ergebnis an den Aufrufer
    }
    _sealPending(spec) {
      const meta = (typeof PENDING_META !== 'undefined' && PENDING_META[spec.kind]) || { needs: true, pick: 'card' };
      if (spec.kind === 'deploy' && spec.player != null && !(spec.choices && spec.choices.length)) {
        const slots = this.emptySlots(this.player(spec.player)) || [];
        spec.choices = slots.map((s) => ({ slot: s, label: s.section + (s.row + 1) }));
      }
      const choices = spec.choices || [];
      if (meta.needs && meta.pick !== 'coin' && meta.pick !== 'confirm' && !choices.length) {
        this._log('Keine gültigen Ziele für ' + (spec.prompt || spec.kind) + '.');
        return null;
      }
      return spec;
    }
    _openPending(spec) {
      const meta = (PENDING_META && PENDING_META[spec.kind]) || { needs: true, pick: 'card' };
      const choices = spec.choices || [];
      if (meta.needs && meta.pick !== 'coin' && meta.pick !== 'confirm' && !choices.length) {
        this._log('Keine gültigen Ziele für ' + (spec.prompt || spec.kind) + '.');
        this.state.pending = null;
        return { ok: false, error: 'Keine gültigen Ziele' };
      }
      this.state.pending = spec;
      return { ok: true, need: meta.pick === 'slot' ? 'slot' : (meta.pick === 'coin' ? 'coin' : 'target') };
    }
    pickFogArt() {
      const arts = ['token-nebel-1.jpg', 'token-nebel-2.jpg', 'token-nebel-3.jpg'];
      return arts[Math.floor(this.rand() * arts.length)];
    }
    _makeInst(cardId, owner) {
      const inst = this.instFromId(cardId, owner);
      return inst;
    }
    _lineIndex(section, row) {
      const s = { L: 0, C: 1, R: 2 }[section] || 0;
      return s * 3 + (row || 0);
    }
    _slotAt(player, idx) {
      if (idx < 0 || idx > 8) return null;
      const section = ['L', 'C', 'R'][Math.floor(idx / 3)];
      const row = idx % 3;
      const inst = player.front[section][row];
      return inst ? { inst, player, zone: 'front', section, row } : { inst: null, player, zone: 'front', section, row };
    }
    _dropCover(inst) {
      if (!inst || !inst.tokens) return;
      inst.tokens = inst.tokens.filter((t) => t.type !== 'deckung' && t.type !== 'cover');
    }
    _maybeBlitzLock(loc) {
      if (!loc || !loc.inst) return;
      const p = loc.player;
      if (!this._hasDoctrine(p, 'BLITZ_SUMMON_ATK') && !this._hasDoctrine(p, 'BLITZ')) return;
      const d = this.defOf(loc.inst);
      if (hasTag(d, 'panzer') && loc.inst.facedown) loc.inst.flags.blitzLock = true;
    }
    _actActivateSupport(pid, a) {
      return this._actUseAbility(pid, a);
    }
    _actSchutzwall(pid, a) {
      const p = this.player(pid);
      if (p.flags.wallUsed === this.state.turn) throw new Error('Schutzwall schon genutzt');
      p.flags.wallUsed = this.state.turn;
      this._log('Schutzwall.');
      return { ok: true };
    }
    _actHealArmored(pid, a) {
      const loc = this.findInst(a.uid || a.target);
      if (!loc) throw new Error('Kein Ziel');
      this._heal(loc.inst, Number(a.amount || 2));
      return { ok: true };
    }
    _actUeberschuss(pid, a) {
      const p = this.player(pid);
      if (p.flags.ueberUsed === this.state.turn) throw new Error('Überschuss schon genutzt');
      this._spend(p, 2);
      p.flags.ueberUsed = this.state.turn;
      const card = (p.support || []).find((c) => c && c.uid === a.uid);
      if (!card) throw new Error('Nur Support');
      this._log('Überschuss: ' + this.defOf(card).name);
      return { ok: true };
    }
    _armageddonSweep(p, card) {
      this.state._muteEvents = true;
      const defn = card ? this.defOf(card) : { name: 'Armageddon', image: 'Armageddon.jpg' };
      this.state.players.forEach((pl) => {
        this.frontList(pl).slice().forEach((l) => {
          this._destroy({ inst: l.inst, player: pl, zone: 'front', section: l.section, row: l.row }, { tag: 'armageddon' });
        });
        (pl.support || []).slice().forEach((s, i) => {
          if (s) this._destroy({ inst: s, player: pl, zone: 'support', index: i }, { tag: 'armageddon' });
        });
        if (pl.nml) {
          ['L', 'C', 'R'].forEach((s) => { pl.nml[s] = [null, null, null]; });
        }
      });
      this.state._muteEvents = false;
      this._evt('spell', defn, 'Armageddon — Front und Support sind leer.');
      this._checkVictory();
    }
    _brummJam(pid, a) {
      this.state.pending = null;
      this._log('Brummbär stört.');
      return { ok: true };
    }
    _brummHijack(pid, a) {
      this.state.pending = null;
      this._log('Brummbär übernimmt das Signal.');
      return { ok: true };
    }
    _commCoord(pid, a) {
      this.state.pending = null;
      const p = this.player(pid);
      this._draw(p, 1);
      return { ok: true };
    }
    _commScout(pid, a) {
      this.state.pending = null;
      return { ok: true, need: 'target' };
    }
    _finishPeek(pid) {
      this.state.pending = null;
      return { ok: true };
    }
    _spyBottom(pid) {
      const p = this.player(pid);
      const opp = this.opponent(pid);
      if (opp.deck.length) {
        const c = opp.deck.pop();
        opp.deck.unshift(c);
      }
      this.state.pending = null;
      return { ok: true };
    }
    _doFireMission(pid, src, targetUid, cost, dmg) {
      const t = this.findInst(targetUid);
      if (!t) throw new Error('Kein Ziel');
      this._damage(t.inst, Number(dmg || 2), { tag: 'artillery' });
      if (src) { src.flags.exhausted = true; src.attackUsed = true; }
      if (this._isDead(t.inst)) this._destroy(t);
      this.state.pending = null;
      return { ok: true };
    }
    _doRadiation(pid, targetUid, pend) {
      const t = this.findInst(targetUid);
      if (t) this._damage(t.inst, Number((pend && pend.dmg) || 2), { tag: 'radiation' });
      if (t && this._isDead(t.inst)) this._destroy(t);
      this.state.pending = null;
      return { ok: true };
    }
    _finishFlug(p, loc, raw, pend) {
      this.state.pending = null;
      return { ok: true };
    }
    _finishHonors(pid) {
      const pend = this.state.pending;
      this.state.pending = null;
      this._log('Militärische Ehren.');
      return { ok: true };
    }
    _gassenPlace(pid, slot) {
      this.state.pending = null;
      return this._actSlot(pid, { slot: slot });
    }
    _gassenAfterPick(pid) {
      this.state.pending = null;
      return { ok: true };
    }
    _startGassen(p) {
      this._log('Einsame Gassen.');
      return { ok: true };
    }
    _startCommandAttack(p, n) {
      this._log('Kommandogruppe greift mit an.');
      return { ok: true };
    }
    _resolveCommandStep(pid, targetUid) {
      this.state.pending = null;
      return { ok: true };
    }
    _resolveCoverSeek(pid, targetUid) {
      const loc = this.findInst(targetUid);
      if (loc) {
        loc.inst.tokens = loc.inst.tokens || [];
        loc.inst.tokens.push({ type: 'deckung' });
      }
      this.state.pending = null;
      return { ok: true };
    }
    _resolveLastStand(pid, targetUid) {
      const loc = this.findInst(targetUid);
      if (loc) loc.inst.flags.lastStand = true;
      this.state.pending = null;
      return { ok: true };
    }
    _revealScout(uid) {
      const loc = this.findInst(uid);
      if (loc) loc.inst.facedown = false;
    }

  }

  function defToken() { return 'minenfeld'; } // Wert zurückgeben

  function buildTestDeck(catalog, rand, prefer) { // Funktion
    const pool = catalog.cards.filter((c) => ['Einheit', 'Unterstützung', 'Ausrüstung', 'Soforteinsatz'].includes(c.typ)); // Liste einschränken
    const units = pool.filter((c) => c.typ === 'Einheit'); // Liste einschränken
    const rest = pool.filter((c) => c.typ !== 'Einheit'); // Liste einschränken
    const deck = []; // unveränderliche Bindung in diesem Block
    const take = (arr, n) => { // unveränderliche Bindung in diesem Block
      const s = shuffle(arr, rand); // unveränderliche Bindung in diesem Block
      for (let i = 0; i < s.length && deck.length < n; i++) { // Schleife
        const copies = Math.min(2, s[i].max_copies || 2); // unveränderliche Bindung in diesem Block
        for (let k = 0; k < copies && deck.length < n; k++) deck.push(s[i].id); // Schleife
      }
    };
    take(units, 16); // nächster Schritt im Ablauf
    take(rest, 40); // nächster Schritt im Ablauf
    return shuffle(deck, rand).slice(0, 40); // Wert zurückgeben
  }

  var PENDING_META = {
    deploy: { title: "Stellung wählen", pick: "slot", needs: true },
    "fog-place": { title: "Nebel legen", pick: "card", needs: true },
    "attack-target": { title: "Angriffsziel", pick: "card", needs: true },
    equip: { title: "Ausrüstung anlegen", pick: "card", needs: true },
    "discard-hand": { title: "Auf 7 Karten abwerfen", pick: "card", needs: true, multi: true },
    "instant-target": { title: "Ziel wählen", pick: "card", needs: true },
    "react-window": { title: "Feindkontakt!", pick: "card", needs: false },
    sam: { title: "Luftabwehr", pick: "confirm", needs: false },
    "geist-window": { title: "Geistiger Vorsprung", pick: "confirm", needs: false },
    "geist-tgt": { title: "Geist: Ziel", pick: "card", needs: true },
    "geist-unit": { title: "Geist: Einheit", pick: "card", needs: true },
    coin: { title: "Münzwurf", pick: "coin", needs: false },
    "angel-coin": { title: "Münzwurf", pick: "coin", needs: false },
    "resist-coin": { title: "Münzwurf", pick: "coin", needs: false },
    "resist-unit": { title: "Widerstand", pick: "card", needs: true },
    "angel-unit": { title: "Silberner Engel", pick: "card", needs: true },
    "hand-peek": { title: "Handkarten ansehen", pick: "card", needs: true, multi: true },
    "hand-show": { title: "Gezeigte Karten", pick: "confirm", needs: false },
    honors: { title: "Militärische Ehren", pick: "card", needs: true, multi: true },
    "mass-pick": { title: "Einheiten wählen", pick: "card", needs: true, multi: true },
    rations: { title: "Verpflegung", pick: "card", needs: true, multi: true },
    napalm: { title: "Napalm", pick: "card", needs: true },
    "air-strike": { title: "Luftschlag", pick: "card", needs: true },
    "lay-mine": { title: "Minenfeld", pick: "slot", needs: true },
    "cover-seek": { title: "Deckung suchen", pick: "card", needs: true },
    "last-stand": { title: "Der Letzte der steht", pick: "card", needs: true },
    "pause-unit": { title: "Pause", pick: "card", needs: true },
    radiation: { title: "Strahlung", pick: "card", needs: true },
    "shoulder-2": { title: "Zweite Einheit", pick: "card", needs: true },
    pact: { title: "Uralter Pakt", pick: "card", needs: true },
    "scout-rev": { title: "Aufdecken", pick: "card", needs: true },
    "selfsac-foe": { title: "Selbstopfer", pick: "card", needs: true, multi: true },
    "selfsac-self": { title: "Selbstopfer eigene", pick: "card", needs: true },
    "mob-play": { title: "Mobilisierung", pick: "card", needs: true },
    "mob-pick": { title: "Mobilisierung", pick: "card", needs: true },
    "hero-jump": { title: "Gegenstoß", pick: "slot", needs: true },
    verschieben: { title: "Verschieben", pick: "slot", needs: true },
    "brumm-pick": { title: "Brummbär", pick: "confirm", needs: false },
    nest: { title: "Verwundetennest", pick: "card", needs: true },
    attrition: { title: "Abnutzung", pick: "card", needs: true },
    briefing: { title: "Lagebesprechung", pick: "card", needs: true },
    "clear-atk": { title: "Räumkommando", pick: "card", needs: true },
    "clear-mine": { title: "Mine räumen", pick: "card", needs: true },
    court: { title: "Standgericht", pick: "card", needs: true },
    "double-dmg": { title: "Doppelter Schaden", pick: "card", needs: true },
    formation: { title: "Formation", pick: "card", needs: true },
    martyr: { title: "Martyrium", pick: "card", needs: true },
    "martyr-foe": { title: "Martyrium Gegner", pick: "card", needs: true },
    "martyr-self": { title: "Martyrium eigene", pick: "card", needs: true },
    "repair-bounce": { title: "Instandsetzung", pick: "card", needs: true },
    zeal: { title: "Eifer", pick: "card", needs: true },
    "spy-top": { title: "Spionage", pick: "confirm", needs: false },
    "command-atk": { title: "Kommandogruppe", pick: "card", needs: true },
    "gassen-slot": { title: "Einsame Gassen", pick: "slot", needs: true }
  };

  global.DCEngine = {
    Engine, buildTestDeck, rng, shuffle, SECTIONS, ROWS, PENDING_META,
    pendingMeta: function (kind) {
      return PENDING_META[kind] || { title: "Auswahl", pick: "card", needs: true };
    }
  };
})(window); // nächster Schritt im Ablauf
