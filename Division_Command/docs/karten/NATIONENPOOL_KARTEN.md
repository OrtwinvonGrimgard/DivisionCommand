# Nationenpool – vollständige Liste der 640 neuen Karten

Automatisch erzeugt aus `web/js/data/sets/types/nation_pools.js` (`node scripts/nation_pools/gen_docs.js`). Alle Karten: Artwork-Platzhalter (`art_status: platzhalter`), Effekte ausschließlich über bestehende Engine-Codes.

## Steinmark (40 neue Karten)

### Paragraphenzug
`dc_np_steinmark_paragraphenzug` · Einheit · Bronze · 2 AP

- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)

- Effektcodes: –
- *Erst die Vorschrift, dann der Graben.*

### Normschützen
`dc_np_steinmark_normschuetzen` · Einheit · Bronze · 1 AP

- **Erbitterung** (Hat +1 ATK für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)
- Kurztext: Angriffe gegen ungepanzerte Ziele: +1 Schaden.
- Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: FEUERUEBERLEGENHEIT
- *Gleicher Abstand, gleiches Kaliber, gleiches Ergebnis.*

### Begleitzug Freigabe
`dc_np_steinmark_begleitzug_freigabe` · Einheit · Bronze · 2 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- Kurztext: Benachbarte eigene Infanterie +1 DEF.
- Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: MECH_AURA
- *Wer neben dem Standard steht, steht sicher.*

### Akteneinsichtstrupp
`dc_np_steinmark_akteneinsichtstrupp` · Einheit · undefined · 2 AP

- **Ablösung** (Wird diese Einheit zerstört, kostet die nächste eigene Einheit, die du auf dasselbe Feld setzt, 1 AP weniger (mindestens 1), bis das Feld wieder besetzt wurde oder bis zum Ende deines nächsten Zugs, was zuerst eintritt. Höchstens eine solche Markierung pro Feld.)
- Kurztext: Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.
- Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie.
- Effektcodes: HAND_PEEK
- *Was der Gegner plant, steht irgendwo geschrieben.*

### Landwehr Bezirk Vier
`dc_np_steinmark_landwehr_bezirk_vier` · Einheit · Bronze · 3 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Bürger in Uniform, Dienstzeit nach Gesetz.*

### Verfahrensriegel
`dc_np_steinmark_verfahrensriegel` · Einheit · undefined · 3 AP

- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Der Riegel hält, weil jeder weiß, wo er steht.*

### Normpanzer Baureihe Zwei
`dc_np_steinmark_normpanzer_baureihe_zwei` · Einheit · Bronze · 3 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Ersatzteile passen in jeden Wagen der Baureihe.*

### Bezirkskette
`dc_np_steinmark_bezirkskette` · Einheit · Bronze · 3 AP

- **Ablösung** (Wird diese Einheit zerstört, kostet die nächste eigene Einheit, die du auf dasselbe Feld setzt, 1 AP weniger (mindestens 1), bis das Feld wieder besetzt wurde oder bis zum Ende deines nächsten Zugs, was zuerst eintritt. Höchstens eine solche Markierung pro Feld.)
- Kurztext: Angriffe gegen gepanzerte Ziele: +1 Schaden.
- Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: IGNORE_DEF
- *Abgenommen für Gegner mit Panzerung.*

### Freigabewagen
`dc_np_steinmark_freigabewagen` · Einheit · undefined · 4 AP

- **Ablösung** (Wird diese Einheit zerstört, kostet die nächste eigene Einheit, die du auf dasselbe Feld setzt, 1 AP weniger (mindestens 1), bis das Feld wieder besetzt wurde oder bis zum Ende deines nächsten Zugs, was zuerst eintritt. Höchstens eine solche Markierung pro Feld.)
- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Rollt erst, wenn die Flanken gedeckt sind.*

### Prüfstandkeil
`dc_np_steinmark_pruefstandkeil` · Einheit · Bronze · 4 AP

- **Ablösung** (Wird diese Einheit zerstört, kostet die nächste eigene Einheit, die du auf dasselbe Feld setzt, 1 AP weniger (mindestens 1), bis das Feld wieder besetzt wurde oder bis zum Ende deines nächsten Zugs, was zuerst eintritt. Höchstens eine solche Markierung pro Feld.)

- Effektcodes: –
- *Hundert Stunden Prüfstand, dann erst Front.*

### Bundesschild Neun
`dc_np_steinmark_bundesschild_neun` · Einheit · Gold · 5 AP

- **Ablösung** (Wird diese Einheit zerstört, kostet die nächste eigene Einheit, die du auf dasselbe Feld setzt, 1 AP weniger (mindestens 1), bis das Feld wieder besetzt wurde oder bis zum Ende deines nächsten Zugs, was zuerst eintritt. Höchstens eine solche Markierung pro Feld.)
- **Zähigkeit** (Hat +1 DEF für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)
- Kurztext: Jeder Schaden an dieser Einheit −2.
- Schwere Panzerung: Jeder einzelne Schaden, den diese Einheit erleidet (Kampf, Soforteinsatz, Effekt), wird um 2 verringert, mindestens auf 0.
- Effektcodes: SCHADEN_MINUS
- *Abgenommen, gestempelt, unzerstörbar – laut Gutachten.*

### Feuerplanrohr
`dc_np_steinmark_feuerplanrohr` · Einheit · Bronze · 3 AP

- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Schießt nur auf freigegebene Planquadrate – also überallhin.*

### Freigabebatterie
`dc_np_steinmark_freigabebatterie` · Einheit · undefined · 4 AP

- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Zweite Unterschrift: auch Depots sind Ziele.*

### Normmörser
`dc_np_steinmark_normmoerser` · Einheit · Bronze · 2 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- Kurztext: Steilfeuer I.
- Steilfeuer I.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Kleines Rohr, große Akte.*

### Messbatterie Grenzstein
`dc_np_steinmark_messbatterie_grenzstein` · Einheit · Bronze · 3 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- Kurztext: Steilfeuer II. Angriffe gegen ungepanzerte Ziele: +1 Schaden.
- Steilfeuer II.
- Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: FEUERUEBERLEGENHEIT
- *Vermessen, bevor geschossen wird.*

### Dreischlüssel-Haubitze
`dc_np_steinmark_dreischluessel_haubitze` · Einheit · Gold · 5 AP

- **Fernschuss** (Hat +1 Reichweite (bei Steilfeuer nur Stufen I–III; IV/V bereits ganze Front).)
- Kurztext: Steilfeuer V: Front + Support (+2 AP).
- Steilfeuer V: Front + Support (+2 AP).
- Die Einheit zählt für alle Regeln als Artillerie.
- Supportzone-Angriff 3 AP; Front 1 AP.
- Effektcodes: ATTACK_ANY_FRONT, ATTACK_SUPPORT
- *Drei Unterschriften, ein Einschlag.*

### Vermessungstrupp
`dc_np_steinmark_vermessungstrupp` · Einheit · Bronze · 1 AP

- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Maßband, Theodolit, Funkgerät.*

### Lagebildmelder
`dc_np_steinmark_lagebildmelder` · Einheit · Bronze · 2 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Zivile und militärische Lage auf einem Blatt.*

### Grenzbeobachter
`dc_np_steinmark_grenzbeobachter` · Einheit · undefined · 2 AP

- **Hinterhalt** (Hat +2 ATK bei ihrem ersten Angriff nach dem Aufdecken.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: AUFKLAERUNG, RELOCATE_HIDE
- *Sieht, meldet, verschwindet im Protokoll.*

### Bundesrichter-Kompanie
`dc_np_steinmark_bundesrichter_kompanie` · Einheit · undefined · 4 AP

- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Urteil vor Ort, Vollzug sofort.*

### Kommission der Drei
`dc_np_steinmark_kommission_der_drei` · Einheit · Gold · 5 AP

- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF. Angriffe gegen ungepanzerte Ziele: +1 Schaden.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: FLANK_DEF, FEUERUEBERLEGENHEIT
- *Drei Schlüssel, eine Front.*

### Bezirksarchiv
`dc_np_steinmark_bezirksarchiv` · Unterstützung · undefined · 3 AP

- Kurztext: Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Effektcodes: TURN_DRAW
- *Jede Lage hat eine Vorlage.*

### Ordnungsamt Front
`dc_np_steinmark_ordnungsamt_front` · Unterstützung · undefined · 3 AP

- Kurztext: Jeder Schaden an deinen Fronteinheiten −1.
- Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.
- Effektcodes: REDUCE_DAMAGE
- *Schaden wird gemeldet, geprüft und gemindert.*

### Verfahrenshoheit
`dc_np_steinmark_verfahrenshoheit` · Unterstützung · Gold · 5 AP

- Kurztext: Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert. Jeder Schaden an deinen Fronteinheiten −1.
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.
- Effektcodes: TURN_DRAW, REDUCE_DAMAGE
- *Wer das Verfahren führt, führt den Krieg.*

### Formale Freigabe
`dc_np_steinmark_formale_freigabe` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF dauerhaft.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 ATK bis zum Ende dieses Zuges. Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF.
- Effektcodes: BUFF
- *Stempel drauf, Feuer frei.*

### Sachstandsbericht
`dc_np_steinmark_sachstandsbericht` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Ziehe 2 Karten.
- Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DRAW
- *Zwei Seiten, nichts ausgelassen.*

### Planmäßige Ablösung
`dc_np_steinmark_planmaessige_abloesung` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Heile 2 DEF an einer eigenen Fronteinheit.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.
- Effektcodes: HEAL
- *Pünktlich zum Schichtwechsel.*

### Beweisaufnahme
`dc_np_steinmark_beweisaufnahme` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet. Ziehe 1 Karte.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: MARK_OBSERVED, DRAW
- *Erst wird festgestellt, dann wird entschieden.*

### Feuerplan ausgelöst
`dc_np_steinmark_feuerplan_ausgeloest` · Soforteinsatz · undefined · 2 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 2 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Bewegung im markierten Raum – Feuer nach Plan.*

### Normverband schließen
`dc_np_steinmark_normverband_schliessen` · Soforteinsatz · undefined · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: deine Infanterie dort +1 DEF dauerhaft.
- Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Infanterie-Einheit, die jetzt dort steht, erhält +1 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.
- Effektcodes: BUFF_SECTION
- *Abstände korrigiert, Lücken geschlossen.*

### Methodischer Vorstoß
`dc_np_steinmark_methodischer_vorstoss` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 ATK bis Zugende.
- Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Einheit dort hat bis zum Ende dieses Zuges +1 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung).
- Effektcodes: BUFF_SECTION
- *Ein Meter nach dem anderen, alle zugleich.*

### Beschaffungsvorlauf
`dc_np_steinmark_beschaffungsvorlauf` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Ziehe 1 Karte.
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: COST_NEXT, DRAW
- *Ausgeschrieben im Frieden, geliefert im Krieg.*

### Dienstweg
`dc_np_steinmark_dienstweg` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 2, dann wirf deine älteste Handkarte ab.
- Ziehe 2 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.
- Effektcodes: DRAW_DISCARD
- *Was zu spät kommt, landet in der Ablage.*

### Großer Feuerplan
`dc_np_steinmark_grosser_feuerplan` · Soforteinsatz · Gold · 4 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 4 Schaden zu. Ziehe 1 Karte.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 4 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DEAL_DAMAGE, DRAW
- *Der ganze Apparat für ein einziges Ziel.*

### Stahlhelm Bundesnorm
`dc_np_steinmark_stahlhelm_bundesnorm` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +2 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Passt jedem Kopf der Republik.*

### Dienstgewehr Muster Vier
`dc_np_steinmark_dienstgewehr_muster_vier` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +1 ATK.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Gewartet nach Dienstvorschrift.*

### Prüfplakette
`dc_np_steinmark_pruefplakette` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +1 DEF. Wird der Träger zerstört, ziehst du 1 Karte.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Wird der Träger zerstört, ziehst du 1 Karte.
- Effektcodes: EQUIP_STAT, ON_DESTROY_DRAW
- *Selbst der Verlust wird dokumentiert.*

### Schusstafel Bezirk
`dc_np_steinmark_schusstafel_bezirk` · Ausrüstung · undefined · 1 AP

- Kurztext: Erster Angriff des Trägers: +2 ATK.
- Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +2 ATK. Danach entfällt der Bonus.
- Effektcodes: CARRIER_FIRST_ATTACK_ATK
- *Der erste Schuss ist schon berechnet.*

### Schutzweste Klasse Drei
`dc_np_steinmark_schutzweste_klasse_drei` · Ausrüstung · undefined · 2 AP

- **Erstschadenschutz** (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Kurztext: Träger +1 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.
- Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Effektcodes: EQUIP_STAT, EQUIP_IGNORE_FIRST_DAMAGE
- *Norm erfüllt, Treffer abgefangen.*

### Zielfernrohr Norm
`dc_np_steinmark_zielfernrohr_norm` · Ausrüstung · Bronze · 1 AP

- Kurztext: Angriffe des Trägers: +1 Schaden.
- Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.
- Effektcodes: EQUIP_ON_ATTACK_DAMAGE
- *Geeicht auf hundert Meter.*

## Karsk (40 neue Karten)

### Optimierter Stoßtrupp
`dc_np_karsk_optimierter_stosstrupp` · Einheit · Bronze · 2 AP

- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)

- Effektcodes: –
- *Nerven verstärkt, Angst entfernt.*

### Filtergrenadiere
`dc_np_karsk_filtergrenadiere` · Einheit · Bronze · 2 AP

- **Erbitterung** (Hat +1 ATK für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)
- Kurztext: Angriffe gegen Infanterie: +2 Schaden.
- Greift diese Einheit eine Infanterie an, verursacht sie 2 Schaden zusätzlich zu ihrem ATK. Der Gegenschlag des Ziels bleibt unverändert.
- Effektcodes: VS_INF
- *Atmen, wo andere ersticken.*

### Maßzug
`dc_np_karsk_masszug` · Einheit · Bronze · 1 AP

- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)

- Effektcodes: –
- *Leistung gemessen, Ergebnis geliefert.*

### Implantatkompanie
`dc_np_karsk_implantatkompanie` · Einheit · undefined · 3 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Mehr Maschine als Mensch.*

### Durchbruchszug
`dc_np_karsk_durchbruchszug` · Einheit · undefined · 3 AP

- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)
- Kurztext: Angriffe gegen Infanterie: +2 Schaden.
- Greift diese Einheit eine Infanterie an, verursacht sie 2 Schaden zusätzlich zu ihrem ATK. Der Gegenschlag des Ziels bleibt unverändert.
- Effektcodes: VS_INF
- *Kein Halten, nur Durch.*

### Ausfallreserve
`dc_np_karsk_ausfallreserve` · Einheit · Bronze · 2 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Ersetzt, was ausfällt.*

### Stoßleitpanzer
`dc_np_karsk_stossleitpanzer` · Einheit · Gold · 5 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Führt den einen Stoß.*

### Keilspitze Karsk
`dc_np_karsk_keilspitze_karsk` · Einheit · Bronze · 4 AP

- **Überlast** (Hat +2 ATK und +1 DEF. Am Ende jedes deiner Züge erleidet sie 1 Schaden, der nicht verhindert werden kann (nicht durch Eingraben oder Schadensreduktion).)

- Effektcodes: –
- *Vorne ist der einzige Ort.*

### Durchbruchwagen
`dc_np_karsk_durchbruchwagen` · Einheit · undefined · 4 AP

- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)
- Kurztext: Angriffe gegen gepanzerte Ziele: +2 Schaden.
- Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 2 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: IGNORE_DEF
- *Bricht Platten wie Knochen.*

### Maßpanzer
`dc_np_karsk_masspanzer` · Einheit · Bronze · 3 AP

- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)

- Effektcodes: –
- *Genormt auf Leistung.*

### Leichter Stoßwagen
`dc_np_karsk_leichter_stosswagen` · Einheit · Bronze · 3 AP

- **Gefechtsbereit** (Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.)

- Effektcodes: –
- *Schnell durch, bevor die Lücke schließt.*

### Öffnungsbatterie
`dc_np_karsk_oeffnungsbatterie` · Einheit · Bronze · 3 AP

- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Feuer öffnet für den Stoßtrupp.*

### Kurzfeuerwerfer
`dc_np_karsk_kurzfeuerwerfer` · Einheit · Bronze · 2 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- Kurztext: Steilfeuer III.
- Steilfeuer III.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Kurz, brutal, am Durchbruchspunkt.*

### Maßschlagrohr
`dc_np_karsk_massschlagrohr` · Einheit · undefined · 4 AP

- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Ein Einschlag nach Maß.*

### Durchbruchsfeuer
`dc_np_karsk_durchbruchsfeuer` · Einheit · Bronze · 3 AP

- Kurztext: Steilfeuer II. Angriffe gegen ungepanzerte Ziele: +1 Schaden.
- Steilfeuer II.
- Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: FEUERUEBERLEGENHEIT
- *Feuer ersetzt den Stoß nicht – es bereitet ihn vor.*

### Stoßleitfeuer
`dc_np_karsk_stossleitfeuer` · Einheit · Gold · 5 AP

- Kurztext: Steilfeuer IV: ganze Front.
- Steilfeuer IV: ganze Front.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: ATTACK_ANY_FRONT
- *Schaltet die Etappe aus, bevor der Stoß kommt.*

### Leistungsmesser
`dc_np_karsk_leistungsmesser` · Einheit · Bronze · 1 AP

- **Gefechtsbereit** (Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Misst den Gegner, nicht die Schonung.*

### Biometriespäher
`dc_np_karsk_biometriespaeher` · Einheit · Bronze · 2 AP

- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Herzschlag auf zweihundert Meter.*

### Stoßlotse
`dc_np_karsk_stosslotse` · Einheit · undefined · 2 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Findet den Punkt für den Stoß.*

### Letzter Stoß
`dc_np_karsk_letzter_stoss` · Einheit · Gold · 5 AP

- Kurztext: Angriffe gegen Infanterie: +2 Schaden.
- Greift diese Einheit eine Infanterie an, verursacht sie 2 Schaden zusätzlich zu ihrem ATK. Der Gegenschlag des Ziels bleibt unverändert.
- Effektcodes: VS_INF
- *Danach kommt nichts mehr – das ist der Plan.*

### Unermüdliche
`dc_np_karsk_unermuedliche` · Einheit · undefined · 4 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)
- Kurztext: Jeder Schaden an dieser Einheit −2.
- Schwere Panzerung: Jeder einzelne Schaden, den diese Einheit erleidet (Kampf, Soforteinsatz, Effekt), wird um 2 verringert, mindestens auf 0.
- Effektcodes: SCHADEN_MINUS
- *Schmerzrezeptoren abgeschaltet.*

### Medizinisch-technische Kette
`dc_np_karsk_medizinisch_technische_kette` · Unterstützung · undefined · 3 AP

- Kurztext: Jeder Schaden an deinen Fronteinheiten −1.
- Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.
- Effektcodes: REDUCE_DAMAGE
- *Repariert Körper wie Maschinen.*

### Stoßzentrale
`dc_np_karsk_stosszentrale` · Unterstützung · Gold · 4 AP

- Kurztext: Deine Fronteinheiten +1 ATK.
- Solange diese Unterstützung liegt, haben alle deine Fronteinheiten +1 ATK.
- Effektcodes: AURA_FRONT_ATK
- *Alles für den einen Stoß.*

### Implantatwerk
`dc_np_karsk_implantatwerk` · Unterstützung · undefined · 3 AP

- Kurztext: Zu Beginn deines Zuges: +1 AP.
- Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt.
- Effektcodes: TURN_AP
- *Leistung ist eine Fertigungsfrage.*

### Stimulans
`dc_np_karsk_stimulans` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Eine eigene Fronteinheit: +3 ATK bis Zugende. Danach erleidet sie 1 Schaden.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +3 ATK bis zum Ende dieses Zuges.
- Preis: Dieselbe eigene Einheit erleidet danach 1 Schaden. Sinkt ihre DEF auf 0, wird sie zerstört.
- Effektcodes: BUFF, SELF_DAMAGE
- *Drei Minuten wie ein Gott, danach Schmerzen.*

### Wundverschluss
`dc_np_karsk_wundverschluss` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Heile 2 DEF an einer eigenen Fronteinheit.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.
- Effektcodes: HEAL
- *Wunde geschlossen, Befehl bleibt.*

### Lücke reißen
`dc_np_karsk_luecke_reissen` · Soforteinsatz · undefined · 2 AP

- Kurztext: Eine eigene Fronteinheit darf in diesem Zug erneut angreifen. Danach erleidet sie 1 Schaden.
- Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten).
- Preis: Dieselbe eigene Einheit erleidet danach 1 Schaden. Sinkt ihre DEF auf 0, wird sie zerstört.
- Effektcodes: EXTRA_ATTACK, SELF_DAMAGE
- *Durch die Lücke, egal was es kostet.*

### Maßschlag
`dc_np_karsk_massschlag` · Soforteinsatz · undefined · 2 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 3 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 3 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Dosiert auf tödlich.*

### Nervenboost
`dc_np_karsk_nervenboost` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Eine eigene Fronteinheit: +2 ATK bis Zugende.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges.
- Effektcodes: BUFF
- *Reflexe auf Maximum.*

