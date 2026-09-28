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
(function () { // Funktion
  'use strict'; // nächster Schritt im Ablauf
  /* Erstes Element zur CSS-Auswahl. */
    function $(s) { return document.querySelector(s); } // Element in der Seite suchen
  /* Fehler ins Lobby- oder Hinweis-Feld schreiben. */
    function showErr(msg) { // Funktion
    var h = document.getElementById('hint');
    if (h) h.textContent = msg;
    var el = document.getElementById('boot-error');
    if (el && !h) el.textContent = msg;
    console.error(msg);
  }
  /* Text für innerHTML unschädlich machen. */
    function escapeHtml(s) { // HTML-Sonderzeichen escapen
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { // Wert zurückgeben
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; // Wert zurückgeben
    }); // nächster Schritt im Ablauf
  }
  /* Mögliche Bildpfade zu einer Kartendatei, eingebettet zuerst. */
    function imgCandidates(filename) { // Fallback-Pfade für das Artwork
    if (!filename) return []; // Wert zurückgeben
    var list = []; // lokale Variable
    var key = String(filename); // lokale Variable
    var stem = key.replace(/\.png$/i, '').replace(/\.jpg$/i, ''); // lokale Variable
    if (window.DC_IMAGES) { // Zweig nur bei zutreffender Bedingung
      if (window.DC_IMAGES[key]) list.push(window.DC_IMAGES[key]); // Zweig nur bei zutreffender Bedingung
      if (window.DC_IMAGES[stem + '.png']) list.push(window.DC_IMAGES[stem + '.png']); // Zweig nur bei zutreffender Bedingung
    }
    function enc(p) { return p.split('/').map(function (x, i, a) { return i === a.length - 1 ? encodeURIComponent(x) : x; }).join('/'); }
    list.push(enc('assets/cards/' + stem + '.png'));
    list.push(enc('assets/cards/' + stem + '.jpg'));
    list.push(enc('assets/cards/' + key));
    list.push(enc('assets/cards/thumbs/' + stem + '.png'));
    list.push(enc('assets/cards/thumbs/' + stem + '.jpg'));
    list.push(enc('assets/cards/thumbs/' + key));
    list.push(enc('./assets/cards/' + stem + '.png'));
    list.push(enc('./assets/cards/' + stem + '.jpg'));
    return list;
  }
  window.DC_IMG_OK = window.DC_IMG_OK || {};
  function backFile(def) {
    var typ = def && (def.typ || def.type || '');
    return typ === 'Doktrin' ? 'thumbs/rueckseite-rot.png' : 'thumbs/rueckseite-schwarz.png';
  }
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
      if (c.image) files[c.image] = 1;
    });
    Object.keys(files).forEach(function (file) {
      imgCandidates(file).forEach(function (src) {
        var im = new Image();
        im.onload = function () { window.DC_IMG_OK[file] = src; };
        im.src = src;
      });
    });
  }
  function imgSrcFull(filename) {
    if (!filename) return '';
    function enc(p) {
      return p.split('/').map(function (x, i, a) {
        return i === a.length - 1 ? encodeURIComponent(x) : x;
      }).join('/');
    }
    return enc('assets/cards/' + filename);
  }
  function artTag(def, facedown, cls, full) {
    var file = facedown ? backFile(def) : (def && def.image);
    var src = full ? imgSrcFull(file) : imgSrc(file);
    if (!src) return '';
    var err = full
      ? ('this.onerror=null;this.src="' + String(imgSrc(file) || '').replace(/"/g, '') + '";')
      : 'window.dcImgErr(this)';
    return '<img draggable="false" class="' + (cls || 'art') + '" alt="" src="' + src +
      '" data-file="' + String(file || '') + '" data-i="0" data-full="' + (full ? '1' : '0') +
      '" onload="window.dcImgOk(this)" onerror="' + err + '">';
  }

  var CATALOG = window.DC_CATALOG; // lokale Variable
  var engine = null; // lokale Variable
  var you = 0; // lokale Variable
  var mode = 'hotseat'; // lokale Variable
  var previewUid = null; // lokale Variable

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
    bind('btn-end', endTurn);
    bind('btn-peace', function () { dispatch({ type: 'PROPOSE_PEACE', player: activePlayer() }); });
    bind('btn-accept', function () { dispatch({ type: 'ACCEPT_PEACE', player: activePlayer() }); });
    bind('btn-concede', function () {
      try { dispatch({ type: 'CONCEDE', player: activePlayer() }); } catch (e) {}
      if (window.DCNet && DCNet.notifyLeave) DCNet.notifyLeave('hat aufgegeben');
      if (window.dcDefeat) window.dcDefeat();
    });
    bind('btn-menu', function () {
      if (window.DCNet && DCNet.notifyLeave) DCNet.notifyLeave('hat das Spiel verlassen');
      if (window.dcUnmountMatch) window.dcUnmountMatch();
      tableBound = false;
      engine = null;
      if (window.dcSetTable) window.dcSetTable(false);
      var tr = document.getElementById('title-root');
      if (tr) tr.style.display = 'flex';
      if (window.dcShowTitle) window.dcShowTitle();
    });
    bind('btn-opts', function () {
      var box = document.getElementById('ingame-opts');
      if (!box) return;
      box.style.display = box.style.display === 'flex' ? 'none' : 'flex';
    });
  }
  function bindChrome() {
    preloadCardArt();
    if (window.DCAudio) DCAudio.preload();
    function bind(id, fn) { // Funktion
      var el = document.getElementById(id); // lokale Variable
      if (el) el.addEventListener('click', fn); // Ereignis binden
    }
    bind('btn-start', startGame); // nächster Schritt im Ablauf
    bind('go', startGame); // nächster Schritt im Ablauf
    bindTableControls();
    bind('btn-end', endTurn); // eine Aktion durch die Regeln jagen
    bind('btn-peace', function () { dispatch({ type: 'PROPOSE_PEACE', player: activePlayer() }); }); // eine Aktion durch die Regeln jagen
    bind('btn-accept', function () { dispatch({ type: 'ACCEPT_PEACE', player: activePlayer() }); }); // eine Aktion durch die Regeln jagen
    bind('btn-concede', function () {
      try { dispatch({ type: 'CONCEDE', player: activePlayer() }); } catch (e) {}
      if (window.DCNet && DCNet.notifyLeave) DCNet.notifyLeave('hat aufgegeben');
      if (window.dcDefeat) window.dcDefeat();
    });
    bind('btn-menu', function () { // Funktion
      if (window.DCNet && DCNet.notifyLeave) DCNet.notifyLeave('hat das Spiel verlassen'); // Zweig nur bei zutreffender Bedingung
      if (window.dcSetTable) window.dcSetTable(false);
      var tr = document.getElementById('title-root'); // lokale Variable
      if (tr) tr.style.display = 'flex'; // Zweig nur bei zutreffender Bedingung
      var ov = document.getElementById('overlay'); // lokale Variable
      if (ov) ov.style.display = 'none'; // Zweig nur bei zutreffender Bedingung
    }); // nächster Schritt im Ablauf
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
    }); // nächster Schritt im Ablauf
    document.addEventListener('keydown', function (e) { // Ereignis binden
      if (e.key === 'Escape') { // Zweig nur bei zutreffender Bedingung
        hideInspect(); // große Karte schließen
        hideHover(); // nächster Schritt im Ablauf
        if (engine && engine.state && engine.state.pending) { // offene Wahl des Spielers
          var ov = document.getElementById('overlay'); // lokale Variable
          if (ov) ov.style.display = 'none'; // Zweig nur bei zutreffender Bedingung
          dispatch({ type: 'CANCEL_PENDING', player: engine.state.pending.player }); // eine Aktion durch die Regeln jagen
        }
      }
    }); // nächster Schritt im Ablauf
  }

  /* Neue Partie: Zufall, Decks, Namen, Tisch zeigen. */
    function startGame() {
    try { // Fehler auffangen
      if (!window.DC_CATALOG || !window.DCEngine) { // Zweig nur bei zutreffender Bedingung
        showErr('Engine oder Katalog nicht geladen.'); // nächster Schritt im Ablauf
        return; // nächster Schritt im Ablauf
      }
      if (window.dcMountMatch) window.dcMountMatch();
      bindTableControls();
      var modeEl = $('#mode'); // lokale Variable
      if (mode !== 'lan' && mode !== 'host' && mode !== 'join') {
        mode = (modeEl && modeEl.value) || 'hotseat';
      }
      if (mode === 'bot-schloter') {
        if (window.DCBot) DCBot.applyCfg({ model: 'schloter' });
        mode = 'bot';
      } else if (mode === 'bot') {
        if (window.DCBot) DCBot.applyCfg({ model: 'test' });
      }
      var seed = Date.now() >>> 0; // Zufallsstart
      if (window.crypto && crypto.getRandomValues) { // unvorhersagbarer Zufall
        var buf = new Uint32Array(1); // lokale Variable
        crypto.getRandomValues(buf); // unvorhersagbarer Zufall
        seed = buf[0] || seed; // Zufallsstart
      }
      var rand = DCEngine.rng(seed); // Zufallsstart
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
      var n0 = (($('#player-name') && $('#player-name').value) || 'Spieler').trim().slice(0, 24); // lokale Variable
      var n1el = $('#opponent-name'); // lokale Variable
      var n1 = (n1el && n1el.value.trim()) || (mode === 'bot' ? ((window.DCBot && DCBot.cfg && DCBot.cfg.model === 'schloter') ? 'Schloter' : 'Test') : 'Gegner'); // lokale Variable
      n1 = n1.slice(0, 24); // nächster Schritt im Ablauf
      var deck0 = DCEngine.buildTestDeck(CATALOG, rand);
      var deck1 = DCEngine.buildTestDeck(CATALOG, rand);
      var doctrine0 = takeDocs(docs, 2, rand);
      var doctrine1 = takeDocs(docs, 2, rand);
      if (window.DCLib && DCLib.selectedDeck) {
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
      }); // nächster Schritt im Ablauf
      you = 0;
      seenEvents = 0;
      eventQueue = [];
      eventPlaying = false; // nächster Schritt im Ablauf
      var ov = $('#overlay'); // lokale Variable
      if (ov) ov.style.display = 'none'; // Zweig nur bei zutreffender Bedingung
      document.title = (window.DC_BUILD_LABEL || 'Division Command 0.30c Alpha');
      window.dcTimerHold = true;
      render();
      if (window.dcKickoff) window.dcKickoff();
      else {
        if (window.dcSetTable) window.dcSetTable(true);
        var tr = document.getElementById('title-root');
        if (tr) tr.style.display = 'none';
      }
    } catch (err) { // Fehler behandeln
      showErr(String(err && err.message ? err.message : err)); // nächster Schritt im Ablauf
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
  function endTurn() {
    if (!engine || !engine.state) return;
    armedPlay = null;
    document.body.classList.remove('dc-armed', 'dc-dragging');
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
    if (!engine) { // Zweig nur bei zutreffender Bedingung
      showErr('Zuerst „Partie starten“ klicken.'); // nächster Schritt im Ablauf
      var ov = $('#overlay'); // lokale Variable
      if (ov) ov.style.display = 'flex'; // Zweig nur bei zutreffender Bedingung
      return; // nächster Schritt im Ablauf
    }
    var res; // lokale Variable
    try { res = engine.dispatch(action); }
    catch (err) { showErr(String(err.message || err)); return; }
    if (res && res.sent) {
      var hw = document.getElementById('hint');
      if (hw) hw.textContent = 'Warte auf den Host …';
      return res;
    }
    if (!res.ok) {
      if (res.code === 'SCHUTZWALL_EMPTY' || res.code === 'SCHUTZWALL_WAIT' || res.code === 'HEAL_USED' || res.code === 'HEAL_NONE' || res.code === 'UEBER_USED' || res.code === 'UEBER_NONE' || res.code === 'SUMMON_SICK' || res.code === 'EXHAUSTED') {
        var ov2 = document.getElementById('overlay');
        ov2.innerHTML = '<div class="modal"><h2>Schutzwall</h2><p>' + escapeHtml(res.error) +
          '</p><button type="button" id="blk-ok">Verstanden</button></div>';
        ov2.style.display = 'flex';
        document.getElementById('blk-ok').onclick = function () { ov2.style.display = 'none'; };
      }
      if (res.code === 'BLITZ_LOCK') {
        var ov = document.getElementById('overlay');
        ov.innerHTML = '<div class="modal"><h2>Blitzkrieg</h2><p>' + escapeHtml(res.error) +
          '</p><button type="button" id="blk-ok">Verstanden</button></div>';
        ov.style.display = 'flex';
        document.getElementById('blk-ok').onclick = function () { ov.style.display = 'none'; };
      }
      render();
      var bad = $('#hint');
      if (bad) bad.textContent = res.error || 'Ungültig';
      return res;
    }
    render();
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
    if (window.DCAudio && res && res.ok) {
      var cdef = null;
      if (action.uid && engine && engine.findInst) {
        var loc = engine.findInst(action.uid);
        if (loc) cdef = engine.defOf(loc.inst);
      }
      if (!cdef && action.cardId && engine) cdef = engine.byId[action.cardId];
      if (action.type === 'PLAY' && DCAudio.playForCard) DCAudio.playForCard('deploy', cdef);
      else if (action.type === 'ATTACK' && DCAudio.playForCard) DCAudio.playForCard('attack', cdef);
      else if (action.type === 'END_TURN') DCAudio.playSfx('turn');
      else DCAudio.playSfx('ui-click');
    }
    if (action.type === 'END_TURN') {
      eventQueue = [];
      seenEvents = (engine.state.events || []).length;
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
    return res; // Wert zurückgeben
  }

  /* Wenn der Bot am Zug ist, seinen Schritt planen. */
    var botQueued = false;
    function maybeBot() {
    if (!engine || engine.state.winner != null) return;
    if (mode !== 'bot') return;
    if (window.dcTimerHold) {
      window.setTimeout(maybeBot, 500);
      return;
    }
    var botTurn = engine.state.active === 1 || (engine.state.pending && engine.state.pending.player === 1);
    if (!botTurn) return;
    if (botQueued) return;
    botQueued = true;
    window.setTimeout(function () {
      botQueued = false;
      botTick();
    }, (window.DCBot && DCBot.cfg && DCBot.cfg.delayMs) || 350);
  }

  /* Einen Bot-Zug ausführen und bei Bedarf den nächsten. */
    function botTick() {
    if (!engine || engine.state.winner != null) return;
    if (mode !== 'bot') return;
    if (window.dcTimerHold) {
      window.setTimeout(botTick, 400);
      return;
    }
    var pid = engine.state.pending ? engine.state.pending.player : engine.state.active;
    if (pid !== 1) return;
    try {
      var act = DCBot.step(engine, 1) || { type: 'END_TURN', player: 1 };
      act.player = 1;
      if (act.type === 'RESOLVE_PENDING') {
        if (act.slot) engine.dispatch({ type: 'CHOOSE_SLOT', player: 1, slot: act.slot });
        else if (act.target) engine.dispatch({ type: 'CHOOSE_TARGET', player: 1, target: act.target });
        else engine.dispatch({ type: 'CANCEL_PENDING', player: 1 });
      } else {
        engine.dispatch(act);
        var pend = engine.state.pending;
        if (pend && pend.player === 1 && pend.choices && pend.choices[0]) {
          var ch = pend.choices[0];
          if (ch.slot) engine.dispatch({ type: 'CHOOSE_SLOT', player: 1, slot: ch.slot });
          else if (ch.target) engine.dispatch({ type: 'CHOOSE_TARGET', player: 1, target: ch.target });
        }
      }
    } catch (err) {
      if (window.console) console.warn('Bot', err);
      try { engine.dispatch({ type: 'END_TURN', player: 1 }); } catch (e2) {}
    }
    render();
    presentNewEvents();
    if (engine.state.active === 1 || (engine.state.pending && engine.state.pending.player === 1)) {
      window.setTimeout(botTick, (window.DCBot && DCBot.cfg && DCBot.cfg.delayMs) || 350);
    }
  }

  /* Dialog für Stellung, Ziel, Mehrfachwahl oder Münze. */
    function closePendingUi() {
      var ov = document.getElementById('overlay');
      if (!ov) return;
      if (ov.querySelector('.recap-modal')) return;
      ov.style.display = 'none';
    }
    function showPending() {
    var pend = engine.state.pending;
    if (!pend) { closePendingUi(); return; }
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
      if (mode !== 'hotseat' && (pend.kind === 'react-window' || pend.kind === 'sam' || pend.kind === 'geist-window')) {
        var ovw = $('#overlay');
        ovw.innerHTML = '<div class="modal"><h2>Warte auf Meldungen...</h2><p>Der Gegner prüft Reaktionen.</p></div>';
        ovw.style.display = 'flex';
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
    if (pend.kind === 'coin' || pend.kind === 'angel-coin' || pend.kind === 'resist-coin') { // Zweig nur bei zutreffender Bedingung
      var ov = $('#overlay'); // lokale Variable
      ov.innerHTML = '<div class="modal"><h2>Münzwurf</h2><p>' + escapeHtml(pend.prompt || 'Kopf oder Zahl') + // HTML-Sonderzeichen escapen
        '</p><p class="tiny">Kopf — Effekt tritt ein. Zahl — kein Effekt.</p>' + // nächster Schritt im Ablauf
        '<button type="button" class="primary" id="btn-coin">Münze werfen</button> ' + // nächster Schritt im Ablauf
        '<button type="button" id="btn-cancel-pend">Abbrechen</button></div>'; // nächster Schritt im Ablauf
      ov.style.display = 'flex'; // nächster Schritt im Ablauf
      document.getElementById('btn-coin').onclick = function () { // DOM der Seite
        ov.style.display = 'none'; // nächster Schritt im Ablauf
        dispatch({ type: 'COIN_FLIP', player: pend.player }); // eine Aktion durch die Regeln jagen
      };
      document.getElementById('btn-cancel-pend').onclick = function () { // DOM der Seite
        ov.style.display = 'none'; // nächster Schritt im Ablauf
        dispatch({ type: 'CANCEL_PENDING', player: pend.player }); // eine Aktion durch die Regeln jagen
      };
      return; // nächster Schritt im Ablauf
    }
    var title = pend.prompt || meta.title || (pend.kind === 'deploy' ? 'Stellung wählen' : 'Ziel wählen');
    if (pend.needCount && pend.needCount > 1) { // Zweig nur bei zutreffender Bedingung
      title += ' (' + (pend.selected || []).length + '/' + pend.needCount + (pend.upto ? ', bis zu' : '') + ')'; // nächster Schritt im Ablauf
    }
    function choiceHtml(c, i) {
      var on = (pend.selected || []).indexOf(c.target) >= 0;
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
      if (c.slot) { otherBits.push(html); return; }
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
    if ((pend.kind === 'instant-target' || pend.kind === 'honors' || pend.kind === 'mass-pick' || pend.kind === 'rations' || pend.kind === 'discard-hand') && pend.upto) extra = '<button type="button" class="primary" id="btn-confirm-tg">Auswahl bestätigen</button> ';
    var ov = $('#overlay');
    ov.innerHTML = '<div class="modal"><h2>' + title + '</h2><p class="tiny">Karte antippen. Goldener Rand = Zeiger. Kleinere Karte = gewählt.</p><div class="choices pick-row">' + buttons +
    // HTML in den Knoten schreiben
      '</div>' + extra + '<button type="button" id="btn-cancel-pend">Abbrechen</button></div>'; // nächster Schritt im Ablauf
    hideHover(); // nächster Schritt im Ablauf
    hideInspect(); // große Karte schließen
    ov.style.display = 'flex'; // nächster Schritt im Ablauf
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
    var cbtn = document.getElementById('btn-cancel-pend'); // lokale Variable
    if (cbtn) cbtn.onclick = function () { // Zweig nur bei zutreffender Bedingung
      ov.style.display = 'none'; // nächster Schritt im Ablauf
      dispatch({ type: 'CANCEL_PENDING', player: pend.player }); // eine Aktion durch die Regeln jagen
    };
    var conf = document.getElementById('btn-confirm-tg'); // lokale Variable
    if (conf) conf.onclick = function () { // Zweig nur bei zutreffender Bedingung
      ov.style.display = 'none'; // nächster Schritt im Ablauf
      dispatch({ type: 'CONFIRM_TARGETS', player: pend.player }); // eine Aktion durch die Regeln jagen
    };
  }

  /* (ungenutzt am Tisch) Schachtel für den alten Hover-Zoom. */
    function hoverBox() { // Funktion
    var el = document.getElementById('hoverzoom'); // lokale Variable
    if (el) return el; // Wert zurückgeben
    el = document.createElement('div'); // DOM der Seite
    el.id = 'hoverzoom'; // nächster Schritt im Ablauf
    document.body.appendChild(el); // DOM der Seite
    return el; // Wert zurückgeben
  }
  /* Volle Druckkarte zeigen — nur noch Hilfsfunktion. */
    function showHover(def, facedown, inst) { // verdeckte Lage
    if (!def) return; // Zweig nur bei zutreffender Bedingung
    var file = facedown ? backFile(def) : (def.image || '');
    var src = imgSrcFull(file) || imgSrc(file);
    if (!src) return; // Zweig nur bei zutreffender Bedingung
    var el = hoverBox(); // lokale Variable
    el.innerHTML = '<img class="fullcard" alt="' + escapeHtml(def.name || '') + '" src="' + src + // HTML-Sonderzeichen escapen
      '" data-file="' + file + '" data-i="0" onerror="window.dcImgErr && window.dcImgErr(this)">'; // globale Schnittstelle der Seite
    el.classList.add('show'); // CSS-Klasse ändern
  }
  /* Hover-Zoom ausblenden. */
    function hideHover() { // Funktion
    var el = document.getElementById('hoverzoom'); // lokale Variable
    if (el) el.classList.remove('show'); // CSS-Klasse ändern
  }
  /* Absichtlich leer: Zoom nur per Klick. */
    function bindHover(el, getData) { // Funktion
    /* Zoom nur noch per Klick, nicht per Hover. */
  }
  /* Steht ein Systemdialog über dem Tisch? */
    function dialogOpen() { // Funktion
    var ov = document.getElementById('overlay'); // lokale Variable
    var ig = document.getElementById('ingame-opts'); // lokale Variable
    return (ov && ov.style.display === 'flex') || (ig && ig.style.display === 'flex'); // Wert zurückgeben
  }

  /* Große Kartenansicht schließen. */
    function hideInspect() { // große Karte schließen
    var el = document.getElementById('inspect'); // lokale Variable
    if (el) el.style.display = 'none'; // Zweig nur bei zutreffender Bedingung
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
    function openInspect(opts) { // Karte vergrößern
    if (dialogOpen()) return; // Zweig nur bei zutreffender Bedingung
    var box = document.getElementById('inspect'); // lokale Variable
    if (box && box.style.display === 'flex' && box.getAttribute('data-uid') === String(opts.uid || opts.def && opts.def.id || '')) {
    // Zweig nur bei zutreffender Bedingung
      hideInspect(); // große Karte schließen
      return; // nächster Schritt im Ablauf
    }
    var def = opts.def; // lokale Variable
    var facedown = !!opts.facedown; // verdeckte Lage
    var inst = opts.inst; // lokale Variable
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
      var printed = def.typ === 'Soforteinsatz' ? 0 : Number(def.ap || 0);
      var real = engine.costOf(def, engine.player(activePlayer()));
      if (def.typ === 'Soforteinsatz') {
        cost = '0 AP (Soforteinsatz)';
      } else {
        cost = real + ' AP real';
        if (printed !== real) costNote = 'Gedruckt: ' + printed + ' AP. Abweichend gilt mindestens 1 AP, plus Doktrinen.';
        else if (printed === 0) costNote = 'Gedruckt 0 AP — abweichend kostet die Karte 1 AP.';
      }
    }
    var buttons = opts.buttons || [{ id: 'close', label: 'Schließen' }]; // lokale Variable
    var html = '<div class="inspect-modal">' + // lokale Variable
      artTag(def, facedown, 'hero', true) + // Bild-HTML der Karte
      '<div class="info"><h3>' + escapeHtml(title) + '</h3>' + // HTML-Sonderzeichen escapen
      '<div class="tiny">' + escapeHtml(def.typ) + (cost ? ' · ' + cost : '') + (def.elite ? ' · ELITE' : '') + '</div>' +
      (stats ? '<div class="stat-block">' + stats + '</div>' : '') +
      '<p>' + escapeHtml(facedown ? 'Diese Einheit liegt verdeckt.' : (def.text || '')) + '</p>' +
      (costNote ? '<p class="tiny">' + escapeHtml(costNote) + '</p>' : '') +
      (def.flavor && !facedown ? '<p class="tiny"><em>' + escapeHtml(def.flavor) + '</em></p>' : '') +
      '</div><div class="acts">' + // nächster Schritt im Ablauf
      buttons.map(function (b) { // Liste umformen
        return '<button type="button" class="' + (b.primary ? 'primary' : '') + (b.danger ? ' danger' : '') + '" data-act="' + b.id + '">' + escapeHtml(b.label) + '</button>';
        // HTML-Sonderzeichen escapen
      }).join('') + // nächster Schritt im Ablauf
      '</div></div>'; // nächster Schritt im Ablauf
    var box = document.getElementById('inspect'); // lokale Variable
    if (!box) { // Zweig nur bei zutreffender Bedingung
      box = document.createElement('div'); // DOM der Seite
      box.id = 'inspect'; // nächster Schritt im Ablauf
      box.className = 'overlay'; // nächster Schritt im Ablauf
      document.body.appendChild(box); // DOM der Seite
    }
    box.innerHTML = html; // HTML in den Knoten schreiben
    box.style.display = 'flex'; // nächster Schritt im Ablauf
    box.setAttribute('data-uid', String(opts.uid || (def && def.id) || '')); // nächster Schritt im Ablauf
    box.onclick = function (ev) { // Funktion
      if (ev.target === box || (ev.target && ev.target.tagName === 'IMG')) hideInspect(); // große Karte schließen
    };
    bindStatTips(box);
    box.querySelectorAll('[data-act]').forEach(function (btn) { // Element in der Seite suchen
      btn.onclick = function (ev) { // Funktion
        ev.stopPropagation(); // nächster Schritt im Ablauf
        var id = btn.getAttribute('data-act'); // lokale Variable
        hideInspect(); // große Karte schließen
        if (opts.onAction) opts.onAction(id); // Zweig nur bei zutreffender Bedingung
      };
    }); // nächster Schritt im Ablauf
  }

  /* Eine Front- oder Support-Kachel als HTML. */
    function unitHtml(inst, mine, section, row) { // Funktion
    if (!inst) return '<div class="slot empty" data-drop="front" data-section="' + (section||'') + '" data-row="' + (row||0) + '"></div>'; // Wert zurückgeben
    var d = engine.defOf(inst); // lokale Variable
    var st = engine.currentAtkDef(inst); // lokale Variable
    var hide = !!(inst.facedown && !mine);
    var expl = (!hide && engine.explainStats) ? engine.explainStats(inst) : null;
    var costAp = engine.costOf ? engine.costOf(d, null) : (d.ap || 0);
    var stats = hide ? '' : ((expl ? slotStatHtml(expl) : ('ATK ' + st.atk + ' / DEF ' + st.def)) + ' · ' + costAp + ' AP');
    var tokens = '';
    var picked = engine.state.pending && (engine.state.pending.selected || []).indexOf(inst.uid) >= 0; // offene Wahl des Spielers
    var deadact = inst.flags && inst.flags.exhausted || inst.attackUsed;
    var tokHtml = '';
    var locu = engine.findInst(inst.uid);
    if (locu && locu.zone === 'front') {
      var tok = engine.nmlAt(locu.player, locu.section, locu.row);
      if (tok) {
        var td = engine.defOf(tok);
        var face = tok.facedown;
        var cls = mine ? 'for-enemy' : 'for-me';
        tokHtml = '<div class="token-tri ' + cls + '">' + artTag(td, face) + '</div>';
      }
    }
    return '<div class="slot filled ' + (mine ? 'mine' : 'enemy') + (inst.facedown ? ' facedown' : '') + (picked ? ' picked' : '') + (deadact ? ' exhausted' : '') + '" data-uid="' + inst.uid + '" data-drop="front" data-section="' + (section||'') + '" data-row="' + (row||0) + '">' +
      tokHtml +
      artTag(d, hide) +
      (inst.facedown && mine ? '<div class="unit-hint">verdeckt</div>' : '') +
      '<div class="unit-stats">' + stats + '</div></div>'; // HTML-Sonderzeichen escapen
  }

  /* Neun Frontstellungen einer Seite als Linie. */
    function renderFront(p, mine) { // Frontlinie zeichnen
    var order = [['L',0],['L',1],['L',2],['C',0],['C',1],['C',2],['R',0],['R',1],['R',2]]; // lokale Variable
    var slots = order.map(function (pair) {
      return unitHtml(p.front[pair[0]][pair[1]], mine, pair[0], pair[1]);
    }).join(''); // nächster Schritt im Ablauf
    return '<div class="flank-legend"><span>Linke Flanke</span><span>Zentrum</span><span>Rechte Flanke</span></div>' + // Wert zurückgeben
      '<div class="front-line">' + slots + '</div>'; // nächster Schritt im Ablauf
  }

  function cardClass(typ) { // Funktion
    if (typ === 'Soforteinsatz') return 'sofort'; // Wert zurückgeben
    if (typ === 'Einheit') return 'unit'; // Wert zurückgeben
    if (typ === 'Ausrüstung') return 'eq'; // Wert zurückgeben
    return ''; // Wert zurückgeben
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
        if (!engine || engine.state.winner != null) return;
        if (window.dcTimerHold) return;
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

  var recapShown = ''; // lokale Variable
  var recapTimer = 0; // lokale Variable
  /* Letzte Runde: Karte links, Text rechts, danach Revue. */
    function showRecap(items, whose, opts) { // Aktion erklären
    var ov = document.getElementById('overlay'); // lokale Variable
    if (!ov) return; // Zweig nur bei zutreffender Bedingung
    window.clearTimeout(recapTimer); // globale Schnittstelle der Seite
    ov.innerHTML = // HTML in den Knoten schreiben
      '<div class="recap-stage">' + // nächster Schritt im Ablauf
        '<div class="recap-left"><img id="recap-art" alt=""></div>' + // nächster Schritt im Ablauf
        '<div class="recap-right">' + // nächster Schritt im Ablauf
          '<h2>' + escapeHtml((opts && opts.title) || (opts && opts.live ? 'Meldung' : 'Letzte Runde')) + '</h2>' +
          '<p class="tiny" id="recap-whose">' + escapeHtml(whose || '') + '</p>' + // HTML-Sonderzeichen escapen
          '<div class="recap-typed" id="recap-typed"></div>' +
          '<button type="button" class="primary" id="recap-ok" style="display:none">Weiter</button>' + // nächster Schritt im Ablauf
        '</div>' + // nächster Schritt im Ablauf
      '</div>'; // nächster Schritt im Ablauf
    hideHover(); // nächster Schritt im Ablauf
    hideInspect(); // große Karte schließen
    ov.style.display = 'flex'; // nächster Schritt im Ablauf
    var art = document.getElementById('recap-art'); // lokale Variable
    var typed = document.getElementById('recap-typed'); // lokale Variable
    var ok = document.getElementById('recap-ok'); // lokale Variable
    var list = (items && items.length) ? items.slice() : [];
    if (!list.length) { if (opts && opts.onDone) opts.onDone(); return; }
    opts = opts || {};
    var live = !!opts.live;
    var cancelled = false;
    ok.onclick = function () { // Funktion
      cancelled = true; // nächster Schritt im Ablauf
      window.clearTimeout(recapTimer); // globale Schnittstelle der Seite
      ov.style.display = 'none'; // nächster Schritt im Ablauf
    };
    function wait(ms) { // Funktion
      return new Promise(function (resolve) { // Wert zurückgeben
        recapTimer = window.setTimeout(resolve, ms); // später fortsetzen
      }); // nächster Schritt im Ablauf
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
        }
        tick();
      });
    }
    async function run() { // Funktion
      for (var n = 0; n < list.length; n++) { // Schleife
        if (cancelled) return; // Zweig nur bei zutreffender Bedingung
        var ev = list[n];
        var def = ev.cardId && CATALOG.cards.find(function (c) { return c.id === ev.cardId; });
        if (!def && ev.name) def = CATALOG.cards.find(function (c) { return c.name === ev.name; });
        var file = ev.image || (def && def.image) || backFile(def);
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
        ov.style.display = 'none';
        if (opts.onDone) opts.onDone();
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


  var lastRects = {};
  function rememberRects() {
    lastRects = {};
    document.querySelectorAll('[data-uid]').forEach(function (el) {
      lastRects[el.getAttribute('data-uid')] = el.getBoundingClientRect();
    });
  }
  function pileRect(id) {
    var el = document.getElementById(id);
    return el ? el.getBoundingClientRect() : { left: 40, top: 40, width: 52, height: 72 };
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
    requestAnimationFrame(function () {
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
    var mg = document.querySelector('#pile-my-grave img');
    if (mg && me.grave.length) {
      var d = engine.defOf(me.grave[me.grave.length - 1]);
      mg.src = imgSrc(d.image || backFile(d));
    }
  }

  function isLiveEvent(ev) {
    if (!ev) return false;
    if (ev.kind === 'reveal') return false;
    return true;
  }
  function presentNewEvents() {
    if (!engine || !engine.state) return;
    var all = engine.state.events || [];
    if (all.length > seenEvents) {
      eventQueue = eventQueue.concat(all.slice(seenEvents).filter(isLiveEvent));
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
    if (eventPlaying) return;
    if (!eventQueue.length) {
      if (engine && engine.state && engine.state.pending && engine.state.pending.player === activePlayer()) showPending();
      return;
    }
    eventPlaying = true;
    var batch = eventQueue.splice(0);
    if (!batch.length) { eventPlaying = false; return; }
    var titles = { attack: 'Kampfhandlung', destroy: 'Kampfhandlung', shout: 'Kampfhandlung', coin: 'Münze', spell: 'Einsatz', instant: 'Einsatz', deploy: 'Ausspielen', equip: 'Ausrüstung', support: 'Support' };
    function flyOne(i, after) {
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
    document.getElementById('ac-x').onclick = function () { ov.style.display = 'none'; };
  }
  var placing = false;
  function placeFromHand(uid, slot, viewer, facedown) {
    if (placing) return;
    placing = true;
    window.setTimeout(function () { placing = false; }, 0);
    var me = engine.player(viewer);
    var card = me.hand.find(function (c) { return c.uid === uid; });
    var hint = document.getElementById('hint');
    if (!card || !slot) {
      if (hint && !slot) hint.textContent = 'Nicht auf einem Feld losgelassen.';
      return;
    }
    var def = engine.defOf(card);
    var cost = engine.costOf(def, me, null, card);
    if (me.ap < cost) {
      if (hint) hint.textContent = 'Nicht genug AP (' + me.ap + '/' + cost + ').';
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
    if (def.typ === 'Soforteinsatz' && enemy && slot.dataset.uid) {
      dispatch({ type: 'PLAY', player: viewer, uid: uid, target: slot.dataset.uid });
      if (engine.state.pending && (engine.state.pending.kind === 'instant-target' || engine.state.pending.kind === 'resist-unit' || engine.state.pending.kind === 'clear-atk')) {
        dispatch({ type: 'CHOOSE_TARGET', player: viewer, target: slot.dataset.uid });
      }
      return;
    }
    if (hint) hint.textContent = def.typ === 'Einheit' ? 'Einheiten auf ein freies Feld der eigenen Front.' : 'Dieses Feld nimmt die Karte nicht.';
  }
  window.dcAcceptDrop = function (slot, uid) {
    placeFromHand(uid, slot, window.dcViewer, false);
  };
  function legalSelector(def) {
    if (!def) return '';
    if (def.typ === 'Einheit') return '#my-front .slot.empty';
    if (def.typ === 'Unterstützung') return '#my-support .slot.empty';
    if (def.typ === 'Ausrüstung') return '#my-front .slot.filled';
    if (def.typ === 'Soforteinsatz') return '#enemy-front .slot.filled, #enemy-support .slot.filled';
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
      if (pend && pend.kind === 'deploy' && slot.classList.contains('empty') && slot.closest('#my-front')) {
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
        if (pend && pend.kind === 'deploy' && pend.player === viewer && slot.closest('#my-front')) {
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
    if (el.getAttribute('data-html') === html) return false;
    el.setAttribute('data-html', html);
    el.innerHTML = html;
    return true;
  }
  /* Gesamten Tisch aus dem Engine-Stand neu aufbauen. */
    function render() { // Tisch neu zeichnen
    if (!engine || !engine.state || !engine.state.players) return;
    if (!armedPlay && (!engine.state.pending || engine.state.pending.kind !== 'deploy')) document.body.classList.remove('dc-armed');
    var st = engine.state; // lokale Variable
    var p0 = st.players[0], p1 = st.players[1]; // lokale Variable
    var viewer = mode === 'hotseat' ? st.active : you; // lokale Variable
    window.dcViewer = viewer;
    var me = st.players[viewer]; // lokale Variable
    var foe = st.players[viewer === 0 ? 1 : 0]; // lokale Variable
    $('#turnmeta').textContent = 'Zug ' + st.turn + ' · am Zug: ' + st.players[st.active].name + (st.winner != null ? ' · ENDE: ' + st.endReason : '');
    syncBombTimer();
    // sichtbaren Text setzen
    $('#ap0').textContent = p0.name + ' · ' + p0.ap + ' AP / ' + p0.vp + ' SP · Hand ' + p0.hand.length + ' · Deck ' + p0.deck.length;
    // Handkarten
    $('#ap1').textContent = p1.name + ' · ' + p1.ap + ' AP / ' + p1.vp + ' SP · Hand ' + p1.hand.length + ' · Deck ' + p1.deck.length;
    // Handkarten
    function setLabel(id, text) { var el = document.getElementById(id); if (el) el.textContent = text; } // sichtbaren Text setzen
    setLabel('enemy-support-label', foe.name + ' — Support'); // Unterstützungszone
    setLabel('enemy-front-label', foe.name + ' — Front'); // nächster Schritt im Ablauf
    setLabel('my-front-label', me.name + ' — Front'); // nächster Schritt im Ablauf
    setLabel('my-support-label', me.name + ' — Support'); // Unterstützungszone
    var dirty = applyHtml($('#enemy-front'), renderFront(foe, false));
    function supportHtml(list, mine) { // Unterstützungszone
      var filled = 0; // lokale Variable
      for (var i = 0; i < list.length; i++) if (list[i]) filled++; // Zweig nur bei zutreffender Bedingung
      var show = Math.max(9, Math.ceil(Math.max(filled, 1) / 9) * 9); // lokale Variable
      if (filled === 0) show = 9; // Zweig nur bei zutreffender Bedingung
      var html = ''; // lokale Variable
      for (var j = 0; j < show && j < list.length; j++) { // Schleife
        var s = list[j]; // lokale Variable
        if (!s) { html += '<div class="slot empty" data-drop="support" data-row="' + j + '"></div>'; continue; } // Zweig nur bei zutreffender Bedingung
        var d = engine.defOf(s); // lokale Variable
        var hide = !!(s.facedown && !mine);
        var cap = hide ? '' : ((d.ap != null ? d.ap + ' AP' : ''));
        html += '<div class="slot filled" data-drop="support" data-row="' + j + '" data-uid="' + s.uid + '">' + artTag(d, hide) +
          (s.facedown && mine ? '<div class="unit-hint">verdeckt — Gegner sieht die Rückseite</div>' : '') +
          (cap ? '<div class="unit-stats">' + cap + '</div>' : '') + '</div>';
        // Bild-HTML der Karte
      }
      return html; // Wert zurückgeben
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
          '<div class="token-tri">' + artTag(d, hidden) + '</div></div>';
      }).join('');
    }
    var en = document.getElementById('enemy-nml');
    var mn = document.getElementById('my-nml');
    if (en) { en.classList.add('nml-row'); dirty = applyHtml(en, nmlHtml(foe)) || dirty; }
    if (mn) { mn.classList.add('nml-row', 'mine'); dirty = applyHtml(mn, nmlHtml(me)) || dirty; }
    setLabel('enemy-nml-label', foe.name + ' — Niemandsland');
    setLabel('my-nml-label', me.name + ' — Niemandsland');
    function doctrineRow(list) {
      return (list || []).map(function (d) {
        var def = engine.defOf(d);
        return '<div class="doctrine-card" data-id="' + def.id + '">' + artTag(def, true) + '<div class="dn">' + escapeHtml(def.name) + '</div></div>';
      }).join('');
    }
    var ed = document.getElementById('enemy-doctrine');
    var md = document.getElementById('my-doctrine');
    if (ed) ed.innerHTML = doctrineRow(foe.doctrines);
    if (md) md.innerHTML = doctrineRow(me.doctrines);
    var pe = document.getElementById('plate-enemy');
    var pm = document.getElementById('plate-me');
    if (pe) pe.textContent = foe.name;
    if (pm) pm.textContent = me.name;
    dirty = applyHtml($('#hand'), me.hand.map(function (c) { // Handkarten
      var d = engine.defOf(c); // lokale Variable
      var cost = engine.costOf(d, me); // lokale Variable
      return '<div class="card ' + cardClass(d.typ) + '" data-uid="' + c.uid + '">' + // Wert zurückgeben
        artTag(d, false) + // Bild-HTML der Karte
        '<div class="body"><div class="unit-name">' + escapeHtml(d.name) + '</div>' + // HTML-Sonderzeichen escapen
        '<div class="unit-stats">' + cost + ' AP' + (d.atk != null ? ' · A' + d.atk + '/V' + d.def : '') + '</div></div></div>';
        // nächster Schritt im Ablauf
    }).join('')) || dirty;
    updatePiles();
    rememberRects();
    if (!dirty) return;
    $('#hand').querySelectorAll('.card').forEach(function (el) { // Handkarten
      bindHover(el, function () { // Funktion
        var card = me.hand.find(function (c) { return c.uid === el.dataset.uid; }); // Handkarten
        return card ? { def: engine.defOf(card), facedown: false, inst: null } : null; // verdeckte Lage
      }); // nächster Schritt im Ablauf
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
        armHandCard(card.uid, viewer, false);
      };
      el.oncontextmenu = function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        var card = me.hand.find(function (c) { return c.uid === el.dataset.uid; });
        if (!card) return;
        document.querySelectorAll('#hand .card.picked').forEach(function (c) { c.classList.remove('picked'); });
        el.classList.add('picked');
        armHandCard(card.uid, viewer, true);
      };
      el.draggable = false;
      el.querySelectorAll('img').forEach(function (img) { img.draggable = false; });
      el.ondragstart = function (ev) { ev.preventDefault(); };
    });
    bindBoardDrops(viewer);
    function tryPickPending(uid) { // Funktion
      var pend = engine.state.pending; // offene Wahl des Spielers
      if (!pend || pend.player !== viewer) return false; // Wert zurückgeben
      if (pend.kind === 'instant-target' || pend.kind === 'attack-target' || pend.kind === 'equip') { // Zweig nur bei zutreffender Bedingung
        dispatch({ type: 'CHOOSE_TARGET', player: pend.player, target: uid }); // eine Aktion durch die Regeln jagen
        return true; // Wert zurückgeben
      }
      return false; // Wert zurückgeben
    }
    document.querySelectorAll('#my-front .slot.filled').forEach(function (el) { // Element in der Seite suchen
      bindHover(el, function () { // Funktion
        var loc = engine.findInst(el.dataset.uid); // lokale Variable
        return loc ? { def: engine.defOf(loc.inst), facedown: loc.inst.facedown, inst: loc.inst } : null; // verdeckte Lage
      }); // nächster Schritt im Ablauf
      el.onclick = function () { // Funktion
        if (tryPickPending(el.dataset.uid)) return; // Zweig nur bei zutreffender Bedingung
        var loc = engine.findInst(el.dataset.uid); // lokale Variable
        if (!loc) return; // Zweig nur bei zutreffender Bedingung
        var d = engine.defOf(loc.inst); // lokale Variable
        showActChooser(loc, d, viewer); // nächster Schritt im Ablauf
      };
    }); // nächster Schritt im Ablauf
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
      el.onclick = function () {
        if (tryPickPending(el.dataset.uid)) return;
        var loc = engine.findInst(el.dataset.uid);
        if (!loc) return;
        var d = engine.defOf(loc.inst);
        var locked = engine._supportLocked && engine._supportLocked(viewer);
        var btns = [{ id: 'close', label: 'Zurück' }];
        if ((d.effects || []).length) btns.unshift({ id: 'activate', label: locked ? 'Blockiert' : 'Fähigkeit', primary: !locked });
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
      };
    });
    document.querySelectorAll('#enemy-doctrine .doctrine-card, #my-doctrine .doctrine-card').forEach(function (el) {
      bindHover(el, function () { // Funktion
        var def = CATALOG.cards.find(function (c) { return c.id === el.dataset.id; }); // Wert zurückgeben
        return def ? { def: def, facedown: false, inst: null } : null; // verdeckte Lage
      }); // nächster Schritt im Ablauf
      el.onclick = function () { // Funktion
        var def = CATALOG.cards.find(function (c) { return c.id === el.dataset.id; }); // Wert zurückgeben
        if (!def) return; // Zweig nur bei zutreffender Bedingung
        var db = [{ id: 'close', label: 'Zurück' }];
        if (def.id === 'dc_dok_bollwerk') db.unshift({ id: 'schutzwall', label: 'Schutzwall (2 AP)', primary: true });
        if (def.id === 'dc_dok_tiefenverteidigung') {
          db.unshift({ id: 'tvinfo', label: 'Blutzoll: nur gegnerische Front' });
        }
        if (def.id === 'dc_dok_sicherer_nachschub') {
          db.unshift({ id: 'ueberschuss', label: 'Überschuss (2 AP, 1× Zug, nur Support)' });
          db.unshift({ id: 'healarm', label: 'Feldreparatur (eigener Zug, 1×)', primary: true });
        }
        openInspect({
          def: def,
          zone: 'doctrine',
          buttons: db,
          onAction: function (id) {
            if (id !== 'schutzwall') return;
            var ov = document.getElementById('overlay');
            ov.innerHTML = '<div class="modal"><h2>Abweichung vom Kartentext</h2><p>Schutzwall ist abweichend vom Druck nur <strong>1× pro Runde</strong> erlaubt — das umfasst deinen Zug und den Zug des Gegners.</p><button type="button" class="primary" id="sw-go">Trotzdem einsetzen</button> <button type="button" id="sw-no">Abbrechen</button></div>';
            ov.style.display = 'flex';
            document.getElementById('sw-go').onclick = function () {
              ov.style.display = 'none';
              dispatch({ type: 'SCHUTZWALL', player: viewer });
            };
            document.getElementById('sw-no').onclick = function () { ov.style.display = 'none'; };
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
    }); // nächster Schritt im Ablauf
    bindStatTips(document.getElementById('app'));
    $('#hint').textContent = st.pending // offene Wahl des Spielers
      ? 'Ziel oder Stellung wählen.' // nächster Schritt im Ablauf
      : 'Karte auf ein Feld ziehen. Antippen öffnet die große Ansicht.'; // nächster Schritt im Ablauf
    $('#log').innerHTML = engine.log.slice(-40).reverse().map(function (l) { // HTML in den Knoten schreiben
      return '<div>' + escapeHtml(l.msg) + '</div>'; // HTML-Sonderzeichen escapen
    }).join(''); // nächster Schritt im Ablauf
    if (st.winner != null) { // Zweig nur bei zutreffender Bedingung
      var ov = $('#overlay'); // lokale Variable
      ov.innerHTML = '<div class="modal"><h2>' + escapeHtml(st.endReason) + '</h2><p>' + // HTML-Sonderzeichen escapen
        (st.winner == null ? 'Unentschieden durch Frieden.' : escapeHtml(st.players[st.winner].name) + ' gewinnt.') +
        // HTML-Sonderzeichen escapen
        '</p><button type="button" id="again">Neue Partie</button></div>'; // nächster Schritt im Ablauf
      ov.style.display = 'flex'; // nächster Schritt im Ablauf
      $('#again').onclick = function () { location.reload(); }; // Funktion
    } else if (st.pending && st.pending.player === viewer) {
      showPending();
    }
    if (mode === 'bot' && !window.dcTimerHold && (st.active === 1 || (st.pending && st.pending.player === 1))) {
      window.setTimeout(maybeBot, 200);
    }
  }

  window.dcRender = render; // globale Schnittstelle der Seite
  window.dcStart = startGame; // globale Schnittstelle der Seite
  window.dcGetEngine = function () { return engine; }; // Wert zurückgeben
  window.dcSetState = function (st) { // globale Schnittstelle der Seite
    if (!engine) { // Zweig nur bei zutreffender Bedingung
      engine = new DCEngine.Engine(window.DC_CATALOG, { seed: 1 }); // Zufallsstart
    }
    engine.state = st;
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
    var ov = document.getElementById('overlay'); // lokale Variable
    if (ov && ov.querySelector('.recap-modal') === null && ov.querySelector('.inspect-modal') === null) { // Element in der Seite suchen
      /* keep recap; hide leftover lobby overlay */
    }
    if (window.DCNet && DCNet.hookEngine) DCNet.hookEngine();
    render();
    presentNewEvents();
    if (first && window.dcKickoff) window.dcKickoff();
    else if (tr) { if (window.dcSetTable) window.dcSetTable(true); tr.style.display = 'none'; }
  };
  window.dcPresentNewEvents = presentNewEvents;
  window.dcSetNames = function (a, b) { // globale Schnittstelle der Seite
    if (!engine || !engine.state) return; // Zweig nur bei zutreffender Bedingung
    if (a) engine.state.players[0].name = a; // Zweig nur bei zutreffender Bedingung
    if (b) engine.state.players[1].name = b; // Zweig nur bei zutreffender Bedingung
  };
  window.dcSetYou = function (id) { you = id; }; // globale Schnittstelle der Seite
  window.dcSetMode = function (m) { mode = m || 'lan'; }; // globale Schnittstelle der Seite
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindChrome); // Ereignis binden
  else bindChrome(); // sonst
})(); // nächster Schritt im Ablauf
