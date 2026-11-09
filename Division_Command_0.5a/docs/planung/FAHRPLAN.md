# Fahrplan zum Erfolg — Division Command

Stand: November 2026 · Alpha 0.5a  
Begleitdokument: [SIEGBEDINGUNGEN.md](../regeln/SIEGBEDINGUNGEN.md), Freeze: [REGEL_FREEZE.md](../regeln/REGEL_FREEZE.md) (Trophy K aktiv seit 2026-11-04, Tip `196ae84`)

Dieser Fahrplan verbindet **Regel-Klarheit**, **Roguelike als Hebel**, **Steam-Sichtbarkeit** und drei Absatz-Szenarien. Aufwandsschätzungen gelten für **Solo / sehr kleines Team** (Vollzeit-Äquivalent in Personenwochen, grob).

---

## 0. Erfolg in einem Satz

Ein Fremder versteht in zehn Minuten die Front, beendet eine Partie mit klarem Sieger, will eine zweite — und findet auf Steam eine Seite mit Demo, Wunschlisten und einem Roguelike-/Kampagnen-Hook, den Kartenspiel- und Taktik-Kanäle zeigen können.

---

## 1. Siegbedingungen zuerst (Phase 0)

Ohne feste Siegbedingungen sind Roguelike-Gefechte, Tutorials und Stream-Clips nicht planbar.

- **Ist:** Schwelle 10 SP existiert; SP-Zufluss praktisch fehlend; Ende heute vor allem Aufgabe/Frieden. Details und Inkonsistenzen (Hilfe 40er-Deck vs. 60er-Katalog, keine HQ/Zuglimit): siehe [SIEGBEDINGUNGEN.md](../regeln/SIEGBEDINGUNGEN.md).
- **Soll:** Eine gewählte Primärregel (empfohlen: Hybrid-SP mit Abschnittsdruck, Ziel 10–20 Min) + optionale Alternativen für Szenarien/Bosse.
- **Deliverable:** Schriftliche Regel-Freeze-Notiz + danach erst Engine-Patch.
- **Erfolgskriterium:** 10 Playtests mit Fremden/Bot enden ohne Aufgabe in ≤ 20 Minuten mit verständlichem Siegrund.

---

## 2. Roguelike — Karten- und Regeldesign

Der Roguelike (Arbeitstitel z. B. **Feldzug / Operationslauf**) ist der stärkste Content-Hebel neben der Nationen-Kampagne: ein Run = eine Geschichte, Deck wächst, Streamer können „einen Frontabschnitt“ zeigen.

### 2.1 Run-Struktur

```
Start (Nation + Doktrin-Wahl)
  → Karte mit Knoten (3–5 Akte / Fronten)
       Gefecht | Elitegefecht | Nachschub (Shop)
       Lazarett (Rest) | Ereignis | Boss
  → Boss-Akt → Sieg-Bildschirm (Orden, Statistik, Unlocks)
```

- **Akte:** 3 Akte à 3–4 Knoten + Boss (Slay-the-Spire-Länge, aber kürzere Einzelgefechte).
- **Kartenknoten:** Verzweigung 2–3 Optionen; Elite seltener, Nachschub nach schweren Gefechten.
- **Boss:** Eigene KI-Decks / sichtbare Absichten; Siegbedingung oft Wille/HQ (Alternative aus SIEGBEDINGUNGEN), nicht nur Standard-SP.

### 2.2 Start und Belohnungen

| Element | Vorschlag |
|---|---|
| Startdeck | **12–15** Karten (nationstypisch), 1 Doktrin aktiv (2. Doktrin freischaltbar) |
| Starthand / AP | Wie Kernregeln, oder −1 Handkarte in Akt 1 für Tempo |
| Belohnung nach Gefecht | 3 Karten zur Wahl (1 nehmen), selten Relikt (**Orden** / **Befehl**) |
| Shop | Gold/„Nachschubpunkte“; Karten kaufen, entfernen, heilen |
| Lazarett | Lauf-HP heilen; optional Karte upgraden |
| Seltenheit | Bronze häufig, Silber/Gold seltener — wie Katalog (`bronze`/`silver`/`gold`) |

### 2.3 Wie Karten sein müssen, damit der Roguelike funktioniert

Audit November 2026 (Typdateien): ca. **1095** Karteneinträge; Seltenheit grob 640 Bronze / 224 Silber / 96 Gold; **Ausrüstung 169** und **Soforteinsatz 229** mit Effect-Codes; Einheiten/Unterstützung noch lückenhaft verdrahtet (viele ohne `effects`, Kampf über Basis-ATK/DEF).

