# Changelog – Division Command

## Unreleased

- **Alle Bildschirme überarbeitet (t280, Stufe 1):**
  - Messung vorher (25 Ansichten bei 1024×576, 1280×720 und 1920×1080): 109 Befunde. Im Hauptmenü lagen die neun Knöpfe auf dem Logo, der oberste war abgeschnitten. Der Startknopf lag auf dem Sternenemblem. In der Offiziersakte füllte das Porträt bei 576 px den Schirm, Felder und „Akte anlegen“ lagen darunter. Einzelspieler hatte weiße Standardfelder, „Bereit“ und „Gefecht beginnen“ lagen unter dem Rand. Der Bot-Dialog lag im Seitenfluss und hatte bei Werkseinstellung keinen Ausgang. Die Optionen hatten winzige Reiter mit grünem Aktivzustand. Der Rückblick „Handlung“ lief unten aus dem Bild. Der Bibliothekshinweis beschrieb Klick und Doppelklick vertauscht.
  - Designsystem (`docs/UI_DESIGN_T280.md`, `web/css/ui-system.css`): Abstände, Schriftstufen, Farben, Knöpfe (Haupt/Neben/Gefahr/Zurück mit Hover, Fokusring, gesperrt), dunkle Felder, goldene Regler mit Füllstand, Kästchen, Panels, Bewegung mit reduced-motion.
  - `web/css/ui-screens.css` und `web/js/ui/ui-screens.js`:
    - Hauptmenü mit kleinerem Logo oben links, Kommandopanel links (Symbole, Kurzbeschreibungen, Nebenpunkte 2×2) und Porträt rechts.
    - Arbeitsseiten als Panel mit Titelleiste und klebender Aktionsleiste (Zurück links, Hauptaktion rechts). Auf großen Schirmen wachsen die Panels mit. Esc = Zurück.
    - Einzelspieler mit Bildkarten „Gegen die KI“ und „Hotseat“, zweispaltigem Formular und Hinweis, wenn kein zweiter Offizier existiert. Dabei behoben: Das zweite `onchange` hatte das Ein- und Ausblenden der Hotseat- und Bot-Zeilen überschrieben.
    - Bot-Dialog als Overlay, Speichern/Zurücksetzen/Abbrechen immer sichtbar, Esc schließt.
    - LAN mit Bildband, Suchzeile über der Aktionsleiste und Lobby-Sitzen als Karten.
    - Offiziersakte und Benutzer: Formular links, Porträt rechts, Kacheln ohne überlaufende Namen, „Akte speichern“ in der Aktionsleiste.
    - Optionen mit Reiterleiste samt Symbolen, Einstellungszeilen und Gefahrenzone.
    - Playtest-Fenster und Partie-Optionen im selben Dialogstil. Der Rückblick scrollt.
    - Endbildschirm mit Sieg- oder Niederlagengemälde.
  - Bibliothek: Abzeichen „im Deck / erlaubt“ je Karte in Seltenheitsfarbe (Gold 1, Silber 2, Bronze 4, „voll“) und Fortschrittsbalken 60 Karten + 2 Doktrinen mit Restangabe. Die Limitmeldung ist deutsch und fällt auf. Leerer Filter mit „Filter zurücksetzen“. Der Hinweis passt zur Bedienung.
  - Generierte Grafiken (WebP, im Offline-Cache): `assets/ui/mode-ki`, `mode-hotseat`, `mode-lan` (960×540), `end-victory`, `end-defeat` (1280×720), `panel-grain`; dazu `title-back-poster.webp` (Standbild des Titelvideos) sowie die SVGs `icons.svg` (18 Symbole), `corner.svg` und `search.svg`.
  - Tests: `tests/test_ui_screens_t280.js` (npm test) und `tests/playwright_screens_t280.mjs` (`npm run screens-test`: 25 Ansichten × 3 Größen, Überlappung, abgeschnittener Text, außerhalb, Hauptaktion sichtbar). Cache `divcmd-alpha42a`.

