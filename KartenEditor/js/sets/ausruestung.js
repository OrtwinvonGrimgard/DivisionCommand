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
];
