/**
 * Regression: Balance-Pass t237 (Doktrinwerte, Starterdeck-Tausche, Wertband).
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
'use strict';
/* Balance-Pass t237: Doktrinwerte, Starterdeck-Tausch, Poolwerte (siehe docs/balance/BALANCE_T237.md). */
const assert = require('assert');
const L = require('../scripts/nation_pools/load_game.js');
const w = L.loadGame({ quiet: true });
const C = w.DC_CATALOG.cards, by = (id) => C.find((c) => c.id === id);
/**
 * Liest die Effektliste einer Karte bzw. Instanz.
 */
const fx = (id) => by(id).effects[0].param;
assert.strictEqual(fx('dc_dok_materialersatz').if, 'after-loss');
assert.strictEqual(fx('dc_dok_abnutzung').on_destroy_in_section.heal, 1);
assert.strictEqual(fx('dc_dok_zielangriff').vs_damaged_atk, 2);
assert.strictEqual(fx('dc_dok_abschluss').atk, 2);
// Materialersatz greift erst nach eigenem Panzer-/Artillerieverlust
const d = w.DC_NATION_DECKS.Vael, eng = new w.DCEngine.Engine(w.DC_CATALOG, { seed: 3 });
eng.createMatch({ seed: 3, mode: 'hotseat', startPlayer: 0, deck0: d.cards.slice(), deck1: d.cards.slice(), doctrine0: ['dc_dok_materialersatz', 'dc_dok_feuerwalze'], doctrine1: [], name0: 'A', name1: 'B' });
const p = eng.player(0), tank = C.find((c) => c.typ === 'Einheit' && c.klasse === 'Panzer' && c.ap >= 3);
const before = eng.costOf(tank, p);
assert.strictEqual(before, tank.ap, 'ohne Verlust kein Rabatt');
p.grave = (p.grave || []).concat([eng.instFromId(tank.id, 0)]);
assert.strictEqual(eng.costOf(tank, p), tank.ap - 1, 'nach Verlust −1 AP');
// Starterdecks: 60 Karten, eigene Nation, legal; Tauschkarten vorhanden
const swaps = { Theryn: 'dc_np_theryn_bannertraeger', Ossaria: 'dc_np_ossaria_totenwallpanzer', Namar: 'dc_np_namar_hafenkran_haken' };
for (const [n, id] of Object.entries(swaps)) assert(w.DC_NATION_DECKS[n].cards.includes(id), n + ' Tausch ' + id);
for (const [n, d] of Object.entries(w.DC_NATION_DECKS)) {
  assert.strictEqual(d.cards.length, 60); assert(w.DC_validateDeck(d.cards, d.doktrinen).ok, n + ' legal');
  assert(d.cards.every((id) => by(id).nation === n), n + ' nur eigene Nation');
}
// Werte bleiben im Band Median ±2 je AP-Stufe
const med = { 1: 3, 2: 4, 3: 6, 4: 7, 5: 9, 6: 12 };
C.filter((c) => c.typ === 'Einheit').forEach((c) => assert(Math.abs(c.atk + c.def - med[c.ap]) <= 2, c.id + ' Wertband'));
assert.strictEqual(by('dc_np_ossaria_totenwallpanzer').def, 5); // t255: 3/6 → 3/5 (Ossaria-Ausgleich)
console.log('PASS balance t237: 4 Doktrinen, 32 Starterdeck-Tausche, Wertband ±2, Materialersatz nach Verlust');
