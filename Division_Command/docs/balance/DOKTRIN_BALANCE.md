# Doktrin-Balance

> Branch `doktrin-balance` · Trophy-Regeln unverändert (REGEL_FREEZE) · Kartendecks unverändert · nur Doktrinen + Runtime.

## Methode

- Doktrin-Kampfeffekte waren größtenteils unverdrahtet; neu: `web/js/engine/doctrine_runtime.js`.
- Kreativ lore-nah umgeschrieben (Texte + `effects`), Trophy-Bedarf teils angepasst.
- Averon: zweite Doktrin `Lokalisierung` → `Auswertung` (kein Doppel mehr mit Orthea).
- Iteration: ändern → `node scripts/balance/sim_nation_strength.mjs 10` → nachjustieren.
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
- **Aufklärungsschlag:** Jeder eigene Angriff gegen aufgedeckte Feinde +1 ATK (kein 1×/Zug-Limit mehr); Trophy 8 statt 9 Schaden.
- **Auswertung:** Lokalisierung: aufgedeckt −1 DEF → Erleidet eine eigene Einheit Schaden und überlebt, hat sie bis zum Ende dieses Zuges +1 ATK (nicht stapelbar). Zeit wird zur Waffe — knapp bemessen.

### Caldris
- **Etappensicherung:** → Eigene Einheiten haben +1 DEF (keine Auto-Heilung mehr).
- **Rasten:** Eigene Einheiten, die im letzten Zug nicht angegriffen haben, haben +1 ATK (kein DEF).

### Dargan
- **Zielangriff:** Gegen beschädigte Feinde +1 ATK (statt +2), Kill-Draw bleibt.
- **Abschluss:** Zerstört eine eigene Einheit ein Ziel, hat sie +1 ATK bis Ende deines nächsten Zuges und du ziehst 1.

### Eldran
- **Auffangen:** Eigene Einheiten haben +1 DEF. Hat der Gegner mehr Einheiten im Abschnitt, zusätzlich +1 DEF. Bei Gleichstand +1 ATK.
- **Gegenstoß:** Wurde ein eigener Abschnitt angegriffen, haben Einheiten dort bis zum Ende deines nächsten Zuges +1 ATK. Überlebt die angegriffene Einheit, heilt sie 1.

### Karsk
- **Stoßtrupp:** Stoßtrupp: Infanterie +2 ATK/−1 DEF → Eigene Einheiten haben +1 ATK. Eigene Infanterie hat zusätzlich +1 ATK. Beschädigte Einheiten haben zusätzlich +1 ATK. Der Körper ist Maß und Waffe.
- **Weiterkämpfen:** Weiterkämpfen: beschädigt +1 ATK → Eigene beschädigte Einheiten haben +2 ATK und +1 DEF. Zerstört eine beschädigte Einheit ein Ziel, heilt sie 1 und du erhältst 1 AP (max. 1×/Zug).

### Lyr
- **Lauer:** Ruhende Einheiten +1 ATK (unverändert im Kampf); Trophy strenger: 4 statt 3 Kills.
- **Verteilte Stellung:** Bist du allein im Abschnitt: +1 DEF (kein Gruppen-ATK mehr — verstreute Posten massieren nicht).

### Merovan
- **Verlegung:** Einmal pro Zug für 1 AP eine eigene Einheit 1 Slot seitlich schieben (kein Passiv-+1 DEF — Beweglichkeit statt Panzerung).
- **Ausharren:** Ohne Unterstützung im Abschnitt +1 DEF und +1 ATK.

### Namar
- **Marsch aus dem Vollen:** Marsch aus dem Vollen: mit Support −1 AP → Einheiten kosten 1 AP weniger (min. 1), wenn Unterstützung liegt. Beim Einrücken +1 ATK und +1 DEF bis Zugende.
- **Entsatz:** Entsatz: in angegriffenen Abschnitt +1/+1 → Einheiten in Abschnitten, die im letzten Zug angegriffen wurden, haben +1 ATK und +1 DEF. Einrücken in solche Abschnitte gibt denselben Bonus bis Zugende.

### Orthea
- **Punktfeuer:** Eigene Artillerie hat +1 ATK. Gegen unbeschädigte Ziele +1 ATK. Eigene Angriffe gegen aufgedeckte Feinde +1 Schaden.
- **Lokalisierung:** Eigene Angriffe gegen aufgedeckte Feinde richten +1 Schaden an (kein Extra vs. beschädigt).

