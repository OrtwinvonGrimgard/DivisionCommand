# Changelog – Division Command

## Unreleased

**Versionsschema (ab 0.610):** Die Version hat drei Nachkommastellen: `0.xyz`. Wie weit sie springt, richtet sich nach dem Gewicht der Änderung: Fix oder Kleinigkeit +0,001, spürbare Erweiterung +0,002 bis +0,005, großes Feature oder Systemumbau etwa +0,010. Die bisherigen Stände 0.6a bis 0.6e entsprechen 0.601 bis 0.605. Ihre Tags (`v0.6a` … `v0.6e`) bleiben unverändert. Neue Tags heißen `v0.610` usw. Der Sprung 0.605 → 0.610 steht für den Umbau des Bot-Zugs.

## 0.653 Alpha – 25.11.2026

Offiziersporträts als Ölgemälde-Ketten, Ossaria-Mützen-Layer (t345, Gewicht +0,002: spürbare Erweiterung des Grafikbestands). Stehende Freigabe des Projektleiters: fertige Nation direkt als Release pushen. Spielregeln, Kartenwerte, Kartentexte und Balance sind unverändert.

- **Ossaria-Mützen fertig** unter `Division_Command/web/assets/portraits/oel_ketten/ossaria/`: für Platte und Klage, vier Personen, 16 Ränge, **Mützen als eigene RGBA-Layer** (`schirmmuetze`, `feldmuetze`), je Rang mit Fit-Check. Basen bleiben barhaupt. Manifest: `oel_ketten/ossaria/manifest.json` (`headgear: "layers"`). Beschreibung: `docs/technik/PORTRAIT_OEL_KETTEN.md`.
- **Bestand jetzt:** 40 Base-Ketten unverändert (Rothain, Karsk, Averon, Ossaria, Sahr). Mützen-Layer jetzt bei Sahr, Rothain, Averon und Ossaria (je 256 Layer). 11 Nationen fehlen noch. Als Nächstes die Neugenerierung von Karsk (sichtbares Altern nach t344), inkl. Mützen-Layer. Die Verdrahtung in `portraits.js` bleibt unverändert (Teilverdrahtung seit d27dbc1d, nicht in diesem Release stillschweigend erweitert).
- **Ossaria (Bindung Tote):** Knochenkreis / stilisierter Totenschädel; schwarze / holzkohlefarbene Mützen (wie die Uniform), knochen-elfenbeinfarbene Paspel (wie die Uniformbiesen), Abzeichen bleiches Bein oder mattes Silber. Kein christliches Kreuz, kein Adler, keine Kokarde, keine historischen deutschen Kriegsabzeichen, kein Stahlhelm, keine Pickelhaube, kein Barett, kein Schiffchen. Klage ohne Plattenträger (Trauerrock). Ab Stab etwas reichere Elfenbein-Paspel an der Schirmmütze; ab General klarerer, etwas größerer Schädel im einen Band-Abzeichen (Krone kahl). Ab R13 bleibt die große Brust-Gedenkplakette auf der Jacke und wird nicht auf die Krone kopiert. Beim GFM (R16) steht ein vollständig sichtbares Erinnerungs-Schädelmotiv auf dem einen Band-Abzeichen; der Spiegel bleibt kahl.
- **Cache** unverändert `divcmd-alpha49a`: die neuen Bilder stehen nicht in der App-Shell, HTML/JS gehen bereits zuerst ins Netz.

## 0.651 Alpha – 25.11.2026

Offiziersporträts als Ölgemälde-Ketten, Averon-Mützen-Layer (t345, Gewicht +0,002: spürbare Erweiterung des Grafikbestands). Stehende Freigabe des Projektleiters: fertige Nation direkt als Release pushen. Spielregeln, Kartenwerte, Kartentexte und Balance sind unverändert.

- **Averon-Mützen fertig** unter `Division_Command/web/assets/portraits/oel_ketten/averon/`: für Feld und Dienst, vier Personen, 16 Ränge, **Mützen als eigene RGBA-Layer** (`schirmmuetze`, `feldmuetze`), je Rang mit Fit-Check. Basen bleiben barhaupt. Manifest: `oel_ketten/averon/manifest.json` (`headgear: "layers"`). Beschreibung: `docs/technik/PORTRAIT_OEL_KETTEN.md`.
- **Bestand jetzt:** 40 Base-Ketten unverändert (Rothain, Karsk, Averon, Ossaria, Sahr). Mützen-Layer jetzt bei Sahr, Rothain und Averon (je 256 Layer). 11 Nationen fehlen noch. Mützen-Layer für Ossaria sowie die Neugenerierung von Karsk (sichtbares Altern nach t344) folgen als Nächstes. Die Verdrahtung in `portraits.js` bleibt unverändert (Teilverdrahtung seit d27dbc1d, nicht in diesem Release stillschweigend erweitert).
- **Averon (Bindung Zeit):** offenes Auge plus Datenstreifen; olivgrüne Mützen (wie die Uniform), sandfarbene Paspel (wie die sandfarbenen Streifen / das Diensthemd), bleiches Metall bzw. verblasste Datenlinie am Abzeichen. Kein christliches Kreuz, kein Adler, keine Kokarde, keine historischen deutschen Kriegsabzeichen, kein Stahlhelm, keine Pickelhaube, kein Barett, kein Schiffchen. Ab Stab etwas reichere Paspel und klarere Datenlinien; ab General leuchtende blass-cyan/weiße Datenlinien-Akzente. Beim GFM (R16) steht ein vollständig sichtbares überwachendes Auge (Iris, Pupille, Blick klar lesbar) auf dem einen Band-Abzeichen; der Spiegel bleibt kahl.
- **Cache** unverändert `divcmd-alpha49a`: die neuen Bilder stehen nicht in der App-Shell, HTML/JS gehen bereits zuerst ins Netz.

## 0.649 Alpha – 25.11.2026

Offiziersporträts als Ölgemälde-Ketten, Rothain-Mützen-Layer (t345, Gewicht +0,002: spürbare Erweiterung des Grafikbestands). Stehende Freigabe des Projektleiters: fertige Nation direkt als Release pushen. Spielregeln, Kartenwerte, Kartentexte und Balance sind unverändert.

- **Rothain-Mützen fertig** unter `Division_Command/web/assets/portraits/oel_ketten/rothain/`: für Dienstrock und Gala, vier Personen, 16 Ränge, **Mützen als eigene RGBA-Layer** (`schirmmuetze`, `feldmuetze`), je Rang mit Fit-Check. Basen bleiben barhaupt. Manifest: `oel_ketten/manifest.json` (`headgear: "layers"`). Beschreibung: `docs/technik/PORTRAIT_OEL_KETTEN.md`.
- **Bestand jetzt:** 40 Base-Ketten unverändert (Rothain, Karsk, Averon, Ossaria, Sahr). Mützen-Layer jetzt bei Sahr und Rothain (je 256 Layer). 11 Nationen fehlen noch. Mützen-Layer für Averon und Ossaria sowie die Neugenerierung von Karsk (sichtbares Altern nach t344) folgen als Nächstes. Die Verdrahtung in `portraits.js` bleibt unverändert (Teilverdrahtung seit d27dbc1d, nicht in diesem Release stillschweigend erweitert).
- **Rothain (Bindung Erbe):** stilisierte heraldische Krone im gebrochenen bzw. offenen Eidring, karmesinrote Mützenkrone, fast schwarzes Band, silberne Paspel (ab General Gold). Kein christliches Kreuz, kein Adler, keine schwarz-weiß-rote Kokarde, keine historischen deutschen Kriegsabzeichen, kein Stahlhelm, keine Pickelhaube, kein Barett, kein Schiffchen. Ab General reichere Borte und Gold im Abzeichen; kein deutsches Eichenlaub am Schirm. Beim GFM (R16) steht die Krone im geschlossenen, klar lesbaren Ring.
- **Cache** unverändert `divcmd-alpha49a`: die neuen Bilder stehen nicht in der App-Shell, HTML/JS gehen bereits zuerst ins Netz.

## 0.647 Alpha – 24.11.2026

Offiziersporträts als Ölgemälde-Ketten, Sahr (t345, Gewicht +0,002: spürbare Erweiterung des Grafikbestands). Stehende Freigabe des Projektleiters: fertige Nation direkt als Release pushen. Spielregeln, Kartenwerte, Kartentexte und Balance sind unverändert.

- **Sahr fertig** unter `Division_Command/web/assets/portraits/oel_ketten/sahr/`: vier Personen in zwei Uniformen (`wickel`, `offen`), 16 Ränge vom Fähnrich bis zum Generalfeldmarschall (864 × 1152, WebP), Narben (`wange`, `braue`, `kiefer`) und erstmals **Mützen als eigene RGBA-Layer** (`schirmmuetze`, `feldmuetze`), je Rang mit Fit-Check. Basen bleiben barhaupt. Manifest: `oel_ketten/sahr/manifest.json` (`headgear: "layers"`). Beschreibung: `docs/technik/PORTRAIT_OEL_KETTEN.md`.
- **Bestand jetzt:** Rothain (`dienstrock`, `gala`), Karsk (`panzer`, `tech`), Averon (`feld`, `dienst`), Ossaria (`platte`, `klage`) und Sahr (`wickel`, `offen`) — 40 Base-Ketten. 11 Nationen fehlen noch. Mützen-Layer für Rothain, Averon und Ossaria sowie die Neugenerierung von Karsk (sichtbares Altern nach t344) folgen als Nächstes. Die Verdrahtung in `portraits.js` bleibt unverändert (Teilverdrahtung seit d27dbc1d, nicht in diesem Release stillschweigend erweitert).
- **Sahr (Bindung Fluss):** Gesichter altern sichtbar mit dem Rang; GFM alt, Ausdruck fließend, nicht gebrechlich. Kernsymbol fließende Welle; Perlen als Städtezeichen; ab General eine große Wellen-Kommandoplakette, beim GFM das Flusssymbol vollständig sichtbar. Keine Sterne, Adler, Kreuze oder historischen deutschen Kriegsabzeichen.
- **Karsk:** Der aktuelle Bestand bleibt stehen. Nach t344 werden die Ketten später neu generiert: das Gesicht altert sichtbar, unausgereifte Synthetik, Gewebe angegriffen und zunehmend ersetzt.
- **Cache** unverändert `divcmd-alpha49a`: die neuen Bilder stehen nicht in der App-Shell, HTML/JS gehen bereits zuerst ins Netz.

## 0.645 Alpha – 21.11.2026

Offiziersporträts als Ölgemälde-Ketten, Ossaria (t337, Gewicht +0,002: spürbare Erweiterung des Grafikbestands). Freigabe des Projektleiters: „push und weiter machen“. Spielregeln, Kartenwerte, Kartentexte und Balance sind unverändert.

