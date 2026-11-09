# Division Command – Dokumentation

Alle Regeln, Lore-Texte, Planungen und technischen Erklärungen zu Division Command an einem Ort. Der Ordner liegt bewusst direkt neben dem Spiel (`Division_Command_0.5a/`), damit Spiel und Dokumentation zusammen versioniert und ausgeliefert werden. Pfade in Code-Kommentaren und Dokumenten beziehen sich, wenn nicht anders angegeben, auf `Division_Command_0.5a/`.

## Gesamtdokumentation

| Dokument | Inhalt |
|---|---|
| [`Division_Command_Dokumentation.md`](Division_Command_Dokumentation.md) | Vollständige Projektdokumentation (Alpha 0.5a, Stand November 2026). |
| [`Division_Command_Dokumentation.pdf`](Division_Command_Dokumentation.pdf) | PDF-Fassung der Projektdokumentation. |

## Regeln – `regeln/`

| Dokument | Inhalt |
|---|---|
| [SIEGBEDINGUNGEN.md](regeln/SIEGBEDINGUNGEN.md) | Aktive Siegbedingungen im Trophy-Modus und Legacy-Modus `classic`. |
| [REGEL_FREEZE.md](regeln/REGEL_FREEZE.md) | Eingefrorener Regelstand für die Playtests (Phase 0). |
| [MECHANICS_REACTIVE.md](regeln/MECHANICS_REACTIVE.md) | Grundsätze für reaktive Mechaniken, die Karten aufeinander reagieren lassen. |
| [SCHLUESSELWOERTER.md](regeln/SCHLUESSELWOERTER.md) | Alle implementierten Schlüsselwörter mit Regeltext (generiert aus den Spieldaten). |
| [TAKTISCHE_SCHLUESSELWOERTER.md](regeln/TAKTISCHE_SCHLUESSELWOERTER.md) | Taktisches Vokabular aus t203: Abgrenzungen, Quellen, Sonderfälle und Konfliktentscheidungen (generiert). |
| [RULES_v0.5_GRUNDKONZEPT.md](regeln/RULES_v0.5_GRUNDKONZEPT.md) | Ausführliches Arbeitsregelwerk v0.5 mit festen und offenen Regeln. |

## Nationen und Lore – `nationen/`

### Hauptdokumente: Lore je Nation (aktuell)

Die Dateien in [nationen/lore_nationen/](nationen/lore_nationen/) sind die **maßgebliche Lore**. Jede fasst eine Nation zusammen: Philosophie, Kriegsführung, Preis, interne Strömungen, Alltag, Regionen, Städte und Gesellschaft (je ≥1500 Wörter). Sie ersetzen die alte Sammeldatei als erste Anlaufstelle.

