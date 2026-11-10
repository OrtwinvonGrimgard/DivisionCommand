# Balance t251 – drei reparierte Teil-Stubs

**Stand:** 10.11.2026 (Europe/Berlin). Fortsetzung des Stub-Scans aus t250. Drei Effekte wirken jetzt wie gedruckt; die gedruckten Texte und die bestehenden AP-Kosten bleiben unverändert. Sonderfälle: `docs/regeln/EFFEKT_SONDERFAELLE_T251.md`.

Methode: Trophy-Mischdecks, 400 Partien je Variante, Startspieler wechselt, Nationen rotieren. Spieler 0 erhält genau eine Kopie (bzw. die Doktrin Blitzkrieg anstelle der ersten Mischdeck-Doktrin), Spieler 1 nicht. Kontrolle ohne Injektion, zusätzlich 0 AP zum Vergleich (nur bei den kostenpflichtigen Karten). Skript: `scripts/balance/sim_t251.mjs`. Streuung bei 400 Partien etwa ±2,5 Punkte.

| Karte | Kosten | Kontrolle WR | Mit Karte / Doktrin (Spielrate) | 0 AP WR (Spielrate) | Urteil |
|---|---|---|---|---|---|
| Vertragsclip (`dc_b_vertragsclip_182`) | **2 AP** | 49,8 % | 50,3 % (18,8 %) | 47,0 % (17,3 %) | Der Sofort-Rabatt braucht einen legalen Träger (Elite oder Unterstützung); in der Bot-Serie kaum Verschiebung. 2 AP behalten. |
| Schläferzelle (`dc_su_schlaefer`) | **3 AP** | 47,5 % | 49,3 % (25,5 %) | 47,5 % (30,3 %) | Neutralisierung macht die Karte antwortbar, die Siegquote bleibt nahe der Kontrolle. 3 AP behalten. |
| Blitzkrieg (`dc_dok_blitzkrieg`) | Doktrin (0) | 49,3 % | 40,3 % (immer gewählt) | — | Keine AP-Schraube. Die Zwangswahl verdrängt typischerweise eine passendere Mischdeck-Doktrin; Bots nutzen die neue Sperre kaum. Kein Eingriff. |

Keine AP- oder Textänderung, daher keine neuen Vorderseiten und kein Service-Worker-Cache-Sprung (bleibt `divcmd-alpha40r`). Engine- und Bot-JavaScript werden vom Service Worker netzwerkzuerst geladen.
