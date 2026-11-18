# Balance t298 – Doktrin-DEF echt (Version 0.619)

Stand: 18.11.2026 (Berlin). Bot gegen Bot, gleiche Seeds vor und nach der Änderung. **Werte wurden in t298 nicht verändert**; die Vorschläge unten sind gemessen, aber nicht umgesetzt.

## 1. Was sich geändert hat

Bis 0.611 waren alle bedingten und passiven DEF-Boni (Doktrinen, Auren, Ausrüstungs-Buffs) **nur Anzeige**: `currentAtkDef` zeigte sie, Schaden und Tod liefen aber über `inst.def` ohne Bonus. Seit 0.619 ist die angezeigte DEF die echte DEF (Regel §8.1 in `regeln/RULES_v0.5_GRUNDKONZEPT.md`). Flankenschutz (`FLANK_DEF`) und Frontauren (`AURA_FRONT_DEF`) wurden vorher eingebacken **und** angezeigt, also doppelt gezählt, und nur beim Ausspielen/Tausch neu berechnet; das ist jetzt ein einziger Abgleich nach jeder Aktion und vor jedem Schaden.

Damit werden die pauschalen „+1 DEF für alle eigenen Einheiten“-Doktrinen auf einen Schlag spürbar stärker. Das ist der Hauptgrund für die Verschiebung.

## 2. Nationen (vorher 0.611 → nachher 0.619, dazu Vorschlagsläufe)

Messung: Round-Robin aller 16 Nationen, 3 Shards × 14 Partien je Paarung, Startspieler abwechselnd. Rauschen etwa ±1,4 Punkte je Nation.

- **p1:** Linienkrieg `base_def` 0, Auffangen `base_def` 0, Gepanzerter Fuß `base_def` 0 und `def` 1 (ausgerüstet +1 DEF statt alle +1).
- **p2:** p1 + Linienkrieg `count` 3 (Zusatz erst ab drei Einheiten im Abschnitt) + Entsatz `held_def` 0.
- **p3:** p2 + Etappensicherung `base_def` 0. Nur eine Schranke: Ohne den DEF-Bonus hat Etappensicherung keine Wirkung mehr; ein echter Vorschlag braucht Code (z. B. +1 DEF nur in Abschnitten mit eigener Versorgung).

**Starterdecks** (je 10.080 Partien)

| Nation | 0.611 | 0.619 | Δ | p1 | p2 | p3 |
|---|---|---|---|---|---|---|
| Sahr | 50,5 | **65,1** | +14,6 | 55,7 | 51,5 | 53,0 |
| Caldris | 50,9 | **61,0** | +10,1 | 60,6 | 63,5 | 49,3 |
| Ossaria | 53,1 | **59,8** | +6,7 | 52,1 | 54,1 | 55,9 |
| Eldran | 49,8 | **57,9** | +8,1 | 46,8 | 47,1 | 50,6 |
| Namar | 49,1 | **55,9** | +6,8 | 57,9 | 47,5 | 48,6 |
| Karsk | 50,1 | **51,9** | +1,8 | 53,2 | 54,2 | 54,4 |
| Vesper | 48,1 | **50,5** | +2,4 | 52,5 | 52,7 | 56,8 |
| Lyr | 49,4 | **46,7** | −2,7 | 49,3 | 51,1 | 51,8 |
| Merovan | 46,9 | **46,2** | −0,7 | 48,6 | 48,6 | 48,1 |
| Theryn | 50,5 | **45,2** | −5,3 | 45,1 | 44,5 | 48,2 |
| Rothain | 49,6 | **44,8** | −4,8 | 46,7 | 49,7 | 47,4 |
| Orthea | 48,4 | **43,7** | −4,7 | 45,2 | 46,5 | 46,9 |
| Vael | 51,7 | **43,4** | −8,3 | 47,5 | 48,8 | 46,7 |
| Steinmark | 50,2 | **43,2** | −7,0 | 45,3 | 49,0 | 48,5 |
| Averon | 50,8 | **42,6** | −8,2 | 48,0 | 46,4 | 47,5 |
| Dargan | 50,9 | **42,1** | −8,8 | 45,5 | 44,9 | 46,3 |
| *Startspieler* | 48,5 | **49,7** | | 49,9 | 49,3 | 48,7 |
| *SD* | 1,42 | **7,37** | | 4,69 | 4,53 | 3,28 |

