# Kartentext gegen Engine – Prüfung t265

Stand 11.11.2026, `main` nach t259 (`d15377b`). Nur Diagnose: Es wurde keine Spielmechanik geändert. Die gefundenen Abweichungen sind gemeldet, nicht behoben.

## Vorgehen

Skript: `node scripts/balance/audit_text_engine_t265.js` (Rohdaten in `scripts/balance/out/audit_text_engine_t265.json`).

1. **Statisch, alle 1.746 Karten:** Aussagen im Kartentext (ziehen, Schaden, heilen, ±ATK/DEF, AP, zerstören, Hand abwerfen, aufdecken) gegen die Effektliste. Gemeldet, wenn keine passende Effektfamilie existiert oder die Zahl in keinem Parameter steht. 263 Karten gemeldet, von Hand gesichtet; fast alle sind Fehlalarme (Sondercodes wie `CM`, `MEDIZIN`, Doktrin-Codes, Fähigkeiten über Namen, Schlüsselwörter wie Erstschadenschutz).
2. **Verhalten, alle 389 Soforteinsätze:** Karte auf vollem Brett ausspielen, Auswahlen automatisch auflösen, Wirkung messen (Deck, Hand, Schaden, Heilung, effektive ATK/DEF über `currentAtkDef`, Zerstörung, Aufdecken, Versetzen) und gegen den Text prüfen. Grundrauschen über einen reinen Zieh-Soforteinsatz abgezogen. 383 spielbar, 6 in der Probe bedingt nicht spielbar (Bedingung fehlt, kein Fehler). 22 gemeldet, von Hand nachgeprüft.
3. **Feindziel mit Bonus:** Soforteinsätze mit gegnerischem Ziel und positivem `BUFF` ohne `enemy`-Kennung (4 Treffer).
4. **Parameter nie gelesen:** Jeder Parameterschlüssel aller Effekte wird in Engine, Taktik-, Doktrin- und Trophy-Runtime gesucht. 12 Schlüssel werden nirgends gelesen; davon sind 4 echte Abweichungen (`negateBonus`, `flank`/`self` bei `MEDIZIN` über festen Wert, `debuffDef`), der Rest ist durch feste Werte gleichwertig umgesetzt oder Erstschadenschutz-Schlüsselwort.

Jede gemeldete Abweichung wurde mit einem Einzeltest (eigene und gegnerische Werte vor/nach dem Ausspielen) bestätigt.

## Ergebnis: 10 Karten wirken anders als gedruckt, 4 Karten mit widersinnigem Text

### A. Text ≠ Engine (10 Karten)

| Karte | ID | Typ, AP | Nation (Starterdeck) | Text | Engine |
|---|---|---|---|---|---|
| Verfahrensbruch | `dc_b_verfahrensbruch_589` | Soforteinsatz 1 | Steinmark | Negiere feindlichen Elite-Bonus; ziehe 1. | Wählt eine **eigene** Einheit und entfernt nur deren negativen ATK-Wert. Kein Ziehen, kein Feindbonus negiert (`negateBonus` wird nicht gelesen). |
| Keine Sterne | `dc_b_keine_sterne_529` | Soforteinsatz 1 | Namar | Negiere einen feindlichen Elite-Bonus; ziehe 1. | wie Verfahrensbruch |
| Modellstopp | `dc_b_modellstopp_463` | Soforteinsatz 2 | Orthea | Negiere einen feindlichen Bonus; ziehe 1. | wie Verfahrensbruch |
| Kein Schrein | `dc_b_kein_schrein_284` | Soforteinsatz 2 | Ossaria | Negiere Bonus eines Feindes aus Zerstörung; eigene +1 DEF. | wie Verfahrensbruch; kein +1 DEF |
| Stillprobe | `dc_b_stillprobe_467` | Soforteinsatz 2 | Orthea | Feind kann diesen Zug nicht aufdecken/angegriffen werden? Negiere Aufklärungsschutz; −2 ATK. | Deckt 1 verdeckten Feind auf; kein −2 ATK. Der Text enthält ein Fragezeichen (Entwurfsrest). |
| Opfergabe | `dc_b_opfergabe_126` | Soforteinsatz 2 | Theryn | Opfere eine eigene Einheit mit 2 oder weniger DEF: heile eine andere um 2. | Opfert eine beliebige eigene Einheit (auch DEF 4), heilt nicht und **zerstört zusätzlich die ersten 2 gegnerischen Fronteinheiten** (`SACRIFICE` ohne `no_enemy_destroy`, Vorgabe `then_destroy` = 2). |
| Ablösung | `dc_b_abloesung_660` | Soforteinsatz 3 (Gold) | Rothain | Zerstöre eine eigene Einheit. Spiele eine Einheit aus der Hand … Heile sie um 1. | Ersetzen wirkt, aber **zerstört zusätzlich 2 gegnerische Fronteinheiten** (wie Opfergabe). |
| Verbandskasten | `dc_b_verbandskasten_351` | Ausrüstung 1 | Caldris | Träger heilt 1 am Zugende, wenn er nicht angriff. | `MEDIZIN` liest keine Parameter: Träger heilt 3 und jede Nachbareinheit 2 zu jedem eigenen Zugbeginn, auch nach einem Angriff (Werte von Feldlazarett-Ausrüstung `dc_eq_med`). |
| Werkstattmarke | `dc_b_werkstattmarke_657` | Ausrüstung 1 | Rothain | Träger-Panzer oder -Fahrzeug: +1 DEF und heilt 1 zu Beginn deines Zuges, solange beschädigt. | Nur +1 DEF; die Heilung fehlt (kein Effektcode dafür). |
| Ortungsband | `dc_b_lokalisierung_480` | Ausrüstung 2 | Orthea (nicht im Starterdeck) | Träger deckt auf beim Angriff; Ziel −1 DEF. | `debuffDef` wird nicht gelesen; Ziel −1 DEF fehlt. |

