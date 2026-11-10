# REGEL_FREEZE — Phase 0 (Alpha 0.5a)

**Status:** eingefroren für Playtests · Stand: 2026-11-05 · Tip `196ae84`  
Quelle der Wahrheit: `web/js/data/catalog.js` → `rules` + [SIEGBEDINGUNGEN.md](SIEGBEDINGUNGEN.md).

## Primärregel

- `victory_mode`: **`trophy`** (Default in Bot, Hotseat, LAN). Legacy: `classic`.
- Tuning-Kandidat **K** ist aktiv.

## Trophy (K)

| Knob | Wert |
|---|---|
| `trophy_vp_to_win` | 5 |
| `trophy_elite_vp` | 2 |
| `trophy_durchbruch_max_claims` | 3 |
| `trophy_durchbruch_cooldown` | 2 |
| `trophy_doctrine_need_scale` | 0.65 |
| `trophy_safety_empty_from` | 26 |
| `trophy_safety_vp_cap` | 28 |

SP-Quellen: Elite zerstört (+2), Durchbruch (+1, halten bis Ende nächsten eigenen Zugs), Doktrin-Ziel (+1, 1×/Partie, nationenunabhängig an 36 Doktrinen). Karten-SP unverändert.

Playtest-Zielbild: VP-Siege ≥70 %, Sicherheitsnetz ≤25 %, Median ~14–18 Züge.

## Eröffnung (alle Modi)

- `opening_coin`: true (Münzwurf, seed-deterministisch; LAN über Host-State).
- `opening_starter_ap_penalty`: 2 → Startspieler **3 AP nur im ersten Zug**, danach 5 (t238; vorher 1 → 4 AP).
- Starthände 5/5; Startspieler zieht in Zug 1 nicht; Zweiter +1 Karte beim Zugbeginn.

## Weitere eingefrorene Kernregeln (Nov 2026)

- `deploy_protection`: true (Eingraben / Schild-UI).
- `combat_counter`: `survivor_only`; Artillerie-Gegenschlag nur bei Reichweite des Verteidigers.
- `deck_copy_limits`: Gold 1 / Silber 2 / Bronze 4.
- Schützenpanzer zählen als Panzer (kein eigener Typ-Tag).

## Bewusst offen (nicht Teil dieses Freezes)

- Roguelike / Feldzug (Fahrplan Phase 2+).
- Nation-Balance-Feinabstimmung unter Trophy (siehe `scripts/sim_nation_strength.mjs`).
- Hilfe-Text/Onboarding-Angleichung an Trophy-Default.
- Menschliche Playtests (Erfolgskriterium Phase 0: 10 Fremden-/Bot-Partien ≤20 Min mit klarem Siegrund).

## Nicht ändern ohne neue Freeze-Notiz

Victory-Knobs, Eröffnungs-Ausgleich, Counter-Modus und Copy-Limits bleiben bis nach den Playtests stabil. Neue Karten und Bot-Heuristiken dürfen sich innerhalb dieser Regeln bewegen.
