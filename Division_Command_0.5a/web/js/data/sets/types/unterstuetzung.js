window.DC_SET_TYPES = window.DC_SET_TYPES || {};
window.DC_SET_TYPES["Unterstützung"] = [
  {
    "id": "dc_su_sammelpunkt",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Sammelpunkt",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung",
      "logistik"
    ],
    "text": "Infanterie in diesem Abschnitt kostet 1 weniger, mindestens 1.",
    "effects": [
      {
        "code": "SECTION_INFANTRY_COST",
        "param": {
          "delta": -1,
          "min": 1
        }
      }
    ],
    "flavor": "Hier wird gezählt, wer noch da ist. Und wer fehlt.",
    "image": "unterstuetzung/A034.jpg",
    "max_copies": 4,
    "collector": "A034"
  },
  {
    "id": "dc_su_feldprediger",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Feldprediger",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung",
      "glaube"
    ],
    "text": "Einmal pro Zug: eine eigene Infanterie in diesem Abschnitt hat +1 ATK.",
    "effects": [
      {
        "code": "ONCE_SECTION_INFANTRY_ATK",
        "param": {
          "atk": 1
        }
      }
    ],
    "flavor": "Er sagt, es hat Sinn. Sie glauben ihm, weil sie müssen.",
    "image": "unterstuetzung/A038.jpg",
    "max_copies": 4,
    "collector": "A038"
  },
  {
    "id": "dc_su_glaubensbanner",
    "set": "set_alpha",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Glaubensbanner",
    "ap": 3,
    "atk": null,
    "def": null,
    "tags": [
      "unterstuetzung",
      "glaube"
    ],
    "text": "Eigene Infanterie im Abschnitt hat +1 DEF.",
    "effects": [
      {
        "code": "SECTION_INFANTRY_DEF",
        "param": {
          "def": 1
        }
      }
    ],
    "flavor": "Es hält niemanden am Leben. Es hält sie nur zusammen.",
    "image": "unterstuetzung/A042.jpg",
    "max_copies": 2,
    "collector": "A042"
  },
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
    "image": "unterstuetzung/A071.jpg",
    "max_copies": 2,
    "collector": "A071"
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
    "image": "unterstuetzung/A072.jpg",
    "max_copies": 2,
    "collector": "A072"
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
    "image": "unterstuetzung/A073.jpg",
    "max_copies": 2,
    "collector": "A073"
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
    "image": "unterstuetzung/A074.jpg",
    "max_copies": 2,
    "collector": "A074"
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
    "image": "unterstuetzung/A075.jpg",
    "max_copies": 2,
    "collector": "A075"
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
    "image": "unterstuetzung/A076.jpg",
    "max_copies": 2,
    "collector": "A076"
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
    "image": "unterstuetzung/A077.jpg",
    "max_copies": 2,
    "collector": "A077"
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
    "image": "unterstuetzung/A078.jpg",
    "max_copies": 2,
    "collector": "A078"
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
    "image": "unterstuetzung/A079.jpg",
    "max_copies": 2,
    "collector": "A079"
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
    "image": "unterstuetzung/A080.jpg",
    "max_copies": 2,
    "collector": "A080"
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
    "image": "unterstuetzung/A081.jpg",
    "max_copies": 2,
    "collector": "A081"
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
    "image": "unterstuetzung/A082.jpg",
    "max_copies": 2,
    "collector": "A082"
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
    "image": "unterstuetzung/A083.jpg",
    "max_copies": 2,
    "collector": "A083"
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
    "image": "unterstuetzung/A084.jpg",
    "max_copies": 2,
    "collector": "A084"
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
    "image": "unterstuetzung/A085.jpg",
    "max_copies": 2,
    "collector": "A085"
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
    "image": "unterstuetzung/A086.jpg",
    "max_copies": 2,
    "collector": "A086"
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
    "image": "unterstuetzung/A087.jpg",
    "max_copies": 2,
    "collector": "A087"
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
    "image": "unterstuetzung/A088.jpg",
    "max_copies": 2,
    "collector": "A088"
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
    "image": "unterstuetzung/A089.jpg",
    "max_copies": 2,
    "collector": "A089"
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
    "image": "unterstuetzung/A090.jpg",
    "max_copies": 2,
    "collector": "A090"
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
    "image": "unterstuetzung/A091.jpg",
    "max_copies": 2,
    "collector": "A091"
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
    "image": "unterstuetzung/A092.jpg",
    "max_copies": 2,
    "collector": "A092"
  },
  {
    "id": "dc_b_wegweiser",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Wegweiser",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten in diesem Abschnitt kosten 1 weniger zum Schieben.",
    "effects": [],
    "flavor": "Wer schiebt, zahlt weniger.",
    "image": "unterstuetzung/B044.jpg",
    "max_copies": 1,
    "collector": "B044",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_feldkueche",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Feldküche",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: eine eigene Einheit im Abschnitt heilt 1 DEF.",
    "effects": [],
    "flavor": "Eine Schüssel Wärme. Ein Punkt zurück.",
    "image": "unterstuetzung/B045.jpg",
    "max_copies": 1,
    "collector": "B045",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_verbindungsstrasse",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Verbindungsstraße",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: schiebe eine eigene Einheit im Abschnitt um einen Slot.",
    "effects": [],
    "flavor": "Ein Befehl, ein Slot.",
    "image": "unterstuetzung/B047.jpg",
    "max_copies": 1,
    "collector": "B047",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_haltepunkt",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Haltepunkt",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten im Abschnitt haben +1 DEF, wenn keine Unterstützung im Abschnitt liegt.",
    "effects": [],
    "flavor": "Ohne Hilfe. Mit einem Punkt mehr.",
    "image": "unterstuetzung/B052.jpg",
    "max_copies": 1,
    "collector": "B052",
    "rarity": "silver"
  },
  {
    "id": "dc_b_marschordnung",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Marschordnung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: eine geschobene Einheit hat +1 ATK.",
    "effects": [],
    "flavor": "Wer geschoben wurde, schlägt härter.",
    "image": "unterstuetzung/B055.jpg",
    "max_copies": 1,
    "collector": "B055",
    "rarity": "silver"
  },
  {
    "id": "dc_b_nachschubader",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Nachschubader",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten, die in diesem Zug geschoben werden, kosten 1 weniger, mindestens 1.",
    "effects": [],
    "flavor": "Schieben wird billiger.",
    "image": "unterstuetzung/B058.jpg",
    "max_copies": 1,
    "collector": "B058",
    "rarity": "gold"
  },
  {
    "id": "dc_b_rastplatz",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Rastplatz",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Eine Einheit, die in diesem Zug nicht angegriffen hat, heilt 1 DEF.",
    "effects": [],
    "flavor": "Wer nicht schoss, heilt.",
    "image": "unterstuetzung/B060.jpg",
    "max_copies": 1,
    "collector": "B060",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_steinwall",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Steinwall",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten im Abschnitt haben +1 DEF gegen Einheiten, die in diesem Zug einrücken.",
    "effects": [],
    "flavor": "Steine statt Schilder. Der Hang hilft mit.",
    "image": "unterstuetzung/B067.jpg",
    "max_copies": 1,
    "collector": "B067",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_hangstellung",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Hangstellung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Eine einrückende gegnerische Einheit erleidet 1 Schaden.",
    "effects": [],
    "flavor": "Der Hang wirft zurück, was hinaufkommt.",
    "image": "unterstuetzung/B069.jpg",
    "max_copies": 1,
    "collector": "B069",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_passsperre",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Passsperre",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: eine einrückende Einheit erleidet 1 Schaden.",
    "effects": [],
    "flavor": "Der Pass schließt sich. Ein Schritt kostet Blut.",
    "image": "unterstuetzung/B074.jpg",
    "max_copies": 1,
    "collector": "B074",
    "rarity": "silver"
  },
  {
    "id": "dc_b_enger_weg",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Enger Weg",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: wähle einen Abschnitt. Eine einrückende Einheit dort erleidet 2 Schaden.",
    "effects": [],
    "flavor": "Hier kommt nur einer durch – und der bezahlt.",
    "image": "unterstuetzung/B077.jpg",
    "max_copies": 1,
    "collector": "B077",
    "rarity": "gold"
  },
  {
    "id": "dc_b_passwache",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Passwache",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Infanterie im Abschnitt hat +1 ATK gegen einrückende Einheiten.",
    "effects": [],
    "flavor": "Der Pass gehört dem, der wartet.",
    "image": "unterstuetzung/B083.jpg",
    "max_copies": 1,
    "collector": "B083",
    "rarity": "gold"
  },
  {
    "id": "dc_b_feldschmied",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Feldschmied",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: eine Ausrüstung im Abschnitt kostet 1 weniger, mindestens 1.",
    "effects": [],
    "flavor": "Hammer auf dem Feld. Die Platte sitzt noch.",
    "image": "unterstuetzung/B088.jpg",
    "max_copies": 1,
    "collector": "B088",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schmiedefeuer",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Schmiedefeuer",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten mit Ausrüstung im Abschnitt haben +1 DEF.",
    "effects": [],
    "flavor": "Das Feuer hält die Rüstung warm – und den Feind fern.",
    "image": "unterstuetzung/B092.jpg",
    "max_copies": 1,
    "collector": "B092",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_ahnentafel",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Ahnentafel",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wird im Abschnitt eine eigene Einheit zerstört, hat der Abschnitt +1 DEF bis zum Ende des nächsten Zuges.",
    "effects": [],
    "flavor": "Jeder Name auf der Tafel ist Deckung.",
    "image": "unterstuetzung/B093.jpg",
    "max_copies": 1,
    "collector": "B093",
    "rarity": "silver"
  },
  {
    "id": "dc_b_namensliste",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Namensliste",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: eine eigene Einheit mit Ausrüstung hat +1 ATK.",
    "effects": [],
    "flavor": "Die Liste wird länger. Die Klinge auch.",
    "image": "unterstuetzung/B096.jpg",
    "max_copies": 1,
    "collector": "B096",
    "rarity": "silver"
  },
  {
    "id": "dc_b_totenwall",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Totenwall",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wird im Abschnitt eine gegnerische Einheit zerstört, hat der Abschnitt +1 ATK bis Zugende und die übrigen Abschnitte +1 DEF bis zum Ende des nächsten Zuges.",
    "effects": [],
    "flavor": "Aus dem Fall der anderen wächst der Wall.",
    "image": "unterstuetzung/B100.jpg",
    "max_copies": 1,
    "collector": "B100",
    "rarity": "gold"
  },
  {
    "id": "dc_b_ahnenschmied",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Ahnenschmied",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: rüste eine eigene Infanterie mit einer Ausrüstung aus der Hand aus. Sie kostet 1 weniger.",
    "effects": [],
    "flavor": "Die Ahnen schmieden mit. Die Infanterie trägt es.",
    "image": "unterstuetzung/B104.jpg",
    "max_copies": 1,
    "collector": "B104",
    "rarity": "gold"
  },
  {
    "id": "dc_b_etappenlager",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Etappenlager",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: eine eigene Einheit im Abschnitt heilt 1 DEF.",
    "effects": [],
    "flavor": "Hier rastet die Kolonne.",
    "image": "unterstuetzung/B185.jpg",
    "max_copies": 1,
    "collector": "B185",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_feldstrasse",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Feldstraße",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten im Abschnitt kosten 1 weniger, mindestens 1.",
    "effects": [],
    "flavor": "Matsch wird Straße.",
    "image": "unterstuetzung/B191.jpg",
    "max_copies": 1,
    "collector": "B191",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_etappenarzt",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Etappenarzt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: heile 2 DEF an einer eigenen Einheit im Abschnitt.",
    "effects": [],
    "flavor": "Wer rastet, heilt.",
    "image": "unterstuetzung/B195.jpg",
    "max_copies": 1,
    "collector": "B195",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kolonnenkueche",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Kolonnenküche",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: eine eigene Infanterie im Abschnitt hat +1 ATK.",
    "effects": [],
    "flavor": "Warme Kost, harter Marsch.",
    "image": "unterstuetzung/B199.jpg",
    "max_copies": 1,
    "collector": "B199",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_etappennetz",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Etappennetz",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: spiele eine Ausrüstung mit 1 weniger.",
    "effects": [],
    "flavor": "Netz hält die Front.",
    "image": "unterstuetzung/B206.jpg",
    "max_copies": 1,
    "collector": "B206",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_haltelinie",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Haltelinie",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Eigene Einheiten im Abschnitt haben +1 DEF, solange sie in diesem Zug nicht angreifen.",
    "effects": [],
    "flavor": "Hier endet das Zurückweichen.",
    "image": "unterstuetzung/B209.jpg",
    "max_copies": 1,
    "collector": "B209",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_festes_etappenhaus",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Festes Etappenhaus",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: heile 2 DEF oder ziehe eine Karte.",
    "effects": [],
    "flavor": "Haus am Weg. Immer offen.",
    "image": "unterstuetzung/B215.jpg",
    "max_copies": 1,
    "collector": "B215",
    "rarity": "silver"
  },
  {
    "id": "dc_b_reserveachse",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Reserveachse",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Eigene Einheiten im Abschnitt haben +1 DEF. Einmal pro Zug: eine davon hat +1 ATK.",
    "effects": [],
    "flavor": "Achse hält und schiebt.",
    "image": "unterstuetzung/B218.jpg",
    "max_copies": 1,
    "collector": "B218",
    "rarity": "silver"
  },
  {
    "id": "dc_b_steinsperre",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Steinsperre",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einrückende Einheiten haben -1 ATK in diesem Abschnitt.",
    "effects": [],
    "flavor": "Geröll tut, was Mauern nicht schaffen.",
    "image": "unterstuetzung/B231.jpg",
    "max_copies": 1,
    "collector": "B231",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_verteilnetz",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Verteilnetz",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: eine eigene Einheit darf in einen angrenzenden Abschnitt mit eigener Unterstützung.",
    "effects": [],
    "flavor": "Viele Posten, ein Wille.",
    "image": "unterstuetzung/B232.jpg",
    "max_copies": 1,
    "collector": "B232",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_lauerwinkel",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Lauerwinkel",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Eigene Einheiten haben +1 ATK gegen Ziele, die in diesem Zug einrücken.",
    "effects": [],
    "flavor": "Der Winkel schließt sich.",
    "image": "unterstuetzung/B233.jpg",
    "max_copies": 1,
    "collector": "B233",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nebelhang",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Nebelhang",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Feindliche Fernangriffe in diesen Abschnitt haben -1.",
    "effects": [],
    "flavor": "Der Hang verschluckt den Blick.",
    "image": "unterstuetzung/B234.jpg",
    "max_copies": 1,
    "collector": "B234",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_querpass",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Querpass",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Angrenzende eigene Abschnitte gelten für Bewegung als verbunden.",
    "effects": [],
    "flavor": "Quer durchs Gebirge.",
    "image": "unterstuetzung/B249.jpg",
    "max_copies": 1,
    "collector": "B249",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_staffelnetz",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Staffelnetz",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Eigene Einheiten in angrenzenden Abschnitten haben +1 DEF.",
    "effects": [],
    "flavor": "Ein Netz aus Posten.",
    "image": "unterstuetzung/B255.jpg",
    "max_copies": 1,
    "collector": "B255",
    "rarity": "silver"
  },
  {
    "id": "dc_b_todestal",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Todestal",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einrückende Feinde erleiden 1 Schaden, wenn der Abschnitt mindestens zwei eigene Einheiten hat.",
    "effects": [],
    "flavor": "Willkommen im Tal.",
    "image": "unterstuetzung/B256.jpg",
    "max_copies": 1,
    "collector": "B256",
    "rarity": "silver"
  },
  {
    "id": "dc_b_feldamboss_270",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Feldamboss",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: eine eigene Einheit hier erhält +1 DEF bis Zugende.",
    "effects": [],
    "flavor": "Der Amboss schweigt nie.",
    "image": "unterstuetzung/B270.jpg",
    "max_copies": 1,
    "collector": "B270",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_knochenwall_271",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Knochenwall",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten hier haben +1 DEF. Wenn eine stirbt: der Wall bleibt.",
    "effects": [],
    "flavor": "Knochen halten länger.",
    "image": "unterstuetzung/B271.jpg",
    "max_copies": 1,
    "collector": "B271",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_gedenkfeuer_272",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Gedenkfeuer",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wenn eine eigene Einheit stirbt: ziehe eine Karte.",
    "effects": [],
    "flavor": "Flamme für die Namen.",
    "image": "unterstuetzung/B272.jpg",
    "max_copies": 1,
    "collector": "B272",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_plattenlager_273",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Plattenlager",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ausrüstungen kosten 1 weniger, wenn sie hier gespielt werden.",
    "effects": [],
    "flavor": "Platten gestapelt bis zur Decke.",
    "image": "unterstuetzung/B273.jpg",
    "max_copies": 1,
    "collector": "B273",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_verlustbuch_288",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Verlustbuch",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wann immer eine eigene Einheit stirbt: lege einen Zähler. Bei 3: ziehe zwei Karten und entferne die Zähler.",
    "effects": [],
    "flavor": "Die Liste wird länger.",
    "image": "unterstuetzung/B288.jpg",
    "max_copies": 1,
    "collector": "B288",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_grossschmiede_294",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Großschmiede",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: lege eine Ausrüstung aus der Hand an eine Einheit hier ohne Kosten (max 1).",
    "effects": [],
    "flavor": "Die Esse brennt Tag und Nacht.",
    "image": "unterstuetzung/B294.jpg",
    "max_copies": 1,
    "collector": "B294",
    "rarity": "silver"
  },
  {
    "id": "dc_b_totenbollwerk_295",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Totenbollwerk",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten hier haben +2 DEF. Feinde, die einrücken, haben -1 ATK.",
    "effects": [],
    "flavor": "Die Toten halten mit.",
    "image": "unterstuetzung/B295.jpg",
    "max_copies": 1,
    "collector": "B295",
    "rarity": "silver"
  },
  {
    "id": "dc_b_sanitaetszelt_301",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Sanitätszelt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: eine eigene Einheit im Abschnitt heilt 1 DEF.",
    "effects": [],
    "flavor": "Weiße Plane, ruhige Stimmen.",
    "image": "unterstuetzung/B301.jpg",
    "max_copies": 1,
    "collector": "B301",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_feldbaeckerei_305",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Feldbäckerei",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten im Abschnitt, die im letzten Zug nicht angegriffen haben, haben +1 DEF.",
    "effects": [],
    "flavor": "Warmes Brot hält die Linie.",
    "image": "unterstuetzung/B305.jpg",
    "max_copies": 1,
    "collector": "B305",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schutzgraben_306",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Schutzgraben",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten im Abschnitt haben +1 DEF.",
    "effects": [],
    "flavor": "Tiefe Erde, sicherer Atem.",
    "image": "unterstuetzung/B306.jpg",
    "max_copies": 1,
    "collector": "B306",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_lazarettzug_311",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Lazarettzug",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: eine eigene Einheit im Abschnitt heilt 2 DEF.",
    "effects": [],
    "flavor": "Räder, Verbände, Leben.",
    "image": "unterstuetzung/B311.jpg",
    "max_copies": 1,
    "collector": "B311",
    "rarity": "silver"
  },
  {
    "id": "dc_b_gesicherter_abschnitt_312",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Gesicherter Abschnitt",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle zu Beginn einen Abschnitt. Er hat in diesem Zug +1 DEF.",
    "effects": [],
    "flavor": "Markiert und gehalten.",
    "image": "unterstuetzung/B312.jpg",
    "max_copies": 1,
    "collector": "B312",
    "rarity": "silver"
  },
  {
    "id": "dc_b_schildwall_319",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Schildwall",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ein Abschnitt deiner Wahl hat +2 DEF in diesem Zug.",
    "effects": [],
    "flavor": "Schilde an Schilde.",
    "image": "unterstuetzung/B319.jpg",
    "max_copies": 1,
    "collector": "B319",
    "rarity": "gold"
  },
  {
    "id": "dc_b_vollschutz_321",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Vollschutz",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: eine eigene Einheit im Abschnitt hat +2 DEF.",
    "effects": [],
    "flavor": "Nichts kommt durch.",
    "image": "unterstuetzung/B321.jpg",
    "max_copies": 1,
    "collector": "B321",
    "rarity": "gold"
  },
  {
    "id": "dc_b_wasserstelle_332",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Wasserstelle",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten hier heilen 1 DEF zu Beginn deines Zuges.",
    "effects": [],
    "flavor": "Klares Wasser, klarer Kopf.",
    "image": "unterstuetzung/B332.jpg",
    "max_copies": 1,
    "collector": "B332",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_ruhefeuer_333",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Ruhefeuer",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten hier, die nicht angreifen, haben +1 DEF.",
    "effects": [],
    "flavor": "Wärme ohne Alarm.",
    "image": "unterstuetzung/B333.jpg",
    "max_copies": 1,
    "collector": "B333",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_verbandszelt_334",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Verbandszelt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: heile 1 DEF und die Einheit greift diesen Zug nicht an.",
    "effects": [],
    "flavor": "Leinwand und Ordnung.",
    "image": "unterstuetzung/B334.jpg",
    "max_copies": 1,
    "collector": "B334",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_etappenlager_335",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Etappenlager",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ausrüstungen und Heil-Einsätze kosten hier 1 weniger.",
    "effects": [],
    "flavor": "Alles griffbereit.",
    "image": "unterstuetzung/B335.jpg",
    "max_copies": 1,
    "collector": "B335",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schutzwall_aus_saecken_336",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Schutzwall aus Säcken",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten hier haben +1 DEF gegen den ersten Angriff pro Zug.",
    "effects": [],
    "flavor": "Sand hält Kugeln.",
    "image": "unterstuetzung/B336.jpg",
    "max_copies": 1,
    "collector": "B336",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_feldkueche_337",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Feldküche",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Zu Beginn: eine ruhende Einheit hier erhält +1 ATK diesen Zug.",
    "effects": [],
    "flavor": "Kraft aus dem Kessel.",
    "image": "unterstuetzung/B337.jpg",
    "max_copies": 1,
    "collector": "B337",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_grosslazarett_354",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Großlazarett",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: heile 2 DEF an bis zu zwei Einheiten.",
    "effects": [],
    "flavor": "Zelte in Reihe.",
    "image": "unterstuetzung/B354.jpg",
    "max_copies": 1,
    "collector": "B354",
    "rarity": "silver"
  },
  {
    "id": "dc_b_befestigte_etappe_355",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Befestigte Etappe",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Abschnitt +1 DEF. Ruhende Einheiten hier +1 ATK.",
    "effects": [],
    "flavor": "Geschützt und bereit.",
    "image": "unterstuetzung/B355.jpg",
    "max_copies": 1,
    "collector": "B355",
    "rarity": "silver"
  },
  {
    "id": "dc_b_zielpunkt_425",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Zielpunkt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: wähle ein gegnerisches Ziel. Angriffe dagegen haben +1 ATK.",
    "effects": [],
    "flavor": "Hier.",
    "image": "unterstuetzung/B425.jpg",
    "max_copies": 1,
    "collector": "B425",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zielkarte_428",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Zielkarte",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Aufgeklärte Einheiten haben -1 DEF.",
    "effects": [],
    "flavor": "Auf der Karte.",
    "image": "unterstuetzung/B428.jpg",
    "max_copies": 1,
    "collector": "B428",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zielerfassung_430",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Zielerfassung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: decke eine gegnerische Einheit auf. Angriffe dagegen haben +1 ATK.",
    "effects": [],
    "flavor": "Erfasst.",
    "image": "unterstuetzung/B430.jpg",
    "max_copies": 1,
    "collector": "B430",
    "rarity": "silver"
  },
  {
    "id": "dc_b_volle_sicht_435",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Volle Sicht",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Alle gegnerischen Einheiten sind aufgeklärt.",
    "effects": [],
    "flavor": "Alles offen.",
    "image": "unterstuetzung/B435.jpg",
    "max_copies": 1,
    "collector": "B435",
    "rarity": "gold"
  },
  {
    "id": "dc_b_feuerleitstand_440",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Feuerleitstand",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: ein Angriff gegen ein aufgeklärtes Ziel hat +2 ATK.",
    "effects": [],
    "flavor": "Vom Stand aus.",
    "image": "unterstuetzung/B440.jpg",
    "max_copies": 1,
    "collector": "B440",
    "rarity": "gold"
  },
  {
    "id": "dc_b_visierkette_450",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Visierkette",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten hier haben +1 ATK gegen aufgeklärte Ziele.",
    "effects": [],
    "flavor": "Kette hält.",
    "image": "unterstuetzung/B450.jpg",
    "max_copies": 1,
    "collector": "B450",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_peilnetz_451",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Peilnetz",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: decke eine Einheit im Abschnitt auf.",
    "effects": [],
    "flavor": "Netz spannt sich.",
    "image": "unterstuetzung/B451.jpg",
    "max_copies": 1,
    "collector": "B451",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_sichtfeld_452",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Sichtfeld",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Aufgeklärte Feinde hier haben -1 DEF.",
    "effects": [],
    "flavor": "Offenes Feld.",
    "image": "unterstuetzung/B452.jpg",
    "max_copies": 1,
    "collector": "B452",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_messplatz_453",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Messplatz",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Zu Beginn: decke ein Ziel auf oder ziehe eine Karte.",
    "effects": [],
    "flavor": "Platz zum Messen.",
    "image": "unterstuetzung/B453.jpg",
    "max_copies": 1,
    "collector": "B453",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zielbrett_454",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Zielbrett",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Angriffe von hier gegen aufgeklärte Ziele +1 ATK.",
    "effects": [],
    "flavor": "Brett markiert.",
    "image": "unterstuetzung/B454.jpg",
    "max_copies": 1,
    "collector": "B454",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_optiklager_455",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Optiklager",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ausrüstung hier kostet 1 weniger, mindestens 1.",
    "effects": [],
    "flavor": "Lager voll Optik.",
    "image": "unterstuetzung/B455.jpg",
    "max_copies": 1,
    "collector": "B455",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_optiknetz_474",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Optiknetz",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: decke zwei Ziele auf. Angriffe dagegen +1 ATK.",
    "effects": [],
    "flavor": "Netz gespannt.",
    "image": "unterstuetzung/B474.jpg",
    "max_copies": 1,
    "collector": "B474",
    "rarity": "silver"
  },
  {
    "id": "dc_b_vollpeilung_475",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Vollpeilung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Alle Feinde im Abschnitt sind aufgeklärt. -1 DEF.",
    "effects": [],
    "flavor": "Voll peilen.",
    "image": "unterstuetzung/B475.jpg",
    "max_copies": 1,
    "collector": "B475",
    "rarity": "silver"
  },
  {
    "id": "dc_b_hafenlieferung_481",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Hafenlieferung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten in diesem Abschnitt kosten 1 weniger zum Ausspielen, mindestens 1.",
    "effects": [],
    "flavor": "Kai offen.",
    "image": "unterstuetzung/B481.jpg",
    "max_copies": 1,
    "collector": "B481",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nachschubboot_483",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Nachschubboot",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: ziehe eine Karte, wenn im Abschnitt eine Unterstützung liegt.",
    "effects": [],
    "flavor": "Über den Kai.",
    "image": "unterstuetzung/B483.jpg",
    "max_copies": 1,
    "collector": "B483",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_versorgungsschiff_485",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Versorgungsschiff",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten, die in diesem Zug in diesen Abschnitt gespielt werden, haben +1 ATK.",
    "effects": [],
    "flavor": "Ladung an Bord.",
    "image": "unterstuetzung/B485.jpg",
    "max_copies": 1,
    "collector": "B485",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_entsatzposten_490",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Entsatzposten",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "+1 DEF, wenn der Abschnitt im letzten Zug angegriffen wurde.",
    "effects": [],
    "flavor": "Halte den Abschnitt.",
    "image": "unterstuetzung/B490.jpg",
    "max_copies": 1,
    "collector": "B490",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_lagerhalle_493",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Lagerhalle",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: behalte die oberste Karte deines Nachziehstapels sichtbar, bis sie gespielt oder abgeworfen wird.",
    "effects": [],
    "flavor": "Trocken lagern.",
    "image": "unterstuetzung/B493.jpg",
    "max_copies": 1,
    "collector": "B493",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_leichter_504",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Leichter",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten dürfen in diesem Zug aus diesem Abschnitt für 1 AP weniger rücken.",
    "effects": [],
    "flavor": "Umladen.",
    "image": "unterstuetzung/B504.jpg",
    "max_copies": 1,
    "collector": "B504",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_laternenpfad_507",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Laternenpfad",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten, die in diesen Abschnitt rücken, sind nicht überrascht.",
    "effects": [],
    "flavor": "Licht am Weg.",
    "image": "unterstuetzung/B507.jpg",
    "max_copies": 1,
    "collector": "B507",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_brueckenposten_512",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Brückenposten",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Gegnerische Einheiten, die in diesen Abschnitt rücken, haben -1 ATK in diesem Zug.",
    "effects": [],
    "flavor": "Engpass.",
    "image": "unterstuetzung/B512.jpg",
    "max_copies": 1,
    "collector": "B512",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kaikran_517",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Kaikran",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: bewege eine Ausrüstung von einer Einheit auf eine andere im Abschnitt.",
    "effects": [],
    "flavor": "Schweres Gerät.",
    "image": "unterstuetzung/B517.jpg",
    "max_copies": 1,
    "collector": "B517",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_volle_front_522",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Volle Front",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten im Abschnitt haben +1 ATK, wenn im Abschnitt eine Unterstützung liegt.",
    "effects": [],
    "flavor": "Alles nach vorn.",
    "image": "unterstuetzung/B522.jpg",
    "max_copies": 1,
    "collector": "B522",
    "rarity": "silver"
  },
  {
    "id": "dc_b_nachschubader_523",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Nachschubader",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: eine Einheit, die in diesen Abschnitt gespielt wird, kostet 1 weniger.",
    "effects": [],
    "flavor": "Lebensader.",
    "image": "unterstuetzung/B523.jpg",
    "max_copies": 1,
    "collector": "B523",
    "rarity": "silver"
  },
  {
    "id": "dc_b_hafenverbund_525",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Hafenverbund",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "+1 DEF, wenn in mindestens zwei Abschnitten Unterstützung liegt.",
    "effects": [],
    "flavor": "Häfen halten zusammen.",
    "image": "unterstuetzung/B525.jpg",
    "max_copies": 1,
    "collector": "B525",
    "rarity": "silver"
  },
  {
    "id": "dc_b_hafensperre_531",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Hafensperre",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Gegnerische Einheiten können diesen Abschnitt nicht als erstes Angriffsziel wählen, solange hier eine Einheit steht.",
    "effects": [],
    "flavor": "Kai dicht.",
    "image": "unterstuetzung/B531.jpg",
    "max_copies": 1,
    "collector": "B531",
    "rarity": "silver"
  },
  {
    "id": "dc_b_voller_tross_533",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Voller Tross",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Am Ende deines Zuges: wenn hier 2+ Einheiten stehen, ziehe eine Karte.",
    "effects": [],
    "flavor": "Versorgt.",
    "image": "unterstuetzung/B533.jpg",
    "max_copies": 1,
    "collector": "B533",
    "rarity": "silver"
  },
  {
    "id": "dc_b_offener_kai_535",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Offener Kai",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten in diesem Abschnitt kosten 1 weniger und haben +1 ATK in dem Zug, in dem sie gespielt werden.",
    "effects": [],
    "flavor": "Tor weit offen.",
    "image": "unterstuetzung/B535.jpg",
    "max_copies": 1,
    "collector": "B535",
    "rarity": "gold"
  },
  {
    "id": "dc_b_feuerplanstelle_541",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Feuerplanstelle",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: wähle eine feindliche Einheit in diesem Abschnitt. Sie gilt als beobachtet.",
    "effects": [],
    "flavor": "Drei Schlüssel. Eine Karte.",
    "image": "unterstuetzung/B541.jpg",
    "max_copies": 1,
    "collector": "B541",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_stabskarte_545",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Stabskarte",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Eigene Angriffe in diesem Abschnitt gegen beobachtete Einheiten haben +1 ATK.",
    "effects": [],
    "flavor": "Lage geklärt.",
    "image": "unterstuetzung/B545.jpg",
    "max_copies": 1,
    "collector": "B545",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_depotfreigabe_550",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Depotfreigabe",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten in diesem Abschnitt kosten 1 weniger zum Ausspielen, mindestens 1.",
    "effects": [],
    "flavor": "Kommission nickt.",
    "image": "unterstuetzung/B550.jpg",
    "max_copies": 1,
    "collector": "B550",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_feuerleitblatt_557",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Feuerleitblatt",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: +1 ATK für einen Angriff gegen eine beobachtete Einheit.",
    "effects": [],
    "flavor": "Zahlen sitzen.",
    "image": "unterstuetzung/B557.jpg",
    "max_copies": 1,
    "collector": "B557",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_alarmglocke_564",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Alarmglocke",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wenn dieser Abschnitt angegriffen wird: eine eigene Einheit hier hat +1 DEF in diesem Zug.",
    "effects": [],
    "flavor": "Verfahren greift.",
    "image": "unterstuetzung/B564.jpg",
    "max_copies": 1,
    "collector": "B564",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_lagerordnung_568",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Lagerordnung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Eigene Einheiten in diesem Abschnitt haben +1 DEF, wenn du in diesem Zug keine Soforteinsatz-Karte spielst.",
    "effects": [],
    "flavor": "Ordnung vor Tempo.",
    "image": "unterstuetzung/B568.jpg",
    "max_copies": 1,
    "collector": "B568",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_standardmunition_573",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Standardmunition",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten in diesem Abschnitt haben +1 ATK bei ihrem ersten Angriff in diesem Zug.",
    "effects": [],
    "flavor": "Kaliber eins.",
    "image": "unterstuetzung/B573.jpg",
    "max_copies": 1,
    "collector": "B573",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_lagebericht_578",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Lagebericht",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Zu Beginn deines Zuges: eine feindliche Einheit im Abschnitt gilt als beobachtet.",
    "effects": [],
    "flavor": "Stab und Amt.",
    "image": "unterstuetzung/B578.jpg",
    "max_copies": 1,
    "collector": "B578",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_feuerplanzentrale_581",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Feuerplanzentrale",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einmal pro Zug: wähle bis zu zwei feindliche Einheiten. Sie gelten als beobachtet. Angriffe gegen sie haben +1 ATK.",
    "effects": [],
    "flavor": "Alles verkabelt.",
    "image": "unterstuetzung/B581.jpg",
    "max_copies": 1,
    "collector": "B581",
    "rarity": "silver"
  },
  {
    "id": "dc_b_kommissionsdepot_584",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Kommissionsdepot",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten kosten hier 1 weniger. Einmal pro Zug: ziehe eine Karte, wenn du eine Einheit hier spielst.",
    "effects": [],
    "flavor": "Schlüssel drehen.",
    "image": "unterstuetzung/B584.jpg",
    "max_copies": 1,
    "collector": "B584",
    "rarity": "silver"
  },
  {
    "id": "dc_b_landesfreigabe_590",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Landesfreigabe",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Einheiten im Abschnitt haben +1 ATK und +1 DEF, solange du in diesem Zug keine Einheit bewegst.",
    "effects": [],
    "flavor": "Land sagt ja.",
    "image": "unterstuetzung/B590.jpg",
    "max_copies": 1,
    "collector": "B590",
    "rarity": "silver"
  },
  {
    "id": "dc_b_planfestigung_594",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Planfestigung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Eigene Einheiten hier haben +1 DEF. Angriffe von hier gegen Beobachtete +1 ATK.",
    "effects": [],
    "flavor": "Verfahren hält.",
    "image": "unterstuetzung/B594.jpg",
    "max_copies": 1,
    "collector": "B594",
    "rarity": "silver"
  },
  {
    "id": "dc_b_grossfeuerplan_595",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Großfeuerplan",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Alle feindlichen Einheiten im Abschnitt gelten als beobachtet. Eigene Angriffe hier +1 ATK. Einmal pro Zug: ziehe eine Karte.",
    "effects": [],
    "flavor": "Der Apparat läuft.",
    "image": "unterstuetzung/B595.jpg",
    "max_copies": 1,
    "collector": "B595",
    "rarity": "gold"
  },
  {
    "id": "dc_b_schwurprotokoll_627",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Schwurprotokoll",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal pro Zug: eine eigene Einheit hat +1 DEF bis Zugende.",
    "effects": [],
    "flavor": "Unterschrieben. Unwiderruflich.",
    "image": "unterstuetzung/B627.jpg",
    "max_copies": 1,
    "collector": "B627",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_depot_erbe_628",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Depot Erbe",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten kosten dich 1 AP weniger (mindestens 1), solange diese Karte liegt.",
    "effects": [],
    "flavor": "Die alten Magazine öffnen sich nicht von allein.",
    "image": "unterstuetzung/B628.jpg",
    "max_copies": 1,
    "collector": "B628",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_abloesungsplan_629",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Ablösungsplan",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal pro Zug: ersetze eine eigene beschädigte Einheit durch eine aus der Hand mit gleicher oder geringerer Kosten (AP normal).",
    "effects": [],
    "flavor": "Der Platz bleibt besetzt. Die Person wechselt.",
    "image": "unterstuetzung/B629.jpg",
    "max_copies": 1,
    "collector": "B629",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schwerpunktkarte_630",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Schwerpunktkarte",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal pro Zug: wähle einen Abschnitt. Angriffe eigener Einheiten dort haben +1 ATK.",
    "effects": [],
    "flavor": "Ein Kreis auf der Karte. Darunter sterben Leute.",
    "image": "unterstuetzung/B630.jpg",
    "max_copies": 1,
    "collector": "B630",
    "rarity": "silver"
  },
  {
    "id": "dc_b_flussrot_umschlag_631",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Flussrot-Umschlag",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Ziehe 1 Karte, wenn du eine Einheit spielst, die eine andere ersetzt.",
    "effects": [],
    "flavor": "Kai, Kran, Befehl — in dieser Reihenfolge.",
    "image": "unterstuetzung/B631.jpg",
    "max_copies": 1,
    "collector": "B631",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_regimentsarchiv_632",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Regimentsarchiv",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Wenn eine eigene Einheit zerstört wird: lege die oberste Karte deines Friedhofs unter dein Deck.",
    "effects": [],
    "flavor": "Namen bleiben. Körper nicht.",
    "image": "unterstuetzung/B632.jpg",
    "max_copies": 1,
    "collector": "B632",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kronrat_633",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Kronrat",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Eigene Elite und Panzer haben +1 DEF.",
    "effects": [],
    "flavor": "Der Rat tagt, bis der Abschnitt hält.",
    "image": "unterstuetzung/B633.jpg",
    "max_copies": 1,
    "collector": "B633",
    "rarity": "silver"
  },
  {
    "id": "dc_b_werkstattbefehl_634",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Werkstattbefehl",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal pro Zug: heile 1 DEF an einem eigenen Panzer oder Fahrzeug.",
    "effects": [],
    "flavor": "Werkrott schläft nicht.",
    "image": "unterstuetzung/B634.jpg",
    "max_copies": 1,
    "collector": "B634",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_unfehlbarer_erlass_635",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Unfehlbarer Erlass",
    "ap": 4,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal pro Zug: eine eigene Einheit ignoriert den ersten Schaden in diesem Zug.",
    "effects": [],
    "flavor": "Die Krone irrt nicht. Die Rechnung schon.",
    "image": "unterstuetzung/B635.jpg",
    "max_copies": 1,
    "collector": "B635",
    "rarity": "gold"
  },
  {
    "id": "dc_b_parlamentsbindung_636",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Parlamentsbindung",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Gegnerische Unterstützungskarten können in dem Zug, in dem du eine Einheit ersetzt, nicht aktiviert werden.",
    "effects": [],
    "flavor": "Kontrolle statt Glorie.",
    "image": "unterstuetzung/B636.jpg",
    "max_copies": 1,
    "collector": "B636",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_linienknoten_663",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Linienknoten",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ein Abschnitt mit mindestens zwei eigenen Einheiten erhält +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Knoten offen. Linie dicht.",
    "image": "unterstuetzung/B663.jpg",
    "max_copies": 1,
    "collector": "B663",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_vorratshalle_667",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Vorratshalle",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 2 Karten. Lege 1 Karte ab.",
    "effects": [],
    "flavor": "Volle Halle. Stehende Straße.",
    "image": "unterstuetzung/B667.jpg",
    "max_copies": 1,
    "collector": "B667",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_seilbrucke_672",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Seilbrücke",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Bewege eine eigene Ausrüstung auf eine Einheit in einem anderen Abschnitt.",
    "effects": [],
    "flavor": "Was gestern woanders war.",
    "image": "unterstuetzung/B672.jpg",
    "max_copies": 1,
    "collector": "B672",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_doppelkolonne_678",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Doppelkolonne",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Zwei eigene Einheiten im selben Abschnitt erhalten je +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Nebeneinander fahren.",
    "image": "unterstuetzung/B678.jpg",
    "max_copies": 1,
    "collector": "B678",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_wasserstelle_681",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Wasserstelle",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Heile 1 Schaden an einer eigenen Einheit. Wenn du in diesem Zug eine Karte abgelegt hast: heile 1 weiteren.",
    "effects": [],
    "flavor": "Ohne Ankommen kein Staat.",
    "image": "unterstuetzung/B681.jpg",
    "max_copies": 1,
    "collector": "B681",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_flie_befehl_687",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Fließbefehl",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Bewege eine eigene Einheit. Sie erhält +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Fließen ist halten.",
    "image": "unterstuetzung/B687.jpg",
    "max_copies": 1,
    "collector": "B687",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_meilenstein_691",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Meilenstein",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Markiere einen Abschnitt. Eigene Einheiten, die diesen Zug dorthin bewegt werden, erhalten +1 ATK.",
    "effects": [],
    "flavor": "Entfernung messen, nicht besitzen.",
    "image": "unterstuetzung/B691.jpg",
    "max_copies": 1,
    "collector": "B691",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_lagerplan_695",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Lagerplan",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle bis zu zwei Abschnitte. Je eine eigene Einheit dort erhält +1 DEF.",
    "effects": [],
    "flavor": "Lager erreicht Stadt.",
    "image": "unterstuetzung/B695.jpg",
    "max_copies": 1,
    "collector": "B695",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_vertragsnetz_704",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Vertragsnetz",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Alle Abschnitte mit mindestens zwei eigenen Einheiten erhalten +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Städte halten Strecke.",
    "image": "unterstuetzung/B704.jpg",
    "max_copies": 1,
    "collector": "B704",
    "rarity": "silver"
  },
  {
    "id": "dc_b_umschlagzentrale_706",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Umschlagzentrale",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 3 Karten. Lege 2 Karten ab. Eine eigene Einheit erhält +1 ATK und +1 DEF.",
    "effects": [],
    "flavor": "Knoten ohne Thron.",
    "image": "unterstuetzung/B706.jpg",
    "max_copies": 1,
    "collector": "B706",
    "rarity": "silver"
  },
  {
    "id": "dc_b_vorratskette_710",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Vorratskette",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Lege diese Karte in einen Abschnitt. Eigene Einheiten dort haben +1 DEF. Einmal: ziehe 2 Karten.",
    "effects": [],
    "flavor": "Speicher, die erreicht werden.",
    "image": "unterstuetzung/B710.jpg",
    "max_copies": 1,
    "collector": "B710",
    "rarity": "silver"
  },
  {
    "id": "dc_b_linienwall_713",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Linienwall",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle einen Abschnitt mit mindestens zwei eigenen Einheiten. Er erhält +2 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Wall aus Bewegung.",
    "image": "unterstuetzung/B713.jpg",
    "max_copies": 1,
    "collector": "B713",
    "rarity": "silver"
  },
  {
    "id": "dc_b_handelsfront_717",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Handelsfront",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Jeder Abschnitt mit mindestens zwei eigenen Einheiten: +1 DEF und ziehe 1 Karte (max. 3 Karten).",
    "effects": [],
    "flavor": "Morgen kommt an.",
    "image": "unterstuetzung/B717.jpg",
    "max_copies": 1,
    "collector": "B717",
    "rarity": "gold"
  },
  {
    "id": "dc_b_stillwasser_brief_726",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Stillwasser-Brief",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 1 Karte. Wenn du in diesem Zug angegriffen wurdest: ziehe 1 weitere.",
    "effects": [],
    "flavor": "Stillwasser liest abends.",
    "image": "unterstuetzung/B726.jpg",
    "max_copies": 1,
    "collector": "B726",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_aurelien_akte_729",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Aurelien-Akte",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Schaue die obersten 2 Karten deines Decks an. Lege eine davon auf die Hand, die andere unter das Deck.",
    "effects": [],
    "flavor": "Papier vor dem Marsch.",
    "image": "unterstuetzung/B729.jpg",
    "max_copies": 1,
    "collector": "B729",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_flusskahn_733",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Flusskahn",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Lege 1 Karte ab: eine eigene Einheit erhält +1 DEF und du ziehst 1 Karte.",
    "effects": [],
    "flavor": "Ein Kahn ist keine Front.",
    "image": "unterstuetzung/B733.jpg",
    "max_copies": 1,
    "collector": "B733",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schulrain_satz_734",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Schulrain-Satz",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 1 Karte. Du kannst diesen Zug keine Einheit mit Kosten 4 oder mehr ausspielen.",
    "effects": [],
    "flavor": "Dauer vor Schlacht.",
    "image": "unterstuetzung/B734.jpg",
    "max_copies": 1,
    "collector": "B734",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_markenbrief_740",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Markenbrief",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 1 Karte. Wenn eine eigene Einheit in diesem Zug Schaden erlitten hat: +1 DEF für eine eigene Einheit.",
    "effects": [],
    "flavor": "Lehm ist wahrer als Überschrift.",
    "image": "unterstuetzung/B740.jpg",
    "max_copies": 1,
    "collector": "B740",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_parlamentsgasse_746",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Parlamentsgasse",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle einen Abschnitt. Eigene Einheiten dort haben +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Nah genug, dass beide sehen.",
    "image": "unterstuetzung/B746.jpg",
    "max_copies": 1,
    "collector": "B746",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kronland_amt_749",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Kronland-Amt",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 1 Karte. Lege diese Karte in einen Abschnitt: einmal, wenn eine eigene Einheit dort Schaden nimmt, erhält sie +1 DEF.",
    "effects": [],
    "flavor": "Akten vor Eile.",
    "image": "unterstuetzung/B749.jpg",
    "max_copies": 1,
    "collector": "B749",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_markenfels_pfad_753",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Markenfels-Pfad",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Bewege eine eigene Einheit in einen angrenzenden Abschnitt. Sie erhält +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Wege der alten Grenze.",
    "image": "unterstuetzung/B753.jpg",
    "max_copies": 1,
    "collector": "B753",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_flussland_hof_757",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Flussland-Hof",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Erhalte 1 AP, wenn du in diesem Zug noch nicht angegriffen hast.",
    "effects": [],
    "flavor": "Höfe rechnen weiter.",
    "image": "unterstuetzung/B757.jpg",
    "max_copies": 1,
    "collector": "B757",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_aurelien_brot_760",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Aurelien-Brot",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 1 Karte. Du darfst eine Karte abwerfen: eine eigene Einheit erhält +1 DEF.",
    "effects": [],
    "flavor": "Brot, nicht Siegesmesse.",
    "image": "unterstuetzung/B760.jpg",
    "max_copies": 1,
    "collector": "B760",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_doppelhaus_stab_762",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Doppelhaus-Stab",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle einen Abschnitt. Eigene Einheiten dort haben +1 ATK und +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Krone führt. Parlament verwaltet.",
    "image": "unterstuetzung/B762.jpg",
    "max_copies": 1,
    "collector": "B762",
    "rarity": "silver"
  },
  {
    "id": "dc_b_gegenstosskommando_764",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Gegenstoßkommando",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Eine eigene Einheit, die in diesem Zug angegriffen wurde, hat +2 ATK und +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Wurde angegriffen — antwortet härter.",
    "image": "unterstuetzung/B764.jpg",
    "max_copies": 1,
    "collector": "B764",
    "rarity": "silver"
  },
  {
    "id": "dc_b_zeughaus_vorrat_767",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Zeughaus-Vorrat",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Lege diese Karte in einen Abschnitt. Einmal: eine eigene Einheit dort erhält +2 DEF oder +2 ATK bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Über Jahre gepflegt.",
    "image": "unterstuetzung/B767.jpg",
    "max_copies": 1,
    "collector": "B767",
    "rarity": "silver"
  },
  {
    "id": "dc_b_brueckenau_netz_771",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Brückenau-Netz",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 2 Karten. Eine eigene Einheit erhält +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Versorgung, keine Flotte.",
    "image": "unterstuetzung/B771.jpg",
    "max_copies": 1,
    "collector": "B771",
    "rarity": "silver"
  },
  {
    "id": "dc_b_grosse_auffangstellung_775",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Große Auffangstellung",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle einen Abschnitt. Solange der Gegner dort mehr Einheiten hat, haben eigene Einheiten dort +2 DEF. Einmal: eine eigene Einheit dort hat +2 ATK bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Vorbereitete Verteidigung in Arbeit.",
    "image": "unterstuetzung/B775.jpg",
    "max_copies": 1,
    "collector": "B775",
    "rarity": "gold"
  },
  {
    "id": "dc_b_lagekarte_offen_791",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Lagekarte offen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 1 Karte. Eine gegnerische Einheit gilt als aufgeklärt bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Lage Offen korrigiert sich laut.",
    "image": "unterstuetzung/B791.jpg",
    "max_copies": 1,
    "collector": "B791",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kurzer_rahmen_792",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Kurzer Rahmen",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle eine eigene Einheit. Sie hat +1 ATK. Wenn das Ziel aufgeklärt ist: zusätzlich +1 ATK bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Der Rahmen ist geöffnet. Nicht die Herrschaft.",
    "image": "unterstuetzung/B792.jpg",
    "max_copies": 1,
    "collector": "B792",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_netzuebung_793",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Netzübung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 2 Karten, dann lege 1 Karte ab.",
    "effects": [],
    "flavor": "Eine Übung mit heimlicher Leitung ist keine.",
    "image": "unterstuetzung/B793.jpg",
    "max_copies": 1,
    "collector": "B793",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zweite_quelle_794",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Zweite Quelle",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle einen Abschnitt. Bis zum Ende des Zuges gelten alle gegnerischen Einheiten dort als aufgeklärt.",
    "effects": [],
    "flavor": "Zwei Quellen. Ein Urteil später.",
    "image": "unterstuetzung/B794.jpg",
    "max_copies": 1,
    "collector": "B794",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_parlamentsmandat_795",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Parlamentsmandat",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Eine eigene Einheit hat +1 DEF. Wenn du in diesem Zug angegriffen hast: ziehe 1 Karte.",
    "effects": [],
    "flavor": "Getragen oder begründet abgelehnt.",
    "image": "unterstuetzung/B795.jpg",
    "max_copies": 1,
    "collector": "B795",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nordfall_brief_796",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Nordfall-Brief",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 1 Karte. Wenn du keine Einheit ausgespielt hast in diesem Zug: +1 DEF auf eine eigene Einheit.",
    "effects": [],
    "flavor": "Papier liest nicht mit.",
    "image": "unterstuetzung/B796.jpg",
    "max_copies": 1,
    "collector": "B796",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_westhaven_ladung_810",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Westhaven-Ladung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle eine eigene Einheit. Sie hat +1 DEF. Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Schiffe bringen. Keine zweite Streitmacht.",
    "image": "unterstuetzung/B810.jpg",
    "max_copies": 1,
    "collector": "B810",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_quellenpflicht_811",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Quellenpflicht",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 1 Karte. Lege 1 Karte aus deiner Hand offen ab: eine gegnerische Einheit gilt als aufgeklärt.",
    "effects": [],
    "flavor": "Eine Quelle nennen.",
    "image": "unterstuetzung/B811.jpg",
    "max_copies": 1,
    "collector": "B811",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_rasterpause_812",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Rasterpause",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle einen Abschnitt. Eigene Einheiten dort haben +1 DEF bis zum Ende des Zuges. Wenn dort eine aufgeklärte gegnerische Einheit ist: +1 ATK für eine eigene Einheit dort.",
    "effects": [],
    "flavor": "Das Raster sitzt neben der Halle.",
    "image": "unterstuetzung/B812.jpg",
    "max_copies": 1,
    "collector": "B812",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_halle_korrektur_819",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Halle-Korrektur",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 1 Karte. Eine eigene Einheit hat +1 ATK bis zum Ende des Zuges, wenn ihr Ziel aufgeklärt ist.",
    "effects": [],
    "flavor": "Am nächsten Tag laut korrigiert.",
    "image": "unterstuetzung/B819.jpg",
    "max_copies": 1,
    "collector": "B819",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_doppelknoten_stab_822",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Doppelknoten-Stab",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle einen Abschnitt. Alle gegnerischen Einheiten dort gelten als aufgeklärt. Eigene Einheiten dort haben +1 ATK und +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Zwei Knoten. Eine Debatte.",
    "image": "unterstuetzung/B822.jpg",
    "max_copies": 1,
    "collector": "B822",
    "rarity": "silver"
  },
  {
    "id": "dc_b_lokalisierungsbefehl_824",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Lokalisierungsbefehl",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle bis zu zwei aufgeklärte gegnerische Einheiten. Sie erhalten −1 DEF bis zum Ende des Zuges. Eine eigene Einheit hat +2 ATK gegen eine davon.",
    "effects": [],
    "flavor": "Gefunden heißt noch nicht entschieden.",
    "image": "unterstuetzung/B824.jpg",
    "max_copies": 1,
    "collector": "B824",
    "rarity": "silver"
  },
  {
    "id": "dc_b_westhaven_staffel_826",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Westhaven-Staffel",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 2 Karten. Eine eigene Einheit hat +2 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Nachschub ohne Frontanspruch.",
    "image": "unterstuetzung/B826.jpg",
    "max_copies": 1,
    "collector": "B826",
    "rarity": "silver"
  },
  {
    "id": "dc_b_mandatsnetz_831",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Mandatsnetz",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle bis zu zwei eigene Einheiten. Jede hat +1 ATK und +1 DEF bis zum Ende des Zuges. Eine gegnerische Einheit gilt als aufgeklärt.",
    "effects": [],
    "flavor": "Getragen von Namen mit Mandat.",
    "image": "unterstuetzung/B831.jpg",
    "max_copies": 1,
    "collector": "B831",
    "rarity": "silver"
  },
  {
    "id": "dc_b_grosse_knotenstellung_835",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Große Knotenstellung",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle einen Abschnitt. Alle gegnerischen Einheiten dort gelten als aufgeklärt. Eigene Einheiten dort haben +2 DEF. Eine eigene Einheit dort hat +2 ATK bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Die Knotenhalle sieht das Land.",
    "image": "unterstuetzung/B835.jpg",
    "max_copies": 1,
    "collector": "B835",
    "rarity": "gold"
  },
  {
    "id": "dc_b_falsche_meldung_849",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Falsche Meldung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 1 Karte. Der Gegner legt 1 Karte ab.",
    "effects": [],
    "flavor": "Wahr zur falschen Stunde.",
    "image": "unterstuetzung/B849.jpg",
    "max_copies": 1,
    "collector": "B849",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_doppelakte_850",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Doppelakte",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle einen Abschnitt. Eigene Einheiten dort haben +1 DEF. Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Zwei gültige Oberflächen.",
    "image": "unterstuetzung/B850.jpg",
    "max_copies": 1,
    "collector": "B850",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_gegenseitige_lesbarkeit_856",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Gegenseitige Lesbarkeit",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 1 Karte. Eine eigene Einheit hat +1 ATK bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Man hilft und merkt sich wobei.",
    "image": "unterstuetzung/B856.jpg",
    "max_copies": 1,
    "collector": "B856",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_ivo_lage_858",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Ivo-Lage",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle bis zu zwei Abschnitte. In jedem hat eine eigene Einheit +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Ivo setzt. Er folgt niemandem.",
    "image": "unterstuetzung/B858.jpg",
    "max_copies": 1,
    "collector": "B858",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_depot_verborgen_860",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Depot verborgen",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 1 Karte. Bis zum Ende des Zuges: eigene Einheiten haben +1 DEF.",
    "effects": [],
    "flavor": "Versorgung ist Information.",
    "image": "unterstuetzung/B860.jpg",
    "max_copies": 1,
    "collector": "B860",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_amt_gegen_amt_866",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Amt gegen Amt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Der Gegner legt 1 Karte ab. Eine eigene Einheit hat +1 ATK und +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Keine Mappe schließt die übrigen.",
    "image": "unterstuetzung/B866.jpg",
    "max_copies": 1,
    "collector": "B866",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_handel_als_zug_871",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Handel als Zug",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 2 Karten, dann lege 1 Karte ab.",
    "effects": [],
    "flavor": "Kein bloßes Geschäft.",
    "image": "unterstuetzung/B871.jpg",
    "max_copies": 1,
    "collector": "B871",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_lage_eins_874",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Lage Eins",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle einen Abschnitt. Eigene Einheiten dort haben +2 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Offiziell. Nicht vollständig.",
    "image": "unterstuetzung/B874.jpg",
    "max_copies": 1,
    "collector": "B874",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_lage_zwei_875",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Lage Zwei",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle einen Abschnitt. Eigene Einheiten dort haben +2 ATK bis zum Ende des Zuges. Du legst 1 Karte ab.",
    "effects": [],
    "flavor": "Auch offiziell.",
    "image": "unterstuetzung/B875.jpg",
    "max_copies": 1,
    "collector": "B875",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schulunterricht_doppelt_878",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Schulunterricht doppelt",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 1 Karte. Wenn du danach ablegst: eine eigene Einheit hat +2 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Beide Lagen. Kein Befreier.",
    "image": "unterstuetzung/B878.jpg",
    "max_copies": 1,
    "collector": "B878",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_doppelstab_velis_883",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Doppelstab Velis",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle einen Abschnitt. Eigene Einheiten dort +1 ATK und +1 DEF. Gegner legt 1 Karte ab. Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Zwei Stäbe. Kein Herr.",
    "image": "unterstuetzung/B883.jpg",
    "max_copies": 1,
    "collector": "B883",
    "rarity": "silver"
  },
  {
    "id": "dc_b_falscher_schwerpunkt_885",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Falscher Schwerpunkt",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Am Ende deines Zuges: +1 DEF auf einen Abschnitt. Am Beginn deines nächsten Zuges darfst du stattdessen einer eigenen Einheit +2 ATK geben.",
    "effects": [],
    "flavor": "Verlagerung als Zug.",
    "image": "unterstuetzung/B885.jpg",
    "max_copies": 1,
    "collector": "B885",
    "rarity": "silver"
  },
  {
    "id": "dc_b_gegenseitige_kontrolle_889",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Gegenseitige Kontrolle",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 2 Karten. Gegner legt 1 Karte ab. Eine eigene Einheit +1 ATK und +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Familien, Ämter, Militär.",
    "image": "unterstuetzung/B889.jpg",
    "max_copies": 1,
    "collector": "B889",
    "rarity": "silver"
  },
  {
    "id": "dc_b_ivo_doppelzug_891",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Ivo-Doppelzug",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle zwei eigene Einheiten. Jede hat +1 ATK und +1 DEF. Du legst 1 Karte ab, dann ziehst 1.",
    "effects": [],
    "flavor": "Mit beiden arbeiten.",
    "image": "unterstuetzung/B891.jpg",
    "max_copies": 1,
    "collector": "B891",
    "rarity": "silver"
  },
  {
    "id": "dc_b_grosses_scheinfeld_895",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Großes Scheinfeld",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Am Ende deines Zuges: +2 DEF auf einen Abschnitt. Am Beginn deines nächsten Zuges darfst du stattdessen bis zu zwei eigene Einheiten +2 ATK geben. Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Schwerpunkt, der keiner bleiben muss.",
    "image": "unterstuetzung/B895.jpg",
    "max_copies": 1,
    "collector": "B895",
    "rarity": "gold"
  },
  {
    "id": "dc_b_offene_zeile_909",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Offene Zeile",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 1 Karte. Eine eigene Einheit hat +1 ATK bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Noch nicht getilgt.",
    "image": "unterstuetzung/B909.jpg",
    "max_copies": 1,
    "collector": "B909",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_hausblatt_910",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Hausblatt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle einen Abschnitt. Eigene Einheiten dort +1 DEF. Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Gegenrechnung, keine Halle.",
    "image": "unterstuetzung/B910.jpg",
    "max_copies": 1,
    "collector": "B910",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_stundung_916",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Stundung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Eine eigene Einheit hat +2 DEF bis zum Ende des Zuges. Du legst 1 Karte ab.",
    "effects": [],
    "flavor": "Frist als Zeile. Keine Gefälligkeit.",
    "image": "unterstuetzung/B916.jpg",
    "max_copies": 1,
    "collector": "B916",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_tausch_der_posten_917",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Tausch der Posten",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle zwei eigene Einheiten. Jede hat +1 ATK oder +1 DEF bis zum Ende des Zuges. Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Vor den anderen Namen.",
    "image": "unterstuetzung/B917.jpg",
    "max_copies": 1,
    "collector": "B917",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_staffelung_918",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Staffelung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle bis zu zwei Abschnitte. In jedem hat eine eigene Einheit +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Nicht alles an einem Morgen.",
    "image": "unterstuetzung/B918.jpg",
    "max_copies": 1,
    "collector": "B918",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_werkhaftung_920",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Werkhaftung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 1 Karte. Bis zum Ende des Zuges: eigene Einheiten haben +1 DEF.",
    "effects": [],
    "flavor": "Name an der Tür.",
    "image": "unterstuetzung/B920.jpg",
    "max_copies": 1,
    "collector": "B920",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nachbarhilfe_926",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Nachbarhilfe",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 1 Karte. Eine eigene Einheit hat +1 ATK und +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Datum merken. Nicht radieren.",
    "image": "unterstuetzung/B926.jpg",
    "max_copies": 1,
    "collector": "B926",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_hausblatt_mahr_931",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Hausblatt Mahr",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 2 Karten, dann lege 1 Karte ab.",
    "effects": [],
    "flavor": "Viele schulden. Kai bleibt.",
    "image": "unterstuetzung/B931.jpg",
    "max_copies": 1,
    "collector": "B931",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_eigene_posten_934",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Eigene Posten",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle einen Abschnitt. Eigene Einheiten dort +2 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Haus bleibt. Krieg wäscht nicht alles.",
    "image": "unterstuetzung/B934.jpg",
    "max_copies": 1,
    "collector": "B934",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schwere_zeile_935",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Schwere Zeile",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle einen Abschnitt. Eine eigene Einheit dort +2 ATK bis zum Ende des Zuges. Du legst 1 Karte ab.",
    "effects": [],
    "flavor": "Oft die Schwersten gehen.",
    "image": "unterstuetzung/B935.jpg",
    "max_copies": 1,
    "collector": "B935",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schule_der_daten_938",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Schule der Daten",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 1 Karte. Wenn du danach ablegst: eine eigene Einheit +2 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Unterschied üben.",
    "image": "unterstuetzung/B938.jpg",
    "max_copies": 1,
    "collector": "B938",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_halle_der_aenderung_943",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Halle der Änderung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle einen Abschnitt. Eigene Einheiten dort +1 ATK und +1 DEF. Ziehe 1 Karte. Gegner legt 1 Karte ab.",
    "effects": [],
    "flavor": "Vor den anderen Namen.",
    "image": "unterstuetzung/B943.jpg",
    "max_copies": 1,
    "collector": "B943",
    "rarity": "silver"
  },
  {
    "id": "dc_b_namen_waschen_945",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Namen waschen",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Zerstöre eine eigene Einheit: ziehe 2 Karten und eine andere eigene Einheit hat +2 ATK bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Versuchung im Recht.",
    "image": "unterstuetzung/B945.jpg",
    "max_copies": 1,
    "collector": "B945",
    "rarity": "silver"
  },
  {
    "id": "dc_b_vorlesen_und_abschrift_949",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Vorlesen und Abschrift",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Ziehe 2 Karten. Eine eigene Einheit +1 ATK und +1 DEF bis zum Ende des Zuges. Du legst 1 Karte ab.",
    "effects": [],
    "flavor": "Beides lesen.",
    "image": "unterstuetzung/B949.jpg",
    "max_copies": 1,
    "collector": "B949",
    "rarity": "silver"
  },
  {
    "id": "dc_b_zwei_pflichten_951",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Zwei Pflichten",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle zwei eigene Einheiten. Jede hat +1 ATK und +1 DEF. Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Früheres Datum gilt.",
    "image": "unterstuetzung/B951.jpg",
    "max_copies": 1,
    "collector": "B951",
    "rarity": "silver"
  },
  {
    "id": "dc_b_grosses_ziel_955",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Großes Ziel",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstützung"
    ],
    "text": "Wähle ein gegnerisches Ziel. Bis zum Ende deines nächsten Zuges: Angriffe gegen es haben +1 ATK. Der erste Schaden an ihm gibt der angreifenden Einheit +1 DEF. Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Ziel gewählt. Name fest.",
    "image": "unterstuetzung/B955.jpg",
    "max_copies": 1,
    "collector": "B955",
    "rarity": "gold"
  },
  {
    "id": "dc_b_durchbruchspunkt_387",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Durchbruchspunkt",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal pro Zug: eine eigene Infanterie +1 ATK; erleidet danach 1 Schaden.",
    "effects": [],
    "flavor": "Öffnung hat einen Preis.",
    "image": "unterstuetzung/B387.jpg",
    "max_copies": 1,
    "collector": "B387",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_implantatlager_388",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Implantatlager",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Eigene Ausrüstungen kosten 1 AP weniger (min. 1).",
    "effects": [],
    "flavor": "Teile vor Menschen.",
    "image": "unterstuetzung/B388.jpg",
    "max_copies": 1,
    "collector": "B388",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_weiterkaempfen_protokoll_389",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Weiterkämpfen-Protokoll",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal pro Zug: eine beschädigte eigene Einheit +1 ATK bis Zugende.",
    "effects": [],
    "flavor": "Nicht stehen. Nicht heilen. Weiter.",
    "image": "unterstuetzung/B389.jpg",
    "max_copies": 1,
    "collector": "B389",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_leistungsboard_390",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Leistungsboard",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Ziehe 1, wenn eine eigene Einheit in diesem Zug Schaden nimmt.",
    "effects": [],
    "flavor": "Die Tafel füllt sich mit Ausfällen.",
    "image": "unterstuetzung/B390.jpg",
    "max_copies": 1,
    "collector": "B390",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_sezierstation_391",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Sezierstation",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Wenn eigene Einheit zerstört wird: oberste Friedhofskarte unter dein Deck oder heile 1 an einer beschädigten Einheit.",
    "effects": [],
    "flavor": "Ausfallanalyse als Ritual.",
    "image": "unterstuetzung/B391.jpg",
    "max_copies": 1,
    "collector": "B391",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_filterwerk_392",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Filterwerk",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Eigene Infanterie hat +1 DEF gegen den ersten Angriff pro Zug.",
    "effects": [],
    "flavor": "Luft als Privileg.",
    "image": "unterstuetzung/B392.jpg",
    "max_copies": 1,
    "collector": "B392",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_prioritaetsmedizin_393",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Prioritätsmedizin",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal pro Zug: heile 2 DEF an einer Einheit mit ATK ≥3; eine andere eigene Einheit erleidet 1 Schaden.",
    "effects": [],
    "flavor": "Nutzen vor Nähe.",
    "image": "unterstuetzung/B393.jpg",
    "max_copies": 1,
    "collector": "B393",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_offene_front_394",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Offene Front",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Beschädigte eigene Einheiten haben +1 ATK.",
    "effects": [],
    "flavor": "Die Wunde ist der Motor.",
    "image": "unterstuetzung/B394.jpg",
    "max_copies": 1,
    "collector": "B394",
    "rarity": "silver"
  },
  {
    "id": "dc_b_stossleitung_395",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Stoßleitung",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal pro Zug: Angriffe eigener Einheiten in einem Abschnitt +1 ATK; eine Einheit dort erleidet 1 Schaden.",
    "effects": [],
    "flavor": "Leitung heiß. Körper heiß.",
    "image": "unterstuetzung/B395.jpg",
    "max_copies": 1,
    "collector": "B395",
    "rarity": "silver"
  },
  {
    "id": "dc_b_koerper_als_system_396",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Körper als System",
    "ap": 4,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal pro Zug: wähle eine eigene Einheit; +2 ATK bis Zugende und erleidet 2 Schaden.",
    "effects": [],
    "flavor": "Der Mensch ist die Munition.",
    "image": "unterstuetzung/B396.jpg",
    "max_copies": 1,
    "collector": "B396",
    "rarity": "gold"
  },
  {
    "id": "dc_b_sammelpunkt_111",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Sammelpunkt",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Infanterie in diesem Abschnitt kostet 1 weniger, mindestens 1.",
    "effects": [],
    "flavor": "Hier formiert sich die Pflicht.",
    "image": "unterstuetzung/B111.jpg",
    "max_copies": 1,
    "collector": "B111",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_feldprediger_112",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Feldprediger",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal pro Zug: eine eigene Infanterie in diesem Abschnitt hat +1 ATK bis Zugende.",
    "effects": [],
    "flavor": "Worte für die, die nicht eifern.",
    "image": "unterstuetzung/B112.jpg",
    "max_copies": 1,
    "collector": "B112",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_glaubensbanner_113",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Glaubensbanner",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Eigene Infanterie im Abschnitt hat +1 DEF.",
    "effects": [],
    "flavor": "Der Balken hält die Reihe.",
    "image": "unterstuetzung/B113.jpg",
    "max_copies": 1,
    "collector": "B113",
    "rarity": "silver"
  },
  {
    "id": "dc_b_zentralratsplan_114",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Zentralratsplan",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Ziehe 1 Karte. Wenn du in diesem Zug Infanterie spielst, ziehe 1 weitere.",
    "effects": [],
    "flavor": "Malen Voss liest nur das Maß.",
    "image": "unterstuetzung/B114.jpg",
    "max_copies": 1,
    "collector": "B114",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_werkhof_115",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Werkhof",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Heile eine eigene Einheit um 1. Infanterie erhält zusätzlich +1 DEF bis Zugende.",
    "effects": [],
    "flavor": "Reparatur ist auch Pflicht.",
    "image": "unterstuetzung/B115.jpg",
    "max_copies": 1,
    "collector": "B115",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_leises_nein_116",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Leises Nein",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Wähle eine eigene Einheit: sie erleidet diesen Zug keinen Schaden durch eigene Karteneffekte.",
    "effects": [],
    "flavor": "Elena Miren streitet die Zugabe ab.",
    "image": "unterstuetzung/B116.jpg",
    "max_copies": 1,
    "collector": "B116",
    "rarity": "silver"
  },
  {
    "id": "dc_b_ritusnennung_117",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Ritusnennung",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Wenn eine eigene Einheit zerstört wird: ziehe 1 Karte.",
    "effects": [],
    "flavor": "Der Name bleibt im Ritus.",
    "image": "unterstuetzung/B117.jpg",
    "max_copies": 1,
    "collector": "B117",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_genossenschaftslager_118",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Genossenschaftslager",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal pro Zug: eine Infanterie aus der Hand kostet 1 weniger (mind. 1).",
    "effects": [],
    "flavor": "Das Land ist die Reserve.",
    "image": "unterstuetzung/B118.jpg",
    "max_copies": 1,
    "collector": "B118",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_breite_front_119",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Breite Front",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Eigene Einheiten im Abschnitt haben +1 DEF, solange du mindestens 3 Einheiten dort hast.",
    "effects": [],
    "flavor": "Breite vor Tiefe.",
    "image": "unterstuetzung/B119.jpg",
    "max_copies": 1,
    "collector": "B119",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_heilige_ordnung_120",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Heilige Ordnung",
    "ap": 4,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Eigene Infanterie kostet in diesem Abschnitt 1 weniger (mind. 1).",
    "effects": [],
    "flavor": "Pflicht ohne Zugabe ist Staat.",
    "image": "unterstuetzung/B120.jpg",
    "max_copies": 1,
    "collector": "B120",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_feuerleitung_153",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Feuerleitung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Eigene Artillerie +1 ATK; mit Soforteinsatz +1 zusätzlich.",
    "effects": [],
    "flavor": "Wer misst, trifft härter.",
    "image": "unterstuetzung/B153.jpg",
    "max_copies": 1,
    "collector": "B153",
    "rarity": "silver"
  },
  {
    "id": "dc_b_auftragsring_154",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Auftragsring",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Wähle: ziehe 1 oder heile 1.",
    "effects": [],
    "flavor": "Der Ring sitzt fester als das Ministerium.",
    "image": "unterstuetzung/B154.jpg",
    "max_copies": 1,
    "collector": "B154",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schichtplan_155",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Schichtplan",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Nächste Einheit kostet 1 weniger.",
    "effects": [],
    "flavor": "Die Schicht ist schon eingeteilt.",
    "image": "unterstuetzung/B155.jpg",
    "max_copies": 1,
    "collector": "B155",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_bilanzrede_156",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Bilanzrede",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Gegner zeigt Handkarte; Einheit → deine nächste +1 ATK.",
    "effects": [],
    "flavor": "Zwei Wahrheiten — eine für die Straße.",
    "image": "unterstuetzung/B156.jpg",
    "max_copies": 1,
    "collector": "B156",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_werksanzeige_157",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Werksanzeige",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Eigene Artillerie angreift: heile 1 an Panzer.",
    "effects": [],
    "flavor": "Anzeige grün heißt: weiter verbrauchen.",
    "image": "unterstuetzung/B157.jpg",
    "max_copies": 1,
    "collector": "B157",
    "rarity": "silver"
  },
  {
    "id": "dc_b_puppenstaat_158",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Puppenstaat",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Negiere ersten Schaden gegen Unterstützung diesen Zug.",
    "effects": [],
    "flavor": "Der Staat hält die Begründung. Nicht die Stückzahl.",
    "image": "unterstuetzung/B158.jpg",
    "max_copies": 1,
    "collector": "B158",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_erzfall-bericht_159",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Erzfall-Bericht",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Bei 2+ Karten diesen Zug: ziehe 1.",
    "effects": [],
    "flavor": "Die Halde lügt nicht. Die Stadt schon.",
    "image": "unterstuetzung/B159.jpg",
    "max_copies": 1,
    "collector": "B159",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_dunkle_zeile_160",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Dunkle Zeile",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheit +2 DEF, kann diesen Zug nicht angreifen.",
    "effects": [],
    "flavor": "Schwarz im Buch, bevor die Begründung kommt.",
    "image": "unterstuetzung/B160.jpg",
    "max_copies": 1,
    "collector": "B160",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_quartalsende_161",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Quartalsende",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Zerstöre beschädigte eigene Einheit: ziehe 2, heile 1.",
    "effects": [],
    "flavor": "Abgeschrieben — nachgeliefert.",
    "image": "unterstuetzung/B161.jpg",
    "max_copies": 1,
    "collector": "B161",
    "rarity": "bronze"
  }
];
