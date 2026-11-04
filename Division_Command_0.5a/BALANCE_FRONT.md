# Front-Snowball — Diagnose & Anti-Snowball-Prototypen

Stand: 2026-11-04 · Alpha 0.5a · **Siegbedingungen unverändert** (siehe `SIEGBEDINGUNGEN.md`).

Nutzerfeedback: *„Oft hat man die Front relativ schnell an den Gegner verloren. Meistens hat sich eine Kette von Einheiten gebildet, die dann direkt jede Karte zerstört hat, die man legt.“*

Simulation: `scripts/sim_front_snowball.mjs` — Bot-vs-Bot, 200 Partien je Modus, Nationen rotiert.

---

## 1. Root Causes (Code)

| # | Ursache | Code | Wirkung |
|---|---|---|---|
| A | **Kein Deploy-Schutz.** Frisch gelegte Einheiten sind sofort angreifbar. Summoning Sickness (`summonedTurn`) blockiert nur *eigene* Aktionen, nicht gegnerische Angriffe. | `engine.js` `_canAct` ~309–321; Deploy setzt `summonedTurn = turn` (~988–1130), ohne `noCombatUntil` | Neue Karte stirbt oft, bevor sie jemals handelt |
| B | **Spalten-Reichweite / Ketten.** Normale Einheiten erreichen per Distanzformel (`secBase`+`row`, `range=3` → `dist ≤ 1`) mehrere Reihen derselben Sektion — nicht nur „gegenüber + seitlich“. | `legalAttackTargets` ~744–790 | Ein Board-Cluster kann frische Deploys über Reihen hinweg abdecken |
| C | **Billige Multi-Angriffe.** `attack_ap: 1`, AP persistiert bis zum eigenen Zug; jede Front-Einheit 1×/Zug (`attackUsed`). Mit ~5+ AP und voller Front: 5 Angriffe hintereinander. | `catalog.js` `attack_ap`; `_actAttack` ~3267; Mutual Combat in `_resolveCombat` | Tempo-Snowball: Board löschen → neu gelegte Karten sofort bestrafen |
| D | **Bot nutzt das aus.** Priorität PLAY, dann ATTACK auf legale Ziele (inkl. frische Deploys). | `bot.js` `step` / Scoring ~217–254 | Verstärkt den Effekt in Bot- und Mixed-Partien |
| E | **Kein Deploy-Zonen-/Cover-Schutz** beim Legen; Cover nur über NML-Tokens / Befestigung. Zerstörung gibt kein SP (Siegbedingungen ohnehin offen). | `_hasCover`; kein Auto-Cover beim Slot | Verteidiger hat beim Nachlegen keinen strukturellen Vorteil |

**Nicht** die Ursache: Angriff *im eigenen Deploy-Zug* (Summoning Sickness greift); Auto-Angriffe am Zugbeginn; unbegrenzte Angriffe pro Einheit (max. 1×/Zug außer Extra-Effekte).

---

## 2. Baseline-Metriken (200 Bot-vs-Bot, Flags aus)

| Metrik | Wert |
|---|---|
| Anteil Partien mit „ganze Front leer beim Gegner“ | **72,5 %** |
| Median Zug erstes Full-Control | **12** (Ø ~19,8) |
| Neu deployte Einheiten zerstört bevor sie handeln | **51,1 %** (4026 / 6084) |
| Ø Lebensdauer einer Front-Einheit (Züge) | **4,47** (Median **1**) |
| Comeback nach Board-Verlust (Board wieder besetzt) | **72 %** * |
| Ø max. Front-Vorsprung (Einheiten) | **6,8** |

\* Comeback-Rate ist bei fehlender Siegbedingung hoch, weil Partien lange laufen und Boards zyklieren — relativer Vergleich zwischen Modi bleibt dennoch brauchbar.

---

## 3. Regeloptionen (Vorschläge)

| # | Option | Erwarteter Effekt | Status |
|---|---|---|---|
| 1 | **`deploy_protection` / Eingraben** — frisch gelegt: unangreifbar bis inkl. Gegner-Halbzug (`noCombatUntil = turn+1`) +1 DEF bis Schutzende | Kill-before-acting stark ↓, Lebensdauer ↑ | **Prototyp, default OFF** |
| 2 | **`strict_facing`** — Angriff nur gegenüber (gleiche Sektion+Reihe) oder seitlich (Nachbarsektion, gleiche Reihe); Artillerie/Mörser/`ATTACK_ANY_FRONT` unverändert | Weniger Spalten-Ketten, lokalerer Kampf | **Prototyp, default OFF** |
| 3 | Angriff kostet **2 AP** (`attack_ap`) | Weniger Ketten-Angriffe / Zug | nicht prototyped |
| 4 | **Catch-up** — Spieler mit weniger Front-Einheiten +1 AP oder 1 Gratis-Zug-DEF | Comeback nach Board-Verlust | nicht prototyped |
| 5 | **Hintere Linie / Verstärkung** — Deploy zuerst in Reihe 2 „Reserve“, erst nächster Zug vorne; oder Front-Limit pro Sektion | Tempo-Bremse beim Nachlegen | nicht prototyped |

---

## 4. Simulationsergebnis der Prototypen (je 200 Partien)

| Modus | Kill-before-acting | Median Lifetime | Ø Lifetime | Median 1. Full-Control | Full-Control-Anteil | Max-Lead |
|---|---:|---:|---:|---:|---:|---:|
| **baseline** | 51,1 % | 1 | 4,47 | 12 | 72,5 % | 6,78 |
| **deploy_protection** | **0,6 %** | **3** | **7,85** | **15** | 74,5 % | 5,76 |
| **strict_facing** | 51,8 % | 1 | 4,45 | 12 | 71,0 % | 6,50 |
| **beide** | **0,6 %** | **3** | **9,16** | **17** | 74,0 % | 6,03 |

### Lesart
- **`deploy_protection`** trifft die Nutzerklage direkt: frische Karten überleben den Gegner-Halbzug (~51 % → ~0,6 % Soforttod; Median-Leben 1→3).
- **`strict_facing` allein** ändert Kill-before-acting kaum — solange *irgendeine* Einheit gegenüber/seitlich steht, stirbt der Deploy weiterhin sofort. Nutzen eher taktische Lokalität; in Kombi mit Schutz steigt Ø-Lebensdauer weiter (7,85→9,16).
- Full-Control-Anteil bleibt hoch, weil ohne Siegbedingung Boards weiter eskalieren; der Schutz verschiebt den Zeitpunkt und bremst den Sofort-Wipe.

Flags in `catalog.js` → `rules.deploy_protection` / `rules.strict_facing` (beide **false**). Engine: `_applyDeployProtection`, Filter in `legalAttackTargets` / `_canAct`, Dig-In-Ablauf nach `turn++` in `_actEnd`.

---

## 5. Empfehlung

1. **Als nächstes playtesten: `deploy_protection` einschalten** (Config/`localStorage` oder Katalog-Toggle) — stärkster Hebel gegen „jede neue Karte stirbt sofort“.
2. **`strict_facing` optional dazu**, wenn Spalten-Ketten thematisch unerwünscht sind; allein kein Snowball-Fix.
3. Danach ggf. `attack_ap: 2` oder Catch-up als Feintuning, sobald Siegbedingungen feststehen.
4. **Siegbedingungen hier nicht anfassen** — Entscheidung offen in `SIEGBEDINGUNGEN.md`.

Repro: `node scripts/sim_front_snowball.mjs 200 baseline|deploy_protection|strict_facing|both`

Rohdaten (Stichprobe): `sim_front_*.json` im Ordner `Division_Command_0.5a/`.
