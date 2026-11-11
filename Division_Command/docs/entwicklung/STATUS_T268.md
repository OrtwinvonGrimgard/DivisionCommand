# Status t268/t269 – Balance Richtung 50 %, keine funktionsgleichen Karten, Elite-Zitat mittig

Stand 11.11.2026, `main` nach t267 (`26249f0`).

## Ergebnis

- **Balance:** Alle 16 Nationen liegen in beiden Modi zwischen 48 und 52 % (Bot gegen Bot). Starterdecks 48,9–51,1 %, Mischdecks 48,4–51,4 %. Vorher 44,9–55,3 % bzw. 42,1–56,1 %.
- **Duplikate:** Keine zwei Karten (ohne Token) haben mehr dieselben Werte, Schlüsselwörter und denselben Text oder dieselben Effekte. Vorher waren es 179 Gruppen mit 599 Karten (größte Gruppe 14). Kartennamen sind eindeutig: vorher 57 doppelte Namen, jetzt 0. Neuer Test `tests/test_unique_cards_t268.js` in `npm test`.
- **Geänderte Karten:** 712. Davon 442 wegen Duplikaten, 60 umbenannt (ID gleich) und 240 für die Balance; einige Karten zählen mehrfach. 328 Texte geändert (140 Soforteinsätze, 117 Ausrüstungen, 71 Unterstützungen), 301 mit neuen ATK/DEF, 327 mit neuen AP-Kosten. Die vollständige Liste (alt → neu) steht in `docs/regeln/BALANCE_T268.md`.
- **Zitat auf Elitekarten (t269):** Das Flavor-Zitat steht wieder mittig über der vollen Breite der schwarzen Textfläche. Der Orden endet oberhalb davon und überdeckt es nicht. Alle 84 Elite-Vorderseiten wurden neu gerendert.

## Vorgehen

1. **Unterscheiden** (`scripts/balance/profile_t268.js`): Gleiche Karten werden auf eine Ankerkarte und Varianten aufgeteilt. Die Ankerkarte bleibt unverändert; in dieser Rangfolge: von Tests festgelegte Karten, dann alpha/taktisch, dann Nationen-Starter, dann Pool. Die anderen Karten bekommen den kleinsten passenden Unterschied.
   - Einheiten: Wertetausch (±1 AP gegen ±2 Werte), dann ±1 auf einen Wert.
   - Andere Karten: Zahl ±1 mit AP ±1, zwei Zahlen getauscht, oder ein kleiner Zusatz bei +1 AP:
     - Soforteinsatz: „Ziehe 1 Karte.“
     - Ausrüstung: „Wird der Träger zerstört, ziehst du 1 Karte.“
     - Unterstützung: „Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.“
   - Alle Zusätze sind bestehende Engine-Effekte, also wirkt der Text wie gedruckt.
   - Bei Pool-Unterstützungen sind die neuen Bausteine `theal` (Heilung zu Zugbeginn) und `sdef` (Abschnittsaura) über den vorhandenen Effekt `CM` gebaut. `tests/test_nation_pools.js` prüft sie im Ablauf.
   - Drei von Tests festgelegte Paare wurden von Hand entschieden (`scripts/balance/manual_t268.json`).
2. **Namen** (`scripts/balance/names_t268.json`): Starterkarten, die wie eine Doktrin, eine alpha-Karte oder eine andere Nationskarte hießen, haben einen eigenen Namen bekommen. Die ID bleibt gleich.
3. **Feinabstimmung** (`scripts/balance/tune_t268.js`, 4 Durchgänge mit Messung dazwischen):
   - Je Nation werden Einheiten mit wenig Beitrag um +1 ATK/DEF gestärkt oder Einheiten mit viel Beitrag geschwächt.
   - Grundlage sind die Kartenstatistiken des Laufs (`CARDSTATS=1`). Das Modell: +1 Wert ≈ 3 × Ausspielanteil Punkte.
   - Nebenbedingungen: keine neuen Duplikate, ATK/DEF ≥ 1, und das Wertband aus `tests/test_balance_t237.js` (ATK+DEF = Median ±2 je AP-Stufe). Neun Einheiten wurden deshalb nachträglich ins Band zurückgesetzt.
4. **Kurztexte** (`scripts/cards-review/kurz.py`): Ein Fehler wurde behoben, durch den „1 K..“ (doppelter Punkt) und „Wähle eine Feind“ auf der Vorderseite standen. Neue Kürzungen gibt es für Abschnitts-, Rabatt- und Aufdecken-Formeln. Keine Vorderseite hat mehr über 120 Zeichen.

Nicht geändert: die Kopienlimits Gold 1 / Silber 2 / Bronze 4, 5 AP für beide Spieler in Zug 1, 100 Karten + 2 Doktrinen je Nation.

## Balance vorher/nachher

