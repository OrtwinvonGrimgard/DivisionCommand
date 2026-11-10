# Kartenprüfung (t212)

Alle 1746 Karten-IDs wurden gegen die Engine geprüft. Grundsatz: **Kartentext = Implementierung.** Wo ein Text Dinge versprach, die die Engine nicht umsetzte, wurde die Fähigkeit in die allgemeine Mechanik `CM` (Werte mit Bedingung, Kampfboni gegen Zielarten, Auren, Auslöser, Rabatte, Heilung zu Zugbeginn …) übersetzt und der Kartentext aus dieser Implementierung neu erzeugt. Nichts ist stillschweigend verloren: der alte Text steht unten je ID und vollständig in `scripts/cards-review/review.json`. Die Bezeichnung „teilweise übersetzt“ meinte diese Regelangleichung mit Kürzung, keine Sprachübersetzung. Das vollständige Verzeichnis der 147 entfallenen Teilsätze steht lesbar in [`docs/regeln/KARTEN_KUERZUNGEN.md`](../regeln/KARTEN_KUERZUNGEN.md). Reparaturen t244 (drei Ausrüstungen mit Parser-Nullwerten, Verbindungssiegel ohne heimlichen ATK-Bonus) sind dort vermerkt; die übrigen Kürzungen bleiben bewusst.

## Zahlen

- geprüft: **1746** IDs
- Text geändert: **899**
- Mechanik geändert (Effekte/Werte/Ziel/Schlüsselwörter): **802**
- Fähigkeitstext ohne Implementierung vorher: **607** (davon 578 in `set_nations`) → jetzt **0** (Test `tests/test_card_review.js`)
- Balance-/Regelhinweise: **24** IDs

| Modus | Anzahl | Bedeutung |
|---|---|---|
| generiert-geprüft | 650 | generierter Nationenpool/Taktikentwurf, geprüft |
| voll | 257 | Text vollständig in allgemeine Mechanik übersetzt |
| aus-code | 244 | Text aus implementiertem Code neu erzeugt |
| ersetzt | 220 | nicht abbildbar – durch gleichwertige allgemeine Mechanik ersetzt |
| unverändert | 114 | geprüft, unverändert |
| teilweise | 109 | Regelangleichung mit Kürzung, Rest entfallen (protokolliert) |
| spezifisch | 78 | eigene Spezialmechanik, Text geprüft/Zielseite festgelegt |
| teilweise+ersetzt | 34 | Regelangleichung mit Kürzung, Rest durch allgemeine Mechanik ersetzt |
| abkürzung | 20 | alte Abkürzung V/A → DEF/ATK |
| manuell | 10 | Unterstützung manuell korrigiert |
| aus-code+DRAW | 10 | Text aus Code, versprochenes Ziehen ergänzt |

## Engine-Korrekturen

- **CM-Vokabular** (allgemein): `stat`, `cost`, `vs`, `enter`, `kill`, `death`, `negate`, `first`, `aura`, `trigger`, `turnheal`, `turn`, `discount`, `hitdebuff` mit Bedingungen (gespielt in diesem Zug, Unterstützung, benachbart, allein, beschädigt, unbewegt, beobachtet …).
- Ausrüstung mit CM-Effekten wirkt für ihren Träger.
- Soforteinsätze: strukturierte Zielwahl `target {side,count,upto,needs}` hat Vorrang vor der Textheuristik; Textänderungen ändern das Verhalten nicht mehr.
- Mehrfachziel-Soforteinsätze lösten zielfreie Effekte (Ziehen, Aufdecken, Rabatt) **je Ziel** aus → jetzt einmal.
- `COST_NEXT` für Ausrüstung/Soforteinsatz gab zusätzlich einen Pauschalrabatt auf die nächste Nicht-Sofort-Karte → entfernt.
- `OUT_OF_COMBAT` auf gegnerische Einheiten verfiel zu Beginn ihres Zuges (wirkungslos) → gilt jetzt in ihrem nächsten Zug.
- `EQUIP_HEAL_ONCE` mit `perTurn` wurde nie zurückgesetzt → einmal pro Zug.
- Alpha: Freiwilligenzug, Zweite Welle, Stoßkolonne, Nachrücker, Feldprediger implementiert; Unterstützungsfähigkeiten (Feuerauftrag, Drohnenschlag, Finte, Lazarett, Nachangriff, Aufklärung, Nachschub, Satellit) startbar; Lazarett behält den Patienten; Kommunikationszentrale macht eine Einheit erneut angriffsbereit.
- Sammelpunkt / Glaubensbanner: tote Codes durch implementierte ersetzt.

## Offene Systemhinweise

- (keine; Soforteinsätze kosten seit t231 den gedruckten AP-Wert, Rabatte greifen.)

## Geänderte Karten (vorher → nachher)

### Sicherer Nachschub (`dc_dok_sicherer_nachschub`, Doktrin) – abkürzung
- vorher: Unterstützung −1 AP, mindestens 1. 1×/Zug gepanzerte Einheit +1 V. Überschuss (2 AP): Fähigkeit einer Unterstützung ein zweites Mal.
- nachher: Unterstützung −1 AP, mindestens 1. 1×/Zug gepanzerte Einheit +1 DEF. Überschuss (2 AP): Fähigkeit einer Unterstützung ein zweites Mal.

### Tiefenverteidigung (`dc_dok_tiefenverteidigung`, Doktrin) – abkürzung
- vorher: Infanterie und Artillerie an der Front +1 V. Je zerstörter gegnerischer Fronteinheit +1 AP im nächsten eigenen Zug. Rohrartillerie kann gegnerischen Support angreifen, wenn eigene Aufklärung an der Front steht.
- nachher: Infanterie und Artillerie an der Front +1 DEF. Je zerstörter gegnerischer Fronteinheit +1 AP im nächsten eigenen Zug. Rohrartillerie kann gegnerischen Support angreifen, wenn eigene Aufklärung an der Front steht.

### Panzerabwehrtrupp (`dc_eh_pak`, Einheit) – abkürzung
- vorher: Panzerfaust: +5 A und +5 V gegen Gepanzerte.
- nachher: Panzerfaust: +5 ATK und +5 DEF gegen Gepanzerte. · Wörter: Stellungswechsel

### Werkschutz (`dc_b_werkschutz_22`, Einheit) – voll
- vorher: +1 DEF, solange eigene Panzer- oder Artillerieeinheit im Spiel.
- nachher: +1 DEF, solange ein eigener Panzer oder eine eigene Artillerie steht. · Wörter: Gefechtsbereit

### Depotwache (`dc_b_depotwache_23`, Einheit) – voll
- vorher: Wenn du diesen Zug Ausrüstung gespielt hast: +1 DEF.
- nachher: +1 DEF, wenn du in diesem Zug Ausrüstung gespielt hast. · Wörter: Zuteilung

### Schichttrupp (`dc_b_schichttrupp_24`, Einheit) – voll
- vorher: +1 ATK, wenn du diesen Zug schon eine Einheit gespielt hast.
- nachher: +1 ATK, wenn du in diesem Zug schon eine Einheit gespielt hast. · Wörter: Erbitterung

### Lieferkordon (`dc_b_lieferkordon_25`, Einheit) – voll
- vorher: Benachbarte eigene Einheiten +1 DEF, wenn du Soforteinsatz diesen Zug spieltest.
- nachher: Benachbarte eigene Einheiten +1 DEF, wenn du in diesem Zug einen Soforteinsatz gespielt hast.

### Kontingentlinie (`dc_b_kontingentlinie_26`, Einheit) – voll
- vorher: Kostet 1 weniger, wenn du diesen Zug Artillerie gespielt hast.
- nachher: Kostet 1 AP weniger (mind. 1), wenn du in diesem Zug Artillerie gespielt hast.

### Bilanzsoldaten (`dc_b_bilanzsoldaten_27`, Einheit) – voll
- vorher: Wenn diese Einheit stirbt: ziehe 1, falls Ausrüstung im Spiel.
- nachher: Wird sie zerstört: ziehe 1 Karte, solange eine eigene Einheit Ausrüstung trägt. · Wörter: Erbitterung

### Pflichtzug (`dc_b_pflichtzug_1`, Einheit) – voll
- vorher: +1 DEF, solange du in diesem Zug eine Infanterie gespielt hast.
- nachher: +1 DEF, wenn du in diesem Zug Infanterie gespielt hast.

### Erste Welle (`dc_b_erste_welle_2`, Einheit) – ersetzt
- vorher: —
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Staffelangriff

### Nachrücker (`dc_b_nachruecker_4`, Einheit) – ersetzt
- vorher: Wenn eine eigene Infanterie zerstört wird: diese Einheit darf sofort angreifen.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Gefechtsbereit
- entfallen/ersetzt: Wenn eine eigene Infanterie zerstört wird: diese Einheit darf sofort angreifen.

### Zweite Welle (`dc_b_zweite_welle_5`, Einheit) – voll
- vorher: +1 ATK und +1 DEF, wenn in diesem Zug schon eine eigene Infanterie gespielt wurde.
- nachher: +1 ATK und +1 DEF, wenn du in diesem Zug Infanterie gespielt hast. · Wörter: Erbitterung

### Stoßkolonne (`dc_b_stosskolonne_6`, Einheit) – voll
- vorher: +2 ATK gegen ein Ziel, das in diesem Zug noch nicht angegriffen wurde.
- nachher: +2 ATK gegen Ziele, die in diesem Zug noch nicht angegriffen wurden. · Wörter: Gefechtsbereit

### Heilige Front (`dc_b_heilige_front_8`, Einheit) – voll
- vorher: Eigene Infanterie im Abschnitt hat +1 ATK.
- nachher: Andere eigene Infanterie in ihrem Abschnitt: +1 ATK. · Wörter: Überlast

### Schwurzug (`dc_b_schwurzug_601`, Einheit) – ersetzt
- vorher: +1 DEF, solange du in diesem Zug eine Einheit ersetzt hast. Einmal: ignoriere den ersten Schaden (Schwur hält).
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Staffelangriff
- entfallen/ersetzt: +1 DEF, solange du in diesem Zug eine Einheit ersetzt hast. | Einmal: ignoriere den ersten Schaden.

### Kronwache (`dc_b_kronwache_602`, Einheit) – voll
- vorher: +1 ATK, wenn sie den Abschnitt verteidigt, in dem du diesen Zug einen Erlass/Unterstützung gespielt hast.
- nachher: +1 ATK, wenn du in diesem Zug eine Unterstützung gespielt hast.

### Treuekompanie (`dc_b_treuekompanie_603`, Einheit) – voll
- vorher: +1 ATK und +1 DEF, solange mindestens eine andere eigene Einheit im Abschnitt steht (Treuekette).
- nachher: +1 ATK und +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht. · Wörter: Ablösung

### Ablösungskette (`dc_b_abloesungskette_604`, Einheit) – ersetzt
- vorher: Wenn zerstört: heile 1 DEF an einer eigenen Einheit und sie erhält „Ersetzt“ bis Zugende (+1 DEF).
- nachher: Wird sie zerstört: ziehe 1 Karte.
- entfallen/ersetzt: Wenn zerstört: heile 1 DEF an einer eigenen Einheit und sie erhält „Ersetzt“ bis Zugende.

### Regiment Erbe (`dc_b_regiment_erbe_605`, Einheit) – Regelangleichung mit Kürzung
- vorher: +2 DEF, solange der Gegner in diesem Abschnitt mehr Einheiten hat. Nach dem ersten erlittenen Schaden: +1 ATK.
- nachher: +2 DEF, solange der Gegner im Abschnitt mehr Einheiten hat. · Wörter: Erbitterung
- entfallen/ersetzt: Nach dem ersten erlittenen Schaden: +1 ATK.

### Schwerpunktlinie (`dc_b_schwerpunktlinie_606`, Einheit) – ersetzt
- vorher: +2 ATK im Zug, in dem du sie aus der Hand in die Front ersetzt hast. Danach: wirf 1 ab.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK.
- entfallen/ersetzt: +2 ATK im Zug, in dem du sie aus der Hand in die Front ersetzt hast. | Danach: wirf 1 ab.

### Stoßgruppe (`dc_b_stossgruppe_361`, Einheit) – ersetzt
- vorher: Wenn dadurch zerstört: ziehe 1 (System lernt).
- nachher: — · Wörter: Überlast, Zuteilung
- entfallen/ersetzt: Wenn dadurch zerstört: ziehe 1.

### Maßtrupp (`dc_b_masstrupp_362`, Einheit) – Regelangleichung mit Kürzung
- vorher: +1 ATK und +1 DEF, solange beschädigt. Einmal/Zug: erleide 1 Schaden → ignoriere den nächsten Schaden.
- nachher: +1 ATK und +1 DEF, solange sie beschädigt ist. · Wörter: Gefechtsbereit
- entfallen/ersetzt: Einmal/Zug: erleide 1 Schaden → ignoriere den nächsten Schaden.

### Schnittstelle (`dc_b_schnittstelle_363`, Einheit) – Regelangleichung mit Kürzung
- vorher: Kann verdeckt gespielt werden. Aufdecken: +1 ATK bis Zugende; erleide 1 Schaden.
- nachher: Ihr erster Angriff hat +1 ATK. · Wörter: Zuteilung
- entfallen/ersetzt: erleide 1 Schaden.

### Keilspitze (`dc_b_keilspitze_364`, Einheit) – Regelangleichung mit Kürzung
- vorher: Der erste Angriff nach dem Ausspielen hat +2 ATK; danach −1 DEF bis Zugende.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +2 ATK.
- entfallen/ersetzt: danach −1 DEF bis Zugende.

### Schwere Stoßgruppe (`dc_b_schwere_stossgruppe_367`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +2 ATK. Nach dem ersten Angriff: −1 DEF und ziehe 1 (Schmerzprotokoll).
- nachher: — · Wörter: Zuteilung
- Werte: 4/2 → 6/2
- entfallen/ersetzt: Nach dem ersten Angriff: −1 DEF und ziehe 1.

### Maßeinheit (`dc_b_masseinheit_368`, Einheit) – Regelangleichung mit Kürzung
- vorher: +1 ATK und +1 DEF, solange beschädigt. Heilen dieser Einheit kostet +1 AP.
- nachher: +1 ATK und +1 DEF, solange sie beschädigt ist. · Wörter: Überlast
- entfallen/ersetzt: Heilen dieser Einheit kostet +1 AP.

### Knotenwache (`dc_b_knotenwache_781`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF; kostet 1 weniger bei Unterstützung (min. 1).
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. · Wörter: Gefechtsbereit
- Werte: 2/2 → 2/3
- entfallen/ersetzt: kostet 1 weniger bei Unterstützung (min. 1).

### Reservisten-Zug (`dc_b_reservisten_zug_782`, Einheit) – voll
- vorher: +1 ATK/+1 DEF, wenn Infanterie und Unterstützung angrenzen. [Reservisten-Zug]
- nachher: +1 ATK und +1 DEF, solange eigene Infanterie benachbart ist und du eine offene Unterstützung hast.

### Nordfall-Posten (`dc_b_nordfall_posten_783`, Einheit) – voll
- vorher: +1 DEF, wenn du diesen Zug aufgedeckt hast.
- nachher: +1 DEF, wenn du in diesem Zug aufgedeckt hast. · Wörter: Gefechtsbereit

### Korridorläufer (`dc_b_korridorlaeufer_784`, Einheit) – voll
- vorher: +1 ATK, wenn Feind aufgeklärt ist.
- nachher: +1 ATK, solange eine gegnerische Einheit beobachtet ist. · Wörter: Gefechtsbereit

### Westhaven-Sicherung (`dc_b_westhaven_sicherung_785`, Einheit) – voll
- vorher: +1 DEF gegen den ersten Angriff/Zug. [Westhaven-Sicherung]
- nachher: Der erste Schaden, den sie in jedem Zug erleidet, sinkt um 1.

### Bodenlinie (`dc_b_bodenlinie_786`, Einheit) – voll
- vorher: +1 ATK/+1 DEF, wenn Aufklärung angrenzt.
- nachher: +1 ATK und +1 DEF, solange eine eigene Aufklärung an der Front steht.

### Frontwache (`dc_b_frontwache_841`, Einheit) – voll
- vorher: Kostet 1 weniger bei Infanterie im Abschnitt (min. 1).
- nachher: Kostet 1 AP weniger (mind. 1), solange eigene Infanterie an der Front steht. · Wörter: Erbitterung

### Spielkorps-Zug (`dc_b_spielkorps_zug_842`, Einheit) – voll
- vorher: +1 ATK, wenn eigene Infanterie angrenzt. [Spielkorps-Zug]
- nachher: +1 ATK, solange eigene Infanterie benachbart ist.

### Siegelposten (`dc_b_siegelposten_843`, Einheit) – ersetzt
- vorher: —
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Zuteilung

### Grenzspieler (`dc_b_grenzspieler_844`, Einheit) – voll
- vorher: Kostet 1 weniger bei Infanterie im Abschnitt (min. 1). [Grenzspieler]
- nachher: Kostet 1 AP weniger (mind. 1), solange eigene Infanterie an der Front steht. · Wörter: Sicherung

### Doppelrede-Linie (`dc_b_doppelrede_linie_845`, Einheit) – voll
- vorher: +1 ATK, wenn du diesen Zug Sofort spielst.
- nachher: +1 ATK, wenn du in diesem Zug einen Soforteinsatz gespielt hast. · Wörter: Zuteilung

### Stillheim-Wache (`dc_b_stillheim_wache_846`, Einheit) – voll
- vorher: +1 DEF, wenn Unterstützung im Abschnitt.
- nachher: +1 DEF, solange du eine offene Unterstützung hast. · Wörter: Ablösung

### Zeilenträger (`dc_b_zeilentraeger_901`, Einheit) – voll
- vorher: +1 ATK, wenn eigene Infanterie angrenzt.
- nachher: +1 ATK, solange eigene Infanterie benachbart ist.

### Hauswächter Brunn (`dc_b_hauswaechter_brunn_902`, Einheit) – voll
- vorher: +1 DEF gegen den ersten Angriff/Zug.
- nachher: Der erste Schaden, den sie in jedem Zug erleidet, sinkt um 1. · Wörter: Ablösung

### Vorleser Kalden (`dc_b_vorleser_kalden_903`, Einheit) – voll
- vorher: +1 ATK/+1 DEF, wenn Infanterie und Unterstützung angrenzen.
- nachher: +1 ATK und +1 DEF, solange eigene Infanterie benachbart ist und du eine offene Unterstützung hast. · Wörter: Heranführung

### Auenheim-Hof (`dc_b_auenheim_hof_904`, Einheit) – voll
- vorher: +1 DEF gegen den ersten Angriff/Zug. [Auenheim-Hof]
- nachher: Der erste Schaden, den sie in jedem Zug erleidet, sinkt um 1.

### Namenhof-Schütze (`dc_b_namenhof_schuetze_905`, Einheit) – voll
- vorher: +1 DEF, wenn Unterstützung im Abschnitt. [Namenhof-Schütze]
- nachher: +1 DEF, solange du eine offene Unterstützung hast. · Wörter: Nachsetzen

### Stillschuld-Zug (`dc_b_stillschuld_zug_906`, Einheit) – voll
- vorher: +1 ATK/+1 DEF, wenn Infanterie und Unterstützung angrenzen. [Stillschuld-Zug]
- nachher: +1 ATK und +1 DEF, solange eigene Infanterie benachbart ist und du eine offene Unterstützung hast.

### Kronenwache (`dc_b_kronenwache_721`, Einheit) – voll
- vorher: +1 DEF gegen den ersten Angriff/Zug. [Kronenwache]
- nachher: Der erste Schaden, den sie in jedem Zug erleidet, sinkt um 1. · Wörter: Abschirmung

### Parlamentsbote (`dc_b_parlamentsbote_722`, Einheit) – voll
- vorher: +1 ATK/+1 DEF, wenn Infanterie und Unterstützung angrenzen. [Parlamentsbote]
- nachher: +1 ATK und +1 DEF, solange eigene Infanterie benachbart ist und du eine offene Unterstützung hast.

### Auffangposten (`dc_b_auffangposten_723`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF; kostet 1 weniger bei Unterstützung (min. 1). [Auffangposten]
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. · Wörter: Sicherung
- Werte: 2/3 → 2/4
- entfallen/ersetzt: kostet 1 weniger bei Unterstützung (min. 1).

### Markenläufer (`dc_b_markenlaeufer_724`, Einheit) – voll
- vorher: +1 ATK, wenn sie diesen Zug nicht bewegt wurde.
- nachher: +1 ATK, wenn sie seit deinem letzten Zug nicht versetzt wurde. · Wörter: Sicherung

### Zeughauszug (`dc_b_zeughauszug_725`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF; kostet 1 weniger bei Unterstützung (min. 1). [Zeughauszug]
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.
- Werte: 2/4 → 2/5
- entfallen/ersetzt: kostet 1 weniger bei Unterstützung (min. 1).

### Doppelhaus-Linie (`dc_b_doppelhaus_linie_726`, Einheit) – voll
- vorher: +1 ATK/+1 DEF, wenn Infanterie und Unterstützung angrenzen. [Doppelhaus-Linie]
- nachher: +1 ATK und +1 DEF, solange eigene Infanterie benachbart ist und du eine offene Unterstützung hast.

### Kaikompanie (`dc_b_kaikompanie_43`, Einheit) – ersetzt
- vorher: +1 DEF, solange du diesen Zug eine Einheit geschoben hast.
- nachher: Der erste Schaden je Zug sinkt um 1.
- entfallen/ersetzt: +1 DEF, solange du diesen Zug eine Einheit geschoben hast.

### Staubrain-Zug (`dc_b_staubrain_zug_44`, Einheit) – voll
- vorher: +1 DEF, wenn im Abschnitt keine Unterstützung liegt.
- nachher: +1 DEF, solange du keine Unterstützung hast.

### Ablösungstrupp (`dc_b_abloesungstrupp_45`, Einheit) – ersetzt
- vorher: Beim Ausspielen: schiebe eine eigene Einheit um 1 Slot.
- nachher: — · Wörter: Heranführung, Stellungswechsel
- entfallen/ersetzt: Beim Ausspielen: schiebe eine eigene Einheit um 1 Slot.

### Wartebach-Wache (`dc_b_wartebach_wache_46`, Einheit) – ersetzt
- vorher: +1 DEF nach Schieben diesen Zug.
- nachher: — · Wörter: Heranführung, Stellungswechsel
- entfallen/ersetzt: +1 DEF nach Schieben diesen Zug.

### Südmark-Fuß (`dc_b_suedmark_fuss_47`, Einheit) – ersetzt
- vorher: Kostet 1 weniger, wenn du diesen Zug schon geschoben hast.
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. · Wörter: Erbitterung
- entfallen/ersetzt: Kostet 1 weniger, wenn du diesen Zug schon geschoben hast.

### Paspelhell (`dc_b_paspelhell_48`, Einheit) – voll
- vorher: Benachbarte eigene Einheiten +1 DEF, wenn du Soforteinsatz spieltest.
- nachher: Benachbarte eigene Einheiten +1 DEF, wenn du in diesem Zug einen Soforteinsatz gespielt hast.

### Kolonnenwache (`dc_b_kolonnenwache_661`, Einheit) – voll
- vorher: +1 DEF, wenn du in diesem Abschnitt mindestens zwei Einheiten hast.
- nachher: +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht.

### Flankenläufer (`dc_b_flankenlaeufer_662`, Einheit) – ersetzt
- vorher: —
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Stellungswechsel

### Straßenmeister (`dc_b_strassenmeister_663`, Einheit) – ersetzt
- vorher: +1 DEF an Straßen-/Lager-Abschnitten.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Heranführung
- entfallen/ersetzt: +1 DEF an Straßen-/Lager-Abschnitten.

### Karawanenzug (`dc_b_karawanenzug_664`, Einheit) – voll
- vorher: +1 DEF gegen den ersten Angriff/Zug. [Karawanenzug]
- nachher: Der erste Schaden, den sie in jedem Zug erleidet, sinkt um 1. · Wörter: Erbitterung

### Hauptkolonne (`dc_b_hauptkolonne_665`, Einheit) – voll
- vorher: +1 ATK/+1 DEF, wenn Infanterie und Unterstützung im Abschnitt.
- nachher: +1 ATK und +1 DEF, solange eigene Infanterie benachbart ist und du eine offene Unterstützung hast. · Wörter: Sicherung

### Straßenbataillon (`dc_b_strassenbataillon_666`, Einheit) – ersetzt
- vorher: +1 DEF bis Zugende.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Zuteilung
- entfallen/ersetzt: +1 DEF bis Zugende.

### Normzug (`dc_b_normzug_541`, Einheit) – voll
- vorher: +1 DEF, wenn eine feindliche Einheit im Abschnitt beobachtet ist.
- nachher: +1 DEF, solange eine gegnerische Einheit beobachtet ist.

### Reservekompanie (`dc_b_reservekompanie_542`, Einheit) – voll
- vorher: Kostet 1 weniger, wenn du diesen Zug eine Sofortkarte gespielt hast (min. 1).
- nachher: Kostet 1 AP weniger (mind. 1), wenn du in diesem Zug einen Soforteinsatz gespielt hast.

### Bahnsteigwache (`dc_b_bahnsteigwache_543`, Einheit) – ersetzt
- vorher: +1 DEF an Bahn-/Depot-Abschnitten.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Sicherung
- entfallen/ersetzt: +1 DEF an Bahn-/Depot-Abschnitten.

### Wachzug (`dc_b_wachzug_544`, Einheit) – voll
- vorher: +1 ATK gegen beobachtete Einheiten.
- nachher: +1 ATK gegen beobachtete Ziele.

### Feldwacht-Zug (`dc_b_feldwacht_zug_545`, Einheit) – voll
- vorher: +1 ATK/+1 DEF, wenn Infanterie und Artillerie im Abschnitt.
- nachher: +1 ATK und +1 DEF, solange eigene Infanterie benachbart ist und eigene Artillerie steht. · Wörter: Ablösung

### Grenzstein-Posten (`dc_b_grenzstein_posten_546`, Einheit) – Regelangleichung mit Kürzung
- vorher: Beim Ausspielen: decke 1 auf; +1 DEF bis Zugende.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Erbitterung
- entfallen/ersetzt: +1 DEF bis Zugende.

### Kaiwache (`dc_b_kaiwache_481`, Einheit) – voll
- vorher: +1 ATK, wenn eigene Infanterie angrenzt. [Kaiwache]
- nachher: +1 ATK, solange eigene Infanterie benachbart ist. · Wörter: Zähigkeit

### Entsatztrupp (`dc_b_entsatztrupp_482`, Einheit) – ersetzt
- vorher: +1 ATK, wenn der Abschnitt im letzten Zug angegriffen wurde.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Ablösung
- entfallen/ersetzt: +1 ATK, wenn der Abschnitt im letzten Zug angegriffen wurde.

### Entsatzposten (`dc_b_entsatzposten_483`, Einheit) – ersetzt
- vorher: +1 DEF, wenn der Abschnitt im letzten Zug angegriffen wurde.
- nachher: Der erste Schaden je Zug sinkt um 1.
- entfallen/ersetzt: +1 DEF, wenn der Abschnitt im letzten Zug angegriffen wurde.

### Hafenposten (`dc_b_hafenposten_484`, Einheit) – voll
- vorher: Kostet 1 weniger, wenn im Abschnitt eine Unterstützung liegt.
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.

### Kaihof-Zug (`dc_b_kaihof_zug_485`, Einheit) – voll
- vorher: +1 ATK/+1 DEF, wenn Unterstützung im Abschnitt.
- nachher: +1 ATK und +1 DEF, solange du eine offene Unterstützung hast.

### Wegtruppe (`dc_b_wegtruppe_486`, Einheit) – ersetzt
- vorher: +1 DEF an Straße/Bahn-Abschnitten; +1 ATK nach Entsatz-Zug.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Zuteilung
- entfallen/ersetzt: +1 DEF an Straße/Bahn-Abschnitten | +1 ATK nach Entsatz-Zug.

### Talwache (`dc_b_talwache_64`, Einheit) – voll
- vorher: +1 DEF, wenn sie allein im Abschnitt steht.
- nachher: +1 DEF, solange sie allein im Abschnitt steht.

### Passmiliz (`dc_b_passmiliz_65`, Einheit) – voll
- vorher: +1 ATK gegen eine Einheit, die in diesem Zug einrückt.
- nachher: +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.

### Weideposten (`dc_b_weideposten_66`, Einheit) – voll
- vorher: +1 DEF, wenn im Abschnitt eine zweite eigene Einheit steht.
- nachher: +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht. · Wörter: Ablösung

### Stilltal-Fuß (`dc_b_stilltal_fuss_67`, Einheit) – ersetzt
- vorher: +1 DEF, solange du diesen Zug keine Soforteinsatz-Karte spieltest.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Zähigkeit
- entfallen/ersetzt: +1 DEF, solange du diesen Zug keine Soforteinsatz-Karte spieltest.

### Hochweide-Zug (`dc_b_hochweide_zug_68`, Einheit) – ersetzt
- vorher: Kostet 1 weniger, wenn allein im Abschnitt.
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. · Wörter: Abschirmung
- entfallen/ersetzt: Kostet 1 weniger, wenn allein im Abschnitt.

### Schieferjacke (`dc_b_schieferjacke_69`, Einheit) – voll
- vorher: Benachbarte eigene Einheiten +1 DEF, wenn allein stehen.
- nachher: Benachbarte eigene Einheiten +1 DEF, solange diese Einheit allein im Abschnitt steht. · Wörter: Zähigkeit

### Ruheposten (`dc_b_ruheposten_301`, Einheit) – voll
- vorher: +1 ATK, wenn sie im letzten Zug nicht angegriffen hat.
- nachher: +1 ATK, wenn sie in deinem letzten Zug nicht angegriffen hat. · Wörter: Sicherung

### Wachablösung (`dc_b_wachabloesung_302`, Einheit) – voll
- vorher: +1 DEF, wenn sie diesen Zug nicht angreift.
- nachher: +1 DEF, wenn sie in deinem letzten Zug nicht angegriffen hat. · Wörter: Zähigkeit

### Listenfuß (`dc_b_listenfuss_303`, Einheit) – voll
- vorher: +1 DEF, wenn im Abschnitt eine Unterstützung liegt.
- nachher: +1 DEF, solange du eine offene Unterstützung hast.

### Seren-Zug (`dc_b_seren_zug_304`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF; heile 1, wenn sie im letzten Zug nicht angriff.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.
- Werte: 2/4 → 2/5
- entfallen/ersetzt: heile 1, wenn sie im letzten Zug nicht angriff.

### Meldezug (`dc_b_meldezug_305`, Einheit) – ersetzt
- vorher: Beim Ausspielen: ziehe 1, wenn du diesen Zug heilst.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit. · Wörter: Zähigkeit
- entfallen/ersetzt: Beim Ausspielen: ziehe 1, wenn du diesen Zug heilst.

### Schildreihe (`dc_b_schildreihe_306`, Einheit) – voll
- vorher: +2 DEF, wenn sie diesen Zug nicht angreift.
- nachher: +2 DEF, wenn sie in deinem letzten Zug nicht angegriffen hat. · Wörter: Sicherung

### Namenszug (`dc_b_namenszug_85`, Einheit) – voll
- vorher: +1 DEF, wenn sie eine Ausrüstung trägt.
- nachher: +1 DEF, solange sie Ausrüstung trägt. · Wörter: Abschirmung

### Totenwache (`dc_b_totenwache_86`, Einheit) – voll
- vorher: +1 ATK, wenn im Abschnitt eine Einheit mit Ausrüstung steht.
- nachher: +1 ATK, solange sie Ausrüstung trägt.

### Trauerzug (`dc_b_trauerzug_87`, Einheit) – ersetzt
- vorher: —
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Zähigkeit

### Plattenzug (`dc_b_plattenzug_88`, Einheit) – voll
- vorher: +1 ATK, wenn eigene Infanterie angrenzt. [Plattenzug]
- nachher: +1 ATK, solange eigene Infanterie benachbart ist. · Wörter: Abschirmung

### Grenzhof-Fuß (`dc_b_grenzhof_fuss_89`, Einheit) – ersetzt
- vorher: —
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Erbitterung

### Steinbrunn-Lehrling (`dc_b_steinbrunn_lehrling_90`, Einheit) – ersetzt
- vorher: Ausrüstung an dieser Einheit kostet 1 weniger (min. 1).
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. · Wörter: Abschirmung
- entfallen/ersetzt: Ausrüstung an dieser Einheit kostet 1 weniger (min. 1).

### Probenzug (`dc_b_probenzug_421`, Einheit) – voll
- vorher: +1 ATK gegen aufgeklärte Ziele.
- nachher: +1 ATK gegen beobachtete Ziele. · Wörter: Nachsetzen

### Messau-Fuß (`dc_b_messau_fuss_422`, Einheit) – voll
- vorher: Beim Ausspielen: decke eine Einheit auf.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.

### Unterschriftswache (`dc_b_unterschriftswache_423`, Einheit) – voll
- vorher: +1 DEF, wenn ein Feind im Abschnitt aufgeklärt ist.
- nachher: +1 DEF, solange eine gegnerische Einheit beobachtet ist. · Wörter: Heranführung

### Abweich-Zug (`dc_b_abweich_zug_424`, Einheit) – ersetzt
- vorher: +1 ATK/+1 DEF gegen aufgeklärte; ziehe 1 wenn Modell scheitert (Feind überlebt Angriff).
- nachher: +1 ATK gegen beobachtete Ziele.
- entfallen/ersetzt: +1 ATK/+1 DEF gegen aufgeklärte | ziehe 1 wenn Modell scheitert.

### Fachlauf (`dc_b_fachlauf_425`, Einheit) – voll
- vorher: Kostet 1 weniger, wenn Aufklärung im Spiel.
- nachher: Kostet 1 AP weniger (mind. 1), solange eine eigene Aufklärung an der Front steht. · Wörter: Nachsetzen

### Linieninfanterie (`dc_b_linieninfanterie_426`, Einheit) – ersetzt
- vorher: +2 DEF nach Aufdecken eines Feindes diesen Zug.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: +2 DEF nach Aufdecken eines Feindes diesen Zug.

### Panzertrupp Hammer (`dc_eh_hammer`, Einheit) – abkürzung
- vorher: Wuchtgeschoss: ignoriert 2 V beim Angriff auf Gepanzerte.
- nachher: Wuchtgeschoss: ignoriert 2 DEF beim Angriff auf Gepanzerte. · Wörter: Stellungswechsel
- Hinweis: Werte 13 weit über Median 7 bei 4 AP

### Schützenpanzer (`dc_eh_spz`, Einheit) – abkürzung
- vorher: Benachbarte Infanterie +1 A / +1 V.
- nachher: Benachbarte Infanterie +1 ATK / +1 DEF.

