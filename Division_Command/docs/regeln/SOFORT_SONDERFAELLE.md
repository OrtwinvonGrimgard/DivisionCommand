# Soforteinsätze – Sonderfälle (t250)

Kartentext ist maßgeblich. Hier stehen nur Präzisierungen, die der Text offen lässt. Die Datenfelder `text` wurden nicht geändert.

## `dc_so_massen` – Psychologie der Massen

„Spiele so viele Fronteinheiten von der Hand wie du möchtest, ohne AP-Kosten.“

Die Einheiten werden nacheinander gewählt und offen, ohne AP, auf freie Frontstellungen gelegt (bestehende Auslege-Wahl). Die Folge endet, wenn die Front voll ist, keine Einheit mehr auf der Hand liegt, oder der Spieler die Auswahl bestätigt bzw. abbricht. Null weitere Einheiten sind erlaubt.

## `dc_so_blinder_gehorsam` – Blinder Gehorsam

„Alle eigenen Fronteinheiten greifen in diesem Zug ohne AP an und erhalten +2 Angriff. Nur eigener Zug.“

Alle eigenen Fronteinheiten erhalten in diesem Zug +2 ATK. Angriffe dieser Einheiten kosten in diesem Zug 0 AP. Einheiten, die jetzt legal ein Ziel haben, führen als Teil des Soforteinsatzes nacheinander einen Angriff aus (Zielwahl über das Choice-UI); das gilt auch, wenn sie in diesem Zug bereits angegriffen haben. Verdeckte, frisch gelegte (ohne Gefechtsbereit), unterdrückte oder sonst angriffsgesperrte Einheiten greifen nicht an, behalten aber den ATK-Bonus. Einheiten ohne legales Ziel werden übersprungen. Unterbrochene Kämpfe (Feindkontakt, SAM) setzen die Folge danach fort.

## `dc_so_gassen` – Einsame Gassen

„Suche so viele Einheiten im Deck wie freie Frontplätze. Lege sie kostenlos offen auf gewählte Slots.“

Aus dem Deck werden Einheiten (`typ: Einheit`) gesucht, so viele wie es derzeit freie Frontstellungen gibt. Liegen mehr Einheiten im Deck, wählt der Spieler genau diese Anzahl. Weniger als offene Plätze: alle gefundenen kommen zum Einsatz. Anschließend legt der Spieler sie nacheinander kostenlos und offen auf selbst gewählte freie Stellungen. Nicht gewählte bzw. nicht gelegte Einheiten kommen gemischt zurück ins Deck. Allgemeine Einsatzregeln (z. B. Eingraben) gelten.

## `dc_so_letzter` – Der Letzte der steht

„Opfere die eigene Front bis auf eine Einheit. Sie erhält +1 ATK und +1 DEF je geopferter Einheit. Wird sie besiegt, erhält der Gegner 1 SP.“

Der Spieler wählt die überlebende Fronteinheit. Alle anderen eigenen Fronteinheiten werden geopfert (Zerstörung, inklusive üblicher Todes-Trigger, aber ohne Breschen-Sprung mitten in der Auflösung). Die Überlebende erhält dauerhaft +1 ATK und +1 DEF je geopferter Einheit. Stirbt sie später, erhält der Gegner 1 Siegpunkt (Trophy-SP).

## `dc_so_mobilisierung` – Mobilisierung

„Durchsuche das Deck nach bis zu 2 Infanterie-Einheiten auf die Hand. Eine davon darfst du sofort ohne AP spielen.“

Liegen mehr als 2 Infanterie im Deck, wählt der Spieler bis zu 2 davon (eine oder keine ist erlaubt, Bestätigen beendet die Wahl). Höchstens 2 kommen auf die Hand, der Rest wird gemischt zurückgelegt. Anschließend darf der Spieler eine der so genommenen Infanterie sofort ohne AP auslegen oder die freie Auslage abbrechen.
