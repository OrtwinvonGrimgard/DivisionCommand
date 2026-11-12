# Tutorial „Grundausbildung“ (t275)

Stand: 12.11.2026 · Alpha 0.6b · Cache `divcmd-alpha41d`

## 1. Ziel

Neue Spieler lernen Division Command in **8–10 Minuten** an einem echten, geskripteten Gefecht.
Jedes Konzept wird **einmal erklärt und sofort selbst ausgeführt** („learning by doing“).
Am Ende steht ein verdienter Sieg und danach das Hauptmenü.

## 2. Auslöser und Speicherung

- Erster Start: Klick auf **„Spiel starten“** → Tutorial → (Offiziersakte, falls noch kein Benutzer) → Hauptmenü.
- „Erster Start“ heißt: Merker `dc_tutorial_done` fehlt **und** es gibt noch keinen Benutzer (`dc_users`).
  Wer schon gespielt hat, wird nicht überrascht; für ihn steht der Menüpunkt bereit.
- Abschluss **und** Überspringen setzen `localStorage.dc_tutorial_done` (`{"v":1,"how":"done"|"skip","at":…}`).
  Die EXE öffnet den Standardbrowser auf festem Port, `localStorage` bleibt also erhalten. Einen eigenen EXE-Speicher gibt es nicht.
- Später: **Hauptmenü → „Tutorial“** startet es jederzeit neu. `?tutorial=1` in der Adresse erzwingt es (Test/Support).

## 3. Eigenständige Instanz

- Eigene Engine-Instanz `new DCEngine.Engine(...)` mit festem Seed, festen Decks, fester Zugreihenfolge, Modus `tutorial`.
- Der Spieltisch ist der **echte Tisch** (gleiche Karten alpha40, gleiche Bedienung). Das Tutorial schaltet nur eine Schicht darüber:
  Abdunklung mit Ausschnitt, pulsierender Rahmen, Pfeil, Ausbilder-Box, Fortschritt.
- Kein Speichern, kein Playtest-Protokoll, kein Zugtimer, keine Änderung an Decks, Benutzern oder Einstellungen.
  Beim Verlassen wird die Tutorial-Engine verworfen.
- Gegner: geskriptet (`DCTutorialScenario.botStep`), kein Zufall.

## 4. Ausbilder

**Hauptmann Kessler**, Ausbilder der Division (Porträt `assets/portraits/Jetzt/male/hauptmann/01.png`).
Ton: knapp, militärisch, respektvoll („Rekrut“, Sie-Form). Pro Box höchstens 2–3 kurze Sätze.

## 5. Ablauf (6 Kapitel, 25 Schritte)

Lage: Übungsplatz. Sie stehen bei **2 SP**, der Gegner auch. Ihr Ablösungstrupp (L2) und die Batterie Eidhof-Kaliber (C1) sind kampfbereit.
Gegenüber: Stoßgruppe (L2), Warteblatt-Läufer (L3) und die Elite **Lotte Knoten** (C3, 3/5).
Doktrinen: Zielangriff + Etappensicherung. Hand: Erste Welle, Deckung suchen, Feldküche, Druckpunkt. Nachziehen: Kronriemen.

| # | Kapitel | Schritt | Spieler tut | Lernziel / Regelquelle |
|---|---|---|---|---|
| 1 | 1 Lage | Begrüßung | Weiter | Rahmen, Dauer, Überspringen |
| 2 | 1 Lage | Ziel: 5 SP | Weiter | Elite +2, Durchbruch +1, Doktrin-Ziel +1 (SIEGBEDINGUNGEN §2) |
| 3 | 1 Lage | Die Front | Weiter | 3 Abschnitte × 3 Stellungen (RULES §2.1) |
| 4 | 2 Kommando | AP | Weiter | 5 AP pro Zug, beide schon in Zug 1 (RULES §20) |
| 5 | 2 Kommando | Hand | Weiter | Kosten stehen auf der Karte |
| 6 | 2 Kommando | **Einheit legen** | Erste Welle auf C3 ziehen/klicken | Einheit an die Front |
| 7 | 2 Kommando | Eingraben | Weiter | Schild bis zum nächsten eigenen Zug, +1 DEF (RULES §7.0) |
| 8 | 3 Feuer | **Angriff** | Ablösungstrupp → Stoßgruppe | Reichweite gegenüber + Nachbarn, 1 AP (RULES §7) |
| 9 | 3 Feuer | Gegenschlag | Weiter | Nur wer überlebt, schlägt zurück (§7.2) |
| 10 | 3 Feuer | **Steilfeuer** | Batterie → Elite | Steilfeuer I–V, II = Reichweite 5 (§7.1) |
| 11 | 3 Feuer | Kein Rückschlag | Weiter | Artillerie-Ausnahme beim Gegenschlag (§7.2) |
| 12 | 4 Feindkontakt | AP-Reserve | Weiter | Übrige AP zahlen Reaktionen im gegnerischen Zug |
| 13 | 4 Feindkontakt | **Zugende** | „Zugende“ | Zugwechsel |
| 14 | 4 Feindkontakt | Gegner am Zug | (zusehen) | Gegner legt Lagebild, greift an |
| 15 | 4 Feindkontakt | **Feindkontakt** | „Deckung suchen“ (2 AP) auf den Trupp | Reaktionsfenster (RULES §12.1 Erg. t238/t259), Soforteinsatz kostet aufgedruckte AP |
| 16 | 4 Feindkontakt | Gegenschlag + Doktrin-Ziel | Weiter | Überlebt → schlägt zurück; Zielangriff-Ziel erfüllt: +1 SP |
| 17 | 5 Der Schlag | Doktrinen | Weiter | 2 Doktrinen, immer aktiv, kosten nichts (§24.2/§25) |
| 18 | 5 Der Schlag | **Unterstützung** | Feldküche in den Support | Support-Zone (§2.2, §13) |
| 19 | 5 Der Schlag | **Ausrüstung** | Kronriemen an Erste Welle | Ausrüstung (§16) |
| 20 | 5 Der Schlag | **Soforteinsatz** | Druckpunkt auf die Elite | Soforteinsatz, 2 AP (§17) |
| 21 | 5 Der Schlag | **Entscheidung** | Erste Welle → Elite | Zielangriff +2 ATK gegen Beschädigte; Elite zerstört +2 SP → 5/5 Sieg |
| 22 | 5 Der Schlag | Sieg | Weiter | Banner „SIEG“, 5/5 SP, Siegton |
| 23 | 6 Deckbau | Deck | Weiter | 60 + 2 Doktrinen, alle Nationen mischbar (§24.0) |
| 24 | 6 Deckbau | Seltenheit & Elite | Weiter | Gold 1 · Silber 2 · Bronze 4; Elite = eigene Dimension (§21–22, §24.1) |
| 25 | 6 Deckbau | Abschluss | „Zum Hauptmenü“ | Übergang ins Hauptmenü |

