# Doktrin-Balance

> Branch `doktrin-balance` · Trophy-Regeln unverändert (REGEL_FREEZE) · Kartendecks unverändert · nur Doktrinen + Runtime.

## Methode

- Doktrin-Kampfeffekte waren größtenteils unverdrahtet; neu: `web/js/engine/doctrine_runtime.js`.
- Kreativ lore-nah umgeschrieben (Texte + `effects`), Trophy-Bedarf teils angepasst.
- Averon: zweite Doktrin `Lokalisierung` → `Auswertung` (kein Doppel mehr mit Orthea).
- Iteration: ändern → `node scripts/sim_nation_strength.mjs 10` → nachjustieren.
- Metrik: **Decided-WR** = Siege/(Siege+Niederlagen), Züge zählen nicht. Roh-WR inkl. Remis liegt tiefer (viele Partien ohne Winner vor Timeout).
- Simrauschen ca. ±2–3 pp; Zielkorridor 45–55 % Decided-WR.

## Ergebnis (2400 Partien, 10 pro gerichteter Paarung)

| Nation | WR vorher (Roh) | Decided-WR nachher | Board% | Δ Decided vs alt.Roh |
|---|---:|---:|---:|---:|
| Lyr | 34.2% | 54.2% | 50.2% | +20.0 |
| Vael | 39.2% | 54.1% | 47.9% | +14.9 |
| Caldris | 32.5% | 53.5% | 50.2% | +21.0 |
| Orthea | 35.4% | 53.0% | 48.9% | +17.6 |
| Eldran | 30.0% | 52.3% | 50.0% | +22.3 |
| Theryn | 47.5% | 52.1% | 49.7% | +4.6 |
| Namar | 46.2% | 51.7% | 49.9% | +5.5 |
| Steinmark | 39.2% | 50.0% | 48.0% | +10.8 |
| Dargan | 32.5% | 49.5% | 53.6% | +17.0 |
| Sahr | 38.8% | 48.3% | 48.7% | +9.5 |
| Karsk | 33.3% | 47.8% | 49.8% | +14.5 |
| Rothain | 56.7% | 47.7% | 50.1% | -9.0 |
| Ossaria | 40.8% | 47.6% | 50.4% | +6.8 |
| Vesper | 31.7% | 46.4% | 50.7% | +14.7 |
| Merovan | 39.6% | 46.3% | 51.4% | +6.7 |
| Averon | 40.4% | 45.0% | 50.3% | +4.6 |

- Decided-WR min/max: 45.0–54.2 %
- Board-Share min/max: 47.9–53.6 %
- In 45–55 % Decided: 16/16 (Grenze Averon 45,0 %; Simrauschen ±2–3 pp)

## Pro Nation: alt → neu (ein Satz)

### Averon
- **Aufklärungsschlag:** Aufklärungsschlag: vs aufgedeckt +1 ATK → Eigene Angriffe gegen aufgedeckte Feinde haben +1 ATK. Nur der erste solche Angriff pro Zug erhält den Bonus.
- **Auswertung:** Lokalisierung: aufgedeckt −1 DEF → Erleidet eine eigene Einheit Schaden und überlebt, hat sie bis zum Ende dieses Zuges +1 ATK (nicht stapelbar). Zeit wird zur Waffe — knapp bemessen.

### Caldris
- **Etappensicherung:** Etappensicherung: Abschnitt +1 DEF wählen → Zu Beginn deines Zuges heilt eine beschädigte eigene Einheit 1. Eigene Einheiten haben +1 DEF.
- **Rasten:** Rasten: nicht angegriffen → +1 ATK → Eigene Einheiten, die im letzten Zug nicht angegriffen haben, haben +1 ATK (kein DEF).

