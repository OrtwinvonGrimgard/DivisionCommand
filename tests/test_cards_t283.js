/**
 * t283: Kartendaten-Prüfungen.
 * 1) Jede spielbare Karte (Einheit, Unterstützung, Soforteinsatz, Ausrüstung) hat eine explizite Seltenheit.
 * 2) Keine mechanisch identischen Zwillinge (Typ, Klasse, AP, ATK, DEF, Text, Seltenheit, Effekte, Schlüsselwörter),
 *    außer den bewusst gleichen Theryn-Ausgaben neutraler Alpha-Karten (THERYN_EDITIONS).
 */
'use strict';
const assert = require('assert');
const L = require('../scripts/nation_pools/load_game.js');
const w = L.loadGame({ quiet: true });
const C = w.DC_CATALOG.cards.filter((c) => c.status === 'live' || !c.status);
const PLAY = ['Einheit', 'Unterstützung', 'Soforteinsatz', 'Ausrüstung'];
const noRarity = C.filter((c) => PLAY.includes(c.typ) && !c.rarity).map((c) => c.id);
assert.strictEqual(noRarity.length, 0, 'Karten ohne Seltenheit: ' + noRarity.join(', '));
/** @param {object} c Karte @returns {string} mechanischer Schlüssel */
const mech = (c) => [c.typ, c.klasse || '', c.ap, c.atk, c.def, (c.text || '').trim(), c.rarity || '',
  JSON.stringify((c.effects || []).map((e) => [e.code, e.param])), JSON.stringify(c.keywords || [])].join('|');
const g = {};
C.forEach((c) => { (g[mech(c)] = g[mech(c)] || []).push(c); });
// Bewusst gleiche Theryn-Ausgaben neutraler Alpha-Karten (Theryn als Infanterienation führt sie im Nationsset).
const THERYN_EDITIONS = ['dc_su_sammelpunkt', 'dc_so_marschbefehl'];
const bad = Object.values(g).filter((v) => v.length > 1 && !v.some((c) => THERYN_EDITIONS.includes(c.id)));
assert.strictEqual(bad.length, 0, 'mechanische Zwillinge: ' + bad.map((v) => v.map((c) => c.id).join('=')).join('; '));
console.log('test_cards_t283 OK: Seltenheit vollständig, keine mechanischen Zwillinge (' + C.length + ' Karten)');
