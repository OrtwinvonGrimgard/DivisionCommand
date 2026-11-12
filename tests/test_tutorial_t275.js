/**
 * t275: Tutorial „Grundausbildung“.
 * 1. Erststart-Merker: Tutorial nur beim ersten Start (kein Merker, kein Benutzer), danach nie automatisch;
 *    Abschluss und Überspringen setzen den Merker; `?tutorial=1` erzwingt.
 * 2. Das geskriptete Gefecht läuft mit der echten Engine durch alle Schritte bis zum Sieg (5 SP).
 * 3. Der Schrittfilter blockt falsche Aktionen mit Hinweis, ohne den Engine-Stand zu ändern.
 * 4. „Zurück“ stellt den Stand eines Schritts wieder her; die normale Partie bleibt unberührt.
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const L = require('../scripts/nation_pools/load_game.js');
const S = require('../Division_Command/web/js/tutorial/scenario.js');

const w = L.loadGame({ quiet: true });
const WEB = L.WEB;

/* ---------- 1. Erststart-Merker ---------- */
/**
 * Lädt tutorial.js in einen Node-Kontext mit Fake-localStorage.
 * @param {Object<string,string>} store Startinhalt
 * @param {string} [search] location.search
 * @returns {{T: object, store: Object<string,string>}}
 */
function loadUi(store, search) {
  const ls = { getItem: (k) => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); }, removeItem: (k) => { delete store[k]; } };
  const win = { localStorage: ls, location: { search: search || '' }, addEventListener() {}, setTimeout, clearTimeout };
  win.window = win;
  const ctx = { window: win, localStorage: ls, location: win.location, console, JSON, Date, Math, setTimeout, clearTimeout };
  vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/ui/tutorial.js'), 'utf8'), ctx);
  return { T: win.DCTutorial, store };
}
{
  const fresh = loadUi({});
  assert.strictEqual(fresh.T.shouldAutoStart(), true, 'Erststart: Tutorial');
  fresh.T.markDone('done');
  assert.strictEqual(fresh.T.isDone(), true, 'Abschluss setzt Merker');
  assert.strictEqual(fresh.T.shouldAutoStart(), false, 'Zweitstart: kein Tutorial');
  assert.strictEqual(JSON.parse(fresh.store.dc_tutorial_done).how, 'done');
  const skip = loadUi({});
  skip.T.markDone('skip');
  assert.strictEqual(skip.T.shouldAutoStart(), false, 'Überspringen setzt Merker');
  assert.strictEqual(JSON.parse(skip.store.dc_tutorial_done).how, 'skip');
  const veteran = loadUi({ dc_users: JSON.stringify([{ id: 'u1', name: 'Alt' }]) });
  assert.strictEqual(veteran.T.shouldAutoStart(), false, 'Bestehender Benutzer: kein Überfall');
  const forced = loadUi({ dc_tutorial_done: '{"v":1}' }, '?tutorial=1');
  assert.strictEqual(forced.T.shouldAutoStart(), true, '?tutorial=1 erzwingt');
  const broken = loadUi({ dc_tutorial_done: 'kaputt' });
  assert.strictEqual(broken.T.isDone(), true, 'beliebiger Merker zählt als erledigt');
}

/* ---------- 2./3. Geskriptetes Gefecht ---------- */
const eng = new w.DCEngine.Engine(w.DC_CATALOG, { seed: S.SEED });
const ctx = S.setup(eng, { name: 'Testrekrut' });
const st0 = eng.state;
assert.strictEqual(st0.players[0].ap, 5, 'Zug 1: 5 AP');
assert.strictEqual(st0.players[1].ap, 5, 'Gegner Zug 1: 5 AP');
assert.strictEqual(st0.players[0].vp, 2);
assert.strictEqual(st0.mode, 'tutorial');
assert.deepStrictEqual(st0.players[0].hand.map((c) => c.cardId), [S.CARDS.recruit, S.CARDS.cover, S.CARDS.kitchen, S.CARDS.push]);

/**
 * Lässt den geskripteten Gegner handeln, bis er wartet.
 * @returns {number} Anzahl Aktionen
 */
function runBot() {
  let n = 0;
  for (let i = 0; i < 20; i++) {
    const a = S.botStep(eng, ctx);
    if (!a) break;
    assert.strictEqual(S.gate(null, a, eng, ctx), null, 'Gegner wird nie gefiltert');
    const r = eng.dispatch(a);
    assert.ok(r.ok, 'Gegneraktion ' + JSON.stringify(a) + ' → ' + JSON.stringify(r));
    n++;
  }
  return n;
}
/**
 * Probiert eine falsche Aktion: Filter muss blocken, Stand bleibt gleich.
 * @param {object} step
 * @param {object} a
 */
function expectBlocked(step, a) {
  const before = JSON.stringify(eng.state);
  const hint = S.gate(step, a, eng, ctx);
  assert.ok(typeof hint === 'string' && hint.length > 5, step.id + ': blockt ' + JSON.stringify(a));
  assert.strictEqual(JSON.stringify(eng.state), before, 'Filter ändert nichts');
}

