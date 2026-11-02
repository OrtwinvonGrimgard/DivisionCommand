# Division Command – Balance- und Kartenplan v0.1

Stand: 2026-09-27

Diese Datei ist die zentrale Arbeitsgrundlage für den Aufbau des Kartensets und die spätere Neubewertung von Karten. Sie soll auch außerhalb des aktuellen Gesprächs verständlich machen, **wie viele Karten zunächst benötigt werden, wie sie verteilt werden und nach welchen Kriterien AP-Kosten sowie Bronze/Silber/Gold vergeben werden**.

Sie ergänzt den konkreten ersten Kostenpass in `BALANCE_AP_STUFEN_v0.1.md`.

---

## 1. Ziel des Kartenpools

Für den ersten ernsthaften Playtest soll der Kartenbestand zunächst auf ungefähr **160–200 Karten** wachsen.

Die aktuellen Karten bilden bereits die grobe Idee und das gewünschte Spektrum des Spiels ab, sind aber noch zu eng besetzt: viele Mechaniken existieren nur in einer einzigen Ausprägung. Dadurch lassen sich Kosten, Stärke und AP-Ökonomie noch nicht zuverlässig vergleichen.

Der erste Playtestpool soll daher **nicht möglichst viele neue Einzelideen**, sondern vor allem **Varianten bereits bestehender Mechaniken und Rollen** enthalten.

Ziel:

> Erst einen ausreichend breiten Testpool herstellen, dann über Playtests die Kostenstruktur und AP-Ökonomie kalibrieren.

500 Karten sind das langfristige Ziel des vollständigen Spiels, aber **500 Karten werden nicht benötigt, bevor sinnvoll getestet werden kann**.

---

## 2. Zielverteilung für den ersten Playtestpool

| Kartentyp | Zielbereich | Funktion |
|---|---:|---|
| **Einheiten** | **50–60** | Hauptkörper des Spiels; Front, Gefecht, Spezialrollen |
| **Unterstützung** | **40–50** | langfristige Infrastruktur, Aufklärung, Logistik, Verteidigung, Kommando |
| **Einsätze / Soforteinsätze** | **45–55** | unmittelbare Aktionen, Reaktionen, Angriffe, Gegenmaßnahmen |
| **Ausrüstung** | **15–20** | dauerhafte oder situative Modifikation einzelner Einheiten |
| **Doktrinen** | **10–15** | strategische Deckidentität und Regeländerungen |
| **Gesamt** | **160–200** | erster breiter Testpool |

Die Bereiche sind **Zielkorridore und keine harten Deckbauregeln**.

Der aktuelle Bestand:

- 23 Einheiten
- 22 Unterstützung
- 34 Soforteinsätze
- 5 Ausrüstung
- 4 Doktrinen
- **88 Karten gesamt**

---

## 3. Warum Varianten wichtiger sind als nur neue Ideen

Der Pool soll schrittweise durch **Effektfamilien** erweitert werden.

Beispiel:

### Angriff

Nicht nur eine Karte mit `+2 Angriff`, sondern mehrere Varianten:

- +1 Angriff auf 1 Einheit
- +2 Angriff auf 1 Einheit
- +1 Angriff auf 2 Einheiten
- +1 Angriff auf alle Infanteristen
- +1 Angriff auf die gesamte Front
- +2 Angriff nur gegen einen bestimmten Einheitentyp
- Angriff als Reaktion
- Angriff mit anschließendem Nachteil
- Angriff gekoppelt an Opfer
- Angriff gekoppelt an Aufklärung

Damit kann im Playtest geprüft werden, **welche Wirkung bei welchen AP-Kosten tatsächlich sinnvoll ist**.

Dasselbe Prinzip gilt für:

- Schaden
- Heilung/Reparatur
- Aufklärung
- Verschleierung
- Kartenziehen
- AP-Gewinn
- AP-Reduktion
- Rückholung
- Bewegung
- Flankeneffekte
- Deaktivierung
- Zerstörung
- Schutz
- kostenlose Aktionen
- Massenwirkungen

---

# 4. AP-Grundstruktur – vorläufig

Die aktuelle Arbeitsannahme lautet:

> **Zu Beginn des eigenen Zuges erhält der Spieler 5 AP.**

Weitere vorläufige Annahmen:

