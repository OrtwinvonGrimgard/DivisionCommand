# Schlüsselwörter – **implementiert**

Die 23 Wörter (16 ursprüngliche, 2 vereinheitlichte Bestandskerne, 5 neue taktische Mechaniken) sind allgemeines Vokabular und an keine Nation gebunden. Sie stehen auf den Karten als **fettes Wort** mit vollständigem Erinnerungstext in Klammern. Das gilt für die Detailansicht, die Deckbuilder-Großansicht und die Platzhalterkarten. Auf dem Tisch erscheint eine Wortleiste.

Die Engine wertet die Wörter strukturiert aus (`def.keywords`, strukturierte `effects`, `engine.js` und `tactical_runtime.js`). Sie verlässt sich nicht auf Fließtext. Quelle des Vokabulars ist `web/js/data/keywords.js`, die Tests liegen in `tests/test_keywords.js`.

> Die Sondermechaniken je Nation in [NEUE_EFFEKTIDEEN.md](../entwicklung/NEUE_EFFEKTIDEEN.md) sind davon getrennt und bleiben **Vorschläge, nicht implementiert**.

## Die 23 Wörter

> **Hinweis:** Das frühere Schlüsselwort **Indirektes Feuer** entfällt. Artillerie-Reichweite steuert das Tag **Steilfeuer I–V** (Chip auf der Karte). Details: [RULES_v0.5_GRUNDKONZEPT.md](RULES_v0.5_GRUNDKONZEPT.md) §7.1 und [KARTEN_SONDERFAELLE.md](KARTEN_SONDERFAELLE.md).