const seen = [];
const snaps = {};
for (const step of S.STEPS) {
  seen.push(step.id);
  assert.ok(step.title && step.text && step.text.length <= 260, step.id + ': Text kurz (' + step.text.length + ')');
  assert.ok(step.chapter >= 0 && step.chapter < S.CHAPTERS.length);
  if (step.ready) {
    if (!step.ready(eng, ctx)) runBot();
    assert.ok(step.ready(eng, ctx), step.id + ': bereit nach Gegnerzug');
  }
  snaps[step.id] = S.snapshot(eng, ctx);
  if (step.kind === 'info' || step.kind === 'finale') {
    expectBlocked(step, { type: 'END_TURN', player: 0 });
    if (step.onLeave) step.onLeave(ctx);
    continue;
  }
  if (step.kind === 'watch') {
    expectBlocked(step, { type: 'END_TURN', player: 0 });
    runBot();
    assert.ok(step.done(eng, ctx), step.id + ': Gegner hat gehandelt');
    continue;
  }
  // Handlungsschritt: falsche Aktionen werden geblockt
  assert.ok(!step.done(eng, ctx), step.id + ': noch nicht erledigt');
  if (step.id !== 'endturn') expectBlocked(step, { type: 'END_TURN', player: 0 });
  if (step.id === 'deploy') expectBlocked(step, { type: 'PLAY', player: 0, uid: ctx.u.recruit, slot: { section: 'L', row: 0 } });
  if (step.id === 'attack') expectBlocked(step, { type: 'ATTACK', player: 0, uid: ctx.u.vet, target: ctx.u.foeB });
  if (step.id === 'steil') expectBlocked(step, { type: 'ATTACK', player: 0, uid: ctx.u.art, target: ctx.u.foeB });
  if (step.id === 'react') expectBlocked(step, { type: 'REACT_PASS', player: 0 });
  if (step.id === 'support') expectBlocked(step, { type: 'PLAY', player: 0, uid: ctx.u.push });
  if (step.id === 'final') expectBlocked(step, { type: 'ATTACK', player: 0, uid: ctx.u.vet });
  for (const a of step.solve(eng, ctx)) {
    if (step.done(eng, ctx)) break;
    assert.strictEqual(S.gate(step, a, eng, ctx), null, step.id + ': Lösung erlaubt ' + JSON.stringify(a));
    const r = eng.dispatch(a);
    assert.ok(r.ok, step.id + ': ' + JSON.stringify(a) + ' → ' + JSON.stringify(r));
  }
  assert.ok(step.done(eng, ctx), step.id + ': erledigt');
  if (step.id === 'endturn') runBot();
  if (step.id === 'steil') {
    assert.ok(S.onFront(eng, ctx.u.art), 'kein Gegenschlag gegen die Batterie');
    assert.strictEqual(eng.player(0).ap, 2, '2 AP Reserve');
  }
  if (step.id === 'react') {
    assert.strictEqual(eng.player(0).ap, 0, 'Deckung kostet 2 AP');
    assert.ok(S.onFront(eng, ctx.u.vet), 'Trupp überlebt');
    assert.strictEqual(eng.player(0).vp, 3, 'Doktrin-Ziel +1 SP');
  }
}
assert.strictEqual(eng.state.winner, 0, 'Sieg des Spielers');
assert.strictEqual(eng.player(0).vp, 5, '5 SP');
assert.strictEqual(eng.player(1).vp, 2, 'Gegner unverändert');
assert.deepStrictEqual(seen, S.STEPS.map((s) => s.id));
assert.strictEqual(S.STEPS.length, 25);

/* ---------- 4. Zurück ---------- */
S.restore(eng, ctx, snaps.final);
assert.strictEqual(eng.state.winner, null, 'Zurück hebt den Sieg auf');
assert.ok(S.onFront(eng, ctx.u.elite), 'Elite wieder da');
const fin = S.STEPS.find((s) => s.id === 'final');
for (const a of fin.solve(eng, ctx)) { if (!fin.done(eng, ctx)) assert.ok(eng.dispatch(a).ok); }
assert.strictEqual(eng.state.winner, 0, 'Wiederholung gewinnt erneut');

/* ---------- 5. Eigenständig: keine geteilten Daten ---------- */
const src = fs.readFileSync(path.join(WEB, 'js/ui/tutorial.js'), 'utf8');
assert.ok(!/dc_users'\s*,/.test(src.replace(/getItem\('dc_users'\)/g, '')), 'Tutorial schreibt keine Benutzer');
assert.ok(!/setItem\('dc_(?!tutorial)/.test(src), 'Tutorial schreibt nur den eigenen Merker');
const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
assert.ok(html.includes('js/tutorial/scenario.js') && html.includes('js/ui/tutorial.js') && html.includes('css/tutorial.css'), 'Tutorial eingebunden');
assert.ok(/id="go-tutorial"/.test(html), 'Menüpunkt Tutorial');
assert.ok(fs.readFileSync(path.join(WEB, 'sw.js'), 'utf8').includes('js/ui/tutorial.js'), 'Offline-Cache enthält Tutorial');

console.log('PASS tutorial t275: Erststart-Merker, ' + S.STEPS.length + ' Schritte mit Engine bis Sieg 5 SP, Filter, Zurück');
