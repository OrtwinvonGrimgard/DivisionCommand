# Balance t250 – echte Wirkungen der fünf Soforteinsätze

**Stand:** 10.11.2026 (Europe/Berlin). Fortsetzung von t249 (AP-Preise). Die Engine setzt jetzt den gedruckten Kartentext um; der Text bleibt unverändert. Sonderfälle: `docs/regeln/SOFORT_SONDERFAELLE.md`. Stub-Scan des restlichen Katalogs (nur Liste): `docs/balance/STUB_SCAN_T250.md`.

## Was die Karten jetzt tun

| Karte | Drucktext (kurz) | Engine jetzt |
|---|---|---|
| Psychologie der Massen (`dc_so_massen`, 6 AP) | Beliebig viele Fronteinheiten von der Hand ohne AP | Nacheinander Wahl und offenes Auslegen; Bestätigen/Abbrechen beendet auch nach nur einer oder keiner weiteren Einheit. Endet außerdem bei voller Front oder leerer Einheitshand. |
| Blinder Gehorsam (`dc_so_blinder_gehorsam`, 6 AP) | Front greift in diesem Zug ohne AP an und erhält +2 ATK | +2 ATK diesen Zug, Angriffe 0 AP. Einheiten mit legalem Ziel führen als Teil des Einsatzes nacheinander einen Angriff aus (auch wenn sie schon angegriffen haben). Verdeckt, frisch gelegt, gesperrt oder ohne Ziel: kein Schlag, Bonus bleibt. Folge setzt nach Feindkontakt/SAM fort. |
| Einsame Gassen (`dc_so_gassen`, 6 AP) | So viele Einheiten aus dem Deck wie freie Frontplätze, kostenlos offen | Suche im Deck; bei mehr Einheiten als Plätze genaue Wahl; offen und ohne AP auf gewählte Slots. Rest wird gemischt zurückgelegt. |
| Der Letzte der steht (`dc_so_letzter`, 3 AP) | Front bis auf eine opfern; +1/+1 je Opfer; beim Tod 1 SP für den Gegner | Spieler wählt die Überlebende; die übrigen werden zerstört. Dauerhaft +1 ATK/+1 DEF je Opfer. Flag `letzterDerSteht` (vorher `lastStand`, der SP-Pfad las den anderen Namen). |
| Mobilisierung (`dc_so_mobilisierung`, 3 AP) | Bis zu 2 Infanterie aus dem Deck, eine davon frei spielbar | Bei mehr als 2 Infanterie im Deck Wahl bis zu 2 (Bestätigen nach 0 oder 1 erlaubt). Danach optionales freies Auslegen einer genommenen Karte. |

Bots (`DCBot`) bedienen die neuen Auswahlen über `listActions`/`dispatch` (Handkarten hoch, vorzeitiges Bestätigen niedrig, solange noch Wahlmöglichkeiten da sind). Offene Folgen stehen in `pending` im Spielzustand; LAN/Online synchronisiert wie bisher über `dispatch` und `getState()`. Unterbrochene Folgen (Reaktion, SAM) laufen in `dispatch` weiter, sobald das Fenster geschlossen ist.

## Preise (t249, mit echter Wirkung nachgerechnet)

Methode wie t249: eine Kopie ins Deck von Spieler 0, 400 Partien je Variante, Startspieler wechselt, Nationen rotieren. Skript: `scripts/balance/sim_t250.mjs`. Streuung bei 400 Partien etwa ±2,5 Punkte; angepasst würde nur bei deutlicher Abweichung.

| Karte | AP (unverändert) | WR 0 → Preis (Spielrate) | Urteil |
|---|---|---|---|
| Psychologie der Massen | **6** | 51,0 % (30,8 %) → 49,0 % (6,8 %) | Auch umsonst nur knapp über 50 % in dieser Bot-Serie (Bots nutzen die Massen-Folge zurückhaltend). 6 AP bleibt der Preis nach Drucktext. |
| Blinder Gehorsam | **6** | 52,3 % (29,0 %) → 52,0 % (6,5 %) | Bei 6 AP selten, WR unverändert nah an 50 %. Behalten. |
| Einsame Gassen | **6** | 60,0 % (30,3 %) → 52,0 % (7,3 %) | Umsonst klar zu stark (60 %). Mit 6 AP in der Mitte. Behalten. |
| Mobilisierung | **3** | 53,5 % (28,3 %) → 53,8 % (22,0 %) | Spielrate bleibt hoch, WR-Differenz im Rauschen. Behalten. |
| Der Letzte der steht | **3** | 43,3 % (22,8 %) → 44,5 % (18,8 %) | In der Auto-Include-Serie auch umsonst unter 50 % (Opfer oft Temoverlust). Der gedruckte Swing bleibt in der richtigen Brettlage stark; kein Preisnachlass nur wegen Bot-Overcommit. Behalten. |

Keine AP- oder Textänderung, daher keine neuen Vorderseiten und kein Service-Worker-Cache-Sprung (bleibt `divcmd-alpha40r`).

Die fünf Karten liegen weiterhin nicht in Starterdecks oder im Mischdeck-Generator; die Gesamtspanne von v0.6b verschiebt sich dadurch nicht.
