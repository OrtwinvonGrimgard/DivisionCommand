/**
 * Elite-Einheiten (Katalog). Nur Daten, keine Spiellogik.
 *
 * Keine Kommentare pro Karte (zu umfangreich). Änderungen an Werten oder
 * Effekten sind Regeländerungen und gehören nicht in diese Aufräumung.
 */
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
    "text": "Nachbarn +2 DEF. Beide Flanken Infanterie: kämpft nach dem Angreifer in deren Gefecht mit.",
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
    "ap": 6,
    "atk": 7,
    "def": 5,
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
    "text": "Führungsfahrzeug: +2 DEF wenn eine Flanke gepanzert ist.",
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
    "collector": "A062",
    "keywords": [
      "Nachsetzen",
      "Sicherung"
    ]
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
    "text": "+2 ATK gegen Infanterie.",
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
    "collector": "A064",
    "keywords": [
      "Hinterhalt",
      "Staffelangriff",
      "Absetzen"
    ],
    "rules": [
      "Absetzen (Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.)"
    ]
  },
  {
    "id": "dc_eh_koloss",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Schwerer Panzer Koloss",
    "ap": 6,
    "atk": 6,
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
    "collector": "A065",
    "keywords": [
      "Abschirmung"
    ]
  },
  {
    "id": "dc_b_konzernsekundant_150",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Konzernsekundant",
    "ap": 3,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Er spricht für das Buch, nicht für das Ministerium.",
    "image": "elite/B150.jpg",
    "max_copies": 1,
    "collector": "B150",
    "rarity": "silver",
    "keywords": [
      "Heranführung"
    ]
  },
  {
    "id": "dc_b_werkmeister_front_151",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Werkmeister Front",
    "ap": 4,
    "atk": 4,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: heile 2 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 2
        }
      }
    ],
    "flavor": "Reparatur ist der Auftrag in Uniform.",
    "image": "elite/B151.jpg",
    "max_copies": 1,
    "collector": "B151",
    "rarity": "bronze",
    "keywords": [
      "Zähigkeit",
      "Sicherung"
    ]
  },
  {
    "id": "dc_b_kriegsaktie_152",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Kriegsaktie",
    "ap": 4,
    "atk": 4,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "support"
        }
      }
    ],
    "flavor": "Die Aktie steigt mit dem Verbrauch.",
    "image": "elite/B152.jpg",
    "max_copies": 1,
    "collector": "B152",
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
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Anerkannt. Nicht allein selig.",
    "image": "elite/B108.jpg",
    "max_copies": 1,
    "collector": "B108",
    "rarity": "silver",
    "keywords": [
      "Erbitterung",
      "Durchschlag"
    ]
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
    "atk": 5,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "",
    "effects": [],
    "flavor": "Voss prüft, ob sie lau geworden sind.",
    "image": "elite/B109.jpg",
    "max_copies": 1,
    "collector": "B109",
    "rarity": "silver",
    "keywords": [
      "Überlast"
    ]
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
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Der Plan darf Nein sagen.",
    "image": "elite/B110.jpg",
    "max_copies": 1,
    "collector": "B110",
    "rarity": "bronze"
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
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Erbe selbst. Ablösung ist Gesetz.",
    "image": "elite/B624.jpg",
    "max_copies": 1,
    "collector": "B624",
    "rarity": "silver",
    "keywords": [
      "Erbitterung"
    ]
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
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Kronanwalt. Die Krone hat recht — jemand zahlt.",
    "image": "elite/B625.jpg",
    "max_copies": 1,
    "collector": "B625",
    "rarity": "gold",
    "keywords": [
      "Durchschlag",
      "Staffelangriff"
    ]
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
    "text": "Andere eigene Einheiten in ihrem Abschnitt: +1 ATK und +1 DEF. Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "aura",
          "scope": "section",
          "atk": 1,
          "def": 1
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Unfehlbarer Stab. Recht behalten engt ein.",
    "image": "elite/B626.jpg",
    "max_copies": 1,
    "collector": "B626",
    "rarity": "silver",
    "keywords": [
      "Nachsetzen"
    ]
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
    "text": "",
    "effects": [],
    "flavor": "Chirurg am Front. Schneidet am Eigenen.",
    "image": "elite/B384.jpg",
    "max_copies": 1,
    "collector": "B384",
    "rarity": "silver",
    "keywords": [
      "Zuteilung"
    ]
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
    "text": "Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Kalibrator. Das System fordert Anteilsopfer.",
    "image": "elite/B385.jpg",
    "max_copies": 1,
    "collector": "B385",
    "rarity": "silver",
    "keywords": [
      "Nachsetzen",
      "Erbitterung"
    ]
  },
  {
    "id": "dc_b_masskommandant_386",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Maßoffizier",
    "ap": 5,
    "atk": 5,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "elite",
      "infanterie"
    ],
    "text": "Andere eigene Einheiten in ihrem Abschnitt: +1 ATK, solange diese Einheit beschädigt ist.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "aura",
          "scope": "section",
          "atk": 1,
          "when": "damaged",
          "self": true
        }
      }
    ],
    "flavor": "Körperwart. Umverteilen ist Optimieren.",
    "image": "elite/B386.jpg",
    "max_copies": 1,
    "collector": "B386",
    "rarity": "gold"
  },
  {
    "id": "dc_b_lina_nov_807",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Lina Nov",
    "ap": 3,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "+1 ATK gegen beobachtete Ziele.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "observed"
        }
      }
    ],
    "flavor": "Lina Nov. Raster vor dem Schlag.",
    "image": "elite/B807.jpg",
    "max_copies": 1,
    "collector": "B807",
    "rarity": "silver"
  },
  {
    "id": "dc_b_ed_ruh_808",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Ed Ruh",
    "ap": 3,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: markiere 1 Feind als beobachtet.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "observe",
          "n": 1
        }
      }
    ],
    "flavor": "Ed Ruh. Stille vor dem Knoten.",
    "image": "elite/B808.jpg",
    "max_copies": 1,
    "collector": "B808",
    "rarity": "silver",
    "keywords": [
      "Abschirmung"
    ]
  },
  {
    "id": "dc_b_werkhof_nov_809",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Werkhof-Nov",
    "ap": 4,
    "atk": 4,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "+1 ATK gegen beobachtete Ziele.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "observed"
        }
      }
    ],
    "flavor": "Werkhof-Nov. Werkzeug vor Flagge.",
    "image": "elite/B809.jpg",
    "max_copies": 1,
    "collector": "B809",
    "rarity": "silver",
    "keywords": [
      "Abschirmung"
    ]
  },
  {
    "id": "dc_b_ivo_vel_867",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Ivo Vel",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "reveal",
          "n": 1
        }
      }
    ],
    "flavor": "Ivo Vel. Doppelte Akte, ein Stoß.",
    "image": "elite/B867.jpg",
    "max_copies": 1,
    "collector": "B867",
    "rarity": "silver",
    "keywords": [
      "Erbitterung",
      "Überlast"
    ]
  },
  {
    "id": "dc_b_nila_still_868",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Nila Still",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Nila Still. Stillhalten ist Lage.",
    "image": "elite/B868.jpg",
    "max_copies": 1,
    "collector": "B868",
    "rarity": "silver",
    "keywords": [
      "Zuteilung",
      "Sicherung"
    ]
  },
  {
    "id": "dc_b_siegelmeister_869",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Siegelmeister",
    "ap": 4,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 1
        }
      }
    ],
    "flavor": "Siegelmeister. Siegel vor dem Schwerpunkt.",
    "image": "elite/B869.jpg",
    "max_copies": 1,
    "collector": "B869",
    "rarity": "bronze",
    "keywords": [
      "Abschirmung",
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_schreiberin_kal_927",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Schreiberin Kal",
    "ap": 3,
    "atk": 4,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Zerstört sie im Angriff eine Einheit: ziehe 1 Karte.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "draw",
          "n": 1
        }
      }
    ],
    "flavor": "Schreiberin Kal. Setzt Zeilen. Vergibt nicht.",
    "image": "elite/B927.jpg",
    "max_copies": 1,
    "collector": "B927",
    "rarity": "silver",
    "keywords": [
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_b_hauptmann_kader_928",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Hauptmann Kader",
    "ap": 3,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Ihr erster Angriff nach dem Ausspielen hat +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "first",
          "atk": 1
        }
      }
    ],
    "flavor": "Hauptmann Kader. Führt Waffen. Schreibt keine Liste.",
    "image": "elite/B928.jpg",
    "max_copies": 1,
    "collector": "B928",
    "rarity": "silver",
    "keywords": [
      "Zuteilung",
      "Sicherung"
    ]
  },
  {
    "id": "dc_b_haus_still_929",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Haus Still",
    "ap": 4,
    "atk": 4,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 1
        }
      }
    ],
    "flavor": "Haus Still. Richtig. Zu spät. Steht noch.",
    "image": "elite/B929.jpg",
    "max_copies": 1,
    "collector": "B929",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_marei_aure_747",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Marei Aure",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 1
        }
      }
    ],
    "flavor": "Marei führt den Staat. Nicht den Feldzug als Ruhm.",
    "image": "elite/B747.jpg",
    "max_copies": 1,
    "collector": "B747",
    "rarity": "silver",
    "keywords": [
      "Sicherung",
      "Zähigkeit"
    ]
  },
  {
    "id": "dc_b_tomas_lenn_748",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Tomas Lenn",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Lenn bremst und trägt mit.",
    "image": "elite/B748.jpg",
    "max_copies": 1,
    "collector": "B748",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung",
      "Heranführung"
    ]
  },
  {
    "id": "dc_b_zeughausmeister_749",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Zeughausmeister",
    "ap": 4,
    "atk": 5,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 1
        }
      }
    ],
    "flavor": "Meister ölt Lafetten über Jahre.",
    "image": "elite/B749.jpg",
    "max_copies": 1,
    "collector": "B749",
    "rarity": "silver"
  },
  {
    "id": "dc_b_kai_leutnant_189",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Kai-Leutnant",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "",
    "effects": [],
    "flavor": "Er hält. Er lizenziert nicht.",
    "image": "elite/B189.jpg",
    "max_copies": 1,
    "collector": "B189",
    "rarity": "silver",
    "keywords": [
      "Sicherung",
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_lucs_sitz_190",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Lucs Sitz",
    "ap": 3,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 1
        }
      }
    ],
    "flavor": "Im Parlament. Ohne Amt über die Kompanie.",
    "image": "elite/B190.jpg",
    "max_copies": 1,
    "collector": "B190",
    "rarity": "bronze",
    "keywords": [
      "Durchschlag",
      "Abschirmung"
    ]
  },
  {
    "id": "dc_b_offener_weg_191",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Offener Weg",
    "ap": 4,
    "atk": 4,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "",
    "effects": [],
    "flavor": "Kommt der Weg, ist der Ort gewöhnlich — später und teurer.",
    "image": "elite/B191.jpg",
    "max_copies": 1,
    "collector": "B191",
    "rarity": "gold",
    "keywords": [
      "Sicherung",
      "Heranführung"
    ]
  },
  {
    "id": "dc_b_lotte_knoten_687",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Lotte Knoten",
    "ap": 3,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "",
    "effects": [],
    "flavor": "Lotte sieht Stillstand früher als Fahnen.",
    "image": "elite/B687.jpg",
    "max_copies": 1,
    "collector": "B687",
    "rarity": "silver",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_hesse_sar_688",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Hesse Sar",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Kostet 1 AP weniger (mind. 1), solange du eine offene Unterstützung hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "support"
        }
      }
    ],
    "flavor": "Hesse krönt keine Stadt. Auch nicht Sarun.",
    "image": "elite/B688.jpg",
    "max_copies": 1,
    "collector": "B688",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung",
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_karawanenmeister_689",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Karawanenmeister",
    "ap": 4,
    "atk": 4,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "",
    "effects": [],
    "flavor": "Meister hält den Fluss. Nicht den Thron.",
    "image": "elite/B689.jpg",
    "max_copies": 1,
    "collector": "B689",
    "rarity": "silver",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_ida_holm_567",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Ida Holm",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Holm sagt nein, bis die anderen Hände da sind.",
    "image": "elite/B567.jpg",
    "max_copies": 1,
    "collector": "B567",
    "rarity": "silver",
    "keywords": [
      "Sicherung",
      "Erbitterung"
    ]
  },
  {
    "id": "dc_b_konrad_berst_568",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Konrad Berst",
    "ap": 3,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "reveal",
          "n": 1
        }
      }
    ],
    "flavor": "Berst schreibt früher. Er stimmt nicht ab.",
    "image": "elite/B568.jpg",
    "max_copies": 1,
    "collector": "B568",
    "rarity": "bronze",
    "keywords": [
      "Sicherung",
      "Erbitterung"
    ]
  },
  {
    "id": "dc_b_stabsoffizier_569",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Stabsoffizier",
    "ap": 4,
    "atk": 4,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "+1 ATK gegen beobachtete Ziele.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "observed"
        }
      }
    ],
    "flavor": "Stab sieht. Schlüssel liegen woanders.",
    "image": "elite/B569.jpg",
    "max_copies": 1,
    "collector": "B569",
    "rarity": "gold",
    "keywords": [
      "Sicherung",
      "Zähigkeit"
    ]
  },
  {
    "id": "dc_b_ada_mar_507",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Ada Mar",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 1
        }
      }
    ],
    "flavor": "Antwort nach außen. Nicht den Preis.",
    "image": "elite/B507.jpg",
    "max_copies": 1,
    "collector": "B507",
    "rarity": "silver",
    "keywords": [
      "Heranführung",
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_b_ren_zoll_508",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Ren Zoll",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Zweigt ab. Lässt den Fremden nicht an die Mole.",
    "image": "elite/B508.jpg",
    "max_copies": 1,
    "collector": "B508",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung",
      "Sicherung"
    ]
  },
  {
    "id": "dc_b_hafenmeister_509",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Hafenmeister",
    "ap": 4,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "",
    "effects": [],
    "flavor": "Meister des Kais — nicht der Flotte.",
    "image": "elite/B509.jpg",
    "max_copies": 1,
    "collector": "B509",
    "rarity": "gold",
    "keywords": [
      "Heranführung",
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_jona_leserbach_228",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Jona Leserbach",
    "ap": 3,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Er schickt Leser. Er entscheidet nicht für die Täler.",
    "image": "elite/B228.jpg",
    "max_copies": 1,
    "collector": "B228",
    "rarity": "silver"
  },
  {
    "id": "dc_b_mar_aschen_229",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Mar Aschen",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: heile 2 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 2
        }
      }
    ],
    "flavor": "Die Abschrift zurück. Kein besserer Ort.",
    "image": "elite/B229.jpg",
    "max_copies": 1,
    "collector": "B229",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_talruf_230",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Talruf",
    "ap": 4,
    "atk": 4,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "",
    "effects": [],
    "flavor": "Der Ruf geht an die, die der Eid noch zeigt.",
    "image": "elite/B230.jpg",
    "max_copies": 1,
    "collector": "B230",
    "rarity": "gold",
    "keywords": [
      "Durchschlag",
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_alm_ser_327",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Alm Ser",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 1
        }
      }
    ],
    "flavor": "Bett und Liste auf demselben Tisch.",
    "image": "elite/B327.jpg",
    "max_copies": 1,
    "collector": "B327",
    "rarity": "silver",
    "keywords": [
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_pia_lueck_328",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Pia Lück",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: heile 2 DEF an deiner am stärksten beschädigten Einheit. +1 DEF, wenn sie seit deinem letzten Zug nicht versetzt wurde.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 2
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 0,
          "def": 1,
          "when": "still"
        }
      }
    ],
    "flavor": "Sie holt jedes Papier früher.",
    "image": "elite/B328.jpg",
    "max_copies": 1,
    "collector": "B328",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_genesener_schlag_329",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Genesener Schlag",
    "ap": 4,
    "atk": 4,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: heile 1 DEF an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "heal",
          "n": 1
        }
      }
    ],
    "flavor": "Ruhe wird Kraft. Nicht Theater.",
    "image": "elite/B329.jpg",
    "max_copies": 1,
    "collector": "B329",
    "rarity": "gold"
  },
  {
    "id": "dc_b_ina_oss_267",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Ina Oss",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "",
    "effects": [],
    "flavor": "Sie zählt, wie wenige Namen hinzukommen.",
    "image": "elite/B267.jpg",
    "max_copies": 1,
    "collector": "B267",
    "rarity": "silver",
    "keywords": [
      "Abschirmung",
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_retter_grenz_268",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Retter Grenz",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "",
    "effects": [],
    "flavor": "Der letzte Tote war ein Fehler. Kein Heiligtum.",
    "image": "elite/B268.jpg",
    "max_copies": 1,
    "collector": "B268",
    "rarity": "bronze",
    "keywords": [
      "Zähigkeit",
      "Durchschlag"
    ]
  },
  {
    "id": "dc_b_ahnenschmied_269",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Ahnenschmied",
    "ap": 4,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Der erste Schaden je Zug sinkt um 1.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1
        }
      }
    ],
    "flavor": "Erinnerung wird Rüstung. Nicht Befehl.",
    "image": "elite/B269.jpg",
    "max_copies": 1,
    "collector": "B269",
    "rarity": "gold"
  },
  {
    "id": "dc_b_nera_aster_447",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Nera Aster",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: markiere 1 Feind als beobachtet.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "observe",
          "n": 1
        }
      }
    ],
    "flavor": "Mappe zurücklegen, wenn die Probe lügt.",
    "image": "elite/B447.jpg",
    "max_copies": 1,
    "collector": "B447",
    "rarity": "silver"
  },
  {
    "id": "dc_b_colin_abweich_448",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Colin Abweich",
    "ap": 3,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: markiere 1 Feind als beobachtet.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "observe",
          "n": 1
        }
      }
    ],
    "flavor": "Unterschrift neben der Zahl aushängen.",
    "image": "elite/B448.jpg",
    "max_copies": 1,
    "collector": "B448",
    "rarity": "bronze",
    "keywords": [
      "Sicherung",
      "Zähigkeit"
    ]
  },
  {
    "id": "dc_b_fachoffizier_449",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Fachoffizier",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "+1 ATK gegen beobachtete Ziele.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "observed"
        }
      }
    ],
    "flavor": "Unbequeme Meldung bleibt.",
    "image": "elite/B449.jpg",
    "max_copies": 1,
    "collector": "B449",
    "rarity": "bronze",
    "keywords": [
      "Nachsetzen",
      "Heranführung"
    ]
  }
];
