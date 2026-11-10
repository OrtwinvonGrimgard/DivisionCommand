# Bot-KI t254: Unterstützungsfähigkeiten, neue Effekte, Zugreihenfolge

Stand: main nach `d94b5a5d`, 10.11.2026. Betrifft nur den Test-Bot (`web/js/ai/bot.js`) und die Bot-Schleife im Browser (`botTick` in `web/js/ui/app.js`). Kartenregeln, Kartentexte und Preise sind unverändert. Der Schloter-Bot ist unverändert.

## Ausgangslage (Analyse t253)

- Neutralisieren (Schläferzelle) wurde erst gewertet, wenn keine Ausspielung mehr möglich war, also meist zu spät: in 1.500 Testpartien zündete die Zelle 298-mal, neutralisiert wurde 122-mal.
- Blitzkrieg: Der Bot spielte Panzer nicht gezielt, um die Unterstützungssperre oder das Trophy-Ziel zu nutzen.
- Psychologie der Massen, Blinder Gehorsam, Einsame Gassen, Mobilisierung und Der Letzte der steht wurden nach festen Zahlen bewertet, ohne Brettlage. Der Letzte wurde in 18,4 % der Partien gespielt, auch bei starker eigener Front.
- Vertragsclip wurde wie normale Ausrüstung behandelt, auch ohne Soforteinsätze auf der Hand.
- Aktivierbare Fähigkeiten eigener Karten (Feuerauftrag, Lazarett, Drohnen usw.) stehen nicht in `listActions`, die Engine nimmt sie aber über `dispatch` an. Der Bot kannte sie nicht.
- Im Browser löste `botTick` Folgewahlen des Bots (Ziel, Slot, Opfer) mit der ersten Option statt mit der Bot-Bewertung.
- Abgelehnte Aktionen: 0,27–0,32 je Partie (im Simulator beendet eine Ablehnung den Zug).

## Was der Bot jetzt anders macht

1. **Zug in Stufen.** Statt einer einzigen Punkteliste ordnet der Bot seinen Zug:
   dringende Neutralisierung (Zelle zündet zu Beginn des eigenen nächsten Zugs) → Kampfausrüstung, starke lageabhängige Soforteinsätze und starke Fähigkeiten → Angriffe, die vernichten oder Siegpunkte bringen → übrige Ausspielungen → Rest. Das ist der größte Einzelgewinn (siehe Ablation).
2. **Vorausschau auf einer Kopie.** Für Massen, Gassen, Gehorsam, Letzter und Mobilisierung spielt der Bot die Karte auf einer Engine-Kopie (Zustand als JSON, eigener Zufall, keine Events), löst die eigenen Folgewahlen mit seiner eigenen Logik und vergleicht die Brettbewertung vorher/nachher abzüglich AP. Nur wenn das Brett besser wird, spielt er die Karte. Die Kopie benutzt ausschließlich `dispatch`, es gibt keine nachgebauten Regeln.
3. **Fähigkeiten eigener Karten.** Der Bot probiert `USE_ABILITY`/`ACTIVATE_SUPPORT` für eigene aufgedeckte Karten auf der Kopie und nutzt sie, wenn der Gewinn die AP lohnt (z. B. Feuerauftrag mit Vernichtung).
4. **Schläferzelle.** Bei einer Runde Restzeit wird sofort neutralisiert, wenn eigene günstige Einheiten bedroht sind; bei zwei Runden mit niedriger Priorität. Ergebnis in 1.500 Partien: 375 Neutralisierungen, 18 Zündungen (vorher 122 / 298).
5. **Blitzkrieg.** Mit Blitzkrieg bevorzugt der Bot Panzer, besonders wenn der Gegner aktivierbare Unterstützung hat und noch keine Sperre liegt, bei Gefechtsbereit und solange das Trophy-Ziel offen ist.
6. **Der Letzte der steht.** Nur noch, wenn die Vorausschau einen Gewinn zeigt (meist schwache Front aus 2–3 Einheiten). Als Überlebenden behält der Bot die stärkste Einheit, Elite bevorzugt.
7. **Folgewahlen.** Deck-Suchen (Mobilisierung, Gassen) nehmen die stärksten Einheiten; befohlene Angriffe und Feuerauftrag zielen auf Ziele, die sicher fallen, abzüglich Gegenschlag.
8. **Vertragsclip** zählt die Soforteinsätze auf der Hand; ohne Soforteinsätze wird er kaum noch gelegt.
9. **Angriffe nach Siegpunkten.** Jeder Angriff wird zusätzlich auf der Kopie auf seine Siegpunkt-Änderung geprüft.
10. **Vorabprüfung.** Die gewählte Aktion wird auf der Kopie getestet; wird sie abgelehnt, nimmt der Bot die nächste. Abgelehnte Aktionen je Partie: 0.
11. **Browser.** `botTick` schickt die Folgewahl des Bots direkt über `dispatch`, nur reine Bestätigungsfenster (Münzwurf, SAM, Einsicht usw.) gehen noch über die alte Kurzlogik. Schrittgrenze je Zug 18 → 60, weil Folgewahlen jetzt eigene Schritte sind. LAN/Online bleibt über `dispatch`/`getState`.

