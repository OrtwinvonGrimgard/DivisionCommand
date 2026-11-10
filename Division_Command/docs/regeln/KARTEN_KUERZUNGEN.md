# Kartenkürzungen der Prüfung t212

Bei der Kartenprüfung t212 wurden Regeltexte an die Engine angeglichen: Teilsätze, die sich nicht in die allgemeine Mechanik `CM` (bzw. vorhandene Ausrüstungs-Codes) überführen ließen, sind entfallen oder durch eine gleichwertige allgemeine Mechanik ersetzt. Das ist **keine Sprachübersetzung** und kein stehengebliebenes Englisch. Die Bezeichnung in älteren Berichten lautete „teilweise übersetzt“; hier und in `KARTENPRUEFUNG.md` heißt der Vorgang **Regelangleichung mit Kürzung**.

Die gestrichenen Sätze bleiben bewusst draußen (Entscheidung t244), außer den unten kenntlich gemachten Reparaturen an drei Ausrüstungen, deren Werte der Parser fälschlich auf 0 gesetzt hatte, und an Verbindungssiegel (heimlicher ATK-Bonus entfernt).

Quelle: `scripts/cards-review/review.json` (vorher/nachher, `entfallen`). Aktueller Kartentext aus dem Katalog. Erzeugt von `scripts/cards-review/gen_kuerzungen.py`. Volltexte gekürzter Flächentexte stehen weiterhin in [KARTEN_SONDERFAELLE.md](KARTEN_SONDERFAELLE.md).

## Überblick

- Karten: **143** (109 mit Kürzung, 34 mit Kürzung und Ersetzung)
- Entfallene Teilsätze: **147**
- Nach Typ: Einheit 116, Ausrüstung 20, Unterstützung 7
- Alle in `set_nations`.

### Nach Nation

| Nation | Anzahl |
|---|---:|
| Karsk | 14 |
| Orthea | 13 |
| Sahr | 13 |
| Steinmark | 13 |
| Averon | 12 |
| Vesper | 11 |
| Rothain | 10 |
| Caldris | 9 |
| Dargan | 9 |
| Eldran | 8 |
| Namar | 8 |
| Ossaria | 7 |
| Lyr | 4 |
| Merovan | 4 |
| Theryn | 4 |
| Vael | 4 |

## Karten

### Aufklärungspanzer (`dc_b_aufklaerungspanzer_794`, Einheit, Averon) – Regelangleichung mit Kürzung

**Alter Text:** +2 ATK gegen aufgeklärte Feinde; beim Ausspielen decke 2 auf. Einmal/Zug: eine eigene Aufklärung +1 DEF.

**Aktueller Text:** +2 ATK gegen beobachtete Ziele.

**Entfallen:**

- beim Ausspielen decke 2 auf.
- Einmal/Zug: eine eigene Aufklärung +1 DEF.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Ed-Ruh-Pfad (`dc_b_ed_ruh_pfad_804`, Einheit, Averon) – Regelangleichung mit Kürzung

**Alter Text:** Schaue oberste 3; behalte 1 Sofort-/Unterstützung.

**Aktueller Text:** *(kein Text)*

**Entfallen:**

- behalte 1 Sofort-/Unterstützung.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Frühstoß (`dc_b_fruehstoss_793`, Einheit, Averon) – Regelangleichung mit Kürzung

**Alter Text:** Bei Kill: decke 1 auf ODER ziehe 1.

**Aktueller Text:** Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- ODER ziehe 1.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Knotenwache (`dc_b_knotenwache_781`, Einheit, Averon) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF; kostet 1 weniger bei Unterstützung (min. 1).

**Aktueller Text:** Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.

**Entfallen:**

- kostet 1 weniger bei Unterstützung (min. 1).

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Gefechtsbereit; ATK/DEF 2/2 → 2/3). Der entfallene Teil ist bewusst nicht in der Engine.

### Lage-Offen (`dc_b_lage_offen_805`, Einheit, Averon) – Regelangleichung mit Kürzung

**Alter Text:** Schaue oberste 3; behalte 1 Sofort-/Unterstützung; decke 1 auf.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- behalte 1 Sofort-/Unterstützung

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Lina-Melder (`dc_b_lina_melder_803`, Einheit, Averon) – Regelangleichung mit Kürzung

**Alter Text:** Einmal/Zug: decke auf; eine eigene Einheit +1 ATK.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- eine eigene Einheit +1 ATK.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Nordfall-Übung (`dc_b_nordfall_uebung_813`, Unterstützung, Averon) – Regelangleichung mit Kürzung

**Alter Text:** Einheiten hier +1 DEF; einmal/Zug: decke 1 auf ODER ziehe 1.

**Aktueller Text:** Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF. Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- ODER ziehe 1.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Nordmark-Rohr (`dc_b_nordmark_rohr_799`, Einheit, Averon) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 ATK; einmal/Zug: wenn Infanterie im Abschnitt → decke 1 auf.

**Aktueller Text:** Steilfeuer II. Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- einmal/Zug: wenn Infanterie im Abschnitt → decke 1 auf.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Fernschuss; ATK/DEF 3/2 → 4/2). Der entfallene Teil ist bewusst nicht in der Engine.

### Quellenläufer (`dc_b_quellenlaeufer_806`, Einheit, Averon) – Regelangleichung mit Kürzung

**Alter Text:** Decke auf; ziehe 1 wenn Feind angrenzt. [Quellenläufer]

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- ziehe 1 wenn Feind angrenzt.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Sensor-Knoten (`dc_b_sensor_knoten_834`, Ausrüstung, Averon) – Regelangleichung mit Kürzung

**Alter Text:** Träger +1 ATK; einmal/Zug: decke 1 auf.

**Aktueller Text:** Träger +1 ATK. Beim Anlegen: decke eine verdeckte gegnerische Einheit auf.

**Entfallen:**

- einmal/Zug: decke 1 auf.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Verbindungssiegel (`dc_b_verbindungssiegel_839`, Ausrüstung, Averon) – Regelangleichung mit Kürzung

**Alter Text:** Träger +1 ATK gegen Aufgeklärte; einmal/Zug: decke 1 auf.

**Aktueller Text:** Beim Anlegen: decke eine verdeckte gegnerische Einheit auf.

**Entfallen:**

- einmal/Zug: decke 1 auf.

**Hinweis:** Bewusst: „einmal/Zug: decke 1 auf“ bleibt als „Beim Anlegen“. Der im Code stehen gebliebene Bonus „+1 ATK gegen beobachtete Ziele“ wurde in t244 entfernt, damit die Karte nur noch tut, was auf ihr steht.

### Westhaven-Batterie (`dc_b_westhaven_batterie_800`, Einheit, Averon) – Regelangleichung mit Kürzung

**Alter Text:** +2 ATK nach einem Kill diesen Zug; ziehe 1 bei Kill. [Westhaven-Batterie]

**Aktueller Text:** Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.

**Entfallen:**

- +2 ATK nach einem Kill diesen Zug

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Aktenblick (`dc_b_aktenblick_324`, Einheit, Caldris) – Regelangleichung mit Kürzung

**Alter Text:** Schaue oberste 2; behalte 1 Heilungs-/Unterstützungs-Karte.

**Aktueller Text:** *(kein Text)*

**Entfallen:**

- behalte 1 Heilungs-/Unterstützungs-Karte.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Deckungsfeuer (`dc_b_deckungsfeuer_315`, Einheit, Caldris) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 ATK; eigene im Zielabschnitt +1 DEF diesen Zug.

