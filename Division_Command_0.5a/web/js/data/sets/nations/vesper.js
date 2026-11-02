window.DC_SET_NATIONS = window.DC_SET_NATIONS || {};
window.DC_SET_NATIONS["Vesper"] = [
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Nachtpatrouille",
    "ap": 1,
    "atk": 2,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "nacht",
      "aufklaerung"
    ],
    "text": "Beim Ausspielen 1 verdeckte Feindfront. Aufklärung (1 AP).",
    "effects": [
      {
        "code": "AUFKLAERUNG",
        "param": {
          "n": 1,
          "onEnter": true
        }
      }
    ],
    "flavor": "Nachts gelten andere Regeln.",
    "max_copies": 4,
    "def": 2,
    "id": "dc_n_eh_nachtpatrouille",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A316.jpg",
    "collector": "A316"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Schleichzug",
    "ap": 2,
    "atk": 2,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "nacht",
      "tarnung"
    ],
    "text": "Nach dem Angriff verdeckt.",
    "effects": [
      {
        "code": "GUERRILLA_HIDE"
      }
    ],
    "flavor": "Schritte ohne Echo.",
    "max_copies": 4,
    "def": 3,
    "id": "dc_n_eh_schleichzug",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A317.jpg",
    "collector": "A317"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Überwacher",
    "ap": 2,
    "atk": 3,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "nacht"
    ],
    "text": "Überfall: +1 Schaden beim Erstschlag.",
    "effects": [
      {
        "code": "AMBUSH"
      }
    ],
    "flavor": "Beobachten ist schon Eingriff.",
    "max_copies": 4,
    "def": 2,
    "id": "dc_n_eh_uberwacher",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A318.jpg",
    "collector": "A318"
  },
  {
    "typ": "Einheit",
    "klasse": "Fahrzeug",
    "name": "Stiller Späher",
    "ap": 3,
    "atk": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "fahrzeug",
      "nacht",
      "aufklaerung"
    ],
    "text": "Beim Ausspielen Hand peek 2. Aufklärung (1 AP).",
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
    "flavor": "Kameras ohne Kommentar.",
    "max_copies": 4,
    "def": 3,
    "id": "dc_n_eh_stiller_spaher",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A319.jpg",
    "collector": "A319"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Nebelwand",
    "ap": 2,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "nacht",
      "tarnung"
    ],
    "text": "Nebelwerfer (2 AP): Token vor eigene Front, 2 eigene Züge.",
    "effects": [
      {
        "code": "FOG_TOKEN",
        "param": {
          "ap": 2,
          "turns": 2
        }
      }
    ],
    "flavor": "Sicht ist Privileg.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_nebelwand",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A320.jpg",
    "collector": "A320"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Kontrollzelle",
    "ap": 3,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "system"
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
    "flavor": "Wer beobachtet wird, zögert.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_kontrollzelle",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A321.jpg",
    "collector": "A321"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Nachtangriff",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "nacht"
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
    "flavor": "Dunkelheit als Deckung.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_nachtangriff",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A322.jpg",
    "collector": "A322"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Akte öffnen",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "system"
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
    "flavor": "Wissen aus dem Archiv.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_akte_offnen",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A323.jpg",
    "collector": "A323"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Verschleiern",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "tarnung"
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
    "flavor": "Namen streichen, Wirkung behalten.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_verschleiern",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A324.jpg",
    "collector": "A324"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Nachtsicht",
    "ap": 2,
    "atk": null,
    "tags": [
      "ausruestung",
      "nacht"
    ],
    "text": "An Infanterie. Träger +1 A / +1 V.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 1,
          "only": "infanterie"
        }
      }
    ],
    "flavor": "Grünes Licht, kalte Welt.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_eq_nachtsicht",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A325.jpg",
    "collector": "A325"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Schattenkompanie",
    "ap": 3,
    "atk": 3,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "nacht",
      "elite"
    ],
    "text": "Überfall. Nach Angriff verdeckt.",
    "effects": [
      {
        "code": "AMBUSH"
      },
      {
        "code": "GUERRILLA_HIDE"
      }
    ],
    "flavor": "Sie sind die Regel nach Mitternacht.",
    "max_copies": 2,
    "def": 4,
    "id": "dc_n_eh_schattenkompanie",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A326.jpg",
    "collector": "A326"
  },
  {
    "typ": "Einheit",
    "klasse": "Fahrzeug",
    "name": "Überwachungskette",
    "ap": 3,
    "atk": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "fahrzeug",
      "system",
      "aufklaerung"
    ],
    "text": "Hand peek 2. Aufklärung.",
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
    "flavor": "Jeder Zug wird notiert.",
    "max_copies": 2,
    "def": 4,
    "id": "dc_n_eh_uberwachungskette",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A327.jpg",
    "collector": "A327"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Abhörnetz",
    "ap": 4,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "system"
    ],
    "text": "Zugstart: oberste Feindkarte sehen, optional unters Deck. Taktik (1 AP): -1 AP nächste Nicht-Sofort.",
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
    "flavor": "Ihre Absicht ist unser Plan.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_abhornetz",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A328.jpg",
    "collector": "A328"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Störnebel",
    "ap": 2,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "nacht"
    ],
    "text": "Feindliche Front -1 A. Funkfeuer (1 AP): Drohne zerstören.",
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
    "flavor": "Signale in den Nebel.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_stornebel",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A329.jpg",
    "collector": "A329"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Stille Übernahme",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "system"
    ],
    "text": "Gewählte Einheit bricht sofort ab und handelt erst wieder im nächsten Zug.",
    "effects": [
      {
        "code": "PAUSE_UNIT"
      }
    ],
    "flavor": "Aus dem Spiel genommen.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_stille_ubernahme",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A330.jpg",
    "collector": "A330"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Aktenfund",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "system"
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
    "flavor": "Mehr Züge im System.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_aktenfund",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A331.jpg",
    "collector": "A331"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Tarnanzug",
    "ap": 3,
    "atk": null,
    "tags": [
      "ausruestung",
      "tarnung",
      "nacht"
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
    "flavor": "Form ohne Gesicht.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_eq_tarnanzug",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A332.jpg",
    "collector": "A332"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Nachtjäger",
    "ap": 4,
    "atk": 5,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "elite",
      "nacht"
    ],
    "text": "Aufklären. Überfall. Nach Angriff verdeckt.",
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
    "flavor": "Das Spiel endet für einen.",
    "max_copies": 1,
    "def": 4,
    "id": "dc_n_eh_nachtjager",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A333.jpg",
    "collector": "A333"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Systemwächter",
    "ap": 4,
    "atk": 3,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "elite",
      "system"
    ],
    "text": "Niederhalten. Nach Angriff verdeckt.",
    "effects": [
      {
        "code": "NIEDERHALTEN"
      },
      {
        "code": "GUERRILLA_HIDE"
      }
    ],
    "flavor": "Wer nicht spielt, fällt heraus.",
    "max_copies": 1,
    "def": 6,
    "id": "dc_n_eh_systemwachter",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A334.jpg",
    "collector": "A334"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Zentrale der Züge",
    "ap": 5,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "elite",
      "system"
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
    "flavor": "Alle Partien an einem Tisch.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_un_zentrale_der_zuge",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A335.jpg",
    "collector": "A335"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Aus dem Spiel",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "elite",
      "system"
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
    "flavor": "Ruhiggestellt.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_aus_dem_spiel",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A336.jpg",
    "collector": "A336"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Nacht der langen Akten",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "elite",
      "nacht"
    ],
    "text": "Spiele so viele Fronteinheiten von der Hand wie du möchtest, ohne AP-Kosten.",
    "effects": [
      {
        "code": "MASS_DEPLOY"
      }
    ],
    "flavor": "Wenn das System zuschlägt, zählt niemand mit.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_nacht_der_langen_akten",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A337.jpg",
    "collector": "A337"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Überwachungsmodul",
    "ap": 4,
    "atk": null,
    "tags": [
      "ausruestung",
      "elite",
      "system"
    ],
    "text": "An Infanterie oder Fahrzeug. Träger +2 A / +2 V.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 2
        }
      }
    ],
    "flavor": "Sehen und streichen.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_eq_uberwachungsmodul",
    "set": "set_nations",
    "status": "live",
    "image": "nations/vesper/A338.jpg",
    "collector": "A338"
  }
