# Kartenvorderseiten alpha40 (Old-Alpha)

Freigegebenes Layout für alle Spielkarten-Vorderseiten.

## Geometrie (Arbeitsformat 1536×2136 → Ausgabe 1024×1428)

| Element | Wert |
|---|---|
| Motivfenster | **854 px** Höhe = **40 %** der Kartenhöhe (y 56–910); Original-Alpha 816 px ≈ 38 % |
| Zuschnitt | Cover-Crop, **nie** gestreckt/gequetscht |
| Namensbanner | direkt unter dem Motiv (ny = 924), Samt in Waffenfarbe |
| Textpanel | bis y ≈ 1890; gewonnener Platz gegenüber gfx3.1 (42 %) geht an den Text |
| Doktrinen | kein Motiv; Marmor-Kopf mit Sternwappen, Leder-/Pergamentkörper, Leder-Fähigkeitstafeln (Bollwerk-Stil) |
| Elite | Textpanel rechts um ~270 px eingezogen, damit der Orden den Regeltext nicht überdeckt |

## Schrift

- Grundgröße Körper **60 px**, Überschrift **62 px** (Arbeitsformat)
- Auto-Stufen bis 36 px; Flavor entfällt bevor die Regelschrift unter 48 px sinkt
- Flächentext aus `scripts/cards-review/kurz.json` (≤ 120 Zeichen)

## Build

```sh
npm run build:graphics          # kurz.py → scripts/graphics/render.py (alpha40) → image-manifest
python3 scripts/graphics/verify.py
```

Quellen: `KartenEditor/tools/render.py`, `render_core.py`, `scripts/graphics/alpha40.py`.
Service-Worker-Cache: `divcmd-alpha40c`.

## alpha40c
- Doktrin-/Fähigkeitstext: Plaque-Splitter splittet nicht mehr in Klammern oder nach Abkürzungen (mind., min., max., ggf., …); Semikolon nur vor Großbuchstaben.


## alpha40b
- Elite: Textpanel volle Breite, Orden darüber; nur Textumbruch rechts eingezogen.
- Tag-Leiste immer vorhanden (auch ohne Chips).
- Elite-Orden: Ringinnenräume und Fläche zwischen Spange und Band transparent.

## alpha40d
- Tag-Leiste: kein schwarzer Balken/Goldrand hinter den Chips; Zone bleibt reserviert (Tagless + Elite-Spange). Cache `divcmd-alpha40d`.