| Nation | Hauptdokument | Ergänzend | Älterer Aufsatz |
|---|---|---|---|
| **Steinmark** | [01_Steinmark.md](nationen/lore_nationen/01_Steinmark.md) – Steinmark – Recht | [Kurzprofil](nationen/Steinmark/Kriegsfuehrung.md) | [Aufsatz](nationen/aufsaetze/01-steinmark.md) |
| **Eldran** | [02_Eldran.md](nationen/lore_nationen/02_Eldran.md) – Eldran – Krone und Parlament | [Kurzprofil](nationen/Eldran/Kriegsfuehrung.md) | [Aufsatz](nationen/aufsaetze/02-eldran.md) |
| **Rothain** | [03_Rothain.md](nationen/lore_nationen/03_Rothain.md) – Rothain – Erbe | [Kurzprofil](nationen/Rothain/Kriegsfuehrung.md) | [Aufsatz](nationen/aufsaetze/03-rothain.md) |
| **Averon** | [04_Averon.md](nationen/lore_nationen/04_Averon.md) – Averon – Zeit | [Kurzprofil](nationen/Averon/Kriegsfuehrung.md) | [Aufsatz](nationen/aufsaetze/04-averon.md) |
| **Orthea** | [05_Orthea.md](nationen/lore_nationen/05_Orthea.md) – Orthea – Erkenntnis | [Kurzprofil](nationen/Orthea/Kriegsfuehrung.md) | [Aufsatz](nationen/aufsaetze/05-orthea.md) |
| **Vesper** | [06_Vesper.md](nationen/lore_nationen/06_Vesper.md) – Vesper – System | [Kurzprofil](nationen/Vesper/Kriegsfuehrung.md) | [Aufsatz](nationen/aufsaetze/06-vesper.md) |
| **Karsk** | [07_Karsk.md](nationen/lore_nationen/07_Karsk.md) – Karsk – Körper | [Kurzprofil](nationen/Karsk/Kriegsfuehrung.md) | [Aufsatz](nationen/aufsaetze/07-karsk.md) |
| **Caldris** | [08_Caldris.md](nationen/lore_nationen/08_Caldris.md) – Caldris – Fürsorge | [Kurzprofil](nationen/Caldris/Kriegsfuehrung.md) | [Aufsatz](nationen/aufsaetze/08-caldris.md) |
| **Theryn** | [09_Theryn.md](nationen/lore_nationen/09_Theryn.md) – Theryn – Glaube | [Kurzprofil](nationen/Theryn/Kriegsfuehrung.md) | [Aufsatz](nationen/aufsaetze/09-theryn.md) |
| **Vael** | [10_Vael.md](nationen/lore_nationen/10_Vael.md) – Vael – Geschäft | [Kurzprofil](nationen/Vael/Kriegsfuehrung.md) | [Aufsatz](nationen/aufsaetze/10-vael.md) |
| **Sahr** | [11_Sahr.md](nationen/lore_nationen/11_Sahr.md) – Sahr – Fluss | [Kurzprofil](nationen/Sahr/Kriegsfuehrung.md) | [Aufsatz](nationen/aufsaetze/11-sahr.md) |
| **Namar** | [12_Namar.md](nationen/lore_nationen/12_Namar.md) – Namar – Häfen | [Kurzprofil](nationen/Namar/Kriegsfuehrung.md) | [Aufsatz](nationen/aufsaetze/12-namar.md) |
| **Merovan** | [13_Merovan.md](nationen/lore_nationen/13_Merovan.md) – Merovan – Weg | [Kurzprofil](nationen/Merovan/Kriegsfuehrung.md) | [Aufsatz](nationen/aufsaetze/13-merovan.md) |
| **Dargan** | [14_Dargan.md](nationen/lore_nationen/14_Dargan.md) – Dargan – Schuld | [Kurzprofil](nationen/Dargan/Kriegsfuehrung.md) | [Aufsatz](nationen/aufsaetze/14-dargan.md) |
| **Lyr** | [15_Lyr.md](nationen/lore_nationen/15_Lyr.md) – Lyr – Eid | [Kurzprofil](nationen/Lyr/Kriegsfuehrung.md) | [Aufsatz](nationen/aufsaetze/15-lyr.md) |
| **Ossaria** | [16_Ossaria.md](nationen/lore_nationen/16_Ossaria.md) – Ossaria – Tote | [Kurzprofil](nationen/Ossaria/Kriegsfuehrung.md) | [Aufsatz](nationen/aufsaetze/16-ossaria.md) |

### Übergreifend

| Dokument | Inhalt |
|---|---|
| [TAKTIK_NATIONEN.md](nationen/TAKTIK_NATIONEN.md) | Taktische Lore der Nationen nach den 60er-Nationendecks (Spielbezug). |
| [DOKTRIN_NATIONEN.md](nationen/DOKTRIN_NATIONEN.md) | Doktrinen und ihre Anwendung bei den Nationen. |
| [KRIEGSFUEHRUNG_UND_PHILOSOPHIE.md](nationen/KRIEGSFUEHRUNG_UND_PHILOSOPHIE.md) | Kurzüberblick über Kriegsführung und Philosophie aller Nationen; ergänzt die Hauptdokumente. |
| `nationen/<Nation>/Kriegsfuehrung.md` | Kurzprofil je Nation (Philosophie, Kriegsführung, Preis, Spannungen); siehe Tabelle oben. |

### Ältere bzw. ergänzende Lore (Stand vor den Hauptdokumenten, nicht gelöscht)

Diese Texte überschneiden sich mit den Hauptdokumenten. Bei Widersprüchen gilt die Datei in `lore_nationen/`.

| Dokument | Inhalt |
|---|---|
| [LORE_NATIONEN.md](nationen/LORE_NATIONEN.md) | *Älter:* alte Sammeldatei, Lore-Grundlage v0.3 aller sechzehn Nationen. |
| [LORE_NATIONEN_DETAILLIERT.md](nationen/LORE_NATIONEN_DETAILLIERT.md) | *Älter/ergänzend:* verdichtete Sammelfassung v0.5 mit Tonalität und Strömungen. |
| [KRIEGSPHILOSOPHIEN_NATIONEN.md](nationen/KRIEGSPHILOSOPHIEN_NATIONEN.md) | *Ergänzend:* Arbeitsfassung, wie jede Gesellschaft den Krieg versteht. |
| [aufsaetze/](nationen/aufsaetze/) | *Älter/ergänzend:* lange Aufsätze je Staat (~5000 Wörter); Lesereihenfolge in [00-lesen.md](nationen/aufsaetze/00-lesen.md). |

