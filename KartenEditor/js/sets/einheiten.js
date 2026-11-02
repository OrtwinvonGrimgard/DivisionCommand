window.DC_SET_ALPHA = window.DC_SET_ALPHA || {};
window.DC_SET_ALPHA["Einheit"] = [
  {
    "id": "dc_eh_aufklaerer",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärer",
    "name": "Aufklärer",
    "ap": 3,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "fahrzeug",
      "aufklaerung",
      "leicht",
      "gepanzert"
    ],
    "text": "Deckt verdecktes Feindfahrzeug auf: 3 Schaden. Aufklärung (1 AP): 2 verdeckte Feindfront aufdecken.",
    "effects": [
      {
        "code": "REVEAL_STRIKE",
        "param": {
          "dmg": 3,
          "ap": 1,
          "n": 2
        }
      }
    ],
    "flavor": "Feind im Vorfeld aufgeklärt. Wir führen Bekämpfung durch!",
    "image": "Aufklaerer.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eh_dschungel",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Dschungelkrieger",
    "ap": 3,
    "atk": 2,
    "def": 5,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "guerrilla",
      "leicht"
    ],
    "text": "Nach dem Angriff verdeckt. Erst nach Aufklärung wieder angreifbar.",
    "effects": [
      {
        "code": "GUERRILLA_HIDE"
      }
    ],
    "flavor": "Habt ihr das auch gehört?",
    "image": "Dschungelkrieger.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eh_frei",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Freischärler",
    "ap": 1,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "leicht"
    ],
    "text": "Überfall: +1 Schaden wenn diese Einheit den Erstschlag führt.",
    "effects": [
      {
        "code": "AMBUSH"
      }
    ],
    "flavor": "Dies ist UNSER Land!",
    "image": "Freischaerler.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eh_haubitze",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Haubitzenzug",
    "ap": 4,
    "atk": 6,
    "def": 4,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "artillerie",
      "gepanzert",
      "kette",
      "mittel",
      "fahrzeug",
      "stellung"
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
    "flavor": "Verheerende Wirkung aus sicherer Entfernung.",
    "image": "Haubitzenzug.jpg",
    "max_copies": 2
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
    "image": "Helden der zweiten Kompanie.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eh_himmel",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Infanteriebataillon Himmelhund",
    "ap": 3,
    "atk": 4,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "mittel",
      "grossverband"
    ],
    "text": "Nur zwei Einheiten im Schulterschluss. Zuerst gewählte kämpft, dann die zweite. 1 AP, beide erschöpft. Artillerie und Soforteinsätze frei.",
    "effects": [
      {
        "code": "NEED_SHOULDER"
      }
    ],
    "flavor": "1000 Mann und ein Befehl.",
    "image": "Infanteriebataillon Himmelhund.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eh_jaeger",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Jägerstellung",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "leicht",
      "stellung"
    ],
    "text": "Richtmine: bei Angriff zuerst 3 Schaden am Angreifer nach NML-Minen, dann Kampf.",
    "effects": [
      {
        "code": "RICHTMINE",
        "param": {
          "dmg": 3
        }
      }
    ],
    "flavor": "Es rauschen die Bäume, es klingt ihr Gesang!",
    "image": "Jaegerstellung.jpg",
    "max_copies": 2
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
    "image": "Kommandogruppe.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eh_mg",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "MG-Stellung",
    "ap": 3,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "schwer",
      "stellung",
      "mg"
    ],
    "text": "Niederhalten: getroffene feindliche Infanterie darf im nächsten Zug ihres Besitzers nicht angreifen.",
    "effects": [
      {
        "code": "NIEDERHALTEN"
      }
    ],
    "flavor": "Brrrt. Brrrt. Brrrrrrrrrrrt!",
    "image": "MG-Stellung.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eh_donner",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Mittlerer Panzer Donnerkeil",
    "ap": 3,
    "atk": 4,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "fahrzeug",
      "gepanzert",
      "kette",
      "mittel",
      "panzer"
    ],
    "text": "Feuerüberlegenheit: +1 Schaden gegen ungepanzerte Einheiten.",
    "effects": [
      {
        "code": "FEUERUEBERLEGENHEIT"
      }
    ],
    "flavor": "Ein leichtes Ziel!",
    "image": "Mittlerer Panzer Donnerkeil.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eh_eingreif",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Mobile Eingreiftruppe",
    "ap": 3,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "drehfluegler",
      "leicht",
      "luftlande"
    ],
    "text": "Verschieben (2 AP): leerer Frontslot, kein Feind gegenüber. Währenddessen Lufteinheit.",
    "effects": [
      {
        "code": "VERSCHIEBEN",
        "param": {
          "ap": 2
        }
      }
    ],
    "flavor": "Mobilität ist der Schlüssel zu operativer Freiheit.",
    "image": "Mobile Eingreiftruppe.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eh_moerser",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Mörser-Team",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "artillerie",
      "stellung",
      "leicht",
      "moerser"
    ],
    "text": "Indirektes Feuer: gesamte feindliche Front.",
    "effects": [
      {
        "code": "ATTACK_ANY_FRONT"
      }
    ],
    "flavor": "Ein Schuss ein Treffer! Aber wir nehmen sicherheitshalber drei…",
    "image": "Moerser-Team.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eh_pak",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Panzerabwehrtrupp",
    "ap": 2,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "leicht",
      "panzerabwehr",
      "stellung"
    ],
    "text": "Panzerfaust: +5 A und +5 V gegen Gepanzerte.",
    "effects": [
      {
        "code": "PANZERFAUST",
        "param": {
          "atk": 5,
          "def": 5
        }
      }
    ],
    "flavor": "Wir schneiden uns durch!",
    "image": "Panzerabwehrtrupp.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eh_hammer",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Panzertrupp Hammer",
    "ap": 4,
    "atk": 7,
    "def": 6,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "fahrzeug",
      "gepanzert",
      "kette",
      "panzer",
      "schwer"
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
    "flavor": "Masse mal Beschleunigung gleich Kraft.",
    "image": "Panzertrupp Hammer.jpg",
    "max_copies": 2
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
    "image": "Panzerzug Faustkeil.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eh_viper",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Raketenwerfer Viper",
    "ap": 3,
    "atk": 5,
    "def": 3,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "fahrzeug",
      "kette",
      "artillerie",
      "stellung",
      "mittel",
      "raketenwerfer"
    ],
    "text": "Indirektes Feuer auf die ganze Front. Hohe Reichweite: auch Support.",
    "effects": [
      {
        "code": "ATTACK_ANY_FRONT"
      },
      {
        "code": "ATTACK_SUPPORT"
      }
    ],
    "flavor": "Das Gebäude ist zwar weg, aber wir haben den Stuhl getroffen!",
    "image": "Raketenwerfer Viper.jpg",
    "max_copies": 2
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
    "image": "Scharfschuetze.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eh_spz",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Fahrzeug",
    "name": "Schützenpanzer",
    "ap": 2,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "gepanzert",
      "kette",
      "fahrzeug",
      "mittel",
      "schuetzenpanzer",
      "mech-infanterie"
    ],
    "text": "Benachbarte Infanterie +1 A / +1 V.",
    "effects": [
      {
        "code": "MECH_AURA",
        "param": {
          "atk": 1,
          "def": 1
        }
      }
    ],
    "flavor": "Geben wir ihnen Deckung!",
    "image": "Schuetzenpanzer.jpg",
    "max_copies": 2
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
    "image": "Schwerer Panzer Koloss.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eh_sich",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Sicherungstrupp",
    "ap": 1,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "leicht"
    ],
    "text": "",
    "effects": [],
    "flavor": "Sind sie nicht alle freiwillig hier?!",
    "image": "Sicherungstrupp.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eh_spaeher",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Spähertrupp",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
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
    "flavor": "Auge am Feind!",
    "image": "Spaehertrupp.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eh_glubscher",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Fahrzeug",
    "name": "Spähpanzer Glubscher",
    "ap": 4,
    "atk": 4,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "fahrzeug",
      "aufklaerung",
      "gepanzert",
      "kette",
      "leicht"
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
    "flavor": "Da ist böses im Busch!",
    "image": "Spaehpanzer Glubscher.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_eh_spahwagen",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Fahrzeug",
    "name": "Spähwagen",
    "ap": 2,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "aufklaerung",
      "fahrzeug",
      "rad",
      "gepanzert",
      "leicht",
      "mech-infanterie"
    ],
    "text": "Aufklärung (1 AP): 2 verdeckte Feindfront aufdecken.",
    "effects": [
      {
        "code": "AUFKLAERUNG",
        "param": {
          "n": 2
        }
      }
    ],
    "flavor": "Fühlung zum Feind!",
    "image": "Spaehwagen.jpg",
    "max_copies": 2
  }
];
