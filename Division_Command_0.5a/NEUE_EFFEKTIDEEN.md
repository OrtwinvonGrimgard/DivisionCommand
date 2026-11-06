# Neue Effektideen – **Vorschlag, nicht implementiert**

Keine der folgenden Mechaniken ist in der Engine vorhanden, und keine Karte im Spiel nutzt sie. Jede Idee ist ein **Vorschlag, nicht implementiert**. Der Aufwand bezieht sich auf `web/js/engine/engine.js`. „Wechselwirkungen“ betrachtet immer Eingraben, Artilleriegegenschlag und SP (Siegpunkte/Trophäe).

## 1. Sperrfeuer-Zone (Vesper/Merovan) – *Vorschlag, nicht implementiert*
- **Beispielkarte:** Soforteinsatz „Feuerwalze Kilometer Neun“ (Merovan, Silber).
- **Regeltext:** „Wähle einen gegnerischen Abschnitt. Bis zum Ende des nächsten gegnerischen Zugs erleidet jede Einheit, die dort eingesetzt wird oder sich dorthin bewegt, sofort 1 Schaden. Verdeckte Einheiten werden davon nicht aufgedeckt.“
- **Rolle und Konter:** Verweigert dem Gegner einen Abschnitt. Konter sind andere Abschnitte und Einheiten mit hoher DEF.
- **Engine-Aufwand:** mittel. Benötigt ein Zonenobjekt pro Abschnitt mit Ablauf sowie Hooks in Deploy und Relocate.
- **Wechselwirkungen:** Eingegrabene Einheiten sind nicht betroffen, weil sie sich nicht bewegen. Artilleriegegenschlag wird nicht ausgelöst, weil es kein Angriff ist. SP: keine.

## 2. Stellungswechsel (Lyr/Sahr) – *Vorschlag*
- **Beispielkarte:** Artillerie „Wandernde Batterie“ (Lyr).
- **Regeltext:** „Nach einem Angriff darf diese Einheit 1× pro Zug auf ein freies Feld derselben Reihe wechseln. Danach ist sie bis zum eigenen nächsten Zug nicht Ziel eines Artilleriegegenschlags.“
- **Rolle:** Das Spiel aus Schießen und Verschwinden lohnt sich mehr.
- **Aufwand:** klein bis mittel. Benötigt einen After-Attack-Hook, die Platzwahl per pending 'deploy' und ein Flag.
- **Wechselwirkungen:** Hebt Eingraben auf. Der Gegenschlag wird gezielt umgangen.

## 3. Befehlskette (Steinmark/Eldran) – *Vorschlag*
- **Beispielkarte:** Elite „Bezirkskommandant“.
- **Regeltext:** „Solange diese Einheit lebt, kostet die erste Fähigkeit pro Zug einer benachbarten Einheit 0 AP. Diese Fähigkeit erschöpft die Einheit trotzdem.“
- **Rolle:** AP-Motor für Fähigkeitsdecks. Konter: den Kommandanten gezielt angreifen.
- **Aufwand:** mittel. Benötigt Rabatt-Logik im Ability-Dispatch und ein Nachbarschaftscheck zur Laufzeit.
- **Wechselwirkungen:** Kommandant und Nachbar können eingegraben sein. Kein Bezug zu Gegenschlag und SP.

## 4. Verschleiß (Dargan/Karsk) – *Vorschlag*
- **Beispielkarte:** Ausrüstung „Schuldschein-Munition“.
- **Regeltext:** „Jedes Mal, wenn der Träger Schaden zufügt, erhält das Ziel zusätzlich 1 Verschleißmarke. Jede Verschleißmarke senkt die DEF dauerhaft um 1 (mindestens 1). Heilen entfernt eine Marke statt DEF wiederherzustellen.“
- **Rolle:** Langsamer Abbau zäher Linien. Konter: Heilen, Ossaria-Zähigkeit.
- **Aufwand:** mittel. Benötigt einen neuen Markentyp, Anpassungen in `currentAtkDef` und eine Sonderregel für HEAL.
- **Wechselwirkungen:** Der Eingraben-Bonus wird eingerechnet, die Marken senken die Basis-DEF. Auch Gegenschlag-Schaden kann Marken setzen.

## 5. Vorausplanung / Befehlskarte verdeckt (Vesper/Averon) – *Vorschlag*
- **Beispielkarte:** Soforteinsatz „Versiegelter Befehl“.
- **Regeltext:** „Lege diese Karte verdeckt in deine Unterstützungsreihe. Zu Beginn deines nächsten Zugs wähle einen von zwei Effekten: 2 Karten ziehen oder einer eigenen Fronteinheit +2 ATK bis Zugende. Der Gegner sieht nur, dass ein Befehl liegt.“
- **Rolle:** Bluff und Flexibilität.
- **Aufwand:** mittel bis hoch. Benötigt Hidden-Info-Handling (der Gegner darf nichts sehen), einen Start-of-turn-Hook und pending 'choice'.
- **Wechselwirkungen:** keine mit Eingraben oder Gegenschlag. Wegen der Leak-Regel ist ein Test nötig.

