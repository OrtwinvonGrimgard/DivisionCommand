/**
 * Ölgemalte Slot-Schablone für den 2,5D-Offizierstisch (nur im Kamera-Modus mit Tischbild).
 * Die Öffnungen werden zur Laufzeit aus den ECHTEN Slot-Boxen gemessen (offsetLeft/Top-Kette bis zur
 * Kamera-Welt, unabhängig von Zoom/Neigung) und als SVG-Maske (evenodd) über eine Öltextur gelegt.
 * Schichten in #cam-world (unten → oben): .ot-desk (Gemälde + Lampenflackern) → .ot-slotlight (Leuchtebene,
 * je Slot ein Licht mit gespiegelten Statusklassen) → .ot-stencil (Schablone mit Löchern) → Reihen/Karten.
 * Alles pointer-events:none. Keine Spielregeln, keine Engine-Zugriffe.
 */
(function (global) {
  'use strict';
  var ROW_IDS = ['enemy-support', 'enemy-front', 'enemy-nml', 'my-nml', 'my-front', 'my-support'];
  var ZONE = { 'enemy-support': 'support', 'my-support': 'support', 'enemy-front': 'front', 'my-front': 'front', 'enemy-nml': 'nml', 'my-nml': 'nml' };
  /* Slot-Statusklassen, die hinter der Schablone als Licht gespiegelt werden (rein optisch). */
  var MIRROR = ['filled', 'legal', 'legal-target', 'drop-ok', 'picked', 'exhausted', 'fx-shield', 'fx-burn', 'fx-buff', 'fx-debuff', 'fx-fog', 'fx-recon', 'sec-buff', 'sec-debuff', 'sec-shield', 'sec-trap', 'enemy'];

  function offsetIn(el, root) {
    var x = 0, y = 0, n = el;
    while (n && n !== root) { x += n.offsetLeft || 0; y += n.offsetTop || 0; n = n.offsetParent; if (n === document.body || n === null) break; }
    return { x: x, y: y };
  }
  /* Misst alle Slot-Rechtecke relativ zur Welt. Liefert [{row, zone, index, x, y, w, h, el}]. */
  function measure(world) {
    var out = [];
    ROW_IDS.forEach(function (id) {
      var row = world.querySelector('#' + id); if (!row) return;
      var slots = row.querySelectorAll('.slot');
      for (var i = 0; i < slots.length; i++) {
        var s = slots[i], o = offsetIn(s, world), w = s.offsetWidth || 0, h = s.offsetHeight || 0;
        if (w <= 0 || h <= 0) continue;
        out.push({ row: id, zone: ZONE[id], index: i, x: Math.round(o.x), y: Math.round(o.y), w: Math.round(w), h: Math.round(h), el: s });
      }
    });
    return out;
  }
  function maskSvg(W, H, rects) {
    var d = 'M0 0H' + W + 'V' + H + 'H0Z';
    rects.forEach(function (r) { d += 'M' + r.x + ' ' + r.y + 'h' + r.w + 'v' + r.h + 'h' + (-r.w) + 'Z'; });
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '"><path fill="#fff" fill-rule="evenodd" d="' + d + '"/></svg>';
  }
  /* Gemalte Kanten: weiche dunkle Fuge + Messing-Firnis-Lichtkante um jede Öffnung (liegt auf der Schablone, ebenfalls maskiert). */
  function bevelSvg(W, H, rects) {
    var g = rects.map(function (r) {
      var z = r.zone === 'front' ? '#c99a52' : r.zone === 'nml' ? '#8f7a52' : '#b58a4a';
      return '<rect x="' + (r.x - 3) + '" y="' + (r.y - 3) + '" width="' + (r.w + 6) + '" height="' + (r.h + 6) + '" rx="5" fill="none" stroke="#0b0603" stroke-opacity=".75" stroke-width="7" filter="url(#b)"/>' +
        '<rect x="' + (r.x - 5) + '" y="' + (r.y - 5) + '" width="' + (r.w + 10) + '" height="' + (r.h + 10) + '" rx="6" fill="none" stroke="' + z + '" stroke-opacity=".38" stroke-width="1.6" filter="url(#s)"/>';
    }).join('');
    return '<svg xmlns="http://www.w3.org/2000/svg" class="ot-bevel" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">' +
      '<defs><filter id="b" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="2.2"/></filter>' +
      '<filter id="s"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.5"/></filter></defs>' + g + '</svg>';
  }
  var lastSig = '';
  function layers(world) {
    var light = world.querySelector(':scope > .ot-slotlight'), st = world.querySelector(':scope > .ot-stencil');
    if (!light) { light = document.createElement('div'); light.className = 'ot-slotlight'; light.setAttribute('aria-hidden', 'true'); }
    if (!st) { st = document.createElement('div'); st.className = 'ot-stencil'; st.setAttribute('aria-hidden', 'true'); }
    var desk = world.querySelector(':scope > .ot-desk');
    var after = desk ? desk.nextSibling : world.firstChild;
    // Nicht bei jedem Sync umhängen: sonst beobachtet der MutationObserver seine
    // eigenen world-childList-Änderungen und startet endlos neue Frames.
    if (after !== light) world.insertBefore(light, after);
    if (light.nextSibling !== st) world.insertBefore(st, light.nextSibling);
    return { light: light, stencil: st };
  }
  function sync(world) {
    if (!world) return null;
    var L = layers(world), rects = measure(world);
    var W = Math.round(world.offsetWidth || 1760), H = Math.round(world.offsetHeight || 1389);
    var sig = W + 'x' + H + '|' + rects.map(function (r) { return r.row + r.index + ':' + r.x + ',' + r.y + ',' + r.w + ',' + r.h; }).join(';');
    if (sig !== lastSig || !L.stencil.firstChild) {
      lastSig = sig;
      var url = 'url("data:image/svg+xml;utf8,' + encodeURIComponent(maskSvg(W, H, rects)) + '")';
      L.stencil.style.webkitMaskImage = url; L.stencil.style.maskImage = url;
      L.stencil.style.webkitMaskSize = L.stencil.style.maskSize = W + 'px ' + H + 'px';
      L.stencil.style.width = W + 'px'; L.stencil.style.height = H + 'px';
      L.stencil.innerHTML = bevelSvg(W, H, rects);
      L.stencil.setAttribute('data-holes', String(rects.length));
      L.light.style.width = W + 'px'; L.light.style.height = H + 'px';
      L.light.innerHTML = rects.map(function (r) {
        return '<div class="ot-hole z-' + r.zone + '" data-row="' + r.row + '" data-i="' + r.index + '" style="left:' + r.x + 'px;top:' + r.y + 'px;width:' + r.w + 'px;height:' + r.h + 'px"></div>';
      }).join('');
    }
    // Statusklassen spiegeln (Licht hinter der Schablone)
    var holes = L.light.children;
    rects.forEach(function (r, i) {
      var hEl = holes[i]; if (!hEl) return;
      var cls = 'ot-hole z-' + r.zone;
      MIRROR.forEach(function (c) { if (r.el.classList.contains(c)) cls += ' is-' + c; });
      if (hEl.className !== cls) hEl.className = cls;
    });
    return rects;
  }
  function remove(world) {
    if (!world) return;
    world.querySelectorAll(':scope > .ot-slotlight, :scope > .ot-stencil').forEach(function (e) { e.remove(); });
    lastSig = '';
  }
  /* Klassenwechsel (z. B. drop-ok beim Ziehen) ohne Neurender: gedrosselt nachziehen. */
  var mo = null, pending = 0;
  function observe(world) {
    if (mo || !global.MutationObserver || !world) return;
    mo = new MutationObserver(function (list) {
      for (var k = 0; k < list.length; k++) { var t = list[k].target; if (t && t.closest && t.closest('.ot-slotlight, .ot-stencil')) continue; schedule(world); return; }
    });
    mo.observe(world, { subtree: true, attributes: true, attributeFilter: ['class'], childList: true });
  }
  function schedule(world) {
    if (pending) return;
    var raf = global.requestAnimationFrame || function (f) { return setTimeout(f, 16); };
    pending = raf(function () { pending = 0; if (world.isConnected) sync(world); });
  }
  function unobserve() { if (mo) { mo.disconnect(); mo = null; } }
  global.DCStencil = { sync: sync, remove: remove, measure: measure, observe: observe, unobserve: unobserve, _maskSvg: maskSvg, ROW_IDS: ROW_IDS, MIRROR: MIRROR };
})(typeof window !== 'undefined' ? window : globalThis);
