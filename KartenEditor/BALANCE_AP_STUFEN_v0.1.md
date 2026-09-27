# Division Command – AP-Bepreisung und Stufeneinstufung v0.1

Stand: erster Balancepass auf Basis des aktuellen Kartenbestands im Repository.

## Zweck

Diese Datei ist eine **Balancing-Arbeitsgrundlage**. Die bisherigen Kartenfarben bzw. Seltenheitsangaben wurden nicht übernommen.

Die Einstufung wird ausschließlich aus der tatsächlichen mechanischen Wirkung der Karten abgeleitet.

**Wichtig:** Die hier angegebenen neuen AP-Werte sind Vorschläge. Die bestehenden Kartendateien werden durch diese Datei nicht automatisch überschrieben.

## Arbeitsannahmen für die Bepreisung

- Grundzufluss: **5 AP zu Beginn des eigenen Zuges**.
- Nicht ausgegebene AP dürfen zunächst **gespart** werden.
- Arbeits-Cap zum Testen: **10 AP** gleichzeitig; später nach Playtest anpassen oder entfernen.
- Reaktionen verwenden dieselbe AP-Reserve wie normale Aktionen.
- **0 AP** bleibt erlaubt, aber primär für sehr enge Reaktionen und kleine situative Eingriffe.
- Normaler Kostenbereich: **0–7 AP**.
- **8+ AP** sind Ausnahmefälle für sehr große globale Eingriffe.
- Aktivierungskosten innerhalb einer Unterstützung bleiben in diesem Pass zunächst als separate Kosten bestehen.
- AP-Kosten und Stufe sind **nicht identisch**: Eine Goldkarte muss nicht zwingend mehr AP kosten als jede Silberkarte.

## Stufen

### Bronze
Lokale, einfache oder stark situative Wirkung. Die Karte erledigt im Wesentlichen eine Sache.

### Silber
Taktische Wirkung auf mehrere Einheiten, ein Gefecht, eine kleine Zone oder eine dauerhafte Ressource.

### Gold
Operative bzw. spielzustandsverändernde Wirkung: ganze Front, ganze Unterstützungszone, erheblicher Ressourcen-/Kartenvorteil oder sehr starker Masseneffekt.

### Elite
**Nicht Teil dieser Neubepreisung.** Das bisherige `elite`-Tag im Kartensatz wird nicht automatisch übernommen. Elite bleibt eine separate mechanische Eigenschaft und soll später danach bewertet werden, ob eine Karte tatsächlich besondere Kriegs-/Kampfregeln einführt.

## Einheiten

## Einheiten

