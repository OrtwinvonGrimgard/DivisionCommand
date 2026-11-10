# Balance-Pass t237 (Simulation → Anpassung → Simulation)

Stand 10.11.2026. Ziel: Siegquote je Nation mit Starterdecks 45–55 %, Extreme im gemischten Pool (30 Starter- + 30 Poolkarten) verringern. Keine Kernregel geändert.

## Methode

- Bot gegen Bot (`DCBot`, Standardmodell), ohne App-Fallback (seit a7151cd2 nicht mehr nötig), Trophy-Sieg Standard.
- Je Modus 11.520 Partien = alle 240 geordneten Nationspaare × 48 Seeds, 1.440 Partien je Nation. 95-%-Konfidenz ≈ ±2,6 Punkte je Nation, ±0,9 beim Startspieler.
- Iteration: 5 Durchläufe mit Patches zur Ladezeit, danach in die Quellen übernommen. Vorher/Nachher unten mit **unabhängigen Seeds** (70000 ff.), nicht den Tuning-Seeds.
- Hebel: (1) Starterdeck-Zusammensetzung (nur die 30 Nicht-Einheiten-Plätze; tauscht gegen Karten aus dem eigenen Nationenpool, wirkt nur auf Starterdecks), (2) vier Doktrinwerte, (3) ±1 ATK/DEF an Poolkarten (wirkt im gemischten Deck). Alle Wertänderungen halten ATK+DEF innerhalb Median ±2 der AP-Stufe.
- Hänger: 0 erzwungene Zugenden, 0 unbeendete Partien, 0 Engine-Fehler in allen Läufen.

## Ergebnis: Starterdecks (Siegquote %, 95-%-KI)

| Nation | vorher | nachher | Δ |
|---|---:|---:|---:|
| Namar | 60.0 ± 2.5 | 53.3 ± 2.6 | -6.7 |
| Sahr | 55.1 ± 2.6 | 48.3 ± 2.6 | -6.8 |
| Eldran | 53.9 ± 2.6 | 49.2 ± 2.6 | -4.7 |
| Averon | 53.0 ± 2.6 | 46.3 ± 2.6 | -6.7 |
| Caldris | 52.8 ± 2.6 | 52.6 ± 2.6 | -0.2 |
| Steinmark | 52.6 ± 2.6 | 48.5 ± 2.6 | -4.1 |
| Rothain | 52.6 ± 2.6 | 48.3 ± 2.6 | -4.3 |
| Vael | 52.0 ± 2.6 | 45.2 ± 2.6 | -6.8 |
| Merovan | 49.3 ± 2.6 | 51.7 ± 2.6 | +2.4 |
| Lyr | 48.9 ± 2.6 | 49.2 ± 2.6 | +0.3 |
| Vesper | 47.4 ± 2.6 | 53.0 ± 2.6 | +5.6 |
| Dargan | 47.4 ± 2.6 | 51.7 ± 2.6 | +4.3 |
| Theryn | 45.6 ± 2.6 | 52.5 ± 2.6 | +6.9 |
| Orthea | 44.4 ± 2.6 | 50.8 ± 2.6 | +6.4 |
| Ossaria | 42.5 ± 2.6 | 50.1 ± 2.6 | +7.6 |
| Karsk | 42.4 ± 2.6 | 49.3 ± 2.6 | +6.9 |
| **Spanne** | 42.4–60.0 | 45.2–53.3 | |
| **Startspieler** | 54.3 ± 0.9 | 54.5 ± 0.9 | |
| **Ø Züge** | 15.9 | 15.7 | |

## Ergebnis: gemischte Decks (30 Starter + 30 Pool)

