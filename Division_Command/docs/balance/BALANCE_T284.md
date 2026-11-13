# Balance t284 (Alpha 0.6d)

**Stand:** 13.11.2026

**Messung:** Bot gegen Bot mit `tmp_t283/sim.js` und `sim_doc.js`, Saat über `SIM_SEED`.
- Starter- und Mischdecks: je 10.080 Partien.
- Doktrinen: 1.024 Partien je Doktrin und Messung, die gezielten Proben 3.072.
- Rauschen: etwa ±1,5 Punkte je Nation, etwa ±1,6 Punkte je Doktrin bei 1.024 Partien.

**Vorher** ist die Messung b0 auf 0.6c (2077926f), **nachher** die Messung f4 auf dem Endstand.

Mischdeck heißt: Starterdeck-Plätze 1–30 und die ersten 30 Poolkarten der Nation. Starterdeck-Plätze 31–60 wirken nur auf die Starter-Messung.

## Änderungen

### Doktrinen

| Doktrin | Änderung | Messung |
|---|---|---|
| Stoßtrupp | Infanterie +1 → **+2 ATK**; beschädigte Einheiten weiter +1 ATK. | Ø 47,9 → Ø 49,4 % über 8 Messungen |
| Lauer | +1 ATK für Einheiten, die im letzten Zug nicht angriffen; **frisch eingerückte nur, wenn sie Infanterie sind**. | 54,3 → 49,0 % (3.072 Partien) |
| Gegenstoß | Bonus +1 ATK **erst im nächsten eigenen Zug**, nicht schon beim Zurückschlagen. | 53,1 → 50,7 % (je 3.072 Partien) |

Verworfene Varianten (überkorrigiert):
- **Lauer:** nur Infanterie 46,4 %; ohne frisch Eingerückte 46 %.
- **Gegenstoß:** nur die angegriffene Einheit 44,7–46,4 %; nur wenn sie überlebt 47,1 %; Kombination 47,8 %.
- **Stoßtrupp:** alle +1 59,2 % bzw. 55,1 %.

**Normverband:** Die Variante „ab zwei Gattungen“ hob die Doktrin auf etwa 50 %. Dadurch stieg aber Steinmark, das Normverband im Starterdeck führt, auf 55,7 bzw. 59,0 %. Die Änderung ist deshalb zurückgenommen.

**Neue Runtime-Parameter** in `doctrine_runtime.js`, Standard aus:
- GEGENSTOSS: `scope:'target'`, `need_survivor`, `next_turn_only`
- LAUER: `exclude_fresh`, `fresh_except_infantry`

### Nationen

- **Starterdeck-Tausche, nur Plätze 31–60, innerhalb der eigenen Nation:**
  - Ossaria: 5 Tausche gegen schwächere eigene Karten.
  - Namar: 1 Tausch (Nachschubboot → Hafenhelm).
  - Karsk: 1 Tausch (schwacher Soforteinsatz → Optimierter Stoßtrupp).
  - Lyr: 5 Tausche (Soforteinsätze → eigene Einheiten).
  - Caldris: 2 Tausche.
- **Poolwerte ±1 oder eine AP-Stufe, im Wertband:**
  - abgeschwächt: Theryn, Merovan, Vael, Rothain
  - verstärkt: Karsk, Dargan, Namar, Sahr, Lyr
- **Ausgleich für die Lauer-Änderung:** Lyr bekommt 3 zusätzliche Starter-Tausche und 9 Poolwerte. Lyr führt Lauer und fiel nach der Änderung zunächst auf 40,7 %.


### Starterdecks (10080 / 10080 Partien)

| Nation | vorher | nachher |
|---|---|---|
| Karsk | 44,0 % | 51,2 % |
| Lyr | 45,2 % | 50,9 % |
| Caldris | 47,0 % | 51,6 % |
| Sahr | 47,2 % | 48,0 % |
| Merovan | 48,3 % | 47,7 % |
| Dargan | 49,3 % | 49,1 % |
| Eldran | 49,7 % | 48,7 % |
| Orthea | 49,8 % | 48,9 % |
| Vael | 50,6 % | 50,6 % |
| Rothain | 50,7 % | 51,4 % |
| Vesper | 50,7 % | 47,4 % |
| Averon | 51,9 % | 49,4 % |
| Theryn | 52,3 % | 50,6 % |
| Steinmark | 52,8 % | 49,7 % |
| Namar | 53,6 % | 51,2 % |
| Ossaria | 56,8 % | 53,6 % |
| **Spanne** | 44,0–56,8 % | 47,4–53,6 % |
| **Streuung um 50 %** | 3,1 Pkt. | 1,6 Pkt. |
| **Startspieler** | 48,3 % | 48,9 % |

### Mischdecks (10080 / 10080 Partien)

