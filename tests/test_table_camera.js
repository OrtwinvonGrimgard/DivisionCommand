/**
 * Tischkamera: Zoom, Pan, Grenzen, Eingaben.
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
/* 2,5D camera: math, bounds, input blocking, focus dedupe/override/pending, pinned hand, actions. No browser. */
const assert = require('node:assert/strict');
const { setup } = require('./test_audio_actions');
const h = setup('off'), { w, eng, add, click } = h;
const C = w.DCCamera, M = C.math, $ = s => w.document.querySelector(s);
assert(C, 'camera loaded');
// --- math
const view = { w: 1000, h: 600 }, world = { w: 1760, h: 1500 };
let c = M.clampCam({ x: -500, y: 99999, z: 9 }, view, world);
assert.equal(c.z, M.LIMITS.maxZoom); assert.equal(c.x, view.w / 2 / c.z); assert.equal(c.y, world.h - view.h / 2 / c.z);
c = M.clampCam({ x: 0, y: 0, z: 0.01 }, view, world); assert.equal(c.z, M.LIMITS.minZoom);
const base = { x: 880, y: 750, z: 1 };
const before = M.screenToWorld(base, view, 200, 150);
const zc = M.zoomAt(base, view, world, 200, 150, 1.25);
const after = M.screenToWorld(zc, view, 200, 150);
assert(Math.abs(before.x - after.x) < 1e-6 && Math.abs(before.y - after.y) < 1e-6, 'zoom keeps point under cursor');
const back = M.worldToScreen(zc, view, after.x, after.y); assert(Math.abs(back.x - 200) < 1e-6 && Math.abs(back.y - 150) < 1e-6);
assert.match(M.transformCss({ x: 500, y: 300, z: 1 }, view), /translate\(0\.0px,0\.0px\) scale\(1\.000\)/);
const fit = M.fitCam(view, world); assert(fit.z >= M.LIMITS.minZoom && fit.z <= M.LIMITS.maxZoom);
// --- DOM wrap: board in world, hand/HUD/log outside
w.dcRender();
// Default for existing users: classic flat table, no camera wrapper
assert.equal(C.prefs().enabled, false); assert(!$('#cam-viewport') && $('.table-main > #my-front'), 'flat by default');
assert.equal($('#opt-table-view').value, 'flat'); assert.equal($('#opt-table-view-ingame').value, 'flat');
// Graphics option (main menu) switches live; ingame select syncs; persisted in dc_camera_prefs
const sel = $('#opt-table-view'); sel.value = 'cam'; sel.dispatchEvent(new w.Event('change', { bubbles: true }));
assert($('#cam-world #my-front'), 'live switch without restart');
assert.equal($('#opt-table-view-ingame').value, 'cam', 'ingame option synced');
assert.equal(JSON.parse(w.localStorage.getItem('dc_camera_prefs')).enabled, true, 'persisted');
w.dcRender(); assert.equal(w.document.querySelectorAll('#cam-viewport').length, 1, 'no double wrap on rerender');
assert($('#cam-world #my-front') && $('#cam-world #enemy-front') && $('#cam-world #my-support') && $('#cam-world .nml-band'));
assert(!$('#cam-world #hand') && !$('#cam-world .bottom-bar'), 'hand pinned outside world');
assert(!$('#cam-world #log-win') && !$('#cam-world .top-bar'), 'HUD/protocol outside world');
assert($('#cam-center') && $('.cam-hint').textContent.includes('WASD'));
assert(w.document.body.classList.contains('dc-cam'));
// --- WASD input & blocking
const key = (k, target, extra) => (target || w.document).dispatchEvent(new w.KeyboardEvent('keydown', Object.assign({ key: k, bubbles: true, cancelable: true }, extra || {})));
/**
 * Simuliert das Loslassen bzw. Anheben beim Kameratest.
 */
const up = k => w.document.dispatchEvent(new w.KeyboardEvent('keyup', { key: k, bubbles: true }));
C.set({ x: 880, y: 750, z: 1 });
key('d'); assert.equal(C._keys().join(), 'd'); const x0 = C.state().x; C._step(100); assert(C.state().x > x0, 'D pans right'); up('d');
assert.equal(C._keys().join(), '');
const inp = w.document.createElement('input'); w.document.body.appendChild(inp);
key('w', inp); assert.equal(C._keys().join(), '', 'no WASD in inputs');
const ta = w.document.createElement('textarea'); w.document.body.appendChild(ta); key('a', ta); assert.equal(C._keys().join(), '');
key('s', null, { ctrlKey: true }); assert.equal(C._keys().join(), '', 'Ctrl shortcuts untouched');
$('#overlay').style.display = 'flex'; key('s'); assert.equal(C._keys().join(), '', 'blocked in modal'); $('#overlay').style.display = 'none';
const end = w.document.createElement('section'); end.id = 'dc-end-screen'; w.document.body.appendChild(end); key('s'); assert.equal(C._keys().join(), '', 'blocked on end screen'); end.remove();
// --- wheel: zoom on board, native scroll in hand/log untouched
C.set({ x: 880, y: 750, z: 1 });
/**
 * Simuliert ein Mausrad-Ereignis für Zoom/Kamera.
 */
