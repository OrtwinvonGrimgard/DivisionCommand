/**
 * t283: Mulligan (RULES §23.4) und vollständige Deckprüfung 60 + 2 (RULES §24, `DC_checkDeckForMatch`).
 * Läuft über `npm test`. Keine Produktlogik.
 */
'use strict';
const assert = require('node:assert/strict');
const L = require('../scripts/nation_pools/load_game.js');
const w = L.loadGame({ quiet: true });

// --- Mulligan: Startspieler im ersten Zug ---
const eng = L.newMatch(w, 'Steinmark', 21);
const a = eng.state.active;
const p = eng.state.players[a];
const before = p.hand.map((c) => c.uid).join(',');
const total = p.hand.length + p.deck.length;
const ap0 = p.ap;
const drawEv0 = (eng.state.events || []).filter((e) => e.kind === 'draw').length;
assert.equal(eng.canMulligan(a), true, 'Startspieler darf im ersten Zug');
assert.equal(eng.canMulligan(1 - a), false, 'Gegner nicht am Zug');
let r = eng.dispatch({ type: 'MULLIGAN', player: a });
assert.equal(r.ok, true, 'Mulligan ok: ' + r.error);
assert.equal(p.ap, ap0 - 1, 'kostet 1 AP');
assert.equal(p.hand.length, eng.rules.hand_start, 'neue Starthand');
assert.equal(p.hand.length + p.deck.length, total, 'keine Karte verloren');
assert.notEqual(p.hand.map((c) => c.uid).join(','), before, 'Hand neu gezogen');
assert.equal(eng.canMulligan(a), false, 'nur einmal je Partie');
assert.equal(eng.dispatch({ type: 'MULLIGAN', player: a }).ok, false, 'zweiter Mulligan abgelehnt');
assert.equal(eng.state.events.filter((e) => e.kind === 'draw').length, drawEv0, 'keine Einzel-Ziehereignisse'); assert(eng.log.some((l) => /Mulligan/.test(typeof l === 'string' ? l : l.msg || l.text || JSON.stringify(l))), 'Protokollzeile');

// --- Nach einer anderen Aktion kein Mulligan mehr; zweiter Spieler darf in seinem ersten Zug ---
const e2 = L.newMatch(w, 'Vael', 22);
const s2 = e2.state.active;
e2.dispatch({ type: 'END_TURN', player: s2 });
const o = 1 - s2;
assert.equal(e2.state.active, o);
assert.equal(e2.state.turn, 2);
assert.equal(e2.canMulligan(o), true, 'zweiter Spieler in seinem ersten Zug');
assert.equal(e2.canMulligan(s2), false, 'Startspieler hat seinen ersten Zug ohne Mulligan beendet');
e2.dispatch({ type: 'PROPOSE_PEACE', player: o });
assert.equal(e2.canMulligan(o), true, 'Friedensangebot schließt den Mulligan nicht');
e2.dispatch({ type: 'END_TURN', player: o });
assert.equal(e2.canMulligan(o), false, 'nach dem ersten Zug vorbei');
e2.dispatch({ type: 'END_TURN', player: s2 });
assert.equal(e2.dispatch({ type: 'MULLIGAN', player: o }).ok, false, 'ab Zug 3 abgelehnt');

// --- Regel abschaltbar ---
const e3 = L.newMatch(w, 'Karsk', 23);
e3.rules.mulligan = false;
assert.equal(e3.canMulligan(e3.state.active), false, 'mulligan:false sperrt');

// --- Deckprüfung 60 + 2 ---
const D = w.DC_NATION_DECKS.Steinmark;
let v = w.DC_checkDeckForMatch(D.cards, D.doktrinen);
assert.equal(v.ok, true, 'Starterdeck 60 + 2 gültig: ' + v.notices.join('; '));
v = w.DC_checkDeckForMatch(D.cards.slice(0, 59), D.doktrinen);
assert.equal(v.ok, false); assert(v.notices.some((n) => /59 Karten/.test(n)), '59 Karten abgelehnt');
v = w.DC_checkDeckForMatch(D.cards.concat([D.cards[0]]), D.doktrinen);
assert.equal(v.ok, false, '61 Karten abgelehnt');
v = w.DC_checkDeckForMatch(D.cards, D.doktrinen.slice(0, 1));
assert.equal(v.ok, false); assert(v.notices.some((n) => /Doktrinen/.test(n)), '1 Doktrin abgelehnt');
v = w.DC_checkDeckForMatch(D.cards, [D.doktrinen[0], D.doktrinen[0]]);
assert.equal(v.ok, false, 'gleiche Doktrin doppelt abgelehnt');
const gold = w.DC_CATALOG.cards.find((c) => c.rarity === 'gold' && c.typ === 'Einheit');
v = w.DC_checkDeckForMatch(D.cards.slice(0, 58).concat([gold.id, gold.id]), D.doktrinen);
assert.equal(v.ok, false, 'Gold 2× abgelehnt');
// Zufallsdeck der Partie-UI hat volle Größe
const rnd = (() => { let x = 7; return () => ((x = (x * 16807) % 2147483647) / 2147483647); })();
const td = w.DCEngine.buildTestDeck(w.DC_CATALOG, rnd, null, 60);
assert.equal(td.length, 60, 'Testdeck 60');
assert.equal(w.DC_validateDeck(td, []).ok, true, 'Testdeck legal');
assert.equal(w.DCEngine.buildTestDeck(w.DC_CATALOG, rnd).length, 40, 'Standard 40 unverändert (Bots/Tests)');

console.log('PASS mulligan t283: 1 AP, neue Starthand, einmal, nur vor erster Aktion im ersten Zug, abschaltbar; Deckprüfung 60 + 2, Doktrinen, Gold; Testdeck 60');
