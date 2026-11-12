/**
 * Panzer-Einheiten (Katalog). Nur Daten, keine Spiellogik.
 *
 * Keine Kommentare pro Karte (zu umfangreich). Änderungen an Werten oder
 * Effekten sind Regeländerungen und gehören nicht in diese Aufräumung.
 */
window.DC_SET_TYPES = window.DC_SET_TYPES || {};
window.DC_SET_TYPES["Panzer"] = [
  {
    "id": "dc_eh_donner",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Mittlerer Panzer Donnerkeil",
    "ap": 3,
    "atk": 4,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "fahrzeug",
      "gepanzert",
      "kette",
      "mittel",
      "panzer"
    ],
    "text": "Feuerüberlegenheit: +1 Schaden gegen ungepanzerte Einheiten.",
    "effects": [
      {
        "code": "FEUERUEBERLEGENHEIT"
      }
    ],
    "flavor": "Ein leichtes Ziel!",
    "image": "panzer/A057.jpg",
    "max_copies": 2,
    "collector": "A057",
    "keywords": [
      "Ablösung"
    ],
    "rarity": "bronze"
  },
  {
    "id": "dc_eh_hammer",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Panzertrupp Hammer",
    "ap": 5,
    "atk": 6,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "fahrzeug",
      "gepanzert",
      "kette",
      "panzer",
      "schwer"
    ],
    "text": "Wuchtgeschoss: ignoriert 2 DEF beim Angriff auf Gepanzerte.",
    "effects": [
      {
        "code": "IGNORE_DEF",
        "param": {
          "ignore_def": 2
        }
      }
    ],
    "flavor": "Masse mal Beschleunigung gleich Kraft.",
    "image": "panzer/A061.jpg",
    "max_copies": 2,
    "collector": "A061",
    "keywords": [
      "Stellungswechsel"
    ],
    "rarity": "bronze"
  },
  {
    "id": "dc_eh_spz",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Schützenpanzer",
    "ap": 2,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "gepanzert",
      "kette",
      "fahrzeug",
      "mittel"
    ],
    "text": "Benachbarte Infanterie +1 ATK / +1 DEF.",
    "effects": [
      {
        "code": "MECH_AURA",
        "param": {
          "atk": 1,
          "def": 1
        }
      }
    ],
    "flavor": "Geben wir ihnen Deckung!",
    "image": "panzer/A066.jpg",
    "max_copies": 2,
    "collector": "A066",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_serienpanzer_28",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Serienpanzer",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Wird sie zerstört: ziehe 1 Karte.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "death",
          "do": "draw",
          "n": 1
        }
      }
    ],
    "flavor": "Zerstört heißt nachbestellt.",
    "image": "panzer/B028.jpg",
    "max_copies": 1,
    "collector": "B028",
    "rarity": "bronze",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_auftragskette_29",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Auftragskette",
    "ap": 3,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK gegen Ziele, die in diesem Zug Schaden erlitten haben.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "hit"
        }
      }
    ],
    "flavor": "Die Kette folgt dem Schaden — und dem Auftrag.",
    "image": "panzer/B029.jpg",
    "max_copies": 1,
    "collector": "B029",
    "rarity": "bronze",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_werkskeil_30",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Werkskeil",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Der Keil öffnet, die Rohre schreiben die Zeile.",
    "image": "panzer/B030.jpg",
    "max_copies": 1,
    "collector": "B030",
    "rarity": "silver",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_ersatzwalze_31",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Ersatzwalze",
    "ap": 3,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 DEF, wenn du in diesem Zug einen Soforteinsatz gespielt hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 0,
          "def": 1,
          "when": "played:Soforteinsatz"
        }
      }
    ],
    "flavor": "Neue Ketten, alter Auftrag.",
    "image": "panzer/B031.jpg",
    "max_copies": 1,
    "collector": "B031",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_quartalspanzer_32",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Quartalspanzer",
    "ap": 4,
    "atk": 5,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Kostet 1 AP weniger (mind. 1), wenn schon 2 eigene Einheiten zerstört wurden.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "losses:2"
        }
      }
    ],
    "flavor": "Schlechtes Quartal für den Feind. Gutes für das Buch.",
    "image": "panzer/B032.jpg",
    "max_copies": 1,
    "collector": "B032",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit"
    ]
  },
  {
    "id": "dc_b_schwere_lieferung_33",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Schwere Lieferung",
    "ap": 5,
    "atk": 5,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 1
        }
      }
    ],
    "flavor": "Die Ware kommt schwer — und heilend.",
    "image": "panzer/B033.jpg",
    "max_copies": 1,
    "collector": "B033",
    "rarity": "silver",
    "keywords": [
      "Abschirmung"
    ]
  },
  {
    "id": "dc_b_industriewalze_34",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Industriewalze",
    "ap": 4,
    "atk": 4,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Ohne Feuer kein Vorstoß. Ohne Vorstoß kein Verbrauch.",
    "image": "panzer/B034.jpg",
    "max_copies": 1,
    "collector": "B034",
    "rarity": "bronze",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_volltreffer_35",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Volltreffer",
    "ap": 5,
    "atk": 6,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "",
    "effects": [],
    "flavor": "Ein Treffer, der die nächste Bestellung schreibt.",
    "image": "panzer/B035.jpg",
    "max_copies": 1,
    "collector": "B035",
    "rarity": "gold",
    "keywords": [
      "Zähigkeit",
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_pflichtpanzer_3",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Pflichtpanzer",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 DEF, wenn du in diesem Zug Infanterie gespielt hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 0,
          "def": 1,
          "when": "played:Infanterie"
        }
      }
    ],
    "flavor": "Panzer der geschuldeten Pflicht. Keine Zugabe.",
    "image": "panzer/B003.jpg",
    "max_copies": 1,
    "collector": "B003",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_wellenpanzer_7",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Wellenpanzer",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 1
        }
      }
    ],
    "flavor": "Bricht die Welle, trägt die nächste.",
    "image": "panzer/B007.jpg",
    "max_copies": 1,
    "collector": "B007",
    "rarity": "bronze",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_werkspanzer_9",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Werkspanzer",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer"
    ],
    "text": "+1 DEF, solange eigene Infanterie benachbart ist.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 0,
          "def": 1,
          "when": "adj:infanterie"
        }
      }
    ],
    "flavor": "Vom Hof, nicht vom Hofstaat.",
    "image": "panzer/B009.jpg",
    "max_copies": 1,
    "collector": "B009",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_balkenwagen_10",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Balkenwagen",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer"
    ],
    "text": "Kostet 1 AP weniger (mind. 1), wenn du in diesem Zug Infanterie gespielt hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "played:Infanterie"
        }
      }
    ],
    "flavor": "Ein Balken auf Ketten.",
    "image": "panzer/B010.jpg",
    "max_copies": 1,
    "collector": "B010",
    "rarity": "bronze",
    "keywords": [
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_b_genossenschaftskette_11",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Genossenschaftskette",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Die Kette zieht die Reihe.",
    "image": "panzer/B011.jpg",
    "max_copies": 1,
    "collector": "B011",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_pflichtbrecher_12",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Pflichtbrecher",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Verlust ist Nachschub an Wille.",
    "image": "panzer/B012.jpg",
    "max_copies": 1,
    "collector": "B012",
    "rarity": "silver",
    "keywords": [
      "Erbitterung"
    ]
  },
  {
    "id": "dc_b_wellenkeil_13",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Wellenkeil",
    "ap": 4,
    "atk": 5,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer"
    ],
    "text": "Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "support"
        }
      }
    ],
    "flavor": "Drei Reihen, ein Keil.",
    "image": "panzer/B013.jpg",
    "max_copies": 1,
    "collector": "B013",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit"
    ]
  },
  {
    "id": "dc_b_rituspanzer_14",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Rituspanzer",
    "ap": 5,
    "atk": 5,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer"
    ],
    "text": "Wird sie zerstört: ziehe 1 Karte.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "death",
          "do": "draw",
          "n": 1
        }
      }
    ],
    "flavor": "Der Name bleibt. Der Stahl nicht.",
    "image": "panzer/B014.jpg",
    "max_copies": 1,
    "collector": "B014",
    "rarity": "gold",
    "keywords": [
      "Gefechtsbereit",
      "Zähigkeit"
    ]
  },
  {
    "id": "dc_b_kronpanzer_narbstadt_607",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Kronpanzer Narbstadt",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": true,
    "tags": [
      "panzer"
    ],
    "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "reveal",
          "n": 1
        }
      }
    ],
    "flavor": "Narbstadt unter dem Erlass. Die Krone wankt nicht.",
    "image": "panzer/B607.jpg",
    "max_copies": 1,
    "collector": "B607",
    "rarity": "bronze",
    "keywords": [
      "Ablösung"
    ]
  },
  {
    "id": "dc_b_erlasswagen_608",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Erlasswagen",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "support"
        }
      }
    ],
    "flavor": "Wagen des unfehlbaren Erlasses.",
    "image": "panzer/B608.jpg",
    "max_copies": 1,
    "collector": "B608",
    "rarity": "bronze",
    "keywords": [
      "Abschirmung"
    ]
  },
  {
    "id": "dc_b_kronpanzer_609",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Kronpanzer",
    "ap": 3,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "kette"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Stahl für den Namen, der nicht scheitern darf.",
    "image": "panzer/B609.jpg",
    "max_copies": 1,
    "collector": "B609",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_erbe_kette_610",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Erbe-Kette",
    "ap": 2,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "kette"
    ],
    "text": "+1 ATK, solange sie beschädigt ist.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "damaged"
        }
      }
    ],
    "flavor": "Alte Werkstatt. Neue Front.",
    "image": "panzer/B610.jpg",
    "max_copies": 1,
    "collector": "B610",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schwerpunktkeil_611",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Schwerpunktkeil",
    "ap": 4,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "kette"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Konzentration ist der einzige Befehl, der noch gilt.",
    "image": "panzer/B611.jpg",
    "max_copies": 1,
    "collector": "B611",
    "rarity": "silver",
    "keywords": [
      "Ablösung"
    ]
  },
  {
    "id": "dc_b_abloesungspanzer_612",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Ablösungspanzer",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "kette"
    ],
    "text": "Wird sie zerstört: ziehe 1 Karte.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "death",
          "do": "draw",
          "n": 1
        }
      }
    ],
    "flavor": "Maschine stirbt. Auftrag bleibt.",
    "image": "panzer/B612.jpg",
    "max_copies": 1,
    "collector": "B612",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_thronbruch_613",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Thronbruch",
    "ap": 5,
    "atk": 5,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "kette"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +2 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 2
        }
      }
    ],
    "flavor": "Was die Krone will, zahlt der Stahl voraus.",
    "image": "panzer/B613.jpg",
    "max_copies": 1,
    "collector": "B613",
    "rarity": "gold",
    "keywords": [
      "Durchschlag",
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_b_werkrott_kolonne_614",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Werkrott-Kolonne",
    "ap": 4,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "kette"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Die Werkmark liefert. Die Front verbraucht.",
    "image": "panzer/B614.jpg",
    "max_copies": 1,
    "collector": "B614",
    "rarity": "silver"
  },
  {
    "id": "dc_b_filterpanzer_365",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Filterpanzer",
    "ap": 3,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Filter im Stahl. Optimiert um den Preis.",
    "image": "panzer/B365.jpg",
    "max_copies": 1,
    "collector": "B365",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_ersatzkeil_366",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Ersatzkeil",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK, solange sie beschädigt ist.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "damaged"
        }
      }
    ],
    "flavor": "Keil aus Ersatzkörpern. System hält.",
    "image": "panzer/B366.jpg",
    "max_copies": 1,
    "collector": "B366",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nervenpanzer_369",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Nervenpanzer",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "kette"
    ],
    "text": "+1 ATK, solange sie beschädigt ist.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "damaged"
        }
      }
    ],
    "flavor": "Fahrer und Maschine teilen denselben Schmerz.",
    "image": "panzer/B369.jpg",
    "max_copies": 1,
    "collector": "B369",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_knochenkette_370",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Knochenkette",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "kette"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Stahl stützt das, was noch Fleisch ist.",
    "image": "panzer/B370.jpg",
    "max_copies": 1,
    "collector": "B370",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_stosskeil_371",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Stoßkeil",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "kette"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Durchbruch vor Überleben.",
    "image": "panzer/B371.jpg",
    "max_copies": 1,
    "collector": "B371",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit",
      "Überlast"
    ]
  },
  {
    "id": "dc_b_wartungskolonne_372",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Wartungskolonne",
    "ap": 4,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "kette"
    ],
    "text": "Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 1
        }
      }
    ],
    "flavor": "Ersatz aus dem Nachbarn.",
    "image": "panzer/B372.jpg",
    "max_copies": 1,
    "collector": "B372",
    "rarity": "silver"
  },
  {
    "id": "dc_b_leistungspanzer_373",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Leistungspanzer",
    "ap": 4,
    "atk": 5,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "kette"
    ],
    "text": "+2 ATK, solange sie beschädigt ist.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 2,
          "when": "damaged"
        }
      }
    ],
    "flavor": "Jeder Riss hebt die Quote.",
    "image": "panzer/B373.jpg",
    "max_copies": 1,
    "collector": "B373",
    "rarity": "silver",
    "keywords": [
      "Ablösung"
    ]
  },
  {
    "id": "dc_b_systemstoss_374",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Systemstoß",
    "ap": 5,
    "atk": 6,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "kette"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +3 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 3
        }
      }
    ],
    "flavor": "Der Staat misst nur den Einschlag.",
    "image": "panzer/B374.jpg",
    "max_copies": 1,
    "collector": "B374",
    "rarity": "gold",
    "keywords": [
      "Gefechtsbereit",
      "Zähigkeit"
    ]
  },
  {
    "id": "dc_b_sensorwagen_787",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Sensorwagen",
    "ap": 2,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "draw",
          "n": 1
        }
      }
    ],
    "flavor": "Wagen sieht früher. Er thront nicht.",
    "image": "panzer/B787.jpg",
    "max_copies": 1,
    "collector": "B787",
    "rarity": "bronze",
    "keywords": [
      "Sicherung"
    ]
  },
  {
    "id": "dc_b_verbindungskette_788",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Verbindungskette",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK gegen beobachtete Ziele.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "observed"
        }
      }
    ],
    "flavor": "Kette hält, solange die Leitung hält.",
    "image": "panzer/B788.jpg",
    "max_copies": 1,
    "collector": "B788",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_olivkeil_789",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Olivkeil",
    "ap": 3,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Oliv mit Sandstreifen — Arbeitskleidung.",
    "image": "panzer/B789.jpg",
    "max_copies": 1,
    "collector": "B789",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_kurzkrieg_wagen_790",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Kurzkrieg-Wagen",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK, wenn du in diesem Zug einen Soforteinsatz gespielt hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "played:Soforteinsatz"
        }
      }
    ],
    "flavor": "Kurz halten. Ausnahme nicht zum Kalender.",
    "image": "panzer/B790.jpg",
    "max_copies": 1,
    "collector": "B790",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit"
    ]
  },
  {
    "id": "dc_b_lydon_traeger_791",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Lydon-Träger",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "draw",
          "n": 1
        }
      }
    ],
    "flavor": "Energie und Gerät — ohne Denkmal.",
    "image": "panzer/B791.jpg",
    "max_copies": 1,
    "collector": "B791",
    "rarity": "bronze",
    "keywords": [
      "Sicherung"
    ]
  },
  {
    "id": "dc_b_rasterpanzer_792",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Rasterpanzer",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK und +1 DEF, solange eine gegnerische Einheit beobachtet ist.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "def": 1,
          "when": "observed"
        }
      }
    ],
    "flavor": "Panzer dem Raster. Nicht der Halle allein.",
    "image": "panzer/B792.jpg",
    "max_copies": 1,
    "collector": "B792",
    "rarity": "silver"
  },
  {
    "id": "dc_b_fruehstoss_793",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Frühstoß",
    "ap": 4,
    "atk": 4,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Zerstört sie im Angriff eine Einheit: markiere 1 Feind als beobachtet.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "observe",
          "n": 1
        }
      }
    ],
    "flavor": "Stoß nach neuer Lage. Alte Daten sind Irrtum.",
    "image": "panzer/B793.jpg",
    "max_copies": 1,
    "collector": "B793",
    "rarity": "silver"
  },
  {
    "id": "dc_b_aufklaerungspanzer_794",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Aufklärungspanzer",
    "ap": 5,
    "atk": 5,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+2 ATK gegen beobachtete Ziele.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 2,
          "vs": "observed"
        }
      }
    ],
    "flavor": "Aufklärungspanzer — Augen vor dem Keil.",
    "image": "panzer/B794.jpg",
    "max_copies": 1,
    "collector": "B794",
    "rarity": "gold",
    "keywords": [
      "Gefechtsbereit"
    ]
  },
  {
    "id": "dc_b_aktenwagen_847",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Aktenwagen",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Wagen trägt Akten. Nicht Glauben.",
    "image": "panzer/B847.jpg",
    "max_copies": 1,
    "collector": "B847",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_scheinkeil_848",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Scheinkeil",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +2 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 2
        }
      }
    ],
    "flavor": "Keil hält hier. Stoß dort.",
    "image": "panzer/B848.jpg",
    "max_copies": 1,
    "collector": "B848",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_olivsiegel_wagen_849",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Olivsiegel-Wagen",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Stumpfes Oliv. Schwarzes Siegel.",
    "image": "panzer/B849.jpg",
    "max_copies": 1,
    "collector": "B849",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_lagepanzer_850",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Lagepanzer",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK und +1 DEF, wenn sie seit deinem letzten Zug nicht versetzt wurde.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "def": 1,
          "when": "still"
        }
      }
    ],
    "flavor": "Panzer einer gesetzten Lage.",
    "image": "panzer/B850.jpg",
    "max_copies": 1,
    "collector": "B850",
    "rarity": "bronze",
    "keywords": [
      "Abschirmung"
    ]
  },
  {
    "id": "dc_b_archive_keil_851",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Archive-Keil",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Kostet 1 AP weniger (mind. 1), solange eigene Infanterie an der Front steht.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "unit:infanterie"
        }
      }
    ],
    "flavor": "Keil aus dem Archivviertel.",
    "image": "panzer/B851.jpg",
    "max_copies": 1,
    "collector": "B851",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_zwei_versionen_852",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Zwei-Versionen",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 DEF, solange du eine offene Unterstützung hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 0,
          "def": 1,
          "when": "support"
        }
      }
    ],
    "flavor": "Zwei Versionen. Ein Wagen.",
    "image": "panzer/B852.jpg",
    "max_copies": 1,
    "collector": "B852",
    "rarity": "silver"
  },
  {
    "id": "dc_b_abriegelwagen_853",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Abriegelwagen",
    "ap": 4,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK, wenn du in diesem Zug einen Soforteinsatz gespielt hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "played:Soforteinsatz"
        }
      }
    ],
    "flavor": "Wagen riegelt. Leer bleibt leer.",
    "image": "panzer/B853.jpg",
    "max_copies": 1,
    "collector": "B853",
    "rarity": "silver"
  },
  {
    "id": "dc_b_scheinschwerpunkt_keil_854",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Scheinschwerpunkt-Keil",
    "ap": 5,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Scheinschwerpunkt-Keil — Stahl folgt dem Blick.",
    "image": "panzer/B854.jpg",
    "max_copies": 1,
    "collector": "B854",
    "rarity": "gold",
    "keywords": [
      "Stellungswechsel",
      "Ablösung"
    ]
  },
  {
    "id": "dc_b_haftwagen_907",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Haftwagen",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "draw",
          "n": 1
        }
      }
    ],
    "flavor": "Wagen eines haftenden Hauses.",
    "image": "panzer/B907.jpg",
    "max_copies": 1,
    "collector": "B907",
    "rarity": "bronze",
    "keywords": [
      "Sicherung"
    ]
  },
  {
    "id": "dc_b_kai_keil_908",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Kai-Keil",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +2 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 2
        }
      }
    ],
    "flavor": "Keil am Kai. Name trägt.",
    "image": "panzer/B908.jpg",
    "max_copies": 1,
    "collector": "B908",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nussbraun_wagen_909",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Nussbraun-Wagen",
    "ap": 3,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +2 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 2
        }
      }
    ],
    "flavor": "Nussbraun. Manschette hell.",
    "image": "panzer/B909.jpg",
    "max_copies": 1,
    "collector": "B909",
    "rarity": "bronze",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_aufrufpanzer_910",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Aufrufpanzer",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +2 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 2
        }
      }
    ],
    "flavor": "Panzer der genannten Zeile.",
    "image": "panzer/B910.jpg",
    "max_copies": 1,
    "collector": "B910",
    "rarity": "bronze",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_brunn_keil_911",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Brunn-Keil",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK und +1 DEF, wenn sie seit deinem letzten Zug nicht versetzt wurde.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "def": 1,
          "when": "still"
        }
      }
    ],
    "flavor": "Keil aus Brunn. Werk haftet.",
    "image": "panzer/B911.jpg",
    "max_copies": 1,
    "collector": "B911",
    "rarity": "bronze",
    "keywords": [
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_b_zwei_daten_912",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Zwei Daten",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK, wenn du in diesem Zug einen Soforteinsatz gespielt hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "played:Soforteinsatz"
        }
      }
    ],
    "flavor": "Früheres Datum entscheidet.",
    "image": "panzer/B912.jpg",
    "max_copies": 1,
    "collector": "B912",
    "rarity": "silver"
  },
  {
    "id": "dc_b_abschlusswagen_913",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Abschlusswagen",
    "ap": 4,
    "atk": 4,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 DEF, solange du eine offene Unterstützung hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 0,
          "def": 1,
          "when": "support"
        }
      }
    ],
    "flavor": "Wagen schließt. Haus bleibt.",
    "image": "panzer/B913.jpg",
    "max_copies": 1,
    "collector": "B913",
    "rarity": "silver",
    "keywords": [
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_b_zielangriff_keil_914",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Zielangriff-Keil",
    "ap": 5,
    "atk": 5,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +2 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 2
        }
      }
    ],
    "flavor": "Zielangriff-Keil — genannt und durchbrochen.",
    "image": "panzer/B914.jpg",
    "max_copies": 1,
    "collector": "B914",
    "rarity": "gold",
    "keywords": [
      "Zähigkeit",
      "Überlast"
    ]
  },
  {
    "id": "dc_b_stellungspanzer_727",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Stellungspanzer",
    "ap": 2,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 DEF, solange du eine offene Unterstützung hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 0,
          "def": 1,
          "when": "support"
        }
      }
    ],
    "flavor": "Panzer für die Stellung, nicht den Paradeplatz.",
    "image": "panzer/B727.jpg",
    "max_copies": 1,
    "collector": "B727",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_auffangkeil_728",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Auffangkeil",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "",
    "effects": [],
    "flavor": "Keil fängt den Stoß.",
    "image": "panzer/B728.jpg",
    "max_copies": 1,
    "collector": "B728",
    "rarity": "bronze",
    "keywords": [
      "Abschirmung",
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_markenwagen_729",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Markenwagen",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK, wenn du in diesem Zug einen Soforteinsatz gespielt hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "played:Soforteinsatz"
        }
      }
    ],
    "flavor": "Wagen aus der Mark — langsam und haltbar.",
    "image": "panzer/B729.jpg",
    "max_copies": 1,
    "collector": "B729",
    "rarity": "bronze",
    "keywords": [
      "Abschirmung"
    ]
  },
  {
    "id": "dc_b_gegenstosswagen_730",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Gegenstoßwagen",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK, wenn sie in diesem Zug Schaden erlitten hat.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "hurt"
        }
      }
    ],
    "flavor": "Gegenstoß — erst halten, dann treten.",
    "image": "panzer/B730.jpg",
    "max_copies": 1,
    "collector": "B730",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_flussufer_keil_731",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Flussufer-Keil",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Kostet 1 AP weniger (mind. 1), solange eigene Infanterie an der Front steht.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "unit:infanterie"
        }
      }
    ],
    "flavor": "Keil am Fluss — Kahn ist keine Front.",
    "image": "panzer/B731.jpg",
    "max_copies": 1,
    "collector": "B731",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kronland_panzer_732",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Kronland-Panzer",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Panzer im Kronland — Dauer vor Tempo.",
    "image": "panzer/B732.jpg",
    "max_copies": 1,
    "collector": "B732",
    "rarity": "silver",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_doppelstellung_733",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Doppelstellung",
    "ap": 4,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Zwei Stellungen. Ein Name.",
    "image": "panzer/B733.jpg",
    "max_copies": 1,
    "collector": "B733",
    "rarity": "silver",
    "keywords": [
      "Zähigkeit"
    ]
  },
  {
    "id": "dc_b_gegenstosskeil_734",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Gegenstoßkeil",
    "ap": 5,
    "atk": 5,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 1
        }
      }
    ],
    "flavor": "Gegenstoßkeil — Auffangen endet im Stahl.",
    "image": "panzer/B734.jpg",
    "max_copies": 1,
    "collector": "B734",
    "rarity": "gold",
    "keywords": [
      "Ablösung"
    ]
  },
  {
    "id": "dc_b_etappenkeil_49",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Etappenkeil",
    "ap": 3,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "",
    "effects": [],
    "flavor": "Der Keil öffnet den Weg — er ist nicht die Lizenz.",
    "image": "panzer/B049.jpg",
    "max_copies": 1,
    "collector": "B049",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_kolonnenpanzer_50",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Kolonnenpanzer",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 DEF, wenn sie in diesem Zug versetzt wurde.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 0,
          "def": 1,
          "when": "moved"
        }
      }
    ],
    "flavor": "Die Kolonne hält, solange der Weg zählt.",
    "image": "panzer/B050.jpg",
    "max_copies": 1,
    "collector": "B050",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_brueckenkopf_51",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Brückenkopf",
    "ap": 4,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK, wenn sie in diesem Zug versetzt wurde.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "moved"
        }
      }
    ],
    "flavor": "Brückenkopf heißt: eigener Kai, eigene Straße.",
    "image": "panzer/B051.jpg",
    "max_copies": 1,
    "collector": "B051",
    "rarity": "silver"
  },
  {
    "id": "dc_b_reservelinie_52",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Reservelinie",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "",
    "effects": [],
    "flavor": "Reserve ist nicht Entlassung.",
    "image": "panzer/B052.jpg",
    "max_copies": 1,
    "collector": "B052",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_hafenring_walze_53",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Hafenring-Walze",
    "ap": 4,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Kostet 1 AP weniger (mind. 1), solange eigene Infanterie an der Front steht.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "unit:infanterie"
        }
      }
    ],
    "flavor": "Im Hafenring liegen die Listen, bevor die Rede kommt.",
    "image": "panzer/B053.jpg",
    "max_copies": 1,
    "collector": "B053",
    "rarity": "bronze",
    "keywords": [
      "Zähigkeit"
    ]
  },
  {
    "id": "dc_b_neuport_schild_54",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Neuport-Schild",
    "ap": 4,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 1
        }
      }
    ],
    "flavor": "Erz und Fisch hinaus. Medizin und Papier hinein.",
    "image": "panzer/B054.jpg",
    "max_copies": 1,
    "collector": "B054",
    "rarity": "silver",
    "keywords": [
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_b_port_meris_keil_55",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Port-Meris-Keil",
    "ap": 3,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK gegen Ziele, die in diesem Zug Schaden erlitten haben.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "hit"
        }
      }
    ],
    "flavor": "Kein milderes Recht. Anderer Kai.",
    "image": "panzer/B055.jpg",
    "max_copies": 1,
    "collector": "B055",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_letzte_stellung_56",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Letzte Stellung",
    "ap": 5,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK und +1 DEF, solange du keine Unterstützung hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "def": 1,
          "when": "nosupport"
        }
      }
    ],
    "flavor": "Abgeschnitten steht sie trotzdem. Das hebt den Befehl nicht auf.",
    "image": "panzer/B056.jpg",
    "max_copies": 1,
    "collector": "B056",
    "rarity": "gold"
  },
  {
    "id": "dc_b_umschlagwagen_667",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Umschlagwagen",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK, wenn sie in diesem Zug versetzt wurde.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "moved"
        }
      }
    ],
    "flavor": "Wagen aus dem Umschlag — nicht aus dem Denkmal.",
    "image": "panzer/B667.jpg",
    "max_copies": 1,
    "collector": "B667",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_flankenkeil_668",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Flankenkeil",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Keil nimmt den Umweg.",
    "image": "panzer/B668.jpg",
    "max_copies": 1,
    "collector": "B668",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_lagerkeil_669",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Lagerkeil",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Kostet 1 AP weniger (mind. 1), solange eigene Infanterie an der Front steht.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "unit:infanterie"
        }
      }
    ],
    "flavor": "Keil aus Speich — wenn die Halle fließt.",
    "image": "panzer/B669.jpg",
    "max_copies": 1,
    "collector": "B669",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_knotenwagen_670",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Knotenwagen",
    "ap": 3,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1, wenn du in diesem Zug einen Soforteinsatz gespielt hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1,
          "when": "played:Soforteinsatz"
        }
      }
    ],
    "flavor": "Knoten offen. Panzer trotzdem.",
    "image": "panzer/B670.jpg",
    "max_copies": 1,
    "collector": "B670",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_pfadkeil_671",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Pfadkeil",
    "ap": 3,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "",
    "effects": [],
    "flavor": "Pfad vor Stellung.",
    "image": "panzer/B671.jpg",
    "max_copies": 1,
    "collector": "B671",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_flankenpanzer_672",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Flankenpanzer",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "draw",
          "n": 1
        }
      }
    ],
    "flavor": "Panzer umgeht. Er thront nicht.",
    "image": "panzer/B672.jpg",
    "max_copies": 1,
    "collector": "B672",
    "rarity": "silver",
    "keywords": [
      "Gefechtsbereit"
    ]
  },
  {
    "id": "dc_b_doppelkolonnen_keil_673",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Doppelkolonnen-Keil",
    "ap": 4,
    "atk": 4,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK und +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "def": 1,
          "when": "pair"
        }
      }
    ],
    "flavor": "Zwei Kolonnen. Ein Fluss.",
    "image": "panzer/B673.jpg",
    "max_copies": 1,
    "collector": "B673",
    "rarity": "silver",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_flankenstoss_674",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Flankenstoß",
    "ap": 5,
    "atk": 5,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "",
    "effects": [],
    "flavor": "Stoß von der Seite. Stillstand stirbt zuerst.",
    "image": "panzer/B674.jpg",
    "max_copies": 1,
    "collector": "B674",
    "rarity": "gold",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_normwagen_547",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Normwagen",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK gegen beobachtete Ziele.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "observed"
        }
      }
    ],
    "flavor": "Wagen nach Liste. Nicht nach Ruhm.",
    "image": "panzer/B547.jpg",
    "max_copies": 1,
    "collector": "B547",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit"
    ]
  },
  {
    "id": "dc_b_depotkeil_548",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Depotkeil",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "support"
        }
      }
    ],
    "flavor": "Keil aus dem Depot — wenn freigegeben.",
    "image": "panzer/B548.jpg",
    "max_copies": 1,
    "collector": "B548",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_bahnkeil_549",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Bahnkeil",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK gegen beobachtete Ziele.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "observed"
        }
      }
    ],
    "flavor": "Bahn trägt. Stab öffnet sie nicht.",
    "image": "panzer/B549.jpg",
    "max_copies": 1,
    "collector": "B549",
    "rarity": "bronze",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_kommissionswagen_550",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Kommissionswagen",
    "ap": 3,
    "atk": 2,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1, solange du eine offene Unterstützung hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1,
          "when": "support"
        }
      }
    ],
    "flavor": "Kommission zählt mit.",
    "image": "panzer/B550.jpg",
    "max_copies": 1,
    "collector": "B550",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit"
    ]
  },
  {
    "id": "dc_b_standardkeil_551",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Standardkeil",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug aufgedeckt hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "trigger",
          "on": "played",
          "do": "draw",
          "n": 1,
          "when": "revealed"
        }
      }
    ],
    "flavor": "Standard. Wartbar. Gleich genug.",
    "image": "panzer/B551.jpg",
    "max_copies": 1,
    "collector": "B551",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_normpanzer_552",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Normpanzer",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "reveal",
          "n": 1
        }
      }
    ],
    "flavor": "Normpanzer — Gerät, kein Held.",
    "image": "panzer/B552.jpg",
    "max_copies": 1,
    "collector": "B552",
    "rarity": "silver",
    "keywords": [
      "Abschirmung"
    ]
  },
  {
    "id": "dc_b_vollverband_keil_553",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Vollverband-Keil",
    "ap": 4,
    "atk": 4,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +2 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 2
        }
      }
    ],
    "flavor": "Vollverband, sobald Papier liegt.",
    "image": "panzer/B553.jpg",
    "max_copies": 1,
    "collector": "B553",
    "rarity": "silver"
  },
  {
    "id": "dc_b_methodenschlag_554",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Methodenschlag",
    "ap": 5,
    "atk": 5,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+3 ATK gegen beobachtete Ziele.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 3,
          "vs": "observed"
        }
      }
    ],
    "flavor": "Methode schlägt. Laune nicht.",
    "image": "panzer/B554.jpg",
    "max_copies": 1,
    "collector": "B554",
    "rarity": "gold",
    "keywords": [
      "Ablösung",
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_entsatzkolonne_487",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Entsatzkolonne",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "",
    "effects": [],
    "flavor": "Kolonne auf dem Boden. Nicht auf dem Wasser.",
    "image": "panzer/B487.jpg",
    "max_copies": 1,
    "collector": "B487",
    "rarity": "bronze",
    "keywords": [
      "Abschirmung",
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_volle_kolonne_488",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Volle Kolonne",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 DEF, solange du eine offene Unterstützung hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 0,
          "def": 1,
          "when": "support"
        }
      }
    ],
    "flavor": "Volle Kolonne — und trotzdem fehlt ein Sack.",
    "image": "panzer/B488.jpg",
    "max_copies": 1,
    "collector": "B488",
    "rarity": "silver"
  },
  {
    "id": "dc_b_bahnstadt_keil_489",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Bahnstadt-Keil",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK, solange du eine offene Unterstützung hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "support"
        }
      }
    ],
    "flavor": "Bahnstadt hält Namar zusammen.",
    "image": "panzer/B489.jpg",
    "max_copies": 1,
    "collector": "B489",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_solkai_traeger_490",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Solkai-Träger",
    "ap": 3,
    "atk": 2,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +2 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 2
        }
      }
    ],
    "flavor": "Werft baut Ladung. Keine Schlachtlinie.",
    "image": "panzer/B490.jpg",
    "max_copies": 1,
    "collector": "B490",
    "rarity": "bronze",
    "keywords": [
      "Abschirmung"
    ]
  },
  {
    "id": "dc_b_strassenriegel_491",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Straßenriegel",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "",
    "effects": [],
    "flavor": "Stellung an der Straße. Nicht auf See.",
    "image": "panzer/B491.jpg",
    "max_copies": 1,
    "collector": "B491",
    "rarity": "bronze",
    "keywords": [
      "Abschirmung",
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_lagerwagen_492",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Lagerwagen",
    "ap": 3,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "support"
        }
      }
    ],
    "flavor": "Lager fährt. Deck entscheidet nichts.",
    "image": "panzer/B492.jpg",
    "max_copies": 1,
    "collector": "B492",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_entsatzbataillon_493",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Entsatzbataillon",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Entsatz kleiner angekommen — und hält.",
    "image": "panzer/B493.jpg",
    "max_copies": 1,
    "collector": "B493",
    "rarity": "silver",
    "keywords": [
      "Abschirmung"
    ]
  },
  {
    "id": "dc_b_entsatzschlag_494",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Entsatzschlag",
    "ap": 5,
    "atk": 5,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "",
    "effects": [],
    "flavor": "Schlag, weil der Satz fällig ist.",
    "image": "panzer/B494.jpg",
    "max_copies": 1,
    "collector": "B494",
    "rarity": "gold",
    "keywords": [
      "Staffelangriff",
      "Ablösung"
    ]
  },
  {
    "id": "dc_b_tunnelkeil_70",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Tunnelkeil",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Tunnel gehören dem Tal, das sie trägt.",
    "image": "panzer/B070.jpg",
    "max_copies": 1,
    "collector": "B070",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_engenwalze_71",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Engenwalze",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "entering"
        }
      }
    ],
    "flavor": "Stellungen in den Engen — nicht der Sitz.",
    "image": "panzer/B071.jpg",
    "max_copies": 1,
    "collector": "B071",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_passhaus_schild_72",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Passhaus-Schild",
    "ap": 4,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Zoll ist Arbeit und Streit. Nicht die Regierung.",
    "image": "panzer/B072.jpg",
    "max_copies": 1,
    "collector": "B072",
    "rarity": "silver",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_hangpanzer_73",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Hangpanzer",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Ein zu großes Haus wird argwöhnisch angesehen.",
    "image": "panzer/B073.jpg",
    "max_copies": 1,
    "collector": "B073",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_leserbach_keil_74",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Leserbach-Keil",
    "ap": 4,
    "atk": 4,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Kostet 1 AP weniger (mind. 1), wenn du in 2+ Abschnitten Einheiten hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "sections:2"
        }
      }
    ],
    "flavor": "Klein und oft geschickt — kein Amt.",
    "image": "panzer/B074.jpg",
    "max_copies": 1,
    "collector": "B074",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_steinriegel_75",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Steinriegel",
    "ap": 4,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "entering"
        }
      }
    ],
    "flavor": "Der Riegel hält den Weg. Er wird kein Depot.",
    "image": "panzer/B075.jpg",
    "max_copies": 1,
    "collector": "B075",
    "rarity": "silver",
    "keywords": [
      "Zähigkeit"
    ]
  },
  {
    "id": "dc_b_aschen_kette_76",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Aschen-Kette",
    "ap": 3,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK, wenn in diesem Zug eine eigene Einheit zerstört wurde.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "lost"
        }
      }
    ],
    "flavor": "Das Feuer entscheidet nicht, ob gerufen werden kann.",
    "image": "panzer/B076.jpg",
    "max_copies": 1,
    "collector": "B076",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_letzter_pass_77",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Letzter Pass",
    "ap": 5,
    "atk": 4,
    "def": 6,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+2 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 2,
          "vs": "entering"
        }
      }
    ],
    "flavor": "Wer den Pass nimmt, nimmt dieses Tal. Nicht den Bund.",
    "image": "panzer/B077.jpg",
    "max_copies": 1,
    "collector": "B077",
    "rarity": "gold"
  },
  {
    "id": "dc_b_versorgungskeil_307",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Versorgungskeil",
    "ap": 3,
    "atk": 2,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 1
        }
      }
    ],
    "flavor": "Essen und Ersatz über dieselben Listen.",
    "image": "panzer/B307.jpg",
    "max_copies": 1,
    "collector": "B307",
    "rarity": "bronze",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_etappenwagen_308",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Etappenwagen",
    "ap": 3,
    "atk": 2,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1, solange du eine offene Unterstützung hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1,
          "when": "support"
        }
      }
    ],
    "flavor": "Die Etappe ist kein Nebenschauplatz.",
    "image": "panzer/B308.jpg",
    "max_copies": 1,
    "collector": "B308",
    "rarity": "bronze",
    "keywords": [
      "Abschirmung"
    ]
  },
  {
    "id": "dc_b_klinikschild_309",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Klinikschild",
    "ap": 4,
    "atk": 3,
    "def": 6,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 1
        }
      }
    ],
    "flavor": "Bett und Panzerung aus derselben Hand.",
    "image": "panzer/B309.jpg",
    "max_copies": 1,
    "collector": "B309",
    "rarity": "silver"
  },
  {
    "id": "dc_b_wohnblock_riegel_310",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Wohnblock-Riegel",
    "ap": 3,
    "atk": 1,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Planblock hält. Nicht aus Prunk.",
    "image": "panzer/B310.jpg",
    "max_copies": 1,
    "collector": "B310",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_notfalltraeger_311",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Notfallträger",
    "ap": 4,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Beim Ausspielen: heile 2 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 2
        }
      }
    ],
    "flavor": "Krise gehört zusammen — Verband und Amt.",
    "image": "panzer/B311.jpg",
    "max_copies": 1,
    "collector": "B311",
    "rarity": "bronze",
    "keywords": [
      "Zähigkeit"
    ]
  },
  {
    "id": "dc_b_forumspanzer_312",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Forumspanzer",
    "ap": 4,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 1
        }
      }
    ],
    "flavor": "Militär und innere Sicherheit sehen dieselbe Lage.",
    "image": "panzer/B312.jpg",
    "max_copies": 1,
    "collector": "B312",
    "rarity": "silver"
  },
  {
    "id": "dc_b_zuteilungsraeumer_313",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Zuteilungsräumer",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "support"
        }
      }
    ],
    "flavor": "Zuteilung vor dem Angriff.",
    "image": "panzer/B313.jpg",
    "max_copies": 1,
    "collector": "B313",
    "rarity": "bronze",
    "keywords": [
      "Zähigkeit"
    ]
  },
  {
    "id": "dc_b_schildwall_314",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Schildwall",
    "ap": 5,
    "atk": 3,
    "def": 6,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Schützen, dann ruhen. Nicht opfern.",
    "image": "panzer/B314.jpg",
    "max_copies": 1,
    "collector": "B314",
    "rarity": "gold"
  },
  {
    "id": "dc_b_knochenkeil_91",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Knochenkeil",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 DEF, solange sie Ausrüstung trägt.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 0,
          "def": 1,
          "when": "equipped"
        }
      }
    ],
    "flavor": "Erinnerung als Schild, nicht als Trophäe.",
    "image": "panzer/B091.jpg",
    "max_copies": 1,
    "collector": "B091",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_werkhof_schild_92",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Werkhof-Schild",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1, solange sie Ausrüstung trägt.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1,
          "when": "equipped"
        }
      }
    ],
    "flavor": "Schwarz vom Öl. Hell bleibt das Amt.",
    "image": "panzer/B092.jpg",
    "max_copies": 1,
    "collector": "B092",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_ossar_walze_93",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Ossar-Walze",
    "ap": 4,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK und +1 DEF, solange sie Ausrüstung trägt.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "def": 1,
          "when": "equipped"
        }
      }
    ],
    "flavor": "Familie Oss baut Schutz. Keine Prunkplatten.",
    "image": "panzer/B093.jpg",
    "max_copies": 1,
    "collector": "B093",
    "rarity": "silver",
    "keywords": [
      "Zähigkeit"
    ]
  },
  {
    "id": "dc_b_grenzplatte_94",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Grenzplatte",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Halten, damit kein neuer Name kommt.",
    "image": "panzer/B094.jpg",
    "max_copies": 1,
    "collector": "B094",
    "rarity": "bronze",
    "keywords": [
      "Zähigkeit"
    ]
  },
  {
    "id": "dc_b_linsenpanzer_95",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Linsenpanzer",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "",
    "effects": [],
    "flavor": "Die Linse sieht. Sie bewertet nicht.",
    "image": "panzer/B095.jpg",
    "max_copies": 1,
    "collector": "B095",
    "rarity": "bronze",
    "keywords": [
      "Abschirmung",
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_altenfeld_riegel_96",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Altenfeld-Riegel",
    "ap": 4,
    "atk": 2,
    "def": 6,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Alte Platten. Kein Hunger nach neuen.",
    "image": "panzer/B096.jpg",
    "max_copies": 1,
    "collector": "B096",
    "rarity": "silver"
  },
  {
    "id": "dc_b_eron_traeger_97",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Eron-Träger",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Kostet 1 AP weniger (mind. 1), solange eine eigene Einheit Ausrüstung trägt.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "gear"
        }
      }
    ],
    "flavor": "Glas und Traglast vor dem Zeichen.",
    "image": "panzer/B097.jpg",
    "max_copies": 1,
    "collector": "B097",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_totenwall_keil_98",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Totenwall-Keil",
    "ap": 5,
    "atk": 4,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+2 ATK und +2 DEF, solange sie Ausrüstung trägt.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 2,
          "def": 2,
          "when": "equipped"
        }
      }
    ],
    "flavor": "Der Wall schützt Lebende. Er füllt sich nicht.",
    "image": "panzer/B098.jpg",
    "max_copies": 1,
    "collector": "B098",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_sensorkeil_427",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Sensorkeil",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK gegen beobachtete Ziele.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "observed"
        }
      }
    ],
    "flavor": "Gerät erkennt. Es regiert nicht.",
    "image": "panzer/B427.jpg",
    "max_copies": 1,
    "collector": "B427",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_modelltraeger_428",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Modellträger",
    "ap": 3,
    "atk": 2,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+1 ATK gegen beobachtete Ziele.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "observed"
        }
      }
    ],
    "flavor": "Prognose hält — bis sie nicht hält.",
    "image": "panzer/B428.jpg",
    "max_copies": 1,
    "collector": "B428",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_asteron_schild_429",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Asteron-Schild",
    "ap": 4,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Beim Ausspielen: markiere 1 Feind als beobachtet.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "observe",
          "n": 1
        }
      }
    ],
    "flavor": "Institutsgürtel misst. Der Saal entscheidet.",
    "image": "panzer/B429.jpg",
    "max_copies": 1,
    "collector": "B429",
    "rarity": "silver",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_werkbach_riegel_430",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Werkbach-Riegel",
    "ap": 3,
    "atk": 2,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Beim Ausspielen: markiere 1 Feind als beobachtet.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "observe",
          "n": 1
        }
      }
    ],
    "flavor": "Werkhöfe halten Erkenntnis am Laufen.",
    "image": "panzer/B430.jpg",
    "max_copies": 1,
    "collector": "B430",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_probenpanzer_431",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Probenpanzer",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Beim Ausspielen: markiere 1 Feind als beobachtet.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "observe",
          "n": 1
        }
      }
    ],
    "flavor": "Objekt und Subjekt zugleich — vorsichtig.",
    "image": "panzer/B431.jpg",
    "max_copies": 1,
    "collector": "B431",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_abbruchkeil_432",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Abbruchkeil",
    "ap": 4,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "draw",
          "n": 1
        }
      }
    ],
    "flavor": "Falsches Modell wird abgebrochen.",
    "image": "panzer/B432.jpg",
    "max_copies": 1,
    "collector": "B432",
    "rarity": "silver",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_messwagen_433",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Messwagen",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "Kostet 1 AP weniger (mind. 1), solange eine gegnerische Einheit beobachtet ist.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "observed"
        }
      }
    ],
    "flavor": "Messung vor Marsch.",
    "image": "panzer/B433.jpg",
    "max_copies": 1,
    "collector": "B433",
    "rarity": "bronze",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_einzelschuss_434",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Einzelschuss",
    "ap": 5,
    "atk": 5,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "panzer"
    ],
    "text": "+2 ATK gegen beobachtete Ziele.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 2,
          "vs": "observed"
        }
      }
    ],
    "flavor": "Punkt statt Fläche. Unterschrift bleibt.",
    "image": "panzer/B434.jpg",
    "max_copies": 1,
    "collector": "B434",
    "rarity": "gold"
  }
];
