/**
 * UI von Division Command.
 *
 * Diese Datei zeichnet den Tisch, nimmt Klicks entgegen und schickt
 * Aktionen an die Engine. Sie enthält keine Spielregeln.
 *
 * Ablauf kurz:
 * 1. startGame erzeugt eine Engine und eine Partie.
 * 2. render malt Front, Support, Hand, Doktrinen, Protokoll.
 * 3. dispatch gibt einen Zug an engine.dispatch und malt neu.
 * 4. Offene Wahlen (Ziel, Münze, Stellung) laufen über Overlay-Dialoge.
 * 5. Die Rundenübersicht erzählt den gegnerischen Zug nacheinander.
 */
(function () {
  'use strict';
  /* Erstes Element zur CSS-Auswahl. */
    function $(s) { return document.querySelector(s); }
  /* Fehler ins Lobby- oder Hinweis-Feld schreiben. */
    function showErr(msg) {
    var h = document.getElementById('hint');
    if (h) h.textContent = msg;
    var el = document.getElementById('boot-error');
    // Immer auch Lobby-Fehlerzeile setzen — sonst verschwindet der Startfehler hinter dem Titel.
    if (el) el.textContent = msg;
    console.error(msg);
  }
  /* Text für innerHTML unschädlich machen. */
    function escapeHtml(s) { // HTML-Sonderzeichen escapen
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c];
    });
  }
  /* Mögliche Bildpfade zu einer Kartendatei, eingebettet zuerst. */
    function imgCandidates(filename) { // Fallback-Pfade für das Artwork
    if (!filename) return [];
    var list = [];
    var key = String(filename);
    var stem = key.replace(/\.png$/i, '').replace(/\.jpg$/i, '');
    if (/^f\d{2}-/.test(stem)) { // Kit-Porträt: nicht in assets/cards suchen
      if (window.DCPortrait) { var u = DCPortrait.src(stem, 'Lt') || DCPortrait.src(stem.replace(/-(lt|olt|hptm|maj|obstlt|obst|gen|y|m|s)$/,''), 'Lt'); return u ? [u] : []; }
      return [];
    }
    if (window.DC_IMAGES) {
      if (window.DC_IMAGES[key]) list.push(window.DC_IMAGES[key]);
      if (window.DC_IMAGES[stem + '.png']) list.push(window.DC_IMAGES[stem + '.png']);
    }
    // Exakt vorhandene Datei aus dem Bildermanifest; keine spekulativen Endungs-/Ordner-Probes mehr.
    var exact = window.dcCardFile ? window.dcCardFile(key) : '';
    if (exact) list.push('assets/cards/' + exact.split('/').map(encodeURIComponent).join('/'));
    else if (!list.length && window.dcCardSrc) window.dcCardSrc(key); // meldet echte Lücke einmalig
    return list;
  }
  window.DC_IMG_OK = window.DC_IMG_OK || {};
  /**
   * Dateiname der Kartenvorder- bzw. Rückseite.
   * @param {object} def
   * @returns {string}
   */
  function backFile(def) {
    var typ = def && (def.typ || def.type || '');
    return typ === 'Doktrin' ? 'thumbs/rueckseite-rot.png' : 'thumbs/rueckseite-schwarz.png';
  }
  /**
   * Bild-URL relativ zum Karten-Assetordner.
   * @param {string} filename
   * @returns {string}
   */
  function imgSrc(filename) {
    if (!filename) return '';
    if (window.DC_IMG_OK[filename]) return window.DC_IMG_OK[filename];
    var list = imgCandidates(filename);
    return list[0] || '';
  }
  window.dcImgErr = function (el) {
    if (!el || el.dataset.dead === '1') return;
    var raw = el.getAttribute('data-file') || '';
    if (window.DC_IMG_OK[raw]) {
      el.src = window.DC_IMG_OK[raw];
      return;
    }
    var list = imgCandidates(raw);
    var i = Number(el.getAttribute('data-i') || 0) + 1;
    if (i < list.length) {
      el.setAttribute('data-i', String(i));
      el.src = list[i];
    } else {
      el.dataset.dead = '1';
      var rawFb = el.getAttribute('data-file') || '';
      var dok = /doktrin/i.test(rawFb) || (el.closest && el.closest('.doctrine-card, .doc-window'));
      var fb = imgSrc(backFile(dok ? { typ: 'Doktrin' } : null));
      if (fb && el.src.indexOf('rueckseite') < 0) el.src = fb;
    }
  };
  window.dcImgOk = function (el) {
    if (el && el.getAttribute('data-full') === '1') return;
    var raw = el.getAttribute('data-file') || '';
    if (raw && el.src && el.src.indexOf('data:') === 0) window.DC_IMG_OK[raw] = el.src;
  };
  /**
   * Lädt Kartenmotive vor, optional nur für die gegebenen IDs.
   * @param {string[]} [onlyIds]
   */
  function preloadCardArt(onlyIds) {
    var files = {}; files[backFile(null)] = 1; files[backFile({ typ: 'Doktrin' })] = 1;
    var cat = window.DC_CATALOG && DC_CATALOG.cards || [];
    var want = null;
    if (onlyIds && onlyIds.length) {
      want = {};
      onlyIds.forEach(function (id) { want[id] = 1; });
    }
    cat.forEach(function (c) {
      if (want && !want[c.id]) return;
      var face = window.dcCardImage ? dcCardImage(c) : c.image;
      if (face) files[face] = 1;
    });
    Object.keys(files).forEach(function (file) {
      imgCandidates(file).forEach(function (src) {
        var im = new Image();
        im.onload = function () { window.DC_IMG_OK[file] = src; };
        im.src = src;
      });
    });
  }
  /**
   * Volle Motiv-URL (Inspect/Zoom).
   * @param {string} filename
   * @returns {string}
   */
  function imgSrcFull(filename) {
    if (!filename) return '';
    function enc(p) {
      return p.split('/').map(function (x, i, a) {
        return i === a.length - 1 ? encodeURIComponent(x) : x;
      }).join('/');
    }
    var exact = window.dcCardFile ? window.dcCardFile(filename) : filename;
    return exact ? enc('assets/cards/' + exact) : '';
  }
  /**
   * HTML für das Kartenmotiv, inkl. verdeckter Lage.
   * @param {object} def
   * @param {boolean} facedown
   * @param {string} [cls]
   * @param {boolean} [full]
   * @returns {string}
   */
  function artTag(def, facedown, cls, full) {
    if (!facedown && window.DCCardPh && DCCardPh.is(def)) return DCCardPh.html(def, cls);
    var file = facedown ? backFile(def) : (window.dcCardImage ? dcCardImage(def) : (def && def.image));
    var src = full ? (imgSrcFull(file) || imgSrc(file)) : imgSrc(file);
    if (!src) return '<span class="' + (cls || 'art') + ' art-missing" role="img" aria-label="Bild fehlt"></span>';
    var err = full
      ? ('this.onerror=null;this.src="' + String(imgSrc(file) || '').replace(/"/g, '') + '";')
      : 'window.dcImgErr(this)';
    return '<img draggable="false" class="' + (cls || 'art') + '" alt="" src="' + src +
      '" data-file="' + String(file || '') + '" data-i="0" data-full="' + (full ? '1' : '0') +
      '" onload="window.dcImgOk(this)" onerror="' + err + '">';
  }

  /* 2,5D-Tisch: vollständige Kartenvorderseite im Slot (CSS blendet sie nur dort ein; flach bleibt das Motiv).
     Verdeckte Karten zeigen nur die Rückseite. Wörter stehen als eigene Zeile, wenn die Karte sie nicht aufgedruckt hat. */
  function slotFace(def, hidden) {
    var ph = !hidden && window.DCCardPh && DCCardPh.is(def);
    var kw = (!hidden && !ph && window.DCKw && def && (def.keywords || []).length) ? '<div class="slot-kw">' + DCKw.strip(def) + '</div>' : '';
    if (hidden) return '<div class="slot-face back"><div class="slot-card"><div class="table-hidden">Verdeckt</div></div></div>'; // kein Bild, keine Info
    return '<div class="slot-face"><div class="slot-card">' + artTag(def, false, 'slot-face-img', false) + '</div></div>' + kw;
  }
  /**
   * Motivwrapper für eine Einheit am Tisch.
   * @param {object} def
   * @param {boolean} hidden
   * @returns {string}
   */
  function tableArt(def, hidden) {
    return window.DCTableArt ? DCTableArt.html(def, hidden) : '<div class="table-motif art-unavailable">Motiv nicht verfügbar</div>';
  }
  /**
   * HTML der Ausrüstung am Träger; leer, wenn der Feind verdeckt liegt.
   * @param {object} inst
   * @param {boolean} hidden
   * @returns {string}
   */
  function tableAttachments(inst, hidden) {
    if (hidden || !(inst.attachments || []).length) return '';
    return '<div class="table-equipment" aria-label="Angelegte Ausrüstung">' + inst.attachments.map(function (eq) {
      var def = engine.defOf(eq);
      return '<button type="button" class="equipment-tile" data-equipment="' + escapeHtml(eq.uid) + '" title="' + escapeHtml(def.name) + '">' +
        tableArt(def, false) + '<span class="equipment-name">' + escapeHtml(def.name) + '</span></button>';
    }).join('') + '</div>';
  }
  /**
   * Ruft eine Audio-Methode isoliert auf (Fehler dürfen die UI nicht reißen).
   * @param {string} method
   */
  // Audio is optional presentation: never let it interrupt an action or mutate engine data.
  function audioCall(method) {
    try {
      var audio = window.DCAudio;
      if (!audio || typeof audio[method] !== 'function') return;
      var args = Array.prototype.slice.call(arguments, 1).map(function (arg) {
        return arg && typeof arg === 'object' ? JSON.parse(JSON.stringify(arg)) : arg;
      });
      var result = audio[method].apply(audio, args);
      if (result && typeof result.then === 'function') Promise.resolve(result).catch(function () {});
    } catch (audioError) { /* audio must never prevent rules, pending choices or render */ }
  }
  var matchSetup = null;
  var endHandledKey = null;
  /**
   * True, wenn die Partie vorbei ist.
   * @param {object} st
   * @returns {boolean}
   */
  function isTerminal(st) { return !!st && (st.winner != null || st.phase === 'gameover'); }
  /**
   * Räumt partiebezogene UI (Timer, Highlights, Endbild) auf. Kein Engine-Zugriff.
   */
  function clearMatchPresentation() {
    if (window.DCEndScreen) DCEndScreen.reset();
    audioCall('stopSfx');
    audioCall('stopTable');
    eventQueue = []; seenEvents = 0; eventPlaying = false; eventFlying = false;
    armedPlay = null; placing = false; suppressHandClick = false;
    window.dcSuppressClick = false; window._dcLastVpSum = 0;
    botQueued = false; botFail = {}; botSteps = 0; botMark = '';
    document.body.classList.remove('dc-armed', 'dc-dragging');
    hideDragGhost();
    document.querySelectorAll('[data-uid]').forEach(function (el) { clearTimeout(el._dcActTimer); });
    var ov = document.getElementById('overlay');
    if (ov) { ov.innerHTML = ''; ov.style.display = 'none'; }
  }
  /**
   * Verlässt die Partie in die Lobby oder bleibt im Endbild.
   * @param {boolean} [toLobby]
   */
  function leaveMatch(toLobby) {
    var ended = engine && isTerminal(engine.state);
    if (!ended) { try { if (window.DCPlayLogger && DCPlayLogger.abort) DCPlayLogger.abort('menue'); } catch (e) {} }
    if (window.DCNet && DCNet.disconnect) DCNet.disconnect();
    clearMatchPresentation();
    engine = null; matchSetup = null; endHandledKey = null; tableBound = false;
    window.dcTimerHold = true;
    if (window.dcShowTitle) window.dcShowTitle();
    else {
      if (window.dcUnmountMatch) window.dcUnmountMatch();
      if (window.dcSetTable) window.dcSetTable(false);
      var tr = document.getElementById('title-root'); if (tr) tr.style.display = 'flex';
    }
    var target = document.getElementById(toLobby ? 'go-lan' : 'go-single');
    if (toLobby && target) target.click();
    else { var menu = document.getElementById('go-single'); if (menu) menu.focus(); }
  }
  /**
   * Zeigt den Endbildschirm aus dem Engine-Stand.
   * @param {object} st
   */
  function showMatchEnd(st) {
    if (!isTerminal(st)) return;
    window.dcTimerHold = true;
    if (mode === 'tutorial') { // t275: das Tutorial zeigt seinen eigenen Siegmoment, kein Endbild
      if (scripted && scripted.onEnd) { try { scripted.onEnd(st); } catch (eEnd) { console.warn('[tutorial]', eEnd); } }
      return;
    }
    eventQueue = []; eventPlaying = false; eventFlying = false; armedPlay = null;
    document.querySelectorAll('[data-uid]').forEach(function (el) { clearTimeout(el._dcActTimer); });
    var ov = document.getElementById('overlay'); if (ov) { ov.innerHTML = ''; ov.style.display = 'none'; }
    var key = String(st.seed) + ':' + String(st.winner) + ':' + String(st.endReason);
    if (endHandledKey !== key) {
      endHandledKey = key;
      audioCall('stopSfx');
      var neutral = /bot.*bot|simulation|spectator/i.test((mode || '') + ' ' + (st.mode || '')) || st.botVsBot;
      if (!neutral && st.winner != null) audioCall('notifyGameEnd', st.winner === you);
      try {
        if (window.DCPlayLogger && DCPlayLogger.finish) {
          var current = DCPlayLogger.getCurrent && DCPlayLogger.getCurrent();
          // recordAction may have already finalized this exact game.
          if (!current || !current.end) DCPlayLogger.finish('completed', st.winner, st.endReason);
        }
      } catch (e) {}
    }
    if (window.DCEndScreen) DCEndScreen.show(st, {
      mode: mode, you: you, lan: /^(lan|host|join)$/.test(mode),
      onAgain: function () {
        if (/^(lan|host|join)$/.test(mode)) { leaveMatch(true); return; }
        if (!matchSetup) return;
        var savedSetup = JSON.parse(JSON.stringify(matchSetup));
        clearMatchPresentation(); endHandledKey = null;
        startGame({ rematchSetup: savedSetup });
      },
      onMenu: function () { leaveMatch(false); }
    });
  }
  var CATALOG = window.DC_CATALOG;
  function dcPortraitSrc(id, rank) {
    if (window.DCPortrait) return DCPortrait.src(id, rank);
    return 'assets/portraits/Vael/male/01.png?v=13';
  }
  function dcActiveUser() {
    try {
      var list = JSON.parse(localStorage.getItem('dc_users') || '[]');
      var id = localStorage.getItem('dc_user_active');
      return list.filter(function (u) { return u.id === id; })[0] || list[0] || null;
    } catch (e) { return null; }
  }
  var engine = null;
  var you = 0;
  var mode = 'hotseat';
  /** t275: Haken der geskripteten Partie (Tutorial): `{botStep, onEnd, delayMs}` oder null. */
  var scripted = null;
  var previewUid = null;

  /* Feste Knöpfe der Seite einmal verdrahten. */
  
  function bindLogWin() {
    var win = document.getElementById('log-win');
    var bar = document.getElementById('log-drag');
    var btn = document.getElementById('btn-log');
    if (!win) return;
    if (localStorage.getItem('dc_log') === '0') win.classList.add('off');
    if (btn) btn.onclick = function () {
      win.classList.toggle('off');
      localStorage.setItem('dc_log', win.classList.contains('off') ? '0' : '1');
    };
    if (!bar) return;
    var drag = null;
    bar.onmousedown = function (ev) {
      drag = { x: ev.clientX - win.offsetLeft, y: ev.clientY - win.offsetTop };
      ev.preventDefault();
    };
    window.addEventListener('mousemove', function (ev) {
      if (!drag) return;
      win.style.left = Math.max(0, ev.clientX - drag.x) + 'px';
      win.style.top = Math.max(0, ev.clientY - drag.y) + 'px';
      win.style.right = 'auto';
      win.style.bottom = 'auto';
    });
    window.addEventListener('mouseup', function () { drag = null; });
  }
  var tableBound = false;
  function bindTableControls() {
    if (tableBound) return;
    if (!document.getElementById('btn-end')) return;
    tableBound = true;
    function bind(id, fn) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('click', fn);
    }
    bindLogWin();
    bind('btn-playtest', function () { if (window.DCPlayPanel) DCPlayPanel.show(); });
    bind('btn-end', endTurn);
    bind('btn-peace', function () { dispatch({ type: 'PROPOSE_PEACE', player: activePlayer() }); });
    bind('btn-accept', function () { dispatch({ type: 'ACCEPT_PEACE', player: activePlayer() }); });
    bind('btn-concede', function () {
      try { dispatch({ type: 'CONCEDE', player: activePlayer() }); } catch (e) {}
      if (window.DCNet && DCNet.notifyLeave) DCNet.notifyLeave('hat aufgegeben');
    });
    bind('btn-menu', function () { leaveMatch(false); });
    bind('btn-opts', function () {
      var box = document.getElementById('ingame-opts');
      if (!box) return;
      box.style.display = box.style.display === 'flex' ? 'none' : 'flex';
    });
  }
  /**
   * Verdrahtet Menü- und Lobby-Buttons (Start, LAN, Sammlung).
   */
  function bindChrome() {
    bindInspectGestures();
    preloadCardArt();
    audioCall('preload');
    function bind(id, fn) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('click', fn);
    }
    // t256: „Gefecht beginnen“ startet über index.html (onclick → dcStart). Ein zweiter
    // Listener hier startete jede Partie doppelt (zwei Engines, zwei Countdowns).
    bind('go', startGame);
    bind('go-playtest', function () { if (window.DCPlayPanel) DCPlayPanel.show(); });
    bindTableControls();
    bind('btn-opts', function () {
      var box = document.getElementById('ingame-opts');
      if (!box) return;
      box.style.display = box.style.display === 'flex' ? 'none' : 'flex';
      if (box.style.display === 'flex' && window.DCBot) {
        var c = DCBot.cfg || DCBot.defaults;
        var set = function (id, val) { var n = document.getElementById(id); if (n) n.value = val; };
        var lab = function (id, val) { var n = document.getElementById(id); if (n) n.textContent = val; };
        var chk = function (id, val) { var n = document.getElementById(id); if (n) n.checked = Number(val) !== 0; };
        set('ig-bot-agg', c.aggression || 45); lab('ig-v-agg', c.aggression || 45);
        set('ig-bot-play', c.playChance); lab('ig-v-play', c.playChance);
        set('ig-bot-instant', c.instantChance); lab('ig-v-instant', c.instantChance);
        set('ig-bot-delay', c.delayMs); lab('ig-v-delay', c.delayMs);
        chk('ig-bot-unit', c.allowUnit == null ? 1 : c.allowUnit);
        chk('ig-bot-sup', c.allowSupport == null ? 1 : c.allowSupport);
        chk('ig-bot-eq', c.allowEquip == null ? 1 : c.allowEquip);
        chk('ig-bot-inst', c.allowInstant == null ? 1 : c.allowInstant);
        chk('ig-bot-atk', c.allowAttack == null ? 1 : c.allowAttack);
        chk('ig-bot-hold', c.holdAp == null ? 1 : c.holdAp);
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        hideInspect(); // große Karte schließen
        hideHover();
        if (engine && engine.state && engine.state.pending) { // offene Wahl des Spielers
          var ov = document.getElementById('overlay');
          if (ov) ov.style.display = 'none';
          dispatch({ type: 'CANCEL_PENDING', player: engine.state.pending.player }); // eine Aktion durch die Regeln jagen
        }
      }
    });
  }

  /* Neue Partie: Zufall, Decks, Namen, Tisch zeigen. */
    function installPlayLogger(eng, modeName, youPid) {
    if (!window.DCPlayLogger || !eng || eng._playLogHooked) return;
    try {
      DCPlayLogger.beginMatch({ engine: eng, mode: modeName, you: youPid });
    } catch (eBeg) { console.warn('[playtest] begin', eBeg); }
    var rawDispatch = eng.dispatch.bind(eng);
    eng.dispatch = function (action) {
      if (isTerminal(eng.state)) return { ok: false, error: 'Spiel ist vorbei' };
      var pid = action && action.player != null ? action.player : (eng.state && eng.state.active);
      var isBot = modeName === 'bot' && pid === 1;
      var suggestion = null;
      if (!isBot && window.DCPlayLogger && DCPlayLogger.botSuggest && modeName !== 'lan' && modeName !== 'host' && modeName !== 'join') {
        try { suggestion = DCPlayLogger.botSuggest(eng, pid); } catch (eSug) { suggestion = null; }
      }
      var res;
      try { res = rawDispatch(action); }
      catch (err) {
        try {
          DCPlayLogger.recordAction({
            engine: eng, action: action,
            result: { ok: false, error: String(err && err.message ? err.message : err) },
            actor: isBot ? 'bot' : 'human',
            botSuggestion: suggestion
          });
        } catch (eRec) {}
        throw err;
      }
      try {
        DCPlayLogger.recordAction({
          engine: eng, action: action, result: res || { ok: true },
          actor: isBot ? 'bot' : 'human',
          botSuggestion: isBot ? null : suggestion
        });
      } catch (eRec2) {}
      return res;
    };
    eng._playLogHooked = true;
  }

    /**
     * Startet eine neue Partie: Engine anlegen, `createMatch`, ersten Stand zeichnen.
     * Keine Regeln in dieser Funktion — nur Aufbau und `render`.
     * @param {object} [request] Rematch-Setup, Modus, Decks, Namen
     */
    function startGame(request) {
    var replay = request && request.rematchSetup;
    try { // Fehler auffangen
      if (!window.DC_CATALOG || !window.DCEngine) {
        showErr('Engine oder Katalog nicht geladen.');
        return;
      }
      if (window.dcMountMatch) window.dcMountMatch();
      bindTableControls();
      var modeEl = $('#mode');
      if (mode !== 'lan' && mode !== 'host' && mode !== 'join') {
        mode = (modeEl && modeEl.value) || 'hotseat';
      }
      if (mode === 'bot-schloter') {
        if (window.DCBot) DCBot.applyCfg({ model: 'schloter' });
        mode = 'bot';
      } else if (mode === 'bot') {
        if (window.DCBot) DCBot.applyCfg({ model: 'test' });
      }
      if (replay) {
        mode = replay.mode;
        if (replay.botCfg && window.DCBot && DCBot.applyCfg) DCBot.applyCfg(replay.botCfg);
      }
      var previousSeed = engine && engine.state && engine.state.seed;
      var seed = Date.now() >>> 0;
      if (window.crypto && crypto.getRandomValues) {
        var buf = new Uint32Array(1);
        crypto.getRandomValues(buf);
        seed = buf[0] || seed;
      }
      if (seed === previousSeed) seed = (seed + 1) >>> 0;
      var rand = DCEngine.rng(seed);
      var docs = CATALOG.cards.filter(function (c) { return c.typ === 'Doktrin'; }).map(function (c) { return c.id; });
      function takeDocs(pool, n, rnd) {
        var bag = pool.slice();
        var out = [];
        var i;
        if (!pool.length) return out;
        for (i = 0; i < n; i++) {
          if (!bag.length) bag = pool.slice();
          var j = Math.floor(rnd() * bag.length);
          out.push(bag.splice(j, 1)[0]);
        }
        return out;
      }
      window.dcMusicSeed = seed;
      engine = new DCEngine.Engine(CATALOG, { seed: seed });
      var n0 = (($('#player-name') && $('#player-name').value) || 'Spieler').trim().slice(0, 24);
      var n1el = $('#opponent-name');
      var n1 = (n1el && n1el.value.trim()) || (mode === 'bot' ? ((window.DCBot && DCBot.cfg && DCBot.cfg.model === 'schloter') ? 'Schloter' : 'Test') : 'Gegner');
      n1 = n1.slice(0, 24);
      var deck0 = DCEngine.buildTestDeck(CATALOG, rand);
      var deck1 = DCEngine.buildTestDeck(CATALOG, rand);
      var doctrine0 = takeDocs(docs, 2, rand);
      var doctrine1 = takeDocs(docs, 2, rand);
      if (!replay && window.DCLib && DCLib.selectedDeck) {
        var mine = DCLib.selectedDeck(mode === 'lan' ? 'deck-pick-lan' : 'deck-pick-single');
        if (mine) {
          var built = DCLib.expand(mine);
          if (built.length) deck0 = built;
          if (mine.doctrines && mine.doctrines.length) doctrine0 = mine.doctrines.slice(0, 2);
        }
        if (mode === "bot") {
          var botd = DCLib.selectedDeck("deck-pick-bot");
          if (botd) {
            var bbuilt = DCLib.expand(botd);
            if (bbuilt.length) deck1 = bbuilt;
            if (botd.doctrines && botd.doctrines.length) doctrine1 = botd.doctrines.slice(0, 2);
          }
        }
      }
      if (!replay && window.DC_validateDeck) {
        var v0 = DC_validateDeck(deck0, doctrine0);
        var v1 = DC_validateDeck(deck1, doctrine1);
        deck0 = v0.fixedIds; doctrine0 = v0.doctrineIds;
        deck1 = v1.fixedIds; doctrine1 = v1.doctrineIds;
        var warn = [].concat(v0.notices || [], v1.notices || []);
        if (warn.length && window.alert) {
          try { window.alert('Deckregel — überzählige Kopien entfernt:\n' + warn.join('\n')); } catch (eW) {}
        }
      }
      if (replay) {
        n0 = replay.name0; n1 = replay.name1;
        deck0 = replay.deck0.slice(); deck1 = replay.deck1.slice();
        doctrine0 = replay.doctrine0.slice(); doctrine1 = replay.doctrine1.slice();
      }
      matchSetup = JSON.parse(JSON.stringify({ mode: mode, name0: n0, name1: n1,
        deck0: deck0, deck1: deck1, doctrine0: doctrine0, doctrine1: doctrine1,
        botCfg: window.DCBot && DCBot.cfg || null }));
      endHandledKey = null;
      var used = deck0.concat(deck1).concat(doctrine0).concat(doctrine1);
      if (window.DCEmbed && DCEmbed.forCardIds) DCEmbed.forCardIds(used, CATALOG);
      preloadCardArt(used);
      engine.createMatch({
        seed: seed,
        mode: mode,
        name0: n0,
        name1: n1,
        deck0: deck0,
        deck1: deck1,
        doctrine0: doctrine0,
        doctrine1: doctrine1
      });
      var au = dcActiveUser();
      if (engine.state && engine.state.players && engine.state.players[0]) {
        engine.state.players[0].portrait = (au && au.portrait) || 'f01-kampf-none';
        engine.state.players[0].rank = (au && au.rank) || 'Lt';
        engine.state.players[0].callsign = (au && au.callsign) || '';
        engine.state.players[0].facing = (au && au.facing) || 'left';
        engine.state.players[0].face = (au && au.face) || '';
      }
      if (engine.state && engine.state.players && engine.state.players[1]) {
        var foeFace = 1 + Math.floor((seed % 23) + 1);
        if (foeFace === 1) foeFace = 12;
        engine.state.players[1].portrait = 'lt-' + (foeFace<10?'0':'')+foeFace;
      }
      you = 0;
      seenEvents = 0;
      eventQueue = [];
      eventPlaying = false; eventFlying = false;
      var ov = $('#overlay');
      if (ov) ov.style.display = 'none';
      document.title = (window.DC_BUILD_LABEL || 'Division Command 0.30c Alpha');
      window.dcTimerHold = true;
      render();
      // t256: Münzwurf erst nach dem Einblend-Countdown zeigen. Vorher lag er unter dem
      // Schleier und wurde vom Countdown überschrieben; „Los“ war nie klickbar, und ein
      // startender Bot bekam nie maybeBot() → Partie hing, Karten ließen sich nicht legen.
      if (window.dcKickoff) window.dcKickoff(afterKickoff);
      else {
        if (window.dcSetTable) window.dcSetTable(true);
        var tr = document.getElementById('title-root');
        if (tr) tr.style.display = 'none';
        afterKickoff();
      }
      try { installPlayLogger(engine, mode, you); } catch (ePl) { console.warn('[playtest]', ePl); }
    } catch (err) { // Fehler behandeln
      showErr(String(err && err.message ? err.message : err));
    }
  }

  /* Wer darf gerade befehlen: Hotseat = aktiver, sonst „you“. */
    function activePlayer() {
    if (!engine) return 0;
    if (engine.state && engine.state.pending && typeof engine.state.pending.player === 'number') {
      if (mode === 'hotseat') return engine.state.pending.player;
    }
    if (mode === 'hotseat') return engine.state.active;
    return you;
  }
  /**
   * Sendet `END_TURN` für den aktiven lokalen Spieler an die Engine und zeichnet neu.
   */
  function endTurn() {
    if (!engine || !engine.state) return;
    armedPlay = null;
    document.body.classList.remove('dc-armed', 'dc-dragging');
    hideDragGhost();
    document.querySelectorAll('[data-uid]').forEach(function (el) { clearTimeout(el._dcActTimer); });
    if (typeof clearDropMarks === 'function') clearDropMarks();
    var pend = engine.state.pending;
    var who = activePlayer();
    if (pend && pend.player === who && (pend.kind === 'deploy' || pend.kind === 'equip')) {
      dispatch({ type: 'CANCEL_PENDING', player: pend.player });
    }
    dispatch({ type: 'END_TURN', player: activePlayer() });
  }

  /* Zug an die Engine, danach zeichnen, Bot anstoßen. */
    function dispatch(action) { // eine Aktion durch die Regeln jagen
    if (!engine) {
      showErr('Zuerst „Partie starten“ klicken.');
      var ov = $('#overlay');
      if (ov) ov.style.display = 'flex';
      return;
    }
    if (isTerminal(engine.state)) { showMatchEnd(engine.state); return { ok: false, error: 'Spiel ist vorbei' }; }
    var soundDef = null;
    try {
      var soundLoc = action.uid && engine.findInst(action.uid);
      var originalDef = soundLoc ? engine.defOf(soundLoc.inst) : (action.cardId && engine.byId[action.cardId]);
      if (originalDef) soundDef = JSON.parse(JSON.stringify(originalDef));
    } catch (audioLookupError) {}
    var res;
    try { res = engine.dispatch(action); }
    catch (err) { showErr(String(err.message || err)); return; }
    if (res && res.sent) {
      var hw = document.getElementById('hint');
      if (hw) hw.textContent = 'Warte auf den Host …';
      try {
        if (window.DCPlayLogger && engine && engine._playLogHooked) {
          /* already logged via hook */
        } else if (window.DCPlayLogger && engine) {
          DCPlayLogger.recordAction({
            engine: engine, action: action, result: res, actor: 'human', botSuggestion: null
          });
        }
      } catch (eSent) {}
      return res;
    }
    if (!res.ok) {
      var explained = false;
      if (res.code === 'SCHUTZWALL_EMPTY' || res.code === 'SCHUTZWALL_WAIT' || res.code === 'HEAL_USED' || res.code === 'HEAL_NONE' || res.code === 'UEBER_USED' || res.code === 'UEBER_NONE' || res.code === 'SUMMON_SICK' || res.code === 'EXHAUSTED') {
        explained = true;
        var ov2 = document.getElementById('overlay');
        ov2.innerHTML = '<div class="modal"><h2>Schutzwall</h2><p>' + escapeHtml(res.error) +
          '</p><button type="button" id="blk-ok">Verstanden</button></div>';
        ov2.style.display = 'flex';
        document.getElementById('blk-ok').onclick = function () { ov2.style.display = 'none'; };
      }
      if (res.code === 'BLITZ_LOCK') {
        explained = true;
        var ov = document.getElementById('overlay');
        ov.innerHTML = '<div class="modal"><h2>Blitzkrieg</h2><p>' + escapeHtml(res.error) +
          '</p><button type="button" id="blk-ok">Verstanden</button></div>';
        ov.style.display = 'flex';
        document.getElementById('blk-ok').onclick = function () { ov.style.display = 'none'; };
      }
      if (!explained && !engine.state.pending) {
        var stuck = document.getElementById('overlay');
        if (stuck) stuck.style.display = 'none';
      }
      render();
      var bad = $('#hint');
      if (bad) bad.textContent = res.error || 'Ungültig';
      return res;
    }
    try { render(); }
    catch (err) {
      var hint = document.getElementById('hint');
      if (hint) hint.textContent = 'Anzeige: ' + (err && err.message ? err.message : err);
    }
    if (isTerminal(engine.state)) { showMatchEnd(engine.state); return res; }
    if (!engine.state.pending) closePendingUi();
    if (res.coinWinner || res.code === 'COIN_WINNER') {
      var ovw = document.getElementById('overlay');
      var face = res.face === 'zahl' ? 'Zahl' : 'Kopf';
      var body = res.face && engine && engine.state && engine.state.active != null
        ? (escapeHtml(face) + ' — es beginnt <strong>' + escapeHtml(res.coinWinner || '') + '</strong>')
        : ('Gewinner: <strong>' + escapeHtml(res.coinWinner || '') + '</strong>');
      ovw.innerHTML = '<div class="modal"><h2>Münzwurf</h2><p>' + body +
        '</p><button type="button" id="cw-ok">Weiter</button></div>';
      ovw.style.display = 'flex';
      document.getElementById('cw-ok').onclick = function () { ovw.style.display = 'none'; };
    }
    if (res && res.ok) {
      var cdef = soundDef;
      if (action.type === 'PLAY') audioCall('playForCard', 'deploy', cdef);
      else if (action.type === 'ATTACK') audioCall('playForCard', 'attack', cdef);
      else if (action.type === 'END_TURN') audioCall('playSfx', 'turn');
      else if (action.type === 'REVEAL_UNIT') audioCall('playSfx', 'reveal');
      else if (action.type === 'DOK_SHIFT') audioCall('playSfx', 'doktrin-shift');
      else if (action.type === 'COIN_FLIP') audioCall('playSfx', 'coin');
      else if (action.type === 'RESOLVE_PENDING' && action.confirm) audioCall('playSfx', 'ui-click', { prio: 3 });
      else audioCall('playSfx', 'ui-click');
      // VP / Trophäe nachziehen
      try {
        if (engine && engine.state && engine.state.players) {
          var vpNow = (engine.state.players[0].vp || 0) + (engine.state.players[1].vp || 0);
          if (window._dcLastVpSum == null) window._dcLastVpSum = vpNow;
          if (vpNow > window._dcLastVpSum) {
            audioCall('playSfx', 'trophy', { prio: 1, duck: 0.5, duckMs: 1000 });
            window._dcLastVpSum = vpNow;
          }
        }
      } catch (eVp) {}
    }
    if (res.coinWinner || res.code === 'COIN_WINNER') {
      try { audioCall('playSfx', 'coin'); } catch (eC) {}
    }
    if (action.type === 'END_TURN') {
      eventQueue = [];
      seenEvents = (engine.state.events || []).length;
      if (mode === 'tutorial') { maybeBot(); return res; } // t275: kein Bestätigungsdialog im Tutorial
      showEndTurnGate();
      return res;
    }
    presentNewEvents();
    if (res.need === 'slot') {
      showDeploySlots();
    } else if (res.need === 'target' || res.need === 'coin' || res.need === 'sam' || res.need === 'geist' || res.need === 'react' || res.need === 'peek' || res.need === 'comm' || res.need === 'spy' || res.need === 'brumm') {
      if (!eventPlaying) showPending();
    }
    maybeBot();
    return res;
  }

  /* Wenn der Bot am Zug ist, seinen Schritt planen. */
    var botQueued = false;
    function maybeBot() {
    if (!engine || isTerminal(engine.state)) return;
    if (mode !== 'bot' && mode !== 'tutorial') return;
    if (window.dcTimerHold) {
      var waitingEngine = engine;
      window.setTimeout(function () { if (engine === waitingEngine) maybeBot(); }, 500);
      return;
    }
    var botTurn = engine.state.active === 1 || (engine.state.pending && engine.state.pending.player === 1);
    if (!botTurn) return;
    // t256: Solange der Münzwurf offen ist, wartet der Bot; „Los“ ruft maybeBot() erneut.
    if (coinDialogOpen()) return;
    if (botQueued) return;
    botQueued = true;
    var queuedEngine = engine;
    window.setTimeout(function () {
      if (engine !== queuedEngine) return;
      botQueued = false;
      botTick();
    }, (mode === 'tutorial' && scripted && scripted.delayMs) || (window.DCBot && DCBot.cfg && DCBot.cfg.delayMs) || 350);
  }

  /* Einen Bot-Zug ausführen und bei Bedarf den nächsten. */
    var botFail = {};
    var botMark = '';
    var botSteps = 0;
    function botActKey(act) {
      if (window.DCBot && DCBot.actKey) return DCBot.actKey(act);
      return (act && act.type) + '|' + (act && (act.uid || act.target || ''));
    }
    function botSay(msg) {
      var hint = document.getElementById('hint');
      if (hint) hint.textContent = msg;
    }
    function botFollow(pend) {
      if (!pend) return null;
      if (pend.kind === 'coin' || pend.kind === 'angel-coin' || pend.kind === 'resist-coin') return { type: 'COIN_FLIP', player: 1 };
      if (pend.kind === 'sam') return { type: 'SAM_PASS', player: 1 };
      if (pend.kind === 'geist-window') return { type: 'GEIST_PASS', player: 1 };
      if (pend.kind === 'react-window') return { type: 'REACT_PASS', player: 1 };
      if (pend.kind === 'hand-show' || pend.kind === 'peek') return { type: 'PEEK_DONE', player: 1 };
      var ch = (pend.choices || [])[0];
      if (ch && ch.slot) return { type: 'CHOOSE_SLOT', player: 1, slot: ch.slot };
      if (ch && ch.target) return { type: 'CHOOSE_TARGET', player: 1, target: ch.target };
      return { type: 'CANCEL_PENDING', player: 1 };
    }
    function botForceEnd() {
      try { engine.dispatch({ type: 'CANCEL_PENDING', player: 1 }); } catch (e) {}
      if (engine.state.pending && engine.state.pending.player === 1) engine.state.pending = null;
      var res = null;
      try { res = engine.dispatch({ type: 'END_TURN', player: 1 }); } catch (e2) { res = { ok: false }; }
      render();
      if (!res || res.ok !== false) botSay('Gegner beendet den Zug.');
      return res;
    }
    function botTick() {
    if (!engine || isTerminal(engine.state)) return;
    if (mode !== 'bot' && mode !== 'tutorial') return;
    if (window.dcTimerHold) {
      var waitingEngine = engine;
      window.setTimeout(function () { if (engine === waitingEngine) botTick(); }, 400);
      return;
    }
    var pend0 = engine.state.pending;
    if (pend0 && pend0.player !== 1) {
      render();
      try { if (!eventPlaying) showPending(); } catch (e) {}
      return;
    }
    if (mode === 'tutorial') { scriptedTick(); return; }
    var mark = engine.state.turn + ':' + engine.state.active;
    if (botMark !== mark) { botMark = mark; botFail = {}; botSteps = 0; }
    botSteps += 1;
    // t254: Folgewahlen (Ziel, Stellung, Massen-/Gassen-Folgen) zählen mit; 60 Schritte statt 18.
    if (botSteps > 60) { botForceEnd(); return; }
    var pid = pend0 ? pend0.player : engine.state.active;
    if (pid !== 1) return;
    var act = { type: 'END_TURN', player: 1 };
    try { act = (DCBot.step(engine, 1, botFail) || act); } catch (err) { act = { type: 'END_TURN', player: 1 }; }
    act.player = 1;
    if (botFail[botActKey(act)]) {
      if (engine.state.pending && engine.state.pending.player === 1) act = { type: 'CANCEL_PENDING', player: 1 };
      else act = { type: 'END_TURN', player: 1 };
    }
    if (act.type === 'END_TURN' && engine.state.pending && engine.state.pending.player === 1) {
      act = { type: 'CANCEL_PENDING', player: 1 };
    }
    var res = null;
    try {
      // t254: Die Wahl des Bots (Ziel, Stellung, Bestätigen) direkt über dispatch ausführen.
      // Nur Münze/SAM/Geist/Feindkontakt/Blick ohne eigene Wahl laufen über botFollow.
      var pendNow = engine.state.pending;
      var autoKinds = ['coin', 'angel-coin', 'resist-coin', 'sam', 'geist-window', 'hand-show', 'peek'];
      if (act.type === 'RESOLVE_PENDING' && act.confirm && pendNow && autoKinds.indexOf(pendNow.kind) >= 0) act = botFollow(pendNow) || { type: 'CANCEL_PENDING', player: 1 };
      if (act.type === 'RESOLVE_PENDING' && !act.slot && !act.target && !act.confirm) act = botFollow(pendNow) || { type: 'CANCEL_PENDING', player: 1 };
      res = engine.dispatch(act);
    } catch (err) {
      res = { ok: false, error: String(err && err.message || err) };
    }
    if (res && res.ok === false) {
      botFail[botActKey(act)] = 1;
      botSay(res.error || 'Gegner setzt aus.');
    }
    // t254: Eine neue eigene Folgewahl löst der nächste botTick mit DCBot.step (bewertet) statt mit der ersten Option.
    var pend = engine.state.pending;
    if (pend && pend.player !== 1) {
      render();
      try { if (!eventPlaying) showPending(); } catch (e) {}
      return;
    }
    render();
    closeStaleWaitOverlay();
    presentNewEvents();
    if (act.type === 'END_TURN' && engine.state.active !== 1 && !(engine.state.pending && engine.state.pending.player === 1)) {
      botSay('Gegner beendet den Zug.');
    }
    if (engine.state.active === 1 || (engine.state.pending && engine.state.pending.player === 1)) {
      window.setTimeout(botTick, (window.DCBot && DCBot.cfg && DCBot.cfg.delayMs) || 350);
    }
  }


  /**
   * t275: Ein Schritt des geskripteten Gegners (Tutorial). `scripted.botStep` liefert die
   * nächste Aktion oder null (warten, bis das Tutorial weiterschaltet; dann neu prüfen).
   */
  function scriptedTick() {
    if (!engine || !scripted || isTerminal(engine.state)) return;
    var pid = engine.state.pending ? engine.state.pending.player : engine.state.active;
    if (pid !== 1) return;
    var act = null;
    try { act = scripted.botStep(engine); } catch (eStep) { act = null; }
    var tickEngine = engine;
    var delay = scripted.delayMs || 900;
    if (!act) {
      window.setTimeout(function () { if (engine === tickEngine) maybeBot(); }, 400);
      return;
    }
    var res;
    try { res = engine.dispatch(act); } catch (err) { res = { ok: false, error: String(err && err.message || err) }; }
    if (res && res.ok && act.type === 'PLAY') audioCall('playForCard', 'deploy', engine.byId[(engine.findInst(act.uid) || { inst: {} }).inst.cardId]);
    else if (res && res.ok && act.type === 'ATTACK') audioCall('playSfx', 'attack');
    else if (res && res.ok && act.type === 'END_TURN') audioCall('playSfx', 'turn');
    if (isTerminal(engine.state)) { render(); showMatchEnd(engine.state); return; }
    var pend = engine.state.pending;
    render();
    if (pend && pend.player !== 1) {
      try { if (!eventPlaying) showPending(); } catch (e) {}
      presentNewEvents();
      return;
    }
    closeStaleWaitOverlay();
    presentNewEvents();
    if (engine.state.active === 1 || (engine.state.pending && engine.state.pending.player === 1)) {
      window.setTimeout(function () { if (engine === tickEngine) botTick(); }, delay);
    }
  }

  /**
   * Prüft, ob der Eröffnungsmünzwurf gerade sichtbar auf „Los“ wartet.
   * @returns {boolean}
   */
  function coinDialogOpen() {
    var ov = document.getElementById('overlay');
    return !!(ov && ov.style.display !== 'none' && ov.querySelector('#coin-start-ok'));
  }
  /**
   * Läuft nach dem Einblend-Countdown (oder sofort ohne Kickoff): zeigt den
   * Eröffnungsmünzwurf; ist keiner offen, darf ein startender Bot sofort ziehen.
   * Verhindert, dass der Bot-Zug 1 ohne Auslöser hängen bleibt (t256).
   */
  function afterKickoff() {
    if (!engine || !engine.state) return;
    var sc = engine.state.startCoin;
    if (sc && !sc._shown) { showOpeningCoin(); return; }
    if (!coinDialogOpen()) maybeBot();
  }

  /**
   * Zeigt den Eröffnungsmünzwurf und schickt die Wahl an die Engine.
   */
  function showOpeningCoin() {
    if (!engine || !engine.state || !engine.state.startCoin) return;
    var sc = engine.state.startCoin;
    if (sc._shown) return;
    sc._shown = true;
    var winner = engine.state.players[sc.winner];
    var name = (winner && winner.name) || ('Spieler ' + (sc.winner + 1));
    var face = sc.face === 'zahl' ? 'Zahl' : 'Kopf';
    var ov = document.getElementById('overlay');
    if (!ov) return;
    var starterAp = (sc.starterApFirst != null) ? sc.starterApFirst
      : (engine.state.starterFirstTurnAp != null ? engine.state.starterFirstTurnAp : 5);
    ov.innerHTML = '<div class="modal coin-toss-modal"><h2>Münzwurf</h2>' +
      '<div class="coin-toss-anim" aria-hidden="true">🪙</div>' +
      '<p class="coin-toss-msg">Münzwurf: <strong>' + escapeHtml(name) + '</strong> beginnt' +
      (sc.forced ? '' : ' <span class="tiny">(' + face + ')</span>') +
      '.</p>' +
      '<p class="coin-toss-ap tiny">Startspieler: <strong>' + starterAp + ' AP</strong> im ersten Zug, zieht in Zug 1 keine Karte. Der Gegner zieht zu Beginn seines ersten Zuges 1 Karte.</p>' +
      '<button type="button" class="primary" id="coin-start-ok">Los</button></div>';
    ov.style.display = 'flex';
    var btn = document.getElementById('coin-start-ok');
    if (btn) btn.onclick = function () { ov.style.display = 'none'; if (typeof maybeBot === 'function') maybeBot(); };
  }

  /* Dialog für Stellung, Ziel, Mehrfachwahl oder Münze. */
    function closePendingUi() {
      var ov = document.getElementById('overlay');
      if (!ov) return;
      if (ov.querySelector('.recap-modal')) return;
      ov.style.display = 'none';
      clearTargetHighlights();
    }
    /**
     * t259: Prüft, ob der Warte-Dialog „Der Gegner prüft Reaktionen“ noch berechtigt ist,
     * d. h. ob noch eine Wahl des Gegners (Feindkontakt, SAM, Geist, tac-*) offen ist.
     * @returns {boolean} true, solange der Gegner tatsächlich noch wählt
     */
    function foeWaitPending() {
      var pend = engine && engine.state && engine.state.pending;
      if (!pend || mode === 'hotseat' || isTerminal(engine.state)) return false;
      if (pend.player === activePlayer()) return false;
      return pend.kind === 'react-window' || pend.kind === 'sam' || pend.kind === 'geist-window' || /^tac-/.test(pend.kind);
    }
    /**
     * t259: Schließt einen verwaisten Warte-Dialog. Ursache des Hängers aus ui-play (t258):
     * Der Bot erledigte seine Wahl, ohne dass eine Live-Meldung folgte (z. B. Gefechtsabbruch
     * verworfen, „Angriff fällt aus“). Danach rief niemand das Overlay zurück; der Dialog lag
     * über dem Tisch, der eigene Zug ließ sich nicht mehr bedienen.
     * Zeigt anschließend eine eigene offene Wahl an, falls vorhanden.
     * @returns {boolean} true, wenn ein Warte-Dialog geschlossen wurde
     */
    function closeStaleWaitOverlay() {
      var ov = document.getElementById('overlay');
      if (!ov || ov.style.display === 'none' || !ov.querySelector('.wait-react')) return false;
      if (foeWaitPending()) return false;
      ov.style.display = 'none';
      ov.innerHTML = '';
      clearTargetHighlights();
      var pend = engine && engine.state && engine.state.pending;
      if (pend && pend.player === activePlayer() && !eventPlaying) { try { showPending(); } catch (e) {} }
      return true;
    }
    /**
     * t259: Eigene Dialog-Wahlen (Feindkontakt, SAM, Geist), die nur im Overlay bedient werden.
     * Brett-Wahlen (Stellung, Ziel) zeigen bewusst kein Overlay und zählen nicht.
     * @type {string[]}
     */
    var OWN_DIALOG_KINDS = ['react-window', 'sam', 'geist-window'];
    /**
     * t259: Stellt einen verlorenen eigenen Wahl-Dialog wieder her und räumt einen verwaisten
     * Warte-Dialog. Browser-Test (Seed 77): Ein Feindkontakt-Fenster des Menschen war offen,
     * das Overlay aber zu; render() kehrte bei unverändertem Brett vor showPending() zurück,
     * also kam der Dialog nie wieder. Läuft in render() (auch ohne DOM-Änderung) und jede
     * Sekunde über den Zugtimer.
     * @param {boolean} [fromTimer] true nur aus dem Sekundentakt; zählt dann auch die Meldungs-Wache
     * @returns {boolean} true, wenn etwas repariert wurde
     */
    function guardPendingUi(fromTimer) {
      if (!engine || !engine.state || isTerminal(engine.state)) return false;
      if (closeStaleWaitOverlay()) return true;
      if (fromTimer && guardEventPump()) return true;
      var pend = engine.state.pending;
      if (!pend || eventPlaying || pend.player !== activePlayer()) return false;
      if (OWN_DIALOG_KINDS.indexOf(pend.kind) < 0) return false;
      var ov = document.getElementById('overlay');
      if (!ov) return false;
      var open = ov.style.display !== 'none' && ov.innerHTML.trim();
      if (open && !ov.querySelector('.wait-react')) return false;
      try { showPending(); } catch (e) { return false; }
      return true;
    }
    var pumpStuckTicks = 0;
    var recapStillTicks = 0;
    var pumpLastSig = '';
    /**
     * t259: Meldungs-Warteschlange darf nicht ohne sichtbare Meldung „beschäftigt“ bleiben.
     * Browser-Test (Seed 259): eventPlaying blieb gesetzt, das Overlay war zu, der eigene Zug
     * startete nie. Wird jede Sekunde (Zugtimer) geprüft: Liegt eine Warteschlange ohne Lauf
     * vor, wird sie sofort abgespielt; ist „beschäftigt“ 8 s lang ohne sichtbares Overlay
     * (Flug-Animationen dauern deutlich kürzer), wird der Lauf freigegeben und neu gepumpt.
     * @returns {boolean} true, wenn eingegriffen wurde
     */
    function guardEventPump() {
      var ov = document.getElementById('overlay');
      var visible = !!(ov && ov.style.display !== 'none' && ov.innerHTML.trim());
      if (!eventPlaying && eventQueue.length && !visible) { pumpStuckTicks = 0; pumpEvents(); return true; }
      if (eventPlaying && !visible && !eventFlying) {
        pumpStuckTicks += 1;
        if (pumpStuckTicks >= 8) {
          pumpStuckTicks = 0;
          eventPlaying = false;
          pumpEvents();
          if (!eventPlaying) maybeBot();
          return true;
        }
        return false;
      }
      // t259: Sichtbare Meldung, die sich 15 s lang nicht verändert (Tippen ruht sonst höchstens
      // ~3 s), gilt als hängend: Overlay schließen, Pumpe freigeben (ui-play Seed 259, Spiel 5:
      // „Ausspielen“ ohne Text, 180 s beschäftigt).
      if (eventPlaying && visible && !eventFlying && ov.querySelector('.recap-stage')) {
        var sig = ov.textContent.length + '|' + ov.innerHTML.length;
        if (sig === pumpLastSig) recapStillTicks += 1; else { recapStillTicks = 0; pumpLastSig = sig; }
        if (recapStillTicks >= 15) {
          recapStillTicks = 0; pumpLastSig = '';
          if (recapCancelPrev) { try { recapCancelPrev(); } catch (eRc) {} recapCancelPrev = null; }
          ov.style.display = 'none'; ov.innerHTML = '';
          eventPlaying = false;
          pumpEvents();
          if (!eventPlaying) { try { guardPendingUi(false); } catch (eG) {} maybeBot(); }
          return true;
        }
        pumpStuckTicks = 0;
        return false;
      }
      recapStillTicks = 0; pumpLastSig = '';
      pumpStuckTicks = 0;
      return false;
    }
    var waitWatchdogArmed = false;
    var waitWatchdogSince = 0;
    /**
     * t259: Wächter für den Warte-Dialog. Prüft jede Sekunde: Ist keine Gegner-Wahl mehr offen,
     * schließt er den Dialog; wartet der Bot zu lange (>4 s) auf seine Wahl, stößt er maybeBot()
     * erneut an. So kann der Dialog die Partie nie dauerhaft blockieren.
     */
    function armWaitWatchdog() {
      if (waitWatchdogArmed) return;
      waitWatchdogArmed = true;
      waitWatchdogSince = Date.now();
      var watchedEngine = engine;
      function tick() {
        waitWatchdogArmed = false;
        if (engine !== watchedEngine || !engine) return;
        var ov = document.getElementById('overlay');
        if (!ov || ov.style.display === 'none' || !ov.querySelector('.wait-react')) return;
        if (closeStaleWaitOverlay()) return;
        var waited = Date.now() - waitWatchdogSince;
        if ((mode === 'bot' || mode === 'tutorial') && waited > 4000 && !eventPlaying) {
          // Ein verlorener Bot-Timer (botQueued ohne Lauf) wird nach 8 s freigegeben.
          if (botQueued && waited > 8000) botQueued = false;
          if (!botQueued) { maybeBot(); waitWatchdogSince = Date.now(); }
        }
        waitWatchdogArmed = true;
        window.setTimeout(tick, 1000);
      }
      window.setTimeout(tick, 1000);
    }
    function showPending() {
    var pend = engine.state.pending;
    if (!pend) { closePendingUi(); clearTargetHighlights(); return; }
    highlightPendingTargets();
    var meta = (window.DCEngine && DCEngine.pendingMeta) ? DCEngine.pendingMeta(pend.kind) : { title: 'Auswahl', pick: 'card', needs: true };
    var viewer = activePlayer();
    if (meta.needs && !(pend.choices || []).length && meta.pick !== 'coin' && meta.pick !== 'confirm') {
      var ovz = $('#overlay');
      ovz.innerHTML = '<div class="modal"><h2>' + escapeHtml(pend.prompt || meta.title) +
        '</h2><p>Keine gültigen Ziele.</p><button type="button" class="primary" id="pend-empty-ok">Zurück</button></div>';
      ovz.style.display = 'flex';
      document.getElementById('pend-empty-ok').onclick = function () {
        ovz.style.display = 'none';
        dispatch({ type: 'CANCEL_PENDING', player: pend.player });
      };
      return;
    }
    if (pend.player !== viewer) {
      if (mode !== 'hotseat' && (pend.kind === 'react-window' || pend.kind === 'sam' || pend.kind === 'geist-window' || /^tac-/.test(pend.kind))) {
        var ovw = $('#overlay');
        // t259: Markerklasse, damit closeStaleWaitOverlay() den Dialog sicher wiederfindet.
        if (!eventPlaying) { // t259: nie über eine laufende Meldung legen
          ovw.innerHTML = '<div class="modal wait-react"><h2>Warte auf Meldungen...</h2><p>Der Gegner prüft Reaktionen.</p></div>';
          ovw.style.display = 'flex';
          armWaitWatchdog();
        }
      }
      return;
    }
    if (pend.kind === 'hand-peek') {
      var ov = $('#overlay');
      var html = '<div class="modal"><h2>Zwei Handkarten wählen</h2><div class="pick-row">';
      (pend.choices || []).forEach(function (c) {
        var on = (pend.selected || []).indexOf(c.target) >= 0;
        html += '<button type="button" class="pick-card' + (on ? ' on' : '') + '" data-id="' + c.target + '">' +
          artTag({ image: 'rueckseite.jpg' }, true) + '</button>';
      });
      html += '</div></div>';
      ov.innerHTML = html;
      ov.style.display = 'flex';
      ov.querySelectorAll('.pick-card').forEach(function (b) {
        b.onclick = function () {
          dispatch({ type: 'CHOOSE_TARGET', player: pend.player, target: b.getAttribute('data-id') });
        };
      });
      return;
    }
    if (pend.kind === 'hand-show') {
      var ov = $('#overlay');
      ov.innerHTML = '<div class="modal"><h2>Glubscher</h2><p>' + escapeHtml((pend.names || []).join(', ')) +
        '</p><button type="button" class="primary" id="hp-ok">Verstanden</button></div>';
      ov.style.display = 'flex';
      document.getElementById('hp-ok').onclick = function () { ov.style.display = 'none'; dispatch({ type: 'CANCEL_PENDING', player: pend.player }); };
      return;
    }
    if (pend.kind === 'hero-jump') {
      var ov = $('#overlay');
      ov.innerHTML = '<div class="modal"><h2>Gegenstoß</h2><p>Helden der zweiten Kompanie kostenlos in die Bresche?</p>' +
        '<button type="button" class="primary" id="hj-y">Hinein</button> ' +
        '<button type="button" id="hj-n">Nicht</button></div>';
      ov.style.display = 'flex';
      document.getElementById('hj-y').onclick = function () { ov.style.display = 'none'; dispatch({ type: 'CHOOSE_TARGET', player: pend.player, target: pend.uid }); };
      document.getElementById('hj-n').onclick = function () { ov.style.display = 'none'; dispatch({ type: 'CANCEL_PENDING', player: pend.player }); };
      return;
    }
    if (pend.kind === 'brumm-pick') {
      var ov = $('#overlay');
      ov.innerHTML = '<div class="modal"><h2>Brummbär</h2>' +
        '<button type="button" class="primary" id="bj">Funkfeuer (1 AP)</button> ' +
        '<button type="button" class="primary" id="bh">Fehlfunktion (3 AP)</button> ' +
        '<button type="button" id="bx">Abbrechen</button></div>';
      ov.style.display = 'flex';
      document.getElementById('bj').onclick = function () { ov.style.display = 'none'; dispatch({ type: 'BRUMM_JAM', player: pend.player }); };
      document.getElementById('bh').onclick = function () { ov.style.display = 'none'; dispatch({ type: 'BRUMM_HIJACK', player: pend.player }); };
      document.getElementById('bx').onclick = function () { ov.style.display = 'none'; dispatch({ type: 'CANCEL_PENDING', player: pend.player }); };
      return;
    }
    if (pend.kind === 'spy-top') {
      var ov = $('#overlay');
      ov.innerHTML = '<div class="modal"><h2>Spionagenetzwerk</h2><p>Oberste Feindkarte: ' + escapeHtml(pend.name || '') +
        '</p><button type="button" class="primary" id="spy-k">Liegen lassen</button> ' +
        '<button type="button" class="primary" id="spy-b">Unters Deck</button></div>';
      ov.style.display = 'flex';
      document.getElementById('spy-k').onclick = function () { ov.style.display = 'none'; dispatch({ type: 'SPY_KEEP', player: pend.player }); };
      document.getElementById('spy-b').onclick = function () { ov.style.display = 'none'; dispatch({ type: 'SPY_BOTTOM', player: pend.player }); };
      return;
    }
    if (pend.kind === 'comm-pick') {
      var ov = $('#overlay');
      ov.innerHTML = '<div class="modal"><h2>Kommunikationszentrum</h2><p>Eine Fähigkeit (dann erschöpft).</p>' +
        '<button type="button" class="primary" id="cc-coord">Koordination (1 AP)</button> ' +
        '<button type="button" class="primary" id="cc-scout">Aufklärung (2 AP)</button> ' +
        '<button type="button" id="cc-x">Abbrechen</button></div>';
      ov.style.display = 'flex';
      document.getElementById('cc-coord').onclick = function () { ov.style.display = 'none'; dispatch({ type: 'COMM_COORD', player: pend.player }); };
      document.getElementById('cc-scout').onclick = function () { ov.style.display = 'none'; dispatch({ type: 'COMM_SCOUT', player: pend.player }); };
      document.getElementById('cc-x').onclick = function () { ov.style.display = 'none'; dispatch({ type: 'CANCEL_PENDING', player: pend.player }); };
      return;
    }
    if (pend.kind === 'sat-peek') {
      var ov = $('#overlay');
      ov.innerHTML = '<div class="modal"><h2>Satellitenbild</h2><p>Aufgedeckt: ' +
        escapeHtml((pend.names || []).join(', ') || '—') +
        '</p><button type="button" class="primary" id="peek-ok">Bestätigen (wieder verdeckt)</button></div>';
      ov.style.display = 'flex';
      document.getElementById('peek-ok').onclick = function () {
        ov.style.display = 'none';
        dispatch({ type: 'PEEK_DONE', player: pend.player });
      };
      return;
    }
    if (pend.kind === 'react-window') {
      var ov = $('#overlay');
      var btns = '<div class="pick-row">' + (pend.choices || []).map(function (c) {
        var loc = engine.findInst(c.target);
        var card = loc ? loc.inst : null;
        if (!card) {
          var pl = engine.player(pend.player);
          card = (pl.hand || []).concat(pl.support || []).find(function (x) { return x && x.uid === c.target; });
        }
        var def = card ? engine.defOf(card) : { image: 'rueckseite.jpg' };
        var hide = !card || card.facedown || /verdeckt/i.test(c.label || '');
        return '<button type="button" class="pick-card" data-react="' + c.target + '">' + artTag(def, hide) + '</button>';
      }).join('') + '</div>';
      ov.innerHTML = '<div class="modal"><h2>Meldung</h2><p>' + escapeHtml(pend.prompt || 'Der Gegner hat eine Aktion deklariert.') +
        '</p><p>Du kannst reagieren oder bestätigen und weitergeben.</p>' +
        btns + ' <button type="button" id="react-pass">Bestätigen und weitergeben</button></div>';
      ov.style.display = 'flex';
      ov.querySelectorAll('[data-react]').forEach(function (b) {
        b.onclick = function () {
          ov.style.display = 'none';
          dispatch({ type: 'PLAY', player: pend.player, uid: b.getAttribute('data-react') });
        };
      });
      document.getElementById('react-pass').onclick = function () {
        ov.style.display = 'none';
        dispatch({ type: 'REACT_PASS', player: pend.player });
      };
      return;
    }
    if (pend.kind === 'mob-play') {
      var ov = $('#overlay');
      ov.innerHTML = '<div class="modal"><h2>Mobilisierung</h2><p>Eine gefundene Infanterie sofort ohne AP ausspielen?</p>' +
        '<button type="button" id="mob-skip">Auf der Hand lassen</button></div>';
      ov.style.display = 'flex';
      document.getElementById('mob-skip').onclick = function () {
        ov.style.display = 'none';
        dispatch({ type: 'CANCEL_PENDING', player: pend.player });
      };
    }
    if (pend.kind === 'geist-window') {
      var ov = $('#overlay');
      ov.innerHTML = '<div class="modal"><h2>Geistiger Vorsprung</h2><p>' + escapeHtml(pend.prompt || 'Angriff') +
        '</p><p>Eine eigene Einheit sofort angreifen lassen?</p>' +
        '<button type="button" class="primary" id="gv-yes">Vorsprung nutzen</button> ' +
        '<button type="button" id="gv-no">Angriff durchlassen</button></div>';
      ov.style.display = 'flex';
      document.getElementById('gv-yes').onclick = function () {
        ov.style.display = 'none';
        var hand = engine.player(pend.player).hand;
        var card = hand.find(function (c) { return (engine.defOf(c).effects || []).some(function (e) { return e.code === 'GHOST_STRIKE'; }); });
        if (card) dispatch({ type: 'PLAY', player: pend.player, uid: card.uid });
        else dispatch({ type: 'GEIST_PASS', player: pend.player });
      };
      document.getElementById('gv-no').onclick = function () {
        ov.style.display = 'none';
        dispatch({ type: 'GEIST_PASS', player: pend.player });
      };
      return;
    }
    if (pend.kind === 'sam') {
      var ov = $('#overlay');
      ov.innerHTML = '<div class="modal"><h2>Luftangriff</h2><p>' + escapeHtml(pend.prompt || 'Feindlicher Luftangriff') +
        '</p><p>Boden-Luft-Rakete einsetzen und den Schaden dieser Quelle verhindern?</p>' +
        '<button type="button" class="primary" id="sam-yes">Rakete abfeuern</button> ' +
        '<button type="button" id="sam-no">Schaden hinnehmen</button></div>';
      ov.style.display = 'flex';
      document.getElementById('sam-yes').onclick = function () {
        ov.style.display = 'none';
        dispatch({ type: 'SAM_BLOCK', player: pend.player });
      };
      document.getElementById('sam-no').onclick = function () {
        ov.style.display = 'none';
        dispatch({ type: 'SAM_PASS', player: pend.player });
      };
      return;
    }
    if (pend.kind === 'coin' || pend.kind === 'angel-coin' || pend.kind === 'resist-coin') {
      var ov = $('#overlay');
      ov.innerHTML = '<div class="modal"><h2>Münzwurf</h2><p>' + escapeHtml(pend.prompt || 'Kopf oder Zahl') + // HTML-Sonderzeichen escapen
        '</p><p class="tiny">Kopf — Effekt tritt ein. Zahl — kein Effekt.</p>' +
        '<button type="button" class="primary" id="btn-coin">Münze werfen</button> ' +
        '<button type="button" id="btn-cancel-pend">Abbrechen</button></div>';
      ov.style.display = 'flex';
      document.getElementById('btn-coin').onclick = function () {
        ov.style.display = 'none';
        dispatch({ type: 'COIN_FLIP', player: pend.player }); // eine Aktion durch die Regeln jagen
      };
      document.getElementById('btn-cancel-pend').onclick = function () {
        ov.style.display = 'none';
        dispatch({ type: 'CANCEL_PENDING', player: pend.player }); // eine Aktion durch die Regeln jagen
      };
      return;
    }
    var title = pend.prompt || meta.title || (pend.kind === 'deploy' ? 'Stellung wählen' : 'Ziel wählen');
    if (pend.needCount && pend.needCount > 1) {
      title += ' (' + (pend.selected || []).length + '/' + pend.needCount + (pend.upto ? ', bis zu' : '') + ')';
    }
    function choiceHtml(c, i) {
      var on = (pend.selected || []).indexOf(c.target) >= 0;
      if (c.section && String(c.target || '').indexOf('sec:') === 0) {
        return '<button type="button" class="pick-section' + (on ? ' on' : '') + '" data-i="' + i + '" data-section="' + c.section + '" data-side="' + (c.side || 'own') + '">' + escapeHtml(c.label || c.section) + '</button>';
      }
      if (c.slot) {
        var lab = (c.label || (c.slot.section + (c.slot.row + 1)));
        return '<button type="button" class="' + (on ? 'picked' : '') + '" data-i="' + i + '">' + escapeHtml(lab) + '</button>';
      }
      var loc = c.target ? engine.findInst(c.target) : null;
      var card = loc ? loc.inst : null;
      var owner = loc ? loc.player.id : null;
      if (!card && c.target) {
        engine.state.players.forEach(function (pl) {
          (pl.hand || []).concat(pl.support || []).concat(pl.grave || []).forEach(function (x) {
            if (x && x.uid === c.target) { card = x; owner = pl.id; }
          });
        });
      }
      var hide = !card || card.facedown || /verdeckt/i.test(c.label || '');
      var def = card ? engine.defOf(card) : { image: 'rueckseite.jpg', name: c.label || '' };
      return '<button type="button" class="pick-card' + (on ? ' on' : '') + '" data-i="' + i + '">' + artTag(def, hide) + '</button>';
    }
    function ownerOfChoice(c) {
      if (c.slot) return pend.player;
      var loc = c.target ? engine.findInst(c.target) : null;
      if (loc) return loc.player.id;
      var found = null;
      engine.state.players.forEach(function (pl) {
        (pl.hand || []).concat(pl.support || []).forEach(function (x) {
          if (x && x.uid === c.target) found = pl.id;
        });
      });
      return found;
    }
    var mineBits = [];
    var foeBits = [];
    var otherBits = [];
    (pend.choices || []).forEach(function (c, i) {
      var html = choiceHtml(c, i);
      if (c.slot || (c.section && String(c.target || '').indexOf('sec:') === 0)) { otherBits.push(html); return; }
      var own = ownerOfChoice(c);
      if (own === pend.player) mineBits.push(html);
      else if (own === 0 || own === 1) foeBits.push(html);
      else otherBits.push(html);
    });
    var buttons = '';
    if (foeBits.length) buttons += '<p class="tiny">Gegner</p><div class="pick-row">' + foeBits.join('') + '</div>';
    if (mineBits.length) buttons += '<p class="tiny">Eigene</p><div class="pick-row">' + mineBits.join('') + '</div>';
    if (otherBits.length) buttons += '<div class="pick-row">' + otherBits.join('') + '</div>';
    var extra = '';
    if (((pend.kind === 'instant-target' || pend.kind === 'honors' || pend.kind === 'mass-pick' || pend.kind === 'mob-pick' || pend.kind === 'rations' || pend.kind === 'discard-hand') && pend.upto) || pend.kind === 'mass-pick') extra = '<button type="button" class="primary" id="btn-confirm-tg">Auswahl bestätigen</button> ';
    var ov = $('#overlay');
    ov.innerHTML = '<div class="modal"><h2>' + title + '</h2><p class="tiny">' + (pend.kind === 'instant-section' ? 'Abschnitt antippen (auch direkt auf der Front).' : pend.kind === 'tac-break' ? 'Nachbarfeld wählen oder die kostenlose Reaktion ablehnen. Schaden und Ausrüstung bleiben erhalten.' : /^tac-/.test(pend.kind) ? 'Karte oder Abschnitt antippen. Kosten erst nach der vollständigen gültigen Wahl.' : 'Karte antippen. Goldener Rand = Zeiger. Kleinere Karte = gewählt.') + '</p><div class="choices pick-row">' + buttons +

      '</div>' + extra + '<button type="button" id="btn-cancel-pend"' + (pend.kind === 'tac-discard' || pend.kind === 'tac-aura-section' ? ' disabled title="Diese Auswahl ist verpflichtend"' : '') + '>Abbrechen</button></div>';
    hideHover();
    hideInspect(); // große Karte schließen
    ov.style.display = 'flex';
    ov.querySelectorAll('.pick-card, .choices button').forEach(function (btn) {
      btn.onmouseenter = function () { btn.classList.add('hovering'); };
      btn.onmouseleave = function () { btn.classList.remove('hovering'); };
      btn.onclick = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        var idx = Number(btn.getAttribute('data-i'));
        var c = pend.choices[idx];
        if (!c && btn.getAttribute('data-id')) {
          c = { target: btn.getAttribute('data-id') };
        }
        if (!c) return;
        btn.classList.add('on');
        if (c.slot) dispatch({ type: 'CHOOSE_SLOT', player: pend.player, slot: c.slot });
        else dispatch({ type: 'CHOOSE_TARGET', player: pend.player, target: c.target });
      };
    });
    var cbtn = document.getElementById('btn-cancel-pend');
    if (cbtn) cbtn.onclick = function () {
      ov.style.display = 'none';
      dispatch({ type: 'CANCEL_PENDING', player: pend.player }); // eine Aktion durch die Regeln jagen
    };
    var conf = document.getElementById('btn-confirm-tg');
    if (conf) conf.onclick = function () {
      ov.style.display = 'none';
      dispatch({ type: 'CONFIRM_TARGETS', player: pend.player }); // eine Aktion durch die Regeln jagen
    };
  }

  /* (ungenutzt am Tisch) Schachtel für den alten Hover-Zoom. */
    function hoverBox() {
    var el = document.getElementById('hoverzoom');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'hoverzoom';
    document.body.appendChild(el);
    return el;
  }
  /* Volle Druckkarte zeigen — nur noch Hilfsfunktion. */
    function showHover(def, facedown, inst) { // verdeckte Lage
    if (!def) return;
    var file = facedown ? backFile(def) : (window.dcCardImage ? dcCardImage(def) : (def.image || ''));
    var src = imgSrcFull(file) || imgSrc(file);
    if (!src) return;
    var el = hoverBox();
    el.innerHTML = '<img class="fullcard" alt="' + escapeHtml(def.name || '') + '" src="' + src + // HTML-Sonderzeichen escapen
      '" data-file="' + file + '" data-i="0" onerror="window.dcImgErr && window.dcImgErr(this)">'; // globale Schnittstelle der Seite
    el.classList.add('show');
  }
  /* Hover-Zoom ausblenden. */
    function hideHover() {
    var el = document.getElementById('hoverzoom');
    if (el) el.classList.remove('show');
  }
  /* Hover-Zoom (große Vorschau) an Element hängen. */
    function bindHover(el, getData) {
    if (!el || el.dataset.dcHoverBound === '1') return;
    el.dataset.dcHoverBound = '1';
    el.addEventListener('mouseenter', function () {
      if (dialogOpen() || document.body.classList.contains('dc-dragging')) return;
      var data = getData && getData();
      if (!data || !data.def) return;
      showHover(data.def, !!data.facedown, data.inst);
    });
    el.addEventListener('mouseleave', function () { hideHover(); });
  }
  /* Steht ein Systemdialog über dem Tisch? */
    function dialogOpen() {
    var ov = document.getElementById('overlay');
    var ig = document.getElementById('ingame-opts');
    return (ov && ov.style.display === 'flex') || (ig && ig.style.display === 'flex');
  }

  /* Große Kartenansicht schließen. */
    function hideInspect() { // große Karte schließen
    var el = document.getElementById('inspect');
    if (el) el.style.display = 'none';
  }

  function statTone(now, printed) {
    if (now > printed) return 'up';
    if (now < printed) return 'down';
    return 'base';
  }
  function statLineHtml(expl, full) {
    var aCls = statTone(expl.atk, expl.printedAtk);
    var dCls = statTone(expl.def, expl.printedDef);
    var aLab = 'ATK';
    var dLab = 'DEF';
    return '<span class="stat-chip ' + aCls + '" data-tip="' + escapeHtml(expl.atkWhy.join('\n')) + '">' +
      aLab + ' ' + expl.atk + '</span>' +
      '<span class="stat-chip ' + dCls + '" data-tip="' + escapeHtml(expl.defWhy.join('\n')) + '">' +
      dLab + ' ' + expl.def + '</span>';
  }
  function slotStatHtml(expl) { return statLineHtml(expl, false); }
  function bindStatTips(root) {
    if (!root) return;
    var tip = document.getElementById('stat-tip');
    if (!tip) {
      tip = document.createElement('div');
      tip.id = 'stat-tip';
      document.body.appendChild(tip);
    }
    root.querySelectorAll('.stat-chip').forEach(function (el) {
      el.onmousemove = function (ev) {
        tip.textContent = el.getAttribute('data-tip') || '';
        tip.style.display = 'block';
        tip.style.left = (ev.clientX + 14) + 'px';
        tip.style.top = (ev.clientY + 14) + 'px';
      };
      el.onmouseleave = function () { tip.style.display = 'none'; };
    });
  }

  /* Karte vergrößern; zweiter Klick auf dieselbe schließt. */
  /* Aktionen in der Detailansicht: ausschließlich aus Engine-Regeln (listActions bzw. Probe-Dispatch auf einer
     Zustandskopie). Nur eigene Karten auf dem Feld, nur im eigenen Zug, nie bei offener Wahl oder Spielende. */
  function probeAction(action) {
    try {
      var probe = new DCEngine.Engine(engine.catalog || CATALOG, { seed: 7 });
      probe.state = JSON.parse(JSON.stringify(engine.state));
      probe.state._muteEvents = true;
      probe._uid = engine._uid; probe.log = [];
      var r = probe.dispatch(action);
      return r && r.ok ? { ok: true, need: r.need } : { ok: false, error: (r && r.error) || 'Nicht möglich' };
    } catch (e) { return { ok: false, error: (e && e.message) || 'Nicht möglich' }; }
  }
  function inspectEngineActions(opts, baseButtons) {
    if (!engine || !engine.state || isTerminal(engine.state) || !opts.uid) return null;
    var onlyClose = (baseButtons || []).every(function (b) { return b.id === 'close'; });
    if (!onlyClose) return null; // eigene Spezialdialoge (Support, Doktrin, Neutralisieren) behalten
    var loc = engine.findInst(opts.uid);
    if (!loc || (loc.zone !== 'front' && loc.zone !== 'support')) return null;
    var viewer = mode === 'hotseat' ? engine.state.active : you;
    if (!loc.player || loc.player.id !== viewer) return null; // Gegner: read-only
    var st = engine.state, d = engine.defOf(loc.inst), notes = [], btns = [];
    var myTurn = st.active === viewer && st.phase === 'main';
    var why = !myTurn ? 'Nicht dein Zug' : (st.pending ? 'Erst die offene Auswahl abschließen' : '');
    var acts = why ? [] : (engine.listActions(viewer) || []);
    if (loc.zone === 'front') {
      if (loc.inst.facedown) {
        var rev = acts.find(function (a) { return a.type === 'REVEAL_UNIT' && a.uid === loc.inst.uid; });
        btns.push(rev ? { id: 'dc-reveal', label: 'Aufdecken', primary: true } : { id: 'dc-reveal', label: 'Aufdecken', disabled: true, reason: why || 'Nicht möglich' });
      } else {
        var atk = acts.find(function (a) { return a.type === 'ATTACK' && a.uid === loc.inst.uid; });
        if (atk) btns.push({ id: 'dc-attack', label: 'Angreifen (' + atk.cost + ' AP · ' + atk.targets.length + (atk.targets.length === 1 ? ' Ziel)' : ' Ziele)'), primary: true });
        else {
          var ar = why ? { error: why } : probeAction({ type: 'ATTACK', player: viewer, uid: loc.inst.uid });
          var reason = ar.ok ? 'Kein gültiges Ziel oder zu wenig AP' : ar.error;
          if (!why && ar.ok === false && engine.player(viewer).ap < engine.rules.attack_ap) reason = 'Zu wenig AP';
          btns.push({ id: 'dc-attack', label: 'Angreifen', disabled: true, reason: reason });
          notes.push('Angriff: ' + reason);
        }
      }
    }
    var hasAbilitySource = (d.effects || []).length || (loc.inst.attachments || []).length;
    if (hasAbilitySource && !(loc.zone === 'front' && loc.inst.facedown)) {
      var type = loc.zone === 'support' ? 'ACTIVATE_SUPPORT' : 'USE_ABILITY';
      var pr = why ? { ok: false, error: why } : probeAction({ type: type, player: viewer, uid: loc.inst.uid });
      if (pr.ok) btns.push({ id: 'dc-ability', label: 'Fähigkeit einsetzen', primary: !btns.some(function (b) { return b.primary; }) });
      else if (/Keine aktivierbare Fähigkeit/.test(pr.error || '')) notes.push('Fähigkeit: Passiv (wirkt automatisch)');
      else { btns.push({ id: 'dc-ability', label: 'Fähigkeit einsetzen', disabled: true, reason: pr.error }); notes.push('Fähigkeit: ' + pr.error); }
    }
    else if (!(loc.zone === 'front' && loc.inst.facedown)) notes.push('Fähigkeit: keine aktivierbare');
    if (loc.zone === 'front' && !loc.inst.facedown && engine.kwMoveSlots && d.keywords && d.keywords.indexOf('Stellungswechsel') >= 0) {
      var mv = why ? [] : engine.kwMoveSlots(loc.inst.uid);
      if (mv.length) mv.forEach(function (s) { btns.push({ id: 'dc-move:' + s.section + ':' + s.row, label: 'Stellungswechsel → ' + s.section + (s.row + 1) }); });
      else notes.push('Stellungswechsel: ' + (why || 'kein freies benachbartes Feld derselben Reihe oder schon genutzt'));
    }
    if (why && btns.length) notes.unshift(why);
    if (!btns.length && !notes.length) return null;
    var uid = loc.inst.uid, zoneType = loc.zone;
    return {
      buttons: btns.concat(baseButtons),
      notes: notes,
      onAction: function (id) {
        if (id === 'dc-attack') dispatch({ type: 'ATTACK', player: viewer, uid: uid });
        else if (id === 'dc-reveal') dispatch({ type: 'REVEAL_UNIT', player: viewer, uid: uid });
        else if (String(id).indexOf('dc-move:') === 0) { var mp = String(id).split(':'); dispatch({ type: 'KW_MOVE', player: viewer, uid: uid, slot: { section: mp[1], row: Number(mp[2]) } }); }
        else if (id === 'dc-ability') dispatch({ type: zoneType === 'support' ? 'ACTIVATE_SUPPORT' : 'USE_ABILITY', player: viewer, uid: uid });
      }
    };
  }
    function openInspect(opts) { // Karte vergrößern
    if (dialogOpen()) return;
    var box = document.getElementById('inspect');
    if (box && box.style.display === 'flex' && box.getAttribute('data-uid') === String(opts.uid || opts.def && opts.def.id || '')) {

      hideInspect(); // große Karte schließen
      return;
    }
    var def = opts.def;
    var facedown = !!opts.facedown; // verdeckte Lage
    var inst = opts.inst;
    var title = facedown ? 'Verdeckte Karte' : def.name;
    var stats = '';
    var expl = (!facedown && inst && engine && engine.explainStats) ? engine.explainStats(inst) : null;
    if (!facedown && def.atk != null) {
      if (expl) {
        stats = statLineHtml(expl, true);
      } else {
        stats = '<span class="stat-plain">ATK ' + def.atk + ' · DEF ' + def.def + '</span>';
      }
    }
    var cost = '';
    var costNote = '';
    if (engine && def && def.typ !== 'Doktrin' && !facedown) {
      var printed = Number(def.ap || 0);
      var real = engine.costOf(def, engine.player(activePlayer()));
      cost = real + ' AP real';
      if (def.typ === 'Soforteinsatz') {
        if (printed !== real) costNote = 'Gedruckt: ' + printed + ' AP. Rabatte können senken (mind. 0).';
      } else {
        if (printed !== real) costNote = 'Gedruckt: ' + printed + ' AP. Abweichend gilt mindestens 1 AP, plus Doktrinen.';
        else if (printed === 0) costNote = 'Gedruckt 0 AP — abweichend kostet die Karte 1 AP.';
      }
    }
    var buttons = opts.buttons || [{ id: 'close', label: 'Schließen' }];
    var actNotes = [];
    if (!facedown || (inst && opts.uid)) {
      var auto = inspectEngineActions(opts, buttons);
      if (auto) { buttons = auto.buttons; actNotes = auto.notes; if (!opts.onAction) opts.onAction = auto.onAction; }
    }
    if (!facedown && inst && engine && engine.tacticalStatus) actNotes=actNotes.concat(engine.tacticalStatus(inst));
    var html = '<div class="inspect-modal">' +
      artTag(def, facedown, 'hero', true) + // Bild-HTML der Karte
      '<div class="info"><h3>' + escapeHtml(title) + '</h3>' + // HTML-Sonderzeichen escapen
      '<div class="tiny">' + escapeHtml(def.typ) + (cost ? ' · ' + cost : '') + (def.elite ? ' · ELITE' : '') + '</div>' +
      (stats ? '<div class="stat-block">' + stats + '</div>' : '') +
      (inst && isDigInProtected(inst) ? '<div class="inspect-dig-in">' + digInShieldSvg(16) + '<span>Eingegraben — nicht angreifbar bis zum nächsten eigenen Zug</span></div>' : '') +
      (!facedown && window.DCKw ? DCKw.html(def, { notes: true }) : '') +
      '<p>' + escapeHtml(facedown ? 'Diese Einheit liegt verdeckt.' : (def.text || '')) + '</p>' +
      (!facedown && window.DCCardPh ? DCCardPh.rulesHtml(def) : '') +
      (function () {
        if (!(engine && engine._trophyActive && engine._trophyActive() && def && def.typ === 'Doktrin')) return '';
        var obj = (window.DC_TROPHY_OBJECTIVES && DC_TROPHY_OBJECTIVES[def.id]) || (engine.trophyObjectiveFor && engine.trophyObjectiveFor(def.id));
        if (!obj) return '';
        var viewer = mode === 'hotseat' ? (engine.state && engine.state.active) : you;
        var prog = engine.trophyProgressFor && engine.trophyProgressFor(viewer, def.id);
        var line = 'Trophy-Ziel (+1 SP, 1×/Partie): ' + (obj.label || '');
        if (prog) line += ' — Fortschritt ' + prog.cur + '/' + prog.need + (prog.done ? ' (erreicht)' : '');
        return '<p class="tiny dok-vp-inspect"><strong>' + escapeHtml(line) + '</strong></p>';
      })() +
      (costNote ? '<p class="tiny">' + escapeHtml(costNote) + '</p>' : '') +
      (def.flavor && !facedown ? '<p class="tiny"><em>' + escapeHtml(def.flavor) + '</em></p>' : '') +
      (actNotes.length ? '<ul class="inspect-act-notes">' + actNotes.map(function (n) { return '<li>' + escapeHtml(n) + '</li>'; }).join('') + '</ul>' : '') +
      '</div><div class="acts">' +
      buttons.map(function (b) {
        return '<button type="button" class="' + (b.primary ? 'primary' : '') + (b.danger ? ' danger' : '') + '" data-act="' + b.id + '"' +
          (b.disabled ? ' disabled aria-disabled="true"' : '') + (b.reason ? ' title="' + escapeHtml(b.reason) + '"' : '') + '>' + escapeHtml(b.label) + '</button>';
        // HTML-Sonderzeichen escapen
      }).join('') +
      '</div></div>';
    var box = document.getElementById('inspect');
    if (!box) {
      box = document.createElement('div');
      box.id = 'inspect';
      box.className = 'overlay';
      document.body.appendChild(box);
    }
    box.innerHTML = html;
    box.style.display = 'flex';
    box.setAttribute('data-uid', String(opts.uid || (def && def.id) || ''));
    box.onclick = function (ev) {
      if (ev.target === box || (ev.target && ev.target.tagName === 'IMG')) hideInspect(); // große Karte schließen
    };
    bindStatTips(box);
    box.querySelectorAll('[data-act]').forEach(function (btn) {
      btn.onclick = function (ev) {
        ev.stopPropagation();
        if (btn.disabled) return;
        var id = btn.getAttribute('data-act');
        hideInspect(); // große Karte schließen
        if (opts.onAction) opts.onAction(id);
      };
    });
  }

  /* Robuste Vergrößerung: Delegation überlebt Re-Render; Rechtsklick+Doppelklick überall. */
  var inspectGesturesBound = false;
  function resolveInspectTarget(el) {
    if (!el || !engine || !engine.state) return null;
    var viewer = mode === 'hotseat' ? engine.state.active : you;
    var me = engine.state.players[viewer];
    var node = el.closest ? el : null;
    if (!node || !node.closest) return null;
    var card = node.closest('#hand .card');
    if (card) {
      var c = me.hand.find(function (x) { return x.uid === card.dataset.uid; });
      if (!c) return null;
      return { def: engine.defOf(c), facedown: false, uid: c.uid, zone: 'hand' };
    }
    var dok = node.closest('#my-doctrine .doctrine-card, #enemy-doctrine .doctrine-card');
    if (dok) {
      var def = CATALOG.cards.find(function (c) { return c.id === dok.dataset.id; });
      if (!def) return null;
      return { def: def, facedown: false, uid: def.id, zone: 'doctrine' };
    }
    var slot = node.closest('#my-front .slot.filled, #my-support .slot.filled, #enemy-front .slot.filled, #enemy-support .slot.filled');
    if (slot) {
      var loc = engine.findInst(slot.dataset.uid);
      if (!loc) return null;
      var hide = !!(loc.inst.facedown && loc.player !== viewer);
      return { def: engine.defOf(loc.inst), inst: loc.inst, facedown: hide, uid: loc.inst.uid, zone: loc.zone || 'board' };
    }
    return null;
  }
  function bindInspectGestures() {
    if (inspectGesturesBound) return;
    inspectGesturesBound = true;
    function openFromEvent(ev) {
      if (document.body.classList.contains('dc-dragging')) return false;
      var hit = resolveInspectTarget(ev.target);
      if (!hit || !hit.def) return false;
      ev.preventDefault();
      ev.stopPropagation();
      hideHover();
      try {
        var n = ev.target && ev.target.closest && ev.target.closest('.card, .slot, .doctrine-card');
        if (n && n._dcActTimer) clearTimeout(n._dcActTimer);
      } catch (eClr) {}
      /* Act-Menü/Overlay schließen, sonst blockiert dialogOpen den Zoom nach Doppelklick. */
      var ov = document.getElementById('overlay');
      if (ov && ov.style.display === 'flex') { ov.style.display = 'none'; ov.innerHTML = ''; }
      var ig = document.getElementById('ingame-opts');
      if (ig && ig.style.display === 'flex') return false;
      openInspect({
        def: hit.def,
        inst: hit.inst,
        facedown: !!hit.facedown,
        uid: hit.uid,
        zone: hit.zone,
        buttons: [{ id: 'close', label: 'Zurück' }]
      });
      return true;
    }
    document.addEventListener('dblclick', function (ev) { openFromEvent(ev); }, true);
    document.addEventListener('contextmenu', function (ev) {
      var card = ev.target && ev.target.closest && ev.target.closest('#hand .card');
      if (card && ev.shiftKey) {
        /* Shift+Rechtsklick: verdeckt scharfschalten (früher Rechtsklick allein). */
        ev.preventDefault();
        ev.stopPropagation();
        if (!engine || !engine.state) return;
        var viewer = mode === 'hotseat' ? engine.state.active : you;
        var me = engine.state.players[viewer];
        var c = me.hand.find(function (x) { return x.uid === card.dataset.uid; });
        if (!c) return;
        document.querySelectorAll('#hand .card.picked').forEach(function (n) { n.classList.remove('picked'); });
        card.classList.add('picked');
        armHandCard(c.uid, viewer, true);
        return;
      }
      openFromEvent(ev);
    }, true);
  }


  function digInShieldSvg(size) {
    size = size || 22;
    return '<svg class="dig-in-shield-icon" width="' + size + '" height="' + Math.round(size * 1.18) + '" viewBox="0 0 24 28" aria-hidden="true">' +
      '<path d="M12 1.5 L21 5.2 V13.2 C21 19.2 16.8 24.2 12 26.5 C7.2 24.2 3 19.2 3 13.2 V5.2 Z" fill="#2a1c08" stroke="#e2c36a" stroke-width="1.6"/>' +
      '<path d="M12 4.2 L18.2 6.8 V13 C18.2 17.4 15.2 21.1 12 22.8 C8.8 21.1 5.8 17.4 5.8 13 V6.8 Z" fill="#c4aa5a" opacity="0.95"/>' +
      '<path d="M12 7.5 V18.2 M8.2 12.2 H15.8" stroke="#2a1c08" stroke-width="1.7" stroke-linecap="round"/>' +
      '</svg>';
  }
  /**
   * True, wenn die Instanz laut Stand eingegraben ist (nur Anzeige des Schilds).
   * @param {object} inst
   * @returns {boolean}
   */
  function isDigInProtected(inst) {
    if (!inst || !engine || !engine._isDeployProtected) return false;
    try { return !!engine._isDeployProtected(inst); } catch (e) { return false; }
  }
  function clearTargetHighlights() {
    document.querySelectorAll('.slot.legal-target, .slot.section-target, .front-line.section-pick').forEach(function (s) {
      s.classList.remove('legal-target');
      s.classList.remove('section-target');
      s.classList.remove('section-pick');
    });
  }
  /**
   * Markiert im offenen `pending` alle wählbaren Ziele. Kein Regelcode.
   */
  function highlightPendingTargets() {
    clearTargetHighlights();
    var pend = engine && engine.state && engine.state.pending;
    if (!pend || !pend.choices) return;
    var kinds = { 'attack-target': 1, 'instant-target': 1, napalm: 1, 'air-strike': 1, feint: 1, drone: 1, 'instant-section': 1, 'own-bonus': 1 };
    if (!kinds[pend.kind]) return;
    if (pend.kind === 'instant-section') {
      var secOwn = {};
      var secEnemy = {};
      (pend.choices || []).forEach(function (c) {
        if (!c || !c.section) return;
        if (c.side === 'enemy') secEnemy[c.section] = 1;
        else secOwn[c.section] = 1;
      });
      document.querySelectorAll('#my-front .slot').forEach(function (el) {
        var sec = el.getAttribute('data-section');
        if (sec && secOwn[sec]) el.classList.add('legal-target', 'section-target');
      });
      document.querySelectorAll('#enemy-front .slot').forEach(function (el) {
        var sec = el.getAttribute('data-section');
        if (sec && secEnemy[sec]) el.classList.add('legal-target', 'section-target');
      });
      return;
    }
    var allowed = {};
    (pend.choices || []).forEach(function (c) { if (c && c.target) allowed[c.target] = 1; });
    document.querySelectorAll('#enemy-front .slot.filled, #my-front .slot.filled, #enemy-support .slot.filled, #my-support .slot.filled').forEach(function (el) {
      var uid = el.getAttribute("data-uid");
      if (uid && allowed[uid]) el.classList.add("legal-target");
    });
  }

  /**
   * HTML einer Fronteinheit (Werte, Motiv, verdeckt).
   * @param {object} inst
   * @param {boolean} mine
   * @param {string} section
   * @param {number} row
   * @returns {string}
   */
  function unitHtml(inst, mine, section, row) {
    if (!inst) return '<div class="slot empty" data-drop="front" data-section="' + (section || '') + '" data-row="' + (row || 0) + '"></div>';
    try {
      return unitHtmlBody(inst, mine, section, row);
    } catch (err) {
      var d = {};
      try { d = engine.defOf(inst) || {}; } catch (e2) {}
      return '<div class="slot filled ' + (mine ? 'mine' : 'enemy') + '" data-uid="' + inst.uid + '" data-drop="front" data-section="' + (section || '') + '" data-row="' + (row || 0) + '">' +
        tableArt(d, !!(inst.facedown && !mine)) +
        '<div class="unit-stats">' + escapeHtml(d.name || 'Einheit') + '</div></div>';
    }
  }
  function unitHtmlBody(inst, mine, section, row) {
    var d = engine.defOf(inst);
    var st = engine.currentAtkDef(inst);
    var hide = !!(inst.facedown && !mine);
    var expl = (!hide && engine.explainStats) ? engine.explainStats(inst) : null;
    var locu = engine.findInst(inst.uid);
    var costAp = (d && d.ap != null) ? d.ap : 0;
    try {
      var owner = locu && locu.player;
      if (engine.costOf) costAp = engine.costOf(d, owner || null, null, inst);
    } catch (errCost) { costAp = (d && d.ap) || 0; }
    var stats = hide ? '' : ((expl ? slotStatHtml(expl) : ('ATK ' + st.atk + ' / DEF ' + st.def)) + ' · ' + costAp + ' AP');
    var tokens = '';
    var picked = engine.state.pending && (engine.state.pending.selected || []).indexOf(inst.uid) >= 0; // offene Wahl des Spielers
    var deadact = inst.flags && inst.flags.exhausted || inst.attackUsed;
    var tokHtml = '';
    if (locu && locu.zone === 'front') {
      var tok = engine.nmlAt(locu.player, locu.section, locu.row);
      if (tok) {
        var td = engine.defOf(tok);
        var face = tok.facedown;
        var cls = mine ? 'for-enemy' : 'for-me';
        tokHtml = '<div class="token-tri ' + cls + '">' + tableArt(td, face) + '</div>';
      }
    }
    var dig = isDigInProtected(inst);
    var fx = window.DCTableFx ? DCTableFx.unitFx(engine, inst, hide) : { cls: [], badges: [] };
    var pulseKind = (!hide && window.dcFxPulses) ? window.dcFxPulses[inst.uid] : '';
    var digTitle = dig ? ' title="Eingegraben — nicht angreifbar bis zum nächsten eigenen Zug"' : '';
    return '<div class="slot filled ' + (mine ? 'mine' : 'enemy') + (inst.facedown ? ' facedown' : '') + (picked ? ' picked' : '') + (deadact ? ' exhausted' : '') + (dig ? ' dig-in' : '') + (fx.cls.length ? ' ' + fx.cls.join(' ') : '') + '" data-uid="' + inst.uid + '" data-drop="front" data-section="' + (section||'') + '" data-row="' + (row||0) + '"' + digTitle + '>' +
      tokHtml + (window.DCTableFx ? DCTableFx.pulseHtml(pulseKind) : '') +
      (dig ? '<div class="dig-in-shield" aria-label="Eingegraben">' + digInShieldSvg(22) + '</div>' : '') +
      tableArt(d, hide) + slotFace(d, hide) +
      (inst.facedown && mine ? '<div class="unit-hint">verdeckt</div>' : '') +
      (dig ? '<div class="unit-hint">Eingegraben</div>' : '') +
      '<div class="unit-name">' + escapeHtml(hide ? 'Verdeckte Einheit' : ((d && d.name) || 'Einheit')) + '</div>' +
      '<div class="unit-stats">' + stats + '</div>' +
      (window.DCTableFx ? DCTableFx.badgesHtml(fx.badges) : '') +
      (!hide && deadact ? '<span class="table-status">' + (inst.attackUsed ? 'Angriff genutzt' : 'Erschöpft') + '</span>' : '') +
      (!hide && inst.defMax != null && inst.def < inst.defMax ? '<span class="table-status damage">Schaden ' + (inst.defMax - inst.def) + '</span>' : '') +
      tableAttachments(inst, hide) + '</div>'; // HTML-Sonderzeichen escapen
  }

  /* Neun Frontstellungen einer Seite als Linie. */
    function renderFront(p, mine) { // Frontlinie zeichnen
    var order = [['L',0],['L',1],['L',2],['C',0],['C',1],['C',2],['R',0],['R',1],['R',2]];
    var auraSecs = {};
    try {
      ((p.flags && p.flags.sectionAuras) || []).forEach(function (a) {
        if (a && a.untilTurn >= engine.state.turn) auraSecs[a.section] = a;
      });
      if (p.flags && p.flags.keinLoch && p.flags.keinLoch.until === engine.state.turn) {
        auraSecs[p.flags.keinLoch.section] = auraSecs[p.flags.keinLoch.section] || { kind: 'kein_loch' };
      }
    } catch (eA) {}
    var secFx = {};
    try { if (window.DCTableFx) secFx = DCTableFx.sectionFx(engine, p, mine); } catch (eS) {}
    var slots = order.map(function (pair) {
      var html = unitHtml(p.front[pair[0]][pair[1]], mine, pair[0], pair[1]);
      var sf = secFx[pair[0]];
      if (auraSecs[pair[0]] || sf) {
        html = html.replace('class="slot ', 'class="slot section-aura ' + (sf ? sf.cls.join(' ') + ' ' : ''));
        if (sf) {
          var secTitle = escapeHtml(sf.titles.join(' · '));
          html = html.replace('<div class="slot', '<div data-sec-fx="' + secTitle + '"' + (html.indexOf(' title="') < 0 ? ' title="' + secTitle + '"' : '') + ' class="slot');
        }
      }
      return html;
    }).join('');
    return '<div class="flank-legend"><span>Linke Flanke</span><span>Zentrum</span><span>Rechte Flanke</span></div>' +
      '<div class="front-line">' + slots + '</div>';
  }

  function cardClass(typ) {
    if (typ === 'Soforteinsatz') return 'sofort';
    if (typ === 'Einheit') return 'unit';
    if (typ === 'Ausrüstung') return 'eq';
    return '';
  }


  var bombLeft = 300;
  var bombKey = '';
  var bombTick = null;

  function bombLimit() {
    var el = document.getElementById('opt-timer');
    var n = el ? Number(el.value) : 300;
    if (!isFinite(n)) n = 300;
    n = Math.round(n / 30) * 30;
    if (n < 30) n = 30;
    if (n > 300) n = 300;
    return n;
  }
  function bombWarnAt(limit) {
    var w = Math.floor(limit / 6);
    if (w > 30) w = 30;
    if (w < 5) w = 5;
    return w;
  }
  function paintBomb() {
    var el = document.getElementById('bomb-clock');
    var box = document.getElementById('bomb-box');
    var lab = document.getElementById('bomb-label');
    if (!el) return;
    var s = Math.max(0, bombLeft);
    var m = Math.floor(s / 60);
    var r = s % 60;
    el.textContent = (m < 10 ? '0' : '') + m + ':' + (r < 10 ? '0' : '') + r;
    if (box) {
      box.classList.toggle('warn', s > 0 && s <= bombWarnAt(bombLimit()));
      box.classList.toggle('dead', s <= 0);
    }
    if (lab && engine && engine.state) {
      lab.textContent = engine.state.players[engine.state.active].name;
    }
  }
  function syncBombTimer() {
    if (!engine || !engine.state) return;
    var key = engine.state.turn + ':' + engine.state.active;
    if (key !== bombKey) {
      bombKey = key;
      bombLeft = bombLimit();
    }
    paintBomb();
    if (!bombTick) {
      bombTick = window.setInterval(function () {
        if (!engine || isTerminal(engine.state)) return;
        try { guardPendingUi(true); } catch (eGuard) {} // t259: Dialoge nie dauerhaft verlieren
        if (window.dcTimerHold || mode === 'tutorial') return; // t275: kein Zugtimer im Tutorial
        if (bombLeft > 0) {
          bombLeft -= 1;
          paintBomb();
          if (bombLeft <= 0 && activePlayer() === engine.state.active) {
            dispatch({ type: 'END_TURN', player: activePlayer() });
          }
        }
      }, 1000);
    }
  }
  window.dcArmTimer = function () {
    window.dcTimerHold = false;
    bombKey = '';
    syncBombTimer();
  };

  var recapShown = '';
  var recapTimer = 0;
  /** t259: Abbruch der zuletzt gestarteten Meldung (setzt nur deren cancelled-Flag). */
  var recapCancelPrev = null;
  /* Letzte Runde: Karte links, Text rechts, danach Revue. */
    /**
     * t256: Verdeckte Information in der Meldung nicht zeigen. Gezogene Karten des Gegners
     * und verdeckt gelegte Karten erscheinen mit der Rückseite statt mit dem Kartenbild.
     * @param {object} ev Engine-Ereignis
     * @returns {boolean}
     */
    function recapHidden(ev) {
      if (!ev) return false;
      var viewer = mode === 'hotseat' ? (engine && engine.state ? engine.state.active : 0) : you;
      var owner = ev.owner != null ? ev.owner : ev.actor;
      if (ev.kind === 'draw' && owner !== viewer) return true;
      if ((ev.kind === 'deploy' || ev.kind === 'support') && /verdeckte/.test(ev.text || '') && owner !== viewer) return true;
      return false;
    }
    function showRecap(items, whose, opts) { // Aktion erklären
    var ov = document.getElementById('overlay');
    if (!ov) return;
    // t259: Vorherige Meldung sauber beenden statt nur „ihren“ Timer zu löschen. Vorher teilten
    // sich alle Meldungen einen Timer; eine neue Meldung löschte den Tipp-Timer einer laufenden,
    // deren Promise löste nie auf (Text blieb z. B. bei „Test“ stehen) und die Meldungs-Pumpe
    // blieb bis zur langen Frist „beschäftigt“ (ui-play Seed 259).
    if (recapCancelPrev) { try { recapCancelPrev(); } catch (eRc) {} recapCancelPrev = null; }
    window.clearTimeout(recapTimer); // globale Schnittstelle der Seite
    ov.innerHTML =
      '<div class="recap-stage">' +
        '<div class="recap-left"><img id="recap-art" alt=""></div>' +
        '<div class="recap-right">' +
          '<h2>' + escapeHtml((opts && opts.title) || (opts && opts.live ? 'Meldung' : 'Letzte Runde')) + '</h2>' +
          '<p class="tiny" id="recap-whose">' + escapeHtml(whose || '') + '</p>' + // HTML-Sonderzeichen escapen
          '<div class="recap-typed" id="recap-typed"></div>' +
          '<button type="button" class="primary" id="recap-ok" style="display:none">Weiter</button>' +
        '</div>' +
      '</div>';
    hideHover();
    hideInspect(); // große Karte schließen
    ov.style.display = 'flex';
    var art = document.getElementById('recap-art');
    var typed = document.getElementById('recap-typed');
    var ok = document.getElementById('recap-ok');
    var list = (items && items.length) ? items.slice() : [];
    if (!list.length) { if (opts && opts.onDone) opts.onDone(); return; }
    opts = opts || {};
    var live = !!opts.live;
    var cancelled = false;
    var finished = false;
    var myTimers = [];
    recapCancelPrev = function () { cancelled = true; myTimers.forEach(function (t) { window.clearTimeout(t); }); };
    ok.onclick = function () {
      cancelled = true;
      window.clearTimeout(recapTimer); // globale Schnittstelle der Seite
      window.clearTimeout(deadline);
      ov.style.display = 'none';
    };
    /**
     * t256: Live-Meldung genau einmal abschließen (Overlay zu, onDone). Im Browser-Test blieb
     * eine Meldung mitten im Tippen stehen; danach liefen keine Meldungen mehr und der Zug war
     * blockiert. Absicherung: Klick auf die Meldung überspringt, eine Frist beendet sie sicher.
     */
    function finishLive() {
      if (finished) return;
      finished = true;
      cancelled = true;
      window.clearTimeout(deadline);
      if (ov.querySelector('#recap-typed') === typed) ov.style.display = 'none';
      else closeStaleWaitOverlay(); // t259: ersetzter Recap darf keinen Warte-Dialog hinterlassen
      if (opts.onDone) opts.onDone();
    }
    var holdMs = (window.DCTune && window.DCTune.dialogMs) || 2000;
    var deadline = live ? window.setTimeout(finishLive, list.length * (holdMs * 2 + 4000) + 5000) : 0;
    if (live) {
      var stage = ov.querySelector('.recap-stage');
      if (stage) {
        stage.title = 'Klicken: Meldung überspringen';
        stage.onclick = function () { finishLive(); };
      }
    }
    function wait(ms) {
      return new Promise(function (resolve) {
        recapTimer = window.setTimeout(resolve, ms); // später fortsetzen
        myTimers.push(recapTimer);
      });
    }
    function typeLine(text) {
      var line = document.createElement('p');
      line.className = 'recap-line';
      typed.appendChild(line);
      typed.scrollTop = typed.scrollHeight;
      var i = 0;
      return new Promise(function (resolve) {
        function tick() {
          if (cancelled) return resolve();
          if (i >= text.length) return resolve();
          line.textContent += text.charAt(i);
          i += 1;
          typed.scrollTop = typed.scrollHeight;
          var hold = (window.DCTune && window.DCTune.dialogMs) || 2000;
          var ch = Math.max(12, Math.min(70, hold / 50));
          recapTimer = window.setTimeout(tick, text.charAt(i - 1) === ' ' ? ch * 0.55 : ch);
          if (myTimers.length > 64) myTimers.splice(0, myTimers.length - 8);
          myTimers.push(recapTimer);
        }
        tick();
      });
    }
    async function run() {
      for (var n = 0; n < list.length; n++) {
        if (cancelled) return;
        var ev = list[n];
        var def = ev.cardId && CATALOG.cards.find(function (c) { return c.id === ev.cardId; });
        if (!def && ev.name) def = CATALOG.cards.find(function (c) { return c.name === ev.name; });
        var file = recapHidden(ev) ? backFile(null) : (ev.image || (def && def.image) || backFile(def));
        art.classList.remove('show');
        art.onerror = function () { if (window.dcImgErr) window.dcImgErr(art); };
        art.setAttribute('data-file', file);
        art.src = imgSrcFull(file) || imgSrc(file);
        void art.offsetWidth;
        art.classList.add('show');
        var hold = (window.DCTune && window.DCTune.dialogMs) || 2000;
        if (window.DC_REDUCE_MOTION) hold = Math.min(hold, 600);
        await wait(Math.min(700, hold * 0.35));
        await typeLine(ev.text || ev.name || ev.kind || '');
        await wait(hold);
      }
      if (cancelled) return;
      if (live) {
        finishLive();
        return;
      }
      typed.textContent = 'Bereit für deinen Zug.';
      ok.style.display = 'inline-block';
    }
    run();
  }

  var seenEvents = 0;
  var eventQueue = [];
  var eventPlaying = false;
  /** t259: true, solange Karten-Flüge vor einer Meldung laufen (Overlay dann bewusst zu). */
  var eventFlying = false;


  var lastRects = {};
  function rememberRects() {
    lastRects = {};
    document.querySelectorAll('[data-uid]').forEach(function (el) {
      lastRects[el.getAttribute('data-uid')] = el.getBoundingClientRect();
    });
  }
  function pileRect(id) {
    var el = document.getElementById(id);
    return el ? el.getBoundingClientRect() : { left: 40, top: 40, width: 112, height: 156 };
  }
  function flyCard(from, to, src, flip, done) {
    var layer = document.getElementById('fx-layer');
    if (!layer || !from || !to) { if (done) done(); return; }
    var el = document.createElement('div');
    el.className = 'fly' + (flip ? ' flip' : '');
    el.innerHTML = '<img alt="" src="' + src + '">';
    var ms = (window.DCTune && window.DCTune.flyMs != null) ? Number(window.DCTune.flyMs) : 800;
    if (window.DC_REDUCE_MOTION) ms = Math.min(ms, 200);
    el.style.transitionDuration = Math.max(1, ms) + 'ms';
    el.style.transform = 'translate(' + from.left + 'px,' + from.top + 'px)';
    el.style.width = from.width + 'px';
    el.style.height = from.height + 'px';
    layer.appendChild(el);
    if (ms <= 0) {
      el.remove();
      if (done) done();
      return;
    }
    (window.requestAnimationFrame || function (f) { return setTimeout(f, 16); })(function () {
      el.style.transform = 'translate(' + to.left + 'px,' + to.top + 'px) scale(.72)';
    });
    setTimeout(function () { el.style.opacity = '0'; }, Math.max(40, ms * 0.75));
    setTimeout(function () { el.remove(); if (done) done(); }, ms + 80);
  }
  function updatePiles() {
    if (!engine) return;
    var viewer = mode === 'hotseat' ? engine.state.active : you;
    var me = engine.state.players[viewer];
    var foe = engine.state.players[viewer === 0 ? 1 : 0];
    function set(id, n) { var el = document.getElementById(id); if (el) el.textContent = n; }
    set('n-my-deck', me.deck.length);
    set('n-my-grave', me.grave.length);
    set('n-enemy-deck', foe.deck.length);
    set('n-enemy-grave', foe.grave.length);
    function showTop(id, cards) {
      var img = document.querySelector('#' + id + ' img');
      if (!img) return;
      var file, src;
      if (cards && cards.length) {
        var d = engine.defOf(cards[cards.length - 1]);
        file = (window.dcCardImage ? dcCardImage(d) : (d && d.image)) || backFile(null);
        src = imgSrcFull(file) || imgSrc(file);
      } else {
        file = backFile(null);
        src = imgSrc(file);
      }
      if (img.getAttribute('data-file') === file && img.getAttribute('src')) return;
      img.setAttribute('data-file', file);
      img.setAttribute('data-i', '0');
      img.setAttribute('data-full', cards && cards.length ? '1' : '0');
      delete img.dataset.dead;
      img.onerror = function () { window.dcImgErr(img); };
      img.src = src;
    }
    showTop('pile-my-grave', me.grave);
    showTop('pile-enemy-grave', foe.grave);
  }

  function isLiveEvent(ev) {
    if (!ev) return false;
    if (ev.kind === 'reveal') return false;
    return true;
  }
  function presentNewEvents() {
    if (!engine || !engine.state || isTerminal(engine.state)) return;
    var all = engine.state.events || [];
    if (all.length > seenEvents) {
      var fresh = all.slice(seenEvents);
      // SFX für neue Engine-Events (fehlende Dateien = still)
      { // optional audio is isolated by audioCall
        fresh.forEach(function (ev) {
          try {
            var def = null;
            if (ev.cardId && engine.byId) def = engine.byId[ev.cardId];
            if (!def && ev.name) def = { name: ev.name, tags: [], typ: '', image: ev.image };
            // Mine / Minenfeld
            if (ev.name && /Minenfeld|Mine/i.test(ev.name)) {
              audioCall('playSfx', 'mine', { prio: 1, duck: 0.4, duckMs: 800 });
              return;
            }
            if (ev.kind === 'reveal') {
              audioCall('playSfx', 'reveal', { prio: 2 });
              return;
            }
            if (ev.kind === 'support') {
              audioCall('playSfx', 'deploy-unterstuetzung', { prio: 2 });
              return;
            }
            // deploy/equip/instant/attack kommen schon aus dem Action-Hook — hier nur Rest
            if (ev.kind === 'destroy' || ev.kind === 'draw' ||
                ev.kind === 'coin' || ev.kind === 'vp' || ev.kind === 'trophy') {
              audioCall('playEvent', Object.assign({}, ev, { _def: def }));
            }
          } catch (eEv) {}
        });
      }
      eventQueue = eventQueue.concat(fresh.filter(isLiveEvent));
      seenEvents = all.length;
    }
    pumpEvents();
  }
  function showEndTurnGate() {
    var ov = document.getElementById('overlay');
    if (!ov) return;
    eventPlaying = true;
    ov.innerHTML = '<div class="modal"><h2>Zugende</h2><p>Bereit für den nächsten Zug?</p>' +
      '<button type="button" class="primary" id="end-ok">Bestätigen</button></div>';
    ov.style.display = 'flex';
    document.getElementById('end-ok').onclick = function () {
      ov.style.display = 'none';
      eventPlaying = false;
      maybeBot();
    };
  }

  function pumpEvents() {
    if (!engine || isTerminal(engine.state) || eventPlaying) return;
    if (!eventQueue.length) {
      closeStaleWaitOverlay();
      if (engine && engine.state && engine.state.pending && engine.state.pending.player === activePlayer()) showPending();
      return;
    }
    eventPlaying = true;
    eventFlying = true;
    var eventEngine = engine;
    var batch = eventQueue.splice(0);
    if (!batch.length) { eventPlaying = false; eventFlying = false; return; }
    var titles = { attack: 'Kampfhandlung', destroy: 'Kampfhandlung', shout: 'Kampfhandlung', coin: 'Münze', spell: 'Einsatz', instant: 'Einsatz', deploy: 'Ausspielen', equip: 'Ausrüstung', support: 'Support', vp: 'Siegpunkt' };
    function flyOne(i, after) {
      if (engine !== eventEngine || !engine || isTerminal(engine.state)) return;
      if (i >= batch.length) { after(); return; }
      var ev = batch[i];
      if (ev.kind !== 'draw' && ev.kind !== 'destroy') { flyOne(i + 1, after); return; }
      var back = imgSrc(backFile(null));
      var face = imgSrc(ev.image || backFile(null));
      var viewer = mode === 'hotseat' ? engine.state.active : you;
      var owner = (ev.owner != null ? ev.owner : ev.actor);
      var mine = owner === viewer;
      if (ev.kind === 'draw') {
        flyCard(pileRect(mine ? 'pile-my-deck' : 'pile-enemy-deck'), pileRect('hand') || pileRect('pile-my-deck'), back, !!mine, function () { flyOne(i + 1, after); });
        return;
      }
      var from = (ev.uid && lastRects[ev.uid]) || pileRect(mine ? 'my-front' : 'enemy-front');
      flyCard(from, pileRect(mine ? 'pile-my-grave' : 'pile-enemy-grave'), face || back, false, function () { flyOne(i + 1, after); });
    }
    flyOne(0, function () {
      eventFlying = false;
      if (engine !== eventEngine || !engine || isTerminal(engine.state)) return;
      showRecap(batch, '', {
        live: true,
        title: titles[batch[0] && batch[0].kind] || 'Handlung',
        onDone: function () {
          eventPlaying = false;
          pumpEvents();
        }
      });
    });
  }


  function showActChooser(loc, d, viewer) {
    var canAtk = !loc.inst.facedown && !loc.inst.attackUsed && !(loc.inst.flags && loc.inst.flags.exhausted);
    var canAb = (d.effects || []).some(function (x) {
      return x.code === 'REVEAL_STRIKE' || x.code === 'VERSCHIEBEN' || x.code === 'AUFKLAERUNG' || x.code === 'FOG_TOKEN';
    });
    var canRev = !!loc.inst.facedown;
    if (!canAtk && !canAb && !canRev) {
      openInspect({ def: d, inst: loc.inst, facedown: loc.inst.facedown, uid: loc.inst.uid, buttons: [{ id: 'close', label: 'Zurück' }] });
      return;
    }
    var ov = document.getElementById('overlay');
    var html = '<div class="modal card-only"><div class="pick-row">' + artTag(d, loc.inst.facedown) + '</div><div class="acts">';
    if (canAtk) html += '<button type="button" class="primary" id="ac-atk">Angriff</button>';
    if (canAb) html += '<button type="button" id="ac-ab">Fähigkeit</button>';
    if (canRev) html += '<button type="button" id="ac-rev">Aufdecken</button>';
    html += '<button type="button" id="ac-view">Ansehen</button>';
    html += '<button type="button" id="ac-x">Zurück</button></div></div>';
    ov.innerHTML = html;
    ov.style.display = 'flex';
    function go(fn) { ov.style.display = 'none'; fn(); }
    var a = document.getElementById('ac-atk');
    if (a) a.onclick = function () { go(function () { dispatch({ type: 'ATTACK', player: viewer, uid: loc.inst.uid }); }); };
    var b = document.getElementById('ac-ab');
    if (b) b.onclick = function () { go(function () { dispatch({ type: 'USE_ABILITY', player: viewer, uid: loc.inst.uid }); }); };
    var r = document.getElementById('ac-rev');
    if (r) r.onclick = function () { go(function () { dispatch({ type: 'REVEAL_UNIT', player: viewer, uid: loc.inst.uid }); }); };
    var v = document.getElementById('ac-view');
    if (v) v.onclick = function () {
      ov.style.display = 'none';
      openInspect({ def: d, inst: loc.inst, facedown: loc.inst.facedown, uid: loc.inst.uid, buttons: [{ id: 'close', label: 'Zurück' }] });
    };
    document.getElementById('ac-x').onclick = function () { ov.style.display = 'none'; };
  }
  var placing = false;
  /**
   * Kurzer Hinweis in der Statuszeile.
   * @param {string} msg
   */
  function say(msg) {
    var hint = document.getElementById('hint');
    if (hint) hint.textContent = msg;
    var lab = document.getElementById('my-front-label');
    if (lab) lab.textContent = msg;
  }
  /**
   * Spielt eine Handkarte auf einen Slot über `dispatch` (nach legaler Markierung).
   * @param {string} uid
   * @param {object} slot
   * @param {number} viewer
   * @param {boolean} [facedown]
   */
  function placeFromHand(uid, slot, viewer, facedown) {
    if (!engine || isTerminal(engine.state) || placing) return;
    placing = true;
    window.setTimeout(function () { placing = false; }, 0);
    var me = engine.player(viewer);
    var card = me.hand.find(function (c) { return c.uid === uid; });
    var hint = document.getElementById('hint');
    if (!card || !slot) {
      if (!slot) say('Nicht auf einem Feld losgelassen.');
      return;
    }
    var def = engine.defOf(card);
    var cost = engine.costOf(def, me, null, card);
    if (me.ap < cost) {
      say('Nicht genug AP (' + me.ap + '/' + cost + '). ' + def.name + ' bleibt auf der Hand.');
      return;
    }
    var active = engine.state.active === viewer && engine.state.phase === 'main';
    if (def.typ !== 'Soforteinsatz' && !active) {
      if (hint) hint.textContent = 'Nur Soforteinsätze außerhalb deines Zuges.';
      return;
    }
    var front = slot.closest && slot.closest('#my-front');
    var support = slot.closest && slot.closest('#my-support');
    var enemy = slot.closest && slot.closest('#enemy-front, #enemy-support');
    var open = !slot.getAttribute('data-uid');
    if (def.typ === 'Einheit' && front && open) {
      var nodes = document.querySelectorAll('#my-front .front-line .slot');
      var ix = Array.prototype.indexOf.call(nodes, slot);
      var section = slot.getAttribute('data-section');
      var row = Number(slot.getAttribute('data-row'));
      if (ix >= 0) {
        section = ['L', 'C', 'R'][Math.floor(ix / 3)];
        row = ix % 3;
      }
      if ((section !== 'L' && section !== 'C' && section !== 'R') || !(row >= 0 && row <= 2)) {
        if (hint) hint.textContent = 'Einheiten auf ein freies Feld der eigenen Front.';
        return;
      }
      dispatch({
        type: 'PLAY',
        player: viewer,
        uid: uid,
        facedown: !!facedown,
        slot: { section: section, row: row }
      });
      stickPlayedUnit(viewer, uid);
      var laid = engine.player(viewer).front[section] && engine.player(viewer).front[section][row] && engine.player(viewer).front[section][row].uid === uid;
      if (!laid) {
        ['L', 'C', 'R'].forEach(function (sec) {
          if (laid) return;
          var line = engine.player(viewer).front[sec] || [];
          line.forEach(function (cell, n) {
            if (cell && cell.uid === uid) { section = sec; row = n; laid = true; }
          });
        });
      }
      if (hint) hint.textContent = laid ? (def.name + ' liegt auf ' + section + (row + 1) + '.') : 'Nicht gelegt. Es wurden keine Punkte abgezogen.';
      say(laid ? (def.name + ' liegt auf ' + section + (row + 1) + '.') : 'Nicht gelegt. Es wurden keine Punkte abgezogen.');
      return;
    }
    if (def.typ === 'Unterstützung' && support && open) {
      dispatch({
        type: 'PLAY',
        player: viewer,
        uid: uid,
        facedown: !!facedown,
        slot: { section: 'support', row: Number(slot.getAttribute('data-row')) }
      });
      return;
    }
    if (def.typ === 'Ausrüstung' && slot.dataset.uid && front) {
      dispatch({ type: 'PLAY', player: viewer, uid: uid });
      if (engine.state.pending && engine.state.pending.kind === 'equip') {
        dispatch({ type: 'CHOOSE_TARGET', player: viewer, target: slot.dataset.uid });
      }
      return;
    }
    if (def.typ === 'Soforteinsatz') {
      var isSec = false;
      try { isSec = !!(engine && engine._isSectionEffect && engine._isSectionEffect(def)); } catch (e1) {}
      if (isSec) {
        var sec = slot.getAttribute('data-section');
        var side = enemy ? 'enemy' : 'own';
        dispatch({ type: 'PLAY', player: viewer, uid: uid });
        if (engine.state.pending && engine.state.pending.kind === 'instant-section' && sec) {
          dispatch({ type: 'CHOOSE_TARGET', player: viewer, target: 'sec:' + side + ':' + sec });
        }
        return;
      }
      if (enemy && slot.dataset.uid) {
        dispatch({ type: 'PLAY', player: viewer, uid: uid, target: slot.dataset.uid });
        if (engine.state.pending && (engine.state.pending.kind === 'instant-target' || engine.state.pending.kind === 'resist-unit' || engine.state.pending.kind === 'clear-atk' || engine.state.pending.kind === 'instant-section')) {
          if (engine.state.pending.kind === 'instant-section') {
            dispatch({ type: 'CHOOSE_TARGET', player: viewer, target: 'sec:enemy:' + (slot.getAttribute('data-section') || 'C') });
          } else {
            dispatch({ type: 'CHOOSE_TARGET', player: viewer, target: slot.dataset.uid });
          }
        }
        return;
      }
    }
    if (hint) hint.textContent = def.typ === 'Einheit' ? 'Einheiten auf ein freies Feld der eigenen Front.' : 'Dieses Feld nimmt die Karte nicht.';
  }
  function stickPlayedUnit(viewer, uid) {
    var pl = engine.player(viewer);
    if (!pl) return;
    var where = null;
    ['L', 'C', 'R'].forEach(function (sec) {
      (pl.front[sec] || []).forEach(function (cell, n) {
        if (cell && cell.uid === uid) where = { section: sec, row: n, card: cell };
      });
    });
    if (!pl.hand.some(function (c) { return c.uid === uid; })) {
      document.querySelectorAll('#hand .card').forEach(function (el) {
        if (el.getAttribute('data-uid') === uid) el.remove();
      });
    }
    if (!where) return;
    var nodes = document.querySelectorAll('#my-front .front-line .slot');
    var ix = ['L', 'C', 'R'].indexOf(where.section) * 3 + where.row;
    if (nodes[ix]) nodes[ix].outerHTML = unitHtml(where.card, true, where.section, where.row);
    var host = document.getElementById('my-front');
    if (host) host._dcHtml = '';
  }
  window.dcAcceptDrop = function (slot, uid) {
    placeFromHand(uid, slot, window.dcViewer, false);
  };
  window.dcCardZone = function (uid) {
    if (!engine || window.dcViewer == null || !uid) return '';
    var me = engine.player(window.dcViewer);
    if (!me) return '';
    var card = me.hand.find(function (c) { return c.uid === uid; });
    if (!card) return '';
    var def = engine.defOf(card);
    if (!def) return '';
    if (def.typ === 'Einheit') return 'front';
    if (def.typ === 'Unterstützung') return 'support';
    if (def.typ === 'Ausrüstung') return 'equip';
    return '';
  };
  window.dcDragNote = function (uid) {
    if (!engine || window.dcViewer == null || !uid) return '';
    var me = engine.player(window.dcViewer);
    if (!me) return '';
    var card = me.hand.find(function (c) { return c.uid === uid; });
    if (!card) return '';
    var def = engine.defOf(card);
    var cost = engine.costOf(def, me, null, card);
    return def.name + ' kostet ' + cost + ' AP, vorhanden ' + me.ap + (me.ap < cost ? ' — nicht genug' : '');
  };
  function legalSelector(def) {
    if (!def) return '';
    if (def.typ === 'Einheit') return '#my-front .slot.empty';
    if (def.typ === 'Unterstützung') return '#my-support .slot.empty';
    if (def.typ === 'Ausrüstung') return '#my-front .slot.filled';
    if (def.typ === 'Soforteinsatz') {
      try {
        if (engine && engine._isSectionEffect && engine._isSectionEffect(def)) {
          var side = engine._sectionTargetSide(def);
          if (side === 'enemy') return '#enemy-front .slot';
          if (side === 'any') return '#my-front .slot, #enemy-front .slot';
          return '#my-front .slot';
        }
      } catch (eSec) {}
      return '#enemy-front .slot.filled, #enemy-support .slot.filled, #my-front .slot.filled';
    }
    return '';
  }
  function clearDropMarks() {
    document.querySelectorAll('.slot.legal, .slot.drop-ok').forEach(function (s) {
      s.classList.remove('legal', 'drop-ok');
    });
  }
  function showDeploySlots() {
    clearDropMarks();
    document.body.classList.add('dc-armed');
    document.querySelectorAll('#my-front .slot.empty').forEach(function (s) { s.classList.add('legal'); });
    var hint = document.getElementById('hint');
    if (hint) hint.textContent = 'Feld antippen. Die Karte verlässt die Hand erst dann.';
  }
  document.addEventListener('keydown', function (ev) {
    if (ev.key !== 'Enter' && ev.key !== ' ') return;
    var tile = ev.target;
    if (!tile || !tile.matches || !tile.matches('.slot[role="button"], .doctrine-card[role="button"]')) return;
    if (!engine || isTerminal(engine.state)) return;
    ev.preventDefault(); tile.click();
  });
  document.addEventListener('click', function (ev) {
    var tile = ev.target && ev.target.closest && ev.target.closest('[data-equipment]');
    if (!tile || !engine || isTerminal(engine.state)) return;
    ev.preventDefault(); ev.stopImmediatePropagation();
    var found = null;
    engine.state.players.forEach(function (p) {
      engine.frontList(p).forEach(function (loc) {
        (loc.inst.attachments || []).forEach(function (eq) { if (eq.uid === tile.dataset.equipment) found = eq; });
      });
    });
    if (found) openInspect({ def: engine.defOf(found), inst: found, uid: found.uid, zone: 'equipment', buttons: [{ id: 'close', label: 'Zurück' }] });
  }, true);
  if (!window.dcSlotClick) {
    window.dcSlotClick = true;
    document.addEventListener('click', function (ev) {
      if (suppressHandClick || window.dcSuppressClick) return;
      if (!engine || !engine.state) return;
      var t = ev.target;
      if (!t || !t.closest) return;
      var slot = t.closest('.slot');
      if (!slot) return;
      var pend = engine.state.pending;
      if (pend && (pend.kind === 'deploy' || pend.kind === 'move-dest') && slot.classList.contains('empty') && slot.closest('#my-front')) {
        ev.preventDefault();
        ev.stopPropagation();
        dispatch({
          type: 'CHOOSE_SLOT',
          player: pend.player,
          slot: { section: slot.getAttribute('data-section'), row: Number(slot.getAttribute('data-row')) }
        });
        return;
      }
      if (!armedPlay || !slot.classList.contains('legal')) return;
      ev.preventDefault();
      ev.stopPropagation();
      var a = armedPlay;
      armedPlay = null;
      document.body.classList.remove('dc-armed');
      clearDropMarks();
      document.querySelectorAll('#hand .card.picked').forEach(function (c) { c.classList.remove('picked'); });
      placeFromHand(a.uid, slot, a.who, a.facedown);
    }, true);
  }
  function markLegalSlots(def) {
    var sel = legalSelector(def);
    if (!sel) return;
    document.querySelectorAll(sel).forEach(function (s) { s.classList.add('legal'); });
  }
  function bindBoardDrops(viewer) {
    document.querySelectorAll('#my-front .slot, #my-support .slot, #enemy-front .slot.filled, #enemy-support .slot.filled').forEach(function (slot) {
      slot.ondragover = function (ev) {
        ev.preventDefault();
        if (ev.dataTransfer) ev.dataTransfer.dropEffect = 'move';
        slot.classList.add('drop-ok');
      };
      slot.ondragleave = function () { slot.classList.remove('drop-ok'); };
      slot.ondrop = function (ev) {
        ev.preventDefault();
        slot.classList.remove('drop-ok');
        var raw = ev.dataTransfer ? ev.dataTransfer.getData('text/plain') : '';
        var data;
        try { data = JSON.parse(raw); } catch (e) { return; }
        if (!data || data.from !== 'hand' || !data.uid) return;
        clearDropMarks();
        document.body.classList.remove('dc-dragging');
        placeFromHand(data.uid, slot, viewer, !!data.facedown);
      };
    });
    
    document.querySelectorAll('#my-front .slot, #enemy-front .slot').forEach(function (slot) {
      var prevClick = slot.onclick;
      slot.addEventListener('click', function (ev) {
        var pend = engine.state.pending;
        if (!pend || pend.kind !== 'instant-section' || pend.player !== viewer) return;
        var sec = slot.getAttribute('data-section');
        if (!sec) return;
        var side = slot.closest('#enemy-front') ? 'enemy' : 'own';
        var tid = 'sec:' + side + ':' + sec;
        var ok = (pend.choices || []).some(function (c) { return c && c.target === tid; });
        if (!ok) return;
        ev.preventDefault();
        ev.stopPropagation();
        dispatch({ type: 'CHOOSE_TARGET', player: viewer, target: tid });
      }, true);
    });
document.querySelectorAll('#my-front .slot.empty, #my-support .slot.empty').forEach(function (slot) {
      slot.onclick = function () {
        if (armedPlay) {
          var a = armedPlay;
          armedPlay = null;
          clearDropMarks();
          placeFromHand(a.uid, slot, a.who, a.facedown);
          return;
        }
        var pend = engine.state.pending;
        if (pend && (pend.kind === 'deploy' || pend.kind === 'move-dest') && pend.player === viewer && slot.closest('#my-front')) {
          dispatch({ type: 'CHOOSE_SLOT', player: viewer, slot: { section: slot.getAttribute('data-section'), row: Number(slot.getAttribute('data-row')) } });
        }
      };
    });
    document.querySelectorAll('#my-front .slot.filled').forEach(function (el) {
      el.draggable = true;
      el.ondragstart = function (ev) {
        ev.dataTransfer.setData('text/plain', JSON.stringify({ from: 'front', uid: el.dataset.uid }));
      };
    });
    document.querySelectorAll('#enemy-front .slot.filled').forEach(function (slot) {
      var prev = slot.ondrop;
      slot.ondragover = function (ev) { ev.preventDefault(); if (ev.dataTransfer) ev.dataTransfer.dropEffect = 'move'; slot.classList.add('drop-ok'); };
      slot.ondrop = function (ev) {
        ev.preventDefault();
        slot.classList.remove('drop-ok');
        var data;
        try { data = JSON.parse(ev.dataTransfer.getData('text/plain')); } catch (e) { return; }
        if (data.from === 'front' && data.uid) {
          dispatch({ type: 'ATTACK', player: viewer, uid: data.uid });
          if (engine.state.pending && engine.state.pending.kind === 'attack-target') {
            dispatch({ type: 'CHOOSE_TARGET', player: viewer, target: slot.dataset.uid });
          }
          return;
        }
        if (data.from === 'hand' && data.uid) {
          clearDropMarks();
          document.body.classList.remove('dc-dragging');
          placeFromHand(data.uid, slot, viewer, !!data.facedown);
          return;
        }
        if (prev) prev(ev);
      };
    });
  }
  var armedPlay = null;
  var suppressHandClick = false;
  function showDragGhost(el, x, y) {
    var ghost = document.getElementById('dc-ghost');
    if (!ghost) {
      ghost = document.createElement('div');
      ghost.id = 'dc-ghost';
      document.body.appendChild(ghost);
    }
    var img = el.querySelector('img');
    ghost.innerHTML = img ? '<img alt="" src="' + img.src + '">' : '';
    ghost.style.display = 'block';
    ghost.style.left = (x + 12) + 'px';
    ghost.style.top = (y + 12) + 'px';
  }
  function moveDragGhost(x, y) {
    var ghost = document.getElementById('dc-ghost');
    if (!ghost) return;
    ghost.style.left = (x + 12) + 'px';
    ghost.style.top = (y + 12) + 'px';
  }
  function hideDragGhost() {
    var ghost = document.getElementById('dc-ghost');
    if (ghost) ghost.style.display = 'none';
  }
  function slotFromPoint(x, y) {
    var stack = document.elementsFromPoint ? document.elementsFromPoint(x, y) : [];
    var i, n, s;
    for (i = 0; i < stack.length; i++) {
      n = stack[i];
      if (!n || !n.closest) continue;
      if (n.id === 'dc-ghost' || n.closest('#dc-ghost') || n.closest('#hand') || n.closest('.hand-dock')) continue;
      s = n.closest('.slot');
      if (s && s.classList.contains('legal')) return s;
    }
    var slots = document.querySelectorAll('.slot.legal');
    for (i = 0; i < slots.length; i++) {
      var r = slots[i].getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return slots[i];
    }
    return null;
  }
  function zoneSlotAt(rootSel, x, y) {
    var host = document.querySelector(rootSel);
    if (!host) return null;
    var slots = host.querySelectorAll('.slot');
    var best = null;
    var bestD = 1e9;
    var i;
    for (i = 0; i < slots.length; i++) {
      if (slots[i].getAttribute('data-uid')) continue;
      var r = slots[i].getBoundingClientRect();
      if (r.width < 2 || r.height < 2) continue;
      var cx = (r.left + r.right) / 2;
      var cy = (r.top + r.bottom) / 2;
      if (x >= r.left - 16 && x <= r.right + 16 && y >= r.top - 36 && y <= r.bottom + 36) return slots[i];
      var d = Math.abs(x - cx) + Math.abs(y - cy);
      if (d < bestD) { bestD = d; best = slots[i]; }
    }
    var line = host.querySelector('.front-line') || host;
    var box = line.getBoundingClientRect();
    if (best && x >= box.left - 8 && x <= box.right + 8 && y >= box.top - 28 && y <= box.bottom + 28 && bestD < 160) return best;
    return null;
  }
  function startHandDrag(ev, el, card, who) {
    if (ev.button != null && ev.button !== 0) return;
    var startX = ev.clientX;
    var startY = ev.clientY;
    var moved = false;
    var hover = null;
    var lastX = startX;
    var lastY = startY;
    try { el.setPointerCapture(ev.pointerId); } catch (err) {}
    function move(e) {
      lastX = e.clientX;
      lastY = e.clientY;
      if (!moved && Math.abs(e.clientX - startX) + Math.abs(e.clientY - startY) < 6) return;
      if (!moved) {
        moved = true;
        armedPlay = null;
        document.body.classList.add('dc-dragging');
        clearDropMarks();
        markLegalSlots(engine.defOf(card));
        showDragGhost(el, e.clientX, e.clientY);
      }
      if (e.cancelable) e.preventDefault();
      moveDragGhost(e.clientX, e.clientY);
      var over = slotFromPoint(e.clientX, e.clientY);
      var defNow = engine.defOf(card);
      if ((!over || !(over.closest && over.closest('#my-front'))) && defNow && defNow.typ === 'Einheit') over = zoneSlotAt('#my-front', e.clientX, e.clientY);
      if (!over && defNow && defNow.typ === 'Unterstützung') over = zoneSlotAt('#my-support', e.clientX, e.clientY);
      hover = over || hover;
      document.querySelectorAll('.slot.drop-ok').forEach(function (s) { s.classList.remove('drop-ok'); });
      if (over) over.classList.add('drop-ok');
    }
    function up(e) {
      window.removeEventListener('pointermove', move, true);
      window.removeEventListener('pointerup', up, true);
      window.removeEventListener('pointercancel', up, true);
      try { el.releasePointerCapture(e.pointerId); } catch (err2) {}
      hideDragGhost();
      if (!moved) {
        document.body.classList.remove('dc-dragging');
        return;
      }
      suppressHandClick = true;
      window.setTimeout(function () { suppressHandClick = false; }, 400);
      var x = e.clientX || lastX;
      var y = e.clientY || lastY;
      var def = engine.defOf(card);
      var slot = null;
      if (def && def.typ === 'Einheit') slot = zoneSlotAt('#my-front', x, y);
      if (!slot) slot = slotFromPoint(x, y);
      if (!slot && def && def.typ === 'Unterstützung') slot = zoneSlotAt('#my-support', x, y);
      if (!slot && hover && def && def.typ === 'Einheit' && hover.closest && hover.closest('#my-front')) slot = hover;
      if (!slot && hover && def && def.typ === 'Unterstützung' && hover.closest && hover.closest('#my-support')) slot = hover;
      document.body.classList.remove('dc-dragging');
      clearDropMarks();
      if (slot) placeFromHand(card.uid, slot, who, false);
      else {
        var hint = document.getElementById('hint');
        if (hint) hint.textContent = 'Nicht auf der eigenen Front oder im Support losgelassen.';
      }
    }
    window.addEventListener('pointermove', move, true);
    window.addEventListener('pointerup', up, true);
    window.addEventListener('pointercancel', up, true);
  }
  function armHandCard(uid, who, facedown) {
    if (!engine || isTerminal(engine.state)) return;
    var mep = engine.player(who);
    var card = mep.hand.find(function (c) { return c.uid === uid; });
    if (!card) return;
    var def = engine.defOf(card);
    armedPlay = { uid: uid, who: who, facedown: !!facedown };
    document.body.classList.add('dc-armed');
    clearDropMarks();
    markLegalSlots(def);
    var hint = document.getElementById('hint');
    if (hint) hint.textContent = 'Ausgewählt. Leuchtendes Feld antippen. Nochmal auf die Karte: abbrechen.';
    document.querySelectorAll('.slot.legal').forEach(function (slot) {
      slot.onclick = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        var a = armedPlay;
        armedPlay = null;
        clearDropMarks();
        if (a) placeFromHand(a.uid, slot, a.who, a.facedown);
      };
    });
  }
  if (!window.dcHandDrop) {
    window.dcHandDrop = true;
    document.addEventListener('dragover', function (ev) {
      if (document.body.classList.contains('dc-dragging')) ev.preventDefault();
    });
    document.addEventListener('drop', function (ev) {
      if (!document.body.classList.contains('dc-dragging')) return;
      var raw = '';
      try { raw = ev.dataTransfer.getData('text/plain') || ''; } catch (e) { return; }
      var data;
      try { data = JSON.parse(raw); } catch (e2) { return; }
      if (!data || data.from !== 'hand' || !data.uid) return;
      ev.preventDefault();
      var slot = ev.target && ev.target.closest ? ev.target.closest('.slot') : null;
      if (!slot || !slot.classList.contains('legal')) {
        var stack = document.elementsFromPoint ? document.elementsFromPoint(ev.clientX, ev.clientY) : [];
        slot = null;
        for (var i = 0; i < stack.length; i++) {
          var n = stack[i];
          if (!n || !n.closest || n.closest('#hand') || n.closest('.hand-dock')) continue;
          var s = n.closest('.slot');
          if (s && s.classList.contains('legal')) { slot = s; break; }
        }
      }
      document.body.classList.remove('dc-dragging');
      if (slot) placeFromHand(data.uid, slot, data.viewer, !!data.facedown);
      else {
        var hint = document.getElementById('hint');
        if (hint) hint.textContent = 'Nicht auf einem leuchtenden Feld losgelassen.';
      }
      clearDropMarks();
    });
  }

  function applyHtml(el, html) {
    if (!el) return false;
    if (el._dcHtml === html) return false;
    el._dcHtml = html;
    el.innerHTML = html;
    return true;
  }
  /* Gesamten Tisch aus dem Engine-Stand neu aufbauen. */
    function render() { // Tisch neu zeichnen
    bindInspectGestures();
    if (!engine || !engine.state || !engine.state.players) return;
    if (!armedPlay && (!engine.state.pending || engine.state.pending.kind !== 'deploy')) document.body.classList.remove('dc-armed');
    var st = engine.state;
    var p0 = st.players[0], p1 = st.players[1];
    var viewer = mode === 'hotseat' ? st.active : you;
    window.dcViewer = viewer;
    var me = st.players[viewer];
    var foe = st.players[viewer === 0 ? 1 : 0];
    $('#turnmeta').textContent = 'Zug ' + st.turn + ' · am Zug: ' + st.players[st.active].name + (st.winner != null ? ' · ENDE: ' + st.endReason : '');
    syncBombTimer();
    // Startspieler Zug 1: Badge „(Start: N)“ nur, wenn ein AP-Abzug aktiv ist (seit t257 Standard 0 → kein Badge)
    var startAp = st.starterFirstTurnAp;
    var startNote = (startAp != null && startAp < Number((engine.rules && engine.rules.ap_per_turn) || 5)) ? ' (Start: ' + startAp + ')' : '';
    var apNote0 = (st.turn === 1 && st.startCoin && st.startCoin.winner === 0 && st.active === 0) ? startNote : '';
    var apNote1 = (st.turn === 1 && st.startCoin && st.startCoin.winner === 1 && st.active === 1) ? startNote : '';
    var vpNeed = (engine._trophyVpToWin && engine._trophyActive && engine._trophyActive())
      ? engine._trophyVpToWin()
      : (Number((engine.rules && engine.rules.vp_to_win) || 5));
    $('#ap0').textContent = p0.name + ' · ' + p0.ap + ' AP' + apNote0 + ' · SP ' + (p0.vp || 0) + '/' + vpNeed + ' · Hand ' + p0.hand.length + ' · Deck ' + p0.deck.length;
    $('#ap1').textContent = p1.name + ' · ' + p1.ap + ' AP' + apNote1 + ' · SP ' + (p1.vp || 0) + '/' + vpNeed + ' · Hand ' + p1.hand.length + ' · Deck ' + p1.deck.length;
    // Handkarten
    function setLabel(id, text) { var el = document.getElementById(id); if (el) el.textContent = text; } // sichtbaren Text setzen
    setLabel('enemy-support-label', foe.name + ' — Support'); // Unterstützungszone
    setLabel('enemy-front-label', foe.name + ' — Front');
    setLabel('my-front-label', me.name + ' — Front');
    setLabel('my-support-label', me.name + ' — Support'); // Unterstützungszone
    try { window.dcFxPulses = window.DCTableFx ? DCTableFx.pulses(engine) : {}; } catch (eFx) { window.dcFxPulses = {}; }
    var dirty = applyHtml($('#enemy-front'), renderFront(foe, false));
    function supportHtml(list, mine) { // Unterstützungszone
      var filled = 0;
      for (var i = 0; i < list.length; i++) if (list[i]) filled++;
      var show = Math.max(9, Math.ceil(Math.max(filled, 1) / 9) * 9);
      if (filled === 0) show = 9;
      var html = '';
      for (var j = 0; j < show && j < list.length; j++) {
        var s = list[j];
        if (!s) { html += '<div class="slot empty" data-drop="support" data-row="' + j + '"></div>'; continue; }
        var d = engine.defOf(s);
        var hide = !!(s.facedown && !mine);
        var cap = hide ? '' : ((d.ap != null ? d.ap + ' AP' : ''));
        html += '<div class="slot filled" data-drop="support" data-row="' + j + '" data-uid="' + s.uid + '">' + tableArt(d, hide) + slotFace(d, hide) +
          '<div class="unit-name">' + escapeHtml(hide ? 'Verdeckte Unterstützung' : d.name) + '</div>' +
          (s.facedown && mine ? '<div class="unit-hint">verdeckt — Gegner sieht die Rückseite</div>' : '') +
          (cap ? '<div class="unit-stats">' + cap + '</div>' : '') + '</div>';
        // Bild-HTML der Karte
      }
      return html;
    }
    dirty = applyHtml($('#enemy-support'), supportHtml(foe.support, false)) || dirty;
    dirty = applyHtml($('#my-support'), supportHtml(me.support, true)) || dirty;
    dirty = applyHtml($('#my-front'), renderFront(me, true)) || dirty;
    function nmlHtml(p) {
      var order = [['L',0],['L',1],['L',2],['C',0],['C',1],['C',2],['R',0],['R',1],['R',2]];
      return order.map(function (pr) {
        var tok = p.nml && p.nml[pr[0]] ? p.nml[pr[0]][pr[1]] : null;
        if (!tok) return '<div class="slot empty"></div>';
        var hidden = !!tok.facedown;
        var kind = (tok.flags && tok.flags.type) || '';
        var d;
        try { d = engine.defOf(tok); } catch (e) { d = { name: kind || 'Token', image: tok.image }; }
        if (kind === 'fog' || kind === 'nebelfeld' || kind === 'rauch') {
          d = { name: 'Nebel', image: tok.image || 'token-nebel-1.jpg' };
          hidden = false;
        }
        if (kind === 'minenfeld') {
          d = { name: 'Minenfeld', image: tok.image || 'MINE.png' };
        }
        return '<div class="slot filled' + (hidden ? ' facedown' : '') + '" data-uid="' + tok.uid + '">' +
          tableArt(d, hidden) + '<div class="unit-name">' + escapeHtml(hidden ? 'Verdeckter Token' : d.name) + '</div></div>';
      }).join('');
    }
    var en = document.getElementById('enemy-nml');
    var mn = document.getElementById('my-nml');
    if (en) { en.classList.add('nml-row'); dirty = applyHtml(en, nmlHtml(foe)) || dirty; }
    if (mn) { mn.classList.add('nml-row', 'mine'); dirty = applyHtml(mn, nmlHtml(me)) || dirty; }
    setLabel('enemy-nml-label', foe.name + ' — Niemandsland');
    setLabel('my-nml-label', me.name + ' — Niemandsland');
    function doctrineRow(list, pid) {
      return (list || []).map(function (d) {
        var def = engine.defOf(d);
        var badge = '';
        if (engine._trophyActive && engine._trophyActive()) {
          var prog = engine.trophyProgressFor && engine.trophyProgressFor(pid, def.id);
          if (prog) {
            var cls = prog.done ? ' dok-vp-done' : '';
            badge = '<div class="dok-vp' + cls + '" title="' + escapeHtml(prog.label || '') + '">SP ' + prog.cur + '/' + prog.need + (prog.done ? ' ✓' : '') + '</div>';
          }
        }
        return '<div class="doctrine-card" data-id="' + def.id + '">' + tableArt(def, false) + '<div class="dn">' + escapeHtml(def.name) + '</div>' + badge + '</div>';
      }).join('');
    }
    var ed = document.getElementById('enemy-doctrine');
    var md = document.getElementById('my-doctrine');
    if (ed) ed.innerHTML = doctrineRow(foe.doctrines, foe.id);
    if (md) md.innerHTML = doctrineRow(me.doctrines, me.id);
    var pe = document.getElementById('plate-enemy');
    var pm = document.getElementById('plate-me');
    function plateHtml(p) {
      var faceId = (p && p.face) || String(p && p.portrait || '').slice(0, 3);
      var special = p && p.facing === 'right' && window.DCPortrait && DCPortrait.rightUrl(faceId, p.rank);
      var src = special || (p && p.portrait ? dcPortraitSrc(p.portrait, p.rank) : '');
      var face = src ? '<img class="plate-face' + (p.facing === 'right' && !special ? ' face-right' : '') + '" src="' + src + '" alt="">' : '';
      var call = p && p.callsign ? '<span class="plate-call">»' + escapeHtml(p.callsign) + '«</span>' : '';
      return face + '<span class="plate-name">' + escapeHtml(p.name) + '</span>' + call;
    }
    if (pe) pe.innerHTML = plateHtml(foe);
    if (pm) pm.innerHTML = plateHtml(me);
    dirty = applyHtml($('#hand'), me.hand.map(function (c) { // Handkarten
      var d = engine.defOf(c);
      var cost = engine.costOf(d, me);
      var una = (me.ap < cost) ? ' unaffordable' : '';
      return '<div class="card ' + cardClass(d.typ) + una + '" data-uid="' + c.uid + '"' + (me.ap < cost ? ' title="Nicht genug AP (' + me.ap + '/' + cost + ')"' : '') + '>' +
        artTag(d, false) + // Bild-HTML der Karte
        '<div class="body"><div class="unit-name">' + escapeHtml(d.name) + '</div>' + // HTML-Sonderzeichen escapen
        '<div class="unit-stats">' + cost + ' AP' + (d.atk != null ? ' · A' + d.atk + '/V' + d.def : '') + '</div></div></div>';

    }).join('')) || dirty;
    updatePiles();
    rememberRects();
    if (isTerminal(st)) { showMatchEnd(st); return; }
    document.querySelectorAll('#my-front .slot.filled, #enemy-front .slot.filled, #my-support .slot.filled, #enemy-support .slot.filled, .doctrine-card').forEach(function (tile) {
      tile.tabIndex = 0; tile.setAttribute('role', 'button');
    });
    if (window.DCCamera) { try { DCCamera.afterRender(engine); } catch (eCam) {} } // auch ohne DOM-Änderung (Optionen/Baseline)
    if (!dirty) { guardPendingUi(); return; }
    $('#hand').querySelectorAll('.card').forEach(function (el) { // Handkarten
      bindHover(el, function () {
        var card = me.hand.find(function (c) { return c.uid === el.dataset.uid; }); // Handkarten
        return card ? { def: engine.defOf(card), facedown: false, inst: null } : null; // verdeckte Lage
      });
      el.onclick = function (ev) {
        if (suppressHandClick || window.dcSuppressClick) {
          ev.preventDefault();
          ev.stopPropagation();
          return;
        }
        ev.stopPropagation();
        var card = me.hand.find(function (c) { return c.uid === el.dataset.uid; });
        if (!card) return;
        if (armedPlay && armedPlay.uid === card.uid && !armedPlay.facedown) {
          armedPlay = null;
          document.body.classList.remove('dc-armed');
          clearDropMarks();
          document.querySelectorAll('#hand .card.picked').forEach(function (c) { c.classList.remove('picked'); });
          var hint = document.getElementById('hint');
          if (hint) hint.textContent = 'Auswahl aufgehoben.';
          return;
        }
        document.querySelectorAll('#hand .card.picked').forEach(function (c) { c.classList.remove('picked'); });
        el.classList.add('picked');
        try {
          { // optional audio is isolated by audioCall
            audioCall('playForCard', 'select', engine.defOf(card));
          }
        } catch (eSel) {}
        armHandCard(card.uid, viewer, false);
      };
      /* Rechtsklick-Zoom: Delegation. Hier nur Shift+Rechtsklick = verdeckt. */
      el.oncontextmenu = function (ev) {
        if (!ev.shiftKey) return;
        ev.preventDefault();
        ev.stopPropagation();
        var cardFd = me.hand.find(function (c) { return c.uid === el.dataset.uid; });
        if (!cardFd) return;
        document.querySelectorAll('#hand .card.picked').forEach(function (c) { c.classList.remove('picked'); });
        el.classList.add('picked');
        armHandCard(cardFd.uid, viewer, true);
      };
      el.draggable = false;
      el.querySelectorAll('img').forEach(function (img) { img.draggable = false; });
      el.ondragstart = function (ev) { ev.preventDefault(); };
    });
    bindBoardDrops(viewer);
    function tryPickPending(uid) {
      var pend = engine.state.pending; // offene Wahl des Spielers
      if (!pend || pend.player !== viewer) return false;
      if (pend.kind === 'instant-target' || pend.kind === 'attack-target' || pend.kind === 'equip' || pend.kind === 'napalm' || pend.kind === 'air-strike' || pend.kind === 'own-bonus') {
        if (pend.choices && pend.choices.length) {
          var ok = pend.choices.some(function (c) { return c && c.target === uid; });
          if (!ok) {
            var loc = engine.findInst(uid);
            if (loc && isDigInProtected(loc.inst)) say('Eingegraben — nicht angreifbar bis zum nächsten eigenen Zug.');
            return true; // consume click, do not attack
          }
        }
        dispatch({ type: 'CHOOSE_TARGET', player: pend.player, target: uid });
        return true;
      }
      return false;
    }
    document.querySelectorAll('#my-front .slot.filled').forEach(function (el) {
      bindHover(el, function () {
        var loc = engine.findInst(el.dataset.uid);
        return loc ? { def: engine.defOf(loc.inst), facedown: loc.inst.facedown, inst: loc.inst } : null; // verdeckte Lage
      });
      /* Zoom: Delegation (Rechtsklick/Doppelklick). Klick: Act-Menü verzögert. */
      el.ondblclick = function () { clearTimeout(el._dcActTimer); };
      el.oncontextmenu = function () { clearTimeout(el._dcActTimer); };
      el.onclick = function () {
        if (tryPickPending(el.dataset.uid)) return;
        var loc = engine.findInst(el.dataset.uid);
        if (!loc) return;
        var d = engine.defOf(loc.inst);
        clearTimeout(el._dcActTimer);
        el._dcActTimer = setTimeout(function () {
          showActChooser(loc, d, viewer);
        }, 280);
      };
    });
    document.querySelectorAll('#enemy-support .slot.filled').forEach(function (el) {
      el.addEventListener('click', function (ev) {
        var loc = engine.findInst(el.dataset.uid);
        if (!loc) return;
        var d = engine.defOf(loc.inst);
        if (!(d.effects || []).some(function (x) { return x.code === 'NEUTRALIZE'; })) return;
        if (tryPickPending(el.dataset.uid)) return;
        ev.stopPropagation();
        openInspect({
          def: d, inst: loc.inst, zone: 'support', uid: loc.inst.uid,
          buttons: [{ id: 'neut', label: 'Neutralisieren (2 AP)', primary: true }, { id: 'close', label: 'Zurück' }],
          onAction: function (id) {
            if (id === 'neut') dispatch({ type: 'ACTIVATE_SUPPORT', player: viewer, uid: loc.inst.uid });
          }
        });
      }, true);
    });
    document.querySelectorAll('#enemy-front .slot.filled, #enemy-support .slot.filled').forEach(function (el) {
      bindHover(el, function () {
        var loc = engine.findInst(el.dataset.uid);
        return loc ? { def: engine.defOf(loc.inst), facedown: loc.inst.facedown, inst: loc.inst } : null;
      });
      el.onclick = function () {
        if (tryPickPending(el.dataset.uid)) return;
        var loc = engine.findInst(el.dataset.uid);
        if (!loc) return;
        openInspect({
          def: engine.defOf(loc.inst),
          inst: loc.inst,
          facedown: loc.inst.facedown,
          zone: loc.zone,
          buttons: [{ id: 'close', label: 'Zurück' }]
        });
      };
    });
    document.querySelectorAll('#my-support .slot.filled').forEach(function (el) {
      bindHover(el, function () {
        var loc = engine.findInst(el.dataset.uid);
        return loc ? { def: engine.defOf(loc.inst), facedown: false, inst: loc.inst } : null;
      });
      el.ondblclick = function () { clearTimeout(el._dcActTimer); };
      el.oncontextmenu = function () { clearTimeout(el._dcActTimer); };
      el.onclick = function () {
        if (tryPickPending(el.dataset.uid)) return;
        var loc = engine.findInst(el.dataset.uid);
        if (!loc) return;
        var d = engine.defOf(loc.inst);
        var locked = engine._supportLocked && engine._supportLocked(viewer);
        var btns = [{ id: 'close', label: 'Zurück' }];
        if ((d.effects || []).length) btns.unshift({ id: 'activate', label: locked ? 'Blockiert' : 'Fähigkeit', primary: !locked });
        clearTimeout(el._dcActTimer);
        el._dcActTimer = setTimeout(function () {
          openInspect({
            def: d,
            inst: loc.inst,
            zone: 'support',
            uid: loc.inst.uid,
            buttons: btns,
            onAction: function (id) {
              if (id !== 'activate') return;
              dispatch({ type: 'ACTIVATE_SUPPORT', player: viewer, uid: loc.inst.uid });
            }
          });
        }, 280);
      };
    });
    document.querySelectorAll('#enemy-doctrine .doctrine-card, #my-doctrine .doctrine-card').forEach(function (el) {
      bindHover(el, function () {
        var def = CATALOG.cards.find(function (c) { return c.id === el.dataset.id; });
        return def ? { def: def, facedown: false, inst: null } : null; // verdeckte Lage
      });
      el.onclick = function () {
        var def = CATALOG.cards.find(function (c) { return c.id === el.dataset.id; });
        if (!def) return;
        var db = [{ id: 'close', label: 'Zurück' }];
        if (def.id === 'dc_dok_bollwerk') db.unshift({ id: 'schutzwall', label: 'Schutzwall (2 AP)', primary: true });
        if (def.id === 'dc_dok_tiefenverteidigung') {
          db.unshift({ id: 'tvinfo', label: 'Blutzoll: nur gegnerische Front' });
        }
        if (def.id === 'dc_dok_sicherer_nachschub') {
          db.unshift({ id: 'ueberschuss', label: 'Überschuss (2 AP, 1× Zug, nur Support)' });
          db.unshift({ id: 'healarm', label: 'Feldreparatur (eigener Zug, 1×)', primary: true });
        }
        if (def.id === 'dc_dok_verlegung') {
          db.unshift({ id: 'verlegung', label: 'Verlegung: 1 Slot seitlich (1 AP, 1× Zug)', primary: true });
        }
        openInspect({
          def: def,
          zone: 'doctrine',
          buttons: db,
          onAction: function (id) {
            if (id === 'schutzwall') {
            var ov = document.getElementById('overlay');
            ov.innerHTML = '<div class="modal"><h2>Abweichung vom Kartentext</h2><p>Schutzwall ist abweichend vom Druck nur <strong>1× pro Runde</strong> erlaubt — das umfasst deinen Zug und den Zug des Gegners.</p><button type="button" class="primary" id="sw-go">Trotzdem einsetzen</button> <button type="button" id="sw-no">Abbrechen</button></div>';
            ov.style.display = 'flex';
            document.getElementById('sw-go').onclick = function () {
              ov.style.display = 'none';
              dispatch({ type: 'SCHUTZWALL', player: viewer });
            };
            document.getElementById('sw-no').onclick = function () { ov.style.display = 'none'; };
            return;
            }
            if (id === 'verlegung') {
              var shifts = (engine.listActions(viewer) || []).filter(function (a) { return a.type === 'DOK_SHIFT'; });
              var ovv = document.getElementById('overlay');
              if (!shifts.length) {
                ovv.innerHTML = '<div class="modal"><h2>Verlegung</h2><p>Kein freier Nachbarslot (oder schon genutzt).</p><button type="button" class="primary" id="vl-ok">Zurück</button></div>';
                ovv.style.display = 'flex';
                document.getElementById('vl-ok').onclick = function () { ovv.style.display = 'none'; };
                return;
              }
              ovv.innerHTML = '<div class="modal"><h2>Verlegung</h2><p>Einheit 1 Slot seitlich schieben (1 AP, 1× pro Zug).</p><div class="choices">' +
                shifts.map(function (a, i) {
                  return '<button type="button" data-i="' + i + '">' + (a.label || a.name) + '</button>';
                }).join('') + '</div><button type="button" id="vl-no">Abbrechen</button></div>';
              ovv.style.display = 'flex';
              ovv.querySelectorAll('[data-i]').forEach(function (b) {
                b.onclick = function () {
                  ovv.style.display = 'none';
                  var act = shifts[Number(b.getAttribute('data-i'))];
                  dispatch({ type: 'DOK_SHIFT', player: viewer, uid: act.uid, slot: act.slot });
                };
              });
              document.getElementById('vl-no').onclick = function () { ovv.style.display = 'none'; };
              return;
            }
            if (id === 'tvinfo') {
              var ovt = document.getElementById('overlay');
              ovt.innerHTML = '<div class="modal"><h2>Tiefenverteidigung</h2><p>Blutzoll zählt <strong>nur zerstörte gegnerische Fronteinheiten</strong>. Jede bringt +1 AP zu Beginn deines nächsten Zuges.</p><p>Beobachterfeuer auf Support kostet 1 AP und erschöpft die Rohrartillerie.</p><button type="button" id="tv-ok">Verstanden</button></div>';
              ovt.style.display = 'flex';
              document.getElementById('tv-ok').onclick = function () { ovt.style.display = 'none'; };
            }
            if (id === 'healarm') {
              var arms = [];
              engine.frontList(engine.player(viewer)).forEach(function (l) {
                var dd = engine.defOf(l.inst);
                if ((dd.tags || []).indexOf('gepanzert') >= 0 || (dd.klasse_tags || []).join(',').indexOf('gepanzert') >= 0 || /gepanzert/i.test(dd.klasse || '')) {
                  arms.push(l);
                }
              });
              if (!arms.length) {
                dispatch({ type: 'HEAL_ARMORED', player: viewer, target: '' });
                return;
              }
              var ovh = document.getElementById('overlay');
              ovh.innerHTML = '<div class="modal"><h2>Feldreparatur</h2><p>Nur im <strong>eigenen Zug</strong>, <strong>1× pro Zug</strong>. Eine eigene gepanzerte Fronteinheit: +1 V.</p><div class="choices">' +
                arms.map(function (l, i) {
                  return '<button type="button" data-i="' + i + '">' + engine.defOf(l.inst).name + '</button>';
                }).join('') + '</div><button type="button" id="hr-no">Abbrechen</button></div>';
              ovh.style.display = 'flex';
              ovh.querySelectorAll('[data-i]').forEach(function (b) {
                b.onclick = function () {
                  ovh.style.display = 'none';
                  dispatch({ type: 'HEAL_ARMORED', player: viewer, target: arms[Number(b.getAttribute('data-i'))].inst.uid });
                };
              });
              document.getElementById('hr-no').onclick = function () { ovh.style.display = 'none'; };
            }
            if (id === 'ueberschuss') {
              var sups = [];
              (engine.player(viewer).support || []).forEach(function (s) { if (s) sups.push(s); });
              var ovu = document.getElementById('overlay');
              if (!sups.length) {
                dispatch({ type: 'UEBERSCHUSS', player: viewer, uid: '' });
                return;
              }
              ovu.innerHTML = '<div class="modal"><h2>Überschuss</h2><p>Nur im <strong>eigenen Zug</strong>, <strong>1× pro Zug</strong>, 2 AP. Nur Karten im <strong>Support</strong>. Deren Fähigkeit ein zweites Mal.</p><div class="choices">' +
                sups.map(function (s, i) {
                  return '<button type="button" data-i="' + i + '">' + engine.defOf(s).name + '</button>';
                }).join('') + '</div><button type="button" id="ue-no">Abbrechen</button></div>';
              ovu.style.display = 'flex';
              ovu.querySelectorAll('[data-i]').forEach(function (b) {
                b.onclick = function () {
                  ovu.style.display = 'none';
                  dispatch({ type: 'UEBERSCHUSS', player: viewer, uid: sups[Number(b.getAttribute('data-i'))].uid });
                };
              });
              document.getElementById('ue-no').onclick = function () { ovu.style.display = 'none'; };
            }
          }
        });
      };
    });
    function bindGrave(id, cards, enemy) {
      var pile = document.getElementById(id);
      if (!pile || pile.dataset.dcGraveBound === '1') return;
      pile.dataset.dcGraveBound = '1';
      pile.style.cursor = 'pointer';
      pile.addEventListener('click', function () {
        if (!engine) return;
        var viewer = mode === 'hotseat' ? engine.state.active : you;
        var me = engine.state.players[viewer];
        var foe = engine.state.players[viewer === 0 ? 1 : 0];
        var list = enemy ? foe.grave : me.grave;
        if (!list || !list.length) return;
        var top = list[list.length - 1];
        var def = engine.defOf(top);
        if (!def) return;
        openInspect({
          def: def,
          facedown: false,
          uid: top.uid || def.id,
          zone: 'grave',
          buttons: [{ id: 'close', label: 'Zurück' }]
        });
      });
    }
    bindGrave('pile-my-grave', null, false);
    bindGrave('pile-enemy-grave', null, true);
    document.querySelectorAll('#hand .card, #my-front .slot.filled, #my-support .slot.filled, #enemy-front .slot.filled, #enemy-support .slot.filled, #my-doctrine .doctrine-card, #enemy-doctrine .doctrine-card').forEach(function (el) {
      if (el.dataset.dcInspectAux === '1') return;
      el.dataset.dcInspectAux = '1';
      el.addEventListener('auxclick', function (ev) {
        if (ev.button !== 1) return;
        ev.preventDefault();
        ev.stopPropagation();
        if (el.classList.contains('card') && el.closest('#hand')) {
          var card = me.hand.find(function (c) { return c.uid === el.dataset.uid; });
          if (!card) return;
          openInspect({ def: engine.defOf(card), facedown: false, uid: card.uid, zone: 'hand', buttons: [{ id: 'close', label: 'Zurück' }] });
          return;
        }
        if (el.classList.contains('doctrine-card')) {
          var def = CATALOG.cards.find(function (c) { return c.id === el.dataset.id; });
          if (def) openInspect({ def: def, zone: 'doctrine', buttons: [{ id: 'close', label: 'Zurück' }] });
          return;
        }
        var loc = engine.findInst(el.dataset.uid);
        if (!loc) return;
        var hide = !!(loc.inst.facedown && loc.player !== viewer);
        openInspect({ def: engine.defOf(loc.inst), inst: loc.inst, facedown: hide, uid: loc.inst.uid, buttons: [{ id: 'close', label: 'Zurück' }] });
      });
    });
    bindStatTips(document.getElementById('app'));
    $('#hint').textContent = st.pending // offene Wahl des Spielers
      ? 'Ziel oder Stellung wählen.'
      : 'Karte ziehen zum Ausspielen. Rechtsklick/Doppelklick: vergrößern. Hover: Vorschau. Shift+Rechtsklick: verdeckt scharf.';
    $('#log').innerHTML = engine.log.slice(-40).reverse().map(function (l) {
      return '<div>' + escapeHtml(l.msg) + '</div>'; // HTML-Sonderzeichen escapen
    }).join('');
    if (window.DCTableChat) { try { DCTableChat.refresh(); } catch (eChat) {} }
    // t259: Fremde tac-Wahl nicht über eine laufende Meldung legen (ersetzte sonst den Recap,
    // dessen Abschluss das Overlay dann nicht mehr schloss).
    if (st.pending && (st.pending.player === viewer || (/^tac-/.test(st.pending.kind) && !eventPlaying))) {
      showPending();
    } else {
      closeStaleWaitOverlay();
    }
    if ((mode === 'bot' || mode === 'tutorial') && !window.dcTimerHold && (st.active === 1 || (st.pending && st.pending.player === 1))) {
      window.setTimeout(maybeBot, 200);
    }
  }

  window.dcRender = render; // globale Schnittstelle der Seite
  window.dcStart = startGame; // globale Schnittstelle der Seite
  window.dcGetEngine = function () { return engine; };
  window.dcSetState = function (st) { // globale Schnittstelle der Seite
    if (!engine) {
      engine = new DCEngine.Engine(window.DC_CATALOG, { seed: 1 });
    }
    if (engine.state && isTerminal(engine.state) && !isTerminal(st)) clearMatchPresentation();
    engine.state = st;
    if (!matchSetup && st && st.players && !isTerminal(st) && !/^(lan|host|join)$/.test(mode)) {
      function initialIds(p) {
        var all = (p.deck || []).concat(p.hand || []).concat(p.grave || []).concat(p.support || []);
        ['L','C','R'].forEach(function (sec) { all = all.concat(p.front[sec] || []); });
        return all.filter(Boolean).map(function (c) { return typeof c === 'string' ? c : c.cardId; });
      }
      matchSetup = { mode: mode, name0: st.players[0].name, name1: st.players[1].name,
        deck0: initialIds(st.players[0]), deck1: initialIds(st.players[1]),
        doctrine0: (st.players[0].doctrines || []).map(function (c) { return typeof c === 'string' ? c : c.cardId; }),
        doctrine1: (st.players[1].doctrines || []).map(function (c) { return typeof c === 'string' ? c : c.cardId; }) };
    }
    try {
      if (window.DCPlayLogger && !engine._playLogHooked) {
        installPlayLogger(engine, mode || 'lan', you);
      }
    } catch (eLanLog) {}
    if (window.DCEmbed && DCEmbed.forCardIds && st && st.players) {
      var ids = [];
      st.players.forEach(function (p) {
        (p.deck || []).concat(p.hand || []).concat(p.grave || []).concat(p.support || []).concat(p.doctrines || []).forEach(function (c) {
          if (!c) return;
          ids.push(typeof c === 'string' ? c : c.cardId);
        });
        ['L','C','R'].forEach(function (s) {
          (p.front && p.front[s] || []).forEach(function (u) { if (u && u.cardId) ids.push(u.cardId); });
        });
      });
      DCEmbed.forCardIds(ids, window.DC_CATALOG);
    }
    if (st && st.seed) window.dcMusicSeed = st.seed;
    var tr = document.getElementById('title-root');
    var first = tr && !tr.classList.contains('dc-off');
    var ov = document.getElementById('overlay');
    if (ov && ov.querySelector('.recap-modal') === null && ov.querySelector('.inspect-modal') === null) {
      /* keep recap; hide leftover lobby overlay */
    }
    if (window.DCNet && DCNet.hookEngine) DCNet.hookEngine();
    render();
    presentNewEvents();
    if (first && window.dcKickoff) window.dcKickoff(afterKickoff);
    else {
      if (tr) { if (window.dcSetTable) window.dcSetTable(true); tr.style.display = 'none'; }
      if (st && st.startCoin && !st.startCoin._shown) showOpeningCoin();
    }
  };
  window.dcPresentNewEvents = presentNewEvents;
  window.dcDispatch = function (a) { return dispatch(a); };
  /**
   * t256: Läuft gerade eine Meldung/Flug-Animation oder wartet eine in der Warteschlange?
   * Für UI-Tests (Playwright), damit Klicks nicht in eine startende Meldung fallen.
   * @returns {boolean}
   */
  window.dcEventBusy = function () { return !!(eventPlaying || eventQueue.length); };
  /**
   * t259: Diagnose für den Browser-Test: Zustand der Meldungs-Pumpe und des Overlays.
   * @returns {{playing: boolean, queue: number, stuckTicks: number, timer: boolean, overlay: string}}
   */
  window.dcEventDebug = function () {
    var ov = document.getElementById('overlay');
    return { playing: !!eventPlaying, queue: eventQueue.length, stuckTicks: pumpStuckTicks, timer: !!bombTick,
      overlay: ov ? (ov.style.display + '|' + ov.className + '|' + ov.innerHTML.slice(0, 120)) : 'none' };
  };
  window.dcSetNames = function (a, b) { // globale Schnittstelle der Seite
    if (!engine || !engine.state) return;
    if (a) engine.state.players[0].name = a;
    if (b) engine.state.players[1].name = b;
  };
  window.dcSetYou = function (id) { you = id; }; // globale Schnittstelle der Seite
  window.dcGetYou = function () { return you; };
  window.dcSetMode = function (m) { mode = m || 'lan'; }; // globale Schnittstelle der Seite
  /**
   * t275: Startet eine vom Aufrufer gebaute, geskriptete Partie (Tutorial) auf dem echten Tisch.
   * Die Engine gehört dem Aufrufer und ist eine eigene Instanz. Kein Münzwurf, kein Zugtimer,
   * kein Playtest-Protokoll, kein Endbild, kein Rematch-Setup.
   * @param {{engine: object, botStep: function(object): (object|null), onEnd: function(object), delayMs?: number}} opts
   * @returns {boolean} true, wenn der Tisch steht
   */
  window.dcStartScripted = function (opts) {
    if (!opts || !opts.engine) return false;
    clearMatchPresentation();
    engine = opts.engine; mode = 'tutorial'; you = 0; scripted = opts;
    matchSetup = null; endHandledKey = null;
    if (window.dcMountMatch) window.dcMountMatch();
    bindTableControls();
    seenEvents = (engine.state.events || []).length;
    window.dcTimerHold = false;
    if (window.dcSetTable) window.dcSetTable(true);
    var tr = document.getElementById('title-root');
    if (tr) tr.style.display = 'none';
    document.body.classList.add('dc-tutorial');
    render();
    return true;
  };
  /**
   * t275: Beendet die geskriptete Partie und verwirft ihre Engine. Der Aufrufer zeigt danach das Menü.
   */
  window.dcEndScripted = function () {
    if (mode !== 'tutorial') return;
    clearMatchPresentation();
    engine = null; scripted = null; mode = 'hotseat'; matchSetup = null; endHandledKey = null; tableBound = false;
    window.dcTimerHold = true;
    document.body.classList.remove('dc-tutorial');
  };
  /**
   * t275: Nach „Zurück“ im Tutorial (Engine-Stand ersetzt): Meldungen verwerfen, Tisch neu zeichnen.
   */
  window.dcScriptedSync = function () {
    if (mode !== 'tutorial' || !engine) return;
    eventQueue = []; eventPlaying = false; eventFlying = false;
    seenEvents = (engine.state.events || []).length;
    armedPlay = null; placing = false;
    document.body.classList.remove('dc-armed', 'dc-dragging');
    hideDragGhost();
    var ov = document.getElementById('overlay');
    if (ov) { ov.innerHTML = ''; ov.style.display = 'none'; }
    window.dcTimerHold = false;
    render();
  };
  /** t275: Ist gerade die geskriptete Partie (Tutorial) aktiv? @returns {boolean} */
  window.dcIsScripted = function () { return mode === 'tutorial' && !!scripted; };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindChrome);
  else bindChrome();
})();
