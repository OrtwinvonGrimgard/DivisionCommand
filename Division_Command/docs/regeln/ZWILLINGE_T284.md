# Zwillingskarten (t284)

**Stand:** Alpha 0.6d · 13.11.2026

## Ziel

Keine zwei spielbaren Karten dürfen in Typ, Klasse, AP, ATK, DEF und gedrucktem Regeltext übereinstimmen. Zum gedruckten Regeltext gehören die Schlüsselwörter: Die Vorderseite zeigt sie als Chip oder mit Erinnerungstext (`scripts/graphics/face.py`), und sie wirken mechanisch.

Geprüft wird das von `tests/test_twins_t284.js`, das in `npm test` läuft. Erwartet werden 0 Gruppen. Die frühere Ausnahme für identische Theryn-Ausgaben (THERYN_EDITIONS) ist nicht mehr nötig, denn die neutralen Alpha-Ausgaben unterscheiden sich jetzt.

## Vorher / nachher

| Prüfung | vorher (0.6c) | nachher (0.6d) |
|---|---|---|
| gleiche Werte und gleicher Text (Schlüsselwörter nicht gezählt, Definition t282) | 119 Gruppen / 315 Karten | 24 Gruppen / 73 Karten, alle über Schlüsselwörter getrennt |
| gleiche Werte, gleicher Text **und** gleiche Schlüsselwörter | 3 Gruppen / 6 Karten | **0** |

## Vorgehen

- **Runde 1:** 138 Karten aus nationalen Grundkarten und Pools geändert. Je Gruppe bleibt eine Karte unverändert, bevorzugt die neutrale Alpha-Karte oder eine in Tests festgeschriebene Karte. Bei den übrigen Karten wird
  - ein Punkt zwischen ATK und DEF verschoben, passend zur Nationsneigung (Angriff: Karsk, Vael, Rothain, Sahr, Dargan, Theryn, Averon, Orthea; sonst Verteidigung), oder
  - die AP-Stufe um 1 verschoben, mit einer Wertsumme im Wertband (Median ±2).
  
  Das Netto-ΔATK jeder Nation ist gedeckelt (Ziel |Σ| ≤ 2).
- **Neutrale Alpha-Doppel der Theryn-Ausgaben:** Sammelpunkt AP 2→3, Glaubensbanner AP 3→2, Marschbefehl AP 1→2. Die Theryn-Ausgaben selbst bleiben unverändert.
- **Runde 2:** 16 weitere Karten geändert, nachdem die Balance-Anpassungen neue Gruppen erzeugt hatten. Getunte Karten blieben dabei unverändert.
- **Neutralität:** Messung tw1 gegen b0, je 10.080 Spiele. Die Nationen weichen im Rahmen des Rauschens ab (±2 Punkte).

## Sonderfälle: nur über Schlüsselwörter getrennt (24 Gruppen)

Diese Karten haben gleiche Werte und gleichen Kartentext, aber verschiedene, gedruckte Schlüsselwörter. Für keine von ihnen gab es einen freien Wertplatz innerhalb des Wertbands, ohne eine neue Kollision zu erzeugen oder eine getunte oder in Tests festgeschriebene Karte zu verändern. Sie gelten als eindeutig.