- **Ossaria fertig** unter `Division_Command/web/assets/portraits/oel_ketten/ossaria/`: vier Personen in zwei Uniformen (`platte`, `klage`), 16 Ränge vom Fähnrich bis zum Generalfeldmarschall (864 × 1152, WebP), Narben (`wange`, `braue`, `kiefer`) als eigene Layer. Manifest: `oel_ketten/ossaria/manifest.json`. Beschreibung: `docs/technik/PORTRAIT_OEL_KETTEN.md`.
- **Bestand jetzt:** Rothain (`dienstrock`, `gala`), Karsk (`panzer`, `tech`), Averon (`feld`, `dienst`) und Ossaria (`platte`, `klage`) — 32 Ketten. 12 Nationen fehlen noch. Noch nicht in `portraits.js` oder im Karteneditor verdrahtet.
- **Ossaria (Bindung Tote):** Gesichter altern sichtbar mit dem Rang; GFM alt und von den Toten gezeichnet, nicht gebrechlich. Kernsymbol Knochenkreis / stilisierter Totenschädel (Kragen + Brust; höhere Ränge mehr Knochen und dichtere Kreise); ab General eine große Knochenkreis-/Schädel-Gedenkplakette. Keine christlichen Kreuze.
- **Karsk:** unverändert lore-treu optisch jung (Implantate statt Falten); die Frage des sichtbaren Alterns bleibt offen.
- **Cache** unverändert `divcmd-alpha49a`: die neuen Bilder stehen nicht in der App-Shell, HTML/JS gehen bereits zuerst ins Netz.

## 0.643 Alpha – 21.11.2026

Offiziersporträts als Ölgemälde-Ketten, Averon (t336, Gewicht +0,002: spürbare Erweiterung des Grafikbestands). Freigabe des Projektleiters: „Push, nächste nation“. Spielregeln, Kartenwerte, Kartentexte und Balance sind unverändert.

- **Averon fertig** unter `Division_Command/web/assets/portraits/oel_ketten/averon/`: vier Personen in zwei Uniformen (`feld`, `dienst`), 16 Ränge vom Fähnrich bis zum Generalfeldmarschall (864 × 1152, WebP), Narben (`wange`, `braue`, `kiefer`) als eigene Layer. Manifest: `oel_ketten/averon/manifest.json`. Beschreibung: `docs/technik/PORTRAIT_OEL_KETTEN.md`.
- **Bestand jetzt:** Rothain (`dienstrock`, `gala`), Karsk (`panzer`, `tech`) und Averon (`feld`, `dienst`) — 24 Ketten. 13 Nationen fehlen noch. Noch nicht in `portraits.js` oder im Karteneditor verdrahtet.
- **Averon (Bindung Zeit):** Gesichter altern sichtbar mit dem Rang; GFM alt, aber wachsam. Kernsymbol offenes Auge (keine Sterne, keine Kreuze); ab General eine Kommando-Augenplakette, beim GFM vollständig sichtbares überwachendes Auge auf der Uniform (kein Implantat im Gesicht).
- **Karsk:** unverändert lore-treu optisch jung (Implantate statt Falten); die Frage des sichtbaren Alterns bleibt offen.
- **Cache** unverändert `divcmd-alpha49a`: die neuen Bilder stehen nicht in der App-Shell, HTML/JS gehen bereits zuerst ins Netz.

## 0.641 Alpha – 20.11.2026

Offiziersporträts als Ölgemälde-Ketten (t325, Gewicht +0,005: spürbare Erweiterung des Grafikbestands). Freigabe des Projektleiters: „Mach pause und push erstmal“. Spielregeln, Kartenwerte, Kartentexte und Balance sind unverändert.

- **Ölgemälde-Ketten** unter `Division_Command/web/assets/portraits/oel_ketten/`: je Nation vier Personen (zwei Männer, zwei Frauen) in zwei Uniformen, 16 Ränge vom Fähnrich bis zum Generalfeldmarschall (864 × 1152, WebP). Jede Kette ist ein durchgehendes Gemälde, das Rang für Rang weiterbearbeitet wird. Narben (`wange`, `braue`, `kiefer`) liegen als eigene Layer darüber und sind frei kombinierbar. Beschreibung: `docs/technik/PORTRAIT_OEL_KETTEN.md`.
- **Fertig:** Rothain (`dienstrock`, `gala`) und Karsk (`panzer`, `tech`), zusammen 16 Ketten. 14 Nationen fehlen noch. Averon hat vorerst nur Unterstützung im Baukasten `tools/portraits/oel/chain2_build.py`, keine Bilder.
- **Karsk:** Offiziere bleiben optisch jung, das Alter zeigt sich an Implantaten (lore-treu). Ob sichtbar gealtert werden soll, ist offen.
- **Aufräumen:** Die verworfenen Layer-Ansätze `web/assets/portraits/layers/` und `layers_oel/` sind aus dem Baum entfernt. `docs/technik/PORTRAIT_LAYERS_V2.md` ist als überholt gekennzeichnet.
- **Noch nicht verdrahtet:** `web/js/ui/portraits.js` und der Karteneditor nutzen weiter die älteren Einzelporträts. Deshalb bleibt der Service-Worker-Cache `divcmd-alpha49a` unverändert (HTML/JS bereits Netzwerk zuerst; die neuen Bilder stehen nicht in der App-Shell).

## 0.636 Alpha – 20.11.2026

Neue Kartengrafik (t310–t321, Gewicht +0,010: großer Grafikumbau plus Editor-Funktion). Freigabe des Projektleiters: „push es direkt“. Spielregeln, Kartenwerte und Kartentexte sind unverändert; die Balance ist nicht berührt.

- **Kartenvorderseiten (alle 1.746 neu gerendert):** Titelbanner, AP-Stern und Textfeld-Fassungen im Stil der kleinen Karten; Titelschrift bleibt die alte alpha40-Schrift (Liberation Serif Bold). Einheiten behalten Hintergrund und Textfeld aus Runde 3. Soforteinsatz, Unterstützung und Doktrin bekommen Hintergründe und Textfelder der kleinen Karten (Marmor, Leder, Öl-Blau-Bauplan, Kartenpergament).
- **Prozedurale Texturen (`KartenEditor/tools/texgen.py`):** Marmor, Leder, Stahl, Patina, Pergament, Samt und Ocker-Pergament werden je Karte erzeugt (Rauschen, Verwirbelung, Worley, Pinselstriche; Farben aus den bisherigen Assets). Keine KI-Bilder.
- **Ein festes Muster je Karte:** Der Seed kommt aus der Karten-ID und steht in `scripts/graphics/tex-seeds.json` (1.746 IDs, alle eindeutig). Gleicher Build ergibt bytegleiche Bilder. Neu gewürfelt wird nur ausdrücklich: `render.py --reroll <id>` oder im Karteneditor mit dem Knopf „Muster neu würfeln“. Neue Karten bekommen ihren Seed einmal beim Anlegen.
- **Ausrüstung:** gelbes Ocker-Feld mit hellen Winkeln. Die Zahl der Winkel zeigt die Stufe wie bei den kleinen Karten: Bronze 1, Silber 2, Gold 3. Schrift weiß mit 2-px-Navy-Kontur wie bei Unterstützung und Soforteinsatz, dazu ein weicher Schatten auf dem hellen Ocker.
- **Vorschaubilder:** `faces-v2-thumb/` (300 × 418, WebP). Laufband und Kartenflüge nutzen sie (`dcCardThumb`), die Meldungsbühne zeigt weiter die volle Vorderseite.
- **Tests:** neu `tests/test_tex_seeds_t315.py` (Register vollständig und eindeutig, Determinismus, Muster je Typ verschieden); `verify.py` prüft Seeds und Renderer-Digest.
- Ungenutzte Schrift `KartenEditor/assets/fonts/Cinzel.ttf` entfernt.
- Cache `divcmd-alpha49a`.

## 0.626 Alpha – 19.11.2026

Etappensicherung neu gefasst (t301, Gewicht +0,002). Freigabe des Projektleiters: „Ändere beides“, davon zuerst nur dieser Teil („Push erstmal die Änderung“).

- **Etappensicherung (Caldris):** „Zu Beginn deines Zuges heilt eine beschädigte eigene Einheit, die im letzten Zug nicht angegriffen hat, 1.“ Gewählt wird die mit dem größten Fehlbetrag, bei Gleichstand die erste von links (RULES §8.3). Vorher +1 DEF für alle eigenen Einheiten (seit 0.619 echte DEF) und ein nicht gedruckter Zusatz (+1 DEF im dichtesten eigenen Abschnitt im eigenen Zug), der entfällt. Kartentext, Kurztext, Kartenfläche neu gerendert, Tutorial-Text.
- **Balance (Gate voll, gleiche Seeds):** Caldris Starter 62,5 → 49,9 %, Misch 64,3 → 47,2 %; Doktrin Etappensicherung 56,3 → 46,0 %. Ausnahme Caldris aus der Ausnahmeliste entfernt; Vergleichsstände neu. Neun Varianten gemessen, Bericht `docs/balance/BALANCE_T301.md`.
- **Nicht enthalten:** Bot-Abschnittswahl (Flügel, Playtest-Befund B5). Messung: Der Bot gewinnt damit 76 % gegen den alten, aber das volle Gate wird rot (15 Fehler; Lyr/Vesper ~70 %, Namar/Rothain/Theryn ~35 %). Zurückgestellt bis zur Arbeit an den Operationsplänen.
- **Tests:** neu `test_doctrine_etappen_t301.js`.
- Cache `divcmd-alpha48a`.

## 0.624 Alpha – 18.11.2026

Balance-Grobkorrektur nach der echten Doktrin-DEF und dauerhaftes Balance-Gate (t300, Gewicht +0,005: Doktrinen +0,002, Gate +0,003). Freigabe des Projektleiters für Vorschlag p2 aus `docs/balance/BALANCE_T298.md`.

- **Doktrinen (+0,002), genau wie in t298 als p2 gemessen:**
  - Linienkrieg: +1 DEF nur noch für eigene Einheiten in einem Abschnitt mit drei eigenen Einheiten (vorher +1 für alle, ab zwei +1 weitere).
  - Auffangen: kein Grundbonus mehr; Unterzahl im Abschnitt +1 DEF, Gleichstand +1 ATK.
  - Gepanzerter Fuß: nur ausgerüstete Einheiten, +1 ATK und +1 DEF (vorher +1 DEF für alle, ausgerüstet +1 ATK).
  - Entsatz: im angegriffenen Abschnitt nur noch +1 ATK; Einrücken gibt weiter zusätzlich +1 ATK/+1 DEF bis Zugende.
  - Kartentext, Kurztext, Kartenflächen (4 neu gerendert), `docs/regeln/RULES_v0.5_GRUNDKONZEPT.md` §8.2, `KARTEN_SONDERFAELLE.md`, `DOKTRIN_BALANCE.md`.
