/* Division Command – allgemeine Schlüsselwörter (Vokabular, nicht nationsgebunden).
   Karten tragen sie in def.keywords; die Engine wertet sie strukturiert aus (engine.js: _kw…).
   Darstellung: fettes Wort plus vollständiger Erinnerungstext in Klammern. */
(function (root) {
  'use strict';
  var K = {
    'Gefechtsbereit': 'Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.',
    'Ablösung': 'Wird diese Einheit zerstört, kostet die nächste eigene Einheit, die du auf dasselbe Feld setzt, 1 AP weniger (mindestens 1), bis das Feld wieder besetzt wurde oder bis zum Ende deines nächsten Zugs, was zuerst eintritt. Höchstens eine solche Markierung pro Feld.',
    'Staffelangriff': 'Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.',
    'Fernschuss': 'Hat +1 Reichweite (bei Steilfeuer nur Stufen I–III; IV/V bereits ganze Front).',
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
  /* t203:auto */
  Object.assign(K, {
  "Absetzen": "Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
  "Erstschadenschutz": "Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.",
  "Binden": "(1 AP; verbraucht den Angriff dieser Einheit): Nur in deinem Zug, einmal pro Zug, wenn diese offene Einheit jetzt legal angreifen könnte. Wähle eine offene, nicht eingegrabene gegnerische Fronteinheit im gegenüberliegenden Abschnitt. Bis zum Ende des nächsten Zuges ihres Besitzers darf sie ihr Feld weder durch Versetzen, Tausch, erzwungene Bewegung noch Rücknahme auf die Hand verlassen. Zerstörung oder Opferung bleibt möglich. Sie darf weiter angreifen und Fähigkeiten nutzen. Kein Schaden. Höchstens ein Bindeneinsatz pro Besitzer pro Zug. Nicht stapelbar; eine weitere Bindung desselben Ziels ist bis zum Ablauf unzulässig. Der Status bleibt bis zum Ablauf auch bestehen, wenn der Binder zerstört wird.",
  "Anmarschstörung": "(1 AP; einmal pro eigenem Zug): Nur in deinem Zug. Wähle einen gegnerischen Abschnitt. Solange diese offene Unterstützung liegt, kostet die erste dort neu ins Spiel kommende gegnerische Einheit bis zum Ende des nächsten gegnerischen Zuges 1 AP zusätzlich; danach ist die Markierung verbraucht. Es zählt jede neue Einheit aus Hand oder Ablage, auch durch einen sonst kostenlosen Effekt; gewöhnliche Rabatte und Mindestkosten werden zuerst berechnet, dann +1 AP. Bei unzureichenden AP ist dieser Einsatz dort nicht zulässig; die Markierung wird nicht verbraucht. Bewegung bereits liegender Einheiten, Tausch, Unterstützung, Ausrüstung und Token lösen sie nicht aus. Kein Schaden und kein Angriffsverbot. Höchstens eine eigene Anmarschstörung gleichzeitig, nicht stapelbar. Wird die Quelle verdeckt oder entfernt, endet sie sofort.",
  "Feuerschutz": "(1 AP; verbraucht den Angriff dieser Einheit): Nur in deinem Zug, einmal pro Zug, wenn diese offene Einheit jetzt legal angreifen könnte. Wähle eine andere offene eigene Fronteinheit auf einem benachbarten Feld derselben Reihe und eine offene gegnerische Fronteinheit, die beide jetzt legal angreifen könnten. Beim nächsten Angriff der gewählten eigenen Einheit gegen genau dieses Ziel in diesem Zug verursacht dessen Gegenschlag beziehungsweise Nebel-Erstschlag 2 Schaden weniger, mindestens 0; andere Schadensquellen bleiben unverändert. Der Schutz wird bei Kampfbeginn verbraucht, auch wenn der Angreifer danach an einer Mine stirbt. Er endet vorher, wenn eine der drei Einheiten entfernt oder verdeckt wird, ihr Feld wechselt oder dein Zug endet. Kein eigener Schaden durch die Schutzhandlung. Höchstens ein Feuerschutz gleichzeitig pro Seite; nicht stapelbar.",
  "Gefechtsabbruch": "(Reaktion, 1 AP; einmal pro gegnerischem Zug): Nachdem ein gegnerischer Angriff gegen diese offene Einheit vollständig abgewickelt wurde, einschließlich Gegenschlag und Zerstörungen, darfst du sie, falls sie überlebt hat, auf ein freies unmittelbar benachbartes Feld derselben eigenen Frontreihe versetzen. Kein Sprung über ein Feld. Sie behält Schaden, Ausrüstung, Token und Instanz-ID. Keine Heilung, kein Verdecken, kein neuer Einsatz und kein neues Eingraben. Bis zum Ende deines nächsten Zuges kann sie nicht angreifen, auch nicht durch Zusatzangriff. Ist sie gebunden oder gibt es kein freies legales Nachbarfeld, ist die Reaktion nicht möglich. Abgelehnte Reaktion kostet nichts. Nicht bei Soforteinsatzschaden oder eigenem Angriff; keine Wirkung für eine zerstörte Einheit.",
  "Vorpostenmeldung": "Solange diese Einheit offen liegt, decke in jedem Spielerzug die erste verdeckte gegnerische Fronteinheit auf, die neu in den gegenüberliegenden Abschnitt eingesetzt oder durch gewöhnliches Versetzen dorthin bewegt wird. Erst nach Platzierung und Bezahlung, vor dem nächsten Spielerbefehl; Eingraben-Schutz bleibt unverändert bestehen. Eine bereits offen eintretende Einheit verbraucht die Meldung nicht. Bereits im Abschnitt liegende Einheiten bleiben unverändert. Aufdecken, Verdecken und Platztausch zählen hierfür nicht als Eintritt. Kein Schaden, kein Bewegungsstopp, kein Beobachtet-Marker. Mehrere Vorpostenmeldungen desselben Besitzers im selben Abschnitt teilen sich eine Auslösung pro Spielerzug. Ein zerstörter oder verdeckter Melder löst nicht aus; seine spätere Rückkehr setzt das gemeinsame Auslösungslimit nicht zurück."
});
  /* /t203:auto */
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
