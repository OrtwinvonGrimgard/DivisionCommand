# Balance t301 – Etappensicherung neu gefasst (Version 0.626)

Stand 19.11.2026. Auftrag des Projektleiters: „Ändere beides“ (Etappensicherung und Bot-Flügel), danach „Push erstmal die Änderung“. Diese Version enthält **nur die Etappensicherung**; die Bot-Abschnittswahl ist gemessen, aber zurückgestellt (§4).

## 1. Ausgangslage (0.624)

- Caldris 62,5 % (Starter) / 64,3 % (Misch), als bekannte Ausnahme im Balance-Gate bis 68 % geduldet.
- Etappensicherung hatte zwei Wirkungen:
  - +1 DEF für alle eigenen Einheiten (seit 0.619 echte DEF, RULES §8.1);
  - **nicht gedruckt:** zu Beginn des eigenen Zuges +1 DEF im Abschnitt mit den meisten eigenen Einheiten, bis Zugende. Der Code fiel in diesen Zweig, weil der Doktrin der Parameter `heal` fehlte.
- Die Doktrin ist pauschal etwa 11 Punkte wert (Spiegelmatch 53,3 % mit, 42,7 % ohne Wirkung). Caldris liegt auch ganz ohne Wirkung schon bei 55,4 / 50,9 % (Deck mit vielen Heil- und Haltekarten, dazu Rasten).

## 2. Gemessene Varianten

Nur die Caldris-Partien des vollen Gates (gleiche Seeds, je 1.260 Partien je Modus, SE ≈ 1,4) und das Doktrin-Spiegelmatch (1.024 Partien). Gemessen mit dem damals neuen Flügel-Bot (§4); deshalb liegen alle Werte etwa 5 Punkte höher als mit dem ausgelieferten Bot. Die Reihenfolge der Varianten ist davon unabhängig.

| Variante | Caldris Starter | Caldris Misch | Doktrin |
|---|---|---|---|
| 0.624 (+1 DEF alle, versteckter Abschnittsbonus) | 68,0 | 65,2 | – |
| +1 DEF alle, ohne versteckten Teil | 67,7 | 64,3 | 53,3 |
| +1 DEF nur unbeschädigt | 64,9 | 62,7 | – |
| +1 DEF nur ohne gegnerische Überzahl | 66,8 | 63,7 | – |
| +1 DEF nur wer nicht angegriffen hat | 64,6 | 58,7 | 49,4 |
| +1 DEF ab zwei eigenen im Abschnitt | 57,5 | 56,6 | 44,4 |
| +1 DEF bei eigener Mehrheit im Abschnitt | 58,0 | 55,6 | 45,1 |
| +1 DEF nur in Abschnitten ohne Feind | 56,0 | 51,6 | – |
| heilt 1 (beliebige beschädigte Einheit) | 58,3 | 55,2 | 45,3 |
| **heilt 1, nur wer nicht angegriffen hat, größter Fehlbetrag** | **56,9** | **53,9** | **44,7** |
| ohne Wirkung | 55,4 | 50,9 | 42,7 |

Verworfen: „ab zwei im Abschnitt“ hätte Linienkrieg (drei im Abschnitt) in jeder Lage übertroffen; „Mehrheit“ wäre das Spiegelbild von Auffangen und lag am Rand des Ziels.

## 3. Entscheidung und Ergebnis

**Kartentext:** „Zu Beginn deines Zuges heilt eine beschädigte eigene Einheit, die im letzten Zug nicht angegriffen hat, 1.“ Einzelheiten in RULES §8.3 (Wahl: größter Fehlbetrag, Gleichstand von links; im ersten eigenen Zug niemand).

- Eigene Mechanik: Keine andere Doktrin heilt pauschal zu Zugbeginn.
- Passt zu Caldris („Schützen und ruhen“) und zu Rasten, mit derselben Bedingung („im letzten Zug nicht angegriffen“): Wer ruht, wird versorgt und schlägt danach härter.
- Der versteckte Abschnittsbonus ist ersatzlos entfallen.

**Balance-Gate voll** (57.024 Partien, ausgelieferter Bot, gleiche Seeds wie 0.624):

| | 0.624 | 0.626 |
|---|---|---|
| Caldris Starter | 62,5 | **49,9** |
| Caldris Misch | 64,3 | **47,2** |
| Etappensicherung (Spiegel) | 56,3 | 46,0 |
| Nationen-SD Starter / Misch | 4,59 / 6,08 | 3,15 / 4,64 |
| Spanne Starter | 44,8–62,5 | 46,1 (Steinmark) – 57,6 (Vesper) |
| Spanne Misch | 42,1–64,3 | 43,7 (Lyr) – 60,5 (Merovan) |
| Startspieler Starter / Misch | 48,9 / 57,0 | 48,9 / 57,0 |

Andere Nationen bewegen sich nur über ihre Partien gegen Caldris (höchstens 1,9 Punkte, Namar Misch; Doktrinen höchstens 1,0). Außerhalb 40–60 % liegen nur noch die drei bekannten Ausnahmen: Merovan Misch 60,5 % (erlaubt bis 63 %), Bollwerk 63,1 %, Scheinschwerpunkt 63,7 % (je erlaubt bis 66 %). **Die Ausnahme für Caldris ist entfernt.** Das Gate ist grün: 0 Fehler, 3 Warnungen.

## 4. Zurückgestellt: Bot spielt auf die Flügel (Playtest t297, Befund B5)

Der Bot setzt Einheiten bisher fast nur in die Mitte (jedes freie Feld +8, Mitte +2; gemessen 86 % Mitte). Ein Umbau nach der Durchbruch-Lage ist entwickelt und gemessen, aber nicht in 0.626:

- Bewertung: gegnerischen Durchbruch blockieren +8 (scharf +9), eigenen eröffnen +7, Ziel in Reichweite +1, tödliche Bedrohung −2.
- Einsatzfelder L/C/R: 7/86/7 % → 32/34/34 %. Der neue Bot gewinnt 76 % gegen den alten und holt 2,8 statt 0,8 Durchbruch-SP je Partie.
- **Aber das volle Gate wird rot (15 Fehler):** Lyr 68–70 %, Vesper 67–71 %, Namar 31–35 %, Rothain ~37 %, Theryn 38–39 %, Sahr Starter 40 %; Scheinschwerpunkt 68 %, Verteilte Stellung 61 %, Schwerpunkt und Blitzkrieg unter 40 %.
- Ursache: Die Balance ist auf einen Bot abgestimmt, der in die Mitte ballt. Spielt der Bot um Durchbrüche, gewinnen Doktrinen, die vereinzelte Einheiten belohnen (Verteilte Stellung, Scheinschwerpunkt), und Doktrinen, die Ballung belohnen, verlieren (Schwerpunkt, Linienkrieg, Umgehen). Gewichts-Feintuning des Bots ändert daran wenig (alle Varianten Lyr ~70 %, Namar ~32 %).
- Weiter mit der Arbeit an den Operationsplänen. Die gemessenen Varianten stehen im Arbeitsklon von t301 (nicht auf `main`).
