# Offiziersporträts – Ölgemälde-Ketten (t325, ergänzt t336)

Stand: 21.11.2026. Ergänzt [`PORTRAIT_SYSTEM.md`](PORTRAIT_SYSTEM.md) (Ziel und Lore). Der ältere Layer-Ansatz [`PORTRAIT_LAYERS_V2.md`](PORTRAIT_LAYERS_V2.md) ist überholt; seine Asset-Ordner sind entfernt.

## Ansatz

Jede Kette beginnt mit einem vollständigen Ölgemälde des Fähnrichs (gleiche Person, gleiche Pose, gleiches Licht). Jeder höhere Rang ist eine Bearbeitung des vorherigen Bildes: die Person altert, Abzeichen und Orden wachsen mit. Die Gesichter bleiben über alle 16 Ränge erkennbar. Narben liegen als eigene transparente Layer darüber und sind frei kombinierbar.

Das Spiel (`web/js/ui/portraits.js`) und der Karteneditor nutzen diese Ketten **noch nicht**. Im Spiel gelten weiter die älteren Einzelporträts unter `web/assets/portraits/<Nation>/`.

## Pfade

```
Division_Command/web/assets/portraits/oel_ketten/
  manifest.json                          # Rothain (Erstbestand, Wurzel)
  <nation>/manifest.json                 # weitere Nationen (z. B. karsk/)
  <nation>/<uniform>/<person>/
    01_faehnrich.webp … 16_generalfeldmarschall.webp
    scars/
      wange.webp
      braue.webp
      kiefer.webp
```

- Canvas **864 × 1152** (3:4), WebP q90, opakes Gemälde, dunkler Leinwandgrund.
- Personen: `m1`, `m2`, `f1`, `f2` (zwei Männer, zwei Frauen).
- Narben: drei Layer je Person und Uniform, dieselbe Canvasgröße, frei kombinierbar (keine, einzeln, paarweise oder alle drei). Z-Reihenfolge: Gemälde, dann Narben.
- Dateinamen: zweistellige Rangnummer plus Rang-ID, zum Beispiel `09_oberst.webp`.

## Ränge (16, nationsübergreifend)

Fähnrich, Oberfähnrich, Leutnant, Oberleutnant, Hauptmann, Stabshauptmann, Major, Oberstleutnant, Oberst, Brigadegeneral, Generalmajor, Generalleutnant, General, Generaloberst, Feldmarschall, Generalfeldmarschall.

Abzeichen folgen der jeweiligen `docs/nationen/<Nation>/Raenge.md` und `Insignien.md`. Keine Eisernen Kreuze, keine Kreuzorden als Standard.

## Bestand

| Nation | Uniformen | Ketten | Status |
|---|---|---|---|
| Rothain | `dienstrock`, `gala` | 4 Personen × 2 Uniformen = 8 | fertig (inkl. Nachbesserung Alterung/Orden) |
| Karsk | `panzer`, `tech` | 8 | fertig; Offiziere bleiben optisch jung, Rang zeigt sich an Implantaten (lore-treu). Sichtbares Altern ist eine offene Frage. |
| Averon | `feld`, `dienst` | 8 | fertig (t336). Bindung Zeit: Gesichter altern sichtbar mit dem Rang; GFM alt, aber wachsam. Kernsymbol offenes Auge (keine Sterne); ab General Kommando-Augenplakette, beim GFM vollständig sichtbares überwachendes Auge auf der Uniform. |
| 13 weitere | — | — | offen. Der Baukasten `tools/portraits/oel/chain2_build.py` ist nationsfähig (bisher Rothain, Karsk, Averon). |

Zusammen: 24 fertige Ketten, 384 Rangbilder, 72 Narben-Layer, 3 Manifeste (459 Dateien). 13 von 16 Nationen fehlen noch. Sollstand bleibt 4 Personen × 2 Uniformen × 16 Nationen = 128 Ketten.

## Manifest

Jedes Manifest nennt `style: "oil-chain"`, Canvas, Rangliste mit ungefährem Alter, Uniformen, Personen, Dateipfade, Gesichtsanker (`eye_mid`, `chin_y`) und die drei Narbenpfade samt optionalem Pixeloffset. Rothain steht in `oel_ketten/manifest.json`, Karsk in `oel_ketten/karsk/manifest.json`, Averon in `oel_ketten/averon/manifest.json`.

## Werkzeuge

`tools/portraits/oel/chain2_build.py` setzt eine Kette zusammen und schreibt sie ins Nationsverzeichnis. Weitere Skripte unter `tools/portraits/` und `tools/portraits/oel/` gehören zur verworfenen Layer-Werkstatt und werden für den Bestand nicht mehr verwendet.
