/**
 * Tisch-Protokollfenster: Tabs "Protokoll" | "Chat". Der LAN-Chat lebt nur hier (vorher im Playtest-Panel).
 * Genau ein DCNet.onChat-Abo pro Seite; Verlauf nur im Sitzungsspeicher (__dcPlayChatBuf), nie im Partielog/Export.
 */
(function (global) {
  'use strict';
  var tab = 'log';
  var unread = 0;
  var unsub = null;
  var bound = false;
  var MAX = 400; // wie bisher (Netz kappt ebenfalls auf 400)

  function $(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function live() { return !!(global.DCNet && DCNet.isConnected && DCNet.isConnected()); }
  function buf() { if (!global.__dcPlayChatBuf) global.__dcPlayChatBuf = []; return global.__dcPlayChatBuf; }

  function messages() {
    return buf().slice(); // eigener Sitzungsverlauf, nicht im Partielog
  }

  function lineHtml(m) {
    return '<div class="pt-chat-line"><span class="pt-chat-meta">' + esc(m.name) + ' · ' +
      esc((m.t || '').replace('T', ' ').slice(11, 19)) + '</span><div>' + esc(m.text) + '</div></div>';
  }

  function updateTabs() {
    var bp = $('log-tab-proto'), bc = $('log-tab-chat'), pl = $('log'), pc = $('log-chat');
    if (!bp || !bc || !pl || !pc) return;
    var on = tab === 'chat';
    bp.classList.toggle('on', !on); bc.classList.toggle('on', on);
    bp.setAttribute('aria-selected', String(!on)); bc.setAttribute('aria-selected', String(on));
    bp.tabIndex = on ? -1 : 0; bc.tabIndex = on ? 0 : -1;
    pl.hidden = on; pc.hidden = !on;
    bc.classList.toggle('disabled', !live());
    var badge = $('log-chat-unread');
    if (badge) { badge.hidden = !unread; badge.textContent = unread > 9 ? '9+' : String(unread); }
  }

  function renderChat() {
    var pane = $('log-chat');
    if (!pane) return;
    if (!live()) {
      pane.innerHTML = '<p class="pt-hint tiny">Chat ist nur im <strong>LAN-Modus</strong> aktiv, solange eine Verbindung besteht.</p>' +
        (messages().length ? '<div class="pt-chat-log">' + messages().map(lineHtml).join('') + '</div>' : '');
      return;
    }
    var keep = $('log-chat-in') ? $('log-chat-in').value : '';
    pane.innerHTML = '<div class="pt-chat-log" id="log-chat-log" aria-live="polite">' +
      (messages().map(lineHtml).join('') || '<p class="tiny">Noch keine Nachrichten.</p>') + '</div>' +
      '<div class="pt-chat-compose"><input id="log-chat-in" maxlength="' + MAX + '" placeholder="Nachricht an den Mitspieler…" autocomplete="off" aria-label="Chatnachricht">' +
      '<button type="button" class="primary" id="log-chat-send">Senden</button></div>';
    var log = $('log-chat-log'); log.scrollTop = log.scrollHeight;
    $('log-chat-in').value = keep;
  }

  function setTab(name) {
    tab = name === 'chat' ? 'chat' : 'log';
    if (tab === 'chat') { unread = 0; renderChat(); }
    updateTabs();
  }

  function onChatMessage(msg, fromSelf) {
    if (!msg || !msg.text) return;
    buf().push(msg);
    if (tab === 'chat') renderChat();
    else if (!fromSelf) unread++;
    updateTabs();
  }

  function send() {
    var inp = $('log-chat-in');
    if (!inp || !live()) return false;
    var text = (inp.value || '').trim();
    if (!text) return false;
    var name = 'Spieler';
    try {
      var eng = global.dcGetEngine && dcGetEngine();
      var you = global.dcGetYou ? dcGetYou() : 0;
      if (eng) name = eng.player(you).name || name;
    } catch (e) { if (typeof console !== 'undefined' && console.debug) console.debug('[dc] table-chat.js: ignorierter Fehler', e); }
    var payload = { name: name, text: text.slice(0, MAX), player: global.dcGetYou ? dcGetYou() : 0, t: new Date().toISOString() };
    inp.value = '';
    if (global.DCNet && DCNet.sendChat) DCNet.sendChat(payload);
    onChatMessage(payload, true);
    var again = $('log-chat-in'); if (again) again.focus();
    return true;
  }

  var lastLive = null;
  /* Leicht: nur bei Wechsel des Verbindungsstatus neu aufbauen (Fokus/Eingabe bleiben sonst erhalten). */
  function refresh() {
    bind();
    var l = live();
    if (l !== lastLive) { lastLive = l; if (tab === 'chat') renderChat(); }
    updateTabs();
  }

  function subscribe() {
    if (unsub || !(global.DCNet && DCNet.onChat)) return;
    unsub = DCNet.onChat(function (msg) { onChatMessage(msg, false); });
  }

  function bind() {
    subscribe();
    if (bound) return;
    var bp = $('log-tab-proto'), bc = $('log-tab-chat'), pc = $('log-chat');
    if (!bp || !bc || !pc) return;
    bound = true;
    bp.addEventListener('click', function () { setTab('log'); });
    bc.addEventListener('click', function () { setTab('chat'); });
    [bp, bc].forEach(function (b) {
      b.addEventListener('keydown', function (ev) {
        if (ev.key !== 'ArrowLeft' && ev.key !== 'ArrowRight') return;
        ev.preventDefault(); setTab(tab === 'chat' ? 'log' : 'chat');
        (tab === 'chat' ? bc : bp).focus();
      });
    });
    // Delegiert am statischen Container: überlebt Re-Render, nie doppelt gebunden.
    pc.addEventListener('click', function (ev) { if (ev.target && ev.target.id === 'log-chat-send') send(); });
    pc.addEventListener('keydown', function (ev) {
      if (ev.target && ev.target.id === 'log-chat-in' && ev.key === 'Enter') { ev.preventDefault(); ev.stopPropagation(); send(); }
    });
    updateTabs();
  }

  global.DCTableChat = {
    bind: bind, setTab: setTab, send: send, onChatMessage: onChatMessage, refresh: refresh,
    tab: function () { return tab; }, unread: function () { return unread; }, _subscribed: function () { return !!unsub; }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})(typeof window !== 'undefined' ? window : globalThis);