**Aktueller Text:** Steilfeuer II. Der erste Schaden je Zug sinkt um 1.

**Entfallen:**

- eigene im Zielabschnitt +1 DEF diesen Zug.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Durchschlag; ATK/DEF 3/2 → 4/2). Der entfallene Teil ist bewusst nicht in der Engine.

### Formularspäher (`dc_b_formularspaeher_326`, Einheit, Caldris) – Regelangleichung mit Kürzung

**Alter Text:** Decke Feind auf; wenn er diesen Zug angreift, −1 ATK.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- wenn er diesen Zug angreift, −1 ATK.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Institutionsstoff (`dc_b_institutionsstoff_353`, Ausrüstung, Caldris) – Regelangleichung mit Kürzung

**Alter Text:** Träger +1 ATK/+1 DEF; einmal/Zug: Einheit hier +1 DEF. [Institutionsstoff]

**Aktueller Text:** Träger +1 ATK, +1 DEF.

**Entfallen:**

- einmal/Zug: Einheit hier +1 DEF.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Klinikschild (`dc_b_klinikschild_309`, Einheit, Caldris) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF; Einheiten im Abschnitt heilen 1 nach Ruhezug.

**Aktueller Text:** Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.

**Entfallen:**

- Einheiten im Abschnitt heilen 1 nach Ruhezug.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (ATK/DEF 3/5 → 3/6). Der entfallene Teil ist bewusst nicht in der Engine.

### Lückenhof-Geschütz (`dc_b_lueckenhof_geschuetz_322`, Einheit, Caldris) – Regelangleichung mit Kürzung

**Alter Text:** +1 ATK gegen aufgeklärte; heile 1 an ruhender Einheit.

**Aktueller Text:** Steilfeuer II. +1 ATK gegen beobachtete Ziele.

**Entfallen:**

- heile 1 an ruhender Einheit.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Ringwächter (`dc_b_ringwaechter_325`, Einheit, Caldris) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF; Feinde im Abschnitt können nicht verdeckt bleiben.

**Aktueller Text:** Der erste Schaden je Zug sinkt um 1.

**Entfallen:**

- Feinde im Abschnitt können nicht verdeckt bleiben.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Stellungswechsel; ATK/DEF 2/3 → 2/4). Der entfallene Teil ist bewusst nicht in der Engine.

### Seren-Zug (`dc_b_seren_zug_304`, Einheit, Caldris) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF; heile 1, wenn sie im letzten Zug nicht angriff.

**Aktueller Text:** Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.

**Entfallen:**

- heile 1, wenn sie im letzten Zug nicht angriff.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (ATK/DEF 2/4 → 2/5). Der entfallene Teil ist bewusst nicht in der Engine.

### Versorgungskeil (`dc_b_versorgungskeil_307`, Einheit, Caldris) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF; heile 1 an Infanterie im Abschnitt einmal/Zug.

**Aktueller Text:** Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.

**Entfallen:**

- heile 1 an Infanterie im Abschnitt einmal/Zug.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Durchschlag; ATK/DEF 2/4 → 2/5). Der entfallene Teil ist bewusst nicht in der Engine.

### Abschlussgeschütz (`dc_b_abschlussgeschuetz_917`, Einheit, Dargan) – Regelangleichung mit Kürzung

**Alter Text:** +2 ATK nach einem Kill diesen Zug; ziehe 1 bei Kill. [Abschlussgeschütz]

**Aktueller Text:** Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.

**Entfallen:**

- +2 ATK nach einem Kill diesen Zug

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Abschriftleser (`dc_b_abschriftleser_923`, Einheit, Dargan) – Regelangleichung mit Kürzung

**Alter Text:** Decke auf; ziehe 1 wenn Feind angrenzt.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- ziehe 1 wenn Feind angrenzt.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Datums-Melder (`dc_b_datums_melder_924`, Einheit, Dargan) – Regelangleichung mit Kürzung

**Alter Text:** Decke auf; ziehe 1. [Datums-Melder]

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- ziehe 1.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Gegenrechnung (`dc_b_gegenrechnung_925`, Einheit, Dargan) – Regelangleichung mit Kürzung

**Alter Text:** Schaue oberste 3; behalte 1 Sofort-/Unterstützung. (Gegenrechnung)

**Aktueller Text:** *(kein Text)*

**Entfallen:**

- behalte 1 Sofort-/Unterstützung.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Halle Kalden (`dc_b_halle_kalden_930`, Unterstützung, Dargan) – Regelangleichung mit Kürzung

**Alter Text:** Einheiten hier +1 DEF, wenn mindestens zwei Einheiten im Abschnitt. Nach einem Kill hier: ziehe 1.

**Aktueller Text:** Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht.

**Entfallen:**

- Nach einem Kill hier: ziehe 1.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Kalden-Batterie (`dc_b_kalden_batterie_920`, Einheit, Dargan) – Regelangleichung mit Kürzung

**Alter Text:** +2 ATK nach einem Kill diesen Zug; ziehe 1 bei Kill. [Kalden-Batterie]

**Aktueller Text:** Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.

**Entfallen:**

- +2 ATK nach einem Kill diesen Zug

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Schuldblatt (`dc_b_schuldblatt_935`, Unterstützung, Dargan) – Regelangleichung mit Kürzung

**Alter Text:** Einheiten hier +1 ATK/+1 DEF; einmal/Zug: negiere 1 Schaden an einer Einheit hier. Danach: diese Einheit gilt als „genannt“ (+1 ATK gegen sie für den Gegner bis Zugende).

**Aktueller Text:** Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK und +1 DEF. Eigene Einheiten im gewählten Abschnitt: Der erste Schaden je Zug sinkt um 1.

**Entfallen:**

- Danach: diese Einheit gilt als „genannt“.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Selm-Läufer (`dc_b_selm_laeufer_926`, Einheit, Dargan) – Regelangleichung mit Kürzung

**Alter Text:** Decke auf; ziehe 1 wenn Feind angrenzt. [Selm-Läufer]

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- ziehe 1 wenn Feind angrenzt.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Zielangriff-Keil (`dc_b_zielangriff_keil_914`, Einheit, Dargan) – Regelangleichung mit Kürzung

**Alter Text:** +2 ATK gegen ein gewähltes Ziel; Träger +1 DEF. Bei Kill am genannten Ziel: +1 ATK bis Zugende.

**Aktueller Text:** Ihr erster Angriff nach dem Ausspielen hat +2 ATK.

**Entfallen:**

- Bei Kill am genannten Ziel: +1 ATK bis Zugende.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Auffangfeuer (`dc_b_auffangfeuer_742`, Einheit, Eldran) – Regelangleichung mit Kürzung

**Alter Text:** +2 ATK nach einem Kill diesen Zug; ziehe 1 bei Kill. [Auffangfeuer]

**Aktueller Text:** Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.

**Entfallen:**

- +2 ATK nach einem Kill diesen Zug

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Auffangposten (`dc_b_auffangposten_723`, Einheit, Eldran) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF; kostet 1 weniger bei Unterstützung (min. 1). [Auffangposten]

**Aktueller Text:** Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.

**Entfallen:**

- kostet 1 weniger bei Unterstützung (min. 1).

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Sicherung; ATK/DEF 2/3 → 2/4). Der entfallene Teil ist bewusst nicht in der Engine.

### Gassenmelder (`dc_b_gassenmelder_744`, Einheit, Eldran) – Regelangleichung mit Kürzung

