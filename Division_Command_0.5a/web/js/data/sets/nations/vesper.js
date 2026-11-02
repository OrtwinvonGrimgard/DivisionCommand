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
];