Verfahren wie t257/t267: `node scripts/balance/sim_t255.mjs nations 96 new`, t254-Bot, 23.040 Partien je Modus, etwa ±1,8 Punkte je Nation. „Vorher“ ist der Lauf auf `26249f0`, „nachher“ der Lauf auf dem Endstand.

| Modus | Startspieler vorher → nachher | Spanne vorher → nachher | Streuung um 50 (Punkte) vorher → nachher | außerhalb 48–52 vorher → nachher |
|---|---|---|---|---|
| Starter | 47,8 → 48,7 % | 44,9–55,3 → 48,9–51,1 % | 3,16 → 0,73 | 10 → 0 |
| Misch | 48,1 → 49,6 % | 42,1–56,1 → 48,4–51,4 % | 4,59 → 0,86 | 15 → 0 |

| Nation | Starter vorher | Starter nachher | Δ | Misch vorher | Misch nachher | Δ |
|---|---|---|---|---|---|---|
| Averon | 45,8 | 49,1 | +3,3 | 42,1 | 49,7 | +7,6 |
| Caldris | 51,4 | 50,1 | -1,3 | 53,5 | 49,3 | -4,2 |
| Dargan | 47 | 48,9 | +1,9 | 56,1 | 49,2 | -6,9 |
| Eldran | 50,3 | 49,6 | -0,7 | 54,9 | 50,6 | -4,3 |
| Karsk | 54,6 | 49,4 | -5,2 | 46,7 | 51,1 | +4,4 |
| Lyr | 49,3 | 49,7 | +0,4 | 48,7 | 51,3 | +2,6 |
| Merovan | 54,4 | 49,7 | -4,7 | 54,1 | 51,4 | -2,7 |
| Namar | 50,1 | 51 | +0,9 | 54,4 | 49,6 | -4,8 |
| Orthea | 52,2 | 49,8 | -2,4 | 46,7 | 50,3 | +3,6 |
| Ossaria | 47,8 | 51,1 | +3,3 | 52,7 | 49,6 | -3,1 |
| Rothain | 52,9 | 49,2 | -3,7 | 46,9 | 49,2 | +2,3 |
| Sahr | 49,2 | 50,9 | +1,7 | 42,6 | 50,9 | +8,3 |
| Steinmark | 46 | 50,8 | +4,8 | 55,1 | 49,7 | -5,4 |
| Theryn | 48,7 | 50,1 | +1,4 | 44,6 | 48,4 | +3,8 |
| Vael | 44,9 | 51,1 | +6,2 | 47,7 | 50,6 | +2,9 |
| Vesper | 55,3 | 49,6 | -5,7 | 53,1 | 49,2 | -3,9 |

### Deutung

- Die Streuung liegt jetzt etwa auf dem Rauschen der Messung. Zwei Läufe auf demselben Stand unterscheiden sich um bis zu ±2 Punkte. Weitere Feinabstimmung würde nur dem Zufall hinterherlaufen.
- Der Startspieler gewinnt 48,7 % bzw. 49,6 %. Die Regel „beide Spieler 5 AP in Zug 1“ (t257) bleibt unverändert.
- Grenze der Messung: Alle Zahlen stammen aus Bot-gegen-Bot-Partien; ein menschlicher Test fehlt weiterhin.

## Duplikate vorher/nachher

| Prüfung | vorher | nachher |
|---|---|---|
| Gleiche Werte + Schlüsselwörter + Text | 179 Gruppen / 599 Karten | 0 |
| Gleiche Werte + Effekte | 184 / 607 | 0 |
| Doppelte Namen | 57 | 0 |
| Gleicher Text bei Nicht-Einheiten (dann andere Kosten/Werte) | 110 / 553, max. 18 | 142 / 362, max. 7 |
| Einheiten mit gleichem Schlüsselwort-Text (andere Werte) | 127 / 518 | unverändert (bewusst: Schlüsselwort-Einheiten) |

## Prüfungen

Ergebnisse auf dem Endstand:

- `npm test`: 48 Skripte grün.
- `verify.py`: 1.746 Vorderseiten 1024×1428, Flächentexte ≤ 120 Zeichen.
- Fuzz: 80/80 Partien regulär beendet.
- Smoke: 400/400 Partien, 0 Fehler.
- Prüfskript t265: Abschnitt t267 14/14 OK.
- `npm run ui-play`: Seeds 268, 269 und 4711 grün, je 5 Partien. 4711 brach in t265 noch durch Zeitüberschreitung ab. Das Prüfskript meldet 17 statische Hinweise mehr (252 → 269). Alle sind Fehlalarme, weil `CM`-Heilung/-Ziehen nicht als Effektfamilie erkannt wird. Die Wirkung ist in `tests/test_nation_pools.js` geprüft.

## Fortschritt

Gesamt 66 → **67 %**, Kernspiel 75 → **77 %**. Einzelwerte: Kartenbestand 85 → 88, Balance 74 → 82, Tests & Doku 85 → 86. Cache `divcmd-alpha41a`.
