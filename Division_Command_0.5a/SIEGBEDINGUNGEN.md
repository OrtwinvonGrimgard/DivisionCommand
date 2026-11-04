# Siegbedingungen — Ist-Analyse und Entscheidungsvorlage

Stand: November 2026 · Alpha 0.5a · **Nur Vorschlag, Engine noch unverändert.**

Ziel: Partien von **ca. 10–20 Minuten**, klarer Sieger, Raum für Comeback, wenig Patt, kompatibel mit 16 Nationsphilosophien.

---

## 1. Was die Engine und die Regeln heute tun

### 1.1 Katalog / Engine (`web/js/data/catalog.js`, `web/js/engine/engine.js`)

| Mechanik | Ist-Zustand |
|---|---|
| Siegschwelle | `vp_to_win: 10` — `_checkVictory()` beendet bei `vp >= 10` |
| SP-Vergabe | **praktisch nicht verdrahtet**. Einziger bekannter Code-Pfad: Flag `letzterDerSteht` → Gegner +1 SP beim Tod der Einheit (Karte „Der Letzte der steht“) |
| Aufgabe | `CONCEDE` → Gegner gewinnt („Aufgabe“) |
| Weißer Frieden | `PROPOSE_PEACE` / `ACCEPT_PEACE` → Unentschieden (`winner == null`) |
| Deck leer | Ablage wird neu gemischt (`graveyard_reshuffle: true`) — **kein Deck-Out-Verlust** |
| Zuglimit | **keins** |
| HQ / Divisions-HP | **keins** |
| Sektor-/Stellungskontrolle als SP | **keins** |
| Moral als Siegbedingung | nur Konzept in RULES, nicht als Endbedingung |

Weitere Regeln im Katalog: Deckgröße 60, Starthand 5, Handmax 7, +5 AP/Zug, Angriff 1 AP, Front 3×3, Doktrinen 2.

### 1.2 Hilfe / RULES vs. Code

| Quelle | Aussage | Passt zum Code? |
|---|---|---|
| Hilfe („Spielregeln“) | Wer zuerst **10 Siegpunkte** hat, oder eine Karte, die das ausdrücklich sagt; weißer Frieden; Deck neu mischbar; Startdeck **40** | Schwelle und Frieden: ja. SP-Quellen: **nein** (fehlen). Startdeck 40: **nein** (Katalog/Nationen: **60** Spielkarten + 2 Doktrinen) |
| `RULES_v0.5_GRUNDKONZEPT.md` §26 | SP durch besondere Leistungen; Arbeitswert 10 SP; Heimatfront/Wille **nicht** alleinige Siegbedingung; finale SP-Bedingungen **offen** | Passt zur Absicht, nicht zur Implementierung |
| Praxis am Tisch | Partien enden heute vor allem durch **Aufgabe** oder **Frieden**, selten/nie durch 10 SP | Entspricht dem fehlenden SP-Zufluss |

### 1.3 Bewertung des Ist-Zustands

| Kriterium | Bewertung |
|---|---|
| Klarheit | Schwach: Spieler lesen „10 SP“, sehen aber kaum SP-Bewegung |
| Partielänge | Unbestimmt; ohne SP-Druck oder HQ kann man endlos tauschen |
| Comeback | Theoretisch hoch (nichts entscheidet früh), praktisch demotivierend |
| Patt-Risiko | Hoch bei vorsichtigem Spiel beider Seiten |
| Nationsfit | Rothain (Schwerpunkt/Ersatz) und Karsk (ein Stoß) brauchen **erkennbare Fortschritte** (Durchbruch, Vernichtung, Halten) — reine Untätigkeit belohnt sie nicht |

---

## 2. Empfohlene Regeln (zur Entscheidung)

### 2.1 Primärvorschlag — **Druck auf die Front + SP-Rennen (Hybrid)**

**Ziel:** 10–20 Minuten, sichtbarer Fortschritt jede paar Züge.

1. **Siegschwelle: 7 SP** (Playtest-Korridor 5–8; Startwert 7 statt 10).
2. **Feste SP-Quellen** (ohne Kartenpflicht):
   - **Einheit zerstört:** +1 SP (Bronze/Silber); **Elite oder Gold-Einheit:** +2 SP.
   - **Abschnitt leergefegt:** Wenn der Gegner in einem Abschnitt (L/C/R) keine Front-Einheit mehr hat und du dort mindestens eine hast: +1 SP **einmal pro eigenem Zug** (max. 1 SP/Zug aus Abschnitten).
   - **Support-Durchbruch (optional):** Wenn du in einem Zug eine Support-Karte des Gegners zerstörst: +1 SP (gedeckelt, z. B. max. 2 SP/Partie aus Support).
