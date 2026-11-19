# Balance t300 – Grobkorrektur p2 (Version 0.624)

Stand: 18.11.2026 (Berlin). Gemessen mit dem neuen Balance-Gate (`npm run balance-gate`, voll; [`BALANCE_GATE.md`](BALANCE_GATE.md)), beide Stände mit denselben Seeds und geseedetem Bot-Zufall, also exakt wiederholbar. „0.619“ ist der Stand nach t298 (Tag `v0.619`), gemessen mit derselben Harness.

## 1. Änderung

Freigegeben vom Projektleiter: Vorschlag **p2** aus [`BALANCE_T298.md`](BALANCE_T298.md) §4, genau wie gemessen.

| Doktrin | 0.619 | 0.624 |
|---|---|---|
| Linienkrieg (Sahr) | +1 DEF für alle; ab 2 im Abschnitt +1 weitere | +1 DEF nur bei drei eigenen im Abschnitt (`base_def` 0, `count` 3) |
| Auffangen (Eldran) | +1 DEF für alle; Unterzahl +1; Gleichstand +1 ATK | Unterzahl +1 DEF; Gleichstand +1 ATK (`base_def` 0) |
| Gepanzerter Fuß (Ossaria) | +1 DEF für alle; ausgerüstet +1 ATK | nur ausgerüstet +1 ATK/+1 DEF (`base_def` 0, `def` 1) |
| Entsatz (Namar) | angegriffener Abschnitt +1 ATK/+1 DEF; Einrücken +1/+1 | angegriffener Abschnitt +1 ATK; Einrücken zusätzlich +1/+1 (`held_def` 0) |

Regeldetails: `regeln/RULES_v0.5_GRUNDKONZEPT.md` §8.2.

## 2. Ergebnis vorher/nachher
**Starterdecks** (10.080 Partien, 1.260 je Nation, SE ≈ 1,4)

| Nation | 0.619 | 0.624 | Δ |
|---|---|---|---|
| Caldris | 58,2 | **62,5** | +4,3 |
| Vesper | 53,1 | **56,6** | +3,5 |
| Karsk | 52,2 | **53,8** | +1,6 |
| Ossaria | 59,9 | **52,5** | −7,4 |
| Lyr | 46,6 | **51,4** | +4,8 |
| Merovan | 47,5 | **50,9** | +3,3 |
| Sahr | 65,6 | **50,9** | −14,8 |
| Namar | 56,7 | **48,9** | −7,8 |
| Rothain | 45,6 | **48,9** | +3,3 |
| Eldran | 57,0 | **48,8** | −8,2 |
| Dargan | 43,7 | **46,4** | +2,8 |
| Theryn | 43,6 | **46,2** | +2,6 |
| Vael | 42,9 | **45,9** | +3,0 |
| Averon | 42,8 | **45,9** | +3,1 |
| Orthea | 42,2 | **45,6** | +3,5 |
| Steinmark | 42,3 | **44,8** | +2,5 |
| *Startspieler* | 49,8 | **48,9** | −0,9 |
| *SD* | 7,33 | **4,59** | |
| *Spanne* | 42,2 (Orthea) – 65,6 (Sahr) | **44,8 (Steinmark) – 62,5 (Caldris)** | |

**Mischdecks** (10.080 Partien, 1.260 je Nation, SE ≈ 1,4)

| Nation | 0.619 | 0.624 | Δ |
|---|---|---|---|
| Caldris | 59,8 | **64,3** | +4,4 |
| Merovan | 56,3 | **60,1** | +3,9 |
| Sahr | 74,0 | **56,3** | −17,8 |
| Vesper | 49,0 | **54,4** | +5,4 |
| Theryn | 46,8 | **52,7** | +5,9 |
| Karsk | 48,2 | **52,2** | +4,0 |
| Rothain | 44,4 | **49,5** | +5,2 |
| Steinmark | 44,0 | **48,6** | +4,6 |
| Vael | 42,6 | **48,0** | +5,4 |
| Orthea | 44,4 | **47,6** | +3,2 |
| Eldran | 59,4 | **46,6** | −12,8 |
| Averon | 40,8 | **45,3** | +4,5 |
| Dargan | 39,1 | **44,6** | +5,5 |
| Ossaria | 57,8 | **44,3** | −13,5 |
| Namar | 55,4 | **43,3** | −12,1 |
| Lyr | 38,2 | **42,1** | +4,0 |
| *Startspieler* | 57,4 | **57,0** | −0,4 |
| *SD* | 9,37 | **6,08** | |
| *Spanne* | 38,2 (Lyr) – 74,0 (Sahr) | **42,1 (Lyr) – 64,3 (Caldris)** | |

**Doktrinen** (Spiegelmatch, 1.024 Partien je Doktrin, SE ≈ 1,6)

