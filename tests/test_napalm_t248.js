#!/usr/bin/env node
/**
 * Napalm (t248): gedruckte 3 AP, 3 Sofortschaden, DoT 1 zu Beginn jedes Zuges des Besitzers.
 * Läuft über `npm test` von der Repo-Wurzel.
 */
'use strict';
const assert = require('node:assert/strict');
const L = require('../scripts/nation_pools/load_game.js');

const w = L.loadGame({ quiet: true });
const C = w.DC_CATALOG.cards;
const card = C.find((c) => c.id === 'dc_so_napalm');
assert.ok(card, 'Napalm fehlt');
assert.equal(card.typ, 'Soforteinsatz');
assert.equal(Number(card.ap), 3, 'gedruckte Kosten 3 AP');
assert.equal((card.effects || []).some((e) => e.code === 'NAPALM' && Number(e.param.now) === 3 && Number(e.param.tick) === 1), true);

function fresh() {
  const eng = L.newMatch(w, 'Steinmark', 11);
  L.clearBoard(eng);
  eng.state.active = 0;
  eng.state.phase = 'main';
  eng.player(0).ap = 5;
  eng.player(0).hand = [];
  return eng;
}

function unit() {
  return C.find((c) => c.typ === 'Einheit' && (c.tags || []).includes('infanterie') && Number(c.def) >= 5) ||
    C.find((c) => c.typ === 'Einheit' && Number(c.def) >= 5);
}

{
  const eng = fresh();
  const def = unit();
  assert.ok(def, 'keine Einheit mit DEF≥5');
  const inst = L.put(eng, 1, def.id, 'C', 0);
  inst.def = 6;
  inst.defMax = 6;
  const startDef = inst.def;
  const nap = eng.instFromId(card.id, 0);
  eng.player(0).hand.push(nap);
  assert.equal(eng.costOf(card, eng.player(0)), 3);
  const ap0 = eng.player(0).ap;
  const r = eng.dispatch({ type: 'PLAY', player: 0, uid: nap.uid });
  assert.ok(r.ok, 'PLAY ' + (r && r.error));
  assert.equal(eng.state.pending && eng.state.pending.kind, 'napalm');
  const uid = inst.uid;
  const r2 = eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: uid });
  assert.ok(r2.ok, 'RESOLVE ' + (r2 && r2.error));
  assert.equal(ap0 - eng.player(0).ap, 3, '3 AP bezahlt');
  assert.equal(inst.def, startDef - 3, 'Sofortschaden 3, def=' + inst.def);
  assert.equal(!!inst.flags.napalm, true, 'DoT-Flag');

  const end0 = eng.dispatch({ type: 'END_TURN', player: 0 });
  assert.ok(end0.ok, 'END_TURN P0 ' + (end0 && end0.error));
  assert.equal(eng.state.active, 1);
  assert.equal(inst.def, startDef - 4, 'DoT 1 zu Beginn des Besitzerzugs, def=' + inst.def);
  const log = Array.isArray(eng.log) ? eng.log : (eng.log && eng.log.lines) || (eng.state && eng.state.log) || [];
  const msgs = log.map((x) => String((x && (x.msg || x.text)) || x));
  assert.ok(msgs.some((m) => m.includes('brennt (Napalm 1)')), 'Log DoT: ' + msgs.slice(-6).join(' | '));

  const end1 = eng.dispatch({ type: 'END_TURN', player: 1 });
  assert.ok(end1.ok);
  assert.equal(inst.def, startDef - 4, 'kein Tick im Zug des Anwenders');
  eng.dispatch({ type: 'END_TURN', player: 0 });
  assert.equal(inst.def, startDef - 5, 'zweiter Tick im nächsten Besitzerzug');
  console.log('ok DoT und 3 AP', card.id);
}

{
  const eng = fresh();
  eng.player(0).ap = 2;
  L.put(eng, 1, unit().id, 'C', 0);
  const nap = eng.instFromId(card.id, 0);
  eng.player(0).hand.push(nap);
  const r = eng.dispatch({ type: 'PLAY', player: 0, uid: nap.uid });
  assert.ok(!r.ok, 'mit 2 AP nicht spielbar');
  console.log('ok unerschwinglich bei 2 AP');
}

console.log('PASS napalm t248: 3 AP, 3 Sofortschaden, DoT je Besitzerzug');
