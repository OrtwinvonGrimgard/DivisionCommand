window.DC_SET_NATIONS = window.DC_SET_NATIONS || {};
window.DC_SET_NATIONS["Rothain"] = [
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Stoßtrupp",
    "ap": 2,
    "atk": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Überfall: +1 Schaden wenn diese Einheit den Erstschlag führt.",
    "effects": [
      {
        "code": "AMBUSH"
      }
    ],
    "flavor": "Die erste Welle zahlt.",
    "max_copies": 4,
    "def": 2,
    "id": "dc_n_eh_stosstrupp",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A224.jpg",
    "collector": "A224"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Durchbruchpionier",
    "ap": 2,
    "atk": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Niederhalten: getroffene feindliche Infanterie darf im nächsten Zug nicht angreifen.",
    "effects": [
      {
        "code": "NIEDERHALTEN"
      }
    ],
    "flavor": "Wege freisprengen.",
    "max_copies": 4,
    "def": 3,
    "id": "dc_n_eh_durchbruchpionier",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A225.jpg",
    "collector": "A225"
  },
  {
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Sturmhaubitze",
    "ap": 3,
    "atk": 5,
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
    "flavor": "Vor dem Angriff die Erde öffnen.",
    "max_copies": 4,
    "def": 3,
    "id": "dc_n_eh_sturmhaubitze",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A226.jpg",
    "collector": "A226"
  },
  {
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Rammbock",
    "ap": 3,
    "atk": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "gepanzert"
    ],
    "text": "Feuerüberlegenheit: +1 Schaden gegen ungepanzerte Einheiten.",
    "effects": [
      {
        "code": "FEUERUEBERLEGENHEIT"
      }
    ],
    "flavor": "Geradeaus ist eine Doktrin.",
    "max_copies": 4,
    "def": 4,
    "id": "dc_n_eh_rammbock",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A227.jpg",
    "collector": "A227"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Durchbruchstab",
    "ap": 3,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "fuehrung"
    ],
    "text": "Eigene Front +1 A. Feuerkommando (2 AP): 3 Schaden an feindlicher Fronteinheit.",
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
    "flavor": "Schwerpunkt heißt hier.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_durchbruchstab",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A228.jpg",
    "collector": "A228"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Munitionsstaffel",
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
    "flavor": "Ohne Nachschub kein Barrage.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_munitionsstaffel",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A229.jpg",
    "collector": "A229"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Sperrfeuer dicht",
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
    "flavor": "Den Himmel schwarz machen.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_sperrfeuer_dicht",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A230.jpg",
    "collector": "A230"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Schwerpunktbefehl",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz"
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
    "flavor": "Alles auf einen Punkt.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_schwerpunktbefehl",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A231.jpg",
    "collector": "A231"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Nachdrücken",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz"
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
    "flavor": "Wer stoppt, verliert das Loch.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_nachdrucken",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A232.jpg",
    "collector": "A232"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Sprengsatz leicht",
    "ap": 2,
    "atk": null,
    "tags": [
      "ausruestung"
    ],
    "text": "An Infanterie. Träger +2 A / +0 V.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 0,
          "only": "infanterie"
        }
      }
    ],
    "flavor": "Türen sind Vorschläge.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_eq_sprengsatz_leicht",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A233.jpg",
    "collector": "A233"
  },
  {
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Sturmpanzer",
    "ap": 4,
    "atk": 5,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "gepanzert"
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
    "flavor": "Durch die Wand.",
    "max_copies": 2,
    "def": 5,
    "id": "dc_n_eh_sturmpanzer",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A234.jpg",
    "collector": "A234"
  },
  {
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Barragebatterie",
    "ap": 4,
    "atk": 6,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "artillerie",
      "fahrzeug"
    ],
    "text": "Greift die gesamte feindliche Front an. Nach dem Angriff verdeckt.",
    "effects": [
      {
        "code": "ATTACK_ANY_FRONT"
      },
      {
        "code": "RELOCATE_HIDE"
      }
    ],
    "flavor": "Eine Walze aus Eisen.",
    "max_copies": 2,
    "def": 4,
    "id": "dc_n_eh_barragebatterie",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A235.jpg",
    "collector": "A235"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Feuerwalzenleitung",
    "ap": 4,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "artillerie"
    ],
    "text": "Eigene Front +1 A. Feuerkommando (2 AP): 4 Schaden.",
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
    "flavor": "Rhythmus vor Präzision.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_feuerwalzenleitung",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A236.jpg",
    "collector": "A236"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Pionierpark",
    "ap": 3,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "logistik"
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
    "flavor": "Werkzeug für Löcher.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_pionierpark",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A237.jpg",
    "collector": "A237"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Trommelfeuer",
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
    "flavor": "Nicht zielen – hämmern.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_trommelfeuer",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A238.jpg",
    "collector": "A238"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Bresche",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Gewählte Einheit bricht sofort ab und handelt erst wieder im nächsten Zug ihres Besitzers.",
    "effects": [
      {
        "code": "PAUSE_UNIT"
      }
    ],
    "flavor": "Die Linie reißen.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_bresche",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A239.jpg",
    "collector": "A239"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Durchbruchsladung",
    "ap": 3,
    "atk": null,
    "tags": [
      "ausruestung"
    ],
    "text": "An Panzer oder Infanterie. Träger +2 A / +1 V.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 1
        }
      }
    ],
    "flavor": "Einmalig und laut.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_eq_durchbruchsladung",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A240.jpg",
    "collector": "A240"
  },
  {
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Durchbruchdivision",
    "ap": 5,
    "atk": 7,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "elite",
      "gepanzert"
    ],
    "text": "Ignoriert 2 V gegen Gepanzerte. Feuerüberlegenheit gegen Ungepanzerte.",
    "effects": [
      {
        "code": "IGNORE_DEF",
        "param": {
          "ignore_def": 2
        }
      },
      {
        "code": "FEUERUEBERLEGENHEIT"
      }
    ],
    "flavor": "Was hält, wird überrollt.",
    "max_copies": 1,
    "def": 6,
    "id": "dc_n_eh_durchbruchdivision",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A241.jpg",
    "collector": "A241"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Elite-Stoß",
    "ap": 4,
    "atk": 5,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "elite"
    ],
    "text": "Wenn eine eigene Fronteinheit stirbt: kostenlos in denselben Slot. Überfall +1.",
    "effects": [
      {
        "code": "BREACH_JUMP"
      },
      {
        "code": "AMBUSH"
      }
    ],
    "flavor": "Die Lücke bleibt nicht leer.",
    "max_copies": 1,
    "def": 4,
    "id": "dc_n_eh_elite_stoss",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A242.jpg",
    "collector": "A242"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Hauptfeuerleitung",
    "ap": 5,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "elite",
      "artillerie"
    ],
    "text": "Koordination (1 AP): Front greift erneut. Feuerkommando (2 AP): 4 Schaden.",
    "effects": [
      {
        "code": "REATTACK",
        "param": {
          "ap": 1
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
    "flavor": "Ein Plan, viele Rohre.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_un_hauptfeuerleitung",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A243.jpg",
    "collector": "A243"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Vernichtungsbarrage",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "elite",
      "artillerie"
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
    "flavor": "Danach ist Stille Pflicht.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_vernichtungsbarrage",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A244.jpg",
    "collector": "A244"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Alles vor!",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "elite"
    ],
    "text": "Spiele so viele Fronteinheiten von der Hand wie du möchtest, ohne AP-Kosten.",
    "effects": [
      {
        "code": "MASS_DEPLOY"
      }
    ],
    "flavor": "Der Durchbruch frisst Reserven.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_alles_vor",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A245.jpg",
    "collector": "A245"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Kampfbefehl-Modul",
    "ap": 4,
    "atk": null,
    "tags": [
      "ausruestung",
      "elite"
    ],
    "text": "An Panzer. Träger +2 A / +2 V.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 2
        }
      }
    ],
    "flavor": "Führen heißt vorangehen.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_eq_kampfbefehl_modul",
    "set": "set_nations",
    "status": "live",
    "image": "nations/rothain/A246.jpg",
    "collector": "A246"
  }
