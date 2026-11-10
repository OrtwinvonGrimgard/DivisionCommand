# Division Command – Vollständige Projektdokumentation

**Version:** Alpha 0.6a  
**Stand:** November 2026  
**Repository:** DivisionCommand (OrtwinvonGrimgard)

---

## 1. Überblick

**Division Command** ist ein digitales taktisches Sammelkartenspiel (TCG) mit räumlicher Brettkomponente. Spieler führen eine von 16 Nationen auf einer linearen Front (9 Stellungen, aufgeteilt in 3 Abschnitte) mit Support-Reihen und Niemandsland.

Das Spiel verbindet Deckbuilding und reaktive Karteneffekte mit taktischer Positionierung, Abschnittskontrolle und nationenspezifischen Doktrinen. Es richtet sich an Spieler, die mehr räumliche und thematische Tiefe suchen als in klassischen digitalen TCGs, ohne die Länge und Komplexität klassischer Wargames.

**Kernmerkmale:**
- 1v1 (Hotseat, Bot, LAN)
- Lineare Front mit Abschnitten (9 Stellungen, 3 Abschnitte)
- 16 Nationen mit eigener Lore, Kriegsphilosophie und taktischer Doktrin
- Reaktive Trigger und Bedingungen (Verlust, Handlung, Einschränkung, Kette)
- Trophy-Siegmodus (5 SP über Elite, Durchbruch, Doktrin-Ziele)
- Großer Kartenpool: 1.709 Deckkarten (16 × 100 Nationenkarten + neutrale), im Deckbau frei mischbar

---

## 2. Installation und Start

### Voraussetzungen
- Windows 10/11
- Python 3 (mit PATH)

### Start
1. Repository klonen oder ZIP entpacken.
2. `start.bat` ausführen.
3. Für LAN einmal `firewall.bat` als Administrator.
4. Optional: `build.bat` für Windows-EXE.

Der lokale Server (`server.py`) stellt das Spiel im Browser bereit. Hauptmenü enthält Einzelspieler, Hotseat, LAN, Bibliothek und Karteneditor.

---

## 3. Spielmechaniken (detailliert)

### 3.1 Grundaufbau und Ressourcen
- **Front:** 9 nebeneinanderliegende Stellungen (1–9), aufgeteilt in 3 Abschnitte (je 3). Reichweite wird entlang der Linie gemessen (Reichweite 3, 5, 7).
- **Support:** Unterstützungskarten ohne eigene ATK/DEF.
- **Niemandsland:** Zwischen den Fronten.
- **Hand, Deck, Friedhof, Doktrin-Fenster, Stapel, Operationszone.**
- **AP:** 5 pro Zug (Startspieler im ersten Zug 4 als Ausgleich). Jede Karte kostet ihre gedruckten AP, auch Soforteinsätze; Rabatte greifen, nie unter 0. Unbezahlbare Karten sind ausgegraut.
- **Starthand:** 5 Karten.
- **Verdeckt:** Teilweise implementiert.
- **Steilfeuer I–V:** Reichweite der Artillerie, siehe 3.5.

### 3.2 Kartentypen und Rollen
- **Einheiten** (Infanterie, Panzer, Artillerie, Aufklärung, Elite): ATK/DEF, Tags (z. B. gepanzert, flug, mg, artillerie).
- **Unterstützung:** Keine Kampfwerte, wirken über Effekte, Einschränkungen oder Trigger.
- **Ausrüstung:** An Träger gebunden, wirken auf oder über diesen.
- **Soforteinsätze:** Einmalige Effekte (Antwort oder Tempo).
- **Doktrinen:** Permanente Regeln/Boni für das Deck (2 pro Deck).
- **Operationen:** Bleiben liegen bis Bedingung erfüllt (turns, onDestroy, manual).