## 6. Konvoi (Namar) – *Vorschlag*
- **Beispielkarte:** Unterstützung „Konvoi Ostkai“.
- **Regeltext:** „Lege 3 Frachtmarken auf diese Karte. Zu Beginn deines Zugs entferne eine und ziehe 1 Karte. Wird eine gegnerische Einheit in deinem Abschnitt eingesetzt, verliert der Konvoi alle Marken.“
- **Rolle:** Kartenvorteil auf Zeit mit Abfangrisiko.
- **Aufwand:** klein. Benötigt einen Markenzähler und zwei Hooks.
- **Wechselwirkungen:** Ein Angriff auf Unterstützungen (ATTACK_SUPPORT) kann den Konvoi kontern.

## 7. Letzte Bastion (Ossaria/Caldris) – *Vorschlag*
- **Beispielkarte:** Infanterie „Die Letzten von Grabhügel“.
- **Regeltext:** „Ist dies deine einzige Fronteinheit in ihrem Abschnitt, hat sie +3 DEF und kann nicht unter 1 DEF fallen, solange du keine weitere Einheit dort einsetzt (1× pro Zug).“
- **Rolle:** Comeback-Halter. Konter: zwei Angriffe in einem Zug.
- **Aufwand:** mittel. Benötigt eine Laufzeit-Bedingung in `currentAtkDef` und `_damage`.
- **Wechselwirkungen:** Mit Eingraben stapelbar, deshalb ist eine Obergrenze nötig. Der Gegenschlag zählt als Angriff. SP-Abschnittskontrolle wird verlängert.

## 8. Doktrin-Resonanz (alle Nationen) – *Vorschlag*
- **Beispielkarte:** Soforteinsatz „Gelebte Doktrin“ (Theryn).
- **Regeltext:** „Hast du in diesem Zug bereits eine Doktrin-Fähigkeit genutzt, ziehe 1 Karte und eine eigene Fronteinheit erhält +1 ATK bis Zugende. Sonst nur +1 ATK.“
- **Rolle:** Belohnt Doktrin-Timing.
- **Aufwand:** klein. Benötigt ein Flag in `doctrine_runtime`.
- **Wechselwirkungen:** keine besonderen.

## 9. Funkstille (Lyr/Averon) – *Vorschlag*
- **Beispielkarte:** Aufklärung „Stiller Posten“.
- **Regeltext:** „Solange diese verdeckte Einheit lebt, kann der Gegner keine eigene AUFKLÄRUNG oder Handeinsicht gegen deine Abschnitte nutzen. Deckt sie auf, endet der Effekt.“
- **Rolle:** Antwort auf Aufklärungsdecks.
- **Aufwand:** mittel. Benötigt Guards in AUFKLAERUNG, HAND_PEEK und MARK_OBSERVED.
- **Wechselwirkungen:** Leak-Regel: Der Gegner erfährt nur, dass die Aufklärung blockiert ist.

## 10. Gegenstoß-Reserve (Eldran/Rothain) – *Vorschlag*
- **Beispielkarte:** Panzer „Reservekeil Kronfeld“.
- **Regeltext:** „Wird eine benachbarte eigene Einheit zerstört, darf diese Einheit sofort einmal kostenlos die angreifende Einheit angreifen. Gilt nicht, wenn diese Einheit erschöpft ist.“
- **Rolle:** Bestraft Durchbrüche.
- **Aufwand:** mittel bis hoch. Benötigt einen Reaktionsangriff außerhalb des eigenen Zugs; die Logik aus dem react-window kann wiederverwendet werden.
- **Wechselwirkungen:** Ein Angreifer im Artilleriegegenschlag ist eventuell außer Reichweite. Eingraben gilt normal.

## 11. Requirierung (Vael) – *Vorschlag*
- **Beispielkarte:** Soforteinsatz „Feindliche Übernahme“.
- **Regeltext:** „Zerstöre eine gegnerische Ausrüstung an einer aufgedeckten Einheit. Du erhältst 1 AP in diesem Zug.“
- **Rolle:** Antwort auf Ausrüstungsstapel.
- **Aufwand:** klein. Benötigt Ausrüstung-entfernen und TURN_AP-ähnliches Gutschreiben.
- **Wechselwirkungen:** keine besonderen. Verdeckte Einheiten sind kein Ziel, damit es kein Leak gibt.

## 12. Moral (Theryn/Karsk) – *Vorschlag*
- **Beispielkarte:** Elite „Fahnenträgerin der dritten Welle“.
- **Regeltext:** „Wird eine eigene Einheit in diesem Abschnitt zerstört, erhalten alle anderen eigenen Einheiten dort +1 ATK bis Ende deines nächsten Zugs, maximal +2.“
- **Rolle:** Wellentaktik.
- **Aufwand:** klein bis mittel. Benötigt einen On-destroy-Hook und eine Buff-Dauer über einen Zug.
- **Wechselwirkungen:** Auch Gegenschlag-Verluste lösen den Effekt aus. SP: keine.
