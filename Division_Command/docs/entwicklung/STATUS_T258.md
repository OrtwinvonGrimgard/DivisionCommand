# Statusanalyse t258 – Entwicklungsstand, fehlende Features, Fortschritt

Stand: 11.11.2026, `main` nach t256 (6c8aecf). Alle Zahlen nachgezählt: Katalog über `scripts/nation_pools/load_game.js`, `npm test` (44 Skripte), `npm run fuzz` (80/80), `scripts/graphics/verify.py`, Messdateien in `docs/balance`. Die Hilfe im Spiel (Menü „Hilfe“) zeigt dieselben Inhalte unter Marktanalyse, Entwicklungsstand, Fehlende Features, Fortschritt und Fortschritt in Prozent.

## Bestand

| Bereich | Wert |
|---|---|
| Karten-IDs | 1.746 (836 Einheiten, 389 Soforteinsätze, 265 Ausrüstung, 219 Unterstützung, 36 Doktrinen, 1 Token) |
| Deckfähig | 1.709 = 16 × 100 Nationenkarten + 109 neutrale |
| Seltenheit | Bronze 1.006, Silber 429, Gold 176, ohne 135 |
| Vorderseiten | 1.746 × 1024×1428 (alpha40), 0 ohne Motiv |
| Effektcodes | 210 im Katalog; `MINE_TOKEN` wird von der Engine nicht gelesen |
| Funktionsgleiche Gruppen | 155 Gruppen, 491 Karten (gleicher Typ, Klasse, AP, ATK, DEF, Effekte inkl. Parameter, Schlüsselwörter, Seltenheit; verschiedene Namen); 150 davon nationsübergreifend |
| Bildstatus „platzhalter“ | 650 Karten (Motiv aus art-v2/art-v1 vorhanden, als vorläufig markiert) |
| Code ohne Daten | rund 17.100 Zeilen JS (engine.js 7.713, app.js 3.154, bot.js 1.051), server.py 651 |
| Porträts | 72 PNG in 8 Ordnern (Soll 64 Personen, 16 Nationen) |
| Ton | 16 Musikstücke, 205 Soundeffekt-Dateien |
| Repo | 935 Commits seit 08.09.2026, 13 seit Tag v0.6b |

## Neue Befunde

- **Armageddon:** Kartentext „beide Hände auf den Ablagestapel, beide ziehen 5“. `_armageddonSweep` räumt nur Front, Support und Niemandsland; danach Münzwurf. Hände bleiben, niemand zieht 5. Die Hilfe (Beispielzüge) nennt das bereits; als Sonderfall in `docs/regeln` ist es nicht als Abweichung vermerkt.
- **Kopienlimit:** 155 funktionsgleiche Gruppen. Über verschiedene Namen lassen sich bis zu 52 Kopien derselben Funktion in ein Deck legen (Summe der Einzellimits der größten Gruppe).
- **Balance (t257, Bot):** Außerhalb 46–54 %: 7 Nationen im Starter-, 9 im Mischmodus (Messstreuung ±1,8).

## Fortschritt in Prozent

Bezug (100 %) = Early-Access-Fassung laut Fahrplan (Tisch, Bot, Hotseat/LAN, Tutorial, Roguelike-Slice, erste Kampagnengeschichten, Steam-Seite mit Demo). Live-Funktionen (Ladder, Workshop) zählen nicht.

| Bereich | Gewicht | Stand | Beitrag |
|---|---|---|---|
| Regeln & Engine | 20 | 90 % | 18,0 |
| Kartenbestand | 15 | 85 % | 12,75 |
| Balance | 10 | 75 % | 7,5 |
| Bot-KI | 10 | 70 % | 7,0 |
| Oberfläche, Grafik, Ton | 15 | 65 % | 9,75 |
| Mehrspieler | 10 | 45 % | 4,5 |
| Spielmodi (Tutorial, Roguelike, Kampagne) | 10 | 5 % | 0,5 |
| Tests & Doku | 5 | 80 % | 4,0 |
| Build & Vertrieb | 5 | 20 % | 1,0 |
| **Gesamt** | 100 | | **65,0 %** |

Kernspiel ohne Spielmodi und Vertrieb: 63,5 / 85 = 75 %.

Methodik: Gewicht = geschätzter Arbeitsanteil bis Early Access. Stand = Anteil der Lieferpunkte, die im Code vorhanden und getestet sind; vorhanden, aber ungetestet zählt halb. Beitrag = Gewicht × Stand. Die Werte je Bereich sind Einschätzungen und werden bei jeder Analyse neu gesetzt.

## Marktanalyse

Quellen und Zahlen stehen in der Hilfe unter „Marktanalyse“ (abgerufen 11.11.2026): Game Market Data (Card Game, 05.10.2026), SteamCharts (KARDS), Blizzard News, Riot (LoR), CD PROJEKT RED (Gwent), Massively Overpowered (Marvel Snap), Battlefront (Flames of War).
