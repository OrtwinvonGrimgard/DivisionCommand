# Neue Effektideen – **Vorschlag, nicht implementiert**

> **Hinweis:** Die 16 allgemeinen Schlüsselwörter (Gefechtsbereit … Zähigkeit) sind **implementiert** und in `SCHLUESSELWOERTER.md` beschrieben. Die Sondermechaniken unten sind davon getrennt und bleiben **Vorschläge, nicht implementiert**. Wo ein Entwurf ein gleichnamiges Wort nennt (z. B. „Stellungswechsel“ in Teil B), gilt im Spiel die Bedeutung aus dem Glossar.

**Status:** Dieses Dokument enthält ausschließlich **Entwürfe**. Keine Mechanik ist in der Engine vorhanden. Keine Beispielkarte existiert im Katalog. Die 640 Nationenpool-Karten nutzen nur bereits verdrahtete Effekte.

**Grundlage:**
- Nationenidentität aus `LORE_NATIONEN.md` (Bindung je Nation).
- Kampfregeln aus `BALANCE_FRONT.md` und `RULES_v0.5_GRUNDKONZEPT.md`.

**Bezugsregeln für die Wechselwirkungen:**
- **Eingraben:** Eine frisch eingesetzte Einheit ist bis zum Beginn ihres nächsten eigenen Zugs nicht angreifbar und nicht gezielt beschädigbar. Sie hat in dieser Zeit +1 DEF. Flächenschaden trifft trotzdem.
- **Gegenschlag:** Es gilt `survivor_only`. Der Verteidiger schlägt nur zurück, wenn er überlebt. Bei Artillerie-Angreifern gibt es einen Gegenschlag nur, wenn der Verteidiger die Artillerie selbst legal erreichen könnte. Gegen Unterstützungen gibt es keinen Gegenschlag.
- **Reichweite:** Es gelten die legalen Angriffsziele (`legalAttackTargets`).
- **SP:** Siegpunkte aus Doktrin-Zielen im Trophäenmodus. Die Doktrin-Ziele sind nicht nationsspezifisch.

**Verdeckte Information:** Kein Entwurf darf dem Gegner Identität, Werte oder Effekt einer verdeckten Karte zeigen. Wo ein Effekt öffentlich wird, steht es ausdrücklich im Text.

---

## Teil A – Eine Mechanik je Nation (16 Entwürfe)

### 1. Steinmark (Recht) – „Freigabe“ · *Vorschlag, nicht implementiert*
- **Lore:** Ein Einsatz, den das Verfahren nicht geöffnet hat, findet nicht statt. Ist er geöffnet, führt die Truppe fachlich stark.
- **Beispielkarte:** Unterstützung „Schlüsselprotokoll Amtsbrück“ (Silber, 3 AP).
- **Kartentext:** „Freigabe: Zu Beginn deines Zugs legst du 1 Freigabemarke auf diese Karte (höchstens 3). Einmal pro Zug darfst du, bevor du eine Einheit einsetzt, 2 Marken entfernen: Diese Einheit ist sofort einsatzbereit. Sie darf in diesem Zug angreifen, verliert aber den Eingraben-Schutz und den Eingraben-Bonus. Ohne 2 Marken passiert nichts.“
- **Konter/Balance:** Der Aufbau dauert 2 Züge und ist deshalb langsam. Konter: ATTACK_SUPPORT auf das Protokoll, das löscht alle Marken. Eine Obergrenze von 3 Marken verhindert, dass Marken gehortet werden.
- **Wechselwirkungen:**
  - Eingraben: wird bewusst geopfert. Die Einheit ist sofort angreifbar.
  - Reichweite: normal.
  - Gegenschlag: normal. Die Einheit kann beim eigenen Angriff Gegenschlag kassieren.
  - SP: beschleunigt Ziele wie „Blitzkrieg“.