Fett = Handlungsschritt: Das Tutorial wartet, bis die richtige Aktion ausgeführt ist.

## 6. Gestaltung

- **Spotlight:** Rest des Tisches abgedunkelt, Ziel ausgeschnitten, goldener Puls-Rahmen, Pfeil zeigt hin.
- **Ausbilder-Box:** Porträt, Name, Kapitelzeile („Kapitel 3/6 · Feuer frei“), Text, Fortschrittsbalken „Schritt 10/25“.
  Knöpfe: Weiter (bei Info-Schritten, auch Enter), Zurück, **Tutorial überspringen** (oben rechts in der Box, immer sichtbar, auch Esc; mit Rückfrage).
  Bei Handlungsschritten blinkt „Ihr Befehl“; der Pfeil wandert mit (Karte → „Angriff“ → Zielwahl).
- **Rückmeldung:** Schaden schwebt als Zahl über der Karte (−2), Erfolgston, kurzes „Gut gemacht“-Aufleuchten.
- **Fehler werden nicht bestraft:** Falsche Aktionen blockt das Tutorial vor der Engine und erklärt freundlich, was gemeint ist.
  Abbrechen einer Auswahl ist immer erlaubt.
- **Zurück:** Jeder Schritt merkt sich den Engine-Stand an seinem Anfang. „Zurück“ stellt den Stand des vorigen Schritts wieder her
  (Gegnerzug wird dabei übersprungen).
- **Sieg:** Banner „SIEG“ mit SP 5/5, Siegton; danach Deckbau-Kapitel, dann weich in das Hauptmenü.
- Schrift, Farben, Rahmen, Knöpfe aus `app.css` (Gold auf Dunkelrot/Schwarz). Töne aus dem vorhandenen Satz (`DCAudio`).

## 7. Technik

| Datei | Inhalt |
|---|---|
| `web/js/tutorial/scenario.js` | Szenario, Schritte, Prüfregeln, geskripteter Gegner, Lösungsweg (Node + Browser) |
| `web/js/ui/tutorial.js` | Erststart-Weiche, Overlay, Spotlight, Ausbilder-Box, Navigation, Sieg-Banner |
| `web/css/tutorial.css` | Gestaltung des Overlays |
| `web/js/ui/app.js` | Haken: `dcStartScripted`/`dcEndScripted`/`dcScriptedSync`/`dcIsScripted`, geskripteter Gegner (`scriptedTick`), Ende ohne Endbild, kein Zugtimer, kein Zugende-Dialog |
| `web/index.html` | Erststart-Weiche an „Spiel starten“, Menüpunkt „Tutorial“, Hilfe-Eintrag |
| `tests/test_tutorial_t275.js` | Merker-Logik, alle Schritte mit der Engine bis zum Sieg, Filter blockt Falsches |
| `tests/playwright_tutorial_t275.mjs` | Browser: Erststart → Tutorial → Menü, Zweitstart → Menü, Überspringen |

## 8. Grenzen

- Ein festes Szenario; keine Varianten je Nation.
- Mulligan, Verdeckt-Legen, Fallen, Durchbruch und Moral werden nur erwähnt bzw. nicht gezeigt.
- Der Deckbau wird erklärt, nicht im Deckbauer selbst geübt.

## 9. Umsetzung und Prüfung (t275)

- Der Aktionsfilter umhüllt `dispatch` nur der Tutorial-Engine-Instanz. Proben der Oberfläche (`probeAction`) laufen auf eigenen Kopien.
- Merker `dc_tutorial_done` = `{"v":1,"how":"done"|"skip","at":ISO}`. Bestehende Profile (Benutzer vorhanden) sehen das Tutorial nicht automatisch,
  sondern über den Menüpunkt „Tutorial“ oder `?tutorial=1`.
- Während des Tutorials: Meldungen kürzer (`DCTune.dialogMs` ≤ 1,4 s), Zugtimer und „Weitere Befehle“ (Aufgeben/Frieden/Menü) ausgeblendet.
- `npm test` enthält `tests/test_tutorial_t275.js`; der Browser-Durchlauf `node tests/playwright_tutorial_t275.mjs` spielt alle 25 Schritte über echte
  Klicks und Ziehen, prüft Blocken (Zugende, falsche Stellung, Tischklick), „Zurück“, Zweitstart, Menü-Wiederholung und Überspringen.
