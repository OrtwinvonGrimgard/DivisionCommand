# Porträt-Layer v2 – Spezifikation (t325)

Stand: 2026-11-20. Ergänzt `PORTRAIT_SYSTEM.md` (Ziel/Lore), ersetzt aber nicht den gesperrten Master-Frame in `portraits/frame.json` (1152×1728). v2 ist ein eigenes, vollständig prozedural erzeugtes Layer-Set.

## Format
- Canvas **768×1024**, Frontalansicht, transparenter Grund, WebP mit Alpha (verlustfreie Alpha, Farbe q90). Alle Layer haben die volle Canvasgröße und liegen deckungsgleich übereinander.
- Kopf + Torso bis etwa Brustmitte/Bauch (Bildunterkante y=1024).
- Pfade: `Division_Command/web/assets/portraits/layers/<nation>/{face,hair,uniform,headgear,insignia,orders}/…`, gemeinsame Narben in `layers/_common/scars/`, Index `layers/manifest.json`.
- Erzeugung: `python3 tools/portraits/build.py [--nations a,b] [--only face,hair,uniform,headgear,insignia,orders,scar]`; Kontaktbögen `tools/portraits/sheets.py`; Zusammensetzen `tools/portrait_compose.py`.

## Anker (alle Layer, Canvas-Pixel; Quelle `tools/portraits/pcommon.py`, Kopie in manifest.json)
| Anker | Wert |
|---|---|
| Mittelachse x | 384 |
| Schädeloberkante y | 249 |
| Haaransatz y | 284 |
| Brauenlinie y | 369 |
| **Augenlinie (Pupillen) y** | **394** (Pupillenabstand 124 ±8) |
| Nasenspitze y | 454 |
| Mundlinie y | 494 |
| **Kinn-Unterkante y** | **544** |
| Schädelbreite | 220 (Person ±6 %) |
| Halsansatz / Kragenoberkante | y≈586 (Stehkragen), 566 (hoch) |
| Schulteraußenpunkte | x 84 / 684, y 690 |
| Schulterstück-Mitten | (196,672) und (572,672), Neigung ±19° |
| Kragenspiegel | (322,626) und (446,626) |
| Brust Bildlinks / -rechts | (270,800) / (498,800) – Orden bevorzugt Bildrechts |
| Ärmel (Oberarm) | (118,860) / (650,860) |
| Mützenabzeichen | (384,≈200–300 je Mütze) |

Alle Gesichter teilen Augenlinie und Kinn exakt; nur Schädelbreite, Kiefer, Nase usw. variieren, deshalb passen Haar, Mütze, Narben und Kragen auf jedes Gesicht.

## Layer-Reihenfolge (unten → oben)
`face` (Kopf+Hals, kahl, rasiert, ohne Narben) → `uniform` (Kragen verdeckt Halsansatz) → `hair` → (`beard`, reserviert) → `scars` (Liste!) → `headgear` → `insignia` → `orders`.

## Inhalte je Nation
- **face**: 3 Personen (`m1`, `m2`, `f1`) × 4 Altersstufen (`jung` 17–32, `reif` 32–44, `alt` 44–62, `greis` 62–90). Haut, Brauen, Falten altern mit; Karsk altert nur schwach (Lore: optimiert/jung).
- **hair**: je Person × Alter (Grauanteil, Rückzug des Haaransatzes). Stile: kurz, scheitel, buzz, zurueck, bob.
- **uniform**: 2 Typen × 4 Stufen (0 Kadett/Kompanie, 1 Stab, 2 Generalität, 3 Marschälle): Besätze, Passepoil, Fangschnur kommen mit der Stufe dazu.
- **headgear**: `schirm` (Schirmmütze), `zweit` (je Nation Barett oder Feldmütze), `parade` (hohe Paradeschirmmütze) × 4 Stufen (Eichenlaub, Paspeln, Goldschnur ab Stufe 2/3). Nationssymbol als Abzeichen.
- **insignia**: pro Uniformtyp und Rang (16): Schulterstücke, Kragenspiegel, ggf. Ärmelabzeichen, nach Lore-Platzierung der Nation.
- **orders**: 16 Ränge, nur Brust: Spangen (0→14), hängende Orden (ab Hauptmann), Brust-Stern ab Brigadegeneral, zweiter Stern beim Generalfeldmarschall. Orden werden nie ersetzt, nur ergänzt.
- **Narben** (`_common/scars`, gemeinsam für alle Nationen und Gesichter): `wange` (Bildlinks, Wange), `braue` (Bildrechts, durch Braue/Lid), `kiefer` (Bildrechts, Kiefer/Kinn, Verbrennung). Frei kombinierbar (beliebige Teilmenge), da getrennte Gesichtsregionen, nur Alpha auf der Haut.

