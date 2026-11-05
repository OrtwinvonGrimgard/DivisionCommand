/**
 * Playtest-Panel: Logs | Anmerkungen | Chat
 */
(function (global) {
  'use strict';

  var open = false;
  var tab = 'logs';
  var chatUnsub = null;

  function $(id) { return document.getElementById(id); }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function ensureRoot() {
    var root = $('playtest-panel');
    if (root) return root;
    root = document.createElement('div');
    root.id = 'playtest-panel';
    root.className = 'overlay playtest-overlay';
    root.style.display = 'none';
    root.innerHTML =
      '<div class="modal playtest-modal">' +
      '  <div class="playtest-head">' +
      '    <h2>Playtest</h2>' +
      '    <button type="button" class="playtest-x" id="pt-close" aria-label="Schließen">×</button>' +
      '  </div>' +
      '  <div class="playtest-tabs" role="tablist">' +
      '    <button type="button" class="pt-tab on" data-tab="logs">Logs</button>' +
      '    <button type="button" class="pt-tab" data-tab="notes">Anmerkungen</button>' +
      '    <button type="button" class="pt-tab" data-tab="chat" id="pt-tab-chat">Chat</button>' +
      '  </div>' +
      '  <div class="playtest-body">' +
      '    <section class="pt-pane on" id="pt-pane-logs" data-pane="logs"></section>' +
      '    <section class="pt-pane" id="pt-pane-notes" data-pane="notes"></section>' +
      '    <section class="pt-pane" id="pt-pane-chat" data-pane="chat"></section>' +
      '  </div>' +
      '</div>';
    document.body.appendChild(root);
    root.addEventListener('click', function (ev) {
      if (ev.target === root) hide();
    });
    $('pt-close').onclick = hide;
    root.querySelectorAll('.pt-tab').forEach(function (btn) {
      btn.onclick = function () { setTab(btn.getAttribute('data-tab')); };
    });
    return root;
  }

  function setTab(name) {
    tab = name || 'logs';
    var root = ensureRoot();
    root.querySelectorAll('.pt-tab').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-tab') === tab);
    });
    root.querySelectorAll('.pt-pane').forEach(function (p) {
      p.classList.toggle('on', p.getAttribute('data-pane') === tab);
    });
    if (tab === 'logs') renderLogs();
    if (tab === 'notes') renderNotes();
    if (tab === 'chat') renderChat();
  }

  function lanLive() {
    return !!(global.DCNet && DCNet.isConnected && DCNet.isConnected());
  }

  function renderLogs() {
    var pane = $('pt-pane-logs');
    if (!pane) return;
    pane.innerHTML = '<p class="tiny">Lade …</p>';
    Promise.all([
      DCPlayStore.getAll('games'),
      DCPlayStore.get('meta', 'exportHint')
    ]).then(function (pair) {
      var games = pair[0].slice().sort(function (a, b) {
        return String(b.startedAt || '').localeCompare(String(a.startedAt || ''));
      });
      var html = '';
      html += '<p class="pt-hint">Partien werden lokal im Browser (IndexedDB) gespeichert. ' +
        '<strong>Nicht im Inkognito-Modus</strong> spielen und Websitedaten nicht löschen, sonst sind die Logs weg. ' +
        'Bitte etwa alle <strong>10 Partien</strong> exportieren.</p>';
      if (games.length >= 10) {
        html += '<p class="pt-warn">Hinweis: ' + games.length + ' Partien gespeichert — Export empfohlen.</p>';
      }
      html += '<div class="pt-actions">' +
        '<button type="button" class="primary" id="pt-export">Logs exportieren</button>' +
        '<button type="button" id="pt-export-wipe">Exportieren &amp; danach löschen…</button>' +
        '</div>';
      if (!games.length) {
        html += '<p class="tiny">Noch keine Partien gespeichert.</p>';
      } else {
        html += '<ul class="pt-list">';
        games.forEach(function (g) {
          var end = g.end ? (g.end.aborted ? 'Abbruch' : ('Sieg P' + (g.end.winner != null ? (g.end.winner + 1) : '?'))) : 'offen';
          var nations = (g.players || []).map(function (p) {
            return (p.nation || '?') + ' [' + (p.controller || '?') + ']';
          }).join(' vs ');
          html += '<li><div class="pt-row">' +
            '<strong>' + esc((g.startedAt || '').replace('T', ' ').slice(0, 19)) + '</strong> · ' +
            esc(g.mode || '') + ' · ' + esc(end) +
            '<br><span class="tiny">' + esc(nations) + ' · ' + (g.turns ? g.turns.length : 0) + ' Aktionen · ' +
            esc(g.id) + '</span></div></li>';
        });
        html += '</ul>';
      }
      pane.innerHTML = html;
      $('pt-export').onclick = function () {
        DCPlayStore.exportAll().then(function (r) {
          alert('Export: ' + r.filename + ' (' + r.games.length + ' Partien, ' + r.notes.length + ' Anmerkungen)');
        }).catch(function (e) { alert('Export fehlgeschlagen: ' + e.message); });
      };
      $('pt-export-wipe').onclick = function () {
        if (!confirm('Wirklich exportieren und danach ALLE lokalen Partie-Logs und Anmerkungen löschen?')) return;
        DCPlayStore.exportAll().then(function (r) {
          return Promise.all([
            DCPlayStore.clearStore('games'),
            DCPlayStore.clearStore('notes')
          ]).then(function () {
            alert('Exportiert als ' + r.filename + ' und lokal gelöscht.');
            renderLogs();
          });
        }).catch(function (e) { alert('Fehler: ' + e.message); });
      };
    }).catch(function (e) {
      pane.innerHTML = '<p class="pt-warn">Speicher nicht erreichbar: ' + esc(e.message) +
        '</p><p class="tiny">Inkognito oder blockierte Websitedaten?</p>';
    });
  }

  function renderNotes() {
    var pane = $('pt-pane-notes');
    if (!pane) return;
    var cur = global.DCPlayLogger && DCPlayLogger.getCurrent && DCPlayLogger.getCurrent();
    pane.innerHTML =
      '<label>Kategorie' +
      '<select id="pt-note-cat">' +
      '<option value="anmerkung">Anmerkung</option>' +
      '<option value="idee">Idee</option>' +
      '<option value="bug">Bug</option>' +
      '</select></label>' +
      '<label>Text (max. 500)' +
      '<textarea id="pt-note-text" maxlength="500" rows="4" placeholder="Was ist aufgefallen?"></textarea>' +
      '<div class="pt-counter"><span id="pt-note-count">0</span>/500</div></label>' +
      '<div class="pt-actions"><button type="button" class="primary" id="pt-note-save">Speichern</button></div>' +
      '<p class="tiny" id="pt-note-ctx">' +
      (cur ? ('Aktuelle Partie: ' + esc(cur.id) + ' · Zug/Aktionen: ' + cur.turns.length) : 'Keine laufende Partie — wird ohne Partie-ID gespeichert.') +
      '</p>' +
      '<h3>Bisherige Einträge</h3><ul class="pt-list" id="pt-note-list"><li class="tiny">Lade …</li></ul>';

    var ta = $('pt-note-text');
    var cnt = $('pt-note-count');
    function updCount() { cnt.textContent = String((ta.value || '').length); }
    ta.addEventListener('input', updCount);
    updCount();

    $('pt-note-save').onclick = function () {
      var text = (ta.value || '').trim();
      if (!text) { alert('Bitte Text eingeben.'); return; }
      if (text.length > 500) { alert('Maximal 500 Zeichen.'); return; }
      var note = {
        id: DCPlayStore.uid('note'),
        t: new Date().toISOString(),
        category: $('pt-note-cat').value || 'anmerkung',
        text: text,
        version: global.DC_VERSION || '',
        build: global.DC_BUILD_LABEL || '',
        gameId: cur ? cur.id : null,
        turnIndex: cur ? cur.turns.length : null
      };
      DCPlayStore.put('notes', note).then(function () {
        ta.value = '';
        updCount();
        loadNoteList();
      }).catch(function (e) { alert('Speichern fehlgeschlagen: ' + e.message); });
    };

    function loadNoteList() {
      DCPlayStore.getAll('notes').then(function (notes) {
        notes.sort(function (a, b) { return String(b.t || '').localeCompare(String(a.t || '')); });
        var list = $('pt-note-list');
        if (!notes.length) {
          list.innerHTML = '<li class="tiny">Noch keine Anmerkungen.</li>';
          return;
        }
        list.innerHTML = notes.map(function (n) {
          return '<li><div class="pt-row"><strong>[' + esc(n.category) + ']</strong> ' +
            esc((n.t || '').replace('T', ' ').slice(0, 19)) +
            (n.gameId ? (' · ' + esc(n.gameId)) : '') +
            '<br>' + esc(n.text) + '</div></li>';
        }).join('');
      });
    }
    loadNoteList();
  }

  function renderChat() {
    var pane = $('pt-pane-chat');
    if (!pane) return;
    var live = lanLive();
    var tabBtn = $('pt-tab-chat');
    if (tabBtn) tabBtn.classList.toggle('disabled', !live);
    if (!live) {
      pane.innerHTML = '<p class="pt-hint">Chat ist nur im <strong>LAN-Modus</strong> aktiv, solange eine Verbindung besteht. ' +
        'Starte oder trete einer LAN-Sitzung bei.</p>';
      return;
    }
    var cur = global.DCPlayLogger && DCPlayLogger.getCurrent && DCPlayLogger.getCurrent();
    var msgs = (cur && cur.chat) ? cur.chat.slice() : (global.__dcPlayChatBuf || []);
    pane.innerHTML =
      '<div class="pt-chat-log" id="pt-chat-log"></div>' +
      '<div class="pt-chat-compose">' +
      '<input id="pt-chat-in" maxlength="400" placeholder="Nachricht an den Mitspieler…" autocomplete="off">' +
      '<button type="button" class="primary" id="pt-chat-send">Senden</button>' +
      '</div>' +
      '<p class="tiny">Verlauf wird mit der Partie gespeichert und beim Export mitgeliefert.</p>';
    var log = $('pt-chat-log');
    log.innerHTML = msgs.map(function (m) {
      return '<div class="pt-chat-line"><span class="pt-chat-meta">' + esc(m.name) +
        ' · ' + esc((m.t || '').replace('T', ' ').slice(11, 19)) +
        '</span><div>' + esc(m.text) + '</div></div>';
    }).join('') || '<p class="tiny">Noch keine Nachrichten.</p>';
    log.scrollTop = log.scrollHeight;

    function send() {
      var inp = $('pt-chat-in');
      var text = (inp.value || '').trim();
      if (!text) return;
      var name = 'Spieler';
      try {
        var eng = global.dcGetEngine && dcGetEngine();
        var you = global.dcGetYou ? dcGetYou() : 0;
        if (eng) name = eng.player(you).name || name;
      } catch (e) {}
      var payload = { name: name, text: text.slice(0, 400), player: global.dcGetYou ? dcGetYou() : 0, t: new Date().toISOString() };
      if (global.DCNet && DCNet.sendChat) DCNet.sendChat(payload);
      onChatMessage(payload, true);
      inp.value = '';
    }
    $('pt-chat-send').onclick = send;
    $('pt-chat-in').onkeydown = function (ev) {
      if (ev.key === 'Enter') { ev.preventDefault(); send(); }
    };
  }

  function onChatMessage(msg, fromSelf) {
    if (!msg || !msg.text) return;
    if (!global.__dcPlayChatBuf) global.__dcPlayChatBuf = [];
    global.__dcPlayChatBuf.push(msg);
    if (global.DCPlayLogger && DCPlayLogger.addChat) DCPlayLogger.addChat(msg);
    if (open && tab === 'chat') renderChat();
  }

  function show(whichTab) {
    ensureRoot();
    open = true;
    $('playtest-panel').style.display = 'flex';
    setTab(whichTab || tab || 'logs');
    ensureChatSub();
  }

  function hide() {
    open = false;
    var root = $('playtest-panel');
    if (root) root.style.display = 'none';
  }

  function toggle() {
    if (open) hide();
    else show();
  }

  function ensureChatSub() {
    if (chatUnsub) return;
    if (!(global.DCNet && DCNet.onChat)) return;
    chatUnsub = DCNet.onChat(function (msg) { onChatMessage(msg, false); });
  }

  function bindButtons() {
    ensureChatSub();
    document.querySelectorAll('[data-open-playtest], #btn-playtest, #go-playtest').forEach(function (btn) {
      if (btn._ptBound) return;
      btn._ptBound = true;
      btn.addEventListener('click', function (ev) {
        ev.preventDefault();
        show();
      });
    });
  }

  global.DCPlayPanel = {
    show: show,
    hide: hide,
    toggle: toggle,
    setTab: setTab,
    bindButtons: bindButtons,
    onChatMessage: onChatMessage,
    isOpen: function () { return open; }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindButtons);
  } else {
    bindButtons();
  }
})(typeof window !== 'undefined' ? window : globalThis);
