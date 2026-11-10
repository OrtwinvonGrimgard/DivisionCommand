# Wahl-Karten / Doktrinen — Verdrahtung

Stand: Branch `doktrin-balance`. Audit: `scripts/dev/audit_choice_cards.mjs`, Tests: `tests/test_choice_wiring.js`.

## Bot-Faustregel (Test-Bot)

1. **Offene Wahl (`RESOLVE_PENDING`)** hat Vorrang vor Spielen/Angreifen.
2. **`scorePending`:** Slot-Wahl bevorzugt Mitte (+8, Abschnitt C +2). Eigene Ziele: ATK + 0,5·DEF. Feindziele: 2·ATK + DEF, +6 wenn verdeckt, +8 wenn DEF ≤ 3. Plus kleiner Zufall.
3. **Doktrin-Autos (kein Spieler-Dialog):** Schwerpunkt → dichtester Abschnitt (≥ `min_units`). Sturmangriff → Infanterie mit höchstem Basis-ATK. Etappensicherung → erste beschädigte Einheit heilen.
4. **Verlegung:** Bot nimmt `DOK_SHIFT` aus `listActions` (Mitte bevorzugt, Score ~6–10).
5. **Schloter-Bot:** zufällige Pending-Wahl / zufälliger Shift.
6. **t254:** Eigene Wahlfenster mit Sonderlogik: „Der Letzte der steht“ behält die stärkste Einheit, befohlene Angriffe (Blinder Gehorsam) und Feuerauftrag zielen auf vernichtbare Feinde, Deck-Suchen (Mobilisierung, Einsame Gassen) nehmen die stärksten Einheiten. Im Browser löst `botTick` Folgewahlen mit `DCBot.step` statt mit der ersten Option. Details: `docs/balance/BOT_KI_T254.md`.

## Spieler-UI

- Soforteinsätze mit Ziel → `pending` (`instant-target` / `instant-section` / Spezialarten) → Modal in `app.js` (`showPending`).
- MOVE_SLOTS: erst Einheit, dann bei ≥2 Nachbarfeldern `move-dest` (Slot antippen).
- Doktrin **Verlegung:** Klick auf Doktrin-Karte → Button „Verlegung: 1 Slot seitlich“.
- Hinweis: Feldreparatur/Überschuss-Buttons waren hinter einem frühen `return` bei Schutzwall unerreichbar — mit behoben.

## Geprüft

- 229 Soforteinsätze inventarisiert (Audit); ~170 Wahl-Pfade OK, 37 Auto-OK.
- Nach Fixes: Doktrin-Issues 0; einzig bewusstes Auto: Räumkommando bei 1 Mine.
- 19 Audit-„UNEXPECTED_PENDING“ = Klassifikator-Rauschen (UI korrekt).
- 8 gezielte Wiring-Tests grün; `test_effects.js` 83/83 grün.
- Nachsim 10/Paar: Decided-WR 45.2–61.0 % (Lyr Ausreißer).

## Defekte (behoben)

| Name | Problem | Fix |
|---|---|---|
| Minenfeld | `this.byId(...)` war Objekt, kein Aufruf → Pending blieb hängen | `this.byId[...]` |
| Sammelruf / Sturmangriff / Sturmglocke (Theryn) | Text „eine Infanterie“, Code `BUFF_ALL_OWN` → alle gebufft | → `BUFF` |
| Linienhalten / Gemeinsamer Feind | Abschnitt-Text, Code `BUFF` (eine Einheit) | → `BUFF_SECTION` |
| Feuerplan (Sofort) | `REVEAL` ignorierte Zielwahl | → `MARK_OBSERVED` + Aura |
| Letzter Ruf | Opfertiefe zerstörte Feinde statt Abschnitts-Buff | `SACRIFICE` mit `section_buff_atk` / `no_enemy_destroy` |
| MOVE_SLOTS (Wachwechsel & Co.) | Auto-Schieben zur Mitte, keine Zielwahl | `move-dest`-Pending |
| Stoßtrupp | Passiv-ATK + TurnStart-`dokAtk` (Doppel) | TurnStart nur ohne Passiv-Params |
| Verlegung | Text erlaubte Schieben, Runtime nur +DEF | `DOK_SHIFT` + UI + Bot |
| Feuerplan-Doktrin | Veraltetes Principle „Wähle…“ | Principle angepasst |
| Doktrin-Buttons | Schutzwall-`return` blockierte andere Aktionen | `onAction` verzweigt korrekt |

## Bewusst unverändert

- Räumkommando mit genau 1 Mine: Auto-Auflösung (kein Dialog nötig).
- Remis-/Roh-WR und Trophy-Tempo: siehe offene Fragen in [DOKTRIN_BALANCE.md](../balance/DOKTRIN_BALANCE.md).

Screenshot (Modal-Fixture): [choice_ui_pending.png](choice_ui_pending.png)