### Serienpanzer (`dc_b_serienpanzer_28`, Einheit) – ersetzt
- vorher: Wenn zerstört: nächste Ausrüstung kostet 1 weniger.
- nachher: Wird sie zerstört: ziehe 1 Karte. · Wörter: Durchschlag
- entfallen/ersetzt: Wenn zerstört: nächste Ausrüstung kostet 1 weniger.

### Auftragskette (`dc_b_auftragskette_29`, Einheit) – voll
- vorher: +1 ATK gegen Einheiten, die diesen Zug Schaden genommen haben.
- nachher: +1 ATK gegen Ziele, die in diesem Zug Schaden erlitten haben. · Wörter: Durchschlag

### Werkskeil (`dc_b_werkskeil_30`, Einheit) – ersetzt
- vorher: Beim Ausspielen: eigene Artillerie +1 ATK diesen Zug.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Durchschlag
- entfallen/ersetzt: Beim Ausspielen: eigene Artillerie +1 ATK diesen Zug.

### Ersatzwalze (`dc_b_ersatzwalze_31`, Einheit) – voll
- vorher: +1 DEF, solange du diesen Zug Soforteinsatz gespielt hast.
- nachher: +1 DEF, wenn du in diesem Zug einen Soforteinsatz gespielt hast.

### Quartalspanzer (`dc_b_quartalspanzer_32`, Einheit) – voll
- vorher: Kostet 1 weniger, wenn du bereits 2+ Einheiten verloren hast.
- nachher: Kostet 1 AP weniger (mind. 1), wenn schon 2 eigene Einheiten zerstört wurden. · Wörter: Gefechtsbereit

### Schwere Lieferung (`dc_b_schwere_lieferung_33`, Einheit) – voll
- vorher: Beim Ausspielen: heile 1 an eigener Artillerie oder Panzer.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit. · Wörter: Abschirmung

### Industriewalze (`dc_b_industriewalze_34`, Einheit) – ersetzt
- vorher: Kann nicht angreifen, wenn du diesen Zug keine Artillerie gespielt hast.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Durchschlag
- entfallen/ersetzt: Kann nicht angreifen, wenn du diesen Zug keine Artillerie gespielt hast.

### Volltreffer (`dc_b_volltreffer_35`, Einheit) – ersetzt
- vorher: Beim Angriff: +2 Schaden. Wenn Ziel stirbt: ziehe 1.
- nachher: — · Wörter: Zähigkeit, Zuteilung
- entfallen/ersetzt: Beim Angriff: +2 Schaden. | Wenn Ziel stirbt: ziehe 1.

### Pflichtpanzer (`dc_b_pflichtpanzer_3`, Einheit) – Regelangleichung mit Kürzung
- vorher: +1 DEF, solange du in diesem Zug eine Infanterie gespielt hast. Einmal/Zug: eine eigene Infanterie im Abschnitt +1 ATK.
- nachher: +1 DEF, wenn du in diesem Zug Infanterie gespielt hast.
- entfallen/ersetzt: Einmal/Zug: eine eigene Infanterie im Abschnitt +1 ATK.

### Wellenpanzer (`dc_b_wellenpanzer_7`, Einheit) – voll
- vorher: Beim Ausspielen: heile eine eigene Infanterie um 1.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit. · Wörter: Staffelangriff

### Werkspanzer (`dc_b_werkspanzer_9`, Einheit) – voll
- vorher: +1 DEF, solange eine eigene Infanterie im Abschnitt liegt.
- nachher: +1 DEF, solange eigene Infanterie benachbart ist.

### Balkenwagen (`dc_b_balkenwagen_10`, Einheit) – voll
- vorher: Kostet 1 weniger, wenn du in diesem Zug Infanterie gespielt hast (mind. 1).
- nachher: Kostet 1 AP weniger (mind. 1), wenn du in diesem Zug Infanterie gespielt hast. · Wörter: Nachsetzen

### Genossenschaftskette (`dc_b_genossenschaftskette_11`, Einheit) – ersetzt
- vorher: Beim Angriff: eine eigene Infanterie im Abschnitt erhält +1 ATK bis Zugende.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK.
- entfallen/ersetzt: Beim Angriff: eine eigene Infanterie im Abschnitt erhält +1 ATK bis Zugende.

### Pflichtbrecher (`dc_b_pflichtbrecher_12`, Einheit) – ersetzt
- vorher: —
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Erbitterung

### Wellenkeil (`dc_b_wellenkeil_13`, Einheit) – ersetzt
- vorher: Im Zug mit der dritten gespielten Einheit: dieser Angriff kostet 0.
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. · Wörter: Gefechtsbereit
- entfallen/ersetzt: Im Zug mit der dritten gespielten Einheit: dieser Angriff kostet 0.

### Rituspanzer (`dc_b_rituspanzer_14`, Einheit) – ersetzt
- vorher: Wird zerstört: eigene Infanterie im Abschnitt hat +1 ATK bis zum Ende des nächsten Zuges.
- nachher: Wird sie zerstört: ziehe 1 Karte. · Wörter: Gefechtsbereit, Zähigkeit
- entfallen/ersetzt: Wird zerstört: eigene Infanterie im Abschnitt hat +1 ATK bis zum Ende des nächsten Zuges.

### Kronpanzer Narbstadt (`dc_b_kronpanzer_narbstadt_607`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF. Kann verdeckt gespielt werden. Aufdecken: ignoriere den ersten Schaden diesen Zug (die Krone irrt nicht).
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Ablösung
- Werte: 3/3 → 3/4
- entfallen/ersetzt: Aufdecken: ignoriere den ersten Schaden diesen Zug.

### Erlasswagen (`dc_b_erlasswagen_608`, Einheit) – ersetzt
- vorher: Gegnerische Soforteinsätze gegen diesen Abschnitt kosten den Gegner +1 AP. Einmal/Zug: wenn du eine Einheit ersetzt hast → +1 ATK.
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. · Wörter: Abschirmung
- entfallen/ersetzt: Gegnerische Soforteinsätze gegen diesen Abschnitt kosten den Gegner +1 AP. | Einmal/Zug: wenn du eine Einheit ersetzt hast → +1 ATK.

### Kronpanzer (`dc_b_kronpanzer_609`, Einheit) – ersetzt
- vorher: +1 ATK und +1 DEF, solange du in diesem Zug eine Einheit ersetzt hast.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK.
- entfallen/ersetzt: +1 ATK und +1 DEF, solange du in diesem Zug eine Einheit ersetzt hast.

### Erbe-Kette (`dc_b_erbe_kette_610`, Einheit) – voll
- vorher: +1 DEF. Wenn sie beschädigt ist: +1 ATK.
- nachher: +1 ATK, solange sie beschädigt ist.
- Werte: 2/3 → 2/4

### Schwerpunktkeil (`dc_b_schwerpunktkeil_611`, Einheit) – ersetzt
- vorher: +2 ATK, wenn du in diesem Abschnitt mindestens zwei andere Einheiten hast.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Ablösung
- entfallen/ersetzt: +2 ATK, wenn du in diesem Abschnitt mindestens zwei andere Einheiten hast.

### Ablösungspanzer (`dc_b_abloesungspanzer_612`, Einheit) – ersetzt
- vorher: Wenn diese Einheit zerstört wird: spiele eine Einheit mit Kosten ≤2 aus deiner Hand ohne AP-Kosten in denselben Abschnitt (falls möglich).
- nachher: Wird sie zerstört: ziehe 1 Karte.
- entfallen/ersetzt: Wenn diese Einheit zerstört wird: spiele eine Einheit mit Kosten ≤2 aus deiner Hand ohne AP-Kosten in denselben Abschnitt.

### Thronbruch (`dc_b_thronbruch_613`, Einheit) – Regelangleichung mit Kürzung
- vorher: +3 ATK im ersten Angriff nach dem Ausspielen. Danach -1 DEF bis Zugende.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +3 ATK. · Wörter: Durchschlag, Nachsetzen
- entfallen/ersetzt: Danach -1 DEF bis Zugende.

### Werkrott-Kolonne (`dc_b_werkrott_kolonne_614`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +2 DEF. Einmal pro Zug: eine angrenzende eigene Infanterie hat +1 ATK.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK.
- Werte: 3/5 → 3/7
- entfallen/ersetzt: Einmal pro Zug: eine angrenzende eigene Infanterie hat +1 ATK.
- Hinweis: Werte 10 weit über Median 7 bei 4 AP

### Filterpanzer (`dc_b_filterpanzer_365`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF. Ignoriert den ersten Schaden durch Soforteinsatz. Einmal/Zug: erleide 1 Schaden → +2 ATK bis Zugende.
- nachher: Der erste Schaden je Zug sinkt um 1.
- Werte: 3/3 → 3/4
- entfallen/ersetzt: Ignoriert den ersten Schaden durch Soforteinsatz. | Einmal/Zug: erleide 1 Schaden → +2 ATK bis Zugende.

### Ersatzkeil (`dc_b_ersatzkeil_366`, Einheit) – Regelangleichung mit Kürzung
- vorher: Wenn zerstört: heile 1 DEF an einer anderen eigenen Einheit und lege die oberste Friedhofskarte unter dein Deck. +1 ATK solange beschädigt.
- nachher: +1 ATK, solange sie beschädigt ist.
- entfallen/ersetzt: Wenn zerstört: heile 1 DEF an einer anderen eigenen Einheit und lege die oberste Friedhofskarte unter dein Deck.

### Nervenpanzer (`dc_b_nervenpanzer_369`, Einheit) – voll
- vorher: +1 ATK, solange beschädigt.
- nachher: +1 ATK, solange sie beschädigt ist.

### Knochenkette (`dc_b_knochenkette_370`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF. Angrenzende eigene Infanterie +1 ATK beim ersten Angriff.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK.
- Werte: 2/3 → 2/4
- entfallen/ersetzt: Angrenzende eigene Infanterie +1 ATK beim ersten Angriff.

### Stoßkeil (`dc_b_stosskeil_371`, Einheit) – ersetzt
- vorher: —
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Gefechtsbereit, Überlast

### Wartungskolonne (`dc_b_wartungskolonne_372`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF. Einmal pro Zug: heile 1 DEF an sich selbst, wenn beschädigt; dann erleidet eine eigene Infanterie im Abschnitt 1 Schaden.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.
- Werte: 4/4 → 4/5
- entfallen/ersetzt: Einmal pro Zug: heile 1 DEF an sich selbst, wenn beschädigt | dann erleidet eine eigene Infanterie im Abschnitt 1 Schaden.

### Leistungspanzer (`dc_b_leistungspanzer_373`, Einheit) – voll
- vorher: +2 ATK, solange beschädigt.
- nachher: +2 ATK, solange sie beschädigt ist. · Wörter: Ablösung

### Systemstoß (`dc_b_systemstoss_374`, Einheit) – Regelangleichung mit Kürzung
- vorher: +3 ATK im ersten Angriff. Danach -1 DEF bis Zugende.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +3 ATK. · Wörter: Gefechtsbereit, Zähigkeit
- entfallen/ersetzt: Danach -1 DEF bis Zugende.

### Sensorwagen (`dc_b_sensorwagen_787`, Einheit) – voll
- vorher: Bei Kill ziehe 1. [Sensorwagen]
- nachher: Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. · Wörter: Sicherung

### Verbindungskette (`dc_b_verbindungskette_788`, Einheit) – voll
- vorher: +1 ATK gegen aufgeklärte Feinde.
- nachher: +1 ATK gegen beobachtete Ziele.

### Olivkeil (`dc_b_olivkeil_789`, Einheit) – ersetzt
- vorher: —
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Zuteilung

### Kurzkrieg-Wagen (`dc_b_kurzkrieg_wagen_790`, Einheit) – voll
- vorher: +1 ATK, wenn du diesen Zug Sofort spielst. [Kurzkrieg-Wagen]
- nachher: +1 ATK, wenn du in diesem Zug einen Soforteinsatz gespielt hast. · Wörter: Gefechtsbereit

### Lydon-Träger (`dc_b_lydon_traeger_791`, Einheit) – voll
- vorher: Bei Kill ziehe 1. [Lydon-Träger]
- nachher: Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. · Wörter: Sicherung

### Rasterpanzer (`dc_b_rasterpanzer_792`, Einheit) – voll
- vorher: +1 ATK/+1 DEF, wenn Feind im Abschnitt aufgeklärt ist.
- nachher: +1 ATK und +1 DEF, solange eine gegnerische Einheit beobachtet ist.

### Frühstoß (`dc_b_fruehstoss_793`, Einheit) – Regelangleichung mit Kürzung
- vorher: Bei Kill: decke 1 auf ODER ziehe 1.
- nachher: Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: ODER ziehe 1.

### Aufklärungspanzer (`dc_b_aufklaerungspanzer_794`, Einheit) – Regelangleichung mit Kürzung
- vorher: +2 ATK gegen aufgeklärte Feinde; beim Ausspielen decke 2 auf. Einmal/Zug: eine eigene Aufklärung +1 DEF.
- nachher: +2 ATK gegen beobachtete Ziele. · Wörter: Gefechtsbereit
- entfallen/ersetzt: beim Ausspielen decke 2 auf. | Einmal/Zug: eine eigene Aufklärung +1 DEF.

### Aktenwagen (`dc_b_aktenwagen_847`, Einheit) – voll
- vorher: +1 DEF; einmal/Zug: negiere 1 Schaden. [Aktenwagen]
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Stellungswechsel
- Werte: 2/3 → 2/4

### Scheinkeil (`dc_b_scheinkeil_848`, Einheit) – voll
- vorher: +2 ATK gegen ein gewähltes Ziel; Träger +1 DEF. [Scheinkeil]
- nachher: Ihr erster Angriff nach dem Ausspielen hat +2 ATK.
- Werte: 3/3 → 3/4

### Olivsiegel-Wagen (`dc_b_olivsiegel_wagen_849`, Einheit) – voll
- vorher: +1 DEF; einmal/Zug: negiere 1 Schaden.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Stellungswechsel
- Werte: 3/3 → 3/4

### Lagepanzer (`dc_b_lagepanzer_850`, Einheit) – voll
- vorher: +1 ATK/+1 DEF, wenn du diesen Zug nicht bewegt hast.
- nachher: +1 ATK und +1 DEF, wenn sie seit deinem letzten Zug nicht versetzt wurde. · Wörter: Abschirmung

### Archive-Keil (`dc_b_archive_keil_851`, Einheit) – voll
- vorher: Kostet 1 weniger bei Infanterie im Abschnitt (min. 1). [Archive-Keil]
- nachher: Kostet 1 AP weniger (mind. 1), solange eigene Infanterie an der Front steht. · Wörter: Stellungswechsel

### Zwei-Versionen (`dc_b_zwei_versionen_852`, Einheit) – voll
- vorher: +1 DEF an Abschnitten mit eigener Unterstützung.
- nachher: +1 DEF, solange du eine offene Unterstützung hast.

### Abriegelwagen (`dc_b_abriegelwagen_853`, Einheit) – voll
- vorher: +1 ATK, wenn du diesen Zug Sofort spielst. [Abriegelwagen]
- nachher: +1 ATK, wenn du in diesem Zug einen Soforteinsatz gespielt hast.

### Scheinschwerpunkt-Keil (`dc_b_scheinschwerpunkt_keil_854`, Einheit) – ersetzt
- vorher: +2 DEF diesen Zug; nächsten Zug +2 ATK. Einmal: wenn du Scheinschwerpunkt gespielt hast → ignoriere 1 Schaden.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Stellungswechsel, Ablösung
- entfallen/ersetzt: +2 DEF diesen Zug | nächsten Zug +2 ATK. | Einmal: wenn du Scheinschwerpunkt gespielt hast → ignoriere 1 Schaden.

### Haftwagen (`dc_b_haftwagen_907`, Einheit) – voll
- vorher: Bei Kill ziehe 1.
- nachher: Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. · Wörter: Sicherung

### Kai-Keil (`dc_b_kai_keil_908`, Einheit) – voll
- vorher: +2 ATK gegen ein gewähltes Ziel; Träger +1 DEF.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +2 ATK.
- Werte: 3/3 → 3/4

### Nussbraun-Wagen (`dc_b_nussbraun_wagen_909`, Einheit) – voll
- vorher: +2 ATK gegen ein gewähltes Ziel; Träger +1 DEF. [Nussbraun-Wagen]
- nachher: Ihr erster Angriff nach dem Ausspielen hat +2 ATK. · Wörter: Staffelangriff
- Werte: 3/3 → 3/4

### Aufrufpanzer (`dc_b_aufrufpanzer_910`, Einheit) – voll
- vorher: +2 ATK gegen ein gewähltes Ziel; Träger +1 DEF. [Aufrufpanzer]
- nachher: Ihr erster Angriff nach dem Ausspielen hat +2 ATK. · Wörter: Staffelangriff
- Werte: 3/3 → 3/4

### Brunn-Keil (`dc_b_brunn_keil_911`, Einheit) – voll
- vorher: +1 ATK/+1 DEF, wenn du diesen Zug nicht bewegt hast. [Brunn-Keil]
- nachher: +1 ATK und +1 DEF, wenn sie seit deinem letzten Zug nicht versetzt wurde. · Wörter: Nachsetzen

### Zwei Daten (`dc_b_zwei_daten_912`, Einheit) – voll
- vorher: +1 ATK, wenn du diesen Zug Sofort spielst. [Zwei Daten]
- nachher: +1 ATK, wenn du in diesem Zug einen Soforteinsatz gespielt hast.

### Abschlusswagen (`dc_b_abschlusswagen_913`, Einheit) – voll
- vorher: +1 DEF an Abschnitten mit eigener Unterstützung. [Abschlusswagen]
- nachher: +1 DEF, solange du eine offene Unterstützung hast. · Wörter: Nachsetzen

### Zielangriff-Keil (`dc_b_zielangriff_keil_914`, Einheit) – Regelangleichung mit Kürzung
- vorher: +2 ATK gegen ein gewähltes Ziel; Träger +1 DEF. Bei Kill am genannten Ziel: +1 ATK bis Zugende.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +2 ATK. · Wörter: Zähigkeit, Überlast
- Werte: 5/4 → 5/5
- entfallen/ersetzt: Bei Kill am genannten Ziel: +1 ATK bis Zugende.

### Stellungspanzer (`dc_b_stellungspanzer_727`, Einheit) – voll
- vorher: +1 DEF an Abschnitten mit eigener Unterstützung. [Stellungspanzer]
- nachher: +1 DEF, solange du eine offene Unterstützung hast.

### Auffangkeil (`dc_b_auffangkeil_728`, Einheit) – ersetzt
- vorher: +1 DEF gegen Feinde, die diesen Zug bewegt wurden.
- nachher: — · Wörter: Abschirmung, Stellungswechsel
- entfallen/ersetzt: +1 DEF gegen Feinde, die diesen Zug bewegt wurden.

### Markenwagen (`dc_b_markenwagen_729`, Einheit) – voll
- vorher: +1 ATK, wenn du diesen Zug Sofort spielst. [Markenwagen]
- nachher: +1 ATK, wenn du in diesem Zug einen Soforteinsatz gespielt hast. · Wörter: Abschirmung

### Gegenstoßwagen (`dc_b_gegenstosswagen_730`, Einheit) – voll
- vorher: +1 ATK, wenn du diesen Zug Schaden erlitten hast.
- nachher: +1 ATK, wenn sie in diesem Zug Schaden erlitten hat. · Wörter: Stellungswechsel

### Flussufer-Keil (`dc_b_flussufer_keil_731`, Einheit) – voll
- vorher: Kostet 1 weniger bei Infanterie im Abschnitt (min. 1). [Flussufer-Keil]
- nachher: Kostet 1 AP weniger (mind. 1), solange eigene Infanterie an der Front steht.

### Kronland-Panzer (`dc_b_kronland_panzer_732`, Einheit) – ersetzt
- vorher: —
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Zuteilung

### Doppelstellung (`dc_b_doppelstellung_733`, Einheit) – voll
- vorher: +1 DEF; einmal/Zug: negiere 1 Schaden. [Doppelstellung]
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Zähigkeit
- Werte: 3/5 → 3/6

### Gegenstoßkeil (`dc_b_gegenstosskeil_734`, Einheit) – ersetzt
- vorher: +3 ATK, wenn du diesen Zug angegriffen wurdest; danach heile 1.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit. · Wörter: Ablösung
- entfallen/ersetzt: +3 ATK, wenn du diesen Zug angegriffen wurdest | danach heile 1.

### Etappenkeil (`dc_b_etappenkeil_49`, Einheit) – voll
- vorher: Einmal/Zug: schiebe diese Einheit um 1 Slot.
- nachher: — · Wörter: Stellungswechsel

### Kolonnenpanzer (`dc_b_kolonnenpanzer_50`, Einheit) – voll
- vorher: +1 DEF, wenn sie diesen Zug geschoben wurde.
- nachher: +1 DEF, wenn sie in diesem Zug versetzt wurde.

### Brückenkopf (`dc_b_brueckenkopf_51`, Einheit) – voll
- vorher: +1 ATK, wenn sie diesen Zug geschoben wurde.
- nachher: +1 ATK, wenn sie in diesem Zug versetzt wurde.

### Reservelinie (`dc_b_reservelinie_52`, Einheit) – voll
- vorher: Darf einmal/Zug um 1 Slot geschoben werden (zusätzlich).
- nachher: — · Wörter: Stellungswechsel

### Hafenring-Walze (`dc_b_hafenring_walze_53`, Einheit) – voll
- vorher: Kostet 1 weniger bei Infanterie im Abschnitt (min. 1). [Hafenring-Walze]
- nachher: Kostet 1 AP weniger (mind. 1), solange eigene Infanterie an der Front steht. · Wörter: Zähigkeit

### Neuport-Schild (`dc_b_neuport_schild_54`, Einheit) – voll
- vorher: Beim Ausspielen: heile 1 an Infanterie oder Panzer.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit. · Wörter: Nachsetzen

### Port-Meris-Keil (`dc_b_port_meris_keil_55`, Einheit) – voll
- vorher: +1 ATK gegen Einheiten, die diesen Zug Schaden nahmen.
- nachher: +1 ATK gegen Ziele, die in diesem Zug Schaden erlitten haben. · Wörter: Stellungswechsel

### Letzte Stellung (`dc_b_letzte_stellung_56`, Einheit) – voll
- vorher: +1 ATK/+1 DEF, wenn im Abschnitt keine Unterstützung liegt.
- nachher: +1 ATK und +1 DEF, solange du keine Unterstützung hast.

### Umschlagwagen (`dc_b_umschlagwagen_667`, Einheit) – voll
- vorher: +1 ATK, wenn sie diesen Zug bewegt wurde.
- nachher: +1 ATK, wenn sie in diesem Zug versetzt wurde. · Wörter: Stellungswechsel

### Flankenkeil (`dc_b_flankenkeil_668`, Einheit) – ersetzt
- vorher: +1 ATK gegen Feinde, die nicht angrenzend an eigene Unterstützung stehen.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Stellungswechsel
- entfallen/ersetzt: +1 ATK gegen Feinde, die nicht angrenzend an eigene Unterstützung stehen.

### Lagerkeil (`dc_b_lagerkeil_669`, Einheit) – voll
- vorher: Kostet 1 weniger bei Infanterie im Abschnitt (min. 1). [Lagerkeil]
- nachher: Kostet 1 AP weniger (mind. 1), solange eigene Infanterie an der Front steht.

### Knotenwagen (`dc_b_knotenwagen_670`, Einheit) – voll
- vorher: Negiere 1 Schaden einmal/Zug, wenn du diesen Zug Sofort spielst.
- nachher: Der erste Schaden je Zug sinkt um 1, wenn du in diesem Zug einen Soforteinsatz gespielt hast.

### Pfadkeil (`dc_b_pfadkeil_671`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF; ziehe 1 wenn du diesen Zug umgangen/bewegt hast.
- nachher: — · Wörter: Stellungswechsel
- Werte: 3/3 → 3/4
- entfallen/ersetzt: ziehe 1 wenn du diesen Zug umgangen/bewegt hast.

### Flankenpanzer (`dc_b_flankenpanzer_672`, Einheit) – Regelangleichung mit Kürzung
- vorher: +1 ATK/+1 DEF beim Angriff aus angrenzendem Abschnitt; bei Kill ziehe 1.
- nachher: Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. · Wörter: Gefechtsbereit
- entfallen/ersetzt: +1 ATK/+1 DEF beim Angriff aus angrenzendem Abschnitt

### Doppelkolonnen-Keil (`dc_b_doppelkolonnen_keil_673`, Einheit) – voll
- vorher: +1 ATK/+1 DEF, wenn zwei eigene Einheiten angrenzen.
- nachher: +1 ATK und +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht. · Wörter: Stellungswechsel

### Flankenstoß (`dc_b_flankenstoss_674`, Einheit) – ersetzt
- vorher: +3 ATK, wenn aus angrenzendem Abschnitt angegriffen; danach darfst du 1 Einheit 1 Abschnitt bewegen.
- nachher: — · Wörter: Stellungswechsel
- entfallen/ersetzt: +3 ATK, wenn aus angrenzendem Abschnitt angegriffen | danach darfst du 1 Einheit 1 Abschnitt bewegen.

### Normwagen (`dc_b_normwagen_547`, Einheit) – voll
- vorher: +1 ATK, wenn Ziel beobachtet ist.
- nachher: +1 ATK gegen beobachtete Ziele. · Wörter: Gefechtsbereit

### Depotkeil (`dc_b_depotkeil_548`, Einheit) – voll
- vorher: Kostet 1 weniger bei Unterstützung im Abschnitt (min. 1).
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.

### Bahnkeil (`dc_b_bahnkeil_549`, Einheit) – ersetzt
- vorher: +1 ATK an Bahn-Abschnitten; +1 DEF wenn beobachtet.
- nachher: +1 ATK gegen beobachtete Ziele. · Wörter: Staffelangriff
- entfallen/ersetzt: +1 ATK an Bahn-Abschnitten | +1 DEF wenn beobachtet.

### Kommissionswagen (`dc_b_kommissionswagen_550`, Einheit) – voll
- vorher: Negiere 1 Schaden einmal/Zug, wenn Unterstützung liegt.
- nachher: Der erste Schaden je Zug sinkt um 1, solange du eine offene Unterstützung hast. · Wörter: Gefechtsbereit

### Standardkeil (`dc_b_standardkeil_551`, Einheit) – voll
- vorher: +1 DEF; ziehe 1 wenn du diesen Zug aufgedeckt hast.
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug aufgedeckt hast. · Wörter: Stellungswechsel
- Werte: 3/3 → 3/4

### Normpanzer (`dc_b_normpanzer_552`, Einheit) – Regelangleichung mit Kürzung
- vorher: +1 ATK/+1 DEF gegen beobachtete; bei Kill decke 1 auf.
- nachher: Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Abschirmung
- entfallen/ersetzt: +1 ATK/+1 DEF gegen beobachtete

### Vollverband-Keil (`dc_b_vollverband_keil_553`, Einheit) – voll
- vorher: +2 ATK gegen ein gewähltes Ziel; Träger +1 DEF. [Vollverband-Keil]
- nachher: Ihr erster Angriff nach dem Ausspielen hat +2 ATK.
- Werte: 4/4 → 4/5

### Methodenschlag (`dc_b_methodenschlag_554`, Einheit) – Regelangleichung mit Kürzung
- vorher: +3 ATK gegen eine beobachtete Einheit. Danach gilt eine weitere angrenzende als beobachtet.
- nachher: +3 ATK gegen beobachtete Ziele. · Wörter: Ablösung, Durchschlag
- entfallen/ersetzt: Danach gilt eine weitere angrenzende als beobachtet.

### Entsatzkolonne (`dc_b_entsatzkolonne_487`, Einheit) – ersetzt
- vorher: +1 ATK/+1 DEF, wenn sie in einen zuletzt angegriffenen Abschnitt rückt.
- nachher: — · Wörter: Abschirmung, Stellungswechsel
- entfallen/ersetzt: +1 ATK/+1 DEF, wenn sie in einen zuletzt angegriffenen Abschnitt rückt.

### Volle Kolonne (`dc_b_volle_kolonne_488`, Einheit) – voll
- vorher: +1 DEF an Abschnitten mit eigener Unterstützung. [Volle Kolonne]
- nachher: +1 DEF, solange du eine offene Unterstützung hast.

### Bahnstadt-Keil (`dc_b_bahnstadt_keil_489`, Einheit) – voll
- vorher: +1 ATK, wenn Unterstützung im Spiel.
- nachher: +1 ATK, solange du eine offene Unterstützung hast.

### Solkai-Träger (`dc_b_solkai_traeger_490`, Einheit) – voll
- vorher: +2 ATK gegen ein gewähltes Ziel; Träger +1 DEF. [Solkai-Träger]
- nachher: Ihr erster Angriff nach dem Ausspielen hat +2 ATK. · Wörter: Abschirmung
- Werte: 2/5 → 2/6

### Straßenriegel (`dc_b_strassenriegel_491`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +2 DEF; ziehe 1 wenn Entsatz diesen Zug.
- nachher: — · Wörter: Abschirmung, Zuteilung
- Werte: 2/5 → 2/7
- entfallen/ersetzt: ziehe 1 wenn Entsatz diesen Zug.
- Hinweis: Werte 9 weit über Median 6 bei 3 AP

### Lagerwagen (`dc_b_lagerwagen_492`, Einheit) – voll
- vorher: Kostet 1 weniger bei Unterstützung im Spiel.
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.

### Entsatzbataillon (`dc_b_entsatzbataillon_493`, Einheit) – ersetzt
- vorher: +1 ATK/+1 DEF, wenn Abschnitt zuletzt angegriffen.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Abschirmung
- entfallen/ersetzt: +1 ATK/+1 DEF, wenn Abschnitt zuletzt angegriffen.

### Entsatzschlag (`dc_b_entsatzschlag_494`, Einheit) – ersetzt
- vorher: +2 ATK, wenn sie in einen zuletzt angegriffenen Abschnitt rückt.
- nachher: — · Wörter: Staffelangriff, Ablösung
- entfallen/ersetzt: +2 ATK, wenn sie in einen zuletzt angegriffenen Abschnitt rückt. | Schlüsselwort Stellungswechsel (max. 2 Grundwörter je Karte)

### Tunnelkeil (`dc_b_tunnelkeil_70`, Einheit) – ersetzt
- vorher: +1 DEF in Abschnitten ohne feindliche Unterstützung.
- nachher: Der erste Schaden je Zug sinkt um 1.
- entfallen/ersetzt: +1 DEF in Abschnitten ohne feindliche Unterstützung.

### Engenwalze (`dc_b_engenwalze_71`, Einheit) – voll
- vorher: +1 ATK gegen einrückende Einheiten.
- nachher: +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.

### Passhaus-Schild (`dc_b_passhaus_schild_72`, Einheit) – ersetzt
- vorher: Beim Ausspielen: Feind im Abschnitt −1 ATK bis Zugende.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Stellungswechsel
- entfallen/ersetzt: Beim Ausspielen: Feind im Abschnitt −1 ATK bis Zugende.

### Hangpanzer (`dc_b_hangpanzer_73`, Einheit) – ersetzt
- vorher: —
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Zuteilung

### Leserbach-Keil (`dc_b_leserbach_keil_74`, Einheit) – voll
- vorher: Kostet 1 weniger bei 2+ Abschnitten mit eigenen Einheiten.
- nachher: Kostet 1 AP weniger (mind. 1), wenn du in 2+ Abschnitten Einheiten hast. · Wörter: Stellungswechsel

### Steinriegel (`dc_b_steinriegel_75`, Einheit) – ersetzt
- vorher: Einmal/Zug: +1 DEF gegen einrückendes Ziel.
- nachher: +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind. · Wörter: Zähigkeit
- entfallen/ersetzt: Einmal/Zug: +1 DEF gegen einrückendes Ziel.

### Aschen-Kette (`dc_b_aschen_kette_76`, Einheit) – voll
- vorher: +1 ATK, wenn du diesen Zug eine Einheit verloren hast.
- nachher: +1 ATK, wenn in diesem Zug eine eigene Einheit zerstört wurde.

### Letzter Pass (`dc_b_letzter_pass_77`, Einheit) – voll
- vorher: +2 ATK gegen eine Einheit, die in diesem Zug einrückt.
- nachher: +2 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.

### Versorgungskeil (`dc_b_versorgungskeil_307`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF; heile 1 an Infanterie im Abschnitt einmal/Zug.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit. · Wörter: Durchschlag
- Werte: 2/4 → 2/5
- entfallen/ersetzt: heile 1 an Infanterie im Abschnitt einmal/Zug.

### Etappenwagen (`dc_b_etappenwagen_308`, Einheit) – voll
- vorher: Negiere 1 Schaden einmal/Zug, wenn Unterstützung im Abschnitt.
- nachher: Der erste Schaden je Zug sinkt um 1, solange du eine offene Unterstützung hast. · Wörter: Abschirmung

### Klinikschild (`dc_b_klinikschild_309`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF; Einheiten im Abschnitt heilen 1 nach Ruhezug.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.
- Werte: 3/5 → 3/6
- entfallen/ersetzt: Einheiten im Abschnitt heilen 1 nach Ruhezug.

### Wohnblock-Riegel (`dc_b_wohnblock_riegel_310`, Einheit) – ersetzt
- vorher: —
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Zuteilung

### Notfallträger (`dc_b_notfalltraeger_311`, Einheit) – voll
- vorher: Beim Ausspielen: heile 2 an eigener Einheit.
- nachher: Beim Ausspielen: heile 2 DEF an deiner am stärksten beschädigten Einheit. · Wörter: Zähigkeit

### Forumspanzer (`dc_b_forumspanzer_312`, Einheit) – ersetzt
- vorher: Einheiten, die nicht angriffen: +1 DEF; einmal/Zug ziehe 1 bei Heilung.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.
- entfallen/ersetzt: Einheiten, die nicht angriffen: +1 DEF | einmal/Zug ziehe 1 bei Heilung.

### Zuteilungsräumer (`dc_b_zuteilungsraeumer_313`, Einheit) – voll
- vorher: Kostet 1 weniger, wenn Unterstützung im Spiel.
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. · Wörter: Zähigkeit

### Schildwall (`dc_b_schildwall_314`, Einheit) – ersetzt
- vorher: Trägerwirkung-ähnlich: Abschnitt +1 DEF; ruhende Einheiten +1 ATK nächsten Zug.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK.
- entfallen/ersetzt: Trägerwirkung-ähnlich: Abschnitt +1 DEF | ruhende Einheiten +1 ATK nächsten Zug.

### Knochenkeil (`dc_b_knochenkeil_91`, Einheit) – voll
- vorher: +1 DEF mit Ausrüstung.
- nachher: +1 DEF, solange sie Ausrüstung trägt.

