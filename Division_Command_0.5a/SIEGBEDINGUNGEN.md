# Siegbedingungen — Trophy-Modus (Prototyp)

Stand: November 2026 · Alpha 0.5a  
Flag: `catalog.rules.victory_mode` — Default **`classic`** (unverändert). Prototyp: **`trophy`**.

Doktrin-SP sind **nicht nationenbezogen**, sondern an die 36 Doktrinen gebunden (`pt126u`).

---

## 1. Classic (Default, unverändert)

| Mechanik | Ist |
|---|---|
| Siegschwelle | `vp_to_win: 10` |
| SP-Quellen | praktisch nur Sonderkarten (z. B. „Der Letzte der steht“) |
| Aufgabe / Weißer Frieden | bleiben |

---

## 2. Trophy-Modus (`victory_mode: 'trophy'`)

### 2.1 Siegschwelle

**5 SP** (`trophy_vp_to_win`, Default 5). `_checkVictory` beendet bei `vp >= 5`.

### 2.2 SP-Quellen (Engine)

| Quelle | SP | Regel |
|---|---|---|
| **Elite zerstört** | **+2** | Gegnerische Fronteinheit mit Tag/Klasse `elite` / `Elite` |
| **Durchbruch** | **+1** | In einem Abschnitt (L/C/R): du hast ≥1 eigene Fronteinheit, Gegner 0. Zustand muss bis **Ende deines nächsten Zuges** gehalten werden. **Max. 1× pro Abschnitt pro Partie** (`durchbruchClaimed`). Neu armieren nach Verlust der Kontrolle möglich, aber kein zweiter Claim desselben Abschnitts. |
| **Doktrin-Ziel** | **+1** | Jede deiner beiden Doktrinen hat **ein** thematisches Ziel, **1×/Partie**, Fortschritt in UI. Ankündigung im Log + Event `vp`. |
| Karten-SP | — | Unverändert (z. B. Letzter der steht). Optionale Gold-Soforts: nur Kandidatenliste unten, **Karten unverändert**. |

### 2.3 Sicherheitsnetz (gewählt)

**Bewertet:** (A) ab Zug 18 leere eigene Front am Zugende = Verlust · (B) ab Zug 20 meiste SP, Gleichstand → Brettanteil.

**Wahl: Hybrid**

1. **Ab Zug 18:** Endest du deinen Zug **ohne** Fronteinheit → **Niederlage** („Keine Front ab Zug 18“). Erzwingt Präsenz, verhindert reines Support-Turtle.
2. **Ab Zug 20** (falls noch kein Sieger): **meiste SP** gewinnt; Gleichstand → **mehr Fronteinheiten** (Brettanteil); weiterhin Gleichstand → **weißer Frieden**.

Begründung: Reines (A) allein beendet lange Attrition-Rennen nicht, wenn beide Front halten. Reines (B) allein belohnt Frontflucht bis Zug 19. Hybrid hält Druck und garantiert ein Ende.

Aufgabe und weißer Frieden bleiben.

### 2.4 Bot

Trophy-Bot bewertet Elite-Kills, Durchbruch-Druck (letzte Feindeinheit im Abschnitt) und fast fertige Doktrin-Ziele höher.

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

## 5. Aktivierung

```js
// catalog.js / Match-Opts rules override:
victory_mode: 'trophy'   // statt 'classic'
trophy_vp_to_win: 5      // optional
```

UI: Doktrin-Karten zeigen `SP cur/need`, Inspect-Text nennt das Trophy-Ziel, Log kündigt SP an.

---

## 6. Tests & Simulation

- Unit: `scripts/test_trophy_victory.js`
- Round-Robin: `scripts/sim_trophy_victory.mjs` (≥1000 Partien)
