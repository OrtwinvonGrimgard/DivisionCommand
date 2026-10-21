window.DC_SET_ALPHA = window.DC_SET_ALPHA || {};
window.DC_SET_ALPHA["Ausrüstung"] = [
  {
    "id": "dc_eq_fanat",
    "set": "set_alpha",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Fanatischer Kommandant",
    "ap": 4,
    "atk": null,
    "def": null,
    "tags": [
      "ausruestung",
      "kommandant"
    ],
    "text": "An Infanterie. Reale Kosten 4 AP. Träger +2 A / +2 V.",
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
    "flavor": "Wer das Schwert ergreift, der soll vergehen durch das Schwert.",
    "image": "Fanatischer Kommandant.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eq_spat",
    "set": "set_alpha",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Klappspaten",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "ausruestung",
      "schanzen"
    ],
    "text": "Zug ohne Angriff: +1 V. Beim Angriff zurück auf Ursprung.",
    "effects": [
      {
        "code": "SCHANZEN",
        "param": {
          "only": "infanterie"
        }
      }
    ],
    "flavor": "Sie werden graben bis ich ihnen befehle das Graben einzustellen!",
    "image": "Klappspaten.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eq_med",
    "set": "set_alpha",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Medizinische Versorgung",
    "ap": 4,
    "atk": null,
    "def": null,
    "tags": [
      "ausruestung",
      "medizin"
    ],
    "text": "Träger +3 V/Zug bis defMax. Flanken +2 V/Zug bis defMax.",
    "effects": [
      {
        "code": "MEDIZIN",
        "param": {
          "self": 3,
          "flank": 2
        }
      }
    ],
    "flavor": "Es ist genug für alle da.",
    "image": "Medizinische Versorgung.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eq_rauch",
    "set": "set_alpha",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Rauchgranate",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "ausruestung",
      "nebel",
      "rauch"
    ],
    "text": "Wird der Träger angegriffen, Nebelfeld für diesen Kampf.",
    "effects": [
      {
        "code": "RAUCH"
      }
    ],
    "flavor": "Die leichteste Deckung der Welt.",
    "image": "Rauchgranate.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eq_tasche",
    "set": "set_alpha",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Sanitätstasche",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "ausruestung",
      "medizin"
    ],
    "text": "Träger +2 V/Zug bis defMax.",
    "effects": [
      {
        "code": "TASCHE",
        "param": {
          "n": 2
        }
      }
    ],
    "flavor": "Ich brauche hier sofort einen Druckverband!",
    "image": "Sanitaetstasche.jpg",
    "max_copies": 2
  }
,
  {
    "id": "dc_eq_standarte",
    "set": "set_alpha",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Standarte",
    "ap": 1,
    "atk": null,
    "def": null,
    "tags": ["ausruestung", "infanterie"],
    "text": "Träger +1 DEF. Liegt eine zweite eigene Infanterie im Abschnitt, +1 ATK.",
    "effects": [{"code": "EQUIP_STANDARD", "param": {"def": 1, "atk_if_second": 1}}],
    "flavor": "Sie steht. Ob der Abschnitt noch steht, sieht man später.",
    "image": "Standarte.jpg",
    "max_copies": 4,
    "collector": "A037"
  }
,
  {
    "id": "dc_eq_gebetsfahne",
    "set": "set_alpha",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Gebetsfahne",
    "ap": 1,
    "atk": null,
    "def": null,
    "tags": ["ausruestung", "glaube"],
    "text": "Wird der Träger zerstört, hat eine eigene Infanterie im Abschnitt +1 ATK bis Zugende.",
    "effects": [{"code": "ON_DESTROY_SECTION_ATK", "param": {"atk": 1}}],
    "flavor": "Wenn sie fällt, hört der Abschnitt auf zu fragen, warum.",
    "image": "Gebetsfahne.jpg",
    "max_copies": 4,
    "collector": "A039"
  }
,
  {
    "id": "dc_au_sturmleitern",
    "set": "set_alpha",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Sturmleitern",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": ["ausruestung"],
    "text": "Träger +1 ATK beim ersten Angriff im Zug.",
    "effects": [{"code": "CARRIER_FIRST_ATTACK_ATK", "param": {"atk": 1}}],
    "flavor": "Die Leiter kommt mit. Ob sie gebraucht wird, sieht man oben.",
    "image": "Sturmleitern.jpg",
    "max_copies": 2,
    "collector": "A044"
  }
,
  {
    "id": "dc_au_feldzeichen",
    "set": "set_alpha",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Feldzeichen",
    "ap": 1,
    "atk": null,
    "def": null,
    "tags": ["ausruestung"],
    "text": "Ausgerüsteter Träger erhält +1 DEF.",
    "effects": [{"code": "CARRIER_DEF", "param": {"def": 1}}],
    "flavor": "Ein Zeichen. Mehr nicht. Aber es steht.",
    "image": "Feldzeichen.jpg",
    "max_copies": 4,
    "collector": "A047"
  }
];