**Alter Text:** Schaue oberste 3; behalte 1 Sofort-/Unterstützung. [Gassenmelder]

**Aktueller Text:** *(kein Text)*

**Entfallen:**

- behalte 1 Sofort-/Unterstützung.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Grenzlese (`dc_b_grenzlese_745`, Einheit, Eldran) – Regelangleichung mit Kürzung

**Alter Text:** Schaue oberste 3; behalte 1 Sofort-/Unterstützung. [Grenzlese]

**Aktueller Text:** *(kein Text)*

**Entfallen:**

- behalte 1 Sofort-/Unterstützung.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Markengeschütz (`dc_b_markengeschuetz_739`, Einheit, Eldran) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF; ziehe 1 wenn du diesen Zug nicht bewegt hast. [Markengeschütz]

**Aktueller Text:** Steilfeuer II.

**Entfallen:**

- ziehe 1 wenn du diesen Zug nicht bewegt hast.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Stellungswechsel; ATK/DEF 3/2 → 3/3). Der entfallene Teil ist bewusst nicht in der Engine.

### Markenspäher (`dc_b_markenspaeher_743`, Einheit, Eldran) – Regelangleichung mit Kürzung

**Alter Text:** Einmal/Zug: decke auf; eine eigene Einheit +1 DEF. [Markenspäher]

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- eine eigene Einheit +1 DEF.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Schulrain-Läufer (`dc_b_schulrain_laeufer_746`, Einheit, Eldran) – Regelangleichung mit Kürzung

**Alter Text:** Schaue oberste 3; behalte 1 Sofort-/Unterstützung. [Schulrain-Läufer]

**Aktueller Text:** *(kein Text)*

**Entfallen:**

- behalte 1 Sofort-/Unterstützung.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Zeughauszug (`dc_b_zeughauszug_725`, Einheit, Eldran) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF; kostet 1 weniger bei Unterstützung (min. 1). [Zeughauszug]

**Aktueller Text:** Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.

**Entfallen:**

- kostet 1 weniger bei Unterstützung (min. 1).

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (ATK/DEF 2/4 → 2/5). Der entfallene Teil ist bewusst nicht in der Engine.

### Ersatzkeil (`dc_b_ersatzkeil_366`, Einheit, Karsk) – Regelangleichung mit Kürzung

**Alter Text:** Wenn zerstört: heile 1 DEF an einer anderen eigenen Einheit und lege die oberste Friedhofskarte unter dein Deck. +1 ATK solange beschädigt.

**Aktueller Text:** +1 ATK, solange sie beschädigt ist.

**Entfallen:**

- Wenn zerstört: heile 1 DEF an einer anderen eigenen Einheit und lege die oberste Friedhofskarte unter dein Deck.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Filterpanzer (`dc_b_filterpanzer_365`, Einheit, Karsk) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF. Ignoriert den ersten Schaden durch Soforteinsatz. Einmal/Zug: erleide 1 Schaden → +2 ATK bis Zugende.

**Aktueller Text:** Der erste Schaden je Zug sinkt um 1.

**Entfallen:**

- Ignoriert den ersten Schaden durch Soforteinsatz.
- Einmal/Zug: erleide 1 Schaden → +2 ATK bis Zugende.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (ATK/DEF 3/3 → 3/4). Der entfallene Teil ist bewusst nicht in der Engine.

### Filterstellung (`dc_b_filterstellung_377`, Einheit, Karsk) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF. Gegnerische Soforteinsätze gegen Einheiten hier kosten 1 AP mehr.

**Aktueller Text:** Steilfeuer II. Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.

**Entfallen:**

- Gegnerische Soforteinsätze gegen Einheiten hier kosten 1 AP mehr.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (ATK/DEF 2/3 → 2/4). Der entfallene Teil ist bewusst nicht in der Engine.

### Implantatrohr (`dc_b_implantatrohr_408`, Einheit, Karsk) – Regelangleichung mit Kürzung

**Alter Text:** +1 ATK, solange beschädigt. Einmal/Zug: opfere 1 DEF am Rohr → ziehe 1.

**Aktueller Text:** Steilfeuer II. +1 ATK, solange sie beschädigt ist.

**Entfallen:**

- Einmal/Zug: opfere 1 DEF am Rohr → ziehe 1.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Keilspitze (`dc_b_keilspitze_364`, Einheit, Karsk) – Regelangleichung mit Kürzung

**Alter Text:** Der erste Angriff nach dem Ausspielen hat +2 ATK; danach −1 DEF bis Zugende.

**Aktueller Text:** Ihr erster Angriff nach dem Ausspielen hat +2 ATK.

**Entfallen:**

- danach −1 DEF bis Zugende.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Knochenbatterie (`dc_b_knochenbatterie_411`, Einheit, Karsk) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF. Bei Zerstörung: ziehe 1 und eine eigene Einheit erleidet 1 Schaden (Optimierungsrest).

**Aktueller Text:** Steilfeuer II.

**Entfallen:**

- Bei Zerstörung: ziehe 1 und eine eigene Einheit erleidet 1 Schaden.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Nachsetzen, Zuteilung; ATK/DEF 4/2 → 4/3). Der entfallene Teil ist bewusst nicht in der Engine.

### Knochenkette (`dc_b_knochenkette_370`, Einheit, Karsk) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF. Angrenzende eigene Infanterie +1 ATK beim ersten Angriff.

**Aktueller Text:** Ihr erster Angriff nach dem Ausspielen hat +1 ATK.

**Entfallen:**

- Angrenzende eigene Infanterie +1 ATK beim ersten Angriff.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (ATK/DEF 2/3 → 2/4). Der entfallene Teil ist bewusst nicht in der Engine.

### Maßeinheit (`dc_b_masseinheit_368`, Einheit, Karsk) – Regelangleichung mit Kürzung

**Alter Text:** +1 ATK und +1 DEF, solange beschädigt. Heilen dieser Einheit kostet +1 AP.

**Aktueller Text:** +1 ATK und +1 DEF, solange sie beschädigt ist.

**Entfallen:**

- Heilen dieser Einheit kostet +1 AP.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Maßkommandant (`dc_b_masskommandant_386`, Einheit, Karsk) – Regelangleichung mit Kürzung

**Alter Text:** Einheiten hier +1 ATK solange beschädigt. Einmal/Zug: opfere 1 DEF an einer Einheit hier → heile 2 an einer anderen.

**Aktueller Text:** Andere eigene Einheiten in ihrem Abschnitt: +1 ATK, solange diese Einheit beschädigt ist.

**Entfallen:**

- Einmal/Zug: opfere 1 DEF an einer Einheit hier → heile 2 an einer anderen.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Maßtrupp (`dc_b_masstrupp_362`, Einheit, Karsk) – Regelangleichung mit Kürzung

**Alter Text:** +1 ATK und +1 DEF, solange beschädigt. Einmal/Zug: erleide 1 Schaden → ignoriere den nächsten Schaden.

**Aktueller Text:** +1 ATK und +1 DEF, solange sie beschädigt ist.

**Entfallen:**

- Einmal/Zug: erleide 1 Schaden → ignoriere den nächsten Schaden.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Schnittstelle (`dc_b_schnittstelle_363`, Einheit, Karsk) – Regelangleichung mit Kürzung

**Alter Text:** Kann verdeckt gespielt werden. Aufdecken: +1 ATK bis Zugende; erleide 1 Schaden.

**Aktueller Text:** Ihr erster Angriff hat +1 ATK.