### 2. Eldran (Krone) – „Stammregiment“ · *Vorschlag*
- **Lore:** Ein Name und ein Regiment bleiben, auch wenn die Leute wechseln. Die Truppe hält die Orte, an denen der Staat schon immer war.
- **Beispielkarte:** Elite „Regiment der Krone von Aurelien“ (Gold, 5 AP, 4/6).
- **Kartentext:** „Stammregiment: Wird diese Einheit zerstört, bleibt ihr Feld bis zum Ende deines nächsten Zugs als ‚Stammplatz‘ markiert (öffentlich sichtbar). Die nächste eigene Einheit, die du auf diesen Stammplatz setzt, kostet 2 AP weniger (mindestens 1) und erhält dauerhaft +1 DEF. Danach erlischt die Markierung. Nicht stapelbar: Ein Feld hat höchstens einen Stammplatz.“
- **Konter/Balance:** Der Gegner sieht die Markierung und kann das Feld mit Flächenschaden oder Artillerie bestrafen. Das Fenster ist auf einen eigenen Zug begrenzt.
- **Wechselwirkungen:**
  - Eingraben: der Nachrücker gräbt sich normal ein, +1 DEF zusätzlich.
  - Gegenschlag und Reichweite: unverändert.
  - SP: passt direkt zu „Ablösung“ (nachrücken nach Verlust).

### 3. Rothain (Erbe) – „Rechenschaft“ · *Vorschlag*
- **Lore:** Rothain ist laut Lore eine Republik mit geerbtem Arsenal, keine Krone. Die Krone ist Eldran. Jeder Einsatz muss politisch begründet werden.
- **Beispielkarte:** Artillerie „Geerbte Batterie Rothenburg“ (Silber, 4 AP, 4/3).
- **Kartentext:** „Rechenschaft: Diese Einheit darf nur angreifen, wenn in diesem Zug bereits eine eigene Einheit angegriffen hat oder eine eigene Einheit seit deinem letzten Zug zerstört wurde. Greift sie dann an, ignoriert sie 2 DEF des Ziels für diesen Angriff.“
- **Konter/Balance:** Das starke Arsenal hat eine echte Auflage. Der Gegner kann sie verzögern, indem er die eigenen Erstangreifer schützt.
- **Wechselwirkungen:**
  - Eingraben: Das Ziel muss angreifbar sein. Eingegrabene Ziele bleiben tabu, das Ignorieren der DEF umgeht den Schutz nicht.
  - Gegenschlag: wie bei Artillerie üblich, nur wenn der Verteidiger erreichen kann.
  - SP: unterstützt „Abnutzung“.

### 4. Averon (Zeit) – „Lagebild live“ · *Vorschlag*
- **Lore:** Ein Befehl auf alten Daten ist kein guter Befehl. Wer vor Ort mehr weiß, soll handeln.
- **Beispielkarte:** Aufklärung „Knotentrupp Novaris“ (Silber, 2 AP, 1/3).
- **Kartentext:** „Lagebild: Solange diese Einheit offen in der Front liegt, darf jede benachbarte eigene Einheit einmal pro Zug ihre Fähigkeit ohne Erschöpfen nutzen, wenn das Ziel in diesem Zug aufgedeckt wurde. Die AP-Kosten bleiben. Zerstört der Gegner den Knotentrupp, verlieren alle eigenen Einheiten bis zu deinem nächsten Zug 1 ATK. Das ist der Ausfall der Verbindung.“
- **Konter/Balance:** Ein klarer Schlüsselpunkt, den der Gegner fokussieren kann. Die Strafe beim Verlust spiegelt die Verwundbarkeit eines vernetzten Heeres.
- **Wechselwirkungen:**
  - Eingraben: schützt den Trupp in seiner ersten Runde.
  - Reichweite und Gegenschlag: unverändert.
  - SP: unterstützt „Aufklärungsschlag“.

### 5. Orthea (Erkenntnis) – „Modell und Abbruchregel“ · *Vorschlag*
- **Lore:** Einsatz nach Modell und Unterschrift. Ein falsches Modell wird beendet.
- **Beispielkarte:** Soforteinsatz „Modellfreigabe Asteron“ (Bronze).
- **Kartentext:** „Wähle eine offene gegnerische Fronteinheit in Reichweite einer eigenen Einheit und sage eine Zahl von 1 bis 3 an (öffentlich). Bis zum Ende deines Zugs gilt: Fügt eine eigene Einheit diesem Ziel genau so viel Schaden zu, wie es noch DEF hat, ziehe 2 Karten. Endet dein Zug, ohne dass das Ziel zerstört wurde, greift die Abbruchregel: Du verlierst 1 AP in deinem nächsten Zug.“
- **Konter/Balance:** Belohnt exaktes Rechnen. Konter: Schadensreduktion (REDUCE_DAMAGE) oder Heilung verfälschen das Modell.
- **Wechselwirkungen:**
  - Eingraben: Eingegrabene Ziele sind nicht wählbar.
  - Gegenschlag: wird normal abgehandelt.
  - SP: keine direkte Verbindung.

