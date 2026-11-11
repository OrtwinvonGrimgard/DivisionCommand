# Status t271 – Analyse und Stand nach t270

Stand 12.11.2026, `main` nach t270 (`f2a218b4`). Frische Analyse auf einem neuen Klon: Prüfskript Kartentext gegen Engine, `npm test`, Fuzz, Smoke, Balance-Bestätigung in beiden Modi und Browser-Test mit fünf Seeds.

## Ergebnis in Kürze

- **Keine Rückschritte** gegenüber t268/t270. Das Prüfskript liefert dieselben Zahlen wie in t268, die Balance liegt weiter im Messrauschen.
- **Ein neuer Fehler gefunden und behoben:** Das Feindkontakt-Fenster bot Reaktionen an, deren Bedingung nicht erfüllt war. Beispiel aus ui-play Seed 1234: „Militärische Ehren“ ohne eigene Veteranen. Ein Klick darauf scheiterte („Keine Veteranen an der Front.“), und das Fenster kam unverändert zurück. Ein Mensch konnte noch „Bestätigen und weitergeben“ drücken, das Testskript nicht.
  - Fix: `_reactUsable` in der Engine prüft vor dem Anbieten dieselben Bedingungen wie beim Ausspielen. Das gilt für Militärische Ehren (Veteran an der Front), Kriegsgericht (zwei eigene Fronteinheiten), Rationen (Infanterie), Minen legen (freier Minenplatz) und Napalm (gegnerische Front). Es gilt für Handkarten und verdeckte Fallen im Support.
  - Neuer Test `tests/test_react_usable_t271.js` (in `npm test`).
  - Das Browser-Testskript drückt jetzt auch „Bestätigen und weitergeben“ (`react-pass`).
- **Browser-Test:** Seeds 1234, 31337, 4711, 271 und 77 mit je 5 Partien grün (je 16 Prüfungen ok, 0 Meldungs-Hänger, 25 Partien). 31337 brach in t265 noch ab, 1234 vor dem Fix (siehe oben). Seed 77 meldete im ersten Lauf „Support ohne DOM-Feld“: ein Fehler des Testskripts, kein Spielfehler. Das Neutralisieren (Schläferzelle) betrifft den gegnerischen Support, das Skript suchte im eigenen. Das Skript sucht jetzt in beiden; der Wiederholungslauf von Seed 77 war grün. Die Fähigkeit selbst wurde dabei nicht erneut ausgelöst.
- **Fortschritt:** Gesamt 67 %, Kernspiel 77 %. Beides unverändert, weil kein Bereich einen neuen Lieferpunkt erreicht hat. Leichte Anhebung bei Oberfläche (68 → 69) und Tests & Doku (86 → 87).

## Prüfskript Kartentext gegen Engine

`node scripts/balance/audit_text_engine_t265.js` (alle Karten, dazu live jeder Soforteinsatz):

| Kennzahl | t268 | t271 |
|---|---|---|
| Abschnitt t267 (14 reparierte Karten) | 14/14 OK | 14/14 OK |
| Statische Hinweise | 269 | 269 (davon 17 Fehlalarme durch `CM`) |
| Ablauf-Hinweise | 15 | 15 |
| Nicht spielbar | 6 | 6 |
| Ungelesene Parameter | 9 | 9 (u. a. `MINE_TOKEN`) |

## Balance-Bestätigung (ohne Feinabstimmung)

`CARDSTATS=1 node scripts/balance/sim_t255.mjs nations 96 new`, t254-Bot, 23.040 Partien je Modus, Rauschen etwa ±1,8 Punkte je Nation.

| Modus | Spanne t268 → t271 | Startspieler t268 → t271 | Streuung um 50 (Punkte) t268 → t271 |
|---|---|---|---|
| Starter | 48,9–51,1 → 48,3–52,1 % | 48,7 → 48,7 % | 0,73 → 0,97 |
| Misch | 48,4–51,4 → 49,1–51,0 % | 49,6 → 49,3 % | 0,86 → 0,58 |

| Nation | Starter | Misch |
|---|---|---|
| Vael | 52,1 | 50,5 |
| Caldris | 51,1 | 49,8 |
| Steinmark | 51,0 | 49,5 |
| Eldran | 50,8 | 49,2 |
| Lyr | 50,4 | 51,0 |
| Namar | 50,4 | 49,3 |
| Sahr | 50,3 | 50,1 |
| Averon | 50,1 | 49,4 |
| Theryn | 49,9 | 49,8 |
| Orthea | 49,9 | 51,0 |
| Merovan | 49,5 | 50,1 |
| Ossaria | 49,5 | 50,2 |
| Karsk | 49,2 | 50,3 |
| Rothain | 48,9 | 49,1 |
| Dargan | 48,5 | 50,0 |
| Vesper | 48,3 | 50,6 |

