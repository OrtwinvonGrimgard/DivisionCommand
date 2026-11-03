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
  },
  {
    "id": "dc_b_wegweiser_192",
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
      "unterstuetzung"
    ],
    "text": "Schieben im Abschnitt kostet 1 weniger.",
    "effects": [],
    "flavor": "Einheiten in diesem Abschnitt kosten 1 weniger zum Schieben.",
    "image": "unterstuetzung/B192.jpg",
    "max_copies": 1,
    "collector": "B192",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_feldkueche_193",
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
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: eigene Einheit heilt 1.",
    "effects": [],
    "flavor": "Im Kern voll. In der Ferne die letzte Ladung.",
    "image": "unterstuetzung/B193.jpg",
    "max_copies": 1,
    "collector": "B193",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_verbindungsstrasse_194",
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
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: schiebe eine eigene Einheit um 1 Slot.",
    "effects": [],
    "flavor": "Der Zusammenhalt sitzt nicht in der Nähe zu Fuß.",
    "image": "unterstuetzung/B194.jpg",
    "max_copies": 1,
    "collector": "B194",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_haltepunkt_195",
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
      "unterstuetzung"
    ],
    "text": "Einheiten +1 DEF, wenn keine andere Unterstützung im Abschnitt.",
    "effects": [],
    "flavor": "Halten ohne auszunehmen.",
    "image": "unterstuetzung/B195.jpg",
    "max_copies": 1,
    "collector": "B195",
    "rarity": "silver"
  },
  {
    "id": "dc_b_marschordnung_196",
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
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: eine geschobene Einheit +1 ATK.",
    "effects": [],
    "flavor": "Schieben und halten — nicht entlassen.",
    "image": "unterstuetzung/B196.jpg",
    "max_copies": 1,
    "collector": "B196",
    "rarity": "silver"
  },
  {
    "id": "dc_b_lizenzhof_197",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Lizenzhof",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Wähle: ziehe 1 oder heile 1.",
    "effects": [],
    "flavor": "Familien zählen Ladung und Verantwortung getrennt.",
    "image": "unterstuetzung/B197.jpg",
    "max_copies": 1,
    "collector": "B197",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_neuviertel_tisch_198",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Neuviertel-Tisch",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Negiere ersten Schaden gegen Unterstützung diesen Zug.",
    "effects": [],
    "flavor": "Leerer Platz am Tisch ist Entfernung, kein Ausland.",
    "image": "unterstuetzung/B198.jpg",
    "max_copies": 1,
    "collector": "B198",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_warteblatt_199",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Warteblatt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Bei 2+ Karten diesen Zug: ziehe 1.",
    "effects": [],
    "flavor": "Beschwerde geht denselben Weg wie die Stimme.",
    "image": "unterstuetzung/B199.jpg",
    "max_copies": 1,
    "collector": "B199",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nachschubader_200",
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
      "unterstuetzung"
    ],
    "text": "Einheiten, die diesen Zug geschoben werden, heilen 1.",
    "effects": [],
    "flavor": "Der Staat zahlt, wenn gefahren werden muss.",
    "image": "unterstuetzung/B200.jpg",
    "max_copies": 1,
    "collector": "B200",
    "rarity": "gold"
  },
  {
    "id": "dc_b_steinwall_231",
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
      "unterstuetzung"
    ],
    "text": "Einheiten +1 DEF gegen Einrückende.",
    "effects": [],
    "flavor": "Stein, nicht Sitz.",
    "image": "unterstuetzung/B231.jpg",
    "max_copies": 1,
    "collector": "B231",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_hangstellung_232",
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
      "unterstuetzung"
    ],
    "text": "Einrückende Feinde erleiden 1 Schaden.",
    "effects": [],
    "flavor": "Stellung in der Enge.",
    "image": "unterstuetzung/B232.jpg",
    "max_copies": 1,
    "collector": "B232",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_passsperre_233",
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
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: einrückende Einheit erleidet 1 Schaden.",
    "effects": [],
    "flavor": "Sperre ohne gemeinsamen Befehl.",
    "image": "unterstuetzung/B233.jpg",
    "max_copies": 1,
    "collector": "B233",
    "rarity": "silver"
  },
  {
    "id": "dc_b_verteilte_vorraete_234",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Verteilte Vorräte",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: eigene allein stehende Einheit heilt 1.",
    "effects": [],
    "flavor": "Vorräte im Tal. Kein gemeinsames Lager.",
    "image": "unterstuetzung/B234.jpg",
    "max_copies": 1,
    "collector": "B234",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_lesehof_235",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Lesehof",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Bei 2+ Abschnitten mit eigenen Einheiten: ziehe 1 einmal/Zug.",
    "effects": [],
    "flavor": "Getagt wird jedes Mal woanders.",
    "image": "unterstuetzung/B235.jpg",
    "max_copies": 1,
    "collector": "B235",
    "rarity": "silver"
  },
  {
    "id": "dc_b_tunnelnetz_236",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Tunnelnetz",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Schieben im Abschnitt kostet 1 weniger.",
    "effects": [],
    "flavor": "Leichte Geräte, die ein Tal selbst tragen kann.",
    "image": "unterstuetzung/B236.jpg",
    "max_copies": 1,
    "collector": "B236",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_eidkopie_237",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Eidkopie",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Negiere ersten Schaden gegen Unterstützung diesen Zug.",
    "effects": [],
    "flavor": "Dasselbe Recht an mehr als einem Ort.",
    "image": "unterstuetzung/B237.jpg",
    "max_copies": 1,
    "collector": "B237",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nachbarhilfe_238",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Nachbarhilfe",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten in benachbarten Abschnitten +1 DEF.",
    "effects": [],
    "flavor": "Hilfe bleibt Hilfe und wird nicht Besatzung.",
    "image": "unterstuetzung/B238.jpg",
    "max_copies": 1,
    "collector": "B238",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_passwache_239",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Passwache",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Infanterie im Abschnitt +1 ATK gegen Einrückende.",
    "effects": [],
    "flavor": "Die Stellung gehört trotzdem nur diesem Tal.",
    "image": "unterstuetzung/B239.jpg",
    "max_copies": 1,
    "collector": "B239",
    "rarity": "gold"
  },
  {
    "id": "dc_b_feldschmied_270",
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
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: Ausrüstung im Abschnitt kostet 1 weniger (min. 1).",
    "effects": [],
    "flavor": "Stück, Glas, Dichtung — nicht Heiligkeit.",
    "image": "unterstuetzung/B270.jpg",
    "max_copies": 1,
    "collector": "B270",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schmiedefeuer_271",
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
      "unterstuetzung"
    ],
    "text": "Einheiten mit Ausrüstung +1 DEF.",
    "effects": [],
    "flavor": "Ernst ohne Liturgie.",
    "image": "unterstuetzung/B271.jpg",
    "max_copies": 1,
    "collector": "B271",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_ahnentafel_272",
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
      "unterstuetzung"
    ],
    "text": "Stirbt eigene Einheit: Abschnitt +1 DEF bis Ende nächsten Zugs.",
    "effects": [],
    "flavor": "Name im Dienst. Nicht als Forderung.",
    "image": "unterstuetzung/B272.jpg",
    "max_copies": 1,
    "collector": "B272",
    "rarity": "silver"
  },
  {
    "id": "dc_b_namensliste_273",
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
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: eigene Einheit mit Ausrüstung +1 ATK.",
    "effects": [],
    "flavor": "Liste der Lebenden zuerst.",
    "image": "unterstuetzung/B273.jpg",
    "max_copies": 1,
    "collector": "B273",
    "rarity": "silver"
  },
  {
    "id": "dc_b_hof_der_namen_274",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Hof der Namen",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Negiere ersten Schaden an Unterstützung; Trauer: heile 1 bei Feindtötung.",
    "effects": [],
    "flavor": "Valeris setzt Zeichen. Nicht die Politik.",
    "image": "unterstuetzung/B274.jpg",
    "max_copies": 1,
    "collector": "B274",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_helles_amt_275",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Helles Amt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: ziehe 1 wenn du diesen Zug niemanden opferst (keine eigene Zerstörung).",
    "effects": [],
    "flavor": "Regierung ohne Maske.",
    "image": "unterstuetzung/B275.jpg",
    "max_copies": 1,
    "collector": "B275",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_bergungspunkt_276",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Bergungspunkt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Stirbt eigene oder Feind: heile 1 an Einheit im Abschnitt.",
    "effects": [],
    "flavor": "Zuerst bergen. Zuletzt das Zeichen.",
    "image": "unterstuetzung/B276.jpg",
    "max_copies": 1,
    "collector": "B276",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_werkvertrag_277",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Werkvertrag",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Ausrüstungen im Abschnitt: Träger +1 DEF.",
    "effects": [],
    "flavor": "Vertrag mit dem Amt. Kein Rohling der Truppe.",
    "image": "unterstuetzung/B277.jpg",
    "max_copies": 1,
    "collector": "B277",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_totenwall_278",
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
      "unterstuetzung"
    ],
    "text": "Stirbt Feind im Abschnitt: Abschnitt +1 ATK bis Zugende; übrige Abschnitte +1 DEF bis Ende nächsten Zugs.",
    "effects": [],
    "flavor": "Abnutzung als Deckung. Nicht als Hunger.",
    "image": "unterstuetzung/B278.jpg",
    "max_copies": 1,
    "collector": "B278",
    "rarity": "gold"
  },
  {
    "id": "dc_b_sanitaetszelt_330",
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
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: eigene Einheit im Abschnitt heilt 1.",
    "effects": [],
    "flavor": "Weiße Plane, ruhige Stimmen.",
    "image": "unterstuetzung/B330.jpg",
    "max_copies": 1,
    "collector": "B330",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_feldbaeckerei_331",
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
      "unterstuetzung"
    ],
    "text": "Ruhende Einheiten im Abschnitt +1 DEF.",
    "effects": [],
    "flavor": "Tellersatz vor dem Angriffssatz.",
    "image": "unterstuetzung/B331.jpg",
    "max_copies": 1,
    "collector": "B331",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_versorgungspunkt_332",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Versorgungspunkt",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: heile 1; nächste Einheit kostet 1 weniger.",
    "effects": [],
    "flavor": "Zuteilung hält die Front.",
    "image": "unterstuetzung/B332.jpg",
    "max_copies": 1,
    "collector": "B332",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_gesundheim_333",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Gesundheim",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten im Abschnitt heilen 1 am Zugende wenn sie nicht angriffen.",
    "effects": [],
    "flavor": "Klinik und Liste — dieselbe Tür.",
    "image": "unterstuetzung/B333.jpg",
    "max_copies": 1,
    "collector": "B333",
    "rarity": "silver"
  },
  {
    "id": "dc_b_wohnzuteilung_334",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Wohnzuteilung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Abschnitt +1 DEF; ruhende +1 ATK nächsten Zug.",
    "effects": [],
    "flavor": "Schlüssel und Akte aus einer Hand.",
    "image": "unterstuetzung/B334.jpg",
    "max_copies": 1,
    "collector": "B334",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_sicherheitsforum_335",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Sicherheitsforum",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Negiere ersten Schaden an Unterstützung; ziehe 1 bei Heilung.",
    "effects": [],
    "flavor": "Aufruhr und Mangel sind dieselbe dünne Stelle.",
    "image": "unterstuetzung/B335.jpg",
    "max_copies": 1,
    "collector": "B335",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_gemeinschaftskueche_336",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Gemeinschaftsküche",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Heile 1 an bis zu zwei ruhenden Einheiten.",
    "effects": [],
    "flavor": "Grünfeld meldet. Die Küche hält.",
    "image": "unterstuetzung/B336.jpg",
    "max_copies": 1,
    "collector": "B336",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_aktenlage_337",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Aktenlage",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: Einheit +1 DEF; wenn gemeldet (Aufklärung), +1 ATK.",
    "effects": [],
    "flavor": "Leistung gegen Zugriff.",
    "image": "unterstuetzung/B337.jpg",
    "max_copies": 1,
    "collector": "B337",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_vollstaendige_ruhe_338",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Vollständige Ruhe",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Alle eigenen Einheiten: diesen Zug nicht angreifen → +2 DEF und heile 1.",
    "effects": [],
    "flavor": "Rasten als Doktrin. Nicht als Faulheit.",
    "image": "unterstuetzung/B338.jpg",
    "max_copies": 1,
    "collector": "B338",
    "rarity": "gold"
  },
  {
    "id": "dc_b_laborzelt_450",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Laborzelt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: decke Feind im Abschnitt auf.",
    "effects": [],
    "flavor": "Zelt misst. Es unterschreibt nicht.",
    "image": "unterstuetzung/B450.jpg",
    "max_copies": 1,
    "collector": "B450",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_institutsguertel_451",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Institutsgürtel",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Aufklärung kostet 1 weniger (min. 1).",
    "effects": [],
    "flavor": "Gürtel der Institute — neben dem Saal.",
    "image": "unterstuetzung/B451.jpg",
    "max_copies": 1,
    "collector": "B451",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_saal_der_unterschrift_452",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Saal der Unterschrift",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: eigene Einheit +1 ATK gegen aufgeklärte ODER brich Angriff ab → heile 1.",
    "effects": [],
    "flavor": "Unterschrift sichtbar. Nicht hinter der Zahl.",
    "image": "unterstuetzung/B452.jpg",
    "max_copies": 1,
    "collector": "B452",
    "rarity": "silver"
  },
  {
    "id": "dc_b_kliniktief_453",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Kliniktief",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Heile 1; keine Rangsortierung — alle Einheiten im Abschnitt +1 DEF.",
    "effects": [],
    "flavor": "Behandelt. Bewertet Leben nicht.",
    "image": "unterstuetzung/B453.jpg",
    "max_copies": 1,
    "collector": "B453",
    "rarity": "silver"
  },
  {
    "id": "dc_b_methodenblatt_454",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Methodenblatt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Ziehe 1 wenn du aufdeckst; Gerücht (kein Aufdecken): Feind −1 ATK.",
    "effects": [],
    "flavor": "Ergebnis ohne Verfahren ist Gerücht.",
    "image": "unterstuetzung/B454.jpg",
    "max_copies": 1,
    "collector": "B454",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zahlenhof_455",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Zahlenhof",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Zwei Wahrheiten: ziehe 1 und decke 1 auf ODER heile 1.",
    "effects": [],
    "flavor": "Hof zählt zweimal — und sagt warum.",
    "image": "unterstuetzung/B455.jpg",
    "max_copies": 1,
    "collector": "B455",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_messau_bank_456",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Messau-Bank",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Sensorik: einmal/Zug decke oberste Karte des Gegners auf (Hand/Deck-Top).",
    "effects": [],
    "flavor": "Gerät ohne Herrschaft.",
    "image": "unterstuetzung/B456.jpg",
    "max_copies": 1,
    "collector": "B456",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_probennetz_457",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Probennetz",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Feinde im Abschnitt gelten als aufgeklärt, solange Netz liegt.",
    "effects": [],
    "flavor": "Netz der Proben. Kein Netz des Werts.",
    "image": "unterstuetzung/B457.jpg",
    "max_copies": 1,
    "collector": "B457",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_abbruchregel_458",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Abbruchregel",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Negiere eigenen Angriffsbonus; ziehe 2 und heile 1.",
    "effects": [],
    "flavor": "Abbruch ist Lehre. Nicht Schwäche.",
    "image": "unterstuetzung/B458.jpg",
    "max_copies": 1,
    "collector": "B458",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_hafenlieferung_510",
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
      "unterstuetzung"
    ],
    "text": "Einheiten in diesem Abschnitt kosten 1 weniger (min. 1).",
    "effects": [],
    "flavor": "Lieferung vor Meinung.",
    "image": "unterstuetzung/B510.jpg",
    "max_copies": 1,
    "collector": "B510",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nachschubboot_511",
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
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: ziehe 1, wenn im Abschnitt eine Unterstützung liegt.",
    "effects": [],
    "flavor": "Boot trägt. Es hält keine Stellung.",
    "image": "unterstuetzung/B511.jpg",
    "max_copies": 1,
    "collector": "B511",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_versorgungsschiff_512",
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
      "unterstuetzung"
    ],
    "text": "Einheiten, die diesen Zug hier gespielt werden, +1 ATK.",
    "effects": [],
    "flavor": "Schiff ist Weg. Nicht Einheit.",
    "image": "unterstuetzung/B512.jpg",
    "max_copies": 1,
    "collector": "B512",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nachschubader_513",
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
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: Einheit hier gespielt kostet 1 weniger (min. 1).",
    "effects": [],
    "flavor": "Ader zwischen den Kais.",
    "image": "unterstuetzung/B513.jpg",
    "max_copies": 1,
    "collector": "B513",
    "rarity": "silver"
  },
  {
    "id": "dc_b_volle_front_lager_514",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Volle Front-Lager",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten im Abschnitt +1 ATK, wenn Unterstützung liegt.",
    "effects": [],
    "flavor": "Lager der vollen Front.",
    "image": "unterstuetzung/B514.jpg",
    "max_copies": 1,
    "collector": "B514",
    "rarity": "silver"
  },
  {
    "id": "dc_b_offener_kai_515",
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
      "unterstuetzung"
    ],
    "text": "Einheiten hier kosten 1 weniger und +1 ATK im Zug, in dem sie gespielt werden.",
    "effects": [],
    "flavor": "Offener Kai — Bund, kein Hof.",
    "image": "unterstuetzung/B515.jpg",
    "max_copies": 1,
    "collector": "B515",
    "rarity": "gold"
  },
  {
    "id": "dc_b_solkai_werft_516",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Solkai-Werft",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: heile 1 an Einheit, die diesen Zug gerückt ist.",
    "effects": [],
    "flavor": "Werft repariert Achsen. Keine Sterne.",
    "image": "unterstuetzung/B516.jpg",
    "max_copies": 1,
    "collector": "B516",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_maris_halle_517",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Maris-Halle",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Wenn Entsatz diesen Zug: ziehe 1.",
    "effects": [],
    "flavor": "Halle spricht. Sie setzt den Marktpreis nicht.",
    "image": "unterstuetzung/B517.jpg",
    "max_copies": 1,
    "collector": "B517",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_bahnstadt_lager_518",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Bahnstadt-Lager",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten, die in zuletzt angegriffene Abschnitte rücken, +1 DEF.",
    "effects": [],
    "flavor": "Fahrplan wird Stellung.",
    "image": "unterstuetzung/B518.jpg",
    "max_copies": 1,
    "collector": "B518",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_feuerplanstelle_570",
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
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: wähle Feind hier — gilt als beobachtet.",
    "effects": [],
    "flavor": "Drei Schlüssel. Eine Karte.",
    "image": "unterstuetzung/B570.jpg",
    "max_copies": 1,
    "collector": "B570",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_stabskarte_571",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Stabskarte",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: decke 1 auf.",
    "effects": [],
    "flavor": "Karte ohne Denkmal.",
    "image": "unterstuetzung/B571.jpg",
    "max_copies": 1,
    "collector": "B571",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_depotfreigabe_572",
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
      "unterstuetzung"
    ],
    "text": "Einheiten, die diesen Zug hier gespielt werden, kosten 1 weniger (min. 1).",
    "effects": [],
    "flavor": "Freigabe vor Wagen.",
    "image": "unterstuetzung/B572.jpg",
    "max_copies": 1,
    "collector": "B572",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_feuerleitblatt_573",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Feuerleitblatt",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 ATK gegen beobachtete.",
    "effects": [],
    "flavor": "Leitblatt teilen.",
    "image": "unterstuetzung/B573.jpg",
    "max_copies": 1,
    "collector": "B573",
    "rarity": "silver"
  },
  {
    "id": "dc_b_kommissionsdepot_574",
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
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: Einheit hier gespielt kostet 1 weniger (min. 1); ziehe 1.",
    "effects": [],
    "flavor": "Depot der Kommission.",
    "image": "unterstuetzung/B574.jpg",
    "max_copies": 1,
    "collector": "B574",
    "rarity": "silver"
  },
  {
    "id": "dc_b_grossfeuerplan_575",
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
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: markiere bis zu 2 Feinde als beobachtet; Einheiten hier +1 ATK gegen sie.",
    "effects": [],
    "flavor": "Plan vor Schuss. Nicht danach.",
    "image": "unterstuetzung/B575.jpg",
    "max_copies": 1,
    "collector": "B575",
    "rarity": "gold"
  },
  {
    "id": "dc_b_lagerordnung_576",
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
      "unterstuetzung"
    ],
    "text": "Einheiten im Abschnitt +1 DEF.",
    "effects": [],
    "flavor": "Ordnung vor Marsch.",
    "image": "unterstuetzung/B576.jpg",
    "max_copies": 1,
    "collector": "B576",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_lagebericht_577",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Lagebericht",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Wenn du diesen Zug aufgedeckt hast: ziehe 1.",
    "effects": [],
    "flavor": "Bericht neben dem Amtsblatt.",
    "image": "unterstuetzung/B577.jpg",
    "max_copies": 1,
    "collector": "B577",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_landesfreigabe_578",
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
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 ATK im Zug, in dem Freigabe-/Sofort gespielt wurde.",
    "effects": [],
    "flavor": "Land gibt Straße — oder nicht.",
    "image": "unterstuetzung/B578.jpg",
    "max_copies": 1,
    "collector": "B578",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_linienknoten_690",
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
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 DEF, wenn mindestens zwei Einheiten im Abschnitt.",
    "effects": [],
    "flavor": "Knoten offen. Linie hält.",
    "image": "unterstuetzung/B690.jpg",
    "max_copies": 1,
    "collector": "B690",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_vorratshalle_691",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Vorratshalle",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: ziehe 1, wenn du diesen Zug eine Einheit gespielt hast.",
    "effects": [],
    "flavor": "Halle voll — und sie leert sich.",
    "image": "unterstuetzung/B691.jpg",
    "max_copies": 1,
    "collector": "B691",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_umschlagplatz_692",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Umschlagplatz",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten, die diesen Zug hier gespielt werden, kosten 1 weniger (min. 1).",
    "effects": [],
    "flavor": "Umschlag vor Stellung.",
    "image": "unterstuetzung/B692.jpg",
    "max_copies": 1,
    "collector": "B692",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_vertragsnetz_693",
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
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 ATK; einmal/Zug: bewege 1 Einheit 1 Abschnitt.",
    "effects": [],
    "flavor": "Netz der Städte. Kein Thron.",
    "image": "unterstuetzung/B693.jpg",
    "max_copies": 1,
    "collector": "B693",
    "rarity": "silver"
  },
  {
    "id": "dc_b_umschlagzentrale_694",
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
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: Einheit hier gespielt kostet 1 weniger (min. 1); ziehe 1.",
    "effects": [],
    "flavor": "Zentrale in Sarun — höflich, laut.",
    "image": "unterstuetzung/B694.jpg",
    "max_copies": 1,
    "collector": "B694",
    "rarity": "silver"
  },
  {
    "id": "dc_b_handelsfront_695",
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
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: bis zu 2 Einheiten dürfen je 1 Abschnitt bewegen; sie +1 ATK diesen Zug.",
    "effects": [],
    "flavor": "Front ist der Weg. Nicht die Fahne.",
    "image": "unterstuetzung/B695.jpg",
    "max_copies": 1,
    "collector": "B695",
    "rarity": "gold"
  },
  {
    "id": "dc_b_doppelkolonne_696",
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
      "unterstuetzung"
    ],
    "text": "Einheiten im Abschnitt +1 DEF.",
    "effects": [],
    "flavor": "Zwei Kolonnen nebeneinander.",
    "image": "unterstuetzung/B696.jpg",
    "max_copies": 1,
    "collector": "B696",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_wasserstelle_697",
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
      "unterstuetzung"
    ],
    "text": "Wenn du diesen Zug bewegt hast: ziehe 1.",
    "effects": [],
    "flavor": "Wasser für den, der fährt.",
    "image": "unterstuetzung/B697.jpg",
    "max_copies": 1,
    "collector": "B697",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_meilenstein_698",
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
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 ATK im Zug, in dem Sofort gespielt wurde.",
    "effects": [],
    "flavor": "Stein zählt Strecke, nicht Sieg.",
    "image": "unterstuetzung/B698.jpg",
    "max_copies": 1,
    "collector": "B698",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_doppelhaus_750",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Doppelhaus",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 DEF, wenn mindestens zwei Einheiten im Abschnitt.",
    "effects": [],
    "flavor": "Berg und Gasse. Beide echt.",
    "image": "unterstuetzung/B750.jpg",
    "max_copies": 1,
    "collector": "B750",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zeughaus_brueckenau_751",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Zeughaus Brückenau",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: ziehe 1, wenn du diesen Zug eine Einheit gespielt hast.",
    "effects": [],
    "flavor": "Zeughaus pflegt Gerät, nicht Siege.",
    "image": "unterstuetzung/B751.jpg",
    "max_copies": 1,
    "collector": "B751",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_parlamentsgasse_752",
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
      "unterstuetzung"
    ],
    "text": "Einheiten, die diesen Zug hier gespielt werden, kosten 1 weniger (min. 1).",
    "effects": [],
    "flavor": "Gasse bremst. Berg führt.",
    "image": "unterstuetzung/B752.jpg",
    "max_copies": 1,
    "collector": "B752",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_bindungstag_753",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Bindungstag",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 ATK/+1 DEF; einmal/Zug: heile 1.",
    "effects": [],
    "flavor": "Bindung gehalten — morgens beide Häuser.",
    "image": "unterstuetzung/B753.jpg",
    "max_copies": 1,
    "collector": "B753",
    "rarity": "silver"
  },
  {
    "id": "dc_b_stille_aemter_754",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Stille Ämter",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: ziehe 1; nächste Sofort kostet 1 weniger (min. 0).",
    "effects": [],
    "flavor": "Akten vor Trinkspruch.",
    "image": "unterstuetzung/B754.jpg",
    "max_copies": 1,
    "collector": "B754",
    "rarity": "silver"
  },
  {
    "id": "dc_b_dauerstellung_755",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Dauerstellung",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 ATK/+1 DEF; einmal/Zug: negiere 1 Schaden an einer Einheit hier.",
    "effects": [],
    "flavor": "Stellung bleibt. Name bleibt.",
    "image": "unterstuetzung/B755.jpg",
    "max_copies": 1,
    "collector": "B755",
    "rarity": "gold"
  },
  {
    "id": "dc_b_kronland_hof_756",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Kronland-Hof",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten im Abschnitt +1 DEF.",
    "effects": [],
    "flavor": "Hof im Kronland — Staat behält Namen.",
    "image": "unterstuetzung/B756.jpg",
    "max_copies": 1,
    "collector": "B756",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_flusshof_757",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Flusshof",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Wenn du diesen Zug Sofort spielst: ziehe 1.",
    "effects": [],
    "flavor": "Hof liefert. Keine eigene Front.",
    "image": "unterstuetzung/B757.jpg",
    "max_copies": 1,
    "collector": "B757",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_lichthofen_758",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Lichthofen",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 ATK im Zug ohne Bewegung.",
    "effects": [],
    "flavor": "Schule lehrt Dauer, nicht Feldzug.",
    "image": "unterstuetzung/B758.jpg",
    "max_copies": 1,
    "collector": "B758",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_knotenhalle_810",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Knotenhalle",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 ATK gegen aufgeklärte Feinde.",
    "effects": [],
    "flavor": "Halle sieht. Ersetzt das Raster nicht.",
    "image": "unterstuetzung/B810.jpg",
    "max_copies": 1,
    "collector": "B810",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_parlamentsraster_811",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Parlamentsraster",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: ziehe 1, wenn du diesen Zug eine Einheit gespielt hast.",
    "effects": [],
    "flavor": "Raster neben der Halle. Mandat zählt.",
    "image": "unterstuetzung/B811.jpg",
    "max_copies": 1,
    "collector": "B811",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_werkhoefe_novaris_812",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Werkhöfe Novaris",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten, die diesen Zug hier gespielt werden, kosten 1 weniger (min. 1).",
    "effects": [],
    "flavor": "Werkhof: Gerät das man auseinandernehmen kann.",
    "image": "unterstuetzung/B812.jpg",
    "max_copies": 1,
    "collector": "B812",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nordfall_uebung_813",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Nordfall-Übung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 DEF; einmal/Zug: decke 1 auf ODER ziehe 1.",
    "effects": [],
    "flavor": "Übung schaltet ab. Keine heimliche Leitung.",
    "image": "unterstuetzung/B813.jpg",
    "max_copies": 1,
    "collector": "B813",
    "rarity": "silver"
  },
  {
    "id": "dc_b_lage_offen_desk_814",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Lage Offen Desk",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: ziehe 1; nächste Sofort kostet 1 weniger (min. 0).",
    "effects": [],
    "flavor": "Korrektur laut. Kontrolle gehört dazu.",
    "image": "unterstuetzung/B814.jpg",
    "max_copies": 1,
    "collector": "B814",
    "rarity": "silver"
  },
  {
    "id": "dc_b_verbindungsnetz_815",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Verbindungsnetz",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 ATK/+1 DEF; einmal/Zug: decke 1 auf.",
    "effects": [],
    "flavor": "Verbindung unter politischem Mandat.",
    "image": "unterstuetzung/B815.jpg",
    "max_copies": 1,
    "collector": "B815",
    "rarity": "gold"
  },
  {
    "id": "dc_b_westhaven_lager_816",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Westhaven-Lager",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten im Abschnitt +1 DEF.",
    "effects": [],
    "flavor": "Lager versorgt. Eröffnet keine Front zur See.",
    "image": "unterstuetzung/B816.jpg",
    "max_copies": 1,
    "collector": "B816",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_lydon_werk_817",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Lydon-Werk",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Wenn du diesen Zug Sofort spielst: ziehe 1.",
    "effects": [],
    "flavor": "Ohne Lydon wird die Halle dunkel.",
    "image": "unterstuetzung/B817.jpg",
    "max_copies": 1,
    "collector": "B817",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_arven_widerspruch_818",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Arven-Widerspruch",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 ATK im Zug nach Aufdecken.",
    "effects": [],
    "flavor": "Südland widerspricht der Hauptstadt.",
    "image": "unterstuetzung/B818.jpg",
    "max_copies": 1,
    "collector": "B818",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_velis_front_870",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Velis-Front",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 DEF, wenn mindestens zwei Einheiten im Abschnitt.",
    "effects": [],
    "flavor": "Graue Front. Hinterraum deckt.",
    "image": "unterstuetzung/B870.jpg",
    "max_copies": 1,
    "collector": "B870",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_archive_871",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Archive",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: ziehe 1, wenn du diesen Zug eine Einheit gespielt hast.",
    "effects": [],
    "flavor": "Archive dichter als jede Tribüne.",
    "image": "unterstuetzung/B871.jpg",
    "max_copies": 1,
    "collector": "B871",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_siegelstadt_872",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Siegelstadt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten, die diesen Zug hier gespielt werden, kosten 1 weniger (min. 1).",
    "effects": [],
    "flavor": "Regal schieben ist ein Zug.",
    "image": "unterstuetzung/B872.jpg",
    "max_copies": 1,
    "collector": "B872",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_stillheim_873",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Stillheim",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 DEF; einmal/Zug: heile 1.",
    "effects": [],
    "flavor": "Preis gepflegt. Keine Front.",
    "image": "unterstuetzung/B873.jpg",
    "max_copies": 1,
    "collector": "B873",
    "rarity": "silver"
  },
  {
    "id": "dc_b_aemterlande_874",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Ämterlande",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: ziehe 1; nächste Sofort kostet 1 weniger (min. 0).",
    "effects": [],
    "flavor": "Ämter lesen einander.",
    "image": "unterstuetzung/B874.jpg",
    "max_copies": 1,
    "collector": "B874",
    "rarity": "silver"
  },
  {
    "id": "dc_b_lagebrett_875",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Lagebrett",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 ATK/+1 DEF; einmal/Zug: negiere 1 Schaden an einer Einheit hier.",
    "effects": [],
    "flavor": "Brett für gesetzte Lagen. Kein Thron.",
    "image": "unterstuetzung/B875.jpg",
    "max_copies": 1,
    "collector": "B875",
    "rarity": "gold"
  },
  {
    "id": "dc_b_marktvel_876",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Marktvel",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten im Abschnitt +1 DEF.",
    "effects": [],
    "flavor": "Ruf angreifen ist Spielen.",
    "image": "unterstuetzung/B876.jpg",
    "max_copies": 1,
    "collector": "B876",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_siegelwerk_877",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Siegelwerk",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Wenn du diesen Zug Sofort spielst: ziehe 1.",
    "effects": [],
    "flavor": "Gerät für den nächsten Zug.",
    "image": "unterstuetzung/B877.jpg",
    "max_copies": 1,
    "collector": "B877",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_hinterraum_878",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Hinterraum",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 ATK im Zug ohne Bewegung.",
    "effects": [],
    "flavor": "Raum ohne Karte. Trotzdem echt.",
    "image": "unterstuetzung/B878.jpg",
    "max_copies": 1,
    "collector": "B878",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_halle_kalden_930",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Halle Kalden",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 DEF, wenn mindestens zwei Einheiten im Abschnitt.",
    "effects": [],
    "flavor": "Einzige Änderung. Vor den Namen.",
    "image": "unterstuetzung/B930.jpg",
    "max_copies": 1,
    "collector": "B930",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_abschrift_931",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Abschrift",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: ziehe 1, wenn du diesen Zug eine Einheit gespielt hast.",
    "effects": [],
    "flavor": "Abschrift gegen Vorlesung.",
    "image": "unterstuetzung/B931.jpg",
    "max_copies": 1,
    "collector": "B931",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_vorlesehof_932",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Vorlesehof",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten, die diesen Zug hier gespielt werden, kosten 1 weniger (min. 1).",
    "effects": [],
    "flavor": "Laut gesagt. Gültig.",
    "image": "unterstuetzung/B932.jpg",
    "max_copies": 1,
    "collector": "B932",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_herberge_kalden_933",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Herberge Kalden",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 DEF; einmal/Zug: heile 1.",
    "effects": [],
    "flavor": "Herberge zur Eintragung.",
    "image": "unterstuetzung/B933.jpg",
    "max_copies": 1,
    "collector": "B933",
    "rarity": "silver"
  },
  {
    "id": "dc_b_markt_mahr_934",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Markt Mahr",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einmal/Zug: ziehe 1; nächste Sofort kostet 1 weniger (min. 0).",
    "effects": [],
    "flavor": "Mahr fordert. Wird nicht Halle.",
    "image": "unterstuetzung/B934.jpg",
    "max_copies": 1,
    "collector": "B934",
    "rarity": "silver"
  },
  {
    "id": "dc_b_schuldblatt_935",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Schuldblatt",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 ATK/+1 DEF; einmal/Zug: negiere 1 Schaden an einer Einheit hier.",
    "effects": [],
    "flavor": "Blatt der offenen Posten. Kein Thron.",
    "image": "unterstuetzung/B935.jpg",
    "max_copies": 1,
    "collector": "B935",
    "rarity": "gold"
  },
  {
    "id": "dc_b_kai_brunn_936",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Kai Brunn",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten im Abschnitt +1 DEF.",
    "effects": [],
    "flavor": "Kai unter Hausnamen.",
    "image": "unterstuetzung/B936.jpg",
    "max_copies": 1,
    "collector": "B936",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_lehrbach_937",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Lehrbach",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Wenn du diesen Zug Sofort spielst: ziehe 1.",
    "effects": [],
    "flavor": "Lehre endet. Neue Zeile.",
    "image": "unterstuetzung/B937.jpg",
    "max_copies": 1,
    "collector": "B937",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_namenhof_938",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Unterstützung",
    "klasse": "Unterstützung",
    "name": "Namenhof",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "unterstuetzung"
    ],
    "text": "Einheiten hier +1 ATK im Zug ohne Bewegung.",
    "effects": [],
    "flavor": "Hof mit Schild. Datum bleibt.",
    "image": "unterstuetzung/B938.jpg",
    "max_copies": 1,
    "collector": "B938",
    "rarity": "bronze"
  }
];