### 6. Vesper (System) – „Zwei Lagebilder“ · *Vorschlag*
- **Lore:** Ein Heer mit mehreren gültigen Lagen. Informationen setzt man wie Züge.
- **Beispielkarte:** Einheit (Infanterie) „Doppelmeldung Velis“ (Silber, 3 AP, 2/3).
- **Kartentext:** „Zwei Lagebilder: Setze diese Einheit verdeckt ein und lege gleichzeitig eine Karte aus deiner Hand verdeckt als ‚Lagebild‘ unter sie. Wird die Einheit aufgedeckt, wähle: Sie bleibt, oder du tauschst sie gegen das Lagebild, falls dieses eine Einheit mit höchstens denselben AP-Kosten ist. Die nicht gewählte Karte geht auf den Ablagestapel. Der Gegner erfährt nur, dass ein Lagebild existiert, nicht welches.“
- **Konter/Balance:** Kostet eine Handkarte. Konter: Handeinsicht vorher oder direkter Schaden, bevor die Einheit aufgedeckt wird.
- **Wechselwirkungen:**
  - Eingraben: der Tausch gilt nicht als neuer Einsatz, es gibt also kein neues Eingraben.
  - Gegenschlag: wird normal mit der gewählten Karte abgehandelt.
  - Verdeckte Information: Das Lagebild bleibt geheim, bis es gewählt wird. Wird es abgeworfen, geht es verdeckt auf den Stapel. Das muss getestet werden.

### 7. Karsk (Körper) – „Herrichtung“ · *Vorschlag*
- **Lore:** Der Soldat wird für den Krieg hergerichtet. Der Verlust der Person ist ein akzeptierter Preis.
- **Beispielkarte:** Ausrüstung „Graft Sektorstadt 7“ (Silber, 2 AP).
- **Kartentext:** „Herrichtung: Lege an eine eigene Infanterie. Der Träger erhält dauerhaft +2 ATK und +1 DEF. Am Ende jedes deiner Züge erleidet er 1 Schaden, der nicht verhindert werden kann (auch nicht durch Eingraben oder Schadensreduktion). Wird der Träger zerstört, ziehe 1 Karte. Sein Datensatz bleibt.“
- **Konter/Balance:** Ein Zeitlimit für den Träger. Der Gegner kann ihn einfach meiden. Die Mechanik ist absichtlich inhuman.
- **Wechselwirkungen:**
  - Eingraben: Der Eigenschaden ignoriert den Schutz.
  - Gegenschlag: Mehr ATK bedeutet stärkeren Gegenschlag.
  - SP: Der Selbstverlust zählt nicht für „Etappensicherung“.

### 8. Caldris (Fürsorge) – „Akte und Schild“ · *Vorschlag*
- **Lore:** Was gemeldet ist, wird schnell gestopft. Was nicht berichtet, bleibt auf dem Papier gesund.
- **Beispielkarte:** Unterstützung „Versorgungsliste Seren“ (Silber, 3 AP).
- **Kartentext:** „Akte: Einmal pro Zug, wenn eine offene eigene Fronteinheit Schaden erleidet und überlebt, heile sie am Ende dieses Zugs um bis zu 2. Verdeckte eigene Einheiten werden nicht erfasst und nicht geheilt.“
- **Konter/Balance:** Heilt nur Überlebende und nur einmal pro Zug. Konter: Schaden, der sofort tötet, oder zwei Treffer gegen dieselbe Einheit.
- **Wechselwirkungen:**
  - Eingraben: keine besondere Wechselwirkung.
  - Gegenschlag: Wer zurückschlägt, wird auch geheilt.
  - Verdeckte Information: Verdeckte Einheiten sind ausdrücklich ausgeschlossen, es gibt also kein Leak.
  - SP: stärkt „Auffangen“.

### 9. Theryn (Glaube) – „Eifer mit Planbremse“ · *Vorschlag*
- **Lore:** Wenige, bekannte Eiferer werden zuerst genutzt. Der Plan darf Nein sagen.
- **Beispielkarte:** Elite „Eiferer des Malen Voss“ (Gold, 3 AP, 3/2).
- **Kartentext:** „Eifer: Diese Einheit muss, wenn möglich, in deinem Zug als erste eigene Einheit angreifen. Sie erhält +1 ATK für jede eigene Einheit, die in dieser Partie bereits zerstört wurde (höchstens +3). Planbremse: Statt anzugreifen, darfst du 1 AP zahlen. Dann greift sie in diesem Zug nicht an und erhält +2 DEF bis zu deinem nächsten Zug.“
- **Konter/Balance:** Ist vorhersehbar, deshalb kann der Gegner mit hoher DEF davor Gegenschlagsfallen stellen. Das Limit von +3 begrenzt den Schneeballeffekt.
- **Wechselwirkungen:**
  - Eingraben: Die Angriffspflicht greift erst ab dem ersten möglichen Angriff, also nicht im Einsatzzug.
  - Gegenschlag: Die geringe DEF macht sie verwundbar.
  - SP: unterstützt „Abnutzung“.

