/**
 * Karteneditor-Kopie: Artillerie-Einheiten (Katalog). Nur Daten, keine Spiellogik. Wird über catalog.js in den Katalog übernommen.
 *
 * Keine Kommentare pro Karte (zu umfangreich). Änderungen an Werten oder
 * Effekten sind Regeländerungen und gehören nicht in diese Aufräumung.
 */
window.DC_SET_TYPES = window.DC_SET_TYPES || {};
window.DC_SET_TYPES["Artillerie"] = [
  {
    "id": "dc_b_abriegelbatterie_882",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Abriegelbatterie",
    "ap": 4,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "artillerie"
    ],
    "text": "Wenn diese Einheit einen leeren Abschnitt beschießen dürfte: eine Einheit, die dort einrückt, erleidet 1 Schaden. +1 DEF.",
    "effects": [],
    "flavor": "Leer halten.",
    "image": "artillerie/B882.jpg",
    "max_copies": 1,
    "collector": "B882",
    "rarity": "silver"
  },
  {
    "id": "dc_b_abschlussgeschuetz_942",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Abschlussgeschütz",
    "ap": 4,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "artillerie"
    ],
    "text": "Wenn diese Einheit ein Ziel zerstört: +1 ATK bis zum Ende deines nächsten Zuges. +1 DEF.",
    "effects": [],
    "flavor": "Zerstört. Weiter.",
    "image": "artillerie/B942.jpg",
    "max_copies": 1,
    "collector": "B942",
    "rarity": "silver"
  },
  {
    "id": "dc_b_auffangbatterie_761",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Auffangbatterie",
    "ap": 4,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "artillerie"
    ],
    "text": "+1 DEF für jede feindliche Einheit im Abschnitt (max. +2). Wenn angegriffen: +1 ATK bis zum Ende deines nächsten Zuges.",
    "effects": [],
    "flavor": "Geschütz, das bleibt.",
    "image": "artillerie/B761.jpg",
    "max_copies": 1,
    "collector": "B761",
    "rarity": "silver"
  },
  {
    "id": "dc_b_aufklaerungsbatterie_821",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Aufklärungsbatterie",
    "ap": 4,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "artillerie"
    ],
    "text": "+1 ATK gegen aufgeklärte Ziele. Wenn diese Einheit Schaden verursacht: ziehe 1 Karte.",
    "effects": [],
    "flavor": "Schlagen, wo die Lage stimmt.",
    "image": "artillerie/B821.jpg",
    "max_copies": 1,
    "collector": "B821",
    "rarity": "silver"
  },
  {
    "id": "dc_b_feldhaubitze",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Feldhaubitze",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "artillerie"
    ],
    "text": "+1 ATK, wenn im Abschnitt ein eigener Panzer steht.",
    "effects": [],
    "flavor": "Rohr hoch. Feuer frei.",
    "image": "artillerie/B165.jpg",
    "max_copies": 1,
    "collector": "B165",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_geschuetzzug",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Geschützzug",
    "ap": 3,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "artillerie"
    ],
    "text": "+1 ATK, wenn im Abschnitt eigene Artillerie steht.",
    "effects": [],
    "flavor": "Neben den Rohren wird jedes Rohr lauter.",
    "image": "artillerie/B040.jpg",
    "max_copies": 1,
    "collector": "B040",
    "rarity": "silver"
  },
  {
    "id": "dc_b_industrieschlag",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Industrieschlag",
    "ap": 5,
    "atk": 6,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "artillerie"
    ],
    "text": "+1 ATK, wenn in diesem Zug eigene Artillerie geschossen hat.",
    "effects": [],
    "flavor": "Als die Artillerie schwieg, fuhr er noch einmal.",
    "image": "artillerie/B036.jpg",
    "max_copies": 1,
    "collector": "B036",
    "rarity": "gold"
  },
  {
    "id": "dc_b_kanoniertrupp",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Kanoniertrupp",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "artillerie"
    ],
    "text": "+1 ATK, wenn im Abschnitt eigene Artillerie steht.",
    "effects": [],
    "flavor": "Sie laden. Du zielst.",
    "image": "artillerie/B154.jpg",
    "max_copies": 1,
    "collector": "B154",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_linienbatterie_703",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Linienbatterie",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "artillerie"
    ],
    "text": "+1 ATK und +1 DEF, wenn du in diesem Abschnitt mindestens zwei Einheiten hast.",
    "effects": [],
    "flavor": "Linie trägt Geschütz.",
    "image": "artillerie/B703.jpg",
    "max_copies": 1,
    "collector": "B703",
    "rarity": "silver"
  },
  {
    "id": "dc_b_normartillerie_592",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Normartillerie",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "artillerie"
    ],
    "text": "+1 ATK gegen beobachtete Einheiten. +1 DEF, wenn Infanterie im Abschnitt liegt.",
    "effects": [],
    "flavor": "Feuerplan sitzt.",
    "image": "artillerie/B592.jpg",
    "max_copies": 1,
    "collector": "B592",
    "rarity": "silver"
  },
  {
    "id": "dc_b_normgeschutz_549",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Normgeschütz",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "artillerie"
    ],
    "text": "Hat +1 ATK, wenn im Abschnitt Infanterie liegt.",
    "effects": [],
    "flavor": "Kaliber gleich.",
    "image": "artillerie/B549.jpg",
    "max_copies": 1,
    "collector": "B549",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_scheingeschuetz_881",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Scheingeschütz",
    "ap": 4,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "artillerie"
    ],
    "text": "+1 ATK. Am Ende deines Zuges: lege +1 DEF auf einen Abschnitt (Marker).",
    "effects": [],
    "flavor": "Schwerpunkt, der wandert.",
    "image": "artillerie/B881.jpg",
    "max_copies": 1,
    "collector": "B881",
    "rarity": "silver"
  },
  {
    "id": "dc_b_schwerer_moerser",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Schwerer Mörser",
    "ap": 3,
    "atk": 5,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "artillerie"
    ],
    "text": "+1 ATK gegen ein Ziel im beschossenen Abschnitt.",
    "effects": [],
    "flavor": "Wo schon Einschläge waren, lag der nächste näher.",
    "image": "artillerie/B032.jpg",
    "max_copies": 1,
    "collector": "B032",
    "rarity": "silver"
  },
  {
    "id": "dc_b_schwerpunktbatterie_641",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Schwerpunktbatterie",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "artillerie"
    ],
    "text": "+2 ATK, wenn du in diesem Abschnitt mindestens zwei weitere Einheiten hast.",
    "effects": [],
    "flavor": "Stückzahl auf einen Punkt.",
    "image": "artillerie/B641.jpg",
    "max_copies": 1,
    "collector": "B641",
    "rarity": "silver"
  },
  {
    "id": "dc_b_sturmhaubitze",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Sturmhaubitze",
    "ap": 3,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "artillerie"
    ],
    "text": "+2 ATK gegen ein Ziel, das in diesem Zug schon Schaden genommen hat.",
    "effects": [],
    "flavor": "Nach dem Treffer kommt der Bruch.",
    "image": "artillerie/B177.jpg",
    "max_copies": 1,
    "collector": "B177",
    "rarity": "silver"
  },
  {
    "id": "dc_b_zielbatterie_941",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Zielbatterie",
    "ap": 4,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "artillerie"
    ],
    "text": "+1 ATK. Der erste Angriff, den diese Einheit in deinem Zug ausführt, hat +1 ATK zusätzlich.",
    "effects": [],
    "flavor": "Erstes Ziel. Erster Schaden.",
    "image": "artillerie/B941.jpg",
    "max_copies": 1,
    "collector": "B941",
    "rarity": "silver"
  },
  {
    "id": "dc_eh_haubitze",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Haubitzenzug",
    "ap": 4,
    "atk": 6,
    "def": 4,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "artillerie",
      "gepanzert",
      "kette",
      "mittel",
      "fahrzeug",
      "stellung"
    ],
    "text": "Greift die gesamte feindliche Front an. Nach dem Angriff bis zum nächsten eigenen Zug verdeckt.",
    "effects": [
      {
        "code": "ATTACK_ANY_FRONT"
      },
      {
        "code": "RELOCATE_HIDE"
      }
    ],
    "flavor": "Verheerende Wirkung aus sicherer Entfernung.",
    "image": "artillerie/A051.jpg",
    "max_copies": 2,
    "collector": "A051"
  },
  {
    "id": "dc_eh_moerser",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Mörser-Team",
    "ap": 3,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "artillerie",
      "stellung",
      "leicht",
      "moerser"
    ],
    "text": "Indirektes Feuer: gesamte feindliche Front.",
    "effects": [
      {
        "code": "ATTACK_ANY_FRONT"
      }
    ],
    "flavor": "Ein Schuss ein Treffer! Aber wir nehmen sicherheitshalber drei…",
    "image": "artillerie/A059.jpg",
    "max_copies": 2,
    "collector": "A059"
  },
  {
    "id": "dc_eh_viper",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Artillerie",
    "name": "Raketenwerfer Viper",
    "ap": 3,
    "atk": 5,
    "def": 3,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "fahrzeug",
      "kette",
      "artillerie",
      "stellung",
      "mittel",
      "raketenwerfer"
    ],
    "text": "Indirektes Feuer auf die ganze Front. Hohe Reichweite: auch Support.",
    "effects": [
      {
        "code": "ATTACK_ANY_FRONT"
      },
      {
        "code": "ATTACK_SUPPORT"
      }
    ],
    "flavor": "Das Gebäude ist zwar weg, aber wir haben den Stuhl getroffen!",
    "image": "artillerie/A063.jpg",
    "max_copies": 2,
    "collector": "A063"
  }
];
