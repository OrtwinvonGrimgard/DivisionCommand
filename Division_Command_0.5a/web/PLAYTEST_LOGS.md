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
| Chat | jetzt im Tisch-Protokoll (Tab „Chat“); nur Sitzung, kein Export |

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
- Absender trägt die eigene Nachricht nur lokal in die UI ein (Tab „Chat“ im Tisch-Protokoll).
- Chat wird **nicht** gespeichert und **nicht** exportiert; der Verlauf gilt nur für die laufende Sitzung. Alte Partien mit `chat`-Feld werden beim Export rekursiv bereinigt.
- Einschränkungen: nur bei aktiver LAN-Verbindung; max. 400 Zeichen; kein Verlauf vor Verbindungsaufbau; Gast und Host speichern jeweils lokal (Host hat die vollständige Zugliste).

## API (Browser)

- `DCPlayStore` — IndexedDB + ZIP-Export
- `DCPlayLogger` — beginMatch / recordAction / botSuggest / addChat (No-op, Chat wird nicht geloggt) / finish / abort
- `DCPlayPanel` — show / hide / setTab
