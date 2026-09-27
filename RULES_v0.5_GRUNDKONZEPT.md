# Division Command – Rules v0.5 „Grundkonzept“

Stand: 2026-09-27

Dieses Dokument fasst den bisher im Design festgelegten Regelstand zusammen. Es ist ein Arbeitsregelwerk: Festgelegte Regeln und noch offene bzw. playtestabhängige Punkte werden ausdrücklich voneinander getrennt.

Es soll auch außerhalb des aktuellen Gesprächs verständlich bleiben und die Grundlage für spätere Regelversionen bilden.

---

## 1. Spielprinzip

Division Command ist ein taktisch-strategisches modernes Kriegskartenspiel.

Grundprinzip:

> Einfache Grundregeln, Tiefe durch Karteninteraktionen.

Die Spieler erhalten eine zentrale Aktionsressource und führen ihre Aktionen in einer freien Reihenfolge aus. Karten bestimmen dabei einen großen Teil der taktischen und strategischen Komplexität.

Es gibt keine Pflicht, normale Aktionen in einer langen festen Phasenfolge abzuarbeiten.

---

# 2. Spielfeld

## 2.1 Front

Die Front besteht aus drei Frontabschnitten:

- linke Flanke
- Zentrum
- rechte Flanke

Jeder Frontabschnitt besitzt drei Stellungen.

Damit gibt es insgesamt:

> 9 Frontstellungen

Einheiten werden auf diese Stellungen gespielt.

Eine zerstörte Einheit hinterlässt eine freie Stellung. Eine Einheit rückt nach einem Sieg nicht automatisch in die gegnerische Stellung vor.

## 2.2 Support-Zone

Hinter der Front liegt die Support-Zone.

Es gibt dort grundsätzlich keine unterschiedlichen festen Support-Slots. Unterstützungskarten liegen gemeinsam in dieser Zone; ihre Kartentexte bestimmen, welche Funktionen und Wechselwirkungen sie besitzen.

Typische Funktionen:

- Logistik
- Aufklärung
- Kommando
- Befestigung
- Reparatur
- Luftverteidigung
- Kommunikation
- Diplomatie
- elektronische Kriegsführung

Supportkarten können zerstört, entfernt oder vorübergehend deaktiviert werden.

## 2.3 Niemandsland / Schlachtfeld

Zwischen Front und Support liegt ein gemeinsamer Bereich für bestimmte Kampfmittel und Tokens, beispielsweise:

- Minenfelder
- Stacheldraht
- Hindernisse
- andere vom Kartentext definierte Marker

Dieser Bereich ist kein normaler Bewegungsraum für Einheiten.

---

# 3. Bewegung

Normale Bewegung ist nicht Teil des Grundspiels.

Einheiten werden direkt in eine Stellung gespielt und bleiben dort.

Bewegung bzw. Verlegung ist nur möglich, wenn eine Karte oder Fähigkeit dies ausdrücklich erlaubt.

Mögliche Sonderfälle:

- Verlegung auf eine andere freie Stellung
- Rückzug in die Support-Zone
- Rückkehr auf die frühere Frontstellung
- temporäre Verlegung zu Reparatur oder Wartung

---

# 4. Kartentypen

Der Kern des Spiels besteht aus:

1. Einheiten
2. Unterstützung
3. Einsätze / Soforteinsätze
4. Ausrüstung
5. Doktrinen

Weitere Kartentypen können später ergänzt werden.

---

# 5. Einheiten

Einheiten sind die Hauptkräfte der Front.

Aktuelle grundlegende militärische Klassen:

- Infanterie
- Rad
- Kette
- Schwere Kette

Weitere militärische Rollen können über Eigenschaften, Tags, Namen, Fähigkeiten und Kartentext dargestellt werden.

Beispiele:

- Aufklärung
- Panzerabwehr
- Artillerie
- mechanisierte Infanterie
- Kommando
- Scharfschützen
- Stellungen

Luftstreitkräfte werden zunächst überwiegend über Einsätze und Unterstützung dargestellt.

Schiffe werden zunächst eher als Unterstützung dargestellt.

---

# 6. Einheitenwerte

Eine Einheit besitzt insbesondere:

- Angriff
- Verteidigung / Stabilität
- AP-Kosten

Die Kampfwerte sollen grundsätzlich deterministisch verarbeitet werden.

Würfel sind nicht Teil des normalen Kampfkerns.

---