Deutung: Nur Vael (Starter 52,1 %) liegt knapp über 52 %. In t268 lag Vael bei 51,1 %; der Unterschied ist Messrauschen. Der Lauf misst den Stand vor dem Feindkontakt-Fix. Der Fix betrifft nur das Anbieten im Fenster: Der Bot spielte solche Karten ohnehin nicht, weil seine Vorabprüfung auf einer Engine-Kopie scheiternde Aktionen verwirft (0 abgelehnte Aktionen). Deshalb wurde nicht neu abgestimmt.

## Offene Punkte aus t265, neu geprüft

| Punkt | t265 | t271 |
|---|---|---|
| Meldungsketten nach Bot-Zügen (Zeitüberschreitung) | 2 von 8 Seeds abgebrochen | gelöst: 5/5 Seeds grün, 0 Meldungs-Hänger (`recapStalls` 0). Der Abbruch bei 1234 war der Feindkontakt-Fehler, nicht die Meldungen. |
| Funktionsgleiche Karten (Reskin-Kopien) | 179 Gruppen | gelöst seit t268 (0 Gruppen, 0 doppelte Namen) |
| Moral 0–5 | nur im Regeltext | unverändert |
| Bot-Schwierigkeitsstufen | keine | unverändert (zwei Bot-Arten plus Regler) |
| `MINE_TOKEN` | nicht gelesen | unverändert (Sonderfall mit festen 3 Schaden) |
| Porträts | 72 in 8 Ordnern, Soll 64 | unverändert (Frauen fehlen, Ordner „Jetzt“/„Ossar“) |
| Musik | 15 Stücke | unverändert |
| Projekt-PDF | Stand 0.6b | unverändert, t254–t271 fehlen |
| LAN | nur lokal getestet | unverändert, keine Partie mit zwei Rechnern |

## Fortschritt je Bereich

| Bereich | Gewicht | t268/t270 | t271 | Grund |
|---|---|---|---|---|
| Regeln & Engine | 20 % | 90 | 90 | Feindkontakt-Fix; offen Moral, `MINE_TOKEN`, AP-Deckel |
| Kartenbestand | 15 % | 88 | 88 | unverändert; 650 vorläufige Motive |
| Balance | 10 % | 82 | 82 | bestätigt, nur Bot-Messung |
| Bot-KI | 10 % | 70 | 70 | keine Schwierigkeitsstufen |
| Oberfläche, Grafik, Ton | 15 % | 68 | 69 | einheitliche Schrift (t270), Browser-Test 5/5 inklusive früherer Abbruch-Seeds; offen Tutorial, Porträts, 2,5D |
| Mehrspieler | 10 % | 45 | 45 | keine Partie mit zwei Rechnern |
| Spielmodi | 10 % | 5 | 5 | nur Konzepte |
| Tests & Doku | 5 % | 86 | 87 | neuer Test, Testskript bedient Feindkontakt; PDF veraltet, kein Playtest-Protokoll |
| Build & Vertrieb | 5 % | 20 | 20 | EXE nie gebaut, keine Steam-Seite |
| **Summe** | | **67 %** (66,9) | **67 %** (67,1) | Kernspiel 77 % (77,2) |

## Offene Punkte nach Priorität

1. **Hoch:** menschlicher Playtest (alle Balancezahlen stammen aus Bot-Partien).
2. **Hoch:** Tutorial bzw. geführte erste Partie; Roguelike und Kampagne sind nur Konzepte.
3. **Hoch:** LAN mit zwei Rechnern, Windows-EXE bauen und auf einem sauberen Rechner starten, 2,5D-Ansicht testen.
4. **Mittel:** Projekt-PDF auf den Stand t271 bringen. Porträts: Frauen und acht Nationen fehlen.
5. **Mittel:** Startspieler gewinnt 48,7 % (Starter). Blitzkrieg liegt etwa 7 Punkte unter der Kontrolle, 6-AP-Soforteinsätze werden selten gespielt. 650 Karten haben vorläufige Motive.
6. **Niedrig:** Moral nur im Regeltext, `MINE_TOKEN` ungelesen, AP-Deckel offen, keine Bot-Schwierigkeitsstufen, 15 Musikstücke. Das Prüfskript sollte `CM` als Effektfamilie kennen (17 Fehlalarme).

## Prüfungen auf dem Endstand

- `npm test`: 49 Testskripte grün.
- Fuzz 80/80, Smoke 400/400, Prüfskript Abschnitt t267 14/14, `verify.py` 1.746 Vorderseiten.
- Cache `divcmd-alpha41c` (Engine geändert).
