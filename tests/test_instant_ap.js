#!/usr/bin/env node
/**
 * Soforteinsätze zahlen die gedruckten AP, inklusive Rabatte.
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
'use strict';
/* Soforteinsätze kosten den gedruckten AP-Wert; Rabatte greifen; unerschwingliche nicht spielbar. */
const assert = require('node:assert/strict');
const L = require('../scripts/nation_pools/load_game.js');

const w = L.loadGame({ quiet: true });
const C = w.DC_CATALOG.cards;
assert.ok(!('instant_ap_test' in (w.DC_CATALOG.rules || {})), 'rules.instant_ap_test entfernt');

/**
 * Erzeugt eine frische Test-Engine bzw. Partie in bekanntem Ausgangszustand.
 */
function fresh() {
  const eng = L.newMatch(w, 'Steinmark', 9);
  L.clearBoard(eng);
  eng.state.active = 0;
  eng.state.phase = 'main';
  eng.player(0).ap = 5;
  eng.player(0).hand = [];
  eng.player(0).flags = eng.player(0).flags || {};
  eng.player(0).flags.costNext = [];
  return eng;
}

/**
 * Sucht eine Kartendefinition anhand der ID.
 */
function byId(id) {
  const c = C.find((x) => x.id === id);
  assert.ok(c, 'fehlt ' + id);
  return c;
}

// 1) Gedruckte Kosten (AP > 0) werden bezahlt
{
  const card = byId('dc_b_sofortbestellung_165'); // DRAW + COST_NEXT, ap=2
  assert.equal(Number(card.ap), 2);
  const eng = fresh();
  const p = eng.player(0);
  const inst = eng.instFromId(card.id, 0);
  p.hand.push(inst);
  assert.equal(eng.costOf(card, p), 2);
  const ap0 = p.ap;
  const r = eng.dispatch({ type: 'PLAY', player: 0, uid: inst.uid });
  assert.ok(r.ok, 'PLAY ' + (r && r.error));
  eng.state.pending = null;
  assert.equal(ap0 - p.ap, 2, 'bezahlt 2 AP');
  console.log('ok printed AP', card.id);
}

// 2) COST_NEXT-Rabatt auf Soforteinsatz (mind. 0)
{
  const discount = byId('dc_b_gesetzte_lage_879'); // ap=1, COST_NEXT Soforteinsatz
  const target = byId('dc_b_gegenzug_880'); // ap=2, BUFF_ALL_OWN, needs:false
  assert.equal(Number(target.ap), 2);
  const eng = fresh();
  const p = eng.player(0);
  p.ap = 10;
  // eigene Einheit für Buff-Effekt
  L.put(eng, 0, C.find((c) => c.typ === 'Einheit' && (c.tags || []).includes('infanterie')).id, 'C', 0);

  const dInst = eng.instFromId(discount.id, 0);
  p.hand.push(dInst);
  const r1 = eng.dispatch({ type: 'PLAY', player: 0, uid: dInst.uid });
  assert.ok(r1.ok, 'discount PLAY ' + (r1 && r1.error));
  eng.state.pending = null;
  assert.ok((p.flags.costNext || []).some((x) => x.type === 'Soforteinsatz'), 'costNext gesetzt');

  const tInst = eng.instFromId(target.id, 0);
  p.hand.push(tInst);
  const peek = eng.costOf(target, p);
  assert.equal(peek, 1, 'Peek-Rabatt 2→1');
  assert.equal((p.flags.costNext || []).length, 1, 'Peek verbraucht Rabatt nicht');
  const apBefore = p.ap;
  const r2 = eng.dispatch({ type: 'PLAY', player: 0, uid: tInst.uid });
  assert.ok(r2.ok, 'target PLAY ' + (r2 && r2.error));
  eng.state.pending = null;
  assert.equal(apBefore - p.ap, 1, 'Rabatt beim Bezahlen');
  assert.equal((p.flags.costNext || []).length, 0, 'Rabatt verbraucht');
  console.log('ok discount', discount.id, '→', target.id);
}

// 3) Unerschwinglicher Soforteinsatz nicht in listActions / nicht spielbar
{
  const card = byId('dc_b_feuerwalze_172'); // ap=4
  assert.ok(Number(card.ap) >= 3);
  const eng = fresh();
  const p = eng.player(0);
  p.ap = Number(card.ap) - 1;
  const inst = eng.instFromId(card.id, 0);
  p.hand.push(inst);
  const cost = eng.costOf(card, p);
  assert.ok(cost > p.ap);
  const plays = eng.listActions(0).filter((a) => a.type === 'PLAY' && a.uid === inst.uid);
  assert.equal(plays.length, 0, 'nicht in listActions');
  const r = eng.dispatch({ type: 'PLAY', player: 0, uid: inst.uid });
  assert.ok(!r.ok, 'PLAY muss scheitern');
  assert.ok(p.hand.some((c) => c.uid === inst.uid), 'bleibt auf der Hand');
  console.log('ok unaffordable', card.id, 'need', cost, 'have', p.ap);
}

// 4) Gedruckte 0-AP-Soforteinsätze bleiben legal kostenlos
{
  const skip = ['DEAL_DAMAGE', 'BUFF', 'HEAL', 'MARK_OBSERVED', 'CANCEL_AIR_DAMAGE', 'CLEAR_MINE', 'GHOST_RUINS', 'LAY_MINE'];
  const zero = C.find((c) => c.typ === 'Soforteinsatz' && Number(c.ap) === 0 && !(c.target && c.target.needs)
    && (c.effects || []).every((e) => !skip.includes(e.code)));
  assert.ok(zero, '0-AP Soforteinsatz');
  const eng = fresh();
  const p = eng.player(0);
  p.ap = 0;
  const inst = eng.instFromId(zero.id, 0);
  p.hand.push(inst);
  assert.equal(eng.costOf(zero, p), 0);
  const r = eng.dispatch({ type: 'PLAY', player: 0, uid: inst.uid });
  assert.ok(r.ok, '0-AP PLAY ' + zero.id + ' ' + (r && r.error));
  console.log('ok free printed-0', zero.id);
}

console.log('test_instant_ap: OK');
