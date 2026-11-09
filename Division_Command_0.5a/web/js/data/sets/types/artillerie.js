window.DC_SET_TYPES = window.DC_SET_TYPES || {};
window.DC_SET_TYPES["Artillerie"] = [
  {
    "id": "dc_eh_haubitze",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Haubitzenzug",
    "ap": 4,
    "atk": 6,
    "def": 4,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "steilfeuer-ii",
      "artillerie",
      "gepanzert",
      "kette",
      "mittel",
      "fahrzeug",
      "stellung"
    ],
    "text": "Steilfeuer II.",
    "effects": [
      {
        "code": "RELOCATE_HIDE"
      }
    ],
    "flavor": "Verheerende Wirkung aus sicherer Entfernung.",
    "image": "artillerie/A051.jpg",
    "max_copies": 2,
    "collector": "A051",
    "keywords": [
      "Platztausch",
      "Absetzen"
    ],
    "rules": [
      "Steilfeuer II."
    ]
  },
  {
    "id": "dc_eh_moerser",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Mörser-Team",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "steilfeuer-i",
      "infanterie",
      "artillerie",
      "stellung",
      "leicht",
      "moerser"
    ],
    "text": "Steilfeuer I.",
    "effects": [],
    "flavor": "Ein Schuss ein Treffer! Aber wir nehmen sicherheitshalber drei…",
    "image": "artillerie/A059.jpg",
    "max_copies": 2,
    "collector": "A059",
    "keywords": [
      "Fernschuss"
    ],
    "rules": [
      "Steilfeuer I."
    ]
  },
  {
    "id": "dc_eh_viper",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Raketenwerfer Viper",
    "ap": 3,
    "atk": 5,
    "def": 3,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "steilfeuer-iii",
      "fahrzeug",
      "kette",
      "artillerie",
      "stellung",
      "mittel",
      "raketenwerfer"
    ],
    "text": "Steilfeuer III.",
    "effects": [],
    "flavor": "Das Gebäude ist zwar weg, aber wir haben den Stuhl getroffen!",
    "image": "artillerie/A063.jpg",
    "max_copies": 2,
    "collector": "A063",
    "keywords": [
      "Stellungswechsel"
    ],
    "rules": [
      "Steilfeuer III."
    ]
  },
  {
    "id": "dc_b_rohrpark_36",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Rohrpark",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Rohre in Reihe — das ist Vaels Satzbau.",
    "image": "artillerie/B036.jpg",
    "max_copies": 1,
    "collector": "B036",
    "rarity": "bronze",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_dauerfeuer_37",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Dauerfeuer",
    "ap": 3,
    "atk": 4,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Munition ist billiger als Pause.",
    "image": "artillerie/B037.jpg",
    "max_copies": 1,
    "collector": "B037",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_kaliberzeile_38",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Kaliberzeile",
    "ap": 4,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Die Zeile im Buch trifft vor dem Geschoss.",
    "image": "artillerie/B038.jpg",
    "max_copies": 1,
    "collector": "B038",
    "rarity": "silver"
  },
  {
    "id": "dc_b_munitionskehle_39",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Munitionskehle",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Kostet 1 AP weniger (mind. 1), solange eine eigene Einheit Ausrüstung trägt.",
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
    "flavor": "Die Kehle muss voll bleiben.",
    "image": "artillerie/B039.jpg",
    "max_copies": 1,
    "collector": "B039",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_flaechenauftrag_40",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Flächenauftrag",
    "ap": 4,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Flächig, anhaltend, berechenbar.",
    "image": "artillerie/B040.jpg",
    "max_copies": 1,
    "collector": "B040",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_werksbatterie_41",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Werksbatterie",
    "ap": 4,
    "atk": 5,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +2 ATK gegen beschädigte Ziele.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 2,
          "vs": "damaged"
        }
      }
    ],
    "flavor": "Nacharbeiten sind im Preis inbegriffen.",
    "image": "artillerie/B041.jpg",
    "max_copies": 1,
    "collector": "B041",
    "rarity": "silver"
  },
  {
    "id": "dc_b_nachtlieferung_42",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Nachtlieferung",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": true,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Ihr erster Angriff hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Nachts kommt, was tags verbraucht wurde.",
    "image": "artillerie/B042.jpg",
    "max_copies": 1,
    "collector": "B042",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_industrieschlag_145",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Industrieschlag",
    "ap": 5,
    "atk": 6,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Ein Schlag, der das Auftragsbuch füllt.",
    "image": "artillerie/B145.jpg",
    "max_copies": 1,
    "collector": "B145",
    "rarity": "gold",
    "keywords": [
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_b_werkbatterie_15",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Werkbatterie",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK, wenn du in diesem Zug Infanterie gespielt hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "played:Infanterie"
        }
      }
    ],
    "flavor": "Rohre aus demselben Hof.",
    "image": "artillerie/B015.jpg",
    "max_copies": 1,
    "collector": "B015",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_sturmfeuer_16",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Sturmfeuer",
    "ap": 2,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Beim Ausspielen: 1 Schaden an der schwächsten gegnerischen Fronteinheit in ihrem Abschnitt.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "strike",
          "n": 1
        }
      }
    ],
    "flavor": "Kurz. Laut. Genug für die Leiter.",
    "image": "artillerie/B016.jpg",
    "max_copies": 1,
    "collector": "B016",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_pflichtsalve_17",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Pflichtsalve",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Das Maß frisst auch die eigene Batterie.",
    "image": "artillerie/B017.jpg",
    "max_copies": 1,
    "collector": "B017",
    "rarity": "bronze",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_wellenbrecher_18",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Wellenbrecher",
    "ap": 4,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Feuer nach dem ersten Schritt.",
    "image": "artillerie/B018.jpg",
    "max_copies": 1,
    "collector": "B018",
    "rarity": "silver",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_massenschlag_19",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Massenschlag",
    "ap": 5,
    "atk": 5,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "steilfeuer-iv",
      "artillerie"
    ],
    "text": "Steilfeuer IV: ganze Front. Beim Ausspielen: 1 Schaden an der schwächsten gegnerischen Fronteinheit in ihrem Abschnitt.",
    "effects": [
      {
        "code": "ATTACK_ANY_FRONT"
      },
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "strike",
          "n": 1
        }
      }
    ],
    "flavor": "Ein Schlag für alle Reihen.",
    "image": "artillerie/B019.jpg",
    "max_copies": 1,
    "collector": "B019",
    "rarity": "gold"
  },
  {
    "id": "dc_b_ordnungsbatterie_120",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Ordnungsbatterie",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Andere eigene Infanterie in ihrem Abschnitt: +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "aura",
          "scope": "section",
          "atk": 1,
          "filter": "infanterie"
        }
      }
    ],
    "flavor": "Maß am Rohr. Heilige Ordnung feuert.",
    "image": "artillerie/B120.jpg",
    "max_copies": 1,
    "collector": "B120",
    "rarity": "bronze",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_massfeuer_134",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Maßfeuer",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK, solange eigene Infanterie benachbart ist.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "adj:infanterie"
        }
      }
    ],
    "flavor": "Feuer nach Maß, nicht nach Eifer.",
    "image": "artillerie/B134.jpg",
    "max_copies": 1,
    "collector": "B134",
    "rarity": "bronze",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_weihegeschuetz_139",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Weihegeschütz",
    "ap": 4,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit. +1 ATK gegen beschädigte Ziele.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 1
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "damaged"
        }
      }
    ],
    "flavor": "Weihe am Rohr. Wasser vor dem Schuss.",
    "image": "artillerie/B139.jpg",
    "max_copies": 1,
    "collector": "B139",
    "rarity": "bronze",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_dekretbatterie_615",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Dekretbatterie",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II.",
    "effects": [],
    "flavor": "Der Befehl trägt weiter als die Stimme.",
    "image": "artillerie/B615.jpg",
    "max_copies": 1,
    "collector": "B615",
    "rarity": "bronze",
    "keywords": [],
    "rules": [
      "Steilfeuer II."
    ]
  },
  {
    "id": "dc_b_flussrot_haubitzen_616",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Flussrot-Haubitzen",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Umschlagplatz. Dann Feuer.",
    "image": "artillerie/B616.jpg",
    "max_copies": 1,
    "collector": "B616",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_schwerpunktfeuer_617",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Schwerpunktfeuer",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "steilfeuer-iv",
      "artillerie"
    ],
    "text": "Steilfeuer IV: ganze Front. Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "ATTACK_ANY_FRONT"
      },
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Erst bündeln. Dann sprechen die Rohre.",
    "image": "artillerie/B617.jpg",
    "max_copies": 1,
    "collector": "B617",
    "rarity": "silver",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_glockenstellung_618",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Glockenstellung",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Was früher Feier war, ist jetzt Takt.",
    "image": "artillerie/B618.jpg",
    "max_copies": 1,
    "collector": "B618",
    "rarity": "bronze",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_kronsalve_619",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Kronsalve",
    "ap": 5,
    "atk": 5,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "steilfeuer-iv",
      "artillerie"
    ],
    "text": "Steilfeuer IV: ganze Front.",
    "effects": [
      {
        "code": "ATTACK_ANY_FRONT"
      }
    ],
    "flavor": "Ein Dekret in Stahl.",
    "image": "artillerie/B619.jpg",
    "max_copies": 1,
    "collector": "B619",
    "rarity": "gold",
    "keywords": [
      "Gefechtsbereit",
      "Zuteilung"
    ],
    "rules": [
      "Steilfeuer IV: ganze Front."
    ]
  },
  {
    "id": "dc_b_erlassbatterie_636",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Erlassbatterie",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Batterie des Erlasses. Recht hat seinen Preis.",
    "image": "artillerie/B636.jpg",
    "max_copies": 1,
    "collector": "B636",
    "rarity": "bronze",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_schwurfeuer_649",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Schwurfeuer",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-i",
      "artillerie"
    ],
    "text": "Steilfeuer I. Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Feuer auf den Schwur. Treue hält.",
    "image": "artillerie/B649.jpg",
    "max_copies": 1,
    "collector": "B649",
    "rarity": "bronze",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_silberstern_rohr_650",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Silberstern-Rohr",
    "ap": 4,
    "atk": 5,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
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
    "flavor": "Silberstern am Rohr. Ablösung lohnt.",
    "image": "artillerie/B650.jpg",
    "max_copies": 1,
    "collector": "B650",
    "rarity": "bronze",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_massbatterie_375",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Maßbatterie",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II.",
    "effects": [],
    "flavor": "Zielwerte, nicht Ziele.",
    "image": "artillerie/B375.jpg",
    "max_copies": 1,
    "collector": "B375",
    "rarity": "bronze",
    "keywords": [
      "Nachsetzen"
    ],
    "rules": [
      "Steilfeuer II."
    ]
  },
  {
    "id": "dc_b_schmerzfeuer_376",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Schmerzfeuer",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Treffer auf Treffer stapeln.",
    "image": "artillerie/B376.jpg",
    "max_copies": 1,
    "collector": "B376",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_filterstellung_377",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Filterstellung",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
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
    "flavor": "Die Luft ist berechnet.",
    "image": "artillerie/B377.jpg",
    "max_copies": 1,
    "collector": "B377",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_stossfeuer_378",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Stoßfeuer",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Erst öffnen. Dann füllen.",
    "image": "artillerie/B378.jpg",
    "max_copies": 1,
    "collector": "B378",
    "rarity": "silver",
    "keywords": [
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_b_massenschlag_379",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Massenschlag",
    "ap": 5,
    "atk": 5,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "steilfeuer-iv",
      "artillerie"
    ],
    "text": "Steilfeuer IV: ganze Front.",
    "effects": [
      {
        "code": "ATTACK_ANY_FRONT"
      }
    ],
    "flavor": "Ein Salvo. Eine Statistik.",
    "image": "artillerie/B379.jpg",
    "max_copies": 1,
    "collector": "B379",
    "rarity": "gold",
    "keywords": [
      "Gefechtsbereit",
      "Überlast"
    ],
    "rules": [
      "Steilfeuer IV: ganze Front."
    ]
  },
  {
    "id": "dc_b_filterwerk_rohr_392",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Filterwerk-Rohr",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Rohr aus dem Filterwerk. Luft kostet Fleisch.",
    "image": "artillerie/B392.jpg",
    "max_copies": 1,
    "collector": "B392",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_implantatrohr_408",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Implantatrohr",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK, solange sie beschädigt ist.",
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
    "flavor": "Implantat am Rohr. Menschlichkeit messbar.",
    "image": "artillerie/B408.jpg",
    "max_copies": 1,
    "collector": "B408",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_knochenbatterie_411",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Knochenbatterie",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II.",
    "effects": [],
    "flavor": "Batterie aus Knochenstift und Maß.",
    "image": "artillerie/B411.jpg",
    "max_copies": 1,
    "collector": "B411",
    "rarity": "bronze",
    "keywords": [
      "Nachsetzen",
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_knotenrohr_795",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Knotenrohr",
    "ap": 3,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 DEF, solange eigene Infanterie benachbart ist.",
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
    "flavor": "Rohr an der Leitung — offen, prüfbar.",
    "image": "artillerie/B795.jpg",
    "max_copies": 1,
    "collector": "B795",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_lagefeuer_796",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Lagefeuer",
    "ap": 3,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen beobachtete Ziele.",
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
    "flavor": "Feuer folgt der Lage, nicht dem Mythos.",
    "image": "artillerie/B796.jpg",
    "max_copies": 1,
    "collector": "B796",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_lokalisierbatterie_797",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Lokalisierbatterie",
    "ap": 4,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +2 ATK gegen beobachtete Ziele. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 2,
          "vs": "observed"
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "draw",
          "n": 1
        }
      }
    ],
    "flavor": "Batterie lokalisiert. Danach trifft sie.",
    "image": "artillerie/B797.jpg",
    "max_copies": 1,
    "collector": "B797",
    "rarity": "silver"
  },
  {
    "id": "dc_b_werkhofgeschuetz_798",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Werkhofgeschütz",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK, solange eigene Infanterie benachbart ist.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "adj:infanterie"
        }
      }
    ],
    "flavor": "Geschütz aus dem Werkhof Nov.",
    "image": "artillerie/B798.jpg",
    "max_copies": 1,
    "collector": "B798",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_nordmark_rohr_799",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Nordmark-Rohr",
    "ap": 3,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.",
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
    "flavor": "Rohr der dünnen Nordmark.",
    "image": "artillerie/B799.jpg",
    "max_copies": 1,
    "collector": "B799",
    "rarity": "bronze",
    "keywords": [
      "Fernschuss"
    ]
  },
  {
    "id": "dc_b_westhaven_batterie_800",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Westhaven-Batterie",
    "ap": 4,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
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
    "flavor": "Batterie versorgt vom Hafen — keine Flotte.",
    "image": "artillerie/B800.jpg",
    "max_copies": 1,
    "collector": "B800",
    "rarity": "silver",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_kurzes_rohr_801",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Kurzes Rohr",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
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
    "flavor": "Kurz und früh. Kein langer Kalender.",
    "image": "artillerie/B801.jpg",
    "max_copies": 1,
    "collector": "B801",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_offenes_feuer_802",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Offenes Feuer",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen beobachtete Ziele. Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "observed"
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "reveal",
          "n": 1
        }
      }
    ],
    "flavor": "Gerät offen. Körper bleibt Mensch.",
    "image": "artillerie/B802.jpg",
    "max_copies": 1,
    "collector": "B802",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_siegelrohr_855",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Siegelrohr",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
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
    "flavor": "Rohr am Siegelwerk.",
    "image": "artillerie/B855.jpg",
    "max_copies": 1,
    "collector": "B855",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_falschfeuer_856",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Falschfeuer",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II.",
    "effects": [],
    "flavor": "Feuer nach gesetzter Version.",
    "image": "artillerie/B856.jpg",
    "max_copies": 1,
    "collector": "B856",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_abriegelbatterie_857",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Abriegelbatterie",
    "ap": 4,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
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
    "flavor": "Batterie hält den leeren Abschnitt tot.",
    "image": "artillerie/B857.jpg",
    "max_copies": 1,
    "collector": "B857",
    "rarity": "silver"
  },
  {
    "id": "dc_b_aemterlande_geschuetz_858",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Ämterlande-Geschütz",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
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
    "flavor": "Geschütz der Ämterlande.",
    "image": "artillerie/B858.jpg",
    "max_copies": 1,
    "collector": "B858",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_grenzfeuer_859",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Grenzfeuer",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Andere eigene Einheiten in ihrem Abschnitt: +1 DEF, wenn du in diesem Zug einen Soforteinsatz gespielt hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "aura",
          "scope": "section",
          "atk": 0,
          "def": 1,
          "when": "played:Soforteinsatz",
          "self": true
        }
      }
    ],
    "flavor": "Feuer am Grenzspiel.",
    "image": "artillerie/B859.jpg",
    "max_copies": 1,
    "collector": "B859",
    "rarity": "bronze",
    "keywords": [
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_b_velis_batterie_860",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Velis-Batterie",
    "ap": 4,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II.",
    "effects": [],
    "flavor": "Batterie der Hauptstadtfront.",
    "image": "artillerie/B860.jpg",
    "max_copies": 1,
    "collector": "B860",
    "rarity": "silver",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_stumpfrohr_861",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Stumpfrohr",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
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
    "flavor": "Stumpf. Genau. Ohne Glauben.",
    "image": "artillerie/B861.jpg",
    "max_copies": 1,
    "collector": "B861",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_leerschuss_862",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Leerschuss",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Nach ihrem Angriff: das Ziel hat −1 ATK bis zum Ende des nächsten Zuges.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "hitdebuff",
          "atk": -1
        }
      }
    ],
    "flavor": "Schuss in den leeren Abschnitt.",
    "image": "artillerie/B862.jpg",
    "max_copies": 1,
    "collector": "B862",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zeilenrohr_915",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Zeilenrohr",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen Ziele ohne benachbarte Einheit ihres Besitzers. Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "isolated"
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "reveal",
          "n": 1
        }
      }
    ],
    "flavor": "Rohr einer fälligen Zeile.",
    "image": "artillerie/B915.jpg",
    "max_copies": 1,
    "collector": "B915",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_vorlesefeuer_916",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Vorlesefeuer",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 DEF, solange eigene Infanterie benachbart ist.",
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
    "flavor": "Feuer nach Vorlesung.",
    "image": "artillerie/B916.jpg",
    "max_copies": 1,
    "collector": "B916",
    "rarity": "bronze",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_abschlussgeschuetz_917",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Abschlussgeschütz",
    "ap": 4,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
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
    "flavor": "Geschütz schließt den Namen.",
    "image": "artillerie/B917.jpg",
    "max_copies": 1,
    "collector": "B917",
    "rarity": "silver"
  },
  {
    "id": "dc_b_mahr_geschuetz_918",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Mahr-Geschütz",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
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
    "flavor": "Geschütz des reichen Hauses.",
    "image": "artillerie/B918.jpg",
    "max_copies": 1,
    "collector": "B918",
    "rarity": "bronze",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_faelligkeitsfeuer_919",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Fälligkeitsfeuer",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen Ziele ohne benachbarte Einheit ihres Besitzers. Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "isolated"
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "reveal",
          "n": 1
        }
      }
    ],
    "flavor": "Feuer am Fälligkeitstag.",
    "image": "artillerie/B919.jpg",
    "max_copies": 1,
    "collector": "B919",
    "rarity": "bronze",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_kalden_batterie_920",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Kalden-Batterie",
    "ap": 4,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
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
    "flavor": "Batterie der Halle.",
    "image": "artillerie/B920.jpg",
    "max_copies": 1,
    "collector": "B920",
    "rarity": "silver"
  },
  {
    "id": "dc_b_manschettenrohr_921",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Manschettenrohr",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK, solange eigene Infanterie benachbart ist.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "adj:infanterie"
        }
      }
    ],
    "flavor": "Rohr. Offene Zeile am Ärmel.",
    "image": "artillerie/B921.jpg",
    "max_copies": 1,
    "collector": "B921",
    "rarity": "bronze",
    "keywords": [
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_b_namenschuss_922",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Namenschuss",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Nach ihrem Angriff: das Ziel hat −1 ATK bis zum Ende des nächsten Zuges.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "hitdebuff",
          "atk": -1
        }
      }
    ],
    "flavor": "Schuss auf den genannten Namen.",
    "image": "artillerie/B922.jpg",
    "max_copies": 1,
    "collector": "B922",
    "rarity": "bronze",
    "keywords": [
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_b_zeughausrohr_735",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Zeughausrohr",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Nach ihrem Angriff: das Ziel hat −1 ATK bis zum Ende des nächsten Zuges.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "hitdebuff",
          "atk": -1
        }
      }
    ],
    "flavor": "Rohr aus dem Zeughaus — geölt, nicht geweiht.",
    "image": "artillerie/B735.jpg",
    "max_copies": 1,
    "collector": "B735",
    "rarity": "bronze",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_auffangbatterie_736",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Auffangbatterie",
    "ap": 3,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Nach ihrem Angriff: das Ziel hat −1 ATK bis zum Ende des nächsten Zuges.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "hitdebuff",
          "atk": -1
        }
      }
    ],
    "flavor": "Batterie bremst den Anlauf.",
    "image": "artillerie/B736.jpg",
    "max_copies": 1,
    "collector": "B736",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_sperrfeuer_737",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Sperrfeuer",
    "ap": 4,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
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
    "flavor": "Sperre hält die Mark.",
    "image": "artillerie/B737.jpg",
    "max_copies": 1,
    "collector": "B737",
    "rarity": "silver",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_lafettenwacht_738",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Lafettenwacht",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen Ziele ohne benachbarte Einheit ihres Besitzers. Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "isolated"
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "reveal",
          "n": 1
        }
      }
    ],
    "flavor": "Lafette überdauert Regierungen.",
    "image": "artillerie/B738.jpg",
    "max_copies": 1,
    "collector": "B738",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_markengeschuetz_739",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Markengeschütz",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II.",
    "effects": [],
    "flavor": "Geschütz für nasse Jahreszeit.",
    "image": "artillerie/B739.jpg",
    "max_copies": 1,
    "collector": "B739",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_brueckenau_batterie_740",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Brückenau-Batterie",
    "ap": 4,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
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
    "flavor": "Batterie vom Fluss — Versorgung, keine Flotte.",
    "image": "artillerie/B740.jpg",
    "max_copies": 1,
    "collector": "B740",
    "rarity": "silver",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_dauerrohr_741",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Dauerrohr",
    "ap": 3,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 DEF, solange eigene Infanterie benachbart ist.",
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
    "flavor": "Rohr bleibt. Feldzüge wechseln.",
    "image": "artillerie/B741.jpg",
    "max_copies": 1,
    "collector": "B741",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_auffangfeuer_742",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Auffangfeuer",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
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
    "flavor": "Feuer fängt die Lücke.",
    "image": "artillerie/B742.jpg",
    "max_copies": 1,
    "collector": "B742",
    "rarity": "bronze",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_kai_batterie_57",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Kai-Batterie",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen Ziele ohne benachbarte Einheit ihres Besitzers. Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "isolated"
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "reveal",
          "n": 1
        }
      }
    ],
    "flavor": "Rohre halten den Zugang, nicht den Ort.",
    "image": "artillerie/B057.jpg",
    "max_copies": 1,
    "collector": "B057",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_strassenfeuer_58",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Straßenfeuer",
    "ap": 3,
    "atk": 4,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Die Straße ist die eigene. Das Feuer hält sie offen.",
    "image": "artillerie/B058.jpg",
    "max_copies": 1,
    "collector": "B058",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_lizenzsalve_59",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Lizenzsalve",
    "ap": 4,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
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
    "flavor": "Ohne Lizenz ist das Schiff Privatgeschäft.",
    "image": "artillerie/B059.jpg",
    "max_copies": 1,
    "collector": "B059",
    "rarity": "silver"
  },
  {
    "id": "dc_b_verspaetungsfeuer_60",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Verspätungsfeuer",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
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
    "flavor": "Verspätung ist keine Unabhängigkeit.",
    "image": "artillerie/B060.jpg",
    "max_copies": 1,
    "collector": "B060",
    "rarity": "bronze",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_staubrain_rohre_61",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Staubrain-Rohre",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 DEF, solange eigene Infanterie benachbart ist.",
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
    "flavor": "Garnison und Dorf nebeneinander. Dieselbe Jacke.",
    "image": "artillerie/B061.jpg",
    "max_copies": 1,
    "collector": "B061",
    "rarity": "bronze",
    "keywords": [
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_b_kronenhof_kaliber_62",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Kronenhof-Kaliber",
    "ap": 4,
    "atk": 5,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
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
    "flavor": "Amtlos und unverzichtbar — gezählt, nicht befohlen.",
    "image": "artillerie/B062.jpg",
    "max_copies": 1,
    "collector": "B062",
    "rarity": "silver",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_nachtkai_63",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Nachtkai",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": true,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen Ziele ohne benachbarte Einheit ihres Besitzers. Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "isolated"
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "reveal",
          "n": 1
        }
      }
    ],
    "flavor": "Nachts kommt die Ablösung — oder das Loch.",
    "image": "artillerie/B063.jpg",
    "max_copies": 1,
    "collector": "B063",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_wegschlag_184",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Wegschlag",
    "ap": 5,
    "atk": 6,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II.",
    "effects": [],
    "flavor": "Den Weg öffnen. Die Bodentruppe halten.",
    "image": "artillerie/B184.jpg",
    "max_copies": 1,
    "collector": "B184",
    "rarity": "gold",
    "keywords": [
      "Zuteilung",
      "Fernschuss"
    ]
  },
  {
    "id": "dc_b_linienrohr_675",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Linienrohr",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK, solange eigene Infanterie benachbart ist.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "adj:infanterie"
        }
      }
    ],
    "flavor": "Rohr hält die Linie, nicht den Ruhm.",
    "image": "artillerie/B675.jpg",
    "max_copies": 1,
    "collector": "B675",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_umgehungsbatterie_676",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Umgehungsbatterie",
    "ap": 3,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Batterie nimmt den Umweg im Feuer.",
    "image": "artillerie/B676.jpg",
    "max_copies": 1,
    "collector": "B676",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_linienbatterie_677",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Linienbatterie",
    "ap": 4,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
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
    "flavor": "Linie feuert zusammen.",
    "image": "artillerie/B677.jpg",
    "max_copies": 1,
    "collector": "B677",
    "rarity": "silver",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_marktgeschuetz_678",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Marktgeschütz",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
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
    "flavor": "Geschütz vom Marktplatz — geliehen, nicht geweiht.",
    "image": "artillerie/B678.jpg",
    "max_copies": 1,
    "collector": "B678",
    "rarity": "bronze",
    "keywords": [
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_b_strassenwurf_679",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Straßenwurf",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-i",
      "artillerie"
    ],
    "text": "Steilfeuer I. Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
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
    "flavor": "Wurf sichert die Straße.",
    "image": "artillerie/B679.jpg",
    "max_copies": 1,
    "collector": "B679",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_vorratsrohr_680",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Vorratsrohr",
    "ap": 4,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Andere eigene Einheiten in ihrem Abschnitt: +1 ATK, wenn du in diesem Zug einen Soforteinsatz gespielt hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "aura",
          "scope": "section",
          "atk": 1,
          "when": "played:Soforteinsatz",
          "self": true
        }
      }
    ],
    "flavor": "Rohr aus der vollen Halle — die fährt.",
    "image": "artillerie/B680.jpg",
    "max_copies": 1,
    "collector": "B680",
    "rarity": "silver",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_sarun_batterie_681",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Sarun-Batterie",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II.",
    "effects": [],
    "flavor": "Sarun höflich. Rohr trotzdem.",
    "image": "artillerie/B681.jpg",
    "max_copies": 1,
    "collector": "B681",
    "rarity": "bronze",
    "keywords": [
      "Fernschuss",
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_durchlassfeuer_682",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Durchlassfeuer",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen Ziele ohne benachbarte Einheit ihres Besitzers. Zerstört sie im Angriff eine Einheit: decke 1 verdeckte gegnerische Fronteinheit auf.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "isolated"
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "reveal",
          "n": 1
        }
      }
    ],
    "flavor": "Feuer öffnet den Durchlass.",
    "image": "artillerie/B682.jpg",
    "max_copies": 1,
    "collector": "B682",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_normgeschuetz_555",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Normgeschütz",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II.",
    "effects": [],
    "flavor": "Rohr nach Plan.",
    "image": "artillerie/B555.jpg",
    "max_copies": 1,
    "collector": "B555",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung",
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_feuerleitblatt_rohr_556",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Feuerleitblatt-Rohr",
    "ap": 3,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen beobachtete Ziele.",
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
    "flavor": "Blatt vor Schuss.",
    "image": "artillerie/B556.jpg",
    "max_copies": 1,
    "collector": "B556",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_planbatterie_557",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Planbatterie",
    "ap": 4,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +2 ATK gegen beobachtete Ziele. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 2,
          "vs": "observed"
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "draw",
          "n": 1
        }
      }
    ],
    "flavor": "Batterie liest denselben Plan.",
    "image": "artillerie/B557.jpg",
    "max_copies": 1,
    "collector": "B557",
    "rarity": "silver",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_messwurf_558",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Messwurf",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-i",
      "artillerie"
    ],
    "text": "Steilfeuer I. Andere eigene Einheiten in ihrem Abschnitt: +1 DEF, wenn du in diesem Zug einen Soforteinsatz gespielt hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "aura",
          "scope": "section",
          "atk": 0,
          "def": 1,
          "when": "played:Soforteinsatz",
          "self": true
        }
      }
    ],
    "flavor": "Messwurf. Kein Feldherr.",
    "image": "artillerie/B558.jpg",
    "max_copies": 1,
    "collector": "B558",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_synchronrohr_559",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Synchronrohr",
    "ap": 3,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK, solange eigene Infanterie benachbart ist.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "adj:infanterie"
        }
      }
    ],
    "flavor": "Rohr wartet auf den Zug.",
    "image": "artillerie/B559.jpg",
    "max_copies": 1,
    "collector": "B559",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_normartillerie_560",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Normartillerie",
    "ap": 4,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen beobachtete Ziele.",
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
    "flavor": "Normartillerie — System, kein Star.",
    "image": "artillerie/B560.jpg",
    "max_copies": 1,
    "collector": "B560",
    "rarity": "silver",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_albensee_batterie_561",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Albensee-Batterie",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II.",
    "effects": [],
    "flavor": "See ist Ader. Schlüssel bei Kommission.",
    "image": "artillerie/B561.jpg",
    "max_copies": 1,
    "collector": "B561",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_grossfeuer_562",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Großfeuer",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen beobachtete Ziele.",
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
    "flavor": "Großfeuer nach Karte.",
    "image": "artillerie/B562.jpg",
    "max_copies": 1,
    "collector": "B562",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_kai_batterie_495",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Kai-Batterie",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK, solange du eine offene Unterstützung hast.",
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
    "flavor": "Rohr deckt den Kai. Es regiert ihn nicht.",
    "image": "artillerie/B495.jpg",
    "max_copies": 1,
    "collector": "B495",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_bahnfeuer_496",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Bahnfeuer",
    "ap": 3,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Feuer, wo der Weg reißt.",
    "image": "artillerie/B496.jpg",
    "max_copies": 1,
    "collector": "B496",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_entsatzrohr_497",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Entsatzrohr",
    "ap": 4,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Rohr folgt dem Entsatz.",
    "image": "artillerie/B497.jpg",
    "max_copies": 1,
    "collector": "B497",
    "rarity": "silver",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_lagerwurf_498",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Lagerwurf",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-i",
      "artillerie"
    ],
    "text": "Steilfeuer I. Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
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
    "flavor": "Wurf aus dem Lager. Kein Stern.",
    "image": "artillerie/B498.jpg",
    "max_copies": 1,
    "collector": "B498",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_strassenfeuer_499",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Straßenfeuer",
    "ap": 3,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Feuer hält die Straße offen.",
    "image": "artillerie/B499.jpg",
    "max_copies": 1,
    "collector": "B499",
    "rarity": "bronze",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_kleinkai_salve_500",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Kleinkai-Salve",
    "ap": 4,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Andere eigene Einheiten in ihrem Abschnitt: +1 ATK, solange du eine offene Unterstützung hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "aura",
          "scope": "section",
          "atk": 1,
          "when": "support",
          "self": true
        }
      }
    ],
    "flavor": "Kleinkai schickt unordentlich — und schickt.",
    "image": "artillerie/B500.jpg",
    "max_copies": 1,
    "collector": "B500",
    "rarity": "silver",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_hintermark_rohr_501",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Hintermark-Rohr",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II.",
    "effects": [],
    "flavor": "Hintermark meckert und steht mit.",
    "image": "artillerie/B501.jpg",
    "max_copies": 1,
    "collector": "B501",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_volle_front_502",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Volle Front",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK, solange du eine offene Unterstützung hast.",
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
    "flavor": "Front aus Nachschub. Nicht aus Flotte.",
    "image": "artillerie/B502.jpg",
    "max_copies": 1,
    "collector": "B502",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_signalfeuer_rohr_78",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Signalfeuer-Rohr",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Nach ihrem Angriff: das Ziel hat −1 ATK bis zum Ende des nächsten Zuges.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "hitdebuff",
          "atk": -1
        }
      }
    ],
    "flavor": "Feuer als Ruf — nicht als Hauptstadt.",
    "image": "artillerie/B078.jpg",
    "max_copies": 1,
    "collector": "B078",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_steinschlag_batterie_79",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Steinschlag-Batterie",
    "ap": 3,
    "atk": 4,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.",
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
    "flavor": "Der Hang antwortet, bevor das Tal fällt.",
    "image": "artillerie/B079.jpg",
    "max_copies": 1,
    "collector": "B079",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_warnsalve_80",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Warnsalve",
    "ap": 4,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.",
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
    "flavor": "Warnen ist noch nicht entscheiden.",
    "image": "artillerie/B080.jpg",
    "max_copies": 1,
    "collector": "B080",
    "rarity": "silver",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_eidhof_kaliber_81",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Eidhof-Kaliber",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II.",
    "effects": [],
    "flavor": "Die Kinder nennen fremde Namen. Die Rohre bleiben im Tal.",
    "image": "artillerie/B081.jpg",
    "max_copies": 1,
    "collector": "B081",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_passzoll_rohr_82",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Passzoll-Rohr",
    "ap": 4,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK, wenn du in 2+ Abschnitten Einheiten hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "sections:2"
        }
      }
    ],
    "flavor": "Geld bleibt, wo das Tal es hält.",
    "image": "artillerie/B082.jpg",
    "max_copies": 1,
    "collector": "B082",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_talbruck_geschuetz_83",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Talbruck-Geschütz",
    "ap": 4,
    "atk": 5,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.",
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
    "flavor": "Markt bleibt Markt. Kein Sitz.",
    "image": "artillerie/B083.jpg",
    "max_copies": 1,
    "collector": "B083",
    "rarity": "silver",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_nachtengen_84",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Nachtengen",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": true,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.",
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
    "flavor": "Nachts kennt man den eigenen Pass.",
    "image": "artillerie/B084.jpg",
    "max_copies": 1,
    "collector": "B084",
    "rarity": "bronze",
    "keywords": [
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_b_enger_weg_223",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Enger Weg",
    "ap": 5,
    "atk": 5,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.",
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
    "flavor": "Der enge Weg ist der Frieden, den Lyr aushält.",
    "image": "artillerie/B223.jpg",
    "max_copies": 1,
    "collector": "B223",
    "rarity": "gold",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_deckungsfeuer_315",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Deckungsfeuer",
    "ap": 3,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Feuer, damit die Etappe atmet.",
    "image": "artillerie/B315.jpg",
    "max_copies": 1,
    "collector": "B315",
    "rarity": "bronze",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_ruhebatterie_316",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Ruhebatterie",
    "ap": 3,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK, wenn du in diesem Zug geheilt hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "healed"
        }
      }
    ],
    "flavor": "Rohr und Verbände — dieselbe Schicht.",
    "image": "artillerie/B316.jpg",
    "max_copies": 1,
    "collector": "B316",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_sperrfeuer_etappe_317",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Sperrfeuer-Etappe",
    "ap": 4,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Sperren, nicht ausbluten.",
    "image": "artillerie/B317.jpg",
    "max_copies": 1,
    "collector": "B317",
    "rarity": "silver",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_seren_kaliber_318",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Seren-Kaliber",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Kostet 1 AP weniger (mind. 1), wenn du in diesem Zug geheilt hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "healed"
        }
      }
    ],
    "flavor": "Klinikstadt kennt den Lärm.",
    "image": "artillerie/B318.jpg",
    "max_copies": 1,
    "collector": "B318",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_gruenfeld_rohr_319",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Grünfeld-Rohr",
    "ap": 4,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Nach ihrem Angriff: das Ziel hat −1 ATK bis zum Ende des nächsten Zuges.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "hitdebuff",
          "atk": -1
        }
      }
    ],
    "flavor": "Gemeinschaftsküche und Geschütz — gemeldet.",
    "image": "artillerie/B319.jpg",
    "max_copies": 1,
    "collector": "B319",
    "rarity": "bronze",
    "keywords": [
      "Fernschuss"
    ]
  },
  {
    "id": "dc_b_vollschutz_320",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Vollschutz",
    "ap": 5,
    "atk": 5,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Schutz vor Not — auch vor dem eigenen Hunger nach Höhe.",
    "image": "artillerie/B320.jpg",
    "max_copies": 1,
    "collector": "B320",
    "rarity": "gold",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_kontrollsalve_321",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Kontrollsalve",
    "ap": 4,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Kontrolle ist Fürsorge mit Zähnen.",
    "image": "artillerie/B321.jpg",
    "max_copies": 1,
    "collector": "B321",
    "rarity": "silver"
  },
  {
    "id": "dc_b_lueckenhof_geschuetz_322",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Lückenhof-Geschütz",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen beobachtete Ziele.",
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
    "flavor": "Zu spät gemeldet — trotzdem halten.",
    "image": "artillerie/B322.jpg",
    "max_copies": 1,
    "collector": "B322",
    "rarity": "bronze",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_schmiedefeuer_rohr_99",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Schmiedefeuer-Rohr",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen Ziele ohne Ausrüstung.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "unequipped"
        }
      }
    ],
    "flavor": "Feuer der Werkstatt. Kein Kult.",
    "image": "artillerie/B099.jpg",
    "max_copies": 1,
    "collector": "B099",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_bergungsbatterie_100",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Bergungsbatterie",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Zerstört sie im Angriff eine Einheit: heile 1 DEF an einer eigenen Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "heal",
          "n": 1
        }
      }
    ],
    "flavor": "Bergen vor dem Zeichen.",
    "image": "artillerie/B100.jpg",
    "max_copies": 1,
    "collector": "B100",
    "rarity": "bronze",
    "keywords": [
      "Fernschuss"
    ]
  },
  {
    "id": "dc_b_untersuchungsalve_101",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Untersuchungsalve",
    "ap": 4,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II.",
    "effects": [],
    "flavor": "Nach dem Gefecht die Frage. Nicht der Schrein.",
    "image": "artillerie/B101.jpg",
    "max_copies": 1,
    "collector": "B101",
    "rarity": "silver",
    "keywords": [
      "Fernschuss",
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_kareth_kaliber_102",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Kareth-Kaliber",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Fehler benennen. Nicht heiligen.",
    "image": "artillerie/B102.jpg",
    "max_copies": 1,
    "collector": "B102",
    "rarity": "bronze",
    "keywords": [
      "Erbitterung"
    ]
  },
  {
    "id": "dc_b_valeris_rohr_103",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Valeris-Rohr",
    "ap": 4,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
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
    "flavor": "Zeichen erst nach Einigung.",
    "image": "artillerie/B103.jpg",
    "max_copies": 1,
    "collector": "B103",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schutzsalve_104",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Schutzsalve",
    "ap": 4,
    "atk": 5,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Hart halten. Nicht opfern.",
    "image": "artillerie/B104.jpg",
    "max_copies": 1,
    "collector": "B104",
    "rarity": "silver"
  },
  {
    "id": "dc_b_marenfeld_geschuetz_105",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Marenfeld-Geschütz",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.",
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
    "flavor": "Wenig Knochen auf der Ebene. Derselbe Schutz.",
    "image": "artillerie/B105.jpg",
    "max_copies": 1,
    "collector": "B105",
    "rarity": "bronze",
    "keywords": [
      "Fernschuss"
    ]
  },
  {
    "id": "dc_b_letzte_platte_262",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Letzte Platte",
    "ap": 5,
    "atk": 5,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
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
    "flavor": "Verlust wird Deckung — nicht Forderung.",
    "image": "artillerie/B262.jpg",
    "max_copies": 1,
    "collector": "B262",
    "rarity": "gold",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_volle_sicht_435",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Volle Sicht",
    "ap": 5,
    "atk": 5,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen beobachtete Ziele.",
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
    "flavor": "Sicht ohne Kult.",
    "image": "artillerie/B435.jpg",
    "max_copies": 1,
    "collector": "B435",
    "rarity": "gold",
    "keywords": [
      "Fernschuss",
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_zielrechnung_436",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Zielrechnung",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +2 ATK gegen beobachtete Ziele.",
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
    "flavor": "Rechnung vor dem Rohr.",
    "image": "artillerie/B436.jpg",
    "max_copies": 1,
    "collector": "B436",
    "rarity": "gold"
  },
  {
    "id": "dc_b_punktrohr_437",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Punktrohr",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
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
    "flavor": "Ein Punkt. Keine Walze aus Glauben.",
    "image": "artillerie/B437.jpg",
    "max_copies": 1,
    "collector": "B437",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_randmess_kaliber_438",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Randmess-Kaliber",
    "ap": 3,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II.",
    "effects": [],
    "flavor": "Irrtum aussprechen. Nicht schönreden.",
    "image": "artillerie/B438.jpg",
    "max_copies": 1,
    "collector": "B438",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_feuerleit_439",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Feuerleit",
    "ap": 4,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.",
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
    "flavor": "Leitung aus Messung. Nicht aus Eifer.",
    "image": "artillerie/B439.jpg",
    "max_copies": 1,
    "collector": "B439",
    "rarity": "silver"
  },
  {
    "id": "dc_b_feuerleitstand_440",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Feuerleitstand",
    "ap": 4,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. +1 ATK gegen beobachtete Ziele.",
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
    "flavor": "Stand der Zahlen. Stand der Unterschrift.",
    "image": "artillerie/B440.jpg",
    "max_copies": 1,
    "collector": "B440",
    "rarity": "silver",
    "keywords": [
      "Fernschuss"
    ]
  },
  {
    "id": "dc_b_probenheim_rohr_441",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Probenheim-Rohr",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Kostet 1 AP weniger (mind. 1), solange eine gegnerische Einheit beobachtet ist.",
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
    "flavor": "Objekt bleibt politisch wach.",
    "image": "artillerie/B441.jpg",
    "max_copies": 1,
    "collector": "B441",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_abbruchsalve_442",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Abbruchsalve",
    "ap": 3,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "steilfeuer-ii",
      "artillerie"
    ],
    "text": "Steilfeuer II. Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Zurückgezogene Order ist billiger als schöner Lüge.",
    "image": "artillerie/B442.jpg",
    "max_copies": 1,
    "collector": "B442",
    "rarity": "bronze"
  }
];
