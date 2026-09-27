/**
 * Bildnamen: GitHub hat PNG mit Originaltiteln.
 * Der Katalog nennt oft .jpg oder rueckseite.jpg.
 * Diese Datei mappt beides auf die echte Datei.
 */
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

  function cardSrc(file) {
    if (!file) return '';
    var name = resolveName(file);
    if (g.DC_IMAGES) {
      if (g.DC_IMAGES[file]) return g.DC_IMAGES[file];
      if (g.DC_IMAGES[name]) return g.DC_IMAGES[name];
    }
    return folderSrc(name);
  }

  g.dcCardFile = resolveName;
  g.dcCardSrc = cardSrc;

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
        var u = src.split('?')[0];
        var base = decodeURIComponent(u.split('/').pop() || '');
        next = resolveName(base);
      } catch (e) { next = ''; }
    }
    if (!next) return;
    var want = folderSrc(next);
    if (src.indexOf(encodeURIComponent(next)) >= 0) return;
    el.dataset.dcMapped = '1';
    el.src = want;
  }, true);
})(window);