Neue Schalter in `DCBot` (alle 1 = an): `tiered`, `lookahead`, `probe`, `vpLook`, dazu `apWeight` 4.

## Messung

Harness: `scripts/balance/sim_bot_t254.mjs` (parallel, Ausgabe nach `scripts/balance/out/`). Alter Bot = `bot.js` aus `d94b5a5d`.

### Neu gegen alt (beide Sitzpositionen)

| Decks | Partien | Neuer Bot gewinnt | Ø Züge | Abgelehnte Aktionen je Partie (neu / alt) |
|---|---|---|---|---|
| Mischdecks | 8.000 | 78,6 % ± 0,9 | 15,2 | 0 / 0,27 |
| Starterdecks | 8.000 | 78,0 % ± 0,9 | 14,9 | 0 / 0,30 |

Aktionen je Partie (Mischdecks): Angriffe 6,4 (alt 2,4), Ausspielungen 12,6 (alt 13,5), Fähigkeiten 0,02. Fähigkeiten sind selten, weil Starter- und Mischdecks kaum aktivierbare Unterstützung enthalten.

### Ablation (je 2.000–3.000 Partien gegen den alten Bot)

| Variante | Neuer Bot gewinnt |
|---|---|
| alles an | 78,7–79,6 % |
| ohne Stufen (`tiered:0`) | 51,9 % |
| ohne Vorabprüfung (`probe:0`) | 75,9 % |
| ohne Vorausschau (`lookahead:0`) | 77,7 % |
| ohne Siegpunkt-Prüfung (`vpLook:0`) | 78,3 % |

### Karten (eine Kopie in Spieler 0, beide Seiten gleicher Bot, je 4.000 Partien, ± 1,5)

| Fall | alter Bot WR (Spielrate) | neuer Bot WR (Spielrate) | Abstand zur Kontrolle alt → neu |
|---|---|---|---|
| Kontrolle | 51,4 % | 50,1 % | – |
| Blitzkrieg als Zwangsdoktrin | 41,3 % | 42,7 % | −10,1 → −7,4 |
| Psychologie der Massen (6 AP) | 51,6 % (4,1 %) | 49,0 % (3,9 %) | +0,2 → −1,1 |
| Massen umsonst (0 AP) | 54,6 % (29,3 %) | 52,2 % (25,5 %) | +3,2 → +2,1 |
| Der Letzte der steht | 46,2 % (18,4 %) | 49,1 % (2,2 %) | −5,2 → −1,0 |
| Blinder Gehorsam | 52,6 % (4,6 %) | 49,5 % (4,4 %) | +1,2 → −0,6 |
| Einsame Gassen | 51,8 % (4,1 %) | 50,9 % (4,5 %) | +0,4 → +0,8 |
| Mobilisierung | 52,6 % (20,2 %) | 50,8 % (27,6 %) | +1,2 → +0,7 |
| Schläferzelle | 50,1 % (23,4 %) | 49,5 % (18,1 %) | −1,3 → −0,6 |
| Vertragsclip | 50,1 % (16,1 %) | 50,1 % (18,7 %) | −1,3 → 0,0 |

