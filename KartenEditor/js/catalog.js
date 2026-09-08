(function (g) {
  'use strict';
  g.dcCardSrc = function (file) {
    if (!file) return '';
    if (String(file).indexOf('data:') === 0) return file;
    return 'assets/cards/' + encodeURIComponent(file);
  };
  g.DC_CATALOG = { version: 'editor', cards: [] };
  var pack = g.DC_SET_ALPHA || {};
  Object.keys(pack).forEach(function (typ) {
    (pack[typ] || []).forEach(function (c) { g.DC_CATALOG.cards.push(c); });
  });
})(window);