| Doktrin | 0.619 | 0.624 | Δ |
|---|---|---|---|
| Scheinschwerpunkt | 61,6 | **63,7** | +2,1 |
| Bollwerk | 61,9 | **63,6** | +1,7 |
| Ausharren | 56,5 | **59,4** | +2,9 |
| Punktfeuer | 56,0 | **57,0** | +1,0 |
| Etappensicherung | 55,1 | **56,3** | +1,2 |
| Tiefenverteidigung | 54,8 | **55,9** | +1,1 |
| Lokalisierung | 53,8 | **55,7** | +1,9 |
| Weiterkämpfen | 54,2 | **54,9** | +0,7 |
| Rasten | 52,5 | **54,7** | +2,2 |
| Verlegung | 52,6 | **53,8** | +1,2 |
| Gegenstoß | 51,9 | **53,0** | +1,1 |
| Gepanzerter Fuß | 60,2 | **52,9** | −7,3 |
| Aufklärungsschlag | 51,4 | **52,7** | +1,3 |
| Umgehen | 51,9 | **52,1** | +0,2 |
| Entsatz | 63,9 | **51,5** | −12,4 |
| Abschluss | 47,1 | **50,5** | +3,4 |
| Feuerplan | 48,6 | **50,4** | +1,8 |
| Linienkrieg | 65,4 | **50,4** | −15,0 |
| Verteilte Stellung | 48,5 | **49,2** | +0,7 |
| Auffangen | 59,5 | **48,9** | −10,6 |
| Schwerpunkt | 47,6 | **48,7** | +1,1 |
| Abnutzung | 46,9 | **48,3** | +1,4 |
| Feuerwalze | 46,0 | **48,3** | +2,3 |
| Zielangriff | 47,0 | **48,1** | +1,1 |
| Materialersatz | 46,5 | **47,8** | +1,3 |
| Marsch aus dem Vollen | 48,0 | **47,7** | −0,3 |
| Lauer | 45,9 | **47,1** | +1,2 |
| Stoßtrupp | 46,3 | **47,0** | +0,7 |
| Sturmangriff | 44,7 | **46,8** | +2,1 |
| Ablösung | 44,0 | **46,5** | +2,5 |
| Sicherer Nachschub | 44,0 | **45,7** | +1,7 |
| Breites Aufgebot | 43,8 | **45,1** | +1,3 |
| Auswertung | 42,0 | **44,9** | +2,9 |
| Normverband | 42,0 | **43,1** | +1,1 |
| Abriegeln | 42,4 | **42,0** | −0,4 |
| Blitzkrieg | 40,1 | **41,2** | +1,1 |
| *SD* | 6,64 | **5,30** | |

## 3. Befund

- Die vier geänderten Doktrinen liegen jetzt bei 49–53 % (vorher 59,5–65,4 %). Sahr fällt von 74,0 auf 56,3 % (Misch), Eldran, Ossaria und Namar fallen um 8–13 Punkte.
- Die Streuung der Nationen sinkt deutlich (SD Starter 7,33 → 4,59, Misch 9,37 → 6,08), erreicht aber noch nicht den Stand vor t298 (1,4 / 2,1).
- Startspieler unverändert (Starter 48,9 %, Misch 57,0 %).
- **Außerhalb 40–60 % (Ausnahmeliste, Warnung):** Caldris 62,5 / 64,3 % (Etappensicherung: +1 DEF für alle, sonst keine Wirkung), Merovan Misch 60,1 %, Bollwerk 63,6 %, Scheinschwerpunkt 63,7 %. Caldris und Merovan steigen, weil ihre Gegner schwächer wurden.
- **Unter 45 % (im Band, beobachten):** Lyr 42,1 %, Namar 43,3 %, Ossaria 44,3 %, Dargan 44,6 % (Misch), Steinmark 44,8 % (Starter); Doktrinen Blitzkrieg 41,2 %, Abriegeln 42,0 %, Normverband 43,1 %, Auswertung 44,9 %.
- Gemessen nach dem Engine-Fix „Soforteinsatz-Schaden zerstört sofort“ (Altfehler, im selben Paket behoben); gegenüber dem Lauf davor höchstens ±0,4 Punkte.
- Die Zahlen weichen leicht von den t298-Vorschlagsläufen ab (z. B. Sahr Misch p2 55,7 %, jetzt 56,3 %): t298 lief mit der alten Harness und ungeseedetem Bot-Zufall (Schwankung etwa ±1,5 Punkte).

## 4. Nächste Schritte (Vorschlag, nicht umgesetzt)

1. **Etappensicherung** neu fassen (Caldris): +1 DEF nur in Abschnitten mit eigener Unterstützung oder nur für unbeschädigte Einheiten. Braucht Code und eine Gate-Messung.
2. **Bollwerk**: das +1 ATK ab 6 DEF aus t285 zurücknehmen (es glich damals eine nur angezeigte DEF aus) oder den DEF-Bonus auf Einheiten hinter Befestigungen beschränken.
3. **Scheinschwerpunkt**: nur +1 ATK oder nur +1 DEF in dünnen Abschnitten.
4. Danach Merovan (Mischpool) und die schwachen Nationen Lyr, Dargan, Averon nachziehen; Ausnahmeliste abbauen.

Jede dieser Änderungen läuft durch `npm run balance-gate`; nach einer gewollten Änderung den Vergleichsstand mit `--update-baseline` erneuern.