- **Balance (Balance-Gate voll, je 10.080 Partien je Deckmodus, 1.024 je Doktrin, gleiche Seeds 0.619 → 0.624):** Nationen-SD Starter 7,33 → 4,59, Misch 9,37 → 6,08; Sahr Misch 74,0 → 56,3 %; Linienkrieg 65,4 → 50,4 %, Entsatz 63,9 → 51,5 %, Auffangen 59,5 → 48,9 %, Gepanzerter Fuß 60,2 → 52,9 %. Startspieler Starter 48,9 %, Misch 57,0 %. Bekannte Ausreißer: Caldris (Etappensicherung) 62,5/64,3 %, Merovan Misch 60,1 %, Bollwerk 63,6 %, Scheinschwerpunkt 63,7 %. Bericht `docs/balance/BALANCE_T300.md`.
- **Balance-Gate (+0,003):** `npm run balance-gate` (voll, lokal) und `npm run balance-gate:quick` (CI-Job `balance-quick`). Feste Seeds, Bericht als Markdown und JSON, Exit 1 bei Nation oder Doktrin außerhalb 40–60 %, Ausnahmeliste `scripts/balance/balance_allowlist.json` (Grund, Ziel, erlaubte Spanne), Vergleichsstand `scripts/balance/baseline/`. Pflicht nach jeder Karten- oder Regeländerung und jeder Erweiterung. Doku `docs/balance/BALANCE_GATE.md`. `sim_doctrines_t298.js` hat dafür feste Seeds je Doktrin (`SIM_DOC_SEED_STRIDE`); beide Harness-Skripte seeden den Bot-Zufall (`Math.random`) je Partie, damit Messungen exakt wiederholbar sind (vorher ±1,5 Punkte Schwankung). `--from` bewertet ein Ergebnis neu, ohne zu messen.
- **Tests:** neu `test_balance_t300.js` (p2-Werte und Texte, Gepanzerter Fuß, Entsatz, Gate-Logik, Ausnahmeliste, Vergleichsstände); `test_doctrine_def_t298.js` an die neuen Werte angepasst.
- **Fix (im selben Paket, vom Gate gefunden):** Schaden aus Soforteinsätzen (z. B. Teurer Meter, Walzenfeuer, Blutzeugnis) zerstört Einheiten mit 0 DEF jetzt sofort; vorher blieben sie bis zur Zugbeginn-Kontrolle mit 0 DEF stehen. Altfehler (auch 0.611). Engine `_reapDeadFront()`, Regressionstest in `test_doctrine_def_t298.js`, dessen Bot-Invariante jetzt gesät läuft. Auf die Balance-Zahlen höchstens ±0,4 Punkte.
- Cache `divcmd-alpha47d`.

## 0.619 Alpha – 18.11.2026

Regelfixes aus dem Playtest vom 18.11. (t298, Gewicht +0,008: DEF +0,005, Überlast +0,002, Kampftext +0,001). Entscheidung des Projektleiters: Doktrin-DEF wird echt.

- **DEF-Boni zählen im Kampf (+0,005):**
  - Vorher addierte `currentAtkDef` viele DEF-Boni nur auf den Anzeigewert (UI, Bot, Logbuch). Schaden und Tod liefen über `inst.def`. Beleg im Playtest `mwmhnwd9`, Eintrag 45: Parlamentsbote zeigte 2/4 und starb an 2 Schaden.
  - Betroffen (nur Anzeige): alle passiven Doktrin-DEF-Boni (Auffangen, Verteilte Stellung, Linienkrieg, Ausharren, Etappensicherung, Gepanzerter Fuß, Normverband, Scheinschwerpunkt, Entsatz, Weiterkämpfen/Sanität, Lauer, Bollwerk, Doktrin-Zeitboni), Doktrin-Aura Tiefenverteidigung (`AURA_STAT`), Ausrüstung mit `BUFF`/`AURA_STAT`-DEF, `PASSIVE_DEF`.
  - Doppelt angezeigt (eingebacken **und** in der Anzeige addiert): Flankenschutz (`FLANK_DEF`, +2) und Satelliten-/Festungs-/General-Auren (`AURA_FRONT_DEF`, `AURA_FRONT_DEF_GEN`, +2). Ihre alte Buchung lief nur beim Ausspielen/Verschieben und blieb nach dem Tod des Nachbarn stehen.
  - Jetzt: `doctrine_runtime.js` backt die Differenz Anzeige − `inst.def` als „Lage-DEF“ in `inst.def`/`defMax` ein (`flags.dynDef`, Muster wie `_cmRecompute`), nach jeder Aktion und vor jedem Schaden. Anzeige = echte DEF. Fällt die Bedingung weg, sinkt die DEF um den Bonus, nie unter 1 (RULES §8.1). Flanke und Auren laufen über denselben Weg.
  - Unverändert (waren schon echt): Ausrüstung `EQUIP_STAT`/`CARRIER_DEF`, Schlüsselwörter (Sicherung, Zähigkeit, Überlast), CM-Karteneffekte, Mech-/Führungsauren, Soforteinsatz-Buffs.
- **Überlast zerstört (+0,002):** `_destroy` bekam an drei Stellen (Überlast, Religiöser Eifer, Zugbeginn-Kontrolle) `frontList`-Einträge ohne Spieler und brach still ab; Einheiten blieben mit DEF 0 stehen (Playtest Eintrag 53/54). Alle drei Stellen korrigiert, `_destroy` schlägt den Fundort jetzt selbst nach. Alle 18 Überlast-Karten geprüft (+2 ATK, +1 DEF, 1 Schaden am Zugende, bei DEF 0 zerstört).
- **Kampftext (+0,001):** „erhält N“ steht nur noch bei tatsächlichem Gegen- oder Erstschlag (vorher auch, wenn das Ziel fiel; Einträge 12 und 16).
- **Balance (Bot gegen Bot, je 10.080 Partien, gleiche Seeds):** siehe `docs/balance/BALANCE_T298.md`. Die Nationen streuen deutlich stärker (Mischdecks SD 2,1 → 9,5 Punkte; Sahr 75,2 %, Averon 38,4 %). Startspieler Misch 56,9 → 57,6 %. **Keine Werte geändert** (Auftrag); Vorschlag mit Messung im Bericht.
- **Tests:** `test_doctrine_def_t298.js` (Playtest-Fall, Auffangen/Verteilte Stellung/Linienkrieg/Flanke, Invariante Anzeige = echte DEF über 24 Bot-Partien, 18 Überlast-Karten, Eifer, Zugbeginn, Kampftext). `test_effects.js` gleicht Lage-DEF beim Aufstellen ab.
- **Werkzeug:** Mess-Harness als `scripts/balance/sim_nations_t298.js`, `sim_doctrines_t298.js`, `merge_sim_t298.js` eingecheckt (vorher nur `tmp_t283/`).
- Cache `divcmd-alpha47c`.

## 0.611 Alpha – 18.11.2026

Fix (+0,001, t296): Die Audio-Schleife am Spieltisch ist behoben.

- **Ursache:** `stop()` in `audio-data.js` setzte `currentTime = 0` auch auf bereits pausierte Elemente. In Chromium löst das `seeked` und `canplay` aus; `index.html` ruft bei `canplay` `applyAudio` auf, das über `playTable` wieder `stop()` ruft. Ergebnis: etwa 33.000–38.000 Schreibzugriffe pro Sekunde auf `localStorage` (`dc_music`, `dc_vol`) am Tisch, die Timer liefen verspätet. Die Schleife gab es schon in 0.605 (= 0.6e).
- **Fix:**
  - `stop()` pausiert und setzt zurück nur bei Bedarf.
  - `applyAudio` speichert die Audio-Einstellungen nur noch bei Änderung (`persistAudio`).
  - `keepBgm` startet die Titelmusik am Tisch nicht mehr neu (das hatte die Schleife bisher verdeckt).
- **Musik unverändert:** Menü- und Setup-Musik, Kampfstück am Tisch, Lautstärke und An/Aus werden wie zuvor gespeichert.
- **Tests:** `test_audio_loop_t296.js` (in `npm test`) und `npm run audio-play` (zählt Schreibzugriffe am Tisch, höchstens 20 in 3 s; gemessen 0).
- Cache `divcmd-alpha47b`. Bericht: `Division_Command/docs/technik/AUDIO_SCHLEIFE_T296.md`.

## 0.610 Alpha – 17.11.2026

Kleiner Schritt nach 0.605 (= 0.6e, t291): Der Bot spielt seinen Zug Schritt für Schritt.

- **Bot-Zug in Einzelschritten:**
  - Der Bot führt eine Aktion aus, zeigt sie und denkt kurz nach. Danach plant er neu.
  - Angezeigt wird jede Aktion im Ticker oben links mit Kartenbild. Gespielte Karte und Ziel leuchten auf.
  - Die Denkpause schwankt je nach Tempo:
    - langsam: 1,1–2 s
    - normal: 0,6–1,4 s (Standard)
    - schnell: 0,2–0,45 s
  - Folgewahlen (Ziel, Feld) laufen kürzer. Der Regler heißt jetzt „Pause bei Folgewahl“.
  - Zu Beginn deines Zuges gibt es kein langes Nachholen mehr. Das Protokoll enthält weiter alles.
- **Reaktionsfenster:**
  - Nach jeder abgeschlossenen Bot-Aktion prüft das Spiel, ob du einen Soforteinsatz aus deiner AP-Reserve legal spielen kannst. Die Prüfung läuft als Trockenlauf auf einer Kopie der Engine. Karten „nur im eigenen Zug“ und Karten ohne Ziel fallen weg.
  - Gibt es einen, hält der Bot an und zeigt die Karten. Du kannst eine spielen, „Weiter“ wählen oder „In diesem Zug nicht mehr anhalten“.
  - Die Engine-Fenster (Feindkontakt, SAM, Geistiger Vorsprung, taktische Fenster) bleiben wie bisher.
- **Optionen** (Spielablauf und im Spiel):
  - „Bot-Tempo“ (`dc_bot_tempo`)
  - „Reaktionsfenster“ (`dc_bot_react`): immer anhalten, 5 s, nie
  - Der Reset löscht beide.
- **Robustheit:**
  - Ein einziger Planer mit Token: Der Bot kann nicht doppelt ziehen.
  - Der Bot pausiert, solange der Tab im Hintergrund ist, Optionen oder die Kartenansicht offen sind oder du gerade eine Karte angewählt hast.
  - Partieende oder Verlassen mitten im Bot-Zug verwerfen Plan und Fenster.
  - Ereignisse tragen eine laufende Nummer (`state.evN`). Vorher übersah die Oberfläche neue Ereignisse, sobald das Protokoll 80 Einträge erreicht hatte.
  - Live-Meldungen tippen nach verstrichener Zeit statt mit einem Timer je Zeichen. Unter Last zogen sie sich vorher über Minuten.
  - Eine Live-Meldung zeigt höchstens die letzten 6 Einträge. Der Bot wartet Meldungen nur in seinem eigenen Zug ab, im Zug des Menschen antwortet er sofort wie bisher.
