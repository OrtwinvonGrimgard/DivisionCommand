# First-Player-Vorteil — Analyse (ohne Regeländerung)

Stand: 2026-11-04 · ≥1200 RR je Variante (`scripts/balance/sim_fp_advantage_analysis.mjs`)

## Kurzfazit

Der Vorsprung kommt **nicht** von einer AP-Rampe und **nicht** davon, dass Eingraben dem Startspieler den ersten Angriff schenkt. Am stärksten wirkt **Tempo im ersten Zug (effektive AP)** und im Trophy-Modus das **Beenden nach dem Zug des Startspielers** (VP-Finish ohne Antwort). Eingraben schützt die Ersteinheiten des Zweiten während des zweiten P1-Zugs — kürzeres Eingraben **vergrößert** den P1-Vorteil.

## FP-Winrate (Ablationen)

| Variante | FP% | Δ zu Modus-Basis |
|---|---|---|
| classic_base | **52.3** | +0.0 |
| trophy_base | **54.8** | +0.0 |
| trophy_p2_ap | **49.7** | -5.1 |
| trophy_p1_noatk | **54.4** | -0.4 |
| trophy_dig_short | **62.0** | +7.2 |
| trophy_dig_long | **52.4** | -2.5 |
| trophy_p2_reply | **52.3** | -2.5 |
| trophy_p1_ap4 | **50.8** | -4.0 |
| trophy_ap_ramp | **58.2** | +3.3 |
| classic_p2_ap | **52.4** | +0.1 |
| classic_dig_short | **56.7** | +4.3 |
| classic_p2_reply | **55.3** | +3.0 |

## Was die Daten sagen

- **AP-Kurve:** Jeder eigene Zug startet mit ~5 AP (flach). Kein „P1 ist immer eine AP-Stufe voraus“.
- **Eigene Züge (Trophy):** Starter 8.36 vs Zweiter 6.30 — Partien enden oft nach einem Starter-Zug.
- **Erster freier Angriff auf ungeschützte Front:** Starter nur 6% (also Zweiter ~94%). Timeline: P1 legt Zug1 (geschützt bis inkl. P2-Zug1); P2 legt Zug1 (geschützt bis inkl. P1-Zug2) → P1 kann P2-Eröffnung in Zug2 noch nicht schlagen; P2 kann P1-Eröffnung in Zug2 angreifen.
- **Sektor zuerst besetzt:** Starter ~96% — Brett-Tempo.
- **Erster Kill / Angriff:** relativ ausgeglichen (Kill-Starter 50%, Angriff 48%).
- **VP-Siege, P2 „einen Zug zu kurz“:** 39% der Trophy-VP-Siege.
- **Classic** mit 52.3% näher an 50% (längere Partien).
- **Kills Mittel Trophy:** Starter 2.74 vs Zweiter 2.33.

## Ablationen — was den Gap schließt

1. **P2 +1 AP im ersten Zug** → Trophy FP **49.7%** (Gap weg). Classic kaum Effekt.
2. **P1 nur 4 AP Zug1** → Trophy **50.8%**
3. **P2 Antwortzug bei VP-Finish** → Trophy **52.3%**; „one turn short“ sinkt.
4. **P1 kein Angriff Zug1** → wirkungslos (**54.4%**), frische Einheiten greifen sowieso nicht an.
5. **Kürzeres Eingraben** → Trophy **62%** / Classic **57%** — macht P1 stärker.
6. **Längeres Eingraben** → leicht Richtung Ausgleich (**52.3%**).
7. **Beide ersten Züge 4 AP** → schließt Gap nicht (**58%**).

## Erklärung in einem Satz

P1 gewinnt vor allem durch **früheren Brettzugriff (Sektor/Tempo)** und im Trophy durch **Spielende auf dem eigenen Zug**; nicht durch Eingraben-Erstschlag (der eher P2 begünstigt) und nicht durch eine AP-Rampe. Der stärkste gemessene Hebel gegen den Vorsprung ist **mehr Handlungsmacht für P2 im ersten Zug (+1 AP)**.
