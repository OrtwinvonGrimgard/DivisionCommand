/** Karten liegen jetzt unter js/data/sets/alpha/ nach Typ.
 *  catalog.js setzt DC_CATALOG.cards aus DC_SET_ALPHA zusammen.
 *  Diese Datei bleibt als Hinweis, damit alte Includes nicht still scheitern. */
if (!window.DC_CATALOG || !window.DC_CATALOG.cards || !window.DC_CATALOG.cards.length) {
  console.warn('DC_CATALOG leer — sets/alpha/*.js und catalog.js laden.');
}
