# Karten-Grafiküberarbeitung t204 — erster vollständiger Bestands-Renderblock

**Gesamtauftrag noch nicht abgeschlossen.** 1746 eindeutige geladene IDs werden inventarisiert. Dieser Lieferblock erstellt 1105 neue statische Vorderseiten in 1024×1428: 1059 vorhandene echte, bereits separat extrahierte Illustrationen werden unverändert wiederverwendet; 36 Doktrinen erhalten einen neu gesetzten Regeltext und ihr bewusst nichtfiguratives Karten-/Gold-Design; zehn taktische Karten erhalten zehn individuell neu mit GenerateImage erzeugte Ölmotive. Ein separater Minen-Warnmarker bleibt als Sondertoken erhalten. **640 nationale Karten brauchen weiterhin eigene Illustrationen und bleiben ehrlich als Entwurf markiert.** Keine beliebigen Füllbilder wurden als fertige Motive ausgegeben.

## Verbindliche Quellen und Nachweise

- `graphics-manifest.json`: jeder einzelne geladene Datensatz, alter Bildverweis, Quellmotiv/Herkunft, Quellrecord-Hash, Druckwerte, alle Originaltextquellen, exakt gedruckte Blöcke, nachvollziehbare Duplikat-Abdeckung, gemessene Zeilen und sichere Rechtecke, Schriftgröße, fertiger Output oder konkreter offener Status. `complete` bleibt `false`.
- `new-art.json`: zehn individuelle neue Motive mit Generierungsherkunft, SHA256, motivischem Bezug und Stilreferenz. Keine neue Spielkarte/Mechanik, kein externes Fotomaterial.
- `missing-illustrations.json`: exakte verbleibende IDs plus Namen, Nation, Typ, Werte und Effekte. `next-batch.json` ist die nächste ausführbare Illustrationsgruppe, nicht ein angeblich fertiger Auftrag.
- Existierende reine Motive stammen aus `web/assets/cards/art/` und der geprüften `table-art-data.js`. Keine alte texttragende Kartenfläche wird als Motiv eingesetzt. Bei Doktrinen wird ausschließlich das beschriftungsfreie Kartenfeld unter dem alten Regelkasten, oberhalb des Logos, wiederverwendet; es wird ausdrücklich **nicht** als neues figuratives Artwork gezählt.
- Die Originaldateien bleiben erhalten. Druckgrundwerte werden von laufenden Tischwerten ausdrücklich getrennt. Typfarben folgen `KartenEditor/tools/render.py:VELVET/unit_branch`, Ränder und Klartext kennzeichnen Bronze/Silber/Gold und 4/2/1 Kopien. Die Nation steht ausgeschrieben; keine erfundenen realen Hoheitszeichen.
- Rückseiten/Token sind Spezialassets, keine fehlenden Einheiten-Illustrationen. Verdeckte Karten werden vor jeder Vorderseitenauflösung auf den bestehenden geheimen Rückseitenpfad gelenkt.

## Textsatz ohne Regeländerung

Der Renderer liest den tatsächlich geladenen Katalog, nicht den historischen Editor-Spiegel. `text`, `rules` und vollständige Keyworddefinitionen werden gesetzt. Exakte Dubletten und vollständig in einem längeren Block enthaltene Formulierungen erscheinen nur einmal; der Nachweis bleibt pro Quellfeld erhalten. Gegenseitiges Wegdeduplizieren identischer Text-/Regelfelder ist ausdrücklich verhindert. Alte `clauses` dienen nicht als Druckquelle, weil sie nach Textmigrationen veraltet sein können.

Nur bei den zehn taktischen Karten sind zwei ergänzende, sehr ausführliche Wiederholungsabsätze redaktionell äquivalent verdichtet: allgemeine Spielkonventionen und Interaktionsreminder. **Der eigentliche Karteneffekt und die vollständige Keyworddefinition bleiben wortgetreu enthalten.** Original und Druckfassung stehen nebeneinander im Manifest; `equivalent_common_conventions` und `equivalent_interaction_reminder` kennzeichnen diese Fälle. Alle Kosten, Zielmengen, Zeitfenster, Grenzen, Ausnahmen und Wechselwirkungen bleiben erhalten. Kein Text wird abgeschnitten oder mit Auslassungspunkten versteckt.