# 7. Angriff

Eine normale Front-Einheit kann grundsätzlich die gegnerische Stellung

- direkt gegenüber,
- links daneben,
- rechts daneben

angreifen.

Damit beträgt die normale Angriffsreichweite höchstens drei Stellungen.

Spezielle Einheiten können eine größere Reichweite besitzen.

Beispiele:

- Präzisionseinheiten können mehrere weiter entfernte Ziele erreichen.
- Artillerie kann durch Kartentext außergewöhnlich weit wirken.

Die endgültige Reichweitenstruktur einzelner Spezialtypen wird durch die entsprechenden Karten definiert.

## 7.1 Gegenangriff

Wird eine Einheit angegriffen, führt sie grundsätzlich einen Gegenangriff aus, sofern kein Kartentext oder Status dies verhindert.

---

# 8. Schaden und Zerstörung

Eine Einheit besitzt einen aktuellen Stabilitätswert und einen maximalen Stabilitätswert.

Eine Einheit ist:

- unbeschädigt, solange sie ihre maximale Stabilität besitzt;
- beschädigt, sobald ihre aktuelle Stabilität unter den Maximalwert fällt;
- zerstört, sobald ihre Stabilität 0 erreicht.

Bei 0 Stabilität wird die Einheit unmittelbar vom Spielfeld entfernt.

Normalerweise geht sie anschließend in den Ablagestapel/Friedhof.

Einheiten rücken durch das Zerstören eines Gegners nicht automatisch vor.

---

# 9. Moral

Moral ist ein separates Merkmal einer Einheit.

Es gibt fünf normale Moralstufen:

1–5

Zusätzlich:

> 0 = gebrochen

Aktuelle Kampfmodifikatoren:

| Moral | Angriff | Verteidigung |
|---|---:|---:|
| 5 | +1 | +1 |
| 4 | +0 | +1 |
| 3 | +0 | +0 |
| 2 | -1 | +0 |
| 1 | -1 | -1 |
| 0 | gebrochen | gebrochen |

## 9.1 Moraländerungen

Aktuelle Auslöser:

- Einheit erleidet Schaden → Moral -1
- Einheit zerstört eine gegnerische Einheit → Moral +1
- benachbarte eigene Einheit wird zerstört → Moral -1
- beide Flanken einer Einheit werden unterstützt → Moral +1

Moral ist auf den Bereich 0–5 begrenzt.

## 9.2 Gebrochene Moral

Bei Moral 0 gilt die Einheit als gebrochen.

Aktuelle Arbeitsregel:

> Eine gebrochene Einheit wird auf den oben liegenden Platz des eigenen Nachziehstapels gelegt.

Sie wird nicht gemischt.

Die genaue Interaktion mit bereits bestehendem Schaden und zukünftiger Regeneration bleibt playtestabhängig.

---

# 10. Eigenschaften

Eigenschaften sind überwiegend passive Merkmale einer Karte.

Beispiele:

- Tarnung
- Deckung
- Standfest
- Schwer gepanzert
- Fanatisch
- Veteran
- Späher

Eigenschaften beschreiben, was eine Einheit ist oder welchen passiven Zustand sie besitzt.

Es gibt keine feste Pflichtzahl an Eigenschaften.

---

# 11. Fähigkeiten

Fähigkeiten beschreiben, was eine Karte tun kann.

Sie können aktiv oder automatisch/passiv ausgelöst sein.

Beispiele:

> Aufklärung (1 AP): Decke zwei verdeckte Feinde auf.

oder:

> Wenn diese Einheit gegen eine gepanzerte Einheit kämpft, erhält sie +2 Angriff.

Fähigkeiten können eigene Kosten, Bedingungen und Ausnahmen besitzen.

---

# 12. Verdeckte Karten

Karten können, sofern ihr Kartentext dies erlaubt, verdeckt gespielt werden.

Eine verdeckte Einheit:

- ist dem Gegner zunächst unbekannt;
- kann grundsätzlich nicht normal angreifen;
- kann durch Aufklärung aufgedeckt werden;
- kann durch spezielle Karteneffekte anders behandelt werden.

Verdeckte Einheiten bleiben Teil des Spiels und können durch bestimmte Effekte angegriffen oder beeinflusst werden.

Die genaue Behandlung eines Angriffs gegen ein nicht aufgeklärtes Ziel wird durch den endgültigen Kampfkern festgelegt.