- **Gefechtsbereit** (Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.)
- **Ablösung** (Wird diese Einheit zerstört, kostet die nächste eigene Einheit, die du auf dasselbe Feld setzt, 1 AP weniger (mindestens 1), bis das Feld wieder besetzt wurde oder bis zum Ende deines nächsten Zugs, was zuerst eintritt. Höchstens eine solche Markierung pro Feld.)
- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)
- **Fernschuss** (Hat +1 Reichweite. Bei Steilfeuer nur Stufen I–III; IV/V erreichen bereits die ganze Front.)
- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)
- **Platztausch** (Wird die Einheit aufgedeckt, darfst du sie mit einer anderen eigenen verdeckten Einheit tauschen. Der Tausch gilt nicht als neuer Einsatz (kein neues Eingraben). Der Gegner erfährt nicht den Namen der anderen Karte, nur dass getauscht wurde bzw. die Wahl existiert.) — *Engine: Die Wahl erscheint, sobald du am Zug bist und keine andere Auswahl offen ist.*
- **Überlast** (Hat +2 ATK und +1 DEF. Am Ende jedes deiner Züge erleidet sie 1 Schaden, der nicht verhindert werden kann (nicht durch Eingraben oder Schadensreduktion).)
- **Abschirmung** (Einmal pro Zug darfst du 1 Schaden, den eine benachbarte eigene Einheit erleiden würde, auf diese Einheit umleiten.) — *Engine: wird automatisch genutzt, wenn die abschirmende Einheit offen liegt und den Schaden überlebt.*
- **Erbitterung** (Hat +1 ATK für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)
- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)
- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.) — *Bedienung: Detailansicht der eigenen Einheit → „Stellungswechsel“.*
- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- **Sicherung** (Andere eigene Einheiten im selben Abschnitt haben +1 DEF, solange diese Einheit offen liegt.) — *Engine: wird nach jeder Aktion neu berechnet (Einsatz, Verlust, Aufdecken, Verdecken, Versetzen); mehrere Sicherungen addieren sich.*
- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)
- **Hinterhalt** (Hat +2 ATK bei ihrem ersten Angriff nach dem Aufdecken.)
- **Zähigkeit** (Hat +1 DEF für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- **Erstschadenschutz** (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- **Binden** ((1 AP; verbraucht den Angriff dieser Einheit): Nur in deinem Zug, einmal pro Zug, wenn diese offene Einheit jetzt legal angreifen könnte. Wähle eine offene, nicht eingegrabene gegnerische Fronteinheit im gegenüberliegenden Abschnitt. Bis zum Ende des nächsten Zuges ihres Besitzers darf sie ihr Feld weder durch Versetzen, Tausch, erzwungene Bewegung noch Rücknahme auf die Hand verlassen. Zerstörung oder Opferung bleibt möglich. Sie darf weiter angreifen und Fähigkeiten nutzen. Kein Schaden. Höchstens ein Bindeneinsatz pro Besitzer pro Zug. Nicht stapelbar; eine weitere Bindung desselben Ziels ist bis zum Ablauf unzulässig. Der Status bleibt bis zum Ablauf auch bestehen, wenn der Binder zerstört wird.)
- **Anmarschstörung** ((1 AP; einmal pro eigenem Zug): Nur in deinem Zug. Wähle einen gegnerischen Abschnitt. Solange diese offene Unterstützung liegt, kostet die erste dort neu ins Spiel kommende gegnerische Einheit bis zum Ende des nächsten gegnerischen Zuges 1 AP zusätzlich; danach ist die Markierung verbraucht. Es zählt jede neue Einheit aus Hand oder Ablage, auch durch einen sonst kostenlosen Effekt; gewöhnliche Rabatte und Mindestkosten werden zuerst berechnet, dann +1 AP. Bei unzureichenden AP ist dieser Einsatz dort nicht zulässig; die Markierung wird nicht verbraucht. Bewegung bereits liegender Einheiten, Tausch, Unterstützung, Ausrüstung und Token lösen sie nicht aus. Kein Schaden und kein Angriffsverbot. Höchstens eine eigene Anmarschstörung gleichzeitig, nicht stapelbar. Wird die Quelle verdeckt oder entfernt, endet sie sofort.)
- **Feuerschutz** ((1 AP; verbraucht den Angriff dieser Einheit): Nur in deinem Zug, einmal pro Zug, wenn diese offene Einheit jetzt legal angreifen könnte. Wähle eine andere offene eigene Fronteinheit auf einem benachbarten Feld derselben Reihe und eine offene gegnerische Fronteinheit, die beide jetzt legal angreifen könnten. Beim nächsten Angriff der gewählten eigenen Einheit gegen genau dieses Ziel in diesem Zug verursacht dessen Gegenschlag beziehungsweise Nebel-Erstschlag 2 Schaden weniger, mindestens 0; andere Schadensquellen bleiben unverändert. Der Schutz wird bei Kampfbeginn verbraucht, auch wenn der Angreifer danach an einer Mine stirbt. Er endet vorher, wenn eine der drei Einheiten entfernt oder verdeckt wird, ihr Feld wechselt oder dein Zug endet. Kein eigener Schaden durch die Schutzhandlung. Höchstens ein Feuerschutz gleichzeitig pro Seite; nicht stapelbar.)
- **Gefechtsabbruch** ((Reaktion, 1 AP; einmal pro gegnerischem Zug): Nachdem ein gegnerischer Angriff gegen diese offene Einheit vollständig abgewickelt wurde, einschließlich Gegenschlag und Zerstörungen, darfst du sie, falls sie überlebt hat, auf ein freies unmittelbar benachbartes Feld derselben eigenen Frontreihe versetzen. Kein Sprung über ein Feld. Sie behält Schaden, Ausrüstung, Token und Instanz-ID. Keine Heilung, kein Verdecken, kein neuer Einsatz und kein neues Eingraben. Bis zum Ende deines nächsten Zuges kann sie nicht angreifen, auch nicht durch Zusatzangriff. Ist sie gebunden oder gibt es kein freies legales Nachbarfeld, ist die Reaktion nicht möglich. Abgelehnte Reaktion kostet nichts. Nicht bei Soforteinsatzschaden oder eigenem Angriff; keine Wirkung für eine zerstörte Einheit.)
- **Vorpostenmeldung** (Solange diese Einheit offen liegt, decke in jedem Spielerzug die erste verdeckte gegnerische Fronteinheit auf, die neu in den gegenüberliegenden Abschnitt eingesetzt oder durch gewöhnliches Versetzen dorthin bewegt wird. Erst nach Platzierung und Bezahlung, vor dem nächsten Spielerbefehl; Eingraben-Schutz bleibt unverändert bestehen. Eine bereits offen eintretende Einheit verbraucht die Meldung nicht. Bereits im Abschnitt liegende Einheiten bleiben unverändert. Aufdecken, Verdecken und Platztausch zählen hierfür nicht als Eintritt. Kein Schaden, kein Bewegungsstopp, kein Beobachtet-Marker. Mehrere Vorpostenmeldungen desselben Besitzers im selben Abschnitt teilen sich eine Auslösung pro Spielerzug. Ein zerstörter oder verdeckter Melder löst nicht aus; seine spätere Rückkehr setzt das gemeinsame Auslösungslimit nicht zurück.)

## Verteilung (Deckkarten mit dem Wort)

| Wort | gesamt | Steinmark | Karsk | Theryn | Vael | Merovan | Lyr | Ossaria | Caldris | Orthea | Namar | Rothain | Sahr | Averon | Vesper | Dargan | Eldran | neutral |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Gefechtsbereit | 45 | 2 | 8 | 10 | 2 | 1 | 1 | 1 | · | 1 | · | 2 | 1 | 10 | 1 | 2 | 2 | 1 |
| Ablösung | 23 | 7 | 1 | · | · | · | 1 | · | 1 | · | 3 | 5 | · | · | 2 | 1 | 1 | 1 |
| Staffelangriff | 51 | 3 | 1 | 11 | 1 | 1 | 1 | 2 | 3 | 3 | 3 | 5 | 2 | 1 | · | 9 | 2 | 3 |
| Fernschuss | 27 | 1 | · | 1 | 1 | 1 | · | 3 | 5 | 7 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| Durchschlag | 48 | 1 | 1 | 3 | 9 | 2 | 2 | 3 | 5 | 7 | · | 8 | 2 | 1 | 2 | · | 2 | · |
| Platztausch | 11 | · | · | · | · | 1 | · | · | · | · | 1 | · | 1 | 2 | 4 | · | · | 2 |
| Überlast | 18 | · | 5 | 2 | · | · | 2 | · | 2 | · | · | · | · | 1 | 1 | 3 | 2 | · |
| Abschirmung | 41 | 1 | · | 1 | 1 | 2 | 2 | 9 | 2 | · | 6 | 1 | · | 3 | 3 | 1 | 6 | 3 |
| Erbitterung | 25 | 4 | 2 | 4 | 3 | 1 | · | 2 | 1 | 1 | · | 2 | 1 | 2 | 2 | · | · | · |
| Heranführung | 39 | 1 | 1 | 1 | 3 | 10 | · | · | 1 | 2 | 6 | 2 | 4 | 1 | · | 4 | 1 | 2 |
| Stellungswechsel | 100 | 3 | 3 | 1 | 3 | 18 | 9 | 1 | 2 | · | 6 | 4 | 19 | 6 | 15 | · | 7 | 3 |
| Zuteilung | 90 | 10 | 9 | 1 | 10 | 1 | 3 | 7 | 3 | 4 | 13 | 2 | 3 | 7 | 3 | 2 | 9 | 3 |
| Sicherung | 32 | 4 | · | · | 1 | 3 | · | 1 | 3 | 1 | 3 | 1 | 2 | 2 | 2 | 2 | 6 | 1 |
| Nachsetzen | 44 | · | 8 | 2 | 2 | 2 | 4 | 1 | 1 | 5 | 1 | 3 | 2 | · | 3 | 8 | · | 2 |
| Hinterhalt | 16 | 1 | · | · | · | 1 | 5 | · | · | · | · | · | 4 | 1 | 3 | · | · | 1 |
| Zähigkeit | 31 | 2 | 1 | 1 | 3 | 1 | 6 | 4 | 6 | 1 | 1 | 1 | 1 | · | · | 1 | 2 | · |
| Absetzen | 29 | 1 | · | · | · | 2 | 6 | · | · | · | 1 | · | 5 | 5 | 7 | · | · | 2 |
| Erstschadenschutz | 14 | 1 | · | 1 | 1 | 1 | 1 | 1 | 1 | · | 1 | 1 | 1 | 1 | 1 | 1 | 1 | · |
| Binden | 2 | · | · | · | · | · | · | · | · | · | · | · | · | · | · | · | · | 2 |
| Anmarschstörung | 2 | · | · | · | · | · | · | · | · | · | · | · | · | · | · | · | · | 2 |
| Feuerschutz | 2 | · | · | · | · | · | · | · | · | · | · | · | · | · | · | · | · | 2 |
| Gefechtsabbruch | 2 | · | · | · | · | · | · | · | · | · | · | · | · | · | · | · | · | 2 |
| Vorpostenmeldung | 2 | · | · | · | · | · | · | · | · | · | · | · | · | · | · | · | · | 2 |

610 von 1709 Deckkarten tragen mindestens ein Wort, 133 davon genau zwei. Ausrüstung und Unterstützung können die passenden neuen allgemeinen Wörter tragen.

Die Umsetzung t203 mit zehn additiven neutralen Erprobungskarten, Abgrenzungen, Quellen und dokumentierten Konfliktentscheidungen steht in [TAKTISCHE_SCHLUESSELWOERTER.md](TAKTISCHE_SCHLUESSELWOERTER.md). Reproduzierbarer Build: `npm run build:tactics`.

## Umgestellte alte Kartentexte (35)

Diese Texte entsprachen einem Wort. Der Satzteil wurde durch das Wort ersetzt, ein Resttext bleibt als eigener Effekt stehen.

| Karte | Nation | alter Satzteil | Wort | Resttext |
|---|---|---|---|---|
| Wellenbrecher | Theryn | +2 ATK, wenn in diesem Zug bereits eine eigene Einheit angegriffen hat. | Staffelangriff | — |
| Kronsalve | Rothain | +2 ATK im Zug des Ausspielens. | Gefechtsbereit, Zuteilung | Kann jeden Frontabschnitt angreifen. |
| Stoßfeuer | Karsk | +2 ATK im Zug, in dem du bereits eine Einheit beschädigt hast. | Nachsetzen | — |
| Massenschlag | Karsk | +2 ATK im Zug des Ausspielens; erleidet danach 1 Schaden. | Gefechtsbereit, Überlast | Kann jeden Frontabschnitt angreifen. |
| Kareth-Kaliber | Ossaria | +1 ATK, wenn in diesem Zug eigene Einheit zerstört. | Erbitterung | — |
| Wellenmelder | Theryn | Beim Ausspielen: ziehe 1 Karte. | Zuteilung | — |
| Eifererzug | Theryn | Am Zugende erleidet diese Einheit 1 Schaden. | Überlast | +2 ATK. |
| Nila Still | Vesper | Beim Ausspielen: ziehe 1. / Einheiten hier +1 DEF; | Zuteilung, Sicherung | Einmal/Zug: negiere 1 Schaden, wenn mindestens eine Einheit verdeckt liegt. |
| Hauptmann Kader | Dargan | Beim Ausspielen: ziehe 1. / Einheiten hier +1 DEF. | Zuteilung, Sicherung | Einmal/Zug: eine Einheit, die diesen Zug Schaden verursacht hat, +1 ATK. |
| Marei Aure | Eldran | Einheiten hier +1 DEF. | Sicherung, Zähigkeit | Einmal/Zug: heile 1 ODER ziehe 1. |
| Tomas Lenn | Eldran | Beim Ausspielen: ziehe 1; / Nächste Einheit kostet 1 weniger (min. 1). | Zuteilung, Heranführung | — |
| Hesse Sar | Sahr | Beim Ausspielen: ziehe 1; | Zuteilung, Staffelangriff | Einheiten hier kosten diesen Zug 1 weniger (min. 1). |
| Konrad Berst | Steinmark | Abschnitt +1 DEF. | Sicherung, Erbitterung | Beim Ausspielen: decke 1 auf. |
| Ren Zoll | Namar | Beim Ausspielen: ziehe 1; / Abschnitt +1 DEF; | Zuteilung, Sicherung | Feind kann dich nicht als Unterstützung stehlen. |
| Colin Abweich | Orthea | Abschnitt +1 DEF. | Sicherung, Zähigkeit | Beim Ausspielen: decke 2 auf. |
| Erste Welle | neutral | +1 ATK, wenn in diesem Zug eine eigene Infanterie angegriffen hat. | Staffelangriff | — |
| Erste Welle | Theryn | +1 ATK, wenn in diesem Zug bereits eine eigene Infanterie angegriffen hat. | Staffelangriff | — |
| Heilige Front | Theryn | Am Zugende erleidet diese Einheit 1 Schaden. | Überlast | Eigene Infanterie im Abschnitt hat +1 ATK. |
| Stoßgruppe | Karsk | +1 ATK beim Angriff. Erleidet danach 1 Schaden. | Überlast | Wenn dadurch zerstört: ziehe 1 (System lernt). |
| Siegelposten | Vesper | Beim Ausspielen: ziehe 1. | Zuteilung | — |
| Flankenläufer | Sahr | +1 ATK, wenn sie in einen angrenzenden Abschnitt rückt. | Stellungswechsel | — |
| Straßenbataillon | Sahr | Beim Ausspielen: ziehe 1; | Zuteilung | +1 DEF bis Zugende. |
| Trauerzug | Ossaria | +1 DEF, wenn in diesem Zug eine eigene Einheit zerstört wurde. | Zähigkeit | — |
| Grenzhof-Fuß | Ossaria | +1 ATK, wenn in diesem Zug eine eigene Einheit zerstört wurde. | Erbitterung | — |
| Wellenpanzer | Theryn | +1 ATK, wenn in diesem Zug schon eine eigene Infanterie angrifft. | Staffelangriff | Beim Ausspielen: heile eine eigene Infanterie um 1. |
| Pflichtbrecher | Theryn | +1 ATK für jede eigene Infanterie, die in diesem Zug zerstört wurde (max. +2). | Erbitterung | — |
| Stoßkeil | Karsk | +2 ATK im Zug des Ausspielens. Erleidet danach 1 Schaden. | Gefechtsbereit, Überlast | — |
| Sensorwagen | Averon | Einheiten hier +1 DEF; | Sicherung | Bei Kill ziehe 1. [Sensorwagen] |
| Olivkeil | Averon | Beim Ausspielen: ziehe 1. [Olivkeil] | Zuteilung | — |
| Lydon-Träger | Averon | Einheiten hier +1 DEF; | Sicherung | Bei Kill ziehe 1. [Lydon-Träger] |
| Haftwagen | Dargan | Einheiten hier +1 DEF; | Sicherung | Bei Kill ziehe 1. |
| Kronland-Panzer | Eldran | Beim Ausspielen: ziehe 1. [Kronland-Panzer] | Zuteilung | — |
| Hangpanzer | Lyr | Beim Ausspielen: ziehe 1. [Hangpanzer] | Zuteilung | — |
| Wohnblock-Riegel | Caldris | Beim Ausspielen: ziehe 1. [Wohnblock-Riegel] | Zuteilung | — |
| Grenzplatte | Ossaria | +2 DEF, wenn in diesem Zug eigene Einheit zerstört. | Zähigkeit | — |

## Umsetzungsdetails und Grenzen

- **Neuberechnung:** Sicherung, Zähigkeit und die DEF aus Überlast werden nach jeder Aktion neu berechnet. Fällt ein Bonus weg, sinkt die DEF höchstens auf 1; der Wegfall allein zerstört keine Einheit.
- **Hinterhalt/Platztausch:** Diese Wörter stehen nur auf Einheiten, die verdeckt werden können (Absetzen/Verdecken nach dem Angriff). Mit Eingraben werden neue Einheiten offen gelegt, deshalb wären die Wörter sonst wirkungslos.
- **Platztausch:** Die Wahl erscheint, sobald der Besitzer am Zug ist und keine andere Auswahl offen ist. Die Auswahl zeigt nur Felder, keine Namen.
- **Abschirmung:** Wird automatisch genutzt, wenn die abschirmende Einheit offen liegt und den umgeleiteten Schaden überlebt.
- **Stellungswechsel:** Bedienung über die Detailansicht der eigenen Einheit, Aktion `KW_MOVE`. Der Bot nutzt das Versetzen nicht.
- **Bestehende Engine-Eigenheiten wurden nicht geändert:** die doppelt gezählte Front-DEF, Niederhalten, die Rabatt-Typen und Soforteinsätze zu 0 AP.
- **Balance ist ungetestet.** Der Bot-Smoke-Test prüft nur, dass nichts abstürzt.
- **Artwork:** Auf den alten Kartenbildern (Hand und Großbild) ist der Text eingedruckt; dort steht das Wort nicht im Bild. Es erscheint in der Detailansicht und auf dem Tisch als Leiste.