### 10. Vael (Geschäft) – „Auftragsbuch“ · *Vorschlag*
- **Lore:** Ein Einsatz, den die Werke nicht beliefern, findet nicht statt.
- **Beispielkarte:** Unterstützung „Lieferbuch Vaalen“ (Silber, 2 AP).
- **Kartentext:** „Auftragsbuch: Zu Beginn deines Zugs wähle eine Kartenart (Infanterie, Panzer, Artillerie). Karten dieser Art kosten in diesem Zug 1 AP weniger (mindestens 1). Karten anderer Einheitenarten kosten in diesem Zug 1 AP mehr. Die Wahl ist öffentlich.“
- **Konter/Balance:** Das Deck wird berechenbar. Der Gegner sieht die Wahl und kann sich darauf einstellen.
- **Wechselwirkungen:** keine mit Eingraben, Reichweite oder Gegenschlag. SP: indirekt, z. B. über „Breites Aufgebot“.

### 11. Sahr (Fluss) – „Stehende Kolonne“ · *Vorschlag*
- **Lore:** Eine Stellung ohne Nachschub ist schon die Niederlage.
- **Beispielkarte:** Panzer „Wegsicherung Sarun“ (Silber, 4 AP, 3/4).
- **Kartentext:** „Fluss: Hat diese Einheit in deinem letzten Zug weder angegriffen noch das Feld gewechselt, erhält sie –1 ATK, bis sie wieder angreift oder wechselt (öffentlich markiert). Einmal pro Zug darf sie für 1 AP auf ein freies benachbartes Feld wechseln. Danach darf sie in diesem Zug nicht mehr angreifen.“
- **Konter/Balance:** Bewegung ist Pflicht, Angriff kostet Tempo. Konter: Felder blockieren.
- **Wechselwirkungen:**
  - Eingraben: Wechseln bedeutet kein neues Eingraben.
  - Reichweite: Der Wechsel ändert Reichweite und Nachbarschaft. Auren werden derzeit nur beim Einsatz neu berechnet, der Wechsel bräuchte also eine Neuberechnung.
  - Gegenschlag: unverändert.

### 12. Namar (Häfen) – „Hafenstütze“ · *Vorschlag*
- **Lore:** Ein Hafen gibt als Unterstützung starken Bonus. Fällt ein Kai, ist das ein Angriff auf alle.
- **Beispielkarte:** Unterstützung „Kai von Maris“ (Gold, 4 AP).
- **Kartentext:** „Hafenstütze: Zu Beginn deines Zugs wähle eins: Ziehe 1 Karte, oder heile eine eigene Fronteinheit um 2, oder deine nächste Einheit in diesem Zug kostet 1 AP weniger. Wird der Kai zerstört, erhalten alle eigenen Fronteinheiten bis zum Ende deines nächsten Zugs +1 ATK. Höchstens ein Kai pro Spieler im Spiel.“
- **Konter/Balance:** Ein stark lohnendes Ziel für ATTACK_SUPPORT. Die Rache-Klausel macht den Angriff teuer.
- **Wechselwirkungen:**
  - Gegenschlag: Gegen Unterstützungen gibt es keinen Gegenschlag. Der Rache-Bonus ersetzt ihn.
  - SP: keine direkte Verbindung.

### 13. Merovan (Weg) – „Lizenz“ · *Vorschlag*
- **Lore:** Ohne Lizenz ist das Schiff Privatgeschäft. Fällt die Unterstützung, steht die Garnison noch, nur ohne Verbindung.
- **Beispielkarte:** Unterstützung „Lizenzschiff Merovia“ (Silber, 3 AP).
- **Kartentext:** „Lizenz: Wähle beim Ausspielen einen Abschnitt. Eigene Einheiten in diesem Abschnitt erhalten +1 DEF, solange diese Karte liegt. Wird die Karte zerstört, behalten die Einheiten den Bonus bis zum Ende deines nächsten Zugs, dann entfällt er.“
- **Konter/Balance:** Konter: Unterstützungsangriff. Die Verzögerung sorgt für einen fairen Übergang.
- **Wechselwirkungen:**
  - Eingraben: +1 DEF stapelt mit dem Eingraben-Bonus.
  - Gegenschlag: mehr Überlebende, also mehr Gegenschläge.
  - SP: stärkt „Bollwerk“.
  - Engine: Die DEF muss zur Laufzeit berechnet werden, nicht fest eingebacken.

