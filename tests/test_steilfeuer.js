#!/usr/bin/env node
/**
 * Steilfeuer I–V: Reichweiten und Support-Angriff (RULES §7.1).
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
'use strict';
const assert = require('assert');
const L = require('../scripts/nation_pools/load_game.js');

const w = L.loadGame({ quiet: true });
const C = w.DC_CATALOG.cards;

/**
 * Filtert Kartendefinitionen nach einem Spiel-Tag.
 */
function byTag(tag) {
  return C.find((c) => (c.tags || []).includes(tag) && c.typ === 'Einheit'
    && !(c.keywords || []).includes('Fernschuss'))
    || C.find((c) => (c.tags || []).includes(tag) && c.typ === 'Einheit');
}
/**
 * Sammelt die Effektcodes einer Karte als flache Liste.
 */
function codes(c) {
  return (c.effects || []).map((e) => e.code);
}

const levels = { I: 'steilfeuer-i', II: 'steilfeuer-ii', III: 'steilfeuer-iii', IV: 'steilfeuer-iv', V: 'steilfeuer-v' };
const counts = {};
for (const [k, tag] of Object.entries(levels)) {
  counts[k] = C.filter((c) => (c.tags || []).includes(tag) && c.typ === 'Einheit').length;
}
console.log('steilfeuer counts', counts);
assert.strictEqual(counts.I, 20, 'I=20');
assert.strictEqual(counts.II, 170, 'II=170');
assert.strictEqual(counts.III, 4, 'III=4');
assert.strictEqual(counts.IV, 12, 'IV=12');
assert.strictEqual(counts.V, 5, 'V=5');
assert.strictEqual(counts.I + counts.II + counts.III + counts.IV + counts.V, 211);

// No Indirektes Feuer keyword left on Einheit artillerie
const indirekt = C.filter((c) => (c.keywords || []).includes('Indirektes Feuer'));
assert.strictEqual(indirekt.length, 0, 'no Indirektes Feuer keywords');

// II must not have ATTACK_ANY_FRONT
const iiAny = C.filter((c) => (c.tags || []).includes('steilfeuer-ii') && codes(c).includes('ATTACK_ANY_FRONT'));
assert.strictEqual(iiAny.length, 0, 'II no ANY_FRONT');

const iAny = C.filter((c) => (c.tags || []).includes('steilfeuer-i') && codes(c).includes('ATTACK_ANY_FRONT'));
assert.strictEqual(iAny.length, 0, 'I no ANY_FRONT');

const iiiAny = C.filter((c) => (c.tags || []).includes('steilfeuer-iii') && codes(c).includes('ATTACK_ANY_FRONT'));
assert.strictEqual(iiiAny.length, 0, 'III no ANY_FRONT');

for (const c of C.filter((c) => (c.tags || []).includes('steilfeuer-iv'))) {
  assert.ok(codes(c).includes('ATTACK_ANY_FRONT'), 'IV has ANY_FRONT ' + c.id);
  assert.ok(!codes(c).includes('ATTACK_SUPPORT'), 'IV no SUPPORT ' + c.id);
}
for (const c of C.filter((c) => (c.tags || []).includes('steilfeuer-v'))) {
  assert.ok(codes(c).includes('ATTACK_ANY_FRONT'), 'V ANY_FRONT ' + c.id);
  assert.ok(codes(c).includes('ATTACK_SUPPORT'), 'V SUPPORT ' + c.id);
}

const viper = C.find((c) => c.id === 'dc_eh_viper' || c.name === 'Raketenwerfer Viper');
assert.ok(viper, 'viper');
assert.ok((viper.tags || []).includes('steilfeuer-iii'), 'viper III');
assert.ok(!codes(viper).includes('ATTACK_SUPPORT'), 'viper no SUPPORT');

// Support Artilleriestellung must NOT have steilfeuer
const artStell = C.find((c) => /Artilleriestellung/i.test(c.name || ''));
if (artStell) {
  assert.ok(!(artStell.tags || []).some((t) => String(t).startsWith('steilfeuer')), 'Support no steilfeuer');
}

/**
 * Baut ein Testbrett mit den angegebenen Einheiten.
 */
function boardWith(atkId, atkSec, atkRow) {
  const eng = L.newMatch(w, 'Steinmark', 42);
  L.clearBoard(eng);
  eng.player(0).ap = 10;
  eng.state.active = 0;
  const atk = L.put(eng, 0, atkId, atkSec, atkRow);
  atk.facedown = false;
  atk.attackUsed = false;
  // fill enemy front with cheap infantry
  const inf = C.find((c) => ((c.tags || []).includes('infanterie') || c.klasse === 'Infanterie') && eng.byId[c.id]);
  assert.ok(inf, 'inf');
  const enemies = [];
  for (const sec of ['L', 'C', 'R']) {
    for (let row = 0; row < 3; row++) {
      const u = L.put(eng, 1, inf.id, sec, row);
      u.facedown = false;
      u.summonedTurn = -9;
      u.flags = u.flags || {};
      delete u.flags.noCombatUntil;
      enemies.push({ sec, row, uid: u.uid });
    }
  }
  // one support
  const supDef = C.find((c) => c.typ === 'Unterstützung' && eng.byId[c.id]) || C.find((c) => c.typ === 'Unterstützung');
  const sInst = eng.instFromId(supDef.id, 1);
  sInst.summonedTurn = -9;
  eng.player(1).support[0] = sInst;
  return { eng, atk, enemies, supportUid: sInst.uid, aLoc: { inst: atk, player: eng.player(0), zone: 'front', section: atkSec, row: atkRow } };
}

