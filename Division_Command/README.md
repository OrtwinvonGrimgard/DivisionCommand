# Division Command

Alpha **0.6e** — zynisch-dunkles Sammelkartenspiel (Front, Support, Niemandsland).

## Starten (Windows)

1. Ordner klonen oder herunterladen
2. `firewall.bat` einmal ausführen (LAN)
3. `start.bat` doppelklicken

Hotseat, Bot und LAN-Lobby liegen im Hauptmenü.

## Inhalt

| Ordner | Was |
|---|---|
| `web/` | Spiel (HTML, Engine, Karten, Audio) |
| `web/assets/cards/` | Kartenbilder |
| `web/assets/audio/menue/` | Menümusik |
| `web/assets/audio/kampf/` | Kampfmusik |
| `web/assets/audio/index.json` | Welche Stücke auf welchem Schirm laufen |
| `server.py` | Lokaler Host für Vorschau und LAN |
| `portraits/` | Werkzeug für Porträtebenen, nicht das Spiel |
| `docs/` | Dokumentation: Regeln, Nationen und Lore, Karten, Balance, Technik, Entwicklung, Archiv |

Die WAV-Dateien liegen nach Verwendung getrennt in `web/assets/audio/menue/` und `web/assets/audio/kampf/`. Der Dateiname von Inside Out ist korrigiert.

## Dokumentation

Änderungen je Version: [CHANGELOG](../CHANGELOG.md).

Alle Regeln, Lore-Texte und Planungen liegen in [`docs/`](docs/README.md). Das Inhaltsverzeichnis steht in [docs/README.md](docs/README.md), zum Beispiel [Siegbedingungen](docs/regeln/SIEGBEDINGUNGEN.md), [Schlüsselwörter](docs/regeln/SCHLUESSELWOERTER.md), [Lore der Nationen](docs/nationen/LORE_NATIONEN.md) und [Fahrplan (Archiv)](docs/archiv/FAHRPLAN.md).
