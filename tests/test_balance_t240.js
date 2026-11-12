/**
 * Regression: Caldris zweiter Balance-Schritt und Version 0.6b (t240).
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
'use strict';
/* Balance-Pass t240 (0.6b): Caldris zweiter Schritt (docs/balance/BALANCE_T240.md). */
const assert = require('assert');
const L = require('../scripts/nation_pools/load_game.js');
const w = L.loadGame({ quiet: true });
/**
 * Sucht eine Kartendefinition anhand der ID im geladenen Katalog.
 */
const by = (id) => w.DC_CATALOG.cards.find((c) => c.id === id);
assert.deepStrictEqual([by('dc_np_caldris_schildtraeger').atk, by('dc_np_caldris_schildtraeger').def], [2, 3]);
assert.deepStrictEqual([by('dc_np_caldris_sanitaetspanzer').atk, by('dc_np_caldris_sanitaetspanzer').def], [2, 3]);
assert.deepStrictEqual([by('dc_np_caldris_oberste_fuersorge').atk, by('dc_np_caldris_oberste_fuersorge').def], [4, 5]);
assert.strictEqual(by('dc_np_caldris_schild_heben').effects[0].param.def, 1);
assert(/\+1 DEF/.test(by('dc_np_caldris_schild_heben').text));
assert.strictEqual(by('dc_np_caldris_schutzschild_leicht').effects[0].param.def, 1);
assert.strictEqual(by('dc_np_caldris_schutzschild_leicht').text, 'Träger +1 DEF.');
const d = w.DC_NATION_DECKS.Caldris;
['schildtraeger', 'sanitaetspanzer', 'oberste_fuersorge', 'schild_heben', 'schutzschild_leicht'].forEach((k) => assert(!d.cards.includes('dc_np_caldris_' + k), 'nicht im Starterdeck: ' + k));
const fs = require('fs'); const path = require('path');
const R = path.join(__dirname, '..', 'Division_Command');
assert(/DC_VERSION = '0\.6c'/.test(fs.readFileSync(path.join(R, 'web/js/version.js'), 'utf8')));
assert.strictEqual(fs.readFileSync(path.join(R, 'VERSION'), 'utf8').trim().split(/\s/)[0].replace(/^v/, ''), '0.6c'); // t283: Version 0.6c
console.log('PASS balance t240: 5 Caldris-Poolkarten −1 DEF, Starterdeck unberührt, Version (aktuell 0.6c)');