- Nicht ausgegebene AP dürfen zunächst gespeichert werden.
- Für frühe Tests kann ein gleichzeitiges Speicherlimit von **10 AP** verwendet werden.
- Das AP-Limit ist eine **Testannahme**, keine endgültige Regel.
- Reaktionen verwenden dieselbe AP-Reserve.
- AP kann durch Karten, Unterstützungen, Fähigkeiten oder Einsätze zusätzlich erzeugt bzw. zurückgewonnen werden.
- AP-Erzeugung ist noch **nicht abschließend balanciert** und muss durch Playtests kalibriert werden.

Wichtig:

> **5 AP sind das normale Einkommen, nicht automatisch die maximale AP-Menge eines Zuges.**

Dadurch können Karten im Bereich 6–8+ AP existieren, ohne grundsätzlich unspielbar zu sein.

---

# 5. AP-Kosten – Bewertungslogik

Die AP-Kosten einer Karte werden **nicht direkt aus Bronze/Silber/Gold abgeleitet**.

Eine Karte erhält ihre AP-Kosten nach ihrer tatsächlichen Gesamtwirkung.

Dafür werden insbesondere diese Faktoren bewertet:

### 5.1 Grundwerte

Bei Einheiten:

- Angriff
- Verteidigung/Stabilität
- Verhältnis von Grundwerten zu AP-Kosten
- Einheitentyp und typische Widerstandsfähigkeit

Ein hoher Grundkörper allein kann bereits mehrere AP rechtfertigen.

### 5.2 Wirkungsumfang

Wie viele Objekte können betroffen sein?

- 1 Einheit
- mehrere Einheiten
- ein Frontabschnitt
- gesamte Front
- Support
- Hand
- Deck
- beide Seiten
- gesamtes Spielfeld

Je größer der Wirkungsbereich, desto höher grundsätzlich das Kostenpotenzial.

### 5.3 Wirkungsqualität

Nicht jeder Bonus mit gleichem Zahlenwert besitzt dieselbe Stärke.

Besonders starke Effekte sind:

- Zerstören statt nur Schaden
- kostenloses Ausspielen
- kostenlose Angriffe
- vollständige Schadensvermeidung
- Ausschalten gegnerischer Aktionen
- dauerhafte Kostenreduktion
- dauerhafter AP-Zuwachs
- Kartenvorteil
- vollständige oder nahezu vollständige Board-Resets
- Regeländerungen

### 5.4 Dauer

Bewertet wird:

- einmalig
- bis Zugende
- bis zum nächsten Zug
- mehrere Züge
- dauerhaft

Ein dauerhafter Effekt ist grundsätzlich deutlich teurer zu behandeln als derselbe Effekt für eine einzelne Aktion.

### 5.5 Wiederholbarkeit

Kann der Effekt:

- nur einmal wirken?
- einmal pro Zug?
- jedes Mal bei einer Bedingung?
- beliebig oft aktiviert werden?

Wiederholbare Effekte erzeugen schnell einen höheren effektiven Kartenwert und müssen entsprechend bepreist werden.

### 5.6 Ressourcenwert

Neben Kampfwerten zählen:

- zusätzliche Karten
- Decksuche
- AP-Gewinn
- AP-Ersparnis
- Kostenreduktion
- Rückgewinnung verlorener Karten
- dauerhafte ökonomische Vorteile

Eine Karte kann dadurch teuer sein, obwohl sie keinen direkten Kampfschaden verursacht.

### 5.7 Tempo

Eine Karte ist stärker, wenn sie den normalen AP- und Aktionsrhythmus umgeht.

Besonders kritisch:

- kostenlose Einheiten
- kostenlose Angriffe
- zusätzliche Aktionen
- Rückerstattung von AP
- mehrere starke Effekte innerhalb eines normalen Zuges

### 5.8 Risiko und Gegenleistung

Ein starker Effekt darf durch einen echten Preis günstiger werden:

- eigene Einheit opfern
- eigene Front schwächen
- Karten abwerfen
- Schaden an eigenen Einheiten
- starke Bedingung
- zeitliche Verzögerung
- hohe AP-Kosten
- Gegenrisiko für den eigenen Spieler

Der Preis muss dabei real und spielrelevant sein.

---

# 6. AP-Kosten – vorläufige Bereiche

Dies sind **Orientierungsbereiche**, keine feste Kostenformel.