| ID | Karte | bisher AP | neue AP | Stufe | Begründung |
|---|---|---:|---:|---|---|
| dc_eh_sich | Sicherungstrupp | 1 | **1** | **Bronze** | Grundkörper; keine Fähigkeit. |
| dc_eh_frei | Freischärler | 1 | **1** | **Bronze** | Sehr günstiger Körper; kleiner Erstschlagbonus. |
| dc_eh_spaeher | Spähertrupp | 1 | **1** | **Bronze** | Grundkörper mit einfacher Aufklärung. |
| dc_eh_jaeger | Jägerstellung | 2 | **2** | **Bronze** | Lokale defensive Falle. |
| dc_eh_dschungel | Dschungelkrieger | 3 | **3** | **Silber** | 2/5 plus erneute Verschleierung nach Angriff. |
| dc_eh_spz | Schützenpanzer | 2 | **3** | **Silber** | 3/3 plus Aura für benachbarte Infanterie. |
| dc_eh_spahwagen | Spähwagen | 2 | **2** | **Silber** | Sehr effizient; deckt mehrere verdeckte Einheiten auf. |
| dc_eh_pak | Panzerabwehrtrupp | 2 | **2** | **Silber** | Extremer situativer Panzerabwehrbonus. |
| dc_eh_donner | Mittlerer Panzer Donnerkeil | 3 | **3** | **Silber** | Solider 4/4-Körper plus Zielbonus. |
| dc_eh_mg | MG-Stellung | 3 | **3** | **Silber** | 4 Angriff plus Niederhalten. |
| dc_eh_eingreif | Mobile Eingreiftruppe | 3 | **3** | **Silber** | Mobilität als zusätzliche taktische Option. |
| dc_eh_aufklaerer | Aufklärer | 3 | **4** | **Silber** | 4/3 plus Schaden und Mehrfachaufklärung. |
| dc_eh_glubscher | Spähpanzer Glubscher | 4 | **4** | **Silber** | 4/5 plus Handinformation und Aufklärung. |
| dc_eh_sniper | Scharfschütze | 3 | **4** | **Silber** | Starker Anti-Infanterie-Effekt plus erneute Verschleierung. |
| dc_eh_helden | Helden der zweiten Kompanie | 4 | **4** | **Silber** | Kostenlose Nachbesetzung nach Verlust. |
| dc_eh_himmel | Infanteriebataillon Himmelhund | 3 | **4** | **Silber** | Schulterschluss verändert die Kampfstruktur. |
| dc_eh_moerser | Mörser-Team | 3 | **4** | **Gold** | Geringe Werte, aber Angriff auf die gesamte Front. |
| dc_eh_haubitze | Haubitzenzug | 4 | **5** | **Gold** | 6/4 plus Angriff auf die gesamte gegnerische Front. |
| dc_eh_viper | Raketenwerfer Viper | 3 | **5** | **Gold** | 5/3 plus gesamte Front und Support als Ziele. |
| dc_eh_hammer | Panzertrupp Hammer | 4 | **5** | **Gold** | 7/6 plus ignoriert 2 Verteidigung gegen Gepanzerte. |
| dc_eh_kommando | Kommandogruppe | 5 | **5** | **Gold** | Flankenschutz und Mitkämpfen greifen in mehrere Gefechte ein. |
| dc_eh_faustkeil | Panzerzug Faustkeil | 5 | **6** | **Gold** | 8/6; sehr hoher Kampfkörper plus Flankenabhängigkeit. |
| dc_eh_koloss | Schwerer Panzer Koloss | 5 | **6** | **Gold** | 7/9 plus Schadensreduktion; außergewöhnlich hoher Einzelwert. |



## Unterstützung

## Unterstützung

