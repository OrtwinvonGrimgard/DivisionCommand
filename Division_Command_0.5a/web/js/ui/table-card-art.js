/* Battlefield uses verified motif files, never a different card as fallback. Hand/detail are untouched. */
(function (global) {
  'use strict';
  function escape(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]; }); }
  function html(def, hidden) {
    if (hidden) return '<div class="table-motif table-hidden" aria-label="Verdeckte Karte"><span>VERDECKT</span></div>';
    var rec = def && global.DC_TABLE_ART && global.DC_TABLE_ART[def.id];
    var kw = global.DCKw ? global.DCKw.strip(def) : '';
    if (!rec && def && def.art_status === 'platzhalter') return '<div class="table-motif art-placeholder" aria-label="Entwurf ohne Artwork"><span>Entwurf · ohne Artwork</span>' + kw + '</div>';
    if (!rec) return '<div class="table-motif art-unavailable"><span>Motiv nicht verfügbar</span>' + kw + '</div>';
    var src = rec.src.split('/').map(encodeURIComponent).join('/');
    return '<div class="table-motif ' + escape(rec.kind) + '"><img class="table-art" draggable="false" alt="' + escape(def.name) +
      '" src="' + escape(src) + '" onerror="window.DCTableArt.failed(this)">' +
      '<span class="art-missing-label" hidden>Motiv nicht verfügbar</span>' + kw + '</div>';
  }
  function failed(img) {
    img.hidden = true;
    var root = img.parentElement;
    if (root) { root.classList.add('art-unavailable'); var label = root.querySelector('.art-missing-label'); if (label) label.hidden = false; }
  }
  global.DCTableArt = { html: html, failed: failed };
})(window);