Der t251-Wert für Blitzkrieg (40,3 %) stammt aus einem anderen Harness; im selben Harness liegt der alte Bot bei 41,3 %.

### Nationen (alter gegen alter Bot, neuer gegen neuer Bot)

Je Modus 69.120 Partien (288 je gerichtetes Nationspaar, 240 Paare), gleiche Seeds für beide Bots, alle Partien regulär beendet, 0 abgelehnte Aktionen beim neuen Bot. ± 1,1 Punkte je Nation.

| Kennzahl | Starter alt | Starter neu | Misch alt | Misch neu |
|---|---|---|---|---|
| Startspieler gewinnt | 51,4 % | 44,8 % | 51,4 % | 44,2 % |
| Spanne der Nationen | 43,1–54,7 % | 39,8–64,6 % | 45,4–53,4 % | 37,8–69,5 % |
| Ø Züge | 16,2 | 15,6 | 17,0 | 16,1 |

Zum Vergleich t241 (alter Bot, Harness `sim_overall`): Startspieler 50,3 / 50,1 %, Spanne 47,6–53,0 / 47,3–53,4 %. Der alte Bot im neuen Harness liegt etwas breiter (Vael Starter 43,1 %), vermutlich wegen anderer Seeds und der Änderungen t244–t251.

| Nation | Starter alt | Starter neu | Misch alt | Misch neu |
|---|---|---|---|---|
| Ossaria | 48,2 | 64,6 | 50,4 | 69,5 |
| Dargan | 47,2 | 60,6 | 48,2 | 59,9 |
| Namar | 51,2 | 56,6 | 49,2 | 59,7 |
| Merovan | 53,1 | 61,1 | 49,0 | 56,8 |
| Vesper | 54,7 | 57,1 | 50,3 | 54,7 |
| Steinmark | 50,2 | 44,6 | 51,4 | 52,5 |
| Eldran | 48,9 | 46,5 | 53,3 | 51,8 |
| Lyr | 49,1 | 49,1 | 52,4 | 49,3 |
| Caldris | 51,7 | 45,3 | 53,4 | 48,5 |
| Vael | 43,1 | 44,3 | 45,4 | 46,7 |
| Rothain | 51,0 | 52,2 | 48,3 | 45,0 |
| Karsk | 47,8 | 48,4 | 49,8 | 43,9 |
| Averon | 48,0 | 39,8 | 49,8 | 41,3 |
| Orthea | 52,2 | 44,8 | 48,3 | 41,2 |
| Sahr | 50,3 | 40,1 | 51,1 | 41,2 |
| Theryn | 53,2 | 45,0 | 49,9 | 37,8 |

**Startspieler-Diagnose (nur Messung, Regel unverändert):** neuer Bot, 11.520 Partien je Modus über `RULES_OVERRIDE`. Abzug 2 (heute, 3 AP im ersten Zug): 44,8 / 44,2 %. Abzug 1 (4 AP): 46,1 / 47,3 %. Kein Abzug (5 AP): 49,1 / 49,5 %. Die Nationsspanne ändert sich dadurch kaum (36,7–70,7 %).


## Was jetzt als echtes Kartenproblem sichtbar wird (nur Vorschläge, nichts geändert)

