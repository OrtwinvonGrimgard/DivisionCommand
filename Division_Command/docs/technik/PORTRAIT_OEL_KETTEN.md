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

Karsk ist seit 0.655 (t344/t345) neu generiert (sichtbares Altern, unausgereifte Synthetik) und hat eigene Mützen-Layer (Schirmmütze + Barett, Fit-Check), analog zu Sahr, Rothain, Averon und Ossaria. Ossaria hat seit 0.653 eigene Mützen-Layer (Schirmmütze + Feldmütze, Fit-Check). Eine kurze t342-Serie mit fest ins Bild gemalten Sahr-Mützen wurde verworfen und nicht übernommen.

## Bestand

| Nation | Uniformen | Ketten | Status |
|---|---|---|---|
| Rothain | `dienstrock`, `gala` | 4 Personen × 2 Uniformen = 8 | fertig (inkl. Nachbesserung Alterung/Orden); seit 0.649 (t345) barhaupt mit Mützen-Layern (Schirmmütze + Feldmütze, Fit-Check). Bindung Erbe: stilisierte heraldische Krone im gebrochenen bzw. offenen Eidring, karmesinrote Mützenkrone, fast schwarzes Band, silberne Paspel (ab General Gold); beim GFM geschlossener, klar lesbarer Ring. |
| Karsk | `panzer`, `tech` | 8 | fertig (t325), seit 0.655 (t344/t345) neu generiert und barhaupt mit Mützen-Layern (Schirmmütze + Barett, Fit-Check). Bindung Körper: Gesichter altern sichtbar mit dem Rang; unausgereifte Synthetik, Gewebe angegriffen und zunehmend durch Prothesen und Grafts ersetzt; GFM alt, künstlich und beschädigt, nicht perfekt. Kernsymbol Sechseck mit eingebettetem Auge nur am Band (Schirmmütze) bzw. über dem linken Träger (Barett); Krone und Barettspiegel kahl. Palette Anthrazit / Silber / dunkles Metall, dunkelroter Akzent. Tech ohne Leder-Geschirr. Ab General klareres, größeres Band-Hexauge; ab R13 Gorget und ab R14 Schärpe bleiben an der Uniform, nicht auf der Krone. Beim GFM vollständig lesbares Band-Hexauge; das Systemauge bleibt Gesichtsimplantat. |
| Averon | `feld`, `dienst` | 8 | fertig (t336); seit 0.651 (t345) barhaupt mit Mützen-Layern (Schirmmütze + Feldmütze, Fit-Check). Bindung Zeit: Gesichter altern sichtbar mit dem Rang; GFM alt, aber wachsam. Kernsymbol offenes Auge plus Datenstreifen (keine Sterne); olivgrüne Mützen, sandfarbene Paspel, bleiches Metall / Datenlinie am Abzeichen; ab General Kommando-Augenplakette und leuchtende blass-cyan/weiße Datenlinien-Akzente, beim GFM vollständig sichtbares überwachendes Auge auf dem einen Band-Abzeichen (Spiegel kahl) und auf der Uniform. |
| Ossaria | `platte`, `klage` | 8 | fertig (t337); seit 0.653 (t345) barhaupt mit Mützen-Layern (Schirmmütze + Feldmütze, Fit-Check). Bindung Tote: Gesichter altern sichtbar mit dem Rang; GFM alt und von den Toten gezeichnet, nicht gebrechlich. Kernsymbol Knochenkreis / stilisierter Totenschädel (keine christlichen Kreuze); schwarze / holzkohlefarbene Mützen, knochen-elfenbeinfarbene Paspel, bleiches Bein oder mattes Silber am Abzeichen; Klage ohne Plattenträger. Ab General klarerer Schädel im einen Band-Abzeichen (Krone kahl); ab R13 bleibt die große Brust-Gedenkplakette auf der Jacke. Beim GFM vollständig sichtbares Erinnerungs-Schädelmotiv auf dem einen Band-Abzeichen (Spiegel kahl). |
| Sahr | `wickel`, `offen` | 8 | fertig (t345), barhaupt mit Mützen-Layern (Schirmmütze + Feldmütze, Fit-Check). Bindung Fluss: Gesichter altern sichtbar mit dem Rang; GFM alt, Ausdruck fließend, nicht gebrechlich. Kernsymbol fließende Welle; Perlen als Städtezeichen; ab General große Wellen-Kommandoplakette, beim GFM Flusssymbol vollständig sichtbar. |
| 11 weitere | — | — | offen. Der Baukasten `tools/portraits/oel/chain2_build.py` ist nationsfähig (Rothain, Karsk, Averon, Ossaria, Sahr). |

