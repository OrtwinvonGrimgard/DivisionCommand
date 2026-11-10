'use strict';
/* Bot-Hänger t237: Wartefenster müssen immer eine legale Aktion anbieten. */
const assert = require('assert');
const L = require('./nation_pools/load_game.js');
const w = L.loadGame({ quiet: true });
const eng = L.newMatch(w, 'Steinmark', 11);
const p1 = eng.player(1);
// Gezeigte Karten: nur Schließen, und das ist legal.
eng.state.pending = { kind: 'hand-show', player: 1, names: ['X'] };
let acts = eng.listActions(1);
assert.strictEqual(JSON.stringify(acts.map((a) => a.type)), JSON.stringify(['PEEK_DONE']));
assert.ok(eng.dispatch(Object.assign({ player: 1 }, acts[0])).ok, 'PEEK_DONE legal');
assert.ok(!eng.state.pending);
// Feindkontakt: unbezahlbare Reaktion wird nicht angeboten, Weitergeben schon.
const card = eng.instFromId(w.DC_CATALOG.cards.find((c) => c.typ === 'Soforteinsatz' && c.ap >= 2).id, 1);
p1.hand.push(card); p1.ap = 0;
eng.state.pending = { kind: 'react-window', player: 1, choices: [{ target: card.uid, label: 'teuer' }], prompt: 'Feindkontakt!' };
acts = eng.listActions(1);
assert.strictEqual(JSON.stringify(acts.map((a) => a.type)), JSON.stringify(['REACT_PASS']));
p1.ap = 9;
acts = eng.listActions(1);
assert.strictEqual(JSON.stringify(acts.map((a) => a.type)), JSON.stringify(['RESOLVE_PENDING', 'REACT_PASS']));
p1.ap = 0;
assert.ok(eng.dispatch({ type: 'REACT_PASS', player: 1 }).ok, 'REACT_PASS legal');
assert.ok(!eng.state.pending);
// Bot wählt im Fenster ohne bezahlbare Wahl das Weitergeben.
const fs = require('fs'), path = require('path'), vm = require('vm');
vm.runInNewContext(fs.readFileSync(path.join(L.WEB, 'js/ai/bot.js'), 'utf8'), { window: w, console: { log() {}, warn() {} }, Math, JSON, Object, Array, String, Number, Error });
eng.state.pending = { kind: 'react-window', player: 1, choices: [{ target: card.uid, label: 'teuer' }], prompt: 'Feindkontakt!' };
assert.strictEqual(w.DCBot.step(eng, 1, {}).type, 'REACT_PASS');
eng.state.pending = { kind: 'hand-show', player: 1, names: ['X'] };
assert.strictEqual(w.DCBot.step(eng, 1, {}).type, 'PEEK_DONE');
console.log('PASS pending pass: hand-show → PEEK_DONE, Feindkontakt nur bezahlbar + REACT_PASS, Bot gibt weiter');
