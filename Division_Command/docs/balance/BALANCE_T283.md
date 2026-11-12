# Balance t283 (Version 0.6c)

Messung: Bot gegen Bot (t254-Bot), gleicher Aufbau vorher/nachher (`tmp_t283/sim.js`, `sim_doc.js`), 20 Partien je gerichtetem Nationenpaar = 4.800 Partien je Modus. Der Bot würfelt mit `Math.random`. Das Messrauschen liegt bei etwa ±2 Punkten je Nation und ±2,2 Punkten je Doktrin (32 Partien je Nation und Seite).
„Vorher“ ist der Stand nach Etappe 2 (Mulligan, 60 + 2, 5 AP für beide in Zug 1), gemessen am 12.11.2026.

Hinweis: Die Hilfe nannte seit t268 „alle Nationen 48–52 %“. Dieser Wert stammt aus einem anderen Messaufbau. Mit den t283-Regeln (Mulligan, 60-Karten-Decks) und diesem Aufbau lag die Spanne schon vorher deutlich breiter (siehe Tabelle). Die Hilfe nennt jetzt die t283-Werte.

## Was geändert wurde
* **AP-Reserve (RULES §20.1):** Übrige AP verfallen zu Beginn des eigenen Zuges und dienen nur als Reaktionsreserve. Kein Ansparen. Daher wurden alle Karten mit 6+ AP auf 5 AP gesetzt, damit sie überhaupt spielbar sind: Faustkeil 5/6/5, Koloss 5/6/5, Armageddon, Blinder Gehorsam, Dammbruch, Einsame Gassen, Psychologie der Massen, Messnetz, Klinikverfahren, Desinformationsnetz, Wall der Gefallenen.
* **Doktrinen:**
  * Bollwerk: +1 DEF für alle eigenen Einheiten; Schutzwall ist vollständig umgesetzt (2 AP, 1× pro Zug, Befestigung aus dem Ablagestapel).
  * Gepanzerter Fuß: Grund +1 DEF, Ausgerüstete +1 ATK.
  * Marsch aus dem Vollen: beim Einrücken dauerhaft +1 DEF.
  * Normverband: Text ehrlich gemacht (3 Gattungen, +1/+1); Fehler behoben, bei dem `def: 0` trotzdem +1 DEF gab.
  * Gegenstoß: keine Heilung mehr.
  * Stoßtrupp: Infanterie +1 ATK, Beschädigte +1 ATK (vorher alle +1, Infanterie +2).
* **Nationenpools:** 67 Werte in kleinen Schritten (±1 ATK/DEF). 13 dadurch entstandene Wertgleichheiten wurden durch Verschieben eines Punkts zwischen ATK und DEF aufgelöst (Test t268).
* **Starterdecks:** Nur die Plätze 31–60 wurden geändert, weil Mischdecks die Plätze 1–30 und den Pool nutzen. Karsk und Rothain bekamen 6 Werte, Karsk, Ossaria, Orthea und Vesper 11 Tausche.

## Ergebnis

### Starterdecks (4800 / 4800 Partien)

| Nation | vorher | nachher |
|---|---|---|
| Vesper | 42,5 % | 43,8 % |
| Rothain | 43,8 % | 48,0 % |
| Averon | 46,3 % | 47,7 % |
| Merovan | 47,7 % | 49,3 % |
| Lyr | 48,0 % | 45,8 % |
| Ossaria | 48,0 % | 55,5 % |
| Theryn | 49,3 % | 51,0 % |
| Dargan | 50,2 % | 47,8 % |
| Vael | 51,0 % | 47,2 % |
| Orthea | 51,7 % | 52,7 % |
| Eldran | 52,0 % | 50,3 % |
| Caldris | 52,7 % | 47,8 % |
| Karsk | 53,3 % | 48,2 % |
| Sahr | 53,8 % | 53,8 % |
| Namar | 54,0 % | 56,3 % |
| Steinmark | 55,7 % | 54,7 % |
| **Spanne** | 42,5–55,7 % | 43,8–56,3 % |
| **Streuung um 50 %** | 3,6 Pkt. | 3,5 Pkt. |
| **Startspieler** | 47,6 % | 48,6 % |

### Mischdecks (4800 / 4800 Partien)

| Nation | vorher | nachher |
|---|---|---|
| Dargan | 39,0 % | 43,8 % |
| Namar | 40,8 % | 44,3 % |
| Vesper | 40,8 % | 47,7 % |
| Ossaria | 42,3 % | 46,0 % |
| Sahr | 44,2 % | 46,7 % |
| Averon | 46,8 % | 46,3 % |
| Lyr | 47,7 % | 48,7 % |
| Caldris | 51,7 % | 54,8 % |
| Rothain | 53,8 % | 52,7 % |
| Orthea | 54,0 % | 54,8 % |
| Theryn | 54,7 % | 55,2 % |
| Steinmark | 55,2 % | 52,0 % |
| Eldran | 55,2 % | 49,5 % |
| Merovan | 56,8 % | 55,5 % |
| Karsk | 58,3 % | 43,8 % |
| Vael | 58,7 % | 58,2 % |
| **Spanne** | 39,0–58,7 % | 43,8–58,2 % |
| **Streuung um 50 %** | 6,6 Pkt. | 4,6 Pkt. |
| **Startspieler** | 55,9 % | 55,9 % |

### Doktrinen (Spiegelmatch, je 32 Partien je Nation und Seite)

| Doktrin | vorher | nachher |
|---|---|---|
| Gepanzerter Fuß | 38,1 % | 46,9 % |
| Normverband | 44,1 % | 44,9 % |
| Sicherer Nachschub | 44,3 % | 49,6 % |
| Bollwerk | 45,1 % | 48,8 % |
| Marsch aus dem Vollen | 45,3 % | 48,4 % |
| Feuerplan | 53,7 % | 51,0 % |
| Umgehen | 54,3 % | 50,4 % |
| Lauer | 55,1 % | 55,3 % |
| Gegenstoß | 56,1 % | 55,5 % |
| Scheinschwerpunkt | 56,3 % | 49,6 % |
| Stoßtrupp | 58,0 % | 41,8 % |

Prüfmessung mit 96 Partien je Nation und Seite: Stoßtrupp 44,9 %, Lauer 56,0 %, Gegenstoß 53,0 %.

## Bewertung und Offenes
* **Mischdecks:** deutlich enger (Streuung siehe Tabelle). Dargan, Namar und Vesper liegen nicht mehr unter 41 %. Karsk ist durch die Stoßtrupp-Änderung von 58 % auf 44 % gefallen, Vael bleibt bei 58 %.
* **Starterdecks:** Die Streuung ist praktisch gleich geblieben. Ossaria und Namar liegen über 55 %, Vesper unter 44 %.
* **Doktrinen:** Die Spanne ist von 38,1–58,0 % auf etwa 42–56 % geschrumpft. Stoßtrupp ist jetzt zu schwach, Lauer und Gegenstoß bleiben stark. Das ist der nächste Hebel.
* **Startspieler** in Mischdecks bei etwa 56 % (vorher ebenfalls 56 %). Ein Ausgleich braucht eine Regelentscheidung.
* Alle Zahlen sind Bot-Messungen. Ein menschlicher Playtest steht aus.