### Ossaria
- **Abnutzung:** Kill → Abschnitt +1 ATK, ziehe 1 (keine Heilung mehr — Druck ohne Verband); Trophy 6 Kills.
- **Gepanzerter Fuß:** Eigene Einheiten haben +1 DEF. Ausgerüstete Einheiten haben +1 ATK und +1 DEF zusätzlich.

### Rothain
- **Schwerpunkt:** Schwerpunkt: Abschnitt +1 ATK wählen → Zu Beginn deines Zuges: Stehen mindestens drei eigene Einheiten in einem Abschnitt, erhält der dichteste Abschnitt +1 ATK bis Zugende.
- **Ablösung:** Ablösung: Nach Verlust Einheit aus Hand −1 AP und dauerhaft +1 DEF → Einmal pro Zug: Wird eine eigene Einheit zerstört, kostet die nächste Einheit in denselben Abschnitt 1 AP weniger (min. 1). Kein DEF-Bonus — die Krone ersetzt, …

### Sahr
- **Linienkrieg:** Eigene Einheiten haben +1 DEF; ≥2 im Abschnitt zusätzlich +1 DEF.
- **Umgehen:** Lokale Überzahl → +2 ATK (statt +1) — die Flanke wird zur Zange.

### Steinmark
- **Feuerplan:** Feuerplan: Markierungen → Eigene Angriffe gegen aufgedeckte Feinde richten +1 Schaden an (1× pro Zug).
- **Normverband:** Normverband: alle drei Typen +1/+1 → Hast du Infanterie, Panzer und Artillerie an der Front, haben alle eigenen Fronteinheiten +1 ATK (kein DEF).

### Theryn
- **Breites Aufgebot:** Breites Aufgebot: Infanterie −1 AP → Eigene Infanterie kostet 1 AP weniger zum Ausspielen (min. 1) und hat beim Einrücken +1 DEF.
- **Sturmangriff:** Sturmangriff: Infanterie +2 ATK wählen → Zu Beginn deines Zuges erhält deine stärkste Infanterie +2 ATK bis zum Ende des Zuges.

### Vael
- **Feuerwalze:** Artillerie +1 ATK; Feuerschlag gibt nur den *anderen* Einheiten im Abschnitt +1 ATK (Rohre selbst nicht).
- **Materialersatz:** Panzer und Artillerie kosten immer 1 AP weniger (min. 1); kein Einrück-+DEF.

### Vesper
- **Scheinschwerpunkt:** Scheinschwerpunkt: DEF dann verschieben → Eigene Einheiten in Abschnitten mit höchstens zwei eigenen Einheiten haben +1 DEF und +1 ATK. Das System täuscht Stärke vor.
- **Abriegeln:** Abriegeln: leeren Abschnitt beschießen → Eigene Artillerie hat +1 ATK. Gegen Abschnitte mit höchstens einer Feindeinheit hat sie zusätzlich +1 ATK.

## Offene Designfragen

1. Remis-Quote (~10–35 % je Nation): Soll die Sim/Timeout-Logik oder Trophy-Tempo angepasst werden, damit Roh-WR näher an 50 % liegt?
2. Bot nutzt Wahl-Doktrinen nur über Auto-Heuristik (dichtester Abschnitt / stärkste Infanterie) — menschliche Spieler könnten Lyr/Rothain anders tippen.
3. Ablösung ohne dauerhaftes +DEF: Identität „Krone versagt nie“ noch spürbar genug, oder braucht es einen anderen Erbe-Haken?
4. Unbenutzte Doktrinen (Blitzkrieg, Bollwerk, Sicherer Nachschub, Tiefenverteidigung) bleiben im Pool — später Nationenzuordnung?
5. Kartendecks unverändert: Restabweichungen (Dargan hohes Board, Orthea/Vael leicht unter Board-Mittel) ggf. später über Kernkarten statt Doktrin.

## Ergebnis nach Lyr/Merovan-Nachjustierung (Bestätigung)

Zwei Läufe `sim_nation_strength.mjs 15` (je 3600 Partien, 15 pro gerichteter Paarung):

| Nation | Decided-WR Lauf A | Decided-WR Lauf B | Board% (B) |
|---|---:|---:|---:|
| Lyr | 49.7% | 53.5% | 48.5% |
| Merovan | 51.7% | 49.2% | 51.1% |
| Namar | 54.1% | 51.5% | 50.2% |
| Steinmark | 52.6% | 50.3% | 48.0% |
| Caldris | 52.4% | 50.9% | 49.7% |
| Dargan | 48.7% | 52.1% | 53.9% |
| Ossaria | 49.9% | 53.0% | 51.0% |
| Averon | 50.8% | 48.3% | 51.5% |
| Vael | 49.4% | 51.3% | 49.5% |
| Eldran | 48.9% | 50.0% | 50.6% |
| Rothain | 48.7% | 49.4% | 49.9% |
| Sahr | 48.8% | 50.0% | 48.8% |
| Theryn | 49.1% | 48.5% | 48.1% |
| Karsk | 49.2% | 46.0% | 49.1% |
| Orthea | 48.1% | 48.3% | 48.4% |
| Vesper | 47.9% | 48.4% | 51.7% |

