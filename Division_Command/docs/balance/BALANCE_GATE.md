# Balance-Gate (seit t300, Version 0.624)

Das Spiel wächst laufend (rund 1.750 Karten, je Erweiterung etwa 250 neue). Balance ist darum kein einmaliger Abschluss, sondern wird **bei jeder Änderung gemessen**. Das Balance-Gate misst Nationen und Doktrinen Bot gegen Bot mit festen Seeds und wird rot, wenn etwas aus dem Band läuft.

## Wann laufen lassen

- **Nach jeder Karten- oder Regeländerung und nach jeder Erweiterung:** `npm run balance-gate` (voll, lokal) vor dem Push. Pflicht-Gate, siehe `docs/current_state.md` §8.
- **CI:** Bei jedem Push/PR auf `main` läuft automatisch `npm run balance-gate:quick` als eigener Job `balance-quick` (Bericht als Artefakt `balance-gate-quick`).

## Was gemessen wird

| Teil | Aufbau | voll (`full`) | schnell (`quick`, CI) |
|---|---|---|---|
| Nationen, Starterdecks | Round-Robin aller 16 Nationen, Startspieler abwechselnd | 3 Shards × 14 Partien je Paarung = 10.080 Partien, **1.260 je Nation** | 1 Shard × 14 = 3.360, 420 je Nation |
| Nationen, Mischdecks | wie oben, 30 Starter- + 30 Poolkarten | 10.080 Partien, 1.260 je Nation | 3.360, 420 je Nation |
| Doktrinen | Spiegelmatch je Nation: Sitz A tauscht Doktrin 2 gegen X, Sitz und Startspieler wechseln | **1.024 Partien je Doktrin** (64 je Nation) | 256 je Doktrin (16 je Nation) |
| Startspieler | Siegquote des Startspielers (nur Bericht) | | |

Seeds: Nationen `50000`, `150000`, `250000` je Shard; Doktrinen `90000 + Index · 10000` (Index in der vollen Doktrinliste, daher gleich, egal wie die Doktrinen auf Prozesse verteilt werden). Der Bot-Zufall (`Math.random` in `bot.js`, Gleichstände) wird in der Messung je Partie aus dem Partie-Seed neu gestartet (seit t300; vorher schwankten Wiederholungen um bis zu ±2 Punkte). Gleicher Code ergibt also genau dieselben Zahlen; jede Änderung im Bericht kommt aus einer Code- oder Datenänderung, nicht aus Zufall. `tests/test_balance_t300.js` prüft das.

**Rauschen:** Standardfehler SE = √(p(1−p)/n). Voll: je Nation ±1,4 Punkte, je Doktrin ±1,6 Punkte (Ziel ±1,5). Schnell: ±2,4 bzw. ±3,1.

**Laufzeit** (gemessen 18.11.2026, 8 Kerne): voll 432 s ≈ 7 min (57.024 Partien; unter Fremdlast bis 12 min), schnell 182 s ≈ 3 min (15.936 Partien). Die CI-Runner haben 4 Kerne; das volle Gate läge dort bei etwa 15 min und läuft deshalb nur lokal, die Schnellvariante bei etwa 6 min als eigener CI-Job.

## Wann es rot wird

| Status | Regel |
|---|---|
| ok | 45–55 % |
| beobachten (◦) | 40–45 % oder 55–60 % |
| **Fehler (✗, Exit 1)** | außerhalb 40–60 % (voll ohne Toleranz; schnell erst jenseits von 2 SE, also etwa 35–65 %) und nicht in der Ausnahmeliste |
| bekannte Ausnahme (⚠) | außerhalb 40–60 %, aber in `scripts/balance/balance_allowlist.json` mit Grund, Ziel und erlaubter Spanne `min`–`max`. Verlässt der Wert diese Spanne, ist es wieder ein Fehler. Liegt ein gelisteter Wert wieder im Band, meldet der Bericht „Ausnahme nicht mehr nötig“. |

Engine-Fehler und erzwungene Zugenden stehen im Bericht.

## Ausnahmeliste

`scripts/balance/balance_allowlist.json`, Einträge mit `kind` (`nation`/`doctrine`), `id` (Nation oder Doktrin-ID), optional `modes` (`starter`, `mixed`, `mirror`), `min`/`max` (erlaubte Spanne als Quote), `reason`, `target`, `since`. Eine Ausnahme ist eine bewusste, befristete Duldung, keine Lösung. Der Test `tests/test_balance_t300.js` prüft Pflichtfelder und IDs.

## Vergleichsstand

`scripts/balance/baseline/balance_gate_full.json` und `…_quick.json` halten den letzten bewusst angenommenen Stand. Der Bericht zeigt je Nation und Doktrin die Änderung dazu. Nach einer gewollten Balance-Änderung den Vergleichsstand mit `--update-baseline` neu schreiben und mit committen.

## Aufruf

```
npm run balance-gate                    # voll, Bericht scripts/balance/out/balance_gate_full.md/.json
npm run balance-gate:quick              # wie CI
node scripts/balance/balance_gate.js --mode full --update-baseline       # Vergleichsstand erneuern
node scripts/balance/balance_gate.js --mode full --root /pfad/zu/altem/klon --label v0.619   # alten Stand messen
node scripts/balance/balance_gate.js --mode full --from scripts/balance/out/balance_gate_full.json   # neu bewerten (z. B. nach Änderung der Ausnahmeliste)
```

Weitere Optionen (`--jobs`, `--baseline`, `--out`) im Kopf von `scripts/balance/balance_gate.js`. Die Harness-Skripte (`sim_nations_t298.js`, `sim_doctrines_t298.js`) lassen sich weiter einzeln aufrufen; `SIM_PATCH` misst Parametervorschläge ohne Codeänderung.

## Aktuelle Ausnahmen (Stand 0.624)

| Eintrag | Messwert 0.624 | erlaubt bis | Grund | Ziel |
|---|---|---|---|---|
| Caldris (Starter, Misch) | 62,5 / 64,3 % | 68 % | Etappensicherung: +1 DEF für alle, sonst keine Wirkung | Doktrin neu fassen, 45–55 % |
| Merovan (Misch) | 60,1 % | 63 % | Mischpool legt nach t300 zu, Ursache offen | Poolkarten auswerten, ≤ 57 % |
| Bollwerk | 63,5 % | 66 % | DEF-Bonus seit 0.619 echt, +1 ATK ab 6 DEF aus t285 | ATK-Zusatz zurücknehmen o. Ä., 45–55 % |
| Scheinschwerpunkt | 63,6 % | 66 % | +1 ATK/+1 DEF, DEF seit 0.619 echt | nur ATK oder nur DEF, 45–55 % |

Blitzkrieg (41,2 %) und Auswertung (44,5 %) liegen im Band und brauchen keinen Eintrag; der Bericht führt sie als „beobachten“.