- **Unverändert:**
  - Sim, Fuzz, Smoke und Balance laufen headless ohne Pausen. Der Hash aus 80 Partien mit fester Saat ist vorher und nachher identisch (40 : 40). Damit gibt es keine Balanceverschiebung.
  - Tutorial, Hotseat und LAN.
- **Neu:**
  - `web/js/ai/bot-seq.js`
  - Tests `tests/test_botseq_t291.js` (in `npm test`) und `tests/playwright_botseq_t291.mjs` (`npm run botseq-play`)
  - Doku `docs/technik/BOT_SEQUENZ_T291.md`
- `ui-play` läuft mit schnellem Bot-Tempo. Die Hilfe verweist auf `docs/current_state.md`. Cache `divcmd-alpha47a`.

- **CI (t289):** GitHub Actions aktiv (`.github/workflows/ci.yml`): bei Push/PR auf `main` und manuell `npm test`, `verify.py`, Engine-Fuzz und Text-Engine-Audit. `package-lock.json` wird jetzt versioniert (`npm ci`). Die Vorlage `docs/technik/ci-workflow.yml` ist entfernt; Beschreibung in `docs/technik/CI.md`. Die Browser-Gates bleiben lokal. Kein Spielcode geändert.
- **Doku (t286):** Vertical-Slice-Verfahren und zentrale Übersicht [`Division_Command/docs/current_state.md`](Division_Command/docs/current_state.md): 15 Slices (VS-01 bis VS-15) mit Status, Gates, offenen Punkten, priorisierten nächsten Schritten, „Zuletzt gemacht“ und Definition of Done. README(s), Docs-Index, Entwicklungs- und Archiv-Übersicht, Projektdokumentation §7/§8/§10 und die `STATUS_T*.md` verweisen darauf. Kein Code geändert, keine Versionsänderung.

## 0.6e Alpha – 13.11.2026

Kleiner Schritt nach 0.6d (t285).

- **KI und aktive Doktrin-Fähigkeiten:**
  - `listActions` bietet jetzt Schutzwall (Bollwerk), Feldreparatur und Überschuss (Sicherer Nachschub) sowie den Stellungswechsel an.
  - Der Bot nutzt die Feldreparatur vor den Angriffen (98 % der möglichen Züge) und Schutzwall mit übrigen AP (28 %, gewollt).
  - Überschuss nutzt der Bot, wenn sich die zweite Fähigkeit nach der Vorausschau lohnt. Mit 5 AP kommt das kaum vor.
  - Bei Unterstützungen mit zwei Fähigkeiten (Kommunikationszentrum) prüft der Bot jede einzeln.
- **Regelkonform:**
  - Feldreparatur: kostenlos, 1× pro eigenem Zug, nur beschädigte gepanzerte Einheiten. Vorher heilte die Engine 2 an jedem Ziel.
  - Überschuss: Eine Unterstützung, die ihre Fähigkeit in diesem Zug genutzt hat, wird für 2 AP wieder bereit. Vorher zog die Engine nur die AP ab.
- **Doktrinen:**
  - Bollwerk: zusätzlich +1 ATK für Einheiten mit mindestens 6 DEF. Im Spiegelmatch 42,5 → 50,4 %.
  - Sicherer Nachschub: Die Feldreparatur heilt alle beschädigten gepanzerten Einheiten um 2. Im Spiegelmatch 46,7 → 48,7 %.
  - Die Flächen beider Doktrinen sind neu gerendert.
- **Nationen:** unverändert. Gepoolt sind es vorher und nachher je 20 160 Partien, die größte Abweichung liegt bei 2,8 Punkten (Rauschen).
- **Stellungswechsel:** Die KI-Nutzung ist gebaut, aber im Standard aus (`kwMove: 0`). Eingeschaltet verschiebt sie die Nationen um bis zu 16 Punkte (Vesper, Sahr, Merovan, Lyr). Das bleibt für eine eigene Runde offen.
- **Startspieler-Vorteil:** bleibt bewusst unverändert.
- Details: `docs/balance/BALANCE_T285.md`, Sonderfälle in `docs/regeln/KARTEN_SONDERFAELLE.md`. Neuer Test: `tests/test_doctrine_actives_t285.js`. Cache `divcmd-alpha46a`.

## 0.6d Alpha – 13.11.2026

Kleiner Schritt nach 0.6c (t284).

- **Zwillinge:**
  - 157 Karten unterscheiden sich jetzt in Werten oder AP-Stufe, entweder durch einen Punkt-Tausch nach der Nationsneigung oder durch eine AP-Stufe im Wertband.
  - Gruppen mit gleichen Werten, gleichem Text und gleichen Schlüsselwörtern: 3 → 0, geprüft von `tests/test_twins_t284.js`.
  - Gruppen mit gleichen Werten und gleichem Text: 119 → 24. Diese 24 Gruppen unterscheiden sich nur über gedruckte Schlüsselwörter (Liste in `docs/regeln/ZWILLINGE_T284.md`).
  - Die neutralen Alpha-Ausgaben Sammelpunkt, Glaubensbanner und Marschbefehl haben jetzt eine andere AP als die Theryn-Ausgaben.
- **Doktrinen:**
  - Stoßtrupp: Infanterie +2 ATK.
  - Lauer: frisch eingerückte Einheiten bekommen den Bonus nur, wenn sie Infanterie sind.
  - Gegenstoß: Der Bonus gilt erst im nächsten eigenen Zug.
- **Nationen:**
  - Starterdeck-Tausche auf den Plätzen 31–60 (Ossaria, Namar, Karsk, Lyr, Caldris) und Poolwerte ±1.
  - Starterdecks: 44,0–56,8 % → 47,4–53,6 %, Streuung 3,1 → 1,6 Punkte.
  - Mischdecks: 42,9–57,9 % → 44,6–54,1 %, Streuung 3,8 → 2,1 Punkte.
- **Startspieler:**
  - Der Vorteil in Mischdecks (~57 %) kommt von der Einheitendichte.
  - Zwei Regelvorschläge sind nur dokumentiert, nicht eingebaut.
  - Details: `docs/balance/BALANCE_T284.md`.
- **Hotseat:** Der Endbildschirm zeigt neutral „SIEGER: Name“ statt GEWONNEN/VERLOREN aus Sicht von Sitz 0, und es gibt keinen Sieg- oder Niederlage-Klang.
- **Layout:** Bei 1024×576 blendet der Tisch im ersten Zug, wenn der Mulligan-Knopf sichtbar ist, den Bedienhinweis aus. So bleibt das Protokoll im Fenster.
- **Doktrin-Flächen** Stoßtrupp, Lauer und Gegenstoß zeigen die aktuellen Regeln. Die Kurztexte waren schon vor 0.6d veraltet.
- **Kartenflächen** neu gerendert (alpha40), Cache `divcmd-alpha45a`.

## 0.6c Alpha – 12.11.2026

Neue Buchstabenversion. Sie bündelt alles seit 0.6b (t244–t283). Bewusst keine 0.7: Die Balance liegt noch nicht im Zielkorridor, und ein menschlicher Playtest fehlt.

- **Befunde der Analyse t282 umgesetzt (t283):**
  - **LAN:**
    - Jeder Spieler bekommt nur seine eigene Sicht. Hand, Deck und verdeckte Karten des Gegners werden nicht übertragen (`getStateFor`/`logFor`).
    - `server.py` ist gehärtet: nur LAN, ändernde Endpunkte nur von derselben Herkunft, Größenlimit, WebSocket-Origin geprüft, Spielzüge nur von Sitzinhabern.
    - Der Gast hängt den Spieltisch ein. Der Host-Port lässt sich im Beitrittsfeld angeben.
    - Neuer Browser-Test mit zwei Clients: `npm run lan-play`.
  - **Regeln:**
    - RULES §20.1: Übrige AP verfallen zu Beginn des eigenen Zuges und sind nur Reaktionsreserve.
    - Mulligan nach §23.4 für 1 AP, einmal, im ersten eigenen Zug vor jeder anderen Aktion. Abweichend von §23.4 zieht man eine neue Hand von 5 statt 7 Karten, weil die Starthand der Engine 5 Karten hat.
    - Decks müssen genau 60 Karten und 2 Doktrinen haben und die Kopienlimits einhalten. Das wird beim Speichern und beim Partiestart erzwungen (`DC_checkDeckForMatch`). Zufallsdecks haben 60 Karten.
  - **Balance:**
    - Alle Karten mit 6+ AP kosten jetzt 5 AP (11 Karten).
    - Doktrinen überarbeitet: Bollwerk (+1 DEF, Schutzwall vollständig), Gepanzerter Fuß, Marsch aus dem Vollen, Normverband (Fehler bei `def: 0` behoben), Gegenstoß, Stoßtrupp.
    - 67 Poolwerte geändert, Starterdecks nur auf den Plätzen 31–60 angepasst.
    - Mischdecks 39,0–58,7 % → 43,8–58,2 % (Streuung 6,6 → 4,6 Punkte), Starterdecks 42,5–55,7 % → 43,8–56,3 %, Doktrinen 38–58 % → etwa 42–56 %. Details: `docs/balance/BALANCE_T283.md`.
  - **Oberfläche:**
    - 2,5D-Handkarten werden bei Hover und Fokus vergrößert (auch bei 1024 px lesbar) und sind per Tastatur bedienbar.
    - Die Knöpfe unter „Weitere Befehle“ (Frieden usw.) brechen um statt abgeschnitten zu werden.
    - Die Tutorial-Box dockt in kleinen Fenstern seitlich an.
    - Layout- und Screens-Test prüfen jetzt auch abgeschnittene Knöpfe.
  - **Karten:**
    - Die Erstschadenschutz-Wirkung steht wieder auf 14 Karten. Die Kartenflächen sind neu gerendert (alpha40).
    - Alle 9 ungelesenen Effektparameter werden jetzt gelesen; der Audit meldet 0.
    - 5 mechanische Zwillinge haben eigene Werte.
    - 98 Alpha-Karten tragen eine ausdrückliche Seltenheit.
    - Neuer Test `tests/test_cards_t283.js`; Details in `docs/karten/ZWILLINGE_T283.md`.
  - **Code:**
    - 59 leere `catch` protokollieren jetzt.
    - Risikoarmes Engine-Refactoring: `_defHas`.
    - CI-Vorlage für GitHub Actions (npm test, verify, fuzz, audit) unter `docs/technik/ci-workflow.yml`. Zum Aktivieren nach `.github/workflows/ci.yml` kopieren; Grok Bot fehlt dafür die GitHub-Berechtigung `workflow`.
    - Repo-Größe und LFS dokumentiert, ohne die Historie umzuschreiben: `docs/technik/REPO_GROESSE_LFS_T283.md`.
  - **Version 0.6c** überall: VERSION, version.js, file_version_info 0.6.2.0, Server-Banner (liest jetzt VERSION; vorher „0.21 Alpha“), Hilfe, README, LIESMICH. Cache `divcmd-alpha44a`.