Die Regelschrift bleibt mindestens 30 px bei 1024 px Kartenbreite. Erst wird der Motivbereich angepasst, nicht die Schrift mikroskopisch verkleinert. Die langen taktischen Karten verwenden einen kompakten, unbeschnittenen Bild-Inset; diese Layoutabwägung ist in Vorschauen sichtbar. Der komplette Kartenrahmen bleibt 1024/1428; Quelle und Illustrationen werden nicht verzerrt. Vollständiges Verstehen der dichtesten Karten verlangt weiterhin die große Detailansicht, nicht den kleinen Tischslot.

## Reproduzierbarer Build / Fortsetzung

```sh
python3 -m pip install -r scripts/graphics/requirements.txt  # falls Pillow fehlt
npm run build:cards       # aktuelle Regeldaten -> alle verfügbaren Vorderseiten -> Dateimanifest
npm test
python3 scripts/graphics/previews.py
```

Fonts plus Lizenzhinweise liegen lokal unter `fonts/`; die verwendeten Fonts werden nicht horizontal skaliert. Der normale Render nutzt vier unabhängige Prozesse, einen festen Renderer und WebP Qualität 93. Pixel-/Byte-Reproduzierbarkeit wird für die gleiche Pillow/libwebp-Werkzeugkette geprüft, nicht plattformübergreifend versprochen.

Für eine nächste Illustrationsgruppe: `next-batch.json` lesen, die jeweiligen Motive anhand Karteneffekt, Nationen-Lore und vorhandener Öl-Stilreferenz einzeln generieren und tatsächlich sichten; Dateien unter `web/assets/cards/art-v1/<ID>.jpg` ablegen; `new-art.json` mit ID, Herkunft, Motiv und Hash ergänzen; `npm run build:graphics`; Prüfungen/Vorschauen; Cacheversion anheben. Erst mit echtem passendem Motiv wird eine ID als fertig ausgeliefert. Keine Regel-/Kartendatensätze werden zum Platzsparen geändert.

Die Bildauflösung läuft als reines Präsentationsmanifest `DC_CARD_FACES`/`dcCardImage` nach dem Katalog. Es mutiert weder `image`, `art_status`, Regeln noch Buildquellen; ein fertiger neuer Face-Eintrag übersteuert nur die Darstellung. Hand, 2,5D-Slot, Hover, große Detailansicht und Deckbuilder nutzen dieselbe volle Vorderseite; kein altes eingebettetes Thumbnail kann den neuen Pfad verdecken. Flacher Modus behält die Motivausschnitte, neue taktische Karten erhalten dort ihr eigenes echtes Motiv. Kamera, Stencil, Handpinnung, Regeln, Sounds, Porträts und Chat bleiben unverändert.

Cache dieses Lieferblocks: `divcmd-gfx1`, App und Bildmanifeste `?v=gfx1`. Bei später neu gerenderten Gesichtern Cache/Manifestversion ebenfalls anheben.

## Qualitätsgrenzen

`verify.py` prüft alle 1746 IDs, Source-Hashes, volle Keywordtexte, Quelltext-Abdeckung, 30-px-Untergrenze, sichere Zeilenbreiten, Textrechtecke, Farbe/Stats, sämtliche fertigen Bitmapabmessungen und real existierende Dateien. Neue Motive sind einzeln gesichtet; repräsentative Vorderseiten und besonders lange Texte werden als Bilder geöffnet, ein vollständiges Kontaktbuch wird erzeugt. DOM-Tests prüfen reale Hand-/Slot-/Detailpfade sowie alle fertigen Bilder in Sammlung/Deckbuilder, Contain-Proportionen und die Geheimhaltung verdeckter gegnerischer Slots. Das ist **keine Browser-Sichtprüfung und kein vollständiger manueller Einzelbild-/OCR-Lektoratsnachweis für 1105 Seiten**. Der offene Rest wird nicht als fertig bezeichnet.
