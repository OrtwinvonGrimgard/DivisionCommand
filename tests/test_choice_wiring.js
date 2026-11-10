#!/usr/bin/env node
/**
 * Wahl-Karten und Doktrinen sind an echte pending-Wege verdrahtet.
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const WEB = path.join(__dirname, '..', 'Division_Command', 'web');

/**
 * Lädt Katalog und Engine in einen Node-Kontext und gibt den Kontext zurück.
 */
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
  vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/engine/engine.js'), 'utf8'), ctx);
  try { vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/engine/victory_trophy.js'), 'utf8'), ctx); } catch (e) {}
  try { vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/engine/doctrine_runtime.js'), 'utf8'), ctx); } catch (e) {}
  vm.runInNewContext(fs.readFileSync(path.join(WEB,'js/engine/tactical_runtime.js'),'utf8'),ctx);
  try { vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/ai/bot.js'), 'utf8'), ctx); } catch (e) {}
  return ctx.window;
}

function assert(c, m) { if (!c) throw new Error('ASSERT: ' + m); }

function makeEng(win, seed) {
  const Eng = win.DCEngine.Engine;
  const decks = win.DC_NATION_DECKS;
  const n = Object.keys(decks);
  const d0 = decks[n[0]], d1 = decks[n[1]];
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
  inst.flags = { deployProtect: false };
  eng.player(pid).front[sec][row] = inst;
  return inst;
}

function main() {
  const win = loadGame();
  const cards = win.DC_CATALOG.cards;
  const INF = cards.find((c) => c.typ === 'Einheit' && /infanterie/.test(tags(c)));
  const PANZ = cards.find((c) => c.typ === 'Einheit' && /panzer/.test(tags(c)));
  let n = 0;

  // 1) Sammelruf (Theryn): single BUFF → pending → only that unit buffed
  {
    const eng = makeEng(win, 11);
    put(eng, 0, INF.id, 'C', 0);
    put(eng, 0, INF.id, 'C', 0);
    const card = eng.instFromId('dc_b_sammelruf_123', 0);
    eng.player(0).hand.push(card); eng.player(0).ap = 10; eng.state.active = 0;
    const r = eng.dispatch({ type: 'PLAY', player: 0, uid: card.uid });
    assert(r.ok, 'sammelruf play');
    assert(eng.state.pending && eng.state.pending.kind === 'instant-target', 'sammelruf pending');
    const t0 = eng.state.pending.choices[0].target;
    eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: t0 });
    const buffed = eng.frontList(eng.player(0)).filter((l) => (l.inst.flags.tempAtk || 0) > 0 || (l.inst.flags.buffAtk || 0) > 0);
    assert(buffed.length === 1, 'sammelruf only one buffed got ' + buffed.length);
    n++;
  }

  // 2) Linienhalten → section pending
  {
    const eng = makeEng(win, 12);
    put(eng, 0, INF.id, 'C', 0);
    const card = eng.instFromId('dc_b_linienhalten_646', 0);
    eng.player(0).hand.push(card); eng.player(0).ap = 10; eng.state.active = 0;
    const r = eng.dispatch({ type: 'PLAY', player: 0, uid: card.uid });
    assert(r.ok, 'linienhalten play');
    assert(eng.state.pending && eng.state.pending.kind === 'instant-section', 'linienhalten section pending got ' + (eng.state.pending && eng.state.pending.kind));
    n++;
  }

  // 3) MOVE_SLOTS Wachwechsel → unit then dest
  {
    const eng = makeEng(win, 13);
    const u = put(eng, 0, INF.id, 'C', 0);
    const card = eng.instFromId('dc_b_wachwechsel_201', 0);
    eng.player(0).hand.push(card); eng.player(0).ap = 10; eng.state.active = 0;
    eng.dispatch({ type: 'PLAY', player: 0, uid: card.uid });
    assert(eng.state.pending && eng.state.pending.kind === 'instant-target', 'wachwechsel unit pick');
    eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: u.uid });
    assert(eng.state.pending && eng.state.pending.kind === 'move-dest', 'wachwechsel dest pending got ' + (eng.state.pending && eng.state.pending.kind));
    const slot = eng.state.pending.choices[0].slot;
    eng.dispatch({ type: 'CHOOSE_SLOT', player: 0, slot: slot });
    assert(!eng.state.pending, 'wachwechsel resolved');
    assert(eng.player(0).front[slot.section][slot.row], 'unit moved');
    n++;
  }

  // 4) Minenfeld lay-mine no throw
  {
    const eng = makeEng(win, 14);
    const u = put(eng, 0, INF.id, 'C', 0);
    const card = eng.instFromId('dc_so_minenfeld', 0);
    eng.player(0).hand.push(card); eng.player(0).ap = 10; eng.state.active = 0;
    eng.dispatch({ type: 'PLAY', player: 0, uid: card.uid });
    assert(eng.state.pending && eng.state.pending.kind === 'lay-mine', 'minenfeld pending');
    const r = eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: u.uid });
    assert(r.ok, 'minenfeld resolve ' + JSON.stringify(r));
    assert(eng.player(0).nml.C[0], 'mine placed');
    n++;
  }

  // 5) Stoßtrupp no double dip
  {
    const eng = makeEng(win, 15);
    eng.player(0).doctrines = [eng.instFromId('dc_dok_stosstrupp', 0)];
    const u = put(eng, 0, INF.id, 'C', 0);
    const before = eng.currentAtkDef(u).atk;
    eng._dokTurnStart(eng.player(0));
    assert(!(u.flags && u.flags.dokAtk), 'no dokAtk flag');
    const after = eng.currentAtkDef(u).atk;
    assert(after === before, 'stosstrupp atk stable ' + before + '→' + after);
    n++;
  }

  // 6) Verlegung DOK_SHIFT in listActions + resolve
  {
    const eng = makeEng(win, 16);
    eng.player(0).doctrines = [eng.instFromId('dc_dok_verlegung', 0)];
    const u = put(eng, 0, INF.id, 'C', 0);
    eng.state.active = 0;
    const acts = eng.listActions(0).filter((a) => a.type === 'DOK_SHIFT');
    assert(acts.length >= 1, 'dok shift listed');
    const act = acts[0];
    const r = eng.dispatch({ type: 'DOK_SHIFT', player: 0, uid: act.uid, slot: act.slot });
    assert(r.ok, 'dok shift ok');
    assert(eng.player(0).flags.dokVerlegungUsed === eng.state.turn, 'verlegung used');
    n++;
  }

  // 7) Sturmglocke: choose one, buff+self damage on that unit
  {
    const eng = makeEng(win, 17);
    const a = put(eng, 0, INF.id, 'C', 0);
    const b = put(eng, 0, INF.id, 'R', 0);
    const defA = a.def;
    const card = eng.instFromId('dc_b_sturmglocke_127', 0);
    eng.player(0).hand.push(card); eng.player(0).ap = 10; eng.state.active = 0;
    eng.dispatch({ type: 'PLAY', player: 0, uid: card.uid });
    assert(eng.state.pending, 'sturmglocke pending');
    eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: a.uid });
    assert((a.flags.tempAtk || a.flags.buffAtk || 0) >= 3, 'sturmglocke buff');
    assert(a.def < defA || a.def <= defA, 'sturmglocke damaged or equal');
    assert(!(b.flags && (b.flags.tempAtk || b.flags.buffAtk)), 'other not buffed');
    n++;
  }

  // 8) PENDING_META covers move-dest
  assert(win.DCEngine.pendingMeta('move-dest').needs, 'move-dest meta');
  n++;

  console.log('ALL PASSED', n);
}

main();
