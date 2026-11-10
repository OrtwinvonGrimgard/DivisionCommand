'use strict';
/* Balance-Pass t238: realistischer Mischdeck-Generator, Caldris-/Namar-Poolwerte, SCHADEN_MINUS n (docs/balance/BALANCE_T238.md). */
const assert = require('assert');
const L = require('../scripts/nation_pools/load_game.js');
const M = require('../scripts/nation_pools/mixed_deck.js');
const w = L.loadGame({ quiet: true });
const C = w.DC_CATALOG.cards, by = (id) => C.find((c) => c.id === id);
// Generator: 60 Karten, Quoten echter Decks, legal, Hälfte Pool, deterministisch je Seed
for (const n of Object.keys(w.DC_NATION_DECKS)) {
  const d = M.buildMixedDeck(w, n, 42), t = {};
  d.cards.forEach((id) => { t[by(id).typ] = (t[by(id).typ] || 0) + 1; });
  assert.strictEqual(d.cards.length, 60, n);
  for (const [typ, [total]] of Object.entries(M.QUOTA)) assert.strictEqual(t[typ], total, n + ' ' + typ);
  assert(w.DC_validateDeck(d.cards, d.doctrines).ok, n + ' legal');
  assert(d.cards.every((id) => by(id).nation === n), n + ' eigene Nation');
  assert.strictEqual(d.cards.filter((id) => by(id).set === 'set_nation_pool').length >= 30, true, n + ' Pool-Hälfte');
  assert.strictEqual(JSON.stringify(M.buildMixedDeck(w, n, 42).cards), JSON.stringify(d.cards), n + ' deterministisch');
}
assert.notStrictEqual(JSON.stringify(M.buildMixedDeck(w, 'Caldris', 1).cards), JSON.stringify(M.buildMixedDeck(w, 'Caldris', 2).cards), 'Seed variiert');
// Werte alt → neu
const exp = {
  dc_np_caldris_schildwall_zug: [2, 1, 3], dc_np_caldris_etappenwache: [2, 1, 2], dc_np_caldris_schildwagen: [4, 3, 4],
  dc_np_caldris_bergepanzer_caldris: [3, 2, 4], dc_np_caldris_defensivbatterie: [4, 3, 3], dc_np_caldris_etappenbeobachter: [2, 2, 1],
  dc_np_caldris_genesene_kompanie: [3, 3, 3], dc_np_caldris_schildgarde: [4, 3, 4], dc_np_caldris_panzerschild_caldris: [5, 4, 7],
};
for (const [id, [ap, atk, def]] of Object.entries(exp)) { const c = by(id); assert.deepStrictEqual([c.ap, c.atk, c.def], [ap, atk, def], id); }
assert.strictEqual(by('dc_np_caldris_feldklinik').ap, 4);
assert.strictEqual(by('dc_np_caldris_genesene_zurueck_an_die_front').ap, 2);
assert.strictEqual(by('dc_np_caldris_schildplatte').ap, 2);
assert.strictEqual(by('dc_np_namar_kaipanzerung').ap, 2);
assert.strictEqual(by('dc_np_caldris_vollschutzweste').effects[0].param.def, 2);
assert.strictEqual(by('dc_np_caldris_ruhe_vor_dem_schlag').effects[0].param.def, 0);
// SCHADEN_MINUS: Panzerschild Caldris −1, ohne Parameter weiter −2
const ps = by('dc_np_caldris_panzerschild_caldris');
assert.strictEqual(ps.effects[0].param.n, 1);
assert(/−1\./.test(ps.text), 'Text −1');
const eng = L.newMatch(w, 'Caldris', 5);
const owner = eng.player(eng.state.active);
['L', 'C', 'R'].forEach((s) => [0, 1, 2].forEach((r) => { owner.front[s][r] = null; }));
const u = eng.instFromId(ps.id, owner.id); owner.front.C[0] = u;
eng._damage(u, 3, {});
assert.strictEqual(u.def, 5, '3 Schaden −1 → DEF 7 → 5');
C.filter((c) => (c.effects || []).some((e) => e.code === 'SCHADEN_MINUS') && c.id !== ps.id).forEach((c) => {
  const p = c.effects.find((e) => e.code === 'SCHADEN_MINUS').param; assert(!p || p.n == null || p.n === 2, c.id + ' bleibt −2');
});
console.log('PASS balance t238: Mischdeck-Generator (30/10/8/12, legal, Seed), 15 Werte alt→neu, SCHADEN_MINUS n');