### 3.3 Reaktive Mechaniken
Design-Ebene (`MECHANICS_REACTIVE.md`):
- Verlust-Trigger (z. B. nach Zerstörung einer Einheit)
- Handlungs-Trigger (nach Angriff oder Aktion)
- Einschränkungen (Gegner etwas nehmen oder teurer machen)
- Ketten-Trigger (weitere Aktion erlauben oder erzwingen)
- Bedingte Boni (nur solange Bedingung erfüllt)

Militärische Engine-Trigger: ON_AIR, ON_ARTILLERY, ON_MG, ON_AT, ON_RECON, SUPPRESS, ON_ENGINEER etc. Bedingungen über `if` (minUnits, section, damaged, enemyLess).

### 3.4 Siegbedingungen (Trophy-Modus, Default)
- 5 SP zum Sieg.
- Quellen: Elite zerstört (+2), Durchbruch (+1, max. 3× pro Abschnitt, Cooldown), Doktrin-Ziel (+1, thematisch).
- Sicherheitsnetz ab Zug 26 (leere Front) / 28 (SP-Vergleich).
- Münzwurf für Startspieler + AP-Ausgleich im ersten Zug.
- Ziel-Median: 14–18 Züge, VP-Siege ≥70 %.

Details und Tuning-Daten: `SIEGBEDINGUNGEN.md`.

### 3.5 Artillerie – Steilfeuer (RULES §7.1)
Artillerie trägt das Tag **Steilfeuer I–V** (Chip auf der Kartenfläche). Die Stufe steuert die Angriffsreichweite entlang der neun Frontstellungen (`dist ≤ floor((Reichweite−1)/2)`):

| Stufe | Reichweite | Ziele |
|-------|------------|-------|
| Steilfeuer I | 3 | Nahunterstützung (Mörser u. ä.) |
| Steilfeuer II | 5 | Standard-Rohrartillerie |
| Steilfeuer III | 7 | Weitreichende Werfer/Raketen |
| Steilfeuer IV | ganze Front | Jede gegnerische Fronteinheit |
| Steilfeuer V | ganze Front + Support | Wie IV, zusätzlich Supportzone; Supportangriff kostet +2 AP (gesamt 3 AP), Frontangriff 1 AP |

- **Fernschuss** (+1 Reichweite) wirkt nur bei Steilfeuer I–III.
- Das frühere Schlüsselwort *Indirektes Feuer* entfällt.
- Fehlt das Tag, gilt die Heuristik Mörser 3 / Artillerie 5 / schwer 7.
- **Gegenangriff:** Eine angegriffene Einheit schlägt zurück, wenn sie den Treffer übersteht. Greift Artillerie an, gibt es keinen Gegenschlag, außer das Ziel könnte die Artillerie mit seiner eigenen Reichweite erreichen.

### 3.6 Reaktionsfenster
- **Feindkontakt:** Der Verteidiger kann einen bezahlbaren Soforteinsatz als Antwort spielen oder weitergeben.
- **Gezeigte Karten**, **SAM** und **Geist** haben immer eine Schließen- bzw. Weitergeben-Aktion. Kein Fenster blockiert die Partie.

---

## 4. Nationen und Lore

16 Nationen mit ausgearbeiteter gesellschaftlicher, philosophischer und taktischer Lore (`LORE_NATIONEN.md`, `KRIEGSPHILOSOPHIEN_NATIONEN.md`, `TAKTIK_NATIONEN.md`, `DOKTRIN_NATIONEN.md`).

