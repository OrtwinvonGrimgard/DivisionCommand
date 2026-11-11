# Browser-Test der Oberfläche (t256)

`npm run ui-play` startet `server.py` auf einem freien Port und öffnet Chromium (Playwright 1.49, headless). Der Service Worker ist dabei blockiert, damit kein alter Cache stört. Die Animationen werden über die Nutzeroptionen verkürzt (Flug 50 ms, Meldung 400 ms). Die Laufzeit liegt bei etwa 5–15 Minuten. Der Test ist nicht Teil von `npm test`, weil er Chromium braucht.

Voraussetzung: `npm install` und `npx playwright install chromium`.

Umgebungsvariablen:
- `DC_UI_GAMES`: Anzahl der Partien (Standard 3)
- `DC_UI_SEED`
- `DC_UI_OUT`: Ausgabeordner (Standard `/workspace/t256-ui`)
- `DC_UI_PORT`
- `DC_UI_MAXTURNS`

## Was geprüft wird

- **Menüs:** Alle sichtbaren Schaltflächen in Hilfe, Bibliothek, Optionen, Benutzer, Einzelspieler und LAN-Lobby werden einmal geklickt. In der Bibliothek kommen die Filter-Auswahlen dazu, außerdem das Playtest-Panel.
- **Start der Partie:** Der Münzwurf ist nach dem Countdown sichtbar und klickbar.
- **Tisch:** Protokoll, Chat-Tab, Optionen, „Weitere Befehle“ und Playtest-Panel werden geöffnet.
- **Spielzüge über die Oberfläche:**
  - Einheiten werden abwechselnd per Klick (Karte, dann leuchtendes Feld) und per Ziehen gelegt.
  - Außerdem werden Unterstützung, Ausrüstung und Soforteinsätze gespielt, Angriffe über den Einheitendialog ausgeführt und Support-Fähigkeiten genutzt.
  - Alle Auswahl- und Meldungsdialoge werden bedient.
- **Prüfung nach jedem Legen:**
  - Die Karte liegt in der Engine-Front und als DOM-Feld (`#my-front .slot[data-uid]`).
  - Sie ist nicht mehr in der Hand.
  - Die DOM-Front und die DOM-Hand stimmen mit der Engine überein.
  - Es gibt keine kaputten Bilder.
- **Ganze Partien:** Mensch gegen Bot bis zum Endbildschirm. Danach folgen eine Partie mit „Aufgeben“ (Endbild, dann Hauptmenü) und eine mit „Frieden anbieten“.
- **Fehlerfreiheit:** keine Konsolenfehler, keine unbehandelten Ausnahmen, keine 4xx-Antworten für Bilder, Skripte oder CSS.

Bericht und Screenshots landen in `<OUT>/ui_play_report.json` und `<OUT>/NNN_*.png`.

## Nicht abgedeckt

- **LAN:** Es läuft nur die Lobby auf einem Rechner (Hosten, Suchen). Echte Zwei-Rechner-Partien testet `npm run ui-matrix` lediglich lokal über zwei Browser-Kontexte.
- **EXE:** Der PyInstaller-Launcher wird nicht getestet.
- **Darstellung:** Der Test läuft nur in der flachen Tischansicht, nicht in der 2,5D-Kamera.
- **Ton:** Es gibt nur die Prüfung auf Fehlerfreiheit.