- **Bibliothek: In der großen Kartenansicht blättern (t281):**
  - Unter dem Kartenbild gibt es jetzt die Pfeilknöpfe ‹ › mit Positionsanzeige, z. B. „12 / 348“. Auch die Pfeiltasten ← → blättern. In Textfeldern bleiben die Pfeiltasten beim Feld.
  - Geblättert wird in der aktuellen Liste, also mit aktivem Reiter, Suche und Tags und in deren Reihenfolge. Der Detailbereich rechts und die Deck-Aktionen beziehen sich auf die gerade gezeigte Karte.
  - An der ersten und letzten Karte ist der Knopf gesperrt, es gibt keinen Umlauf. Esc schließt weiterhin nur die Ansicht.
  - Kurzer Übergang, der „reduced motion“ beachtet. Auf Touchgeräten kann man über das Bild wischen. Die Nachbarbilder werden vorgeladen.
  - Die Kartenansicht in der Partie ist unverändert.
  - Tests: `tests/test_libzoom_t281.js` (in `npm test`) und `npm run libzoom-play` (Browser, 1024/1280/1920).
  - Korrektur: Lange Doktrinnamen wie „Etappensicherung“ werden bei 1024 px nicht mehr mitten im Wort umbrochen, sondern deutsch getrennt („Etappensi-cherung“).
  - Cache `divcmd-alpha42c`.
- **Alle Bildschirme überarbeitet (t280, Stufe 2): Tisch, Kartenansicht, Rückfragen, Tutorial:**
  - Messung vorher (Bildschirm-Prüfung nach Stufe 1): 14 Befunde.
    - 2,5D: „Hauptmenü“, „Aufgeben“ und „Playtest“ lagen über den Reitern Protokoll/Chat. Das waren unsichtbare Knöpfe im zugeklappten „Weitere Befehle“, die trotzdem Platz belegten.
    - 2,5D bei 1024 px: „Zugende“ und „Optionen“ ragten 8 px aus dem Fenster.
    - Tutorial-Einstieg: Der Knopf „Tutorial überspringen“ lag 12 px über dem Titel.
    - Bibliothek bei 1024 px: Die Tag-Auswahl klappte links aus dem Bild.
  - Flacher Tisch im Designsystem (`web/css/ui-table.css`, nur Optik, das t279-Raster bleibt):
    - generierte Filzbespannung mit Höhenlinien (`assets/ui/table-felt.webp`)
    - eingelassene Felder mit roter Gegner- und goldener eigener Seite
    - Niemandsland als Band mit Frontlinie
    - Handablage aus Leder (`assets/ui/hand-leather.webp`)
    - gekörnte Panels und Spielerplaketten mit Seitenfarbe; die Plakette des aktiven Spielers pulsiert sanft, außer bei „reduced motion“
    - Protokoll-Reiter, Zugtimer und Spaltentitel im neuen Stil
  - 2,5D-Ansicht:
    - Kamera-Leiste als Plakette.
    - Die Gegnerplakette liegt nicht mehr unter der Leiste.
    - Die Befehlsknöpfe passen in schmale Spalten.
    - Zugeklappte Befehle sind wirklich ausgeblendet.
  - Große Kartenansicht (Bibliothek und Partie):
    - Panel mit Eckzierden (`assets/ui/corner-tr|bl|br.svg`), Werte als Plaketten, runde Schlagwort-Chips.
    - In der Bibliothek ist „Zum Deck hinzufügen“ die Hauptaktion. „In Bibliothek Ablegen“ heißt jetzt „Aus dem Deck nehmen“, und Schließen ist eine Nebenaktion.
    - Esc schließt nur die Ansicht statt die ganze Bibliothek.
  - Rückfragen „Spielstand zurücksetzen“: Panel mit Warnzeichen und Eckzierden. Esc gehört dem Dialog, die Kennung `#dc-reset` war vorher falsch.
  - Tutorial-Box:
    - Eckzierden, Körnung, gerahmtes Porträt und runder Fortschrittsbalken.
    - Der Titel hält Abstand zum Überspringen-Knopf.
  - Tests: `tests/test_ui_table_t280b.js` (npm test). Cache `divcmd-alpha42b`.

- **Alle Bildschirme überarbeitet (t280, Stufe 1):**
  - Messung vorher (25 Ansichten bei 1024×576, 1280×720 und 1920×1080): 109 Befunde. Im Hauptmenü lagen die neun Knöpfe auf dem Logo, der oberste war abgeschnitten. Der Startknopf lag auf dem Sternenemblem. In der Offiziersakte füllte das Porträt bei 576 px den Schirm, Felder und „Akte anlegen“ lagen darunter. Einzelspieler hatte weiße Standardfelder, „Bereit“ und „Gefecht beginnen“ lagen unter dem Rand. Der Bot-Dialog lag im Seitenfluss und hatte bei Werkseinstellung keinen Ausgang. Die Optionen hatten winzige Reiter mit grünem Aktivzustand. Der Rückblick „Handlung“ lief unten aus dem Bild. Der Bibliothekshinweis beschrieb Klick und Doppelklick vertauscht.
  - Designsystem (`docs/UI_DESIGN_T280.md`, `web/css/ui-system.css`): Abstände, Schriftstufen, Farben, Knöpfe (Haupt/Neben/Gefahr/Zurück mit Hover, Fokusring, gesperrt), dunkle Felder, goldene Regler mit Füllstand, Kästchen, Panels, Bewegung mit reduced-motion.
  - `web/css/ui-screens.css` und `web/js/ui/ui-screens.js`:
    - Hauptmenü mit kleinerem Logo oben links, Kommandopanel links (Symbole, Kurzbeschreibungen, Nebenpunkte 2×2) und Porträt rechts.
    - Arbeitsseiten als Panel mit Titelleiste und klebender Aktionsleiste (Zurück links, Hauptaktion rechts). Auf großen Schirmen wachsen die Panels mit. Esc = Zurück.
    - Einzelspieler mit Bildkarten „Gegen die KI“ und „Hotseat“, zweispaltigem Formular und Hinweis, wenn kein zweiter Offizier existiert. Dabei behoben: Das zweite `onchange` hatte das Ein- und Ausblenden der Hotseat- und Bot-Zeilen überschrieben.
    - Bot-Dialog als Overlay, Speichern/Zurücksetzen/Abbrechen immer sichtbar, Esc schließt.
    - LAN mit Bildband, Suchzeile über der Aktionsleiste und Lobby-Sitzen als Karten.
    - Offiziersakte und Benutzer: Formular links, Porträt rechts, Kacheln ohne überlaufende Namen, „Akte speichern“ in der Aktionsleiste.
    - Optionen mit Reiterleiste samt Symbolen, Einstellungszeilen und Gefahrenzone.
    - Playtest-Fenster und Partie-Optionen im selben Dialogstil. Der Rückblick scrollt.
    - Endbildschirm mit Sieg- oder Niederlagengemälde.
  - Bibliothek: Abzeichen „im Deck / erlaubt“ je Karte in Seltenheitsfarbe (Gold 1, Silber 2, Bronze 4, „voll“) und Fortschrittsbalken 60 Karten + 2 Doktrinen mit Restangabe. Die Limitmeldung ist deutsch und fällt auf. Leerer Filter mit „Filter zurücksetzen“. Der Hinweis passt zur Bedienung.
  - Generierte Grafiken (WebP, im Offline-Cache): `assets/ui/mode-ki`, `mode-hotseat`, `mode-lan` (960×540), `end-victory`, `end-defeat` (1280×720), `panel-grain`; dazu `title-back-poster.webp` (Standbild des Titelvideos) sowie die SVGs `icons.svg` (18 Symbole), `corner.svg` und `search.svg`.
  - Tests: `tests/test_ui_screens_t280.js` (npm test) und `tests/playwright_screens_t280.mjs` (`npm run screens-test`: 25 Ansichten × 3 Größen, Überlappung, abgeschnittener Text, außerhalb, Hauptaktion sichtbar). Cache `divcmd-alpha42a`.

- **Tisch aufgeräumt (t279):**
  - Messung vorher (6 Fenstergrößen von 1024×576 bis 2560×1440, Partie mit eigenem Zug und Gegnerzug, Tutorial, Feindkontakt): 755 Befunde. Der Musiktitel lag absolut über der ganzen Kopfzeile (Logo, Zuganzeige, beide Statuszeilen). Hand, eigene Stapel, Doktrinen und Name ragten unten aus dem Bild. Das schwebende Protokoll und das Versionsschild „Alpha 0.6b“ deckten Felder ab. Die Befehlsspalte rutschte unter 1100 px unter den Tisch. Schlüsselwörter auf Feldern waren abgeschnitten.
  - Neue Kopfleiste in drei Zonen: links Logo mit Version, in der Mitte Partie (Gefecht gegen KI / Hotseat / LAN / Grundausbildung, ggf. Trophäen-Modus) mit Musiktitel und „Zug X · am Zug: …“. Rechts je Spieler eine Plakette mit Name, „am Zug“-Marke, AP als Rauten, SP-Balken und Hand/Deck. Die eigene Plakette steht außen, der aktive Spieler leuchtet gold. Auf großen Bildschirmen wächst die Leiste mit.
  - Flacher Tisch als festes Höhenraster aus der Fensterhöhe (Gegnerleiste, Support, Front, Niemandsland, eigene Front, eigener Support, Handleiste). Alles passt ohne Scrollen ins Bild, die Handkarten sind größer als vorher. Die Zonennamen stehen hochkant in einer Randleiste. Gegnerstapel und Ziele haben einen eigenen Platz rechts in der Gegnerleiste.
  - Das Protokoll ist in der rechten Befehlsspalte angedockt, weiter über „Protokoll“ ein- und ausblendbar. Das Versionsschild ist im Spiel aus. Schlüsselwörter brechen um. „Weitere Befehle“ sind zweispaltig. Die 2.5D-Ansicht bleibt unverändert.
  - Neu `web/css/table-hud.css`, Plaketten und Zonenbeschriftung in `app.js` (`hudPlate`, `hudScenarioName`). Tests: `tests/test_table_hud_t279.js` (npm test) und `tests/playwright_layout_t279.mjs` (`npm run layout-test`: keine überlappenden HUD-Boxen, kein abgeschnittener Text, nichts außerhalb des Fensters bei allen 6 Größen). Cache `divcmd-alpha41f`.

