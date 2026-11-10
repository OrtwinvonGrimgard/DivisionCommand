# Division Command – Gesamtplan

**Stand:** November 2026 · Alpha 0.6a  
**Zweck:** Zusammenführung der einzelnen Planungsdokumente zu einem übergeordneten Arbeitsplan.

---

## 1. Aktueller Stand

- Engine und Trophy-Modus funktionieren.
- ~960 Nationenkarten + Alpha-Set vorhanden.
- Jede Nation hat einen in sich schlüssigen Pool (100 Karten + 2 Doktrinen); er liefert Identität, Starterdecks und Filter.
- Freier Deckbau: Eigene Decks mischen Karten aller Nationen (1.709 Deckkarten) – das ist das zentrale Feature.
- Effekt-Verdrahtung (Ausrüstung, Soforteinsätze, Trigger) ist unvollständig.
- HUD, Sound und visuelles Feedback sind noch nicht auf professionellem Niveau.
- Roguelike und Kampagne sind geplant, aber nicht implementiert.

---

## 2. Prioritäten (Reihenfolge)

### Phase A – Kartenpool (Grundlage)
- 100 spielbare Karten pro Nation fertigstellen (Branch `nation-pools-100`).
- Merge nach `main`.
- Alte Karten ersetzen oder ergänzen.
- **Ziel:** Stabiler, frei kombinierbarer Pool als Basis für alles Weitere.

### Phase B – Effekt-Qualität
Erst nach Abschluss von Phase A sinnvoll.

1. **Bestandsaufnahme:** Welche Karten haben Effects, welche nicht.
2. **Ausrüstung:** Träger-Bindung, Boni, Trigger zuverlässig.
3. **Soforteinsätze:** Einmalige Effekte (Schaden, Heilung, Tempo) zuverlässig.
4. **Reaktive Trigger:** Verlust, Handlung, Kette korrekt auslösen.
5. **Feedback:** Spieler sieht, warum etwas passiert oder nicht.
6. **Einheiten und Unterstützung:** Effects verdrahten, nicht nur Basis-ATK/DEF.

### Phase C – Präsentation (HUD, Sound, Feedback)
Parallel oder direkt nach Phase B.

1. **Visuelles Feedback:** Text-Popups, Icons, Hervorhebung bei Effekten.
2. **Sound:** Kurze Effekte für Karte spielen, Angriff, Zerstörung, Trigger.
3. **HUD:** AP, Handkarten, Status der Einheiten klarer darstellen.
4. **Polishing:** Animationen und Übergänge, wenn die Grundlagen stehen.

### Phase D – Onboarding und Demo
- Tutorial (erster Zug, Angriff, Ausrüstung, Soforteinsatz).
- Demo-Partie gegen Bot.
- Steam-Seite und Coming Soon.

### Phase E – Roguelike und Kampagne
- Roguelike-Vertical-Slice (eine Nation) mit Freischalt-System.
- Kampagne als zweiter Freischalt-Pfad.
- Beide Modi (thematisch / frei) unterstützen.

---

## 3. Beide Modi (Thematisch / Frei)

- **Frei (Standard, umgesetzt):** Decks aus allen Nationenpools und neutralen Karten, Doktrinen frei aus allen 36.
- **Thematisch (optional, geplant):** Decks nur aus einer Nation (+ neutrale Karten).
- PvP: Host oder beide Spieler wählen den Modus vor dem Start.
- Kampagne und Roguelike: thematisch sinnvoll.
- Offenes PvP und Hotseat: freie Wahl.

---

## 4. Markt und Positionierung

- Freier Deckbau über alle Nationenpools hinweg ist das zentrale Verkaufsargument.
- Nationen liefern schlüssige Pools und thematische Identität, aber keine Deckbausperre.
- Beide Modi vergrößern die potenzielle Spielerbasis moderat.
- Der entscheidende Erfolgsfaktor bleibt die Qualität der Effects und die Präsentation.

---

## 5. Offene Punkte

- Effekt-Verdrahtung vollständig und stabil.
- HUD und Sound auf professionelles Niveau bringen.
- Tutorial und Demo.
- Roguelike-Slice.
- Steam-Seite und Early-Access-Vorbereitung.

---

## 6. Nächste konkrete Schritte

1. Bot wieder verfügbar: Stand von `nation-pools-100` prüfen und 100er-Pools abschließen.
2. Merge nach `main`.
3. Effekt-Bestandsaufnahme starten.
4. Visuelles Feedback und grundlegende Sounds für Schlüsselaktionen einbauen.
5. Tutorial skizzieren.

---

**Ende des Gesamtplans**  
Dieser Plan fasst die bisherigen Einzelpläne zusammen und dient als Arbeitsgrundlage. Für Details siehe die jeweiligen Dokumente im `docs/`-Ordner.