**Entfallen:**

- erleide 1 Schaden.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Schwere Stoßgruppe (`dc_b_schwere_stossgruppe_367`, Einheit, Karsk) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +2 ATK. Nach dem ersten Angriff: −1 DEF und ziehe 1 (Schmerzprotokoll).

**Aktueller Text:** *(kein Text)*

**Entfallen:**

- Nach dem ersten Angriff: −1 DEF und ziehe 1.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Zuteilung; ATK/DEF 4/2 → 6/2). Der entfallene Teil ist bewusst nicht in der Engine.

### Systemstoß (`dc_b_systemstoss_374`, Einheit, Karsk) – Regelangleichung mit Kürzung

**Alter Text:** +3 ATK im ersten Angriff. Danach -1 DEF bis Zugende.

**Aktueller Text:** Ihr erster Angriff nach dem Ausspielen hat +3 ATK.

**Entfallen:**

- Danach -1 DEF bis Zugende.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Wartungskolonne (`dc_b_wartungskolonne_372`, Einheit, Karsk) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF. Einmal pro Zug: heile 1 DEF an sich selbst, wenn beschädigt; dann erleidet eine eigene Infanterie im Abschnitt 1 Schaden.

**Aktueller Text:** Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.

**Entfallen:**

- Einmal pro Zug: heile 1 DEF an sich selbst, wenn beschädigt
- dann erleidet eine eigene Infanterie im Abschnitt 1 Schaden.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (ATK/DEF 4/4 → 4/5). Der entfallene Teil ist bewusst nicht in der Engine.

### Abschriftblick (`dc_b_abschriftblick_227`, Einheit, Lyr) – Regelangleichung mit Kürzung

**Alter Text:** Schaue oberste 2; behalte 1, lege 1 unten.

**Aktueller Text:** *(kein Text)*

**Entfallen:**

- behalte 1, lege 1 unten.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Eidhof-Kaliber (`dc_b_eidhof_kaliber_81`, Einheit, Lyr) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF; ziehe 1 wenn du diesen Zug nicht bewegt hast. [Eidhof-Kaliber]

**Aktueller Text:** Steilfeuer II.

**Entfallen:**

- ziehe 1 wenn du diesen Zug nicht bewegt hast.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Stellungswechsel; ATK/DEF 2/2 → 2/3). Der entfallene Teil ist bewusst nicht in der Engine.

### Mar Aschen (`dc_b_mar_aschen_229`, Einheit, Lyr) – Regelangleichung mit Kürzung

**Alter Text:** Beim Ausspielen: heile 2; ziehe 1 wenn allein.

**Aktueller Text:** Beim Ausspielen: heile 2 DEF an deiner am stärksten beschädigten Einheit.

**Entfallen:**

- ziehe 1 wenn allein.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Passoptik (`dc_b_passoptik_255`, Ausrüstung, Lyr) – Regelangleichung mit Kürzung

**Alter Text:** Aufklärung/Artillerie +1 ATK gegen Einrückende.

**Aktueller Text:** Nur an Aufklärung oder Artillerie. +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.

**Entfallen:**

- Aufklärung/Artillerie +1 ATK gegen Einrückende.

**Hinweis:** In t244 wiederhergestellt: verlorenes +1 ATK und die Bedingung „gegen Einrückende“ sind wieder in Effekt und Text, anlegbar an Aufklärung oder Artillerie.

### Fahrplanblick (`dc_b_fahrplanblick_188`, Einheit, Merovan) – Regelangleichung mit Kürzung

**Alter Text:** Einmal/Zug: decke auf; eine eigene Einheit +1 DEF. [Fahrplanblick]

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- eine eigene Einheit +1 DEF.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Kronenhof-Kaliber (`dc_b_kronenhof_kaliber_62`, Einheit, Merovan) – Regelangleichung mit Kürzung

**Alter Text:** +2 ATK nach einem Kill diesen Zug; ziehe 1 bei Kill. [Kronenhof-Kaliber]

**Aktueller Text:** Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.

**Entfallen:**

- +2 ATK nach einem Kill diesen Zug

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Lizenzsiegel (`dc_b_lizenzsiegel_216`, Ausrüstung, Merovan) – Regelangleichung mit Kürzung

**Alter Text:** Träger +1 ATK/+1 DEF; einmal/Zug: Einheit hier +1 DEF. [Lizenzsiegel]

**Aktueller Text:** Träger +1 ATK, +1 DEF.

**Entfallen:**

- einmal/Zug: Einheit hier +1 DEF.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Wegspäher (`dc_b_wegspaeher_185`, Einheit, Merovan) – Regelangleichung mit Kürzung

**Alter Text:** Feind aufgeklärt; nächstes Schieben kostet 0 zusätzlich.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- nächstes Schieben kostet 0 zusätzlich.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Fahrplan (`dc_b_fahrplan_538`, Ausrüstung, Namar) – Regelangleichung mit Kürzung

**Alter Text:** Träger +1 DEF; bei Rücken in angegriffenen Abschnitt +1 ATK.

**Aktueller Text:** Träger +1 DEF.

**Entfallen:**

- bei Rücken in angegriffenen Abschnitt +1 ATK.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Hintermark-Rohr (`dc_b_hintermark_rohr_501`, Einheit, Namar) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF; ziehe 1 wenn Entsatz diesen Zug.

**Aktueller Text:** Steilfeuer II.

**Entfallen:**

- ziehe 1 wenn Entsatz diesen Zug.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Zuteilung; ATK/DEF 3/3 → 3/4). Der entfallene Teil ist bewusst nicht in der Engine.

### Kaihof-Auge (`dc_b_kaihof_auge_505`, Einheit, Namar) – Regelangleichung mit Kürzung

**Alter Text:** Schaue oberste 3; behalte 1 Unterstützungs-/Einsatzkarte.

**Aktueller Text:** *(kein Text)*

**Entfallen:**

- behalte 1 Unterstützungs-/Einsatzkarte.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Restzähler (`dc_b_restzaehler_506`, Einheit, Namar) – Regelangleichung mit Kürzung

**Alter Text:** Decke auf; ziehe 1 wenn Feind ohne Unterstützung angrenzt.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- ziehe 1 wenn Feind ohne Unterstützung angrenzt.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Straßenfeuer (`dc_b_strassenfeuer_499`, Einheit, Namar) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 ATK; einmal/Zug: Unterstützung im Abschnitt → +1 ATK.

**Aktueller Text:** Steilfeuer II. Ihr erster Angriff nach dem Ausspielen hat +1 ATK.

**Entfallen:**

- einmal/Zug: Unterstützung im Abschnitt → +1 ATK.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Staffelangriff; ATK/DEF 3/2 → 4/2). Der entfallene Teil ist bewusst nicht in der Engine.

### Straßenriegel (`dc_b_strassenriegel_491`, Einheit, Namar) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +2 DEF; ziehe 1 wenn Entsatz diesen Zug.

**Aktueller Text:** *(kein Text)*

**Entfallen:**

- ziehe 1 wenn Entsatz diesen Zug.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Abschirmung, Zuteilung; ATK/DEF 2/5 → 2/7). Der entfallene Teil ist bewusst nicht in der Engine.

### Wegmelder (`dc_b_wegmelder_504`, Einheit, Namar) – Regelangleichung mit Kürzung

**Alter Text:** Decke auf; +1 DEF wenn Abschnitt zuletzt angegriffen.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- +1 DEF wenn Abschnitt zuletzt angegriffen.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Zollspäher (`dc_b_zollspaeher_503`, Einheit, Namar) – Regelangleichung mit Kürzung

