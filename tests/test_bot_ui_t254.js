/**
 * t254: Bot im echten UI-Ablauf (app.js botTick, jsdom). Prüft, dass der Bot auch Folgewahlen
 * (Ziel, Stellung, Bestätigen) selbst über DCBot.step und dispatch trifft, Partien zu Ende kommen
 * und kein Bot-Zug das Schrittlimit erreicht. Läuft über `npm test` von der Repo-Wurzel.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { setup } = require('./test_audio_actions.js');
const { buildMixedDeck } = require('../scripts/nation_pools/mixed_deck.js');
const WEB = path.join(__dirname, '../Division_Command/web');

let games = 0, finished = 0, resolveDirect = 0, chooseOld = 0, maxBotSteps = 0;
for (let g = 0; g < 4; g++) {
  const h = setup('off'), { w } = h;
  const timers = [];
  w.setTimeout = (fn) => { timers.push(fn); return timers.length; };
  w.requestAnimationFrame = () => 0;
  w.eval(fs.readFileSync(path.join(WEB, 'js/ai/bot.js'), 'utf8'));
  w.DCBot.applyCfg({ model: 'test', delayMs: 1 });
  const nations = Object.keys(w.DC_NATION_DECKS);
  const d0 = buildMixedDeck(w, nations[g % 16], 500 + g), d1 = buildMixedDeck(w, nations[(g * 5 + 3) % 16], 900 + g);
  // Echter Start über die Seite (bindet Knöpfe, Bot-Modus), danach Mischdecks in dieselbe Engine legen.
  w.document.getElementById('mode').value = 'bot';
  w.dcStart();
  const real = w.dcGetEngine();
  real.createMatch({ seed: 4200 + g, mode: 'bot', startPlayer: g % 2, deck0: d0.cards, deck1: d1.cards, doctrine0: d0.doctrines, doctrine1: d1.doctrines });
  real.state.startCoin = null;
  w.dcSetMode('bot'); w.dcSetYou(0);
  w.dcSetState(real.state);
  w.dcArmTimer();
  /** Neuzeichnen erzwingen (wie nach einer Aktion über die Seite); render stößt dann den Bot an. */
  const kick = () => { const el = w.document.getElementById('enemy-front'); if (el) el._dcHtml = null; w.dcRender(); };
  w.dcTimerHold = false; // Anpfiff-Animation überspringen (sonst wartet der Bot auf dcArmTimer)
  const orig = real.dispatch.bind(real);
  let turnKey = '', steps = 0;
  real.dispatch = (a) => {
    if (a && a.player === 1) {
      const k = real.state.turn + ':' + real.state.active;
      if (k !== turnKey) { turnKey = k; steps = 0; }
      steps++; maxBotSteps = Math.max(maxBotSteps, steps);
      if (a.type === 'RESOLVE_PENDING' && (a.target || a.slot)) resolveDirect++;
      if (a.type === 'CHOOSE_TARGET' || a.type === 'CHOOSE_SLOT') chooseOld++;
    }
    return orig(a);
  };
  const fail = {};
  let guard = 0;
  while (real.state.winner == null && guard++ < 20000) {
    const pend = real.state.pending;
    const pid = pend && typeof pend.player === 'number' ? pend.player : real.state.active;
    if (pid === 0) {
      // Spieler 0 spielt hier ebenfalls der Bot, aber direkt (wie ein Mensch über dispatch).
      const a = w.DCBot.step(real, 0, fail) || { type: 'END_TURN', player: 0 };
      if (a.player == null) a.player = 0;
      // Zugende wie ein Mensch über den Knopf (App-dispatch stößt den Bot an).
      if (a.type === 'END_TURN' && !pend) { w.document.getElementById('btn-end').click(); kick(); continue; }
      const r = real.dispatch(a);
      if (!r || !r.ok) { fail[w.DCBot.actKey(a)] = 1; if (a.type !== 'END_TURN') w.document.getElementById('btn-end').click(); }
      else for (const k in fail) delete fail[k];
      kick();
    } else if (timers.length) {
      timers.shift()();
    } else {
      w.dcTimerHold = false;
      kick();
      if (!timers.length) break;
    }
  }
  games++;
  if (real.state.winner == null) console.log('stuck', g, guard, real.state.turn, real.state.active, JSON.stringify(real.state.pending && { kind: real.state.pending.kind, player: real.state.pending.player, n: (real.state.pending.choices || []).length }), timers.length, real.listActions(1).map(a => a.type).join(','));
  if (real.state.winner != null) finished++;
  assert.equal(h.errors.length, 0, 'keine DOM-Fehler');
  // Fenster offen lassen: laufende Ereignis-Animationen (async) würden nach close() ins Leere greifen.
  timers.length = 0;
  w.setTimeout = () => 0;
}
assert.equal(finished, games, 'alle UI-Bot-Partien beendet');
assert(resolveDirect > 0, 'Bot trifft Folgewahlen selbst (RESOLVE_PENDING mit Ziel/Stellung)');
assert.equal(chooseOld, 0, 'keine automatische Erstwahl über CHOOSE_TARGET/CHOOSE_SLOT mehr');
assert(maxBotSteps <= 60, 'kein Bot-Zug erreicht das Schrittlimit');
console.log('PASS UI-Bot t254: ' + finished + '/' + games + ' Partien, ' + resolveDirect + ' eigene Folgewahlen, max ' + maxBotSteps + ' Schritte/Zug');
