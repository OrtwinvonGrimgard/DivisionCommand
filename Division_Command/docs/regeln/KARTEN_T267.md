# Kartenreparatur t267 – Lesarten und Sonderfälle

Stand 11.11.2026. Die 14 Karten aus der Prüfung t265 (`TEXT_ENGINE_AUDIT_T265.md`) wirken jetzt wie gedruckt. Grundsatz: Die Engine folgt dem Kartentext. Geändert wurde nur ein Text: Stillprobe, weil der alte Text ein Entwurfsrest mit Fragezeichen war. Test: `tests/test_cards_t267.js` (in `npm test`). Prüfskript: `node scripts/balance/audit_text_engine_t265.js` (Abschnitt `t267`, alle 14 OK).

## Neue allgemeine Regeln der Engine

### Bonus negieren (`NEGATE_BONUS`)

„Negiere einen (feindlichen) Bonus“ wirkt auf eine gewählte **gegnerische** Fronteinheit:
- Gespeicherte ATK-Boni (dauerhaft und bis Zugende) fallen weg. Liegt die DEF über dem Druckwert, sinkt sie auf den Druckwert; die Maximal-DEF ebenso. Schaden bleibt, die Einheit stirbt dadurch nie (mindestens 1).
- Laufende Boni (Auren, Ausrüstung, Schlüsselwörter, Doktrinen, Unterstützung) zählen bis zum Ende des nächsten gegnerischen Zugs nicht: ATK höchstens Druckwert, DEF höchstens aktuelle Stabilität.
- Mali (negative Werte) bleiben bestehen.
- Lesart: „ein Bonus“ heißt alle Boni dieser einen Einheit. Einzelne Boni werden in der Engine nicht getrennt geführt.

### Eigener Bonus nach Feindziel (`param.side: 'own'`)

Texte der Form „Wähle eine gegnerische Fronteinheit: <Wirkung>; <Bonus>“ geben den Bonus einer **eigenen** Fronteinheit. Nach der Feindwahl folgt die Wahl „Eigene Einheit für den Bonus“. Bei genau einer eigenen Fronteinheit wird ohne Wahl angewendet; ohne eigene Front verfällt der Bonus. Wird die Wahl abgebrochen, verfällt nur der Bonus; die Karte bleibt gespielt (die Feindwirkung ist schon eingetreten). Vorher bekam die gewählte Feindeinheit den Bonus.

### Zielbedingungen (`target.filter`, `target.maxDef`)

- `filter: 'elite'` nur Elite-Einheiten (offen; verdeckte Einheiten zählen nicht als Elite-Ziel), `filter: '<tag>'` nur Einheiten mit diesem Tag oder Typ.
- `maxDef: n` nur Einheiten mit aktueller DEF höchstens n.
- Gibt es kein erlaubtes Ziel, ist die Karte nicht spielbar. Das gilt auch, wenn die Karte direkt auf ein Feld gezogen wird.

### Opfern (`SACRIFICE`)

Gegnerische Einheiten werden nur noch zerstört, wenn der Kartentext es sagt (`then_destroy`). Vorher zerstörte jedes Opfern ohne Gegenangabe zusätzlich die ersten 2 gegnerischen Fronteinheiten. Betroffen waren Opfergabe und Ablösung; heute nutzt keine Karte `then_destroy`.

### Ausrüstung

- `MEDIZIN` liest `self` und `flank` (Vorgabe 3 und 2 wie Feldlazarett-Ausrüstung `dc_eq_med`, die unverändert bleibt).
- `EQUIP_ON_ATTACK_DAMAGE.debuffDef`: Greift der Träger an, verliert das Ziel vor der Schadensberechnung n DEF und n Maximal-DEF, mindestens 1.

## Je Karte

