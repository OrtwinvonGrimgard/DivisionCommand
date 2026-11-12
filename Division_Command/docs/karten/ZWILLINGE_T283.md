# Reskin-Zwillinge und Seltenheit (t283)

Definition (wie Analyse t282): **Reskin-Zwillinge** haben gleichen Typ, AP, ATK, DEF, Klasse und identischen Kartentext.
**Mechanisch identisch** sind sie, wenn zusätzlich Seltenheit, Effektparameter und Schlüsselwörter gleich sind.
Prüfskript: `node tests/test_cards_t283.js` (Teil von `npm test`).

## Umgesetzt
Der Steilfeuer-Grad steht in Text und Tags; daher waren viele der in t282 gezählten „mechanisch gleichen“ Paare (z. B. Steilfeuer I gegen II) in Wahrheit verschieden.
Echte mechanische Zwillinge wurden mit einer kleinen Werteverschiebung (gleiche Summe ATK+DEF bzw. eigene Rolle) getrennt:

| Karte | vorher | nachher | Zwilling |
|---|---|---|---|
| Altenfeld-Riegel (Ossaria) | 4/3/5 | 4/2/6 | Werkrott-Kolonne (Rothain) |
| Etappenkeil (Merovan) | 3/3/3 | 3/4/2 | Achsenkolonne (Merovan) |
| Pfadkeil (Sahr) | 3/3/4 | 3/4/3 | Handelswagen (Sahr) |
| Falschfeuer (Vesper) | 3/2/3 | 3/1/4 | Achsenfeuer (Merovan) |
| Markengeschütz (Eldran) | 3/3/3 | 3/2/4 | Abriegelungsbatterie (Vesper) |

Sonderfall: **Sammelpunkt** und **Marschbefehl** gibt es als neutrale Alpha-Karte und als Theryn-Ausgabe mit gleicher Wirkung. Das ist gewollt (Theryn als Infanterienation führt sie im Nationsset).

## Bewusst offen
Rund 120 Reskin-Gruppen (≈ 317 Karten) bleiben bestehen: Es sind die schlichten Grundkörper jeder Nation (z. B. 3/3/3 ohne Text, Steilfeuer-Batterien), die sich nur in Nation, Name, Bild und Flavor unterscheiden. Jede Nation braucht solche Grundkarten. Sie alle mechanisch zu verändern, würde die Balance aller 16 Nationen gleichzeitig verschieben. Das ist eine eigene Design-Etappe.

## Seltenheit
98 spielbare Alpha-Karten hatten kein Feld `rarity` und fielen stillschweigend auf Bronze (4 Kopien). Sie tragen jetzt ausdrücklich `rarity: "bronze"`. Kopienlimit und Spielwirkung bleiben unverändert. Doktrinen und Marker haben weiterhin keine Seltenheit.