### 14. Dargan (Schuld) – „Aufruf und Tilgung“ · *Vorschlag*
- **Lore:** Eine Zeile nennt Tat, Häuser, Material und Tag. Ist die Zeile zu, gehen die Häuser nach Hause.
- **Beispielkarte:** Soforteinsatz „Zeile des Tages“ (Silber).
- **Kartentext:** „Aufruf: Wähle eine gegnerische offene Fronteinheit als Tat (öffentlich markiert). Bis zum Ende deines nächsten Zugs erhalten eigene Einheiten gegen dieses Ziel +2 ATK. Wird das Ziel in dieser Zeit zerstört, ist die Zeile zu: Alle eigenen Einheiten, die es angegriffen haben, kehren auf die Hand zurück (Tilgung). Wird es nicht zerstört, ist die Schuld gestundet: Du ziehst in deinem übernächsten Zug 1 Karte weniger.“
- **Konter/Balance:** Konter: das markierte Ziel schützen, heilen oder verstecken (RELOCATE_HIDE beendet die Markierung). Die Rückkehr auf die Hand ist Vorteil und Tempoverlust zugleich.
- **Wechselwirkungen:**
  - Eingraben: Eingegrabene Ziele sind nicht wählbar.
  - Gegenschlag: wird normal abgehandelt, auch für Einheiten, die zurückkehren.
  - SP: Die Rückkehr verhindert Verluste, das passt zu „Etappensicherung“.

### 15. Lyr (Eid) – „Der Ruf“ · *Vorschlag*
- **Lore:** Ein getroffenes Tal ruft, wen der Eid noch erreicht. Ein Tal darf zu spät kommen, aber nicht verkaufen.
- **Beispielkarte:** Infanterie „Talwacht Hochpass“ (Bronze, 2 AP, 2/3).
- **Kartentext:** „Der Ruf: Wird diese Einheit angegriffen und überlebt, darfst du sofort eine Einheit mit höchstens 2 AP aus deiner Hand kostenlos verdeckt auf ein freies Feld desselben Abschnitts setzen. Höchstens einmal pro gegnerischem Zug für alle Rufkarten zusammen. Der Gegner erfährt nur, dass eine verdeckte Einheit erscheint.“
- **Konter/Balance:** Konter: die Talwacht in einem Schlag töten oder mit Fernkampf angreifen, sodass sie nicht überlebt.
- **Wechselwirkungen:**
  - Eingraben: Die gerufene Einheit gräbt sich normal ein.
  - Gegenschlag: Der Ruf folgt nach dem Gegenschlag.
  - Verdeckte Information: Nur die Tatsache des Einsatzes ist sichtbar.

### 16. Ossaria (Tote) – „Grenze der Namen“ · *Vorschlag*
- **Lore:** Die Truppe trägt die Namen mit. Ein Sieg, der neue Namen erzwingt, gilt als Missbrauch der Toten.
- **Beispielkarte:** Ausrüstung „Namensplatte“ (Bronze, 1 AP).
- **Kartentext:** „Namen: Lege an eine eigene Einheit. Für jede eigene Einheit, die in dieser Partie zerstört wurde, hat der Träger +1 DEF (höchstens +3). Grenze der Namen: Greift der Träger an, während er weniger als die Hälfte seiner DEF hat, verliert er alle Boni dieser Platte bis zum Ende des Zugs.“
- **Konter/Balance:** Belohnt Schutz statt Opfer. Konter: ihn früh angreifen, bevor die Namen sich sammeln.
- **Wechselwirkungen:**
  - Eingraben: stapelt, deshalb ist das Limit wichtig.
  - Gegenschlag: Der Träger hält länger und schlägt öfter zurück.
  - SP: passt zu „Auffangen“ und „Etappensicherung“.

---

## Teil B – Die 12 allgemeinen Ideen, überarbeitet · *Vorschlag, nicht implementiert*

