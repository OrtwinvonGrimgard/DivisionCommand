# Balance t285: aktive Doktrin-Fähigkeiten, Bollwerk, Sicherer Nachschub

Stand 13.11.2026, Version 0.6e. Grundlage ist main 1323f53c (v0.6d). Messungen: Bot gegen Bot mit dem Harness aus t284 (Starter- und Mischdecks im Rundenturnier, 3 × 14 Partien je Paarung = 10 080 Partien je Lauf). Doktrinen im Spiegelmatch: Seite A tauscht Doktrin 2 gegen die geprüfte Doktrin, je 64 Partien × 16 Nationen = 1 024 Partien, für Bollwerk und Sicherer Nachschub zusätzlich 2 048 bis 4 096 Partien. Der Bot würfelt bei Gleichstand (`Math.random`). Darum streuen Läufe auch bei gleichen Seeds um etwa ±1,4 Punkte je Nation.

## 1. Befund: Welche aktiven Fähigkeiten ignorierte die KI?

Geprüft wurden alle 36 Doktrinen und alle Karten mit aktivierbaren Fähigkeiten (Engine-Aktionen in `dispatch`, die `listActions` nicht anbot oder die der Bot nicht bewertete).

| Fähigkeit | Quelle | Stand vor t285 | t285 |
|---|---|---|---|
| Schutzwall | Bollwerk | Engine ok, aber nicht in `listActions`; Bot nie | gelistet, Bot nutzt AP, die sonst verfallen würden |
| Feldreparatur (`HEAL_ARMORED`) | Sicherer Nachschub | Engine-Stub: heilte 2 an jedem Ziel, ohne Doktrin- und 1×-Prüfung; Bot nie | regelkonform, gelistet, Bot nutzt sie vor den Angriffen |
| Überschuss | Sicherer Nachschub | Engine-Stub: zog 2 AP ab und machte nichts bereit; Bot nie | regelkonform, gelistet, Bot prüft die zweite Nutzung auf einer Kopie |
| Verlegung | Verlegung | gelistet, Bot nutzt sie | unverändert (Nationsdoktrin Merovan) |
| Stellungswechsel (Schlüsselwort, 100 Karten, 96 davon in Nationsdecks) | Einheiten | UI ok, nicht in `listActions`; Bot nie | gelistet; Bot-Logik vorhanden, Standard **aus** (siehe 3) |
| Kommunikationszentrum: zweite Fähigkeit (Aufklärung) | Unterstützung | Bot probierte nur die erste Fähigkeit | Bot prüft jede Fähigkeit einzeln |
| Störwagen Brummbär (Stören/Übernehmen) | Unterstützung | Engine-Stub ohne Wirkung | offen (in keinem Deck) |

Alle übrigen aktivierbaren Fähigkeiten (Feuerauftrag, Drohnenschlag, Finte, Lazarett, Koordination, Logistik, Satellit, Nebel, Verschieben, Spionage, Verwundetennest, Aufklärung, Taktik-Fähigkeiten, Ausrüstung) bewertet der Bot schon seit t254 über die Vorausschau.

Wichtig für die Messung: In keinem Nationsdeck (Starter oder Misch) liegt eine Befestigung oder eine Unterstützung mit aktivierbarer Fähigkeit. Schutzwall und Überschuss kommen in Bot-gegen-Bot-Partien mit Nationsdecks also gar nicht vor. Ihre Nutzung ist mit einem Szenario-Deck gemessen (Starterdeck mit 6 getauschten Karten: Festung/Minenfeld bzw. Artilleriestellung, Drohnenkommando, Kommunikationszentrum, Lagerhaus).

## 2. Nutzung durch die KI (Version 0.6e)

Audit `tmp_t283/audit.js`, 640 Partien je Modus. „Gelegenheit“ heißt: Die Aktion stand in einem eigenen Zug in `listActions`.

| Fähigkeit | Modus | Züge mit Gelegenheit | davon genutzt | Rate | Nutzungen je Partie |
|---|---|---|---|---|---|
| Feldreparatur | Szenario | 477 | 467 | 97,9 % | 0,73 |
| Feldreparatur | Doktrin-Spiegelmatch (1 024 Partien) | – | 821 Nutzungen in 405 Partien | – | 0,80 |
| Schutzwall | Szenario | 1 597 | 440 | 27,6 % | 0,69 |
| Überschuss | Szenario | 1 353 | 0 | 0 % | 0 |
| Kommunikationszentrum (Koordination) | Szenario | 57 | 57 | 100 % | 0,09 |
| Drohnenschlag | Szenario | 1 088 | 1 088 | 100 % | 1,72 |
| Verlegung | Starter | 560 | 248 | 44,3 % | 0,39 |
| Stellungswechsel | Starter / Misch | 2 160 / 2 414 | 0 | 0 % (Standard aus) | 0 |

