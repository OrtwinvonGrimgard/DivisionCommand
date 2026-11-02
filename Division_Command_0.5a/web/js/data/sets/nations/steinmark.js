window.DC_SET_NATIONS = window.DC_SET_NATIONS || {};
window.DC_SET_NATIONS["Steinmark"] = [
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Grabenbesatzung",
    "ap": 2,
    "atk": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "ausdauer"
    ],
    "text": "Niederhalten: getroffene feindliche Infanterie darf im nächsten Zug nicht angreifen.",
    "effects": [
      {
        "code": "NIEDERHALTEN"
      }
    ],
    "flavor": "Der Graben hält länger als Mut.",
    "max_copies": 4,
    "def": 4,
    "id": "dc_n_eh_grabenbesatzung",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A270.jpg",
    "collector": "A270"
  },
  {
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Zählebiges Geschütz",
    "ap": 3,
    "atk": 4,
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
    "flavor": "Beulen gehören dazu.",
    "max_copies": 4,
    "def": 4,
    "id": "dc_n_eh_zahlebiges_geschutz",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A271.jpg",
    "collector": "A271"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Durchhaltezug",
    "ap": 2,
    "atk": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "ausdauer"
    ],
    "text": "Überfall: +1 Schaden beim Erstschlag.",
    "effects": [
      {
        "code": "AMBUSH"
      }
    ],
    "flavor": "Sie bleiben, weil Weggehen teurer ist.",
    "max_copies": 4,
    "def": 4,
    "id": "dc_n_eh_durchhaltezug",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A272.jpg",
    "collector": "A272"
  },
  {
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Narbenpanzer",
    "ap": 3,
    "atk": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "gepanzert",
      "ausdauer"
    ],
    "text": "Feuerüberlegenheit gegen Ungepanzerte.",
    "effects": [
      {
        "code": "FEUERUEBERLEGENHEIT"
      }
    ],
    "flavor": "Jeder Treffer eine Geschichte.",
    "max_copies": 4,
    "def": 5,
    "id": "dc_n_eh_narbenpanzer",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A273.jpg",
    "collector": "A273"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Feldlazarett",
    "ap": 1,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "sanitaet"
    ],
    "text": "Eigene Front -1 Schaden.",
    "effects": [
      {
        "code": "REDUCE_DAMAGE",
        "param": {
          "n": 1
        }
      }
    ],
    "flavor": "Flicken, nicht ersetzen.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_feldlazarett",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A274.jpg",
    "collector": "A274"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Werkstattwagen",
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
    "flavor": "Schrauben gegen den Zerfall.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_werkstattwagen",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A275.jpg",
    "collector": "A275"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Zusammenbeißen",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "ausdauer"
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
    "flavor": "Schmerz ist Tempo.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_zusammenbeissen",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A276.jpg",
    "collector": "A276"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Notversorgung",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "sanitaet"
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
    "flavor": "Genug für den nächsten Tag.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_notversorgung",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A277.jpg",
    "collector": "A277"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Splitterfeuer",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz"
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
    "flavor": "Auch Schwäche trifft.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_splitterfeuer",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A278.jpg",
    "collector": "A278"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Verbandspäckchen",
    "ap": 1,
    "atk": null,
    "tags": [
      "ausruestung",
      "sanitaet"
    ],
    "text": "An Infanterie. Träger +0 A / +2 V.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 2,
          "only": "infanterie"
        }
      }
    ],
    "flavor": "Klein, aber entscheidend.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_eq_verbandspackchen",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A279.jpg",
    "collector": "A279"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Frontveteranen",
    "ap": 3,
    "atk": 3,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "ausdauer"
    ],
    "text": "Nach dem Angriff verdeckt.",
    "effects": [
      {
        "code": "GUERRILLA_HIDE"
      }
    ],
    "flavor": "Sie wissen, wie man blutet und bleibt.",
    "max_copies": 2,
    "def": 5,
    "id": "dc_n_eh_frontveteranen",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A280.jpg",
    "collector": "A280"
  },
  {
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Reparierter Keil",
    "ap": 4,
    "atk": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "gepanzert",
      "ausdauer"
    ],
    "text": "Ignoriert 2 V gegen Gepanzerte.",
    "effects": [
      {
        "code": "IGNORE_DEF",
        "param": {
          "ignore_def": 2
        }
      }
    ],
    "flavor": "Geschweißt und wieder da.",
    "max_copies": 2,
    "def": 6,
    "id": "dc_n_eh_reparierter_keil",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A281.jpg",
    "collector": "A281"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Verwundetennest",
    "ap": 2,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "sanitaet"
    ],
    "text": "Eigene Front -1 Schaden. Lazarett (2 AP): Einheit auf diese Karte, nächsten Zug volle V.",
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
    "flavor": "Zurück in den Kampf, nicht nach Hause.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_verwundetennest",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A282.jpg",
    "collector": "A282"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Durchhaltekommando",
    "ap": 3,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "ausdauer",
      "fuehrung"
    ],
    "text": "Eigene Front +2 V.",
    "effects": [
      {
        "code": "AURA_FRONT_DEF",
        "param": {
          "def": 2
        }
      }
    ],
    "flavor": "Befehle zum Bleiben.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_durchhaltekommando",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A283.jpg",
    "collector": "A283"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Weiterkämpfen",
    "ap": 1,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "ausdauer"
    ],
    "text": "Ziehe eine Infanterie aus dem Ablagestapel auf die Hand.",
    "effects": [
      {
        "code": "RETURN_INFANTRY_FROM_DISCARD"
      }
    ],
    "flavor": "Fallen ist nicht fertig.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_weiterkampfen",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A284.jpg",
    "collector": "A284"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Zähne zusammen",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "ausdauer"
    ],
    "text": "Gewählte Einheit bricht sofort ab und handelt erst wieder im nächsten Zug.",
    "effects": [
      {
        "code": "PAUSE_UNIT"
      }
    ],
    "flavor": "Den Schlag abfangen.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_zahne_zusammen",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A285.jpg",
    "collector": "A285"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Notpanzerung",
    "ap": 3,
    "atk": null,
    "tags": [
      "ausruestung",
      "ausdauer"
    ],
    "text": "An Panzer oder Fahrzeug. Träger +1 A / +2 V.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 2
        }
      }
    ],
    "flavor": "Platten auf Platten.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_eq_notpanzerung",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A286.jpg",
    "collector": "A286"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Unverwüstliche",
    "ap": 4,
    "atk": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "elite",
      "ausdauer"
    ],
    "text": "Niederhalten. Wenn eigene Fronteinheit stirbt: kostenlos in denselben Slot.",
    "effects": [
      {
        "code": "NIEDERHALTEN"
      },
      {
        "code": "BREACH_JUMP"
      }
    ],
    "flavor": "Sie ersetzen sich selbst.",
    "max_copies": 1,
    "def": 7,
    "id": "dc_n_eh_unverwustliche",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A287.jpg",
    "collector": "A287"
  },
  {
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Kampfwagen der Narben",
    "ap": 5,
    "atk": 5,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "panzer",
      "elite",
      "gepanzert",
      "ausdauer"
    ],
    "text": "Ignoriert 2 V. Feuerüberlegenheit.",
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
    "flavor": "Jedes Loch ein Orden.",
    "max_copies": 1,
    "def": 7,
    "id": "dc_n_eh_kampfwagen_der_narben",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A288.jpg",
    "collector": "A288"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Frontlazarettnetz",
    "ap": 4,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "elite",
      "sanitaet"
    ],
    "text": "Eigene Front -1 Schaden. Koordination (1 AP): Front greift erneut.",
    "effects": [
      {
        "code": "REDUCE_DAMAGE",
        "param": {
          "n": 1
        }
      },
      {
        "code": "REATTACK",
        "param": {
          "ap": 1
        }
      }
    ],
    "flavor": "Heilen, um wieder zu schlagen.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_un_frontlazarettnetz",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A289.jpg",
    "collector": "A289"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Letztes Aufgebot",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "elite",
      "ausdauer"
    ],
    "text": "Opfere die Front bis auf eine Einheit. Sie erhält +1 A/+1 V je Geopferter.",
    "effects": [
      {
        "code": "LAST_STAND"
      }
    ],
    "flavor": "Was noch steht, steht für alle.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_letztes_aufgebot",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A290.jpg",
    "collector": "A290"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Zäher Nachschub",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "elite"
    ],
    "text": "Ziehe 3 Karten und erhalte zusätzlich 2 AP für diesen Zug.",
    "effects": [
      {
        "code": "DRAW_AP",
        "param": {
          "draw": 3,
          "ap": 2
        }
      }
    ],
    "flavor": "Der Krieg endet nicht mit dem Blut.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_zaher_nachschub",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A291.jpg",
    "collector": "A291"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Kriegsnarbe",
    "ap": 4,
    "atk": null,
    "tags": [
      "ausruestung",
      "elite",
      "ausdauer"
    ],
    "text": "An Infanterie. Träger +2 A / +2 V.",
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
    "flavor": "Beweis, dass man geblieben ist.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_eq_kriegsnarbe",
    "set": "set_nations",
    "status": "live",
    "image": "nations/steinmark/A292.jpg",
    "collector": "A292"
  }
