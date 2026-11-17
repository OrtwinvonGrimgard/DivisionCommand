# CI (GitHub Actions)

**Status:** aktiv seit t289 (17.11.2026). Die Datei liegt unter `.github/workflows/ci.yml` im Repo-Root; die frühere Vorlage `ci-workflow.yml` wurde entfernt (keine doppelte Pflege).

**Trigger:** Push und Pull Request auf `main`, außerdem manuell (`workflow_dispatch`).

**Was geprüft wird:**
1. `npm test` (alle Regel-, Karten-, UI-Logik- und Server-Tests)
2. `python3 scripts/graphics/verify.py` (Kartenvorderseiten 1024 × 1428, Texte, Motivpräsenz)
3. `npm run fuzz` (Engine-Invarianten)
4. `node scripts/balance/audit_text_engine_t265.js` (Kartentext gegen Engine)

**Was nicht in der CI läuft:** die Playwright-Browser-Gates (`ui-play`, `tutorial-play`, `reset-play`, `layout-test`, `screens-test`, `libzoom-play`, `lan-play`, `funcs-play`) und `smoke_sim 400`. Sie brauchen Chromium und laufen lange; sie bleiben lokale Gates vor jedem Push (siehe `current_state.md` §8).

**Abhängigkeiten:** `package-lock.json` ist eingecheckt (`npm ci`); Python: `scripts/graphics/requirements.txt` plus `websockets`.

**Wartung:** Die Datei ändert sich selten. Neue Testdateien werden in `package.json` (`npm test`) eingetragen; die CI führt sie dann automatisch aus.

**Klonen/Größe:** Die CI klont mit `fetch-depth: 1`, siehe `REPO_GROESSE_LFS_T283.md`.
