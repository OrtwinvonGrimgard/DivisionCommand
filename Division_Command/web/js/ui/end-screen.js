/* Terminal presentation only. App owns lifecycle, networking and logging. */
(function (global) {
  'use strict';
  var root = null, background = [], previousFocus = null;
  function terminal(st) { return !!st && (st.winner != null || st.phase === 'gameover'); }
  function result(st, mode, you) {
    if (st.winner == null) return 'UNENTSCHIEDEN';
    if (/bot.*bot|simulation|spectator/i.test((mode || '') + ' ' + (st.mode || '')) || st.botVsBot) {
      var p = st.players[st.winner];
      return 'SIEGER: Seite ' + (st.winner + 1) + ' — ' + (p.nation || p.name || '');
    }
    return st.winner === you ? 'GEWONNEN' : 'VERLOREN';
  }
  function reset() {
    if (root) root.remove(); root = null;
    background.forEach(function (entry) {
      entry.el.inert = entry.inert;
      if (entry.hidden == null) entry.el.removeAttribute('aria-hidden');
      else entry.el.setAttribute('aria-hidden', entry.hidden);
    });
    background = [];
    document.body.classList.remove('dc-game-ended');
    if (previousFocus && previousFocus.isConnected) previousFocus.focus();
    previousFocus = null;
  }
  function show(st, opts) {
    if (!terminal(st)) return;
    if (root) return; // don't reset focus on repeated renders / network snapshots
    opts = opts || {};
    previousFocus = document.activeElement;
    root = document.createElement('section'); root.id = 'dc-end-screen';
    root.className = 'dc-end-screen'; root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true'); root.setAttribute('aria-labelledby', 'dc-end-heading');
    root.setAttribute('aria-describedby', 'dc-end-reason');
    var panel = document.createElement('div'); panel.className = 'dc-end-panel';
    var kicker = document.createElement('p'); kicker.className = 'dc-end-kicker'; kicker.textContent = 'PARTIE BEENDET';
    var title = document.createElement('h1'); title.id = 'dc-end-heading';
    title.textContent = result(st, opts.mode, opts.you);
    var reason = document.createElement('p'); reason.id = 'dc-end-reason'; reason.textContent = st.endReason || 'Partie beendet';
    var score = document.createElement('p'); score.className = 'dc-end-score';
    score.textContent = st.players.map(function (p, i) { return (p.name || ('Seite ' + (i + 1))) + ': ' + (p.vp || 0) + ' SP'; }).join('  ·  ');
    var buttons = document.createElement('div'); buttons.className = 'dc-end-buttons';
    function button(id, text, cb) {
      var b = document.createElement('button'); b.type = 'button'; b.id = id; b.textContent = text;
      b.onclick = function () { if (cb) cb(); }; buttons.appendChild(b); return b;
    }
    var first = button('dc-end-again', opts.lan ? 'Zur Lobby' : 'Erneut spielen', opts.onAgain);
    button('dc-end-menu', 'Zurück zum Menü', opts.onMenu);
    [kicker, title, reason, score, buttons].forEach(function (el) { panel.appendChild(el); });
    root.appendChild(panel); document.body.appendChild(root);
    document.body.classList.add('dc-game-ended');
    Array.prototype.forEach.call(document.body.children, function (el) {
      if (el === root || /^(SCRIPT|STYLE|LINK|TEMPLATE)$/.test(el.tagName)) return;
      background.push({ el: el, inert: !!el.inert, hidden: el.getAttribute('aria-hidden') });
      el.inert = true; el.setAttribute('aria-hidden', 'true');
    });
    root.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') { ev.preventDefault(); first.focus(); }
      if (ev.key === 'Tab') {
        var list = buttons.querySelectorAll('button');
        if (ev.shiftKey && document.activeElement === list[0]) { ev.preventDefault(); list[list.length - 1].focus(); }
        else if (!ev.shiftKey && document.activeElement === list[list.length - 1]) { ev.preventDefault(); list[0].focus(); }
      }
    });
    first.focus();
  }
  global.DCEndScreen = { terminal: terminal, result: result, show: show, reset: reset };
})(window);