- **Tisch aufgeräumt (t279):**
  - Messung vorher (6 Fenstergrößen von 1024×576 bis 2560×1440, Partie mit eigenem Zug und Gegnerzug, Tutorial, Feindkontakt): 755 Befunde. Der Musiktitel lag absolut über der ganzen Kopfzeile (Logo, Zuganzeige, beide Statuszeilen). Hand, eigene Stapel, Doktrinen und Name ragten unten aus dem Bild. Das schwebende Protokoll und das Versionsschild „Alpha 0.6b“ deckten Felder ab. Die Befehlsspalte rutschte unter 1100 px unter den Tisch. Schlüsselwörter auf Feldern waren abgeschnitten.
  - Neue Kopfleiste in drei Zonen: links Logo mit Version, in der Mitte Partie (Gefecht gegen KI / Hotseat / LAN / Grundausbildung, ggf. Trophäen-Modus) mit Musiktitel und „Zug X · am Zug: …“. Rechts je Spieler eine Plakette mit Name, „am Zug“-Marke, AP als Rauten, SP-Balken und Hand/Deck. Die eigene Plakette steht außen, der aktive Spieler leuchtet gold. Auf großen Bildschirmen wächst die Leiste mit.
  - Flacher Tisch als festes Höhenraster aus der Fensterhöhe (Gegnerleiste, Support, Front, Niemandsland, eigene Front, eigener Support, Handleiste). Alles passt ohne Scrollen ins Bild, die Handkarten sind größer als vorher. Die Zonennamen stehen hochkant in einer Randleiste. Gegnerstapel und Ziele haben einen eigenen Platz rechts in der Gegnerleiste.
  - Das Protokoll ist in der rechten Befehlsspalte angedockt, weiter über „Protokoll“ ein- und ausblendbar. Das Versionsschild ist im Spiel aus. Schlüsselwörter brechen um. „Weitere Befehle“ sind zweispaltig. Die 2.5D-Ansicht bleibt unverändert.
  - Neu `web/css/table-hud.css`, Plaketten und Zonenbeschriftung in `app.js` (`hudPlate`, `hudScenarioName`). Tests: `tests/test_table_hud_t279.js` (npm test) und `tests/playwright_layout_t279.mjs` (`npm run layout-test`: keine überlappenden HUD-Boxen, kein abgeschnittener Text, nichts außerhalb des Fensters bei allen 6 Größen). Cache `divcmd-alpha41f`.

- **Spielstand zurücksetzen (t278):**
  - Neuer Knopf „Spielstand zurücksetzen …“ in Optionen › System, dazu klein „Speicher löschen“ unten rechts auf dem Startbildschirm. Zweistufige Bestätigung im Spielstil, die auflistet, was gelöscht wird.
  - Gelöscht werden alle Speicherschlüssel mit Präfix `dc_` in localStorage und sessionStorage (Offiziersakten, aktiver Benutzer, Decks, Einstellungen, Audio, Tempo, Kamera, Tutorial-Merker …) sowie die IndexedDB `dc_playtest`. Fremde Schlüssel desselben Ursprungs und die Offline-Caches (nur Programmdateien und Bilder) bleiben. Danach lädt das Spiel neu auf den Startbildschirm; „Spiel starten“ öffnet wieder das Tutorial.
  - Neu `web/js/ui/reset.js`, `web/css/reset.css`, `DCPlayStore.closeDb()`; Tests `tests/test_reset_t278.js` (npm test, prüft auch, dass jeder Speicherschlüssel im Code mit `dc_` beginnt) und `tests/playwright_reset_t278.mjs` (`npm run reset-play`).
  - Hilfe: Optionen-Eintrag; AP-Text an die Engine angepasst (Rest-AP nur als Reaktionsreserve im gegnerischen Zug, zu Beginn des eigenen Zuges wieder 5). Cache `divcmd-alpha41e`.

- **Tutorial „Grundausbildung“ (t275):**
  - Beim allerersten „Spiel starten“ (kein Merker, noch kein Benutzer) läuft zuerst ein geführtes Übungsgefecht als eigene Instanz, danach Offiziersakte bzw. Hauptmenü. Ab dem zweiten Start direkt ins Menü.
  - 6 Kapitel, 25 Schritte, etwa 10 Minuten, mit Ausbilder Hauptmann Kessler: Ziel 5 SP, Front, AP (beide 5 in Zug 1), Hand, Einheit legen, Eingraben, Angriff und Gegenschlag, Steilfeuer I–V, AP-Reserve, Zugende, Feindkontakt (Deckung suchen, 2 AP wie aufgedruckt), Doktrinen, Support, Ausrüstung, Soforteinsatz, Sieg über die Elite, Deckbau (60 + 2, Nationen mischbar, Gold 1 · Silber 2 · Bronze 4, Elite als Merkmal).
  - Echte Engine-Regeln mit festen Decks und Zugfolge; falsche Aktionen werden mit Hinweis geblockt. Spotlight mit Ausschnitt, Pulsrahmen, wandernder Pfeil, schwebende Schadenszahlen und SP, Siegbanner, Töne aus dem vorhandenen Satz, „Zurück“ und „Tutorial überspringen“ (mit Rückfrage, auch Esc).
  - Eigenständig: eigene Engine, kein Timer, kein Playtest-Protokoll, keine Benutzer/Decks/Spielstände; einziger Speicher `dc_tutorial_done`. Wiederholen über den neuen Menüpunkt „Tutorial“.
  - Neu `web/js/tutorial/scenario.js`, `web/js/ui/tutorial.js`, `web/css/tutorial.css`, Haken in `app.js`, Design `docs/TUTORIAL_T275.md`, Tests `tests/test_tutorial_t275.js` (npm test) und `tests/playwright_tutorial_t275.mjs`; `ui-play` überspringt das Tutorial beim frischen Profil. Hilfe (Menüpunkte). Cache `divcmd-alpha41d`.