- **Schutzwall** kostet 2 AP. Er bekommt nur einen kleinen Eigenwert und läuft darum nach Ausspielen und Angriffen mit übrigen AP. Diese Rate ist gewollt.
- **Überschuss** steht oft in der Liste (eine Unterstützung hat ihre Fähigkeit genutzt, 2 AP sind übrig). Mit 5 AP reicht es danach aber fast nie für die zweite Nutzung: 2 AP Fähigkeit + 2 AP Überschuss + 2 AP Fähigkeit = 6 AP. Die Vorausschau lehnt solche Fälle richtig ab. Der Test zeigt, dass der Bot Überschuss nutzt, sobald es sich lohnt (zweiter Feuerauftrag mit 4 AP).

## 3. Stellungswechsel: Messung und Entscheidung

| Lauf | Bot-Schalter `kwMove` | Nutzungen je Spieler-Partie (Starter/Misch) | Starter: SD, Spanne | Misch: SD, Spanne |
|---|---|---|---|---|
| b0 | (Stand 0.6d) | 0 / 0 | 1,5, Merovan 47,3 – Ossaria 52,8 | 2,9, Lyr 44,3 – Merovan 54,4 |
| a1 | 2 (Abschnitt besetzen und Durchbruch blocken) | 0,56 / 0,76 | 6,5, Dargan 42,6 – **Vesper 67,0** | 7,4, Dargan 40,6 – **Sahr 65,1** |
| k1 | 1 (nur gegnerischen Durchbruch blocken) | 0,16 / 0,32 | 2,4, Orthea 46,1 – Vesper 53,1 | 3,5, Dargan 44,9 – Vesper 57,5 |
| k0 | 0 (aus) | 0 / 0 | 1,6 | 2,0 |

Stellungswechsel steckt vor allem in Sahr (13 im Starterdeck), Vesper (10), Merovan (10) und Lyr (7). Orthea und Dargan haben keine. Die Nationen wurden bisher ohne ihn austariert. Nutzt ihn die KI, verschiebt das die Nationen um bis zu 16 Punkte. Weil t285 die Nationen nicht verschieben soll, ist der Schalter im Standard aus (`DCBot.defaults.kwMove = 0`). Engine, UI und `listActions` bieten den Stellungswechsel an, der Bot kann ihn mit `applyCfg({kwMove: 1|2})` nutzen. Offen ist eine eigene Runde: KI-Stellungswechsel einschalten und Sahr, Vesper, Merovan und Lyr nachziehen.

## 4. Bollwerk und Sicherer Nachschub

Bollwerk und Sicherer Nachschub sind keine Nationsdoktrin. Änderungen an ihnen wirken also nicht auf die Nationstabellen.

### Varianten (Spiegelmatch, Bollwerk/SN-Spalten jeweils 3 072 bzw. 4 096 Partien)

| Variante | Bollwerk | Sicherer Nachschub | Bollwerk % | SN % |
|---|---|---|---|---|
| a0 (KI-Fähigkeiten, Werte 0.6d) | +1 DEF | heilt 1, ein gepanzertes Ziel | 42,5 | 46,7 |
| v1 | +2 DEF | heilt 2, ein Ziel | 44,4 | 47,6 |
| v2 | +1 DEF, im Gegnerzug +1 ATK | heilt 1, alle gepanzerten | 45,2 | 47,1 |
| v3 | +2 DEF, im Gegnerzug +1 ATK | heilt 2, alle gepanzerten | 45,3 | 48,3 |
| v4 | +1 DEF, +1 ATK für alle | heilt 1, alle eigenen | 57,6 | 49,1 |
| v5 | +2 DEF, im Gegnerzug +2 ATK | heilt 2, alle eigenen | 45,6 | 51,7 |
| v6 | +1 DEF, unbeschädigt +1 ATK | heilt 2, alle gepanzerten | 56,4 | 49,1 |
| v7 | +2 DEF, unbeschädigt +1 ATK | heilt 2, alle gepanzerten | 57,7 | 47,9 |
| v8 / v8b | +1 DEF, ab 5 DEF +1 ATK | – | 52,4 / 52,6 | – |
| v9 | +1 DEF, ab 4 DEF +1 ATK | – | 56,4 | – |
| v10 | unbeschädigt +1 ATK (ohne DEF) | – | 57,0 | – |
| **v11 (gewählt)** | **+1 DEF, ab 6 DEF +1 ATK** | **heilt 2, alle gepanzerten** | **49,9** | (v3/v6/v7 ≈ 48,4) |