### Körper über Gewissen
`dc_np_karsk_koerper_ueber_gewissen` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: deine Infanterie dort +2 ATK bis Zugende. Ziehe 1 Karte.
- Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Infanterie-Einheit dort hat bis zum Ende dieses Zuges +2 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung).
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: BUFF_SECTION, DRAW
- *Die Rechnung kennt kein Zögern.*

### Leistungsprotokoll
`dc_np_karsk_leistungsprotokoll` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 1 Karte.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DRAW
- *Verluste sind eingeplant.*

### Durchbruch erzwingen
`dc_np_karsk_durchbruch_erzwingen` · Soforteinsatz · undefined · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +2 ATK bis Zugende.
- Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Einheit dort hat bis zum Ende dieses Zuges +2 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung).
- Effektcodes: BUFF_SECTION
- *Der ganze Abschnitt stößt vor.*

### Nachlieferung Körperteile
`dc_np_karsk_nachlieferung_koerperteile` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Effektcodes: COST_NEXT
- *Ersatz ist bestellt.*

### Der eine Stoß
`dc_np_karsk_der_eine_stoss` · Soforteinsatz · Gold · 3 AP

- Kurztext: Eine eigene Fronteinheit: +5 ATK bis Zugende. Danach erleidet sie 2 Schaden.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +5 ATK bis zum Ende dieses Zuges.
- Preis: Dieselbe eigene Einheit erleidet danach 2 Schaden. Sinkt ihre DEF auf 0, wird sie zerstört.
- Effektcodes: BUFF, SELF_DAMAGE
- *Alles, was der Körper hergibt.*

### Kampfimplantat
`dc_np_karsk_kampfimplantat` · Ausrüstung · Bronze · 1 AP

- Kurztext: Angriffe des Trägers: +2 Schaden, aber er erleidet selbst 1.
- Jeder Angriff des Trägers verursacht 2 zusätzlichen Schaden. Preis: Bei jedem Angriff erleidet der Träger zuvor selbst 1 Schaden; kann ihn das zerstören, wird er zerstört.
- Effektcodes: EQUIP_ON_ATTACK_DAMAGE
- *Stärker, schneller – und es tut weh.*

### Nervenverstärker
`dc_np_karsk_nervenverstaerker` · Ausrüstung · Bronze · 1 AP

- Kurztext: Solange der Träger beschädigt ist: +2 ATK.
- Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +2 ATK.
- Effektcodes: EQUIP_COND_ATK
- *Schmerz macht schneller.*

### Filtermaske Karsk
`dc_np_karsk_filtermaske_karsk` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +2 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Atmet, wo andere sterben.*

### Stoßbajonett
`dc_np_karsk_stossbajonett` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +2 ATK und -1 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 ATK und -1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Mehr Angriff, weniger Schutz.*

### Muskelservo
`dc_np_karsk_muskelservo` · Ausrüstung · undefined · 2 AP

- Kurztext: Träger +2 ATK. Solange der Träger beschädigt ist: +1 ATK.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +1 ATK.
- Effektcodes: EQUIP_STAT, EQUIP_COND_ATK
- *Die Maschine trägt, wenn der Mensch versagt.*

### Endoskelett
`dc_np_karsk_endoskelett` · Ausrüstung · undefined · 2 AP

- Kurztext: Träger +2 DEF. Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 1 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 1 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.
- Effektcodes: EQUIP_STAT, EQUIP_NEGATE_DAMAGE
- *Knochen aus Stahl.*

## Theryn (40 neue Karten)

### Vorderste Welle
`dc_np_theryn_vorderste_welle` · Einheit · Bronze · 1 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)

- Effektcodes: –
- *Sie gehen voran, damit andere folgen.*

### Nachfolgende Welle
`dc_np_theryn_nachfolgende_welle` · Einheit · Bronze · 1 AP

- **Gefechtsbereit** (Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.)

- Effektcodes: –
- *Wo die erste fiel, steht die zweite.*

### Dritte Welle
`dc_np_theryn_dritte_welle` · Einheit · Bronze · 2 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Die Welle endet nie.*

### Bannerträger
`dc_np_theryn_bannertraeger` · Einheit · undefined · 2 AP

- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)
- Kurztext: Benachbarte eigene Infanterie +1 DEF.
- Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: MECH_AURA
- *Wo das Banner steht, steht die Welle.*

### Eiferer
`dc_np_theryn_eiferer` · Einheit · Bronze · 2 AP

- **Gefechtsbereit** (Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.)
- Kurztext: Angriffe gegen Infanterie: +2 Schaden.
- Greift diese Einheit eine Infanterie an, verursacht sie 2 Schaden zusätzlich zu ihrem ATK. Der Gegenschlag des Ziels bleibt unverändert.
- Effektcodes: VS_INF
- *Glaube schärft die Klinge.*

### Geweihte Linie
`dc_np_theryn_geweihte_linie` · Einheit · undefined · 3 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)
- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Schulter an Schulter im Glauben.*

### Pilgerwagen
`dc_np_theryn_pilgerwagen` · Einheit · Bronze · 3 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Trägt die Gläubigen zur Front.*

### Glaubenskette
`dc_np_theryn_glaubenskette` · Einheit · Bronze · 3 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)

- Effektcodes: –
- *Rollt im Gebet.*

### Sturmwagen
`dc_np_theryn_sturmwagen` · Einheit · undefined · 4 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)

- Effektcodes: –
- *Für den einen Schlag.*

### Reliquienpanzer
`dc_np_theryn_reliquienpanzer` · Einheit · Bronze · 4 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)

- Effektcodes: –
- *Geweiht und gepanzert.*

### Der Wagen des Rufes
`dc_np_theryn_der_wagen_des_rufes` · Einheit · Gold · 5 AP

- **Gefechtsbereit** (Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.)
- **Abschirmung** (Einmal pro Zug darfst du 1 Schaden, den eine benachbarte eigene Einheit erleiden würde, auf diese Einheit umleiten.)
- Kurztext: +2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.
- Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FUEHRUNG_V
- *Wer ihn hört, folgt.*

### Sammelfeuer
`dc_np_theryn_sammelfeuer` · Einheit · Bronze · 3 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Feuer deckt die Nachrücker.*

### Glockenbatterie
`dc_np_theryn_glockenbatterie` · Einheit · Bronze · 2 AP

- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Ruft zur Welle.*

### Wellenmörser
`dc_np_theryn_wellenmoerser` · Einheit · Bronze · 3 AP

- Kurztext: Steilfeuer I.
- Steilfeuer I.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Einfach, massig, wirksam.*

### Vorbereitungsfeuer
`dc_np_theryn_vorbereitungsfeuer` · Einheit · undefined · 4 AP

- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Bereitet den Sturm vor.*

### Ruf über das Feld
`dc_np_theryn_ruf_ueber_das_feld` · Einheit · Gold · 5 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Steilfeuer IV: ganze Front. Angriffe gegen ungepanzerte Ziele: +1 Schaden.
- Steilfeuer IV: ganze Front.
- Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: ATTACK_ANY_FRONT, FEUERUEBERLEGENHEIT
- *Der Ruf geht über das ganze Feld.*

### Pilgerkundschafter
`dc_np_theryn_pilgerkundschafter` · Einheit · Bronze · 1 AP

- **Gefechtsbereit** (Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Wandert voran.*

### Glaubensmelder
`dc_np_theryn_glaubensmelder` · Einheit · Bronze · 2 AP

- **Gefechtsbereit** (Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Meldet aus der Welle.*

### Seher der Pflicht
`dc_np_theryn_seher_der_pflicht` · Einheit · undefined · 2 AP

- **Gefechtsbereit** (Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.)
- Kurztext: Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.
- Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie.
- Effektcodes: HAND_PEEK
- *Sieht, was Gott zeigt.*

### Sturmführer
`dc_np_theryn_sturmfuehrer` · Einheit · undefined · 4 AP

- **Erbitterung** (Hat +1 ATK für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)
- Kurztext: Angriffe gegen Infanterie: +2 Schaden.
- Greift diese Einheit eine Infanterie an, verursacht sie 2 Schaden zusätzlich zu ihrem ATK. Der Gegenschlag des Ziels bleibt unverändert.
- Effektcodes: VS_INF
- *Führt den einen Schlag.*

### Hohe Priesterschaft
`dc_np_theryn_hohe_priesterschaft` · Einheit · Gold · 5 AP

- Kurztext: Benachbarte eigene Infanterie +1 DEF.
- Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: MECH_AURA
- *Segnet die Welle.*

### Ruf zum Aufgebot
`dc_np_theryn_ruf_zum_aufgebot` · Unterstützung · undefined · 3 AP

- Kurztext: Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Effektcodes: TURN_DRAW
- *Immer neue Gläubige.*

### Banner der Pflicht
`dc_np_theryn_banner_der_pflicht` · Unterstützung · undefined · 4 AP

- Kurztext: Deine Fronteinheiten +1 ATK.
- Solange diese Unterstützung liegt, haben alle deine Fronteinheiten +1 ATK.
- Effektcodes: AURA_FRONT_ATK
- *Unter dem Banner wird gekämpft.*

### Glaubensaufgebot
`dc_np_theryn_glaubensaufgebot` · Unterstützung · Gold · 5 AP

- Kurztext: Deine Fronteinheiten +1 ATK. Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Solange diese Unterstützung liegt, haben alle deine Fronteinheiten +1 ATK.
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Effektcodes: AURA_FRONT_ATK, TURN_DRAW
- *Die Welle endet nie.*

### Alle sind gerufen
`dc_np_theryn_alle_sind_gerufen` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Effektcodes: COST_NEXT
- *Jeder ist gerufen.*

### Sturm der Gläubigen
`dc_np_theryn_sturm_der_glaeubigen` · Soforteinsatz · undefined · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: deine Infanterie dort +2 ATK bis Zugende.
- Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Infanterie-Einheit dort hat bis zum Ende dieses Zuges +2 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung).
- Effektcodes: BUFF_SECTION
- *Jetzt alle.*

### Lücke füllen
`dc_np_theryn_luecke_fuellen` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 1 Karte.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DRAW
- *Wo einer fällt, kommt der nächste.*

### Gebet vor der Schlacht
`dc_np_theryn_gebet_vor_der_schlacht` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF dauerhaft.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 ATK bis zum Ende dieses Zuges. Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF.
- Effektcodes: BUFF
- *Gestärkt im Glauben.*

### Märtyrersegen
`dc_np_theryn_maertyrersegen` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Heile 2 DEF an einer eigenen Fronteinheit.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.
- Effektcodes: HEAL
- *Die Wunden sind heilig.*

### Welle binden
`dc_np_theryn_welle_binden` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: deine Infanterie dort +1 DEF dauerhaft.
- Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Infanterie-Einheit, die jetzt dort steht, erhält +1 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.
- Effektcodes: BUFF_SECTION
- *Die Welle hält.*

### Eifer
`dc_np_theryn_eifer` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Eine eigene Fronteinheit: +3 ATK bis Zugende. Danach erleidet sie 1 Schaden.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +3 ATK bis zum Ende dieses Zuges.
- Preis: Dieselbe eigene Einheit erleidet danach 1 Schaden. Sinkt ihre DEF auf 0, wird sie zerstört.
- Effektcodes: BUFF, SELF_DAMAGE
- *Der Eifer verzehrt.*

### Pflichtruf
`dc_np_theryn_pflichtruf` · Soforteinsatz · undefined · 2 AP

- Kurztext: Deine nächste Einheit oder Unterstützung kostet 2 AP weniger (mind. 1).
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 2 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Effektcodes: COST_NEXT
- *Niemand bleibt zu Hause.*

### Der eine Schlag
`dc_np_theryn_der_eine_schlag` · Soforteinsatz · undefined · 3 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 3 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 3 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Gott führt die Hand.*

### Heilige Woge
`dc_np_theryn_heilige_woge` · Soforteinsatz · Gold · 4 AP

- Kurztext: Wähle einen eigenen Abschnitt: deine Infanterie dort +3 ATK bis Zugende.
- Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Infanterie-Einheit dort hat bis zum Ende dieses Zuges +3 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung).
- Effektcodes: BUFF_SECTION
- *Die ganze Welle bricht herein.*

### Pilgerschild
`dc_np_theryn_pilgerschild` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +2 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Gesegnet vom Abt.*

### Glaubenszeichen
`dc_np_theryn_glaubenszeichen` · Ausrüstung · Bronze · 1 AP

- Kurztext: Wird der Träger zerstört, ziehst du 1 Karte.
- Wird der Träger zerstört, ziehst du 1 Karte.
- Effektcodes: ON_DESTROY_DRAW
- *Wer fällt, ruft den Nächsten.*

### Bannerstange
`dc_np_theryn_bannerstange` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +1 ATK und +1 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK und +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Banner und Waffe zugleich.*

### Reliquie
`dc_np_theryn_reliquie` · Ausrüstung · undefined · 1 AP

- **Erstschadenschutz** (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.
- Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Effektcodes: EQUIP_IGNORE_FIRST_DAMAGE
- *Ein Wunder rettet.*

### Eiferklinge
`dc_np_theryn_eiferklinge` · Ausrüstung · Bronze · 1 AP

- Kurztext: Angriffe des Trägers: +1 Schaden.
- Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.
- Effektcodes: EQUIP_ON_ATTACK_DAMAGE
- *Geschärft im Gebet.*

### Gebetsband
`dc_np_theryn_gebetsband` · Ausrüstung · undefined · 1 AP

- Kurztext: Solange der Träger beschädigt ist: +2 ATK.
- Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +2 ATK.
- Effektcodes: EQUIP_COND_ATK
- *Im Schmerz näher am Glauben.*

## Vael (40 neue Karten)

### Werkschutzzug
`dc_np_vael_werkschutzzug` · Einheit · Bronze · 2 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Schützt die Fabrik und das Feuer.*

### Lieferkompanie
`dc_np_vael_lieferkompanie` · Einheit · Bronze · 1 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Bringt, was verbraucht wird.*

### Bodenhalter
`dc_np_vael_bodenhalter` · Einheit · Bronze · 2 AP

- Kurztext: Benachbarte eigene Infanterie +1 DEF.
- Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: MECH_AURA
- *Hält den Boden unter dem Feuer.*

### Vertragssoldaten
`dc_np_vael_vertragssoldaten` · Einheit · undefined · 3 AP

- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)
- Kurztext: Angriffe gegen ungepanzerte Ziele: +1 Schaden.
- Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: FEUERUEBERLEGENHEIT
- *Bezahlt pro Treffer.*

### Reparaturtrupp
`dc_np_vael_reparaturtrupp` · Einheit · Bronze · 2 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)

- Effektcodes: –
- *Repariert Rohre im Feuer.*

### Aktionärsgarde
`dc_np_vael_aktionaersgarde` · Einheit · undefined · 3 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Schützt die Investition.*

### Fabrikpanzer Serie Neun
`dc_np_vael_fabrikpanzer_serie_neun` · Einheit · Bronze · 3 AP

- **Zähigkeit** (Hat +1 DEF für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)

- Effektcodes: –
- *Vom Band an die Front.*

### Materialkeil
`dc_np_vael_materialkeil` · Einheit · Bronze · 4 AP

- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)

- Effektcodes: –
- *Mehr Stahl als Strategie.*

### Nachlieferungswagen
`dc_np_vael_nachlieferungswagen` · Einheit · undefined · 4 AP

- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)
- Kurztext: +2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.
- Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FUEHRUNG_V
- *Bringt Ersatz an die Front.*

### Industriekette
`dc_np_vael_industriekette` · Einheit · Bronze · 3 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Angriffe gegen gepanzerte Ziele: +1 Schaden.
- Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: IGNORE_DEF
- *Gebaut, um Panzer zu brechen.*

### Kriegsaktie Panzer
`dc_np_vael_kriegsaktie_panzer` · Einheit · Gold · 5 AP

- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)
- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)

- Effektcodes: –
- *Der Kurs steigt mit jedem Treffer.*

### Walzenbatterie
`dc_np_vael_walzenbatterie` · Einheit · Bronze · 3 AP

- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Flächig, anhaltend, teuer.*

### Industrierohr
`dc_np_vael_industrierohr` · Einheit · Bronze · 3 AP

- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Hauptsache, es knallt.*

### Volltreffer-Haubitze
`dc_np_vael_volltreffer_haubitze` · Einheit · Gold · 5 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)
- Kurztext: Steilfeuer V: Front + Support (+2 AP).
- Steilfeuer V: Front + Support (+2 AP).
- Die Einheit zählt für alle Regeln als Artillerie.
- Supportzone-Angriff 3 AP; Front 1 AP.
- Effektcodes: ATTACK_ANY_FRONT, ATTACK_SUPPORT
- *Jeder Schuss ein Abschluss.*

### Munitionsmörser
`dc_np_vael_munitionsmoerser` · Einheit · Bronze · 2 AP

- **Fernschuss** (Hat +1 Reichweite (bei Steilfeuer nur Stufen I–III; IV/V bereits ganze Front).)
- Kurztext: Steilfeuer I.
- Steilfeuer I.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Billig in der Herstellung.*

### Feuerwalzen-Rohr
`dc_np_vael_feuerwalzen_rohr` · Einheit · undefined · 4 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- Kurztext: Steilfeuer II. Angriffe gegen ungepanzerte Ziele: +1 Schaden.
- Steilfeuer II.
- Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: FEUERUEBERLEGENHEIT
- *Die Walze rollt.*

### Zielerfasser
`dc_np_vael_zielerfasser` · Einheit · Bronze · 1 AP

- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Findet Ziele für die Walze.*

### Verbrauchsprüfer
`dc_np_vael_verbrauchspruefer` · Einheit · Bronze · 2 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Misst, was verbraucht wird.*

### Wirtschaftsspäher
`dc_np_vael_wirtschaftsspaeher` · Einheit · undefined · 2 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- Kurztext: Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.
- Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie.
- Effektcodes: HAND_PEEK
- *Sieht die Bilanz des Gegners.*

### Konzernfaust
`dc_np_vael_konzernfaust` · Einheit · Gold · 5 AP

- **Erbitterung** (Hat +1 ATK für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)
- Kurztext: Angriffe gegen ungepanzerte Ziele: +1 Schaden.
- Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: FEUERUEBERLEGENHEIT
- *Wenn die Fabrik zuschlägt.*

### Konzernstab
`dc_np_vael_konzernstab` · Einheit · undefined · 4 AP

- Kurztext: +2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.
- Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FUEHRUNG_V
- *Plant in Quartalen.*

### Rüstungswerk
`dc_np_vael_ruestungswerk` · Unterstützung · undefined · 3 AP

- Kurztext: Zu Beginn deines Zuges: +1 AP.
- Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt.
- Effektcodes: TURN_AP
- *Läuft rund um die Uhr.*

### Munitionslager
`dc_np_vael_munitionslager` · Unterstützung · undefined · 3 AP

- Kurztext: Deine Fronteinheiten +1 ATK.
- Solange diese Unterstützung liegt, haben alle deine Fronteinheiten +1 ATK.
- Effektcodes: AURA_FRONT_ATK
- *Genug für jede Walze.*

### Kriegsbörse
`dc_np_vael_kriegsboerse` · Unterstützung · Gold · 5 AP

- Kurztext: Zu Beginn deines Zuges: +1 AP. Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt.
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Effektcodes: TURN_AP, TURN_DRAW
- *Der Krieg ist ein Geschäft.*

### Ersatz ab Lager
`dc_np_vael_ersatz_ab_lager` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Effektcodes: COST_NEXT
- *Neues Material, alte Front.*

### Rollende Walze
`dc_np_vael_rollende_walze` · Soforteinsatz · undefined · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: deine Artillerie dort +2 ATK bis Zugende.
- Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Artillerie-Einheit dort hat bis zum Ende dieses Zuges +2 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung).
- Effektcodes: BUFF_SECTION
- *Alle Rohre zugleich.*

### Lieferschein eingetroffen
`dc_np_vael_lieferschein_eingetroffen` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Ziehe 2 Karten.
- Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DRAW
- *Lieferung eingetroffen.*

### Bezahlter Treffer
`dc_np_vael_bezahlter_treffer` · Soforteinsatz · undefined · 3 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 3 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 3 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Bezahlt und geliefert.*

### Munitionsschub
`dc_np_vael_munitionsschub` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Eine eigene Fronteinheit: +2 ATK bis Zugende.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges.
- Effektcodes: BUFF
- *Doppelte Ladung.*

### Reparatur im Feld
`dc_np_vael_reparatur_im_feld` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Heile 2 DEF an einer eigenen Fronteinheit.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.
- Effektcodes: HEAL
- *Geschweißt und weiter.*

### Auftragsbuch
`dc_np_vael_auftragsbuch` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 2, dann wirf deine älteste Handkarte ab.
- Ziehe 2 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.
- Effektcodes: DRAW_DISCARD
- *Verluste sind Aufträge.*

### Großlieferung
`dc_np_vael_grosslieferung` · Soforteinsatz · undefined · 2 AP

- Kurztext: Deine nächste Einheit oder Unterstützung kostet 2 AP weniger (mind. 1).
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 2 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Effektcodes: COST_NEXT
- *Ein ganzer Zug Material.*

