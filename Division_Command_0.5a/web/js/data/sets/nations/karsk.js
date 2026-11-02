window.DC_SET_NATIONS = window.DC_SET_NATIONS || {};
window.DC_SET_NATIONS["Karsk"] = [
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Kradschützen",
    "ap": 2,
    "atk": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "mobil",
      "leicht"
    ],
    "text": "Überfall: +1 Schaden wenn diese Einheit den Erstschlag führt.",
    "effects": [
      {
        "code": "AMBUSH"
      }
    ],
    "flavor": "Staubwolke vor dem Befehl.",
    "max_copies": 4,
    "def": 2,
    "id": "dc_n_eh_kradschutzen",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A178.jpg",
    "collector": "A178"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Spähtrupp",
    "ap": 1,
    "atk": 2,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "aufklaerung",
      "mobil"
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
    "flavor": "Erst sehen, dann zuschlagen.",
    "max_copies": 4,
    "def": 2,
    "id": "dc_n_eh_spahtrupp",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A179.jpg",
    "collector": "A179"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Schnelle Reserve",
    "ap": 2,
    "atk": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "mobil"
    ],
    "text": "Wenn eine eigene Fronteinheit stirbt: kostenlos offen in denselben Slot.",
    "effects": [
      {
        "code": "BREACH_JUMP"
      }
    ],
    "flavor": "Lücken sind Einladungen.",
    "max_copies": 4,
    "def": 3,
    "id": "dc_n_eh_schnelle_reserve",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A180.jpg",
    "collector": "A180"
  },
  {
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Jagdpanzer leicht",
    "ap": 3,
    "atk": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "mobil",
      "gepanzert"
    ],
    "text": "Feuerüberlegenheit: +1 Schaden gegen ungepanzerte Einheiten.",
    "effects": [
      {
        "code": "FEUERUEBERLEGENHEIT"
      }
    ],
    "flavor": "Nicht halten – jagen.",
    "max_copies": 4,
    "def": 3,
    "id": "dc_n_eh_jagdpanzer_leicht",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A181.jpg",
    "collector": "A181"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Beweglicher Stab",
    "ap": 3,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "fuehrung",
      "mobil"
    ],
    "text": "Eigene Front +1 A.",
    "effects": [
      {
        "code": "AURA_FRONT_ATK",
        "param": {
          "atk": 1
        }
      }
    ],
    "flavor": "Der Stab kommt mit dem Staub.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_beweglicher_stab",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A182.jpg",
    "collector": "A182"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Treibstoffkolonne",
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
    "flavor": "Ohne Kraftstoff keine Gegenoffensive.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_treibstoffkolonne",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A183.jpg",
    "collector": "A183"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Gegenstoßbefehl",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "tempo"
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
    "flavor": "Wer geschlagen wurde, schlägt zurück.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_gegenstossbefehl",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A184.jpg",
    "collector": "A184"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Tempo halten",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "tempo"
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
    "flavor": "Stillstand ist Niederlage.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_tempo_halten",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A185.jpg",
    "collector": "A185"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Überrumpeln",
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
    "flavor": "Bevor sie sich sortieren.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_uberrumpeln",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A186.jpg",
    "collector": "A186"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Marschsatz",
    "ap": 2,
    "atk": null,
    "tags": [
      "ausruestung",
      "mobil"
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
    "flavor": "Leicht, damit es schnell geht.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_eq_marschsatz",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A187.jpg",
    "collector": "A187"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Stoßreiter",
    "ap": 3,
    "atk": 4,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "mobil"
    ],
    "text": "Überfall: +1 Schaden wenn diese Einheit den Erstschlag führt. Nach dem Angriff verdeckt.",
    "effects": [
      {
        "code": "AMBUSH"
      },
      {
        "code": "GUERRILLA_HIDE"
      }
    ],
    "flavor": "Zuschlagen und verschwinden.",
    "max_copies": 2,
    "def": 3,
    "id": "dc_n_eh_stossreiter",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A188.jpg",
    "collector": "A188"
  },
  {
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Kampfgruppe mobil",
    "ap": 4,
    "atk": 5,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "mobil",
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
    "flavor": "Durch die Nahtstelle.",
    "max_copies": 2,
    "def": 4,
    "id": "dc_n_eh_kampfgruppe_mobil",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A189.jpg",
    "collector": "A189"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Gefechtsstand vorne",
    "ap": 4,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "fuehrung"
    ],
    "text": "Koordination (1 AP): eigene Front greift erneut.",
    "effects": [
      {
        "code": "REATTACK",
        "param": {
          "ap": 1
        }
      }
    ],
    "flavor": "Der zweite Stoß sitzt tiefer.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_gefechtsstand_vorne",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A190.jpg",
    "collector": "A190"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Aufklärungskette",
    "ap": 3,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "aufklaerung"
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
    "flavor": "Tempo braucht Augen.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_aufklarungskette",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A191.jpg",
    "collector": "A191"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Flankenstoß",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "tempo"
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
    "flavor": "Wo sie nicht hinsehen.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_flankenstoss",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A192.jpg",
    "collector": "A192"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Neuer Anlauf",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Gewählte Einheit bricht sofort ab und handelt erst wieder im nächsten Zug ihres Besitzers.",
    "effects": [
      {
        "code": "PAUSE_UNIT"
      }
    ],
    "flavor": "Den Rhythmus brechen.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_neuer_anlauf",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A193.jpg",
    "collector": "A193"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Schnellvisier",
    "ap": 3,
    "atk": null,
    "tags": [
      "ausruestung",
      "mobil"
    ],
    "text": "An Panzer oder Fahrzeug. Träger +2 A / +1 V.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 1
        }
      }
    ],
    "flavor": "Zielen im Vorbeifahren.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_eq_schnellvisier",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A194.jpg",
    "collector": "A194"
  },
  {
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Durchbruchkeil",
    "ap": 5,
    "atk": 6,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "elite",
      "mobil",
      "gepanzert"
    ],
    "text": "Wuchtgeschoss: ignoriert 2 V beim Angriff auf Gepanzerte. Feuerüberlegenheit gegen Ungepanzerte.",
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
    "flavor": "Ein Loch, dann der Rest.",
    "max_copies": 1,
    "def": 5,
    "id": "dc_n_eh_durchbruchkeil",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A195.jpg",
    "collector": "A195"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Reaktionstruppe",
    "ap": 4,
    "atk": 5,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "elite",
      "mobil"
    ],
    "text": "Wenn eine eigene Fronteinheit stirbt: kostenlos offen in denselben Slot. Überfall: +1 Erstschlag-Schaden.",
    "effects": [
      {
        "code": "BREACH_JUMP"
      },
      {
        "code": "AMBUSH"
      }
    ],
    "flavor": "Die Antwort kommt vor der Frage.",
    "max_copies": 1,
    "def": 4,
    "id": "dc_n_eh_reaktionstruppe",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A196.jpg",
    "collector": "A196"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Operationszentrale",
    "ap": 5,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "fuehrung",
      "elite"
    ],
    "text": "Koordination (1 AP): eigene Front greift erneut. Aufklärung (2 AP): 3 Oberste des gegnerischen Decks ordnen.",
    "effects": [
      {
        "code": "REATTACK",
        "param": {
          "ap": 1
        }
      },
      {
        "code": "SCOUT_DECK",
        "param": {
          "ap": 2,
          "n": 3
        }
      }
    ],
    "flavor": "Tempo wird geplant, nicht gehofft.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_un_operationszentrale",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A197.jpg",
    "collector": "A197"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Doppelter Stoß",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "elite",
      "tempo"
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
    "flavor": "Zwei Wellen, eine Absicht.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_doppelter_stoss",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A198.jpg",
    "collector": "A198"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Durchbruchsbefehl",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "elite"
    ],
    "text": "Spiele so viele Fronteinheiten von der Hand wie du möchtest, ohne AP-Kosten.",
    "effects": [
      {
        "code": "MASS_DEPLOY"
      }
    ],
    "flavor": "Alles rein, bevor sie reagieren.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_durchbruchsbefehl",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A199.jpg",
    "collector": "A199"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Kommandowagen-Kit",
    "ap": 4,
    "atk": null,
    "tags": [
      "ausruestung",
      "elite",
      "mobil"
    ],
    "text": "An Panzer oder Fahrzeug. Träger +2 A / +2 V.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 2
        }
      }
    ],
    "flavor": "Führen von vorne.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_eq_kommandowagen_kit",
    "set": "set_nations",
    "status": "live",
    "image": "nations/karsk/A200.jpg",
    "collector": "A200"
  }
];
