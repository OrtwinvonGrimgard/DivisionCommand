'use strict';
/* Node-Loader für Engine + Katalog (inkl. nation_pools.js), ohne DOM. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const WEB = path.join(__dirname, '..', '..', 'Division_Command', 'web');
const TYPES = ['doktrinen','tokens','infanterie','panzer','artillerie','aufklaerung','elite','unterstuetzung','soforteinsatz','ausruestung','nation_pools', 'tactical'];
function loadGame(opts) {
  opts = opts || {};
  const document = { getElementById: () => null, querySelector: () => null, createElement: () => ({ style: {}, appendChild() {}, setAttribute() {}, remove() {} }), head: { appendChild() {} }, addEventListener() {} };
  const window = { DC_SET_TYPES: {}, DC_CATALOG: null, document, addEventListener() {} };
  const ctx = { window, document, console: opts.quiet ? { log() {}, warn() {}, error() {} } : console, Math, JSON, Date, Error, Array, Object, String, Number, Boolean, RegExp, parseInt, isFinite };
  ctx.global = ctx; ctx.globalThis = ctx; window.window = window; ctx.self = window;
  vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/data/keywords.js'), 'utf8'), ctx);
  for (const f of TYPES) {
    const p = path.join(WEB, 'js/data/sets/types', f + '.js');
    if (fs.existsSync(p)) vm.runInNewContext(fs.readFileSync(p, 'utf8'), ctx);
  }
  if (opts.inject) opts.inject(window);
  const cat = fs.readFileSync(path.join(WEB, 'js/data/catalog.js'), 'utf8');
  const cut = cat.indexOf('/* 0.5a:');
  vm.runInNewContext(cat.slice(0, cut > 0 ? cut : cat.length), ctx);
  for (const f of ['js/data/decks.js', 'js/data/nationen.js', 'js/engine/engine.js']) vm.runInNewContext(fs.readFileSync(path.join(WEB, f), 'utf8'), ctx);
  for (const f of ['js/engine/victory_trophy.js', 'js/engine/doctrine_runtime.js']) { try { vm.runInNewContext(fs.readFileSync(path.join(WEB, f), 'utf8'), ctx); } catch (e) {} }
  vm.runInNewContext(fs.readFileSync(path.join(WEB,'js/engine/tactical_runtime.js'),'utf8'),ctx);
  return window;
}
function newMatch(w, nation, seed) {
  const Eng = w.DCEngine.Engine, d = w.DC_NATION_DECKS[nation || 'Steinmark'];
  const eng = new Eng(w.DC_CATALOG, { seed: seed || 7 });
  eng.createMatch({ seed: seed || 7, mode: 'hotseat', startPlayer: 0, deck0: d.cards.slice(), deck1: d.cards.slice(), doctrine0: [], doctrine1: [], name0: 'A', name1: 'B' });
  return eng;
}
function clearBoard(eng) {
  eng.state.players.forEach((p) => { ['L', 'C', 'R'].forEach((s) => { p.front[s] = p.front[s].map(() => null); }); p.support = p.support.map(() => null); });
  eng.state.pending = null;
}
function put(eng, pid, id, section, row) {
  const inst = eng.instFromId(id, pid); inst.summonedTurn = -9; inst.playedTurn = -9; inst.flags = inst.flags || {};
  eng.player(pid).front[section][row || 0] = inst; return inst;
}
module.exports = { loadGame, newMatch, clearBoard, put, WEB };
