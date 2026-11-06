/* Offizierstisch (2,5D-Inszenierung): Lampe/Licht/Holz nur im 2,5D-Modus, Zonen & Slots unverändert, Reduced-Motion, flacher Modus intakt. */
const assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { setup } = require('./test_audio_actions');
const WEB = path.join(__dirname, '..', 'Division_Command_0.5a', 'web');
const h = setup('off'), { w } = h;
const $ = s => w.document.querySelector(s), $$ = s => w.document.querySelectorAll(s);
const C = w.DCCamera;
// Assets existieren (keine 404-Platzhalter), CSS eingebunden, Cache angehoben
const css = fs.readFileSync(path.join(WEB, 'css/officer-table.css'), 'utf8');
for (const m of css.matchAll(/url\(\.\.\/([^)]+)\)/g)) assert(fs.existsSync(path.join(WEB, m[1])), 'asset fehlt: ' + m[1]);
for (const a of ['wood.svg', 'felt.svg', 'oil-lamp.svg']) assert(/^<svg[\s>]/.test(fs.readFileSync(path.join(WEB, 'assets/table', a), 'utf8')), a);
const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
assert(/css\/officer-table\.css\?v=/.test(html), 'officer-table.css eingebunden');
assert(/const CACHE = 'divcmd-ot1'/.test(fs.readFileSync(path.join(WEB, 'sw.js'), 'utf8')), 'SW-Cache angehoben');
assert(/prefers-reduced-motion: reduce\)\s*\{[^}]*\.ot-light[^}]*animation: none/.test(css), 'Media-Query stoppt Flackern');
assert(/data-flicker="off"\] \.ot-light/.test(css), 'JS-Flag stoppt Flackern');
assert(/\.ot-light, \.ot-vignette, \.ot-lamp \{ position: absolute; pointer-events: none; \}/.test(css), 'Deko nie klickbar');
// Flach (Standard): keine Inszenierung, Tisch intakt
w.dcRender();
const slotCount = () => ['#enemy-support', '#enemy-front', '#my-front', '#my-support'].map(id => $(id) ? $(id).querySelectorAll('.slot').length : -1).join();
const flatSlots = slotCount();
assert(!$('#cam-viewport') && !$('.ot-lamp') && !$('.ot-light'), 'flach: keine Lampe');
assert($('.table-main > #my-front') && $('.table-main > #enemy-front'), 'flach: Zonen direkt im Tisch');
// 2,5D an: Offizierstisch geladen
const sel = $('#opt-table-view'); sel.value = 'cam'; sel.dispatchEvent(new w.Event('change', { bubbles: true }));
const vp = $('#cam-viewport');
assert(vp && vp.classList.contains('ot-on'), '2,5D lädt Offizierstisch');
assert.equal($$('#cam-viewport > .ot-lamp').length, 1); assert.equal($$('#cam-viewport > .ot-light').length, 1); assert.equal($$('#cam-viewport > .ot-vignette').length, 1);
assert(!$('#cam-world .ot-lamp'), 'Lampe außerhalb der Welt (verrutscht nicht mit Karten)');
assert.equal(vp.getAttribute('data-flicker'), 'on');
w.dcRender(); assert.equal($$('.ot-lamp').length, 1, 'kein Doppel bei Rerender');
// Zonen-Reihenfolge und Slot-Struktur unverändert
const order = [...$('#cam-world').children].map(e => e.id || e.className.split(' ')[0]);
assert.deepEqual(order, ['enemy-support-label', 'enemy-support', 'enemy-front-label', 'enemy-front', 'nml-band', 'my-front-label', 'my-front', 'my-support-label', 'my-support'], order.join());
assert.equal(slotCount(), flatSlots, 'Slotanzahl je Reihe gleich');
assert(!$('#cam-world #hand') && $('#hand'), 'Hand angepinnt');
// Reduced-Motion
w.matchMedia = q => ({ matches: /reduce/.test(q), addEventListener() {}, removeListener() {} });
C._syncFlicker(); assert.equal(vp.getAttribute('data-flicker'), 'off', 'Reduced-Motion stoppt Flackern');
// zurück auf flach: alles weg, Zonen wieder im Tisch
sel.value = 'flat'; sel.dispatchEvent(new w.Event('change', { bubbles: true }));
assert(!$('#cam-viewport') && !$('.ot-lamp') && !w.document.body.classList.contains('dc-cam'));
assert($('.table-main > #my-front') && $('.table-main > .nml-band'), 'flach intakt');
assert.equal(slotCount(), flatSlots);
console.log('PASS officer table: 2,5D lädt Holz/Filz/Lampe/Licht, Zonen ' + flatSlots + ' Slots unverändert, Reduced-Motion aus, flach intakt');