- **Analyse und Stand t271:**
  - Feindkontakt-Fenster bietet nur noch Reaktionen an, deren Bedingung erfüllt ist: Militärische Ehren (Veteran), Kriegsgericht (zwei Fronteinheiten), Rationen (Infanterie), Minen legen (freier Platz), Napalm (gegnerische Front). Vorher scheiterte die Wahl, und das Fenster kam wieder (ui-play Seed 1234). Neu `_reactUsable`, Test `tests/test_react_usable_t271.js`; `ui-play` drückt auch „Bestätigen und weitergeben“.
  - Balance bestätigt ohne Änderung: Starter 48,3–52,1 %, Misch 49,1–51,0 %, Startspieler 48,7 / 49,3 %.
  - Prüfskript unverändert zu t268 (t267 14/14), Browser-Test Seeds 1234, 31337, 4711, 271, 77 grün (je 5 Partien); `ui-play` sucht das Neutralisieren jetzt im gegnerischen Support (vorher Fehlmeldung bei Seed 77).
  - Status in `docs/entwicklung/STATUS_T271.md`; Hilfe (Entwicklungsstand, Fehlende Features, Fortschritt, Prozent: 67 %, Kernspiel 77 %). Cache `divcmd-alpha41c`.

- **Einheitliche Schrift auf den Vorderseiten (t270):**
  - Regeltext für alle Kartentypen fest 66 px (Überschrift 68) auf der 1536er-Arbeitsfläche. Vorher gab es automatische Stufen von 60 bis 36 px.
  - Nur Eidträger und Flankenmeister (Elite mit drei Schlüsselwörtern) fallen auf die Notfallstufe 48 px zurück. Der Build meldet das als `WARN t270`.
  - Kartennamen fest 80 px; vorher 86/62/50 px je nach Zeichenzahl. Nur 9 sehr lange Namen werden auf Plakettenbreite verkleinert (66–76 px). Doktrin-Namen fest 80 px (vorher 92/70).
  - Zitat fett-kursiv 42 px statt kursiv 36, senkrecht mittig zwischen Trennlinie und Unterkante. 13 lange Zitate laufen zweizeilig. Bei Elitekarten bleibt das Zitat mittig und frei vom Orden.
  - Alle 1.746 Vorderseiten neu gerendert (alpha40, 1024×1428). Cache `divcmd-alpha41b`.

- **Balance und eindeutige Karten t268, Elite-Zitat t269:**
  - Alle 16 Nationen liegen zwischen 48 und 52 % (Bot gegen Bot, 23.040 Partien je Modus).
    - Starterdecks 44,9–55,3 → 48,9–51,1 %, Mischdecks 42,1–56,1 → 48,4–51,4 %.
    - Startspieler 48,7 bzw. 49,6 %.
  - Keine funktionsgleichen Karten mehr (vorher 179 Gruppen / 599 Karten mit gleichen Werten und gleichem Text) und keine doppelten Namen (vorher 57, IDs unverändert).
    - Unterschieden wird über Wertetausch, Zahl ±1 mit AP ±1 oder einen kleinen Zusatz bei +1 AP: Ziehe 1 Karte / Träger zerstört → ziehe 1 / Heilung 1 zu Zugbeginn.
    - Alles läuft über bestehende Engine-Effekte; Pool-Bausteine `theal`/`sdef` über `CM`.
  - 712 Karten geändert; vollständige Liste alt → neu in `docs/regeln/BALANCE_T268.md`, Vorgehen und Tabellen in `docs/entwicklung/STATUS_T268.md`.
  - Werkzeuge: `scripts/balance/cards_t268.js`, `profile_t268.js`, `tune_t268.js`, `names_t268.json`, `manual_t268.json`.
  - Neuer Test `tests/test_unique_cards_t268.js`; `tests/test_nation_pools.js` prüft die neuen `CM`-Bausteine sowie Bonus mit Heilung.
  - Kurztexte: Fehler „1 K..“ und „Wähle eine Feind“ behoben, keine Vorderseite mehr über 120 Zeichen.
  - Elitekarten: Zitat wieder mittig über die volle Breite, Orden darüber ohne Überdeckung. Alle Vorderseiten neu gerendert (alpha40, 1024×1428).
  - Hilfe (Entwicklungsstand, Fehlende Features, Fortschritt, Fortschritt in Prozent: 67 %, Kernspiel 77 %). Cache `divcmd-alpha41a`.

