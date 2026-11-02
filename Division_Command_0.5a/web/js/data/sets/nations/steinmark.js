window.DC_SET_NATIONS = window.DC_SET_NATIONS || {};
window.DC_SET_NATIONS["Steinmark"] = [
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Grabenbesatzung",
    "ap": 2,
    "atk": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "ausdauer"
    ],
    "text": "Niederhalten: getroffene feindliche Infanterie darf im nächsten Zug nicht angreifen.",
    "effects": [
      {
        "code": "NIEDERHALTEN"
      }
    ],
    "flavor": "Der Graben hält länger als Mut.",
    "max_copies": 4,
    "def": 4,
    "id": "dc_n_eh_grabenbesatzung",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A270.jpg",
    "collector": "A270"
  },
  {
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Zählebiges Geschütz",
    "ap": 3,
    "atk": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "artillerie",
      "fahrzeug"
    ],
    "text": "Greift die gesamte feindliche Front an.",
    "effects": [
      {
        "code": "ATTACK_ANY_FRONT"
      }
    ],
    "flavor": "Beulen gehören dazu.",
    "max_copies": 4,
    "def": 4,
    "id": "dc_n_eh_zahlebiges_geschutz",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A271.jpg",
    "collector": "A271"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Durchhaltezug",
    "ap": 2,
    "atk": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "ausdauer"
    ],
    "text": "Überfall: +1 Schaden beim Erstschlag.",
    "effects": [
      {
        "code": "AMBUSH"
      }
    ],
    "flavor": "Sie bleiben, weil Weggehen teurer ist.",
    "max_copies": 4,
    "def": 4,
    "id": "dc_n_eh_durchhaltezug",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A272.jpg",
    "collector": "A272"
  },
  {
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Narbenpanzer",
    "ap": 3,
    "atk": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "gepanzert",
      "ausdauer"
    ],
    "text": "Feuerüberlegenheit gegen Ungepanzerte.",
    "effects": [
      {
        "code": "FEUERUEBERLEGENHEIT"
      }
    ],
    "flavor": "Jeder Treffer eine Geschichte.",
    "max_copies": 4,
    "def": 5,
    "id": "dc_n_eh_narbenpanzer",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A273.jpg",
    "collector": "A273"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Feldlazarett",
    "ap": 1,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "sanitaet"
    ],
    "text": "Eigene Front -1 Schaden.",
    "effects": [
      {
        "code": "REDUCE_DAMAGE",
        "param": {
          "n": 1
        }
      }
    ],
    "flavor": "Flicken, nicht ersetzen.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_feldlazarett",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A274.jpg",
    "collector": "A274"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Werkstattwagen",
    "ap": 2,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "logistik"
    ],
    "text": "Zugbeginn +1 AP.",
    "effects": [
      {
        "code": "TURN_AP",
        "param": {
          "ap": 1
        }
      }
    ],
    "flavor": "Schrauben gegen den Zerfall.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_werkstattwagen",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A275.jpg",
    "collector": "A275"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Zusammenbeißen",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "ausdauer"
    ],
    "text": "Wähle 2 eigene Fronteinheiten. Beide +1 Angriff bis zum Ende des Zuges.",
    "effects": [
      {
        "code": "BRIEFING",
        "param": {
          "atk": 1,
          "count": 2
        }
      }
    ],
    "flavor": "Schmerz ist Tempo.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_zusammenbeissen",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A276.jpg",
    "collector": "A276"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Notversorgung",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "sanitaet"
    ],
    "text": "Ziehe 2 Karten und erhalte zusätzlich 1 AP für diesen Zug.",
    "effects": [
      {
        "code": "DRAW_AP",
        "param": {
          "draw": 2,
          "ap": 1
        }
      }
    ],
    "flavor": "Genug für den nächsten Tag.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_notversorgung",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A277.jpg",
    "collector": "A277"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Splitterfeuer",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Füge einer feindlichen Einheit oder Unterstützung 3 Schadenspunkte zu.",
    "effects": [
      {
        "code": "AIR_STRIKE",
        "param": {
          "dmg": 3
        }
      }
    ],
    "flavor": "Auch Schwäche trifft.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_splitterfeuer",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A278.jpg",
    "collector": "A278"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Verbandspäckchen",
    "ap": 1,
    "atk": null,
    "tags": [
      "ausruestung",
      "sanitaet"
    ],
    "text": "An Infanterie. Träger +0 A / +2 V.",
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
    "flavor": "Klein, aber entscheidend.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_eq_verbandspackchen",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A279.jpg",
    "collector": "A279"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Frontveteranen",
    "ap": 3,
    "atk": 3,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "ausdauer"
    ],
    "text": "Nach dem Angriff verdeckt.",
    "effects": [
      {
        "code": "GUERRILLA_HIDE"
      }
    ],
    "flavor": "Sie wissen, wie man blutet und bleibt.",
    "max_copies": 2,
    "def": 5,
    "id": "dc_n_eh_frontveteranen",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A280.jpg",
    "collector": "A280"
  },
  {
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Reparierter Keil",
    "ap": 4,
    "atk": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "gepanzert",
      "ausdauer"
    ],
    "text": "Ignoriert 2 V gegen Gepanzerte.",
    "effects": [
      {
        "code": "IGNORE_DEF",
        "param": {
          "ignore_def": 2
        }
      }
    ],
    "flavor": "Geschweißt und wieder da.",
    "max_copies": 2,
    "def": 6,
    "id": "dc_n_eh_reparierter_keil",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A281.jpg",
    "collector": "A281"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Verwundetennest",
    "ap": 2,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "sanitaet"
    ],
    "text": "Eigene Front -1 Schaden. Lazarett (2 AP): Einheit auf diese Karte, nächsten Zug volle V.",
    "effects": [
      {
        "code": "REDUCE_DAMAGE",
        "param": {
          "n": 1
        }
      },
      {
        "code": "NEST_BED",
        "param": {
          "ap": 2
        }
      }
    ],
    "flavor": "Zurück in den Kampf, nicht nach Hause.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_verwundetennest",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A282.jpg",
    "collector": "A282"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Durchhaltekommando",
    "ap": 3,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "ausdauer",
      "fuehrung"
    ],
    "text": "Eigene Front +2 V.",
    "effects": [
      {
        "code": "AURA_FRONT_DEF",
        "param": {
          "def": 2
        }
      }
    ],
    "flavor": "Befehle zum Bleiben.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_durchhaltekommando",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A283.jpg",
    "collector": "A283"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Weiterkämpfen",
    "ap": 1,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "ausdauer"
    ],
    "text": "Ziehe eine Infanterie aus dem Ablagestapel auf die Hand.",
    "effects": [
      {
        "code": "RETURN_INFANTRY_FROM_DISCARD"
      }
    ],
    "flavor": "Fallen ist nicht fertig.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_weiterkampfen",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A284.jpg",
    "collector": "A284"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Zähne zusammen",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "ausdauer"
    ],
    "text": "Gewählte Einheit bricht sofort ab und handelt erst wieder im nächsten Zug.",
    "effects": [
      {
        "code": "PAUSE_UNIT"
      }
    ],
    "flavor": "Den Schlag abfangen.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_zahne_zusammen",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A285.jpg",
    "collector": "A285"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Notpanzerung",
    "ap": 3,
    "atk": null,
    "tags": [
      "ausruestung",
      "ausdauer"
    ],
    "text": "An Panzer oder Fahrzeug. Träger +1 A / +2 V.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 2
        }
      }
    ],
    "flavor": "Platten auf Platten.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_eq_notpanzerung",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A286.jpg",
    "collector": "A286"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Unverwüstliche",
    "ap": 4,
    "atk": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "elite",
      "ausdauer"
    ],
    "text": "Niederhalten. Wenn eigene Fronteinheit stirbt: kostenlos in denselben Slot.",
    "effects": [
      {
        "code": "NIEDERHALTEN"
      },
      {
        "code": "BREACH_JUMP"
      }
    ],
    "flavor": "Sie ersetzen sich selbst.",
    "max_copies": 1,
    "def": 7,
    "id": "dc_n_eh_unverwustliche",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A287.jpg",
    "collector": "A287"
  },
  {
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Kampfwagen der Narben",
    "ap": 5,
    "atk": 5,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "elite",
      "gepanzert",
      "ausdauer"
    ],
    "text": "Ignoriert 2 V. Feuerüberlegenheit.",
    "effects": [
      {
        "code": "IGNORE_DEF",
        "param": {
          "ignore_def": 2
        }
      },
      {
        "code": "FEUERUEBERLEGENHEIT"
      }
    ],
    "flavor": "Jedes Loch ein Orden.",
    "max_copies": 1,
    "def": 7,
    "id": "dc_n_eh_kampfwagen_der_narben",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A288.jpg",
    "collector": "A288"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Frontlazarettnetz",
    "ap": 4,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "elite",
      "sanitaet"
    ],
    "text": "Eigene Front -1 Schaden. Koordination (1 AP): Front greift erneut.",
    "effects": [
      {
        "code": "REDUCE_DAMAGE",
        "param": {
          "n": 1
        }
      },
      {
        "code": "REATTACK",
        "param": {
          "ap": 1
        }
      }
    ],
    "flavor": "Heilen, um wieder zu schlagen.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_un_frontlazarettnetz",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A289.jpg",
    "collector": "A289"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Letztes Aufgebot",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "elite",
      "ausdauer"
    ],
    "text": "Opfere die Front bis auf eine Einheit. Sie erhält +1 A/+1 V je Geopferter.",
    "effects": [
      {
        "code": "LAST_STAND"
      }
    ],
    "flavor": "Was noch steht, steht für alle.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_letztes_aufgebot",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A290.jpg",
    "collector": "A290"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Zäher Nachschub",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "elite"
    ],
    "text": "Ziehe 3 Karten und erhalte zusätzlich 2 AP für diesen Zug.",
    "effects": [
      {
        "code": "DRAW_AP",
        "param": {
          "draw": 3,
          "ap": 2
        }
      }
    ],
    "flavor": "Der Krieg endet nicht mit dem Blut.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_zaher_nachschub",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A291.jpg",
    "collector": "A291"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Kriegsnarbe",
    "ap": 4,
    "atk": null,
    "tags": [
      "ausruestung",
      "elite",
      "ausdauer"
    ],
    "text": "An Infanterie. Träger +2 A / +2 V.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 2,
          "only": "infanterie"
        }
      }
    ],
    "flavor": "Beweis, dass man geblieben ist.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_eq_kriegsnarbe",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A292.jpg",
    "collector": "A292"
  }
];
