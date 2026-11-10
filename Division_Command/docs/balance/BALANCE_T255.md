# Balance t255 – Nationen neu ausbalanciert, Reskins unterschieden

Stand: main @ 46642d2f (t254-Bot). Mit dem neuen Bot lagen die Nationen in t254 bei 37,8–69,5 %. Ziel: 46–54 % in beiden Modi.

**Nicht geändert:** `opening_starter_ap_penalty` und die Regel „Startspieler 3 AP im ersten Zug“ (Entscheidung des Nutzers).

## Vorgehen

1. **Diagnose** (48 Partien je Paar):
   - „Nur Karten“: beide Seiten ohne Doktrinen.
   - „Nur Doktrinen“: alle Nationen spielen Lyrs Deck mit ihren eigenen Doktrinen.

   Ossaria war in beiden stark (66/70 bzw. 56/57). Averon und Orthea hatten schwache Karten. Ein Grund: „Aufdecken“ und „+1 gegen beobachtete Ziele“ waren fast tot, weil der Bot selten verdeckt spielt.
2. **Regelkorrektur** der Heilungsausrüstung (siehe unten). Sie war die stärkste Einzelkarte in Dargan, Averon, Sahr und Vesper.
3. **Iteration** it1–it8 zu je 11.520 Partien je Modus (48 je Paar, ±2,6 je Nation):
   - zuerst Doktrinpaare,
   - dann gezielte ±1-Werte an Karten, die laut Kartenstatistik auffielen.
4. **Endmessung:** 288 Partien je Paar, 69.120 je Modus, wie in t254.

## Wichtigste Hebel

| Änderung | Wirkung (48er-Lauf) |
|---|---|
| Abnutzung (Ossaria): kein Kartenziehen mehr; Gepanzerter Fuß: nur ausgerüstete Einheiten +1 DEF (vorher alle +1 DEF, ausgerüstete +1/+1 zusätzlich) | Ossaria 64/66 → 48/52 |
| Marsch aus dem Vollen (Namar): kein dauerhaftes +1 DEF beim Einrücken (gedruckt „bis Zugende“, wirkte aber dauerhaft) | Namar Misch 59 → 54 |
| Auswertung (Averon): +1 ATK hält bis Ende des nächsten eigenen Zuges (vorher verfiel der Bonus fast immer im Gegnerzug) | Averon +1–2 |
| Sturmangriff (Theryn): zwei stärkste Infanterien +2 ATK | Theryn +1–2 |
| Verteilte Stellung (Lyr): allein im Abschnitt +2 DEF | Lyr +1–3 |
| Schwerpunkt (Rothain): ab 2 statt 3 Einheiten | Rothain Misch 43 → 50 |
| Beobachten (Averon, Orthea): „markiere 1 Feind als beobachtet“ statt nur Aufdecken | Averon/Orthea wirken jetzt mit ihren „gegen beobachtete“-Karten |
| Heilung nach Schaden nur bei Überleben | Dargan/Vesper/Sahr/Averon −3 bis −13 (Ausgleich über Werte) |

Getestet und zurückgenommen: Auffangen (Eldran) ohne „Bei Gleichstand +1 ATK“. Eldran fiel damit im Starter auf 43,8 %.

## Nationen vorher/nachher (288 je Paar, 69.120 Partien je Modus, t254-Bot)

| Nation | Starter t254 | Starter t255 | Δ | Misch t254 | Misch t255 | Δ |
|---|---|---|---|---|---|---|
| Namar | 56.6 | **48.0** | -8.6 | 59.7 | **54.6** | -5.1 |
| Dargan | 60.6 | **49.0** | -11.6 | 59.9 | **54.6** | -5.3 |
| Eldran | 46.5 | **49.7** | +3.2 | 51.8 | **54.0** | +2.2 |
| Steinmark | 44.6 | **45.4** | +0.8 | 52.5 | **53.9** | +1.4 |
| Merovan | 61.1 | **54.4** | -6.7 | 56.8 | **53.3** | -3.5 |
| Vesper | 57.1 | **52.6** | -4.5 | 54.7 | **52.3** | -2.4 |
| Ossaria | 64.6 | **48.3** | -16.3 | 69.5 | **52.0** | -17.5 |
| Caldris | 45.3 | **50.4** | +5.1 | 48.5 | **51.7** | +3.2 |
| Rothain | 52.2 | **55.8** | +3.6 | 45.0 | **51.1** | +6.1 |
| Vael | 44.3 | **46.8** | +2.5 | 46.7 | **48.2** | +1.5 |
| Lyr | 49.1 | **48.1** | -1.0 | 49.3 | **47.8** | -1.5 |
| Karsk | 48.4 | **53.8** | +5.4 | 43.9 | **46.5** | +2.6 |
| Orthea | 44.8 | **51.8** | +7.0 | 41.2 | **45.9** | +4.7 |
| Theryn | 45.0 | **51.1** | +6.1 | 37.8 | **45.0** | +7.2 |
| Averon | 39.8 | **46.5** | +6.7 | 41.3 | **44.9** | +3.6 |
| Sahr | 40.1 | **48.4** | +8.3 | 41.2 | **44.2** | +3.0 |

starter: Spanne t254 [39.8, 64.6] → t255 [45.4, 55.8]; Startspieler 44.8 → 43.7 %; Partien 69120, beendet 69120, abgelehnte Aktionen/Partie 0, ±1.1 je Nation (95 %)

mixed: Spanne t254 [37.8, 69.5] → t255 [44.2, 54.6]; Startspieler 44.2 → 43.8 %; Partien 69120, beendet 69120, abgelehnte Aktionen/Partie 0, ±1.1 je Nation (95 %)

**Restliche Ausreißer** (alle höchstens 1,8 Punkte außerhalb des Ziels; Konfidenzintervall ±1,1):
- **Rothain, Starter 55,8.** Das ist eine Folge von Schwerpunkt ab 2 Einheiten. Ohne die Änderung läge Rothain im Mischmodus bei 45. Ein weiterer Nerf am Starterdeck (z. B. Glockenstellung, Ablösungskette) wäre der nächste Schritt.
- **Namar und Dargan, Misch 54,6.** Ursache sind starke Poolkarten (Herr der Kais, Kai-Keil, Haftungsschild).
- **Sahr 44,2, Averon 44,9 und Theryn 45,0 (Misch); Steinmark 45,4 (Starter).** Diese Decks enthalten viele Schadens- und Opfer-Soforteinsätze. Der Bot nutzt sie schwach: in allen Nationen liegt diese Kartengruppe 10–25 Punkte unter dem Nationsschnitt. Mehr Kartenwerte würden hier eher eine Bot-Schwäche ausgleichen als die Karten.

## Startspieler

Der Startspieler gewinnt 43,7 % (Starter) und 43,8 % (Misch); in t254 waren es 44,8 / 44,2 %. Die Regel (3 AP im ersten Zug) bleibt unverändert. **Vorschlag, nur gemessen, nicht umgesetzt:** `opening_starter_ap_penalty` 2 → 1, also 4 AP im ersten Zug. Mit dem t255-Stand liegt der Startspieler dann bei **46,3 % (Starter) und 46,2 % (Misch)** (48 je Paar, ±0,5). Die Nationsspanne bleibt etwa gleich (45,1–54,6 / 44,3–55,2). In t254 gab Strafe 0 etwa 49 %. Mit dem stärkeren Bot ist der Nachziehende im Vorteil. Die Entscheidung liegt beim Nutzer.

## Regelkorrektur

