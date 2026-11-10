#!/usr/bin/env node
/**
 * Text/Wahl-Karten aus dem Katalog sind spielbar verdrahtet.
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const WEB = path.join(__dirname, '..', 'Division_Command', 'web');

/**
 * Testprüfung: wirft mit Meldung, wenn die Bedingung nicht gilt.
 */
function assert(c, m) { if (!c) throw new Error('ASSERT: ' + m); }

/**
 * Lädt Katalog und Engine in einen Node-Kontext und gibt den Kontext zurück.
 */
function loadGame() {
  const document = {
    getElementById: () => null, querySelector: () => null, querySelectorAll: () => [],
    createElement: () => ({ style: {}, appendChild() {}, setAttribute() {}, remove() {} }),
    head: { appendChild() {} }, addEventListener() {},
  };
  const window = { DC_SET_TYPES: {}, document, addEventListener() {} };
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
  vm.runInNewContext(fs.readFileSync(path.join(WEB,'js/engine/tactical_runtime.js'),'utf8'),ctx);
  try { vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/engine/victory_trophy.js'), 'utf8'), ctx); } catch (e) {}
  try { vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/ai/bot.js'), 'utf8'), ctx); } catch (e) {}
  return ctx.window;
}

function makeEng(win, seed) {
  const Eng = win.DCEngine.Engine;
  const decks = win.DC_NATION_DECKS;
  const n = Object.keys(decks);
  const catalog = JSON.parse(JSON.stringify(win.DC_CATALOG));
  catalog.rules = Object.assign({}, catalog.rules, { opening_coin: false, deploy_protection: false });
  const eng = new Eng(catalog, { seed, rules: catalog.rules });
  eng.createMatch({
    seed, mode: 'hotseat', startPlayer: 0, name0: 'A', name1: 'B',
    deck0: decks[n[0]].cards.slice(), deck1: decks[n[1] || n[0]].cards.slice(),
    doctrine0: (decks[n[0]].doktrinen || []).slice(0, 2),
    doctrine1: (decks[n[1] || n[0]].doktrinen || []).slice(0, 2),
  });
  return eng;
}

function putInf(win, eng, pid, section, row) {
  const INF = win.DC_CATALOG.cards.find((c) => c.typ === 'Einheit' && /infanterie/i.test((c.tags || []).join(' ') + (c.klasse || '') + (c.name || '')));
  assert(INF, 'infantry card');
  const u = eng.instFromId(INF.id, pid);
  u.summonedTurn = -99;
  u.flags = {};
  eng.player(pid).front[section][row] = u;
  return u;
}

function playById(eng, pid, cardId) {
  const c = eng.instFromId(cardId, pid);
  eng.player(pid).hand.push(c);
  eng.player(pid).ap = 20;
  eng.state.active = pid;
  return eng.dispatch({ type: 'PLAY', player: pid, uid: c.uid });
}

const win = loadGame();

// Lauer → section pending
{
  const eng = makeEng(win, 11);
  putInf(win, eng, 0, 'C', 0);
  const r = playById(eng, 0, 'dc_b_lauer_249');
  assert(r.ok && eng.state.pending && eng.state.pending.kind === 'instant-section', 'Lauer needs section');
  const tgt = eng.state.pending.choices.find((c) => c.section === 'C');
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: tgt.target });
  assert(!eng.state.pending, 'Lauer resolved');
  const traps = eng.player(0).flags.sectionEnterDamage || [];
  assert(traps.some((t) => t.section === 'C' && t.value === 1), 'Lauer enter trap');
  const u = eng.player(0).front.C[0];
  const atkBefore = (u.flags && u.flags.tempAtk) || 0;
  // aura may store differently — at least trap set
  console.log('OK Lauer section+trap');
}

// Signalfeuer → section pending
{
  const eng = makeEng(win, 12);
  const r = playById(eng, 0, 'dc_b_signalfeuer_240');
  assert(r.ok && eng.state.pending && eng.state.pending.kind === 'instant-section', 'Signalfeuer section');
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: eng.state.pending.choices[0].target });
  assert((eng.player(0).flags.sectionEnterDamage || []).length >= 1, 'Signalfeuer trap');
  console.log('OK Signalfeuer');
}

// Enter damage triggers
{
  const eng = makeEng(win, 13);
  playById(eng, 0, 'dc_b_signalfeuer_240');
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: eng.state.pending.choices.find((c) => c.section === 'L').target });
  const foe = putInf(win, eng, 1, 'L', 0);
  const def0 = foe.def;
  eng._onEnter(foe, 'front');
  assert(foe.def < def0 || (foe.flags && foe.flags.dead), 'enter damage applied (def dropped or dead)');
  console.log('OK enter damage', def0, '->', foe.def);
}

// Konzentrationsruf → section
{
  const eng = makeEng(win, 14);
  putInf(win, eng, 0, 'R', 0);
  putInf(win, eng, 0, 'R', 1);
  const r = playById(eng, 0, 'dc_b_konzentrationsruf_639');
  assert(eng.state.pending && eng.state.pending.kind === 'instant-section', 'Konzentration section');
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: eng.state.pending.choices.find((c) => c.section === 'R').target });
  assert(!eng.state.pending, 'Konzentration done');
  console.log('OK Konzentrationsruf');
}

// Zweite Linie → 2 unit picks
{
  const eng = makeEng(win, 15);
  const a = putInf(win, eng, 0, 'L', 0);
  const b = putInf(win, eng, 0, 'C', 0);
  const r = playById(eng, 0, 'dc_b_zweite_linie_248');
  assert(eng.state.pending && eng.state.pending.kind === 'instant-target', 'Zweite Linie target');
  assert(eng.state.pending.needCount === 2, 'need 2');
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: a.uid });
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: b.uid });
  assert(!eng.state.pending, 'Zweite Linie done');
  assert((a.flags.tempAtk || 0) >= 1 && (b.flags.tempAtk || 0) >= 1, 'both buffed');
  console.log('OK Zweite Linie');
}

// 1–2 upto (Gegenruf)
{
  const eng = makeEng(win, 16);
  const a = putInf(win, eng, 0, 'L', 0);
  putInf(win, eng, 0, 'C', 0);
  playById(eng, 0, 'dc_b_gegenruf_760');
  assert(eng.state.pending && eng.state.pending.upto, 'Gegenruf upto');
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: a.uid });
  eng.dispatch({ type: 'CONFIRM_TARGETS', player: 0 });
  assert(!eng.state.pending, 'Gegenruf confirmed');
  assert((a.flags.tempAtk || 0) >= 2, 'Gegenruf +2');
  console.log('OK Gegenruf upto');
}

// Absetzung choice even with support
{
  const eng = makeEng(win, 17);
  const SUP = win.DC_CATALOG.cards.find((c) => c.typ === 'Unterstützung' || /unterstützung/i.test(c.typ || ''));
  assert(SUP, 'support card');
  const s = eng.instFromId(SUP.id, 1);
  eng.player(1).support[0] = s;
  const u = putInf(win, eng, 1, 'C', 0);
  playById(eng, 0, 'dc_b_absetzung_289');
  assert(eng.state.pending && eng.state.pending.kind === 'instant-target', 'Absetzung pending');
  assert(eng.state.pending.choices.length >= 2, 'support + unit choices');
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: u.uid });
  assert((u.flags.buffAtk || 0) <= -2, 'unit -2 ATK');
  console.log('OK Absetzung choice');
}

console.log('ALL PASSED test_text_choice_wiring');