- Lauf A Spanne: **47.9–54.1 %** · Lauf B Spanne: **46.0–53.5 %**
- In 45–55 % Decided: **16/16** in beiden Läufen
- Anlass: nach Choice-Wiring Lyr ~61 %, Merovan ~56 %; Verteilte Stellung / Verlegung+Ausharren lore-nah entschärft, Randnationen mitkorrigiert

### Kernänderungen dieses Passes
- **Lyr:** Verteilte Stellung nur noch allein +1 DEF (Gruppen-ATK weg).
- **Merovan:** Verlegung ohne Passiv-DEF, Schieben kostet 1 AP; Ausharren nur +1 DEF.
- Mitkorrigiert: Ossaria Abnutzung, Orthea Lokalisierung, Vael Materialersatz, Sahr Linienkrieg, Eldran Gegenstoß, Caldris Etappe, Dargan Abschluss.



## Balance-Pass Nov 2026 (nach Bugfix 57bf8ae)

Ausgangslage (2×3600, 15/Paar): Ossaria 56.2 %, Lyr 55.4 %, Averon 44.6 % außerhalb 45–55; Ziel 46–54 % für alle.

Änderungen (lore-nah, minimal):
- **Ossaria / Abnutzung:** Heilung beim Kill entfernt; Trophy 5 → 6 Kills.
- **Lyr / Lauer:** Kampfwert unverändert; Trophy 3 → 4 Kills.
- **Averon / Aufklärungsschlag:** +1 ATK gegen Aufgedeckte bei jedem Angriff (nicht nur erster); Trophy 9 → 8.
- **Dargan / Zielangriff:** vs. beschädigt +2 → +1 ATK.
- **Vael / Feuerwalze:** Sektor-Buff ohne die feuernde Artillerie selbst.
- **Merovan / Ausharren:** +1 ATK zusätzlich zu +1 DEF ohne Support.
- **Sahr / Umgehen:** Überzahl-Bonus +1 → +2 ATK.

Bestätigung: 2×3600 Partien (Seeds Offset 0 / 1 000 000):

| Nation | Decided-WR (Mittel) | Spanne |
|---|---:|---|
| Dargan | 53.22 % | 52.7–53.8 |
| Caldris | 52.67 % | 51.8–53.6 |
| Namar | 52.56 % | 50.2–54.9 |
| Lyr | 51.56 % | 50.4–52.7 |
| Merovan | 51.44 % | 50.9–52.0 |
| Vael | 50.78 % | 48.9–52.7 |
| Steinmark | 50.44 % | 47.3–53.6 |
| Ossaria | 49.78 % | 48.9–50.7 |
| Averon | 49.56 % | 47.3–51.8 |
| Sahr | 49.44 % | 47.8–51.1 |
| Karsk | 49.33 % | 48.4–50.2 |
| Rothain | 49.11 % | 49.1–49.1 |
| Orthea | 48.67 % | 47.8–49.6 |
| Theryn | 48.33 % | 47.8–48.9 |
| Eldran | 46.67 % | 46.2–47.1 |
| Vesper | 46.44 % | 45.3–47.6 |

- Decided-WR gesamt: **46.4–53.2 %** · **16/16 im 46–54-Korridor**
- Startspieler-WR: **51.32 %** (51.11 / 51.53) · Median-Züge 14.5 · Remis 0 %

## t237 (10.11.2026) – Simulationspass

Aus 11.520 Bot-Partien je Modus (Details, alle Vorher/Nachher-Werte: [BALANCE_T237.md](BALANCE_T237.md)):

- **Materialersatz:** Rabatt −1 AP auf Panzer/Artillerie gilt erst, nachdem ein eigener Panzer oder eine eigene Artillerie verloren ging (vorher immer). Vael im gemischten Pool 71,8 % → 53,7 %.
- **Abnutzung:** Kill → Abschnitt +1 ATK, eine eigene Einheit dort heilt 1 (neu), ziehe 1.
- **Zielangriff:** gegen beschädigte Feinde +2 ATK (vorher +1).
- **Abschluss:** Killer +2 ATK bis Ende des nächsten eigenen Zuges (vorher +1).