- **Nationsbalance kippt mit dem stärkeren Bot.** Ossaria (64,6 / 69,5 %), Dargan (60,6 / 59,9 %), Merovan (61,1 / 56,8 %), Namar (56,6 / 59,7 %) und Vesper liegen klar oben; Averon (39,8 / 41,3 %), Sahr (40,1 / 41,2 %), Theryn (Misch 37,8 %) und Orthea klar unten. Beim alten Bot lagen dieselben Nationen nahe 50 %, weil er kaum angriff. Vorschlag: zuerst die Doktrinpaare der Ausreißer prüfen (Ossaria: Abnutzung + Gepanzerter Fuß; Theryn: Breites Aufgebot + Sturmangriff; Averon: Aufklärungsschlag + Auswertung), dann Einzelkarten. Vor jeder Änderung menschliches Spiel abwarten.
- **Startspieler-Abzug zu hoch für aktives Spiel.** Mit dem neuen Bot gewinnt der Startspieler nur noch 44–45 %. Ohne Abzug wären es 49,1–49,5 %. Vorschlag: `opening_starter_ap_penalty` 2 → 0 oder 1 nach Playtest neu entscheiden (0.6b hatte 1 → 2 auf Basis des alten Bots gesetzt).
- **Blitzkrieg bleibt klar zu schwach** (−7,4 Punkte zur Kontrolle, trotz gezielter Panzer). Das Trophy-Ziel (Panzer vernichtet innerhalb von 2 Zügen nach dem Ausspielen) wird nur in etwa 57 % der Partien erreicht, bei den meisten anderen Doktrinen in 70–100 %. Vorschlag: Fenster auf 3 Züge oder „Panzer greift im Zug des Ausspielens an“ als Ziel; alternativ die Sperre auf zwei gegnerische Züge.
- **Die 6-AP-Soforteinsätze (Massen, Gehorsam, Gassen)** sind bei 5 AP je Zug nur mit Bonus-AP spielbar; Spielrate um 4 %. Umsonst ist Massen spürbar stark (+2,1). Das ist eher ein Spielbarkeits- als ein Stärkeproblem. Vorschlag zum Testen: 5 AP für Massen und Gassen.
- **Der Letzte der steht** liegt jetzt nahe neutral, wird aber selten gespielt. Kein Handlungsbedarf, solange menschliches Spiel nichts anderes zeigt.
- **Schläferzelle** wirkt kaum noch, weil der Bot sie zuverlässig neutralisiert (2 AP). Falls die Karte bedrohlicher sein soll: Neutralisierung 3 AP. Nur Vorschlag.

## Zweifel und Grenzen

- Bot gegen Bot misst Bot-Metagame. Der neue Bot greift deutlich häufiger an; dadurch verschiebt sich das Nationsbild, ohne dass sich eine Karte geändert hat.
- Im Simulator beendet eine abgelehnte Aktion den Zug, im Browser nicht. Der Gewinn durch die Vorabprüfung ist im echten Spiel daher kleiner.
- Aktivierbare Unterstützungsfähigkeiten kommen in Standarddecks fast nicht vor (0,02 je Partie); dieser Teil ist durch Szenariotests, nicht durch die Sims belegt.
- Die Kartensims setzen eine einzelne Kopie ein; Spielraten von 2–5 % geben wenig Signal pro Karte.
- Rechenzeit: der neue Bot braucht durch die Kopien etwa doppelt so lange (138.240 Partien: 666 s statt 313 s auf 8 Kernen, rund 40 ms je ganze Partie und Kern). Im Browser ist das nicht spürbar.
- Die Nationszahlen des neuen Bots sind ein anderes Metagame als t241. Ob Menschen eher wie der neue oder der alte Bot spielen, ist offen; die Ausreißer sind deshalb Prüfaufträge, keine Befunde für sofortige Änderungen.
- Browser, LAN und EXE sind nicht manuell getestet; der UI-Pfad ist mit jsdom (`tests/test_bot_ui_t254.js`) abgedeckt.

## Tests

- `tests/test_bot_t254.js`: dringende Neutralisierung zuerst; Massen mit Handeinheiten (3 Einheiten gesetzt), ohne Handeinheiten nicht; Letzter nicht bei drei gesunden Panzern, Elite als Überlebender; Feuerauftrag vernichtet; Blitzkrieg bevorzugt Panzer nur mit Doktrin; keine illegale Letzter-Aktion.
- `tests/test_bot_ui_t254.js`: vier Bot-Partien über `botTick` in jsdom, alle beendet, Bot trifft eigene Folgewahlen, höchstens 60 Schritte je Zug. Schlägt mit dem alten `app.js` fehl.
