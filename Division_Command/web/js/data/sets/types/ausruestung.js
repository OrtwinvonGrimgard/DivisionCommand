/**
 * Ausrüstungskarten (Katalog). Nur Daten, keine Spiellogik. Effekte über strukturierte Codes (EQUIP_STAT, CM, REVEAL, …).
 *
 * Keine Kommentare pro Karte (zu umfangreich). Änderungen an Werten oder
 * Effekten sind Regeländerungen und gehören nicht in diese Aufräumung.
 */
window.DC_SET_TYPES = window.DC_SET_TYPES || {};
window.DC_SET_TYPES["Ausrüstung"] = [
  {
    "id": "dc_eq_standarte",
    "set": "set_alpha",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Standarte",
    "ap": 1,
    "atk": null,
    "def": null,
    "tags": [
      "ausruestung",
      "infanterie"
    ],
    "text": "Träger +1 DEF. Liegt eine zweite eigene Infanterie im Abschnitt, +1 ATK.",
    "effects": [
      {
        "code": "EQUIP_STANDARD",
        "param": {
          "def": 1,
          "atk_if_second": 1
        }
      }
    ],
    "flavor": "Sie steht. Ob der Abschnitt noch steht, sieht man später.",
    "image": "ausruestung/A037.jpg",
    "max_copies": 4,
    "collector": "A037"
  },
  {
    "id": "dc_eq_gebetsfahne",
    "set": "set_alpha",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Gebetsfahne",
    "ap": 1,
    "atk": null,
    "def": null,
    "tags": [
      "ausruestung",
      "glaube"
    ],
    "text": "Wird der Träger zerstört, hat eine eigene Infanterie im Abschnitt +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "ON_DESTROY_SECTION_ATK",
        "param": {
          "atk": 1
        }
      }
    ],
    "flavor": "Wenn sie fällt, hört der Abschnitt auf zu fragen, warum.",
    "image": "ausruestung/A039.jpg",
    "max_copies": 4,
    "collector": "A039"
  },
  {
    "id": "dc_au_sturmleitern",
    "set": "set_alpha",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Sturmleitern",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK beim ersten Angriff im Zug.",
    "effects": [
      {
        "code": "FIRST_ATTACK_EACH_TURN",
        "param": {
          "atk": 1
        }
      }
    ],
    "flavor": "Die Leiter kommt mit. Ob sie gebraucht wird, sieht man oben.",
    "image": "ausruestung/A044.jpg",
    "max_copies": 2,
    "collector": "A044"
  },
  {
    "id": "dc_au_feldzeichen",
    "set": "set_alpha",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Feldzeichen",
    "ap": 1,
    "atk": null,
    "def": null,
    "tags": [
      "ausruestung"
    ],
    "text": "Der ausgerüstete Träger erhält +1 DEF.",
    "effects": [
      {
        "code": "CARRIER_DEF",
        "param": {
          "def": 1
        }
      }
    ],
    "flavor": "Ein Zeichen. Mehr nicht. Aber es steht.",
    "image": "ausruestung/A047.jpg",
    "max_copies": 4,
    "collector": "A047"
  },
  {
    "id": "dc_eq_fanat",
    "set": "set_alpha",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Fanatischer Kommandant",
    "ap": 4,
    "atk": null,
    "def": null,
    "tags": [
      "ausruestung",
      "kommandant"
    ],
    "text": "An Infanterie. Reale Kosten 4 AP. Träger +2 ATK / +2 DEF.",
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
    "flavor": "Wer das Schwert ergreift, der soll vergehen durch das Schwert.",
    "image": "ausruestung/A093.jpg",
    "max_copies": 2,
    "collector": "A093"
  },
  {
    "id": "dc_eq_spat",
    "set": "set_alpha",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Klappspaten",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "ausruestung",
      "schanzen"
    ],
    "text": "Zug ohne Angriff: +1 DEF. Beim Angriff zurück auf Ursprung.",
    "effects": [
      {
        "code": "SCHANZEN",
        "param": {
          "only": "infanterie"
        }
      }
    ],
    "flavor": "Sie werden graben bis ich ihnen befehle das Graben einzustellen!",
    "image": "ausruestung/A094.jpg",
    "max_copies": 2,
    "collector": "A094"
  },
  {
    "id": "dc_eq_med",
    "set": "set_alpha",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Medizinische Versorgung",
    "ap": 4,
    "atk": null,
    "def": null,
    "tags": [
      "ausruestung",
      "medizin"
    ],
    "text": "Träger +3 DEF/Zug bis defMax. Flanken +2 DEF/Zug bis defMax.",
    "effects": [
      {
        "code": "MEDIZIN",
        "param": {
          "self": 3,
          "flank": 2
        }
      }
    ],
    "flavor": "Es ist genug für alle da.",
    "image": "ausruestung/A095.jpg",
    "max_copies": 2,
    "collector": "A095"
  },
  {
    "id": "dc_eq_rauch",
    "set": "set_alpha",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Rauchgranate",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "ausruestung",
      "nebel",
      "rauch"
    ],
    "text": "Wird der Träger angegriffen, Nebelfeld für diesen Kampf.",
    "effects": [
      {
        "code": "RAUCH"
      }
    ],
    "flavor": "Die leichteste Deckung der Welt.",
    "image": "ausruestung/A096.jpg",
    "max_copies": 2,
    "collector": "A096"
  },
  {
    "id": "dc_eq_tasche",
    "set": "set_alpha",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Sanitätstasche",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "ausruestung",
      "medizin"
    ],
    "text": "Träger +2 DEF/Zug bis defMax.",
    "effects": [
      {
        "code": "TASCHE",
        "param": {
          "n": 2
        }
      }
    ],
    "flavor": "Ich brauche hier sofort einen Druckverband!",
    "image": "ausruestung/A097.jpg",
    "max_copies": 2,
    "collector": "A097"
  },
  {
    "id": "dc_b_ersatzkette_174",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Ersatzkette",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Nur an Panzer. Träger +1 DEF. Einmalig: Erleidet der Träger Schaden, heilt er danach 1.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1,
          "only": "panzer"
        }
      },
      {
        "code": "EQUIP_HEAL_ONCE",
        "param": {
          "heal": 1
        }
      }
    ],
    "flavor": "Ersatz ist Standard.",
    "image": "ausruestung/B174.jpg",
    "max_copies": 1,
    "collector": "B174",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kaliberkiste_175",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Kaliberkiste",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Nur an Artillerie. Träger +1 ATK.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0,
          "only": "artillerie"
        }
      }
    ],
    "flavor": "Die Kiste kam pünktlich.",
    "image": "ausruestung/B175.jpg",
    "max_copies": 1,
    "collector": "B175",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_werkssiegel_176",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Werkssiegel",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Einmalig 1 weniger aus dem Friedhof.",
    "effects": [
      {
        "code": "COST_NEXT",
        "param": {
          "fromGrave": true,
          "amount": 1
        }
      }
    ],
    "flavor": "Siegel heißt: wieder lieferbar.",
    "image": "ausruestung/B176.jpg",
    "max_copies": 1,
    "collector": "B176",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zieloptik_konzern_177",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Zieloptik Konzern",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Nur an Aufklärung oder Artillerie. +1 ATK gegen beobachtete Ziele.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 0,
          "only": "artillerie|aufklaerung"
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "observed"
        }
      }
    ],
    "flavor": "Optik aus dem Auftragsring.",
    "image": "ausruestung/B177.jpg",
    "max_copies": 1,
    "collector": "B177",
    "rarity": "silver"
  },
  {
    "id": "dc_b_panzerplatte_serie_178",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Panzerplatte Serie",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Nur an Panzer. +2 DEF, −1 ATK.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": -1,
          "def": 2,
          "only": "panzer"
        }
      }
    ],
    "flavor": "Serie schützt die Investition.",
    "image": "ausruestung/B178.jpg",
    "max_copies": 1,
    "collector": "B178",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_munitionsgurt_endlos_179",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Munitionsgurt Endlos",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Artillerie: einmal/Zug +1 Schaden nach Angriff.",
    "effects": [
      {
        "code": "EQUIP_ON_ATTACK_DAMAGE",
        "param": {
          "bonus": 1
        }
      }
    ],
    "flavor": "Endlos — solange das Buch offen ist.",
    "image": "ausruestung/B179.jpg",
    "max_copies": 1,
    "collector": "B179",
    "rarity": "silver"
  },
  {
    "id": "dc_b_liefermarke_180",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Liefermarke",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Wird der Träger zerstört, ziehe 1 Karte.",
    "effects": [
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Marke für die nächste Zeile.",
    "image": "ausruestung/B180.jpg",
    "max_copies": 1,
    "collector": "B180",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nuechterne_jacke_181",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Nüchterne Jacke",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Nur an Infanterie. Träger +1 DEF.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1,
          "only": "infanterie"
        }
      }
    ],
    "flavor": "Prunk liegt im Auftragsbuch.",
    "image": "ausruestung/B181.jpg",
    "max_copies": 1,
    "collector": "B181",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_vertragsclip_182",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Vertragsclip",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Elite/Unterstützung: Soforteinsatz −1 Kosten.",
    "effects": [
      {
        "code": "EQUIP_DISCOUNT_AURA",
        "param": {
          "type": "Soforteinsatz",
          "amount": 1
        }
      }
    ],
    "flavor": "Der Clip hält den Preis.",
    "image": "ausruestung/B182.jpg",
    "max_copies": 1,
    "collector": "B182",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_auftragsstempel_183",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Auftragsstempel",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK und +1 DEF, wenn du in diesem Zug einen Soforteinsatz gespielt hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "played:Soforteinsatz",
          "def": 1
        }
      }
    ],
    "flavor": "Gestempelt heißt: freigegeben zum Verbrauch.",
    "image": "ausruestung/B183.jpg",
    "max_copies": 1,
    "collector": "B183",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_standarte_131",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Feldstandarte",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF. Zweite eigene Infanterie im Abschnitt: +1 ATK.",
    "effects": [
      {
        "code": "EQUIP_STANDARD",
        "param": {
          "def": 1,
          "atk_if_second": 1
        }
      }
    ],
    "flavor": "Orientierung ohne Prunk.",
    "image": "ausruestung/B131.jpg",
    "max_copies": 1,
    "collector": "B131",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_gebetsfahne_132",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Gebetswimpel",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Wird der Träger zerstört: eine eigene Infanterie im Abschnitt +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "ON_DESTROY_SECTION_ATK",
        "param": {
          "atk": 1
        }
      }
    ],
    "flavor": "Der Stoff überlebt den Träger.",
    "image": "ausruestung/B132.jpg",
    "max_copies": 1,
    "collector": "B132",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_sturmleitern_133",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Sturmleiter",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK. Erster Angriff des Trägers in diesem Zug zusätzlich +1 ATK.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "FIRST_ATTACK_EACH_TURN",
        "param": {
          "atk": 1,
          "attachmentTurnOnly": true
        }
      }
    ],
    "flavor": "Einfach. Robust. Genug.",
    "image": "ausruestung/B133.jpg",
    "max_copies": 1,
    "collector": "B133",
    "rarity": "silver"
  },
  {
    "id": "dc_b_feldzeichen_135",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Feldabzeichen",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK, solange eigene Infanterie benachbart ist.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "adj:infanterie"
        }
      }
    ],
    "flavor": "Sichtbare Pflicht.",
    "image": "ausruestung/B135.jpg",
    "max_copies": 1,
    "collector": "B135",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_blutbanner_136",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Blutbanner",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 ATK. Bei Zerstörung: 1 Schaden an einer eigenen Einheit im Abschnitt.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 0
        }
      },
      {
        "code": "ON_DESTROY_SECTION_ATK",
        "param": {
          "atk": 2
        }
      },
      {
        "code": "ON_DESTROY_SELF_DAMAGE",
        "param": {
          "damage": 1
        }
      }
    ],
    "flavor": "Ehre hat einen Preis.",
    "image": "ausruestung/B136.jpg",
    "max_copies": 1,
    "collector": "B136",
    "rarity": "silver"
  },
  {
    "id": "dc_b_sammelfahne_137",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Sammelfahne",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Einmal pro Zug: wenn Infanterie den Abschnitt betritt, Träger +1 DEF bis Zugende. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Hier sammeln.",
    "image": "ausruestung/B137.jpg",
    "max_copies": 1,
    "collector": "B137",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_feldaltar_138",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Feldaltar",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger ist nicht Ziel des ersten gegnerischen Angriffs im Zug.",
    "effects": [
      {
        "code": "FIRST_ENEMY_ATTACK_TARGET_DENIED",
        "param": {}
      }
    ],
    "flavor": "Ritus vor dem Sturm.",
    "image": "ausruestung/B138.jpg",
    "max_copies": 1,
    "collector": "B138",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_glaubenssegen_140",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Glaubenssegen",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK, +1 DEF. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 1
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Können und Pflicht vor Jubel.",
    "image": "ausruestung/B140.jpg",
    "max_copies": 1,
    "collector": "B140",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kettengebet_141",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Kettengebet",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Solange Träger lebt: eigene Infanterie im Abschnitt ignoriert den ersten 1 Schaden im Zug.",
    "effects": [
      {
        "code": "SECTION_INF_FIRST_POINT_PER_TURN",
        "param": {
          "amount": 1
        }
      }
    ],
    "flavor": "Ein Gebet, viele Schultern.",
    "image": "ausruestung/B141.jpg",
    "max_copies": 1,
    "collector": "B141",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_balkenschild_142",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Balkenschild",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +3 DEF.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 3
        }
      }
    ],
    "flavor": "Halten ist auch Sturm.",
    "image": "ausruestung/B142.jpg",
    "max_copies": 1,
    "collector": "B142",
    "rarity": "silver"
  },
  {
    "id": "dc_b_wachsiegel_647",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Wachsiegel",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF. Einmal: ignoriere den ersten Schaden am Träger; danach Träger −1 ATK bis Zugende.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "def": 1
        }
      },
      {
        "code": "EQUIP_IGNORE_FIRST_DAMAGE",
        "param": {
          "afterAtk": -1
        }
      }
    ],
    "flavor": "Wachsiegel. Schutz hat seinen Preis.",
    "image": "ausruestung/B647.jpg",
    "max_copies": 1,
    "collector": "B647",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kronriemen_648",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Kronriemen",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      }
    ],
    "flavor": "Kronriemen. Treue geht auf den Nächsten über.",
    "image": "ausruestung/B648.jpg",
    "max_copies": 1,
    "collector": "B648",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_erbe_gewehr_651",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Erbe-Gewehr",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK, solange er beschädigt ist.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "damaged"
        }
      }
    ],
    "flavor": "Aus der Werkstatt der Großväter.",
    "image": "ausruestung/B651.jpg",
    "max_copies": 1,
    "collector": "B651",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kronplakette_652",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Kronplakette",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF. Wird der Träger zerstört, ziehe 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Die Nummer überlebt den Mann.",
    "image": "ausruestung/B652.jpg",
    "max_copies": 1,
    "collector": "B652",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_befehlskarte_653",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Befehlskarte",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger hat +1 ATK und +1 DEF im Zug, in dem er gespielt wird.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 1
        }
      }
    ],
    "flavor": "Laminat über Blut.",
    "image": "ausruestung/B653.jpg",
    "max_copies": 1,
    "collector": "B653",
    "rarity": "silver"
  },
  {
    "id": "dc_b_pelzkragen_654",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Pelzkragen",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 ATK, solange er beschädigt ist.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 2,
          "when": "damaged"
        }
      }
    ],
    "flavor": "Wärme und Rang. Beides nass.",
    "image": "ausruestung/B654.jpg",
    "max_copies": 1,
    "collector": "B654",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_patronengurt_erbe_655",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Patronengurt Erbe",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      }
    ],
    "flavor": "Gezählt. Verschossen. Ersetzt.",
    "image": "ausruestung/B655.jpg",
    "max_copies": 1,
    "collector": "B655",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_stabskarte_656",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Stabsplan",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.",
    "effects": [
      {
        "code": "EQUIP_HEAL_ONCE",
        "param": {
          "heal": 1,
          "perTurn": true
        }
      }
    ],
    "flavor": "Führen heißt oft nur zählen.",
    "image": "ausruestung/B656.jpg",
    "max_copies": 1,
    "collector": "B656",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_werkstattmarke_657",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Werkstattmarke",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger-Panzer oder -Fahrzeug: +1 DEF und heilt 1 zu Beginn deines Zuges, solange beschädigt.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1,
          "only": "panzer|fahrzeug"
        }
      },
      {
        "code": "EQUIP_TURN_START_HEAL",
        "param": {
          "heal": 1,
          "ifDamaged": true
        }
      }
    ],
    "flavor": "Ohne Stempel keine Freigabe.",
    "image": "ausruestung/B657.jpg",
    "max_copies": 1,
    "collector": "B657",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_regimentsfarbe_658",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Regimentsfarbe",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger und eine andere eigene Infanterie im Abschnitt haben +1 DEF.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      }
    ],
    "flavor": "Gerollt. Nicht gehisst.",
    "image": "ausruestung/B658.jpg",
    "max_copies": 1,
    "collector": "B658",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_feldverband_407",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Feldverband",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK, solange beschädigt. Einmal: erleide 1 Schaden → +2 ATK bis Zugende.",
    "effects": [
      {
        "code": "EQUIP_COND_ATK",
        "param": {
          "atk": 1,
          "ifDamaged": true
        }
      },
      {
        "code": "EQUIP_ONCE_PAIN_ATK",
        "param": {
          "selfDmg": 1,
          "atk": 2,
          "until": "turn"
        }
      }
    ],
    "flavor": "Feldverband. Wunde als Hebel.",
    "image": "ausruestung/B407.jpg",
    "max_copies": 1,
    "collector": "B407",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nervenklemme_409",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Nervenklemme",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK. Einmal: erleide 1 Schaden und +2 ATK bis Zugende; danach Träger heilt 1 weniger diesen Kampf.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "EQUIP_ONCE_PAIN_ATK",
        "param": {
          "selfDmg": 1,
          "atk": 2,
          "until": "turn",
          "healLess": 1
        }
      }
    ],
    "flavor": "Nervenklemme. Signal über Schmerz.",
    "image": "ausruestung/B409.jpg",
    "max_copies": 1,
    "collector": "B409",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_filterpatrone_410",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Filterpatrone",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF gegen den ersten Angriff pro Zug.",
    "effects": [
      {
        "code": "FIRST_DEFENSE_BONUS",
        "param": {
          "amount": 1
        }
      }
    ],
    "flavor": "Atem als Zuteilung.",
    "image": "ausruestung/B410.jpg",
    "max_copies": 1,
    "collector": "B410",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schmerzchip_412",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Schmerzchip",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK, solange er beschädigt ist. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "damaged"
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Der Chip lügt den Schmerz um.",
    "image": "ausruestung/B412.jpg",
    "max_copies": 1,
    "collector": "B412",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_servogurt_413",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Servogurt",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK. Wenn Träger angreift: erleidet 1 Schaden; wenn er überlebt, +1 DEF bis Zugende.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "EQUIP_ON_ATTACK_DAMAGE",
        "param": {
          "self": 1
        }
      }
    ],
    "flavor": "Servogurt. Kraft frisst Gelenk.",
    "image": "ausruestung/B413.jpg",
    "max_copies": 1,
    "collector": "B413",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_blutbeutel_414",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Blutbeutel",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Einmal: heile 2 DEF am Träger, dann zerstöre diese Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 2
        }
      },
      {
        "code": "EQUIP_ONCE_HEAL_DESTROY",
        "param": {
          "heal": 2
        }
      }
    ],
    "flavor": "Leihen, nicht schenken.",
    "image": "ausruestung/B414.jpg",
    "max_copies": 1,
    "collector": "B414",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schnittkabel_415",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Schnittkabel",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK. Einmal: ziehe 1, erleide 1 Schaden; wenn dadurch beschädigt: +1 DEF.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "EQUIP_ONCE_DRAW_PAIN",
        "param": {
          "draw": 1,
          "selfDmg": 1,
          "defIfDamaged": 1
        }
      }
    ],
    "flavor": "Schnittkabel. Daten gegen Fleisch.",
    "image": "ausruestung/B415.jpg",
    "max_copies": 1,
    "collector": "B415",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_massplakette_416",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Maßplakette",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK. Wird der Träger zerstört, ziehe 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Die Nummer überlebt den Träger.",
    "image": "ausruestung/B416.jpg",
    "max_copies": 1,
    "collector": "B416",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_stossklinge_417",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Stoßklinge",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 ATK im ersten Angriff nach dem Anlegen.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 0
        }
      },
      {
        "code": "CARRIER_FIRST_ATTACK_ATK",
        "param": {
          "atk": 2
        }
      }
    ],
    "flavor": "Ein Schnitt. Eine Messung.",
    "image": "ausruestung/B417.jpg",
    "max_copies": 1,
    "collector": "B417",
    "rarity": "silver"
  },
  {
    "id": "dc_b_wartungsplatte_418",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "",
    "name": "Wartungsplatte",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "An Panzer: +1 DEF; heilt 1 zu Zugbeginn wenn beschädigt, dann erleidet angrenzende eigene Infanterie 1 Schaden.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1,
          "only": "panzer"
        }
      },
      {
        "code": "EQUIP_TURN_START_HEAL",
        "param": {
          "heal": 1,
          "ifDamaged": true,
          "thenDmgAdjInf": 1
        }
      }
    ],
    "flavor": "Panzer zuerst.",
    "image": "ausruestung/B418.jpg",
    "max_copies": 1,
    "collector": "B418",
    "rarity": "silver"
  },
  {
    "id": "dc_b_offenes_geraet_831",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Offenes Gerät",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK gegen beobachtete Ziele. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "observed"
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Gerät, das ein Bürger prüfen kann.",
    "image": "ausruestung/B831.jpg",
    "max_copies": 1,
    "collector": "B831",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_plattentraeger_832",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Plattenträger",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF, solange du eine Unterstützung im Feld hast.",
    "effects": [
      {
        "code": "EQUIP_COND_DEF",
        "param": {
          "def": 1,
          "ifSupport": true
        }
      }
    ],
    "flavor": "Träger. Kein Sockel-Kostüm.",
    "image": "ausruestung/B832.jpg",
    "max_copies": 1,
    "collector": "B832",
    "rarity": "silver"
  },
  {
    "id": "dc_b_sandstreifen_833",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Sandstreifen",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 ATK. Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 0
        }
      },
      {
        "code": "EQUIP_HEAL_ONCE",
        "param": {
          "heal": 1,
          "perTurn": true
        }
      }
    ],
    "flavor": "Sandstreifen. Kein Rang im Alltag.",
    "image": "ausruestung/B833.jpg",
    "max_copies": 1,
    "collector": "B833",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_sensor_knoten_834",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Sensor-Knoten",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK. Beim Anlegen: markiere 1 Feind als beobachtet.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "REVEAL",
        "param": {
          "count": 1,
          "observe": true
        }
      }
    ],
    "flavor": "Sensor hilft. Ersetzt die Person nicht.",
    "image": "ausruestung/B834.jpg",
    "max_copies": 1,
    "collector": "B834",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nov_werkzeug_835",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Nov-Werkzeug",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK. Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "EQUIP_HEAL_ONCE",
        "param": {
          "heal": 1,
          "perTurn": true
        }
      }
    ],
    "flavor": "Werkzeug aus dem Hof Nov.",
    "image": "ausruestung/B835.jpg",
    "max_copies": 1,
    "collector": "B835",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_quellenmappe_836",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Quellenmappe",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK, gegen beobachtete Ziele +2 ATK.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "observed"
        }
      }
    ],
    "flavor": "Viele Stimmen. Ein Irrtum laut korrigiert.",
    "image": "ausruestung/B836.jpg",
    "max_copies": 1,
    "collector": "B836",
    "rarity": "silver"
  },
  {
    "id": "dc_b_netzlampe_837",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Netzlampe",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK gegen beobachtete Ziele. Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.",
    "effects": [
      {
        "code": "EQUIP_HEAL_ONCE",
        "param": {
          "heal": 1,
          "perTurn": true
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "observed"
        }
      }
    ],
    "flavor": "Lampe leuchtet. Gerät kann trotzdem kaputt sein.",
    "image": "ausruestung/B837.jpg",
    "max_copies": 1,
    "collector": "B837",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_melderband_838",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Melderband",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK; +1 DEF nach Aufdecken diesen Zug.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "EQUIP_AFTER_REVEAL_DEF",
        "param": {
          "def": 1
        }
      }
    ],
    "flavor": "Band des Melders. Keine Privatarmee.",
    "image": "ausruestung/B838.jpg",
    "max_copies": 1,
    "collector": "B838",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_verbindungssiegel_839",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Verbindungssiegel",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Beim Anlegen: markiere 1 Feind als beobachtet.",
    "effects": [
      {
        "code": "REVEAL",
        "param": {
          "count": 1,
          "observe": true
        }
      }
    ],
    "flavor": "Siegel der Verbindung. Novaris bindet.",
    "image": "ausruestung/B839.jpg",
    "max_copies": 1,
    "collector": "B839",
    "rarity": "gold"
  },
  {
    "id": "dc_b_verlustliste_840",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Verlustliste",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK. Einmal pro Zug: Spielst du einen Soforteinsatz, ziehe 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "EQUIP_SOFT_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Namen mit Beruf. Keine anonyme Summe.",
    "image": "ausruestung/B840.jpg",
    "max_copies": 1,
    "collector": "B840",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schwarzes_siegel_891",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Schwarzes Siegel",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Kostet 1 AP weniger (mind. 0), solange du eine Unterstützung hast. Beim Anlegen: ziehe 1.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 0
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "support"
        }
      },
      {
        "code": "ON_ENTER_DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Siegel. Stumpfes Oliv.",
    "image": "ausruestung/B891.jpg",
    "max_copies": 1,
    "collector": "B891",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_aktenmappe_892",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Aktenmappe",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Der erste Schaden je Zug am Träger sinkt um 1, solange er allein im Abschnitt steht.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "negate",
          "n": 1,
          "when": "alone"
        }
      }
    ],
    "flavor": "Mappe. Zug. Kein Glauben.",
    "image": "ausruestung/B892.jpg",
    "max_copies": 1,
    "collector": "B892",
    "rarity": "silver"
  },
  {
    "id": "dc_b_stumpfmantel_893",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Stumpfmantel",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 DEF. Einmal pro Zug: Spielst du einen Soforteinsatz, ziehe 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 2
        }
      },
      {
        "code": "EQUIP_SOFT_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Mantel der stummen Stadt.",
    "image": "ausruestung/B893.jpg",
    "max_copies": 1,
    "collector": "B893",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_lesegeraet_894",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Lesegerät",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK, +1 DEF.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 1
        }
      }
    ],
    "flavor": "Gerät liest. Folgt nicht.",
    "image": "ausruestung/B894.jpg",
    "max_copies": 1,
    "collector": "B894",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_stillkragen_895",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Stillkragen",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK und +1 DEF. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 1
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
    "flavor": "Kragen der Familie Still.",
    "image": "ausruestung/B895.jpg",
    "max_copies": 1,
    "collector": "B895",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_vel_stempel_896",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Vel-Stempel",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF. Einmal pro Zug: Spielst du einen Soforteinsatz mit Aufdecken, ziehe 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "EQUIP_SOFT_DRAW",
        "param": {
          "draw": 1,
          "needRevealSofort": true
        }
      }
    ],
    "flavor": "Vel-Stempel. Akte gestempelt.",
    "image": "ausruestung/B896.jpg",
    "max_copies": 1,
    "collector": "B896",
    "rarity": "silver"
  },
  {
    "id": "dc_b_falschmarke_897",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Falschmarke",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK. Einmal pro Zug: Spielst du einen Soforteinsatz, ziehe 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "EQUIP_SOFT_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Marke einer Version.",
    "image": "ausruestung/B897.jpg",
    "max_copies": 1,
    "collector": "B897",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_grenzsiegel_898",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Grenzsiegel",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 DEF, solange du eine Unterstützung im Feld hast.",
    "effects": [
      {
        "code": "EQUIP_COND_DEF",
        "param": {
          "def": 2,
          "ifSupport": true
        }
      }
    ],
    "flavor": "Siegel am Grenzspiel.",
    "image": "ausruestung/B898.jpg",
    "max_copies": 1,
    "collector": "B898",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_lagezeichen_899",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Lagezeichen",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK/+1 DEF; einmal/Zug: eine verdeckte Einheit hier erhält +1 DEF beim Aufdecken.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 1
        }
      },
      {
        "code": "EQUIP_REVEAL_ALLY_DEF",
        "param": {
          "def": 1
        }
      }
    ],
    "flavor": "Lagezeichen. Markiert, was fehlen soll.",
    "image": "ausruestung/B899.jpg",
    "max_copies": 1,
    "collector": "B899",
    "rarity": "gold"
  },
  {
    "id": "dc_b_fallakte_900",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Fallakte",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Akte eines Falls. Keine Fahne.",
    "image": "ausruestung/B900.jpg",
    "max_copies": 1,
    "collector": "B900",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_offene_zeile_951",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Offene Zeile",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 ATK. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 0
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Manschette. Schwarze Zeile.",
    "image": "ausruestung/B951.jpg",
    "max_copies": 1,
    "collector": "B951",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_abschriftmappe_952",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Abschriftmappe",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      }
    ],
    "flavor": "Mappe gegen die Halle.",
    "image": "ausruestung/B952.jpg",
    "max_copies": 1,
    "collector": "B952",
    "rarity": "silver"
  },
  {
    "id": "dc_b_nussrock_953",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Nussrock",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Zerstört der Träger im Angriff eine Einheit: heile 1 an deiner am stärksten beschädigten Einheit.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "kill",
          "do": "heal",
          "n": 1
        }
      }
    ],
    "flavor": "Rock nussbraun. Gerade.",
    "image": "ausruestung/B953.jpg",
    "max_copies": 1,
    "collector": "B953",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_vorlesegeraet_954",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Vorlesegerät",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 ATK. Einmal pro Zug: Spielst du einen Soforteinsatz, ziehe 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 0
        }
      },
      {
        "code": "EQUIP_SOFT_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Gerät liest. Streicht nicht.",
    "image": "ausruestung/B954.jpg",
    "max_copies": 1,
    "collector": "B954",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_stillmanschette_955",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Stillmanschette",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK und +1 DEF. Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 1
        }
      },
      {
        "code": "EQUIP_HEAL_ONCE",
        "param": {
          "heal": 1,
          "perTurn": true
        }
      }
    ],
    "flavor": "Manschette von Stillschuld.",
    "image": "ausruestung/B955.jpg",
    "max_copies": 1,
    "collector": "B955",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kal_feder_956",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Kal-Feder",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF. Einmal pro Zug: Spielst du einen Soforteinsatz, ziehe 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "EQUIP_SOFT_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Kal-Feder. Setzt. Vergibt nicht.",
    "image": "ausruestung/B956.jpg",
    "max_copies": 1,
    "collector": "B956",
    "rarity": "silver"
  },
  {
    "id": "dc_b_faelligkeitsmarke_957",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Fälligkeitsmarke",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 2.",
    "effects": [
      {
        "code": "EQUIP_HEAL_ONCE",
        "param": {
          "heal": 2,
          "perTurn": true
        }
      }
    ],
    "flavor": "Marke eines Datums.",
    "image": "ausruestung/B957.jpg",
    "max_copies": 1,
    "collector": "B957",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_haussiegel_958",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Haussiegel",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Siegel am haftenden Haus.",
    "image": "ausruestung/B958.jpg",
    "max_copies": 1,
    "collector": "B958",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schuldzeichen_959",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Schuldzeichen",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK/+1 DEF; einmal/Zug: Einheit hier +1 DEF; wenn sie diesen Zug einen Kill hat → ziehe 1.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 1
        }
      },
      {
        "code": "EQUIP_KILL_DRAW_BUFF",
        "param": {
          "sectionDef": 1,
          "draw": 1
        }
      }
    ],
    "flavor": "Schuldzeichen. Offen bis zum Abschluss.",
    "image": "ausruestung/B959.jpg",
    "max_copies": 1,
    "collector": "B959",
    "rarity": "gold"
  },
  {
    "id": "dc_b_fallakte_960",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Schuldakte",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      }
    ],
    "flavor": "Akte eines Falls. Kein Wappen.",
    "image": "ausruestung/B960.jpg",
    "max_copies": 1,
    "collector": "B960",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kronenspiegel_771",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Kronenspiegel",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF. Einmal pro Zug: Spielst du einen Soforteinsatz, ziehe 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "EQUIP_SOFT_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Spiegel zeigt Pflicht, nicht Glanz.",
    "image": "ausruestung/B771.jpg",
    "max_copies": 1,
    "collector": "B771",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_bindungszeichen_772",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Bindungszeichen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      }
    ],
    "flavor": "Zeichen beider Dächer.",
    "image": "ausruestung/B772.jpg",
    "max_copies": 1,
    "collector": "B772",
    "rarity": "silver"
  },
  {
    "id": "dc_b_steingruenmantel_773",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Steingrünmantel",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 DEF, solange du eine Unterstützung im Feld hast. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_COND_DEF",
        "param": {
          "def": 2,
          "ifSupport": true
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Steingrün. Dauerfarbe.",
    "image": "ausruestung/B773.jpg",
    "max_copies": 1,
    "collector": "B773",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zeughausschluessel_774",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Zeughausschlüssel",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF, solange du eine Unterstützung im Feld hast. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_COND_DEF",
        "param": {
          "def": 1,
          "ifSupport": true
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Schlüssel zum Gerät über Jahre.",
    "image": "ausruestung/B774.jpg",
    "max_copies": 1,
    "collector": "B774",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_markenkragen_775",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Markenkragen",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 DEF, solange du eine Unterstützung im Feld hast.",
    "effects": [
      {
        "code": "EQUIP_COND_DEF",
        "param": {
          "def": 2,
          "ifSupport": true
        }
      }
    ],
    "flavor": "Kragen ab — Rückkehr ins Dorf.",
    "image": "ausruestung/B775.jpg",
    "max_copies": 1,
    "collector": "B775",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_parlamentsstempel_776",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Parlamentsstempel",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 2.",
    "effects": [
      {
        "code": "EQUIP_HEAL_ONCE",
        "param": {
          "heal": 2,
          "perTurn": true
        }
      }
    ],
    "flavor": "Stempel bremst den eiligen Ruf.",
    "image": "ausruestung/B776.jpg",
    "max_copies": 1,
    "collector": "B776",
    "rarity": "silver"
  },
  {
    "id": "dc_b_oelflasche_777",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Ölflasche",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Öl für Lafetten. Kein Denkmal.",
    "image": "ausruestung/B777.jpg",
    "max_copies": 1,
    "collector": "B777",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_grenzmarke_778",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Grenzmarke",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK und +1 DEF. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 1
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
    "flavor": "Marke der alten Grenze.",
    "image": "ausruestung/B778.jpg",
    "max_copies": 1,
    "collector": "B778",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_doppelhaus_siegel_779",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Doppelhaus-Siegel",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF, solange du eine Unterstützung im Feld hast.",
    "effects": [
      {
        "code": "EQUIP_COND_DEF",
        "param": {
          "def": 1,
          "ifSupport": true
        }
      }
    ],
    "flavor": "Siegel beider Häuser — Dauer.",
    "image": "ausruestung/B779.jpg",
    "max_copies": 1,
    "collector": "B779",
    "rarity": "gold"
  },
  {
    "id": "dc_b_aktenmappe_780",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Kronakte",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
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
    "flavor": "Mappe vor Trinkspruch.",
    "image": "ausruestung/B780.jpg",
    "max_copies": 1,
    "collector": "B780",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_spare_paspel_213",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Spare Paspel",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK und +2 DEF.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 2
        }
      }
    ],
    "flavor": "Hell am Schnitt. Staub am Stoff.",
    "image": "ausruestung/B213.jpg",
    "max_copies": 1,
    "collector": "B213",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_marschkette_214",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Marschkette",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 ATK. Einmal pro Zug: Spielst du einen Soforteinsatz, ziehe 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 0
        }
      },
      {
        "code": "EQUIP_SOFT_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Kette für den Weg, nicht fürs Amt.",
    "image": "ausruestung/B214.jpg",
    "max_copies": 1,
    "collector": "B214",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kai_optik_215",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Kai-Optik",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.",
    "effects": [
      {
        "code": "EQUIP_HEAL_ONCE",
        "param": {
          "heal": 1,
          "perTurn": true
        }
      }
    ],
    "flavor": "Sehen, ob der Kai noch Land ist.",
    "image": "ausruestung/B215.jpg",
    "max_copies": 1,
    "collector": "B215",
    "rarity": "silver"
  },
  {
    "id": "dc_b_lizenzsiegel_216",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Lizenzsiegel",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 0,
          "when": "still",
          "def": 1
        }
      }
    ],
    "flavor": "Siegel des Staates — nicht des Hauses.",
    "image": "ausruestung/B216.jpg",
    "max_copies": 1,
    "collector": "B216",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_etappenplatte_217",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Etappenplatte",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Kostet 1 AP weniger (mind. 0), solange du eine Unterstützung hast. Beim Anlegen: ziehe 1.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 0
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "support"
        }
      },
      {
        "code": "ON_ENTER_DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Halten vor Stoßen.",
    "image": "ausruestung/B217.jpg",
    "max_copies": 1,
    "collector": "B217",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_munitionskai_218",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Munitionskai",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
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
    "flavor": "Ladung, die den Kai erreichbar hält.",
    "image": "ausruestung/B218.jpg",
    "max_copies": 1,
    "collector": "B218",
    "rarity": "silver"
  },
  {
    "id": "dc_b_wartezettel_219",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Wartezettel",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF. Kostet 1 AP weniger (mind. 0), solange du eine Unterstützung hast. Beim Anlegen: ziehe 1.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "support"
        }
      },
      {
        "code": "ON_ENTER_DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Zettel neben der Ware — oder nicht.",
    "image": "ausruestung/B219.jpg",
    "max_copies": 1,
    "collector": "B219",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kaliberkiste_ferne_220",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Kaliberkiste Ferne",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK. Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "EQUIP_HEAL_ONCE",
        "param": {
          "heal": 1,
          "perTurn": true
        }
      }
    ],
    "flavor": "Dieselbe Frist für alle.",
    "image": "ausruestung/B220.jpg",
    "max_copies": 1,
    "collector": "B220",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_clip_kronenhof_221",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Clip Kronenhof",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
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
    "flavor": "Drängen ohne beschließen.",
    "image": "ausruestung/B221.jpg",
    "max_copies": 1,
    "collector": "B221",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_stempel_erreichbar_222",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Stempel Erreichbar",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK und +1 DEF, wenn er in diesem Zug versetzt wurde.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "moved",
          "def": 1
        }
      }
    ],
    "flavor": "Erreichbar, solange der Weg fährt.",
    "image": "ausruestung/B222.jpg",
    "max_copies": 1,
    "collector": "B222",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_marktvertrag_711",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Marktvertrag",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK, wenn du in diesem Zug einen Soforteinsatz gespielt hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "played:Soforteinsatz"
        }
      }
    ],
    "flavor": "Vertrag vor Schlag.",
    "image": "ausruestung/B711.jpg",
    "max_copies": 1,
    "collector": "B711",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_offener_knoten_712",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Offener Knoten",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF, solange du eine Unterstützung im Feld hast. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_COND_DEF",
        "param": {
          "def": 1,
          "ifSupport": true
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Knoten offen — Mode und Gesetz.",
    "image": "ausruestung/B712.jpg",
    "max_copies": 1,
    "collector": "B712",
    "rarity": "silver"
  },
  {
    "id": "dc_b_sandmantel_713",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Sandmantel",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF. Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "EQUIP_HEAL_ONCE",
        "param": {
          "heal": 1,
          "perTurn": true
        }
      }
    ],
    "flavor": "Sandfarbe. Perlen sagen die Stadt.",
    "image": "ausruestung/B713.jpg",
    "max_copies": 1,
    "collector": "B713",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zollzeichen_714",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Zollzeichen",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK; +1 DEF mit einer weiteren eigenen Einheit im Abschnitt.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 0,
          "when": "pair",
          "def": 1
        }
      }
    ],
    "flavor": "Zeichen am Gürtel. Kein Thron.",
    "image": "ausruestung/B714.jpg",
    "max_copies": 1,
    "collector": "B714",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_packsattel_715",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Packsattel",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
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
    "flavor": "Sattel trägt. Er regiert nicht.",
    "image": "ausruestung/B715.jpg",
    "max_copies": 1,
    "collector": "B715",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_passschluessel_716",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Passschlüssel",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF; +1 ATK bei eigener Überzahl in seinem Abschnitt.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "superior"
        }
      }
    ],
    "flavor": "Schlüssel öffnet Pass — nicht Herrschaft.",
    "image": "ausruestung/B716.jpg",
    "max_copies": 1,
    "collector": "B716",
    "rarity": "silver"
  },
  {
    "id": "dc_b_tuchknoten_717",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Tuchknoten",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF mit einer weiteren eigenen Einheit im Abschnitt. Einmal pro Zug: Erleidet er Schaden, heilt er danach 1.",
    "effects": [
      {
        "code": "EQUIP_HEAL_ONCE",
        "param": {
          "heal": 1,
          "perTurn": true
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 0,
          "when": "pair",
          "def": 1
        }
      }
    ],
    "flavor": "Tuch offen gebunden.",
    "image": "ausruestung/B717.jpg",
    "max_copies": 1,
    "collector": "B717",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_wegmarke_718",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Wegmarke",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 DEF.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 2
        }
      }
    ],
    "flavor": "Marke zeigt Umweg.",
    "image": "ausruestung/B718.jpg",
    "max_copies": 1,
    "collector": "B718",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_endlose_kolonne_719",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Endlose Kolonne",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK, +1 DEF.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 1
        }
      }
    ],
    "flavor": "Kolonne ohne Ende — solange sie fährt.",
    "image": "ausruestung/B719.jpg",
    "max_copies": 1,
    "collector": "B719",
    "rarity": "gold"
  },
  {
    "id": "dc_b_satteltasche_720",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Satteltasche",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_HEAL_ONCE",
        "param": {
          "heal": 1,
          "perTurn": true
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Tasche voll. Straße leer wäre Niederlage.",
    "image": "ausruestung/B720.jpg",
    "max_copies": 1,
    "collector": "B720",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zielskizze_591",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Zielskizze",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK gegen beobachtete Ziele.",
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
    "flavor": "Skizze vor Schuss.",
    "image": "ausruestung/B591.jpg",
    "max_copies": 1,
    "collector": "B591",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_dienstbuch_592",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Dienstbuch",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Kostet 1 AP weniger (mind. 0), solange du eine Unterstützung hast. Beim Anlegen: decke 1 verdeckten Feind auf.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 0
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "support"
        }
      },
      {
        "code": "REVEAL",
        "param": {
          "count": 1
        }
      }
    ],
    "flavor": "Buch vor Uniform.",
    "image": "ausruestung/B592.jpg",
    "max_copies": 1,
    "collector": "B592",
    "rarity": "silver"
  },
  {
    "id": "dc_b_normhelm_593",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Normhelm",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK und +1 DEF. Einmal pro Zug: Spielst du einen Soforteinsatz, ziehe 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 1
        }
      },
      {
        "code": "EQUIP_SOFT_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Helm nach Liste.",
    "image": "ausruestung/B593.jpg",
    "max_copies": 1,
    "collector": "B593",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_freigabestempel_594",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Freigabestempel",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK. Kostet 1 AP weniger, solange du eine offene Unterstützung hast.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "support"
        }
      }
    ],
    "flavor": "Stempel öffnet Depot.",
    "image": "ausruestung/B594.jpg",
    "max_copies": 1,
    "collector": "B594",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_normgewehr_595",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Normgewehr",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Kostet 1 AP weniger (mind. 0), solange eigene Infanterie an der Front steht. Beim Anlegen: ziehe 1.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 0
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "cost",
          "delta": -1,
          "when": "unit:infanterie"
        }
      },
      {
        "code": "ON_ENTER_DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Gewehr wartbar. Gleich genug.",
    "image": "ausruestung/B595.jpg",
    "max_copies": 1,
    "collector": "B595",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_aktenmappe_596",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Dienstmappe",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF. Beim Anlegen: decke eine verdeckte gegnerische Einheit auf.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "REVEAL",
        "param": {
          "count": 1
        }
      }
    ],
    "flavor": "Mappe schwer. Wetter gewöhnlich.",
    "image": "ausruestung/B596.jpg",
    "max_copies": 1,
    "collector": "B596",
    "rarity": "silver"
  },
  {
    "id": "dc_b_messlatte_597",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Messlatte",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_HEAL_ONCE",
        "param": {
          "heal": 1,
          "perTurn": true
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Maß statt Mythos.",
    "image": "ausruestung/B597.jpg",
    "max_copies": 1,
    "collector": "B597",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zielzuweisung_598",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Zielzuweisung",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 ATK. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 0
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Zuweisung vor Meinung.",
    "image": "ausruestung/B598.jpg",
    "max_copies": 1,
    "collector": "B598",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_normverband_599",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Verbandsabzeichen",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK und +1 DEF, solange eigene Infanterie benachbart ist und eigene Artillerie steht.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "def": 1,
          "when": "adj:infanterie&unit:artillerie"
        }
      }
    ],
    "flavor": "Normverband — Maß am Mann, nicht am Mut.",
    "image": "ausruestung/B599.jpg",
    "max_copies": 1,
    "collector": "B599",
    "rarity": "gold"
  },
  {
    "id": "dc_b_freigabeformular_600",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Freigabeformular",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF, solange du eine Unterstützung im Feld hast.",
    "effects": [
      {
        "code": "EQUIP_COND_DEF",
        "param": {
          "def": 1,
          "ifSupport": true
        }
      }
    ],
    "flavor": "Formular vor Marsch.",
    "image": "ausruestung/B600.jpg",
    "max_copies": 1,
    "collector": "B600",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kaikiste_531",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Kaikiste",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK, solange du eine offene Unterstützung hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "support"
        }
      }
    ],
    "flavor": "Kiste vom Kai.",
    "image": "ausruestung/B531.jpg",
    "max_copies": 1,
    "collector": "B531",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_ladungsliste_532",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Ladungsliste",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Kostet 1 AP weniger, wenn du eine Unterstützung im Feld hast.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 0,
          "costReduce": 1,
          "ifSupportSection": true
        }
      }
    ],
    "flavor": "Liste lügt um denselben Anteil.",
    "image": "ausruestung/B532.jpg",
    "max_copies": 1,
    "collector": "B532",
    "rarity": "silver"
  },
  {
    "id": "dc_b_dunkelblau_533",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Dunkelblau",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.",
    "effects": [
      {
        "code": "EQUIP_HEAL_ONCE",
        "param": {
          "heal": 1,
          "perTurn": true
        }
      }
    ],
    "flavor": "Dunkelblau nur hier.",
    "image": "ausruestung/B533.jpg",
    "max_copies": 1,
    "collector": "B533",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_marinekrause_534",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Marinekrause",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK nach Entsatz-Zug (Abschnitt zuletzt angegriffen).",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      }
    ],
    "flavor": "Krause. Keine Sterne.",
    "image": "ausruestung/B534.jpg",
    "max_copies": 1,
    "collector": "B534",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kranzeichen_535",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Kranzeichen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Beim Anlegen: ziehe 1 Karte.",
    "effects": [
      {
        "code": "ON_ENTER_DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Zeichen am Kran.",
    "image": "ausruestung/B535.jpg",
    "max_copies": 1,
    "collector": "B535",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_wegjacke_536",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Wegjacke",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK und +1 DEF, solange du eine offene Unterstützung hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "support",
          "def": 1
        }
      }
    ],
    "flavor": "Jacke der Wegtruppen.",
    "image": "ausruestung/B536.jpg",
    "max_copies": 1,
    "collector": "B536",
    "rarity": "silver"
  },
  {
    "id": "dc_b_zollsaeckchen_537",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Zollsäckchen",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 2. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_HEAL_ONCE",
        "param": {
          "heal": 2,
          "perTurn": true
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Anteil im Säckchen.",
    "image": "ausruestung/B537.jpg",
    "max_copies": 1,
    "collector": "B537",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_fahrplan_538",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Fahrplan",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      }
    ],
    "flavor": "Fahrplan neben der Stellung.",
    "image": "ausruestung/B538.jpg",
    "max_copies": 1,
    "collector": "B538",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_entsatz_539",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Entsatzpaket",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK/+1 DEF, wenn er in einen zuletzt angegriffenen Abschnitt rückt.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 1
        }
      }
    ],
    "flavor": "Entsatz — wer hält, wird geholt, nicht gefeiert.",
    "image": "ausruestung/B539.jpg",
    "max_copies": 1,
    "collector": "B539",
    "rarity": "gold"
  },
  {
    "id": "dc_b_restschein_540",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Restschein",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK; wenn Unterstützung: ziehe 1 beim Angriff.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "EQUIP_DRAW_ON_ATTACK",
        "param": {
          "draw": 1,
          "ifSupport": true
        }
      }
    ],
    "flavor": "Schein über den Rest.",
    "image": "ausruestung/B540.jpg",
    "max_copies": 1,
    "collector": "B540",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_talposten_252",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Talposten",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF, solange er allein im Abschnitt steht.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 0,
          "def": 1,
          "when": "alone"
        }
      }
    ],
    "flavor": "Posten des Tals. Kein Amt.",
    "image": "ausruestung/B252.jpg",
    "max_copies": 1,
    "collector": "B252",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_steinwurf_253",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Steinwurf",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "entering"
        }
      }
    ],
    "flavor": "Stein aus dem eigenen Hang.",
    "image": "ausruestung/B253.jpg",
    "max_copies": 1,
    "collector": "B253",
    "rarity": "silver"
  },
  {
    "id": "dc_b_schieferumhang_254",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Schieferumhang",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 ATK. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 0
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
    "flavor": "Wetter und Tarnung. Kein Pelz.",
    "image": "ausruestung/B254.jpg",
    "max_copies": 1,
    "collector": "B254",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_passoptik_255",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Passoptik",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Nur an Aufklärung oder Artillerie. +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 0,
          "only": "artillerie|aufklaerung"
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "entering"
        }
      }
    ],
    "flavor": "Sehen, wer den Zoll umgeht.",
    "image": "ausruestung/B255.jpg",
    "max_copies": 1,
    "collector": "B255",
    "rarity": "silver"
  },
  {
    "id": "dc_b_tunnelplatte_256",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Tunnelplatte",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 ATK. Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 0
        }
      },
      {
        "code": "EQUIP_HEAL_ONCE",
        "param": {
          "heal": 1,
          "perTurn": true
        }
      }
    ],
    "flavor": "Halten in der Enge.",
    "image": "ausruestung/B256.jpg",
    "max_copies": 1,
    "collector": "B256",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_leserklammer_257",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Leserklammer",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Zu Beginn deines Zuges: Hat der Träger im letzten Zug nicht angegriffen, heilt er 2.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "turnheal",
          "n": 2,
          "scope": "self",
          "when": "rested"
        }
      }
    ],
    "flavor": "Namen und Datum. Abschrift mitnehmen.",
    "image": "ausruestung/B257.jpg",
    "max_copies": 1,
    "collector": "B257",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_engenkette_258",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Engenkette",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 DEF, solange er allein im Abschnitt steht.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 0,
          "when": "alone",
          "def": 2
        }
      }
    ],
    "flavor": "Kette für den Pass, nicht fürs Depot.",
    "image": "ausruestung/B258.jpg",
    "max_copies": 1,
    "collector": "B258",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_hangladung_259",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Hangladung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
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
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Ladung aus dem Tal.",
    "image": "ausruestung/B259.jpg",
    "max_copies": 1,
    "collector": "B259",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_eidstempel_260",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Eidstempel",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 ATK. Träger +1 DEF, wenn er seit deinem letzten Zug nicht versetzt wurde.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 0
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
    "flavor": "Stempel ohne Sitz.",
    "image": "ausruestung/B260.jpg",
    "max_copies": 1,
    "collector": "B260",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_verbundnadel_261",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Verbundnadel",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK und +1 DEF, solange eine weitere eigene Einheit im Abschnitt steht.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "def": 1,
          "when": "pair"
        }
      }
    ],
    "flavor": "Nadel der Nähe. Nicht der Mitte.",
    "image": "ausruestung/B261.jpg",
    "max_copies": 1,
    "collector": "B261",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_verbandskasten_351",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Verbandskasten",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger heilt 1 am Zugende, wenn er nicht angriff.",
    "effects": [
      {
        "code": "EQUIP_ON_REST",
        "param": {
          "heal": 1
        }
      }
    ],
    "flavor": "Kasten vor dem Angriff.",
    "image": "ausruestung/B351.jpg",
    "max_copies": 1,
    "collector": "B351",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_aktenzeichen_352",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Aktenzeichen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF; einmalig ziehe 1 bei Heilung.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "EQUIP_DRAW_ON_HEAL",
        "param": {
          "draw": 1,
          "once": true
        }
      }
    ],
    "flavor": "Zeichen für Medizin und Kontrolle.",
    "image": "ausruestung/B352.jpg",
    "max_copies": 1,
    "collector": "B352",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_institutionsstoff_353",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Institutionsstoff",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK, +1 DEF.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 1
        }
      }
    ],
    "flavor": "Blassgrün. Feiert nicht. Droht nicht.",
    "image": "ausruestung/B353.jpg",
    "max_copies": 1,
    "collector": "B353",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_feldlager_354",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Lagergepäck",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 DEF, wenn er diesen Zug nicht angreift.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 2
        }
      }
    ],
    "flavor": "Lager ist Etappe.",
    "image": "ausruestung/B354.jpg",
    "max_copies": 1,
    "collector": "B354",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_biometrieband_355",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Biometrieband",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK gegen beobachtete Ziele.",
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
    "flavor": "Findet Verwundete wie Haushalte.",
    "image": "ausruestung/B355.jpg",
    "max_copies": 1,
    "collector": "B355",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schutzplane_356",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Schutzplane",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF. Einmal pro Zug: Erleidet der Träger Schaden, heilt er danach 1.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "EQUIP_HEAL_ONCE",
        "param": {
          "heal": 1,
          "perTurn": true
        }
      }
    ],
    "flavor": "Plane über Bett und Stellung.",
    "image": "ausruestung/B356.jpg",
    "max_copies": 1,
    "collector": "B356",
    "rarity": "silver"
  },
  {
    "id": "dc_b_ruhegeschirr_357",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Ruhegeschirr",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF; nach Ruhezug +1 ATK.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "EQUIP_ON_REST",
        "param": {
          "atk": 1
        }
      }
    ],
    "flavor": "Geschirr der Rasten-Doktrin.",
    "image": "ausruestung/B357.jpg",
    "max_copies": 1,
    "collector": "B357",
    "rarity": "silver"
  },
  {
    "id": "dc_b_notfallpack_358",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Notfallpack",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Einmalig: heile 2; Träger greift diesen Zug nicht an.",
    "effects": [
      {
        "code": "EQUIP_ONCE_HEAL_DESTROY",
        "param": {
          "heal": 2,
          "noDestroy": true,
          "noAttack": true
        }
      }
    ],
    "flavor": "Pack für die Krise, die zusammengehört.",
    "image": "ausruestung/B358.jpg",
    "max_copies": 1,
    "collector": "B358",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_rasten_359",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Ruhezeichen",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF; nach Ruhezug heile 1 und +1 ATK.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "EQUIP_ON_REST",
        "param": {
          "heal": 1,
          "atk": 1
        }
      }
    ],
    "flavor": "Ruhezeichen — die Institution atmet, dann tritt sie.",
    "image": "ausruestung/B359.jpg",
    "max_copies": 1,
    "collector": "B359",
    "rarity": "gold"
  },
  {
    "id": "dc_b_rastenmarke_360",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Rastenmarke",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF; wenn er ruht: heile 1.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "EQUIP_ON_REST",
        "param": {
          "heal": 1
        }
      }
    ],
    "flavor": "Marke der Pause. Kein Faulheitssiegel.",
    "image": "ausruestung/B360.jpg",
    "max_copies": 1,
    "collector": "B360",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_knochenplatte_291",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Knochenplatte",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 ATK.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 2,
          "def": 0
        }
      }
    ],
    "flavor": "Knochen hält, wo Stahl allein nicht reicht.",
    "image": "ausruestung/B291.jpg",
    "max_copies": 1,
    "collector": "B291",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_namensschild_292",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Namensschild",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Stirbt Träger: eigene Einheit im Abschnitt +1 DEF bis Zugende.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "ON_DESTROY_SECTION_DEF",
        "param": {
          "def": 1
        }
      }
    ],
    "flavor": "Name im Dienst am Körper.",
    "image": "ausruestung/B292.jpg",
    "max_copies": 1,
    "collector": "B292",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_erinnerungsmarke_293",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Erinnerungsmarke",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK, wenn in diesem Zug eine eigene Einheit zerstört wurde.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "lost"
        }
      }
    ],
    "flavor": "Erinnerung, keine Erlaubnis.",
    "image": "ausruestung/B293.jpg",
    "max_copies": 1,
    "collector": "B293",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_plattenruestung_294",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Plattenrüstung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +3 DEF.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 3
        }
      }
    ],
    "flavor": "Schutz vor Prunk.",
    "image": "ausruestung/B294.jpg",
    "max_copies": 1,
    "collector": "B294",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schmiedehammer_295",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Schmiedehammer",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK; Infanterie-Träger zusätzlich +1 DEF.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 0,
          "when": "is:infanterie",
          "def": 1
        }
      }
    ],
    "flavor": "Werkstatt vor Feldzeichen.",
    "image": "ausruestung/B295.jpg",
    "max_copies": 1,
    "collector": "B295",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schwere_platte_296",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Schwere Platte",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK und +1 DEF. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 1
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Schwer genug. Nicht voller.",
    "image": "ausruestung/B296.jpg",
    "max_copies": 1,
    "collector": "B296",
    "rarity": "silver"
  },
  {
    "id": "dc_b_knochennagel_297",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Knochennagel",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Halten und antworten.",
    "image": "ausruestung/B297.jpg",
    "max_copies": 1,
    "collector": "B297",
    "rarity": "silver"
  },
  {
    "id": "dc_b_linse_298",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Linse",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Aufklärung/Elite: Feind aufdecken; Träger +1 DEF.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1,
          "only": "aufklaerung|elite"
        }
      },
      {
        "code": "REVEAL_STRIKE"
      }
    ],
    "flavor": "Sieht für die Lebenden.",
    "image": "ausruestung/B298.jpg",
    "max_copies": 1,
    "collector": "B298",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_gepanzerter_fuss_299",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Panzerstiefel",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Infanterie-Träger +1 ATK und +1 DEF. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 1
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Gepanzerter Fuß — Platte und Schritt der Ossaria.",
    "image": "ausruestung/B299.jpg",
    "max_copies": 1,
    "collector": "B299",
    "rarity": "gold"
  },
  {
    "id": "dc_b_maskenplatte_300",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Maskenplatte",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF; Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu 1 verringert. Danach ist dieser Schutz verbraucht. Nicht verhinderbarer Schaden bleibt nicht verhinderbar.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "EQUIP_NEGATE_DAMAGE",
        "param": {
          "amount": 1,
          "once": true
        }
      }
    ],
    "flavor": "Maske kenntlich. Nicht Priester.",
    "image": "ausruestung/B300.jpg",
    "max_copies": 1,
    "collector": "B300",
    "rarity": "bronze",
    "rules": []
  },
  {
    "id": "dc_b_messgeraet_471",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Messgerät",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK, +1 DEF; gegen beobachtete Ziele +1 ATK zusätzlich.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 1
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "observed"
        }
      }
    ],
    "flavor": "Gerät misst. Es urteilt nicht.",
    "image": "ausruestung/B471.jpg",
    "max_copies": 1,
    "collector": "B471",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zielmarkierer_472",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Zielmarkierer",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Angriffe gegen Träger: Angreifer gilt als aufgeklärt.",
    "effects": [
      {
        "code": "REVEAL_STRIKE"
      }
    ],
    "flavor": "Marke am Körper — nicht am Wert.",
    "image": "ausruestung/B472.jpg",
    "max_copies": 1,
    "collector": "B472",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_technische_linie_473",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Technische Linie",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 ATK. Einmal pro Zug: Spielst du einen Soforteinsatz, ziehe 1 Karte. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 1,
          "def": 0
        }
      },
      {
        "code": "EQUIP_SOFT_DRAW",
        "param": {
          "draw": 1
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Helles Grau. Dünne Linie.",
    "image": "ausruestung/B473.jpg",
    "max_copies": 1,
    "collector": "B473",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_sensorbrille_474",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Sensorbrille",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger deckt einmal/Zug kostenlos auf.",
    "effects": [
      {
        "code": "HAND_PEEK",
        "param": {
          "free": true
        }
      }
    ],
    "flavor": "Sehen ohne Herrschaft.",
    "image": "ausruestung/B474.jpg",
    "max_copies": 1,
    "collector": "B474",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_probenkoffer_475",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Probenkoffer",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Beim Anlegen: markiere 1 Feind als beobachtet. Wird der Träger zerstört, ziehst du 1 Karte.",
    "effects": [
      {
        "code": "REVEAL",
        "param": {
          "count": 1,
          "observe": true
        }
      },
      {
        "code": "ON_DESTROY_DRAW",
        "param": {
          "draw": 1
        }
      }
    ],
    "flavor": "Koffer der Probe.",
    "image": "ausruestung/B475.jpg",
    "max_copies": 1,
    "collector": "B475",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_leitrechner_476",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Leitrechner",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF; +1 ATK gegen beobachtete Ziele.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 1,
          "vs": "observed"
        }
      }
    ],
    "flavor": "Rechner hilft. Er regiert nicht.",
    "image": "ausruestung/B476.jpg",
    "max_copies": 1,
    "collector": "B476",
    "rarity": "silver"
  },
  {
    "id": "dc_b_abbruchsiegel_477",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Abbruchsiegel",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger: einmalig Angriff abbrechen → heile 2 und ziehe 1.",
    "effects": [
      {
        "code": "EQUIP_ONCE_HEAL_DESTROY",
        "param": {
          "heal": 2,
          "noDestroy": true
        }
      },
      {
        "code": "ON_ENTER_DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Siegel des Abbruchs.",
    "image": "ausruestung/B477.jpg",
    "max_copies": 1,
    "collector": "B477",
    "rarity": "silver"
  },
  {
    "id": "dc_b_feldprotokoll_478",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Feldprotokoll",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +1 DEF; bei Aufdecken: +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "EQUIP_STAT",
        "param": {
          "atk": 0,
          "def": 1
        }
      },
      {
        "code": "EQUIP_ON_REVEAL_ATK",
        "param": {
          "atk": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Protokoll vor Pathos.",
    "image": "ausruestung/B478.jpg",
    "max_copies": 1,
    "collector": "B478",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_punktfeuer_479",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Punktvisier",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger +2 ATK gegen beobachtete Ziele.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "vs",
          "atk": 2,
          "vs": "observed"
        }
      }
    ],
    "flavor": "Punktvisier — ein Rohr, ein Name, ein Treffer.",
    "image": "ausruestung/B479.jpg",
    "max_copies": 1,
    "collector": "B479",
    "rarity": "gold"
  },
  {
    "id": "dc_b_lokalisierung_480",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Ausrüstung",
    "klasse": "Ausrüstung",
    "name": "Ortungsband",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "ausruestung"
    ],
    "text": "Träger deckt auf beim Angriff; Ziel −1 DEF.",
    "effects": [
      {
        "code": "REVEAL_STRIKE"
      },
      {
        "code": "EQUIP_ON_ATTACK_DAMAGE",
        "param": {
          "debuffDef": 1
        }
      }
    ],
    "flavor": "Ort festnageln.",
    "image": "ausruestung/B480.jpg",
    "max_copies": 1,
    "collector": "B480",
    "rarity": "bronze"
  }
];