### Splitterhagel
`dc_np_vael_splitterhagel` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 2 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Billig und wirksam.*

### Industrielle Walze
`dc_np_vael_industrielle_walze` · Soforteinsatz · Gold · 4 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 4 Schaden zu. Ziehe 1 Karte.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 4 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DEAL_DAMAGE, DRAW
- *Die Fabrik schießt mit.*

### Werkspanzerung
`dc_np_vael_werkspanzerung` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +2 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Panzer). Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Ab Werk verstärkt.*

### Schwere Munition
`dc_np_vael_schwere_munition` · Ausrüstung · Bronze · 1 AP

- Kurztext: Angriffe des Trägers: +1 Schaden.
- Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.
- Effektcodes: EQUIP_ON_ATTACK_DAMAGE
- *Mehr Sprengstoff pro Granate.*

### Ersatzrohr
`dc_np_vael_ersatzrohr` · Ausrüstung · Bronze · 1 AP

- Kurztext: Wird der Träger zerstört, ziehst du 1 Karte. Träger +1 DEF.
- Wird der Träger zerstört, ziehst du 1 Karte.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: ON_DESTROY_DRAW, EQUIP_STAT
- *Kaputt? Nachbestellen.*

### Feuerleitcomputer
`dc_np_vael_feuerleitcomputer` · Ausrüstung · undefined · 1 AP

- Kurztext: Erster Angriff des Trägers: +2 ATK.
- Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +2 ATK. Danach entfällt der Bonus.
- Effektcodes: CARRIER_FIRST_ATTACK_ATK
- *Ab Werk kalibriert.*

### Reaktivpanzer
`dc_np_vael_reaktivpanzer` · Ausrüstung · undefined · 2 AP

- **Erstschadenschutz** (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Kurztext: Träger +1 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.
- Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Effektcodes: EQUIP_STAT, EQUIP_IGNORE_FIRST_DAMAGE
- *Explodiert nach außen.*

### Vertragsgewehr
`dc_np_vael_vertragsgewehr` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +1 ATK.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Bezahlt wird nach Leistung.*

## Merovan (40 neue Karten)

### Garnison Weg Sieben
`dc_np_merovan_garnison_weg_sieben` · Einheit · Bronze · 2 AP

- **Sicherung** (Andere eigene Einheiten im selben Abschnitt haben +1 DEF, solange diese Einheit offen liegt.)

- Effektcodes: –
- *Hält den Posten, auch ohne Ader.*

### Kolonnenschützen
`dc_np_merovan_kolonnenschuetzen` · Einheit · Bronze · 1 AP

- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)

- Effektcodes: –
- *Unterwegs und bereit.*

### Wegposten
`dc_np_merovan_wegposten` · Einheit · Bronze · 2 AP

- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)

- Effektcodes: –
- *Wer den Weg hält, hält das Land.*

### Keilhaltzug
`dc_np_merovan_keilhaltzug` · Einheit · undefined · 3 AP

- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)
- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Nach dem Schub kommt der Halt.*

### Verlegungskompanie
`dc_np_merovan_verlegungskompanie` · Einheit · Bronze · 2 AP

- **Hinterhalt** (Hat +2 ATK bei ihrem ersten Angriff nach dem Aufdecken.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: RELOCATE_HIDE
- *Heute hier, morgen dort.*

### Ausharrende
`dc_np_merovan_ausharrende` · Einheit · undefined · 3 AP

- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)

- Effektcodes: –
- *Sie bleiben, bis der Weg frei ist.*

### Achsenkolonne
`dc_np_merovan_achsenkolonne` · Einheit · Bronze · 3 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)

- Effektcodes: –
- *Fährt die Achse ab.*

### Wegsperrwagen
`dc_np_merovan_wegsperrwagen` · Einheit · undefined · 4 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Sperrt den Weg für den Feind.*

### Haltepanzer
`dc_np_merovan_haltepanzer` · Einheit · Bronze · 3 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)

- Effektcodes: –
- *Bleibt stehen, wo andere weichen.*

### Achsenkeil
`dc_np_merovan_achsenkeil` · Einheit · Bronze · 4 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)

- Effektcodes: –
- *Schiebt sich entlang der Achse.*

### Freigehaltene Achse
`dc_np_merovan_freigehaltene_achse` · Einheit · Gold · 5 AP

- Kurztext: +2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.
- Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FUEHRUNG_V
- *Der Weg bleibt offen.*

### Wegbatterie
`dc_np_merovan_wegbatterie` · Einheit · Bronze · 3 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Sichert den Halt nach der Verlegung.*

### Postenmörser
`dc_np_merovan_postenmoerser` · Einheit · Bronze · 2 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Steilfeuer I.
- Steilfeuer I.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Für jeden Posten ein Rohr.*

### Achsenfeuer
`dc_np_merovan_achsenfeuer` · Einheit · Bronze · 3 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Feuer entlang der Straße.*

### Haltefeuer
`dc_np_merovan_haltefeuer` · Einheit · undefined · 4 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Hält den Gegner auf Abstand.*

### Stellung am Wegende
`dc_np_merovan_stellung_am_wegende` · Einheit · Gold · 5 AP

- Kurztext: Steilfeuer IV: ganze Front.
- Steilfeuer IV: ganze Front.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: ATTACK_ANY_FRONT
- *Wenn der Weg zu ist, schießt sie weiter.*

### Wegkundschafter
`dc_np_merovan_wegkundschafter` · Einheit · Bronze · 1 AP

- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Kennt jeden Pfad.*

### Etappenmelder
`dc_np_merovan_etappenmelder` · Einheit · Bronze · 2 AP

- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Meldet von Posten zu Posten.*

### Achsenbeobachter
`dc_np_merovan_achsenbeobachter` · Einheit · undefined · 2 AP

- **Platztausch** (Wird die Einheit aufgedeckt, darfst du sie mit einer anderen eigenen verdeckten Einheit tauschen. Der Tausch gilt nicht als neuer Einsatz (kein neues Eingraben). Der Gegner erfährt nicht den Namen der anderen Karte, nur dass getauscht wurde bzw. die Wahl existiert.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: AUFKLAERUNG, RELOCATE_HIDE
- *Wer die Achse sieht, sieht den Krieg.*

### Wegpunktkommando
`dc_np_merovan_wegpunktkommando` · Einheit · Gold · 5 AP

- **Abschirmung** (Einmal pro Zug darfst du 1 Schaden, den eine benachbarte eigene Einheit erleiden würde, auf diese Einheit umleiten.)
- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)
- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Ein Punkt, der nicht fällt.*

### Garnisonsälteste
`dc_np_merovan_garnisonsaelteste` · Einheit · undefined · 4 AP

- Kurztext: Benachbarte eigene Infanterie +1 DEF.
- Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: MECH_AURA
- *Hat schon drei Kriege ausgesessen.*

### Lebensader Merovan
`dc_np_merovan_lebensader_merovan` · Unterstützung · Gold · 4 AP

- Kurztext: Zu Beginn deines Zuges: +1 AP.
- Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt.
- Effektcodes: TURN_AP
- *Solange sie fließt, hält alles.*

### Wegdepot
`dc_np_merovan_wegdepot` · Unterstützung · undefined · 3 AP

- Kurztext: Jeder Schaden an deinen Fronteinheiten −1.
- Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.
- Effektcodes: REDUCE_DAMAGE
- *Sandsäcke an jeder Station.*

### Postenkette
`dc_np_merovan_postenkette` · Unterstützung · undefined · 3 AP

- Kurztext: Gegnerische Fronteinheiten −1 ATK.
- Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).
- Effektcodes: AURA_ENEMY_ATK
- *Ein Posten stützt den nächsten.*

### Umgruppieren
`dc_np_merovan_umgruppieren` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF dauerhaft.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 ATK bis zum Ende dieses Zuges. Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF.
- Effektcodes: BUFF
- *Angekommen und eingerichtet.*

### Keilhalt
`dc_np_merovan_keilhalt` · Soforteinsatz · undefined · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +2 DEF dauerhaft.
- Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +2 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.
- Effektcodes: BUFF_SECTION
- *Der Schub wird zum Halt.*

### Posten halten
`dc_np_merovan_posten_halten` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Eine eigene Fronteinheit: +2 DEF dauerhaft.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF.
- Effektcodes: BUFF
- *Bleiben ist Kämpfen.*

### Ader offen halten
`dc_np_merovan_ader_offen_halten` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Ziehe 2 Karten.
- Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DRAW
- *Der Nachschub kommt durch.*

### Wegsperre
`dc_np_merovan_wegsperre` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 2 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Hier kommt niemand durch.*

### Garnison versorgen
`dc_np_merovan_garnison_versorgen` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Heile 2 DEF an einer eigenen Fronteinheit.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.
- Effektcodes: HEAL
- *Auch ferne Posten werden versorgt.*

### Schieben
`dc_np_merovan_schieben` · Soforteinsatz · undefined · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 ATK bis Zugende.
- Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Einheit dort hat bis zum Ende dieses Zuges +1 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung).
- Effektcodes: BUFF_SECTION
- *Der ganze Abschnitt drückt.*

### Wegpunkt melden
`dc_np_merovan_wegpunkt_melden` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 1 Karte.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DRAW
- *Position bestätigt.*

### Kolonne nachziehen
`dc_np_merovan_kolonne_nachziehen` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Effektcodes: COST_NEXT
- *Die nächste Kolonne ist unterwegs.*

### Halt um jeden Preis
`dc_np_merovan_halt_um_jeden_preis` · Soforteinsatz · Gold · 3 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +3 DEF dauerhaft.
- Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +3 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.
- Effektcodes: BUFF_SECTION
- *Hier endet der Weg des Feindes.*

### Postenhelm
`dc_np_merovan_postenhelm` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +2 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Für lange Wachen.*

### Marschgepäck
`dc_np_merovan_marschgepaeck` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +1 DEF. Wird der Träger zerstört, ziehst du 1 Karte.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Wird der Träger zerstört, ziehst du 1 Karte.
- Effektcodes: EQUIP_STAT, ON_DESTROY_DRAW
- *Alles dabei, was man braucht.*

### Haltespaten
`dc_np_merovan_haltespaten` · Ausrüstung · Bronze · 1 AP

- **Erstschadenschutz** (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.
- Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Effektcodes: EQUIP_IGNORE_FIRST_DAMAGE
- *Eingegraben vor dem ersten Schuss.*

### Wegkarte
`dc_np_merovan_wegkarte` · Ausrüstung · undefined · 1 AP

- Kurztext: Erster Angriff des Trägers: +2 ATK.
- Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +2 ATK. Danach entfällt der Bonus.
- Effektcodes: CARRIER_FIRST_ATTACK_ATK
- *Der erste Schlag aus bekanntem Gelände.*

### Garnisonsgewehr
`dc_np_merovan_garnisonsgewehr` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +1 ATK.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Gepflegt in langen Wachen.*

### Kolonnenpanzerung
`dc_np_merovan_kolonnenpanzerung` · Ausrüstung · undefined · 2 AP

- Kurztext: Träger +2 DEF. Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 1 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Panzer). Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 1 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.
- Effektcodes: EQUIP_STAT, EQUIP_NEGATE_DAMAGE
- *Für die lange Achse.*

## Lyr (40 neue Karten)

### Wächter am Grat
`dc_np_lyr_waechter_am_grat` · Einheit · Bronze · 1 AP

- **Zähigkeit** (Hat +1 DEF für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)
- Kurztext: Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.
- Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.
- Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden.
- Effektcodes: AMBUSH
- *Der Pass gehört dem Tal.*

### Passhüter
`dc_np_lyr_passhueter` · Einheit · Bronze · 2 AP

- **Gefechtsbereit** (Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.)

- Effektcodes: –
- *Kein Fremder kommt durch.*

### Eidgenossen
`dc_np_lyr_eidgenossen` · Einheit · Bronze · 2 AP

- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)
- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Ein Tal hilft dem anderen.*

### Lauernde Schützen
`dc_np_lyr_lauernde_schuetzen` · Einheit · undefined · 2 AP

- **Überlast** (Hat +2 ATK und +1 DEF. Am Ende jedes deiner Züge erleidet sie 1 Schaden, der nicht verhindert werden kann (nicht durch Eingraben oder Schadensreduktion).)
- Kurztext: Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.
- Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.
- Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden.
- Effektcodes: AMBUSH
- *Warten, bis der Feind die Enge betritt.*

### Steinwerfer
`dc_np_lyr_steinwerfer` · Einheit · Bronze · 1 AP

- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)

- Effektcodes: –
- *Der Berg kämpft mit.*

### Verteilte Posten
`dc_np_lyr_verteilte_posten` · Einheit · undefined · 3 AP

- **Hinterhalt** (Hat +2 ATK bei ihrem ersten Angriff nach dem Aufdecken.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: RELOCATE_HIDE
- *Kein Zentrum, keine Schwäche.*

### Bergkette
`dc_np_lyr_bergkette` · Einheit · Bronze · 3 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Langsam, aber durch jedes Tal.*

### Engpasswagen
`dc_np_lyr_engpasswagen` · Einheit · undefined · 4 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.
- Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.
- Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden.
- Effektcodes: AMBUSH
- *Blockiert den Pass.*

### Talpanzer
`dc_np_lyr_talpanzer` · Einheit · Bronze · 3 AP

- **Hinterhalt** (Hat +2 ATK bei ihrem ersten Angriff nach dem Aufdecken.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: RELOCATE_HIDE
- *Versteckt sich hinter jedem Fels.*

### Felskeil
`dc_np_lyr_felskeil` · Einheit · Bronze · 4 AP

- **Zähigkeit** (Hat +1 DEF für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)

- Effektcodes: –
- *Wie ein Felssturz.*

### Pass ohne Wiederkehr
`dc_np_lyr_pass_ohne_wiederkehr` · Einheit · Gold · 5 AP

- **Zähigkeit** (Hat +1 DEF für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)
- Kurztext: Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.
- Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.
- Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden.
- Effektcodes: AMBUSH
- *Hier endet jeder Vormarsch.*

### Warnfeuerstellung
`dc_np_lyr_warnfeuerstellung` · Einheit · Bronze · 3 AP

- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Ein Schuss als Warnung.*

### Bergmörser
`dc_np_lyr_bergmoerser` · Einheit · Bronze · 2 AP

- **Hinterhalt** (Hat +2 ATK bei ihrem ersten Angriff nach dem Aufdecken.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Kurztext: Steilfeuer I.
- Steilfeuer I.
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: RELOCATE_HIDE
- *Schießt und verschwindet im Fels.*

### Talbatterie
`dc_np_lyr_talbatterie` · Einheit · Bronze · 3 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Feuer aus dem Tal.*

### Passfeuer
`dc_np_lyr_passfeuer` · Einheit · undefined · 4 AP

- **Hinterhalt** (Hat +2 ATK bei ihrem ersten Angriff nach dem Aufdecken.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: RELOCATE_HIDE
- *Kurzes Feuer aus der Lauer.*

### Echo der Täler
`dc_np_lyr_echo_der_taeler` · Einheit · Gold · 5 AP

- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)
- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Alle Täler antworten.*

### Gamsjäger
`dc_np_lyr_gamsjaeger` · Einheit · Bronze · 1 AP

- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Kennt jeden Grat.*

### Zugangswächter
`dc_np_lyr_zugangswaechter` · Einheit · Bronze · 2 AP

- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Sensorik an jedem Zugang.*

### Talrufer
`dc_np_lyr_talrufer` · Einheit · undefined · 2 AP

- **Hinterhalt** (Hat +2 ATK bei ihrem ersten Angriff nach dem Aufdecken.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: AUFKLAERUNG, RELOCATE_HIDE
- *Ruft und verschwindet.*

### Passwache Ältester
`dc_np_lyr_passwache_aeltester` · Einheit · Gold · 5 AP

- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF. Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.
- Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden.
- Effektcodes: FLANK_DEF, AMBUSH
- *Hat jeden Pass schon einmal gehalten.*

### Eidträger
`dc_np_lyr_eidtraeger` · Einheit · undefined · 4 AP

- **Überlast** (Hat +2 ATK und +1 DEF. Am Ende jedes deiner Züge erleidet sie 1 Schaden, der nicht verhindert werden kann (nicht durch Eingraben oder Schadensreduktion).)
- **Abschirmung** (Einmal pro Zug darfst du 1 Schaden, den eine benachbarte eigene Einheit erleiden würde, auf diese Einheit umleiten.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: RELOCATE_HIDE
- *Der Eid ist sein Versteck.*

### Talbund
`dc_np_lyr_talbund` · Unterstützung · undefined · 3 AP

- Kurztext: Gegnerische Fronteinheiten −1 ATK.
- Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).
- Effektcodes: AURA_ENEMY_ATK
- *Jedes Tal schwächt den Feind.*

### Engen und Pässe
`dc_np_lyr_engen_und_paesse` · Unterstützung · undefined · 3 AP

- Kurztext: Jeder Schaden an deinen Fronteinheiten −1.
- Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.
- Effektcodes: REDUCE_DAMAGE
- *Das Gelände schützt.*

### Der Eid der Täler
`dc_np_lyr_der_eid_der_taeler` · Unterstützung · Gold · 5 AP

- Kurztext: Gegnerische Fronteinheiten −1 ATK. Jeder Schaden an deinen Fronteinheiten −1.
- Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).
- Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.
- Effektcodes: AURA_ENEMY_ATK, REDUCE_DAMAGE
- *Kein Sitz, aber ein Eid.*

### Aus der Deckung
`dc_np_lyr_aus_der_deckung` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Eine eigene Fronteinheit: +2 ATK bis Zugende.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges.
- Effektcodes: BUFF
- *Jetzt!*

### Nadelöhr
`dc_np_lyr_nadeloehr` · Soforteinsatz · undefined · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +2 DEF dauerhaft.
- Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +2 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.
- Effektcodes: BUFF_SECTION
- *Nur einer kommt durch.*

### Schuss vor den Bug
`dc_np_lyr_schuss_vor_den_bug` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 1 Schaden zu. Ziehe 1 Karte.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 1 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DEAL_DAMAGE, DRAW
- *Das war die Warnung.*

### Geröllhagel
`dc_np_lyr_geroellhagel` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 2 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Der Berg wirft zurück.*

### Talruf hören
`dc_np_lyr_talruf_hoeren` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 1 Karte.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DRAW
- *Das Tal antwortet.*

### Zerstreute Posten
`dc_np_lyr_zerstreute_posten` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 DEF dauerhaft.
- Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +1 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.
- Effektcodes: BUFF_SECTION
- *Kein Ziel für den Schwerpunkt.*

### Aus dem Hinterhalt
`dc_np_lyr_aus_dem_hinterhalt` · Soforteinsatz · undefined · 2 AP

- Kurztext: Eine eigene Fronteinheit darf in diesem Zug erneut angreifen.
- Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten).
- Effektcodes: EXTRA_ATTACK
- *Noch ein Schlag aus der Deckung.*

### Bergquelle
`dc_np_lyr_bergquelle` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Heile 2 DEF an einer eigenen Fronteinheit.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.
- Effektcodes: HEAL
- *Das Tal versorgt.*

### Pass entdeckt
`dc_np_lyr_pass_entdeckt` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: MARK_OBSERVED
- *Wer den Pass nicht sieht, kämpft blind.*

### Lawine
`dc_np_lyr_lawine` · Soforteinsatz · Gold · 4 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 4 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 4 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Das Tal schlägt zurück.*

### Bergmantel
`dc_np_lyr_bergmantel` · Ausrüstung · Bronze · 1 AP

- **Erstschadenschutz** (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.
- Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Effektcodes: EQUIP_IGNORE_FIRST_DAMAGE
- *Grau wie der Fels.*

### Steinschleuder
`dc_np_lyr_steinschleuder` · Ausrüstung · Bronze · 1 AP

- Kurztext: Angriffe des Trägers: +1 Schaden.
- Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.
- Effektcodes: EQUIP_ON_ATTACK_DAMAGE
- *Alt, aber wirksam.*

### Talabzeichen
`dc_np_lyr_talabzeichen` · Ausrüstung · Bronze · 1 AP

- Kurztext: Wird der Träger zerstört, ziehst du 1 Karte.
- Wird der Träger zerstört, ziehst du 1 Karte.
- Effektcodes: ON_DESTROY_DRAW
- *Das Tal vergisst niemanden.*

### Kletterausrüstung
`dc_np_lyr_kletterausruestung` · Ausrüstung · undefined · 1 AP

- Kurztext: Erster Angriff des Trägers: +2 ATK.
- Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +2 ATK. Danach entfällt der Bonus.
- Effektcodes: CARRIER_FIRST_ATTACK_ATK
- *Von oben kommt der erste Schlag.*

### Eidring
`dc_np_lyr_eidring` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +2 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Ein Eid ist stärker als Stahl.*

### Passbüchse
`dc_np_lyr_passbuechse` · Ausrüstung · undefined · 1 AP

- Kurztext: Träger +1 ATK. Solange der Träger beschädigt ist: +1 ATK.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +1 ATK.
- Effektcodes: EQUIP_STAT, EQUIP_COND_ATK
- *Lang, schwer, tödlich.*

## Ossaria (40 neue Karten)

### Namensträger
`dc_np_ossaria_namenstraeger` · Einheit · Bronze · 2 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Trägt die Namen der Toten auf der Rüstung.*

### Grabwacht
`dc_np_ossaria_grabwacht` · Einheit · Bronze · 2 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Bewacht die Gefallenen.*

### Plattenträger-Zug
`dc_np_ossaria_plattentraeger_zug` · Einheit · undefined · 3 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Schritt für Schritt, Platte für Platte.*

### Erbzug der Toten
`dc_np_ossaria_erbzug_der_toten` · Einheit · Bronze · 1 AP

- **Abschirmung** (Einmal pro Zug darfst du 1 Schaden, den eine benachbarte eigene Einheit erleiden würde, auf diese Einheit umleiten.)

- Effektcodes: –
- *Die Toten marschieren mit.*

### Wallbauer
`dc_np_ossaria_wallbauer` · Einheit · Bronze · 2 AP

- Kurztext: Benachbarte eigene Infanterie +1 DEF.
- Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: MECH_AURA
- *Aus Verlust wird Deckung.*

### Ahnenkompanie
`dc_np_ossaria_ahnenkompanie` · Einheit · undefined · 3 AP

- **Abschirmung** (Einmal pro Zug darfst du 1 Schaden, den eine benachbarte eigene Einheit erleiden würde, auf diese Einheit umleiten.)
- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Die Ahnen stehen neben uns.*

### Plattenwagen
`dc_np_ossaria_plattenwagen` · Einheit · Bronze · 3 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)

- Effektcodes: –
- *Jede Platte ein Name.*

### Totenwallpanzer
`dc_np_ossaria_totenwallpanzer` · Einheit · undefined · 4 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Ein Wall auf Ketten.*

### Unbrechbare Platte
`dc_np_ossaria_unbrechbare_platte` · Einheit · Gold · 5 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)
- Kurztext: Jeder Schaden an dieser Einheit −2.
- Schwere Panzerung: Jeder einzelne Schaden, den diese Einheit erleidet (Kampf, Soforteinsatz, Effekt), wird um 2 verringert, mindestens auf 0.
- Effektcodes: SCHADEN_MINUS
- *Die letzte Platte hält immer.*

### Abnutzungskette
`dc_np_ossaria_abnutzungskette` · Einheit · Bronze · 3 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Langsam, teuer für den Feind.*

### Ahnenschmiedwagen
`dc_np_ossaria_ahnenschmiedwagen` · Einheit · Bronze · 4 AP

- **Abschirmung** (Einmal pro Zug darfst du 1 Schaden, den eine benachbarte eigene Einheit erleiden würde, auf diese Einheit umleiten.)

- Effektcodes: –
- *Geschmiedet aus alten Rüstungen.*

### Abnutzungsbatterie
`dc_np_ossaria_abnutzungsbatterie` · Einheit · Bronze · 3 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Jeder Meter kostet.*

### Nahdruckmörser
`dc_np_ossaria_nahdruckmoerser` · Einheit · Bronze · 2 AP

- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)
- Kurztext: Steilfeuer I.
- Steilfeuer I.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Feuer dient dem Aushalten.*