**Alter Text:** Einmal/Zug: decke auf; wenn Unterstützung im Abschnitt, ziehe 1.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- wenn Unterstützung im Abschnitt, ziehe 1.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Abbruchsalve (`dc_b_abbruchsalve_442`, Einheit, Orthea) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 ATK; bei Miss (kein Kill): Abschnitt +1 DEF.

**Aktueller Text:** Steilfeuer II. Der erste Schaden je Zug sinkt um 1.

**Entfallen:**

- bei Miss: Abschnitt +1 DEF.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (ATK/DEF 3/3 → 4/3). Der entfallene Teil ist bewusst nicht in der Engine.

### Asteron-Schild (`dc_b_asteron_schild_429`, Einheit, Orthea) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF; einmal/Zug decke Feind im Abschnitt auf.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- einmal/Zug decke Feind im Abschnitt auf.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Durchschlag; ATK/DEF 3/5 → 3/6). Der entfallene Teil ist bewusst nicht in der Engine.

### Einzelschuss (`dc_b_einzelschuss_434`, Einheit, Orthea) – Regelangleichung mit Kürzung

**Alter Text:** +2 ATK gegen aufgeklärte; nach Kill: decke nächsten Feind auf.

**Aktueller Text:** +2 ATK gegen beobachtete Ziele.

**Entfallen:**

- nach Kill: decke nächsten Feind auf.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Fachoffizier (`dc_b_fachoffizier_449`, Einheit, Orthea) – Regelangleichung mit Kürzung

**Alter Text:** +1 ATK gegen aufgeklärte; melde abweichend: ziehe 1 bei Miss.

**Aktueller Text:** +1 ATK gegen beobachtete Ziele.

**Entfallen:**

- melde abweichend: ziehe 1 bei Miss.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Feuerleit (`dc_b_feuerleit_439`, Einheit, Orthea) – Regelangleichung mit Kürzung

**Alter Text:** Decke Feind auf; +2 ATK gegen ihn diesen Zug.

**Aktueller Text:** Steilfeuer II. Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- +2 ATK gegen ihn diesen Zug.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Kliniktief (`dc_b_kliniktief_453`, Unterstützung, Orthea) – Regelangleichung mit Kürzung

**Alter Text:** Heile 1; keine Rangsortierung — alle Einheiten im Abschnitt +1 DEF.

**Aktueller Text:** Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.

**Entfallen:**

- keine Rangsortierung — alle Einheiten im Abschnitt +1 DEF.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Lokalisierer (`dc_b_lokalisierer_444`, Einheit, Orthea) – Regelangleichung mit Kürzung

**Alter Text:** Decke auf; ziehe 1 wenn Ziel DEF ≤ 2.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- ziehe 1 wenn Ziel DEF ≤ 2.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Messgerät (`dc_b_messgeraet_471`, Ausrüstung, Orthea) – Regelangleichung mit Kürzung

**Alter Text:** Träger +1 ATK/+1 DEF; einmal/Zug: Einheit hier +1 DEF. [Messgerät]

**Aktueller Text:** Träger +1 ATK, +1 DEF.

**Entfallen:**

- einmal/Zug: Einheit hier +1 DEF.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Methodenspäher (`dc_b_methodenspaeher_445`, Einheit, Orthea) – Regelangleichung mit Kürzung

**Alter Text:** Schaue oberste 3; behalte 1 Aufklärungs-/Einsatzkarte.

**Aktueller Text:** *(kein Text)*

**Entfallen:**

- behalte 1 Aufklärungs-/Einsatzkarte.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Probenpanzer (`dc_b_probenpanzer_431`, Einheit, Orthea) – Regelangleichung mit Kürzung

**Alter Text:** Beim Ausspielen: decke 1 auf; +1 ATK gegen ihn.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- +1 ATK gegen ihn.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Trotzmelder (`dc_b_trotzmelder_446`, Einheit, Orthea) – Regelangleichung mit Kürzung

**Alter Text:** Decke auf; wenn Ziel diesen Zug angreift, −1 ATK.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- wenn Ziel diesen Zug angreift, −1 ATK.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Werkbach-Riegel (`dc_b_werkbach_riegel_430`, Einheit, Orthea) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +2 DEF; ziehe 1 wenn du diesen Zug aufdeckst.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- ziehe 1 wenn du diesen Zug aufdeckst.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (ATK/DEF 2/5 → 2/7). Der entfallene Teil ist bewusst nicht in der Engine.

### Zielrechnung (`dc_b_zielrechnung_436`, Einheit, Orthea) – Regelangleichung mit Kürzung

**Alter Text:** +2 ATK gegen aufgeklärte; kostet 1 weniger nach Aufdecken.

**Aktueller Text:** Steilfeuer II. +2 ATK gegen beobachtete Ziele.

**Entfallen:**

- kostet 1 weniger nach Aufdecken.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Hofspäher (`dc_b_hofspaeher_265`, Einheit, Ossaria) – Regelangleichung mit Kürzung

**Alter Text:** Schaue oberste 2 Ausrüstungen/Einheiten; behalte 1.

**Aktueller Text:** *(kein Text)*

**Entfallen:**

- behalte 1.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Knochennagel (`dc_b_knochennagel_297`, Ausrüstung, Ossaria) – Regelangleichung mit Kürzung

**Alter Text:** Träger +1 DEF; überlebt Angriff: +1 ATK bis Zugende.

**Aktueller Text:** Träger +1 DEF.

**Entfallen:**

- überlebt Angriff: +1 ATK bis Zugende.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Linsenläufer (`dc_b_linsenlaeufer_263`, Einheit, Ossaria) – Regelangleichung mit Kürzung

**Alter Text:** Feind aufgeklärt; +1 ATK wenn Ziel Ausrüstung hat.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- +1 ATK wenn Ziel Ausrüstung hat.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Marenfeld-Geschütz (`dc_b_marenfeld_geschuetz_105`, Einheit, Ossaria) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF; heile 1 wenn Feind stirbt.

**Aktueller Text:** Steilfeuer II. Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.

**Entfallen:**

- heile 1 wenn Feind stirbt.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Fernschuss; ATK/DEF 3/3 → 3/4). Der entfallene Teil ist bewusst nicht in der Engine.

### Namensblick (`dc_b_namensblick_266`, Einheit, Ossaria) – Regelangleichung mit Kürzung

**Alter Text:** Decke Feind auf; wenn er stirbt diesen Zug, heile 1.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- wenn er stirbt diesen Zug, heile 1.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Schmiedehammer (`dc_b_schmiedehammer_295`, Ausrüstung, Ossaria) – Regelangleichung mit Kürzung

**Alter Text:** Träger +1 ATK/+1 DEF; einmal/Zug: Einheit hier +1 DEF. [Schmiedehammer]

**Aktueller Text:** Träger +1 ATK, +1 DEF.

**Entfallen:**

- einmal/Zug: Einheit hier +1 DEF.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Totenwall-Keil (`dc_b_totenwall_keil_98`, Einheit, Ossaria) – Regelangleichung mit Kürzung

**Alter Text:** +2 ATK/+2 DEF mit Ausrüstung; stirbt Feind: Abschnitt +1 ATK.

**Aktueller Text:** +2 ATK und +2 DEF, solange sie Ausrüstung trägt.

**Entfallen:**

