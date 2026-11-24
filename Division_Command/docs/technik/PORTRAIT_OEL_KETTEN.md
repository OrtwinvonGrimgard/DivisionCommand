# Offiziersporträts – Ölgemälde-Ketten (t325, ergänzt t336, t337, t343, t345)

Stand: 24.11.2026. Ergänzt [`PORTRAIT_SYSTEM.md`](PORTRAIT_SYSTEM.md) (Ziel und Lore). Der ältere Layer-Ansatz [`PORTRAIT_LAYERS_V2.md`](PORTRAIT_LAYERS_V2.md) ist überholt; seine Asset-Ordner sind entfernt.

## Ansatz

Jede Kette beginnt mit einem vollständigen Ölgemälde des Fähnrichs (gleiche Person, gleiche Pose, gleiches Licht). Jeder höhere Rang ist eine Bearbeitung des vorherigen Bildes: die Person altert, Abzeichen und Orden wachsen mit. Die Gesichter bleiben über alle 16 Ränge erkennbar. Narben und Kopfbedeckungen liegen als eigene transparente Layer darüber. Narben sind frei kombinierbar. Von den Mützen zeigt das Spiel höchstens eine (barhaupt, Schirmmütze oder nationale Zweitmütze).

Im Spiel bevorzugt `web/js/ui/portraits.js` die Ölgemälde-Ketten bisher nur teilweise (Rothain Dienstrock m1/m2, Karsk Panzer m1/m2, Ossaria Platte m1/m2). Averon, Zweituniformen, f1/f2 und der Karteneditor sind noch nicht angebunden. Für die übrigen Gesichter gelten weiter die älteren Einzelporträts unter `web/assets/portraits/<Nation>/`.

## Pfade

```
Division_Command/web/assets/portraits/oel_ketten/
  manifest.json                          # Rothain (Erstbestand, Wurzel)
  <nation>/manifest.json                 # weitere Nationen (z. B. karsk/)
  <nation>/<uniform>/<person>/
    01_faehnrich.webp … 16_generalfeldmarschall.webp   # Base, barhaupt, opak
    scars/
      wange.webp
      braue.webp
      kiefer.webp
    muetzen/
      schirmmuetze/01_faehnrich.webp … 16_generalfeldmarschall.webp
      <zweitmuetze>/01_faehnrich.webp …                  # feldmuetze oder barett
```

- Canvas **864 × 1152** (3:4), WebP q90. Base-Gemälde opak mit dunklem Leinwandgrund. Narben- und Mützen-Layer RGBA, dieselbe Canvasgröße, pixelgenau über dem Base.
- Personen: `m1`, `m2`, `f1`, `f2` (zwei Männer, zwei Frauen).
- Narben: drei Layer je Person und Uniform, frei kombinierbar (keine, einzeln, paarweise oder alle drei).
- Mützen: je Rang ein Layer für die Schirmmütze und einer für die nationale Zweitmütze. Dateinamen wie das Base-Bild. Z-Reihenfolge: Gemälde, Narben, höchstens eine Mütze.
- Dateinamen: zweistellige Rangnummer plus Rang-ID, zum Beispiel `09_oberst.webp`.

## Ränge (16, nationsübergreifend)

Fähnrich, Oberfähnrich, Leutnant, Oberleutnant, Hauptmann, Stabshauptmann, Major, Oberstleutnant, Oberst, Brigadegeneral, Generalmajor, Generalleutnant, General, Generaloberst, Feldmarschall, Generalfeldmarschall.

Abzeichen folgen der jeweiligen `docs/nationen/<Nation>/Raenge.md` und `Insignien.md`. Keine Eisernen Kreuze, keine Kreuzorden als Standard.

## Kopfbedeckung (t343)

Base-Porträts bleiben **barhaupt** (Gesicht + Uniform). Kopfbedeckungen sind **eigene RGBA-Layer**, nichts, das fest ins Gemälde gemalt wird. Es gibt je Rang zwei dienstliche Mützen laut [`PORTRAIT_SYSTEM.md`](PORTRAIT_SYSTEM.md): die Schirmmütze (alle Nationen) und genau eine nationale Zweitmütze (Barett oder Feldmütze; bei Sahr die Feldmütze). Mit steigendem Rang wird die Mütze prächtiger und bleibt lore-gerecht (`Insignien.md`, `Raenge.md`). Ab R02 folgt die Form der vorigen Stufe.

Jeder Layer wird auf seinem Base-Porträt geprüft (Kopfgröße, Haltung, Haare, Ohren). Sitzt er nicht, wird die Mütze für genau dieses Base neu gezeichnet. Ein Per-Porträt-Layer ist dafür der Normalfall: der Exportpfad ist immer `<uniform>/<person>/muetzen/<typ>/<NN>_<rang>.webp`.

