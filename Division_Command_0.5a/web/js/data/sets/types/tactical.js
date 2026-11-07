/* Erzeugt: node scripts/tactics/build.js; additive allgemeine Erprobungskarten. */
window.DC_SET_TYPES = window.DC_SET_TYPES || {};
window.DC_SET_TYPES.Taktikentwuerfe = [
  {
    "id": "dc_tac_haltezug_am_knotenpunkt",
    "set": "set_tactical_review",
    "nation": "neutral",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Haltezug am Knotenpunkt",
    "ap": 3,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Binden (1 AP; verbraucht den Angriff dieser Einheit): Nur in deinem Zug, einmal pro Zug, wenn diese offene Einheit jetzt legal angreifen könnte. Wähle eine offene, nicht eingegrabene gegnerische Fronteinheit im gegenüberliegenden Abschnitt. Bis zum Ende des nächsten Zuges ihres Besitzers darf sie ihr Feld weder durch Versetzen, Tausch, erzwungene Bewegung noch Rücknahme auf die Hand verlassen. Zerstörung oder Opferung bleibt möglich. Sie darf weiter angreifen und Fähigkeiten nutzen. Kein Schaden. Höchstens ein Bindeneinsatz pro Besitzer pro Zug. Nicht stapelbar; eine weitere Bindung desselben Ziels ist bis zum Ablauf unzulässig. Der Status bleibt bis zum Ablauf auch bestehen, wenn der Binder zerstört wird.",
    "rules": [
      "Binden (1 AP; verbraucht den Angriff dieser Einheit): Nur in deinem Zug, einmal pro Zug, wenn diese offene Einheit jetzt legal angreifen könnte. Wähle eine offene, nicht eingegrabene gegnerische Fronteinheit im gegenüberliegenden Abschnitt. Bis zum Ende des nächsten Zuges ihres Besitzers darf sie ihr Feld weder durch Versetzen, Tausch, erzwungene Bewegung noch Rücknahme auf die Hand verlassen. Zerstörung oder Opferung bleibt möglich. Sie darf weiter angreifen und Fähigkeiten nutzen. Kein Schaden. Höchstens ein Bindeneinsatz pro Besitzer pro Zug. Nicht stapelbar; eine weitere Bindung desselben Ziels ist bis zum Ablauf unzulässig. Der Status bleibt bis zum Ablauf auch bestehen, wenn der Binder zerstört wird.",
      "Kein Niederhalten: ATK und Angriff bleiben unverändert. Verhindert Stellungswechsel und beide Hälften von Platztausch, wenn das gebundene Ziel betroffen wäre. Gefechtsabbruch scheitert am Bewegungsverbot. Abschirmung, Sicherung und Fernschuss bleiben aktiv. Verbrauchter Binder-Angriff zählt nicht als Angriff für Staffelangriff/Hinterhalt. Auch ein Zusatzangriff stellt die Binden-Nutzung nicht wieder her.",
      "Ein Spielzug meint einen vollständigen Spielerzug, nicht die Runde beider Spieler. Front bedeutet die neun Einheitenfelder, nicht die Unterstützungsreihe. Abschnitt meint L/C/R mit je drei Frontfeldern. Benachbart für diese Entwürfe: das unmittelbar linke/rechte Feld in derselben visuellen Frontreihe, ohne Überspringen belegter Felder. Markierungen folgen eindeutiger Instanz-ID, nicht dem Kartennamen. Keine Fähigkeit wirkt von der Hand, verdeckt oder aus dem Ablagestapel. Vor Zielwahl werden Zulässigkeit und AP geprüft; ungültige Aufrufe bezahlen nichts. Neue Status erlöschen beim Verlassen des Feldes, sofern unten nicht enger geregelt. Kein Reset von Angriffs-/Bewegungsnutzung durch Aufdecken, Tausch oder Zusatzangriff. Schutz vor gezielten feindlichen Effekten wird bei allen direkten Zielwahlen respektiert; keine neue Ausnahme von Eingraben."
    ],
    "keywords": [
      "Binden"
    ],
    "effects": [
      {
        "code": "TACTICAL_BIND",
        "param": {}
      }
    ],
    "flavor": "Taktischer Erprobungsentwurf – Werte für den ersten Balancing-Durchlauf.",
    "image": "",
    "art_status": "platzhalter",
    "max_copies": 4,
    "collector": "TAC01",
    "rarity": "bronze",
    "design_reference": "S1: B-35–B-36, S. B-8"
  },
  {
    "id": "dc_tac_schwerer_bindungskeil",
    "set": "set_tactical_review",
    "nation": "neutral",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Schwerer Bindungskeil",
    "ap": 5,
    "atk": 4,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "gepanzert"
    ],
    "text": "Binden (1 AP; verbraucht den Angriff dieser Einheit): Nur in deinem Zug, einmal pro Zug, wenn diese offene Einheit jetzt legal angreifen könnte. Wähle eine offene, nicht eingegrabene gegnerische Fronteinheit im gegenüberliegenden Abschnitt. Bis zum Ende des nächsten Zuges ihres Besitzers darf sie ihr Feld weder durch Versetzen, Tausch, erzwungene Bewegung noch Rücknahme auf die Hand verlassen. Zerstörung oder Opferung bleibt möglich. Sie darf weiter angreifen und Fähigkeiten nutzen. Kein Schaden. Höchstens ein Bindeneinsatz pro Besitzer pro Zug. Nicht stapelbar; eine weitere Bindung desselben Ziels ist bis zum Ablauf unzulässig. Der Status bleibt bis zum Ablauf auch bestehen, wenn der Binder zerstört wird.",
    "rules": [
      "Binden (1 AP; verbraucht den Angriff dieser Einheit): Nur in deinem Zug, einmal pro Zug, wenn diese offene Einheit jetzt legal angreifen könnte. Wähle eine offene, nicht eingegrabene gegnerische Fronteinheit im gegenüberliegenden Abschnitt. Bis zum Ende des nächsten Zuges ihres Besitzers darf sie ihr Feld weder durch Versetzen, Tausch, erzwungene Bewegung noch Rücknahme auf die Hand verlassen. Zerstörung oder Opferung bleibt möglich. Sie darf weiter angreifen und Fähigkeiten nutzen. Kein Schaden. Höchstens ein Bindeneinsatz pro Besitzer pro Zug. Nicht stapelbar; eine weitere Bindung desselben Ziels ist bis zum Ablauf unzulässig. Der Status bleibt bis zum Ablauf auch bestehen, wenn der Binder zerstört wird.",
      "Kein Niederhalten: ATK und Angriff bleiben unverändert. Verhindert Stellungswechsel und beide Hälften von Platztausch, wenn das gebundene Ziel betroffen wäre. Gefechtsabbruch scheitert am Bewegungsverbot. Abschirmung, Sicherung und Fernschuss bleiben aktiv. Verbrauchter Binder-Angriff zählt nicht als Angriff für Staffelangriff/Hinterhalt. Auch ein Zusatzangriff stellt die Binden-Nutzung nicht wieder her.",
      "Ein Spielzug meint einen vollständigen Spielerzug, nicht die Runde beider Spieler. Front bedeutet die neun Einheitenfelder, nicht die Unterstützungsreihe. Abschnitt meint L/C/R mit je drei Frontfeldern. Benachbart für diese Entwürfe: das unmittelbar linke/rechte Feld in derselben visuellen Frontreihe, ohne Überspringen belegter Felder. Markierungen folgen eindeutiger Instanz-ID, nicht dem Kartennamen. Keine Fähigkeit wirkt von der Hand, verdeckt oder aus dem Ablagestapel. Vor Zielwahl werden Zulässigkeit und AP geprüft; ungültige Aufrufe bezahlen nichts. Neue Status erlöschen beim Verlassen des Feldes, sofern unten nicht enger geregelt. Kein Reset von Angriffs-/Bewegungsnutzung durch Aufdecken, Tausch oder Zusatzangriff. Schutz vor gezielten feindlichen Effekten wird bei allen direkten Zielwahlen respektiert; keine neue Ausnahme von Eingraben."
    ],
    "keywords": [
      "Binden"
    ],
    "effects": [
      {
        "code": "TACTICAL_BIND",
        "param": {}
      }
    ],
    "flavor": "Taktischer Erprobungsentwurf – Werte für den ersten Balancing-Durchlauf.",
    "image": "",
    "art_status": "platzhalter",
    "max_copies": 2,
    "collector": "TAC02",
    "rarity": "silver",
    "design_reference": "S1: B-35–B-36, S. B-8"
  },
  {
    "id": "dc_tac_anmarschbeobachtung",
    "set": "set_tactical_review",
    "nation": "neutral",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Anmarschbeobachtung",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Anmarschstörung (1 AP; einmal pro eigenem Zug): Nur in deinem Zug. Wähle einen gegnerischen Abschnitt. Solange diese offene Unterstützung liegt, kostet die erste dort neu ins Spiel kommende gegnerische Einheit bis zum Ende des nächsten gegnerischen Zuges 1 AP zusätzlich; danach ist die Markierung verbraucht. Es zählt jede neue Einheit aus Hand oder Ablage, auch durch einen sonst kostenlosen Effekt; gewöhnliche Rabatte und Mindestkosten werden zuerst berechnet, dann +1 AP. Bei unzureichenden AP ist dieser Einsatz dort nicht zulässig; die Markierung wird nicht verbraucht. Bewegung bereits liegender Einheiten, Tausch, Unterstützung, Ausrüstung und Token lösen sie nicht aus. Kein Schaden und kein Angriffsverbot. Höchstens eine eigene Anmarschstörung gleichzeitig, nicht stapelbar. Wird die Quelle verdeckt oder entfernt, endet sie sofort.",
    "rules": [
      "Anmarschstörung (1 AP; einmal pro eigenem Zug): Nur in deinem Zug. Wähle einen gegnerischen Abschnitt. Solange diese offene Unterstützung liegt, kostet die erste dort neu ins Spiel kommende gegnerische Einheit bis zum Ende des nächsten gegnerischen Zuges 1 AP zusätzlich; danach ist die Markierung verbraucht. Es zählt jede neue Einheit aus Hand oder Ablage, auch durch einen sonst kostenlosen Effekt; gewöhnliche Rabatte und Mindestkosten werden zuerst berechnet, dann +1 AP. Bei unzureichenden AP ist dieser Einsatz dort nicht zulässig; die Markierung wird nicht verbraucht. Bewegung bereits liegender Einheiten, Tausch, Unterstützung, Ausrüstung und Token lösen sie nicht aus. Kein Schaden und kein Angriffsverbot. Höchstens eine eigene Anmarschstörung gleichzeitig, nicht stapelbar. Wird die Quelle verdeckt oder entfernt, endet sie sofort.",
      "Keine Flächenschadenszone, kein Schaden an Einrückenden. Anders als Binden kann der Gegner alle vorhandenen Einheiten verlegen. Anders als Sperren bleibt der Einsatz bei Zahlung möglich. Eingraben verhindert nicht den Einsatzaufschlag, da keine bereits liegende Einheit angezielt wird. Heranführung/Ablösung zuerst verrechnen; der Aufschlag kommt danach. Markierung endet nach einem erfolgreichen Einsatz, nicht nach fehlgeschlagener Zielwahl.",
      "Ein Spielzug meint einen vollständigen Spielerzug, nicht die Runde beider Spieler. Front bedeutet die neun Einheitenfelder, nicht die Unterstützungsreihe. Abschnitt meint L/C/R mit je drei Frontfeldern. Benachbart für diese Entwürfe: das unmittelbar linke/rechte Feld in derselben visuellen Frontreihe, ohne Überspringen belegter Felder. Markierungen folgen eindeutiger Instanz-ID, nicht dem Kartennamen. Keine Fähigkeit wirkt von der Hand, verdeckt oder aus dem Ablagestapel. Vor Zielwahl werden Zulässigkeit und AP geprüft; ungültige Aufrufe bezahlen nichts. Neue Status erlöschen beim Verlassen des Feldes, sofern unten nicht enger geregelt. Kein Reset von Angriffs-/Bewegungsnutzung durch Aufdecken, Tausch oder Zusatzangriff. Schutz vor gezielten feindlichen Effekten wird bei allen direkten Zielwahlen respektiert; keine neue Ausnahme von Eingraben."
    ],
    "keywords": [
      "Anmarschstörung"
    ],
    "effects": [
      {
        "code": "TACTICAL_INTERDICT",
        "param": {}
      }
    ],
    "flavor": "Taktischer Erprobungsentwurf – Werte für den ersten Balancing-Durchlauf.",
    "image": "",
    "art_status": "platzhalter",
    "max_copies": 4,
    "collector": "TAC03",
    "rarity": "bronze",
    "design_reference": "S1: B-46–B-47, S. B-9"
  },
  {
    "id": "dc_tac_taktische_verkehrsleitstelle",
    "set": "set_tactical_review",
    "nation": "neutral",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Taktische Verkehrsleitstelle",
    "ap": 4,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung offen liegt. Anmarschstörung (1 AP; einmal pro eigenem Zug): Nur in deinem Zug. Wähle einen gegnerischen Abschnitt. Solange diese offene Unterstützung liegt, kostet die erste dort neu ins Spiel kommende gegnerische Einheit bis zum Ende des nächsten gegnerischen Zuges 1 AP zusätzlich; danach ist die Markierung verbraucht. Es zählt jede neue Einheit aus Hand oder Ablage, auch durch einen sonst kostenlosen Effekt; gewöhnliche Rabatte und Mindestkosten werden zuerst berechnet, dann +1 AP. Bei unzureichenden AP ist dieser Einsatz dort nicht zulässig; die Markierung wird nicht verbraucht. Bewegung bereits liegender Einheiten, Tausch, Unterstützung, Ausrüstung und Token lösen sie nicht aus. Kein Schaden und kein Angriffsverbot. Höchstens eine eigene Anmarschstörung gleichzeitig, nicht stapelbar. Wird die Quelle verdeckt oder entfernt, endet sie sofort.",
    "rules": [
      "Anmarschstörung (1 AP; einmal pro eigenem Zug): Nur in deinem Zug. Wähle einen gegnerischen Abschnitt. Solange diese offene Unterstützung liegt, kostet die erste dort neu ins Spiel kommende gegnerische Einheit bis zum Ende des nächsten gegnerischen Zuges 1 AP zusätzlich; danach ist die Markierung verbraucht. Es zählt jede neue Einheit aus Hand oder Ablage, auch durch einen sonst kostenlosen Effekt; gewöhnliche Rabatte und Mindestkosten werden zuerst berechnet, dann +1 AP. Bei unzureichenden AP ist dieser Einsatz dort nicht zulässig; die Markierung wird nicht verbraucht. Bewegung bereits liegender Einheiten, Tausch, Unterstützung, Ausrüstung und Token lösen sie nicht aus. Kein Schaden und kein Angriffsverbot. Höchstens eine eigene Anmarschstörung gleichzeitig, nicht stapelbar. Wird die Quelle verdeckt oder entfernt, endet sie sofort.",
      "Keine Flächenschadenszone, kein Schaden an Einrückenden. Anders als Binden kann der Gegner alle vorhandenen Einheiten verlegen. Anders als Sperren bleibt der Einsatz bei Zahlung möglich. Eingraben verhindert nicht den Einsatzaufschlag, da keine bereits liegende Einheit angezielt wird. Heranführung/Ablösung zuerst verrechnen; der Aufschlag kommt danach. Markierung endet nach einem erfolgreichen Einsatz, nicht nach fehlgeschlagener Zielwahl.",
      "Ein Spielzug meint einen vollständigen Spielerzug, nicht die Runde beider Spieler. Front bedeutet die neun Einheitenfelder, nicht die Unterstützungsreihe. Abschnitt meint L/C/R mit je drei Frontfeldern. Benachbart für diese Entwürfe: das unmittelbar linke/rechte Feld in derselben visuellen Frontreihe, ohne Überspringen belegter Felder. Markierungen folgen eindeutiger Instanz-ID, nicht dem Kartennamen. Keine Fähigkeit wirkt von der Hand, verdeckt oder aus dem Ablagestapel. Vor Zielwahl werden Zulässigkeit und AP geprüft; ungültige Aufrufe bezahlen nichts. Neue Status erlöschen beim Verlassen des Feldes, sofern unten nicht enger geregelt. Kein Reset von Angriffs-/Bewegungsnutzung durch Aufdecken, Tausch oder Zusatzangriff. Schutz vor gezielten feindlichen Effekten wird bei allen direkten Zielwahlen respektiert; keine neue Ausnahme von Eingraben."
    ],
    "keywords": [
      "Anmarschstörung"
    ],
    "effects": [
      {
        "code": "TACTICAL_INTERDICT",
        "param": {}
      },
      {
        "code": "TURN_AP",
        "param": {
          "ap": 1,
          "openOnly": true
        }
      }
    ],
    "flavor": "Taktischer Erprobungsentwurf – Werte für den ersten Balancing-Durchlauf.",
    "image": "",
    "art_status": "platzhalter",
    "max_copies": 2,
    "collector": "TAC04",
    "rarity": "silver",
    "design_reference": "S1: B-46–B-47, S. B-9"
  },
  {
    "id": "dc_tac_unterstutzungsgruppe_am_flugel",
    "set": "set_tactical_review",
    "nation": "neutral",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Unterstützungsgruppe am Flügel",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Feuerschutz 2 (1 AP; verbraucht den Angriff dieser Einheit): Nur in deinem Zug, einmal pro Zug, wenn diese offene Einheit jetzt legal angreifen könnte. Wähle eine andere offene eigene Fronteinheit auf einem benachbarten Feld derselben Reihe und eine offene gegnerische Fronteinheit, die beide jetzt legal angreifen könnten. Beim nächsten Angriff der gewählten eigenen Einheit gegen genau dieses Ziel in diesem Zug verursacht dessen Gegenschlag beziehungsweise Nebel-Erstschlag 2 Schaden weniger, mindestens 0; andere Schadensquellen bleiben unverändert. Der Schutz wird bei Kampfbeginn verbraucht, auch wenn der Angreifer danach an einer Mine stirbt. Er endet vorher, wenn eine der drei Einheiten entfernt oder verdeckt wird, ihr Feld wechselt oder dein Zug endet. Kein eigener Schaden durch die Schutzhandlung. Höchstens ein Feuerschutz gleichzeitig pro Seite; nicht stapelbar.",
    "rules": [
      "Feuerschutz 2 (1 AP; verbraucht den Angriff dieser Einheit): Nur in deinem Zug, einmal pro Zug, wenn diese offene Einheit jetzt legal angreifen könnte. Wähle eine andere offene eigene Fronteinheit auf einem benachbarten Feld derselben Reihe und eine offene gegnerische Fronteinheit, die beide jetzt legal angreifen könnten. Beim nächsten Angriff der gewählten eigenen Einheit gegen genau dieses Ziel in diesem Zug verursacht dessen Gegenschlag beziehungsweise Nebel-Erstschlag 2 Schaden weniger, mindestens 0; andere Schadensquellen bleiben unverändert. Der Schutz wird bei Kampfbeginn verbraucht, auch wenn der Angreifer danach an einer Mine stirbt. Er endet vorher, wenn eine der drei Einheiten entfernt oder verdeckt wird, ihr Feld wechselt oder dein Zug endet. Kein eigener Schaden durch die Schutzhandlung. Höchstens ein Feuerschutz gleichzeitig pro Seite; nicht stapelbar.",
      "Nicht Staffelangriff: kein ATK-Bonus und die Schutzhandlung ist kein Angriff. Nicht Abschirmung: niemand übernimmt Schaden. Reduktion erfolgt am berechneten Gegenschlag vor allgemeinen Schadensreduktionen; bei Kampfmodus ohne Gegenschlag nutzlos, im simultanen Modus dennoch wirksam. Kein Umgehen von Eingraben. Fernschuss erweitert nur die normale Zielzulässigkeit. Hinterhalt bleibt bis zu echtem Angriff ungenutzt.",
      "Ein Spielzug meint einen vollständigen Spielerzug, nicht die Runde beider Spieler. Front bedeutet die neun Einheitenfelder, nicht die Unterstützungsreihe. Abschnitt meint L/C/R mit je drei Frontfeldern. Benachbart für diese Entwürfe: das unmittelbar linke/rechte Feld in derselben visuellen Frontreihe, ohne Überspringen belegter Felder. Markierungen folgen eindeutiger Instanz-ID, nicht dem Kartennamen. Keine Fähigkeit wirkt von der Hand, verdeckt oder aus dem Ablagestapel. Vor Zielwahl werden Zulässigkeit und AP geprüft; ungültige Aufrufe bezahlen nichts. Neue Status erlöschen beim Verlassen des Feldes, sofern unten nicht enger geregelt. Kein Reset von Angriffs-/Bewegungsnutzung durch Aufdecken, Tausch oder Zusatzangriff. Schutz vor gezielten feindlichen Effekten wird bei allen direkten Zielwahlen respektiert; keine neue Ausnahme von Eingraben."
    ],
    "keywords": [
      "Feuerschutz"
    ],
    "effects": [
      {
        "code": "TACTICAL_COVER",
        "param": {
          "amount": 2
        }
      }
    ],
    "flavor": "Taktischer Erprobungsentwurf – Werte für den ersten Balancing-Durchlauf.",
    "image": "",
    "art_status": "platzhalter",
    "max_copies": 4,
    "collector": "TAC05",
    "rarity": "bronze",
    "design_reference": "S1: B-58–B-61, S. B-12; ergänzend S2: 1-21, S. 1-3–1-4"
  },
  {
    "id": "dc_tac_bewegliche_feuerbasis",
    "set": "set_tactical_review",
    "nation": "neutral",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Fahrzeug",
    "name": "Bewegliche Feuerbasis",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "fahrzeug",
      "gepanzert"
    ],
    "text": "Feuerschutz 2 (1 AP; verbraucht den Angriff dieser Einheit): Nur in deinem Zug, einmal pro Zug, wenn diese offene Einheit jetzt legal angreifen könnte. Wähle eine andere offene eigene Fronteinheit auf einem benachbarten Feld derselben Reihe und eine offene gegnerische Fronteinheit, die beide jetzt legal angreifen könnten. Beim nächsten Angriff der gewählten eigenen Einheit gegen genau dieses Ziel in diesem Zug verursacht dessen Gegenschlag beziehungsweise Nebel-Erstschlag 2 Schaden weniger, mindestens 0; andere Schadensquellen bleiben unverändert. Der Schutz wird bei Kampfbeginn verbraucht, auch wenn der Angreifer danach an einer Mine stirbt. Er endet vorher, wenn eine der drei Einheiten entfernt oder verdeckt wird, ihr Feld wechselt oder dein Zug endet. Kein eigener Schaden durch die Schutzhandlung. Höchstens ein Feuerschutz gleichzeitig pro Seite; nicht stapelbar.",
    "rules": [
      "Feuerschutz 2 (1 AP; verbraucht den Angriff dieser Einheit): Nur in deinem Zug, einmal pro Zug, wenn diese offene Einheit jetzt legal angreifen könnte. Wähle eine andere offene eigene Fronteinheit auf einem benachbarten Feld derselben Reihe und eine offene gegnerische Fronteinheit, die beide jetzt legal angreifen könnten. Beim nächsten Angriff der gewählten eigenen Einheit gegen genau dieses Ziel in diesem Zug verursacht dessen Gegenschlag beziehungsweise Nebel-Erstschlag 2 Schaden weniger, mindestens 0; andere Schadensquellen bleiben unverändert. Der Schutz wird bei Kampfbeginn verbraucht, auch wenn der Angreifer danach an einer Mine stirbt. Er endet vorher, wenn eine der drei Einheiten entfernt oder verdeckt wird, ihr Feld wechselt oder dein Zug endet. Kein eigener Schaden durch die Schutzhandlung. Höchstens ein Feuerschutz gleichzeitig pro Seite; nicht stapelbar.",
      "Nicht Staffelangriff: kein ATK-Bonus und die Schutzhandlung ist kein Angriff. Nicht Abschirmung: niemand übernimmt Schaden. Reduktion erfolgt am berechneten Gegenschlag vor allgemeinen Schadensreduktionen; bei Kampfmodus ohne Gegenschlag nutzlos, im simultanen Modus dennoch wirksam. Kein Umgehen von Eingraben. Fernschuss erweitert nur die normale Zielzulässigkeit. Hinterhalt bleibt bis zu echtem Angriff ungenutzt.",
      "Ein Spielzug meint einen vollständigen Spielerzug, nicht die Runde beider Spieler. Front bedeutet die neun Einheitenfelder, nicht die Unterstützungsreihe. Abschnitt meint L/C/R mit je drei Frontfeldern. Benachbart für diese Entwürfe: das unmittelbar linke/rechte Feld in derselben visuellen Frontreihe, ohne Überspringen belegter Felder. Markierungen folgen eindeutiger Instanz-ID, nicht dem Kartennamen. Keine Fähigkeit wirkt von der Hand, verdeckt oder aus dem Ablagestapel. Vor Zielwahl werden Zulässigkeit und AP geprüft; ungültige Aufrufe bezahlen nichts. Neue Status erlöschen beim Verlassen des Feldes, sofern unten nicht enger geregelt. Kein Reset von Angriffs-/Bewegungsnutzung durch Aufdecken, Tausch oder Zusatzangriff. Schutz vor gezielten feindlichen Effekten wird bei allen direkten Zielwahlen respektiert; keine neue Ausnahme von Eingraben."
    ],
    "keywords": [
      "Feuerschutz"
    ],
    "effects": [
      {
        "code": "TACTICAL_COVER",
        "param": {
          "amount": 2
        }
      }
    ],
    "flavor": "Taktischer Erprobungsentwurf – Werte für den ersten Balancing-Durchlauf.",
    "image": "",
    "art_status": "platzhalter",
    "max_copies": 2,
    "collector": "TAC06",
    "rarity": "silver",
    "design_reference": "S1: B-58–B-61, S. B-12; ergänzend S2: 1-21, S. 1-3–1-4"
  },
  {
    "id": "dc_tac_nachhutkompanie",
    "set": "set_tactical_review",
    "nation": "neutral",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Nachhutkompanie",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Gefechtsabbruch (Reaktion, 1 AP; einmal pro gegnerischem Zug): Nachdem ein gegnerischer Angriff gegen diese offene Einheit vollständig abgewickelt wurde, einschließlich Gegenschlag und Zerstörungen, darfst du sie, falls sie überlebt hat, auf ein freies unmittelbar benachbartes Feld derselben eigenen Frontreihe versetzen. Kein Sprung über ein Feld. Sie behält Schaden, Ausrüstung, Token und Instanz-ID. Keine Heilung, kein Verdecken, kein neuer Einsatz und kein neues Eingraben. Bis zum Ende deines nächsten Zuges kann sie nicht angreifen, auch nicht durch Zusatzangriff. Ist sie gebunden oder gibt es kein freies legales Nachbarfeld, ist die Reaktion nicht möglich. Abgelehnte Reaktion kostet nichts. Nicht bei Soforteinsatzschaden oder eigenem Angriff; keine Wirkung für eine zerstörte Einheit.",
    "rules": [
      "Gefechtsabbruch (Reaktion, 1 AP; einmal pro gegnerischem Zug): Nachdem ein gegnerischer Angriff gegen diese offene Einheit vollständig abgewickelt wurde, einschließlich Gegenschlag und Zerstörungen, darfst du sie, falls sie überlebt hat, auf ein freies unmittelbar benachbartes Feld derselben eigenen Frontreihe versetzen. Kein Sprung über ein Feld. Sie behält Schaden, Ausrüstung, Token und Instanz-ID. Keine Heilung, kein Verdecken, kein neuer Einsatz und kein neues Eingraben. Bis zum Ende deines nächsten Zuges kann sie nicht angreifen, auch nicht durch Zusatzangriff. Ist sie gebunden oder gibt es kein freies legales Nachbarfeld, ist die Reaktion nicht möglich. Abgelehnte Reaktion kostet nichts. Nicht bei Soforteinsatzschaden oder eigenem Angriff; keine Wirkung für eine zerstörte Einheit.",
      "Anders als Stellungswechsel während des Gegenzuges und nach abgeschlossenem Kampf; Tempoverlust reicht bis Ende nächsten eigenen Zuges. Löst weder Zuteilung/Heranführung noch Ablösung aus; keine Zerstörung. Binden verhindert es. Platztausch und Absetzen sind keine Ersatzreaktionen. Abschirmung kann zuvor Schaden übernehmen, verleiht aber dem Abschirmer keinen eigenen Abbruchtrigger, da er nicht angegriffen wurde.",
      "Ein Spielzug meint einen vollständigen Spielerzug, nicht die Runde beider Spieler. Front bedeutet die neun Einheitenfelder, nicht die Unterstützungsreihe. Abschnitt meint L/C/R mit je drei Frontfeldern. Benachbart für diese Entwürfe: das unmittelbar linke/rechte Feld in derselben visuellen Frontreihe, ohne Überspringen belegter Felder. Markierungen folgen eindeutiger Instanz-ID, nicht dem Kartennamen. Keine Fähigkeit wirkt von der Hand, verdeckt oder aus dem Ablagestapel. Vor Zielwahl werden Zulässigkeit und AP geprüft; ungültige Aufrufe bezahlen nichts. Neue Status erlöschen beim Verlassen des Feldes, sofern unten nicht enger geregelt. Kein Reset von Angriffs-/Bewegungsnutzung durch Aufdecken, Tausch oder Zusatzangriff. Schutz vor gezielten feindlichen Effekten wird bei allen direkten Zielwahlen respektiert; keine neue Ausnahme von Eingraben."
    ],
    "keywords": [
      "Gefechtsabbruch"
    ],
    "effects": [
      {
        "code": "TACTICAL_BREAK",
        "param": {}
      }
    ],
    "flavor": "Taktischer Erprobungsentwurf – Werte für den ersten Balancing-Durchlauf.",
    "image": "",
    "art_status": "platzhalter",
    "max_copies": 4,
    "collector": "TAC07",
    "rarity": "bronze",
    "design_reference": "S1: B-24, S. B-6; S2: 4-19–4-20, S. 4-3–4-4; S3: Taktische Handlungen in der Verzögerung"
  },
  {
    "id": "dc_tac_ausweichender_spahwagen",
    "set": "set_tactical_review",
    "nation": "neutral",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Ausweichender Spähwagen",
    "ap": 2,
    "atk": 1,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "fahrzeug",
      "aufklaerung"
    ],
    "text": "Gefechtsabbruch (Reaktion, 1 AP; einmal pro gegnerischem Zug): Nachdem ein gegnerischer Angriff gegen diese offene Einheit vollständig abgewickelt wurde, einschließlich Gegenschlag und Zerstörungen, darfst du sie, falls sie überlebt hat, auf ein freies unmittelbar benachbartes Feld derselben eigenen Frontreihe versetzen. Kein Sprung über ein Feld. Sie behält Schaden, Ausrüstung, Token und Instanz-ID. Keine Heilung, kein Verdecken, kein neuer Einsatz und kein neues Eingraben. Bis zum Ende deines nächsten Zuges kann sie nicht angreifen, auch nicht durch Zusatzangriff. Ist sie gebunden oder gibt es kein freies legales Nachbarfeld, ist die Reaktion nicht möglich. Abgelehnte Reaktion kostet nichts. Nicht bei Soforteinsatzschaden oder eigenem Angriff; keine Wirkung für eine zerstörte Einheit.",
    "rules": [
      "Gefechtsabbruch (Reaktion, 1 AP; einmal pro gegnerischem Zug): Nachdem ein gegnerischer Angriff gegen diese offene Einheit vollständig abgewickelt wurde, einschließlich Gegenschlag und Zerstörungen, darfst du sie, falls sie überlebt hat, auf ein freies unmittelbar benachbartes Feld derselben eigenen Frontreihe versetzen. Kein Sprung über ein Feld. Sie behält Schaden, Ausrüstung, Token und Instanz-ID. Keine Heilung, kein Verdecken, kein neuer Einsatz und kein neues Eingraben. Bis zum Ende deines nächsten Zuges kann sie nicht angreifen, auch nicht durch Zusatzangriff. Ist sie gebunden oder gibt es kein freies legales Nachbarfeld, ist die Reaktion nicht möglich. Abgelehnte Reaktion kostet nichts. Nicht bei Soforteinsatzschaden oder eigenem Angriff; keine Wirkung für eine zerstörte Einheit.",
      "Anders als Stellungswechsel während des Gegenzuges und nach abgeschlossenem Kampf; Tempoverlust reicht bis Ende nächsten eigenen Zuges. Löst weder Zuteilung/Heranführung noch Ablösung aus; keine Zerstörung. Binden verhindert es. Platztausch und Absetzen sind keine Ersatzreaktionen. Abschirmung kann zuvor Schaden übernehmen, verleiht aber dem Abschirmer keinen eigenen Abbruchtrigger, da er nicht angegriffen wurde.",
      "Ein Spielzug meint einen vollständigen Spielerzug, nicht die Runde beider Spieler. Front bedeutet die neun Einheitenfelder, nicht die Unterstützungsreihe. Abschnitt meint L/C/R mit je drei Frontfeldern. Benachbart für diese Entwürfe: das unmittelbar linke/rechte Feld in derselben visuellen Frontreihe, ohne Überspringen belegter Felder. Markierungen folgen eindeutiger Instanz-ID, nicht dem Kartennamen. Keine Fähigkeit wirkt von der Hand, verdeckt oder aus dem Ablagestapel. Vor Zielwahl werden Zulässigkeit und AP geprüft; ungültige Aufrufe bezahlen nichts. Neue Status erlöschen beim Verlassen des Feldes, sofern unten nicht enger geregelt. Kein Reset von Angriffs-/Bewegungsnutzung durch Aufdecken, Tausch oder Zusatzangriff. Schutz vor gezielten feindlichen Effekten wird bei allen direkten Zielwahlen respektiert; keine neue Ausnahme von Eingraben."
    ],
    "keywords": [
      "Gefechtsabbruch"
    ],
    "effects": [
      {
        "code": "TACTICAL_BREAK",
        "param": {}
      }
    ],
    "flavor": "Taktischer Erprobungsentwurf – Werte für den ersten Balancing-Durchlauf.",
    "image": "",
    "art_status": "platzhalter",
    "max_copies": 2,
    "collector": "TAC08",
    "rarity": "silver",
    "design_reference": "S1: B-24, S. B-6; S2: 4-19–4-20, S. 4-3–4-4; S3: Taktische Handlungen in der Verzögerung"
  },
  {
    "id": "dc_tac_vorgeschobener_meldetrupp",
    "set": "set_tactical_review",
    "nation": "neutral",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Vorgeschobener Meldetrupp",
    "ap": 2,
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "aufklaerung"
    ],
    "text": "Vorpostenmeldung: Solange diese Einheit offen liegt, decke in jedem Spielerzug die erste verdeckte gegnerische Fronteinheit auf, die neu in den gegenüberliegenden Abschnitt eingesetzt oder durch gewöhnliches Versetzen dorthin bewegt wird. Erst nach Platzierung und Bezahlung, vor dem nächsten Spielerbefehl; Eingraben-Schutz bleibt unverändert bestehen. Eine bereits offen eintretende Einheit verbraucht die Meldung nicht. Bereits im Abschnitt liegende Einheiten bleiben unverändert. Aufdecken, Verdecken und Platztausch zählen hierfür nicht als Eintritt. Kein Schaden, kein Bewegungsstopp, kein Beobachtet-Marker. Mehrere Vorpostenmeldungen desselben Besitzers im selben Abschnitt teilen sich eine Auslösung pro Spielerzug. Ein zerstörter oder verdeckter Melder löst nicht aus; seine spätere Rückkehr setzt das gemeinsame Auslösungslimit nicht zurück.",
    "rules": [
      "Vorpostenmeldung: Solange diese Einheit offen liegt, decke in jedem Spielerzug die erste verdeckte gegnerische Fronteinheit auf, die neu in den gegenüberliegenden Abschnitt eingesetzt oder durch gewöhnliches Versetzen dorthin bewegt wird. Erst nach Platzierung und Bezahlung, vor dem nächsten Spielerbefehl; Eingraben-Schutz bleibt unverändert bestehen. Eine bereits offen eintretende Einheit verbraucht die Meldung nicht. Bereits im Abschnitt liegende Einheiten bleiben unverändert. Aufdecken, Verdecken und Platztausch zählen hierfür nicht als Eintritt. Kein Schaden, kein Bewegungsstopp, kein Beobachtet-Marker. Mehrere Vorpostenmeldungen desselben Besitzers im selben Abschnitt teilen sich eine Auslösung pro Spielerzug. Ein zerstörter oder verdeckter Melder löst nicht aus; seine spätere Rückkehr setzt das gemeinsame Auslösungslimit nicht zurück.",
      "Nicht Sicherung und nicht Abschirmung: keinerlei DEF oder Schadensumleitung. Nicht Beobachtet: kein dauerhaftes Zielkennzeichen. Aufdeckung darf bestehende Platztausch-Wahl auslösen, aber der Tausch triggert die Meldung nicht erneut. Hinterhalt eines aufgedeckten Gegners kann dadurch vorbereitet werden – bewusste Gegenwirkung. NO_FACE_DOWN ist deutlich stärker; mit ihm oft redundant.",
      "Ein Spielzug meint einen vollständigen Spielerzug, nicht die Runde beider Spieler. Front bedeutet die neun Einheitenfelder, nicht die Unterstützungsreihe. Abschnitt meint L/C/R mit je drei Frontfeldern. Benachbart für diese Entwürfe: das unmittelbar linke/rechte Feld in derselben visuellen Frontreihe, ohne Überspringen belegter Felder. Markierungen folgen eindeutiger Instanz-ID, nicht dem Kartennamen. Keine Fähigkeit wirkt von der Hand, verdeckt oder aus dem Ablagestapel. Vor Zielwahl werden Zulässigkeit und AP geprüft; ungültige Aufrufe bezahlen nichts. Neue Status erlöschen beim Verlassen des Feldes, sofern unten nicht enger geregelt. Kein Reset von Angriffs-/Bewegungsnutzung durch Aufdecken, Tausch oder Zusatzangriff. Schutz vor gezielten feindlichen Effekten wird bei allen direkten Zielwahlen respektiert; keine neue Ausnahme von Eingraben."
    ],
    "keywords": [
      "Vorpostenmeldung"
    ],
    "effects": [
      {
        "code": "TACTICAL_SCREEN",
        "param": {}
      }
    ],
    "flavor": "Taktischer Erprobungsentwurf – Werte für den ersten Balancing-Durchlauf.",
    "image": "",
    "art_status": "platzhalter",
    "max_copies": 4,
    "collector": "TAC09",
    "rarity": "bronze",
    "design_reference": "S1: 13-56–13-59, S. 13-13, Abgrenzung cover in 13-99–13-102, S. 13-24"
  },
  {
    "id": "dc_tac_beobachtungswagen_am_rand",
    "set": "set_tactical_review",
    "nation": "neutral",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Beobachtungswagen am Rand",
    "ap": 3,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "fahrzeug",
      "aufklaerung"
    ],
    "text": "Vorpostenmeldung: Solange diese Einheit offen liegt, decke in jedem Spielerzug die erste verdeckte gegnerische Fronteinheit auf, die neu in den gegenüberliegenden Abschnitt eingesetzt oder durch gewöhnliches Versetzen dorthin bewegt wird. Erst nach Platzierung und Bezahlung, vor dem nächsten Spielerbefehl; Eingraben-Schutz bleibt unverändert bestehen. Eine bereits offen eintretende Einheit verbraucht die Meldung nicht. Bereits im Abschnitt liegende Einheiten bleiben unverändert. Aufdecken, Verdecken und Platztausch zählen hierfür nicht als Eintritt. Kein Schaden, kein Bewegungsstopp, kein Beobachtet-Marker. Mehrere Vorpostenmeldungen desselben Besitzers im selben Abschnitt teilen sich eine Auslösung pro Spielerzug. Ein zerstörter oder verdeckter Melder löst nicht aus; seine spätere Rückkehr setzt das gemeinsame Auslösungslimit nicht zurück.",
    "rules": [
      "Vorpostenmeldung: Solange diese Einheit offen liegt, decke in jedem Spielerzug die erste verdeckte gegnerische Fronteinheit auf, die neu in den gegenüberliegenden Abschnitt eingesetzt oder durch gewöhnliches Versetzen dorthin bewegt wird. Erst nach Platzierung und Bezahlung, vor dem nächsten Spielerbefehl; Eingraben-Schutz bleibt unverändert bestehen. Eine bereits offen eintretende Einheit verbraucht die Meldung nicht. Bereits im Abschnitt liegende Einheiten bleiben unverändert. Aufdecken, Verdecken und Platztausch zählen hierfür nicht als Eintritt. Kein Schaden, kein Bewegungsstopp, kein Beobachtet-Marker. Mehrere Vorpostenmeldungen desselben Besitzers im selben Abschnitt teilen sich eine Auslösung pro Spielerzug. Ein zerstörter oder verdeckter Melder löst nicht aus; seine spätere Rückkehr setzt das gemeinsame Auslösungslimit nicht zurück.",
      "Nicht Sicherung und nicht Abschirmung: keinerlei DEF oder Schadensumleitung. Nicht Beobachtet: kein dauerhaftes Zielkennzeichen. Aufdeckung darf bestehende Platztausch-Wahl auslösen, aber der Tausch triggert die Meldung nicht erneut. Hinterhalt eines aufgedeckten Gegners kann dadurch vorbereitet werden – bewusste Gegenwirkung. NO_FACE_DOWN ist deutlich stärker; mit ihm oft redundant.",
      "Ein Spielzug meint einen vollständigen Spielerzug, nicht die Runde beider Spieler. Front bedeutet die neun Einheitenfelder, nicht die Unterstützungsreihe. Abschnitt meint L/C/R mit je drei Frontfeldern. Benachbart für diese Entwürfe: das unmittelbar linke/rechte Feld in derselben visuellen Frontreihe, ohne Überspringen belegter Felder. Markierungen folgen eindeutiger Instanz-ID, nicht dem Kartennamen. Keine Fähigkeit wirkt von der Hand, verdeckt oder aus dem Ablagestapel. Vor Zielwahl werden Zulässigkeit und AP geprüft; ungültige Aufrufe bezahlen nichts. Neue Status erlöschen beim Verlassen des Feldes, sofern unten nicht enger geregelt. Kein Reset von Angriffs-/Bewegungsnutzung durch Aufdecken, Tausch oder Zusatzangriff. Schutz vor gezielten feindlichen Effekten wird bei allen direkten Zielwahlen respektiert; keine neue Ausnahme von Eingraben."
    ],
    "keywords": [
      "Vorpostenmeldung"
    ],
    "effects": [
      {
        "code": "TACTICAL_SCREEN",
        "param": {}
      }
    ],
    "flavor": "Taktischer Erprobungsentwurf – Werte für den ersten Balancing-Durchlauf.",
    "image": "",
    "art_status": "platzhalter",
    "max_copies": 2,
    "collector": "TAC10",
    "rarity": "silver",
    "design_reference": "S1: 13-56–13-59, S. 13-13, Abgrenzung cover in 13-99–13-102, S. 13-24"
  }
];
