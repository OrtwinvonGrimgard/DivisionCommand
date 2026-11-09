# Kartenvorderseiten gfx2 (t212)

Ersetzt die textlastigen gfx1-Flächen (`faces-v1`, entfernt). Neue Flächen liegen in `web/assets/cards/faces-v2/<id>.webp`, 1024×1428.

## Gestaltung
- Originale Rahmensprache aus `KartenEditor/tools/render.py`/`render_core` (Rahmen nach Seltenheit, Kosten-Stern, Namensbanner, ATK/DEF-Plaketten, Logo, Mühlen-Münze, Typ-Velvet).
- gfx3-Layout (Nutzerwunsch: "Der Text ist das Wichtigste", "überall gleich"): EINE Geometrie für alle Typen und Nationen. Motivfenster fest 1396x900 (42 % der Kartenhöhe; Original-Renderer 816 px = 38 %), darunter Namensbanner, immer reservierte Tag-Leiste und feste Textfläche (~30 %). Text vertikal zentriert, Schrift stuft automatisch 60 -> 40 px ab, Flavor fällt notfalls weg. Doktrinen: gleiches Fenster mit Marmor + Stern. Nur Farben, Typ-Plakette und ATK/DEF-Plaketten (Einheiten) unterscheiden sich.
- Motive: Cover-Zuschnitt (nie verzerrt, keine Unschärfefüllung); neue Motive werden mit Inhalt im mittleren Band komponiert.
- Panel nur so groß wie nötig: Schlüsselwort-Chips + Flächentext (max. 120 Zeichen, `scripts/cards-review/kurz.json`) + Flavor.
- Vollständige Regeltexte bleiben im Feld `text` (Detailansicht); gekürzte Fälle stehen verlustfrei in `docs/regeln/KARTEN_SONDERFAELLE.md`.

## Dateien
- `face.py` Kompositor, `render.py` Build (inkrementell über Quell-/Text-/Motiv-/Renderer-Hash), `verify.py` Prüfung, `contact.py` Kontaktbögen.
- `graphics-manifest.json` je ID: Flächentext, Keywords, Motivpfad + SHA256, Herkunft, Ausgabe + SHA256.
- `missing-illustrations.json` offene Motive (Nationspool-Karten ohne Illustration) + Fortschritt.
- Motivreihenfolge: `art-v2/<id>.jpg` (neu generiert) → `art-v1/<id>.jpg` (taktische) → geprüfte `DC_TABLE_ART`.

## Build
```sh
npm run build:graphics   # kurz.py -> render.py -> build_image_manifest.js
python3 scripts/graphics/verify.py
python3 scripts/graphics/contact.py --nation steinmark   # Kontaktbogen
npm test
```
