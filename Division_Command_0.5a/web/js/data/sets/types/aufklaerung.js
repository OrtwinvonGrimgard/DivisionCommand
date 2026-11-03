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
    "collector": "A048"
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
    "collector": "A068"
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
    "collector": "A069"
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
    "collector": "A070"
  },
  {
    "id": "dc_b_pfadwaechter",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Einheit",
    "name": "Pfadwächter",
    "ap": 1,
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklärer"
    ],
    "text": "Wenn gespielt: markiere einen angrenzenden Abschnitt.",
    "effects": [],
    "flavor": "Er kennt jeden Tritt.",
    "image": "aufklaerung/B224.jpg",
    "max_copies": 1,
    "collector": "B224",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_talspaeher",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Einheit",
    "name": "Talspäher",
    "ap": 1,
    "atk": 1,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "aufklärer"
    ],
    "text": "Wenn allein: ziehe eine Karte, dann wirf eine ab.",
    "effects": [],
    "flavor": "Augen im Tal.",
    "image": "aufklaerung/B226.jpg",
    "max_copies": 1,
    "collector": "B226",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_waldschatten",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Einheit",
    "name": "Waldschatten",
    "ap": 1,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "aufklärer"
    ],
    "text": "Verdeckt spielbar. Wenn aufgedeckt beim Einrücken eines Feindes: +2 ATK einmalig.",
    "effects": [],
    "flavor": "Erst der Schatten, dann der Stoß.",
    "image": "aufklaerung/B230.jpg",
    "max_copies": 1,
    "collector": "B230",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_aufklaerer_424",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Aufklärer",
    "ap": 1,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Deckt beim Spielen eine gegnerische Einheit auf.",
    "effects": [],
    "flavor": "Voraus.",
    "image": "aufklaerung/B424.jpg",
    "max_copies": 1,
    "collector": "B424",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_spaehertrupp_442",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Spähertrupp",
    "ap": 1,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Beim Einrücken: decke ein Ziel im Abschnitt auf.",
    "effects": [],
    "flavor": "Späht voraus.",
    "image": "aufklaerung/B442.jpg",
    "max_copies": 1,
    "collector": "B442",
    "rarity": "bronze"
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
    "text": "Aufdecken: ziehe 1 Karte.",
    "effects": [],
    "flavor": "Sie melden, bevor die Krone fragt.",
    "image": "aufklaerung/B620.jpg",
    "max_copies": 1,
    "collector": "B620",
    "rarity": "bronze"
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
    "text": "+1 ATK gegen verdeckte Einheiten. Kann verdeckt gespielt werden.",
    "effects": [],
    "flavor": "Alte Wege. Neue Augen.",
    "image": "aufklaerung/B621.jpg",
    "max_copies": 1,
    "collector": "B621",
    "rarity": "bronze"
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
    "text": "Wenn eine eigene Einheit im selben Abschnitt zerstört wird: ziehe 1 Karte.",
    "effects": [],
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
    "text": "Einmal pro Zug: schaue die oberste Karte deines Decks an.",
    "effects": [],
    "flavor": "Die jungen Städte sehen ohne Nostalgie.",
    "image": "aufklaerung/B623.jpg",
    "max_copies": 1,
    "collector": "B623",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_arven_spaeher_787",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Arven-Späher",
    "ap": 2,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+2 ATK, wenn das Ziel aufgeklärt ist.",
    "effects": [],
    "flavor": "Arven kennt die Südblicke.",
    "image": "aufklaerung/B787.jpg",
    "max_copies": 1,
    "collector": "B787",
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
    "text": "Aufdecken: schaue die oberste Karte des gegnerischen Decks an.",
    "effects": [],
    "flavor": "Sehen ohne Lid.",
    "image": "aufklaerung/B380.jpg",
    "max_copies": 1,
    "collector": "B380",
    "rarity": "bronze"
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
    "text": "+1 ATK gegen verdeckte Einheiten. Kann verdeckt gespielt werden.",
    "effects": [],
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
    "text": "Wenn eine eigene Einheit im selben Abschnitt Schaden nimmt: ziehe 1.",
    "effects": [],
    "flavor": "Jeder Ausfall ist eine Messung.",
    "image": "aufklaerung/B382.jpg",
    "max_copies": 1,
    "collector": "B382",
    "rarity": "bronze"
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
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "aufklaerung"
    ],
    "text": "Wenn eine eigene Einheit zerstört wird: ziehe 1 und füge einer eigenen Einheit 1 Schaden zu.",
    "effects": [],
    "flavor": "Die Meldung kostet.",
    "image": "aufklaerung/B383.jpg",
    "max_copies": 1,
    "collector": "B383",
    "rarity": "silver"
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
    "text": "Beim Ausspielen: ziehe 1 Karte.",
    "effects": [],
    "flavor": "Meldung aus der Reihe.",
    "image": "aufklaerung/B020.jpg",
    "max_copies": 1,
    "collector": "B020",
    "rarity": "bronze"
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
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "aufklaerung"
    ],
    "text": "+1 ATK gegen Einheiten mit 3 oder weniger DEF.",
    "effects": [],
    "flavor": "Leise Pflicht vor dem Sturm.",
    "image": "aufklaerung/B021.jpg",
    "max_copies": 1,
    "collector": "B021",
    "rarity": "bronze"
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
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "aufklaerung"
    ],
    "text": "Einmal pro Zug: die nächste Infanterie, die du spielst, kostet 1 weniger (mind. 1).",
    "effects": [],
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
    "text": "Beim Ausspielen: eine eigene Infanterie im Abschnitt erhält +1 ATK bis Zugende.",
    "effects": [],
    "flavor": "Wo der Balken geht, folgt die Welle.",
    "image": "aufklaerung/B107.jpg",
    "max_copies": 1,
    "collector": "B107",
    "rarity": "silver"
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
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "Feind aufgeklärt; eigene Artillerie +1 ATK gegen ihn diesen Zug.",
    "effects": [],
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
    "text": "Eigene Einheit stirbt: ziehe 1 (einmal/Zug).",
    "effects": [],
    "flavor": "Er zählt Löcher — für die nächste Lieferung.",
    "image": "aufklaerung/B147.jpg",
    "max_copies": 1,
    "collector": "B147",
    "rarity": "bronze"
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
    "text": "Zerstörst du aufgeklärte Unterstützung/Ausrüstung: ziehe 1.",
    "effects": [],
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
    "text": "Schaue oberste Karte; behalte oder lege unten.",
    "effects": [],
    "flavor": "Wirtschaftliche Lagebilder zählen taktisch mit.",
    "image": "aufklaerung/B149.jpg",
    "max_copies": 1,
    "collector": "B149",
    "rarity": "bronze"
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
    "text": "Feind aufgeklärt; nächstes Schieben kostet 0 zusätzlich.",
    "effects": [],
    "flavor": "Er sieht, ob der Weg noch Land ist.",
    "image": "aufklaerung/B185.jpg",
    "max_copies": 1,
    "collector": "B185",
    "rarity": "bronze"
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
    "text": "Wenn du schiebst: ziehe 1 (einmal/Zug).",
    "effects": [],
    "flavor": "Das Blatt fragt vor allem, ob das Schiff schon da ist.",
    "image": "aufklaerung/B186.jpg",
    "max_copies": 1,
    "collector": "B186",
    "rarity": "bronze"
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
    "atk": 1,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "aufklaerung"
    ],
    "text": "Zerstörst du aufgeklärte Unterstützung: ziehe 1.",
    "effects": [],
    "flavor": "Melden, dass der Weg zu ist — nicht entscheiden.",
    "image": "aufklaerung/B187.jpg",
    "max_copies": 1,
    "collector": "B187",
    "rarity": "silver"
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
    "text": "Schaue oberste Karte; behalte oder lege unten.",
    "effects": [],
    "flavor": "Zwei Pünktlichkeiten. Ein Land.",
    "image": "aufklaerung/B188.jpg",
    "max_copies": 1,
    "collector": "B188",
    "rarity": "bronze"
  }
];
