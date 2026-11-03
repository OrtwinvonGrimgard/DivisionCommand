window.DC_SET_TYPES = window.DC_SET_TYPES || {};
window.DC_SET_TYPES["Elite"] = [
  {
    "id": "dc_eh_faustkeil",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Panzerzug Faustkeil",
    "ap": 5,
    "atk": 8,
    "def": 6,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "fahrzeug",
      "gepanzert",
      "kette",
      "panzer",
      "schwer",
      "elite"
    ],
    "text": "Führungsfahrzeug: +2 V wenn eine Flanke gepanzert ist.",
    "effects": [
      {
        "code": "FUEHRUNG_V",
        "param": {
          "def": 2
        }
      }
    ],
    "flavor": "Wir sind die Front!",
    "image": "elite/A062.jpg",
    "max_copies": 2,
    "collector": "A062"
  },
  {
    "id": "dc_eh_helden",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Helden der zweiten Kompanie",
    "ap": 4,
    "atk": 4,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "mittel"
    ],
    "text": "Wenn eine eigene Fronteinheit stirbt: kostenlos offen in denselben Slot.",
    "effects": [
      {
        "code": "BREACH_JUMP"
      }
    ],
    "flavor": "Was die anderen nicht wagen, haben wir schon getan.",
    "image": "elite/A052.jpg",
    "max_copies": 2,
    "collector": "A052"
  },
  {
    "id": "dc_eh_koloss",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Schwerer Panzer Koloss",
    "ap": 5,
    "atk": 7,
    "def": 9,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "fahrzeug",
      "gepanzert",
      "kette",
      "panzer",
      "schwer",
      "elite"
    ],
    "text": "Jeder erlittene Schaden -2.",
    "effects": [
      {
        "code": "SCHADEN_MINUS",
        "param": {
          "n": 2
        }
      }
    ],
    "flavor": "Ein Koloss fällt nicht. Er entscheidet sich zu knien.",
    "image": "elite/A065.jpg",
    "max_copies": 2,
    "collector": "A065"
  },
  {
    "id": "dc_eh_kommando",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Kommandogruppe",
    "ap": 5,
    "atk": 5,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "elite",
      "leicht"
    ],
    "text": "Nachbarn +2 V. Beide Flanken Infanterie: kämpft nach dem Angreifer in deren Gefecht mit.",
    "effects": [
      {
        "code": "FLANK_DEF",
        "param": {
          "def": 2
        }
      },
      {
        "code": "OP_MITKAEMPFEN"
      }
    ],
    "flavor": "Nur wenige erreichen den Geist der nötig ist.",
    "image": "elite/A055.jpg",
    "max_copies": 2,
    "collector": "A055"
  },
  {
    "id": "dc_eh_sniper",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Scharfschütze",
    "ap": 3,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "elite",
      "leicht",
      "stellung",
      "scharfschuetze"
    ],
    "text": "+2 A gegen Infanterie. Nach Angriff verdeckt bis zum nächsten eigenen Zug.",
    "effects": [
      {
        "code": "VS_INF",
        "param": {
          "atk": 2
        }
      },
      {
        "code": "RELOCATE_HIDE"
      }
    ],
    "flavor": "Feuer! Feuer. Treffer! Treffer.",
    "image": "elite/A064.jpg",
    "max_copies": 2,
    "collector": "A064"
  }
];