- stirbt Feind: Abschnitt +1 ATK.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Erbe-Späher (`dc_b_erbe_spaeher_621`, Einheit, Rothain) – Regelangleichung mit Kürzung

**Alter Text:** Schaue oberste 3; behalte 1 Sofort-/Unterstützung. [Erbe-Späher]

**Aktueller Text:** *(kein Text)*

**Entfallen:**

- behalte 1 Sofort-/Unterstützung.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Glockenstellung (`dc_b_glockenstellung_618`, Einheit, Rothain) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF. Gegnerische Einheiten in diesem Abschnitt haben -1 ATK gegen dich.

**Aktueller Text:** Steilfeuer II. Der erste Schaden je Zug sinkt um 1.

**Entfallen:**

- Gegnerische Einheiten in diesem Abschnitt haben -1 ATK gegen dich.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Durchschlag; ATK/DEF 2/3 → 2/4). Der entfallene Teil ist bewusst nicht in der Engine.

### Kronpanzer Narbstadt (`dc_b_kronpanzer_narbstadt_607`, Einheit, Rothain) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF. Kann verdeckt gespielt werden. Aufdecken: ignoriere den ersten Schaden diesen Zug (die Krone irrt nicht).

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- Aufdecken: ignoriere den ersten Schaden diesen Zug.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Ablösung; ATK/DEF 3/3 → 3/4). Der entfallene Teil ist bewusst nicht in der Engine.

### Kronriemen (`dc_b_kronriemen_648`, Ausrüstung, Rothain) – Regelangleichung mit Kürzung

**Alter Text:** Träger +1 ATK. Wenn Träger ersetzt wird: neuer Träger erhält +1 DEF und „Schwur“ (erster Schaden ignoriert).

**Aktueller Text:** Träger +1 ATK.

**Entfallen:**

- Wenn Träger ersetzt wird: neuer Träger erhält +1 DEF und „Schwur“.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Patronengurt Erbe (`dc_b_patronengurt_erbe_655`, Ausrüstung, Rothain) – Regelangleichung mit Kürzung

**Alter Text:** Träger +1 ATK. Einmal: +1 zusätzlicher ATK für einen Angriff, dann ablegen.

**Aktueller Text:** Träger +1 ATK.

**Entfallen:**

- Einmal: +1 zusätzlicher ATK für einen Angriff, dann ablegen.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Regiment Erbe (`dc_b_regiment_erbe_605`, Einheit, Rothain) – Regelangleichung mit Kürzung

**Alter Text:** +2 DEF, solange der Gegner in diesem Abschnitt mehr Einheiten hat. Nach dem ersten erlittenen Schaden: +1 ATK.

**Aktueller Text:** +2 DEF, solange der Gegner im Abschnitt mehr Einheiten hat.

**Entfallen:**

- Nach dem ersten erlittenen Schaden: +1 ATK.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Silberstern-Rohr (`dc_b_silberstern_rohr_650`, Einheit, Rothain) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 ATK. Wenn diese Einheit einen Kill erzielt: heile 1 DEF an einer eigenen Einheit, die diesen Zug ersetzt wurde.

**Aktueller Text:** Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.

**Entfallen:**

- Wenn diese Einheit einen Kill erzielt: heile 1 DEF an einer eigenen Einheit, die diesen Zug ersetzt wurde.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Durchschlag; ATK/DEF 4/2 → 5/2). Der entfallene Teil ist bewusst nicht in der Engine.

### Thronbruch (`dc_b_thronbruch_613`, Einheit, Rothain) – Regelangleichung mit Kürzung

**Alter Text:** +3 ATK im ersten Angriff nach dem Ausspielen. Danach -1 DEF bis Zugende.

**Aktueller Text:** Ihr erster Angriff nach dem Ausspielen hat +3 ATK.

**Entfallen:**

- Danach -1 DEF bis Zugende.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Veteranenrat (`dc_b_veteranenrat_626`, Einheit, Rothain) – Regelangleichung mit Kürzung

**Alter Text:** Einheiten hier +1 ATK/+1 DEF. Einmal/Zug: negiere 1 Schaden; danach kostet deine nächste Sofort +1 AP.

**Aktueller Text:** Andere eigene Einheiten in ihrem Abschnitt: +1 ATK und +1 DEF. Der erste Schaden je Zug sinkt um 1.

**Entfallen:**

- danach kostet deine nächste Sofort +1 AP.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Werkrott-Kolonne (`dc_b_werkrott_kolonne_614`, Einheit, Rothain) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +2 DEF. Einmal pro Zug: eine angrenzende eigene Infanterie hat +1 ATK.

**Aktueller Text:** Ihr erster Angriff nach dem Ausspielen hat +1 ATK.

**Entfallen:**

- Einmal pro Zug: eine angrenzende eigene Infanterie hat +1 ATK.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (ATK/DEF 3/5 → 3/7). Der entfallene Teil ist bewusst nicht in der Engine.

### Abseitsläufer (`dc_b_abseitslaeufer_686`, Einheit, Sahr) – Regelangleichung mit Kürzung

**Alter Text:** Decke auf; ziehe 1 wenn Feind angrenzt ohne eigene Nachbarn.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- ziehe 1 wenn Feind angrenzt ohne eigene Nachbarn.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Endlose Kolonne (`dc_b_endlose_kolonne_719`, Ausrüstung, Sahr) – Regelangleichung mit Kürzung

**Alter Text:** Träger +1 ATK/+1 DEF; einmal/Zug: spiele Einheit 1 billiger (min. 1) wenn Träger bewegt.

**Aktueller Text:** Träger +1 ATK, +1 DEF.

**Entfallen:**

- einmal/Zug: spiele Einheit 1 billiger (min. 1) wenn Träger bewegt.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Flankenpanzer (`dc_b_flankenpanzer_672`, Einheit, Sahr) – Regelangleichung mit Kürzung

**Alter Text:** +1 ATK/+1 DEF beim Angriff aus angrenzendem Abschnitt; bei Kill ziehe 1.

**Aktueller Text:** Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.

**Entfallen:**

- +1 ATK/+1 DEF beim Angriff aus angrenzendem Abschnitt

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Linienbatterie (`dc_b_linienbatterie_677`, Einheit, Sahr) – Regelangleichung mit Kürzung

**Alter Text:** +2 ATK wenn eigene Einheit angrenzt; ziehe 1 bei Kill.

**Aktueller Text:** Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.

**Entfallen:**

- +2 ATK wenn eigene Einheit angrenzt

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Marktgeschütz (`dc_b_marktgeschuetz_678`, Einheit, Sahr) – Regelangleichung mit Kürzung

**Alter Text:** +2 ATK nach einem Kill diesen Zug; ziehe 1 bei Kill. [Marktgeschütz]

**Aktueller Text:** Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.

**Entfallen:**

- +2 ATK nach einem Kill diesen Zug

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Meldekarawane (`dc_b_meldekarawane_685`, Einheit, Sahr) – Regelangleichung mit Kürzung

**Alter Text:** Decke auf; ziehe 1. [Meldekarawane]

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- ziehe 1.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Passschlüssel (`dc_b_passschluessel_716`, Ausrüstung, Sahr) – Regelangleichung mit Kürzung

**Alter Text:** Träger +1 DEF; einmal/Zug: bewege Träger 1 Abschnitt.

**Aktueller Text:** Träger +1 DEF.

**Entfallen:**

- einmal/Zug: bewege Träger 1 Abschnitt.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Pfadfinder (`dc_b_pfadfinder_683`, Einheit, Sahr) – Regelangleichung mit Kürzung