- **Spielstand zurücksetzen (t278):**
  - Neuer Knopf „Spielstand zurücksetzen …“ in Optionen › System, dazu klein „Speicher löschen“ unten rechts auf dem Startbildschirm. Zweistufige Bestätigung im Spielstil, die auflistet, was gelöscht wird.
  - Gelöscht werden alle Speicherschlüssel mit Präfix `dc_` in localStorage und sessionStorage (Offiziersakten, aktiver Benutzer, Decks, Einstellungen, Audio, Tempo, Kamera, Tutorial-Merker …) sowie die IndexedDB `dc_playtest`. Fremde Schlüssel desselben Ursprungs und die Offline-Caches (nur Programmdateien und Bilder) bleiben. Danach lädt das Spiel neu auf den Startbildschirm; „Spiel starten“ öffnet wieder das Tutorial.
  - Neu `web/js/ui/reset.js`, `web/css/reset.css`, `DCPlayStore.closeDb()`; Tests `tests/test_reset_t278.js` (npm test, prüft auch, dass jeder Speicherschlüssel im Code mit `dc_` beginnt) und `tests/playwright_reset_t278.mjs` (`npm run reset-play`).
  - Hilfe: Optionen-Eintrag; AP-Text an die Engine angepasst (Rest-AP nur als Reaktionsreserve im gegnerischen Zug, zu Beginn des eigenen Zuges wieder 5). Cache `divcmd-alpha41e`.

- **Tutorial „Grundausbildung“ (t275):**
  - Beim allerersten „Spiel starten“ (kein Merker, noch kein Benutzer) läuft zuerst ein geführtes Übungsgefecht als eigene Instanz, danach Offiziersakte bzw. Hauptmenü. Ab dem zweiten Start direkt ins Menü.
  - 6 Kapitel, 25 Schritte, etwa 10 Minuten, mit Ausbilder Hauptmann Kessler: Ziel 5 SP, Front, AP (beide 5 in Zug 1), Hand, Einheit legen, Eingraben, Angriff und Gegenschlag, Steilfeuer I–V, AP-Reserve, Zugende, Feindkontakt (Deckung suchen, 2 AP wie aufgedruckt), Doktrinen, Support, Ausrüstung, Soforteinsatz, Sieg über die Elite, Deckbau (60 + 2, Nationen mischbar, Gold 1 · Silber 2 · Bronze 4, Elite als Merkmal).
  - Echte Engine-Regeln mit festen Decks und Zugfolge; falsche Aktionen werden mit Hinweis geblockt. Spotlight mit Ausschnitt, Pulsrahmen, wandernder Pfeil, schwebende Schadenszahlen und SP, Siegbanner, Töne aus dem vorhandenen Satz, „Zurück“ und „Tutorial überspringen“ (mit Rückfrage, auch Esc).
  - Eigenständig: eigene Engine, kein Timer, kein Playtest-Protokoll, keine Benutzer/Decks/Spielstände; einziger Speicher `dc_tutorial_done`. Wiederholen über den neuen Menüpunkt „Tutorial“.
  - Neu `web/js/tutorial/scenario.js`, `web/js/ui/tutorial.js`, `web/css/tutorial.css`, Haken in `app.js`, Design `docs/TUTORIAL_T275.md`, Tests `tests/test_tutorial_t275.js` (npm test) und `tests/playwright_tutorial_t275.mjs`; `ui-play` überspringt das Tutorial beim frischen Profil. Hilfe (Menüpunkte). Cache `divcmd-alpha41d`.

- **Analyse und Stand t271:**
  - Feindkontakt-Fenster bietet nur noch Reaktionen an, deren Bedingung erfüllt ist: Militärische Ehren (Veteran), Kriegsgericht (zwei Fronteinheiten), Rationen (Infanterie), Minen legen (freier Platz), Napalm (gegnerische Front). Vorher scheiterte die Wahl, und das Fenster kam wieder (ui-play Seed 1234). Neu `_reactUsable`, Test `tests/test_react_usable_t271.js`; `ui-play` drückt auch „Bestätigen und weitergeben“.
  - Balance bestätigt ohne Änderung: Starter 48,3–52,1 %, Misch 49,1–51,0 %, Startspieler 48,7 / 49,3 %.
  - Prüfskript unverändert zu t268 (t267 14/14), Browser-Test Seeds 1234, 31337, 4711, 271, 77 grün (je 5 Partien); `ui-play` sucht das Neutralisieren jetzt im gegnerischen Support (vorher Fehlmeldung bei Seed 77).
  - Status in `docs/entwicklung/STATUS_T271.md`; Hilfe (Entwicklungsstand, Fehlende Features, Fortschritt, Prozent: 67 %, Kernspiel 77 %). Cache `divcmd-alpha41c`.

- **Einheitliche Schrift auf den Vorderseiten (t270):**
  - Regeltext für alle Kartentypen fest 66 px (Überschrift 68) auf der 1536er-Arbeitsfläche. Vorher gab es automatische Stufen von 60 bis 36 px.
  - Nur Eidträger und Flankenmeister (Elite mit drei Schlüsselwörtern) fallen auf die Notfallstufe 48 px zurück. Der Build meldet das als `WARN t270`.
  - Kartennamen fest 80 px; vorher 86/62/50 px je nach Zeichenzahl. Nur 9 sehr lange Namen werden auf Plakettenbreite verkleinert (66–76 px). Doktrin-Namen fest 80 px (vorher 92/70).
  - Zitat fett-kursiv 42 px statt kursiv 36, senkrecht mittig zwischen Trennlinie und Unterkante. 13 lange Zitate laufen zweizeilig. Bei Elitekarten bleibt das Zitat mittig und frei vom Orden.
  - Alle 1.746 Vorderseiten neu gerendert (alpha40, 1024×1428). Cache `divcmd-alpha41b`.

- **Balance und eindeutige Karten t268, Elite-Zitat t269:**
  - Alle 16 Nationen liegen zwischen 48 und 52 % (Bot gegen Bot, 23.040 Partien je Modus).
    - Starterdecks 44,9–55,3 → 48,9–51,1 %, Mischdecks 42,1–56,1 → 48,4–51,4 %.
    - Startspieler 48,7 bzw. 49,6 %.
  - Keine funktionsgleichen Karten mehr (vorher 179 Gruppen / 599 Karten mit gleichen Werten und gleichem Text) und keine doppelten Namen (vorher 57, IDs unverändert).
    - Unterschieden wird über Wertetausch, Zahl ±1 mit AP ±1 oder einen kleinen Zusatz bei +1 AP: Ziehe 1 Karte / Träger zerstört → ziehe 1 / Heilung 1 zu Zugbeginn.
    - Alles läuft über bestehende Engine-Effekte; Pool-Bausteine `theal`/`sdef` über `CM`.
  - 712 Karten geändert; vollständige Liste alt → neu in `docs/regeln/BALANCE_T268.md`, Vorgehen und Tabellen in `docs/entwicklung/STATUS_T268.md`.
  - Werkzeuge: `scripts/balance/cards_t268.js`, `profile_t268.js`, `tune_t268.js`, `names_t268.json`, `manual_t268.json`.
  - Neuer Test `tests/test_unique_cards_t268.js`; `tests/test_nation_pools.js` prüft die neuen `CM`-Bausteine sowie Bonus mit Heilung.
  - Kurztexte: Fehler „1 K..“ und „Wähle eine Feind“ behoben, keine Vorderseite mehr über 120 Zeichen.
  - Elitekarten: Zitat wieder mittig über die volle Breite, Orden darüber ohne Überdeckung. Alle Vorderseiten neu gerendert (alpha40, 1024×1428).
  - Hilfe (Entwicklungsstand, Fehlende Features, Fortschritt, Fortschritt in Prozent: 67 %, Kernspiel 77 %). Cache `divcmd-alpha41a`.

- **Kartenreparatur t267:** Die 14 Karten aus der Prüfung t265 wirken wie gedruckt (Lesarten und Sonderfälle in `docs/regeln/KARTEN_T267.md`).
  - Neuer Effekt `NEGATE_BONUS` (gegnerische Einheit: gespeicherte ATK-Boni und DEF über Druckwert weg, laufende Boni bis Ende des nächsten gegnerischen Zugs aus): Verfahrensbruch und Keine Sterne (nur Elite-Ziel, ziehe 1), Modellstopp (ziehe 1), Kein Schrein (danach eigene Einheit +1 DEF).
  - Eigener Bonus nach Feindziel (`param.side: 'own'`, neue Wahl „Eigene Einheit für den Bonus“): Notimplantat, Stoßtrupp, Lokalisierung (Soforteinsatz), Rasten, Kein Schrein, Opfergabe. Vorher stärkte der Bonus die gewählte Feindeinheit.
  - Opfern zerstört keine Feinde mehr ohne Kartentext (vorher 2): Opfergabe (nur DEF ≤ 2, heilt eine andere eigene um 2), Ablösung (Ersatz aus der Hand in denselben Abschnitt, Kosten bis +1, heilt 1). Letzter Ruf nur noch mit eigener Infanterie.
  - Verbandskasten heilt 1 am Zugende ohne Angriff (vorher 3 + Nachbarn 2 zu Zugbeginn); Werkstattmarke nur Panzer/Fahrzeug, heilt 1 zu Zugbeginn, solange beschädigt; Ortungsband: Ziel −1 DEF beim Angriff. `MEDIZIN` liest `self`/`flank`.
  - Stillprobe: neuer Text „Wähle eine gegnerische Fronteinheit: decke sie auf; −2 ATK bis Zugende.“ (alter Text war ein Entwurfsrest mit Fragezeichen), Front neu gerendert.
  - Bot bewertet die neue Wahl. Test `tests/test_cards_t267.js` (20 Fälle, rot auf altem Stand), Prüfskript mit Abschnitt `t267` (14/14 OK). Balance neu gemessen (`docs/entwicklung/STATUS_T267.md`): Rothain Starter 55,7 → 51,7 %, Theryn Starter 50,9 → 49,1 %, übrige Nationen innerhalb der Streuung. Hilfe (Entwicklungsstand, Fehlende Features, Fortschritt, Fortschritt in Prozent: 66 %, Kernspiel 75 %). Cache `divcmd-alpha40z`.

