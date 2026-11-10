# Balance t248 – Napalm-Preis

**Stand:** 10.11.2026 (Europe/Berlin). Napalm (`dc_so_napalm`, Soforteinsatz, Grundset) kostete 0 AP bei 3 Sofortschaden plus 1 Schaden zu Beginn jedes Zuges des Besitzers, bis die Einheit stirbt. Die Engine setzt das so um (`_doNapalm` / `_applyNapalm`, DoT in `_actEnd` auf der Front des neuen Zugspielers). Der Effektparameter (`now: 3`, `tick: 1`) ist im Katalog festgehalten; die Engine nutzt dieselben Zahlen fest kodiert.

## Kurve der vergleichbaren Soforteinsätze

| Effekt | Häufigster AP-Preis | Anmerkungen |
|---|---|---|
| `DEAL_DAMAGE 2` | 2 AP (19 Karten) | Standard-Einzelschaden |
| `DEAL_DAMAGE 3` | 2 oder 3 AP (je 3 Karten) | Burst ohne Folgeschaden |
| `DEAL_DAMAGE 4` | 4 AP (4 Karten) | |
| `DEAL_DAMAGE 5` / Luftschlag 5 | 4 AP bzw. **0 AP** (Luftschlag, nicht in diesem Pass geändert) | |
| Napalm 3 + DoT 1/Besitzerzug | bisher 0, jetzt **3 AP** | DoT oft ohne Tick, weil 3 Schaden bereits tötet |

`docs/balance/BALANCE_AP_STUFEN_v0.1.md` schlug früher 2 AP / Silber vor. Das liegt unter typischem `DEAL_DAMAGE 3` und wertet den Sofortschaden zu günstig. 4 AP entspräche einem garantierten 4er-Burst; der DoT ist aber nicht sicher (Simulation: im Mittel 0,6 Ticks, wenn die Karte fällt). Deshalb **3 AP**. Seltenheit und Kopienlimit bleiben wie im Grundset (`max_copies` 2, keine gesetzte Seltenheit).

## Simulation

Bot gegen Bot, Trophy-Modus, realistische Mischdecks (`buildMixedDeck`). Spieler 0 erhält genau eine Napalm-Kopie (ein Soforteinsatz im Deck wird ersetzt), Spieler 1 nicht. 800 Partien je Variante, Startspieler wechselt, Nationen rotieren.

| Variante | Siegquote Spieler 0 | Napalm gespielt | DoT-Ticks je gespielter Karte |
|---|---|---|---|
| 0 AP | 54,6 % | 26,1 % der Partien | 0,67 |
| 3 AP | 52,8 % | 19,8 % der Partien | 0,59 |

Die Karte bleibt nutzbar, der unverdiente Vorteil durch den Nullpreis geht zurück. Skript: `scripts/balance/sim_napalm_ap.mjs`.

## Weitere AP-0-Soforteinsätze (nur Liste, unverändert)

Mehrere Grundset-Soforteinsätze stehen ebenfalls bei 0 AP und wirken für einen Nullpreis unverhältnismäßig stark, darunter:

- `dc_so_luftschlag` Luftschlag — 5 Schaden an Einheit oder Unterstützung
- `dc_so_dammbruch` Dammbruch — entfernt die gesamte gegnerische Unterstützungsreihe
- `dc_so_massen` Psychologie der Massen — beliebig viele Fronteinheiten von der Hand ohne AP
- `dc_so_mobil` Generalmobilmachung — ziehe 3, +2 AP
- `dc_so_blinder_gehorsam` Blinder Gehorsam — alle eigenen Fronteinheiten greifen ohne AP an und erhalten +2 ATK
- `dc_so_gassen` Einsame Gassen — so viele Einheiten aus dem Deck wie freie Frontplätze, kostenlos ausgelegt
- `dc_so_mobilisierung` Mobilisierung — bis zu 2 Infanterie auf die Hand, eine davon sofort spielbar
- `dc_so_deckung` Deckung suchen — +3 DEF bis zum nächsten Angriff
- `dc_so_selbst` Selbstopfer — eigene Einheit opfern, zwei gegnerische Karten zerstören
- `dc_so_letzter` Der Letzte der steht — Front bis auf eine opfern, starke Boni

Doktrinen und das Minenfeld-Token haben konstruktionsbedingt AP 0 und gehören nicht in diese Liste. Reaktive Gegenmittel wie Boden-Luft-Rakete (0 AP, verhindert einen Luftangriff) sind gesondert zu bewerten.