DEF und ATK im Gegnerzug bewegen die Quote kaum. ATK im eigenen Zug wirkt stark. Darum bekommt Bollwerk ein ATK-Plus mit hoher DEF-Schwelle. Die 6 DEF zählen mit allen Boni, auch mit dem +1 DEF von Bollwerk selbst. Sicherer Nachschub behält das Panzer-Thema: Die Feldreparatur heilt jetzt alle beschädigten gepanzerten Einheiten um 2.

### Ergebnis (Endstand 0.6e)

| Doktrin | vorher (a0, 3 072) | nachher (f1 + f1x, 3 072) |
|---|---|---|
| Bollwerk | 42,5 % | **50,4 %** |
| Sicherer Nachschub | 46,7 % | **48,7 %** |

Neue Texte:
- Bollwerk: „Eigene Einheiten +1 DEF; Einheiten mit mindestens 6 DEF zusätzlich +1 ATK. Befestigungsanlagen +1 auf ihre Effekte. Einheiten hinter einer Befestigung +1 Angriff. Schutzwall (2 AP, 1× pro Zug): eine Befestigung aus dem Ablagestapel auf die Hand.“
- Sicherer Nachschub: „Unterstützung −1 AP, mindestens 1. 1×/Zug: beschädigte gepanzerte Einheiten heilen 2. Überschuss (2 AP): Fähigkeit einer Unterstützung ein zweites Mal.“

Sonderfälle: `docs/regeln/KARTEN_SONDERFAELLE.md`.

## 5. Vorher/nachher: Doktrinen und Nationen

### Starterdecks (je Lauf 10 080 Partien, Seeds b0/f1 gleich, b0r/f2 gleich)

| Nation | vorher b0 | vorher b0r | vorher gepoolt | nachher f1 | nachher f2 | nachher gepoolt | Δ gepoolt |
|---|---|---|---|---|---|---|---|
| Merovan | 47.3 | 46.5 | 46.9 | 45.7 | 46.4 | 46.1 | -0.8 |
| Eldran | 48.3 | 46.5 | 47.4 | 48.8 | 46.4 | 47.6 | +0.2 |
| Orthea | 48.0 | 48.0 | 48.0 | 50.3 | 50.2 | 50.2 | +2.2 |
| Lyr | 49.0 | 48.5 | 48.8 | 51.5 | 48.9 | 50.2 | +1.5 |
| Sahr | 50.5 | 47.3 | 48.9 | 50.0 | 50.6 | 50.3 | +1.4 |
| Steinmark | 48.8 | 50.2 | 49.5 | 49.2 | 47.1 | 48.1 | -1.4 |
| Theryn | 49.4 | 50.1 | 49.8 | 50.5 | 50.2 | 50.4 | +0.6 |
| Vesper | 50.8 | 49.0 | 49.9 | 46.3 | 49.4 | 47.9 | -2.0 |
| Dargan | 48.6 | 51.4 | 50.0 | 50.9 | 50.0 | 50.4 | +0.4 |
| Vael | 51.2 | 49.5 | 50.4 | 48.5 | 47.9 | 48.2 | -2.2 |
| Namar | 50.1 | 51.5 | 50.8 | 49.8 | 49.7 | 49.8 | -1.1 |
| Averon | 52.4 | 49.5 | 51.0 | 50.3 | 50.4 | 50.4 | -0.6 |
| Rothain | 51.1 | 51.6 | 51.4 | 51.0 | 50.9 | 51.0 | -0.4 |
| Karsk | 51.4 | 52.9 | 52.2 | 51.2 | 50.1 | 50.6 | -1.5 |
| Ossaria | 52.8 | 52.0 | 52.4 | 53.7 | 56.7 | 55.2 | +2.8 |
| Caldris | 50.2 | 55.7 | 53.0 | 52.3 | 55.1 | 53.7 | +0.7 |
| **Streuung (SD)** | 1.5 | 2.4 | 1.7 | 2.0 | 2.7 | 2.2 | größte Abweichung 2.8 |
| Startspieler | 49.2 | 49.7 | 49.5 | 49.3 | 49.4 | 49.4 | |

### Mischdecks (je Lauf 10 080 Partien, Seeds b0/f1 gleich, b0r/f2 gleich)