### Werkhof-Schild (`dc_b_werkhof_schild_92`, Einheit) – voll
- vorher: Negiere 1 Schaden einmal/Zug, wenn Ausrüstung getragen.
- nachher: Der erste Schaden je Zug sinkt um 1, solange sie Ausrüstung trägt.

### Ossar-Walze (`dc_b_ossar_walze_93`, Einheit) – voll
- vorher: +1 ATK/+1 DEF mit Ausrüstung.
- nachher: +1 ATK und +1 DEF, solange sie Ausrüstung trägt. · Wörter: Zähigkeit

### Grenzplatte (`dc_b_grenzplatte_94`, Einheit) – ersetzt
- vorher: —
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Zähigkeit

### Linsenpanzer (`dc_b_linsenpanzer_95`, Einheit) – ersetzt
- vorher: Beim Ausspielen: ziehe 1 Ausrüstung.
- nachher: — · Wörter: Abschirmung, Zuteilung
- entfallen/ersetzt: Beim Ausspielen: ziehe 1 Ausrüstung.

### Altenfeld-Riegel (`dc_b_altenfeld_riegel_96`, Einheit) – ersetzt
- vorher: Einmal/Zug: +1 DEF; wenn Feind stirbt, +1 ATK bis Zugende.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK.
- entfallen/ersetzt: Einmal/Zug: +1 DEF | wenn Feind stirbt, +1 ATK bis Zugende.

### Eron-Träger (`dc_b_eron_traeger_97`, Einheit) – voll
- vorher: Kostet 1 weniger mit Ausrüstung im Abschnitt.
- nachher: Kostet 1 AP weniger (mind. 1), solange eine eigene Einheit Ausrüstung trägt.

### Totenwall-Keil (`dc_b_totenwall_keil_98`, Einheit) – Regelangleichung mit Kürzung
- vorher: +2 ATK/+2 DEF mit Ausrüstung; stirbt Feind: Abschnitt +1 ATK.
- nachher: +2 ATK und +2 DEF, solange sie Ausrüstung trägt.
- entfallen/ersetzt: stirbt Feind: Abschnitt +1 ATK.

### Sensorkeil (`dc_b_sensorkeil_427`, Einheit) – voll
- vorher: +1 ATK gegen aufgeklärte.
- nachher: +1 ATK gegen beobachtete Ziele.

### Modellträger (`dc_b_modelltraeger_428`, Einheit) – ersetzt
- vorher: Negiere 1 Schaden einmal/Zug, wenn Ziel aufgeklärt.
- nachher: +1 ATK gegen beobachtete Ziele.
- entfallen/ersetzt: Negiere 1 Schaden einmal/Zug, wenn Ziel aufgeklärt.

### Asteron-Schild (`dc_b_asteron_schild_429`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF; einmal/Zug decke Feind im Abschnitt auf.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Durchschlag
- Werte: 3/5 → 3/6
- entfallen/ersetzt: einmal/Zug decke Feind im Abschnitt auf.

### Werkbach-Riegel (`dc_b_werkbach_riegel_430`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +2 DEF; ziehe 1 wenn du diesen Zug aufdeckst.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.
- Werte: 2/5 → 2/7
- entfallen/ersetzt: ziehe 1 wenn du diesen Zug aufdeckst.
- Hinweis: Werte 9 weit über Median 6 bei 3 AP

### Probenpanzer (`dc_b_probenpanzer_431`, Einheit) – Regelangleichung mit Kürzung
- vorher: Beim Ausspielen: decke 1 auf; +1 ATK gegen ihn.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: +1 ATK gegen ihn.

### Abbruchkeil (`dc_b_abbruchkeil_432`, Einheit) – ersetzt
- vorher: Wenn Angriff keinen Kill: heile 1 und ziehe 1.
- nachher: Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. · Wörter: Staffelangriff
- entfallen/ersetzt: Wenn Angriff keinen Kill: heile 1 und ziehe 1.

### Messwagen (`dc_b_messwagen_433`, Einheit) – voll
- vorher: Kostet 1 weniger bei aufgeklärtem Feind im Spiel.
- nachher: Kostet 1 AP weniger (mind. 1), solange eine gegnerische Einheit beobachtet ist. · Wörter: Durchschlag

### Einzelschuss (`dc_b_einzelschuss_434`, Einheit) – Regelangleichung mit Kürzung
- vorher: +2 ATK gegen aufgeklärte; nach Kill: decke nächsten Feind auf.
- nachher: +2 ATK gegen beobachtete Ziele.
- entfallen/ersetzt: nach Kill: decke nächsten Feind auf.

### Rohrpark (`dc_b_rohrpark_36`, Einheit) – ersetzt
- vorher: +1 ATK, solange 2+ Artillerie im Spiel.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Durchschlag
- entfallen/ersetzt: +1 ATK, solange 2+ Artillerie im Spiel.

### Dauerfeuer (`dc_b_dauerfeuer_37`, Einheit) – ersetzt
- vorher: Zweimal angreifen nach Soforteinsatz; danach 1 Selbstschaden.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Zuteilung
- entfallen/ersetzt: Zweimal angreifen nach Soforteinsatz | danach 1 Selbstschaden.

### Kaliberzeile (`dc_b_kaliberzeile_38`, Einheit) – ersetzt
- vorher: Beim Ausspielen: Feind −1 DEF bis Zugende.
- nachher: Der erste Schaden je Zug sinkt um 1.
- entfallen/ersetzt: Beim Ausspielen: Feind −1 DEF bis Zugende.

### Munitionskehle (`dc_b_munitionskehle_39`, Einheit) – voll
- vorher: Kostet 1 weniger bei Ausrüstung im Spiel.
- nachher: Kostet 1 AP weniger (mind. 1), solange eine eigene Einheit Ausrüstung trägt.

### Flächenauftrag (`dc_b_flaechenauftrag_40`, Einheit) – ersetzt
- vorher: Angriff: 1 Schaden auch an benachbartem Feind.
- nachher: Der erste Schaden je Zug sinkt um 1.
- entfallen/ersetzt: Angriff: 1 Schaden auch an benachbartem Feind.

### Werksbatterie (`dc_b_werksbatterie_41`, Einheit) – voll
- vorher: +2 ATK, wenn Ziel bereits Schaden hat.
- nachher: +2 ATK gegen beschädigte Ziele.

### Nachtlieferung (`dc_b_nachtlieferung_42`, Einheit) – voll
- vorher: Verdeckt spielbar. Aufgedeckt: +1 ATK diesen Zug.
- nachher: Ihr erster Angriff hat +1 ATK. · Wörter: Stellungswechsel

### Industrieschlag (`dc_b_industrieschlag_145`, Einheit) – ersetzt
- vorher: Allen Feinden 1 Schaden; dann +1 ATK gegen einen.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Nachsetzen
- entfallen/ersetzt: Allen Feinden 1 Schaden | dann +1 ATK gegen einen.

### Werkbatterie (`dc_b_werkbatterie_15`, Einheit) – voll
- vorher: +1 ATK, wenn du in diesem Zug eine Infanterie gespielt hast.
- nachher: +1 ATK, wenn du in diesem Zug Infanterie gespielt hast.

### Sturmfeuer (`dc_b_sturmfeuer_16`, Einheit) – voll
- vorher: Beim Ausspielen: 1 Schaden an einer gegnerischen Einheit im Abschnitt.
- nachher: Beim Ausspielen: 1 Schaden an der schwächsten gegnerischen Fronteinheit in ihrem Abschnitt.

### Pflichtsalve (`dc_b_pflichtsalve_17`, Einheit) – ersetzt
- vorher: Einmal pro Zug: diese Einheit erleidet 1 Schaden → 1 Schaden an einem Ziel im Abschnitt.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Staffelangriff
- entfallen/ersetzt: Einmal pro Zug: diese Einheit erleidet 1 Schaden → 1 Schaden an einem Ziel im Abschnitt.

### Wellenbrecher (`dc_b_wellenbrecher_18`, Einheit) – ersetzt
- vorher: —
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Staffelangriff

### Massenschlag (`dc_b_massenschlag_19`, Einheit) – voll
- vorher: Beim Ausspielen: 1 Schaden an bis zu zwei gegnerischen Einheiten im Abschnitt.
- nachher: Beim Ausspielen: 1 Schaden an der schwächsten gegnerischen Fronteinheit in ihrem Abschnitt.

### Ordnungsbatterie (`dc_b_ordnungsbatterie_120`, Einheit) – Regelangleichung mit Kürzung
- vorher: Eigene Infanterie im Abschnitt +1 ATK. Beim Angriff: Ziel −1 DEF bis Zugende, wenn du in diesem Zug Infanterie gespielt hast.
- nachher: Andere eigene Infanterie in ihrem Abschnitt: +1 ATK. · Wörter: Durchschlag
- entfallen/ersetzt: Beim Angriff: Ziel −1 DEF bis Zugende, wenn du in diesem Zug Infanterie gespielt hast.

### Maßfeuer (`dc_b_massfeuer_134`, Einheit) – Regelangleichung mit Kürzung
- vorher: +1 ATK, wenn eigene Infanterie angrenzt. Einmal/Zug: wenn du keine Sofort spielst → +1 DEF.
- nachher: +1 ATK, solange eigene Infanterie benachbart ist. · Wörter: Durchschlag
- entfallen/ersetzt: Einmal/Zug: wenn du keine Sofort spielst → +1 DEF.

### Weihegeschütz (`dc_b_weihegeschuetz_139`, Einheit) – voll
- vorher: Beim Ausspielen: heile eine eigene Infanterie um 1. +1 ATK gegen beschädigte Ziele.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit. +1 ATK gegen beschädigte Ziele. · Wörter: Staffelangriff

### Dekretbatterie (`dc_b_dekretbatterie_615`, Einheit) – voll
- vorher: Kann jeden gegnerischen Frontabschnitt angreifen.
- nachher: Indirektes Feuer: darf jede gegnerische Fronteinheit angreifen.

### Flussrot-Haubitzen (`dc_b_flussrot_haubitzen_616`, Einheit) – ersetzt
- vorher: +1 ATK gegen Einheiten, die in diesem Zug gespielt wurden.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Stellungswechsel
- entfallen/ersetzt: +1 ATK gegen Einheiten, die in diesem Zug gespielt wurden.

### Schwerpunktfeuer (`dc_b_schwerpunktfeuer_617`, Einheit) – ersetzt
- vorher: +2 ATK, wenn du in diesem Zug bereits angegriffen hast.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Durchschlag
- entfallen/ersetzt: +2 ATK, wenn du in diesem Zug bereits angegriffen hast.

### Glockenstellung (`dc_b_glockenstellung_618`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF. Gegnerische Einheiten in diesem Abschnitt haben -1 ATK gegen dich.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Durchschlag
- Werte: 2/3 → 2/4
- entfallen/ersetzt: Gegnerische Einheiten in diesem Abschnitt haben -1 ATK gegen dich.

### Kronsalve (`dc_b_kronsalve_619`, Einheit) – voll
- vorher: Kann jeden Frontabschnitt angreifen.
- nachher: Indirektes Feuer: darf jede gegnerische Fronteinheit angreifen. · Wörter: Gefechtsbereit, Zuteilung

### Erlassbatterie (`dc_b_erlassbatterie_636`, Einheit) – ersetzt
- vorher: Einmal/Zug: wähle ein Ziel; Angriffe eigener Einheiten dagegen ignorieren den ersten Schaden-Negierer des Gegners. Danach: wirf 1 ab (Preis der Unfehlbarkeit).
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Durchschlag
- entfallen/ersetzt: Einmal/Zug: wähle ein Ziel | Angriffe eigener Einheiten dagegen ignorieren den ersten Schaden-Negierer des Gegners. | Danach: wirf 1 ab.

### Schwurfeuer (`dc_b_schwurfeuer_649`, Einheit) – ersetzt
- vorher: +1 ATK, solange du in diesem Zug eine Einheit ersetzt hast. Träger-Abschnitt: eigene Einheiten +1 DEF gegen den ersten Angriff.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Durchschlag
- entfallen/ersetzt: +1 ATK, solange du in diesem Zug eine Einheit ersetzt hast. | Träger-Abschnitt: eigene Einheiten +1 DEF gegen den ersten Angriff.

### Silberstern-Rohr (`dc_b_silberstern_rohr_650`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 ATK. Wenn diese Einheit einen Kill erzielt: heile 1 DEF an einer eigenen Einheit, die diesen Zug ersetzt wurde.
- nachher: Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. · Wörter: Durchschlag
- Werte: 4/2 → 5/2
- entfallen/ersetzt: Wenn diese Einheit einen Kill erzielt: heile 1 DEF an einer eigenen Einheit, die diesen Zug ersetzt wurde.

### Maßbatterie (`dc_b_massbatterie_375`, Einheit) – voll
- vorher: Kann jeden Frontabschnitt angreifen.
- nachher: Indirektes Feuer: darf jede gegnerische Fronteinheit angreifen. · Wörter: Nachsetzen

### Schmerzfeuer (`dc_b_schmerzfeuer_376`, Einheit) – ersetzt
- vorher: +1 ATK gegen beschädigte Einheiten.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Stellungswechsel
- entfallen/ersetzt: +1 ATK gegen beschädigte Einheiten.

### Filterstellung (`dc_b_filterstellung_377`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF. Gegnerische Soforteinsätze gegen Einheiten hier kosten 1 AP mehr.
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.
- Werte: 2/3 → 2/4
- entfallen/ersetzt: Gegnerische Soforteinsätze gegen Einheiten hier kosten 1 AP mehr.

### Stoßfeuer (`dc_b_stossfeuer_378`, Einheit) – ersetzt
- vorher: —
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Nachsetzen

### Massenschlag (`dc_b_massenschlag_379`, Einheit) – voll
- vorher: Kann jeden Frontabschnitt angreifen.
- nachher: Indirektes Feuer: darf jede gegnerische Fronteinheit angreifen. · Wörter: Gefechtsbereit, Überlast

### Filterwerk-Rohr (`dc_b_filterwerk_rohr_392`, Einheit) – ersetzt
- vorher: Eigene Infanterie +1 DEF gegen den ersten Angriff/Zug. Beim Angriff: erleide 1 Schaden → Ziel −1 DEF bis Zugende.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Stellungswechsel
- entfallen/ersetzt: Eigene Infanterie +1 DEF gegen den ersten Angriff/Zug. | Beim Angriff: erleide 1 Schaden → Ziel −1 DEF bis Zugende.

### Implantatrohr (`dc_b_implantatrohr_408`, Einheit) – Regelangleichung mit Kürzung
- vorher: +1 ATK, solange beschädigt. Einmal/Zug: opfere 1 DEF am Rohr → ziehe 1.
- nachher: +1 ATK, solange sie beschädigt ist. · Wörter: Zuteilung
- entfallen/ersetzt: Einmal/Zug: opfere 1 DEF am Rohr → ziehe 1.

### Knochenbatterie (`dc_b_knochenbatterie_411`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF. Bei Zerstörung: ziehe 1 und eine eigene Einheit erleidet 1 Schaden (Optimierungsrest).
- nachher: — · Wörter: Nachsetzen, Zuteilung
- Werte: 4/2 → 4/3
- entfallen/ersetzt: Bei Zerstörung: ziehe 1 und eine eigene Einheit erleidet 1 Schaden.

### Knotenrohr (`dc_b_knotenrohr_795`, Einheit) – voll
- vorher: +1 ATK; einmal/Zug: wenn Infanterie im Abschnitt → +1 DEF. [Knotenrohr]
- nachher: +1 DEF, solange eigene Infanterie benachbart ist.
- Werte: 3/2 → 4/2

### Lagefeuer (`dc_b_lagefeuer_796`, Einheit) – ersetzt
- vorher: Beim Angriff: decke Ziel auf; +1 ATK wenn schon aufgeklärt.
- nachher: +1 ATK gegen beobachtete Ziele. · Wörter: Zuteilung
- entfallen/ersetzt: Beim Angriff: decke Ziel auf | +1 ATK wenn schon aufgeklärt.

### Lokalisierbatterie (`dc_b_lokalisierbatterie_797`, Einheit) – voll
- vorher: +2 ATK gegen aufgeklärte Feinde; ziehe 1 bei Kill.
- nachher: +2 ATK gegen beobachtete Ziele. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.

### Werkhofgeschütz (`dc_b_werkhofgeschuetz_798`, Einheit) – voll
- vorher: +1 ATK, wenn eigene Infanterie angrenzt. [Werkhofgeschütz]
- nachher: +1 ATK, solange eigene Infanterie benachbart ist. · Wörter: Zuteilung

### Nordmark-Rohr (`dc_b_nordmark_rohr_799`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 ATK; einmal/Zug: wenn Infanterie im Abschnitt → decke 1 auf.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Fernschuss
- Werte: 3/2 → 4/2
- entfallen/ersetzt: einmal/Zug: wenn Infanterie im Abschnitt → decke 1 auf.

### Westhaven-Batterie (`dc_b_westhaven_batterie_800`, Einheit) – Regelangleichung mit Kürzung
- vorher: +2 ATK nach einem Kill diesen Zug; ziehe 1 bei Kill. [Westhaven-Batterie]
- nachher: Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. · Wörter: Stellungswechsel
- entfallen/ersetzt: +2 ATK nach einem Kill diesen Zug

### Kurzes Rohr (`dc_b_kurzes_rohr_801`, Einheit) – voll
- vorher: Kostet 1 weniger wenn Unterstützung im Spiel (min. 1). [Kurzes Rohr]
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. · Wörter: Stellungswechsel

### Offenes Feuer (`dc_b_offenes_feuer_802`, Einheit) – voll
- vorher: +1 ATK gegen aufgeklärte Feinde; bei Kill aufdecken.
- nachher: +1 ATK gegen beobachtete Ziele. Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf.

### Siegelrohr (`dc_b_siegelrohr_855`, Einheit) – Regelangleichung mit Kürzung
- vorher: +2 ATK nach einem Kill diesen Zug; ziehe 1 bei Kill.
- nachher: Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. · Wörter: Stellungswechsel
- entfallen/ersetzt: +2 ATK nach einem Kill diesen Zug

### Falschfeuer (`dc_b_falschfeuer_856`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF; ziehe 1 wenn du diesen Zug nicht bewegt hast.
- nachher: — · Wörter: Stellungswechsel
- Werte: 2/3 → 2/4
- entfallen/ersetzt: ziehe 1 wenn du diesen Zug nicht bewegt hast.

### Abriegelbatterie (`dc_b_abriegelbatterie_857`, Einheit) – Regelangleichung mit Kürzung
- vorher: +2 ATK wenn leerer angrenzender Abschnitt; ziehe 1 bei Kill.
- nachher: Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.
- entfallen/ersetzt: +2 ATK wenn leerer angrenzender Abschnitt

### Ämterlande-Geschütz (`dc_b_aemterlande_geschuetz_858`, Einheit) – voll
- vorher: Kostet 1 weniger wenn Unterstützung im Spiel (min. 1). [Ämterlande-Geschütz]
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. · Wörter: Stellungswechsel

### Grenzfeuer (`dc_b_grenzfeuer_859`, Einheit) – voll
- vorher: Einheiten im Abschnitt +1 DEF, wenn du diesen Zug Sofort spielst.
- nachher: Andere eigene Einheiten in ihrem Abschnitt: +1 DEF, wenn du in diesem Zug einen Soforteinsatz gespielt hast. · Wörter: Nachsetzen

### Velis-Batterie (`dc_b_velis_batterie_860`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF; ziehe 1 wenn du diesen Zug nicht bewegt hast. [Velis-Batterie]
- nachher: — · Wörter: Stellungswechsel
- Werte: 3/3 → 3/4
- entfallen/ersetzt: ziehe 1 wenn du diesen Zug nicht bewegt hast.

### Stumpfrohr (`dc_b_stumpfrohr_861`, Einheit) – voll
- vorher: Kostet 1 weniger wenn Unterstützung im Spiel (min. 1). [Stumpfrohr]
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. · Wörter: Stellungswechsel

### Leerschuss (`dc_b_leerschuss_862`, Einheit) – voll
- vorher: Beim Angriff: Ziel −1 ATK bis Zugende.
- nachher: Nach ihrem Angriff: das Ziel hat −1 ATK bis zum Ende des nächsten Zuges.

### Zeilenrohr (`dc_b_zeilenrohr_915`, Einheit) – voll
- vorher: +1 ATK gegen Feinde ohne angrenzende eigene Einheit des Gegners; bei Kill aufdecken.
- nachher: +1 ATK gegen Ziele ohne benachbarte Einheit ihres Besitzers. Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf.

### Vorlesefeuer (`dc_b_vorlesefeuer_916`, Einheit) – voll
- vorher: +1 ATK; einmal/Zug: wenn Infanterie im Abschnitt → +1 DEF.
- nachher: +1 DEF, solange eigene Infanterie benachbart ist. · Wörter: Staffelangriff
- Werte: 2/3 → 3/3

### Abschlussgeschütz (`dc_b_abschlussgeschuetz_917`, Einheit) – Regelangleichung mit Kürzung
- vorher: +2 ATK nach einem Kill diesen Zug; ziehe 1 bei Kill. [Abschlussgeschütz]
- nachher: Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.
- entfallen/ersetzt: +2 ATK nach einem Kill diesen Zug

### Mahr-Geschütz (`dc_b_mahr_geschuetz_918`, Einheit) – voll
- vorher: Kostet 1 weniger wenn Unterstützung im Spiel (min. 1). [Mahr-Geschütz]
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. · Wörter: Staffelangriff

### Fälligkeitsfeuer (`dc_b_faelligkeitsfeuer_919`, Einheit) – voll
- vorher: +1 ATK gegen Feinde ohne angrenzende eigene Einheit des Gegners; bei Kill aufdecken. [Fälligkeitsfeuer]
- nachher: +1 ATK gegen Ziele ohne benachbarte Einheit ihres Besitzers. Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Staffelangriff

### Kalden-Batterie (`dc_b_kalden_batterie_920`, Einheit) – Regelangleichung mit Kürzung
- vorher: +2 ATK nach einem Kill diesen Zug; ziehe 1 bei Kill. [Kalden-Batterie]
- nachher: Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.
- entfallen/ersetzt: +2 ATK nach einem Kill diesen Zug

### Manschettenrohr (`dc_b_manschettenrohr_921`, Einheit) – voll
- vorher: +1 ATK, wenn eigene Infanterie angrenzt. [Manschettenrohr]
- nachher: +1 ATK, solange eigene Infanterie benachbart ist. · Wörter: Nachsetzen

### Namenschuss (`dc_b_namenschuss_922`, Einheit) – voll
- vorher: Beim Angriff: Ziel −1 ATK bis Zugende. [Namenschuss]
- nachher: Nach ihrem Angriff: das Ziel hat −1 ATK bis zum Ende des nächsten Zuges. · Wörter: Nachsetzen

### Zeughausrohr (`dc_b_zeughausrohr_735`, Einheit) – voll
- vorher: Beim Angriff: Ziel −1 ATK bis Zugende. [Zeughausrohr]
- nachher: Nach ihrem Angriff: das Ziel hat −1 ATK bis zum Ende des nächsten Zuges. · Wörter: Staffelangriff

### Auffangbatterie (`dc_b_auffangbatterie_736`, Einheit) – voll
- vorher: Beim Angriff: Ziel -1 ATK bis Zugende.
- nachher: Nach ihrem Angriff: das Ziel hat −1 ATK bis zum Ende des nächsten Zuges.

### Sperrfeuer (`dc_b_sperrfeuer_737`, Einheit) – voll
- vorher: Kostet 1 weniger wenn Unterstützung im Spiel (min. 1).
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. · Wörter: Staffelangriff

### Lafettenwacht (`dc_b_lafettenwacht_738`, Einheit) – voll
- vorher: +1 ATK gegen Feinde ohne angrenzende eigene Einheit des Gegners; bei Kill aufdecken. [Lafettenwacht]
- nachher: +1 ATK gegen Ziele ohne benachbarte Einheit ihres Besitzers. Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Stellungswechsel

### Markengeschütz (`dc_b_markengeschuetz_739`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF; ziehe 1 wenn du diesen Zug nicht bewegt hast. [Markengeschütz]
- nachher: — · Wörter: Stellungswechsel
- Werte: 3/2 → 3/3
- entfallen/ersetzt: ziehe 1 wenn du diesen Zug nicht bewegt hast.

### Brückenau-Batterie (`dc_b_brueckenau_batterie_740`, Einheit) – voll
- vorher: Kostet 1 weniger wenn Unterstützung im Spiel (min. 1). [Brückenau-Batterie]
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. · Wörter: Zuteilung

### Dauerrohr (`dc_b_dauerrohr_741`, Einheit) – voll
- vorher: +1 ATK; einmal/Zug: wenn Infanterie im Abschnitt → +1 DEF. [Dauerrohr]
- nachher: +1 DEF, solange eigene Infanterie benachbart ist.
- Werte: 3/3 → 4/3

### Auffangfeuer (`dc_b_auffangfeuer_742`, Einheit) – Regelangleichung mit Kürzung
- vorher: +2 ATK nach einem Kill diesen Zug; ziehe 1 bei Kill. [Auffangfeuer]
- nachher: Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. · Wörter: Durchschlag
- entfallen/ersetzt: +2 ATK nach einem Kill diesen Zug

### Kai-Batterie (`dc_b_kai_batterie_57`, Einheit) – voll
- vorher: +1 ATK gegen Feinde ohne angrenzende eigene Einheit des Gegners; bei Kill aufdecken. [Kai-Batterie]
- nachher: +1 ATK gegen Ziele ohne benachbarte Einheit ihres Besitzers. Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf.

### Straßenfeuer (`dc_b_strassenfeuer_58`, Einheit) – ersetzt
- vorher: +1 ATK, wenn eine Einheit diesen Zug geschoben wurde.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Stellungswechsel
- entfallen/ersetzt: +1 ATK, wenn eine Einheit diesen Zug geschoben wurde.

### Lizenzsalve (`dc_b_lizenzsalve_59`, Einheit) – voll
- vorher: Kostet 1 weniger wenn Unterstützung im Spiel (min. 1). [Lizenzsalve]
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.

### Verspätungsfeuer (`dc_b_verspaetungsfeuer_60`, Einheit) – ersetzt
- vorher: Kostet 1 weniger nach Soforteinsatz diesen Zug.
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. · Wörter: Staffelangriff
- entfallen/ersetzt: Kostet 1 weniger nach Soforteinsatz diesen Zug.

### Staubrain-Rohre (`dc_b_staubrain_rohre_61`, Einheit) – voll
- vorher: +1 ATK; einmal/Zug: wenn Infanterie im Abschnitt → +1 DEF. [Staubrain-Rohre]
- nachher: +1 DEF, solange eigene Infanterie benachbart ist. · Wörter: Nachsetzen
- Werte: 3/3 → 4/3

### Kronenhof-Kaliber (`dc_b_kronenhof_kaliber_62`, Einheit) – Regelangleichung mit Kürzung
- vorher: +2 ATK nach einem Kill diesen Zug; ziehe 1 bei Kill. [Kronenhof-Kaliber]
- nachher: Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. · Wörter: Stellungswechsel
- entfallen/ersetzt: +2 ATK nach einem Kill diesen Zug

### Nachtkai (`dc_b_nachtkai_63`, Einheit) – voll
- vorher: +1 ATK gegen Feinde ohne angrenzende eigene Einheit des Gegners; bei Kill aufdecken. [Nachtkai]
- nachher: +1 ATK gegen Ziele ohne benachbarte Einheit ihres Besitzers. Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf.

### Wegschlag (`dc_b_wegschlag_184`, Einheit) – ersetzt
- vorher: Allen Feinden 1 Schaden; dann schiebe eine eigene Einheit um 1.
- nachher: — · Wörter: Zuteilung, Fernschuss
- entfallen/ersetzt: Allen Feinden 1 Schaden | dann schiebe eine eigene Einheit um 1. | Schlüsselwort Stellungswechsel (max. 2 Grundwörter je Karte)

### Linienrohr (`dc_b_linienrohr_675`, Einheit) – voll
- vorher: +1 ATK, wenn eigene Infanterie angrenzt. [Linienrohr]
- nachher: +1 ATK, solange eigene Infanterie benachbart ist.

### Umgehungsbatterie (`dc_b_umgehungsbatterie_676`, Einheit) – ersetzt
- vorher: Beim Angriff: Ziel -1 DEF bis Zugende.
- nachher: Der erste Schaden je Zug sinkt um 1.
- entfallen/ersetzt: Beim Angriff: Ziel -1 DEF bis Zugende.

### Linienbatterie (`dc_b_linienbatterie_677`, Einheit) – Regelangleichung mit Kürzung
- vorher: +2 ATK wenn eigene Einheit angrenzt; ziehe 1 bei Kill.
- nachher: Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. · Wörter: Durchschlag
- entfallen/ersetzt: +2 ATK wenn eigene Einheit angrenzt

### Marktgeschütz (`dc_b_marktgeschuetz_678`, Einheit) – Regelangleichung mit Kürzung
- vorher: +2 ATK nach einem Kill diesen Zug; ziehe 1 bei Kill. [Marktgeschütz]
- nachher: Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. · Wörter: Nachsetzen
- entfallen/ersetzt: +2 ATK nach einem Kill diesen Zug

### Straßenwurf (`dc_b_strassenwurf_679`, Einheit) – voll
- vorher: Kostet 1 weniger wenn Unterstützung im Spiel (min. 1). [Straßenwurf]
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. · Wörter: Stellungswechsel

### Vorratsrohr (`dc_b_vorratsrohr_680`, Einheit) – voll
- vorher: Einheiten im Abschnitt +1 ATK, wenn du diesen Zug Sofort spielst.
- nachher: Andere eigene Einheiten in ihrem Abschnitt: +1 ATK, wenn du in diesem Zug einen Soforteinsatz gespielt hast. · Wörter: Stellungswechsel

### Sarun-Batterie (`dc_b_sarun_batterie_681`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF; ziehe 1 wenn du diesen Zug bewegt hast.
- nachher: — · Wörter: Fernschuss, Stellungswechsel
- Werte: 3/3 → 3/4
- entfallen/ersetzt: ziehe 1 wenn du diesen Zug bewegt hast.

### Durchlassfeuer (`dc_b_durchlassfeuer_682`, Einheit) – voll
- vorher: +1 ATK gegen Feinde ohne angrenzende eigene Einheit des Gegners; bei Kill aufdecken. [Durchlassfeuer]
- nachher: +1 ATK gegen Ziele ohne benachbarte Einheit ihres Besitzers. Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Stellungswechsel

### Normgeschütz (`dc_b_normgeschuetz_555`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF; ziehe 1 wenn du diesen Zug nicht bewegt hast. [Normgeschütz]
- nachher: — · Wörter: Zuteilung, Stellungswechsel
- Werte: 3/2 → 3/3
- entfallen/ersetzt: ziehe 1 wenn du diesen Zug nicht bewegt hast.

### Feuerleitblatt-Rohr (`dc_b_feuerleitblatt_rohr_556`, Einheit) – ersetzt
- vorher: Beim Angriff: Ziel gilt als beobachtet.
- nachher: +1 ATK gegen beobachtete Ziele.
- entfallen/ersetzt: Beim Angriff: Ziel gilt als beobachtet.

### Planbatterie (`dc_b_planbatterie_557`, Einheit) – voll
- vorher: +2 ATK gegen beobachtete; ziehe 1 bei Kill.
- nachher: +2 ATK gegen beobachtete Ziele. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. · Wörter: Staffelangriff

### Messwurf (`dc_b_messwurf_558`, Einheit) – voll
- vorher: Einheiten im Abschnitt +1 DEF, wenn du diesen Zug Sofort spielst. [Messwurf]
- nachher: Andere eigene Einheiten in ihrem Abschnitt: +1 DEF, wenn du in diesem Zug einen Soforteinsatz gespielt hast. · Wörter: Zuteilung

### Synchronrohr (`dc_b_synchronrohr_559`, Einheit) – voll
- vorher: +1 ATK; einmal/Zug: wenn Infanterie im Abschnitt → +1 ATK.
- nachher: +1 ATK, solange eigene Infanterie benachbart ist.
- Werte: 3/2 → 4/2

### Normartillerie (`dc_b_normartillerie_560`, Einheit) – ersetzt
- vorher: Einheiten im Abschnitt +1 ATK gegen beobachtete.
- nachher: +1 ATK gegen beobachtete Ziele. · Wörter: Staffelangriff
- entfallen/ersetzt: Einheiten im Abschnitt +1 ATK gegen beobachtete.

### Albensee-Batterie (`dc_b_albensee_batterie_561`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF; ziehe 1 wenn Freigabe-/Sofort diesen Zug.
- nachher: — · Wörter: Zuteilung
- Werte: 3/3 → 3/4
- entfallen/ersetzt: ziehe 1 wenn Freigabe-/Sofort diesen Zug.

### Großfeuer (`dc_b_grossfeuer_562`, Einheit) – Regelangleichung mit Kürzung
- vorher: +1 ATK wenn Ziel beobachtet; bei Kill weitere aufdecken.
- nachher: +1 ATK gegen beobachtete Ziele. · Wörter: Zuteilung
- entfallen/ersetzt: bei Kill weitere aufdecken.

### Kai-Batterie (`dc_b_kai_batterie_495`, Einheit) – voll
- vorher: +1 ATK, wenn Unterstützung im Abschnitt.
- nachher: +1 ATK, solange du eine offene Unterstützung hast.

### Bahnfeuer (`dc_b_bahnfeuer_496`, Einheit) – ersetzt
- vorher: +1 ATK gegen Feinde in Abschnitten ohne eigene Unterstützung.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK.
- entfallen/ersetzt: +1 ATK gegen Feinde in Abschnitten ohne eigene Unterstützung.

### Entsatzrohr (`dc_b_entsatzrohr_497`, Einheit) – ersetzt
- vorher: +2 ATK, wenn Zielabschnitt zuletzt angegriffen.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Stellungswechsel
- entfallen/ersetzt: +2 ATK, wenn Zielabschnitt zuletzt angegriffen.

### Lagerwurf (`dc_b_lagerwurf_498`, Einheit) – voll
- vorher: Kostet 1 weniger wenn Unterstützung im Spiel (min. 1). [Lagerwurf]
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.

### Straßenfeuer (`dc_b_strassenfeuer_499`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 ATK; einmal/Zug: Unterstützung im Abschnitt → +1 ATK.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Staffelangriff
- Werte: 3/2 → 4/2
- entfallen/ersetzt: einmal/Zug: Unterstützung im Abschnitt → +1 ATK.

### Kleinkai-Salve (`dc_b_kleinkai_salve_500`, Einheit) – voll
- vorher: Einheiten im Abschnitt +1 ATK, wenn Unterstützung liegt.
- nachher: Andere eigene Einheiten in ihrem Abschnitt: +1 ATK, solange du eine offene Unterstützung hast. · Wörter: Zuteilung