- **Kartenreparatur t267:** Die 14 Karten aus der Prüfung t265 wirken wie gedruckt (Lesarten und Sonderfälle in `docs/regeln/KARTEN_T267.md`).
  - Neuer Effekt `NEGATE_BONUS` (gegnerische Einheit: gespeicherte ATK-Boni und DEF über Druckwert weg, laufende Boni bis Ende des nächsten gegnerischen Zugs aus): Verfahrensbruch und Keine Sterne (nur Elite-Ziel, ziehe 1), Modellstopp (ziehe 1), Kein Schrein (danach eigene Einheit +1 DEF).
  - Eigener Bonus nach Feindziel (`param.side: 'own'`, neue Wahl „Eigene Einheit für den Bonus“): Notimplantat, Stoßtrupp, Lokalisierung (Soforteinsatz), Rasten, Kein Schrein, Opfergabe. Vorher stärkte der Bonus die gewählte Feindeinheit.
  - Opfern zerstört keine Feinde mehr ohne Kartentext (vorher 2): Opfergabe (nur DEF ≤ 2, heilt eine andere eigene um 2), Ablösung (Ersatz aus der Hand in denselben Abschnitt, Kosten bis +1, heilt 1). Letzter Ruf nur noch mit eigener Infanterie.
  - Verbandskasten heilt 1 am Zugende ohne Angriff (vorher 3 + Nachbarn 2 zu Zugbeginn); Werkstattmarke nur Panzer/Fahrzeug, heilt 1 zu Zugbeginn, solange beschädigt; Ortungsband: Ziel −1 DEF beim Angriff. `MEDIZIN` liest `self`/`flank`.
  - Stillprobe: neuer Text „Wähle eine gegnerische Fronteinheit: decke sie auf; −2 ATK bis Zugende.“ (alter Text war ein Entwurfsrest mit Fragezeichen), Front neu gerendert.
  - Bot bewertet die neue Wahl. Test `tests/test_cards_t267.js` (20 Fälle, rot auf altem Stand), Prüfskript mit Abschnitt `t267` (14/14 OK). Balance neu gemessen (`docs/entwicklung/STATUS_T267.md`): Rothain Starter 55,7 → 51,7 %, Theryn Starter 50,9 → 49,1 %, übrige Nationen innerhalb der Streuung. Hilfe (Entwicklungsstand, Fehlende Features, Fortschritt, Fortschritt in Prozent: 66 %, Kernspiel 75 %). Cache `divcmd-alpha40z`.

- **Analyse t265 (nur Diagnose, keine Spielmechanik geändert):**
  - Prüfung Kartentext gegen Engine über alle 1.746 Karten, alle 389 Soforteinsätze im Ablauf, alle Effektparameter und Soforteinsätze mit Feindziel (`scripts/balance/audit_text_engine_t265.js`). Ergebnis in `docs/regeln/TEXT_ENGINE_AUDIT_T265.md`: 10 Karten wirken anders als gedruckt (Verfahrensbruch, Keine Sterne, Modellstopp, Kein Schrein, Stillprobe, Opfergabe, Ablösung, Verbandskasten, Werkstattmarke, Ortungsband), 4 Texte stärken die gewählte Feindeinheit (Notimplantat, Stoßtrupp, Lokalisierung, Rasten). Gemeldet, nicht behoben.
  - Statusanalyse `docs/entwicklung/STATUS_T265.md`; Hilfe Entwicklungsstand, Fehlende Features, Fortschritt und Fortschritt in Prozent aktualisiert (64 % bis Early Access, Kernspiel 74 %). Musik nachgezählt: 15 Stücke statt 16.
  - Hilfe: Textbereich jeder Hilfe-Seite liegt auf halbtransparentem Schwarz (`rgba(0,0,0,0.7)`, abgerundet), das Hintergrundbild scheint durch. Nur CSS der Hilfe.
  - Browser-Test `ui-play` mit 8 weiteren Seeds: 38 Partien, 6 von 8 Seeds grün; 2 Abbrüche (4711, 31337) sind Zeitüberschreitungen des Tests (180 s), weil die Meldungen nach langen Bot-Zügen so lange laufen. Kein Einfrieren, nicht behoben. Cache `divcmd-alpha40y`.