### B. Engine folgt dem Text, der Text stärkt aber den Gegner (4 Karten)

Die Karte wählt eine **gegnerische** Einheit, der Bonus-Teil des Textes trifft dieselbe gegnerische Einheit. Wahrscheinlich Entwurfsrest aus der Textkürzung (eigener Bonus gemeint).

| Karte | ID | Typ, AP | Nation | Text | Gemessen an der gewählten Feindeinheit |
|---|---|---|---|---|---|
| Notimplantat | `dc_b_notimplantat_402` | Soforteinsatz 1 | Karsk | Wähle eine gegnerische Fronteinheit: 1 Schaden; +1 ATK bis Zugende, +1 DEF. | ATK 6 → 7, DEF 4 → 4 (Schaden durch +1 DEF aufgehoben) |
| Stoßtrupp | `dc_b_stosstrupp_419` | Soforteinsatz 3 (Gold) | Karsk | Wähle eine gegnerische Fronteinheit: 2 Schaden; +3 ATK bis Zugende. | ATK 6 → 9, DEF 4 → 2 |
| Lokalisierung | `dc_b_lokalisierung_823` | Soforteinsatz 0 (Gold) | Averon | Wähle eine gegnerische Fronteinheit: +1 ATK bis Zugende, −1 DEF (mind. 1); −1 DEF (mind. 1). | ATK 6 → 7, DEF 4 → 2 |
| Rasten | `dc_b_rasten_341` | Soforteinsatz 2 | Caldris | Wähle 2 gegnerische Fronteinheiten: je sie kann in ihrem nächsten Zug nicht angreifen; heile 2; +1 DEF. | DEF 4 → 5 (Feind geheilt und gestärkt) |

### C. Bekannt, unverändert

- `MINE_TOKEN` (Minenfeld-Token): Code wird nicht gelesen; die Mine wirkt über einen Sonderfall mit festen 3 Schaden. Keine Abweichung in der Wirkung.

## Bewertung

- 14 von 1.746 Karten (0,8 %) wirken nicht wie gedruckt oder schaden dem eigenen Spieler; 13 davon liegen in Starterdecks (Steinmark, Namar, Orthea, Ossaria, Theryn, Rothain, Caldris, Karsk, Averon).
- Opfergabe und Ablösung sind deutlich zu stark (2 Feindeinheiten zerstört). Die Bot-Balance t257 enthält diese Wirkung, die Nationswerte von Theryn und Rothain sind dadurch verzerrt; Karsk, Averon und Caldris werden durch die Gegner-Buffs geschwächt.
- Fundwege: statisch 9 der 263 Meldungen echt, Verhalten 7 der 22, dazu Rasten über die gezielte Suche nach Soforteinsätzen mit Feindziel und positivem Bonus und Verbandskasten über die Parameterprüfung. Die übrigen Meldungen (254 statisch, 15 Verhalten) sind nach Sichtung Fehlalarme: bedingte Wirkungen, Sondercodes, Versetzen zwischen Abschnitten derselben Reihe, Ziehen aus dem Ablagestapel.