| Nation | Thema / Kampfstil | Beispiel-Doktrinen / Motive |
|--------|-------------------|-----------------------------|
| Rothain | Königreich, Krone versagt nie | Unfehlbarkeit, Schwur, Ablösung |
| Karsk | Synthetische Verbesserung, Unrechtsstaat | Implantate, Optimierung, Selbstschaden |
| Theryn | Geschuldete Pflicht | Verlust-Trigger, Einschränkungen |
| Vael | Krieg als Geschäft | Materialersatz, Feuerwalze |
| Merovan | Schieben und halten | Letzte Stellung, Nachschub |
| Lyr | Eid ohne Ort, Lauer | Lauer, Talruf |
| Ossaria | Verlust wird Deckung | Abnutzung, Ahnenschmied |
| Caldris | Schild und Akte | Schildwall, Etappensicherung |
| Orthea | Messung und Unterschrift | Punktfeuer, Einzelschuss |
| Namar | Offener Kai, Entsatz | Entsatzschlag, Letzte Lieferung |
| Steinmark | Verfahren und Freigabe | Methodenschlag, Drei Schlüssel |
| Sahr | Fließen und Umgehen | Flankenstoß, Umgehen |
| Eldran | Auffangen, Krone und Parlament | Auffangkeil, Auffangbefehl |
| Averon | Aufklärungsschlag | Lokalisierung, Aufklärungspanzer |
| Vesper | Scheinschwerpunkt | Scheinschwerpunkt-Keil, Abriegeln |
| Dargan | Schuld und Abschluss | Zielangriff, Abschluss |

Jede Nation hat eigene Doktrinen und thematische Decks. Taktische Lore beschreibt Formationen, Feuerführung, Aufklärung und typische Manöver.

---

## 5. Karten und Content

- Aktuell: 1.746 Karten-IDs, alle gegen die Engine geprüft („Kartentext = Implementierung“, `karten/KARTENPRUEFUNG.md`).
- Decks: 60 Karten + 2 Doktrinen.
- Nationenpools: je Nation 100 spielbare Karten + 2 Doktrinen, in sich schlüssig (Identität, Starterdecks, Filter).
- Deckbau mischt frei: Eigene Decks dürfen Karten aller Nationen und neutrale Karten kombinieren (1.709 Deckkarten); die 2 Doktrinen sind frei aus allen 36 wählbar. Es gelten nur Kopienlimits (Bronze 4 / Silber 2 / Gold 1) und 60 + 2. Details: `regeln/RULES_v0.5_GRUNDKONZEPT.md` §24.0.
- Organisation: Nach Typ (nicht nach Nation) in `web/js/data/sets/types/` und `web/assets/cards/<typ>/`.
- Stand Nov 2026: 100 spielbare Karten pro Nation umgesetzt → 1.600 Nationenkarten + 109 neutrale + 36 Doktrinen.
- Seltenheitsstufen: Bronze / Silber / Gold (mechanisch begründet durch Trigger-Komplexität).
- Jede Karte hat einen knappen Regeltext (≤ 120 Zeichen); Langfassungen stehen verlustfrei in `regeln/KARTEN_SONDERFAELLE.md`.
- Vorderseiten im alpha40-Design: 1024×1428, Motivfenster 40 %, Motive nie gestreckt.

---

## 6. Technische Architektur

- **Frontend:** HTML/CSS/JS (`web/`), Engine in `web/js/engine/engine.js`, Katalog in `catalog.js`.
- **Server:** `server.py` (lokaler Host, LAN auf Port 8765/8766).
- **Karten-Editor:** Eigenes Repo (DC) + Integration.
- **Assets:** Kartenbilder, Porträts, Audio (Menü + Kampf).
- **Simulationen:** Bot-vs-Bot für Balancing (Trophy-Modus, First-Player, Nation-Strength).

**Engine-Hinweis:** Die Regelmaschine wertet Effect-Codes, Trigger und die allgemeine Kartenmechanik `CM` aus. Seit 0.6a ist jede Fähigkeit implementiert (Test `test_card_review.js`).

---

## 7. Aktueller Status (Alpha 0.6a)

**Erledigt:**
- Grundengine, Trophy-Modus, Nationendecks, Lore-Dokumente.
- Umstrukturierung der Karten nach Typ.
- Menü- und Handkarten-Fixes.
- Doktrin-IDs korrigiert (Gefecht startet wieder).
- 0.6a: Kartenprüfung aller 1.746 Karten, alpha40-Design, Steilfeuer I–V, Soforteinsätze mit gedruckten AP, Bibliotheksfilter (Seltenheit, Tags).
- 0.6a: Bot-Hänger behoben (Reaktionsfenster bieten immer eine legale Aktion); Smoke- und Fuzz-Test schlagen bei Hängern fehl.
- 0.6a: Balance aus 11.520 Bot-Partien je Modus. Starterdecks liegen bei 45–53 % (`balance/BALANCE_T237.md`).

