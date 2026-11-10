/** Karten liegen unter js/data/sets/types/ nach Einheitentyp.
 *  catalog.js setzt DC_CATALOG.cards aus DC_SET_TYPES zusammen.
 *  Nation bleibt nur als Felddaten für Deck-Verknüpfung (decks.js / nationen.js). */
if (!window.DC_CATALOG || !window.DC_CATALOG.cards || !window.DC_CATALOG.cards.length) {
  console.warn('DC_CATALOG leer — sets/types/*.js und catalog.js laden.');
}