**Prinzipien**

1. **Selbstenthaltende Effekte** — Jede Karte muss allein sinnvoll sein. Keine „nur mit X-Karten im Deck“-Totkarten im Belohnungspool.
2. **Skalierung** — Effekte, die mit Run-Fortschritt wachsen (mehr Einheiten, Orden-Stacks, Veteran-Upgrade), nicht nur flache +1/+1.
3. **Keywords / Tags** — Wenige, stabile Tags (`infanterie`, `panzer`, `aufklaerung`, `stellung`, …) als Synergie-Anker; neue Roguelike-Tags sparsam (`stoß`, `halten`, `logistik`).
4. **Veteran-Upgrade** — Bronze→Silber-Variante derselben ID-Linie (Kosten −1, oder +1 ATK/DEF, oder Zusatztrigger). Shop/Lazarett bietet Upgrade statt neuer Karte.
5. **Totkarten vermeiden** — Belohnungspool filtert: nur Karten mit greifendem Effect-Code **oder** klaren Kampfwerten; SP-only-Karten erst nach SP-Freeze.
6. **Nation vs. neutral**
   - **Startpool:** nationengebunden (Identität).
   - **Belohnungen Akt 1–2:** 70 % eigene Nation / 30 % neutraler „Beute-/Alliierten“-Pool.
   - **Akt 3 / Boss-Loot:** mehr Crossovers, aber Doktrin-Synergie belohnen.
7. **Rollen im Run**
   - Einheiten = Brettpräsenz (müssen in kurzen Gefechten schnell liegen).
   - Sofort = Tempo und Antwort.
   - Ausrüstung = Skalierung über den Run (sehr roguelike-tauglich).
   - Unterstützung = Engine des Decks (Aufklärung, Heilung, Aura).
   - Elite/Gold = seltene Build-Maker.
   - Doktrin = **Run-Defining Choice** am Start (ändert Belohnungsgewichte).

### 2.4 Sollen im Roguelike andere Regeln gelten?

**Ja — absichtlich, aber transparent.** Kern-PvP bleibt die „Turnierregel“; der Run nutzt Varianten:

| Thema | PvP / Hotseat (Kern) | Roguelike-Gefecht |
|---|---|---|
| Sieg | Gewählte Kern-Siegbedingung (siehe SIEGBEDINGUNGEN) | Kürzer: z. B. **5 SP** oder **Wille 12–15**; Elite/Boss eigene Regel |
| Persistenz | Partie isoliert | **Lauf-HP / Divisionswille** zwischen Gefechten; optionale „Narben“ |
| Einheiten | Verschwinden mit Partieende | Optional: **kein** Übernehmen von Brett-Einheiten (zu komplex); Persistenz nur über Deck + Orden + Lauf-HP |
| AP | +5 / Zug | Akt 1 evtl. +4; Orden können AP-Regeln ändern |
| Deckgröße | 60 Aufbau | Start 12–15, wächst auf ~25–35 |
| Gegner | Spiegel-Deck / Bot | Vorgefertigte **Intent-Decks**; Absichten 1 Zug voraus sichtbar (lesbar für Neue) |
| Doktrin | 2 offen | 1 Start + Freischaltungen; Relikte (**Orden**, **Befehle**) stapeln |
| Frieden / Aufgabe | Ja | Aufgabe = Run verloren; kein weißer Frieden gegen KI |

**Was sich überträgt:** Front 3×3, Support, AP, Angriffsregeln, Ausrüstungs-/Sofort-Engine, Verdeckt/Steilfeuer sobald stabil.  
**Was neu gebaut werden muss:** Run-Map, Belohnungs-UI, Shop, Persistenz, Intent-KI, Orden-Daten, gefilterte Belohnungspools, kürzere Siegschwellen-Parameter.

### 2.5 Balancing-Ansatz Roguelike

1. Zuerst **Kerngefecht** mit eingefrorenen Siegbedingungen balancieren (Bot).
2. Roguelike-Parameter (Startgröße, Gold, Heilung) an **Gefechtsdauer 4–8 Minuten** koppeln.
3. Belohnungspool nur aus Karten mit bekannten Effect-Codes + Basis-Einheiten mit klaren Werten.
4. Ein „Seeded Daily“ (gleicher Seed für alle) zum Balancing und für Leaderboards später.

