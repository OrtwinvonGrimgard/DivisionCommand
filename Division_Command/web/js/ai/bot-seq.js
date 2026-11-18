/**
 * t291: Sequenzierter Bot-Zug – Step-API ohne DOM.
 *
 * Der Bot spielt in der Oberfläche wie ein Mensch: Er plant genau EINE Aktion auf dem aktuellen
 * Stand (`nextAction`), die Oberfläche wendet sie an und zeigt sie, danach folgt eine kurze,
 * variierende Denkpause (`thinkDelay`). Nach jeder Hauptaktion prüft die Oberfläche mit
 * `reactionOptions`, ob der Mensch jetzt regelkonform einen Soforteinsatz aus seiner AP-Reserve
 * spielen kann (RULES §18, §20.1); dann hält der Bot an (Reaktionsfenster).
 *
 * Simulationen (smoke, fuzz, Balance) rufen weiter `DCBot.step` direkt und ohne Pausen auf;
 * dieses Modul ändert keine Bot-Entscheidung. Einziger Regelzugriff: `listActions` / `dispatch`
 * (auf einer Kopie für die Reaktionsprüfung). Doku: docs/technik/BOT_SEQUENZ_T291.md.
 * Export: `window.DCBotSeq` (im Node-Test über das globale Objekt).
 */
