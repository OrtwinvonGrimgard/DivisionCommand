# Balance-Pass t238 (3-AP-Start, realistische Mischdecks, Caldris)

Stand 10.11.2026. Grundlage: Bot gegen Bot (`DCBot`), Trophy-Sieg, alle 240 geordneten Nationspaare. 0 Hänger, 0 erzwungene Zugenden, 0 Engine-Fehler in allen Läufen.

## Regeländerung (Kernregel, vom Nutzer entschieden)

| Regel | vorher | nachher |
|---|---|---|
| `opening_starter_ap_penalty` | 1 → Startspieler 4 AP im ersten Zug | **2 → Startspieler 3 AP im ersten Zug** |
| Kartenziehen | Startspieler zieht in Zug 1 nicht, Zweiter zieht beim ersten Zugwechsel 1 | unverändert (keine Zusatzkarte) |

Siegquote des Startspielers (95-%-KI):

| Deck | 4 AP (t237) | 3 AP |
|---|---:|---:|
| Starterdecks | 54,5 ± 0,9 | **50,0 ± 0,5** (34.560 Partien) |
| realistische Mischdecks | – | **50,2 ± 0,5** (34.560) |
| altes Testkonstrukt | 56,1 ± 0,9 | 51,9 ± 0,5 (34.560) |

Der Zweite wird damit nicht bevorzugt; der Vorteil des Startspielers ist bei Starter- und realistischen Decks innerhalb der Messgenauigkeit weg.

## Neuer Mischdeck-Generator

`scripts/nation_pools/mixed_deck.js` ersetzt für Messungen das alte Konstrukt „30 Starterkarten + `pool.slice(0,30)`“ (≈ 51 Einheiten, kaum Ausrüstung, Ossarias Gepanzerter Fuß halb tot).

- 60 Karten nach den Quoten der 16 Starterdecks: **30 Einheiten, 10 Ausrüstung, 8 Unterstützung, 12 Soforteinsätze**.
- Je Typ etwa die Hälfte aus dem Nationenpool (15/5/3/7), Rest aus dem Starterdeck; Singletons, legal (`DC_validateDeck`), eigene Doktrinen.
- Zufallsauswahl mit Seed je Partie: über viele Partien wird jede Poolkarte gemessen, und der Einfluss einer Karte lässt sich als Siegquote „im Deck / nicht im Deck“ schätzen.
- `smoke_sim.js` behält das alte Konstrukt, weil es dort um die Abdeckung der Poolkarten geht, nicht um Balance.

Ergebnis vorher: Averon 48,3 %, Dargan 48,4 %, Ossaria 51,4 %. Die Werte unter 45 % aus t237 waren ein Artefakt des alten Konstrukts. Einziger klarer Ausreißer: **Caldris 57,7 %** (Untergrenze der KI 56,2). Ohne Doktrinen liegt Caldris bei 52 %: Etappensicherung (+1 DEF für alle) und Rasten wirken mit den defensiven Poolkarten zusammen. Weil der Auftrag Poolkarten nennt, wurden die Doktrinen nicht geändert, sondern 14 Caldris-Poolkarten um je eine Stufe abgeschwächt. Dazu kommt eine Namar-Ausrüstung, weil Namar mit dem Starterdeck nach dem 3-AP-Start bei 55,3 % lag.

## Ergebnis: realistische gemischte Decks (Generator `mixed_deck.js`)

Je 34.560 Partien (3 Seed-Sätze), 4.320 je Nation, 95-%-KI ≈ ±1,5. „vorher“ = Stand dd791480 (3-AP-Regel, ohne t238-Kartenwerte).

| Nation | vorher | nachher | Δ |
|---|---:|---:|---:|
| Caldris | 57,7 | 53,7 | -4,0 |
| Namar | 53,1 | 51,2 | -1,9 |
| Steinmark | 52,5 | 52,4 | -0,1 |
| Eldran | 51,9 | 51,5 | -0,4 |
| Ossaria | 51,4 | 50,6 | -0,8 |
| Lyr | 50,5 | 50,2 | -0,3 |
| Vesper | 49,4 | 50,3 | +0,9 |
| Karsk | 49,3 | 49,4 | +0,1 |
| Theryn | 48,8 | 48,4 | -0,4 |
| Merovan | 48,4 | 49,7 | +1,3 |
| Dargan | 48,4 | 49,8 | +1,4 |
| Averon | 48,3 | 50,4 | +2,1 |
| Rothain | 48,0 | 48,0 | +0,0 |
| Sahr | 47,9 | 49,4 | +1,5 |
| Orthea | 47,6 | 47,2 | -0,4 |
| Vael | 46,6 | 47,8 | +1,2 |
| **Spanne** | 46,6–57,7 | 47,2–53,7 | |
| **Startspieler** | 49,9 ± 0,5 | 50,2 ± 0,5 | |

## Ergebnis: Starterdecks

„4 AP“ = Stand t237 (11.520 Partien), „3 AP“ = nur Regeländerung (11.520), „nachher“ = 3 AP + t238-Karten (34.560, ±1,5).