### Totenglocke
`dc_np_ossaria_totenglocke` · Einheit · Bronze · 3 AP

- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Läutet für jeden Gefallenen.*

### Wallfeuer
`dc_np_ossaria_wallfeuer` · Einheit · undefined · 4 AP

- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Schützt den Wall.*

### Namensruf-Batterie
`dc_np_ossaria_namensruf_batterie` · Einheit · Gold · 5 AP

- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)
- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Steilfeuer IV: ganze Front.
- Steilfeuer IV: ganze Front.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: ATTACK_ANY_FRONT
- *Jeder Schuss trägt einen Namen.*

### Grabsucher
`dc_np_ossaria_grabsucher` · Einheit · Bronze · 1 AP

- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Untersucht unnötige Tode.*

### Stellungsbeobachter
`dc_np_ossaria_stellungsbeobachter` · Einheit · Bronze · 2 AP

- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Taktisch eher Stellung als Tiefe.*

### Zeichendeuter
`dc_np_ossaria_zeichendeuter` · Einheit · undefined · 2 AP

- **Gefechtsbereit** (Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Liest die Zeichen des Feindes.*

### Schmied der Erinnerung
`dc_np_ossaria_schmied_der_erinnerung` · Einheit · Gold · 5 AP

- Kurztext: +2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.
- Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FUEHRUNG_V
- *Schmiedet Rüstung aus Erinnerung.*

### Wächter der Namen
`dc_np_ossaria_waechter_der_namen` · Einheit · undefined · 4 AP

- **Abschirmung** (Einmal pro Zug darfst du 1 Schaden, den eine benachbarte eigene Einheit erleiden würde, auf diese Einheit umleiten.)
- **Sicherung** (Andere eigene Einheiten im selben Abschnitt haben +1 DEF, solange diese Einheit offen liegt.)
- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Kein Name wird vergessen.*

### Wall der Gefallenen
`dc_np_ossaria_wall_der_gefallenen` · Unterstützung · Gold · 5 AP

- Kurztext: Jeder Schaden an deinen Fronteinheiten −1. Gegnerische Fronteinheiten −1 ATK.
- Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.
- Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).
- Effektcodes: REDUCE_DAMAGE, AURA_ENEMY_ATK
- *Die Toten schützen die Lebenden.*

### Ahnenhalle
`dc_np_ossaria_ahnenhalle` · Unterstützung · undefined · 3 AP

- Kurztext: Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Effektcodes: TURN_DRAW
- *Jeder Name hat eine Geschichte.*

### Rüstkammer der Toten
`dc_np_ossaria_ruestkammer_der_toten` · Unterstützung · undefined · 3 AP

- Kurztext: Jeder Schaden an deinen Fronteinheiten −1.
- Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.
- Effektcodes: REDUCE_DAMAGE
- *Die Rüstungen der Gefallenen leben weiter.*

### Aufruf der Namen
`dc_np_ossaria_aufruf_der_namen` · Soforteinsatz · undefined · 2 AP

- Kurztext: Eine eigene Fronteinheit: +2 ATK bis Zugende, +2 DEF dauerhaft.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges. Sie erhält +2 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF.
- Effektcodes: BUFF
- *Für die, die vor uns fielen.*

### Verlust wird Deckung
`dc_np_ossaria_verlust_wird_deckung` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Eine eigene Fronteinheit: +2 DEF dauerhaft.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF.
- Effektcodes: BUFF
- *Hinter den Gefallenen in Deckung.*

### Totenehre
`dc_np_ossaria_totenehre` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 1 Karte.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DRAW
- *Wir erinnern uns.*

### Teurer Meter
`dc_np_ossaria_teurer_meter` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 2 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Teurer Preis für jeden Meter.*

### Rüstung flicken
`dc_np_ossaria_ruestung_flicken` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Heile 2 DEF an einer eigenen Fronteinheit.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.
- Effektcodes: HEAL
- *Neue Niete, alter Name.*

### Wall verstärken
`dc_np_ossaria_wall_verstaerken` · Soforteinsatz · undefined · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +2 DEF dauerhaft.
- Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +2 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.
- Effektcodes: BUFF_SECTION
- *Noch eine Lage.*

### Ahnen rufen
`dc_np_ossaria_ahnen_rufen` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Ziehe 1 Karte.
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: COST_NEXT, DRAW
- *Die alten Rüstungen kommen zurück.*

### Prozession der Namen
`dc_np_ossaria_prozession_der_namen` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Ziehe 3, dann wirf deine älteste Handkarte ab.
- Ziehe 3 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.
- Effektcodes: DRAW_DISCARD
- *Wir tragen sie mit.*

### Gepanzerter Vorstoß
`dc_np_ossaria_gepanzerter_vorstoss` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 ATK bis Zugende.
- Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Einheit dort hat bis zum Ende dieses Zuges +1 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung).
- Effektcodes: BUFF_SECTION
- *Der Fuß drückt nach.*

### Die Toten auf der Rüstung
`dc_np_ossaria_die_toten_auf_der_ruestung` · Soforteinsatz · Gold · 4 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +2 DEF dauerhaft. Ziehe 2 Karten.
- Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +2 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.
- Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: BUFF_SECTION, DRAW
- *Jeder Name ein Schild.*

### Namensplatte
`dc_np_ossaria_namensplatte` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +2 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Ein Name schützt.*

### Totenschild
`dc_np_ossaria_totenschild` · Ausrüstung · Bronze · 1 AP

- **Erstschadenschutz** (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.
- Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Effektcodes: EQUIP_IGNORE_FIRST_DAMAGE
- *Der erste Treffer gilt den Toten.*

### Ahnenrüstung
`dc_np_ossaria_ahnenruestung` · Ausrüstung · undefined · 2 AP

- Kurztext: Träger +1 ATK und +2 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK und +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Geerbt und verstärkt.*

### Gedenkmarke
`dc_np_ossaria_gedenkmarke` · Ausrüstung · Bronze · 1 AP

- Kurztext: Wird der Träger zerstört, ziehst du 1 Karte. Träger +1 DEF.
- Wird der Träger zerstört, ziehst du 1 Karte.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: ON_DESTROY_DRAW, EQUIP_STAT
- *Wer fällt, wird erinnert.*

### Plattenschutz
`dc_np_ossaria_plattenschutz` · Ausrüstung · undefined · 1 AP

- Kurztext: Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 2 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.
- Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 2 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.
- Effektcodes: EQUIP_NEGATE_DAMAGE
- *Hält den Schlag ab.*

### Grabklinge
`dc_np_ossaria_grabklinge` · Ausrüstung · Bronze · 1 AP

- Kurztext: Solange der Träger beschädigt ist: +2 ATK.
- Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +2 ATK.
- Effektcodes: EQUIP_COND_ATK
- *Verwundet, aber nicht besiegt.*

## Caldris (40 neue Karten)

### Schildwall-Zug
`dc_np_caldris_schildwall_zug` · Einheit · Bronze · 2 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Hinter dem Schild steht die Etappe.*

### Sanitätstrupp
`dc_np_caldris_sanitaetstrupp` · Einheit · Bronze · 1 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Fürsorge an der Front.*

### Ruhezug
`dc_np_caldris_ruhezug` · Einheit · Bronze · 2 AP

- **Zähigkeit** (Hat +1 DEF für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)

- Effektcodes: –
- *Ausgeruht und bereit.*

### Schildträger
`dc_np_caldris_schildtraeger` · Einheit · undefined · 3 AP

- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Schützt die Nachbarn zuerst.*

### Etappenwache
`dc_np_caldris_etappenwache` · Einheit · Bronze · 2 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)
- Kurztext: Benachbarte eigene Infanterie +1 DEF.
- Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: MECH_AURA
- *Hält die Ruhezone sicher.*

### Genesene Kompanie
`dc_np_caldris_genesene_kompanie` · Einheit · undefined · 3 AP

- **Überlast** (Hat +2 ATK und +1 DEF. Am Ende jedes deiner Züge erleidet sie 1 Schaden, der nicht verhindert werden kann (nicht durch Eingraben oder Schadensreduktion).)

- Effektcodes: –
- *Zurück aus der Klinik, stärker als zuvor.*

### Sanitätspanzer
`dc_np_caldris_sanitaetspanzer` · Einheit · Bronze · 3 AP

- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)

- Effektcodes: –
- *Gepanzerte Fürsorge.*

### Schildwagen
`dc_np_caldris_schildwagen` · Einheit · undefined · 4 AP

- **Überlast** (Hat +2 ATK und +1 DEF. Am Ende jedes deiner Züge erleidet sie 1 Schaden, der nicht verhindert werden kann (nicht durch Eingraben oder Schadensreduktion).)
- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Ein rollender Schild.*

### Panzerschild Caldris
`dc_np_caldris_panzerschild_caldris` · Einheit · Gold · 5 AP

- **Abschirmung** (Einmal pro Zug darfst du 1 Schaden, den eine benachbarte eigene Einheit erleiden würde, auf diese Einheit umleiten.)
- Kurztext: Jeder Schaden an dieser Einheit −2.
- Schwere Panzerung: Jeder einzelne Schaden, den diese Einheit erleidet (Kampf, Soforteinsatz, Effekt), wird um 2 verringert, mindestens auf 0.
- Effektcodes: SCHADEN_MINUS
- *Nichts kommt durch.*

### Etappenpanzer
`dc_np_caldris_etappenpanzer` · Einheit · Bronze · 3 AP

- **Zähigkeit** (Hat +1 DEF für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)

- Effektcodes: –
- *Sichert den Weg zur Klinik.*

### Bergepanzer Caldris
`dc_np_caldris_bergepanzer_caldris` · Einheit · Bronze · 3 AP

- **Ablösung** (Wird diese Einheit zerstört, kostet die nächste eigene Einheit, die du auf dasselbe Feld setzt, 1 AP weniger (mindestens 1), bis das Feld wieder besetzt wurde oder bis zum Ende deines nächsten Zugs, was zuerst eintritt. Höchstens eine solche Markierung pro Feld.)

- Effektcodes: –
- *Niemand bleibt liegen.*

### Schutzfeuerbatterie
`dc_np_caldris_schutzfeuerbatterie` · Einheit · Bronze · 3 AP

- **Fernschuss** (Hat +1 Reichweite (bei Steilfeuer nur Stufen I–III; IV/V bereits ganze Front).)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Feuer schützt die Etappe.*

### Abschnittsmörser
`dc_np_caldris_abschnittsmoerser` · Einheit · Bronze · 2 AP

- Kurztext: Steilfeuer I.
- Steilfeuer I.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Deckt den eigenen Abschnitt.*

### Defensivbatterie
`dc_np_caldris_defensivbatterie` · Einheit · undefined · 4 AP

- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Schießt nur, wenn der Schild bedroht ist.*

### Sperrfeuer Fürsorge
`dc_np_caldris_sperrfeuer_fuersorge` · Einheit · Bronze · 3 AP

- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Hält den Gegner von den Verwundeten fern.*

### Schlag nach der Genesung
`dc_np_caldris_schlag_nach_der_genesung` · Einheit · Gold · 5 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- **Fernschuss** (Hat +1 Reichweite (bei Steilfeuer nur Stufen I–III; IV/V bereits ganze Front).)
- Kurztext: Steilfeuer IV: ganze Front.
- Steilfeuer IV: ganze Front.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: ATTACK_ANY_FRONT
- *Nach dem Rasten kommt der Schlag.*

### Biometrie-Melder
`dc_np_caldris_biometrie_melder` · Einheit · Bronze · 1 AP

- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Meldet nach oben, was die Sensoren sehen.*

### Sanitätsaufklärer
`dc_np_caldris_sanitaetsaufklaerer` · Einheit · Bronze · 2 AP

- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Sucht Verwundete – und Feinde.*

### Etappenbeobachter
`dc_np_caldris_etappenbeobachter` · Einheit · undefined · 2 AP

- **Fernschuss** (Hat +1 Reichweite (bei Steilfeuer nur Stufen I–III; IV/V bereits ganze Front).)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Sieht, wer die Etappe bedroht.*

### Oberste Fürsorge
`dc_np_caldris_oberste_fuersorge` · Einheit · Gold · 5 AP

- **Erbitterung** (Hat +1 ATK für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)
- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Niemand wird zurückgelassen.*

### Schildgarde
`dc_np_caldris_schildgarde` · Einheit · undefined · 4 AP

- **Sicherung** (Andere eigene Einheiten im selben Abschnitt haben +1 DEF, solange diese Einheit offen liegt.)
- Kurztext: Benachbarte eigene Infanterie +1 DEF.
- Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: MECH_AURA
- *Der Schild der Schilde.*

### Feldklinik
`dc_np_caldris_feldklinik` · Unterstützung · undefined · 3 AP

- Kurztext: Jeder Schaden an deinen Fronteinheiten −1.
- Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.
- Effektcodes: REDUCE_DAMAGE
- *Hier wird jeder versorgt.*

### Ruhezone
`dc_np_caldris_ruhezone` · Unterstützung · undefined · 3 AP

- Kurztext: Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Effektcodes: TURN_DRAW
- *Wer ruht, hält länger.*

### Unantastbare Etappe
`dc_np_caldris_unantastbare_etappe` · Unterstützung · Gold · 5 AP

- Kurztext: Jeder Schaden an deinen Fronteinheiten −1. Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Effektcodes: REDUCE_DAMAGE, TURN_DRAW
- *Die Etappe ist unantastbar.*

### Nachtlager
`dc_np_caldris_nachtlager` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Heile 3 DEF an einer eigenen Fronteinheit.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 3 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.
- Effektcodes: HEAL
- *Eine Nacht Schlaf wirkt Wunder.*

### Verbandswechsel
`dc_np_caldris_verbandswechsel` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Heile 2 DEF an einer eigenen Fronteinheit. Ziehe 1 Karte.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: HEAL, DRAW
- *Versorgt und weiter.*

### Schild heben
`dc_np_caldris_schild_heben` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Eine eigene Fronteinheit: +2 DEF dauerhaft.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF.
- Effektcodes: BUFF
- *Alle hinter den Schild.*

### Etappe sichern
`dc_np_caldris_etappe_sichern` · Soforteinsatz · undefined · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +2 DEF dauerhaft.
- Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +2 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.
- Effektcodes: BUFF_SECTION
- *Der Abschnitt wird zur Festung.*

### Fürsorgemeldung
`dc_np_caldris_fuersorgemeldung` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 1 Karte.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DRAW
- *Alle sind versorgt.*

### Genesung
`dc_np_caldris_genesung` · Soforteinsatz · undefined · 2 AP

- Kurztext: Heile 4 DEF an einer eigenen Fronteinheit.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 4 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.
- Effektcodes: HEAL
- *Vollständig wiederhergestellt.*

### Schutzfeuer
`dc_np_caldris_schutzfeuer` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 2 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Weg von unseren Verwundeten.*

### Ruhe vor dem Schlag
`dc_np_caldris_ruhe_vor_dem_schlag` · Soforteinsatz · undefined · 2 AP

- Kurztext: Eine eigene Fronteinheit: +2 ATK bis Zugende, +1 DEF dauerhaft.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges. Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF.
- Effektcodes: BUFF
- *Ausgeruht zuschlagen.*

### Genesene zurück an die Front
`dc_np_caldris_genesene_zurueck_an_die_front` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Ziehe 1 Karte.
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: COST_NEXT, DRAW
- *Die Klinik wird erweitert.*

### Wall aus Schilden
`dc_np_caldris_wall_aus_schilden` · Soforteinsatz · Gold · 3 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +3 DEF dauerhaft.
- Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +3 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.
- Effektcodes: BUFF_SECTION
- *Eine Mauer aus Schilden.*

### Schutzschild leicht
`dc_np_caldris_schutzschild_leicht` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +2 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Leicht, aber schützend.*

### Verbandspäckchen
`dc_np_caldris_verbandspaeckchen` · Ausrüstung · Bronze · 1 AP

- Kurztext: Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 2 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.
- Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 2 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.
- Effektcodes: EQUIP_NEGATE_DAMAGE
- *Erste Hilfe beim ersten Treffer.*

### Schildplatte
`dc_np_caldris_schildplatte` · Ausrüstung · Bronze · 1 AP

- **Erstschadenschutz** (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.
- Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Effektcodes: EQUIP_IGNORE_FIRST_DAMAGE
- *Der erste Schlag prallt ab.*

### Ruheabzeichen
`dc_np_caldris_ruheabzeichen` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +1 DEF. Wird der Träger zerstört, ziehst du 1 Karte.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Wird der Träger zerstört, ziehst du 1 Karte.
- Effektcodes: EQUIP_STAT, ON_DESTROY_DRAW
- *Wer fällt, wird betrauert und ersetzt.*

### Vollschutzweste
`dc_np_caldris_vollschutzweste` · Ausrüstung · undefined · 2 AP

- Kurztext: Träger +3 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +3 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Das Beste für die Infanterie.*

### Genesungsbajonett
`dc_np_caldris_genesungsbajonett` · Ausrüstung · undefined · 1 AP

- Kurztext: Solange der Träger beschädigt ist: +2 ATK.
- Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +2 ATK.
- Effektcodes: EQUIP_COND_ATK
- *Verwundet kämpft man entschlossener.*

## Orthea (40 neue Karten)

### Messkette Alpha
`dc_np_orthea_messkette_alpha` · Einheit · Bronze · 2 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)

- Effektcodes: –
- *Trägt die Probe an die Front.*

### Kreuzpeilungstrupp
`dc_np_orthea_kreuzpeilungstrupp` · Einheit · Bronze · 1 AP

- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)

- Effektcodes: –
- *Drei Peilungen, ein Schnittpunkt.*

### Probenträger
`dc_np_orthea_probentraeger` · Einheit · Bronze · 2 AP

- **Erbitterung** (Hat +1 ATK für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)

- Effektcodes: –
- *Ohne Probe keine Erkenntnis.*

### Präzisionsschützen
`dc_np_orthea_praezisionsschuetzen` · Einheit · undefined · 3 AP

- Kurztext: Angriffe gegen ungepanzerte Ziele: +1 Schaden.
- Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: FEUERUEBERLEGENHEIT
- *Kein Schuss ohne Rechnung.*

