/* Neue Pool-Karten ohne fertiges Artwork: neutraler, ehrlich gekennzeichneter Datenrahmen statt Bild/404.
   Kein fremdes Motiv, keine Bildanfrage. */
(function (global) {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function is(def) { return !!(def && def.art_status === 'platzhalter'); }
  function html(def, cls) {
    var stats = def.atk != null ? '<span class="ph-stats">ATK ' + def.atk + ' · DEF ' + def.def + '</span>' : '';
    return '<span class="' + esc(cls || 'art') + ' card-ph" role="img" aria-label="' + esc(def.name) + ' – Entwurf ohne Artwork">' +
      '<span class="ph-head"><b class="ph-ap" title="AP-Kosten">' + esc(def.typ === 'Soforteinsatz' ? 0 : def.ap) + '</b><span class="ph-name">' + esc(def.name) + '</span></span>' +
      '<span class="ph-kind">' + esc(def.klasse || def.typ) + ' · ' + esc(def.nation || '') + '</span>' +
      '<span class="ph-text">' + (global.DCKw ? global.DCKw.html(def) : '') + esc(def.text || '') + '</span>' + stats +
      '<span class="ph-flag">Entwurf · noch kein Artwork</span></span>';
  }
  function rulesHtml(def) {
    if (!def || !def.rules || !def.rules.length) return '';
    return '<div class="card-rules"><div class="card-rules-h">Regeln im Detail</div><ul>' +
      def.rules.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul></div>';
  }
  global.DCCardPh = { is: is, html: html, rulesHtml: rulesHtml };
})(window);