## Rangsystem (nationsübergreifend, Symbol = Nationssymbol aus Insignien.md)
| Rang | Brett | Symbole | Extras |
|---|---|---|---|
| Fähnrich / Oberfähnrich | Streifen | 1 / 2 klein | |
| Leutnant / Oberleutnant / Hauptmann | schlicht | 1 / 2 / 3 | |
| Stabshauptmann | schlicht | 3 | Balken |
| Major / Oberstleutnant / Oberst | Stab (Geflecht) | 1 / 2 / 3 groß | |
| Brigadegeneral … General | Generalsbrett (Stickerei, Gold) | 1 / 2 / 3 / 4 | Ring |
| Generaloberst | Generalsbrett | 4 | Ring, Lorbeer |
| Feldmarschall | Marschallsbrett (Fransen) | 1 xl | gekreuzte Stäbe, Ring |
| Generalfeldmarschall | Marschallsbrett | 1 xl | Stäbe, Lorbeer, Ring, zweiter Brust-Stern |
Keine Eisernen Kreuze, keine Kreuze. Metall: Silber bis Oberst, Gold ab Generalität (Nationen ohne Gold: Orthea, Dargan, Karsk – hell/poliertes Silber).

## Alter und Imposanz
Altersstufe nach Lore-Altersbändern (`Raenge.md`): Fhr–Olt jung, Hptm–Maj reif, Obstlt–Brig alt, Generalität greis. Imposanz über Kleidergruppe (Uniformstufe, Mütze, Brettbreite, Orden).

## manifest.json
`anchors`, `z_order`, `age_stages`, `ranks[]` (id, Alter, Gruppe, Tier), `persons`, `scars` (`mode: "multi"`, `layers{name→file}`), `nations{…}` mit Dateimustern (`{n}/face/{person}_{age}.webp` …) und Uniformtypen.

## Compositor
`compose(layer_dir, nation, rank, person, uniform, headgear, scars=[…])`; `scars` ist eine Liste oder kommaseparierter String. CLI: `python3 tools/portrait_compose.py --nation rothain --rank oberst --person m1 --uniform rock --headgear schirm --scars wange,braue --out p.png`.

## Bekannte Grenzen
- Stil: prozedural gerendert (weiche Illustration, keine Ölmalerei) – bewusst anders als die 72 Ölgemälde-Proben.
- Kein Bart-Layer (Slot `beard` reserviert), keine nationsspezifischen Details (Karsk-Grafts/Implantate am Kopf, Ossaria-Maske) – als eigene Detail-Layer vorgesehen.
- Nur Frontalansicht; Haar unter Mützen wird nicht ausgeblendet (Haar liegt unter der Mütze, ragt seitlich heraus).

## Anhang: Ölstil-Probe Rothain (`layers_oel/`)

Zweiter Layersatz **nur für Rothain** im Stil der bestehenden Ölgemälde (Probe; Phase 2).
Verzeichnis: `web/assets/portraits/layers_oel/` (eigenes `manifest.json`, `style: "oil"`).

- **face/** `{m1,m2,f1}_{jung,reif,alt,greis}.webp` – KI-Ölköpfe (GenerateImage, Altersstufen aus dem jungen Master abgeleitet),
  per mediapipe-Landmarken (Iris/Kinn) affin auf das Raster (Augenlinie y394, Kinn y544, Mitte x384) ausgerichtet und freigestellt.
  Haar ist eingebacken (kein hair/beard-Layer). Hals ist bei y≈566 beschnitten und in ein dunkles Unterhemd verlängert.
- **uniform_back/** `{rock,gala}.webp` – liegt UNTER dem Gesicht (Unterhemd im V-Ausschnitt bzw. Kragen-Innenwand der Gala).
- **uniform/** `{rock,gala}.webp` – leerer Ölrock (kein Rang, keine Epauletten, keine Orden), ohne Tier-Varianten.
- **headgear/** `{schirm,zweit,parade}.webp` – Ölmützen (vertikal leicht gestaucht, Visierunterkante y≈352/338).
- **insignia/{uniform}/{rang}.webp**, **orders/{uniform}/{rang}.webp** – prozedural wie v2, auf Ölrock-Anker neu platziert (`oel_insignia.OIL_ANCHORS`) und mit Malfilter (`oelkit.paint`) überarbeitet.
- **_common/scars/** – wange/braue/kiefer (frei kombinierbar), angepasst + Malfilter.
- Z-Reihenfolge: `uniform_back, face, uniform, hair, beard, scars, headgear, insignia, orders`.

Build: `python tools/portraits/oel/oel_build.py all` (venv mit mediapipe/opencv; Rohbilder in `tools/portraits/oel/raw_rothain/`,
Landmarker-Modell `face_landmarker.task` nach `/workspace/t325-portraits/oel/models/`). Bögen: `tools/portraits/oel/sheets_oel.py ranks|variants`.
`tools/portrait_compose.py` kennt jetzt optional `uniform_back` und fehlende `hair`-Dateien.
