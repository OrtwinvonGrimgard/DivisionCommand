/* Division Command – allgemeine Schlüsselwörter (Vokabular, nicht nationsgebunden).
   Karten tragen sie in def.keywords; die Engine wertet sie strukturiert aus (engine.js: _kw…).
   Darstellung: fettes Wort plus vollständiger Erinnerungstext in Klammern. */
(function (root) {
  'use strict';
  var K = {
    'Gefechtsbereit': 'Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.',
    'Ablösung': 'Wird diese Einheit zerstört, kostet die nächste eigene Einheit, die du auf dasselbe Feld setzt, 1 AP weniger (mindestens 1), bis das Feld wieder besetzt wurde oder bis zum Ende deines nächsten Zugs, was zuerst eintritt. Höchstens eine solche Markierung pro Feld.',
    'Staffelangriff': 'Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.',
    'Fernschuss': 'Hat +1 Reichweite.',
    'Durchschlag': 'Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).',
    'Platztausch': 'Wird die Einheit aufgedeckt, darfst du sie mit einer anderen eigenen verdeckten Einheit tauschen. Der Tausch gilt nicht als neuer Einsatz (kein neues Eingraben). Der Gegner erfährt nicht den Namen der anderen Karte, nur dass getauscht wurde bzw. die Wahl existiert.',
    'Überlast': 'Hat +2 ATK und +1 DEF. Am Ende jedes deiner Züge erleidet sie 1 Schaden, der nicht verhindert werden kann (nicht durch Eingraben oder Schadensreduktion).',
    'Abschirmung': 'Einmal pro Zug darfst du 1 Schaden, den eine benachbarte eigene Einheit erleiden würde, auf diese Einheit umleiten.',
    'Erbitterung': 'Hat +1 ATK für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.',
    'Heranführung': 'Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).',
    'Stellungswechsel': 'Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.',
    'Zuteilung': 'Ziehe 1 Karte, wenn sie ins Spiel kommt.',
    'Sicherung': 'Andere eigene Einheiten im selben Abschnitt haben +1 DEF, solange diese Einheit offen liegt.',
    'Nachsetzen': 'Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.',
    'Hinterhalt': 'Hat +2 ATK bei ihrem ersten Angriff nach dem Aufdecken.',
    'Zähigkeit': 'Hat +1 DEF für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.'
  };
  /* Umsetzungshinweise der Engine (Detailansicht, klein): */
  var NOTE = {
    'Abschirmung': 'Engine: wird automatisch genutzt, wenn die abschirmende Einheit offen liegt und den Schaden überlebt.',
    'Platztausch': 'Engine: Die Wahl erscheint, sobald du am Zug bist und keine andere Auswahl offen ist.',
    'Sicherung': 'Engine: wird nach jeder Aktion neu berechnet (Einsatz, Verlust, Aufdecken, Verdecken, Versetzen); mehrere Sicherungen addieren sich.',
    'Stellungswechsel': 'Bedienung: Detailansicht der eigenen Einheit → „Stellungswechsel“.'
  };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function list(def) { return (def && Array.isArray(def.keywords) ? def.keywords : []).filter(function (k) { return K[k]; }); }
  function html(def, opts) {
    var ks = list(def); if (!ks.length) return '';
    return '<div class="kw-block">' + ks.map(function (k) {
      return '<p class="kw-line"><b class="kw-word">' + esc(k) + '</b> <span class="kw-reminder">(' + esc(K[k]) + ')</span>' +
        (opts && opts.notes && NOTE[k] ? '<small class="kw-note">' + esc(NOTE[k]) + '</small>' : '') + '</p>';
    }).join('') + '</div>';
  }
  function strip(def) {
    var ks = list(def); if (!ks.length) return '';
    return '<span class="kw-strip" title="' + esc(ks.map(function (k) { return k + ' (' + K[k] + ')'; }).join(' · ')) + '">' + ks.map(function (k) { return '<b>' + esc(k) + '</b>'; }).join(' · ') + '</span>';
  }
  function plain(def) { return list(def).map(function (k) { return k + ' (' + K[k] + ')'; }).join(' '); }
  root.DC_KEYWORDS = K;
  root.DCKw = { list: list, html: html, strip: strip, plain: plain, text: K, notes: NOTE };
})(typeof window !== 'undefined' ? window : globalThis);