| Nation | 4 AP (t237) | 3 AP | nachher |
|---|---:|---:|---:|
| Vesper | 53,0 | 52,4 | 53,5 |
| Namar | 53,3 | 55,3 | 52,5 |
| Theryn | 52,5 | 51,6 | 52,3 |
| Merovan | 51,7 | 50,8 | 51,7 |
| Rothain | 48,3 | 51,5 | 51,5 |
| Steinmark | 48,5 | 49,1 | 50,9 |
| Orthea | 50,8 | 52,2 | 50,5 |
| Sahr | 48,3 | 47,7 | 50,3 |
| Caldris | 52,6 | 50,6 | 50,1 |
| Dargan | 51,7 | 48,6 | 49,3 |
| Karsk | 49,3 | 48,2 | 48,4 |
| Vael | 45,2 | 47,2 | 48,3 |
| Ossaria | 50,1 | 48,8 | 48,2 |
| Averon | 46,3 | 49,4 | 48,1 |
| Eldran | 49,2 | 48,2 | 47,3 |
| Lyr | 49,2 | 48,2 | 47,1 |
| **Spanne** | 45,2–53,3 | 47,2–55,3 | 47,1–53,5 |
| **Startspieler** | 54,5 ± 0,9 | 50,9 ± 0,9 | 50,0 ± 0,5 |

## Altes Testkonstrukt (30 Starter + pool.slice(0,30))

Nur zum Vergleich mit t237. ≈ 51 Einheiten, kaum Ausrüstung, kein realistisches Deck.

| Nation | 4 AP (t237) | 3 AP | nachher |
|---|---:|---:|---:|
| Theryn | 56,6 | 57,6 | 55,7 |
| Rothain | 55,1 | 56,7 | 55,2 |
| Steinmark | 53,5 | 53,9 | 54,9 |
| Merovan | 55,8 | 55,3 | 54,9 |
| Caldris | 55,2 | 54,2 | 54,9 |
| Eldran | 52,6 | 52,0 | 54,3 |
| Orthea | 54,3 | 53,1 | 53,0 |
| Vael | 53,7 | 55,1 | 52,5 |
| Vesper | 46,7 | 45,6 | 48,9 |
| Karsk | 50,0 | 49,1 | 48,7 |
| Namar | 48,1 | 48,7 | 48,2 |
| Sahr | 47,2 | 46,4 | 47,7 |
| Lyr | 46,9 | 46,1 | 46,9 |
| Averon | 42,4 | 45,6 | 45,2 |
| Ossaria | 41,5 | 42,2 | 42,0 |
| Dargan | 40,4 | 38,3 | 37,1 |
| **Startspieler** | 56,1 ± 0,9 | 52,6 ± 0,9 | 51,9 ± 0,5 |

## Änderungen alt → neu (15 Poolkarten)

| Karte | Typ | vorher | nachher |
|---|---|---|---|
| Schildwall-Zug (`dc_np_caldris_schildwall_zug`) | Infanterie 2 AP | 1/4 | 1/3 |
| Etappenwache (`dc_np_caldris_etappenwache`) | Infanterie 2 AP | 2/2 | 1/2 |
| Genesene Kompanie (`dc_np_caldris_genesene_kompanie`) | Infanterie 3 AP | 3/4 | 3/3 |
| Schildwagen (`dc_np_caldris_schildwagen`) | Panzer 4 AP | 3/5 | 3/4 |
| Panzerschild Caldris (`dc_np_caldris_panzerschild_caldris`) | Panzer 5 AP, Gold | 4/7, jeder Schaden −2 | 4/7, **jeder Schaden −1** |
| Bergepanzer Caldris (`dc_np_caldris_bergepanzer_caldris`) | Panzer 3 AP | 2/5 | 2/4 |
| Defensivbatterie (`dc_np_caldris_defensivbatterie`) | Artillerie 4 AP | 3/4 | 3/3 |
| Etappenbeobachter (`dc_np_caldris_etappenbeobachter`) | Aufklärung 2 AP | 2/2 | 2/1 |
| Schildgarde (`dc_np_caldris_schildgarde`) | Elite 4 AP | 3/5 | 3/4 |
| Feldklinik (`dc_np_caldris_feldklinik`) | Unterstützung | 3 AP | **4 AP** |
| Ruhe vor dem Schlag (`dc_np_caldris_ruhe_vor_dem_schlag`) | Soforteinsatz 2 AP | +2 ATK bis Zugende, +1 DEF dauerhaft | +2 ATK bis Zugende |
| Genesene zurück an die Front (`dc_np_caldris_genesene_zurueck_an_die_front`) | Soforteinsatz | 1 AP | 2 AP |
| Schildplatte (`dc_np_caldris_schildplatte`) | Ausrüstung | 1 AP | 2 AP |
| Vollschutzweste (`dc_np_caldris_vollschutzweste`) | Ausrüstung 2 AP | Träger +3 DEF (Infanterie) | Träger +2 DEF (Infanterie) |
| Kaipanzerung (`dc_np_namar_kaipanzerung`) | Ausrüstung, im Namar-Starterdeck | 1 AP | 2 AP |

- Alle Einheiten bleiben im Wertband Median ±2 ihrer AP-Stufe (Test `test_balance_t238.js`).
- Engine: `SCHADEN_MINUS` liest jetzt optional `param.n` (Standard 2). Alle anderen Karten mit dieser Fähigkeit bleiben bei −2; Koloss hatte bereits `n: 2`.
- Builder: Fähigkeit `minus:N` in `scripts/nation_pools/build.js`. Ohne Zahl ist die Ausgabe byte-gleich zu vorher.
- 15 Vorderseiten alpha40 neu gerendert, Kontaktbogen `/workspace/t212-cards/sheets/balance-03.png`.

## Offen

- Im alten Testkonstrukt bleiben Dargan (37 %) und Ossaria (42 %) niedrig. Das Konstrukt ist kein realistisches Deck; im neuen Generator liegen beide bei 50 %.
- Die Caldris-Doktrinen Etappensicherung und Rasten sind der größere Hebel (ohne Doktrinen 52 %). Nicht geändert, weil der Auftrag Poolkarten nannte.
- Nur der eingebaute Bot spielt; für menschliches Spiel ist das ein Hinweis, kein Beweis.
