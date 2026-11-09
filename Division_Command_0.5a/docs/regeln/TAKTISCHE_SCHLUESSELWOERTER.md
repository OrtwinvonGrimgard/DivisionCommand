# Taktisches Vokabular – erste Implementierung (t203)

Freigegebenes Design: [Review-Page](https://cursor.com/canvas/store-78fa5afa-fbe1-42cc-9b26-544d32078117/efb5601f-0dd6-4309-8f4e-9bdcb66ae06c). Audit-Basis: `15cda615508a753e6aaa6b4c80e69d36ac4a5e85`. Die dortigen ursprünglichen Auditdaten bleiben ein historischer Befund vor dieser Umsetzung.

**Geladen:** 1746 eindeutige IDs = 1709 Deckkarten + 36 Doktrinen + 1 Token. Zehn neutrale Entwürfe sind **zusätzlich** verfügbar: acht Einheiten und zwei Unterstützungen. Keine Karte wird ersetzt. Die 16 nationalen Pools behalten je 100 normale Karten und zwei zugeordnete Doktrinen; die Starterdecks bleiben 60+2, Kopienlimits Bronze 4 / Silber 2 / Gold 1.

**Vokabular:** ursprüngliche 16 Wörter unverändert kompatibel; zusätzlich zwei bestehende Kerne und fünf wirklich neue Mechaniken = 23 Wörter (Indirektes Feuer durch Steilfeuer-Tags ersetzt). Vollständige Erinnerungen in Detailansicht, Deckbuilder und Entwurfs-Platzhaltern. Keine Änderung bestehender Bilddateien; im alten Kartenbitmap eingedruckte Formulierungen werden dadurch nicht neu gerendert.

## Bestandsgruppierung ohne Regelvermischung

| Kern | Karten | Umsetzung |
|---|---:|---|
| ~~Indirektes Feuer~~ → **Steilfeuer I–V** | 211 Einheiten | Ersetzt. Tags `steilfeuer-i`…`steilfeuer-v`. I/II/III = Reichweite 3/5/7; IV = ganze Front (`ATTACK_ANY_FRONT`); V = ganze Front + Support (`ATTACK_SUPPORT`, Supportangriff +2 AP / gesamt 3 AP). Spotter-Doktrin bleibt eigener Pfad. Fernschuss +1 nur I–III. |
| Absetzen | 29 | `RELOCATE_HIDE`; Verdecken nach eigenem Angriff, kein räumlicher Rückzug. Nur gegnerischer NO_FACE_DOWN-Support verhindert es. |
| Erstschadenschutz | 14 | `EQUIP_IGNORE_FIRST_DAMAGE`, positiver verhinderbarer Ersttreffer einmal pro Schutz. Feldaltar/Kettengebet/Wachsiegel bewusst **nicht** in dieses Wort migriert. |
| Einmaliger Teil-Schadensschutz | 8 | Volltextbaustein mit genau 1/2 Punkten, kein neues Pflichtwort. Vollständig ignorierter Treffer verbraucht ihn nicht. |
| Zusätzliche Karte am eigenen Zugbeginn | 20 | Gemeinsamer Volltext; kein künstliches „Nachschub“-Wort. |
| Ziehen bei Trägerzerstörung | 18 | Gemeinsamer Volltext; übrige Werte/Module bleiben erhalten. |

203 Bestands-IDs erhalten Text-/Regel-/Keyword-Feldänderungen (einschließlich Konfliktentscheidungen und 45 reparierter Nullwertformulierungen), nicht 203 neue Karten. Vollständiger exakter Vorher-/Nachher-Nachweis: `scripts/tactics/migration-log.json`. Anlegen des Wortes allein löst keinen zweiten Effekt aus.

## Gemeinsame Engine-Konventionen und Bedienung

- Neue Fähigkeiten über die Detailansicht der offenen eigenen Quelle → **Fähigkeit einsetzen**. Kosten erst nach der letzten gültigen Auswahl; abgebrochene Vorbereitung kostet nichts. Gegner-, Hand-, verdeckte und unbereite Quellen sind unzulässig. Passive Wörter wirken automatisch.
- Die neue Nachbarschaft bezieht sich auf die **wirklich sichtbaren neun Frontfelder**: `L0,L1,L2,C0,C1,C2,R0,R1,R2`, jeweils Index ±1. Insbesondere C0 grenzt an L2 und C1, nicht an L0 oder R0. Keine Sprünge über belegte Felder. Historische Stellungswechsel-/Doktrin-Geometrie wird nicht nebenbei umgebaut.
- Markierungen folgen Instanz-IDs. Zug = Spielerzug. Binden und Anmarschstörung laufen bis Ende des nächsten Gegner-/Zielbesitzerzuges. Feuerschutz läuft bis zum Ende des aktuellen eigenen Zuges. Verlassen des Felds entfernt neue Einheitenstatus; Quellenverlust entfernt eine bereits gesetzte Bindung auf einem **anderen** Ziel nicht.
- Binden und Feuerschutz reservieren den Angriff, zählen aber nicht als tatsächlicher Angriff für Staffelangriff/Hinterhalt; Zusatzangriff stellt diese Nutzung nicht wieder her. Binden wählt innerhalb des gegenüberliegenden Abschnitts, sofern die Quelle überhaupt einen legalen Angriff ausführen könnte; es erfindet keine zusätzliche Eingraben-Ausnahme.
- Eintritt (neuer Einsatz bzw. gewöhnlicher Abschnittswechsel) wird getrennt von Aufdecken/Verdecken/Platztausch verarbeitet. Vorpostenmeldung wirkt nach Bezahlung und Platzierung; eine vorhandene Eingraben-Markierung bleibt. Standardmäßig offen eingegrabene Einsätze verbrauchen die Meldung daher nicht.
- Nachkampfreaktionen werden nach Gegenschlag und Zerstörungen vorgemerkt, hinter bereits laufenden Wahlfolgen erhalten und vor dem nächsten regulären Befehl angeboten. Ablehnen kostet keine AP. Kein Abbruch nach einem Angriff, der gegen eine zu Kampfbeginn verdeckte Einheit begann.
- Anmarschstörung wird nach Rabatten/Mindestkosten verrechnet. Hand-, Ablage-, Deck-, Gratis-, Ersatz- und Heldeneinsatzpfade sind angebunden; bei unzureichenden AP bleiben Karte und Markierung erhalten. Bestehende Bewegungen, Tausch, Unterstützung, Ausrüstung und Token zahlen nichts.

## Binden – implementiert

Binden (1 AP; verbraucht den Angriff dieser Einheit): Nur in deinem Zug, einmal pro Zug, wenn diese offene Einheit jetzt legal angreifen könnte. Wähle eine offene, nicht eingegrabene gegnerische Fronteinheit im gegenüberliegenden Abschnitt. Bis zum Ende des nächsten Zuges ihres Besitzers darf sie ihr Feld weder durch Versetzen, Tausch, erzwungene Bewegung noch Rücknahme auf die Hand verlassen. Zerstörung oder Opferung bleibt möglich. Sie darf weiter angreifen und Fähigkeiten nutzen. Kein Schaden. Höchstens ein Bindeneinsatz pro Besitzer pro Zug. Nicht stapelbar; eine weitere Bindung desselben Ziels ist bis zum Ablauf unzulässig. Der Status bleibt bis zum Ablauf auch bestehen, wenn der Binder zerstört wird.

**Interaktionen:** Kein Niederhalten: ATK und Angriff bleiben unverändert. Verhindert Stellungswechsel und beide Hälften von Platztausch, wenn das gebundene Ziel betroffen wäre. Gefechtsabbruch scheitert am Bewegungsverbot. Abschirmung, Sicherung und Fernschuss bleiben aktiv. Verbrauchter Binder-Angriff zählt nicht als Angriff für Staffelangriff/Hinterhalt. Auch ein Zusatzangriff stellt die Binden-Nutzung nicht wieder her.

**Taktischer Bezug:** Fix bindet eine gegnerische Kraft zeitweise an ihren Ort, nicht notwendig durch Vernichtung. Ein blockierter Gegner darf dagegen in andere, nicht gesperrte Richtungen ausweichen. Eigene präzise deutsche Spielbezeichnung für fix; keine belegte amtliche Bundeswehr-Übersetzung behauptet. Verifiziert im ursprünglichen Review: S1: B-35–B-36, S. B-8.

### Zwei zusätzliche Testkarten

- **Haltezug am Knotenpunkt** (`dc_tac_haltezug_am_knotenpunkt`) · Einheit / Infanterie · 3 AP · 2 ATK / 3 DEF · bronze / max. 4 Kopien.

  Binden (1 AP; verbraucht den Angriff dieser Einheit): Nur in deinem Zug, einmal pro Zug, wenn diese offene Einheit jetzt legal angreifen könnte. Wähle eine offene, nicht eingegrabene gegnerische Fronteinheit im gegenüberliegenden Abschnitt. Bis zum Ende des nächsten Zuges ihres Besitzers darf sie ihr Feld weder durch Versetzen, Tausch, erzwungene Bewegung noch Rücknahme auf die Hand verlassen. Zerstörung oder Opferung bleibt möglich. Sie darf weiter angreifen und Fähigkeiten nutzen. Kein Schaden. Höchstens ein Bindeneinsatz pro Besitzer pro Zug. Nicht stapelbar; eine weitere Bindung desselben Ziels ist bis zum Ablauf unzulässig. Der Status bleibt bis zum Ablauf auch bestehen, wenn der Binder zerstört wird.

- **Schwerer Bindungskeil** (`dc_tac_schwerer_bindungskeil`) · Einheit / Panzer, gepanzert · 5 AP · 4 ATK / 5 DEF · silver / max. 2 Kopien.

  Binden (1 AP; verbraucht den Angriff dieser Einheit): Nur in deinem Zug, einmal pro Zug, wenn diese offene Einheit jetzt legal angreifen könnte. Wähle eine offene, nicht eingegrabene gegnerische Fronteinheit im gegenüberliegenden Abschnitt. Bis zum Ende des nächsten Zuges ihres Besitzers darf sie ihr Feld weder durch Versetzen, Tausch, erzwungene Bewegung noch Rücknahme auf die Hand verlassen. Zerstörung oder Opferung bleibt möglich. Sie darf weiter angreifen und Fähigkeiten nutzen. Kein Schaden. Höchstens ein Bindeneinsatz pro Besitzer pro Zug. Nicht stapelbar; eine weitere Bindung desselben Ziels ist bis zum Ablauf unzulässig. Der Status bleibt bis zum Ablauf auch bestehen, wenn der Binder zerstört wird.

**Erster Balanceansatz:** Neue legale Bewegungsprüfung an allen Bewegungs-/Rücknahmepfaden nötig. Gefahr: günstige Dauerblockade beweglicher Decks. Maximal ein eigener Bindeneinsatz pro Zug, keine Erneuerung laufender Bindungen; 1 AP zusätzlich zur verlorenen Attacke als erster Test. Werte sind Erprobungswerte, keine historisch abgeleiteten Leistungsdaten.

## Anmarschstörung – implementiert

Anmarschstörung (1 AP; einmal pro eigenem Zug): Nur in deinem Zug. Wähle einen gegnerischen Abschnitt. Solange diese offene Unterstützung liegt, kostet die erste dort neu ins Spiel kommende gegnerische Einheit bis zum Ende des nächsten gegnerischen Zuges 1 AP zusätzlich; danach ist die Markierung verbraucht. Es zählt jede neue Einheit aus Hand oder Ablage, auch durch einen sonst kostenlosen Effekt; gewöhnliche Rabatte und Mindestkosten werden zuerst berechnet, dann +1 AP. Bei unzureichenden AP ist dieser Einsatz dort nicht zulässig; die Markierung wird nicht verbraucht. Bewegung bereits liegender Einheiten, Tausch, Unterstützung, Ausrüstung und Token lösen sie nicht aus. Kein Schaden und kein Angriffsverbot. Höchstens eine eigene Anmarschstörung gleichzeitig, nicht stapelbar. Wird die Quelle verdeckt oder entfernt, endet sie sofort.

**Interaktionen:** Keine Flächenschadenszone, kein Schaden an Einrückenden. Anders als Binden kann der Gegner alle vorhandenen Einheiten verlegen. Anders als Sperren bleibt der Einsatz bei Zahlung möglich. Eingraben verhindert nicht den Einsatzaufschlag, da keine bereits liegende Einheit angezielt wird. Heranführung/Ablösung zuerst verrechnen; der Aufschlag kommt danach. Markierung endet nach einem erfolgreichen Einsatz, nicht nach fehlgeschlagener Zielwahl.

**Taktischer Bezug:** Interdict verhindert, stört oder verzögert die Nutzung eines Raumes oder Weges; gewünschter Effekt und Dauer müssen ausdrücklich feststehen. Hier wird ausschließlich der verzögernde Kosteneffekt abstrahiert. Bewusst eigene deutsche Spielbezeichnung für die Verzögerungsvariante von interdict. Nicht Abriegeln nennen: die bestehende Doktrin dieses Namens hat einen anderen Artilleriekern. Verifiziert im ursprünglichen Review: S1: B-46–B-47, S. B-9.

### Zwei zusätzliche Testkarten

- **Anmarschbeobachtung** (`dc_tac_anmarschbeobachtung`) · Unterstützung · 3 AP · bronze / max. 4 Kopien.

  Anmarschstörung (1 AP; einmal pro eigenem Zug): Nur in deinem Zug. Wähle einen gegnerischen Abschnitt. Solange diese offene Unterstützung liegt, kostet die erste dort neu ins Spiel kommende gegnerische Einheit bis zum Ende des nächsten gegnerischen Zuges 1 AP zusätzlich; danach ist die Markierung verbraucht. Es zählt jede neue Einheit aus Hand oder Ablage, auch durch einen sonst kostenlosen Effekt; gewöhnliche Rabatte und Mindestkosten werden zuerst berechnet, dann +1 AP. Bei unzureichenden AP ist dieser Einsatz dort nicht zulässig; die Markierung wird nicht verbraucht. Bewegung bereits liegender Einheiten, Tausch, Unterstützung, Ausrüstung und Token lösen sie nicht aus. Kein Schaden und kein Angriffsverbot. Höchstens eine eigene Anmarschstörung gleichzeitig, nicht stapelbar. Wird die Quelle verdeckt oder entfernt, endet sie sofort.

- **Taktische Verkehrsleitstelle** (`dc_tac_taktische_verkehrsleitstelle`) · Unterstützung · 4 AP · silver / max. 2 Kopien.

  Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung offen liegt. Anmarschstörung (1 AP; einmal pro eigenem Zug): Nur in deinem Zug. Wähle einen gegnerischen Abschnitt. Solange diese offene Unterstützung liegt, kostet die erste dort neu ins Spiel kommende gegnerische Einheit bis zum Ende des nächsten gegnerischen Zuges 1 AP zusätzlich; danach ist die Markierung verbraucht. Es zählt jede neue Einheit aus Hand oder Ablage, auch durch einen sonst kostenlosen Effekt; gewöhnliche Rabatte und Mindestkosten werden zuerst berechnet, dann +1 AP. Bei unzureichenden AP ist dieser Einsatz dort nicht zulässig; die Markierung wird nicht verbraucht. Bewegung bereits liegender Einheiten, Tausch, Unterstützung, Ausrüstung und Token lösen sie nicht aus. Kein Schaden und kein Angriffsverbot. Höchstens eine eigene Anmarschstörung gleichzeitig, nicht stapelbar. Wird die Quelle verdeckt oder entfernt, endet sie sofort.

**Erster Balanceansatz:** Neue Abschnittsmarkierung sowie Kostenprüfung bei Hand-, Friedhofs- und Gratis-Einsatz nötig. Keine heimliche Abschaffung kostenloser Effekte: nur der explizite neue Aufschlag. Globales Ein-Marker-Limit und einmalige Wirkung verhindern komplette Frontsperre. Die Quelle ist angreifbare Gegenmaßnahme. Werte sind Erprobungswerte, keine historisch abgeleiteten Leistungsdaten.

## Feuerschutz – implementiert

Feuerschutz 2 (1 AP; verbraucht den Angriff dieser Einheit): Nur in deinem Zug, einmal pro Zug, wenn diese offene Einheit jetzt legal angreifen könnte. Wähle eine andere offene eigene Fronteinheit auf einem benachbarten Feld derselben Reihe und eine offene gegnerische Fronteinheit, die beide jetzt legal angreifen könnten. Beim nächsten Angriff der gewählten eigenen Einheit gegen genau dieses Ziel in diesem Zug verursacht dessen Gegenschlag beziehungsweise Nebel-Erstschlag 2 Schaden weniger, mindestens 0; andere Schadensquellen bleiben unverändert. Der Schutz wird bei Kampfbeginn verbraucht, auch wenn der Angreifer danach an einer Mine stirbt. Er endet vorher, wenn eine der drei Einheiten entfernt oder verdeckt wird, ihr Feld wechselt oder dein Zug endet. Kein eigener Schaden durch die Schutzhandlung. Höchstens ein Feuerschutz gleichzeitig pro Seite; nicht stapelbar.

**Interaktionen:** Nicht Staffelangriff: kein ATK-Bonus und die Schutzhandlung ist kein Angriff. Nicht Abschirmung: niemand übernimmt Schaden. Reduktion erfolgt am berechneten Gegenschlag vor allgemeinen Schadensreduktionen; bei Kampfmodus ohne Gegenschlag nutzlos, im simultanen Modus dennoch wirksam. Kein Umgehen von Eingraben. Fernschuss erweitert nur die normale Zielzulässigkeit. Hinterhalt bleibt bis zu echtem Angriff ungenutzt.

**Taktischer Bezug:** Support by fire unterstützt ausdrücklich das Manöver einer anderen Kraft; attack by fire tut dies nicht notwendigerweise. Der Unterstützer verzichtet hier auf eigenen Angriff zugunsten eines begrenzten Schutzfensters. Eigene deutsche Benennung als Übersetzung von support by fire. Keine amtliche Gleichsetzung behauptet. FM beschreibt die Aufgabe meist unterhalb Verbandsebene; Division Command abstrahiert hier die Zusammenarbeit einzelner Kartenverbände, keine komplette Divisionsgliederung. Verifiziert im ursprünglichen Review: S1: B-58–B-61, S. B-12; ergänzend S2: 1-21, S. 1-3–1-4.

### Zwei zusätzliche Testkarten

- **Unterstützungsgruppe am Flügel** (`dc_tac_unterstutzungsgruppe_am_flugel`) · Einheit / Infanterie · 3 AP · 2 ATK / 4 DEF · bronze / max. 4 Kopien.

  Feuerschutz 2 (1 AP; verbraucht den Angriff dieser Einheit): Nur in deinem Zug, einmal pro Zug, wenn diese offene Einheit jetzt legal angreifen könnte. Wähle eine andere offene eigene Fronteinheit auf einem benachbarten Feld derselben Reihe und eine offene gegnerische Fronteinheit, die beide jetzt legal angreifen könnten. Beim nächsten Angriff der gewählten eigenen Einheit gegen genau dieses Ziel in diesem Zug verursacht dessen Gegenschlag beziehungsweise Nebel-Erstschlag 2 Schaden weniger, mindestens 0; andere Schadensquellen bleiben unverändert. Der Schutz wird bei Kampfbeginn verbraucht, auch wenn der Angreifer danach an einer Mine stirbt. Er endet vorher, wenn eine der drei Einheiten entfernt oder verdeckt wird, ihr Feld wechselt oder dein Zug endet. Kein eigener Schaden durch die Schutzhandlung. Höchstens ein Feuerschutz gleichzeitig pro Seite; nicht stapelbar.

- **Bewegliche Feuerbasis** (`dc_tac_bewegliche_feuerbasis`) · Einheit / Fahrzeug, gepanzert · 4 AP · 4 ATK / 3 DEF · silver / max. 2 Kopien.

  Feuerschutz 2 (1 AP; verbraucht den Angriff dieser Einheit): Nur in deinem Zug, einmal pro Zug, wenn diese offene Einheit jetzt legal angreifen könnte. Wähle eine andere offene eigene Fronteinheit auf einem benachbarten Feld derselben Reihe und eine offene gegnerische Fronteinheit, die beide jetzt legal angreifen könnten. Beim nächsten Angriff der gewählten eigenen Einheit gegen genau dieses Ziel in diesem Zug verursacht dessen Gegenschlag beziehungsweise Nebel-Erstschlag 2 Schaden weniger, mindestens 0; andere Schadensquellen bleiben unverändert. Der Schutz wird bei Kampfbeginn verbraucht, auch wenn der Angreifer danach an einer Mine stirbt. Er endet vorher, wenn eine der drei Einheiten entfernt oder verdeckt wird, ihr Feld wechselt oder dein Zug endet. Kein eigener Schaden durch die Schutzhandlung. Höchstens ein Feuerschutz gleichzeitig pro Seite; nicht stapelbar.

**Erster Balanceansatz:** Drei Instanzen müssen atomar gewählt und der Status an genau einen Kampf gebunden werden. Risiko: zwei Einheiten für kaum Effekt, wenn Ziel vor Gegenschlag ohnehin stirbt; deshalb 2 statt 1 als Testparameter. Kein dauerhafter ATK-Debuff und keine endlose Angriffsverhinderung. 1 AP plus eigener Angriffsverzicht testen. Werte sind Erprobungswerte, keine historisch abgeleiteten Leistungsdaten.

## Gefechtsabbruch – implementiert

Gefechtsabbruch (Reaktion, 1 AP; einmal pro gegnerischem Zug): Nachdem ein gegnerischer Angriff gegen diese offene Einheit vollständig abgewickelt wurde, einschließlich Gegenschlag und Zerstörungen, darfst du sie, falls sie überlebt hat, auf ein freies unmittelbar benachbartes Feld derselben eigenen Frontreihe versetzen. Kein Sprung über ein Feld. Sie behält Schaden, Ausrüstung, Token und Instanz-ID. Keine Heilung, kein Verdecken, kein neuer Einsatz und kein neues Eingraben. Bis zum Ende deines nächsten Zuges kann sie nicht angreifen, auch nicht durch Zusatzangriff. Ist sie gebunden oder gibt es kein freies legales Nachbarfeld, ist die Reaktion nicht möglich. Abgelehnte Reaktion kostet nichts. Nicht bei Soforteinsatzschaden oder eigenem Angriff; keine Wirkung für eine zerstörte Einheit.

**Interaktionen:** Anders als Stellungswechsel während des Gegenzuges und nach abgeschlossenem Kampf; Tempoverlust reicht bis Ende nächsten eigenen Zuges. Löst weder Zuteilung/Heranführung noch Ablösung aus; keine Zerstörung. Binden verhindert es. Platztausch und Absetzen sind keine Ersatzreaktionen. Abschirmung kann zuvor Schaden übernehmen, verleiht aber dem Abschirmer keinen eigenen Abbruchtrigger, da er nicht angegriffen wurde.

**Taktischer Bezug:** Disengage löst Kontakt für einen anderen Auftrag oder um entscheidende Bindung zu vermeiden. Withdraw schließt eine Bewegung weg vom Feind ein; retirement erfolgt bereits außerhalb des Kontakts. Die vorhandene Karte RELOCATE_HIDE verdunkelt dagegen nur die Sichtbarkeit. Spielbegriff angelehnt an österreichisch belegtes Abbrechen des Gefechts. Laterales Versetzen ist bewusst nur eine Board-Abstraktion der Kontaktlösung, kein Anspruch, räumlichen Rückzug in die Tiefe realistisch darzustellen. Verifiziert im ursprünglichen Review: S1: B-24, S. B-6; S2: 4-19–4-20, S. 4-3–4-4; S3: Taktische Handlungen in der Verzögerung.

### Zwei zusätzliche Testkarten

- **Nachhutkompanie** (`dc_tac_nachhutkompanie`) · Einheit / Infanterie · 3 AP · 2 ATK / 4 DEF · bronze / max. 4 Kopien.

  Gefechtsabbruch (Reaktion, 1 AP; einmal pro gegnerischem Zug): Nachdem ein gegnerischer Angriff gegen diese offene Einheit vollständig abgewickelt wurde, einschließlich Gegenschlag und Zerstörungen, darfst du sie, falls sie überlebt hat, auf ein freies unmittelbar benachbartes Feld derselben eigenen Frontreihe versetzen. Kein Sprung über ein Feld. Sie behält Schaden, Ausrüstung, Token und Instanz-ID. Keine Heilung, kein Verdecken, kein neuer Einsatz und kein neues Eingraben. Bis zum Ende deines nächsten Zuges kann sie nicht angreifen, auch nicht durch Zusatzangriff. Ist sie gebunden oder gibt es kein freies legales Nachbarfeld, ist die Reaktion nicht möglich. Abgelehnte Reaktion kostet nichts. Nicht bei Soforteinsatzschaden oder eigenem Angriff; keine Wirkung für eine zerstörte Einheit.

- **Ausweichender Spähwagen** (`dc_tac_ausweichender_spahwagen`) · Einheit / Aufklärung, Fahrzeug · 2 AP · 1 ATK / 3 DEF · silver / max. 2 Kopien.

  Gefechtsabbruch (Reaktion, 1 AP; einmal pro gegnerischem Zug): Nachdem ein gegnerischer Angriff gegen diese offene Einheit vollständig abgewickelt wurde, einschließlich Gegenschlag und Zerstörungen, darfst du sie, falls sie überlebt hat, auf ein freies unmittelbar benachbartes Feld derselben eigenen Frontreihe versetzen. Kein Sprung über ein Feld. Sie behält Schaden, Ausrüstung, Token und Instanz-ID. Keine Heilung, kein Verdecken, kein neuer Einsatz und kein neues Eingraben. Bis zum Ende deines nächsten Zuges kann sie nicht angreifen, auch nicht durch Zusatzangriff. Ist sie gebunden oder gibt es kein freies legales Nachbarfeld, ist die Reaktion nicht möglich. Abgelehnte Reaktion kostet nichts. Nicht bei Soforteinsatzschaden oder eigenem Angriff; keine Wirkung für eine zerstörte Einheit.

**Erster Balanceansatz:** Neue freiwillige Nachkampfreaktion muss vor dem nächsten Spielerbefehl priorisiert werden; Mehrfachzerstörungen zuerst vollständig auflösen. Reserve-AP reichen nach aktuellem Reaktionsmodell. Risiko: häufige Dialoge und Ausweichen ohne echte räumliche Tiefe. Daher P2; keine Verhinderung des bereits erlittenen Treffers. Werte sind Erprobungswerte, keine historisch abgeleiteten Leistungsdaten.

## Vorpostenmeldung – implementiert

Vorpostenmeldung: Solange diese Einheit offen liegt, decke in jedem Spielerzug die erste verdeckte gegnerische Fronteinheit auf, die neu in den gegenüberliegenden Abschnitt eingesetzt oder durch gewöhnliches Versetzen dorthin bewegt wird. Erst nach Platzierung und Bezahlung, vor dem nächsten Spielerbefehl; Eingraben-Schutz bleibt unverändert bestehen. Eine bereits offen eintretende Einheit verbraucht die Meldung nicht. Bereits im Abschnitt liegende Einheiten bleiben unverändert. Aufdecken, Verdecken und Platztausch zählen hierfür nicht als Eintritt. Kein Schaden, kein Bewegungsstopp, kein Beobachtet-Marker. Mehrere Vorpostenmeldungen desselben Besitzers im selben Abschnitt teilen sich eine Auslösung pro Spielerzug. Ein zerstörter oder verdeckter Melder löst nicht aus; seine spätere Rückkehr setzt das gemeinsame Auslösungslimit nicht zurück.

**Interaktionen:** Nicht Sicherung und nicht Abschirmung: keinerlei DEF oder Schadensumleitung. Nicht Beobachtet: kein dauerhaftes Zielkennzeichen. Aufdeckung darf bestehende Platztausch-Wahl auslösen, aber der Tausch triggert die Meldung nicht erneut. Hinterhalt eines aufgedeckten Gegners kann dadurch vorbereitet werden – bewusste Gegenwirkung. NO_FACE_DOWN ist deutlich stärker; mit ihm oft redundant.

**Taktischer Bezug:** Screen stellt primär Frühwarnung durch Beobachten, Identifizieren und Melden bereit, mit weniger Schutz als guard oder cover. Es ist nicht bloß eine andere Bezeichnung für schadenabsorbierende Deckung. Eigene deutsche Spielbezeichnung für den Frühwarnkern von screen. Keine Behauptung, screen bedeute amtlich Vorpostenmeldung oder Abschirmung. Verifiziert im ursprünglichen Review: S1: 13-56–13-59, S. 13-13, Abgrenzung cover in 13-99–13-102, S. 13-24.

### Zwei zusätzliche Testkarten

- **Vorgeschobener Meldetrupp** (`dc_tac_vorgeschobener_meldetrupp`) · Einheit / Aufklärung, Infanterie · 2 AP · 1 ATK / 2 DEF · bronze / max. 4 Kopien.

  Vorpostenmeldung: Solange diese Einheit offen liegt, decke in jedem Spielerzug die erste verdeckte gegnerische Fronteinheit auf, die neu in den gegenüberliegenden Abschnitt eingesetzt oder durch gewöhnliches Versetzen dorthin bewegt wird. Erst nach Platzierung und Bezahlung, vor dem nächsten Spielerbefehl; Eingraben-Schutz bleibt unverändert bestehen. Eine bereits offen eintretende Einheit verbraucht die Meldung nicht. Bereits im Abschnitt liegende Einheiten bleiben unverändert. Aufdecken, Verdecken und Platztausch zählen hierfür nicht als Eintritt. Kein Schaden, kein Bewegungsstopp, kein Beobachtet-Marker. Mehrere Vorpostenmeldungen desselben Besitzers im selben Abschnitt teilen sich eine Auslösung pro Spielerzug. Ein zerstörter oder verdeckter Melder löst nicht aus; seine spätere Rückkehr setzt das gemeinsame Auslösungslimit nicht zurück.

- **Beobachtungswagen am Rand** (`dc_tac_beobachtungswagen_am_rand`) · Einheit / Aufklärung, Fahrzeug · 3 AP · 2 ATK / 3 DEF · silver / max. 2 Kopien.

  Vorpostenmeldung: Solange diese Einheit offen liegt, decke in jedem Spielerzug die erste verdeckte gegnerische Fronteinheit auf, die neu in den gegenüberliegenden Abschnitt eingesetzt oder durch gewöhnliches Versetzen dorthin bewegt wird. Erst nach Platzierung und Bezahlung, vor dem nächsten Spielerbefehl; Eingraben-Schutz bleibt unverändert bestehen. Eine bereits offen eintretende Einheit verbraucht die Meldung nicht. Bereits im Abschnitt liegende Einheiten bleiben unverändert. Aufdecken, Verdecken und Platztausch zählen hierfür nicht als Eintritt. Kein Schaden, kein Bewegungsstopp, kein Beobachtet-Marker. Mehrere Vorpostenmeldungen desselben Besitzers im selben Abschnitt teilen sich eine Auslösung pro Spielerzug. Ein zerstörter oder verdeckter Melder löst nicht aus; seine spätere Rückkehr setzt das gemeinsame Auslösungslimit nicht zurück.

**Erster Balanceansatz:** Eintritts- und Statusereignisse müssen getrennt sein; gemeinsamer Abschnittszähler überlebt Quellenwechsel. Risiko: verdeckte Spielpläne werden zu leicht entwertet, außerdem unbeabsichtigte Hinterhalt-/Platztausch-Vorteile. Deshalb keine Rundumaufdeckung und keine vollständige Verdeckungssperre. Werte sind Erprobungswerte, keine historisch abgeleiteten Leistungsdaten.

## Bewusste Text-/Engine-Entscheidungen

| Karte(n) | Konkrete Umsetzung / konservative Interpretation |
|---|---|
| Notdepot `dc_b_notdepot_643` | Zwei ziehen, danach genau eine eigene Handkarte frei wählen und abwerfen. Pflichtwahl kann nicht kostenlos abgebrochen werden. Bestehendes automatisches Handlimit beim Ziehen bleibt bestehen; es gibt keinen neuen Handlimit-Ausnahmezustand. |
| Filterpatrone `dc_b_filterpatrone_410` | Gedruckte +1 DEF beim ersten gegnerischen Angriff je Spielerzug als **temporäre Kampf-DEF = 1 Punkt weniger eingehender Kampfschaden**. Kein permanenter DEF-Bonus, keine Heilung und kein eigener ATK-Bonus. Erster Angriff verbraucht das Fenster auch bei 0 Schaden. |
| Verlegung `dc_b_verlegung_210` | Wahl bis zu zwei Abschnitte statt nur einem; vorhandene Belegung und Bewegungsverbote gelten. Keine neue benachbarte-1-Feld-Regel auf diese alte Verlegung anwenden. |
| Aktenbefehl `dc_b_aktenbefehl_887`, Tausch `dc_b_tausch_945` | Bewegungsverbot für den laufenden Spielerzug statt fälschlichem Angriffsverbot. Bestehender +2-DEF-Bonus bleibt; der gedruckte Satz befristet ausdrücklich die Bewegungssperre. |
| Sturmleitern `dc_au_sturmleitern` | Erster eigener Angriff **in jedem** Spielerzug; kein Bonus beim Gegenschlag. Zusatzangriff oder erneutes Anlegen setzt den bereits genutzten ersten Angriff des Trägers nicht zurück. |
| Sturmleitern `dc_b_sturmleitern_133` | Permanenter +1-ATK-Anlegebonus plus gedruckter zusätzlicher +1-ATK-Bonus nur beim ersten Angriff **im Anlegezug**. Das „in diesem Zug“ wird nicht stillschweigend zu jedem zukünftigen Zug. |
| 13 Pool-Ausrüstungen `CARRIER_FIRST_ATTACK_ATK` | Erster ausgeführter Angriff **nach diesem Anlegen**, einmal pro Ausrüstungsinstanz; eine neue Kopie hat einen frischen Bonus, kein Bonus auf Gegenschlag. |
| Feldaltar `dc_b_feldaltar_138` | Träger darf nicht Ziel des ersten ausgeführten gegnerischen Angriffs eines Spielerzuges sein. Kein Schutz gegen Soforteinsatzschaden. Kann erst angegriffen werden, nachdem der Gegner einen anderen Angriff ausgeführt hat. |
| Kettengebet `dc_b_kettengebet_141` | Je eigene Infanterie im Abschnitt des lebenden Trägers (auch wenn dieser verdeckt ist): erste noch positive, verhinderbare Schadensinstanz pro Spielerzug um 1 vermindern. Kein vollständiges Ignorieren eines beliebig großen Treffers; mehrere Gebete setzen das Empfängerlimit nicht zurück. |
| Wachsiegel `dc_b_wachsiegel_647` | +1 DEF bleibt; einmal Ersttreffer ignorieren, **danach** −1 ATK nur bis Ende genau dieses Spielerzuges. Vor dem Schutzverbrauch kein ATK-Malus. Kein automatisches Umbenennen in das reine Wort Erstschadenschutz. |
| Glaubensbanner `dc_b_glaubensbanner_113` | Beim Ausspielen explizit einen eigenen Abschnitt wählen, Infanterie dort +1 DEF solange die Unterstützung offen liegt. Nicht global +2. Der bisher undefinierte Abschnitt wird nicht aus einer beliebigen Support-Arrayposition geraten. Wegfall des dynamischen DEF-Bonus folgt der bestehenden Sicherung-Konvention (allein kein Tod, Minimum 1). |
| 45 Pool-Stattexte | Numerische Nullfelder werden als **kein Bonus** weggelassen, nicht als „setze ATK/DEF auf 0“ ausgeschrieben. Ausführung/positive Werte unverändert. |

Elf konkrete Bestands-IDs erhalten korrigierte strukturierte Codes. Die 13 genannten Pool-Ausrüstungen behalten ihren Code und erhalten die korrigierte Anlege-Lebensdauer im Handler. Andere im Audit vermerkte Altbesonderheiten (z. B. allgemeine DEF-/Buff-Darstellung) wurden nicht in einen unbeschränkten Engine-Umbau einbezogen.

## Qualitätssicherung / Grenzen

- `node scripts/test_tactical_keywords.js`: positive und ungültige Ziele, fremde/verdeckte/frische Quellen, Kosten/Abbruch, Dauer/Ablauf, Feld-/Quellenverlust, Interaktionen, alle zehn tatsächlichen PLAY-Pfade, Decklimits, Byte-Reproduzierbarkeit und echte jsdom-Detail-/Ziel-/Reaktionsklicks.
- `npm test`: vollständige bestehende Suite einschließlich 16-Wörter-Engine, nationale Pools, 32 Smoke-Matches, Karten-Spielinput, Kamera, Vollbild-HUD, Stencil-Ausrichtung, Proportionen, Privatsphäre, Modals und Audio-Isolation. **Keine Browser-Sichtprüfung**; jsdom ist kein gerenderter Browser.
- Keine Änderung der 24°-Kamera, Hand/HUD-Pinnung, Ölstudie, Licht-/Stencil-CSS, Kartenbilder oder Proportionen. Keine Änderung an Sounds, Porträts oder Chat.
- Neue Werte sind ein erster Balancing-Durchlauf. Der Bot kann aktivierbare Aktionen und allgemeine Pending-Choices verarbeiten; keine optimierte taktische KI und kein behaupteter Langzeit-Balancenachweis.
- Build: `npm run build:tactics`; Quellen `scripts/tactics/cards.json`, `approved-proposals.json`, `migrate.js`; nationale DSL bleibt Quelle der 640 Poolkarten. Alt-Typdateien im Spiel sind die verwendeten kanonischen JSON-Arrays; der historische KartenEditor-Spiegel ist keine zweite aktive Bibliothek.
- Cache: `divcmd-tac1`, betroffene App-/Daten-/Engine-URLs `?v=tac1`.

## Verifizierte Literatur des freigegebenen Reviews

### S1: FM 3-90, Tactics

Headquarters, Department of the Army · 1. Mai 2023 · [Originalquelle](https://armypubs.army.mil/epubs/DR_pubs/DR_a/ARN38160-FM_3-90-000-WEB-1.pdf)

- Appendix B, B-5–B-6, S. B-2: block, Unterschied zu fix
- B-24, S. B-6: disengage
- B-35–B-36, S. B-8: fix
- B-46, S. B-9: interdict
- B-58–B-61, S. B-12: support by fire vs attack by fire
- B-62, S. B-12: suppress
- 13-56–13-59, S. 13-13: screen
- 13-99–13-102, S. 13-24: cover

Offizielles öffentliches PDF lokal heruntergeladen und Textabschnitte gelesen; Seitenangaben sind gedruckte Seiten, keine PDF-Viewer-Zählung. Keine Behauptung einer amtlichen deutschen Entsprechung der eigenen Spielnamen.

### S2: ADP 3-90, Offense and Defense

Headquarters, Department of the Army · 31. Juli 2019 · [Originalquelle](https://armypubs.army.mil/epubs/DR_pubs/DR_a/ARN34828-ADP_3-90-000-WEB-1.pdf)

- 1-21, S. 1-3–1-4: combined arms
- 4-19–4-20, S. 4-3–4-4: retrograde, delay, withdraw, retirement

Offizielles öffentliches PDF lokal heruntergeladen und Definitionen gelesen; aktuelle Webseite führt Fassung als active, aber Entwurf beansprucht keine Vollständigkeit aller späteren Doktrinänderungen. Keine Behauptung einer amtlichen deutschen Entsprechung der eigenen Spielnamen.

### S3: Angewandte Taktik: Entschlussbeispiel

TRUPPENDIENST, Herausgeber Bundesministerium für Landesverteidigung, Österreich · 19. April 2023 · [Originalquelle](https://www.truppendienst.com/beitraege/2023/angewandte-taktik-entschlussbeispiel)

- Taktische Handlungen in der Verzögerung
- Fazit

Vollständige öffentliche Seite geöffnet. Deutsche Begriffe aus österreichischer, nicht automatisch deutscher Bundeswehr-Terminologie. Nur allgemeine Begriffsdefinitionen verwendet; operative Beispielplanung nicht in Spielanleitung übernommen. Keine Behauptung einer amtlichen deutschen Entsprechung der eigenen Spielnamen.
