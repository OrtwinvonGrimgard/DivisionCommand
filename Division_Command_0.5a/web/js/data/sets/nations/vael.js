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
    "image": "nations/vael/A132.jpg",
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
    "image": "nations/vael/A133.jpg",
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
    "image": "nations/vael/A134.jpg",
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
    "image": "nations/vael/A135.jpg",
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
    "image": "nations/vael/A136.jpg",
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
    "image": "nations/vael/A137.jpg",
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
    "image": "nations/vael/A138.jpg",
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
    "image": "nations/vael/A139.jpg",
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
    "image": "nations/vael/A140.jpg",
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
    "image": "nations/vael/A141.jpg",
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
    "image": "nations/vael/A142.jpg",
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
    "image": "nations/vael/A143.jpg",
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
    "image": "nations/vael/A144.jpg",
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
    "image": "nations/vael/A145.jpg",
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
    "image": "nations/vael/A146.jpg",
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
    "image": "nations/vael/A147.jpg",
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
    "image": "nations/vael/A148.jpg",
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
    "image": "nations/vael/A149.jpg",
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
    "image": "nations/vael/A150.jpg",
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
    "image": "nations/vael/A151.jpg",
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
    "image": "nations/vael/A152.jpg",
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
    "image": "nations/vael/A153.jpg",
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
    "image": "nations/vael/A154.jpg",
    "collector": "A154"
  }