**In Arbeit / Offen:**
- Startspielervorteil ≈ 54–56 % (Test mit 3 AP im ersten Zug: ≈ 51 %).
- Gemischte Decks von Ossaria und Dargan unter 45 %.
- Tutorial und Onboarding.
- Roguelike-Vertical-Slice (Fahrplan).

---

## 8. Fahrplan (Zusammenfassung)

Siehe `FAHRPLAN.md` für Details.

1. Regel-Freeze und Siegbedingungen (weitgehend erledigt).
2. Kern-Polish und Tutorial.
3. Roguelike-Vertical-Slice (eine Nation).
4. Steam-Seite, Demo, Next Fest.
5. Nationen-Kampagne.
6. Early Access.
7. Live-Features (PvP, Workshop, Challenges).

---

## 9. Ausführliche Markt-, Wettbewerbs- und Finanzanalyse

### 9.1 Marktumfeld
Digitale TCGs sind etabliert und hochkonzentriert (Hearthstone, Marvel Snap, Legends of Runeterra, MTG Arena). Gleichzeitig wächst die Nachfrage nach Hybrid-Formaten, die Kartenspiel-Mechaniken mit räumlicher oder taktischer Brettkomponente verbinden (Warcaste TCG, Malediction, Summoners). Klassische Wargames auf Divisionsebene bleiben lang und komplex; kürzere, digitale Alternativen sind rar.

Division Command positioniert sich in dieser Nische: zugänglicher als Wargames, taktischer als reine TCGs, mit starker nationenspezifischer Lore.

### 9.2 Zielgruppen (detailliert)
- **Taktische TCG-Spieler (25–40):** Haben Hearthstone/Marvel Snap gespielt, wollen Positionierung und Timing. Geschätzte Größe der aktiven Nische: niedrig fünfstelliger Bereich weltweit.
- **Wargamer mit Zeitbudget:** Suchen kürzere Matches bei thematischer Nähe. Potenzial: Überschneidung mit Steam-Strategie- und Wargame-Community.
- **Lore- und Setting-Fans:** Dunkle, zynische Militär-Fantasy mit gesellschaftlicher Tiefe. Wenig direkte Konkurrenz in diesem Ton.
- **Indie-/Early-Access-Spieler:** Bereit, Alpha zu unterstützen, wenn Mechanik und Setting stimmen.

### 9.3 Wettbewerbsanalyse
| Titel | Stärken | Schwächen aus Sicht DC | Relevanz |
|-------|---------|------------------------|----------|
| Hearthstone / Marvel Snap | Geschwindigkeit, Polishing, Content | Keine räumliche Taktik | Referenz Zugänglichkeit |
| MTG Arena | Trigger-Tiefe | Kein Board | Referenz Effekt-Qualität |
| Warcaste TCG | Doctrine + Zonen | Weniger Nationen/Lore | Direkter Hybrid |
| Malediction / Summoners | TCG + Miniatur-Ästhetik | Fantasy, physisch | Zeigt Hybrid-Nachfrage |
| Klassische Brett-Wargames | Simulationstiefe | Länge, Einstieg | Thematische Nachfrage |

**Differenzierungshebel:** Räumliche Front, nationenspezifische Identität, reaktive Mechaniken als Prinzip, Trophy-Siegbedingungen, dunkle Lore.

### 9.4 Content-Strategie und 1.600 Karten
Die Erweiterung auf 100 Karten pro Nation schafft:
- Echte Vielfalt im Deckbau: nationenreine 60er-Decks aus dem 100er-Pool oder frei gemischte Decks über alle Nationen.
- Langfristige Retention (Rotationen, Limited, Events ohne neue Nationen).
- Basis für kosmetische Monetarisierung und Expansion-Sets.
- Risiko: Engine muss die zusätzlichen Trigger zuverlässig auswerten.