- **Hänger „Der Gegner prüft Reaktionen“ und Armageddon (t259):**
  - Hänger aus `ui-play` (t258, Zug 16): Der Warte-Dialog für eine Bot-Wahl (Feindkontakt, SAM, Geist, `tac-*`) blieb liegen, wenn der Bot seine Wahl ohne neue Live-Meldung erledigte (z. B. Gefechtsabbruch verworfen), oder wenn `render()` ihn über eine laufende Meldung legte und deren Abschluss das Overlay dann nicht mehr schloss. Neu: `closeStaleWaitOverlay()` (nach Bot-Aktion, nach `render()`, bei leerer Meldungs-Warteschlange, beim Meldungsende), kein Warte-Dialog über laufenden Meldungen, Wächter (`armWaitWatchdog`, jede Sekunde; stößt den Bot nach 4 s erneut an). Zusätzlich stellt `guardPendingUi()` einen verlorenen eigenen Feindkontakt-/SAM-/Geist-Dialog wieder her (render() kehrte bei unverändertem Brett vor `showPending()` zurück; im Browser-Test als „Offene Auswahl ohne Bedienelement“ gesehen), auch jede Sekunde über den Zugtimer. Meldungs-Wache `guardEventPump()`: bleibt die Meldungs-Warteschlange 8 s „beschäftigt“, ohne dass eine Meldung sichtbar ist, wird sie freigegeben (im Browser-Test gesehen); Karten-Flüge vor einer Meldung zählen nicht. Meldungen haben eigene Timer: Vorher teilten sich alle Meldungen einen Timer, eine neue Meldung löschte den Tipp-Timer der laufenden, deren Text blieb stehen (z. B. bei „Test“) und die Pumpe war minutenlang „beschäftigt“. Eine sichtbare Meldung, die sich 15 s nicht verändert, wird ebenfalls beendet. Diagnose-Hook `dcEventDebug()` für `ui-play`. Engine: Das Feindkontakt-Fenster bietet nur noch bezahlbare Handreaktionen an. Vorher stand dort z. B. Napalm bei 0 AP; die Wahl scheiterte, und der Dialog verschwand (Browser-Test, Seeds 77/259). Regel ergänzt in `docs/regeln/RULES_v0.5_GRUNDKONZEPT.md`. Test `tests/test_ui_t259.js` (7 Fälle, rot auf altem Stand).
  - Armageddon wirkt jetzt vollständig nach Kartentext: Feld räumen, Armageddon und beide Hände auf den Ablagestapel, Ausspieler und Gegner ziehen je 5 über die normalen Ziehregeln (leeres Deck → Ablagestapel mischen), dann Münze. Vorher blieben die Hände liegen und die Karte selbst ging verloren. Bot bewertet Armageddon gesondert (`scoreArmageddon`). Test `tests/test_armageddon_t259.js`, Regeln in `docs/regeln/KARTEN_SONDERFAELLE.md`.
  - Hilfe (Beispielzüge, Entwicklungsstand, Fehlende Features, Fortschritt) angepasst. Cache `divcmd-alpha40x`.

- **Hilfe und Statusanalyse (t258):** Hilfe-Menü neu gegliedert: Marktanalyse (Vergleichsspiele KARDS, Hearthstone, Legends of Runeterra, Gwent, Marvel Snap, Flames of War; Steam-Kennzahlen von Game Market Data, mit Quellen), Entwicklungsstand (nachgezählte Zahlen), Fehlende Features, Fortschritt (Verlauf, Meilensteine) und Fortschritt in Prozent (65 % bis Early Access, Gewichtung je Bereich, Methodik). Veraltete Regelzeile „Startspieler 3 AP“ in der Hilfe korrigiert. Cache `divcmd-alpha40w`. Doku: `docs/entwicklung/STATUS_T258.md`.

- **Browser-Fehler beim Ausspielen (t256):** Im Browser hing die Seite, sobald man eine Karte auf ein Feld legte. Ursache: Die Bot-Proben aus t254 kopierten die Engine samt dem `dispatch`-Hook der Oberfläche (Playtest-Logger). Jede Probe lief dadurch über die echte Partie und rief erneut den Bot-Vorschlag auf. Das war eine Endlosschleife, und der Bot veränderte beim Nachdenken den echten Stand. `cloneEngine` übernimmt jetzt keine eigenen Funktionen bzw. Hooks mehr. Weitere Fehler aus dem Browser-Durchlauf:
  - „Gefecht beginnen“ startete jede Partie doppelt.
  - Der Münzwurf lag unter dem Schleier und wurde vom Countdown überschrieben. Begann der Bot, zog er nie.
  - Gezogene Karten des Gegners erschienen in der Meldung offen.
  - Eine Meldung konnte stehen bleiben; jetzt per Klick überspringbar, mit Sicherheitsfrist.
  - Neuladen (F5) beendete `server.py` (jetzt Gnadenfrist).
  
  Neu ist der Browser-Test `npm run ui-play` (Playwright/Chromium, nicht in `npm test`) und `tests/test_ui_t256.js` (in `npm test`). Cache `divcmd-alpha40v`. Doku: `docs/technik/UI_TEST_T256.md`.

- **Startspieler (t257):** Beide Spieler haben im ersten Zug **5 AP** (`opening_starter_ap_penalty` 2 → 0). Ausgleich bleibt das Ziehen: Der Startspieler zieht in Zug 1 keine Karte, der Zweite zieht zu Beginn seines ersten Zuges 1 und hat damit eine Karte mehr. Regeltexte (Hilfe, Glossar, Münzwurf-Overlay, docs/regeln). Startspieler-Quote mit dem t254-Bot: 47,8 % (Starter) und 48,5 % (Misch), zuvor 43,7 / 43,8 % angepasst; das „(Start: N)“-Badge erscheint nur noch bei aktivem Abzug. Cache `divcmd-alpha40u`. Messung: `docs/balance/STARTSPIELER_T257.md`.

