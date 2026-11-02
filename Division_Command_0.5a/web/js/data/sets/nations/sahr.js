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
,
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Scheinpatrouille",
  "ap": 1,
  "atk": 2,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Scheinpatrouille: Täuschung, Scheinschwerpunkt, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Sahr.",
  "max_copies": 4,
  "id": "dc_n_ei_scheinpatrouille_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A524.jpg",
  "collector": "A524"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Täuschungszug",
  "ap": 2,
  "atk": 3,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Täuschungszug: Täuschung, Scheinschwerpunkt, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Sahr.",
  "max_copies": 4,
  "id": "dc_n_ei_täuschungszug_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A525.jpg",
  "collector": "A525"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Leere Reserve",
  "ap": 3,
  "atk": 4,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Leere Reserve: Täuschung, Scheinschwerpunkt, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Sahr.",
  "max_copies": 4,
  "id": "dc_n_ei_leere_reserve_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A526.jpg",
  "collector": "A526"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Überraschungstrupp",
  "ap": 1,
  "atk": 5,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Überraschungstrupp: Täuschung, Scheinschwerpunkt, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Sahr.",
  "max_copies": 4,
  "id": "dc_n_ei_überraschungstrupp_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A527.jpg",
  "collector": "A527"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Tarnkompanie",
  "ap": 2,
  "atk": 2,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Tarnkompanie: Täuschung, Scheinschwerpunkt, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Sahr.",
  "max_copies": 4,
  "id": "dc_n_ei_tarnkompanie_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A528.jpg",
  "collector": "A528"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Scheinartillerie",
  "ap": 3,
  "atk": 3,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Scheinartillerie: Täuschung, Scheinschwerpunkt, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Sahr.",
  "max_copies": 4,
  "id": "dc_n_ei_scheinartillerie_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A529.jpg",
  "collector": "A529"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Nebelwerfer",
  "ap": 1,
  "atk": 4,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Nebelwerfer: Täuschung, Scheinschwerpunkt, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Sahr.",
  "max_copies": 4,
  "id": "dc_n_ei_nebelwerfer_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A530.jpg",
  "collector": "A530"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Flankenjäger",
  "ap": 2,
  "atk": 5,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Flankenjäger: Täuschung, Scheinschwerpunkt, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Sahr.",
  "max_copies": 4,
  "id": "dc_n_ei_flankenjäger_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A531.jpg",
  "collector": "A531"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Scheinpanzer",
  "ap": 3,
  "atk": 2,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Scheinpanzer: Täuschung, Scheinschwerpunkt, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Sahr.",
  "max_copies": 4,
  "id": "dc_n_ei_scheinpanzer_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A532.jpg",
  "collector": "A532"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Hinterhaltgruppe",
  "ap": 1,
  "atk": 3,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Hinterhaltgruppe: Täuschung, Scheinschwerpunkt, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Sahr.",
  "max_copies": 4,
  "id": "dc_n_ei_hinterhaltgruppe_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A533.jpg",
  "collector": "A533"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Täuschungskommando",
  "ap": 2,
  "atk": 4,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Täuschungskommando: Täuschung, Scheinschwerpunkt, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Sahr.",
  "max_copies": 4,
  "id": "dc_n_ei_täuschungskommando_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A534.jpg",
  "collector": "A534"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Scheinzug",
  "ap": 3,
  "atk": 5,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Scheinzug: Täuschung, Scheinschwerpunkt, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Sahr.",
  "max_copies": 4,
  "id": "dc_n_ei_scheinzug_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A535.jpg",
  "collector": "A535"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Täuschungsposten",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Täuschungsposten unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_täuschungsposten_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A536.jpg",
  "collector": "A536"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Scheinlager",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Scheinlager unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_scheinlager_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A537.jpg",
  "collector": "A537"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Nebelgenerator",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Nebelgenerator unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_nebelgenerator_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A538.jpg",
  "collector": "A538"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Meldetäuschung",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Meldetäuschung unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_meldetäuschung_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A539.jpg",
  "collector": "A539"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Scheindepot",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Scheindepot unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_scheindepot_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A540.jpg",
  "collector": "A540"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Nebelstelle",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Nebelstelle unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_nebelstelle_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A541.jpg",
  "collector": "A541"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Täuschungsfunk",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Täuschungsfunk unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_täuschungsfunk_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A542.jpg",
  "collector": "A542"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Scheinmunition",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Scheinmunition unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_scheinmunition_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A543.jpg",
  "collector": "A543"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Tarnausrüstung",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Tarnausrüstung verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_tarnausrüstung_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A544.jpg",
  "collector": "A544"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Scheinwaffe",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Scheinwaffe verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_scheinwaffe_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A545.jpg",
  "collector": "A545"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Nebelgranate",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Nebelgranate verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_nebelgranate_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A546.jpg",
  "collector": "A546"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Täuschungsfunk",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Täuschungsfunk verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_täuschungsfunk_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A547.jpg",
  "collector": "A547"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Tarnnetz",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Tarnnetz verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_tarnnetz_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A548.jpg",
  "collector": "A548"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Scheinoptik",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Scheinoptik verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_scheinoptik_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A549.jpg",
  "collector": "A549"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Scheinschwerpunkt",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Scheinschwerpunkt: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_scheinschwerpunkt_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A550.jpg",
  "collector": "A550"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Täuschen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Täuschen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_täuschen_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A551.jpg",
  "collector": "A551"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Überraschungsangriff",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Überraschungsangriff: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_überraschungsangriff_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A552.jpg",
  "collector": "A552"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Nebel legen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Nebel legen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_nebel_legen_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A553.jpg",
  "collector": "A553"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Flanke schlagen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Flanke schlagen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_flanke_schlagen_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A554.jpg",
  "collector": "A554"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Scheinangriff",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Scheinangriff: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_scheinangriff_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A555.jpg",
  "collector": "A555"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Verbergen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Verbergen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_verbergen_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A556.jpg",
  "collector": "A556"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Täuschung aufdecken",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Täuschung aufdecken: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_täuschung_aufdecken_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A557.jpg",
  "collector": "A557"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Überraschung",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Überraschung: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_überraschung_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A558.jpg",
  "collector": "A558"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Nebel",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Nebel: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_nebel_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A559.jpg",
  "collector": "A559"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Flanke",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Flanke: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_flanke_sahr",
  "set": "set_nations",
  "status": "live",
  "image": "nations/sahr/A560.jpg",
  "collector": "A560"
},
{
  "typ": "Doktrin",
  "klasse": "",
  "name": "Scheinschwerpunkt",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "doktrin"
  ],
  "text": "Doktrin: Scheinschwerpunkt.",
  "effects": [],
  "flavor": "",
  "max_copies": 1,
  "id": "dc_dok_scheinschwerpunkt",
  "set": "set_nations",
  "status": "live",
  "image": "Scheinschwerpunkt-Doktrin.jpg",
  "collector": ""
},
{
  "typ": "Doktrin",
  "klasse": "",
  "name": "Abriegeln",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "doktrin"
  ],
  "text": "Doktrin: Abriegeln.",
  "effects": [],
  "flavor": "",
  "max_copies": 1,
  "id": "dc_dok_abriegeln",
  "set": "set_nations",
  "status": "live",
  "image": "Abriegeln-Doktrin.jpg",
  "collector": ""
}
];