### Dargan
- **Zielangriff:** Zielangriff: markiertes Ziel → Eigene Angriffe gegen beschädigte Feinde haben +2 ATK. Beim Zerstören ziehst du 1.
- **Abschluss:** Abschluss: nach Kill +1 ATK → Zerstört eine eigene Einheit ein Ziel, hat sie +2 ATK bis Ende deines nächsten Zuges und du ziehst 1.

### Eldran
- **Auffangen:** Auffangen: Unterzahl +1 DEF → Eigene Einheiten haben +1 DEF. Hat der Gegner mehr Einheiten im Abschnitt, zusätzlich +1 DEF. Bei Gleichstand +1 ATK.
- **Gegenstoß:** Gegenstoß: nach Angriff +1 ATK → Wurde ein eigener Abschnitt angegriffen, haben Einheiten dort bis zum Ende deines nächsten Zuges +2 ATK. Überlebt die angegriffene Einheit, heilt sie 1.

### Karsk
- **Stoßtrupp:** Stoßtrupp: Infanterie +2 ATK/−1 DEF → Eigene Einheiten haben +1 ATK. Eigene Infanterie hat zusätzlich +1 ATK. Beschädigte Einheiten haben zusätzlich +1 ATK. Der Körper ist Maß und Waffe.
- **Weiterkämpfen:** Weiterkämpfen: beschädigt +1 ATK → Eigene beschädigte Einheiten haben +2 ATK und +1 DEF. Zerstört eine beschädigte Einheit ein Ziel, heilt sie 1 und du erhältst 1 AP (max. 1×/Zug).

### Lyr
- **Lauer:** Lauer: Abschnitt markieren, Einrücken Schaden → Eigene Einheiten, die im letzten Zug nicht angegriffen haben, haben +1 ATK.
- **Verteilte Stellung:** Verteilte Stellung: allein DEF / Gruppe ATK → Bist du allein im Abschnitt: +1 DEF. Mindestens zwei eigene: +1 ATK.

### Merovan
- **Verlegung:** Verlegung: Slot schieben → Einmal pro Zug darfst du eine eigene Einheit um einen Slot seitlich schieben. Alle eigenen Fronteinheiten haben +1 DEF in deinem Zug (Weg bleibt offen).
- **Ausharren:** Ausharren: ohne Support +1/+1 → Eigene Einheiten in einem Abschnitt ohne Unterstützung haben +1 ATK und +1 DEF.

### Namar
- **Marsch aus dem Vollen:** Marsch aus dem Vollen: mit Support −1 AP → Einheiten kosten 1 AP weniger (min. 1), wenn Unterstützung liegt. Beim Einrücken +1 ATK und +1 DEF bis Zugende.
- **Entsatz:** Entsatz: in angegriffenen Abschnitt +1/+1 → Einheiten in Abschnitten, die im letzten Zug angegriffen wurden, haben +1 ATK und +1 DEF. Einrücken in solche Abschnitte gibt denselben Bonus bis Zugende.

### Orthea
- **Punktfeuer:** Punktfeuer: Artillerie-Ziel wählen → Eigene Artillerie hat +1 ATK. Gegen unbeschädigte Ziele +1 ATK. Eigene Angriffe gegen aufgedeckte Feinde +1 Schaden.
- **Lokalisierung:** Lokalisierung: aufgedeckt −1 DEF → Eigene Angriffe gegen aufgedeckte Feinde richten +1 Schaden an. Beschädigte aufgedeckte Feinde zusätzlich +1.

### Ossaria
- **Abnutzung:** Abnutzung: Kill → Abschnitts-ATK → Zerstörst du eine gegnerische Fronteinheit, hat dieser Abschnitt bis Zugende +1 ATK, du heilst 1 dort, und du ziehst 1 Karte. Übrige Abschnitte +1 DEF bis Ende …
- **Gepanzerter Fuß:** Gepanzerter Fuß: ausgerüstet +1/+1 → Eigene Einheiten haben +1 DEF. Ausgerüstete Einheiten haben +1 ATK und +1 DEF zusätzlich.