| ID | Karte | bisher AP | neue AP | Stufe | Begründung |
|---|---|---:|---:|---|---|
| dc_su_flak | Flugabwehr | 2 | **2** | **Silber** | Enger, klarer Schutz gegen Luftangriffe. |
| dc_su_nebel | Kriegsnebel | 2 | **2** | **Silber** | Temporärer Token und Erstschlagvorteil. |
| dc_su_feldlager | Feldlager | 2 | **2** | **Silber** | Dauerhafter Kartenvorteil. |
| dc_su_radar | Radarstation | 2 | **3** | **Silber** | Schützt die eigene gesamte Unterstützungszone gegen Luftschaden. |
| dc_su_verwund | Verwundetennest | 1 | **2** | **Silber** | Frontweite Schadensreduktion plus Rückholung/Heilung. |
| dc_su_lazarett | Lazarett | 3 | **3** | **Silber** | Reparatur-/Rückholmechanik mit eigenem Risiko. |
| dc_su_drohne | Dronenkommando | 2 | **3** | **Silber** | Wiederholbarer 6-Schaden-Effekt. |
| dc_su_lager | Lagerhaus | 3 | **3** | **Silber** | Ausrüstungsrabatt plus Decksuche. |
| dc_su_schlaefer | Schläferzelle | 3 | **3** | **Silber** | Verzögerte gezielte Ausschaltung. |
| dc_su_spion | Spionagenetzwerk | 4 | **4** | **Silber** | Permanente Information plus Taktik-Rabatt. |
| dc_su_staat | Staatspropaganda | 2 | **4** | **Silber** | Skalierender Kartenvorteil über zerstörte Gegner. |
| dc_su_brumm | Störwagen Brummbär | 2 | **3** | **Silber** | Globaler Angriffsmalus plus mehrere Drohneninteraktionen. |
| dc_su_pakt | Uralter Pakt | 3 | **4** | **Silber** | +2/+2 plus potenzieller Kartenvorteil. |
| dc_su_auge | Totale Überwachung | 3 | **4** | **Gold** | Unterbindet die gesamte gegnerische Verschleierungsmechanik. |
| dc_su_festung | Festungsanlage | 3 | **4** | **Gold** | +2 Verteidigung auf die gesamte eigene Front. |
| dc_su_artillerie | Artilleriestellung | 4 | **5** | **Gold** | +1 Angriff für die Front plus wiederholbarer Direktschaden. |
| dc_su_satellit | Aufklärungssatellit | 3 | **4** | **Gold** | +2 Verteidigung für die Front plus Aufklärung. |
| dc_su_prop | Propaganda | 3 | **4** | **Gold** | Verändert dauerhaft die Kostenstruktur aller eigenen Fronteinheiten. |
| dc_su_komm | Kommunikationszentrum | 4 | **6** | **Gold** | Ermöglicht erneuten Angriff der gesamten Front plus Deckmanipulation. |
| dc_su_general | Erfahrener General | 4 | **6** | **Gold** | +2 Verteidigung der Front plus Elite-Synergie und Finte. |
| dc_su_ausland | Auslandsvertretung | 5 | **5** | **Gold** | Permanenter +1-AP-Zufluss plus besonderer Schutz. |
| dc_su_niemand | Bis niemand mehr lebt | 5 | **7** | **Gold** | Wiederholbare Zerstörung gegnerischer Front- oder Supportkarten. |



## Soforteinsätze

## Soforteinsätze

