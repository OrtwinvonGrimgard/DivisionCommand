# Nationenpools auf 100 Karten

Stand: gültig in `main` (Alpha 0.6b). Die Überschrift nannte früher den Arbeitsbranch `nation-pools-100`; der Inhalt ist der lebende Pool, kein offener Branch.

**Deckformat bleibt:** 60 Karten + 2 Doktrinen. Die Starterdecks wurden **nicht verändert**. Neu ist der Auswahlpool: jede der 16 Nationen hat jetzt 100 einzigartige spielbare Karten (60 aus dem Starter + 40 neue) plus ihre 2 Doktrinen. Insgesamt kommen 640 Karten dazu. Regeln, Balance-Werte der Bestandskarten und Sounds sind unverändert.

**Deckbau mischt frei (Entscheidung Nov 2026):** Die Nationenpools sind in sich schlüssig und bestimmen Identität, Starterdecks, Bot-/Testdecks und den Filter. Ein eigenes Deck darf aber Karten aus **allen** 1.709 Deckkarten mischen (16 × 100 Nationenkarten + 109 neutrale). Die 2 Doktrinen sind frei aus allen 36 wählbar. Es gelten nur Kopienlimits (1/2/4 nach Seltenheit, nach Namen gezählt) und 60 + 2. Regeltext: [RULES §24.0](../regeln/RULES_v0.5_GRUNDKONZEPT.md#240-nationen-pools-und-mischen-verbindlich).

## Zahlen je Nation
<!--TBL-->
| Nation | vorher (einzigartige Starterkarten) | neu | nachher (Pool) | Doktrinen |
|---|---|---|---|---|
| Steinmark | 60 | 40 | 100 | 2 |
| Karsk | 60 | 40 | 100 | 2 |
| Theryn | 60 | 40 | 100 | 2 |
| Vael | 60 | 40 | 100 | 2 |
| Merovan | 60 | 40 | 100 | 2 |
| Lyr | 60 | 40 | 100 | 2 |
| Ossaria | 60 | 40 | 100 | 2 |
| Caldris | 60 | 40 | 100 | 2 |
| Orthea | 60 | 40 | 100 | 2 |
| Namar | 60 | 40 | 100 | 2 |
| Rothain | 60 | 40 | 100 | 2 |
| Sahr | 60 | 40 | 100 | 2 |
| Averon | 60 | 40 | 100 | 2 |
| Vesper | 60 | 40 | 100 | 2 |
| Dargan | 60 | 40 | 100 | 2 |
| Eldran | 60 | 40 | 100 | 2 |
<!--/TBL-->

Jede Nation bekommt 40 neue Karten: 6 Infanterie, 5 Panzer, 5 Artillerie, 3 Aufklärung, 2 Elite, 3 Unterstützung, 10 Soforteinsatz und 6 Ausrüstung. Davon sind etwa 4–5 Gold und rund 10 Silber, der Rest Bronze. Die Kopienlimits Gold 1 / Silber 2 / Bronze 4 gelten unverändert. Es gibt keine Schützenpanzer-Kategorie.

## Konzeptrolle der Erweiterung
| Nation | Rolle der neuen Karten | Schwerpunkt-Effekte |
|---|---|---|
| Steinmark | Normierte Verwaltungsarmee: berechenbare Linien, Flankendeckung, Aktenwissen | Flankenschutz, Kartenziehen, Feuerüberlegenheit |
| Karsk | Optimierte Stoßtruppen: Durchbruch gegen Infanterie | Bonus gegen Infanterie, Buffs, Ausrüstung |
| Theryn | Glaubenswellen: Abschnittsbuffs, Masse | Abschnittsbuff, mechanisierte Aura |
| Vael | Konzernkrieg: Material, Fabrikpanzer, Direktschaden | Feuerüberlegenheit, Schaden, Führung |
| Merovan | Achsen und Kolonnen: Halten von Wegen | Flankenschutz, Abschnittsbuffs |
| Lyr | Bergkrieg: Verstecken, Hinterhalt | Umgruppieren/Verdecken, Hinterhalt |
| Ossaria | Ahnen und Totenwall: Zähigkeit, Nachziehen beim Fall | Abschnittsbuff, Ziehen |
| Caldris | Schildwall und Sanität | Heilen, Flankenschutz |
| Orthea | Messen und Präzision: Aufklärung, Panzerung ignorieren | Aufklärung, Verteidigung ignorieren |
| Namar | Häfen und Konvois: Tempo, Rabatte, Nachschub | Ziehen, Kostenrabatt |
| Rothain | Erbregimenter und Schwerpunkt | Ausrüstung, Abschnittsbuff |
| Sahr | Flussläufer und Umgehung | Verdecken, Hinterhalt |
| Averon | Netzkrieg und Eigeninitiative | Verdecken, Markieren |
| Vesper | Täuschung, Attrappen, Desinformation | Verdecken, Handeinsicht, Hinterhalt |
| Dargan | Schuld und Vollstreckung | Verteidigung ignorieren, Markieren, Schaden |
| Eldran | Kronlinie und Grenzmark | Flankenschutz, Abschnittsbuff |

Die vollständige Liste aller 640 Karten mit Kurztext, kompletter Regel, Effektcodes und Flavor steht in [NATIONENPOOL_KARTEN.md](NATIONENPOOL_KARTEN.md) (aus den Spieldaten generiert).

## Wie die Karten gebaut sind
- **Quelle:**
  - Die Karten werden in `scripts/nation_pools/nations/*.js` im DSL-Format gepflegt.
  - `node scripts/nation_pools/build.js` erzeugt daraus `web/js/data/sets/types/nation_pools.js` (`DC_SET_TYPES["Nationenpool"]`, Set `set_nation_pool`, IDs `dc_np_<nation>_<name>`).
- **Nur echte Engine-Effekte:**
  - Jede Effektzeile stammt aus einer Whitelist bereits verdrahteter Codes, darunter BUFF, BUFF_SECTION, HEAL, DRAW, DRAW_DISCARD, DEAL_DAMAGE, MARK_OBSERVED, EXTRA_ATTACK, COST_NEXT, EQUIP_*, AUFKLAERUNG, RELOCATE_HIDE, AMBUSH, FLANK_DEF, MECH_AURA, FUEHRUNG_V, IGNORE_DEF, VS_INF, TURN_DRAW, TURN_AP, REDUCE_DAMAGE und AURA_*.
  - Es gibt keinen Fantasietext.
- **Ausführliche Erklärung:**
  - Jede Karte hat neben dem Kurztext ein Feld `rules[]` mit der vollständigen Regel: Ziel, Dauer, Stapelung, Ausnahmen, Handlimit und Mindestkosten.
  - Die Regel erscheint in der Detailansicht am Tisch und im Deckbuilder-Zoom.
- **Artwork:**
  - Es gibt ehrlich keine Bilder: `art_status: 'platzhalter'` und kein `image`.
  - Der Platzhalter ist ein Datenrahmen mit AP, Name, Typ, Nation, Text, Werten und dem Hinweis „Entwurf · noch kein Artwork“.
  - Es gibt keine 404-Fehler und keine fremden Bilder. Das Bildmanifest bleibt unverändert.
- **Deckbuilder:**
  - Filter „Nation (Anzahl + 2 Doktrinen)“, „Neutral“ und Standard „Alle Nationen“. Eine Nation zeigt ihre 100 Karten, ihre 2 Doktrinen und die neutralen Karten.
  - Der Filter ist nur eine Ansicht: Karten aus verschiedenen Nationen können in dasselbe Deck. Die Seitenleiste zeigt die Herkunft (z. B. „Steinmark 30 · Vael 30“).
  - Kopienlimits und Deckprüfung laufen über die bestehende `DC_validateDeck`.

## Tests
- `tests/test_nation_pools.js` (in `npm test`) prüft:
  - 100 Karten je Nation, 2 Doktrinen, Starterdecks 60+2 unverändert und legal;
  - eindeutige IDs und Namen ohne Kollision mit Bestandskarten;
  - Kopienlimits, ein legales gemischtes Deck je Nation, ein nationenübergreifendes 60+2-Deck (auch mit Doktrinen zweier Nationen) und den Platzhalter;
  - das Ausspielen **jeder** neuen Karte über `dispatch`, mit effektspezifischen Prüfungen;
  - den Deckbuilder-Pool und das Platzhalter-/Regel-HTML.
- `scripts/nation_pools/smoke_sim.js` ist ein technischer Bot-gegen-Bot-Smoke-Test mit Decks aus 30 Starter- + 30 Poolkarten. Er sucht nur nach Abstürzen und Hängern und trifft **keine Balance-Aussage**.

## Bekannte Grenzen und Engine-Eigenheiten (nicht geändert)
- **Balance ist ungeprüft.** Die Werte sind am Bestand orientiert, aber nicht ausbalanciert.
- **Artwork fehlt** für alle 640 Karten (Platzhalter).
- **AP von Soforteinsätzen:** Soforteinsätze kosten nach aktueller Regel 0 AP. Der Platzhalter zeigt deshalb 0 an.
- **Auren werden nur beim Einsatz neu berechnet.** Das betrifft FLANK_DEF, MECH_AURA und FUEHRUNG_V. Die Regeltexte sagen das.
- **AURA_FRONT_DEF wird doppelt gezählt.** Der Code wurde deshalb in neuen Karten nicht verwendet.
- **NIEDERHALTEN ist wirkungslos**, weil es zu Beginn des gegnerischen Zugs gelöscht wird. Der Code wurde nicht verwendet.
- **COST_NEXT mit Typ „Unterstützung“ greift nie, mit „Ausrüstung“ setzt er zusätzlich einen dauerhaften Taktikrabatt.** Neue Karten nutzen deshalb nur den Typ „Einheit“, der auch für Unterstützungen gilt.
- **Bestehende Nationen-Einheitenkarten** haben Text, aber oft keine `effects`. Sie laufen nur über die Textauswertung (`_inferEffects`).
- **Bestehende Rothain-Unterstützungen** nutzen AURA_FRONT_DEF, obwohl ihr Text etwas anderes beschreibt.