Der Bildausschnitt bleibt biometrisch mittig, Kopf bis Brustmitte. Im Base bleibt oben genug Luft für die Schirmmütze, damit der Layer nicht am oberen Rand abgeschnitten wird.

Rothain, Karsk, Averon und Ossaria bleiben als barhäuptige Basen nutzbar; ihre Mützen-Layer kommen später und werden hier nicht nachgeholt. Eine kurze t342-Serie mit fest ins Bild gemalten Sahr-Mützen wurde verworfen und nicht übernommen.

## Bestand

| Nation | Uniformen | Ketten | Status |
|---|---|---|---|
| Rothain | `dienstrock`, `gala` | 4 Personen × 2 Uniformen = 8 | fertig (inkl. Nachbesserung Alterung/Orden) |
| Karsk | `panzer`, `tech` | 8 | fertig im aktuellen Bestand (optisch jung + wachsende Implantate). **t344, nach Sahr, nur mit Freigabe:** Ketten neu generieren. Gesicht altert sichtbar; die synthetischen Verbesserungen sind unausgereift, das Gewebe wird mit der Zeit angegriffen und muss zunehmend ersetzt werden. Mehr sichtbare Prothesen, Narben und ersetzte Hautpartien mit dem Rang; bestehendes bleibt, das Ergebnis wirkt zunehmend künstlich und beschädigt, nicht perfekt. Vorlagen: `v2_karsk/AGING_PROMPTS.md`. |
| Averon | `feld`, `dienst` | 8 | fertig (t336). Bindung Zeit: Gesichter altern sichtbar mit dem Rang; GFM alt, aber wachsam. Kernsymbol offenes Auge (keine Sterne); ab General Kommando-Augenplakette, beim GFM vollständig sichtbares überwachendes Auge auf der Uniform. |
| Ossaria | `platte`, `klage` | 8 | fertig (t337), barhaupt. Bindung Tote: Gesichter altern sichtbar mit dem Rang; GFM alt und von den Toten gezeichnet, nicht gebrechlich. Kernsymbol Knochenkreis / stilisierter Totenschädel (keine christlichen Kreuze); ab General große Knochenkreis-/Schädel-Gedenkplakette. |
| Sahr | `wickel`, `offen` | 8 | fertig (t345), barhaupt mit Mützen-Layern (Schirmmütze + Feldmütze, Fit-Check). Bindung Fluss: Gesichter altern sichtbar mit dem Rang; GFM alt, Ausdruck fließend, nicht gebrechlich. Kernsymbol fließende Welle; Perlen als Städtezeichen; ab General große Wellen-Kommandoplakette, beim GFM Flusssymbol vollständig sichtbar. |
| 11 weitere | — | — | offen. Der Baukasten `tools/portraits/oel/chain2_build.py` ist nationsfähig (Rothain, Karsk, Averon, Ossaria, Sahr). |

Zusammen: 40 fertige Base-Ketten, 640 Rangbilder, 120 Narben-Layer, 5 Manifeste, plus 256 Mützen-Layer bei Sahr. 11 von 16 Nationen fehlen noch. Sollstand bleibt 4 Personen × 2 Uniformen × 16 Nationen = 128 Base-Ketten, plus Narben und zwei Mützen-Layer je Rang. Rothain, Karsk, Averon und Ossaria sind weiterhin barhäuptige Basen ohne Mützen-Layer; die Layer für Rothain, Averon und Ossaria sowie die Neugenerierung von Karsk nach t344 folgen.

## Manifest

Jedes Manifest nennt `style: "oil-chain"`, Canvas, Rangliste mit ungefährem Alter, Uniformen, Personen, Dateipfade, Gesichtsanker (`eye_mid`, `chin_y`) und die drei Narbenpfade samt optionalem Pixeloffset. Ab Sahr zusätzlich `headgear: "layers"`, `headgear_types` (z. B. `schirmmuetze`, `feldmuetze`) und je Person die Mützenpfade unter `muetzen`. Ältere Manifeste behalten `headgear: "none"`. Rothain steht in `oel_ketten/manifest.json`, Karsk in `oel_ketten/karsk/manifest.json`, Averon in `oel_ketten/averon/manifest.json`, Ossaria in `oel_ketten/ossaria/manifest.json`, Sahr in `oel_ketten/sahr/manifest.json`.

## Werkzeuge

`tools/portraits/oel/chain2_build.py` setzt eine Kette zusammen und schreibt sie ins Nationsverzeichnis. Weitere Skripte unter `tools/portraits/` und `tools/portraits/oel/` gehören zur verworfenen Layer-Werkstatt und werden für den Bestand nicht mehr verwendet.
