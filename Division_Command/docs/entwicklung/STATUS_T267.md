# Status t267 – Kartenreparatur und Balance-Nachmessung

Stand 11.11.2026, `main` nach t265 (`577d441`).

## Ergebnis

- Die 14 Karten aus der Prüfung t265 wirken wie gedruckt. Prüfskript `node scripts/balance/audit_text_engine_t265.js`: Abschnitt `t267` 14/14 OK (vorher 14 Befunde); übrige Meldungen unverändert die bekannten Fehlalarme (15 im Ablauf, 6 bedingt nicht spielbar).
- Neue allgemeine Engine-Regeln: Bonus negieren (`NEGATE_BONUS`), eigener Bonus nach Feindziel (`param.side: 'own'`, Wahl „Eigene Einheit für den Bonus“), Zielbedingungen (`target.filter`, `target.maxDef`), Opfern zerstört Feinde nur mit `then_destroy`, `MEDIZIN` liest `self`/`flank`, `debuffDef` beim Angriff. Einzelheiten und Lesarten je Karte: `docs/regeln/KARTEN_T267.md`.
- Zusätzlich mit demselben Schlüssel: Letzter Ruf (`SACRIFICE`) nur noch mit eigener Infanterie, wie gedruckt.
- Ein Text geändert: Stillprobe (Entwurfsrest mit Fragezeichen) → „Wähle eine gegnerische Fronteinheit: decke sie auf; −2 ATK bis Zugende.“ Front neu gerendert (alpha40, 1024×1428).
- Bot: bewertet die neue Wahl (Heilung auf die beschädigtste, ATK auf eine angriffsbereite Einheit).
- Test `tests/test_cards_t267.js` (20 Fälle, in `npm test`; rot auf dem alten Stand).

## Balance vorher/nachher

Gleiches Verfahren wie t257 (`node scripts/balance/sim_t255.mjs nations 96 new`, t254-Bot, 96 Partien je gerichtetem Paar, 23.040 Partien je Modus, ±1,8 Punkte je Nation). „Vorher“ ist ein frischer Lauf auf `577d441`, damit nur die Kartenreparatur den Unterschied macht. Die Differenz zweier Läufe streut um etwa ±2,5 Punkte (Bot mit Zufallsanteil).

| Modus | Startspieler vorher → nachher | Spanne vorher | Spanne nachher |
|---|---|---|---|
| Starter | 47,7 → 47,7 % | 43,4–55,7 % | 43,5–55,2 % |
| Misch | 48,2 → 48,6 % | 43,3–56,0 % | 43,0–55,0 % |

Alle 46.080 Partien regulär beendet, 0 abgelehnte Bot-Aktionen, Ø 15,5 bzw. 15,8 Züge.

| Nation | Starter vorher | Starter nachher | Δ | Misch vorher | Misch nachher | Δ |
|---|---|---|---|---|---|---|
| Vesper | 54,7 | 55,2 | +0,5 | 51,8 | 53,2 | +1,4 |
| **Karsk** | 54,7 | 54,2 | -0,5 | 45,6 | 46,4 | +0,8 |
| Merovan | 53,6 | 53,9 | +0,3 | 53,8 | 53,8 | 0,0 |
| Orthea | 52,9 | 53,2 | +0,3 | 46,6 | 46,7 | +0,1 |
| **Caldris** | 51,1 | 52,6 | +1,5 | 51,5 | 52,6 | +1,1 |
| **Rothain** | 55,7 | 51,7 | -4,0 | 48,5 | 46,5 | -2,0 |
| Eldran | 51,1 | 50,2 | -0,9 | 56 | 54,2 | -1,8 |
| Lyr | 49,1 | 49,9 | +0,8 | 49,6 | 48,4 | -1,2 |
| Ossaria | 47,5 | 49,5 | +2,0 | 52,1 | 52,4 | +0,3 |
| **Theryn** | 50,9 | 49,1 | -1,8 | 44,5 | 45,2 | +0,7 |
| Namar | 48,4 | 48,8 | +0,4 | 54,8 | 54,8 | 0,0 |
| Sahr | 48,2 | 48,6 | +0,4 | 43,3 | 43 | -0,3 |
| Dargan | 47,9 | 47,8 | -0,1 | 55 | 55 | 0,0 |
| Steinmark | 45,6 | 46,1 | +0,5 | 54,5 | 54,9 | +0,4 |
| **Averon** | 45,1 | 45,7 | +0,6 | 44,2 | 43,5 | -0,7 |
| Vael | 43,4 | 43,5 | +0,1 | 48,4 | 49,6 | +1,2 |

### Deutung

- **Rothain** verliert mit Starterdeck 4,0 Punkte (55,7 → 51,7 %), außerhalb der Streuung: Ablösung zerstörte vorher zusätzlich 2 Feindeinheiten. Rothain liegt jetzt im Ziel 46–54 %; im Mischdeck 46,5 % (−2,0), knapp im Ziel.
- **Theryn** Starter −1,8 (Opfergabe), Misch +0,7: innerhalb der Streuung, Richtung wie erwartet.
- **Caldris** +1,5/+1,1 (Rasten heilt jetzt die eigene Einheit statt den Feind): Richtung wie erwartet, knapp innerhalb der Streuung.
- **Karsk** (−0,5/+0,8) und **Averon** (+0,6/−0,7): keine messbare Änderung. Notimplantat, Stoßtrupp und Lokalisierung sind Einzelkarten, deren Wirkung im Deckmittel untergeht.
- Außerhalb 46–54 %: Starter 4 Nationen (Vesper 55,2, Karsk 54,2, Averon 45,7, Vael 43,5; t257: 7), Misch 7 (Dargan 55,0, Steinmark 54,9, Namar 54,8, Eldran 54,2, Theryn 45,2, Averon 43,5, Sahr 43,0; t257: 9). Keine Reparatur hat eine Nation aus dem Ziel geschoben.
- Empfehlung: Averon (beide Modi unter 46 %), Sahr gemischt und Vael Starter gezielt stärken; das ist eine eigene Balance-Runde, nicht Teil dieser Reparatur.

## Prüfungen vor dem Push

`npm test` (47 Skripte), `verify.py`, Fuzz 80/80, Smoke 400 – Ergebnisse siehe Commit-Bericht.

## Fortschritt

Gesamt 64 → **66 %**, Kernspiel 74 → **75 %** (Regeln & Engine 87 → 90, Kartenbestand 83 → 85, Balance 72 → 74, Tests & Doku 83 → 85). Hilfe-Seiten Entwicklungsstand, Fehlende Features, Fortschritt und Fortschritt in Prozent angepasst. Cache `divcmd-alpha40z`.
