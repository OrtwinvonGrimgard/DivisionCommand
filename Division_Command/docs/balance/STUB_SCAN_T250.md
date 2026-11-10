# Stub-/No-Op-Scan t250

Nur Diagnose, keine Änderungen. 1746 Katalogkarten, 210 Effektcodes, 389 Soforteinsätze.

## Effektcodes ohne Handler in Engine/Taktik/Doktrin/Trophy

Codes, die in Engine, Taktik-, Doktrin- und Trophy-Runtime in keinem Ausführungszweig vorkommen (`code ===` / `hasDok` / `_hasDoctrine` / `want` / `fx`, …). Handnotizen, unverändert gelassen:

- `BLITZ_LOCK_SUPPORT` (1×, Doktrin): Blitzkrieg (`dc_dok_blitzkrieg`). Zweiter Effekt der Doktrin („gegnerische Unterstützung in der ersten Runde nach Ausspielen eines Panzers nicht aktivierbar“) wird nicht am Code festgemacht. Verwandter Code setzt `inst.flags.blitzLock` nur bei verdeckten Panzern und zählt ein ungenutztes `player.flags.blitzLock` herunter; die Unterstützungssperre greift darüber nicht. `BLITZ_SUMMON_ATK` (+1 ATK beim Einrücken) ist umgesetzt.
- `EQUIP_DISCOUNT_AURA` (1×, Ausrüstung): Vertragsclip (`dc_b_vertragsclip_182`, „Soforteinsatz −1 Kosten“). `costOf` kennt `EQUIP_DISCOUNT` auf Unterstützung, nicht diese Aura auf Ausrüstung. Karte ohne erkennbare Wirkung.
- `MINE_TOKEN` (1×, Token): Minenfeld (`dc_tok_minenfeld`). Der Code wird nicht gelesen; die Mine zündet über Token-Sonderfall (Name/Tag/NML), fest 3 Schaden — das entspricht dem Parameter `dmg: 3`. Kein No-Op der Karte, nur ungenutzter Effektcode.
- `NEUTRALIZE` (1×, Unterstützung): Schläferzelle (`dc_su_schlaefer`). Der SLEEPER-Pfad (nach 3 Zügen zufällige feindliche Einheit mit AP ≤ 3 zerstören) ist umgesetzt. „Neutralisierung 2 AP“ hat einen UI-Knopf, aber `_actUseAbility` behandelt den Code nicht.

## Codes nur als String (kein `code ===` / `case`)

_keine_

## Soforteinsätze ohne Zustandsänderung (Karte/AP ignoriert)

Reiches Brett (6+6 Front, Support, Mine, gemischtes Deck). Pending gilt als Wirkung. 0 Treffer.

_keine_

## Nicht spielbar in der Probe (bedingt, nicht automatisch Stub)

- Boden-Luft-Rakete (`dc_so_bod_luft`, 0 AP, CANCEL_AIR_DAMAGE) — Kein Luftangriff im Gange.
- Geist in den Trümmern (`dc_so_geist`, 0 AP, GHOST_RUINS) — Im letzten Zug keine Unterstützung auf dem Ablagestapel.
- Geistiger Vorsprung (`dc_so_vorsprung`, 0 AP, GHOST_STRIKE) — Kein Angriff im Gange.
- Glatter Durchschuss (`dc_so_durchschuss`, 0 AP, DOUBLE_COMBAT) — Keine gepanzerte Einheit.
- Instandsetzung (`dc_so_instand`, 0 AP, REPAIR_BOUNCE) — Kein Fahrzeug an der Front.
- Militärische Ehren (`dc_so_ehren`, 0 AP, HONORS) — Keine Veteranen an der Front.

## Hänger in der Probe

_keine_
