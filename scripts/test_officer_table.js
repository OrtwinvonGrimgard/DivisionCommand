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
const img = fs.readFileSync(path.join(WEB, 'assets/table/officer-room.webp'));
assert(img.slice(0, 4).toString() === 'RIFF' && img.slice(8, 12).toString() === 'WEBP' && img.length > 400000, 'Tischbild ist echtes WebP');
const vp8 = img.indexOf('VP8'); assert(vp8 > 0);
// Kalibrierung: Filzrechteck Offizierszimmer (1132..2784 × 2400..3704 von 3456×2592) ↔ Welt 1760×1420
const F = { x: 1132, y: 2400, w: 1652, h: 1304 }, IMG = { w: 3952, h: 4680 };
assert(IMG.w / F.w >= 2 && IMG.h / F.h >= 2, 'Szene mindestens 2× Spielfeld in jeder Richtung');
assert(Math.abs(F.w / F.h - 1760 / 1389) < 0.01, 'Filz-Seitenverhältnis = Welt');
const pct = (re) => Number(css.match(re)[1]);
assert(Math.abs(pct(/left: -([\d.]+)%/) - F.x / F.w * 100) < 0.01 && Math.abs(pct(/top: -([\d.]+)%/) - F.y / F.h * 100) < 0.01, 'Offset kalibriert');
assert(Math.abs(pct(/width: ([\d.]+)%; height/) - IMG.w / F.w * 100) < 0.01 && Math.abs(pct(/height: ([\d.]+)%;\n/) - IMG.h / F.h * 100) < 0.01, 'Größe kalibriert');
assert(/height: 1389px/.test(css));
assert(!fs.existsSync(path.join(WEB, 'assets/table/oil-lamp.svg')), 'alte SVG-Lampe entfernt');
assert(/url\(\.\.\/assets\/table\/officer-room\.webp\)/.test(css) && !/officer-table-photo\.webp\)/.test(css), 'Ölstudie aktiv, Foto nur Alternative');
// Ölstudie = Hash der erzeugten Quelle (Pixelvergleich grob: Goldrahmen oben links hell)
const tilt = Number(css.match(/\.cam-tilt \{ transform: rotateX\((\d+)deg\)/)[1]); assert(tilt >= 24 && tilt <= 28, 'Neigung 24–28°: ' + tilt);
assert(!fs.existsSync(path.join(WEB, 'assets/table/officer-table.webp')), 'alte Platten-Ölstudie ersetzt');
// Kamera-Konstanten = CSS
const MM = w.DCCamera.math;
assert.equal(MM.TILT.deg, tilt); assert(css.includes('perspective: ' + MM.TILT.persp + 'px; perspective-origin: 50% ' + MM.TILT.originY * 100 + '%'));
assert(Math.abs(MM.SCENE.left - (-F.x / F.w * 1760)) < 1 && Math.abs(MM.SCENE.top - (-F.y / F.h * 1389)) < 1 && Math.abs(MM.SCENE.w - IMG.w / F.w * 1760) < 1 && Math.abs(MM.SCENE.h - IMG.h / F.h * 1389) < 1, 'Kamera-Szene = Bildlage');
// Min-Zoom ohne Leerraum: alle 4 Viewport-Ecken (rückprojiziert durch rotateX) liegen im Gemälde
for (const v of [{ w: 1280, h: 800 }, { w: 1440, h: 900 }, { w: 1920, h: 1080 }, { w: 2560, h: 1440 }]) {
  for (const probe of [{ x: -1e5, y: -1e5 }, { x: 1e5, y: 1e5 }, { x: 880, y: 694 }, { x: -1e5, y: 1e5 }]) {
    const c = MM.clampScene({ x: probe.x, y: probe.y, z: 0.01 }, v);
    for (const [sx, sy] of [[0, 0], [v.w, 0], [0, v.h], [v.w, v.h], [v.w / 2, 0]]) {
      const l = MM.unproject(v, sx, sy), wx = c.x + (l.x - v.w / 2) / c.z, wy = c.y + (l.y - v.h / 2) / c.z;
      assert(wx >= MM.SCENE.left - 0.5 && wx <= MM.SCENE.right + 0.5 && wy >= MM.SCENE.top - 0.5 && wy <= MM.SCENE.bottom + 0.5, 'Leerraum bei ' + v.w + 'x' + v.h + ' Ecke ' + sx + ',' + sy);
    }
  }
  const zMin = MM.clampScene({ x: 880, y: 694, z: 0.01 }, v).z;
  assert(zMin < 1, 'Umfeld sichtbar: min-zoom ' + zMin.toFixed(2) + ' bei ' + v.w);
  const o = MM.visibleOffsets(v, zMin); assert(o.x1 - o.x0 > 1760 * 1.6, 'rausgezoomt deutlich mehr als das Spielfeld sichtbar');
}
// Unprojektion plausibel: Bildmitte bleibt Mitte, oben breiter als unten (Tiefe)
{ const v = { w: 1600, h: 900 }, a = MM.unproject(v, 0, 0), b = MM.unproject(v, 0, v.h), m = MM.unproject(v, 800, 450); assert(Math.abs(m.x - 800) < 1e-6 && Math.abs(m.y - 450) < 1e-6); assert(a.x < b.x, 'oben breiter'); }
for (const k of ['ot-bright', 'ot-size', 'ot-hue', 'ot-glint', 'ot-shade']) assert(new RegExp('@keyframes ' + k + ' ').test(css), 'Flacker-Keyframes ' + k);
const durs = [...css.matchAll(/animation: ([^;]+);/g)].map(m => m[1]).join(' ');
assert(new Set(durs.match(/[\d.]+s/g)).size >= 5, 'mehrere unterschiedliche Animationszeiten');
assert(/at 84\.5% 45\.6%/.test(css), 'Licht vom Lampenstandort');
const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
assert(/css\/officer-table\.css\?v=/.test(html), 'officer-table.css eingebunden');
assert(/const CACHE = 'divcmd-ot4'/.test(fs.readFileSync(path.join(WEB, 'sw.js'), 'utf8')), 'SW-Cache angehoben');
assert(/prefers-reduced-motion: reduce\)\s*\{[^}]*\.ot-glow[^}]*animation: none/.test(css), 'Media-Query stoppt Flackern');
assert(/data-flicker="off"\] \.ot-glow, \.cam-viewport\[data-flicker="off"\] \.ot-glint/.test(css), 'JS-Flag stoppt Flackern');
assert(/\.ot-desk \{\s*position: absolute; z-index: -1; pointer-events: none/.test(css) && /\.ot-desk > div \{[^}]*pointer-events: none/.test(css), 'Bild/Licht nie klickbar');
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
assert($('.ot-desk > .ot-glow') && $('.ot-desk > .ot-glint') && $('.ot-desk > .ot-shade') && !$('.ot-lamp, .ot-light, .ot-vignette'), 'Lampe nur im Bild, kein separates UI-Objekt');
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
