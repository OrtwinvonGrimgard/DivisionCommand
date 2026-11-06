window.DC_SET_TYPES = window.DC_SET_TYPES || {};
window.DC_SET_TYPES["Infanterie"] = [
  {
    "id": "dc_eh_freiwilligenzug",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Freiwilligenzug",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Kostet 1 weniger, wenn in diesem Zug schon Infanterie gespielt wurde.",
    "effects": [
      {
        "code": "COST_REDUCE_IF_INFANTRY_PLAYED",
        "param": {
          "delta": 1
        }
      }
    ],
    "flavor": "Freiwillig heißt nicht, dass sie wussten, was sie erwartet.",
    "image": "infanterie/A033.jpg",
    "max_copies": 4,
    "collector": "A033",
    "keywords": [
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_eh_erstewelle",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Erste Welle",
    "ap": 1,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "",
    "effects": [],
    "flavor": "Die erste Reihe stirbt. Die zweite sieht zu.",
    "image": "infanterie/A036.jpg",
    "max_copies": 4,
    "collector": "A036",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_eh_zweitewelle",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Zweite Welle",
    "ap": 2,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "+1 ATK, wenn in diesem Zug schon eine eigene Infanterie gespielt wurde.",
    "effects": [
      {
        "code": "ATK_IF_INFANTRY_PLAYED",
        "param": {
          "atk": 1
        }
      }
    ],
    "flavor": "Die ersten haben den Weg freigemacht. Wir gehen ihn.",
    "image": "infanterie/A040.jpg",
    "max_copies": 2,
    "collector": "A040",
    "keywords": [
      "Abschirmung"
    ]
  },
  {
    "id": "dc_eh_stosskolonne",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Stoßkolonne",
    "ap": 3,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "+2 ATK gegen ein Ziel, das in diesem Zug noch nicht angegriffen wurde.",
    "effects": [
      {
        "code": "ATK_IF_TARGET_NOT_ATTACKED",
        "param": {
          "atk": 2
        }
      }
    ],
    "flavor": "Wer vorn steht, stirbt zuerst. Wer hinten steht, geht über ihn hinweg.",
    "image": "infanterie/A041.jpg",
    "max_copies": 2,
    "collector": "A041",
    "keywords": [
      "Heranführung"
    ]
  },
  {
    "id": "dc_eh_nachruecker",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Nachrücker",
    "ap": 1,
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Kann für 0 AP gespielt werden, wenn in diesem Zug eine eigene Infanterie zerstört wurde.",
    "effects": [
      {
        "code": "PLAY_FREE_IF_INFANTRY_DESTROYED"
      }
    ],
    "flavor": "Jemand ist ausgefallen. Jemand füllt die Lücke.",
    "image": "infanterie/A045.jpg",
    "max_copies": 4,
    "collector": "A045"
  },
  {
    "id": "dc_eh_dschungel",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Dschungelkrieger",
    "ap": 3,
    "atk": 2,
    "def": 5,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "guerrilla",
      "leicht"
    ],
    "text": "Nach dem Angriff verdeckt. Erst nach Aufklärung wieder angreifbar.",
    "effects": [
      {
        "code": "GUERRILLA_HIDE"
      }
    ],
    "flavor": "Habt ihr das auch gehört?",
    "image": "infanterie/A049.jpg",
    "max_copies": 2,
    "collector": "A049",
    "keywords": [
      "Platztausch"
    ]
  },
  {
    "id": "dc_eh_frei",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Freischärler",
    "ap": 1,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": false,
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
    "flavor": "Dies ist UNSER Land!",
    "image": "infanterie/A050.jpg",
    "max_copies": 2,
    "collector": "A050",
    "keywords": [
      "Abschirmung"
    ]
  },
  {
    "id": "dc_eh_himmel",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Infanteriebataillon Himmelhund",
    "ap": 3,
    "atk": 4,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "mittel",
      "grossverband"
    ],
    "text": "Nur zwei Einheiten im Schulterschluss. Zuerst gewählte kämpft, dann die zweite. 1 AP, beide erschöpft. Artillerie und Soforteinsätze frei.",
    "effects": [
      {
        "code": "NEED_SHOULDER"
      }
    ],
    "flavor": "1000 Mann und ein Befehl.",
    "image": "infanterie/A053.jpg",
    "max_copies": 2,
    "collector": "A053",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_eh_jaeger",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Jägerstellung",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "leicht",
      "stellung"
    ],
    "text": "Richtmine: bei Angriff zuerst 3 Schaden am Angreifer nach NML-Minen, dann Kampf.",
    "effects": [
      {
        "code": "RICHTMINE",
        "param": {
          "dmg": 3
        }
      }
    ],
    "flavor": "Es rauschen die Bäume, es klingt ihr Gesang!",
    "image": "infanterie/A054.jpg",
    "max_copies": 2,
    "collector": "A054",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_eh_mg",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "MG-Stellung",
    "ap": 3,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "schwer",
      "stellung",
      "mg"
    ],
    "text": "Niederhalten: getroffene feindliche Infanterie darf im nächsten Zug ihres Besitzers nicht angreifen.",
    "effects": [
      {
        "code": "NIEDERHALTEN"
      }
    ],
    "flavor": "Brrrt. Brrrt. Brrrrrrrrrrrt!",
    "image": "infanterie/A056.jpg",
    "max_copies": 2,
    "collector": "A056",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_eh_eingreif",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Mobile Eingreiftruppe",
    "ap": 3,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "drehfluegler",
      "leicht",
      "luftlande"
    ],
    "text": "Verschieben (2 AP): leerer Frontslot, kein Feind gegenüber. Währenddessen Lufteinheit.",
    "effects": [
      {
        "code": "VERSCHIEBEN",
        "param": {
          "ap": 2
        }
      }
    ],
    "flavor": "Mobilität ist der Schlüssel zu operativer Freiheit.",
    "image": "infanterie/A058.jpg",
    "max_copies": 2,
    "collector": "A058",
    "keywords": [
      "Heranführung"
    ]
  },
  {
    "id": "dc_eh_pak",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Panzerabwehrtrupp",
    "ap": 2,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "leicht",
      "panzerabwehr",
      "stellung"
    ],
    "text": "Panzerfaust: +5 A und +5 V gegen Gepanzerte.",
    "effects": [
      {
        "code": "PANZERFAUST",
        "param": {
          "atk": 5,
          "def": 5
        }
      }
    ],
    "flavor": "Wir schneiden uns durch!",
    "image": "infanterie/A060.jpg",
    "max_copies": 2,
    "collector": "A060",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_eh_sich",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Sicherungstrupp",
    "ap": 1,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "leicht"
    ],
    "text": "",
    "effects": [],
    "flavor": "Sind sie nicht alle freiwillig hier?!",
    "image": "infanterie/A067.jpg",
    "max_copies": 2,
    "collector": "A067",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_werkschutz_22",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Werkschutz",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF, solange eigene Panzer- oder Artillerieeinheit im Spiel.",
    "effects": [],
    "flavor": "Sie halten den Boden, damit die Ware rollt.",
    "image": "infanterie/B022.jpg",
    "max_copies": 1,
    "collector": "B022",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit"
    ]
  },
  {
    "id": "dc_b_depotwache_23",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Depotwache",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Wenn du diesen Zug Ausrüstung gespielt hast: +1 DEF.",
    "effects": [],
    "flavor": "Der Zaun ist billiger als die Halle.",
    "image": "infanterie/B023.jpg",
    "max_copies": 1,
    "collector": "B023",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_schichttrupp_24",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Schichttrupp",
    "ap": 2,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK, wenn du diesen Zug schon eine Einheit gespielt hast.",
    "effects": [],
    "flavor": "Die Schicht endet nicht am Tor.",
    "image": "infanterie/B024.jpg",
    "max_copies": 1,
    "collector": "B024",
    "rarity": "bronze",
    "keywords": [
      "Erbitterung"
    ]
  },
  {
    "id": "dc_b_lieferkordon_25",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Lieferkordon",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Benachbarte eigene Einheiten +1 DEF, wenn du Soforteinsatz diesen Zug spieltest.",
    "effects": [],
    "flavor": "Ohne Kordon keine Kolonne.",
    "image": "infanterie/B025.jpg",
    "max_copies": 1,
    "collector": "B025",
    "rarity": "silver"
  },
  {
    "id": "dc_b_kontingentlinie_26",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Kontingentlinie",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Kostet 1 weniger, wenn du diesen Zug Artillerie gespielt hast.",
    "effects": [],
    "flavor": "Unter dem Feuer wird die Linie zur Rechnung.",
    "image": "infanterie/B026.jpg",
    "max_copies": 1,
    "collector": "B026",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_bilanzsoldaten_27",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Bilanzsoldaten",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Wenn diese Einheit stirbt: ziehe 1, falls Ausrüstung im Spiel.",
    "effects": [],
    "flavor": "Im Plan sind sie Verbrauch. In der Familie nicht.",
    "image": "infanterie/B027.jpg",
    "max_copies": 1,
    "collector": "B027",
    "rarity": "silver",
    "keywords": [
      "Erbitterung"
    ]
  },
  {
    "id": "dc_b_pflichtzug_1",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Pflichtzug",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "+1 DEF, solange du in diesem Zug eine Infanterie gespielt hast.",
    "effects": [],
    "flavor": "Aus dem Werk, in die Reihe.",
    "image": "infanterie/B001.jpg",
    "max_copies": 1,
    "collector": "B001",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_erste_welle_2",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Erste Welle",
    "ap": 1,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "",
    "effects": [],
    "flavor": "Wer zuerst geht, trägt den Balken.",
    "image": "infanterie/B002.jpg",
    "max_copies": 1,
    "collector": "B002",
    "rarity": "bronze",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_nachruecker_4",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Nachrücker",
    "ap": 2,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Wenn eine eigene Infanterie zerstört wird: diese Einheit darf sofort angreifen.",
    "effects": [],
    "flavor": "Die Lücke ist ein Befehl.",
    "image": "infanterie/B004.jpg",
    "max_copies": 1,
    "collector": "B004",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit"
    ]
  },
  {
    "id": "dc_b_zweite_welle_5",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Zweite Welle",
    "ap": 2,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "+1 ATK und +1 DEF, wenn in diesem Zug schon eine eigene Infanterie gespielt wurde.",
    "effects": [],
    "flavor": "Der Zentralrat zählt Wellen, nicht Namen.",
    "image": "infanterie/B005.jpg",
    "max_copies": 1,
    "collector": "B005",
    "rarity": "silver",
    "keywords": [
      "Erbitterung"
    ]
  },
  {
    "id": "dc_b_stosskolonne_6",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Stoßkolonne",
    "ap": 3,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "+2 ATK gegen ein Ziel, das in diesem Zug noch nicht angegriffen wurde.",
    "effects": [],
    "flavor": "Ein Schlag. Dann der nächste.",
    "image": "infanterie/B006.jpg",
    "max_copies": 1,
    "collector": "B006",
    "rarity": "silver",
    "keywords": [
      "Gefechtsbereit"
    ]
  },
  {
    "id": "dc_b_heilige_front_8",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Heilige Front",
    "ap": 4,
    "atk": 5,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Eigene Infanterie im Abschnitt hat +1 ATK.",
    "effects": [],
    "flavor": "Voss nennt das Maß. Die Front nennt es Glauben.",
    "image": "infanterie/B008.jpg",
    "max_copies": 1,
    "collector": "B008",
    "rarity": "gold",
    "keywords": [
      "Überlast"
    ]
  },
  {
    "id": "dc_b_schwurzug_601",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Schwurzug",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "+1 DEF, solange du in diesem Zug eine Einheit ersetzt hast. Einmal: ignoriere den ersten Schaden (Schwur hält).",
    "effects": [],
    "flavor": "Schwurzug. Die Krone irrt nicht — du zahlst dafür.",
    "image": "infanterie/B601.jpg",
    "max_copies": 1,
    "collector": "B601",
    "rarity": "bronze",
    "keywords": [
      "Staffelangriff"
    ]
  },
  {
    "id": "dc_b_kronwache_602",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Kronwache",
    "ap": 1,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "+1 ATK, wenn sie den Abschnitt verteidigt, in dem du diesen Zug einen Erlass/Unterstützung gespielt hast.",
    "effects": [],
    "flavor": "Kronwache. Unfehlbar nur am Ort des Befehls.",
    "image": "infanterie/B602.jpg",
    "max_copies": 1,
    "collector": "B602",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_treuekompanie_603",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Treuekompanie",
    "ap": 2,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "+1 ATK und +1 DEF, solange mindestens eine andere eigene Einheit im Abschnitt steht (Treuekette).",
    "effects": [],
    "flavor": "Treuekompanie. Allein bricht der Schwur.",
    "image": "infanterie/B603.jpg",
    "max_copies": 1,
    "collector": "B603",
    "rarity": "bronze",
    "keywords": [
      "Ablösung"
    ]
  },
  {
    "id": "dc_b_abloesungskette_604",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Ablösungskette",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Wenn zerstört: heile 1 DEF an einer eigenen Einheit und sie erhält „Ersetzt“ bis Zugende (+1 DEF).",
    "effects": [],
    "flavor": "Ablösungskette. Die Krone lässt niemanden fallen — teuer.",
    "image": "infanterie/B604.jpg",
    "max_copies": 1,
    "collector": "B604",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_regiment_erbe_605",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Regiment Erbe",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "+2 DEF, solange der Gegner in diesem Abschnitt mehr Einheiten hat. Nach dem ersten erlittenen Schaden: +1 ATK.",
    "effects": [],
    "flavor": "Regiment Erbe. Recht behalten kostet Blut.",
    "image": "infanterie/B605.jpg",
    "max_copies": 1,
    "collector": "B605",
    "rarity": "silver",
    "keywords": [
      "Erbitterung"
    ]
  },
  {
    "id": "dc_b_schwerpunktlinie_606",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Schwerpunktlinie",
    "ap": 3,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "+2 ATK im Zug, in dem du sie aus der Hand in die Front ersetzt hast. Danach: wirf 1 ab.",
    "effects": [],
    "flavor": "Schwerpunktlinie. Unfehlbarer Stoß — Preis der Sicherheit.",
    "image": "infanterie/B606.jpg",
    "max_copies": 1,
    "collector": "B606",
    "rarity": "silver"
  },
  {
    "id": "dc_b_stossgruppe_361",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Stoßgruppe",
    "ap": 2,
    "atk": 3,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Wenn dadurch zerstört: ziehe 1 (System lernt).",
    "effects": [],
    "flavor": "Stoßgruppe. Leistung misst den Rest.",
    "image": "infanterie/B361.jpg",
    "max_copies": 1,
    "collector": "B361",
    "rarity": "bronze",
    "keywords": [
      "Überlast"
    ]
  },
  {
    "id": "dc_b_masstrupp_362",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Maßtrupp",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "+1 ATK und +1 DEF, solange beschädigt. Einmal/Zug: erleide 1 Schaden → ignoriere den nächsten Schaden.",
    "effects": [],
    "flavor": "Maßtrupp. Beschädigt heißt kalibriert.",
    "image": "infanterie/B362.jpg",
    "max_copies": 1,
    "collector": "B362",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit"
    ]
  },
  {
    "id": "dc_b_schnittstelle_363",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Schnittstelle",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Kann verdeckt gespielt werden. Aufdecken: +1 ATK bis Zugende; erleide 1 Schaden.",
    "effects": [],
    "flavor": "Schnittstelle. Aufdecken schneidet.",
    "image": "infanterie/B363.jpg",
    "max_copies": 1,
    "collector": "B363",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_keilspitze_364",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Keilspitze",
    "ap": 2,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Der erste Angriff nach dem Ausspielen hat +2 ATK; danach −1 DEF bis Zugende.",
    "effects": [],
    "flavor": "Keilspitze. Optimiert auf den ersten Schnitt.",
    "image": "infanterie/B364.jpg",
    "max_copies": 1,
    "collector": "B364",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schwere_stossgruppe_367",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Schwere Stoßgruppe",
    "ap": 3,
    "atk": 4,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "+2 ATK. Nach dem ersten Angriff: −1 DEF und ziehe 1 (Schmerzprotokoll).",
    "effects": [],
    "flavor": "Schwere Stoßgruppe. Mehr Output, weniger Körper.",
    "image": "infanterie/B367.jpg",
    "max_copies": 1,
    "collector": "B367",
    "rarity": "silver"
  },
  {
    "id": "dc_b_masseinheit_368",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Maßeinheit",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "+1 ATK und +1 DEF, solange beschädigt. Heilen dieser Einheit kostet +1 AP.",
    "effects": [],
    "flavor": "Maßeinheit. Menschlichkeit ist teurer Service.",
    "image": "infanterie/B368.jpg",
    "max_copies": 1,
    "collector": "B368",
    "rarity": "silver",
    "keywords": [
      "Überlast"
    ]
  },
  {
    "id": "dc_b_knotenwache_781",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Knotenwache",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF; kostet 1 weniger bei Unterstützung (min. 1).",
    "effects": [],
    "flavor": "Wache an der Leitung. Kein Sockel.",
    "image": "infanterie/B781.jpg",
    "max_copies": 1,
    "collector": "B781",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit"
    ]
  },
  {
    "id": "dc_b_reservisten_zug_782",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Reservisten-Zug",
    "ap": 1,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK/+1 DEF, wenn Infanterie und Unterstützung angrenzen. [Reservisten-Zug]",
    "effects": [],
    "flavor": "Bürger in Uniform. Schicht fehlt.",
    "image": "infanterie/B782.jpg",
    "max_copies": 1,
    "collector": "B782",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nordfall_posten_783",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Nordfall-Posten",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF, wenn du diesen Zug aufgedeckt hast.",
    "effects": [],
    "flavor": "Posten übt die Lücke.",
    "image": "infanterie/B783.jpg",
    "max_copies": 1,
    "collector": "B783",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit"
    ]
  },
  {
    "id": "dc_b_korridorlaeufer_784",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Korridorläufer",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK, wenn Feind aufgeklärt ist.",
    "effects": [],
    "flavor": "Läufer am Raster — frühe Lage.",
    "image": "infanterie/B784.jpg",
    "max_copies": 1,
    "collector": "B784",
    "rarity": "bronze",
    "keywords": [
      "Gefechtsbereit"
    ]
  },
  {
    "id": "dc_b_westhaven_sicherung_785",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Westhaven-Sicherung",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF gegen den ersten Angriff/Zug. [Westhaven-Sicherung]",
    "effects": [],
    "flavor": "Hafen sichert. Schiff eröffnet nicht.",
    "image": "infanterie/B785.jpg",
    "max_copies": 1,
    "collector": "B785",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_bodenlinie_786",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Bodenlinie",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK/+1 DEF, wenn Aufklärung angrenzt.",
    "effects": [],
    "flavor": "Boden hält. Keine zweite Armee zur See.",
    "image": "infanterie/B786.jpg",
    "max_copies": 1,
    "collector": "B786",
    "rarity": "silver"
  },
  {
    "id": "dc_b_frontwache_841",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Frontwache",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Kostet 1 weniger bei Infanterie im Abschnitt (min. 1).",
    "effects": [],
    "flavor": "Front deckt Hinterraum. Beide echt.",
    "image": "infanterie/B841.jpg",
    "max_copies": 1,
    "collector": "B841",
    "rarity": "bronze",
    "keywords": [
      "Erbitterung"
    ]
  },
  {
    "id": "dc_b_spielkorps_zug_842",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Spielkorps-Zug",
    "ap": 1,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK, wenn eigene Infanterie angrenzt. [Spielkorps-Zug]",
    "effects": [],
    "flavor": "Zug trägt eine Version. Nicht den Glauben.",
    "image": "infanterie/B842.jpg",
    "max_copies": 1,
    "collector": "B842",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_siegelposten_843",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Siegelposten",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "",
    "effects": [],
    "flavor": "Posten am Siegel — lesbar, nicht treu.",
    "image": "infanterie/B843.jpg",
    "max_copies": 1,
    "collector": "B843",
    "rarity": "bronze",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_grenzspieler_844",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Grenzspieler",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Kostet 1 weniger bei Infanterie im Abschnitt (min. 1). [Grenzspieler]",
    "effects": [],
    "flavor": "Grenzspiel schießt nach einer Version.",
    "image": "infanterie/B844.jpg",
    "max_copies": 1,
    "collector": "B844",
    "rarity": "bronze",
    "keywords": [
      "Sicherung"
    ]
  },
  {
    "id": "dc_b_doppelrede_linie_845",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Doppelrede-Linie",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK, wenn du diesen Zug Sofort spielst.",
    "effects": [],
    "flavor": "Linie sagt eins. Meint das andere.",
    "image": "infanterie/B845.jpg",
    "max_copies": 1,
    "collector": "B845",
    "rarity": "silver",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_stillheim_wache_846",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Stillheim-Wache",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF, wenn Unterstützung im Abschnitt.",
    "effects": [],
    "flavor": "Wache am Preis. Keine Fahne.",
    "image": "infanterie/B846.jpg",
    "max_copies": 1,
    "collector": "B846",
    "rarity": "silver",
    "keywords": [
      "Ablösung"
    ]
  },
  {
    "id": "dc_b_zeilentraeger_901",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Zeilenträger",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK, wenn eigene Infanterie angrenzt.",
    "effects": [],
    "flavor": "Träger einer Zeile. Kein Held.",
    "image": "infanterie/B901.jpg",
    "max_copies": 1,
    "collector": "B901",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_hauswaechter_brunn_902",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Hauswächter Brunn",
    "ap": 1,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF gegen den ersten Angriff/Zug.",
    "effects": [],
    "flavor": "Wache am Kai. Name an der Tür.",
    "image": "infanterie/B902.jpg",
    "max_copies": 1,
    "collector": "B902",
    "rarity": "bronze",
    "keywords": [
      "Ablösung"
    ]
  },
  {
    "id": "dc_b_vorleser_kalden_903",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Vorleser Kalden",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK/+1 DEF, wenn Infanterie und Unterstützung angrenzen.",
    "effects": [],
    "flavor": "Liest laut. Ändert nichts allein.",
    "image": "infanterie/B903.jpg",
    "max_copies": 1,
    "collector": "B903",
    "rarity": "bronze",
    "keywords": [
      "Heranführung"
    ]
  },
  {
    "id": "dc_b_auenheim_hof_904",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Auenheim-Hof",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF gegen den ersten Angriff/Zug. [Auenheim-Hof]",
    "effects": [],
    "flavor": "Hof liefert. Zeile bleibt.",
    "image": "infanterie/B904.jpg",
    "max_copies": 1,
    "collector": "B904",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_namenhof_schuetze_905",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Namenhof-Schütze",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF, wenn Unterstützung im Abschnitt. [Namenhof-Schütze]",
    "effects": [],
    "flavor": "Schild am Weg. Kurze Abschrift.",
    "image": "infanterie/B905.jpg",
    "max_copies": 1,
    "collector": "B905",
    "rarity": "silver",
    "keywords": [
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_b_stillschuld_zug_906",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Stillschuld-Zug",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK/+1 DEF, wenn Infanterie und Unterstützung angrenzen. [Stillschuld-Zug]",
    "effects": [],
    "flavor": "Richtig gezahlt. Zu spät.",
    "image": "infanterie/B906.jpg",
    "max_copies": 1,
    "collector": "B906",
    "rarity": "silver"
  },
  {
    "id": "dc_b_kronenwache_721",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Kronenwache",
    "ap": 1,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF gegen den ersten Angriff/Zug. [Kronenwache]",
    "effects": [],
    "flavor": "Wache hält den Berg. Nicht den Ruhm.",
    "image": "infanterie/B721.jpg",
    "max_copies": 1,
    "collector": "B721",
    "rarity": "bronze",
    "keywords": [
      "Abschirmung"
    ]
  },
  {
    "id": "dc_b_parlamentsbote_722",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Parlamentsbote",
    "ap": 1,
    "atk": 1,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK/+1 DEF, wenn Infanterie und Unterstützung angrenzen. [Parlamentsbote]",
    "effects": [],
    "flavor": "Bote zwischen Gasse und Berg.",
    "image": "infanterie/B722.jpg",
    "max_copies": 1,
    "collector": "B722",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_auffangposten_723",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Auffangposten",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF; kostet 1 weniger bei Unterstützung (min. 1). [Auffangposten]",
    "effects": [],
    "flavor": "Posten fängt. Er stürmt nicht.",
    "image": "infanterie/B723.jpg",
    "max_copies": 1,
    "collector": "B723",
    "rarity": "bronze",
    "keywords": [
      "Sicherung"
    ]
  },
  {
    "id": "dc_b_markenlaeufer_724",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Markenläufer",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK, wenn sie diesen Zug nicht bewegt wurde.",
    "effects": [],
    "flavor": "Läufer aus Markenfels — Stellung vor Eile.",
    "image": "infanterie/B724.jpg",
    "max_copies": 1,
    "collector": "B724",
    "rarity": "bronze",
    "keywords": [
      "Sicherung"
    ]
  },
  {
    "id": "dc_b_zeughauszug_725",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Zeughauszug",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF; kostet 1 weniger bei Unterstützung (min. 1). [Zeughauszug]",
    "effects": [],
    "flavor": "Zug aus Brückenau — Gerät über Jahre.",
    "image": "infanterie/B725.jpg",
    "max_copies": 1,
    "collector": "B725",
    "rarity": "silver"
  },
  {
    "id": "dc_b_doppelhaus_linie_726",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Doppelhaus-Linie",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK/+1 DEF, wenn Infanterie und Unterstützung angrenzen. [Doppelhaus-Linie]",
    "effects": [],
    "flavor": "Zwei Häuser. Eine Linie.",
    "image": "infanterie/B726.jpg",
    "max_copies": 1,
    "collector": "B726",
    "rarity": "silver"
  },
  {
    "id": "dc_b_kaikompanie_43",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Kaikompanie",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF, solange du diesen Zug eine Einheit geschoben hast.",
    "effects": [],
    "flavor": "Am Kai steht man. Das Schiff hält keine Stellung.",
    "image": "infanterie/B043.jpg",
    "max_copies": 1,
    "collector": "B043",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_staubrain_zug_44",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Staubrain-Zug",
    "ap": 1,
    "atk": 1,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF, wenn im Abschnitt keine Unterstützung liegt.",
    "effects": [],
    "flavor": "Dieselbe Jacke. Anderer Staub.",
    "image": "infanterie/B044.jpg",
    "max_copies": 1,
    "collector": "B044",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_abloesungstrupp_45",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Ablösungstrupp",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Beim Ausspielen: schiebe eine eigene Einheit um 1 Slot.",
    "effects": [],
    "flavor": "Wer bleibt ohne Ablösung, ist verspätet — nicht ein anderer Mensch.",
    "image": "infanterie/B045.jpg",
    "max_copies": 1,
    "collector": "B045",
    "rarity": "bronze",
    "keywords": [
      "Heranführung"
    ]
  },
  {
    "id": "dc_b_wartebach_wache_46",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Wartebach-Wache",
    "ap": 2,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF nach Schieben diesen Zug.",
    "effects": [],
    "flavor": "Das Dorf richtet den Tag nach dem Schiff, nicht nach der Uhr.",
    "image": "infanterie/B046.jpg",
    "max_copies": 1,
    "collector": "B046",
    "rarity": "silver",
    "keywords": [
      "Heranführung"
    ]
  },
  {
    "id": "dc_b_suedmark_fuss_47",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Südmark-Fuß",
    "ap": 2,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Kostet 1 weniger, wenn du diesen Zug schon geschoben hast.",
    "effects": [],
    "flavor": "Was in Neuport einen Tag zu spät ist, ist hier oft eine Woche.",
    "image": "infanterie/B047.jpg",
    "max_copies": 1,
    "collector": "B047",
    "rarity": "bronze",
    "keywords": [
      "Erbitterung"
    ]
  },
  {
    "id": "dc_b_paspelhell_48",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Paspelhell",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Benachbarte eigene Einheiten +1 DEF, wenn du Soforteinsatz spieltest.",
    "effects": [],
    "flavor": "Die Paspel bleibt hell, auch wenn der Stoff es nicht mehr ist.",
    "image": "infanterie/B048.jpg",
    "max_copies": 1,
    "collector": "B048",
    "rarity": "silver"
  },
  {
    "id": "dc_b_kolonnenwache_661",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Kolonnenwache",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF, wenn du in diesem Abschnitt mindestens zwei Einheiten hast.",
    "effects": [],
    "flavor": "Der Weg hält, wenn zwei halten.",
    "image": "infanterie/B661.jpg",
    "max_copies": 1,
    "collector": "B661",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_flankenlaeufer_662",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Flankenläufer",
    "ap": 1,
    "atk": 2,
    "def": 1,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "",
    "effects": [],
    "flavor": "Läufer umgeht. Er schließt keinen Knoten.",
    "image": "infanterie/B662.jpg",
    "max_copies": 1,
    "collector": "B662",
    "rarity": "bronze",
    "keywords": [
      "Stellungswechsel"
    ]
  },
  {
    "id": "dc_b_strassenmeister_663",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Straßenmeister",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF an Straßen-/Lager-Abschnitten.",
    "effects": [],
    "flavor": "Meister zählt Wagen, nicht Fahnen.",
    "image": "infanterie/B663.jpg",
    "max_copies": 1,
    "collector": "B663",
    "rarity": "bronze",
    "keywords": [
      "Heranführung"
    ]
  },
  {
    "id": "dc_b_karawanenzug_664",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Karawanenzug",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF gegen den ersten Angriff/Zug. [Karawanenzug]",
    "effects": [],
    "flavor": "Zug fährt, solange der Vertrag hält.",
    "image": "infanterie/B664.jpg",
    "max_copies": 1,
    "collector": "B664",
    "rarity": "bronze",
    "keywords": [
      "Erbitterung"
    ]
  },
  {
    "id": "dc_b_hauptkolonne_665",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Hauptkolonne",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK/+1 DEF, wenn Infanterie und Unterstützung im Abschnitt.",
    "effects": [],
    "flavor": "Kolonne — Bund auf Rädern.",
    "image": "infanterie/B665.jpg",
    "max_copies": 1,
    "collector": "B665",
    "rarity": "silver",
    "keywords": [
      "Sicherung"
    ]
  },
  {
    "id": "dc_b_strassenbataillon_666",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Straßenbataillon",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF bis Zugende.",
    "effects": [],
    "flavor": "Bataillon sichert die Strecke, nicht den Thron.",
    "image": "infanterie/B666.jpg",
    "max_copies": 1,
    "collector": "B666",
    "rarity": "silver",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_normzug_541",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Normzug",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF, wenn eine feindliche Einheit im Abschnitt beobachtet ist.",
    "effects": [],
    "flavor": "Zug nach Norm. Nicht nach Laune.",
    "image": "infanterie/B541.jpg",
    "max_copies": 1,
    "collector": "B541",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_reservekompanie_542",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Reservekompanie",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Kostet 1 weniger, wenn du diesen Zug eine Sofortkarte gespielt hast (min. 1).",
    "effects": [],
    "flavor": "Reserve wartet auf Papier.",
    "image": "infanterie/B542.jpg",
    "max_copies": 1,
    "collector": "B542",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_bahnsteigwache_543",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Bahnsteigwache",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF an Bahn-/Depot-Abschnitten.",
    "effects": [],
    "flavor": "Wache am Bahnsteig. Schlüssel nicht in der Faust.",
    "image": "infanterie/B543.jpg",
    "max_copies": 1,
    "collector": "B543",
    "rarity": "bronze",
    "keywords": [
      "Sicherung"
    ]
  },
  {
    "id": "dc_b_wachzug_544",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Wachzug",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK gegen beobachtete Einheiten.",
    "effects": [],
    "flavor": "Wache sieht. Sie befiehlt nicht.",
    "image": "infanterie/B544.jpg",
    "max_copies": 1,
    "collector": "B544",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_feldwacht_zug_545",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Feldwacht-Zug",
    "ap": 2,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK/+1 DEF, wenn Infanterie und Artillerie im Abschnitt.",
    "effects": [],
    "flavor": "Feldwacht übt. Freigabe fehlt noch.",
    "image": "infanterie/B545.jpg",
    "max_copies": 1,
    "collector": "B545",
    "rarity": "silver",
    "keywords": [
      "Ablösung"
    ]
  },
  {
    "id": "dc_b_grenzstein_posten_546",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Grenzstein-Posten",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Beim Ausspielen: decke 1 auf; +1 DEF bis Zugende.",
    "effects": [],
    "flavor": "Grenzstein schreibt zuerst.",
    "image": "infanterie/B546.jpg",
    "max_copies": 1,
    "collector": "B546",
    "rarity": "silver",
    "keywords": [
      "Erbitterung"
    ]
  },
  {
    "id": "dc_b_kaiwache_481",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Kaiwache",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK, wenn eigene Infanterie angrenzt. [Kaiwache]",
    "effects": [],
    "flavor": "Wache für den Kai. Nicht für die Liste.",
    "image": "infanterie/B481.jpg",
    "max_copies": 1,
    "collector": "B481",
    "rarity": "bronze",
    "keywords": [
      "Zähigkeit"
    ]
  },
  {
    "id": "dc_b_entsatztrupp_482",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Entsatztrupp",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK, wenn der Abschnitt im letzten Zug angegriffen wurde.",
    "effects": [],
    "flavor": "Entsatz zu Fuß. Der Rest kommt später.",
    "image": "infanterie/B482.jpg",
    "max_copies": 1,
    "collector": "B482",
    "rarity": "bronze",
    "keywords": [
      "Ablösung"
    ]
  },
  {
    "id": "dc_b_entsatzposten_483",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Entsatzposten",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF, wenn der Abschnitt im letzten Zug angegriffen wurde.",
    "effects": [],
    "flavor": "Posten hält, bis die Kolonne kommt.",
    "image": "infanterie/B483.jpg",
    "max_copies": 1,
    "collector": "B483",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_hafenposten_484",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Hafenposten",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Kostet 1 weniger, wenn im Abschnitt eine Unterstützung liegt.",
    "effects": [],
    "flavor": "Posten am Manifest. Nicht am Thron.",
    "image": "infanterie/B484.jpg",
    "max_copies": 1,
    "collector": "B484",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kaihof_zug_485",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Kaihof-Zug",
    "ap": 2,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK/+1 DEF, wenn Unterstützung im Abschnitt.",
    "effects": [],
    "flavor": "Kaihof löscht und lädt. Er räumt den Markt nicht.",
    "image": "infanterie/B485.jpg",
    "max_copies": 1,
    "collector": "B485",
    "rarity": "silver"
  },
  {
    "id": "dc_b_wegtruppe_486",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Wegtruppe",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF an Straße/Bahn-Abschnitten; +1 ATK nach Entsatz-Zug.",
    "effects": [],
    "flavor": "Jacke dunkelblau. Sterne sitzen nicht.",
    "image": "infanterie/B486.jpg",
    "max_copies": 1,
    "collector": "B486",
    "rarity": "silver",
    "keywords": [
      "Zuteilung"
    ]
  },
  {
    "id": "dc_b_talwache_64",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Talwache",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF, wenn sie allein im Abschnitt steht.",
    "effects": [],
    "flavor": "Jedes Tal behält sein Recht. Die Wache gehört nur diesem.",
    "image": "infanterie/B064.jpg",
    "max_copies": 1,
    "collector": "B064",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_passmiliz_65",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Passmiliz",
    "ap": 1,
    "atk": 1,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK gegen eine Einheit, die in diesem Zug einrückt.",
    "effects": [],
    "flavor": "Wer den Pass hält, hält den Weg zur Hilfe.",
    "image": "infanterie/B065.jpg",
    "max_copies": 1,
    "collector": "B065",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_weideposten_66",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Weideposten",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF, wenn im Abschnitt eine zweite eigene Einheit steht.",
    "effects": [],
    "flavor": "Der Hang bleibt strittig. Das Tal bleibt da.",
    "image": "infanterie/B066.jpg",
    "max_copies": 1,
    "collector": "B066",
    "rarity": "bronze",
    "keywords": [
      "Ablösung"
    ]
  },
  {
    "id": "dc_b_stilltal_fuss_67",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Stilltal-Fuß",
    "ap": 2,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF, solange du diesen Zug keine Soforteinsatz-Karte spieltest.",
    "effects": [],
    "flavor": "Stumm heißt: noch im Eid. Nicht frei.",
    "image": "infanterie/B067.jpg",
    "max_copies": 1,
    "collector": "B067",
    "rarity": "silver",
    "keywords": [
      "Zähigkeit"
    ]
  },
  {
    "id": "dc_b_hochweide_zug_68",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Hochweide-Zug",
    "ap": 2,
    "atk": 3,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Kostet 1 weniger, wenn allein im Abschnitt.",
    "effects": [],
    "flavor": "Armut ist keine Erlaubnis, das Recht abzugeben.",
    "image": "infanterie/B068.jpg",
    "max_copies": 1,
    "collector": "B068",
    "rarity": "bronze",
    "keywords": [
      "Abschirmung"
    ]
  },
  {
    "id": "dc_b_schieferjacke_69",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Schieferjacke",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Benachbarte eigene Einheiten +1 DEF, wenn allein stehen.",
    "effects": [],
    "flavor": "Kurz und schiefergrau. Kein Pelz. Kein Zeichen einer Mitte.",
    "image": "infanterie/B069.jpg",
    "max_copies": 1,
    "collector": "B069",
    "rarity": "silver",
    "keywords": [
      "Zähigkeit"
    ]
  },
  {
    "id": "dc_b_ruheposten_301",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Ruheposten",
    "ap": 1,
    "atk": 1,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK, wenn sie im letzten Zug nicht angegriffen hat.",
    "effects": [],
    "flavor": "Posten hält. Die Akte schläft nicht.",
    "image": "infanterie/B301.jpg",
    "max_copies": 1,
    "collector": "B301",
    "rarity": "bronze",
    "keywords": [
      "Sicherung"
    ]
  },
  {
    "id": "dc_b_wachabloesung_302",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Wachablösung",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF, wenn sie diesen Zug nicht angreift.",
    "effects": [],
    "flavor": "Ablösung ohne Lücke im Schild.",
    "image": "infanterie/B302.jpg",
    "max_copies": 1,
    "collector": "B302",
    "rarity": "bronze",
    "keywords": [
      "Zähigkeit"
    ]
  },
  {
    "id": "dc_b_listenfuss_303",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Listenfuß",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF, wenn im Abschnitt eine Unterstützung liegt.",
    "effects": [],
    "flavor": "Wer in der Liste steht, steht nicht allein.",
    "image": "infanterie/B303.jpg",
    "max_copies": 1,
    "collector": "B303",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_seren_zug_304",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Seren-Zug",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF; heile 1, wenn sie im letzten Zug nicht angriff.",
    "effects": [],
    "flavor": "Wohnstadt und Front — dieselbe Maschine.",
    "image": "infanterie/B304.jpg",
    "max_copies": 1,
    "collector": "B304",
    "rarity": "silver"
  },
  {
    "id": "dc_b_meldezug_305",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Meldezug",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Beim Ausspielen: ziehe 1, wenn du diesen Zug heilst.",
    "effects": [],
    "flavor": "Meldung bringt Hilfe. Und die nächste Zeile.",
    "image": "infanterie/B305.jpg",
    "max_copies": 1,
    "collector": "B305",
    "rarity": "bronze",
    "keywords": [
      "Zähigkeit"
    ]
  },
  {
    "id": "dc_b_schildreihe_306",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Schildreihe",
    "ap": 2,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+2 DEF, wenn sie diesen Zug nicht angreift.",
    "effects": [],
    "flavor": "Lieber schlechtere Stellung als Loch im Schild.",
    "image": "infanterie/B306.jpg",
    "max_copies": 1,
    "collector": "B306",
    "rarity": "silver",
    "keywords": [
      "Sicherung"
    ]
  },
  {
    "id": "dc_b_namenszug_85",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Namenszug",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF, wenn sie eine Ausrüstung trägt.",
    "effects": [],
    "flavor": "Der Name geht mit. Nicht als Befehl.",
    "image": "infanterie/B085.jpg",
    "max_copies": 1,
    "collector": "B085",
    "rarity": "bronze",
    "keywords": [
      "Abschirmung"
    ]
  },
  {
    "id": "dc_b_totenwache_86",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Totenwache",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK, wenn im Abschnitt eine Einheit mit Ausrüstung steht.",
    "effects": [],
    "flavor": "Wache für die Lebenden hinter der Platte.",
    "image": "infanterie/B086.jpg",
    "max_copies": 1,
    "collector": "B086",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_trauerzug_87",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Trauerzug",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "",
    "effects": [],
    "flavor": "Trauer bleibt privat. Der Zug hält trotzdem.",
    "image": "infanterie/B087.jpg",
    "max_copies": 1,
    "collector": "B087",
    "rarity": "bronze",
    "keywords": [
      "Zähigkeit"
    ]
  },
  {
    "id": "dc_b_plattenzug_88",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Plattenzug",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK, wenn eigene Infanterie angrenzt. [Plattenzug]",
    "effects": [],
    "flavor": "Schwer und langsam — und noch am Leben.",
    "image": "infanterie/B088.jpg",
    "max_copies": 1,
    "collector": "B088",
    "rarity": "silver",
    "keywords": [
      "Abschirmung"
    ]
  },
  {
    "id": "dc_b_grenzhof_fuss_89",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Grenzhof-Fuß",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "",
    "effects": [],
    "flavor": "Kareth kennt neue Namen. Es macht keinen Altar daraus.",
    "image": "infanterie/B089.jpg",
    "max_copies": 1,
    "collector": "B089",
    "rarity": "bronze",
    "keywords": [
      "Erbitterung"
    ]
  },
  {
    "id": "dc_b_steinbrunn_lehrling_90",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Steinbrunn-Lehrling",
    "ap": 2,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Ausrüstung an dieser Einheit kostet 1 weniger (min. 1).",
    "effects": [],
    "flavor": "Zuerst Gerät. Dann Name. Nie umgekehrt.",
    "image": "infanterie/B090.jpg",
    "max_copies": 1,
    "collector": "B090",
    "rarity": "silver",
    "keywords": [
      "Abschirmung"
    ]
  },
  {
    "id": "dc_b_probenzug_421",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Probenzug",
    "ap": 1,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK gegen aufgeklärte Ziele.",
    "effects": [],
    "flavor": "Probe vor dem Schuss.",
    "image": "infanterie/B421.jpg",
    "max_copies": 1,
    "collector": "B421",
    "rarity": "bronze",
    "keywords": [
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_b_messau_fuss_422",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Messau-Fuß",
    "ap": 1,
    "atk": 1,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Beim Ausspielen: decke eine Einheit auf.",
    "effects": [],
    "flavor": "Sensorstadt schickt Schritte, keine Priester.",
    "image": "infanterie/B422.jpg",
    "max_copies": 1,
    "collector": "B422",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_unterschriftswache_423",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Unterschriftswache",
    "ap": 2,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 DEF, wenn ein Feind im Abschnitt aufgeklärt ist.",
    "effects": [],
    "flavor": "Wache für die Unterschrift. Nicht für die Zahl.",
    "image": "infanterie/B423.jpg",
    "max_copies": 1,
    "collector": "B423",
    "rarity": "bronze",
    "keywords": [
      "Heranführung"
    ]
  },
  {
    "id": "dc_b_abweich_zug_424",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Abweich-Zug",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+1 ATK/+1 DEF gegen aufgeklärte; ziehe 1 wenn Modell scheitert (Feind überlebt Angriff).",
    "effects": [],
    "flavor": "Randmess lehrt: die Probe kann lügen.",
    "image": "infanterie/B424.jpg",
    "max_copies": 1,
    "collector": "B424",
    "rarity": "silver"
  },
  {
    "id": "dc_b_fachlauf_425",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Fachlauf",
    "ap": 2,
    "atk": 2,
    "def": 2,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "Kostet 1 weniger, wenn Aufklärung im Spiel.",
    "effects": [],
    "flavor": "Dienst ist Fachlaufbahn. Kein Opfergang.",
    "image": "infanterie/B425.jpg",
    "max_copies": 1,
    "collector": "B425",
    "rarity": "bronze",
    "keywords": [
      "Nachsetzen"
    ]
  },
  {
    "id": "dc_b_linieninfanterie_426",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Linieninfanterie",
    "ap": 2,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "infanterie"
    ],
    "text": "+2 DEF nach Aufdecken eines Feindes diesen Zug.",
    "effects": [],
    "flavor": "Dünne technische Linie. Kein Gold.",
    "image": "infanterie/B426.jpg",
    "max_copies": 1,
    "collector": "B426",
    "rarity": "silver"
  }
];
