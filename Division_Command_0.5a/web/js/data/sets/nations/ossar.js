window.DC_SET_NATIONS = window.DC_SET_NATIONS || {};
window.DC_SET_NATIONS["Ossar"] = [
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Schutztrupp",
    "ap": 2,
    "atk": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "verteidigung"
    ],
    "text": "Niederhalten: getroffene feindliche Infanterie darf im nächsten Zug nicht angreifen.",
    "effects": [
      {
        "code": "NIEDERHALTEN"
      }
    ],
    "flavor": "Platten vor Personen.",
    "max_copies": 4,
    "def": 4,
    "id": "dc_n_eh_schutztrupp",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A201.jpg",
    "collector": "A201"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Wachzug",
    "ap": 1,
    "atk": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "verteidigung"
    ],
    "text": "Beim Ausspielen 1 verdeckte Feindfront aufdecken.",
    "effects": [
      {
        "code": "AUFKLAERUNG",
        "param": {
          "n": 1,
          "onEnter": true
        }
      }
    ],
    "flavor": "Erinnern heißt wachsam bleiben.",
    "max_copies": 4,
    "def": 3,
    "id": "dc_n_eh_wachzug",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A202.jpg",
    "collector": "A202"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Plattenläufer",
    "ap": 3,
    "atk": 3,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "gepanzert"
    ],
    "text": "Nach dem Angriff verdeckt.",
    "effects": [
      {
        "code": "GUERRILLA_HIDE"
      }
    ],
    "flavor": "Die Maske trägt das Opfer.",
    "max_copies": 4,
    "def": 5,
    "id": "dc_n_eh_plattenlaufer",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A203.jpg",
    "collector": "A203"
  },
  {
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Sperrpanzer",
    "ap": 3,
    "atk": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "verteidigung",
      "gepanzert"
    ],
    "text": "Feuerüberlegenheit: +1 Schaden gegen ungepanzerte Einheiten.",
    "effects": [
      {
        "code": "FEUERUEBERLEGENHEIT"
      }
    ],
    "flavor": "Nicht jagen – halten.",
    "max_copies": 4,
    "def": 5,
    "id": "dc_n_eh_sperrpanzer",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A204.jpg",
    "collector": "A204"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Verbandplatz",
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
    "flavor": "Die Lebenden zuerst.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_verbandplatz",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A205.jpg",
    "collector": "A205"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Bunkerleitung",
    "ap": 3,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "verteidigung"
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
    "flavor": "Beton und Gedächtnis.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_bunkerleitung",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A206.jpg",
    "collector": "A206"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Halten",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "verteidigung"
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
    "flavor": "Einen Schritt nicht zurück.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_halten",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A207.jpg",
    "collector": "A207"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Sanitätereinsatz",
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
    "flavor": "Wer fällt, wird geholt.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_sanitatereinsatz",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A208.jpg",
    "collector": "A208"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Sperrfeuer leicht",
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
    "flavor": "Abstand schaffen.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_sperrfeuer_leicht",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A209.jpg",
    "collector": "A209"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Schutzplatte",
    "ap": 2,
    "atk": null,
    "tags": [
      "ausruestung",
      "verteidigung"
    ],
    "text": "An Infanterie. Träger +0 A / +3 V.",
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
    "flavor": "Knochen auf Metall.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_eq_schutzplatte",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A210.jpg",
    "collector": "A210"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Entsatzkompanie",
    "ap": 3,
    "atk": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "entsatz"
    ],
    "text": "Wenn eine eigene Fronteinheit stirbt: kostenlos offen in denselben Slot.",
    "effects": [
      {
        "code": "BREACH_JUMP"
      }
    ],
    "flavor": "Wer angegriffen wurde, wird erreicht.",
    "max_copies": 2,
    "def": 4,
    "id": "dc_n_eh_entsatzkompanie",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A211.jpg",
    "collector": "A211"
  },
  {
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Festungspanzer",
    "ap": 4,
    "atk": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "verteidigung",
      "gepanzert"
    ],
    "text": "Wuchtgeschoss: ignoriert 2 V beim Angriff auf Gepanzerte.",
    "effects": [
      {
        "code": "IGNORE_DEF",
        "param": {
          "ignore_def": 2
        }
      }
    ],
    "flavor": "Schwer, aber da.",
    "max_copies": 2,
    "def": 6,
    "id": "dc_n_eh_festungspanzer",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A212.jpg",
    "collector": "A212"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Lazarettnetz",
    "ap": 2,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "sanitaet"
    ],
    "text": "Eigene Front -1 Schaden. Lazarett (2 AP): Einheit auf diese Karte, nächsten Zug volle V auf alten Slot.",
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
    "flavor": "Heilung ist Politik.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_lazarettnetz",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A213.jpg",
    "collector": "A213"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Schutzschirm",
    "ap": 4,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "verteidigung"
    ],
    "text": "Eigene Front +2 V. Satellitenbild (3 AP): feindliche verdeckte Front kurz aufdecken.",
    "effects": [
      {
        "code": "AURA_FRONT_DEF",
        "param": {
          "def": 2
        }
      },
      {
        "code": "SAT_PEEK",
        "param": {
          "ap": 3
        }
      }
    ],
    "flavor": "Sehen, um zu schützen.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_schutzschirm",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A214.jpg",
    "collector": "A214"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Entsatzmarsch",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "entsatz"
    ],
    "text": "Durchsuche das Deck nach bis zu 2 Infanterie-Einheiten auf die Hand. Eine davon darfst du sofort ohne AP spielen.",
    "effects": [
      {
        "code": "MOBILIZE_INF"
      }
    ],
    "flavor": "Die zweite Linie rückt vor.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_entsatzmarsch",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A215.jpg",
    "collector": "A215"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Abfangen",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "verteidigung"
    ],
    "text": "Gewählte Einheit bricht sofort ab und handelt erst wieder im nächsten Zug ihres Besitzers.",
    "effects": [
      {
        "code": "PAUSE_UNIT"
      }
    ],
    "flavor": "Den Stoß nehmen und halten.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_abfangen",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A216.jpg",
    "collector": "A216"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Medkit schwer",
    "ap": 3,
    "atk": null,
    "tags": [
      "ausruestung",
      "sanitaet"
    ],
    "text": "An Infanterie. Träger +1 A / +2 V.",
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
    "flavor": "Überleben als Auftrag.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_eq_medkit_schwer",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A217.jpg",
    "collector": "A217"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Schildwache",
    "ap": 4,
    "atk": 3,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "elite",
      "verteidigung"
    ],
    "text": "Niederhalten. Nach dem Angriff verdeckt.",
    "effects": [
      {
        "code": "NIEDERHALTEN"
      },
      {
        "code": "GUERRILLA_HIDE"
      }
    ],
    "flavor": "Sie stehen, weil andere gefallen sind.",
    "max_copies": 1,
    "def": 7,
    "id": "dc_n_eh_schildwache",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A218.jpg",
    "collector": "A218"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Entsatzbrigade",
    "ap": 4,
    "atk": 5,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "elite",
      "entsatz"
    ],
    "text": "Wenn eine eigene Fronteinheit stirbt: kostenlos offen in denselben Slot. Überfall: +1 Erstschlag.",
    "effects": [
      {
        "code": "BREACH_JUMP"
      },
      {
        "code": "AMBUSH"
      }
    ],
    "flavor": "Hilfe mit Wucht.",
    "max_copies": 1,
    "def": 5,
    "id": "dc_n_eh_entsatzbrigade",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A219.jpg",
    "collector": "A219"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Ziviles Schutzamt",
    "ap": 5,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "elite",
      "verteidigung"
    ],
    "text": "Eigene Front -1 Schaden. Koordination (1 AP): eigene Front greift erneut.",
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
    "flavor": "Ämter führen Kriege anders.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_un_ziviles_schutzamt",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A220.jpg",
    "collector": "A220"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Durchhalten",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "elite",
      "verteidigung"
    ],
    "text": "Opfere die eigene Front bis auf eine Einheit. Sie erhält +1 A und +1 V je geopferter Einheit.",
    "effects": [
      {
        "code": "LAST_STAND"
      }
    ],
    "flavor": "Die Platte bleibt stehen.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_durchhalten",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A221.jpg",
    "collector": "A221"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Großentsatz",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "elite",
      "entsatz"
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
    "flavor": "Alles, was noch schützen kann.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_grossentsatz",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A222.jpg",
    "collector": "A222"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Erinnerungsplatte",
    "ap": 4,
    "atk": null,
    "tags": [
      "ausruestung",
      "elite"
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
    "flavor": "Die Toten auf der Brust.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_eq_erinnerungsplatte",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A223.jpg",
    "collector": "A223"
  }
];
