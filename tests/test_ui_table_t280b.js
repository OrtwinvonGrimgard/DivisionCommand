#!/usr/bin/env node
/**
 * t280 Stufe 2: Tisch im Designsystem, Kartenansicht, Rückfragen, Tutorial-Box.
 * Prüft Einbindung (Reihenfolge, Offline-Cache, Grafikgrößen), dass ui-table.css nur Optik setzt
 * (keine Maße im flachen Raster), sowie das Verhalten der großen Kartenansicht (Knöpfe, Esc).
 * Pixelprüfung: `npm run screens-test` und `npm run layout-test`.
 */
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const L = require('../scripts/nation_pools/load_game.js');

const WEB = L.WEB;
const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
const sw = fs.readFileSync(path.join(WEB, 'sw.js'), 'utf8');
const css = fs.readFileSync(path.join(WEB, 'css/ui-table.css'), 'utf8');

// Reihenfolge: ui-table.css nach ui-screens.css, table-hud.css bleibt das letzte Stylesheet
const links = [...html.matchAll(/<link rel="stylesheet" href="([^"?]+)/g)].map((m) => m[1]);
assert(links.indexOf('css/ui-screens.css') < links.indexOf('css/ui-table.css'), 'ui-table nach ui-screens');
assert(links.indexOf('css/ui-table.css') < links.indexOf('css/table-hud.css'), 'table-hud bleibt zuletzt');
assert.equal(links[links.length - 1], 'css/table-hud.css');
assert(sw.includes("'divcmd-alpha43a'") && html.includes('app.js?v=alpha43a'), 'Cache alpha43a');