- **Balance und Reskins (t255):** Nationen neu ausbalanciert (Ziel 46–54 %). Gemessen wurde mit dem t254-Bot in 69.120 Partien je Modus. Hebel waren vor allem Doktrinpaare:
  - Abnutzung zieht keine Karte mehr.
  - Gepanzerter Fuß gibt nur noch ausgerüsteten Einheiten +1 DEF.
  - Marsch aus dem Vollen gibt beim Einrücken kein dauerhaftes +1 DEF mehr. Das war ein Text-Fehler: gedruckt war „bis Zugende“.
  - Schwerpunkt greift ab 2 Einheiten.
  - Sturmangriff wirkt auf die zwei stärksten Infanterien.
  - Auswertung hält bis zum Ende des nächsten eigenen Zuges.
  - Verteilte Stellung gibt +2 DEF.

  Dazu kommen gezielte Wertänderungen (±1 ATK/DEF/AP) an Karten aus den Starterdecks und Pools.
  - **Regelkorrektur:** „Erleidet der Träger Schaden, heilt er danach 1“ rettet nicht mehr vor tödlichem Schaden.
  - **Reskins:** 54 mechanisch gleiche Karten verschiedener Nationen haben jetzt je Nation eine eigene Wendung, zum Beispiel allein im Abschnitt, Überzahl, Klassenbedingung, Heilung mehrerer Einheiten oder Beobachten. Averon und Orthea markieren Feinde jetzt als beobachtet, statt nur aufzudecken.
  - **Engine:** Neue CM-Bedingungen `is:`, `superior` und `wounded`. Neue Optionen `turnheal count`, `REVEAL observe` und Sturmangriff `count`. Der Bot nutzt alles über `listActions`/`dispatch`.
  - **Karten und Cache:** 224 Vorderseiten neu (alpha40), Cache `divcmd-alpha40t`.
  - **Doku:** Sonderfälle in `docs/regeln/EFFEKT_SONDERFAELLE_T255.md`, Details in `docs/balance/BALANCE_T255.md`.

- **Bot-KI (t254):** Der Test-Bot ordnet seinen Zug in Stufen (dringende Neutralisierung, Kampfausrüstung und starke Effekte, vernichtende Angriffe, übrige Ausspielungen), prüft Massen, Gassen, Gehorsam, Letzter und Mobilisierung per Vorausschau auf einer Engine-Kopie, nutzt aktivierbare Fähigkeiten eigener Karten, spielt Panzer gezielt für Blitzkrieg, legt Vertragsclip nur mit Soforteinsätzen und testet jede Aktion vorab (0 abgelehnte Aktionen). Im Browser trifft der Bot Folgewahlen jetzt selbst statt mit der ersten Option. Neuer Bot gegen alten: 78,6 % (Misch) / 78,0 % (Starter). Kartenregeln und Preise unverändert. Cache `divcmd-alpha40s`. Messung, Balancefolgen und Vorschläge: `docs/balance/BOT_KI_T254.md`.

- **Effekte (t251):** Drei Teil-Stubs aus dem Scan t250 greifen jetzt wie gedruckt: Vertragsclip (`EQUIP_DISCOUNT_AURA` in `costOf`, Träger Elite oder Unterstützung), Blitzkrieg (`BLITZ_LOCK_SUPPORT`: Sperre gegnerischer Unterstützungsfähigkeiten in der nächsten Runde nach einem Panzer-Ausspiel) und Schläferzelle (`NEUTRALIZE`, 2 AP über `listActions`/`dispatch`). Preise unverändert, sofern die Nachsim das bestätigt. Sonderfälle: `docs/regeln/EFFEKT_SONDERFAELLE_T251.md`. Begründung: `docs/balance/BALANCE_T251.md`.

- **Soforteinsätze (t250):** Psychologie der Massen, Blinder Gehorsam, Einsame Gassen, Der Letzte der steht und Mobilisierung wirken jetzt wie gedruckt (Massen-Folge, +2 ATK und freie Frontangriffe, Füllen aus dem Deck, Opfer/+1/+1/SP-Flag `letzterDerSteht`, Mobilisierung bis zu 2). Bots und LAN-Sync über bestehende Pending-Aktionen. t249-Preise nach kurzer Sim mit echter Wirkung belassen. Sonderfälle: `docs/regeln/SOFORT_SONDERFAELLE.md`. Stub-Scan (nur Liste): `docs/balance/STUB_SCAN_T250.md`. Begründung: `docs/balance/BALANCE_T250.md`.

- **Soforteinsätze (t249):** Zehn Grundset-Karten mit 0 AP neu bepreist: Luftschlag 4, Dammbruch 6, Psychologie der Massen 6, Generalmobilmachung 4, Blinder Gehorsam 6, Einsame Gassen 6, Mobilisierung 3, Deckung suchen 2, Selbstopfer 2, Der Letzte der steht 3. Deckung suchen gewährt jetzt wirklich +3 V bis zum Angriff. Vorderseiten neu (alpha40), Cache `divcmd-alpha40r`. Begründung und Simulation: `docs/balance/BALANCE_T249.md`.

