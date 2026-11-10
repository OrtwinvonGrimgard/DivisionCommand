# Balance t249 – zehn AP-0-Soforteinsätze

**Stand:** 10.11.2026 (Europe/Berlin). Fortsetzung von t248 (Napalm). Zehn Grundset-Soforteinsätze, die bei 0 AP zu günstig wirkten, wurden wie Napalm geprüft, bepreist und neu gerendert. Boden-Luft-Rakete, Doktrinen und Token bleiben unverändert.

Methode: Katalognachbarn (Schaden, Ziehen, Zerstören, Verteidigungsbonus), `BALANCE_AP_STUFEN_v0.1.md`, Engine-Durchgang, Bot-gegen-Bot in Trophy-Mischdecks. Spieler 0 erhält genau eine Kopie (ein anderer Soforteinsatz wird ersetzt), Spieler 1 nicht. 400 Partien je Variante, Startspieler wechselt, Nationen rotieren. Skript: `scripts/balance/sim_ap0_t249.mjs`.

Keine der zehn Karten liegt in einem Starterdeck oder in `buildMixedDeck` (128 Stichproben-Mischdecks ohne Treffer). Der Gesamtcheck gegen v0.6b darf sich daher nicht verschieben; gemessen wird trotzdem Starter und Mischdeck (je 960 Partien, 4 je gerichtetes Paar).

## Preise

| Karte | Wirkung (Drucktext) | Engine | alt → neu AP | Begründung | Sim WR (Spielrate) 0 → neu |
|---|---|---|---|---|---|
| Luftschlag (`dc_so_luftschlag`) | 5 Schaden an feindlicher Einheit oder Unterstützung | Trifft zu (SAM kann blocken; nur eigener Zug). | 0 → **4** | `DEAL_DAMAGE 5` (`Volltreffer berechnet`) kostet 4 AP; flexibler als reiner Einheitsschaden, aber abfangbar. | 51,5 % (25,3 %) → 48,8 % (23,8 %) |
| Dammbruch (`dc_so_dammbruch`) | Entfernt die gesamte gegnerische Unterstützung | Trifft zu. | 0 → **6** | Einzelsupport entfernen (`Absetzung`) kostet 1 AP; komplette Reihe ist Gold, Vorschlag der Stufendoku. | 48,5 % (30,5 %) → 52,3 % (5,8 %) |
| Psychologie der Massen (`dc_so_massen`) | Beliebig viele Fronteinheiten von der Hand ohne AP | **Abweichung:** nach einer kostenlosen Einheit endet die Folge (`_actSlot` löscht `pending`, `mass` wird nicht fortgesetzt). | 0 → **6** | Preis nach Drucktext (Massen-Tempo), Stufendoku 6. Sim fällt stärker, weil die Engine nur eine Einheit auslegt. | 53,0 % (30,8 %) → 46,0 % (7,0 %) |
| Generalmobilmachung (`dc_so_mobil`) | Ziehe 3, +2 AP in diesem Zug | Trifft zu. | 0 → **4** | Nach 4 AP bleiben netto 2 AP für 3 Karten; `Die große Flotte` nimmt 4 AP für 3 Karten plus Rabatt. Stufendoku 4. | 54,0 % (30,3 %) → 49,0 % (16,0 %) |
| Blinder Gehorsam (`dc_so_blinder_gehorsam`) | Alle eigenen Fronteinheiten greifen ohne AP an und erhalten +2 ATK | **Stub** seit 0.32c: `_startCommandAttack` schreibt nur ins Log, kein Bonus, keine Angriffe. | 0 → **6** | Preis nach Drucktext (Gold, Stufendoku 6). Sim ohne echte Wirkung. | 55,5 % (30,3 %) → 51,0 % (6,5 %) |
| Einsame Gassen (`dc_so_gassen`) | So viele Einheiten aus dem Deck wie freie Frontplätze, kostenlos offen ausgelegt | **Stub:** `_startGassen` loggt nur, die Front bleibt leer. | 0 → **6** | Drucktext ist spielentscheidend; 6 AP (Stufendoku 7) bleibt im normalen 0–7-Band und noch aus Rücklagen bezahlbar. | 50,5 % (30,5 %) → 51,0 % (6,0 %) |
| Mobilisierung (`dc_so_mobilisierung`) | Bis zu 2 Infanterie aus dem Deck auf die Hand, eine davon sofort ohne AP | Weitgehend zutreffend. Bei mehr als 2 Infanterie im Deck müssen genau 2 gewählt werden (`upto` wird nicht ausgewertet). | 0 → **3** | Tutoring plus ein freier Einsatz, Stufendoku 3. | 54,0 % (29,5 %) → 50,8 % (22,3 %) |
| Deckung suchen (`dc_so_deckung`) | Eine Fronteinheit +3 Verteidigung, bis sie angreift | **Korrigiert (trivial):** zuvor nur Marke ohne V-Bonus, Karte nicht auf dem Friedhof. Jetzt +3 auf `def`/`defMax`, fällt beim Angriff (`_dropCover`). Spielbar als Reaktion (keine Zug-Sperre). Zielwahl erlaubt auch gegnerische Front (Text: „deiner Wahl“). | 0 → **2** | +2 V bis Zugende liegt bei 1–2 AP; +3, das bis zum Angriff hält, ist mehr wert. 0 wäre als Kampfftrick zu günstig. | 47,8 % (31,5 %) → 48,3 % (25,3 %) |
| Selbstopfer (`dc_so_selbst`) | Eigene Fronteinheit zerstören, zwei gegnerische Karten in Reichweite zerstören | Trifft zu (`legalAttackTargets` der geopferten Einheit). | 0 → **2** | Das Opfer ist der Hauptpreis, rechtfertigt aber nicht 0: `Kronbefehl` zerstört eine feindliche Karte für 2 AP. | 47,8 % (30,0 %) → 46,0 % (24,8 %) |
| Der Letzte der steht (`dc_so_letzter`) | Front bis auf eine opfern; +1/+1 je Opfer; beim Tod 1 SP für den Gegner | **Stub / Abweichung:** setzt `flags.lastStand`, opfert niemanden, gibt keinen Bonus. Der Todes-SP-Pfad prüft `flags.letzterDerSteht` (anderer Name), daher auch kein SP. | 0 → **3** | Preis nach Drucktext, Stufendoku 3 (Gold mit Selbstrisiko). | 49,8 % (23,0 %) → 48,3 % (19,0 %) |

