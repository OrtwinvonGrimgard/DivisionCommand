#!/usr/bin/env node
/**
 * t281: Blättern in der großen Kartenansicht der Bibliothek (jsdom; `npm test`).
 * Öffnen, Weiter/Zurück per Knopf und Pfeiltaste, gesperrte Enden, aktive Filter, Deck-Aktion auf der
 * geblätterten Karte, Esc schließt nur die Ansicht, Pfeiltasten in Textfeldern bleiben dem Feld.
 * Browserprüfung mit Bildern: `npm run libzoom-play`.
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
assert(sw.includes("'divcmd-alpha43b'") && html.includes('app.js?v=alpha43b'), 'Cache alpha43b');
assert(/Pfeiltasten/.test(html.match(/<h2 id="library">[\s\S]*?<h2 id="user">/)[0]), 'Hilfe nennt das Blättern');

const dom = new JSDOM(html, { url: 'http://localhost/', runScripts: 'outside-only' });
const w = dom.window;
const G = L.loadGame({ quiet: true });
w.DC_CATALOG = G.DC_CATALOG; w.DC_NATION_DECKS = G.DC_NATION_DECKS; w.DC_IMAGES = {};
w.dcCardImage = (c) => (c && c.id ? 'faces-v2/' + c.id + '.webp' : '');
w.localStorage = { _m: {}, getItem(k) { return this._m[k] || null; }, setItem(k, v) { this._m[k] = String(v); }, removeItem(k) { delete this._m[k]; } };
const loaded = [];
w.Image = function () { const o = {}; Object.defineProperty(o, 'src', { set(v) { loaded.push(v); } }); return o; };
w.eval(fs.readFileSync(path.join(WEB, 'js/ui/library.js'), 'utf8'));
w.eval(fs.readFileSync(path.join(WEB, 'js/ui/ui-screens.js'), 'utf8'));
w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
const D = w.DCLib;
D.render();
const doc = w.document;
const key = (k, target) => (target || doc).dispatchEvent(new w.KeyboardEvent('keydown', { key: k, bubbles: true, cancelable: true }));
const pos = () => doc.querySelector('#lib-zoom .zoom-pos').textContent;
const name = () => doc.querySelector('#lib-zoom .info h3').textContent;

// Öffnen: Position, erste Karte → Zurück gesperrt, Nachbarbild vorgeladen
let ids = D.visibleIds();
assert(ids.length > 10);
D.zoom(ids[0]);
assert.equal(pos(), '1 / ' + ids.length);
assert(doc.querySelector('#lib-zoom .zoom-prev').disabled, 'erste Karte: Zurück gesperrt');
assert(!doc.querySelector('#lib-zoom .zoom-next').disabled);
assert(loaded.some((s) => s.includes(ids[1])), 'nächstes Bild vorgeladen');
assert(/Pfeil rechts/.test(doc.querySelector('#lib-zoom .zoom-next').title), 'Tooltip');

// Weiter per Knopf, Pfeiltasten, Detail folgt der Karte
doc.querySelector('#lib-zoom .zoom-next').click();
assert.equal(D.zoomId(), ids[1]); assert.equal(pos(), '2 / ' + ids.length);
assert.equal(name(), G.DC_CATALOG.cards.find((c) => c.id === ids[1]).name, 'Name wechselt mit');
assert(doc.querySelector('#lib-zoom .inspect-modal').classList.contains('zoom-step-next'), 'Übergang in Blätterrichtung');
key('ArrowRight'); assert.equal(D.zoomId(), ids[2]);
key('ArrowLeft'); assert.equal(D.zoomId(), ids[1]);
assert(doc.querySelector('#lib-zoom .inspect-modal').classList.contains('zoom-step-prev'));
// Pfeiltasten in Textfeldern bleiben dem Feld
const q = doc.getElementById('lib-search');
key('ArrowRight', q); assert.equal(D.zoomId(), ids[1], 'Suchfeld behält die Pfeiltasten');
key('ArrowRight'); assert.equal(D.zoomId(), ids[2]);

// Deck-Aktion wirkt auf die geblätterte Karte
D.clearDraft();
doc.querySelector('#lib-zoom [data-lib-add]').click();
assert.equal(D.draft().cards[ids[2]] || (D.draft().doctrines.includes(ids[2]) ? 1 : 0), 1, 'hinzugefügt: gezeigte Karte');
assert.equal(D.zoomId(), ids[2], 'Ansicht bleibt auf der Karte');
assert(/1 im Deck/.test(doc.getElementById('lib-zoom').textContent));
doc.querySelector('#lib-zoom [data-lib-back]').click();
assert.equal(D.draft().cards[ids[2]] || 0, 0, 'zurückgelegt');

// Filter: Suche schränkt die Liste ein, Blättern bleibt darin; letzte Karte → Weiter gesperrt
const total = ids.length;
q.value = 'ablösung'; q.dispatchEvent(new w.Event('input', { bubbles: true }));
ids = D.visibleIds();
assert(ids.length >= 2 && ids.length < total / 4, 'Suche aktiv (' + ids.length + ' von ' + total + ')');
D.zoom(ids[ids.length - 2]);
assert.equal(pos(), (ids.length - 1) + ' / ' + ids.length);
key('ArrowRight'); assert.equal(D.zoomId(), ids[ids.length - 1]);
assert(doc.querySelector('#lib-zoom .zoom-next').disabled, 'letzte Karte: Weiter gesperrt');
assert(/Letzte Karte/.test(doc.querySelector('#lib-zoom .zoom-next').title));
key('ArrowRight'); assert.equal(D.zoomId(), ids[ids.length - 1], 'kein Umlauf am Ende');
assert.equal(D.zoomStep(1), false);
// Karte außerhalb der Liste (z. B. aus dem Deck geöffnet): keine Blätterleiste
const outside = G.DC_CATALOG.cards.find((c) => !ids.includes(c.id) && D.visibleIds().indexOf(c.id) < 0);
D.zoom(outside.id);
assert(!doc.querySelector('#lib-zoom .zoom-nav'), 'nicht in der Liste: keine Leiste');
assert.equal(D.zoomStep(1), false);

// Esc schließt nur die Ansicht; danach blättern die Pfeiltasten nichts mehr
D.zoom(ids[0]);
const ov = doc.getElementById('lib-zoom');
ov.getClientRects = () => [{}];
doc.getElementById('work-root').classList.add('open');
doc.getElementById('scr-library').classList.add('on');
key('Escape');
assert.equal(ov.style.display, 'none', 'Esc schließt');
key('ArrowRight'); assert.equal(D.zoomId(), ids[0], 'geschlossen: Pfeile wirken nicht');

// Partie-Kartenansicht bleibt ohne Blättern
assert(!/zoom-nav|data-zoom-step/.test(fs.readFileSync(path.join(WEB, 'js/ui/app.js'), 'utf8')), 'Partie unverändert');

console.log('PASS libzoom t281: Position, Knöpfe, Pfeiltasten, Textfeld unberührt, Deck-Aktion auf geblätterter Karte, Filter, Enden gesperrt, Esc, Partie unverändert');
