/* Ölgemalte Slot-Schablone (2,5D): Löcher = gemessene Slot-Boxen, Schichtfolge, pointer-events, Status-Licht, flach ohne Schablone. */
const assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { setup } = require('./test_audio_actions');
const WEB = path.join(__dirname, '..', 'Division_Command_0.5a', 'web');
const h = setup('off'), { w } = h;
const $ = s => w.document.querySelector(s), $$ = s => w.document.querySelectorAll(s);
const css = fs.readFileSync(path.join(WEB, 'css/officer-table.css'), 'utf8');
const tex = fs.readFileSync(path.join(WEB, 'assets/table/stencil-oil.webp'));
assert(tex.slice(0, 4).toString() === 'RIFF' && tex.slice(8, 12).toString() === 'WEBP' && tex.length > 50000, 'Öltextur vorhanden');
for (const m of css.matchAll(/url\(\.\.\/([^)]+)\)/g)) assert(fs.existsSync(path.join(WEB, m[1])), '404: ' + m[1]);
assert(/table-stencil\.js\?v=/.test(fs.readFileSync(path.join(WEB, 'index.html'), 'utf8')));
assert(/const CACHE = 'divcmd-sc3'/.test(fs.readFileSync(path.join(WEB, 'sw.js'), 'utf8')));
// z-Reihenfolge: Gemälde -3 < Licht -2 < Schablone -1 < Karten (auto)
const z = sel => Number(css.match(new RegExp(sel.replace(/[.>]/g, m => '\\' + m) + ' \\{[^}]*z-index: (-?\\d+)'))[1]);
assert(z('.cam-world > .ot-desk') < z('.cam-world > .ot-slotlight') && z('.cam-world > .ot-slotlight') < z('.cam-world > .ot-stencil') && z('.cam-world > .ot-stencil') < 0, 'Schichtfolge');
assert(/\.ot-slotlight \{[^}]*pointer-events: none/.test(css) && /\.ot-stencil \{[^}]*pointer-events: none/.test(css) && /\.ot-hole \{[^}]*pointer-events: none/.test(css), 'nicht klickbar');
assert(/prefers-reduced-motion: reduce\) \{ \.ot-hole \{ animation: none/.test(css), 'Reduced-Motion');
// Flach: keine Schablone
w.dcRender();
assert(!$('.ot-stencil') && !$('.ot-slotlight'), 'flach ohne Schablone');
// 2,5D an
const sel = $('#opt-table-view'); sel.value = 'cam'; sel.dispatchEvent(new w.Event('change', { bubbles: true }));
const world = $('#cam-world');
assert(world && $('#cam-viewport').classList.contains('ot-on'));
// Fake-Layout (jsdom hat keins): Slots je Reihe mit Gap, Reihen untereinander
const ROWS = ['enemy-support', 'enemy-front', 'enemy-nml', 'my-nml', 'my-front', 'my-support'];
const expect = [];
let y = 40;
ROWS.forEach(id => {
  const slots = [...world.querySelectorAll('#' + id + ' .slot')], hh = /nml/.test(id) ? 120 : 252;
  slots.forEach((s, i) => {
    const r = { x: 40 + i * (180 + 12), y, w: 180, h: hh };
    for (const [k, v] of Object.entries({ offsetLeft: r.x, offsetTop: r.y, offsetWidth: r.w, offsetHeight: r.h, offsetParent: world })) Object.defineProperty(s, k, { configurable: true, get: () => v });
    expect.push(Object.assign({ row: id, i }, r));
  });
  y += hh + 30;
});
const count = id => world.querySelectorAll('#' + id + ' .slot').length;
for (const id of ['enemy-support', 'enemy-front', 'my-front', 'my-support']) assert.equal(count(id), 9, id + ' 9 Slots');
for (const k of ['offsetWidth', 'offsetHeight']) Object.defineProperty(world, k, { configurable: true, get: () => (k === 'offsetWidth' ? 1760 : 1389) });
const rects = w.DCStencil.sync(world);
assert.equal(rects.length, expect.length, 'alle Slots gemessen');
rects.forEach((r, k) => { const e = expect[k]; assert.deepEqual([r.row, r.index, r.x, r.y, r.w, r.h], [e.row, e.i, e.x, e.y, e.w, e.h], 'Loch ' + e.row + e.i); });
assert.deepEqual([...new Set(rects.map(r => r.row))], ROWS.filter(id => count(id) > 0), 'Zonenreihenfolge');
// DOM: Licht vor (unter) Schablone, beide nach dem Gemälde und vor den Reihen
const kids = [...world.children].map(e => e.id || e.className.split(' ')[0]);
assert.deepEqual(kids.slice(0, 3), ['ot-desk', 'ot-slotlight', 'ot-stencil'], kids.join());
assert(kids.indexOf('ot-stencil') < kids.indexOf('enemy-support'));
const st = $('.ot-stencil'), holes = [...$('.ot-slotlight').children];
assert.equal(st.getAttribute('data-holes'), String(expect.length));
assert.equal(holes.length, expect.length);
holes.forEach((hEl, k) => { const e = expect[k]; assert.equal(hEl.style.left, e.x + 'px'); assert.equal(hEl.style.top, e.y + 'px'); assert.equal(hEl.style.width, e.w + 'px'); assert.equal(hEl.style.height, e.h + 'px'); });
// Maske: Außenrahmen + exakt ein Unterpfad je Loch, evenodd
const mask = decodeURIComponent((st.style.maskImage || st.style.webkitMaskImage || '').replace(/^url\("data:image\/svg\+xml;utf8,|"\)$/g, ''));
assert(/fill-rule="evenodd"/.test(mask), 'evenodd-Maske');
for (const e of expect) assert(mask.includes('M' + e.x + ' ' + e.y + 'h' + e.w + 'v' + e.h + 'h' + (-e.w) + 'Z'), 'Maskenloch ' + e.row + e.i);
assert(!/<text/.test(st.innerHTML), 'keine Schrift');
// Status-Licht spiegelt Slot-Klassen (Hook)
const s0 = world.querySelector('#my-front .slot');
s0.classList.add('legal', 'fx-burn'); w.DCStencil.sync(world);
const h0 = holes.length ? $('.ot-slotlight').children[rects.findIndex(r => r.el === s0)] : null;
assert(h0.classList.contains('is-legal') && h0.classList.contains('is-fx-burn') && h0.classList.contains('z-front'));
s0.classList.remove('legal', 'fx-burn'); w.DCStencil.sync(world); assert(!h0.classList.contains('is-legal'));
// Rerender: kein Doppel
w.dcRender(); assert.equal($$('.ot-stencil').length, 1); assert.equal($$('.ot-slotlight').length, 1);
// Flach: Schablone weg
sel.value = 'flat'; sel.dispatchEvent(new w.Event('change', { bubbles: true }));
assert(!$('.ot-stencil') && !$('.ot-slotlight') && $('.table-main > #my-front'), 'flach sauber');
console.log('PASS stencil: ' + expect.length + ' Löcher = Slot-Boxen (4×9 + Niemandsland), Schichten Gemälde<Licht<Schablone<Karten, pointer-events none, Status-Hooks, flach ohne');
// t194u: vollständige Karten in belegten Slots (nur 2,5D sichtbar), verdeckt ohne Bild
{
  const { eng } = h;
  const inf = w.DC_CATALOG.cards.find(c => c.typ === 'Einheit' && c.image && c.art_status !== 'platzhalter' && (c.keywords || []).length);
  const sup = w.DC_CATALOG.cards.find(c => c.typ === 'Unterstützung' && c.image);
  eng.player(0).front.C[0] = eng.instFromId(inf.id, 0);
  const hid = eng.instFromId(inf.id, 1); hid.facedown = true; eng.player(1).front.L[0] = hid;
  eng.player(0).support[1] = eng.instFromId(sup.id, 0);
  sel.value = 'cam'; sel.dispatchEvent(new w.Event('change', { bubbles: true })); w.dcRender();
  const t = $(`#cam-world #my-front [data-uid="${eng.player(0).front.C[0].uid}"]`);
  const img = t.querySelector('.slot-face > .slot-card > img.slot-face-img');
  assert(img && img.getAttribute('src').includes(encodeURI(inf.image).split('/').pop().replace(/\.[^.]+$/, '')), 'ganze Kartenvorderseite (def.image) im Slot');
  assert(t.querySelector('.slot-kw .kw-strip'), 'Schlüsselwörter unter der Karte');
  assert(t.querySelector('.unit-stats'), 'Live-Werte bleiben');
  assert($(`#cam-world #my-support .slot.filled .slot-face img`), 'Support zeigt ganze Karte');
  const ht = $(`#cam-world #enemy-front [data-uid="${hid.uid}"]`);
  assert(!ht.querySelector('img') && ht.querySelector('.slot-face.back'), 'verdeckt: kein Bild/keine Info');
  assert(/\.slot\.filled > \.table-motif, body\.dc-cam #app \.cam-world \.slot\.filled > \.unit-name \{ display: none !important; \}/.test(css), '2,5D blendet Ausschnitt aus');
  assert(/#app \.slot-face, #app \.slot-kw \{ display: none; \}/.test(css), 'flach: Ausschnitt wie bisher');
  assert(/img\.slot-face-img \{[^}]*object-fit: contain !important/.test(css), 'Karte eingepasst, nicht beschnitten');
  // t195u: keine Streckung/Stauchung – Kartenrahmen im Format der Handkarten-Datei
  const jpegSize = f => { const b = fs.readFileSync(f); let i = 2; while (i < b.length) { const m = b[i + 1], L = b.readUInt16BE(i + 2); if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return { h: b.readUInt16BE(i + 5), w: b.readUInt16BE(i + 7) }; i += 2 + L; } };
  const file = decodeURIComponent(img.getAttribute('src')).split('?')[0];
  const dim = jpegSize(path.join(WEB, file)); assert(dim, 'Kartenmaße lesbar');
  const ar = css.match(/\.slot-card \{[^}]*aspect-ratio: (\d+) \/ (\d+)/); assert(ar, 'Kartenrahmen mit festem Seitenverhältnis');
  assert(Math.abs(ar[1] / ar[2] - dim.w / dim.h) < 0.002, 'Rahmen = Kartenformat ' + dim.w + '×' + dim.h);
  assert(/\.slot-card \{[^}]*height: 100%; width: auto;/.test(css), 'nur Höhe gesetzt, Breite folgt Verhältnis');
  const cardRule = css.match(/\.slot-card \{([^}]+)\}/)[1];
  assert(!/(?:^|;)\s*(?:-webkit-)?filter\s*:/.test(cardRule), 'Kartenrahmen ohne rasternden Filter');
  assert(/box-shadow: 0 3px 5px #000a/.test(cardRule), 'Kartenschatten ohne Filter');
  assert(ht.querySelector('.slot-face.back > .slot-card > .table-hidden'), 'Rückseite im Kartenformat');
  assert(/\.slot-card > \.card-ph \{[^}]*position: absolute; inset: 0;/.test(css), 'Platzhalter erbt Kartenformat');
  // Slot-Box unverändert → Schablone passt weiter (252 px)
  assert(/height: 252px !important/.test(fs.readFileSync(path.join(WEB, 'css/table-camera.css'), 'utf8')));
  sel.value = 'flat'; sel.dispatchEvent(new w.Event('change', { bubbles: true }));
  console.log('PASS slot cards: 2,5D zeigt ganze Kartenvorderseite (contain) + Wörter + Werte, verdeckt ohne Bild, flach unverändert');
}