### Hintermark-Rohr (`dc_b_hintermark_rohr_501`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF; ziehe 1 wenn Entsatz diesen Zug.
- nachher: — · Wörter: Zuteilung
- Werte: 3/3 → 3/4
- entfallen/ersetzt: ziehe 1 wenn Entsatz diesen Zug.

### Volle Front (`dc_b_volle_front_502`, Einheit) – voll
- vorher: +1 ATK, wenn im Abschnitt eine Unterstützung liegt.
- nachher: +1 ATK, solange du eine offene Unterstützung hast.

### Signalfeuer-Rohr (`dc_b_signalfeuer_rohr_78`, Einheit) – voll
- vorher: Beim Angriff: Ziel −1 ATK bis Zugende. [Signalfeuer-Rohr]
- nachher: Nach ihrem Angriff: das Ziel hat −1 ATK bis zum Ende des nächsten Zuges.

### Steinschlag-Batterie (`dc_b_steinschlag_batterie_79`, Einheit) – ersetzt
- vorher: Angriff: 1 Schaden auch an einrückendem Feind im Abschnitt.
- nachher: +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.
- entfallen/ersetzt: Angriff: 1 Schaden auch an einrückendem Feind im Abschnitt.

### Warnsalve (`dc_b_warnsalve_80`, Einheit) – ersetzt
- vorher: Beim Ausspielen: einrückender Feind −1 ATK bis Zugende.
- nachher: +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind. · Wörter: Stellungswechsel
- entfallen/ersetzt: Beim Ausspielen: einrückender Feind −1 ATK bis Zugende.

### Eidhof-Kaliber (`dc_b_eidhof_kaliber_81`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF; ziehe 1 wenn du diesen Zug nicht bewegt hast. [Eidhof-Kaliber]
- nachher: — · Wörter: Stellungswechsel
- Werte: 2/2 → 2/3
- entfallen/ersetzt: ziehe 1 wenn du diesen Zug nicht bewegt hast.

### Passzoll-Rohr (`dc_b_passzoll_rohr_82`, Einheit) – voll
- vorher: +1 ATK, wenn 2+ eigene Abschnitte besetzt.
- nachher: +1 ATK, wenn du in 2+ Abschnitten Einheiten hast.

### Talbruck-Geschütz (`dc_b_talbruck_geschuetz_83`, Einheit) – ersetzt
- vorher: +2 ATK, wenn Ziel einrückt.
- nachher: +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind. · Wörter: Stellungswechsel
- entfallen/ersetzt: +2 ATK, wenn Ziel einrückt.

### Nachtengen (`dc_b_nachtengen_84`, Einheit) – ersetzt
- vorher: Verdeckt spielbar. Aufgedeckt: +1 ATK gegen Einrückende.
- nachher: +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind. · Wörter: Nachsetzen
- entfallen/ersetzt: Aufgedeckt: +1 ATK gegen Einrückende.

### Enger Weg (`dc_b_enger_weg_223`, Einheit) – ersetzt
- vorher: Einmal/Zug: einrückende Einheit im gewählten Abschnitt erleidet 2 Schaden.
- nachher: +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind. · Wörter: Staffelangriff
- entfallen/ersetzt: Einmal/Zug: einrückende Einheit im gewählten Abschnitt erleidet 2 Schaden.

### Deckungsfeuer (`dc_b_deckungsfeuer_315`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 ATK; eigene im Zielabschnitt +1 DEF diesen Zug.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Durchschlag
- Werte: 3/2 → 4/2
- entfallen/ersetzt: eigene im Zielabschnitt +1 DEF diesen Zug.

### Ruhebatterie (`dc_b_ruhebatterie_316`, Einheit) – voll
- vorher: +1 ATK, wenn du diesen Zug heilst.
- nachher: +1 ATK, wenn du in diesem Zug geheilt hast.

### Sperrfeuer-Etappe (`dc_b_sperrfeuer_etappe_317`, Einheit) – ersetzt
- vorher: Nach Angriff: Abschnitt +1 DEF bis Zugende.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Staffelangriff
- entfallen/ersetzt: Nach Angriff: Abschnitt +1 DEF bis Zugende.

### Seren-Kaliber (`dc_b_seren_kaliber_318`, Einheit) – voll
- vorher: Kostet 1 weniger bei Heilung in diesem Zug.
- nachher: Kostet 1 AP weniger (mind. 1), wenn du in diesem Zug geheilt hast. · Wörter: Stellungswechsel

### Grünfeld-Rohr (`dc_b_gruenfeld_rohr_319`, Einheit) – voll
- vorher: Beim Angriff: Ziel −1 ATK bis Zugende. [Grünfeld-Rohr]
- nachher: Nach ihrem Angriff: das Ziel hat −1 ATK bis zum Ende des nächsten Zuges. · Wörter: Fernschuss

### Vollschutz (`dc_b_vollschutz_320`, Einheit) – ersetzt
- vorher: Eigene Einheiten +1 DEF; ruhende +1 ATK bis Ende nächsten Zugs.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Staffelangriff
- entfallen/ersetzt: Eigene Einheiten +1 DEF | ruhende +1 ATK bis Ende nächsten Zugs.

### Kontrollsalve (`dc_b_kontrollsalve_321`, Einheit) – ersetzt
- vorher: Feind −1 ATK; wenn er nicht ruht, zusätzlich −1 DEF.
- nachher: Der erste Schaden je Zug sinkt um 1.
- entfallen/ersetzt: Feind −1 ATK | wenn er nicht ruht, zusätzlich −1 DEF.

### Lückenhof-Geschütz (`dc_b_lueckenhof_geschuetz_322`, Einheit) – Regelangleichung mit Kürzung
- vorher: +1 ATK gegen aufgeklärte; heile 1 an ruhender Einheit.
- nachher: +1 ATK gegen beobachtete Ziele. · Wörter: Durchschlag
- entfallen/ersetzt: heile 1 an ruhender Einheit.

### Schmiedefeuer-Rohr (`dc_b_schmiedefeuer_rohr_99`, Einheit) – voll
- vorher: +1 ATK gegen Ziele ohne Ausrüstung.
- nachher: +1 ATK gegen Ziele ohne Ausrüstung. · Wörter: Zuteilung

### Bergungsbatterie (`dc_b_bergungsbatterie_100`, Einheit) – voll
- vorher: Zerstörst du Feind: heile 1 an eigener Einheit.
- nachher: Zerstört sie im Angriff eine Einheit: heile 1 DEF an einer eigenen Einheit. · Wörter: Fernschuss

### Untersuchungsalve (`dc_b_untersuchungsalve_101`, Einheit) – ersetzt
- vorher: Beim Ausspielen: Feind −1 ATK; ziehe 1 wenn er stirbt.
- nachher: — · Wörter: Fernschuss, Zuteilung
- entfallen/ersetzt: Beim Ausspielen: Feind −1 ATK | ziehe 1 wenn er stirbt.

### Kareth-Kaliber (`dc_b_kareth_kaliber_102`, Einheit) – ersetzt
- vorher: —
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Erbitterung

### Valeris-Rohr (`dc_b_valeris_rohr_103`, Einheit) – ersetzt
- vorher: Kostet 1 weniger bei 2+ Ausrüstungen im Spiel.
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.
- entfallen/ersetzt: Kostet 1 weniger bei 2+ Ausrüstungen im Spiel.

### Schutzsalve (`dc_b_schutzsalve_104`, Einheit) – ersetzt
- vorher: Eigene Einheiten mit Ausrüstung +1 DEF diesen Zug nach Angriff.
- nachher: Der erste Schaden je Zug sinkt um 1.
- entfallen/ersetzt: Eigene Einheiten mit Ausrüstung +1 DEF diesen Zug nach Angriff.

### Marenfeld-Geschütz (`dc_b_marenfeld_geschuetz_105`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF; heile 1 wenn Feind stirbt.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit. · Wörter: Fernschuss
- Werte: 3/3 → 3/4
- entfallen/ersetzt: heile 1 wenn Feind stirbt.

### Letzte Platte (`dc_b_letzte_platte_262`, Einheit) – ersetzt
- vorher: Trägerwirkung: Einheiten mit Ausrüstung +1 ATK; Feindtötung: +1 DEF alle Abschnitte bis Ende nächsten Zugs.
- nachher: Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. · Wörter: Durchschlag
- entfallen/ersetzt: Trägerwirkung: Einheiten mit Ausrüstung +1 ATK | Feindtötung: +1 DEF alle Abschnitte bis Ende nächsten Zugs.

### Volle Sicht (`dc_b_volle_sicht_435`, Einheit) – ersetzt
- vorher: Alle Feinde im Zielabschnitt gelten als aufgeklärt; +1 ATK gegen sie.
- nachher: +1 ATK gegen beobachtete Ziele. · Wörter: Fernschuss, Durchschlag
- entfallen/ersetzt: Alle Feinde im Zielabschnitt gelten als aufgeklärt | +1 ATK gegen sie.

### Zielrechnung (`dc_b_zielrechnung_436`, Einheit) – Regelangleichung mit Kürzung
- vorher: +2 ATK gegen aufgeklärte; kostet 1 weniger nach Aufdecken.
- nachher: +2 ATK gegen beobachtete Ziele.
- entfallen/ersetzt: kostet 1 weniger nach Aufdecken.

### Punktrohr (`dc_b_punktrohr_437`, Einheit) – voll
- vorher: Kostet 1 weniger wenn Unterstützung im Spiel (min. 1). [Punktrohr]
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.

### Randmess-Kaliber (`dc_b_randmess_kaliber_438`, Einheit) – ersetzt
- vorher: Wenn Angriff scheitert: Feind −1 ATK; ziehe 1.
- nachher: — · Wörter: Zuteilung
- entfallen/ersetzt: Wenn Angriff scheitert: Feind −1 ATK | ziehe 1.

### Feuerleit (`dc_b_feuerleit_439`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke Feind auf; +2 ATK gegen ihn diesen Zug.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: +2 ATK gegen ihn diesen Zug.

### Feuerleitstand (`dc_b_feuerleitstand_440`, Einheit) – ersetzt
- vorher: Einheiten im Abschnitt +1 ATK gegen aufgeklärte.
- nachher: +1 ATK gegen beobachtete Ziele. · Wörter: Fernschuss
- entfallen/ersetzt: Einheiten im Abschnitt +1 ATK gegen aufgeklärte.

### Probenheim-Rohr (`dc_b_probenheim_rohr_441`, Einheit) – voll
- vorher: Kostet 1 weniger wenn Feind aufgeklärt.
- nachher: Kostet 1 AP weniger (mind. 1), solange eine gegnerische Einheit beobachtet ist. · Wörter: Zuteilung

### Abbruchsalve (`dc_b_abbruchsalve_442`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 ATK; bei Miss (kein Kill): Abschnitt +1 DEF.
- nachher: Der erste Schaden je Zug sinkt um 1.
- Werte: 3/3 → 4/3
- entfallen/ersetzt: bei Miss: Abschnitt +1 DEF.

### Zielmesser (`dc_b_zielmesser_146`, Einheit) – Regelangleichung mit Kürzung
- vorher: Feind aufgeklärt; eigene Artillerie +1 ATK gegen ihn diesen Zug.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: eigene Artillerie +1 ATK gegen ihn diesen Zug.

### Verbrauchsspäher (`dc_b_verbrauchsspaeher_147`, Einheit) – voll
- vorher: Eigene Einheit stirbt: ziehe 1 (einmal/Zug).
- nachher: Einmal pro Zug, wenn eine andere eigene Einheit zerstört wird: ziehe 1 Karte. · Wörter: Zuteilung

### Depotläufer (`dc_b_depotlaeufer_148`, Einheit) – ersetzt
- vorher: Zerstörst du aufgeklärte Unterstützung/Ausrüstung: ziehe 1.
- nachher: +1 ATK gegen beobachtete Ziele.
- entfallen/ersetzt: Zerstörst du aufgeklärte Unterstützung/Ausrüstung: ziehe 1.

### Lagebild (`dc_b_lagebild_149`, Einheit) – Regelangleichung mit Kürzung
- vorher: Schaue oberste Karte; behalte oder lege unten.
- nachher: — · Wörter: Zuteilung
- entfallen/ersetzt: behalte oder lege unten.

### Wellenmelder (`dc_b_wellenmelder_20`, Einheit) – ersetzt
- vorher: —
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Zuteilung

### Passläufer (`dc_b_passlaeufer_21`, Einheit) – ersetzt
- vorher: +1 ATK gegen Einheiten mit 3 oder weniger DEF.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Fernschuss
- entfallen/ersetzt: +1 ATK gegen Einheiten mit 3 oder weniger DEF.

### Ritusspäher (`dc_b_ritusspaeher_106`, Einheit) – ersetzt
- vorher: Einmal pro Zug: die nächste Infanterie, die du spielst, kostet 1 weniger (mind. 1).
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.
- entfallen/ersetzt: Einmal pro Zug: die nächste Infanterie, die du spielst, kostet 1 weniger (mind. 1).

### Bannerläufer (`dc_b_bannerlaeufer_107`, Einheit) – ersetzt
- vorher: Beim Ausspielen: eine eigene Infanterie im Abschnitt erhält +1 ATK bis Zugende.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK.
- entfallen/ersetzt: Beim Ausspielen: eine eigene Infanterie im Abschnitt erhält +1 ATK bis Zugende.

### Kronreiter (`dc_b_kronreiter_620`, Einheit) – voll
- vorher: Aufdecken: ziehe 1 Karte.
- nachher: Beim Ausspielen oder Aufdecken: ziehe 1 Karte. · Wörter: Gefechtsbereit

### Erbe-Späher (`dc_b_erbe_spaeher_621`, Einheit) – Regelangleichung mit Kürzung
- vorher: Schaue oberste 3; behalte 1 Sofort-/Unterstützung. [Erbe-Späher]
- nachher: — · Wörter: Zuteilung
- entfallen/ersetzt: behalte 1 Sofort-/Unterstützung.

### Stillnarbe-Melder (`dc_b_stillnarbe_melder_622`, Einheit) – voll
- vorher: Wenn eine eigene Einheit im selben Abschnitt zerstört wird: ziehe 1 Karte.
- nachher: Einmal pro Zug, wenn eine andere eigene Einheit in ihrem Abschnitt zerstört wird: ziehe 1 Karte.

### Neuhoff-Augen (`dc_b_neuhoff_augen_623`, Einheit) – ersetzt
- vorher: Einmal pro Zug: schaue die oberste Karte deines Decks an.
- nachher: Der erste Schaden je Zug sinkt um 1.
- entfallen/ersetzt: Einmal pro Zug: schaue die oberste Karte deines Decks an.

### Kunstauge (`dc_b_kunstauge_380`, Einheit) – ersetzt
- vorher: Aufdecken: schaue die oberste Karte des gegnerischen Decks an.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Gefechtsbereit
- entfallen/ersetzt: Aufdecken: schaue die oberste Karte des gegnerischen Decks an.

### Nervenspäher (`dc_b_nervenspaeher_381`, Einheit) – ersetzt
- vorher: +1 ATK gegen verdeckte Einheiten. Kann verdeckt gespielt werden.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK.
- entfallen/ersetzt: +1 ATK gegen verdeckte Einheiten.

### Leistungszähler (`dc_b_leistungszaehler_382`, Einheit) – ersetzt
- vorher: Wenn eine eigene Einheit im selben Abschnitt Schaden nimmt: ziehe 1.
- nachher: — · Wörter: Heranführung, Zuteilung
- entfallen/ersetzt: Wenn eine eigene Einheit im selben Abschnitt Schaden nimmt: ziehe 1.

### Schnitt-Melder (`dc_b_schnitt_melder_383`, Einheit) – ersetzt
- vorher: Wenn eine eigene Einheit zerstört wird: ziehe 1 und füge einer eigenen Einheit 1 Schaden zu.
- nachher: — · Wörter: Gefechtsbereit, Zuteilung
- entfallen/ersetzt: Wenn eine eigene Einheit zerstört wird: ziehe 1 und füge einer eigenen Einheit 1 Schaden zu.

### Lina-Melder (`dc_b_lina_melder_803`, Einheit) – Regelangleichung mit Kürzung
- vorher: Einmal/Zug: decke auf; eine eigene Einheit +1 ATK.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Zuteilung
- entfallen/ersetzt: eine eigene Einheit +1 ATK.

### Ed-Ruh-Pfad (`dc_b_ed_ruh_pfad_804`, Einheit) – Regelangleichung mit Kürzung
- vorher: Schaue oberste 3; behalte 1 Sofort-/Unterstützung.
- nachher: — · Wörter: Zuteilung
- entfallen/ersetzt: behalte 1 Sofort-/Unterstützung.

### Lage-Offen (`dc_b_lage_offen_805`, Einheit) – Regelangleichung mit Kürzung
- vorher: Schaue oberste 3; behalte 1 Sofort-/Unterstützung; decke 1 auf.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Gefechtsbereit, Zuteilung
- entfallen/ersetzt: behalte 1 Sofort-/Unterstützung

### Quellenläufer (`dc_b_quellenlaeufer_806`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke auf; ziehe 1 wenn Feind angrenzt. [Quellenläufer]
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Gefechtsbereit
- entfallen/ersetzt: ziehe 1 wenn Feind angrenzt.

### Aktenleser (`dc_b_aktenleser_863`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke auf; ziehe 1.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: ziehe 1.

### Gegenlage-Melder (`dc_b_gegenlage_melder_864`, Einheit) – Regelangleichung mit Kürzung
- vorher: Einmal/Zug: decke auf; eine eigene Einheit +1 DEF.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Stellungswechsel
- entfallen/ersetzt: eine eigene Einheit +1 DEF.

### Doppelversion (`dc_b_doppelversion_865`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke auf; ziehe 1 wenn Feind angrenzt. [Doppelversion]
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Fernschuss
- entfallen/ersetzt: ziehe 1 wenn Feind angrenzt.

### Stillrain-Läufer (`dc_b_stillrain_laeufer_866`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke auf; ziehe 1. [Stillrain-Läufer]
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: ziehe 1.

### Abschriftleser (`dc_b_abschriftleser_923`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke auf; ziehe 1 wenn Feind angrenzt.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Gefechtsbereit
- entfallen/ersetzt: ziehe 1 wenn Feind angrenzt.

### Datums-Melder (`dc_b_datums_melder_924`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke auf; ziehe 1. [Datums-Melder]
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Heranführung
- entfallen/ersetzt: ziehe 1.

### Gegenrechnung (`dc_b_gegenrechnung_925`, Einheit) – Regelangleichung mit Kürzung
- vorher: Schaue oberste 3; behalte 1 Sofort-/Unterstützung. (Gegenrechnung)
- nachher: — · Wörter: Zuteilung
- entfallen/ersetzt: behalte 1 Sofort-/Unterstützung.

### Selm-Läufer (`dc_b_selm_laeufer_926`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke auf; ziehe 1 wenn Feind angrenzt. [Selm-Läufer]
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Heranführung
- entfallen/ersetzt: ziehe 1 wenn Feind angrenzt.

### Markenspäher (`dc_b_markenspaeher_743`, Einheit) – Regelangleichung mit Kürzung
- vorher: Einmal/Zug: decke auf; eine eigene Einheit +1 DEF. [Markenspäher]
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: eine eigene Einheit +1 DEF.

### Gassenmelder (`dc_b_gassenmelder_744`, Einheit) – Regelangleichung mit Kürzung
- vorher: Schaue oberste 3; behalte 1 Sofort-/Unterstützung. [Gassenmelder]
- nachher: — · Wörter: Gefechtsbereit, Zuteilung
- entfallen/ersetzt: behalte 1 Sofort-/Unterstützung.

### Grenzlese (`dc_b_grenzlese_745`, Einheit) – Regelangleichung mit Kürzung
- vorher: Schaue oberste 3; behalte 1 Sofort-/Unterstützung. [Grenzlese]
- nachher: — · Wörter: Zuteilung
- entfallen/ersetzt: behalte 1 Sofort-/Unterstützung.

### Schulrain-Läufer (`dc_b_schulrain_laeufer_746`, Einheit) – Regelangleichung mit Kürzung
- vorher: Schaue oberste 3; behalte 1 Sofort-/Unterstützung. [Schulrain-Läufer]
- nachher: — · Wörter: Gefechtsbereit, Zuteilung
- entfallen/ersetzt: behalte 1 Sofort-/Unterstützung.

### Wegspäher (`dc_b_wegspaeher_185`, Einheit) – Regelangleichung mit Kürzung
- vorher: Feind aufgeklärt; nächstes Schieben kostet 0 zusätzlich.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Heranführung
- entfallen/ersetzt: nächstes Schieben kostet 0 zusätzlich.

### Warteblatt-Läufer (`dc_b_warteblatt_laeufer_186`, Einheit) – ersetzt
- vorher: Wenn du schiebst: ziehe 1 (einmal/Zug).
- nachher: — · Wörter: Gefechtsbereit, Stellungswechsel
- entfallen/ersetzt: Wenn du schiebst: ziehe 1 (einmal/Zug).

### Lizenzmelder (`dc_b_lizenzmelder_187`, Einheit) – ersetzt
- vorher: Zerstörst du aufgeklärte Unterstützung: ziehe 1.
- nachher: +1 ATK gegen beobachtete Ziele. · Wörter: Heranführung
- entfallen/ersetzt: Zerstörst du aufgeklärte Unterstützung: ziehe 1.

### Fahrplanblick (`dc_b_fahrplanblick_188`, Einheit) – Regelangleichung mit Kürzung
- vorher: Einmal/Zug: decke auf; eine eigene Einheit +1 DEF. [Fahrplanblick]
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Stellungswechsel
- entfallen/ersetzt: eine eigene Einheit +1 DEF.

### Pfadfinder (`dc_b_pfadfinder_683`, Einheit) – Regelangleichung mit Kürzung
- vorher: Einmal/Zug: decke auf; eine eigene Einheit darf 1 Abschnitt umgehen.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: eine eigene Einheit darf 1 Abschnitt umgehen.

### Zollspäher (`dc_b_zollspaeher_684`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke auf; ziehe 1 wenn Feind angrenzt. [Zollspäher]
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Stellungswechsel
- entfallen/ersetzt: ziehe 1 wenn Feind angrenzt.

### Meldekarawane (`dc_b_meldekarawane_685`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke auf; ziehe 1. [Meldekarawane]
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: ziehe 1.

### Abseitsläufer (`dc_b_abseitslaeufer_686`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke auf; ziehe 1 wenn Feind angrenzt ohne eigene Nachbarn.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: ziehe 1 wenn Feind angrenzt ohne eigene Nachbarn.

### Beobachtungsposten (`dc_b_beobachtungsposten_563`, Einheit) – Regelangleichung mit Kürzung
- vorher: Einmal/Zug: decke auf; Ziel gilt als beobachtet.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: Ziel gilt als beobachtet.

### Feldmesser (`dc_b_feldmesser_564`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke auf; +1 DEF bis Zugende.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Stellungswechsel
- entfallen/ersetzt: +1 DEF bis Zugende.

### Meldekette (`dc_b_meldekette_565`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke auf; ziehe 1. [Meldekette]
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Zuteilung
- entfallen/ersetzt: ziehe 1.

### Peiltrupp (`dc_b_peiltrupp_566`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke auf; ziehe 1 wenn Feind beobachtet angrenzt.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Zuteilung
- entfallen/ersetzt: ziehe 1 wenn Feind beobachtet angrenzt.

### Zollspäher (`dc_b_zollspaeher_503`, Einheit) – Regelangleichung mit Kürzung
- vorher: Einmal/Zug: decke auf; wenn Unterstützung im Abschnitt, ziehe 1.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Heranführung
- entfallen/ersetzt: wenn Unterstützung im Abschnitt, ziehe 1.

### Wegmelder (`dc_b_wegmelder_504`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke auf; +1 DEF wenn Abschnitt zuletzt angegriffen.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Zuteilung
- entfallen/ersetzt: +1 DEF wenn Abschnitt zuletzt angegriffen.

### Kaihof-Auge (`dc_b_kaihof_auge_505`, Einheit) – Regelangleichung mit Kürzung
- vorher: Schaue oberste 3; behalte 1 Unterstützungs-/Einsatzkarte.
- nachher: — · Wörter: Heranführung, Zuteilung
- entfallen/ersetzt: behalte 1 Unterstützungs-/Einsatzkarte.

### Restzähler (`dc_b_restzaehler_506`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke auf; ziehe 1 wenn Feind ohne Unterstützung angrenzt.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: ziehe 1 wenn Feind ohne Unterstützung angrenzt.

### Bergführer (`dc_b_bergfuehrer_224`, Einheit) – voll
- vorher: Feind aufgeklärt; +1 ATK gegen Einrückende diesen Zug.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind. · Wörter: Stellungswechsel

### Hangläufer (`dc_b_hanglaeufer_225`, Einheit) – ersetzt
- vorher: Wenn Feind einrückt: ziehe 1 (einmal/Zug).
- nachher: +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind. · Wörter: Stellungswechsel
- entfallen/ersetzt: Wenn Feind einrückt: ziehe 1 (einmal/Zug).

### Pfadwächter (`dc_b_pfadwaechter_226`, Einheit) – ersetzt
- vorher: Zerstörst du einrückende Einheit: ziehe 1.
- nachher: +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.
- entfallen/ersetzt: Zerstörst du einrückende Einheit: ziehe 1.

### Abschriftblick (`dc_b_abschriftblick_227`, Einheit) – Regelangleichung mit Kürzung
- vorher: Schaue oberste 2; behalte 1, lege 1 unten.
- nachher: — · Wörter: Zuteilung
- entfallen/ersetzt: behalte 1, lege 1 unten.

### Meldeläufer (`dc_b_meldelaeufer_323`, Einheit) – voll
- vorher: Feind aufdecken; ziehe 1 wenn du diesen Zug heilst.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug geheilt hast.

### Aktenblick (`dc_b_aktenblick_324`, Einheit) – Regelangleichung mit Kürzung
- vorher: Schaue oberste 2; behalte 1 Heilungs-/Unterstützungs-Karte.
- nachher: — · Wörter: Heranführung, Zuteilung
- entfallen/ersetzt: behalte 1 Heilungs-/Unterstützungs-Karte.

### Ringwächter (`dc_b_ringwaechter_325`, Einheit) – Regelangleichung mit Kürzung, Rest ersetzt
- vorher: +1 DEF; Feinde im Abschnitt können nicht verdeckt bleiben.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Stellungswechsel
- Werte: 2/3 → 2/4
- entfallen/ersetzt: Feinde im Abschnitt können nicht verdeckt bleiben.

### Formularspäher (`dc_b_formularspaeher_326`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke Feind auf; wenn er diesen Zug angreift, −1 ATK.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Fernschuss
- entfallen/ersetzt: wenn er diesen Zug angreift, −1 ATK.

### Linsenläufer (`dc_b_linsenlaeufer_263`, Einheit) – Regelangleichung mit Kürzung
- vorher: Feind aufgeklärt; +1 ATK wenn Ziel Ausrüstung hat.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: +1 ATK wenn Ziel Ausrüstung hat.

### Grenzmelder (`dc_b_grenzmelder_264`, Einheit) – voll
- vorher: Wenn eigene Einheit stirbt: ziehe 1 (einmal/Zug).
- nachher: Einmal pro Zug, wenn eine andere eigene Einheit zerstört wird: ziehe 1 Karte.

### Hofspäher (`dc_b_hofspaeher_265`, Einheit) – Regelangleichung mit Kürzung
- vorher: Schaue oberste 2 Ausrüstungen/Einheiten; behalte 1.
- nachher: — · Wörter: Zuteilung
- entfallen/ersetzt: behalte 1.

### Namensblick (`dc_b_namensblick_266`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke Feind auf; wenn er stirbt diesen Zug, heile 1.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Zuteilung
- entfallen/ersetzt: wenn er stirbt diesen Zug, heile 1.

### Beobachter (`dc_b_beobachter_443`, Einheit) – voll
- vorher: Einmal/Zug: decke eine gegnerische Einheit auf.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Fernschuss

### Lokalisierer (`dc_b_lokalisierer_444`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke auf; ziehe 1 wenn Ziel DEF ≤ 2.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Fernschuss
- entfallen/ersetzt: ziehe 1 wenn Ziel DEF ≤ 2.

### Methodenspäher (`dc_b_methodenspaeher_445`, Einheit) – Regelangleichung mit Kürzung
- vorher: Schaue oberste 3; behalte 1 Aufklärungs-/Einsatzkarte.
- nachher: — · Wörter: Zuteilung
- entfallen/ersetzt: behalte 1 Aufklärungs-/Einsatzkarte.

### Trotzmelder (`dc_b_trotzmelder_446`, Einheit) – Regelangleichung mit Kürzung
- vorher: Decke auf; wenn Ziel diesen Zug angreift, −1 ATK.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: wenn Ziel diesen Zug angreift, −1 ATK.

### Kommandogruppe (`dc_eh_kommando`, Einheit) – abkürzung
- vorher: Nachbarn +2 V. Beide Flanken Infanterie: kämpft nach dem Angreifer in deren Gefecht mit.
- nachher: Nachbarn +2 DEF. Beide Flanken Infanterie: kämpft nach dem Angreifer in deren Gefecht mit.

### Panzerzug Faustkeil (`dc_eh_faustkeil`, Einheit) – abkürzung
- vorher: Führungsfahrzeug: +2 V wenn eine Flanke gepanzert ist.
- nachher: Führungsfahrzeug: +2 DEF wenn eine Flanke gepanzert ist. · Wörter: Nachsetzen, Sicherung
- Hinweis: Werte 14 weit über Median 9 bei 5 AP

### Scharfschütze (`dc_eh_sniper`, Einheit) – abkürzung
- vorher: +2 A gegen Infanterie.
- nachher: +2 ATK gegen Infanterie. · Wörter: Hinterhalt, Staffelangriff, Absetzen

### Konzernsekundant (`dc_b_konzernsekundant_150`, Einheit) – ersetzt
- vorher: Einmal/Zug: eigener Panzer oder Artillerie +1 ATK.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Heranführung
- entfallen/ersetzt: Einmal/Zug: eigener Panzer oder Artillerie +1 ATK.

### Werkmeister Front (`dc_b_werkmeister_front_151`, Einheit) – voll
- vorher: Beim Ausspielen: heile 2 verteilt auf Panzer/Artillerie.
- nachher: Beim Ausspielen: heile 2 DEF an deiner am stärksten beschädigten Einheit. · Wörter: Zähigkeit, Sicherung

### Kriegsaktie (`dc_b_kriegsaktie_152`, Einheit) – ersetzt
- vorher: Soforteinsatz kostet 1 weniger (min. 1).
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.
- entfallen/ersetzt: Soforteinsatz kostet 1 weniger (min. 1).

### Glaubenszeuge (`dc_b_glaubenszeuge_108`, Einheit) – ersetzt
- vorher: Opfere diese Einheit: eine gegnerische Einheit im Abschnitt erleidet 3 Schaden.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Erbitterung, Durchschlag
- entfallen/ersetzt: Opfere diese Einheit: eine gegnerische Einheit im Abschnitt erleidet 3 Schaden.

### Eifererzug (`dc_b_eifererzug_109`, Einheit) – voll
- vorher: +2 ATK.
- nachher: — · Wörter: Überlast
- Werte: 4/3 → 6/3

### Maßkommandant (`dc_b_masskommandant_110`, Einheit) – ersetzt
- vorher: Beim Ausspielen: eigene Infanterie im Abschnitt +1 ATK bis Zugende.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK.
- entfallen/ersetzt: Beim Ausspielen: eigene Infanterie im Abschnitt +1 ATK bis Zugende.

### Silberschwur (`dc_b_silberschwur_624`, Einheit) – ersetzt
- vorher: Einmal/Zug: ersetze eine eigene beschädigte Einheit durch eine aus der Hand (Kostendifferenz zahlen). Die Neue +1 DEF.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Erbitterung
- entfallen/ersetzt: Einmal/Zug: ersetze eine eigene beschädigte Einheit durch eine aus der Hand. | Die Neue +1 DEF.

### Kronmarschall (`dc_b_kronmarschall_625`, Einheit) – ersetzt
- vorher: Beim Ausspielen: eine eigene Einheit ignoriert Schaden bis Zugende. Am Zugende: erleide 1 Schaden an einer eigenen Einheit.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Durchschlag, Staffelangriff
- entfallen/ersetzt: Beim Ausspielen: eine eigene Einheit ignoriert Schaden bis Zugende. | Am Zugende: erleide 1 Schaden an einer eigenen Einheit.

### Veteranenrat (`dc_b_veteranenrat_626`, Einheit) – Regelangleichung mit Kürzung
- vorher: Einheiten hier +1 ATK/+1 DEF. Einmal/Zug: negiere 1 Schaden; danach kostet deine nächste Sofort +1 AP.
- nachher: Andere eigene Einheiten in ihrem Abschnitt: +1 ATK und +1 DEF. Der erste Schaden je Zug sinkt um 1. · Wörter: Nachsetzen
- entfallen/ersetzt: danach kostet deine nächste Sofort +1 AP.

### Optimat (`dc_b_optimat_384`, Einheit) – ersetzt
- vorher: Einmal/Zug: wähle eine eigene Einheit; +2 ATK bis Zugende, sie erleidet 1 Schaden. Wenn sie überlebt: ziehe 1.
- nachher: — · Wörter: Zuteilung
- entfallen/ersetzt: Einmal/Zug: wähle eine eigene Einheit | +2 ATK bis Zugende, sie erleidet 1 Schaden. | Wenn sie überlebt: ziehe 1.

### Chirurgenrat (`dc_b_chirurgenrat_385`, Einheit) – ersetzt
- vorher: Beim Ausspielen: teile 2 Schaden auf eigene Einheiten auf; alle beschädigten eigenen Einheiten +1 ATK.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Nachsetzen, Erbitterung
- entfallen/ersetzt: Beim Ausspielen: teile 2 Schaden auf eigene Einheiten auf | alle beschädigten eigenen Einheiten +1 ATK.

### Maßkommandant (`dc_b_masskommandant_386`, Einheit) – Regelangleichung mit Kürzung
- vorher: Einheiten hier +1 ATK solange beschädigt. Einmal/Zug: opfere 1 DEF an einer Einheit hier → heile 2 an einer anderen.
- nachher: Andere eigene Einheiten in ihrem Abschnitt: +1 ATK, solange diese Einheit beschädigt ist.
- entfallen/ersetzt: Einmal/Zug: opfere 1 DEF an einer Einheit hier → heile 2 an einer anderen.