**Mischdecks** (je 10.080 Partien)

| Nation | 0.611 | 0.619 | Δ | p1 | p2 | p3 |
|---|---|---|---|---|---|---|
| Sahr | 50,0 | **75,2** | +25,2 | 61,0 | 55,7 | 58,0 |
| Eldran | 49,5 | **58,6** | +9,1 | 46,6 | 47,1 | 46,1 |
| Caldris | 48,0 | **58,2** | +10,2 | 62,7 | 64,4 | 46,7 |
| Merovan | 53,7 | **58,0** | +4,3 | 57,4 | 60,7 | 62,5 |
| Ossaria | 48,7 | **57,7** | +9,0 | 42,7 | 42,8 | 46,0 |
| Namar | 47,5 | **55,0** | +7,5 | 58,8 | 42,2 | 45,1 |
| Karsk | 50,0 | **49,5** | −0,5 | 53,7 | 54,1 | 57,2 |
| Vesper | 49,8 | **48,9** | −0,9 | 50,7 | 55,3 | 56,0 |
| Theryn | 54,0 | **45,9** | −8,1 | 48,2 | 50,0 | 50,3 |
| Vael | 52,1 | **44,5** | −7,6 | 48,2 | 47,4 | 48,8 |
| Steinmark | 48,1 | **44,4** | −3,7 | 48,3 | 47,6 | 50,3 |
| Orthea | 50,8 | **44,2** | −6,6 | 45,7 | 48,8 | 48,9 |
| Rothain | 51,1 | **42,4** | −8,7 | 47,9 | 49,3 | 49,2 |
| Dargan | 50,7 | **39,7** | −11,0 | 42,1 | 44,7 | 45,1 |
| Lyr | 45,9 | **39,3** | −6,6 | 42,9 | 45,0 | 44,8 |
| Averon | 50,1 | **38,4** | −11,7 | 43,1 | 44,9 | 45,0 |
| *Startspieler* | 56,9 | **57,6** | | 56,5 | 56,7 | 57,0 |
| *SD* | 2,08 | **9,52** | | 6,55 | 6,19 | 5,33 |

**Befund:** Startspieler bleibt unverändert (Starter ≈ 49–50 %, Misch ≈ 57 %). Die Nationen-Streuung steigt stark: Sahr 65,1 % (Starter) bzw. **75,2 %** (Misch), Caldris 61,0 %, Averon 38,4 %, Lyr 39,3 %, Dargan 39,7 % (Misch). Das ist über der Schwelle (>60 % / <40 %) und entsteht nur durch diese Änderung.

## 3. Doktrinen im Spiegelmatch (Sitz A tauscht Doktrin 2, 1.024 Partien je Doktrin)

