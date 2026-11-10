'use strict';
/*
 * Realistischer gemischter Testdeck-Generator (t238).
 * Ersetzt das alte Konstrukt „30 Starter + pool.slice(0,30)“ (≈ 51 Einheiten, kaum Ausrüstung).
 * 60 Karten nach den Quoten echter Decks: 30 Einheiten, 10 Ausrüstung, 8 Unterstützung, 12 Soforteinsätze
 * (Mittel der 16 Starterdecks). Je Typ ~die Hälfte aus dem Nationenpool, der Rest aus dem Starterdeck.
 * Zufallsauswahl mit Seed, damit über viele Partien der ganze Pool gemessen wird. Singletons, eigene Doktrinen.
 */
const QUOTA = { 'Einheit': [30, 15], 'Ausrüstung': [10, 5], 'Unterstützung': [8, 3], 'Soforteinsatz': [12, 7] };

function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function hash(s) { let h = 2166136261; for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return h >>> 0; }
function shuffle(arr, r) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

function buildMixedDeck(w, nation, seed) {
  const C = w.DC_CATALOG.cards, by = {};
  C.forEach((c) => { by[c.id] = c; });
  const starter = w.DC_NATION_DECKS[nation];
  const r = rng((seed >>> 0) ^ hash(nation));
  const pool = C.filter((c) => c.nation === nation && c.set === 'set_nation_pool');
  const own = C.filter((c) => c.nation === nation && c.typ !== 'Doktrin');
  const used = new Set(), out = [];
  const take = (list, n) => { let k = 0; for (const id of list) { if (k >= n) break; if (used.has(id)) continue; used.add(id); out.push(id); k++; } return k; };
  for (const [typ, [total, fromPool]] of Object.entries(QUOTA)) {
    let got = take(shuffle(pool.filter((c) => c.typ === typ).map((c) => c.id), r), fromPool);
    got += take(shuffle(starter.cards.filter((id) => by[id] && by[id].typ === typ), r), total - got);
    if (got < total) take(shuffle(own.filter((c) => c.typ === typ).map((c) => c.id), r), total - got);
  }
  if (out.length < 60) take(shuffle(starter.cards, r), 60 - out.length);
  return { cards: out, doctrines: starter.doktrinen.slice() };
}

module.exports = { buildMixedDeck, QUOTA };