### Lina Nov (`dc_b_lina_nov_807`, Einheit) – ersetzt
- vorher: Einmal/Zug: decke 1–2 auf. Einheiten hier +1 ATK gegen Aufgeklärte; einmal/Spiel: spiele Sofort 1 billiger (min. 0).
- nachher: +1 ATK gegen beobachtete Ziele.
- entfallen/ersetzt: Einmal/Zug: decke 1–2 auf. | Einheiten hier +1 ATK gegen Aufgeklärte | einmal/Spiel: spiele Sofort 1 billiger (min. 0).

### Ed Ruh (`dc_b_ed_ruh_808`, Einheit) – ersetzt
- vorher: Beim Ausspielen: decke 1 auf und ziehe 1. Einheiten hier +1 DEF, wenn du diesen Zug keine Sofort spielst.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Abschirmung
- entfallen/ersetzt: Beim Ausspielen: decke 1 auf und ziehe 1. | Einheiten hier +1 DEF, wenn du diesen Zug keine Sofort spielst.

### Werkhof-Nov (`dc_b_werkhof_nov_809`, Einheit) – ersetzt
- vorher: Einmal/Zug: ziehe 1 ODER heile 1 an aufgeklärtem Abschnitt. Nächste Ausrüstung kostet 1 weniger (min. 1).
- nachher: +1 ATK gegen beobachtete Ziele. · Wörter: Abschirmung
- entfallen/ersetzt: Einmal/Zug: ziehe 1 ODER heile 1 an aufgeklärtem Abschnitt. | Nächste Ausrüstung kostet 1 weniger (min. 1).

### Ivo Vel (`dc_b_ivo_vel_867`, Einheit) – Regelangleichung mit Kürzung
- vorher: Einmal/Zug: decke 1 auf ODER wirf 1 ab und ziehe 2. Einheiten hier +1 ATK, wenn du diesen Zug eine Sofort mit „Scheinschwerpunkt“/Lage-Effekt gespielt hast oder spielst.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Erbitterung, Überlast
- entfallen/ersetzt: ODER wirf 1 ab und ziehe 2. | Einheiten hier +1 ATK, wenn du diesen Zug eine Sofort mit „Scheinschwerpunkt“/Lage-Effekt gespielt hast oder spielst.

### Nila Still (`dc_b_nila_still_868`, Einheit) – ersetzt
- vorher: Einmal/Zug: negiere 1 Schaden, wenn mindestens eine Einheit verdeckt liegt.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Zuteilung, Sicherung
- entfallen/ersetzt: Einmal/Zug: negiere 1 Schaden, wenn mindestens eine Einheit verdeckt liegt.

### Siegelmeister (`dc_b_siegelmeister_869`, Einheit) – ersetzt
- vorher: Einmal/Zug: spiele Ausrüstung 1 billiger (min. 1) ODER heile 1. Wenn du diesen Zug Sofort spielst: Einheiten hier +1 ATK.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit. · Wörter: Abschirmung, Durchschlag
- entfallen/ersetzt: Einmal/Zug: spiele Ausrüstung 1 billiger (min. 1) ODER heile 1. | Wenn du diesen Zug Sofort spielst: Einheiten hier +1 ATK.

### Schreiberin Kal (`dc_b_schreiberin_kal_927`, Einheit) – ersetzt
- vorher: Einmal/Zug: nenne ein Ziel (Zielangriff); Angriffe dagegen +1 ATK diesen Zug ODER ziehe 1 nach einem Kill. Einheiten hier +1 DEF nach Kill.
- nachher: Zerstört sie im Angriff eine Einheit: ziehe 1 Karte. · Wörter: Nachsetzen
- entfallen/ersetzt: Einmal/Zug: nenne ein Ziel | Angriffe dagegen +1 ATK diesen Zug ODER ziehe 1 nach einem Kill. | Einheiten hier +1 DEF nach Kill.

### Hauptmann Kader (`dc_b_hauptmann_kader_928`, Einheit) – ersetzt
- vorher: Einmal/Zug: eine Einheit, die diesen Zug Schaden verursacht hat, +1 ATK.
- nachher: Ihr erster Angriff nach dem Ausspielen hat +1 ATK. · Wörter: Zuteilung, Sicherung
- entfallen/ersetzt: Einmal/Zug: eine Einheit, die diesen Zug Schaden verursacht hat, +1 ATK.

### Haus Still (`dc_b_haus_still_929`, Einheit) – ersetzt
- vorher: Einmal/Zug: spiele Unterstützung 1 billiger (min. 1) ODER heile 1. Wenn geheilt: diese Einheit darf diesen Zug nicht angreifen (Stillschuld).
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.
- entfallen/ersetzt: Einmal/Zug: spiele Unterstützung 1 billiger (min. 1) ODER heile 1. | Wenn geheilt: diese Einheit darf diesen Zug nicht angreifen.

### Marei Aure (`dc_b_marei_aure_747`, Einheit) – ersetzt
- vorher: Einmal/Zug: heile 1 ODER ziehe 1.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit. · Wörter: Sicherung, Zähigkeit
- entfallen/ersetzt: Einmal/Zug: heile 1 ODER ziehe 1.

### Tomas Lenn (`dc_b_tomas_lenn_748`, Einheit) – ersetzt
- vorher: —
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Zuteilung, Heranführung

### Zeughausmeister (`dc_b_zeughausmeister_749`, Einheit) – ersetzt
- vorher: Einmal/Zug: spiele Ausrüstung/Unterstützung 1 billiger (min. 1) ODER heile 1.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.
- entfallen/ersetzt: Einmal/Zug: spiele Ausrüstung/Unterstützung 1 billiger (min. 1) ODER heile 1.

### Kai-Leutnant (`dc_b_kai_leutnant_189`, Einheit) – ersetzt
- vorher: Einmal/Zug: schiebe eine eigene Einheit um 1 Slot.
- nachher: — · Wörter: Sicherung, Stellungswechsel
- entfallen/ersetzt: Einmal/Zug: schiebe eine eigene Einheit um 1 Slot.

### Lucs Sitz (`dc_b_lucs_sitz_190`, Einheit) – ersetzt
- vorher: Beim Ausspielen: heile 2 verteilt; keine Garnison befehligen.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit. · Wörter: Durchschlag, Abschirmung
- entfallen/ersetzt: Beim Ausspielen: heile 2 verteilt | keine Garnison befehligen.

### Offener Weg (`dc_b_offener_weg_191`, Einheit) – ersetzt
- vorher: Soforteinsatz zum Schieben kostet 1 weniger (min. 1).
- nachher: — · Wörter: Sicherung, Heranführung
- entfallen/ersetzt: Soforteinsatz zum Schieben kostet 1 weniger (min. 1). | Schlüsselwort Stellungswechsel (max. 2 Grundwörter je Karte)

### Lotte Knoten (`dc_b_lotte_knoten_687`, Einheit) – ersetzt
- vorher: Einmal/Zug: bewege 1 eigene Einheit 1 Abschnitt ODER heile 1 an Kolonnen-Abschnitt.
- nachher: — · Wörter: Stellungswechsel
- entfallen/ersetzt: Einmal/Zug: bewege 1 eigene Einheit 1 Abschnitt ODER heile 1 an Kolonnen-Abschnitt.

### Hesse Sar (`dc_b_hesse_sar_688`, Einheit) – ersetzt
- vorher: Einheiten hier kosten diesen Zug 1 weniger (min. 1).
- nachher: Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast. · Wörter: Zuteilung, Staffelangriff
- entfallen/ersetzt: Einheiten hier kosten diesen Zug 1 weniger (min. 1).

### Karawanenmeister (`dc_b_karawanenmeister_689`, Einheit) – ersetzt
- vorher: Einmal/Zug: spiele eine Einheit aus der Hand 1 billiger (min. 1) ODER bewege 1 Einheit.
- nachher: — · Wörter: Stellungswechsel
- entfallen/ersetzt: Einmal/Zug: spiele eine Einheit aus der Hand 1 billiger (min. 1) ODER bewege 1 Einheit.

### Ida Holm (`dc_b_ida_holm_567`, Einheit) – ersetzt
- vorher: Einmal/Zug: verhindere 1 Sofort des Gegners ODER eigene Einheit +1 DEF.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Sicherung, Erbitterung
- entfallen/ersetzt: Einmal/Zug: verhindere 1 Sofort des Gegners ODER eigene Einheit +1 DEF.

### Konrad Berst (`dc_b_konrad_berst_568`, Einheit) – voll
- vorher: Beim Ausspielen: decke 1 auf.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Sicherung, Erbitterung

### Stabsoffizier (`dc_b_stabsoffizier_569`, Einheit) – ersetzt
- vorher: Einmal/Zug: markiere Feind als beobachtet ODER ziehe 1 nach Freigabe-Sofort.
- nachher: +1 ATK gegen beobachtete Ziele. · Wörter: Sicherung, Zähigkeit
- entfallen/ersetzt: Einmal/Zug: markiere Feind als beobachtet ODER ziehe 1 nach Freigabe-Sofort.

### Ada Mar (`dc_b_ada_mar_507`, Einheit) – ersetzt
- vorher: Einmal/Zug: Einheit im Abschnitt +1 ATK ODER Entsatz: heile 1.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit. · Wörter: Heranführung, Nachsetzen
- entfallen/ersetzt: Einmal/Zug: Einheit im Abschnitt +1 ATK ODER Entsatz: heile 1.

### Ren Zoll (`dc_b_ren_zoll_508`, Einheit) – ersetzt
- vorher: Feind kann dich nicht als Unterstützung stehlen.
- nachher: Der erste Schaden je Zug sinkt um 1. · Wörter: Zuteilung, Sicherung
- entfallen/ersetzt: Feind kann dich nicht als Unterstützung stehlen.

### Hafenmeister (`dc_b_hafenmeister_509`, Einheit) – ersetzt
- vorher: Einmal/Zug: Einheit, die in diesen Abschnitt rückt, +1 ATK.
- nachher: — · Wörter: Heranführung, Stellungswechsel
- entfallen/ersetzt: Einmal/Zug: Einheit, die in diesen Abschnitt rückt, +1 ATK.

### Jona Leserbach (`dc_b_jona_leserbach_228`, Einheit) – ersetzt
- vorher: Einmal/Zug: eine eigene Einheit in anderem Abschnitt +1 DEF.
- nachher: Der erste Schaden je Zug sinkt um 1.
- entfallen/ersetzt: Einmal/Zug: eine eigene Einheit in anderem Abschnitt +1 DEF.

### Mar Aschen (`dc_b_mar_aschen_229`, Einheit) – Regelangleichung mit Kürzung
- vorher: Beim Ausspielen: heile 2; ziehe 1 wenn allein.
- nachher: Beim Ausspielen: heile 2 DEF an deiner am stärksten beschädigten Einheit.
- entfallen/ersetzt: ziehe 1 wenn allein.

### Talruf (`dc_b_talruf_230`, Einheit) – ersetzt
- vorher: Beim Ausspielen: ziehe eine Infanterie; sie +1 DEF wenn allein.
- nachher: — · Wörter: Durchschlag, Zuteilung
- entfallen/ersetzt: Beim Ausspielen: ziehe eine Infanterie | sie +1 DEF wenn allein.

### Alm Ser (`dc_b_alm_ser_327`, Einheit) – ersetzt
- vorher: Einmal/Zug: heile 1; ziehe 1 wenn keine eigene Zerstörung.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit. · Wörter: Durchschlag
- entfallen/ersetzt: Einmal/Zug: heile 1 | ziehe 1 wenn keine eigene Zerstörung.

### Pia Lück (`dc_b_pia_lueck_328`, Einheit) – voll
- vorher: Beim Ausspielen: heile 2; +1 DEF wenn sie ruht.
- nachher: Beim Ausspielen: heile 2 DEF an deiner am stärksten beschädigten Einheit. +1 DEF, wenn sie seit deinem letzten Zug nicht versetzt wurde.

### Genesener Schlag (`dc_b_genesener_schlag_329`, Einheit) – ersetzt
- vorher: Wenn sie im letzten Zug nicht angriff: +2 ATK und heile 1.
- nachher: Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.
- entfallen/ersetzt: Wenn sie im letzten Zug nicht angriff: +2 ATK und heile 1.

### Ina Oss (`dc_b_ina_oss_267`, Einheit) – ersetzt
- vorher: Einmal/Zug: Ausrüstung kostet 1 weniger; ziehe 1 wenn keine neue Zerstörung.
- nachher: — · Wörter: Abschirmung, Zuteilung
- entfallen/ersetzt: Einmal/Zug: Ausrüstung kostet 1 weniger | ziehe 1 wenn keine neue Zerstörung.

### Retter Grenz (`dc_b_retter_grenz_268`, Einheit) – ersetzt
- vorher: Beim Ausspielen: Feind −1 ATK; stirbt eigene: Untersuchung — ziehe 1.
- nachher: — · Wörter: Zähigkeit, Durchschlag
- entfallen/ersetzt: Beim Ausspielen: Feind −1 ATK | stirbt eigene: Untersuchung — ziehe 1. | Schlüsselwort Zuteilung (max. 2 Grundwörter je Karte)

### Ahnenschmied (`dc_b_ahnenschmied_269`, Einheit) – ersetzt
- vorher: Einmal/Zug: rüste Infanterie aus der Hand aus (−1 Kosten). Sie +1 DEF.
- nachher: Der erste Schaden je Zug sinkt um 1.
- entfallen/ersetzt: Einmal/Zug: rüste Infanterie aus der Hand aus. | Sie +1 DEF.

### Nera Aster (`dc_b_nera_aster_447`, Einheit) – ersetzt
- vorher: Einmal/Zug: decke auf oder brich eigenen Bonus ab und ziehe 2.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: Einmal/Zug: decke auf oder brich eigenen Bonus ab und ziehe 2.

### Colin Abweich (`dc_b_colin_abweich_448`, Einheit) – ersetzt
- vorher: Beim Ausspielen: decke 2 auf.
- nachher: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. · Wörter: Sicherung, Zähigkeit
- entfallen/ersetzt: Beim Ausspielen: decke 2 auf.

### Fachoffizier (`dc_b_fachoffizier_449`, Einheit) – Regelangleichung mit Kürzung
- vorher: +1 ATK gegen aufgeklärte; melde abweichend: ziehe 1 bei Miss.
- nachher: +1 ATK gegen beobachtete Ziele. · Wörter: Nachsetzen, Heranführung
- entfallen/ersetzt: melde abweichend: ziehe 1 bei Miss.

### Sammelpunkt (`dc_su_sammelpunkt`, Unterstützung) – manuell
- vorher: Infanterie in diesem Abschnitt kostet 1 weniger, mindestens 1.
- nachher: Eigene Infanterie kostet 1 AP weniger (mind. 1).

### Glaubensbanner (`dc_su_glaubensbanner`, Unterstützung) – manuell
- vorher: Eigene Infanterie im Abschnitt hat +1 DEF.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Infanterie dort +1 DEF.

### Artilleriestellung (`dc_su_artillerie`, Unterstützung) – abkürzung
- vorher: Eigene Front +1 A. Feuerkommando (2 AP): einer feindlichen Fronteinheit 3 Schaden.
- nachher: Eigene Front +1 ATK. Feuerkommando (2 AP): einer feindlichen Fronteinheit 3 Schaden.

### Aufklärungssatellit (`dc_su_satellit`, Unterstützung) – abkürzung
- vorher: Eigene Front +2 V. Satellitenbild (3 AP): feindliche verdeckte Front kurz aufdecken, nach Bestätigung wieder verdeckt.
- nachher: Eigene Front +2 DEF. Satellitenbild (3 AP): feindliche verdeckte Front kurz aufdecken, nach Bestätigung wieder verdeckt.

### Erfahrener General (`dc_su_general`, Unterstützung) – abkürzung
- vorher: Eigene Front +2 V. Mehr als zwei Elite an der Front: Zugende +1 Karte. Finte (2 AP): Feind außer Gefecht diesen Zug.
- nachher: Eigene Front +2 DEF. Mehr als zwei Elite an der Front: Zugende +1 Karte. Finte (2 AP): Feind außer Gefecht diesen Zug.

### Lazarett (`dc_su_lazarett`, Unterstützung) – abkürzung
- vorher: Heilung (1 AP): Infanterie auf diese Karte, heilt 1 V/Zug, zurück nur auf denselben Slot. Stirbt das Lazarett, stirbt der Patient.
- nachher: Heilung (1 AP): Infanterie auf diese Karte, heilt 1 DEF/Zug, zurück nur auf denselben Slot. Stirbt das Lazarett, stirbt der Patient.

### Störwagen Brummbär (`dc_su_brumm`, Unterstützung) – abkürzung
- vorher: Feindliche Front -1 A. Funkfeuer (1 AP): fliegende Drohne zerstören. Fehlfunktion (3 AP): Drohne greift Flanke an.
- nachher: Feindliche Front -1 ATK. Funkfeuer (1 AP): fliegende Drohne zerstören. Fehlfunktion (3 AP): Drohne greift Flanke an.

### Uralter Pakt (`dc_su_pakt`, Unterstützung) – abkürzung
- vorher: Eigene Fronteinheit +2 A/+2 V. Besiegt sie eine Einheit: 2 Karten ziehen.
- nachher: Eigene Fronteinheit +2 ATK/+2 DEF. Besiegt sie eine Einheit: 2 Karten ziehen.

### Feuerleitung (`dc_b_feuerleitung_153`, Unterstützung) – manuell
- vorher: Eigene Artillerie +1 ATK; mit Soforteinsatz +1 zusätzlich.
- nachher: Eigene Artillerie +1 ATK, weitere +1 ATK, wenn du in diesem Zug einen Soforteinsatz gespielt hast.

### Auftragsring (`dc_b_auftragsring_154`, Unterstützung) – ersetzt
- vorher: Wähle: ziehe 1 oder heile 1.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: Wähle: ziehe 1 oder heile 1.

### Schichtplan (`dc_b_schichtplan_155`, Unterstützung) – manuell
- vorher: Nächste Einheit kostet 1 weniger.
- nachher: Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1).

### Bilanzrede (`dc_b_bilanzrede_156`, Unterstützung) – ersetzt
- vorher: Gegner zeigt Handkarte; Einheit → deine nächste +1 ATK.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.
- entfallen/ersetzt: Gegner zeigt Handkarte | Einheit → deine nächste +1 ATK.

### Werksanzeige (`dc_b_werksanzeige_157`, Unterstützung) – ersetzt
- vorher: Eigene Artillerie angreift: heile 1 an Panzer.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: Eigene Artillerie angreift: heile 1 an Panzer.

### Puppenstaat (`dc_b_puppenstaat_158`, Unterstützung) – ersetzt
- vorher: Negiere ersten Schaden gegen Unterstützung diesen Zug.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.
- entfallen/ersetzt: Negiere ersten Schaden gegen Unterstützung diesen Zug.

### Erzfall-Bericht (`dc_b_erzfall-bericht_159`, Unterstützung) – ersetzt
- vorher: Bei 2+ Karten diesen Zug: ziehe 1.
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast.
- entfallen/ersetzt: Bei 2+ Karten diesen Zug: ziehe 1.

### Dunkle Zeile (`dc_b_dunkle_zeile_160`, Unterstützung) – ersetzt
- vorher: Einheit +2 DEF, kann diesen Zug nicht angreifen.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.
- entfallen/ersetzt: Einheit +2 DEF, kann diesen Zug nicht angreifen.

### Quartalsende (`dc_b_quartalsende_161`, Unterstützung) – ersetzt
- vorher: Zerstöre beschädigte eigene Einheit: ziehe 2, heile 1.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: Zerstöre beschädigte eigene Einheit: ziehe 2, heile 1.

### Sammelpunkt (`dc_b_sammelpunkt_111`, Unterstützung) – manuell
- vorher: Infanterie in diesem Abschnitt kostet 1 weniger, mindestens 1.
- nachher: Eigene Infanterie kostet 1 AP weniger (mind. 1).

### Feldprediger (`dc_b_feldprediger_112`, Unterstützung) – ersetzt
- vorher: Einmal pro Zug: eine eigene Infanterie in diesem Abschnitt hat +1 ATK bis Zugende.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.
- entfallen/ersetzt: Einmal pro Zug: eine eigene Infanterie in diesem Abschnitt hat +1 ATK bis Zugende.

### Glaubensbanner (`dc_b_glaubensbanner_113`, Unterstützung) – manuell
- vorher: Eigene Infanterie im Abschnitt hat +1 DEF.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Infanterie dort +1 DEF.

### Zentralratsplan (`dc_b_zentralratsplan_114`, Unterstützung) – ersetzt
- vorher: Ziehe 1 Karte. Wenn du in diesem Zug Infanterie spielst, ziehe 1 weitere.
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast.
- entfallen/ersetzt: Ziehe 1 Karte. | Wenn du in diesem Zug Infanterie spielst, ziehe 1 weitere.

### Werkhof (`dc_b_werkhof_115`, Unterstützung) – ersetzt
- vorher: Heile eine eigene Einheit um 1. Infanterie erhält zusätzlich +1 DEF bis Zugende.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: Heile eine eigene Einheit um 1. | Infanterie erhält zusätzlich +1 DEF bis Zugende.

### Leises Nein (`dc_b_leises_nein_116`, Unterstützung) – ersetzt
- vorher: Wähle eine eigene Einheit: sie erleidet diesen Zug keinen Schaden durch eigene Karteneffekte.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.
- entfallen/ersetzt: Wähle eine eigene Einheit: sie erleidet diesen Zug keinen Schaden durch eigene Karteneffekte.

### Ritusnennung (`dc_b_ritusnennung_117`, Unterstützung) – voll
- vorher: Wenn eine eigene Einheit zerstört wird: ziehe 1 Karte.
- nachher: Einmal pro Zug, wenn eine andere eigene Einheit zerstört wird: ziehe 1 Karte.

### Genossenschaftslager (`dc_b_genossenschaftslager_118`, Unterstützung) – voll
- vorher: Einmal pro Zug: eine Infanterie aus der Hand kostet 1 weniger (mind. 1).
- nachher: Einmal pro Zug: deine nächste Infanterie kostet 1 AP weniger (mind. 1).

### Breite Front (`dc_b_breite_front_119`, Unterstützung) – ersetzt
- vorher: Eigene Einheiten im Abschnitt haben +1 DEF, solange du mindestens 3 Einheiten dort hast.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.
- entfallen/ersetzt: Eigene Einheiten im Abschnitt haben +1 DEF, solange du mindestens 3 Einheiten dort hast.

### Schwurprotokoll (`dc_b_schwurprotokoll_627`, Unterstützung) – ersetzt
- vorher: Einmal/Zug: eine eigene Einheit hat +1 DEF bis Zugende und gilt als „unter Schwur“ (kann nicht freiwillig bewegt werden).
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.
- entfallen/ersetzt: Einmal/Zug: eine eigene Einheit hat +1 DEF bis Zugende und gilt als „unter Schwur“.

### Depot Erbe (`dc_b_depot_erbe_628`, Unterstützung) – voll
- vorher: Einheiten kosten dich 1 AP weniger (mindestens 1), solange diese Karte liegt.
- nachher: Deine Einheiten kosten 1 AP weniger (mind. 1).

### Ablösungsplan (`dc_b_abloesungsplan_629`, Unterstützung) – ersetzt
- vorher: Einmal/Zug: ersetze eine eigene beschädigte Einheit; die Neue erhält ATK/DEF der Alten bis max. aufgedrucktem Wert +1 DEF.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.
- entfallen/ersetzt: Einmal/Zug: ersetze eine eigene beschädigte Einheit | die Neue erhält ATK/DEF der Alten bis max. | aufgedrucktem Wert +1 DEF.

### Schwerpunktkarte (`dc_b_schwerpunktkarte_630`, Unterstützung) – ersetzt
- vorher: Einmal pro Zug: wähle einen Abschnitt. Angriffe eigener Einheiten dort haben +1 ATK.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.
- entfallen/ersetzt: Einmal pro Zug: wähle einen Abschnitt. | Angriffe eigener Einheiten dort haben +1 ATK.

### Flussrot-Umschlag (`dc_b_flussrot_umschlag_631`, Unterstützung) – ersetzt
- vorher: Ziehe 1 Karte, wenn du eine Einheit spielst, die eine andere ersetzt.
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast.
- entfallen/ersetzt: Ziehe 1 Karte, wenn du eine Einheit spielst, die eine andere ersetzt.

### Regimentsarchiv (`dc_b_regimentsarchiv_632`, Unterstützung) – ersetzt
- vorher: Wenn eine eigene Einheit zerstört wird: lege die oberste Karte deines Friedhofs unter dein Deck.
- nachher: Einmal pro Zug, wenn eine eigene Einheit zerstört wird: ziehe 1 Karte.
- entfallen/ersetzt: Wenn eine eigene Einheit zerstört wird: lege die oberste Karte deines Friedhofs unter dein Deck.

### Kronrat (`dc_b_kronrat_633`, Unterstützung) – manuell
- vorher: Eigene Elite und Panzer haben +1 DEF.
- nachher: Eigene Elite und Panzer +1 DEF.

### Werkstattbefehl (`dc_b_werkstattbefehl_634`, Unterstützung) – voll
- vorher: Einmal pro Zug: heile 1 DEF an einem eigenen Panzer oder Fahrzeug.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.

### Unfehlbarer Erlass (`dc_b_unfehlbarer_erlass_635`, Unterstützung) – ersetzt
- vorher: Einmal/Zug: eine eigene Einheit ignoriert den ersten Schaden. Du darfst diesen Zug keine Sofort spielen (Preis der Unfehlbarkeit).
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.
- entfallen/ersetzt: Einmal/Zug: eine eigene Einheit ignoriert den ersten Schaden. | Du darfst diesen Zug keine Sofort spielen.

### Durchbruchspunkt (`dc_b_durchbruchspunkt_387`, Unterstützung) – ersetzt
- vorher: Einmal/Zug: eine eigene Infanterie +2 ATK; sie erleidet danach 1 Schaden. Wenn sie fällt: oberste Handkarte ablegen.
- nachher: Einmal pro Zug, wenn eine eigene Einheit zerstört wird: ziehe 1 Karte.
- entfallen/ersetzt: Einmal/Zug: eine eigene Infanterie +2 ATK | sie erleidet danach 1 Schaden. | Wenn sie fällt: oberste Handkarte ablegen.

### Implantatlager (`dc_b_implantatlager_388`, Unterstützung) – manuell
- vorher: Eigene Ausrüstungen kosten 1 AP weniger (min. 1).
- nachher: Eigene Ausrüstung kostet 1 AP weniger (mind. 1).
- Hinweis: dauerhafter Ausrüstungsrabatt (stapelbar je Unterstützung)

### Weiterkämpfen-Protokoll (`dc_b_weiterkaempfen_protokoll_389`, Unterstützung) – ersetzt
- vorher: Einmal/Zug: eine beschädigte eigene Einheit +2 ATK bis Zugende und darf nicht geheilt werden diesen Zug.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: Einmal/Zug: eine beschädigte eigene Einheit +2 ATK bis Zugende und darf nicht geheilt werden diesen Zug.

### Leistungsboard (`dc_b_leistungsboard_390`, Unterstützung) – ersetzt
- vorher: Ziehe 1, wenn eine eigene Einheit in diesem Zug Schaden erleidet. Einmal/Zug: erzwinge 1 Schaden an eigener Einheit → +1 ATK für sie.
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast.
- entfallen/ersetzt: Ziehe 1, wenn eine eigene Einheit in diesem Zug Schaden erleidet. | Einmal/Zug: erzwinge 1 Schaden an eigener Einheit → +1 ATK für sie.

### Sezierstation (`dc_b_sezierstation_391`, Unterstützung) – ersetzt
- vorher: Wenn eigene Einheit zerstört wird: oberste Friedhofskarte unter dein Deck oder heile 1 an einer beschädigten Einheit.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: Wenn eigene Einheit zerstört wird: oberste Friedhofskarte unter dein Deck oder heile 1 an einer beschädigten Einheit.

### Prioritätsmedizin (`dc_b_prioritaetsmedizin_393`, Unterstützung) – ersetzt
- vorher: Einmal pro Zug: heile 2 DEF an einer Einheit mit ATK ≥3; eine andere eigene Einheit erleidet 1 Schaden.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: Einmal pro Zug: heile 2 DEF an einer Einheit mit ATK ≥3 | eine andere eigene Einheit erleidet 1 Schaden.

### Offene Front (`dc_b_offene_front_394`, Unterstützung) – voll
- vorher: Beschädigte eigene Einheiten haben +1 ATK.
- nachher: Beschädigte eigene Einheiten +1 ATK.

### Stoßleitung (`dc_b_stossleitung_395`, Unterstützung) – ersetzt
- vorher: Einmal pro Zug: Angriffe eigener Einheiten in einem Abschnitt +1 ATK; eine Einheit dort erleidet 1 Schaden.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.
- entfallen/ersetzt: Einmal pro Zug: Angriffe eigener Einheiten in einem Abschnitt +1 ATK | eine Einheit dort erleidet 1 Schaden.

### Körper als System (`dc_b_koerper_als_system_396`, Unterstützung) – ersetzt
- vorher: Einmal/Zug: wähle eine eigene Einheit; +2 ATK bis Zugende, −1 DEF dauerhaft (Implantat). Bei ihrem Tod: ziehe 2.
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast.
- entfallen/ersetzt: Einmal/Zug: wähle eine eigene Einheit | +2 ATK bis Zugende, −1 DEF dauerhaft. | Bei ihrem Tod: ziehe 2.

### Knotenhalle (`dc_b_knotenhalle_810`, Unterstützung) – voll
- vorher: Einheiten hier +1 ATK gegen aufgeklärte Feinde.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK gegen beobachtete Ziele.

### Parlamentsraster (`dc_b_parlamentsraster_811`, Unterstützung) – voll
- vorher: Einheiten, die diesen Zug hier gespielt werden, kosten 1 weniger (min. 1). [Parlamentsraster]
- nachher: Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1).

### Werkhöfe Novaris (`dc_b_werkhoefe_novaris_812`, Unterstützung) – voll
- vorher: Einheiten hier +1 DEF, wenn mindestens zwei Einheiten im Abschnitt. [Werkhöfe Novaris]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht.

### Nordfall-Übung (`dc_b_nordfall_uebung_813`, Unterstützung) – Regelangleichung mit Kürzung
- vorher: Einheiten hier +1 DEF; einmal/Zug: decke 1 auf ODER ziehe 1.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF. Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: ODER ziehe 1.

### Lage Offen Desk (`dc_b_lage_offen_desk_814`, Unterstützung) – voll
- vorher: Einheiten hier +1 ATK im Zug ohne Bewegung. [Lage Offen Desk]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK, wenn die Einheit seit deinem letzten Zug nicht versetzt wurde.

### Verbindungsnetz (`dc_b_verbindungsnetz_815`, Unterstützung) – voll
- vorher: Einheiten hier +1 ATK gegen Aufgeklärte; einmal/Zug: decke 1 auf.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK gegen beobachtete Ziele. Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf.

### Westhaven-Lager (`dc_b_westhaven_lager_816`, Unterstützung) – voll
- vorher: Einheiten im Abschnitt +1 DEF. [Westhaven-Lager]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.

### Lydon-Werk (`dc_b_lydon_werk_817`, Unterstützung) – voll
- vorher: Wenn du diesen Zug Sofort spielst: ziehe 1. [Lydon-Werk]
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug einen Soforteinsatz gespielt hast.

### Arven-Widerspruch (`dc_b_arven_widerspruch_818`, Unterstützung) – ersetzt
- vorher: Einheiten hier +1 ATK im Zug nach Aufdecken.
- nachher: Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: Einheiten hier +1 ATK im Zug nach Aufdecken.

### Velis-Front (`dc_b_velis_front_870`, Unterstützung) – Regelangleichung mit Kürzung
- vorher: Einheiten hier +1 DEF, wenn mindestens zwei Einheiten im Abschnitt. Einmal/Zug: eine verdeckte eigene Einheit +1 ATK beim Aufdecken.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht.
- entfallen/ersetzt: Einmal/Zug: eine verdeckte eigene Einheit +1 ATK beim Aufdecken.

### Archive (`dc_b_archive_871`, Unterstützung) – voll
- vorher: Einheiten im Abschnitt +1 DEF.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.

### Siegelstadt (`dc_b_siegelstadt_872`, Unterstützung) – voll
- vorher: Einmal/Zug: ziehe 1, wenn du diesen Zug eine Einheit gespielt hast.
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast.

### Stillheim (`dc_b_stillheim_873`, Unterstützung) – voll
- vorher: Einheiten hier +1 DEF; einmal/Zug: heile 1.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF. Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.

### Ämterlande (`dc_b_aemterlande_874`, Unterstützung) – voll
- vorher: Einmal/Zug: ziehe 1, wenn du diesen Zug eine Einheit gespielt hast. [Ämterlande]
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast.

### Lagebrett (`dc_b_lagebrett_875`, Unterstützung) – voll
- vorher: Einheiten hier +1 ATK/+1 DEF; einmal/Zug: negiere 1 Schaden an einer Einheit hier, wenn du diesen Zug Sofort spielst.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK und +1 DEF. Eigene Einheiten im gewählten Abschnitt: Der erste Schaden je Zug sinkt um 1, wenn du in diesem Zug einen Soforteinsatz gespielt hast.

### Marktvel (`dc_b_marktvel_876`, Unterstützung) – voll
- vorher: Einheiten hier +1 ATK/+1 DEF; einmal/Zug: negiere 1 Schaden an einer Einheit hier.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK und +1 DEF. Eigene Einheiten im gewählten Abschnitt: Der erste Schaden je Zug sinkt um 1.

### Siegelwerk (`dc_b_siegelwerk_877`, Unterstützung) – voll
- vorher: Einmal/Zug: ziehe 1, wenn du diesen Zug eine Einheit gespielt hast. [Siegelwerk]
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast.

### Hinterraum (`dc_b_hinterraum_878`, Unterstützung) – voll
- vorher: Einheiten hier +1 DEF, wenn mindestens zwei Einheiten im Abschnitt.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht.

### Halle Kalden (`dc_b_halle_kalden_930`, Unterstützung) – Regelangleichung mit Kürzung
- vorher: Einheiten hier +1 DEF, wenn mindestens zwei Einheiten im Abschnitt. Nach einem Kill hier: ziehe 1.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht.
- entfallen/ersetzt: Nach einem Kill hier: ziehe 1.

### Abschrift (`dc_b_abschrift_931`, Unterstützung) – voll
- vorher: Einmal/Zug: ziehe 1, wenn du diesen Zug eine Einheit gespielt hast. [Abschrift]
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast.

### Vorlesehof (`dc_b_vorlesehof_932`, Unterstützung) – ersetzt
- vorher: Einmal/Zug: ziehe 1; nächste Sofort kostet 1 weniger (min. 0).
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast.
- entfallen/ersetzt: Einmal/Zug: ziehe 1 | nächste Sofort kostet 1 weniger (min. 0).

