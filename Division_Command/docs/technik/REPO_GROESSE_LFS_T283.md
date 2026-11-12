# Repo-Größe und Git LFS (t283, nur Dokumentation)

Stand 12.11.2026 (Berlin):

| Bereich | Größe |
|---|---|
| `.git` (Packdatei, gesamte Historie) | ca. 5,6 GB (32 382 Objekte) |
| Arbeitsstand `HEAD`: `web/assets/cards` (Kartenflächen, Motive) | ca. 1,5 GB |
| Arbeitsstand `HEAD`: `web/assets/audio` (Musik, teils WAV mit 37–50 MB je Datei) | ca. 0,55 GB |
| Arbeitsstand `HEAD`: `web/assets/portraits` | ca. 0,15 GB |

Ursache: Kartenflächen werden bei jeder Text-/Wertänderung neu gerendert (WebP 1024×1428) und als neue Blobs eingecheckt; große WAV-Musik liegt direkt im Repo.

## Entscheidung t283
* **Keine Umschreibung der Historie** (kein `git filter-repo`, kein `git lfs migrate`): Das würde alle Hashes ändern, bestehende Tags (`v0.6a`, `v0.6b`) und Klone ungültig machen und einen Force-Push erfordern.
* Die CI-Vorlage (`docs/technik/ci-workflow.yml`, zu aktivieren als `.github/workflows/ci.yml`) klont mit `fetch-depth: 1`, damit nur der aktuelle Stand (~0,7 GB) geladen wird.

## Empfohlener späterer Schritt (eigene Aufgabe, mit Freigabe)
1. `git lfs install` und `.gitattributes` mit `*.wav`, `*.mp4`, `Division_Command/web/assets/cards/**/*.webp` `filter=lfs diff=lfs merge=lfs -text` – **nur für neue Commits** (keine Migration). Das bremst das Wachstum, ohne die Historie anzufassen.
2. WAV-Musik nach OGG/Opus wandeln (≈ −90 % Größe), WAV-Originale außerhalb des Repos archivieren.
3. Erst wenn alle Beteiligten neu klonen können: optional `git lfs migrate import` mit neuem Repo statt Force-Push.

Klonen für Mitwirkende: `git clone --depth 1 https://github.com/OrtwinvonGrimgard/DivisionCommand.git`.