### Modellprüfer
`dc_np_orthea_modellpruefer` · Einheit · undefined · 2 AP

- Kurztext: Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.
- Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie.
- Effektcodes: HAND_PEEK
- *Prüft das gegnerische Modell.*

### Klinikwache
`dc_np_orthea_klinikwache` · Einheit · Bronze · 2 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)

- Effektcodes: –
- *Bewacht die Labore der Republik.*

### Messpanzer
`dc_np_orthea_messpanzer` · Einheit · Bronze · 3 AP

- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)

- Effektcodes: –
- *Ein rollendes Labor.*

### Zielrechner-Wagen
`dc_np_orthea_zielrechner_wagen` · Einheit · undefined · 4 AP

- Kurztext: Angriffe gegen gepanzerte Ziele: +2 Schaden.
- Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 2 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: IGNORE_DEF
- *Berechnet die Schwachstelle jeder Platte.*

### Leichter Probenwagen
`dc_np_orthea_leichter_probenwagen` · Einheit · Bronze · 3 AP

- **Gefechtsbereit** (Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.)

- Effektcodes: –
- *Bringt Messwerte zurück.*

### Feldversuch Kette
`dc_np_orthea_feldversuch_kette` · Einheit · Bronze · 3 AP

- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)
- Kurztext: Angriffe gegen gepanzerte Ziele: +1 Schaden.
- Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: IGNORE_DEF
- *Versuch Nummer 117.*

### Einzelschusspanzer
`dc_np_orthea_einzelschusspanzer` · Einheit · Gold · 5 AP

- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)
- Kurztext: Angriffe gegen gepanzerte Ziele: +3 Schaden.
- Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 3 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: IGNORE_DEF
- *Ein Schuss, ein Ergebnis.*

### Punktfeuerbatterie
`dc_np_orthea_punktfeuerbatterie` · Einheit · Bronze · 3 AP

- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Ein Ziel, hoher Effekt.*

### Zentrale Feuerleitung
`dc_np_orthea_zentrale_feuerleitung` · Einheit · Gold · 5 AP

- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)
- Kurztext: Steilfeuer V: Front + Support (+2 AP).
- Steilfeuer V: Front + Support (+2 AP).
- Die Einheit zählt für alle Regeln als Artillerie.
- Supportzone-Angriff 3 AP; Front 1 AP.
- Effektcodes: ATTACK_ANY_FRONT, ATTACK_SUPPORT
- *Die Rechnung vor dem Schuss.*

### Präzisionsmörser
`dc_np_orthea_praezisionsmoerser` · Einheit · Bronze · 2 AP

- **Fernschuss** (Hat +1 Reichweite (bei Steilfeuer nur Stufen I–III; IV/V bereits ganze Front).)
- Kurztext: Steilfeuer I.
- Steilfeuer I.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Trifft das gemessene Planquadrat.*

### Zielrechnungsrohr
`dc_np_orthea_zielrechnungsrohr` · Einheit · undefined · 4 AP

- Kurztext: Steilfeuer II. Angriffe gegen ungepanzerte Ziele: +1 Schaden.
- Steilfeuer II.
- Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: FEUERUEBERLEGENHEIT
- *Abweichung kleiner als ein Meter.*

### Nachmessbatterie
`dc_np_orthea_nachmessbatterie` · Einheit · Bronze · 3 AP

- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Schießt, misst, schießt nach.*

### Peilstation mobil
`dc_np_orthea_peilstation_mobil` · Einheit · Bronze · 1 AP

- **Fernschuss** (Hat +1 Reichweite (bei Steilfeuer nur Stufen I–III; IV/V bereits ganze Front).)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Ortet Funksignale in Sekunden.*

### Gesamtlagebild
`dc_np_orthea_gesamtlagebild` · Einheit · Gold · 3 AP

- **Fernschuss** (Hat +1 Reichweite (bei Steilfeuer nur Stufen I–III; IV/V bereits ganze Front).)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Nichts bleibt verborgen.*

### Beobachterkette
`dc_np_orthea_beobachterkette` · Einheit · undefined · 2 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Jeder sieht einen Teil, alle sehen das Ganze.*

### Institut der Erkenntnis
`dc_np_orthea_institut_der_erkenntnis` · Einheit · undefined · 4 AP

- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Die besten Köpfe an der Front.*

### Chefmesser
`dc_np_orthea_chefmesser` · Einheit · undefined · 4 AP

- Kurztext: Angriffe gegen ungepanzerte Ziele: +1 Schaden.
- Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: FEUERUEBERLEGENHEIT
- *Misst zuerst, dann misst niemand mehr.*

### Messnetz
`dc_np_orthea_messnetz` · Unterstützung · undefined · 3 AP

- Kurztext: Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Effektcodes: TURN_DRAW
- *Jede Stunde neue Werte.*

### Klinikverfahren
`dc_np_orthea_klinikverfahren` · Unterstützung · undefined · 3 AP

- Kurztext: Jeder Schaden an deinen Fronteinheiten −1.
- Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.
- Effektcodes: REDUCE_DAMAGE
- *Behandlung nach Protokoll.*

### Rechenzentrum Orthea
`dc_np_orthea_rechenzentrum_orthea` · Unterstützung · Gold · 5 AP

- Kurztext: Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert. Zu Beginn deines Zuges: +1 AP.
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt.
- Effektcodes: TURN_DRAW, TURN_AP
- *Das Modell rechnet schneller als der Gegner.*

### Messung
`dc_np_orthea_messung` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: MARK_OBSERVED
- *Erfasst und aufgezeichnet.*

### Einzelziel-Salve
`dc_np_orthea_einzelziel_salve` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 2 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Ein Ziel, ein Einschlag.*

### Gemessener Schlag
`dc_np_orthea_gemessener_schlag` · Soforteinsatz · undefined · 3 AP

- Kurztext: Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet. Füge einer gegnerischen Fronteinheit 3 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 3 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: MARK_OBSERVED, DEAL_DAMAGE
- *Erst messen, dann vernichten.*

### Klarstellung
`dc_np_orthea_klarstellung` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 1 Karte.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DRAW
- *Das Modell wird korrigiert.*

### Nachmessen
`dc_np_orthea_nachmessen` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 2, dann wirf deine älteste Handkarte ab.
- Ziehe 2 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.
- Effektcodes: DRAW_DISCARD
- *Falsche Daten werden verworfen.*

### Zielkorrektur
`dc_np_orthea_zielkorrektur` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Eine eigene Fronteinheit: +2 ATK bis Zugende.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges.
- Effektcodes: BUFF
- *Plus zwei Strich, Feuer.*

### Erkenntnisvorsprung
`dc_np_orthea_erkenntnisvorsprung` · Soforteinsatz · undefined · 2 AP

- Kurztext: Ziehe 2 Karten.
- Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DRAW
- *Wer mehr weiß, entscheidet.*

### Laborversorgung
`dc_np_orthea_laborversorgung` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Heile 2 DEF an einer eigenen Fronteinheit.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.
- Effektcodes: HEAL
- *Wundversorgung nach neuester Studie.*

### Volltreffer berechnet
`dc_np_orthea_volltreffer_berechnet` · Soforteinsatz · Gold · 4 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 5 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 5 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Die Rechnung geht auf.*

### Nachbesetzung nach Maß
`dc_np_orthea_nachbesetzung_nach_mass` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Ziehe 1 Karte.
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: COST_NEXT, DRAW
- *Angepasst auf jeden Träger.*

### Optik Feinmessung
`dc_np_orthea_optik_feinmessung` · Ausrüstung · Bronze · 1 AP

- Kurztext: Angriffe des Trägers: +1 Schaden.
- Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.
- Effektcodes: EQUIP_ON_ATTACK_DAMAGE
- *Ein Strich Abweichung, mehr nicht.*

### Peilantenne
`dc_np_orthea_peilantenne` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +1 DEF. Wird der Träger zerstört, ziehst du 1 Karte.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Wird der Träger zerstört, ziehst du 1 Karte.
- Effektcodes: EQUIP_STAT, ON_DESTROY_DRAW
- *Die letzte Peilung geht nicht verloren.*

### Zielrechner tragbar
`dc_np_orthea_zielrechner_tragbar` · Ausrüstung · undefined · 1 AP

- Kurztext: Erster Angriff des Trägers: +2 ATK.
- Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +2 ATK. Danach entfällt der Bonus.
- Effektcodes: CARRIER_FIRST_ATTACK_ATK
- *Der erste Schuss ist berechnet.*

### Laborpanzerung
`dc_np_orthea_laborpanzerung` · Ausrüstung · undefined · 2 AP

- Kurztext: Träger +2 DEF. Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 1 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 1 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.
- Effektcodes: EQUIP_STAT, EQUIP_NEGATE_DAMAGE
- *Getestet bis zur Bruchgrenze.*

### Messgewehr
`dc_np_orthea_messgewehr` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +1 ATK.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Kalibriert im Institut.*

### Feldlaborkoffer
`dc_np_orthea_feldlaborkoffer` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +2 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Schwer, aber schützend.*

## Namar (40 neue Karten)

### Kaischützen
`dc_np_namar_kaischuetzen` · Einheit · Bronze · 2 AP

- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)

- Effektcodes: –
- *Der Kai gehört uns.*

### Schnelle Entsatzgruppe
`dc_np_namar_schnelle_entsatzgruppe` · Einheit · Bronze · 1 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Kommt, wo es brennt.*

### Hafenarbeiter-Miliz
`dc_np_namar_hafenarbeiter_miliz` · Einheit · Bronze · 1 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Heute Kisten, morgen Gewehre.*

### Konvoischutz
`dc_np_namar_konvoischutz` · Einheit · undefined · 3 AP

- **Ablösung** (Wird diese Einheit zerstört, kostet die nächste eigene Einheit, die du auf dasselbe Feld setzt, 1 AP weniger (mindestens 1), bis das Feld wieder besetzt wurde oder bis zum Ende deines nächsten Zugs, was zuerst eintritt. Höchstens eine solche Markierung pro Feld.)
- Kurztext: Benachbarte eigene Infanterie +1 DEF.
- Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: MECH_AURA
- *Begleitet die Lieferung.*

### Schmugglerzug
`dc_np_namar_schmugglerzug` · Einheit · Bronze · 2 AP

- **Platztausch** (Wird die Einheit aufgedeckt, darfst du sie mit einer anderen eigenen verdeckten Einheit tauschen. Der Tausch gilt nicht als neuer Einsatz (kein neues Eingraben). Der Gegner erfährt nicht den Namen der anderen Karte, nur dass getauscht wurde bzw. die Wahl existiert.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: RELOCATE_HIDE
- *Ein Teil verschwindet, der Rest kommt an.*

### Hafenregiment
`dc_np_namar_hafenregiment` · Einheit · undefined · 3 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)

- Effektcodes: –
- *Häfen stehen zusammen.*

### Kaipanzer
`dc_np_namar_kaipanzer` · Einheit · Bronze · 3 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)

- Effektcodes: –
- *Vom Schiff an die Front.*

### Lieferkette
`dc_np_namar_lieferkette` · Einheit · Bronze · 3 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Bringt alles mit.*

### Entsatzwagen
`dc_np_namar_entsatzwagen` · Einheit · undefined · 4 AP

- Kurztext: +2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.
- Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FUEHRUNG_V
- *Rollt in den getroffenen Abschnitt.*

### Containerpanzer
`dc_np_namar_containerpanzer` · Einheit · Bronze · 4 AP

- **Abschirmung** (Einmal pro Zug darfst du 1 Schaden, den eine benachbarte eigene Einheit erleiden würde, auf diese Einheit umleiten.)

- Effektcodes: –
- *Improvisiert, aber stabil.*

### Herr der Kais
`dc_np_namar_herr_der_kais` · Einheit · Gold · 5 AP

- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Kontrolliert jeden Kai.*

### Kaibatterie
`dc_np_namar_kaibatterie` · Einheit · Bronze · 3 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Deckt Entsatz und Kai.*

### Schiffsmörser
`dc_np_namar_schiffsmoerser` · Einheit · Bronze · 2 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- Kurztext: Steilfeuer I.
- Steilfeuer I.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Ausgeladen und aufgestellt.*

### Konvoifeuer
`dc_np_namar_konvoifeuer` · Einheit · Bronze · 3 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Schützt die Lieferung.*

### Hafengeschütz
`dc_np_namar_hafengeschuetz` · Einheit · undefined · 4 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Trifft auch fremde Depots.*

### Schlag der Ankunft
`dc_np_namar_schlag_der_ankunft` · Einheit · Gold · 5 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)
- Kurztext: Steilfeuer IV: ganze Front.
- Steilfeuer IV: ganze Front.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: ATTACK_ANY_FRONT
- *Wenn die Lieferung ankommt, schlägt sie zu.*

### Hafenlotse
`dc_np_namar_hafenlotse` · Einheit · Bronze · 1 AP

- **Fernschuss** (Hat +1 Reichweite (bei Steilfeuer nur Stufen I–III; IV/V bereits ganze Front).)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Kennt jede Einfahrt.*

### Konvoiaufklärer
`dc_np_namar_konvoiaufklaerer` · Einheit · Bronze · 2 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Wer mitverdient, wird beobachtet.*

### Kaispitzel
`dc_np_namar_kaispitzel` · Einheit · undefined · 2 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.
- Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie.
- Effektcodes: HAND_PEEK
- *Hört alles am Hafen.*

### Lieferung trotz allem
`dc_np_namar_lieferung_trotz_allem` · Einheit · Gold · 5 AP

- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)
- **Sicherung** (Andere eigene Einheiten im selben Abschnitt haben +1 DEF, solange diese Einheit offen liegt.)
- Kurztext: Benachbarte eigene Infanterie +1 DEF.
- Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: MECH_AURA
- *Kommt immer an.*

### Hafenbund-Garde
`dc_np_namar_hafenbund_garde` · Einheit · undefined · 4 AP

- **Abschirmung** (Einmal pro Zug darfst du 1 Schaden, den eine benachbarte eigene Einheit erleiden würde, auf diese Einheit umleiten.)
- **Sicherung** (Andere eigene Einheiten im selben Abschnitt haben +1 DEF, solange diese Einheit offen liegt.)
- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Schützt den Bund der Häfen.*

### Kai ohne Schloss
`dc_np_namar_kai_ohne_schloss` · Unterstützung · Gold · 4 AP

- Kurztext: Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert. Zu Beginn deines Zuges: +1 AP.
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt.
- Effektcodes: TURN_DRAW, TURN_AP
- *Alles kommt an.*

### Speicher am Hafen
`dc_np_namar_speicher_am_hafen` · Unterstützung · undefined · 3 AP

- Kurztext: Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Effektcodes: TURN_DRAW
- *Immer etwas auf Lager.*

### Hafenkontor
`dc_np_namar_hafenkontor` · Unterstützung · undefined · 3 AP

- Kurztext: Zu Beginn deines Zuges: +1 AP.
- Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt.
- Effektcodes: TURN_AP
- *Wer zahlt, bekommt.*

### Aus vollen Lagern
`dc_np_namar_aus_vollen_lagern` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Effektcodes: COST_NEXT
- *Der Vorrat geht in den Abschnitt.*

### Hilfe vom Kai
`dc_np_namar_hilfe_vom_kai` · Soforteinsatz · undefined · 2 AP

- Kurztext: Heile 3 DEF an einer eigenen Fronteinheit. Ziehe 1 Karte.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 3 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: HEAL, DRAW
- *Hilfe ist da.*

### Lieferung eingetroffen
`dc_np_namar_lieferung_eingetroffen` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Ziehe 2 Karten.
- Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DRAW
- *Kisten voller Munition.*

### Chaoslogistik
`dc_np_namar_chaoslogistik` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 3, dann wirf deine älteste Handkarte ab.
- Ziehe 3 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.
- Effektcodes: DRAW_DISCARD
- *Ein Teil fehlt immer.*

### Kai verteidigen
`dc_np_namar_kai_verteidigen` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 DEF dauerhaft.
- Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +1 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.
- Effektcodes: BUFF_SECTION
- *Der Hafen hält.*

### Nachschub
`dc_np_namar_nachschub` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Heile 2 DEF an einer eigenen Fronteinheit.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.
- Effektcodes: HEAL
- *Frische Verbände.*

### Hafenfeuer
`dc_np_namar_hafenfeuer` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 2 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Vom Kai aus getroffen.*

### Ganze Schiffsladung
`dc_np_namar_ganze_schiffsladung` · Soforteinsatz · undefined · 2 AP

- Kurztext: Eine eigene Fronteinheit: +2 ATK bis Zugende, +1 DEF dauerhaft.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges. Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF.
- Effektcodes: BUFF
- *Alles, was das Schiff hatte.*

### Konvoi durchbringen
`dc_np_namar_konvoi_durchbringen` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Ziehe 1 Karte.
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: COST_NEXT, DRAW
- *Die Ladung ist sicher.*

### Die große Flotte
`dc_np_namar_die_grosse_flotte` · Soforteinsatz · Gold · 4 AP

- Kurztext: Ziehe 3 Karten. Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).
- Ziehe 3 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Effektcodes: DRAW, COST_NEXT
- *Ein ganzer Konvoi auf einmal.*

### Hafenhelm
`dc_np_namar_hafenhelm` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +2 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Gegen Kisten und Kugeln.*

### Schmuggelware
`dc_np_namar_schmuggelware` · Ausrüstung · Bronze · 1 AP

- Kurztext: Wird der Träger zerstört, ziehst du 1 Karte.
- Wird der Träger zerstört, ziehst du 1 Karte.
- Effektcodes: ON_DESTROY_DRAW
- *Irgendwas fällt immer ab.*

### Kaipanzerung
`dc_np_namar_kaipanzerung` · Ausrüstung · Bronze · 1 AP

- **Erstschadenschutz** (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Kurztext: Träger +1 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.
- Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Effektcodes: EQUIP_STAT, EQUIP_IGNORE_FIRST_DAMAGE
- *Aus Containerstahl.*

### Lieferwaffe
`dc_np_namar_lieferwaffe` · Ausrüstung · undefined · 1 AP

- Kurztext: Träger +1 ATK und +1 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK und +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Frisch aus der Kiste.*

### Signalpistole
`dc_np_namar_signalpistole` · Ausrüstung · Bronze · 1 AP

- Kurztext: Erster Angriff des Trägers: +2 ATK.
- Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +2 ATK. Danach entfällt der Bonus.
- Effektcodes: CARRIER_FIRST_ATTACK_ATK
- *Signal für den Entsatz.*

### Hafenkran-Haken
`dc_np_namar_hafenkran_haken` · Ausrüstung · undefined · 1 AP

- Kurztext: Angriffe des Trägers: +1 Schaden.
- Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.
- Effektcodes: EQUIP_ON_ATTACK_DAMAGE
- *Improvisiert und wirksam.*

## Rothain (40 neue Karten)

### Erbregiment Narbstadt
`dc_np_rothain_erbregiment_narbstadt` · Einheit · Bronze · 2 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Das Regiment ist älter als die Republik.*

### Ablösungszug
`dc_np_rothain_abloesungszug` · Einheit · Bronze · 2 AP

- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)

- Effektcodes: –
- *Kommt, wenn die anderen müde sind.*

### Schwerpunktgrenadiere
`dc_np_rothain_schwerpunktgrenadiere` · Einheit · undefined · 3 AP

- Kurztext: Angriffe gegen Infanterie: +2 Schaden.
- Greift diese Einheit eine Infanterie an, verursacht sie 2 Schaden zusätzlich zu ihrem ATK. Der Gegenschlag des Ziels bleibt unverändert.
- Effektcodes: VS_INF
- *Alles auf einen Punkt.*

### Kolonne Flussrot
`dc_np_rothain_kolonne_flussrot` · Einheit · Bronze · 1 AP

- **Zähigkeit** (Hat +1 DEF für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)

- Effektcodes: –
- *Straße, Brücke, Umschlag – und weiter.*

### Stabskompanie Erbe
`dc_np_rothain_stabskompanie_erbe` · Einheit · undefined · 3 AP

- Kurztext: Benachbarte eigene Infanterie +1 DEF.
- Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: MECH_AURA
- *Führt nach den Karten von gestern.*

### Treuewache Kronstraße
`dc_np_rothain_treuewache_kronstrasse` · Einheit · Bronze · 2 AP

- **Ablösung** (Wird diese Einheit zerstört, kostet die nächste eigene Einheit, die du auf dasselbe Feld setzt, 1 AP weniger (mindestens 1), bis das Feld wieder besetzt wurde oder bis zum Ende deines nächsten Zugs, was zuerst eintritt. Höchstens eine solche Markierung pro Feld.)

- Effektcodes: –
- *Hält die alte Straße, wie immer.*

### Erbpanzer Kronlinie
`dc_np_rothain_erbpanzer_kronlinie` · Einheit · Bronze · 3 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)

- Effektcodes: –
- *Geerbt, gepflegt, gefürchtet.*

### Schwerpunktwagen
`dc_np_rothain_schwerpunktwagen` · Einheit · Bronze · 4 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)

- Effektcodes: –
- *Gebaut für den einen Punkt.*