,
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Nachtpatrouille",
  "ap": 1,
  "atk": 2,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Nachtpatrouille: Nacht, Verdeckung, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Vesper.",
  "max_copies": 4,
  "id": "dc_n_ei_nachtpatrouille_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A635.jpg",
  "collector": "A635"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Verdeckter Zug",
  "ap": 2,
  "atk": 3,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Verdeckter Zug: Nacht, Verdeckung, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Vesper.",
  "max_copies": 4,
  "id": "dc_n_ei_verdeckter_zug_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A636.jpg",
  "collector": "A636"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Nachtsichttrupp",
  "ap": 3,
  "atk": 4,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Nachtsichttrupp: Nacht, Verdeckung, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Vesper.",
  "max_copies": 4,
  "id": "dc_n_ei_nachtsichttrupp_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A637.jpg",
  "collector": "A637"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Überraschungskommando",
  "ap": 1,
  "atk": 5,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Überraschungskommando: Nacht, Verdeckung, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Vesper.",
  "max_copies": 4,
  "id": "dc_n_ei_überraschungskommando_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A638.jpg",
  "collector": "A638"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Dunkelheitsjäger",
  "ap": 2,
  "atk": 2,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Dunkelheitsjäger: Nacht, Verdeckung, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Vesper.",
  "max_copies": 4,
  "id": "dc_n_ei_dunkelheitsjäger_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A639.jpg",
  "collector": "A639"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Nebelwerfer",
  "ap": 3,
  "atk": 3,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Nebelwerfer: Nacht, Verdeckung, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Vesper.",
  "max_copies": 4,
  "id": "dc_n_ei_nebelwerfer_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A640.jpg",
  "collector": "A640"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Verdeckte Artillerie",
  "ap": 1,
  "atk": 4,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Verdeckte Artillerie: Nacht, Verdeckung, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Vesper.",
  "max_copies": 4,
  "id": "dc_n_ei_verdeckte_artillerie_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A641.jpg",
  "collector": "A641"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Nachtpionier",
  "ap": 2,
  "atk": 5,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Nachtpionier: Nacht, Verdeckung, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Vesper.",
  "max_copies": 4,
  "id": "dc_n_ei_nachtpionier_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A642.jpg",
  "collector": "A642"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Schattenzug",
  "ap": 3,
  "atk": 2,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Schattenzug: Nacht, Verdeckung, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Vesper.",
  "max_copies": 4,
  "id": "dc_n_ei_schattenzug_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A643.jpg",
  "collector": "A643"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Überwachungsgruppe",
  "ap": 1,
  "atk": 3,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Überwachungsgruppe: Nacht, Verdeckung, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Vesper.",
  "max_copies": 4,
  "id": "dc_n_ei_überwachungsgruppe_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A644.jpg",
  "collector": "A644"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Nachtjäger",
  "ap": 2,
  "atk": 4,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Nachtjäger: Nacht, Verdeckung, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Vesper.",
  "max_copies": 4,
  "id": "dc_n_ei_nachtjäger_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A645.jpg",
  "collector": "A645"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Verdeckungskommando",
  "ap": 3,
  "atk": 5,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Verdeckungskommando: Nacht, Verdeckung, Überraschung.",
  "effects": [],
  "flavor": "Typisch für Vesper.",
  "max_copies": 4,
  "id": "dc_n_ei_verdeckungskommando_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A646.jpg",
  "collector": "A646"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Nachtbeobachtung",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Nachtbeobachtung unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_nachtbeobachtung_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A647.jpg",
  "collector": "A647"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Verdeckter Nachschub",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Verdeckter Nachschub unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_verdeckter_nachschub_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A648.jpg",
  "collector": "A648"
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
  "id": "dc_n_un_nebelstelle_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A649.jpg",
  "collector": "A649"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Nachtsichtposten",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Nachtsichtposten unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_nachtsichtposten_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A650.jpg",
  "collector": "A650"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Nachtlager",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Nachtlager unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_nachtlager_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A651.jpg",
  "collector": "A651"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Verdecktes Depot",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Verdecktes Depot unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_verdecktes_depot_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A652.jpg",
  "collector": "A652"
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
  "id": "dc_n_un_nebelgenerator_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A653.jpg",
  "collector": "A653"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Nachtsichtnetz",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Nachtsichtnetz unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_nachtsichtnetz_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A654.jpg",
  "collector": "A654"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Nachtsichtgerät",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Nachtsichtgerät verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_nachtsichtgerät_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A655.jpg",
  "collector": "A655"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Tarnkleidung",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Tarnkleidung verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_tarnkleidung_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A656.jpg",
  "collector": "A656"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Schalldämpfer",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Schalldämpfer verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_schalldämpfer_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A657.jpg",
  "collector": "A657"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Nachtoptik",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Nachtoptik verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_nachtoptik_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A658.jpg",
  "collector": "A658"
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
  "id": "dc_n_au_tarnnetz_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A659.jpg",
  "collector": "A659"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Nachtausrüstung",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Nachtausrüstung verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_nachtausrüstung_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A660.jpg",
  "collector": "A660"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Verdeckt angreifen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Verdeckt angreifen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_verdeckt_angreifen_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A661.jpg",
  "collector": "A661"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Nachtangriff",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Nachtangriff: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_nachtangriff_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A662.jpg",
  "collector": "A662"
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
  "id": "dc_n_so_überraschung_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A663.jpg",
  "collector": "A663"
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
  "id": "dc_n_so_nebel_legen_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A664.jpg",
  "collector": "A664"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Aufklären bei Nacht",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Aufklären bei Nacht: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_aufklären_bei_nacht_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A665.jpg",
  "collector": "A665"
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
  "id": "dc_n_so_verbergen_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A666.jpg",
  "collector": "A666"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Nachtstoß",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Nachtstoß: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_nachtstoß_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A667.jpg",
  "collector": "A667"
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
  "id": "dc_n_so_überraschungsangriff_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A668.jpg",
  "collector": "A668"
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
  "id": "dc_n_so_nebel_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A669.jpg",
  "collector": "A669"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Nacht",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Nacht: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_nacht_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A670.jpg",
  "collector": "A670"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Verdeckt",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Verdeckt: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_verdeckt_vesper",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vesper/A671.jpg",
  "collector": "A671"
},
{
  "typ": "Doktrin",
  "klasse": "",
  "name": "Lauer",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "doktrin"
  ],
  "text": "Doktrin: Lauer.",
  "effects": [],
  "flavor": "",
  "max_copies": 1,
  "id": "dc_dok_lauer",
  "set": "set_nations",
  "status": "live",
  "image": "Lauer-Doktrin.jpg",
  "collector": ""
},
{
  "typ": "Doktrin",
  "klasse": "",
  "name": "Verdeckte Stellung",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "doktrin"
  ],
  "text": "Doktrin: Verdeckte Stellung.",
  "effects": [],
  "flavor": "",
  "max_copies": 1,
  "id": "dc_dok_verteilte_stellung",
  "set": "set_nations",
  "status": "live",
  "image": "Verteilte-Stellung-Doktrin.jpg",
  "collector": ""
}
];