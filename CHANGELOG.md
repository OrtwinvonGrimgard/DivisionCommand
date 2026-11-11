# Changelog – Division Command

## Unreleased

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