| Nation | vorher | nachher |
|---|---|---|
| Dargan | 42,9 % | 48,8 % |
| Namar | 45,3 % | 49,7 % |
| Sahr | 45,6 % | 47,9 % |
| Karsk | 46,7 % | 49,9 % |
| Lyr | 47,8 % | 44,6 % |
| Eldran | 48,3 % | 48,8 % |
| Ossaria | 49,2 % | 51,2 % |
| Averon | 49,3 % | 49,8 % |
| Vesper | 49,9 % | 49,6 % |
| Steinmark | 50,0 % | 50,9 % |
| Caldris | 51,9 % | 48,3 % |
| Theryn | 53,4 % | 52,3 % |
| Rothain | 53,6 % | 51,3 % |
| Orthea | 53,9 % | 50,5 % |
| Vael | 54,1 % | 52,3 % |
| Merovan | 57,9 % | 54,1 % |
| **Spanne** | 42,9–57,9 % | 44,6–54,1 % |
| **Streuung um 50 %** | 3,8 Pkt. | 2,1 Pkt. |
| **Startspieler** | 57,9 % | 56,9 % |

### Doktrinen (Spiegelmatch, je 32 Partien je Nation und Seite)

| Doktrin | vorher | nachher |
|---|---|---|
| Sicherer Nachschub | 44,9 % | 45,7 % |
| Bollwerk | 45,3 % | 43,2 % |
| Normverband | 46,8 % | 46,0 % |
| Stoßtrupp | 48,3 % | 47,8 % |
| Gepanzerter Fuß | 49,3 % | 47,3 % |
| Marsch aus dem Vollen | 51,2 % | 51,4 % |
| Gegenstoß | 51,9 % | 52,2 % |
| Feuerplan | 52,1 % | 53,5 % |
| Umgehen | 52,1 % | 53,7 % |
| Scheinschwerpunkt | 52,2 % | 54,3 % |
| Lauer | 54,3 % | 48,7 % |

### Doktrinen (Messung f4, je 1.024 Partien; gezielte Proben siehe oben)

| Doktrin | vorher | nachher | Partien je Messung |
|---|---|---|---|
| Sicherer Nachschub | 44,9 % | 45,7 % | 1024 |
| Bollwerk | 45,3 % | 43,2 % | 1024 |
| Normverband | 46,8 % | 46,0 % | 1024 |
| Stoßtrupp | 48,3 % | 47,8 % | 1024 |
| Gepanzerter Fuß | 49,3 % | 47,3 % | 1024 |
| Marsch aus dem Vollen | 51,2 % | 51,4 % | 1024 |
| Gegenstoß | 51,9 % | 52,2 % | 1024 |
| Feuerplan | 52,1 % | 53,5 % | 1024 |
| Umgehen | 52,1 % | 53,7 % | 1024 |
| Scheinschwerpunkt | 52,2 % | 54,3 % | 1024 |
| Lauer | 54,3 % | 48,7 % | 1024 |

## Startspieler-Vorteil in Mischdecks

**Befund:**
- Starterdecks: Der Startspieler gewinnt 48,9 %.
- Mischdecks: Der Startspieler gewinnt 56,9 % (b0: 57,9 %).
- Beide Spieler haben im ersten Zug 5 AP. Daran wird nichts geändert.

**Ursache: Einheitendichte.**
- Ein Mischdeck enthält etwa 51 Einheiten auf 60 Karten, ein Starterdeck etwa 30, dazu Ausrüstung, Soforteinsätze und Unterstützung.
- Je mehr Einheiten im Deck sind, desto früher ist das Brett voll und desto schneller fällt die Entscheidung über Siegpunkte. Im Mittel dauert eine Partie mit Mischdecks 13,7 Züge, mit Starterdecks 15,8 Züge.
- **Messung (Variante off10):** Im Mischdeck wird der Pool erst ab Platz 11 genommen. So kommen etwa 11 Einheiten und 19 Nicht-Einheiten aus dem Pool. Der Startspieler gewinnt dann 52,8 % statt 57,3 %; die Partie dauert 14,7 Züge.
- Einzelne Karten sind nicht die Ursache. Die Abschwächung der Merovan-Einheiten mit 1 AP senkte zwar den Merovan-Wert, nicht aber den Vorteil des Startspielers.

**Regelkonforme Maßnahme:** Die offiziellen Starterdecks sind bereits ausgeglichen (48,9 %). Im Spiel selbst ist deshalb nichts geändert.

**Regelvorschläge, nicht eingebaut:**
1. **Deckbau-Grenze**, zum Beispiel höchstens 40 Einheiten je 60er-Deck. Erwartet wird ein Vorteil von etwa 52–53 %, gemessen mit der Variante off10.
2. **Nachziehender Spieler mit 1 Starthandkarte mehr.** Gemessen nur in einer Variante (r1):
   - Mischdecks: 57,3 → 53,4 %
   - Starterdecks: 48,7 → 45,1 %
   
   Das verschlechtert die Starterdecks. Der Vorschlag wird deshalb nicht empfohlen.

## Offen

- **Bollwerk** (etwa 43 %) und **Sicherer Nachschub** (etwa 46 %) liegen in der Doktrin-Messung niedrig. Ein Grund ist, dass die Bot-KI die Aktionen Schutzwall, Heilen und Überschuss nicht nutzt. Ein Wertzuschlag allein brachte nichts (41–44 %).
- **Normverband** liegt bei etwa 46 %. Eine Verstärkung würde Steinmark zu stark machen.
- **Mischdecks:** Lyr (44,6–47,1 %) und Merovan (53–54 %) streuen zwischen den Messungen am stärksten.
- **Scheinschwerpunkt** liegt bei etwa 54 %. Die Variante ohne DEF-Anteil war im Rauschen nicht niedriger.