- **Bibliothek (t248):** Der Nationsfilter zeigt nur noch die 100 Karten der Nation plus ihre 2 Starter-Doktrinen. Neutrale (Grundset, Taktik-Entwürfe, 4 unzugeordnete Doktrinen) erscheinen unter „Neutral“ und „Alle Nationen“. Die Dropdown-Zähler entsprechen der Listenlänge. In der Alle-Ansicht tragen Neutrale ein Herkunfts-Badge „Neutral“. Deckbau (freies Mischen, beliebige 2 aus 36 Doktrinen) unverändert.
- **Napalm (t248):** `dc_so_napalm` kostet **3 AP** statt 0 (3 Sofortschaden plus DoT 1 je Zug des Besitzers). Vorderseite neu gerendert (alpha40). Begründung und Simulation: `docs/balance/BALANCE_T248.md`. Service-Worker-Cache `divcmd-alpha40q`.

- **Kommentare (t245):** Dateiköpfe und JSDoc/Docstrings an Engine, UI, Bots, Tests, Skripten und Kartendaten (Köpfe/Abschnitte, nicht pro Karte). Keine Logikänderung.
- **Repo-Aufräumung (t245):** Klare Ordnerstruktur (`tests/`, `scripts/` nach Zweck, Doku mit `entwicklung/` und `archiv/`). Simulations-Rohdaten nicht mehr im Repo (`scripts/balance/out/`, `.gitignore`). Keine Regel- oder Balanceänderungen.
- **Ausrüstung-Reparatur (t244):** Panzerplatte Serie, Zieloptik Konzern und Passoptik – durch den Parser der Kartenprüfung auf 0 gesetzte Werte sind wiederhergestellt (inkl. Originalbedingungen im Effekt und Text). Verbindungssiegel wirkt nur noch wie gedruckt (Aufdecken beim Anlegen, ohne +1 ATK gegen beobachtete Ziele). Die übrigen Kürzungen der Prüfung t212 bleiben bewusst. Verzeichnis: `docs/regeln/KARTEN_KUERZUNGEN.md`.


## 0.6b Alpha – 10.11.2026

Neue Buchstabenversion: Startspieler-Regel geändert (3 AP im ersten Zug), verdeckte Fallen spielbar, Balance für realistische Mischdecks.

### Regeln & Engine
- **Startspieler-Ausgleich:** Der Startspieler hat im ersten Zug **3 statt 4 AP** (`opening_starter_ap_penalty` 1 → 2). Keine Zusatzkarte; der Zweite zieht beim ersten Zugwechsel wie bisher 1 Karte. Simulation: Siegquote Startspieler 54,5 → 50,0 % (Starterdecks), realistische Mischdecks 50,2 % (je 34.560 Partien, ±0,5).
- **Verdeckte Fallen** im Support lösen bei Feindkontakt als Reaktion aus (ohne weitere AP, RULES §12.1). Vorher wurden sie angeboten, ließen sich aber nicht spielen. Ohne gültiges Ziel bleiben sie verdeckt liegen.

### Balance
- **Realistischer Mischdeck-Generator** für Simulationen (`scripts/nation_pools/mixed_deck.js`): 30 Einheiten, 10 Ausrüstung, 8 Unterstützung, 12 Soforteinsätze, halb Pool, halb Starterdeck. Averon, Dargan und Ossaria liegen damit bei 48–51 %; die Werte unter 45 % aus t237 waren ein Artefakt des alten Testdecks.
- **Caldris** im Mischdeck 57,7 → 53,7 %: 14 Poolkarten um eine Stufe schwächer (u. a. Panzerschild Caldris Schaden −2 → −1, Feldklinik 3 → 4 AP, Vollschutzweste +3 → +2 DEF). **Namar** Kaipanzerung 1 → 2 AP. Zweiter Schritt (t240): Schildträger 2/4 → 2/3, Sanitätspanzer 2/4 → 2/3, Oberste Fürsorge 4/6 → 4/5, Schild heben +2 → +1 DEF, Schutzschild leicht +2 → +1 DEF; Caldris gemischt 54,5 → 52,9 % (69.120 Partien), Starter 50,6 %. Details: `docs/balance/BALANCE_T240.md`. Spannen nach 0.6b: Starterdecks 47,0–53,3 %, Mischdecks 47,0–52,9 %. Details: `docs/balance/BALANCE_T238.md`.

### Grafik
- Neue Motive: **Routenwache** (Sahr) in Sahr-Petrol-Tarnung statt Oliv/Khaki; **Ruderpanzer** zeigt nur das Ausrüstungsteil (Ruder-Panzerkit) statt eines ganzen Fahrzeugs.

### Doku & Version
- Version 0.6b überall (VERSION, version.js, Build-Label, file_version_info 0.6.1.0, start.bat, Hilfe, README, LIESMICH).
- Projektdokumentation (MD + PDF) mit 3-AP-Start, verdeckten Fallen und Balance-Stand neu gebaut.