,
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Messbatterie",
  "ap": 1,
  "atk": 2,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Messbatterie: Artillerie, Aufklärung, Feuerplanung.",
  "effects": [],
  "flavor": "Typisch für Vael.",
  "max_copies": 4,
  "id": "dc_n_ei_messbatterie_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A339.jpg",
  "collector": "A339"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Zielaufklärer",
  "ap": 2,
  "atk": 3,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Zielaufklärer: Artillerie, Aufklärung, Feuerplanung.",
  "effects": [],
  "flavor": "Typisch für Vael.",
  "max_copies": 4,
  "id": "dc_n_ei_zielaufklärer_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A340.jpg",
  "collector": "A340"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Feuerleittrupp",
  "ap": 3,
  "atk": 4,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Feuerleittrupp: Artillerie, Aufklärung, Feuerplanung.",
  "effects": [],
  "flavor": "Typisch für Vael.",
  "max_copies": 4,
  "id": "dc_n_ei_feuerleittrupp_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A341.jpg",
  "collector": "A341"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Beobachtungspanzer",
  "ap": 1,
  "atk": 5,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Beobachtungspanzer: Artillerie, Aufklärung, Feuerplanung.",
  "effects": [],
  "flavor": "Typisch für Vael.",
  "max_copies": 4,
  "id": "dc_n_ei_beobachtungspanzer_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A342.jpg",
  "collector": "A342"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Nachschubkolonne",
  "ap": 2,
  "atk": 2,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Nachschubkolonne: Artillerie, Aufklärung, Feuerplanung.",
  "effects": [],
  "flavor": "Typisch für Vael.",
  "max_copies": 4,
  "id": "dc_n_ei_nachschubkolonne_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A343.jpg",
  "collector": "A343"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Richttrupp",
  "ap": 3,
  "atk": 3,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Richttrupp: Artillerie, Aufklärung, Feuerplanung.",
  "effects": [],
  "flavor": "Typisch für Vael.",
  "max_copies": 4,
  "id": "dc_n_ei_richttrupp_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A344.jpg",
  "collector": "A344"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Aufklärungsdrohne",
  "ap": 1,
  "atk": 4,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Aufklärungsdrohne: Artillerie, Aufklärung, Feuerplanung.",
  "effects": [],
  "flavor": "Typisch für Vael.",
  "max_copies": 4,
  "id": "dc_n_ei_aufklärungsdrohne_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A345.jpg",
  "collector": "A345"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Geschützzug",
  "ap": 2,
  "atk": 5,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Geschützzug: Artillerie, Aufklärung, Feuerplanung.",
  "effects": [],
  "flavor": "Typisch für Vael.",
  "max_copies": 4,
  "id": "dc_n_ei_geschützzug_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A346.jpg",
  "collector": "A346"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Vorposten",
  "ap": 3,
  "atk": 2,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Vorposten: Artillerie, Aufklärung, Feuerplanung.",
  "effects": [],
  "flavor": "Typisch für Vael.",
  "max_copies": 4,
  "id": "dc_n_ei_vorposten_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A347.jpg",
  "collector": "A347"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Kanonierzug",
  "ap": 1,
  "atk": 3,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Kanonierzug: Artillerie, Aufklärung, Feuerplanung.",
  "effects": [],
  "flavor": "Typisch für Vael.",
  "max_copies": 4,
  "id": "dc_n_ei_kanonierzug_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A348.jpg",
  "collector": "A348"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Artilleriebeobachter",
  "ap": 2,
  "atk": 4,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Artilleriebeobachter: Artillerie, Aufklärung, Feuerplanung.",
  "effects": [],
  "flavor": "Typisch für Vael.",
  "max_copies": 4,
  "id": "dc_n_ei_artilleriebeobachter_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A349.jpg",
  "collector": "A349"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Feuerleitpanzer",
  "ap": 3,
  "atk": 5,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Feuerleitpanzer: Artillerie, Aufklärung, Feuerplanung.",
  "effects": [],
  "flavor": "Typisch für Vael.",
  "max_copies": 4,
  "id": "dc_n_ei_feuerleitpanzer_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A350.jpg",
  "collector": "A350"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Feuerleitstelle",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Feuerleitstelle unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_feuerleitstelle_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A351.jpg",
  "collector": "A351"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Munitionslager",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Munitionslager unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_munitionslager_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A352.jpg",
  "collector": "A352"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Beobachtungsposten",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Beobachtungsposten unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_beobachtungsposten_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A353.jpg",
  "collector": "A353"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Zielmarkierung",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Zielmarkierung unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_zielmarkierung_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A354.jpg",
  "collector": "A354"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Nachladen",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Nachladen unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_nachladen_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A355.jpg",
  "collector": "A355"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Koordinatenabgleich",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Koordinatenabgleich unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_koordinatenabgleich_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A356.jpg",
  "collector": "A356"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Artilleriedepot",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Artilleriedepot unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_artilleriedepot_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A357.jpg",
  "collector": "A357"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Aufklärungsnetz",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Aufklärungsnetz unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_aufklärungsnetz_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A358.jpg",
  "collector": "A358"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Richtoptik",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Richtoptik verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_richtoptik_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A359.jpg",
  "collector": "A359"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Feuerleitrechner",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Feuerleitrechner verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_feuerleitrechner_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A360.jpg",
  "collector": "A360"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Aufklärungsgerät",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Aufklärungsgerät verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_aufklärungsgerät_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A361.jpg",
  "collector": "A361"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Zielsucher",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Zielsucher verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_zielsucher_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A362.jpg",
  "collector": "A362"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Geschützoptik",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Geschützoptik verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_geschützoptik_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A363.jpg",
  "collector": "A363"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Munitionsrechner",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Munitionsrechner verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_munitionsrechner_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A364.jpg",
  "collector": "A364"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Sperrfeuer",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Sperrfeuer: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_sperrfeuer_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A365.jpg",
  "collector": "A365"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Punktbeschuss",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Punktbeschuss: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_punktbeschuss_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A366.jpg",
  "collector": "A366"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Zielmarkierung",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Zielmarkierung: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_zielmarkierung_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A367.jpg",
  "collector": "A367"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Nachladen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Nachladen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_nachladen_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A368.jpg",
  "collector": "A368"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Koordinatenfeuer",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Koordinatenfeuer: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_koordinatenfeuer_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A369.jpg",
  "collector": "A369"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Artillerieschlag",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Artillerieschlag: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_artillerieschlag_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A370.jpg",
  "collector": "A370"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Aufklären",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Aufklären: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_aufklären_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A371.jpg",
  "collector": "A371"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Feuer erwidern",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Feuer erwidern: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_feuer_erwidern_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A372.jpg",
  "collector": "A372"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Ziel wechseln",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Ziel wechseln: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_ziel_wechseln_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A373.jpg",
  "collector": "A373"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Munition anfordern",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Munition anfordern: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_munition_anfordern_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A374.jpg",
  "collector": "A374"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Beobachtung",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Beobachtung: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_beobachtung_vael",
  "set": "set_nations",
  "status": "live",
  "image": "nations/vael/A375.jpg",
  "collector": "A375"
},
{
  "typ": "Doktrin",
  "klasse": "",
  "name": "Feuerplan",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "doktrin"
  ],
  "text": "Doktrin: Feuerplan.",
  "effects": [],
  "flavor": "",
  "max_copies": 1,
  "id": "dc_dok_feuerplan",
  "set": "set_nations",
  "status": "live",
  "image": "Feuerplan-Doktrin.jpg",
  "collector": ""
},
{
  "typ": "Doktrin",
  "klasse": "",
  "name": "Punktfeuer",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "doktrin"
  ],
  "text": "Doktrin: Punktfeuer.",
  "effects": [],
  "flavor": "",
  "max_copies": 1,
  "id": "dc_dok_punktfeuer",
  "set": "set_nations",
  "status": "live",
  "image": "Punktfeuer-Doktrin.jpg",
  "collector": ""
}
];