Zusammen: 40 fertige Base-Ketten, 640 Rangbilder, 120 Narben-Layer, 5 Manifeste, plus 1280 Mützen-Layer (Sahr, Rothain, Averon, Ossaria und Karsk je 256). 11 von 16 Nationen fehlen noch. Seit 0.657 (t349) sind alle fertigen Ketten im Spiel und in der Offiziersakte verknüpft. Sollstand bleibt 4 Personen × 2 Uniformen × 16 Nationen = 128 Base-Ketten, plus Narben und zwei Mützen-Layer je Rang. Portraitarbeit nach Karsk auf Nutzerwunsch pausiert (t347u).

## Einbindung im Spiel (seit 0.657, t349)

- `scripts/portraits/build_portrait_manifest.js` liest alle Nationsmanifeste (`oel_ketten/manifest.json` für Rothain, sonst `oel_ketten/<nation>/manifest.json`), prüft Dateikonvention (`<nation>/<uniform>/<person>/NN_<rang>.webp`, `muetzen/<typ>/…`, `scars/<narbe>.webp`) und Existenz und schreibt `web/js/data/portrait-manifest.js` (alle 16 Nationen + Altbestand, je Nation Uniformen, Personen, Mützentypen, Narben, Altporträt-Rückfall). `--check` meldet ein veraltetes Manifest (läuft in `tests/test_portraits_t349.js`).
- `web/js/ui/portraits.js` (`window.DCPortrait`): Kit-ID `oel-<nation>-<uniform>-<person>-<mütze|none>-<narbe+narbe|none>`; `layers()` liefert Bild → Narben → Mütze, `src()`/`bindImg()`/`imgAttrs()` zeigen sofort das Basisbild und tragen das Canvas-Komposit über `data-dcp-key` nach. Alte IDs `fNN-kampf-none` werden migriert.
- Menü: `nations()`, `personsFor()`, `uniformsForKit()`, `hatsForKit()`, `scarsForKit()` liefern Optionen mit `available`/„folgt“.
- **Neue Nation einbinden:** Export mit `chain2_build.py export` nach `oel_ketten/<nation>/`, dann `node scripts/portraits/build_portrait_manifest.js`, `npm test`. Anzeigenamen neuer Uniformen in `UNIFORM_LABEL` des Skripts ergänzen.

## Manifest

Jedes Manifest nennt `style: "oil-chain"`, Canvas, Rangliste mit ungefährem Alter, Uniformen, Personen, Dateipfade, Gesichtsanker (`eye_mid`, `chin_y`) und die drei Narbenpfade samt optionalem Pixeloffset. Ab Sahr, seit 0.649 auch bei Rothain, seit 0.651 auch bei Averon, seit 0.653 auch bei Ossaria und seit 0.655 auch bei Karsk, zusätzlich `headgear: "layers"`, `headgear_types` (z. B. `schirmmuetze`, `feldmuetze` oder `barett`) und je Person die Mützenpfade unter `muetzen`. Rothain steht in `oel_ketten/manifest.json`, Karsk in `oel_ketten/karsk/manifest.json`, Averon in `oel_ketten/averon/manifest.json`, Ossaria in `oel_ketten/ossaria/manifest.json`, Sahr in `oel_ketten/sahr/manifest.json`.

## Werkzeuge

`tools/portraits/oel/chain2_build.py` setzt eine Kette zusammen und schreibt sie ins Nationsverzeichnis. Weitere Skripte unter `tools/portraits/` und `tools/portraits/oel/` gehören zur verworfenen Layer-Werkstatt und werden für den Bestand nicht mehr verwendet.