### Aufräumen
- Spielordner versionsneutral: `Division_Command_0.5a/` → `Division_Command/` (alle Skripte, Tests, Editor- und Doku-Pfade angepasst).

## 0.6a Alpha – 10.11.2026

Seit 0.5a (02.11.2026): über 300 Commits. Neue Nebenversion, weil sich Regeln geändert haben, die Partien anders laufen lassen (Soforteinsatz-AP, Steilfeuer, Trophy-Standard), und weil alle Karten neu geprüft und gesetzt sind.

### Karten
- **Kartenpool 1.746 Karten:** 16 Nationen mit je 100 Karten (60 Nationenkarten + 40 neue Poolkarten, 640 neu) und 2 Doktrinen, dazu Alpha-Basiskarten und Taktik-Entwürfe. Decks 60 + 2, Karten aller Nationen frei mischbar, Kopienlimit Gold 1 / Silber 2 / Bronze 4.
- **Kartenprüfung aller 1.746 IDs:** Grundsatz „Kartentext = Implementierung“. 899 Texte und 802 Mechaniken korrigiert, 607 vorher nicht implementierte Fähigkeiten auf 0 (`docs/karten/KARTENPRUEFUNG.md`). Knappe Kartentexte (≤ 120 Zeichen); jede gekürzte Karte steht verlustfrei in `docs/regeln/KARTEN_SONDERFAELLE.md`.
- **alpha40-Design:** alle Vorderseiten neu gerendert (1024×1428, Motivfenster 40 %, nie gestreckt), Doktrinen im Bollwerk-Stil, Elite mit transparentem Orden, Tag-Chips ohne schwarze Leiste; fehlende Motive vollständig ergänzt.

### Regeln
- **Steilfeuer I–V** ersetzt „Indirektes Feuer“: Reichweite als Tag auf allen Artillerie-Einheiten. I Mörser, II Haubitzen/Geschütze, III Raketenwerfer, IV ganze Front, V ganze Front + Unterstützungszone (Supportangriff +2 AP, gesamt 3 AP).
- **Soforteinsätze kosten ihre gedruckten AP**; Rabatte greifen, nie unter 0; unbezahlbare Karten sind ausgegraut.
- **Trophy-Sieg** ist Standard (`victory_mode: trophy`); der Startspieler hat im ersten Zug 4 AP.
- Eingraben (Deploy-Schutz), Kopienlimits in Engine/Deckbauer erzwungen, Abschnitt-Effekte zielen korrekt.

### Balance
- Wertausreißer angepasst (Hammer, Faustkeil, Koloss, Haubitzenzug, Werkrott-Kolonne, Straßenriegel, Werkbach-Riegel); fünf Ausrüstungen mit vollem Preis und bedingtem Rabatt; Armageddon 8 AP.
- **Simulationspass t237** (11.520 Bot-Partien je Modus): Siegquoten der Starterdecks 42–60 % → 45–53 %; vier Doktrinen (Materialersatz, Abnutzung, Zielangriff, Abschluss), 32 Starterdeck-Tausche, 65 Poolkarten ±1. Details: `docs/balance/BALANCE_T237.md`.

### Oberfläche
- Bibliothek: Filter nach Seltenheit und mehreren Tags (UND), Suche auch über Tag-Namen.
- 2,5D-Offizierstisch (optional), Tischkamera, Tisch-Effekte, Kartenansicht in voller Auflösung, HUD mit klickbaren Lücken, getrennte Lautstärken für Musik und Effekte, Soundset v4, Endbildschirm, Playtest-Logger.
- Hilfe aktualisiert (Regeln, Steilfeuer, Lore, Version).

### Engine & Bot
- **Bot-Hänger behoben:** Wartefenster („Feindkontakt“, „Gezeigte Karten“, SAM, Geist) bieten immer eine legale Aktion (Weitergeben/Schließen); unbezahlbare Reaktionen werden nicht mehr angeboten. Smoke- und Fuzz-Test schlagen bei Hängern, Timeouts oder unbeendeten Partien fehl.
- Effekte aller Ausrüstungen und Soforteinsätze verdrahtet, Soft-Locks bei Zielwahl behoben.

### Aufräumen
- Eingecheckte `__pycache__`-Dateien entfernt, `.gitignore` ergänzt; `NATIONENPOOL_KARTEN.md` neu erzeugt; Projektdokumentation (MD + PDF) auf 0.6a.

### Bekannt offen
- Startspieler gewinnt in der Simulation ≈ 54–56 % (Test mit 3 AP im ersten Zug: ≈ 51 %; Kernregel, nicht geändert).
- Routenwache (Sahr) Farbe, Ruderpanzer-Motiv zeigt ganzes Fahrzeug; Porträts erst für 8 von 16 Nationen.

## 0.5a Alpha – 02.11.2026
- Ordner von `Division_Command_0.32c` umbenannt, Versionsstrings auf 0.5a.

## 0.32c–0.32f – September 2026
- Frühe Alpha-Stände (Frontanzeige, Charaktereditor modular).