### 9.5 Finanzielle Szenarien und Umsatzhebel

**Annahmen (konservativ, Solo/kleines Team):**
- Preis Early Access: 9,99–14,99 €.
- Conversion Wishlist → Verkauf: 0,3–0,5 (Median-Daten Solo-Indie).
- Wishlist-Ziel für soliden Launch: 3.000–8.000.
- Laufende Kosten: niedrig (Server erst bei Online-PvP relevant).

| Szenario | Verkäufe Jahr 1 | Umsatz (bei 12 €) | Voraussetzungen | Realismus |
|----------|-----------------|-------------------|-----------------|-----------|
| Basis | 500–2.000 | 6.000–24.000 € | Demo, wenig Reichweite | Wahrscheinlich |
| Gut | 5.000–15.000 | 60.000–180.000 € | Starke Demo, Next Fest, klare Hook | Erreichbar |
| Durchbruch | 30.000+ | 360.000+ € | Viral/kuratiert, Creator-Präsenz | Unwahrscheinlich, aber möglich |

**Umsatzhebel (ohne Pay-to-Win):**
- Kosmetik: Kartenrahmen, Full-Art, Porträts, Tisch-Skins (inkl. 2.5D).
- Expansion-Sets: Neue Karten innerhalb Nationen oder neue Doktrinen.
- Battle-Passes / saisonale Belohnungen auf dem großen Pool.
- Später: Print-on-Demand oder Companion.

**Kostenstruktur (grob):**
- Entwicklung: überwiegend Zeit (Solo/kleines Team).
- Assets: Kartenkunst (bereits teilweise generiert), Audio, Porträts.
- Marketing: Steam Direct (100 $), Keys, Trailer.
- Laufend: minimal bis Online-Features.

### 9.6 Chancen und Risiken
**Chancen:** Klare Nische, großer thematisch konsistenter Pool, Hybrid-Trend, dunkle Lore.  
**Risiken:** Kleine Nische, technische Abhängigkeit der Engine, Content-Menge allein reicht nicht.

### 9.7 Fazit der Analyse
Division Command hat ein realistisch erreichbares Marktpotenzial in der Nische zwischen digitalem TCG und leichtem taktischem Wargame. Die Erweiterung auf 1.600 Nationenkarten stärkt Retention und Deckbau. Der entscheidende Erfolgsfaktor bleibt die technische Umsetzung der reaktiven Effekte und die klare Präsentation der taktischen Identität. Bei stabiler Engine und guter Kommunikation sind die „Gut“-Szenarien (5.000–15.000 Verkäufe im ersten Jahr) erreichbar.

---

## 10. Wichtige Dateien

| Datei | Inhalt |
|-------|--------|
| `README.md` / `LIESMICH.txt` | Startanleitung |
| `CHANGELOG.md` (Repo-Wurzel) | Änderungen je Version |
| `regeln/RULES_v0.5_GRUNDKONZEPT.md` | Vollständige Regeln (inkl. §7.1 Steilfeuer) |
| `MECHANICS_REACTIVE.md` | Design der reaktiven Effekte |
| `SIEGBEDINGUNGEN.md` | Trophy-Modus und SP-Quellen |
| `TAKTIK_NATIONEN.md` | Taktische Lore aller Nationen |
| `LORE_NATIONEN.md` | Gesellschaftliche Lore |
| `FAHRPLAN.md` | Entwicklungs- und Release-Plan |
| `web/js/engine/engine.js` | Regelmaschine |
| `web/js/data/catalog.js` | Grundwerte und Regeln |

---

**Ende der Dokumentation**  
Diese Dokumentation fasst den Stand von Alpha 0.6a zusammen und dient als Einstieg für Entwickler, Playtester und Interessierte. Für detaillierte Regeltexte und Balancing-Daten siehe die genannten Markdown-Dateien im Repository.
