/**
 * Playtest-Panel: Logs | Anmerkungen (Chat lebt im Tisch-Protokoll, js/ui/table-chat.js)
 */
(function (global) {
  'use strict';

  var open = false;
  var tab = 'logs';

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
      '  </div>' +
      '  <div class="playtest-body">' +
      '    <section class="pt-pane on" id="pt-pane-logs" data-pane="logs"></section>' +
      '    <section class="pt-pane" id="pt-pane-notes" data-pane="notes"></section>' +
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
    tab = name === 'notes' ? 'notes' : 'logs';
    var root = ensureRoot();
    root.querySelectorAll('.pt-tab').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-tab') === tab);
    });
    root.querySelectorAll('.pt-pane').forEach(function (p) {
      p.classList.toggle('on', p.getAttribute('data-pane') === tab);
    });
    if (tab === 'logs') renderLogs();
    if (tab === 'notes') renderNotes();
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

  function show(whichTab) {
    ensureRoot();
    open = true;
    $('playtest-panel').style.display = 'flex';
    if (whichTab === 'chat') { if (global.DCTableChat) DCTableChat.setTab('chat'); whichTab = null; }
    setTab(whichTab || tab || 'logs');
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

  function bindButtons() {
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
    onChatMessage: function (m, self) { if (global.DCTableChat) DCTableChat.onChatMessage(m, self); },
    isOpen: function () { return open; }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindButtons);
  } else {
    bindButtons();
  }
})(typeof window !== 'undefined' ? window : globalThis);
