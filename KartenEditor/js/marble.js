/**
 * Marmor — gleiche Pipeline wie tools/marble.py
 * intern 320px, Warp in Pixeln, dann hochskalieren, Helligkeit 0.78, Kontrast 1.08, 10 % Schwarz.
 */
(function (g) {
  'use strict';
  var BRIGHTNESS = 0.78;
  var CONTRAST = 1.08;
  var VEIL = 26;
  var QUARTZ = 0.18;

  function mulberry(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      var t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function nameSeed(name) {
    var s = 2166136261;
    String(name || 'marmor').split('').forEach(function (ch) {
      s ^= ch.charCodeAt(0);
      s = Math.imul(s, 16777619) >>> 0;
    });
    return s || 1;
  }
  function noiseL(tw, th, cell, rnd) {
    var gw = Math.max(2, Math.floor(tw / Math.max(2, cell)) + 1);
    var gh = Math.max(2, Math.floor(th / Math.max(2, cell)) + 1);
    var grid = new Uint8Array(gw * gh);
    var i;
    for (i = 0; i < grid.length; i++) grid[i] = (rnd() * 255) | 0;
    var out = new Uint8Array(tw * th);
    for (var y = 0; y < th; y++) {
      var gy = y / th * (gh - 1);
      var y0 = gy | 0, fy = gy - y0, y1 = Math.min(gh - 1, y0 + 1);
      for (var x = 0; x < tw; x++) {
        var gx = x / tw * (gw - 1);
        var x0 = gx | 0, fx = gx - x0, x1 = Math.min(gw - 1, x0 + 1);
        var a = grid[y0 * gw + x0], b = grid[y0 * gw + x1];
        var c = grid[y1 * gw + x0], d = grid[y1 * gw + x1];
        out[y * tw + x] = (a * (1 - fx) * (1 - fy) + b * fx * (1 - fy) + c * (1 - fx) * fy + d * fx * fy) | 0;
      }
    }
    return out;
  }
  function make(w, h, opts) {
    opts = opts || {};
    var seed = opts.seed != null ? opts.seed : 1;
    var brightness = opts.brightness != null ? opts.brightness : BRIGHTNESS;
    var contrast = opts.contrast != null ? opts.contrast : CONTRAST;
    var veil = opts.veil != null ? opts.veil : VEIL;
    var quartz = opts.quartz != null ? opts.quartz : QUARTZ;
    var rnd = mulberry(seed >>> 0);
    var tw = 320;
    var th = Math.max(160, (320 * h / Math.max(1, w)) | 0);
    var n1 = noiseL(tw, th, 26, rnd);
    var n2 = noiseL(tw, th, 16, rnd);
    var n3 = noiseL(tw, th, 9, rnd);
    var n4 = noiseL(tw, th, 40, rnd);
    var qcut = 0.78 + (1 - quartz) * 0.16;
    var small = document.createElement('canvas');
    small.width = tw; small.height = th;
    var sctx = small.getContext('2d');
    var img = sctx.createImageData(tw, th);
    var d = img.data;
    for (var y = 0; y < th; y++) {
      for (var x = 0; x < tw; x++) {
        var i = y * tw + x;
        var wx = x + (((n1[i] - 128) * 0.62) | 0);
        var wy = y + (((n2[i] - 128) * 0.48) | 0);
        wx = ((wx % tw) + tw) % tw;
        wy = ((wy % th) + th) % th;
        var v = n3[wy * tw + wx] / 255;
        var ridge = 1 - Math.abs(v * 2 - 1);
        ridge *= ridge;
        var g = 0.035 + ridge * 0.14 + n4[i] / 255 * 0.04;
        if (ridge > qcut && n1[i] > 188) g = 0.32 + ridge * 0.38 + n2[i] / 255 * 0.08;
        var gv = Math.max(0, Math.min(255, g * 255));
        var o = i * 4;
        d[o] = gv;
        d[o + 1] = gv * 0.90;
        d[o + 2] = gv * 0.84;
        d[o + 3] = 255;
      }
    }
    sctx.putImageData(img, 0, 0);
    var cnv = document.createElement('canvas');
    cnv.width = w; cnv.height = h;
    var ctx = cnv.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.filter = 'blur(1.8px)';
    ctx.drawImage(small, 0, 0, w, h);
    ctx.filter = 'none';
    var full = ctx.getImageData(0, 0, w, h);
    var p = full.data;
    var a = (typeof veil === 'number' && veil > 1 ? veil : veil * 255) / 255;
    for (var k = 0; k < p.length; k += 4) {
      var r = p[k] * brightness, gg = p[k + 1] * brightness, b = p[k + 2] * brightness;
      r = (r - 128) * contrast + 128;
      gg = (gg - 128) * contrast + 128;
      b = (b - 128) * contrast + 128;
      p[k] = Math.max(0, Math.min(255, r * (1 - a)));
      p[k + 1] = Math.max(0, Math.min(255, gg * (1 - a)));
      p[k + 2] = Math.max(0, Math.min(255, b * (1 - a)));
    }
    ctx.putImageData(full, 0, 0);
    return cnv;
  }
  g.DCMarble = {
    BRIGHTNESS: BRIGHTNESS,
    CONTRAST: CONTRAST,
    VEIL: VEIL,
    QUARTZ: QUARTZ,
    nameSeed: nameSeed,
    make: make
  };
})(window);