### Herberge Kalden (`dc_b_herberge_kalden_933`, Unterstützung) – voll
- vorher: Einheiten hier +1 ATK im Zug ohne Bewegung.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK, wenn die Einheit seit deinem letzten Zug nicht versetzt wurde.

### Markt Mahr (`dc_b_markt_mahr_934`, Unterstützung) – voll
- vorher: Einheiten hier +1 ATK/+1 DEF; einmal/Zug: negiere 1 Schaden an einer Einheit hier. [Markt Mahr]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK und +1 DEF. Eigene Einheiten im gewählten Abschnitt: Der erste Schaden je Zug sinkt um 1.

### Schuldblatt (`dc_b_schuldblatt_935`, Unterstützung) – Regelangleichung mit Kürzung
- vorher: Einheiten hier +1 ATK/+1 DEF; einmal/Zug: negiere 1 Schaden an einer Einheit hier. Danach: diese Einheit gilt als „genannt“ (+1 ATK gegen sie für den Gegner bis Zugende).
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK und +1 DEF. Eigene Einheiten im gewählten Abschnitt: Der erste Schaden je Zug sinkt um 1.
- entfallen/ersetzt: Danach: diese Einheit gilt als „genannt“.

### Kai Brunn (`dc_b_kai_brunn_936`, Unterstützung) – voll
- vorher: Wenn du diesen Zug Sofort spielst: ziehe 1.
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug einen Soforteinsatz gespielt hast.

### Lehrbach (`dc_b_lehrbach_937`, Unterstützung) – voll
- vorher: Einheiten, die diesen Zug hier gespielt werden, kosten 1 weniger (min. 1).
- nachher: Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1).

### Namenhof (`dc_b_namenhof_938`, Unterstützung) – voll
- vorher: Einheiten, die diesen Zug hier gespielt werden, kosten 1 weniger (min. 1). [Namenhof]
- nachher: Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1).

### Doppelhaus (`dc_b_doppelhaus_750`, Unterstützung) – voll
- vorher: Einheiten hier +1 DEF; einmal/Zug: heile 1. [Doppelhaus]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF. Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.

### Zeughaus Brückenau (`dc_b_zeughaus_brueckenau_751`, Unterstützung) – voll
- vorher: Einheiten hier +1 DEF; einmal/Zug: heile 1. [Zeughaus Brückenau]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF. Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.

### Parlamentsgasse (`dc_b_parlamentsgasse_752`, Unterstützung) – voll
- vorher: Einheiten im Abschnitt +1 DEF. [Parlamentsgasse]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.

### Bindungstag (`dc_b_bindungstag_753`, Unterstützung) – voll
- vorher: Einheiten hier +1 ATK/+1 DEF; einmal/Zug: heile 1.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK und +1 DEF. Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.

### Stille Ämter (`dc_b_stille_aemter_754`, Unterstützung) – voll
- vorher: Wenn du diesen Zug Sofort spielst: ziehe 1. [Stille Ämter]
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug einen Soforteinsatz gespielt hast.

### Dauerstellung (`dc_b_dauerstellung_755`, Unterstützung) – voll
- vorher: Einheiten im Abschnitt +1 DEF. [Dauerstellung]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.

### Kronland-Hof (`dc_b_kronland_hof_756`, Unterstützung) – voll
- vorher: Wenn du diesen Zug Sofort spielst: ziehe 1. [Kronland-Hof]
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug einen Soforteinsatz gespielt hast.

### Flusshof (`dc_b_flusshof_757`, Unterstützung) – voll
- vorher: Einheiten, die diesen Zug hier gespielt werden, kosten 1 weniger (min. 1). [Flusshof]
- nachher: Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1).

### Lichthofen (`dc_b_lichthofen_758`, Unterstützung) – voll
- vorher: Einheiten hier +1 DEF; einmal/Zug: heile 1. [Lichthofen]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF. Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.

### Wegweiser (`dc_b_wegweiser_192`, Unterstützung) – ersetzt
- vorher: Schieben im Abschnitt kostet 1 weniger.
- nachher: Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1).
- entfallen/ersetzt: Schieben im Abschnitt kostet 1 weniger.

### Feldküche (`dc_b_feldkueche_193`, Unterstützung) – voll
- vorher: Einmal/Zug: eigene Einheit heilt 1.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.

### Verbindungsstraße (`dc_b_verbindungsstrasse_194`, Unterstützung) – voll
- vorher: Einheiten hier +1 ATK/+1 DEF; einmal/Zug: negiere 1 Schaden an einer Einheit hier. [Verbindungsstraße]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK und +1 DEF. Eigene Einheiten im gewählten Abschnitt: Der erste Schaden je Zug sinkt um 1.

### Haltepunkt (`dc_b_haltepunkt_195`, Unterstützung) – voll
- vorher: Einheiten +1 DEF, wenn keine andere Unterstützung im Abschnitt.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF, solange du eine offene Unterstützung hast.

### Marschordnung (`dc_b_marschordnung_196`, Unterstützung) – ersetzt
- vorher: Einmal/Zug: eine geschobene Einheit +1 ATK.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.
- entfallen/ersetzt: Einmal/Zug: eine geschobene Einheit +1 ATK.

### Lizenzhof (`dc_b_lizenzhof_197`, Unterstützung) – voll
- vorher: Einheiten hier +1 DEF; einmal/Zug: heile 1. [Lizenzhof]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF. Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.

### Neuviertel-Tisch (`dc_b_neuviertel_tisch_198`, Unterstützung) – voll
- vorher: Einheiten hier +1 ATK/+1 DEF; einmal/Zug: negiere 1 Schaden an einer Einheit hier. [Neuviertel-Tisch]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK und +1 DEF. Eigene Einheiten im gewählten Abschnitt: Der erste Schaden je Zug sinkt um 1.

### Warteblatt (`dc_b_warteblatt_199`, Unterstützung) – voll
- vorher: Wenn du diesen Zug Sofort spielst: ziehe 1. [Warteblatt]
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug einen Soforteinsatz gespielt hast.

### Nachschubader (`dc_b_nachschubader_200`, Unterstützung) – ersetzt
- vorher: Einheiten, die diesen Zug geschoben werden, heilen 1.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: Einheiten, die diesen Zug geschoben werden, heilen 1.

### Linienknoten (`dc_b_linienknoten_690`, Unterstützung) – voll
- vorher: Einheiten hier +1 DEF, wenn mindestens zwei Einheiten im Abschnitt. [Linienknoten]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht.

### Vorratshalle (`dc_b_vorratshalle_691`, Unterstützung) – voll
- vorher: Einheiten, die diesen Zug hier gespielt werden, kosten 1 weniger (min. 1). [Vorratshalle]
- nachher: Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1).

### Umschlagplatz (`dc_b_umschlagplatz_692`, Unterstützung) – voll
- vorher: Einheiten im Abschnitt +1 DEF. [Umschlagplatz]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.

### Vertragsnetz (`dc_b_vertragsnetz_693`, Unterstützung) – Regelangleichung mit Kürzung
- vorher: Einheiten hier +1 ATK; einmal/Zug: bewege 1 Einheit 1 Abschnitt.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.
- entfallen/ersetzt: einmal/Zug: bewege 1 Einheit 1 Abschnitt.

### Umschlagzentrale (`dc_b_umschlagzentrale_694`, Unterstützung) – voll
- vorher: Einheiten hier +1 ATK/+1 DEF; einmal/Zug: negiere 1 Schaden an einer Einheit hier. [Umschlagzentrale]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK und +1 DEF. Eigene Einheiten im gewählten Abschnitt: Der erste Schaden je Zug sinkt um 1.

### Handelsfront (`dc_b_handelsfront_695`, Unterstützung) – ersetzt
- vorher: Einmal/Zug: bis zu 2 Einheiten dürfen je 1 Abschnitt bewegen; sie +1 ATK diesen Zug.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.
- entfallen/ersetzt: Einmal/Zug: bis zu 2 Einheiten dürfen je 1 Abschnitt bewegen | sie +1 ATK diesen Zug.

### Doppelkolonne (`dc_b_doppelkolonne_696`, Unterstützung) – voll
- vorher: Einheiten hier +1 DEF, wenn mindestens zwei Einheiten im Abschnitt. [Doppelkolonne]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht.

### Wasserstelle (`dc_b_wasserstelle_697`, Unterstützung) – ersetzt
- vorher: Wenn du diesen Zug bewegt hast: ziehe 1.
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast.
- entfallen/ersetzt: Wenn du diesen Zug bewegt hast: ziehe 1.

### Meilenstein (`dc_b_meilenstein_698`, Unterstützung) – ersetzt
- vorher: Einheiten hier +1 ATK im Zug, in dem Sofort gespielt wurde.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.
- entfallen/ersetzt: Einheiten hier +1 ATK im Zug, in dem Sofort gespielt wurde.

### Feuerplanstelle (`dc_b_feuerplanstelle_570`, Unterstützung) – ersetzt
- vorher: Einmal/Zug: wähle Feind hier — gilt als beobachtet.
- nachher: Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: Einmal/Zug: wähle Feind hier — gilt als beobachtet.

### Stabskarte (`dc_b_stabskarte_571`, Unterstützung) – voll
- vorher: Einmal/Zug: decke 1 auf.
- nachher: Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf.

### Depotfreigabe (`dc_b_depotfreigabe_572`, Unterstützung) – voll
- vorher: Einheiten hier +1 ATK/+1 DEF; einmal/Zug: negiere 1 Schaden an einer Einheit hier. [Depotfreigabe]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK und +1 DEF. Eigene Einheiten im gewählten Abschnitt: Der erste Schaden je Zug sinkt um 1.

### Feuerleitblatt (`dc_b_feuerleitblatt_573`, Unterstützung) – voll
- vorher: Einheiten hier +1 ATK gegen beobachtete.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK gegen beobachtete Ziele.

### Kommissionsdepot (`dc_b_kommissionsdepot_574`, Unterstützung) – Regelangleichung mit Kürzung
- vorher: Einmal/Zug: Einheit hier gespielt kostet 1 weniger (min. 1); ziehe 1.
- nachher: Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1).
- entfallen/ersetzt: ziehe 1.

### Großfeuerplan (`dc_b_grossfeuerplan_575`, Unterstützung) – ersetzt
- vorher: Einmal/Zug: markiere bis zu 2 Feinde als beobachtet; Einheiten hier +1 ATK gegen sie.
- nachher: Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: Einmal/Zug: markiere bis zu 2 Feinde als beobachtet | Einheiten hier +1 ATK gegen sie.

### Lagerordnung (`dc_b_lagerordnung_576`, Unterstützung) – voll
- vorher: Einheiten hier +1 DEF, wenn mindestens zwei Einheiten im Abschnitt. [Lagerordnung]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht.

### Lagebericht (`dc_b_lagebericht_577`, Unterstützung) – voll
- vorher: Wenn du diesen Zug aufgedeckt hast: ziehe 1.
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug aufgedeckt hast.

### Landesfreigabe (`dc_b_landesfreigabe_578`, Unterstützung) – ersetzt
- vorher: Einheiten hier +1 ATK im Zug, in dem Freigabe-/Sofort gespielt wurde.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.
- entfallen/ersetzt: Einheiten hier +1 ATK im Zug, in dem Freigabe-/Sofort gespielt wurde.

### Hafenlieferung (`dc_b_hafenlieferung_510`, Unterstützung) – voll
- vorher: Einheiten in diesem Abschnitt kosten 1 weniger (min. 1).
- nachher: Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1).

### Nachschubboot (`dc_b_nachschubboot_511`, Unterstützung) – voll
- vorher: Einmal/Zug: ziehe 1, wenn im Abschnitt eine Unterstützung liegt.
- nachher: Einmal pro Zug: ziehe 1 Karte, solange du eine offene Unterstützung hast.

### Versorgungsschiff (`dc_b_versorgungsschiff_512`, Unterstützung) – ersetzt
- vorher: Einheiten, die diesen Zug hier gespielt werden, +1 ATK.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.
- entfallen/ersetzt: Einheiten, die diesen Zug hier gespielt werden, +1 ATK.

### Nachschubader (`dc_b_nachschubader_513`, Unterstützung) – voll
- vorher: Einmal/Zug: Einheit hier gespielt kostet 1 weniger (min. 1).
- nachher: Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1).

### Volle Front-Lager (`dc_b_volle_front_lager_514`, Unterstützung) – voll
- vorher: Einmal/Zug: ziehe 1, wenn du diesen Zug eine Einheit gespielt hast. [Volle Front-Lager]
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast.

### Offener Kai (`dc_b_offener_kai_515`, Unterstützung) – ersetzt
- vorher: Einheiten hier kosten 1 weniger und +1 ATK im Zug, in dem sie gespielt werden.
- nachher: Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1).
- entfallen/ersetzt: Einheiten hier kosten 1 weniger und +1 ATK im Zug, in dem sie gespielt werden.

### Solkai-Werft (`dc_b_solkai_werft_516`, Unterstützung) – ersetzt
- vorher: Einmal/Zug: heile 1 an Einheit, die diesen Zug gerückt ist.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: Einmal/Zug: heile 1 an Einheit, die diesen Zug gerückt ist.

### Maris-Halle (`dc_b_maris_halle_517`, Unterstützung) – ersetzt
- vorher: Wenn Entsatz diesen Zug: ziehe 1.
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast.
- entfallen/ersetzt: Wenn Entsatz diesen Zug: ziehe 1.

### Bahnstadt-Lager (`dc_b_bahnstadt_lager_518`, Unterstützung) – ersetzt
- vorher: Einheiten, die in zuletzt angegriffene Abschnitte rücken, +1 DEF.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.
- entfallen/ersetzt: Einheiten, die in zuletzt angegriffene Abschnitte rücken, +1 DEF.

### Steinwall (`dc_b_steinwall_231`, Unterstützung) – ersetzt
- vorher: Einheiten +1 DEF gegen Einrückende.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.
- entfallen/ersetzt: Einheiten +1 DEF gegen Einrückende.

### Hangstellung (`dc_b_hangstellung_232`, Unterstützung) – ersetzt
- vorher: Einrückende Feinde erleiden 1 Schaden.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.
- entfallen/ersetzt: Einrückende Feinde erleiden 1 Schaden.

### Passsperre (`dc_b_passsperre_233`, Unterstützung) – ersetzt
- vorher: Einmal/Zug: einrückende Einheit erleidet 1 Schaden.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.
- entfallen/ersetzt: Einmal/Zug: einrückende Einheit erleidet 1 Schaden.

### Verteilte Vorräte (`dc_b_verteilte_vorraete_234`, Unterstützung) – ersetzt
- vorher: Einmal/Zug: eigene allein stehende Einheit heilt 1.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: Einmal/Zug: eigene allein stehende Einheit heilt 1.

### Lesehof (`dc_b_lesehof_235`, Unterstützung) – ersetzt
- vorher: Bei 2+ Abschnitten mit eigenen Einheiten: ziehe 1 einmal/Zug.
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast.
- entfallen/ersetzt: Bei 2+ Abschnitten mit eigenen Einheiten: ziehe 1 einmal/Zug.

### Tunnelnetz (`dc_b_tunnelnetz_236`, Unterstützung) – voll
- vorher: Einheiten hier +1 DEF, wenn mindestens zwei Einheiten im Abschnitt. [Tunnelnetz]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht.

### Eidkopie (`dc_b_eidkopie_237`, Unterstützung) – voll
- vorher: Einheiten im Abschnitt +1 DEF. [Eidkopie]
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.

### Nachbarhilfe (`dc_b_nachbarhilfe_238`, Unterstützung) – ersetzt
- vorher: Einheiten in benachbarten Abschnitten +1 DEF.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.
- entfallen/ersetzt: Einheiten in benachbarten Abschnitten +1 DEF.

### Passwache (`dc_b_passwache_239`, Unterstützung) – voll
- vorher: Infanterie im Abschnitt +1 ATK gegen Einrückende.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Infanterie dort +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.

### Sanitätszelt (`dc_b_sanitaetszelt_330`, Unterstützung) – voll
- vorher: Einmal/Zug: eigene Einheit im Abschnitt heilt 1.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit im gewählten Abschnitt.

### Feldbäckerei (`dc_b_feldbaeckerei_331`, Unterstützung) – ersetzt
- vorher: Ruhende Einheiten im Abschnitt +1 DEF.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.
- entfallen/ersetzt: Ruhende Einheiten im Abschnitt +1 DEF.

### Versorgungspunkt (`dc_b_versorgungspunkt_332`, Unterstützung) – manuell
- vorher: Einmal/Zug: heile 1; nächste Einheit kostet 1 weniger.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit. Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1).

### Gesundheim (`dc_b_gesundheim_333`, Unterstützung) – voll
- vorher: Einheiten im Abschnitt heilen 1 am Zugende wenn sie nicht angriffen.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit im gewählten Abschnitt, die in deinem letzten Zug nicht angegriffen hat.

### Wohnzuteilung (`dc_b_wohnzuteilung_334`, Unterstützung) – ersetzt
- vorher: Abschnitt +1 DEF; ruhende +1 ATK nächsten Zug.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.
- entfallen/ersetzt: Abschnitt +1 DEF | ruhende +1 ATK nächsten Zug.

### Sicherheitsforum (`dc_b_sicherheitsforum_335`, Unterstützung) – ersetzt
- vorher: Negiere ersten Schaden an Unterstützung; ziehe 1 bei Heilung.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: Negiere ersten Schaden an Unterstützung | ziehe 1 bei Heilung.

### Gemeinschaftsküche (`dc_b_gemeinschaftskueche_336`, Unterstützung) – ersetzt
- vorher: Heile 1 an bis zu zwei ruhenden Einheiten.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: Heile 1 an bis zu zwei ruhenden Einheiten.

### Aktenlage (`dc_b_aktenlage_337`, Unterstützung) – ersetzt
- vorher: Einmal/Zug: Einheit +1 DEF; wenn gemeldet (Aufklärung), +1 ATK.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.
- entfallen/ersetzt: Einmal/Zug: Einheit +1 DEF | wenn gemeldet, +1 ATK.

### Vollständige Ruhe (`dc_b_vollstaendige_ruhe_338`, Unterstützung) – ersetzt
- vorher: Alle eigenen Einheiten: diesen Zug nicht angreifen → +2 DEF und heile 1.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: Alle eigenen Einheiten: diesen Zug nicht angreifen → +2 DEF und heile 1.

### Feldschmied (`dc_b_feldschmied_270`, Unterstützung) – manuell
- vorher: Einmal/Zug: Ausrüstung im Abschnitt kostet 1 weniger (min. 1).
- nachher: Eigene Ausrüstung kostet 1 AP weniger (mind. 1).
- Hinweis: dauerhafter Ausrüstungsrabatt (stapelbar je Unterstützung)

### Schmiedefeuer (`dc_b_schmiedefeuer_271`, Unterstützung) – voll
- vorher: Einheiten mit Ausrüstung +1 DEF.
- nachher: Eigene Einheiten mit Ausrüstung +1 DEF.

### Ahnentafel (`dc_b_ahnentafel_272`, Unterstützung) – ersetzt
- vorher: Stirbt eigene Einheit: Abschnitt +1 DEF bis Ende nächsten Zugs.
- nachher: Einmal pro Zug, wenn eine eigene Einheit zerstört wird: ziehe 1 Karte.
- entfallen/ersetzt: Stirbt eigene Einheit: Abschnitt +1 DEF bis Ende nächsten Zugs.

### Namensliste (`dc_b_namensliste_273`, Unterstützung) – ersetzt
- vorher: Einmal/Zug: eigene Einheit mit Ausrüstung +1 ATK.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.
- entfallen/ersetzt: Einmal/Zug: eigene Einheit mit Ausrüstung +1 ATK.

### Hof der Namen (`dc_b_hof_der_namen_274`, Unterstützung) – ersetzt
- vorher: Negiere ersten Schaden an Unterstützung; Trauer: heile 1 bei Feindtötung.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: Negiere ersten Schaden an Unterstützung | Trauer: heile 1 bei Feindtötung.

### Helles Amt (`dc_b_helles_amt_275`, Unterstützung) – ersetzt
- vorher: Einmal/Zug: ziehe 1 wenn du diesen Zug niemanden opferst (keine eigene Zerstörung).
- nachher: Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug eine Einheit gespielt hast.
- entfallen/ersetzt: Einmal/Zug: ziehe 1 wenn du diesen Zug niemanden opferst.

### Bergungspunkt (`dc_b_bergungspunkt_276`, Unterstützung) – ersetzt
- vorher: Stirbt eigene oder Feind: heile 1 an Einheit im Abschnitt.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: Stirbt eigene oder Feind: heile 1 an Einheit im Abschnitt.

### Werkvertrag (`dc_b_werkvertrag_277`, Unterstützung) – ersetzt
- vorher: Ausrüstungen im Abschnitt: Träger +1 DEF.
- nachher: Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.
- entfallen/ersetzt: Ausrüstungen im Abschnitt: Träger +1 DEF.

### Totenwall (`dc_b_totenwall_278`, Unterstützung) – ersetzt
- vorher: Stirbt Feind im Abschnitt: Abschnitt +1 ATK bis Zugende; übrige Abschnitte +1 DEF bis Ende nächsten Zugs.
- nachher: Einmal pro Zug, wenn eine eigene Einheit zerstört wird: ziehe 1 Karte.
- entfallen/ersetzt: Stirbt Feind im Abschnitt: Abschnitt +1 ATK bis Zugende | übrige Abschnitte +1 DEF bis Ende nächsten Zugs.

### Laborzelt (`dc_b_laborzelt_450`, Unterstützung) – voll
- vorher: Einmal/Zug: decke Feind im Abschnitt auf.
- nachher: Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf.

### Institutsgürtel (`dc_b_institutsguertel_451`, Unterstützung) – voll
- vorher: Aufklärung kostet 1 weniger (min. 1).
- nachher: Deine Aufklärung kosten 1 AP weniger (mind. 1).

### Saal der Unterschrift (`dc_b_saal_der_unterschrift_452`, Unterstützung) – ersetzt
- vorher: Einmal/Zug: eigene Einheit +1 ATK gegen aufgeklärte ODER brich Angriff ab → heile 1.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: Einmal/Zug: eigene Einheit +1 ATK gegen aufgeklärte ODER brich Angriff ab → heile 1.

### Kliniktief (`dc_b_kliniktief_453`, Unterstützung) – Regelangleichung mit Kürzung
- vorher: Heile 1; keine Rangsortierung — alle Einheiten im Abschnitt +1 DEF.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: keine Rangsortierung — alle Einheiten im Abschnitt +1 DEF.

### Methodenblatt (`dc_b_methodenblatt_454`, Unterstützung) – ersetzt
- vorher: Ziehe 1 wenn du aufdeckst; Gerücht (kein Aufdecken): Feind −1 ATK.
- nachher: Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: Ziehe 1 wenn du aufdeckst | Gerücht: Feind −1 ATK.

### Zahlenhof (`dc_b_zahlenhof_455`, Unterstützung) – ersetzt
- vorher: Zwei Wahrheiten: ziehe 1 und decke 1 auf ODER heile 1.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: Zwei Wahrheiten: ziehe 1 und decke 1 auf ODER heile 1.

### Messau-Bank (`dc_b_messau_bank_456`, Unterstützung) – ersetzt
- vorher: Sensorik: einmal/Zug decke oberste Karte des Gegners auf (Hand/Deck-Top).
- nachher: Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: Sensorik: einmal/Zug decke oberste Karte des Gegners auf.

### Probennetz (`dc_b_probennetz_457`, Unterstützung) – ersetzt
- vorher: Feinde im Abschnitt gelten als aufgeklärt, solange Netz liegt.
- nachher: Zu Beginn deines Zuges: decke 1 verdeckte gegnerische Fronteinheit auf.
- entfallen/ersetzt: Feinde im Abschnitt gelten als aufgeklärt, solange Netz liegt.

### Abbruchregel (`dc_b_abbruchregel_458`, Unterstützung) – ersetzt
- vorher: Negiere eigenen Angriffsbonus; ziehe 2 und heile 1.
- nachher: Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.
- entfallen/ersetzt: Negiere eigenen Angriffsbonus | ziehe 2 und heile 1.

### Der Letzte der steht (`dc_so_letzter`, Soforteinsatz) – abkürzung
- vorher: Opfere die eigene Front bis auf eine Einheit. Sie erhält +1 A und +1 V je geopferter Einheit. Wird sie besiegt, erhält der Gegner 1 SP.
- nachher: Opfere die eigene Front bis auf eine Einheit. Sie erhält +1 ATK und +1 DEF je geopferter Einheit. Wird sie besiegt, erhält der Gegner 1 SP.

### Militärische Ehren (`dc_so_ehren`, Soforteinsatz) – abkürzung
- vorher: Bis zu drei eigene Einheiten, die bereits feindliche Einheiten zerstört haben, +2 A und +2 V bis Zugende.
- nachher: Bis zu drei eigene Einheiten, die bereits feindliche Einheiten zerstört haben, +2 ATK und +2 DEF bis Zugende.

### Nachschubstoß (`dc_b_nachschubstoss_162`, Soforteinsatz) – aus-code
- vorher: Heile 2 an Panzer oder Artillerie.
- nachher: Wähle eine eigene Fronteinheit: heile 2.

### Munitionsregen (`dc_b_munitionsregen_163`, Soforteinsatz) – aus-code
- vorher: Eigene Artillerie +2 ATK diesen Zug.
- nachher: Alle eigenen Artillerie: +2 ATK bis Zugende.

### Kettentausch (`dc_b_kettentausch_164`, Soforteinsatz) – aus-code
- vorher: Panzer: +1 DEF und 1 heilen.
- nachher: Wähle eine eigene Fronteinheit: +1 DEF; heile 1.

### Sofortbestellung (`dc_b_sofortbestellung_165`, Soforteinsatz) – aus-code
- vorher: Ziehe 1; Ausrüstung kostet 1 weniger diesen Zug.
- nachher: Ziehe 1 Karte. Deine nächste Ausrüstung kostet 1 AP weniger (mind. 1).

### Flächensalve (`dc_b_flaechensalve_166`, Soforteinsatz) – aus-code
- vorher: Zwei Feinde je 1 Schaden.
- nachher: Wähle 2 gegnerische Fronteinheiten: je 1 Schaden.

### Werkalarme (`dc_b_werkalarme_167`, Soforteinsatz) – aus-code
- vorher: Ziehe 1; Einheit kostet 1 weniger diesen Zug.
- nachher: Ziehe 1 Karte. Deine nächste Einheit kostet 1 AP weniger (mind. 1).

### Preisdruck (`dc_b_preisdruck_168`, Soforteinsatz) – aus-code
- vorher: Feind −2 ATK bis Zugende.
- nachher: Wähle eine gegnerische Fronteinheit: −2 ATK bis Zugende.

### Kolonnenbruch (`dc_b_kolonnenbruch_169`, Soforteinsatz) – aus-code
- vorher: Zerstöre Feind mit ≤2 DEF.
- nachher: Wähle eine gegnerische Fronteinheit: zerstöre sie, wenn sie 2 DEF oder weniger hat.

### Dauerfeuerbefehl (`dc_b_dauerfeuerbefehl_170`, Soforteinsatz) – aus-code
- vorher: Eigene Artillerie greift sofort an.
- nachher: Wähle eine eigene Fronteinheit: sie darf erneut angreifen.

### Feuerwalze (`dc_b_feuerwalze_172`, Soforteinsatz) – aus-code
- vorher: Allen Feinden 1 Schaden; Artillerie +1 ATK.
- nachher: Alle gegnerischen Fronteinheiten erleiden 1 Schaden.

### Materialersatz (`dc_b_materialersatz_173`, Soforteinsatz) – aus-code
- vorher: Heile alle Panzer und Artillerie um 1. Ziehe 1.
- nachher: Ziehe 1 Karte. Heile 1 an allen eigenen Panzer und Artillerie.

### Blutzeuge (`dc_b_blutzeuge_122`, Soforteinsatz) – spezifisch
- vorher: Opfere eine eigene Infanterie. Eine gegnerische Einheit im Abschnitt erleidet 3 Schaden.
- nachher: Opfere eine eigene Infanterie. Eine gegnerische Einheit im Abschnitt erleidet 3 Schaden.

### Sammelruf (`dc_b_sammelruf_123`, Soforteinsatz) – aus-code
- vorher: Eine eigene Infanterie hat +2 ATK bis Zugende.
- nachher: Wähle eine eigene Fronteinheit: +2 ATK bis Zugende.

### Kampfruf (`dc_b_kampfruf_125`, Soforteinsatz) – aus-code
- vorher: Eigene Infanterie im Abschnitt hat +1 ATK bis Zugende.
- nachher: Wähle einen eigenen Abschnitt: Infanterie dort +1 ATK bis Zugende.

### Opfergabe (`dc_b_opfergabe_126`, Soforteinsatz) – spezifisch
- vorher: Opfere eine eigene Einheit mit 2 oder weniger DEF: heile eine andere um 2.
- nachher: Opfere eine eigene Einheit mit 2 oder weniger DEF: heile eine andere um 2.

### Sturmglocke (`dc_b_sturmglocke_127`, Soforteinsatz) – aus-code
- vorher: Wähle eine eigene Infanterie: +3 ATK bis Zugende. Danach 1 Schaden an ihr.
- nachher: Wähle eine eigene Fronteinheit: +3 ATK bis Zugende; danach erleidet sie 1 Schaden.

### Volkszorn (`dc_b_volkszorn_128`, Soforteinsatz) – aus-code
- vorher: Jede eigene Infanterie im Abschnitt hat +1 ATK bis Zugende.
- nachher: Wähle einen eigenen Abschnitt: Infanterie dort +1 ATK bis Zugende.

### Letzter Ruf (`dc_b_letzter_ruf_130`, Soforteinsatz) – spezifisch
- vorher: Zerstöre eine eigene Infanterie: andere eigene Einheiten im Abschnitt +2 ATK bis Zugende.
- nachher: Zerstöre eine eigene Infanterie: andere eigene Einheiten im Abschnitt +2 ATK bis Zugende.

### Breites Aufgebot (`dc_b_breites_aufgebot_143`, Soforteinsatz) – spezifisch
- vorher: Eigene Infanterie kostet 1 AP weniger zum Ausspielen, mindestens 1. Eigene Infanterie hat +1 DEF.
- nachher: Eigene Infanterie kostet 1 AP weniger zum Ausspielen, mindestens 1. Eigene Infanterie hat +1 DEF.

### Sturmangriff (`dc_b_sturmangriff_144`, Soforteinsatz) – aus-code
- vorher: Wähle eine eigene Infanterie. Sie hat in diesem Zug +2 ATK.
- nachher: Wähle eine eigene Fronteinheit: +2 ATK bis Zugende.

### Treueeid (`dc_b_treueeid_637`, Soforteinsatz) – aus-code
- vorher: Eine eigene Einheit hat +2 DEF bis Zugende.
- nachher: Wähle eine eigene Fronteinheit: +2 DEF.

### Sofortablösung (`dc_b_sofortabloesung_638`, Soforteinsatz) – aus-code+DRAW
- vorher: Heile 2 DEF an einer eigenen Einheit oder ersetze sie gedanklich: ziehe 1, wenn sie beschädigt war.
- nachher: Wähle eine eigene Fronteinheit: heile 2. Ziehe 1 Karte.

### Konzentrationsruf (`dc_b_konzentrationsruf_639`, Soforteinsatz) – aus-code
- vorher: Zwei eigene Einheiten im selben Abschnitt haben +1 ATK bis Zugende.
- nachher: Wähle einen eigenen Abschnitt: Einheiten dort +1 ATK bis Zugende.

### Silberstern (`dc_b_silberstern_640`, Soforteinsatz) – aus-code
- vorher: Eine eigene Einheit hat +1 ATK und +1 DEF bis Zugende.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF.

### Kronbefehl (`dc_b_kronbefehl_641`, Soforteinsatz) – spezifisch
- vorher: Zerstöre eine gegnerische Unterstützung oder verhindere ihre nächste Aktivierung (lege sie für einen Zug still).
- nachher: Zerstöre eine gegnerische Unterstützung oder verhindere ihre nächste Aktivierung (lege sie für einen Zug still).

### Erbe-Marsch (`dc_b_erbe_marsch_642`, Soforteinsatz) – aus-code
- vorher: Bewege eine eigene Einheit in einen angrenzenden Abschnitt. Sie hat dort +1 ATK bis Zugende.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende.

### Doppelschwur (`dc_b_doppelschwur_644`, Soforteinsatz) – aus-code
- vorher: Zwei eigene Einheiten haben je +1 DEF bis Zugende. Wenn eine zerstört wird: die andere heilt 1.
- nachher: Wähle eine eigene Fronteinheit: +1 DEF.

### Druckpunkt (`dc_b_druckpunkt_645`, Soforteinsatz) – aus-code
- vorher: Füge einer gegnerischen Einheit 2 Schaden zu.
- nachher: Wähle eine gegnerische Fronteinheit: 2 Schaden.

### Linienhalten (`dc_b_linienhalten_646`, Soforteinsatz) – aus-code
- vorher: Alle eigenen Einheiten in einem Abschnitt haben +1 DEF bis Zugende.
- nachher: Wähle einen eigenen Abschnitt: Einheiten dort +1 DEF bis Zugende.

### Schwerpunkt (`dc_b_schwerpunkt_659`, Soforteinsatz) – aus-code
- vorher: Wähle einen Abschnitt. Eigene Angriffe dort +2 ATK diesen Zug. Danach erleidet eine eigene Einheit dort 1 Schaden.
- nachher: Wähle eine gegnerische Fronteinheit: 1 Schaden. Alle eigenen Einheiten: +2 ATK bis Zugende.

### Ablösung (`dc_b_abloesung_660`, Soforteinsatz) – spezifisch
- vorher: Zerstöre eine eigene Einheit. Spiele eine Einheit aus der Hand in denselben Abschnitt mit Kosten bis Kosten der Zerstörten +1. Heile sie um 1.
- nachher: Zerstöre eine eigene Einheit. Spiele eine Einheit aus der Hand in denselben Abschnitt mit Kosten bis Kosten der Zerstörten +1. Heile sie um 1.

### Weiter (`dc_b_weiter_397`, Soforteinsatz) – aus-code
- vorher: Eine beschädigte eigene Einheit +2 ATK bis Zugende.
- nachher: Wähle eine eigene Fronteinheit: +2 ATK bis Zugende.

### Schmerzstoß (`dc_b_schmerzstoss_398`, Soforteinsatz) – aus-code
- vorher: Eine eigene Einheit erleidet 1 Schaden und hat +2 ATK bis Zugende.
- nachher: Wähle eine eigene Fronteinheit: danach erleidet sie 1 Schaden; +2 ATK bis Zugende.

