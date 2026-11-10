/**
 * Delegiertes UI-Audio-Feedback (Hover, Klick, Fehler). Keine Spielzüge,
 * kein `dispatch`, kein Rendern. Wird von app.js und Menüs genutzt.
 */
(function () {
  'use strict';
  var unlocked = false;
  var lastHoverAt = -Infinity;
  var HOVER_COOLDOWN = 100;
  var hoverSelector = 'button, a[href], [role="button"], #hand .card, .slot.filled, .doctrine-card, .pick-card';
  function call(id, gain) {
    if (!unlocked) return;
    try {
      var audio = window.DCAudio;
      if (!audio || typeof audio.playSfx !== 'function') return;
      var result = audio.playSfx(id, { prio: 3, gain: gain });
      if (result && typeof result.then === 'function') Promise.resolve(result).catch(function () {});
    } catch (err) { /* never interfere with clicks or keyboard navigation */ }
  }
  function element(target, selector) {
    return target && target.closest ? target.closest(selector) : null;
  }
  function disabled(el) {
    return !el || el.disabled || el.getAttribute('aria-disabled') === 'true';
  }
  function unlock(ev) {
    if (ev.isTrusted) unlocked = true;
  }
  ['pointerdown', 'keydown', 'click'].forEach(function (type) {
    document.addEventListener(type, unlock, true);
  });
  function enter(ev) {
    var el = element(ev.target, hoverSelector);
    if (!unlocked || disabled(el)) return;
    // pointerover bubbles for children: entering an image/span in the same card isn't a new hover.
    if (el.contains(ev.relatedTarget)) return;
    var now = Date.now();
    if (now - lastHoverAt < HOVER_COOLDOWN) return;
    lastHoverAt = now;
    // Existing dry short UI tick, much softer than a click. Shares the SFX volume/limit.
    call('ui-click', 0.18);
  }
  document.addEventListener('pointerover', enter, true);
  document.addEventListener('focusin', enter, true);
  document.addEventListener('click', function (ev) {
    var el = element(ev.target, 'button, a[href], [role="button"]');
    if (!disabled(el)) call('ui-click', 0.55);
  }, true);
  document.addEventListener('change', function (ev) {
    var el = element(ev.target, 'select, input[type="checkbox"], input[type="radio"]');
    if (!disabled(el)) call('ui-click', 0.4);
  }, true);
})();
