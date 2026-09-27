// LAN: Host rechnet allein. Gast sendet Absichten, zeigt sie vorläufig, wartet auf seq.
(function (global) {
  'use strict';

  var ws = null;
  var role = null;
  var hooked = false;
  var closing = false;
  var lastSeq = -1;
  var cid = 0;
  var inflight = null;
  var outbox = [];

  function hint(text) {
    var el = document.getElementById('hint');
    if (el && text) el.textContent = text;
  }

  function hookEngine() {
    var eng = global.dcGetEngine && global.dcGetEngine();
    if (!eng) return;
    if (eng._dcNetHooked) return;
    var raw = eng.dispatch.bind(eng);
    eng.dispatch = function (action) {
      if (role === 'guest') {
        queueGuest(action);
        return { ok: true, sent: true };
      }
      var res = raw(action);
      if (!eng.state) eng.state = {};
      eng.state.seq = (eng.state.seq || 0) + 1;
      broadcastState(action && action.clientId);
      if (global.dcRender) global.dcRender();
      if (global.dcPresentNewEvents) global.dcPresentNewEvents();
      return res;
    };
    eng._dcNetHooked = true;
    hooked = true;
  }

  function queueGuest(action) {
    if (!action) return;
    action.player = 1;
    action.clientId = action.clientId || ('g' + (++cid));
    outbox.push(action);
    hint('Wird übertragen…');
    flushGuest();
  }

  function flushGuest() {
    if (inflight || !outbox.length) return;
    if (!ws || ws.readyState !== 1) return;
    inflight = outbox.shift();
    ws.send(JSON.stringify({ type: 'action', action: inflight }));
  }

  function broadcastState(ackId) {
    var eng = global.dcGetEngine && global.dcGetEngine();
    if (!eng || !ws || ws.readyState !== 1) return;
    if (!eng.state.seq) eng.state.seq = 1;
    ws.send(JSON.stringify({
      type: 'state',
      seq: eng.state.seq,
      ack: ackId || null,
      state: eng.getState(),
      log: (eng.log || []).slice(-40)
    }));
  }

  function applyGuestState(msg) {
    var incoming = (msg.seq != null ? msg.seq : (msg.state && msg.state.seq)) || 0;
    if (lastSeq >= 0 && incoming < lastSeq) return;
    if (lastSeq >= 0 && incoming > lastSeq + 1) {
      if (ws && ws.readyState === 1) ws.send(JSON.stringify({ type: 'want-state' }));
    }
    lastSeq = incoming;
    inflight = null;
    if (global.dcSetMode) global.dcSetMode('lan');
    if (global.dcSetYou) global.dcSetYou(1);
    if (global.dcSetState) global.dcSetState(msg.state);
    if (msg.log) {
      var eng = global.dcGetEngine && global.dcGetEngine();
      if (eng) eng.log = msg.log;
    }
    hookEngine();
    hint('');
    flushGuest();
  }

  function say(msg) {
    var el = document.getElementById('lan-error') || document.getElementById('boot-error');
    if (el) el.textContent = msg;
  }

  function connect(url, name, asRole, onLobby) {
    role = asRole;
    lastSeq = -1;
    inflight = null;
    outbox = [];
    if (ws) {
      closing = true;
      try { ws.close(); } catch (e) {}
      ws = null;
      hooked = false;
      closing = false;
    }
    say('Verbinde mit ' + url + ' …');
    try {
      ws = new WebSocket(url);
    } catch (err) {
      say('WebSocket ungültig: ' + err);
      return null;
    }
    var opened = false;
    var timer = setTimeout(function () {
      if (!opened) say('Keine Antwort auf ' + url + ' — Firewall Port 8766? firewall.bat als Admin.');
    }, 3500);
    ws.onopen = function () {
      opened = true;
      clearTimeout(timer);
      say('Verbunden. Warte auf Lobby …');
      ws.send(JSON.stringify({ type: 'hello', name: name }));
      if (asRole === 'guest') {
        setTimeout(function () {
          if (ws && ws.readyState === 1) ws.send(JSON.stringify({ type: 'want-state' }));
        }, 400);
      }
    };
    ws.onerror = function () {
      say('Verbindung fehlgeschlagen (' + url + '). Auf dem Host: Firewall TCP 8766 öffnen.');
    };
    ws.onmessage = function (ev) {
      var msg = JSON.parse(ev.data);
      if (msg.type === 'sys' || msg.type === 'leave') {
        var eng = global.dcGetEngine && global.dcGetEngine();
        if (eng && eng._log) eng._log(msg.msg || 'Gegner hat getrennt.');
        else if (eng && eng.log) eng.log.push({ t: 0, a: 0, msg: msg.msg || 'Gegner hat getrennt.' });
        if (global.dcRender) global.dcRender();
        hint(msg.msg || 'Gegner hat getrennt.');
      }
      if (msg.type === 'lobby' && onLobby) onLobby(msg);
      if (msg.type === 'state' && role === 'guest') applyGuestState(msg);
      if (msg.type === 'boot' && role === 'guest') applyGuestState(msg);
      if (msg.type === 'action' && role === 'host') {
        hookEngine();
        var eng = global.dcGetEngine && global.dcGetEngine();
        if (eng) {
          try {
            msg.action.player = 1;
            eng.dispatch(msg.action);
          } catch (err) {
            if (!eng.state.seq) eng.state.seq = 0;
            eng.state.seq += 1;
            broadcastState(msg.action && msg.action.clientId);
            if (global.dcRender) global.dcRender();
          }
        }
      }
      if (msg.type === 'want-state' && role === 'host') {
        hookEngine();
        broadcastState();
      }
    };
    ws.onclose = function () {
      if (closing) return;
      if (!opened) say('Getrennt ohne Handshake. Host erreichbar? Port 8766 frei?');
      else say('Verbindung getrennt.');
    };
    return ws;
  }

  function startHostMatch(nameHost, nameGuest) {
    if (global.dcSetMode) global.dcSetMode('lan');
    if (global.dcStart) global.dcStart();
    if (global.dcSetMode) global.dcSetMode('lan');
    hookEngine();
    if (global.dcSetNames) global.dcSetNames(nameHost, nameGuest || 'Gast');
    if (global.dcSetYou) global.dcSetYou(0);
    var eng = global.dcGetEngine && global.dcGetEngine();
    if (eng && eng.state) eng.state.seq = 1;
    broadcastState();
  }

  function notifyLeave(text) {
    if (ws && ws.readyState === 1) {
      ws.send(JSON.stringify({ type: 'leave', msg: (text || 'hat die Verbindung getrennt') }));
    }
  }

  function disconnect() {
    notifyLeave('hat die Lobby verlassen');
    closing = true;
    hooked = false;
    role = null;
    inflight = null;
    outbox = [];
    if (ws) {
      try { ws.close(); } catch (e) {}
      ws = null;
    }
    closing = false;
  }

  function sendReady(on) {
    if (ws && ws.readyState === 1) ws.send(JSON.stringify({ type: 'ready', ready: !!on }));
  }
  global.DCNet = {
    connect: connect,
    hookEngine: hookEngine,
    startHostMatch: startHostMatch,
    broadcastState: broadcastState,
    disconnect: disconnect,
    notifyLeave: notifyLeave,
    sendReady: sendReady
  };
})(window);