### Rothain
- **Schwerpunkt:** Schwerpunkt: Abschnitt +1 ATK wählen → Zu Beginn deines Zuges: Stehen mindestens drei eigene Einheiten in einem Abschnitt, erhält der dichteste Abschnitt +1 ATK bis Zugende.
- **Ablösung:** Ablösung: Nach Verlust Einheit aus Hand −1 AP und dauerhaft +1 DEF → Einmal pro Zug: Wird eine eigene Einheit zerstört, kostet die nächste Einheit in denselben Abschnitt 1 AP weniger (min. 1). Kein DEF-Bonus — die Krone ersetzt, …

### Sahr
- **Linienkrieg:** Linienkrieg: ≥2 im Abschnitt +1 DEF → Stehen mindestens zwei eigene Einheiten in einem Abschnitt, haben sie +1 DEF. Der Fluss hält die Linie — ohne Solo-Bonus.
- **Umgehen:** Umgehen: Überzahl +1 ATK → Hast du in einem Abschnitt mehr Einheiten als der Gegner, haben sie +1 ATK.

### Steinmark
- **Feuerplan:** Feuerplan: Markierungen → Eigene Angriffe gegen aufgedeckte Feinde richten +1 Schaden an (1× pro Zug).
- **Normverband:** Normverband: alle drei Typen +1/+1 → Hast du Infanterie, Panzer und Artillerie an der Front, haben alle eigenen Fronteinheiten +1 ATK (kein DEF).

### Theryn
- **Breites Aufgebot:** Breites Aufgebot: Infanterie −1 AP → Eigene Infanterie kostet 1 AP weniger zum Ausspielen (min. 1) und hat beim Einrücken +1 DEF.
- **Sturmangriff:** Sturmangriff: Infanterie +2 ATK wählen → Zu Beginn deines Zuges erhält deine stärkste Infanterie +2 ATK bis zum Ende des Zuges.

### Vael
- **Feuerwalze:** Feuerwalze: Artillerie +1 ATK → Eigene Artillerie hat +1 ATK. Feuert sie, haben alle eigenen Einheiten in ihrem Abschnitt (inkl. der Artillerie) bis Zugende +1 ATK.
- **Materialersatz:** Materialersatz: Ersatz schwerer Einheiten −1 AP → Panzer und Artillerie kosten 1 AP weniger (min. 1), sobald du mindestens eine Einheit verloren hast. Beim Einrücken solcher Einheiten +1 DEF.

### Vesper
- **Scheinschwerpunkt:** Scheinschwerpunkt: DEF dann verschieben → Eigene Einheiten in Abschnitten mit höchstens zwei eigenen Einheiten haben +1 DEF und +1 ATK. Das System täuscht Stärke vor.
- **Abriegeln:** Abriegeln: leeren Abschnitt beschießen → Eigene Artillerie hat +1 ATK. Gegen Abschnitte mit höchstens einer Feindeinheit hat sie zusätzlich +1 ATK.

## Offene Designfragen

1. Remis-Quote (~10–35 % je Nation): Soll die Sim/Timeout-Logik oder Trophy-Tempo angepasst werden, damit Roh-WR näher an 50 % liegt?
2. Bot nutzt Wahl-Doktrinen nur über Auto-Heuristik (dichtester Abschnitt / stärkste Infanterie) — menschliche Spieler könnten Lyr/Rothain anders tippen.
3. Ablösung ohne dauerhaftes +DEF: Identität „Krone versagt nie“ noch spürbar genug, oder braucht es einen anderen Erbe-Haken?
4. Unbenutzte Doktrinen (Blitzkrieg, Bollwerk, Sicherer Nachschub, Tiefenverteidigung) bleiben im Pool — später Nationenzuordnung?
5. Kartendecks unverändert: Restabweichungen (Dargan hohes Board, Orthea/Vael leicht unter Board-Mittel) ggf. später über Kernkarten statt Doktrin.
