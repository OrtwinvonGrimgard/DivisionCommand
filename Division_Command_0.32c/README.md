# Division Command

Alpha **0.32d** — zynisch-dunkles Sammelkartenspiel (Front, Support, Niemandsland).

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

Die WAV-Dateien liegen nach Verwendung getrennt in `web/assets/audio/menue/` und `web/assets/audio/kampf/`. Der Dateiname von Inside Out ist korrigiert.
