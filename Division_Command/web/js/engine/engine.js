/**
 * Regelmaschine von Division Command.
 *
 * Nur diese Datei entscheidet, was ein Zug bewirkt. Oberfläche, Netz und Bots
 * dürfen nur `createMatch`, `dispatch`, `getState`, `listActions` und wenige
 * Auskünfte (`currentAtkDef`, `legalAttackTargets`, `costOf`, `findInst`,
 * `kwMoveSlots`, `explainStats`) aufrufen. Export: `window.DCEngine`.
 *
 * Zusammenspiel: `tactical_runtime.js` und `doctrine_runtime.js` hängen
 * weitere Methoden am Prototyp ein; `victory_trophy.js` wertet den Trophy-Sieg
 * aus. Kartendaten kommen aus dem Katalog (`web/js/data/`).
 *
 * Zustand (`state`): Zugnummer, aktiver Spieler, beide Seiten mit Front
 * (L/C/R je drei Stellungen), Support, Hand, Deck, Friedhof, AP, SP.
 * `pending` hält eine offene Wahl (Stellung, Ziel, Münze). `events` speist
 * die Rundenübersicht.
 *
 * `dispatch({ type, player, ... })` führt genau eine Aktion aus oder liefert
 * `{ ok:false }`. Nach Erfolg liegt der neue Stand in `state`.
 *
 * Regelbezüge (Auswahl): Eingraben; Gegenschlag `survivor_only`;
 * Steilfeuer RULES §7.1; verdeckte Fallen RULES §12.1; Startspieler 5 AP (kein Abzug seit t257)
 * im ersten Zug (`opening_starter_ap_penalty`).
 */
(function (global) {
  'use strict';

  const SECTIONS = ['L', 'C', 'R'];
  const ROWS = [0, 1, 2];
  /**
   * Lineares Kongruenz-Zufallsmodul (LCG).
   * @param {number} seed Startwert; 0 wird zu 1.
   * @returns {function(): number} Generator, der Werte in [0, 1) liefert.
   */
  function rng(seed) {
    let s = (seed >>> 0) || 1;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }
  /** Platzhalter-ID für Karten, die der Betrachter im LAN nicht sehen darf (t283). */
  const HIDDEN_CARD_ID = 'dc_hidden';
  /** Platzhalter-Definition: keine Werte, keine Effekte, schwarze Rückseite. */
  const HIDDEN_CARD_DEF = Object.freeze({
    id: HIDDEN_CARD_ID, name: 'Verdeckte Karte', typ: 'Einheit', klasse: '', text: '', ap: 0, atk: 0, def: 1,
    rarity: 'bronze', tags: Object.freeze([]), effects: Object.freeze([]), keywords: Object.freeze([]), hidden: true,
  });
  /**
   * Fisher-Yates-Mischung einer Kopie, das Original bleibt unverändert.
   * @param {Array} arr Ausgangsliste
   * @param {function(): number} rand Zufall in [0, 1)
   * @returns {Array} Neue, gemischte Liste
   */
  /** Aktionen, die den Mulligan nicht schließen (Frieden, Aufgabe, Münzwurf-Bestätigung). */
  const MULLIGAN_NEUTRAL = Object.freeze({ PROPOSE_PEACE: true, ACCEPT_PEACE: true, CONCEDE: true, COIN_FLIP: true });

  function shuffle(arr, rand) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  /**
   * Kurzlebige Zufalls-ID (nicht die stabile Instanz-UID der Engine).
   * @param {string} prefix Präfix
   * @param {function(): number} rand Zufall
   * @returns {string}
   */
  function uid(prefix, rand) {
    return prefix + '-' + Math.floor(rand() * 1e9).toString(36);
  }
  /**
   * Kartenkatalog als Dictionary nach `id`.
   * @param {{cards: object[]}} catalog
   * @returns {Object<string, object>}
   */
  function catalogMap(catalog) {
    const m = {};
    catalog.cards.forEach((c) => { m[c.id] = c; });
    return m;
  }
  /**
   * Prüft Klasse, `klasse_tags` und `tags` einer Kartendefinition (Groß/Klein egal).
   * @param {object} card Katalogkarte
   * @param {string} tag Gesuchtes Schlagwort
   * @returns {boolean}
   */
  function hasTag(card, tag) {
    const t = (tag || '').toLowerCase();
    const bag = []
      .concat(card.klasse_tags || [])
      .concat(card.tags || [])
      .concat((card.klasse || '').split(','))
      .map((x) => String(x).trim().toLowerCase());
    return bag.some((x) => x === t || x.includes(t));
  }
  /**
   * True, wenn die Karte den Tag `infanterie` trägt.
   * @param {object} card
   * @returns {boolean}
   */
  function isInfantry(card) {
    return hasTag(card, 'infanterie');
  }
  /**
   * True bei Tag `gepanzert` oder `kette`.
   * @param {object} card
   * @returns {boolean}
   */
  function isArmored(card) {
    return hasTag(card, 'gepanzert') || hasTag(card, 'kette');
  }
  /**
   * True bei Tag `artillerie` oder Effekt `ATTACK_ANY_FRONT`.
   * @param {object} card
   * @returns {boolean}
   */
  function isArtillery(card) {
    return hasTag(card, 'artillerie') || (card.effects || []).some((x) => x.code === 'ATTACK_ANY_FRONT');
  }
  /**
   * Steilfeuer-Stufe I–V aus den Kartentags, sonst 0. Siehe RULES §7.1.
   * @param {object} card
   * @returns {number} 0–5
   */
  function steilfeuerLevel(card) {
    const tags = ((card && card.tags) || []).map((x) => String(x).toLowerCase());
    if (tags.includes('steilfeuer-v')) return 5;
    if (tags.includes('steilfeuer-iv')) return 4;
    if (tags.includes('steilfeuer-iii')) return 3;
    if (tags.includes('steilfeuer-ii')) return 2;
    if (tags.includes('steilfeuer-i')) return 1;
    return 0;
  }
  /**
   * Reichweite in Feldschritten für Steilfeuer I–III; IV/V nutzen die ganze Front (0 als Sentinel).
   * RULES §7.1.
   * @param {number} level
   * @returns {number}
   */
  function steilfeuerRange(level) {
    if (level === 1) return 3;
    if (level === 2) return 5;
    if (level === 3) return 7;
    return 0; // 4/5 = any front via ATTACK_ANY_FRONT / level check
  }
  /**
   * True bei Luft-/Luftschlag-/Flugzeug-Tags.
   * @param {object} card
   * @returns {boolean}
   */
  function isAir(card) {
    if (!card) return false;
    const bag = []
      .concat(card.klasse_tags || [])
      .concat(card.tags || [])
      .concat((card.klasse || '').split(','))
      .map((x) => String(x).trim().toLowerCase());
    return bag.some((x) => x === 'luft' || x === 'luftschlag' || x === 'flugzeug');
  }
  /**
   * Leere Front: Abschnitte L/C/R mit je drei leeren Stellungen.
   * @returns {object}
   */
  function emptyFront() {
    const f = {};
    SECTIONS.forEach((s) => {
      f[s] = [null, null, null];
    });
    return f;
  }
  /**
   * Gegenüberliegender Abschnitt. In diesem Regelstand liegt L/C/R jeweils sich selbst gegenüber.
   * @param {string} section `L`|`C`|`R`
   * @returns {string}
   */
  function opposite(section) {
    return section;
  }
  /**
   * Unmittelbar benachbarte Abschnitte (L↔C, C↔L/R, R↔C).
   * @param {string} section
   * @returns {string[]}
   */
  function adjacentSections(section) {
    if (section === 'C') return ['L', 'R'];
    if (section === 'L') return ['C'];
    return ['C'];
  }
  /**
   * Tiefe Kopie über JSON (kein Datum, keine Funktionen).
   * @param {*} o
   * @returns {*}
   */
  function clone(o) {
    return JSON.parse(JSON.stringify(o));
  }

  class Engine {
    
    // --- Partie-Objekt, Instanzen und Start ---
/**
     * Lädt den Katalog, mercht Regeln und setzt den Zufallsgenerator. Noch keine Partie — erst `createMatch`.
     * @param {object} catalog Kartenkatalog inkl. `rules`
     * @param {object} [options] `seed`, `rules` (überschreiben Katalogregeln)
     */
    constructor(catalog, options) {
      this.catalog = catalog;
      this.byId = catalogMap(catalog);
      if (!this.byId[HIDDEN_CARD_ID]) this.byId[HIDDEN_CARD_ID] = HIDDEN_CARD_DEF;
      this.rules = Object.assign({}, catalog.rules, (options && options.rules) || {});
      this.rand = rng((options && options.seed) || Date.now());
      this.log = [];
      this._uid = 0;
      this.state = null;
    }
    /**
     * Nächste stabile Instanz-ID dieser Partie (laufender Zähler, nicht der LCG).
     * @param {string} prefix z. B. `c`
     * @returns {string}
     */
    nextId(prefix) {
      this._uid += 1;
      return prefix + '-' + this._uid;
    }
    /**
     * Erzeugt eine Spielinstanz aus einer Katalog-ID. Wirft bei unbekannter Karte.
     * @param {string} cardId
     * @param {number} owner Spielerindex 0|1
     * @returns {object} Instanz mit uid, Werten, leeren attachments/flags
     * @throws {Error} unbekannte Karte
     */
    instFromId(cardId, owner) {
      const def = this.byId[cardId];
      if (!def) throw new Error('unknown card ' + cardId); // Regelverstoß, Zug ungültig
      return {
        uid: this.nextId('c'),
        cardId: def.id,
        owner,
        facedown: false, // verdeckte Lage
        atk: def.atk,
        def: def.def,
        defMax: def.def,
        attachments: [],
        tokens: [],
        flags: {},
        summonedTurn: 0,
        tapped: false,
        attackUsed: false,
      };
    }
    /**
     * Katalogdefinition zur Instanz (`cardId`).
     * @param {object} inst
     * @returns {object|undefined}
     */
    defOf(inst) {
      return this.byId[inst.cardId];
    }
    /**
     * Prüft Deck und Doktrinen über `DC_validateDeck`, falls vorhanden, und korrigiert IDs.
     * Seiteneffekt: keine Änderung am Partiestand; nur Rückgabe.
     * @param {string[]} deckIds
     * @param {string[]} doctrineIds
     * @param {string} [label] Präfix für Hinweise
     * @returns {{deckIds: string[], doctrineIds: string[], notices: string[], ok?: boolean}}
     */
    _normalizeDeckInput(deckIds, doctrineIds, label) {
      const validate = (typeof globalThis !== 'undefined' && globalThis.DC_validateDeck)
        || (typeof window !== 'undefined' && window.DC_validateDeck)
        || null;
      if (!validate) {
        return { deckIds: (deckIds || []).slice(), doctrineIds: (doctrineIds || []).slice(0, 2), notices: [] };
      }
      const res = validate(deckIds || [], doctrineIds || [], this.catalog);
      const notices = (res.notices || []).map((n) => (label ? (label + ': ' + n) : n));
      return {
        deckIds: res.fixedIds || (deckIds || []).slice(),
        doctrineIds: res.doctrineIds || (doctrineIds || []).slice(0, 2),
        notices,
        ok: !!res.ok,
      };
    }
    /**
     * Legt eine neue Partie an: zwei Spieler, gemischte Decks, Starthand, Zug 1.
     * Beide Spieler haben im ersten Zug 5 AP (`opening_starter_ap_penalty`, Standard 0 seit t257). Ausgleich: Der Startspieler zieht in Zug 1 keine Karte, der Zweite zieht zu Beginn seines ersten Zuges 1.
     * Optionaler Münzwurf (`opening_coin`) bestimmt den Startspieler. Überschreibt `this.state`.
     * @param {object} opts `deck0/1`, `doctrine0/1`, `name0/1`, `mode`, `seed`, `startPlayer`, …
     * @returns {object} `this.state`
     */
    createMatch(opts) { // Partie mit zwei Spielern anlegen
      const n0 = this._normalizeDeckInput(opts.deck0, opts.doctrine0, opts.name0 || 'Spieler A');
      const n1 = this._normalizeDeckInput(opts.deck1, opts.doctrine1, opts.name1 || 'Spieler B');
      const p0 = this._makePlayer(0, n0.deckIds, n0.doctrineIds, opts.name0); // Doktrin
      const p1 = this._makePlayer(1, n1.deckIds, n1.doctrineIds, opts.name1); // Doktrin
      this.state = {
        version: '0.25',
        seed: (opts && opts.seed) || 0,
        mode: opts.mode || 'hotseat',
        turn: 1,
        active: 0,
        phase: 'main',
        winner: null,
        endReason: null,
        peaceOffer: null,
        stack: [],
        pending: null, // offene Wahl des Spielers
        events: [],
        players: [p0, p1],
        tokensOnBoard: [],
        seq: 0,
        deckNotices: n0.notices.concat(n1.notices),
        startCoin: null,
      };
      // Opening coin toss (all modes). Deterministic from engine RNG/seed → LAN host seed syncs both clients.
      // opts.startPlayer 0|1 overrides (tests / host force). rules.opening_coin === false disables.
      let startPid = 0;
      let startCoin = null;
      if (opts && (opts.startPlayer === 0 || opts.startPlayer === 1)) {
        startPid = opts.startPlayer;
        startCoin = { face: startPid === 0 ? 'kopf' : 'zahl', winner: startPid, forced: true };
      } else if (this.rules.opening_coin !== false) {
        const face = this.rand() < 0.5 ? 'kopf' : 'zahl';
        startPid = face === 'kopf' ? 0 : 1;
        startCoin = { face: face, winner: startPid, forced: false };
      }
      this.state.active = startPid;
      this.state.startCoin = startCoin;
      this._draw(p0, this.rules.hand_start); // Karten vom Deck auf die Hand
      this._draw(p1, this.rules.hand_start); // Karten vom Deck auf die Hand
      const starter = this.player(startPid);
      // Startspieler-Abzug nur im ersten Zug (`opening_starter_ap_penalty`, Default 0 seit t257, vorher 2). Spätere Züge normal via _actEnd.
      const apFull = Number(this.rules.ap_per_turn || 5);
      const pen = Number(this.rules.opening_starter_ap_penalty);
      const starterPen = (this.rules.opening_starter_ap_penalty === false || this.rules.opening_starter_ap_penalty === 0)
        ? 0
        : (isFinite(pen) && pen >= 0 ? pen : 0);
      const starterAp = Math.max(0, apFull - starterPen);
      starter.ap = starterAp;
      if (startCoin) {
        startCoin.starterApFirst = starterAp;
        startCoin.apPenalty = starterPen;
      }
      this.state.starterFirstTurnAp = starterAp;
      if (startCoin && !startCoin.forced) {
        const faceDe = startCoin.face === 'zahl' ? 'Zahl' : 'Kopf';
        this._log('Münzwurf (' + faceDe + '): ' + starter.name + ' beginnt (' + starterAp + ' AP im ersten Zug).');
        this._evt('coin', null, 'Münzwurf: ' + starter.name + ' beginnt — ' + starterAp + ' AP im ersten Zug', {
          face: startCoin.face, winner: startPid, name: starter.name, starterApFirst: starterAp
        });
      } else {
        this._log('Partie beginnt — ' + starter.name + ' ist am Zug (' + starterAp + ' AP im ersten Zug).');
      }
      this._log('Startspieler ' + starterAp + ' AP im ersten Zug, danach ' + apFull + ' AP/Zug. Front 3×3.');
      (this.state.deckNotices || []).forEach((msg) => {
        this._log('Deckregel: ' + msg + ' — überzählige Kopien entfernt.');
        this._evt('shout', null, 'Deckregel: ' + msg);
      });
      return this.getState(); // Stand kopieren
    }
    /**
     * Baut das Spielerobjekt: gemischtes Deck, Doktrinen, leere Front/Support, Startressourcen.
     * @param {number} id 0|1
     * @param {string[]} deckIds
     * @param {string[]} doctrineIds
     * @param {string} name
     * @returns {object}
     */
    _makePlayer(id, deckIds, doctrineIds, name) { // Doktrin
      const deckDefs = (deckIds || []).filter((cid) => this.byId[cid] && this.byId[cid].typ !== 'Doktrin' && this.byId[cid].typ !== 'Token' && this.byId[cid].typ !== 'Asset');

      const deck = shuffle(deckDefs.map((cid) => this.instFromId(cid, id)), this.rand);
      const doctrines = (doctrineIds || []).map((cid) => this.instFromId(cid, id)); // Doktrin
      return {
        id,
        flags: {},
        name: (name && String(name).trim()) || (id === 0 ? 'Spieler A' : 'Spieler B'),
        ap: this.rules.ap_per_turn,
        apBank: 0,
        vp: 0,
        doctrines, // Doktrin
        deck,
        hand: [], // Handkarten
        grave: [], // Friedhof
        support: new Array(this.rules.support_slots || 18).fill(null), // Unterstützungszone
        front: emptyFront(),
        nml: emptyFront(),
        operations: [],
        delayed: [],
      };
    }
    /**
     * Abzug des aktuellen Stands für UI und LAN (tiefe Kopie). Keine Regelprüfung.
     * @returns {object}
     */
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
    /**
     * Spielstand aus Sicht eines Spielers (LAN, t283): Hand, Deck und verdeckte Karten des Gegners
     * werden durch Platzhalter mit Decknamen-UIDs ersetzt; offene Wahlen des Gegners verlieren ihre Optionen;
     * Ereignisse zu verborgenen Karten verlieren Name und Bild. Der Host-Stand selbst bleibt unverändert.
     * Rückübersetzung eingehender Aktionen: `resolveAliases`.
     * @param {number} viewer 0|1 (Betrachter); andere Werte liefern den vollen Stand
     * @returns {object}
     */
    getStateFor(viewer) {
      const st = this.getState();
      if ((viewer !== 0 && viewer !== 1) || !st || !st.players || !st.players[1 - viewer]) return st;
      const oppId = 1 - viewer;
      const opp = st.players[oppId];
      const A = this._aliases || (this._aliases = { fwd: {}, back: {}, pub: {}, n: 0 });
      const hiddenNow = {};
      /** Deckname für eine verborgene UID; neu, wenn die Karte zuvor offen sichtbar war. */
      const alias = (uid) => {
        if (!uid) return uid;
        if (!A.fwd[uid] || A.pub[uid]) {
          if (A.fwd[uid]) delete A.back[A.fwd[uid]];
          A.n += 1;
          A.fwd[uid] = 'v-' + A.n;
          A.back[A.fwd[uid]] = uid;
          delete A.pub[uid];
        }
        hiddenNow[uid] = A.fwd[uid];
        return A.fwd[uid];
      };
      /** Ersetzt eine Instanz durch einen Platzhalter ohne Kartenidentität. */
      const mask = (c) => (c ? {
        uid: alias(c.uid), cardId: HIDDEN_CARD_ID, owner: c.owner, facedown: true, hidden: true,
        atk: 0, def: 1, defMax: 1, attachments: (c.attachments || []).map(mask), tokens: c.tokens || [], flags: {},
        summonedTurn: c.summonedTurn || 0, tapped: !!c.tapped, attackUsed: !!c.attackUsed,
      } : c);
      opp.hand = (opp.hand || []).map(mask);
      opp.deck = (opp.deck || []).map(mask);
      opp.support = (opp.support || []).map((c) => (c && c.facedown ? mask(c) : c));
      ['front', 'nml'].forEach((zone) => {
        const z = opp[zone];
        if (!z) return;
        Object.keys(z).forEach((sec) => { z[sec] = (z[sec] || []).map((c) => (c && c.facedown ? mask(c) : c)); });
      });
      // Offen sichtbare UIDs merken: wandern sie später in eine verdeckte Zone, bekommen sie einen neuen Decknamen.
      const markPub = (c) => { if (c && c.uid && !c.hidden) A.pub[c.uid] = 1; };
      st.players.forEach((p) => {
        (p.grave || []).forEach(markPub); (p.support || []).forEach(markPub);
        ['front', 'nml'].forEach((zone) => { const z = p[zone]; if (z) Object.keys(z).forEach((sec) => (z[sec] || []).forEach(markPub)); });
      });
      (st.players[viewer].hand || []).forEach(markPub);
      const pend = st.pending;
      if (pend && typeof pend.player === 'number' && pend.player !== viewer) {
        if (Array.isArray(pend.choices)) pend.choices = pend.choices.map(() => ({ hidden: true }));
      } else if (pend && Array.isArray(pend.choices)) {
        pend.choices.forEach((c) => { if (c && hiddenNow[c.target]) { c.target = hiddenNow[c.target]; } });
      }
      (st.events || []).forEach((ev) => {
        const secret = (ev.uid && hiddenNow[ev.uid]) || (ev.kind === 'draw' && ev.owner === oppId)
          || (ev.actor === oppId && /verdeckt/i.test(ev.text || ''));
        if (!secret) return;
        ev.cardId = null; ev.image = null; ev.name = null;
        if (ev.uid) ev.uid = hiddenNow[ev.uid] || null;
      });
      return st;
    }
    /**
     * Protokoll aus Sicht eines Spielers: Zeilen mit `extra.secret` des Gegners zeigen nur `extra.pub`.
     * @param {number} viewer 0|1
     * @param {number} [n] nur die letzten n Zeilen
     * @returns {object[]}
     */
    logFor(viewer, n) {
      const src = n ? this.log.slice(-n) : this.log.slice();
      return src.map((l) => {
        const ex = l && l.extra;
        if (ex && typeof ex.secret === 'number' && ex.secret !== viewer) return { t: l.t, a: l.a, msg: ex.pub || 'Verdeckte Aktion.', extra: null };
        return l;
      });
    }
    /**
     * Übersetzt Decknamen-UIDs (`v-…` aus `getStateFor`) in einer eingehenden Aktion zurück in echte UIDs.
     * Unbekannte Werte bleiben unverändert; die Aktion wird tief kopiert.
     * @param {object} action
     * @returns {object}
     */
    resolveAliases(action) {
      const back = (this._aliases && this._aliases.back) || {};
      const walk = (v) => {
        if (typeof v === 'string') return Object.prototype.hasOwnProperty.call(back, v) ? back[v] : v;
        if (Array.isArray(v)) return v.map(walk);
        if (v && typeof v === 'object') { const o = {}; Object.keys(v).forEach((k) => { o[k] = walk(v[k]); }); return o; }
        return v;
      };
      return walk(action);
    }
    /**
     * Hängt eine Protokollzeile an (wird auf 400 Einträge gekürzt).
     * @param {string} msg
     * @param {object} [extra]
     */
    _log(msg, extra) { // Zeile ins Protokoll
      this.log.push({ t: this.state ? this.state.turn : 0, a: this.state ? this.state.active : 0, msg, extra: extra || null });

      if (this.log.length > 400) this.log.shift();
    }
    /**
     * Sichtbares Ereignis für die Rundenübersicht und das Protokoll.
     * @param {string} kind
     * @param {object|null} def
     * @param {string} text
     * @param {object} [extra]
     * @returns {object} Das angehängte Ereignis
     */
    _evt(kind, def, text, extra) {
      if (this._cmTrack) this._cmTrack(kind, def);
      if (this.state && this.state._muteEvents) return;
      if (!this.state.events) this.state.events = [];
      this.state.events.push({
        turn: this.state.turn,
        actor: this.state.active,
        kind,
        cardId: def && def.id,
        image: def && def.image,
        name: def && def.name,
        text: text || '',
        owner: extra && extra.owner,
        uid: extra && extra.uid
      });
      if (this.state.events.length > 80) this.state.events.splice(0, this.state.events.length - 80);
      if (text) this._log(text); // Zeile ins Protokoll
    }
    /**
     * Spieler 0 oder 1.
     * @param {number} id
     * @returns {object}
     */
    player(id) {
      return this.state.players[id];
    }
    /**
     * Der jeweils andere Spieler.
     * @param {number} id
     * @returns {object}
     */
    opponent(id) {
      return this.state.players[id === 0 ? 1 : 0];
    }
    /**
     * Mischt eine Liste in-place mit dem Partie-Zufall.
     * @param {Array} arr
     * @returns {Array} dieselbe Liste
     */
    _shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(this.rand() * (i + 1));
        const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
      }
    }
    /**
     * Zieht `n` Karten auf die Hand (Limit 10). Leeres Deck löst Friedhof-Nachmischen aus.
     * @param {object} p Spieler
     * @param {number} n
     * @returns {object[]} gezogene Instanzen
     */
    _draw(p, n) { // Karten vom Deck auf die Hand
      for (let i = 0; i < n; i++) {
        if (!p.deck.length) this._reshuffle(p);
        if (!p.deck.length) break;
        const c = p.deck.shift();
        if (p.hand.length >= (this.rules.max_hand || 7)) { // Handkarten
          p.grave.push(c); // Friedhof
          this._log(p.name + ' wirft ' + this.defOf(c).name + ' ab (Hand voll).'); // Zeile ins Protokoll
        } else {
          p.hand.push(c);
          this._evt('draw', this.defOf(c), p.name + ' zieht eine Karte.', { owner: p.id, uid: c.uid });
        }
      }
    }
    /**
     * Mischt den Friedhof zurück ins Deck (ohne Tokencards je nach Regeln).
     * @param {object} p
     */
    _reshuffle(p) {
      if (!p.grave.length) return; // Friedhof
      this._log(p.name + ': Friedhof wird gemischt — der Kampf endet nicht.'); // Zeile ins Protokoll
      p.deck = shuffle(p.grave, this.rand); // Friedhof
      p.grave = []; // Friedhof
    }
    /**
     * Sucht eine Instanz auf Front, Support, Hand, Deck, Friedhof beider Spieler.
     * @param {string} uid
     * @returns {{inst: object, loc: object}|null} Fundort inkl. Zone/Abschnitt/Index
     */
    findInst(uid) {
      for (const p of this.state.players) {
        for (const s of SECTIONS) {
          for (let r = 0; r < 3; r++) {
            const u = p.front[s][r];
            if (u && u.uid === uid) return { inst: u, player: p, zone: 'front', section: s, row: r };
            const tok = p.nml && p.nml[s] && p.nml[s][r];
            if (tok && tok.uid === uid) return { inst: tok, player: p, zone: 'nml', section: s, row: r };
            if (u) {
              for (const a of u.attachments) {
                if (a.uid === uid) return { inst: a, player: p, zone: 'equip', host: u, section: s, row: r };
              }
            }
          }
        }
        for (let i = 0; i < (p.operations || []).length; i++) {
          const u = p.operations[i];
          if (u && u.uid === uid) return { inst: u, player: p, zone: 'operations', index: i };
        }
        for (let i = 0; i < p.support.length; i++) { // Unterstützungszone
          const u = p.support[i]; // Unterstützungszone
          if (u && u.uid === uid) return { inst: u, player: p, zone: 'support', index: i }; // Unterstützungszone
          if (u) {
            for (const a of (u.attachments || [])) {
              if (a.uid === uid) return { inst: a, player: p, zone: 'equip', host: u, supportIndex: i };
            }
          }
          if (u && u.flags && u.flags.patient && u.flags.patient.uid === uid) return { inst: u.flags.patient, player: p, zone: 'patient', host: u, index: i };
        }
        for (const u of p.hand) if (u.uid === uid) return { inst: u, player: p, zone: 'hand' }; // Handkarten
        for (const u of p.doctrines) if (u.uid === uid) return { inst: u, player: p, zone: 'doctrine' }; // Doktrin
      }
      return null;
    }
    /**
     * Ob die Instanz für den Spieler in diesem Zug handeln darf (Besitz, Phase, nicht erschöpft/gesperrt).
     * Berücksichtigt u. a. Eingraben und `noCombatUntil`.
     * @param {object} inst
     * @param {number} pid
     * @returns {boolean}
     */
    _canAct(inst, pid) {
      if (!inst) return false;
      if (this._tacBlockedAttack && this._tacBlockedAttack(inst)) return false;
      const def = this.defOf(inst);
      if (!def) return false;
      if (def.typ === 'Doktrin') return true;
      if (inst.flags && inst.flags.exhausted) return false;
      if (inst.flags && inst.flags.paused) return false;
      // Finte o.ä.: noCombatUntil === aktueller Zug sperrt Aktion; Eingraben nutzt turn+1 und filtert nur Ziele.
      if (inst.flags && inst.flags.noCombatUntil === this.state.turn && !inst.flags.digInBonus) return false;
      if (inst.attackUsed) return false;
      if (inst.summonedTurn != null && inst.summonedTurn >= this.state.turn && !(inst.summonedTurn === this.state.turn && this._kw(inst, 'Gefechtsbereit'))) return false;
      if (inst.flags && inst.flags.kwNoAtkTurn === this.state.turn) return false;
      if (inst.summonedTurn === this.state.turn - 1 && this.state.active !== inst.owner) return false;
      return pid == null || inst.owner === pid;
    }

    /* Eingraben / deploy_protection (default ON): frisch gelegt offen,
       unangreifbar bis zum Start des nächsten eigenen Zugs
       (noCombatUntil = turn+1 → geschützt solange state.turn <= until),
       plus +1 DEF. Blockiert Einheitenangriffe und gezielte Effekte;
       Flächen-/Massenschaden trifft weiterhin. */
    _isDeployProtected(inst) {
      if (!inst || !inst.flags) return false;
      const until = inst.flags.noCombatUntil;
      if (until == null) return false;
      return this.state.turn <= until;
    }
    /**
     * Setzt die Eingraben-Marke auf eine soeben eingesetzte Karte.
     * @param {object} card
     */
    _applyDeployProtection(card) {
      if (!this.rules.deploy_protection || !card) return;
      card.flags = card.flags || {};
      card.facedown = false; // Schutz zeigt offene Karte + Schild, nie verdeckt
      card.flags.noCombatUntil = this.state.turn + 1;
      card.flags.digInUntil = this.state.turn + 1;
      card.def = (card.def == null ? 0 : card.def) + 1;
      card.defMax = (card.defMax == null ? card.def : card.defMax) + 1;
      card.flags.digInBonus = 1;
    }
    /**
     * True, wenn die Instanz als feindliches Einzelziel gesperrt ist (Eingraben o. ä.).
     * @param {object} inst
     * @returns {boolean}
     */
    _hostileTargetBlocked(inst) {
      return this._isDeployProtected(inst);
    }
    /**
     * Niemandsland-Inhalt an Abschnitt/Reihe, oder null.
     * @param {object} p
     * @param {string} section
     * @param {number} row
     * @returns {object|null}
     */
    nmlAt(p, section, row) {
      if (!p.nml || !p.nml[section]) return null;
      return p.nml[section][row] || null;
    }
    /**
     * Fortifikations-Bonus des Besitzers.
     * @param {object} owner
     * @returns {number}
     */
    _fortValueBonus(owner) {
      return this._hasDoctrine(owner, 'BOLLWERK_TOKEN_PLUS') ? 1 : 0;
    }
    /**
     * True, wenn die Stellung Deckung hat.
     * @param {object} p
     * @param {string} section
     * @param {number} row
     * @returns {boolean}
     */
    _hasCover(p, section, row) {
      const tok = this.nmlAt(p, section, row);
      if (tok) return true;
      return (p.support || []).some((s) => s && hasTag(this.defOf(s), 'befestigung'));
    }
    /**
     * Alle Fronteinheiten des Spielers als Liste mit Fundort.
     * @param {object} p
     * @returns {object[]}
     */
    frontList(p) {
      const out = [];
      SECTIONS.forEach((s) => {
        ROWS.forEach((r) => {
          const u = p.front[s][r];
          if (u) out.push({ inst: u, section: s, row: r });
        });
      });
      return out;
    }
    /**
     * Leere Frontstellungen des Spielers.
     * @param {object} p
     * @returns {object[]}
     */
    emptySlots(p) {
      const out = [];
      SECTIONS.forEach((s) => {
        ROWS.forEach((r) => {
          if (!p.front[s][r]) out.push({ section: s, row: r });
        });
      });
      return out;
    }
    /**
     * True, wenn die Definition eine Stellung (kein wandelbares Token) ist.
     * @param {object} def
     * @returns {boolean}
     */
    _istStellung(def) {
      if (hasTag(def, 'stellung') || hasTag(def, 'artillerie')) return def.name !== 'Festungsanlage';
      return false;
    }
    
    // --- Kosten, Auren und aktuelle Kampfwerte ---
/**
     * Effektive AP-Kosten einer Karte oder Aktion inkl. Auren, Rabatte und einmaliger Nachlässe.
     * @param {object} def Kartendefinition
     * @param {object} player
     * @param {string} [kind] Spielart (`play`, `attack`, …)
     * @param {object} [inst] konkrete Instanz
     * @param {boolean} [consume] einmalige Rabatte verbrauchen
     * @returns {number}
     */
    costOf(def, player, kind, inst, consume) {
      if (inst && inst.flags && inst.flags.freePlayOnTurn === this.state.turn) return 0;
      if (player && player.flags && player.flags.infLostTurn === this.state.turn && this._defHas(def, 'PLAY_FREE_IF_INFANTRY_DESTROYED')) return 0;
      let cost = Number(def.ap || 0);
      if (def.typ === 'Ausrüstung') cost = Number(def.ap || 0) + Number(this.rules.equip_ap_test || 0);
      if (player) this._auras(player).forEach((a) => {
        if (a.code === 'AURA_COST_MOD' && a.param) {
          const filter = String(a.param.filter || '').toLowerCase();
          const ok =
            !filter ||
            filter === 'front_unit' && def.typ === 'Einheit' ||
            filter.includes('infanterie') && isInfantry(def) ||
            filter.includes('unterstuetzung') && def.typ === 'Unterstützung' ||
            filter.includes('all');
          if (ok) cost += Number(a.param.delta || 0);
        }
      });
      if (def.typ === 'Ausrüstung' && player) {
        const n = (player.support || []).filter((s) => s && this._defHas(this.defOf(s), 'EQUIP_DISCOUNT')).length;
        cost -= n;
        const selfFx = def.effects || [];
        selfFx.forEach((e) => {
          if (e.code === 'EQUIP_STAT' && e.param && e.param.costReduce) {
            if (e.param.ifSupportSection) {
              if (this._hasOwnSupport(player)) cost -= Number(e.param.costReduce || 1);
            } else cost -= Number(e.param.costReduce || 1);
          }
        });
        cost += this._cmCost(def, player);
      }
      if (def.typ === 'Einheit' && player) {
        const n = (player.support || []).filter((s) => s && this._defHas(this.defOf(s), 'UNIT_DISCOUNT')).length;
        cost -= n;
        cost += this._cmCost(def, player);
        const ip = player.flags && player.flags.infPlayed;
        if (ip && ip.turn === this.state.turn && ip.uids.length) (def.effects || []).forEach((e) => { if (e.code === 'COST_REDUCE_IF_INFANTRY_PLAYED') cost -= Number((e.param || {}).delta || 1); });
      }
      if (player && player.flags && player.flags.costNext && player.flags.costNext.length) {
        const want = def.typ === 'Soforteinsatz' ? 'Soforteinsatz'
          : def.typ === 'Ausrüstung' ? 'Ausrüstung'
          : (def.typ === 'Infanterie' || isInfantry(def)) ? 'Infanterie'
          : 'Einheit';
        const ix = player.flags.costNext.findIndex((c) => c.type === want || (c.type === 'Einheit' && want !== 'Soforteinsatz' && want !== 'Ausrüstung'));
        if (ix >= 0) {
          const red = Number(player.flags.costNext[ix].amount || 1);
          cost = Math.max(want === 'Soforteinsatz' ? 0 : 1, cost - red);
          if (consume) player.flags.costNext.splice(ix, 1);
        }
      }
      if (player && player.flags && player.flags.tacticDiscount && def.typ !== 'Soforteinsatz') {
        cost -= 1;
      }
      if (player && def.typ === 'Soforteinsatz') cost -= this._equipDiscountAura(player, def.typ);
      // Ladungsliste etc.: allow 0 when explicit costReduce applied
      const floor = (def.typ === 'Ausrüstung' && (def.effects || []).some((e) => (e.code === 'EQUIP_STAT' && e.param && e.param.costReduce) || (e.code === 'CM' && e.param && e.param.k === 'cost'))) ? 0 : 1;
      if (def.typ === 'Soforteinsatz') return Math.max(0, cost);
      // Schlüsselwort Heranführung: nächste Einheit in diesem Zug 1 AP weniger (mind. 1); verbraucht beim Auslegen.
      if (def.typ === 'Einheit' && player && player.flags && player.flags.kwHeran === this.state.turn && cost > 1) cost -= 1;
      return Math.max(floor, cost);
    }
    /**
     * Aktive Unterstützungsauren des Spielers.
     * @param {object} player
     * @returns {object[]}
     */
    _auras(player) {
      const list = [];
      if (!player) return list;
      const add = (inst) => {
        if (!inst) return;
        const def = this.defOf(inst);
        if (!def) return;
        (def.effects || []).forEach((e) => {
          if (e.code === 'AURA_STAT' || e.code === 'AURA_COST_MOD') list.push({ code: e.code, param: e.param, source: inst });

        });
      };
      player.doctrines.forEach(add); // Doktrin
      player.support.forEach(add); // Unterstützungszone
      this.frontList(player).forEach((x) => add(x.inst));
      return list;
    }
    /**
     * True, wenn der Spieler mindestens eine Unterstützung ausliegt.
     * @param {object} p
     * @returns {boolean}
     */
    _hasOwnSupport(p) {
      return !!(p && (p.support || []).some((x) => x));
    }
    /**
     * True bei Elite-Klasse oder -Tag (Trägerfilter, z. B. Vertragsclip).
     * @param {object} def
     * @returns {boolean}
     */
    _isElite(def) {
      return !!(def && (hasTag(def, 'elite') || def.typ === 'Elite' || def.klasse === 'Elite'));
    }
    /**
     * Summe der Ausrüstungs-Auren `EQUIP_DISCOUNT_AURA` auf legalen Trägern des Spielers.
     * Vertragsclip: nur Elite oder Unterstützung, typischerweise Soforteinsatz −1.
     * @param {object} player
     * @param {string} typ
     * @returns {number}
     */
    _equipDiscountAura(player, typ) {
      if (!player) return 0;
      let n = 0;
      const take = (host, zone) => {
        if (!host) return;
        const hd = this.defOf(host);
        (host.attachments || []).forEach((eq) => {
          (this.defOf(eq).effects || []).forEach((e) => {
            if (e.code !== 'EQUIP_DISCOUNT_AURA') return;
            const want = String((e.param && e.param.type) || 'Soforteinsatz');
            if (want && typ && want !== typ) return;
            if (zone === 'support' || this._isElite(hd)) n += Number((e.param && e.param.amount) || 1);
          });
        });
      };
      this.frontList(player).forEach((l) => take(l.inst, 'front'));
      (player.support || []).forEach((s) => take(s, 'support'));
      return n;
    }
    /**
     * Trägerliste für eine Ausrüstung inkl. Elite/Unterstützungs-Filter (Vertragsclip).
     * @param {object} p
     * @param {object} def
     * @returns {{inst: object, zone: string, label: string}[]}
     */
    _equipHostChoices(p, def) {
      const fx = (def.effects || []).find((x) => x.code === 'EQUIP_DISCOUNT_AURA')
        || (def.effects || []).find((x) => x.param && x.param.only);
      let only = fx && fx.param && fx.param.only ? String(fx.param.only) : '';
      if (!only && fx && fx.code === 'EQUIP_DISCOUNT_AURA') only = 'elite|unterstuetzung';
      const parts = only ? only.split('|') : [];
      const allow = (hd, kind) => {
        if (!parts.length) return kind === 'front';
        return parts.some((o) => {
          if (o === 'infanterie') return kind === 'front' && isInfantry(hd);
          if (o === 'panzer') return kind === 'front' && (hasTag(hd, 'panzer') || hd.typ === 'Panzer');
          if (o === 'artillerie') return kind === 'front' && (isArtillery(hd) || hd.typ === 'Artillerie');
          if (o === 'aufklaerung') return kind === 'front' && (hd.typ === 'Aufklärung' || hasTag(hd, 'aufklaerung'));
          if (o === 'elite') return kind === 'front' && this._isElite(hd);
          if (o === 'unterstuetzung' || o === 'unterstützung') return kind === 'support';
          return kind === 'front' && (hasTag(hd, o) || hd.typ === o);
        });
      };
      const out = [];
      this.frontList(p).forEach((h) => {
        if (allow(this.defOf(h.inst), 'front')) {
          out.push({ inst: h.inst, zone: 'front', label: this.defOf(h.inst).name });
        }
      });
      (p.support || []).forEach((s) => {
        if (s && !s.facedown && allow(this.defOf(s), 'support')) {
          out.push({ inst: s, zone: 'support', label: this.defOf(s).name });
        }
      });
      return out;
    }
    /**
     * True, wenn Blitzkrieg die Sonderfähigkeiten der Unterstützung dieses Spielers sperrt.
     * @param {number} pid
     * @returns {boolean}
     */
    _supportLocked(pid) {
      const p = this.player(pid);
      return !!(p && p.flags && p.flags.blitzLock > 0);
    }
    /**
     * True, wenn die aktuelle DEF unter der Maximal-DEF liegt.
     * @param {object} inst
     * @returns {boolean}
     */
    _isDamaged(inst) {
      if (!inst || inst.def == null) return false;
      const max = inst.defMax != null ? inst.defMax : (Number((this.defOf(inst) || {}).def) || 0);
      return inst.def < max;
    }
    /**
     * Deckt eine verdeckte Instanz auf und löst Folgeeffekte aus.
     * @param {object} inst
     * @param {object} [opts]
     * @returns {void}
     */
    _revealInst(inst, opts) {
      if (!inst) return false;
      const was = !!inst.facedown;
      inst.facedown = false;
      if (!was) return false;
      inst.flags = inst.flags || {};
      inst.flags.revealedTurn = this.state.turn;
      this._onUnitRevealed(inst, opts || {});
      return true;
    }
    /**
     * Nach dem Aufdecken: Trigger und Marken (beobachtet etc.).
     * @param {object} inst
     * @param {object} [opts]
     */
    _onUnitRevealed(inst, opts) {
      const loc = this.findInst(inst.uid);
      if (!loc || loc.zone !== 'front') return;
      const owner = loc.player;
      // Melderband: +DEF after own reveal this turn
      (inst.attachments || []).forEach((eq) => {
        (this.defOf(eq).effects || []).forEach((e) => {
          const p = e.param || {};
          if (e.code === 'EQUIP_AFTER_REVEAL_DEF' && !(eq.flags && eq.flags.revealDefUsed === this.state.turn)) {
            const dv = Number(p.def || 1);
            inst.def = (inst.def || 0) + dv;
            inst.defMax = (inst.defMax || inst.def) + dv;
            eq.flags = eq.flags || {};
            eq.flags.revealDefUsed = this.state.turn;
            this._log(this.defOf(eq).name + ': +' + dv + ' DEF nach Aufdecken.');
          }
          if (e.code === 'EQUIP_ON_REVEAL_ATK') {
            inst.flags.tempAtk = (inst.flags.tempAtk || 0) + Number(p.atk || 1);
            inst.flags.tempAtkUntil = this.state.turn;
            this._log(this.defOf(eq).name + ': +' + (p.atk || 1) + ' ATK bis Zugende (Aufdecken).');
          }
        });
      });
      // Lagezeichen on any unit in same section: facedown unit here gets +DEF when revealed
      this.frontList(owner).forEach((l) => {
        if (l.section !== loc.section) return;
        (l.inst.attachments || []).forEach((eq) => {
          (this.defOf(eq).effects || []).forEach((e) => {
            if (e.code !== 'EQUIP_REVEAL_ALLY_DEF') return;
            if (eq.flags && eq.flags.allyRevealUsed === this.state.turn) return;
            if (l.inst.uid === inst.uid && !(opts && opts.fromLage)) {
              // applies to a facedown unit being revealed in section — including self if was facedown
            }
            const dv = Number((e.param || {}).def || 1);
            inst.def = (inst.def || 0) + dv;
            inst.defMax = (inst.defMax || inst.def) + dv;
            eq.flags = eq.flags || {};
            eq.flags.allyRevealUsed = this.state.turn;
            this._log(this.defOf(eq).name + ': +' + dv + ' DEF beim Aufdecken hier.');
          });
        });
      });
    }
    /**
     * Wendet bedingte DEF-Boni ausliegender Unterstützungen an.
     * @param {object} p
     */
    _applySupportCondDef(p) {
      this.frontList(p).forEach((l) => {
        let want = 0;
        (l.inst.attachments || []).forEach((eq) => {
          (this.defOf(eq).effects || []).forEach((e) => {
            if (e.code === 'EQUIP_COND_DEF' && e.param && e.param.ifSupport && this._hasOwnSupport(p)) {
              want += Number(e.param.def || 1);
            }
          });
        });
        const prev = l.inst.flags.supportCondDef || 0;
        const d = want - prev;
        if (d) {
          l.inst.def = (l.inst.def || 0) + d;
          l.inst.defMax = (l.inst.defMax || l.inst.def) + d;
          l.inst.flags.supportCondDef = want;
        }
      });
    }
    /**
     * Löst eine einmalige Ausrüstungsfähigkeit aus und markiert sie als verbraucht.
     * @param {number} pid
     * @param {object} hostLoc Fundort des Trägers
     * @param {object} eq Ausrüstung
     * @param {object} e Effekt
     */
    _activateEquipOnce(pid, hostLoc, eq, e) {
      const host = hostLoc.inst;
      const p = this.player(pid);
      const par = e.param || {};
      eq.flags = eq.flags || {};
      if (eq.flags.onceUsed) throw new Error('Bereits benutzt');
      if (e.code === 'EQUIP_ONCE_PAIN_ATK') {
        this._damage(host, Number(par.selfDmg || 1), { tag: 'equip-once' });
        host.flags = host.flags || {};
        host.flags.tempAtk = (host.flags.tempAtk || 0) + Number(par.atk || 2);
        host.flags.tempAtkUntil = this.state.turn;
        if (par.healLess) host.flags.healLess = (host.flags.healLess || 0) + Number(par.healLess);
        eq.flags.onceUsed = true;
        host.flags.exhausted = true;
        this._log(this.defOf(eq).name + ': Schmerz-Aktivierung.');
        return { ok: true };
      }
      if (e.code === 'EQUIP_ONCE_DRAW_PAIN') {
        this._draw(p, Number(par.draw || 1));
        this._damage(host, Number(par.selfDmg || 1), { tag: 'equip-once' });
        if (this._isDamaged(host) && par.defIfDamaged) {
          const dv = Number(par.defIfDamaged);
          host.def = (host.def || 0) + dv;
          host.defMax = (host.defMax || host.def) + dv;
        }
        eq.flags.onceUsed = true;
        host.flags.exhausted = true;
        this._log(this.defOf(eq).name + ': Zug/Schmerz-Aktivierung.');
        return { ok: true };
      }
      throw new Error('Keine Ausrüstungs-Aktivierung');
    }
    /**
     * True, wenn der Spieler die Doktrin `code` gewählt hat.
     * @param {object} p
     * @param {string} code
     * @returns {boolean}
     */
    /**
     * t283: Hat die Kartendefinition einen Effekt mit diesem Code? (ersetzt 80+ gleichlautende Inline-Prüfungen)
     * @param {object|null|undefined} def Kartendefinition
     * @param {string} code Effektcode
     * @returns {boolean}
     */
    _defHas(def, code) {
      return !!(def && (def.effects || []).some((x) => x.code === code));
    }
    /**
     * t283: Parameter eines Effektcodes aus dem Katalog lesen (erste Karte mit diesem Code), mit Standardwert.
     * Für Effekte, deren Auflösung die Karte nicht mehr kennt (Napalm-Brand, Eifer-Nachschaden, Schläfer).
     * @param {string} code Effektcode
     * @param {string} key Parametername
     * @param {*} dflt Standardwert
     * @returns {*}
     */
    _codeParam(code, key, dflt) {
      this._codeParamCache = this._codeParamCache || {};
      if (!(code in this._codeParamCache)) {
        let found = null;
        for (const id in this.byId) {
          const e = (this.byId[id].effects || []).find((x) => x.code === code);
          if (e) { found = e.param || {}; break; }
        }
        this._codeParamCache[code] = found || {};
      }
      const v = this._codeParamCache[code][key];
      return v == null ? dflt : v;
    }
    _hasDoctrine(p, code) {
      return (p.doctrines || []).some((d) => {
        const def = this.defOf(d);
        if (!def) return false;
        return (def.effects || []).some((x) => x.code === code);
      });
    }
    /**
     * Aktuelle Kampfwerte inkl. Ausrüstung, Auren, Schlüsselwörter und optionalem Kampfkontext
     * (z. B. +ATK gegen beobachtete oder eingerückte Ziele, CM `vs`).
     * @param {object} inst
     * @param {object} [combatContext]
     * @returns {{atk: number, def: number}}
     */
    currentAtkDef(inst, combatContext) {
      const def = this.defOf(inst) || { atk: 0, def: 0, effects: [], tags: [], klasse: '' };
      let atk = inst.atk == null ? (Number(def.atk) || 0) : inst.atk;
      let dv = inst.def == null ? (Number(def.def) || 0) : inst.def;
      if (inst.flags && inst.flags.buffAtk) atk += inst.flags.buffAtk;
      const locOwn = this.findInst(inst.uid);
      const owner = (locOwn && locOwn.player) || (inst.owner != null ? this.player(inst.owner) : null);
      if (owner) this._auras(owner).forEach((a) => {
        if (a.code !== 'AURA_STAT' || !a.param) return;
        const f = String(a.param.filter || '');
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
      });
      inst.attachments = inst.attachments || [];
      inst.flags = inst.flags || {};
      const locEq = this.findInst(inst.uid);
      inst.attachments.forEach((eq) => {
        const ed = this.defOf(eq);
        (ed.effects || []).forEach((e) => {
          const p = e.param || {};
          if (e.code === 'BUFF' || e.code === 'AURA_STAT' || e.code === 'EQUIP_STAT' || e.code === 'CARRIER_ATK' || e.code === 'CARRIER_DEF') {
            // EQUIP_STAT ATK from attachments; DEF already applied to inst.def on attach
            if (e.code === 'EQUIP_STAT' || e.code === 'CARRIER_ATK' || e.code === 'CARRIER_DEF') {
              atk += Number(p.atk || (e.code === 'CARRIER_ATK' ? (p.value || 0) : 0) || 0);
              // DEF is baked into inst.def/defMax on attach — do not add again to combat HP display via dv from printed
            } else {
              atk += Number(p.atk || 0);
              dv += Number(p.def || 0);
            }
          }
          if (e.code === 'EQUIP_STANDARD') {
            // base DEF baked on attach; conditional ATK if second infantry in section
            if (locEq && locEq.zone === 'front' && owner) {
              const mates = this.frontList(owner).filter((l) => l.section === locEq.section && l.inst.uid !== inst.uid && isInfantry(this.defOf(l.inst)));
              if (mates.length >= 1) atk += Number(p.atk_if_second || 1);
            }
          }
          if (e.code === 'CARRIER_FIRST_ATTACK_ATK' && !(combatContext && combatContext.defending) && !(eq.flags && eq.flags.tacFirstAttackUsed)) {
            atk += Number(p.atk || 1);
          }
          if (e.code === 'FIRST_ATTACK_EACH_TURN' && !(combatContext && combatContext.defending) && inst.flags.tacActualAttackTurn !== this.state.turn && (!(e.param || {}).attachmentTurnOnly || eq.flags.tacAttachedTurn === this.state.turn)) atk += Number((e.param || {}).atk || 1);
          if (e.code === 'PASSIVE_ATK') atk += Number(p.atk || 0);
          if (e.code === 'PASSIVE_DEF') dv += Number(p.def || 0);
          if (e.code === 'EQUIP_COND_ATK' && p.ifDamaged && this._isDamaged(inst)) {
            atk += Number(p.atk || 1);
          }
        });
      });
      // unit own passives
      (def.effects || []).forEach((e) => {
        if (e.code === 'PASSIVE_ATK') atk += Number((e.param || {}).atk || 0);
        if (e.code === 'PASSIVE_DEF') dv += Number((e.param || {}).def || 0);
      });
      // buffAtk already counted once above from flags — do not double
      if (inst.flags.buffDef) dv += inst.flags.buffDef;
      if (!inst.facedown && inst.summonedTurn === this.state.turn && owner && this._hasDoctrine(owner, 'BLITZ_SUMMON_ATK')) {
        if (hasTag(def, 'panzer')) atk += 1;
      }
      if (inst.flags && inst.flags.kavUntil === this.state.turn) atk += 2;
      if (inst.flags && inst.flags.lageUntil === this.state.turn) atk += 1;
      if (inst.flags && inst.flags.tacWaxTurn === this.state.turn) atk -= Number(inst.flags.tacWaxPenalty || 0);
      if (inst.flags && inst.flags.ehrenUntil === this.state.turn) atk += 2;
      if (inst.flags && inst.flags.tempAtkUntil === this.state.turn) atk += Number(inst.flags.tempAtk || 0);
      if (inst.flags && inst.flags.umgehenAtkUntil === this.state.turn) atk += Number(inst.flags.umgehenAtk || 0);
      if (inst.flags && inst.flags.tempAtkUntil === this.state.turn && inst.flags.tempDef) {/* def baked */}
      if (inst.flags && inst.flags.commandAtkUntil === this.state.turn) atk += Number(inst.flags.commandAtkBonus || 2);
      if (inst.flags && inst.flags.eiferUntil === this.state.turn) atk += Number(this._codeParam('ZEAL', 'atk', 3));
      if (inst.flags && inst.flags.standUntil === this.state.turn) atk += 2;
      if (inst.flags && inst.flags.formUntil === this.state.turn) atk += 1;
      if (inst.flags && inst.flags.volkUntil === this.state.turn) atk += 2;
      if (inst.flags && inst.flags.pact) atk += 2;
      if (owner) {
        const loc = this.findInst(inst.uid);
        if (loc && loc.zone === 'front') {
          this._neighbors(owner, loc.section, loc.row).forEach((n) => {
            if (n.inst && this._defHas(this.defOf(n.inst), 'FLANK_DEF')) dv += 2;
          });
        }
      }
      if (owner) {
        (owner.support || []).forEach((s) => {
          if (!s) return;
          const sd = this.defOf(s);
          if (this._defHas(sd, 'AURA_FRONT_ATK')) atk += 1;
          if (this._defHas(sd, 'AURA_FRONT_DEF')) dv += 2;
          if (this._defHas(sd, 'AURA_FRONT_DEF_GEN')) dv += 2;
        });
        const foe = this.opponent(owner.id);
        (foe.support || []).forEach((s) => {
          if (s && this._defHas(this.defOf(s), 'AURA_ENEMY_ATK')) atk -= 1;
        });
      }
      if (owner && this._hasDoctrine(owner, 'BOLLWERK_COVER_ATK')) {
        const loc = this.findInst(inst.uid);
        if (loc && loc.zone === 'front' && this._hasCover(owner, loc.section, loc.row)) atk += 1;
      }
      if (owner) {
        const locA = this.findInst(inst.uid);
        if (locA && locA.zone === 'front') {
          this._activeSectionAuras(owner, locA.section).forEach((a) => {
            if (!a.atk) return;
            const d = def;
            if (a.filter === 'infanterie' && !isInfantry(d)) return;
            if (a.filter === 'artillerie' && !isArtillery(d)) return;
            if (a.filter === 'panzer' && !(hasTag(d, 'panzer') || d.typ === 'Panzer')) return;
            atk += Number(a.atk || 0);
          });
        }
      }
      const kwA = this._kwAtkBonus(inst, owner);
      atk += kwA.total;
      atk += this._cmAtk(inst, owner);
      if (owner && owner.flags && owner.flags.infPlayed && owner.flags.infPlayed.turn === this.state.turn && owner.flags.infPlayed.uids.some((u) => u !== inst.uid)) {
        (def.effects || []).forEach((e) => { if (e.code === 'ATK_IF_INFANTRY_PLAYED') atk += Number((e.param || {}).atk || 1); });
      }
      // t267: negierter Bonus – nicht über Druckwert (ATK) bzw. aktuelle Stabilität (DEF); Mali bleiben
      if (inst.flags.bonusNegatedUntil != null && inst.flags.bonusNegatedUntil >= this.state.turn) {
        atk = Math.min(atk, Number(def.atk) || 0);
        const base = inst.def == null ? (Number(def.def) || 0) : inst.def;
        dv = Math.min(dv, base);
      }
      return { atk, def: dv };
    }
    /**
     * Menschenlesbare Aufschlüsselung der Kampfwerte (für die Detailansicht).
     * @param {object} inst
     * @returns {object}
     */
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
      if (inst.flags && inst.flags.eiferUntil === this.state.turn) atkWhy.push('Religiöser Eifer: +' + this._codeParam('ZEAL', 'atk', 3) + ' Angriff');
      if (inst.flags && inst.flags.standUntil === this.state.turn) atkWhy.push('Standgericht: +2 Angriff');
      if (inst.flags && inst.flags.formUntil === this.state.turn) atkWhy.push('Standhafte Formation: +1 Angriff');
      if (inst.flags && inst.flags.volkUntil === this.state.turn) atkWhy.push('Wille des Volkes: +2 Angriff');
      if (inst.flags && inst.flags.pact) atkWhy.push('Uralter Pakt: +2 Angriff');
      if (inst.flags && inst.flags.schanzen) defWhy.push('Schanzen: +' + inst.flags.schanzen + ' Verteidigung');
      if (owner) {
        (owner.support || []).forEach((s) => {
          if (!s) return;
          const sd = this.defOf(s);
          if (this._defHas(sd, 'AURA_FRONT_ATK')) atkWhy.push(sd.name + ': +1 Angriff');
          if ((sd.effects || []).some((x) => x.code === 'AURA_FRONT_DEF' || x.code === 'AURA_FRONT_DEF_GEN')) defWhy.push(sd.name + ': +2 Verteidigung');
        });
        const foe = this.opponent(owner.id);
        (foe.support || []).forEach((s) => {
          if (s && this._defHas(this.defOf(s), 'AURA_ENEMY_ATK')) atkWhy.push(this.defOf(s).name + ': −1 Angriff');
        });
      }
      this._kwAtkBonus(inst, owner).why.forEach((w) => atkWhy.push(w));
      if (inst.flags && inst.flags.kwSich) defWhy.push('Sicherung: +' + inst.flags.kwSich + ' Verteidigung');
      if (inst.flags && inst.flags.kwZaeh) defWhy.push('Zähigkeit: +' + inst.flags.kwZaeh + ' Verteidigung');
      if (inst.flags && inst.flags.kwOver) defWhy.push('Überlast: +1 Verteidigung');
      return {
        atk: now.atk,
        def: now.def,
        printedAtk: printedAtk,
        printedDef: printedDef,
        atkWhy: atkWhy,
        defWhy: defWhy
      };
    }
    /**
     * Legale Angriffsziele der Einheit an `attackerLoc` (Reichweite, Sicht, Eingraben, Steilfeuer §7.1).
     * @param {object} attackerLoc Fundort des Angreifers
     * @returns {object[]} Fundorte
     */
    legalAttackTargets(attackerLoc) {
      const att = attackerLoc.inst;
      const defn = this.defOf(att);
      const ownerId = (attackerLoc.player && attackerLoc.player.id != null) ? attackerLoc.player.id : att.owner;
      const enemy = this.opponent(ownerId);
      const owner = this.player(ownerId);
      const out = [];
      const tags = ((defn.klasse || '') + ' ' + (defn.tags || []).join(' ')).toLowerCase();
      const sf = steilfeuerLevel(defn);
      const isMortar = sf === 1 || tags.includes('moerser') || tags.includes('mörser') || tags.includes('zugartillerie');
      const isArty = sf === 2 || ((tags.includes('artillerie') || tags.includes('haubitze') || tags.includes('rohr')) && !isMortar && sf !== 1 && sf !== 3);
      const isHeavy = sf === 3 || tags.includes('schwerartillerie') || (tags.includes('schwer') && tags.includes('artillerie'));
      const range = steilfeuerRange(sf) || (isHeavy ? 7 : isArty ? 5 : isMortar ? 3 : 3);
      const anyFront = sf >= 4 || this._defHas(defn, 'ATTACK_ANY_FRONT');
      const hasScout = this.frontList(owner).some((l) => hasTag(this.defOf(l.inst), 'aufklaerung'));
      const pipe = isArty || isHeavy || sf >= 2;
      const canSupport = this._defHas(defn, 'ATTACK_SUPPORT') ||
        (this._hasDoctrine(owner, 'SPOTTER_SUPPORT_ATK') && pipe && hasScout);
      this.frontList(enemy).forEach((t) => {
        if (anyFront) {
          out.push(t);
          return;
        }
        if (t.section === attackerLoc.section) out.push(t);
        else if (adjacentSections(attackerLoc.section).includes(t.section) && t.row === attackerLoc.row) out.push(t);

        else if (t.section === attackerLoc.section) out.push(t);
        // opposite + left/right: same row adjacent sections OR same section any? Rules: "Einheit vor sich und links und rechts"
        // Interpret: facing slot + neighboring slots in the enemy front of adjacent sections at same depth.
      });
      // Tighten: facing = same section + same row; left/right = adjacent section, same row.
      // rules.strict_facing (default off): nur gegenüber + seitlich gleiche Reihe — keine Spalten-Kette.
      const secBase = { L: 1, C: 4, R: 7 };
      const attPos = (secBase[attackerLoc.section] || 1) + attackerLoc.row;
      const tight = [];
      const strict = !!this.rules.strict_facing && !(isArty || isHeavy || isMortar || anyFront);
      this.frontList(enemy).forEach((t) => {
        if (anyFront) { tight.push(t); return; }
        if (t.inst.flags && t.inst.flags.umgehenUntil === this.state.turn) { tight.push(t); return; }
        if (strict) {
          if (t.section === attackerLoc.section && t.row === attackerLoc.row) tight.push(t);
          else if (adjacentSections(attackerLoc.section).includes(t.section) && t.row === attackerLoc.row) tight.push(t);
          return;
        }
        const tPos = (secBase[t.section] || 0) + t.row;
        const dist = Math.abs(tPos - attPos);
        const fernOk = this._kw(att, 'Fernschuss') && (sf === 0 || sf <= 3);
        if (dist <= Math.floor((range - 1) / 2) + (fernOk ? 1 : 0)) tight.push(t);
      });
      if (canSupport) {
        (enemy.support || []).forEach((s, i) => {
          if (s) tight.push({ inst: s, player: enemy, zone: 'support', index: i, section: 'C', row: 0 });
        });
      }
      const filtered = tight.filter((t) => {
        if (!t.inst) return false;
        const td = this.defOf(t.inst);
        if (!td) return false;
        if (this._isDeployProtected(t.inst)) return false;
        if (this._tacTargetAllowed && !this._tacTargetAllowed(att,t.inst)) return false;
        if (t.inst.facedown && this._defHas(td, 'GUERRILLA_HIDE')) return false;
        if ((td.name || '').includes('Himmelhund')) {
          // needs two shouldered attackers — v1: only legal if attacker has a neighbor
          const neighbors = this._neighbors(this.player(att.owner), attackerLoc.section, attackerLoc.row);

          return neighbors.length >= 1;
        }
        return true;
      });
      if (canSupport) {
        enemy.support.forEach((s, i) => { // Unterstützungszone
          if (s) filtered.push({ inst: s, zone: 'support', index: i, section: 'SUP', row: i }); // Unterstützungszone
        });
      }
      return filtered;
    }
    /**
     * Unmittelbare Nachbarstellungen derselben Front.
     * @param {object} p
     * @param {string} section
     * @param {number} row
     * @returns {object[]}
     */
    _neighbors(p, section, row) {
      const n = [];
      adjacentSections(section).forEach((s) => {
        const u = p.front[s][row];
        if (u) n.push({ inst: u, section: s, row });
      });
      if (row > 0 && p.front[section][row - 1]) n.push({ inst: p.front[section][row - 1], section, row: row - 1 });

      if (row < 2 && p.front[section][row + 1]) n.push({ inst: p.front[section][row + 1], section, row: row + 1 });

      return n;
    }
    
    // --- Öffentliche Aktions-API ---
/**
     * Alle legalen Aktionen des Spielers in der aktuellen Lage (Spielen, Angriff, Fähigkeiten, Zugende, …).
     * Öffentliche API für UI und Bot. Ändert den Stand nicht.
     * @param {number} playerId
     * @returns {object[]}
     */
    listActions(playerId) { // erlaubte Züge aufzählen
      const st = this.state;
      if (!st || st.winner != null || st.phase === 'gameover') return [];
      const p = this.player(playerId);
      const acts = [];
      const isActive = st.active === playerId && st.phase === 'main';
      const canReact = st.active !== playerId && p.ap > 0 && st.phase !== 'gameover';

      if (st.pending && st.pending.player === playerId) { // offene Wahl des Spielers
        const pk = st.pending.kind;
        // Fenster ohne Wahl (gezeigte Karten / Blick): nur Schließen ist legal.
        if (pk === 'hand-show' || pk === 'peek') return [{ type: 'PEEK_DONE', kind: pk, pass: true }];
        const PASS = { 'react-window': 'REACT_PASS', 'sam': 'SAM_PASS', 'geist-window': 'GEIST_PASS' };
        let choices = st.pending.choices || [];
        // Feindkontakt: nur Handkarten anbieten, die jetzt bezahlbar sind; Weitergeben ist immer legal.
        if (pk === 'react-window') {
          choices = choices.filter((c) => {
            // Verdeckte Falle im Support (RULES §12.1): bereits bezahlt, löst ohne AP aus.
            if ((p.support || []).some((x) => x && x.uid === c.target && x.facedown)) return true;
            const inst = p.hand.find((x) => x.uid === c.target);
            if (!inst) return false;
            try { return p.ap >= this.costOf(this.defOf(inst), p, null, inst, false); } catch (e) { return false; }
          });
        }
        const passAct = PASS[pk] ? [{ type: PASS[pk], kind: pk, pass: true }] : [];
        if (!choices.length) return passAct.length ? passAct : [{ type: 'RESOLVE_PENDING', confirm: true, kind: pk }];
        const out = choices.map((c) => Object.assign({ type: 'RESOLVE_PENDING' }, c)).concat(passAct); // offene Wahl des Spielers
        // „Bis zu N“: Bestätigen, sobald mind. ein Ziel gewählt ist
        if (st.pending.upto && (st.pending.selected || []).length > 0) {
          out.push({ type: 'RESOLVE_PENDING', confirm: true, kind: st.pending.kind });
        }
        // Massen: Folge jederzeit beenden (auch ohne weitere Wahl)
        if (pk === 'mass-pick' && !out.some((a) => a.confirm)) {
          out.push({ type: 'RESOLVE_PENDING', confirm: true, kind: pk });
        }
        return out;
      }

      if (isActive || canReact) {
        p.hand.forEach((c) => { // Handkarten
          try {
            const d = this.defOf(c);
            if (!d) return;
            const cost = this.costOf(d, p);
            if (d.typ === 'Soforteinsatz' && p.ap >= cost) {
              acts.push({ type: 'PLAY', uid: c.uid, cardId: d.id, name: d.name, typ: d.typ, cost });
            } else if (isActive && p.ap >= cost) {
              acts.push({ type: 'PLAY', uid: c.uid, cardId: d.id, name: d.name, typ: d.typ, cost });
            }
          } catch (err) { /* eine kaputte Karte darf die Zugliste nicht leeren */ }
        });
      }

      if (isActive) {
        this.frontList(p).forEach((loc) => {
          try {
            if (!loc.inst) return;
            if (loc.inst.facedown) { // verdeckte Lage
              const rd = this.defOf(loc.inst);
              acts.push({ type: 'REVEAL_UNIT', uid: loc.inst.uid, name: rd ? rd.name : 'Verdeckt' });
            }
            if (!loc.inst.facedown && this._canAct(loc.inst, playerId) && !(loc.inst.flags && loc.inst.flags.noAttack)) {
              const targets = this.legalAttackTargets(loc);
              const priced = targets.map((t) => {
                const cost = this._attackCost(loc, t);
                return {
                  uid: t.inst.uid,
                  name: t.inst.facedown ? 'Verdeckte Einheit' : ((this.defOf(t.inst) || {}).name || 'Ziel'),
                  cost,
                  zone: t.zone || 'front',
                };
              }).filter((t) => p.ap >= t.cost);
              if (priced.length) {
                const ad = this.defOf(loc.inst);
                const minCost = priced.reduce((m, t) => Math.min(m, t.cost), priced[0].cost);
                acts.push({
                  type: 'ATTACK',
                  uid: loc.inst.uid,
                  name: ad ? ad.name : 'Einheit',
                  cost: minCost,
                  targets: priced,
                });
              }
            }
          } catch (err) { /* ein Angriff darf die restliche Zugliste nicht streichen */ }
        });
        // Doktrin Verlegung: 1×/Zug seitlich schieben
        if (this._hasDoctrine && this._hasDoctrine(p, 'VERLEGUNG') && !(p.flags && p.flags.dokVerlegungUsed === this.state.turn)) {
          const vp = (this._dokParam && this._dokParam(p, 'VERLEGUNG')) || {};
          const shiftAp = Number(vp.ap || 0);
          if (p.ap >= shiftAp) {
            const order = ['L', 'C', 'R'];
            this.frontList(p).forEach((loc) => {
              if (!loc.inst || loc.inst.facedown) return;
              const i = order.indexOf(loc.section);
              [-1, 1].forEach((d) => {
                const ni = i + d;
                if (ni < 0 || ni > 2) return;
                const sec = order[ni];
                if (p.front[sec][loc.row]) return;
                acts.push({
                  type: 'DOK_SHIFT',
                  uid: loc.inst.uid,
                  slot: { section: sec, row: loc.row },
                  cost: shiftAp,
                  name: (this.defOf(loc.inst) || {}).name || 'Einheit',
                  label: 'Verlegung → ' + sec + (loc.row + 1),
                });
              });
            });
          }
        }
        // t285: aktive Doktrin-Fähigkeiten und Stellungswechsel als legale Aktionen (UI und Bot).
        this._listDoctrineActives(p, acts);
        this.frontList(p).forEach((loc) => {
          if (!loc.inst || loc.inst.facedown) return;
          this.kwMoveSlots(loc.inst.uid).forEach((s) => {
            acts.push({ type: 'KW_MOVE', uid: loc.inst.uid, slot: s, cost: 0, name: (this.defOf(loc.inst) || {}).name || 'Einheit', label: 'Stellungswechsel → ' + s.section + (s.row + 1) });
          });
        });
        if (this._tacActivation) {
          const locked = this._supportLocked(playerId);
          this.frontList(p).concat((p.support || []).filter(Boolean).map(inst=>({inst,zone:'support'}))).forEach(l=>{
            if (locked && l.zone === 'support') return;
            try { this._tacActivation(playerId,l.inst.uid); acts.push({type:'USE_ABILITY',uid:l.inst.uid}); } catch (e) { /* passive/illegal source */ }
          });
        }
        const foe = this.opponent(playerId);
        (foe.support || []).forEach((s) => {
          if (!s || s.facedown) return;
          const sd = this.defOf(s);
          const nx = (sd.effects || []).find((x) => x.code === 'NEUTRALIZE');
          if (!nx) return;
          const nCost = Number((nx.param && nx.param.ap) || 2);
          if (p.ap >= nCost) {
            acts.push({ type: 'ACTIVATE_SUPPORT', uid: s.uid, cardId: sd.id, name: sd.name, cost: nCost, ability: 'NEUTRALIZE', label: 'Neutralisieren' });
          }
        });
        acts.push({ type: 'END_TURN' });
        acts.push({ type: 'PROPOSE_PEACE' });
      }

      if (st.peaceOffer != null && st.peaceOffer !== playerId) {
        acts.push({ type: 'ACCEPT_PEACE' });
        acts.push({ type: 'REJECT_PEACE' });
      }
      acts.push({ type: 'CONCEDE' });
      return acts;
    }
    /**
     * Führt genau eine Aktion aus oder lehnt sie ab. Einziger erlaubter Schreibzugriff der UI/Bots.
     * Bei offenem `pending` nur passende Antworten (Ziel, Münze, Pass). Nach Erfolg ist `state` aktuell.
     * @param {{type: string, player: number}} action
     * @returns {{ok: boolean, error?: string, state?: object}}
     */
    dispatch(action) { // eine Aktion durch die Regeln jagen
      if (!this.state || this.state.winner != null || this.state.phase === 'gameover') return { ok: false, error: 'Spiel ist vorbei' };
      const a = action || {};
      const pid = a.player;
      if (pid !== 0 && pid !== 1) return { ok: false, error: 'Spieler fehlt' };
      try { // Fehler auffangen
        if (this._tacBeforeAction) this._tacBeforeAction(pid,a);
        // t283 Mulligan (RULES §23.4): nur vor der ersten eigenen Aktion; jede andere Aktion am Zug schließt ihn.
        if (a.type !== 'MULLIGAN' && !MULLIGAN_NEUTRAL[a.type] && this.state.active === pid) {
          const mp = this.player(pid);
          if (mp && mp.flags) mp.flags.mulliganClosed = true;
        }
        switch (a.type) { // Aktionstyp unterscheiden
          case 'MULLIGAN': return this._actMulligan(pid); // neue Starthand gegen 1 AP
          case 'PLAY': return this._actPlay(pid, a); // Karte aus der Hand spielen
          case 'CHOOSE_SLOT': return this._actSlot(pid, a); // Einheit auf eine Stellung legen
          case 'CHOOSE_TARGET': return this._actTarget(pid, a); // Ziel aufnehmen oder Kampf lösen
          case 'ATTACK': return this._actAttack(pid, a); // Angriff einleiten
          case 'CANCEL_PENDING': return this._actCancel(pid, a); // offene Wahl verwerfen
          case 'COIN_FLIP': return this._actCoin(pid, a); // Münze werfen
          case 'CONFIRM_TARGETS': return this._actConfirmTargets(pid, a);
          case 'REVEAL_UNIT': return this._actReveal(pid, a);
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
          case 'DOK_SHIFT': return this._actDokShift(pid, a);
          case 'HEAL_ARMORED': return this._actHealArmored(pid, a);
          case 'UEBERSCHUSS': return this._actUeberschuss(pid, a);
          case 'KW_MOVE': return this._actKwMove(pid, a); // Schlüsselwort Stellungswechsel
          case 'CONCEDE': return this._end(pid === 0 ? 1 : 0, 'Aufgabe');
          case 'PROPOSE_PEACE': // dieser Aktionstyp
            this.state.peaceOffer = pid;
            this._log(this.player(pid).name + ' bietet weißen Frieden.'); // Zeile ins Protokoll
            return { ok: true };
          case 'ACCEPT_PEACE': // dieser Aktionstyp
            return this._end(null, 'Weißer Frieden');
          case 'REJECT_PEACE': // dieser Aktionstyp
            this.state.peaceOffer = null;
            this._log('Frieden abgelehnt.'); // Zeile ins Protokoll
            return { ok: true };
          case 'RESOLVE_PENDING': // dieser Aktionstyp
            return this._resolvePending(pid, a);
          default: // unbekannter Fall
            return { ok: false, error: 'Unbekannte Aktion ' + a.type };
        }
      } catch (err) {
        return { ok: false, error: String(err.message || err) };
      } finally {
        if (this.state) this.state.seq = (this.state.seq || 0) + 1;
        if (this.state && this.state.winner == null) { try { this._kwRecompute(); } catch (e) { /* Schlüsselwort-Neuberechnung darf Aktionen nicht brechen */ } try { this._cmAfterAction(); this._cmRecompute(); } catch (e) { /* CM-Neuberechnung darf Aktionen nicht brechen */ } }
        if (this._tacAfterAction) this._tacAfterAction();
        try { this._maybeContinueSequences(); } catch (e) { /* Folgen (Gehorsam/Massen/Gassen) dürfen Aktionen nicht brechen */ }
      }
    }
    /**
     * Beendet die Partie mit Sieger und Grund. Setzt `state.winner`.
     * @param {number|string} winner
     * @param {string} reason
     */
    _end(winner, reason) {
      this.state.winner = winner;
      this.state.endReason = reason;
      this.state.phase = 'gameover';
      if (winner == null) this._log('Weißer Frieden. Der Krieg ist nicht mehr führbar.'); // Zeile ins Protokoll
      else this._log(this.player(winner).name + ' siegt (' + reason + ').'); // Zeile ins Protokoll
      return { ok: true, gameover: true };
    }
    /**
     * Zieht AP ab. Wirft bzw. scheitert, wenn nicht genug vorhanden.
     * @param {object} p
     * @param {number} n
     */
    _spend(p, n) { // Aktionspunkte abziehen
      if (p.ap < n) throw new Error('Nicht genug AP (' + p.ap + '/' + n + ')'); // Regelverstoß, Zug ungültig
      p.ap -= n;
    }
    
    // --- Aktionshandler ---
/**
     * Aktion PLAY: Karte aus der Hand spielen (Einheit, Unterstützung, Ausrüstung, Soforteinsatz).
     * Zahlt Kosten, setzt ein oder öffnet eine Zielwahl. Seiteneffekt: ändert `state`.
     * @param {number} pid
     * @param {object} a
     */
    _actPlay(pid, a) { // Karte aus der Hand spielen
      const p = this.player(pid);
      const found = p.hand.find((c) => c.uid === a.uid); // Handkarten
      if (!found) throw new Error('Karte nicht auf der Hand'); // Regelverstoß, Zug ungültig
      const def = this.defOf(found);
      if (a.target && this._tacEffectTargetAllowed && !this._tacEffectTargetAllowed(def,a.target)) throw new Error('Ziel darf sein Feld nicht verlassen');
      const cost = this.costOf(def, p, null, found, true);
      const isActive = this.state.active === pid && this.state.phase === 'main';
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
      this._applyDeployProtection(found);
        p.support[idx] = found;
        this._log(def.name + ' liegt verdeckt im Support (Stellung).', { secret: p.id, pub: p.name + ' legt eine verdeckte Stellung in den Support.' });
        return { ok: true };
      }
      if (def.typ === 'Einheit') {
        const slots = this.emptySlots(p);
        if (!slots.length) throw new Error('Keine freie Stellung');
        const picked = a.slot && a.slot.section != null && String(a.slot.section) !== ''
          ? { section: a.slot.section, row: Number(a.slot.row) }
          : null;
        if (p.ap < cost - (cost > 1 && this._kwReliefSlots(p).length ? 1 : 0)) throw new Error('Nicht genug AP (' + p.ap + '/' + cost + ')');
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
      if (def.typ === 'Unterstützung') {
        if (p.flags && p.flags.sectionBlockSupport && p.flags.sectionBlockSupport.until === this.state.turn) {
          p.ap += cost;
          throw new Error('Unterstützung in diesem Zug durch Abschnitts-Effekt gesperrt');
        }
        let idx = -1;
        if (a.slot && a.slot.section === 'support' && a.slot.row != null) {
          const want = Number(a.slot.row);
          if (want >= 0 && want < p.support.length && !p.support[want]) idx = want;
        }
        if (idx < 0) idx = p.support.findIndex((x) => !x);
        if (idx < 0) {
          p.ap += cost;
          throw new Error('Support voll'); // Regelverstoß, Zug ungültig
        }
        p.hand = p.hand.filter((c) => c.uid !== found.uid);
        found.summonedTurn = this.state.turn;
      this._applyDeployProtection(found);
        if (a.facedown) {
          const trap = (def.effects || []).some((e) => ['LAY_MINE','CANCEL_AIR_DAMAGE','AMMO_COOK','PAUSE_UNIT','SILVER_ANGEL','COURT_MARTIAL','FORMATION','RESIST','HONORS'].indexOf(e.code) >= 0);
          if (this._istStellung(def) || trap) found.facedown = true;
        }
        p.support[idx] = found;
        this._evt('support', def, p.name + ' legt ' + (found.facedown ? 'eine verdeckte Karte' : def.name) + ' in den Support.'); // Ereignis für die Rundenübersicht
        this._onEnter(found, 'support');
        if (this._tacOnSupport) this._tacOnSupport(found);
        this._applySatAura(p);
        if (this._defHas(def, 'SLEEPER')) { const slp = (def.effects.find((x) => x.code === 'SLEEPER').param) || {}; found.flags.sleeper = Number(slp.turns || 3); found.flags.sleeperMaxAp = Number(slp.maxAp || 3); }
        if (this._defHas(def, 'NO_FACE_DOWN')) {
          this.frontList(this.opponent(p.id)).forEach((l) => { l.inst.facedown = false; });
        }
        if (this._defHas(def, 'PACT_BOND')) {
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
      if (def.typ === 'Ausrüstung') {
        const hosts = this._equipHostChoices(p, def);
        if (!hosts.length) {
          p.ap += cost;
          throw new Error('Keine Einheit für Ausrüstung'); // Regelverstoß, Zug ungültig
        }
        this.state.pending = this._sealPending({
          kind: 'equip',
          player: pid,
          uid: found.uid,
          paid: cost,
          choices: hosts.map((h) => ({ target: h.inst.uid, label: h.label })),
        });
        return { ok: true, need: 'target' };
      }
      if (def.typ === 'Soforteinsatz') {
        return this._playInstant(p, found, a.target, a.facedown);
      }
      p.ap += cost;
      throw new Error('Typ nicht spielbar: ' + def.typ); // Regelverstoß, Zug ungültig
    }
    /**
     * Antwort auf eine offene Stellungswahl (`pending` Slot).
     * @param {number} pid
     * @param {object} a
     */
    _actSlot(pid, a) { // Einheit auf eine Stellung legen
      if (this._tacChoose) { const r=this._tacChoose(pid,a); if (r) return r; }
      const pend = this.state.pending; // offene Wahl des Spielers
      if (pend && pend.kind === 'move-dest' && pend.player === pid) {
        return this._actTarget(pid, { target: a.slot ? ('slot:' + a.slot.section + ':' + a.slot.row) : a.target, slot: a.slot });
      }
      if (pend && pend.kind === 'gassen-slot' && pend.player === pid) return this._gassenPlace(pid, a.slot);
      if (!pend || pend.player !== pid || pend.kind !== 'deploy') throw new Error('Kein Auslegen offen'); // Regelverstoß, Zug ungültig
      const p = this.player(pid);
      const card = p.hand.find((c) => c.uid === pend.uid); // Handkarten
      if (!card) throw new Error('Karte weg'); // Regelverstoß, Zug ungültig
      const slot = a.slot;
      if (!slot || !p.front[slot.section] || !(slot.row >= 0 && slot.row <= 2)) throw new Error('Ungültige Stellung');
      if (p.front[slot.section][slot.row]) throw new Error('Stellung belegt'); // Regelverstoß, Zug ungültig
      let due = pend.paid ? 0 : (pend.cost != null ? pend.cost : this.costOf(this.defOf(card), p, null, card, true));
      const relief = this._kwReliefAt(p, slot.section, slot.row);
      if (pend.free) due=0;
      if (!pend.paid && relief && due > 1) due -= 1;
      const tacTax=this._tacEntryTax ? this._tacEntryTax(p,card,slot.section) : 0;
      due += tacTax;
      if (p.ap < due) throw new Error('Nicht genug AP (' + p.ap + '/' + due + ')');
      if (relief) { delete p.flags.kwRelief[slot.section + slot.row]; if (!pend.paid) this._log('Ablösung: Einsatz auf ' + slot.section + (slot.row + 1) + ' kostet 1 AP weniger.'); }
      const heranUsed = p.flags && p.flags.kwHeran === this.state.turn;
      p.hand = p.hand.filter((c) => c.uid !== card.uid); // Handkarten
      card.facedown = this.rules.deploy_protection ? false : !!pend.facedown; // verdeckte Lage
      card.summonedTurn = this.state.turn;
      this._applyDeployProtection(card);
      if (this._kw(card, 'Gefechtsbereit') && card.flags && card.flags.digInBonus) {
        card.flags.noCombatUntil = null; card.flags.digInUntil = null; card.flags.digInBonus = 0;
        card.def = Math.max(1, (card.def || 0) - 1); card.defMax = Math.max(1, (card.defMax || 0) - 1);
      }
      p.front[slot.section][slot.row] = card;
      this._maybeBlitzLock({ inst: card, player: p, zone: 'front', section: slot.section, row: slot.row });
      if (isInfantry(this.defOf(card))) {
        if (!p.flags.infPlayed || p.flags.infPlayed.turn !== this.state.turn) p.flags.infPlayed = { turn: this.state.turn, uids: [] };
        p.flags.infPlayed.uids.push(card.uid);
      }
      if (heranUsed) p.flags.kwHeran = null;
      this._spend(p,due);
      pend.paid=(pend.paid || 0)+due;
      if (this._tacConsumeEntry) this._tacConsumeEntry(p,card,slot.section);
      const def = this.defOf(card);
      this._evt('deploy', def, p.name + ' stellt ' + (card.facedown ? 'eine verdeckte Einheit' : def.name) + ' auf ' + slot.section + (slot.row + 1) + '.');
      // Ereignis für die Rundenübersicht
      const continueMass = !!pend.mass;
      const continueGassen = !!pend.gassen;
      this.state.pending = null; // offene Wahl des Spielers
      if (continueMass) this.state._massFollow = { pid };
      if (continueGassen) this.state._gassenFollow = this.state._gassenFollow || { pid, queue: [] };
      if (this._tacOnEntry) this._tacOnEntry(card,slot.section);
      if (!card.facedown) this._onEnter(card, 'front');
      const d2 = this.defOf(card);
      if ((d2.effects || []).some((x) => x.code === 'AUFKLAERUNG' && x.param && x.param.onEnter)) {
        const hid = this.frontList(this.opponent(pid)).filter((l) => l.inst.facedown);
        if (hid.length) {
          this.state.pending = this._sealPending({ kind: 'scout-rev', player: pid, uid: card.uid, left: 1, free: true, choices: hid.map((l) => ({ target: l.inst.uid, label: 'Verdeckt' })) });
        }
      }
      if (this._defHas(d2, 'HAND_PEEK')) {
        const opp = this.opponent(pid);
        if (opp.hand.length) {
          this.state.pending = this._sealPending({ kind: 'hand-peek', player: pid, needCount: Math.min(2, opp.hand.length), selected: [], choices: opp.hand.map((c) => ({ target: c.uid, label: 'Verdeckt' })) });
        }
      }
      this._applyMech(this.player(pid));
      this._applyFuehrung(this.player(pid));
      this._applyFlankDef(this.player(pid));
      if (this._kw(card, 'Heranführung')) { p.flags.kwHeran = this.state.turn; this._log('Heranführung: Die nächste Einheit in diesem Zug kostet 1 AP weniger (mind. 1).'); }
      if (this._kw(card, 'Zuteilung')) { this._draw(p, 1); this._log('Zuteilung: ' + p.name + ' zieht 1 Karte.'); }
      this._cmConsumeDiscount(this.defOf(card), p);
      if (!card.facedown) this._cmOnEnter(card, p);
      this._kwRecompute();
      return { ok: true };
    }
    /**
     * Antwort auf eine offene Zielwahl (Karte, Abschnitt, mehrere Ziele).
     * @param {number} pid
     * @param {object} a
     */
    _actTarget(pid, a) { // Ziel aufnehmen oder Kampf lösen
      if (this._tacChoose) { const r=this._tacChoose(pid,a); if (r) return r; }
      const pend = this.state.pending; // offene Wahl des Spielers
      if (!pend || pend.player !== pid) throw new Error('Kein Ziel offen');
      if (pend.card && this._tacEffectTargetAllowed && !this._tacEffectTargetAllowed(this.defOf(pend.card),a.target)) throw new Error('Ziel darf sein Feld nicht verlassen');
      if (pend.kind === 'kw-swap') return this._resolveKwSwap(pid, a.target);
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
          if (this._tacPayFreeEntry && !this._tacPayFreeEntry(p,card,pend.section)) throw new Error('Anmarschstörung: 1 AP fehlt');
          p.hand = p.hand.filter((c) => c.uid !== card.uid);
          card.facedown = false;
          card.summonedTurn = this.state.turn;
      this._applyDeployProtection(card);
          p.front[pend.section][pend.row] = card;
          if (this._tacOnEntry) this._tacOnEntry(card,pend.section);
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
      if (pend.kind === 'move-dest') {
        const loc = this.findInst(pend.uid);
        const p = this.player(pid);
        let dest = null;
        if (a.slot) dest = a.slot;
        else if (a.target && String(a.target).indexOf('slot:') === 0) {
          const parts = String(a.target).split(':');
          dest = { section: parts[1], row: Number(parts[2]) };
        } else {
          const ch = (pend.choices || []).find((c) => c.target === a.target);
          if (ch && ch.slot) dest = ch.slot;
        }
        if (!loc || loc.player.id !== pid || loc.zone !== 'front' || !dest || !p.front[dest.section] || p.front[dest.section][dest.row] || !(pend.choices || []).some(c=>c.slot && c.slot.section === dest.section && c.slot.row === Number(dest.row))) throw new Error('Ungültiges Feld');
        if (this._tacAssertMove) this._tacAssertMove(loc.inst);
        if (this._tacDepart) this._tacDepart(loc.inst,false);
        p.front[loc.section][loc.row] = null;
        p.front[dest.section][dest.row] = loc.inst;
        if (this._tacOnEntry) this._tacOnEntry(loc.inst,dest.section,loc.section);
        this._log(this.defOf(loc.inst).name + ' → ' + dest.section + (dest.row + 1));
        if (pend.card) p.grave.push(pend.card);
        this.state.pending = null;
        return { ok: true };
      }
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
        if (loc && this._tacAssertMove) this._tacAssertMove(loc.inst);
        this._spend(this.player(pid), pend.cost);
        if (src) src.inst.flags.exhausted = true;
        if (loc && loc.zone === 'front') {
          if (this._tacDepart) this._tacDepart(loc.inst,true);
          src.inst.flags.patientUid = loc.inst.uid;
          src.inst.flags.patient = loc.inst;
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
        if (loc && this._tacAssertMove) this._tacAssertMove(loc.inst);
        this._spend(this.player(pid), pend.cost);
        if (src) src.inst.flags.exhausted = true;
        if (loc && loc.zone === 'front') {
          if (this._tacDepart) this._tacDepart(loc.inst,true);
          src.inst.flags.patientUid = loc.inst.uid;
          src.inst.flags.patient = loc.inst;
          src.inst.flags.home = { section: loc.section, row: loc.row };
          loc.player.front[loc.section][loc.row] = null;
          this._log(this.defOf(loc.inst).name + ' kommt ins Lazarett.');
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
        const fmT = this.findInst(a.target);
        if (!fmT || fmT.zone !== 'front' || fmT.player.id === pid || this._hostileTargetBlocked(fmT.inst)) throw new Error('Ungültiges Ziel');
        this._spend(this.player(pid), Number(pend.cost || 0));
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
        this._log(this.defOf(loc.inst).name + ' +' + this._codeParam('ZEAL', 'atk', 3) + ' A bis Zugende, danach ' + this._codeParam('ZEAL', 'after', 2) + ' Schaden.');
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
          return this._finishMassDeploy(pid);
        }
        if (!this._emptyFrontSlots(p).length) return this._finishMassDeploy(pid);
        card.flags.freePlayOnTurn = this.state.turn;
        this.state.pending = this._sealPending({ kind: 'deploy', player: pid, uid: card.uid, facedown: false, free: true, mass: true });
        this.state._massFollow = { pid };
        return { ok: true, need: 'slot' };
      }
      if (pend.kind === 'pause-unit') return this._applyPause(pid, a.target, pend);
      if (pend.kind === 'napalm') return this._doNapalm(pid, a.target, pend);
      if (pend.kind === 'react-window') {
        const rp = this.player(pid);
        const si = (rp.support || []).findIndex((c) => c && c.uid === a.target && c.facedown);
        if (si >= 0) return this._springTrap(rp, si);
        return this._actPlay(pid, { uid: a.target });
      }
      if (pend.kind === 'mob-pick') {
        if (a.target && pend.selected.indexOf(a.target) < 0) pend.selected.push(a.target);
        if (pend.selected.length >= (pend.needCount || 2)) return this._finishMobPick(pid);
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
        const tokDef = this.byId['dc_tok_minenfeld'];
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
        if (this._tacAssertMove) this._tacAssertMove(loc.inst);
        if (this._tacDepart) this._tacDepart(loc.inst,true);
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
      if (pend.kind === 'equip') {
        const p = this.player(pid);
        const card = p.hand.find((c) => c.uid === pend.uid); // Handkarten
        const host = this.findInst(a.target);
        const zonesOk = host && (host.zone === 'front' || host.zone === 'support');
        if (!card || !host || host.player.id !== pid || !zonesOk) throw new Error('Ungültiges Ziel'); // Regelverstoß, Zug ungültig
        const legal = this._equipHostChoices(p, this.defOf(card)).some((h) => h.inst.uid === host.inst.uid);
        if (!legal) throw new Error('Ungültiges Ziel');
        p.hand = p.hand.filter((c) => c.uid !== card.uid); // Handkarten
        host.inst.attachments = host.inst.attachments || [];
        host.inst.attachments.push(card);
        card.flags.tacAttachedTurn=this.state.turn;
        delete card.flags.tacFirstAttackUsed;
        const ed = this.defOf(card);
        (ed.effects || []).forEach((x) => {
          const xp = x.param || {};
          if (x.code === 'EQUIP_STAT' || x.code === 'CARRIER_DEF' || x.code === 'CARRIER_ATK') {
            // ATK comes from currentAtkDef reading attachment; bake DEF into HP pool
            const dv = Number(xp.def || (x.code === 'CARRIER_DEF' ? (xp.value || xp.def || 0) : 0) || 0);
            if (dv) {
              host.inst.def = (host.inst.def || 0) + dv;
              host.inst.defMax = (host.inst.defMax || host.inst.def) + dv;
            }
          }
          if (x.code === 'EQUIP_STANDARD') {
            const dv = Number(xp.def || 1);
            host.inst.def = (host.inst.def || 0) + dv;
            host.inst.defMax = (host.inst.defMax || host.inst.def) + dv;
          }
          if (x.code === 'ON_ENTER_DRAW') this._draw(p, Number(xp.value || 1));
          if (x.code === 'REVEAL') {
            let n = Number(xp.count || 1);
            const foes = this.frontList(this.opponent(p.id));
            foes.forEach((l) => {
              if (n > 0 && l.inst.facedown) { l.inst.facedown = false; n -= 1; if (xp.observe) { l.inst.flags = l.inst.flags || {}; l.inst.flags.observed = true; } }
            });
            /* t255: `observe` beim Anlegen – ohne verdeckten Feind wird ein noch nicht beobachteter Feind markiert. */
            if (xp.observe && n > 0) foes.filter((l) => !(l.inst.flags && l.inst.flags.observed)).slice(0, n).forEach((l) => { l.inst.flags = l.inst.flags || {}; l.inst.flags.observed = true; });
          }
          if (x.code === 'EQUIP_ONCE_HEAL_DESTROY' && xp.noDestroy) {
            // available as activated later; mark charge
            host.inst.flags.equipHealCharge = Number(xp.heal || 2);
            if (xp.noAttack) host.inst.flags.noAttack = true;
          }
          if (x.code === 'EQUIP_KILL_DRAW_BUFF') {
            const dv = Number(xp.sectionDef || 1);
            host.inst.def = (host.inst.def || 0) + dv;
            host.inst.defMax = (host.inst.defMax || host.inst.def) + dv;
            card.flags = card.flags || {};
            card.flags.killDrawArmed = this.state.turn;
          }
          if (x.code === 'REVEAL_STRIKE') {
            // host gains scout-style reveal via USE_ABILITY
            host.inst.flags = host.inst.flags || {};
            host.inst.flags.equipRevealStrike = true;
          }
        });
        this._applySupportCondDef(p);
        this._evt('equip', ed, p.name + ' rüstet ' + this.defOf(host.inst).name + ' mit ' + ed.name + ' aus.');
        this.state.pending = null;
        return { ok: true };
      }
      if (pend.kind === 'instant-section') {
        const p = this.player(pid);
        let id = a.target || (a.section ? ('sec:' + (a.side || pend.side || 'own') + ':' + a.section) : null);
        if (!id) throw new Error('Abschnitt fehlt');
        // Einheit als Anker → Abschnitt der erlaubten Seite
        if (!String(id).startsWith('sec:')) {
          const coerced = this._coerceSectionTarget(p, id, pend.side || 'own');
          if (coerced) id = coerced;
        }
        if (!(pend.choices || []).some((c) => c.target === id)) throw new Error('Ungültiger Abschnitt');
        return this._finishInstant(pid, pend, [id]);
      }
      if (pend.kind === 'instant-target') {
        if (!pend.selected) pend.selected = [];
        const id = a.target;
        const ix = pend.selected.indexOf(id);
        if (ix >= 0) pend.selected.splice(ix, 1);
        else pend.selected.push(id);
        const need = pend.needCount || 1;
        const remain = (pend.choices || []).filter((c) => c && c.target && pend.selected.indexOf(c.target) < 0);
        if (!pend.upto && pend.selected.length >= need) {
          return this._finishInstant(pid, pend, pend.selected);
        }
        // Keine weiteren wählbaren Ziele → mit bisheriger Auswahl abschließen (verhindert Toggle-Soft-Lock).
        if (!pend.upto && pend.selected.length > 0 && remain.length === 0) {
          return this._finishInstant(pid, pend, pend.selected);
        }
        return { ok: true, need: 'target', selected: pend.selected.slice() };
      }
      if (pend.kind === 'own-bonus') {
        const loc = this.findInst(a.target);
        if (!loc || loc.player.id !== pid || loc.zone !== 'front') throw new Error('Keine eigene Fronteinheit');
        const pl = this.player(pid);
        this.state.pending = null;
        this._applyOwnBonus(pl, pend.effects || [], a.target, pend.card);
        if (pend.card) pl.grave.push(pend.card);
        if (this.state.heldAttack) return this._resumeAfterReact();
        return { ok: true };
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
        if (loc && tgt) {
          const need = this._attackCost(loc, tgt);
          const spent = Number(pend.baseCostSpent) || (Number(this.rules.attack_ap) || 1);
          if (need > spent) {
            try { this._spend(this.player(pid), need - spent); }
            catch (e) {
              this.player(pid).ap += spent;
              this.state.pending = null;
              throw e;
            }
          } else if (need < spent) {
            this.player(pid).ap += (spent - need);
          }
        }
        if (loc) {
          const ad = this.defOf(loc.inst);
          const tn = tgt ? (tgt.inst.facedown ? 'eine verdeckte Einheit' : this.defOf(tgt.inst).name) : 'ein Ziel';
          this._evt('attack', ad, ad.name + ' wird ausgewählt.');
          this._evt('attack', ad, ad.name + ' greift ' + tn + ' an.');
        }
        if (loc && tgt && this._defHas(this.defOf(tgt.inst), 'NEED_SHOULDER') && !this._defHas(this.defOf(loc.inst), 'ATTACK_ANY_FRONT') && !isArtillery(this.defOf(loc.inst))) {
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
    
    // --- Soforteinsätze und Abschnittseffekte ---
/**
     * Spielt einen Soforteinsatz, ggf. verdeckt, und wertet Effekte bzw. Zielbedarf aus.
     * @param {object} p
     * @param {object} card
     * @param {string} [targetUid]
     * @param {boolean} [facedown]
     */
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
        this._log(p.name + ' legt ' + def.name + ' verdeckt in den Support.', { secret: p.id, pub: p.name + ' legt eine verdeckte Karte in den Support.' });
        return { ok: true };
      }
      if (this._defHas(def, 'WILL_PEOPLE')) {
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
      if (this._defHas(def, 'RESIST')) {
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
      if ((def.effects || []).some((e) => e.code === 'CLEAR_ATK_MALUS' && !(e.param && e.param.negateBonus))) {
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
      if (this._defHas(def, 'RATIONS')) {
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
      if (this._defHas(def, 'RADIATION')) {
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
      if (this._defHas(def, 'FORMATION')) {
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
      if (this._defHas(def, 'COURT_MARTIAL')) {
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
      if (this._defHas(def, 'SILVER_ANGEL')) {
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
      if (this._defHas(def, 'SELF_SAC')) {
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
      if (this._defHas(def, 'ZEAL')) {
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
      if (this._defHas(def, 'CLEAR_MINE')) {
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
      if (this._defHas(def, 'MASS_DEPLOY')) {
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
      if (this._defHas(def, 'PAUSE_UNIT')) {
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
      if (this._defHas(def, 'NAPALM')) {
        const foe = this.frontList(this.opponent(p.id));
        if (!foe.length) {
          p.hand.push(card);
          return { ok: false, error: 'Keine gegnerische Front.', code: 'NO_TGT' };
        }
        const napChoices = foe.filter((l) => !this._hostileTargetBlocked(l.inst));
        if (!napChoices.length) {
          p.hand.push(card);
          return { ok: false, error: 'Alle Ziele eingegraben.', code: 'NO_TGT' };
        }
        this.state.pending = this._sealPending({
          kind: 'napalm',
          player: p.id,
          card: card,
          choices: napChoices.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if (this._defHas(def, 'AMMO_COOK')) {
        p.flags.ammoCook = this.state.turn;
        p.grave.push(card);
        this._log(p.name + ' bereitet einen Munitionstreffer vor.');
        if (this.state.heldAttack) return this._resumeAfterReact(p.id);
        return { ok: true };
      }
      if (this._defHas(def, 'MOBILIZE_INF')) {
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
      if (this._defHas(def, 'LAY_MINE')) {
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
      if (this._defHas(def, 'HONORS')) {
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
      if (this._defHas(def, 'MARTYR')) {
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
      if (this._defHas(def, 'AIR_STRIKE')) {
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
        const airChoices = tg.filter((l) => !(l.zone === 'front' && this._hostileTargetBlocked(l.inst)));
        if (!airChoices.length) {
          p.hand.push(card);
          return { ok: false, error: 'Alle Ziele eingegraben.', code: 'NO_TGT' };
        }
        this.state.pending = this._sealPending({
          kind: 'air-strike',
          player: p.id,
          card: card,
          dmg: 5,
          choices: airChoices.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }))
        });
        return { ok: true, need: 'target' };
      }
      if (this._defHas(def, 'BRIEFING')) {
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
      if (this._defHas(def, 'REPAIR_BOUNCE')) {
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
      if (this._defHas(def, 'DOUBLE_COMBAT')) {
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
      if (this._defHas(def, 'DRAW_AP')) {
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
      if (this._defHas(def, 'GHOST_STRIKE')) {
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
      if (this._defHas(def, 'GHOST_RUINS')) {
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
      if (this._defHas(def, 'EMPTY_STREETS')) {
        if (this.state.active !== p.id) {
          p.hand.push(card);
          return { ok: false, error: 'Einsame Gassen nur im eigenen Zug.', code: 'OWN_TURN' };
        }
        p.grave.push(card);
        return this._startGassen(p);
      }
      if (this._defHas(def, 'CAVALRY_ATK')) {
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
      if (this._defHas(def, 'COVER_SEEK')) {
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
      if (this._defHas(def, 'LAST_STAND')) {
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
      if (this._defHas(def, 'CLEAR_ENEMY_SUPPORT')) {
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
      if (this._defHas(def, 'CANCEL_AIR_DAMAGE')) {
        if (this.state.pending && this.state.pending.kind === 'sam') {
          p.hand.push(card); // still in playInstant already removed - put back then resolve
          return this._resolveSam(p.id, true);
        }
        p.hand.push(card);
        return { ok: false, error: 'Kein Luftangriff im Gange.', code: 'NO_AIR' };
      }
      if (this._defHas(def, 'COMMAND_ATTACK')) {
        if (this.state.active !== p.id) {
          p.hand.push(card);
          return { ok: false, error: 'Blinder Gehorsam nur im eigenen Zug.', code: 'OWN_TURN' };
        }
        p.grave.push(card);
        return this._startCommandAttack(p, 2);
      }
      if (this._defHas(def, 'ARMAGEDDON')) {
        this._armageddonSweep(p, card);
        if (this.state.winner != null || this.state.phase === 'gameover') return { ok: true };
        this.state.pending = this._sealPending({ kind: 'coin', player: p.id, card: null, reason: 'armageddon', prompt: 'Wer beginnt erneut?' });
        return { ok: true, need: 'coin' };
      }
      if (this._defHas(def, 'COIN_PREVENT') || /Münze|muenzwurf|Kopf/i.test(def.text || '')) {

        this.state.pending = this._sealPending({ kind: 'coin', player: p.id, card, prompt: def.name }); // offene Wahl des Spielers
        return { ok: true, need: 'coin' };
      }
      if (this._isSectionEffect(def)) {
        const side = this._sectionTargetSide(def);
        let secTarget = this._coerceSectionTarget(p, targetUid, side);
        if (!secTarget) {
          const choices = this._sectionChoices(p, side);
          if (!choices.length) {
            p.hand.push(card);
            return { ok: false, error: 'Kein gültiger Abschnitt.', code: 'NO_SECTION' };
          }
          this.state.pending = this._sealPending({
            kind: 'instant-section',
            player: p.id,
            uid: card.uid,
            card,
            side,
            needCount: 1,
            selected: [],
            prompt: def.name + ' — Abschnitt wählen',
            choices: choices.map((t) => ({
              target: t.uid,
              section: t.section,
              side: t.side,
              label: t.label,
            })),
          });
          return { ok: true, need: 'target' };
        }
        this._resolveEffects(p, card, secTarget);
        p.grave.push(card);
        return { ok: true };
      }
      if (this._defHas(def, 'CLEAR_SUPPORT_OR_DEBUFF') && !targetUid) {
        const foe = this.opponent(p.id);
        const choices = [];
        (foe.support || []).forEach((s, i) => {
          if (!s) return;
          choices.push({ target: s.uid, label: 'Unterstützung: ' + this.defOf(s).name, supportIndex: i });
        });
        this.frontList(foe).forEach((l) => {
          choices.push({
            target: l.inst.uid,
            label: (l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name) + ' (−2 ATK)',
          });
        });
        if (!choices.length) {
          p.hand.push(card);
          return { ok: false, error: def.name + ' — keine Unterstützung und kein Ziel.', code: 'NO_TGT' };
        }
        this.state.pending = this._sealPending({
          kind: 'instant-target',
          player: p.id,
          uid: card.uid,
          card,
          needCount: 1,
          upto: false,
          selected: [],
          choices: choices.map((t) => ({ target: t.target, label: t.label, supportIndex: t.supportIndex })),
        });
        return { ok: true, need: 'target' };
      }
      // t267: direkt mitgegebenes Ziel (Ziehen auf ein Feld) muss die Zielbedingungen der Karte erfüllen
      if (targetUid && !this._instantTargetFilterOk(def, targetUid)) {
        p.hand.push(card);
        return { ok: false, error: def.name + ' — Ziel erfüllt die Bedingung nicht.', code: 'BAD_TGT' };
      }
      const needs = this._instantNeedsTarget(def);
      if (needs && !targetUid) {
        const choices = this._instantTargets(p, def);
        if (!choices.length) {
          p.hand.push(card);
          return { ok: false, error: def.name + ' — kein gültiges Ziel.', code: 'NO_TGT' };
        }
        const need = this._targetNeed(def);
        const capped = Math.max(1, Math.min(need.count || 1, choices.length));
        this.state.pending = this._sealPending({ // offene Wahl des Spielers
          kind: 'instant-target',
          player: p.id,
          uid: card.uid,
          card,
          needCount: capped, // an verfügbare Ziele kappen
          upto: need.upto,
          selected: [],
          choices: choices.map((t) => ({ target: t.uid, label: t.label })),
        });
        return { ok: true, need: 'target' };
      }
      this._ownBonusQueue = [];
      this._resolveEffects(p, card, targetUid); // Karteneffekte der Reihe nach
      if (this.state.pending && this.state.pending.kind === 'move-dest') {
        this.state.pending.card = card;
        return { ok: true, need: 'slot' };
      }
      const ob = this._openOwnBonus(p, card);
      if (ob) return ob;
      p.grave.push(card); // Friedhof
      return { ok: true };
    }
    /**
     * Welche Art von Ziel die Karte verlangt (Einheit, Abschnitt, keine).
     * @param {object} def
     * @returns {string|null}
     */
    _targetNeed(def) {
      if (def.target && def.target.count != null) return { count: Number(def.target.count), upto: !!def.target.upto };
      const t = def.text || '';
      const m = t.match(/[Bb]is\s*(\d+)/) || t.match(/(\d+)\s*[–-]\s*(\d+)/) || t.match(/(\d+)\s*(?:benachbarte|gegnerische|feindliche|Einheiten)/) || t.match(/\b[Zz]wei\b/);

      let count = 1;
      let upto = /bis\s*\d+/i.test(t) || /\d+\s*[–-]\s*\d+/.test(t);
      if (m) {
        if (m[0] && /^zwei$/i.test(m[0])) count = 2;
        else if (m[2]) { count = Number(m[2]); upto = true; }
        else count = Number(m[1]);
      }
      (def.effects || []).forEach((e) => {
        if (e.param && e.param.count) count = Number(e.param.count);
        if (e.param && e.param.upto) upto = true;
        if (e.param && e.param.then_destroy) count = Math.max(count, 1 + Number(e.param.then_destroy)); // Karte vom Feld auf den Friedhof
      });
      return { count: count || 1, upto: upto };
    }
    /**
     * Schließt einen Soforteinsatz nach der Zielwahl ab.
     * @param {number} pid
     * @param {object} pend
     * @param {string} targetUid
     */
    _finishInstant(pid, pend, targetUid) {
      const p = this.player(pid);
      const targets = Array.isArray(targetUid) ? targetUid : (targetUid ? [targetUid] : (pend.selected || []));

      this.state.pending = null;
      this._ownBonusQueue = [];
      if (!targets.length) this._resolveEffects(p, pend.card, null); // Karteneffekte der Reihe nach
      else targets.forEach((tid, i) => { // t212: zielfreie Effekte (Ziehen, Kosten, Aufdecken …) nur einmal
        this._fxRepeat = i > 0;
        try { this._resolveEffects(p, pend.card, tid); } finally { this._fxRepeat = false; }
      });
      // MOVE_SLOTS may have re-opened a move-dest pending — keep card until destination chosen
      if (this.state.pending && this.state.pending.kind === 'move-dest') {
        this.state.pending.card = pend.card;
        return { ok: true, need: 'slot' };
      }
      const ob = this._openOwnBonus(p, pend.card);
      if (ob) return ob;
      p.grave.push(pend.card); // Friedhof
      return { ok: true };
    }
    /**
     * t267: Öffnet nach einem Soforteinsatz die Wahl der eigenen Einheit für Effekte mit `param.side === 'own'`
     * (Kartentext: „Wähle eine gegnerische Fronteinheit: …; +1 ATK …“ – der Bonus gilt einer eigenen Einheit).
     * Bei genau einer eigenen Fronteinheit wird sofort angewendet; ohne eigene Front verfällt der Bonus.
     * @param {object} p Spieler
     * @param {object} card gespielte Karte
     * @returns {object|null} Ergebnis mit `need: 'target'`, wenn eine Wahl offen ist; sonst null (Karte noch nicht abgelegt)
     */
    _openOwnBonus(p, card) {
      const queue = this._ownBonusQueue || [];
      this._ownBonusQueue = [];
      if (!queue.length) return null;
      const own = this.frontList(p);
      if (!own.length) { this._log(this.defOf(card).name + ': keine eigene Fronteinheit für den Bonus.'); return null; }
      if (own.length === 1) { this._applyOwnBonus(p, queue, own[0].inst.uid, card); return null; }
      this.state.pending = this._sealPending({
        kind: 'own-bonus',
        player: p.id,
        card,
        effects: queue,
        prompt: this.defOf(card).name + ' — eigene Einheit wählen',
        choices: own.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name })),
      });
      return { ok: true, need: 'target' };
    }
    /**
     * t267: Wendet zurückgestellte Eigen-Effekte (`side: 'own'`) auf die gewählte eigene Einheit an.
     * @param {object} p Spieler
     * @param {object[]} effects Effektliste
     * @param {string} uid eigene Ziel-UID
     * @param {object} card Quellkarte
     */
    _applyOwnBonus(p, effects, uid, card) {
      this._ownBonusPhase = true;
      try { effects.forEach((e) => this._applyEffect(p, card, e, uid)); } finally { this._ownBonusPhase = false; }
      const loc = this.findInst(uid);
      if (loc) this._log(this.defOf(card).name + ': Bonus für ' + this.defOf(loc.inst).name + '.');
    }
    /**
     * Bestätigt eine Mehrfach-Zielwahl.
     * @param {number} pid
     * @param {object} a
     */
    _actConfirmTargets(pid, a) {
      const pend = this.state.pending; // offene Wahl des Spielers
      if (pend && pend.kind === 'rations' && pend.player === pid) {
        const pl = this.player(pid);
        if (pend.card) pl.grave.push(pend.card);
        this.state.pending = null;
        if (this.state.heldAttack) return this._resumeAfterReact();
        return { ok: true };
      }
      if (pend && pend.kind === 'honors' && pend.player === pid) return this._finishHonors(pid);
      if (pend && pend.kind === 'mass-pick' && pend.player === pid) return this._finishMassDeploy(pid);
      if (pend && pend.kind === 'mob-pick' && pend.player === pid) return this._finishMobPick(pid);
      if (pend && pend.kind === 'gassen-pick' && pend.player === pid) return this._gassenAfterPick(pid);
      if (pend && pend.kind === 'command-atk' && pend.player === pid) return this._resolveCommandStep(pid, null);
      if (!pend || pend.player !== pid || pend.kind !== 'instant-target') throw new Error('Keine Mehrfachwahl'); // Regelverstoß, Zug ungültig
      return this._finishInstant(pid, pend, pend.selected || []);
    }
    /**
     * Antwort auf den Eröffnungsmünzwurf (Startspieler).
     * @param {number} pid
     * @param {object} a
     */
    _actCoin(pid, a) {
      const pend = this.state.pending;
      if (!pend || pend.player !== pid || (pend.kind !== 'coin' && pend.kind !== 'angel-coin' && pend.kind !== 'resist-coin')) throw new Error('Kein Münzwurf');
      const face = this.rand() < 0.5 ? 'kopf' : 'zahl';
      const p = this.player(pid);
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
    /**
     * Effektcodes, die einen ganzen Abschnitt betreffen.
     * @returns {string[]}
     */
    _sectionEffectCodes() {
      return ['BUFF_SECTION', 'KEIN_LOCH', 'DAMAGE_SECTION', 'HEAL_SECTION', 'BOMBARD_SECTION'];
    }
    /**
     * True, wenn die Karte einen Abschnittseffekt hat.
     * @param {object} def
     * @returns {boolean}
     */
    _isSectionEffect(def) {
      return (def.effects || []).some((e) => this._sectionEffectCodes().includes(e.code));
    }
    /**
     * Zielseite eines Abschnittseffekts (`own`/`enemy`/beide).
     * @param {object} def
     * @returns {string}
     */
    _sectionTargetSide(def) {
      const fx = (def.effects || []).find((e) => e.targetSide || (e.param && e.param.targetSide));
      if (fx) return fx.targetSide || fx.param.targetSide;
      const codes = (def.effects || []).map((e) => e.code);
      // Einrück-Fallen (onEnter) liegen auf dem eigenen Abschnitt.
      if ((def.effects || []).some((e) => e.code === 'DAMAGE_SECTION' && e.param && e.param.onEnter)) return 'own';
      if (codes.some((c) => c === 'DAMAGE_SECTION' || c === 'BOMBARD_SECTION')) return 'enemy';
      if (codes.some((c) => c === 'BUFF_SECTION' || c === 'KEIN_LOCH' || c === 'HEAL_SECTION')) return 'own';
      const t = def.text || '';
      if (/gegner|feind/i.test(t) && /schaden|zerstör|bombard/i.test(t) && !/eigene/i.test(t)) return 'enemy';
      return 'own';
    }
    /**
     * Wählbare Abschnitte für die angegebene Seite.
     * @param {object} p
     * @param {string} side
     * @returns {object[]}
     */
    _sectionChoices(p, side) {
      const labels = { L: 'Links', C: 'Mitte', R: 'Rechts' };
      const sides = side === 'any' ? ['own', 'enemy'] : [side || 'own'];
      const out = [];
      sides.forEach((s) => {
        ['L', 'C', 'R'].forEach((sec) => {
          const who = s === 'own' ? 'Eigener' : 'Gegnerischer';
          out.push({
            uid: 'sec:' + s + ':' + sec,
            target: 'sec:' + s + ':' + sec,
            section: sec,
            side: s,
            label: who + ' Abschnitt ' + labels[sec],
          });
        });
      });
      return out;
    }
    /**
     * Liest eine Abschnittswahl aus einem Zieltoken.
     * @param {string} targetUid
     * @param {object} p
     * @returns {object|null}
     */
    _parseSectionTarget(targetUid, p) {
      if (targetUid == null) return null;
      if (typeof targetUid === 'object' && targetUid.section) {
        return {
          section: targetUid.section,
          side: targetUid.side || 'own',
          player: (targetUid.side === 'enemy') ? this.opponent(p.id) : p,
        };
      }
      const raw = String(targetUid);
      const m = raw.match(/^sec:(own|enemy|any):(L|C|R)$/);
      if (m) {
        const side = m[1] === 'any' ? 'own' : m[1];
        return {
          section: m[2],
          side,
          player: side === 'enemy' ? this.opponent(p.id) : p,
        };
      }
      const loc = this.findInst(targetUid);
      if (loc && loc.zone === 'front') {
        const side = loc.player.id === p.id ? 'own' : 'enemy';
        return { section: loc.section, side, player: loc.player, fromUnit: true };
      }
      return null;
    }
    /**
     * Normiert ein Abschnittsziel auf eine legale Wahl.
     * @param {object} p
     * @param {string} targetUid
     * @param {string} side
     * @returns {object}
     */
    _coerceSectionTarget(p, targetUid, side) {
      const parsed = this._parseSectionTarget(targetUid, p);
      if (!parsed) return null;
      if (side && side !== 'any' && parsed.side !== side) return null;
      return 'sec:' + parsed.side + ':' + parsed.section;
    }
    /**
     * Aktive Abschnittsauren in diesem Abschnitt.
     * @param {object} player
     * @param {string} section
     * @returns {object[]}
     */
    _activeSectionAuras(player, section) {
      const list = (player.flags && player.flags.sectionAuras) || [];
      return list.filter((a) => a.section === section && a.untilTurn >= this.state.turn);
    }
    /**
     * Wendet Abschnittsauren auf eine bereits oder neu eingesetzte Einheit an.
     * @param {object} player
     * @param {object} loc
     */
    _applySectionAuraToUnit(player, loc) {
      if (!loc || !loc.inst || loc.zone !== 'front') return;
      this._activeSectionAuras(player, loc.section).forEach((a) => {
        const d = this.defOf(loc.inst);
        if (a.filter === 'infanterie' && !isInfantry(d)) return;
        if (a.filter === 'artillerie' && !isArtillery(d)) return;
        if (a.filter === 'panzer' && !(hasTag(d, 'panzer') || d.typ === 'Panzer')) return;
        if (a.def && !(loc.inst.flags && loc.inst.flags._secAuraDef && loc.inst.flags._secAuraDef[a.id])) {
          loc.inst.def = (loc.inst.def || 0) + Number(a.def);
          loc.inst.defMax = (loc.inst.defMax || loc.inst.def) + Number(a.def);
          loc.inst.flags = loc.inst.flags || {};
          loc.inst.flags._secAuraDef = loc.inst.flags._secAuraDef || {};
          loc.inst.flags._secAuraDef[a.id] = Number(a.def);
        }
      });
    }
    /**
     * Legt eine Abschnittsaura an (endet typischerweise zum Zugende).
     * @param {object} player
     * @param {object} aura
     */
    _pushSectionAura(player, aura) {
      player.flags = player.flags || {};
      player.flags.sectionAuras = player.flags.sectionAuras || [];
      const id = 'sa-' + (this.state._auraSeq = (this.state._auraSeq || 0) + 1);
      const untilTurn = aura.until === 'next' ? (this.state.turn + 1) : this.state.turn;
      player.flags.sectionAuras.push(Object.assign({ id, untilTurn }, aura));
      return id;
    }
    /**
     * Entfernt abgelaufene Abschnittsauren des Spielers.
     * @param {object} player
     */
    _expireSectionAuras(player) {
      if (!player.flags || !player.flags.sectionAuras) return;
      player.flags.sectionAuras = player.flags.sectionAuras.filter((a) => a.untilTurn >= this.state.turn);
      if (player.flags.sectionBlockSupport && player.flags.sectionBlockSupport.until < this.state.turn) {
        player.flags.sectionBlockSupport = null;
      }
    }
    /**
     * True, wenn der Soforteinsatz ein Ziel braucht.
     * @param {object} def
     * @returns {boolean}
     */
    _instantNeedsTarget(def) {
      const codes = (def.effects || []).map((e) => e.code);
      const targeted = ['NO_MOVE_THIS_TURN', 'DEAL_DAMAGE', 'HEAL', 'DESTROY', 'DESTROY_IF_DEF', 'SACRIFICE', 'SACRIFICE_INFANTRY_DAMAGE', 'BUFF', 'SELF_DAMAGE', 'RETURN_TO_HAND', 'MOVE_FRONT', 'MOVE_SLOTS', 'OUT_OF_COMBAT', 'PLACE_TOKEN', 'REMOVE_TOKEN', 'REVEAL', 'MARK_OBSERVED', 'EXTRA_ATTACK', 'REPLACE_UNIT', 'BUFF_SECTION', 'ZIELANGRIFF', 'UMGEHEN', 'KEIN_LOCH', 'NEGATE_BONUS'];
      if (def.target && def.target.needs != null) return !!def.target.needs;
      if (codes.some((c) => targeted.includes(c))) return true;
      // Globale/Auto-Effekte: Kartentext-Heuristik nicht anwenden (verhindert Schein-Zielwahl + Mehrfach-Apply).
      const autoNoTarget = ['DRAW_THEN_CHOOSE_DISCARD', 'WILL_PEOPLE', 'MASS_DAMAGE', 'BUFF_ALL_OWN', 'DRAW', 'DRAW_DISCARD', 'DRAW_AP', 'COST_NEXT', 'PLAY_INF_DISCOUNT', 'CLEAR_ENEMY_SUPPORT', 'EMPTY_STREETS', 'LOOK_TOP', 'RETURN_INFANTRY_FROM_DISCARD', 'RETURN_UNIT_GRAVE', 'CANCEL_AIR_DAMAGE', 'COMMAND_ATTACK', 'ARMAGEDDON', 'GHOST_RUINS', 'CAVALRY_ATK', 'CLEAR_SUPPORT_OR_DEBUFF'];
      if (codes.length && codes.every((c) => autoNoTarget.includes(c))) return false;
      return /eine |gewählte|ziel|einheit|wähle/i.test(def.text || '');
    }
    /**
     * Legale Ziele für den Soforteinsatz.
     * @param {object} p
     * @param {object} def
     * @returns {object[]}
     */
    _instantTargets(p, def) {
      const out = [];
      const codes = (def.effects || []).map((e) => e.code);
      const hostile = codes.some((c) => ['DEAL_DAMAGE', 'DESTROY', 'DESTROY_IF_DEF', 'OUT_OF_COMBAT', 'ZIELANGRIFF', 'UMGEHEN', 'SACRIFICE_INFANTRY_DAMAGE'].includes(c))
        || (/gegner|feind|schaden|zerstör/i.test(def.text || '') && !/eigene/i.test(def.text || ''));
      const allowEnemy = (l) => !(hostile && this._hostileTargetBlocked(l.inst));
      const allUnits = () => {
        this.state.players.forEach((pl) => {
          this.frontList(pl).forEach((l) => {
            if (pl.id !== p.id && !allowEnemy(l)) return;
            out.push({ uid: l.inst.uid, label: (pl.id === p.id ? 'Eigene ' : 'Feind ') + (l.inst.facedown ? '???' : this.defOf(l.inst).name) });
            // verdeckte Lage
          });
        });
      };
      const text = (def.text || '') + ' ' + (def.effects || []).map((e) => e.code).join(' ');
      /* t212: strukturierte Zielseite (def.target.side) hat Vorrang vor der Textheuristik. */
      const tside = def.target && def.target.side;
      if (tside === 'own') { this.frontList(p).forEach((l) => out.push({ uid: l.inst.uid, label: this.defOf(l.inst).name })); }
      else if (tside === 'enemy') { this.frontList(this.opponent(p.id)).forEach((l) => { if (!allowEnemy(l)) return; out.push({ uid: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }); }); }
      else if (tside === 'all') { allUnits(); }
      else if (/eigene/i.test(def.text) && !/gegner/i.test(def.text)) {
        this.frontList(p).forEach((l) => out.push({ uid: l.inst.uid, label: this.defOf(l.inst).name }));
      } else if (/gegner|feind/i.test(def.text)) {
        this.frontList(this.opponent(p.id)).forEach((l) => {
          if (!allowEnemy(l)) return;
          out.push({ uid: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name }); // verdeckte Lage
        });
      } else {
        allUnits();
      }
      if (/minenfeld/i.test(text)) {
        this.state.players.forEach((pl) => {
          this.frontList(pl).forEach((l) => {
            if (l.inst.tokens.some((t) => t.type === 'minenfeld')) {
              out.push({ uid: l.inst.uid, label: 'Mine an ' + this.defOf(l.inst).name });
            }
          });
        });
      }
      // unique
      const seen = {};
      return out.filter(x=>!this._tacEffectTargetAllowed || this._tacEffectTargetAllowed(def,x.uid)).filter((x) => this._instantTargetFilterOk(def, x.uid)).filter((x) => (seen[x.uid] ? false : (seen[x.uid] = true)));
    }
    /**
     * t267: Zusatzbedingungen der Zielwahl aus `def.target` (Kartentext): `filter` ('elite', Tag oder Typ)
     * und `maxDef` (aktuelle DEF höchstens n, z. B. Opfergabe „mit 2 oder weniger DEF“).
     * @param {object} def Kartendefinition
     * @param {string} uid Ziel-UID
     * @returns {boolean} true, wenn das Ziel erlaubt ist
     */
    _instantTargetFilterOk(def, uid) {
      const t = def && def.target;
      if (!t || (t.filter == null && t.maxDef == null)) return true;
      const loc = this.findInst(uid);
      if (!loc || !loc.inst) return true;
      const d = this.defOf(loc.inst) || {};
      if (t.filter) {
        const f = String(t.filter);
        if (loc.inst.facedown) return false;
        if (f === 'elite' ? !this._isElite(d) : !(hasTag(d, f) || d.typ === f || d.klasse === f)) return false;
      }
      if (t.maxDef != null) {
        let dv = loc.inst.def;
        try { dv = this.currentAtkDef(loc.inst).def; } catch (e) { /* Rohwert */ }
        if (Number(dv) > Number(t.maxDef)) return false;
      }
      return true;
    }
    /**
     * Wertet die Effektliste einer Instanz der Reihe nach aus.
     * @param {object} p
     * @param {object} inst
     * @param {string} [targetUid]
     */
    _resolveEffects(p, inst, targetUid) { // Karteneffekte der Reihe nach
      const def = this.defOf(inst);
      this._evt('instant', def, p.name + ' spielt ' + def.name + '.'); // Ereignis für die Rundenübersicht
      const effects = def.effects && def.effects.length ? def.effects : this._inferEffects(def); // Effekt aus dem Fließtext raten
      effects.forEach((e) => this._applyEffect(p, inst, e, targetUid)); // einen Effect-Code ausführen
      // Soft-draw equipment: draw when a Soforteinsatz is played
      if (def.typ === 'Soforteinsatz') {
        const hasRevealFx = (def.effects || []).some((e) =>
          e.code === 'REVEAL' || e.code === 'REVEAL_STRIKE' || e.code === 'MARK_OBSERVED' || e.code === 'LOOK_HAND' || e.code === 'LOOK_TOP');
        if (hasRevealFx) p.flags = p.flags || {}, p.flags.playedRevealSofort = this.state.turn;
        this.frontList(p).forEach((l) => {
          (l.inst.attachments || []).forEach((eq) => {
            const ed = this.defOf(eq);
            (ed.effects || []).forEach((e) => {
              if (e.code !== 'EQUIP_SOFT_DRAW') return;
              if (eq.flags && eq.flags.softDrew === this.state.turn) return;
              const need = e.param && e.param.needRevealSofort;
              if (need && p.flags.playedRevealSofort !== this.state.turn) return;
              if (!need && need !== false && e.param && e.param.needRevealSofort === undefined) {
                // plain soft-draw: any Sofort
              }
              this._draw(p, Number((e.param || {}).draw || 1));
              eq.flags = eq.flags || {};
              eq.flags.softDrew = this.state.turn;
            });
          });
        });
      }
    }
    /**
     * Leitet Effektcodes aus der Definition ab, falls `effects` unvollständig ist (kein Textparser im Zug).
     * @param {object} def
     * @returns {object[]}
     */
    _inferEffects(def) { // Effekt aus dem Fließtext raten
      const t = def.text || '';
      const out = [];
      const dmg = t.match(/(\d+)\s*Schaden/i);
      if (dmg && !/Allen Feinden/i.test(t)) out.push({ code: 'DEAL_DAMAGE', param: { value: +dmg[1] } });
      if (/Allen Feinden\s*(\d+)\s*Schaden/i.test(t)) out.push({ code: 'MASS_DAMAGE', param: { value: +t.match(/Allen Feinden\s*(\d+)/i)[1] } });
      const draw = t.match(/ziehe\s*(\d+)/i) || t.match(/(\d+)\s*Karten?/i);
      if (/zieh/i.test(t) && draw) out.push({ code: 'DRAW', param: { value: +draw[1] } });
      if (/AP/.test(t) && /erhält|erhalt|gewinnt/i.test(t)) {
        const ap = t.match(/(\d+)\s*AP/i);
        if (ap) out.push({ code: 'GAIN_AP', param: { value: +ap[1] } });
      }
      const heal = t.match(/Heile\s*(\d+)/i);
      if (heal) out.push({ code: 'HEAL', param: { value: +heal[1] } });
      const atk = t.match(/\+(\d+)\s*ATK/i);
      if (atk && /bis Zugende|diesen Zug/i.test(t)) out.push({ code: 'BUFF', param: { atk: +atk[1], until: 'turn' } });
      const defb = t.match(/\+(\d+)\s*DEF/i);
      if (defb && /bis Zugende|diesen Zug/i.test(t) && !atk) out.push({ code: 'BUFF', param: { def: +defb[1], until: 'turn' } });
      if (/Träger\s*\+(\d+)\s*ATK|Träger\s*\+(\d+)\s*DEF/i.test(t)) {
        const a = t.match(/Träger[^]*?\+(\d+)\s*ATK/i);
        const d = t.match(/Träger[^]*?\+(\d+)\s*DEF/i);
        out.push({ code: 'EQUIP_STAT', param: { atk: a ? +a[1] : 0, def: d ? +d[1] : 0 } });
      }
      return out;
    }
    
    // --- Effektauflösung und Eintritt ---
/**
     * Führt einen einzelnen strukturierten Effektcode aus (Schaden, Ziehen, Buff, Aura, …).
     * Seiteneffekt: ändert Instanzen und ggf. pending.
     * @param {object} p Quelle-Spieler
     * @param {object} src Quellinstanz oder -karte
     * @param {object} e Effekt `{code, param, …}`
     * @param {string} [targetUid]
     */
    _applyEffect(p, src, e, targetUid) { // einen Effect-Code ausführen
      // t267: Eigen-Bonus eines Soforteinsatzes mit Feindziel wird zurückgestellt und nach der Zielwahl einer eigenen Einheit gegeben.
      if (e.param && e.param.side === 'own' && !this._ownBonusPhase && Array.isArray(this._ownBonusQueue)) {
        if (!this._fxRepeat) this._ownBonusQueue.push(e);
        return;
      }
      if (this._fxRepeat && !PER_TARGET_CODES.includes(e.code)) return;
      if (this._tacApplyEffect && this._tacApplyEffect(p.id,e,src,targetUid)) return;
      const code = e.code;
      const par = e.param || {};
      const opp = this.opponent(p.id);
      if (code === 'DRAW') this._draw(p, Number(par.value || 1)); // Karten vom Deck auf die Hand
      else if (code === 'GAIN_AP') p.ap += Number(par.value || 1);
      else if (code === 'DEAL_DAMAGE') {
        const loc = this.findInst(targetUid);
        if (loc && this._hostileTargetBlocked(loc.inst) && loc.player.id !== p.id) {
          this._log(this.defOf(loc.inst).name + ' ist eingegraben — gezielter Schaden verpufft.');
        } else if (loc) this._damage(loc.inst, Number(par.value || 1), { tag: par.tag }); // Verteidigung verringern
      } else if (code === 'HEAL') {
        const v = Number(par.value || par.host || 1);
        if (par.all) {
          this.frontList(p).forEach((l) => {
            const d = this.defOf(l.inst);
            if (par.filter) {
              const ok = String(par.filter).split('|').some((f) =>
                (f === 'panzer' && (hasTag(d, 'panzer') || d.typ === 'Panzer')) ||
                (f === 'artillerie' && (isArtillery(d) || d.typ === 'Artillerie'))
              );
              if (!ok) return;
            }
            l.inst.def = Math.min(l.inst.defMax || l.inst.def, (l.inst.def || 0) + v);
          });
        } else {
          const loc = this.findInst(targetUid);
          if (loc) loc.inst.def = Math.min(loc.inst.defMax || loc.inst.def, (loc.inst.def || 0) + v);
        }
      } else if (code === 'DESTROY') {
        const loc = this.findInst(targetUid);
        if (loc && this._hostileTargetBlocked(loc.inst) && loc.player.id !== p.id) {
          this._log(this.defOf(loc.inst).name + ' ist eingegraben — Zerstörung verpufft.');
        } else if (loc) this._destroy(loc); // Karte vom Feld auf den Friedhof
      } else if (code === 'SACRIFICE') {
        const loc = this.findInst(targetUid);
        if (loc && loc.player.id === p.id) {
          const sec = loc.section;
          this._lastSacrifice = { pid: p.id, section: sec, row: loc.row, ap: Number(this.defOf(loc.inst).ap) || 0 };
          this._destroy(loc); // Karte vom Feld auf den Friedhof
          if (par.section_buff_atk) {
            this.frontList(p).forEach((l) => {
              if (l.section !== sec) return;
              l.inst.flags = l.inst.flags || {};
              l.inst.flags.tempAtk = (l.inst.flags.tempAtk || 0) + Number(par.section_buff_atk || 0);
              l.inst.flags.tempAtkUntil = this.state.turn;
            });
          }
          // t267: Feinde nur zerstören, wenn die Karte es ausdrücklich sagt (`then_destroy`); vorher Vorgabe 2 (Opfergabe/Ablösung).
          if (!par.no_enemy_destroy && Number(par.then_destroy) > 0) {
            const n = Number(par.then_destroy); // Karte vom Feld auf den Friedhof
            const enemies = this.frontList(opp).slice(0, n);
            enemies.forEach((en) => this._destroy({ inst: en.inst, player: opp, zone: 'front', section: en.section, row: en.row }));
          }
        }
      } else if (code === 'BUFF') {
        let loc = this.findInst(targetUid);
        if (!loc && par.enemy) {
          const foeU = this.frontList(opp)[0];
          if (foeU) loc = foeU;
        }
        if (!loc && !par.enemy) {
          const own = this.frontList(p)[0];
          if (own) loc = own;
        }
        if (loc) {
          const inst = loc.inst || loc;
          inst.flags = inst.flags || {};
          if (par.until === 'turn') {
            inst.flags.tempAtk = (inst.flags.tempAtk || 0) + Number(par.atk || 0);
            inst.flags.tempAtkUntil = this.state.turn;
          } else {
            inst.flags.buffAtk = (inst.flags.buffAtk || 0) + Number(par.atk || 0);
          }
          if (par.def && Number(par.def) > 0) {
            inst.def = (inst.def || 0) + Number(par.def);
            inst.defMax = (inst.defMax || inst.def) + Number(par.def);
          } else if (par.def && Number(par.def) < 0) {
            inst.def = Math.max(1, (inst.def || 0) + Number(par.def));
          }
        }
      } else if (code === 'REVEAL' && par.targeted) {
        // t267: gezieltes Aufdecken (Stillprobe): genau die gewählte Einheit
        const loc = this.findInst(targetUid);
        if (loc && loc.inst.facedown) { loc.inst.facedown = false; this._log('Aufgedeckt: ' + this.defOf(loc.inst).name); }
      } else if (code === 'REVEAL') {
        const n = Number(par.count || 1);
        let revealed = 0;
        this.frontList(opp).forEach((l) => {
          if (l.inst.facedown && revealed < n) { // verdeckte Lage
            l.inst.facedown = false; // verdeckte Lage
            revealed += 1;
            if (par.observe) { l.inst.flags = l.inst.flags || {}; l.inst.flags.observed = true; }
            this._log('Aufgedeckt: ' + this.defOf(l.inst).name); // Zeile ins Protokoll
          }
        });
        /* t255: `observe` – ohne verdeckten Feind wird ein noch nicht beobachteter Feind als beobachtet markiert. */
        if (par.observe && revealed < n) {
          this.frontList(opp).filter((l) => !(l.inst.flags && l.inst.flags.observed)).slice(0, n - revealed).forEach((l) => {
            l.inst.flags = l.inst.flags || {}; l.inst.flags.observed = true;
            this._log('Beobachtet: ' + this.defOf(l.inst).name);
          });
        }
      } else if (code === 'SEARCH_DECK' || code === 'PLAY_FREE') {
        const want = code === 'PLAY_FREE' ? 99 : Number(par.count || 1);
        const fromHand = code === 'PLAY_FREE';
        const pool = fromHand ? p.hand.slice() : p.deck.slice(); // Handkarten
        const units = pool.filter((c) => this.defOf(c).typ === 'Einheit');
        let placed = 0;
        units.forEach((c) => {
          if (placed >= want) return;
          const slot = this.emptySlots(p)[0];
          if (!slot) return;
          if (this._tacPayFreeEntry && !this._tacPayFreeEntry(p,c,slot.section)) return;
          if (fromHand) p.hand = p.hand.filter((x) => x.uid !== c.uid); // Handkarten
          else p.deck = p.deck.filter((x) => x.uid !== c.uid);
          p.front[slot.section][slot.row] = c;
          if (this._tacOnEntry) this._tacOnEntry(c,slot.section);
          placed += 1;
          this._log(this.defOf(c).name + ' kommt kostenlos auf ' + slot.section + (slot.row + 1) + '.'); // Zeile ins Protokoll
        });
      } else if (code === 'PLACE_TOKEN') {
        const loc = this.findInst(targetUid);
        const typ = String(par.token || defToken(par) || 'minenfeld').toLowerCase();
        if (loc && loc.zone === 'front') {
          loc.inst.tokens.push({ type: typ, charges: typ === 'minenfeld' ? 2 : 2 });
          this._log('Token ' + typ + ' auf ' + this.defOf(loc.inst).name); // Zeile ins Protokoll
        }
      } else if (code === 'REMOVE_TOKEN') {
        const loc = this.findInst(targetUid);
        if (loc) loc.inst.tokens = loc.inst.tokens.filter((t) => t.type !== 'minenfeld');
      } else if (code === 'OUT_OF_COMBAT') {
        const loc = this.findInst(targetUid);
        if (loc) { loc.inst.flags.noAttack = true; if (loc.player.id !== p.id) loc.inst.flags.noAttackHold = true; } // t212: wirkt im nächsten gegnerischen Zug
      } else if (code === 'RETURN_TO_HAND') {
        const loc = this.findInst(targetUid);
        if (loc && loc.zone === 'front') {
          if (this._tacAssertMove) this._tacAssertMove(loc.inst);
          if (this._tacDepart) this._tacDepart(loc.inst,true);
          loc.player.front[loc.section][loc.row] = null;
          loc.player.hand.push(loc.inst); // Handkarten
        }
      } else if (code === 'LOOK_HAND') {
        this._log('Hand des Gegners: ' + opp.hand.map((c) => this.defOf(c).name).join(', ') || '(leer)'); // Zeile ins Protokoll
      } else if (code === 'LOOK_TOP') {
        const n = Number(par.count || 2);
        if (par.infantryToHand && p.deck.length) {
          const top = p.deck[0];
          const td = this.defOf(top);
          p.deck.shift();
          if (isInfantry(td) || td.typ === 'Infanterie') { p.hand.push(top); this._log(td.name + ' auf die Hand.'); }
          else { p.grave.push(top); this._log(td.name + ' abgeworfen.'); }
        } else {
          this._log('Deckspitze: ' + p.deck.slice(0, n).map((c) => this.defOf(c).name).join(', '));
        }
      } else if (code === 'MASS_DAMAGE') {
        this.frontList(opp).forEach((l) => this._damage(l.inst, Number(par.value || 1), { tag: par.tag || 'mass' }));
      } else if (code === 'DAMAGE_SECTION') {
        const sideWant = par.targetSide || 'enemy';
        let parsed = this._parseSectionTarget(targetUid, p);
        if (parsed && sideWant && sideWant !== 'any' && parsed.side !== sideWant) {
          // try coerce to requested side with same letter
          if (parsed.section) parsed = { section: parsed.section, side: sideWant, player: sideWant === 'enemy' ? opp : p };
        }
        if (!parsed) {
          this._log('Abschnitts-Schaden ohne gültigen Abschnitt.');
        } else if (par.onEnter) {
          const host = p;
          host.flags = host.flags || {};
          host.flags.sectionEnterDamage = host.flags.sectionEnterDamage || [];
          host.flags.sectionEnterDamage.push({
            section: parsed.section,
            value: Number(par.value || 1),
            until: this.state.turn + 1,
            by: p.id,
          });
          this._log('Abschnitt ' + parsed.section + ': Einrückende erleiden ' + Number(par.value || 1) + ' Schaden.');
        } else {
          const host = parsed.player;
          this.frontList(host).filter((l) => l.section === parsed.section).forEach((l) => {
            this._damage(l.inst, Number(par.value || 1), { tag: par.tag || 'section' });
          });
        }
      } else if (code === 'DESTROY_IF_DEF') {
        const loc = this.findInst(targetUid);
        if (loc && this._hostileTargetBlocked(loc.inst) && loc.player.id !== p.id) {
          this._log(this.defOf(loc.inst).name + ' ist eingegraben — Zerstörung verpufft.');
        } else if (loc) {
          const st = this.currentAtkDef(loc.inst);
          if (st.def <= Number(par.maxDef || 2)) this._destroy(loc);
          else this._log(this.defOf(loc.inst).name + ' hat zu viel DEF.');
        }
      } else if (code === 'BUFF_ALL_OWN') {
        const filter = par.filter;
        // t283: Param `vs_observed` – eine gegnerische Fronteinheit gilt danach als beobachtet (verdeckte zuerst, sonst stärkste).
        if (par.vs_observed) {
          const foes = this.frontList(this.opponent(p.id)).filter((l) => !(l.inst.flags && l.inst.flags.observed));
          foes.sort((x, y) => ((y.inst.facedown ? 1 : 0) - (x.inst.facedown ? 1 : 0)) || ((Number(this.defOf(y.inst).atk) || 0) - (Number(this.defOf(x.inst).atk) || 0)));
          if (foes[0]) { foes[0].inst.flags = foes[0].inst.flags || {}; foes[0].inst.flags.observed = true; this._log('Planfeuer: ' + (foes[0].inst.facedown ? 'verdeckte Einheit' : this.defOf(foes[0].inst).name) + ' gilt als beobachtet.'); }
        }
        const units = this.frontList(p);
        units.forEach((l) => {
          const d = this.defOf(l.inst);
          if (filter === 'infanterie' && !isInfantry(d)) return;
          if (filter === 'artillerie' && !isArtillery(d)) return;
          if (filter === 'panzer' && !(hasTag(d, 'panzer') || d.typ === 'Panzer')) return;
          if (par.atk) {
            if (par.until === 'turn' || par.until === 'next') {
              l.inst.flags.tempAtk = (l.inst.flags.tempAtk || 0) + Number(par.atk);
              l.inst.flags.tempAtkUntil = par.until === 'next' ? (this.state.turn + 1) : this.state.turn;
            } else {
              l.inst.flags.buffAtk = (l.inst.flags.buffAtk || 0) + Number(par.atk);
            }
          }
          if (par.def) {
            l.inst.def = (l.inst.def || 0) + Number(par.def);
            l.inst.defMax = (l.inst.defMax || l.inst.def) + Number(par.def);
          }
        });
      } else if (code === 'BUFF_SECTION') {
        const filter = par.filter;
        const sideWant = par.targetSide || 'own';
        let parsed = this._parseSectionTarget(targetUid, p);
        if (parsed && sideWant && sideWant !== 'any' && parsed.side !== sideWant) {
          this._log('Abschnitt-Bonus: Zielseite ungültig.');
          parsed = null;
        }
        if (!parsed) {
          this._log('Abschnitt-Bonus ohne gültigen Abschnitt.');
        } else {
          const host = parsed.player;
          const section = parsed.section;
          const auraId = this._pushSectionAura(host, {
            section,
            atk: Number(par.atk || 0),
            def: Number(par.def || 0),
            filter: filter || null,
            until: par.until || 'turn',
            bakedDef: !!par.def,
          });
          let applied = 0;
          this.frontList(host).filter((l) => l.section === section).forEach((l) => {
            const d = this.defOf(l.inst);
            if (filter === 'infanterie' && !isInfantry(d)) return;
            if (filter === 'artillerie' && !isArtillery(d)) return;
            if (filter === 'panzer' && !(hasTag(d, 'panzer') || d.typ === 'Panzer')) return;
            l.inst.flags = l.inst.flags || {};
            if (par.atk) {
              // ATK comes from section aura in currentAtkDef; mark so we know unit was present
              l.inst.flags._secAuraAtk = l.inst.flags._secAuraAtk || {};
              l.inst.flags._secAuraAtk[auraId] = Number(par.atk);
            }
            if (par.def) {
              l.inst.def = (l.inst.def || 0) + Number(par.def);
              l.inst.defMax = (l.inst.defMax || l.inst.def) + Number(par.def);
              l.inst.flags._secAuraDef = l.inst.flags._secAuraDef || {};
              l.inst.flags._secAuraDef[auraId] = Number(par.def);
            }
            applied += 1;
          });
          const srcText = (this.defOf(src) || {}).text || '';
          if (/kann hier.*keine Unterstützung|Feind kann hier diesen Zug keine Unterstützung/i.test(srcText) || par.blockEnemySupport) {
            const foe = host.id === p.id ? this.opponent(p.id) : p;
            // Block enemy from playing support "here" — treat as opponent of the buffed side
            const blocked = this.opponent(host.id);
            blocked.flags = blocked.flags || {};
            blocked.flags.sectionBlockSupport = { section, until: this.state.turn };
          }
          this._log('Abschnitt ' + section + ': Bonus' + (par.atk ? ' +' + par.atk + ' ATK' : '') + (par.def ? ' +' + par.def + ' DEF' : '') + ' (' + applied + ' Einheiten, Aura aktiv).');
        }
      } else if (code === 'DRAW_DISCARD') {
        this._draw(p, Number(par.draw || 2));
        // discard leftmost / first hand card as auto-choice if no pending UI
        if (p.hand.length && Number(par.discard || 1) > 0) {
          const dumped = p.hand.shift();
          p.grave.push(dumped);
          this._log('Abgeworfen: ' + this.defOf(dumped).name);
        }
      } else if (code === 'COST_NEXT') {
        p.flags = p.flags || {};
        p.flags.costNext = p.flags.costNext || [];
        p.flags.costNext.push({ type: par.type || 'Einheit', amount: Number(par.amount || 1), fromGrave: !!par.fromGrave });
        // t212: kein zusätzlicher tacticDiscount mehr – costNext trägt den Rabatt allein (vorher doppelt).
      } else if (code === 'SELF_DAMAGE') {
        const loc = this.findInst(targetUid) || this.frontList(p)[0];
        if (loc && loc.inst) this._damage(loc.inst, Number(par.value || 1), { tag: 'self' });
        else if (loc) this._damage(loc, Number(par.value || 1), { tag: 'self' });
      } else if (code === 'EXTRA_ATTACK') {
        const loc = this.findInst(targetUid);
        if (loc) { loc.inst.attackUsed = false; loc.inst.flags.exhausted = false; loc.inst.flags.extraAtk = true; }
      } else if (code === 'RETURN_UNIT_GRAVE') {
        const want = String(par.filter || '');
        const ix = p.grave.findIndex((c) => {
          const d = this.defOf(c);
          if (!want) return d.typ !== 'Soforteinsatz' && d.typ !== 'Ausrüstung';
          return want.split('|').some((f) => (f === 'panzer' && (hasTag(d, 'panzer') || d.typ === 'Panzer')) || (f === 'artillerie' && (isArtillery(d) || d.typ === 'Artillerie')));
        });
        if (ix >= 0) {
          const c = p.grave[ix], slot = this.emptySlots(p)[0];
          if (slot && this._tacPayFreeEntry && !this._tacPayFreeEntry(p,c,slot.section)) return;
          p.grave.splice(ix,1);
          c.def = Number(par.def || 2);
          c.defMax = Number(par.def || 2);
          if (slot) { p.front[slot.section][slot.row] = c; if (this._tacOnEntry) this._tacOnEntry(c,slot.section); this._log(this.defOf(c).name + ' kehrt zurück.'); }
          else p.hand.push(c);
        }
      } else if (code === 'MOVE_SLOTS') {
        const loc = this.findInst(targetUid);
        if (loc && loc.zone === 'front' && loc.player.id === p.id) {
          if (this._tacAssertMove) this._tacAssertMove(loc.inst);
          const maxStep = Math.max(1, Number(par.slots || par.value || 1));
          const order = ['L', 'C', 'R'];
          const i = order.indexOf(loc.section);
          const choices = [];
          for (let d = -maxStep; d <= maxStep; d++) {
            if (!d) continue;
            const ni = i + d;
            if (ni < 0 || ni > 2) continue;
            const sec = order[ni];
            if (!p.front[sec][loc.row]) {
              choices.push({
                target: 'slot:' + sec + ':' + loc.row,
                slot: { section: sec, row: loc.row },
                label: sec + (loc.row + 1),
              });
            }
          }
          if (choices.length === 1) {
            const dest = choices[0].slot;
            if (this._tacDepart) this._tacDepart(loc.inst,false);
            p.front[loc.section][loc.row] = null;
            p.front[dest.section][dest.row] = loc.inst;
            if (this._tacOnEntry) this._tacOnEntry(loc.inst,dest.section,loc.section);
            this._log(this.defOf(loc.inst).name + ' → ' + dest.section + (dest.row + 1));
          } else if (choices.length > 1) {
            // Queue destination choice (finishInstant may have cleared pending; re-open)
            const prev = this.state.pending;
            this.state.pending = this._sealPending({
              kind: 'move-dest',
              player: p.id,
              uid: loc.inst.uid,
              fromS: loc.section,
              fromR: loc.row,
              card: prev && prev.card,
              prompt: 'Neues Feld wählen',
              choices,
            });
          }
        }
      } else if (code === 'PLAY_INF_DISCOUNT') {
        p.flags = p.flags || {};
        p.flags.costNext = p.flags.costNext || [];
        p.flags.costNext.push({ type: 'Infanterie', amount: Number(par.amount || 1) });
      } else if (code === 'MARK_OBSERVED' || code === 'REVEAL_STRIKE') {
        const loc = this.findInst(targetUid);
        if (loc) { loc.inst.facedown = false; loc.inst.flags.observed = true; }
        else {
          let n = Number(par.count || 1);
          this.frontList(opp).forEach((l) => { if (n > 0) { l.inst.facedown = false; l.inst.flags.observed = true; n -= 1; } });
        }
      } else if (code === 'CLEAR_SUPPORT_OR_DEBUFF') {
        const foe = this.opponent(p.id);
        let cleared = false;
        if (targetUid != null) {
          const six = (foe.support || []).findIndex((x) => x && x.uid === targetUid);
          if (six >= 0) {
            const card = foe.support[six];
            foe.support[six] = null;
            foe.grave.push(card);
            this._log('Unterstützung entfernt: ' + this.defOf(card).name);
            cleared = true;
          } else {
            const loc = this.findInst(targetUid);
            if (loc) {
              loc.inst.flags = loc.inst.flags || {};
              loc.inst.flags.buffAtk = (loc.inst.flags.buffAtk || 0) - 2;
              this._log(this.defOf(loc.inst).name + ': −2 ATK');
              cleared = true;
            }
          }
        }
        if (!cleared) {
          const ix = (foe.support || []).findIndex((x) => x);
          if (ix >= 0) {
            const card = foe.support[ix];
            foe.support[ix] = null;
            foe.grave.push(card);
            this._log('Unterstützung entfernt: ' + this.defOf(card).name);
          }
        }
      } else if (code === 'DRAW_AND_PLAY_INFANTRY') {
        const ix = p.deck.findIndex((c) => isInfantry(this.defOf(c)) || this.defOf(c).typ === 'Infanterie');
        if (ix >= 0) {
          const c = p.deck.splice(ix, 1)[0];
          p.hand.push(c);
          p.flags = p.flags || {};
          p.flags.freePlayInfUid = c.uid;
          this._log('Marschbefehl: ' + this.defOf(c).name + ' auf die Hand (spielbar).');
        }
      } else if (code === 'RETURN_INFANTRY_FROM_DISCARD') {
        const ix = p.grave.findIndex((c) => isInfantry(this.defOf(c)) || this.defOf(c).typ === 'Infanterie');
        if (ix >= 0) { const c = p.grave.splice(ix, 1)[0]; p.hand.push(c); }
      } else if (code === 'SACRIFICE_INFANTRY_DAMAGE') {
        // targetUid is enemy; sacrifice cheapest own infantry first
        const own = this.frontList(p).find((l) => isInfantry(this.defOf(l.inst)));
        if (own) this._destroy(own);
        const loc = this.findInst(targetUid);
        if (loc) this._damage(loc.inst, Number(par.damage || 3), { tag: 'sacrifice' });
      } else if (code === 'REPLACE_UNIT') {
        // t267 (Ablösung): Einheit aus der Hand in denselben Abschnitt wie die geopferte, Kosten bis Kosten der Zerstörten + costPlus; danach heilen.
        const sac = this._lastSacrifice && this._lastSacrifice.pid === p.id ? this._lastSacrifice : null;
        this._lastSacrifice = null;
        if (!sac) return;
        const maxAp = sac.ap + Number(par.costPlus != null ? par.costPlus : 1);
        let slot = !p.front[sac.section][sac.row] ? { section: sac.section, row: sac.row } : this.emptySlots(p).find((x) => x.section === sac.section);
        const isUnit = (d) => d.typ === 'Infanterie' || d.typ === 'Panzer' || d.typ === 'Artillerie' || d.typ === 'Einheit' || d.typ === 'Elite' || d.typ === 'Aufklärung';
        const pool = p.hand.filter((c) => { const d = this.defOf(c); return isUnit(d) && (Number(d.ap) || 0) <= maxAp; });
        // stärkste erlaubte Einheit: höchste Kosten, dann ATK+DEF
        pool.sort((a, b) => { const da = this.defOf(a), db = this.defOf(b); return ((Number(db.ap) || 0) - (Number(da.ap) || 0)) || (((Number(db.atk) || 0) + (Number(db.def) || 0)) - ((Number(da.atk) || 0) + (Number(da.def) || 0))); });
        const handU = pool[0];
        if (slot && handU && (!this._tacPayFreeEntry || this._tacPayFreeEntry(p,handU,slot.section))) {
          p.hand = p.hand.filter((c) => c.uid !== handU.uid);
          handU.def = (handU.def || this.defOf(handU).def || 1);
          handU.defMax = handU.defMax || handU.def;
          handU.summonedTurn = this.state.turn;
          p.front[slot.section][slot.row] = handU;
          if (this._tacOnEntry) this._tacOnEntry(handU,slot.section);
          if (par.heal) this._heal(handU, Number(par.heal));
          this._log(this.defOf(handU).name + ' löst ab (' + slot.section + (slot.row + 1) + ').');
        } else {
          this._log('Ablösung: keine passende Einheit auf der Hand.');
        }
      } else if (code === 'ON_ENTER_DRAW') {
        this._draw(p, Number(par.value || 1));
      } else if (code === 'ON_ENTER_BUFF') {
        if (par.heal) {
          const loc = this.findInst(targetUid);
          if (loc) loc.inst.def = Math.min(loc.inst.defMax || loc.inst.def, (loc.inst.def || 0) + Number(par.heal));
        }
        if (par.atk) {
          this.frontList(p).forEach((l) => {
            l.inst.flags.buffAtk = (l.inst.flags.buffAtk || 0) + Number(par.atk);
            l.inst.flags.ehrenUntil = this.state.turn;
          });
        }
      } else if (code === 'ZIELANGRIFF') {
        const loc = this.findInst(targetUid);
        if (loc) {
          loc.inst.flags = loc.inst.flags || {};
          loc.inst.flags.zielangriff = {
            until: this.state.turn,
            firstDmgBonus: Number(par.firstDmgBonus || 1),
            attackerDef: Number(par.attackerDef || 1),
            drawOnKill: Number(par.drawOnKill || 1),
            owner: p.id,
            firstHitDone: false,
          };
          this._log('Zielangriff markiert ' + this.defOf(loc.inst).name + '.');
        }
      } else if (code === 'UMGEHEN') {
        const loc = this.findInst(targetUid);
        if (loc) {
          loc.inst.flags = loc.inst.flags || {};
          loc.inst.flags.umgehenUntil = this.state.turn;
          this.frontList(p).forEach((l) => {
            l.inst.flags.umgehenAtk = Number(par.atk || 1);
            l.inst.flags.umgehenAtkUntil = this.state.turn;
          });
          this._log('Umgehen: ' + this.defOf(loc.inst).name + ' gilt als angrenzend; +' + (par.atk || 1) + ' ATK.');
        }
      } else if (code === 'KEIN_LOCH') {
        let parsed = this._parseSectionTarget(targetUid, p);
        if (parsed && parsed.side !== 'own') parsed = null;
        const sec = parsed ? parsed.section : ((this.frontList(p)[0] || {}).section);
        if (sec) {
          p.flags = p.flags || {};
          p.flags.keinLoch = {
            section: sec,
            until: this.state.turn,
            left: Number(par.negate || 2),
            heal: Number(par.heal || 1),
            destroyed: false,
          };
          this._pushSectionAura(p, {
            section: sec,
            atk: 0,
            def: 0,
            filter: null,
            until: 'turn',
            kind: 'kein_loch',
            bakedDef: false,
          });
          this._log('Kein Loch schützt Abschnitt ' + sec + '.');
        } else {
          this._log('Kein Loch ohne Abschnitt — kein Effekt.');
        }
      } else if (code === 'NEGATE_BONUS' || (code === 'CLEAR_ATK_MALUS' && par.negateBonus)) {
        const loc = this.findInst(targetUid);
        if (loc && loc.zone === 'front') this._negateBonus(loc.inst);
      } else if (code === 'CLEAR_ATK_MALUS') {
        const loc = this.findInst(targetUid);
        if (loc) {
          loc.inst.flags = loc.inst.flags || {};
          if (loc.inst.flags.buffAtk < 0) loc.inst.flags.buffAtk = 0;
          if (loc.inst.flags.tempAtk < 0) loc.inst.flags.tempAtk = 0;
        }
      }
      // BUFF with until/enemy already partially handled — extend base BUFF
    }
    /**
     * t267: „Negiere einen Bonus“ (NEGATE_BONUS). Entfernt gespeicherte ATK-Boni (dauerhaft und bis Zugende) und
     * DEF über dem Druckwert sofort; laufende Boni (Auren, Ausrüstung, Schlüsselwörter, Doktrinen) zählen bis zum Ende
     * des nächsten gegnerischen Zugs nicht (`flags.bonusNegatedUntil`, ausgewertet in `currentAtkDef`). Mali bleiben.
     * @param {object} inst Ziel-Instanz
     */
    _negateBonus(inst) {
      const d = this.defOf(inst) || {};
      const pd = Number(d.def) || 0;
      inst.flags = inst.flags || {};
      const f = inst.flags;
      if ((f.buffAtk || 0) > 0) f.buffAtk = 0;
      if ((f.tempAtk || 0) > 0) f.tempAtk = 0;
      if ((f.buffDef || 0) > 0) f.buffDef = 0;
      if (inst.defMax != null && inst.defMax > pd) inst.defMax = pd;
      if (inst.def != null && inst.def > pd) inst.def = Math.max(1, pd);
      f.bonusNegatedUntil = this.state.turn + 1;
      this._log('Bonus negiert: ' + (inst.facedown ? 'verdeckte Einheit' : d.name) + '.');
    }
    /**
     * Wendet mechanisierte Auren (MECH_AURA) an.
     * @param {object} p
     */
    _applyMech(p) {
      this.frontList(p).forEach((l) => {
        if (!isInfantry(this.defOf(l.inst))) return;
        const n = this._neighbors(p, l.section, l.row).filter((x) => x.inst && this._defHas(this.defOf(x.inst), 'MECH_AURA')).length;
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
    /**
     * Wendet Führungs-Auren (FUEHRUNG_V) an.
     * @param {object} p
     */
    _applyFuehrung(p) {
      this.frontList(p).forEach((l) => {
        if (!this._defHas(this.defOf(l.inst), 'FUEHRUNG_V')) return;
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
    /**
     * Wendet Flanken-DEF (FLANK_DEF) an.
     * @param {object} p
     */
    _applyFlankDef(p) {
      this.frontList(p).forEach((l) => {
        const want = this._neighbors(p, l.section, l.row).filter((n) => n.inst && this._defHas(this.defOf(n.inst), 'FLANK_DEF')).length * 2;
        const prev = l.inst.flags.flankDef || 0;
        const d = want - prev;
        if (d) {
          l.inst.def = (l.inst.def || 0) + d;
          l.inst.defMax = (l.inst.defMax || l.inst.def) + d;
          l.inst.flags.flankDef = want;
        }
      });
    }
    /**
     * Anzahl aktiver Satelliten-/Aufklärungsquellen.
     * @param {object} p
     * @returns {number}
     */
    _satCount(p) {
      return (p.support || []).filter((s) => s && (this.defOf(s).effects || []).some((x) => x.code === 'AURA_FRONT_DEF' || x.code === 'AURA_FRONT_DEF_GEN')).length;
    }
    /**
     * Wendet Satelliten-Auren an.
     * @param {object} p
     */
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
    /**
     * Eintritt einer Einheit in eine Zone (Front/Support): Trigger, Eingraben, Auren.
     * @param {object} inst
     * @param {string} zone
     */
    _onEnter(inst, zone) {
      const def = this.defOf(inst);
      const locOwn = this.findInst(inst.uid);
      if (zone === 'front' && locOwn && locOwn.player) {
        this._applySectionAuraToUnit(locOwn.player, locOwn);
        // Falle liegt beim Gegner des Einrückenden (eigener Abschnitt des Legers = gleiche Spur).
        const trapHost = this.opponent(locOwn.player.id);
        const traps = (trapHost.flags && trapHost.flags.sectionEnterDamage) || [];
        const live = [];
        traps.forEach((tr) => {
          if (tr.until < this.state.turn) return;
          live.push(tr);
          if (tr.section === locOwn.section) {
            this._damage(inst, Number(tr.value || 1), { tag: 'enter-section' });
            this._log(def.name + ' erleidet Einrück-Schaden in Abschnitt ' + locOwn.section + '.');
          }
        });
        if (trapHost.flags) trapHost.flags.sectionEnterDamage = live;
      }
      if (locOwn && locOwn.player && locOwn.player.flags && locOwn.player.flags.coinPreventInfantry === this.state.turn) {

        const kl = ((def.klasse || '') + ' ' + (def.tags || []).join(' ') + ' ' + (def.text || '')).toLowerCase();

        if (kl.includes('infanter')) {
          this._log(def.name + ': Schaden durch Münzwurf (Kopf) verhindert.'); // Zeile ins Protokoll
          return;
        }
      }
      (def.effects || []).forEach((e) => {
        if (e.code === 'REVEAL' || e.code === 'LOOK_HAND' || e.code === 'DRAW') {
          this._applyEffect(this.player(inst.owner), inst, e, null); // einen Effect-Code ausführen
        }
      });
    }
    /**
     * Leere Frontslots (Kurzform).
     * @param {object} p
     * @returns {object[]}
     */
    _emptyFrontSlots(p) {
      const out = [];
      SECTIONS.forEach((s) => {
        for (let r = 0; r < 3; r++) if (!p.front[s][r]) out.push({ section: s, row: r });
      });
      return out;
    }
    /**
     * True, wenn eine Handkarte den Effektcode besitzt.
     * @param {object} pl
     * @param {string} code
     * @returns {boolean}
     */
    _handHasEffect(pl, code) {
      return (pl.hand || []).some((c) => (this.defOf(c).effects || []).some((x) => x.code === code));
    }
    
    // --- Reaktionen, Fallen und Kampf (Gegenschlag) ---
/**
     * Mögliche Reaktionen des Verteidigers auf einen Angriff (u. a. verdeckte Fallen, Gefechtsabbruch).
     * @param {object} defender
     * @param {object} attacker
     * @param {object} target
     * @returns {object[]}
     */
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
      // t259: Handkarten nur anbieten, wenn der Verteidiger sie bezahlen kann. Vorher bot das
      // Feindkontakt-Fenster z. B. Napalm bei 0 AP an; die Wahl scheiterte („Nicht genug AP“),
      // der Dialog verschwand und die Partie wartete (ui-play Seeds 77/259).
      // Verdeckte Fallen aus dem Support lösen ohne AP aus und bleiben immer wählbar.
      // t271: Auch nur Karten anbieten, deren Bedingung jetzt erfüllt ist. Vorher bot das Fenster
      // z. B. „Militärische Ehren“ ohne Veteranen an; die Wahl scheiterte („Keine Veteranen an der
      // Front.“) und das Fenster kam unverändert zurück (ui-play Seed 1234).
      return out.filter((o) => {
        const h = defender.hand.find((c) => c.uid === o.target);
        const card = h || (defender.support || []).find((c) => c && c.uid === o.target);
        if (card && !this._reactUsable(defender, card)) return false;
        if (!h) return true;
        return this._reactAffordable(defender, h);
      });
    }
    /**
     * t271: Ist die Vorbedingung einer Reaktionskarte gerade erfüllt (dieselben Prüfungen wie beim Ausspielen)?
     * @param {object} defender Spieler
     * @param {object} card Karten-Instanz (Hand oder verdeckter Support)
     * @returns {boolean}
     */
    _reactUsable(defender, card) {
      try {
        const codes = (this.defOf(card).effects || []).map((x) => x.code);
        const front = this.frontList(defender);
        if (codes.indexOf('HONORS') >= 0) return front.some((l) => (l.inst.flags.kills || 0) >= 1);
        if (codes.indexOf('COURT_MARTIAL') >= 0) return front.length >= 2;
        if (codes.indexOf('RATIONS') >= 0) return front.some((l) => isInfantry(this.defOf(l.inst)));
        if (codes.indexOf('LAY_MINE') >= 0) return front.some((l) => !defender.nml[l.section][l.row]);
        if (codes.indexOf('NAPALM') >= 0) return this.frontList(this.opponent(defender.id)).length > 0;
        return true;
      } catch (e) { return true; }
    }
    /**
     * t259: Kann der Verteidiger diese Handkarte als Reaktion bezahlen?
     * @param {object} defender Spieler
     * @param {object} card Handkarten-Instanz
     * @returns {boolean}
     */
    _reactAffordable(defender, card) {
      try { return this.costOf(this.defOf(card), defender, null, card) <= (Number(defender.ap) || 0); }
      catch (e) { return true; }
    }
    /**
     * Löst eine verdeckte Unterstützung als Falle aus, ohne weitere AP. RULES §12.1.
     * Ohne gültiges Ziel bleibt sie verdeckt liegen.
     * @param {object} p
     * @param {number} si Support-Index
     */
    _springTrap(p, si) {
      const card = p.support[si];
      const def = this.defOf(card);
      p.support[si] = null;
      card.facedown = false;
      if (card.flags) card.flags.trap = false;
      p.hand.push(card);
      this._evt('instant', def, p.name + ' deckt ' + def.name + ' auf.');
      const res = this._playInstant(p, card, undefined, false);
      if (res && res.ok === false) { // nicht auslösbar: Falle bleibt verdeckt liegen
        p.hand = p.hand.filter((c) => c.uid !== card.uid);
        card.facedown = true;
        if (card.flags) card.flags.trap = true;
        p.support[si] = card;
        const pw = this.state.pending;
        if (pw && pw.kind === 'react-window' && Array.isArray(pw.choices)) pw.choices = pw.choices.filter((c) => c.target !== card.uid);
      }
      return res;
    }
    /**
     * Setzt den unterbrochenen Angriff oder Effekt nach einer Reaktion fort.
     */
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
    /**
     * Gibt eine Geist-/Reaktionswahl weiter, ohne zu wirken.
     */
    _passGeist() { return this._resumeAfterReact(); }
    /**
     * Setzt einen durch Geist unterbrochenen Angriff fort.
     * @param {object} w
     */
    _resumeGeistAttack(w) {
      this.state.pending = null;
      this.state.heldAttack = { atkPlayer: w.atkPlayer, attackerUid: w.attackerUid, targetUid: w.targetUid };
      return this._resumeAfterReact();
    }
    /**
     * Schließt die Geist-Aktion ab.
     * @param {number} pid
     * @param {string} unitUid
     * @param {string} tgtUid
     */
    _finishGeist(pid, unitUid, tgtUid) {
      const w = this.state.pending;
      this.state._geistLock = true;
      this._resolveCombat(pid, unitUid, tgtUid);
      this.state._geistLock = false;
      this.state.heldAttack = { atkPlayer: w.atkPlayer, attackerUid: w.attackerUid, targetUid: w.targetUid };
      return this._resumeAfterReact();
    }
    /**
     * Setzt eine Einheit aus (Pause-Marke).
     * @param {number} pid
     * @param {string} uid
     * @param {object} pend
     */
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
    /**
     * Luftschlag-Schaden auf eine Stellung.
     * @param {object} loc
     * @param {number} dmg
     */
    _applyAirDmg(loc, dmg) {
      if (!loc) return;
      if (loc.inst.def == null) { this._destroy(loc); return; }
      this._damage(loc.inst, dmg, { tag: 'air' });
      if (this._isDead(loc.inst)) this._destroy(loc);
    }
    /**
     * Napalm: dauerhafter Brandsatz auf die Stellung.
     * @param {object} loc
     * @param {number} dmg
     */
    _applyNapalm(loc, dmg) {
      if (!loc) return;
      this._evt('shout', { name: 'Napalm', image: 'Napalm.jpg' }, 'Napalm!');
      this._damage(loc.inst, dmg, { tag: 'air' });
      if (this._isDead(loc.inst)) this._destroy(loc);
      else loc.inst.flags.napalm = Number(this._codeParam('NAPALM', 'tick', 1)); // Brandschaden je Zug (Param `tick`)
    }
    /**
     * Führt den Napalm-Soforteinsatz auf das gewählte Ziel aus.
     * @param {number} pid
     * @param {string} uid
     * @param {object} pend
     */
    _doNapalm(pid, uid, pend) {
      const loc = this.findInst(uid);
      const p = this.player(pid);
      if (pend && pend.card) p.grave.push(pend.card);
      this.state.pending = null;
      if (!loc || loc.zone !== 'front') return { ok: true };
      if (this._handHasEffect(loc.player, 'CANCEL_AIR_DAMAGE')) {
        this.state.pending = this._sealPending({ kind: 'sam', player: loc.player.id, spell: true, napalm: true, targetUid: uid, dmgToT: Number(this._codeParam('NAPALM', 'now', 3)), prompt: 'Napalm' });
        return { ok: true, need: 'sam' };
      }
      this._applyNapalm(loc, Number(this._codeParam('NAPALM', 'now', 3)));
      return { ok: true };
    }
    /**
     * Führt den Luftschlag aus.
     * @param {number} pid
     * @param {string} uid
     * @param {object} pend
     */
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

    /* combat_counter (catalog rules, default survivor_only = Ist-Zustand):
         survivor_only — Verteidiger nimmt Schaden zuerst; Gegenschlag nur wenn er überlebt
         simultaneous  — beide Seiten nehmen vollen Schaden (auch wenn Verteidiger stirbt)
         none          — kein Gegenschlag; nur Angreifer fügt Schaden zu
       Artillerie-Angriffe: Gegenschlag zusätzlich nur, wenn Verteidiger die Artillerie
       selbst per Reichweite/Distanz erreichen könnte (_canReachForCounter); sonst 0.
       Nebel/Erstschlag: Reihenfolge Angreifer zuerst; bei none entfällt Gegenschlag/Erstschlag-Schaden am Angreifer. */
    _combatCounterMode() {
      const m = (this.rules && this.rules.combat_counter) || 'survivor_only';
      if (m === 'none' || m === 'simultaneous' || m === 'survivor_only') return m;
      return 'survivor_only';
    }

    /* Artillerie (inkl. Mörser/Schwer/ATTACK_ANY_FRONT): Gegenschlag nur,
       wenn der Verteidiger die Artillerie selbst legal erreichen könnte
       (gleiche Reichweite/Distanz wie legalAttackTargets). */
    _isArtilleryAttacker(inst) {
      const def = this.defOf(inst);
      if (!def) return false;
      if (isArtillery(def)) return true;
      const tags = ((def.klasse || '') + ' ' + (def.tags || []).join(' ')).toLowerCase();
      return tags.includes('artillerie') || tags.includes('haubitze') || tags.includes('rohr')
        || tags.includes('moerser') || tags.includes('mörser') || tags.includes('zugartillerie')
        || tags.includes('schwerartillerie');
    }
    /**
     * Ob `fromLoc` `toLoc` für einen Gegenschlag legal erreichen kann.
     * @param {object} fromLoc
     * @param {object} toLoc
     * @returns {boolean}
     */
    _canReachForCounter(fromLoc, toLoc) {
      /* Gleiche Distanz/Reichweite wie legalAttackTargets, ohne deploy_protection-Filter. */
      if (!fromLoc || !toLoc || !fromLoc.inst || !toLoc.inst) return false;
      if (fromLoc.zone !== 'front' || toLoc.zone !== 'front') return false;
      const defn = this.defOf(fromLoc.inst);
      if (!defn) return false;
      const tags = ((defn.klasse || '') + ' ' + (defn.tags || []).join(' ')).toLowerCase();
      const sf = steilfeuerLevel(defn);
      const isMortar = sf === 1 || tags.includes('moerser') || tags.includes('mörser') || tags.includes('zugartillerie');
      const isArty = sf === 2 || ((tags.includes('artillerie') || tags.includes('haubitze') || tags.includes('rohr')) && !isMortar && sf !== 1 && sf !== 3);
      const isHeavy = sf === 3 || tags.includes('schwerartillerie') || (tags.includes('schwer') && tags.includes('artillerie'));
      const range = steilfeuerRange(sf) || (isHeavy ? 7 : isArty ? 5 : isMortar ? 3 : 3);
      const anyFront = sf >= 4 || this._defHas(defn, 'ATTACK_ANY_FRONT');
      if (anyFront) return true;
      if (toLoc.inst.flags && toLoc.inst.flags.umgehenUntil === this.state.turn) return true;
      const secBase = { L: 1, C: 4, R: 7 };
      const attPos = (secBase[fromLoc.section] || 1) + fromLoc.row;
      const tPos = (secBase[toLoc.section] || 0) + toLoc.row;
      const dist = Math.abs(tPos - attPos);
      const fernOk = this._kw(fromLoc.inst, 'Fernschuss') && (sf === 0 || sf <= 3);
      return dist <= Math.floor((range - 1) / 2) + (fernOk ? 1 : 0);
    }
    /**
     * Ob Gegenschlag-Schaden in diesem Duell erlaubt ist.
     * @param {object} aLoc
     * @param {object} tLoc
     * @param {number} dmgToA
     * @returns {boolean}
     */
    _counterDamageAllowed(aLoc, tLoc, dmgToA) {
      if (!(dmgToA > 0) || !tLoc || tLoc.zone !== 'front') return 0;
      if (this._isArtilleryAttacker(aLoc.inst) && !this._canReachForCounter(tLoc, aLoc)) return 0;
      return dmgToA;
    }
    /**
     * Wendet Kampfschaden auf Ziel und ggf. Angreifer an (Nebel/Erstschlag berücksichtigt).
     * @param {object} aLoc Angreifer
     * @param {object} tLoc Ziel
     * @param {number} dmgToT
     * @param {number} dmgToA
     * @param {boolean} [fog]
     */
    _applyCombatHits(aLoc, tLoc, dmgToT, dmgToA, fog) {
      const A = aLoc.inst, T = tLoc.inst;
      this._evt('attack', this.defOf(A), this.defOf(A).name + ' — Kampfhandlung.');
      this._fireAttackTriggers(aLoc, tLoc);
      this._onEnemyAttack(aLoc.player, aLoc.section);
      const mode = this._combatCounterMode();
      const counterDmg = this._counterDamageAllowed(aLoc, tLoc, dmgToA);
      if (fog) {
        this._evt('shout', this.defOf(T), this.defOf(T).name + ' setzt Erstschlag ein (Nebel).');
        if (mode === 'none') {
          this._damage(T, dmgToT, { tag: 'attack' });
        } else if (mode === 'simultaneous') {
          if (counterDmg > 0) this._damage(A, counterDmg, { tag: 'first-strike' });
          this._damage(T, dmgToT, { tag: 'attack' });
        } else {
          // survivor_only: Erstschlag nur wenn Reichweite den Gegenschlag erlaubt
          if (counterDmg > 0) this._damage(A, counterDmg, { tag: 'first-strike' });
          if (!this._isDead(A)) this._damage(T, dmgToT, { tag: 'attack' });
        }
      } else if (mode === 'none') {
        this._damage(T, dmgToT, { tag: 'attack' });
      } else if (mode === 'simultaneous') {
        this._damage(T, dmgToT, { tag: 'attack' });
        if (counterDmg > 0) this._damage(A, counterDmg, { tag: 'counter' });
      } else {
        // survivor_only — Default + Artillerie-Reichweiten-Check
        this._damage(T, dmgToT, { tag: 'attack' });
        if (!this._isDead(T) && counterDmg > 0) this._damage(A, counterDmg, { tag: 'counter' });
      }
    }
    /**
     * Löst SAM/Luftabwehr auf einen Luftschlag aus (blockieren oder durchlassen).
     * @param {number} pid
     * @param {boolean} block
     */
    _resolveSam(pid, block) {
      const pend = this.state.pending;
      if (!pend || pend.kind !== 'sam') throw new Error('Kein Luftangriff offen');
      this.state.pending = null;
      if (block) {
        const p = this.player(pid);
        let card = p.hand.find((c) => this._defHas(this.defOf(c), 'CANCEL_AIR_DAMAGE'));
        if (!card) card = (p.support || []).find((c) => c && this._defHas(this.defOf(c), 'CANCEL_AIR_DAMAGE'));
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
        if (aLoc) { aLoc.inst.attackUsed=true; aLoc.inst.flags.exhausted=true; }
      }
      if (pend.attackerUid && pend.targetUid && this._tacAfterCombat) {
        const attacker=this.findInst(pend.attackerUid);
        this._tacAfterCombat(attacker ? attacker.player.id : (pid === 0 ? 1 : 0),pend.targetUid,pend.tacWasOpen);
      }
      return { ok: true };
    }
    /**
     * Bricht eine offene Wahl ab, soweit erlaubt, und erstattet ggf. Kosten.
     * @param {number} pid
     * @param {object} a
     */
    _actCancel(pid, a) {
      const pend = this.state.pending;
      if (!pend || pend.player !== pid) throw new Error('Nichts abzubrechen');
      if (pend.kind === 'tac-aura-section') throw new Error('Banner: eigenen Abschnitt festlegen');
      if (pend.kind === 'tac-discard') throw new Error('Notdepot: eine eigene Handkarte muss abgeworfen werden');
      if (/^tac-/.test(pend.kind)) { this.state.pending=null; return {ok:true}; }
      if (pend.kind === 'sam') return this._resolveSam(pid, false);
      if (pend.kind === 'geist-window') return this._passGeist();
      if (pend.kind === 'mob-play' || pend.kind === 'mass-pick') {
        if (pend.kind === 'mass-pick') return this._finishMassDeploy(pid);
        this.state.pending = null;
        return { ok: true };
      }
      if (pend.kind === 'gassen-pick' || pend.kind === 'gassen-slot') {
        return this._gassenCancel(pid);
      }
      if (pend.kind === 'command-atk') {
        this.state.pending = null;
        this.state._commandFollow = null;
        return { ok: true };
      }
      if (pend.kind === 'mob-pick') return this._finishMobPick(pid);
      if (pend.kind === 'react-window') return this._resumeAfterReact(pid);
      // t267: Feindwirkung ist schon geschehen – Abbrechen lässt nur den Eigen-Bonus verfallen, die Karte bleibt gespielt
      if (pend.kind === 'own-bonus') {
        if (pend.card) this.player(pid).grave.push(pend.card);
        this.state.pending = null;
        this._log('Bonus verfällt.');
        if (this.state.heldAttack) return this._resumeAfterReact();
        return { ok: true };
      }
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
    /**
     * Aktion: eine eigene verdeckte Einheit oder Unterstützung aufdecken.
     * @param {number} pid
     * @param {object} a
     */
    _actReveal(pid, a) {
      const loc = this.findInst(a.uid);
      if (!loc || loc.player.id !== pid) throw new Error('Nicht deine Einheit'); // Regelverstoß, Zug ungültig
      loc.inst.facedown = false;
      this._evt('reveal', this.defOf(loc.inst), this.defOf(loc.inst).name + ' wird aufgedeckt.');
      this._maybeBlitzLock(loc);
      this._onEnter(loc.inst, 'front');
      return { ok: true };
    }
    /**
     * Aktivierte Fähigkeit einer ausliegenden Karte (Support/Einheit/Ausrüstung).
     * @param {number} pid
     * @param {object} a
     */
    _actUseAbility(pid, a) {
      const locEarly = this.findInst(a && a.uid);
      if (locEarly) {
        const neut = this._tryNeutralize(pid, locEarly);
        if (neut) return neut;
      }
      if (locEarly && locEarly.zone === 'support' && locEarly.player.id === pid && this._supportLocked(pid)) {
        throw new Error('Blitzkrieg-Sperre: Unterstützung nicht aktivierbar');
      }
      if (this._tacAbility) { const r=this._tacAbility(pid,a); if (r) return r; }
      const loc = locEarly || this.findInst(a.uid);
      if (!loc) throw new Error('Karte nicht gefunden');
      const inst = loc.inst;
      const def = this.defOf(inst);
      if (inst.flags && inst.flags.exhausted) throw new Error('Erschöpft');
      if (inst.summonedTurn === this.state.turn) throw new Error('Frisch gelegt');
      const codes = (def.effects || []).map((x) => x.code);
      // Equipment once-activations on host
      for (const eq of (inst.attachments || [])) {
        for (const e of (this.defOf(eq).effects || [])) {
          if ((e.code === 'EQUIP_ONCE_PAIN_ATK' || e.code === 'EQUIP_ONCE_DRAW_PAIN') && !(eq.flags && eq.flags.onceUsed)) {
            return this._activateEquipOnce(pid, loc, eq, e);
          }
        }
      }
      const hasEquipReveal = codes.indexOf('REVEAL_STRIKE') >= 0 || codes.indexOf('AUFKLAERUNG') >= 0 ||
        (inst.attachments || []).some((eq) => (this.defOf(eq).effects || []).some((x) => x.code === 'REVEAL_STRIKE' || x.code === 'AUFKLAERUNG')) ||
        (inst.flags && inst.flags.equipRevealStrike);
      if (hasEquipReveal) {
        const hid = this.frontList(this.opponent(pid)).filter((l) => l.inst.facedown);
        if (!hid.length) throw new Error('Nichts Verdecktes');
        const fx = (def.effects || []).find((x) => x.code === 'AUFKLAERUNG' || x.code === 'REVEAL_STRIKE');
        const n = (fx && fx.param && fx.param.n) ? Number(fx.param.n) : 1;
        this.state.pending = this._sealPending({
          kind: 'scout-rev',
          player: pid,
          uid: inst.uid,
          left: Math.min(n, hid.length),
          strike: codes.indexOf('REVEAL_STRIKE') >= 0 || (inst.attachments || []).some((eq) => this._defHas(this.defOf(eq), 'REVEAL_STRIKE')),
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
      { const r = this._legacySupportAbility(pid, loc, inst, def, a); if (r) return r; }
      throw new Error('Keine aktivierbare Fähigkeit');
    }

    /* Aktivierbare Fähigkeiten der Grundset-Unterstützungen (t212: Starter fehlten, Auflöser existierten). */
    _legacySupportAbility(pid, loc, inst, def, a) {
      if (loc.zone !== 'support' || loc.player.id !== pid) return null;
      const p = loc.player, opp = this.opponent(pid);
      const fx = (code) => (def.effects || []).find((x) => x.code === code);
      const costOf = (e, d) => Number((e && e.param && e.param.ap) || d);
      const needAp = (c) => { if (p.ap < c) throw new Error('Zu wenig AP'); };
      const foes = () => this.frontList(opp).filter((l) => !this._hostileTargetBlocked(l.inst));
      const which = a && a.ability ? String(a.ability) : null;
      const want = (code) => fx(code) && (!which || which === code);
      if (want('FIRE_MISSION')) {
        const e = fx('FIRE_MISSION'), c = costOf(e, 2); needAp(c);
        const ch = foes(); if (!ch.length) throw new Error('Kein Ziel');
        this.state.pending = this._sealPending({ kind: 'fire-mission', player: pid, uid: inst.uid, cost: c, dmg: Number((e.param || {}).dmg || 3), choices: ch.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name })) });
        return { ok: true, need: 'target' };
      }
      if (want('DRONE_STRIKE')) {
        const c = costOf(fx('DRONE_STRIKE'), 2); needAp(c);
        const ch = foes(); if (!ch.length) throw new Error('Kein Ziel');
        this.state.pending = this._sealPending({ kind: 'drone', player: pid, uid: inst.uid, cost: c, choices: ch.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name })) });
        return { ok: true, need: 'target' };
      }
      if (want('FEINT')) {
        const c = costOf(fx('FEINT'), 2); needAp(c);
        const ch = foes(); if (!ch.length) throw new Error('Kein Ziel');
        this.state.pending = this._sealPending({ kind: 'feint', player: pid, uid: inst.uid, cost: c, choices: ch.map((l) => ({ target: l.inst.uid, label: l.inst.facedown ? 'Verdeckt' : this.defOf(l.inst).name })) });
        return { ok: true, need: 'target' };
      }
      if (want('HOSPITAL')) {
        if (inst.flags.patient) throw new Error('Lazarett belegt');
        const c = costOf(fx('HOSPITAL'), 1); needAp(c);
        const ch = this.frontList(p).filter((l) => isInfantry(this.defOf(l.inst)));
        if (!ch.length) throw new Error('Keine eigene Infanterie');
        this.state.pending = this._sealPending({ kind: 'hospital', player: pid, uid: inst.uid, cost: c, choices: ch.map((l) => ({ target: l.inst.uid, label: this.defOf(l.inst).name })) });
        return { ok: true, need: 'target' };
      }
      if (want('REATTACK')) {
        const c = costOf(fx('REATTACK'), 1); needAp(c);
        const ch = this.frontList(p).filter((l) => l.inst.attackUsed && !l.inst.facedown);
        if (!ch.length) throw new Error('Keine eigene Einheit hat angegriffen');
        this.state.pending = this._sealPending({ kind: 'comm-unit', player: pid, uid: inst.uid, cost: c, choices: ch.map((l) => ({ target: l.inst.uid, label: this.defOf(l.inst).name })) });
        return { ok: true, need: 'target' };
      }
      if (want('SCOUT_DECK')) {
        const e = fx('SCOUT_DECK'), c = costOf(e, 2); needAp(c);
        const n = Math.min(Number((e.param || {}).n || 3), opp.deck.length); if (!n) throw new Error('Gegnerisches Deck leer');
        this._spend(p, c); inst.flags.exhausted = true;
        const pool = opp.deck.splice(0, n);
        this.state.pending = this._sealPending({ kind: 'comm-order', player: pid, uid: inst.uid, pool: pool, selected: [], choices: pool.map((cd) => ({ target: cd.uid, label: this.defOf(cd).name })) });
        return { ok: true, need: 'target' };
      }
      if (want('FETCH_EQUIP')) {
        const c = costOf(fx('FETCH_EQUIP'), 2); needAp(c);
        const ix = p.deck.findIndex((cd) => this.defOf(cd).typ === 'Ausrüstung');
        if (ix < 0) throw new Error('Keine Ausrüstung im Deck');
        if (p.hand.length >= (this.rules.max_hand || 7)) throw new Error('Hand voll');
        this._spend(p, c); inst.flags.exhausted = true;
        const cd = p.deck.splice(ix, 1)[0]; p.hand.push(cd);
        this._log('Logistikzentrum: ' + this.defOf(cd).name + ' auf die Hand.');
        return { ok: true };
      }
      if (want('SAT_PEEK')) {
        const c = costOf(fx('SAT_PEEK'), 3); needAp(c);
        const hid = this.frontList(opp).filter((l) => l.inst.facedown);
        if (!hid.length) throw new Error('Nichts Verdecktes');
        this._spend(p, c); inst.flags.exhausted = true;
        this.state.pending = this._sealPending({ kind: 'sat-peek', player: pid, uid: inst.uid, names: hid.map((l) => this.defOf(l.inst).name) });
        return { ok: true, need: 'peek' };
      }
      return null;
    }


    /* Angriffskosten: Basis attack_ap; Steilfeuer V auf Support +2 AP (gesamt 3). */
    _attackCost(attackerLoc, targetLoc) {
      const inst = attackerLoc && attackerLoc.inst;
      if (inst && inst.flags && inst.flags.commandFreeUntil === this.state.turn) return 0;
      const base = Number(this.rules.attack_ap) || 1;
      if (!attackerLoc || !attackerLoc.inst || !targetLoc) return base;
      if (targetLoc.zone !== 'support') return base;
      const defn = this.defOf(attackerLoc.inst);
      if (steilfeuerLevel(defn) === 5) return base + 2;
      return base;
    }
    /**
     * Aktion ATTACK: prüft Legalität, zahlt Kosten, öffnet ggf. Reaktionen und führt den Kampf aus.
     * @param {number} pid
     * @param {object} a
     */
    _actAttack(pid, a) { // Angriff einleiten
      if (this.state.active !== pid) throw new Error('Nicht dein Zug'); // Regelverstoß, Zug ungültig
      const p = this.player(pid);
      const loc = this.findInst(a.uid);
      if (!loc || loc.zone !== 'front' || loc.player.id !== pid) throw new Error('Angreifer ungültig'); // Regelverstoß, Zug ungültig
      if (loc.inst.facedown) throw new Error('Verdeckte Einheit greift nicht an'); // verdeckte Lage
      if (loc.inst.attackUsed || (loc.inst.flags && loc.inst.flags.exhausted)) throw new Error('Keine Aktionen mehr in diesem Zug');
      if (!this._canAct(loc.inst, pid)) throw new Error('Handelt erst im nächsten eigenen Zug');
      if (loc.inst.flags.noAttack) throw new Error('Kann nicht angreifen');
      if (loc.inst.flags.kwNoAtkTurn === this.state.turn) throw new Error('Stellungswechsel: greift in diesem Zug nicht an');
      if (a.target && this._tacTargetAllowed) { const t=this.findInst(a.target); if (t && !this._tacTargetAllowed(loc.inst,t.inst)) throw new Error('Feldaltar: nicht Ziel des ersten gegnerischen Angriffs'); }
      const tLocCost = a.target ? this.findInst(a.target) : null;
      const atkCost = a.target ? this._attackCost(loc, tLocCost) : (Number(this.rules.attack_ap) || 1);
      this._spend(p, atkCost);
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
        p.ap += atkCost;
        this._log(adef.name + ': kein gültiges Ziel, AP zurück.');
        return { ok: false, error: 'Kein gültiges Ziel' };
      }
      if (targets.length === 1) {
        const oneCost = this._attackCost(loc, targets[0]);
        if (oneCost > atkCost) {
          try { this._spend(p, oneCost - atkCost); }
          catch (e) { p.ap += atkCost; throw e; }
        } else if (oneCost < atkCost) {
          p.ap += (atkCost - oneCost);
        }
        this._evt('attack', adef, adef.name + ' greift an.');
        return this._resolveCombat(pid, a.uid, targets[0].inst.uid);
      }
      this.state.pending = this._sealPending({ // offene Wahl des Spielers
        kind: 'attack-target',
        player: pid,
        attacker: a.uid,
        baseCostSpent: atkCost,
        choices: targets.map((t) => {
          const c = this._attackCost(loc, t);
          const nm = t.inst.facedown ? 'Verdeckt' : this.defOf(t.inst).name;
          const hint = c > atkCost ? (' (' + c + ' AP)') : '';
          return { target: t.inst.uid, label: nm + hint, cost: c };
        }), // verdeckte Lage
      });
      return { ok: true, need: 'target' };
    }
    /**
     * Führt den Kampf zwischen Angreifer und Ziel aus (Werte, Treffer, Gegenschlag, Tod, Trigger).
     * @param {number} pid
     * @param {string} attackerUid
     * @param {string} targetUid
     */
    _resolveCombat(pid, attackerUid, targetUid) { // Schaden und Zerstörung rechnen
      this.state.pending = null; // offene Wahl des Spielers
      const aLoc = this.findInst(attackerUid);
      const tLoc = this.findInst(targetUid);
      if (!aLoc || !tLoc) throw new Error('Kampfziel fehlt'); // Regelverstoß, Zug ungültig
      if (this._hostileTargetBlocked(tLoc.inst)) throw new Error('Ziel eingegraben — nicht angreifbar');
      const A = aLoc.inst;
      const T = tLoc.inst;
      const tacWasOpen=!T.facedown;
      if (this._tacTargetAllowed && !this._tacTargetAllowed(A,T)) throw new Error('Feldaltar: nicht Ziel des ersten gegnerischen Angriffs');
      aLoc.player.flags.tacAnyAttackTurn=this.state.turn;
      const tacCover=this._tacCombatBegin ? this._tacCombatBegin(A,T) : 0;
      const tacDefense=A.owner !== T.owner && this._tacDefenseBonus ? this._tacDefenseBonus(T) : 0;
      if (T.facedown && this._defHas(this.defOf(A), 'REVEAL_STRIKE')) {
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
      if (this._defHas(this.defOf(A), 'NIEDERHALTEN') && isInfantry(this.defOf(T))) {
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

      if ((T.attachments || []).some((c) => this._defHas(this.defOf(c), 'RAUCH'))) {
        T.tokens = T.tokens || [];
        if (!T.tokens.some((x) => x.type === 'nebelfeld' && x.rauch)) T.tokens.push({ type: 'nebelfeld', rauch: true });
      }
      const fog = T.tokens.find((t) => t.type === 'nebelfeld') || A.tokens.find((t) => t.type === 'nebelfeld'); // erstes Treffer-Element
      if (this._defHas(this.defOf(T), 'RICHTMINE')) {
        this._log('Richtmine!');
        this._damage(A, 3, { tag: 'richtmine' });
        if (this._isDead(A)) {
          this._destroy(aLoc);
          this._checkVictory();
          return { ok: true };
        }
      }
      // t267: Ausrüstung „Ziel −n DEF“ beim Angriff (Ortungsband, `EQUIP_ON_ATTACK_DAMAGE.debuffDef`), mind. 1
      (A.attachments || []).forEach((eq) => {
        (this.defOf(eq).effects || []).forEach((e) => {
          if (e.code !== 'EQUIP_ON_ATTACK_DAMAGE' || !e.param || !e.param.debuffDef || T.def == null) return;
          const n = Number(e.param.debuffDef);
          T.def = Math.max(1, T.def - n);
          if (T.defMax != null) T.defMax = Math.max(T.def, T.defMax - n);
        });
      });
      const statsA = this.currentAtkDef(A);
      const statsT = this.currentAtkDef(T,{defending:true});
      A.flags.tacActualAttackTurn=this.state.turn;
      aLoc.player.flags.tacAnyAttackTurn=this.state.turn;
      (A.attachments || []).forEach(eq=>{
        if ((this.defOf(eq).effects || []).some(e=>e.code === 'CARRIER_FIRST_ATTACK_ATK')) eq.flags.tacFirstAttackUsed=true;
      });
      // on-attack equipment self-damage / bonus
      (A.attachments || []).forEach((eq) => {
        (this.defOf(eq).effects || []).forEach((e) => {
          if (e.code === 'EQUIP_ON_ATTACK_DAMAGE' && e.param && e.param.self) {
            this._damage(A, Number(e.param.self), { tag: 'equip-self' });
          }
        });
      });
      let dmgToT = statsA.atk;
      (A.attachments || []).forEach((eq) => {
        (this.defOf(eq).effects || []).forEach((e) => {
          if (e.code === 'EQUIP_ON_ATTACK_DAMAGE' && e.param && e.param.bonus) dmgToT += Number(e.param.bonus);
          if (e.code === 'EQUIP_DRAW_ON_ATTACK') {
            const needSup = e.param && e.param.ifSupport;
            if (!needSup || this._hasOwnSupport(aLoc.player)) {
              this._draw(aLoc.player, Number((e.param || {}).draw || 1));
            }
          }
        });
      });
      if (T.flags && T.flags.zielangriff && T.flags.zielangriff.until === this.state.turn && !T.flags.zielangriff.firstHitDone) {
        dmgToT += Number(T.flags.zielangriff.firstDmgBonus || 1);
        T.flags.zielangriff.firstHitDone = true;
        const adv = Number(T.flags.zielangriff.attackerDef || 1);
        A.def = (A.def || 0) + adv;
        A.defMax = (A.defMax || A.def) + adv;
      }
      let dmgToA = tLoc.zone === 'front' ? statsT.atk : 0;
      if (this._kw(A, 'Durchschlag')) dmgToT += 1;
      if (this._kw(A, 'Nachsetzen') && T.flags && T.flags.kwHitTurn === this.state.turn) dmgToT += 2;
      dmgToT += this._cmVs(A, T, aLoc);
      { const nt = (this.defOf(A).effects || []).find((x) => x.code === 'ATK_IF_TARGET_NOT_ATTACKED');
        if (nt && !(T.flags && T.flags.attackedTurn === this.state.turn)) dmgToT += Number((nt.param || {}).atk || 2); }
      if (isInfantry(this.defOf(A)) && aLoc.player.flags && aLoc.player.flags.predigerTurn !== this.state.turn) {
        const pr = (aLoc.player.support || []).find((s) => s && !s.facedown && this._defHas(this.defOf(s), 'ONCE_SECTION_INFANTRY_ATK'));
        if (pr) { dmgToT += 1; aLoc.player.flags.predigerTurn = this.state.turn; this._log(this.defOf(pr).name + ': +1 ATK für den ersten Infanterieangriff.'); }
      }
      if (this._kw(A, 'Hinterhalt') && A.flags && A.flags.kwAmbushReady) { dmgToT += 2; A.flags.kwAmbushReady = false; this._log('Hinterhalt: +2 ATK beim ersten Angriff nach dem Aufdecken.'); }
      if (this._defHas(this.defOf(A), 'AMBUSH') && !fog) dmgToT += 1;
      if (this._defHas(this.defOf(A), 'FEUERUEBERLEGENHEIT') && !hasTag(this.defOf(T), 'gepanzert')) dmgToT += 1;
      if (this._defHas(this.defOf(A), 'VS_INF') && isInfantry(this.defOf(T))) dmgToT += 2;
      if (this._defHas(this.defOf(A), 'PANZERFAUST') && hasTag(this.defOf(T), 'gepanzert')) dmgToT += 5;
      if (this._defHas(this.defOf(T), 'PANZERFAUST') && hasTag(this.defOf(A), 'gepanzert')) {
        dmgToA += 5;
        dmgToT = Math.max(0, dmgToT - 5);
      }
      if (this._defHas(this.defOf(A), 'PANZERFAUST') && hasTag(this.defOf(T), 'gepanzert')) {
        dmgToA = Math.max(0, dmgToA - 5);
      }
      if (this._defHas(this.defOf(T), 'AMBUSH') && fog) dmgToA += 1;
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

      const aDef = this.defOf(A);
      const tDef = this.defOf(T);
      (aDef.effects || []).forEach((e) => {
        if (e.code === 'IGNORE_DEF' && isArmored(tDef)) dmgToT += Number(e.param.ignore_def || 2);
        if (e.code === 'MODIFY_DAMAGE' && e.param.if_combat_with) {
          const f = String(e.param.if_combat_with);
          if (f.includes('infanterie') && isInfantry(tDef)) dmgToT += Number(e.param.atk || 2);
          if (f.includes('gepanzert') && isArmored(tDef)) {
            dmgToT += Number(e.param.atk || 0);
            T.def += Number(e.param.def || 0); // temporary; PAK style uses BUFF
          }
        }
        if (e.code === 'BUFF' && e.param.if_combat_with) {
          const f = String(e.param.if_combat_with);
          if (f.includes('gepanzert') && isArmored(tDef)) {
            dmgToT += Number(e.param.atk || 0);
          }
        }
      });
      // PAK printed as BUFF if gepanzert
      (aDef.effects || []).forEach((e) => {
        if (e.code === 'BUFF' && String(e.param.if_combat_with || '').includes('gepanzert') && isArmored(tDef)) {

          dmgToT += Number(e.param.atk || 0);
        }
      });

      // Schulterschluss: neighbors with the word in text contribute +1/+0 v1
      if (aLoc.player && aLoc.zone === 'front') this._neighbors(aLoc.player, aLoc.section, aLoc.row).forEach((n) => {
        const nd = this.defOf(n.inst);
        if (/Schulterschluss/i.test(nd.text || '')) dmgToT += 1;
      });

      // Gedruckter Text: „Wird angegriffen → zuvor N Schaden an den Angreifer“
      const tTxt = tDef.text || '';
      const richt = tTxt.match(/zuvor\s+(\d+)\s*Schaden/i) || tTxt.match(/Richtmine.*?(\d+)\s*Schaden/i);

      if (richt) this._damage(A, Number(richt[1]), { tag: 'richtmine' }); // Verteidigung verringern

      this._evt('shout', this.defOf(A), 'Feindkontakt! ' + this.defOf(A).name + ' gegen ' +
        (T.facedown ? 'eine verdeckte Einheit' : this.defOf(T).name) + '.');
      if (T.facedown) this._revealInst(T);
      // Feuerschutz reduziert nur Gegenschlag/Nebel-Erstschlag; Minen/Selbstschaden bleiben unberührt.
      dmgToA=Math.max(0,dmgToA-tacCover);
      dmgToT=Math.max(0,dmgToT-tacDefense);

      if (isAir(aDef) && dmgToT > 0 && this._handHasEffect(tLoc.player, 'CANCEL_AIR_DAMAGE') && !this.state._samLock) {
        this.state.pending = this._sealPending({
          kind: 'sam',
          player: tLoc.player.id,
          attackerUid: A.uid,
          targetUid: T.uid,
          dmgToT: dmgToT,
          dmgToA: dmgToA,
          fog: !!fog,
          tacWasOpen: tacWasOpen,
          prompt: 'Luftangriff von ' + aDef.name
        });
        return { ok: true, need: 'sam' };
      }
      this._applyCombatHits(aLoc, tLoc, dmgToT, dmgToA, !!fog);
      if (T.flags) T.flags.attackedTurn = this.state.turn;
      A.attackUsed = true;
      A.flags.exhausted = true;
      if (!this.state.kwAtk || this.state.kwAtk.turn !== this.state.turn) this.state.kwAtk = { turn: this.state.turn, uids: [] };
      if (A.owner === this.state.active) this.state.kwAtk.uids.push(A.uid);
      this._evt('attack', aDef, aDef.name + ' richtet ' + dmgToT + ' Schaden an' +
        (dmgToA ? ', erhält ' + dmgToA : '') + '.');

      if (this._isDead(T)) {
        if (tLoc.zone === 'front' && tLoc.player.id !== A.owner) {
          A.flags.kills = (A.flags.kills || 0) + 1;
          this._cmOnKill(A, aLoc.player);
          // Schuldzeichen: kill → draw
          (A.attachments || []).forEach((eq) => {
            (this.defOf(eq).effects || []).forEach((e) => {
              if (e.code === 'EQUIP_KILL_DRAW_BUFF' && eq.flags && eq.flags.killDrawArmed === this.state.turn) {
                this._draw(aLoc.player, Number((e.param || {}).draw || 1));
                eq.flags.killDrawArmed = -1;
              }
            });
          });
          if (T.flags && T.flags.zielangriff && T.flags.zielangriff.until === this.state.turn) {
            this._draw(this.player(T.flags.zielangriff.owner), Number(T.flags.zielangriff.drawOnKill || 1));
          }
        }
        this._destroy(tLoc);
      }
      if (this._isDead(A)) this._destroy(aLoc);
      else {
        // Scharfschütze stellungswechsel
        if (this._defHas(aDef, 'SET_FACEDOWN')) {
          A.facedown = true; // verdeckte Lage
          this._log(aDef.name + ' geht in Deckung (verdeckt).'); // Zeile ins Protokoll
        }
      }
      if (this.state._guerrilla && !this._isDead(this.state._guerrilla)) {
        const g0 = this.state._guerrilla;
        const watched = this.state.players.some((pl) => pl.id !== g0.owner && (pl.support || []).some((s) => s && this._defHas(this.defOf(s), 'NO_FACE_DOWN')));
        if (!watched && this._defHas(this.defOf(g0), 'RELOCATE_HIDE')) {
          g0.facedown = true; g0.flags.hideUntilOwner = true;
        }
        if (!watched && this._defHas(this.defOf(g0), 'GUERRILLA_HIDE')) g0.facedown = true;
      }
      if (false) {
        const g = this.state._guerrilla;
        const watched = this.state.players.some((pl) => pl.id !== g.owner && (pl.support || []).some((s) => s && this._defHas(this.defOf(s), 'NO_FACE_DOWN')));
        if (!watched && this._defHas(this.defOf(g), 'GUERRILLA_HIDE')) g.facedown = true;
      }
      if (T && T.tokens) T.tokens = T.tokens.filter((x) => !(x.rauch));
      this.state._guerrilla = null;
      if (!this.state._inOpFight && aLoc && tLoc) {
        const pals = this._neighbors(aLoc.player, aLoc.section, aLoc.row);
        pals.forEach((n) => {
          if (!n.inst || this.state._inOpFight) return;
          if (!this._defHas(this.defOf(n.inst), 'OP_MITKAEMPFEN')) return;
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
      if (this._tacAfterCombat) this._tacAfterCombat(A.owner,T.uid,tacWasOpen);
      return { ok: true };
    }
    /**
     * True, wenn die DEF auf 0 oder darunter liegt bzw. eine Todesmarke gesetzt ist.
     * @param {object} inst
     * @returns {boolean}
     */
    _isDead(inst) {
      if (inst.def == null) return false;
      return inst.def <= 0;
    }
    
    // --- Schaden, Heilung, Zerstörung ---
/**
     * Heilt die Instanz um `amount` (nicht über defMax) und löst Heil-Trigger aus.
     * @param {object} inst
     * @param {number} amount
     * @returns {number} tatsächlich geheilte Punkte
     */
    _heal(inst, amount) {
      if (!inst) return;
      { const hl = this.findInst(inst.uid); if (hl && hl.player && hl.player.flags) hl.player.flags.cmHealTurn = this.state.turn; }
      let amt = Number(amount || 0);
      if (inst.flags && inst.flags.healLess) amt = Math.max(0, amt - Number(inst.flags.healLess));
      const max = inst.defMax != null ? inst.defMax : (this.defOf(inst).def || 0);
      if (inst.def == null) inst.def = max;
      const before = inst.def;
      inst.def = Math.min(max, inst.def + amt);
      if (inst.def > before) {
        (inst.attachments || []).forEach((eq) => {
          (this.defOf(eq).effects || []).forEach((e) => {
            if (e.code === 'EQUIP_DRAW_ON_HEAL') {
              if (e.param && e.param.once && eq.flags && eq.flags.healDrew) return;
              const loc = this.findInst(inst.uid);
              if (loc) this._draw(loc.player, Number((e.param || {}).draw || 1));
              eq.flags = eq.flags || {};
              eq.flags.healDrew = true;
            }
          });
        });
      }
      this._fireHealTriggers(inst, amt);
    }
    /**
     * Fügt Schaden zu (Schild, Reduktion, Unverhinderbares). Kann die Einheit zerstören.
     * Einzelzielschaden respektiert Eingraben; Meta steuert Quelle und Typ.
     * @param {object} inst
     * @param {number} amount
     * @param {object} [meta]
     * @returns {number} tatsächlich zugefügter Schaden
     */
    _damage(inst, amount, meta) {
      // Equipment: ignore first damage once
      if (inst && amount > 0) {
        // t283: Param `untouchableFirst:false` schaltet den Schutz ab (Standard an).
        const ignoreEq = (inst.attachments || []).find((eq) => (this.defOf(eq).effects || []).some((x) => x.code === 'EQUIP_IGNORE_FIRST_DAMAGE' && (x.param || {}).untouchableFirst !== false) && !(eq.flags && eq.flags.usedIgnore));
        if (ignoreEq) {
          ignoreEq.flags = ignoreEq.flags || {};
          ignoreEq.flags.usedIgnore = true;
          const ig=(this.defOf(ignoreEq).effects || []).find(e=>e.code === 'EQUIP_IGNORE_FIRST_DAMAGE');
          if ((ig.param || {}).afterAtk) {
            if (inst.flags.tacWaxTurn !== this.state.turn) inst.flags.tacWaxPenalty=0;
            inst.flags.tacWaxTurn=this.state.turn; inst.flags.tacWaxPenalty+=Math.abs(Number(ig.param.afterAtk));
          }
          this._log(this.defOf(ignoreEq).name + ': erster Schaden ignoriert.');
          amount = 0;
        }
        const negEq = (inst.attachments || []).find((eq) => this._defHas(this.defOf(eq), 'EQUIP_NEGATE_DAMAGE') && !(eq.flags && eq.flags.usedNegate));
        if (negEq && amount > 0) {
          const fx = (this.defOf(negEq).effects || []).find((x) => x.code === 'EQUIP_NEGATE_DAMAGE');
          const neg = Math.min(amount, Number((fx && fx.param && fx.param.amount) || 1));
          amount -= neg;
          negEq.flags = negEq.flags || {};
          negEq.flags.usedNegate = true;
          this._log(this.defOf(negEq).name + ': negiert ' + neg + ' Schaden.');
        }
      }
      if (this._tacSectionDamage) amount=this._tacSectionDamage(inst,amount,meta);
      amount = this._cmNegate(inst, amount);
      // Kein Loch section shield
      if (inst && amount > 0) {
        const locKL = this.findInst(inst.uid);
        if (locKL && locKL.zone === 'front' && locKL.player.flags && locKL.player.flags.keinLoch) {
          const kl = locKL.player.flags.keinLoch;
          if (kl.until === this.state.turn && kl.section === locKL.section && kl.left > 0) {
            const use = Math.min(kl.left, amount);
            amount -= use;
            kl.left -= use;
            this._log('Kein Loch absorbiert ' + use + ' Schaden.');
          }
        }
      }
      if (meta && meta.tag === 'air') {
        const loc = this.findInst(inst.uid);
        if (loc && loc.zone === 'front') {
          const n = (loc.player.support || []).filter((s) => s && this._defHas(this.defOf(s), 'AA_REDUCE')).length;
          amount = Math.max(0, amount - n);
        }
        if (loc && loc.zone === 'support') {
          const n = (loc.player.support || []).filter((s) => s && this._defHas(this.defOf(s), 'RADAR_AA')).length;
          amount = Math.max(0, amount - n * 2);
        }
      }
      const smEff = inst && (this.defOf(inst).effects || []).find((x) => x.code === 'SCHADEN_MINUS');
      if (smEff) { // Standard −2; param.n überschreibt (t238)
        const smN = smEff.param && smEff.param.n != null ? Number(smEff.param.n) : 2;
        amount = Math.max(0, amount - smN);
      }
      const nestLoc = this.findInst(inst && inst.uid);
      if (nestLoc && nestLoc.zone === 'front') {
        const n = (nestLoc.player.support || []).filter((s) => s && this._defHas(this.defOf(s), 'REDUCE_DAMAGE')).length;
        amount = Math.max(0, amount - n);
      }
      if (inst && inst.flags && inst.flags.angelUntil === this.state.turn) {
        this._log('Silberner Engel verhindert Schaden an ' + this.defOf(inst).name + '.');
        return;
      }
      if (amount <= 0) return;
      // incoming reduction (Koloss)
      const def = this.defOf(inst);
      const locOwn = this.findInst(inst.uid);
      if (locOwn && locOwn.player && locOwn.player.flags && locOwn.player.flags.coinPreventInfantry === this.state.turn) {

        const kl = ((def.klasse || '') + ' ' + (def.tags || []).join(' ') + ' ' + (def.text || '')).toLowerCase();

        if (kl.includes('infanter')) {
          this._log(def.name + ': Schaden durch Münzwurf (Kopf) verhindert.'); // Zeile ins Protokoll
          return;
        }
      }
      (def.effects || []).forEach((e) => {
        if (e.code === 'MODIFY_DAMAGE' && String(e.param.when || '') === 'received') {
          amount += Number(e.param.delta || 0);
        }
      });
      amount = Math.max(0, amount);
      if (inst.def == null) {
        this._log(def.name + ' erhält ' + amount + ' Schaden (kein V-Wert — Support).'); // Zeile ins Protokoll
        if (amount >= 3) {
          const loc = this.findInst(inst.uid);
          if (loc) this._destroy(loc); // Karte vom Feld auf den Friedhof
        }
        return;
      }
      if (!(meta && meta.tag === 'abschirmung') && locOwn && locOwn.zone === 'front') {
        const guard = this._neighbors(locOwn.player, locOwn.section, locOwn.row).find((n) => n.inst && n.inst.uid !== inst.uid && !n.inst.facedown &&
          this._kw(n.inst, 'Abschirmung') && !(n.inst.flags && n.inst.flags.kwShieldTurn === this.state.turn) && (n.inst.def || 0) > 1);
        if (guard) {
          guard.inst.flags = guard.inst.flags || {};
          guard.inst.flags.kwShieldTurn = this.state.turn;
          amount -= 1;
          this._log('Abschirmung: ' + this.defOf(guard.inst).name + ' fängt 1 Schaden für ' + def.name + ' ab.');
          this._damage(guard.inst, 1, { tag: 'abschirmung' });
          if (this._isDead(guard.inst)) this._destroy(this.findInst(guard.inst.uid));
          if (amount <= 0) return;
        }
      }
      inst.def -= amount;
      if (inst.def < 0) inst.def = 0;
      inst.flags = inst.flags || {};
      inst.flags.kwHitTurn = this.state.turn;
      this._log(def.name + ' nimmt ' + amount + ' Schaden → V ' + inst.def + '/' + inst.defMax + '.'); // Zeile ins Protokoll
      if (inst.def > 0) this._fireDamageTriggers(inst, amount);
      // equipment react (t255: nur wenn der Träger überlebt – „heilt danach 1“ rettet nicht vor tödlichem Schaden)
      if (inst.def > 0) (inst.attachments || []).forEach((eq) => {
        const ed = this.defOf(eq);
        (ed.effects || []).forEach((e) => {
          if (e.code === 'EQUIP_HEAL_ONCE' && !eq.flags) eq.flags = {};
          const perTurn = !!(e.param && e.param.perTurn);
          if (e.code === 'EQUIP_HEAL_ONCE' && !(eq.flags && (perTurn ? eq.flags.usedHeal === this.state.turn : eq.flags.usedHeal))) {
            const heal = Number((e.param || {}).heal || 1);
            inst.def = Math.min(inst.defMax || inst.def, (inst.def || 0) + heal);
            eq.flags = eq.flags || {};
            eq.flags.usedHeal = perTurn ? this.state.turn : true;
            this._log(ed.name + ': heilt ' + heal + '.');
          }
        });
      });
    }
    /**
     * True, wenn die Instanz gegen diplomatische/nicht-kampfliche Effekte immun ist.
     * @param {object} inst
     * @returns {boolean}
     */
    _isDiploImmune(inst) {
      return this._defHas(this.defOf(inst), 'DIPLO_IMMUNE');
    }
    /**
     * Entfernt die Einheit/Unterstützung vom Feld auf den Friedhof, löst Todes-Trigger aus, räumt Ausrüstung.
     * @param {object} loc Fundort
     * @param {object} [meta]
     */
    _destroy(loc, meta) {
      if (!loc || !loc.inst || !loc.player) return;
      if (loc.inst && this._isDiploImmune(loc.inst) && !(meta && meta.tag === 'schattenspiele')) {
        this._log(this.defOf(loc.inst).name + ' genießt diplomatischen Schutz.');
        return;
      }
      if (this._tacDepart) this._tacDepart(loc.inst,true);
      if (loc.zone === 'front' && loc.player.flags && isInfantry(this.defOf(loc.inst) || {})) loc.player.flags.infLostTurn = this.state.turn;
      this._cmOnDestroy(loc);
      if (loc.zone === 'front' && loc.player.flags && loc.player.flags.keinLoch &&
          loc.player.flags.keinLoch.until === this.state.turn &&
          loc.player.flags.keinLoch.section === loc.section) {
        loc.player.flags.keinLoch.destroyed = true;
      }
      if (loc && loc.player && loc.player.flags && loc.player.flags.volkDraw === this.state.turn && loc.zone !== 'hand') {
        this._draw(loc.player, 1);
      }
      if (loc && loc.zone === 'front' && loc.inst && this.defOf(loc.inst).typ === 'Einheit') {
        loc.player.flags = loc.player.flags || {};
        loc.player.flags.kwFallen = (loc.player.flags.kwFallen || 0) + 1;
        if (this._kw(loc.inst, 'Ablösung') && loc.section && loc.row != null) {
          loc.player.flags.kwRelief = loc.player.flags.kwRelief || {};
          const ownTurn = this.state.active === loc.player.id;
          loc.player.flags.kwRelief[loc.section + loc.row] = { until: this.state.turn + (ownTurn ? 2 : 1) };
          this._log('Ablösung: Feld ' + loc.section + (loc.row + 1) + ' ist markiert.');
        }
        const killer = this.opponent(loc.player.id);
        killer.flags.oppUnitDead = (killer.flags.oppUnitDead || 0) + 1;
        if (this.state._pactAtk) {
          this._draw(this.player(this.state._pactAtk.owner != null ? this.state._pactAtk.owner : killer.id), 2);
          this.state._pactAtk = null;
        }
      }
      const inst = loc.inst;
      const def = this.defOf(inst);
      this._evt('destroy', def, def.name + ' ist zerstört.', { owner: loc.player.id, uid: inst.uid });
      const atts = (inst.attachments || []).slice();
      atts.forEach((eq) => {
        const ed = this.defOf(eq);
        (ed.effects || []).forEach((e) => {
          const ep = e.param || {};
          if (e.code === 'ON_DESTROY_DRAW') this._draw(loc.player, Number(ep.draw || 1));
          if (e.code === 'ON_DESTROY_SECTION_ATK' && loc.zone === 'front') {
            this.frontList(loc.player).filter((l) => l.section === loc.section && l.inst.uid !== inst.uid).forEach((l) => {
              l.inst.flags.buffAtk = (l.inst.flags.buffAtk || 0) + Number(ep.atk || 1);
              l.inst.flags.ehrenUntil = this.state.turn;
            });
          }
          if (e.code === 'ON_DESTROY_SECTION_DEF' && loc.zone === 'front') {
            this.frontList(loc.player).filter((l) => l.section === loc.section && l.inst.uid !== inst.uid).forEach((l) => {
              l.inst.def = (l.inst.def || 0) + Number(ep.def || 1);
              l.inst.defMax = (l.inst.defMax || l.inst.def) + Number(ep.def || 1);
            });
          }
          if (e.code === 'ON_DESTROY_SELF_DAMAGE' && loc.zone === 'front') {
            const mate = this.frontList(loc.player).find((l) => l.section === loc.section && l.inst.uid !== inst.uid);
            if (mate) this._damage(mate.inst, Number(ep.damage || 1), { tag: 'equip-backlash' });
          }
        });
        loc.player.grave.push(eq);
      });
      // unit self ON_DESTROY_DRAW
      (def.effects || []).forEach((e) => {
        if (e.code === 'ON_DESTROY_DRAW') this._draw(loc.player, Number((e.param || {}).draw || 1));
      });
      inst.attachments = [];
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
        const hero = (meta && meta.tag === 'armageddon') || this.state._inLastStand ? null : loc.player.hand.find((c) => this._defHas(this.defOf(c), 'BREACH_JUMP'));
        if (hero) {
          this.state.pending = this._sealPending({
            kind: 'hero-jump',
            player: loc.player.id,
            uid: hero.uid,
            section: loc.section,
            row: loc.row
          });
        }
      }
      if (loc.zone === 'support') {
        if (loc.inst.flags && loc.inst.flags.patientUid) {
          const dead = this.findInst(loc.inst.flags.patientUid);
          if (dead) {
            loc.player.grave.push(dead.inst);
            loc.inst.flags.patient = null; loc.inst.flags.patientUid = null;
            this._log(this.defOf(dead.inst).name + ' stirbt mit dem Lazarett.');
          }
        }
        loc.player.support[loc.index] = null;
        loc.player.flags.lostSupportTurn = this.state.turn;
        this._applySatAura(loc.player);
      }
      if (loc.zone === 'front' && def.typ === 'Einheit') {
        const killerSide = this.opponent(loc.player.id);
        // t283: Param `from` – 'enemy-front-unit' (Standard) zählt gegnerische Fronteinheiten, 'enemy-unit' jede gegnerische Einheit.
        const bloodFrom = (this._dokParam && (this._dokParam(killerSide, 'BLOOD_AP') || {}).from) || 'enemy-front-unit';
        if (this._hasDoctrine(killerSide, 'BLOOD_AP') && (bloodFrom === 'enemy-front-unit' || bloodFrom === 'enemy-unit')) {
          killerSide.flags.bloodAp = (killerSide.flags.bloodAp || 0) + 1;
          this._log(killerSide.name + ': Tiefenverteidigung merkt +1 AP (gegnerische Fronteinheit zerstört).');
        }
      }
      // --- Reaktive Trigger ---
      if (loc.zone === 'front' && def.typ === 'Einheit') {
        this._fireLossTriggers(loc.player, loc.section, inst);
        this._fireChainTriggers(loc.player, loc.section, inst);
        this._onEnemyDestroy(loc.player, loc.section);
      }
    }
    
    // --- Trigger und Bedingungen ---
/**
     * Trigger, wenn eine eigene Einheit im Abschnitt fällt.
     * @param {object} player
     * @param {string} section
     * @param {object} deadInst
     */
    _fireLossTriggers(player, section, deadInst) {
      const supports = (player.support || []).filter(Boolean);
      supports.forEach((sup) => {
        const sd = this.defOf(sup);
        (sd.effects || []).forEach((e) => {
          if (e.code === 'ON_ALLY_DESTROY') {
            const param = e.param || {};
            if (param.draw) this._draw(player, Number(param.draw) || 1);
            if (param.ap) player.ap += Number(param.ap) || 1;
            if (param.freePlay) player.flags.freePlaySection = section;
            this._log(sd.name + ' reagiert auf Verlust in ' + section + '.');
          }
        });
      });
      ['L','C','R'].forEach((sec) => {
        [0,1,2].forEach((row) => {
          const u = player.front[sec][row];
          if (!u || u.uid === deadInst.uid) return;
          const ud = this.defOf(u);
          (ud.effects || []).forEach((e) => {
            if (e.code === 'ON_ALLY_DESTROY' && sec === section) {
              if (e.param && e.param.atk) u.flags.tempAtk = (u.flags.tempAtk || 0) + Number(e.param.atk);
              this._log(ud.name + ' erhält Bonus durch Verlust.');
            }
          });
        });
      });
    }
    /**
     * Ketten-Trigger nach einem Tod im Abschnitt.
     * @param {object} player
     * @param {string} section
     * @param {object} deadInst
     */
    _fireChainTriggers(player, section, deadInst) {
      const supports = (player.support || []).filter(Boolean);
      supports.forEach((sup) => {
        const sd = this.defOf(sup);
        (sd.effects || []).forEach((e) => {
          if (e.code === 'CHAIN_ON_DESTROY') {
            player.flags.chainPlay = { section: section, discount: (e.param && e.param.discount) || 0, type: (e.param && e.param.type) || 'Einheit' };
            this._log(sd.name + ' erlaubt eine Folgeaktion in ' + section + '.');
          }
        });
      });
    }
    /**
     * True, wenn der Abschnitt einer Einsatzbeschränkung unterliegt.
     * @param {object} player
     * @param {string} section
     * @param {*} restriction
     * @returns {boolean}
     */
    _isRestricted(player, section, restriction) {
      const opp = this.opponent(player.id);
      const supports = (opp.support || []).filter(Boolean);
      return supports.some((sup) => {
        const sd = this.defOf(sup);
        return (sd.effects || []).some((e) => e.code === 'RESTRICT' && (!e.param || !e.param.section || e.param.section === section) && (!e.param || !e.param.what || e.param.what === restriction));
      });
    }
    /**
     * Trigger nach erlittenem Schaden.
     * @param {object} inst
     * @param {number} amount
     */
    _fireDamageTriggers(inst, amount) {
      const loc = this.findInst(inst.uid);
      if (!loc || loc.zone !== 'front') return;
      const def = this.defOf(inst);
      (def.effects || []).forEach((e) => {
        if (e.code === 'ON_DAMAGE') {
          const param = e.param || {};
          if (param.atk) inst.flags.tempAtk = (inst.flags.tempAtk || 0) + Number(param.atk);
          if (param.draw) this._draw(loc.player, Number(param.draw) || 1);
          this._log(def.name + ' reagiert auf Schaden.');
        }
      });
      // Auch Unterstützungen im Abschnitt
      (loc.player.support || []).filter(Boolean).forEach((sup) => {
        const sd = this.defOf(sup);
        (sd.effects || []).forEach((e) => {
          if (e.code === 'ON_DAMAGE' && e.param && e.param.section === loc.section) {
            if (e.param.heal) this._heal(inst, Number(e.param.heal) || 1);
            this._log(sd.name + ' reagiert auf Schaden in ' + loc.section + '.');
          }
        });
      });
    }
    /**
     * Trigger nach einem Angriff (Angreifer- und Verteidigerseite).
     * @param {object} aLoc
     * @param {object} tLoc
     */
    _fireAttackTriggers(aLoc, tLoc) {
      const A = aLoc.inst;
      const def = this.defOf(A);
      (def.effects || []).forEach((e) => {
        if (e.code === 'ON_ATTACK') {
          const param = e.param || {};
          if (param.atk) A.flags.tempAtk = (A.flags.tempAtk || 0) + Number(param.atk);
          if (param.draw) this._draw(aLoc.player, Number(param.draw) || 1);
          this._log(def.name + ' reagiert auf Angriff.');
        }
      });
    }
    /**
     * Laufende Kostenmodifikatoren für einen Kartentyp.
     * @param {object} player
     * @param {string} cardType
     * @returns {number}
     */
    _costModOngoing(player, cardType) {
      let mod = 0;
      (player.support || []).filter(Boolean).forEach((sup) => {
        const sd = this.defOf(sup);
        (sd.effects || []).forEach((e) => {
          if (e.code === 'COST_MOD_ONGOING' && e.param && e.param.type === cardType) {
            mod += Number(e.param.delta || 0);
          }
        });
      });
      // Auch gegnerische Einschränkungen
      const opp = this.opponent(player.id);
      (opp.support || []).filter(Boolean).forEach((sup) => {
        const sd = this.defOf(sup);
        (sd.effects || []).forEach((e) => {
          if (e.code === 'COST_MOD_ONGOING' && e.param && e.param.type === cardType && e.param.enemy) {
            mod += Number(e.param.delta || 0);
          }
        });
      });
      return mod;
    }
    /**
     * Summierter Abschnittsaura-Bonus auf einen Wert (`atk`/`def`).
     * @param {object} player
     * @param {string} section
     * @param {string} stat
     * @returns {number}
     */
    _sectionAura(player, section, stat) {
      let bonus = 0;
      (player.support || []).filter(Boolean).forEach((sup) => {
        const sd = this.defOf(sup);
        (sd.effects || []).forEach((e) => {
          if (e.code === 'SECTION_AURA' && e.param && e.param.stat === stat) {
            if (!e.param.section || e.param.section === section) bonus += Number(e.param.value || 1);
          }
        });
      });
      return bonus;
    }
    /**
     * Opfert eine eigene Einheit, um eine andere zu spielen.
     * @param {object} player
     * @param {string} sacrificeUid
     * @param {string} playUid
     */
    _sacrificePlay(player, sacrificeUid, playUid) {
      const sac = this.findInst(sacrificeUid);
      const card = player.hand.find((c) => c.uid === playUid);
      if (!sac || !card || sac.zone !== 'front') return false;
      this._destroy(sac);
      const slot = this.emptySlots(player)[0];
      if (slot && (!this._tacPayFreeEntry || this._tacPayFreeEntry(player,card,slot.section))) {
        player.hand = player.hand.filter((c) => c.uid !== playUid);
        player.front[slot.section][slot.row] = card;
        if (this._tacOnEntry) this._tacOnEntry(card,slot.section);
        this._log(this.defOf(card).name + ' durch Opfer gespielt.');
        return true;
      }
      return false;
    }
    /**
     * Trigger nach Heilung.
     * @param {object} inst
     * @param {number} amount
     */
    _fireHealTriggers(inst, amount) {
      const loc = this.findInst(inst.uid);
      if (!loc || loc.zone !== 'front') return;
      const def = this.defOf(inst);
      (def.effects || []).forEach((e) => {
        if (e.code === 'ON_HEAL') {
          const param = e.param || {};
          if (param.draw) this._draw(loc.player, Number(param.draw) || 1);
          if (param.atk) inst.flags.tempAtk = (inst.flags.tempAtk || 0) + Number(param.atk);
          this._log(def.name + ' reagiert auf Heilung.');
        }
      });
    }
    /**
     * Trigger, wenn eine Karte in einem Abschnitt ausgespielt wurde.
     * @param {object} player
     * @param {string} section
     * @param {object} inst
     */
    _firePlayTriggers(player, section, inst) {
      (player.support || []).filter(Boolean).forEach((sup) => {
        const sd = this.defOf(sup);
        (sd.effects || []).forEach((e) => {
          if (e.code === 'ON_PLAY') {
            const param = e.param || {};
            if (!param.section || param.section === section) {
              if (param.draw) this._draw(player, Number(param.draw) || 1);
              if (param.atk) inst.flags.tempAtk = (inst.flags.tempAtk || 0) + Number(param.atk);
              this._log(sd.name + ' reagiert auf Spiel in ' + section + '.');
            }
          }
        });
      });
    }
    /**
     * Auslöser zu Beginn des eigenen Zugs (Ziehen, Heilung, Marken, AP).
     * @param {object} player
     */
    _fireTurnStart(player) {
      (player.support || []).filter(Boolean).forEach((sup) => {
        const sd = this.defOf(sup);
        (sd.effects || []).forEach((e) => {
          if (e.code === 'TURN_START') {
            const param = e.param || {};
            if (param.draw) this._draw(player, Number(param.draw) || 1);
            if (param.ap) player.ap += Number(param.ap) || 1;
            this._log(sd.name + ' zu Zugbeginn.');
          }
        });
      });
    }
    /**
     * Auslöser und Aufräumen am Zugende (Auren, Marken, Trophy-Fortschritt).
     * @param {object} player
     */
    _fireTurnEnd(player) {
      (player.support || []).filter(Boolean).forEach((sup) => {
        const sd = this.defOf(sup);
        (sd.effects || []).forEach((e) => {
          if (e.code === 'TURN_END') {
            const param = e.param || {};
            if (param.draw) this._draw(player, Number(param.draw) || 1);
            if (param.heal) {
              this.frontList(player).forEach((l) => {
                if (l.inst.def < l.inst.defMax) this._heal(l.inst, Number(param.heal) || 1);
              });
            }
            this._log(sd.name + ' zu Zugende.');
          }
        });
      });
    }
    /**
     * Trigger auf benachbarte Abschnitte zu einem Ereignis.
     * @param {object} player
     * @param {string} section
     * @param {string} event
     */
    _fireAdjacentTriggers(player, section, event) {
      const adj = { L: ['C'], C: ['L','R'], R: ['C'] }[section] || [];
      adj.forEach((sec) => {
        [0,1,2].forEach((row) => {
          const u = player.front[sec][row];
          if (!u) return;
          const ud = this.defOf(u);
          (ud.effects || []).forEach((e) => {
            if (e.code === 'ADJACENT_TRIGGER' && e.param && e.param.event === event) {
              if (e.param.atk) u.flags.tempAtk = (u.flags.tempAtk || 0) + Number(e.param.atk);
              this._log(ud.name + ' reagiert auf ' + event + ' in Nachbarabschnitt.');
            }
          });
        });
      });
    }
    /**
     * Trigger von Karten auf der Hand (falls strukturiert vorgesehen).
     * @param {object} player
     */
    _fireHandTriggers(player) {
      (player.support || []).filter(Boolean).forEach((sup) => {
        const sd = this.defOf(sup);
        (sd.effects || []).forEach((e) => {
          if (e.code === 'HAND_TRIGGER') {
            const param = e.param || {};
            if (param.minHand && player.hand.length >= Number(param.minHand)) {
              if (param.draw) this._draw(player, Number(param.draw) || 1);
              this._log(sd.name + ' reagiert auf Handgröße.');
            }
          }
        });
      });
    }
    /**
     * Trigger, wenn eine Karte auf den Friedhof kommt.
     * @param {object} player
     * @param {object} card
     */
    _fireGraveyardTriggers(player, card) {
      (player.support || []).filter(Boolean).forEach((sup) => {
        const sd = this.defOf(sup);
        (sd.effects || []).forEach((e) => {
          if (e.code === 'GRAVEYARD_TRIGGER') {
            const param = e.param || {};
            if (param.draw) this._draw(player, Number(param.draw) || 1);
            if (param.ap) player.ap += Number(param.ap) || 1;
            this._log(sd.name + ' reagiert auf Friedhof.');
          }
        });
      });
    }
    /**
     * Trigger bei AP-/Ressourcenänderung.
     * @param {object} player
     * @param {number} delta
     */
    _fireResourceTriggers(player, delta) {
      (player.support || []).filter(Boolean).forEach((sup) => {
        const sd = this.defOf(sup);
        (sd.effects || []).forEach((e) => {
          if (e.code === 'RESOURCE_TRIGGER') {
            const param = e.param || {};
            if (param.onGain && delta > 0) {
              if (param.draw) this._draw(player, Number(param.draw) || 1);
              this._log(sd.name + ' reagiert auf AP-Gewinn.');
            }
            if (param.onLoss && delta < 0) {
              if (param.atk) {
                this.frontList(player).forEach((l) => {
                  l.inst.flags.tempAtk = (l.inst.flags.tempAtk || 0) + Number(param.atk);
                });
              }
              this._log(sd.name + ' reagiert auf AP-Verlust.');
            }
          }
        });
      });
    }
    /**
     * Prüft eine strukturierte Bedingung im gegebenen Kontext.
     * @param {object} player
     * @param {object} cond
     * @param {object} context
     * @returns {boolean}
     */
    _checkCondition(player, cond, context) {
      if (!cond) return true;
      const c = cond;
      if (c.minUnits != null) {
        const n = this.frontList(player).length;
        if (n < Number(c.minUnits)) return false;
      }
      if (c.maxUnits != null) {
        const n = this.frontList(player).length;
        if (n > Number(c.maxUnits)) return false;
      }
      if (c.section && context && context.section && c.section !== context.section) return false;
      if (c.damaged && context && context.inst && context.inst.def >= context.inst.defMax) return false;
      if (c.enemyLess && context && context.section) {
        const opp = this.opponent(player.id);
        const own = this.frontList(player).filter((l) => l.section === context.section).length;
        const enemy = this.frontList(opp).filter((l) => l.section === context.section).length;
        if (enemy >= own) return false;
      }
      return true;
    }
    /**
     * Trigger des Gegners auf ein feindliches Ereignis.
     * @param {object} owner
     * @param {string} event
     * @param {object} context
     */
    _fireEnemyTriggers(owner, event, context) {
      const opp = this.opponent(owner.id);
      (opp.support || []).filter(Boolean).forEach((sup) => {
        const sd = this.defOf(sup);
        (sd.effects || []).forEach((e) => {
          if (e.code === 'ON_ENEMY_' + event.toUpperCase()) {
            if (!this._checkCondition(opp, e.param && e.param.if, context)) return;
            const param = e.param || {};
            if (param.draw) this._draw(opp, Number(param.draw) || 1);
            if (param.ap) opp.ap += Number(param.ap) || 1;
            if (param.restrict) opp.flags.restrictNext = event;
            this._log(sd.name + ' reagiert auf gegnerisches ' + event + '.');
          }
        });
      });
      // Auch auf Einheiten
      this.frontList(opp).forEach((l) => {
        const ud = this.defOf(l.inst);
        (ud.effects || []).forEach((e) => {
          if (e.code === 'ON_ENEMY_' + event.toUpperCase()) {
            if (!this._checkCondition(opp, e.param && e.param.if, context)) return;
            if (e.param && e.param.atk) l.inst.flags.tempAtk = (l.inst.flags.tempAtk || 0) + Number(e.param.atk);
            this._log(ud.name + ' reagiert auf gegnerisches ' + event + '.');
          }
        });
      });
    }
    /**
     * Hook: Gegner spielt eine Karte in einem Abschnitt.
     * @param {object} player
     * @param {string} section
     * @param {object} inst
     */
    _onEnemyPlay(player, section, inst) {
      this._fireEnemyTriggers(player, 'PLAY', { section: section, inst: inst });
    }
    /**
     * Hook: Gegner greift in einem Abschnitt an.
     * @param {object} attackerPlayer
     * @param {string} section
     */
    _onEnemyAttack(attackerPlayer, section) {
      this._fireEnemyTriggers(attackerPlayer, 'ATTACK', { section: section });
    }
    /**
     * Hook: eine Einheit des Besitzers im Abschnitt wird zerstört.
     * @param {object} owner
     * @param {string} section
     */
    _onEnemyDestroy(owner, section) {
      this._fireEnemyTriggers(owner, 'DESTROY', { section: section });
    }
    /**
     * Hook: eine Einheit des Besitzers erleidet Schaden.
     * @param {object} owner
     * @param {string} section
     * @param {object} inst
     */
    _onEnemyDamage(owner, section, inst) {
      this._fireEnemyTriggers(owner, 'DAMAGE', { section: section, inst: inst });
    }
    /**
     * Militärisches Ereignis (Angriffstyp) für Reaktionskarten.
     * @param {object} attacker
     * @param {string} eventType
     * @param {object} targetLoc
     */
    _fireMilitaryEvent(attacker, eventType, targetLoc) {
      const def = this.defOf(attacker);
      const tags = ((def.klasse || '') + ' ' + (def.tags || []).join(' ')).toLowerCase();
      // Automatische Erkennung
      let events = [eventType];
      if (tags.includes('moerser') || tags.includes('mörser') || tags.includes('kleinartillerie')) events.push('MORTAR');
      if (tags.includes('artillerie') && !tags.includes('moerser') && !tags.includes('mörser')) events.push('ARTILLERY');
      if (tags.includes('schwerartillerie')) events.push('HEAVY');
      if (tags.includes('mg') || tags.includes('maschinengewehr')) events.push('MG');
      if (tags.includes('granate')) events.push('GRENADE');
      if (tags.includes('mine')) events.push('MINE');
      events = [...new Set(events)];

      events.forEach((ev) => {
        // Eigene Reaktionen
        this._reactToMilitary(attacker.owner != null ? this.player(attacker.owner) : null, ev, targetLoc, false);
        // Gegnerische Reaktionen
        if (targetLoc && targetLoc.player) {
          this._reactToMilitary(targetLoc.player, ev, targetLoc, true);
        }
      });
    }
    /**
     * Reaktionsfenster auf ein militärisches Ereignis.
     * @param {object} player
     * @param {string} eventType
     * @param {object} loc
     * @param {boolean} isDefender
     */
    _reactToMilitary(player, eventType, loc, isDefender) {
      if (!player) return;
      const prefix = isDefender ? 'ON_DEFEND_' : 'ON_';
      (player.support || []).filter(Boolean).forEach((sup) => {
        const sd = this.defOf(sup);
        (sd.effects || []).forEach((e) => {
          if (e.code === prefix + eventType || e.code === 'ON_' + eventType) {
            if (!this._checkCondition(player, e.param && e.param.if, { section: loc && loc.section, inst: loc && loc.inst })) return;
            const param = e.param || {};
            if (param.reduce && loc && loc.inst) {
              // Schaden reduzieren — wird vom Aufrufer genutzt
              loc.inst.flags.dmgReduce = (loc.inst.flags.dmgReduce || 0) + Number(param.reduce);
            }
            if (param.draw) this._draw(player, Number(param.draw) || 1);
            if (param.atk && loc && loc.inst) loc.inst.flags.tempAtk = (loc.inst.flags.tempAtk || 0) + Number(param.atk);
            this._log(sd.name + ' reagiert auf ' + eventType + '.');
          }
        });
      });
    }
    /**
     * Wählt einen Seltenheitswert (Bronze/Silber/Gold).
     * @param {string} rarity
     * @param {*} bronze
     * @param {*} silver
     * @param {*} gold
     * @returns {*}
     */
    _tierParam(rarity, bronze, silver, gold) {
      const r = (rarity || '').toLowerCase();
      if (r === 'gold' || r === 'gold') return gold;
      if (r === 'silver' || r === 'silber') return silver;
      return bronze;
    }
    /**
     * Maschinengewehr-/MG-Stufe der Definition.
     * @param {object} defn
     * @returns {number}
     */
    _mgTier(defn) {
      const tags = ((defn.klasse || '') + ' ' + (defn.tags || []).join(' ')).toLowerCase();
      if (tags.includes('schwer') && tags.includes('mg')) return 'HEAVY_MG';
      if (tags.includes('mittel') && tags.includes('mg')) return 'MED_MG';
      if (tags.includes('mg') || tags.includes('maschinengewehr')) return 'LIGHT_MG';
      return null;
    }
    /**
     * True, wenn die Definition gepanzert ist (Tags).
     * @param {object} defn
     * @returns {boolean}
     */
    _isArmored(defn) {
      const tags = ((defn.klasse || '') + ' ' + (defn.tags || []).join(' ')).toLowerCase();
      return tags.includes('gepanzert') || tags.includes('panzer') || tags.includes('kette');
    }
    /**
     * Unterdrückt eine Einheit für `turns` Züge.
     * @param {object} inst
     * @param {number} turns
     */
    _applySuppress(inst, turns) {
      if (!inst) return;
      inst.flags.suppressed = (inst.flags.suppressed || 0) + (turns || 1);
      inst.flags.noAttack = true;
      this._log(this.defOf(inst).name + ' ist unterdrückt.');
    }
    /**
     * Zählt Unterdrückungsmarken am Zugwechsel herunter.
     * @param {object} player
     */
    _tickSuppress(player) {
      this.frontList(player).forEach((l) => {
        if (l.inst.flags && l.inst.flags.suppressed > 0) {
          l.inst.flags.suppressed -= 1;
          if (l.inst.flags.suppressed <= 0) {
            l.inst.flags.suppressed = 0;
            l.inst.flags.noAttack = false;
            this._log(this.defOf(l.inst).name + ' ist nicht mehr unterdrückt.');
          }
        }
      });
    }
    /**
     * Pionieraktion auf ein Ziel (bauen, räumen, …).
     * @param {object} player
     * @param {string} targetUid
     * @param {string} action
     */
    _engineerAction(player, targetUid, action) {
      const loc = this.findInst(targetUid);
      if (!loc) return false;
      if (action === 'clear_mine') {
        loc.inst.tokens = (loc.inst.tokens || []).filter((t) => t.type !== 'minenfeld');
        this._log('Minen geräumt.');
        return true;
      }
      if (action === 'place_cover') {
        loc.inst.flags.cover = (loc.inst.flags.cover || 0) + 1;
        this._log('Deckung ausgebaut.');
        return true;
      }
      return false;
    }
    /**
     * Deckt die Einheit `targetUid` auf, falls verdeckt.
     * @param {string} targetUid
     */
    _revealUnit(targetUid) {
      const loc = this.findInst(targetUid);
      if (!loc || !loc.inst.facedown) return false;
      return this._revealInst(loc.inst);
    }
    /**
     * Startet eine laufende Operation (Verzögerte Wirkung mit Bedingung).
     * @param {object} player
     * @param {object} card
     * @param {object} condition
     */
    _startOperation(player, card, condition) {
      if (!player.operations) player.operations = [];
      card.flags = card.flags || {};
      card.flags.opCondition = condition || {};
      card.flags.opTurns = 0;
      player.operations.push(card);
      this._log(this.defOf(card).name + ' läuft als Operation.');
    }
    /**
     * Prüft und löst laufende Operationen am Zugpunkt aus.
     * @param {object} player
     */
    _tickOperations(player) {
      if (!player.operations) return;
      const remaining = [];
      player.operations.forEach((op) => {
        op.flags.opTurns = (op.flags.opTurns || 0) + 1;
        const cond = op.flags.opCondition || {};
        let done = false;
        if (cond.turns && op.flags.opTurns >= Number(cond.turns)) done = true;
        if (cond.onDestroy && player.flags.lastDestroyed) done = true;
        if (cond.manual) done = false;
        if (done) {
          this._resolveOperation(player, op);
          player.grave.push(op);
          this._log(this.defOf(op).name + ' abgeschlossen.');
        } else {
          remaining.push(op);
        }
      });
      player.operations = remaining;
    }
    /**
     * Wertet eine fällige Operation aus.
     * @param {object} player
     * @param {object} op
     */
    _resolveOperation(player, op) {
      const def = this.defOf(op);
      (def.effects || []).forEach((e) => {
        if (e.code === 'OP_COMPLETE') {
          const param = e.param || {};
          if (param.draw) this._draw(player, Number(param.draw) || 1);
          if (param.damage && param.target) {
            const loc = this.findInst(param.target);
            if (loc) this._damage(loc.inst, Number(param.damage) || 1);
          }
          if (param.ap) player.ap += Number(param.ap) || 1;
        }
      });
    }
    /**
     * Beendet und entfernt eine Operation.
     * @param {object} player
     * @param {string} opUid
     */
    _endOperation(player, opUid) {
      if (!player.operations) return false;
      const idx = player.operations.findIndex((o) => o.uid === opUid);
      if (idx < 0) return false;
      const op = player.operations.splice(idx, 1)[0];
      this._resolveOperation(player, op);
      player.grave.push(op);
      this._log(this.defOf(op).name + ' beendet.');
      return true;
    }
    
    // --- Allgemeine Schlüsselwörter ---
/**
     * Prüft Siegbedingungen (Trophy oder Legacy `classic`) und beendet die Partie bei Erfüllung.
     * Trophy-Logik liegt in `victory_trophy.js`.
     */
    _checkVictory() {
      this.state.players.forEach((p) => {
        if (p.vp >= this.rules.vp_to_win) this._end(p.id, p.vp + ' Siegpunkte');
      });
    }

    // Zugwechsel: AP, ziehen, Angriffe zurücksetzen.
    /* ===== Schlüsselwörter (allgemeines Vokabular, def.keywords) ===== */
    _kw(inst, word) {
      if (!inst) return false;
      const d = this.defOf(inst);
      return !!(d && Array.isArray(d.keywords) && d.keywords.indexOf(word) >= 0);
    }
    /**
     * ATK-Bonus aus allgemeinen Schlüsselwörtern (z. B. Erbitterung).
     * @param {object} inst
     * @param {object} owner
     * @returns {number}
     */
    _kwAtkBonus(inst, owner) {
      const out = { total: 0, why: [] };
      if (!inst || !owner) return out;
      const loc = this.findInst(inst.uid);
      if (!loc || loc.zone !== 'front') return out;
      const add = (n, w) => { out.total += n; out.why.push(w); };
      if (this._kw(inst, 'Überlast')) add(2, 'Überlast: +2 Angriff');
      if (this._kw(inst, 'Erbitterung')) { const n = Math.min(3, Number(owner.flags && owner.flags.kwFallen || 0)); if (n) add(n, 'Erbitterung: +' + n + ' Angriff'); }
      if (this._kw(inst, 'Staffelangriff') && this.state.active === owner.id && this.state.kwAtk && this.state.kwAtk.turn === this.state.turn &&
          this.state.kwAtk.uids.some((u) => u !== inst.uid)) add(1, 'Staffelangriff: +1 Angriff');
      return out;
    }
    /**
     * Entlastungs-/Abschirmungswert an einer Stellung.
     * @param {object} p
     * @param {string} section
     * @param {number} row
     * @returns {number}
     */
    _kwReliefAt(p, section, row) {
      const m = p && p.flags && p.flags.kwRelief && p.flags.kwRelief[section + row];
      return !!(m && this.state.turn <= m.until && !(p.front[section] && p.front[section][row]));
    }
    /**
     * Stellungen, die Abschirmung/Entlastung spenden oder empfangen.
     * @param {object} p
     * @returns {object[]}
     */
    _kwReliefSlots(p) {
      if (!p || !p.flags || !p.flags.kwRelief) return [];
      return Object.keys(p.flags.kwRelief).filter((k) => this._kwReliefAt(p, k[0], Number(k.slice(1))));
    }

    /* Laufende Neuberechnung nach jeder Aktion: Sicherung, Zähigkeit, Überlast-DEF,
       Ablösungs-Markierungen, Hinterhalt-/Platztausch-Erkennung beim Aufdecken. */
    _kwRecompute() {
      if (!this.state || !this.state.players) return;
      this.state.players.forEach((p) => {
        p.flags = p.flags || {};
        if (p.flags.kwRelief) Object.keys(p.flags.kwRelief).forEach((k) => {
          const m = p.flags.kwRelief[k];
          if (!m || this.state.turn > m.until || (p.front[k[0]] && p.front[k[0]][Number(k.slice(1))])) delete p.flags.kwRelief[k];
        });
        const fl = this.frontList(p);
        const fallen = Math.min(3, Number(p.flags.kwFallen || 0));
        fl.forEach((l) => {
          const inst = l.inst; inst.flags = inst.flags || {};
          if (inst.def == null) return;
          const sich = fl.filter((o) => o.inst.uid !== inst.uid && o.section === l.section && !o.inst.facedown && this._kw(o.inst, 'Sicherung')).length;
          const zaeh = this._kw(inst, 'Zähigkeit') ? fallen : 0;
          const over = this._kw(inst, 'Überlast') ? 1 : 0;
          const delta = (sich - (inst.flags.kwSich || 0)) + (zaeh - (inst.flags.kwZaeh || 0)) + (over - (inst.flags.kwOver || 0));
          if (delta) {
            inst.defMax = Math.max(1, (inst.defMax == null ? inst.def : inst.defMax) + delta);
            inst.def = delta > 0 ? inst.def + delta : Math.max(1, Math.min(inst.def + delta, inst.defMax));
          }
          inst.flags.kwSich = sich; inst.flags.kwZaeh = zaeh; inst.flags.kwOver = over;
          if (inst.facedown) { inst.flags.kwHidden = true; }
          else if (inst.flags.kwHidden) {
            inst.flags.kwHidden = false;
            if (this._kw(inst, 'Hinterhalt')) inst.flags.kwAmbushReady = true;
            if (this._kw(inst, 'Platztausch')) { p.flags.kwSwap = p.flags.kwSwap || []; if (p.flags.kwSwap.indexOf(inst.uid) < 0) p.flags.kwSwap.push(inst.uid); }
          }
        });
      });
      // Platztausch-Angebot nur, wenn der Besitzer am Zug ist und nichts anderes offen ist.
      const act = this.player(this.state.active);
      if (!this.state.pending && act && act.flags && act.flags.kwSwap && act.flags.kwSwap.length) {
        while (act.flags.kwSwap.length) {
          const uid = act.flags.kwSwap.shift();
          const loc = this.findInst(uid);
          if (!loc || loc.zone !== 'front' || loc.inst.facedown || (this._tacMayMove && !this._tacMayMove(loc.inst))) continue;
          const hid = this.frontList(act).filter((l) => l.inst.facedown && l.inst.uid !== uid && (!this._tacMayMove || this._tacMayMove(l.inst)));
          if (!hid.length) continue;
          this.state.pending = this._sealPending({
            kind: 'kw-swap', player: act.id, uid: uid,
            prompt: 'Platztausch: ' + this.defOf(loc.inst).name + ' mit einer eigenen verdeckten Einheit tauschen?',
            choices: hid.map((l) => ({ target: l.inst.uid, label: 'Verdeckte Einheit auf ' + l.section + (l.row + 1) })).concat([{ target: 'kw:none', label: 'Nicht tauschen' }])
          });
          break;
        }
      }
    }
    /**
     * Löst einen Platztausch (Schlüsselwort) mit dem gewählten Ziel auf.
     * @param {number} pid
     * @param {object} target
     */
    _resolveKwSwap(pid, target) {
      const pend = this.state.pending;
      this.state.pending = null;
      if (target === 'kw:none' || !target) { this._log('Platztausch: kein Tausch.'); return { ok: true }; }
      const a = this.findInst(pend.uid), b = this.findInst(target);
      if (!a || !b || a.zone !== 'front' || b.zone !== 'front' || a.player.id !== pid || b.player.id !== pid || !b.inst.facedown) throw new Error('Platztausch nicht möglich');
      if (this._tacAssertMove) { this._tacAssertMove(a.inst); this._tacAssertMove(b.inst); }
      if (this._tacDepart) { this._tacDepart(a.inst,false); this._tacDepart(b.inst,false); }
      const p = a.player;
      p.front[a.section][a.row] = b.inst;
      p.front[b.section][b.row] = a.inst;
      this._log('Platztausch: ' + this.defOf(a.inst).name + ' tauscht mit einer verdeckten Einheit.');
      this._applyMech(p); this._applyFuehrung(p); this._applyFlankDef(p);
      return { ok: true };
    }
    /**
     * Legale Zielstellungen für Stellungswechsel der Einheit `uid`. Öffentlich für die UI.
     * @param {string} uid
     * @returns {object[]}
     */
    kwMoveSlots(uid) {
      const loc = this.findInst(uid);
      if (!loc || loc.zone !== 'front' || loc.inst.facedown || !this._kw(loc.inst, 'Stellungswechsel')) return [];
      if (this._tacMayMove && !this._tacMayMove(loc.inst)) return [];
      if (loc.inst.flags && loc.inst.flags.kwMovedTurn === this.state.turn) return [];
      return adjacentSections(loc.section).filter((s) => loc.player.front[s] && !loc.player.front[s][loc.row]).map((s) => ({ section: s, row: loc.row }));
    }
    /**
     * Aktion: Stellungswechsel auf eine legale Nachbar-/Zielstellung.
     * @param {number} pid
     * @param {object} a
     */
    _actKwMove(pid, a) {
      if (this.state.active !== pid || this.state.pending) throw new Error('Stellungswechsel nur im eigenen Zug ohne offene Wahl');
      const loc = this.findInst(a.uid);
      if (!loc || loc.player.id !== pid) throw new Error('Einheit ungültig');
      const slots = this.kwMoveSlots(a.uid);
      const want = a.slot && slots.find((s) => s.section === a.slot.section && s.row === Number(a.slot.row));
      if (!want) throw new Error('Kein freies benachbartes Feld derselben Reihe');
      const p = loc.player;
      if (this._tacDepart) this._tacDepart(loc.inst,false);
      p.front[loc.section][loc.row] = null;
      p.front[want.section][want.row] = loc.inst;
      if (this._tacOnEntry) this._tacOnEntry(loc.inst,want.section,loc.section);
      loc.inst.flags = loc.inst.flags || {};
      loc.inst.flags.kwMovedTurn = this.state.turn;
      loc.inst.flags.kwNoAtkTurn = this.state.turn;
      this._log('Stellungswechsel: ' + this.defOf(loc.inst).name + ' wechselt auf ' + want.section + (want.row + 1) + ' und greift in diesem Zug nicht an.');
      this._applyMech(p); this._applyFuehrung(p); this._applyFlankDef(p);
      return { ok: true };
    }
    
    // --- Zugende, offene Wahlen, Spezialaktionen ---
/**
     * Zugende: Aufräumen, Trophy-Tick, Zugwechsel, Ziehen, AP-Erneuerung.
     * Der Startspieler behält in späteren Zügen die volle AP-Bank; nur Zug 1 ist reduziert.
     * @param {number} pid
     */
    /**
     * Darf `pid` jetzt einen Mulligan nehmen? (RULES §23.4, t283)
     * Bedingungen: eigener erster Zug (Partiezug 1 bzw. 2), am Zug, keine offene Wahl, noch keine andere Aktion,
     * noch kein Mulligan, mindestens `mulligan_ap` AP.
     * @param {number} pid 0|1
     * @returns {boolean}
     */
    canMulligan(pid) {
      const st = this.state;
      if (!st || st.winner != null || st.active !== pid || st.pending) return false;
      if (this.rules.mulligan === false) return false;
      const p = this.player(pid);
      if (!p || !p.flags || p.flags.mulliganDone || p.flags.mulliganClosed) return false;
      if (st.turn > 2) return false;
      return Number(p.ap || 0) >= Number(this.rules.mulligan_ap != null ? this.rules.mulligan_ap : 1);
    }
    /**
     * Mulligan: ganze Hand ins Deck mischen, neue Starthand (`hand_start`, 5) ziehen, `mulligan_ap` (1) AP zahlen.
     * Einmal je Partie, nur vor der ersten eigenen Aktion im ersten Zug.
     * @param {number} pid 0|1
     * @returns {{ok: boolean, error?: string}}
     */
    _actMulligan(pid) {
      if (!this.canMulligan(pid)) return { ok: false, error: 'Mulligan nur im ersten eigenen Zug vor jeder anderen Aktion (1 AP)' };
      const p = this.player(pid);
      const cost = Number(this.rules.mulligan_ap != null ? this.rules.mulligan_ap : 1);
      const n = Number(this.rules.mulligan_hand || this.rules.hand_start || 5);
      p.ap -= cost;
      p.deck = p.deck.concat(p.hand);
      this._shuffle(p.deck);
      p.hand = [];
      p.flags.mulliganDone = true;
      // Neue Starthand ohne Einzel-Ziehereignisse (sonst fünf „zieht eine Karte“-Einblendungen); ein Sammelereignis folgt.
      const wasMuted = this.state._muteEvents;
      this.state._muteEvents = true;
      try { this._draw(p, n); } finally { this.state._muteEvents = wasMuted; }
      this._log(p.name + ' nimmt einen Mulligan: neue Starthand (' + p.hand.length + ' Karten) für ' + cost + ' AP.');
      this._evt('shout', null, p.name + ': Mulligan – neue Starthand für ' + cost + ' AP', { owner: pid });
      return { ok: true };
    }
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
            this._damage(l.inst, Number(this._codeParam('ZEAL', 'after', 2)), { tag: 'eifer' });
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
      this.frontList(this.player(pid)).forEach((l) => {
        if (!this._kw(l.inst, 'Überlast') || l.inst.def == null) return;
        l.inst.def = Math.max(0, l.inst.def - 1); // Überlast: nicht verhinderbar
        this._log('Überlast: ' + this.defOf(l.inst).name + ' erleidet 1 Schaden → V ' + l.inst.def + '.');
        if (this._isDead(l.inst)) this._destroy(l);
      });
      const cur = this.player(pid);
      this.frontList(cur).forEach((l) => {
        const hasShovel = (l.inst.attachments || []).some((c) => this._defHas(this.defOf(c), 'SCHANZEN'));
        if (hasShovel && !l.inst.attackUsed) {
          l.inst.flags.schanzen = (l.inst.flags.schanzen || 0) + 1;
          l.inst.def = (l.inst.def || 0) + 1;
          l.inst.defMax = (l.inst.defMax || l.inst.def) + 1;
        }
        // Ruhezug: unit did not attack this turn
        if (!l.inst.attackUsed) {
          (l.inst.attachments || []).forEach((eq) => {
            (this.defOf(eq).effects || []).forEach((e) => {
              if (e.code !== 'EQUIP_ON_REST') return;
              const rp = e.param || {};
              if (rp.heal) this._heal(l.inst, Number(rp.heal));
              if (rp.atk) {
                l.inst.flags = l.inst.flags || {};
                l.inst.flags.buffAtk = (l.inst.flags.buffAtk || 0) + Number(rp.atk);
              }
              this._log(this.defOf(eq).name + ': Ruhezug-Effekt.');
            });
          });
        }
        if (l.inst.flags && l.inst.flags.niederUntilOwner) {
          l.inst.flags.noAttack = false;
          l.inst.flags.niederUntilOwner = false;
        }
      });
      // Kein Loch: if no own destruction in section → heal 1
      if (cur.flags && cur.flags.keinLoch && cur.flags.keinLoch.until === this.state.turn) {
        const kl = cur.flags.keinLoch;
        if (!kl.destroyed) {
          this.frontList(cur).forEach((l) => {
            if (l.section === kl.section) this._heal(l.inst, Number(kl.heal || 1));
          });
        }
        cur.flags.keinLoch = null;
      }
      this._applySupportCondDef(cur);
      if ((cur.support || []).some((s) => s && this._defHas(this.defOf(s), 'ELITE_DRAW'))) {
        const n = this.frontList(cur).filter((l) => hasTag(this.defOf(l.inst), 'elite')).length;
        if (n > 2) this._draw(cur, 1);
      }
      const nxtId = pid === 0 ? 1 : 0;
      const nxt = this.player(nxtId);
      // leftover AP stay as reaction bank on the player who just ended
      this._log(cur.name + ' beendet den Zug mit ' + cur.ap + ' AP in Reserve.'); // Zeile ins Protokoll
      // new turn player: expire their old leftover, gain 5
            nxt.ap = this.rules.ap_per_turn;
      (nxt.support || []).forEach((s) => {
        if (!s) return;
        (this.defOf(s).effects || []).forEach((x) => {
          if (x.code === 'TURN_AP' && (!(x.param || {}).openOnly || !s.facedown)) nxt.ap += Number(x.param.ap || 1);
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
            const pool = this.frontList(opp).filter((l) => Number(this.defOf(l.inst).ap || 99) <= Number(s.flags.sleeperMaxAp || 3)); // Param `maxAp`
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
              s.flags.patient = null;
              s.flags.nestReturn = false;
            }
          } else if (u && u.def != null) {
            u.def = Math.min(u.defMax || u.def, (u.def || 0) + 1);
            /* Lazarett (HOSPITAL): voll geheilt zurück auf das eigene Ursprungsfeld, sobald es frei ist. */
            const home = s.flags.home;
            if (u.def >= (u.defMax || u.def) && home && !nxt.front[home.section][home.row]) {
              nxt.front[home.section][home.row] = u;
              s.flags.patientUid = null; s.flags.patient = null;
              this._log(this.defOf(u).name + ' kehrt aus dem Lazarett zurück.');
            }
          }
        }
        if (!s || !s.flags) return;
        if (s.flags.dekon) {
          s.flags.dekon = false;
          s.flags.exhausted = true;
          s.flags.restExhaustedTurn = this.state.turn + 1; // t285: kein Überschuss-Ziel (Zugzähler steigt danach)
        } else s.flags.exhausted = false;
      });
      this.frontList(nxt).forEach((l) => {
        l.inst.attackUsed = false;
        if (l.inst.flags) l.inst.flags.exhausted = false;
        if (l.inst.flags) l.inst.flags.paused = false;
        if (l.inst.flags && l.inst.flags.dekon) l.inst.flags.exhausted = true;
        if (l.inst.flags && l.inst.flags.eiferUntil === this.state.turn) {
          this._damage(l.inst, Number(this._codeParam('ZEAL', 'after', 2)), { tag: 'eifer' });
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
        if (l.inst.flags && l.inst.flags.noAttackHold) l.inst.flags.noAttackHold = false;
        else if (l.inst.flags && l.inst.flags.noAttack) l.inst.flags.noAttack = false;
        if (l.inst.flags && l.inst.flags.napalm) {
          const nTick = l.inst.flags.napalm === true ? 1 : Number(l.inst.flags.napalm) || 1;
          this._damage(l.inst, nTick, { tag: 'napalm' });
          this._log(this.defOf(l.inst).name + ' brennt (Napalm ' + nTick + ').');
        }
        // heal equipment
        l.inst.attachments.forEach((eq) => {
          const ed = this.defOf(eq);
          (ed.effects || []).forEach((e) => {
            if (e.code === 'HEAL') {
              const v = Number(e.param.host || e.param.value || 2);
              l.inst.def = Math.min(l.inst.defMax || l.inst.def, (l.inst.def || 0) + v);
            }
            if (e.code === 'EQUIP_TURN_START_HEAL') {
              const ep = e.param || {};
              if (ep.ifDamaged && !this._isDamaged(l.inst)) return;
              this._heal(l.inst, Number(ep.heal || 1));
              if (ep.thenDmgAdjInf) {
                this._neighbors(nxt, l.section, l.row).forEach((n) => {
                  if (n.inst && isInfantry(this.defOf(n.inst))) {
                    this._damage(n.inst, Number(ep.thenDmgAdjInf), { tag: 'wartung' });
                    if (this._isDead(n.inst)) this._destroy({ inst: n.inst, player: nxt, zone: 'front', section: n.section, row: n.row });
                  }
                });
              }
            }
          });
        });
        this._applySupportCondDef(nxt);
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
        // t267: MEDIZIN liest `self`/`flank` (Vorgabe 3/2 wie Feldlazarett-Ausrüstung)
        const medFx = [];
        (l.inst.attachments || []).forEach((c) => (this.defOf(c).effects || []).forEach((x) => { if (x.code === 'MEDIZIN') medFx.push(x.param || {}); }));
        const bag = (l.inst.attachments || []).filter((c) => this._defHas(this.defOf(c), 'TASCHE')).length;
        const medSelf = medFx.reduce((s2, q) => s2 + Number(q.self != null ? q.self : 3), 0);
        const medFlank = medFx.reduce((s2, q) => s2 + Number(q.flank != null ? q.flank : 2), 0);
        if (medSelf) l.inst.def = Math.min(l.inst.defMax || l.inst.def, (l.inst.def || 0) + medSelf);
        if (bag) l.inst.def = Math.min(l.inst.defMax || l.inst.def, (l.inst.def || 0) + 2 * bag);
        if (medFlank) this._neighbors(nxt, l.section, l.row).forEach((n) => {
          if (!n.inst) return;
          n.inst.def = Math.min(n.inst.defMax || n.inst.def, (n.inst.def || 0) + medFlank);
        });
      });
      this.state.active = nxtId;
      this.state.turn += 1;
      this.state.players.forEach((pl) => this._expireSectionAuras(pl));
      try { this._cmTurnStart(nxt); } catch (e) { /* CM-Zugbeginn darf Zugwechsel nicht brechen */ }
      this.state.phase = 'main';
      this.frontList(nxt).forEach((l) => {
        if (!l.inst.flags) return;
        if (l.inst.flags.digInBonus && l.inst.flags.digInUntil != null && l.inst.flags.digInUntil < this.state.turn) {
          const b = Number(l.inst.flags.digInBonus || 1);
          l.inst.def = Math.max(1, (l.inst.def || 1) - b);
          if (l.inst.defMax != null) l.inst.defMax = Math.max(l.inst.def, l.inst.defMax - b);
          l.inst.flags.digInBonus = 0;
          l.inst.flags.digInUntil = null;
        }
        // Eingraben endet mit Beginn des nächsten eigenen Zugs (turn > noCombatUntil)
        if (l.inst.flags.noCombatUntil != null && l.inst.flags.noCombatUntil < this.state.turn) {
          l.inst.flags.noCombatUntil = null;
        }
      });
      this.state.peaceOffer = null;
      this._log(nxt.name + ' — Zug ' + this.state.turn + ', ' + nxt.ap + ' AP.');
      if ((nxt.support || []).some((s) => s && this._defHas(this.defOf(s), 'PEEK_ENEMY_TOP') && s.summonedTurn !== this.state.turn)) {
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
      const grind = (nxt.support || []).find((s) => s && this._defHas(this.defOf(s), 'ATTRITION') && s.summonedTurn !== this.state.turn);
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
    /**
     * Verteilt eine Antwort auf das passende `_act*`, solange `pending` offen ist.
     * @param {number} pid
     * @param {object} a
     */
    _resolvePending(pid, a) {
      if (a.confirm) return this._actConfirmTargets(pid, a);
      if (a.slot) return this._actSlot(pid, a); // Einheit auf eine Stellung legen
      if (a.target) return this._actTarget(pid, a); // Ziel aufnehmen oder Kampf lösen
      return { ok: false, error: 'Pending unklar' };
    }
    /**
     * Schließt eine offene Wahl ab und räumt `pending`.
     * @param {object} spec
     */
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
    /**
     * Öffnet eine Wahl (`pending`): UI/Bot müssen mit TARGET/SLOT/COIN/CANCEL antworten.
     * @param {object} spec Art, Spieler, erlaubte Ziele, Meta
     */
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
    /**
     * Wählt ein Nebel-Motiv für den Token (rein kosmetisch).
     * @returns {string}
     */
    pickFogArt() {
      const arts = ['token-nebel-1.jpg', 'token-nebel-2.jpg', 'token-nebel-3.jpg'];
      return arts[Math.floor(this.rand() * arts.length)];
    }
    /**
     * Alias: Instanz aus Katalog-ID erzeugen.
     * @param {string} cardId
     * @param {number} owner
     * @returns {object}
     */
    _makeInst(cardId, owner) {
      const inst = this.instFromId(cardId, owner);
      return inst;
    }
    /**
     * Lineare Slotnummer aus Abschnitt und Reihe.
     * @param {string} section
     * @param {number} row
     * @returns {number}
     */
    _lineIndex(section, row) {
      const s = { L: 0, C: 1, R: 2 }[section] || 0;
      return s * 3 + (row || 0);
    }
    /**
     * Stellung eines Spielers anhand des linearen Index.
     * @param {object} player
     * @param {number} idx
     * @returns {object|null}
     */
    _slotAt(player, idx) {
      if (idx < 0 || idx > 8) return null;
      const section = ['L', 'C', 'R'][Math.floor(idx / 3)];
      const row = idx % 3;
      const inst = player.front[section][row];
      return inst ? { inst, player, zone: 'front', section, row } : { inst: null, player, zone: 'front', section, row };
    }
    /**
     * Entfernt Deckung von der Instanz.
     * @param {object} inst
     */
    _dropCover(inst) {
      if (!inst || !inst.tokens) return;
      const covers = inst.tokens.filter((t) => t.type === 'deckung' || t.type === 'cover');
      if (covers.length) {
        const bonus = covers.reduce((s, tok) => s + Number(tok.def != null ? tok.def : 3), 0);
        inst.def = Math.max(1, (inst.def || 0) - bonus);
        inst.defMax = Math.max(1, (inst.defMax || inst.def) - bonus);
        if (inst.def > inst.defMax) inst.def = inst.defMax;
      }
      inst.tokens = inst.tokens.filter((t) => t.type !== 'deckung' && t.type !== 'cover');
    }
    /**
     * Setzt ggf. die Blitzkrieg-Sperre nach einem Einrücken.
     * @param {object} loc
     */
    _maybeBlitzLock(loc) {
      if (!loc || !loc.inst || !loc.player) return;
      if (loc.zone && loc.zone !== 'front') return;
      if (loc.inst.summonedTurn !== this.state.turn) return;
      const p = loc.player;
      if (!this._hasDoctrine(p, 'BLITZ_LOCK_SUPPORT')) return;
      const d = this.defOf(loc.inst);
      if (!hasTag(d, 'panzer')) return;
      const opp = this.opponent(p.id);
      opp.flags = opp.flags || {};
      // Zähler 2: überlebt das Zugende des Ausspielenden, gilt im folgenden gegnerischen Zug, fällt an dessen Ende.
      opp.flags.blitzLock = 2;
      this._log('Blitzkrieg: Sonderfähigkeiten der Unterstützung von ' + opp.name + ' sind in der nächsten Runde gesperrt.');
    }
    /**
     * Gegner zahlt AP und entfernt eine Schläferzelle (Effekt `NEUTRALIZE`).
     * @param {number} pid
     * @param {object} loc
     * @returns {object|null}
     */
    _tryNeutralize(pid, loc) {
      if (!loc || loc.zone !== 'support' || !loc.inst || loc.player.id === pid) return null;
      const def = this.defOf(loc.inst);
      const fx = (def.effects || []).find((x) => x.code === 'NEUTRALIZE');
      if (!fx) return null;
      if (this.state.active !== pid) throw new Error('Neutralisierung nur im eigenen Zug');
      if (this.state.pending) throw new Error('Erst Ziel wählen');
      if (loc.inst.facedown) throw new Error('Verdeckt');
      const cost = Number((fx.param && fx.param.ap) || 2);
      const p = this.player(pid);
      if (p.ap < cost) throw new Error('Zu wenig AP');
      this._spend(p, cost);
      this._destroy({ inst: loc.inst, player: loc.player, zone: 'support', index: loc.index });
      this._log(p.name + ' neutralisiert ' + def.name + ' (' + cost + ' AP).');
      return { ok: true };
    }
    /**
     * Aktiviert eine Unterstützungsfähigkeit (allgemeiner Einstieg).
     * @param {number} pid
     * @param {object} a
     */
    _actActivateSupport(pid, a) {
      return this._actUseAbility(pid, a);
    }
    /**
     * Kartenspezifisch: Schutzwall.
     * @param {number} pid
     * @param {object} a
     */
    /**
     * Doktrin Bollwerk – Schutzwall (t283 vollständig): `ap` AP (Standard 2), einmal pro eigenem Zug
     * (`once_per_round`), legt eine Befestigung (Tag `befestigung`) aus dem eigenen Ablagestapel auf die Hand.
     * @param {number} pid
     * @param {object} [a] optional `uid` der gewünschten Karte im Ablagestapel
     * @returns {{ok: boolean}}
     */
    _actSchutzwall(pid, a) {
      const p = this.player(pid);
      if (this.state.active !== pid) throw new Error('Nur im eigenen Zug');
      const eff = ((p.doctrines || []).map((d) => this.defOf(d)).filter(Boolean)
        .reduce((acc, d) => acc.concat(d.effects || []), [])).find((e) => e.code === 'SCHUTZWALL');
      if (!eff) throw new Error('Kein Bollwerk');
      const prm = eff.param || {};
      if (prm.once_per_round !== false && p.flags.wallUsed === this.state.turn) return { ok: false, error: 'Schutzwall schon genutzt', code: 'SCHUTZWALL_WAIT' };
      const cost = Number(prm.ap != null ? prm.ap : 2);
      if (p.ap < cost) throw new Error('Nicht genug AP');
      const pool = this._schutzwallPool(p);
      const pick = (a && a.uid && pool.find((c) => c.uid === a.uid)) || pool[0];
      if (!pick) return { ok: false, error: 'Keine Befestigung im Ablagestapel', code: 'SCHUTZWALL_EMPTY' };
      if (p.hand.length >= (this.rules.max_hand || 7)) throw new Error('Hand voll');
      p.ap -= cost;
      p.flags.wallUsed = this.state.turn;
      p.grave.splice(p.grave.indexOf(pick), 1);
      p.hand.push(pick);
      this._log(p.name + ' nutzt Schutzwall: ' + this.defOf(pick).name + ' zurück auf die Hand (' + cost + ' AP).');
      return { ok: true };
    }
    /**
     * t285: Befestigungen (Tag `befestigung`, keine Token) im Ablagestapel, die Schutzwall zurückholen darf.
     * @param {object} p Spieler
     * @returns {object[]} Karteninstanzen
     */
    _schutzwallPool(p) {
      return (p.grave || []).filter((c) => c && this.defOf(c) && hasTag(this.defOf(c), 'befestigung') && this.defOf(c).typ !== 'Token');
    }
    /**
     * t285: Hängt die gerade legalen aktiven Doktrin-Fähigkeiten an `acts` an: Schutzwall (Bollwerk),
     * Feldreparatur und Überschuss (Sicherer Nachschub). Verlegung listet {@link Engine#listActions} selbst.
     * Nur im eigenen Hauptzug; ändert den Stand nicht.
     * @param {object} p Spieler am Zug
     * @param {object[]} acts Aktionsliste (wird ergänzt)
     */
    _listDoctrineActives(p, acts) {
      if (!this._hasDoctrine) return;
      const turn = this.state.turn;
      p.flags = p.flags || {};
      if (this._hasDoctrine(p, 'SCHUTZWALL') && p.flags.wallUsed !== turn && p.hand.length < (this.rules.max_hand || 7)) {
        const prm = (this._dokParam && this._dokParam(p, 'SCHUTZWALL')) || {};
        const cost = Number(prm.ap != null ? prm.ap : 2);
        if (p.ap >= cost) {
          const seen = {};
          this._schutzwallPool(p).forEach((c) => {
            const d = this.defOf(c);
            if (seen[d.id]) return;
            seen[d.id] = 1;
            acts.push({ type: 'SCHUTZWALL', uid: c.uid, cardId: d.id, name: d.name, cost, label: 'Schutzwall: ' + d.name + ' auf die Hand' });
          });
        }
      }
      if (this._hasDoctrine(p, 'HEAL_ARMORED') && p.flags.healArmoredUsed !== turn) {
        const prm = (this._dokParam && this._dokParam(p, 'HEAL_ARMORED')) || {};
        const amount = Number(prm.value != null ? prm.value : 1);
        this.frontList(p).forEach((l) => {
          if (!this._healArmoredOk(l.inst)) return;
          acts.push({ type: 'HEAL_ARMORED', uid: l.inst.uid, target: l.inst.uid, cost: 0, amount, name: this.defOf(l.inst).name, label: 'Feldreparatur: ' + this.defOf(l.inst).name + ' +' + amount + ' DEF' });
        });
      }
      if (this._hasDoctrine(p, 'UEBERSCHUSS') && p.flags.ueberUsed !== turn && !this._supportLocked(p.id)) {
        const prm = (this._dokParam && this._dokParam(p, 'UEBERSCHUSS')) || {};
        const cost = Number(prm.ap != null ? prm.ap : 2);
        if (p.ap >= cost) {
          (p.support || []).forEach((s) => {
            if (!this._ueberschussOk(p, s)) return;
            acts.push({ type: 'UEBERSCHUSS', uid: s.uid, cost, name: this.defOf(s).name, label: 'Überschuss: ' + this.defOf(s).name + ' erneut' });
          });
        }
      }
    }
    /**
     * t285: Feldreparatur-Ziel: offene, gepanzerte (siehe {@link Engine#_isArmored}) und beschädigte Einheit.
     * @param {object} inst
     * @returns {boolean}
     */
    _healArmoredOk(inst) {
      if (!inst || inst.facedown) return false;
      const d = this.defOf(inst);
      if (!d || !this._isArmored(d)) return false;
      const max = inst.defMax != null ? inst.defMax : (Number(d.def) || 0);
      return inst.def != null && inst.def < max;
    }
    /**
     * t285: Überschuss-Ziel: eigene offene Unterstützung, die ihre Fähigkeit in diesem Zug schon eingesetzt hat
     * (erschöpft, aber nicht durch Dekontamination zu Zugbeginn gesperrt).
     * @param {object} p
     * @param {object} s Unterstützungsinstanz
     * @returns {boolean}
     */
    _ueberschussOk(p, s) {
      return !!(s && !s.facedown && s.flags && s.flags.exhausted && s.flags.restExhaustedTurn !== this.state.turn);
    }
        /**
         * Doktrin „Verlegung“: verschiebt eine eigene Fronteinheit in einen Zielslot (AP laut Doktrinparameter).
         * RULES: Doktrin Verlegung.
         * @param {number} pid
         * @param {object} a  Aktion mit `uid` und `slot`.
         */
        _actDokShift(pid, a) {
      const p = this.player(pid);
      if (this.state.active !== pid) throw new Error('Nur im eigenen Zug');
      if (!(this._hasDoctrine && this._hasDoctrine(p, 'VERLEGUNG'))) throw new Error('Keine Verlegung');
      if (p.flags && p.flags.dokVerlegungUsed === this.state.turn) throw new Error('Verlegung schon genutzt');
      const vp = (this._dokParam && this._dokParam(p, 'VERLEGUNG')) || {};
      const shiftAp = Number(vp.ap || 0);
      const loc = this.findInst(a.uid);
      if (!loc || loc.player.id !== pid || loc.zone !== 'front') throw new Error('Keine eigene Einheit');
      const dest = a.slot;
      if (!dest || !dest.section) throw new Error('Kein Zielslot');
      const order = ['L', 'C', 'R'];
      const i = order.indexOf(loc.section);
      const j = order.indexOf(dest.section);
      if (Math.abs(i - j) !== 1 || dest.row !== loc.row) throw new Error('Nur ein Slot seitlich');
      if (p.front[dest.section][dest.row]) throw new Error('Slot belegt');
      if (this._tacAssertMove) this._tacAssertMove(loc.inst);
      if (shiftAp) this._spend(p, shiftAp);
      if (this._tacDepart) this._tacDepart(loc.inst,false);
      p.front[loc.section][loc.row] = null;
      p.front[dest.section][dest.row] = loc.inst;
      if (this._tacOnEntry) this._tacOnEntry(loc.inst,dest.section,loc.section);
      p.flags = p.flags || {};
      p.flags.dokVerlegungUsed = this.state.turn;
      this._log(p.name + ' verlegt ' + this.defOf(loc.inst).name + ' → ' + dest.section + (dest.row + 1) + (shiftAp ? ' (' + shiftAp + ' AP)' : '') + '.');
      return { ok: true };
    }
    /**
     * Heilt eine gepanzerte Einheit (kartenspezifische Aktion).
     * @param {number} pid
     * @param {object} a
     */
    _actHealArmored(pid, a) {
      const p = this.player(pid);
      if (this.state.active !== pid) throw new Error('Nur im eigenen Zug');
      if (!(this._hasDoctrine && this._hasDoctrine(p, 'HEAL_ARMORED'))) throw new Error('Kein Sicherer Nachschub');
      p.flags = p.flags || {};
      if (p.flags.healArmoredUsed === this.state.turn) return { ok: false, error: 'Feldreparatur schon genutzt (1× pro Zug).', code: 'HEAL_USED' };
      const loc = this.findInst(a.uid || a.target);
      if (!loc || loc.player.id !== pid || loc.zone !== 'front' || !this._healArmoredOk(loc.inst)) {
        return { ok: false, error: 'Feldreparatur braucht eine eigene beschädigte gepanzerte Fronteinheit.', code: 'HEAL_NONE' };
      }
      const prm = (this._dokParam && this._dokParam(p, 'HEAL_ARMORED')) || {};
      p.flags.healArmoredUsed = this.state.turn;
      this._heal(loc.inst, Number(prm.value != null ? prm.value : 1));
      this._log(p.name + ' nutzt Feldreparatur: ' + this.defOf(loc.inst).name + ' heilt ' + Number(prm.value != null ? prm.value : 1) + '.');
      return { ok: true };
    }
    /**
     * Doktrin Sicherer Nachschub – Überschuss (t285 vollständig): `ap` AP (Standard 2), 1× pro eigenem Zug.
     * Eine eigene Unterstützung, die ihre Fähigkeit in diesem Zug schon eingesetzt hat, wird wieder bereit
     * und kann sie ein zweites Mal einsetzen (mit deren normalen Kosten).
     * @param {number} pid
     * @param {object} a  Aktion mit `uid` der Unterstützung
     * @returns {{ok: boolean}}
     */
    _actUeberschuss(pid, a) {
      const p = this.player(pid);
      if (this.state.active !== pid) throw new Error('Nur im eigenen Zug');
      if (!(this._hasDoctrine && this._hasDoctrine(p, 'UEBERSCHUSS'))) throw new Error('Kein Sicherer Nachschub');
      p.flags = p.flags || {};
      if (p.flags.ueberUsed === this.state.turn) return { ok: false, error: 'Überschuss schon genutzt (1× pro Zug).', code: 'UEBER_USED' };
      if (this._supportLocked(pid)) return { ok: false, error: 'Blitzkrieg-Sperre: Unterstützung nicht aktivierbar', code: 'BLITZ_LOCK' };
      const card = (p.support || []).find((c) => c && c.uid === a.uid);
      if (!card || !this._ueberschussOk(p, card)) {
        return { ok: false, error: 'Überschuss braucht eine eigene Unterstützung, die ihre Fähigkeit in diesem Zug schon eingesetzt hat.', code: 'UEBER_NONE' };
      }
      const prm = (this._dokParam && this._dokParam(p, 'UEBERSCHUSS')) || {};
      this._spend(p, Number(prm.ap != null ? prm.ap : 2));
      p.flags.ueberUsed = this.state.turn;
      card.flags.exhausted = false;
      this._log('Überschuss: ' + this.defOf(card).name + ' ist wieder bereit.');
      return { ok: true };
    }
    /**
     * Flächeneffekt „Armageddon“: räumt Front, Support und Tokens beider Spieler, wirft
     * Armageddon und beide Hände ab, beide ziehen 5 (t259). Die Münze folgt im Aufrufer.
     * @param {object} p
     * @param {object} card
     */
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
      // t259: Kartentext vollständig: Armageddon selbst und beide Hände auf den Ablagestapel,
      // danach ziehen beide 5 (normales Ziehen: leeres Deck → Ablagestapel mischen, sonst Ende).
      if (card && !p.grave.includes(card)) p.grave.push(card);
      this._armageddonHands(p);
      this.state._muteEvents = false;
      this._evt('spell', defn, 'Armageddon — Spielfeld und beide Hände abgeworfen, beide ziehen 5.');
      this._checkVictory();
    }
    /**
     * t259: Zweiter Teil von „Armageddon“ (dc_so_armageddon): beide Hände auf den jeweils
     * eigenen Ablagestapel, dann zieht zuerst der Ausspieler, danach der Gegner je 5 Karten
     * über {@link Engine#_draw} (gleiche Regeln wie beim normalen Ziehen: leeres Deck mischt den
     * Ablagestapel neu; ist auch der leer, endet das Ziehen ohne Niederlage).
     * @param {object} p ausspielender Spieler
     * @returns {number[]} gezogene Kartenzahl je Spieler-ID
     */
    _armageddonHands(p) {
      const order = [p, this.opponent(p.id)];
      order.forEach((pl) => {
        const n = pl.hand.length;
        while (pl.hand.length) pl.grave.push(pl.hand.shift());
        this._log('Armageddon: ' + pl.name + ' wirft ' + n + ' Handkarte' + (n === 1 ? '' : 'n') + ' ab.');
      });
      const drawn = [0, 0];
      order.forEach((pl) => {
        const before = pl.hand.length;
        this._draw(pl, 5);
        drawn[pl.id] = pl.hand.length - before;
        this._log('Armageddon: ' + pl.name + ' zieht ' + drawn[pl.id] + '.');
      });
      return drawn;
    }
    /**
     * Kartenspezifisch: Brumm-Störung.
     * @param {number} pid
     * @param {object} a
     */
    _brummJam(pid, a) {
      this.state.pending = null;
      this._log('Brummbär stört.');
      return { ok: true };
    }
    /**
     * Kartenspezifisch: Brumm-Übernahme.
     * @param {number} pid
     * @param {object} a
     */
    _brummHijack(pid, a) {
      this.state.pending = null;
      this._log('Brummbär übernimmt das Signal.');
      return { ok: true };
    }
    /**
     * Kartenspezifisch: Kommunikations-Koordination.
     * @param {number} pid
     * @param {object} a
     */
    _commCoord(pid, a) {
      /* Koordination (REATTACK): gewählte eigene Fronteinheit, die in diesem Zug schon angegriffen hat, darf erneut angreifen. */
      const pend = this.state.pending;
      const p = this.player(pid);
      const loc = a && a.target ? this.findInst(a.target) : null;
      if (!loc || loc.zone !== 'front' || loc.player.id !== pid) throw new Error('Eigene Fronteinheit wählen');
      if (pend && pend.cost) this._spend(p, Number(pend.cost));
      const src = pend && pend.uid ? this.findInst(pend.uid) : null;
      if (src) src.inst.flags.exhausted = true;
      loc.inst.attackUsed = false; loc.inst.flags.exhausted = false;
      this.state.pending = null;
      this._log('Koordination: ' + this.defOf(loc.inst).name + ' darf erneut angreifen.');
      return { ok: true };
    }
    /**
     * Kartenspezifisch: Kommunikations-Aufklärung.
     * @param {number} pid
     * @param {object} a
     */
    _commScout(pid, a) {
      this.state.pending = null;
      return { ok: true, need: 'target' };
    }
    /**
     * Schließt eine Hand-/Deck-Nachschau (PEEK) ab; oft gefolgt von PEEK_DONE.
     * @param {number} pid
     */
    _finishPeek(pid) {
      this.state.pending = null;
      return { ok: true };
    }
    /**
     * Schaut die unterste(n) Deckkarte(n) an.
     * @param {number} pid
     */
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
    /**
     * Feuerleit-Einsatz: Schaden gegen ein Ziel zu festem Preis.
     * @param {number} pid
     * @param {object} src
     * @param {string} targetUid
     * @param {number} cost
     * @param {number} dmg
     */
    _doFireMission(pid, src, targetUid, cost, dmg) {
      const t = this.findInst(targetUid);
      if (!t) throw new Error('Kein Ziel');
      this._damage(t.inst, Number(dmg || 2), { tag: 'artillery' });
      if (src) { src.flags.exhausted = true; src.attackUsed = true; }
      if (this._isDead(t.inst)) this._destroy(t);
      this.state.pending = null;
      return { ok: true };
    }
    /**
     * Kartenspezifisch: Strahlungsschaden bzw. -marke.
     * @param {number} pid
     * @param {string} targetUid
     * @param {object} pend
     */
    _doRadiation(pid, targetUid, pend) {
      const t = this.findInst(targetUid);
      if (t) this._damage(t.inst, Number((pend && pend.dmg) || 2), { tag: 'radiation' });
      if (t && this._isDead(t.inst)) this._destroy(t);
      this.state.pending = null;
      return { ok: true };
    }
    /**
     * Schließt einen Flug-/Verlegungszug ab.
     * @param {object} p
     * @param {object} loc
     * @param {*} raw
     * @param {object} pend
     */
    _finishFlug(p, loc, raw, pend) {
      this.state.pending = null;
      return { ok: true };
    }
    /**
     * Schließt eine Ehren-/Auszeichnungsaktion ab.
     * @param {number} pid
     */
    _finishHonors(pid) {
      const pend = this.state.pending;
      this.state.pending = null;
      this._log('Militärische Ehren.');
      return { ok: true };
    }
    /**
     * Gassen: Einheit auf die gewählte Stellung setzen.
     * @param {number} pid
     * @param {object} slot
     */
    _gassenPlace(pid, slot) {
      const follow = this.state._gassenFollow;
      const pend = this.state.pending;
      const p = this.player(pid);
      const queue = (pend && pend.queue) || (follow && follow.queue) || [];
      if (!queue.length || !slot) {
        this.state.pending = null;
        this.state._gassenFollow = null;
        return { ok: true };
      }
      const card = queue[0];
      const rest = queue.slice(1);
      p.hand = (p.hand || []).filter((c) => c.uid !== card.uid);
      p.hand.push(card);
      this.state._gassenFollow = { pid, queue: rest };
      this.state.pending = this._sealPending({
        kind: 'deploy',
        player: pid,
        uid: card.uid,
        facedown: false,
        free: true,
        gassen: true,
        choices: this._emptyFrontSlots(p).map((s) => ({ slot: s, label: s.section + (s.row + 1) })),
      });
      return this._actSlot(pid, { slot: slot });
    }
    /**
     * Gassen: gewählte Einheiten merken und die Platzierung starten.
     * @param {number} pid
     */
    _gassenAfterPick(pid) {
      const pend = this.state.pending;
      const p = this.player(pid);
      const selected = (pend && pend.selected) || [];
      const pool = (pend && pend.pool) || [];
      const taken = [];
      pool.forEach((c) => {
        if (selected.indexOf(c.uid) >= 0) taken.push(c);
        else p.deck.push(c);
      });
      this._shuffle(p.deck);
      this.state.pending = null;
      if (!taken.length || !this._emptyFrontSlots(p).length) {
        this.state._gassenFollow = null;
        this._log('Einsame Gassen: keine Stellung.');
        return { ok: true };
      }
      this.state._gassenFollow = { pid, queue: taken };
      return this._continueGassen(pid);
    }
    /**
     * Bricht Gassen ab: nicht gelegte Einheiten zurück ins Deck, mischen.
     * @param {number} pid
     */
    _gassenCancel(pid) {
      const p = this.player(pid);
      const pend = this.state.pending;
      const follow = this.state._gassenFollow;
      const leftover = [];
      if (pend && pend.kind === 'gassen-pick' && pend.pool) {
        pend.pool.forEach((c) => leftover.push(c));
      }
      if (follow && follow.queue) follow.queue.forEach((c) => leftover.push(c));
      leftover.forEach((c) => {
        if (!p.deck.some((x) => x.uid === c.uid) && !p.hand.some((x) => x.uid === c.uid) && !this.findInst(c.uid)) p.deck.push(c);
      });
      this._shuffle(p.deck);
      this.state.pending = null;
      this.state._gassenFollow = null;
      return { ok: true };
    }
    /**
     * Startet die Gassen-Suche: so viele Einheiten wie freie Frontplätze.
     * @param {object} p
     */
    _startGassen(p) {
      const slots = this._emptyFrontSlots(p);
      const units = (p.deck || []).filter((c) => this.defOf(c) && this.defOf(c).typ === 'Einheit');
      p.deck = (p.deck || []).filter((c) => !(this.defOf(c) && this.defOf(c).typ === 'Einheit'));
      const n = slots.length;
      this._evt('instant', { name: 'Einsame Gassen' }, p.name + ' sucht ' + n + ' Einheit(en) für freie Stellungen.');
      if (!n || !units.length) {
        units.forEach((c) => p.deck.push(c));
        this._shuffle(p.deck);
        this._log('Einsame Gassen: nichts einzusetzen.');
        return { ok: true };
      }
      if (units.length <= n) {
        this.state._gassenFollow = { pid: p.id, queue: units };
        return this._continueGassen(p.id);
      }
      this.state._gassenFollow = { pid: p.id, queue: [] };
      this.state.pending = this._sealPending({
        kind: 'gassen-pick',
        player: p.id,
        pool: units,
        needCount: n,
        upto: false,
        selected: [],
        choices: units.map((c) => ({ target: c.uid, label: this.defOf(c).name })),
      });
      return { ok: true, need: 'target' };
    }
    /**
     * Nächste Gassen-Einheit auf eine freie Stellung legen.
     * @param {number} pid
     */
    _continueGassen(pid) {
      const p = this.player(pid);
      const follow = this.state._gassenFollow;
      const slots = this._emptyFrontSlots(p);
      if (!follow || !follow.queue || !follow.queue.length || !slots.length) {
        if (follow && follow.queue && follow.queue.length) {
          follow.queue.forEach((c) => p.deck.push(c));
          this._shuffle(p.deck);
        }
        this.state._gassenFollow = null;
        this.state.pending = null;
        return { ok: true };
      }
      const card = follow.queue[0];
      this.state.pending = this._sealPending({
        kind: 'gassen-slot',
        player: pid,
        queue: follow.queue.slice(),
        uid: card.uid,
        choices: slots.map((s) => ({ slot: s, label: this.defOf(card).name + ' → ' + s.section + (s.row + 1) })),
        prompt: this.defOf(card).name + ' offen einsetzen',
      });
      return { ok: true, need: 'slot' };
    }
    /**
     * Startet Blinder Gehorsam: +2 ATK in diesem Zug, freie Angriffe, Angriffsfolge jetzt.
     * @param {object} p
     * @param {number} n ATK-Bonus
     */
    _startCommandAttack(p, n) {
      const bonus = n == null ? 2 : n;
      this.frontList(p).forEach((l) => {
        l.inst.flags = l.inst.flags || {};
        l.inst.flags.commandAtkUntil = this.state.turn;
        l.inst.flags.commandAtkBonus = bonus;
        l.inst.flags.commandFreeUntil = this.state.turn;
      });
      const ready = this._commandStrikeList(p.id);
      this._evt('instant', { name: 'Blinder Gehorsam' }, p.name + ': Front +' + bonus + ' A, Angriffe in diesem Zug ohne AP' + (ready.length ? (' (' + ready.length + ' greifen an).') : '.'));
      this.state._commandFollow = { pid: p.id, left: ready.map((l) => l.inst.uid) };
      return this._nextCommandAttack(p.id);
    }
    /**
     * Einheiten, die unter Blindem Gehorsam jetzt angreifen können.
     * @param {number} pid
     * @returns {object[]}
     */
    _commandStrikeList(pid) {
      const p = this.player(pid);
      const done = (this.state._commandFollow && this.state._commandFollow.done) || [];
      return this.frontList(p).filter((l) => {
        if (!l.inst || done.indexOf(l.inst.uid) >= 0) return false;
        if (l.inst.facedown) return false;
        const f = l.inst.flags || {};
        if (f.noAttack || f.paused || f.kwNoAtkTurn === this.state.turn) return false;
        if (f.noCombatUntil === this.state.turn && !f.digInBonus) return false;
        if (l.inst.summonedTurn != null && l.inst.summonedTurn >= this.state.turn && !(l.inst.summonedTurn === this.state.turn && this._kw(l.inst, 'Gefechtsbereit'))) return false;
        return this.legalAttackTargets(l).length > 0;
      });
    }
    /**
     * Nächsten befohlenen Angriff eröffnen (Zielwahl).
     * @param {number} pid
     */
    _nextCommandAttack(pid) {
      if (this.state.pending || this.state.heldAttack || this.state.winner != null) return { ok: true };
      const follow = this.state._commandFollow;
      if (!follow || follow.pid !== pid) return { ok: true };
      const units = this._commandStrikeList(pid);
      if (!units.length) {
        this.state._commandFollow = null;
        this.state.pending = null;
        return { ok: true };
      }
      const loc = units[0];
      const tg = this.legalAttackTargets(loc);
      this.state.pending = this._sealPending({
        kind: 'command-atk',
        player: pid,
        attackerUid: loc.inst.uid,
        choices: tg.map((t) => ({
          target: t.inst.uid,
          label: t.inst.facedown ? 'Verdeckt' : this.defOf(t.inst).name,
        })),
        prompt: this.defOf(loc.inst).name + ' greift an (0 AP)',
      });
      return { ok: true, need: 'target' };
    }
    /**
     * Ein Schritt der befohlenen Angriffsfolge.
     * @param {number} pid
     * @param {string} targetUid
     */
    _resolveCommandStep(pid, targetUid) {
      const pend = this.state.pending;
      const attackerUid = pend && pend.attackerUid;
      const follow = this.state._commandFollow || { pid, left: [], done: [] };
      follow.done = follow.done || [];
      if (attackerUid) follow.done.push(attackerUid);
      this.state._commandFollow = follow;
      this.state.pending = null;
      if (!attackerUid || !targetUid) return this._nextCommandAttack(pid);
      const aLoc = this.findInst(attackerUid);
      const tLoc = this.findInst(targetUid);
      if (!aLoc || !tLoc) return this._nextCommandAttack(pid);
      // Bereits angegriffen: Befehl erlaubt trotzdem diesen Angriff.
      aLoc.inst.attackUsed = false;
      if (aLoc.inst.flags) aLoc.inst.flags.exhausted = false;
      const rw = this._attackReactChoices(tLoc.player, aLoc.inst, tLoc.inst);
      if (rw.length && !this.state._reactLock) {
        this.state.heldAttack = { atkPlayer: pid, attackerUid, targetUid, command: true };
        this.state.pending = this._sealPending({
          kind: 'react-window',
          player: tLoc.player.id,
          attackerUid,
          targetUid,
          atkPlayer: pid,
          choices: rw,
          prompt: 'Feindkontakt!',
        });
        return { ok: true, need: 'react' };
      }
      return this._resolveCombat(pid, attackerUid, targetUid);
    }
    /**
     * Psychologie der Massen: weitere Einheiten anbieten oder beenden.
     * @param {number} pid
     */
    _continueMassDeploy(pid) {
      const p = this.player(pid);
      const units = (p.hand || []).filter((c) => this.defOf(c) && this.defOf(c).typ === 'Einheit');
      const slots = this._emptyFrontSlots(p);
      if (!units.length || !slots.length) return this._finishMassDeploy(pid);
      this.state._massFollow = { pid };
      this.state.pending = this._sealPending({
        kind: 'mass-pick',
        player: pid,
        upto: true,
        selected: [],
        choices: units.map((c) => ({ target: c.uid, label: this.defOf(c).name })),
      });
      return { ok: true, need: 'target' };
    }
    /**
     * Beendet die Massen-Auslegefolge.
     * @param {number} pid
     */
    _finishMassDeploy(pid) {
      this.state.pending = null;
      this.state._massFollow = null;
      return { ok: true };
    }
    /**
     * Mobilisierung: gewählte Infanterie auf die Hand, Rest ins Deck, optional eine frei spielen.
     * @param {number} pid
     */
    _finishMobPick(pid) {
      const pend = this.state.pending;
      const p = this.player(pid);
      const selected = (pend && pend.selected) || [];
      const pool = (pend && pend.pool) || [];
      pool.forEach((c) => {
        if (selected.indexOf(c.uid) >= 0) p.hand.push(c);
        else p.deck.push(c);
      });
      this._shuffle(p.deck);
      this.state.pending = null;
      if (!selected.length) return { ok: true };
      const taken = selected.slice();
      this.state.pending = this._sealPending({
        kind: 'mob-play',
        player: pid,
        pool: taken,
        choices: taken.map((uid) => {
          const c = p.hand.find((x) => x.uid === uid);
          return { target: uid, label: c ? this.defOf(c).name : uid };
        }),
      });
      return { ok: true, need: 'target' };
    }
    /**
     * Setzt unterbrochene Folgen (Massen, Gassen, Gehorsam) fort, sobald keine Wahl offen ist.
     */
    _maybeContinueSequences() {
      if (!this.state || this.state.winner != null) return;
      if (this.state.pending || this.state.heldAttack) return;
      if (this.state._inSeqContinue) return;
      this.state._inSeqContinue = true;
      try {
        if (this.state._massFollow) {
          const pid = this.state._massFollow.pid;
          this._continueMassDeploy(pid);
          if (this.state.pending) return;
        }
        if (this.state._gassenFollow && this.state._gassenFollow.queue && this.state._gassenFollow.queue.length) {
          this._continueGassen(this.state._gassenFollow.pid);
          if (this.state.pending) return;
        }
        if (this.state._commandFollow) {
          this._nextCommandAttack(this.state._commandFollow.pid);
        }
      } finally {
        this.state._inSeqContinue = false;
      }
    }
    /**
     * Löst „Deckung suchen“ auf das gewählte Ziel auf.
     * @param {number} pid
     * @param {string} targetUid
     */
    _resolveCoverSeek(pid, targetUid) {
      const loc = this.findInst(targetUid);
      const p = this.player(pid);
      const pend = this.state.pending;
      if (loc) {
        const bonus = 3;
        loc.inst.def = (loc.inst.def || 0) + bonus;
        loc.inst.defMax = (loc.inst.defMax || loc.inst.def) + bonus;
        loc.inst.tokens = loc.inst.tokens || [];
        loc.inst.tokens.push({ type: 'deckung', def: bonus });
        this._log(this.defOf(loc.inst).name + ' sucht Deckung (+' + bonus + ' V, endet beim Angriff).');
      }
      if (pend && pend.card) p.grave.push(pend.card);
      this.state.pending = null;
      if (this.state.heldAttack) return this._resumeAfterReact();
      return { ok: true };
    }
    /**
     * Löst „Letztes Gefecht“ auf das gewählte Ziel auf.
     * @param {number} pid
     * @param {string} targetUid
     */
    _resolveLastStand(pid, targetUid) {
      const pend = this.state.pending;
      const p = this.player(pid);
      const loc = this.findInst(targetUid);
      if (!loc || loc.player.id !== pid || loc.zone !== 'front') {
        this.state.pending = null;
        return { ok: false, error: 'Keine eigene Fronteinheit.' };
      }
      const others = this.frontList(p).filter((l) => l.inst.uid !== loc.inst.uid);
      const n = others.length;
      this.state._inLastStand = true;
      try {
        others.forEach((l) => {
          this._destroy({ inst: l.inst, player: p, zone: 'front', section: l.section, row: l.row });
        });
      } finally { this.state._inLastStand = false; }
      loc.inst.atk = (loc.inst.atk == null ? Number((this.defOf(loc.inst) || {}).atk) || 0 : loc.inst.atk) + n;
      loc.inst.def = (loc.inst.def || 0) + n;
      loc.inst.defMax = (loc.inst.defMax || loc.inst.def) + n;
      loc.inst.flags = loc.inst.flags || {};
      loc.inst.flags.letzterDerSteht = true;
      if (pend && pend.card) p.grave.push(pend.card);
      this.state.pending = null;
      this._evt('instant', { name: 'Der Letzte der steht' }, this.defOf(loc.inst).name + ' bleibt (+' + n + '/+' + n + '). Fällt sie, erhält der Gegner 1 SP.');
      this._checkVictory();
      return { ok: true };
    }
    /**
     * Deckt eine aufgeklärte Einheit auf bzw. markiert sie als beobachtet.
     * @param {string} uid
     */
    _revealScout(uid) {
      const loc = this.findInst(uid);
      if (loc) loc.inst.facedown = false;
    }

  }

  /**
   * Standard-Token-ID für Testdecks (Minenfeld).
   * @returns {string}
   */
  function defToken() { return 'minenfeld'; }

  /**
   * Baut ein legales Testdeck aus dem Katalog (Seltenheitsgrenzen, optional bevorzugt).
   * Standard 40 Karten (Tests/Bots); die Partie-UI fordert seit t283 `deck_size` (60) an.
   * @param {object} catalog
   * @param {function(): number} rand
   * @param {string[]} [prefer] bevorzugte Karten-IDs
   * @param {number} [size=40] Hauptdeckgröße
   * @returns {string[]} Karten-IDs
   */
  function buildTestDeck(catalog, rand, prefer, size) {
    const N = Number(size) > 0 ? Number(size) : 40;
    const pool = catalog.cards.filter((c) => ['Einheit', 'Unterstützung', 'Ausrüstung', 'Soforteinsatz'].includes(c.typ));
    const units = pool.filter((c) => c.typ === 'Einheit');
    const rest = pool.filter((c) => c.typ !== 'Einheit');
    const deck = [];
    const limitOf = (c) => {
      if (typeof globalThis !== 'undefined' && globalThis.DC_deckCopyLimit) return globalThis.DC_deckCopyLimit(c);
      if (typeof window !== 'undefined' && window.DC_deckCopyLimit) return window.DC_deckCopyLimit(c);
      return Math.min(4, c.max_copies || 4);
    };
    const take = (arr, n) => {
      const s = shuffle(arr, rand);
      for (let i = 0; i < s.length && deck.length < n; i++) {
        // Testdeck: höchstens 1 Kopie je Karte (Vielfalt); Limit nie überschreiten
        const copies = Math.min(1, limitOf(s[i]));
        for (let k = 0; k < copies && deck.length < n; k++) deck.push(s[i].id);
      }
    };
    take(units, Math.round(N * 0.4)); // 40 % Einheiten (bei 40 Karten: 16)
    take(rest, N);
    let out = shuffle(deck, rand).slice(0, N);
    if (typeof globalThis !== 'undefined' && globalThis.DC_validateDeck) {
      out = globalThis.DC_validateDeck(out, [], catalog).fixedIds;
    }
    return out;
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
    "mass-pick": { title: "Weitere Einheiten auslegen", pick: "card", needs: true, multi: true },
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
    "mob-pick": { title: "Mobilisierung (bis zu 2)", pick: "card", needs: true, multi: true },
    "hero-jump": { title: "Gegenstoß", pick: "slot", needs: true },
    verschieben: { title: "Verschieben", pick: "slot", needs: true },
    "move-dest": { title: "Feld wählen", pick: "slot", needs: true },
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
    "command-atk": { title: "Blinder Gehorsam: Ziel", pick: "card", needs: true },
    "gassen-pick": { title: "Einsame Gassen: Einheiten", pick: "card", needs: true, multi: true },
    "gassen-slot": { title: "Einsame Gassen: Stellung", pick: "slot", needs: true },
    "instant-section": { title: "Abschnitt wählen", pick: "section", needs: true },
    "own-bonus": { title: "Eigene Einheit für den Bonus", pick: "card", needs: true }
  };


  /* ===== t212: Allgemeine Kartenmechanik „CM“ =====
     Strukturierter Effektcode { code:'CM', param:{ k:<Art>, ... } } für Einheiten- und
     Unterstützungsfähigkeiten, die vorher nur als Fließtext existierten.
     Arten: stat, cost, vs, enter, kill, death, negate, first, aura, trigger, turnheal.
     Bedingungen (param.when) und Zielbedingungen (param.vs) siehe docs/regeln/KARTEN_SONDERFAELLE.md §CM. */
  const PER_TARGET_CODES = ['NO_MOVE_THIS_TURN', 'DEAL_DAMAGE', 'HEAL', 'DESTROY', 'DESTROY_IF_DEF', 'SACRIFICE', 'SACRIFICE_INFANTRY_DAMAGE', 'BUFF', 'SELF_DAMAGE', 'RETURN_TO_HAND', 'MOVE_FRONT', 'MOVE_SLOTS', 'OUT_OF_COMBAT', 'PLACE_TOKEN', 'REMOVE_TOKEN', 'MARK_OBSERVED', 'EXTRA_ATTACK', 'REPLACE_UNIT', 'ZIELANGRIFF', 'UMGEHEN', 'NEGATE_BONUS'];
  const GEAR_CM_KINDS = ['stat', 'vs', 'negate', 'kill', 'death', 'turnheal', 'turn', 'hitdebuff'];
  const CM = {
    /**
     * Alle CM-Effekte der Instanz inkl. trägerbezogener Ausrüstung.
     * @param {object} inst
     * @returns {object[]}
     */
    _cmFx(inst) {
      const d = inst && this.defOf(inst);
      const own = ((d && d.effects) || []).filter((e) => e.code === 'CM' && e.param);
      /* Ausrüstung mit CM-Effekten wirkt für ihren Träger (nur trägerbezogene Arten). */
      const gear = [];
      ((inst && inst.attachments) || []).forEach((eq) => {
        const ed = this.defOf(eq);
        ((ed && ed.effects) || []).forEach((e) => { if (e.code === 'CM' && e.param && GEAR_CM_KINDS.indexOf(e.param.k) >= 0) gear.push(e); });
      });
      return gear.length ? own.concat(gear) : own;
    },
    /**
     * Merkt sich, welche Kartentypen der aktive Spieler in diesem Zug gespielt hat (für CM-Bedingungen).
     * @param {string} kind
     * @param {object} def
     */
    _cmTrack(kind, def) {
      if (!this.state || !def || this.state.active == null) return;
      const p = this.player(this.state.active); if (!p) return;
      p.flags = p.flags || {};
      if (!p.flags.cmPlayed || p.flags.cmPlayed.turn !== this.state.turn) p.flags.cmPlayed = { turn: this.state.turn, types: [] };
      if (['deploy', 'support', 'instant', 'equip'].indexOf(kind) < 0) return;
      const t = p.flags.cmPlayed.types;
      t.push(def.typ);
      if (def.typ === 'Einheit') {
        if (isInfantry(def)) t.push('Infanterie');
        if (isArtillery(def)) t.push('Artillerie');
        if (hasTag(def, 'panzer')) t.push('Panzer');
        if (hasTag(def, 'aufklaerung') || def.klasse === 'Aufklärung') t.push('Aufklärung');
      }
    },
    /**
     * True, wenn der Spieler in diesem Zug bereits den Typ `type` gespielt hat.
     * @param {object} p
     * @param {string} type
     * @returns {boolean}
     */
    _cmPlayed(p, type) { const c = p && p.flags && p.flags.cmPlayed; return !!(c && c.turn === this.state.turn && c.types.indexOf(type) >= 0); },
    /**
     * Prüft, ob die Definition zum Filter `f` passt (infanterie, artillerie, panzer, …).
     * @param {object} def
     * @param {string} f
     * @returns {boolean}
     */
    _cmIs(def, f) {
      if (!f) return true;
      if (f === 'infanterie') return isInfantry(def);
      if (f === 'artillerie') return isArtillery(def);
      if (f === 'panzer') return hasTag(def, 'panzer');
      if (f === 'aufklaerung') return hasTag(def, 'aufklaerung') || def.klasse === 'Aufklärung';
      if (f === 'panzer_art') return hasTag(def, 'panzer') || isArtillery(def);
      if (f === 'elite') return hasTag(def, 'elite') || def.klasse === 'Elite';
      if (f === 'elite_panzer') return hasTag(def, 'elite') || def.klasse === 'Elite' || hasTag(def, 'panzer');
      return true;
    },
    /* Bedingung aus Sicht der Einheit inst (oder ohne Einheit: nur Spielerbedingungen). */
    _cmWhen(when, p, inst) {
      if (!when) return true;
      if (String(when).indexOf('&') >= 0) return String(when).split('&').every((w) => this._cmWhen(w, p, inst));
      const [k, v] = String(when).split(':');
      const loc = inst ? this.findInst(inst.uid) : null;
      const front = loc && loc.zone === 'front';
      const opp = p ? this.opponent(p.id) : null;
      switch (k) {
        case 'played': return this._cmPlayed(p, v);
        case 'support': return (p.support || []).some((s) => s && !s.facedown && this.defOf(s).typ === 'Unterstützung' && (!inst || s.uid !== inst.uid));
        case 'nosupport': return !(p.support || []).some((s) => s && this.defOf(s).typ === 'Unterstützung' && (!inst || s.uid !== inst.uid));
        case 'unit': return this.frontList(p).some((l) => (!inst || l.inst.uid !== inst.uid) && !l.inst.facedown && this._cmIs(this.defOf(l.inst), v));
        case 'gear': return this.frontList(p).some((l) => (l.inst.attachments || []).length);
        case 'adj': return front && this._neighbors(p, loc.section, loc.row).some((n) => n.inst && this._cmIs(this.defOf(n.inst), v));
        case 'pair': return front && this.frontList(p).some((l) => l.section === loc.section && l.inst.uid !== inst.uid);
        case 'alone': return front && !this.frontList(p).some((l) => l.section === loc.section && l.inst.uid !== inst.uid);
        case 'outnumbered': return front && this.frontList(opp).filter((l) => l.section === loc.section).length > this.frontList(p).filter((l) => l.section === loc.section).length;
        case 'damaged': return !!inst && this._isDamaged(inst);
        case 'equipped': return !!inst && (inst.attachments || []).length > 0;
        case 'still': return !!inst && !(inst.flags && inst.flags.cmMovedTurn != null && inst.flags.cmMovedTurn >= this.state.turn - 1);
        case 'moved': return !!inst && !!(inst.flags && inst.flags.cmMovedTurn === this.state.turn);
        case 'rested': return !!inst && !(inst.flags && inst.flags.cmAttackTurn != null && inst.flags.cmAttackTurn >= this.state.turn - 2);
        case 'lost': return !!(p.flags && p.flags.cmLostTurn === this.state.turn);
        case 'losses': return Number((p.flags && p.flags.kwFallen) || 0) >= Number(v || 2);
        case 'revealed': return !!(p.flags && p.flags.cmRevealTurn === this.state.turn);
        case 'observed': return this.frontList(opp).some((l) => l.inst.flags && l.inst.flags.observed);
        case 'healed': return !!(p.flags && p.flags.cmHealTurn === this.state.turn);
        case 'hurt': return !!(inst && inst.flags && inst.flags.kwHitTurn === this.state.turn);
        case 'sections': return SECTIONS.filter((s) => this.frontList(p).some((l) => l.section === s)).length >= Number(v || 2);
        /* t255: Klassenbedingung der Einheit selbst (`is:panzer_art`, `is:infanterie`, …). */
        case 'is': return !!inst && this._cmIs(this.defOf(inst), v);
        /* t255: eigene Überzahl im Abschnitt der Einheit (Gegenstück zu `outnumbered`). */
        case 'superior': return front && this.frontList(p).filter((l) => l.section === loc.section).length > this.frontList(opp).filter((l) => l.section === loc.section).length;
        /* t255: mindestens eine eigene Fronteinheit ist beschädigt (Spielerbedingung). */
        case 'wounded': return this.frontList(p).some((l) => this._isDamaged(l.inst));
        default: return false;
      }
    },
    /**
     * True, wenn das Ziel die CM-Zielbedingung erfüllt (`observed`, `entering`, beschädigt, …).
     * @param {object} e
     * @param {object} targetInst
     * @returns {boolean}
     */
    _cmVsOk(vs, T) {
      const f = (T && T.flags) || {};
      switch (vs) {
        case 'damaged': return this._isDamaged(T);
        case 'hit': return f.kwHitTurn === this.state.turn;
        case 'observed': return !!f.observed || f.cmRevealedTurn >= this.state.turn - 1;
        case 'entering': return T.summonedTurn != null && T.summonedTurn >= this.state.turn - 1;
        case 'fresh': return f.attackedTurn !== this.state.turn;
        case 'equipped': return (T.attachments || []).length > 0;
        case 'armored': return hasTag(this.defOf(T), 'gepanzert');
        case 'isolated': { const tl = this.findInst(T.uid); return !!(tl && tl.zone === 'front' && !this._neighbors(tl.player, tl.section, tl.row).some((x) => x.inst)); }
        case 'unequipped': return !(T.attachments || []).length;
        default: return false;
      }
    },
    /* ATK-Bonus (dynamisch) für currentAtkDef. */
    _cmAtk(inst, owner) {
      let n = 0;
      if (!inst || !owner) return 0;
      const loc = this.findInst(inst.uid);
      if (!loc || loc.zone !== 'front' || inst.facedown) return 0;
      this._cmFx(inst).forEach((e) => { const q = e.param; if (q.k === 'stat' && q.atk && this._cmWhen(q.when, owner, inst)) n += Number(q.atk); });
      n += this._cmAuraFor(inst, owner, loc, 'atk');
      if (inst.flags && inst.flags.cmWeakUntil != null && inst.flags.cmWeakUntil >= this.state.turn) n -= Number(inst.flags.cmWeak || 1);
      return n;
    },
    /**
     * Aura-Bonus eines CM-Aura-Effekts für die empfangende Instanz.
     * @param {object} src
     * @param {object} e
     * @param {object} inst
     * @returns {number}
     */
    _cmAuraFor(inst, owner, loc, stat) {
      let n = 0; const def = this.defOf(inst);
      const take = (src, q) => { if (q.k === 'aura' && q[stat] && this._cmIs(def, q.filter) && this._cmWhen(q.when, owner, q.self ? src : inst)) n += Number(q[stat]); };
      this.frontList(owner).forEach((l) => {
        if (l.inst.uid === inst.uid || l.inst.facedown) return;
        this._cmFx(l.inst).forEach((e) => {
          const q = e.param; if (q.k !== 'aura') return;
          const ok = q.scope === 'all' || (q.scope === 'adjacent' ? this._neighbors(owner, l.section, l.row).some((x) => x.inst && x.inst.uid === inst.uid) : l.section === loc.section);
          if (ok) take(l.inst, q);
        });
      });
      (owner.support || []).forEach((s) => {
        if (!s || s.facedown) return;
        this._cmFx(s).forEach((e) => {
          const q = e.param; if (q.k !== 'aura') return;
          if (q.scope === 'section' && s.flags && s.flags.tacAuraSection !== loc.section) return;
          if (q.scope === 'section' && !(s.flags && s.flags.tacAuraSection)) return;
          take(s, q);
        });
      });
      return n;
    },
    /* DEF-Bonus wird eingebacken (wie Glaubensbanner): Differenz zum zuletzt gebuchten Wert. */
    _cmRecompute() {
      if (!this.state || !this.state.players) return;
      this.state.players.forEach((p) => {
        this.frontList(p).forEach((l) => {
          const f = l.inst.flags = l.inst.flags || {};
          const sig = l.section + l.row;
          if (f.cmPos && f.cmPos !== sig) f.cmMovedTurn = this.state.turn;
          f.cmPos = sig;
          if (f.cmWasHidden && !l.inst.facedown) { f.cmRevealedTurn = this.state.turn; const o = this.opponent(p.id); if (o && o.id === this.state.active) { o.flags = o.flags || {}; o.flags.cmRevealTurn = this.state.turn; } }
          f.cmWasHidden = !!l.inst.facedown;
          let bonus = 0;
          if (!l.inst.facedown) {
            this._cmFx(l.inst).forEach((e) => { const q = e.param; if (q.k === 'stat' && q.def && this._cmWhen(q.when, p, l.inst)) bonus += Number(q.def); });
            bonus += this._cmAuraFor(l.inst, p, l, 'def');
          }
          const delta = bonus - Number(f.cmDefBonus || 0);
          if (delta) {
            l.inst.defMax = Math.max(1, (l.inst.defMax || l.inst.def || 1) + delta);
            l.inst.def = delta > 0 ? (l.inst.def || 0) + delta : Math.max(1, Math.min((l.inst.def || 0) + delta, l.inst.defMax));
          }
          f.cmDefBonus = bonus;
        });
      });
    },
    /**
     * Kostenmodifikator aus CM-`cost`-Effekten; `consume` verbraucht einmalige Rabatte.
     * @param {object} def
     * @param {object} player
     * @param {string} kind
     * @param {boolean} [consume]
     * @returns {number}
     */
    _cmCost(def, p) {
      let d = 0;
      ((def && def.effects) || []).forEach((e) => { if (e.code === 'CM' && e.param && e.param.k === 'cost' && this._cmWhen(e.param.when, p, null)) d += Number(e.param.delta || -1); });
      if (def && def.typ === 'Einheit' && p) (p.support || []).forEach((s) => {
        if (!s || s.facedown) return;
        this._cmFx(s).forEach((e) => {
          const q = e.param; if (q.k !== 'discount' || !this._cmIs(def, q.filter)) return;
          if (q.once && s.flags && s.flags.cmDiscountTurn === this.state.turn) return;
          d += Number(q.delta || -1);
        });
      });
      return d;
    },
    /**
     * Verbrauch eines einmaligen CM-Rabatts nach dem Bezahlen.
     * @param {object} player
     * @param {object} e
     */
    _cmConsumeDiscount(def, p) {
      if (!def || def.typ !== 'Einheit' || !p) return;
      (p.support || []).forEach((s) => { if (s && !s.facedown) this._cmFx(s).forEach((e) => { if (e.param.k === 'discount' && e.param.once && this._cmIs(def, e.param.filter)) { s.flags = s.flags || {}; if (s.flags.cmDiscountTurn !== this.state.turn) s.flags.cmDiscountTurn = this.state.turn; } }); });
    },
    /* Kampfbonus des Angreifers gegen Ziel T. */
    _cmVs(A, T, aLoc) {
      let n = 0; const p = aLoc && aLoc.player;
      this._cmFx(A).forEach((e) => {
        const q = e.param;
        if (q.k === 'vs' && this._cmVsOk(q.vs, T)) n += Number(q.atk || 1);
        if (q.k === 'first' && !(A.flags && A.flags.cmFirstDone)) { n += Number(q.atk || 2); A.flags.cmFirstDone = true; }
        if (q.k === 'hitdebuff' && T.flags) { T.flags.cmWeakUntil = this.state.turn + 1; T.flags.cmWeak = Math.abs(Number(q.atk || 1)); }
      });
      if (p) {
        const add = (src, q, isUnit) => {
          if (q.k !== 'aura' || !q.vs || !this._cmVsOk(q.vs, T) || !this._cmIs(this.defOf(A), q.filter)) return;
          if (isUnit) { const sl = this.findInst(src.uid); if (!sl || sl.zone !== 'front' || sl.section !== aLoc.section || src.uid === A.uid) return; }
          else if (q.scope === 'section' && !(src.flags && src.flags.tacAuraSection === aLoc.section)) return;
          n += Number(q.vsAtk || 1);
        };
        this.frontList(p).forEach((l) => { if (!l.inst.facedown) this._cmFx(l.inst).forEach((e) => add(l.inst, e.param, true)); });
        (p.support || []).forEach((s) => { if (s && !s.facedown) this._cmFx(s).forEach((e) => add(s, e.param, false)); });
      }
      if (A.flags) A.flags.cmAttackTurn = this.state.turn;
      return n;
    },
    /**
     * True, wenn ein CM-`negate`-Effekt diesen Schaden verhindert.
     * @param {object} inst
     * @param {object} meta
     * @returns {boolean}
     */
    _cmNegate(inst, amount) {
      if (!inst || amount <= 0) return amount;
      const loc = this.findInst(inst.uid); if (!loc || loc.zone !== 'front') return amount;
      const f = inst.flags = inst.flags || {};
      if (f.cmNegTurn === this.state.turn) return amount;
      let n = 0;
      this._cmFx(inst).forEach((e) => { if (e.param.k === 'negate' && this._cmWhen(e.param.when, loc.player, inst)) n = Math.max(n, Number(e.param.n || 1)); });
      (loc.player.support || []).forEach((s) => {
        if (!s || s.facedown) return;
        this._cmFx(s).forEach((e) => { const q = e.param; if (q.k === 'negate' && (q.scope !== 'section' || (s.flags && s.flags.tacAuraSection === loc.section)) && this._cmWhen(q.when, loc.player, inst)) n = Math.max(n, Number(q.n || 1)); });
      });
      if (!n) return amount;
      f.cmNegTurn = this.state.turn;
      this._log(this.defOf(inst).name + ': ' + Math.min(n, amount) + ' Schaden verhindert.');
      return Math.max(0, amount - n);
    },
    /**
     * Führt einen CM-Effekt der Art `k` aus (enter, kill, death, trigger, …).
     * @param {object} p
     * @param {object} inst
     * @param {object} e
     * @param {object} [ctx]
     */
    _cmDo(p, what, n, srcInst) {
      n = Number(n || 1);
      if (what === 'draw') this._draw(p, n);
      else if (what === 'heal') {
        const hurt = this.frontList(p).filter((l) => this._isDamaged(l.inst)).sort((a, b) => (a.inst.def - (a.inst.defMax || a.inst.def)) - (b.inst.def - (b.inst.defMax || b.inst.def)));
        if (hurt.length) this._heal(hurt[0].inst, n);
      } else if (what === 'reveal' || what === 'observe') {
        const opp = this.opponent(p.id);
        const hid = this.frontList(opp).filter((l) => l.inst.facedown);
        /* t255: `observe` markiert zuerst verdeckte, dann noch nicht beobachtete Feinde. */
        const fresh = this.frontList(opp).filter((l) => !(l.inst.flags && l.inst.flags.observed));
        const pick = hid.length ? hid : (what === 'observe' ? (fresh.length ? fresh : this.frontList(opp)) : []);
        pick.slice(0, n).forEach((l) => { this._revealInst ? this._revealInst(l.inst) : (l.inst.facedown = false); l.inst.facedown = false; l.inst.flags.observed = true; });
        p.flags.cmRevealTurn = this.state.turn;
      } else if (what === 'strike') {
        /* Automatisches Ziel: gegnerische Fronteinheit im Abschnitt der Quelle (sonst beliebig), niedrigste DEF; geschützte Ziele ausgenommen. */
        const opp = this.opponent(p.id), sl = srcInst ? this.findInst(srcInst.uid) : null;
        let cand = this.frontList(opp).filter((l) => !this._hostileTargetBlocked(l.inst));
        if (sl && sl.zone === 'front' && cand.some((l) => l.section === sl.section)) cand = cand.filter((l) => l.section === sl.section);
        cand.sort((a, b) => (a.inst.def || 0) - (b.inst.def || 0));
        if (cand.length) { this._damage(cand[0].inst, n, { tag: 'effect' }); if (this._isDead(cand[0].inst)) this._destroy(cand[0]); }
      }
    },
    /**
     * CM-Eintrittseffekte der soeben eingesetzten Instanz.
     * @param {object} inst
     * @param {string} zone
     */
    _cmOnEnter(inst, p) {
      this._cmFx(inst).forEach((e) => { const q = e.param; if (q.k === 'enter' && this._cmWhen(q.when, p, inst)) this._cmDo(p, q.do, q.n, inst); });
      p.flags = p.flags || {};
    },
    /**
     * CM-Effekte, wenn diese Instanz ein Ziel zerstört.
     * @param {object} inst
     * @param {object} [dead]
     */
    _cmOnKill(A, p) {
      this._cmFx(A).forEach((e) => { const q = e.param; if (q.k === 'kill') this._cmDo(p, q.do, q.n, A); });
    },
    /**
     * CM-Effekte, wenn diese Instanz zerstört wird.
     * @param {object} inst
     */
    _cmOnDestroy(loc) {
      if (!loc || loc.zone !== 'front' || !loc.player) return;
      const p = loc.player; p.flags = p.flags || {};
      p.flags.cmLostTurn = this.state.turn;
      if (!loc.inst.facedown) this._cmFx(loc.inst).forEach((e) => { const q = e.param; if (q.k === 'death' && this._cmWhen(q.when, p, null)) this._cmDo(p, q.do, q.n, loc.inst); });
      const fire = (src) => this._cmFx(src).forEach((e) => {
        const q = e.param; if (q.k !== 'trigger' || q.on !== 'own_destroyed') return;
        if (src.uid === loc.inst.uid) return;
        if (q.scope === 'section') { const sl = this.findInst(src.uid); const sec = sl && sl.zone === 'front' ? sl.section : (src.flags && src.flags.tacAuraSection); if (sec !== loc.section) return; }
        src.flags = src.flags || {};
        if (q.once !== false && src.flags.cmTrigTurn === this.state.turn) return;
        src.flags.cmTrigTurn = this.state.turn; this._cmDo(p, q.do, q.n, src);
      });
      this.frontList(p).forEach((l) => { if (!l.inst.facedown) fire(l.inst); });
      (p.support || []).forEach((s) => { if (s && !s.facedown) fire(s); });
    },
    /**
     * CM-Trigger nach einer abgeschlossenen Aktion.
     * @param {object} p
     * @param {object} [ctx]
     */
    _cmAfterAction() {
      if (!this.state || this.state.winner != null || this.state.active == null) return;
      const p = this.player(this.state.active); if (!p) return;
      const fire = (src) => this._cmFx(src).forEach((e) => {
        const q = e.param; if (q.k !== 'trigger' || q.on !== 'played') return;
        src.flags = src.flags || {};
        if (src.flags.cmTrigTurn === this.state.turn || !this._cmWhen(q.when, p, null)) return;
        if (q.when && /^played:Einheit/.test(q.when) && src.summonedTurn === this.state.turn && this.state.players.indexOf(p) >= 0 && (p.flags.cmPlayed.types.filter((t) => t === 'Einheit').length < 2) && this.defOf(src).typ === 'Einheit') return;
        src.flags.cmTrigTurn = this.state.turn; this._cmDo(p, q.do, q.n, src);
      });
      this.frontList(p).forEach((l) => { if (!l.inst.facedown) fire(l.inst); });
      (p.support || []).forEach((s) => { if (s && !s.facedown) fire(s); });
    },
    /**
     * CM-Effekte zu Zugbeginn (z. B. `turnheal`).
     * @param {object} player
     */
    _cmTurnStart(p) {
      const run = (src, l) => this._cmFx(src).forEach((e) => {
        const q = e.param; if (q.k !== 'turnheal') return;
        let cand = this.frontList(p).filter((x) => this._isDamaged(x.inst));
        if (q.scope === 'section') { const sec = l ? l.section : (src.flags && src.flags.tacAuraSection); cand = cand.filter((x) => x.section === sec); }
        if (q.scope === 'self') cand = cand.filter((x) => x.inst.uid === src.uid);
        if (q.when) cand = cand.filter((x) => this._cmWhen(q.when, p, x.inst));
        /* t255: `count` heilt bis zu so viele verschiedene beschädigte Einheiten (Standard 1). */
        cand.slice(0, Math.max(1, Number(q.count || 1))).forEach((x) => this._heal(x.inst, Number(q.n || 1)));
      });
      const run2 = (src) => this._cmFx(src).forEach((e) => { const q = e.param; if (q.k === 'turn' && this._cmWhen(q.when, p, null)) this._cmDo(p, q.do, q.n, src); });
      this.frontList(p).forEach((l) => { if (!l.inst.facedown) run2(l.inst); });
      (p.support || []).forEach((s) => { if (s && !s.facedown) run2(s); });
      this.frontList(p).forEach((l) => { if (!l.inst.facedown) run(l.inst, l); });
      (p.support || []).forEach((s) => { if (s && !s.facedown) run(s, null); });
    },
    /**
     * True, wenn ein CM-Effekt dieser Instanz eine Abschnittswahl braucht.
     * @param {object} inst
     * @returns {boolean}
     */
    _cmNeedsSection(inst) { return this._cmFx(inst).some((e) => e.param.scope === 'section'); }
  };
  Object.assign(Engine.prototype, CM);

  global.DCEngine = {
    Engine, buildTestDeck, rng, shuffle, SECTIONS, ROWS, PENDING_META,
    pendingMeta: function (kind) {
      return PENDING_META[kind] || { title: "Auswahl", pick: "card", needs: true };
    }
  };
})(window);
