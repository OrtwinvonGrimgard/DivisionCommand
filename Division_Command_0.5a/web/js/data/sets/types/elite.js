window.DC_SET_TYPES = window.DC_SET_TYPES || {};
window.DC_SET_TYPES["Elite"] = [
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
    "id": "dc_b_silberschwur_624",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Silberschwur",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "elite",
      "infanterie"
    ],
    "text": "+2 ATK, solange du in diesem Zug eine Einheit ersetzt oder geheilt hast.",
    "effects": [],
    "flavor": "Silbersterne. Kein Thron. Trotzdem Befehl.",
    "image": "elite/B624.jpg",
    "max_copies": 1,
    "collector": "B624",
    "rarity": "silver"
  },
  {
    "id": "dc_b_kronmarschall_625",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Kronmarschall",
    "ap": 5,
    "atk": 5,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "elite",
      "infanterie"
    ],
    "text": "Beim Ausspielen: eigene Einheiten in einem Abschnitt haben +1 ATK bis Zugende.",
    "effects": [],
    "flavor": "Wo er steht, gilt das Dekret.",
    "image": "elite/B625.jpg",
    "max_copies": 1,
    "collector": "B625",
    "rarity": "gold"
  },
  {
    "id": "dc_b_veteranenrat_626",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Veteranenrat",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "elite",
      "infanterie"
    ],
    "text": "+2 DEF. Einmal pro Zug: heile 1 DEF an einer eigenen Einheit im selben Abschnitt.",
    "effects": [],
    "flavor": "Narben statt Amt — und trotzdem Gehör.",
    "image": "elite/B626.jpg",
    "max_copies": 1,
    "collector": "B626",
    "rarity": "silver"
  },
  {
    "id": "dc_b_optimat_384",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Optimat",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "elite",
      "infanterie"
    ],
    "text": "+2 ATK, solange beschädigt. Beim Ausspielen: erleidet 1 Schaden.",
    "effects": [],
    "flavor": "Der Staat hat ihn fertig gebaut.",
    "image": "elite/B384.jpg",
    "max_copies": 1,
    "collector": "B384",
    "rarity": "silver"
  },
  {
    "id": "dc_b_chirurgenrat_385",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Chirurgenrat",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "elite",
      "infanterie"
    ],
    "text": "+1 DEF. Einmal pro Zug: heile 1 DEF an einer eigenen Einheit; diese hat -1 ATK bis Zugende.",
    "effects": [],
    "flavor": "Heilung als Leistungsdrossel.",
    "image": "elite/B385.jpg",
    "max_copies": 1,
    "collector": "B385",
    "rarity": "silver"
  },
  {
    "id": "dc_b_masskommandant_386",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Maßkommandant",
    "ap": 5,
    "atk": 5,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "elite",
      "infanterie"
    ],
    "text": "Beim Ausspielen: wähle einen Abschnitt; eigene Einheiten dort +1 ATK bis Zugende und erleiden je 1 Schaden.",
    "effects": [],
    "flavor": "Befehl in Ampere.",
    "image": "elite/B386.jpg",
    "max_copies": 1,
    "collector": "B386",
    "rarity": "gold"
  },
  {
    "id": "dc_b_glaubenszeuge_108",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Glaubenszeuge",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Opfere diese Einheit: eine gegnerische Einheit im Abschnitt erleidet 3 Schaden.",
    "effects": [],
    "flavor": "Anerkannt. Nicht allein selig.",
    "image": "elite/B108.jpg",
    "max_copies": 1,
    "collector": "B108",
    "rarity": "silver"
  },
  {
    "id": "dc_b_eifererzug_109",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Eifererzug",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "+2 ATK. Am Zugende erleidet diese Einheit 1 Schaden.",
    "effects": [],
    "flavor": "Voss prüft, ob sie lau geworden sind.",
    "image": "elite/B109.jpg",
    "max_copies": 1,
    "collector": "B109",
    "rarity": "silver"
  },
  {
    "id": "dc_b_masskommandant_110",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Maßkommandant",
    "ap": 5,
    "atk": 4,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Beim Ausspielen: eigene Infanterie im Abschnitt +1 ATK bis Zugende.",
    "effects": [],
    "flavor": "Der Plan darf Nein sagen.",
    "image": "elite/B110.jpg",
    "max_copies": 1,
    "collector": "B110",
    "rarity": "bronze"
  }
];
