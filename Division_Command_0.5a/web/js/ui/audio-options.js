/* Separate music/SFX levels; delegated input also covers dynamically mounted in-game options. */
(function () {
  'use strict';
  function read(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function settings() { try { return JSON.parse(read('dc_settings') || '{}') || {}; } catch (e) { return {}; } }
  function level(value, fallback) {
    if (value == null || value === '' || !isFinite(Number(value))) return fallback;
    return Math.round(Math.max(0, Math.min(100, Number(value))));
  }
  var saved = settings();
  var music = level(saved.vol == null ? read('dc_vol') : saved.vol, 55);
  // Migrate legacy shared volume to both channels once; subsequent changes are independent.
  var sfx = level(saved.sfxVol == null ? read('dc_sfx_vol') : saved.sfxVol, music);
  function paint() {
    [['opt-vol', music], ['opt-sfx', sfx]].forEach(function (pair) {
      ['', '-ingame'].forEach(function (suffix) {
        var id = pair[0] + suffix;
        var input = document.getElementById(id), output = document.getElementById(id + '-value');
        if (input) input.value = String(pair[1]);
        if (output) output.textContent = pair[1] + '%';
      });
    });
  }
  function persist() {
    try {
      var o = settings(); o.vol = String(music); o.sfxVol = String(sfx);
      localStorage.setItem('dc_settings', JSON.stringify(o));
      localStorage.setItem('dc_vol', String(music));
      localStorage.setItem('dc_sfx_vol', String(sfx));
    } catch (e) { /* blocked storage must not break controls or play */ }
  }
  function refresh() {
    try {
      var audio = window.DCAudio;
      if (audio && typeof audio.refreshVolumes === 'function') {
        var p = audio.refreshVolumes();
        if (p && typeof p.then === 'function') Promise.resolve(p).catch(function () {});
      }
    } catch (e) { /* optional audio */ }
  }
  document.addEventListener('input', function (ev) {
    var id = ev.target && ev.target.id;
    if (!/^opt-(vol|sfx)(-ingame)?$/.test(id || '')) return;
    if (id.indexOf('opt-sfx') === 0) sfx = level(ev.target.value, sfx);
    else music = level(ev.target.value, music);
    paint(); persist(); refresh();
  }, true);
  // The match template is mounted only on game start; sync new controls before they are used.
  if (typeof MutationObserver !== 'undefined') {
    new MutationObserver(function (records) {
      if (records.some(function (r) { return Array.prototype.some.call(r.addedNodes, function (n) {
        return n.nodeType === 1 && (n.matches('input[id^="opt-"]') || n.querySelector('input[id^="opt-"]'));
      }); })) paint();
    }).observe(document.body, { childList: true, subtree: true });
  }
  paint(); persist(); refresh();
})();
