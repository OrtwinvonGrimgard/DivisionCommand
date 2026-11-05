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
    { id: 'attack', src: 'assets/sfx/attack.mp3', ogg: 'assets/sfx/ogg/attack.ogg' },
    { id: 'attack-artillerie', src: 'assets/sfx/attack-artillerie.mp3', ogg: 'assets/sfx/ogg/attack-artillerie.ogg' },
    { id: 'attack-artillerie-02', src: 'assets/sfx/attack-artillerie-02.mp3', ogg: 'assets/sfx/ogg/attack-artillerie-02.ogg' },
    { id: 'attack-artillerie-03', src: 'assets/sfx/attack-artillerie-03.mp3', ogg: 'assets/sfx/ogg/attack-artillerie-03.ogg' },
    { id: 'attack-aufklaerung-01', src: 'assets/sfx/attack-aufklaerung-01.mp3', ogg: 'assets/sfx/ogg/attack-aufklaerung-01.ogg' },
    { id: 'attack-aufklaerung-02', src: 'assets/sfx/attack-aufklaerung-02.mp3', ogg: 'assets/sfx/ogg/attack-aufklaerung-02.ogg' },
    { id: 'attack-aufklaerung-03', src: 'assets/sfx/attack-aufklaerung-03.mp3', ogg: 'assets/sfx/ogg/attack-aufklaerung-03.ogg' },
    { id: 'attack-elite-layer-01', src: 'assets/sfx/attack-elite-layer-01.mp3', ogg: 'assets/sfx/ogg/attack-elite-layer-01.ogg' },
    { id: 'attack-elite-layer-02', src: 'assets/sfx/attack-elite-layer-02.mp3', ogg: 'assets/sfx/ogg/attack-elite-layer-02.ogg' },
    { id: 'attack-elite-layer-03', src: 'assets/sfx/attack-elite-layer-03.mp3', ogg: 'assets/sfx/ogg/attack-elite-layer-03.ogg' },
    { id: 'attack-fahrzeug', src: 'assets/sfx/attack-fahrzeug.mp3', ogg: 'assets/sfx/ogg/attack-fahrzeug.ogg' },
    { id: 'attack-infanterie', src: 'assets/sfx/attack-infanterie.mp3', ogg: 'assets/sfx/ogg/attack-infanterie.ogg' },
    { id: 'attack-infanterie-02', src: 'assets/sfx/attack-infanterie-02.mp3', ogg: 'assets/sfx/ogg/attack-infanterie-02.ogg' },
    { id: 'attack-infanterie-03', src: 'assets/sfx/attack-infanterie-03.mp3', ogg: 'assets/sfx/ogg/attack-infanterie-03.ogg' },
    { id: 'attack-infanterie-04', src: 'assets/sfx/attack-infanterie-04.mp3', ogg: 'assets/sfx/ogg/attack-infanterie-04.ogg' },
    { id: 'attack-luft', src: 'assets/sfx/attack-luft.mp3', ogg: 'assets/sfx/ogg/attack-luft.ogg' },
    { id: 'attack-panzer', src: 'assets/sfx/attack-panzer.mp3', ogg: 'assets/sfx/ogg/attack-panzer.ogg' },
    { id: 'attack-panzer-02', src: 'assets/sfx/attack-panzer-02.mp3', ogg: 'assets/sfx/ogg/attack-panzer-02.ogg' },
    { id: 'attack-panzer-03', src: 'assets/sfx/attack-panzer-03.mp3', ogg: 'assets/sfx/ogg/attack-panzer-03.ogg' },
    { id: 'card-play', src: 'assets/sfx/card-play.mp3', ogg: 'assets/sfx/ogg/card-play.ogg' },
    { id: 'cast-einsatz-01', src: 'assets/sfx/cast-einsatz-01.mp3', ogg: 'assets/sfx/ogg/cast-einsatz-01.ogg' },
    { id: 'cast-einsatz-02', src: 'assets/sfx/cast-einsatz-02.mp3', ogg: 'assets/sfx/ogg/cast-einsatz-02.ogg' },
    { id: 'coin', src: 'assets/sfx/coin.mp3', ogg: 'assets/sfx/ogg/coin.ogg' },
    { id: 'death-artillerie-01', src: 'assets/sfx/death-artillerie-01.mp3', ogg: 'assets/sfx/ogg/death-artillerie-01.ogg' },
    { id: 'death-artillerie-02', src: 'assets/sfx/death-artillerie-02.mp3', ogg: 'assets/sfx/ogg/death-artillerie-02.ogg' },
    { id: 'death-aufklaerung-01', src: 'assets/sfx/death-aufklaerung-01.mp3', ogg: 'assets/sfx/ogg/death-aufklaerung-01.ogg' },
    { id: 'death-aufklaerung-02', src: 'assets/sfx/death-aufklaerung-02.mp3', ogg: 'assets/sfx/ogg/death-aufklaerung-02.ogg' },
    { id: 'death-elite', src: 'assets/sfx/death-elite.mp3', ogg: 'assets/sfx/ogg/death-elite.ogg' },
    { id: 'death-infanterie-01', src: 'assets/sfx/death-infanterie-01.mp3', ogg: 'assets/sfx/ogg/death-infanterie-01.ogg' },
    { id: 'death-infanterie-02', src: 'assets/sfx/death-infanterie-02.mp3', ogg: 'assets/sfx/ogg/death-infanterie-02.ogg' },
    { id: 'death-infanterie-03', src: 'assets/sfx/death-infanterie-03.mp3', ogg: 'assets/sfx/ogg/death-infanterie-03.ogg' },
    { id: 'death-panzer-01', src: 'assets/sfx/death-panzer-01.mp3', ogg: 'assets/sfx/ogg/death-panzer-01.ogg' },
    { id: 'death-panzer-02', src: 'assets/sfx/death-panzer-02.mp3', ogg: 'assets/sfx/ogg/death-panzer-02.ogg' },
    { id: 'deploy-artillerie', src: 'assets/sfx/deploy-artillerie.mp3', ogg: 'assets/sfx/ogg/deploy-artillerie.ogg' },
    { id: 'deploy-artillerie-02', src: 'assets/sfx/deploy-artillerie-02.mp3', ogg: 'assets/sfx/ogg/deploy-artillerie-02.ogg' },
    { id: 'deploy-aufklaerung-01', src: 'assets/sfx/deploy-aufklaerung-01.mp3', ogg: 'assets/sfx/ogg/deploy-aufklaerung-01.ogg' },
    { id: 'deploy-aufklaerung-02', src: 'assets/sfx/deploy-aufklaerung-02.mp3', ogg: 'assets/sfx/ogg/deploy-aufklaerung-02.ogg' },
    { id: 'deploy-aufklaerung-03', src: 'assets/sfx/deploy-aufklaerung-03.mp3', ogg: 'assets/sfx/ogg/deploy-aufklaerung-03.ogg' },
    { id: 'deploy-elite-01', src: 'assets/sfx/deploy-elite-01.mp3', ogg: 'assets/sfx/ogg/deploy-elite-01.ogg' },
    { id: 'deploy-elite-02', src: 'assets/sfx/deploy-elite-02.mp3', ogg: 'assets/sfx/ogg/deploy-elite-02.ogg' },
    { id: 'deploy-fahrzeug', src: 'assets/sfx/deploy-fahrzeug.mp3', ogg: 'assets/sfx/ogg/deploy-fahrzeug.ogg' },
    { id: 'deploy-infanterie', src: 'assets/sfx/deploy-infanterie.mp3', ogg: 'assets/sfx/ogg/deploy-infanterie.ogg' },
    { id: 'deploy-infanterie-02', src: 'assets/sfx/deploy-infanterie-02.mp3', ogg: 'assets/sfx/ogg/deploy-infanterie-02.ogg' },
    { id: 'deploy-infanterie-03', src: 'assets/sfx/deploy-infanterie-03.mp3', ogg: 'assets/sfx/ogg/deploy-infanterie-03.ogg' },
    { id: 'deploy-luft', src: 'assets/sfx/deploy-luft.mp3', ogg: 'assets/sfx/ogg/deploy-luft.ogg' },
    { id: 'deploy-panzer', src: 'assets/sfx/deploy-panzer.mp3', ogg: 'assets/sfx/ogg/deploy-panzer.ogg' },
    { id: 'deploy-panzer-02', src: 'assets/sfx/deploy-panzer-02.mp3', ogg: 'assets/sfx/ogg/deploy-panzer-02.ogg' },
    { id: 'deploy-panzer-03', src: 'assets/sfx/deploy-panzer-03.mp3', ogg: 'assets/sfx/ogg/deploy-panzer-03.ogg' },
    { id: 'deploy-unterstuetzung-01', src: 'assets/sfx/deploy-unterstuetzung-01.mp3', ogg: 'assets/sfx/ogg/deploy-unterstuetzung-01.ogg' },
    { id: 'deploy-unterstuetzung-02', src: 'assets/sfx/deploy-unterstuetzung-02.mp3', ogg: 'assets/sfx/ogg/deploy-unterstuetzung-02.ogg' },
    { id: 'deploy-unterstuetzung-03', src: 'assets/sfx/deploy-unterstuetzung-03.mp3', ogg: 'assets/sfx/ogg/deploy-unterstuetzung-03.ogg' },
    { id: 'discard-card', src: 'assets/sfx/discard-card.mp3', ogg: 'assets/sfx/ogg/discard-card.ogg' },
    { id: 'doktrin-activate', src: 'assets/sfx/doktrin-activate.mp3', ogg: 'assets/sfx/ogg/doktrin-activate.ogg' },
    { id: 'doktrin-proc-01', src: 'assets/sfx/doktrin-proc-01.mp3', ogg: 'assets/sfx/ogg/doktrin-proc-01.ogg' },
    { id: 'doktrin-proc-02', src: 'assets/sfx/doktrin-proc-02.mp3', ogg: 'assets/sfx/ogg/doktrin-proc-02.ogg' },
    { id: 'doktrin-shift', src: 'assets/sfx/doktrin-shift.mp3', ogg: 'assets/sfx/ogg/doktrin-shift.ogg' },
    { id: 'draw', src: 'assets/sfx/draw.mp3', ogg: 'assets/sfx/ogg/draw.ogg' },
    { id: 'equip-01', src: 'assets/sfx/equip-01.mp3', ogg: 'assets/sfx/ogg/equip-01.ogg' },
    { id: 'equip-02', src: 'assets/sfx/equip-02.mp3', ogg: 'assets/sfx/ogg/equip-02.ogg' },
    { id: 'equip-03', src: 'assets/sfx/equip-03.mp3', ogg: 'assets/sfx/ogg/equip-03.ogg' },
    { id: 'equip-proc-01', src: 'assets/sfx/equip-proc-01.mp3', ogg: 'assets/sfx/ogg/equip-proc-01.ogg' },
    { id: 'equip-proc-02', src: 'assets/sfx/equip-proc-02.mp3', ogg: 'assets/sfx/ogg/equip-proc-02.ogg' },
    { id: 'hit', src: 'assets/sfx/hit.mp3', ogg: 'assets/sfx/ogg/hit.ogg' },
    { id: 'hit-artillerie', src: 'assets/sfx/hit-artillerie.mp3', ogg: 'assets/sfx/ogg/hit-artillerie.ogg' },
    { id: 'hit-explosion', src: 'assets/sfx/hit-explosion.mp3', ogg: 'assets/sfx/ogg/hit-explosion.ogg' },
    { id: 'hit-infanterie', src: 'assets/sfx/hit-infanterie.mp3', ogg: 'assets/sfx/ogg/hit-infanterie.ogg' },
    { id: 'hit-metall', src: 'assets/sfx/hit-metall.mp3', ogg: 'assets/sfx/ogg/hit-metall.ogg' },
    { id: 'hit-panzer', src: 'assets/sfx/hit-panzer.mp3', ogg: 'assets/sfx/ogg/hit-panzer.ogg' },
    { id: 'lose', src: 'assets/sfx/lose.mp3', ogg: 'assets/sfx/ogg/lose.ogg' },
    { id: 'mine-01', src: 'assets/sfx/mine-01.mp3', ogg: 'assets/sfx/ogg/mine-01.ogg' },
    { id: 'mine-02', src: 'assets/sfx/mine-02.mp3', ogg: 'assets/sfx/ogg/mine-02.ogg' },
    { id: 'remove-unterstuetzung', src: 'assets/sfx/remove-unterstuetzung.mp3', ogg: 'assets/sfx/ogg/remove-unterstuetzung.ogg' },
    { id: 'reveal-01', src: 'assets/sfx/reveal-01.mp3', ogg: 'assets/sfx/ogg/reveal-01.ogg' },
    { id: 'reveal-02', src: 'assets/sfx/reveal-02.mp3', ogg: 'assets/sfx/ogg/reveal-02.ogg' },
    { id: 'select-artillerie-01', src: 'assets/sfx/select-artillerie-01.mp3', ogg: 'assets/sfx/ogg/select-artillerie-01.ogg' },
    { id: 'select-artillerie-02', src: 'assets/sfx/select-artillerie-02.mp3', ogg: 'assets/sfx/ogg/select-artillerie-02.ogg' },
    { id: 'select-aufklaerung-01', src: 'assets/sfx/select-aufklaerung-01.mp3', ogg: 'assets/sfx/ogg/select-aufklaerung-01.ogg' },
    { id: 'select-aufklaerung-02', src: 'assets/sfx/select-aufklaerung-02.mp3', ogg: 'assets/sfx/ogg/select-aufklaerung-02.ogg' },
    { id: 'select-ausruestung-01', src: 'assets/sfx/select-ausruestung-01.mp3', ogg: 'assets/sfx/ogg/select-ausruestung-01.ogg' },
    { id: 'select-ausruestung-02', src: 'assets/sfx/select-ausruestung-02.mp3', ogg: 'assets/sfx/ogg/select-ausruestung-02.ogg' },
    { id: 'select-doktrin-01', src: 'assets/sfx/select-doktrin-01.mp3', ogg: 'assets/sfx/ogg/select-doktrin-01.ogg' },
    { id: 'select-doktrin-02', src: 'assets/sfx/select-doktrin-02.mp3', ogg: 'assets/sfx/ogg/select-doktrin-02.ogg' },
    { id: 'select-einsatz-01', src: 'assets/sfx/select-einsatz-01.mp3', ogg: 'assets/sfx/ogg/select-einsatz-01.ogg' },
    { id: 'select-einsatz-02', src: 'assets/sfx/select-einsatz-02.mp3', ogg: 'assets/sfx/ogg/select-einsatz-02.ogg' },
    { id: 'select-elite-01', src: 'assets/sfx/select-elite-01.mp3', ogg: 'assets/sfx/ogg/select-elite-01.ogg' },
    { id: 'select-elite-02', src: 'assets/sfx/select-elite-02.mp3', ogg: 'assets/sfx/ogg/select-elite-02.ogg' },
    { id: 'select-infanterie-01', src: 'assets/sfx/select-infanterie-01.mp3', ogg: 'assets/sfx/ogg/select-infanterie-01.ogg' },
    { id: 'select-infanterie-02', src: 'assets/sfx/select-infanterie-02.mp3', ogg: 'assets/sfx/ogg/select-infanterie-02.ogg' },
    { id: 'select-infanterie-03', src: 'assets/sfx/select-infanterie-03.mp3', ogg: 'assets/sfx/ogg/select-infanterie-03.ogg' },
    { id: 'select-panzer-01', src: 'assets/sfx/select-panzer-01.mp3', ogg: 'assets/sfx/ogg/select-panzer-01.ogg' },
    { id: 'select-panzer-02', src: 'assets/sfx/select-panzer-02.mp3', ogg: 'assets/sfx/ogg/select-panzer-02.ogg' },
    { id: 'select-unterstuetzung-01', src: 'assets/sfx/select-unterstuetzung-01.mp3', ogg: 'assets/sfx/ogg/select-unterstuetzung-01.ogg' },
    { id: 'select-unterstuetzung-02', src: 'assets/sfx/select-unterstuetzung-02.mp3', ogg: 'assets/sfx/ogg/select-unterstuetzung-02.ogg' },
    { id: 'trigger-unterstuetzung-01', src: 'assets/sfx/trigger-unterstuetzung-01.mp3', ogg: 'assets/sfx/ogg/trigger-unterstuetzung-01.ogg' },
    { id: 'trigger-unterstuetzung-02', src: 'assets/sfx/trigger-unterstuetzung-02.mp3', ogg: 'assets/sfx/ogg/trigger-unterstuetzung-02.ogg' },
    { id: 'trigger-unterstuetzung-03', src: 'assets/sfx/trigger-unterstuetzung-03.mp3', ogg: 'assets/sfx/ogg/trigger-unterstuetzung-03.ogg' },
    { id: 'trophy', src: 'assets/sfx/trophy.mp3', ogg: 'assets/sfx/ogg/trophy.ogg' },
    { id: 'turn', src: 'assets/sfx/turn.mp3', ogg: 'assets/sfx/ogg/turn.ogg' },
    { id: 'ui-click', src: 'assets/sfx/ui-click.mp3', ogg: 'assets/sfx/ogg/ui-click.ogg' },
    { id: 'unequip-01', src: 'assets/sfx/unequip-01.mp3', ogg: 'assets/sfx/ogg/unequip-01.ogg' },
    { id: 'unequip-02', src: 'assets/sfx/unequip-02.mp3', ogg: 'assets/sfx/ogg/unequip-02.ogg' },
    { id: 'win', src: 'assets/sfx/win.mp3', ogg: 'assets/sfx/ogg/win.ogg' }
  ];

  // Tag-Priorität für Kartentypen (länger/spezifischer zuerst).
  var DEPLOY_BY_TAG = [
    ['luftschlag', 'deploy-luft'], ['luft', 'deploy-luft'],
    ['artillerie', 'deploy-artillerie'],
    ['panzer', 'deploy-panzer'],
    ['elite', 'deploy-elite'],
    ['aufklaerung', 'deploy-aufklaerung'], ['aufklärung', 'deploy-aufklaerung'],
    ['unterstuetzung', 'deploy-unterstuetzung'], ['unterstützung', 'deploy-unterstuetzung'],
    ['ausruestung', 'equip'], ['ausrüstung', 'equip'],
    ['einsatz', 'cast-einsatz'], ['soforteinsatz', 'cast-einsatz'],
    ['doktrin', 'doktrin-activate'],
    ['fahrzeug', 'deploy-fahrzeug'],
    ['infanterie', 'deploy-infanterie']
  ];
  var ATTACK_BY_TAG = [
    ['luftschlag', 'attack-luft'], ['luft', 'attack-luft'],
    ['artillerie', 'attack-artillerie'],
    ['panzer', 'attack-panzer'],
    ['elite', 'attack-elite'],
    ['aufklaerung', 'attack-aufklaerung'], ['aufklärung', 'attack-aufklaerung'],
    ['fahrzeug', 'attack-fahrzeug'],
    ['infanterie', 'attack-infanterie']
  ];
  var SELECT_BY_TAG = [
    ['doktrin', 'select-doktrin'],
    ['elite', 'select-elite'],
    ['aufklaerung', 'select-aufklaerung'], ['aufklärung', 'select-aufklaerung'],
    ['unterstuetzung', 'select-unterstuetzung'], ['unterstützung', 'select-unterstuetzung'],
    ['ausruestung', 'select-ausruestung'], ['ausrüstung', 'select-ausruestung'],
    ['einsatz', 'select-einsatz'], ['soforteinsatz', 'select-einsatz'],
    ['artillerie', 'select-artillerie'],
    ['panzer', 'select-panzer'],
    ['infanterie', 'select-infanterie']
  ];
  var DEATH_BY_TAG = [
    ['elite', 'death-elite'],
    ['aufklaerung', 'death-aufklaerung'], ['aufklärung', 'death-aufklaerung'],
    ['artillerie', 'death-artillerie'],
    ['panzer', 'death-panzer'],
    ['infanterie', 'death-infanterie']
  ];
  var HIT_BY_TAG = [
    ['panzer', 'hit-panzer'], ['gepanzert', 'hit-panzer'],
    ['artillerie', 'hit-artillerie'],
    ['infanterie', 'hit-infanterie'],
    ['elite', 'hit-infanterie']
  ];
  // Attack-Sounds enthalten bereits den Einschlag — kein extra hit danach.
  var ATTACK_HAS_IMPACT = true;


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
  function preloadSfx() {
    ['ui-click', 'card-play', 'draw', 'turn', 'attack-infanterie', 'deploy-infanterie', 'hit', 'win', 'lose'].forEach(function (id) {
      try {
        var rec = SFX.filter(function (s) { return s.id === id; })[0];
        if (!rec) return;
        var src = rec.ogg || rec.src;
        var a = new Audio();
        a.preload = 'auto';
        a.src = src;
        try { a.load(); } catch (e) {}
      } catch (e2) {}
    });
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


  // SFX start only inside/after an actual trusted user gesture, never from initial hover.
  var sfxUnlocked = false;
  function unlockSfx(ev) {
    if (ev && ev.isTrusted) sfxUnlocked = true;
  }
  ['pointerdown', 'keydown', 'click'].forEach(function (type) {
    document.addEventListener(type, unlockSfx, true);
  });
  var sfxBusy = [];
  var MAX_SFX = 6;
  var lastSelectAt = 0;
  var lastAttackHadImpact = false;
  var lastAttackAt = 0;
  var VARIANT_POOLS = {};

  function sfxVol() {
    var el = document.getElementById('opt-sfx') || document.getElementById('opt-sfx-ingame') || document.getElementById('opt-vol') || document.getElementById('opt-vol-ingame');
    var value = el ? Number(el.value) / 100 : 0.55;
    return isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
  }

  function duckMusic(amount, ms) {
    try {
      var battle = document.getElementById('bgm-battle');
      var bgm = document.getElementById('bgm');
      var targets = [];
      if (battle && !battle.paused) targets.push(battle);
      if (bgm && !bgm.paused) targets.push(bgm);
      targets.forEach(function (el) {
        if (el._dcDuckTimer) clearTimeout(el._dcDuckTimer);
        var base = vol();
        el.volume = Math.max(0, base * (1 - amount));
        el._dcDuckTimer = setTimeout(function () {
          try { el.volume = vol(); } catch (e) {}
        }, ms || 700);
      });
    } catch (e) {}
  }

  function pruneBusy() {
    sfxBusy = sfxBusy.filter(function (a) {
      return a && !a.ended && !a.paused;
    });
  }

  function resolveVariant(baseId) {
    if (!VARIANT_POOLS[baseId]) {
      var have = {};
      SFX.forEach(function (s) { have[s.id] = true; });
      var pool = [];
      if (have[baseId]) pool.push(baseId);
      SFX.forEach(function (s) {
        if (s.id.indexOf(baseId + '-') === 0) pool.push(s.id);
      });
      if (!pool.length && have[baseId]) pool.push(baseId);
      VARIANT_POOLS[baseId] = pool;
    }
    var pool = VARIANT_POOLS[baseId];
    if (!pool.length) return baseId;
    if (pool.length === 1) return pool[0];
    return pool[Math.floor(Math.random() * pool.length)];
  }

  function pickSrc(rec) {
    if (!rec) return null;
    // Prefer ogg when supported
    var a = document.createElement('audio');
    if (rec.ogg && a.canPlayType && a.canPlayType('audio/ogg; codecs="vorbis"')) return rec.ogg;
    return rec.src || rec.ogg || null;
  }

  function playSfx(id, opts) {
    opts = opts || {};
    try {
      if (!id || !sfxUnlocked || sfxVol() <= 0) return;
      // Expand variant groups
      if (id === 'deploy-elite') id = resolveVariant('deploy-elite');
      else if (id === 'attack-elite') id = resolveVariant('attack-elite-layer');
      else if (id === 'deploy-aufklaerung') id = resolveVariant('deploy-aufklaerung');
      else if (id === 'attack-aufklaerung') id = resolveVariant('attack-aufklaerung');
      else if (id === 'deploy-unterstuetzung') id = resolveVariant('deploy-unterstuetzung');
      else if (id === 'deploy-infanterie') id = resolveVariant('deploy-infanterie');
      else if (id === 'deploy-panzer') id = resolveVariant('deploy-panzer');
      else if (id === 'deploy-artillerie') id = resolveVariant('deploy-artillerie');
      else if (id === 'attack-infanterie') id = resolveVariant('attack-infanterie');
      else if (id === 'attack-panzer') id = resolveVariant('attack-panzer');
      else if (id === 'attack-artillerie') id = resolveVariant('attack-artillerie');
      else if (id === 'cast-einsatz') id = resolveVariant('cast-einsatz');
      else if (id === 'equip') id = resolveVariant('equip');
      else if (id === 'select-infanterie') id = resolveVariant('select-infanterie');
      else if (id === 'select-panzer') id = resolveVariant('select-panzer');
      else if (id === 'select-artillerie') id = resolveVariant('select-artillerie');
      else if (id === 'select-aufklaerung') id = resolveVariant('select-aufklaerung');
      else if (id === 'select-elite') id = resolveVariant('select-elite');
      else if (id === 'select-unterstuetzung') id = resolveVariant('select-unterstuetzung');
      else if (id === 'select-einsatz') id = resolveVariant('select-einsatz');
      else if (id === 'select-ausruestung') id = resolveVariant('select-ausruestung');
      else if (id === 'select-doktrin') id = resolveVariant('select-doktrin');
      else if (id === 'death-infanterie') id = resolveVariant('death-infanterie');
      else if (id === 'death-panzer') id = resolveVariant('death-panzer');
      else if (id === 'death-artillerie') id = resolveVariant('death-artillerie');
      else if (id === 'death-aufklaerung') id = resolveVariant('death-aufklaerung');
      else if (id === 'mine') id = resolveVariant('mine');
      else if (id === 'reveal') id = resolveVariant('reveal');
      else if (id === 'trigger-unterstuetzung') id = resolveVariant('trigger-unterstuetzung');
      else if (id === 'doktrin-proc') id = resolveVariant('doktrin-proc');
      else if (id === 'unequip') id = resolveVariant('unequip');

      var src = sfxEmbed[id];
      if (!src) {
        var rec = SFX.filter(function (s) { return s.id === id; })[0];
        src = pickSrc(rec);
      }
      if (!src) return; // fehlende Datei = still

      pruneBusy();
      var prio = opts.prio || 2;
      if (sfxBusy.length >= MAX_SFX) {
        if (prio >= 3) return;
        // drop oldest low-prio
        var drop = null; var di = -1;
        for (var i = 0; i < sfxBusy.length; i++) {
          if ((sfxBusy[i]._prio || 2) >= 2) { drop = sfxBusy[i]; di = i; break; }
        }
        if (drop) {
          try { drop.pause(); } catch (e) {}
          sfxBusy.splice(di, 1);
        } else if (prio > 1) return;
      }

      var a = new Audio(src);
      a._prio = prio;
      a._sfxGain = opts.gain != null ? opts.gain : 1.05;
      a.volume = Math.min(1, sfxVol() * a._sfxGain);
      a.addEventListener('ended', function () {
        var ix = sfxBusy.indexOf(a);
        if (ix >= 0) sfxBusy.splice(ix, 1);
      });
      sfxBusy.push(a);
      var p = a.play();
      if (p && p.catch) p.catch(function () {});

      if (opts.duck) duckMusic(opts.duck, opts.duckMs || 700);

      if (typeof window !== 'undefined' && window.__DC_SFX_LOG) {
        window.__DC_SFX_LOG.push({ id: id, t: Date.now(), prio: prio });
      }
    } catch (e) {
      // nie Fehler nach außen
    }
  }

  function tagsOf(def) {
    var tags = ((def && def.tags) || []).map(function (x) { return String(x).toLowerCase(); });
    if (def && def.klasse) tags.push(String(def.klasse).toLowerCase());
    if (def && def.typ) tags.push(String(def.typ).toLowerCase());
    return tags;
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
  function unitBucket(def) {
    var tags = tagsOf(def);
    if (tags.some(function (t) { return t.indexOf('luft') >= 0; })) return 'luft';
    if (tags.some(function (t) { return t.indexOf('artillerie') >= 0; })) return 'artillerie';
    if (tags.some(function (t) { return t.indexOf('panzer') >= 0; })) return 'panzer';
    if (tags.some(function (t) { return t.indexOf('aufklaer') >= 0 || t.indexOf('aufklär') >= 0; })) return 'aufklaerung';
    if (tags.some(function (t) { return t.indexOf('elite') >= 0; })) return 'elite';
    if (tags.some(function (t) { return t.indexOf('fahrzeug') >= 0; })) return 'fahrzeug';
    if (tags.some(function (t) { return t.indexOf('infanterie') >= 0; })) return 'infanterie';
    return 'infanterie';
  }

  function playForCard(kind, def) {
    var tags = tagsOf(def);
    var typ = String((def && def.typ) || '').toLowerCase();
    var name = String((def && def.name) || '');
    if (kind === 'deploy' || kind === 'play') {
      if (/minenfeld|mine/i.test(name) || tags.some(function (t) { return t.indexOf('mine') >= 0 || t.indexOf('befestigung') >= 0; })) {
        playSfx('mine', { prio: 1, duck: 0.4, duckMs: 800 });
        return;
      }
      if (typ === 'doktrin' || tags.some(function (t) { return t.indexOf('doktrin') >= 0; })) {
        playSfx('doktrin-activate', { prio: 2 });
        return;
      }
      if (typ.indexOf('ausr') >= 0 || tags.some(function (t) { return t.indexOf('ausruest') >= 0 || t.indexOf('ausrüst') >= 0; })) {
        playSfx('equip', { prio: 2 });
        return;
      }
      if (typ.indexOf('sofort') >= 0 || typ.indexOf('einsatz') >= 0 || tags.some(function (t) { return t.indexOf('einsatz') >= 0; })) {
        playSfx('cast-einsatz', { prio: 2, duck: 0.35, duckMs: 600 });
        return;
      }
      if (typ.indexOf('unterstüt') >= 0 || typ.indexOf('unterstuetz') >= 0 ||
          tags.some(function (t) { return t.indexOf('unterstuetz') >= 0 || t.indexOf('unterstütz') >= 0; })) {
        playSfx('deploy-unterstuetzung', { prio: 2 });
        return;
      }
      var isElite = tags.some(function (t) { return t.indexOf('elite') >= 0; }) || typ === 'elite';
      // Basis ohne Elite-Tag wählen
      var baseTags = tags.filter(function (t) { return t.indexOf('elite') < 0; });
      if (!baseTags.length) baseTags = tags;
      var id = pickByTag(baseTags, DEPLOY_BY_TAG, 'card-play');
      if (id === 'deploy-elite') id = pickByTag(baseTags.filter(function (t) { return t.indexOf('elite') < 0; }), [
        ['luft', 'deploy-luft'], ['artillerie', 'deploy-artillerie'], ['panzer', 'deploy-panzer'],
        ['fahrzeug', 'deploy-fahrzeug'], ['infanterie', 'deploy-infanterie']
      ], 'deploy-infanterie');
      playSfx(id, { prio: 2 });
      if (isElite) playSfx('deploy-elite', { prio: 2, gain: 0.7 });
      if (id.indexOf('luft') >= 0) duckMusic(0.35, 600);
    } else if (kind === 'attack') {
      var isEliteA = tags.some(function (t) { return t.indexOf('elite') >= 0; });
      var baseTagsA = tags.filter(function (t) { return t.indexOf('elite') < 0; });
      if (!baseTagsA.length) baseTagsA = tags;
      var aid = pickByTag(baseTagsA, ATTACK_BY_TAG, 'attack');
      if (aid.indexOf('elite') >= 0) {
        aid = pickByTag(baseTagsA, [
          ['luft', 'attack-luft'], ['artillerie', 'attack-artillerie'], ['panzer', 'attack-panzer'],
          ['aufklaerung', 'attack-aufklaerung'], ['fahrzeug', 'attack-fahrzeug'], ['infanterie', 'attack-infanterie']
        ], 'attack-infanterie');
      }
      playSfx(aid, { prio: 1 });
      if (isEliteA) playSfx('attack-elite', { prio: 2, gain: 0.55 });
      lastAttackHadImpact = ATTACK_HAS_IMPACT;
      lastAttackAt = Date.now();
      if (aid.indexOf('artillerie') >= 0 || aid.indexOf('panzer') >= 0 || aid.indexOf('luft') >= 0) {
        duckMusic(0.45, 900);
      }
    } else if (kind === 'select') {
      var now = Date.now();
      if (now - lastSelectAt < 120) return;
      lastSelectAt = now;
      playSfx(pickByTag(tags, SELECT_BY_TAG, 'ui-click'), { prio: 3, gain: 0.7 });
    } else if (kind === 'death') {
      var did = pickByTag(tags, DEATH_BY_TAG, 'death-infanterie');
      playSfx(did, { prio: 1 });
      if (tags.some(function (t) { return t.indexOf('elite') >= 0; }) && did.indexOf('elite') < 0) {
        playSfx('death-elite', { prio: 2, gain: 0.6 });
      }
    } else if (kind === 'hit') {
      var recent = Date.now() - lastAttackAt < 2500;
      if (recent && lastAttackHadImpact && !optsForceHit(def)) return;
      playSfx(pickByTag(tags, HIT_BY_TAG, 'hit'), { prio: 1 });
    } else {
      playSfx(kind, { prio: 2 });
    }
  }
  function optsForceHit(def) { return !!(def && def._forceHit); }

  function playEvent(ev) {
    if (!ev) return;
    try {
      var kind = ev.kind;
      var def = ev._def || null;
      if (!def && ev.cardId && global.DC_CATALOG && DC_CATALOG.cards) {
        for (var i = 0; i < DC_CATALOG.cards.length; i++) {
          if (DC_CATALOG.cards[i].id === ev.cardId) { def = DC_CATALOG.cards[i]; break; }
        }
      }
      if (!def && ev.name) def = { name: ev.name, tags: [], image: ev.image };
      if (kind === 'destroy') {
        var recent = Date.now() - lastAttackAt < 2800;
        if (!(recent && lastAttackHadImpact)) {
          playSfx(pickByTag(tagsOf(def), HIT_BY_TAG, 'hit'), { prio: 1 });
        }
        playForCard('death', def || { tags: ['infanterie'] });
        duckMusic(0.3, 500);
      } else if (kind === 'draw') {
        playSfx('draw', { prio: 3, gain: 0.75 });
      } else if (kind === 'attack') {
        // already handled via action; optional
      } else if (kind === 'deploy') {
        // already via PLAY
      } else if (kind === 'equip') {
        playSfx('equip', { prio: 2 });
      } else if (kind === 'coin') {
        playSfx('coin', { prio: 2 });
      } else if (kind === 'vp' || kind === 'trophy') {
        playSfx('trophy', { prio: 1 });
        duckMusic(0.5, 1000);
      } else if (kind === 'spell' || kind === 'instant') {
        playSfx('cast-einsatz', { prio: 2 });
      } else if (kind === 'shout') {
        playSfx('ui-click', { prio: 3 });
      }
    } catch (e) {}
  }

  function notifyGameEnd(winnerIsYou) {
    playSfx(winnerIsYou ? 'win' : 'lose', { prio: 1, duck: 0.7, duckMs: 2000 });
  }


  function refreshVolumes() {
    // Update already-playing effects too; zero must silence immediately.
    Object.keys(cache).forEach(function (id) {
      try { cache[id].volume = vol(); } catch (e) {}
    });
    [titleEl, tableEl, document.getElementById('bgm'), document.getElementById('bgm-battle')].forEach(function (a) {
      try { if (a) a.volume = vol(); } catch (e) {}
    });
    sfxBusy.forEach(function (a) {
      try { a.volume = Math.min(1, sfxVol() * a._sfxGain); } catch (e) {}
    });
  }

  global.DCAudio = {
    title: TITLE,
    table: TABLE,
    sfx: SFX,
    refreshVolumes: refreshVolumes,
    sfxEmbed: sfxEmbed,
    preload: function () { preload(); preloadSfx(); },
    playTitle: playTitle,
    playSetup: playSetup,
    playOnly: playOnly,
    playFrom: playFrom,
    playTable: playTable,
    stopTable: stopTable,
    playSfx: playSfx,
    playForCard: playForCard,
    playEvent: playEvent,
    notifyGameEnd: notifyGameEnd,
    duckMusic: duckMusic,
    nextTable: nextTable,
    unitBucket: unitBucket
  };
})(window);