`EQUIP_HEAL_ONCE` („Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1“) heilt nur noch, wenn der Träger überlebt. Bisher heilte er auch bei DEF 0 und überlebte so jeden tödlichen Treffer einmal pro Zug. Siehe `docs/regeln/EFFEKT_SONDERFAELLE_T255.md`.

## Engine (generisch, ohne Stubs)

- **CM-`when`-Bedingungen:**
  - `is:<Klasse>`: Klasse der Einheit.
  - `superior`: eigene Überzahl im Abschnitt.
  - `wounded`: eine eigene Fronteinheit ist beschädigt.
- **`turnheal count`:** heilt bis zu N verschiedene Einheiten.
- **CM `observe`:** markiert zuerst verdeckte Feinde, dann noch nicht beobachtete.
- **`REVEAL` mit `observe:true`:** gilt für Soforteinsatz und Ausrüstung beim Anlegen.
- **Doktrin-Parameter:**
  - `STURMANGRIFF count`.
  - `AUSWERTUNG until: end-of-next-own-turn`, mit eigenem Merker.
  - `GEPANZERTER_FUSS`: ein ausdrückliches `atk:0` gilt jetzt.
- **Bot:** Alles ist passiv oder nutzt bestehende Pendings, etwa die Abschnittswahl. Der Bot spielt es über `listActions`/`dispatch`. 0 abgelehnte Aktionen in 138.240 Partien.

Tests: `tests/test_reskins_t255.js`.

## Alle Kartenänderungen (vorher → nachher)

Effekte und Texte. Poolkarten (`dc_np_*`) folgen in der Tabelle danach.