| Nation | vorher | nachher | Δ |
|---|---:|---:|---:|
| Vael | 71.8 ± 2.3 | 53.7 ± 2.6 | -18.1 |
| Theryn | 58.8 ± 2.5 | 56.6 ± 2.6 | -2.2 |
| Merovan | 57.0 ± 2.6 | 55.8 ± 2.6 | -1.2 |
| Rothain | 55.0 ± 2.6 | 55.1 ± 2.6 | +0.1 |
| Caldris | 54.8 ± 2.6 | 55.2 ± 2.6 | +0.4 |
| Steinmark | 52.7 ± 2.6 | 53.5 ± 2.6 | +0.8 |
| Orthea | 51.9 ± 2.6 | 54.3 ± 2.6 | +2.4 |
| Eldran | 51.5 ± 2.6 | 52.6 ± 2.6 | +1.1 |
| Karsk | 48.1 ± 2.6 | 50.0 ± 2.6 | +1.9 |
| Sahr | 48.0 ± 2.6 | 47.2 ± 2.6 | -0.8 |
| Namar | 47.8 ± 2.6 | 48.1 ± 2.6 | +0.3 |
| Lyr | 46.1 ± 2.6 | 46.9 ± 2.6 | +0.8 |
| Vesper | 42.8 ± 2.6 | 46.7 ± 2.6 | +3.9 |
| Averon | 41.5 ± 2.5 | 42.4 ± 2.6 | +0.9 |
| Dargan | 36.4 ± 2.5 | 40.4 ± 2.5 | +4.0 |
| Ossaria | 35.9 ± 2.5 | 41.5 ± 2.5 | +5.6 |
| **Spanne** | 35.9–71.8 | 40.4–56.6 | |
| **Startspieler** | 55.9 ± 0.9 | 56.1 ± 0.9 | |
| **Ø Züge** | 17.1 | 17.4 | |

Hinweis: Das gemischte Deck ist ein Test-Konstrukt aus `smoke_sim.js` (fast nur Einheiten, keine Ausrüstung). Ossaria (Gepanzerter Fuß braucht Ausrüstung) und Dargan bleiben dort unter 45 %; im echten Deckbau ist das nicht repräsentativ.

## Startspieler-Vorteil (nicht geändert)

Gemessen, nicht übernommen, weil es eine Kernregel ist (`opening_starter_ap_penalty`):

| Variante | Starter | gemischt |
|---|---:|---:|
| Startspieler 4 AP im ersten Zug (aktuell) | 54,5 % | 56,1 % |
| Startspieler 3 AP im ersten Zug (Test) | 50,6 % | 51,5 % |

Empfehlung zur Entscheidung: Erster Zug des Startspielers mit 3 statt 4 AP bringt den Vorteil auf ≈ 50–51,5 %.

## Änderungen alt → neu

### Doktrinen (4)

| Doktrin | vorher | nachher |
|---|---|---|
| Materialersatz (`dc_dok_materialersatz`) | Panzer und Artillerie kosten 1 AP weniger (min. 1). Die Werkstatt läuft durchgehend — ohne Extra-Panzerung beim Einrücken. | Nach dem ersten Verlust eines eigenen Panzers oder einer Artillerie kosten Panzer und Artillerie 1 AP weniger (min. 1). |
| Abnutzung (`dc_dok_abnutzung`) | Zerstörst du eine gegnerische Fronteinheit, hat dieser Abschnitt bis Zugende +1 ATK und du ziehst 1 Karte — Druck ohne Verband. | Zerstörst du eine gegnerische Fronteinheit, hat dieser Abschnitt bis Zugende +1 ATK, eine eigene Einheit dort heilt 1 und du ziehst 1 Karte. |
| Zielangriff (`dc_dok_zielangriff`) | Eigene Angriffe gegen beschädigte Feinde haben +1 ATK. Beim Zerstören ziehst du 1 — der Abschluss bleibt, der Stoß wird knapper. | Eigene Angriffe gegen beschädigte Feinde haben +2 ATK. Beim Zerstören ziehst du 1 — der Abschluss bleibt, der Stoß wird knapper. |
| Abschluss (`dc_dok_abschluss`) | Zerstört eine eigene Einheit ein Ziel, hat sie +1 ATK bis Ende deines nächsten Zuges und du ziehst 1. | Zerstört eine eigene Einheit ein Ziel, hat sie +2 ATK bis Ende deines nächsten Zuges und du ziehst 1. |

Parameter: Materialersatz `if: always → after-loss`; Abnutzung `heal 0 → 1`; Zielangriff `vs_damaged_atk 1 → 2`; Abschluss `atk 1 → 2`.