**Alter Text:** Einmal/Zug: decke auf; eine eigene Einheit darf 1 Abschnitt umgehen.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- eine eigene Einheit darf 1 Abschnitt umgehen.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Pfadkeil (`dc_b_pfadkeil_671`, Einheit, Sahr) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF; ziehe 1 wenn du diesen Zug umgangen/bewegt hast.

**Aktueller Text:** *(kein Text)*

**Entfallen:**

- ziehe 1 wenn du diesen Zug umgangen/bewegt hast.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Stellungswechsel; ATK/DEF 3/3 → 3/4). Der entfallene Teil ist bewusst nicht in der Engine.

### Sarun-Batterie (`dc_b_sarun_batterie_681`, Einheit, Sahr) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF; ziehe 1 wenn du diesen Zug bewegt hast.

**Aktueller Text:** Steilfeuer II.

**Entfallen:**

- ziehe 1 wenn du diesen Zug bewegt hast.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Fernschuss, Stellungswechsel; ATK/DEF 3/3 → 3/4). Der entfallene Teil ist bewusst nicht in der Engine.

### Vertragsnetz (`dc_b_vertragsnetz_693`, Unterstützung, Sahr) – Regelangleichung mit Kürzung

**Alter Text:** Einheiten hier +1 ATK; einmal/Zug: bewege 1 Einheit 1 Abschnitt.

**Aktueller Text:** Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.

**Entfallen:**

- einmal/Zug: bewege 1 Einheit 1 Abschnitt.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Wegmarke (`dc_b_wegmarke_718`, Ausrüstung, Sahr) – Regelangleichung mit Kürzung

**Alter Text:** Träger +1 ATK; bei Angriff aus Bewegung +1 ATK.

**Aktueller Text:** Träger +1 ATK.

**Entfallen:**

- bei Angriff aus Bewegung +1 ATK.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Zollspäher (`dc_b_zollspaeher_684`, Einheit, Sahr) – Regelangleichung mit Kürzung

**Alter Text:** Decke auf; ziehe 1 wenn Feind angrenzt. [Zollspäher]

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- ziehe 1 wenn Feind angrenzt.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Aktenmappe (`dc_b_aktenmappe_596`, Ausrüstung, Steinmark) – Regelangleichung mit Kürzung

**Alter Text:** Träger +1 DEF; einmal/Zug: decke 1 auf.

**Aktueller Text:** Träger +1 DEF. Beim Anlegen: decke eine verdeckte gegnerische Einheit auf.

**Entfallen:**

- einmal/Zug: decke 1 auf.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Albensee-Batterie (`dc_b_albensee_batterie_561`, Einheit, Steinmark) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF; ziehe 1 wenn Freigabe-/Sofort diesen Zug.

**Aktueller Text:** Steilfeuer II.

**Entfallen:**

- ziehe 1 wenn Freigabe-/Sofort diesen Zug.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Zuteilung; ATK/DEF 3/3 → 3/4). Der entfallene Teil ist bewusst nicht in der Engine.

### Beobachtungsposten (`dc_b_beobachtungsposten_563`, Einheit, Steinmark) – Regelangleichung mit Kürzung

**Alter Text:** Einmal/Zug: decke auf; Ziel gilt als beobachtet.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- Ziel gilt als beobachtet.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Feldmesser (`dc_b_feldmesser_564`, Einheit, Steinmark) – Regelangleichung mit Kürzung

**Alter Text:** Decke auf; +1 DEF bis Zugende.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- +1 DEF bis Zugende.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Grenzstein-Posten (`dc_b_grenzstein_posten_546`, Einheit, Steinmark) – Regelangleichung mit Kürzung

**Alter Text:** Beim Ausspielen: decke 1 auf; +1 DEF bis Zugende.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- +1 DEF bis Zugende.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Großfeuer (`dc_b_grossfeuer_562`, Einheit, Steinmark) – Regelangleichung mit Kürzung

**Alter Text:** +1 ATK wenn Ziel beobachtet; bei Kill weitere aufdecken.

**Aktueller Text:** Steilfeuer II. +1 ATK gegen beobachtete Ziele.

**Entfallen:**

- bei Kill weitere aufdecken.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Kommissionsdepot (`dc_b_kommissionsdepot_574`, Unterstützung, Steinmark) – Regelangleichung mit Kürzung

**Alter Text:** Einmal/Zug: Einheit hier gespielt kostet 1 weniger (min. 1); ziehe 1.

**Aktueller Text:** Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1).

**Entfallen:**

- ziehe 1.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Meldekette (`dc_b_meldekette_565`, Einheit, Steinmark) – Regelangleichung mit Kürzung

**Alter Text:** Decke auf; ziehe 1. [Meldekette]

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- ziehe 1.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Methodenschlag (`dc_b_methodenschlag_554`, Einheit, Steinmark) – Regelangleichung mit Kürzung

**Alter Text:** +3 ATK gegen eine beobachtete Einheit. Danach gilt eine weitere angrenzende als beobachtet.

**Aktueller Text:** +3 ATK gegen beobachtete Ziele.

**Entfallen:**

- Danach gilt eine weitere angrenzende als beobachtet.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Normgeschütz (`dc_b_normgeschuetz_555`, Einheit, Steinmark) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF; ziehe 1 wenn du diesen Zug nicht bewegt hast. [Normgeschütz]

**Aktueller Text:** Steilfeuer II.

**Entfallen:**

- ziehe 1 wenn du diesen Zug nicht bewegt hast.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Zuteilung, Stellungswechsel; ATK/DEF 3/2 → 3/3). Der entfallene Teil ist bewusst nicht in der Engine.

### Normpanzer (`dc_b_normpanzer_552`, Einheit, Steinmark) – Regelangleichung mit Kürzung

**Alter Text:** +1 ATK/+1 DEF gegen beobachtete; bei Kill decke 1 auf.

**Aktueller Text:** Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- +1 ATK/+1 DEF gegen beobachtete

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Peiltrupp (`dc_b_peiltrupp_566`, Einheit, Steinmark) – Regelangleichung mit Kürzung

**Alter Text:** Decke auf; ziehe 1 wenn Feind beobachtet angrenzt.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- ziehe 1 wenn Feind beobachtet angrenzt.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Zielzuweisung (`dc_b_zielzuweisung_598`, Ausrüstung, Steinmark) – Regelangleichung mit Kürzung

**Alter Text:** Träger +1 ATK; bei Angriff Ziel gilt als beobachtet.

**Aktueller Text:** Träger +1 ATK.

**Entfallen:**

- bei Angriff Ziel gilt als beobachtet.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Balkenschild (`dc_b_balkenschild_142`, Ausrüstung, Theryn) – Regelangleichung mit Kürzung

**Alter Text:** Träger +2 DEF. Träger kann nicht angreifen.

**Aktueller Text:** Träger +2 DEF.

**Entfallen:**

- Träger kann nicht angreifen.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Maßfeuer (`dc_b_massfeuer_134`, Einheit, Theryn) – Regelangleichung mit Kürzung

**Alter Text:** +1 ATK, wenn eigene Infanterie angrenzt. Einmal/Zug: wenn du keine Sofort spielst → +1 DEF.

**Aktueller Text:** Steilfeuer II. +1 ATK, solange eigene Infanterie benachbart ist.

**Entfallen:**

