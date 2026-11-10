# Changelog – Division Command

## Unreleased

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