---

## 3. Phasenplan

### Phase 0 — Regel-Freeze & Siegbedingungen  
**Aufwand:** 1–2 Wochen  

| | |
|---|---|
| Deliverables | ~~Entscheidung~~ + REGEL_FREEZE.md erledigt; Hilfe-Text anpassen; Playtests |
| Erfolg | Fremde Playtests enden mit verständlichem Siegrund in 10–20 Min |
| Abhängigkeit | Primärregel entschieden (Trophy K); menschliche Playtests offen |

### Phase 1 — Kern-Polish & Onboarding  
**Aufwand:** 3–5 Wochen  

| | |
|---|---|
| Deliverables | Tutorial (erster Zug, Angriff, eine Ausrüstung, ein Sofort); Regeltooltips; Bot legt zuverlässig; UX Hand/Zoom stabil; Deck-Builder verständlich; Sieg-Bildschirm |
| Erfolg | Neuer Spieler beendet Tutorial + 1 Bot-Partie ohne externe Hilfe |
| Marketing | Erste Clips „eine Frontentscheidung in 60 Sekunden“ sammeln (noch privat) |

### Phase 2 — Roguelike Vertical Slice  
**Aufwand:** 6–10 Wochen  

| | |
|---|---|
| Deliverables | 1 Nation spielbarer Run (Akte + Boss), Belohnungen, Shop, 1 Doktrin-Pfad, 30–50 Belohnungskarten kuratiert, Orden ×5 |
| Erfolg | Run in 45–90 Min beendbar; 5 externe Tester „würde nochmal starten“ |
| Risiko | Scope-Creep — Slice bewusst **eine** Nation |

### Phase 3 — Steam-Seite, Wunschlisten, Demo, Next Fest  
**Aufwand:** 3–6 Wochen parallel zu Inhalt  