## 12.1 Verdeckte Einsätze / Fallen

Bestimmte Einsätze können verdeckt in der Support-Zone liegen.

Sie werden durch Trigger oder einen geeigneten Zeitpunkt aufgedeckt und aktiviert.

Es gibt keine allgemeine Beschränkung auf zwei Fallen.

---

# 13. Unterstützung

Unterstützung wird in der Support-Zone ausgespielt.

Sie bleibt grundsätzlich liegen, bis sie:

- zerstört,
- entfernt,
- zurückgenommen
- oder vorübergehend deaktiviert

wird.

Unterstützung kann dauerhaft wirken oder aktivierbare Fähigkeiten besitzen.

Beispiele:

- Artillerie
- Radar
- Aufklärung
- Logistik
- Reparatur
- Kommunikation
- Befestigung
- Luftverteidigung
- politische/diplomatische Einrichtungen

Eine Unterstützung kann gleichzeitig mehrere Funktionen besitzen.

---

# 14. Inaktiv

Eine Karte kann den Zustand inaktiv erhalten.

Eine inaktive Karte bleibt im Spiel, aber ihre Fähigkeiten bzw. definierten Effekte gelten vorübergehend nicht.

Beispiel:

> Diese Unterstützung ist inaktiv, solange …

Inaktiv ist nicht dasselbe wie zerstört.

---

# 15. Reparatur und Rückzug

Einheiten können durch Karteneffekte aus der Front in die Support-Zone zurückgezogen werden.

Dort können sie z. B.:

- repariert,
- geheilt,
- gewartet
- oder für einen Zeitraum aus dem Gefecht genommen

werden.

Ein Karteneffekt kann eine Rückkehr auf die frühere Stellung erlauben.

Wenn eine Einheit nur vorübergehend zur Reparatur zurückgezogen wird, bleibt ihre Ausrüstung grundsätzlich bei ihr.

---

# 16. Ausrüstung

Eine Einheit kann beliebig viele Ausrüstungskarten tragen.

Ausrüstung kann beispielsweise:

- Angriff erhöhen
- Verteidigung erhöhen
- Heilung ermöglichen
- Tarnung ermöglichen
- Mobilität verbessern
- besondere Reaktionen oder Schutzmechaniken erzeugen

Ausrüstung kostet AP.

Die endgültige Kostenstruktur für Ausrüstung ausspielen und Ausrüsten muss noch festgelegt werden.

## 16.1 Zerstörung des Trägers

Wird eine Einheit zerstört, wird ihre Ausrüstung grundsätzlich ebenfalls zerstört.

Ausnahmen können ausdrücklich durch:

- die Ausrüstung,
- die Einheit,
- oder den zerstörenden Effekt

definiert werden.

## 16.2 Rückkehr auf die Hand

Wird eine ausgerüstete Einheit auf die Hand zurückgebracht:

> Ihre Ausrüstung wird in die Support-Zone des Besitzers gelegt.

Die Ausrüstung muss nicht erneut als völlig neue Karte gespielt werden, kann aber später erneut ausgerüstet werden.

---

# 17. Einsätze / Soforteinsätze

Einsätze repräsentieren unmittelbare Handlungen und Ereignisse des Konflikts.

Beispiele:

- Luftschlag
- Raketenangriff
- Artillerieeinsatz
- Sabotage
- Aufklärung
- Mobilisierung
- Gegenmaßnahme
- Putsch
- Offensive
- Rückzug
- diplomatischer Eingriff

Einsatz bezeichnet vor allem eine mechanische Kategorie und nicht ausschließlich eine bestimmte militärische Handlung.

---

# 18. Reaktionen und Stack

Einsätze können Reaktionen auslösen.

Ein Spieler darf reagieren, wenn:

- ein passender Kartentext vorhanden ist;
- die nötigen Kosten bezahlt werden können;
- die Karte bzw. Fähigkeit unter den bestehenden Bedingungen gespielt werden darf.

Es gibt eine Reaktions-/Stack-Logik.

Der Gegner ist dabei nicht gezwungen, thematisch dieselbe Art von Einsatz zu spielen.

Beispiel:

Ein Spieler startet einen Luftangriff.

Der Gegner kann mit einer Luftabwehr reagieren oder – sofern Kartentext und AP dies erlauben – mit einer völlig anderen militärischen Maßnahme antworten.

Reaktionen benutzen grundsätzlich dieselbe AP-Ökonomie wie normale Aktionen.

