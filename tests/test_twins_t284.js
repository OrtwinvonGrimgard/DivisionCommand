/**
 * t284: Zwillingsprüfung. Keine zwei spielbaren Karten dürfen in Typ, Klasse, AP, ATK, DEF und gedrucktem
 * Regeltext übereinstimmen. Gedruckt sind Kartentext und Schlüsselwörter (die Vorderseite zeigt sie als Chips
 * bzw. mit Erinnerungstext, siehe scripts/graphics/face.py). Erwartet: 0 Gruppen.
 * Zusätzlich wird gemeldet, wie viele Gruppen nur durch Schlüsselwörter getrennt sind (Information).
 */
'use strict';
const assert = require('assert');
const L = require('../scripts/nation_pools/load_game.js');
const C = L.loadGame({ quiet: true }).DC_CATALOG.cards.filter((c) => (c.status === 'live' || !c.status) && c.typ !== 'Token' && c.typ !== 'Doktrin');
/** @param {object} c @param {boolean} kw Schlüsselwörter einbeziehen @returns {string} */
const key = (c, kw) => [c.typ, c.klasse || '', c.ap, c.atk, c.def, String(c.text || '').trim(), kw ? (c.keywords || []).slice().sort().join('+') : ''].join('|');
/** @param {boolean} kw @returns {object[][]} */
function groups(kw) { const m = new Map(); C.forEach((c) => { const k = key(c, kw); if (!m.has(k)) m.set(k, []); m.get(k).push(c); }); return [...m.values()].filter((g) => g.length > 1); }
const full = groups(true);
assert.strictEqual(full.length, 0, 'Zwillinge: ' + full.slice(0, 5).map((g) => g.map((c) => c.id).join('=')).join('; '));
const textOnly = groups(false);
console.log('PASS twins t284: 0 Zwillingsgruppen (' + C.length + ' Karten); nur über Schlüsselwörter getrennt: ' + textOnly.length + ' Gruppen');
