(function (global) {
  'use strict';
  var box, on = false, frames = 0, last = 0, fps = 0;
  var gpu = '—';
  try {
    var c = document.createElement('canvas');
    var gl = c.getContext('webgl') || c.getContext('experimental-webgl');
    if (gl) {
      var ext = gl.getExtension('WEBGL_debug_renderer_info');
      gpu = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : (gl.getParameter(gl.RENDERER) || 'WebGL');
    }
  } catch (e) {}
  var cores = navigator.hardwareConcurrency || '—';

  function heap() {
    var m = performance.memory;
    if (!m) return 'n/a (Firefox)';
    function mb(n) { return (n / 1048576).toFixed(1) + ' MB'; }
    return mb(m.usedJSHeapSize) + ' / ' + mb(m.totalJSHeapSize);
  }

  function tick(t) {
    if (!on) return;
    frames += 1;
    if (!last) last = t;
    if (t - last >= 500) {
      fps = Math.round((frames * 1000) / (t - last));
      frames = 0;
      last = t;
      if (box) {
        box.innerHTML =
          '<b>FPS</b> ' + fps +
          '<br><b>Kerne</b> ' + cores + ' (logisch)' +
          '<br><b>JS-Speicher</b> ' + heap() +
          '<br><b>GPU</b> ' + gpu +
          '<br><span class="tiny">CPU-% / GPU-% / RAM des PCs: der Browser liefert das nicht.</span>';
      }
    }
    requestAnimationFrame(tick);
  }

  function set(v) {
    on = !!v;
    if (!box) {
      box = document.createElement('div');
      box.id = 'perf-hud';
      document.body.appendChild(box);
    }
    box.style.display = on ? 'block' : 'none';
    if (on) { last = 0; frames = 0; requestAnimationFrame(tick); }
  }

  global.DCPerf = { set: set };
})(window);
