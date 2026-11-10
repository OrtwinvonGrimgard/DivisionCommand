# Balance-Pass t240 (Caldris, zweiter Schritt) – Release 0.6b

Stand 10.11.2026. Ziel: Caldris im realistischen Mischdeck (`scripts/nation_pools/mixed_deck.js`) um weitere 1–2 Punkte senken, Richtung 52 %. Starterdeck nicht unter 50 %, alle anderen Nationen bleiben 47–54 % (gemischt) bzw. 45–55 % (Starter), Startspieler ≈ 50 %.

## Methode

- Bot gegen Bot, Trophy-Sieg, 3-AP-Start, alle 240 Nationspaare. Je Modus 6 Seed-Sätze (190000–290000) = 69.120 Partien, 4.320 je Nation und Satz, 95-%-KI ≈ ±1,1 je Nation. 0 Hänger, 0 erzwungene Zugenden.
- „vorher“ = main 5cbdd572 (Stand t238). Die Starterdecks wurden vorher mit 3 Seed-Sätzen gemessen (34.560 Partien).
- Hinweis: Zwischen einzelnen Seed-Sätzen schwankt Caldris um bis zu ±2 Punkte, mehr als die Einzel-KI vermuten lässt. Deshalb sind die Messungen über 6 Sätze gemittelt.

## Geprüfte und verworfene Hebel

| Hebel | Caldris gemischt | Ergebnis |
|---|---:|---|
| Etappensicherung ohne versteckten Abschnittsbonus (+1 DEF im dichtesten Abschnitt) | ±0 | verworfen, keine Wirkung |
| Etappensicherung ohne +1 DEF für alle | ±0 | verworfen |
| Rasten ohne +1 ATK | ±0 | verworfen |
| Doktrinziel Etappensicherung 3 → 5 Züge | ±0 gemischt, −1,4 Starter | verworfen, Starter unter 50 % |
| Etappe sichern +2 → +1, Wall aus Schilden +3 → +2 | ±0 | verworfen |
| **5 Poolkarten −1 DEF (unten)** | **−1,6** | **übernommen** |

Die Doktrinen bleiben unverändert. Die Caldris-Stärke im Mischdeck kommt aus der Menge defensiver Poolkarten, nicht aus einer einzelnen Regel.

## Ergebnis

| Nation | Misch vorher | Misch nachher | Starter vorher | Starter nachher |
|---|---:|---:|---:|---:|
| Caldris | 54,5 | 52,9 | 50,1 | 50,6 |
| Steinmark | 52,1 | 52,7 | 50,9 | 50,2 |
| Eldran | 51,9 | 52,5 | 47,3 | 48,5 |
| Namar | 51,6 | 51,3 | 52,5 | 52,5 |
| Ossaria | 50,9 | 51,0 | 48,2 | 50,3 |
| Dargan | 50,3 | 49,9 | 49,3 | 48,0 |
| Karsk | 50,2 | 50,1 | 48,4 | 48,0 |
| Averon | 49,8 | 49,7 | 48,1 | 48,7 |
| Vesper | 49,7 | 49,7 | 53,5 | 53,3 |
| Merovan | 49,6 | 49,6 | 51,7 | 51,8 |
| Theryn | 49,0 | 49,0 | 52,3 | 51,9 |
| Sahr | 49,0 | 48,8 | 50,3 | 49,3 |
| Lyr | 48,8 | 49,1 | 47,1 | 47,0 |
| Rothain | 47,9 | 48,8 | 51,5 | 51,1 |
| Vael | 47,6 | 48,0 | 48,3 | 47,5 |
| Orthea | 47,2 | 47,0 | 50,5 | 51,2 |
| **Spanne** | 47,2–54,5 | 47,0–52,9 | 47,1–53,5 | 47,0–53,3 |
| **Startspieler** | 50,1 ± 0,4 | 50,0 ± 0,4 | 50,0 ± 0,5 | 50,2 ± 0,4 |
| Partien | 69120 | 69120 | 34560 | 69120 |

Caldris gemischt **54,5 → 52,9 %** (±1,1), Starter 50,1 → 50,6 %. Nebenwirkungen: keine Nation verschiebt sich um mehr als 2,1 Punkte (Ossaria Starter +2,1, innerhalb der Messunsicherheit). Orthea gemischt 47,0 % liegt genau an der Untergrenze.

## Änderungen alt → neu (5 Caldris-Poolkarten)

| Karte | Typ | vorher | nachher |
|---|---|---|---|
| Schildträger (`dc_np_caldris_schildtraeger`) | Infanterie 3 AP, Silber | 2/4 | 2/3 |
| Sanitätspanzer (`dc_np_caldris_sanitaetspanzer`) | Panzer 3 AP | 2/4 | 2/3 |
| Oberste Fürsorge (`dc_np_caldris_oberste_fuersorge`) | Elite 5 AP, Gold | 4/6 | 4/5 |
| Schild heben (`dc_np_caldris_schild_heben`) | Soforteinsatz 1 AP | +2 DEF dauerhaft | +1 DEF dauerhaft |
| Schutzschild leicht (`dc_np_caldris_schutzschild_leicht`) | Ausrüstung 1 AP | Träger +2 DEF | Träger +1 DEF |

- Wertband Median ±2 bleibt eingehalten. Keine Caldris-Karte im Starterdeck ist betroffen.
- 5 Vorderseiten alpha40 neu gerendert, Kontaktbogen `/workspace/t212-cards/sheets/balance-04.png`.
- Test `tests/test_balance_t240.js`.