3. **Karten-SP** nur noch als Ausnahme (Doktrin/Gold), nie blankes „+1 SP“ ohne Bedingung — wie in RULES vorgesehen.
4. **Weißer Frieden** bleibt (beide müssen zustimmen).
5. **Aufgabe** bleibt.
6. **Kein Deck-Out-Verlust** (Reshuffle bleibt), damit lange Attrition-Nationen (Ossaria, Caldris) nicht bestraft werden.
7. **Zugdeckel (Soft):** Ab Zug 12 erhält der Spieler mit mehr Front-Einheiten (bei Gleichstand: mehr SP) **+1 SP zu Beginn seines Zuges** („Lageentscheidung“). Verhindert Endlospartien, ohne hart abzuschneiden.

**Matchlänge-Ziel:** Viele Partien entscheiden sich zwischen Zug 6 und 12.

### 2.2 Alternative A — **Divisionswille (HQ-HP)**

- Jede Seite startet mit **20 Wille**.
- Schaden am Wille: wenn ein Angriff eine **leere** gegnerische Frontstellung trifft, die gegenüber/benachbart liegt, oder über Steilfeuer den Support „berührt“ (genaue Formel Playtest).
- Bei **0 Wille** Niederlage.
- SP entfallen oder dienen nur als Nebenmodus.

**Pro:** Sehr klar, streamerfreundlich, Karsk-Stoß und Rothain-Schwerpunkt lesen sich als Wille-Schäden.  
**Contra:** Braucht UI (Wille-Leiste), Balancing der Leeren-Stellung-Regel, Gefahr von Turtle hinter voller Front.

### 2.3 Alternative B — **Nur Abschnittskontrolle (sektoral)**

- Jeder gehaltene Abschnitt am Zugende: +1 SP (oder Kontrolle-Zähler).
- Zuerst 5 Abschnitts-Ticks oder 3 Abschnitte gleichzeitig → Sieg.

**Pro:** Passt zu Flankenkrieg und Doktrinen wie Umgehen/Abriegeln.  
**Contra:** Weniger „Vernichtungsgefühl“; Karsk wirkt indirekter.

### 2.4 Was für die 16 Nationen wichtig ist

| Philosophie (Beispiele) | Braucht in der Siegbedingung |
|---|---|
| Karsk — ein Stoß | Schnelle SP oder Wille-Schaden durch konzentrierte Zerstörung |
| Rothain — Schwerpunkt / Ersatz | Durchbruch belohnen, Nachrücken/Ersatz nicht bestrafen |
| Eldran — Auffangen / Gegenstoß | Comeback nach Halten (nicht nur First-Strike-Rennen) |
| Caldris / Merovan — Etappe / Ausharren | Attrition und Halten müssen punkten, nicht nur frühe Aggression |
| Vesper — Scheinschwerpunkt | Täuschung/Verdeckt darf Abschnitte bedrohen |
| Diplomatische / friedliche Wege | Weißer Frieden + optionale „Eskalation senken“-Karten behalten |

Empfehlung: **Hybrid (2.1)** als Standard für PvP/Hotseat/Bot; **Wille (2.2)** optional als Szenario-/Roguelike-Bossregel.

### 2.5 Entscheidungsfragen an dich

1. Primär **Hybrid-SP (2.1)**, **Wille (2.2)** oder **Abschnitte (2.3)**?
2. Siegschwelle **7** oder lieber **5** / **10**?
3. Soft-Zugdruck ab Zug **12** — ja/nein?
4. Soll Zerstören von Unterstützung SP geben?
5. Bleibt weißer Frieden im Ranked später erlaubt?

**Nächster Schritt nach deiner Wahl:** Phase 0 im Fahrplan — Regeln festziehen und erst dann Engine anpassen.

---

## 3. Kurzfazit

Heute endet das Gefecht regeltechnisch bei 10 SP, aber SP fließen fast nicht. Ohne Entscheidung hier bleiben Tutorial, Roguelike, Kampagne und Steam-Demo ohne glaubwürdiges „Partie vorbei“. Erst Siegbedingungen locken, dann Kartendesign und Roguelike darauf bauen.

---

## Anhang: Front-Snowball (Balance, nicht Siegbedingung)

Nutzerfeedback zu Ketten-Angriffen / Soforttod frischer Deploys ist in **`BALANCE_FRONT.md`** diagnostiziert.
Anti-Snowball-Flags `deploy_protection` / `strict_facing` (default **aus**). **Keine Änderung an Siegbedingungen.**

