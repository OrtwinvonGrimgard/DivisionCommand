/**
 * „Spielstand zurücksetzen“ (t278): löscht alle eigenen Daten des Spiels, damit der nächste Start
 * wie der allererste wirkt (Offiziersakte leer, Tutorial-Merker weg → „Spiel starten“ öffnet das Tutorial).
 *
 * Gelöscht wird gezielt nach Präfix, nicht global für den ganzen Ursprung: Der Browser-Ursprung
 * (localhost:Port) kann mit anderen Seiten geteilt sein.
 * - localStorage und sessionStorage: alle Schlüssel mit Präfix `dc_` (siehe `KNOWN_KEYS`)
 * - IndexedDB: `dc_playtest` (Playtest-Protokolle und Notizen)
 * - Service-Worker-Caches bleiben: Sie enthalten nur Programmdateien und Bilder, keinen Spielstand.
 * Danach lädt die Seite neu auf den Startbildschirm.
 */
(function (root) {
  'use strict';

  /** Präfix aller Speicherschlüssel des Spiels. */
  var PREFIX = 'dc_';
  /** IndexedDB-Datenbanken des Spiels. */
  var DATABASES = ['dc_playtest'];
  /**
   * Bekannte Schlüssel (Stand t278, aus dem Code gezählt) mit Bedeutung für den Bestätigungsdialog.
   * Gelöscht wird trotzdem alles mit `PREFIX`, auch künftige Schlüssel.
   */
  var KNOWN_KEYS = {
    dc_users: 'Offiziersakten (Benutzer)',
    dc_user_active: 'aktiver Benutzer',
    dc_decks: 'eigene Decks',
    dc_tutorial_done: 'Tutorial erledigt/übersprungen',
    dc_settings: 'Einstellungen (Bot, Spiel)',
    dc_music: 'Musik an/aus',
    dc_vol: 'Musiklautstärke',
    dc_sfx_vol: 'Effektlautstärke',
    dc_fly: 'Animationstempo',
    dc_dialog: 'Meldungsdauer',
    dc_log: 'Protokollfenster',
    dc_perf: 'Leistungsanzeige',
    dc_camera_prefs: 'Tischkamera'
  };

  /**
   * Speicher-Objekt oder null (gesperrt/fehlend).
   * @param {'localStorage'|'sessionStorage'} name
   * @returns {Storage|null}
   */
  function storage(name) {
    try { return root[name] || null; } catch (e) { return null; }
  }
  /**
   * Alle Spielschlüssel eines Speichers.
   * @param {Storage|null} st
   * @returns {string[]}
   */
  function gameKeys(st) {
    var out = [];
    if (!st) return out;
    try {
      for (var i = 0; i < st.length; i++) {
        var k = st.key(i);
        if (k != null && k.indexOf(PREFIX) === 0) out.push(k);
      }
    } catch (e) { /* gesperrt */ }
    return out;
  }
  /**
   * Was liegt gerade gespeichert? (für den Dialog und Tests)
   * @returns {{local: string[], session: string[], databases: string[]}}
   */
  function inventory() {
    return { local: gameKeys(storage('localStorage')), session: gameKeys(storage('sessionStorage')), databases: DATABASES.slice() };
  }
  /**
   * Löscht die Spielschlüssel aus localStorage und sessionStorage (synchron).
   * Fremde Schlüssel desselben Ursprungs bleiben.
   * @returns {string[]} gelöschte Schlüssel
   */
  function wipeStorage() {
    var removed = [];
    ['localStorage', 'sessionStorage'].forEach(function (name) {
      var st = storage(name);
      gameKeys(st).forEach(function (k) {
        try { st.removeItem(k); removed.push(k); } catch (e) { /* weiter */ }
      });
    });
    return removed;
  }
  /**
   * Löscht eine IndexedDB-Datenbank; wartet höchstens `ms` (blockierte Verbindungen werden beim Neuladen frei).
   * @param {string} name
   * @param {number} ms
   * @returns {Promise<string>} 'deleted' | 'blocked' | 'error' | 'timeout' | 'none'
   */
  function deleteDb(name, ms) {
    return new Promise(function (resolve) {
      var idb = null;
      try { idb = root.indexedDB || null; } catch (e) { idb = null; }
      if (!idb || !idb.deleteDatabase) { resolve('none'); return; }
      var done = false;
      function fin(v) { if (!done) { done = true; resolve(v); } }
      try {
        var req = idb.deleteDatabase(name);
        req.onsuccess = function () { fin('deleted'); };
        req.onerror = function () { fin('error'); };
        req.onblocked = function () { fin('blocked'); };
      } catch (e) { fin('error'); }
      setTimeout(function () { fin('timeout'); }, ms || 1500);
    });
  }
  /**
   * Setzt das Spiel vollständig zurück (Speicher + Datenbanken). Lädt nicht neu.
   * @returns {Promise<{removed: string[], databases: Object<string,string>}>}
   */
  function wipeAll() {
    var removed = wipeStorage();
    var closing = (root.DCPlayStore && root.DCPlayStore.closeDb) ? root.DCPlayStore.closeDb() : Promise.resolve();
    return Promise.resolve(closing).then(function () {
      return Promise.all(DATABASES.map(function (n) { return deleteDb(n, 1500); }));
    }).then(function (res) {
      var dbs = {};
      DATABASES.forEach(function (n, i) { dbs[n] = res[i]; });
      // Falls während des Löschens noch etwas geschrieben wurde (z. B. Lautstärke), noch einmal räumen.
      removed = removed.concat(wipeStorage());
      return { removed: removed, databases: dbs };
    });
  }
  /**
   * Lädt neu auf den Startbildschirm (ohne Adresszusätze wie `?tutorial=1`).
   */
  function reloadToStart() {
    try { root.location.replace(root.location.pathname); } catch (e) { root.location.reload(); }
  }

  /* ---------------- Dialog ---------------- */

  /**
   * Öffnet den zweistufigen Bestätigungsdialog im Stil des Spiels.
   */
  function openDialog() {
    if (!root.document || document.getElementById('dc-reset')) return;
    var inv = inventory();
    var box = document.createElement('div');
    box.id = 'dc-reset';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML =
      '<div class="dc-reset-box">' +
        '<p class="dc-reset-kicker">Speicher</p>' +
        '<h3>Spielstand zurücksetzen?</h3>' +
        '<div class="dc-reset-step" data-step="1">' +
          '<p>Das Spiel startet danach wie beim allerersten Mal: Startbildschirm, Tutorial, neue Offiziersakte. Gelöscht wird:</p>' +
          '<ul>' +
            '<li><b>Offiziersakten</b> (alle Benutzer, Porträts, Rufnamen)</li>' +
            '<li><b>Eigene Decks</b> aus der Bibliothek</li>' +
            '<li><b>Einstellungen</b>: Audio, Bot, Tempo, Kamera, Anzeige</li>' +
            '<li><b>Tutorial-Merker</b>: das Tutorial startet wieder von selbst</li>' +
            '<li><b>Playtest-Protokolle und Notizen</b></li>' +
          '</ul>' +
          '<p class="dc-reset-small">Gespeichert sind derzeit ' + inv.local.length + ' Einträge. Programmdateien und Kartenbilder bleiben erhalten. Dies lässt sich nicht rückgängig machen.</p>' +
          '<div class="dc-reset-row"><button type="button" class="dc-reset-cancel primary">Abbrechen</button><button type="button" class="dc-reset-next danger">Weiter</button></div>' +
        '</div>' +
        '<div class="dc-reset-step" data-step="2" hidden>' +
          '<p class="dc-reset-warn">Letzte Bestätigung: Alles wird endgültig gelöscht.</p>' +
          '<div class="dc-reset-row"><button type="button" class="dc-reset-cancel primary">Abbrechen</button><button type="button" class="dc-reset-go danger">Endgültig löschen</button></div>' +
        '</div>' +
        '<div class="dc-reset-step" data-step="3" hidden><p class="dc-reset-warn">Speicher wird gelöscht …</p></div>' +
      '</div>';
    document.body.appendChild(box);
    function step(n) {
      box.querySelectorAll('.dc-reset-step').forEach(function (el) { el.hidden = el.getAttribute('data-step') !== String(n); });
      var f = box.querySelector('.dc-reset-step[data-step="' + n + '"] .dc-reset-cancel');
      if (f) { try { f.focus(); } catch (e) { /* alt */ } }
    }
    function close() {
      document.removeEventListener('keydown', onKey, true);
      if (box.parentNode) box.parentNode.removeChild(box);
    }
    function onKey(ev) { if (ev.key === 'Escape' && box.querySelector('[data-step="3"]').hidden) { ev.preventDefault(); ev.stopPropagation(); close(); } }
    document.addEventListener('keydown', onKey, true);
    box.addEventListener('click', function (ev) { if (ev.target === box) close(); });
    box.querySelectorAll('.dc-reset-cancel').forEach(function (b) { b.onclick = close; });
    box.querySelector('.dc-reset-next').onclick = function () { step(2); };
    box.querySelector('.dc-reset-go').onclick = function () {
      step(3);
      try { if (root.DCAudio && root.DCAudio.stopTable) root.DCAudio.stopTable(); } catch (e) { /* stumm */ }
      wipeAll().then(function () { setTimeout(reloadToStart, 250); }, function () { reloadToStart(); });
    };
    step(1);
  }

  root.DCReset = {
    PREFIX: PREFIX, DATABASES: DATABASES, KNOWN_KEYS: KNOWN_KEYS,
    inventory: inventory, wipeStorage: wipeStorage, wipeAll: wipeAll, reloadToStart: reloadToStart, openDialog: openDialog
  };
})(typeof window !== 'undefined' ? window : globalThis);