---

# 19. Zugstruktur

Der Zug ist bewusst frei aufgebaut.

Grundstruktur:

## 1. AP erhalten

Der aktive Spieler erhält sein reguläres AP-Einkommen.

## 2. Karte ziehen

Der aktive Spieler zieht normalerweise eine Karte.

## 3. Freie Aktionsphase

Der aktive Spieler darf beliebig viele erlaubte Aktionen durchführen, solange Kosten und Bedingungen erfüllt sind.

Mögliche Aktionen:

- Einheit spielen
- Unterstützung spielen
- Ausrüstung spielen
- ausrüsten
- angreifen
- Fähigkeit aktivieren
- Einsatz spielen
- reagieren
- andere durch Kartentext definierte Aktionen

Die Reihenfolge ist frei.

Ein Spieler kann beispielsweise:

> Einheit → Angriff → Einsatz → Unterstützung → Fähigkeit → weitere Einheit

in demselben Zug durchführen.

Es gibt keine allgemeine Regel nur eine Aktion pro Kartentyp.

---

# 20. AP

AP ist die zentrale Aktionsressource.

Vorläufige Grundregel:

> Zu Beginn des eigenen Zuges erhält der Spieler 5 AP.

AP kann für normale Kartenaktionen und Reaktionen verwendet werden.

AP kann durch Karten:

- gewonnen,
- zurückgewonnen,
- gespeichert,
- reduziert
- oder durch Kostenreduktion effizienter genutzt

werden.

## 20.1 AP-Speicherung

Der aktuelle Arbeitsstand erlaubt:

> Nicht ausgegebene AP bleiben erhalten.

Dadurch kann ein Spieler auf eine größere Ausgabe sparen.

Beispiel:

Zug 1: 5 AP erhalten, 2 ausgegeben → 3 AP bleiben.

Zug 2: +5 AP → 8 AP verfügbar.

Ein maximales AP-Speicherlimit ist noch nicht endgültig entschieden.

Ein Limit von 10 AP ist nur eine mögliche Playtest-Annahme.

## 20.2 AP-Kostenbereich

Der aktuelle Balance-Arbeitsrahmen:

| Kosten | grobe Funktion |
|---:|---|
| 0 | enge Reaktion / kleiner bzw. stark bedingter Effekt |
| 1 | einfache Aktion |
| 2 | kleine bis solide Wirkung |
| 3 | starke Standardkarte |
| 4 | starke/komplexe Karte |
| 5 | sehr starke Karte |
| 6 | große operative Wirkung |
| 7 | außergewöhnliche Schlüsselkarte |
| 8+ | seltene Großereignisse |

Diese Werte sind Balance-Richtwerte und keine verbindliche Kostenformel.

---

# 21. Bronze / Silber / Gold

Bronze, Silber und Gold sind zunächst mechanische Bedeutungsklassen, nicht automatisch Seltenheiten.

## Bronze

Typischerweise:

- lokal
- einfach
- stark situativ
- einzelne Einheit oder einzelnes Ziel
- kleine kurzfristige Wirkung

Grundgedanke:

> Ich mache eine konkrete Sache.

## Silber

Typischerweise:

- taktische Wirkung
- mehrere Einheiten
- Gefecht oder kleiner Frontbereich
- dauerhafter kleiner/mittlerer Vorteil
- relevante Informations- oder Ressourceneffekte

Grundgedanke:

> Ich beeinflusse ein Gefecht.

## Gold

Typischerweise:

- operative Wirkung
- große Teile der Front
- Support-Zone
- große Ressourcenwirkung
- großer Kartenvorteil
- erheblicher Board-Swing
- starke Masseneffekte
- starke Änderung des Spielzustandes

Grundgedanke:

> Ich verändere die operative Lage.

Gold muss nicht zwingend die gesamte Front betreffen. Auch die Veränderung einer zentralen Spielregel oder der gesamten Ressourcenökonomie kann Gold sein.

---

# 22. Elite

Elite ist keine vierte lineare Stufe oberhalb von Gold.

Elite ist eine separate Dimension.

Grundidee:

> Eine Elitekarte führt eine besondere Regel oder Kampfweise ein bzw. verändert die Art, wie Krieg geführt wird.

Eine Karte kann deshalb gleichzeitig sein:

- Bronze + Elite
- Silber + Elite
- Gold + Elite

