# Division Command

Alpha **0.6b** — zynisch-dunkles Sammelkartenspiel (Front, Support, Niemandsland).

Dies ist das Repository. Das spielbare Paket liegt in [`Division_Command/`](Division_Command/README.md) (starten mit `start.bat` / `start.sh`). Die vollständige Dokumentation beginnt in [`Division_Command/docs/README.md`](Division_Command/docs/README.md). Änderungen je Version: [`CHANGELOG.md`](CHANGELOG.md).

## Ordnerstruktur

```
.
├── Division_Command/          Spiel (auslieferbares Paket)
│   ├── web/                   HTML, CSS, Engine, UI, Bots, Kartendaten, Assets
│   │   ├── js/engine/         Regelmaschine (alleinige Autorität)
│   │   ├── js/ui/             Oberfläche, kein Regelcode
│   │   ├── js/ai/             Bots
│   │   ├── js/data/           Katalog, Decks, Schlüsselwörter; sets/types/ = Karten
│   │   └── assets/            Kartenbilder, Audio, Porträts, Tisch
│   ├── docs/                  Dokumentation, die mit dem Spiel liegt
│   │   ├── regeln/            Regelwerk, Schlüsselwörter, Sonderfälle
│   │   ├── balance/           Balanceberichte und Simulationen
│   │   ├── karten/            Pools, Kartenprüfung
│   │   ├── nationen/          Lore und Kriegsführung
│   │   ├── technik/           Render, Kamera, Sound, Playtest
│   │   ├── entwicklung/       Entwürfe, nicht implementiert
│   │   └── archiv/            Überholte Pläne und Konzeptlisten
│   ├── portraits/             Werkzeug für Porträtebenen (nicht das Spiel)
│   ├── server.py              Lokaler Host für Vorschau und LAN
│   └── launcher.py, start.*, build.bat, …
├── KartenEditor/              Eigenständiger Karteneditor
├── scripts/                   Werkzeuge (nichts davon läuft im Browser)
│   ├── graphics/              Vorderseiten rendern und prüfen (alpha40)
│   ├── cards-review/          Kartenprüfung, Kurztexte, Kürzungen
│   ├── balance/               Bot-Simulationen; Rohdaten nach out/ (gitignore)
│   ├── nation_pools/          Pool-Build, Testdeck-Lader, Mischdecks
│   ├── tactics/               Taktische Schlüsselwörter: Build und Doku
│   ├── keywords/              Glossar der allgemeinen Schlüsselwörter
│   ├── build/                 Bildmanifest und ähnliche Generatoren
│   ├── playtest/              Auswertung und Screenshots von Playtest-Logs
│   └── dev/                   Einmal-Hilfen (Audit, Effektverdrahtung)
├── tests/                     Alle automatisierten Tests (`npm test`, `npm run fuzz`)
├── package.json               Test- und Build-Skripte (Repo-Wurzel)
└── CHANGELOG.md
```

Kartenbilder und Porträts bleiben unter `Division_Command/web/assets/` (große Binärbestände, keine unnötige Verschiebung).

## Entwickeln

Voraussetzungen: Node.js und Python 3. Abhängigkeiten: `npm install`.

| Befehl | Zweck |
|---|---|
| `npm test` | Gesamte Testsuite inkl. kurzem Smoke (32 Partien) |
| `npm run fuzz` | Engine-Invarianten (zufällige Partien) |
| `python3 scripts/graphics/verify.py` | Vorderseiten 1024×1428, Texte, Motivpräsenz |
| `npm run build:tactics` | Schlüsselwort- und Pool-Dokumentation neu erzeugen |
| `npm run build:graphics` | Kurztexte, Rendern, Bildmanifest |

Simulationen: `node scripts/balance/sim_….mjs`. Ausgaben landen in `scripts/balance/out/` und werden nicht committet.