| Typ / Werte | Karten (Nation: Schlüsselwörter) |
|---|---|
| Einheit / Infanterie 1/2/1 | Erste Welle (neutral: Staffelangriff); Sicherungstrupp (neutral: Zuteilung); Kolonne Flussrot (Rothain: Zähigkeit); Eigeninitiative-Zug (Averon: Abschirmung) |
| Einheit / Infanterie 2/2/2 | Ablösungstrupp (Merovan: Heranführung, Stellungswechsel); Netztrupp Novaris (Averon: Gefechtsbereit); Messkette Alpha (Orthea: Staffelangriff) |
| Einheit / Panzer 3/3/3 | Auffangkeil (Eldran: Abschirmung, Stellungswechsel); Täuschungspanzer (Vesper: Hinterhalt, Absetzen); Achsenkolonne (Merovan: Stellungswechsel) |
| Einheit / Panzer 3/2/4 | Straßenriegel (Namar: Abschirmung, Zuteilung); Bergepanzer Caldris (Caldris: Ablösung); Fabrikpanzer Serie Neun (Vael: Zähigkeit); Talpanzer (Lyr: Hinterhalt, Absetzen) |
| Einheit / Artillerie 3/3/2 | Dekretbatterie (Rothain: –); Maßbatterie (Karsk: Nachsetzen); Schwerpunktbatterie (Rothain: Staffelangriff); Stabsrohr Neuhoff (Rothain: Fernschuss); Lokalisierungsbatterie (Averon: Stellungswechsel) |
| Einheit / Aufklärung 1/1/1 | Lagebild (Vael: Zuteilung); Schulrain-Läufer (Eldran: Gefechtsbereit, Zuteilung) |
| Einheit / Aufklärung 1/1/2 | Selm-Läufer (Dargan: Heranführung); Peiltrupp (Steinmark: Zuteilung) |
| Einheit / Aufklärung 1/1/1 | Fahrplanblick (Merovan: Stellungswechsel); Restzähler (Namar: –); Formularspäher (Caldris: Fernschuss); Namensblick (Ossaria: Zuteilung) |
| Einheit / Aufklärung 2/2/2 | Vermessungstrupp (Steinmark: –); Frühwarntrupp (Averon: Hinterhalt, Absetzen); Glaubensmelder (Theryn: Gefechtsbereit); Zielerfasser (Vael: Heranführung) |
| Einheit / Infanterie 2/1/2 | Kronlinie (Eldran: Sicherung); Kolonnenschützen (Merovan: Heranführung) |
| Einheit / Infanterie 1/1/1 | Landsturm Kronfeld (Eldran: Abschirmung); Maßzug (Karsk: Nachsetzen); Vorderste Welle (Theryn: Staffelangriff); Nachfolgende Welle (Theryn: Gefechtsbereit) |
| Einheit / Artillerie 3/2/3 | Sperrfeuerbatterie (Eldran: Zuteilung); Frühwarnbatterie (Averon: –); Schutzfeuerbatterie (Caldris: Fernschuss); Achsenfeuer (Merovan: Stellungswechsel) |
| Einheit / Aufklärung 2/1/3 | Wachtturmposten (Eldran: Fernschuss); Gamsjäger (Lyr: –) |
| Einheit / Infanterie 2/2/1 | Ablösungszug (Rothain: Heranführung); Verlegungskompanie (Merovan: Hinterhalt, Absetzen) |
| Einheit / Aufklärung 2/2/1 | Achsenkundschafter (Rothain: Heranführung); Beobachterkette (Orthea: Zuteilung); Etappenbeobachter (Caldris: Fernschuss); Achsenbeobachter (Merovan: Platztausch, Absetzen) |
| Einheit / Artillerie 2/2/1 | Netzmörser (Averon: Durchschlag); Schiffsmörser (Namar: Zuteilung) |
| Einheit / Aufklärung 1/1/1 | Sensordrohne (Averon: Zuteilung); Leistungsmesser (Karsk: Gefechtsbereit); Biometrie-Melder (Caldris: –); Wegkundschafter (Merovan: Heranführung); Hafenlotse (Namar: Fernschuss); Navigator (Sahr: Stellungswechsel) |
| Einheit / Infanterie 1/1/2 | Kreuzpeilungstrupp (Orthea: Nachsetzen); Schuldner-Kompanie (Dargan: Heranführung) |
| Einheit / Panzer 3/3/4 | Messpanzer (Orthea: Durchschlag); Handelswagen (Sahr: Stellungswechsel) |
| Einheit / Infanterie 2/1/3 | Unsichtbare Wache (Vesper: Hinterhalt, Absetzen); Garnison Weg Sieben (Merovan: Sicherung); Handelsfrontmiliz (Sahr: Zuteilung) |
| Einheit / Aufklärung 1/1/2 | Überwachungsposten (Vesper: Stellungswechsel); Buchprüfer (Dargan: –) |
| Einheit / Infanterie 3/2/3 | Schildträger (Caldris: –); Keilhaltzug (Merovan: Heranführung) |
| Einheit / Aufklärung 2/1/2 | Sanitätsaufklärer (Caldris: –); Konvoiaufklärer (Namar: Zuteilung) |
| Einheit / Panzer 4/4/4 | Reliquienpanzer (Theryn: Staffelangriff); Materialkeil (Vael: Durchschlag); Felskeil (Lyr: Zähigkeit) |