- **Analyse t265 (nur Diagnose, keine Spielmechanik geändert):**
  - Prüfung Kartentext gegen Engine über alle 1.746 Karten, alle 389 Soforteinsätze im Ablauf, alle Effektparameter und Soforteinsätze mit Feindziel (`scripts/balance/audit_text_engine_t265.js`). Ergebnis in `docs/regeln/TEXT_ENGINE_AUDIT_T265.md`: 10 Karten wirken anders als gedruckt (Verfahrensbruch, Keine Sterne, Modellstopp, Kein Schrein, Stillprobe, Opfergabe, Ablösung, Verbandskasten, Werkstattmarke, Ortungsband), 4 Texte stärken die gewählte Feindeinheit (Notimplantat, Stoßtrupp, Lokalisierung, Rasten). Gemeldet, nicht behoben.
  - Statusanalyse `docs/entwicklung/STATUS_T265.md`; Hilfe Entwicklungsstand, Fehlende Features, Fortschritt und Fortschritt in Prozent aktualisiert (64 % bis Early Access, Kernspiel 74 %). Musik nachgezählt: 15 Stücke statt 16.
  - Hilfe: Textbereich jeder Hilfe-Seite liegt auf halbtransparentem Schwarz (`rgba(0,0,0,0.7)`, abgerundet), das Hintergrundbild scheint durch. Nur CSS der Hilfe.
  - Browser-Test `ui-play` mit 8 weiteren Seeds: 38 Partien, 6 von 8 Seeds grün; 2 Abbrüche (4711, 31337) sind Zeitüberschreitungen des Tests (180 s), weil die Meldungen nach langen Bot-Zügen so lange laufen. Kein Einfrieren, nicht behoben. Cache `divcmd-alpha40y`.

- **Hänger „Der Gegner prüft Reaktionen“ und Armageddon (t259):**
  - Hänger aus `ui-play` (t258, Zug 16): Der Warte-Dialog für eine Bot-Wahl (Feindkontakt, SAM, Geist, `tac-*`) blieb liegen, wenn der Bot seine Wahl ohne neue Live-Meldung erledigte (z. B. Gefechtsabbruch verworfen), oder wenn `render()` ihn über eine laufende Meldung legte und deren Abschluss das Overlay dann nicht mehr schloss. Neu: `closeStaleWaitOverlay()` (nach Bot-Aktion, nach `render()`, bei leerer Meldungs-Warteschlange, beim Meldungsende), kein Warte-Dialog über laufenden Meldungen, Wächter (`armWaitWatchdog`, jede Sekunde; stößt den Bot nach 4 s erneut an). Zusätzlich stellt `guardPendingUi()` einen verlorenen eigenen Feindkontakt-/SAM-/Geist-Dialog wieder her (render() kehrte bei unverändertem Brett vor `showPending()` zurück; im Browser-Test als „Offene Auswahl ohne Bedienelement“ gesehen), auch jede Sekunde über den Zugtimer. Meldungs-Wache `guardEventPump()`: bleibt die Meldungs-Warteschlange 8 s „beschäftigt“, ohne dass eine Meldung sichtbar ist, wird sie freigegeben (im Browser-Test gesehen); Karten-Flüge vor einer Meldung zählen nicht. Meldungen haben eigene Timer: Vorher teilten sich alle Meldungen einen Timer, eine neue Meldung löschte den Tipp-Timer der laufenden, deren Text blieb stehen (z. B. bei „Test“) und die Pumpe war minutenlang „beschäftigt“. Eine sichtbare Meldung, die sich 15 s nicht verändert, wird ebenfalls beendet. Diagnose-Hook `dcEventDebug()` für `ui-play`. Engine: Das Feindkontakt-Fenster bietet nur noch bezahlbare Handreaktionen an. Vorher stand dort z. B. Napalm bei 0 AP; die Wahl scheiterte, und der Dialog verschwand (Browser-Test, Seeds 77/259). Regel ergänzt in `docs/regeln/RULES_v0.5_GRUNDKONZEPT.md`. Test `tests/test_ui_t259.js` (7 Fälle, rot auf altem Stand).
  - Armageddon wirkt jetzt vollständig nach Kartentext: Feld räumen, Armageddon und beide Hände auf den Ablagestapel, Ausspieler und Gegner ziehen je 5 über die normalen Ziehregeln (leeres Deck → Ablagestapel mischen), dann Münze. Vorher blieben die Hände liegen und die Karte selbst ging verloren. Bot bewertet Armageddon gesondert (`scoreArmageddon`). Test `tests/test_armageddon_t259.js`, Regeln in `docs/regeln/KARTEN_SONDERFAELLE.md`.
  - Hilfe (Beispielzüge, Entwicklungsstand, Fehlende Features, Fortschritt) angepasst. Cache `divcmd-alpha40x`.

- **Hilfe und Statusanalyse (t258):** Hilfe-Menü neu gegliedert: Marktanalyse (Vergleichsspiele KARDS, Hearthstone, Legends of Runeterra, Gwent, Marvel Snap, Flames of War; Steam-Kennzahlen von Game Market Data, mit Quellen), Entwicklungsstand (nachgezählte Zahlen), Fehlende Features, Fortschritt (Verlauf, Meilensteine) und Fortschritt in Prozent (65 % bis Early Access, Gewichtung je Bereich, Methodik). Veraltete Regelzeile „Startspieler 3 AP“ in der Hilfe korrigiert. Cache `divcmd-alpha40w`. Doku: `docs/entwicklung/STATUS_T258.md`.

- **Browser-Fehler beim Ausspielen (t256):** Im Browser hing die Seite, sobald man eine Karte auf ein Feld legte. Ursache: Die Bot-Proben aus t254 kopierten die Engine samt dem `dispatch`-Hook der Oberfläche (Playtest-Logger). Jede Probe lief dadurch über die echte Partie und rief erneut den Bot-Vorschlag auf. Das war eine Endlosschleife, und der Bot veränderte beim Nachdenken den echten Stand. `cloneEngine` übernimmt jetzt keine eigenen Funktionen bzw. Hooks mehr. Weitere Fehler aus dem Browser-Durchlauf:
  - „Gefecht beginnen“ startete jede Partie doppelt.
  - Der Münzwurf lag unter dem Schleier und wurde vom Countdown überschrieben. Begann der Bot, zog er nie.
  - Gezogene Karten des Gegners erschienen in der Meldung offen.
  - Eine Meldung konnte stehen bleiben; jetzt per Klick überspringbar, mit Sicherheitsfrist.
  - Neuladen (F5) beendete `server.py` (jetzt Gnadenfrist).
  
  Neu ist der Browser-Test `npm run ui-play` (Playwright/Chromium, nicht in `npm test`) und `tests/test_ui_t256.js` (in `npm test`). Cache `divcmd-alpha40v`. Doku: `docs/technik/UI_TEST_T256.md`.

- **Startspieler (t257):** Beide Spieler haben im ersten Zug **5 AP** (`opening_starter_ap_penalty` 2 → 0). Ausgleich bleibt das Ziehen: Der Startspieler zieht in Zug 1 keine Karte, der Zweite zieht zu Beginn seines ersten Zuges 1 und hat damit eine Karte mehr. Regeltexte (Hilfe, Glossar, Münzwurf-Overlay, docs/regeln). Startspieler-Quote mit dem t254-Bot: 47,8 % (Starter) und 48,5 % (Misch), zuvor 43,7 / 43,8 % angepasst; das „(Start: N)“-Badge erscheint nur noch bei aktivem Abzug. Cache `divcmd-alpha40u`. Messung: `docs/balance/STARTSPIELER_T257.md`.

- **Balance und Reskins (t255):** Nationen neu ausbalanciert (Ziel 46–54 %). Gemessen wurde mit dem t254-Bot in 69.120 Partien je Modus. Hebel waren vor allem Doktrinpaare:
  - Abnutzung zieht keine Karte mehr.
  - Gepanzerter Fuß gibt nur noch ausgerüsteten Einheiten +1 DEF.
  - Marsch aus dem Vollen gibt beim Einrücken kein dauerhaftes +1 DEF mehr. Das war ein Text-Fehler: gedruckt war „bis Zugende“.
  - Schwerpunkt greift ab 2 Einheiten.
  - Sturmangriff wirkt auf die zwei stärksten Infanterien.
  - Auswertung hält bis zum Ende des nächsten eigenen Zuges.
  - Verteilte Stellung gibt +2 DEF.

  Dazu kommen gezielte Wertänderungen (±1 ATK/DEF/AP) an Karten aus den Starterdecks und Pools.
  - **Regelkorrektur:** „Erleidet der Träger Schaden, heilt er danach 1“ rettet nicht mehr vor tödlichem Schaden.
  - **Reskins:** 54 mechanisch gleiche Karten verschiedener Nationen haben jetzt je Nation eine eigene Wendung, zum Beispiel allein im Abschnitt, Überzahl, Klassenbedingung, Heilung mehrerer Einheiten oder Beobachten. Averon und Orthea markieren Feinde jetzt als beobachtet, statt nur aufzudecken.
  - **Engine:** Neue CM-Bedingungen `is:`, `superior` und `wounded`. Neue Optionen `turnheal count`, `REVEAL observe` und Sturmangriff `count`. Der Bot nutzt alles über `listActions`/`dispatch`.
  - **Karten und Cache:** 224 Vorderseiten neu (alpha40), Cache `divcmd-alpha40t`.
  - **Doku:** Sonderfälle in `docs/regeln/EFFEKT_SONDERFAELLE_T255.md`, Details in `docs/balance/BALANCE_T255.md`.

- **Bot-KI (t254):** Der Test-Bot ordnet seinen Zug in Stufen (dringende Neutralisierung, Kampfausrüstung und starke Effekte, vernichtende Angriffe, übrige Ausspielungen), prüft Massen, Gassen, Gehorsam, Letzter und Mobilisierung per Vorausschau auf einer Engine-Kopie, nutzt aktivierbare Fähigkeiten eigener Karten, spielt Panzer gezielt für Blitzkrieg, legt Vertragsclip nur mit Soforteinsätzen und testet jede Aktion vorab (0 abgelehnte Aktionen). Im Browser trifft der Bot Folgewahlen jetzt selbst statt mit der ersten Option. Neuer Bot gegen alten: 78,6 % (Misch) / 78,0 % (Starter). Kartenregeln und Preise unverändert. Cache `divcmd-alpha40s`. Messung, Balancefolgen und Vorschläge: `docs/balance/BOT_KI_T254.md`.

- **Effekte (t251):** Drei Teil-Stubs aus dem Scan t250 greifen jetzt wie gedruckt: Vertragsclip (`EQUIP_DISCOUNT_AURA` in `costOf`, Träger Elite oder Unterstützung), Blitzkrieg (`BLITZ_LOCK_SUPPORT`: Sperre gegnerischer Unterstützungsfähigkeiten in der nächsten Runde nach einem Panzer-Ausspiel) und Schläferzelle (`NEUTRALIZE`, 2 AP über `listActions`/`dispatch`). Preise unverändert, sofern die Nachsim das bestätigt. Sonderfälle: `docs/regeln/EFFEKT_SONDERFAELLE_T251.md`. Begründung: `docs/balance/BALANCE_T251.md`.