| Karte | ID | Vorher | Jetzt |
|---|---|---|---|
| Verfahrensbruch | `dc_b_verfahrensbruch_589` | wählte eigene Einheit, entfernte nur deren ATK-Malus; kein Ziehen | gegnerische **Elite**-Einheit: Bonus negiert; ziehe 1. Ohne feindliche Elite nicht spielbar. |
| Keine Sterne | `dc_b_keine_sterne_529` | wie Verfahrensbruch | wie Verfahrensbruch |
| Modellstopp | `dc_b_modellstopp_463` | wie Verfahrensbruch | beliebige gegnerische Fronteinheit: Bonus negiert; ziehe 1 |
| Kein Schrein | `dc_b_kein_schrein_284` | wie Verfahrensbruch, kein +1 DEF | gegnerische Fronteinheit: Bonus negiert; danach eine eigene Fronteinheit +1 DEF. Lesart: „Bonus aus Zerstörung“ wird nicht gesondert geführt; negiert werden alle Boni der gewählten Einheit, darunter Boni aus Zerstörungen. |
| Stillprobe | `dc_b_stillprobe_467` | Text „Feind kann diesen Zug nicht aufdecken/angegriffen werden? Negiere Aufklärungsschutz; −2 ATK.“; deckte den ersten verdeckten Feind auf, kein −2 ATK | **neuer Text:** „Wähle eine gegnerische Fronteinheit: decke sie auf; −2 ATK bis Zugende.“ Deckt genau die gewählte Einheit auf (Aufklärungsschutz aufgehoben), sie hat bis Zugende −2 ATK. Kartenfront neu gerendert. |
| Opfergabe | `dc_b_opfergabe_126` | opferte beliebige eigene Einheit, heilte nicht, zerstörte 2 Feinde | nur eigene Einheit mit DEF ≤ 2 wählbar; danach eine andere eigene Einheit wählen, sie heilt 2. Keine Feinde zerstört. |
| Ablösung | `dc_b_abloesung_660` | zerstörte zusätzlich 2 Feinde; legte die erste Handeinheit auf das erste freie Feld (beliebiger Abschnitt, ohne Kostengrenze) und gab +1 Maximal-DEF | zerstört die gewählte eigene Einheit, legt die **stärkste** Handeinheit mit Kosten bis Kosten der Zerstörten +1 auf deren Feld (sonst ein freies Feld im selben Abschnitt), ohne AP. Sie gilt als in diesem Zug ausgespielt. „Heile sie um 1“ heilt um 1 bis zur Maximal-DEF; bei einer frischen Einheit wirkt das nicht. Keine Feinde zerstört. Lesart: Die Wahl der Handeinheit trifft die Engine (höchste Kosten, dann ATK+DEF). |
| Verbandskasten | `dc_b_verbandskasten_351` | heilte zu Zugbeginn 3, Nachbarn 2, auch nach Angriff | am Ende des eigenen Zugs heilt der Träger 1, wenn er nicht angegriffen hat (Ruhezug, `EQUIP_ON_REST`). Nachbarn heilen nicht. |
| Werkstattmarke | `dc_b_werkstattmarke_657` | nur +1 DEF, jeder Träger | nur Panzer oder Fahrzeug als Träger; +1 DEF; zu Beginn des eigenen Zugs heilt der Träger 1, solange er beschädigt ist. |
| Ortungsband | `dc_b_lokalisierung_480` | Ziel −1 DEF fehlte | Angriff des Trägers: Ziel −1 DEF (mind. 1) vor dem Schaden; Aufdecken wie bisher. |
| Notimplantat | `dc_b_notimplantat_402` | Feind: 1 Schaden, +1 ATK, +1 DEF (Schaden aufgehoben) | Feind 1 Schaden; eigene Fronteinheit +1 ATK bis Zugende und +1 DEF |
| Stoßtrupp | `dc_b_stosstrupp_419` | Feind: 2 Schaden, +3 ATK | Feind 2 Schaden; eigene Fronteinheit +3 ATK bis Zugende |
| Lokalisierung | `dc_b_lokalisierung_823` | Feind: +1 ATK, −2 DEF | eigene Fronteinheit +1 ATK bis Zugende und −1 DEF (mind. 1); gewählte Feindeinheit −1 DEF (mind. 1). Lesart nach Textaufbau und Datensatz: Der erste Teil ist ein Tausch für die eigene Einheit, nur der zweite Teil trifft den Feind. |
| Rasten | `dc_b_rasten_341` | 2 Feinde: greifen nicht an, wurden aber geheilt und +1 DEF | 2 gegnerische Fronteinheiten greifen im nächsten Zug nicht an; eine eigene Fronteinheit heilt 2 und erhält +1 DEF. Lesart: „heile 2“ ist der Heilwert, nicht zwei Einheiten. |

## Weitere Karten mit demselben Schlüssel

| Karte | ID | Befund | Änderung |
|---|---|---|---|
| Letzter Ruf | `dc_b_letzter_ruf_130` | `SACRIFICE`: „Zerstöre eine eigene Infanterie“, wählbar war jede eigene Einheit | nur eigene Infanterie wählbar (`target.filter: 'infanterie'`) |
| Feldlazarett-Ausrüstung | `dc_eq_med` | `MEDIZIN` 3/2 stand vorher fest im Code | liest jetzt `self`/`flank`; Wirkung gleich |

Kein weiterer Soforteinsatz mit Feindziel stärkt oder heilt die gewählte Feindeinheit (geprüft in `tests/test_cards_t267.js`). `negateBonus` und `debuffDef` kommen auf keiner weiteren Karte vor.
