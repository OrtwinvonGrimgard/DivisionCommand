#!/usr/bin/env node
'use strict';
/* Phase 2 (t212): Flächentext ≤120 Zeichen je ID; jede gekürzte Karte steht mit wortgleichem Volltext in
   docs/regeln/KARTEN_SONDERFAELLE.md; Volltext bleibt im Datenfeld `text` (Detailansicht). */
const assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const L = require('../scripts/nation_pools/load_game.js'); const w = L.loadGame({ quiet: true });
const K = JSON.parse(fs.readFileSync(path.join(__dirname, '../scripts/cards-review/kurz.json'), 'utf8'));
const doc = fs.readFileSync(path.join(L.WEB, '..', 'docs/regeln/KARTEN_SONDERFAELLE.md'), 'utf8');
const C = w.DC_CATALOG.cards; let cut = 0;
assert.equal(Object.keys(K).length, C.length, 'Flächentext für jede ID');
C.forEach((c) => {
  const k = K[c.id]; assert(k, c.id + ' ohne Flächentext');
  assert(k.kurz.length <= 120, c.id + ' Flächentext zu lang: ' + k.kurz.length);
  const full = (c.text || '').trim();
  if (k.kurz !== full) {
    cut++;
    const sec = doc.split('\n## `' + c.id + '`')[1]; assert(sec, c.id + ' fehlt in KARTEN_SONDERFAELLE.md');
    const body = sec.split('\n## `')[0];
    assert(body.includes('> ' + full.replace(/\n/g, '\n> ')), c.id + ' Volltext nicht wortgleich in den Docs');
  }
});
console.log('PASS card faces text: ' + C.length + ' IDs, ' + cut + ' gekürzt und verlustfrei dokumentiert');
