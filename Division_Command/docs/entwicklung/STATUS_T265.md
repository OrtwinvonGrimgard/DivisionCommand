# Statusanalyse t265 – nach den Reparaturen t259

Stand: 11.11.2026, `main` nach t259 (`d15377b`). Alle Zahlen nachgezählt: Katalog über `scripts/nation_pools/load_game.js`, `npm test` (46 Skripte), Fuzz, `verify.py`, Smoke 400, Browser-Test `ui-play`, Messdateien in `docs/balance`. Keine Spielmechanik geändert; gefundene Fehler sind gemeldet, nicht behoben. Die Hilfe (Entwicklungsstand, Fehlende Features, Fortschritt, Fortschritt in Prozent) zeigt dieselben Inhalte.

## Neu: Kartentext gegen Engine

Systematische Prüfung aller 1.746 Karten (statisch), aller 389 Soforteinsätze (im Ablauf), aller Effektparameter (gelesen oder nicht) und aller Soforteinsätze mit Feindziel. Details: `docs/regeln/TEXT_ENGINE_AUDIT_T265.md`, Skript `scripts/balance/audit_text_engine_t265.js`.

- **10 Karten wirken anders als gedruckt:** Verfahrensbruch, Keine Sterne, Modellstopp, Kein Schrein, Stillprobe (`negateBonus` ungelesen, kein Ziehen bzw. kein +1 DEF/−2 ATK), Opfergabe und Ablösung (zerstören zusätzlich 2 gegnerische Fronteinheiten; Opfergabe ohne DEF-Grenze, ohne Heilung), Verbandskasten (heilt 3 + Nachbarn 2 statt 1), Werkstattmarke (Heilung fehlt), Ortungsband (Ziel −1 DEF fehlt).
- **4 Karten stärken laut Text die gewählte Feindeinheit:** Notimplantat, Stoßtrupp (`dc_b_stosstrupp_419`), Lokalisierung (`dc_b_lokalisierung_823`), Rasten (`dc_b_rasten_341`).
- 13 der 14 Karten liegen in Starterdecks. Fundquote der Automatik: statisch 9 von 263 Meldungen echt, Ablauf 7 von 22; der Rest sind Fehlalarme (Sondercodes, bedingte Wirkungen).

## Bekannte Lücken neu bewertet

| Lücke | Stand t265 | Bewertung |
|---|---|---|
| 14 Karten mit falscher Wirkung | neu gefunden | kritisch, verzerrt Balance; vor Playtest beheben |
| Hänger „Der Gegner prüft Reaktionen“ | behoben t259; ui-play t265: 8 weitere Seeds grün (siehe unten) | erledigt |
| Armageddon | behoben t259 (Test `test_armageddon_t259.js`) | erledigt |
| Kopienlimit über Reskins | unverändert 155 Gruppen, 491 Karten, bis 52 Kopien (Planmäßige Ablösung, 13 Namen) | mittel; Regel „Limit je Funktion“ oder weitere Unterschiede |
| Balance | keine neue Messung seit t257: Starter 44,6–55,5 %, Misch 41,8–55,8 %; Startspieler 47,8 / 48,5 %; Blitzkrieg ~7 Punkte unter Kontrolle; 6-AP-Soforteinsätze ~4 % der Partien | Messung enthält die Fehlwirkungen; nach Behebung neu messen |
| `MINE_TOKEN` | Code ungelesen, Wirkung über Sonderfall (3 Schaden) | gering |
| Moral 0–5 / Brechen | nur Regeltext, kein Engine-Code | mittel (Regelentscheid nötig: umsetzen oder streichen) |
| Bot-Schwierigkeitsstufen | keine (zwei Bot-Arten plus Regler) | mittel |
| Mensch-Playtest | keiner dokumentiert | kritisch |
| LAN mit zwei Rechnern | nie getestet | hoch |
| EXE | nie gebaut | hoch |
| 2,5D-Ansicht | im Browser-Test nicht abgedeckt | mittel |
| Porträts | 72 PNG in 8 Ordnern (Soll 64 Personen, 16 Nationen; Ordner „Ossar“, „Jetzt“) | gering |
| Projekt-PDF | beschreibt 0.6b, ohne t254–t265 | gering |