### Geerbtes Arsenal
`dc_np_rothain_geerbtes_arsenal` · Einheit · Gold · 5 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)
- Kurztext: Angriffe gegen gepanzerte Ziele: +2 Schaden.
- Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 2 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: IGNORE_DEF
- *Was die Alten bauten, bricht noch Panzer.*

### Reservekette Erbfolge
`dc_np_rothain_reservekette_erbfolge` · Einheit · undefined · 3 AP

- **Ablösung** (Wird diese Einheit zerstört, kostet die nächste eigene Einheit, die du auf dasselbe Feld setzt, 1 AP weniger (mindestens 1), bis das Feld wieder besetzt wurde oder bis zum Ende deines nächsten Zugs, was zuerst eintritt. Höchstens eine solche Markierung pro Feld.)
- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Rollt in die Lücke der Gefallenen.*

### Depotwagen Kronstraße
`dc_np_rothain_depotwagen_kronstrasse` · Einheit · Bronze · 3 AP

- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)

- Effektcodes: –
- *Bringt Munition an den Punkt.*

### Schwerpunktbatterie
`dc_np_rothain_schwerpunktbatterie` · Einheit · Bronze · 3 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Feuer nur dort, wo es zählt.*

### Stabsrohr Neuhoff
`dc_np_rothain_stabsrohr_neuhoff` · Einheit · Bronze · 3 AP

- **Fernschuss** (Hat +1 Reichweite (bei Steilfeuer nur Stufen I–III; IV/V bereits ganze Front).)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Nach alten Feuerplänen eingerichtet.*

### Erbmörser
`dc_np_rothain_erbmoerser` · Einheit · Bronze · 2 AP

- Kurztext: Steilfeuer I.
- Steilfeuer I.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Der Großvater schoss schon damit.*

### Ballungsfeuer
`dc_np_rothain_ballungsfeuer` · Einheit · undefined · 4 AP

- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Alle Rohre auf einen Abschnitt.*

### Ewige Batterie
`dc_np_rothain_ewige_batterie` · Einheit · Gold · 5 AP

- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)
- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Steilfeuer V: Front + Support (+2 AP).
- Steilfeuer V: Front + Support (+2 AP).
- Die Einheit zählt für alle Regeln als Artillerie.
- Supportzone-Angriff 3 AP; Front 1 AP.
- Effektcodes: ATTACK_ANY_FRONT, ATTACK_SUPPORT
- *Sie schoss im letzten Krieg und schießt in diesem.*

### Stabsmelder
`dc_np_rothain_stabsmelder` · Einheit · Bronze · 1 AP

- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Bringt Lagekarten von der Achse.*

### Achsenkundschafter
`dc_np_rothain_achsenkundschafter` · Einheit · Bronze · 2 AP

- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Kennt jede Straße seit Generationen.*

### Erbkarte Späher
`dc_np_rothain_erbkarte_spaeher` · Einheit · undefined · 2 AP

- Kurztext: Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.
- Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie.
- Effektcodes: HAND_PEEK
- *Sieht, was das Erbe vergessen hat.*

### Regimentsälteste
`dc_np_rothain_regimentsaelteste` · Einheit · undefined · 4 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)
- **Sicherung** (Andere eigene Einheiten im selben Abschnitt haben +1 DEF, solange diese Einheit offen liegt.)
- Kurztext: +2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.
- Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FUEHRUNG_V
- *Führen mit Erfahrung, nicht mit Rang.*

### Erbmarschall Rothain
`dc_np_rothain_erbmarschall_rothain` · Einheit · Gold · 5 AP

- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Konzentration ist eine Familientradition.*

### Ablösungsdepot
`dc_np_rothain_abloesungsdepot` · Unterstützung · undefined · 3 AP

- Kurztext: Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Effektcodes: TURN_DRAW
- *Ersatz steht immer bereit.*

### Stabszentrale Erbe
`dc_np_rothain_stabszentrale_erbe` · Unterstützung · undefined · 3 AP

- Kurztext: Zu Beginn deines Zuges: +1 AP.
- Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt.
- Effektcodes: TURN_AP
- *Die alte Zentrale funktioniert noch.*

### Gebündelte Front
`dc_np_rothain_gebuendelte_front` · Unterstützung · Gold · 4 AP

- Kurztext: Deine Fronteinheiten +1 ATK.
- Solange diese Unterstützung liegt, haben alle deine Fronteinheiten +1 ATK.
- Effektcodes: AURA_FRONT_ATK
- *Alle Kraft an einem Punkt.*

### Schwerpunkt setzen
`dc_np_rothain_schwerpunkt_setzen` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 ATK bis Zugende.
- Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Einheit dort hat bis zum Ende dieses Zuges +1 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung).
- Effektcodes: BUFF_SECTION
- *Hier und nicht anderswo.*

### Ablösung vorziehen
`dc_np_rothain_abloesung_vorziehen` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Effektcodes: COST_NEXT
- *Die nächste Welle steht bereit.*

### Frische Kräfte
`dc_np_rothain_frische_kraefte` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Heile 2 DEF an einer eigenen Fronteinheit.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.
- Effektcodes: HEAL
- *Die Abgelösten erholen sich.*

### Konzentrierter Stoß
`dc_np_rothain_konzentrierter_stoss` · Soforteinsatz · undefined · 2 AP

- Kurztext: Eine eigene Fronteinheit: +2 ATK bis Zugende, +1 DEF dauerhaft.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges. Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF.
- Effektcodes: BUFF
- *Gebündelte Kraft am Punkt.*

### Nachstoß
`dc_np_rothain_nachstoss` · Soforteinsatz · undefined · 2 AP

- Kurztext: Eine eigene Fronteinheit darf in diesem Zug erneut angreifen.
- Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten).
- Effektcodes: EXTRA_ATTACK
- *Der Schwerpunkt hält den Druck.*

### Umschlag Flussrot
`dc_np_rothain_umschlag_flussrot` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Ziehe 2 Karten.
- Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DRAW
- *Nachschub über die alte Straße.*

### Stabsbesprechung
`dc_np_rothain_stabsbesprechung` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 2, dann wirf deine älteste Handkarte ab.
- Ziehe 2 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.
- Effektcodes: DRAW_DISCARD
- *Neue Lage, alte Karten.*

### Gezieltes Feuer
`dc_np_rothain_gezieltes_feuer` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 2 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Ein Schuss für den Schwerpunkt.*

### Ewige Ablösung
`dc_np_rothain_ewige_abloesung` · Soforteinsatz · Gold · 3 AP

- Kurztext: Deine nächste Einheit oder Unterstützung kostet 2 AP weniger (mind. 1). Ziehe 1 Karte.
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 2 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: COST_NEXT, DRAW
- *Die Linie stirbt nie.*

### Druck am Punkt
`dc_np_rothain_druck_am_punkt` · Soforteinsatz · undefined · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: deine Infanterie dort +2 ATK bis Zugende.
- Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Infanterie-Einheit dort hat bis zum Ende dieses Zuges +2 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung).
- Effektcodes: BUFF_SECTION
- *Infanterie trägt den Schwerpunkt.*

### Erbsäbel
`dc_np_rothain_erbsaebel` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +1 ATK.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Mehr Tradition als Waffe – und trotzdem scharf.*

### Regimentsabzeichen
`dc_np_rothain_regimentsabzeichen` · Ausrüstung · Bronze · 1 AP

- Kurztext: Wird der Träger zerstört, ziehst du 1 Karte. Träger +1 DEF.
- Wird der Träger zerstört, ziehst du 1 Karte.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: ON_DESTROY_DRAW, EQUIP_STAT
- *Wer fällt, wird ersetzt.*

### Stabskarte Erbe
`dc_np_rothain_stabskarte_erbe` · Ausrüstung · Bronze · 1 AP

- Kurztext: Erster Angriff des Trägers: +2 ATK.
- Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +2 ATK. Danach entfällt der Bonus.
- Effektcodes: CARRIER_FIRST_ATTACK_ATK
- *Der alte Plan wirkt beim ersten Schlag.*

### Ablösungsgurt
`dc_np_rothain_abloesungsgurt` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +2 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Hält bis zur Ablösung.*

### Schwerpunktoptik
`dc_np_rothain_schwerpunktoptik` · Ausrüstung · undefined · 1 AP

- Kurztext: Angriffe des Trägers: +1 Schaden.
- Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.
- Effektcodes: EQUIP_ON_ATTACK_DAMAGE
- *Sieht nur den Punkt.*

### Kronstraßenpanzerung
`dc_np_rothain_kronstrassenpanzerung` · Ausrüstung · undefined · 2 AP

- **Erstschadenschutz** (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Kurztext: Träger +2 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Panzer). Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.
- Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Effektcodes: EQUIP_STAT, EQUIP_IGNORE_FIRST_DAMAGE
- *Alte Platten, neu genietet.*

## Sahr (40 neue Karten)

### Flussläufer
`dc_np_sahr_flusslaeufer` · Einheit · Bronze · 1 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Bewegung ist die Schlacht.*

### Linienzug Sahr
`dc_np_sahr_linienzug_sahr` · Einheit · Bronze · 2 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Bindet den Feind an der Linie.*

### Umgehungstrupp
`dc_np_sahr_umgehungstrupp` · Einheit · undefined · 2 AP

- **Platztausch** (Wird die Einheit aufgedeckt, darfst du sie mit einer anderen eigenen verdeckten Einheit tauschen. Der Tausch gilt nicht als neuer Einsatz (kein neues Eingraben). Der Gegner erfährt nicht den Namen der anderen Karte, nur dass getauscht wurde bzw. die Wahl existiert.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: RELOCATE_HIDE
- *Kommt von dort, wo niemand wartet.*

### Handelsfrontmiliz
`dc_np_sahr_handelsfrontmiliz` · Einheit · Bronze · 2 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)

- Effektcodes: –
- *Verteidigt die Handelswege.*

### Flankenstoß-Kompanie
`dc_np_sahr_flankenstoss_kompanie` · Einheit · undefined · 3 AP

- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)
- Kurztext: Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.
- Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.
- Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden.
- Effektcodes: AMBUSH
- *Trifft die offene Flanke.*

### Routenwache
`dc_np_sahr_routenwache` · Einheit · Bronze · 2 AP

- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)

- Effektcodes: –
- *Hält die Route offen.*

### Flusskette
`dc_np_sahr_flusskette` · Einheit · Bronze · 3 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)

- Effektcodes: –
- *Fährt am Ufer entlang.*

### Umgehungspanzer
`dc_np_sahr_umgehungspanzer` · Einheit · undefined · 4 AP

- **Hinterhalt** (Hat +2 ATK bei ihrem ersten Angriff nach dem Aufdecken.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: RELOCATE_HIDE
- *Taucht hinter der Linie auf.*

### Kolonne ohne Ende
`dc_np_sahr_kolonne_ohne_ende` · Einheit · Gold · 5 AP

- **Zähigkeit** (Hat +1 DEF für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)
- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)
- Kurztext: +2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.
- Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FUEHRUNG_V
- *Sie hört nie auf.*

### Handelswagen
`dc_np_sahr_handelswagen` · Einheit · Bronze · 3 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)

- Effektcodes: –
- *Gepanzert für die Route.*

### Uferkeil
`dc_np_sahr_uferkeil` · Einheit · Bronze · 4 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)

- Effektcodes: –
- *Schneidet den Fluss.*

### Linienfeuer
`dc_np_sahr_linienfeuer` · Einheit · Bronze · 3 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Bindet die Linie.*

### Flussmörser
`dc_np_sahr_flussmoerser` · Einheit · Bronze · 2 AP

- **Hinterhalt** (Hat +2 ATK bei ihrem ersten Angriff nach dem Aufdecken.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Kurztext: Steilfeuer I.
- Steilfeuer I.
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: RELOCATE_HIDE
- *Vom Boot aus.*

### Routenbatterie
`dc_np_sahr_routenbatterie` · Einheit · Bronze · 3 AP

- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Öffnet Wege.*

### Batterie der weiten Wege
`dc_np_sahr_batterie_der_weiten_wege` · Einheit · Gold · 5 AP

- Kurztext: Steilfeuer IV: ganze Front.
- Steilfeuer IV: ganze Front.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: ATTACK_ANY_FRONT
- *Trifft das Depot hinter der Linie.*

### Wegschließer
`dc_np_sahr_wegschliesser` · Einheit · undefined · 4 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Schließt den Weg des Gegners.*

### Navigator
`dc_np_sahr_navigator` · Einheit · Bronze · 1 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Findet die nächste Route.*

### Flusskundschafter
`dc_np_sahr_flusskundschafter` · Einheit · Bronze · 2 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Liest den Fluss.*

### Routenspäher
`dc_np_sahr_routenspaeher` · Einheit · undefined · 2 AP

- **Hinterhalt** (Hat +2 ATK bei ihrem ersten Angriff nach dem Aufdecken.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: AUFKLAERUNG, RELOCATE_HIDE
- *Sieht den Weg, bevor der Feind ihn sieht.*

### Herr der Routen
`dc_np_sahr_herr_der_routen` · Einheit · Gold · 5 AP

- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)
- Kurztext: Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.
- Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.
- Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden.
- Effektcodes: AMBUSH
- *Wer die Bewegung kontrolliert, kontrolliert das Land.*

### Flankenmeister
`dc_np_sahr_flankenmeister` · Einheit · undefined · 4 AP

- **Hinterhalt** (Hat +2 ATK bei ihrem ersten Angriff nach dem Aufdecken.)
- **Sicherung** (Andere eigene Einheiten im selben Abschnitt haben +1 DEF, solange diese Einheit offen liegt.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: RELOCATE_HIDE
- *Erscheint immer an der Flanke.*

### Gilde der Routen
`dc_np_sahr_gilde_der_routen` · Unterstützung · Gold · 4 AP

- Kurztext: Zu Beginn deines Zuges: +1 AP.
- Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt.
- Effektcodes: TURN_AP
- *Der Handel finanziert den Fluss.*

### Routennetz
`dc_np_sahr_routennetz` · Unterstützung · undefined · 3 AP

- Kurztext: Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Effektcodes: TURN_DRAW
- *Fällt eine Route, kommt die nächste.*

### Flusssperre
`dc_np_sahr_flusssperre` · Unterstützung · undefined · 3 AP

- Kurztext: Gegnerische Fronteinheiten −1 ATK.
- Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).
- Effektcodes: AURA_ENEMY_ATK
- *Der Feind kämpft gegen den Strom.*

### Seitenweg
`dc_np_sahr_seitenweg` · Soforteinsatz · undefined · 2 AP

- Kurztext: Eine eigene Fronteinheit darf in diesem Zug erneut angreifen.
- Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten).
- Effektcodes: EXTRA_ATTACK
- *Noch ein Weg.*

### Linie binden
`dc_np_sahr_linie_binden` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 DEF dauerhaft.
- Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +1 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.
- Effektcodes: BUFF_SECTION
- *Die Linie hält den Fluss.*

### Stoß von der Seite
`dc_np_sahr_stoss_von_der_seite` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Eine eigene Fronteinheit: +2 ATK bis Zugende.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges.
- Effektcodes: BUFF
- *Von der Seite.*

### Neue Route
`dc_np_sahr_neue_route` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 1 Karte.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DRAW
- *Es gibt immer einen Weg.*

### Strömung nutzen
`dc_np_sahr_stroemung_nutzen` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 2, dann wirf deine älteste Handkarte ab.
- Ziehe 2 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.
- Effektcodes: DRAW_DISCARD
- *Mit dem Fluss, nicht gegen ihn.*

### Wegschnitt
`dc_np_sahr_wegschnitt` · Soforteinsatz · undefined · 2 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 2 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Der Weg des Feindes endet hier.*

### Fluss überqueren
`dc_np_sahr_fluss_ueberqueren` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 ATK bis Zugende.
- Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Einheit dort hat bis zum Ende dieses Zuges +1 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung).
- Effektcodes: BUFF_SECTION
- *Alle zugleich über den Fluss.*

### Uferversorgung
`dc_np_sahr_uferversorgung` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Heile 2 DEF an einer eigenen Fronteinheit.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.
- Effektcodes: HEAL
- *Wasser heilt.*

### Handelsrabatt
`dc_np_sahr_handelsrabatt` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Ziehe 1 Karte.
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: COST_NEXT, DRAW
- *Gute Geschäfte.*

### Die große Umgehung
`dc_np_sahr_die_grosse_umgehung` · Soforteinsatz · Gold · 3 AP

- Kurztext: Eine eigene Fronteinheit darf in diesem Zug erneut angreifen. Eine eigene Fronteinheit: +2 ATK bis Zugende.
- Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten).
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges.
- Effektcodes: EXTRA_ATTACK, BUFF
- *Hinter der Linie, mitten ins Herz.*

### Flussmantel
`dc_np_sahr_flussmantel` · Ausrüstung · Bronze · 1 AP

- **Erstschadenschutz** (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.
- Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Effektcodes: EQUIP_IGNORE_FIRST_DAMAGE
- *Nass, aber unsichtbar.*

### Routenkarte
`dc_np_sahr_routenkarte` · Ausrüstung · Bronze · 1 AP

- Kurztext: Erster Angriff des Trägers: +2 ATK.
- Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +2 ATK. Danach entfällt der Bonus.
- Effektcodes: CARRIER_FIRST_ATTACK_ATK
- *Der erste Schlag über unbekannte Wege.*

### Leichtes Gepäck
`dc_np_sahr_leichtes_gepaeck` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +1 ATK.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Schnell ist sicher.*

### Handelsschild
`dc_np_sahr_handelsschild` · Ausrüstung · undefined · 1 AP

- Kurztext: Träger +2 DEF. Wird der Träger zerstört, ziehst du 1 Karte.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Wird der Träger zerstört, ziehst du 1 Karte.
- Effektcodes: EQUIP_STAT, ON_DESTROY_DRAW
- *Bezahlt von der Gilde.*

### Flankenklinge
`dc_np_sahr_flankenklinge` · Ausrüstung · Bronze · 1 AP

- Kurztext: Angriffe des Trägers: +1 Schaden.
- Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.
- Effektcodes: EQUIP_ON_ATTACK_DAMAGE
- *Für die offene Seite.*

### Ruderpanzer
`dc_np_sahr_ruderpanzer` · Ausrüstung · undefined · 2 AP

- Kurztext: Träger +2 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Panzer). Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Schwimmfähig und gepanzert.*

## Averon (40 neue Karten)

### Netztrupp Novaris
`dc_np_averon_netztrupp_novaris` · Einheit · Bronze · 2 AP

- **Gefechtsbereit** (Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.)

- Effektcodes: –
- *Verbunden, also handlungsfähig.*

### Eigeninitiative-Zug
`dc_np_averon_eigeninitiative_zug` · Einheit · Bronze · 1 AP

- **Abschirmung** (Einmal pro Zug darfst du 1 Schaden, den eine benachbarte eigene Einheit erleiden würde, auf diese Einheit umleiten.)

- Effektcodes: –
- *Kein Befehl nötig, solange das Netz hält.*

### Sensorschützen
`dc_np_averon_sensorschuetzen` · Einheit · Bronze · 2 AP

- Kurztext: Angriffe gegen ungepanzerte Ziele: +1 Schaden.
- Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: FEUERUEBERLEGENHEIT
- *Sehen den Gegner, bevor er schießt.*

### Verbindungskompanie
`dc_np_averon_verbindungskompanie` · Einheit · undefined · 3 AP

- Kurztext: Benachbarte eigene Infanterie +1 DEF.
- Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: MECH_AURA
- *Hält die Linie zum Netz.*

### Schnelle Hand
`dc_np_averon_schnelle_hand` · Einheit · undefined · 2 AP

- **Platztausch** (Wird die Einheit aufgedeckt, darfst du sie mit einer anderen eigenen verdeckten Einheit tauschen. Der Tausch gilt nicht als neuer Einsatz (kein neues Eingraben). Der Gegner erfährt nicht den Namen der anderen Karte, nur dass getauscht wurde bzw. die Wahl existiert.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: RELOCATE_HIDE
- *Kurz zuschlagen, dann weg.*

### Bürgerwehr Averon
`dc_np_averon_buergerwehr_averon` · Einheit · Bronze · 1 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Die junge Republik verteidigt sich selbst.*

### Novaris-Kolonne
`dc_np_averon_novaris_kolonne` · Einheit · Gold · 5 AP

- **Gefechtsbereit** (Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.)
- Kurztext: +2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.
- Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FUEHRUNG_V
- *Antwort- und Verbindungsformation.*

### Leichter Netzwagen
`dc_np_averon_leichter_netzwagen` · Einheit · Bronze · 3 AP

- **Überlast** (Hat +2 ATK und +1 DEF. Am Ende jedes deiner Züge erleidet sie 1 Schaden, der nicht verhindert werden kann (nicht durch Eingraben oder Schadensreduktion).)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: RELOCATE_HIDE
- *Schnell rein, schnell raus.*

### Funkpanzer
`dc_np_averon_funkpanzer` · Einheit · Bronze · 3 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)

- Effektcodes: –
- *Mehr Antennen als Panzerung.*

### Zeitkeil
`dc_np_averon_zeitkeil` · Einheit · undefined · 4 AP

