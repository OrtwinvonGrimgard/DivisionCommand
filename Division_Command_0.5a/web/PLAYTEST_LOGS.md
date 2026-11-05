# Playtest-Logs

Immer-an Partie-Protokollierung im Browser (IndexedDB), Export und Auswertung.

## Speicherung

- Datenbank: `dc_playtest` (Stores: `games`, `notes`, `meta`)
- Jede Partie startet automatisch beim Match-Beginn (`DCPlayLogger.beginMatch`).
- Persistenz über Sitzungen hinweg — **nicht im Inkognito** spielen und Websitedaten nicht löschen.
- Etwa alle **10 Partien** über das Playtest-Panel exportieren.

## Panel

Button **Playtest** am Spieltisch und **Playtest / Logs** im Titelmenü.

| Tab | Inhalt |
|-----|--------|
| Logs | Liste gespeicherter Partien, Export (ZIP), optional Löschen nach Export |
| Anmerkungen | Text max. 500 Zeichen, Kategorie Anmerkung / Idee / Bug, Liste |
| Chat | LAN-Chat über die bestehende WebSocket-Verbindung; ohne Verbindung deaktiviert |

## Exportformat (ZIP)

```
manifest.json          # schema, exportedAt, version, counts
logs/<gameId>.json     # eine Datei je Partie
notes/<noteId>.json    # Anmerkungen
notes/_index.json      # Kurzliste
```

### Partie-JSON (Schema 1)

- `id`, `startedAt`, `endedAt`, `version`, `build`, `mode`, `seed`
- `startPlayer`, `coin` (Münzwurf)
- `players[]`: `name`, `nation`, `doctrines[]`, `controller` (`human`/`bot`/`remote`)
- `turns[]`: je Aktion `t`, `thinkMs`, `player`, `actor`, `action`, `botSuggestion`, `botMatch`, `result`, `ap`, `vp`, `front`, optional `combat`
- `chat[]`: `t`, `name`, `text`, `player`
- `end`: `kind`, `winner`, `reason`, `turns`, `durationMs`, `aborted`

## Auswertung

```bash
node scripts/analyze_playtest_logs.mjs pfad/zu/dc_playtest_….zip
# oder entpackter Ordner mit logs/ und notes/
```

Kennzahlen: WR je Nation/Doktrin, Kartennutzung, Siegarten, Partielänge, Mensch↔Bot-Abweichung, Anmerkungen/Bugs.

## LAN-Chat (technisch)

- Transport: bestehende Raum-WebSocket (`server.py`, Port HTTP+1).
- Client: `DCNet.sendChat` / `DCNet.onChat` in `web/js/net.js`.
- Server leitet Nachrichten vom Typ `chat` an **alle anderen** Clients weiter (kein Echo an den Absender).
- Absender trägt die eigene Nachricht lokal in Logger + UI ein.
- Chatverlauf liegt in `game.chat` und wird mit exportiert.
- Einschränkungen: nur bei aktiver LAN-Verbindung; max. 400 Zeichen; kein Verlauf vor Verbindungsaufbau; Gast und Host speichern jeweils lokal (Host hat die vollständige Zugliste).

## API (Browser)

- `DCPlayStore` — IndexedDB + ZIP-Export
- `DCPlayLogger` — beginMatch / recordAction / botSuggest / addChat / finish / abort
- `DCPlayPanel` — show / hide / setTab
