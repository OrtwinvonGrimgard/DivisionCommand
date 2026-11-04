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
| 1 | **`deploy_protection` / Eingraben** — frisch gelegt: unangreifbar bis inkl. Gegner-Halbzug (`noCombatUntil = turn+1`) +1 DEF bis Schutzende | Kill-before-acting stark ↓, Lebensdauer ↑ | **AKTIV (default ON)** |
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

Flags in `catalog.js` → `rules.deploy_protection` **true** (permanent), `rules.strict_facing` **false**. Engine: `_applyDeployProtection`, Filter in `legalAttackTargets` / `_canAct`, Dig-In-Ablauf nach `turn++` in `_actEnd`.

---

## 5. Empfehlung

1. **Als nächstes playtesten: `deploy_protection` einschalten** (Config/`localStorage` oder Katalog-Toggle) — stärkster Hebel gegen „jede neue Karte stirbt sofort“.
2. **`strict_facing` optional dazu**, wenn Spalten-Ketten thematisch unerwünscht sind; allein kein Snowball-Fix.
3. Danach ggf. `attack_ap: 2` oder Catch-up als Feintuning, sobald Siegbedingungen feststehen.
4. **Siegbedingungen hier nicht anfassen** — Entscheidung offen in `SIEGBEDINGUNGEN.md`.

Repro: `node scripts/sim_front_snowball.mjs 200 baseline|deploy_protection|strict_facing|both`

Rohdaten (Stichprobe): `sim_front_*.json` im Ordner `Division_Command_0.5a/`.

---

## 6. Freigabe 2026-11-04 — Eingraben permanent

Nutzerentscheid: **`deploy_protection` dauerhaft ON** (beide Seiten, Bot/Hotseat/LAN). `strict_facing` bleibt OFF. Siegbedingungen unverändert.

### Massenschaden-Regel (fest)
- Blockiert: Einheitenangriffe + **gezielte** Effekte (DEAL_DAMAGE/DESTROY/Napalm/Luftschlag auf ein Ziel).
- Trifft trotzdem: **`MASS_DAMAGE`** / „Allen Feinden … Schaden“ und vergleichbarer Flächenschaden.

### UI
- Einheit wird **offen** gelegt (nicht verdeckt/ausgegraut).
- **Schild**-Badge + Glow; Tooltip „Eingegraben — nicht angreifbar bis zum nächsten eigenen Zug“.
- Badge verschwindet genau wenn `noCombatUntil` abläuft (Beginn nächster eigener Zug).
- Targeting-Highlight nur auf legalen Zielen (Schutz ausgenommen).

Siehe Hilfe (Spielregeln) und `RULES_v0.5_GRUNDKONZEPT.md` §7.0.

---

## 7. Schlagabtausch / `combat_counter` (Analyse 2026-11-04)

Frage: *Was ändert sich, wenn nur die angegriffene Einheit Schaden nimmt — oder gibt es Gegenschlag nur, wenn sie überlebt?*

### 7.1 Ist-Zustand (Code)

**Default ist bereits „nur bei Überleben“ — nicht gleichzeitig.**

`engine.js` `_applyCombatHits` (~3129+):

1. Normal: zuerst `_damage(Verteidiger, Angreifer-ATK)`; **Gegenschlag nur wenn** `!_isDead(Verteidiger)` und Ziel in der Front → `_damage(Angreifer, Verteidiger-ATK)`.
2. Support-Ziele: `dmgToA = 0` (kein Gegenschlag).
3. Nebel/`nebelfeld`: Erstschlag-Reihenfolge umgekehrt (Schaden am Angreifer zuerst; Angriff nur wenn Angreifer lebt).
4. **Artillerie-Gegenschlag (ab digin3):** Bei Artillerie-Angreifern Gegenschlag nur, wenn Verteidiger die Artillerie selbst per `_canReachForCounter` erreichen könnte — kombiniert mit `survivor_only`.
5. Weitere Interaktionen vor den Hits: Minen, Richtmine, Ausrüstungs-Selbstschaden, Ambush, Panzerfaust, Zielangriff, Munitionstreffer, Schulterschluss (`_resolveCombat` ~3359–3534).

Hilfe/RULES: Verteidiger schlägt zurück, **falls sie übersteht**; Artillerie zusätzlich nur in Reichweite des Verteidigers.

Karten mit explizitem Erstschlag-/Gegen-Wortlaut: **2** (Dschungelkrieger „Überfall/Erstschlag“, Kriegsnebel „Verteidiger Erstschlag“). Allgemeiner Gegenschlag steht in den Regeln, nicht auf jeder Karte.

### 7.2 Config-Flag (Default unverändert)

`catalog.rules.combat_counter`:

| Wert | Bedeutung |
|---|---|
| **`survivor_only`** (Default) | Ist-Zustand: Gegenschlag nur wenn Verteidiger den Angriff überlebt |
| `none` | Kein Gegenschlag; nur Ziel nimmt Kampfschaden |
| `simultaneous` | Beide nehmen vollen Schaden, auch wenn das Ziel stirbt |

