// Musik- und Effekt-Cache. Lieder bleiben Dateien (zu groß zum Einbetten).
// Kurze SFX können später als data-URL in DCAudio.sfxEmbed landen.
(function (global) {
  'use strict';

  var A = 'assets/audio/';
  function wav(rel) { return A + encodeURI(rel); }
  var TITLE = { id: 'title', src: wav('menue/Division Command (Remastered).wav'), title: 'Division Command' };
  var SETUP = { id: 'setup', src: wav('menue/Parade Drill (Remastered).wav'), title: 'Parade Drill' };
  var MENU = [
    TITLE,
    SETUP,
    { id: 'cadence', src: wav('menue/Regimental Cadence (Remastered).wav'), title: 'Regimental Cadence' },
    { id: 'last-charge', src: wav('menue/The Last Charge (Remastered).wav'), title: 'The Last Charge' }
  ];
  var BATTLE = [
    { id: 'airforce', src: wav('kampf/Airforce (Remastered).wav'), title: 'Airforce' },
    { id: 'artillery', src: wav('kampf/Artillery (Remastered).wav'), title: 'Artillery' },
    { id: 'business', src: wav('kampf/Business As Usual (Remastered).wav'), title: 'Business As Usual' },
    { id: 'chemicals', src: wav('kampf/Chemicals (Remastered).wav'), title: 'Chemicals' },
    { id: 'contested', src: wav('kampf/Contested Grounds (Remastered).wav'), title: 'Contested Grounds' },
    { id: 'decisions', src: wav('kampf/Decisions (Remastered).wav'), title: 'Decisions' },
    { id: 'enemy-lines', src: wav('kampf/Enemy Lines (Remastered).wav'), title: 'Enemy Lines' },
    { id: 'inside-out', src: wav('kampf/Inside Out (Remastered).wav'), title: 'Inside Out' },
    { id: 'over-the-hill', src: wav('kampf/Over the Hill (Remastered).wav'), title: 'Over the Hill' },
    { id: 'requiem', src: wav('kampf/Requiem of the Fallen (Remastered).wav'), title: 'Requiem of the Fallen' },
    { id: 'winter', src: wav('kampf/Winter March (Remastered).wav'), title: 'Winter March' }
  ];
  var TABLE = BATTLE;

  var SFX = [
    { id: 'ui-click', src: 'assets/sfx/ui-click.mp3' },
    { id: 'card-play', src: 'assets/sfx/card-play.mp3' },
    { id: 'attack', src: 'assets/sfx/attack.mp3' },
    { id: 'hit', src: 'assets/sfx/hit.mp3' },
    { id: 'draw', src: 'assets/sfx/draw.mp3' },
    { id: 'turn', src: 'assets/sfx/turn.mp3' },
    { id: 'win', src: 'assets/sfx/win.mp3' },
    { id: 'deploy-infanterie', src: 'assets/sfx/deploy-infanterie.mp3' },
    { id: 'deploy-panzer', src: 'assets/sfx/deploy-panzer.mp3' },
    { id: 'deploy-artillerie', src: 'assets/sfx/deploy-artillerie.mp3' },
    { id: 'deploy-fahrzeug', src: 'assets/sfx/deploy-fahrzeug.mp3' },
    { id: 'deploy-luft', src: 'assets/sfx/deploy-luft.mp3' },
    { id: 'attack-infanterie', src: 'assets/sfx/attack-infanterie.mp3' },
    { id: 'attack-panzer', src: 'assets/sfx/attack-panzer.mp3' },
    { id: 'attack-artillerie', src: 'assets/sfx/attack-artillerie.mp3' },
    { id: 'attack-fahrzeug', src: 'assets/sfx/attack-fahrzeug.mp3' },
    { id: 'attack-luft', src: 'assets/sfx/attack-luft.mp3' }
  ];
  var DEPLOY_BY_TAG = [['luft','deploy-luft'],['artillerie','deploy-artillerie'],['panzer','deploy-panzer'],['fahrzeug','deploy-fahrzeug'],['infanterie','deploy-infanterie']];
  var ATTACK_BY_TAG = [['luft','attack-luft'],['artillerie','attack-artillerie'],['panzer','attack-panzer'],['fahrzeug','attack-fahrzeug'],['infanterie','attack-infanterie']];

  var cache = {};
  var sfxEmbed = {};
  var ready = false;
  var tableEl = null;
  var titleEl = null;
  var lastTableSrc = '';
  var tableN = 0;
  var menuScene = '';
  var menuQ = [];
  var menuI = 0;

  function make(src) {
    var a = new Audio();
    a.preload = 'auto';
    a.src = src;
    try { a.load(); } catch (e) {}
    return a;
  }

  function preloadTitle() {
    if (!cache[TITLE.id]) cache[TITLE.id] = make(TITLE.src);
  }
  function preloadTable() {
    TABLE.forEach(function (t) {
      if (!cache[t.id]) cache[t.id] = make(t.src);
    });
  }
  function preload() {
    preloadTitle();
  }

  function vol() {
    var el = document.getElementById('opt-vol') || document.getElementById('opt-vol-ingame');
    return el ? Number(el.value) / 100 : 0.55;
  }

  function musicOn() {
    var el = document.getElementById('opt-music');
    return !el || el.checked;
  }

  function stop(el) {
    if (!el) return;
    try { el.pause(); el.currentTime = 0; } catch (e) {}
  }

  function byId(id) {
    var i;
    for (i = 0; i < MENU.length; i++) if (MENU[i].id === id) return MENU[i];
    for (i = 0; i < BATTLE.length; i++) if (BATTLE[i].id === id) return BATTLE[i];
    return TITLE;
  }

  function bindMenuEnded() {
    titleEl = document.getElementById('bgm');
    if (!titleEl || titleEl._dcMenuBound) return;
    titleEl.addEventListener('ended', function () {
      if (titleEl._dcMenu === 'queue') nextMenu();
    });
    titleEl._dcMenuBound = true;
  }

  function playTrack(rec, loop) {
    titleEl = document.getElementById('bgm') || cache[TITLE.id];
    tableEl = document.getElementById('bgm-battle');
    stop(tableEl);
    if (!musicOn()) { stop(titleEl); return; }
    bindMenuEnded();
    titleEl.loop = !!loop;
    titleEl.volume = vol();
    if (titleEl.src.indexOf(rec.src.replace('assets/audio/', '')) < 0) titleEl.src = rec.src;
    titleEl.play().catch(function () {});
    var label = document.getElementById('nowplay');
    if (label && titleEl._dcMenu === 'queue') label.textContent = '♪ ' + rec.title;
  }

  function playOnly(id) {
    var rec = byId(id);
    titleEl = document.getElementById('bgm');
    if (titleEl && titleEl._dcMenu === 'only' && titleEl.src.indexOf(rec.src.replace('assets/audio/', '')) >= 0 && !titleEl.paused) {
      titleEl.volume = vol();
      return;
    }
    menuScene = 'only-' + id;
    if (titleEl) titleEl._dcMenu = 'only';
    playTrack(rec, true);
  }

  function playFrom(startId, scene) {
    titleEl = document.getElementById('bgm');
    if (menuScene === scene && titleEl && !titleEl.paused && titleEl._dcMenu === 'queue') {
      titleEl.volume = vol();
      return;
    }
    menuScene = scene;
    var first = byId(startId);
    var rest = MENU.filter(function (t) { return t.id !== startId; });
    rest = shuffle(rest, (Date.now() % 100000) + MENU.length);
    menuQ = [first].concat(rest);
    menuI = 0;
    if (titleEl) titleEl._dcMenu = 'queue';
    playTrack(menuQ[0], false);
  }

  function nextMenu() {
    if (!menuQ.length) return;
    menuI += 1;
    if (menuI >= menuQ.length) {
      menuQ = shuffle(MENU.slice(), (Date.now() % 100000) + menuI);
      menuI = 0;
    }
    playTrack(menuQ[menuI], false);
  }

  function playTitle() { playFrom('title', 'menu'); }
  function playSetup() { playFrom('setup', 'setup'); }

  function shuffle(arr, seed) {
    var a = arr.slice();
    var x = (seed >>> 0) || 1;
    function rnd() { x = (x * 1664525 + 1013904223) >>> 0; return x / 4294967296; }
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function playTable() {
    preloadTable();
    titleEl = document.getElementById('bgm');
    tableEl = document.getElementById('bgm-battle');
    if (!tableEl) return;
    stop(titleEl);
    if (!musicOn()) { stop(tableEl); return; }
    tableEl.loop = false;
    tableEl.volume = vol();
    if (!tableEl._dcBound) {
      tableEl.addEventListener('ended', function () {
        if (tableEl._dcOn) nextTable();
      });
      tableEl._dcBound = true;
    }
    if (tableEl._dcOn && !tableEl.paused && tableEl.src) {
      tableEl.volume = vol();
      return;
    }
    tableEl._dcOn = true;
    nextTable();
  }

  function nextTable() {
    if (!tableEl) tableEl = document.getElementById('bgm-battle');
    if (!tableEl) return;
    var seed = (window.dcMusicSeed || 1) >>> 0;
    try {
      var eng = window.dcGetEngine && window.dcGetEngine();
      if (eng && eng.state && eng.state.seed) seed = eng.state.seed >>> 0;
    } catch (e) {}
    tableN += 1;
    var list = shuffle(TABLE, seed + tableN * 9973);
    var tr = list[0];
    if (list.length > 1 && tr.src === lastTableSrc) tr = list[1];
    lastTableSrc = tr.src;
    stop(document.getElementById('bgm'));
    tableEl.pause();
    tableEl.src = tr.src;
    tableEl.volume = vol();
    var label = document.getElementById('nowplay');
    if (label) label.textContent = '♪ ' + tr.title;
    tableEl.play().catch(function () {});
  }

  function stopTable() {
    tableEl = document.getElementById('bgm-battle');
    if (tableEl) { tableEl._dcOn = false; stop(tableEl); }
    var label = document.getElementById('nowplay');
    if (label) label.textContent = '';
  }

  function playSfx(id) {
    preload();
    var src = sfxEmbed[id];
    if (!src) {
      var rec = SFX.filter(function (s) { return s.id === id; })[0];
      src = rec && rec.src;
    }
    if (!src) return;
    var a = new Audio(src);
    a.volume = Math.min(1, vol() * 1.1);
    a.play().catch(function () {});
  }
  function tagsOf(def) {
    return ((def && def.tags) || []).map(function (x) { return String(x).toLowerCase(); });
  }
  function pickByTag(tags, table, fallback) {
    var i, j;
    for (i = 0; i < table.length; i++) {
      for (j = 0; j < tags.length; j++) {
        if (tags[j].indexOf(table[i][0]) >= 0) return table[i][1];
      }
    }
    return fallback;
  }
  function playForCard(kind, def) {
    var tags = tagsOf(def);
    if (kind === 'deploy') playSfx(pickByTag(tags, DEPLOY_BY_TAG, 'card-play'));
    else if (kind === 'attack') playSfx(pickByTag(tags, ATTACK_BY_TAG, 'attack'));
    else playSfx(kind);
  }


  global.DCAudio = {
    title: TITLE,
    table: TABLE,
    sfx: SFX,
    sfxEmbed: sfxEmbed,
    preload: preload,
    playTitle: playTitle,
    playSetup: playSetup,
    playOnly: playOnly,
    playFrom: playFrom,
    playTable: playTable,
    stopTable: stopTable,
    playSfx: playSfx,
    playForCard: playForCard,
    nextTable: nextTable
  };
})(window);
