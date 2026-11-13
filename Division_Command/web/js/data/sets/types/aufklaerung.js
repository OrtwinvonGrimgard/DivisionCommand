/**
 * Aufklärungs-Einheiten (Katalog). Nur Daten, keine Spiellogik.
 *
 * Keine Kommentare pro Karte (zu umfangreich). Änderungen an Werten oder
 * Effekten sind Regeländerungen und gehören nicht in diese Aufräumung.
 */
window.DC_SET_TYPES = window.DC_SET_TYPES || {};
window.DC_SET_TYPES["Aufklärung"] = [
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
    "image": "aufklaerung/A048.jpg",
    "max_copies": 2,
    "collector": "A048",
    "rarity": "bronze"
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
    "image": "aufklaerung/A068.jpg",
    "max_copies": 2,
    "collector": "A068",
    "keywords": [
      "Gefechtsbereit"
    ],
    "rarity": "bronze"
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
    "image": "aufklaerung/A069.jpg",
    "max_copies": 2,
    "collector": "A069",
    "rarity": "bronze"
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
      "leicht"
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
    "image": "aufklaerung/A070.jpg",
    "max_copies": 2,
    "collector": "A070",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zielmesser_146",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Zielmesser",
    "ap": 2,
    "atk": 1,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Benachbarte eigene Artillerie +1 ATK.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "reveal",
          "n": 1
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "aura",
          "scope": "adjacent",
          "atk": 1,
          "filter": "artillerie"
        }
      }
    ],
    "flavor": "Wer misst, verkauft Treffer.",
    "image": "aufklaerung/B146.jpg",
    "max_copies": 1,
    "collector": "B146",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_verbrauchsspaeher_147",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Verbrauchsspäher",
    "ap": 2,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "Einmal pro Zug, wenn eine andere eigene Einheit zerstört wird: ziehe 1 Karte.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "trigger",
          "on": "own_destroyed",
          "do": "draw",
          "n": 1
        }
      }
    ],
    "flavor": "Er zählt Löcher — für die nächste Lieferung.",
    "image": "aufklaerung/B147.jpg",
    "max_copies": 1,
    "collector": "B147",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_depotlaeufer_148",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Depotläufer",
    "ap": 2,
    "atk": 1,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Depots sind Ziele mit Preisschild.",
    "image": "aufklaerung/B148.jpg",
    "max_copies": 1,
    "collector": "B148",
    "rarity": "silver"
  },
  {
    "id": "dc_b_lagebild_149",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Lagebild",
    "ap": 1,
    "atk": 1,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "",
    "effects": [],
    "flavor": "Wirtschaftliche Lagebilder zählen taktisch mit.",
    "image": "aufklaerung/B149.jpg",
    "max_copies": 1,
    "collector": "B149",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_wellenmelder_20",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Wellenmelder",
    "ap": 1,
    "atk": 1,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "aufklaerung"
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
    "flavor": "Meldung aus der Reihe.",
    "image": "aufklaerung/B020.jpg",
    "max_copies": 1,
    "collector": "B020",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_passlaeufer_21",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Passläufer",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "aufklaerung"
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
    "flavor": "Leise Pflicht vor dem Sturm.",
    "image": "aufklaerung/B021.jpg",
    "max_copies": 1,
    "collector": "B021",
    "rarity": "bronze",
    "keywords": [
      "Fernschuss"
    ]
  },
  {
    "id": "dc_b_ritusspaeher_106",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Ritusspäher",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "aufklaerung"
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
    "flavor": "Elena zählt Schritte, nicht Jubel.",
    "image": "aufklaerung/B106.jpg",
    "max_copies": 1,
    "collector": "B106",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_bannerlaeufer_107",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Bannerläufer",
    "ap": 3,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "aufklaerung"
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
    "flavor": "Wo der Balken geht, folgt die Welle.",
    "image": "aufklaerung/B107.jpg",
    "max_copies": 1,
    "collector": "B107",
    "rarity": "silver"
  },
  {
    "id": "dc_b_kronreiter_620",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärer",
    "name": "Kronreiter",
    "ap": 1,
    "atk": 1,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "aufklaerung"
    ],
    "text": "Beim Ausspielen oder Aufdecken: ziehe 1 Karte.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "draw",
          "n": 1
        }
      }
    ],
    "flavor": "Sie melden, bevor die Krone fragt.",
    "image": "aufklaerung/B620.jpg",
    "max_copies": 1,
    "collector": "B620",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit"
    ]
  },
  {
    "id": "dc_b_erbe_spaeher_621",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärer",
    "name": "Erbe-Späher",
    "ap": 2,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "aufklaerung"
    ],
    "text": "",
    "effects": [],
    "flavor": "Alte Wege. Neue Augen.",
    "image": "aufklaerung/B621.jpg",
    "max_copies": 1,
    "collector": "B621",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_stillnarbe_melder_622",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärer",
    "name": "Stillnarbe-Melder",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "aufklaerung"
    ],
    "text": "Einmal pro Zug, wenn eine andere eigene Einheit in ihrem Abschnitt zerstört wird: ziehe 1 Karte.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "trigger",
          "on": "own_destroyed",
          "do": "draw",
          "n": 1,
          "scope": "section"
        }
      }
    ],
    "flavor": "Die Nachricht überlebt den Boten nicht immer.",
    "image": "aufklaerung/B622.jpg",
    "max_copies": 1,
    "collector": "B622",
    "rarity": "silver"
  },
  {
    "id": "dc_b_neuhoff_augen_623",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärer",
    "name": "Neuhoff-Augen",
    "ap": 1,
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "aufklaerung"
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
    "flavor": "Die jungen Städte sehen ohne Nostalgie.",
    "image": "aufklaerung/B623.jpg",
    "max_copies": 1,
    "collector": "B623",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kunstauge_380",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärer",
    "name": "Kunstauge",
    "ap": 1,
    "atk": 1,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "aufklaerung"
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
    "flavor": "Sehen ohne Lid.",
    "image": "aufklaerung/B380.jpg",
    "max_copies": 1,
    "collector": "B380",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit"
    ]
  },
  {
    "id": "dc_b_nervenspaeher_381",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärer",
    "name": "Nervenspäher",
    "ap": 2,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "aufklaerung"
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
    "flavor": "Empfang vor dem Schuss.",
    "image": "aufklaerung/B381.jpg",
    "max_copies": 1,
    "collector": "B381",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_leistungszaehler_382",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärer",
    "name": "Leistungszähler",
    "ap": 1,
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "aufklaerung"
    ],
    "text": "",
    "effects": [],
    "flavor": "Jeder Ausfall ist eine Messung.",
    "image": "aufklaerung/B382.jpg",
    "max_copies": 1,
    "collector": "B382",
    "rarity": "bronze",
    "keywords": [
      "Heranführung",
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_schnitt_melder_383",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärer",
    "name": "Schnitt-Melder",
    "ap": 2,
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "aufklaerung"
    ],
    "text": "",
    "effects": [],
    "flavor": "Die Meldung kostet.",
    "image": "aufklaerung/B383.jpg",
    "max_copies": 1,
    "collector": "B383",
    "rarity": "silver",
    "keywords": [
      "Gefechtsbereit",
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_lina_melder_803",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Lina-Melder",
    "ap": 2,
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Melder vor Ort — Straße neuer als Halle.",
    "image": "aufklaerung/B803.jpg",
    "max_copies": 1,
    "collector": "B803",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_ed_ruh_pfad_804",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Ed-Ruh-Pfad",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Pfad ohne heimliche Leitung.",
    "image": "aufklaerung/B804.jpg",
    "max_copies": 1,
    "collector": "B804",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_lage_offen_805",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Lage-Offen",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Blatt korrigiert laut. Keine stille Akte.",
    "image": "aufklaerung/B805.jpg",
    "max_copies": 1,
    "collector": "B805",
    "rarity": "silver",
    "keywords": [
      "Gefechtsbereit",
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_quellenlaeufer_806",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Quellenläufer",
    "ap": 1,
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Quellen unterscheiden vor Dienstgrad.",
    "image": "aufklaerung/B806.jpg",
    "max_copies": 1,
    "collector": "B806",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit"
    ]
  },
  {
    "id": "dc_b_aktenleser_863",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Aktenleser",
    "ap": 2,
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Liest beide Hälften. Folgt keiner.",
    "image": "aufklaerung/B863.jpg",
    "max_copies": 1,
    "collector": "B863",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_gegenlage_melder_864",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Gegenlage-Melder",
    "ap": 3,
    "atk": 1,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Melder setzt eine Gegenlage.",
    "image": "aufklaerung/B864.jpg",
    "max_copies": 1,
    "collector": "B864",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_doppelversion_865",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Doppelversion",
    "ap": 2,
    "atk": 1,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Zwei gültige Lagen. Beide offiziell.",
    "image": "aufklaerung/B865.jpg",
    "max_copies": 1,
    "collector": "B865",
    "rarity": "silver",
    "keywords": [
      "Fernschuss"
    ]
  },
  {
    "id": "dc_b_stillrain_laeufer_866",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Stillrain-Läufer",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Läufer, der Namen nicht laut sagt.",
    "image": "aufklaerung/B866.jpg",
    "max_copies": 1,
    "collector": "B866",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_abschriftleser_923",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Abschriftleser",
    "ap": 2,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Liest Abschrift gegen Vorlesung.",
    "image": "aufklaerung/B923.jpg",
    "max_copies": 1,
    "collector": "B923",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit"
    ]
  },
  {
    "id": "dc_b_datums_melder_924",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Datums-Melder",
    "ap": 2,
    "atk": 3,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Melder trägt das frühere Datum.",
    "image": "aufklaerung/B924.jpg",
    "max_copies": 1,
    "collector": "B924",
    "rarity": "bronze",
    "keywords": [
      "Heranführung"
    ]
  },
  {
    "id": "dc_b_gegenrechnung_925",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Gegenrechnung",
    "ap": 2,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "",
    "effects": [],
    "flavor": "Gegenrechnung hält Kalden.",
    "image": "aufklaerung/B925.jpg",
    "max_copies": 1,
    "collector": "B925",
    "rarity": "silver",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_selm_laeufer_926",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Selm-Läufer",
    "ap": 1,
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Läufer aus der Lehre.",
    "image": "aufklaerung/B926.jpg",
    "max_copies": 1,
    "collector": "B926",
    "rarity": "bronze",
    "keywords": [
      "Heranführung"
    ]
  },
  {
    "id": "dc_b_markenspaeher_743",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Markenspäher",
    "ap": 2,
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. +1 DEF bei gegnerischer Überzahl im Abschnitt.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "reveal",
          "n": 1
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 0,
          "when": "outnumbered",
          "def": 1
        }
      }
    ],
    "flavor": "Späher zählt Verlust vor Glanz.",
    "image": "aufklaerung/B743.jpg",
    "max_copies": 1,
    "collector": "B743",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_gassenmelder_744",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Gassenmelder",
    "ap": 2,
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "",
    "effects": [],
    "flavor": "Melder aus der Parlamentsgasse.",
    "image": "aufklaerung/B744.jpg",
    "max_copies": 1,
    "collector": "B744",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit",
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_grenzlese_745",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Grenzlese",
    "ap": 2,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "",
    "effects": [],
    "flavor": "Lese die alte Grenze. Nicht die Fahne.",
    "image": "aufklaerung/B745.jpg",
    "max_copies": 1,
    "collector": "B745",
    "rarity": "silver",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_schulrain_laeufer_746",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Schulrain-Läufer",
    "ap": 1,
    "atk": 1,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "",
    "effects": [],
    "flavor": "Schulrain lehrt Dauer, nicht Schlacht.",
    "image": "aufklaerung/B746.jpg",
    "max_copies": 1,
    "collector": "B746",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit",
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_wegspaeher_185",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Wegspäher",
    "ap": 2,
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. +1 ATK, wenn sie in diesem Zug versetzt wurde.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "reveal",
          "n": 1
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "stat",
          "atk": 1,
          "when": "moved"
        }
      }
    ],
    "flavor": "Er sieht, ob der Weg noch Land ist.",
    "image": "aufklaerung/B185.jpg",
    "max_copies": 1,
    "collector": "B185",
    "rarity": "bronze",
    "keywords": [
      "Heranführung"
    ]
  },
  {
    "id": "dc_b_warteblatt_laeufer_186",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Warteblatt-Läufer",
    "ap": 2,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "",
    "effects": [],
    "flavor": "Das Blatt fragt vor allem, ob das Schiff schon da ist.",
    "image": "aufklaerung/B186.jpg",
    "max_copies": 1,
    "collector": "B186",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit",
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_lizenzmelder_187",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Lizenzmelder",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Melden, dass der Weg zu ist — nicht entscheiden.",
    "image": "aufklaerung/B187.jpg",
    "max_copies": 1,
    "collector": "B187",
    "rarity": "silver",
    "keywords": [
      "Heranführung"
    ]
  },
  {
    "id": "dc_b_fahrplanblick_188",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Fahrplanblick",
    "ap": 1,
    "atk": 1,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Zwei Pünktlichkeiten. Ein Land.",
    "image": "aufklaerung/B188.jpg",
    "max_copies": 1,
    "collector": "B188",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_pfadfinder_683",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Pfadfinder",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. +1 ATK bei eigener Überzahl im Abschnitt.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "reveal",
          "n": 1
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
    "flavor": "Finder zeigt den Umweg. Er befiehlt ihn nicht.",
    "image": "aufklaerung/B683.jpg",
    "max_copies": 1,
    "collector": "B683",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zollspaeher_684",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Karawanenspäher",
    "ap": 2,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Späher zählt Zoll und Sperren.",
    "image": "aufklaerung/B684.jpg",
    "max_copies": 1,
    "collector": "B684",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_meldekarawane_685",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Meldekarawane",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Karawane trägt Nachricht und Sack.",
    "image": "aufklaerung/B685.jpg",
    "max_copies": 1,
    "collector": "B685",
    "rarity": "silver"
  },
  {
    "id": "dc_b_abseitslaeufer_686",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Abseitsläufer",
    "ap": 1,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Abseitsheim erinnert: der Fluss ist nicht alles.",
    "image": "aufklaerung/B686.jpg",
    "max_copies": 1,
    "collector": "B686",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_beobachtungsposten_563",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Beobachtungsposten",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "Zu Beginn deines Zuges: markiere 1 Feind als beobachtet.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "turn",
          "do": "observe",
          "n": 1
        }
      }
    ],
    "flavor": "Posten sieht. Er öffnet keinen Krieg.",
    "image": "aufklaerung/B563.jpg",
    "max_copies": 1,
    "collector": "B563",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_feldmesser_564",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Feldmesser",
    "ap": 2,
    "atk": 1,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Maß vor Meinung.",
    "image": "aufklaerung/B564.jpg",
    "max_copies": 1,
    "collector": "B564",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_meldekette_565",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Meldekette",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Kette trägt Schrift. Nicht Befehl.",
    "image": "aufklaerung/B565.jpg",
    "max_copies": 1,
    "collector": "B565",
    "rarity": "silver",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_peiltrupp_566",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Peiltrupp",
    "ap": 1,
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Peilung ohne Claim.",
    "image": "aufklaerung/B566.jpg",
    "max_copies": 1,
    "collector": "B566",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_zollspaeher_503",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Zollspäher",
    "ap": 3,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Zollache kennt den Anteil.",
    "image": "aufklaerung/B503.jpg",
    "max_copies": 1,
    "collector": "B503",
    "rarity": "bronze",
    "keywords": [
      "Heranführung"
    ]
  },
  {
    "id": "dc_b_wegmelder_504",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Wegmelder",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Melder auf der Straße.",
    "image": "aufklaerung/B504.jpg",
    "max_copies": 1,
    "collector": "B504",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_kaihof_auge_505",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Kaihof-Auge",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "",
    "effects": [],
    "flavor": "Auge am Kai. Nicht in der Halle.",
    "image": "aufklaerung/B505.jpg",
    "max_copies": 1,
    "collector": "B505",
    "rarity": "silver",
    "keywords": [
      "Heranführung",
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_restzaehler_506",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Restzähler",
    "ap": 1,
    "atk": 1,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Rest zählen. Nicht die Liste vom Morgen.",
    "image": "aufklaerung/B506.jpg",
    "max_copies": 1,
    "collector": "B506",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_bergfuehrer_224",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Bergführer",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. +1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "reveal",
          "n": 1
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
    "flavor": "Er kennt den Pass. Er führt kein Amt.",
    "image": "aufklaerung/B224.jpg",
    "max_copies": 1,
    "collector": "B224",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_hanglaeufer_225",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Hangläufer",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "+1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.",
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
    "flavor": "Nachrichten laufen mit den Lesern.",
    "image": "aufklaerung/B225.jpg",
    "max_copies": 1,
    "collector": "B225",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_pfadwaechter_226",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Pfadwächter",
    "ap": 2,
    "atk": 1,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "+1 ATK gegen Einheiten, die seit dem letzten Zug eingerückt sind.",
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
    "flavor": "Der Pfad bleibt dem Tal.",
    "image": "aufklaerung/B226.jpg",
    "max_copies": 1,
    "collector": "B226",
    "rarity": "silver"
  },
  {
    "id": "dc_b_abschriftblick_227",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Abschriftblick",
    "ap": 1,
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "",
    "effects": [],
    "flavor": "Wer nur die eigene Abschrift kennt, kennt den Eid nicht.",
    "image": "aufklaerung/B227.jpg",
    "max_copies": 1,
    "collector": "B227",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_meldelaeufer_323",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Meldeläufer",
    "ap": 2,
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Einmal pro Zug: ziehe 1 Karte, sobald du in diesem Zug geheilt hast.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "enter",
          "do": "reveal",
          "n": 1
        }
      },
      {
        "code": "CM",
        "param": {
          "k": "trigger",
          "on": "played",
          "do": "draw",
          "n": 1,
          "when": "healed"
        }
      }
    ],
    "flavor": "Was nicht nach oben geht, gilt als gesund.",
    "image": "aufklaerung/B323.jpg",
    "max_copies": 1,
    "collector": "B323",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_aktenblick_324",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Aktenblick",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "",
    "effects": [],
    "flavor": "Die Zeile vor dem Bett.",
    "image": "aufklaerung/B324.jpg",
    "max_copies": 1,
    "collector": "B324",
    "rarity": "bronze",
    "keywords": [
      "Heranführung",
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_ringwaechter_325",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Ringwächter",
    "ap": 2,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Versorgungsring sieht beide Türen.",
    "image": "aufklaerung/B325.jpg",
    "max_copies": 1,
    "collector": "B325",
    "rarity": "silver",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_formularspaeher_326",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Formularspäher",
    "ap": 1,
    "atk": 1,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Unvollständiges Formular ist Armut hier.",
    "image": "aufklaerung/B326.jpg",
    "max_copies": 1,
    "collector": "B326",
    "rarity": "bronze",
    "keywords": [
      "Fernschuss"
    ]
  },
  {
    "id": "dc_b_linsenlaeufer_263",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Linsenläufer",
    "ap": 2,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Eine Linse. Keine Waage des Lebenswerts.",
    "image": "aufklaerung/B263.jpg",
    "max_copies": 1,
    "collector": "B263",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_grenzmelder_264",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Grenzmelder",
    "ap": 2,
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "Einmal pro Zug, wenn eine andere eigene Einheit zerstört wird: ziehe 1 Karte.",
    "effects": [
      {
        "code": "CM",
        "param": {
          "k": "trigger",
          "on": "own_destroyed",
          "do": "draw",
          "n": 1
        }
      }
    ],
    "flavor": "Meldung in die hellen Häuser.",
    "image": "aufklaerung/B264.jpg",
    "max_copies": 1,
    "collector": "B264",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_hofspaeher_265",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Hofspäher",
    "ap": 2,
    "atk": 1,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "",
    "effects": [],
    "flavor": "Werkhof vor dem Feld.",
    "image": "aufklaerung/B265.jpg",
    "max_copies": 1,
    "collector": "B265",
    "rarity": "silver",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_namensblick_266",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Namensblick",
    "ap": 1,
    "atk": 1,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Sehen, was der Schutz verhindern sollte.",
    "image": "aufklaerung/B266.jpg",
    "max_copies": 1,
    "collector": "B266",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_beobachter_443",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Beobachter",
    "ap": 3,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Sehen, bevor unterschrieben wird.",
    "image": "aufklaerung/B443.jpg",
    "max_copies": 1,
    "collector": "B443",
    "rarity": "bronze",
    "keywords": [
      "Fernschuss"
    ]
  },
  {
    "id": "dc_b_lokalisierer_444",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Lokalisierer",
    "ap": 2,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Ort vor Meinung.",
    "image": "aufklaerung/B444.jpg",
    "max_copies": 1,
    "collector": "B444",
    "rarity": "bronze",
    "keywords": [
      "Fernschuss"
    ]
  },
  {
    "id": "dc_b_methodenspaeher_445",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Methodenspäher",
    "ap": 2,
    "atk": 1,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "",
    "effects": [],
    "flavor": "Verfahren vor Gerücht.",
    "image": "aufklaerung/B445.jpg",
    "max_copies": 1,
    "collector": "B445",
    "rarity": "silver",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_trotzmelder_446",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Aufklärung",
    "name": "Trotzmelder",
    "ap": 1,
    "atk": 1,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
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
    "flavor": "Trotz steht in keiner Spalte.",
    "image": "aufklaerung/B446.jpg",
    "max_copies": 1,
    "collector": "B446",
    "rarity": "bronze"
  }
];