| Nation | vorher b0 | vorher b0r | vorher gepoolt | nachher f1 | nachher f2 | nachher gepoolt | Δ gepoolt |
|---|---|---|---|---|---|---|---|
| Lyr | 44.3 | 44.2 | 44.3 | 44.8 | 43.3 | 44.0 | -0.2 |
| Sahr | 45.9 | 48.0 | 47.0 | 49.3 | 47.2 | 48.3 | +1.3 |
| Eldran | 48.1 | 47.1 | 47.6 | 47.7 | 45.8 | 46.8 | -0.8 |
| Namar | 46.6 | 48.9 | 47.8 | 47.7 | 48.7 | 48.2 | +0.4 |
| Ossaria | 48.2 | 49.6 | 48.9 | 50.2 | 48.7 | 49.5 | +0.6 |
| Vesper | 48.9 | 49.0 | 48.9 | 48.7 | 50.3 | 49.5 | +0.6 |
| Steinmark | 49.4 | 49.1 | 49.3 | 50.0 | 51.1 | 50.6 | +1.3 |
| Dargan | 50.5 | 48.6 | 49.5 | 48.8 | 48.0 | 48.4 | -1.2 |
| Averon | 49.9 | 50.0 | 50.0 | 50.4 | 50.6 | 50.5 | +0.6 |
| Karsk | 50.6 | 49.9 | 50.2 | 51.6 | 49.4 | 50.5 | +0.3 |
| Orthea | 50.4 | 50.9 | 50.6 | 50.3 | 51.6 | 51.0 | +0.3 |
| Caldris | 51.5 | 52.1 | 51.8 | 49.4 | 52.4 | 50.9 | -0.9 |
| Vael | 53.9 | 50.7 | 52.3 | 51.2 | 50.8 | 51.0 | -1.3 |
| Rothain | 53.2 | 53.4 | 53.3 | 51.9 | 54.8 | 53.4 | +0.1 |
| Theryn | 54.2 | 54.3 | 54.3 | 53.5 | 54.7 | 54.1 | -0.1 |
| Merovan | 54.4 | 54.2 | 54.3 | 54.4 | 52.5 | 53.4 | -0.9 |
| **Streuung (SD)** | 2.9 | 2.6 | 2.7 | 2.3 | 3.0 | 2.5 | größte Abweichung 1.3 |
| Startspieler | 56.5 | 56.6 | 56.5 | 57.1 | 57.1 | 57.1 | |

### Doktrinen (Spiegelmatch, Doktrin 2 getauscht, je 1 024 Partien, gleiche Seeds)

| Doktrin | vorher b0 | nachher f1 | Δ |
|---|---|---|---|
| Bollwerk | 42.6 | 50.6 | +8.0 |
| Normverband | 43.2 | 44.1 | +0.9 |
| Sicherer Nachschub | 47.5 | 48.0 | +0.5 |
| Gepanzerter Fuß | 48.5 | 48.3 | -0.2 |
| Lauer | 48.7 | 49.6 | +0.9 |
| Stoßtrupp | 49.9 | 50.3 | +0.4 |
| Umgehen | 50.6 | 52.2 | +1.6 |
| Marsch aus dem Vollen | 51.2 | 49.9 | -1.3 |
| Verlegung | 52.2 | 54.4 | +2.2 |
| Gegenstoß | 53.7 | 53.6 | -0.1 |
| Feuerplan | 54.1 | 53.8 | -0.3 |
| Scheinschwerpunkt | 54.3 | 55.3 | +1.0 |

Die Nationsspiele sind vorher und nachher gleich: Keine Nation hat Bollwerk oder Sicherer Nachschub, in keinem Nationsdeck liegt eine Befestigung oder eine aktivierbare Unterstützung, und Stellungswechsel ist aus. Die Abweichungen (gepoolt höchstens 2,8 Punkte) kommen von Seeds und Bot-Zufall. Zum Vergleich: Derselbe Code (0.6d) liegt mit anderen Seeds bis zu 5,5 Punkte auseinander (b0 gegen b0r, Caldris 50,2 / 55,7). Der Startspieler-Vorteil bleibt bewusst so, wie er ist (Mischdecks ≈ 57 %, Starter ≈ 49 %): keine Einheitengrenze, keine Regeländerung.

Die übrigen Doktrinen hat t285 nicht verändert. Ihre Abweichungen in Abschnitt 5 liegen im Rauschen eines Laufs mit 1 024 Partien (±1,6 Punkte Standardfehler).

## 6. Offen

- Stellungswechsel der KI einschalten und die Nationen Sahr, Vesper, Merovan und Lyr nachziehen (eigene Runde, siehe 3).
- Überschuss ist mit 5 AP fast nie bezahlbar. Vorschlag (nicht umgesetzt): Überschuss für 1 AP.
- Schutzwall und Überschuss haben in den Nationsdecks keine Zielkarten (keine Befestigung, keine aktivierbare Unterstützung).
- Störwagen Brummbär: Stören/Übernehmen ist in der Engine ein Stub ohne Wirkung (Karte in keinem Deck).
- Normverband bleibt schwach (≈ 44 %, Nationsdoktrin Steinmark). t284 hatte eine Aufwertung getestet und verworfen.
