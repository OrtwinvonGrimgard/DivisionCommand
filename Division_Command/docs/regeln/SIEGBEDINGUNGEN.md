# Siegbedingungen — Trophy-Modus

**Status: aktiv** · Stand: November 2026 · Alpha 0.6b  
Flag: `catalog.rules.victory_mode` — Default **`trophy`** (alle Modi: Bot, Hotseat, LAN). Legacy: `classic`.

Doktrin-SP sind **nicht nationenbezogen**, sondern an die 36 Doktrinen gebunden (`pt126u`).

---

## 1. Classic (Legacy, `victory_mode: 'classic'`)

| Mechanik | Ist |
|---|---|
| Siegschwelle | `vp_to_win` (früher 10; Katalog jetzt 5 wegen Trophy-Default) |
| SP-Quellen | praktisch nur Sonderkarten (z. B. „Der Letzte der steht“) |
| Aufgabe / Weißer Frieden | bleiben |

---

## 2. Trophy-Modus (`victory_mode: 'trophy'`) — **Hauptregeln**

### 2.1 Siegschwelle

**5 SP** (`trophy_vp_to_win`, Default 5). `_checkVictory` beendet bei `vp >= 5`.

### 2.2 SP-Quellen (Engine) — Defaults nach Tuning (Kandidat **K**)

| Quelle | SP | Regel |
|---|---|---|
| **Elite zerstört** | **+2** (`trophy_elite_vp`) | Gegnerische Fronteinheit mit Tag/Klasse `elite` / `Elite` |
| **Durchbruch** | **+1** | Abschnitt (L/C/R): ≥1 eigene Front, Gegner 0; halten bis Ende des nächsten eigenen Zuges. **Bis 3× pro Abschnitt** (`trophy_durchbruch_max_claims: 3`), Cooldown **2 Züge** nach Claim (`trophy_durchbruch_cooldown`). |
| **Doktrin-Ziel** | **+1** | Thematisches Ziel, 1×/Partie. Need = `ceil(base × trophy_doctrine_need_scale)` mit Scale **0.65** (min. 1). |
| Karten-SP | — | Unverändert. Gold-Soforts nur Kandidatenliste. |

### 2.3 Sicherheitsnetz (Hybrid, getunt)

1. **Ab Zug 26** (`trophy_safety_empty_from`): Zugende ohne Fronteinheit → Niederlage.
2. **Ab Zug 28** (`trophy_safety_vp_cap`): meiste SP; Gleichstand → Brettanteil; sonst weißer Frieden.

Aufgabe / weißer Frieden bleiben.

Zielbild Playtest: **VP-Siege ≥70 %**, Sicherheitsnetz **≤25 %**, Timeout klein, Median **~14–18** Züge.

### 2.4 Bot

Aktive SP-Jagd: Elite-Kills, Durchbruch-Clear, Doktrin-Fast-fertig, Race nahe der Schwelle, Fronteinsatz bei leerer/dünner Front.

### 2.5 Tuning-Vergleich (≥1200 RR-Partien / Kandidat, Bot vs Bot)

Ziel: VP≥70 % · Safety≤25 % · Median 14–18.

| ID | Parameter | VP% | Safety% | Timeout% | Median | FP-Win% | Note |
|---|---|---|---|---|---|---|---|
| A | VP5 · S18/20 · DB×1 · E2 · Dok1.0 | 40.7 | 55.2 | 4.1 | 17 | 58.1 | Baseline — Safety dominiert |
| C | VP4 · S20/22 · DB×2/cd2 · E2 · Dok0.75 | 74.9 | 21.5 | 3.6 | 12 | 54.9 | VP ok, Partien zu kurz |
| F | VP4 · S22/24 · DB×2/cd2 · E2 · Dok0.65 | 75.7 | 19.5 | 4.8 | 11 | 54.7 | zu kurz |
| I | VP5 · S24/26 · DB×3/cd2 · E2 · Dok0.7 | 70.5 | 25.1 | 4.4 | 13 | 56.4 | knapp am Ziel |
| **K** | **VP5 · S26/28 · DB×3/cd2 · E2 · Dok0.65** | **75.0** | **21.5** | **3.5** | **14** | **53.9** | **gewählt** |
| L | VP5 · S26/28 · DB×3/cd2 · E3 · Dok0.7 | 77.8 | 17.0 | 5.2 | 12 | 55.8 | zu kurz |
| N | VP5 · S28/30 · DB×4/cd2 · E3 · Dok0.65 | 77.8 | 18.2 | 4.0 | 12 | 56.1 | zu kurz |
| O | VP4 · S28/30 · DB×2/cd3 · E2 · Dok1.0 | 78.5 | 17.5 | 4.0 | 12 | 56.3 | zu kurz |