- **Soforteinsätze (t250):** Psychologie der Massen, Blinder Gehorsam, Einsame Gassen, Der Letzte der steht und Mobilisierung wirken jetzt wie gedruckt (Massen-Folge, +2 ATK und freie Frontangriffe, Füllen aus dem Deck, Opfer/+1/+1/SP-Flag `letzterDerSteht`, Mobilisierung bis zu 2). Bots und LAN-Sync über bestehende Pending-Aktionen. t249-Preise nach kurzer Sim mit echter Wirkung belassen. Sonderfälle: `docs/regeln/SOFORT_SONDERFAELLE.md`. Stub-Scan (nur Liste): `docs/balance/STUB_SCAN_T250.md`. Begründung: `docs/balance/BALANCE_T250.md`.

- **Soforteinsätze (t249):** Zehn Grundset-Karten mit 0 AP neu bepreist: Luftschlag 4, Dammbruch 6, Psychologie der Massen 6, Generalmobilmachung 4, Blinder Gehorsam 6, Einsame Gassen 6, Mobilisierung 3, Deckung suchen 2, Selbstopfer 2, Der Letzte der steht 3. Deckung suchen gewährt jetzt wirklich +3 V bis zum Angriff. Vorderseiten neu (alpha40), Cache `divcmd-alpha40r`. Begründung und Simulation: `docs/balance/BALANCE_T249.md`.

- **Bibliothek (t248):** Der Nationsfilter zeigt nur noch die 100 Karten der Nation plus ihre 2 Starter-Doktrinen. Neutrale (Grundset, Taktik-Entwürfe, 4 unzugeordnete Doktrinen) erscheinen unter „Neutral“ und „Alle Nationen“. Die Dropdown-Zähler entsprechen der Listenlänge. In der Alle-Ansicht tragen Neutrale ein Herkunfts-Badge „Neutral“. Deckbau (freies Mischen, beliebige 2 aus 36 Doktrinen) unverändert.
- **Napalm (t248):** `dc_so_napalm` kostet **3 AP** statt 0 (3 Sofortschaden plus DoT 1 je Zug des Besitzers). Vorderseite neu gerendert (alpha40). Begründung und Simulation: `docs/balance/BALANCE_T248.md`. Service-Worker-Cache `divcmd-alpha40q`.

- **Kommentare (t245):** Dateiköpfe und JSDoc/Docstrings an Engine, UI, Bots, Tests, Skripten und Kartendaten (Köpfe/Abschnitte, nicht pro Karte). Keine Logikänderung.
- **Repo-Aufräumung (t245):** Klare Ordnerstruktur (`tests/`, `scripts/` nach Zweck, Doku mit `entwicklung/` und `archiv/`). Simulations-Rohdaten nicht mehr im Repo (`scripts/balance/out/`, `.gitignore`). Keine Regel- oder Balanceänderungen.
- **Ausrüstung-Reparatur (t244):** Panzerplatte Serie, Zieloptik Konzern und Passoptik – durch den Parser der Kartenprüfung auf 0 gesetzte Werte sind wiederhergestellt (inkl. Originalbedingungen im Effekt und Text). Verbindungssiegel wirkt nur noch wie gedruckt (Aufdecken beim Anlegen, ohne +1 ATK gegen beobachtete Ziele). Die übrigen Kürzungen der Prüfung t212 bleiben bewusst. Verzeichnis: `docs/regeln/KARTEN_KUERZUNGEN.md`.


## 0.6b Alpha – 10.11.2026

Neue Buchstabenversion: Startspieler-Regel geändert (3 AP im ersten Zug), verdeckte Fallen spielbar, Balance für realistische Mischdecks.

### Regeln & Engine
- **Startspieler-Ausgleich:** Der Startspieler hat im ersten Zug **3 statt 4 AP** (`opening_starter_ap_penalty` 1 → 2). Keine Zusatzkarte; der Zweite zieht beim ersten Zugwechsel wie bisher 1 Karte. Simulation: Siegquote Startspieler 54,5 → 50,0 % (Starterdecks), realistische Mischdecks 50,2 % (je 34.560 Partien, ±0,5).
- **Verdeckte Fallen** im Support lösen bei Feindkontakt als Reaktion aus (ohne weitere AP, RULES §12.1). Vorher wurden sie angeboten, ließen sich aber nicht spielen. Ohne gültiges Ziel bleiben sie verdeckt liegen.

### Balance
- **Realistischer Mischdeck-Generator** für Simulationen (`scripts/nation_pools/mixed_deck.js`): 30 Einheiten, 10 Ausrüstung, 8 Unterstützung, 12 Soforteinsätze, halb Pool, halb Starterdeck. Averon, Dargan und Ossaria liegen damit bei 48–51 %; die Werte unter 45 % aus t237 waren ein Artefakt des alten Testdecks.
- **Caldris** im Mischdeck 57,7 → 53,7 %: 14 Poolkarten um eine Stufe schwächer (u. a. Panzerschild Caldris Schaden −2 → −1, Feldklinik 3 → 4 AP, Vollschutzweste +3 → +2 DEF). **Namar** Kaipanzerung 1 → 2 AP. Zweiter Schritt (t240): Schildträger 2/4 → 2/3, Sanitätspanzer 2/4 → 2/3, Oberste Fürsorge 4/6 → 4/5, Schild heben +2 → +1 DEF, Schutzschild leicht +2 → +1 DEF; Caldris gemischt 54,5 → 52,9 % (69.120 Partien), Starter 50,6 %. Details: `docs/balance/BALANCE_T240.md`. Spannen nach 0.6b: Starterdecks 47,0–53,3 %, Mischdecks 47,0–52,9 %. Details: `docs/balance/BALANCE_T238.md`.

### Grafik
- Neue Motive: **Routenwache** (Sahr) in Sahr-Petrol-Tarnung statt Oliv/Khaki; **Ruderpanzer** zeigt nur das Ausrüstungsteil (Ruder-Panzerkit) statt eines ganzen Fahrzeugs.

### Doku & Version
- Version 0.6b überall (VERSION, version.js, Build-Label, file_version_info 0.6.1.0, start.bat, Hilfe, README, LIESMICH).
- Projektdokumentation (MD + PDF) mit 3-AP-Start, verdeckten Fallen und Balance-Stand neu gebaut.

### Aufräumen
- Spielordner versionsneutral: `Division_Command_0.5a/` → `Division_Command/` (alle Skripte, Tests, Editor- und Doku-Pfade angepasst).

## 0.6a Alpha – 10.11.2026

Seit 0.5a (02.11.2026): über 300 Commits. Neue Nebenversion, weil sich Regeln geändert haben, die Partien anders laufen lassen (Soforteinsatz-AP, Steilfeuer, Trophy-Standard), und weil alle Karten neu geprüft und gesetzt sind.

### Karten
- **Kartenpool 1.746 Karten:** 16 Nationen mit je 100 Karten (60 Nationenkarten + 40 neue Poolkarten, 640 neu) und 2 Doktrinen, dazu Alpha-Basiskarten und Taktik-Entwürfe. Decks 60 + 2, Karten aller Nationen frei mischbar, Kopienlimit Gold 1 / Silber 2 / Bronze 4.
- **Kartenprüfung aller 1.746 IDs:** Grundsatz „Kartentext = Implementierung“. 899 Texte und 802 Mechaniken korrigiert, 607 vorher nicht implementierte Fähigkeiten auf 0 (`docs/karten/KARTENPRUEFUNG.md`). Knappe Kartentexte (≤ 120 Zeichen); jede gekürzte Karte steht verlustfrei in `docs/regeln/KARTEN_SONDERFAELLE.md`.
- **alpha40-Design:** alle Vorderseiten neu gerendert (1024×1428, Motivfenster 40 %, nie gestreckt), Doktrinen im Bollwerk-Stil, Elite mit transparentem Orden, Tag-Chips ohne schwarze Leiste; fehlende Motive vollständig ergänzt.

### Regeln
- **Steilfeuer I–V** ersetzt „Indirektes Feuer“: Reichweite als Tag auf allen Artillerie-Einheiten. I Mörser, II Haubitzen/Geschütze, III Raketenwerfer, IV ganze Front, V ganze Front + Unterstützungszone (Supportangriff +2 AP, gesamt 3 AP).
- **Soforteinsätze kosten ihre gedruckten AP**; Rabatte greifen, nie unter 0; unbezahlbare Karten sind ausgegraut.
- **Trophy-Sieg** ist Standard (`victory_mode: trophy`); der Startspieler hat im ersten Zug 4 AP.
- Eingraben (Deploy-Schutz), Kopienlimits in Engine/Deckbauer erzwungen, Abschnitt-Effekte zielen korrekt.

### Balance
- Wertausreißer angepasst (Hammer, Faustkeil, Koloss, Haubitzenzug, Werkrott-Kolonne, Straßenriegel, Werkbach-Riegel); fünf Ausrüstungen mit vollem Preis und bedingtem Rabatt; Armageddon 8 AP.
- **Simulationspass t237** (11.520 Bot-Partien je Modus): Siegquoten der Starterdecks 42–60 % → 45–53 %; vier Doktrinen (Materialersatz, Abnutzung, Zielangriff, Abschluss), 32 Starterdeck-Tausche, 65 Poolkarten ±1. Details: `docs/balance/BALANCE_T237.md`.

### Oberfläche
- Bibliothek: Filter nach Seltenheit und mehreren Tags (UND), Suche auch über Tag-Namen.
- 2,5D-Offizierstisch (optional), Tischkamera, Tisch-Effekte, Kartenansicht in voller Auflösung, HUD mit klickbaren Lücken, getrennte Lautstärken für Musik und Effekte, Soundset v4, Endbildschirm, Playtest-Logger.
- Hilfe aktualisiert (Regeln, Steilfeuer, Lore, Version).

### Engine & Bot
- **Bot-Hänger behoben:** Wartefenster („Feindkontakt“, „Gezeigte Karten“, SAM, Geist) bieten immer eine legale Aktion (Weitergeben/Schließen); unbezahlbare Reaktionen werden nicht mehr angeboten. Smoke- und Fuzz-Test schlagen bei Hängern, Timeouts oder unbeendeten Partien fehl.
- Effekte aller Ausrüstungen und Soforteinsätze verdrahtet, Soft-Locks bei Zielwahl behoben.

### Aufräumen
- Eingecheckte `__pycache__`-Dateien entfernt, `.gitignore` ergänzt; `NATIONENPOOL_KARTEN.md` neu erzeugt; Projektdokumentation (MD + PDF) auf 0.6a.

### Bekannt offen
- Startspieler gewinnt in der Simulation ≈ 54–56 % (Test mit 3 AP im ersten Zug: ≈ 51 %; Kernregel, nicht geändert).
- Routenwache (Sahr) Farbe, Ruderpanzer-Motiv zeigt ganzes Fahrzeug; Porträts erst für 8 von 16 Nationen.

## 0.5a Alpha – 02.11.2026
- Ordner von `Division_Command_0.32c` umbenannt, Versionsstrings auf 0.5a.

## 0.32c–0.32f – September 2026
- Frühe Alpha-Stände (Frontanzeige, Charaktereditor modular).