| | |
|---|---|
| Deliverables | Steam Direct ($100), Coming-Soon-Seite, Trailer (Tisch + Roguelike-Hook), Demo = Tutorial + 1 Bot-Partie **oder** verkürzter Run-Akt, Next-Fest-Bewerbung |
| Erfolg | Öffentliche Seite live ≥ 2 Wochen vor Verkauf; Wishlist-Aufbau messbar |
| Marketing | Keys an mittlere Kartenspiel-/Strategie-Kanäle; kurzer Kampf-als-Rätsel; Community-Kanal (Discord/Steam-Diskussionen) |
| KPI-Wunschlisten | Siehe §4 — Solo-Median-Umfragen liegen bei **~500** Wunschlisten ([Kasspian](https://kasspian.com/research/wishlists)); mehr ist Hebel, kein Automatismus |

### Phase 4 — Kampagne (Nationen)  
**Aufwand:** 8–14 Wochen (gestaffelt)  

| | |
|---|---|
| Deliverables | 2–4 Nationen-Geschichten mit Szenario-Siegbedingungen; Rest als Roadmap im EA |
| Erfolg | Eine Kampagnen-Mission ohne Regelbuch lesbar; Lore spürbar (Karsk-Stoß, Rothain-Schwerpunkt, …) |
| Hinweis | Kampagne und Roguelike teilen sich Engine-Parameter und Kartensprache |

### Phase 5 — Early Access Launch  
**Aufwand:** 2–4 Wochen Launch-Prep + Ongoing  

| | |
|---|---|
| Deliverables | Preis 9,99–14,99 € je nach Slice; Bot + Hotseat + Roguelike-Slice + mind. sichtbare 4–8 Nationen; Patch-Plan |
| Erfolg | Stabiler Launch-Tag; Reviews thematisch „Tisch verständlich / will mehr Runs“ |
| Nicht im EA-Pflichtumfang | Ranked PvP, Workshop, alle 16 Kampagnen |

### Phase 6 — Live: PvP, Workshop, Challenges  
**Aufwand:** fortlaufend, Quartale  

| | |
|---|---|
| Deliverables | Asynchron/Online, Ladder, Daily/Weekly Challenges + Leaderboard, Deck-Share-Codes, Steam Workshop / Editor-Anbindung, Cosmetics **ohne Pay-to-Win** |
| Erfolg | Wiederkehrende Sessions; Creator nutzen Share-Codes und Challenges |
| Streamer | Partien kurz halten; optional Replay-Export |

---

## 4. Drei Szenarien und KPIs

Marktzahlen sind **Mediane/Schätzungen**, keine Zusagen. Quellen: [GamesBerry Card Game](https://gamesberry.app/tag/card-game), [Game Market Data TCG](https://gamemarketdata.com/genre/trading-card-game), [Kasspian Wishlists](https://kasspian.com/research/wishlists), Steam Direct.

Kasspian (self-reported, Reddit, 2025–2026): Solo-Median **500** Wunschlisten; Teams **2 250**; unter 59 Releases Median **0,35** Verkäufe je Wishlist zum Launch. GamesBerry: Card-Game-Launches 2025 Medianumsatz ~**685 $** (~470 Kopien).

| Szenario | Verkäufe 1. Jahr (Steam, grob) | Typische Voraussetzungen | Wishlist-Orientierung* |
|---|---|---|---|
| **Basis** | Hunderte bis wenige Tausend | Seite + Demo, wenig Reichweite | ~500–3 000 (Solo-üblich bis leicht darüber) |
| **Gut** | **5 000–15 000** | Starke Demo, Next Fest oder vergleichbarer Schub, klarer Hook (16 Nationen + Roguelike), Creator-Keys | ~5 000–20 000+ |
| **Durchbruch** | **30 000+** | Viral/kuratiert, Festival-Highlight, anhaltende Creator-Präsenz | oft weit über 20 000; kein Garant |

\*Rückrechnung mit 0,35 Verkäufen/Wishlist wäre z. B. 8 000 Verkäufe ≈ 23 000 Wishlists — **unsicher**, Conversion schwankt stark. Wishlists sind notwendig, nicht hinreichend.

**Hook-Liste (Priorität):** (1) Roguelike-Feldzug, (2) 16 Lore-Nationen / Doktrinen, (3) taktisches Frontfeld statt reinem Hand-CCG, (4) Community (Share-Codes, Challenges), (5) später Workshop.

---

## 5. Marketing & Community (durchgängig)

1. Coming Soon, sobald Tutorial + 1 überzeugendes Gefecht stehen — nicht früher mit Preisversprechen.
2. Trailer: 10-Minuten-Entscheidung in 45 Sekunden Schnitt + 15 Sekunden Roguelike-Map.
3. Demo vor bezahltem EA.
4. Next Fest / vergleichbare Events als Haupthebel unter 1 000 Wishlists (Kasspian: Festivals + Reddit + Presse bei kleinen Titeln häufig genannt).
5. Keys an Kanäle, die Militärton oder Deckbuilder aushalten; lieber ganze Partie als 15-Sekunden-Trailer-Only.
6. Kein Pay-to-Win; Cosmetics/Orden-Skins erst nach Spielspaß.
7. Community-Regeln und Patchnotizen öffentlich (Vertrauen im EA).

---

## 6. Risiken

| Risiko | Wirkung | Gegenmaßnahme |
|---|---|---|
| Siegbedingungen bleiben unklar | Demo und Roguelike wirken ziellos | Phase 0 vor Content-Masse |
| Roguelike-Scope | Monate ohne Store-Seite | Eine Nation Slice; Parameter statt neuer Engine |
| Einheiten ohne Effects | Belohnungen wirken tot | Pool-Filter; Effect-Verdrahtung nach Freeze priorisieren |
| Markt-Median niedrig | Erwartung 30 k als Normalfall | Szenarien kommunizieren; Wishlist-Arbeit |
| Namens-/Markenkonflikt | Umbennen nach Marketing | Marke vor Coming Soon prüfen (siehe Hilfe Marktanalyse) |
| Online-PvP zu früh | Serverkosten, Balance-Drama | Erst EA PvE/Hotseat; PvP Phase 6 |
| Portrait-/Kit-Arbeit | Ablenkung vom Tisch | Kit bewusst zurückgestellt; Fokus Regeln + Run |

---

## 7. Empfohlene Reihenfolge (kurz)

1. **Du entscheidest** die Siegbedingungen (SIEGBEDINGUNGEN.md).  
2. Phase 0 implementieren + Hilfe angleichen.  
3. Phase 1 Tutorial.  
4. Phase 2 Roguelike-Slice **einer** Nation.  
5. Phase 3 Steam + Demo + Festivals.  
6. Phase 4/5 Kampagne staffeln + EA.  
7. Phase 6 PvP / Workshop / Challenges.

Ohne Schritt 1 bleibt jeder weitere „Erfolgspfad“ Schätzung.
