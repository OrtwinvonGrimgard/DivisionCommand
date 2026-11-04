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
    // Doktrin-JPGs und Typ-Unterordner (infanterie/, panzer/, …) behalten ihre Endung
    if (/doktrin/i.test(key) || key.indexOf('/') >= 0) return key;
    return key.replace(/\.jpe?g$/i, '.png');
  }
  function folderSrc(name) {
    return 'assets/cards/' + String(name).split('/').map(encodeURIComponent).join('/');
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
    else if (/rueckseite|backside/i.test(src)) next = /doktrin|rot/i.test(src) ? 'thumbs/rueckseite-rot.png' : 'thumbs/rueckseite-schwarz.png';
    else if (/\.jpe?g(\?|$)/i.test(src) && !/doktrin/i.test(src)) {
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
    "deck_size": 60,
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
    "vp_to_win": 5,
    "white_peace": true,
    "graveyard_reshuffle": true,
    "doctrines": 2,
    "support_slots": 18,
    "max_hand": 7,
    "deploy_protection": true,
    "strict_facing": false,
    "combat_counter": "survivor_only",
    "deck_copy_limits": { "bronze": 4, "silver": 2, "gold": 1 },
    "doctrine_slots": 2,
    "victory_mode": "trophy",
    "opening_coin": true,
    "opening_starter_ap_penalty": 1,
    "trophy_vp_to_win": 5,
    "trophy_elite_vp": 2,
    "trophy_safety_empty_from": 26,
    "trophy_safety_vp_cap": 28,
    "trophy_durchbruch_max_claims": 3,
    "trophy_durchbruch_cooldown": 2,
    "trophy_doctrine_need_scale": 0.65
  }
};
window.DC_CATALOG.cards = [];
(function () {
  var pack = window.DC_SET_TYPES || {};
  Object.keys(pack).forEach(function (typ) {
    (pack[typ] || []).forEach(function (c) { window.DC_CATALOG.cards.push(c); });
  });
})();

/** Seltenheit → max. Kopien (Doktrinen separat: genau 2 verschiedene). */
window.DC_deckCopyLimit = function (cardOrRarity) {
  var r = cardOrRarity;
  if (r && typeof r === 'object') {
    if (r.typ === 'Doktrin') return 1;
    r = r.rarity;
  }
  r = String(r || 'bronze').toLowerCase();
  var lim = (window.DC_CATALOG.rules && window.DC_CATALOG.rules.deck_copy_limits) || { bronze: 4, silver: 2, gold: 1 };
  if (r === 'gold') return lim.gold != null ? lim.gold : 1;
  if (r === 'silver' || r === 'silber') return lim.silver != null ? lim.silver : 2;
  return lim.bronze != null ? lim.bronze : 4;
};

(function syncMaxCopiesFromRarity() {
  (window.DC_CATALOG.cards || []).forEach(function (c) {
    if (!c || c.typ === 'Doktrin' || c.typ === 'Token' || c.typ === 'Asset') return;
    c.max_copies = window.DC_deckCopyLimit(c);
  });
})();

/**
 * validateDeck(cardIds, doctrineIds, catalog?)
 * Zählt nach ID und nach Name (bei Namenskollisionen gilt das strengste Limit der beteiligten Karten).
 * Returns { ok, errors:[{kind,key,name,count,limit,ids}], fixedIds, notices }
 */
window.DC_validateDeck = function (cardIds, doctrineIds, catalog) {
  catalog = catalog || window.DC_CATALOG;
  var byId = {};
  (catalog.cards || []).forEach(function (c) { byId[c.id] = c; });
  var ids = (cardIds || []).filter(function (id) {
    var c = byId[id];
    return c && c.typ !== 'Doktrin' && c.typ !== 'Token' && c.typ !== 'Asset';
  });
  var errors = [];
  var countById = {};
  var countByName = {};
  var nameMeta = {};
  ids.forEach(function (id) {
    var c = byId[id];
    if (!c) return;
    countById[id] = (countById[id] || 0) + 1;
    var nm = String(c.name || id).trim().toLowerCase();
    countByName[nm] = (countByName[nm] || 0) + 1;
    if (!nameMeta[nm]) nameMeta[nm] = { limit: window.DC_deckCopyLimit(c), ids: [], name: c.name || id };
    nameMeta[nm].limit = Math.min(nameMeta[nm].limit, window.DC_deckCopyLimit(c));
    if (nameMeta[nm].ids.indexOf(id) < 0) nameMeta[nm].ids.push(id);
  });
  Object.keys(countById).forEach(function (id) {
    var c = byId[id];
    var lim = window.DC_deckCopyLimit(c);
    if (countById[id] > lim) {
      errors.push({ kind: 'id', key: id, name: c.name || id, count: countById[id], limit: lim, ids: [id] });
    }
  });
  Object.keys(countByName).forEach(function (nm) {
    var meta = nameMeta[nm];
    if (countByName[nm] > meta.limit) {
      // avoid duplicate if single-id already reported same overflow
      if (meta.ids.length === 1 && countById[meta.ids[0]] === countByName[nm]) return;
      errors.push({ kind: 'name', key: nm, name: meta.name, count: countByName[nm], limit: meta.limit, ids: meta.ids.slice() });
    }
  });
  var docs = (doctrineIds || []).filter(Boolean);
  var docSet = {};
  docs.forEach(function (id) { docSet[id] = (docSet[id] || 0) + 1; });
  Object.keys(docSet).forEach(function (id) {
    if (docSet[id] > 1) errors.push({ kind: 'doctrine', key: id, name: (byId[id] && byId[id].name) || id, count: docSet[id], limit: 1, ids: [id] });
  });
  if (docs.length > 2) errors.push({ kind: 'doctrine_slots', key: 'doctrines', name: 'Doktrinen', count: docs.length, limit: 2, ids: docs.slice() });

  // Auto-fix: keep order, drop excess by id then by name
  var kept = [];
  var seenId = {};
  var seenName = {};
  ids.forEach(function (id) {
    var c = byId[id];
    if (!c) return;
    var limId = window.DC_deckCopyLimit(c);
    var nm = String(c.name || id).trim().toLowerCase();
    var limName = (nameMeta[nm] && nameMeta[nm].limit) || limId;
    seenId[id] = seenId[id] || 0;
    seenName[nm] = seenName[nm] || 0;
    if (seenId[id] >= limId) return;
    if (seenName[nm] >= limName) return;
    seenId[id]++;
    seenName[nm]++;
    kept.push(id);
  });
  var notices = errors.map(function (e) {
    if (e.kind === 'name') return e.name + ': ' + e.count + '× (max ' + e.limit + ' wegen Namensgleichheit/' + (e.limit === 1 ? 'Gold' : 'Seltenheit') + ')';
    if (e.kind === 'doctrine_slots') return 'Doktrinen: ' + e.count + ' (genau 2 erlaubt)';
    return (e.name || e.key) + ': ' + e.count + '× (max ' + e.limit + ')';
  });
  return { ok: errors.length === 0, errors: errors, fixedIds: kept, notices: notices, doctrineIds: docs.slice(0, 2).filter(function (id, i, a) { return a.indexOf(id) === i; }) };
};


/* 0.5a: fehlende Schale nachziehen, ohne index.html neu zu schreiben. */
(function () {
  if (!document.getElementById('dc-align-css')) {
    var css = document.createElement('link');
    css.id = 'dc-align-css';
    css.rel = 'stylesheet';
    css.href = 'css/align.css?v=handzoom2';
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