Siegquoten haben bei 400 Partien eine Streuung von etwa ±2,5 Punkte; Verschiebungen unter 3 Punkten allein sind unsicher. Bei funktionierenden Karten sinkt typischerweise die Spielrate, die Siegquote wandert Richtung 50 %. Dammbruch 48,5 → 52,3 % bei seltenerem Spiel ist in diesem Rahmen Rauschen.

## Engine-Auffälligkeiten (nicht trivial, unverändert außer Deckung)

Nicht behoben, nur gemeldet:

1. **Psychologie der Massen** legt nur eine Einheit kostenlos aus, obwohl der Text beliebige Viele erlaubt.
2. **Blinder Gehorsam** und **Einsame Gassen** sind seit 0.32c Stubs (`_startCommandAttack`, `_startGassen` geben nur `{ ok: true }` zurück).
3. **Der Letzte der steht** opfert nicht, stärkt nicht; Flag-Name `lastStand` vs. `letzterDerSteht` im Zerstörungs-Pfad.
4. **Mobilisierung:** „bis zu 2“ erzwingt bei mehr als 2 Infanterie im Deck genau 2 Karten.

Eine vollständige Nachrüstung der Stubs wäre ein eigener Engine-Pass, kein trivialer Textabgleich.

## Gesamtbalance (Starter + Mischdecks)

v0.6b-Zielkorridor (t240, 69.120 / 69.120 Partien): Misch 47,0–52,9 %, Starter 47,0–53,3 %, Startspieler 50,0 % bzw. 50,2 %.

Kurzmessung t249 (je 960 Partien, 4 je gerichtetes Nationspaar, 120 je Nation): Startspieler **49,5 %** (Misch) und **49,2 %** (Starter). Die Nationsspanne in diesem kleinen Sample (Misch 38–60 %, Starter 41–70 %) ist nicht mit den t240-Werten vergleichbar (Standardfehler je Nation ≈ 4,5 Punkte). Ursache der Preisanpassung kann das nicht sein: die zehn Karten kommen in Standard-Starter- und Mischdecks nicht vor. Skript: `scripts/balance/sim_overall_t249.mjs`.

## Render und Cache

Zehn Vorderseiten neu (alpha40, 1024×1428). Service-Worker-Cache `divcmd-alpha40r`. Kontaktbogen `/workspace/t212-cards/sheets/ap0-01.png`.
