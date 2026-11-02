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
,
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Kradschützen",
  "ap": 1,
  "atk": 2,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Kradschützen: Mobil, Gegenstoß, Tempo.",
  "effects": [],
  "flavor": "Typisch für Karsk.",
  "max_copies": 4,
  "id": "dc_n_ei_kradschützen_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A413.jpg",
  "collector": "A413"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Spähtrupp",
  "ap": 2,
  "atk": 3,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Spähtrupp: Mobil, Gegenstoß, Tempo.",
  "effects": [],
  "flavor": "Typisch für Karsk.",
  "max_copies": 4,
  "id": "dc_n_ei_spähtrupp_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A414.jpg",
  "collector": "A414"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Schnelle Reserve",
  "ap": 3,
  "atk": 4,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Schnelle Reserve: Mobil, Gegenstoß, Tempo.",
  "effects": [],
  "flavor": "Typisch für Karsk.",
  "max_copies": 4,
  "id": "dc_n_ei_schnelle_reserve_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A415.jpg",
  "collector": "A415"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Gegenstoßgruppe",
  "ap": 1,
  "atk": 5,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Gegenstoßgruppe: Mobil, Gegenstoß, Tempo.",
  "effects": [],
  "flavor": "Typisch für Karsk.",
  "max_copies": 4,
  "id": "dc_n_ei_gegenstoßgruppe_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A416.jpg",
  "collector": "A416"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Aufklärungsrad",
  "ap": 2,
  "atk": 2,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Aufklärungsrad: Mobil, Gegenstoß, Tempo.",
  "effects": [],
  "flavor": "Typisch für Karsk.",
  "max_copies": 4,
  "id": "dc_n_ei_aufklärungsrad_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A417.jpg",
  "collector": "A417"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Leichte Panzer",
  "ap": 3,
  "atk": 3,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Leichte Panzer: Mobil, Gegenstoß, Tempo.",
  "effects": [],
  "flavor": "Typisch für Karsk.",
  "max_copies": 4,
  "id": "dc_n_ei_leichte_panzer_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A418.jpg",
  "collector": "A418"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Mot. Infanterie",
  "ap": 1,
  "atk": 4,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Mot. Infanterie: Mobil, Gegenstoß, Tempo.",
  "effects": [],
  "flavor": "Typisch für Karsk.",
  "max_copies": 4,
  "id": "dc_n_ei_mot_infanterie_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A419.jpg",
  "collector": "A419"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Jagdkommando",
  "ap": 2,
  "atk": 5,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Jagdkommando: Mobil, Gegenstoß, Tempo.",
  "effects": [],
  "flavor": "Typisch für Karsk.",
  "max_copies": 4,
  "id": "dc_n_ei_jagdkommando_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A420.jpg",
  "collector": "A420"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Vorausabteilung",
  "ap": 3,
  "atk": 2,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Vorausabteilung: Mobil, Gegenstoß, Tempo.",
  "effects": [],
  "flavor": "Typisch für Karsk.",
  "max_copies": 4,
  "id": "dc_n_ei_vorausabteilung_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A421.jpg",
  "collector": "A421"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Rückzugsdeckung",
  "ap": 1,
  "atk": 3,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Rückzugsdeckung: Mobil, Gegenstoß, Tempo.",
  "effects": [],
  "flavor": "Typisch für Karsk.",
  "max_copies": 4,
  "id": "dc_n_ei_rückzugsdeckung_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A422.jpg",
  "collector": "A422"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Flankenjäger",
  "ap": 2,
  "atk": 4,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Flankenjäger: Mobil, Gegenstoß, Tempo.",
  "effects": [],
  "flavor": "Typisch für Karsk.",
  "max_copies": 4,
  "id": "dc_n_ei_flankenjäger_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A423.jpg",
  "collector": "A423"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Schneller Zug",
  "ap": 3,
  "atk": 5,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Schneller Zug: Mobil, Gegenstoß, Tempo.",
  "effects": [],
  "flavor": "Typisch für Karsk.",
  "max_copies": 4,
  "id": "dc_n_ei_schneller_zug_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A424.jpg",
  "collector": "A424"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Beweglicher Nachschub",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Beweglicher Nachschub unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_beweglicher_nachschub_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A425.jpg",
  "collector": "A425"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Feldwerkstatt",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Feldwerkstatt unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_feldwerkstatt_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A426.jpg",
  "collector": "A426"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Treibstoffdepot",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Treibstoffdepot unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_treibstoffdepot_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A427.jpg",
  "collector": "A427"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Meldeposten",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Meldeposten unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_meldeposten_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A428.jpg",
  "collector": "A428"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Mobiles Depot",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Mobiles Depot unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_mobiles_depot_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A429.jpg",
  "collector": "A429"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Reparaturpunkt",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Reparaturpunkt unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_reparaturpunkt_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A430.jpg",
  "collector": "A430"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Treibstofflager",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Treibstofflager unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_treibstofflager_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A431.jpg",
  "collector": "A431"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Meldekette",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Meldekette unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_meldekette_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A432.jpg",
  "collector": "A432"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Funkgerät",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Funkgerät verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_funkgerät_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A433.jpg",
  "collector": "A433"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Kompass",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Kompass verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_kompass_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A434.jpg",
  "collector": "A434"
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
  "id": "dc_n_au_tarnnetz_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A435.jpg",
  "collector": "A435"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Schnelle Munition",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Schnelle Munition verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_schnelle_munition_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A436.jpg",
  "collector": "A436"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Mobiles Funk",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Mobiles Funk verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_mobiles_funk_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A437.jpg",
  "collector": "A437"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Ersatzteil",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Ersatzteil verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_ersatzteil_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A438.jpg",
  "collector": "A438"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Gegenstoß",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Gegenstoß: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_gegenstoß_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A439.jpg",
  "collector": "A439"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Ausweichen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Ausweichen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_ausweichen_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A440.jpg",
  "collector": "A440"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Flankenangriff",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Flankenangriff: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_flankenangriff_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A441.jpg",
  "collector": "A441"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Rückzug decken",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Rückzug decken: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_rückzug_decken_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A442.jpg",
  "collector": "A442"
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
  "id": "dc_n_so_überraschungsangriff_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A443.jpg",
  "collector": "A443"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Tempo erhöhen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Tempo erhöhen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_tempo_erhöhen_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A444.jpg",
  "collector": "A444"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Reserve rufen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Reserve rufen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_reserve_rufen_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A445.jpg",
  "collector": "A445"
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
  "id": "dc_n_so_flanke_schlagen_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A446.jpg",
  "collector": "A446"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Aus dem Hinterhalt",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Aus dem Hinterhalt: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_aus_dem_hinterhalt_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A447.jpg",
  "collector": "A447"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Schnell verlegen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Schnell verlegen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_schnell_verlegen_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A448.jpg",
  "collector": "A448"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Gegenangriff",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Gegenangriff: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_gegenangriff_karsk",
  "set": "set_nations",
  "status": "live",
  "image": "nations/karsk/A449.jpg",
  "collector": "A449"
},
{
  "typ": "Doktrin",
  "klasse": "",
  "name": "Gegenstoß",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "doktrin"
  ],
  "text": "Doktrin: Gegenstoß.",
  "effects": [],
  "flavor": "",
  "max_copies": 1,
  "id": "dc_dok_gegenstoss",
  "set": "set_nations",
  "status": "live",
  "image": "Gegenstoss-Doktrin.jpg",
  "collector": ""
},
{
  "typ": "Doktrin",
  "klasse": "",
  "name": "Stoßtrupp",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "doktrin"
  ],
  "text": "Doktrin: Stoßtrupp.",
  "effects": [],
  "flavor": "",
  "max_copies": 1,
  "id": "dc_dok_stosstrupp",
  "set": "set_nations",
  "status": "live",
  "image": "Stosstrupp-Doktrin.jpg",
  "collector": ""
}
];