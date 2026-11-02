window.DC_SET_NATIONS = window.DC_SET_NATIONS || {};
window.DC_SET_NATIONS["Vael"] = [
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Beobachtertrupp",
    "ap": 1,
    "atk": 2,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "aufklaerung",
      "leicht"
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
    "flavor": "Koordinaten reichen. Der Rest ist Mathematik.",
    "max_copies": 4,
    "def": 2,
    "id": "dc_n_eh_beobachtertrupp",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A132.jpg",
    "collector": "A132"
  },
  {
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Leichte Batterie",
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
    "flavor": "Kaliber klein, Wirkung planbar.",
    "max_copies": 4,
    "def": 3,
    "id": "dc_n_eh_leichte_batterie",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A133.jpg",
    "collector": "A133"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Messzug",
    "ap": 2,
    "atk": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "aufklaerung"
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
    "flavor": "Wer misst, trifft.",
    "max_copies": 4,
    "def": 3,
    "id": "dc_n_eh_messzug",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A134.jpg",
    "collector": "A134"
  },
  {
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Rohrzug",
    "ap": 3,
    "atk": 5,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "artillerie",
      "fahrzeug"
    ],
    "text": "Greift die gesamte feindliche Front an. Nach dem Angriff bis zum nächsten eigenen Zug verdeckt.",
    "effects": [
      {
        "code": "ATTACK_ANY_FRONT"
      },
      {
        "code": "RELOCATE_HIDE"
      }
    ],
    "flavor": "Stellung verlassen, bevor das Echo kommt.",
    "max_copies": 4,
    "def": 3,
    "id": "dc_n_eh_rohrzug",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A135.jpg",
    "collector": "A135"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Munitionskette",
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
    "flavor": "Solange die Kette läuft, schweigen die Bilanzprüfer.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_munitionskette",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A136.jpg",
    "collector": "A136"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Feuerleitposten",
    "ap": 3,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "artillerie",
      "fuehrung"
    ],
    "text": "Eigene Front +1 A. Feuerkommando (2 AP): einer feindlichen Fronteinheit 3 Schaden.",
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
    "flavor": "Ein Funkspruch, drei Einschläge.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_feuerleitposten",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A137.jpg",
    "collector": "A137"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Sperrfeuer",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "artillerie"
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
    "flavor": "Fläche statt Präzision – heute.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_sperrfeuer",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A138.jpg",
    "collector": "A138"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Zielmarkierung",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "aufklaerung"
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
    "flavor": "Wer markiert ist, lebt kürzer.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_zielmarkierung",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A139.jpg",
    "collector": "A139"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Nachladen",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "logistik"
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
    "flavor": "Die nächste Salve wartet schon.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_nachladen",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A140.jpg",
    "collector": "A140"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Richtoptik",
    "ap": 2,
    "atk": null,
    "tags": [
      "ausruestung",
      "optik"
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
    "flavor": "Glas und Geduld.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_eq_richtoptik",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A141.jpg",
    "collector": "A141"
  },
  {
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Schwere Batterie",
    "ap": 4,
    "atk": 6,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "artillerie",
      "fahrzeug",
      "schwer"
    ],
    "text": "Greift die gesamte feindliche Front an. Nach dem Angriff bis zum nächsten eigenen Zug verdeckt.",
    "effects": [
      {
        "code": "ATTACK_ANY_FRONT"
      },
      {
        "code": "RELOCATE_HIDE"
      }
    ],
    "flavor": "Wenn die Erde wartet, kommt sie.",
    "max_copies": 2,
    "def": 4,
    "id": "dc_n_eh_schwere_batterie",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A142.jpg",
    "collector": "A142"
  },
  {
    "typ": "Einheit",
    "klasse": "Fahrzeug",
    "name": "Spähwagen",
    "ap": 3,
    "atk": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "fahrzeug",
      "aufklaerung",
      "gepanzert"
    ],
    "text": "Beim Ausspielen 2 gegnerische Handkarten wählen und ansehen. Aufklärung (1 AP): 1 verdeckte Feindfront.",
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
    "flavor": "Augen auf Rädern.",
    "max_copies": 2,
    "def": 4,
    "id": "dc_n_eh_spahwagen",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A143.jpg",
    "collector": "A143"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Feuerleitstelle",
    "ap": 4,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "artillerie",
      "fuehrung"
    ],
    "text": "Eigene Front +1 A. Feuerkommando (2 AP): einer feindlichen Fronteinheit 4 Schaden.",
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
          "dmg": 4
        }
      }
    ],
    "flavor": "Hier werden Einschläge verkauft.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_feuerleitstelle",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A144.jpg",
    "collector": "A144"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Ortungsnetz",
    "ap": 3,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "aufklaerung"
    ],
    "text": "Eigene Front +2 V. Satellitenbild (3 AP): feindliche verdeckte Front kurz aufdecken, nach Bestätigung wieder verdeckt.",
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
    "flavor": "Was gesehen wird, gehört der Planung.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_ortungsnetz",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A145.jpg",
    "collector": "A145"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Gegenbatterie",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "artillerie"
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
    "flavor": "Wer schießt, wird vermessen.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_gegenbatterie",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A146.jpg",
    "collector": "A146"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Lagebild",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "aufklaerung"
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
    "flavor": "Informationen vor Emotionen.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_lagebild",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A147.jpg",
    "collector": "A147"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Entfernungsmesser",
    "ap": 3,
    "atk": null,
    "tags": [
      "ausruestung",
      "optik",
      "artillerie"
    ],
    "text": "An Artillerie oder Fahrzeug. Träger +2 A / +1 V.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 1
        }
      }
    ],
    "flavor": "Millimeter entscheiden über Minuten.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_eq_entfernungsmesser",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A148.jpg",
    "collector": "A148"
  },
  {
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Großbatterie",
    "ap": 5,
    "atk": 7,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "artillerie",
      "fahrzeug",
      "elite"
    ],
    "text": "Greift die gesamte feindliche Front an. Feuerüberlegenheit: +1 Schaden gegen ungepanzerte Einheiten.",
    "effects": [
      {
        "code": "ATTACK_ANY_FRONT"
      },
      {
        "code": "FEUERUEBERLEGENHEIT"
      }
    ],
    "flavor": "Ein Auftrag, viele Rechnungen.",
    "max_copies": 1,
    "def": 5,
    "id": "dc_n_eh_grossbatterie",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A149.jpg",
    "collector": "A149"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Vorausbeobachter",
    "ap": 3,
    "atk": 3,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "aufklaerung",
      "elite"
    ],
    "text": "Beim Ausspielen 1 verdeckte Feindfront aufdecken. Aufklärung (1 AP): noch eine. Nach dem Angriff verdeckt.",
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
    "flavor": "Er sieht, was andere zahlen.",
    "max_copies": 1,
    "def": 3,
    "id": "dc_n_eh_vorausbeobachter",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A150.jpg",
    "collector": "A150"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Feuerplanbüro",
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
    "flavor": "Der Plan ist die Waffe.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_un_feuerplanburo",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A151.jpg",
    "collector": "A151"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Vernichtungsfeuer",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "artillerie",
      "elite"
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
    "flavor": "Abschluss der Lieferung.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_vernichtungsfeuer",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A152.jpg",
    "collector": "A152"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Kalibrierter Schlag",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "artillerie",
      "elite"
    ],
    "text": "Gewählte Einheit bricht sofort ab und handelt erst wieder im nächsten Zug ihres Besitzers.",
    "effects": [
      {
        "code": "PAUSE_UNIT"
      }
    ],
    "flavor": "Nicht zerstören – unterbrechen.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_kalibrierter_schlag",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A153.jpg",
    "collector": "A153"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Feuerleitrechner",
    "ap": 4,
    "atk": null,
    "tags": [
      "ausruestung",
      "technik",
      "elite"
    ],
    "text": "An Fahrzeug oder Artillerie. Träger +2 A / +2 V.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 2
        }
      }
    ],
    "flavor": "Zahlen statt Mutproben.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_eq_feuerleitrechner",
    "set": "set_nations",
    "status": "live",
    "image": "alpha/A154.jpg",
    "collector": "A154"
  }
];
