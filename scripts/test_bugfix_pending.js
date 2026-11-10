#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const WEB = path.join(__dirname, '..', 'Division_Command', 'web');

function assert(c, m) { if (!c) throw new Error('ASSERT: ' + m); }

function loadGame() {
  const document = {
    getElementById: () => null, querySelector: () => null, querySelectorAll: () => [],
    createElement: () => ({ style: {}, appendChild() {}, setAttribute() {}, remove() {} }),
    head: { appendChild() {} }, addEventListener() {},
  };
  const window = { DC_SET_TYPES: {}, DC_CATALOG: null, document, addEventListener() {} };
  const ctx = { window, document, console, Math, JSON, Date, Error, Array, Object, String, Number, Boolean, RegExp, parseInt, isFinite };
  ctx.global = ctx; ctx.globalThis = ctx; window.window = window; ctx.self = window;
  for (const f of ['doktrinen','tokens','infanterie','panzer','artillerie','aufklaerung','elite','unterstuetzung','soforteinsatz','ausruestung','nation_pools']) {
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
  vm.runInNewContext(fs.readFileSync(path.join(WEB,'js/engine/tactical_runtime.js'),'utf8'),ctx);
  try { vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/ai/bot.js'), 'utf8'), ctx); } catch (e) {}
  return ctx.window;
}

function makeEng(win, seed) {
  const Eng = win.DCEngine.Engine;
  const decks = win.DC_NATION_DECKS;
  const n = Object.keys(decks);
  const d0 = decks[n[0]], d1 = decks[n[1] || n[0]];
  const catalog = JSON.parse(JSON.stringify(win.DC_CATALOG));
  catalog.rules = Object.assign({}, catalog.rules, { opening_coin: false, deploy_protection: true });
  const eng = new Eng(catalog, { seed: seed || 1, rules: catalog.rules });
  eng.createMatch({
    seed: seed || 1, mode: 'hotseat', startPlayer: 0,
    name0: 'P0', name1: 'P1',
    deck0: d0.cards.slice(), deck1: d1.cards.slice(),
    doctrine0: (d0.doktrinen || []).slice(0, 2), doctrine1: (d1.doktrinen || []).slice(0, 2),
  });
  return eng;
}

function tags(c) { return ((c.tags || []).join(' ') + ' ' + (c.klasse || '')).toLowerCase(); }
function put(eng, pid, id, sec, row) {
  const inst = eng.instFromId(id, pid);
  inst.summonedTurn = -99;
  inst.flags = Object.assign({}, inst.flags || {}, { deployProtect: false });
  eng.player(pid).front[sec][row] = inst;
  return inst;
}
function give(eng, pid, id) {
  const inst = eng.instFromId(id, pid);
  eng.player(pid).hand.push(inst);
  eng.player(pid).ap = 12;
  eng.state.active = pid;
  return inst;
}

const win = loadGame();
win.DCBot.applyCfg({ model: 'test', delayMs: 0, aggression: 50, holdAp: 0, allowAttack: 1 });
const INF = win.DC_CATALOG.cards.find((c) => c.typ === 'Einheit' && /infanterie/.test(tags(c)));
assert(INF, 'infantry card');

// Echte Auto-Effekte (kein Ziel trotz "eine" im Text)
{
  const eng = makeEng(win, 42);
  put(eng, 0, INF.id, 'C', 0);
  const card = give(eng, 0, 'dc_b_werkalarme_167');
  const res = eng.dispatch({ type: 'PLAY', player: 0, uid: card.uid });
  assert(res && res.ok !== false, 'werkalarme play');
  assert(!eng.state.pending || eng.state.pending.kind !== 'instant-target', 'werkalarme stays auto');
}

// Früheres Datum: 1–2 Einheiten wählen
{
  const eng = makeEng(win, 7);
  const u0 = put(eng, 0, INF.id, 'C', 0);
  const u1 = put(eng, 0, INF.id, 'L', 0);
  const card = give(eng, 0, 'dc_b_frueheres_datum_941');
  eng.dispatch({ type: 'PLAY', player: 0, uid: card.uid });
  assert(eng.state.pending && eng.state.pending.kind === 'instant-target', 'Früheres Datum pending');
  assert(eng.state.pending.upto, 'Früheres Datum upto');
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: u0.uid });
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: u1.uid });
  // needCount 2 + upto → finish when need reached OR confirm
  if (eng.state.pending) eng.dispatch({ type: 'CONFIRM_TARGETS', player: 0 });
  assert(!eng.state.pending, 'Früheres Datum resolved');
  assert((u0.flags.tempAtk || 0) === 2, 'unit0 +2 got ' + (u0.flags.tempAtk || 0));
  assert((u1.flags.tempAtk || 0) === 2, 'unit1 +2 got ' + (u1.flags.tempAtk || 0));
}

