#!/usr/bin/env node
/**
 * Regression: frühe Balance-Fälle (Siegel, Normgewehr, Rabatte).
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
'use strict';
const assert = require('node:assert/strict');
const L = require('../scripts/nation_pools/load_game.js');
const w = L.loadGame({ quiet: true });
const C = w.DC_CATALOG.cards;
/**
 * Sucht eine Kartendefinition anhand der ID im geladenen Katalog.
 */
const by = (id) => { const c = C.find((x) => x.id === id); assert.ok(c, id); return c; };

const expect = {
  dc_eh_hammer: { ap: 5, atk: 6, def: 5 },
  dc_b_werkrott_kolonne_614: { ap: 4, atk: 3, def: 5 },
  dc_b_strassenriegel_491: { ap: 3, atk: 2, def: 4 }, // t255: 2/5 → 2/4 (Namar-Ausgleich)
  dc_b_werkbach_riegel_430: { ap: 3, atk: 2, def: 5 },
  dc_eh_faustkeil: { ap: 5, atk: 6, def: 5 }, // t283: AP-6+ spielbar (max. 5 AP)
  dc_eh_haubitze: { ap: 4, atk: 5, def: 4 },
  dc_eh_koloss: { ap: 5, atk: 6, def: 5 }, // t283
};
for (const [id, e] of Object.entries(expect)) {
  const c = by(id);
  assert.equal(c.ap, e.ap, id + ' ap');
  assert.equal(c.atk, e.atk, id + ' atk');
  assert.equal(c.def, e.def, id + ' def');
}
console.log('ok outlier stats');

// stacking discounts unchanged
for (const id of ['dc_su_lager', 'dc_b_implantatlager_388', 'dc_b_feldschmied_270']) {
  const c = by(id);
  assert.ok((c.effects || []).some((e) => e.code === 'EQUIP_DISCOUNT'), id + ' EQUIP_DISCOUNT');
}
console.log('ok stacking discounts');

/**
 * Erzeugt eine frische Test-Engine bzw. Partie in bekanntem Ausgangszustand.
 */
function fresh() {
  const eng = L.newMatch(w, 'Steinmark', 21);
  L.clearBoard(eng);
  eng.state.active = 0; eng.state.phase = 'main';
  eng.player(0).ap = 10; eng.player(0).hand = [];
  return eng;
}

// Siegel: full AP without support, −1 with support
{
  const card = by('dc_b_schwarzes_siegel_891');
  assert.equal(card.ap, 1);
  const eng = fresh();
  const p = eng.player(0);
  // need a host unit to equip
  const host = L.put(eng, 0, C.find((c) => c.typ === 'Einheit' && (c.tags || []).includes('infanterie')).id, 'C', 0);
  assert.equal(eng.costOf(card, p), 1, 'ohne Support voll');
  const sup = C.find((c) => c.typ === 'Unterstützung' && c.set !== 'test');
  const sInst = eng.instFromId(sup.id, 0);
  p.support[0] = sInst;
  assert.equal(eng.costOf(card, p), 0, 'mit Support rabattiert');
  const inst = eng.instFromId(card.id, 0); p.hand.push(inst);
  const ap0 = p.ap;
  assert.ok(eng.dispatch({ type: 'PLAY', player: 0, uid: inst.uid }).ok);
  assert.ok(eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: host.uid }).ok);
  assert.equal(ap0 - p.ap, 0, 'bezahlt 0 mit Support');
  console.log('ok siegel conditional');
}

// Normgewehr: rabatt only with infantry
{
  const card = by('dc_b_normgewehr_595');
  assert.equal(card.ap, 1);
  const eng = fresh();
  const p = eng.player(0);
  const pz = C.find((c) => c.typ === 'Einheit' && (c.tags || []).includes('panzer'));
  const host = L.put(eng, 0, pz.id, 'C', 0);
  assert.equal(eng.costOf(card, p), 1, 'ohne Infanterie voll');
  const inf = C.find((c) => c.typ === 'Einheit' && (c.tags || []).includes('infanterie'));
  L.put(eng, 0, inf.id, 'L', 0);
  assert.equal(eng.costOf(card, p), 0, 'mit Infanterie rabattiert');
  console.log('ok normgewehr conditional');
}

// Etappenplatte printed 2
assert.equal(by('dc_b_etappenplatte_217').ap, 2);
assert.equal(by('dc_b_wartezettel_219').ap, 1);
assert.equal(by('dc_b_dienstbuch_592').ap, 1);

console.log('test_balance_t231: OK');
