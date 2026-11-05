#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const zlib = require('zlib');

const WEB = path.join(__dirname, '..', 'Division_Command_0.5a', 'web');

function assert(c, m) { if (!c) throw new Error('ASSERT: ' + m); }

function loadGame() {
  const document = {
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => ({ style: {}, appendChild() {}, setAttribute() {}, remove() {}, addEventListener() {} }),
    head: { appendChild() {} },
    body: { appendChild() {}, style: {} },
    addEventListener() {},
  };
  const localStorage = { _d: {}, getItem(k) { return this._d[k] || null; }, setItem(k, v) { this._d[k] = String(v); } };
  const window = {
    DC_SET_TYPES: {}, DC_CATALOG: null, document, localStorage,
    addEventListener() {},
    DC_VERSION: 'test', DC_BUILD_LABEL: 'test-build',
    TextEncoder, TextDecoder, Uint8Array, Uint32Array, ArrayBuffer, DataView, Blob, URL,
    Promise, setTimeout, clearTimeout, console,
  };
  const ctx = {
    window, document, console, Math, JSON, Date, Error, Array, Object, String, Number, Boolean,
    RegExp, parseInt, isFinite, Promise, setTimeout, clearTimeout,
    TextEncoder, TextDecoder, Uint8Array, Uint32Array, ArrayBuffer, DataView, Blob, URL,
  };
  ctx.global = window;
  ctx.globalThis = window;
  window.window = window;
  ctx.self = window;

  for (const f of ['doktrinen','tokens','infanterie','panzer','artillerie','aufklaerung','elite','unterstuetzung','soforteinsatz','ausruestung']) {
    vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/data/sets/types', f + '.js'), 'utf8'), ctx);
  }
  const cat = fs.readFileSync(path.join(WEB, 'js/data/catalog.js'), 'utf8');
  const cut = cat.indexOf('/* 0.5a:');
  vm.runInNewContext(cat.slice(0, cut > 0 ? cut : cat.length), ctx);
  vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/data/decks.js'), 'utf8'), ctx);
  try { vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/data/nationen.js'), 'utf8'), ctx); } catch (e) {}
  vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/engine/engine.js'), 'utf8'), ctx);
  try { vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/engine/victory_trophy.js'), 'utf8'), ctx); } catch (e) {}
  try { vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/engine/doctrine_runtime.js'), 'utf8'), ctx); } catch (e) {}
  try { vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/ai/bot.js'), 'utf8'), ctx); } catch (e) {}
  vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/playtest/store.js'), 'utf8'), ctx);
  vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/playtest/logger.js'), 'utf8'), ctx);

  // Memory store instead of IndexedDB
  const mem = { games: new Map(), notes: new Map(), meta: new Map() };
  const S = window.DCPlayStore;
  S.put = function (store, value) {
    const key = value.id != null ? value.id : value.key;
    mem[store].set(key, JSON.parse(JSON.stringify(value)));
    return Promise.resolve(value);
  };
  S.get = function (store, key) {
    return Promise.resolve(mem[store].has(key) ? JSON.parse(JSON.stringify(mem[store].get(key))) : null);
  };
  S.getAll = function (store) {
    return Promise.resolve([...mem[store].values()].map((v) => JSON.parse(JSON.stringify(v))));
  };
  S.clearStore = function (store) {
    mem[store].clear();
    return Promise.resolve();
  };
  S._mem = mem;
  return window;
}

function makeEng(win, seed) {
  const Eng = win.DCEngine.Engine;
  const decks = win.DC_NATION_DECKS;
  const n = Object.keys(decks);
  const d0 = decks[n[0]], d1 = decks[n[1] || n[0]];
  const catalog = JSON.parse(JSON.stringify(win.DC_CATALOG));
  catalog.rules = Object.assign({}, catalog.rules, { opening_coin: false, deploy_protection: true });
  const eng = new Eng(catalog, { seed: seed || 7, rules: catalog.rules });
  eng.createMatch({
    seed: seed || 7, mode: 'hotseat', startPlayer: 0,
    name0: 'Alpha', name1: 'Beta',
    deck0: d0.cards.slice(), deck1: d1.cards.slice(),
    doctrine0: (d0.doktrinen || []).slice(0, 2), doctrine1: (d1.doktrinen || []).slice(0, 2),
  });
  return eng;
}

async function run() {
  const win = loadGame();
  assert(win.DCPlayStore, 'DCPlayStore');
  assert(win.DCPlayLogger, 'DCPlayLogger');
  assert(typeof win.DCPlayStore.buildZip === 'function', 'buildZip');
  assert(typeof win.DCPlayStore.exportAll === 'function', 'exportAll');

  // ZIP structure
  const zipBytes = win.DCPlayStore.buildZip([
    { name: 'manifest.json', text: '{"schema":1}' },
    { name: 'logs/g1.json', text: '{"id":"g1"}' },
    { name: 'notes/n1.json', text: '{"id":"n1"}' },
  ]);
  assert(zipBytes instanceof Uint8Array, 'zip bytes');
  assert(zipBytes.length > 30, 'zip size');
  assert(zipBytes[0] === 0x50 && zipBytes[1] === 0x4b, 'PK header');

  const eng = makeEng(win, 11);
  const g = win.DCPlayLogger.beginMatch({ engine: eng, mode: 'hotseat', you: 0, nation0: 'TestA', nation1: 'TestB' });
  assert(g && g.id, 'game id');
  assert(g.players.length === 2, '2 players');
  assert(g.players[0].nation === 'TestA', 'nation0');
  assert(g.schema === 1, 'schema');
  assert(Array.isArray(g.turns) && Array.isArray(g.chat), 'turns/chat');

  const act = { type: 'END_TURN', player: eng.state.active };
  const beforeActive = eng.state.active;
  const res = eng.dispatch(act);
  win.DCPlayLogger.recordAction({
    engine: eng, action: act, result: res, actor: 'human',
    botSuggestion: { type: 'END_TURN', player: beforeActive },
  });
  assert(g.turns.length === 1, 'one turn logged');
  assert(g.turns[0].action.type === 'END_TURN', 'action type');
  assert(g.turns[0].botMatch === true, 'bot match');
  assert(g.turns[0].thinkMs != null, 'thinkMs');
  assert(g.turns[0].front && g.turns[0].front[0], 'front snap');

  win.DCPlayLogger.addChat({ name: 'Alpha', text: 'Hallo', player: 0 });
  assert(g.chat.length === 1, 'chat');

  await win.DCPlayLogger.flush();
  const stored = await win.DCPlayStore.get('games', g.id);
  assert(stored && stored.turns.length === 1, 'persisted game');

  await win.DCPlayLogger.abort('test-abort');
  assert(g.end && g.end.aborted === true, 'aborted');
  assert(g.end.kind === 'aborted', 'abort kind');

  // sanitize strips engine
  const clean = win.DCPlayLogger.sanitizeAction({ type: 'PLAY', uid: 'x', engine: eng, state: eng.state, slot: { section: 'C', row: 0 } });
  assert(!clean.engine && !clean.state, 'sanitize drop');
  assert(clean.slot.section === 'C', 'slot kept');

  // note + export
  await win.DCPlayStore.put('notes', {
    id: 'note_1', t: new Date().toISOString(), category: 'bug', text: 'Testbug', version: 'test', gameId: g.id,
  });
  let downloaded = null;
  win.DCPlayStore.downloadBlob = function (blob, filename) {
    downloaded = { blob, filename };
  };
  const exp = await win.DCPlayStore.exportAll({ silent: false });
  assert(exp.games.length >= 1, 'export games');
  assert(exp.notes.length >= 1, 'export notes');
  assert(exp.files.some((f) => f.name.startsWith('logs/')), 'logs/');
  assert(exp.files.some((f) => f.name.startsWith('notes/')), 'notes/');
  assert(exp.files.some((f) => f.name === 'manifest.json'), 'manifest');
  assert(downloaded && /\.zip$/.test(downloaded.filename), 'download zip name');

  // second match completed
  const eng2 = makeEng(win, 22);
  const g2 = win.DCPlayLogger.beginMatch({ engine: eng2, mode: 'bot', you: 0, nation0: 'X', nation1: 'Y' });
  eng2.state.winner = 0;
  eng2.state.endReason = 'Siegpunkte';
  win.DCPlayLogger.recordAction({
    engine: eng2,
    action: { type: 'END_TURN', player: 0 },
    result: { ok: true },
    actor: 'human',
  });
  assert(g2.end && g2.end.winner === 0, 'auto finish on winner');

  console.log('OK test_playtest_logger');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