Korrektur: Musik sind 15 Stücke (`assets/audio`, 15 WAV, 15 Titel in `index.json`), nicht 16.

## Fortschritt in Prozent (Methodik unverändert)

| Bereich | Gewicht | t258 | t265 | Beitrag |
|---|---|---|---|---|
| Regeln & Engine | 20 | 90 % | 87 % | 17,4 |
| Kartenbestand | 15 | 85 % | 83 % | 12,45 |
| Balance | 10 | 75 % | 72 % | 7,2 |
| Bot-KI | 10 | 70 % | 70 % | 7,0 |
| Oberfläche, Grafik, Ton | 15 | 65 % | 68 % | 10,2 |
| Mehrspieler | 10 | 45 % | 45 % | 4,5 |
| Spielmodi | 10 | 5 % | 5 % | 0,5 |
| Tests & Doku | 5 | 80 % | 83 % | 4,15 |
| Build & Vertrieb | 5 | 20 % | 20 % | 1,0 |
| **Gesamt** | 100 | 65 % | **64 %** (64,4) | |

Kernspiel ohne Spielmodi und Vertrieb: 62,9 / 85 = 74 % (t258: 75 %).

Begründung: Regeln & Engine, Kartenbestand und Balance sinken, weil die Prüfung 14 Karten gefunden hat, die vorher als „wirkt wie gedruckt“ galten, und weil die Balance-Messung diese Fehlwirkungen enthält. Oberfläche und Tests steigen durch die Hänger-Reparatur mit Wächtern, den stabilen Browser-Test, die lesbarere Hilfe und das neue Prüfskript.

## Browser-Test ui-play (t265)

| Seed | Partien ok | Auffällig |
|---|---|---|
| 3 | 5/5 | — |
| 42 | 5/5 | 1× Meldung 15 s unverändert, per Klick übersprungen (Testabsicherung) |
| 265 | 5/5 | — |
| 777 | 5/5 | — |
| 4711 | 4/5 | Spiel 1, Zug 4: Zeitüberschreitung (180 s) beim Warten auf den eigenen Zug |
| 9001 | 5/5 | — |
| 12345 | 5/5 | — |
| 31337 | 4/5 | Spiel 3, Zug 6: Zeitüberschreitung (180 s) beim Warten auf den eigenen Zug |

Summe: 38 Partien gelaufen, 2 Abbrüche, 6 von 8 Seeds grün. Pro Seed: 3 Partien bis Sieg (Siegpunkte), 1 Aufgabe, 1 Frieden.

Diagnose der zwei Abbrüche (nicht behoben, nur gemeldet): Beide folgen demselben Muster. Der Mensch ist am Zug (`active 0`, `phase main`, keine offene Wahl), aber die Meldungs-Pumpe ist „beschäftigt“ (`playing true`, Warteschlange 0, `stuckTicks 0`). Sichtbar ist eine Live-Meldung (`recap-stage`), die gerade tippt: 4711 „Test, Tester zieht e…“, 31337 „Einsatz … Grenzhaubitze richtet 3 Schaden an … Grenzhaub…“ mit neun Zeilen aus dem vorherigen Bot-Zug. Das ist kein Einfrieren. Das Testskript meldet keinen `RECAP-STALL` (der kommt erst nach 15 s ohne Textänderung), der Text tippte also weiter. Auch die Meldungs-Wache der App (15 s ohne Änderung) griff nicht ein, und der Zugtimer lief (Screenshot 31337: 04:45). Im Screenshot von 4711 direkt nach dem Abbruch ist die Meldung schon zu, der eigene Zugtimer steht bei 04:56. Ursache: Die Meldungen zu einem langen Bot-Zug brauchen pro Zeile etwa 4 s (0,7 s Pause, Tippen, 2 s Halten) plus Angriffs-Animationen. Zusammen überschreiten sie die 180 s, die `waitHumanTurn` im Test wartet. Folge für Spieler: Nach großen Bot-Zügen wartet man mehrere Minuten, bevor man handeln kann (Klick auf die Meldung überspringt). Offene Punkte: Meldungen kürzen oder zusammenfassen bzw. die Testfrist anpassen; nicht Teil von t265.

