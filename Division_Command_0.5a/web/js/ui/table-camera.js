/**
 * 2,5D-Tischkamera (Prototyp, Branch table-camera). Reines DOM/CSS: perspektivisch geneigte "Welt"
 * mit translate/scale; kein WebGL, kein echtes 3D. Hand, HUD, Protokoll, Modals bleiben außerhalb.
 * Steuerung: WASD/Pfeile pan (kontinuierlich), Mausrad zoom um Mausposition, Mittelklick-Ziehen pan.
 * Auto-Fokus: einmal je Ereignis auf neu gespielte Karte / tatsächlichen Treffer; nie während Auswahl/Drag.
 */
(function (global) {
  'use strict';
  var PREF_KEY = 'dc_camera_prefs';
  var LIMITS = { minZoom: 0.45, maxZoom: 1.6 };
  var WORLD = { w: 1760, h: 1500 }; // Fallback, echte Größe wird gemessen

  /* ---------- reine Mathematik (testbar) ---------- */
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  /* Kamera: x/y = Weltkoordinate in der Viewport-Mitte, z = Zoom. */
  function clampCam(cam, view, world) {
    var z = clamp(cam.z, LIMITS.minZoom, LIMITS.maxZoom);
    var halfW = view.w / 2 / z, halfH = view.h / 2 / z;
    var x = world.w <= halfW * 2 ? world.w / 2 : clamp(cam.x, halfW, world.w - halfW);
    var y = world.h <= halfH * 2 ? world.h / 2 : clamp(cam.y, halfH, world.h - halfH);
    return { x: x, y: y, z: z };
  }
  function screenToWorld(cam, view, sx, sy) {
    return { x: cam.x + (sx - view.w / 2) / cam.z, y: cam.y + (sy - view.h / 2) / cam.z };
  }
  function worldToScreen(cam, view, wx, wy) {
    return { x: (wx - cam.x) * cam.z + view.w / 2, y: (wy - cam.y) * cam.z + view.h / 2 };
  }
  /* Zoom so, dass der Weltpunkt unter (sx,sy) unter dem Mauszeiger bleibt. */
  function zoomAt(cam, view, world, sx, sy, factor) {
    var before = screenToWorld(cam, view, sx, sy);
    var z = clamp(cam.z * factor, LIMITS.minZoom, LIMITS.maxZoom);
    var x = before.x - (sx - view.w / 2) / z, y = before.y - (sy - view.h / 2) / z;
    return clampCam({ x: x, y: y, z: z }, view, world);
  }
  function fitCam(view, world) {
    var z = clamp(Math.min(view.w / world.w, view.h / world.h) * 0.98, LIMITS.minZoom, LIMITS.maxZoom);
    return clampCam({ x: world.w / 2, y: world.h / 2, z: z }, view, world);
  }
  function transformCss(cam, view) {
    var tx = view.w / 2 - cam.x * cam.z, ty = view.h / 2 - cam.y * cam.z;
    return 'translate(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px) scale(' + cam.z.toFixed(3) + ')';
  }

  /* ---------- Präferenzen ---------- */
  function loadPrefs() {
    var p = { enabled: false, autoFocus: true }; // Standard: klassischer flacher Tisch
    try { var raw = JSON.parse(global.localStorage.getItem(PREF_KEY) || '{}'); if (typeof raw.enabled === 'boolean') p.enabled = raw.enabled; if (typeof raw.autoFocus === 'boolean') p.autoFocus = raw.autoFocus; } catch (e) {}
    return p;
  }
  function savePrefs() { try { global.localStorage.setItem(PREF_KEY, JSON.stringify(prefs)); } catch (e) {} }
  var prefs = loadPrefs();

  /* ---------- Zustand ---------- */
  var cam = { x: WORLD.w / 2, y: WORLD.h / 2, z: 0.8 };
  var viewport = null, world = null, keys = {}, raf = 0, lastFrame = 0;
  var manualUntil = 0, lastAutoAt = 0, seenEvents = {}, prevFront = null, prevEngine = null, panDrag = null;
  var MANUAL_HOLD = 2500, AUTO_GAP = 900, PAN_SPEED = 900; // px/s Bildschirm
  function now() { return global.performance && performance.now ? performance.now() : Date.now(); }
  function reducedMotion() { try { return global.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } }

  function viewSize() {
    var r = viewport && viewport.getBoundingClientRect();
    return { w: (r && r.width) || viewport && viewport.clientWidth || 1000, h: (r && r.height) || viewport && viewport.clientHeight || 600 };
  }
  function worldSize() {
    if (!world) return WORLD;
    var w = world.offsetWidth || world.scrollWidth, h = world.offsetHeight || world.scrollHeight; // offset zuerst: das Tischbild ragt bewusst über die Welt hinaus
    return { w: w || WORLD.w, h: h || WORLD.h };
  }
  function apply(smooth) {
    if (!world) return;
    var v = viewSize();
    cam = clampCam(cam, v, worldSize());
    world.classList.toggle('cam-smooth', !!smooth && !reducedMotion());
    world.style.transform = transformCss(cam, v);
    if (viewport) viewport.setAttribute('data-zoom', cam.z.toFixed(2));
  }

  /* ---------- Blockaden ---------- */
  function isTyping(t) {
    if (!t || !t.closest) return false;
    if (t.isContentEditable) return true;
    return !!t.closest('input, textarea, select, [contenteditable=""], [contenteditable="true"]');
  }
  function modalOpen() {
    var d = document;
    function shown(id) { var el = d.getElementById(id); return !!(el && (el.style.display === 'flex' || el.style.display === 'block')); }
    if (shown('overlay') || shown('inspect') || shown('ingame-opts') || shown('playtest-panel')) return true;
    if (d.getElementById('dc-end-screen')) return true;
    return false;
  }
  function selectionBusy() {
    var b = document.body;
    if (b.classList.contains('dc-dragging') || b.classList.contains('dc-armed')) return true;
    var eng = global.dcGetEngine && global.dcGetEngine();
    return !!(eng && eng.state && eng.state.pending);
  }
  function active() { return prefs.enabled && !!world && document.body.classList.contains('dc-cam'); }

  /* ---------- Eingaben ---------- */
  var KEYMAP = { w: [0, -1], a: [-1, 0], s: [0, 1], d: [1, 0], arrowup: [0, -1], arrowleft: [-1, 0], arrowdown: [0, 1], arrowright: [1, 0] };
  function onKeyDown(ev) {
    if (!active()) return;
    var k = String(ev.key || '').toLowerCase();
    if (!KEYMAP[k]) return;
    if (ev.ctrlKey || ev.metaKey || ev.altKey || isTyping(ev.target) || modalOpen()) return;
    ev.preventDefault();
    keys[k] = 1; manualUntil = now() + MANUAL_HOLD;
    if (!raf) { lastFrame = 0; raf = (global.requestAnimationFrame || function (f) { return setTimeout(function () { f(now()); }, 16); })(tick); }
  }
  function onKeyUp(ev) { delete keys[String(ev.key || '').toLowerCase()]; }
  function step(dtMs) {
    var dx = 0, dy = 0;
    Object.keys(keys).forEach(function (k) { dx += KEYMAP[k][0]; dy += KEYMAP[k][1]; });
    if (!dx && !dy) return false;
    var d = PAN_SPEED * dtMs / 1000 / cam.z;
    cam = { x: cam.x + dx * d, y: cam.y + dy * d, z: cam.z };
    apply(false);
    return true;
  }
  function tick(t) {
    var dt = lastFrame ? Math.min(50, t - lastFrame) : 16; lastFrame = t;
    if (step(dt) && active()) raf = (global.requestAnimationFrame || function (f) { return setTimeout(function () { f(now()); }, 16); })(tick);
    else raf = 0;
  }
  function onBlur() { keys = {}; }
  function wheelBlocked(t) {
    return !t || !t.closest || !!t.closest('.hand-dock, .hand, #log-win, .modal, .overlay, #dc-end-screen, #playtest-panel, .cam-hud, textarea, select');
  }
  function onWheel(ev) {
    if (!active() || ev.ctrlKey || wheelBlocked(ev.target) || modalOpen()) return;
    ev.preventDefault();
    var r = viewport.getBoundingClientRect();
    var factor = Math.exp(-clamp(ev.deltaY, -240, 240) * 0.0015);
    cam = zoomAt(cam, viewSize(), worldSize(), ev.clientX - r.left, ev.clientY - r.top, factor);
    manualUntil = now() + MANUAL_HOLD;
    apply(false);
  }
  function onPointerDown(ev) {
    if (!active() || ev.button !== 1) return; // nur Mittelklick: kollidiert nicht mit Karten-Klick/Drag
    ev.preventDefault();
    panDrag = { x: ev.clientX, y: ev.clientY, cx: cam.x, cy: cam.y };
  }
  function onPointerMove(ev) {
    if (!panDrag) return;
    cam = { x: panDrag.cx - (ev.clientX - panDrag.x) / cam.z, y: panDrag.cy - (ev.clientY - panDrag.y) / cam.z, z: cam.z };
    manualUntil = now() + MANUAL_HOLD; apply(false);
  }
  function onPointerUp() { panDrag = null; }

  /* ---------- Fokus ---------- */
  function elementCenterWorld(el) {
    var v = viewSize(), r = el.getBoundingClientRect(), vr = viewport.getBoundingClientRect();
    return screenToWorld(cam, v, r.left - vr.left + r.width / 2, r.top - vr.top + r.height / 2);
  }
  function visibleEnough(el) {
    var r = el.getBoundingClientRect(), vr = viewport.getBoundingClientRect(), m = 24;
    return r.left >= vr.left + m && r.right <= vr.right - m && r.top >= vr.top + m && r.bottom <= vr.bottom - m;
  }
  /* Ergebnis: 'focused' | 'visible' | 'dup' | 'busy' | 'manual' | 'throttled' | 'off' | 'missing' */
  function focusUid(uid, eventKey, opts) {
    opts = opts || {};
    if (!active() || !prefs.autoFocus) return 'off';
    var key = eventKey || ('uid:' + uid);
    if (seenEvents[key]) return 'dup';
    seenEvents[key] = 1;
    var t = opts.now != null ? opts.now : now();
    if (selectionBusy() || modalOpen()) return 'busy';
    if (t < manualUntil) return 'manual';
    if (t - lastAutoAt < AUTO_GAP) return 'throttled';
    var el = world.querySelector('[data-uid="' + String(uid).replace(/"/g, '') + '"]');
    if (!el) return 'missing';
    if (visibleEnough(el)) return 'visible';
    var c = elementCenterWorld(el);
    cam = { x: c.x, y: c.y, z: cam.z };
    lastAutoAt = t;
    apply(true);
    return 'focused';
  }
  function frontUids(eng) {
    var out = {};
    eng.state.players.forEach(function (p) { eng.frontList(p).forEach(function (l) { out[l.inst.uid] = 1; }); });
    return out;
  }
  /* Nach jedem Render: neue Fronteinheiten und tatsächliche Treffer-Impulse fokussieren (je einmal). */
  function afterRender(eng) {
    try {
      bindOptions();
      if (deferredApply) applyEnabled();
      if (prefs.enabled) ensure(); else if (document.getElementById('cam-viewport')) teardown();
      if (!active() || !eng || !eng.state) return;
      if (prevEngine !== eng) { prevEngine = eng; prevFront = frontUids(eng); seenEvents = {}; return; }
      var cur = frontUids(eng), target = null, key = null;
      Object.keys(cur).forEach(function (u) { if (!prevFront[u] && !target) { target = u; key = 'deploy:' + u; } });
      prevFront = cur;
      var pulses = global.dcFxPulses || {};
      if (!target) Object.keys(pulses).some(function (u) {
        if (pulses[u] === 'heal') return false;
        var inst = eng.findInst && eng.findInst(u);
        target = u; key = 'hit:' + u + ':' + (inst && inst.inst ? inst.inst.def : '?') + ':' + eng.state.turn; return true;
      });
      if (target) focusUid(target, key);
    } catch (e) { /* Kamera ist optional: nie Spielablauf stören */ }
  }

  /* ---------- DOM-Aufbau ---------- */
  var WORLD_IDS = ['enemy-support-label', 'enemy-support', 'enemy-front-label', 'enemy-front', null, 'my-front-label', 'my-front', 'my-support-label', 'my-support'];
  /* Offizierstisch-Inszenierung (nur 2,5D): Holz, Lampe, Lichtkegel, Vignette. Rein dekorativ, nicht klickbar. */
  function syncFlicker() { if (viewport) viewport.setAttribute('data-flicker', reducedMotion() ? 'off' : 'on'); }
  function decorate(vp) {
    vp.classList.add('ot-on');
    vp.querySelectorAll('.ot-lamp, .ot-light, .ot-vignette').forEach(function (e) { e.remove(); });
    var w = vp.querySelector('#cam-world');
    if (w && !w.querySelector(':scope > .ot-desk')) {
      var d = document.createElement('div'); d.className = 'ot-desk'; d.setAttribute('aria-hidden', 'true');
      d.innerHTML = '<div class="ot-glow"></div><div class="ot-shade"></div>';
      w.insertBefore(d, w.firstChild);
    }
    syncFlicker();
  }
  var mqBound = false;
  function bindMotionQuery() {
    if (mqBound) return; mqBound = true;
    try { var mq = global.matchMedia && matchMedia('(prefers-reduced-motion: reduce)'); if (mq) { if (mq.addEventListener) mq.addEventListener('change', syncFlicker); else if (mq.addListener) mq.addListener(syncFlicker); } } catch (e) {}
  }
  function ensure() {
    var main = document.querySelector('#app .table-main') || document.querySelector('.table-main');
    if (!main) return false;
    if (!prefs.enabled) return false;
    if (main.querySelector('#cam-viewport')) { viewport = main.querySelector('#cam-viewport'); world = viewport.querySelector('#cam-world'); decorate(viewport); document.body.classList.add('dc-cam'); return true; }
    var anchor = main.querySelector('.bottom-bar');
    viewport = document.createElement('div'); viewport.id = 'cam-viewport'; viewport.className = 'cam-viewport';
    var tilt = document.createElement('div'); tilt.className = 'cam-tilt';
    world = document.createElement('div'); world.id = 'cam-world'; world.className = 'cam-world';
    tilt.appendChild(world); viewport.appendChild(tilt);
    main.insertBefore(viewport, anchor || null);
    WORLD_IDS.forEach(function (id) {
      var el = id ? document.getElementById(id) : main.querySelector('.nml-band');
      if (el) world.appendChild(el);
    });
    var hud = document.createElement('div'); hud.className = 'cam-hud';
    hud.innerHTML = '<button type="button" id="cam-center" title="Ganzen Tisch zeigen">Übersicht</button>' +
      '<span class="cam-hint">WASD/Pfeile: bewegen · Mausrad: zoomen · Mitteltaste ziehen</span>';
    viewport.appendChild(hud);
    decorate(viewport); bindMotionQuery();
    hud.querySelector('#cam-center').onclick = function () { overview(); };
    viewport.addEventListener('wheel', onWheel, { passive: false });
    viewport.addEventListener('pointerdown', onPointerDown);
    document.body.classList.add('dc-cam');
    overview();
    return true;
  }
  function teardown() {
    var vp = document.getElementById('cam-viewport');
    document.body.classList.remove('dc-cam');
    keys = {};
    if (!vp) { viewport = world = null; return; }
    var main = vp.parentNode, w = vp.querySelector('#cam-world');
    if (w) w.querySelectorAll(':scope > .ot-desk').forEach(function (e) { e.remove(); });
    while (w && w.firstChild) main.insertBefore(w.firstChild, vp);
    vp.remove();
    viewport = world = null;
  }
  /* Live-Umschaltung. Während eines laufenden Karten-Drags wird erst nach dem Drop umgebaut. */
  var deferredApply = false;
  function applyEnabled() {
    if (document.body.classList.contains('dc-dragging')) { deferredApply = true; return 'deferred'; }
    deferredApply = false;
    keys = {}; panDrag = null;
    if (prefs.enabled) ensure(); else teardown();
    return 'applied';
  }
  function setEnabled(on) {
    prefs.enabled = !!on; savePrefs(); syncOptions();
    return applyEnabled();
  }
  function setAutoFocus(on) { prefs.autoFocus = !!on; savePrefs(); syncOptions(); }
  /* Grafikoptionen (Hauptmenü + Ingame) spiegeln dieselben dc_camera_prefs. */
  function syncOptions() {
    document.querySelectorAll('[data-cam-view]').forEach(function (el) { el.value = prefs.enabled ? 'cam' : 'flat'; });
    document.querySelectorAll('[data-cam-auto]').forEach(function (el) { el.checked = !!prefs.autoFocus; });
  }
  function bindOptions() {
    document.querySelectorAll('[data-cam-view]').forEach(function (el) {
      if (el._camBound) return; el._camBound = true;
      el.addEventListener('change', function () { setEnabled(el.value === 'cam'); });
    });
    document.querySelectorAll('[data-cam-auto]').forEach(function (el) {
      if (el._camBound) return; el._camBound = true;
      el.addEventListener('change', function () { setAutoFocus(el.checked); });
    });
    syncOptions();
  }
  function overview() {
    if (!world) return;
    cam = fitCam(viewSize(), worldSize());
    manualUntil = now() + 600;
    apply(!reducedMotion());
  }

  if (!global.__dcCamBound) {
    global.__dcCamBound = true;
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    global.addEventListener('blur', onBlur);
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    global.addEventListener('resize', function () { if (world) apply(false); });
    document.addEventListener('drop', function () { if (deferredApply) setTimeout(applyEnabled, 0); });
    document.addEventListener('dragend', function () { if (deferredApply) setTimeout(applyEnabled, 0); });
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindOptions); else bindOptions();
  }

  global.DCCamera = {
    ensure: ensure, afterRender: afterRender, focusUid: focusUid, overview: overview, setEnabled: setEnabled,
    _syncFlicker: syncFlicker,
    prefs: function () { return { enabled: prefs.enabled, autoFocus: prefs.autoFocus }; },
    setAutoFocus: setAutoFocus, syncOptions: syncOptions, bindOptions: bindOptions,
    state: function () { return { x: cam.x, y: cam.y, z: cam.z }; },
    set: function (c) { cam = { x: c.x, y: c.y, z: c.z }; apply(false); },
    _step: step, _keys: function () { return Object.keys(keys); }, _resetTiming: function () { manualUntil = 0; lastAutoAt = -1e9; },
    math: { clamp: clamp, clampCam: clampCam, zoomAt: zoomAt, screenToWorld: screenToWorld, worldToScreen: worldToScreen, fitCam: fitCam, transformCss: transformCss, LIMITS: LIMITS }
  };
})(window);