Das bisherige Elite-Tag älterer Kartensätze gilt nicht automatisch als endgültige Elite-Einstufung.

---

# 23. Kartenhand und Deck

## 23.1 Starthand

Der Spieler beginnt mit:

> 7 Karten

## 23.2 Normales Ziehen

Normalerweise:

> 1 Karte pro eigenem Zug

Karteneffekte können zusätzliche Karten ziehen.

## 23.3 Handlimit

Aktueller Arbeitsstand:

> 7 Karten

Die genaue Abwicklung beim Überschreiten des Limits ist noch zu konkretisieren.

## 23.4 Mulligan

Aktuelle Arbeitsregel:

> Eine neue Starthand mit 7 Karten kann gezogen werden; dafür werden 1 AP bezahlt.

Die genaue Reihenfolge zwischen AP-Zuweisung und Mulligan ist noch nicht endgültig formalisiert.

## 23.5 Leerer Nachziehstapel

Wenn der Nachziehstapel leer ist:

> Ablagestapel mischen und als neuen Nachziehstapel verwenden.

Es gibt kein normales Deck-out-Verlieren.

## 23.6 Entfernen aus dem Spiel

Karten bleiben grundsätzlich im normalen Kreislauf, sofern ein Effekt nicht ausdrücklich sagt, dass sie entfernt und außerhalb des Spiels gehalten werden.

---

# 24. Deckbau

Empfohlene Hauptdeckgröße:

> ca. 60 Karten

Die 60 Karten sind ein Richtwert und kein zwingendes hartes Minimum.

Das System soll grundsätzlich freie Deckkonstruktion erlauben, sofern der endgültige Kartentext keine zusätzlichen Beschränkungen erzeugt.

## 24.1 Doktrinen

Jedes Deck besitzt:

> genau 2 Doktrinen

Doktrinen befinden sich nicht im normalen Hauptdeck.

Beide Doktrinen sind zu Spielbeginn aktiv.

Sie müssen nicht erst bezahlt oder aus der Hand gespielt werden.

Die beiden Doktrinen dürfen frei kombiniert werden.

---

# 25. Doktrinen

Doktrinen bestimmen die strategische Identität eines Decks.

Sie können:

- dauerhafte Effekte verleihen
- Grundregeln verändern
- Kartensynergien erzeugen
- AP beeinflussen
- bestimmte Spielweisen fördern
- Siegpunktbedingungen definieren

Doktrinen können vorübergehend deaktiviert werden.

Sie können grundsätzlich nicht dauerhaft zerstört oder aus dem Spiel entfernt werden.

Endet die Deaktivierung, wird die Doktrin wieder aktiv.

---

# 26. Siegpunkte

Der Sieg soll über Siegpunkte (SP) erreicht werden.

Jeder SP entsteht durch das Erfüllen einer besonderen Bedingung bzw. Leistung.

Beispiele:

- bestimmte gegnerische Einheiten zerstören
- bestimmte Operationen durchführen
- strategische Bedingungen erfüllen
- Elite-/Doktrinenbedingungen erfüllen
- diplomatische Leistungen erreichen

Einsätze sollen nicht einfach ohne Bedingung „+1 SP“ geben.

Ein bereits gewonnener SP bleibt grundsätzlich erhalten, sofern ein Effekt ausdrücklich sagt, dass SP entfernt, gestohlen oder verändert werden.

## 26.1 Siegschwelle

Aktueller Arbeitswert:

> 10 SP

Die endgültige Siegschwelle bleibt playtestabhängig.

---

# 27. Heimatfront / Wille des Volkes

Die Heimatfront bzw. der Wille des Volkes ist eine mögliche zusätzliche strategische Ressource bzw. Zustandsgröße.

Sie ist ausdrücklich nicht die alleinige Siegbedingung.

Sie kann durch Karteneffekte:

- erhöht
- gesenkt
- genutzt
- sabotiert
- manipuliert

werden.

Die endgültige Implementierung als feste Ressource ist noch offen.

---

# 28. Versorgung

Eine zweite Ressource namens Versorgung wurde als mögliche Erweiterung diskutiert.

Gedanke:

- AP bezahlt Aktionen;
- Versorgung könnte vor allem Kampfhandlungen und Fähigkeiten finanzieren;
- nicht verbrauchte Versorgung könnte gespeichert werden;
- Support kann Versorgung erzeugen oder verbrauchen.

Die konkrete Anwendung ist noch nicht endgültig entschieden.

