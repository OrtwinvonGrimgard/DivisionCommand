/** Bildnamen: GitHub-PNG treffen, auch wenn der Katalog .jpg sagt. */
(function (g) {
  'use strict';
  var ALIAS = {
    'rueckseite.jpg': 'thumbs/rueckseite-schwarz.png',
    'rueckseite.png': 'thumbs/rueckseite-schwarz.png',
    'Backside.jpg': 'thumbs/rueckseite-schwarz.png',
    'backside.png': 'thumbs/rueckseite-schwarz.png',
    'BACKSIDE DOCTRINE.jpg': 'thumbs/rueckseite-rot.png',
    'mine.jpg': 'MINE.png',
    'mine.png': 'MINE.png',
    'token-nebel-1.jpg': 'Nebel 1.png',
    'token-nebel-1.png': 'Nebel 1.png',
    'token-nebel-2.jpg': 'Nebel 2.png',
    'token-nebel-2.png': 'Nebel 2.png',
    'token-nebel-3.jpg': 'Nebel 3.png',
    'token-nebel-3.png': 'Nebel 3.png',
    'nebel-1.png': 'Nebel 1.png',
    'nebel-2.png': 'Nebel 2.png',
    'nebel-3.png': 'Nebel 3.png'
  };
  function resolveName(file) {
    if (!file) return '';
    var key = String(file);
    if (ALIAS[key]) return ALIAS[key];
    return key.replace(/\.jpe?g$/i, '.png');
  }
  function folderSrc(name) {
    return 'assets/cards/' + encodeURIComponent(name);
  }
  g.dcCardFile = resolveName;
  g.dcCardSrc = function (file) {
    if (!file) return '';
    var name = resolveName(file);
    if (g.DC_IMAGES) {
      if (g.DC_IMAGES[file]) return g.DC_IMAGES[file];
      if (g.DC_IMAGES[name]) return g.DC_IMAGES[name];
    }
    return folderSrc(name);
  };
  document.addEventListener('error', function (ev) {
    var el = ev.target;
    if (!el || el.tagName !== 'IMG') return;
    if (el.dataset.dcMapped === '1') return;
    var raw = el.getAttribute('data-file') || '';
    var src = el.getAttribute('src') || '';
    var next = '';
    if (raw) next = resolveName(raw);
    else if (/doktrin/i.test(src)) next = 'thumbs/rueckseite-rot.png';
    else if (/rueckseite/i.test(src)) next = 'thumbs/rueckseite-schwarz.png';
    else if (/\.jpe?g(\?|$)/i.test(src)) {
      try {
        var base = decodeURIComponent((src.split('?')[0].split('/').pop()) || '');
        next = resolveName(base);
      } catch (e) { next = ''; }
    }
    if (!next) return;
    if (src.indexOf(encodeURIComponent(next)) >= 0) return;
    el.dataset.dcMapped = '1';
    el.src = folderSrc(next);
  }, true);
})(window);

window.DC_CATALOG = window.DC_CATALOG || {
  "version": "alpha-02",
  "exported": "2026-08-30",
  "rules": {
    "players": 2,
    "deck_size": 40,
    "hand_start": 5,
    "ap_per_turn": 5,
    "ap_persist_through_opponent": true,
    "ap_expire_on_own_turn": true,
    "attack_ap": 1,
    "instant_ap_test": 0,
    "equip_ap_test": 0,
    "front_sections": 3,
    "slots_per_section": 3,
    "attack_arc": "opposite_plus_adjacent",
    "def_zero_destroys": true,
    "vp_to_win": 10,
    "white_peace": true,
    "graveyard_reshuffle": true,
    "doctrines": 2,
    "support_slots": 18,
    "max_hand": 7
  }
};
window.DC_CATALOG.cards = [];
(function () {
  var pack = window.DC_SET_ALPHA || {};
  Object.keys(pack).forEach(function (typ) {
    (pack[typ] || []).forEach(function (c) { window.DC_CATALOG.cards.push(c); });
  });
})();

/* 0.32e: fehlende Schale nachziehen, ohne index.html neu zu schreiben. */
(function () {
  if (!document.getElementById('dc-align-css')) {
    var css = document.createElement('link');
    css.id = 'dc-align-css';
    css.rel = 'stylesheet';
    css.href = 'css/align.css?v=032fx2';
    document.head.appendChild(css);
  }

  var brand = document.querySelector('#title-root > .title-brand');
  if (brand && !brand.querySelector('.title-logo')) {
    var logo = document.createElement('img');
    logo.className = 'title-logo';
    logo.alt = 'Division Command';
    logo.src = 'assets/title-logo.png?v=6';
    logo.onload = function () { brand.classList.add('has-logo'); };
    logo.onerror = function () { logo.remove(); };
    var stack = brand.querySelector('.title-stack');
    if (stack) brand.insertBefore(logo, stack);
    else brand.insertBefore(logo, brand.firstChild);
  }

  var list = document.getElementById('lib-list');
  if (list && !document.getElementById('lib-tabs')) {
    var tabs = [
      ['all', 'ALLE'],
      ['Infanterie', 'INFANTERIE'],
      ['Schützenpanzer', 'SCHÜTZENPANZER'],
      ['Panzer', 'PANZER'],
      ['Aufklärung', 'AUFKLÄRUNG'],
      ['Artillerie', 'ARTILLERIE'],
      ['Elite', 'ELITE'],
      ['Unterstützung', 'UNTERSTÜTZUNG'],
      ['Soforteinsatz', 'SOFORTEINSATZ'],
      ['Ausrüstung', 'AUSRÜSTUNG'],
      ['Doktrinen', 'DOKTRINEN']
    ];
    var main = document.createElement('div');
    main.className = 'lib-main';
    var tools = document.createElement('div');
    tools.className = 'lib-tools';
    var tabBar = document.createElement('div');
    tabBar.className = 'lib-tabs';
    tabBar.id = 'lib-tabs';
    tabBar.innerHTML = tabs.map(function (t, i) {
      return '<button type="button" class="lib-tab' + (i === 0 ? ' on' : '') + '" data-tab="' + t[0] + '">' + t[1] + '</button>';
    }).join('');
    var search = document.createElement('input');
    search.id = 'lib-search';
    search.className = 'lib-search';
    search.type = 'search';
    search.placeholder = 'Suche';
    search.setAttribute('aria-label', 'Karten suchen');
    tools.appendChild(tabBar);
    tools.appendChild(search);
    list.parentNode.insertBefore(main, list);
    main.appendChild(tools);
    main.appendChild(list);
  }

  var root = document.getElementById('title-root');
  if (root && !document.getElementById('title-sky')) {
    var probe = new Image();
    probe.onload = function () {
      if (document.getElementById('title-sky')) return;
      var world = document.createElement('div');
      world.className = 'title-world';
      world.innerHTML =
        '<div class="title-stage">' +
          '<video id="title-loop" class="title-loop" src="assets/title-back.mp4?v=032scene" autoplay muted loop playsinline preload="auto"></video>' +
          '<canvas id="title-sky" class="title-sky"></canvas>' +
          '<img class="title-battle" id="title-battle" alt="" src="assets/title-battle.webp?v=032plate">' +
          '<img class="title-tent" id="title-tent" alt="" src="assets/title-tent.webp">' +
        '</div>';
      root.insertBefore(world, root.firstChild);
      var fx = document.createElement('script');
      fx.src = 'js/ui/title-fx.js?v=032fx';
      document.body.appendChild(fx);
    };
    probe.src = 'assets/title-tent.webp';
  }
})();
