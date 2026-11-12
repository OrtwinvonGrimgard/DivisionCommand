/**
 * Soforteinsätze (Katalog). Nur Daten; Ziele und Codes wertet die Engine aus.
 *
 * Keine Kommentare pro Karte (zu umfangreich). Änderungen an Werten oder
 * Effekten sind Regeländerungen und gehören nicht in diese Aufräumung.
 */
window.DC_SET_TYPES = window.DC_SET_TYPES || {};
window.DC_SET_TYPES["Soforteinsatz"] = [
  {
    "id": "dc_so_marschbefehl",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Marschbefehl",
    "ap": 1,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz",
      "bewegung"
    ],
    "text": "Ziehe eine Infanterie. Du darfst sie in diesem Zug spielen.",
    "effects": [
      {
        "code": "DRAW_AND_PLAY_INFANTRY"
      }
    ],
    "flavor": "Der Befehl ist klar. Ob er Sinn hat, ist egal.",
    "image": "soforteinsatz/A035.jpg",
    "max_copies": 4,
    "collector": "A035",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_blutzeuge",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Blutzeuge",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz",
      "glaube"
    ],
    "text": "Opfere eine eigene Infanterie. Eine gegnerische Einheit im Abschnitt erleidet 3 Schaden.",
    "effects": [
      {
        "code": "SACRIFICE_INFANTRY_DAMAGE",
        "param": {
          "damage": 3
        }
      }
    ],
    "flavor": "Einer weniger auf unserer Seite. Einer weniger auf ihrer.",
    "image": "soforteinsatz/A043.jpg",
    "max_copies": 2,
    "collector": "A043",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_sammelruf",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Sammelruf",
    "ap": 1,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Ziehe eine Infanterie aus dem Ablagestapel auf die Hand.",
    "effects": [
      {
        "code": "RETURN_INFANTRY_FROM_DISCARD"
      }
    ],
    "flavor": "Wer noch laufen kann, kommt.",
    "image": "soforteinsatz/A046.jpg",
    "max_copies": 4,
    "collector": "A046",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_armageddon",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Armageddon",
    "ap": 8,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Sämtliche Karten und Tokens vom Spielfeld und beide Hände auf den Ablagestapel. Beide ziehen 5. Münze bestimmt, wer wieder beginnt.",
    "effects": [
      {
        "code": "ARMAGEDDON"
      }
    ],
    "flavor": "Alles, was jemals war, soll nun zu Staub verfallen",
    "image": "soforteinsatz/A098.jpg",
    "max_copies": 1,
    "collector": "A098",
    "rarity": "gold"
  },
  {
    "id": "dc_so_blinder_gehorsam",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Blinder Gehorsam",
    "ap": 6,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Auf Befehl: Alle eigenen Fronteinheiten greifen in diesem Zug ohne AP an und erhalten +2 Angriff. Nur eigener Zug.",
    "effects": [
      {
        "code": "COMMAND_ATTACK",
        "param": {
          "atk": 2,
          "free": true
        }
      }
    ],
    "flavor": "Verlass dich auf Andere und du bist verlassen.",
    "image": "soforteinsatz/A099.jpg",
    "max_copies": 2,
    "collector": "A099",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_bod_luft",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Boden-Luft-Rakete",
    "verdeckt_ok": true,
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz",
      "luftabwehr"
    ],
    "text": "Verhindere den Schaden eines feindlichen Luftangriffs.",
    "effects": [
      {
        "code": "CANCEL_AIR_DAMAGE"
      }
    ],
    "flavor": "Er war lang genug da oben!",
    "image": "soforteinsatz/A100.jpg",
    "max_copies": 2,
    "collector": "A100",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_dammbruch",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Dammbruch",
    "ap": 6,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Die gesamte Unterstützungslinie des Gegners wird vom Spielfeld entfernt.",
    "effects": [
      {
        "code": "CLEAR_ENEMY_SUPPORT"
      }
    ],
    "flavor": "Irgendwann kommt alles runter was man aufgebaut hat.",
    "image": "soforteinsatz/A101.jpg",
    "max_copies": 2,
    "collector": "A101",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_deckung",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Deckung suchen",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Eine Fronteinheit deiner Wahl erhält +3 Verteidigung. Der Bonus endet, wenn die Einheit angreift.",
    "effects": [
      {
        "code": "COVER_SEEK",
        "param": {
          "def": 3
        }
      }
    ],
    "image": "soforteinsatz/A102.jpg",
    "max_copies": 2,
    "collector": "A102",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_letzter",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Der Letzte der steht",
    "ap": 3,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Opfere die eigene Front bis auf eine Einheit. Sie erhält +1 ATK und +1 DEF je geopferter Einheit. Wird sie besiegt, erhält der Gegner 1 SP.",
    "effects": [
      {
        "code": "LAST_STAND"
      }
    ],
    "flavor": "Einer gegen Alle. Alle gegen einen.",
    "image": "soforteinsatz/A103.jpg",
    "max_copies": 2,
    "collector": "A103",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_kavallerie",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Eingriff der Kavallerie",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Gepanzerte Fahrzeuge erhalten +2 Angriff bis zum Ende des Zuges.",
    "effects": [
      {
        "code": "CAVALRY_ATK",
        "param": {
          "atk": 2
        }
      }
    ],
    "image": "soforteinsatz/A104.jpg",
    "max_copies": 2,
    "collector": "A104",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_gassen",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Einsame Gassen",
    "ap": 6,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Suche so viele Einheiten im Deck wie freie Frontplätze. Lege sie kostenlos offen auf gewählte Slots.",
    "effects": [
      {
        "code": "EMPTY_STREETS"
      }
    ],
    "flavor": "Hier wohnt fast niemand mehr.",
    "image": "soforteinsatz/A105.jpg",
    "max_copies": 2,
    "collector": "A105",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_geist",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Geist in den Trümmern",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wenn der Gegner im letzten Zug eine Unterstützung verloren hat, wirft er 2 Handkarten ab.",
    "effects": [
      {
        "code": "GHOST_RUINS"
      }
    ],
    "flavor": "Es ist als wären sie immer noch dort.",
    "image": "soforteinsatz/A106.jpg",
    "max_copies": 2,
    "collector": "A106",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_vorsprung",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Geistiger Vorsprung",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Mobilisiere eine Einheit sofort für einen Angriff, wenn der Gegner dich gerade angreifen möchte.",
    "effects": [
      {
        "code": "GHOST_STRIKE"
      }
    ],
    "flavor": "Fest entschlossen und gerade deswegen so vorhersehbar.",
    "image": "soforteinsatz/A107.jpg",
    "max_copies": 2,
    "collector": "A107",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_mobil",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Generalmobilmachung",
    "ap": 4,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
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
    "flavor": "Für Gott und Vaterland!",
    "image": "soforteinsatz/A108.jpg",
    "max_copies": 2,
    "collector": "A108",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_durchschuss",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Glatter Durchschuss",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Eine deiner gepanzerten Einheiten verursacht doppelten Kampfschaden bis zum Ende des Zuges.",
    "effects": [
      {
        "code": "DOUBLE_COMBAT"
      }
    ],
    "flavor": "Eben war er noch hier. Nun ist er fort.",
    "image": "soforteinsatz/A109.jpg",
    "max_copies": 2,
    "collector": "A109",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_instand",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Instandsetzung",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Fahrzeug von der Front auf die Hand. Nächster eigener Zug 0 AP erneut ausspielen. Negative Werte weg, Ausrüstung bleibt.",
    "effects": [
      {
        "code": "REPAIR_BOUNCE"
      }
    ],
    "flavor": "Wir schrauben Alles wieder zusammen.",
    "image": "soforteinsatz/A110.jpg",
    "max_copies": 2,
    "collector": "A110",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_lage",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Lagebesprechung",
    "ap": 0,
    "atk": null,
    "def": null,
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
    "flavor": "Uhrenvergleich!",
    "image": "soforteinsatz/A111.jpg",
    "max_copies": 2,
    "collector": "A111",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_luftschlag",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Luftschlag",
    "ap": 4,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz",
      "luft",
      "luftschlag"
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
    "flavor": "Kehre zurück zum Stützpunkt!",
    "image": "soforteinsatz/A112.jpg",
    "max_copies": 2,
    "collector": "A112",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_martyrium",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Martyrium",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Opfere eine eigene Fronteinheit. Einer feindlichen Fronteinheit 4 Schaden.",
    "effects": [
      {
        "code": "MARTYR",
        "param": {
          "dmg": 4
        }
      }
    ],
    "flavor": "Niemand kommt zum Vater, außer durch mich.",
    "image": "soforteinsatz/A113.jpg",
    "max_copies": 2,
    "collector": "A113",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_ehren",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Militärische Ehren",
    "verdeckt_ok": true,
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Bis zu drei eigene Einheiten, die bereits feindliche Einheiten zerstört haben, +2 ATK und +2 DEF bis Zugende.",
    "effects": [
      {
        "code": "HONORS",
        "param": {
          "atk": 2,
          "def": 2,
          "count": 3
        }
      }
    ],
    "flavor": "Nach ihren Taten sollt ihr sie messen.",
    "image": "soforteinsatz/A114.jpg",
    "max_copies": 2,
    "collector": "A114",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_minenfeld",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Minenfeld",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz",
      "befestigung",
      "minenfeld"
    ],
    "text": "Minenfeld-Token vor eine eigene Einheit. Angreifer erleidet 3 Schaden vor dem Kampf. Token hält 2 Auslösungen.",
    "effects": [
      {
        "code": "LAY_MINE",
        "param": {
          "dmg": 3,
          "charges": 2
        }
      }
    ],
    "flavor": "Als ob man einen Schatz findet. Nur ohne die Freude.",
    "image": "soforteinsatz/A115.jpg",
    "max_copies": 2,
    "collector": "A115",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_mobilisierung",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Mobilisierung",
    "ap": 3,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Durchsuche das Deck nach bis zu 2 Infanterie-Einheiten auf die Hand. Eine davon darfst du sofort ohne AP spielen.",
    "effects": [
      {
        "code": "MOBILIZE_INF"
      }
    ],
    "flavor": "Die letzten Meter gehören uns!",
    "image": "soforteinsatz/A116.jpg",
    "max_copies": 2,
    "collector": "A116",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_munition",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Munitionstreffer",
    "verdeckt_ok": true,
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wenn du in diesem Zug von einer feindlichen gepanzerten Einheit angegriffen wirst, fügt sie sich stattdessen Schaden in Höhe ihrer AP-Kosten zu.",
    "effects": [
      {
        "code": "AMMO_COOK"
      }
    ],
    "flavor": "Der ist geplatzt!",
    "image": "soforteinsatz/A117.jpg",
    "max_copies": 2,
    "collector": "A117",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_napalm",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Napalm",
    "ap": 3,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz",
      "luft",
      "luftschlag"
    ],
    "text": "Gegnerische Fronteinheit: 3 Schaden, danach jeder eigene Zug des Besitzers 1 Schaden.",
    "effects": [
      {
        "code": "NAPALM",
        "param": {
          "now": 3,
          "tick": 1
        }
      }
    ],
    "flavor": "5 Minuten von beiden Seiten scharf anbraten.",
    "image": "soforteinsatz/A118.jpg",
    "max_copies": 2,
    "collector": "A118",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_pause",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Pause",
    "verdeckt_ok": true,
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Gewählte Einheit bricht sofort ab und handelt erst wieder im nächsten Zug ihres Besitzers. Verdeckt in den Support legbar.",
    "effects": [
      {
        "code": "PAUSE_UNIT"
      }
    ],
    "flavor": "Ich kann einfach nicht mehr weiter.",
    "image": "soforteinsatz/A119.jpg",
    "max_copies": 2,
    "collector": "A119",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_massen",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Psychologie der Massen",
    "ap": 6,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Spiele so viele Fronteinheiten von der Hand wie du möchtest, ohne AP-Kosten.",
    "effects": [
      {
        "code": "MASS_DEPLOY"
      }
    ],
    "flavor": "Der Geist der Masse ist nur das Gefäß der Ideologie anderer Mächte.",
    "image": "soforteinsatz/A120.jpg",
    "max_copies": 2,
    "collector": "A120",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_eifer",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Religiöser Eifer",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Eigene Infanterie +3 Angriff bis Zugende. Danach 2 Schaden an diese Einheit.",
    "effects": [
      {
        "code": "ZEAL",
        "param": {
          "atk": 3,
          "after": 2
        }
      }
    ],
    "flavor": "Unser Weg ist erleuchtet.",
    "image": "soforteinsatz/A121.jpg",
    "max_copies": 2,
    "collector": "A121",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_raeum",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Räumkommando",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Entferne ein Minenfeld-Token vor einer feindlichen Einheit.",
    "effects": [
      {
        "code": "CLEAR_MINE"
      }
    ],
    "flavor": "Das war gute Arbeit!",
    "image": "soforteinsatz/A122.jpg",
    "max_copies": 2,
    "collector": "A122",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_selbst",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Selbstopfer",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Zerstöre eine eigene Fronteinheit, um zwei gegnerische Karten in Reichweite zu zerstören.",
    "effects": [
      {
        "code": "SELF_SAC",
        "param": {
          "count": 2
        }
      }
    ],
    "flavor": "Manche Kriege werden durch die Entschlossenheit zum Untergang entschieden.",
    "image": "soforteinsatz/A123.jpg",
    "max_copies": 2,
    "collector": "A123",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_engel",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Silberner Engel",
    "ap": 0,
    "atk": null,
    "def": null,
    "verdeckt_ok": true,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Eigene Infanterie, die diesen Zug Schaden erleiden würde: Münze, Kopf negiert allen Schaden diesen Zug.",
    "effects": [
      {
        "code": "SILVER_ANGEL"
      }
    ],
    "flavor": "Ein Hoch auf das Finanzwesen!",
    "image": "soforteinsatz/A124.jpg",
    "max_copies": 2,
    "collector": "A124",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_stand",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Standgericht",
    "ap": 0,
    "atk": null,
    "def": null,
    "verdeckt_ok": true,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Opfere eine eigene Fronteinheit. Die übrigen +2 Angriff bis Zugende.",
    "effects": [
      {
        "code": "COURT_MARTIAL",
        "param": {
          "atk": 2
        }
      }
    ],
    "flavor": "Wer den Krieg versteht sollte den Tod nicht fürchten.",
    "image": "soforteinsatz/A125.jpg",
    "max_copies": 2,
    "collector": "A125",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_formation",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Standhafte Formation",
    "ap": 0,
    "atk": null,
    "def": null,
    "verdeckt_ok": true,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Eigene Fronteinheit +1 Angriff und +2 Verteidigung bis Zugende.",
    "effects": [
      {
        "code": "FORMATION",
        "param": {
          "atk": 1,
          "def": 2
        }
      }
    ],
    "flavor": "Haltet die Linie! Der Sieg ist nah!",
    "image": "soforteinsatz/A126.jpg",
    "max_copies": 2,
    "collector": "A126",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_strahlung",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Strahlung",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Bis zu drei benachbarte gegnerische Einheiten. Nur mittlere/schwere gepanzerte Fahrzeuge überleben und weichen einen Zug in den Support.",
    "effects": [
      {
        "code": "RADIATION"
      }
    ],
    "flavor": "Wenn zerreißt was verbunden, klaffen zahllose Wunden.",
    "image": "soforteinsatz/A127.jpg",
    "max_copies": 2,
    "collector": "A127",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_verpflegung",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Verpflegung",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Bis zu 3 Verteidigung auf eigene Infanterie verteilen. Diese Einheiten greifen diesen Zug nicht an.",
    "effects": [
      {
        "code": "RATIONS",
        "param": {
          "def": 3
        }
      }
    ],
    "flavor": "Ein voller Magen und ein Moment der Ruhe.",
    "image": "soforteinsatz/A128.jpg",
    "max_copies": 2,
    "collector": "A128",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_waffen",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Waffenlieferung",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Entferne jeden Angriffs-Malus der gewählten eigenen Einheit. Verteidigungseffekte bleiben.",
    "effects": [
      {
        "code": "CLEAR_ATK_MALUS"
      }
    ],
    "flavor": "Das nenne ich Versorgung!",
    "image": "soforteinsatz/A129.jpg",
    "max_copies": 2,
    "collector": "A129",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_widerstand",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Widerstand",
    "ap": 0,
    "atk": null,
    "def": null,
    "verdeckt_ok": true,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Feindliche Fronteinheit. Münze: Kopf Kampf gegen rechten Nachbarn, Zahl gegen linken. Ohne Niemandsland.",
    "effects": [
      {
        "code": "RESIST"
      }
    ],
    "flavor": "Das ist Hochverrat!",
    "image": "soforteinsatz/A130.jpg",
    "max_copies": 2,
    "collector": "A130",
    "rarity": "bronze"
  },
  {
    "id": "dc_so_volk",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Wille des Volkes",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Alle Infanterie +2 Angriff bis Zugende. Ziehe 1 für jede eigene Einheit, die in diesem Zug zerstört wird.",
    "effects": [
      {
        "code": "WILL_PEOPLE"
      }
    ],
    "flavor": "Wenn einer von uns fällt, dann stehen 100 auf.",
    "image": "soforteinsatz/A131.jpg",
    "max_copies": 2,
    "collector": "A131",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nachschubstoss_162",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Nachschubstoß",
    "ap": 0,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: heile 1.",
    "effects": [
      {
        "code": "HEAL",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Was fehlt, wird gefahren.",
    "image": "soforteinsatz/B162.jpg",
    "max_copies": 1,
    "collector": "B162",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_munitionsregen_163",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Munitionsregen",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Alle eigenen Artillerie: +2 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF_ALL_OWN",
        "param": {
          "atk": 2,
          "filter": "artillerie",
          "until": "turn"
        }
      }
    ],
    "flavor": "Regen, der bezahlt wurde.",
    "image": "soforteinsatz/B163.jpg",
    "max_copies": 1,
    "collector": "B163",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_kettentausch_164",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Kettentausch",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 DEF; heile 1.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": 1,
          "until": "turn"
        }
      },
      {
        "code": "HEAL",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Neue Kette, alte Front.",
    "image": "soforteinsatz/B164.jpg",
    "max_copies": 1,
    "collector": "B164",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_sofortbestellung_165",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Sofortbestellung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe 1 Karte. Deine nächste Ausrüstung kostet 1 AP weniger (mind. 1).",
    "effects": [
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      },
      {
        "code": "COST_NEXT",
        "param": {
          "type": "Ausrüstung",
          "amount": 1
        }
      }
    ],
    "flavor": "Die Bestellung war schon unterwegs.",
    "image": "soforteinsatz/B165.jpg",
    "max_copies": 1,
    "collector": "B165",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_flaechensalve_166",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Flächensalve",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle 2 gegnerische Fronteinheiten: je 1 Schaden.",
    "effects": [
      {
        "code": "DEAL_DAMAGE",
        "param": {
          "value": 1,
          "count": 2
        }
      }
    ],
    "flavor": "Flächig — wie die Walze.",
    "image": "soforteinsatz/B166.jpg",
    "max_copies": 1,
    "collector": "B166",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 2,
      "upto": false
    }
  },
  {
    "id": "dc_b_werkalarme_167",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Werkalarme",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe 1 Karte. Deine nächste Einheit kostet 1 AP weniger (mind. 1).",
    "effects": [
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      },
      {
        "code": "COST_NEXT",
        "param": {
          "type": "Einheit",
          "amount": 1
        }
      }
    ],
    "flavor": "Alarm heißt Produktion, nicht Panik.",
    "image": "soforteinsatz/B167.jpg",
    "max_copies": 1,
    "collector": "B167",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_preisdruck_168",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Preisdruck",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: −2 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": -2,
          "until": "turn",
          "enemy": true
        }
      }
    ],
    "flavor": "Druck auf die andere Bilanz.",
    "image": "soforteinsatz/B168.jpg",
    "max_copies": 1,
    "collector": "B168",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_kolonnenbruch_169",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Kolonnenbruch",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: zerstöre sie, wenn sie 2 DEF oder weniger hat.",
    "effects": [
      {
        "code": "DESTROY_IF_DEF",
        "param": {
          "maxDef": 2
        }
      }
    ],
    "flavor": "Was zu leicht steht, wird abgeschrieben.",
    "image": "soforteinsatz/B169.jpg",
    "max_copies": 1,
    "collector": "B169",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_dauerfeuerbefehl_170",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Dauerfeuerbefehl",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: sie darf erneut angreifen.",
    "effects": [
      {
        "code": "EXTRA_ATTACK",
        "param": {}
      }
    ],
    "flavor": "Kein Warten auf das Ministerium.",
    "image": "soforteinsatz/B170.jpg",
    "max_copies": 1,
    "collector": "B170",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_nachlieferung_171",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Nachlieferung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Bringe zerstörten Panzer/Artillerie mit 2 DEF zurück.",
    "effects": [
      {
        "code": "RETURN_UNIT_GRAVE",
        "param": {
          "def": 2,
          "filter": "panzer|artillerie"
        }
      }
    ],
    "flavor": "Nachgeliefert. Weiter.",
    "image": "soforteinsatz/B171.jpg",
    "max_copies": 1,
    "collector": "B171",
    "rarity": "gold"
  },
  {
    "id": "dc_b_feuerwalze_172",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Walzenfeuer",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Alle gegnerischen Fronteinheiten erleiden 1 Schaden.",
    "effects": [
      {
        "code": "MASS_DAMAGE",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Anhaltend. Munitionsintensiv. Geschäft.",
    "image": "soforteinsatz/B172.jpg",
    "max_copies": 1,
    "collector": "B172",
    "rarity": "gold",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_materialersatz_173",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Materialnachschub",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe 1 Karte. Heile 1 an allen eigenen Panzer und Artillerie.",
    "effects": [
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      },
      {
        "code": "HEAL",
        "param": {
          "value": 1,
          "all": true,
          "filter": "panzer|artillerie"
        }
      }
    ],
    "flavor": "Rohre und Ketten bleiben im Spiel.",
    "image": "soforteinsatz/B173.jpg",
    "max_copies": 1,
    "collector": "B173",
    "rarity": "gold",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_marschbefehl_121",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Marschorder",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Ziehe eine Infanterie. Du darfst sie in diesem Zug spielen.",
    "effects": [
      {
        "code": "DRAW_AND_PLAY_INFANTRY"
      }
    ],
    "flavor": "Antreten ist der erste Satz.",
    "image": "soforteinsatz/B121.jpg",
    "max_copies": 1,
    "collector": "B121",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_blutzeuge_122",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Blutzeugnis",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Opfere eine eigene Infanterie. Eine gegnerische Einheit im Abschnitt erleidet 3 Schaden.",
    "effects": [
      {
        "code": "DEAL_DAMAGE",
        "param": {
          "value": 3
        }
      },
      {
        "code": "SACRIFICE_INFANTRY_DAMAGE",
        "param": {
          "damage": 3
        }
      }
    ],
    "flavor": "Das Opfer ist erlaubt. Nicht immer nötig.",
    "image": "soforteinsatz/B122.jpg",
    "max_copies": 1,
    "collector": "B122",
    "rarity": "silver",
    "target": {
      "side": "enemy"
    }
  },
  {
    "id": "dc_b_sammelruf_123",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Sammelsignal",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +2 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 2,
          "until": "turn"
        }
      }
    ],
    "flavor": "Der Ruf trägt weiter als der Schuss.",
    "image": "soforteinsatz/B123.jpg",
    "max_copies": 1,
    "collector": "B123",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_nachruckbefehl_124",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Nachruckbefehl",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Spiele eine Infanterie aus der Hand um 1 weniger (mind. 1); sie hat −1 DEF.",
    "effects": [
      {
        "code": "PLAY_INF_DISCOUNT",
        "param": {
          "amount": 1
        }
      }
    ],
    "flavor": "Die Lücke schließt sich mit Druck.",
    "image": "soforteinsatz/B124.jpg",
    "max_copies": 1,
    "collector": "B124",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kampfruf_125",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Kampfruf",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle einen eigenen Abschnitt: Infanterie dort +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF_SECTION",
        "targetSide": "own",
        "param": {
          "atk": 1,
          "filter": "infanterie",
          "until": "turn"
        }
      }
    ],
    "flavor": "Kurz. Klar. Genug.",
    "image": "soforteinsatz/B125.jpg",
    "max_copies": 1,
    "collector": "B125",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_opfergabe_126",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Opfergabe",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Opfere eine eigene Einheit mit 2 oder weniger DEF: heile eine andere um 2.",
    "effects": [
      {
        "code": "SACRIFICE",
        "param": {}
      },
      {
        "code": "HEAL",
        "param": {
          "value": 2,
          "side": "own"
        }
      }
    ],
    "flavor": "Der Tisch bleibt. Der Ritus nimmt.",
    "image": "soforteinsatz/B126.jpg",
    "max_copies": 1,
    "collector": "B126",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false,
      "maxDef": 2
    }
  },
  {
    "id": "dc_b_sturmglocke_127",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Sturmglocke",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +3 ATK bis Zugende; danach erleidet sie 1 Schaden.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 3,
          "until": "turn"
        }
      },
      {
        "code": "SELF_DAMAGE",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Der eine Schlag.",
    "image": "soforteinsatz/B127.jpg",
    "max_copies": 1,
    "collector": "B127",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_volkszorn_128",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Volkszorn",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle einen eigenen Abschnitt: Infanterie dort +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF_SECTION",
        "targetSide": "own",
        "param": {
          "atk": 1,
          "filter": "infanterie",
          "until": "turn"
        }
      }
    ],
    "flavor": "Eifer als Werkzeug, nicht als Ziel.",
    "image": "soforteinsatz/B128.jpg",
    "max_copies": 1,
    "collector": "B128",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_rekrutenwelle_129",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Rekrutenwelle",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Sieh die oberste Deckkarte an: Infanterie → auf die Hand, sonst abwerfen.",
    "effects": [
      {
        "code": "LOOK_TOP",
        "param": {
          "count": 1,
          "infantryToHand": true
        }
      }
    ],
    "flavor": "Jedes Jahr wieder möglich.",
    "image": "soforteinsatz/B129.jpg",
    "max_copies": 1,
    "collector": "B129",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_letzter_ruf_130",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Letzter Ruf",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Zerstöre eine eigene Infanterie: andere eigene Einheiten im Abschnitt +2 ATK bis Zugende.",
    "effects": [
      {
        "code": "SACRIFICE",
        "param": {
          "section_buff_atk": 2,
          "until": "turn",
          "no_enemy_destroy": true
        }
      }
    ],
    "flavor": "Der Name trägt die anderen.",
    "image": "soforteinsatz/B130.jpg",
    "max_copies": 1,
    "collector": "B130",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false,
      "filter": "infanterie"
    }
  },
  {
    "id": "dc_b_breites_aufgebot_143",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Volksaufgebot",
    "ap": 0,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Eigene Infanterie kostet 1 AP weniger zum Ausspielen, mindestens 1. Eigene Infanterie hat +1 DEF.",
    "effects": [
      {
        "code": "PLAY_INF_DISCOUNT",
        "param": {
          "amount": 1
        }
      }
    ],
    "flavor": "Breites Aufgebot — das Land stellt die Breite, nicht den Helden.",
    "image": "soforteinsatz/B143.jpg",
    "max_copies": 1,
    "collector": "B143",
    "rarity": "gold",
    "target": {
      "side": "own"
    }
  },
  {
    "id": "dc_b_sturmangriff_144",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Sturmlauf",
    "ap": 0,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +2 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 2,
          "until": "turn"
        }
      }
    ],
    "flavor": "Sturmangriff — ein Schlag, geschuldet und gemessen.",
    "image": "soforteinsatz/B144.jpg",
    "max_copies": 1,
    "collector": "B144",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_treueeid_637",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Treueeid",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +2 DEF.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": 2,
          "until": "turn"
        }
      }
    ],
    "flavor": "Gesprochen. Gezählt.",
    "image": "soforteinsatz/B637.jpg",
    "max_copies": 1,
    "collector": "B637",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_sofortabloesung_638",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Sofortablösung",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: heile 2. Ziehe 1 Karte.",
    "effects": [
      {
        "code": "HEAL",
        "param": {
          "value": 2
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Frisch Blut in alte Stellungen.",
    "image": "soforteinsatz/B638.jpg",
    "max_copies": 1,
    "collector": "B638",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_konzentrationsruf_639",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Konzentrationsruf",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle einen eigenen Abschnitt: Einheiten dort +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF_SECTION",
        "param": {
          "atk": 1,
          "filter": null,
          "until": "turn",
          "targetSide": "own"
        }
      }
    ],
    "flavor": "Zusammen oder gar nicht.",
    "image": "soforteinsatz/B639.jpg",
    "max_copies": 1,
    "collector": "B639",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_silberstern_640",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Silberstern",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +2 DEF. Ziehe 1 Karte.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 0,
          "def": 2,
          "until": "turn"
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Auszeichnung und Auftrag in einem.",
    "image": "soforteinsatz/B640.jpg",
    "max_copies": 1,
    "collector": "B640",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_kronbefehl_641",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Kronbefehl",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Zerstöre eine gegnerische Unterstützung oder verhindere ihre nächste Aktivierung (lege sie für einen Zug still).",
    "effects": [
      {
        "code": "DESTROY",
        "param": {
          "enemy": true
        }
      }
    ],
    "flavor": "Was die Krone streicht, gilt als ungültig.",
    "image": "soforteinsatz/B641.jpg",
    "max_copies": 1,
    "collector": "B641",
    "rarity": "silver",
    "target": {
      "side": "enemy"
    }
  },
  {
    "id": "dc_b_erbe_marsch_642",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Erbe-Marsch",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 0,
          "until": "turn"
        }
      }
    ],
    "flavor": "Die Straßen erinnern sich an Kolonnen.",
    "image": "soforteinsatz/B642.jpg",
    "max_copies": 1,
    "collector": "B642",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_notdepot_643",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Notdepot",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Ziehe 2 Karten. Lege 1 Karte aus der Hand ab.",
    "effects": [
      {
        "code": "DRAW_THEN_CHOOSE_DISCARD",
        "param": {
          "draw": 2,
          "discard": 1
        }
      }
    ],
    "flavor": "Geöffnet unter Feuer.",
    "image": "soforteinsatz/B643.jpg",
    "max_copies": 1,
    "collector": "B643",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_doppelschwur_644",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Doppelschwur",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 DEF.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Zwei Namen. Ein Eid.",
    "image": "soforteinsatz/B644.jpg",
    "max_copies": 1,
    "collector": "B644",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_druckpunkt_645",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Druckpunkt",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: 2 Schaden.",
    "effects": [
      {
        "code": "DEAL_DAMAGE",
        "param": {
          "value": 2
        }
      }
    ],
    "flavor": "Genau dort, wo die Karte es sagt.",
    "image": "soforteinsatz/B645.jpg",
    "max_copies": 1,
    "collector": "B645",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_linienhalten_646",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Linienhalten",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle einen eigenen Abschnitt: Einheiten dort +1 DEF bis Zugende.",
    "effects": [
      {
        "code": "BUFF_SECTION",
        "param": {
          "def": 1,
          "until": "turn",
          "targetSide": "own"
        }
      }
    ],
    "flavor": "Halten ist auch ein Angriff auf die Zeit.",
    "image": "soforteinsatz/B646.jpg",
    "max_copies": 1,
    "collector": "B646",
    "rarity": "silver"
  },
  {
    "id": "dc_b_schwerpunkt_659",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Schwerpunktbildung",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: 1 Schaden. Alle eigenen Einheiten: +2 ATK bis Zugende.",
    "effects": [
      {
        "code": "DEAL_DAMAGE",
        "param": {
          "value": 1
        }
      },
      {
        "code": "BUFF_ALL_OWN",
        "param": {
          "atk": 2,
          "filter": null,
          "until": "turn"
        }
      }
    ],
    "flavor": "Konzentration hat einen Preis.",
    "image": "soforteinsatz/B659.jpg",
    "max_copies": 1,
    "collector": "B659",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_abloesung_660",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Ablösung der Wache",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Zerstöre eine eigene Einheit. Spiele eine Einheit aus der Hand in denselben Abschnitt mit Kosten bis Kosten der Zerstörten +1. Heile sie um 1.",
    "effects": [
      {
        "code": "SACRIFICE",
        "param": {}
      },
      {
        "code": "REPLACE_UNIT",
        "param": {
          "costPlus": 1,
          "heal": 1
        }
      }
    ],
    "flavor": "Der Platz bleibt heilig. Die Person nicht.",
    "image": "soforteinsatz/B660.jpg",
    "max_copies": 1,
    "collector": "B660",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_weiter_397",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Weiter",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +3 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 3,
          "def": 0,
          "until": "turn"
        }
      }
    ],
    "flavor": "Nicht stehenbleiben.",
    "image": "soforteinsatz/B397.jpg",
    "max_copies": 1,
    "collector": "B397",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_schmerzstoss_398",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Schmerzstoß",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: danach erleidet sie 1 Schaden; +2 ATK bis Zugende.",
    "effects": [
      {
        "code": "SELF_DAMAGE",
        "param": {
          "value": 1
        }
      },
      {
        "code": "BUFF",
        "param": {
          "atk": 2,
          "def": 0,
          "until": "turn"
        }
      }
    ],
    "flavor": "Schmerz als Zündung.",
    "image": "soforteinsatz/B398.jpg",
    "max_copies": 1,
    "collector": "B398",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_zweiter_stoss_399",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Zweiter Stoß",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: sie darf erneut angreifen.",
    "effects": [
      {
        "code": "EXTRA_ATTACK",
        "param": {}
      }
    ],
    "flavor": "Der erste Stoß reicht selten.",
    "image": "soforteinsatz/B399.jpg",
    "max_copies": 1,
    "collector": "B399",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_blutstiller_400",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Blutstiller",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: heile 2; −1 ATK bis Zugende.",
    "effects": [
      {
        "code": "HEAL",
        "param": {
          "value": 2
        }
      },
      {
        "code": "BUFF",
        "param": {
          "atk": -1,
          "until": "turn",
          "enemy": true
        }
      }
    ],
    "flavor": "Stoppen, nicht heilen.",
    "image": "soforteinsatz/B400.jpg",
    "max_copies": 1,
    "collector": "B400",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_durchbruch_401",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Durchbruch",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: 1 Schaden.",
    "effects": [
      {
        "code": "DEAL_DAMAGE",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Öffnen kostet eigene Substanz.",
    "image": "soforteinsatz/B401.jpg",
    "max_copies": 1,
    "collector": "B401",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_notimplantat_402",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Notimplantat",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: 1 Schaden; +1 ATK bis Zugende, +1 DEF.",
    "effects": [
      {
        "code": "DEAL_DAMAGE",
        "param": {
          "value": 1
        }
      },
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 1,
          "until": "turn",
          "side": "own"
        }
      }
    ],
    "flavor": "Eingesetzt ohne Narkose.",
    "image": "soforteinsatz/B402.jpg",
    "max_copies": 1,
    "collector": "B402",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_ausfallquote_403",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Ausfallquote",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: danach erleidet sie 1 Schaden. Ziehe 2 Karten.",
    "effects": [
      {
        "code": "DRAW",
        "param": {
          "value": 2
        }
      },
      {
        "code": "SELF_DAMAGE",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Daten gegen Gewebe.",
    "image": "soforteinsatz/B403.jpg",
    "max_copies": 1,
    "collector": "B403",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_offene_wunde_404",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Offene Wunde",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF. Ziehe 1 Karte.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 1,
          "until": "turn"
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Offen halten. Nutzen.",
    "image": "soforteinsatz/B404.jpg",
    "max_copies": 1,
    "collector": "B404",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_keilbefehl_405",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Keilbefehl",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: 1 Schaden. Alle eigenen Einheiten: +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "DEAL_DAMAGE",
        "param": {
          "value": 1
        }
      },
      {
        "code": "BUFF_ALL_OWN",
        "param": {
          "atk": 1,
          "filter": null,
          "until": "turn"
        }
      }
    ],
    "flavor": "Gleicher Stoß. Ungleiche Last.",
    "image": "soforteinsatz/B405.jpg",
    "max_copies": 1,
    "collector": "B405",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_ersatzgriff_406",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Ersatzgriff",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: heile 1; danach erleidet sie 1 Schaden.",
    "effects": [
      {
        "code": "HEAL",
        "param": {
          "value": 1
        }
      },
      {
        "code": "DEAL_DAMAGE",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Umverteilung.",
    "image": "soforteinsatz/B406.jpg",
    "max_copies": 1,
    "collector": "B406",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_stosstrupp_419",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Stoßtruppbefehl",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: 2 Schaden; +3 ATK bis Zugende.",
    "effects": [
      {
        "code": "DEAL_DAMAGE",
        "param": {
          "value": 2
        }
      },
      {
        "code": "BUFF",
        "param": {
          "atk": 3,
          "def": 0,
          "until": "turn",
          "side": "own"
        }
      }
    ],
    "flavor": "Der eine Stoß.",
    "image": "soforteinsatz/B419.jpg",
    "max_copies": 1,
    "collector": "B419",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_weiterkaempfen_420",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Weiter vorwärts",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +2 ATK bis Zugende, +1 DEF.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 2,
          "def": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Weitermachen, wenn es blutet.",
    "image": "soforteinsatz/B420.jpg",
    "max_copies": 1,
    "collector": "B420",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_fruehe_meldung_819",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Frühe Meldung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende. Markiere 1 Feind als beobachtet.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 0,
          "until": "turn"
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
    "flavor": "Krise kurz halten. Bevor sie Gewohnheit wird.",
    "image": "soforteinsatz/B819.jpg",
    "max_copies": 1,
    "collector": "B819",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_neue_lage_820",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Neue Lage",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF. Markiere 1 Feind als beobachtet.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 1,
          "until": "turn"
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
    "flavor": "Straße neuer als das Bild in der Halle.",
    "image": "soforteinsatz/B820.jpg",
    "max_copies": 1,
    "collector": "B820",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_kurzer_schutz_821",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Kurzer Schutz",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Alle eigenen Einheiten: +2 ATK bis Zugende. Markiere 1 Feind als beobachtet.",
    "effects": [
      {
        "code": "BUFF_ALL_OWN",
        "param": {
          "atk": 2,
          "filter": null,
          "until": "turn"
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
    "flavor": "Kurzer Schutz nach dem Raster.",
    "image": "soforteinsatz/B821.jpg",
    "max_copies": 1,
    "collector": "B821",
    "rarity": "gold",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_aufklaerungsschlag_822",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Spähschlag",
    "ap": 0,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Alle eigenen Einheiten: +1 ATK bis Zugende. Markiere 1 Feind als beobachtet.",
    "effects": [
      {
        "code": "BUFF_ALL_OWN",
        "param": {
          "atk": 1,
          "filter": null,
          "until": "turn"
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
    "flavor": "Aufklärungsschlag — sehen ist der erste Treffer.",
    "image": "soforteinsatz/B822.jpg",
    "max_copies": 1,
    "collector": "B822",
    "rarity": "gold",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_lokalisierung_823",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Ortungsbefehl",
    "ap": 0,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: +1 ATK bis Zugende, −1 DEF (mind. 1); −1 DEF (mind. 1).",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": -1,
          "until": "turn",
          "side": "own"
        }
      },
      {
        "code": "BUFF",
        "param": {
          "def": -1,
          "until": "turn",
          "enemy": true
        }
      }
    ],
    "flavor": "Lokalisierung — der Ort ist schon die Wunde.",
    "image": "soforteinsatz/B823.jpg",
    "max_copies": 1,
    "collector": "B823",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_stille_woche_824",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Stille Woche",
    "ap": 0,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Alle eigenen Einheiten: +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF_ALL_OWN",
        "param": {
          "atk": 1,
          "filter": null,
          "until": "turn"
        }
      }
    ],
    "flavor": "Weniger Behauptung. Kleiner handeln.",
    "image": "soforteinsatz/B824.jpg",
    "max_copies": 1,
    "collector": "B824",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_buerger_ruf_825",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Bürger-Ruf",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Alle eigenen Einheiten: +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF_ALL_OWN",
        "param": {
          "atk": 1,
          "filter": null,
          "until": "turn"
        }
      }
    ],
    "flavor": "Reservist fehlt in der Schicht. Nicht auf dem Sockel.",
    "image": "soforteinsatz/B825.jpg",
    "max_copies": 1,
    "collector": "B825",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_netz_check_826",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Netz-Check",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 DEF. Markiere 1 Feind als beobachtet.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": 1,
          "until": "turn"
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
    "flavor": "Gerät prüfen. Nicht den Körper umbauen.",
    "image": "soforteinsatz/B826.jpg",
    "max_copies": 1,
    "collector": "B826",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_rasterfrage_827",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Rasterfrage",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Spiele eine Infanterie aus der Hand mit 1 weniger (min. 1).",
    "effects": [
      {
        "code": "PLAY_INF_DISCOUNT",
        "param": {
          "amount": 1
        }
      }
    ],
    "flavor": "Wer unterschreiben darf?",
    "image": "soforteinsatz/B827.jpg",
    "max_copies": 1,
    "collector": "B827",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zwei_saetze_828",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Zwei Sätze",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle 2 eigene Fronteinheiten: je +2 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 2,
          "until": "turn",
          "count": 2
        }
      }
    ],
    "flavor": "Wissen nach unten. Kriegseröffnung nicht.",
    "image": "soforteinsatz/B828.jpg",
    "max_copies": 1,
    "collector": "B828",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 2,
      "upto": false
    }
  },
  {
    "id": "dc_b_boden_vor_see_829",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Boden vor See",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle bis zu 2 eigene Fronteinheiten: je +2 ATK bis Zugende. Ziehe 1 Karte.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 2,
          "until": "turn",
          "count": 2,
          "upto": true
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Schiffe bringen. Boden hält.",
    "image": "soforteinsatz/B829.jpg",
    "max_copies": 1,
    "collector": "B829",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 2,
      "upto": true
    }
  },
  {
    "id": "dc_b_oliv_halt_830",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Oliv Halt",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 DEF; +1 ATK bis Zugende, +1 DEF. Wähle einen eigenen Abschnitt: Einheiten dort +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF_SECTION",
        "targetSide": "own",
        "param": {
          "atk": 1,
          "filter": null,
          "until": "turn"
        }
      },
      {
        "code": "BUFF",
        "param": {
          "def": 1,
          "until": "turn"
        }
      },
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Oliv. Sandstreifen. Arbeitskleidung.",
    "image": "soforteinsatz/B830.jpg",
    "max_copies": 1,
    "collector": "B830",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_gesetzte_lage_879",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Gesetzte Lage",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Dein nächster Soforteinsatz kostet 1 AP weniger (mind. 0).",
    "effects": [
      {
        "code": "COST_NEXT",
        "param": {
          "type": "Soforteinsatz",
          "amount": 1
        }
      }
    ],
    "flavor": "Lage hinlegen. Nicht folgen.",
    "image": "soforteinsatz/B879.jpg",
    "max_copies": 1,
    "collector": "B879",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_gegenzug_880",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Gegenzug",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Alle eigenen Einheiten: +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF_ALL_OWN",
        "param": {
          "atk": 1,
          "filter": null,
          "until": "turn"
        }
      }
    ],
    "flavor": "Zug gegen Zug. Kein Gehorsam.",
    "image": "soforteinsatz/B880.jpg",
    "max_copies": 1,
    "collector": "B880",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_falsche_akte_881",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Falsche Akte",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle bis zu 2 eigene Fronteinheiten: je +2 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 2,
          "until": "turn",
          "count": 2,
          "upto": true
        }
      }
    ],
    "flavor": "Falsche Akte. Schmerz schreibt um.",
    "image": "soforteinsatz/B881.jpg",
    "max_copies": 1,
    "collector": "B881",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "own",
      "count": 2,
      "upto": true
    }
  },
  {
    "id": "dc_b_scheinschwerpunkt_882",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Scheinangriff",
    "ap": 0,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen eigenen Abschnitt: Einheiten dort +1 DEF bis Zugende; Einheiten dort +1 ATK bis Ende des nächsten Zuges.",
    "effects": [
      {
        "code": "BUFF_SECTION",
        "targetSide": "own",
        "param": {
          "def": 1,
          "until": "turn"
        }
      },
      {
        "code": "BUFF_SECTION",
        "targetSide": "own",
        "param": {
          "atk": 1,
          "until": "next"
        }
      }
    ],
    "flavor": "Scheinschwerpunkt — wohin der Feind schauen soll.",
    "image": "soforteinsatz/B882.jpg",
    "max_copies": 1,
    "collector": "B882",
    "rarity": "gold"
  },
  {
    "id": "dc_b_abriegeln_883",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Abriegelungsbefehl",
    "ap": 0,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eigene Artillerie darf leeren Abschnitt beschießen; Einrückende erleiden 1 Schaden. Danach: decke 1 auf.",
    "effects": [
      {
        "code": "REVEAL",
        "param": {
          "count": 1
        }
      },
      {
        "code": "MASS_DAMAGE",
        "param": {
          "value": 1,
          "onEnter": true
        }
      }
    ],
    "flavor": "Abriegeln — die leere Gasse beißt.",
    "image": "soforteinsatz/B883.jpg",
    "max_copies": 1,
    "collector": "B883",
    "rarity": "gold",
    "target": {
      "side": "enemy"
    }
  },
  {
    "id": "dc_b_stille_quote_884",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Stille Quote",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 DEF; +1 ATK bis Zugende, +1 DEF. Alle eigenen Einheiten: +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF_ALL_OWN",
        "param": {
          "atk": 1,
          "filter": null,
          "until": "turn"
        }
      },
      {
        "code": "BUFF",
        "param": {
          "def": 1,
          "until": "turn"
        }
      },
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Preis genannt. Partie stockt nicht.",
    "image": "soforteinsatz/B884.jpg",
    "max_copies": 1,
    "collector": "B884",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_doppelrede_885",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Doppelrede",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen eigenen Abschnitt: Einheiten dort +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF_SECTION",
        "targetSide": "own",
        "param": {
          "atk": 1,
          "filter": null,
          "until": "turn"
        }
      }
    ],
    "flavor": "Sagen und meinen. Beides gelernt.",
    "image": "soforteinsatz/B885.jpg",
    "max_copies": 1,
    "collector": "B885",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zwei_lagen_886",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Zwei Lagen",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +2 ATK bis Zugende. Decke eine verdeckte gegnerische Einheit auf.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 2,
          "def": 0,
          "until": "turn"
        }
      },
      {
        "code": "REVEAL",
        "param": {
          "count": 1
        }
      }
    ],
    "flavor": "Zwei gültige Versionen. Eine Stellung.",
    "image": "soforteinsatz/B886.jpg",
    "max_copies": 1,
    "collector": "B886",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_aktenbefehl_887",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Aktenbefehl",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "1 Einheit +2 DEF; sie darf diesen Zug nicht bewegt werden. [Aktenbefehl]",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": 2,
          "until": "turn"
        }
      },
      {
        "code": "NO_MOVE_THIS_TURN",
        "param": {}
      }
    ],
    "flavor": "Befehl aus dem Archiv.",
    "image": "soforteinsatz/B887.jpg",
    "max_copies": 1,
    "collector": "B887",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kein_herr_888",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Kein Herr",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +2 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 2,
          "def": 0,
          "until": "turn"
        }
      }
    ],
    "flavor": "Niemand folgt. Alle spielen.",
    "image": "soforteinsatz/B888.jpg",
    "max_copies": 1,
    "collector": "B888",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_versorgungsnacht_889",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Versorgungsnacht",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe 1 Karte, dann wirf deine älteste Handkarte ab.",
    "effects": [
      {
        "code": "DRAW_DISCARD",
        "param": {
          "draw": 1,
          "discard": 1
        }
      }
    ],
    "flavor": "Nachschub selbst eine Information.",
    "image": "soforteinsatz/B889.jpg",
    "max_copies": 1,
    "collector": "B889",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_oliv_halt_890",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Olivstopp",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF. Decke eine verdeckte gegnerische Einheit auf.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 1,
          "until": "turn"
        }
      },
      {
        "code": "REVEAL",
        "param": {
          "count": 1
        }
      }
    ],
    "flavor": "Stumpfes Oliv hält. Siegel schwarz.",
    "image": "soforteinsatz/B890.jpg",
    "max_copies": 1,
    "collector": "B890",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_faellige_zeile_939",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Fällige Zeile",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Alle eigenen Einheiten: +2 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF_ALL_OWN",
        "param": {
          "atk": 2,
          "filter": null,
          "until": "turn"
        }
      }
    ],
    "flavor": "Zeile fällig. Nicht vergeben.",
    "image": "soforteinsatz/B939.jpg",
    "max_copies": 1,
    "collector": "B939",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_staffelung_940",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Staffelung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +3 DEF.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": 3,
          "until": "turn"
        }
      }
    ],
    "flavor": "Staffeln. Nicht streichen.",
    "image": "soforteinsatz/B940.jpg",
    "max_copies": 1,
    "collector": "B940",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_frueheres_datum_941",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Früheres Datum",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle bis zu 2 eigene Fronteinheiten: je +2 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 2,
          "until": "turn",
          "count": 2,
          "upto": true
        }
      }
    ],
    "flavor": "Früheres Datum. Wer zuerst frei — zahlt später.",
    "image": "soforteinsatz/B941.jpg",
    "max_copies": 1,
    "collector": "B941",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "own",
      "count": 2,
      "upto": true
    }
  },
  {
    "id": "dc_b_zielangriff_942",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Gezielter Zugriff",
    "ap": 0,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle ein Ziel. Erster Schaden daran +1 ATK; Angreifer +1 DEF. Wenn das Ziel fällt: ziehe 1.",
    "effects": [
      {
        "code": "ZIELANGRIFF",
        "param": {
          "firstDmgBonus": 1,
          "attackerDef": 1,
          "drawOnKill": 1
        }
      }
    ],
    "flavor": "Zielangriff — genannt, dann gebrochen.",
    "image": "soforteinsatz/B942.jpg",
    "max_copies": 1,
    "collector": "B942",
    "rarity": "gold",
    "target": {
      "side": "enemy"
    }
  },
  {
    "id": "dc_b_abschluss_943",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Abschlussbuchung",
    "ap": 0,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 0,
          "until": "turn"
        }
      }
    ],
    "flavor": "Abschluss — der Name ist durchgestrichen.",
    "image": "soforteinsatz/B943.jpg",
    "max_copies": 1,
    "collector": "B943",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_stundung_944",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Stundung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Dein nächster Soforteinsatz kostet 2 AP weniger (mind. 0).",
    "effects": [
      {
        "code": "COST_NEXT",
        "param": {
          "type": "Soforteinsatz",
          "amount": 2
        }
      }
    ],
    "flavor": "Frist als Zeile. Keine Gefälligkeit.",
    "image": "soforteinsatz/B944.jpg",
    "max_copies": 1,
    "collector": "B944",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_tausch_945",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Tausch",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "1 Einheit +2 DEF; sie darf diesen Zug nicht bewegt werden.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": 2,
          "until": "turn"
        }
      },
      {
        "code": "NO_MOVE_THIS_TURN",
        "param": {}
      }
    ],
    "flavor": "Tausch vor den Namen.",
    "image": "soforteinsatz/B945.jpg",
    "max_copies": 1,
    "collector": "B945",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_aufruf_946",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Aufruf",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +2 DEF.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": 2,
          "until": "turn"
        }
      }
    ],
    "flavor": "Aufruf nennt. Gehen schließt.",
    "image": "soforteinsatz/B946.jpg",
    "max_copies": 1,
    "collector": "B946",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_hausblatt_947",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Hausblatt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Dein nächster Soforteinsatz kostet 1 AP weniger (mind. 0). Ziehe 1 Karte.",
    "effects": [
      {
        "code": "COST_NEXT",
        "param": {
          "type": "Soforteinsatz",
          "amount": 1
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Blatt nennt Zeile. Kein Rühren.",
    "image": "soforteinsatz/B947.jpg",
    "max_copies": 1,
    "collector": "B947",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_kein_streichen_948",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Kein Streichen",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Spiele eine Infanterie aus der Hand mit 1 weniger (min. 1). [Kein Streichen]",
    "effects": [
      {
        "code": "PLAY_INF_DISCOUNT",
        "param": {
          "amount": 1
        }
      }
    ],
    "flavor": "Frieden vergibt nicht.",
    "image": "soforteinsatz/B948.jpg",
    "max_copies": 1,
    "collector": "B948",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_versorgungszeile_949",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Versorgungszeile",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe 2 Karten, dann wirf deine älteste Handkarte ab.",
    "effects": [
      {
        "code": "DRAW_DISCARD",
        "param": {
          "draw": 2,
          "discard": 1
        }
      }
    ],
    "flavor": "Material ist eine Zeile.",
    "image": "soforteinsatz/B949.jpg",
    "max_copies": 1,
    "collector": "B949",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_kurzer_strich_950",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Kurzer Strich",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: −1 DEF (mind. 1).",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": -1,
          "until": "turn",
          "enemy": true
        }
      }
    ],
    "flavor": "Strich klein. Kein Gold.",
    "image": "soforteinsatz/B950.jpg",
    "max_copies": 1,
    "collector": "B950",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_auffangbefehl_759",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Auffangbefehl",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Auffangen vor Gegenstoß.",
    "image": "soforteinsatz/B759.jpg",
    "max_copies": 1,
    "collector": "B759",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_gegenruf_760",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Gegenruf",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle bis zu 2 eigene Fronteinheiten: je +3 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 3,
          "until": "turn",
          "count": 2,
          "upto": true
        }
      }
    ],
    "flavor": "Ruf gleichmäßiger — Lenn hätte genickt.",
    "image": "soforteinsatz/B760.jpg",
    "max_copies": 1,
    "collector": "B760",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 2,
      "upto": true
    }
  },
  {
    "id": "dc_b_spaeter_stoss_761",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Später Stoß",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: −1 DEF (mind. 1).",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": -1,
          "until": "turn",
          "enemy": true
        }
      }
    ],
    "flavor": "Später und gleichmäßiger. Staat, kein Triumph.",
    "image": "soforteinsatz/B761.jpg",
    "max_copies": 1,
    "collector": "B761",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_auffangen_762",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Auffanglinie",
    "ap": 0,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 DEF; −1 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": 1,
          "until": "turn"
        }
      },
      {
        "code": "BUFF",
        "param": {
          "atk": -1,
          "until": "turn",
          "enemy": true
        }
      }
    ],
    "flavor": "Auffangen — erst halten, dann zurückgeben.",
    "image": "soforteinsatz/B762.jpg",
    "max_copies": 1,
    "collector": "B762",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_gegenstoss_763",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Kronengegenstoß",
    "ap": 0,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Alle eigenen Einheiten: +2 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF_ALL_OWN",
        "param": {
          "atk": 2,
          "filter": null,
          "until": "turn"
        }
      }
    ],
    "flavor": "Gegenstoß — die Antwort sitzt im gleichen Abschnitt.",
    "image": "soforteinsatz/B763.jpg",
    "max_copies": 1,
    "collector": "B763",
    "rarity": "gold",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_haushaltsfrage_764",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Haushaltsfrage",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen eigenen Abschnitt: Einheiten dort +2 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF_SECTION",
        "targetSide": "own",
        "param": {
          "atk": 2,
          "filter": null,
          "until": "turn"
        }
      }
    ],
    "flavor": "Wer bezahlt den Einsatz?",
    "image": "soforteinsatz/B764.jpg",
    "max_copies": 1,
    "collector": "B764",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_gleichmaessiger_ruf_765",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Gleichmäßiger Ruf",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Dein nächster Soforteinsatz kostet 2 AP weniger (mind. 0).",
    "effects": [
      {
        "code": "COST_NEXT",
        "param": {
          "type": "Soforteinsatz",
          "amount": 2
        }
      }
    ],
    "flavor": "Nicht wieder dieselben drei Bezirke.",
    "image": "soforteinsatz/B765.jpg",
    "max_copies": 1,
    "collector": "B765",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_nachtstellung_766",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Nachtstellung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +2 ATK bis Zugende, +1 DEF.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 2,
          "def": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Stellung in der nassen Nacht.",
    "image": "soforteinsatz/B766.jpg",
    "max_copies": 1,
    "collector": "B766",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_aktenbefehl_767",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Kronweisung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +2 DEF.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": 2,
          "until": "turn"
        }
      }
    ],
    "flavor": "Befehl aus den stillen Ämtern.",
    "image": "soforteinsatz/B767.jpg",
    "max_copies": 1,
    "collector": "B767",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_zwei_haende_768",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Zwei Hände",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 DEF; sie kann in ihrem nächsten Zug nicht angreifen.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": 1,
          "until": "turn"
        }
      },
      {
        "code": "OUT_OF_COMBAT",
        "param": {}
      }
    ],
    "flavor": "Krone und Parlament — beide echt.",
    "image": "soforteinsatz/B768.jpg",
    "max_copies": 1,
    "collector": "B768",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_sperrenkette_769",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Sperrenkette",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe 3 Karten, dann wirf deine älteste Handkarte ab.",
    "effects": [
      {
        "code": "DRAW_DISCARD",
        "param": {
          "draw": 3,
          "discard": 1
        }
      }
    ],
    "flavor": "Kette hält die Mark.",
    "image": "soforteinsatz/B769.jpg",
    "max_copies": 1,
    "collector": "B769",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_steingruen_halt_770",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Steingrün Halt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF. Ziehe 1 Karte.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 1,
          "until": "turn"
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Steingrün hält. Kahn ist keine Front.",
    "image": "soforteinsatz/B770.jpg",
    "max_copies": 1,
    "collector": "B770",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_wachwechsel_201",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Wachwechsel",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 DEF; versetze sie seitlich auf ein freies Feld derselben Reihe.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": 1,
          "until": "turn"
        }
      },
      {
        "code": "MOVE_SLOTS",
        "param": {
          "slots": 1,
          "count": 1
        }
      }
    ],
    "flavor": "Wechsel ist der Beweis.",
    "image": "soforteinsatz/B201.jpg",
    "max_copies": 1,
    "collector": "B201",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_umgruppierung_202",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Umgruppierung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: versetze sie seitlich auf ein freies Feld derselben Reihe.",
    "effects": [
      {
        "code": "MOVE_SLOTS",
        "param": {
          "slots": 1,
          "count": 2
        }
      }
    ],
    "flavor": "Zwei Gewalten auseinandergelegt — auch im Krieg.",
    "image": "soforteinsatz/B202.jpg",
    "max_copies": 1,
    "collector": "B202",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_lizenzfahrt_203",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Lizenzfahrt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: versetze sie seitlich auf ein freies Feld derselben Reihe. Ziehe 1 Karte.",
    "effects": [
      {
        "code": "MOVE_SLOTS",
        "param": {
          "slots": 1,
          "count": 1
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Ohne Lizenz verbindet das Schiff das Land nicht.",
    "image": "soforteinsatz/B203.jpg",
    "max_copies": 1,
    "collector": "B203",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_abloesung_204",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Schichtablösung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: heile 2.",
    "effects": [
      {
        "code": "HEAL",
        "param": {
          "value": 2
        }
      }
    ],
    "flavor": "Wer zurückkommt, bringt Staub — keinen Anspruch.",
    "image": "soforteinsatz/B204.jpg",
    "max_copies": 1,
    "collector": "B204",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_kaihalten_205",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Kaihalten",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +2 DEF; sie kann in ihrem nächsten Zug nicht angreifen.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": 2,
          "until": "turn"
        }
      },
      {
        "code": "OUT_OF_COMBAT",
        "param": {}
      }
    ],
    "flavor": "Bodentruppe am eigenen Kai.",
    "image": "soforteinsatz/B205.jpg",
    "max_copies": 1,
    "collector": "B205",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_stimmloch_206",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Stimmloch",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe 1 Karte. Deine nächste Einheit kostet 1 AP weniger (mind. 1).",
    "effects": [
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      },
      {
        "code": "COST_NEXT",
        "param": {
          "type": "Einheit",
          "amount": 1
        }
      }
    ],
    "flavor": "Nicht gezählt. Nicht erfunden. Das Loch bleibt.",
    "image": "soforteinsatz/B206.jpg",
    "max_copies": 1,
    "collector": "B206",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_strassenoeffnen_207",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Straßenöffnen",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Dein nächster Soforteinsatz kostet 1 AP weniger (mind. 0). Ziehe 1 Karte.",
    "effects": [
      {
        "code": "COST_NEXT",
        "param": {
          "type": "Soforteinsatz",
          "amount": 1
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Wer den Weg schneidet, schneidet eigene Bürger ab.",
    "image": "soforteinsatz/B207.jpg",
    "max_copies": 1,
    "collector": "B207",
    "rarity": "silver",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_sandfarbe_208",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Sandfarbe",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: −1 DEF (mind. 1). Ziehe 1 Karte.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": -1,
          "until": "turn",
          "enemy": true
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Prunk würde aus der Ferne einen Schmuck machen.",
    "image": "soforteinsatz/B208.jpg",
    "max_copies": 1,
    "collector": "B208",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_sofortlizenz_209",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Sofortlizenz",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe 2 Karten, dann wirf deine älteste Handkarte ab.",
    "effects": [
      {
        "code": "DRAW_DISCARD",
        "param": {
          "draw": 2,
          "discard": 1
        }
      }
    ],
    "flavor": "Schiff und Flugzeug halten keine Stellung.",
    "image": "soforteinsatz/B209.jpg",
    "max_copies": 1,
    "collector": "B209",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_verlegung_210",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Truppenverlegung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: versetze sie seitlich auf ein freies Feld derselben Reihe (bis 2 Felder).",
    "effects": [
      {
        "code": "MOVE_SLOTS",
        "param": {
          "slots": 2,
          "count": 1
        }
      }
    ],
    "flavor": "Verlegung hält den Weg im eigenen Land.",
    "image": "soforteinsatz/B210.jpg",
    "max_copies": 1,
    "collector": "B210",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_ausharren_211",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Durchhaltebefehl",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +3 DEF. Ziehe 1 Karte.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": 3,
          "until": "turn"
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Abgeschnitten ausharren. Der Kern bleibt verantwortlich.",
    "image": "soforteinsatz/B211.jpg",
    "max_copies": 1,
    "collector": "B211",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_zweite_verspaetung_212",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Zweite Verspätung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: −1 DEF (mind. 1). Ziehe 1 Karte.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": -1,
          "until": "turn",
          "enemy": true
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Südmark trägt die Verspätung zweimal.",
    "image": "soforteinsatz/B212.jpg",
    "max_copies": 1,
    "collector": "B212",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_umwegbefehl_699",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Umwegbefehl",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: versetze sie seitlich auf ein freies Feld derselben Reihe. Ziehe 1 Karte.",
    "effects": [
      {
        "code": "MOVE_SLOTS",
        "param": {
          "slots": 1,
          "count": 1
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Umweg ist Vertrag, kein Verrat.",
    "image": "soforteinsatz/B699.jpg",
    "max_copies": 1,
    "collector": "B699",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_durchlass_700",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Durchlass",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende. Decke eine verdeckte gegnerische Einheit auf.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 0,
          "until": "turn"
        }
      },
      {
        "code": "REVEAL",
        "param": {
          "count": 1
        }
      }
    ],
    "flavor": "Durchlass — Halle atmet.",
    "image": "soforteinsatz/B700.jpg",
    "max_copies": 1,
    "collector": "B700",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_weite_umgehung_701",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Weite Umgehung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende. Ziehe 1 Karte.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 0,
          "until": "turn"
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Weit umgehen. Stillstand lassen.",
    "image": "soforteinsatz/B701.jpg",
    "max_copies": 1,
    "collector": "B701",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_linienkrieg_702",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Linienhalt",
    "ap": 0,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 DEF; +1 ATK bis Zugende, +1 DEF. Alle eigenen Einheiten: +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF_ALL_OWN",
        "param": {
          "atk": 1,
          "filter": null,
          "until": "turn"
        }
      },
      {
        "code": "BUFF",
        "param": {
          "def": 1,
          "until": "turn"
        }
      },
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Linienkrieg — der Knoten hält, die Linie zahlt.",
    "image": "soforteinsatz/B702.jpg",
    "max_copies": 1,
    "collector": "B702",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_umgehen_703",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Umgehungsmarsch",
    "ap": 0,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle Feind: eigene Einheiten greifen ihn an, als stünden sie angrenzend; +1 ATK.",
    "effects": [
      {
        "code": "UMGEHEN",
        "param": {
          "atk": 1
        }
      }
    ],
    "flavor": "Umgehen — wer den Knoten meidet, trifft den Beutel.",
    "image": "soforteinsatz/B703.jpg",
    "max_copies": 1,
    "collector": "B703",
    "rarity": "gold",
    "target": {
      "side": "enemy"
    }
  },
  {
    "id": "dc_b_fristtafel_704",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Fristtafel",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Alle eigenen Einheiten: +1 ATK bis Zugende. Ziehe 1 Karte.",
    "effects": [
      {
        "code": "BUFF_ALL_OWN",
        "param": {
          "atk": 1,
          "filter": null,
          "until": "turn"
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Frist vor Meinung.",
    "image": "soforteinsatz/B704.jpg",
    "max_copies": 1,
    "collector": "B704",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_schnellpass_705",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Schnellpass",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +3 DEF; sie kann in ihrem nächsten Zug nicht angreifen.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": 3,
          "until": "turn"
        }
      },
      {
        "code": "OUT_OF_COMBAT",
        "param": {}
      }
    ],
    "flavor": "Pass öffnet. Knoten bleibt offen.",
    "image": "soforteinsatz/B705.jpg",
    "max_copies": 1,
    "collector": "B705",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_nachtumgehung_706",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Nachtumgehung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: versetze sie seitlich auf ein freies Feld derselben Reihe.",
    "effects": [
      {
        "code": "MOVE_SLOTS",
        "param": {
          "slots": 1,
          "count": 1
        }
      }
    ],
    "flavor": "Nacht nimmt den Seitenweg.",
    "image": "soforteinsatz/B706.jpg",
    "max_copies": 1,
    "collector": "B706",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_umschlagbefehl_707",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Umschlagbefehl",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: −1 DEF (mind. 1). Ziehe 1 Karte.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": -1,
          "until": "turn",
          "enemy": true
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Befehl aus dem Umschlag.",
    "image": "soforteinsatz/B707.jpg",
    "max_copies": 1,
    "collector": "B707",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_doppelumgehung_708",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Doppelumgehung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Alle eigenen Einheiten: +2 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF_ALL_OWN",
        "param": {
          "atk": 2,
          "until": "turn"
        }
      }
    ],
    "flavor": "Zwei Seiten. Ein Fluss.",
    "image": "soforteinsatz/B708.jpg",
    "max_copies": 1,
    "collector": "B708",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_handelskette_709",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Handelskette",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF. Decke eine verdeckte gegnerische Einheit auf.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 1,
          "until": "turn"
        }
      },
      {
        "code": "REVEAL",
        "param": {
          "count": 1
        }
      }
    ],
    "flavor": "Kette hält, solange sie fährt.",
    "image": "soforteinsatz/B709.jpg",
    "max_copies": 1,
    "collector": "B709",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_pfadoeffnung_710",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Pfadöffnung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +2 ATK bis Zugende, +1 DEF.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 2,
          "def": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Pfad offen. Stellung wartet.",
    "image": "soforteinsatz/B710.jpg",
    "max_copies": 1,
    "collector": "B710",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_reglement_579",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Reglement",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +3 DEF.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": 3,
          "until": "turn"
        }
      }
    ],
    "flavor": "Reglement vor Wunsch.",
    "image": "soforteinsatz/B579.jpg",
    "max_copies": 1,
    "collector": "B579",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_planungsrunde_580",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Planungsrunde",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 DEF. Decke eine verdeckte gegnerische Einheit auf.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 0,
          "def": 1,
          "until": "turn"
        }
      },
      {
        "code": "REVEAL",
        "param": {
          "count": 1
        }
      }
    ],
    "flavor": "Runde ohne Marschbefehl.",
    "image": "soforteinsatz/B580.jpg",
    "max_copies": 1,
    "collector": "B580",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_drei_schluessel_581",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Drei Schlüssel",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Deine nächste Einheit kostet 3 AP weniger (mind. 1).",
    "effects": [
      {
        "code": "COST_NEXT",
        "param": {
          "type": "Einheit",
          "amount": 3
        }
      }
    ],
    "flavor": "Drei Schlüssel. Sonst kein Krieg.",
    "image": "soforteinsatz/B581.jpg",
    "max_copies": 1,
    "collector": "B581",
    "rarity": "gold",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_feuerplan_582",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Planfeuer",
    "ap": 0,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine gegnerische Fronteinheit (verdeckte zuerst) gilt als beobachtet. Alle eigenen Einheiten: +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "MARK_OBSERVED",
        "param": {
          "count": 1
        }
      },
      {
        "code": "BUFF_ALL_OWN",
        "param": {
          "atk": 1,
          "until": "turn",
          "vs_observed": true
        }
      }
    ],
    "flavor": "Feuerplan — Norm vor Eifer, Steinmark zählt.",
    "image": "soforteinsatz/B582.jpg",
    "max_copies": 1,
    "collector": "B582",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_sichtlinie_583",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Sichtlinie",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Decke eine verdeckte gegnerische Einheit auf. Ziehe 2 Karten.",
    "effects": [
      {
        "code": "REVEAL",
        "param": {
          "count": 1
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 2
        }
      }
    ],
    "flavor": "Linie ohne Anspruch.",
    "image": "soforteinsatz/B583.jpg",
    "max_copies": 1,
    "collector": "B583",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_pioniereinsatz_584",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Pioniereinsatz",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen eigenen Abschnitt: Einheiten dort +2 DEF bis Zugende. Ziehe 1 Karte.",
    "effects": [
      {
        "code": "BUFF_SECTION",
        "targetSide": "own",
        "param": {
          "def": 2,
          "until": "turn"
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Pionier nach Freigabe.",
    "image": "soforteinsatz/B584.jpg",
    "max_copies": 1,
    "collector": "B584",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_reservistenruf_585",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Reservistenruf",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: −1 DEF (mind. 1).",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": -1,
          "until": "turn",
          "enemy": true
        }
      }
    ],
    "flavor": "Ruf wenn Papier liegt.",
    "image": "soforteinsatz/B585.jpg",
    "max_copies": 1,
    "collector": "B585",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_befehlskopien_586",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Befehlskopien",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Dein nächster Soforteinsatz kostet 2 AP weniger (mind. 0).",
    "effects": [
      {
        "code": "COST_NEXT",
        "param": {
          "type": "Soforteinsatz",
          "amount": 2
        }
      }
    ],
    "flavor": "Kopien. Kein Original-Held.",
    "image": "soforteinsatz/B586.jpg",
    "max_copies": 1,
    "collector": "B586",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_doppelbeobachtung_587",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Doppelbeobachtung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle 2 gegnerische Fronteinheiten: je sie gilt als beobachtet.",
    "effects": [
      {
        "code": "MARK_OBSERVED",
        "param": {
          "count": 2
        }
      }
    ],
    "flavor": "Zwei Augen. Ein Verfahren.",
    "image": "soforteinsatz/B587.jpg",
    "max_copies": 1,
    "collector": "B587",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 2,
      "upto": false
    }
  },
  {
    "id": "dc_b_synchronfeuer_588",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Synchronfeuer",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 DEF.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Synchron nach Norm.",
    "image": "soforteinsatz/B588.jpg",
    "max_copies": 1,
    "collector": "B588",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_verfahrensbruch_589",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Verfahrensbruch",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Negiere feindlichen Elite-Bonus; ziehe 1.",
    "effects": [
      {
        "code": "NEGATE_BONUS",
        "param": {}
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Bruch kostet. Verfahren bleibt.",
    "image": "soforteinsatz/B589.jpg",
    "max_copies": 1,
    "collector": "B589",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false,
      "filter": "elite"
    }
  },
  {
    "id": "dc_b_planfestigung_590",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Planfestigung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +2 DEF.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 2,
          "until": "turn"
        }
      }
    ],
    "flavor": "Plan fest. Laune nicht.",
    "image": "soforteinsatz/B590.jpg",
    "max_copies": 1,
    "collector": "B590",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_volle_ladung_519",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Volle Ladung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe 2 Karten.",
    "effects": [
      {
        "code": "DRAW",
        "param": {
          "value": 2
        }
      }
    ],
    "flavor": "Volle Ladung — Anteil fehlt trotzdem.",
    "image": "soforteinsatz/B519.jpg",
    "max_copies": 1,
    "collector": "B519",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_entlastung_520",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Entlastung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Entlastung auf dem Boden.",
    "image": "soforteinsatz/B520.jpg",
    "max_copies": 1,
    "collector": "B520",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_letzte_lieferung_521",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Letzte Lieferung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende. Deine nächste Einheit kostet 1 AP weniger (mind. 1). Ziehe 1 Karte.",
    "effects": [
      {
        "code": "COST_NEXT",
        "param": {
          "type": "Einheit",
          "amount": 0
        }
      },
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "until": "turn"
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Letzte Lieferung. Der Rest hält.",
    "image": "soforteinsatz/B521.jpg",
    "max_copies": 1,
    "collector": "B521",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_marsch_aus_dem_vollen_522",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Gewaltmarsch",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen eigenen Abschnitt: Einheiten dort +2 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF_SECTION",
        "targetSide": "own",
        "param": {
          "atk": 2,
          "filter": null,
          "until": "turn"
        }
      }
    ],
    "flavor": "Marsch aus dem Vollen — Namars Breite wird Bewegung.",
    "image": "soforteinsatz/B522.jpg",
    "max_copies": 1,
    "collector": "B522",
    "rarity": "gold"
  },
  {
    "id": "dc_b_gemeinsamer_feind_523",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Gemeinsamer Feind",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen eigenen Abschnitt: Einheiten dort +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF_SECTION",
        "param": {
          "atk": 1,
          "until": "turn",
          "targetSide": "own"
        }
      }
    ],
    "flavor": "Satz ohne Ausnahme.",
    "image": "soforteinsatz/B523.jpg",
    "max_copies": 1,
    "collector": "B523",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_angekommener_rest_524",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Angekommener Rest",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: heile 2.",
    "effects": [
      {
        "code": "HEAL",
        "param": {
          "value": 2
        }
      }
    ],
    "flavor": "Rest zählt. Nicht die Morgenliste.",
    "image": "soforteinsatz/B524.jpg",
    "max_copies": 1,
    "collector": "B524",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_mole_schliessen_525",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Mole schließen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen eigenen Abschnitt: Einheiten dort +2 DEF bis Zugende.",
    "effects": [
      {
        "code": "BUFF_SECTION",
        "targetSide": "own",
        "param": {
          "def": 2,
          "until": "turn"
        }
      }
    ],
    "flavor": "Fremder bleibt draußen.",
    "image": "soforteinsatz/B525.jpg",
    "max_copies": 1,
    "collector": "B525",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_entsatz_rufen_526",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Entsatz rufen",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe 1 Karte.",
    "effects": [
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Ruf gilt für alle Kais.",
    "image": "soforteinsatz/B526.jpg",
    "max_copies": 1,
    "collector": "B526",
    "rarity": "silver",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_anteil_lassen_527",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Anteil lassen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe 2 Karten, dann wirf deine älteste Handkarte ab.",
    "effects": [
      {
        "code": "DRAW_DISCARD",
        "param": {
          "draw": 2,
          "discard": 1
        }
      }
    ],
    "flavor": "Anteil geht. Rest fährt.",
    "image": "soforteinsatz/B527.jpg",
    "max_copies": 1,
    "collector": "B527",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_bahn_frei_528",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Bahn frei",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende. Deine nächste Einheit kostet 1 AP weniger (mind. 1).",
    "effects": [
      {
        "code": "COST_NEXT",
        "param": {
          "type": "Einheit",
          "amount": 0
        }
      },
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Bahnstadt offen halten.",
    "image": "soforteinsatz/B528.jpg",
    "max_copies": 1,
    "collector": "B528",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_keine_sterne_529",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Keine Sterne",
    "ap": 0,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Negiere einen feindlichen Elite-Bonus; ziehe 1.",
    "effects": [
      {
        "code": "NEGATE_BONUS",
        "param": {}
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Krause ohne Sterne.",
    "image": "soforteinsatz/B529.jpg",
    "max_copies": 1,
    "collector": "B529",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false,
      "filter": "elite"
    }
  },
  {
    "id": "dc_b_markt_bleibt_530",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Markt bleibt",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen eigenen Abschnitt: Einheiten dort +1 DEF bis Zugende. Ziehe 1 Karte.",
    "effects": [
      {
        "code": "BUFF_SECTION",
        "targetSide": "own",
        "param": {
          "def": 1,
          "until": "turn"
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Markt macht nicht zu.",
    "image": "soforteinsatz/B530.jpg",
    "max_copies": 1,
    "collector": "B530",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_signalfeuer_240",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Signalfeuer",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle Abschnitt: einrückende Einheit erleidet 1 Schaden.",
    "effects": [
      {
        "code": "DAMAGE_SECTION",
        "param": {
          "value": 1,
          "onEnter": true,
          "until": "turn",
          "targetSide": "own"
        }
      }
    ],
    "flavor": "Feuer ohne Adresse.",
    "image": "soforteinsatz/B240.jpg",
    "max_copies": 1,
    "collector": "B240",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_hinterhalt_241",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Hinterhalt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: 2 Schaden.",
    "effects": [
      {
        "code": "DEAL_DAMAGE",
        "param": {
          "value": 2
        }
      }
    ],
    "flavor": "Auflauern ist der Eid in Waffen.",
    "image": "soforteinsatz/B241.jpg",
    "max_copies": 1,
    "collector": "B241",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_warnfeuer_242",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Warnfeuer",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: −1 ATK bis Zugende. Ziehe 1 Karte.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": -1,
          "until": "turn",
          "enemy": true
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Warnen, bevor der Hang fällt.",
    "image": "soforteinsatz/B242.jpg",
    "max_copies": 1,
    "collector": "B242",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_steinschlag_243",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Steinschlag",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: 3 Schaden.",
    "effects": [
      {
        "code": "DEAL_DAMAGE",
        "param": {
          "value": 3
        }
      }
    ],
    "flavor": "Der Hang antwortet laut.",
    "image": "soforteinsatz/B243.jpg",
    "max_copies": 1,
    "collector": "B243",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_leserruf_244",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Leserruf",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe 1; nächste Infanterie kostet 1 weniger.",
    "effects": [
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      },
      {
        "code": "PLAY_INF_DISCOUNT",
        "param": {
          "amount": 1
        }
      }
    ],
    "flavor": "Drei fremde Stimmen lesen laut.",
    "image": "soforteinsatz/B244.jpg",
    "max_copies": 1,
    "collector": "B244",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_tuer_zu_stilltal_245",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Tür zu Stilltal",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: −2 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": -2,
          "until": "turn",
          "enemy": true
        }
      }
    ],
    "flavor": "Beobachtet. Nicht ausgelöscht.",
    "image": "soforteinsatz/B245.jpg",
    "max_copies": 1,
    "collector": "B245",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_passoeffnen_246",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Passöffnen",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: versetze sie seitlich auf ein freies Feld derselben Reihe. Ziehe 1 Karte.",
    "effects": [
      {
        "code": "MOVE_SLOTS",
        "param": {
          "slots": 1,
          "count": 1
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Der Weg zur Hilfe.",
    "image": "soforteinsatz/B246.jpg",
    "max_copies": 1,
    "collector": "B246",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_schonung_247",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Schonung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: −2 DEF (mind. 1).",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": -2,
          "until": "turn",
          "enemy": true
        }
      }
    ],
    "flavor": "Wut darf schlagen. Nicht zu Ende bringen.",
    "image": "soforteinsatz/B247.jpg",
    "max_copies": 1,
    "collector": "B247",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_zweite_linie_248",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Zweite Linie",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle 2 eigene Fronteinheiten: je +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "until": "turn",
          "count": 2
        }
      }
    ],
    "flavor": "Verbund ohne Mitte.",
    "image": "soforteinsatz/B248.jpg",
    "max_copies": 1,
    "collector": "B248",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 2,
      "upto": false
    }
  },
  {
    "id": "dc_b_lauer_249",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Auf der Lauer",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle Abschnitt: einrückende erleiden 1; Infanterie dort +1 ATK.",
    "effects": [
      {
        "code": "DAMAGE_SECTION",
        "param": {
          "value": 1,
          "onEnter": true,
          "until": "turn",
          "targetSide": "own"
        }
      },
      {
        "code": "BUFF_SECTION",
        "param": {
          "atk": 1,
          "filter": "infanterie",
          "until": "turn",
          "targetSide": "own"
        }
      }
    ],
    "flavor": "Lauer ohne Stab.",
    "image": "soforteinsatz/B249.jpg",
    "max_copies": 1,
    "collector": "B249",
    "rarity": "gold"
  },
  {
    "id": "dc_b_verteilte_stellung_250",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Verstreute Posten",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Alle eigenen Einheiten: +1 DEF. Wähle einen eigenen Abschnitt: Einheiten dort +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF_ALL_OWN",
        "param": {
          "def": 1,
          "until": "turn"
        }
      },
      {
        "code": "BUFF_SECTION",
        "targetSide": "own",
        "param": {
          "atk": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Verteilt — nicht zusammengezogen.",
    "image": "soforteinsatz/B250.jpg",
    "max_copies": 1,
    "collector": "B250",
    "rarity": "gold"
  },
  {
    "id": "dc_b_nachhausegehen_251",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Nachhausegehen",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: heile 1; versetze sie seitlich auf ein freies Feld derselben Reihe.",
    "effects": [
      {
        "code": "HEAL",
        "param": {
          "value": 1
        }
      },
      {
        "code": "MOVE_SLOTS",
        "param": {
          "slots": 1,
          "count": 2
        }
      }
    ],
    "flavor": "Danach geht man nach Hause. Beweis ohne Wohnsitz.",
    "image": "soforteinsatz/B251.jpg",
    "max_copies": 1,
    "collector": "B251",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_erholung_339",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Erholung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: heile 3.",
    "effects": [
      {
        "code": "HEAL",
        "param": {
          "value": 3
        }
      }
    ],
    "flavor": "Atem vor dem nächsten Schritt.",
    "image": "soforteinsatz/B339.jpg",
    "max_copies": 1,
    "collector": "B339",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_etappensicherung_340",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Etappenschutz",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +2 DEF.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 2,
          "until": "turn"
        }
      }
    ],
    "flavor": "Die Etappe ist das Schild.",
    "image": "soforteinsatz/B340.jpg",
    "max_copies": 1,
    "collector": "B340",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_rasten_341",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Rastpause",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle 2 gegnerische Fronteinheiten: je sie kann in ihrem nächsten Zug nicht angreifen; heile 2; +1 DEF.",
    "effects": [
      {
        "code": "OUT_OF_COMBAT",
        "param": {}
      },
      {
        "code": "HEAL",
        "param": {
          "value": 2,
          "side": "own"
        }
      },
      {
        "code": "BUFF",
        "param": {
          "def": 1,
          "side": "own"
        }
      }
    ],
    "flavor": "Rasten, damit das Schild hält.",
    "image": "soforteinsatz/B341.jpg",
    "max_copies": 1,
    "collector": "B341",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 2,
      "upto": false
    }
  },
  {
    "id": "dc_b_meldung_342",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Meldung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: heile 1. Decke eine verdeckte gegnerische Einheit auf. Ziehe 1 Karte.",
    "effects": [
      {
        "code": "HEAL",
        "param": {
          "value": 1
        }
      },
      {
        "code": "REVEAL",
        "param": {
          "count": 1
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Wer meldet, wird gesehen.",
    "image": "soforteinsatz/B342.jpg",
    "max_copies": 1,
    "collector": "B342",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_verband_343",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Verband",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: heile 1; +1 DEF.",
    "effects": [
      {
        "code": "HEAL",
        "param": {
          "value": 1
        }
      },
      {
        "code": "BUFF",
        "param": {
          "def": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Verband vor der Höhe.",
    "image": "soforteinsatz/B343.jpg",
    "max_copies": 1,
    "collector": "B343",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_umverteilung_344",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Umverteilung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: 1 Schaden; versetze sie seitlich auf ein freies Feld derselben Reihe.",
    "effects": [
      {
        "code": "DEAL_DAMAGE",
        "param": {
          "value": 1
        }
      },
      {
        "code": "MOVE_SLOTS",
        "param": {
          "slots": 1,
          "count": 1
        }
      }
    ],
    "flavor": "Schlechtes Jahr — gemeldet und geteilt.",
    "image": "soforteinsatz/B344.jpg",
    "max_copies": 1,
    "collector": "B344",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_frist_345",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Frist",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: heile 1; +2 DEF.",
    "effects": [
      {
        "code": "HEAL",
        "param": {
          "value": 1
        }
      },
      {
        "code": "BUFF",
        "param": {
          "def": 2,
          "until": "turn"
        }
      }
    ],
    "flavor": "Fristen eng, weil Dörfer leer waren.",
    "image": "soforteinsatz/B345.jpg",
    "max_copies": 1,
    "collector": "B345",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_kein_loch_346",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Kein Loch",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Negiere 2 Schaden an Abschnitt; keine eigene Zerstörung → heile 1.",
    "effects": [
      {
        "code": "KEIN_LOCH",
        "targetSide": "own",
        "param": {
          "negate": 2,
          "heal": 1
        }
      }
    ],
    "flavor": "Lieber Verzicht auf Höhe.",
    "image": "soforteinsatz/B346.jpg",
    "max_copies": 1,
    "collector": "B346",
    "rarity": "silver",
    "target": {
      "side": "own"
    }
  },
  {
    "id": "dc_b_zuteilung_347",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Zuteilung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: heile 2.",
    "effects": [
      {
        "code": "HEAL",
        "param": {
          "value": 2
        }
      }
    ],
    "flavor": "Staat ist der Wohlstand, soweit davon die Rede.",
    "image": "soforteinsatz/B347.jpg",
    "max_copies": 1,
    "collector": "B347",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_rueckruf_348",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Rückruf",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: heile 3.",
    "effects": [
      {
        "code": "HEAL",
        "param": {
          "value": 3
        }
      }
    ],
    "flavor": "Unruhe zu Hause zieht Truppen.",
    "image": "soforteinsatz/B348.jpg",
    "max_copies": 1,
    "collector": "B348",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_stabilitaet_349",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Stabilität",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen eigenen Abschnitt: Einheiten dort +1 DEF bis Zugende.",
    "effects": [
      {
        "code": "BUFF_SECTION",
        "targetSide": "own",
        "param": {
          "def": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Regierung begründet sich mit Stabilität.",
    "image": "soforteinsatz/B349.jpg",
    "max_copies": 1,
    "collector": "B349",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_sichtbarkeit_350",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Sichtbarkeit",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: −1 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": -1,
          "until": "turn",
          "enemy": true
        }
      }
    ],
    "flavor": "Unsichtbare sind Loch, nicht Gegnerkorps.",
    "image": "soforteinsatz/B350.jpg",
    "max_copies": 1,
    "collector": "B350",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_namensruf_279",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Namensruf",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 0,
          "until": "turn"
        }
      }
    ],
    "flavor": "Ruf an die Lebenden. Nicht an die Toten.",
    "image": "soforteinsatz/B279.jpg",
    "max_copies": 1,
    "collector": "B279",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_untersuchung_280",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Untersuchung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: −2 ATK bis Zugende. Ziehe 1 Karte.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": -2,
          "until": "turn",
          "enemy": true
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Respekt ist die Frage warum.",
    "image": "soforteinsatz/B280.jpg",
    "max_copies": 1,
    "collector": "B280",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_bergung_281",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Bergung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: heile 3.",
    "effects": [
      {
        "code": "HEAL",
        "param": {
          "value": 3
        }
      }
    ],
    "flavor": "Lebende hinter die Platten.",
    "image": "soforteinsatz/B281.jpg",
    "max_copies": 1,
    "collector": "B281",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_plattenfreigabe_282",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Plattenfreigabe",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Deine nächste Ausrüstung kostet 1 AP weniger (mind. 1).",
    "effects": [
      {
        "code": "COST_NEXT",
        "param": {
          "type": "Ausrüstung",
          "amount": 1
        }
      }
    ],
    "flavor": "Freigabe vor Gravur.",
    "image": "soforteinsatz/B282.jpg",
    "max_copies": 1,
    "collector": "B282",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_korrigieren_283",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Korrigieren",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +2 DEF.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 2,
          "until": "turn"
        }
      }
    ],
    "flavor": "Lehrling korrigiert. Nicht gesegnet.",
    "image": "soforteinsatz/B283.jpg",
    "max_copies": 1,
    "collector": "B283",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_kein_schrein_284",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Kein Schrein",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Negiere Bonus eines Feindes aus Zerstörung; eigene +1 DEF.",
    "effects": [
      {
        "code": "NEGATE_BONUS",
        "param": {}
      },
      {
        "code": "BUFF",
        "param": {
          "def": 1,
          "side": "own"
        }
      }
    ],
    "flavor": "Kein Altar aus dem letzten Toten.",
    "image": "soforteinsatz/B284.jpg",
    "max_copies": 1,
    "collector": "B284",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_schutzblatt_285",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Schutzblatt",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe 1 Karte.",
    "effects": [
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Lieber Linse als neuer Name.",
    "image": "soforteinsatz/B285.jpg",
    "max_copies": 1,
    "collector": "B285",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_personalregel_286",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Personalregel",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: 1 Schaden; −1 ATK bis Zugende.",
    "effects": [
      {
        "code": "DEAL_DAMAGE",
        "param": {
          "value": 1
        }
      },
      {
        "code": "BUFF",
        "param": {
          "atk": -1,
          "until": "turn",
          "enemy": true
        }
      }
    ],
    "flavor": "Wer mehr Tote will, findet kein Amt.",
    "image": "soforteinsatz/B286.jpg",
    "max_copies": 1,
    "collector": "B286",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_reihenfolge_287",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Reihenfolge",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: heile 1.",
    "effects": [
      {
        "code": "HEAL",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Gerät, Atem, Glas — Zeichen zuletzt.",
    "image": "soforteinsatz/B287.jpg",
    "max_copies": 1,
    "collector": "B287",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_grenze_halten_288",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Grenze halten",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen eigenen Abschnitt: Einheiten dort +1 DEF bis Zugende.",
    "effects": [
      {
        "code": "BUFF_SECTION",
        "targetSide": "own",
        "param": {
          "def": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Hart. Nicht heilig.",
    "image": "soforteinsatz/B288.jpg",
    "max_copies": 1,
    "collector": "B288",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_absetzung_289",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Absetzung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Entferne eine feindliche Unterstützung oder −2 ATK einer Einheit.",
    "effects": [
      {
        "code": "CLEAR_SUPPORT_OR_DEBUFF",
        "param": {}
      }
    ],
    "flavor": "Langweilig statt Märtyrer.",
    "image": "soforteinsatz/B289.jpg",
    "max_copies": 1,
    "collector": "B289",
    "rarity": "bronze",
    "target": {
      "side": "enemy"
    }
  },
  {
    "id": "dc_b_abnutzung_290",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Zermürbung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 ATK bis Zugende, +1 DEF.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Verlust wird Deckung.",
    "image": "soforteinsatz/B290.jpg",
    "max_copies": 1,
    "collector": "B290",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_aufdecken_459",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Aufdecken",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Decke eine verdeckte gegnerische Einheit auf. Ziehe 1 Karte.",
    "effects": [
      {
        "code": "REVEAL",
        "param": {
          "count": 1
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Erst sehen.",
    "image": "soforteinsatz/B459.jpg",
    "max_copies": 1,
    "collector": "B459",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_punktfeuer_460",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Punktziel",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Decke eine verdeckte gegnerische Einheit auf.",
    "effects": [
      {
        "code": "REVEAL",
        "param": {
          "count": 1
        }
      }
    ],
    "flavor": "Punktfeuer — Doktrin am Schuss.",
    "image": "soforteinsatz/B460.jpg",
    "max_copies": 1,
    "collector": "B460",
    "rarity": "gold",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_lokalisierung_461",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Peilung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: −1 DEF (mind. 1). Decke eine verdeckte gegnerische Einheit auf.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": -1,
          "until": "turn",
          "enemy": true
        }
      },
      {
        "code": "REVEAL",
        "param": {
          "count": 1
        }
      }
    ],
    "flavor": "Lokalisierung vor dem Schlag.",
    "image": "soforteinsatz/B461.jpg",
    "max_copies": 1,
    "collector": "B461",
    "rarity": "gold",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_zielmarkierung_462",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Zielmarkierung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Decke eine verdeckte gegnerische Einheit auf. Alle eigenen Einheiten: +1 ATK bis Zugende.",
    "effects": [
      {
        "code": "REVEAL",
        "param": {
          "count": 1
        }
      },
      {
        "code": "BUFF_ALL_OWN",
        "param": {
          "atk": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Marke ohne Kult.",
    "image": "soforteinsatz/B462.jpg",
    "max_copies": 1,
    "collector": "B462",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_modellstopp_463",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Modellstopp",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Negiere einen feindlichen Bonus; ziehe 1.",
    "effects": [
      {
        "code": "NEGATE_BONUS",
        "param": {}
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Order zurückziehen.",
    "image": "soforteinsatz/B463.jpg",
    "max_copies": 1,
    "collector": "B463",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_zweite_messung_464",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Zweite Messung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: 2 Schaden. Decke eine verdeckte gegnerische Einheit auf.",
    "effects": [
      {
        "code": "DEAL_DAMAGE",
        "param": {
          "value": 2
        }
      },
      {
        "code": "REVEAL",
        "param": {
          "count": 1
        }
      }
    ],
    "flavor": "Keine Rettung der ersten Lüge.",
    "image": "soforteinsatz/B464.jpg",
    "max_copies": 1,
    "collector": "B464",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_trotz_465",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Trotz",
    "ap": 0,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: +1 DEF.",
    "effects": [
      {
        "code": "BUFF",
        "param": {
          "def": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Trotz ist manchmal die richtige Antwort.",
    "image": "soforteinsatz/B465.jpg",
    "max_copies": 1,
    "collector": "B465",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_quelle_nennen_466",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Quelle nennen",
    "ap": 0,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Dein nächster Soforteinsatz kostet 1 AP weniger (mind. 0).",
    "effects": [
      {
        "code": "COST_NEXT",
        "param": {
          "type": "Soforteinsatz",
          "amount": 1
        }
      }
    ],
    "flavor": "Quelle vor Meinung.",
    "image": "soforteinsatz/B466.jpg",
    "max_copies": 1,
    "collector": "B466",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  },
  {
    "id": "dc_b_stillprobe_467",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Stillprobe",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Fronteinheit: decke sie auf; −2 ATK bis Zugende.",
    "effects": [
      {
        "code": "REVEAL",
        "param": {
          "targeted": true
        }
      },
      {
        "code": "BUFF",
        "param": {
          "atk": -2,
          "until": "turn",
          "enemy": true
        }
      }
    ],
    "flavor": "Verweigerte Probe — manchmal richtig.",
    "image": "soforteinsatz/B467.jpg",
    "max_copies": 1,
    "collector": "B467",
    "rarity": "silver",
    "target": {
      "needs": true,
      "side": "enemy",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_unterschreiben_468",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Unterschreiben",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: heile 2; +1 ATK bis Zugende, +1 DEF.",
    "effects": [
      {
        "code": "HEAL",
        "param": {
          "value": 2
        }
      },
      {
        "code": "BUFF",
        "param": {
          "atk": 1,
          "def": 1,
          "until": "turn"
        }
      }
    ],
    "flavor": "Person mit Mandat. Nicht die Zahl.",
    "image": "soforteinsatz/B468.jpg",
    "max_copies": 1,
    "collector": "B468",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_irrtum_sagen_469",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Irrtum sagen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Fronteinheit: heile 1; −1 ATK bis Zugende. Ziehe 1 Karte.",
    "effects": [
      {
        "code": "HEAL",
        "param": {
          "value": 1
        }
      },
      {
        "code": "BUFF",
        "param": {
          "atk": -1,
          "until": "turn",
          "enemy": true
        }
      },
      {
        "code": "DRAW",
        "param": {
          "value": 1
        }
      }
    ],
    "flavor": "Irrtum aussprechen.",
    "image": "soforteinsatz/B469.jpg",
    "max_copies": 1,
    "collector": "B469",
    "rarity": "bronze",
    "target": {
      "needs": true,
      "side": "own",
      "count": 1,
      "upto": false
    }
  },
  {
    "id": "dc_b_fachpruefung_470",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Fachprüfung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Dein nächster Soforteinsatz kostet 1 AP weniger (mind. 0).",
    "effects": [
      {
        "code": "COST_NEXT",
        "param": {
          "type": "Soforteinsatz",
          "amount": 1
        }
      }
    ],
    "flavor": "Prüfen, nicht eifern.",
    "image": "soforteinsatz/B470.jpg",
    "max_copies": 1,
    "collector": "B470",
    "rarity": "bronze",
    "target": {
      "needs": false
    }
  }
];
