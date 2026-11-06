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
const img = fs.readFileSync(path.join(WEB, 'assets/table/officer-table.webp'));
assert(img.slice(0, 4).toString() === 'RIFF' && img.slice(8, 12).toString() === 'WEBP' && img.length > 200000, 'Tischbild ist echtes WebP');
const vp8 = img.indexOf('VP8'); assert(vp8 > 0);
// Kalibrierung: Filzrechteck (585..2865 × 471..2310 von 3456×2592) ↔ Welt 1760×1420
const F = { x: 585, y: 471, w: 2280, h: 1839 }, IMG = { w: 3456, h: 2592 };
assert(Math.abs(F.w / F.h - 1760 / 1420) < 0.01, 'Filz-Seitenverhältnis = Welt');
const pct = (re) => Number(css.match(re)[1]);
assert(Math.abs(pct(/left: -([\d.]+)%/) - F.x / F.w * 100) < 0.01 && Math.abs(pct(/top: -([\d.]+)%/) - F.y / F.h * 100) < 0.01, 'Offset kalibriert');
assert(Math.abs(pct(/width: ([\d.]+)%; height/) - IMG.w / F.w * 100) < 0.01 && Math.abs(pct(/height: ([\d.]+)%;\n/) - IMG.h / F.h * 100) < 0.01, 'Größe kalibriert');
assert(/height: 1420px/.test(css));
assert(!fs.existsSync(path.join(WEB, 'assets/table/oil-lamp.svg')), 'alte SVG-Lampe entfernt');
const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
assert(/css\/officer-table\.css\?v=/.test(html), 'officer-table.css eingebunden');
assert(/const CACHE = 'divcmd-ot2'/.test(fs.readFileSync(path.join(WEB, 'sw.js'), 'utf8')), 'SW-Cache angehoben');
assert(/prefers-reduced-motion: reduce\)\s*\{[^}]*\.ot-glow[^}]*animation: none/.test(css), 'Media-Query stoppt Flackern');
assert(/data-flicker="off"\] \.ot-glow/.test(css), 'JS-Flag stoppt Flackern');
assert((css.match(/pointer-events: none/g) || []).length >= 3, 'Bild/Licht nie klickbar');
// Flach (Standard): keine Inszenierung, Tisch intakt
w.dcRender();
const slotCount = () => ['#enemy-support', '#enemy-front', '#my-front', '#my-support'].map(id => $(id) ? $(id).querySelectorAll('.slot').length : -1).join();
const flatSlots = slotCount();
assert(!$('#cam-viewport') && !$('.ot-desk'), 'flach: kein Tischbild');
assert($('.table-main > #my-front') && $('.table-main > #enemy-front'), 'flach: Zonen direkt im Tisch');
// 2,5D an: Offizierstisch geladen
const sel = $('#opt-table-view'); sel.value = 'cam'; sel.dispatchEvent(new w.Event('change', { bubbles: true }));
const vp = $('#cam-viewport');
assert(vp && vp.classList.contains('ot-on'), '2,5D lädt Offizierstisch');
assert.equal($$('#cam-world > .ot-desk').length, 1, 'Tischbild in der Kamera-Welt (gleiche Perspektive wie Slots)');
assert($('.ot-desk > .ot-glow') && !$('.ot-lamp, .ot-light, .ot-vignette'), 'Lampe nur im Bild, kein separates UI-Objekt');
assert(!$('.ot-desk .slot'), 'keine Slots im Bild');
assert.equal(vp.getAttribute('data-flicker'), 'on');
w.dcRender(); assert.equal($$('.ot-desk').length, 1, 'kein Doppel bei Rerender');
// Zonen-Reihenfolge und Slot-Struktur unverändert
const order = [...$('#cam-world').children].filter(e => !e.classList.contains('ot-desk')).map(e => e.id || e.className.split(' ')[0]);
assert.deepEqual(order, ['enemy-support-label', 'enemy-support', 'enemy-front-label', 'enemy-front', 'nml-band', 'my-front-label', 'my-front', 'my-support-label', 'my-support'], order.join());
assert.equal(slotCount(), flatSlots, 'Slotanzahl je Reihe gleich');
assert(!$('#cam-world #hand') && $('#hand'), 'Hand angepinnt');
// Reduced-Motion
w.matchMedia = q => ({ matches: /reduce/.test(q), addEventListener() {}, removeListener() {} });
C._syncFlicker(); assert.equal(vp.getAttribute('data-flicker'), 'off', 'Reduced-Motion stoppt Flackern');
// zurück auf flach: alles weg, Zonen wieder im Tisch
sel.value = 'flat'; sel.dispatchEvent(new w.Event('change', { bubbles: true }));
assert(!$('#cam-viewport') && !$('.ot-desk') && !w.document.body.classList.contains('dc-cam'));
assert($('.table-main > #my-front') && $('.table-main > .nml-band'), 'flach intakt');
assert.equal(slotCount(), flatSlots);
console.log('PASS officer table: 2,5D lädt Tischbild (kalibriert) + Flackerlicht, Zonen ' + flatSlots + ' Slots unverändert, Reduced-Motion aus, flach intakt');
