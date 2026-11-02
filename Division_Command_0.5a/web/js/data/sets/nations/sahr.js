window.DC_SET_NATIONS = window.DC_SET_NATIONS || {};
window.DC_SET_NATIONS["Sahr"] = [
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Scheinpatrouille",
    "ap": 1,
    "atk": 2,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "taeuschung",
      "aufklaerung"
    ],
    "text": "Beim Ausspielen 1 verdeckte Feindfront aufdecken. Aufklärung (1 AP): noch eine.",
    "effects": [
      {
        "code": "AUFKLAERUNG",
        "param": {
          "n": 1,
          "onEnter": true
        }
      }
    ],
    "flavor": "Sie sollen glauben, wir seien dort.",
    "max_copies": 4,
    "def": 2,
    "id": "dc_n_eh_scheinpatrouille",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A247.jpg",
    "collector": "A247"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Schattenzug",
    "ap": 2,
    "atk": 2,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "taeuschung"
    ],
    "text": "Nach dem Angriff verdeckt. Erst nach Aufklärung wieder angreifbar.",
    "effects": [
      {
        "code": "GUERRILLA_HIDE"
      }
    ],
    "flavor": "Wer nicht gesehen wird, entscheidet.",
    "max_copies": 4,
    "def": 3,
    "id": "dc_n_eh_schattenzug",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A248.jpg",
    "collector": "A248"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Lockvogel",
    "ap": 2,
    "atk": 3,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "taeuschung"
    ],
    "text": "Überfall: +1 Schaden wenn diese Einheit den Erstschlag führt.",
    "effects": [
      {
        "code": "AMBUSH"
      }
    ],
    "flavor": "Sie kommen, weil wir rufen.",
    "max_copies": 4,
    "def": 2,
    "id": "dc_n_eh_lockvogel",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A249.jpg",
    "collector": "A249"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Falschflaggen-Team",
    "ap": 3,
    "atk": 3,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "taeuschung"
    ],
    "text": "Beim Ausspielen 1 verdeckte Feindfront. Nach dem Angriff verdeckt.",
    "effects": [
      {
        "code": "AUFKLAERUNG",
        "param": {
          "n": 1,
          "onEnter": true
        }
      },
      {
        "code": "GUERRILLA_HIDE"
      }
    ],
    "flavor": "Uniformen sind Vorschläge.",
    "max_copies": 4,
    "def": 3,
    "id": "dc_n_eh_falschflaggen_team",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A250.jpg",
    "collector": "A250"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Nebelwerferstaffel",
    "ap": 2,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "taeuschung"
    ],
    "text": "Nebelwerfer (2 AP): Token vor eigene Front, 2 eigene Züge. Verteidiger Erstschlag.",
    "effects": [
      {
        "code": "FOG_TOKEN",
        "param": {
          "ap": 2,
          "turns": 2
        }
      }
    ],
    "flavor": "Sicht ist eine Waffe – und ihr Gegenteil.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_nebelwerferstaffel",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A251.jpg",
    "collector": "A251"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Gerüchteküche",
    "ap": 3,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "taeuschung"
    ],
    "text": "Feindliche Front -1 A.",
    "effects": [
      {
        "code": "AURA_ENEMY_ATK",
        "param": {
          "atk": -1
        }
      }
    ],
    "flavor": "Zweifel kostet AP.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_geruchtekuche",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A252.jpg",
    "collector": "A252"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Finte",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "taeuschung"
    ],
    "text": "Gewählte Einheit bricht sofort ab und handelt erst wieder im nächsten Zug ihres Besitzers.",
    "effects": [
      {
        "code": "PAUSE_UNIT"
      }
    ],
    "flavor": "Sie schlagen ins Leere.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_finte",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A253.jpg",
    "collector": "A253"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Falsche Spur",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "taeuschung"
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
    "flavor": "Aufmerksamkeit umlenken.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_falsche_spur",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A254.jpg",
    "collector": "A254"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Verwirrung",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "taeuschung"
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
    "flavor": "Während sie zählen, handeln wir.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_verwirrung",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A255.jpg",
    "collector": "A255"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Rauchgranate",
    "ap": 2,
    "atk": null,
    "tags": [
      "ausruestung",
      "taeuschung"
    ],
    "text": "Wird der Träger angegriffen, Nebelfeld für diesen Kampf.",
    "effects": [
      {
        "code": "RAUCH"
      }
    ],
    "flavor": "Rauch lügt zuverlässig.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_eq_rauchgranate",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A256.jpg",
    "collector": "A256"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Saboteurtrupp",
    "ap": 3,
    "atk": 3,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "taeuschung"
    ],
    "text": "Überfall +1. Nach dem Angriff verdeckt.",
    "effects": [
      {
        "code": "AMBUSH"
      },
      {
        "code": "GUERRILLA_HIDE"
      }
    ],
    "flavor": "Kleine Schnitte, große Pläne.",
    "max_copies": 2,
    "def": 3,
    "id": "dc_n_eh_saboteurtrupp",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A257.jpg",
    "collector": "A257"
  },
  {
    "typ": "Einheit",
    "klasse": "Fahrzeug",
    "name": "Trugbild-Späher",
    "ap": 3,
    "atk": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "fahrzeug",
      "aufklaerung",
      "taeuschung"
    ],
    "text": "Beim Ausspielen 2 gegnerische Handkarten ansehen. Aufklärung (1 AP): 1 verdeckte Feindfront.",
    "effects": [
      {
        "code": "HAND_PEEK",
        "param": {
          "n": 2
        }
      },
      {
        "code": "AUFKLAERUNG",
        "param": {
          "n": 1
        }
      }
    ],
    "flavor": "Wir lesen, was sie halten.",
    "max_copies": 2,
    "def": 4,
    "id": "dc_n_eh_trugbild_spaher",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A258.jpg",
    "collector": "A258"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Täuschungszentrale",
    "ap": 4,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "taeuschung",
      "fuehrung"
    ],
    "text": "Zugstart: oberste Feindkarte sehen, optional unters Deck. Taktik (1 AP): nächste Nicht-Sofort-Karte -1 AP.",
    "effects": [
      {
        "code": "PEEK_ENEMY_TOP"
      },
      {
        "code": "TACTIC_DISCOUNT",
        "param": {
          "ap": 1
        }
      }
    ],
    "flavor": "Ihre nächste Karte ist schon unsere.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_tauschungszentrale",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A259.jpg",
    "collector": "A259"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Störsender",
    "ap": 2,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "taeuschung"
    ],
    "text": "Feindliche Front -1 A. Funkfeuer (1 AP): fliegende Drohne zerstören.",
    "effects": [
      {
        "code": "AURA_ENEMY_ATK",
        "param": {
          "atk": -1
        }
      },
      {
        "code": "JAM_DRONE",
        "param": {
          "ap": 1
        }
      }
    ],
    "flavor": "Signale lügen lassen.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_storsender",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A260.jpg",
    "collector": "A260"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Scheinangriff",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "taeuschung"
    ],
    "text": "Füge einer feindlichen Einheit oder Unterstützung 5 Schadenspunkte zu.",
    "effects": [
      {
        "code": "AIR_STRIKE",
        "param": {
          "dmg": 5
        }
      }
    ],
    "flavor": "Sie denken, das sei der Hauptstoß.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_scheinangriff",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A261.jpg",
    "collector": "A261"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Kartenlegen",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "taeuschung"
    ],
    "text": "Ziehe 3 Karten und erhalte zusätzlich 1 AP für diesen Zug.",
    "effects": [
      {
        "code": "DRAW_AP",
        "param": {
          "draw": 3,
          "ap": 1
        }
      }
    ],
    "flavor": "Neue Lügen, frische Optionen.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_kartenlegen",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A262.jpg",
    "collector": "A262"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Tarnnetz",
    "ap": 3,
    "atk": null,
    "tags": [
      "ausruestung",
      "taeuschung"
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
    "flavor": "Unsichtbar genug.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_eq_tarnnetz",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A263.jpg",
    "collector": "A263"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Phantomzelle",
    "ap": 4,
    "atk": 4,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "elite",
      "taeuschung"
    ],
    "text": "Beim Ausspielen aufklären. Überfall. Nach Angriff verdeckt.",
    "effects": [
      {
        "code": "AUFKLAERUNG",
        "param": {
          "n": 1,
          "onEnter": true
        }
      },
      {
        "code": "AMBUSH"
      },
      {
        "code": "GUERRILLA_HIDE"
      }
    ],
    "flavor": "Sie existieren nur, wenn es weh tut.",
    "max_copies": 1,
    "def": 4,
    "id": "dc_n_eh_phantomzelle",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A264.jpg",
    "collector": "A264"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Doppelagent-Trupp",
    "ap": 3,
    "atk": 3,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "elite",
      "taeuschung"
    ],
    "text": "Beim Ausspielen 2 Handkarten des Gegners ansehen. Nach dem Angriff verdeckt.",
    "effects": [
      {
        "code": "HAND_PEEK",
        "param": {
          "n": 2
        }
      },
      {
        "code": "GUERRILLA_HIDE"
      }
    ],
    "flavor": "Vertrauen ist ein Werkzeug.",
    "max_copies": 1,
    "def": 4,
    "id": "dc_n_eh_doppelagent_trupp",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A265.jpg",
    "collector": "A265"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Maskenamt",
    "ap": 5,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "elite",
      "taeuschung"
    ],
    "text": "Koordination (1 AP): Front greift erneut. Zugstart: oberste Feindkarte sehen.",
    "effects": [
      {
        "code": "REATTACK",
        "param": {
          "ap": 1
        }
      },
      {
        "code": "PEEK_ENEMY_TOP"
      }
    ],
    "flavor": "Wer die Masken vergibt, führt.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_un_maskenamt",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A266.jpg",
    "collector": "A266"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Große Täuschung",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "elite",
      "taeuschung"
    ],
    "text": "Spiele so viele Fronteinheiten von der Hand wie du möchtest, ohne AP-Kosten.",
    "effects": [
      {
        "code": "MASS_DEPLOY"
      }
    ],
    "flavor": "Plötzlich sind wir überall.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_grosse_tauschung",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A267.jpg",
    "collector": "A267"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Gedankenbruch",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "elite",
      "taeuschung"
    ],
    "text": "Füge einer feindlichen Einheit oder Unterstützung 7 Schadenspunkte zu.",
    "effects": [
      {
        "code": "AIR_STRIKE",
        "param": {
          "dmg": 7
        }
      }
    ],
    "flavor": "Wenn die Lüge zuschlägt.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_gedankenbruch",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A268.jpg",
    "collector": "A268"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Identitätskit",
    "ap": 4,
    "atk": null,
    "tags": [
      "ausruestung",
      "elite",
      "taeuschung"
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
    "flavor": "Ein Gesicht für jede Lage.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_eq_identitatskit",
    "set": "set_nations",
    "status": "live",
    "image": "nations/sahr/A269.jpg",
    "collector": "A269"
  }
];