### Starterdecks: Tausch (32 Plätze, nur Nicht-Einheiten-Hälfte)

| Nation | raus | rein | Richtung |
|---|---|---|---|
| Theryn | Sturmglocke (Soforteinsatz, 2 AP) `dc_b_sturmglocke_127` | Bannerträger (Einheit, 2 AP, 2/2) `dc_np_theryn_bannertraeger` | stärker |
| Theryn | Leises Nein (Unterstützung, 3 AP) `dc_b_leises_nein_116` | Geweihte Linie (Einheit, 3 AP, 3/4) `dc_np_theryn_geweihte_linie` | stärker |
| Ossaria | Personalregel (Soforteinsatz, 2 AP) `dc_b_personalregel_286` | Totenwallpanzer (Einheit, 4 AP, 3/6) `dc_np_ossaria_totenwallpanzer` | stärker |
| Ossaria | Namensliste (Unterstützung, 3 AP) `dc_b_namensliste_273` | Namensträger (Einheit, 2 AP, 2/4) `dc_np_ossaria_namenstraeger` | stärker |
| Ossaria | Ahnentafel (Unterstützung, 3 AP) `dc_b_ahnentafel_272` | Grabwacht (Einheit, 2 AP, 1/4) `dc_np_ossaria_grabwacht` | stärker |
| Ossaria | Erinnerungsmarke (Ausrüstung, 1 AP) `dc_b_erinnerungsmarke_293` | Plattenträger-Zug (Einheit, 3 AP, 3/5) `dc_np_ossaria_plattentraeger_zug` | stärker |
| Orthea | Zahlenhof (Unterstützung, 2 AP) `dc_b_zahlenhof_455` | Probenträger (Einheit, 2 AP, 2/3) `dc_np_orthea_probentraeger` | stärker |
| Orthea | Kliniktief (Unterstützung, 3 AP) `dc_b_kliniktief_453` | Klinikwache (Einheit, 2 AP, 1/4) `dc_np_orthea_klinikwache` | stärker |
| Orthea | Probennetz (Unterstützung, 2 AP) `dc_b_probennetz_457` | Institut der Erkenntnis (Einheit, 4 AP, 4/4) `dc_np_orthea_institut_der_erkenntnis` | stärker |
| Orthea | Ortungsband (Ausrüstung, 2 AP) `dc_b_lokalisierung_480` | Chefmesser (Einheit, 4 AP, 3/5) `dc_np_orthea_chefmesser` | stärker |
| Orthea | Sensorbrille (Ausrüstung, 2 AP) `dc_b_sensorbrille_474` | Kreuzpeilungstrupp (Einheit, 1 AP, 1/2) `dc_np_orthea_kreuzpeilungstrupp` | stärker |
| Karsk | Ausfallquote (Soforteinsatz, 2 AP) `dc_b_ausfallquote_403` | Durchbruchszug (Einheit, 3 AP, 4/3) `dc_np_karsk_durchbruchszug` | stärker |
| Karsk | Blutstiller (Soforteinsatz, 1 AP) `dc_b_blutstiller_400` | Keilspitze Karsk (Einheit, 4 AP, 5/3) `dc_np_karsk_keilspitze_karsk` | stärker |
| Karsk | Sezierstation (Unterstützung, 1 AP) `dc_b_sezierstation_391` | Durchbruchwagen (Einheit, 4 AP, 4/4) `dc_np_karsk_durchbruchwagen` | stärker |
| Dargan | Vorlesehof (Unterstützung, 2 AP) `dc_b_vorlesehof_932` | Kaderzug (Einheit, 2 AP, 2/4) `dc_np_dargan_kaderzug` | stärker |
| Vesper | Grenzsiegel (Ausrüstung, 2 AP) `dc_b_grenzsiegel_898` | Systemtreue Linie (Einheit, 2 AP, 2/3) `dc_np_vesper_systemtreue_linie` | stärker |
| Vesper | Siegelstadt (Unterstützung, 2 AP) `dc_b_siegelstadt_872` | Attrappenwagen (Einheit, 2 AP, 1/4) `dc_np_vesper_attrappenwagen` | stärker |
| Lyr | Warnfeuer (Soforteinsatz, 1 AP) `dc_b_warnfeuer_242` | Passhüter (Einheit, 2 AP, 2/3) `dc_np_lyr_passhueter` | stärker |
| Merovan | Zweite Verspätung (Soforteinsatz, 2 AP) `dc_b_zweite_verspaetung_212` | Garnison Weg Sieben (Einheit, 2 AP, 1/4) `dc_np_merovan_garnison_weg_sieben` | stärker |
| Merovan | Feldküche (Unterstützung, 1 AP) `dc_b_feldkueche_193` | Wegposten (Einheit, 2 AP, 2/2) `dc_np_merovan_wegposten` | stärker |
| Namar | Zollsäckchen (Ausrüstung, 1 AP) `dc_b_zollsaeckchen_537` | Hafenkran-Haken (Ausrüstung, 1 AP) `dc_np_namar_hafenkran_haken` | schwächer |
| Namar | Dunkelblau (Ausrüstung, 1 AP) `dc_b_dunkelblau_533` | Signalpistole (Ausrüstung, 1 AP) `dc_np_namar_signalpistole` | schwächer |
| Namar | Angekommener Rest (Soforteinsatz, 2 AP) `dc_b_angekommener_rest_524` | Lieferwaffe (Ausrüstung, 1 AP) `dc_np_namar_lieferwaffe` | schwächer |
| Namar | Bahn frei (Soforteinsatz, 2 AP) `dc_b_bahn_frei_528` | Kaipanzerung (Ausrüstung, 1 AP) `dc_np_namar_kaipanzerung` | schwächer |
| Namar | Anteil lassen (Soforteinsatz, 1 AP) `dc_b_anteil_lassen_527` | Schmuggelware (Ausrüstung, 1 AP) `dc_np_namar_schmuggelware` | schwächer |
| Sahr | Sandmantel (Ausrüstung, 1 AP) `dc_b_sandmantel_713` | Ruderpanzer (Ausrüstung, 2 AP) `dc_np_sahr_ruderpanzer` | schwächer |
| Sahr | Satteltasche (Ausrüstung, 2 AP) `dc_b_satteltasche_720` | Flankenklinge (Ausrüstung, 1 AP) `dc_np_sahr_flankenklinge` | schwächer |
| Averon | Sandstreifen (Ausrüstung, 1 AP) `dc_b_sandstreifen_833` | Schnellfeuergewehr (Ausrüstung, 1 AP) `dc_np_averon_schnellfeuergewehr` | schwächer |
| Eldran | Parlamentsstempel (Ausrüstung, 2 AP) `dc_b_parlamentsstempel_776` | Kronbanner (Ausrüstung, 2 AP) `dc_np_eldran_kronbanner` | schwächer |
| Eldran | Bindungszeichen (Ausrüstung, 1 AP) `dc_b_bindungszeichen_772` | Bajonett der Garde (Ausrüstung, 1 AP) `dc_np_eldran_bajonett_der_garde` | schwächer |
| Vael | Quartalsende (Unterstützung, 4 AP) `dc_b_quartalsende_161` | Werkschutzzug (Einheit, 2 AP, 2/3) `dc_np_vael_werkschutzzug` | stärker |
| Vael | Werksanzeige (Unterstützung, 3 AP) `dc_b_werksanzeige_157` | Aktionärsgarde (Einheit, 3 AP, 3/4) `dc_np_vael_aktionaersgarde` | stärker |