**Defaults = K.** Sim: `scripts/balance/sim_trophy_sweep.mjs` → `scripts/balance/out/sim_trophy_sweep.json`.

**First-Player-Ausgleich (aktiv):** Startspieler **3 AP nur im ersten Zug** (`opening_starter_ap_penalty: 2`, seit t238; vorher 1 → 4 AP), danach 5. Starthände 5/5; Startspieler zieht in Zug 1 nicht, Zweiter +1 beim Zugbeginn. FP-Rate siehe 2b.


---

## 2b. Startspieler — Münzwurf (alle Modi)

`rules.opening_coin` (Default **true**). In `createMatch`: RNG entscheidet Kopf→Spieler 0 / Zahl→Spieler 1 (deterministisch aus Match-Seed → **LAN: Host-State sync**, beide Clients identisch). Override: `opts.startPlayer` 0|1.

UI: Overlay „Münzwurf: **&lt;Spieler&gt;** beginnt“ + „Startspieler: 3 AP im ersten Zug“. Bot / Hotseat / LAN-Gast (via `dcSetState`).

**Ausgleich im Detail:**

1. **Startspieler −2 AP nur Zug 1** (3 statt 5) — `rules.opening_starter_ap_penalty` (Default 2 seit t238, vorher 1). UI: „Startspieler: 3 AP im ersten Zug“.
2. Starthände 5/5; Startspieler ohne Draw in Zug 1; Zweiter +1 beim Zugbeginn.

Sim FP-Winrate nach Startspieler−1 AP Zug 1 (`scripts/balance/sim_first_player.mjs`, ≥1200 RR):

| Modus | FP-Win% | Entschieden |
|---|---|---|
| classic | **55.4 %** | 1067 / 1200 |
| trophy (K) | **53.7 %** | 1149 / 1200 |

**t238 (3 AP im ersten Zug, Bot-Sim 11.520 Partien je Modus, ±0,9):** Starterdecks 54,5 % → **50,9 %**, gemischt 56,1 % → **52,6 %**. Details: `balance/BALANCE_T238.md`.



---

## 3. Doktrin-Ziele (alle 36, nationenunabhängig)

Fortschritt nur, wenn die Doktrin im Slot liegt. Zielrate Playtest **~30–60 %** der Partien mit dieser Doktrin.