### Zweiter Stoß (`dc_b_zweiter_stoss_399`, Soforteinsatz) – aus-code
- vorher: Eine eigene Infanterie greift in diesem Zug ein zweites Mal mit -1 ATK.
- nachher: Wähle eine eigene Fronteinheit: sie darf erneut angreifen.

### Blutstiller (`dc_b_blutstiller_400`, Soforteinsatz) – aus-code
- vorher: Heile 2 DEF an einer beschädigten eigenen Einheit; sie hat -1 ATK bis Zugende.
- nachher: Wähle eine eigene Fronteinheit: heile 2; −1 ATK bis Zugende.

### Durchbruch (`dc_b_durchbruch_401`, Soforteinsatz) – aus-code
- vorher: Füge einer gegnerischen Einheit 2 Schaden zu; eine eigene Einheit im selben Abschnitt erleidet 1 Schaden.
- nachher: Wähle eine gegnerische Fronteinheit: 2 Schaden.

### Notimplantat (`dc_b_notimplantat_402`, Soforteinsatz) – aus-code
- vorher: Eine eigene Einheit +1 ATK und +1 DEF bis Zugende; erleidet zu Zugende 1 Schaden.
- nachher: Wähle eine gegnerische Fronteinheit: 1 Schaden; +1 ATK bis Zugende, +1 DEF.

### Ausfallquote (`dc_b_ausfallquote_403`, Soforteinsatz) – aus-code
- vorher: Ziehe 2. Eine eigene Einheit erleidet 1 Schaden.
- nachher: Wähle eine eigene Fronteinheit: danach erleidet sie 1 Schaden. Ziehe 2 Karten.

### Offene Wunde (`dc_b_offene_wunde_404`, Soforteinsatz) – aus-code
- vorher: Eine beschädigte eigene Einheit +1 ATK und +1 DEF bis Zugende.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF.

### Keilbefehl (`dc_b_keilbefehl_405`, Soforteinsatz) – aus-code
- vorher: Zwei eigene Einheiten im selben Abschnitt je +1 ATK; eine davon erleidet 1 Schaden.
- nachher: Wähle eine gegnerische Fronteinheit: 1 Schaden. Alle eigenen Einheiten: +1 ATK bis Zugende.

### Ersatzgriff (`dc_b_ersatzgriff_406`, Soforteinsatz) – aus-code
- vorher: Heile 1 DEF an einer Einheit und füge einer anderen eigenen Einheit 1 Schaden zu.
- nachher: Wähle eine eigene Fronteinheit: heile 1; danach erleidet sie 1 Schaden.

### Stoßtrupp (`dc_b_stosstrupp_419`, Soforteinsatz) – aus-code
- vorher: Wähle eine eigene Einheit. Sie hat +3 ATK bis Zugende und erleidet 2 Schaden.
- nachher: Wähle eine gegnerische Fronteinheit: 2 Schaden; +3 ATK bis Zugende.

### Weiterkämpfen (`dc_b_weiterkaempfen_420`, Soforteinsatz) – aus-code
- vorher: Eine beschädigte eigene Einheit hat +2 ATK und +1 DEF bis Zugende und kann in diesem Zug erneut angreifen.
- nachher: Wähle eine eigene Fronteinheit: +2 ATK bis Zugende, +1 DEF.

### Frühe Meldung (`dc_b_fruehe_meldung_819`, Soforteinsatz) – aus-code
- vorher: Decke 2 auf; 1 eigene Einheit +1 ATK.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende. Decke eine verdeckte gegnerische Einheit auf.

### Neue Lage (`dc_b_neue_lage_820`, Soforteinsatz) – aus-code
- vorher: Decke 1–2 auf; nächste eigene Einheit +1 ATK/+1 DEF.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF. Decke eine verdeckte gegnerische Einheit auf.

### Kurzer Schutz (`dc_b_kurzer_schutz_821`, Soforteinsatz) – aus-code
- vorher: Nach Aufdecken: 1–2 Einheiten +2 ATK gegen Aufgeklärte diesen Zug.
- nachher: Alle eigenen Einheiten: +2 ATK bis Zugende. Decke eine verdeckte gegnerische Einheit auf.

### Aufklärungsschlag (`dc_b_aufklaerungsschlag_822`, Soforteinsatz) – aus-code
- vorher: Eigene Angriffe gegen aufgeklärte Einheiten +1 ATK bis Zugende. Decke danach 1 auf.
- nachher: Alle eigenen Einheiten: +1 ATK bis Zugende. Decke eine verdeckte gegnerische Einheit auf.

### Lokalisierung (`dc_b_lokalisierung_823`, Soforteinsatz) – aus-code
- vorher: Aufgeklärte Feinde −1 DEF bis Zugende; eigene Aufklärung +1 ATK.
- nachher: Wähle eine gegnerische Fronteinheit: +1 ATK bis Zugende, −1 DEF (mind. 1); −1 DEF (mind. 1).

### Stille Woche (`dc_b_stille_woche_824`, Soforteinsatz) – aus-code
- vorher: Eigene Angriffe +1 ATK bis Zugende. [Stille Woche]
- nachher: Alle eigenen Einheiten: +1 ATK bis Zugende.

### Bürger-Ruf (`dc_b_buerger_ruf_825`, Soforteinsatz) – aus-code
- vorher: Eigene Angriffe +1 ATK bis Zugende. [Bürger-Ruf]
- nachher: Alle eigenen Einheiten: +1 ATK bis Zugende.

### Netz-Check (`dc_b_netz_check_826`, Soforteinsatz) – aus-code
- vorher: Decke 2 auf; 1 Einheit +1 DEF.
- nachher: Wähle eine eigene Fronteinheit: +1 DEF. Decke eine verdeckte gegnerische Einheit auf.

### Zwei Sätze (`dc_b_zwei_saetze_828`, Soforteinsatz) – aus-code
- vorher: Zwei Einheiten: je +1 ATK gegen Aufgeklärte.
- nachher: Wähle 2 eigene Fronteinheiten: je +1 ATK bis Zugende.

### Boden vor See (`dc_b_boden_vor_see_829`, Soforteinsatz) – aus-code
- vorher: Nach einem erlittenen Angriff: 1–2 Einheiten +2 ATK diesen Zug.
- nachher: Wähle bis zu 2 eigene Fronteinheiten: je +2 ATK bis Zugende.

### Oliv Halt (`dc_b_oliv_halt_830`, Soforteinsatz) – aus-code
- vorher: Einheit +1 ATK/+1 DEF wenn Feind im Abschnitt aufgeklärt ist.
- nachher: Wähle eine eigene Fronteinheit: +1 DEF; +1 ATK bis Zugende, +1 DEF. Wähle einen eigenen Abschnitt: Einheiten dort +1 ATK bis Zugende.

### Gesetzte Lage (`dc_b_gesetzte_lage_879`, Soforteinsatz) – aus-code
- vorher: Nächste Sofort kostet 1 weniger (min. 0).
- nachher: Dein nächster Soforteinsatz kostet 1 AP weniger (mind. 0).

### Gegenzug (`dc_b_gegenzug_880`, Soforteinsatz) – aus-code
- vorher: Eigene Angriffe +1 ATK bis Zugende.
- nachher: Alle eigenen Einheiten: +1 ATK bis Zugende.

### Falsche Akte (`dc_b_falsche_akte_881`, Soforteinsatz) – aus-code
- vorher: Nach einem erlittenen Angriff: 1–2 Einheiten +2 ATK diesen Zug; eine davon muss verdeckt gespielt worden sein oder werden.
- nachher: Wähle bis zu 2 eigene Fronteinheiten: je +2 ATK bis Zugende.

### Scheinschwerpunkt (`dc_b_scheinschwerpunkt_882`, Soforteinsatz) – aus-code
- vorher: Ende Zug: +1 DEF auf einen Abschnitt. Nächster Zugbeginn: statt dessen +1 ATK auf einen anderen Abschnitt (Scheinschwerpunkt).
- nachher: Wähle einen eigenen Abschnitt: Einheiten dort +1 DEF bis Zugende; Einheiten dort +1 ATK bis Ende des nächsten Zuges.

### Abriegeln (`dc_b_abriegeln_883`, Soforteinsatz) – spezifisch
- vorher: Eigene Artillerie darf leeren Abschnitt beschießen; Einrückende erleiden 1 Schaden. Danach: decke 1 auf.
- nachher: Eigene Artillerie darf leeren Abschnitt beschießen; Einrückende erleiden 1 Schaden. Danach: decke 1 auf.

### Stille Quote (`dc_b_stille_quote_884`, Soforteinsatz) – aus-code
- vorher: Zwei Einheiten: je +1 ATK/+1 DEF bis Zugende.
- nachher: Wähle eine eigene Fronteinheit: +1 DEF; +1 ATK bis Zugende, +1 DEF. Alle eigenen Einheiten: +1 ATK bis Zugende.

### Doppelrede (`dc_b_doppelrede_885`, Soforteinsatz) – aus-code
- vorher: Eigene Artillerie und Infanterie im Abschnitt +1 ATK.
- nachher: Wähle einen eigenen Abschnitt: Einheiten dort +1 ATK bis Zugende.

### Zwei Lagen (`dc_b_zwei_lagen_886`, Soforteinsatz) – aus-code
- vorher: Decke 2 auf; nächste eigene Einheit +1 ATK/+1 DEF. [Zwei Lagen]
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF. Decke eine verdeckte gegnerische Einheit auf.

### Kein Herr (`dc_b_kein_herr_888`, Soforteinsatz) – aus-code
- vorher: Einheit +1 ATK/+1 DEF wenn sie diesen Zug nicht bewegt wurde. [Kein Herr]
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF.

### Versorgungsnacht (`dc_b_versorgungsnacht_889`, Soforteinsatz) – aus-code
- vorher: Ziehe 2; wirf 1 ab. [Versorgungsnacht]
- nachher: Ziehe 2 Karten, dann wirf deine älteste Handkarte ab.

### Oliv Halt (`dc_b_oliv_halt_890`, Soforteinsatz) – aus-code
- vorher: Decke 2 auf; nächste eigene Einheit +1 ATK/+1 DEF.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF. Decke eine verdeckte gegnerische Einheit auf.

### Fällige Zeile (`dc_b_faellige_zeile_939`, Soforteinsatz) – aus-code
- vorher: Eigene Angriffe +1 ATK bis Zugende. [Fällige Zeile]
- nachher: Alle eigenen Einheiten: +1 ATK bis Zugende.

### Staffelung (`dc_b_staffelung_940`, Soforteinsatz) – aus-code
- vorher: 1 eigene Einheit +2 DEF bis Zugende.
- nachher: Wähle eine eigene Fronteinheit: +2 DEF.

### Früheres Datum (`dc_b_frueheres_datum_941`, Soforteinsatz) – aus-code
- vorher: Nach einem erlittenen Angriff: 1–2 Einheiten +2 ATK diesen Zug. Eine muss diesen Zug unbewegt gewesen sein.
- nachher: Wähle bis zu 2 eigene Fronteinheiten: je +2 ATK bis Zugende.

### Zielangriff (`dc_b_zielangriff_942`, Soforteinsatz) – spezifisch
- vorher: Wähle ein Ziel. Erster Schaden daran +1 ATK; Angreifer +1 DEF. Wenn das Ziel fällt: ziehe 1.
- nachher: Wähle ein Ziel. Erster Schaden daran +1 ATK; Angreifer +1 DEF. Wenn das Ziel fällt: ziehe 1.

### Abschluss (`dc_b_abschluss_943`, Soforteinsatz) – aus-code
- vorher: Einheit, die ein Ziel zerstört hat, +1 ATK bis Ende nächsten Zuges und heilt 1.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende.

### Stundung (`dc_b_stundung_944`, Soforteinsatz) – aus-code
- vorher: Nächste Sofort kostet 1 weniger (min. 0). [Stundung]
- nachher: Dein nächster Soforteinsatz kostet 1 AP weniger (mind. 0).

### Aufruf (`dc_b_aufruf_946`, Soforteinsatz) – aus-code
- vorher: 1 eigene Einheit +2 DEF bis Zugende. [Aufruf]
- nachher: Wähle eine eigene Fronteinheit: +2 DEF.

### Hausblatt (`dc_b_hausblatt_947`, Soforteinsatz) – aus-code
- vorher: Nächste Sofort kostet 1 weniger (min. 0). [Hausblatt]
- nachher: Dein nächster Soforteinsatz kostet 1 AP weniger (mind. 0).

### Versorgungszeile (`dc_b_versorgungszeile_949`, Soforteinsatz) – aus-code
- vorher: Ziehe 2; wirf 1 ab.
- nachher: Ziehe 2 Karten, dann wirf deine älteste Handkarte ab.

### Kurzer Strich (`dc_b_kurzer_strich_950`, Soforteinsatz) – aus-code
- vorher: Ziel −1 DEF bis Zugende.
- nachher: Wähle eine gegnerische Fronteinheit: −1 DEF (mind. 1).

### Auffangbefehl (`dc_b_auffangbefehl_759`, Soforteinsatz) – aus-code
- vorher: Einheit +1 ATK/+1 DEF wenn sie diesen Zug nicht bewegt wurde. [Auffangbefehl]
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF.

### Gegenruf (`dc_b_gegenruf_760`, Soforteinsatz) – aus-code
- vorher: Nach einem erlittenen Angriff: 1–2 Einheiten +2 ATK diesen Zug. [Gegenruf]
- nachher: Wähle bis zu 2 eigene Fronteinheiten: je +2 ATK bis Zugende.

### Später Stoß (`dc_b_spaeter_stoss_761`, Soforteinsatz) – aus-code
- vorher: Ziel −1 DEF bis Zugende. [Später Stoß]
- nachher: Wähle eine gegnerische Fronteinheit: −1 DEF (mind. 1).

### Auffangen (`dc_b_auffangen_762`, Soforteinsatz) – aus-code
- vorher: Eigene Einheiten +1 DEF; Angreifer -1 ATK. Bis Zugende.
- nachher: Wähle eine eigene Fronteinheit: +1 DEF; −1 ATK bis Zugende.

### Gegenstoß (`dc_b_gegenstoss_763`, Soforteinsatz) – aus-code
- vorher: Nachdem du Schaden erlitten hast: eigene Einheiten +2 ATK diesen Zug.
- nachher: Alle eigenen Einheiten: +2 ATK bis Zugende.

### Haushaltsfrage (`dc_b_haushaltsfrage_764`, Soforteinsatz) – aus-code
- vorher: Eigene Artillerie und Infanterie im Abschnitt +1 ATK. [Haushaltsfrage]
- nachher: Wähle einen eigenen Abschnitt: Einheiten dort +1 ATK bis Zugende.

### Gleichmäßiger Ruf (`dc_b_gleichmaessiger_ruf_765`, Soforteinsatz) – aus-code
- vorher: Nächste Sofort kostet 1 weniger (min. 0). [Gleichmäßiger Ruf]
- nachher: Dein nächster Soforteinsatz kostet 1 AP weniger (mind. 0).

### Nachtstellung (`dc_b_nachtstellung_766`, Soforteinsatz) – aus-code
- vorher: Einheit +1 ATK/+1 DEF wenn sie diesen Zug nicht bewegt wurde. [Nachtstellung]
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF.

### Aktenbefehl (`dc_b_aktenbefehl_767`, Soforteinsatz) – aus-code
- vorher: 1 eigene Einheit +2 DEF bis Zugende. [Aktenbefehl]
- nachher: Wähle eine eigene Fronteinheit: +2 DEF.

### Zwei Hände (`dc_b_zwei_haende_768`, Soforteinsatz) – aus-code
- vorher: 1 Einheit +2 DEF; sie darf diesen Zug nicht bewegt werden. [Zwei Hände]
- nachher: Wähle eine eigene Fronteinheit: +2 DEF; sie kann in ihrem nächsten Zug nicht angreifen.

### Sperrenkette (`dc_b_sperrenkette_769`, Soforteinsatz) – aus-code
- vorher: Ziehe 2; wirf 1 ab. [Sperrenkette]
- nachher: Ziehe 2 Karten, dann wirf deine älteste Handkarte ab.

### Steingrün Halt (`dc_b_steingruen_halt_770`, Soforteinsatz) – aus-code
- vorher: Einheit +1 ATK/+1 DEF wenn sie diesen Zug nicht bewegt wurde.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF.

### Wachwechsel (`dc_b_wachwechsel_201`, Soforteinsatz) – aus-code
- vorher: Schiebe eine eigene Einheit um 1; sie +1 DEF diesen Zug.
- nachher: Wähle eine eigene Fronteinheit: +1 DEF; versetze sie seitlich auf ein freies Feld derselben Reihe.

### Umgruppierung (`dc_b_umgruppierung_202`, Soforteinsatz) – aus-code
- vorher: Schiebe bis zu zwei eigene Einheiten um je 1 Slot.
- nachher: Wähle eine eigene Fronteinheit: versetze sie seitlich auf ein freies Feld derselben Reihe.

### Lizenzfahrt (`dc_b_lizenzfahrt_203`, Soforteinsatz) – aus-code+DRAW
- vorher: Schiebe eine Einheit um 1; ziehe 1.
- nachher: Wähle eine eigene Fronteinheit: versetze sie seitlich auf ein freies Feld derselben Reihe. Ziehe 1 Karte.

### Ablösung (`dc_b_abloesung_204`, Soforteinsatz) – aus-code
- vorher: Heile 2 an Infanterie oder Panzer.
- nachher: Wähle eine eigene Fronteinheit: heile 2.

### Kaihalten (`dc_b_kaihalten_205`, Soforteinsatz) – aus-code
- vorher: Einheit +2 DEF; kann diesen Zug nicht angreifen.
- nachher: Wähle eine eigene Fronteinheit: +2 DEF; sie kann in ihrem nächsten Zug nicht angreifen.

### Stimmloch (`dc_b_stimmloch_206`, Soforteinsatz) – aus-code
- vorher: Ziehe 1; nächste Einheit kostet 1 weniger.
- nachher: Ziehe 1 Karte. Deine nächste Einheit kostet 1 AP weniger (mind. 1).

### Straßenöffnen (`dc_b_strassenoeffnen_207`, Soforteinsatz) – aus-code
- vorher: Nächste Sofort kostet 1 weniger (min. 0). [Straßenöffnen]
- nachher: Dein nächster Soforteinsatz kostet 1 AP weniger (mind. 0).

### Sandfarbe (`dc_b_sandfarbe_208`, Soforteinsatz) – aus-code
- vorher: Ziel −1 DEF bis Zugende. [Sandfarbe]
- nachher: Wähle eine gegnerische Fronteinheit: −1 DEF (mind. 1).

### Sofortlizenz (`dc_b_sofortlizenz_209`, Soforteinsatz) – aus-code
- vorher: Ziehe 2; wirf 1 ab. [Sofortlizenz]
- nachher: Ziehe 2 Karten, dann wirf deine älteste Handkarte ab.

### Verlegung (`dc_b_verlegung_210`, Soforteinsatz) – aus-code
- vorher: Schiebe eine eigene Einheit um bis zu 2 Slots.
- nachher: Wähle eine eigene Fronteinheit: versetze sie seitlich auf ein freies Feld derselben Reihe (bis 2 Felder).

### Ausharren (`dc_b_ausharren_211`, Soforteinsatz) – aus-code+DRAW
- vorher: Einheit +3 DEF diesen Zug; ziehe 1.
- nachher: Wähle eine eigene Fronteinheit: +3 DEF. Ziehe 1 Karte.

### Zweite Verspätung (`dc_b_zweite_verspaetung_212`, Soforteinsatz) – aus-code
- vorher: Ziel −1 DEF bis Zugende. [Zweite Verspätung]
- nachher: Wähle eine gegnerische Fronteinheit: −1 DEF (mind. 1).

### Umwegbefehl (`dc_b_umwegbefehl_699`, Soforteinsatz) – aus-code+DRAW
- vorher: Bewege 1 eigene Einheit 1 Abschnitt; ziehe 1.
- nachher: Wähle eine eigene Fronteinheit: versetze sie seitlich auf ein freies Feld derselben Reihe. Ziehe 1 Karte.

### Durchlass (`dc_b_durchlass_700`, Soforteinsatz) – aus-code
- vorher: Decke 2 auf; nächste eigene Einheit +1 ATK und darf umgehen.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende. Decke eine verdeckte gegnerische Einheit auf.

### Weite Umgehung (`dc_b_weite_umgehung_701`, Soforteinsatz) – aus-code
- vorher: Bewege bis zu 2 Einheiten je 1 Abschnitt; sie +1 ATK diesen Zug.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende.

### Linienkrieg (`dc_b_linienkrieg_702`, Soforteinsatz) – aus-code
- vorher: Eigene Einheiten +1 ATK/+1 DEF, wenn sie angrenzen. Bis Zugende.
- nachher: Wähle eine eigene Fronteinheit: +1 DEF; +1 ATK bis Zugende, +1 DEF. Alle eigenen Einheiten: +1 ATK bis Zugende.

### Umgehen (`dc_b_umgehen_703`, Soforteinsatz) – spezifisch
- vorher: Wähle Feind: eigene Einheiten greifen ihn an, als stünden sie angrenzend; +1 ATK.
- nachher: Wähle Feind: eigene Einheiten greifen ihn an, als stünden sie angrenzend; +1 ATK.

### Fristtafel (`dc_b_fristtafel_704`, Soforteinsatz) – aus-code
- vorher: Eigene Angriffe +1 ATK bis Zugende. [Fristtafel]
- nachher: Alle eigenen Einheiten: +1 ATK bis Zugende.

### Schnellpass (`dc_b_schnellpass_705`, Soforteinsatz) – aus-code
- vorher: 1 Einheit +2 DEF; sie darf diesen Zug nicht bewegt werden. [Schnellpass]
- nachher: Wähle eine eigene Fronteinheit: +2 DEF; sie kann in ihrem nächsten Zug nicht angreifen.

### Nachtumgehung (`dc_b_nachtumgehung_706`, Soforteinsatz) – aus-code
- vorher: Bewege 1 Einheit 2 Abschnitte (nur leer/eigen); sie +1 DEF.
- nachher: Wähle eine eigene Fronteinheit: versetze sie seitlich auf ein freies Feld derselben Reihe.

### Umschlagbefehl (`dc_b_umschlagbefehl_707`, Soforteinsatz) – aus-code
- vorher: Ziel −1 DEF bis Zugende. [Umschlagbefehl]
- nachher: Wähle eine gegnerische Fronteinheit: −1 DEF (mind. 1).

### Doppelumgehung (`dc_b_doppelumgehung_708`, Soforteinsatz) – aus-code
- vorher: Zwei Feinde: eigene Angriffe gegen sie gelten als Flanke (+1 ATK).
- nachher: Alle eigenen Einheiten: +1 ATK bis Zugende.

### Handelskette (`dc_b_handelskette_709`, Soforteinsatz) – aus-code
- vorher: Decke 2 auf; nächste eigene Einheit +1 ATK/+1 DEF. [Handelskette]
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF. Decke eine verdeckte gegnerische Einheit auf.

### Pfadöffnung (`dc_b_pfadoeffnung_710`, Soforteinsatz) – aus-code
- vorher: Einheit +1 ATK/+1 DEF wenn sie diesen Zug bewegt wurde.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF.

### Reglement (`dc_b_reglement_579`, Soforteinsatz) – aus-code
- vorher: 1 eigene Einheit +2 DEF bis Zugende. [Reglement]
- nachher: Wähle eine eigene Fronteinheit: +2 DEF.

### Planungsrunde (`dc_b_planungsrunde_580`, Soforteinsatz) – aus-code
- vorher: Decke 2 auf; nächste eigene Einheit +1 ATK.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende. Decke eine verdeckte gegnerische Einheit auf.

### Drei Schlüssel (`dc_b_drei_schluessel_581`, Soforteinsatz) – aus-code
- vorher: Spiele eine Einheit aus der Hand mit 3 weniger Kosten (min. 1).
- nachher: Deine nächste Einheit kostet 3 AP weniger (mind. 1).

### Feuerplan (`dc_b_feuerplan_582`, Soforteinsatz) – aus-code
- vorher: Wähle eine feindliche Einheit: gilt als beobachtet. Eigene Einheiten +1 ATK gegen beobachtete diesen Zug.
- nachher: Wähle eine gegnerische Fronteinheit: sie gilt als beobachtet. Alle eigenen Einheiten: +1 ATK bis Zugende.

### Sichtlinie (`dc_b_sichtlinie_583`, Soforteinsatz) – aus-code+DRAW
- vorher: Decke 1 auf; ziehe 1.
- nachher: Decke eine verdeckte gegnerische Einheit auf. Ziehe 1 Karte.

### Pioniereinsatz (`dc_b_pioniereinsatz_584`, Soforteinsatz) – aus-code+DRAW
- vorher: Abschnitt +2 DEF; ziehe 1.
- nachher: Wähle einen eigenen Abschnitt: Einheiten dort +2 DEF bis Zugende. Ziehe 1 Karte.

### Reservistenruf (`dc_b_reservistenruf_585`, Soforteinsatz) – aus-code
- vorher: Ziel −1 DEF bis Zugende. [Reservistenruf]
- nachher: Wähle eine gegnerische Fronteinheit: −1 DEF (mind. 1).

### Befehlskopien (`dc_b_befehlskopien_586`, Soforteinsatz) – aus-code
- vorher: Kopiere: nächste Sofort kostet 1 weniger (min. 0).
- nachher: Dein nächster Soforteinsatz kostet 1 AP weniger (mind. 0).

### Doppelbeobachtung (`dc_b_doppelbeobachtung_587`, Soforteinsatz) – aus-code
- vorher: Markiere 2 Feinde als beobachtet.
- nachher: Wähle 2 gegnerische Fronteinheiten: je sie gilt als beobachtet.

### Synchronfeuer (`dc_b_synchronfeuer_588`, Soforteinsatz) – aus-code
- vorher: 1 eigene Einheit +2 DEF bis Zugende. [Synchronfeuer]
- nachher: Wähle eine eigene Fronteinheit: +2 DEF.

### Verfahrensbruch (`dc_b_verfahrensbruch_589`, Soforteinsatz) – spezifisch
- vorher: Negiere feindlichen Elite-Bonus; ziehe 1.
- nachher: Negiere feindlichen Elite-Bonus; ziehe 1.

### Planfestigung (`dc_b_planfestigung_590`, Soforteinsatz) – aus-code
- vorher: Einheit +1 ATK/+1 DEF wenn Ziel beobachtet.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF.

### Volle Ladung (`dc_b_volle_ladung_519`, Soforteinsatz) – aus-code
- vorher: Ziehe zwei Karten.
- nachher: Ziehe 2 Karten.

### Entlastung (`dc_b_entlastung_520`, Soforteinsatz) – aus-code
- vorher: Eigene Einheit, die in angegriffenen Abschnitt rückt, +1 ATK/+1 DEF.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF.

### Letzte Lieferung (`dc_b_letzte_lieferung_521`, Soforteinsatz) – aus-code
- vorher: Spiele eine Einheit aus der Hand in einen zuletzt angegriffenen Abschnitt; sie +1 ATK.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende. Deine nächste Einheit kostet 1 AP weniger (mind. 1).

### Marsch aus dem Vollen (`dc_b_marsch_aus_dem_vollen_522`, Soforteinsatz) – aus-code
- vorher: Liegt Unterstützung im Abschnitt: Einheiten dort kosten 1 weniger; +1 ATK diesen Zug.
- nachher: Wähle einen eigenen Abschnitt: Einheiten dort +1 ATK bis Zugende.

### Gemeinsamer Feind (`dc_b_gemeinsamer_feind_523`, Soforteinsatz) – aus-code
- vorher: Alle eigenen Einheiten +1 ATK diesen Zug gegen denselben Abschnitt.
- nachher: Wähle einen eigenen Abschnitt: Einheiten dort +1 ATK bis Zugende.

### Angekommener Rest (`dc_b_angekommener_rest_524`, Soforteinsatz) – aus-code
- vorher: Heile 2 an Einheiten in einem Abschnitt mit Unterstützung.
- nachher: Wähle eine eigene Fronteinheit: heile 2.

### Mole schließen (`dc_b_mole_schliessen_525`, Soforteinsatz) – aus-code
- vorher: Abschnitt +2 DEF; Feind kann hier diesen Zug keine Unterstützung spielen.
- nachher: Wähle einen eigenen Abschnitt: Einheiten dort +2 DEF bis Zugende.

### Entsatz rufen (`dc_b_entsatz_rufen_526`, Soforteinsatz) – aus-code
- vorher: Ziehe 1; nächste Einheit in angegriffenen Abschnitt +2 ATK.
- nachher: Ziehe 1 Karte.

### Anteil lassen (`dc_b_anteil_lassen_527`, Soforteinsatz) – aus-code
- vorher: Wirf 1 ab; ziehe 2.
- nachher: Ziehe 2 Karten, dann wirf deine älteste Handkarte ab.

### Bahn frei (`dc_b_bahn_frei_528`, Soforteinsatz) – aus-code
- vorher: Einheit rückt in beliebigen Abschnitt; wenn Unterstützung dort, +1 ATK.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende. Deine nächste Einheit kostet 1 AP weniger (mind. 1).

### Keine Sterne (`dc_b_keine_sterne_529`, Soforteinsatz) – spezifisch
- vorher: Negiere einen feindlichen Elite-Bonus; ziehe 1.
- nachher: Negiere einen feindlichen Elite-Bonus; ziehe 1.

### Markt bleibt (`dc_b_markt_bleibt_530`, Soforteinsatz) – aus-code
- vorher: Unterstützung im Abschnitt: Einheiten +1 DEF; ziehe 1.
- nachher: Wähle einen eigenen Abschnitt: Einheiten dort +1 DEF bis Zugende. Ziehe 1 Karte.

### Hinterhalt (`dc_b_hinterhalt_241`, Soforteinsatz) – aus-code
- vorher: Einrückende Einheit erleidet 2 Schaden; deine allein dort +1 ATK.
- nachher: Wähle eine gegnerische Fronteinheit: 2 Schaden.

### Warnfeuer (`dc_b_warnfeuer_242`, Soforteinsatz) – aus-code
- vorher: Einrückende Einheit −1 ATK diesen Zug.
- nachher: Wähle eine gegnerische Fronteinheit: −1 ATK bis Zugende.

### Steinschlag (`dc_b_steinschlag_243`, Soforteinsatz) – aus-code
- vorher: Eine gegnerische Einheit erleidet 3 Schaden.
- nachher: Wähle eine gegnerische Fronteinheit: 3 Schaden.

### Tür zu Stilltal (`dc_b_tuer_zu_stilltal_245`, Soforteinsatz) – aus-code
- vorher: Feind −2 ATK bis Zugende; du ziehst nicht.
- nachher: Wähle eine gegnerische Fronteinheit: −2 ATK bis Zugende.

### Passöffnen (`dc_b_passoeffnen_246`, Soforteinsatz) – aus-code
- vorher: Schiebe eine eigene Einheit um 1; sie +1 DEF.
- nachher: Wähle eine eigene Fronteinheit: versetze sie seitlich auf ein freies Feld derselben Reihe.

### Schonung (`dc_b_schonung_247`, Soforteinsatz) – aus-code
- vorher: Ziel −1 DEF bis Zugende. [Schonung]
- nachher: Wähle eine gegnerische Fronteinheit: −1 DEF (mind. 1).

### Zweite Linie (`dc_b_zweite_linie_248`, Soforteinsatz) – aus-code
- vorher: Zwei eigene Einheiten +1 ATK wenn im selben Abschnitt.
- nachher: Wähle 2 eigene Fronteinheiten: je +1 ATK bis Zugende.

### Verteilte Stellung (`dc_b_verteilte_stellung_250`, Soforteinsatz) – aus-code
- vorher: Allein stehende +1 DEF; Abschnitte mit 2+ Einheiten +1 ATK.
- nachher: Alle eigenen Einheiten: +1 DEF. Wähle einen eigenen Abschnitt: Einheiten dort +1 ATK bis Zugende.

### Nachhausegehen (`dc_b_nachhausegehen_251`, Soforteinsatz) – aus-code
- vorher: Schiebe bis zu zwei Einheiten um je 1; heile 1 verteilt.
- nachher: Wähle eine eigene Fronteinheit: heile 1; versetze sie seitlich auf ein freies Feld derselben Reihe.

### Erholung (`dc_b_erholung_339`, Soforteinsatz) – aus-code
- vorher: Heile 2; Ziel greift diesen Zug nicht an.
- nachher: Wähle eine eigene Fronteinheit: heile 2.

### Etappensicherung (`dc_b_etappensicherung_340`, Soforteinsatz) – aus-code
- vorher: Abschnitt +2 DEF; ruhende Einheiten dort +1 ATK bis Ende nächsten Zugs.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +2 DEF.

### Rasten (`dc_b_rasten_341`, Soforteinsatz) – aus-code
- vorher: Wähle bis zu zwei Einheiten: sie greifen nicht an, heilen 2, +1 DEF.
- nachher: Wähle 2 gegnerische Fronteinheiten: je sie kann in ihrem nächsten Zug nicht angreifen; heile 2; +1 DEF.

### Meldung (`dc_b_meldung_342`, Soforteinsatz) – aus-code+DRAW
- vorher: Decke Feind auf; heile 1; ziehe 1.
- nachher: Wähle eine eigene Fronteinheit: heile 1. Decke eine verdeckte gegnerische Einheit auf. Ziehe 1 Karte.

### Verband (`dc_b_verband_343`, Soforteinsatz) – aus-code
- vorher: Heile 1; Ziel +1 DEF bis Zugende.
- nachher: Wähle eine eigene Fronteinheit: heile 1; +1 DEF.

### Umverteilung (`dc_b_umverteilung_344`, Soforteinsatz) – aus-code
- vorher: Verschiebe 1 Schaden von einer Einheit auf Heilung 2 an einer anderen.
- nachher: Wähle eine gegnerische Fronteinheit: 1 Schaden; versetze sie seitlich auf ein freies Feld derselben Reihe.

### Frist (`dc_b_frist_345`, Soforteinsatz) – aus-code
- vorher: Einheit +2 DEF; wenn sie ruht, ziehe 1.
- nachher: Wähle eine eigene Fronteinheit: +2 DEF.

### Kein Loch (`dc_b_kein_loch_346`, Soforteinsatz) – spezifisch
- vorher: Negiere 2 Schaden an Abschnitt; keine eigene Zerstörung → heile 1.
- nachher: Negiere 2 Schaden an Abschnitt; keine eigene Zerstörung → heile 1.

### Zuteilung (`dc_b_zuteilung_347`, Soforteinsatz) – aus-code
- vorher: Spiele Unterstützung/−Ausrüstung um 1 weniger; heile 1.
- nachher: Wähle eine eigene Fronteinheit: heile 1.