| ID | Karte | bisher AP | neue AP | Stufe | Begründung |
|---|---|---:|---:|---|---|
| dc_so_bod_luft | Boden-Luft-Rakete | 0 | **0** | **Bronze** | Sehr enge Reaktion; nur gegen Luftangriff. |
| dc_so_deckung | Deckung suchen | 0 | **0** | **Bronze** | Kleine lokale Reaktion; Bonus endet beim Angriff. |
| dc_so_pause | Pause | 0 | **0** | **Bronze** | Sehr enger taktischer Eingriff. |
| dc_so_raeum | Räumkommando | 0 | **0** | **Bronze** | Reiner Konter gegen einen bestimmten Token. |
| dc_so_formation | Standhafte Formation | 0 | **0** | **Bronze** | Kleiner Einzelzielbonus. |
| dc_so_waffen | Waffenlieferung | 0 | **0** | **Bronze** | Situativer Abbau eines Angriffsmalus. |
| dc_so_geist | Geist in den Trümmern | 0 | **1** | **Bronze** | Bedingter Handkartenangriff. |
| dc_so_lage | Lagebesprechung | 0 | **1** | **Bronze** | Zwei Einheiten mit kleinem temporärem Bonus. |
| dc_so_martyrium | Martyrium | 0 | **1** | **Bronze** | 1-for-4-Schaden mit eigenem Opfer. |
| dc_so_instand | Instandsetzung | 0 | **1** | **Silber** | Rückholung plus kostenloses Wiederausspielen und Zustandsreset. |
| dc_so_munition | Munitionstreffer | 0 | **1** | **Silber** | Starker, aber bedingter Konter gegen gepanzerte Angreifer. |
| dc_so_verpflegung | Verpflegung | 0 | **1** | **Silber** | Verteidigung auf bis zu drei Infanteristen. |
| dc_so_minenfeld | Minenfeld | 0 | **1** | **Silber** | Persistenter Token mit zwei Auslösungen. |
| dc_so_widerstand | Widerstand | 0 | **1** | **Silber** | Erzwingt ein alternatives Gefecht einer gegnerischen Einheit. |
| dc_so_vorsprung | Geistiger Vorsprung | 0 | **0** | **Silber** | Kostenlose Reaktion, aber nur bei unmittelbar angekündigtem Angriff. |
| dc_so_kavallerie | Eingriff der Kavallerie | 0 | **2** | **Silber** | Globaler Bonus für gepanzerte Fahrzeuge. |
| dc_so_luftschlag | Luftschlag | 0 | **2** | **Silber** | 5 Schaden auf Einheit oder Support. |
| dc_so_napalm | Napalm | 0 | **2** | **Silber** | Direktschaden plus anhaltender Schaden. |
| dc_so_engel | Silberner Engel | 0 | **2** | **Silber** | Starker Schutz, aber zufallsabhängig. |
| dc_so_ehren | Militärische Ehren | 0 | **3** | **Silber** | Bis zu drei bereits erfolgreiche Einheiten mit +2/+2. |
| dc_so_mobilisierung | Mobilisierung | 0 | **3** | **Gold** | Decksuche plus kostenlose Infanterie; großer Tempoeffekt. |
| dc_so_eifer | Religiöser Eifer | 0 | **4** | **Gold** | +3 Angriff für die gesamte eigene Infanterie trotz Selbstschaden. |
| dc_so_letzter | Der Letzte der steht | 0 | **3** | **Gold** | Greift die Struktur der gesamten eigenen Front an; hoher Skalierungseffekt. |
| dc_so_durchschuss | Glatter Durchschuss | 0 | **5** | **Gold** | Verdoppelt Kampfschaden einer gepanzerten Einheit. |
| dc_so_stand | Standgericht | 0 | **4** | **Gold** | Opfer einer Einheit gegen massiven Flächenbonus für die übrige Front. |
| dc_so_selbst | Selbstopfer | 0 | **4** | **Gold** | Ein eigener Verlust ermöglicht zwei gegnerische Zerstörungen. |
| dc_so_volk | Wille des Volkes | 0 | **4** | **Gold** | Frontweiter Infanteriebonus plus skalierender Kartenvorteil. |
| dc_so_mobil | Generalmobilmachung | 0 | **4** | **Gold** | +3 Karten plus +2 AP für den Zug. |
| dc_so_blinder_gehorsam | Blinder Gehorsam | 0 | **6** | **Gold** | Gesamte eigene Front greift kostenlos an und erhält +2 Angriff. |
| dc_so_strahlung | Strahlung | 0 | **5** | **Gold** | Bis zu drei benachbarte Gegner werden massiv ausgeschaltet oder verdrängt. |
| dc_so_dammbruch | Dammbruch | 0 | **6** | **Gold** | Entfernt die gesamte gegnerische Supportzone. |
| dc_so_gassen | Einsame Gassen | 0 | **7** | **Gold** | Kann alle freien Frontstellungen kostenlos aus dem Deck besetzen. |
| dc_so_massen | Psychologie der Massen | 0 | **6** | **Gold** | Ignoriert für beliebig viele Fronteinheiten die AP-Kosten. |
| dc_so_armageddon | Armageddon | 0 | **8** | **Gold** | Kompletter globaler Reset von Spielfeld und Händen. |



## Ausrüstung

## Ausrüstung

| ID | Karte | bisher AP | neue AP | Stufe | Begründung |
|---|---|---:|---:|---|---|
| dc_eq_spat | Klappspaten | 2 | **2** | **Bronze** | Lokaler defensiver Aufbau. |
| dc_eq_rauch | Rauchgranate | 2 | **2** | **Bronze** | Situativer Schutz im einzelnen Kampf. |
| dc_eq_tasche | Sanitätstasche | 2 | **2** | **Silber** | Dauerhafte Regeneration des Trägers. |
| dc_eq_fanat | Fanatischer Kommandant | 4 | **4** | **Silber** | Dauerhaft +2/+2 für eine Infanterieeinheit. |
| dc_eq_med | Medizinische Versorgung | 4 | **4** | **Silber** | Starke dauerhafte Regeneration plus Flankenunterstützung. |