| Nation | Karte | Typ | vorher | nachher |
|---|---|---|---|---|
| Averon | Arven-Widerspruch (`dc_b_arven_widerspruch_818`) | Unterstützung | 2 AP – Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf. | 2 AP – Zu Beginn deines Zuges: markiere 1 Feind als beobachtet. |
| Averon | Aufklärungspanzer (`dc_b_aufklaerungspanzer_794`) | Einheit | 5 AP 5/4 – +2 ATK gegen beobachtete Ziele. | 5 AP 5/5 (Text unverändert) |
| Averon | Aufklärungsschlag (`dc_b_aufklaerungsschlag_822`) | Soforteinsatz | 0 AP – Alle eigenen Einheiten: +1 ATK bis Zugende. Decke eine verdeckte gegnerische Einheit auf. | 0 AP – Alle eigenen Einheiten: +1 ATK bis Zugende. Markiere 1 Feind als beobachtet. |
| Averon | Bürger-Ruf (`dc_b_buerger_ruf_825`) | Soforteinsatz | 2 AP – Alle eigenen Einheiten: +1 ATK bis Zugende. | 1 AP (Text unverändert) |
| Averon | Ed Ruh (`dc_b_ed_ruh_808`) | Einheit | 3 AP 2/4 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 3 AP 2/4 – Beim Ausspielen: markiere 1 Feind als beobachtet. |
| Averon | Ed-Ruh-Pfad (`dc_b_ed_ruh_pfad_804`) | Einheit | 2 AP 1/2 | 2 AP 2/2 – Beim Ausspielen: markiere 1 Feind als beobachtet. |
| Averon | Frühe Meldung (`dc_b_fruehe_meldung_819`) | Soforteinsatz | 1 AP – Wähle eine eigene Fronteinheit: +1 ATK bis Zugende. Decke eine verdeckte gegnerische Einheit auf. | 1 AP – Wähle eine eigene Fronteinheit: +1 ATK bis Zugende. Markiere 1 Feind als beobachtet. |
| Averon | Frühstoß (`dc_b_fruehstoss_793`) | Einheit | 4 AP 4/3 – Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf. | 4 AP 4/4 – Zerstört sie im Angriff eine Einheit: markiere 1 Feind als beobachtet. |
| Averon | Knotenrohr (`dc_b_knotenrohr_795`) | Einheit | 3 AP 4/2 – Steilfeuer II. +1 DEF, solange eigene Infanterie benachbart ist. | 3 AP 4/3 (Text unverändert) |
| Averon | Korridorläufer (`dc_b_korridorlaeufer_784`) | Einheit | 2 AP 2/2 – +1 ATK, solange eine gegnerische Einheit beobachtet ist. | 2 AP 2/3 (Text unverändert) |
| Averon | Kurzer Schutz (`dc_b_kurzer_schutz_821`) | Soforteinsatz | 2 AP – Alle eigenen Einheiten: +2 ATK bis Zugende. Decke eine verdeckte gegnerische Einheit auf. | 2 AP – Alle eigenen Einheiten: +2 ATK bis Zugende. Markiere 1 Feind als beobachtet. |
| Averon | Kurzes Rohr (`dc_b_kurzes_rohr_801`) | Einheit | 3 AP 3/3 – Steilfeuer II. Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. | 3 AP 3/4 (Text unverändert) |
| Averon | Kurzkrieg-Wagen (`dc_b_kurzkrieg_wagen_790`) | Einheit | 3 AP 3/3 – +1 ATK, wenn du in diesem Zug einen Soforteinsatz gespielt hast. | 3 AP 3/4 (Text unverändert) |
| Averon | Lage-Offen (`dc_b_lage_offen_805`) | Einheit | 2 AP 2/3 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 2 AP 2/3 – Beim Ausspielen: markiere 1 Feind als beobachtet. |
| Averon | Lagefeuer (`dc_b_lagefeuer_796`) | Einheit | 3 AP 2/3 – Steilfeuer II. +1 ATK gegen beobachtete Ziele. | 3 AP 3/3 (Text unverändert) |
| Averon | Lina Nov (`dc_b_lina_nov_807`) | Einheit | 3 AP 2/3 – +1 ATK gegen beobachtete Ziele. | 3 AP 3/3 (Text unverändert) |
| Averon | Lina-Melder (`dc_b_lina_melder_803`) | Einheit | 2 AP 1/2 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 2 AP 1/2 – Beim Ausspielen: markiere 1 Feind als beobachtet. |
| Averon | Lokalisierbatterie (`dc_b_lokalisierbatterie_797`) | Einheit | 4 AP 4/2 – Steilfeuer II. +2 ATK gegen beobachtete Ziele. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. | 4 AP 4/3 (Text unverändert) |
| Averon | Lydon-Träger (`dc_b_lydon_traeger_791`) | Einheit | 3 AP 2/4 – Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. | 3 AP 3/4 (Text unverändert) |
| Averon | Netz-Check (`dc_b_netz_check_826`) | Soforteinsatz | 2 AP – Wähle eine eigene Fronteinheit: +1 DEF. Decke eine verdeckte gegnerische Einheit auf. | 2 AP – Wähle eine eigene Fronteinheit: +1 DEF. Markiere 1 Feind als beobachtet. |
| Averon | Netzlampe (`dc_b_netzlampe_837`) | Ausrüstung | 1 AP – Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1. | 1 AP – Träger +1 ATK gegen beobachtete Ziele. Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1. |
| Averon | Neue Lage (`dc_b_neue_lage_820`) | Soforteinsatz | 2 AP – Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF. Decke eine verdeckte gegnerische Einheit auf. | 2 AP – Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF. Markiere 1 Feind als beobachtet. |
| Averon | Nordfall-Übung (`dc_b_nordfall_uebung_813`) | Unterstützung | 3 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF. Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf. | 3 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF. Zu Beginn deines Zuges: markiere 1 Feind als beobachtet. |
| Averon | Nordmark-Rohr (`dc_b_nordmark_rohr_799`) | Einheit | 3 AP 4/2 – Steilfeuer II. Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 3 AP 4/3 – Steilfeuer II. Beim Ausspielen: markiere 1 Feind als beobachtet. |
| Averon | Offenes Feuer (`dc_b_offenes_feuer_802`) | Einheit | 4 AP 4/3 – Steilfeuer II. +1 ATK gegen beobachtete Ziele. Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf. | 4 AP 4/4 – Steilfeuer II. +1 ATK gegen beobachtete Ziele. Zerstört sie im Angriff eine Einheit: markiere 1 Feind als beobachtet. |
| Averon | Olivkeil (`dc_b_olivkeil_789`) | Einheit | 3 AP 3/3 – Der erste Schaden je Zug sinkt um 1. | 3 AP 3/4 (Text unverändert) |
| Averon | Quellenläufer (`dc_b_quellenlaeufer_806`) | Einheit | 1 AP 1/1 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 1 AP 1/2 – Beim Ausspielen: markiere 1 Feind als beobachtet. |
| Averon | Quellenmappe (`dc_b_quellenmappe_836`) | Ausrüstung | 2 AP – Träger +1 ATK. | 2 AP – Träger +1 ATK, gegen beobachtete Ziele +2 ATK. |
| Averon | Sensor-Knoten (`dc_b_sensor_knoten_834`) | Ausrüstung | 2 AP – Träger +1 ATK. Beim Anlegen: decke eine verdeckte gegnerische Einheit auf. | 2 AP – Träger +1 ATK. Beim Anlegen: markiere 1 Feind als beobachtet. |
| Averon | Verbindungskette (`dc_b_verbindungskette_788`) | Einheit | 3 AP 3/3 – +1 ATK gegen beobachtete Ziele. | 3 AP 3/4 (Text unverändert) |
| Averon | Verbindungsnetz (`dc_b_verbindungsnetz_815`) | Unterstützung | 4 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK gegen beobachtete Ziele. Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf. | 4 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK gegen beobachtete Ziele. Zu Beginn deines Zuges: markiere 1 Feind als beobachtet. |
| Averon | Verbindungssiegel (`dc_b_verbindungssiegel_839`) | Ausrüstung | 3 AP – Beim Anlegen: decke eine verdeckte gegnerische Einheit auf. | 1 AP – Beim Anlegen: markiere 1 Feind als beobachtet. |
| Averon | Werkhof-Nov (`dc_b_werkhof_nov_809`) | Einheit | 4 AP 3/3 – +1 ATK gegen beobachtete Ziele. | 4 AP 3/4 (Text unverändert) |
| Averon | Werkhöfe Novaris (`dc_b_werkhoefe_novaris_812`) | Unterstützung | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht. | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF; stehen zwei oder mehr dort, auch +1 ATK. |
| Averon | Westhaven-Batterie (`dc_b_westhaven_batterie_800`) | Einheit | 4 AP 3/3 – Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. | 4 AP 4/3 (Text unverändert) |
| Averon | Westhaven-Sicherung (`dc_b_westhaven_sicherung_785`) | Einheit | 3 AP 2/4 – Der erste Schaden, den sie in jedem Zug erleidet, sinkt um 1. | 3 AP 3/4 (Text unverändert) |
| Caldris | Aktenblick (`dc_b_aktenblick_324`) | Einheit | 2 AP 1/2 | 2 AP 2/2 (Text unverändert) |
| Caldris | Erholung (`dc_b_erholung_339`) | Soforteinsatz | 1 AP – Wähle eine eigene Fronteinheit: heile 2. | 1 AP – Wähle eine eigene Fronteinheit: heile 3. |
| Caldris | Frist (`dc_b_frist_345`) | Soforteinsatz | 1 AP – Wähle eine eigene Fronteinheit: +2 DEF. | 1 AP – Wähle eine eigene Fronteinheit: heile 1; +2 DEF. |
| Caldris | Grünfeld-Rohr (`dc_b_gruenfeld_rohr_319`) | Einheit | 4 AP 3/3 – Steilfeuer II. Nach ihrem Angriff: das Ziel hat −1 ATK bis zum Ende des nächsten Zuges. | 4 AP 4/3 (Text unverändert) |
| Caldris | Kontrollsalve (`dc_b_kontrollsalve_321`) | Einheit | 4 AP 4/2 – Steilfeuer II. Der erste Schaden je Zug sinkt um 1. | 4 AP 4/3 (Text unverändert) |
| Caldris | Pia Lück (`dc_b_pia_lueck_328`) | Einheit | 3 AP 2/3 – Beim Ausspielen: heile 2 DEF an deiner am stärksten beschädigten Einheit. +1 DEF, wenn sie seit deinem letzten Zug nicht versetzt wurde. | 3 AP 2/4 (Text unverändert) |
| Caldris | Ruhebatterie (`dc_b_ruhebatterie_316`) | Einheit | 3 AP 2/3 – Steilfeuer II. +1 ATK, wenn du in diesem Zug geheilt hast. | 3 AP 3/3 (Text unverändert) |
| Caldris | Sicherheitsforum (`dc_b_sicherheitsforum_335`) | Unterstützung | 2 AP – Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit. | 2 AP – Zu Beginn deines Zuges: heile 1 an bis zu zwei beschädigten eigenen Einheiten. |
| Caldris | Sperrfeuer-Etappe (`dc_b_sperrfeuer_etappe_317`) | Einheit | 4 AP 4/2 – Steilfeuer II. Der erste Schaden je Zug sinkt um 1. | 4 AP 4/3 (Text unverändert) |
| Caldris | Vollschutz (`dc_b_vollschutz_320`) | Einheit | 5 AP 5/3 – Steilfeuer II. Ihr erster Angriff nach dem Ausspielen hat +1 ATK. | 5 AP 5/4 (Text unverändert) |
| Caldris | Wohnzuteilung (`dc_b_wohnzuteilung_334`) | Unterstützung | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK. | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK; wer zuletzt nicht angriff, auch +1 DEF. |
| Caldris | Zuteilungsräumer (`dc_b_zuteilungsraeumer_313`) | Einheit | 3 AP 3/3 – Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. | 3 AP 3/4 (Text unverändert) |
| Dargan | Abschlussgeschütz (`dc_b_abschlussgeschuetz_917`) | Einheit | 4 AP 4/2 – Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. | 4 AP 4/3 (Text unverändert) |
| Dargan | Abschriftleser (`dc_b_abschriftleser_923`) | Einheit | 2 AP 1/2 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 2 AP 2/2 (Text unverändert) |
| Dargan | Auenheim-Hof (`dc_b_auenheim_hof_904`) | Einheit | 2 AP 2/2 – Der erste Schaden, den sie in jedem Zug erleidet, sinkt um 1. | 2 AP 2/3 (Text unverändert) |
| Dargan | Brunn-Keil (`dc_b_brunn_keil_911`) | Einheit | 3 AP 2/4 – +1 ATK und +1 DEF, wenn sie seit deinem letzten Zug nicht versetzt wurde. | 3 AP 3/4 (Text unverändert) |
| Dargan | Datums-Melder (`dc_b_datums_melder_924`) | Einheit | 2 AP 1/2 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 2 AP 2/2 (Text unverändert) |
| Dargan | Fälligkeitsfeuer (`dc_b_faelligkeitsfeuer_919`) | Einheit | 3 AP 3/2 – Steilfeuer II. +1 ATK gegen Ziele ohne benachbarte Einheit ihres Besitzers. Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf. | 3 AP 3/3 (Text unverändert) |
| Dargan | Halle Kalden (`dc_b_halle_kalden_930`) | Unterstützung | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht. | 2 AP – Wähle beim Ausspielen einen Abschnitt: beschädigte eigene Einheiten dort +1 DEF. |
| Dargan | Haus Still (`dc_b_haus_still_929`) | Einheit | 4 AP 3/3 – Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit. | 4 AP 3/4 (Text unverändert) |
| Dargan | Kai-Keil (`dc_b_kai_keil_908`) | Einheit | 3 AP 3/4 – Ihr erster Angriff nach dem Ausspielen hat +2 ATK. | 3 AP 3/3 (Text unverändert) |
| Dargan | Kalden-Batterie (`dc_b_kalden_batterie_920`) | Einheit | 4 AP 3/3 – Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. | 4 AP 4/3 (Text unverändert) |
| Dargan | Lehrbach (`dc_b_lehrbach_937`) | Unterstützung | 2 AP – Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1). | 2 AP – Einmal pro Zug: deine nächste Infanterie kostet 1 AP weniger (mind. 1). |
| Dargan | Namenhof-Schütze (`dc_b_namenhof_schuetze_905`) | Einheit | 3 AP 2/4 – +1 DEF, solange du eine offene Unterstützung hast. | 3 AP 3/4 (Text unverändert) |
| Dargan | Nussrock (`dc_b_nussrock_953`) | Ausrüstung | 1 AP – Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1. | 1 AP – Zerstört der Träger im Angriff eine Einheit: heile 1 an deiner am stärksten beschädigten Einheit. |
| Dargan | Schreiberin Kal (`dc_b_schreiberin_kal_927`) | Einheit | 3 AP 2/3 – Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. | 3 AP 3/3 (Text unverändert) |
| Dargan | Selm-Läufer (`dc_b_selm_laeufer_926`) | Einheit | 1 AP 1/1 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 1 AP 1/2 (Text unverändert) |
| Dargan | Zeilenrohr (`dc_b_zeilenrohr_915`) | Einheit | 3 AP 3/2 – Steilfeuer II. +1 ATK gegen Ziele ohne benachbarte Einheit ihres Besitzers. Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf. | 3 AP 3/3 (Text unverändert) |
| Eldran | Doppelstellung (`dc_b_doppelstellung_733`) | Einheit | 4 AP 3/6 – Der erste Schaden je Zug sinkt um 1. | 4 AP 3/4 (Text unverändert) |
| Eldran | Kronenwache (`dc_b_kronenwache_721`) | Einheit | 1 AP 2/3 – Der erste Schaden, den sie in jedem Zug erleidet, sinkt um 1. | 1 AP 2/2 (Text unverändert) |
| Eldran | Markenspäher (`dc_b_markenspaeher_743`) | Einheit | 2 AP 1/2 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 2 AP 1/2 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. +1 DEF bei gegnerischer Überzahl im Abschnitt. |
| Karsk | Filterpanzer (`dc_b_filterpanzer_365`) | Einheit | 3 AP 3/4 – Der erste Schaden je Zug sinkt um 1. | 3 AP 3/3 (Text unverändert) |
| Karsk | Keilspitze (`dc_b_keilspitze_364`) | Einheit | 2 AP 3/2 – Ihr erster Angriff nach dem Ausspielen hat +2 ATK. | 2 AP 2/2 (Text unverändert) |
| Karsk | Schnittstelle (`dc_b_schnittstelle_363`) | Einheit | 2 AP 2/2 – Ihr erster Angriff hat +1 ATK. | 2 AP 1/2 (Text unverändert) |
| Karsk | Stoßfeuer (`dc_b_stossfeuer_378`) | Einheit | 4 AP 4/3 – Steilfeuer II. Der erste Schaden je Zug sinkt um 1. | 4 AP 4/2 (Text unverändert) |
| Karsk | Stoßkeil (`dc_b_stosskeil_371`) | Einheit | 3 AP 4/2 – Der erste Schaden je Zug sinkt um 1. | 3 AP 3/2 (Text unverändert) |
| Karsk | Stoßleitung (`dc_b_stossleitung_395`) | Unterstützung | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK. | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK, beschädigte dort +2 ATK. |
| Karsk | Weiterkämpfen-Protokoll (`dc_b_weiterkaempfen_protokoll_389`) | Unterstützung | 2 AP – Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit. | 2 AP – Zu Beginn deines Zuges: ziehe 1 Karte, wenn eine eigene Fronteinheit beschädigt ist. |
| Lyr | Abschriftblick (`dc_b_abschriftblick_227`) | Einheit | 1 AP 1/1 | 1 AP 1/2 (Text unverändert) |
| Lyr | Aschen-Kette (`dc_b_aschen_kette_76`) | Einheit | 3 AP 4/2 – +1 ATK, wenn in diesem Zug eine eigene Einheit zerstört wurde. | 3 AP 4/3 (Text unverändert) |
| Lyr | Bergführer (`dc_b_bergfuehrer_224`) | Einheit | 2 AP 1/2 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind. | 2 AP 2/2 (Text unverändert) |
| Lyr | Engenkette (`dc_b_engenkette_258`) | Ausrüstung | 2 AP – Träger +1 DEF. | 2 AP – Träger +2 DEF, solange er allein im Abschnitt steht. |
| Lyr | Enger Weg (`dc_b_enger_weg_223`) | Einheit | 5 AP 5/3 – Steilfeuer II. +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind. | 5 AP 5/4 (Text unverändert) |
| Lyr | Hangläufer (`dc_b_hanglaeufer_225`) | Einheit | 2 AP 2/1 – +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind. | 2 AP 2/2 (Text unverändert) |
| Lyr | Leserbach-Keil (`dc_b_leserbach_keil_74`) | Einheit | 4 AP 4/3 – Kostet 1 AP weniger (mind. 1), wenn du in 2+ Abschnitten Einheiten hast. | 4 AP 4/4 (Text unverändert) |
| Lyr | Leserklammer (`dc_b_leserklammer_257`) | Ausrüstung | 1 AP – Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1. | 1 AP – Zu Beginn deines Zuges: Hat der Träger im letzten Zug nicht angegriffen, heilt er 2. |
| Lyr | Mar Aschen (`dc_b_mar_aschen_229`) | Einheit | 3 AP 2/3 – Beim Ausspielen: heile 2 DEF an deiner am stärksten beschädigten Einheit. | 3 AP 2/4 (Text unverändert) |
| Lyr | Passzoll-Rohr (`dc_b_passzoll_rohr_82`) | Einheit | 4 AP 3/3 – Steilfeuer II. +1 ATK, wenn du in 2+ Abschnitten Einheiten hast. | 4 AP 4/3 (Text unverändert) |
| Lyr | Schonung (`dc_b_schonung_247`) | Soforteinsatz | 2 AP – Wähle eine gegnerische Fronteinheit: −1 DEF (mind. 1). | 2 AP – Wähle eine gegnerische Fronteinheit: −2 DEF (mind. 1). |
| Lyr | Signalfeuer-Rohr (`dc_b_signalfeuer_rohr_78`) | Einheit | 3 AP 3/2 – Steilfeuer II. Nach ihrem Angriff: das Ziel hat −1 ATK bis zum Ende des nächsten Zuges. | 3 AP 3/3 (Text unverändert) |
| Lyr | Steinschlag-Batterie (`dc_b_steinschlag_batterie_79`) | Einheit | 3 AP 4/1 – Steilfeuer II. +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind. | 3 AP 4/2 (Text unverändert) |
| Lyr | Tunnelkeil (`dc_b_tunnelkeil_70`) | Einheit | 3 AP 3/3 – Der erste Schaden je Zug sinkt um 1. | 3 AP 3/4 (Text unverändert) |
| Lyr | Tunnelnetz (`dc_b_tunnelnetz_236`) | Unterstützung | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht. | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +2 DEF, solange sie allein im Abschnitt stehen. |
| Lyr | Verteilte Vorräte (`dc_b_verteilte_vorraete_234`) | Unterstützung | 2 AP – Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit. | 2 AP – Zu Beginn deines Zuges: heile 2 an einer beschädigten eigenen Einheit, die allein im Abschnitt steht. |
| Lyr | Warnsalve (`dc_b_warnsalve_80`) | Einheit | 4 AP 4/2 – Steilfeuer II. +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind. | 4 AP 4/3 (Text unverändert) |
| Lyr | Weideposten (`dc_b_weideposten_66`) | Einheit | 2 AP 2/2 – +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht. | 2 AP 2/3 (Text unverändert) |
| Merovan | Kaikompanie (`dc_b_kaikompanie_43`) | Einheit | 2 AP 2/3 – Der erste Schaden je Zug sinkt um 1. | 2 AP 2/2 (Text unverändert) |
| Merovan | Letzte Stellung (`dc_b_letzte_stellung_56`) | Einheit | 5 AP 4/6 – +1 ATK und +1 DEF, solange du keine Unterstützung hast. | 5 AP 4/5 (Text unverändert) |
| Merovan | Lizenzsiegel (`dc_b_lizenzsiegel_216`) | Ausrüstung | 1 AP – Träger +1 ATK, +1 DEF. | 1 AP – Träger +1 ATK. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde. |
| Merovan | Stempel Erreichbar (`dc_b_stempel_erreichbar_222`) | Ausrüstung | 2 AP – +1 ATK/+1 DEF nach Schieben diesen Zug. | 2 AP – Träger +1 ATK und +1 DEF, wenn er in diesem Zug versetzt wurde. |
| Merovan | Wegspäher (`dc_b_wegspaeher_185`) | Einheit | 2 AP 1/2 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 2 AP 1/2 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. +1 ATK, wenn sie in diesem Zug versetzt wurde. |
| Merovan | Wegweiser (`dc_b_wegweiser_192`) | Unterstützung | 2 AP – Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1). | 2 AP – Einmal pro Zug: dein nächster Panzer kostet 1 AP weniger (mind. 1). |
| Namar | Entsatzbataillon (`dc_b_entsatzbataillon_493`) | Einheit | 3 AP 4/4 – Ihr erster Angriff nach dem Ausspielen hat +1 ATK. | 3 AP 3/4 (Text unverändert) |
| Namar | Entsatzschlag (`dc_b_entsatzschlag_494`) | Einheit | 5 AP 5/4 | 5 AP 5/3 (Text unverändert) |
| Namar | Hafenlieferung (`dc_b_hafenlieferung_510`) | Unterstützung | 2 AP – Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1). | 2 AP – Einmal pro Zug: deine nächste Artillerie kostet 1 AP weniger (mind. 1). |
| Namar | Maris-Halle (`dc_b_maris_halle_517`) | Unterstützung | 2 AP – Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast. | 2 AP – Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit und eine Ausrüstung gespielt hast. |
| Namar | Nachschubboot (`dc_b_nachschubboot_511`) | Unterstützung | 1 AP – Einmal pro Zug: ziehe 1 Karte, solange du eine offene Unterstützung hast. | 3 AP (Text unverändert) |
| Namar | Solkai-Träger (`dc_b_solkai_traeger_490`) | Einheit | 3 AP 2/6 – Ihr erster Angriff nach dem Ausspielen hat +2 ATK. | 3 AP 2/5 (Text unverändert) |
| Namar | Solkai-Werft (`dc_b_solkai_werft_516`) | Unterstützung | 2 AP – Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit. | 2 AP – Wähle beim Ausspielen einen Abschnitt. Zu Beginn deines Zuges: heile 1 an einer beschädigten eigenen Einheit dort. |
| Namar | Straßenfeuer (`dc_b_strassenfeuer_499`) | Einheit | 3 AP 4/2 – Steilfeuer II. Ihr erster Angriff nach dem Ausspielen hat +1 ATK. | 3 AP 4/1 (Text unverändert) |
| Namar | Straßenriegel (`dc_b_strassenriegel_491`) | Einheit | 3 AP 2/5 | 3 AP 2/4 (Text unverändert) |
| Namar | Versorgungsschiff (`dc_b_versorgungsschiff_512`) | Unterstützung | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK. | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK, wenn du in diesem Zug eine Einheit gespielt hast. |
| Namar | Wegjacke (`dc_b_wegjacke_536`) | Ausrüstung | 2 AP – Träger +1 ATK/+1 DEF in Abschnitten mit Unterstützung. | 2 AP – Träger +1 ATK und +1 DEF, solange du eine offene Unterstützung hast. |
| Orthea | Abbruchregel (`dc_b_abbruchregel_458`) | Unterstützung | 2 AP – Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit. | 2 AP – Zu Beginn deines Zuges: heile 1 an einer beschädigten eigenen Einheit und markiere 1 Feind als beobachtet. |
| Orthea | Asteron-Schild (`dc_b_asteron_schild_429`) | Einheit | 4 AP 3/6 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 4 AP 3/6 – Beim Ausspielen: markiere 1 Feind als beobachtet. |
| Orthea | Beobachter (`dc_b_beobachter_443`) | Einheit | 2 AP 1/2 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 2 AP 1/2 – Beim Ausspielen: markiere 1 Feind als beobachtet. |
| Orthea | Colin Abweich (`dc_b_colin_abweich_448`) | Einheit | 3 AP 2/3 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 3 AP 2/3 – Beim Ausspielen: markiere 1 Feind als beobachtet. |
| Orthea | Feuerleit (`dc_b_feuerleit_439`) | Einheit | 4 AP 4/2 – Steilfeuer II. Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 4 AP 4/2 – Steilfeuer II. Beim Ausspielen: markiere 1 Feind als beobachtet. |
| Orthea | Laborzelt (`dc_b_laborzelt_450`) | Unterstützung | 2 AP – Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf. | 2 AP – Zu Beginn deines Zuges: markiere 1 Feind als beobachtet. |
| Orthea | Leitrechner (`dc_b_leitrechner_476`) | Ausrüstung | 2 AP – Träger +1 ATK und +1 DEF gegen aufgeklärte. | 2 AP – Träger +1 DEF; +1 ATK gegen beobachtete Ziele. |
| Orthea | Linieninfanterie (`dc_b_linieninfanterie_426`) | Einheit | 2 AP 2/4 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 2 AP 2/4 – Beim Ausspielen: markiere 1 Feind als beobachtet. |
| Orthea | Lokalisierer (`dc_b_lokalisierer_444`) | Einheit | 2 AP 1/2 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 2 AP 1/2 – Beim Ausspielen: markiere 1 Feind als beobachtet. |
| Orthea | Messau-Bank (`dc_b_messau_bank_456`) | Unterstützung | 1 AP – Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf. | 1 AP – Zu Beginn deines Zuges: markiere 1 Feind als beobachtet. |
| Orthea | Messau-Fuß (`dc_b_messau_fuss_422`) | Einheit | 1 AP 1/3 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 1 AP 1/3 – Beim Ausspielen: markiere 1 Feind als beobachtet. |
| Orthea | Messgerät (`dc_b_messgeraet_471`) | Ausrüstung | 1 AP – Träger +1 ATK, +1 DEF. | 1 AP – Träger +1 ATK, +1 DEF; gegen beobachtete Ziele +1 ATK zusätzlich. |
| Orthea | Methodenblatt (`dc_b_methodenblatt_454`) | Unterstützung | 2 AP – Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf. | 2 AP – Zu Beginn deines Zuges: markiere 1 Feind als beobachtet. |
| Orthea | Nera Aster (`dc_b_nera_aster_447`) | Einheit | 3 AP 2/4 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 3 AP 2/4 – Beim Ausspielen: markiere 1 Feind als beobachtet. |
| Orthea | Probenkoffer (`dc_b_probenkoffer_475`) | Ausrüstung | 1 AP – Beim Anlegen: decke eine verdeckte gegnerische Einheit auf. | 1 AP – Beim Anlegen: markiere 1 Feind als beobachtet. |
| Orthea | Probennetz (`dc_b_probennetz_457`) | Unterstützung | 2 AP – Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf. | 2 AP – Zu Beginn deines Zuges: markiere 1 Feind als beobachtet. |
| Orthea | Probenpanzer (`dc_b_probenpanzer_431`) | Einheit | 4 AP 4/3 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 4 AP 4/3 – Beim Ausspielen: markiere 1 Feind als beobachtet. |
| Orthea | Punktvisier (`dc_b_punktfeuer_479`) | Ausrüstung | 3 AP – Träger +2 ATK gegen beobachtete Ziele. | 2 AP (Text unverändert) |
| Orthea | Trotzmelder (`dc_b_trotzmelder_446`) | Einheit | 1 AP 1/1 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 1 AP 1/1 – Beim Ausspielen: markiere 1 Feind als beobachtet. |
| Orthea | Werkbach-Riegel (`dc_b_werkbach_riegel_430`) | Einheit | 3 AP 2/5 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 3 AP 2/5 – Beim Ausspielen: markiere 1 Feind als beobachtet. |
| Ossaria | Bergungspunkt (`dc_b_bergungspunkt_276`) | Unterstützung | 2 AP – Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit. | 2 AP – Zu Beginn deines Zuges: heile 1 an einer beschädigten eigenen Infanterie. |
| Ossaria | Grenzhof-Fuß (`dc_b_grenzhof_fuss_89`) | Einheit | 2 AP 2/3 – Der erste Schaden je Zug sinkt um 1. | 2 AP 2/2 (Text unverändert) |
| Ossaria | Grenzplatte (`dc_b_grenzplatte_94`) | Einheit | 3 AP 2/5 – Der erste Schaden je Zug sinkt um 1. | 3 AP 2/4 (Text unverändert) |
| Ossaria | Helles Amt (`dc_b_helles_amt_275`) | Unterstützung | 2 AP – Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast. | 2 AP – Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Ausrüstung gespielt hast. |
| Ossaria | Hof der Namen (`dc_b_hof_der_namen_274`) | Unterstützung | 2 AP – Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit. | 2 AP – Zu Beginn deines Zuges: heile 1 an einer beschädigten eigenen Einheit mit Ausrüstung. |
| Ossaria | Kareth-Kaliber (`dc_b_kareth_kaliber_102`) | Einheit | 2 AP 2/2 – Steilfeuer II. Der erste Schaden je Zug sinkt um 1. | 2 AP 1/2 (Text unverändert) |
| Ossaria | Namenszug (`dc_b_namenszug_85`) | Einheit | 1 AP 2/2 – +1 DEF, solange sie Ausrüstung trägt. | 1 AP 1/2 (Text unverändert) |
| Ossaria | Schmiedehammer (`dc_b_schmiedehammer_295`) | Ausrüstung | 1 AP – Träger +1 ATK, +1 DEF. | 1 AP – Träger +1 ATK; Infanterie-Träger zusätzlich +1 DEF. |
| Ossaria | Steinbrunn-Lehrling (`dc_b_steinbrunn_lehrling_90`) | Einheit | 2 AP 2/4 – Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. | 2 AP 2/3 (Text unverändert) |
| Ossaria | Totenwall-Keil (`dc_b_totenwall_keil_98`) | Einheit | 5 AP 4/6 – +2 ATK und +2 DEF, solange sie Ausrüstung trägt. | 5 AP 4/5 (Text unverändert) |
| Ossaria | Trauerzug (`dc_b_trauerzug_87`) | Einheit | 2 AP 2/3 – Der erste Schaden je Zug sinkt um 1. | 2 AP 2/2 (Text unverändert) |
| Rothain | Ablösungskette (`dc_b_abloesungskette_604`) | Einheit | 2 AP 2/3 – Wird sie zerstört: ziehe 1 Karte. | 2 AP 2/2 (Text unverändert) |
| Rothain | Ablösungsplan (`dc_b_abloesungsplan_629`) | Unterstützung | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK. | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK; stehen zwei oder mehr dort, auch +1 DEF. |
| Rothain | Kronpanzer Narbstadt (`dc_b_kronpanzer_narbstadt_607`) | Einheit | 3 AP 3/4 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 3 AP 3/3 (Text unverändert) |
| Rothain | Kronsalve (`dc_b_kronsalve_619`) | Einheit | 5 AP 5/3 – Steilfeuer IV: ganze Front. | 5 AP 5/2 (Text unverändert) |
| Rothain | Silberstern-Rohr (`dc_b_silberstern_rohr_650`) | Einheit | 4 AP 5/2 – Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. | 4 AP 4/2 (Text unverändert) |
| Rothain | Thronbruch (`dc_b_thronbruch_613`) | Einheit | 5 AP 5/5 – Ihr erster Angriff nach dem Ausspielen hat +3 ATK. | 5 AP 5/4 – Ihr erster Angriff nach dem Ausspielen hat +2 ATK. |
| Rothain | Treuekompanie (`dc_b_treuekompanie_603`) | Einheit | 2 AP 3/2 – +1 ATK und +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht. | 2 AP 2/2 (Text unverändert) |
| Rothain | Wachsiegel (`dc_b_wachsiegel_647`) | Ausrüstung | 1 AP – Träger +1 DEF. Einmal: ignoriere den ersten Schaden am Träger; danach Träger −1 ATK bis Zugende. | 2 AP (Text unverändert) |
| Rothain | Werkstattbefehl (`dc_b_werkstattbefehl_634`) | Unterstützung | 2 AP – Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit. | 2 AP – Zu Beginn deines Zuges: heile 2 an einer beschädigten eigenen Einheit, die nicht allein im Abschnitt steht. |
| Sahr | Abseitsläufer (`dc_b_abseitslaeufer_686`) | Einheit | 1 AP 1/1 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 1 AP 1/2 (Text unverändert) |
| Sahr | Flankenkeil (`dc_b_flankenkeil_668`) | Einheit | 3 AP 3/3 – Ihr erster Angriff nach dem Ausspielen hat +1 ATK. | 3 AP 3/4 (Text unverändert) |
| Sahr | Flankenstoß (`dc_b_flankenstoss_674`) | Einheit | 5 AP 5/4 | 5 AP 5/5 (Text unverändert) |
| Sahr | Hesse Sar (`dc_b_hesse_sar_688`) | Einheit | 3 AP 2/3 – Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. | 3 AP 3/3 (Text unverändert) |
| Sahr | Karawanenmeister (`dc_b_karawanenmeister_689`) | Einheit | 4 AP 3/4 | 4 AP 4/4 (Text unverändert) |
| Sahr | Lagerkeil (`dc_b_lagerkeil_669`) | Einheit | 3 AP 3/3 – Kostet 1 AP weniger (mind. 1), solange eigene Infanterie an der Front steht. | 3 AP 3/4 (Text unverändert) |
| Sahr | Linienbatterie (`dc_b_linienbatterie_677`) | Einheit | 4 AP 4/2 – Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. | 4 AP 4/3 (Text unverändert) |
| Sahr | Linienknoten (`dc_b_linienknoten_690`) | Unterstützung | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht. | 2 AP – Wähle beim Ausspielen einen Abschnitt: stehen dort zwei oder mehr eigene Einheiten, haben sie +1 ATK und +1 DEF. |
| Sahr | Linienrohr (`dc_b_linienrohr_675`) | Einheit | 3 AP 3/2 – Steilfeuer II. +1 ATK, solange eigene Infanterie benachbart ist. | 3 AP 3/3 (Text unverändert) |
| Sahr | Lotte Knoten (`dc_b_lotte_knoten_687`) | Einheit | 3 AP 2/4 | 3 AP 3/4 (Text unverändert) |
| Sahr | Meilenstein (`dc_b_meilenstein_698`) | Unterstützung | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK. | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK, bei eigener Überzahl dort +2 ATK. |
| Sahr | Passschlüssel (`dc_b_passschluessel_716`) | Ausrüstung | 2 AP – Träger +1 DEF. | 2 AP – Träger +1 DEF; +1 ATK bei eigener Überzahl in seinem Abschnitt. |
| Sahr | Pfadfinder (`dc_b_pfadfinder_683`) | Einheit | 2 AP 1/2 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 2 AP 2/2 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. +1 ATK bei eigener Überzahl im Abschnitt. |
| Sahr | Straßenwurf (`dc_b_strassenwurf_679`) | Einheit | 3 AP 3/2 – Steilfeuer I. Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. | 3 AP 3/3 (Text unverändert) |
| Sahr | Tuchknoten (`dc_b_tuchknoten_717`) | Ausrüstung | 1 AP – Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1. | 1 AP – Träger +1 DEF mit einer weiteren eigenen Einheit im Abschnitt. Einmal pro Zug: Erleidet er Schaden, heilt er danach 1. |
| Sahr | Umgehungsbatterie (`dc_b_umgehungsbatterie_676`) | Einheit | 3 AP 2/3 – Steilfeuer II. Der erste Schaden je Zug sinkt um 1. | 3 AP 3/3 (Text unverändert) |
| Sahr | Umschlagbefehl (`dc_b_umschlagbefehl_707`) | Soforteinsatz | 1 AP – Wähle eine gegnerische Fronteinheit: −1 DEF (mind. 1). | 1 AP – Wähle eine gegnerische Fronteinheit: −1 DEF (mind. 1). Ziehe 1 Karte. |
| Sahr | Vorratsrohr (`dc_b_vorratsrohr_680`) | Einheit | 4 AP 3/3 – Steilfeuer II. Andere eigene Einheiten in ihrem Abschnitt: +1 ATK, wenn du in diesem Zug einen Soforteinsatz gespielt hast. | 4 AP 3/4 (Text unverändert) |
| Sahr | Zollspäher (`dc_b_zollspaeher_684`) | Einheit | 2 AP 1/2 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 2 AP 2/2 (Text unverändert) |
| Sahr | Zollzeichen (`dc_b_zollzeichen_714`) | Ausrüstung | 2 AP – Träger +1 ATK im Zug nach Bewegung. | 2 AP – Träger +1 ATK; +1 DEF mit einer weiteren eigenen Einheit im Abschnitt. |
| Steinmark | Beobachtungsposten (`dc_b_beobachtungsposten_563`) | Einheit | 2 AP 1/2 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 2 AP 1/2 – Zu Beginn deines Zuges: markiere 1 Feind als beobachtet. |
| Steinmark | Feldmesser (`dc_b_feldmesser_564`) | Einheit | 2 AP 1/2 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 2 AP 2/2 (Text unverändert) |
| Steinmark | Feuerleitblatt-Rohr (`dc_b_feuerleitblatt_rohr_556`) | Einheit | 3 AP 2/3 – Steilfeuer II. +1 ATK gegen beobachtete Ziele. | 3 AP 3/3 (Text unverändert) |
| Steinmark | Freigabestempel (`dc_b_freigabestempel_594`) | Ausrüstung | 2 AP – Träger +1 ATK im Zug nach Sofortkarte. | 2 AP – Träger +1 ATK. Kostet 1 AP weniger, solange du eine offene Unterstützung hast. |
| Steinmark | Konrad Berst (`dc_b_konrad_berst_568`) | Einheit | 3 AP 2/3 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 3 AP 3/3 (Text unverändert) |
| Steinmark | Normgeschütz (`dc_b_normgeschuetz_555`) | Einheit | 3 AP 3/3 – Steilfeuer II. | 3 AP 4/3 (Text unverändert) |
| Steinmark | Peiltrupp (`dc_b_peiltrupp_566`) | Einheit | 1 AP 1/1 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 1 AP 1/2 (Text unverändert) |
| Theryn | Blutzeuge (`dc_b_blutzeuge_122`) | Soforteinsatz | 2 AP – Opfere eine eigene Infanterie. Eine gegnerische Einheit im Abschnitt erleidet 3 Schaden. | 1 AP (Text unverändert) |
| Theryn | Feldprediger (`dc_b_feldprediger_112`) | Unterstützung | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK. | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Infanterie dort +1 ATK und +1 DEF. |
| Theryn | Letzter Ruf (`dc_b_letzter_ruf_130`) | Soforteinsatz | 3 AP – Zerstöre eine eigene Infanterie: andere eigene Einheiten im Abschnitt +2 ATK bis Zugende. | 2 AP (Text unverändert) |
| Theryn | Passläufer (`dc_b_passlaeufer_21`) | Einheit | 2 AP 2/1 – Ihr erster Angriff nach dem Ausspielen hat +1 ATK. | 2 AP 2/2 (Text unverändert) |
| Theryn | Pflichtpanzer (`dc_b_pflichtpanzer_3`) | Einheit | 3 AP 3/3 – +1 DEF, wenn du in diesem Zug Infanterie gespielt hast. | 3 AP 3/4 (Text unverändert) |
| Theryn | Ritusspäher (`dc_b_ritusspaeher_106`) | Einheit | 2 AP 1/2 – Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. | 2 AP 2/2 (Text unverändert) |
| Theryn | Sturmfeuer (`dc_b_sturmfeuer_16`) | Einheit | 2 AP 2/1 – Steilfeuer II. Beim Ausspielen: 1 Schaden an der schwächsten gegnerischen Fronteinheit in ihrem Abschnitt. | 2 AP 2/2 (Text unverändert) |
| Theryn | Werkhof (`dc_b_werkhof_115`) | Unterstützung | 2 AP – Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit. | 2 AP – Zu Beginn deines Zuges: heile 1 an bis zu zwei beschädigten eigenen Infanterien. |
| Vael | Auftragsring (`dc_b_auftragsring_154`) | Unterstützung | 2 AP – Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit. | 2 AP – Zu Beginn deines Zuges: heile 2 an einem beschädigten eigenen Panzer oder einer Artillerie. |
| Vael | Auftragsstempel (`dc_b_auftragsstempel_183`) | Ausrüstung | 2 AP – +1 ATK/+1 DEF nach Soforteinsatz diesen Zug. | 2 AP – Träger +1 ATK und +1 DEF, wenn du in diesem Zug einen Soforteinsatz gespielt hast. |
| Vael | Bilanzrede (`dc_b_bilanzrede_156`) | Unterstützung | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK. | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK, Artillerie dort +2 ATK. |
| Vael | Zielmesser (`dc_b_zielmesser_146`) | Einheit | 2 AP 1/2 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. | 2 AP 1/2 – Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Benachbarte eigene Artillerie +1 ATK. |
| Vesper | Aktenmappe (`dc_b_aktenmappe_892`) | Ausrüstung | 1 AP – Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1. | 1 AP – Der erste Schaden je Zug am Träger sinkt um 1, solange er allein im Abschnitt steht. |
| Vesper | Scheinschwerpunkt-Keil (`dc_b_scheinschwerpunkt_keil_854`) | Einheit | 5 AP 5/4 – Der erste Schaden je Zug sinkt um 1. | 5 AP 5/3 (Text unverändert) |
| Vesper | Siegelwerk (`dc_b_siegelwerk_877`) | Unterstützung | 2 AP – Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast. | 2 AP – Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Aufklärung gespielt hast. |
| Vesper | Velis-Batterie (`dc_b_velis_batterie_860`) | Einheit | 4 AP 3/4 – Steilfeuer II. | 4 AP 3/3 (Text unverändert) |
| Vesper | Velis-Front (`dc_b_velis_front_870`) | Unterstützung | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht. | 2 AP – Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF, solange sie allein im Abschnitt stehen. |
| – | Abnutzung (`dc_dok_abnutzung`) | Doktrin | 0 AP – Zerstörst du eine gegnerische Fronteinheit, hat dieser Abschnitt bis Zugende +1 ATK, eine eigene Einheit dort heilt 1 und du ziehst 1 Karte. | 0 AP – Zerstörst du eine gegnerische Fronteinheit, hat dieser Abschnitt bis Zugende +1 ATK und eine eigene Einheit dort heilt 1. |
| – | Auswertung (`dc_dok_auswertung`) | Doktrin | 0 AP – Erleidet eine eigene Einheit Schaden und überlebt, hat sie bis zum Ende dieses Zuges +1 ATK (nicht stapelbar). Zeit wird zur Waffe — knapp bemessen. | 0 AP – Erleidet eine eigene Einheit Schaden und überlebt, hat sie bis zum Ende deines nächsten Zuges +1 ATK (nicht stapelbar). |
| – | Gepanzerter Fuß (`dc_dok_gepanzerter_fuss`) | Doktrin | 0 AP – Eigene Einheiten haben +1 DEF. Ausgerüstete Einheiten haben +1 ATK und +1 DEF zusätzlich. | 0 AP – Ausgerüstete eigene Einheiten haben +1 DEF. |
| – | Marsch aus dem Vollen (`dc_dok_marsch_aus_dem_vollen`) | Doktrin | 0 AP – Einheiten kosten 1 AP weniger (min. 1), wenn Unterstützung liegt. Beim Einrücken +1 ATK und +1 DEF bis Zugende. | 0 AP – Einheiten kosten 1 AP weniger (min. 1), wenn Unterstützung liegt. Beim Einrücken +1 ATK bis Zugende. |
| – | Schwerpunkt (`dc_dok_schwerpunkt`) | Doktrin | 0 AP – Zu Beginn deines Zuges: Stehen mindestens drei eigene Einheiten in einem Abschnitt, erhält der dichteste Abschnitt +1 ATK bis Zugende. | 0 AP – Zu Beginn deines Zuges: Dein dichtester Abschnitt mit mindestens zwei eigenen Einheiten erhält +1 ATK bis Zugende. |
| – | Sturmangriff (`dc_dok_sturmangriff`) | Doktrin | 0 AP – Zu Beginn deines Zuges erhält deine stärkste Infanterie +2 ATK bis zum Ende des Zuges. | 0 AP – Zu Beginn deines Zuges erhalten deine zwei stärksten Infanterien +2 ATK bis zum Ende des Zuges. |
| – | Verteilte Stellung (`dc_dok_verteilte_stellung`) | Doktrin | 0 AP – Bist du allein im Abschnitt: +1 DEF. Verstreute Posten halten, massieren nicht. | 0 AP – Bist du allein im Abschnitt: +2 DEF. Verstreute Posten halten, massieren nicht. |

