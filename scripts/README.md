# Skripte

Werkzeuge der Repo-Wurzel, nicht Teil der Browser-App. Aufruf immer von der Repo-Wurzel.

| Ordner | Zweck |
|---|---|
| `graphics/` | Vorderseiten (alpha40, 1024×1428). Siehe [graphics/README.md](graphics/README.md). |
| `cards-review/` | Kartenprüfung t212, Kurztexte, Verzeichnis der Kürzungen. |
| `balance/` | Bot-Simulationen (Siegquoten, Trophy, Front, Gegenschlag). Rohdaten: `balance/out/` (nicht versioniert). |
| `nation_pools/` | Erzeugung der Pool-Quellen, `load_game.js` für Tests, Mischdeck-Generator. |
| `tactics/` | Build und Dokumentation der taktischen Schlüsselwörter. |
| `keywords/` | Glossar der 16 allgemeinen Schlüsselwörter. |
| `build/` | Generatoren wie das Kartenbild-Manifest. |
| `playtest/` | Playtest-Logs auswerten, Panel-Screenshots. |
| `dev/` | Hilfsskripte (Wahl-Karten-Audit, Effektverdrahtung). |

Tests liegen nicht hier, sondern unter [`../tests/`](../tests/).