/**
 * Prüft, welche Stellungen für Steilfeuer erreichbar sind.
 */
function reachable(eng, aLoc) {
  return eng.legalAttackTargets(aLoc).filter((t) => t.zone === 'front' || !t.zone).map((t) => t.section + t.row);
}

// Range matrix: attacker at C1 (pos 5)
{
  const iCard = byTag('steilfeuer-i');
  const { eng, aLoc } = boardWith(iCard.id, 'C', 1);
  const front = eng.legalAttackTargets(aLoc).filter((t) => t.zone !== 'support');
  // range 3 → dist≤1 from pos 5 → positions 4,5,6 = C0,C1,C2
  const keys = front.map((t) => t.section + t.row).sort();
  assert.strictEqual(keys.join(','), 'C0,C1,C2', 'I range keys ' + keys.join(','));
  assert.ok(!front.some((t) => t.zone === 'support'));
  console.log('ok I range');
}
{
  const iiCard = byTag('steilfeuer-ii');
  const { eng, aLoc } = boardWith(iiCard.id, 'C', 1);
  const front = eng.legalAttackTargets(aLoc).filter((t) => t.zone !== 'support');
  // range 5 → dist≤2 → pos 3..7 = L2,C0,C1,C2,R0
  const keys = front.map((t) => t.section + t.row).sort();
  assert.strictEqual(keys.join(','), 'C0,C1,C2,L2,R0', 'II range ' + keys.join(','));
  assert.ok(!codes(iiCard).includes('ATTACK_ANY_FRONT'));
  assert.strictEqual(front.length, 5);
  console.log('ok II range + no ANY_FRONT');
}
{
  const iiiCard = byTag('steilfeuer-iii');
  const { eng, aLoc } = boardWith(iiiCard.id, 'C', 1);
  const front = eng.legalAttackTargets(aLoc).filter((t) => t.zone !== 'support');
  // range 7 → dist≤3 → pos 2..8 = L1,L2,C0,C1,C2,R0,R1
  const keys = front.map((t) => t.section + t.row).sort();
  assert.strictEqual(keys.join(','), 'C0,C1,C2,L1,L2,R0,R1', 'III range ' + keys.join(','));
  console.log('ok III range');
}
{
  const ivCard = byTag('steilfeuer-iv');
  const { eng, aLoc } = boardWith(ivCard.id, 'C', 1);
  const front = eng.legalAttackTargets(aLoc).filter((t) => t.zone !== 'support');
  assert.strictEqual(front.length, 9, 'IV whole front');
  const sup = eng.legalAttackTargets(aLoc).filter((t) => t.zone === 'support');
  assert.strictEqual(sup.length, 0, 'IV no support');
  console.log('ok IV whole front');
}
{
  const vCard = byTag('steilfeuer-v');
  const { eng, atk, aLoc, supportUid } = boardWith(vCard.id, 'C', 1);
  const all = eng.legalAttackTargets(aLoc);
  const front = all.filter((t) => t.zone !== 'support');
  const sup = all.filter((t) => t.zone === 'support');
  assert.strictEqual(front.length, 9, 'V whole front');
  assert.ok(sup.length >= 1, 'V can hit support');
  const frontCost = eng._attackCost(aLoc, front[0]);
  const supCost = eng._attackCost(aLoc, sup[0]);
  assert.strictEqual(frontCost, 1, 'V front 1 AP');
  assert.strictEqual(supCost, 3, 'V support 3 AP');
  // listActions respects AP: with 2 AP support target filtered out
  eng.player(0).ap = 2;
  const acts = eng.listActions(0).filter((a) => a.type === 'ATTACK' && a.uid === atk.uid);
  assert.ok(acts.length === 1, 'attack offered with 2 AP');
  assert.ok(acts[0].targets.every((t) => t.cost <= 2), 'only affordable targets');
  assert.ok(!acts[0].targets.some((t) => t.uid === supportUid), 'support blocked at 2 AP');
  eng.player(0).ap = 3;
  const acts3 = eng.listActions(0).filter((a) => a.type === 'ATTACK' && a.uid === atk.uid);
  assert.ok(acts3[0].targets.some((t) => t.uid === supportUid && t.cost === 3), 'support at 3 AP');
  // spend path: attack support costs 3
  const apBefore = eng.player(0).ap;
  eng.dispatch({ type: 'ATTACK', player: 0, uid: atk.uid, target: supportUid });
  assert.strictEqual(eng.player(0).ap, apBefore - 3, 'spent 3 AP on V support');
  console.log('ok V support + AP');
}

console.log('test_steilfeuer.js OK');
