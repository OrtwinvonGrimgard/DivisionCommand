/* GENERIERT von scripts/nation_pools/build.js – nicht von Hand ändern.
   Nationenpool-Erweiterung (Entwurf, ohne fertiges Artwork: art_status "platzhalter"). */
window.DC_SET_TYPES = window.DC_SET_TYPES || {};
window.DC_SET_TYPES["Nationenpool"] = [
 {
  "id": "dc_np_steinmark_paragraphenzug",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Paragraphenzug",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Erst die Vorschrift, dann der Graben.",
  "collector": "NP-STM-01",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 4,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Heranführung"
  ]
 },
 {
  "id": "dc_np_steinmark_normschuetzen",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Normschützen",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Angriffe gegen ungepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "FEUERUEBERLEGENHEIT"
   }
  ],
  "flavor": "Gleicher Abstand, gleiches Kaliber, gleiches Ergebnis.",
  "collector": "NP-STM-02",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Erbitterung"
  ]
 },
 {
  "id": "dc_np_steinmark_begleitzug_freigabe",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Begleitzug Freigabe",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Benachbarte eigene Infanterie +1 DEF.",
  "rules": [
   "Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "MECH_AURA"
   }
  ],
  "flavor": "Wer neben dem Standard steht, steht sicher.",
  "collector": "NP-STM-03",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_steinmark_akteneinsichtstrupp",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Akteneinsichtstrupp",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.",
  "rules": [
   "Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie."
  ],
  "effects": [
   {
    "code": "HAND_PEEK",
    "param": {
     "n": 2
    }
   }
  ],
  "flavor": "Was der Gegner plant, steht irgendwo geschrieben.",
  "collector": "NP-STM-04",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Ablösung"
  ]
 },
 {
  "id": "dc_np_steinmark_landwehr_bezirk_vier",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Landwehr Bezirk Vier",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Bürger in Uniform, Dienstzeit nach Gesetz.",
  "collector": "NP-STM-05",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_steinmark_verfahrensriegel",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Verfahrensriegel",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Der Riegel hält, weil jeder weiß, wo er steht.",
  "collector": "NP-STM-06",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_steinmark_normpanzer_baureihe_zwei",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Normpanzer Baureihe Zwei",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Ersatzteile passen in jeden Wagen der Baureihe.",
  "collector": "NP-STM-07",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 2,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_steinmark_bezirkskette",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Bezirkskette",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Angriffe gegen gepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 1 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "IGNORE_DEF",
    "param": {
     "ignore_def": 1
    }
   }
  ],
  "flavor": "Abgenommen für Gegner mit Panzerung.",
  "collector": "NP-STM-08",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Ablösung"
  ]
 },
 {
  "id": "dc_np_steinmark_freigabewagen",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Freigabewagen",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Rollt erst, wenn die Flanken gedeckt sind.",
  "collector": "NP-STM-09",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 1,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Ablösung"
  ]
 },
 {
  "id": "dc_np_steinmark_pruefstandkeil",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Prüfstandkeil",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Hundert Stunden Prüfstand, dann erst Front.",
  "collector": "NP-STM-10",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Ablösung"
  ]
 },
 {
  "id": "dc_np_steinmark_bundesschild_neun",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Bundesschild Neun",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Jeder Schaden an dieser Einheit −2.",
  "rules": [
   "Schwere Panzerung: Jeder einzelne Schaden, den diese Einheit erleidet (Kampf, Soforteinsatz, Effekt), wird um 2 verringert, mindestens auf 0."
  ],
  "effects": [
   {
    "code": "SCHADEN_MINUS"
   }
  ],
  "flavor": "Abgenommen, gestempelt, unzerstörbar – laut Gutachten.",
  "collector": "NP-STM-11",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Ablösung",
   "Zähigkeit"
  ]
 },
 {
  "id": "dc_np_steinmark_feuerplanrohr",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Feuerplanrohr",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Schießt nur auf freigegebene Planquadrate – also überallhin.",
  "collector": "NP-STM-12",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 1,
  "def": 1,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_steinmark_freigabebatterie",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Freigabebatterie",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Zweite Unterschrift: auch Depots sind Ziele.",
  "collector": "NP-STM-13",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 4,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_steinmark_normmoerser",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Normmörser",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-i",
   "artillerie"
  ],
  "text": "Steilfeuer I.",
  "rules": [
   "Steilfeuer I.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Kleines Rohr, große Akte.",
  "collector": "NP-STM-14",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 1,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_steinmark_messbatterie_grenzstein",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Messbatterie Grenzstein",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II. Angriffe gegen ungepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Steilfeuer II.",
   "Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [
   {
    "code": "FEUERUEBERLEGENHEIT"
   }
  ],
  "flavor": "Vermessen, bevor geschossen wird.",
  "collector": "NP-STM-15",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 1,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_steinmark_dreischluessel_haubitze",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Dreischlüssel-Haubitze",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "steilfeuer-v",
   "artillerie"
  ],
  "text": "Steilfeuer V: Front + Support (+2 AP).",
  "rules": [
   "Steilfeuer V: Front + Support (+2 AP).",
   "Die Einheit zählt für alle Regeln als Artillerie.",
   "Supportzone-Angriff 3 AP; Front 1 AP."
  ],
  "effects": [
   {
    "code": "ATTACK_ANY_FRONT"
   },
   {
    "code": "ATTACK_SUPPORT"
   }
  ],
  "flavor": "Drei Unterschriften, ein Einschlag.",
  "collector": "NP-STM-16",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 4,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Fernschuss"
  ]
 },
 {
  "id": "dc_np_steinmark_vermessungstrupp",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Vermessungstrupp",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Maßband, Theodolit, Funkgerät.",
  "collector": "NP-STM-17",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_steinmark_lagebildmelder",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Lagebildmelder",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Zivile und militärische Lage auf einem Blatt.",
  "collector": "NP-STM-18",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_steinmark_grenzbeobachter",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Grenzbeobachter",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.",
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   },
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Sieht, meldet, verschwindet im Protokoll.",
  "collector": "NP-STM-19",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Hinterhalt",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_steinmark_bundesrichter_kompanie",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Bundesrichter-Kompanie",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Urteil vor Ort, Vollzug sofort.",
  "collector": "NP-STM-20",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 3,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_steinmark_kommission_der_drei",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Einheit",
  "name": "Kommission der Drei",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF. Angriffe gegen ungepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).",
   "Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   },
   {
    "code": "FEUERUEBERLEGENHEIT"
   }
  ],
  "flavor": "Drei Schlüssel, eine Front.",
  "collector": "NP-STM-21",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 4,
  "def": 5,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_steinmark_bezirksarchiv",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Bezirksarchiv",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert. Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.",
  "rules": [
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
   "Beim Ausspielen wählst du einen eigenen Frontabschnitt. Solange diese Unterstützung liegt, haben deine Einheiten in diesem Abschnitt +1 ATK."
  ],
  "effects": [
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "aura",
     "scope": "section",
     "atk": 1,
     "def": 0
    }
   }
  ],
  "flavor": "Jede Lage hat eine Vorlage.",
  "collector": "NP-STM-22",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_steinmark_ordnungsamt_front",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Ordnungsamt Front",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Jeder Schaden an deinen Fronteinheiten −1. Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.",
  "rules": [
   "Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.",
   "Zu Beginn jedes deiner Züge heilt eine beschädigte eigene Fronteinheit bis zu 1 DEF (höchstens bis zur maximalen DEF), solange diese Unterstützung liegt."
  ],
  "effects": [
   {
    "code": "REDUCE_DAMAGE",
    "param": {
     "n": 1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "turnheal",
     "n": 1
    }
   }
  ],
  "flavor": "Schaden wird gemeldet, geprüft und gemindert.",
  "collector": "NP-STM-23",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_steinmark_verfahrenshoheit",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Verfahrenshoheit",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert. Jeder Schaden an deinen Fronteinheiten −1.",
  "rules": [
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
   "Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich."
  ],
  "effects": [
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   },
   {
    "code": "REDUCE_DAMAGE",
    "param": {
     "n": 1
    }
   }
  ],
  "flavor": "Wer das Verfahren führt, führt den Krieg.",
  "collector": "NP-STM-24",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_steinmark_formale_freigabe",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Formale Freigabe",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF dauerhaft. Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 ATK bis zum Ende dieses Zuges. Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF.",
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 1,
     "def": 1,
     "until": "turn"
    }
   },
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   }
  ],
  "flavor": "Stempel drauf, Feuer frei.",
  "collector": "NP-STM-25",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_steinmark_sachstandsbericht",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Sachstandsbericht",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 2 Karten. Heile 1 DEF an einer eigenen Fronteinheit.",
  "rules": [
   "Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 1 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 2
    }
   },
   {
    "code": "HEAL",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Zwei Seiten, nichts ausgelassen.",
  "collector": "NP-STM-26",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_steinmark_planmaessige_abloesung",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Planmäßige Ablösung",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Heile 1 DEF an einer eigenen Fronteinheit. Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 1 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.",
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "HEAL",
    "param": {
     "value": 1
    }
   },
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   }
  ],
  "flavor": "Pünktlich zum Schichtwechsel.",
  "collector": "NP-STM-27",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_steinmark_beweisaufnahme",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Beweisaufnahme",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet. Ziehe 2 Karten.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 2
    }
   }
  ],
  "flavor": "Erst wird festgestellt, dann wird entschieden.",
  "collector": "NP-STM-28",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_steinmark_feuerplan_ausgeloest",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Feuerplan ausgelöst",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 2 Schaden zu. Ziehe 1 Karte.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 2
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Bewegung im markierten Raum – Feuer nach Plan.",
  "collector": "NP-STM-29",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_steinmark_normverband_schliessen",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Normverband schließen",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: deine Infanterie dort +1 DEF dauerhaft.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Infanterie-Einheit, die jetzt dort steht, erhält +1 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "def": 1,
     "filter": "infanterie",
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Abstände korrigiert, Lücken geschlossen.",
  "collector": "NP-STM-30",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_steinmark_methodischer_vorstoss",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Methodischer Vorstoß",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 ATK bis Zugende.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Einheit dort hat bis zum Ende dieses Zuges +1 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung)."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "atk": 1,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Ein Meter nach dem anderen, alle zugleich.",
  "collector": "NP-STM-31",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_steinmark_beschaffungsvorlauf",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Beschaffungsvorlauf",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Ziehe 1 Karte. Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.",
  "rules": [
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   },
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   }
  ],
  "flavor": "Ausgeschrieben im Frieden, geliefert im Krieg.",
  "collector": "NP-STM-32",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_steinmark_dienstweg",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Dienstweg",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 2, dann wirf deine älteste Handkarte ab. Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).",
  "rules": [
   "Ziehe 2 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.",
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "DRAW_DISCARD",
    "param": {
     "draw": 2,
     "discard": 1
    }
   },
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   }
  ],
  "flavor": "Was zu spät kommt, landet in der Ablage.",
  "collector": "NP-STM-33",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_steinmark_grosser_feuerplan",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Großer Feuerplan",
  "ap": 4,
  "rarity": "gold",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 4 Schaden zu. Ziehe 1 Karte.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 4 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 4
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Der ganze Apparat für ein einziges Ziel.",
  "collector": "NP-STM-34",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_steinmark_stahlhelm_bundesnorm",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Stahlhelm Bundesnorm",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 ATK und +2 DEF. Wird der Träger zerstört, ziehst du 1 Karte.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +1 ATK und +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Wird der Träger zerstört, ziehst du 1 Karte."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 2,
     "only": "infanterie"
    }
   },
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   }
  ],
  "flavor": "Passt jedem Kopf der Republik.",
  "collector": "NP-STM-35",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_steinmark_dienstgewehr_muster_vier",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Dienstgewehr Muster Vier",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 ATK. Solange der Träger beschädigt ist: +1 ATK.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +1 ATK."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 0,
     "only": "infanterie"
    }
   },
   {
    "code": "EQUIP_COND_ATK",
    "param": {
     "atk": 1,
     "ifDamaged": true
    }
   }
  ],
  "flavor": "Gewartet nach Dienstvorschrift.",
  "collector": "NP-STM-36",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_steinmark_pruefplakette",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Prüfplakette",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 DEF. Wird der Träger zerstört, ziehst du 1 Karte. Erster Angriff des Trägers: +1 ATK.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Wird der Träger zerstört, ziehst du 1 Karte.",
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +1 ATK. Danach entfällt der Bonus."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 1
    }
   },
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   },
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 1
    }
   }
  ],
  "flavor": "Selbst der Verlust wird dokumentiert.",
  "collector": "NP-STM-37",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_steinmark_schusstafel_bezirk",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Schusstafel Bezirk",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Angriff des Trägers: +2 ATK.",
  "rules": [
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +2 ATK. Danach entfällt der Bonus."
  ],
  "effects": [
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 2
    }
   }
  ],
  "flavor": "Der erste Schuss ist schon berechnet.",
  "collector": "NP-STM-38",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_steinmark_schutzweste_klasse_drei",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Schutzweste Klasse Drei",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Schaden am Träger wird ignoriert. Träger +1 ATK.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.",
   "Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)"
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 0
    }
   },
   {
    "code": "EQUIP_IGNORE_FIRST_DAMAGE",
    "param": {
     "untouchableFirst": true
    }
   }
  ],
  "flavor": "Norm erfüllt, Treffer abgefangen.",
  "collector": "NP-STM-39",
  "art_status": "platzhalter",
  "keywords": [
   "Erstschadenschutz"
  ]
 },
 {
  "id": "dc_np_steinmark_zielfernrohr_norm",
  "set": "set_nation_pool",
  "nation": "Steinmark",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Zielfernrohr Norm",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Angriffe des Trägers: +1 Schaden.",
  "rules": [
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert."
  ],
  "effects": [
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   }
  ],
  "flavor": "Geeicht auf hundert Meter.",
  "collector": "NP-STM-40",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_eldran_kronlinie",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Kronlinie",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Die Linie gehört dem König, nicht dem Gelände.",
  "collector": "NP-ELD-01",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Sicherung"
  ]
 },
 {
  "id": "dc_np_eldran_pioniere_der_grenzmark",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Pioniere der Grenzmark",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Benachbarte eigene Infanterie +1 DEF.",
  "rules": [
   "Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "MECH_AURA"
   }
  ],
  "flavor": "Erst die Sperre, dann das Lager.",
  "collector": "NP-ELD-02",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_eldran_sperrzug_weissdorn",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Sperrzug Weißdorn",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Zwischen Dornen und Draht steht niemand allein.",
  "collector": "NP-ELD-03",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_eldran_haushaltstruppe",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Haushaltstruppe",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.",
  "rules": [
   "Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.",
   "Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden."
  ],
  "effects": [
   {
    "code": "AMBUSH"
   }
  ],
  "flavor": "Wartet, bis der Feind die Sperre berührt.",
  "collector": "NP-ELD-04",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Sicherung"
  ]
 },
 {
  "id": "dc_np_eldran_gebundene_kompanie",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Gebundene Kompanie",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Gebunden an die Stellung, gebunden an den Eid.",
  "collector": "NP-ELD-05",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 5,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_eldran_landsturm_kronfeld",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Landsturm Kronfeld",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Bauern, Erben, Wächter.",
  "collector": "NP-ELD-06",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Abschirmung"
  ]
 },
 {
  "id": "dc_np_eldran_gegenstossreserve",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Gegenstoßreserve",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Wartet hinter der Linie auf das Signal.",
  "collector": "NP-ELD-07",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Abschirmung"
  ]
 },
 {
  "id": "dc_np_eldran_kronwagen_wacht",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Kronwagen Wacht",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Schützt die Flanke der Sperrlinie.",
  "collector": "NP-ELD-08",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Abschirmung"
  ]
 },
 {
  "id": "dc_np_eldran_koenigliche_antwort",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Königliche Antwort",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Die Krone schlägt zurück – einmal, aber richtig.",
  "collector": "NP-ELD-09",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 6,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_eldran_bollwerkwagen",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Bollwerkwagen",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Jeder Schaden an dieser Einheit −2.",
  "rules": [
   "Schwere Panzerung: Jeder einzelne Schaden, den diese Einheit erleidet (Kampf, Soforteinsatz, Effekt), wird um 2 verringert, mindestens auf 0."
  ],
  "effects": [
   {
    "code": "SCHADEN_MINUS"
   }
  ],
  "flavor": "Ein rollender Festungsturm.",
  "collector": "NP-ELD-10",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 2,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_eldran_reservekette_erlen",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Reservekette Erlen",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Erst zurückgehalten, dann geschickt.",
  "collector": "NP-ELD-11",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Überlast"
  ]
 },
 {
  "id": "dc_np_eldran_sperrfeuerbatterie",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Sperrfeuerbatterie",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Feuer, das Räume schließt.",
  "collector": "NP-ELD-12",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_eldran_grenzhaubitze",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Grenzhaubitze",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Kennt jede Furt der Grenzmark.",
  "collector": "NP-ELD-13",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 2,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_eldran_kronmoerser",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Kronmörser",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-i",
   "artillerie"
  ],
  "text": "Steilfeuer I.",
  "rules": [
   "Steilfeuer I.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Kleine Granaten für große Tradition.",
  "collector": "NP-ELD-14",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 1,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_eldran_burgfeuerstellung",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Burgfeuerstellung",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Aus den alten Mauern schießt es noch immer.",
  "collector": "NP-ELD-15",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 5,
  "def": 1,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_eldran_kronarsenal",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Kronarsenal",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "steilfeuer-v",
   "artillerie"
  ],
  "text": "Steilfeuer V: Front + Support (+2 AP).",
  "rules": [
   "Steilfeuer V: Front + Support (+2 AP).",
   "Die Einheit zählt für alle Regeln als Artillerie.",
   "Supportzone-Angriff 3 AP; Front 1 AP."
  ],
  "effects": [
   {
    "code": "ATTACK_ANY_FRONT"
   },
   {
    "code": "ATTACK_SUPPORT"
   }
  ],
  "flavor": "Was die Krone hortete, kommt nun heraus.",
  "collector": "NP-ELD-16",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 4,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Durchschlag",
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_eldran_grenzreiter",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Grenzreiter",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Reitet die bekannten Achsen ab.",
  "collector": "NP-ELD-17",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 4,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_eldran_wachtturmposten",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Wachtturmposten",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Sieht weit, bewegt sich nicht.",
  "collector": "NP-ELD-18",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 1,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Fernschuss"
  ]
 },
 {
  "id": "dc_np_eldran_kundschafter_der_krone",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Kundschafter der Krone",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Meldet nur dem Haus.",
  "collector": "NP-ELD-19",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 4,
  "def": 1,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_eldran_garde_der_kontinuitaet",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Garde der Kontinuität",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Sie war vor dem Krieg da und wird danach da sein.",
  "collector": "NP-ELD-20",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 2,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Überlast"
  ]
 },
 {
  "id": "dc_np_eldran_marschall_des_hauses",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Einheit",
  "name": "Marschall des Hauses",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "+2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.",
  "rules": [
   "Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FUEHRUNG_V"
   }
  ],
  "flavor": "Führt von der Spitze der Reserve.",
  "collector": "NP-ELD-21",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 5,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Sicherung"
  ]
 },
 {
  "id": "dc_np_eldran_sperrguertel",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Sperrgürtel",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Gegnerische Fronteinheiten −1 ATK. Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.",
  "rules": [
   "Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).",
   "Zu Beginn jedes deiner Züge heilt eine beschädigte eigene Fronteinheit bis zu 1 DEF (höchstens bis zur maximalen DEF), solange diese Unterstützung liegt."
  ],
  "effects": [
   {
    "code": "AURA_ENEMY_ATK",
    "param": {
     "atk": -1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "turnheal",
     "n": 1
    }
   }
  ],
  "flavor": "Wer durch die Sperre will, kommt geschwächt an.",
  "collector": "NP-ELD-22",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_eldran_pionierdepot",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Pionierdepot",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Jeder Schaden an deinen Fronteinheiten −1. Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.",
  "rules": [
   "Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.",
   "Zu Beginn jedes deiner Züge heilt eine beschädigte eigene Fronteinheit bis zu 1 DEF (höchstens bis zur maximalen DEF), solange diese Unterstützung liegt."
  ],
  "effects": [
   {
    "code": "REDUCE_DAMAGE",
    "param": {
     "n": 1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "turnheal",
     "n": 1
    }
   }
  ],
  "flavor": "Sandsäcke, Balken, Draht.",
  "collector": "NP-ELD-23",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_eldran_gebundene_front",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Gebundene Front",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Jeder Schaden an deinen Fronteinheiten −1. Gegnerische Fronteinheiten −1 ATK.",
  "rules": [
   "Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.",
   "Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag)."
  ],
  "effects": [
   {
    "code": "REDUCE_DAMAGE",
    "param": {
     "n": 1
    }
   },
   {
    "code": "AURA_ENEMY_ATK",
    "param": {
     "atk": -1
    }
   }
  ],
  "flavor": "Die ganze Linie trägt den Eid.",
  "collector": "NP-ELD-24",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_eldran_auffangstellung",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Auffangstellung",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 DEF dauerhaft.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +1 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "def": 1,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Der Stoß läuft ins Leere.",
  "collector": "NP-ELD-25",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_eldran_koeniglicher_befehl",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Königlicher Befehl",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit darf in diesem Zug erneut angreifen. Heile 1 DEF an einer eigenen Fronteinheit.",
  "rules": [
   "Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten).",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 1 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts."
  ],
  "effects": [
   {
    "code": "EXTRA_ATTACK",
    "param": {}
   },
   {
    "code": "HEAL",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Die Antwort kommt sofort.",
  "collector": "NP-ELD-26",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_eldran_feldlazarett_der_krone",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Feldlazarett der Krone",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Heile 3 DEF an einer eigenen Fronteinheit.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 3 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts."
  ],
  "effects": [
   {
    "code": "HEAL",
    "param": {
     "value": 3
    }
   }
  ],
  "flavor": "Die Krone vergisst ihre Soldaten nicht.",
  "collector": "NP-ELD-27",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_eldran_halten_und_warten",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Halten und warten",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +2 DEF dauerhaft.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 0,
     "def": 2,
     "until": "turn"
    }
   }
  ],
  "flavor": "Geduld ist eine Waffe.",
  "collector": "NP-ELD-28",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_eldran_gegenstoss_aus_der_reserve",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Gegenstoß aus der Reserve",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +3 ATK bis Zugende.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +3 ATK bis zum Ende dieses Zuges."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 3,
     "def": 0,
     "until": "turn"
    }
   }
  ],
  "flavor": "Jetzt.",
  "collector": "NP-ELD-29",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_eldran_mine_im_weg",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Mine im Weg",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 2 Schaden zu.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 2
    }
   }
  ],
  "flavor": "Gelegt vor Jahren, gezündet heute.",
  "collector": "NP-ELD-30",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_eldran_hofbericht",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Hofbericht",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 1 Karte. Heile 1 DEF an einer eigenen Fronteinheit.",
  "rules": [
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 1 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   },
   {
    "code": "HEAL",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Was der Hof weiß, weiß die Front.",
  "collector": "NP-ELD-31",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_eldran_sperre_verstaerken",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Sperre verstärken",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: deine Infanterie dort +2 DEF dauerhaft.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Infanterie-Einheit, die jetzt dort steht, erhält +2 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "def": 2,
     "filter": "infanterie",
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Noch eine Reihe Draht.",
  "collector": "NP-ELD-32",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_eldran_kronrat_tagt",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Kronrat tagt",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 3, dann wirf deine älteste Handkarte ab. Ziehe 1 Karte.",
  "rules": [
   "Ziehe 3 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "DRAW_DISCARD",
    "param": {
     "draw": 3,
     "discard": 1
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Viele Stimmen, eine Entscheidung.",
  "collector": "NP-ELD-33",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_eldran_antwort_der_krone",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Antwort der Krone",
  "ap": 4,
  "rarity": "gold",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +2 ATK bis Zugende.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Einheit dort hat bis zum Ende dieses Zuges +2 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung)."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "atk": 2,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Die gesamte Reserve schlägt zu.",
  "collector": "NP-ELD-34",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_eldran_kronhelm",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Kronhelm",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +3 DEF.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +3 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 3,
     "only": "infanterie"
    }
   }
  ],
  "flavor": "Alt, schwer, verlässlich.",
  "collector": "NP-ELD-35",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_eldran_pionierschaufel",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Pionierschaufel",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Schaden am Träger wird ignoriert. Träger +1 DEF.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.",
   "Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)"
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 1,
     "only": "infanterie"
    }
   },
   {
    "code": "EQUIP_IGNORE_FIRST_DAMAGE",
    "param": {
     "untouchableFirst": true
    }
   }
  ],
  "flavor": "Erst graben, dann kämpfen.",
  "collector": "NP-ELD-36",
  "art_status": "platzhalter",
  "keywords": [
   "Erstschadenschutz"
  ]
 },
 {
  "id": "dc_np_eldran_kronsiegel_der_wacht",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Kronsiegel der Wacht",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Wird der Träger zerstört, ziehst du 1 Karte. Träger +1 ATK.",
  "rules": [
   "Wird der Träger zerstört, ziehst du 1 Karte.",
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   },
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 0
    }
   }
  ],
  "flavor": "Wer fällt, hinterlässt ein Siegel.",
  "collector": "NP-ELD-37",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_eldran_sperrdraht_kit",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Sperrdraht-Kit",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 2 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.",
  "rules": [
   "Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 2 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar."
  ],
  "effects": [
   {
    "code": "EQUIP_NEGATE_DAMAGE",
    "param": {
     "amount": 2,
     "once": true
    }
   }
  ],
  "flavor": "Der Draht fängt den ersten Schlag.",
  "collector": "NP-ELD-38",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_eldran_bajonett_der_garde",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Bajonett der Garde",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Solange der Träger beschädigt ist: +3 ATK.",
  "rules": [
   "Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +3 ATK."
  ],
  "effects": [
   {
    "code": "EQUIP_COND_ATK",
    "param": {
     "atk": 3,
     "ifDamaged": true
    }
   }
  ],
  "flavor": "Wer verwundet ist, kämpft verbissener.",
  "collector": "NP-ELD-39",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_eldran_kronbanner",
  "set": "set_nation_pool",
  "nation": "Eldran",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Kronbanner",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +2 ATK.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 2,
     "def": 0
    }
   }
  ],
  "flavor": "Unter dem Banner weicht niemand.",
  "collector": "NP-ELD-40",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_erbregiment_narbstadt",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Erbregiment Narbstadt",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Das Regiment ist älter als die Republik.",
  "collector": "NP-ROT-01",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_rothain_abloesungszug",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Ablösungszug",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Kommt, wenn die anderen müde sind.",
  "collector": "NP-ROT-02",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Heranführung"
  ]
 },
 {
  "id": "dc_np_rothain_schwerpunktgrenadiere",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Schwerpunktgrenadiere",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Angriffe gegen Infanterie: +2 Schaden.",
  "rules": [
   "Greift diese Einheit eine Infanterie an, verursacht sie 2 Schaden zusätzlich zu ihrem ATK. Der Gegenschlag des Ziels bleibt unverändert."
  ],
  "effects": [
   {
    "code": "VS_INF"
   }
  ],
  "flavor": "Alles auf einen Punkt.",
  "collector": "NP-ROT-03",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_rothain_kolonne_flussrot",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Kolonne Flussrot",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Straße, Brücke, Umschlag – und weiter.",
  "collector": "NP-ROT-04",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Zähigkeit"
  ]
 },
 {
  "id": "dc_np_rothain_stabskompanie_erbe",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Stabskompanie Erbe",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Benachbarte eigene Infanterie +1 DEF.",
  "rules": [
   "Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "MECH_AURA"
   }
  ],
  "flavor": "Führt nach den Karten von gestern.",
  "collector": "NP-ROT-05",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 3,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_rothain_treuewache_kronstrasse",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Treuewache Kronstraße",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Hält die alte Straße, wie immer.",
  "collector": "NP-ROT-06",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Ablösung"
  ]
 },
 {
  "id": "dc_np_rothain_erbpanzer_kronlinie",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Erbpanzer Kronlinie",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Geerbt, gepflegt, gefürchtet.",
  "collector": "NP-ROT-07",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 2,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_rothain_schwerpunktwagen",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Schwerpunktwagen",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Gebaut für den einen Punkt.",
  "collector": "NP-ROT-08",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 5,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_rothain_geerbtes_arsenal",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Geerbtes Arsenal",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Angriffe gegen gepanzerte Ziele: +2 Schaden.",
  "rules": [
   "Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 2 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "IGNORE_DEF",
    "param": {
     "ignore_def": 2
    }
   }
  ],
  "flavor": "Was die Alten bauten, bricht noch Panzer.",
  "collector": "NP-ROT-09",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_rothain_reservekette_erbfolge",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Reservekette Erbfolge",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Rollt in die Lücke der Gefallenen.",
  "collector": "NP-ROT-10",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Ablösung"
  ]
 },
 {
  "id": "dc_np_rothain_depotwagen_kronstrasse",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Depotwagen Kronstraße",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Bringt Munition an den Punkt.",
  "collector": "NP-ROT-11",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 2,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Durchschlag"
  ]
 },
 {
  "id": "dc_np_rothain_schwerpunktbatterie",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Schwerpunktbatterie",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Feuer nur dort, wo es zählt.",
  "collector": "NP-ROT-12",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_rothain_stabsrohr_neuhoff",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Stabsrohr Neuhoff",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Nach alten Feuerplänen eingerichtet.",
  "collector": "NP-ROT-13",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Fernschuss"
  ]
 },
 {
  "id": "dc_np_rothain_erbmoerser",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Erbmörser",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-i",
   "artillerie"
  ],
  "text": "Steilfeuer I.",
  "rules": [
   "Steilfeuer I.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Der Großvater schoss schon damit.",
  "collector": "NP-ROT-14",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 4,
  "def": 1,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_rothain_ballungsfeuer",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Ballungsfeuer",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Alle Rohre auf einen Abschnitt.",
  "collector": "NP-ROT-15",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 6,
  "def": 1,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_rothain_ewige_batterie",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Ewige Batterie",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "steilfeuer-v",
   "artillerie"
  ],
  "text": "Steilfeuer V: Front + Support (+2 AP).",
  "rules": [
   "Steilfeuer V: Front + Support (+2 AP).",
   "Die Einheit zählt für alle Regeln als Artillerie.",
   "Supportzone-Angriff 3 AP; Front 1 AP."
  ],
  "effects": [
   {
    "code": "ATTACK_ANY_FRONT"
   },
   {
    "code": "ATTACK_SUPPORT"
   }
  ],
  "flavor": "Sie schoss im letzten Krieg und schießt in diesem.",
  "collector": "NP-ROT-16",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 5,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Nachsetzen",
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_rothain_stabsmelder",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Stabsmelder",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Bringt Lagekarten von der Achse.",
  "collector": "NP-ROT-17",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 3,
  "def": 1,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_rothain_achsenkundschafter",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Achsenkundschafter",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Kennt jede Straße seit Generationen.",
  "collector": "NP-ROT-18",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Heranführung"
  ]
 },
 {
  "id": "dc_np_rothain_erbkarte_spaeher",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Erbkarte Späher",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.",
  "rules": [
   "Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie."
  ],
  "effects": [
   {
    "code": "HAND_PEEK",
    "param": {
     "n": 2
    }
   }
  ],
  "flavor": "Sieht, was das Erbe vergessen hat.",
  "collector": "NP-ROT-19",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 1,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_rothain_regimentsaelteste",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Regimentsälteste",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "+2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.",
  "rules": [
   "Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FUEHRUNG_V"
   }
  ],
  "flavor": "Führen mit Erfahrung, nicht mit Rang.",
  "collector": "NP-ROT-20",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 4,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff",
   "Sicherung"
  ]
 },
 {
  "id": "dc_np_rothain_erbmarschall_rothain",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Einheit",
  "name": "Erbmarschall Rothain",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Konzentration ist eine Familientradition.",
  "collector": "NP-ROT-21",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 5,
  "def": 6,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_rothain_abloesungsdepot",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Ablösungsdepot",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert. Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.",
  "rules": [
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
   "Zu Beginn jedes deiner Züge heilt eine beschädigte eigene Fronteinheit bis zu 1 DEF (höchstens bis zur maximalen DEF), solange diese Unterstützung liegt."
  ],
  "effects": [
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "turnheal",
     "n": 1
    }
   }
  ],
  "flavor": "Ersatz steht immer bereit.",
  "collector": "NP-ROT-22",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_stabszentrale_erbe",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Stabszentrale Erbe",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn deines Zuges: +1 AP. Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.",
  "rules": [
   "Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt.",
   "Beim Ausspielen wählst du einen eigenen Frontabschnitt. Solange diese Unterstützung liegt, haben deine Einheiten in diesem Abschnitt +1 ATK."
  ],
  "effects": [
   {
    "code": "TURN_AP",
    "param": {
     "ap": 1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "aura",
     "scope": "section",
     "atk": 1,
     "def": 0
    }
   }
  ],
  "flavor": "Die alte Zentrale funktioniert noch.",
  "collector": "NP-ROT-23",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_gebuendelte_front",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Gebündelte Front",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Deine Fronteinheiten +1 ATK. Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.",
  "rules": [
   "Solange diese Unterstützung liegt, haben alle deine Fronteinheiten +1 ATK.",
   "Zu Beginn jedes deiner Züge heilt eine beschädigte eigene Fronteinheit bis zu 1 DEF (höchstens bis zur maximalen DEF), solange diese Unterstützung liegt."
  ],
  "effects": [
   {
    "code": "AURA_FRONT_ATK",
    "param": {
     "atk": 1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "turnheal",
     "n": 1
    }
   }
  ],
  "flavor": "Alle Kraft an einem Punkt.",
  "collector": "NP-ROT-24",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_schwerpunkt_setzen",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Schwerpunkt setzen",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 ATK bis Zugende. Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Einheit dort hat bis zum Ende dieses Zuges +1 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung).",
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "atk": 1,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   },
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   }
  ],
  "flavor": "Hier und nicht anderswo.",
  "collector": "NP-ROT-25",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_abloesung_vorziehen",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Ablösung vorziehen",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Eine eigene Fronteinheit: +1 DEF dauerhaft.",
  "rules": [
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF."
  ],
  "effects": [
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   },
   {
    "code": "BUFF",
    "param": {
     "atk": 0,
     "def": 1,
     "until": "turn"
    }
   }
  ],
  "flavor": "Die nächste Welle steht bereit.",
  "collector": "NP-ROT-26",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_frische_kraefte",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Frische Kräfte",
  "ap": 0,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Heile 2 DEF an einer eigenen Fronteinheit.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts."
  ],
  "effects": [
   {
    "code": "HEAL",
    "param": {
     "value": 2
    }
   }
  ],
  "flavor": "Die Abgelösten erholen sich.",
  "collector": "NP-ROT-27",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_konzentrierter_stoss",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Konzentrierter Stoß",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +3 ATK bis Zugende, +1 DEF dauerhaft.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +3 ATK bis zum Ende dieses Zuges. Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 3,
     "def": 1,
     "until": "turn"
    }
   }
  ],
  "flavor": "Gebündelte Kraft am Punkt.",
  "collector": "NP-ROT-28",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_nachstoss",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Nachstoß",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit darf in diesem Zug erneut angreifen. Eine eigene Fronteinheit: +1 DEF dauerhaft.",
  "rules": [
   "Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten).",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF."
  ],
  "effects": [
   {
    "code": "EXTRA_ATTACK",
    "param": {}
   },
   {
    "code": "BUFF",
    "param": {
     "atk": 0,
     "def": 1,
     "until": "turn"
    }
   }
  ],
  "flavor": "Der Schwerpunkt hält den Druck.",
  "collector": "NP-ROT-29",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_umschlag_flussrot",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Umschlag Flussrot",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 2 Karten. Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).",
  "rules": [
   "Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.",
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 2
    }
   },
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   }
  ],
  "flavor": "Nachschub über die alte Straße.",
  "collector": "NP-ROT-30",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_stabsbesprechung",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Stabsbesprechung",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 2, dann wirf deine älteste Handkarte ab. Ziehe 1 Karte.",
  "rules": [
   "Ziehe 2 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "DRAW_DISCARD",
    "param": {
     "draw": 2,
     "discard": 1
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Neue Lage, alte Karten.",
  "collector": "NP-ROT-31",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_gezieltes_feuer",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Gezieltes Feuer",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 2 Schaden zu. Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 2
    }
   },
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   }
  ],
  "flavor": "Ein Schuss für den Schwerpunkt.",
  "collector": "NP-ROT-32",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_ewige_abloesung",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Ewige Ablösung",
  "ap": 3,
  "rarity": "gold",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Deine nächste Einheit oder Unterstützung kostet 2 AP weniger (mind. 1). Ziehe 1 Karte.",
  "rules": [
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 2 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 2
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Die Linie stirbt nie.",
  "collector": "NP-ROT-33",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_druck_am_punkt",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Druck am Punkt",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: deine Infanterie dort +2 ATK bis Zugende.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Infanterie-Einheit dort hat bis zum Ende dieses Zuges +2 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung)."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "atk": 2,
     "filter": "infanterie",
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Infanterie trägt den Schwerpunkt.",
  "collector": "NP-ROT-34",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_erbsaebel",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Erbsäbel",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +2 ATK.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +2 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 2,
     "def": 0,
     "only": "infanterie"
    }
   }
  ],
  "flavor": "Mehr Tradition als Waffe – und trotzdem scharf.",
  "collector": "NP-ROT-35",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_regimentsabzeichen",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Regimentsabzeichen",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Wird der Träger zerstört, ziehst du 1 Karte. Träger +2 DEF.",
  "rules": [
   "Wird der Träger zerstört, ziehst du 1 Karte.",
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   },
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 2,
     "only": "infanterie"
    }
   }
  ],
  "flavor": "Wer fällt, wird ersetzt.",
  "collector": "NP-ROT-36",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_stabskarte_erbe",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Stabskarte Erbe",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Angriff des Trägers: +2 ATK. Träger +1 ATK.",
  "rules": [
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +2 ATK. Danach entfällt der Bonus.",
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 2
    }
   },
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 0
    }
   }
  ],
  "flavor": "Der alte Plan wirkt beim ersten Schlag.",
  "collector": "NP-ROT-37",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_abloesungsgurt",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Ablösungsgurt",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 ATK und +1 DEF. Solange der Träger beschädigt ist: +1 ATK.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK und +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +1 ATK."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 1
    }
   },
   {
    "code": "EQUIP_COND_ATK",
    "param": {
     "atk": 1,
     "ifDamaged": true
    }
   }
  ],
  "flavor": "Hält bis zur Ablösung.",
  "collector": "NP-ROT-38",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_schwerpunktoptik",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Schwerpunktoptik",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Angriffe des Trägers: +1 Schaden. Träger +1 ATK.",
  "rules": [
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.",
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   },
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 0
    }
   }
  ],
  "flavor": "Sieht nur den Punkt.",
  "collector": "NP-ROT-39",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_rothain_kronstrassenpanzerung",
  "set": "set_nation_pool",
  "nation": "Rothain",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Kronstraßenpanzerung",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Schaden am Träger wird ignoriert. Träger +2 DEF.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Panzer). Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.",
   "Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)"
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 2,
     "only": "panzer"
    }
   },
   {
    "code": "EQUIP_IGNORE_FIRST_DAMAGE",
    "param": {
     "untouchableFirst": true
    }
   }
  ],
  "flavor": "Alte Platten, neu genietet.",
  "collector": "NP-ROT-40",
  "art_status": "platzhalter",
  "keywords": [
   "Erstschadenschutz"
  ]
 },
 {
  "id": "dc_np_averon_netztrupp_novaris",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Netztrupp Novaris",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Verbunden, also handlungsfähig.",
  "collector": "NP-AVE-01",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Gefechtsbereit"
  ]
 },
 {
  "id": "dc_np_averon_eigeninitiative_zug",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Eigeninitiative-Zug",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Kein Befehl nötig, solange das Netz hält.",
  "collector": "NP-AVE-02",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Abschirmung"
  ]
 },
 {
  "id": "dc_np_averon_sensorschuetzen",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Sensorschützen",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Angriffe gegen ungepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "FEUERUEBERLEGENHEIT"
   }
  ],
  "flavor": "Sehen den Gegner, bevor er schießt.",
  "collector": "NP-AVE-03",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_averon_verbindungskompanie",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Verbindungskompanie",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Benachbarte eigene Infanterie +1 DEF.",
  "rules": [
   "Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "MECH_AURA"
   }
  ],
  "flavor": "Hält die Linie zum Netz.",
  "collector": "NP-AVE-04",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_averon_schnelle_hand",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Schnelle Hand",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Kurz zuschlagen, dann weg.",
  "collector": "NP-AVE-05",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 5,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Platztausch",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_averon_buergerwehr_averon",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Bürgerwehr Averon",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Die junge Republik verteidigt sich selbst.",
  "collector": "NP-AVE-06",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_averon_novaris_kolonne",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Novaris-Kolonne",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "+2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.",
  "rules": [
   "Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FUEHRUNG_V"
   }
  ],
  "flavor": "Antwort- und Verbindungsformation.",
  "collector": "NP-AVE-07",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Gefechtsbereit"
  ]
 },
 {
  "id": "dc_np_averon_leichter_netzwagen",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Leichter Netzwagen",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Schnell rein, schnell raus.",
  "collector": "NP-AVE-08",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 5,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Überlast",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_averon_funkpanzer",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Funkpanzer",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Mehr Antennen als Panzerung.",
  "collector": "NP-AVE-09",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 1,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_averon_zeitkeil",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Zeitkeil",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Nicht stehenbleiben, wenn die Lage alt wird.",
  "collector": "NP-AVE-10",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 2,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Gefechtsbereit"
  ]
 },
 {
  "id": "dc_np_averon_aufklaerungsspaehwagen",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Aufklärungsspähwagen",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Angriffe gegen gepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 1 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "IGNORE_DEF",
    "param": {
     "ignore_def": 1
    }
   }
  ],
  "flavor": "Sucht Panzer, bevor sie suchen.",
  "collector": "NP-AVE-11",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_averon_lokalisierungsbatterie",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Lokalisierungsbatterie",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Erst geortet, dann getroffen.",
  "collector": "NP-AVE-12",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_averon_schnellfeuerwerfer",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Schnellfeuerwerfer",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-iii",
   "artillerie"
  ],
  "text": "Steilfeuer III.",
  "rules": [
   "Steilfeuer III.",
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Feuern und Stellungswechsel.",
  "collector": "NP-AVE-13",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Platztausch",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_averon_netzmoerser",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Netzmörser",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-i",
   "artillerie"
  ],
  "text": "Steilfeuer I.",
  "rules": [
   "Steilfeuer I.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Feuer auf Koordinaten aus dem Netz.",
  "collector": "NP-AVE-14",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 2,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Durchschlag"
  ]
 },
 {
  "id": "dc_np_averon_praezisionsrakete_zeit",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Präzisionsrakete Zeit",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "steilfeuer-iii",
   "artillerie"
  ],
  "text": "Steilfeuer III.",
  "rules": [
   "Steilfeuer III.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Trifft Depots, bevor sie liefern.",
  "collector": "NP-AVE-15",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 4,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_averon_fruehwarnbatterie",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Frühwarnbatterie",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Feuert auf die erste Bewegung.",
  "collector": "NP-AVE-16",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_averon_sensordrohne",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Sensordrohne",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Fliegt voraus, meldet alles.",
  "collector": "NP-AVE-17",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 1,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_averon_lauschposten",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Lauschposten",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.",
  "rules": [
   "Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie."
  ],
  "effects": [
   {
    "code": "HAND_PEEK",
    "param": {
     "n": 2
    }
   }
  ],
  "flavor": "Was gesagt wird, wird gehört.",
  "collector": "NP-AVE-18",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 1,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_averon_fruehwarntrupp",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Frühwarntrupp",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.",
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   },
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Sieht zuerst, wird zuletzt gesehen.",
  "collector": "NP-AVE-19",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Hinterhalt",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_averon_republikanische_antwort",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Republikanische Antwort",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Wer zuerst weiß, schlägt zuerst.",
  "collector": "NP-AVE-20",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 5,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Heranführung",
   "Erbitterung"
  ]
 },
 {
  "id": "dc_np_averon_netzkommando",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Einheit",
  "name": "Netzkommando",
  "ap": 5,
  "rarity": "silver",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "",
  "rules": [
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Operiert ohne Signatur.",
  "collector": "NP-AVE-21",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 5,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Erbitterung",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_averon_gebundene_verbindung",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Gebundene Verbindung",
  "ap": 3,
  "rarity": "gold",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn deines Zuges: +1 AP.",
  "rules": [
   "Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt."
  ],
  "effects": [
   {
    "code": "TURN_AP",
    "param": {
     "ap": 1
    }
   }
  ],
  "flavor": "Solange das Netz hält, gibt es Zeit.",
  "collector": "NP-AVE-22",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_averon_sensorkette",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Sensorkette",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
  "rules": [
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert."
  ],
  "effects": [
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   }
  ],
  "flavor": "Ein Strom aus Lagebildern.",
  "collector": "NP-AVE-23",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_averon_fruehwarnnetz",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Frühwarnnetz",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Gegnerische Fronteinheiten −1 ATK.",
  "rules": [
   "Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag)."
  ],
  "effects": [
   {
    "code": "AURA_ENEMY_ATK",
    "param": {
     "atk": -1
    }
   }
  ],
  "flavor": "Der Gegner greift an, was längst weg ist.",
  "collector": "NP-AVE-24",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_averon_erstschlag_nach_ortung",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Erstschlag nach Ortung",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet. Ziehe 1 Karte.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Erst sehen, dann schlagen.",
  "collector": "NP-AVE-25",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_averon_kurzer_schlag",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Kurzer Schlag",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 2 Schaden zu. Ziehe 1 Karte.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 2
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Rein, treffen, raus.",
  "collector": "NP-AVE-26",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_averon_lagebild_aktualisieren",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Lagebild aktualisieren",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 1 Karte.",
  "rules": [
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Die Lage ist nie alt, wenn man schnell ist.",
  "collector": "NP-AVE-27",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_averon_zeitgewinn",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Zeitgewinn",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Ziehe 2 Karten.",
  "rules": [
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.",
   "Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 2
    }
   }
  ],
  "flavor": "Jede gesparte Minute ist ein Zug.",
  "collector": "NP-AVE-28",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_averon_initiative_ergreifen",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Initiative ergreifen",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit darf in diesem Zug erneut angreifen. Ziehe 1 Karte.",
  "rules": [
   "Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten).",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "EXTRA_ATTACK",
    "param": {}
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Wer zögert, verliert das Fenster.",
  "collector": "NP-AVE-29",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_averon_ortung",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Ortung",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   }
  ],
  "flavor": "Signatur erfasst.",
  "collector": "NP-AVE-30",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_averon_netzimpuls",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Netzimpuls",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 ATK bis Zugende.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Einheit dort hat bis zum Ende dieses Zuges +1 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung)."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "atk": 1,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Alle wissen gleichzeitig, was zu tun ist.",
  "collector": "NP-AVE-31",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_averon_schnelle_verlegung",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Schnelle Verlegung",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +1 ATK bis Zugende, +2 DEF dauerhaft.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 ATK bis zum Ende dieses Zuges. Sie erhält +2 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 1,
     "def": 2,
     "until": "turn"
    }
   }
  ],
  "flavor": "Ankommen, bevor der Gegner zielt.",
  "collector": "NP-AVE-32",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_averon_datenflut",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Datenflut",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 3, dann wirf deine älteste Handkarte ab.",
  "rules": [
   "Ziehe 3 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof."
  ],
  "effects": [
   {
    "code": "DRAW_DISCARD",
    "param": {
     "draw": 3,
     "discard": 1
    }
   }
  ],
  "flavor": "Zu viel Lage ist besser als zu wenig.",
  "collector": "NP-AVE-33",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_averon_lokalisierter_grossschlag",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Lokalisierter Großschlag",
  "ap": 3,
  "rarity": "gold",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet. Füge einer gegnerischen Fronteinheit 3 Schaden zu.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 3 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   },
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 3
    }
   }
  ],
  "flavor": "Gefunden heißt getroffen.",
  "collector": "NP-AVE-34",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_averon_funkgeraet_novaris",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Funkgerät Novaris",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Wird der Träger zerstört, ziehst du 1 Karte. Träger +1 DEF.",
  "rules": [
   "Wird der Träger zerstört, ziehst du 1 Karte.",
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   },
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 1
    }
   }
  ],
  "flavor": "Die letzte Meldung kommt immer an.",
  "collector": "NP-AVE-35",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_averon_sensorhelm",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Sensorhelm",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 DEF. Erster Angriff des Trägers: +1 ATK.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +1 ATK. Danach entfällt der Bonus."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 1
    }
   },
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 1
    }
   }
  ],
  "flavor": "Sieht den ersten Gegner zuerst.",
  "collector": "NP-AVE-36",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_averon_leichtweste",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Leichtweste",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +2 DEF.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 2,
     "only": "infanterie"
    }
   }
  ],
  "flavor": "Leicht, damit man schnell bleibt.",
  "collector": "NP-AVE-37",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_averon_zielmarker",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Zielmarker",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Angriffe des Trägers: +2 Schaden.",
  "rules": [
   "Jeder Angriff des Trägers verursacht 2 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert."
  ],
  "effects": [
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 2
    }
   }
  ],
  "flavor": "Markiert für das Netz.",
  "collector": "NP-AVE-38",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_averon_tarnnetz_averon",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Tarnnetz Averon",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Schaden am Träger wird ignoriert.",
  "rules": [
   "Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.",
   "Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)"
  ],
  "effects": [
   {
    "code": "EQUIP_IGNORE_FIRST_DAMAGE",
    "param": {
     "untouchableFirst": true
    }
   }
  ],
  "flavor": "Der erste Treffer geht daneben.",
  "collector": "NP-AVE-39",
  "art_status": "platzhalter",
  "keywords": [
   "Erstschadenschutz"
  ]
 },
 {
  "id": "dc_np_averon_schnellfeuergewehr",
  "set": "set_nation_pool",
  "nation": "Averon",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Schnellfeuergewehr",
  "ap": 1,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 ATK. Erster Angriff des Trägers: +1 ATK.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +1 ATK. Danach entfällt der Bonus."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 0
    }
   },
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 1
    }
   }
  ],
  "flavor": "Kurz, schnell, präzise.",
  "collector": "NP-AVE-40",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_messkette_alpha",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Messkette Alpha",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Trägt die Probe an die Front.",
  "collector": "NP-ORT-01",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_orthea_kreuzpeilungstrupp",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Kreuzpeilungstrupp",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Drei Peilungen, ein Schnittpunkt.",
  "collector": "NP-ORT-02",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Nachsetzen"
  ]
 },
 {
  "id": "dc_np_orthea_probentraeger",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Probenträger",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Ohne Probe keine Erkenntnis.",
  "collector": "NP-ORT-03",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Erbitterung"
  ]
 },
 {
  "id": "dc_np_orthea_praezisionsschuetzen",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Präzisionsschützen",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Angriffe gegen ungepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "FEUERUEBERLEGENHEIT"
   }
  ],
  "flavor": "Kein Schuss ohne Rechnung.",
  "collector": "NP-ORT-04",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_orthea_modellpruefer",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Modellprüfer",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.",
  "rules": [
   "Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie."
  ],
  "effects": [
   {
    "code": "HAND_PEEK",
    "param": {
     "n": 2
    }
   }
  ],
  "flavor": "Prüft das gegnerische Modell.",
  "collector": "NP-ORT-05",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_orthea_klinikwache",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Klinikwache",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Bewacht die Labore der Republik.",
  "collector": "NP-ORT-06",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 4,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_orthea_messpanzer",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Messpanzer",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Ein rollendes Labor.",
  "collector": "NP-ORT-07",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Durchschlag"
  ]
 },
 {
  "id": "dc_np_orthea_zielrechner_wagen",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Zielrechner-Wagen",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Angriffe gegen gepanzerte Ziele: +2 Schaden.",
  "rules": [
   "Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 2 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "IGNORE_DEF",
    "param": {
     "ignore_def": 2
    }
   }
  ],
  "flavor": "Berechnet die Schwachstelle jeder Platte.",
  "collector": "NP-ORT-08",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 5,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_orthea_leichter_probenwagen",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Leichter Probenwagen",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Bringt Messwerte zurück.",
  "collector": "NP-ORT-09",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 1,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Gefechtsbereit"
  ]
 },
 {
  "id": "dc_np_orthea_feldversuch_kette",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Feldversuch Kette",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Angriffe gegen gepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 1 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "IGNORE_DEF",
    "param": {
     "ignore_def": 1
    }
   }
  ],
  "flavor": "Versuch Nummer 117.",
  "collector": "NP-ORT-10",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Durchschlag"
  ]
 },
 {
  "id": "dc_np_orthea_einzelschusspanzer",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Einzelschusspanzer",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Angriffe gegen gepanzerte Ziele: +3 Schaden.",
  "rules": [
   "Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 3 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "IGNORE_DEF",
    "param": {
     "ignore_def": 3
    }
   }
  ],
  "flavor": "Ein Schuss, ein Ergebnis.",
  "collector": "NP-ORT-11",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 5,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Durchschlag"
  ]
 },
 {
  "id": "dc_np_orthea_punktfeuerbatterie",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Punktfeuerbatterie",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Ein Ziel, hoher Effekt.",
  "collector": "NP-ORT-12",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 2,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Nachsetzen"
  ]
 },
 {
  "id": "dc_np_orthea_zentrale_feuerleitung",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Zentrale Feuerleitung",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "steilfeuer-v",
   "artillerie"
  ],
  "text": "Steilfeuer V: Front + Support (+2 AP).",
  "rules": [
   "Steilfeuer V: Front + Support (+2 AP).",
   "Die Einheit zählt für alle Regeln als Artillerie.",
   "Supportzone-Angriff 3 AP; Front 1 AP."
  ],
  "effects": [
   {
    "code": "ATTACK_ANY_FRONT"
   },
   {
    "code": "ATTACK_SUPPORT"
   }
  ],
  "flavor": "Die Rechnung vor dem Schuss.",
  "collector": "NP-ORT-13",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 5,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Durchschlag"
  ]
 },
 {
  "id": "dc_np_orthea_praezisionsmoerser",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Präzisionsmörser",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-i",
   "artillerie"
  ],
  "text": "Steilfeuer I.",
  "rules": [
   "Steilfeuer I.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Trifft das gemessene Planquadrat.",
  "collector": "NP-ORT-14",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Fernschuss"
  ]
 },
 {
  "id": "dc_np_orthea_zielrechnungsrohr",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Zielrechnungsrohr",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II. Angriffe gegen ungepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Steilfeuer II.",
   "Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [
   {
    "code": "FEUERUEBERLEGENHEIT"
   }
  ],
  "flavor": "Abweichung kleiner als ein Meter.",
  "collector": "NP-ORT-15",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 4,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_orthea_nachmessbatterie",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Nachmessbatterie",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Schießt, misst, schießt nach.",
  "collector": "NP-ORT-16",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 1,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_orthea_peilstation_mobil",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Peilstation mobil",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Ortet Funksignale in Sekunden.",
  "collector": "NP-ORT-17",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 3,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Fernschuss"
  ]
 },
 {
  "id": "dc_np_orthea_gesamtlagebild",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Gesamtlagebild",
  "ap": 3,
  "rarity": "gold",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Nichts bleibt verborgen.",
  "collector": "NP-ORT-18",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Fernschuss"
  ]
 },
 {
  "id": "dc_np_orthea_beobachterkette",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Beobachterkette",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Jeder sieht einen Teil, alle sehen das Ganze.",
  "collector": "NP-ORT-19",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_orthea_institut_der_erkenntnis",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Institut der Erkenntnis",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Die besten Köpfe an der Front.",
  "collector": "NP-ORT-20",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 4,
  "def": 5,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_orthea_chefmesser",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Einheit",
  "name": "Chefmesser",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Angriffe gegen ungepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "FEUERUEBERLEGENHEIT"
   }
  ],
  "flavor": "Misst zuerst, dann misst niemand mehr.",
  "collector": "NP-ORT-21",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 4,
  "def": 5,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_orthea_messnetz",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Messnetz",
  "ap": 5,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert. Deine Fronteinheiten +1 ATK.",
  "rules": [
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
   "Solange diese Unterstützung liegt, haben alle deine Fronteinheiten +1 ATK."
  ],
  "effects": [
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   },
   {
    "code": "AURA_FRONT_ATK",
    "param": {
     "atk": 1
    }
   }
  ],
  "flavor": "Jede Stunde neue Werte.",
  "collector": "NP-ORT-22",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_klinikverfahren",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Klinikverfahren",
  "ap": 5,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Jeder Schaden an deinen Fronteinheiten −1. Deine Fronteinheiten +1 ATK.",
  "rules": [
   "Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.",
   "Solange diese Unterstützung liegt, haben alle deine Fronteinheiten +1 ATK."
  ],
  "effects": [
   {
    "code": "REDUCE_DAMAGE",
    "param": {
     "n": 1
    }
   },
   {
    "code": "AURA_FRONT_ATK",
    "param": {
     "atk": 1
    }
   }
  ],
  "flavor": "Behandlung nach Protokoll.",
  "collector": "NP-ORT-23",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_rechenzentrum_orthea",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Rechenzentrum Orthea",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert. Zu Beginn deines Zuges: +1 AP.",
  "rules": [
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
   "Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt."
  ],
  "effects": [
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   },
   {
    "code": "TURN_AP",
    "param": {
     "ap": 1
    }
   }
  ],
  "flavor": "Das Modell rechnet schneller als der Gegner.",
  "collector": "NP-ORT-24",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_messung",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Messung",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   }
  ],
  "flavor": "Erfasst und aufgezeichnet.",
  "collector": "NP-ORT-25",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_einzelziel_salve",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Einzelziel-Salve",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 1 Schaden zu. Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 1 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 1
    }
   },
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   }
  ],
  "flavor": "Ein Ziel, ein Einschlag.",
  "collector": "NP-ORT-26",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_gemessener_schlag",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Gemessener Schlag",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet. Füge einer gegnerischen Fronteinheit 3 Schaden zu.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 3 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   },
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 3
    }
   }
  ],
  "flavor": "Erst messen, dann vernichten.",
  "collector": "NP-ORT-27",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_klarstellung",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Klarstellung",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 1 Karte. Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 DEF dauerhaft.",
  "rules": [
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.",
   "Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +1 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   },
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "def": 1,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Das Modell wird korrigiert.",
  "collector": "NP-ORT-28",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_nachmessen",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Nachmessen",
  "ap": 0,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 1, dann wirf deine älteste Handkarte ab.",
  "rules": [
   "Ziehe 1 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof."
  ],
  "effects": [
   {
    "code": "DRAW_DISCARD",
    "param": {
     "draw": 1,
     "discard": 1
    }
   }
  ],
  "flavor": "Falsche Daten werden verworfen.",
  "collector": "NP-ORT-29",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_zielkorrektur",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Zielkorrektur",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +2 ATK bis Zugende. Heile 1 DEF an einer eigenen Fronteinheit.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges.",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 1 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 2,
     "def": 0,
     "until": "turn"
    }
   },
   {
    "code": "HEAL",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Plus zwei Strich, Feuer.",
  "collector": "NP-ORT-30",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_erkenntnisvorsprung",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Erkenntnisvorsprung",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 2 Karten. Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.",
  "rules": [
   "Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 2
    }
   },
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   }
  ],
  "flavor": "Wer mehr weiß, entscheidet.",
  "collector": "NP-ORT-31",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_laborversorgung",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Laborversorgung",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Heile 2 DEF an einer eigenen Fronteinheit. Eine eigene Fronteinheit: +1 DEF dauerhaft.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF."
  ],
  "effects": [
   {
    "code": "HEAL",
    "param": {
     "value": 2
    }
   },
   {
    "code": "BUFF",
    "param": {
     "atk": 0,
     "def": 1,
     "until": "turn"
    }
   }
  ],
  "flavor": "Wundversorgung nach neuester Studie.",
  "collector": "NP-ORT-32",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_volltreffer_berechnet",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Volltreffer berechnet",
  "ap": 3,
  "rarity": "gold",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 5 Schaden zu.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 5 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 5
    }
   }
  ],
  "flavor": "Die Rechnung geht auf.",
  "collector": "NP-ORT-33",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_nachbesetzung_nach_mass",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Nachbesetzung nach Maß",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Deine nächste Einheit oder Unterstützung kostet 2 AP weniger (mind. 1). Ziehe 1 Karte.",
  "rules": [
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 2 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 2
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Angepasst auf jeden Träger.",
  "collector": "NP-ORT-34",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_optik_feinmessung",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Optik Feinmessung",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Angriffe des Trägers: +1 Schaden. Träger +1 DEF.",
  "rules": [
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.",
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   },
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 1
    }
   }
  ],
  "flavor": "Ein Strich Abweichung, mehr nicht.",
  "collector": "NP-ORT-35",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_peilantenne",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Peilantenne",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 DEF. Wird der Träger zerstört, ziehst du 2 Karten.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Wird der Träger zerstört, ziehst du 2 Karten."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 1
    }
   },
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 2
    }
   }
  ],
  "flavor": "Die letzte Peilung geht nicht verloren.",
  "collector": "NP-ORT-36",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_zielrechner_tragbar",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Zielrechner tragbar",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Angriff des Trägers: +2 ATK. Träger +1 DEF.",
  "rules": [
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +2 ATK. Danach entfällt der Bonus.",
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 2
    }
   },
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 1
    }
   }
  ],
  "flavor": "Der erste Schuss ist berechnet.",
  "collector": "NP-ORT-37",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_laborpanzerung",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Laborpanzerung",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 ATK und +2 DEF. Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 1 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +1 ATK und +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 1 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 2,
     "only": "infanterie"
    }
   },
   {
    "code": "EQUIP_NEGATE_DAMAGE",
    "param": {
     "amount": 1,
     "once": true
    }
   }
  ],
  "flavor": "Getestet bis zur Bruchgrenze.",
  "collector": "NP-ORT-38",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_messgewehr",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Messgewehr",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 ATK. Erster Angriff des Trägers: +1 ATK.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +1 ATK. Danach entfällt der Bonus."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 0,
     "only": "infanterie"
    }
   },
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 1
    }
   }
  ],
  "flavor": "Kalibriert im Institut.",
  "collector": "NP-ORT-39",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_orthea_feldlaborkoffer",
  "set": "set_nation_pool",
  "nation": "Orthea",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Feldlaborkoffer",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 ATK und +1 DEF. Erster Angriff des Trägers: +1 ATK.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK und +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +1 ATK. Danach entfällt der Bonus."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 1
    }
   },
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 1
    }
   }
  ],
  "flavor": "Schwer, aber schützend.",
  "collector": "NP-ORT-40",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vesper_scheinkompanie",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Scheinkompanie",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Sie ist da – oder auch nicht.",
  "collector": "NP-VES-01",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Platztausch",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_vesper_systemtreue_linie",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Systemtreue Linie",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Das System spielt mit allen.",
  "collector": "NP-VES-02",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 5,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_vesper_desinformanten",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Desinformanten",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.",
  "rules": [
   "Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie."
  ],
  "effects": [
   {
    "code": "HAND_PEEK",
    "param": {
     "n": 2
    }
   }
  ],
  "flavor": "Wer zuhört, wird belogen.",
  "collector": "NP-VES-03",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 3,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_vesper_hinterhaltszug_velis",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Hinterhaltszug Velis",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.",
  "rules": [
   "Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.",
   "Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden."
  ],
  "effects": [
   {
    "code": "AMBUSH"
   }
  ],
  "flavor": "Das Gelände lügt für uns.",
  "collector": "NP-VES-04",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Nachsetzen"
  ]
 },
 {
  "id": "dc_np_vesper_abriegelungstrupp",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Abriegelungstrupp",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Schließt Räume, nicht nur Lücken.",
  "collector": "NP-VES-05",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Gefechtsbereit"
  ]
 },
 {
  "id": "dc_np_vesper_unsichtbare_wache",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Unsichtbare Wache",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Nie dort, wo man sucht.",
  "collector": "NP-VES-06",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Hinterhalt",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_vesper_velis_kolonne",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Velis-Kolonne",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Taucht auf, schlägt zu, verschwindet.",
  "collector": "NP-VES-07",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Platztausch",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_vesper_attrappenwagen",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Attrappenwagen",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Aus Holz – vielleicht.",
  "collector": "NP-VES-08",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 1,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_vesper_taeuschungspanzer",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Täuschungspanzer",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Ein Panzer, der nie da war.",
  "collector": "NP-VES-09",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Hinterhalt",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_vesper_riegelwagen",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Riegelwagen",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Riegelt die echte Achse ab.",
  "collector": "NP-VES-10",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Abschirmung"
  ]
 },
 {
  "id": "dc_np_vesper_schattenkeil",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Schattenkeil",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.",
  "rules": [
   "Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.",
   "Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden."
  ],
  "effects": [
   {
    "code": "AMBUSH"
   }
  ],
  "flavor": "Kommt aus dem toten Winkel.",
  "collector": "NP-VES-11",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_vesper_abriegelungsbatterie",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Abriegelungsbatterie",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Feuer, das Räume schließt.",
  "collector": "NP-VES-12",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_vesper_scheinfeuerstellung",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Scheinfeuerstellung",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Feuert, zieht um, feuert wieder.",
  "collector": "NP-VES-13",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 1,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Hinterhalt",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_vesper_systemmoerser",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Systemmörser",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-i",
   "artillerie"
  ],
  "text": "Steilfeuer I.",
  "rules": [
   "Steilfeuer I.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Teil eines größeren Plans.",
  "collector": "NP-VES-14",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Durchschlag"
  ]
 },
 {
  "id": "dc_np_vesper_riegelfeuer",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Riegelfeuer",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Schließt auch die Depots.",
  "collector": "NP-VES-15",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 2,
  "def": 5,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_vesper_systemantwort",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Systemantwort",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "steilfeuer-iv",
   "artillerie"
  ],
  "text": "Steilfeuer IV: ganze Front.",
  "rules": [
   "Steilfeuer IV: ganze Front.",
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [
   {
    "code": "ATTACK_ANY_FRONT"
   },
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Wenn die Partie kippt, antwortet das System.",
  "collector": "NP-VES-16",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 5,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Platztausch",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_vesper_ueberwachungsposten",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Überwachungsposten",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Beobachtet nach innen und außen.",
  "collector": "NP-VES-17",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 1,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_vesper_doppelagent",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Doppelagent",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.",
  "rules": [
   "Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie."
  ],
  "effects": [
   {
    "code": "HAND_PEEK",
    "param": {
     "n": 2
    }
   }
  ],
  "flavor": "Arbeitet für beide – sagt er.",
  "collector": "NP-VES-18",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_vesper_schattenmelder",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Schattenmelder",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.",
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   },
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Meldet und verschwindet.",
  "collector": "NP-VES-19",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 1,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Platztausch",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_vesper_spielmeister",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Spielmeister",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.",
  "rules": [
   "Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie."
  ],
  "effects": [
   {
    "code": "HAND_PEEK",
    "param": {
     "n": 2
    }
   }
  ],
  "flavor": "Kennt die Züge aller Spieler.",
  "collector": "NP-VES-20",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 4,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Nachsetzen"
  ]
 },
 {
  "id": "dc_np_vesper_operationsleitung_vesper",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Einheit",
  "name": "Operationsleitung Vesper",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.",
  "rules": [
   "Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.",
   "Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden."
  ],
  "effects": [
   {
    "code": "AMBUSH"
   }
  ],
  "flavor": "Plant den Hinterhalt im Hinterhalt.",
  "collector": "NP-VES-21",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 4,
  "def": 5,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_vesper_desinformationsnetz",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Desinformationsnetz",
  "ap": 5,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Gegnerische Fronteinheiten −1 ATK. Deine Fronteinheiten +1 ATK.",
  "rules": [
   "Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).",
   "Solange diese Unterstützung liegt, haben alle deine Fronteinheiten +1 ATK."
  ],
  "effects": [
   {
    "code": "AURA_ENEMY_ATK",
    "param": {
     "atk": -1
    }
   },
   {
    "code": "AURA_FRONT_ATK",
    "param": {
     "atk": 1
    }
   }
  ],
  "flavor": "Der Gegner kämpft gegen Schatten.",
  "collector": "NP-VES-22",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vesper_systemarchiv",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Systemarchiv",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert. Gegnerische Fronteinheiten −1 ATK.",
  "rules": [
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
   "Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag)."
  ],
  "effects": [
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   },
   {
    "code": "AURA_ENEMY_ATK",
    "param": {
     "atk": -1
    }
   }
  ],
  "flavor": "Alles wird gespeichert, alles wird genutzt.",
  "collector": "NP-VES-23",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vesper_das_spiel_des_systems",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Das Spiel des Systems",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Gegnerische Fronteinheiten −1 ATK. Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
  "rules": [
   "Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).",
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert."
  ],
  "effects": [
   {
    "code": "AURA_ENEMY_ATK",
    "param": {
     "atk": -1
    }
   },
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   }
  ],
  "flavor": "Niemand führt, alle spielen.",
  "collector": "NP-VES-24",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vesper_gefuetterter_koeder",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Gefütterter Köder",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 DEF dauerhaft.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +1 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "def": 1,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Hier sieht es stark aus.",
  "collector": "NP-VES-25",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vesper_falsche_meldung",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Falsche Meldung",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 2, dann wirf deine älteste Handkarte ab. Eine eigene Fronteinheit: +1 ATK bis Zugende.",
  "rules": [
   "Ziehe 2 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 ATK bis zum Ende dieses Zuges."
  ],
  "effects": [
   {
    "code": "DRAW_DISCARD",
    "param": {
     "draw": 2,
     "discard": 1
    }
   },
   {
    "code": "BUFF",
    "param": {
     "atk": 1,
     "def": 0,
     "until": "turn"
    }
   }
  ],
  "flavor": "Eine Wahrheit, eine Lüge.",
  "collector": "NP-VES-26",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vesper_raum_schliessen",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Raum schließen",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 2 Schaden zu. Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 2
    }
   },
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   }
  ],
  "flavor": "Der Raum wird geschlossen.",
  "collector": "NP-VES-27",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vesper_enttarnung",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Enttarnung",
  "ap": 0,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   }
  ],
  "flavor": "Das System sieht dich.",
  "collector": "NP-VES-28",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vesper_zug_im_spiel",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Zug im Spiel",
  "ap": 1,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit darf in diesem Zug erneut angreifen.",
  "rules": [
   "Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten)."
  ],
  "effects": [
   {
    "code": "EXTRA_ATTACK",
    "param": {}
   }
  ],
  "flavor": "Noch ein Zug, den niemand sah.",
  "collector": "NP-VES-29",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vesper_schattenoperation",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Schattenoperation",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +1 ATK bis Zugende.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 ATK bis zum Ende dieses Zuges."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 1,
     "def": 0,
     "until": "turn"
    }
   }
  ],
  "flavor": "Aus dem Nichts.",
  "collector": "NP-VES-30",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vesper_systemzugriff",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Systemzugriff",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 2 Karten. Eine eigene Fronteinheit: +1 DEF dauerhaft.",
  "rules": [
   "Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 2
    }
   },
   {
    "code": "BUFF",
    "param": {
     "atk": 0,
     "def": 1,
     "until": "turn"
    }
   }
  ],
  "flavor": "Das Archiv öffnet sich.",
  "collector": "NP-VES-31",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vesper_verdeckter_rabatt",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Verdeckter Rabatt",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Ziehe 1 Karte. Heile 1 DEF an einer eigenen Fronteinheit.",
  "rules": [
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 1 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts."
  ],
  "effects": [
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   },
   {
    "code": "HEAL",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Die Rechnung zahlt jemand anders.",
  "collector": "NP-VES-32",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vesper_doppeltes_spiel",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Doppeltes Spiel",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet. Füge einer gegnerischen Fronteinheit 1 Schaden zu.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 1 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   },
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Erst entlarven, dann bestrafen.",
  "collector": "NP-VES-33",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vesper_der_grosse_bluff",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Der große Bluff",
  "ap": 3,
  "rarity": "gold",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 4, dann wirf deine älteste Handkarte ab.",
  "rules": [
   "Ziehe 4 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof."
  ],
  "effects": [
   {
    "code": "DRAW_DISCARD",
    "param": {
     "draw": 4,
     "discard": 1
    }
   }
  ],
  "flavor": "Alle Karten auf dem Tisch – fast.",
  "collector": "NP-VES-34",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vesper_tarnanzug_velis",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Tarnanzug Velis",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Schaden am Träger wird ignoriert. Erster Angriff des Trägers: +2 ATK.",
  "rules": [
   "Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.",
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +2 ATK. Danach entfällt der Bonus.",
   "Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)"
  ],
  "effects": [
   {
    "code": "EQUIP_IGNORE_FIRST_DAMAGE",
    "param": {
     "untouchableFirst": true
    }
   },
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 2
    }
   }
  ],
  "flavor": "Der erste Schuss trifft den Schatten.",
  "collector": "NP-VES-35",
  "art_status": "platzhalter",
  "keywords": [
   "Erstschadenschutz"
  ]
 },
 {
  "id": "dc_np_vesper_falsche_papiere",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Falsche Papiere",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Wird der Träger zerstört, ziehst du 1 Karte. Träger +1 DEF.",
  "rules": [
   "Wird der Träger zerstört, ziehst du 1 Karte.",
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   },
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 1
    }
   }
  ],
  "flavor": "Wer fällt, nimmt das Geheimnis nicht mit.",
  "collector": "NP-VES-36",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vesper_stoersender",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Störsender",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 2 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar. Erster Angriff des Trägers: +1 ATK.",
  "rules": [
   "Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 2 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.",
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +1 ATK. Danach entfällt der Bonus."
  ],
  "effects": [
   {
    "code": "EQUIP_NEGATE_DAMAGE",
    "param": {
     "amount": 2,
     "once": true
    }
   },
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 1
    }
   }
  ],
  "flavor": "Zielerfassung gestört.",
  "collector": "NP-VES-37",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vesper_schalldaempfer",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Schalldämpfer",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Angriff des Trägers: +1 ATK. Angriffe des Trägers: +1 Schaden.",
  "rules": [
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +1 ATK. Danach entfällt der Bonus.",
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert."
  ],
  "effects": [
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 1
    }
   },
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   }
  ],
  "flavor": "Der erste Schuss bleibt ungehört.",
  "collector": "NP-VES-38",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vesper_systemausweis",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Systemausweis",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 ATK und +2 DEF. Erster Angriff des Trägers: +1 ATK.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +1 ATK und +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +1 ATK. Danach entfällt der Bonus."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 2,
     "only": "infanterie"
    }
   },
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 1
    }
   }
  ],
  "flavor": "Zugang zu allen Ebenen.",
  "collector": "NP-VES-39",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vesper_hinterhaltsmesser",
  "set": "set_nation_pool",
  "nation": "Vesper",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Hinterhaltsmesser",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Angriffe des Trägers: +1 Schaden. Träger +2 ATK.",
  "rules": [
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.",
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +2 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   },
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 2,
     "def": 0,
     "only": "infanterie"
    }
   }
  ],
  "flavor": "Leise und endgültig.",
  "collector": "NP-VES-40",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_optimierter_stosstrupp",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Optimierter Stoßtrupp",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Nerven verstärkt, Angst entfernt.",
  "collector": "NP-KAR-01",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 3,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Nachsetzen"
  ]
 },
 {
  "id": "dc_np_karsk_filtergrenadiere",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Filtergrenadiere",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Angriffe gegen Infanterie: +2 Schaden.",
  "rules": [
   "Greift diese Einheit eine Infanterie an, verursacht sie 2 Schaden zusätzlich zu ihrem ATK. Der Gegenschlag des Ziels bleibt unverändert."
  ],
  "effects": [
   {
    "code": "VS_INF"
   }
  ],
  "flavor": "Atmen, wo andere ersticken.",
  "collector": "NP-KAR-02",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Erbitterung"
  ]
 },
 {
  "id": "dc_np_karsk_masszug",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Maßzug",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Leistung gemessen, Ergebnis geliefert.",
  "collector": "NP-KAR-03",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Nachsetzen"
  ]
 },
 {
  "id": "dc_np_karsk_implantatkompanie",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Implantatkompanie",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Mehr Maschine als Mensch.",
  "collector": "NP-KAR-04",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 4,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_karsk_durchbruchszug",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Durchbruchszug",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Angriffe gegen Infanterie: +2 Schaden.",
  "rules": [
   "Greift diese Einheit eine Infanterie an, verursacht sie 2 Schaden zusätzlich zu ihrem ATK. Der Gegenschlag des Ziels bleibt unverändert."
  ],
  "effects": [
   {
    "code": "VS_INF"
   }
  ],
  "flavor": "Kein Halten, nur Durch.",
  "collector": "NP-KAR-05",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 4,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Nachsetzen"
  ]
 },
 {
  "id": "dc_np_karsk_ausfallreserve",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Ausfallreserve",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Ersetzt, was ausfällt.",
  "collector": "NP-KAR-06",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_karsk_stossleitpanzer",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Stoßleitpanzer",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Führt den einen Stoß.",
  "collector": "NP-KAR-07",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 6,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_karsk_keilspitze_karsk",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Keilspitze Karsk",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Vorne ist der einzige Ort.",
  "collector": "NP-KAR-08",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 5,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Überlast"
  ]
 },
 {
  "id": "dc_np_karsk_durchbruchwagen",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Durchbruchwagen",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Angriffe gegen gepanzerte Ziele: +2 Schaden.",
  "rules": [
   "Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 2 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "IGNORE_DEF",
    "param": {
     "ignore_def": 2
    }
   }
  ],
  "flavor": "Bricht Platten wie Knochen.",
  "collector": "NP-KAR-09",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Nachsetzen"
  ]
 },
 {
  "id": "dc_np_karsk_masspanzer",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Maßpanzer",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Genormt auf Leistung.",
  "collector": "NP-KAR-10",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Durchschlag"
  ]
 },
 {
  "id": "dc_np_karsk_leichter_stosswagen",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Leichter Stoßwagen",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Schnell durch, bevor die Lücke schließt.",
  "collector": "NP-KAR-11",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 5,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Gefechtsbereit"
  ]
 },
 {
  "id": "dc_np_karsk_oeffnungsbatterie",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Öffnungsbatterie",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Feuer öffnet für den Stoßtrupp.",
  "collector": "NP-KAR-12",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 4,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_karsk_kurzfeuerwerfer",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Kurzfeuerwerfer",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-iii",
   "artillerie"
  ],
  "text": "Steilfeuer III.",
  "rules": [
   "Steilfeuer III.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Kurz, brutal, am Durchbruchspunkt.",
  "collector": "NP-KAR-13",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 2,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_karsk_massschlagrohr",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Maßschlagrohr",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Ein Einschlag nach Maß.",
  "collector": "NP-KAR-14",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 5,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_karsk_durchbruchsfeuer",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Durchbruchsfeuer",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II. Angriffe gegen ungepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Steilfeuer II.",
   "Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [
   {
    "code": "FEUERUEBERLEGENHEIT"
   }
  ],
  "flavor": "Feuer ersetzt den Stoß nicht – es bereitet ihn vor.",
  "collector": "NP-KAR-15",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_karsk_stossleitfeuer",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Stoßleitfeuer",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "steilfeuer-iv",
   "artillerie"
  ],
  "text": "Steilfeuer IV: ganze Front.",
  "rules": [
   "Steilfeuer IV: ganze Front.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [
   {
    "code": "ATTACK_ANY_FRONT"
   }
  ],
  "flavor": "Schaltet die Etappe aus, bevor der Stoß kommt.",
  "collector": "NP-KAR-16",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 4,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_karsk_leistungsmesser",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Leistungsmesser",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Misst den Gegner, nicht die Schonung.",
  "collector": "NP-KAR-17",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 1,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Gefechtsbereit"
  ]
 },
 {
  "id": "dc_np_karsk_biometriespaeher",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Biometriespäher",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Herzschlag auf zweihundert Meter.",
  "collector": "NP-KAR-18",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 5,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_karsk_stosslotse",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Stoßlotse",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Findet den Punkt für den Stoß.",
  "collector": "NP-KAR-19",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 1,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_karsk_letzter_stoss",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Letzter Stoß",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Angriffe gegen Infanterie: +2 Schaden.",
  "rules": [
   "Greift diese Einheit eine Infanterie an, verursacht sie 2 Schaden zusätzlich zu ihrem ATK. Der Gegenschlag des Ziels bleibt unverändert."
  ],
  "effects": [
   {
    "code": "VS_INF"
   }
  ],
  "flavor": "Danach kommt nichts mehr – das ist der Plan.",
  "collector": "NP-KAR-20",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 6,
  "def": 5,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_karsk_unermuedliche",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Einheit",
  "name": "Unermüdliche",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Jeder Schaden an dieser Einheit −2.",
  "rules": [
   "Schwere Panzerung: Jeder einzelne Schaden, den diese Einheit erleidet (Kampf, Soforteinsatz, Effekt), wird um 2 verringert, mindestens auf 0."
  ],
  "effects": [
   {
    "code": "SCHADEN_MINUS"
   }
  ],
  "flavor": "Schmerzrezeptoren abgeschaltet.",
  "collector": "NP-KAR-21",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 4,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_karsk_medizinisch_technische_kette",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Medizinisch-technische Kette",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Jeder Schaden an deinen Fronteinheiten −1. Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.",
  "rules": [
   "Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.",
   "Beim Ausspielen wählst du einen eigenen Frontabschnitt. Solange diese Unterstützung liegt, haben deine Einheiten in diesem Abschnitt +1 DEF."
  ],
  "effects": [
   {
    "code": "REDUCE_DAMAGE",
    "param": {
     "n": 1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "aura",
     "scope": "section",
     "atk": 0,
     "def": 1
    }
   }
  ],
  "flavor": "Repariert Körper wie Maschinen.",
  "collector": "NP-KAR-22",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_stosszentrale",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Stoßzentrale",
  "ap": 4,
  "rarity": "gold",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Deine Fronteinheiten +1 ATK.",
  "rules": [
   "Solange diese Unterstützung liegt, haben alle deine Fronteinheiten +1 ATK."
  ],
  "effects": [
   {
    "code": "AURA_FRONT_ATK",
    "param": {
     "atk": 1
    }
   }
  ],
  "flavor": "Alles für den einen Stoß.",
  "collector": "NP-KAR-23",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_implantatwerk",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Implantatwerk",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn deines Zuges: +1 AP. Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.",
  "rules": [
   "Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt.",
   "Zu Beginn jedes deiner Züge heilt eine beschädigte eigene Fronteinheit bis zu 1 DEF (höchstens bis zur maximalen DEF), solange diese Unterstützung liegt."
  ],
  "effects": [
   {
    "code": "TURN_AP",
    "param": {
     "ap": 1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "turnheal",
     "n": 1
    }
   }
  ],
  "flavor": "Leistung ist eine Fertigungsfrage.",
  "collector": "NP-KAR-24",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_stimulans",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Stimulans",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +3 ATK bis Zugende. Danach erleidet sie 1 Schaden.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +3 ATK bis zum Ende dieses Zuges.",
   "Preis: Dieselbe eigene Einheit erleidet danach 1 Schaden. Sinkt ihre DEF auf 0, wird sie zerstört."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 3,
     "def": 0,
     "until": "turn"
    }
   },
   {
    "code": "SELF_DAMAGE",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Drei Minuten wie ein Gott, danach Schmerzen.",
  "collector": "NP-KAR-25",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_wundverschluss",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Wundverschluss",
  "ap": 0,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Heile 1 DEF an einer eigenen Fronteinheit.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 1 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts."
  ],
  "effects": [
   {
    "code": "HEAL",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Wunde geschlossen, Befehl bleibt.",
  "collector": "NP-KAR-26",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_luecke_reissen",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Lücke reißen",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit darf in diesem Zug erneut angreifen. Danach erleidet sie 1 Schaden.",
  "rules": [
   "Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten).",
   "Preis: Dieselbe eigene Einheit erleidet danach 1 Schaden. Sinkt ihre DEF auf 0, wird sie zerstört."
  ],
  "effects": [
   {
    "code": "EXTRA_ATTACK",
    "param": {}
   },
   {
    "code": "SELF_DAMAGE",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Durch die Lücke, egal was es kostet.",
  "collector": "NP-KAR-27",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_massschlag",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Maßschlag",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 3 Schaden zu.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 3 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 3
    }
   }
  ],
  "flavor": "Dosiert auf tödlich.",
  "collector": "NP-KAR-28",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_nervenboost",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Nervenboost",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +2 ATK bis Zugende. Ziehe 1 Karte.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 2,
     "def": 0,
     "until": "turn"
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Reflexe auf Maximum.",
  "collector": "NP-KAR-29",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_koerper_ueber_gewissen",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Körper über Gewissen",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: deine Infanterie dort +2 ATK bis Zugende. Ziehe 1 Karte.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Infanterie-Einheit dort hat bis zum Ende dieses Zuges +2 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung).",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "atk": 2,
     "filter": "infanterie",
     "until": "turn",
     "targetSide": "own"
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Die Rechnung kennt kein Zögern.",
  "collector": "NP-KAR-30",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_leistungsprotokoll",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Leistungsprotokoll",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 1 Karte. Eine eigene Fronteinheit: +1 ATK bis Zugende.",
  "rules": [
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 ATK bis zum Ende dieses Zuges."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   },
   {
    "code": "BUFF",
    "param": {
     "atk": 1,
     "def": 0,
     "until": "turn"
    }
   }
  ],
  "flavor": "Verluste sind eingeplant.",
  "collector": "NP-KAR-31",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_durchbruch_erzwingen",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Durchbruch erzwingen",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +2 ATK bis Zugende.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Einheit dort hat bis zum Ende dieses Zuges +2 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung)."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "atk": 2,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Der ganze Abschnitt stößt vor.",
  "collector": "NP-KAR-32",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_nachlieferung_koerperteile",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Nachlieferung Körperteile",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.",
  "rules": [
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   },
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   }
  ],
  "flavor": "Ersatz ist bestellt.",
  "collector": "NP-KAR-33",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_der_eine_stoss",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Der eine Stoß",
  "ap": 3,
  "rarity": "gold",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +5 ATK bis Zugende. Danach erleidet sie 2 Schaden.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +5 ATK bis zum Ende dieses Zuges.",
   "Preis: Dieselbe eigene Einheit erleidet danach 2 Schaden. Sinkt ihre DEF auf 0, wird sie zerstört."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 5,
     "def": 0,
     "until": "turn"
    }
   },
   {
    "code": "SELF_DAMAGE",
    "param": {
     "value": 2
    }
   }
  ],
  "flavor": "Alles, was der Körper hergibt.",
  "collector": "NP-KAR-34",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_kampfimplantat",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Kampfimplantat",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Angriffe des Trägers: +2 Schaden, aber er erleidet selbst 1.",
  "rules": [
   "Jeder Angriff des Trägers verursacht 2 zusätzlichen Schaden. Preis: Bei jedem Angriff erleidet der Träger zuvor selbst 1 Schaden; kann ihn das zerstören, wird er zerstört."
  ],
  "effects": [
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 2,
     "self": 1
    }
   }
  ],
  "flavor": "Stärker, schneller – und es tut weh.",
  "collector": "NP-KAR-35",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_nervenverstaerker",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Nervenverstärker",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Solange der Träger beschädigt ist: +2 ATK. Wird der Träger zerstört, ziehst du 1 Karte.",
  "rules": [
   "Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +2 ATK.",
   "Wird der Träger zerstört, ziehst du 1 Karte."
  ],
  "effects": [
   {
    "code": "EQUIP_COND_ATK",
    "param": {
     "atk": 2,
     "ifDamaged": true
    }
   },
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   }
  ],
  "flavor": "Schmerz macht schneller.",
  "collector": "NP-KAR-36",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_filtermaske_karsk",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Filtermaske Karsk",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +2 DEF. Erster Angriff des Trägers: +1 ATK.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +1 ATK. Danach entfällt der Bonus."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 2,
     "only": "infanterie"
    }
   },
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 1
    }
   }
  ],
  "flavor": "Atmet, wo andere sterben.",
  "collector": "NP-KAR-37",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_stossbajonett",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Stoßbajonett",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +2 ATK und -1 DEF.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 ATK und -1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 2,
     "def": -1
    }
   }
  ],
  "flavor": "Mehr Angriff, weniger Schutz.",
  "collector": "NP-KAR-38",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_muskelservo",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Muskelservo",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +2 ATK. Solange der Träger beschädigt ist: +1 ATK.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +1 ATK."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 2,
     "def": 0
    }
   },
   {
    "code": "EQUIP_COND_ATK",
    "param": {
     "atk": 1,
     "ifDamaged": true
    }
   }
  ],
  "flavor": "Die Maschine trägt, wenn der Mensch versagt.",
  "collector": "NP-KAR-39",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_karsk_endoskelett",
  "set": "set_nation_pool",
  "nation": "Karsk",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Endoskelett",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +2 DEF. Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 1 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 1 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 2
    }
   },
   {
    "code": "EQUIP_NEGATE_DAMAGE",
    "param": {
     "amount": 1,
     "once": true
    }
   }
  ],
  "flavor": "Knochen aus Stahl.",
  "collector": "NP-KAR-40",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_caldris_schildwall_zug",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Schildwall-Zug",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Hinter dem Schild steht die Etappe.",
  "collector": "NP-CAL-01",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_caldris_sanitaetstrupp",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Sanitätstrupp",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Fürsorge an der Front.",
  "collector": "NP-CAL-02",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_caldris_ruhezug",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Ruhezug",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Ausgeruht und bereit.",
  "collector": "NP-CAL-03",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Zähigkeit"
  ]
 },
 {
  "id": "dc_np_caldris_schildtraeger",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Schildträger",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Schützt die Nachbarn zuerst.",
  "collector": "NP-CAL-04",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_caldris_etappenwache",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Etappenwache",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Benachbarte eigene Infanterie +1 DEF.",
  "rules": [
   "Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "MECH_AURA"
   }
  ],
  "flavor": "Hält die Ruhezone sicher.",
  "collector": "NP-CAL-05",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_caldris_genesene_kompanie",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Genesene Kompanie",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Zurück aus der Klinik, stärker als zuvor.",
  "collector": "NP-CAL-06",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Überlast"
  ]
 },
 {
  "id": "dc_np_caldris_sanitaetspanzer",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Sanitätspanzer",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Gepanzerte Fürsorge.",
  "collector": "NP-CAL-07",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Durchschlag"
  ]
 },
 {
  "id": "dc_np_caldris_schildwagen",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Schildwagen",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Ein rollender Schild.",
  "collector": "NP-CAL-08",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Überlast"
  ]
 },
 {
  "id": "dc_np_caldris_panzerschild_caldris",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Panzerschild Caldris",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Jeder Schaden an dieser Einheit −1.",
  "rules": [
   "Schwere Panzerung: Jeder einzelne Schaden, den diese Einheit erleidet (Kampf, Soforteinsatz, Effekt), wird um 1 verringert, mindestens auf 0."
  ],
  "effects": [
   {
    "code": "SCHADEN_MINUS",
    "param": {
     "n": 1
    }
   }
  ],
  "flavor": "Nichts kommt durch.",
  "collector": "NP-CAL-09",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 7,
  "verdeckt_ok": true,
  "keywords": [
   "Abschirmung"
  ]
 },
 {
  "id": "dc_np_caldris_etappenpanzer",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Etappenpanzer",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Sichert den Weg zur Klinik.",
  "collector": "NP-CAL-10",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Zähigkeit"
  ]
 },
 {
  "id": "dc_np_caldris_bergepanzer_caldris",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Bergepanzer Caldris",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Niemand bleibt liegen.",
  "collector": "NP-CAL-11",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 2,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Ablösung"
  ]
 },
 {
  "id": "dc_np_caldris_schutzfeuerbatterie",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Schutzfeuerbatterie",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Feuer schützt die Etappe.",
  "collector": "NP-CAL-12",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Fernschuss"
  ]
 },
 {
  "id": "dc_np_caldris_abschnittsmoerser",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Abschnittsmörser",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-i",
   "artillerie"
  ],
  "text": "Steilfeuer I.",
  "rules": [
   "Steilfeuer I.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Deckt den eigenen Abschnitt.",
  "collector": "NP-CAL-13",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 1,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_caldris_defensivbatterie",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Defensivbatterie",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Schießt nur, wenn der Schild bedroht ist.",
  "collector": "NP-CAL-14",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_caldris_sperrfeuer_fuersorge",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Sperrfeuer Fürsorge",
  "ap": 5,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Hält den Gegner von den Verwundeten fern.",
  "collector": "NP-CAL-15",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 5,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Nachsetzen"
  ]
 },
 {
  "id": "dc_np_caldris_schlag_nach_der_genesung",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Schlag nach der Genesung",
  "ap": 4,
  "rarity": "gold",
  "tags": [
   "einheit",
   "steilfeuer-iv",
   "artillerie"
  ],
  "text": "Steilfeuer IV: ganze Front.",
  "rules": [
   "Steilfeuer IV: ganze Front.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [
   {
    "code": "ATTACK_ANY_FRONT"
   }
  ],
  "flavor": "Nach dem Rasten kommt der Schlag.",
  "collector": "NP-CAL-16",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 4,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung",
   "Fernschuss"
  ]
 },
 {
  "id": "dc_np_caldris_biometrie_melder",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Biometrie-Melder",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Meldet nach oben, was die Sensoren sehen.",
  "collector": "NP-CAL-17",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 1,
  "def": 1,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_caldris_sanitaetsaufklaerer",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Sanitätsaufklärer",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Sucht Verwundete – und Feinde.",
  "collector": "NP-CAL-18",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 1,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_caldris_etappenbeobachter",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Etappenbeobachter",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Sieht, wer die Etappe bedroht.",
  "collector": "NP-CAL-19",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Fernschuss"
  ]
 },
 {
  "id": "dc_np_caldris_oberste_fuersorge",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Oberste Fürsorge",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Niemand wird zurückgelassen.",
  "collector": "NP-CAL-20",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 4,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Erbitterung"
  ]
 },
 {
  "id": "dc_np_caldris_schildgarde",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Einheit",
  "name": "Schildgarde",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Benachbarte eigene Infanterie +1 DEF.",
  "rules": [
   "Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "MECH_AURA"
   }
  ],
  "flavor": "Der Schild der Schilde.",
  "collector": "NP-CAL-21",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 3,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Sicherung"
  ]
 },
 {
  "id": "dc_np_caldris_feldklinik",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Feldklinik",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Jeder Schaden an deinen Fronteinheiten −1.",
  "rules": [
   "Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich."
  ],
  "effects": [
   {
    "code": "REDUCE_DAMAGE",
    "param": {
     "n": 1
    }
   }
  ],
  "flavor": "Hier wird jeder versorgt.",
  "collector": "NP-CAL-22",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_caldris_ruhezone",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Ruhezone",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert. Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.",
  "rules": [
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
   "Zu Beginn jedes deiner Züge heilt eine beschädigte eigene Fronteinheit bis zu 1 DEF (höchstens bis zur maximalen DEF), solange diese Unterstützung liegt."
  ],
  "effects": [
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "turnheal",
     "n": 1
    }
   }
  ],
  "flavor": "Wer ruht, hält länger.",
  "collector": "NP-CAL-23",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_caldris_unantastbare_etappe",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Unantastbare Etappe",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Jeder Schaden an deinen Fronteinheiten −1. Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
  "rules": [
   "Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.",
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert."
  ],
  "effects": [
   {
    "code": "REDUCE_DAMAGE",
    "param": {
     "n": 1
    }
   },
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   }
  ],
  "flavor": "Die Etappe ist unantastbar.",
  "collector": "NP-CAL-24",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_caldris_nachtlager",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Nachtlager",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Heile 3 DEF an einer eigenen Fronteinheit.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 3 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts."
  ],
  "effects": [
   {
    "code": "HEAL",
    "param": {
     "value": 3
    }
   }
  ],
  "flavor": "Eine Nacht Schlaf wirkt Wunder.",
  "collector": "NP-CAL-25",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_caldris_verbandswechsel",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Verbandswechsel",
  "ap": 0,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Heile 1 DEF an einer eigenen Fronteinheit. Ziehe 1 Karte.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 1 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "HEAL",
    "param": {
     "value": 1
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Versorgt und weiter.",
  "collector": "NP-CAL-26",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_caldris_schild_heben",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Schild heben",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +1 DEF dauerhaft.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 0,
     "def": 1,
     "until": "turn"
    }
   }
  ],
  "flavor": "Alle hinter den Schild.",
  "collector": "NP-CAL-27",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_caldris_etappe_sichern",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Etappe sichern",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +2 DEF dauerhaft.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +2 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "def": 2,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Der Abschnitt wird zur Festung.",
  "collector": "NP-CAL-28",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_caldris_fuersorgemeldung",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Fürsorgemeldung",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 1 Karte. Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.",
  "rules": [
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   },
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   }
  ],
  "flavor": "Alle sind versorgt.",
  "collector": "NP-CAL-29",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_caldris_genesung",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Genesung",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Heile 4 DEF an einer eigenen Fronteinheit.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 4 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts."
  ],
  "effects": [
   {
    "code": "HEAL",
    "param": {
     "value": 4
    }
   }
  ],
  "flavor": "Vollständig wiederhergestellt.",
  "collector": "NP-CAL-30",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_caldris_schutzfeuer",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Schutzfeuer",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 2 Schaden zu. Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 2
    }
   },
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   }
  ],
  "flavor": "Weg von unseren Verwundeten.",
  "collector": "NP-CAL-31",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_caldris_ruhe_vor_dem_schlag",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Ruhe vor dem Schlag",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +2 ATK bis Zugende.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 2,
     "def": 0,
     "until": "turn"
    }
   }
  ],
  "flavor": "Ausgeruht zuschlagen.",
  "collector": "NP-CAL-32",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_caldris_genesene_zurueck_an_die_front",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Genesene zurück an die Front",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Ziehe 1 Karte.",
  "rules": [
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Die Klinik wird erweitert.",
  "collector": "NP-CAL-33",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_caldris_wall_aus_schilden",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Wall aus Schilden",
  "ap": 3,
  "rarity": "gold",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +3 DEF dauerhaft.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +3 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "def": 3,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Eine Mauer aus Schilden.",
  "collector": "NP-CAL-34",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_caldris_schutzschild_leicht",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Schutzschild leicht",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 DEF.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 1
    }
   }
  ],
  "flavor": "Leicht, aber schützend.",
  "collector": "NP-CAL-35",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_caldris_verbandspaeckchen",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Verbandspäckchen",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 3 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.",
  "rules": [
   "Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 3 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar."
  ],
  "effects": [
   {
    "code": "EQUIP_NEGATE_DAMAGE",
    "param": {
     "amount": 3,
     "once": true
    }
   }
  ],
  "flavor": "Erste Hilfe beim ersten Treffer.",
  "collector": "NP-CAL-36",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_caldris_schildplatte",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Schildplatte",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Schaden am Träger wird ignoriert.",
  "rules": [
   "Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.",
   "Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)"
  ],
  "effects": [
   {
    "code": "EQUIP_IGNORE_FIRST_DAMAGE",
    "param": {
     "untouchableFirst": true
    }
   }
  ],
  "flavor": "Der erste Schlag prallt ab.",
  "collector": "NP-CAL-37",
  "art_status": "platzhalter",
  "keywords": [
   "Erstschadenschutz"
  ]
 },
 {
  "id": "dc_np_caldris_ruheabzeichen",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Ruheabzeichen",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 ATK und +1 DEF. Wird der Träger zerstört, ziehst du 1 Karte.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +1 ATK und +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Wird der Träger zerstört, ziehst du 1 Karte."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 1,
     "only": "infanterie"
    }
   },
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   }
  ],
  "flavor": "Wer fällt, wird betrauert und ersetzt.",
  "collector": "NP-CAL-38",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_caldris_vollschutzweste",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Vollschutzweste",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +2 DEF.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 2,
     "only": "infanterie"
    }
   }
  ],
  "flavor": "Das Beste für die Infanterie.",
  "collector": "NP-CAL-39",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_caldris_genesungsbajonett",
  "set": "set_nation_pool",
  "nation": "Caldris",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Genesungsbajonett",
  "ap": 1,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Solange der Träger beschädigt ist: +2 ATK.",
  "rules": [
   "Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +2 ATK."
  ],
  "effects": [
   {
    "code": "EQUIP_COND_ATK",
    "param": {
     "atk": 2,
     "ifDamaged": true
    }
   }
  ],
  "flavor": "Verwundet kämpft man entschlossener.",
  "collector": "NP-CAL-40",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_theryn_vorderste_welle",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Vorderste Welle",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Sie gehen voran, damit andere folgen.",
  "collector": "NP-THE-01",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_theryn_nachfolgende_welle",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Nachfolgende Welle",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Wo die erste fiel, steht die zweite.",
  "collector": "NP-THE-02",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Gefechtsbereit"
  ]
 },
 {
  "id": "dc_np_theryn_dritte_welle",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Dritte Welle",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Die Welle endet nie.",
  "collector": "NP-THE-03",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 1,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_theryn_bannertraeger",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Bannerträger",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Benachbarte eigene Infanterie +1 DEF.",
  "rules": [
   "Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "MECH_AURA"
   }
  ],
  "flavor": "Wo das Banner steht, steht die Welle.",
  "collector": "NP-THE-04",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Heranführung"
  ]
 },
 {
  "id": "dc_np_theryn_eiferer",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Eiferer",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Angriffe gegen Infanterie: +2 Schaden.",
  "rules": [
   "Greift diese Einheit eine Infanterie an, verursacht sie 2 Schaden zusätzlich zu ihrem ATK. Der Gegenschlag des Ziels bleibt unverändert."
  ],
  "effects": [
   {
    "code": "VS_INF"
   }
  ],
  "flavor": "Glaube schärft die Klinge.",
  "collector": "NP-THE-05",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Gefechtsbereit"
  ]
 },
 {
  "id": "dc_np_theryn_geweihte_linie",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Geweihte Linie",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Schulter an Schulter im Glauben.",
  "collector": "NP-THE-06",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_theryn_pilgerwagen",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Pilgerwagen",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Trägt die Gläubigen zur Front.",
  "collector": "NP-THE-07",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_theryn_glaubenskette",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Glaubenskette",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Rollt im Gebet.",
  "collector": "NP-THE-08",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 2,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_theryn_sturmwagen",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Sturmwagen",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Für den einen Schlag.",
  "collector": "NP-THE-09",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 6,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_theryn_reliquienpanzer",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Reliquienpanzer",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Geweiht und gepanzert.",
  "collector": "NP-THE-10",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_theryn_der_wagen_des_rufes",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Der Wagen des Rufes",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "+2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.",
  "rules": [
   "Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FUEHRUNG_V"
   }
  ],
  "flavor": "Wer ihn hört, folgt.",
  "collector": "NP-THE-11",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 5,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Gefechtsbereit",
   "Abschirmung"
  ]
 },
 {
  "id": "dc_np_theryn_sammelfeuer",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Sammelfeuer",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Feuer deckt die Nachrücker.",
  "collector": "NP-THE-12",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_theryn_glockenbatterie",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Glockenbatterie",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Ruft zur Welle.",
  "collector": "NP-THE-13",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 1,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Nachsetzen"
  ]
 },
 {
  "id": "dc_np_theryn_wellenmoerser",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Wellenmörser",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-i",
   "artillerie"
  ],
  "text": "Steilfeuer I.",
  "rules": [
   "Steilfeuer I.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Einfach, massig, wirksam.",
  "collector": "NP-THE-14",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_theryn_vorbereitungsfeuer",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Vorbereitungsfeuer",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Bereitet den Sturm vor.",
  "collector": "NP-THE-15",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 4,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_theryn_ruf_ueber_das_feld",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Ruf über das Feld",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "steilfeuer-iv",
   "artillerie"
  ],
  "text": "Steilfeuer IV: ganze Front. Angriffe gegen ungepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Steilfeuer IV: ganze Front.",
   "Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [
   {
    "code": "ATTACK_ANY_FRONT"
   },
   {
    "code": "FEUERUEBERLEGENHEIT"
   }
  ],
  "flavor": "Der Ruf geht über das ganze Feld.",
  "collector": "NP-THE-16",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 4,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_theryn_pilgerkundschafter",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Pilgerkundschafter",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Wandert voran.",
  "collector": "NP-THE-17",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 3,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Gefechtsbereit"
  ]
 },
 {
  "id": "dc_np_theryn_glaubensmelder",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Glaubensmelder",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Meldet aus der Welle.",
  "collector": "NP-THE-18",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Gefechtsbereit"
  ]
 },
 {
  "id": "dc_np_theryn_seher_der_pflicht",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Seher der Pflicht",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.",
  "rules": [
   "Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie."
  ],
  "effects": [
   {
    "code": "HAND_PEEK",
    "param": {
     "n": 2
    }
   }
  ],
  "flavor": "Sieht, was Gott zeigt.",
  "collector": "NP-THE-19",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Gefechtsbereit"
  ]
 },
 {
  "id": "dc_np_theryn_sturmfuehrer",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Sturmführer",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Angriffe gegen Infanterie: +2 Schaden.",
  "rules": [
   "Greift diese Einheit eine Infanterie an, verursacht sie 2 Schaden zusätzlich zu ihrem ATK. Der Gegenschlag des Ziels bleibt unverändert."
  ],
  "effects": [
   {
    "code": "VS_INF"
   }
  ],
  "flavor": "Führt den einen Schlag.",
  "collector": "NP-THE-20",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Erbitterung"
  ]
 },
 {
  "id": "dc_np_theryn_hohe_priesterschaft",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Einheit",
  "name": "Hohe Priesterschaft",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Benachbarte eigene Infanterie +1 DEF.",
  "rules": [
   "Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "MECH_AURA"
   }
  ],
  "flavor": "Segnet die Welle.",
  "collector": "NP-THE-21",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 4,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_theryn_ruf_zum_aufgebot",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Ruf zum Aufgebot",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert. Jeder Schaden an deinen Fronteinheiten −1.",
  "rules": [
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
   "Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich."
  ],
  "effects": [
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   },
   {
    "code": "REDUCE_DAMAGE",
    "param": {
     "n": 1
    }
   }
  ],
  "flavor": "Immer neue Gläubige.",
  "collector": "NP-THE-22",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_theryn_banner_der_pflicht",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Banner der Pflicht",
  "ap": 5,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Deine Fronteinheiten +1 ATK. Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.",
  "rules": [
   "Solange diese Unterstützung liegt, haben alle deine Fronteinheiten +1 ATK.",
   "Beim Ausspielen wählst du einen eigenen Frontabschnitt. Solange diese Unterstützung liegt, haben deine Einheiten in diesem Abschnitt +1 DEF."
  ],
  "effects": [
   {
    "code": "AURA_FRONT_ATK",
    "param": {
     "atk": 1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "aura",
     "scope": "section",
     "atk": 0,
     "def": 1
    }
   }
  ],
  "flavor": "Unter dem Banner wird gekämpft.",
  "collector": "NP-THE-23",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_theryn_glaubensaufgebot",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Glaubensaufgebot",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Deine Fronteinheiten +1 ATK. Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
  "rules": [
   "Solange diese Unterstützung liegt, haben alle deine Fronteinheiten +1 ATK.",
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert."
  ],
  "effects": [
   {
    "code": "AURA_FRONT_ATK",
    "param": {
     "atk": 1
    }
   },
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   }
  ],
  "flavor": "Die Welle endet nie.",
  "collector": "NP-THE-24",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_theryn_alle_sind_gerufen",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Alle sind gerufen",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Füge einer gegnerischen Fronteinheit 1 Schaden zu.",
  "rules": [
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 1 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   },
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Jeder ist gerufen.",
  "collector": "NP-THE-25",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_theryn_sturm_der_glaeubigen",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Sturm der Gläubigen",
  "ap": 1,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: deine Infanterie dort +1 ATK bis Zugende.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Infanterie-Einheit dort hat bis zum Ende dieses Zuges +1 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung)."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "atk": 1,
     "filter": "infanterie",
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Jetzt alle.",
  "collector": "NP-THE-26",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_theryn_luecke_fuellen",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Lücke füllen",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 2 Karten.",
  "rules": [
   "Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 2
    }
   }
  ],
  "flavor": "Wo einer fällt, kommt der nächste.",
  "collector": "NP-THE-27",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_theryn_gebet_vor_der_schlacht",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Gebet vor der Schlacht",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF dauerhaft. Heile 1 DEF an einer eigenen Fronteinheit.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 ATK bis zum Ende dieses Zuges. Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF.",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 1 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 1,
     "def": 1,
     "until": "turn"
    }
   },
   {
    "code": "HEAL",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Gestärkt im Glauben.",
  "collector": "NP-THE-28",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_theryn_maertyrersegen",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Märtyrersegen",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Heile 1 DEF an einer eigenen Fronteinheit. Eine eigene Fronteinheit: +1 ATK bis Zugende.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 1 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 ATK bis zum Ende dieses Zuges."
  ],
  "effects": [
   {
    "code": "HEAL",
    "param": {
     "value": 1
    }
   },
   {
    "code": "BUFF",
    "param": {
     "atk": 1,
     "def": 0,
     "until": "turn"
    }
   }
  ],
  "flavor": "Die Wunden sind heilig.",
  "collector": "NP-THE-29",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_theryn_welle_binden",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Welle binden",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: deine Infanterie dort +2 DEF dauerhaft.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Infanterie-Einheit, die jetzt dort steht, erhält +2 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "def": 2,
     "filter": "infanterie",
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Die Welle hält.",
  "collector": "NP-THE-30",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_theryn_eifer",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Eifer",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +2 ATK bis Zugende, +1 DEF dauerhaft. Danach erleidet sie 1 Schaden.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges. Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF.",
   "Preis: Dieselbe eigene Einheit erleidet danach 1 Schaden. Sinkt ihre DEF auf 0, wird sie zerstört."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 2,
     "def": 1,
     "until": "turn"
    }
   },
   {
    "code": "SELF_DAMAGE",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Der Eifer verzehrt.",
  "collector": "NP-THE-31",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_theryn_pflichtruf",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Pflichtruf",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Deine nächste Einheit oder Unterstützung kostet 2 AP weniger (mind. 1).",
  "rules": [
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 2 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 2
    }
   }
  ],
  "flavor": "Niemand bleibt zu Hause.",
  "collector": "NP-THE-32",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_theryn_der_eine_schlag",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Der eine Schlag",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 4 Schaden zu.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 4 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 4
    }
   }
  ],
  "flavor": "Gott führt die Hand.",
  "collector": "NP-THE-33",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_theryn_heilige_woge",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Heilige Woge",
  "ap": 3,
  "rarity": "gold",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: deine Infanterie dort +3 ATK bis Zugende.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Infanterie-Einheit dort hat bis zum Ende dieses Zuges +3 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung)."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "atk": 3,
     "filter": "infanterie",
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Die ganze Welle bricht herein.",
  "collector": "NP-THE-34",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_theryn_pilgerschild",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Pilgerschild",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 DEF. Wird der Träger zerstört, ziehst du 1 Karte.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Wird der Träger zerstört, ziehst du 1 Karte."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 1,
     "only": "infanterie"
    }
   },
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   }
  ],
  "flavor": "Gesegnet vom Abt.",
  "collector": "NP-THE-35",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_theryn_glaubenszeichen",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Glaubenszeichen",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Wird der Träger zerstört, ziehst du 1 Karte. Angriffe des Trägers: +1 Schaden.",
  "rules": [
   "Wird der Träger zerstört, ziehst du 1 Karte.",
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert."
  ],
  "effects": [
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   },
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   }
  ],
  "flavor": "Wer fällt, ruft den Nächsten.",
  "collector": "NP-THE-36",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_theryn_bannerstange",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Bannerstange",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +2 ATK und +1 DEF.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 ATK und +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 2,
     "def": 1
    }
   }
  ],
  "flavor": "Banner und Waffe zugleich.",
  "collector": "NP-THE-37",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_theryn_reliquie",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Reliquie",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Schaden am Träger wird ignoriert. Wird der Träger zerstört, ziehst du 2 Karten.",
  "rules": [
   "Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.",
   "Wird der Träger zerstört, ziehst du 2 Karten.",
   "Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)"
  ],
  "effects": [
   {
    "code": "EQUIP_IGNORE_FIRST_DAMAGE",
    "param": {
     "untouchableFirst": true
    }
   },
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 2
    }
   }
  ],
  "flavor": "Ein Wunder rettet.",
  "collector": "NP-THE-38",
  "art_status": "platzhalter",
  "keywords": [
   "Erstschadenschutz"
  ]
 },
 {
  "id": "dc_np_theryn_eiferklinge",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Eiferklinge",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Angriffe des Trägers: +1 Schaden. Träger +1 ATK und +1 DEF.",
  "rules": [
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.",
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +1 ATK und +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   },
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 1,
     "only": "infanterie"
    }
   }
  ],
  "flavor": "Geschärft im Gebet.",
  "collector": "NP-THE-39",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_theryn_gebetsband",
  "set": "set_nation_pool",
  "nation": "Theryn",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Gebetsband",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Solange der Träger beschädigt ist: +2 ATK. Angriffe des Trägers: +1 Schaden.",
  "rules": [
   "Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +2 ATK.",
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert."
  ],
  "effects": [
   {
    "code": "EQUIP_COND_ATK",
    "param": {
     "atk": 2,
     "ifDamaged": true
    }
   },
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   }
  ],
  "flavor": "Im Schmerz näher am Glauben.",
  "collector": "NP-THE-40",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vael_werkschutzzug",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Werkschutzzug",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Schützt die Fabrik und das Feuer.",
  "collector": "NP-VAE-01",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 3,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_vael_lieferkompanie",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Lieferkompanie",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Bringt, was verbraucht wird.",
  "collector": "NP-VAE-02",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 1,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_vael_bodenhalter",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Bodenhalter",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Benachbarte eigene Infanterie +1 DEF.",
  "rules": [
   "Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "MECH_AURA"
   }
  ],
  "flavor": "Hält den Boden unter dem Feuer.",
  "collector": "NP-VAE-03",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 1,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_vael_vertragssoldaten",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Vertragssoldaten",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Angriffe gegen ungepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "FEUERUEBERLEGENHEIT"
   }
  ],
  "flavor": "Bezahlt pro Treffer.",
  "collector": "NP-VAE-04",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Heranführung"
  ]
 },
 {
  "id": "dc_np_vael_reparaturtrupp",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Reparaturtrupp",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Repariert Rohre im Feuer.",
  "collector": "NP-VAE-05",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 4,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_vael_aktionaersgarde",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Aktionärsgarde",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Schützt die Investition.",
  "collector": "NP-VAE-06",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 5,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_vael_fabrikpanzer_serie_neun",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Fabrikpanzer Serie Neun",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Vom Band an die Front.",
  "collector": "NP-VAE-07",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 2,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Zähigkeit"
  ]
 },
 {
  "id": "dc_np_vael_materialkeil",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Materialkeil",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Mehr Stahl als Strategie.",
  "collector": "NP-VAE-08",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Durchschlag"
  ]
 },
 {
  "id": "dc_np_vael_nachlieferungswagen",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Nachlieferungswagen",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "+2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.",
  "rules": [
   "Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FUEHRUNG_V"
   }
  ],
  "flavor": "Bringt Ersatz an die Front.",
  "collector": "NP-VAE-09",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Durchschlag"
  ]
 },
 {
  "id": "dc_np_vael_industriekette",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Industriekette",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Angriffe gegen gepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 1 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "IGNORE_DEF",
    "param": {
     "ignore_def": 1
    }
   }
  ],
  "flavor": "Gebaut, um Panzer zu brechen.",
  "collector": "NP-VAE-10",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_vael_kriegsaktie_panzer",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Kriegsaktie Panzer",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Der Kurs steigt mit jedem Treffer.",
  "collector": "NP-VAE-11",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Durchschlag",
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_vael_walzenbatterie",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Walzenbatterie",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Flächig, anhaltend, teuer.",
  "collector": "NP-VAE-12",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Durchschlag"
  ]
 },
 {
  "id": "dc_np_vael_industrierohr",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Industrierohr",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Hauptsache, es knallt.",
  "collector": "NP-VAE-13",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Nachsetzen"
  ]
 },
 {
  "id": "dc_np_vael_volltreffer_haubitze",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Volltreffer-Haubitze",
  "ap": 4,
  "rarity": "gold",
  "tags": [
   "einheit",
   "steilfeuer-v",
   "artillerie"
  ],
  "text": "Steilfeuer V: Front + Support (+2 AP).",
  "rules": [
   "Steilfeuer V: Front + Support (+2 AP).",
   "Die Einheit zählt für alle Regeln als Artillerie.",
   "Supportzone-Angriff 3 AP; Front 1 AP."
  ],
  "effects": [
   {
    "code": "ATTACK_ANY_FRONT"
   },
   {
    "code": "ATTACK_SUPPORT"
   }
  ],
  "flavor": "Jeder Schuss ein Abschluss.",
  "collector": "NP-VAE-14",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 4,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung",
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_vael_munitionsmoerser",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Munitionsmörser",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-i",
   "artillerie"
  ],
  "text": "Steilfeuer I.",
  "rules": [
   "Steilfeuer I.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Billig in der Herstellung.",
  "collector": "NP-VAE-15",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Fernschuss"
  ]
 },
 {
  "id": "dc_np_vael_feuerwalzen_rohr",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Feuerwalzen-Rohr",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II. Angriffe gegen ungepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Steilfeuer II.",
   "Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [
   {
    "code": "FEUERUEBERLEGENHEIT"
   }
  ],
  "flavor": "Die Walze rollt.",
  "collector": "NP-VAE-16",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_vael_zielerfasser",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Zielerfasser",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Findet Ziele für die Walze.",
  "collector": "NP-VAE-17",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Heranführung"
  ]
 },
 {
  "id": "dc_np_vael_verbrauchspruefer",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Verbrauchsprüfer",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Misst, was verbraucht wird.",
  "collector": "NP-VAE-18",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 3,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_vael_wirtschaftsspaeher",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Wirtschaftsspäher",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.",
  "rules": [
   "Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie."
  ],
  "effects": [
   {
    "code": "HAND_PEEK",
    "param": {
     "n": 2
    }
   }
  ],
  "flavor": "Sieht die Bilanz des Gegners.",
  "collector": "NP-VAE-19",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_vael_konzernfaust",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Konzernfaust",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Angriffe gegen ungepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "FEUERUEBERLEGENHEIT"
   }
  ],
  "flavor": "Wenn die Fabrik zuschlägt.",
  "collector": "NP-VAE-20",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 5,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Erbitterung"
  ]
 },
 {
  "id": "dc_np_vael_konzernstab",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Einheit",
  "name": "Konzernstab",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "+2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.",
  "rules": [
   "Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FUEHRUNG_V"
   }
  ],
  "flavor": "Plant in Quartalen.",
  "collector": "NP-VAE-21",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 4,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_vael_ruestungswerk",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Rüstungswerk",
  "ap": 5,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn deines Zuges: +1 AP. Jeder Schaden an deinen Fronteinheiten −1.",
  "rules": [
   "Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt.",
   "Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich."
  ],
  "effects": [
   {
    "code": "TURN_AP",
    "param": {
     "ap": 1
    }
   },
   {
    "code": "REDUCE_DAMAGE",
    "param": {
     "n": 1
    }
   }
  ],
  "flavor": "Läuft rund um die Uhr.",
  "collector": "NP-VAE-22",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vael_munitionslager",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Munitionslager",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Deine Fronteinheiten +1 ATK.",
  "rules": [
   "Solange diese Unterstützung liegt, haben alle deine Fronteinheiten +1 ATK."
  ],
  "effects": [
   {
    "code": "AURA_FRONT_ATK",
    "param": {
     "atk": 1
    }
   }
  ],
  "flavor": "Genug für jede Walze.",
  "collector": "NP-VAE-23",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vael_kriegsboerse",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Kriegsbörse",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn deines Zuges: +1 AP. Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
  "rules": [
   "Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt.",
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert."
  ],
  "effects": [
   {
    "code": "TURN_AP",
    "param": {
     "ap": 1
    }
   },
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   }
  ],
  "flavor": "Der Krieg ist ein Geschäft.",
  "collector": "NP-VAE-24",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vael_ersatz_ab_lager",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Ersatz ab Lager",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 DEF dauerhaft.",
  "rules": [
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.",
   "Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +1 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts."
  ],
  "effects": [
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   },
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "def": 1,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Neues Material, alte Front.",
  "collector": "NP-VAE-25",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vael_rollende_walze",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Rollende Walze",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: deine Artillerie dort +2 ATK bis Zugende.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Artillerie-Einheit dort hat bis zum Ende dieses Zuges +2 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung)."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "atk": 2,
     "filter": "artillerie",
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Alle Rohre zugleich.",
  "collector": "NP-VAE-26",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vael_lieferschein_eingetroffen",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Lieferschein eingetroffen",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 2 Karten. Eine eigene Fronteinheit: +1 ATK bis Zugende.",
  "rules": [
   "Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 ATK bis zum Ende dieses Zuges."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 2
    }
   },
   {
    "code": "BUFF",
    "param": {
     "atk": 1,
     "def": 0,
     "until": "turn"
    }
   }
  ],
  "flavor": "Lieferung eingetroffen.",
  "collector": "NP-VAE-27",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vael_bezahlter_treffer",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Bezahlter Treffer",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 3 Schaden zu.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 3 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 3
    }
   }
  ],
  "flavor": "Bezahlt und geliefert.",
  "collector": "NP-VAE-28",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vael_munitionsschub",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Munitionsschub",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +2 ATK bis Zugende.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 2,
     "def": 0,
     "until": "turn"
    }
   }
  ],
  "flavor": "Doppelte Ladung.",
  "collector": "NP-VAE-29",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vael_reparatur_im_feld",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Reparatur im Feld",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Heile 1 DEF an einer eigenen Fronteinheit. Eine eigene Fronteinheit: +1 DEF dauerhaft.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 1 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF."
  ],
  "effects": [
   {
    "code": "HEAL",
    "param": {
     "value": 1
    }
   },
   {
    "code": "BUFF",
    "param": {
     "atk": 0,
     "def": 1,
     "until": "turn"
    }
   }
  ],
  "flavor": "Geschweißt und weiter.",
  "collector": "NP-VAE-30",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vael_auftragsbuch",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Auftragsbuch",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 2, dann wirf deine älteste Handkarte ab. Heile 1 DEF an einer eigenen Fronteinheit.",
  "rules": [
   "Ziehe 2 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 1 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts."
  ],
  "effects": [
   {
    "code": "DRAW_DISCARD",
    "param": {
     "draw": 2,
     "discard": 1
    }
   },
   {
    "code": "HEAL",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Verluste sind Aufträge.",
  "collector": "NP-VAE-31",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vael_grosslieferung",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Großlieferung",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Deine nächste Einheit oder Unterstützung kostet 3 AP weniger (mind. 1).",
  "rules": [
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 3 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 3
    }
   }
  ],
  "flavor": "Ein ganzer Zug Material.",
  "collector": "NP-VAE-32",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vael_splitterhagel",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Splitterhagel",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 2 Schaden zu. Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 2
    }
   },
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   }
  ],
  "flavor": "Billig und wirksam.",
  "collector": "NP-VAE-33",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vael_industrielle_walze",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Industrielle Walze",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 5 Schaden zu. Ziehe 1 Karte.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 5 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 5
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Die Fabrik schießt mit.",
  "collector": "NP-VAE-34",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vael_werkspanzerung",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Werkspanzerung",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 DEF. Angriffe des Trägers: +1 Schaden.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Panzer). Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 1,
     "only": "panzer"
    }
   },
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   }
  ],
  "flavor": "Ab Werk verstärkt.",
  "collector": "NP-VAE-35",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vael_schwere_munition",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Schwere Munition",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Angriffe des Trägers: +1 Schaden. Träger +2 DEF.",
  "rules": [
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.",
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   },
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 2,
     "only": "infanterie"
    }
   }
  ],
  "flavor": "Mehr Sprengstoff pro Granate.",
  "collector": "NP-VAE-36",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vael_ersatzrohr",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Ersatzrohr",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Wird der Träger zerstört, ziehst du 2 Karten. Träger +1 DEF.",
  "rules": [
   "Wird der Träger zerstört, ziehst du 2 Karten.",
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 2
    }
   },
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 1
    }
   }
  ],
  "flavor": "Kaputt? Nachbestellen.",
  "collector": "NP-VAE-37",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vael_feuerleitcomputer",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Feuerleitcomputer",
  "ap": 1,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Angriff des Trägers: +1 ATK. Wird der Träger zerstört, ziehst du 1 Karte.",
  "rules": [
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +1 ATK. Danach entfällt der Bonus.",
   "Wird der Träger zerstört, ziehst du 1 Karte."
  ],
  "effects": [
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 1
    }
   },
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   }
  ],
  "flavor": "Ab Werk kalibriert.",
  "collector": "NP-VAE-38",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_vael_reaktivpanzer",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Reaktivpanzer",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Schaden am Träger wird ignoriert. Träger +1 ATK und +1 DEF.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +1 ATK und +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.",
   "Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)"
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 1,
     "only": "infanterie"
    }
   },
   {
    "code": "EQUIP_IGNORE_FIRST_DAMAGE",
    "param": {
     "untouchableFirst": true
    }
   }
  ],
  "flavor": "Explodiert nach außen.",
  "collector": "NP-VAE-39",
  "art_status": "platzhalter",
  "keywords": [
   "Erstschadenschutz"
  ]
 },
 {
  "id": "dc_np_vael_vertragsgewehr",
  "set": "set_nation_pool",
  "nation": "Vael",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Vertragsgewehr",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 DEF. Erster Angriff des Trägers: +1 ATK.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +1 ATK. Danach entfällt der Bonus."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 1
    }
   },
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 1
    }
   }
  ],
  "flavor": "Bezahlt wird nach Leistung.",
  "collector": "NP-VAE-40",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_merovan_garnison_weg_sieben",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Garnison Weg Sieben",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Hält den Posten, auch ohne Ader.",
  "collector": "NP-MER-01",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Sicherung"
  ]
 },
 {
  "id": "dc_np_merovan_kolonnenschuetzen",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Kolonnenschützen",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Unterwegs und bereit.",
  "collector": "NP-MER-02",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Heranführung"
  ]
 },
 {
  "id": "dc_np_merovan_wegposten",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Wegposten",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Wer den Weg hält, hält das Land.",
  "collector": "NP-MER-03",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Heranführung"
  ]
 },
 {
  "id": "dc_np_merovan_keilhaltzug",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Keilhaltzug",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Nach dem Schub kommt der Halt.",
  "collector": "NP-MER-04",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Heranführung"
  ]
 },
 {
  "id": "dc_np_merovan_verlegungskompanie",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Verlegungskompanie",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Heute hier, morgen dort.",
  "collector": "NP-MER-05",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Hinterhalt",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_merovan_ausharrende",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Ausharrende",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Sie bleiben, bis der Weg frei ist.",
  "collector": "NP-MER-06",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Heranführung"
  ]
 },
 {
  "id": "dc_np_merovan_achsenkolonne",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Achsenkolonne",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Fährt die Achse ab.",
  "collector": "NP-MER-07",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_merovan_wegsperrwagen",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Wegsperrwagen",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Sperrt den Weg für den Feind.",
  "collector": "NP-MER-08",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 2,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_merovan_haltepanzer",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Haltepanzer",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Bleibt stehen, wo andere weichen.",
  "collector": "NP-MER-09",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 1,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_merovan_achsenkeil",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Achsenkeil",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Schiebt sich entlang der Achse.",
  "collector": "NP-MER-10",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 5,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_merovan_freigehaltene_achse",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Freigehaltene Achse",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "+2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.",
  "rules": [
   "Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FUEHRUNG_V"
   }
  ],
  "flavor": "Der Weg bleibt offen.",
  "collector": "NP-MER-11",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 5,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_merovan_wegbatterie",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Wegbatterie",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Sichert den Halt nach der Verlegung.",
  "collector": "NP-MER-12",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 4,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_merovan_postenmoerser",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Postenmörser",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-i",
   "artillerie"
  ],
  "text": "Steilfeuer I.",
  "rules": [
   "Steilfeuer I.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Für jeden Posten ein Rohr.",
  "collector": "NP-MER-13",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 1,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_merovan_achsenfeuer",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Achsenfeuer",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Feuer entlang der Straße.",
  "collector": "NP-MER-14",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_merovan_haltefeuer",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Haltefeuer",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Hält den Gegner auf Abstand.",
  "collector": "NP-MER-15",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_merovan_stellung_am_wegende",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Stellung am Wegende",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "steilfeuer-iv",
   "artillerie"
  ],
  "text": "Steilfeuer IV: ganze Front.",
  "rules": [
   "Steilfeuer IV: ganze Front.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [
   {
    "code": "ATTACK_ANY_FRONT"
   }
  ],
  "flavor": "Wenn der Weg zu ist, schießt sie weiter.",
  "collector": "NP-MER-16",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_merovan_wegkundschafter",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Wegkundschafter",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Kennt jeden Pfad.",
  "collector": "NP-MER-17",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 1,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Heranführung"
  ]
 },
 {
  "id": "dc_np_merovan_etappenmelder",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Etappenmelder",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Meldet von Posten zu Posten.",
  "collector": "NP-MER-18",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 1,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_merovan_achsenbeobachter",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Achsenbeobachter",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.",
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   },
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Wer die Achse sieht, sieht den Krieg.",
  "collector": "NP-MER-19",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Platztausch",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_merovan_wegpunktkommando",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Wegpunktkommando",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Ein Punkt, der nicht fällt.",
  "collector": "NP-MER-20",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 3,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Abschirmung",
   "Durchschlag"
  ]
 },
 {
  "id": "dc_np_merovan_garnisonsaelteste",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Einheit",
  "name": "Garnisonsälteste",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Benachbarte eigene Infanterie +1 DEF.",
  "rules": [
   "Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "MECH_AURA"
   }
  ],
  "flavor": "Hat schon drei Kriege ausgesessen.",
  "collector": "NP-MER-21",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 4,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_merovan_lebensader_merovan",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Lebensader Merovan",
  "ap": 4,
  "rarity": "gold",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn deines Zuges: +1 AP.",
  "rules": [
   "Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt."
  ],
  "effects": [
   {
    "code": "TURN_AP",
    "param": {
     "ap": 1
    }
   }
  ],
  "flavor": "Solange sie fließt, hält alles.",
  "collector": "NP-MER-22",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_merovan_wegdepot",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Wegdepot",
  "ap": 5,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Jeder Schaden an deinen Fronteinheiten −1. Zu Beginn deines Zuges: +1 AP.",
  "rules": [
   "Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.",
   "Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt."
  ],
  "effects": [
   {
    "code": "REDUCE_DAMAGE",
    "param": {
     "n": 1
    }
   },
   {
    "code": "TURN_AP",
    "param": {
     "ap": 1
    }
   }
  ],
  "flavor": "Sandsäcke an jeder Station.",
  "collector": "NP-MER-23",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_merovan_postenkette",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Postenkette",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Gegnerische Fronteinheiten −1 ATK. Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.",
  "rules": [
   "Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).",
   "Beim Ausspielen wählst du einen eigenen Frontabschnitt. Solange diese Unterstützung liegt, haben deine Einheiten in diesem Abschnitt +1 ATK."
  ],
  "effects": [
   {
    "code": "AURA_ENEMY_ATK",
    "param": {
     "atk": -1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "aura",
     "scope": "section",
     "atk": 1,
     "def": 0
    }
   }
  ],
  "flavor": "Ein Posten stützt den nächsten.",
  "collector": "NP-MER-24",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_merovan_umgruppieren",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Umgruppieren",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF dauerhaft. Ziehe 1 Karte.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 ATK bis zum Ende dieses Zuges. Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 1,
     "def": 1,
     "until": "turn"
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Angekommen und eingerichtet.",
  "collector": "NP-MER-25",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_merovan_keilhalt",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Keilhalt",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +2 DEF dauerhaft. Ziehe 1 Karte.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +2 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "def": 2,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Der Schub wird zum Halt.",
  "collector": "NP-MER-26",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_merovan_posten_halten",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Posten halten",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +3 DEF dauerhaft.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +3 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 0,
     "def": 3,
     "until": "turn"
    }
   }
  ],
  "flavor": "Bleiben ist Kämpfen.",
  "collector": "NP-MER-27",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_merovan_ader_offen_halten",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Ader offen halten",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 2 Karten.",
  "rules": [
   "Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 2
    }
   }
  ],
  "flavor": "Der Nachschub kommt durch.",
  "collector": "NP-MER-28",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_merovan_wegsperre",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Wegsperre",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 1 Schaden zu. Ziehe 1 Karte.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 1 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 1
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Hier kommt niemand durch.",
  "collector": "NP-MER-29",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_merovan_garnison_versorgen",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Garnison versorgen",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Heile 2 DEF an einer eigenen Fronteinheit. Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.",
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "HEAL",
    "param": {
     "value": 2
    }
   },
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   }
  ],
  "flavor": "Auch ferne Posten werden versorgt.",
  "collector": "NP-MER-30",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_merovan_schieben",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Schieben",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +2 ATK bis Zugende.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Einheit dort hat bis zum Ende dieses Zuges +2 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung)."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "atk": 2,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Der ganze Abschnitt drückt.",
  "collector": "NP-MER-31",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_merovan_wegpunkt_melden",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Wegpunkt melden",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 1 Karte. Füge einer gegnerischen Fronteinheit 1 Schaden zu.",
  "rules": [
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 1 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   },
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Position bestätigt.",
  "collector": "NP-MER-32",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_merovan_kolonne_nachziehen",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Kolonne nachziehen",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Heile 1 DEF an einer eigenen Fronteinheit.",
  "rules": [
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 1 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts."
  ],
  "effects": [
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   },
   {
    "code": "HEAL",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Die nächste Kolonne ist unterwegs.",
  "collector": "NP-MER-33",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_merovan_halt_um_jeden_preis",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Halt um jeden Preis",
  "ap": 4,
  "rarity": "gold",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +4 DEF dauerhaft.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +4 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "def": 4,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Hier endet der Weg des Feindes.",
  "collector": "NP-MER-34",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_merovan_postenhelm",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Postenhelm",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +2 DEF. Solange der Träger beschädigt ist: +1 ATK.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +1 ATK."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 2
    }
   },
   {
    "code": "EQUIP_COND_ATK",
    "param": {
     "atk": 1,
     "ifDamaged": true
    }
   }
  ],
  "flavor": "Für lange Wachen.",
  "collector": "NP-MER-35",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_merovan_marschgepaeck",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Marschgepäck",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +2 DEF. Wird der Träger zerstört, ziehst du 1 Karte.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Wird der Träger zerstört, ziehst du 1 Karte."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 2
    }
   },
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   }
  ],
  "flavor": "Alles dabei, was man braucht.",
  "collector": "NP-MER-36",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_merovan_haltespaten",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Haltespaten",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Schaden am Träger wird ignoriert. Angriffe des Trägers: +1 Schaden.",
  "rules": [
   "Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.",
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.",
   "Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)"
  ],
  "effects": [
   {
    "code": "EQUIP_IGNORE_FIRST_DAMAGE",
    "param": {
     "untouchableFirst": true
    }
   },
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   }
  ],
  "flavor": "Eingegraben vor dem ersten Schuss.",
  "collector": "NP-MER-37",
  "art_status": "platzhalter",
  "keywords": [
   "Erstschadenschutz"
  ]
 },
 {
  "id": "dc_np_merovan_wegkarte",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Wegkarte",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Angriff des Trägers: +2 ATK. Wird der Träger zerstört, ziehst du 1 Karte.",
  "rules": [
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +2 ATK. Danach entfällt der Bonus.",
   "Wird der Träger zerstört, ziehst du 1 Karte."
  ],
  "effects": [
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 2
    }
   },
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   }
  ],
  "flavor": "Der erste Schlag aus bekanntem Gelände.",
  "collector": "NP-MER-38",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_merovan_garnisonsgewehr",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Garnisonsgewehr",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 ATK. Wird der Träger zerstört, ziehst du 1 Karte.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Wird der Träger zerstört, ziehst du 1 Karte."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 0,
     "only": "infanterie"
    }
   },
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   }
  ],
  "flavor": "Gepflegt in langen Wachen.",
  "collector": "NP-MER-39",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_merovan_kolonnenpanzerung",
  "set": "set_nation_pool",
  "nation": "Merovan",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Kolonnenpanzerung",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 ATK und +1 DEF. Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 1 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Panzer). Solange sie angelegt ist, hat der Träger +1 ATK und +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 1 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 1,
     "only": "panzer"
    }
   },
   {
    "code": "EQUIP_NEGATE_DAMAGE",
    "param": {
     "amount": 1,
     "once": true
    }
   }
  ],
  "flavor": "Für die lange Achse.",
  "collector": "NP-MER-40",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_lyr_waechter_am_grat",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Wächter am Grat",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.",
  "rules": [
   "Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.",
   "Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden."
  ],
  "effects": [
   {
    "code": "AMBUSH"
   }
  ],
  "flavor": "Der Pass gehört dem Tal.",
  "collector": "NP-LYR-01",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Zähigkeit"
  ]
 },
 {
  "id": "dc_np_lyr_passhueter",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Passhüter",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Kein Fremder kommt durch.",
  "collector": "NP-LYR-02",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Gefechtsbereit"
  ]
 },
 {
  "id": "dc_np_lyr_eidgenossen",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Eidgenossen",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Ein Tal hilft dem anderen.",
  "collector": "NP-LYR-03",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Nachsetzen"
  ]
 },
 {
  "id": "dc_np_lyr_lauernde_schuetzen",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Lauernde Schützen",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.",
  "rules": [
   "Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.",
   "Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden."
  ],
  "effects": [
   {
    "code": "AMBUSH"
   }
  ],
  "flavor": "Warten, bis der Feind die Enge betritt.",
  "collector": "NP-LYR-04",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 3,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Überlast"
  ]
 },
 {
  "id": "dc_np_lyr_steinwerfer",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Steinwerfer",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Der Berg kämpft mit.",
  "collector": "NP-LYR-05",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 3,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Nachsetzen"
  ]
 },
 {
  "id": "dc_np_lyr_verteilte_posten",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Verteilte Posten",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Kein Zentrum, keine Schwäche.",
  "collector": "NP-LYR-06",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Hinterhalt",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_lyr_bergkette",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Bergkette",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Langsam, aber durch jedes Tal.",
  "collector": "NP-LYR-07",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_lyr_engpasswagen",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Engpasswagen",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.",
  "rules": [
   "Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.",
   "Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden."
  ],
  "effects": [
   {
    "code": "AMBUSH"
   }
  ],
  "flavor": "Blockiert den Pass.",
  "collector": "NP-LYR-08",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_lyr_talpanzer",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Talpanzer",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Versteckt sich hinter jedem Fels.",
  "collector": "NP-LYR-09",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Hinterhalt",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_lyr_felskeil",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Felskeil",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Wie ein Felssturz.",
  "collector": "NP-LYR-10",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Zähigkeit"
  ]
 },
 {
  "id": "dc_np_lyr_pass_ohne_wiederkehr",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Pass ohne Wiederkehr",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.",
  "rules": [
   "Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.",
   "Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden."
  ],
  "effects": [
   {
    "code": "AMBUSH"
   }
  ],
  "flavor": "Hier endet jeder Vormarsch.",
  "collector": "NP-LYR-11",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Zähigkeit"
  ]
 },
 {
  "id": "dc_np_lyr_warnfeuerstellung",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Warnfeuerstellung",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Ein Schuss als Warnung.",
  "collector": "NP-LYR-12",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 2,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_lyr_bergmoerser",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Bergmörser",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-i",
   "artillerie"
  ],
  "text": "Steilfeuer I.",
  "rules": [
   "Steilfeuer I.",
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Schießt und verschwindet im Fels.",
  "collector": "NP-LYR-13",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 1,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Hinterhalt",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_lyr_talbatterie",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Talbatterie",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Feuer aus dem Tal.",
  "collector": "NP-LYR-14",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 4,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_lyr_passfeuer",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Passfeuer",
  "ap": 5,
  "rarity": "silver",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Kurzes Feuer aus der Lauer.",
  "collector": "NP-LYR-15",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 4,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Hinterhalt",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_lyr_echo_der_taeler",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Echo der Täler",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Alle Täler antworten.",
  "collector": "NP-LYR-16",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 4,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Durchschlag",
   "Nachsetzen"
  ]
 },
 {
  "id": "dc_np_lyr_gamsjaeger",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Gamsjäger",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Kennt jeden Grat.",
  "collector": "NP-LYR-17",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_lyr_zugangswaechter",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Zugangswächter",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Sensorik an jedem Zugang.",
  "collector": "NP-LYR-18",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_lyr_talrufer",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Talrufer",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.",
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   },
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Ruft und verschwindet.",
  "collector": "NP-LYR-19",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 5,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Hinterhalt",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_lyr_passwache_aeltester",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Passwache Ältester",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF. Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).",
   "Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.",
   "Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   },
   {
    "code": "AMBUSH"
   }
  ],
  "flavor": "Hat jeden Pass schon einmal gehalten.",
  "collector": "NP-LYR-20",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 4,
  "def": 6,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_lyr_eidtraeger",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Einheit",
  "name": "Eidträger",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "",
  "rules": [
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Der Eid ist sein Versteck.",
  "collector": "NP-LYR-21",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 5,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Überlast",
   "Abschirmung",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_lyr_talbund",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Talbund",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Gegnerische Fronteinheiten −1 ATK. Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.",
  "rules": [
   "Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).",
   "Beim Ausspielen wählst du einen eigenen Frontabschnitt. Solange diese Unterstützung liegt, haben deine Einheiten in diesem Abschnitt +1 DEF."
  ],
  "effects": [
   {
    "code": "AURA_ENEMY_ATK",
    "param": {
     "atk": -1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "aura",
     "scope": "section",
     "atk": 0,
     "def": 1
    }
   }
  ],
  "flavor": "Jedes Tal schwächt den Feind.",
  "collector": "NP-LYR-22",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_lyr_engen_und_paesse",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Engen und Pässe",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Jeder Schaden an deinen Fronteinheiten −1. Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.",
  "rules": [
   "Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.",
   "Beim Ausspielen wählst du einen eigenen Frontabschnitt. Solange diese Unterstützung liegt, haben deine Einheiten in diesem Abschnitt +1 ATK."
  ],
  "effects": [
   {
    "code": "REDUCE_DAMAGE",
    "param": {
     "n": 1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "aura",
     "scope": "section",
     "atk": 1,
     "def": 0
    }
   }
  ],
  "flavor": "Das Gelände schützt.",
  "collector": "NP-LYR-23",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_lyr_der_eid_der_taeler",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Der Eid der Täler",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Gegnerische Fronteinheiten −1 ATK. Jeder Schaden an deinen Fronteinheiten −1.",
  "rules": [
   "Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).",
   "Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich."
  ],
  "effects": [
   {
    "code": "AURA_ENEMY_ATK",
    "param": {
     "atk": -1
    }
   },
   {
    "code": "REDUCE_DAMAGE",
    "param": {
     "n": 1
    }
   }
  ],
  "flavor": "Kein Sitz, aber ein Eid.",
  "collector": "NP-LYR-24",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_lyr_aus_der_deckung",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Aus der Deckung",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +2 ATK bis Zugende. Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges.",
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 2,
     "def": 0,
     "until": "turn"
    }
   },
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   }
  ],
  "flavor": "Jetzt!",
  "collector": "NP-LYR-25",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_lyr_nadeloehr",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Nadelöhr",
  "ap": 1,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 DEF dauerhaft.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +1 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "def": 1,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Nur einer kommt durch.",
  "collector": "NP-LYR-26",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_lyr_schuss_vor_den_bug",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Schuss vor den Bug",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 1 Schaden zu. Ziehe 1 Karte.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 1 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 1
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Das war die Warnung.",
  "collector": "NP-LYR-27",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_lyr_geroellhagel",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Geröllhagel",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 3 Schaden zu. Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 3 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 3
    }
   },
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   }
  ],
  "flavor": "Der Berg wirft zurück.",
  "collector": "NP-LYR-28",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_lyr_talruf_hoeren",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Talruf hören",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 1 Karte. Eine eigene Fronteinheit: +1 DEF dauerhaft.",
  "rules": [
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   },
   {
    "code": "BUFF",
    "param": {
     "atk": 0,
     "def": 1,
     "until": "turn"
    }
   }
  ],
  "flavor": "Das Tal antwortet.",
  "collector": "NP-LYR-29",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_lyr_zerstreute_posten",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Zerstreute Posten",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 DEF dauerhaft. Ziehe 1 Karte.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +1 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "def": 1,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Kein Ziel für den Schwerpunkt.",
  "collector": "NP-LYR-30",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_lyr_aus_dem_hinterhalt",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Aus dem Hinterhalt",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit darf in diesem Zug erneut angreifen. Eine eigene Fronteinheit: +1 ATK bis Zugende.",
  "rules": [
   "Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten).",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 ATK bis zum Ende dieses Zuges."
  ],
  "effects": [
   {
    "code": "EXTRA_ATTACK",
    "param": {}
   },
   {
    "code": "BUFF",
    "param": {
     "atk": 1,
     "def": 0,
     "until": "turn"
    }
   }
  ],
  "flavor": "Noch ein Schlag aus der Deckung.",
  "collector": "NP-LYR-31",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_lyr_bergquelle",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Bergquelle",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Heile 2 DEF an einer eigenen Fronteinheit. Ziehe 1 Karte.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "HEAL",
    "param": {
     "value": 2
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Das Tal versorgt.",
  "collector": "NP-LYR-32",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_lyr_pass_entdeckt",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Pass entdeckt",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet. Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   },
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   }
  ],
  "flavor": "Wer den Pass nicht sieht, kämpft blind.",
  "collector": "NP-LYR-33",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_lyr_lawine",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Lawine",
  "ap": 4,
  "rarity": "gold",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 4 Schaden zu.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 4 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 4
    }
   }
  ],
  "flavor": "Das Tal schlägt zurück.",
  "collector": "NP-LYR-34",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_lyr_bergmantel",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Bergmantel",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Schaden am Träger wird ignoriert. Erster Angriff des Trägers: +1 ATK.",
  "rules": [
   "Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.",
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +1 ATK. Danach entfällt der Bonus.",
   "Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)"
  ],
  "effects": [
   {
    "code": "EQUIP_IGNORE_FIRST_DAMAGE",
    "param": {
     "untouchableFirst": true
    }
   },
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 1
    }
   }
  ],
  "flavor": "Grau wie der Fels.",
  "collector": "NP-LYR-35",
  "art_status": "platzhalter",
  "keywords": [
   "Erstschadenschutz"
  ]
 },
 {
  "id": "dc_np_lyr_steinschleuder",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Steinschleuder",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Angriffe des Trägers: +1 Schaden. Erster Angriff des Trägers: +1 ATK.",
  "rules": [
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.",
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +1 ATK. Danach entfällt der Bonus."
  ],
  "effects": [
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   },
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 1
    }
   }
  ],
  "flavor": "Alt, aber wirksam.",
  "collector": "NP-LYR-36",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_lyr_talabzeichen",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Talabzeichen",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Wird der Träger zerstört, ziehst du 2 Karten.",
  "rules": [
   "Wird der Träger zerstört, ziehst du 2 Karten."
  ],
  "effects": [
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 2
    }
   }
  ],
  "flavor": "Das Tal vergisst niemanden.",
  "collector": "NP-LYR-37",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_lyr_kletterausruestung",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Kletterausrüstung",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Angriff des Trägers: +3 ATK.",
  "rules": [
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +3 ATK. Danach entfällt der Bonus."
  ],
  "effects": [
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 3
    }
   }
  ],
  "flavor": "Von oben kommt der erste Schlag.",
  "collector": "NP-LYR-38",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_lyr_eidring",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Eidring",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +2 DEF. Angriffe des Trägers: +1 Schaden.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 2
    }
   },
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   }
  ],
  "flavor": "Ein Eid ist stärker als Stahl.",
  "collector": "NP-LYR-39",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_lyr_passbuechse",
  "set": "set_nation_pool",
  "nation": "Lyr",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Passbüchse",
  "ap": 1,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 ATK. Solange der Träger beschädigt ist: +1 ATK.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +1 ATK."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 0
    }
   },
   {
    "code": "EQUIP_COND_ATK",
    "param": {
     "atk": 1,
     "ifDamaged": true
    }
   }
  ],
  "flavor": "Lang, schwer, tödlich.",
  "collector": "NP-LYR-40",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_ossaria_namenstraeger",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Namensträger",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Trägt die Namen der Toten auf der Rüstung.",
  "collector": "NP-OSS-01",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_ossaria_grabwacht",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Grabwacht",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Bewacht die Gefallenen.",
  "collector": "NP-OSS-02",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_ossaria_plattentraeger_zug",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Plattenträger-Zug",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Schritt für Schritt, Platte für Platte.",
  "collector": "NP-OSS-03",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 3,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_ossaria_erbzug_der_toten",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Erbzug der Toten",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Die Toten marschieren mit.",
  "collector": "NP-OSS-04",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 3,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Abschirmung"
  ]
 },
 {
  "id": "dc_np_ossaria_wallbauer",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Wallbauer",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Benachbarte eigene Infanterie +1 DEF.",
  "rules": [
   "Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "MECH_AURA"
   }
  ],
  "flavor": "Aus Verlust wird Deckung.",
  "collector": "NP-OSS-05",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_ossaria_ahnenkompanie",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Ahnenkompanie",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Die Ahnen stehen neben uns.",
  "collector": "NP-OSS-06",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Abschirmung"
  ]
 },
 {
  "id": "dc_np_ossaria_plattenwagen",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Plattenwagen",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Jede Platte ein Name.",
  "collector": "NP-OSS-07",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 2,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_ossaria_totenwallpanzer",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Totenwallpanzer",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Ein Wall auf Ketten.",
  "collector": "NP-OSS-08",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 6,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_ossaria_unbrechbare_platte",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Unbrechbare Platte",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Jeder Schaden an dieser Einheit −2.",
  "rules": [
   "Schwere Panzerung: Jeder einzelne Schaden, den diese Einheit erleidet (Kampf, Soforteinsatz, Effekt), wird um 2 verringert, mindestens auf 0."
  ],
  "effects": [
   {
    "code": "SCHADEN_MINUS"
   }
  ],
  "flavor": "Die letzte Platte hält immer.",
  "collector": "NP-OSS-09",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_ossaria_abnutzungskette",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Abnutzungskette",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Langsam, teuer für den Feind.",
  "collector": "NP-OSS-10",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 5,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_ossaria_ahnenschmiedwagen",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Ahnenschmiedwagen",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Geschmiedet aus alten Rüstungen.",
  "collector": "NP-OSS-11",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Abschirmung"
  ]
 },
 {
  "id": "dc_np_ossaria_abnutzungsbatterie",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Abnutzungsbatterie",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Jeder Meter kostet.",
  "collector": "NP-OSS-12",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_ossaria_nahdruckmoerser",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Nahdruckmörser",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-i",
   "artillerie"
  ],
  "text": "Steilfeuer I.",
  "rules": [
   "Steilfeuer I.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Feuer dient dem Aushalten.",
  "collector": "NP-OSS-13",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 2,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Durchschlag"
  ]
 },
 {
  "id": "dc_np_ossaria_totenglocke",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Totenglocke",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Läutet für jeden Gefallenen.",
  "collector": "NP-OSS-14",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 2,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_ossaria_wallfeuer",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Wallfeuer",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Schützt den Wall.",
  "collector": "NP-OSS-15",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 5,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_ossaria_namensruf_batterie",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Namensruf-Batterie",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "steilfeuer-iv",
   "artillerie"
  ],
  "text": "Steilfeuer IV: ganze Front.",
  "rules": [
   "Steilfeuer IV: ganze Front.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [
   {
    "code": "ATTACK_ANY_FRONT"
   }
  ],
  "flavor": "Jeder Schuss trägt einen Namen.",
  "collector": "NP-OSS-16",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 4,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Nachsetzen",
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_ossaria_grabsucher",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Grabsucher",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Untersucht unnötige Tode.",
  "collector": "NP-OSS-17",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 1,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_ossaria_stellungsbeobachter",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Stellungsbeobachter",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Taktisch eher Stellung als Tiefe.",
  "collector": "NP-OSS-18",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 3,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_ossaria_zeichendeuter",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Zeichendeuter",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Liest die Zeichen des Feindes.",
  "collector": "NP-OSS-19",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Gefechtsbereit"
  ]
 },
 {
  "id": "dc_np_ossaria_schmied_der_erinnerung",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Schmied der Erinnerung",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "+2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.",
  "rules": [
   "Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FUEHRUNG_V"
   }
  ],
  "flavor": "Schmiedet Rüstung aus Erinnerung.",
  "collector": "NP-OSS-20",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 5,
  "def": 6,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_ossaria_waechter_der_namen",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Einheit",
  "name": "Wächter der Namen",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Kein Name wird vergessen.",
  "collector": "NP-OSS-21",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 4,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Abschirmung",
   "Sicherung"
  ]
 },
 {
  "id": "dc_np_ossaria_wall_der_gefallenen",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Wall der Gefallenen",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Jeder Schaden an deinen Fronteinheiten −1. Gegnerische Fronteinheiten −1 ATK. Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.",
  "rules": [
   "Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.",
   "Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).",
   "Zu Beginn jedes deiner Züge heilt eine beschädigte eigene Fronteinheit bis zu 1 DEF (höchstens bis zur maximalen DEF), solange diese Unterstützung liegt."
  ],
  "effects": [
   {
    "code": "REDUCE_DAMAGE",
    "param": {
     "n": 1
    }
   },
   {
    "code": "AURA_ENEMY_ATK",
    "param": {
     "atk": -1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "turnheal",
     "n": 1
    }
   }
  ],
  "flavor": "Die Toten schützen die Lebenden.",
  "collector": "NP-OSS-22",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_ossaria_ahnenhalle",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Ahnenhalle",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
  "rules": [
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert."
  ],
  "effects": [
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   }
  ],
  "flavor": "Jeder Name hat eine Geschichte.",
  "collector": "NP-OSS-23",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_ossaria_ruestkammer_der_toten",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Rüstkammer der Toten",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Jeder Schaden an deinen Fronteinheiten −1.",
  "rules": [
   "Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich."
  ],
  "effects": [
   {
    "code": "REDUCE_DAMAGE",
    "param": {
     "n": 1
    }
   }
  ],
  "flavor": "Die Rüstungen der Gefallenen leben weiter.",
  "collector": "NP-OSS-24",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_ossaria_aufruf_der_namen",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Aufruf der Namen",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +2 ATK bis Zugende, +2 DEF dauerhaft.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges. Sie erhält +2 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 2,
     "def": 2,
     "until": "turn"
    }
   }
  ],
  "flavor": "Für die, die vor uns fielen.",
  "collector": "NP-OSS-25",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_ossaria_verlust_wird_deckung",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Verlust wird Deckung",
  "ap": 0,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +1 DEF dauerhaft.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 0,
     "def": 1,
     "until": "turn"
    }
   }
  ],
  "flavor": "Hinter den Gefallenen in Deckung.",
  "collector": "NP-OSS-26",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_ossaria_totenehre",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Totenehre",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 1 Karte. Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 ATK bis Zugende.",
  "rules": [
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.",
   "Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Einheit dort hat bis zum Ende dieses Zuges +1 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung)."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   },
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "atk": 1,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Wir erinnern uns.",
  "collector": "NP-OSS-27",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_ossaria_teurer_meter",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Teurer Meter",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 1 Schaden zu.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 1 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Teurer Preis für jeden Meter.",
  "collector": "NP-OSS-28",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_ossaria_ruestung_flicken",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Rüstung flicken",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Heile 2 DEF an einer eigenen Fronteinheit.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts."
  ],
  "effects": [
   {
    "code": "HEAL",
    "param": {
     "value": 2
    }
   }
  ],
  "flavor": "Neue Niete, alter Name.",
  "collector": "NP-OSS-29",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_ossaria_wall_verstaerken",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Wall verstärken",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +2 DEF dauerhaft. Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +2 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.",
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "def": 2,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   },
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   }
  ],
  "flavor": "Noch eine Lage.",
  "collector": "NP-OSS-30",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_ossaria_ahnen_rufen",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Ahnen rufen",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Ziehe 2 Karten.",
  "rules": [
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.",
   "Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 2
    }
   }
  ],
  "flavor": "Die alten Rüstungen kommen zurück.",
  "collector": "NP-OSS-31",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_ossaria_prozession_der_namen",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Prozession der Namen",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 3, dann wirf deine älteste Handkarte ab. Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.",
  "rules": [
   "Ziehe 3 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DRAW_DISCARD",
    "param": {
     "draw": 3,
     "discard": 1
    }
   },
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   }
  ],
  "flavor": "Wir tragen sie mit.",
  "collector": "NP-OSS-32",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_ossaria_gepanzerter_vorstoss",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Gepanzerter Vorstoß",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 ATK bis Zugende. Ziehe 1 Karte.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Einheit dort hat bis zum Ende dieses Zuges +1 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung).",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "atk": 1,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Der Fuß drückt nach.",
  "collector": "NP-OSS-33",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_ossaria_die_toten_auf_der_ruestung",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Die Toten auf der Rüstung",
  "ap": 4,
  "rarity": "gold",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +2 DEF dauerhaft. Ziehe 2 Karten.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +2 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.",
   "Ziehe 2 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "def": 2,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 2
    }
   }
  ],
  "flavor": "Jeder Name ein Schild.",
  "collector": "NP-OSS-34",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_ossaria_namensplatte",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Namensplatte",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 ATK und +1 DEF. Angriffe des Trägers: +1 Schaden.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK und +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 1
    }
   },
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   }
  ],
  "flavor": "Ein Name schützt.",
  "collector": "NP-OSS-35",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_ossaria_totenschild",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Totenschild",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Schaden am Träger wird ignoriert. Solange der Träger beschädigt ist: +1 ATK.",
  "rules": [
   "Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.",
   "Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +1 ATK.",
   "Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)"
  ],
  "effects": [
   {
    "code": "EQUIP_IGNORE_FIRST_DAMAGE",
    "param": {
     "untouchableFirst": true
    }
   },
   {
    "code": "EQUIP_COND_ATK",
    "param": {
     "atk": 1,
     "ifDamaged": true
    }
   }
  ],
  "flavor": "Der erste Treffer gilt den Toten.",
  "collector": "NP-OSS-36",
  "art_status": "platzhalter",
  "keywords": [
   "Erstschadenschutz"
  ]
 },
 {
  "id": "dc_np_ossaria_ahnenruestung",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Ahnenrüstung",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 ATK und +2 DEF.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK und +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 2
    }
   }
  ],
  "flavor": "Geerbt und verstärkt.",
  "collector": "NP-OSS-37",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_ossaria_gedenkmarke",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Gedenkmarke",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Wird der Träger zerstört, ziehst du 1 Karte. Träger +1 ATK und +1 DEF.",
  "rules": [
   "Wird der Träger zerstört, ziehst du 1 Karte.",
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +1 ATK und +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   },
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 1,
     "only": "infanterie"
    }
   }
  ],
  "flavor": "Wer fällt, wird erinnert.",
  "collector": "NP-OSS-38",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_ossaria_plattenschutz",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Plattenschutz",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 2 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar. Wird der Träger zerstört, ziehst du 1 Karte.",
  "rules": [
   "Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 2 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.",
   "Wird der Träger zerstört, ziehst du 1 Karte."
  ],
  "effects": [
   {
    "code": "EQUIP_NEGATE_DAMAGE",
    "param": {
     "amount": 2,
     "once": true
    }
   },
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   }
  ],
  "flavor": "Hält den Schlag ab.",
  "collector": "NP-OSS-39",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_ossaria_grabklinge",
  "set": "set_nation_pool",
  "nation": "Ossaria",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Grabklinge",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Solange der Träger beschädigt ist: +2 ATK. Erster Angriff des Trägers: +1 ATK.",
  "rules": [
   "Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +2 ATK.",
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +1 ATK. Danach entfällt der Bonus."
  ],
  "effects": [
   {
    "code": "EQUIP_COND_ATK",
    "param": {
     "atk": 2,
     "ifDamaged": true
    }
   },
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 1
    }
   }
  ],
  "flavor": "Verwundet, aber nicht besiegt.",
  "collector": "NP-OSS-40",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_namar_kaischuetzen",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Kaischützen",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Der Kai gehört uns.",
  "collector": "NP-NAM-01",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 4,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Heranführung"
  ]
 },
 {
  "id": "dc_np_namar_schnelle_entsatzgruppe",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Schnelle Entsatzgruppe",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Kommt, wo es brennt.",
  "collector": "NP-NAM-02",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 0,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_namar_hafenarbeiter_miliz",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Hafenarbeiter-Miliz",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Heute Kisten, morgen Gewehre.",
  "collector": "NP-NAM-03",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_namar_konvoischutz",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Konvoischutz",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Benachbarte eigene Infanterie +1 DEF.",
  "rules": [
   "Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "MECH_AURA"
   }
  ],
  "flavor": "Begleitet die Lieferung.",
  "collector": "NP-NAM-04",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Ablösung"
  ]
 },
 {
  "id": "dc_np_namar_schmugglerzug",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Schmugglerzug",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Ein Teil verschwindet, der Rest kommt an.",
  "collector": "NP-NAM-05",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 3,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Platztausch",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_namar_hafenregiment",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Hafenregiment",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Häfen stehen zusammen.",
  "collector": "NP-NAM-06",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 4,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_namar_kaipanzer",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Kaipanzer",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Vom Schiff an die Front.",
  "collector": "NP-NAM-07",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_namar_lieferkette",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Lieferkette",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Bringt alles mit.",
  "collector": "NP-NAM-08",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 2,
  "def": 5,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_namar_entsatzwagen",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Entsatzwagen",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "+2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.",
  "rules": [
   "Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FUEHRUNG_V"
   }
  ],
  "flavor": "Rollt in den getroffenen Abschnitt.",
  "collector": "NP-NAM-09",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 2,
  "def": 5,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_namar_containerpanzer",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Containerpanzer",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Improvisiert, aber stabil.",
  "collector": "NP-NAM-10",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Abschirmung"
  ]
 },
 {
  "id": "dc_np_namar_herr_der_kais",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Herr der Kais",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Kontrolliert jeden Kai.",
  "collector": "NP-NAM-11",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 5,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_namar_kaibatterie",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Kaibatterie",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Deckt Entsatz und Kai.",
  "collector": "NP-NAM-12",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 1,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_namar_schiffsmoerser",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Schiffsmörser",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-i",
   "artillerie"
  ],
  "text": "Steilfeuer I.",
  "rules": [
   "Steilfeuer I.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Ausgeladen und aufgestellt.",
  "collector": "NP-NAM-13",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 2,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_namar_konvoifeuer",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Konvoifeuer",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Schützt die Lieferung.",
  "collector": "NP-NAM-14",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_namar_hafengeschuetz",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Hafengeschütz",
  "ap": 5,
  "rarity": "silver",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Trifft auch fremde Depots.",
  "collector": "NP-NAM-15",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_namar_schlag_der_ankunft",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Schlag der Ankunft",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "steilfeuer-iv",
   "artillerie"
  ],
  "text": "Steilfeuer IV: ganze Front.",
  "rules": [
   "Steilfeuer IV: ganze Front.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [
   {
    "code": "ATTACK_ANY_FRONT"
   }
  ],
  "flavor": "Wenn die Lieferung ankommt, schlägt sie zu.",
  "collector": "NP-NAM-16",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung",
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_namar_hafenlotse",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Hafenlotse",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Kennt jede Einfahrt.",
  "collector": "NP-NAM-17",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 1,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Fernschuss"
  ]
 },
 {
  "id": "dc_np_namar_konvoiaufklaerer",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Konvoiaufklärer",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Wer mitverdient, wird beobachtet.",
  "collector": "NP-NAM-18",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 1,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_namar_kaispitzel",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Kaispitzel",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.",
  "rules": [
   "Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie."
  ],
  "effects": [
   {
    "code": "HAND_PEEK",
    "param": {
     "n": 2
    }
   }
  ],
  "flavor": "Hört alles am Hafen.",
  "collector": "NP-NAM-19",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_namar_lieferung_trotz_allem",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Lieferung trotz allem",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Benachbarte eigene Infanterie +1 DEF.",
  "rules": [
   "Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "MECH_AURA"
   }
  ],
  "flavor": "Kommt immer an.",
  "collector": "NP-NAM-20",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 3,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Heranführung",
   "Sicherung"
  ]
 },
 {
  "id": "dc_np_namar_hafenbund_garde",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Einheit",
  "name": "Hafenbund-Garde",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Schützt den Bund der Häfen.",
  "collector": "NP-NAM-21",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 4,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Abschirmung",
   "Sicherung"
  ]
 },
 {
  "id": "dc_np_namar_kai_ohne_schloss",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Kai ohne Schloss",
  "ap": 4,
  "rarity": "gold",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert. Zu Beginn deines Zuges: +1 AP.",
  "rules": [
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
   "Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt."
  ],
  "effects": [
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   },
   {
    "code": "TURN_AP",
    "param": {
     "ap": 1
    }
   }
  ],
  "flavor": "Alles kommt an.",
  "collector": "NP-NAM-22",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_namar_speicher_am_hafen",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Speicher am Hafen",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert. Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 ATK.",
  "rules": [
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
   "Beim Ausspielen wählst du einen eigenen Frontabschnitt. Solange diese Unterstützung liegt, haben deine Einheiten in diesem Abschnitt +1 ATK."
  ],
  "effects": [
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "aura",
     "scope": "section",
     "atk": 1,
     "def": 0
    }
   }
  ],
  "flavor": "Immer etwas auf Lager.",
  "collector": "NP-NAM-23",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_namar_hafenkontor",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Hafenkontor",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn deines Zuges: +1 AP. Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.",
  "rules": [
   "Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt.",
   "Beim Ausspielen wählst du einen eigenen Frontabschnitt. Solange diese Unterstützung liegt, haben deine Einheiten in diesem Abschnitt +1 DEF."
  ],
  "effects": [
   {
    "code": "TURN_AP",
    "param": {
     "ap": 1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "aura",
     "scope": "section",
     "atk": 0,
     "def": 1
    }
   }
  ],
  "flavor": "Wer zahlt, bekommt.",
  "collector": "NP-NAM-24",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_namar_aus_vollen_lagern",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Aus vollen Lagern",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Eine eigene Fronteinheit: +1 ATK bis Zugende.",
  "rules": [
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 ATK bis zum Ende dieses Zuges."
  ],
  "effects": [
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   },
   {
    "code": "BUFF",
    "param": {
     "atk": 1,
     "def": 0,
     "until": "turn"
    }
   }
  ],
  "flavor": "Der Vorrat geht in den Abschnitt.",
  "collector": "NP-NAM-25",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_namar_hilfe_vom_kai",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Hilfe vom Kai",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Heile 3 DEF an einer eigenen Fronteinheit. Ziehe 1 Karte.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 3 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "HEAL",
    "param": {
     "value": 3
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Hilfe ist da.",
  "collector": "NP-NAM-26",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_namar_lieferung_eingetroffen",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Lieferung eingetroffen",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 3 Karten.",
  "rules": [
   "Ziehe 3 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 3
    }
   }
  ],
  "flavor": "Kisten voller Munition.",
  "collector": "NP-NAM-27",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_namar_chaoslogistik",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Chaoslogistik",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 3, dann wirf deine älteste Handkarte ab.",
  "rules": [
   "Ziehe 3 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof."
  ],
  "effects": [
   {
    "code": "DRAW_DISCARD",
    "param": {
     "draw": 3,
     "discard": 1
    }
   }
  ],
  "flavor": "Ein Teil fehlt immer.",
  "collector": "NP-NAM-28",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_namar_kai_verteidigen",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Kai verteidigen",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 DEF dauerhaft. Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +1 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.",
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "def": 1,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   },
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   }
  ],
  "flavor": "Der Hafen hält.",
  "collector": "NP-NAM-29",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_namar_nachschub",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Nachschub",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Heile 2 DEF an einer eigenen Fronteinheit. Eine eigene Fronteinheit: +1 ATK bis Zugende.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 ATK bis zum Ende dieses Zuges."
  ],
  "effects": [
   {
    "code": "HEAL",
    "param": {
     "value": 2
    }
   },
   {
    "code": "BUFF",
    "param": {
     "atk": 1,
     "def": 0,
     "until": "turn"
    }
   }
  ],
  "flavor": "Frische Verbände.",
  "collector": "NP-NAM-30",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_namar_hafenfeuer",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Hafenfeuer",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 1 Schaden zu. Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 1 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 1
    }
   },
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   }
  ],
  "flavor": "Vom Kai aus getroffen.",
  "collector": "NP-NAM-31",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_namar_ganze_schiffsladung",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Ganze Schiffsladung",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +2 ATK bis Zugende, +1 DEF dauerhaft.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges. Sie erhält +1 DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 2,
     "def": 1,
     "until": "turn"
    }
   }
  ],
  "flavor": "Alles, was das Schiff hatte.",
  "collector": "NP-NAM-32",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_namar_konvoi_durchbringen",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Konvoi durchbringen",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Ziehe 1 Karte.",
  "rules": [
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Die Ladung ist sicher.",
  "collector": "NP-NAM-33",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_namar_die_grosse_flotte",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Die große Flotte",
  "ap": 4,
  "rarity": "gold",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 3 Karten. Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).",
  "rules": [
   "Ziehe 3 Karten von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.",
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 3
    }
   },
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   }
  ],
  "flavor": "Ein ganzer Konvoi auf einmal.",
  "collector": "NP-NAM-34",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_namar_hafenhelm",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Hafenhelm",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 ATK und +1 DEF. Wird der Träger zerstört, ziehst du 1 Karte.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK und +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Wird der Träger zerstört, ziehst du 1 Karte."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 1
    }
   },
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   }
  ],
  "flavor": "Gegen Kisten und Kugeln.",
  "collector": "NP-NAM-35",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_namar_schmuggelware",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Schmuggelware",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Wird der Träger zerstört, ziehst du 1 Karte. Erster Angriff des Trägers: +1 ATK.",
  "rules": [
   "Wird der Träger zerstört, ziehst du 1 Karte.",
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +1 ATK. Danach entfällt der Bonus."
  ],
  "effects": [
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   },
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 1
    }
   }
  ],
  "flavor": "Irgendwas fällt immer ab.",
  "collector": "NP-NAM-36",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_namar_kaipanzerung",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Kaipanzerung",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Schaden am Träger wird ignoriert. Träger +1 DEF.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.",
   "Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)"
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 1
    }
   },
   {
    "code": "EQUIP_IGNORE_FIRST_DAMAGE",
    "param": {
     "untouchableFirst": true
    }
   }
  ],
  "flavor": "Aus Containerstahl.",
  "collector": "NP-NAM-37",
  "art_status": "platzhalter",
  "keywords": [
   "Erstschadenschutz"
  ]
 },
 {
  "id": "dc_np_namar_lieferwaffe",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Lieferwaffe",
  "ap": 1,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +2 ATK und +1 DEF.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +2 ATK und +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 2,
     "def": 1,
     "only": "infanterie"
    }
   }
  ],
  "flavor": "Frisch aus der Kiste.",
  "collector": "NP-NAM-38",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_namar_signalpistole",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Signalpistole",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Angriff des Trägers: +2 ATK. Angriffe des Trägers: +1 Schaden.",
  "rules": [
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +2 ATK. Danach entfällt der Bonus.",
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert."
  ],
  "effects": [
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 2
    }
   },
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   }
  ],
  "flavor": "Signal für den Entsatz.",
  "collector": "NP-NAM-39",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_namar_hafenkran_haken",
  "set": "set_nation_pool",
  "nation": "Namar",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Hafenkran-Haken",
  "ap": 1,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Angriffe des Trägers: +1 Schaden.",
  "rules": [
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert."
  ],
  "effects": [
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   }
  ],
  "flavor": "Improvisiert und wirksam.",
  "collector": "NP-NAM-40",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_sahr_flusslaeufer",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Flussläufer",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Bewegung ist die Schlacht.",
  "collector": "NP-SAH-01",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 4,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_sahr_linienzug_sahr",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Linienzug Sahr",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Bindet den Feind an der Linie.",
  "collector": "NP-SAH-02",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 4,
  "def": 1,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_sahr_umgehungstrupp",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Umgehungstrupp",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Kommt von dort, wo niemand wartet.",
  "collector": "NP-SAH-03",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 4,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Platztausch",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_sahr_handelsfrontmiliz",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Handelsfrontmiliz",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Verteidigt die Handelswege.",
  "collector": "NP-SAH-04",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Zuteilung"
  ]
 },
 {
  "id": "dc_np_sahr_flankenstoss_kompanie",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Flankenstoß-Kompanie",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.",
  "rules": [
   "Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.",
   "Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden."
  ],
  "effects": [
   {
    "code": "AMBUSH"
   }
  ],
  "flavor": "Trifft die offene Flanke.",
  "collector": "NP-SAH-05",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 4,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Heranführung"
  ]
 },
 {
  "id": "dc_np_sahr_routenwache",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Routenwache",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Hält die Route offen.",
  "collector": "NP-SAH-06",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Heranführung"
  ]
 },
 {
  "id": "dc_np_sahr_flusskette",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Flusskette",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Fährt am Ufer entlang.",
  "collector": "NP-SAH-07",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_sahr_umgehungspanzer",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Umgehungspanzer",
  "ap": 5,
  "rarity": "silver",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Taucht hinter der Linie auf.",
  "collector": "NP-SAH-08",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 7,
  "verdeckt_ok": true,
  "keywords": [
   "Hinterhalt",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_sahr_kolonne_ohne_ende",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Kolonne ohne Ende",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "+2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.",
  "rules": [
   "Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FUEHRUNG_V"
   }
  ],
  "flavor": "Sie hört nie auf.",
  "collector": "NP-SAH-09",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 7,
  "verdeckt_ok": true,
  "keywords": [
   "Zähigkeit",
   "Durchschlag"
  ]
 },
 {
  "id": "dc_np_sahr_handelswagen",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Handelswagen",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Gepanzert für die Route.",
  "collector": "NP-SAH-10",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_sahr_uferkeil",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Uferkeil",
  "ap": 5,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Schneidet den Fluss.",
  "collector": "NP-SAH-11",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 5,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_sahr_linienfeuer",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Linienfeuer",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Bindet die Linie.",
  "collector": "NP-SAH-12",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 1,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_sahr_flussmoerser",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Flussmörser",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-i",
   "artillerie"
  ],
  "text": "Steilfeuer I.",
  "rules": [
   "Steilfeuer I.",
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Vom Boot aus.",
  "collector": "NP-SAH-13",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 1,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Hinterhalt",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_sahr_routenbatterie",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Routenbatterie",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Öffnet Wege.",
  "collector": "NP-SAH-14",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Nachsetzen"
  ]
 },
 {
  "id": "dc_np_sahr_batterie_der_weiten_wege",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Batterie der weiten Wege",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "steilfeuer-iv",
   "artillerie"
  ],
  "text": "Steilfeuer IV: ganze Front.",
  "rules": [
   "Steilfeuer IV: ganze Front.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [
   {
    "code": "ATTACK_ANY_FRONT"
   }
  ],
  "flavor": "Trifft das Depot hinter der Linie.",
  "collector": "NP-SAH-15",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 6,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_sahr_wegschliesser",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Wegschließer",
  "ap": 5,
  "rarity": "silver",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Schließt den Weg des Gegners.",
  "collector": "NP-SAH-16",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 6,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_sahr_navigator",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Navigator",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Findet die nächste Route.",
  "collector": "NP-SAH-17",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 1,
  "def": 1,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_sahr_flusskundschafter",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Flusskundschafter",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Liest den Fluss.",
  "collector": "NP-SAH-18",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 2,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Stellungswechsel"
  ]
 },
 {
  "id": "dc_np_sahr_routenspaeher",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Routenspäher",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.",
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   },
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Sieht den Weg, bevor der Feind ihn sieht.",
  "collector": "NP-SAH-19",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 4,
  "def": 3,
  "verdeckt_ok": true,
  "keywords": [
   "Hinterhalt",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_sahr_herr_der_routen",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Herr der Routen",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.",
  "rules": [
   "Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.",
   "Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden."
  ],
  "effects": [
   {
    "code": "AMBUSH"
   }
  ],
  "flavor": "Wer die Bewegung kontrolliert, kontrolliert das Land.",
  "collector": "NP-SAH-20",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 5,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Heranführung"
  ]
 },
 {
  "id": "dc_np_sahr_flankenmeister",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Einheit",
  "name": "Flankenmeister",
  "ap": 5,
  "rarity": "silver",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "",
  "rules": [
   "Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.",
   "Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.",
   "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
  ],
  "effects": [
   {
    "code": "RELOCATE_HIDE"
   }
  ],
  "flavor": "Erscheint immer an der Flanke.",
  "collector": "NP-SAH-21",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 5,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Hinterhalt",
   "Sicherung",
   "Absetzen"
  ]
 },
 {
  "id": "dc_np_sahr_gilde_der_routen",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Gilde der Routen",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn deines Zuges: +1 AP. Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.",
  "rules": [
   "Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt.",
   "Zu Beginn jedes deiner Züge heilt eine beschädigte eigene Fronteinheit bis zu 1 DEF (höchstens bis zur maximalen DEF), solange diese Unterstützung liegt."
  ],
  "effects": [
   {
    "code": "TURN_AP",
    "param": {
     "ap": 1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "turnheal",
     "n": 1
    }
   }
  ],
  "flavor": "Der Handel finanziert den Fluss.",
  "collector": "NP-SAH-22",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_sahr_routennetz",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Routennetz",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert. Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.",
  "rules": [
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
   "Beim Ausspielen wählst du einen eigenen Frontabschnitt. Solange diese Unterstützung liegt, haben deine Einheiten in diesem Abschnitt +1 DEF."
  ],
  "effects": [
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "aura",
     "scope": "section",
     "atk": 0,
     "def": 1
    }
   }
  ],
  "flavor": "Fällt eine Route, kommt die nächste.",
  "collector": "NP-SAH-23",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_sahr_flusssperre",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Flusssperre",
  "ap": 5,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Gegnerische Fronteinheiten −1 ATK. Zu Beginn deines Zuges: +1 AP.",
  "rules": [
   "Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).",
   "Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt."
  ],
  "effects": [
   {
    "code": "AURA_ENEMY_ATK",
    "param": {
     "atk": -1
    }
   },
   {
    "code": "TURN_AP",
    "param": {
     "ap": 1
    }
   }
  ],
  "flavor": "Der Feind kämpft gegen den Strom.",
  "collector": "NP-SAH-24",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_sahr_seitenweg",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Seitenweg",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit darf in diesem Zug erneut angreifen.",
  "rules": [
   "Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten)."
  ],
  "effects": [
   {
    "code": "EXTRA_ATTACK",
    "param": {}
   }
  ],
  "flavor": "Noch ein Weg.",
  "collector": "NP-SAH-25",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_sahr_linie_binden",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Linie binden",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 DEF dauerhaft. Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 ATK bis Zugende.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +1 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.",
   "Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Einheit dort hat bis zum Ende dieses Zuges +1 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung)."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "def": 1,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   },
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "atk": 1,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Die Linie hält den Fluss.",
  "collector": "NP-SAH-26",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_sahr_stoss_von_der_seite",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Stoß von der Seite",
  "ap": 0,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +2 ATK bis Zugende.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 2,
     "def": 0,
     "until": "turn"
    }
   }
  ],
  "flavor": "Von der Seite.",
  "collector": "NP-SAH-27",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_sahr_neue_route",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Neue Route",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 1 Karte. Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.",
  "rules": [
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   },
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   }
  ],
  "flavor": "Es gibt immer einen Weg.",
  "collector": "NP-SAH-28",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_sahr_stroemung_nutzen",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Strömung nutzen",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 2, dann wirf deine älteste Handkarte ab. Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.",
  "rules": [
   "Ziehe 2 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DRAW_DISCARD",
    "param": {
     "draw": 2,
     "discard": 1
    }
   },
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   }
  ],
  "flavor": "Mit dem Fluss, nicht gegen ihn.",
  "collector": "NP-SAH-29",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_sahr_wegschnitt",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Wegschnitt",
  "ap": 1,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 2 Schaden zu.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 2
    }
   }
  ],
  "flavor": "Der Weg des Feindes endet hier.",
  "collector": "NP-SAH-30",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_sahr_fluss_ueberqueren",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Fluss überqueren",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 ATK bis Zugende. Wähle einen eigenen Abschnitt: alle eigenen Einheiten dort +1 DEF dauerhaft.",
  "rules": [
   "Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). Jede eigene Einheit dort hat bis zum Ende dieses Zuges +1 ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung).",
   "Ziel: ein eigener Frontabschnitt (Pflichtwahl). Jede eigene Einheit, die jetzt dort steht, erhält +1 DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts."
  ],
  "effects": [
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "atk": 1,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   },
   {
    "code": "BUFF_SECTION",
    "targetSide": "own",
    "param": {
     "def": 1,
     "filter": null,
     "until": "turn",
     "targetSide": "own"
    }
   }
  ],
  "flavor": "Alle zugleich über den Fluss.",
  "collector": "NP-SAH-31",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_sahr_uferversorgung",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Uferversorgung",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Heile 1 DEF an einer eigenen Fronteinheit. Ziehe 1 Karte.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 1 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "HEAL",
    "param": {
     "value": 1
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Wasser heilt.",
  "collector": "NP-SAH-32",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_sahr_handelsrabatt",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Handelsrabatt",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1). Ziehe 1 Karte. Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.",
  "rules": [
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   },
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   }
  ],
  "flavor": "Gute Geschäfte.",
  "collector": "NP-SAH-33",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_sahr_die_grosse_umgehung",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Die große Umgehung",
  "ap": 3,
  "rarity": "gold",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit darf in diesem Zug erneut angreifen. Eine eigene Fronteinheit: +2 ATK bis Zugende.",
  "rules": [
   "Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten).",
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +2 ATK bis zum Ende dieses Zuges."
  ],
  "effects": [
   {
    "code": "EXTRA_ATTACK",
    "param": {}
   },
   {
    "code": "BUFF",
    "param": {
     "atk": 2,
     "def": 0,
     "until": "turn"
    }
   }
  ],
  "flavor": "Hinter der Linie, mitten ins Herz.",
  "collector": "NP-SAH-34",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_sahr_flussmantel",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Flussmantel",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Schaden am Träger wird ignoriert. Träger +2 ATK.",
  "rules": [
   "Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.",
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +2 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)"
  ],
  "effects": [
   {
    "code": "EQUIP_IGNORE_FIRST_DAMAGE",
    "param": {
     "untouchableFirst": true
    }
   },
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 2,
     "def": 0,
     "only": "infanterie"
    }
   }
  ],
  "flavor": "Nass, aber unsichtbar.",
  "collector": "NP-SAH-35",
  "art_status": "platzhalter",
  "keywords": [
   "Erstschadenschutz"
  ]
 },
 {
  "id": "dc_np_sahr_routenkarte",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Routenkarte",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Angriff des Trägers: +2 ATK. Solange der Träger beschädigt ist: +1 ATK.",
  "rules": [
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +2 ATK. Danach entfällt der Bonus.",
   "Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +1 ATK."
  ],
  "effects": [
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 2
    }
   },
   {
    "code": "EQUIP_COND_ATK",
    "param": {
     "atk": 1,
     "ifDamaged": true
    }
   }
  ],
  "flavor": "Der erste Schlag über unbekannte Wege.",
  "collector": "NP-SAH-36",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_sahr_leichtes_gepaeck",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Leichtes Gepäck",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 ATK. Angriffe des Trägers: +1 Schaden.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 0
    }
   },
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   }
  ],
  "flavor": "Schnell ist sicher.",
  "collector": "NP-SAH-37",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_sahr_handelsschild",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Handelsschild",
  "ap": 1,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +2 DEF. Wird der Träger zerstört, ziehst du 1 Karte.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Wird der Träger zerstört, ziehst du 1 Karte."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 2
    }
   },
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   }
  ],
  "flavor": "Bezahlt von der Gilde.",
  "collector": "NP-SAH-38",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_sahr_flankenklinge",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Flankenklinge",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Angriffe des Trägers: +1 Schaden. Solange der Träger beschädigt ist: +1 ATK.",
  "rules": [
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.",
   "Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +1 ATK."
  ],
  "effects": [
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   },
   {
    "code": "EQUIP_COND_ATK",
    "param": {
     "atk": 1,
     "ifDamaged": true
    }
   }
  ],
  "flavor": "Für die offene Seite.",
  "collector": "NP-SAH-39",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_sahr_ruderpanzer",
  "set": "set_nation_pool",
  "nation": "Sahr",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Ruderpanzer",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +2 DEF. Wird der Träger zerstört, ziehst du 1 Karte.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Panzer). Solange sie angelegt ist, hat der Träger +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.",
   "Wird der Träger zerstört, ziehst du 1 Karte."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 0,
     "def": 2,
     "only": "panzer"
    }
   },
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   }
  ],
  "flavor": "Schwimmfähig und gepanzert.",
  "collector": "NP-SAH-40",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_kaderzug",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Kaderzug",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Führt die aufgerufene Pflicht.",
  "collector": "NP-DAR-01",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 2,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_dargan_schuldner_kompanie",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Schuldner-Kompanie",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Tilgt mit Blut.",
  "collector": "NP-DAR-02",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 2,
  "verdeckt_ok": true,
  "keywords": [
   "Heranführung"
  ]
 },
 {
  "id": "dc_np_dargan_haftende_haeuser",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Haftende Häuser",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Jedes Haus haftet für das nächste.",
  "collector": "NP-DAR-03",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 3,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_dargan_zeilenvollstrecker",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Zeilenvollstrecker",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Angriffe gegen Infanterie: +2 Schaden.",
  "rules": [
   "Greift diese Einheit eine Infanterie an, verursacht sie 2 Schaden zusätzlich zu ihrem ATK. Der Gegenschlag des Ziels bleibt unverändert."
  ],
  "effects": [
   {
    "code": "VS_INF"
   }
  ],
  "flavor": "Trägt die Zeile ans Ziel.",
  "collector": "NP-DAR-04",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 1,
  "def": 3,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_dargan_registerwache",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Registerwache",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Schützt das Buch.",
  "collector": "NP-DAR-05",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 3,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_dargan_vollstrecker",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Vollstrecker",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "einheit",
   "infanterie"
  ],
  "text": "Angriffe gegen ungepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "FEUERUEBERLEGENHEIT"
   }
  ],
  "flavor": "Bringt zu Ende, was begonnen wurde.",
  "collector": "NP-DAR-06",
  "art_status": "platzhalter",
  "klasse": "Infanterie",
  "atk": 4,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_dargan_haftungsstoss",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Haftungsstoß",
  "ap": 4,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "",
  "rules": [],
  "effects": [],
  "flavor": "Selten, aber gewaltig.",
  "collector": "NP-DAR-07",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 1,
  "def": 7,
  "verdeckt_ok": true,
  "keywords": [
   "Überlast"
  ]
 },
 {
  "id": "dc_np_dargan_tilgungswagen",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Tilgungswagen",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Angriffe gegen gepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 1 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "IGNORE_DEF",
    "param": {
     "ignore_def": 1
    }
   }
  ],
  "flavor": "Tilgt Panzer.",
  "collector": "NP-DAR-08",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 1,
  "def": 5,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_dargan_schuldbrecher",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Schuldbrecher",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Angriffe gegen gepanzerte Ziele: +2 Schaden.",
  "rules": [
   "Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 2 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "IGNORE_DEF",
    "param": {
     "ignore_def": 2
    }
   }
  ],
  "flavor": "Bricht jede Platte.",
  "collector": "NP-DAR-09",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 3,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Nachsetzen"
  ]
 },
 {
  "id": "dc_np_dargan_kadersturm",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Kadersturm",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Keine Sonderfähigkeit.",
  "rules": [
   "Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln."
  ],
  "effects": [],
  "flavor": "Für den Kader.",
  "collector": "NP-DAR-10",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 5,
  "def": 1,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_dargan_buchkrieg",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Buchkrieg",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "panzer",
   "kette",
   "gepanzert"
  ],
  "text": "Angriffe gegen gepanzerte Ziele: +2 Schaden.",
  "rules": [
   "Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie 2 Schaden zusätzlich zu ihrem ATK."
  ],
  "effects": [
   {
    "code": "IGNORE_DEF",
    "param": {
     "ignore_def": 2
    }
   }
  ],
  "flavor": "Der Krieg steht im Buch.",
  "collector": "NP-DAR-11",
  "art_status": "platzhalter",
  "klasse": "Panzer",
  "atk": 4,
  "def": 6,
  "verdeckt_ok": true,
  "keywords": [
   "Gefechtsbereit",
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_dargan_zielbatterie",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Zielbatterie",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Feuer ist Tilgung.",
  "collector": "NP-DAR-12",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 5,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_dargan_registermoerser",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Registermörser",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-i",
   "artillerie"
  ],
  "text": "Steilfeuer I.",
  "rules": [
   "Steilfeuer I.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Jeder Schuss verbucht.",
  "collector": "NP-DAR-13",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Staffelangriff"
  ]
 },
 {
  "id": "dc_np_dargan_abschlussfeuer",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Abschlussfeuer",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II. Angriffe gegen ungepanzerte Ziele: +1 Schaden.",
  "rules": [
   "Steilfeuer II.",
   "Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [
   {
    "code": "FEUERUEBERLEGENHEIT"
   }
  ],
  "flavor": "Schließt die Zeile.",
  "collector": "NP-DAR-14",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 3,
  "def": 6,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_dargan_zinsbatterie",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Zinsbatterie",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Feuert regelmäßig.",
  "collector": "NP-DAR-15",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 2,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Nachsetzen"
  ]
 },
 {
  "id": "dc_np_dargan_gebundene_haeuser",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Gebundene Häuser",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "steilfeuer-ii",
   "artillerie"
  ],
  "text": "Steilfeuer II.",
  "rules": [
   "Steilfeuer II.",
   "Die Einheit zählt für alle Regeln als Artillerie."
  ],
  "effects": [],
  "flavor": "Alle Häuser feuern zusammen.",
  "collector": "NP-DAR-16",
  "art_status": "platzhalter",
  "klasse": "Artillerie",
  "atk": 5,
  "def": 4,
  "verdeckt_ok": true,
  "keywords": [
   "Fernschuss"
  ]
 },
 {
  "id": "dc_np_dargan_buchpruefer",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Buchprüfer",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Wer haftet, welche Zeile offen ist.",
  "collector": "NP-DAR-17",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 1,
  "def": 2,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_dargan_feldregistrator",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Feldregistrator",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.",
  "rules": [
   "Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.",
   "Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar."
  ],
  "effects": [
   {
    "code": "AUFKLAERUNG",
    "param": {
     "n": 1,
     "onEnter": true
    }
   }
  ],
  "flavor": "Registerarbeit und Feldbeobachtung.",
  "collector": "NP-DAR-18",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 0,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_dargan_schuldeneintreiber",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Schuldeneintreiber",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "einheit",
   "aufklaerung"
  ],
  "text": "Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.",
  "rules": [
   "Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie."
  ],
  "effects": [
   {
    "code": "HAND_PEEK",
    "param": {
     "n": 2
    }
   }
  ],
  "flavor": "Weiß, was der Gegner hat.",
  "collector": "NP-DAR-19",
  "art_status": "platzhalter",
  "klasse": "Aufklärung",
  "atk": 1,
  "def": 4,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_dargan_kaderkolonne",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Kaderkolonne",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Angriffe gegen Infanterie: +2 Schaden.",
  "rules": [
   "Greift diese Einheit eine Infanterie an, verursacht sie 2 Schaden zusätzlich zu ihrem ATK. Der Gegenschlag des Ziels bleibt unverändert."
  ],
  "effects": [
   {
    "code": "VS_INF"
   }
  ],
  "flavor": "Die Pflicht ruft, der Kader folgt.",
  "collector": "NP-DAR-20",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 5,
  "def": 5,
  "verdeckt_ok": true,
  "keywords": [
   "Abschirmung",
   "Überlast"
  ]
 },
 {
  "id": "dc_np_dargan_hauptbuchhalter",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Einheit",
  "name": "Hauptbuchhalter",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "einheit",
   "elite",
   "infanterie"
  ],
  "text": "Benachbarte eigene Fronteinheiten +2 DEF.",
  "rules": [
   "Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt. Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert)."
  ],
  "effects": [
   {
    "code": "FLANK_DEF"
   }
  ],
  "flavor": "Rechnet jeden Verlust nach.",
  "collector": "NP-DAR-21",
  "art_status": "platzhalter",
  "klasse": "Elite",
  "atk": 3,
  "def": 6,
  "verdeckt_ok": true
 },
 {
  "id": "dc_np_dargan_schuldregister",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Schuldregister",
  "ap": 4,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert. Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort +1 DEF.",
  "rules": [
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
   "Beim Ausspielen wählst du einen eigenen Frontabschnitt. Solange diese Unterstützung liegt, haben deine Einheiten in diesem Abschnitt +1 DEF."
  ],
  "effects": [
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   },
   {
    "code": "CM",
    "param": {
     "k": "aura",
     "scope": "section",
     "atk": 0,
     "def": 1
    }
   }
  ],
  "flavor": "Jeder Name steht im Buch.",
  "collector": "NP-DAR-22",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_haftungskasse",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Haftungskasse",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Jeder Schaden an deinen Fronteinheiten −1.",
  "rules": [
   "Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich."
  ],
  "effects": [
   {
    "code": "REDUCE_DAMAGE",
    "param": {
     "n": 1
    }
   }
  ],
  "flavor": "Die Häuser zahlen.",
  "collector": "NP-DAR-23",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_das_grosse_buch",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Unterstützung",
  "name": "Das Große Buch",
  "ap": 5,
  "rarity": "gold",
  "tags": [
   "unterstuetzung"
  ],
  "text": "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert. Gegnerische Fronteinheiten −1 ATK.",
  "rules": [
   "Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt. Das Handlimit gilt unverändert.",
   "Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag)."
  ],
  "effects": [
   {
    "code": "TURN_DRAW",
    "param": {
     "n": 1
    }
   },
   {
    "code": "AURA_ENEMY_ATK",
    "param": {
     "atk": -1
    }
   }
  ],
  "flavor": "Was im Buch steht, wird getilgt.",
  "collector": "NP-DAR-24",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_zeile_setzen",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Zeile setzen",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet. Ziehe 1 Karte.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof."
  ],
  "effects": [
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   },
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   }
  ],
  "flavor": "Der Name steht im Buch.",
  "collector": "NP-DAR-25",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_markierter_schlag",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Markierter Schlag",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet. Füge einer gegnerischen Fronteinheit 2 Schaden zu.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   },
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 2
    }
   }
  ],
  "flavor": "Markiert und getroffen.",
  "collector": "NP-DAR-26",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_zeile_schliessen",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Zeile schließen",
  "ap": 3,
  "rarity": "silver",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit darf in diesem Zug erneut angreifen. Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).",
  "rules": [
   "Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten).",
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "EXTRA_ATTACK",
    "param": {}
   },
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   }
  ],
  "flavor": "Zu Ende bringen.",
  "collector": "NP-DAR-27",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_tilgung",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Tilgung",
  "ap": 3,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Füge einer gegnerischen Fronteinheit 2 Schaden zu. Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 2 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 2
    }
   },
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   }
  ],
  "flavor": "Die Schuld wird beglichen.",
  "collector": "NP-DAR-28",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_aufruf_der_pflicht",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Aufruf der Pflicht",
  "ap": 0,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Eine eigene Fronteinheit: +1 ATK bis Zugende.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie erhält +1 ATK bis zum Ende dieses Zuges."
  ],
  "effects": [
   {
    "code": "BUFF",
    "param": {
     "atk": 1,
     "def": 0,
     "until": "turn"
    }
   }
  ],
  "flavor": "Der Name wird gerufen.",
  "collector": "NP-DAR-29",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_registerpruefung",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Registerprüfung",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 1 Karte. Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).",
  "rules": [
   "Ziehe 1 Karte von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.",
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "DRAW",
    "param": {
     "value": 1
    }
   },
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   }
  ],
  "flavor": "Alles verbucht.",
  "collector": "NP-DAR-30",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_haftung_uebernehmen",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Haftung übernehmen",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Heile 2 DEF an einer eigenen Fronteinheit.",
  "rules": [
   "Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu 2 DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts."
  ],
  "effects": [
   {
    "code": "HEAL",
    "param": {
     "value": 2
    }
   }
  ],
  "flavor": "Das Haus zahlt.",
  "collector": "NP-DAR-31",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_zinseszins",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Zinseszins",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Ziehe 2, dann wirf deine älteste Handkarte ab.",
  "rules": [
   "Ziehe 2 Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof."
  ],
  "effects": [
   {
    "code": "DRAW_DISCARD",
    "param": {
     "draw": 2,
     "discard": 1
    }
   }
  ],
  "flavor": "Die Schuld wächst.",
  "collector": "NP-DAR-32",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_kader_nachfuehren",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Kader nachführen",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Deine nächste Einheit oder Unterstützung kostet 1 AP weniger (mind. 1).",
  "rules": [
   "Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet 1 AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen."
  ],
  "effects": [
   {
    "code": "COST_NEXT",
    "param": {
     "type": "Einheit",
     "amount": 1
    }
   }
  ],
  "flavor": "Die nächste Zeile ist bereit.",
  "collector": "NP-DAR-33",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_endabrechnung",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Soforteinsatz",
  "name": "Endabrechnung",
  "ap": 4,
  "rarity": "gold",
  "tags": [
   "soforteinsatz"
  ],
  "text": "Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet. Füge einer gegnerischen Fronteinheit 4 Schaden zu.",
  "rules": [
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.",
   "Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet 4 Schaden; Schadensminderungen gelten. Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden."
  ],
  "effects": [
   {
    "code": "MARK_OBSERVED",
    "param": {
     "count": 1
    }
   },
   {
    "code": "DEAL_DAMAGE",
    "param": {
     "value": 4
    }
   }
  ],
  "flavor": "Die letzte Zeile wird geschlossen.",
  "collector": "NP-DAR-34",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_schuldmarke",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Schuldmarke",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Wird der Träger zerstört, ziehst du 1 Karte.",
  "rules": [
   "Wird der Träger zerstört, ziehst du 1 Karte."
  ],
  "effects": [
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   }
  ],
  "flavor": "Die Schuld geht weiter.",
  "collector": "NP-DAR-35",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_kaderabzeichen",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Kaderabzeichen",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 ATK und +1 DEF.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit. Solange sie angelegt ist, hat der Träger +1 ATK und +1 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 1
    }
   }
  ],
  "flavor": "Für die aufgerufene Pflicht.",
  "collector": "NP-DAR-36",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_vollstreckungsklinge",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Vollstreckungsklinge",
  "ap": 2,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Angriffe des Trägers: +1 Schaden. Wird der Träger zerstört, ziehst du 1 Karte.",
  "rules": [
   "Jeder Angriff des Trägers verursacht 1 Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.",
   "Wird der Träger zerstört, ziehst du 1 Karte."
  ],
  "effects": [
   {
    "code": "EQUIP_ON_ATTACK_DAMAGE",
    "param": {
     "bonus": 1
    }
   },
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   }
  ],
  "flavor": "Tilgt sauber.",
  "collector": "NP-DAR-37",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_registerpanzer",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Registerpanzer",
  "ap": 1,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Träger +1 ATK und +2 DEF.",
  "rules": [
   "Ausrüsten: Lege diese Karte an eine eigene Fronteinheit (nur Infanterie). Solange sie angelegt ist, hat der Träger +1 ATK und +2 DEF. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof."
  ],
  "effects": [
   {
    "code": "EQUIP_STAT",
    "param": {
     "atk": 1,
     "def": 2,
     "only": "infanterie"
    }
   }
  ],
  "flavor": "Gebunden in Leder und Stahl.",
  "collector": "NP-DAR-38",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_buchungsstempel",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Buchungsstempel",
  "ap": 1,
  "rarity": "silver",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Angriff des Trägers: +2 ATK.",
  "rules": [
   "Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +2 ATK. Danach entfällt der Bonus."
  ],
  "effects": [
   {
    "code": "CARRIER_FIRST_ATTACK_ATK",
    "param": {
     "atk": 2
    }
   }
  ],
  "flavor": "Der erste Treffer ist gebucht.",
  "collector": "NP-DAR-39",
  "art_status": "platzhalter"
 },
 {
  "id": "dc_np_dargan_haftungsschild",
  "set": "set_nation_pool",
  "nation": "Dargan",
  "status": "live",
  "typ": "Ausrüstung",
  "name": "Haftungsschild",
  "ap": 2,
  "rarity": "bronze",
  "tags": [
   "ausruestung"
  ],
  "text": "Erster Schaden am Träger wird ignoriert. Wird der Träger zerstört, ziehst du 1 Karte.",
  "rules": [
   "Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.",
   "Wird der Träger zerstört, ziehst du 1 Karte.",
   "Erstschadenschutz (Einmalig: Der erste verhinderbare positive Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.)"
  ],
  "effects": [
   {
    "code": "EQUIP_IGNORE_FIRST_DAMAGE",
    "param": {
     "untouchableFirst": true
    }
   },
   {
    "code": "ON_DESTROY_DRAW",
    "param": {
     "draw": 1
    }
   }
  ],
  "flavor": "Das Haus fängt den ersten Schlag.",
  "collector": "NP-DAR-40",
  "art_status": "platzhalter",
  "keywords": [
   "Erstschadenschutz"
  ]
 }
];
