/**
 * Karteneditor-Kopie: Aufklärungs-Einheiten (Katalog). Nur Daten, keine Spiellogik.
 *
 * Keine Kommentare pro Karte (zu umfangreich). Änderungen an Werten oder
 * Effekten sind Regeländerungen und gehören nicht in diese Aufräumung.
 */
window.DC_SET_TYPES = window.DC_SET_TYPES || {};
window.DC_SET_TYPES["Aufklärung"] = [
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
  }
];
