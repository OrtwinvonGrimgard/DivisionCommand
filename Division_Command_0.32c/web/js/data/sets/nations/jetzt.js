window.DC_SET_NATIONS = window.DC_SET_NATIONS || {};
window.DC_SET_NATIONS["Jetzt"] = [
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Sensortrupp",
    "ap": 1,
    "atk": 2,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "technik",
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
    "flavor": "Messen vor Schießen.",
    "max_copies": 4,
    "def": 2,
    "id": "dc_n_eh_sensortrupp",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A293.jpg",
    "collector": "A293"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Drohnenbedienung",
    "ap": 2,
    "atk": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "technik"
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
    "flavor": "Der Finger ist weit weg vom Ziel.",
    "max_copies": 4,
    "def": 3,
    "id": "dc_n_eh_drohnenbedienung",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A294.jpg",
    "collector": "A294"
  },
  {
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Präzisionsgeschütz",
    "ap": 3,
    "atk": 5,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "artillerie",
      "technik",
      "fahrzeug"
    ],
    "text": "Greift die gesamte feindliche Front an. Nach dem Angriff verdeckt.",
    "effects": [
      {
        "code": "ATTACK_ANY_FRONT"
      },
      {
        "code": "RELOCATE_HIDE"
      }
    ],
    "flavor": "Ein Treffer genügt, wenn er sitzt.",
    "max_copies": 4,
    "def": 3,
    "id": "dc_n_eh_prazisionsgeschutz",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A295.jpg",
    "collector": "A295"
  },
  {
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Datenpanzer",
    "ap": 3,
    "atk": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "technik",
      "gepanzert"
    ],
    "text": "Feuerüberlegenheit gegen Ungepanzerte.",
    "effects": [
      {
        "code": "FEUERUEBERLEGENHEIT"
      }
    ],
    "flavor": "Sensoren vor Panzerung.",
    "max_copies": 4,
    "def": 4,
    "id": "dc_n_eh_datenpanzer",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A296.jpg",
    "collector": "A296"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Rechenknoten",
    "ap": 2,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "technik"
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
    "flavor": "AP aus Algorithmen.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_rechenknoten",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A297.jpg",
    "collector": "A297"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Zielnetz",
    "ap": 3,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "technik"
    ],
    "text": "Eigene Front +1 A. Feuerkommando (2 AP): 3 Schaden.",
    "effects": [
      {
        "code": "AURA_FRONT_ATK",
        "param": {
          "atk": 1
        }
      },
      {
        "code": "FIRE_MISSION",
        "param": {
          "ap": 2,
          "dmg": 3
        }
      }
    ],
    "flavor": "Koordinaten statt Mut.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_zielnetz",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A298.jpg",
    "collector": "A298"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Datenstoß",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "technik"
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
    "flavor": "Paket zugestellt.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_datenstoss",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A299.jpg",
    "collector": "A299"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Lageupdate",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "technik"
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
    "flavor": "Neue Inputs, neue Outputs.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_lageupdate",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A300.jpg",
    "collector": "A300"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Kalibrierung",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "technik"
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
    "flavor": "Feintuning unter Feuer.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_kalibrierung",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A301.jpg",
    "collector": "A301"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Zielhilfe",
    "ap": 2,
    "atk": null,
    "tags": [
      "ausruestung",
      "technik"
    ],
    "text": "An Infanterie oder Fahrzeug. Träger +1 A / +1 V.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 1
        }
      }
    ],
    "flavor": "HUD gegen Zweifel.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_eq_zielhilfe",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A302.jpg",
    "collector": "A302"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Präzisionsjäger",
    "ap": 3,
    "atk": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "technik"
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
    "flavor": "Sie wissen, bevor sie gehen.",
    "max_copies": 2,
    "def": 3,
    "id": "dc_n_eh_prazisionsjager",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A303.jpg",
    "collector": "A303"
  },
  {
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Autonomer Keil",
    "ap": 4,
    "atk": 5,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "technik",
      "gepanzert"
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
    "flavor": "Entscheidung ohne Stimme.",
    "max_copies": 2,
    "def": 4,
    "id": "dc_n_eh_autonomer_keil",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A304.jpg",
    "collector": "A304"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Satellitenlink",
    "ap": 3,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "technik",
      "aufklaerung"
    ],
    "text": "Eigene Front +2 V. Satellitenbild (3 AP): verdeckte Front kurz aufdecken.",
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
    "flavor": "Orbitale Wahrheit.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_satellitenlink",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A305.jpg",
    "collector": "A305"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Drohnenkommando",
    "ap": 2,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "technik"
    ],
    "text": "Drohnenangriff (2 AP): 6 Schaden an feindlicher Front, -1 je feindlicher Luftverteidigung.",
    "effects": [
      {
        "code": "DRONE_STRIKE",
        "param": {
          "ap": 2,
          "dmg": 6
        }
      }
    ],
    "flavor": "Menschen sparen, Metall verbrauchen.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_drohnenkommando",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A306.jpg",
    "collector": "A306"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Präzisionsschlag",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "technik"
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
    "flavor": "Ein Punkt, ein Ergebnis.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_prazisionsschlag",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A307.jpg",
    "collector": "A307"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Systemreboot",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "technik"
    ],
    "text": "Gewählte Einheit bricht sofort ab und handelt erst wieder im nächsten Zug.",
    "effects": [
      {
        "code": "PAUSE_UNIT"
      }
    ],
    "flavor": "Freeze. Dann neu.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_systemreboot",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A308.jpg",
    "collector": "A308"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Sensorpaket",
    "ap": 3,
    "atk": null,
    "tags": [
      "ausruestung",
      "technik"
    ],
    "text": "An Fahrzeug oder Panzer. Träger +2 A / +1 V.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 1
        }
      }
    ],
    "flavor": "Mehr sehen als der Gegner.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_eq_sensorpaket",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A309.jpg",
    "collector": "A309"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Netzwerk-Elite",
    "ap": 4,
    "atk": 4,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "elite",
      "technik"
    ],
    "text": "Hand peek 2. Aufklären. Nach Angriff verdeckt.",
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
      },
      {
        "code": "GUERRILLA_HIDE"
      }
    ],
    "flavor": "Daten sind Deckung.",
    "max_copies": 1,
    "def": 4,
    "id": "dc_n_eh_netzwerk_elite",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A310.jpg",
    "collector": "A310"
  },
  {
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Präzisionsbatterie",
    "ap": 5,
    "atk": 7,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "artillerie",
      "elite",
      "technik",
      "fahrzeug"
    ],
    "text": "Gesamte Front angreifen. Feuerüberlegenheit.",
    "effects": [
      {
        "code": "ATTACK_ANY_FRONT"
      },
      {
        "code": "FEUERUEBERLEGENHEIT"
      }
    ],
    "flavor": "Berechnet bis zum Einschlag.",
    "max_copies": 1,
    "def": 4,
    "id": "dc_n_eh_prazisionsbatterie",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A311.jpg",
    "collector": "A311"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Lagezentrum",
    "ap": 5,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "elite",
      "technik"
    ],
    "text": "Koordination (1 AP): Front greift erneut. Aufklärung (2 AP): 3 Oberste des Gegnerdecks ordnen.",
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
    "flavor": "Die Wahrheit in Echtzeit.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_un_lagezentrum",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A312.jpg",
    "collector": "A312"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Kill-Chain",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "elite",
      "technik"
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
    "flavor": "Sensor zu Wirkmittel, ohne Umweg.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_kill_chain",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A313.jpg",
    "collector": "A313"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Überlegene Auswertung",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "elite",
      "technik"
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
    "flavor": "Mehr Daten, mehr Züge.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_uberlegene_auswertung",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A314.jpg",
    "collector": "A314"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Feuerleit-AI",
    "ap": 4,
    "atk": null,
    "tags": [
      "ausruestung",
      "elite",
      "technik"
    ],
    "text": "An Fahrzeug/Artillerie. Träger +2 A / +2 V.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 2
        }
      }
    ],
    "flavor": "Die Maschine zielt ruhiger.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_eq_feuerleit_ai",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A315.jpg",
    "collector": "A315"
  }
];