| AP | typische Rolle |
|---:|---|
| **0** | enge Reaktion, sehr kleiner oder stark bedingter Effekt |
| **1** | einfache taktische Aktion / billiger Grundkörper |
| **2** | kleine bis solide Standardwirkung |
| **3** | starke Standardkarte / Hauptbereich des Spiels |
| **4** | starke Karte oder mehrere relevante Effekte |
| **5** | sehr starke Karte / hoher Grundkörper / langfristiger Wert |
| **6** | große operative Wirkung |
| **7** | außergewöhnlich starke Schlüsselkarte |
| **8+** | Großereignis, massiver Spielzustandswechsel oder Ausnahmeeffekt |

### Zentrale Regel

> **AP-Kosten werden individuell bewertet.**

Es gibt keine Regel:

> Bronze = 1 AP  
> Silber = 2 AP  
> Gold = 3 AP

Ebenso wenig gilt:

> Gold muss immer teurer sein als Silber.

Eine sehr konditionale Goldkarte kann günstiger sein als eine extrem effiziente Silberkarte.

---

# 7. Bronze / Silber / Gold – Bewertungslogik

Die Stufen beschreiben **mechanische Bedeutung**, nicht Seltenheit.

## Bronze

Eine Bronze-Karte ist typischerweise:

- lokal
- einfach
- stark auf eine Situation begrenzt
- überwiegend auf eine Einheit oder ein einzelnes Ziel ausgerichtet
- leicht verständlich
- ohne großen dauerhaften Einfluss auf die Spielökonomie

Typischer Gedanke:

> **„Ich mache eine konkrete Sache.“**

Bronze darf trotzdem effizient oder gefährlich sein.

---

## Silber

Eine Silber-Karte besitzt typischerweise:

- taktische Mehrzielwirkung
- Einfluss auf mehrere Einheiten
- Einfluss auf ein Gefecht oder einen Frontabschnitt
- dauerhaften kleinen bis mittleren Vorteil
- starke Synergie
- relevante Informations- oder Ressourcenwirkung

Typischer Gedanke:

> **„Ich beeinflusse ein Gefecht oder einen taktischen Teil der Front.“**

---

## Gold

Eine Gold-Karte besitzt typischerweise:

- operative Wirkung
- große Reichweite
- Wirkung auf große Teile der Front oder Supportzone
- erheblichen Karten- oder AP-Vorteil
- sehr starken dauerhaften Wert
- starken Board-Swing
- sehr starke Massenwirkung
- deutliche Veränderung des Spielzustands

Typischer Gedanke:

> **„Ich verändere die operative Lage.“**

Gold bedeutet **nicht zwingend** „gesamte Front“.

Auch ein einzelner Effekt kann Gold sein, wenn er beispielsweise eine zentrale Spielregel oder die gesamte Ressourcenökonomie stark beeinflusst.

---

# 8. Elite – separate Dimension

**Elite ist keine vierte lineare Stufe nach Gold.**

Elite beschreibt eine andere Frage:

> **Verändert die Karte die Art, wie Krieg bzw. Kampf im Spiel funktioniert?**

Eine Elitekarte kann deshalb beispielsweise sein:

- Bronze + Elite
- Silber + Elite
- Gold + Elite

Das bisher im Code vorhandene `elite`-Tag wird daher **nicht automatisch als endgültige Elite-Einstufung übernommen**.

Elite soll separat neu bewertet werden.

Beispiele für mögliche Elite-Auswirkungen:

- besondere Kampfabläufe
- besondere Reaktionsregeln
- außergewöhnliche Flankenregeln
- besondere Angriffs-/Verteidigungslogik
- einzigartige Interaktion mit Front, Support oder Doktrinen

---

# 9. Bewertung nach Kartentyp

## Einheiten

Bei Einheiten werden besonders gewichtet:

1. Grundwerte
2. AP-Kosten
3. Reichweite/Zielauswahl
4. Kampfeffizienz
5. passive Eigenschaften
6. wiederholbare Fähigkeiten
7. Positionierungs-/Flankeneffekte
8. Verschleierung/Aufklärung
9. zusätzliche Aktionsmöglichkeiten

Eine Einheit mit schwachen Grundwerten kann trotzdem teuer sein, wenn sie eine starke taktische Regel mitbringt.

---

## Unterstützung

Bei Unterstützung zählen besonders:

1. dauerhafte Wirkung
2. Reichweite der Aura
3. Aktivierungskosten
4. Wiederholbarkeit
5. AP-/Kartenvorteil
6. Schutz vor gegnerischen Aktionen
7. Synergien mit mehreren Kartentypen

Dauerhafte Ressourcen- oder Kostenänderungen müssen besonders vorsichtig bewertet werden.

---

## Einsätze / Soforteinsätze

