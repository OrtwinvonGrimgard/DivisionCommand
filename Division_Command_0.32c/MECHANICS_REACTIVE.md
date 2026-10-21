# Reaktive Mechaniken

Grundsatz für alle Karten, nicht nur für einzelne Nationen. Karten sollen aufeinander reagieren, nicht nur flache Boni geben.

## Grundregeln

- **Unterstützungen haben keine Kampfwerte.** Kein ATK, kein DEF. Sie wirken über Effekte, Einschränkungen oder Trigger.
- **Einheiten** haben ATK und DEF.
- **Ausrüstung** wird an einen Träger gebunden und wirkt auf diesen oder über diesen.
- **Soforteinsätze** sind einmalige Effekte.
- **Doktrinen** sind permanente Boni oder Regeln, die für das Deck gelten.

## Trigger-Typen

Diese Typen gelten für alle Nationen. Sie können kombiniert werden.

### 1. Verlust-Trigger
Etwas passiert, weil eine eigene Einheit zerstört oder beschädigt wurde.
- Beispiel: „Wenn eine eigene Infanterie in diesem Abschnitt zerstört wird, darfst du eine Infanterie aus dem Ablagestapel für 0 AP spielen.“

### 2. Handlungs-Trigger
Etwas passiert, weil eine Einheit gehandelt oder angegriffen hat.
- Beispiel: „Wenn der Träger in diesem Zug angegriffen hat, erhält er +1 ATK bis zum Ende des Zuges.“

### 3. Einschränkung
Dem Gegner wird etwas genommen oder teurer gemacht. Kein eigener Bonus.
- Beispiel: „Gegnerische Einheiten in diesem Abschnitt können ihre Fähigkeiten nicht nutzen.“
- Beispiel: „Unterstützung in diesem Abschnitt kostet 1 AP mehr zum Ausspielen.“

### 4. Ketten-Trigger
Ein Effekt erlaubt oder erzwingt eine weitere Aktion.
- Beispiel: „Wenn diese Einheit zerstört wird, darfst du eine andere Infanterie aus der Hand für 1 AP weniger spielen.“

### 5. Bedingter Bonus
Der Bonus gilt nur, solange eine Bedingung erfüllt ist.
- Beispiel: „+1 ATK, solange in diesem Abschnitt mindestens eine eigene Einheit beschädigt ist.“

## Hinweise für Theryn

Theryn darf mehrere Lesarten haben. Religiöser Fanatismus, Instrumentalisierung oder beides. Die Karten sagen nicht, was wahr ist. Sie sagen nur, was passiert.

Theryn-Karten können besonders stark mit Verlust-Triggern und Einschränkungen arbeiten, müssen es aber nicht ausschließlich tun. Andere Nationen nutzen die gleichen Trigger-Typen mit anderem Schwerpunkt.

## Anwendung

Beim Erstellen oder Überarbeiten einer Karte prüfen:
1. Hat die Karte nur einen flachen Bonus (+1 ATK, +1 DEF)?
2. Lässt sich der Effekt an eine Bedingung oder einen Trigger knüpfen?
3. Reagiert die Karte auf etwas, das der Gegner oder der eigene Spieler tut?
4. Bei Unterstützungen: Wirkt der Effekt ohne Kampfwerte?

Wenn 1 zutrifft und 2 oder 3 möglich ist, den Effekt reaktiver formulieren.

## Technische Regeln

Die verbindlichen Spielregeln liegen in:
- `web/js/engine/engine.js` — Regelmaschine
- `web/js/data/catalog.js` — Grundwerte (Deckgröße, AP, Front, etc.)

Dieses Dokument beschreibt nur die Design-Ebene für Karten-Effekte. Es ersetzt die Engine nicht.

## Stufen-System (Bronze / Silber / Gold)

Die Seltenheit erklärt sich mechanisch durch die Stärke und Komplexität des Effekts.

| Stufe | Mechanik | Beispiel |
|---|---|---|
| **Bronze** | Einfacher Trigger, kleine Wirkung, keine Bedingung | ON_ALLY_DESTROY: ziehe 1 |
| **Silber** | Trigger mit Bedingung oder Gegenreaktion | ON_ALLY_DESTROY mit if: { enemyLess: true }: ziehe 1, +1 ATK |
| **Gold** | Kombination zweier Trigger oder starke Einschränkung | ON_ENEMY_DESTROY + RESTRICT: Gegner kann im Abschnitt keine Fähigkeiten nutzen |

Eine Gold-Karte tut nicht nur mehr. Sie tut etwas, das Bronze und Silber nicht können, oder sie kombiniert zwei Dinge.

## Militärische Trigger

Neben den allgemeinen Triggern gibt es ereignisbasierte militärische Trigger. Sie feuern, wenn ein Angriff oder eine Einheit einen bestimmten Typ hat.

| Code | Feuert bei | Typische Reaktion |
|---|---|---|
| `ON_AIR` / `ON_DEFEND_AIR` | Luftangriff, Flugzeug, Drohne | Flugabwehr: Schaden reduzieren, ziehen |
| `ON_BOMB` / `ON_DEFEND_BOMB` | Artillerie, Bombe, Luftschlag | Deckung, Schaden reduzieren |
| `ON_MG` / `ON_DEFEND_MG` | Maschinengewehr (leicht/mittel/schwer) | Unterdrückung, ATK-Malus |
| `ON_GRENADE` | Granate, Nahkampf-Sprengmittel | Schaden, Fläche |
| `ON_MINE` | Mine, Minenfeld | Schaden beim Betreten, Einschränkung |
| `ON_SNIPER` | Scharfschütze, gezielter Schuss | Einzelziel, hohe Priorität |
| `ON_ARTILLERY` | Artilleriefeuer | Flächenwirkung, Verzögerung |

Die Engine erkennt den Typ über Tags auf der angreifenden Einheit (`artillerie`, `flug`, `mg`, `granate`, `mine`) und feuert die passenden Codes. `ON_DEFEND_*` reagiert auf der Verteidigerseite, `ON_*` auf der Angreiferseite.

## Bedingungen

Trigger können eine `if`-Bedingung haben:

- `minUnits` / `maxUnits` — Anzahl eigener Einheiten
- `section` — nur in diesem Abschnitt
- `damaged` — nur wenn die Einheit beschädigt ist
- `enemyLess` — nur wenn der Gegner im Abschnitt weniger Einheiten hat

Beispiel: `{ "code": "ON_ALLY_DESTROY", "param": { "draw": 1, "if": { "enemyLess": true } } }`
