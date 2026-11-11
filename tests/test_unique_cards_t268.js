'use strict';
/**
 * t268: Kein Kartenpaar (ohne Token) darf in Typ, Klasse, AP, ATK, DEF, Tags, Schlüsselwörtern
 * und Text bzw. Effektliste übereinstimmen; Kartennamen sind eindeutig.
 */
const assert = require('assert');
const { loadGame } = require('../scripts/nation_pools/load_game.js');
const C = loadGame({ quiet: true }).DC_CATALOG.cards.filter((c) => c.typ !== 'Token');

/**
 * Gruppiert Karten nach Schlüssel und liefert nur Gruppen mit mehr als einer Karte.
 * @param {(c: object) => string} key Schlüsselfunktion
 * @returns {object[][]} doppelte Gruppen
 */
function dups(key) {
  const m = new Map();
  for (const c of C) { const k = key(c); if (!m.has(k)) m.set(k, []); m.get(k).push(c); }
  return [...m.values()].filter((a) => a.length > 1);
}
const stat = (c) => [c.typ, c.klasse, c.ap, c.atk, c.def, (c.tags || []).slice().sort().join(','), (c.keywords || []).slice().sort().join('+')].join('|');
const show = (g) => g.slice(0, 5).map((a) => a.map((c) => c.id).join('=')).join('; ');
const full = dups((c) => stat(c) + '#' + String(c.text || '').trim());
assert.strictEqual(full.length, 0, 'gleiche Werte und gleicher Text: ' + show(full));
const fx = dups((c) => stat(c) + '#' + JSON.stringify(c.effects || []));
assert.strictEqual(fx.length, 0, 'gleiche Werte und gleiche Effekte: ' + show(fx));
const names = dups((c) => c.name);
assert.strictEqual(names.length, 0, 'doppelte Namen: ' + show(names));
console.log('PASS unique cards t268: ' + C.length + ' Karten ohne Funktionsduplikat, Namen eindeutig');
