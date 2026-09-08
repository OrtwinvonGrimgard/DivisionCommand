window.DC_SET_ALPHA = window.DC_SET_ALPHA || {};
window.DC_SET_ALPHA["Unterstützung"] = [
  {
    "id": "dc_su_artillerie",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Artilleriestellung",
    "ap": 4,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung",
      "artillerie",
      "stellung"
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
    "flavor": "Es flieeegen mit Pulver die Kugeln so weit! Ja, so weit!",
    "image": "Artilleriestellung.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_satellit",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Aufklärungssatellit",
    "ap": 3,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung"
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
    "flavor": "Wir könnten sogar dein Haus von hier sehen.",
    "image": "Aufklaerungssatellit.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_ausland",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Auslandsvertretung",
    "ap": 5,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung",
      "diplomatie"
    ],
    "text": "Zugbeginn +1 AP. Diplomatischer Schutz: nur durch Schattenspiele zerstörbar.",
    "effects": [
      {
        "code": "TURN_AP",
        "param": {
          "ap": 1
        }
      },
      {
        "code": "DIPLO_IMMUNE"
      }
    ],
    "flavor": "Sie können sich nicht vorstellen was man mit einem Gespräch alles erreichen kann.",
    "image": "Auslandsvertretung.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_niemand",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Bis niemand mehr lebt",
    "ap": 5,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Zugbeginn: zerstöre eine gegnerische Front- oder Supportkarte. Bleibt, bis der Gegner keine solchen Karten mehr hat.",
    "effects": [
      {
        "code": "ATTRITION"
      }
    ],
    "flavor": "Wir werden Frieden haben!",
    "image": "Bis niemand mehr lebt.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_drohne",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Dronenkommando",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung",
      "luft"
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
    "flavor": "Artillerie war gestern.",
    "image": "Dronenkommando.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_general",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Erfahrener General",
    "ap": 4,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Eigene Front +2 V. Mehr als zwei Elite an der Front: Zugende +1 Karte. Finte (2 AP): Feind außer Gefecht diesen Zug.",
    "effects": [
      {
        "code": "AURA_FRONT_DEF_GEN",
        "param": {
          "def": 2
        }
      },
      {
        "code": "ELITE_DRAW"
      },
      {
        "code": "FEINT",
        "param": {
          "ap": 2
        }
      }
    ],
    "flavor": "Im Chaos des Krieges bringt Erfahrung den entscheidenden Vorteil.",
    "image": "Erfahrener General.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_feldlager",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Feldlager",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Zugbeginn: eine zusätzliche Karte ziehen.",
    "effects": [
      {
        "code": "TURN_DRAW",
        "param": {
          "n": 1
        }
      }
    ],
    "flavor": "Die Operation verläuft genau nach Plan!",
    "image": "Feldlager.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_festung",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Festungsanlage",
    "ap": 3,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung",
      "befestigung"
    ],
    "text": "Eigene Front +2 Verteidigung.",
    "effects": [
      {
        "code": "AURA_FRONT_DEF",
        "param": {
          "def": 2
        }
      }
    ],
    "flavor": "Das Wunder von Zement!",
    "image": "Festungsanlage.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_flak",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Flugabwehr",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung",
      "luftverteidigung",
      "stellung"
    ],
    "text": "Eigene Front erleidet 1 Luftschaden weniger.",
    "effects": [
      {
        "code": "AA_REDUCE",
        "param": {
          "n": 1
        }
      }
    ],
    "flavor": "Haltet die Augen offen!",
    "image": "Flugabwehr.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_komm",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Kommunikationszentrum",
    "ap": 4,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung"
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
    "flavor": "Halten sie Fühlung zum Feind!",
    "image": "Kommunikationszentrum.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_nebel",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Kriegsnebel",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Nebelwerfer (2 AP): Token vor eigene Front, 2 eigene Züge. Verteidiger Erstschlag. Stapelt mit Mine.",
    "effects": [
      {
        "code": "FOG_TOKEN",
        "param": {
          "ap": 2,
          "turns": 2
        }
      }
    ],
    "flavor": "Die sehen gleich nichts mehr.",
    "image": "Kriegsnebel.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_lager",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Lagerhaus",
    "ap": 3,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Ausrüstungen -1 AP (min. 1). Logistikzentrum (2 AP): erste Ausrüstung im Deck auf die Hand.",
    "effects": [
      {
        "code": "EQUIP_DISCOUNT",
        "param": {
          "n": 1
        }
      },
      {
        "code": "FETCH_EQUIP",
        "param": {
          "ap": 2
        }
      }
    ],
    "flavor": "Logistik ist die Lebenskraft einer Legion.",
    "image": "Lagerhaus.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_lazarett",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Lazarett",
    "ap": 3,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Heilung (1 AP): Infanterie auf diese Karte, heilt 1 V/Zug, zurück nur auf denselben Slot. Stirbt das Lazarett, stirbt der Patient.",
    "effects": [
      {
        "code": "HOSPITAL",
        "param": {
          "ap": 1
        }
      }
    ],
    "flavor": "Dieser darf sein Bein behalten.",
    "image": "Lazarett.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_prop",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Propaganda",
    "ap": 3,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Eigene Fronteinheiten kosten 1 AP weniger (min. 1).",
    "effects": [
      {
        "code": "UNIT_DISCOUNT",
        "param": {
          "n": 1
        }
      }
    ],
    "flavor": "Wahrheit? Ihr kennt die Wahrheit! Ihre Lügen sind unser Untergang!",
    "image": "Propaganda.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_radar",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Radarstation",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung",
      "luftverteidigung"
    ],
    "text": "Eigene Unterstützungen erleiden 2 Luftschaden weniger.",
    "effects": [
      {
        "code": "RADAR_AA",
        "param": {
          "n": 2
        }
      }
    ],
    "flavor": "Wir haben sie auf dem Schirm",
    "image": "Radarstation.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_schlaefer",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Schläferzelle",
    "ap": 3,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Nach 3 eigenen Zügen: zufällige gegnerische Einheit mit AP ≤ 3 zerstören. Danach auf den Friedhof. Neutralisierung 2 AP (Gegner).",
    "effects": [
      {
        "code": "SLEEPER",
        "param": {
          "turns": 3,
          "maxAp": 3
        }
      },
      {
        "code": "NEUTRALIZE",
        "param": {
          "ap": 2
        }
      }
    ],
    "flavor": "Auch ein schwacher Geist kann eine starke Waffe sein.",
    "image": "Schlaeferzelle.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_spion",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Spionagenetzwerk",
    "ap": 4,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Zugstart: oberste Feindkarte sehen, optional unters Deck. Taktik (1 AP): nächste Nicht-Sofort-Karte -1 AP.",
    "effects": [
      {
        "code": "PEEK_ENEMY_TOP"
      },
      {
        "code": "TACTIC_DISCOUNT",
        "param": {
          "ap": 1
        }
      }
    ],
    "flavor": "Wissen ist Macht.",
    "image": "Spionagenetzwerk.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_staat",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Staatspropaganda",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Zugstart: +1 Karte je gegnerischer Einheit, die seit dem letzten eigenen Zugstart zerstört wurde.",
    "effects": [
      {
        "code": "KILL_DRAW"
      }
    ],
    "flavor": "Der Erfolg gibt uns Recht.",
    "image": "Staatspropaganda.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_brumm",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Störwagen Brummbär",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung",
      "fahrzeug"
    ],
    "text": "Feindliche Front -1 A. Funkfeuer (1 AP): fliegende Drohne zerstören. Fehlfunktion (3 AP): Drohne greift Flanke an.",
    "effects": [
      {
        "code": "AURA_ENEMY_ATK",
        "param": {
          "atk": -1
        }
      },
      {
        "code": "JAM_DRONE",
        "param": {
          "ap": 1
        }
      },
      {
        "code": "HIJACK_DRONE",
        "param": {
          "ap": 3
        }
      }
    ],
    "flavor": "Sie hätten bei Kabeln bleiben sollen.",
    "image": "Stoerwagen Brummbaer.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_auge",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Totale Überwachung",
    "ap": 3,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Gegnerische Einheiten können nicht verdeckt liegen. Fallen bleiben erlaubt.",
    "effects": [
      {
        "code": "NO_FACE_DOWN"
      }
    ],
    "flavor": "Es kann nicht sein, was nicht sein darf.",
    "image": "Totale Ueberwachung.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_pakt",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Uralter Pakt",
    "ap": 3,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Eigene Fronteinheit +2 A/+2 V. Besiegt sie eine Einheit: 2 Karten ziehen.",
    "effects": [
      {
        "code": "PACT_BOND"
      }
    ],
    "flavor": "Wenn man seit Jahrhunderten wartet, kommt es nicht auf ein paar Stunden an.",
    "image": "Uralter Pakt.jpg",
    "max_copies": 2
  },
  {
    "id": "dc_su_nest",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Verwundetennest",
    "ap": 1,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Eigene Front -1 Schaden. Lazarett (2 AP): Einheit auf diese Karte, nächsten Zug volle V auf alten Slot.",
    "effects": [
      {
        "code": "REDUCE_DAMAGE",
        "param": {
          "n": 1
        }
      },
      {
        "code": "NEST_BED",
        "param": {
          "ap": 2
        }
      }
    ],
    "flavor": "Sie kämpfen mit dem Leben. Wir gegen den Tod.",
    "image": "Verwundetennest.jpg",
    "max_copies": 2
  }
];