(function (global) {
  'use strict';

  /**
   * Denkpausen je Bot-Tempo in ms. `min`/`max`: Hauptaktion, `follow`: Folgewahl derselben Aktion
   * (Ziel, Stellung), `start`: Aufschlag vor der ersten Aktion eines Zuges.
   * @type {Object<string, {min:number, max:number, follow:number, start:number}>}
   */
  var TEMPO = {
    slow: { min: 1100, max: 2000, follow: 650, start: 600 },
    normal: { min: 600, max: 1400, follow: 380, start: 350 },
    fast: { min: 200, max: 450, follow: 120, start: 100 }
  };

  /** Erlaubte Werte der Einstellung „Reaktionsfenster“. */
  var REACT_MODES = ['stop', 'brief', 'off'];

  /** Sekunden, die das Reaktionsfenster im Modus „brief“ offen bleibt. */
  var BRIEF_MS = 5000;

  /**
   * Offene Wahlen, die der Bot ohne eigene Bewertung bedient (Münze, SAM, Geist, Blick).
   * @type {string[]}
   */
  var AUTO_KINDS = ['coin', 'angel-coin', 'resist-coin', 'sam', 'geist-window', 'hand-show', 'peek'];

  /**
   * Liest die Bot-Einstellungen aus einem Storage (localStorage) mit Standardwerten.
   * @param {{getItem: function(string): (string|null)}|null} [storage]
   * @returns {{tempo: string, react: string}}
   */
  function readSettings(storage) {
    var tempo = 'normal', react = 'stop';
    try {
      var t = storage && storage.getItem('dc_bot_tempo');
      var r = storage && storage.getItem('dc_bot_react');
      if (t && TEMPO[t]) tempo = t;
      if (r && REACT_MODES.indexOf(r) >= 0) react = r;
    } catch (e) { /* gesperrter Speicher: Standardwerte */ }
    return { tempo: tempo, react: react };
  }

  /**
   * Deterministische Zufallszahl 0..1 aus einem Schlüssel (kein Math.random, damit der
   * Zufallsstrom von Bot und Engine unberührt bleibt).
   * @param {number} seed
   * @returns {number}
   */
  function noise(seed) {
    var s = (Math.abs(Math.floor(seed)) * 2654435761 + 1013904223) >>> 0;
    s = (s ^ (s >>> 15)) >>> 0;
    s = (s * 2246822519) >>> 0;
    s = (s ^ (s >>> 13)) >>> 0;
    return s / 4294967296;
  }

  /**
   * Denkpause vor der nächsten Bot-Aktion.
   * @param {string} tempo 'slow' | 'normal' | 'fast' (Unbekanntes: 'normal')
   * @param {number} seed beliebiger Schlüssel (z. B. Zug * 100 + Schritt) für die Streuung
   * @param {'act'|'follow'|'start'} [kind] Hauptaktion, Folgewahl oder Zugbeginn
   * @returns {number} Millisekunden
   */
  function thinkDelay(tempo, seed, kind) {
    var t = TEMPO[tempo] || TEMPO.normal;
    if (kind === 'follow') return t.follow;
    var ms = Math.round(t.min + (t.max - t.min) * noise(seed));
    if (kind === 'start') ms += t.start;
    return ms;
  }

  /**
   * Standardwahl für offene Fenster ohne eigene Bewertung (wie bisher in app.js).
   * @param {object|null} pend offene Wahl
   * @param {number} pid Bot-Sitz
   * @returns {object|null} Aktion
   */
  function botFollow(pend, pid) {
    if (!pend) return null;
    if (pend.kind === 'coin' || pend.kind === 'angel-coin' || pend.kind === 'resist-coin') return { type: 'COIN_FLIP', player: pid };
    if (pend.kind === 'sam') return { type: 'SAM_PASS', player: pid };
    if (pend.kind === 'geist-window') return { type: 'GEIST_PASS', player: pid };
    if (pend.kind === 'react-window') return { type: 'REACT_PASS', player: pid };
    if (pend.kind === 'hand-show' || pend.kind === 'peek') return { type: 'PEEK_DONE', player: pid };
    var ch = (pend.choices || [])[0];
    if (ch && ch.slot) return { type: 'CHOOSE_SLOT', player: pid, slot: ch.slot };
    if (ch && ch.target) return { type: 'CHOOSE_TARGET', player: pid, target: ch.target };
    return { type: 'CANCEL_PENDING', player: pid };
  }

  /**
   * Schlüssel einer Aktion für die Fehlschlag-Sperrliste.
   * @param {object} bot DCBot
   * @param {object} act
   * @returns {string}
   */
  function actKey(bot, act) {
    if (bot && bot.actKey) return bot.actKey(act);
    return (act && act.type) + '|' + (act && (act.uid || act.target || ''));
  }

  /**
   * Step-API: plant genau EINE Bot-Aktion auf dem aktuellen Stand. Ändert den Stand nicht.
   * Gleiche Normalisierung wie der bisherige UI-Bot (Sperrliste, nie Zugende bei offener eigener
   * Wahl, Münze/SAM/Geist/Blick automatisch).
   * @param {object} engine Engine
   * @param {number} pid Bot-Sitz
   * @param {object} bot DCBot (mit `step`, `actKey`)
   * @param {Object<string, number>} fail bereits gescheiterte Aktions-Schlüssel dieses Zuges
   * @returns {object} Aktion mit `player`
   */
  function nextAction(engine, pid, bot, fail) {
    var act = { type: 'END_TURN', player: pid };
    try { act = (bot.step(engine, pid, fail) || act); } catch (err) { act = { type: 'END_TURN', player: pid }; }
    act.player = pid;
    var pend = engine.state.pending;
    var mine = !!(pend && pend.player === pid);
    if (fail && fail[actKey(bot, act)]) act = mine ? { type: 'CANCEL_PENDING', player: pid } : { type: 'END_TURN', player: pid };
    if (act.type === 'END_TURN' && mine) act = { type: 'CANCEL_PENDING', player: pid };
    if (act.type === 'RESOLVE_PENDING' && act.confirm && pend && AUTO_KINDS.indexOf(pend.kind) >= 0) act = botFollow(pend, pid) || { type: 'CANCEL_PENDING', player: pid };
    if (act.type === 'RESOLVE_PENDING' && !act.slot && !act.target && !act.confirm) act = botFollow(pend, pid) || { type: 'CANCEL_PENDING', player: pid };
    return act;
  }

  /**
   * Hauptaktion (nach der ein Reaktionsfenster sinnvoll ist) statt Folgewahl/Zugende?
   * @param {object} act
   * @returns {boolean}
   */
  function isMainAction(act) {
    if (!act) return false;
    return ['END_TURN', 'CANCEL_PENDING', 'RESOLVE_PENDING', 'CHOOSE_SLOT', 'CHOOSE_TARGET', 'COIN_FLIP',
      'SAM_PASS', 'GEIST_PASS', 'REACT_PASS', 'PEEK_DONE'].indexOf(act.type) < 0;
  }

  /**
   * Kopie der Engine für Proben (gleiches Verfahren wie der Bot: eigener Stand, stumme Ereignisse,
   * eigener Zufall, keine Hooks der Oberfläche).
   * @param {object} engine
   * @returns {object}
   */
  function cloneEngine(engine) {
    var c = Object.create(Object.getPrototypeOf(engine));
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
   * Soforteinsätze, die `pid` JETZT im gegnerischen Zug aus der AP-Reserve spielen kann.
   * Nur ohne offene Wahl und in der Hauptphase des Gegners. Jede Karte wird auf einer Kopie
   * ausgespielt; sie zählt, wenn die Engine annimmt und eine nötige Zielwahl Optionen hat.
   * @param {object} engine
   * @param {number} pid menschlicher Sitz
   * @returns {Array<{uid:string, cardId:string, name:string, cost:number, need:(string|undefined)}>}
   */
  function reactionOptions(engine, pid) {
    var out = [];
    try {
      var st = engine && engine.state;
      if (!st || st.winner != null || st.phase !== 'main' || st.pending || st.active === pid) return out;
      var p = engine.player(pid);
      if (!p || !(Number(p.ap) > 0)) return out;
      (engine.listActions(pid) || []).forEach(function (a) {
        if (a.type !== 'PLAY' || a.typ !== 'Soforteinsatz') return;
        try {
          var c = cloneEngine(engine);
          var r = c.dispatch({ type: 'PLAY', player: pid, uid: a.uid });
          if (!r || !r.ok) return;
          var pend = c.state.pending;
          if (pend && pend.player === pid && Array.isArray(pend.choices) && !pend.choices.length && r.need) return;
          out.push({ uid: a.uid, cardId: a.cardId, name: a.name, cost: a.cost, need: r.need });
        } catch (e) { /* Probe gescheitert: keine Reaktion */ }
      });
    } catch (e2) { return []; }
    return out;
  }

  var api = {
    TEMPO: TEMPO,
    REACT_MODES: REACT_MODES,
    BRIEF_MS: BRIEF_MS,
    AUTO_KINDS: AUTO_KINDS,
    readSettings: readSettings,
    thinkDelay: thinkDelay,
    botFollow: botFollow,
    nextAction: nextAction,
    isMainAction: isMainAction,
    reactionOptions: reactionOptions
  };
  global.DCBotSeq = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof window !== 'undefined' ? window : globalThis);