### Poolkarten (nur Werte, Text unverändert)

| Nation | Karte | vorher | nachher |
|---|---|---|---|
| Ossaria | Namensträger | 2 AP 2/4 | 2 AP 2/3 |
| Ossaria | Plattenträger-Zug | 3 AP 3/5 | 3 AP 3/4 |
| Ossaria | Totenwallpanzer | 4 AP 3/6 | 4 AP 3/5 |
| Ossaria | Unbrechbare Platte | 5 AP 4/7 | 5 AP 4/5 |
| Namar | Herr der Kais | 5 AP 5/5 | 5 AP 5/4 |
| Sahr | Wegschnitt | 2 AP | 1 AP |
| Eldran | Bollwerkwagen | 4 AP 3/5 | 4 AP 3/4 |
| Averon | Gebundene Verbindung | 4 AP | 3 AP |
| Averon | Lokalisierter Großschlag | 4 AP | 3 AP |
| Orthea | Gemessener Schlag | 3 AP | 2 AP |
| Orthea | Volltreffer berechnet | 4 AP | 3 AP |
| Vesper | Attrappenwagen | 2 AP 1/4 | 2 AP 1/3 |
| Theryn | Vorderste Welle | 1 AP 1/1 | 1 AP 1/2 |
| Theryn | Nachfolgende Welle | 1 AP 2/1 | 1 AP 2/2 |
| Theryn | Dritte Welle | 2 AP 2/1 | 2 AP 2/2 |
| Theryn | Bannerträger | 2 AP 2/2 | 2 AP 2/3 |
| Theryn | Eiferer | 2 AP 3/1 | 2 AP 3/2 |
| Theryn | Pilgerwagen | 3 AP 2/4 | 3 AP 3/4 |
| Theryn | Glaubenskette | 3 AP 3/3 | 3 AP 3/4 |
| Theryn | Sturmwagen | 4 AP 4/3 | 4 AP 4/4 |
| Theryn | Sammelfeuer | 3 AP 2/3 | 3 AP 3/3 |
| Theryn | Glockenbatterie | 2 AP 2/1 | 2 AP 2/2 |
| Theryn | Glaubensmelder | 2 AP 1/2 | 2 AP 2/2 |
| Theryn | Seher der Pflicht | 2 AP 2/1 | 2 AP 2/2 |
| Theryn | Der eine Schlag | 3 AP | 2 AP |
| Theryn | Heilige Woge | 4 AP | 3 AP |

Alle Einheiten bleiben im Wertband Median ±2 (Test t237). Die Kopiengrenzen (Gold 1, Silber 2, Bronze 4), Namen und Motive sind unverändert.

## Kontaktbögen

224 geänderte Vorderseiten: `/workspace/t212-cards/sheets/t255-geaendert-01.jpg` … `-07.jpg`.

## Reproduktion

```
node scripts/balance/sim_t255.mjs nations 288 new        # Endmessung (beide Modi)
DOK_MODE=none node scripts/balance/sim_t255.mjs nations 48 new
DOK_MODE=deck:Lyr node scripts/balance/sim_t255.mjs nations 48 new
CARDSTATS=1 node scripts/balance/sim_t255.mjs nations 48 new
RULES_OVERRIDE='{"opening_starter_ap_penalty":1}' node scripts/balance/sim_t255.mjs nations 48 new   # nur Messung
```
