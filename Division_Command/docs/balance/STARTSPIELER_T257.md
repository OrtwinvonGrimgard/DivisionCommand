# Startspieler t257 – beide 5 AP im ersten Zug

Entscheidung des Nutzers: `opening_starter_ap_penalty` 2 → 0. Beide Spieler haben im ersten Zug 5 AP.

## Wie der Ausgleich in der Engine wirkt

- Beide ziehen eine Starthand von 5 Karten (`hand_start`).
- Der Startspieler zieht in Zug 1 keine Karte: `createMatch` zieht nur die Starthände.
- Der Zweite zieht zu Beginn seines ersten Zuges 1 Karte, die normale Zugbeginn-Ziehung (`_draw(nxt, 1)` beim Zugwechsel). Er hat damit in seinem ersten Zug 6 Karten, der Startspieler hatte 5.
- Es gibt keine Extra-Karte über diese normale Ziehung hinaus. Der Vorteil entsteht, weil der Startspieler seine erste Ziehung auslässt. Der Test `tests/test_trophy_victory.js` prüft das (Starthände 5/5, Zweiter +1 beim Zugbeginn).

## Messung (t254-Bot, Stand t255-Karten, 96 je gerichtetes Paar, 23.040 Partien je Modus, ±1,8 je Nation)

| Modus | Startspieler mit Abzug 2 (t255, 69.120) | Startspieler ohne Abzug (t257) | Nationsspanne t255 | Nationsspanne t257 |
|---|---|---|---|---|
| Starter | 43.7 % | **47.8 %** | 45.4–55.8 % | 44.6–55.5 % |
| Misch | 43.8 % | **48.5 %** | 44.2–54.6 % | 41.8–55.8 % |

Startspieler-Quote ±0,65 Punkte (95 %). Alle 46.080 Partien regulär beendet, 0 abgelehnte Bot-Aktionen.

## Nationen t255 → t257

| Nation | Starter | Δ | Misch | Δ |
|---|---|---|---|---|
| Steinmark | 45.4 → 44.6 | -0.8 | 53.9 → 55.8 | +1.9 |
| Eldran | 49.7 → 50.6 | +0.9 | 54.0 → 55.1 | +1.1 |
| Dargan | 49.0 → 47.0 | -2.0 | 54.6 → 54.8 | +0.2 |
| Namar | 48.0 → 48.5 | +0.5 | 54.6 → 54.4 | -0.2 |
| Merovan | 54.4 → 54.3 | -0.1 | 53.3 → 53.4 | +0.1 |
| Vesper | 52.6 → 55.5 | +2.9 | 52.3 → 52.8 | +0.5 |
| Ossaria | 48.3 → 46.9 | -1.4 | 52.0 → 52.5 | +0.5 |
| Caldris | 50.4 → 51.6 | +1.2 | 51.7 → 51.7 | +0.0 |
| Lyr | 48.1 → 49.3 | +1.2 | 47.8 → 49.6 | +1.8 |
| Vael | 46.8 → 44.8 | -2.0 | 48.2 → 48.9 | +0.7 |
| Rothain | 55.8 → 54.4 | -1.4 | 51.1 → 48.6 | -2.5 |
| Orthea | 51.8 → 53.3 | +1.5 | 45.9 → 45.9 | +0.0 |
| Theryn | 51.1 → 50.6 | -0.5 | 45.0 → 45.6 | +0.6 |
| Karsk | 53.8 → 54.3 | +0.5 | 46.5 → 44.6 | -1.9 |
| Averon | 46.5 → 45.9 | -0.6 | 44.9 → 44.5 | -0.4 |
| Sahr | 48.4 → 48.5 | +0.1 | 44.2 → 41.8 | -2.4 |

Die Verschiebungen liegen fast alle innerhalb der Messstreuung. Die Differenz zweier Messungen streut um etwa ±2,1. Die größten Bewegungen:
- Vesper Starter +2,9.
- Rothain Misch −2,5.
- Sahr Misch −2,4, damit 41,8 %.
- Steinmark Misch +1,9, damit 55,8 %.

Eine systematische Verschiebung zwischen den Nationen ist nicht erkennbar. Sahr im Mischmodus bleibt der schwächste Wert; das war schon in t255 so (44,2 %).

Reproduktion: `node scripts/balance/sim_t255.mjs nations 96 new`