### Poolkarten: Werte (65, je ±1)

| Nation | Karte | AP | vorher | nachher |
|---|---|---:|---|---|
| Dargan | Abschlussfeuer `dc_np_dargan_abschlussfeuer` | 4 | 4/3 | 4/4 |
| Dargan | Buchkrieg `dc_np_dargan_buchkrieg` | 5 | 5/5 | 5/6 |
| Dargan | Buchprüfer `dc_np_dargan_buchpruefer` | 1 | 1/1 | 1/2 |
| Dargan | Feldregistrator `dc_np_dargan_feldregistrator` | 2 | 1/2 | 1/3 |
| Dargan | Gebundene Häuser `dc_np_dargan_gebundene_haeuser` | 5 | 5/3 | 5/4 |
| Dargan | Haftungsstoß `dc_np_dargan_haftungsstoss` | 4 | 4/4 | 4/5 |
| Dargan | Hauptbuchhalter `dc_np_dargan_hauptbuchhalter` | 4 | 3/5 | 3/6 |
| Dargan | Kaderkolonne `dc_np_dargan_kaderkolonne` | 5 | 5/4 | 5/5 |
| Dargan | Kaderzug `dc_np_dargan_kaderzug` | 2 | 2/3 | 2/4 |
| Dargan | Registermörser `dc_np_dargan_registermoerser` | 2 | 2/1 | 2/2 |
| Dargan | Schuldbrecher `dc_np_dargan_schuldbrecher` | 4 | 4/4 | 4/5 |
| Dargan | Schuldeneintreiber `dc_np_dargan_schuldeneintreiber` | 2 | 2/2 | 2/3 |
| Dargan | Schuldner-Kompanie `dc_np_dargan_schuldner_kompanie` | 1 | 2/1 | 2/2 |
| Dargan | Vollstrecker `dc_np_dargan_vollstrecker` | 3 | 4/2 | 4/3 |
| Dargan | Zielbatterie `dc_np_dargan_zielbatterie` | 3 | 3/2 | 3/3 |
| Dargan | Zinsbatterie `dc_np_dargan_zinsbatterie` | 3 | 2/3 | 2/4 |
| Eldran | Burgfeuerstellung `dc_np_eldran_burgfeuerstellung` | 4 | 3/4 | 3/3 |
| Eldran | Garde der Kontinuität `dc_np_eldran_garde_der_kontinuitaet` | 4 | 3/5 | 3/4 |
| Eldran | Grenzhaubitze `dc_np_eldran_grenzhaubitze` | 3 | 3/2 | 2/2 |
| Eldran | Kundschafter der Krone `dc_np_eldran_kundschafter_der_krone` | 2 | 2/2 | 2/1 |
| Eldran | Königliche Antwort `dc_np_eldran_koenigliche_antwort` | 5 | 5/5 | 5/4 |
| Merovan | Achsenbeobachter `dc_np_merovan_achsenbeobachter` | 2 | 2/2 | 2/1 |
| Merovan | Achsenkeil `dc_np_merovan_achsenkeil` | 4 | 4/4 | 4/3 |
| Merovan | Ausharrende `dc_np_merovan_ausharrende` | 3 | 3/4 | 3/3 |
| Merovan | Garnisonsälteste `dc_np_merovan_garnisonsaelteste` | 4 | 3/5 | 3/4 |
| Merovan | Haltefeuer `dc_np_merovan_haltefeuer` | 4 | 3/4 | 3/3 |
| Merovan | Kolonnenschützen `dc_np_merovan_kolonnenschuetzen` | 1 | 1/2 | 1/1 |
| Merovan | Stellung am Wegende `dc_np_merovan_stellung_am_wegende` | 5 | 4/5 | 4/4 |
| Merovan | Wegbatterie `dc_np_merovan_wegbatterie` | 3 | 3/2 | 2/2 |
| Merovan | Wegposten `dc_np_merovan_wegposten` | 2 | 2/3 | 2/2 |
| Merovan | Wegpunktkommando `dc_np_merovan_wegpunktkommando` | 5 | 4/6 | 4/5 |
| Ossaria | Abnutzungsbatterie `dc_np_ossaria_abnutzungsbatterie` | 3 | 3/2 | 3/3 |
| Ossaria | Ahnenschmiedwagen `dc_np_ossaria_ahnenschmiedwagen` | 4 | 4/4 | 4/5 |
| Ossaria | Erbzug der Toten `dc_np_ossaria_erbzug_der_toten` | 1 | 1/2 | 1/3 |
| Ossaria | Grabsucher `dc_np_ossaria_grabsucher` | 1 | 1/1 | 1/2 |
| Ossaria | Nahdruckmörser `dc_np_ossaria_nahdruckmoerser` | 2 | 2/1 | 2/2 |
| Ossaria | Namensruf-Batterie `dc_np_ossaria_namensruf_batterie` | 5 | 5/3 | 5/4 |
| Ossaria | Namensträger `dc_np_ossaria_namenstraeger` | 2 | 2/3 | 2/4 |
| Ossaria | Plattenträger-Zug `dc_np_ossaria_plattentraeger_zug` | 3 | 3/4 | 3/5 |
| Ossaria | Plattenwagen `dc_np_ossaria_plattenwagen` | 3 | 2/5 | 2/6 |
| Ossaria | Schmied der Erinnerung `dc_np_ossaria_schmied_der_erinnerung` | 5 | 4/5 | 4/6 |
| Ossaria | Stellungsbeobachter `dc_np_ossaria_stellungsbeobachter` | 2 | 1/2 | 1/3 |
| Ossaria | Totenglocke `dc_np_ossaria_totenglocke` | 3 | 2/3 | 2/4 |
| Ossaria | Unbrechbare Platte `dc_np_ossaria_unbrechbare_platte` | 5 | 4/6 | 4/7 |
| Ossaria | Wallfeuer `dc_np_ossaria_wallfeuer` | 4 | 3/4 | 3/5 |
| Ossaria | Wächter der Namen `dc_np_ossaria_waechter_der_namen` | 4 | 3/5 | 3/6 |
| Ossaria | Zeichendeuter `dc_np_ossaria_zeichendeuter` | 2 | 2/2 | 2/3 |
| Theryn | Bannerträger `dc_np_theryn_bannertraeger` | 2 | 2/3 | 2/2 |
| Theryn | Dritte Welle `dc_np_theryn_dritte_welle` | 2 | 2/2 | 2/1 |
| Theryn | Hohe Priesterschaft `dc_np_theryn_hohe_priesterschaft` | 5 | 4/5 | 4/4 |
| Theryn | Ruf über das Feld `dc_np_theryn_ruf_ueber_das_feld` | 5 | 5/3 | 4/3 |
| Theryn | Seher der Pflicht `dc_np_theryn_seher_der_pflicht` | 2 | 2/2 | 2/1 |
| Theryn | Sturmwagen `dc_np_theryn_sturmwagen` | 4 | 4/4 | 4/3 |
| Theryn | Vorbereitungsfeuer `dc_np_theryn_vorbereitungsfeuer` | 4 | 4/3 | 3/3 |
| Theryn | Vorderste Welle `dc_np_theryn_vorderste_welle` | 1 | 1/2 | 1/1 |
| Vesper | Abriegelungsbatterie `dc_np_vesper_abriegelungsbatterie` | 3 | 3/2 | 3/3 |
| Vesper | Operationsleitung Vesper `dc_np_vesper_operationsleitung_vesper` | 4 | 4/3 | 4/4 |
| Vesper | Riegelwagen `dc_np_vesper_riegelwagen` | 4 | 3/5 | 3/6 |
| Vesper | Schattenkeil `dc_np_vesper_schattenkeil` | 4 | 4/3 | 4/4 |
| Vesper | Scheinfeuerstellung `dc_np_vesper_scheinfeuerstellung` | 3 | 2/2 | 2/3 |
| Vesper | Scheinkompanie `dc_np_vesper_scheinkompanie` | 1 | 1/2 | 1/3 |
| Vesper | Systemantwort `dc_np_vesper_systemantwort` | 5 | 5/3 | 5/4 |
| Vesper | Systemmörser `dc_np_vesper_systemmoerser` | 2 | 2/1 | 2/2 |
| Vesper | Velis-Kolonne `dc_np_vesper_velis_kolonne` | 5 | 4/5 | 4/6 |
| Vesper | Überwachungsposten `dc_np_vesper_ueberwachungsposten` | 1 | 1/1 | 1/2 |

Alle 69 geänderten Vorderseiten (65 Poolkarten + 4 Doktrinen) sind im alpha40-Design neu gerendert (1024×1428). Kontaktbogen: `/workspace/t212-cards/sheets/balance-02.png` (nicht im Repo).