## Karten, Decks und Pools – `karten/`

| Dokument | Inhalt |
|---|---|
| [NATIONENPOOLS_100.md](karten/NATIONENPOOLS_100.md) | Nationenpools mit 100 Karten je Nation, Deckformat 60 + 2 und Zahlentabelle. |
| [NATIONENPOOL_KARTEN.md](karten/NATIONENPOOL_KARTEN.md) | Vollständige Liste der 640 neuen Poolkarten (generiert). |
| [DECKS_SITZT.md](karten/DECKS_SITZT.md) | Konzeptlisten für die Decks der sitzenden Nationen. |

## Balance – `balance/`

| Dokument | Inhalt |
|---|---|
| [BALANCE_FRONT.md](balance/BALANCE_FRONT.md) | Diagnose des Front-Snowballs und Anti-Snowball-Prototypen. |
| [DOKTRIN_BALANCE.md](balance/DOKTRIN_BALANCE.md) | Balance-Pass der Doktrinen mit Methode und Ergebnissen. |
| [FP_VORTEIL_ANALYSE.md](balance/FP_VORTEIL_ANALYSE.md) | Analyse des Vorteils für den ersten Spieler (Simulation). |
| [BALANCE_AP_STUFEN_v0.1.md](balance/BALANCE_AP_STUFEN_v0.1.md) | AP-Bepreisung und Stufeneinstufung, erster Balancepass. |
| [DESIGN_BALANCE_UND_KARTENPLAN_v0.1.md](balance/DESIGN_BALANCE_UND_KARTENPLAN_v0.1.md) | Zentrale Grundlage für Kartenset-Aufbau und Neubewertung. |

## Planung – `planung/`

| Dokument | Inhalt |
|---|---|
| [GESAMTPLAN.md](planung/GESAMTPLAN.md) | Übergeordneter Arbeitsplan mit Phasen und nächsten Schritten. |
| [FAHRPLAN.md](planung/FAHRPLAN.md) | Fahrplan bis zur Vollversion, inklusive Roguelike-Kartendesign. |
| [NEUE_EFFEKTIDEEN.md](planung/NEUE_EFFEKTIDEEN.md) | Entwürfe für nationale Sondermechaniken, nicht implementiert. |

## Technik – `technik/`

| Dokument | Inhalt |
|---|---|
| [TABLE_CAMERA.md](technik/TABLE_CAMERA.md) | 2,5D-Tischkamera: Einstellungen und CSS-Technik. |
| [PORTRAIT_SYSTEM.md](technik/PORTRAIT_SYSTEM.md) | Porträtsystem für Offiziere und Ebenen. |
| [CHOICE_WIRING.md](technik/CHOICE_WIRING.md) | Verdrahtung von Wahl-Karten und Doktrinen, Bot-Faustregel. |
| [PLAYTEST_LOGS.md](technik/PLAYTEST_LOGS.md) | Partie-Protokollierung im Browser, Export und Auswertung. |
| [SOUND_QUELLEN_SFX.md](technik/SOUND_QUELLEN_SFX.md) | Herkunft und Stil der Soundeffekte (SFX v4). |

## Bewusst außerhalb von `docs/`

| Datei | Grund |
|---|---|
| [`../README.md`](../README.md) | Einstieg ins Spiel (Starten, Ordner); bleibt im Spielordner. |
| `../web/assets/sfx/SOUND_QUELLEN.md` | Quellennachweis direkt bei den Sounddateien; inhaltsgleich mit `technik/SOUND_QUELLEN_SFX.md`. |
| `../portraits/README.md`, `../portraits/layers/README.md` | Anleitung zum Porträtwerkzeug, gehört zum Werkzeugordner. |
| `../../scripts/graphics/README.md` | Anleitung zur Grafik-Pipeline, gehört zu den Skripten. |

Generierte Dokumente (`SCHLUESSELWOERTER.md`, `TAKTISCHE_SCHLUESSELWOERTER.md`, `NATIONENPOOL_KARTEN.md`, Tabelle in `NATIONENPOOLS_100.md`) werden mit `npm run build:tactics` direkt hier neu geschrieben.