`deploy_protection` bleibt ON; Siegbedingungen unverändert. Flag default **nicht** umgestellt.

### 7.3 Simulation (200 Bot-vs-Bot, Eingraben ON)

| Metrik | survivor_only (Ist) | none | simultaneous |
|---|---:|---:|---:|
| Kill-before-acting | 0,5 % | 0,4 % | 0,5 % |
| Median Lebensdauer (Züge) | 3 | 3 | 3 |
| Ø Lebensdauer | 7,87 | 8,07 | 7,07 |
| Median 1. Full-Control | 15 | 17 | 14 |
| Full-Control-Anteil | 72 % | 72 % | 73 % |
| Ø Zugende | 88,6 | 84,0 | 99,8 |
| Angriffe / Partie | **45,6** | **52,3** | **33,7** |
| Davon „günstig“ | 64 % | 66 % | 65 % |
| Gegenschlag landet | **26 %** | **0 %** | **90 %** |
| Artillerie-Angriffsanteil | 29 % | 28 % | 29 % |
| Todesanteil High-ATK / High-DEF / balanced | 12 % / 11 % / 77 % | 12 % / 10 % / 77 % | 12 % / 11 % / 77 % |

Board-Share (stabil über Modi, Extreme): stark **Rothain / Vael / Theryn**; schwach **Karsk / Namar / Orthea**. Simultaneous verstärkt die Extreme leicht; `none` nivelliert etwas.

Repro: `node scripts/sim_combat_counter.mjs 200 survivor_only|none|simultaneous`

### 7.4 Spürgefühl

| Modus | Aggression | DEF-Rolle | Snowball / Eingraben |
|---|---|---|---|
| **survivor_only** | Angriff lohnt, wenn man töten kann (kein Return) | DEF muss den One-Shot verhindern, sonst kein Abschreckungs-Gegenschlag | Passt zu Eingraben: frische Einheit überlebt den ersten Zug, danach klassischer Trade |
| **none** | Deutlich offensiver (~+15 % Angriffe); Trades „kostenlos“ | DEF nur noch als Schadenstank, nicht als Abschreckung | Mehr Druck auf die Front; Eingraben bleibt der Hauptschutz für Frischgelegte |
| **simultaneous** | Zurückhaltender (~−26 % Angriffe); jedes Gefecht tut weh | DEF + ATK auf Verteidiger zählen stärker als Abschreckung | Längere Partien, mehr Mutual Kills; High-ATK-Glasscannons riskanter |

### 7.5 Empfehlung (nur Analyse)

1. **Default belassen: `survivor_only`** — beantwortet die Nutzerfrage bereits: *Gegenschlag gibt es nur, wenn die angegriffene Einheit nicht sofort zerstört wird.*
2. Hilfe-Text präzisieren („schlägt zurück, **falls sie den Treffer übersteht**“), wenn UI-Texte angepasst werden.
3. `none` nur playtesten, wenn man bewusst aggressiveres Tempo und schwächere DEF-Abschreckung will.
4. `simultaneous` nur, wenn Kämpfe härter und seltener werden sollen (näher an „beide schlagen immer“).

### 7.6 Entscheidung: Artillerie ohne Gegenschlag außer Reichweite (2026-11-04)

Nutzerentscheid: Bei **Artillerie-Angriffen** kein Gegenschlag, außer der Verteidiger könnte die Artillerie selbst legal angreifen (gleiche Reach/Distanz wie `legalAttackTargets`, Deploy-Schutz irrelevant). Weiterhin `survivor_only` (muss überleben). Andere Angreifer unverändert.

Umsetzung: `_counterDamageAllowed` in `_applyCombatHits`; Bot `scoreAttack` wertet außerreichweitige Artillerieschüsse als sicher (+22).

**Sim 200 Bot-vs-Bot** (`survivor_only` + Eingraben ON, digin3):

| Metrik | Vorher (nur survivor_only) | Nach Artillerie-Reichweiten-Gate |
|---|---:|---:|
| Angriffe / Partie | 45,6 | 46,9 |
| Gegenschlag landet (gesamt) | 26 % | **21 %** |
| Artillerie-Angriffsanteil | 29 % | **32 %** |
| Gegenschlag auf Artillerie | — | **12 %** |
| Ø Zugende | 88,6 | 88,5 |

Nation-Board-Share unverändert im Muster: stark **Rothain / Theryn / Vael / Ossaria**; schwach **Karsk / Namar / Orthea / Lyr**. Artillerie-Kartenanteil je Nation gleich (~13 %), daher keine nationenspezifische Arty-Verschiebung — eher globale etwas sicherere Artillerie (höherer Arty-Angriffsanteil, seltenerer Gegenschlag).

Repro: `node scripts/sim_combat_counter.mjs 200 survivor_only`