const wheel = (el, dy) => { const e = new w.WheelEvent('wheel', { deltaY: dy, bubbles: true, cancelable: true, clientX: 100, clientY: 100 }); el.dispatchEvent(e); return e; };
let ev = wheel($('#cam-world #my-front'), -200); assert(ev.defaultPrevented && C.state().z > 1, 'wheel zooms');
ev = wheel($('#cam-world #my-front'), 100000); assert(C.state().z >= M.LIMITS.minZoom);
ev = wheel($('#hand'), -200); assert(!ev.defaultPrevented, 'hand scroll native');
ev = wheel($('#log'), -200); assert(!ev.defaultPrevented, 'log scroll native');
// --- focus dedupe / manual / pending
C._resetTiming(); C.setAutoFocus(true);
const inst = eng.instFromId(w.DC_CATALOG.cards.find(x => x.typ === 'Einheit').id, 0); eng.player(0).front.R[2] = inst; w.dcRender();
// afterRender auto-focused the newly deployed unit exactly once
assert.equal(C.focusUid(inst.uid, 'deploy:' + inst.uid), 'dup', 'render hook already handled this deploy event');
C._resetTiming();
let r = C.focusUid(inst.uid, 'deploy:test'); assert(['focused', 'visible'].includes(r), r);
assert.equal(C.focusUid(inst.uid, 'deploy:test'), 'dup', 'deduped per event');
C._resetTiming(); eng.state.pending = { kind: 'instant-target', player: 0, choices: [] };
assert.equal(C.focusUid(inst.uid, 'e2'), 'busy', 'never during pending selection'); eng.state.pending = null;
w.document.body.classList.add('dc-armed'); assert.equal(C.focusUid(inst.uid, 'e3'), 'busy'); w.document.body.classList.remove('dc-armed');
key('d'); up('d'); assert.equal(C.focusUid(inst.uid, 'e4'), 'manual', 'manual pan has priority');
C._resetTiming(); const af = $('#opt-cam-auto-ingame'); af.checked = false; af.dispatchEvent(new w.Event('change', { bubbles: true }));
assert.equal(C.focusUid(inst.uid, 'e5'), 'off'); assert.equal($('#opt-cam-auto').checked, false, 'autofocus synced to main options');
af.checked = true; af.dispatchEvent(new w.Event('change', { bubbles: true }));
assert.equal(JSON.parse(w.localStorage.getItem('dc_camera_prefs')).autoFocus, true, 'prefs stored separately');
// --- production play chain still works through the world (click bubbling from slot)
eng.player(0).front.R[2] = null; w.dcRender();
const card = add(w.DC_CATALOG.cards.find(x => x.typ === 'Einheit' && !(x.effects || []).length).id);
const ap = eng.player(0).ap;
click(`#hand [data-uid="${card.uid}"]`);
assert($('#cam-world #my-front .slot.legal'), 'legal slots marked inside world');
click('#cam-world #my-front .slot.legal');
assert(eng.frontList(eng.player(0)).some(l => l.inst.uid === card.uid) && eng.player(0).ap < ap, 'deploy + AP through camera');
// --- flat fallback restores DOM, re-enable rewraps
// Drag in progress: switch deferred until drop, then applied
w.document.body.classList.add('dc-dragging');
const igs = $('#opt-table-view-ingame'); igs.value = 'flat'; igs.dispatchEvent(new w.Event('change', { bubbles: true }));
assert($('#cam-world #my-front'), 'no DOM move during drag');
w.document.body.classList.remove('dc-dragging'); w.dcRender();
assert(!$('#cam-viewport') && !w.document.body.classList.contains('dc-cam') && $('.table-main > #my-front'), 'flat table restored after drag');
assert(!$('#cam-on') && !$('#cam-flat'), 'no redundant table toggles');
key('d'); assert.equal(C._keys().join(), '', 'no WASD in flat mode');
assert.equal($('#opt-table-view').value, 'flat');
// Actions still work on flat after switching back
const card2 = add(w.DC_CATALOG.cards.find(x => x.typ === 'Einheit' && !(x.effects || []).length).id);
click(`#hand [data-uid="${card2.uid}"]`); click('#my-front .slot.legal');
assert(eng.frontList(eng.player(0)).some(l => l.inst.uid === card2.uid));
C.setEnabled(true); assert($('#cam-world #my-front'));
assert.equal(h.errors.length, 0, String(h.errors));
h.dom.window.close();
console.log('PASS camera: math/zoom-at-cursor/bounds, world wraps board only (hand/HUD/log pinned), WASD + input/modal/endscreen/Ctrl blocking, wheel vs native scroll, focus dedupe/pending/armed/manual/off, prefs, deploy+AP via world, flat fallback');