Hier zählen besonders:

1. unmittelbare Wirkung
2. Reaktionsgeschwindigkeit
3. Zielumfang
4. Schadens-/Zerstörungspotenzial
5. Möglichkeit, AP-Aktionen zu umgehen
6. Board-Swing
7. Gegenreaktionsmöglichkeiten
8. Bedingungen und Risiken

0 AP bleibt für Soforteinsätze möglich, ist aber **keine automatische Eigenschaft des Kartentyps**.

---

## Ausrüstung

Hier zählen besonders:

1. Kosten des Ausspielens
2. Kosten und Aufwand des Ausrüstens
3. dauerhafter Wert
4. Zahl der betroffenen Einheiten
5. Synergie mit bestimmten Einheiten
6. Wiederherstellungs-/Heilwert
7. Verlust der Ausrüstung bei Zerstörung des Trägers
8. Möglichkeit der späteren Wiederverwendung

---

## Doktrinen

Doktrinen sind ein Sonderfall.

Sie werden nicht wie normale Karten über AP-Kosten bewertet, da sie die strategische Identität eines Decks bestimmen.

Bei Doktrinen werden stattdessen besonders bewertet:

- Reichweite der Regeländerung
- Dauer
- Häufigkeit der Wirkung
- Anzahl betroffener Kartentypen
- Ressourcenwirkung
- Synergiebreite
- mögliche Gegenmaßnahmen
- Einfluss auf Siegpunktbedingungen

---

# 10. Kartenfamilien für den Ausbau auf 160–200

Beim Ausbau sollen vorhandene Mechaniken systematisch vervielfacht werden.

Priorität:

### Einheiten
Mehrere Ausprägungen von:

- Infanterie
- Rad
- Kette
- Schwere Kette
- Aufklärung
- Panzerabwehr
- Artillerie
- mechanisierter Infanterie
- Kommando
- defensive Stellung
- mobile Einheit

### Unterstützung
Mehrere Ausprägungen von:

- Logistik
- Aufklärung
- Luftverteidigung
- Befestigung
- Reparatur
- Kommando
- Kommunikation
- Propaganda
- Diplomatie
- elektronische Kriegsführung

### Einsätze
Mehrere Ausprägungen von:

- Schaden
- Zerstörung
- Schutz
- Konter
- Mobilisierung
- Aufklärung
- Rückzug
- Verschleierung
- Massenangriff
- Ressourcenmanipulation
- Opfermechaniken
- Luftangriffe

### Ausrüstung
Mehrere Ausprägungen von:

- Angriff
- Verteidigung
- Heilung
- Tarnung
- Gegenangriff
- Mobilität
- Flanke
- Aufklärung
- Spezialschutz

### Doktrinen
Mehrere strategische Richtungen, ohne sie auf einfache „Angriff = gut / Verteidigung = schlecht“-Schablonen zu reduzieren.

---

# 11. Was der erste Playtest leisten soll

Der erste Playtest soll **nicht** beweisen, dass alle 160–200 Karten perfekt balanciert sind.

Er soll beantworten:

- Ist 5 AP als Grundeinkommen passend?
- Fühlt sich AP-Sparen gut an?
- Wie oft kommen Spieler überhaupt zu 6–8 AP?
- Sind 0-AP-Einsätze zu häufig?
- Welche Effekte erzeugen zu viel Kartenvorteil?
- Welche Effekte erzeugen zu viel AP-Vorteil?
- Wie wertvoll ist dauerhafte Unterstützung?
- Wie stark ist eine frontweite Wirkung?
- Wie wertvoll sind Aufklärung und Verschleierung?
- Welche Kartenarten werden systematisch über- oder unterschätzt?

Danach werden Kosten und gegebenenfalls Kartentexte angepasst.

---

# 12. Grundsatz für die weitere Entwicklung

Die Reihenfolge soll sein:

**Mechanik → Varianten → Kartenpool → Playtest → Kostenanpassung → erneuter Playtest → erst danach endgültige Seltenheit/Verteilung.**

Die bisherigen Karten sind deshalb **Prototypen und Designanker**, keine fertigen Balancingwerte.

---

## Verwandte Datei

Der konkrete erste Kostenpass für den bestehenden Kartenbestand liegt in:

`KartenEditor/BALANCE_AP_STUFEN_v0.1.md`

Dort stehen die aktuell vorgeschlagenen AP-Kosten und die konkrete Bronze-/Silber-/Gold-Einstufung für den vorhandenen Kartenpool.