- **Gefechtsbereit** (Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.)

- Effektcodes: –
- *Nicht stehenbleiben, wenn die Lage alt wird.*

### Aufklärungsspähwagen
`dc_np_averon_aufklaerungsspaehwagen` · Einheit · Bronze · 3 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Angriffe gegen gepanzerte Ziele: +1 Schaden.
- Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: IGNORE_DEF
- *Sucht Panzer, bevor sie suchen.*

### Lokalisierungsbatterie
`dc_np_averon_lokalisierungsbatterie` · Einheit · Bronze · 3 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Erst geortet, dann getroffen.*

### Schnellfeuerwerfer
`dc_np_averon_schnellfeuerwerfer` · Einheit · Bronze · 3 AP

- **Platztausch** (Wird die Einheit aufgedeckt, darfst du sie mit einer anderen eigenen verdeckten Einheit tauschen. Der Tausch gilt nicht als neuer Einsatz (kein neues Eingraben). Der Gegner erfährt nicht den Namen der anderen Karte, nur dass getauscht wurde bzw. die Wahl existiert.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Kurztext: Steilfeuer III.
- Steilfeuer III.
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: RELOCATE_HIDE
- *Feuern und Stellungswechsel.*

### Netzmörser
`dc_np_averon_netzmoerser` · Einheit · Bronze · 2 AP

- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)
- Kurztext: Steilfeuer I.
- Steilfeuer I.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Feuer auf Koordinaten aus dem Netz.*

### Präzisionsrakete Zeit
`dc_np_averon_praezisionsrakete_zeit` · Einheit · undefined · 4 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Steilfeuer III.
- Steilfeuer III.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Trifft Depots, bevor sie liefern.*

### Frühwarnbatterie
`dc_np_averon_fruehwarnbatterie` · Einheit · Bronze · 3 AP

- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Feuert auf die erste Bewegung.*

### Sensordrohne
`dc_np_averon_sensordrohne` · Einheit · Bronze · 1 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Fliegt voraus, meldet alles.*

### Lauschposten
`dc_np_averon_lauschposten` · Einheit · Bronze · 2 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.
- Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie.
- Effektcodes: HAND_PEEK
- *Was gesagt wird, wird gehört.*

### Frühwarntrupp
`dc_np_averon_fruehwarntrupp` · Einheit · undefined · 2 AP

- **Hinterhalt** (Hat +2 ATK bei ihrem ersten Angriff nach dem Aufdecken.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: AUFKLAERUNG, RELOCATE_HIDE
- *Sieht zuerst, wird zuletzt gesehen.*

### Republikanische Antwort
`dc_np_averon_republikanische_antwort` · Einheit · Gold · 5 AP

- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)
- **Erbitterung** (Hat +1 ATK für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Wer zuerst weiß, schlägt zuerst.*

### Netzkommando
`dc_np_averon_netzkommando` · Einheit · undefined · 4 AP

- **Erbitterung** (Hat +1 ATK für jede eigene Einheit, die in dieser Partie zerstört wurde, höchstens +3.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: RELOCATE_HIDE
- *Operiert ohne Signatur.*

### Gebundene Verbindung
`dc_np_averon_gebundene_verbindung` · Unterstützung · Gold · 4 AP

- Kurztext: Zu Beginn deines Zuges: +1 AP.
- Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt.
- Effektcodes: TURN_AP
- *Solange das Netz hält, gibt es Zeit.*

### Sensorkette
`dc_np_averon_sensorkette` · Unterstützung · undefined · 3 AP

- Kurztext: Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Effektcodes: TURN_DRAW
- *Ein Strom aus Lagebildern.*

### Frühwarnnetz
`dc_np_averon_fruehwarnnetz` · Unterstützung · undefined · 3 AP

- Kurztext: Gegnerische Fronteinheiten −1 ATK.
- Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).
- Effektcodes: AURA_ENEMY_ATK
- *Der Gegner greift an, was längst weg ist.*

### Erstschlag nach Ortung
`dc_np_averon_erstschlag_nach_ortung` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet. Ziehe 1 Karte.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: MARK_OBSERVED, DRAW
- *Erst sehen, dann schlagen.*

### Kurzer Schlag
`dc_np_averon_kurzer_schlag` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 2 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Rein, treffen, raus.*

### Lagebild aktualisieren
`dc_np_averon_lagebild_aktualisieren` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 1 Karte.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DRAW
- *Die Lage ist nie alt, wenn man schnell ist.*

### Zeitgewinn
`dc_np_averon_zeitgewinn` · Soforteinsatz · undefined · 2 AP

- Kurztext: Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Ziehe 1 Karte.
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: COST_NEXT, DRAW
- *Jede gesparte Minute ist ein Zug.*

### Initiative ergreifen
`dc_np_averon_initiative_ergreifen` · Soforteinsatz · undefined · 2 AP

- Kurztext: Eine eigene Fronteinheit darf in diesem Zug erneut angreifen.
- Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten).
- Effektcodes: EXTRA_ATTACK
- *Wer zögert, verliert das Fenster.*

### Ortung
`dc_np_averon_ortung` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: MARK_OBSERVED
- *Signatur erfasst.*

### Netzimpuls
`dc_np_averon_netzimpuls` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 ATK bis Zugende.
- Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Einheit dort hat bis zum Ende dieses Zuges +1 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung).
- Effektcodes: BUFF_SECTION
- *Alle wissen gleichzeitig, was zu tun ist.*

### Schnelle Verlegung
`dc_np_averon_schnelle_verlegung` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF dauerhaft.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 ATK bis zum Ende dieses Zuges. Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF.
- Effektcodes: BUFF
- *Ankommen, bevor der Gegner zielt.*

### Datenflut
`dc_np_averon_datenflut` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Ziehe 3, dann wirf deine älteste Handkarte ab.
- Ziehe 3 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.
- Effektcodes: DRAW_DISCARD
- *Zu viel Lage ist besser als zu wenig.*

### Lokalisierter Großschlag
`dc_np_averon_lokalisierter_grossschlag` · Soforteinsatz · Gold · 4 AP

- Kurztext: Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet. Füge einer gegnerischen Fronteinheit 3 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 3 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: MARK_OBSERVED, DEAL_DAMAGE
- *Gefunden heißt getroffen.*

### Funkgerät Novaris
`dc_np_averon_funkgeraet_novaris` · Ausrüstung · Bronze · 1 AP

- Kurztext: Wird der Träger zerstört, ziehst du 1 Karte. Träger +1 DEF.
- Wird der Träger zerstört, ziehst du 1 Karte.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: ON_DESTROY_DRAW, EQUIP_STAT
- *Die letzte Meldung kommt immer an.*

### Sensorhelm
`dc_np_averon_sensorhelm` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +1 DEF. Erster Angriff des Trägers: +1 ATK.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +1 ATK. Danach entfällt der Bonus.
- Effektcodes: EQUIP_STAT, CARRIER_FIRST_ATTACK_ATK
- *Sieht den ersten Gegner zuerst.*

### Leichtweste
`dc_np_averon_leichtweste` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +2 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Leicht, damit man schnell bleibt.*

### Zielmarker
`dc_np_averon_zielmarker` · Ausrüstung · undefined · 1 AP

- Kurztext: Angriffe des Trägers: +1 Schaden.
- Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.
- Effektcodes: EQUIP_ON_ATTACK_DAMAGE
- *Markiert für das Netz.*

### Tarnnetz Averon
`dc_np_averon_tarnnetz_averon` · Ausrüstung · Bronze · 1 AP

- **Erstschadenschutz** (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.
- Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Effektcodes: EQUIP_IGNORE_FIRST_DAMAGE
- *Der erste Treffer geht daneben.*

### Schnellfeuergewehr
`dc_np_averon_schnellfeuergewehr` · Ausrüstung · undefined · 1 AP

- Kurztext: Träger +1 ATK. Erster Angriff des Trägers: +1 ATK.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +1 ATK. Danach entfällt der Bonus.
- Effektcodes: EQUIP_STAT, CARRIER_FIRST_ATTACK_ATK
- *Kurz, schnell, präzise.*

## Vesper (40 neue Karten)

### Scheinkompanie
`dc_np_vesper_scheinkompanie` · Einheit · Bronze · 1 AP

- **Platztausch** (Wird die Einheit aufgedeckt, darfst du sie mit einer anderen eigenen verdeckten Einheit tauschen. Der Tausch gilt nicht als neuer Einsatz (kein neues Eingraben). Der Gegner erfährt nicht den Namen der anderen Karte, nur dass getauscht wurde bzw. die Wahl existiert.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: RELOCATE_HIDE
- *Sie ist da – oder auch nicht.*

### Systemtreue Linie
`dc_np_vesper_systemtreue_linie` · Einheit · Bronze · 2 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Das System spielt mit allen.*

### Desinformanten
`dc_np_vesper_desinformanten` · Einheit · undefined · 2 AP

- Kurztext: Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.
- Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie.
- Effektcodes: HAND_PEEK
- *Wer zuhört, wird belogen.*

### Hinterhaltszug Velis
`dc_np_vesper_hinterhaltszug_velis` · Einheit · Bronze · 2 AP

- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)
- Kurztext: Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.
- Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.
- Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden.
- Effektcodes: AMBUSH
- *Das Gelände lügt für uns.*

### Abriegelungstrupp
`dc_np_vesper_abriegelungstrupp` · Einheit · undefined · 3 AP

- **Gefechtsbereit** (Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.)
- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Schließt Räume, nicht nur Lücken.*

### Unsichtbare Wache
`dc_np_vesper_unsichtbare_wache` · Einheit · Bronze · 2 AP

- **Hinterhalt** (Hat +2 ATK bei ihrem ersten Angriff nach dem Aufdecken.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: RELOCATE_HIDE
- *Nie dort, wo man sucht.*

### Velis-Kolonne
`dc_np_vesper_velis_kolonne` · Einheit · Gold · 5 AP

- **Platztausch** (Wird die Einheit aufgedeckt, darfst du sie mit einer anderen eigenen verdeckten Einheit tauschen. Der Tausch gilt nicht als neuer Einsatz (kein neues Eingraben). Der Gegner erfährt nicht den Namen der anderen Karte, nur dass getauscht wurde bzw. die Wahl existiert.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: RELOCATE_HIDE
- *Taucht auf, schlägt zu, verschwindet.*

### Attrappenwagen
`dc_np_vesper_attrappenwagen` · Einheit · Bronze · 2 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)

- Effektcodes: –
- *Aus Holz – vielleicht.*

### Täuschungspanzer
`dc_np_vesper_taeuschungspanzer` · Einheit · Bronze · 3 AP

- **Hinterhalt** (Hat +2 ATK bei ihrem ersten Angriff nach dem Aufdecken.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: RELOCATE_HIDE
- *Ein Panzer, der nie da war.*

### Riegelwagen
`dc_np_vesper_riegelwagen` · Einheit · undefined · 4 AP

- **Abschirmung** (Einmal pro Zug darfst du 1 Schaden, den eine benachbarte eigene Einheit erleiden würde, auf diese Einheit umleiten.)
- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Riegelt die echte Achse ab.*

### Schattenkeil
`dc_np_vesper_schattenkeil` · Einheit · Bronze · 4 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.
- Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.
- Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden.
- Effektcodes: AMBUSH
- *Kommt aus dem toten Winkel.*

### Abriegelungsbatterie
`dc_np_vesper_abriegelungsbatterie` · Einheit · Bronze · 3 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Feuer, das Räume schließt.*

### Scheinfeuerstellung
`dc_np_vesper_scheinfeuerstellung` · Einheit · Bronze · 3 AP

- **Hinterhalt** (Hat +2 ATK bei ihrem ersten Angriff nach dem Aufdecken.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: RELOCATE_HIDE
- *Feuert, zieht um, feuert wieder.*

### Systemmörser
`dc_np_vesper_systemmoerser` · Einheit · Bronze · 2 AP

- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)
- Kurztext: Steilfeuer I.
- Steilfeuer I.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Teil eines größeren Plans.*

### Riegelfeuer
`dc_np_vesper_riegelfeuer` · Einheit · undefined · 4 AP

- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Schließt auch die Depots.*

### Systemantwort
`dc_np_vesper_systemantwort` · Einheit · Gold · 5 AP

- **Platztausch** (Wird die Einheit aufgedeckt, darfst du sie mit einer anderen eigenen verdeckten Einheit tauschen. Der Tausch gilt nicht als neuer Einsatz (kein neues Eingraben). Der Gegner erfährt nicht den Namen der anderen Karte, nur dass getauscht wurde bzw. die Wahl existiert.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Kurztext: Steilfeuer IV: ganze Front.
- Steilfeuer IV: ganze Front.
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: ATTACK_ANY_FRONT, RELOCATE_HIDE
- *Wenn die Partie kippt, antwortet das System.*

### Überwachungsposten
`dc_np_vesper_ueberwachungsposten` · Einheit · Bronze · 1 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Beobachtet nach innen und außen.*

### Doppelagent
`dc_np_vesper_doppelagent` · Einheit · undefined · 2 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.
- Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie.
- Effektcodes: HAND_PEEK
- *Arbeitet für beide – sagt er.*

### Schattenmelder
`dc_np_vesper_schattenmelder` · Einheit · Bronze · 2 AP

- **Platztausch** (Wird die Einheit aufgedeckt, darfst du sie mit einer anderen eigenen verdeckten Einheit tauschen. Der Tausch gilt nicht als neuer Einsatz (kein neues Eingraben). Der Gegner erfährt nicht den Namen der anderen Karte, nur dass getauscht wurde bzw. die Wahl existiert.)
- **Absetzen** (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.
- Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.
- Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)
- Effektcodes: AUFKLAERUNG, RELOCATE_HIDE
- *Meldet und verschwindet.*

### Spielmeister
`dc_np_vesper_spielmeister` · Einheit · Gold · 5 AP

- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)
- Kurztext: Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.
- Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie.
- Effektcodes: HAND_PEEK
- *Kennt die Züge aller Spieler.*

### Operationsleitung Vesper
`dc_np_vesper_operationsleitung_vesper` · Einheit · undefined · 4 AP

- Kurztext: Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.
- Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.
- Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden.
- Effektcodes: AMBUSH
- *Plant den Hinterhalt im Hinterhalt.*

### Desinformationsnetz
`dc_np_vesper_desinformationsnetz` · Unterstützung · undefined · 3 AP

- Kurztext: Gegnerische Fronteinheiten −1 ATK.
- Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).
- Effektcodes: AURA_ENEMY_ATK
- *Der Gegner kämpft gegen Schatten.*

### Systemarchiv
`dc_np_vesper_systemarchiv` · Unterstützung · undefined · 3 AP

- Kurztext: Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Effektcodes: TURN_DRAW
- *Alles wird gespeichert, alles wird genutzt.*

### Das Spiel des Systems
`dc_np_vesper_das_spiel_des_systems` · Unterstützung · Gold · 5 AP

- Kurztext: Gegnerische Fronteinheiten −1 ATK. Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Effektcodes: AURA_ENEMY_ATK, TURN_DRAW
- *Niemand führt, alle spielen.*

### Gefütterter Köder
`dc_np_vesper_gefuetterter_koeder` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 DEF dauerhaft.
- Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +1 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.
- Effektcodes: BUFF_SECTION
- *Hier sieht es stark aus.*

### Falsche Meldung
`dc_np_vesper_falsche_meldung` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 2, dann wirf deine älteste Handkarte ab.
- Ziehe 2 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.
- Effektcodes: DRAW_DISCARD
- *Eine Wahrheit, eine Lüge.*

### Raum schließen
`dc_np_vesper_raum_schliessen` · Soforteinsatz · undefined · 2 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 2 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Der Raum wird geschlossen.*

### Enttarnung
`dc_np_vesper_enttarnung` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: MARK_OBSERVED
- *Das System sieht dich.*

### Zug im Spiel
`dc_np_vesper_zug_im_spiel` · Soforteinsatz · undefined · 2 AP

- Kurztext: Eine eigene Fronteinheit darf in diesem Zug erneut angreifen.
- Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten).
- Effektcodes: EXTRA_ATTACK
- *Noch ein Zug, den niemand sah.*

### Schattenoperation
`dc_np_vesper_schattenoperation` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Eine eigene Fronteinheit: +2 ATK bis Zugende.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges.
- Effektcodes: BUFF
- *Aus dem Nichts.*

### Systemzugriff
`dc_np_vesper_systemzugriff` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Ziehe 2 Karten.
- Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DRAW
- *Das Archiv öffnet sich.*

### Verdeckter Rabatt
`dc_np_vesper_verdeckter_rabatt` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Ziehe 1 Karte.
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: COST_NEXT, DRAW
- *Die Rechnung zahlt jemand anders.*

### Doppeltes Spiel
`dc_np_vesper_doppeltes_spiel` · Soforteinsatz · undefined · 2 AP

- Kurztext: Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet. Füge einer gegnerischen Fronteinheit 1 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 1 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: MARK_OBSERVED, DEAL_DAMAGE
- *Erst entlarven, dann bestrafen.*

### Der große Bluff
`dc_np_vesper_der_grosse_bluff` · Soforteinsatz · Gold · 3 AP

- Kurztext: Ziehe 4, dann wirf deine älteste Handkarte ab.
- Ziehe 4 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.
- Effektcodes: DRAW_DISCARD
- *Alle Karten auf dem Tisch – fast.*

### Tarnanzug Velis
`dc_np_vesper_tarnanzug_velis` · Ausrüstung · Bronze · 1 AP

- **Erstschadenschutz** (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.
- Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Effektcodes: EQUIP_IGNORE_FIRST_DAMAGE
- *Der erste Schuss trifft den Schatten.*

### Falsche Papiere
`dc_np_vesper_falsche_papiere` · Ausrüstung · Bronze · 1 AP

- Kurztext: Wird der Träger zerstört, ziehst du 1 Karte.
- Wird der Träger zerstört, ziehst du 1 Karte.
- Effektcodes: ON_DESTROY_DRAW
- *Wer fällt, nimmt das Geheimnis nicht mit.*

### Störsender
`dc_np_vesper_stoersender` · Ausrüstung · undefined · 1 AP

- Kurztext: Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 2 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.
- Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 2 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.
- Effektcodes: EQUIP_NEGATE_DAMAGE
- *Zielerfassung gestört.*

### Schalldämpfer
`dc_np_vesper_schalldaempfer` · Ausrüstung · Bronze · 1 AP

- Kurztext: Erster Angriff des Trägers: +2 ATK.
- Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +2 ATK. Danach entfällt der Bonus.
- Effektcodes: CARRIER_FIRST_ATTACK_ATK
- *Der erste Schuss bleibt ungehört.*

### Systemausweis
`dc_np_vesper_systemausweis` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +2 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Zugang zu allen Ebenen.*

### Hinterhaltsmesser
`dc_np_vesper_hinterhaltsmesser` · Ausrüstung · undefined · 1 AP

- Kurztext: Angriffe des Trägers: +1 Schaden.
- Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.
- Effektcodes: EQUIP_ON_ATTACK_DAMAGE
- *Leise und endgültig.*

## Dargan (40 neue Karten)

### Kaderzug
`dc_np_dargan_kaderzug` · Einheit · Bronze · 2 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Führt die aufgerufene Pflicht.*

### Schuldner-Kompanie
`dc_np_dargan_schuldner_kompanie` · Einheit · Bronze · 1 AP

- **Heranführung** (Wenn diese Einheit ins Spiel kommt, kostet die nächste Einheit, die du in diesem Zug ausspielst, 1 AP weniger (mindestens 1).)

- Effektcodes: –
- *Tilgt mit Blut.*

### Haftende Häuser
`dc_np_dargan_haftende_haeuser` · Einheit · undefined · 3 AP

- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Jedes Haus haftet für das nächste.*

### Zeilenvollstrecker
`dc_np_dargan_zeilenvollstrecker` · Einheit · Bronze · 2 AP

- Kurztext: Angriffe gegen Infanterie: +2 Schaden.
- Greift diese Einheit eine Infanterie an, verursacht sie 2 Schaden zusätzlich zu ihrem ATK. Der Gegenschlag des Ziels bleibt unverändert.
- Effektcodes: VS_INF
- *Trägt die Zeile ans Ziel.*

### Registerwache
`dc_np_dargan_registerwache` · Einheit · Bronze · 2 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)

- Effektcodes: –
- *Schützt das Buch.*

### Vollstrecker
`dc_np_dargan_vollstrecker` · Einheit · undefined · 3 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)
- Kurztext: Angriffe gegen ungepanzerte Ziele: +1 Schaden.
- Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: FEUERUEBERLEGENHEIT
- *Bringt zu Ende, was begonnen wurde.*

### Haftungsstoß
`dc_np_dargan_haftungsstoss` · Einheit · Bronze · 4 AP

- **Überlast** (Hat +2 ATK und +1 DEF. Am Ende jedes deiner Züge erleidet sie 1 Schaden, der nicht verhindert werden kann (nicht durch Eingraben oder Schadensreduktion).)

- Effektcodes: –
- *Selten, aber gewaltig.*

### Tilgungswagen
`dc_np_dargan_tilgungswagen` · Einheit · Bronze · 3 AP

