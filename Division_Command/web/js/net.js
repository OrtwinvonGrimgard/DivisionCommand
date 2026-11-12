/**
 * LAN-Protokoll: Der Host rechnet allein (autoritative Engine).
 * Der Gast sendet Absichten, zeigt sie vorläufig und wartet auf die Sequenznummer.
 * Keine Regelauswertung auf der Gastseite.
 * Export: `window.DCNet`.
 */
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

  /**
   * Zeigt einen kurzen Hinweis in der Statuszeile.
   * @param {string} text
   */
  function hint(text) {
    var el = document.getElementById('hint');
    if (el && text) el.textContent = text;
  }

  /**
   * Hängt sich einmalig an `engine.dispatch`: Der Gast schickt Absichten, der Host rechnet und sendet den gefilterten Stand.
   */
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

  /**
   * Reiht eine Gast-Aktion ein (immer Spieler 1) und sendet sie, sobald die vorige bestätigt ist.
   * @param {object} action
   */
  function queueGuest(action) {
    if (!action) return;
    action.player = 1;
    action.clientId = action.clientId || ('g' + (++cid));
    outbox.push(action);
    hint('Wird übertragen…');
    flushGuest();
  }

  /**
   * Sendet die nächste wartende Gast-Aktion, wenn keine unterwegs ist.
   */
  function flushGuest() {
    if (inflight || !outbox.length) return;
    if (!ws || ws.readyState !== 1) return;
    inflight = outbox.shift();
    ws.send(JSON.stringify({ type: 'action', action: inflight }));
  }

  /**
   * Host: sendet den Stand aus Sicht des Gastes (`getStateFor(1)`) samt gefiltertem Protokoll.
   * @param {string} [ackId] bestätigte Client-Aktion
   */
  function broadcastState(ackId) {
    var eng = global.dcGetEngine && global.dcGetEngine();
    if (!eng || !ws || ws.readyState !== 1) return;
    if (!eng.state.seq) eng.state.seq = 1;
    ws.send(JSON.stringify({
      type: 'state',
      seq: eng.state.seq,
      ack: ackId || null,
      // t283: Der Gast (Spieler 1) bekommt nur seine Sicht: keine Hand, kein Deck, keine verdeckten Karten des Hosts.
      state: eng.getStateFor ? eng.getStateFor(1) : eng.getState(),
      log: eng.logFor ? eng.logFor(1, 40) : (eng.log || []).slice(-40)
    }));
  }

  /**
   * Gast: übernimmt einen Host-Stand in Sequenzreihenfolge und fordert bei Lücken neu an.
   * @param {object} msg `state`- oder `boot`-Nachricht
   */
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

  /**
   * Schreibt eine Verbindungsmeldung in den LAN-Dialog.
   * @param {string} msg
   */
  function say(msg) {
    var el = document.getElementById('lan-error') || document.getElementById('boot-error');
    if (el) el.textContent = msg;
  }

  /**
   * Baut die WebSocket-Verbindung zur Lobby auf.
   * @param {string} url ws://host:port
   * @param {string} name Anzeigename
   * @param {string} asRole `host` oder `guest`
   * @param {function(object)} [onLobby] Lobby-Rückruf
   * @returns {WebSocket|null}
   */
  function connect(url, name, asRole, onLobby) {
    role = asRole;
    lastSeq = -1;
    inflight = null;
    outbox = [];
    if (ws) {
      closing = true;
      try { ws.close(); } catch (e) { if (typeof console !== 'undefined' && console.debug) console.debug('[dc] net.js: ignorierter Fehler', e); }
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
            var act = eng.resolveAliases ? eng.resolveAliases(msg.action || {}) : (msg.action || {});
            act.player = 1;
            eng.dispatch(act);
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
      if (msg.type === 'chat') {
        emitChat({
          name: msg.name || 'Mitspieler',
          text: String(msg.text || '').slice(0, 400),
          player: msg.player != null ? msg.player : null,
          t: msg.t || new Date().toISOString()
        });
      }
    };
    ws.onclose = function () {
      if (closing) return;
      if (!opened) say('Getrennt ohne Handshake. Host erreichbar? Port 8766 frei?');
      else say('Verbindung getrennt.');
    };
    return ws;
  }

  /**
   * Host: startet die Partie und sendet den ersten Stand.
   * @param {string} nameHost
   * @param {string} [nameGuest]
   */
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

  /**
   * Meldet dem Gegenüber das Verlassen.
   * @param {string} [text]
   */
  function notifyLeave(text) {
    if (ws && ws.readyState === 1) {
      ws.send(JSON.stringify({ type: 'leave', msg: (text || 'hat die Verbindung getrennt') }));
    }
  }

  /**
   * Trennt die Verbindung und setzt den Netzstatus zurück.
   */
  function disconnect() {
    notifyLeave('hat die Lobby verlassen');
    closing = true;
    hooked = false;
    role = null;
    inflight = null;
    outbox = [];
    if (ws) {
      try { ws.close(); } catch (e) { if (typeof console !== 'undefined' && console.debug) console.debug('[dc] net.js: ignorierter Fehler', e); }
      ws = null;
    }
    closing = false;
  }

  /**
   * Setzt den Bereit-Status in der Lobby.
   * @param {boolean} on
   */
  function sendReady(on) {
    if (ws && ws.readyState === 1) ws.send(JSON.stringify({ type: 'ready', ready: !!on }));
  }

  var chatListeners = [];
  /**
   * Abonniert Chatnachrichten.
   * @param {function(object)} fn
   * @returns {function()} Abmelden
   */
  function onChat(fn) {
    if (typeof fn !== 'function') return function () {};
    chatListeners.push(fn);
    return function () {
      chatListeners = chatListeners.filter(function (f) { return f !== fn; });
    };
  }
  /**
   * Verteilt eine Chatnachricht an alle Abonnenten.
   * @param {object} msg
   */
  function emitChat(msg) {
    chatListeners.slice().forEach(function (fn) {
      try { fn(msg); } catch (e) { if (global.console) console.warn('[net] Chat-Abonnent fehlgeschlagen:', e); }
    });
  }
  /**
   * Sendet eine Chatnachricht (max. 400 Zeichen).
   * @param {object} payload `{name, text, player, t}`
   * @returns {boolean} gesendet
   */
  function sendChat(payload) {
    if (!ws || ws.readyState !== 1) return false;
    var msg = {
      type: 'chat',
      name: (payload && payload.name) || 'Spieler',
      text: String((payload && payload.text) || '').slice(0, 400),
      player: payload && payload.player != null ? payload.player : null,
      t: (payload && payload.t) || new Date().toISOString()
    };
    ws.send(JSON.stringify(msg));
    return true;
  }
  /**
   * @returns {boolean} true bei offener Verbindung
   */
  function isConnected() {
    return !!(ws && ws.readyState === 1);
  }
  /**
   * @returns {string|null} `host`, `guest` oder null
   */
  function getRole() { return role; }

  global.DCNet = {
    connect: connect,
    hookEngine: hookEngine,
    startHostMatch: startHostMatch,
    broadcastState: broadcastState,
    disconnect: disconnect,
    notifyLeave: notifyLeave,
    sendReady: sendReady,
    sendChat: sendChat,
    onChat: onChat,
    isConnected: isConnected,
    getRole: getRole
  };
})(window);