| Doktrin | 0.611 | 0.619 | Δ |
|---|---|---|---|
| Bollwerk | 53,4 | 65,1 | +11,8 |
| Linienkrieg | 45,2 | 64,7 | +19,5 |
| Entsatz | 52,4 | 63,4 | +11,0 |
| Auffangen | 46,7 | 61,1 | +14,4 |
| Scheinschwerpunkt | 50,6 | 57,9 | +7,3 |
| Gepanzerter Fuß | 46,2 | 56,5 | +10,3 |
| Punktfeuer | 55,8 | 55,5 | −0,2 |
| Ausharren | 50,8 | 55,3 | +4,5 |
| Etappensicherung | 44,1 | 55,1 | +11,0 |
| Rasten | 57,4 | 54,8 | −2,6 |
| Tiefenverteidigung | 53,4 | 54,8 | +1,4 |
| Lokalisierung | 56,8 | 54,2 | −2,6 |
| Weiterkämpfen | 52,4 | 53,9 | +1,5 |
| Verlegung | 55,8 | 52,0 | −3,8 |
| Umgehen | 54,8 | 51,6 | −3,2 |
| Aufklärungsschlag | 53,0 | 51,0 | −2,0 |
| Gegenstoß | 53,1 | 50,1 | −3,0 |
| Zielangriff | 52,9 | 49,0 | −3,9 |
| Feuerplan | 50,1 | 48,0 | −2,1 |
| Feuerwalze | 51,4 | 48,0 | −3,4 |
| Schwerpunkt | 50,4 | 47,9 | −2,5 |
| Stoßtrupp | 51,2 | 47,9 | −3,3 |
| Abschluss | 49,6 | 47,2 | −2,4 |
| Marsch aus dem Vollen | 49,8 | 47,2 | −2,6 |
| Verteilte Stellung | 43,1 | 47,1 | +3,9 |
| Ablösung | 50,3 | 46,3 | −4,0 |
| Materialersatz | 48,8 | 46,0 | −2,8 |
| Lauer | 50,0 | 45,8 | −4,2 |
| Sturmangriff | 48,1 | 45,1 | −3,0 |
| Breites Aufgebot | 47,1 | 44,8 | −2,3 |
| Abnutzung | 48,5 | 44,5 | −4,0 |
| Normverband | 45,7 | 44,1 | −1,5 |
| Sicherer Nachschub | 47,4 | 44,1 | −3,3 |
| Abriegeln | 48,0 | 43,5 | −4,5 |
| Auswertung | 42,8 | 40,7 | −2,0 |
| Blitzkrieg | 40,9 | 37,9 | −3,0 |

**Befund:** Gewinner sind genau die Doktrinen mit pauschalem DEF-Bonus: Linienkrieg (+19,5), Auffangen (+14,4), Bollwerk (+11,8), Entsatz (+11,0), Etappensicherung (+11,0), Gepanzerter Fuß (+10,3). Alle anderen verlieren 2–4 Punkte, weil der Gegner im Spiegelmatch die Nationsdoktrinen behält. Blitzkrieg (37,9 %) und Auswertung (40,7 %) lagen schon vorher unten.

## 4. Vorschlag (nicht umgesetzt, braucht Entscheidung)

1. **p2 übernehmen** (Linienkrieg, Auffangen, Gepanzerter Fuß, Entsatz): senkt die Streuung deutlich (Misch SD 9,5 → 6,2), Sahr 75 → 56 %.
2. **Etappensicherung neu fassen** (Caldris bleibt sonst bei 61–64 %): +1 DEF nur in versorgten Abschnitten oder nur für Einheiten mit voller DEF. Braucht Code und eine eigene Messung; p3 zeigt die Schranke (Caldris 47–49 %).
3. **Bollwerk** (+11,8) im selben Zug prüfen: `BOLLWERK_FRONT_DEF` gilt jetzt echt.
4. Danach bleiben Merovan (Misch 62,5 % in p3) und die schwachen Nationen Averon, Dargan, Lyr (≈ 45 %) als eigene Runde.

Alternative ohne Wertänderung: Regelentscheid zurücknehmen (DEF-Boni nur als Schadenspuffer pro Zug). Das widerspricht der Entscheidung des Projektleiters und wird nicht empfohlen.

## 5. Reproduzieren

Harness liegt seit t298 im Repo: `scripts/balance/sim_nations_t298.js`, `sim_doctrines_t298.js`, `merge_sim_t298.js` (JSDoc-Kopf mit Aufruf). Ausgabe nach `scripts/balance/out/` (gitignored). Vorschläge ohne Codeänderung über die Umgebungsvariable `SIM_PATCH`, z. B. p2:

```
SIM_PATCH='{"dc_dok_linienkrieg":{"LINIENKRIEG":{"base_def":0,"count":3}},"dc_dok_auffangen":{"AUFFANGEN":{"base_def":0}},"dc_dok_gepanzerter_fuss":{"GEPANZERTER_FUSS":{"base_def":0,"def":1}},"dc_dok_entsatz":{"ENTSATZ":{"held_def":0}}}' \
  SIM_SEED=50000 SIM_TAG=p2_s0 node scripts/balance/sim_nations_t298.js mixed 14
```

Seeds: Shard i nutzt `SIM_SEED = 50000 + i·100000` (i = 0…2); Doktrinen `SIM_SEED` 90000 und 590000 mit je 32 Partien pro Nation.