Die aktuelle AP-Regelung bildet deshalb den primären Ressourcenrahmen.

---

# 29. Karteffekte und Komplexität

Karten dürfen:

- numerische Modifikatoren
- Bedingungen
- Trigger
- Reaktionen
- dauerhafte Effekte
- mehrere unabhängige Optionen

enthalten.

Die Grundregeln sollen trotzdem klein bleiben.

Komplexität soll überwiegend durch:

- Karteninteraktionen
- Synergien
- Positionierung
- Reaktionen
- Doktrinen
- Elitekarten

entstehen.

Eine Karte soll nicht unnötig zu einer Checkliste aus vielen Bedingungen werden.

---

# 30. Kartendesign – Stufen und Kosten getrennt

Die zentrale Balance-Regel lautet:

> Bronze/Silber/Gold und AP-Kosten sind zwei getrennte Achsen.

Eine Goldkarte kann aufgrund einer engen Bedingung relativ günstig sein.

Eine einfache Bronze-Karte kann aufgrund außergewöhnlich hoher Grundwerte relativ teuer sein.

AP-Kosten richten sich nach der tatsächlichen Gesamtwirkung.

Bei der Bewertung zählen insbesondere:

1. Grundwerte
2. Wirkungsumfang
3. Effektqualität
4. Dauer
5. Wiederholbarkeit
6. Karten-/AP-Vorteil
7. Tempo
8. Regeländerungen
9. Risiko und Gegenleistung
10. mögliche Synergien

---

# 31. Playtest-Grundlage

Der erste ernsthafte Testpool soll nicht sofort 500 Karten enthalten.

Arbeitsziel:

> 160–200 Karten

Zielverteilung:

| Kartentyp | Zielbereich |
|---|---:|
| Einheiten | 50–60 |
| Unterstützung | 40–50 |
| Einsätze | 45–55 |
| Ausrüstung | 15–20 |
| Doktrinen | 10–15 |
| Gesamt | 160–200 |

Die aktuell vorhandenen Karten sind deshalb zunächst Designanker und Prototypen.

Der Ausbau soll vor allem Varianten bestehender Mechaniken liefern, damit AP-Kosten und Effektstärke durch vergleichende Playtests kalibriert werden können.

---

# 32. Wichtige noch offene Punkte

## AP

- endgültige AP-Erzeugung
- endgültiges Speicherlimit
- genaue Wirkung von AP-Generierung
- endgültige Kostenkurve
- Kosten von Ausrüstung und Ausrüsten

## Kampf

- endgültige Schadensformel
- genaue Gegenangriffssequenz
- genaue Reichweitenregeln
- endgültiger Unsicherheits-/Verdecktheitsmalus

## Moral

- Feinabstimmung des Zustands gebrochen
- genaue Interaktion mit Heilung und Rückkehr

## Sieg

- endgültige SP-Schwelle
- finale SP-Bedingungen
- endgültige SP-Verlust-/Stehlmechaniken

## Versorgung

- Entscheidung, ob sie als zweites Ressourcensystem überhaupt eingeführt wird

## Deck

- endgültige Mindestgröße
- endgültige Kopienlimits
- endgültiges Handlimit und Mulliganverfahren

## Elite

- endgültige Definition
- konkrete Elite-Regeln

## Bewegung

- endgültiger Umfang spezieller Bewegungsfähigkeiten

---

# 33. Leitgedanke des Regelwerks

Die zentrale Designidee lautet:

> Der Spieler soll viele Dinge tun können, aber nicht alles gleichzeitig bezahlen können.

AP bestimmt deshalb hauptsächlich das Tempo und die Menge der Aktionen.

Karten bestimmen:

- was möglich ist,
- welche Wechselwirkungen entstehen,
- wie Front und Support zusammenarbeiten,
- welche Risiken eingegangen werden,
- und welche strategischen Möglichkeiten ein Deck besitzt.

Die Tiefe des Spiels soll primär aus Entscheidungen und Karteninteraktionen entstehen und nicht aus einer großen Anzahl separater Grundsysteme.

---

## Versionsstatus

**v0.5 „Grundkonzept“**

Dieses Dokument ist eine Zusammenfassung des bisher diskutierten Regelstands. Es ersetzt keine späteren Playtest-Änderungen.

Bei Änderungen sollen möglichst neue Versionen angelegt werden, sodass die Entwicklung der Regeln nachvollziehbar bleibt.