1. **Sperrfeuer-Zone:** „Wähle einen gegnerischen Abschnitt. Bis zum Beginn deines nächsten Zugs erleidet jede Einheit, die dort eingesetzt wird, 1 Schaden.“
   - Der Schaden zählt als Flächenschaden und trifft deshalb auch gerade eingegrabene Einheiten.
   - Verdeckte Einheiten nehmen Schaden, werden aber nicht aufgedeckt. Es wird kein Wert angezeigt.
2. **Stellungswechsel (korrigiert):** Der alte Entwurf kam zu spät, weil der Gegenschlag schon vor dem Wechsel kommt.
   - Neu: „Bevor diese Artillerie angreift, darf sie 1× pro Zug auf ein freies Feld derselben Reihe wechseln. Danach wird die Gegenschlag-Reichweite vom neuen Feld aus geprüft.“
   - Der Wechsel erzeugt kein neues Eingraben.
3. **Befehlskette:** „Die erste Fähigkeit pro Zug einer benachbarten eigenen Einheit kostet 1 AP weniger (mindestens 0). Die Nachbarschaft wird beim Einsatz der Fähigkeit geprüft.“
4. **Verschleiß:** Höchstens 2 Marken pro Ziel. Eine Marke senkt die DEF um 1, aber nie unter 1. HEAL entfernt zuerst 1 Marke und heilt dann den Rest normal.
5. **Versiegelter Befehl:**
   - Die Karte liegt verdeckt in der Unterstützungsreihe. Der Gegner sieht nur „1 versiegelter Befehl“.
   - Beim Auflösen werden Karte und Wahl öffentlich. Wird die Karte vorher zerstört, geht sie **verdeckt** auf den Ablagestapel.
6. **Konvoi (korrigiert):** Die alte Bedingung „Gegner setzt in deinem Abschnitt ein“ war unklar, weil der Gegner in seine eigenen Felder einsetzt.
   - Neu: „Verlierst du in einem Zug eine Fronteinheit im Abschnitt, in dem der Konvoi liegt, verliert er 1 Marke.“
7. **Letzte Bastion (präzisiert):** „Ist diese Einheit zu Beginn des gegnerischen Zugs die einzige eigene Fronteinheit in ihrem Abschnitt, hat sie bis zum Ende dieses gegnerischen Zugs +2 DEF. Der erste Schaden, der sie in diesem Zug töten würde, lässt sie stattdessen mit 1 DEF überleben.“
   - Der Effekt gilt einmal pro gegnerischem Zug.
   - Er stapelt nicht mit einem zweiten Bastion-Effekt.
8. **Doktrin-Resonanz:** unverändert. „In diesem Zug“ meint den eigenen Zug, und die Bedingung wird beim Ausspielen geprüft.
9. **Funkstille (korrigiert):** Der alte Entwurf verriet den Posten über die Blockade.
   - Neu: „Gegnerische Aufklärung, die einen Abschnitt mit dieser verdeckten Einheit wählt, deckt stattdessen eine zufällige andere verdeckte eigene Karte dort auf. Gibt es keine, verpufft sie mit der Meldung ‚keine Erkenntnis‘.“
   - Diese Meldung erscheint auch ohne Funkstille, wenn nichts aufzudecken ist. Dadurch verrät sie den Posten nicht.
10. **Gegenstoß-Reserve:** Der Reaktionsangriff braucht ein legales Ziel und nutzt `legalAttackTargets`. Eingegrabene Angreifer sind keine Ziele. Der Gegenschlag dieses Angriffs läuft normal.
11. **Requirierung:** „Zerstöre eine Ausrüstung an einer offenen gegnerischen Einheit und erhalte 1 AP in diesem Zug.“ Verdeckte Einheiten sind kein Ziel.
12. **Moral:** „Wird eine eigene Einheit in diesem Abschnitt zerstört, erhalten die anderen eigenen Einheiten dort +1 ATK bis zum Ende deines nächsten Zugs (höchstens +2 gesamt).“ Auch Verluste durch Gegenschlag zählen.

---
**Grenzen:**
- Alle Werte sind ungetestete Startwerte. Es gibt keine Balance-Aussage.
- Engine-Aufwand grob:
  - **klein:** 8, 11, 12, Vael, Merovan
  - **mittel:** Steinmark, Eldran, Rothain, Orthea, Karsk, Caldris, Theryn, Sahr, Namar, Ossaria, 1, 3, 4, 6, 7
  - **hoch:** Vesper, Lyr, Dargan, Averon, 2, 5, 9, 10
- Einige Entwürfe brauchen Laufzeit-Auren, weil die Engine Auren heute nur beim Einsatz neu berechnet.