| Doktrin | Ziel (+1 SP, 1×) | Need |
|---|---|---|
| Ablösung | 2 Einheiten im Abschnitt nach eigenem Verlust nachrücken | 2 |
| Abnutzung | 5 gegnerische Fronteinheiten zerstören | 5 |
| Abriegeln | 1 Artillerieangriff auf Abschnitt mit ≤1 Feind | 1 |
| Abschluss | 2 Kills mit derselben Einheit in der Partie | 2 |
| Auffangen | 1 Angriff bei Unterzahl/Gleichstand überleben | 1 |
| Aufklärungsschlag | 9 Schaden an aufgeklärten Feinden | 9 |
| Ausharren | 2 Schaden aus Abschnitten ohne eigene Unterstützung | 2 |
| Auswertung | 3 Schaden im Zug nach erlittenem Angriff | 3 |
| Blitzkrieg | 1 Kill mit Panzer innerhalb von 2 Zügen nach Einrücken | 1 |
| Bollwerk | 4 Schaden aus Abschnitten mit ≥2 eigenen Einheiten | 4 |
| Breites Aufgebot | 3 Infanterie ausspielen | 3 |
| Entsatz | 7 Schaden aus Abschnitten mit ≥2 eigenen Einheiten | 7 |
| Etappensicherung | 5 Züge ohne eigenen Frontverlust beenden | 5 |
| Feuerplan | 7 Schaden an aufgeklärten Feinden | 7 |
| Feuerwalze | 1 Artillerie-Kill | 1 |
| Gegenstoß | 6 Schaden im Zug nach erlittenem Angriff | 6 |
| Gepanzerter Fuß | 2 Infanterie ausspielen | 2 |
| Lauer | 5 gegnerische Fronteinheiten zerstören | 5 |
| Linienkrieg | 6 Schaden aus Abschnitten mit ≥2 eigenen Einheiten | 6 |
| Lokalisierung | 8 Schaden an aufgeklärten Feinden | 8 |
| Marsch aus dem Vollen | 3 Einheiten in Abschnitte mit Unterstützung spielen | 3 |
| Materialersatz | 4 Panzer oder Artillerie ausspielen | 4 |
| Normverband | 3 gegnerische Fronteinheiten zerstören | 3 |
| Punktfeuer | 2 Artillerie-Kills | 2 |
| Rasten | 8 Schaden mit Einheiten, die letzten Zug nicht angriffen | 8 |
| Scheinschwerpunkt | 3 Züge mit Einheiten in ≥2 Abschnitten beenden | 3 |
| Schwerpunkt | 7 Schaden aus dem stärksten eigenen Abschnitt | 7 |
| Sicherer Nachschub | 3 Einheiten in Abschnitte mit Unterstützung spielen | 3 |
| Stoßtrupp | 2 Kills mit Infanterie | 2 |
| Sturmangriff | 2 Kills mit Infanterie | 2 |
| Tiefenverteidigung | 3 gegnerische Fronteinheiten zerstören | 3 |
| Umgehen | 4 Schaden bei lokaler Überzahl | 4 |
| Verlegung | 3 Züge mit Einheiten in ≥2 Abschnitten beenden | 3 |
| Verteilte Stellung | 2 Schaden als alleinige Einheit im Abschnitt | 2 |
| Weiterkämpfen | 6 Schaden mit beschädigten Einheiten | 6 |
| Zielangriff | 4 gegnerische Fronteinheiten zerstören | 4 |

Implementierung: `web/js/engine/victory_trophy.js` (`DC_TROPHY_OBJECTIVES`).

Hinweis: Fünf Doktrinen liegen in keinem Nationsdeck (Auswertung, Blitzkrieg, Bollwerk, Sicherer Nachschub, Tiefenverteidigung) — Trigger-Raten dort nur über Custom-Decks messbar.


---

## 4. Optionale Gold-Soforts (nur Kandidaten — **nicht** geändert)

Könnten später bedingtes +1 SP tragen:

- **Abschluss** / **Zielangriff** / **Punktfeuer** — Kill-Bedingung passt thematisch
- **Feuerwalze** (Sofort) — Massenfeuer
- **Stoßtrupp** / **Sturmangriff** — Stoß-Kill
- **Schwerpunkt** — Abschnittsstoß
- **Ablösung** — Nachrücken nach Opfer
- **Weite Umgehung** / **Umgehen** — Flankenkontrolle

Keine Kartenwerte in diesem Commit geändert.

---

## 5. Aktivierung (Default)

```js
victory_mode: 'trophy'              // Default in catalog.rules
trophy_vp_to_win: 5
trophy_elite_vp: 2
trophy_safety_empty_from: 26
trophy_safety_vp_cap: 28
trophy_durchbruch_max_claims: 3
trophy_durchbruch_cooldown: 2
trophy_doctrine_need_scale: 0.65
opening_coin: true
```

UI: Doktrin-Karten zeigen `SP cur/need`, Inspect-Text nennt das Trophy-Ziel, Log kündigt SP an.

---

## 6. Tests & Simulation

- Unit: `tests/test_trophy_victory.js` (Trophy + Münzwurf)
- Sweep: `scripts/balance/sim_trophy_sweep.mjs` (≥1200 RR / Kandidat)
- Legacy RR: `scripts/balance/sim_trophy_victory.mjs`
