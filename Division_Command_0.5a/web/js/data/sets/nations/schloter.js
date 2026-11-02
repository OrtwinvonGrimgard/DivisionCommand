window.DC_SET_NATIONS = window.DC_SET_NATIONS || {};
window.DC_SET_NATIONS["Schloter"] = [
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Wehrpflichtige",
    "ap": 1,
    "atk": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "leicht"
    ],
    "text": "Beim Ausspielen keine besonderen Effekte – Masse ersetzt Taktik.",
    "effects": [],
    "flavor": "Nummern statt Namen.",
    "max_copies": 4,
    "def": 2,
    "id": "dc_n_eh_wehrpflichtige",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A155.jpg",
    "collector": "A155"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Schützenzug",
    "ap": 2,
    "atk": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Niederhalten: getroffene feindliche Infanterie darf im nächsten Zug ihres Besitzers nicht angreifen.",
    "effects": [
      {
        "code": "NIEDERHALTEN"
      }
    ],
    "flavor": "Halten, bis Verstärkung kommt.",
    "max_copies": 4,
    "def": 3,
    "id": "dc_n_eh_schutzenzug",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A156.jpg",
    "collector": "A156"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Milizkompanie",
    "ap": 2,
    "atk": 2,
    "verdeckt_ok": true,
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
    "flavor": "Aus dem Dorf, in die Linie.",
    "max_copies": 4,
    "def": 4,
    "id": "dc_n_eh_milizkompanie",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A157.jpg",
    "collector": "A157"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Sturmgruppe",
    "ap": 3,
    "atk": 4,
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
    "flavor": "Vorwärts, bis niemand mehr ruft.",
    "max_copies": 4,
    "def": 3,
    "id": "dc_n_eh_sturmgruppe",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A158.jpg",
    "collector": "A158"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Ersatzlager",
    "ap": 2,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "logistik",
      "infanterie"
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
    "flavor": "Immer noch jemand übrig.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_ersatzlager",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A159.jpg",
    "collector": "A159"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Feldküche",
    "ap": 1,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "versorgung"
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
    "flavor": "Warme Mahlzeit, kalter Befehl.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_un_feldkuche",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A160.jpg",
    "collector": "A160"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Sammelruf",
    "ap": 1,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "infanterie"
    ],
    "text": "Ziehe eine Infanterie aus dem Ablagestapel auf die Hand.",
    "effects": [
      {
        "code": "RETURN_INFANTRY_FROM_DISCARD"
      }
    ],
    "flavor": "Die Liste wird länger, nicht kürzer.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_sammelruf",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A161.jpg",
    "collector": "A161"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Ansturm",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "infanterie"
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
    "flavor": "Ein Pfiff, viele Beine.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_ansturm",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A162.jpg",
    "collector": "A162"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Nachschub an Männern",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "logistik"
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
    "flavor": "Namen auf Papier, Körper an der Front.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_so_nachschub_an_mannern",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A163.jpg",
    "collector": "A163"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Feldspaten",
    "ap": 1,
    "atk": null,
    "tags": [
      "ausruestung",
      "infanterie"
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
    "flavor": "Graben ist auch Vorrücken.",
    "max_copies": 4,
    "def": null,
    "id": "dc_n_eq_feldspaten",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A164.jpg",
    "collector": "A164"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Grenadierzug",
    "ap": 3,
    "atk": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Niederhalten: getroffene feindliche Infanterie darf im nächsten Zug ihres Besitzers nicht angreifen.",
    "effects": [
      {
        "code": "NIEDERHALTEN"
      }
    ],
    "flavor": "Dicke Luft vor dem Durchbruch.",
    "max_copies": 2,
    "def": 4,
    "id": "dc_n_eh_grenadierzug",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A165.jpg",
    "collector": "A165"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Veteranenzug",
    "ap": 3,
    "atk": 3,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Nach dem Angriff verdeckt. Erst nach Aufklärung wieder angreifbar.",
    "effects": [
      {
        "code": "GUERRILLA_HIDE"
      }
    ],
    "flavor": "Sie wissen, wann man verschwindet.",
    "max_copies": 2,
    "def": 5,
    "id": "dc_n_eh_veteranenzug",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A166.jpg",
    "collector": "A166"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Regimentsstab",
    "ap": 3,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "fuehrung"
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
    "flavor": "Befehle in Wellen.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_regimentsstab",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A167.jpg",
    "collector": "A167"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Sammelstelle",
    "ap": 2,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "sanitaet"
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
    "flavor": "Zurück in die Linie, sobald es geht.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_un_sammelstelle",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A168.jpg",
    "collector": "A168"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Mobilisierung",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "infanterie"
    ],
    "text": "Durchsuche das Deck nach bis zu 2 Infanterie-Einheiten auf die Hand. Eine davon darfst du sofort ohne AP spielen.",
    "effects": [
      {
        "code": "MOBILIZE_INF"
      }
    ],
    "flavor": "Die Reserve war nie weit.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_mobilisierung",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A169.jpg",
    "collector": "A169"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Menschenwelle",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "infanterie"
    ],
    "text": "Spiele so viele Fronteinheiten von der Hand wie du möchtest, ohne AP-Kosten.",
    "effects": [
      {
        "code": "MASS_DEPLOY"
      }
    ],
    "flavor": "Kostenlos heißt nicht unschuldig.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_so_menschenwelle",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A170.jpg",
    "collector": "A170"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Sturmgewehrsatz",
    "ap": 2,
    "atk": null,
    "tags": [
      "ausruestung",
      "infanterie"
    ],
    "text": "An Infanterie. Träger +2 A / +1 V.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 1,
          "only": "infanterie"
        }
      }
    ],
    "flavor": "Mehr Läufe, mehr Druck.",
    "max_copies": 2,
    "def": null,
    "id": "dc_n_eq_sturmgewehrsatz",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A171.jpg",
    "collector": "A171"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Stoßkompanie",
    "ap": 4,
    "atk": 5,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "elite"
    ],
    "text": "Wenn eine eigene Fronteinheit stirbt: kostenlos offen in denselben Slot.",
    "effects": [
      {
        "code": "BREACH_JUMP"
      }
    ],
    "flavor": "Lücken werden gefüllt, nicht betrauert.",
    "max_copies": 1,
    "def": 4,
    "id": "dc_n_eh_stosskompanie",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A172.jpg",
    "collector": "A172"
  },
  {
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Ehrenzug",
    "ap": 4,
    "atk": 4,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "elite"
    ],
    "text": "Überfall: +1 Schaden wenn diese Einheit den Erstschlag führt. Nach dem Angriff verdeckt.",
    "effects": [
      {
        "code": "AMBUSH"
      },
      {
        "code": "GUERRILLA_HIDE"
      }
    ],
    "flavor": "Ruhm ist eine Form von Druck.",
    "max_copies": 1,
    "def": 6,
    "id": "dc_n_eh_ehrenzug",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A173.jpg",
    "collector": "A173"
  },
  {
    "typ": "Unterstützung",
    "klasse": "",
    "name": "Armeekommando",
    "ap": 5,
    "atk": null,
    "tags": [
      "unterstuetzung",
      "fuehrung",
      "elite"
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
    "flavor": "Masse braucht Taktstock.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_un_armeekommando",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A174.jpg",
    "collector": "A174"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Generalmobilmachung",
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
    "flavor": "Alles, was noch gehen kann.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_generalmobilmachung",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A175.jpg",
    "collector": "A175"
  },
  {
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Letzter Antritt",
    "ap": 0,
    "atk": null,
    "tags": [
      "soforteinsatz",
      "infanterie",
      "elite"
    ],
    "text": "Opfere die eigene Front bis auf eine Einheit. Sie erhält +1 A und +1 V je geopferter Einheit.",
    "effects": [
      {
        "code": "LAST_STAND"
      }
    ],
    "flavor": "Einer bleibt stehen – der Rest wird Geschichte.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_so_letzter_antritt",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A176.jpg",
    "collector": "A176"
  },
  {
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Kampfabzeichen",
    "ap": 3,
    "atk": null,
    "tags": [
      "ausruestung",
      "infanterie",
      "elite"
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
    "flavor": "Metall für Überlebende.",
    "max_copies": 1,
    "def": null,
    "id": "dc_n_eq_kampfabzeichen",
    "set": "set_nations",
    "status": "live",
    "image": "nations/schloter/A177.jpg",
    "collector": "A177"
  }
,
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Wehrpflichtzug",
  "ap": 1,
  "atk": 2,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Wehrpflichtzug: Masse, Infanterie, Durchhaltevermögen.",
  "effects": [],
  "flavor": "Typisch für Schloter.",
  "max_copies": 4,
  "id": "dc_n_ei_wehrpflichtzug_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A376.jpg",
  "collector": "A376"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Schützenkompanie",
  "ap": 2,
  "atk": 3,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Schützenkompanie: Masse, Infanterie, Durchhaltevermögen.",
  "effects": [],
  "flavor": "Typisch für Schloter.",
  "max_copies": 4,
  "id": "dc_n_ei_schützenkompanie_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A377.jpg",
  "collector": "A377"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Milizbataillon",
  "ap": 3,
  "atk": 4,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Milizbataillon: Masse, Infanterie, Durchhaltevermögen.",
  "effects": [],
  "flavor": "Typisch für Schloter.",
  "max_copies": 4,
  "id": "dc_n_ei_milizbataillon_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A378.jpg",
  "collector": "A378"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Sturmpionier",
  "ap": 1,
  "atk": 5,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Sturmpionier: Masse, Infanterie, Durchhaltevermögen.",
  "effects": [],
  "flavor": "Typisch für Schloter.",
  "max_copies": 4,
  "id": "dc_n_ei_sturmpionier_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A379.jpg",
  "collector": "A379"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Ersatzzug",
  "ap": 2,
  "atk": 2,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Ersatzzug: Masse, Infanterie, Durchhaltevermögen.",
  "effects": [],
  "flavor": "Typisch für Schloter.",
  "max_copies": 4,
  "id": "dc_n_ei_ersatzzug_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A380.jpg",
  "collector": "A380"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Feldküche",
  "ap": 3,
  "atk": 3,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Feldküche: Masse, Infanterie, Durchhaltevermögen.",
  "effects": [],
  "flavor": "Typisch für Schloter.",
  "max_copies": 4,
  "id": "dc_n_ei_feldküche_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A381.jpg",
  "collector": "A381"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Sanitätstrupp",
  "ap": 1,
  "atk": 4,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Sanitätstrupp: Masse, Infanterie, Durchhaltevermögen.",
  "effects": [],
  "flavor": "Typisch für Schloter.",
  "max_copies": 4,
  "id": "dc_n_ei_sanitätstrupp_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A382.jpg",
  "collector": "A382"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "MG-Zug",
  "ap": 2,
  "atk": 5,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "MG-Zug: Masse, Infanterie, Durchhaltevermögen.",
  "effects": [],
  "flavor": "Typisch für Schloter.",
  "max_copies": 4,
  "id": "dc_n_ei_mg_zug_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A383.jpg",
  "collector": "A383"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Panzergrenadier",
  "ap": 3,
  "atk": 2,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Panzergrenadier: Masse, Infanterie, Durchhaltevermögen.",
  "effects": [],
  "flavor": "Typisch für Schloter.",
  "max_copies": 4,
  "id": "dc_n_ei_panzergrenadier_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A384.jpg",
  "collector": "A384"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Reservezug",
  "ap": 1,
  "atk": 3,
  "def": 2,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Reservezug: Masse, Infanterie, Durchhaltevermögen.",
  "effects": [],
  "flavor": "Typisch für Schloter.",
  "max_copies": 4,
  "id": "dc_n_ei_reservezug_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A385.jpg",
  "collector": "A385"
},
{
  "typ": "Einheit",
  "klasse": "Infanterie",
  "name": "Feldjäger",
  "ap": 2,
  "atk": 4,
  "def": 3,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "infanterie"
  ],
  "text": "Feldjäger: Masse, Infanterie, Durchhaltevermögen.",
  "effects": [],
  "flavor": "Typisch für Schloter.",
  "max_copies": 4,
  "id": "dc_n_ei_feldjäger_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A386.jpg",
  "collector": "A386"
},
{
  "typ": "Einheit",
  "klasse": "Artillerie",
  "name": "Ersatzkompanie",
  "ap": 3,
  "atk": 5,
  "def": 4,
  "verdeckt_ok": false,
  "tags": [
    "einheit",
    "artillerie"
  ],
  "text": "Ersatzkompanie: Masse, Infanterie, Durchhaltevermögen.",
  "effects": [],
  "flavor": "Typisch für Schloter.",
  "max_copies": 4,
  "id": "dc_n_ei_ersatzkompanie_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A387.jpg",
  "collector": "A387"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Nachschubdepot",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Nachschubdepot unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_nachschubdepot_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A388.jpg",
  "collector": "A388"
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
  "id": "dc_n_un_feldlazarett_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A389.jpg",
  "collector": "A389"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Munitionsausgabe",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Munitionsausgabe unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_munitionsausgabe_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A390.jpg",
  "collector": "A390"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Ersatzlager",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Ersatzlager unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_ersatzlager_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A391.jpg",
  "collector": "A391"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Verpflegungspunkt",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Verpflegungspunkt unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_verpflegungspunkt_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A392.jpg",
  "collector": "A392"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Sanitätsstelle",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Sanitätsstelle unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_sanitätsstelle_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A393.jpg",
  "collector": "A393"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Munitionslager",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Munitionslager unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_munitionslager_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A394.jpg",
  "collector": "A394"
},
{
  "typ": "Unterstützung",
  "klasse": "",
  "name": "Ersatzpunkt",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "unterstuetzung"
  ],
  "text": "Ersatzpunkt unterstützt die Front.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_un_ersatzpunkt_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A395.jpg",
  "collector": "A395"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Kampfabzeichen",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Kampfabzeichen verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_kampfabzeichen_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A396.jpg",
  "collector": "A396"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Feldausrüstung",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Feldausrüstung verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_feldausrüstung_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A397.jpg",
  "collector": "A397"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Ersatzteilkiste",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Ersatzteilkiste verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_ersatzteilkiste_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A398.jpg",
  "collector": "A398"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Stahlhelm",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Stahlhelm verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_stahlhelm_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A399.jpg",
  "collector": "A399"
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
  "id": "dc_n_au_feldverband_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A400.jpg",
  "collector": "A400"
},
{
  "typ": "Ausrüstung",
  "klasse": "",
  "name": "Ersatzwaffe",
  "ap": 1,
  "atk": null,
  "def": null,
  "tags": [
    "ausruestung"
  ],
  "text": "Ersatzwaffe verbessert eine Einheit.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_au_ersatzwaffe_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A401.jpg",
  "collector": "A401"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Massenangriff",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Massenangriff: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_massenangriff_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A402.jpg",
  "collector": "A402"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Durchhalten",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Durchhalten: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_durchhalten_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A403.jpg",
  "collector": "A403"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Ersatz anfordern",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Ersatz anfordern: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_ersatz_anfordern_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A404.jpg",
  "collector": "A404"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Sturmangriff",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Sturmangriff: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_sturmangriff_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A405.jpg",
  "collector": "A405"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Feuer erwidern",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Feuer erwidern: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_feuer_erwidern_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A406.jpg",
  "collector": "A406"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Verluste ersetzen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Verluste ersetzen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_verluste_ersetzen_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A407.jpg",
  "collector": "A407"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Nachschub",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Nachschub: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_nachschub_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A408.jpg",
  "collector": "A408"
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
  "id": "dc_n_so_halten_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A409.jpg",
  "collector": "A409"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Angriff fortsetzen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Angriff fortsetzen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_angriff_fortsetzen_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A410.jpg",
  "collector": "A410"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Reserve einsetzen",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Reserve einsetzen: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_reserve_einsetzen_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A411.jpg",
  "collector": "A411"
},
{
  "typ": "Soforteinsatz",
  "klasse": "",
  "name": "Durchbruch",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "soforteinsatz"
  ],
  "text": "Durchbruch: sofortiger Effekt.",
  "effects": [],
  "flavor": "",
  "max_copies": 4,
  "id": "dc_n_so_durchbruch_schloter",
  "set": "set_nations",
  "status": "live",
  "image": "nations/schloter/A412.jpg",
  "collector": "A412"
},
{
  "typ": "Doktrin",
  "klasse": "",
  "name": "Normverband",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "doktrin"
  ],
  "text": "Doktrin: Normverband.",
  "effects": [],
  "flavor": "",
  "max_copies": 1,
  "id": "dc_dok_normverband",
  "set": "set_nations",
  "status": "live",
  "image": "Normverband-Doktrin.jpg",
  "collector": ""
},
{
  "typ": "Doktrin",
  "klasse": "",
  "name": "Breites Aufgebot",
  "ap": 0,
  "atk": null,
  "def": null,
  "tags": [
    "doktrin"
  ],
  "text": "Doktrin: Breites Aufgebot.",
  "effects": [],
  "flavor": "",
  "max_copies": 1,
  "id": "dc_dok_breites_aufgebot",
  "set": "set_nations",
  "status": "live",
  "image": "Breites-Aufgebot-Doktrin.jpg",
  "collector": ""
}
];