/** Bildgröße aus einem WebP-Kopf. */
function webpSize(buf) {
  assert.equal(buf.toString('ascii', 8, 12), 'WEBP');
  const kind = buf.toString('ascii', 12, 16);
  if (kind === 'VP8 ') return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
  if (kind === 'VP8L') { const b = buf.readUInt32LE(21); return [(b & 0x3fff) + 1, ((b >> 14) & 0x3fff) + 1]; }
  return [1 + buf.readUIntLE(24, 3), 1 + buf.readUIntLE(27, 3)];
}
for (const [rel, dim] of Object.entries({ 'assets/ui/table-felt.webp': [1280, 720], 'assets/ui/hand-leather.webp': [960, 540] })) {
  const buf = fs.readFileSync(path.join(WEB, rel));
  assert(buf.length < 120 * 1024, rel + ' klein genug');
  assert.deepEqual(webpSize(buf), dim, rel);
  assert(sw.includes("'./" + rel + "'"), rel + ' im Offline-Cache');
}
for (const rel of ['css/ui-table.css', 'assets/ui/corner-tr.svg', 'assets/ui/corner-bl.svg', 'assets/ui/corner-br.svg']) {
  assert(fs.existsSync(path.join(WEB, rel)), rel);
  assert(sw.includes("'./" + rel + "'"), rel + ' im Offline-Cache');
}
// Bilder nie gestreckt: jede url() auf ein Bild steht mit cover, fester Größe oder Kachelung
for (const m of css.matchAll(/url\('([^']+\.webp)'\)([^,;]*)/g)) {
  assert(!/100% 100%|\bfill\b/.test(m[2]), 'nicht gestreckt: ' + m[1]);
}
// Nur Optik im flachen Raster: keine Höhen/Breiten/Zeilen für Felder, Hand oder Spalten
const geo = /(?:^|[;{\s])(height|grid-template-rows|grid-row|top|bottom|inset)\s*:/;
const blocks = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
for (const [, sel, body] of blocks) {
  if (/@keyframes|^\s*(0%|50%|100%|from|to)/.test(sel)) continue;
  if (/\.(slot|hand-dock|nml-band|table-main|table)(?![\w-])|#hand(?![\w-])/.test(sel)) assert(!geo.test(body), 'keine Geometrie in ' + sel.trim());
}
assert(/\.hud-more:not\(\[open\]\) > \.actions \{ display: none/.test(css), 'zugeklappte Befehle ohne Geisterknöpfe');
assert(/\.tut-title \{ width: fit-content; max-width: calc\(100% - 150px\)/.test(css), 'Tutorial-Titel hält Abstand zum Überspringen-Knopf');
const scr = fs.readFileSync(path.join(WEB, 'css/ui-screens.css'), 'utf8');
assert(/\.lib-tag-panel\.open-right \{ left: 0 !important; right: auto !important; \}/.test(scr), 'Tag-Auswahl kann nach rechts aufklappen');
assert(/function placeTagPanel/.test(fs.readFileSync(path.join(WEB, 'js/ui/library.js'), 'utf8')), 'Tag-Auswahl wird am Knopf ausgerichtet');

// Große Kartenansicht: „Zum Deck hinzufügen“ ist Hauptaktion, Esc schließt nur die Ansicht
const dom = new JSDOM(html, { url: 'http://localhost/', runScripts: 'outside-only' });
const w = dom.window;
const G = L.loadGame({ quiet: true });
w.DC_CATALOG = G.DC_CATALOG; w.DC_NATION_DECKS = G.DC_NATION_DECKS; w.DC_IMAGES = {};
w.dcCardImage = (c) => (c && c.id ? 'faces-v2/' + c.id + '.webp' : '');
w.localStorage = { _m: {}, getItem(k) { return this._m[k] || null; }, setItem(k, v) { this._m[k] = String(v); }, removeItem(k) { delete this._m[k]; } };
w.eval(fs.readFileSync(path.join(WEB, 'js/ui/library.js'), 'utf8'));
w.eval(fs.readFileSync(path.join(WEB, 'js/ui/ui-screens.js'), 'utf8'));
w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
w.DCLib.render();
const doc = w.document;
const id = doc.querySelector('#lib-list .lib-card[data-add]').getAttribute('data-add');
w.DCLib.zoom(id);
const ov = doc.getElementById('lib-zoom');
assert.equal(ov.style.display, 'flex', 'Ansicht offen');
const add = ov.querySelector('[data-lib-add]'), back = ov.querySelector('[data-lib-back]');
assert(add.classList.contains('primary') && !add.disabled, 'Hinzufügen ist Hauptaktion');
assert(back.disabled && back.textContent === 'Aus dem Deck nehmen', 'Zurücklegen erst mit Karte im Deck');
assert(!ov.querySelector('[data-lib-close]').classList.contains('primary'), 'Schließen ist Nebenaktion');
add.click();
assert(!doc.getElementById('lib-zoom').querySelector('[data-lib-back]').disabled, 'nach Hinzufügen zurücklegbar');
assert(/1 im Deck/.test(doc.getElementById('lib-zoom').textContent));
let left = 0;
doc.getElementById('work-root').classList.add('open');
const lib = doc.getElementById('scr-library'); lib.classList.add('on');
const libBack = lib.querySelector('.back');
if (libBack) { libBack.addEventListener('click', () => left++); Object.defineProperty(libBack, 'offsetParent', { get: () => lib }); }
ov.getClientRects = () => [{}];
doc.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
assert.equal(ov.style.display, 'none', 'Esc schließt die Kartenansicht');
assert.equal(left, 0, 'Esc verlässt die Bibliothek nicht gleichzeitig');
// Rückfrage „Spielstand zurücksetzen“ zählt als offener Dialog (Esc gehört dem Dialog)
assert(/#dc-reset,/.test(fs.readFileSync(path.join(WEB, 'js/ui/ui-screens.js'), 'utf8')));

console.log('PASS ui table t280b: Stylesheet-Reihenfolge, 2 Tischgrafiken + 3 Ecken im Cache, nur Optik im Raster, Geisterknöpfe weg, Tutorial-Titel frei, Tag-Auswahl, Kartenansicht (Hauptaktion, Esc), Reset-Dialog');