,
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Stoßtrupp",
  "ap": 1,
  "atk": 2,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Stoßtrupp: Schwerpunkt, Durchbruch, Feuerwalze.",
  "effects": [],
  "flavor": "Typisch für Rothain.",
  "max_copies": 4,
  "id": "dc_n_ei_stoßtrupp_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A487.jpg",
  "collector": "A487"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Durchbruchspanzer",
  "ap": 2,
  "atk": 3,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Durchbruchspanzer: Schwerpunkt, Durchbruch, Feuerwalze.",
  "effects": [],
  "flavor": "Typisch für Rothain.",
  "max_copies": 4,
  "id": "dc_n_ei_durchbruchspanzer_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A488.jpg",
  "collector": "A488"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Schwerer Zug",
  "ap": 3,
  "atk": 4,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Schwerer Zug: Schwerpunkt, Durchbruch, Feuerwalze.",
  "effects": [],
  "flavor": "Typisch für Rothain.",
  "max_copies": 4,
  "id": "dc_n_ei_schwerer_zug_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A489.jpg",
  "collector": "A489"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Sturmkompanie",
  "ap": 1,
  "atk": 5,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Sturmkompanie: Schwerpunkt, Durchbruch, Feuerwalze.",
  "effects": [],
  "flavor": "Typisch für Rothain.",
  "max_copies": 4,
  "id": "dc_n_ei_sturmkompanie_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A490.jpg",
  "collector": "A490"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Pionierstoßtrupp",
  "ap": 2,
  "atk": 2,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Pionierstoßtrupp: Schwerpunkt, Durchbruch, Feuerwalze.",
  "effects": [],
  "flavor": "Typisch für Rothain.",
  "max_copies": 4,
  "id": "dc_n_ei_pionierstoßtrupp_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A491.jpg",
  "collector": "A491"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Artilleriebeobachter",
  "ap": 3,
  "atk": 3,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Artilleriebeobachter: Schwerpunkt, Durchbruch, Feuerwalze.",
  "effects": [],
  "flavor": "Typisch für Rothain.",
  "max_copies": 4,
  "id": "dc_n_ei_artilleriebeobachter_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A492.jpg",
  "collector": "A492"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Panzergrenadier",
  "ap": 1,
  "atk": 4,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Panzergrenadier: Schwerpunkt, Durchbruch, Feuerwalze.",
  "effects": [],
  "flavor": "Typisch für Rothain.",
  "max_copies": 4,
  "id": "dc_n_ei_panzergrenadier_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A493.jpg",
  "collector": "A493"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Schweres MG",
  "ap": 2,
  "atk": 5,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Schweres MG: Schwerpunkt, Durchbruch, Feuerwalze.",
  "effects": [],
  "flavor": "Typisch für Rothain.",
  "max_copies": 4,
  "id": "dc_n_ei_schweres_mg_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A494.jpg",
  "collector": "A494"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Durchbruchsgruppe",
  "ap": 3,
  "atk": 2,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Durchbruchsgruppe: Schwerpunkt, Durchbruch, Feuerwalze.",
  "effects": [],
  "flavor": "Typisch für Rothain.",
  "max_copies": 4,
  "id": "dc_n_ei_durchbruchsgruppe_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A495.jpg",
  "collector": "A495"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Reserve des Schwerpunkts",
  "ap": 1,
  "atk": 3,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Reserve des Schwerpunkts: Schwerpunkt, Durchbruch, Feuerwalze.",
  "effects": [],
  "flavor": "Typisch für Rothain.",
  "max_copies": 4,
  "id": "dc_n_ei_reserve_des_schwerpunkts_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A496.jpg",
  "collector": "A496"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Stoßkompanie",
  "ap": 2,
  "atk": 4,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Stoßkompanie: Schwerpunkt, Durchbruch, Feuerwalze.",
  "effects": [],
  "flavor": "Typisch für Rothain.",
  "max_copies": 4,
  "id": "dc_n_ei_stoßkompanie_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A497.jpg",
  "collector": "A497"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Schwerer Panzer",
  "ap": 3,
  "atk": 5,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Schwerer Panzer: Schwerpunkt, Durchbruch, Feuerwalze.",
  "effects": [],
  "flavor": "Typisch für Rothain.",
  "max_copies": 4,
  "id": "dc_n_ei_schwerer_panzer_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A498.jpg",
  "collector": "A498"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Schwerpunktnachschub",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Schwerpunktnachschub unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_schwerpunktnachschub_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A499.jpg",
  "collector": "A499"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Munitionsstoß",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Munitionsstoß unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_munitionsstoß_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A500.jpg",
  "collector": "A500"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Feldlazarett",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Feldlazarett unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_feldlazarett_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A501.jpg",
  "collector": "A501"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Durchbruchslager",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Durchbruchslager unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_durchbruchslager_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A502.jpg",
  "collector": "A502"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Stoßdepot",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Stoßdepot unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_stoßdepot_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A503.jpg",
  "collector": "A503"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Munition des Schwerpunkts",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Munition des Schwerpunkts unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_munition_des_schwerpunkts_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A504.jpg",
  "collector": "A504"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Sanitätsstoß",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Sanitätsstoß unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_sanitätsstoß_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A505.jpg",
  "collector": "A505"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Durchbruchsnachschub",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Durchbruchsnachschub unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_durchbruchsnachschub_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A506.jpg",
  "collector": "A506"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Sturmabzeichen",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Sturmabzeichen verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_sturmabzeichen_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A507.jpg",
  "collector": "A507"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Durchbruchsausrüstung",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Durchbruchsausrüstung verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_durchbruchsausrüstung_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A508.jpg",
  "collector": "A508"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Schwere Waffe",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Schwere Waffe verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_schwere_waffe_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A509.jpg",
  "collector": "A509"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Stoßhelm",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Stoßhelm verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_stoßhelm_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A510.jpg",
  "collector": "A510"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Durchbruchsoptik",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Durchbruchsoptik verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_durchbruchsoptik_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A511.jpg",
  "collector": "A511"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Schweres Geschütz",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Schweres Geschütz verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_schweres_geschütz_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A512.jpg",
  "collector": "A512"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Schwerpunkt legen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Schwerpunkt legen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_schwerpunkt_legen_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A513.jpg",
  "collector": "A513"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Durchbrechen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Durchbrechen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_durchbrechen_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A514.jpg",
  "collector": "A514"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Feuerwalze",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Feuerwalze: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_feuerwalze_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A515.jpg",
  "collector": "A515"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Nachstoßen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Nachstoßen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_nachstoßen_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A516.jpg",
  "collector": "A516"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Abschnitt nehmen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Abschnitt nehmen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_abschnitt_nehmen_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A517.jpg",
  "collector": "A517"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Stoß",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Stoß: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_stoß_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A518.jpg",
  "collector": "A518"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Walze",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Walze: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_walze_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A519.jpg",
  "collector": "A519"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Durchbruch fortsetzen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Durchbruch fortsetzen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_durchbruch_fortsetzen_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A520.jpg",
  "collector": "A520"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Schwerpunkt halten",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Schwerpunkt halten: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_schwerpunkt_halten_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A521.jpg",
  "collector": "A521"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Nachschub des Stoßes",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Nachschub des Stoßes: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_nachschub_des_stoßes_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A522.jpg",
  "collector": "A522"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Angriff",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Angriff: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_angriff_rothain",
  "set": "set_nations",
  "status": "live",
  "image": "nations/rothain/A523.jpg",
  "collector": "A523"
},
{
  "typ": "Doktrin",
  "klasse": "",
  "name": "Schwerpunkt",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "doktrin"
  ],
  "text": "Doktrin: Schwerpunkt.",
  "effects": [],
  "flavor": "",
  "max_copies": 1,
  "id": "dc_dok_schwerpunkt",
  "set": "set_nations",
  "status": "live",
  "image": "Schwerpunkt-Doktrin.jpg",
  "collector": ""
},
{
  "typ": "Doktrin",
  "klasse": "",
  "name": "Feuerwalze",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "doktrin"
  ],
  "text": "Doktrin: Feuerwalze.",
  "effects": [],
  "flavor": "",
  "max_copies": 1,
  "id": "dc_dok_feuerwalze",
  "set": "set_nations",
  "status": "live",
  "image": "Feuerwalze-Doktrin.jpg",
  "collector": ""
}
];