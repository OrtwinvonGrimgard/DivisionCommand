# Division Command — Portrait System

## Ziel

Das Portraitsystem ist modular und datengetrieben. Die 64 Basisportraits (16 Nationen × 4 Ausgangspersonen) sind nicht die eigentliche Datenstruktur, sondern Referenzen auf wiederverwendbare Parameter.

Die Darstellung erfolgt als leuchtendes, realistisches Ölgemälde mit sichtbarer Pinselstruktur, kräftigen Farben und militärischem Charakter.

## Einheitlicher Portrait-Rahmen

**Der Bildausschnitt ist eine harte technische Vorgabe und darf zwischen Personen, Altersstufen, Dienstgraden oder Varianten nicht wechseln.**

### Master Frame

Alle Portraits werden in demselben definierten Ausschnitt erzeugt und gerendert:

- **Hochformat**
- **Kopf vollständig sichtbar**
- **beide Schultern vollständig sichtbar**
- **gesamter sichtbarer Oberkörper/Torso**
- **beide Arme im definierten Bildbereich sichtbar**
- **Bildabschluss ungefähr auf Höhe des oberen Bauch-/Unterbrustbereichs**
- **keine Beine**
- **keine wechselnde Kameradistanz**
- **keine unterschiedliche Perspektive oder Brennweite zwischen Varianten**
- **Kopfposition, Augenhöhe und vertikale Position des Körpers bleiben konstant**
- **Schulterbreite und relativer Körpermaßstab bleiben konstant**
- **Uniformkragen, Schulterpartien und relevante Rangmerkmale müssen innerhalb des Rahmens vollständig erkennbar sein**

Der untere Bildrand definiert den festen Portrait-Crop. Varianten dürfen nicht durch Zoom, wechselnde Körperhaltung oder abweichende Kameraposition aus diesem Rahmen herausfallen.

### Technischer Referenzrahmen

```text
┌─────────────────────────┐
│                         │
│          KOPF           │
│                         │
│     SCHULTERN           │
│                         │
│        TORSO            │
│                         │
│      ARM     ARM        │
│                         │
├─────────────────────────┤
│      FESTER CROP        │
└─────────────────────────┘
```

Der Master Frame wird als Bestandteil des Render-Profils gespeichert. Er ist nicht lediglich eine Empfehlung für den Bildgenerator.

### Asset-Erzeugung

Für die 64 Ausgangspersonen gilt:

1. Zuerst wird eine **Master-Referenz** innerhalb des festen Rahmens erzeugt.
2. Aus dieser Referenz werden Gesichts-, Haar-, Bart-, Alters- und Uniformvarianten abgeleitet.
3. Spätere Varianten werden gegen denselben Frame geprüft.
4. Eine Variante gilt als ungültig, wenn sich Kameradistanz, Crop, Körpermaßstab oder Position wesentlich verändert.
5. Der gleiche Rahmen wird auch für spätere NPCs und Erweiterungen verwendet, sofern sie als Portraitkarten dargestellt werden.

Dadurch können unterschiedliche Personen und Zustände später technisch übereinandergelegt bzw. als modulare Ebenen kombiniert werden.

## Ebenen

1. **Phänotyp-Profil** — anatomische und sichtbare Grundmerkmale.
2. **Person** — konkrete individuelle Ausprägung eines Phänotyps.
3. **Alter/Dienstgrad** — Fähnrich bis Generalfeldmarschall.
4. **Haare** — unabhängig austauschbare Frisur.
5. **Bart** — drei unabhängig steuerbare Regionen.
6. **Uniform** — nationale Grunduniform und dienstgradabhängige Variante.
7. **Portrait Frame** — fester Ausschnitt und feste Kamera.
8. **Rendering** — einheitlicher Ölmalerei-Stil.

## Phänotyp-Profil

Phänotypen werden als parametrische Profile gespeichert, nicht als starre ethnische Schablonen und nicht als reale biometrische Identifikationsdaten.

### Gesichtsparameter

- Gesichtsbreite
- Gesichtslänge
- Stirnhöhe
- Kieferbreite
- Kieferwinkel
- Kinnform
- Wangenknochen
- Augenform
- Augengröße
- Augenabstand
- Augenfarbe
- Nasenlänge
- Nasenbreite
- Nasenrücken
- Nasenspitze
- Mundbreite
- Lippenform
- Ohrenform
- Haaransatz

### Pigmentierung und Haare

- Hautgrundton
- Hautunterton
- natürliche Pigmentvariation
- Haarfarbe
- Haarstruktur
- natürliche Haardichte
- natürliche Bartdichte
- natürliche Bartfarbe

Parameter sind generative Werte und keine medizinischen oder biometrischen Identifikatoren.

## Nationale Population Profiles

Eine Nation wird nicht auf einen einzigen Phänotyp reduziert. Jede Nation erhält eine Bibliothek zulässiger Phänotyp-Profile und Gewichtungen.

Beispiel: `ROTHAIN → PHENOTYPE_017, PHENOTYPE_024, PHENOTYPE_031, PHENOTYPE_044 ...`

Dadurch bleiben nationale Herkunft und visuelle Identität erkennbar, während innerhalb einer Nation deutliche individuelle Vielfalt entsteht.

## Vier Ausgangspersonen je Nation

Jede Nation erhält vier eigenständige Basisfiguren: **zwei Männer und zwei Frauen**. Sie sind nicht dieselbe Person in vier Altersstufen.

Jede dieser vier Personen erhält eine eigene Entwicklung über die vorgesehenen Alters-/Dienstgradstufen:

- Fähnrich
- mittlere Offiziersstufe
- General
- Generalfeldmarschall

Die jeweilige Fähnrichuniform dient als nationale Designgrundlage. Die höheren Dienstgrade bauen darauf auf, erhalten aber jeweils eigene Uniformvarianten und Rangmerkmale.

## Individuelle Gesichtsvariation

Aus einem Phänotyp-Profil können mehrere Personen erzeugt werden. Eine Person erhält einen eigenen Variationsseed bzw. eine gespeicherte Variation.

Beispiel: `PHENOTYPE_017 + VARIATION_12 → PERSON_00482`

Dadurch können neue Gesichter erzeugt werden, ohne die vorhandenen Charaktere zu kopieren.

## Alterung

Das Alterungsmodell verändert unter anderem:

- Hauttextur
- Falten
- Augenpartie
- Haarfarbe
- Haaransatz
- Bartfarbe
- Gesichtsfülle

Die Altersstufe verändert nicht die nationale Grundidentität.

## Haare

Haare werden als separate Ebene behandelt.

Mögliche Parameter:

- Haaransatz
- Haarfarbe
- Haardichte
- Länge
- Struktur
- Frisur
- Seiten-/Nackenlänge
- optionale Bedeckung

Die neutrale Kopf-/Hautbasis ermöglicht das Auflegen unterschiedlicher Frisuren, ohne dass für jede Frisur ein neues Basisgesicht erforderlich ist.

## Bartsystem

Der Bart besteht aus drei vollständig unabhängigen Regionen:

### Schnurrbart

7 Wachstums-/Längenstufen: `0–6`

### Wangen

7 Wachstums-/Längenstufen: `0–6`

### Kinn/Kiefer

7 Wachstums-/Längenstufen: `0–6`

Stufe 0 bedeutet vollständig rasiert.

Die drei Regionen dürfen unabhängig voneinander verändert werden. Dadurch sind beispielsweise möglich:

- nur Schnurrbart
- nur Kinnbart
- Schnurrbart + Kinnbart
- Vollbart
- rasierte Wangen bei langem Kinnbart
- dichter Wangenbart bei kurzem Schnurrbart
- unterschiedliche Längen in allen drei Regionen

### Wachstum und Rasur

Intern können zwei Zustände getrennt gespeichert werden:

- **Wachstumspotential/-zustand**
- **sichtbare getrimmte Länge**

Beispiel: `Schnurrbart: Wachstum 6 → sichtbar 3`; `Wangen: Wachstum 6 → sichtbar 0`; `Kinn: Wachstum 6 → sichtbar 5`

Dadurch kann eine Person jederzeit rasiert oder getrimmt werden, ohne ihr zugrunde liegendes Bartwachstum zu verlieren.

## Uniformsystem

Die Uniform ist modular:

- nationale Grunduniform
- Stoff und Schnitt
- Kragen
- nationale Insignien
- Rangabzeichen
- Dienstgrad
- individuelle Ausrüstung

Die Fähnrichuniform definiert die visuelle Grundsprache der Nation. Die drei höheren Dienstgrade sind eigenständige Varianten auf dieser Grundlage.

## Rendering / Ölgemälde

Alle Portraits verwenden eine gemeinsame künstlerische Basis:

- realistisches klassisches Ölgemälde
- leuchtende, satte Farben
- sichtbare Pinselstruktur
- hochwertige Gesichtsanatomie
- dramatisches, gerichtetes Licht
- warme und differenzierte Hauttöne
- tiefe, aber detailreiche Schatten
- realistische Materialien
- detaillierte Augen
- historisch anmutende offizielle Militärportraits
- ruhiger Hintergrund
- Gesicht und Uniform als Hauptmotiv
- **identischer Portrait-Crop und identische Kamerakomposition**

Der Painting Style ist unabhängig von Nation und Person und wird als eigenes Style-Profil gespeichert.

## Datenmodell

Konzeptionell:

`NATION → POPULATION_PROFILE → PHENOTYPE → PERSON → APPEARANCE_STATE → PORTRAIT_FRAME → RENDER`

Ein Appearance State kann enthalten:

- `person_id`
- `age_stage`
- `hair_style`
- `hair_color`
- `mustache_stage`
- `cheek_stage`
- `chin_stage`
- `trim_state`
- `uniform_variant`
- `portrait_frame`
- `camera_profile`
- `render_style`
- `variation_seed`

## Qualitätskontrolle

Vor der Aufnahme eines Portraits in den finalen Asset-Pool werden mindestens folgende Punkte geprüft:

1. Kopf vollständig im Rahmen.
2. Beide Schultern sichtbar.
3. Torso innerhalb des definierten Ausschnitts.
4. Beide Arme innerhalb des vorgesehenen Bildbereichs.
5. Unterer Bildabschluss entspricht dem Master Frame.
6. Gleiche Kameradistanz und Perspektive.
7. Gleiche vertikale Körperposition.
8. Keine unerwünschten Zoom-/Crop-Abweichungen.
9. Rang- und Uniformmerkmale bleiben lesbar.
10. Das Gesicht bleibt über Alters-/Bart-/Haarvarianten als dieselbe Person erkennbar.

## Erweiterbarkeit

Das System soll später auch für folgende Inhalte verwendet werden:

- neue Offiziere
- NPCs
- Kampagnencharaktere
- zufällige Generäle
- zivile Charaktere
- historische Rückblenden
- neue Nationen
- Erweiterungen/DLC

Die ursprünglichen 64 Portraits dienen damit als definierte Referenzpopulation, nicht als Begrenzung des Systems.