- Kurztext: Angriffe gegen gepanzerte Ziele: +1 Schaden.
- Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: IGNORE_DEF
- *Tilgt Panzer.*

### Schuldbrecher
`dc_np_dargan_schuldbrecher` · Einheit · undefined · 4 AP

- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)
- Kurztext: Angriffe gegen gepanzerte Ziele: +2 Schaden.
- Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 2 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: IGNORE_DEF
- *Bricht jede Platte.*

### Kadersturm
`dc_np_dargan_kadersturm` · Einheit · Bronze · 3 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Für den Kader.*

### Buchkrieg
`dc_np_dargan_buchkrieg` · Einheit · Gold · 5 AP

- **Gefechtsbereit** (Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.)
- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)
- Kurztext: Angriffe gegen gepanzerte Ziele: +2 Schaden.
- Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 2 Schaden zusätzlich zu ihrem ATK.
- Effektcodes: IGNORE_DEF
- *Der Krieg steht im Buch.*

### Zielbatterie
`dc_np_dargan_zielbatterie` · Einheit · Bronze · 3 AP

- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Feuer ist Tilgung.*

### Registermörser
`dc_np_dargan_registermoerser` · Einheit · Bronze · 2 AP

- **Staffelangriff** (Hat +1 ATK, wenn in diesem Zug bereits eine andere eigene Einheit angegriffen hat.)
- Kurztext: Steilfeuer I.
- Steilfeuer I.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Jeder Schuss verbucht.*

### Abschlussfeuer
`dc_np_dargan_abschlussfeuer` · Einheit · undefined · 4 AP

- Kurztext: Steilfeuer II. Angriffe gegen ungepanzerte Ziele: +1 Schaden.
- Steilfeuer II.
- Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: FEUERUEBERLEGENHEIT
- *Schließt die Zeile.*

### Zinsbatterie
`dc_np_dargan_zinsbatterie` · Einheit · Bronze · 3 AP

- **Nachsetzen** (Hat +2 ATK gegen Ziele, die in diesem Zug bereits Schaden erlitten haben.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Feuert regelmäßig.*

### Gebundene Häuser
`dc_np_dargan_gebundene_haeuser` · Einheit · Gold · 5 AP

- **Fernschuss** (Hat +1 Reichweite (bei Steilfeuer nur Stufen I–III; IV/V bereits ganze Front).)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Alle Häuser feuern zusammen.*

### Buchprüfer
`dc_np_dargan_buchpruefer` · Einheit · Bronze · 1 AP

- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Wer haftet, welche Zeile offen ist.*

### Feldregistrator
`dc_np_dargan_feldregistrator` · Einheit · Bronze · 2 AP

- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Registerarbeit und Feldbeobachtung.*

### Schuldeneintreiber
`dc_np_dargan_schuldeneintreiber` · Einheit · undefined · 2 AP

- Kurztext: Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.
- Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie.
- Effektcodes: HAND_PEEK
- *Weiß, was der Gegner hat.*

### Kaderkolonne
`dc_np_dargan_kaderkolonne` · Einheit · Gold · 5 AP

- **Abschirmung** (Einmal pro Zug darfst du 1 Schaden, den eine benachbarte eigene Einheit erleiden würde, auf diese Einheit umleiten.)
- **Überlast** (Hat +2 ATK und +1 DEF. Am Ende jedes deiner Züge erleidet sie 1 Schaden, der nicht verhindert werden kann (nicht durch Eingraben oder Schadensreduktion).)
- Kurztext: Angriffe gegen Infanterie: +2 Schaden.
- Greift diese Einheit eine Infanterie an, verursacht sie 2 Schaden zusätzlich zu ihrem ATK. Der Gegenschlag des Ziels bleibt unverändert.
- Effektcodes: VS_INF
- *Die Pflicht ruft, der Kader folgt.*

### Hauptbuchhalter
`dc_np_dargan_hauptbuchhalter` · Einheit · undefined · 4 AP

- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Rechnet jeden Verlust nach.*

### Schuldregister
`dc_np_dargan_schuldregister` · Unterstützung · undefined · 3 AP

- Kurztext: Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Effektcodes: TURN_DRAW
- *Jeder Name steht im Buch.*

### Haftungskasse
`dc_np_dargan_haftungskasse` · Unterstützung · undefined · 3 AP

- Kurztext: Jeder Schaden an deinen Fronteinheiten −1.
- Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.
- Effektcodes: REDUCE_DAMAGE
- *Die Häuser zahlen.*

### Das Große Buch
`dc_np_dargan_das_grosse_buch` · Unterstützung · Gold · 5 AP

- Kurztext: Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert. Gegnerische Fronteinheiten −1 ATK.
- Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.
- Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).
- Effektcodes: TURN_DRAW, AURA_ENEMY_ATK
- *Was im Buch steht, wird getilgt.*

### Zeile setzen
`dc_np_dargan_zeile_setzen` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: MARK_OBSERVED
- *Der Name steht im Buch.*

### Markierter Schlag
`dc_np_dargan_markierter_schlag` · Soforteinsatz · undefined · 2 AP

- Kurztext: Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet. Füge einer gegnerischen Fronteinheit 2 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: MARK_OBSERVED, DEAL_DAMAGE
- *Markiert und getroffen.*

### Zeile schließen
`dc_np_dargan_zeile_schliessen` · Soforteinsatz · undefined · 2 AP

- Kurztext: Eine eigene Fronteinheit darf in diesem Zug erneut angreifen.
- Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten).
- Effektcodes: EXTRA_ATTACK
- *Zu Ende bringen.*

### Tilgung
`dc_np_dargan_tilgung` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 2 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Die Schuld wird beglichen.*

### Aufruf der Pflicht
`dc_np_dargan_aufruf_der_pflicht` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Eine eigene Fronteinheit: +2 ATK bis Zugende.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges.
- Effektcodes: BUFF
- *Der Name wird gerufen.*

### Registerprüfung
`dc_np_dargan_registerpruefung` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 1 Karte.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DRAW
- *Alles verbucht.*

### Haftung übernehmen
`dc_np_dargan_haftung_uebernehmen` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Heile 2 DEF an einer eigenen Fronteinheit.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.
- Effektcodes: HEAL
- *Das Haus zahlt.*

### Zinseszins
`dc_np_dargan_zinseszins` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 2, dann wirf deine älteste Handkarte ab.
- Ziehe 2 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.
- Effektcodes: DRAW_DISCARD
- *Die Schuld wächst.*

### Kader nachführen
`dc_np_dargan_kader_nachfuehren` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).
- Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.
- Effektcodes: COST_NEXT
- *Die nächste Zeile ist bereit.*

### Endabrechnung
`dc_np_dargan_endabrechnung` · Soforteinsatz · Gold · 4 AP

- Kurztext: Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet. Füge einer gegnerischen Fronteinheit 4 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 4 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: MARK_OBSERVED, DEAL_DAMAGE
- *Die letzte Zeile wird geschlossen.*

### Schuldmarke
`dc_np_dargan_schuldmarke` · Ausrüstung · Bronze · 1 AP

- Kurztext: Wird der Träger zerstört, ziehst du 1 Karte.
- Wird der Träger zerstört, ziehst du 1 Karte.
- Effektcodes: ON_DESTROY_DRAW
- *Die Schuld geht weiter.*

### Kaderabzeichen
`dc_np_dargan_kaderabzeichen` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +1 ATK und +1 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK und +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Für die aufgerufene Pflicht.*

### Vollstreckungsklinge
`dc_np_dargan_vollstreckungsklinge` · Ausrüstung · undefined · 1 AP

- Kurztext: Angriffe des Trägers: +1 Schaden.
- Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.
- Effektcodes: EQUIP_ON_ATTACK_DAMAGE
- *Tilgt sauber.*

### Registerpanzer
`dc_np_dargan_registerpanzer` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +2 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Gebunden in Leder und Stahl.*

### Buchungsstempel
`dc_np_dargan_buchungsstempel` · Ausrüstung · undefined · 1 AP

- Kurztext: Erster Angriff des Trägers: +2 ATK.
- Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +2 ATK. Danach entfällt der Bonus.
- Effektcodes: CARRIER_FIRST_ATTACK_ATK
- *Der erste Treffer ist gebucht.*

### Haftungsschild
`dc_np_dargan_haftungsschild` · Ausrüstung · Bronze · 1 AP

- **Erstschadenschutz** (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.
- Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Effektcodes: EQUIP_IGNORE_FIRST_DAMAGE
- *Das Haus fängt den ersten Schlag.*

## Eldran (40 neue Karten)

### Kronlinie
`dc_np_eldran_kronlinie` · Einheit · Bronze · 2 AP

- **Sicherung** (Andere eigene Einheiten im selben Abschnitt haben +1 DEF, solange diese Einheit offen liegt.)

- Effektcodes: –
- *Die Linie gehört dem König, nicht dem Gelände.*

### Pioniere der Grenzmark
`dc_np_eldran_pioniere_der_grenzmark` · Einheit · Bronze · 2 AP

- Kurztext: Benachbarte eigene Infanterie +1 DEF.
- Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: MECH_AURA
- *Erst die Sperre, dann das Lager.*

### Sperrzug Weißdorn
`dc_np_eldran_sperrzug_weissdorn` · Einheit · Bronze · 2 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Zwischen Dornen und Draht steht niemand allein.*

### Haushaltstruppe
`dc_np_eldran_haushaltstruppe` · Einheit · undefined · 3 AP

- **Sicherung** (Andere eigene Einheiten im selben Abschnitt haben +1 DEF, solange diese Einheit offen liegt.)
- Kurztext: Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.
- Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.
- Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden.
- Effektcodes: AMBUSH
- *Wartet, bis der Feind die Sperre berührt.*

### Gebundene Kompanie
`dc_np_eldran_gebundene_kompanie` · Einheit · undefined · 3 AP

- Kurztext: Keine Sonderfähigkeit.
- Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.
- Effektcodes: –
- *Gebunden an die Stellung, gebunden an den Eid.*

### Landsturm Kronfeld
`dc_np_eldran_landsturm_kronfeld` · Einheit · Bronze · 1 AP

- **Abschirmung** (Einmal pro Zug darfst du 1 Schaden, den eine benachbarte eigene Einheit erleiden würde, auf diese Einheit umleiten.)

- Effektcodes: –
- *Bauern, Erben, Wächter.*

### Gegenstoßreserve
`dc_np_eldran_gegenstossreserve` · Einheit · Bronze · 3 AP

- **Abschirmung** (Einmal pro Zug darfst du 1 Schaden, den eine benachbarte eigene Einheit erleiden würde, auf diese Einheit umleiten.)

- Effektcodes: –
- *Wartet hinter der Linie auf das Signal.*

### Kronwagen Wacht
`dc_np_eldran_kronwagen_wacht` · Einheit · Bronze · 3 AP

- **Abschirmung** (Einmal pro Zug darfst du 1 Schaden, den eine benachbarte eigene Einheit erleiden würde, auf diese Einheit umleiten.)
- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Schützt die Flanke der Sperrlinie.*

### Königliche Antwort
`dc_np_eldran_koenigliche_antwort` · Einheit · Gold · 5 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)

- Effektcodes: –
- *Die Krone schlägt zurück – einmal, aber richtig.*

### Bollwerkwagen
`dc_np_eldran_bollwerkwagen` · Einheit · undefined · 4 AP

- Kurztext: Jeder Schaden an dieser Einheit −2.
- Schwere Panzerung: Jeder einzelne Schaden, den diese Einheit erleidet (Kampf, Soforteinsatz, Effekt), wird um 2 verringert, mindestens auf 0.
- Effektcodes: SCHADEN_MINUS
- *Ein rollender Festungsturm.*

### Reservekette Erlen
`dc_np_eldran_reservekette_erlen` · Einheit · Bronze · 4 AP

- **Überlast** (Hat +2 ATK und +1 DEF. Am Ende jedes deiner Züge erleidet sie 1 Schaden, der nicht verhindert werden kann (nicht durch Eingraben oder Schadensreduktion).)

- Effektcodes: –
- *Erst zurückgehalten, dann geschickt.*

### Sperrfeuerbatterie
`dc_np_eldran_sperrfeuerbatterie` · Einheit · Bronze · 3 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Feuer, das Räume schließt.*

### Grenzhaubitze
`dc_np_eldran_grenzhaubitze` · Einheit · Bronze · 3 AP

- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Kennt jede Furt der Grenzmark.*

### Kronmörser
`dc_np_eldran_kronmoerser` · Einheit · Bronze · 2 AP

- Kurztext: Steilfeuer I.
- Steilfeuer I.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Kleine Granaten für große Tradition.*

### Burgfeuerstellung
`dc_np_eldran_burgfeuerstellung` · Einheit · undefined · 4 AP

- Kurztext: Steilfeuer II.
- Steilfeuer II.
- Die Einheit zählt für alle Regeln als Artillerie.
- Effektcodes: –
- *Aus den alten Mauern schießt es noch immer.*

### Kronarsenal
`dc_np_eldran_kronarsenal` · Einheit · Gold · 5 AP

- **Durchschlag** (Ignoriert 1 DEF des Ziels. Eingegrabene Ziele bleiben tabu (Eingraben schützt weiter vor gezielten Angriffen).)
- **Stellungswechsel** (Einmal in deinem Zug darfst du diese Einheit auf ein freies benachbartes Feld derselben Reihe versetzen. Danach greift sie in diesem Zug nicht an. Das Versetzen gilt nicht als neuer Einsatz.)
- Kurztext: Steilfeuer V: Front + Support (+2 AP).
- Steilfeuer V: Front + Support (+2 AP).
- Die Einheit zählt für alle Regeln als Artillerie.
- Supportzone-Angriff 3 AP; Front 1 AP.
- Effektcodes: ATTACK_ANY_FRONT, ATTACK_SUPPORT
- *Was die Krone hortete, kommt nun heraus.*

### Grenzreiter
`dc_np_eldran_grenzreiter` · Einheit · Bronze · 1 AP

- **Zuteilung** (Ziehe 1 Karte, wenn sie ins Spiel kommt.)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Reitet die bekannten Achsen ab.*

### Wachtturmposten
`dc_np_eldran_wachtturmposten` · Einheit · Bronze · 2 AP

- **Fernschuss** (Hat +1 Reichweite (bei Steilfeuer nur Stufen I–III; IV/V bereits ganze Front).)
- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Sieht weit, bewegt sich nicht.*

### Kundschafter der Krone
`dc_np_eldran_kundschafter_der_krone` · Einheit · undefined · 2 AP

- Kurztext: Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.
- Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.
- Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.
- Effektcodes: AUFKLAERUNG
- *Meldet nur dem Haus.*

### Garde der Kontinuität
`dc_np_eldran_garde_der_kontinuitaet` · Einheit · undefined · 4 AP

- **Überlast** (Hat +2 ATK und +1 DEF. Am Ende jedes deiner Züge erleidet sie 1 Schaden, der nicht verhindert werden kann (nicht durch Eingraben oder Schadensreduktion).)
- Kurztext: Benachbarte eigene Fronteinheiten +2 DEF.
- Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FLANK_DEF
- *Sie war vor dem Krieg da und wird danach da sein.*

### Marschall des Hauses
`dc_np_eldran_marschall_des_hauses` · Einheit · Gold · 5 AP

- **Sicherung** (Andere eigene Einheiten im selben Abschnitt haben +1 DEF, solange diese Einheit offen liegt.)
- Kurztext: +2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.
- Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).
- Effektcodes: FUEHRUNG_V
- *Führt von der Spitze der Reserve.*

### Sperrgürtel
`dc_np_eldran_sperrguertel` · Unterstützung · undefined · 3 AP

- Kurztext: Gegnerische Fronteinheiten −1 ATK.
- Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).
- Effektcodes: AURA_ENEMY_ATK
- *Wer durch die Sperre will, kommt geschwächt an.*

### Pionierdepot
`dc_np_eldran_pionierdepot` · Unterstützung · undefined · 3 AP

- Kurztext: Jeder Schaden an deinen Fronteinheiten −1.
- Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.
- Effektcodes: REDUCE_DAMAGE
- *Sandsäcke, Balken, Draht.*

### Gebundene Front
`dc_np_eldran_gebundene_front` · Unterstützung · Gold · 5 AP

- Kurztext: Jeder Schaden an deinen Fronteinheiten −1. Gegnerische Fronteinheiten −1 ATK.
- Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.
- Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).
- Effektcodes: REDUCE_DAMAGE, AURA_ENEMY_ATK
- *Die ganze Linie trägt den Eid.*

### Auffangstellung
`dc_np_eldran_auffangstellung` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 DEF dauerhaft.
- Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +1 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.
- Effektcodes: BUFF_SECTION
- *Der Stoß läuft ins Leere.*

### Königlicher Befehl
`dc_np_eldran_koeniglicher_befehl` · Soforteinsatz · undefined · 2 AP

- Kurztext: Eine eigene Fronteinheit darf in diesem Zug erneut angreifen.
- Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten).
- Effektcodes: EXTRA_ATTACK
- *Die Antwort kommt sofort.*

### Feldlazarett der Krone
`dc_np_eldran_feldlazarett_der_krone` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Heile 2 DEF an einer eigenen Fronteinheit.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.
- Effektcodes: HEAL
- *Die Krone vergisst ihre Soldaten nicht.*

### Halten und warten
`dc_np_eldran_halten_und_warten` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Eine eigene Fronteinheit: +2 DEF dauerhaft.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF.
- Effektcodes: BUFF
- *Geduld ist eine Waffe.*

### Gegenstoß aus der Reserve
`dc_np_eldran_gegenstoss_aus_der_reserve` · Soforteinsatz · undefined · 2 AP

- Kurztext: Eine eigene Fronteinheit: +2 ATK bis Zugende.
- Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges.
- Effektcodes: BUFF
- *Jetzt.*

### Mine im Weg
`dc_np_eldran_mine_im_weg` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Füge einer gegnerischen Fronteinheit 2 Schaden zu.
- Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.
- Effektcodes: DEAL_DAMAGE
- *Gelegt vor Jahren, gezündet heute.*

### Hofbericht
`dc_np_eldran_hofbericht` · Soforteinsatz · Bronze · 1 AP

- Kurztext: Ziehe 1 Karte.
- Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.
- Effektcodes: DRAW
- *Was der Hof weiß, weiß die Front.*

### Sperre verstärken
`dc_np_eldran_sperre_verstaerken` · Soforteinsatz · Bronze · 2 AP

- Kurztext: Wähle einen eigenen Abschnitt: deine Infanterie dort +2 DEF dauerhaft.
- Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Infanterie-Einheit, die jetzt dort steht, erhält +2 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.
- Effektcodes: BUFF_SECTION
- *Noch eine Reihe Draht.*

### Kronrat tagt
`dc_np_eldran_kronrat_tagt` · Soforteinsatz · undefined · 2 AP

- Kurztext: Ziehe 3, dann wirf deine älteste Handkarte ab.
- Ziehe 3 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.
- Effektcodes: DRAW_DISCARD
- *Viele Stimmen, eine Entscheidung.*

### Antwort der Krone
`dc_np_eldran_antwort_der_krone` · Soforteinsatz · Gold · 4 AP

- Kurztext: Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +2 ATK bis Zugende.
- Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Einheit dort hat bis zum Ende dieses Zuges +2 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung).
- Effektcodes: BUFF_SECTION
- *Die gesamte Reserve schlägt zu.*

### Kronhelm
`dc_np_eldran_kronhelm` · Ausrüstung · Bronze · 1 AP

- Kurztext: Träger +2 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Alt, schwer, verlässlich.*

### Pionierschaufel
`dc_np_eldran_pionierschaufel` · Ausrüstung · Bronze · 1 AP

- **Erstschadenschutz** (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Kurztext: Träger +1 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.
- Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)
- Effektcodes: EQUIP_STAT, EQUIP_IGNORE_FIRST_DAMAGE
- *Erst graben, dann kämpfen.*

### Kronsiegel der Wacht
`dc_np_eldran_kronsiegel_der_wacht` · Ausrüstung · Bronze · 1 AP

- Kurztext: Wird der Träger zerstört, ziehst du 1 Karte. Träger +1 ATK.
- Wird der Träger zerstört, ziehst du 1 Karte.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: ON_DESTROY_DRAW, EQUIP_STAT
- *Wer fällt, hinterlässt ein Siegel.*

### Sperrdraht-Kit
`dc_np_eldran_sperrdraht_kit` · Ausrüstung · Bronze · 1 AP

- Kurztext: Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 2 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.
- Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 2 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.
- Effektcodes: EQUIP_NEGATE_DAMAGE
- *Der Draht fängt den ersten Schlag.*

### Bajonett der Garde
`dc_np_eldran_bajonett_der_garde` · Ausrüstung · undefined · 1 AP

- Kurztext: Solange der Träger beschädigt ist: +2 ATK.
- Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +2 ATK.
- Effektcodes: EQUIP_COND_ATK
- *Wer verwundet ist, kämpft verbissener.*

### Kronbanner
`dc_np_eldran_kronbanner` · Ausrüstung · undefined · 2 AP

- Kurztext: Träger +1 ATK und +1 DEF.
- Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK und +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.
- Effektcodes: EQUIP_STAT
- *Unter dem Banner weicht niemand.*