### Rückruf (`dc_b_rueckruf_348`, Soforteinsatz) – aus-code
- vorher: Nimm Einheit zurück auf Hand; heile 2 an einer anderen.
- nachher: Wähle eine eigene Fronteinheit: heile 2.

### Stabilität (`dc_b_stabilitaet_349`, Soforteinsatz) – aus-code
- vorher: Abschnitt +1 DEF; Einheiten dort, die ruhen, +1 ATK nächsten Zug.
- nachher: Wähle einen eigenen Abschnitt: Einheiten dort +1 DEF bis Zugende.

### Sichtbarkeit (`dc_b_sichtbarkeit_350`, Soforteinsatz) – aus-code
- vorher: Feind −1 ATK/−1 DEF; eigene ruhende +1 DEF.
- nachher: Wähle eine gegnerische Fronteinheit: −1 ATK bis Zugende.

### Namensruf (`dc_b_namensruf_279`, Soforteinsatz) – aus-code
- vorher: Eigene Einheit mit Ausrüstung +1 ATK bis Ende nächsten Zugs.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende.

### Untersuchung (`dc_b_untersuchung_280`, Soforteinsatz) – aus-code+DRAW
- vorher: Feind −2 ATK; stirbt er: ziehe 1.
- nachher: Wähle eine gegnerische Fronteinheit: −2 ATK bis Zugende. Ziehe 1 Karte.

### Bergung (`dc_b_bergung_281`, Soforteinsatz) – aus-code
- vorher: Heile 2 an eigener Einheit; sie greift diesen Zug nicht an.
- nachher: Wähle eine eigene Fronteinheit: heile 2.

### Plattenfreigabe (`dc_b_plattenfreigabe_282`, Soforteinsatz) – aus-code
- vorher: Spiele Ausrüstung um 1 weniger; Träger +1 DEF.
- nachher: Deine nächste Ausrüstung kostet 1 AP weniger (mind. 1).

### Korrigieren (`dc_b_korrigieren_283`, Soforteinsatz) – aus-code
- vorher: Einheit +2 DEF; wenn sie Ausrüstung trägt, +1 ATK.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +2 DEF.

### Kein Schrein (`dc_b_kein_schrein_284`, Soforteinsatz) – spezifisch
- vorher: Negiere Bonus eines Feindes aus Zerstörung; eigene +1 DEF.
- nachher: Negiere Bonus eines Feindes aus Zerstörung; eigene +1 DEF.

### Schutzblatt (`dc_b_schutzblatt_285`, Soforteinsatz) – aus-code
- vorher: Ziehe 1; nächste Ausrüstung −1 Kosten.
- nachher: Ziehe 1 Karte.

### Personalregel (`dc_b_personalregel_286`, Soforteinsatz) – aus-code
- vorher: Feind −1 ATK/−1 DEF; wenn er „Opfer“ erzwingen würde: +1 Schaden.
- nachher: Wähle eine gegnerische Fronteinheit: 1 Schaden; −1 ATK bis Zugende.

### Reihenfolge (`dc_b_reihenfolge_287`, Soforteinsatz) – aus-code
- vorher: Heile 1; spiele Ausrüstung aus der Hand (−1).
- nachher: Wähle eine eigene Fronteinheit: heile 1.

### Grenze halten (`dc_b_grenze_halten_288`, Soforteinsatz) – aus-code
- vorher: Abschnitt +1 DEF; Einheiten mit Ausrüstung +1 ATK.
- nachher: Wähle einen eigenen Abschnitt: Einheiten dort +1 DEF bis Zugende.

### Absetzung (`dc_b_absetzung_289`, Soforteinsatz) – spezifisch
- vorher: Entferne eine feindliche Unterstützung oder −2 ATK einer Einheit.
- nachher: Entferne eine feindliche Unterstützung oder −2 ATK einer Einheit.

### Abnutzung (`dc_b_abnutzung_290`, Soforteinsatz) – aus-code
- vorher: Stirbt Feind: Abschnitt +1 ATK bis Zugende; übrige +1 DEF bis Ende nächsten Zugs.
- nachher: Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF.

### Aufdecken (`dc_b_aufdecken_459`, Soforteinsatz) – aus-code+DRAW
- vorher: Decke eine Einheit auf; ziehe 1.
- nachher: Decke eine verdeckte gegnerische Einheit auf. Ziehe 1 Karte.

### Punktfeuer (`dc_b_punktfeuer_460`, Soforteinsatz) – aus-code
- vorher: Aufgeklärte Einheit erleidet 3; wenn sie stirbt, decke eine weitere auf.
- nachher: Decke eine verdeckte gegnerische Einheit auf.

### Lokalisierung (`dc_b_lokalisierung_461`, Soforteinsatz) – aus-code
- vorher: Decke bis zu zwei Einheiten auf; sie −1 DEF bis Zugende.
- nachher: Wähle eine gegnerische Fronteinheit: −1 DEF (mind. 1). Decke eine verdeckte gegnerische Einheit auf.

### Zielmarkierung (`dc_b_zielmarkierung_462`, Soforteinsatz) – aus-code
- vorher: Ziel gilt als aufgeklärt; Angriffe gegen es +1 ATK.
- nachher: Decke eine verdeckte gegnerische Einheit auf. Alle eigenen Einheiten: +1 ATK bis Zugende.

### Modellstopp (`dc_b_modellstopp_463`, Soforteinsatz) – spezifisch
- vorher: Negiere einen feindlichen Bonus; ziehe 1.
- nachher: Negiere einen feindlichen Bonus; ziehe 1.

### Zweite Messung (`dc_b_zweite_messung_464`, Soforteinsatz) – aus-code
- vorher: Decke auf; wenn schon aufgeklärt: +2 Schaden statt neu.
- nachher: Wähle eine gegnerische Fronteinheit: 2 Schaden. Decke eine verdeckte gegnerische Einheit auf.

### Trotz (`dc_b_trotz_465`, Soforteinsatz) – aus-code
- vorher: Einheit +2 DEF; Angreifer −1 ATK wenn er aufgeklärt ist.
- nachher: Wähle eine eigene Fronteinheit: +2 DEF.

### Quelle nennen (`dc_b_quelle_nennen_466`, Soforteinsatz) – aus-code
- vorher: Nächste Sofort kostet 1 weniger (min. 0). [Quelle nennen]
- nachher: Dein nächster Soforteinsatz kostet 1 AP weniger (mind. 0).

### Stillprobe (`dc_b_stillprobe_467`, Soforteinsatz) – spezifisch
- vorher: Feind kann diesen Zug nicht aufdecken/angegriffen werden? Negiere Aufklärungsschutz; −2 ATK.
- nachher: Feind kann diesen Zug nicht aufdecken/angegriffen werden? Negiere Aufklärungsschutz; −2 ATK.

### Unterschreiben (`dc_b_unterschreiben_468`, Soforteinsatz) – aus-code
- vorher: Einheit +1 ATK/+1 DEF gegen aufgeklärte; oder brich Angriff → heile 2.
- nachher: Wähle eine eigene Fronteinheit: heile 2; +1 ATK bis Zugende, +1 DEF.

### Irrtum sagen (`dc_b_irrtum_sagen_469`, Soforteinsatz) – aus-code+DRAW
- vorher: Heile 1; ziehe 1; Feind −1 ATK.
- nachher: Wähle eine eigene Fronteinheit: heile 1; −1 ATK bis Zugende. Ziehe 1 Karte.

### Fachprüfung (`dc_b_fachpruefung_470`, Soforteinsatz) – aus-code
- vorher: Decke Hand des Gegners (1 Karte); spiele Sofort um 1 weniger.
- nachher: Dein nächster Soforteinsatz kostet 1 AP weniger (mind. 0).

### Fanatischer Kommandant (`dc_eq_fanat`, Ausrüstung) – abkürzung
- vorher: An Infanterie. Reale Kosten 4 AP. Träger +2 A / +2 V.
- nachher: An Infanterie. Reale Kosten 4 AP. Träger +2 ATK / +2 DEF.

### Klappspaten (`dc_eq_spat`, Ausrüstung) – abkürzung
- vorher: Zug ohne Angriff: +1 V. Beim Angriff zurück auf Ursprung.
- nachher: Zug ohne Angriff: +1 DEF. Beim Angriff zurück auf Ursprung.

### Medizinische Versorgung (`dc_eq_med`, Ausrüstung) – abkürzung
- vorher: Träger +3 V/Zug bis defMax. Flanken +2 V/Zug bis defMax.
- nachher: Träger +3 DEF/Zug bis defMax. Flanken +2 DEF/Zug bis defMax.

### Sanitätstasche (`dc_eq_tasche`, Ausrüstung) – abkürzung
- vorher: Träger +2 V/Zug bis defMax.
- nachher: Träger +2 DEF/Zug bis defMax.

### Ersatzkette (`dc_b_ersatzkette_174`, Ausrüstung) – aus-code
- vorher: Panzer +1 DEF; einmalig 1 heilen bei Schaden.
- nachher: Nur an Panzer. Träger +1 DEF. Einmalig: Erleidet der Träger Schaden, heilt er danach 1.

### Kaliberkiste (`dc_b_kaliberkiste_175`, Ausrüstung) – aus-code
- vorher: Artillerie +1 ATK.
- nachher: Nur an Artillerie. Träger +1 ATK.

### Zieloptik Konzern (`dc_b_zieloptik_konzern_177`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Aufklärung/Artillerie +1 ATK gegen Aufgeklärte.
- nachher: Nur an Artillerie.
- entfallen/ersetzt: Aufklärung/Artillerie +1 ATK gegen Aufgeklärte.

### Panzerplatte Serie (`dc_b_panzerplatte_serie_178`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Panzer +2 DEF, −1 ATK.
- nachher: Nur an Panzer.
- entfallen/ersetzt: Panzer +2 DEF, −1 ATK.

### Liefermarke (`dc_b_liefermarke_180`, Ausrüstung) – aus-code
- vorher: Wird der Träger zerstört, ziehst du 1 Karte.
- nachher: Wird der Träger zerstört, ziehe 1 Karte.

### Nüchterne Jacke (`dc_b_nuechterne_jacke_181`, Ausrüstung) – aus-code
- vorher: Infanterie +1 DEF.
- nachher: Nur an Infanterie. Träger +1 DEF.

### Feldzeichen (`dc_b_feldzeichen_135`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK, solange andere eigene Infanterie im Abschnitt liegt.
- nachher: Träger +1 ATK, solange eigene Infanterie benachbart ist.

### Glaubenssegen (`dc_b_glaubenssegen_140`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK und +1 DEF.
- nachher: Träger +1 ATK, +1 DEF.

### Balkenschild (`dc_b_balkenschild_142`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Träger +2 DEF. Träger kann nicht angreifen.
- nachher: Träger +2 DEF.
- entfallen/ersetzt: Träger kann nicht angreifen.

### Kronriemen (`dc_b_kronriemen_648`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Träger +1 ATK. Wenn Träger ersetzt wird: neuer Träger erhält +1 DEF und „Schwur“ (erster Schaden ignoriert).
- nachher: Träger +1 ATK.
- entfallen/ersetzt: Wenn Träger ersetzt wird: neuer Träger erhält +1 DEF und „Schwur“.

### Erbe-Gewehr (`dc_b_erbe_gewehr_651`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK, solange er beschädigt ist.
- nachher: Träger +1 ATK, solange er beschädigt ist.

### Kronplakette (`dc_b_kronplakette_652`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF. Wird der Träger zerstört, ziehst du 1 Karte.
- nachher: Träger +1 DEF. Wird der Träger zerstört, ziehe 1 Karte.

### Pelzkragen (`dc_b_pelzkragen_654`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK, solange beschädigt (Preis des Rechts).
- nachher: Träger +1 ATK, solange er beschädigt ist.

### Patronengurt Erbe (`dc_b_patronengurt_erbe_655`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Träger +1 ATK. Einmal: +1 zusätzlicher ATK für einen Angriff, dann ablegen.
- nachher: Träger +1 ATK.
- entfallen/ersetzt: Einmal: +1 zusätzlicher ATK für einen Angriff, dann ablegen.

### Stabskarte (`dc_b_stabskarte_656`, Ausrüstung) – aus-code
- vorher: Solange ausgerüstet: einmal pro Zug darfst du statt Angriff 1 DEF an einer anderen Einheit im Abschnitt heilen.
- nachher: Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Schmerzchip (`dc_b_schmerzchip_412`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK, solange beschädigt.
- nachher: Träger +1 ATK, solange er beschädigt ist.

### Maßplakette (`dc_b_massplakette_416`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF. Wird der Träger zerstört, ziehst du 1 Karte.
- nachher: Träger +1 DEF. Wird der Träger zerstört, ziehe 1 Karte.

### Offenes Gerät (`dc_b_offenes_geraet_831`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK gegen Aufgeklärte.
- nachher: Träger +1 ATK gegen beobachtete Ziele.

### Plattenträger (`dc_b_plattentraeger_832`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF, wenn Unterstützung angrenzt. [Plattenträger]
- nachher: Träger +1 DEF, solange du eine Unterstützung im Feld hast.

### Sandstreifen (`dc_b_sandstreifen_833`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; einmal/Zug heile 1 nach Kampf. [Sandstreifen]
- nachher: Träger +1 ATK. Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Sensor-Knoten (`dc_b_sensor_knoten_834`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Träger +1 ATK; einmal/Zug: decke 1 auf.
- nachher: Träger +1 ATK. Beim Anlegen: decke eine verdeckte gegnerische Einheit auf.
- entfallen/ersetzt: einmal/Zug: decke 1 auf.

### Nov-Werkzeug (`dc_b_nov_werkzeug_835`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; einmal/Zug heile 1 nach Kampf.
- nachher: Träger +1 ATK. Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Quellenmappe (`dc_b_quellenmappe_836`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK. [Quellenmappe]
- nachher: Träger +1 ATK.

### Netzlampe (`dc_b_netzlampe_837`, Ausrüstung) – aus-code
- vorher: Träger: einmal/Zug heile 1. [Netzlampe]
- nachher: Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Verbindungssiegel (`dc_b_verbindungssiegel_839`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Träger +1 ATK gegen Aufgeklärte; einmal/Zug: decke 1 auf.
- nachher: Beim Anlegen: decke eine verdeckte gegnerische Einheit auf.
- entfallen/ersetzt: einmal/Zug: decke 1 auf.

### Verlustliste (`dc_b_verlustliste_840`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; ziehe 1 wenn du diesen Zug Sofort spielst. [Verlustliste]
- nachher: Träger +1 ATK. Einmal pro Zug: Spielst du einen Soforteinsatz, ziehe 1 Karte.

### Schwarzes Siegel (`dc_b_schwarzes_siegel_891`, Ausrüstung) – aus-code
- vorher: Träger kostet 1 weniger (min. 1); beim Ausspielen ziehe 1.
- nachher: Beim Anlegen: ziehe 1 Karte. legen: ziehe 1 Karte.
- AP: 1 → 0

### Aktenmappe (`dc_b_aktenmappe_892`, Ausrüstung) – aus-code
- vorher: Träger: einmal/Zug heile 1.
- nachher: Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Stumpfmantel (`dc_b_stumpfmantel_893`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF; einmal/Zug: ziehe 1 wenn Sofort gespielt.
- nachher: Träger +1 DEF. Einmal pro Zug: Spielst du einen Soforteinsatz, ziehe 1 Karte.

### Lesegerät (`dc_b_lesegeraet_894`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Träger +1 ATK/+1 DEF; einmal/Zug: Einheit hier +1 DEF.
- nachher: Träger +1 ATK, +1 DEF.
- entfallen/ersetzt: einmal/Zug: Einheit hier +1 DEF.

### Stillkragen (`dc_b_stillkragen_895`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; +1 DEF wenn unbewegt. [Stillkragen]
- nachher: Träger +1 ATK. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde.

### Vel-Stempel (`dc_b_vel_stempel_896`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF; einmal/Zug: ziehe 1, wenn du diesen Zug eine Sofort mit Aufdecken-Effekt gespielt hast.
- nachher: Träger +1 DEF. Einmal pro Zug: Spielst du einen Soforteinsatz mit Aufdecken, ziehe 1 Karte.

### Falschmarke (`dc_b_falschmarke_897`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; ziehe 1 wenn du diesen Zug Sofort spielst. [Falschmarke]
- nachher: Träger +1 ATK. Einmal pro Zug: Spielst du einen Soforteinsatz, ziehe 1 Karte.

### Grenzsiegel (`dc_b_grenzsiegel_898`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF, wenn Unterstützung angrenzt.
- nachher: Träger +1 DEF, solange du eine Unterstützung im Feld hast.

### Abschriftmappe (`dc_b_abschriftmappe_952`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF. [Abschriftmappe]
- nachher: Träger +1 DEF.

### Nussrock (`dc_b_nussrock_953`, Ausrüstung) – aus-code
- vorher: Träger: einmal/Zug heile 1. (Nussrock)
- nachher: Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Vorlesegerät (`dc_b_vorlesegeraet_954`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; ziehe 1 wenn du diesen Zug Sofort spielst.
- nachher: Träger +1 ATK. Einmal pro Zug: Spielst du einen Soforteinsatz, ziehe 1 Karte.

### Stillmanschette (`dc_b_stillmanschette_955`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; einmal/Zug heile 1 nach Kampf. [Stillmanschette]
- nachher: Träger +1 ATK. Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Kal-Feder (`dc_b_kal_feder_956`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF; einmal/Zug: ziehe 1 wenn Sofort gespielt und ein Ziel genannt wurde diesen Zug.
- nachher: Träger +1 DEF. Einmal pro Zug: Spielst du einen Soforteinsatz, ziehe 1 Karte.

### Fälligkeitsmarke (`dc_b_faelligkeitsmarke_957`, Ausrüstung) – aus-code
- vorher: Träger: einmal/Zug heile 1. [Fälligkeitsmarke]
- nachher: Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Haussiegel (`dc_b_haussiegel_958`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF. [Haussiegel]
- nachher: Träger +1 DEF.

### Fallakte (`dc_b_fallakte_960`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF. [Fallakte]
- nachher: Träger +1 DEF.

### Kronenspiegel (`dc_b_kronenspiegel_771`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF; einmal/Zug: ziehe 1 wenn Sofort gespielt. [Kronenspiegel]
- nachher: Träger +1 DEF. Einmal pro Zug: Spielst du einen Soforteinsatz, ziehe 1 Karte.

### Bindungszeichen (`dc_b_bindungszeichen_772`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK. [Bindungszeichen]
- nachher: Träger +1 ATK.

### Steingrünmantel (`dc_b_steingruenmantel_773`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF, wenn Unterstützung angrenzt. [Steingrünmantel]
- nachher: Träger +1 DEF, solange du eine Unterstützung im Feld hast.

### Zeughausschlüssel (`dc_b_zeughausschluessel_774`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF, wenn Unterstützung angrenzt. [Zeughausschlüssel]
- nachher: Träger +1 DEF, solange du eine Unterstützung im Feld hast.

### Markenkragen (`dc_b_markenkragen_775`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF, wenn Unterstützung angrenzt. [Markenkragen]
- nachher: Träger +1 DEF, solange du eine Unterstützung im Feld hast.

### Parlamentsstempel (`dc_b_parlamentsstempel_776`, Ausrüstung) – aus-code
- vorher: Träger: einmal/Zug heile 1. [Parlamentsstempel]
- nachher: Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Ölflasche (`dc_b_oelflasche_777`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK. [Ölflasche]
- nachher: Träger +1 ATK.

### Grenzmarke (`dc_b_grenzmarke_778`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; +1 DEF wenn unbewegt. [Grenzmarke]
- nachher: Träger +1 ATK. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde.

### Doppelhaus-Siegel (`dc_b_doppelhaus_siegel_779`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF, wenn Unterstützung angrenzt. [Doppelhaus-Siegel]
- nachher: Träger +1 DEF, solange du eine Unterstützung im Feld hast.

### Aktenmappe (`dc_b_aktenmappe_780`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; +1 DEF wenn unbewegt. [Aktenmappe]
- nachher: Träger +1 ATK. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde.

### Spare Paspel (`dc_b_spare_paspel_213`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF. [Spare Paspel]
- nachher: Träger +1 DEF.

### Marschkette (`dc_b_marschkette_214`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; ziehe 1 wenn du diesen Zug Sofort spielst. [Marschkette]
- nachher: Träger +1 ATK. Einmal pro Zug: Spielst du einen Soforteinsatz, ziehe 1 Karte.

### Kai-Optik (`dc_b_kai_optik_215`, Ausrüstung) – aus-code
- vorher: Träger: einmal/Zug heile 1. [Kai-Optik]
- nachher: Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Lizenzsiegel (`dc_b_lizenzsiegel_216`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Träger +1 ATK/+1 DEF; einmal/Zug: Einheit hier +1 DEF. [Lizenzsiegel]
- nachher: Träger +1 ATK, +1 DEF.
- entfallen/ersetzt: einmal/Zug: Einheit hier +1 DEF.

### Etappenplatte (`dc_b_etappenplatte_217`, Ausrüstung) – aus-code
- vorher: Träger kostet 1 weniger (min. 1); beim Ausspielen ziehe 1. [Etappenplatte]
- nachher: Beim Anlegen: ziehe 1 Karte. legen: ziehe 1 Karte.
- AP: 2 → 1

### Munitionskai (`dc_b_munitionskai_218`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; +1 DEF wenn unbewegt. [Munitionskai]
- nachher: Träger +1 ATK. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde.

### Wartezettel (`dc_b_wartezettel_219`, Ausrüstung) – aus-code
- vorher: Träger kostet 1 weniger (min. 1); beim Ausspielen ziehe 1. [Wartezettel]
- nachher: Beim Anlegen: ziehe 1 Karte. legen: ziehe 1 Karte.
- AP: 1 → 0

### Kaliberkiste Ferne (`dc_b_kaliberkiste_ferne_220`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; einmal/Zug heile 1 nach Kampf. [Kaliberkiste Ferne]
- nachher: Träger +1 ATK. Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Clip Kronenhof (`dc_b_clip_kronenhof_221`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; +1 DEF wenn unbewegt. [Clip Kronenhof]
- nachher: Träger +1 ATK. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde.

### Marktvertrag (`dc_b_marktvertrag_711`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK, wenn du diesen Zug Sofort spielst.
- nachher: Träger +1 ATK, wenn du in diesem Zug einen Soforteinsatz gespielt hast.

### Offener Knoten (`dc_b_offener_knoten_712`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF, wenn Unterstützung angrenzt. [Offener Knoten]
- nachher: Träger +1 DEF, solange du eine Unterstützung im Feld hast.

### Sandmantel (`dc_b_sandmantel_713`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; einmal/Zug heile 1 nach Kampf. [Sandmantel]
- nachher: Träger +1 ATK. Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Packsattel (`dc_b_packsattel_715`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; +1 DEF wenn unbewegt.
- nachher: Träger +1 ATK. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde.

### Passschlüssel (`dc_b_passschluessel_716`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Träger +1 DEF; einmal/Zug: bewege Träger 1 Abschnitt.
- nachher: Träger +1 DEF.
- entfallen/ersetzt: einmal/Zug: bewege Träger 1 Abschnitt.

### Tuchknoten (`dc_b_tuchknoten_717`, Ausrüstung) – aus-code
- vorher: Träger: einmal/Zug heile 1 nach Bewegung.
- nachher: Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Wegmarke (`dc_b_wegmarke_718`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Träger +1 ATK; bei Angriff aus Bewegung +1 ATK.
- nachher: Träger +1 ATK.
- entfallen/ersetzt: bei Angriff aus Bewegung +1 ATK.

### Endlose Kolonne (`dc_b_endlose_kolonne_719`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Träger +1 ATK/+1 DEF; einmal/Zug: spiele Einheit 1 billiger (min. 1) wenn Träger bewegt.
- nachher: Träger +1 ATK, +1 DEF.
- entfallen/ersetzt: einmal/Zug: spiele Einheit 1 billiger (min. 1) wenn Träger bewegt.

### Satteltasche (`dc_b_satteltasche_720`, Ausrüstung) – aus-code
- vorher: Träger: einmal/Zug heile 1. [Satteltasche]
- nachher: Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Zielskizze (`dc_b_zielskizze_591`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK gegen beobachtete.
- nachher: Träger +1 ATK gegen beobachtete Ziele.

### Dienstbuch (`dc_b_dienstbuch_592`, Ausrüstung) – aus-code
- vorher: Träger kostet 1 weniger (min. 1); beim Ausspielen decke 1 auf.
- nachher: Beim Anlegen: decke eine verdeckte gegnerische Einheit auf. Beim Anlegen: decke eine verdeckte gegnerische Einheit auf. nerische Einheit auf.
- AP: 1 → 0

### Normhelm (`dc_b_normhelm_593`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF; einmal/Zug: ziehe 1 wenn Sofort gespielt. [Normhelm]
- nachher: Träger +1 DEF. Einmal pro Zug: Spielst du einen Soforteinsatz, ziehe 1 Karte.

### Normgewehr (`dc_b_normgewehr_595`, Ausrüstung) – aus-code
- vorher: Träger kostet 1 weniger (min. 1); beim Ausspielen ziehe 1. [Normgewehr]
- nachher: Beim Anlegen: ziehe 1 Karte. legen: ziehe 1 Karte.
- AP: 1 → 0

### Aktenmappe (`dc_b_aktenmappe_596`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Träger +1 DEF; einmal/Zug: decke 1 auf.
- nachher: Träger +1 DEF. Beim Anlegen: decke eine verdeckte gegnerische Einheit auf.
- entfallen/ersetzt: einmal/Zug: decke 1 auf.

### Messlatte (`dc_b_messlatte_597`, Ausrüstung) – aus-code
- vorher: Träger: einmal/Zug heile 1 wenn Ziel beobachtet.
- nachher: Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Zielzuweisung (`dc_b_zielzuweisung_598`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Träger +1 ATK; bei Angriff Ziel gilt als beobachtet.
- nachher: Träger +1 ATK.
- entfallen/ersetzt: bei Angriff Ziel gilt als beobachtet.

### Normverband (`dc_b_normverband_599`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK/+1 DEF, wenn Infanterie und Artillerie (oder Panzer) im Abschnitt.
- nachher: Träger +1 ATK und +1 DEF, solange eigene Infanterie benachbart ist und eigene Artillerie steht.

### Freigabeformular (`dc_b_freigabeformular_600`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF, wenn Unterstützung angrenzt. [Freigabeformular]
- nachher: Träger +1 DEF, solange du eine Unterstützung im Feld hast.

### Kaikiste (`dc_b_kaikiste_531`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK, wenn im Abschnitt eine Unterstützung liegt.
- nachher: Träger +1 ATK, solange du eine offene Unterstützung hast.

### Ladungsliste (`dc_b_ladungsliste_532`, Ausrüstung) – aus-code
- vorher: Träger kostet 1 weniger, wenn Unterstützung im Abschnitt (min. 1).
- nachher: Kostet 1 AP weniger, wenn du eine Unterstützung im Feld hast.

### Dunkelblau (`dc_b_dunkelblau_533`, Ausrüstung) – aus-code
- vorher: Träger: einmal/Zug heile 1. [Dunkelblau]
- nachher: Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Kranzeichen (`dc_b_kranzeichen_535`, Ausrüstung) – aus-code
- vorher: Beim Ausspielen: ziehe 1 wenn Unterstützung im Spiel.
- nachher: Beim Anlegen: ziehe 1 Karte.

### Zollsäckchen (`dc_b_zollsaeckchen_537`, Ausrüstung) – aus-code
- vorher: Träger: einmal/Zug heile 1 wenn Unterstützung liegt.
- nachher: Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Fahrplan (`dc_b_fahrplan_538`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Träger +1 DEF; bei Rücken in angegriffenen Abschnitt +1 ATK.
- nachher: Träger +1 DEF.
- entfallen/ersetzt: bei Rücken in angegriffenen Abschnitt +1 ATK.

### Talposten (`dc_b_talposten_252`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF, wenn allein im Abschnitt.
- nachher: Träger +1 DEF, solange er allein im Abschnitt steht.

### Steinwurf (`dc_b_steinwurf_253`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK gegen Einrückende.
- nachher: Träger +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.

### Schieferumhang (`dc_b_schieferumhang_254`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; +1 DEF wenn unbewegt. [Schieferumhang]
- nachher: Träger +1 ATK. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde.

### Passoptik (`dc_b_passoptik_255`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Aufklärung/Artillerie +1 ATK gegen Einrückende.
- nachher: Nur an Artillerie.
- entfallen/ersetzt: Aufklärung/Artillerie +1 ATK gegen Einrückende.

### Tunnelplatte (`dc_b_tunnelplatte_256`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; einmal/Zug heile 1 nach Kampf. [Tunnelplatte]
- nachher: Träger +1 ATK. Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Leserklammer (`dc_b_leserklammer_257`, Ausrüstung) – aus-code
- vorher: Träger: einmal/Zug heile 1. [Leserklammer]
- nachher: Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Engenkette (`dc_b_engenkette_258`, Ausrüstung) – aus-code
- vorher: Träger +1 DEF. [Engenkette]
- nachher: Träger +1 DEF.

### Hangladung (`dc_b_hangladung_259`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; +1 DEF wenn unbewegt. [Hangladung]
- nachher: Träger +1 ATK. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde.

### Eidstempel (`dc_b_eidstempel_260`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; +1 DEF wenn unbewegt. [Eidstempel]
- nachher: Träger +1 ATK. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde.

### Verbundnadel (`dc_b_verbundnadel_261`, Ausrüstung) – aus-code
- vorher: +1 ATK/+1 DEF, wenn 2+ eigene Einheiten im Abschnitt.
- nachher: Träger +1 ATK und +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht.

### Institutionsstoff (`dc_b_institutionsstoff_353`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Träger +1 ATK/+1 DEF; einmal/Zug: Einheit hier +1 DEF. [Institutionsstoff]
- nachher: Träger +1 ATK, +1 DEF.
- entfallen/ersetzt: einmal/Zug: Einheit hier +1 DEF.

### Biometrieband (`dc_b_biometrieband_355`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK gegen aufgeklärte.
- nachher: Träger +1 ATK gegen beobachtete Ziele.

### Schutzplane (`dc_b_schutzplane_356`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; einmal/Zug heile 1 nach Kampf. [Schutzplane]
- nachher: Träger +1 ATK. Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.

### Knochenplatte (`dc_b_knochenplatte_291`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK. [Knochenplatte]
- nachher: Träger +1 ATK.

### Erinnerungsmarke (`dc_b_erinnerungsmarke_293`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK, wenn in diesem Zug eigene Einheit zerstört.
- nachher: Träger +1 ATK, wenn in diesem Zug eine eigene Einheit zerstört wurde.

### Schmiedehammer (`dc_b_schmiedehammer_295`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Träger +1 ATK/+1 DEF; einmal/Zug: Einheit hier +1 DEF. [Schmiedehammer]
- nachher: Träger +1 ATK, +1 DEF.
- entfallen/ersetzt: einmal/Zug: Einheit hier +1 DEF.

### Schwere Platte (`dc_b_schwere_platte_296`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK. [Schwere Platte]
- nachher: Träger +1 ATK.

### Knochennagel (`dc_b_knochennagel_297`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Träger +1 DEF; überlebt Angriff: +1 ATK bis Zugende.
- nachher: Träger +1 DEF.
- entfallen/ersetzt: überlebt Angriff: +1 ATK bis Zugende.

### Messgerät (`dc_b_messgeraet_471`, Ausrüstung) – Regelangleichung mit Kürzung
- vorher: Träger +1 ATK/+1 DEF; einmal/Zug: Einheit hier +1 DEF. [Messgerät]
- nachher: Träger +1 ATK, +1 DEF.
- entfallen/ersetzt: einmal/Zug: Einheit hier +1 DEF.

### Technische Linie (`dc_b_technische_linie_473`, Ausrüstung) – aus-code
- vorher: Träger +1 ATK; ziehe 1 wenn du diesen Zug Sofort spielst. [Technische Linie]
- nachher: Träger +1 ATK. Einmal pro Zug: Spielst du einen Soforteinsatz, ziehe 1 Karte.

### Probenkoffer (`dc_b_probenkoffer_475`, Ausrüstung) – aus-code
- vorher: Beim Ausspielen: decke 1 auf.
- nachher: Beim Anlegen: decke eine verdeckte gegnerische Einheit auf.

### Punktvisier (`dc_b_punktfeuer_479`, Ausrüstung) – aus-code
- vorher: Träger +2 ATK gegen aufgeklärte.
- nachher: Träger +2 ATK gegen beobachtete Ziele.

## Balance-Hinweise

### t231 bereinigt (Werte / AP)
| Karte | vorher | nachher | Begründung |
|---|---|---|---|
| Panzertrupp Hammer (`dc_eh_hammer`) | 4 AP, 7/6 (13) | **5 AP, 6/5 (11)** | schwerer Trupp: AP hoch, Werte Richtung Median+2 @5 |
| Werkrott-Kolonne (`dc_b_werkrott_kolonne_614`) | 4 AP, 3/7 (10) | **4 AP, 3/5 (8)** | Silber-Kolonne, Defensive gesenkt |
| Straßenriegel (`dc_b_strassenriegel_491`) | 3 AP, 2/7 (9) | **3 AP, 2/5 (7)** | Bronze-Riegel auf Median+1 |
| Werkbach-Riegel (`dc_b_werkbach_riegel_430`) | 3 AP, 2/7 (9) | **3 AP, 2/5 (7)** | wie Straßenriegel |
| Panzerzug Faustkeil (`dc_eh_faustkeil`) | 5 AP, 8/6 (14) | **6 AP, 7/5 (12)** | Elite/Führungsfahrzeug: AP hoch |
| Haubitzenzug (`dc_eh_haubitze`) | 4 AP, 6/4 (10) | **4 AP, 5/4 (9)** | Artillerie ATK −1 auf Median+2 |
| Schwerer Panzer Koloss (`dc_eh_koloss`) | 5 AP, 7/9 (16) | **6 AP, 6/6 (12)** | Elite mit SCHADEN_MINUS: AP hoch, Werte geglättet |

### Selbstrabatt-Ausrüstung (t231)
Gedruckte AP wieder der unrabattierte Wert; −1 AP nur unter Bedingung (CM `cost`):
| Karte | AP | Bedingung |
|---|---|---|
| Schwarzes Siegel | 0→**1** | Unterstützung im Spiel |
| Etappenplatte | 1→**2** | Unterstützung im Spiel |
| Wartezettel | 0→**1** | Unterstützung im Spiel |
| Dienstbuch | 0→**1** | Unterstützung im Spiel |
| Normgewehr | 0→**1** | eigene Infanterie an der Front |

### Unverändert
- Lagerhaus (`dc_su_lager`), Implantatlager (`dc_b_implantatlager_388`), Feldschmied (`dc_b_feldschmied_270`): stapelbarer Ausrüstungsrabatt bleibt.