{
  const eng = makeEng(win, 9);
  const a = put(eng, 0, INF.id, 'C', 0);
  const b = put(eng, 0, INF.id, 'L', 0);
  const c = put(eng, 0, INF.id, 'R', 0);
  eng.state.pending = eng._sealPending({
    kind: 'instant-target',
    player: 0,
    uid: 'x',
    card: eng.instFromId(INF.id, 0),
    needCount: 2,
    upto: false,
    selected: [a.uid],
    choices: [
      { target: a.uid, label: 'A' },
      { target: b.uid, label: 'B' },
      { target: c.uid, label: 'C' },
    ],
  });
  let finished = null;
  eng._finishInstant = function (pid, pend, selected) {
    finished = (selected || []).slice();
    eng.state.pending = null;
    return { ok: true };
  };
  let steps = 0;
  while (eng.state.pending && steps < 10) {
    const act = win.DCBot.step(eng, 0, {});
    assert(act && act.type === 'RESOLVE_PENDING', 'bot resolve got ' + JSON.stringify(act));
    assert(act.target !== a.uid, 'bot must not re-toggle already selected, got ' + act.target);
    const res = eng.dispatch(Object.assign({ player: 0 }, act));
    assert(res && res.ok !== false, 'resolve ok');
    steps++;
  }
  assert(!eng.state.pending, 'pending cleared');
  assert(finished && finished.length === 2, 'finished 2 got ' + JSON.stringify(finished));
  assert(finished.indexOf(a.uid) >= 0, 'kept first');
}

// CLEAR_SUPPORT_OR_DEBUFF: immer Wahl (Support oder Einheit −2 ATK)
{
  const eng = makeEng(win, 3);
  put(eng, 1, INF.id, 'C', 0);
  const sup = eng.instFromId(win.DC_CATALOG.cards.find((c) => c.typ === 'Unterstützung').id, 1);
  eng.player(1).support[0] = sup;
  const card = give(eng, 0, 'dc_b_absetzung_289');
  const res = eng.dispatch({ type: 'PLAY', player: 0, uid: card.uid });
  assert(res.ok, 'absetzung with support');
  assert(eng.state.pending && eng.state.pending.kind === 'instant-target', 'choice with support');
  assert(eng.state.pending.choices.length >= 2, 'support + unit');
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: sup.uid });
  assert(!eng.player(1).support[0], 'support cleared by choice');
}
{
  const eng = makeEng(win, 4);
  put(eng, 1, INF.id, 'C', 0);
  eng.player(1).support = [null, null, null, null, null, null];
  const card = give(eng, 0, 'dc_b_absetzung_289');
  const res = eng.dispatch({ type: 'PLAY', player: 0, uid: card.uid });
  assert(res.ok, 'absetzung no support play');
  assert(eng.state.pending && eng.state.pending.kind === 'instant-target', 'needs unit target');
}


// needCount > verfügbare Ziele: kein Toggle-Soft-Lock
{
  const eng = makeEng(win, 15);
  const only = put(eng, 0, INF.id, 'C', 0);
  eng.state.pending = eng._sealPending({
    kind: 'instant-target', player: 0, uid: 'x',
    card: eng.instFromId(INF.id, 0),
    needCount: 2, upto: false, selected: [],
    choices: [{ target: only.uid, label: 'Only' }],
  });
  let finished = null;
  eng._finishInstant = function (pid, pend, selected) {
    finished = (selected || []).slice();
    eng.state.pending = null;
    return { ok: true };
  };
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: only.uid });
  assert(!eng.state.pending, 'capped finish cleared pending');
  assert(finished && finished[0] === only.uid, 'finished with only target');
}

console.log('OK test_bugfix_pending');