## Doktrinen

## Doktrinen

| ID | Karte | Stufe | Begründung |
|---|---|---|---|
| dc_dok_blitzkrieg | Blitzkrieg | **Gold** | Globale strategische Regeländerung für Panzer/mechanisierte Infanterie und Support-Reaktionsfenster. |
| dc_dok_bollwerk | Bollwerk | **Gold** | Verändert Befestigungswerte und erzeugt dauerhafte Front-/Rückgewinnungsmechaniken. |
| dc_dok_sicherer_nachschub | Sicherer Nachschub | **Gold** | Verändert Unterstützungskosten und ermöglicht zusätzliche Aktivierungen. |
| dc_dok_tiefenverteidigung | Tiefenverteidigung | **Gold** | Globale Verteidigungs-, AP- und Supportangriffsregeln. |



## Aktueller Gesamtbestand

**88 Karten**:
- 23 Einheiten
- 22 Unterstützungskarten
- 34 Soforteinsätze
- 5 Ausrüstungskarten
- 4 Doktrinen

## AP-Ökonomie – vorläufige Leitplanken

Für ungefähr 500 Karten sollte die AP-Verteilung nicht zu eng sein. Als erste Designverteilung für normale Deckkarten bietet sich an:

| Bereich | Zielanteil | Funktion |
|---|---:|---|
| 0–1 AP | ca. 15 % | Reaktionen, kleine Karten, Basis-Einheiten |
| 2–3 AP | ca. 35 % | Hauptbereich des normalen Spiels |
| 4–5 AP | ca. 30 % | starke Standardkarten |
| 6–7 AP | ca. 15 % | große operative Karten |
| 8+ AP | ca. 5 % | Ausnahme-/Großereignisse |

Das ist nur eine Startverteilung, keine Deckbauregel.

## AP-Erzeugung – vorläufig

Der Kartenpool zeigt bereits mehrere gewünschte Formen der AP-Erzeugung: dauerhafter AP-Zuwachs, temporärer AP-Zuwachs und Kostenreduktion.

Für die spätere Balance sollten diese Effekte getrennt betrachtet werden:

1. **permanenter AP-Zufluss** – besonders teuer, da er jeden folgenden Zug wirkt;
2. **temporärer AP-Gewinn** – stark, aber nur im aktuellen Zug;
3. **Kostenreduktion** – kann stärker sein als ein direkter AP-Gewinn, wenn viele Karten davon profitieren;
4. **Kartenvorteil** – indirekte Ressource, die zusammen mit AP besonders gefährlich wird.

Große Kombinationen aus **Kartenziehen + AP-Gewinn + kostenloser Einsatz** sollten besonders vorsichtig bepreist werden.

## Balance-Notizen

Die stärksten aktuellen Kostentreiber sind:

- globale kostenlose Angriffe;
- kostenloses Massenausspielen;
- vollständige Supportzerstörung;
- vollständige Front-/Zonenwirkung;
- wiederholbare Karten-/AP-Ökonomie;
- globale Schadensverdopplung;
- vollständige Spielresets.

Diese Effekte sind bewusst teuer eingestuft. Das Ziel ist nicht, starke Karten zu vermeiden, sondern dafür zu sorgen, dass ihre Stärke **einen realen AP-Einsatz oder eine ausreichend starke Bedingung** verlangt.

## Status

**v0.1 = erster mechanischer Kostenpass.**

Noch nicht festgelegt:
- endgültige AP-Grundgenerierung;
- endgültiges AP-Cap;
- endgültige Aktivierungskosten aller Unterstützungskarten;
- endgültige Elite-Einstufung;
- finale Siegpunktbalance;
- Verhältnis von AP-Kosten zu Versorgungskosten;
- endgültige Bronze/Silber/Gold-Verteilung für die späteren ~500 Karten.
