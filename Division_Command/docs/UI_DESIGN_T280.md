# Division Command – UI-Designsystem (t280)

Gilt für alle Bildschirme außerhalb der Kartenvorderseiten (die bleiben unverändert, Stand alpha40).
Umgesetzt in `web/css/ui-system.css` (Tokens + Bausteine, als letztes Stylesheet geladen) und
`web/css/ui-screens.css` (Anordnung der einzelnen Bildschirme). Grafiken in `web/assets/ui/`.

## Leitidee
Dunkler Feldzug-Stab: tiefes Rotbraun, Messing/Gold als Akzent, Pergament nur als Fläche für Text.
Pro Bildschirm **eine** goldene Hauptaktion, alles andere dunkelrot (sekundär) oder als Umriss (zurück).
Keine Seite ohne Ausweg: oben links immer „‹ Zurück“ (Esc), unten rechts die Hauptaktion (Enter).

## Abstände (`--sp-*`)
| Token | px | Einsatz |
|---|---|---|
| `--sp-1` | 4 | Symbol ↔ Text, Chips |
| `--sp-2` | 8 | Felder in einer Gruppe |
| `--sp-3` | 12 | Innenabstand Knopf/Feld |
| `--sp-4` | 16 | Innenabstand Panel |
| `--sp-5` | 24 | Panel ↔ Panel |
| `--sp-6` | 32 | Seitenrand |
| `--sp-7` | 48 | große Trennungen (Menü) |

## Schrift (vorhandene Schriften, keine neuen)
- Überschriften: `Cinzel, Georgia, serif` (Seitentitel 28 px / Abschnitt 18 px / Panelkopf 13 px versal, Sperrung .16em).
- Bedien- und Fließtext: `"Segoe UI", system-ui, sans-serif` (13 px Standard, 15 px Formulare und Menü, 11 px Hinweise – nie kleiner als 10 px).
- Zahlen/Stempel: `Oswald, "Arial Narrow"` (Zähler, Plaketten).
Skala: 11 · 13 · 15 · 18 · 22 · 28 · 40 (`--fs-xs … --fs-display`).

## Farben
| Token | Wert | Rolle |
|---|---|---|
| `--c-bg` | #140202 | Grund |
| `--c-panel` | #2a1010 → #160707 | Panel-Verlauf |
| `--c-edge` | rgba(201,168,96,.45) | Rahmen |
| `--c-gold` | #e2c36a | Akzent, Hauptaktion, Fokus |
| `--c-ink` | #f0e6d4 | Text |
| `--c-muted` | #c9a8a0 | Nebentext |
| `--c-danger` | #c45c3e | Löschen/Aufgeben |
| `--c-ok` | #9fc27a | erfüllt (z. B. 60/60 Karten) |
| Seltenheit | Bronze #c08a55 · Silber #c9ced6 · Gold #e2c36a | Kopienlimit-Chips |

## Knöpfe
- **Primär** (`.primary`): Messingverlauf, dunkle Schrift, eine pro Ansicht.
- **Sekundär** (Standard-`button`): dunkelrot mit Goldkante (bestehender Stil, vereinheitlicht: Radius 6 px, Höhe ≥ 36 px).
- **Gefahr** (`.danger`): rotbraun, helle Schrift; wird bei Hover kräftiger.
- **Zurück** (`.back`): Umriss, Pfeil „‹“, immer gleiche Position.
- Zustände: Hover hebt Helligkeit und Kante, `:focus-visible` 2 px Goldring mit 2 px Abstand, `:disabled` 45 % Deckkraft ohne Schatten und `cursor: not-allowed`, `:active` 1 px tiefer.

## Panels und Rahmen
`.ui-panel`: Verlauf `--c-panel`, 1 px Goldkante, Radius 10 px, innerer Glanz, Eckornamente (`assets/ui/corner.svg`) in den vier Ecken. Panelkopf als versaler Kleintitel mit Goldlinie.

## Formulare
Felder dunkel (#1a0b09) mit heller Schrift statt Browser-Weiß, Höhe 36 px, Beschriftung über dem Feld (11 px versal), Fokus mit Goldring.

## Symbole
Eigene SVG-Symbole (`assets/ui/icons.svg`, Strich 1.6 px, 24er Raster, `currentColor`): Einzelspieler, Hotseat, LAN, Bibliothek, Tutorial, Hilfe, Benutzer, Playtest, Optionen, Beenden, Zurück, Suche.

## Bewegung
120 ms für Hover/Fokus, 220 ms für Panels; bei `prefers-reduced-motion` bzw. Option „Bewegung reduzieren“ keine Verschiebungen.

## Bedienung
- Esc = Zurück bzw. Dialog schließen, Enter = Hauptaktion (wo eindeutig).
- Jede Schaltfläche hat einen sichtbaren Text oder `title`.
- Leere Listen zeigen einen Hinweis, was zu tun ist.
