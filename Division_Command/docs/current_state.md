# Division Command – current_state.md (lebende Übersicht)

**Das ist der Einstieg ins Projekt.** Wer wissen will, wo das Spiel steht, was als Nächstes dran ist und was zuletzt passiert ist, liest zuerst diese Datei. Sie wird bei **jedem Push** gepflegt (siehe [Verfahren](#6-verfahren-vertical-slices-und-current_statemd)). Die älteren `STATUS_T*.md` unter [`entwicklung/`](entwicklung/) bleiben als historische Momentaufnahmen erhalten.

| | |
|---|---|
| **Stand dieser Übersicht** | 21.11.2026 (Berlin), nach t337 (Ölgemälde-Ketten Ossaria; Version 0.645); Verfahren eingeführt in t286 |
| **Version** | Alpha **0.645** (`Division_Command/VERSION`), Tag `v0.645` (21.11.2026, t337); davor `v0.643` (21.11.2026, t336), davor `v0.641` (20.11.2026, t325), davor `v0.636` (20.11.2026, t318), davor `v0.626` (19.11.2026, t301), davor `v0.624` (18.11.2026, t300), davor `v0.619` (18.11.2026, t298), davor `v0.611` (18.11.2026, t296), davor `v0.610` = `b87e3858` (17.11.2026, t291); vorher `v0.6e` = `9a0f3e2d` (13.11.2026) |
| **Versionsschema** | Seit 0.610. Die Version hat drei Nachkommastellen: `0.xyz`. Wie weit sie springt, richtet sich nach dem Gewicht der Änderung: Fix oder Kleinigkeit +0,001, spürbare Erweiterung +0,002 bis +0,005, großes Feature oder Systemumbau etwa +0,010. Die bisherigen Stände 0.6a bis 0.6e entsprechen 0.601 bis 0.605. Ihre Tags (`v0.6a` … `v0.6e`) bleiben unverändert. Neue Tags heißen `v0.610` usw. 0.610 steht für den Umbau des Bot-Zugs (t291), 0.611 für einen Fix (Audio-Schleife, t296: +0,001), 0.619 für t298 (Doktrin-DEF echt +0,005, Überlast +0,002, Kampftext +0,001), 0.624 für t300 (Doktrin-Grobkorrektur +0,002, Balance-Gate +0,003), 0.626 für t301 (Etappensicherung +0,002), 0.636 für t318 (großer Grafikumbau aller Vorderseiten plus Editor-Funktion „Muster neu würfeln“, +0,010), 0.641 für t325 (Ölgemälde-Ketten der Offiziersporträts für Rothain und Karsk, +0,005), 0.643 für t336 (Ölgemälde-Ketten Averon, +0,002), 0.645 für t337 (Ölgemälde-Ketten Ossaria, +0,002). |
| **Basis-Commit dieser Übersicht** | Tag `v0.645` auf `main` (t337; davor `v0.643` = t336, davor `v0.641` = t325, davor `v0.636` = t318, davor `v0.626` = t301, davor `v0.624` = t300, `v0.619` = t298, `v0.611` = t296, davor `v0.610` = t291, davor `54eee9ce` = `v0.6e` plus Minen-Token und t286/t289, siehe [Zuletzt gemacht](#4-zuletzt-gemacht)) |
| **Service-Worker-Cache** | `divcmd-alpha49a` (bei jeder Web-Änderung hochzählen) |
| **Katalog** | 1.746 Karten-IDs, 16 Nationen, 36 Doktrinen; 1.746 Vorderseiten (Nachzählung 17.11.2026 über `scripts/nation_pools/load_game.js`) |
| **Letzte dokumentierte Prozentwertung** | 67 % bis Early Access, Kernspiel 77 % (`entwicklung/STATUS_T271.md`, Stand t271). Seitdem **nicht neu bewertet**; die Bereichsgewichte stehen dort. |
| **CI** | **aktiv** seit t289 (GitHub Actions: `npm test`, `verify.py`, Fuzz, Audit; siehe [`technik/CI.md`](technik/CI.md)) |

## Inhalt

1. [Festlegungen (gelten, nicht neu verhandeln)](#1-festlegungen)
2. [Vertical Slices im Überblick](#2-vertical-slices-im-überblick)
3. [Slices im Detail](#3-slices-im-detail)
4. [Zuletzt gemacht](#4-zuletzt-gemacht)
5. [Blockiert und offen](#5-blockiert-und-offen-geklärt-werden-muss)
6. [Verfahren](#6-verfahren-vertical-slices-und-current_statemd)
7. [Nächste sinnvolle Schritte (priorisiert)](#7-nächste-sinnvolle-schritte-priorisiert)
8. [Gates und Befehle](#8-gates-und-befehle)
9. [Wegweiser durch die Docs](#9-wegweiser-durch-die-docs)

---

## 1. Festlegungen

Entscheidungen des Projektleiters. Sie stehen hier gebündelt, damit sie nicht in Chatverläufen verloren gehen. Die maßgeblichen Regeltexte stehen in [`regeln/RULES_v0.5_GRUNDKONZEPT.md`](regeln/RULES_v0.5_GRUNDKONZEPT.md).

| Thema | Festlegung | Beleg |
|---|---|---|
| Deckbau | 60 + 2 (60 Karten + 2 Doktrinen), alle Nationen frei mischbar; Kopienlimit Gold 1 / Silber 2 / Bronze 4; wird beim Speichern und beim Partiestart erzwungen | RULES §24, `catalog.js` (`DC_checkDeckForMatch`), t283 |
| Kartenvorderseiten | alpha40, 1024 × 1428, Motiv nie gestreckt, Layout unverändert; einheitliche Schrift, Zitat fett-kursiv 42 px mittig | `technik/KARTEN_RENDER_ALPHA40.md`, t269/t270 |
| Kartentext | knapp (höchstens 120 Zeichen); Sonderfälle verlustfrei in `regeln/` | `regeln/KARTEN_SONDERFAELLE.md` |
| Aktionspunkte | Beide Spieler haben in Zug 1 5 AP. Übrige AP sind nur Reaktionsreserve im Gegnerzug und verfallen zu Beginn des eigenen Zuges (RULES §20.1) | `balance/STARTSPIELER_T257.md`, t283 |
| Starthand und Mulligan | Starthand 5, Handlimit 7; Mulligan kostet 1 AP und gibt eine neue Hand mit 5 Karten (§23.4) | t283 |
| Balanceziel | etwa 50 % je Nation; doppelte Karten müssen sich unterscheiden | t268, t284 |
| Startspieler-Vorteil | Der Vorteil von etwa 57 % mit Mischdecks (Bot gegen Bot) **bleibt bewusst so**: keine Einheitengrenze pro Deck, keine Extra-Karte für den Zweiten | Entscheidung 13.11.2026, `balance/BALANCE_T285.md` |
| Stellungswechsel für die KI | im Standard **aus** (`DCBot.defaults.kwMove = 0`), weil er Nationen um bis zu 16 Punkte verschiebt | `balance/BALANCE_T285.md` §3 |
| Git | nur Fast-Forward-Pushes, kein Force, keine History-Umschreibung, bestehende Tags werden nicht verschoben | `technik/REPO_GROESSE_LFS_T283.md` |

## 2. Vertical Slices im Überblick

**Statuswerte:** `fertig` = Definition of Done für den Alpha-Umfang erfüllt (Restpunkte sind Politur oder bewusst zurückgestellt) · `in Arbeit` = lauffähig, aber mit benannten Lücken, die zum Slice gehören · `geplant` = nur Konzept, Werkzeug oder Vorarbeit · `blockiert` = wartet auf eine Entscheidung oder Freigabe außerhalb der Entwicklung.

| ID | Slice | Status | In einem Satz |
|---|---|---|---|
| [VS-01](#vs-01-kernspiel--regeln) | Kernspiel & Regeln | fertig | Engine, Trophy-Modus, Hotseat; Regelwerk an die Engine angeglichen (t283). |
| [VS-02](#vs-02-kartenbestand--nationenpools) | Kartenbestand & Nationenpools | fertig | 1.746 Karten, 16 × 100 Nationenkarten, Starter- und Mischdecks, Deckbau 60 + 2. |
| [VS-03](#vs-03-effekt-verdrahtung--kartentext--engine) | Effekt-Verdrahtung & Kartentext = Engine | in Arbeit | Audit 0 ungelesene Parameter; Doktrin-DEF wirkt seit t298 echt, Überlast zerstört wieder; Stubs und Sonderfälle bleiben (Brummbär, `MINE_TOKEN`). |
| [VS-04](#vs-04-bot-ki) | Bot-KI | in Arbeit | Spielt seinen Zug Aktion für Aktion mit Denkpausen und hält für Reaktionen an (t291); nutzt aktive Doktrin-Fähigkeiten; Stellungswechsel aus, keine Schwierigkeitsstufen; spielt laut Playtest fast nur im Zentrum. |
| [VS-05](#vs-05-balance) | Balance | in Arbeit | Ziel 50 %; seit 0.626 Nationen 44–60 % (Caldris 49,9/47,2 %), Ausnahmeliste nur noch Merovan Misch, Bollwerk, Scheinschwerpunkt; Balance-Gate misst bei jeder Änderung (CI: Schnellvariante). |
| [VS-06](#vs-06-lore--nationentiefe) | Lore & Nationentiefe | fertig | 16 Hauptdokumente je Nation, Kurzprofile, Aufsätze; Einbindung ins Spiel schmal. |
| [VS-07](#vs-07-oberfläche-menüs-tisch-bibliothek) | Oberfläche: Menüs, Tisch, Bibliothek | in Arbeit | Designsystem t280, Tisch-HUD, Bibliothek, Bot-Ticker und Reaktionsfenster (t291), Audio-Schleife am Tisch behoben (t296); Playtest: Rückmeldung bei Aktionen zu schwach; 2,5D-Ansicht nicht auf Zielgeräten geprüft. |
| [VS-08](#vs-08-kartenfaces--grafik-porträts) | Kartenfaces & Grafik, Porträts | in Arbeit | Vorderseiten komplett; Ölketten Rothain, Karsk, Averon und Ossaria fertig, 12 Nationen und die Verdrahtung offen. |
| [VS-09](#vs-09-sound--musik) | Sound & Musik | fertig | 15 Musikstücke, 205 Effektdateien (SFX v4), Optionen; Audio-Schleife am Tisch behoben (t296). |
| [VS-10](#vs-10-tutorial--onboarding) | Tutorial & Onboarding | fertig | „Grundausbildung“, 25 Schritte, Erststart, Test grün. |
| [VS-11](#vs-11-mehrspieler--lan) | Mehrspieler / LAN | in Arbeit | Sicht je Spieler, gehärteter Server; nie mit zwei Rechnern gespielt. |
| [VS-12](#vs-12-tests-ci--repo-werkzeuge) | Tests, CI & Repo-Werkzeuge | in Arbeit | 65 Testdateien + Browser-Gates + Balance-Gate (t300); CI aktiv (t289: `npm test`, `verify.py`, Fuzz, Audit); Browser-Gates lokal; Repo sehr groß. |
| [VS-13](#vs-13-menschlicher-playtest--feedback) | Menschlicher Playtest & Feedback | in Arbeit | Erste Partien mit Menschen am 18.11.2026 protokolliert und in t297 ausgewertet; daraus t298. |
| [VS-14](#vs-14-distribution-exe-pdf-steam) | Distribution: EXE, PDF, Steam | geplant | EXE nie gebaut, PDF auf Stand 0.6b, keine Steam-Seite. |
| [VS-15](#vs-15-spielmodi-roguelike--kampagne) | Spielmodi: Roguelike & Kampagne | geplant | nur Konzepte (Fahrplan, Effektideen). |

Der **Karteneditor** (`KartenEditor/`) und die Porträtwerkzeuge (`Division_Command/portraits/`) hängen als Werkzeuge an VS-08 bzw. VS-12 und haben keinen eigenen Slice.

## 3. Slices im Detail

Je Slice: **Umfang** (Ende zu Ende, von Daten über Engine bis Oberfläche), **Status mit Begründung**, **Code und Docs**, **Gates**, **Offen**. „Offen“ nennt nur, was im Repo oder im Projektverlauf belegt ist; Unklares ist als solches markiert.

### VS-01 Kernspiel & Regeln

- **Umfang:** Front mit 9 Stellungen in 3 Abschnitten, Support, Niemandsland; Reaktionsfenster; Trophy-Siegmodus (5 SP); Hotseat; Mulligan; Deckgröße.
- **Status: fertig.** Regelwerk, Engine und Hilfe stimmen seit t283 überein (§20.1, §23.4, §24 korrigiert). Fuzz und Smoke laufen ohne Hänger.
- **Code:** `web/js/engine/engine.js` (alleinige Regelautorität), `victory_trophy.js`, `doctrine_runtime.js`, `tactical_runtime.js`, `web/js/data/catalog.js`.
- **Docs:** `regeln/RULES_v0.5_GRUNDKONZEPT.md`, `regeln/SIEGBEDINGUNGEN.md`, `regeln/REGEL_FREEZE.md`, `regeln/MECHANICS_REACTIVE.md`, `balance/STARTSPIELER_T257.md`.
- **Gates:** `npm test`, `npm run fuzz`, Smoke 400, `ui-play` (Seeds 31337 und 1234).
- **Offen:** Moral (0–5) steht nur im Regeltext (RULES §9) und ist laut t271 nicht in der Engine; AP-Deckel offen (t271). Beides niedrige Priorität.

### VS-02 Kartenbestand & Nationenpools

- **Umfang:** Katalog (nach Typ in `web/js/data/sets/types/`), Pools je Nation (100 Karten + 2 Doktrinen), Starterdecks, Kopienlimits, Seltenheit, Zwillingsprüfung.
- **Status: fertig.** 1.746 Karten (Seltenheit nachgezählt: Bronze 1.104, Silber 429, Gold 176, 37 ohne Angabe), alle Namen eindeutig, keine Gruppen mit gleichen Werten, gleichem Text und gleichen Schlüsselwörtern (t284, Test `test_twins_t284.js`).
- **Code:** `web/js/data/sets/types/*.js`, `catalog.js`, `decks.js`, `scripts/nation_pools/` (Build, Mischdecks), `scripts/tactics/`, `scripts/keywords/`.
- **Docs:** `karten/NATIONENPOOLS_100.md`, `karten/NATIONENPOOL_KARTEN.md`, `karten/KARTENPRUEFUNG.md`, `karten/ZWILLINGE_T283.md`, `regeln/ZWILLINGE_T284.md`, `regeln/SCHLUESSELWOERTER.md`, `regeln/TAKTISCHE_SCHLUESSELWOERTER.md`, `regeln/BALANCE_T268.md`.
- **Gates:** `npm test` (u. a. `test_nation_pools`, `test_unique_cards_t268`, `test_twins_t284`, `test_cards_t283`), `verify.py`.
- **Offen:** 24 Zwillingsgruppen unterscheiden sich nur über gedruckte Schlüsselwörter (Liste in `regeln/ZWILLINGE_T284.md`). Generierte Docs mit `npm run build:tactics` neu erzeugen, wenn Karten sich ändern.

### VS-03 Effekt-Verdrahtung & Kartentext = Engine

- **Umfang:** Jeder Kartentext wirkt in der Engine wie gedruckt; Prüfskript `scripts/balance/audit_text_engine_t265.js`.
- **Status: in Arbeit.** Die 14 Karten aus t267 sind repariert, alle 9 ungelesenen Effektparameter sind seit t283 verdrahtet (Audit 0). Es bleiben bekannte Stubs und Sonderfälle.
- **t298 (0.619):** Bedingte und passive DEF-Boni (alle Doktrinen, `AURA_STAT`, Ausrüstungs-Buffs) waren bis 0.611 nur Anzeige; jetzt ist die angezeigte DEF die echte (Abgleich `_dynDefSync` nach jeder Aktion und vor jedem Schaden, Bonusverlust nie unter 1, Regel §8.1). `FLANK_DEF` und `AURA_FRONT_DEF` wurden vorher doppelt angezeigt und sind jetzt einmal echt. Überlast zerstört wieder: `_destroy` brach bei `frontList`-Einträgen ohne `player` still ab (3 Aufrufstellen); alle 18 Überlast-Karten geprüft. Kampftext nennt „erhält N“ nur noch bei echtem Gegenschlag. Test `test_doctrine_def_t298.js`.
- **Code:** `engine.js`, `doctrine_runtime.js`, `scripts/balance/audit_text_engine_t265.js`, `scripts/balance/scan_stub_effects.js`.
- **Docs:** `regeln/TEXT_ENGINE_AUDIT_T265.md`, `regeln/KARTEN_T267.md`, `regeln/EFFEKT_SONDERFAELLE_T251.md`, `regeln/EFFEKT_SONDERFAELLE_T255.md`, `regeln/SOFORT_SONDERFAELLE.md`, `regeln/KARTEN_SONDERFAELLE.md`, `technik/CHOICE_WIRING.md`, `balance/STUB_SCAN_T250.md`.
- **Gates:** `npm test` (`test_card_review`, `test_effects*`, `test_choice_wiring`, `test_doctrine_actives_t285`), Prüfskript.
- **Offen:**
  - Störwagen Brummbär: Stören/Übernehmen ist ein Engine-Stub ohne Wirkung (Karte in keinem Deck; `balance/BALANCE_T285.md` §6).
  - `MINE_TOKEN`: Sonderfall mit festen 3 Schaden (t271).
  - `PASSIVE_DEF` (keine Karte nutzt es) und `flags.buffDef` (nie über 0 gesetzt) sind tote Pfade; mitgeführt, nicht entfernt.
  - Prüfskript kennt `CM` nicht als Effektfamilie (t271: 17 Fehlalarme; ob seitdem behoben, ist **nicht nachgeprüft**).

### VS-04 Bot-KI

- **Umfang:** Bot mit Vorausschau (t254), Bewertung aktiver Fähigkeiten, Regler.
- **Status: in Arbeit.** Seit t285 bietet `listActions` Schutzwall, Feldreparatur, Überschuss und Stellungswechsel an; der Bot nutzt die Feldreparatur (98 % der Gelegenheiten) und Schutzwall mit übrigen AP (28 %, gewollt). **Seit t291 (0.610)** spielt der Bot im Browser eine Aktion, zeigt sie (Ticker, Hervorhebung), denkt kurz nach (Tempo langsam/normal/schnell) und plant dann neu. Kann der Mensch einen Soforteinsatz aus der AP-Reserve spielen, hält er an (Reaktionsfenster; Einstellung immer/5 s/nie). Kein Nachholen zu Zugbeginn mehr. Headless unverändert (Hash von 80 Partien identisch).
- **Code:** `web/js/ai/bot.js`, `web/js/ai/bot-seq.js` (Schritt-API, Tempo, Reaktionsprüfung); Ablauf im Bot-Abschnitt von `web/js/ui/app.js`; Schalter `kwMove` in `DCBot.defaults`.
- **Docs:** `balance/BOT_KI_T254.md`, `balance/BALANCE_T285.md` §1–3, `technik/BOT_SEQUENZ_T291.md`.
- **Gates:** `test_bot_t254`, `test_bot_ui_t254`, `test_doctrine_actives_t285`, `test_botseq_t291`, `ui-play`, `botseq-play`.
- **Offen:**
  - Stellungswechsel für die KI einschalten (verschiebt Nationen um bis zu 16 Punkte, v. a. Sahr, Vesper, Merovan, Lyr) – eigene Runde mit Nachbalancierung.
  - Bot ignoriert laut Playtest (t297, B5) die Flügel und spielt fast nur im Zentrum; leere Flügel und Durchbruch des Gegners beachten (erst jetzt messen, da die DEF-Werte seit t298 stimmen).
  - Keine Bot-Schwierigkeitsstufen (nur zwei Bot-Arten plus Regler, t271).
  - Überschuss wird mit 5 AP fast nie bezahlbar; Bot nutzt ihn, sobald es sich lohnt.
  - Reaktionsfenster mit Menschen erproben (im Playtest t297 nur 2× in Zug 1 aufgegangen, 1× genutzt, also praktisch ungetestet): Tempo-Standard (normal) und „immer anhalten“ sind Annahmen. Fallen und Konter, die nicht als Soforteinsatz gespielt werden, löst weiter nur die Engine aus.

### VS-05 Balance

- **Umfang:** Bot-gegen-Bot-Simulationen für Nationen (Starter- und Mischdecks) und Doktrinen, Abstimmung der Werte.
- **Status: in Arbeit.** Die Zahlen unten sind Bot-Messungen (Rauschen laut Bericht etwa ±1,4 bis ±2 Punkte je Nation). **Menschliche Daten gibt es nicht** (siehe VS-13).
- **Stand t301 (0.626, Balance-Gate voll, 57.024 Partien; [`balance/BALANCE_T301.md`](balance/BALANCE_T301.md)):** Etappensicherung heilt zu Zugbeginn 1 an der ruhenden beschädigten Einheit mit dem größten Fehlbetrag statt +1 DEF für alle; ein nicht gedruckter Abschnittsbonus ist entfallen (RULES §8.3). Caldris 62,5 → 49,9 % (Starter), 64,3 → 47,2 % (Misch); Etappensicherung 56,3 → 46,0 %. Nationen-SD Starter 3,15, Misch 4,64; Spanne 46,1–57,6 % bzw. 43,7–60,5 %. Caldris-Ausnahme entfernt. **Zurückgestellt:** Bot-Flügelspiel (Playtest B5) macht das Gate rot (15 Fehler: Lyr/Vesper ~70 %, Namar/Rothain/Theryn ~35 %), weil die Balance auf einen Mitte-Bot abgestimmt ist; weiter mit den Operationsplänen (BALANCE_T301 §4).
- **Stand t300 (0.624, Balance-Gate voll, 57.024 Partien; [`balance/BALANCE_T300.md`](balance/BALANCE_T300.md)):** Vorschlag p2 umgesetzt (Linienkrieg nur bei drei im Abschnitt, Auffangen ohne Grundbonus, Gepanzerter Fuß nur ausgerüstet, Entsatz hält nur ATK). Starter: SD 7,33 → 4,59, Spanne 44,8 % (Steinmark) bis 62,5 % (Caldris), Startspieler 48,9 %. Misch: SD 9,37 → 6,08, Spanne 42,1 % (Lyr) bis 64,3 % (Caldris), Startspieler 57,0 %. Sahr 74,0 → 56,3 % (Misch). Doktrinen: Linienkrieg 65,4 → 50,4 %, Entsatz 63,9 → 51,5 %, Auffangen 59,5 → 48,9 %, Gepanzerter Fuß 60,2 → 52,9 %; außerhalb 40–60 % sonst nur Bollwerk 63,6 % und Scheinschwerpunkt 63,7 % (Ausnahmeliste). Vergleichswerte 0.619 mit derselben Harness und denselben Seeds gemessen; seit t300 ist die Messung exakt wiederholbar (Bot-Zufall geseedet). Zusätzlich behoben: Schaden aus Soforteinsätzen zerstört Einheiten mit 0 DEF sofort (Altfehler, von der t298-Invariante gefunden).
- **Balance-Gate (seit t300):** `npm run balance-gate` (voll, lokal, etwa 7 min auf 8 Kernen, unter Last bis 12 min) und `npm run balance-gate:quick` (CI-Job `balance-quick`, etwa 3 min). Band 40–60 %, Ausnahmeliste `scripts/balance/balance_allowlist.json`, Vergleichsstand `scripts/balance/baseline/`. Beschreibung: [`balance/BALANCE_GATE.md`](balance/BALANCE_GATE.md).
- **Stand t298 (0.619, je 10.080 Partien je Modus, gleiche Seeds vorher/nachher; [`balance/BALANCE_T298.md`](balance/BALANCE_T298.md)):** Durch die echte Doktrin-DEF steigt die Streuung stark. Starter: SD 1,42 → 7,37, Spanne 42,1 % (Dargan) bis 65,1 % (Sahr), Startspieler 48,5 → 49,7 %. Misch: SD 2,08 → 9,52, Spanne 38,4 % (Averon) bis **75,2 % (Sahr)**, Startspieler 56,9 → 57,6 %. Doktrinen: Linienkrieg 45,2 → 64,7 %, Bollwerk 65,1 %, Entsatz 63,4 %, Auffangen 61,1 %. **Werte nicht geändert**; Vorschlag p2 (Linienkrieg, Auffangen, Gepanzerter Fuß, Entsatz) senkt Misch-SD auf 6,2, Caldris (Etappensicherung) braucht eine Codeänderung.
- **Stand t285 (gepoolt, 20.160 Partien je Modus, vor t298):**
  - Starterdecks: Spanne 46,1 % (Merovan) bis 55,2 % (Ossaria), Startspieler 49,4 %.
  - Mischdecks: Spanne 44,0 % (Lyr) bis 54,1 % (Theryn), Startspieler 57,1 % (bewusst, siehe Festlegungen).
  - Doktrinen im Spiegelmatch: Bollwerk 50,6 % (vorher 42,6 %), Sicherer Nachschub 48,0 %, Normverband 44,1 %; Spanne von 44,1 % bis Scheinschwerpunkt 55,3 %.
- **Code/Werkzeuge:** `scripts/balance/balance_gate.js` mit `sim_nations_t298.js`, `sim_doctrines_t298.js`, `balance_allowlist.json`, `baseline/`; ältere Skripte unter `scripts/balance/` (`sim_t255.mjs`, `sim_first_player.mjs` u. a.), `doctrine_runtime.js` (Doktrin-Parameter), Starterdecks in `web/js/data/decks.js`.
- **Docs:** `balance/BALANCE_T301.md` (aktuell), `balance/BALANCE_T300.md`, `balance/BALANCE_GATE.md`, `BALANCE_T298.md`, `BALANCE_T283.md`, `BALANCE_T284.md`, `BALANCE_T285.md`, ältere Berichte T237–T255, `DOKTRIN_BALANCE.md`, `STARTSPIELER_T257.md`, `regeln/BALANCE_T268.md`.
- **Gates:** `npm run balance-gate` nach jeder Karten- oder Regeländerung und jeder Erweiterung (Pflicht), `test_balance_t231/237/238/240` (Wertband, Pools), `test_balance_t300` (p2-Werte, Gate-Logik, Ausnahmeliste).
- **Offen:**
  - Normverband (Nationsdoktrin Steinmark) bei etwa 44 %; eine Aufwertung machte Steinmark zu stark (55,7 bzw. 59,0 %, t284) und wurde verworfen.
  - ~~Etappensicherung neu fassen~~ erledigt in 0.626 (t301): Caldris 49,9 / 47,2 %, Ausnahme entfernt.
  - **Bot-Flügelspiel** (Playtest B5): entwickelt, aber zurückgestellt; mit ihm wird das Gate rot (15 Fehler), weil Verteilte Stellung/Scheinschwerpunkt gewinnen und Ballungs-Doktrinen verlieren. Nachbalancierung zusammen mit den Operationsplänen (BALANCE_T301 §4).
  - **Bollwerk** (63,6 %) und **Scheinschwerpunkt** (63,7 %): DEF zählt seit 0.619 echt; Ausnahmeliste bis 66 %.
  - **Merovan** Misch 60,1 % (Ausnahmeliste bis 63 %), Ursache nicht untersucht.
  - **Schwache Nationen:** Lyr 42,1 %, Namar 43,3 %, Ossaria 44,3 %, Dargan 44,6 % (Misch), Steinmark 44,8 % (Starter); Doktrinen Blitzkrieg 41,2 %, Abriegeln 42,0 %, Normverband 43,1 %, Auswertung 44,9 % (alle im Band, aber unter 45 %).
  - **Engine (offen, t300 gefunden):** `_kwRecompute` und `_dynDefSync` klemmen bei sinkendem Bonus auf mindestens 1 DEF; eine Einheit mit 0 DEF würde dadurch wieder auf 1 gesetzt. Seit `_reapDeadFront()` (nach jeder Aktion vor der Neuberechnung) nicht mehr erreichbar, die Klemme sollte aber 0 DEF nicht anheben. Laufzeit Quick-Gate unter Last 437 s (idle 182 s); CI-Laufzeit des Jobs `balance-quick` beobachten.
  - Vorschlag **nicht umgesetzt:** Überschuss für 1 AP (braucht Entscheidung).
  - Das volle Gate läuft nicht in der CI (etwa 18 min auf 4 Kernen); es bleibt lokale Pflicht. `audit.js` aus `tmp_t283` fehlt weiter.

### VS-06 Lore & Nationentiefe

- **Umfang:** Welt, Philosophie und Kriegsführung der 16 Nationen.
- **Status: fertig** für die Textebene: 16 Hauptdokumente in `nationen/lore_nationen/` (zusammen rund 25.700 Wörter), Kurzprofile `nationen/<Nation>/Kriegsfuehrung.md`, ältere Aufsätze und Sammeldateien (nicht gelöscht, bei Widerspruch gilt `lore_nationen/`). Taktik- und Doktrinbezug in `TAKTIK_NATIONEN.md`, `DOKTRIN_NATIONEN.md`.
- **Code:** nur Kurzformeln im Feld `lore` in `web/js/data/nationen.js` und Hilfe-Verweise in `web/index.html`. Dass die Langtexte im Spiel angezeigt werden, ist im Code **nicht belegt**.
- **Gates:** keine (reine Texte).
- **Offen:** Anbindung der Lore ans Spiel (z. B. Nationsseite, Karten-Flavor) ist weder geplant noch entschieden. Entscheidung nötig, bevor dazu Arbeit entsteht.

### VS-07 Oberfläche: Menüs, Tisch, Bibliothek

- **Umfang:** Titel, Menüs, Optionen, Deckbau, Bibliothek mit Blättern, Spieltisch mit Kopfleiste und Protokoll, 2,5D-Kamera, Rückfragen, Endbildschirm, Spielstand zurücksetzen.
- **Status: in Arbeit.** Designsystem (t280), Tisch (t279), Bibliothek (t281), Handkarten bei 1024 px und abgeschnittene Knöpfe (t283) sind erledigt. Seit t291: Bot-Ticker oben links, Reaktionsfenster, Optionen „Bot-Tempo“ und „Reaktionsfenster“ (Spielablauf und im Spiel). Ereignisse werden über eine laufende Nummer erkannt; vorher gingen sie ab 80 Protokolleinträgen verloren. Offen ist die 2,5D-Ansicht auf echten Geräten.
- **Code:** `web/index.html`, `web/css/`, `web/js/ui/` (u. a. `app.js`, `ui-screens.js`, `library.js`, `table-camera.js`, `end-screen.js`, `reset.js`).
- **Docs:** `UI_DESIGN_T280.md`, `technik/TABLE_CAMERA.md`, `technik/UI_TEST_T256.md`.
- **Gates:** `ui-play` (Seeds 31337, 1234), `botseq-play`, `layout-test` (6 Fenstergrößen, Überlauf und abgeschnittene Knöpfe), `screens-test` (75 Ansichten), `libzoom-play`, `reset-play`, `funcs-play`, Tests `test_ui_*`, `test_table_*`, `test_hud_pro`.
- **Offen:** Playtest t297 (B4): Rückmeldung bei Fehlversuchen schwach – angreifbare Einheiten nicht hervorgehoben, kein Grund bei Fehlschlag („außer Reichweite“, „keine AP“), ungültige Ausrüstungsziele nicht ausgegraut, toter Code in `app.js` (Modal für `SUMMON_SICK`/`EXHAUSTED`). Protokoll-Schema 2 (Decks, Kampf-/SP-Ereignisse, Reaktionsfenster, Einstellungen) fehlt. 2,5D auf Zielgeräten testen (seit t271 offen). Der Verweis der Hilfe auf `STATUS_T271.md` zeigt seit t291 auf diese Datei.

### VS-08 Kartenfaces & Grafik, Porträts

- **Umfang:** Vorderseiten (alpha40), Motive, Kartenrückseite, Tischgrafiken, Offiziersporträts, Renderpipeline.
- **Status: in Arbeit.** Alle 1.746 Vorderseiten existieren und bestehen `verify.py`. Seit 0.636 (t318) im Stil der kleinen Karten: Titelbanner und AP-Stern wie klein (Titelschrift bleibt die alte alpha40-Schrift), Hintergründe und Textfelder prozedural je Karte (`KartenEditor/tools/texgen.py`, fester Seed je ID in `scripts/graphics/tex-seeds.json`, neu würfeln nur per `render.py --reroll <id>` oder Editor-Knopf), Einheiten wie Runde 3, Ausrüstung mit Ocker-Feld und Winkeln (Bronze 1, Silber 2, Gold 3). Vorschaubilder `faces-v2-thumb/` (300 × 418) für Laufband und Kartenflüge. Gesamtrender etwa 45 min (6 Jobs). Seit 0.641 (t325) liegen Ölgemälde-Ketten für Rothain und Karsk vor, seit 0.643 (t336) zusätzlich Averon, seit 0.645 (t337) zusätzlich Ossaria (je 4 Personen × 2 Uniformen × 16 Ränge unter `web/assets/portraits/oel_ketten/`); 12 Nationen fehlen noch, die Ketten sind noch nicht in `portraits.js` oder im Editor verdrahtet. Lücken: vorläufige Motive und die übrigen Porträts.
- **Code/Werkzeuge:** `scripts/graphics/` (`render.py`, `verify.py`), `scripts/cards-review/kurz.py`, `web/assets/cards/`, `web/assets/portraits/` (Spiel: ältere Einzelporträts; Bestand der Ketten: `portraits/oel_ketten/`), `tools/portraits/oel/chain2_build.py`, `Division_Command/portraits/` (älteres Ebenenwerkzeug), `KartenEditor/`.
- **Docs:** `technik/KARTEN_RENDER_ALPHA40.md`, `technik/PORTRAIT_OEL_KETTEN.md`, `technik/PORTRAIT_SYSTEM.md`, `regeln/KARTEN_KUERZUNGEN.md`, `scripts/graphics/README.md`.
- **Gates:** `verify.py` (1024 × 1428, Texte, Motivpräsenz, Seed-Register, Renderer-Digest), `tests/test_tex_seeds_t315.py` (lokal; Determinismus, Muster je Typ verschieden), `test_graphics`, `test_card_faces_text`, `test_image_paths`.
- **Offen:**
  - 650 Karten tragen laut t258 ein vorläufiges Motiv („platzhalter“). Heutiger Zähler **nicht neu erhoben**.
  - Porträts: Ölketten Rothain, Karsk, Averon und Ossaria fertig (32 Ketten, noch nicht in `portraits.js`/Editor). 12 Nationen offen. Offene Frage: Soll Karsk sichtbar altern oder lore-treu jung mit Implantaten bleiben? Die 72 älteren Einzelporträts in 8 Ordnern bleiben vorerst die im Spiel genutzten Dateien; Ordner „Jetzt“/„Ossar“ unklar (t271).
  - Das Minen-Token `web/assets/cards/MINE.png` wurde am 14.11.2026 manuell ersetzt; ob alle Verwendungen es korrekt darstellen, ist nicht eigens geprüft.

### VS-09 Sound & Musik

- **t296 (Version 0.611):** Die Audio-Schleife am Tisch ist behoben. Ursache: `stop()` in `audio-data.js` setzte `currentTime = 0` auch auf bereits pausierte Elemente; in Chromium löst das `seeked` und `canplay` aus, `index.html` ruft bei `canplay` `applyAudio` auf, das über `playTable` wieder `stop()` ruft. Bericht: [`technik/AUDIO_SCHLEIFE_T296.md`](technik/AUDIO_SCHLEIFE_T296.md).

- **Umfang:** Menü- und Kampfmusik, Soundeffekte, Optionen, Audio-Rückmeldungen.
- **Status: fertig** für den Alpha-Umfang: 15 WAV-Stücke (4 Menü, 11 Kampf; t258 zählte noch 16), 205 SFX-Dateien (SFX v4).
- **Code:** `web/js/ui/audio-feedback.js`, `audio-options.js`, `web/js/data/audio-data.js`, `web/assets/audio/index.json`, `web/assets/sfx/`.
- **Docs:** `technik/SOUND_QUELLEN_SFX.md`, `web/assets/sfx/SOUND_QUELLEN.md`.
- **Gates:** `test_audio_*`, `test_audio_loop_t296.js`, `sfx-smoke` (`npm run sfx-smoke`), `audio-play` (`npm run audio-play`, zählt Schreibzugriffe am Tisch, t296).
- **Offen:** nur 15 Stücke (niedrige Priorität); WAV-Dateien mit 37–50 MB belasten das Repo (siehe VS-12).

### VS-10 Tutorial & Onboarding

- **Umfang:** Geführte Erstpartie „Grundausbildung“ vor dem Hauptmenü, Überspringen und Wiederholen.
- **Status: fertig.** 25 Schritte (t275); die Tutorial-Box dockt in kleinen Fenstern seitlich an (t283).
- **Code:** `web/js/tutorial/scenario.js`, `web/js/ui/tutorial.js`.
- **Docs:** `TUTORIAL_T275.md`.
- **Gates:** `test_tutorial_t275`, `tutorial-play`, `reset-play`.
- **Offen:** keine belegten Lücken. Nutzbarkeit für echte Neulinge ist ungeprüft (hängt an VS-13).

### VS-11 Mehrspieler / LAN

- **Umfang:** LAN-Lobby, Relay-Server, Sitzplätze, Chat, getrennte Sicht je Spieler.
- **Status: in Arbeit.** t283: jeder Spieler bekommt nur seine Sicht (`getStateFor`), `server.py` gehärtet (nur LAN, Same-Origin, WebSocket-Origin, nur Sitzinhaber senden Züge), LAN-Gast bekommt einen Spieltisch. Getestet mit zwei Browser-Clients auf **einem** Rechner.
- **Code:** `web/js/net.js`, `Division_Command/server.py`, `launcher.py`, `firewall.bat`.
- **Docs:** `technik/REPO_GROESSE_LFS_T283.md` (Klonen), Hilfe im Spiel; es gibt **keine eigene LAN-Doku** (offen).
- **Gates:** `lan-play`, `test_lan_view_t283.js`, `tests/test_server_t283.py`.
- **Offen:** Partie mit zwei Rechnern (seit t271 offen); Firewall und Windows-Verhalten ungeprüft; eigene LAN-Doku fehlt.

### VS-12 Tests, CI & Repo-Werkzeuge

- **Umfang:** Testsuite, Browser-Gates, Fuzz, Smoke, Prüfskripte, CI, Repo-Größe, Build.
- **Status: in Arbeit.** `npm test` umfasst 66 Testdateien (`package.json`) und ist am 19.11.2026 auf dem t301-Stand (0.626) grün (siehe [Gates](#8-gates-und-befehle)). **CI ist seit t289 aktiv** (GitHub Actions, `.github/workflows/ci.yml`, Beschreibung in [`technik/CI.md`](technik/CI.md)): bei Push/PR auf `main` und manuell laufen `npm test`, `verify.py`, `npm run fuzz` und das Text-Engine-Audit, seit t300 parallel der Job `balance-quick` (Balance-Gate in kleiner Stichprobe). Die Browser-Gates laufen weiter nur lokal.
- **Code:** `tests/`, `scripts/`, `package.json`, `package-lock.json`, `.github/workflows/ci.yml`.
- **Docs:** `technik/CI.md`, `technik/UI_TEST_T256.md`, `technik/REPO_GROESSE_LFS_T283.md`, `technik/PLAYTEST_LOGS.md`.
- **Offen:**
  - CI deckt nur die schnellen Gates ab. Die Playwright-Browser-Gates (`ui-play`, `tutorial-play`, `reset-play`, `layout-test`, `screens-test`, `libzoom-play`, `lan-play`, `funcs-play`) und `smoke_sim 400` laufen nicht in der CI (Chromium, lange Laufzeit) und bleiben lokale Gates vor jedem Push. Mögliche spätere Erweiterung: ein Teil davon als eigener, manuell startbarer Job.
  - Repo-Größe: `.git` etwa 5,6 GB, Kartenflächen etwa 1,5 GB, Audio etwa 0,55 GB. Plan (LFS nur für neue Commits, WAV nach OGG) steht in `technik/REPO_GROESSE_LFS_T283.md`; nicht umgesetzt, braucht Freigabe.
  - Technikschuld laut t282: `engine.js` (8.260 Zeilen) und `app.js` (3.523 Zeilen) sind große Einzeldateien; viele `!important` im CSS (t282: 2.394); JSDoc deckt etwa die Hälfte (t282, Heuristik).
  - Abdeckungslücken laut t282: HTTP-Endpunkte von `server.py` (seit t283 teilweise durch `test_server_t283.py`), `hand-drag`, `portraits`.
  - Mess-Harness seit t298 eingecheckt, Balance-Gate seit t300 (siehe VS-05).

### VS-13 Menschlicher Playtest & Feedback

- **Umfang:** Echte Partien mit Menschen, Protokoll, Auswertung, Rückfluss in Balance und Regeln.
- **Status: in Arbeit.** Werkzeug ist fertig (Playtest-Panel mit Chat, Logs und Notizen, Logger, Auswertungsskripte). Am 18.11.2026 gab es die ersten Partien mit Menschen (u. a. Partie `mwmhnwd9`); t297 hat die Logs ausgewertet (Bericht nicht im Repo). Daraus kamen die Fixes in t298 (Doktrin-DEF, Überlast, Kampftext).
- **Code:** `web/js/playtest/`, `scripts/playtest/`.
- **Docs:** `technik/PLAYTEST_LOGS.md`.
- **Gates:** `test_playtest_logger.js`.
- **Offen:** Restbefunde aus t297: Bot spielt fast nur im Zentrum (VS-04), Rückmeldung bei Aktionen zu schwach (VS-07), Protokoll-Schema 2 fehlt, Reaktionsfenster im Playtest nur 2× aufgegangen (praktisch ungetestet). Weitere Partien nötig; alle Balancezahlen stammen weiter aus Bot-Partien.

### VS-14 Distribution: EXE, PDF, Steam

- **Umfang:** Windows-EXE, Projekt-PDF, Regelheft, Steam-Seite mit Demo.
- **Status: geplant.** `DivisionCommand.spec`, `build.bat`, `file_version_info.txt` (0.6.4.0) liegen vor; die EXE wurde laut t271 nie gebaut oder auf einem sauberen Rechner gestartet. Das PDF `docs/Division_Command_Dokumentation.pdf` trägt „Version: Alpha 0.6b“, die Markdown-Fassung 0.6e. Keine Steam-Seite.
- **Docs:** `Division_Command_Dokumentation.md` (§9 Markt- und Finanzanalyse, §8 Fahrplan), `archiv/FAHRPLAN.md`.
- **Gates:** keine.
- **Offen:** EXE bauen und testen; PDF neu erzeugen (Werkzeug dafür im Repo **nicht belegt**); ein Regelheft existiert nicht.

### VS-15 Spielmodi: Roguelike & Kampagne

- **Umfang:** Roguelike („Feldzug / Operationslauf“) und Nationen-Kampagne.
- **Status: geplant.** Nur Konzepte: `archiv/FAHRPLAN.md` (Abschnitt Roguelike), `entwicklung/NEUE_EFFEKTIDEEN.md`. Im Code kein Roguelike (Suche in `web/js` ohne Treffer).
- **Offen:** Der Fahrplan ist als überholt archiviert; vor Arbeitsbeginn muss der Slice neu zugeschnitten und mit dem Projektleiter abgestimmt werden (eine Nation, ein Lauf als erster senkrechter Schnitt, wie im Fahrplan angelegt).

## 4. Zuletzt gemacht

Quelle: Git-Log (`git log`), `CHANGELOG.md` und die Berichte unter `balance/` und `entwicklung/`. Das Autorenfeld ist kein sicheres Merkmal: „Division Command“ (263 Commits) steht für die Arbeit des Bots, „OrtwinvonGrimgard“ (702) für Commits mit dem GitHub-Konto des Projektleiters, darunter auch frühere Bot-Läufe vor Einführung der t-Nummern; „Grok Bot“ (1). Eine saubere Trennung „Bot gegen manuell“ ist für die Zeit vor dem 09.11.2026 daher **nicht belegbar**.

### Bot (t-Nummern, jeweils mit Tests und Berichten)

| Datum | Version / Commit | Inhalt |
|---|---|---|
| 21.11.2026 | **0.645** (t337, Tag `v0.645`) | **Ölgemälde-Ketten Ossaria:** Platte und Klage, je 4 Personen × 16 Ränge, Narben als eigene Layer. Bestand jetzt Rothain, Karsk, Averon und Ossaria (32 Ketten); 12 Nationen offen, noch nicht in `portraits.js`/Editor. Cache unverändert `divcmd-alpha49a`. Regeln, Werte, Texte und Balance unverändert. Siehe [`technik/PORTRAIT_OEL_KETTEN.md`](technik/PORTRAIT_OEL_KETTEN.md). |
| 21.11.2026 | **0.643** (t336, Tag `v0.643`) | **Ölgemälde-Ketten Averon:** Feld und Dienst, je 4 Personen × 16 Ränge, Narben als eigene Layer. Bestand jetzt Rothain, Karsk und Averon (24 Ketten); 13 Nationen offen, noch nicht in `portraits.js`/Editor. Cache unverändert `divcmd-alpha49a`. Regeln, Werte, Texte und Balance unverändert. Siehe [`technik/PORTRAIT_OEL_KETTEN.md`](technik/PORTRAIT_OEL_KETTEN.md). |
| 20.11.2026 | **0.641** (t325, Tag `v0.641`) | **Offiziersporträts als Ölgemälde-Ketten:** Rothain (Dienstrock, Gala) und Karsk (Panzer, Technik) je 4 Personen × 16 Ränge, Narben als eigene Layer; 14 Nationen offen, noch nicht in `portraits.js`/Editor. Verworfene Layer-Assets (`layers/`, `layers_oel/`) entfernt. Cache unverändert `divcmd-alpha49a` (neue Bilder nicht in der App-Shell, HTML/JS bereits Netzwerk zuerst). Regeln, Werte, Texte und Balance unverändert. Siehe [`technik/PORTRAIT_OEL_KETTEN.md`](technik/PORTRAIT_OEL_KETTEN.md). |
| 20.11.2026 | **0.636** (t318, Tag `v0.636`) | **Neue Kartengrafik (t310–t321):** alle 1.746 Vorderseiten neu im Stil der kleinen Karten; prozedurale Hintergründe/Textfelder mit festem Muster je Karte (Seed-Register, bytegleich reproduzierbar, `--reroll`/Editor-Knopf); Ausrüstung mit Ocker-Feld und Winkeln je Stufe, weiße Schrift mit Navy-Kontur und weichem Schatten; Vorschaubilder für Laufband/Kartenflüge; Cache alpha49a. Regeln, Werte, Texte und Balance unverändert. |
| 19.11.2026 | **0.626** (t301, Tag `v0.626`) | **Etappensicherung neu gefasst:** heilt zu Zugbeginn 1 an der ruhenden beschädigten Einheit mit größtem Fehlbetrag statt +1 DEF für alle (Text, Kurztext, Fläche, Regel §8.3, Tutorial). Caldris 62,5/64,3 → 49,9/47,2 %, Ausnahme entfernt. Bot-Flügelspiel gemessen, aber zurückgestellt (Gate rot). [`balance/BALANCE_T301.md`](balance/BALANCE_T301.md), Test `test_doctrine_etappen_t301.js`. |
| 18.11.2026 | **0.624** (t300, Tag `v0.624`) | **Balance-Grobkorrektur p2 und Balance-Gate:** Linienkrieg +1 DEF nur bei drei eigenen im Abschnitt, Auffangen ohne Grundbonus, Gepanzerter Fuß nur ausgerüstet +1 ATK/+1 DEF, Entsatz hält nur +1 ATK (Texte, Kurztexte, 4 Flächen, Regel §8.2). Nationen-SD Misch 9,37 → 6,08, Sahr 74,0 → 56,3 %. Neues Pflicht-Gate `npm run balance-gate` (Band 40–60 %, Ausnahmeliste, Vergleichsstand) und CI-Job `balance-quick`. [`balance/BALANCE_T300.md`](balance/BALANCE_T300.md), [`balance/BALANCE_GATE.md`](balance/BALANCE_GATE.md), Test `test_balance_t300.js`. |
| 18.11.2026 | **0.619** (t298, Tag `v0.619`) | **Doktrin-DEF echt, Überlast, Kampftext (aus Playtest t297):** Alle bedingten/passiven DEF-Boni waren nur Anzeige (Parlamentsbote zeigte 2/4 und starb an 2 Schaden); jetzt Abgleich nach jeder Aktion und vor jedem Schaden, Bonusverlust nie unter 1 (Regel §8.1). `FLANK_DEF`/`AURA_FRONT_DEF` nicht mehr doppelt. Überlast zerstört wieder (3 stille `_destroy`-Abbrüche). Kampftext „erhält N“ nur bei echtem Gegenschlag. Balance verschoben (Misch 38–75 %), nicht nachjustiert, Vorschlag in [`balance/BALANCE_T298.md`](balance/BALANCE_T298.md). Test `test_doctrine_def_t298.js`, Harness `scripts/balance/*_t298.js`. |
| 18.11.2026 | **0.611** (t296, Tag `v0.611`) | **Audio-Schleife am Tisch behoben (Fix, +0,001):** `stop()` in `audio-data.js` setzt `currentTime` nur noch, wenn nötig (sonst `seeked`/`canplay` → `applyAudio` → `playTable` → `stop()` in Endlosschleife); `applyAudio` speichert `dc_music`/`dc_vol` nur noch bei Änderung (`persistAudio`); `keepBgm` startet die Titelmusik am Tisch nicht mehr (das hatte die Schleife bisher verdeckt). Gemessen im Headless-Chromium am Tisch: vorher etwa 33.000–38.000 Schreibzugriffe pro Sekunde (auch schon in `v0.6e`), nachher 0. Neue Tests `test_audio_loop_t296.js` (`npm test`) und `audio-play`. Siehe [`technik/AUDIO_SCHLEIFE_T296.md`](technik/AUDIO_SCHLEIFE_T296.md). |
| 17.11.2026 | **0.610** (t291, Tag `v0.610`) | **Bot-Zug in Einzelschritten:** eine Aktion, Anzeige (Ticker, Hervorhebung), Denkpause (Tempo langsam/normal/schnell), neu planen. Reaktionsfenster, wenn der Mensch einen Soforteinsatz aus der AP-Reserve spielen kann (Einstellung immer/5 s/nie, „in diesem Zug nicht mehr anhalten“). Kein Nachholen zu Zugbeginn; Pause bei Tab im Hintergrund. Ereignisse mit laufender Nummer (Fehler ab 80 Protokolleinträgen behoben). Headless unverändert, keine Balanceverschiebung. `technik/BOT_SEQUENZ_T291.md`, Tests `test_botseq_t291`, `botseq-play`. |
| 17.11.2026 | t289 (Commit siehe `git log`, kein neuer Tag) | **CI aktiviert:** `.github/workflows/ci.yml` (Push/PR auf `main`, manuell; `npm test`, `verify.py`, Fuzz, Audit), `package-lock.json` eingecheckt (`npm ci`), Vorlage `technik/ci-workflow.yml` durch `technik/CI.md` ersetzt. Der Projektleiter hat dafür dem Bot den GitHub-Scope `workflow` freigegeben. Keine Spieländerung, keine Versionsänderung. |
| 13.11.2026 | **0.6e** `9a0f3e2d` (t285) | KI nutzt Schutzwall, Feldreparatur, Überschuss; Stellungswechsel in `listActions` (Bot-Nutzung aus); Bollwerk +1 ATK ab 6 DEF (42,5 → 50,4 %), Sicherer Nachschub heilt alle gepanzerten Einheiten (46,7 → 48,7 %). `balance/BALANCE_T285.md` |
| 13.11.2026 | **0.6d** `1323f53c` (t284) | 141 Zwillingskarten unterschieden (Gruppen mit gleichem Text und gleichen Schlüsselwörtern 3 → 0, nur Werte+Text 119 → 24); Doktrinen Stoßtrupp, Lauer, Gegenstoß; Starterdeck-Tausche; neutraler Hotseat-Endbildschirm. `balance/BALANCE_T284.md` |
| 12.11.2026 | **0.6c** `2077926f` (t283) | LAN-Sicht je Spieler und gehärteter Server; Regelwerk §20.1/§23.4/§24 (Mulligan, 60 + 2); 11 Karten von 6+ AP auf 5 AP; Doktrinen; Oberfläche (2,5D-Hand, Knöpfe, Tutorial-Box); 9 Effektparameter verdrahtet; CI-Vorlage; Funktionsdurchgang `funcs-play`. `balance/BALANCE_T283.md` |
| 12.11.2026 | `3fd4f98f` (t281), `3b96bc75`/`bc0b0e57` (t280) | Bibliothek mit Blättern; Designsystem für alle Menüs und den Tisch |
| 12.11.2026 | t282 (nur Bericht, kein Commit) | Vollanalyse des ganzen Spiels mit 19 Befunden. Bereichsbewertungen laut Bericht: Regeln 2,7 · Balance 2,5 · UI 2,7 · Code 3,3 · Tests 1,7 (Skala steht im Bericht, nicht im Repo). Der Bericht liegt nicht im Repo; die Befunde sind in t283–t285 abgearbeitet oder in den Offen-Listen oben geführt. |
| 12.11.2026 | `5990ef38` (t275), `27db84a5` (t278), `e59cc621` (t279) | Tutorial „Grundausbildung“; Spielstand zurücksetzen; aufgeräumter Tisch mit Kopfleiste |
| 11.11.2026 | `f0c5bce9` (t257) bis `11ff8fb5` (t268/t269), | t257: beide Spieler 5 AP in Zug 1; t258/t265/t271: Statusanalysen; t259: Browser-Hänger und Armageddon behoben; t267: 14 Karten repariert; t268/t269: Nationen 48–52 % (Bot, damaliger Messaufbau), keine funktionsgleichen Karten, Elite-Zitat mittig. Berichte `entwicklung/STATUS_T258/265/267/268/271.md` |
| 10.11.2026 | Tags `v0.6a` `e5f0dccd`, `v0.6b` `2de5de78` | 0.6a: Kartenprüfung aller 1.746 Karten, alpha40-Design, Steilfeuer I–V, Bot-Hänger behoben. 0.6b: verdeckte Fallen bei Feindkontakt, realistischer Mischdeck-Generator, Caldris abgeschwächt (Quelle: `Division_Command_Dokumentation.md` §7) |

### Manuell (Projektleiter)

| Datum | Commit | Inhalt |
|---|---|---|
| 14.11.2026 | `e862095e`, `eb619922`, `356b766f`, Merge `54eee9ce` | Minen-Token `web/assets/cards/MINE.png` durch ein neues „MINEN!“-Dreieck mit Totenkopf ersetzt (Hintergrund entfernt). Reine Bilddatei, kein Code. |
| 07.–09.11.2026 | u. a. `61bdb1db`, `3982a50d`, `a6e4c36a`, `f81dd2a4` | `index.html` und Menü-Partials wiederhergestellt, Hilfe mit Marktanalyse, Lore-Aufsätze (Steinmark u. a.) wiederhergestellt |
| 03.11.2026 | `f23431dc` | Orthea-Deck neu aufgebaut |

### Prozess-Meilenstein

- 17.11.2026 (t286): Einführung von Vertical Slices und dieser Datei (nur Doku, kein Code).

## 5. Blockiert und offen, geklärt werden muss

| Punkt | Slice | Was fehlt | Wer |
|---|---|---|---|
| Bollwerk/Scheinschwerpunkt; Bot-Flügelspiel mit Nachbalancierung (Lyr, Vesper, Namar, Rothain, Sahr, Theryn) | VS-05/VS-04 | Richtung bei den Operationsplänen klären (`BALANCE_T300.md` §4, `BALANCE_T301.md` §4). Etappensicherung erledigt (0.626). | Projektleiter |
| Überschuss für 1 AP | VS-05/VS-04 | Regeländerung, braucht Entscheidung. | Projektleiter |
| KI-Stellungswechsel einschalten | VS-04/VS-05 | Eigene Balance-Runde nötig (Sahr, Vesper, Merovan, Lyr); Entscheidung, ob gewollt. | Projektleiter |
| Git LFS / Repo-Größe | VS-12 | Plan steht, braucht Freigabe (`technik/REPO_GROESSE_LFS_T283.md`). | Projektleiter |
| Lore im Spiel | VS-06 | Entscheidung, ob und wie. | Projektleiter |
| Karsk-Offiziere: sichtbares Altern oder lore-treu jung mit Implantaten? | VS-08 | Karsk-Ketten sind derzeit jung mit zunehmenden Implantaten. Ein Alterungsdurchgang lässt sich nachziehen. | Projektleiter |

## 6. Verfahren: Vertical Slices und current_state.md

**Was ein Vertical Slice hier ist:** ein abgeschlossener, von Ende zu Ende nutzbarer Ausschnitt des Spiels, der Daten, Engine, Oberfläche, Test und Doku umfasst und einzeln „fertig“ werden kann. Ein Slice ist kein Dateiordner und keine Version; er schneidet quer durch `web/`, `tests/`, `scripts/` und `docs/`.

**Regeln**

1. **Jede Arbeit gehört zu genau einem Slice** (oder legt einen neuen an). Die Aufgabenbezeichnung (`tNNN`) nennt den Slice, die Commit-Nachricht auch: `tNNN VS-xx: …`. Ältere Commits haben dieses Präfix nicht.
2. **Neuen Slice anlegen:** nächste freie ID `VS-nn`, eintragen in Abschnitt 2 und 3, mit Umfang, Status, Code, Docs, Gates und Offen. IDs werden nie wiederverwendet; ein aufgegebener Slice behält seine ID mit dem Vermerk „verworfen“.
3. **Status ändern** nur mit Begründung im Slice-Abschnitt. Ein Slice ist `fertig`, wenn die Definition of Done erfüllt ist.
4. **Zahlen nur mit Beleg:** Jede Zahl in dieser Datei nennt Quelle oder Messung (Bericht, Test, Befehl). Nicht Nachgeprüftes steht als „nicht nachgeprüft“ da. Keine geschätzten Werte ohne Kennzeichnung.

**Definition of Done (je Slice, für den Alpha-Umfang)**

- Funktion läuft von der Oberfläche (oder dem Bot) bis in die Engine und zurück.
- Regeltext, Kartentext und Hilfe stimmen mit dem Verhalten überein; Sonderfälle stehen in `regeln/`.
- Tests: `npm test` grün; für Oberflächenänderungen zusätzlich die zuständigen Browser-Gates ([Gates](#8-gates-und-befehle)); **nach jeder Karten- oder Regeländerung und jeder Erweiterung `npm run balance-gate` grün** (Ausreißer nur mit Eintrag in der Ausnahmeliste); bei gewollten Wertänderungen Vorher/Nachher-Bericht in `balance/` und neuer Vergleichsstand. Das Spiel wächst laufend (je Erweiterung etwa 250 Karten), Balance wird deshalb dauernd überwacht statt einmal am Ende.
- Neue Funktionen haben JSDoc.
- Der Slice-Abschnitt hier ist aktuell, `CHANGELOG.md` hat einen Eintrag.
- Offene Punkte stehen unter „Offen“, nicht nur im Chat.

**Pflege von current_state.md bei jedem Push**

1. Kopfzeile aktualisieren (Version, Tag, Basis-Commit, Cache, Zählwerte, falls geändert).
2. Betroffene Slices anpassen (Status, Offen, Gates).
3. Abschnitt 4 „Zuletzt gemacht“: neue Zeile oben (Datum, Version/Commit, Inhalt, Bericht), bei manuellen Änderungen im Abschnitt „Manuell“.
4. Abschnitt 5 und 7: erledigte Punkte streichen, neue ergänzen.
5. Die Datei im selben Commit oder im selben Push einchecken. Ohne Änderung der Datei kein Push, der ein Slice berührt.

**Zuständigkeiten der Dokumente**

| Dokument | Rolle |
|---|---|
| `current_state.md` (diese Datei) | lebende Übersicht: Stand, Slices, Nächstes |
| `CHANGELOG.md` | Änderungen je Version (Chronik) |
| `balance/BALANCE_T*.md` | Messberichte (Momentaufnahme, nicht ändern) |
| `entwicklung/STATUS_T*.md` | historische Statusanalysen (nicht ändern, tragen einen Hinweis auf diese Datei) |
| `regeln/` | verbindliche Regeln und Sonderfälle |
| `archiv/` | überholte Pläne |

## 7. Nächste sinnvolle Schritte (priorisiert)

Die Reihenfolge folgt den „Offenen Punkten nach Priorität“ aus t271 und den Befunden aus t282–t285. Die Prioritäten sind ein Vorschlag, entschieden wird mit dem Projektleiter.

| Prio | Schritt | Slice | Anmerkung |
|---|---|---|---|
| 1 | **Bollwerk** und **Scheinschwerpunkt** prüfen, Bot-Flügelspiel mit Nachbalancierung (Operationspläne), Merovan und schwache Nationen (Lyr, Dargan, Averon) nachziehen | VS-05 | Ausnahmeliste abbauen; jede Änderung mit `npm run balance-gate`. |
| 1 | **Menschlicher Playtest** fortsetzen (Partien mit Protokoll, Auswertung) | VS-13 | Erste Partien 18.11. (t297); Reaktionsfenster praktisch ungetestet. |
| 2 | Bot-Flankenspiel, Aktions-Rückmeldung am Tisch, Protokoll-Schema 2 | VS-04, VS-07, VS-13 | Restbefunde t297. |
| 1 | **LAN mit zwei Rechnern** spielen, dazu kurze LAN-Doku | VS-11 | Seit t271 offen. |
| 1 | Bot-Zug in Einzelschritten (t291) **von Hand gegenspielen**: Tempo und Reaktionsfenster bewerten | VS-04, VS-07, VS-13 | Standardwerte sind Annahmen. |
| 2 | Entscheidung zu **KI-Stellungswechsel** und anschließende Balance-Runde (Sahr, Vesper, Merovan, Lyr) | VS-04, VS-05 | `BALANCE_T285.md` §3. |
| 2 | **Überschuss 1 AP** entscheiden; **Normverband** (≈ 44 %) lösen, ohne Steinmark zu überdrehen | VS-05, VS-03 | Eigene kleine Runde. |
| 2 | **EXE bauen** und auf einem sauberen Windows-Rechner starten; **PDF** auf Stand 0.626 bringen | VS-14 | PDF trägt noch 0.6b. |
| 3 | Ölketten der übrigen 12 Nationen (nach Karsk-Aging-Entscheidung), dann in `portraits.js`/Editor verdrahten; vorläufige Motive neu zählen und ersetzen | VS-08 | Rothain, Karsk (0.641), Averon (0.643) und Ossaria (0.645) stehen. 650 vorläufige Motive laut t258. |
| 3 | Brummbär-Stub, `MINE_TOKEN`, `CM`-Fehlalarme im Prüfskript | VS-03 | Kleinschritte. |
| 3 | 24 Zwillingsgruppen auch über Werte trennen | VS-02 | Nur Schlüsselwörter trennen sie heute. |
| 3 | Roguelike-Slice neu zuschneiden | VS-15 | Vorher Abstimmung. |
| 3 | Bot-Schwierigkeitsstufen, Moral, AP-Deckel | VS-04, VS-01 | Niedrige Priorität. |
| 3 | Repo-Größe (LFS nur für neue Commits, WAV → OGG) | VS-12 | Braucht Freigabe. |

## 8. Gates und Befehle

**Vor jedem Push mit Code- oder Datenänderung** (Beschluss aus t282/t283):

| Gate | Befehl | Zweck |
|---|---|---|
| Testsuite | `npm test` | 65 Testdateien (Regeln, Karten, UI-Logik, Server) |
| Vorderseiten | `python3 scripts/graphics/verify.py` | 1024 × 1428, Texte, Motivpräsenz |
| Fuzz 80 | `npm run fuzz` | Engine-Invarianten |
| Smoke 400 | `node tests/smoke_sim.js 400` | zufällige Partien ohne Hänger |
| Audit | `node scripts/balance/audit_text_engine_t265.js` | Kartentext gegen Engine |
| **Balance-Gate** (seit t300) | `npm run balance-gate` | Nationen (Starter, Misch) und Doktrinen, Band 40–60 %, Ausnahmeliste; **Pflicht nach jeder Karten- oder Regeländerung und jeder Erweiterung**; Vergleichsstand nach gewollter Änderung mit `--update-baseline` erneuern |
| Browser | `npm run ui-play` (Seeds 31337 und 1234), `botseq-play`, `tutorial-play`, `reset-play`, `layout-test`, `screens-test`, `libzoom-play`, `lan-play`, `funcs-play` | Oberfläche, Layout (6 Größen), 75 Ansichten, LAN, Funktionsdurchgang |

**Bei reinen Doku-Änderungen** (wie t286) genügen `npm test` und `verify.py`.

**CI (seit t289):** Auf GitHub laufen bei jedem Push/PR auf `main` automatisch `npm test`, `verify.py`, Fuzz und Audit (`.github/workflows/ci.yml`, [`technik/CI.md`](technik/CI.md)). Das ersetzt die lokalen Browser-Gates und `smoke 400` nicht; ein roter Lauf auf der Actions-Seite des Repos ist vor dem nächsten Push zu beheben.

**Letzter Gate-Lauf (21.11.2026, t337, Version 0.645):** Grün:

- `npm test` (66 Dateien; `DC_VERSION`-Assertion in `test_balance_t240.js` auf 0.645, erster Lauf grün)
- `verify.py` und `tests/test_tex_seeds_t315.py`
- Fuzz 80 (80/80, 0 Fehler)
- Smoke 400 (400/400, 0 Fehler)
- Audit (14/14, `unreadParams` 0)
- `balance-gate:quick` (grün, 0 Fehler, 15936 Partien). Das volle Gate ist nicht gelaufen: keine Karten- oder Regeländerung, nur Porträt-Assets und Doku.
- `tutorial-play` (17/17)
- `reset-play` (6/6)
- `layout-test` (0 Befunde)
- `screens-test` (0 Befunde, 75 Ansichten)
- `libzoom-play` (33/0)
- `lan-play` (8/0, 9 Züge)
- `funcs-play` (5/5, Versionsanzeige 0.645)
- `botseq-play`: erster Lauf rot (Timeout in Szenario B und C); einzeln wiederholt: grün (`fail` leer)
- `audio-play` (0 Schreibzugriffe in 3 s am Tisch, Version 0.645)
- `ui-play` Seed 31337 (grün, `fail` leer)
- `ui-play` Seed 1234 (grün, `fail` leer)

**Gate-Lauf davor (21.11.2026, t336, Version 0.643):** Grün:

- `npm test` (66 Dateien; erster Lauf rot durch eine übersehene Versionsprüfung `DC_VERSION` in `test_balance_t240.js`, nach Korrektur der Assertion grün)
- `verify.py` und `tests/test_tex_seeds_t315.py`
- Fuzz 80 (80/80, 0 Fehler)
- Smoke 400 (400/400, 0 Fehler)
- Audit (14/14, `unreadParams` 0)
- `balance-gate:quick` (grün, 0 Fehler). Das volle Gate ist nicht gelaufen: keine Karten- oder Regeländerung, nur Porträt-Assets und Doku.
- `tutorial-play` (17/17)
- `reset-play` (6/6)
- `layout-test` (0 Befunde)
- `screens-test` (0 Befunde, 75 Ansichten)
- `libzoom-play` (33/0)
- `lan-play` (9/0)
- `funcs-play` (5/5, Versionsanzeige 0.643)
- `botseq-play`
- `audio-play` (0 Schreibzugriffe in 3 s am Tisch, Version 0.643)
- `ui-play` Seed 31337 (grün, `fail` leer)
- `ui-play` Seed 1234: erster Lauf rot (`Target page, context or browser has been closed` durch Sitzungsunterbrechung, noch vor Spiel 1); einzeln wiederholt: grün (`fail` leer).

**Gate-Lauf davor (20.11.2026, t325, Version 0.641):** Grün:

- `npm test` (66 Dateien)
- `verify.py` und `tests/test_tex_seeds_t315.py`
- Fuzz 80
- Smoke 400
- Audit
- `balance-gate:quick` (grün). Das volle Gate ist nicht gelaufen: keine Karten- oder Regeländerung, nur Porträt-Assets, Werkzeuge und Doku.
- `tutorial-play` (17/17; erster Anlauf abgebrochen, weil nach `npm ci` der Playwright-Chromium fehlte, danach installiert und grün)
- `reset-play` (6/6)
- `layout-test` (0 Befunde)
- `screens-test` (0 Befunde, 75 Ansichten). Erster Lauf rot durch `page.goto`-Zeitüberschreitung in der Mitte (1280×720, bis dahin 0 Befunde); einzeln wiederholt: grün.
- `libzoom-play` (33/0)
- `lan-play` (8/0)
- `funcs-play` (5/5, Versionsanzeige 0.641)
- `botseq-play`
- `audio-play` (0 Schreibzugriffe in 3 s am Tisch)
- `ui-play` Seed 31337 (grün)
- `ui-play` Seed 1234: erster Lauf rot (`waitForSelector`-Zeitüberschreitung in Spiel 3, die übrigen Spiele ok); einzeln wiederholt: grün.

**Gate-Lauf davor (20.11.2026, t318, Version 0.636):** Grün:

- `npm test` (66 Dateien)
- `verify.py` und `tests/test_tex_seeds_t315.py` (1.746 eindeutige Seeds, deterministisch, Muster je Typ verschieden)
- Fuzz 80
- Smoke 400
- Audit
- `balance-gate:quick` (grün). Das volle Gate ist nicht gelaufen: keine Karten- oder Regeländerung, nur Grafik, Editor und Bildpfade.
- `tutorial-play` und `ui-play` Seed 31337: beim ersten Lauf rot, weil die Box zwischendurch angehalten war (Wanduhr sprang, Zeitüberschreitung bzw. Hänger). Einzeln wiederholt: grün.
- `reset-play`
- `layout-test` (0 Befunde)
- `screens-test` (0 Befunde, 75 Ansichten)
- `libzoom-play`
- `lan-play`
- `funcs-play`
- `botseq-play`
- `audio-play`
- `ui-play` Seed 1234

**Gate-Lauf davor (19.11.2026, t301, Version 0.626):** Grün:

- `npm test` (66 Dateien)
- `balance-gate` voll (0 Fehler, 3 Warnungen aus 3 Ausnahme-Einträgen) und `balance-gate:quick` (grün)
- `audio-play` (t296: 0 Schreibzugriffe in 3 s am Tisch)
- `verify.py`
- Fuzz 80
- Smoke 400
- Audit
- `botseq-play`
- `funcs-play`
- `lan-play`
- `tutorial-play`
- `reset-play`
- `libzoom-play`
- `layout-test` (0 Befunde)
- `screens-test` (0 Befunde)
- `ui-play` Seeds 31337 und 1234, allein gefahren

Unter starker Parallellast liefen die Browser-Gates bei t291 mehrfach in Fristen. Ursache war die Audio-Schleife am Tisch; sie ist seit 0.611 (t296) behoben, siehe [`technik/AUDIO_SCHLEIFE_T296.md`](technik/AUDIO_SCHLEIFE_T296.md).

**Technik-Hinweise:** Bei jeder Web-Änderung den Cache in `web/sw.js` hochzählen. Playwright-Browser müssen installiert sein (`npx playwright install chromium`). Lange Läufe unter `nohup` mit Fortschrittszeile je Schritt starten. Arbeit immer in einem frischen Klon (`git clone -c pack.useSparse=false`), nie im Arbeitsordner des Projektleiters.

## 9. Wegweiser durch die Docs

| Frage | Wohin |
|---|---|
| Wie ist der Stand? Was kommt als Nächstes? | diese Datei |
| Wie funktioniert das Spiel? | `regeln/RULES_v0.5_GRUNDKONZEPT.md`, `regeln/SIEGBEDINGUNGEN.md` |
| Was bedeutet ein Schlüsselwort? | `regeln/SCHLUESSELWOERTER.md`, `regeln/TAKTISCHE_SCHLUESSELWOERTER.md` |
| Welche Karten gibt es? | `karten/` |
| Wie wurde balanciert? | `balance/BALANCE_T285.md` (aktuell) und ältere Berichte |
| Wer sind die Nationen? | `nationen/lore_nationen/` |
| Wie sind die Offiziersporträts aufgebaut? | `technik/PORTRAIT_OEL_KETTEN.md` (Bestand), `technik/PORTRAIT_SYSTEM.md` (Ziel/Lore) |
| Wie ist es gebaut? | `technik/`, `Division_Command_Dokumentation.md` §6 |
| Was war früher geplant? | `archiv/` |
| Frühere Statusanalysen | `entwicklung/STATUS_T258.md` … `STATUS_T271.md` |
| Gesamtübersicht aller Docs | [`README.md`](README.md) |