,
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Grabenbesatzung",
  "ap": 1,
  "atk": 2,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Grabenbesatzung: Zäh, beschädigte Einheiten, Weiterkämpfen.",
  "effects": [],
  "flavor": "Typisch für Steinmark.",
  "max_copies": 4,
  "id": "dc_n_ei_grabenbesatzung_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A561.jpg",
  "collector": "A561"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Beschädigter Zug",
  "ap": 2,
  "atk": 3,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Beschädigter Zug: Zäh, beschädigte Einheiten, Weiterkämpfen.",
  "effects": [],
  "flavor": "Typisch für Steinmark.",
  "max_copies": 4,
  "id": "dc_n_ei_beschädigter_zug_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A562.jpg",
  "collector": "A562"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Weiterkämpfer",
  "ap": 3,
  "atk": 4,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Weiterkämpfer: Zäh, beschädigte Einheiten, Weiterkämpfen.",
  "effects": [],
  "flavor": "Typisch für Steinmark.",
  "max_copies": 4,
  "id": "dc_n_ei_weiterkämpfer_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A563.jpg",
  "collector": "A563"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Ersatz aus der Stellung",
  "ap": 1,
  "atk": 5,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Ersatz aus der Stellung: Zäh, beschädigte Einheiten, Weiterkämpfen.",
  "effects": [],
  "flavor": "Typisch für Steinmark.",
  "max_copies": 4,
  "id": "dc_n_ei_ersatz_aus_der_stellung_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A564.jpg",
  "collector": "A564"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Zähinfanterie",
  "ap": 2,
  "atk": 2,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Zähinfanterie: Zäh, beschädigte Einheiten, Weiterkämpfen.",
  "effects": [],
  "flavor": "Typisch für Steinmark.",
  "max_copies": 4,
  "id": "dc_n_ei_zähinfanterie_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A565.jpg",
  "collector": "A565"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Feldlazarettzug",
  "ap": 3,
  "atk": 3,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Feldlazarettzug: Zäh, beschädigte Einheiten, Weiterkämpfen.",
  "effects": [],
  "flavor": "Typisch für Steinmark.",
  "max_copies": 4,
  "id": "dc_n_ei_feldlazarettzug_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A566.jpg",
  "collector": "A566"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Verbandsplatz",
  "ap": 1,
  "atk": 4,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Verbandsplatz: Zäh, beschädigte Einheiten, Weiterkämpfen.",
  "effects": [],
  "flavor": "Typisch für Steinmark.",
  "max_copies": 4,
  "id": "dc_n_ei_verbandsplatz_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A567.jpg",
  "collector": "A567"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "MG-Nest",
  "ap": 2,
  "atk": 5,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "MG-Nest: Zäh, beschädigte Einheiten, Weiterkämpfen.",
  "effects": [],
  "flavor": "Typisch für Steinmark.",
  "max_copies": 4,
  "id": "dc_n_ei_mg_nest_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A568.jpg",
  "collector": "A568"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Stellungsartillerie",
  "ap": 3,
  "atk": 2,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Stellungsartillerie: Zäh, beschädigte Einheiten, Weiterkämpfen.",
  "effects": [],
  "flavor": "Typisch für Steinmark.",
  "max_copies": 4,
  "id": "dc_n_ei_stellungsartillerie_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A569.jpg",
  "collector": "A569"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Reserve der Verwundeten",
  "ap": 1,
  "atk": 3,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Reserve der Verwundeten: Zäh, beschädigte Einheiten, Weiterkämpfen.",
  "effects": [],
  "flavor": "Typisch für Steinmark.",
  "max_copies": 4,
  "id": "dc_n_ei_reserve_der_verwundeten_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A570.jpg",
  "collector": "A570"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Zähzug",
  "ap": 2,
  "atk": 4,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Zähzug: Zäh, beschädigte Einheiten, Weiterkämpfen.",
  "effects": [],
  "flavor": "Typisch für Steinmark.",
  "max_copies": 4,
  "id": "dc_n_ei_zähzug_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A571.jpg",
  "collector": "A571"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Grabenkämpfer",
  "ap": 3,
  "atk": 5,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Grabenkämpfer: Zäh, beschädigte Einheiten, Weiterkämpfen.",
  "effects": [],
  "flavor": "Typisch für Steinmark.",
  "max_copies": 4,
  "id": "dc_n_ei_grabenkämpfer_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A572.jpg",
  "collector": "A572"
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
  "id": "dc_n_un_feldlazarett_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A573.jpg",
  "collector": "A573"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Verbandsplatz",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Verbandsplatz unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_verbandsplatz_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A574.jpg",
  "collector": "A574"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Munition der Stellung",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Munition der Stellung unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_munition_der_stellung_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A575.jpg",
  "collector": "A575"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Ersatz aus dem Graben",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Ersatz aus dem Graben unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_ersatz_aus_dem_graben_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A576.jpg",
  "collector": "A576"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Lazarettbunker",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Lazarettbunker unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_lazarettbunker_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A577.jpg",
  "collector": "A577"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Verbandslager",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Verbandslager unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_verbandslager_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A578.jpg",
  "collector": "A578"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Stellungsmunition",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Stellungsmunition unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_stellungsmunition_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A579.jpg",
  "collector": "A579"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Verwundetenreserve",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Verwundetenreserve unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_verwundetenreserve_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A580.jpg",
  "collector": "A580"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Kriegsnarbe",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Kriegsnarbe verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_kriegsnarbe_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A581.jpg",
  "collector": "A581"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Feldverband",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Feldverband verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_feldverband_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A582.jpg",
  "collector": "A582"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Stellungsausrüstung",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Stellungsausrüstung verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_stellungsausrüstung_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A583.jpg",
  "collector": "A583"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Ersatzteil",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Ersatzteil verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_ersatzteil_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A584.jpg",
  "collector": "A584"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Verbandskasten",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Verbandskasten verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_verbandskasten_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A585.jpg",
  "collector": "A585"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Grabenausrüstung",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Grabenausrüstung verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_grabenausrüstung_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A586.jpg",
  "collector": "A586"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Weiterkämpfen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Weiterkämpfen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_weiterkämpfen_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A587.jpg",
  "collector": "A587"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Nicht angreifen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Nicht angreifen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_nicht_angreifen_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A588.jpg",
  "collector": "A588"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Zurückschlagen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Zurückschlagen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_zurückschlagen_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A589.jpg",
  "collector": "A589"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Verluste nutzen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Verluste nutzen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_verluste_nutzen_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A590.jpg",
  "collector": "A590"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Stellung halten",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Stellung halten: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_stellung_halten_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A591.jpg",
  "collector": "A591"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Zäh bleiben",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Zäh bleiben: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_zäh_bleiben_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A592.jpg",
  "collector": "A592"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Verwundete einsetzen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Verwundete einsetzen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_verwundete_einsetzen_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A593.jpg",
  "collector": "A593"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Halten",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Halten: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_halten_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A594.jpg",
  "collector": "A594"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Zurückschlagen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Zurückschlagen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_zurückschlagen_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A595.jpg",
  "collector": "A595"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Weiter",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Weiter: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_weiter_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A596.jpg",
  "collector": "A596"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Stellung",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Stellung: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_stellung_steinmark",
  "set": "set_nations",
  "status": "live",
  "image": "nations/steinmark/A597.jpg",
  "collector": "A597"
},
{
  "typ": "Doktrin",
  "klasse": "",
  "name": "Weiterkämpfen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "doktrin"
  ],
  "text": "Doktrin: Weiterkämpfen.",
  "effects": [],
  "flavor": "",
  "max_copies": 1,
  "id": "dc_dok_weiterkaempfen",
  "set": "set_nations",
  "status": "live",
  "image": "Weiterkaempfen-Doktrin.jpg",
  "collector": ""
},
{
  "typ": "Doktrin",
  "klasse": "",
  "name": "Ausharren",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "doktrin"
  ],
  "text": "Doktrin: Ausharren.",
  "effects": [],
  "flavor": "",
  "max_copies": 1,
  "id": "dc_dok_ausharren",
  "set": "set_nations",
  "status": "live",
  "image": "Ausharren-Doktrin.jpg",
  "collector": ""
}
];