- Einmal/Zug: wenn du keine Sofort spielst → +1 DEF.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Ordnungsbatterie (`dc_b_ordnungsbatterie_120`, Einheit, Theryn) – Regelangleichung mit Kürzung

**Alter Text:** Eigene Infanterie im Abschnitt +1 ATK. Beim Angriff: Ziel −1 DEF bis Zugende, wenn du in diesem Zug Infanterie gespielt hast.

**Aktueller Text:** Steilfeuer II. Andere eigene Infanterie in ihrem Abschnitt: +1 ATK.

**Entfallen:**

- Beim Angriff: Ziel −1 DEF bis Zugende, wenn du in diesem Zug Infanterie gespielt hast.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Pflichtpanzer (`dc_b_pflichtpanzer_3`, Einheit, Theryn) – Regelangleichung mit Kürzung

**Alter Text:** +1 DEF, solange du in diesem Zug eine Infanterie gespielt hast. Einmal/Zug: eine eigene Infanterie im Abschnitt +1 ATK.

**Aktueller Text:** +1 DEF, wenn du in diesem Zug Infanterie gespielt hast.

**Entfallen:**

- Einmal/Zug: eine eigene Infanterie im Abschnitt +1 ATK.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Lagebild (`dc_b_lagebild_149`, Einheit, Vael) – Regelangleichung mit Kürzung

**Alter Text:** Schaue oberste Karte; behalte oder lege unten.

**Aktueller Text:** *(kein Text)*

**Entfallen:**

- behalte oder lege unten.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Panzerplatte Serie (`dc_b_panzerplatte_serie_178`, Ausrüstung, Vael) – Regelangleichung mit Kürzung

**Alter Text:** Panzer +2 DEF, −1 ATK.

**Aktueller Text:** Nur an Panzer. +2 DEF, −1 ATK.

**Entfallen:**

- Panzer +2 DEF, −1 ATK.

**Hinweis:** In t244 wiederhergestellt: der Parser hatte EQUIP_STAT auf atk 0 / def 0 gesetzt. Wirkung wieder „Nur an Panzer. +2 DEF, −1 ATK.“ (EQUIP_STAT atk −1, def +2).

### Zielmesser (`dc_b_zielmesser_146`, Einheit, Vael) – Regelangleichung mit Kürzung

**Alter Text:** Feind aufgeklärt; eigene Artillerie +1 ATK gegen ihn diesen Zug.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- eigene Artillerie +1 ATK gegen ihn diesen Zug.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Zieloptik Konzern (`dc_b_zieloptik_konzern_177`, Ausrüstung, Vael) – Regelangleichung mit Kürzung

**Alter Text:** Aufklärung/Artillerie +1 ATK gegen Aufgeklärte.

**Aktueller Text:** Nur an Aufklärung oder Artillerie. +1 ATK gegen beobachtete Ziele.

**Entfallen:**

- Aufklärung/Artillerie +1 ATK gegen Aufgeklärte.

**Hinweis:** In t244 wiederhergestellt: verlorenes +1 ATK und die Bedingung „gegen Aufgeklärte“ (beobachtete Ziele) sind wieder in Effekt und Text, anlegbar an Aufklärung oder Artillerie.

### Abriegelbatterie (`dc_b_abriegelbatterie_857`, Einheit, Vesper) – Regelangleichung mit Kürzung

**Alter Text:** +2 ATK wenn leerer angrenzender Abschnitt; ziehe 1 bei Kill.

**Aktueller Text:** Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.

**Entfallen:**

- +2 ATK wenn leerer angrenzender Abschnitt

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Aktenleser (`dc_b_aktenleser_863`, Einheit, Vesper) – Regelangleichung mit Kürzung

**Alter Text:** Decke auf; ziehe 1.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- ziehe 1.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Doppelversion (`dc_b_doppelversion_865`, Einheit, Vesper) – Regelangleichung mit Kürzung

**Alter Text:** Decke auf; ziehe 1 wenn Feind angrenzt. [Doppelversion]

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- ziehe 1 wenn Feind angrenzt.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Falschfeuer (`dc_b_falschfeuer_856`, Einheit, Vesper) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF; ziehe 1 wenn du diesen Zug nicht bewegt hast.

**Aktueller Text:** Steilfeuer II.

**Entfallen:**

- ziehe 1 wenn du diesen Zug nicht bewegt hast.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Stellungswechsel; ATK/DEF 2/3 → 2/4). Der entfallene Teil ist bewusst nicht in der Engine.

### Gegenlage-Melder (`dc_b_gegenlage_melder_864`, Einheit, Vesper) – Regelangleichung mit Kürzung

**Alter Text:** Einmal/Zug: decke auf; eine eigene Einheit +1 DEF.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- eine eigene Einheit +1 DEF.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Ivo Vel (`dc_b_ivo_vel_867`, Einheit, Vesper) – Regelangleichung mit Kürzung

**Alter Text:** Einmal/Zug: decke 1 auf ODER wirf 1 ab und ziehe 2. Einheiten hier +1 ATK, wenn du diesen Zug eine Sofort mit „Scheinschwerpunkt“/Lage-Effekt gespielt hast oder spielst.

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- ODER wirf 1 ab und ziehe 2.
- Einheiten hier +1 ATK, wenn du diesen Zug eine Sofort mit „Scheinschwerpunkt“/Lage-Effekt gespielt hast oder spielst.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Lesegerät (`dc_b_lesegeraet_894`, Ausrüstung, Vesper) – Regelangleichung mit Kürzung

**Alter Text:** Träger +1 ATK/+1 DEF; einmal/Zug: Einheit hier +1 DEF.

**Aktueller Text:** Träger +1 ATK, +1 DEF.

**Entfallen:**

- einmal/Zug: Einheit hier +1 DEF.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Siegelrohr (`dc_b_siegelrohr_855`, Einheit, Vesper) – Regelangleichung mit Kürzung

**Alter Text:** +2 ATK nach einem Kill diesen Zug; ziehe 1 bei Kill.

**Aktueller Text:** Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.

**Entfallen:**

- +2 ATK nach einem Kill diesen Zug

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Stillrain-Läufer (`dc_b_stillrain_laeufer_866`, Einheit, Vesper) – Regelangleichung mit Kürzung

**Alter Text:** Decke auf; ziehe 1. [Stillrain-Läufer]

**Aktueller Text:** Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

**Entfallen:**

- ziehe 1.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.

### Velis-Batterie (`dc_b_velis_batterie_860`, Einheit, Vesper) – Regelangleichung mit Kürzung, Rest ersetzt

**Alter Text:** +1 DEF; ziehe 1 wenn du diesen Zug nicht bewegt hast. [Velis-Batterie]

**Aktueller Text:** Steilfeuer II.

**Entfallen:**

- ziehe 1 wenn du diesen Zug nicht bewegt hast.

**Hinweis:** Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt (Schlüsselwort Stellungswechsel; ATK/DEF 3/3 → 3/4). Der entfallene Teil ist bewusst nicht in der Engine.

### Velis-Front (`dc_b_velis_front_870`, Unterstützung, Vesper) – Regelangleichung mit Kürzung

**Alter Text:** Einheiten hier +1 DEF, wenn mindestens zwei Einheiten im Abschnitt. Einmal/Zug: eine verdeckte eigene Einheit +1 ATK beim Aufdecken.

**Aktueller Text:** Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht.

**Entfallen:**

- Einmal/Zug: eine verdeckte eigene Einheit +1 ATK beim Aufdecken.

**Hinweis:** Bewusst gestrichen, nicht in der Engine.
