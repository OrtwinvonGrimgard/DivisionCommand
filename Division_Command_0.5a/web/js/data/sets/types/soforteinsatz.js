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
    "collector": "A035"
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
    "collector": "A043"
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
    "collector": "A046"
  },
  {
    "id": "dc_so_armageddon",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Armageddon",
    "ap": 0,
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
    "flavor": "Alles dass, was jemals war, soll nun zum Staub verfallen",
    "image": "soforteinsatz/A098.jpg",
    "max_copies": 2,
    "collector": "A098"
  },
  {
    "id": "dc_so_blinder_gehorsam",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Blinder Gehorsam",
    "ap": 0,
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
    "collector": "A099"
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
    "collector": "A100"
  },
  {
    "id": "dc_so_dammbruch",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Dammbruch",
    "ap": 0,
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
    "collector": "A101"
  },
  {
    "id": "dc_so_deckung",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Deckung suchen",
    "ap": 0,
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
    "collector": "A102"
  },
  {
    "id": "dc_so_letzter",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Der Letzte der steht",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Opfere die eigene Front bis auf eine Einheit. Sie erhält +1 A und +1 V je geopferter Einheit. Wird sie besiegt, erhält der Gegner 1 SP.",
    "effects": [
      {
        "code": "LAST_STAND"
      }
    ],
    "flavor": "Einer gegen Alle. Alle gegen einen.",
    "image": "soforteinsatz/A103.jpg",
    "max_copies": 2,
    "collector": "A103"
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
    "collector": "A104"
  },
  {
    "id": "dc_so_gassen",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Einsame Gassen",
    "ap": 0,
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
    "collector": "A105"
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
    "collector": "A106"
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
    "collector": "A107"
  },
  {
    "id": "dc_so_mobil",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Generalmobilmachung",
    "ap": 0,
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
    "collector": "A108"
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
    "collector": "A109"
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
    "collector": "A110"
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
    "collector": "A111"
  },
  {
    "id": "dc_so_luftschlag",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Luftschlag",
    "ap": 0,
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
    "collector": "A112"
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
    "collector": "A113"
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
    "text": "Bis zu drei eigene Einheiten, die bereits feindliche Einheiten zerstört haben, +2 A und +2 V bis Zugende.",
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
    "collector": "A114"
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
    "collector": "A115"
  },
  {
    "id": "dc_so_mobilisierung",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Mobilisierung",
    "ap": 0,
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
    "collector": "A116"
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
    "collector": "A117"
  },
  {
    "id": "dc_so_napalm",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Napalm",
    "ap": 0,
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
    "collector": "A118"
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
    "collector": "A119"
  },
  {
    "id": "dc_so_massen",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Psychologie der Massen",
    "ap": 0,
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
    "collector": "A120"
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
    "collector": "A121"
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
    "collector": "A122"
  },
  {
    "id": "dc_so_selbst",
    "set": "set_alpha",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Selbstopfer",
    "ap": 0,
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
    "collector": "A123"
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
    "collector": "A124"
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
    "collector": "A125"
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
    "collector": "A126"
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
    "collector": "A127"
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
    "collector": "A128"
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
    "collector": "A129"
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
    "collector": "A130"
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
    "collector": "A131"
  },
  {
    "id": "dc_b_wachwechsel",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Wachwechsel",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Schiebe eine eigene Einheit um einen Slot. Sie hat in diesem Zug +1 DEF.",
    "effects": [],
    "flavor": "Geschoben und härter als zuvor.",
    "image": "soforteinsatz/B048.jpg",
    "max_copies": 1,
    "collector": "B048",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_umgruppierung",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Umgruppierung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Schiebe bis zu zwei eigene Einheiten um je einen Slot.",
    "effects": [],
    "flavor": "Zwei Einheiten. Zwei neue Plätze.",
    "image": "soforteinsatz/B051.jpg",
    "max_copies": 1,
    "collector": "B051",
    "rarity": "silver"
  },
  {
    "id": "dc_b_offener_weg",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Offener Weg",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Schiebe eine eigene Einheit um bis zu zwei Slots.",
    "effects": [],
    "flavor": "Zwei Slots frei. Geh.",
    "image": "soforteinsatz/B056.jpg",
    "max_copies": 1,
    "collector": "B056",
    "rarity": "gold"
  },
  {
    "id": "dc_b_keilhalt",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Keilhalt",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Nachdem du in diesem Zug eine eigene Einheit geschoben hast: diese Einheit erhält +1 DEF bis zu deinem nächsten Zug.",
    "effects": [],
    "flavor": "Erst schieben, dann fest werden.",
    "image": "soforteinsatz/B059.jpg",
    "max_copies": 1,
    "collector": "B059",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_signalfeuer",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Signalfeuer",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen Abschnitt. Eine einrückende Einheit dort erleidet 1 Schaden.",
    "effects": [],
    "flavor": "Ein Funke am Hang. Alle wissen Bescheid.",
    "image": "soforteinsatz/B070.jpg",
    "max_copies": 1,
    "collector": "B070",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_hinterhalt",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Hinterhalt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine gegnerische Einheit, die in diesem Zug einrückt, erleidet 2 Schaden. Deine Infanterie dort hat +1 ATK gegen sie.",
    "effects": [],
    "flavor": "Sie kamen den Weg herauf. Wir warteten schon.",
    "image": "soforteinsatz/B072.jpg",
    "max_copies": 1,
    "collector": "B072",
    "rarity": "silver"
  },
  {
    "id": "dc_b_steinschlag",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Steinschlag",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine gegnerische Einheit erleidet 3 Schaden.",
    "effects": [],
    "flavor": "Der Berg antwortet mit Geröll.",
    "image": "soforteinsatz/B076.jpg",
    "max_copies": 1,
    "collector": "B076",
    "rarity": "silver"
  },
  {
    "id": "dc_b_talruf",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Talruf",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe eine Infanterie. Sie hat +1 DEF, wenn sie allein gespielt wird.",
    "effects": [],
    "flavor": "Ein Ruf. Eine Einheit. Das Tal füllt sich.",
    "image": "soforteinsatz/B078.jpg",
    "max_copies": 1,
    "collector": "B078",
    "rarity": "gold"
  },
  {
    "id": "dc_b_warnfeuer",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Warnfeuer",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine einrückende Einheit hat in diesem Zug -1 ATK.",
    "effects": [],
    "flavor": "Rauch vor dem Angriff. Noch ist Zeit.",
    "image": "soforteinsatz/B080.jpg",
    "max_copies": 1,
    "collector": "B080",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_namensruf",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Namensruf",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit mit Ausrüstung hat bis zum Ende des nächsten Zuges +1 ATK.",
    "effects": [],
    "flavor": "Ein Name wird gerufen. Die Platte antwortet.",
    "image": "soforteinsatz/B099.jpg",
    "max_copies": 1,
    "collector": "B099",
    "rarity": "gold"
  },
  {
    "id": "dc_b_kolonnenbefehl",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Kolonnenbefehl",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Spiele eine Infanterie mit 1 weniger. Ziehe eine Karte.",
    "effects": [],
    "flavor": "Die Kolonne folgt dem Befehl.",
    "image": "soforteinsatz/B187.jpg",
    "max_copies": 1,
    "collector": "B187",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_umweg",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Umweg",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit hat +1 DEF. Ziehe eine Karte.",
    "effects": [],
    "flavor": "Der Umweg ist der Plan.",
    "image": "soforteinsatz/B190.jpg",
    "max_copies": 1,
    "collector": "B190",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nachtmarsch",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Nachtmarsch",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Spiele bis zu zwei Infanterie mit je 1 weniger (mindestens 1).",
    "effects": [],
    "flavor": "Dunkelheit deckt den Weg.",
    "image": "soforteinsatz/B194.jpg",
    "max_copies": 1,
    "collector": "B194",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_wegmarkierung",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Wegmarkierung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe zwei Karten. Wirf eine ab.",
    "effects": [],
    "flavor": "Markiert. Weiter.",
    "image": "soforteinsatz/B198.jpg",
    "max_copies": 1,
    "collector": "B198",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_umgruppieren",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Umgruppieren",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle zwei eigene Einheiten im Abschnitt: eine +1 ATK, eine +1 DEF.",
    "effects": [],
    "flavor": "Neu ordnen. Dann halten.",
    "image": "soforteinsatz/B202.jpg",
    "max_copies": 1,
    "collector": "B202",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_durchmarsch",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Durchmarsch",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit hat +2 ATK. Sie hat −1 DEF bis Zugende.",
    "effects": [],
    "flavor": "Durch. Ohne Halt.",
    "image": "soforteinsatz/B205.jpg",
    "max_copies": 1,
    "collector": "B205",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_fackelzeichen",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Fackelzeichen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit hat +1 ATK. Eine eigene Unterstützung wirkt als wäre sie gerade gespielt (einmal).",
    "effects": [],
    "flavor": "Licht ruft die Kolonne.",
    "image": "soforteinsatz/B208.jpg",
    "max_copies": 1,
    "collector": "B208",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_querweg",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Querweg",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Heile 1 DEF an allen eigenen Einheiten im Abschnitt.",
    "effects": [],
    "flavor": "Querweg bringt Atem.",
    "image": "soforteinsatz/B211.jpg",
    "max_copies": 1,
    "collector": "B211",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_gewaltmarsch",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Gewaltmarsch",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Spiele beliebig viele Infanterie; jede kostet 1 weniger (mindestens 1). Sie haben −1 DEF bis Zugende.",
    "effects": [],
    "flavor": "Kilometer um Kilometer.",
    "image": "soforteinsatz/B216.jpg",
    "max_copies": 1,
    "collector": "B216",
    "rarity": "silver"
  },
  {
    "id": "dc_b_brueckenschlag",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Brückenschlag",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit hat +2 DEF. Spiele danach eine Infanterie mit 1 weniger.",
    "effects": [],
    "flavor": "Brücke steht. Kolonne geht.",
    "image": "soforteinsatz/B217.jpg",
    "max_copies": 1,
    "collector": "B217",
    "rarity": "silver"
  },
  {
    "id": "dc_b_verlegung_ereignis",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Verlegung",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Spiele bis zu drei Infanterie mit je 1 weniger. Eine davon hat +1 ATK.",
    "effects": [],
    "flavor": "Alles bewegt sich. Der Feind greift ins Leere.",
    "image": "soforteinsatz/B221.jpg",
    "max_copies": 1,
    "collector": "B221",
    "rarity": "gold"
  },
  {
    "id": "dc_b_ausharren_ereignis",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Ausharren",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Alle eigenen Einheiten im Abschnitt haben +2 DEF. Eine hat zusätzlich +1 ATK.",
    "effects": [],
    "flavor": "Hier wird ausgehalten. Bis der Weg wieder unser ist.",
    "image": "soforteinsatz/B222.jpg",
    "max_copies": 1,
    "collector": "B222",
    "rarity": "gold"
  },
  {
    "id": "dc_b_warnruf",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Warnruf",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe eine Karte. Eine eigene Einheit hat +1 DEF bis Zugende.",
    "effects": [],
    "flavor": "Ein Ruf über drei Täler.",
    "image": "soforteinsatz/B235.jpg",
    "max_copies": 1,
    "collector": "B235",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_steinstoss",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Steinstoß",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Eine einrückende feindliche Einheit erhält -1 DEF bis Zugende.",
    "effects": [],
    "flavor": "Der Berg antwortet.",
    "image": "soforteinsatz/B236.jpg",
    "max_copies": 1,
    "collector": "B236",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_rueckzugspfad",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Rückzugspfad",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit bewegt sich in einen angrenzenden Abschnitt.",
    "effects": [],
    "flavor": "Immer einen Pfad freihalten.",
    "image": "soforteinsatz/B237.jpg",
    "max_copies": 1,
    "collector": "B237",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_doppelposten",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Doppelposten",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Spiele eine Bronze-Infanterie mit 1 weniger, wenn du bereits eine allein stehende Einheit hast.",
    "effects": [],
    "flavor": "Zwei statt einer.",
    "image": "soforteinsatz/B238.jpg",
    "max_copies": 1,
    "collector": "B238",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_talzeichen",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Talzeichen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Markiere einen Abschnitt: nächste eigene Einheit dort hat +1 ATK.",
    "effects": [],
    "flavor": "Kreide am Fels.",
    "image": "soforteinsatz/B239.jpg",
    "max_copies": 1,
    "collector": "B239",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_stille_linie",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Stille Linie",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Bis Zugende: feindliche Einheiten, die einrücken, lösen keine eigenen Reaktionen aus — deine Einheiten haben +1 ATK gegen sie.",
    "effects": [],
    "flavor": "Erst schlagen, dann reden.",
    "image": "soforteinsatz/B240.jpg",
    "max_copies": 1,
    "collector": "B240",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_verteilschlag",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Verteilschlag",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Zwei eigene Einheiten in verschiedenen Abschnitten haben je +1 ATK bis Zugende.",
    "effects": [],
    "flavor": "Gleichzeitig. Überall.",
    "image": "soforteinsatz/B250.jpg",
    "max_copies": 1,
    "collector": "B250",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_engpass",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Engpass",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen Abschnitt: höchstens eine feindliche Einheit darf diesen Zug einrücken.",
    "effects": [],
    "flavor": "Einer nach dem anderen.",
    "image": "soforteinsatz/B251.jpg",
    "max_copies": 1,
    "collector": "B251",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_mehrfachlauer",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Mehrfachlauer",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Bis Zugende: jedes Mal, wenn ein Feind einrückt, hat eine eigene Einheit +1 ATK gegen ihn.",
    "effects": [],
    "flavor": "Immer eine Lauer frei.",
    "image": "soforteinsatz/B257.jpg",
    "max_copies": 1,
    "collector": "B257",
    "rarity": "silver"
  },
  {
    "id": "dc_b_talbrand",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Talbrand",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Zerstöre eine feindliche Unterstützung in einem Abschnitt, der an einen eigenen Hang angrenzt.",
    "effects": [],
    "flavor": "Feuer rollt den Hang hinab.",
    "image": "soforteinsatz/B258.jpg",
    "max_copies": 1,
    "collector": "B258",
    "rarity": "silver"
  },
  {
    "id": "dc_b_lauer__ereignis",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Lauer",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Bis zum Ende deines nächsten Zuges: eigene Einheiten haben +2 ATK gegen einrückende Feinde und dürfen verdeckt bleiben, bis sie angreifen.",
    "effects": [],
    "flavor": "Der ganze Pass ist eine Lauer.",
    "image": "soforteinsatz/B260.jpg",
    "max_copies": 1,
    "collector": "B260",
    "rarity": "gold"
  },
  {
    "id": "dc_b_verteilte_stellung__ereignis",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Verteilte Stellung",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Verteile bis zu drei eigene Einheiten auf angrenzende Abschnitte. Jede erhält +1 DEF bis Zugende.",
    "effects": [],
    "flavor": "Kein Haufen. Ein Netz.",
    "image": "soforteinsatz/B261.jpg",
    "max_copies": 1,
    "collector": "B261",
    "rarity": "gold"
  },
  {
    "id": "dc_b_nachhaerten_274",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Nachhärten",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit hat +2 DEF bis Zugende.",
    "effects": [],
    "flavor": "Noch eine Schicht.",
    "image": "soforteinsatz/B274.jpg",
    "max_copies": 1,
    "collector": "B274",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_namenrufen_275",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Namenrufen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe eine Karte. Eine eigene Einheit erhält +1 ATK bis Zugende.",
    "effects": [],
    "flavor": "Der Name zieht mit.",
    "image": "soforteinsatz/B275.jpg",
    "max_copies": 1,
    "collector": "B275",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_verlustschlag_276",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Verlustschlag",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Wenn du diese Runde eine Einheit verloren hast: eine feindliche Einheit -2 DEF bis Zugende.",
    "effects": [],
    "flavor": "Schmerz wird Waffe.",
    "image": "soforteinsatz/B276.jpg",
    "max_copies": 1,
    "collector": "B276",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_stehenbleiben_277",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Stehenbleiben",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit kann diesen Zug nicht bewegt oder geschoben werden und hat +1 DEF.",
    "effects": [],
    "flavor": "Hier. Und nirgendwo sonst.",
    "image": "soforteinsatz/B277.jpg",
    "max_copies": 1,
    "collector": "B277",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schmiedeimpuls_278",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Schmiedeimpuls",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Spiele eine Bronze-Ausrüstung ohne Kosten auf eine eigene Einheit.",
    "effects": [],
    "flavor": "Heiß und sofort.",
    "image": "soforteinsatz/B278.jpg",
    "max_copies": 1,
    "collector": "B278",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_aschenregen_279",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Aschenregen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Alle Einheiten in einem Abschnitt haben -1 ATK bis Zugende.",
    "effects": [],
    "flavor": "Asche auf beiden Seiten.",
    "image": "soforteinsatz/B279.jpg",
    "max_copies": 1,
    "collector": "B279",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_deckung_aus_verlust_289",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Deckung aus Verlust",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Zerstöre eine eigene Einheit: alle anderen eigenen Einheiten im Abschnitt haben +2 DEF bis Zugende.",
    "effects": [],
    "flavor": "Ihr Tod ist unser Schild.",
    "image": "soforteinsatz/B289.jpg",
    "max_copies": 1,
    "collector": "B289",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_gehaerteter_schritt_290",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Gehärteter Schritt",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit bewegt sich und behält +1 DEF bis Zugende.",
    "effects": [],
    "flavor": "Schwer, aber vorwärts.",
    "image": "soforteinsatz/B290.jpg",
    "max_copies": 1,
    "collector": "B290",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_abnutzungsstoss_296",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Abnutzungsstoß",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Jede feindliche Einheit in einem Abschnitt verliert 1 DEF. Für jede so getroffene: eine eigene Einheit +1 DEF.",
    "effects": [],
    "flavor": "Sie brechen. Wir halten.",
    "image": "soforteinsatz/B296.jpg",
    "max_copies": 1,
    "collector": "B296",
    "rarity": "silver"
  },
  {
    "id": "dc_b_namenssturm_297",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Namenssturm",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Decke bis zu drei Ausrüstungen aus dem Ablagestapel auf und spiele eine davon kostenlos.",
    "effects": [],
    "flavor": "Die Namen kehren zurück.",
    "image": "soforteinsatz/B297.jpg",
    "max_copies": 1,
    "collector": "B297",
    "rarity": "silver"
  },
  {
    "id": "dc_b_abnutzung__ereignis_299",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Abnutzung",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Bis zum Ende deines nächsten Zuges: jedes Mal, wenn eine Einheit stirbt (egal wessen), erhalten alle eigenen Einheiten +1 DEF.",
    "effects": [],
    "flavor": "Der Krieg frisst. Wir werden härter.",
    "image": "soforteinsatz/B299.jpg",
    "max_copies": 1,
    "collector": "B299",
    "rarity": "gold"
  },
  {
    "id": "dc_b_gepanzerter_fuss__ereignis_300",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Gepanzerter Fuß",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Alle eigenen Infanterie-Einheiten können diesen und den nächsten Zug nicht geschoben werden und haben +2 DEF.",
    "effects": [],
    "flavor": "Kein Schritt zurück. Kein Stoß durch.",
    "image": "soforteinsatz/B300.jpg",
    "max_copies": 1,
    "collector": "B300",
    "rarity": "gold"
  },
  {
    "id": "dc_b_wachabloesung_304",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Wachablösung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit hat in diesem Zug +1 DEF und greift nicht an.",
    "effects": [],
    "flavor": "Ablöse, nicht Flucht.",
    "image": "soforteinsatz/B304.jpg",
    "max_copies": 1,
    "collector": "B304",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_erholung_307",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Erholung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit heilt 2 DEF. Sie greift in diesem Zug nicht an.",
    "effects": [],
    "flavor": "Pause ist Befehl.",
    "image": "soforteinsatz/B307.jpg",
    "max_copies": 1,
    "collector": "B307",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_ruhephase_313",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Ruhephase",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Alle eigenen Einheiten, die im letzten Zug nicht angegriffen haben, haben +1 ATK.",
    "effects": [],
    "flavor": "Kraft kommt aus der Pause.",
    "image": "soforteinsatz/B313.jpg",
    "max_copies": 1,
    "collector": "B313",
    "rarity": "silver"
  },
  {
    "id": "dc_b_vollstaendige_ruhe_318",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Vollständige Ruhe",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Alle eigenen Einheiten heilen 2 DEF. Sie greifen in diesem Zug nicht an.",
    "effects": [],
    "flavor": "Stille über dem Feld.",
    "image": "soforteinsatz/B318.jpg",
    "max_copies": 1,
    "collector": "B318",
    "rarity": "gold"
  },
  {
    "id": "dc_b_kurzpause_338",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Kurzpause",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit greift nicht an und erhält +2 DEF bis Zugende.",
    "effects": [],
    "flavor": "Atem holen.",
    "image": "soforteinsatz/B338.jpg",
    "max_copies": 1,
    "collector": "B338",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_verband_anlegen_339",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Verband anlegen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Heile 2 DEF. Die Einheit kann diesen Zug nicht bewegt werden.",
    "effects": [],
    "flavor": "Fest und ruhig.",
    "image": "soforteinsatz/B339.jpg",
    "max_copies": 1,
    "collector": "B339",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_abloesebefehl_340",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Ablösebefehl",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Tausche Position zweier eigener Einheiten im selben Abschnitt.",
    "effects": [],
    "flavor": "Frisch für Matt.",
    "image": "soforteinsatz/B340.jpg",
    "max_copies": 1,
    "collector": "B340",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_deckung_suchen_341",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Deckung suchen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit hat +1 DEF und -1 ATK bis Zugende.",
    "effects": [],
    "flavor": "Kopf runter.",
    "image": "soforteinsatz/B341.jpg",
    "max_copies": 1,
    "collector": "B341",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nachtversorgung_342",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Nachtversorgung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Heile 1 DEF an bis zu drei eigenen Einheiten. Sie greifen nicht an.",
    "effects": [],
    "flavor": "Stille Karren.",
    "image": "soforteinsatz/B342.jpg",
    "max_copies": 1,
    "collector": "B342",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_sichern_343",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Sichern",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Ein Abschnitt hat +1 DEF. Eine Einheit dort darf nicht angreifen.",
    "effects": [],
    "flavor": "Halten, nicht jagen.",
    "image": "soforteinsatz/B343.jpg",
    "max_copies": 1,
    "collector": "B343",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_frisch_machen_344",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Frisch machen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Entferne einen -1 ATK- oder -1 DEF-Marker von einer Einheit.",
    "effects": [],
    "flavor": "Klarer Blick.",
    "image": "soforteinsatz/B344.jpg",
    "max_copies": 1,
    "collector": "B344",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_ruhe_vor_dem_stoss_345",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Ruhe vor dem Stoß",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Eine Einheit, die letzten Zug nicht angriff, hat +2 ATK diesen Zug.",
    "effects": [],
    "flavor": "Jetzt.",
    "image": "soforteinsatz/B345.jpg",
    "max_copies": 1,
    "collector": "B345",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_massenruhe_356",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Massenruhe",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Alle eigenen Einheiten heilen 1 DEF und greifen diesen Zug nicht an.",
    "effects": [],
    "flavor": "Das ganze Heer atmet.",
    "image": "soforteinsatz/B356.jpg",
    "max_copies": 1,
    "collector": "B356",
    "rarity": "silver"
  },
  {
    "id": "dc_b_gegenschlag_aus_ruhe_357",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Gegenschlag aus Ruhe",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Eine ruhende Einheit hat +3 ATK diesen Zug.",
    "effects": [],
    "flavor": "Aus dem Schatten.",
    "image": "soforteinsatz/B357.jpg",
    "max_copies": 1,
    "collector": "B357",
    "rarity": "silver"
  },
  {
    "id": "dc_b_etappensicherung_ereignis__ereignis_359",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Etappensicherung",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen Abschnitt. Er hat +2 DEF in diesem und dem nächsten Zug. Ruhende Einheiten dort heilen 1 DEF.",
    "effects": [],
    "flavor": "Die Etappe hält.",
    "image": "soforteinsatz/B359.jpg",
    "max_copies": 1,
    "collector": "B359",
    "rarity": "gold"
  },
  {
    "id": "dc_b_rasten_ereignis__ereignis_360",
    "set": "set_nations",
    "nation": "Caldris",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Rasten",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Alle eigenen Einheiten, die im letzten Zug nicht angegriffen haben, haben +2 ATK und heilen 1 DEF.",
    "effects": [],
    "flavor": "Aus der Ruhe die Kraft.",
    "image": "soforteinsatz/B360.jpg",
    "max_copies": 1,
    "collector": "B360",
    "rarity": "gold"
  },
  {
    "id": "dc_b_peilung_427",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Peilung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Decke eine gegnerische Einheit auf. Sie hat -1 DEF bis Zugende.",
    "effects": [],
    "flavor": "Gefunden.",
    "image": "soforteinsatz/B427.jpg",
    "max_copies": 1,
    "collector": "B427",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_praezisionsschuss_429",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Präzisionsschuss",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Eine gegnerische Einheit erleidet 3 Schaden. Ist sie aufgeklärt, 4.",
    "effects": [],
    "flavor": "Ein Schuss.",
    "image": "soforteinsatz/B429.jpg",
    "max_copies": 1,
    "collector": "B429",
    "rarity": "silver"
  },
  {
    "id": "dc_b_aufgedeckt_432",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Aufgedeckt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Decke bis zu zwei gegnerische Einheiten auf.",
    "effects": [],
    "flavor": "Nichts bleibt verborgen.",
    "image": "soforteinsatz/B432.jpg",
    "max_copies": 1,
    "collector": "B432",
    "rarity": "silver"
  },
  {
    "id": "dc_b_einzelschuss_434",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Einzelschuss",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Eine gegnerische Einheit erleidet 5 Schaden. Ist sie aufgeklärt, wird sie zerstört, wenn sie 3 DEF oder weniger hat.",
    "effects": [],
    "flavor": "Ein Schuss genügt.",
    "image": "soforteinsatz/B434.jpg",
    "max_copies": 1,
    "collector": "B434",
    "rarity": "gold"
  },
  {
    "id": "dc_b_sichtlinie_438",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Sichtlinie",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Eine gegnerische Einheit ist aufgeklärt bis Zugende.",
    "effects": [],
    "flavor": "Klar.",
    "image": "soforteinsatz/B438.jpg",
    "max_copies": 1,
    "collector": "B438",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_klarstellung_456",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Klarstellung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Decke ein Ziel auf. Ziehe eine Karte.",
    "effects": [],
    "flavor": "Klar.",
    "image": "soforteinsatz/B456.jpg",
    "max_copies": 1,
    "collector": "B456",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nachmessen_457",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Nachmessen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Ein aufgeklärtes Ziel hat -2 DEF bis Zugende.",
    "effects": [],
    "flavor": "Nochmal messen.",
    "image": "soforteinsatz/B457.jpg",
    "max_copies": 1,
    "collector": "B457",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_visier_458",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Visier",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit hat +2 ATK gegen ein aufgeklärtes Ziel.",
    "effects": [],
    "flavor": "Im Visier.",
    "image": "soforteinsatz/B458.jpg",
    "max_copies": 1,
    "collector": "B458",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_aufdecken_459",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Aufdecken",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Decke bis zu zwei Ziele in einem Abschnitt auf.",
    "effects": [],
    "flavor": "Aufdecken.",
    "image": "soforteinsatz/B459.jpg",
    "max_copies": 1,
    "collector": "B459",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_feinvisier_460",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Feinvisier",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Zerstöre ein aufgeklärtes Ziel mit 2 DEF oder weniger.",
    "effects": [],
    "flavor": "Fein genug.",
    "image": "soforteinsatz/B460.jpg",
    "max_copies": 1,
    "collector": "B460",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_peilruf_461",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Peilruf",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Reaktion: wenn ein Ziel aufgeklärt wird, erleidet es 1 Schaden.",
    "effects": [],
    "flavor": "Ruf der Peilung.",
    "image": "soforteinsatz/B461.jpg",
    "max_copies": 1,
    "collector": "B461",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_messfehler_462",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Messfehler",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Ein Feind hat -1 ATK bis Zugende. Ist er aufgeklärt, -2.",
    "effects": [],
    "flavor": "Fehler genutzt.",
    "image": "soforteinsatz/B462.jpg",
    "max_copies": 1,
    "collector": "B462",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_doppelsicht_476",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Doppelsicht",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Decke zwei Ziele auf. Eins davon hat -2 DEF.",
    "effects": [],
    "flavor": "Zwei Augen.",
    "image": "soforteinsatz/B476.jpg",
    "max_copies": 1,
    "collector": "B476",
    "rarity": "silver"
  },
  {
    "id": "dc_b_punktmarke_477",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Punktmarke",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Ein aufgeklärtes Ziel erleidet 3 Schaden und bleibt aufgeklärt.",
    "effects": [],
    "flavor": "Punkt gesetzt.",
    "image": "soforteinsatz/B477.jpg",
    "max_copies": 1,
    "collector": "B477",
    "rarity": "silver"
  },
  {
    "id": "dc_b_punktfeuer__ereignis_479",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Punktfeuer",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle ein aufgeklärtes Ziel. Alle eigenen Angriffe dagegen haben in diesem Zug +2 ATK; der erste zerstört bei Überhang 1 zusätzliche DEF.",
    "effects": [],
    "flavor": "Punktfeuer sitzt.",
    "image": "soforteinsatz/B479.jpg",
    "max_copies": 1,
    "collector": "B479",
    "rarity": "gold"
  },
  {
    "id": "dc_b_lokalisierung__ereignis_480",
    "set": "set_nations",
    "nation": "Orthea",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Lokalisierung",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Decke bis zu drei gegnerische Einheiten auf. Sie haben -1 DEF bis zum Ende deines nächsten Zuges.",
    "effects": [],
    "flavor": "Lokalisiert.",
    "image": "soforteinsatz/B480.jpg",
    "max_copies": 1,
    "collector": "B480",
    "rarity": "gold"
  },
  {
    "id": "dc_b_volle_ladung_487",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Volle Ladung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe zwei Karten.",
    "effects": [],
    "flavor": "Voll beladen.",
    "image": "soforteinsatz/B487.jpg",
    "max_copies": 1,
    "collector": "B487",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_signalfahne_500",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Signalfahne",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen Abschnitt: Einheiten, die dorthin rücken, haben in diesem Zug +1 DEF.",
    "effects": [],
    "flavor": "Kommt her.",
    "image": "soforteinsatz/B500.jpg",
    "max_copies": 1,
    "collector": "B500",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_entsatzrufer_508",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Entsatzrufer",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Spiele eine Einheit mit Kosten 2 oder weniger aus der Hand in einen angegriffenen Abschnitt.",
    "effects": [],
    "flavor": "Soforthilfe.",
    "image": "soforteinsatz/B508.jpg",
    "max_copies": 1,
    "collector": "B508",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_seilbahn_513",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Seilbahn",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Bewege eine eigene Einheit in einen Nachbarabschnitt. Kostet 0, wenn Unterstützung am Start liegt.",
    "effects": [],
    "flavor": "Über den Graben.",
    "image": "soforteinsatz/B513.jpg",
    "max_copies": 1,
    "collector": "B513",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_umschlag_516",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Umschlag",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Tausche die Position zweier eigener Unterstützungen.",
    "effects": [],
    "flavor": "Umladen.",
    "image": "soforteinsatz/B516.jpg",
    "max_copies": 1,
    "collector": "B516",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nachschubzettel_519",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Nachschubzettel",
    "ap": 0,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Sieh dir die obersten drei Karten an. Behalte eine, lege den Rest zurück.",
    "effects": [],
    "flavor": "Liste prüfen.",
    "image": "soforteinsatz/B519.jpg",
    "max_copies": 1,
    "collector": "B519",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_entlastung_524",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Entlastung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit, die in einen angegriffenen Abschnitt rückt, hat +1 ATK und +1 DEF.",
    "effects": [],
    "flavor": "Druck weg.",
    "image": "soforteinsatz/B524.jpg",
    "max_copies": 1,
    "collector": "B524",
    "rarity": "silver"
  },
  {
    "id": "dc_b_notlieferung_530",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Notlieferung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe drei Karten. Wirf eine ab.",
    "effects": [],
    "flavor": "Sofortbedarf.",
    "image": "soforteinsatz/B530.jpg",
    "max_copies": 1,
    "collector": "B530",
    "rarity": "silver"
  },
  {
    "id": "dc_b_wegbruecke_534",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Wegbrücke",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Bis zum Ende des Zuges kosten Bewegungen zwischen zwei Abschnitten mit eigener Unterstützung 1 weniger.",
    "effects": [],
    "flavor": "Brücke steht.",
    "image": "soforteinsatz/B534.jpg",
    "max_copies": 1,
    "collector": "B534",
    "rarity": "silver"
  },
  {
    "id": "dc_b_letzte_lieferung_536",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Letzte Lieferung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Spiele eine Einheit aus der Hand in einen Abschnitt, der im letzten Zug angegriffen wurde. Sie hat +1 ATK.",
    "effects": [],
    "flavor": "Noch eine Fuhre.",
    "image": "soforteinsatz/B536.jpg",
    "max_copies": 1,
    "collector": "B536",
    "rarity": "gold"
  },
  {
    "id": "dc_b_marsch_aus_dem_vollen_ereignis_539",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Marsch aus dem Vollen",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Liegt Unterstützung im Abschnitt: Einheiten dort kosten in diesem Zug 1 weniger und haben +1 ATK.",
    "effects": [],
    "flavor": "Marsch aus dem Vollen sitzt.",
    "image": "soforteinsatz/B539.jpg",
    "max_copies": 1,
    "collector": "B539",
    "rarity": "gold"
  },
  {
    "id": "dc_b_entsatz_ereignis_540",
    "set": "set_nations",
    "nation": "Namar",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Einsatz",
    "name": "Entsatz",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": true,
    "tags": [
      "einsatz"
    ],
    "text": "Einheiten, die in diesem Zug in einen im letzten Zug angegriffenen Abschnitt rücken, haben +1 ATK und +1 DEF.",
    "effects": [],
    "flavor": "Entsatz sitzt.",
    "image": "soforteinsatz/B540.jpg",
    "max_copies": 1,
    "collector": "B540",
    "rarity": "gold"
  },
  {
    "id": "dc_b_reglement_544",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Reglement",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit hat +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Schriftlich.",
    "image": "soforteinsatz/B544.jpg",
    "max_copies": 1,
    "collector": "B544",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_meldekette_548",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Meldekette",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe eine Karte. Eine feindliche Einheit gilt als beobachtet.",
    "effects": [],
    "flavor": "Durchgestellt.",
    "image": "soforteinsatz/B548.jpg",
    "max_copies": 1,
    "collector": "B548",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_planungsrunde_554",
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
    "text": "Wähle einen Abschnitt. Eine feindliche Einheit dort gilt als beobachtet. Ziehe eine Karte.",
    "effects": [],
    "flavor": "Erst planen.",
    "image": "soforteinsatz/B554.jpg",
    "max_copies": 1,
    "collector": "B554",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_sichtlinie_561",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Sichtlinie",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine feindliche Einheit gilt als beobachtet bis zum Ende deines nächsten Zuges.",
    "effects": [],
    "flavor": "Klarer Blick.",
    "image": "soforteinsatz/B561.jpg",
    "max_copies": 1,
    "collector": "B561",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_pioniereinsatz_565",
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
    "text": "Eine eigene Einheit hat +1 DEF und gilt als beobachtet für den Gegner bis Zugende.",
    "effects": [],
    "flavor": "Robust zuerst.",
    "image": "soforteinsatz/B565.jpg",
    "max_copies": 1,
    "collector": "B565",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_reservistenruf_569",
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
    "text": "Spiele eine Einheit mit Kosten 2 oder weniger aus der Hand. Sie kostet 1 weniger, mindestens 1.",
    "effects": [],
    "flavor": "Bürger einrücken.",
    "image": "soforteinsatz/B569.jpg",
    "max_copies": 1,
    "collector": "B569",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_befehlskopien_575",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Befehlskopien",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Kopiere den Text: ziehe zwei Karten, wirf eine ab.",
    "effects": [],
    "flavor": "Drei Lesarten.",
    "image": "soforteinsatz/B575.jpg",
    "max_copies": 1,
    "collector": "B575",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_doppelbeobachtung_583",
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
    "text": "Zwei feindliche Einheiten gelten als beobachtet. Eine eigene Einheit hat +1 ATK gegen eine davon.",
    "effects": [],
    "flavor": "Zwei Lesarten.",
    "image": "soforteinsatz/B583.jpg",
    "max_copies": 1,
    "collector": "B583",
    "rarity": "silver"
  },
  {
    "id": "dc_b_synchronfeuer_588",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Synchronfeuer",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Bis zu zwei eigene Einheiten haben +1 ATK gegen beobachtete Ziele in diesem Zug.",
    "effects": [],
    "flavor": "Gleichzeitig.",
    "image": "soforteinsatz/B588.jpg",
    "max_copies": 1,
    "collector": "B588",
    "rarity": "silver"
  },
  {
    "id": "dc_b_verfahrensbruch_589",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Verfahrensbruch",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Spiele eine Einheit. Sie kostet 2 weniger (mind. 1), gilt aber als beobachtet für den Gegner.",
    "effects": [],
    "flavor": "Sprache politisch.",
    "image": "soforteinsatz/B589.jpg",
    "max_copies": 1,
    "collector": "B589",
    "rarity": "silver"
  },
  {
    "id": "dc_b_drei_schlussel_597",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Drei Schlüssel",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Spiele eine Einheit aus der Hand mit 3 weniger Kosten (mind. 1). Alle feindlichen Einheiten in ihrem Abschnitt gelten als beobachtet.",
    "effects": [],
    "flavor": "Parlament, Kommission, Land.",
    "image": "soforteinsatz/B597.jpg",
    "max_copies": 1,
    "collector": "B597",
    "rarity": "gold"
  },
  {
    "id": "dc_b_feuerplan_599",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Feuerplan",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine feindliche Einheit. Sie gilt als beobachtet. Der nächste eigene Angriff gegen sie hat +2 ATK, und du darfst danach eine Aktion einer eigenen Einheit wiederholen.",
    "effects": [],
    "flavor": "Feuerplan sitzt.",
    "image": "soforteinsatz/B599.jpg",
    "max_copies": 1,
    "collector": "B599",
    "rarity": "gold"
  },
  {
    "id": "dc_b_normverband_600",
    "set": "set_nations",
    "nation": "Steinmark",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Normverband",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Besitzt du in einer Front Infanterie und Artillerie (oder Panzer), hat die gesamte Frontlinie +1 ATK und +1 DEF bis zum Ende deines nächsten Zuges.",
    "effects": [],
    "flavor": "Normverband sitzt.",
    "image": "soforteinsatz/B600.jpg",
    "max_copies": 1,
    "collector": "B600",
    "rarity": "gold"
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
    "text": "Eine eigene Einheit hat +2 DEF bis Zugende.",
    "effects": [],
    "flavor": "Gesprochen. Gezählt.",
    "image": "soforteinsatz/B637.jpg",
    "max_copies": 1,
    "collector": "B637",
    "rarity": "bronze"
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
    "text": "Heile 2 DEF an einer eigenen Einheit oder ersetze sie gedanklich: ziehe 1, wenn sie beschädigt war.",
    "effects": [],
    "flavor": "Frisch Blut in alte Stellungen.",
    "image": "soforteinsatz/B638.jpg",
    "max_copies": 1,
    "collector": "B638",
    "rarity": "bronze"
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
    "text": "Zwei eigene Einheiten im selben Abschnitt haben +1 ATK bis Zugende.",
    "effects": [],
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
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Eine eigene Einheit hat +1 ATK und +1 DEF bis Zugende.",
    "effects": [],
    "flavor": "Auszeichnung und Auftrag in einem.",
    "image": "soforteinsatz/B640.jpg",
    "max_copies": 1,
    "collector": "B640",
    "rarity": "bronze"
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
    "effects": [],
    "flavor": "Was die Krone streicht, gilt als ungültig.",
    "image": "soforteinsatz/B641.jpg",
    "max_copies": 1,
    "collector": "B641",
    "rarity": "silver"
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
    "text": "Bewege eine eigene Einheit in einen angrenzenden Abschnitt. Sie hat dort +1 ATK bis Zugende.",
    "effects": [],
    "flavor": "Die Straßen erinnern sich an Kolonnen.",
    "image": "soforteinsatz/B642.jpg",
    "max_copies": 1,
    "collector": "B642",
    "rarity": "bronze"
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
    "effects": [],
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
    "text": "Zwei eigene Einheiten haben je +1 DEF bis Zugende. Wenn eine zerstört wird: die andere heilt 1.",
    "effects": [],
    "flavor": "Zwei Namen. Ein Eid.",
    "image": "soforteinsatz/B644.jpg",
    "max_copies": 1,
    "collector": "B644",
    "rarity": "silver"
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
    "text": "Füge einer gegnerischen Einheit 2 Schaden zu.",
    "effects": [],
    "flavor": "Genau dort, wo die Karte es sagt.",
    "image": "soforteinsatz/B645.jpg",
    "max_copies": 1,
    "collector": "B645",
    "rarity": "bronze"
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
    "text": "Alle eigenen Einheiten in einem Abschnitt haben +1 DEF bis Zugende.",
    "effects": [],
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
    "name": "Schwerpunkt",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle einen Abschnitt. Eigene Angriffe dort +2 ATK diesen Zug. Danach erleidet eine eigene Einheit dort 1 Schaden.",
    "effects": [],
    "flavor": "Konzentration hat einen Preis.",
    "image": "soforteinsatz/B659.jpg",
    "max_copies": 1,
    "collector": "B659",
    "rarity": "gold"
  },
  {
    "id": "dc_b_abloesung_660",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Ablösung",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Zerstöre eine eigene Einheit. Spiele eine Einheit aus der Hand in denselben Abschnitt mit Kosten bis Kosten der Zerstörten +1. Heile sie um 1.",
    "effects": [],
    "flavor": "Der Platz bleibt heilig. Die Person nicht.",
    "image": "soforteinsatz/B660.jpg",
    "max_copies": 1,
    "collector": "B660",
    "rarity": "gold"
  },
  {
    "id": "dc_b_umgehungspfad_662",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Umgehungspfad",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Bewege eine eigene Einheit in einen Abschnitt, in dem der Gegner weniger Einheiten hat als du.",
    "effects": [],
    "flavor": "Der kürzere Weg ist selten der offene.",
    "image": "soforteinsatz/B662.jpg",
    "max_copies": 1,
    "collector": "B662",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_umwegbefehl_670",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Umwegbefehl",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit hat +2 ATK, wenn der Gegner in ihrem Abschnitt weniger Einheiten hat.",
    "effects": [],
    "flavor": "Umweg ist Angriff.",
    "image": "soforteinsatz/B670.jpg",
    "max_copies": 1,
    "collector": "B670",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_durchlass_675",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Durchlass",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen Abschnitt: eigene Einheiten dürfen diesen Zug dorthin bewegt werden, als wäre er angrenzend.",
    "effects": [],
    "flavor": "Der Vertrag öffnet.",
    "image": "soforteinsatz/B675.jpg",
    "max_copies": 1,
    "collector": "B675",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_fristtafel_680",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Fristtafel",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine feindliche Einheit kann diesen Zug nicht angreifen.",
    "effects": [],
    "flavor": "Frist schlecht nennen.",
    "image": "soforteinsatz/B680.jpg",
    "max_copies": 1,
    "collector": "B680",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_umschlagplatz_684",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Umschlagplatz",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Lege 1 Karte ab: spiele eine Einheit mit Kosten ≤2 aus der Hand.",
    "effects": [],
    "flavor": "Was ankommt, geht weiter.",
    "image": "soforteinsatz/B684.jpg",
    "max_copies": 1,
    "collector": "B684",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_umgehungsfeuer_690",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Umgehungsfeuer",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine feindliche Einheit in einem Abschnitt mit weniger Einheiten als du erleidet 1 Schaden.",
    "effects": [],
    "flavor": "Raum wird Waffe.",
    "image": "soforteinsatz/B690.jpg",
    "max_copies": 1,
    "collector": "B690",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_schnellpass_694",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Schnellpass",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit erhält +1 ATK und darf sofort angreifen, wenn der Gegner im Abschnitt weniger Einheiten hat.",
    "effects": [],
    "flavor": "Schnell, solange offen.",
    "image": "soforteinsatz/B694.jpg",
    "max_copies": 1,
    "collector": "B694",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_handelskette_698",
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
    "text": "Ziehe 1 Karte für jede eigene Einheit in einem Abschnitt mit mindestens zwei Einheiten (max. 3).",
    "effects": [],
    "flavor": "Kette bricht, Staat bricht.",
    "image": "soforteinsatz/B698.jpg",
    "max_copies": 1,
    "collector": "B698",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_gro_er_umweg_702",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Großer Umweg",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Bewege bis zu zwei eigene Einheiten. Einheiten, die danach in Abschnitten mit weniger Feinden stehen, erhalten +1 ATK.",
    "effects": [],
    "flavor": "Umweg als Plan.",
    "image": "soforteinsatz/B702.jpg",
    "max_copies": 1,
    "collector": "B702",
    "rarity": "silver"
  },
  {
    "id": "dc_b_doppelumgehung_707",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Doppelumgehung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Zwei Angriffe gegen Abschnitte, in denen der Gegner weniger Einheiten hat, haben je +1 ATK.",
    "effects": [],
    "flavor": "Zwei Seiten. Ein Ziel.",
    "image": "soforteinsatz/B707.jpg",
    "max_copies": 1,
    "collector": "B707",
    "rarity": "silver"
  },
  {
    "id": "dc_b_nachtumgehung_711",
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
    "text": "Spiele eine Einheit verdeckt in einen Abschnitt, in dem der Gegner weniger Einheiten hat. Sie hat +1 ATK beim Aufdecken.",
    "effects": [],
    "flavor": "Nachtweg um die Wache.",
    "image": "soforteinsatz/B711.jpg",
    "max_copies": 1,
    "collector": "B711",
    "rarity": "silver"
  },
  {
    "id": "dc_b_weite_umgehung_716",
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
    "text": "Bewege bis zu drei eigene Einheiten. Danach haben Angriffe in Abschnitten mit weniger Feinden +2 ATK bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Der Staat ist der Weg.",
    "image": "soforteinsatz/B716.jpg",
    "max_copies": 1,
    "collector": "B716",
    "rarity": "gold"
  },
  {
    "id": "dc_b_linienkrieg_719",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Linienkrieg",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Alle Abschnitte mit mindestens zwei eigenen Einheiten erhalten +1 DEF. Eine eigene Einheit in einem solchen Abschnitt hat +2 ATK bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Zwei halten. Die Linie trägt.",
    "image": "soforteinsatz/B719.jpg",
    "max_copies": 1,
    "collector": "B719",
    "rarity": "gold"
  },
  {
    "id": "dc_b_umgehen_720",
    "set": "set_nations",
    "nation": "Sahr",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Umgehen",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen Abschnitt, in dem der Gegner weniger Einheiten hat als du. Ein eigener Angriff dort hat +3 ATK. Danach darfst du eine Einheit dorthin bewegen.",
    "effects": [],
    "flavor": "Weniger Feinde. Mehr Schlag.",
    "image": "soforteinsatz/B720.jpg",
    "max_copies": 1,
    "collector": "B720",
    "rarity": "gold"
  },
  {
    "id": "dc_b_grenzstellung_730",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Grenzstellung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit in einem Abschnitt, in dem der Gegner mehr Einheiten hat, erhält +2 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Die alte Grenze hält.",
    "image": "soforteinsatz/B730.jpg",
    "max_copies": 1,
    "collector": "B730",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_parlamentsbremse_732",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Parlamentsbremse",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Negiere den Text einer Soforteinsatz-Karte mit Kosten 3 oder weniger, die ein Gegner in diesem Zug gespielt hat.",
    "effects": [],
    "flavor": "Die Kammer darf verzögern.",
    "image": "soforteinsatz/B732.jpg",
    "max_copies": 1,
    "collector": "B732",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_niederau_bescheid_737",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Niederau-Bescheid",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Erhalte 1 AP. Du kannst diesen Zug keinen Angriff erklären.",
    "effects": [],
    "flavor": "Staat ohne Posten.",
    "image": "soforteinsatz/B737.jpg",
    "max_copies": 1,
    "collector": "B737",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_haushaltspause_739",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Haushaltspause",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ein Gegner kann bis zum Ende des Zuges keine Einheit mit Kosten 3 oder mehr ausspielen.",
    "effects": [],
    "flavor": "Beide Häuser lesen mit.",
    "image": "soforteinsatz/B739.jpg",
    "max_copies": 1,
    "collector": "B739",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_gegenruf_744",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Gegenruf",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit, die in diesem Zug angegriffen wurde, hat +2 ATK bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Wurde getroffen — antwortet.",
    "image": "soforteinsatz/B744.jpg",
    "max_copies": 1,
    "collector": "B744",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_minenfeld_skizze_747",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Minenfeld-Skizze",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Markiere einen Abschnitt. Der nächste feindliche Angriff dort hat −2 ATK.",
    "effects": [],
    "flavor": "Gerät über Jahre.",
    "image": "soforteinsatz/B747.jpg",
    "max_copies": 1,
    "collector": "B747",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_auffanglinie_751",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Auffanglinie",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Alle eigenen Einheiten in Abschnitten, in denen der Gegner mehr Einheiten hat, erhalten +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Wo er mehr hat, hältst du.",
    "image": "soforteinsatz/B751.jpg",
    "max_copies": 1,
    "collector": "B751",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_verzoegerter_ruf_756",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Verzögerter Ruf",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ein Gegner spielt diesen Zug seine nächste Einheit mit +1 Kosten (min. +0 sichtbar als: er muss 1 Karte abwerfen, um sie auszuspielen).",
    "effects": [],
    "flavor": "Gleichmäßiger als zuletzt.",
    "image": "soforteinsatz/B756.jpg",
    "max_copies": 1,
    "collector": "B756",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_ziviler_schutz_759",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Ziviler Schutz",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit ohne Ausrüstung erhält +2 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Gemeinde vor Kader.",
    "image": "soforteinsatz/B759.jpg",
    "max_copies": 1,
    "collector": "B759",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_lenn_frage_765",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Lenn-Frage",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Schaue die Hand eines Gegners an. Wähle eine Einheit darin: sie kostet diesen Zug +1 AP mehr.",
    "effects": [],
    "flavor": "Höfe, nicht abstrakte Verluste.",
    "image": "soforteinsatz/B765.jpg",
    "max_copies": 1,
    "collector": "B765",
    "rarity": "silver"
  },
  {
    "id": "dc_b_verzoegerte_aushebung_770",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Verzögerte Aushebung",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Bis zum Ende des gegnerischen nächsten Zuges: feindliche Einheiten kommen mit −1 ATK ins Spiel.",
    "effects": [],
    "flavor": "Später, dafür gleichmäßiger.",
    "image": "soforteinsatz/B770.jpg",
    "max_copies": 1,
    "collector": "B770",
    "rarity": "silver"
  },
  {
    "id": "dc_b_gegenbefehl_773",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Gegenbefehl",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Negiere einen feindlichen Angriff gegen eine eigene Einheit. Diese Einheit hat +1 ATK bis zum Ende deines nächsten Zuges.",
    "effects": [],
    "flavor": "Kritik in das Haus lassen.",
    "image": "soforteinsatz/B773.jpg",
    "max_copies": 1,
    "collector": "B773",
    "rarity": "silver"
  },
  {
    "id": "dc_b_koenigliche_antwort_776",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Königliche Antwort",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wenn in diesem Zug eine eigene Einheit angegriffen wurde: bis zu zwei eigene Einheiten haben +2 ATK bis zum Ende des Zuges. Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Arbeit, nicht Ruhm.",
    "image": "soforteinsatz/B776.jpg",
    "max_copies": 1,
    "collector": "B776",
    "rarity": "gold"
  },
  {
    "id": "dc_b_auffangen_779",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Auffangen",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen Abschnitt, in dem der Gegner mehr Einheiten hat als du. Eigene Einheiten dort haben +2 DEF. Eine davon hat +2 ATK bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Mehr Feinde. Mehr Halt.",
    "image": "soforteinsatz/B779.jpg",
    "max_copies": 1,
    "collector": "B779",
    "rarity": "gold"
  },
  {
    "id": "dc_b_gegenstoss_780",
    "set": "set_nations",
    "nation": "Eldran",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Gegenstoß",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine eigene Einheit, die in diesem Zug angegriffen wurde. Sie hat +3 ATK bis zum Ende des Zuges. Eine andere eigene Einheit im selben Abschnitt hat +1 ATK und +1 DEF.",
    "effects": [],
    "flavor": "Getroffen — und zurück.",
    "image": "soforteinsatz/B780.jpg",
    "max_copies": 1,
    "collector": "B780",
    "rarity": "gold"
  },
  {
    "id": "dc_b_fruehwarnung_801",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Frühwarnung",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine gegnerische Einheit gilt als aufgeklärt. Eine eigene Einheit hat +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Früher wissen als der Schaden.",
    "image": "soforteinsatz/B801.jpg",
    "max_copies": 1,
    "collector": "B801",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kurzer_einsatz_802",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Kurzer Einsatz",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit hat +2 ATK bis zum Ende des Zuges. Wenn das Ziel aufgeklärt ist: sie hat zusätzlich +1 DEF.",
    "effects": [],
    "flavor": "Kurz halten. Nicht zum Kalender machen.",
    "image": "soforteinsatz/B802.jpg",
    "max_copies": 1,
    "collector": "B802",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_netz_haelt_803",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Netz hält",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Bis zum Ende des Zuges: eigene Einheiten haben +1 DEF. Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Verbindung halten heißt nicht herrschen.",
    "image": "soforteinsatz/B803.jpg",
    "max_copies": 1,
    "collector": "B803",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_strassenlage_804",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Straßenlage",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen Abschnitt. Alle gegnerischen Einheiten dort gelten als aufgeklärt. Eine eigene Einheit dort hat +1 ATK bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Die Straße war neuer.",
    "image": "soforteinsatz/B804.jpg",
    "max_copies": 1,
    "collector": "B804",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_rueckruf_schicht_805",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Rückruf Schicht",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Nimm eine eigene Einheit auf die Hand zurück. Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Montag an der Bank.",
    "image": "soforteinsatz/B805.jpg",
    "max_copies": 1,
    "collector": "B805",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_ausfallplan_815",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Ausfallplan",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit hat +3 DEF bis zum Ende des Zuges. Du kannst in diesem Zug keine weiteren Soforteinsatz-Karten spielen.",
    "effects": [],
    "flavor": "Notdürftig handeln, als Person.",
    "image": "soforteinsatz/B815.jpg",
    "max_copies": 1,
    "collector": "B815",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zwei_wege_skizze_816",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Zwei Wege Skizze",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle zwei Abschnitte. In jedem gilt eine gegnerische Einheit als aufgeklärt bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Ein Weg sieht. Der andere hält.",
    "image": "soforteinsatz/B816.jpg",
    "max_copies": 1,
    "collector": "B816",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_verlustliste_lesen_817",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Verlustliste lesen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe 2 Karten, dann lege 1 Karte ab. Eine eigene Einheit hat +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Namen, keine Summe.",
    "image": "soforteinsatz/B817.jpg",
    "max_copies": 1,
    "collector": "B817",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_lage_gegen_lage_829",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Lage gegen Lage",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Alle gegnerischen Einheiten in einem Abschnitt gelten als aufgeklärt. Eigene Angriffe dort haben +1 ATK bis zum Ende des Zuges. Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Beide lesen. Keiner folgt blind.",
    "image": "soforteinsatz/B829.jpg",
    "max_copies": 1,
    "collector": "B829",
    "rarity": "silver"
  },
  {
    "id": "dc_b_kurzer_krieg_beschluss_833",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Kurzer Krieg Beschluss",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit hat +3 ATK bis zum Ende des Zuges. Wenn sie ein aufgeklärtes Ziel angreift: +1 DEF. Am Ende des Zuges: ziehe 1 Karte.",
    "effects": [],
    "flavor": "Dauer ist Gefahr für die Freiheit.",
    "image": "soforteinsatz/B833.jpg",
    "max_copies": 1,
    "collector": "B833",
    "rarity": "silver"
  },
  {
    "id": "dc_b_verzoegerte_leitung_834",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Verzögerte Leitung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Der Gegner muss 1 Karte abwerfen, bevor er in diesem Zug seine nächste Einheit ausspielen darf. Eine eigene Einheit hat +2 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Alte Daten sind schlechte Herren.",
    "image": "soforteinsatz/B834.jpg",
    "max_copies": 1,
    "collector": "B834",
    "rarity": "silver"
  },
  {
    "id": "dc_b_republikanische_antwort_836",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Republikanische Antwort",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe 2 Karten. Bis zu zwei eigene Einheiten haben +2 ATK gegen aufgeklärte Ziele und +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Laut streiten, ohne die Republik aufzukündigen.",
    "image": "soforteinsatz/B836.jpg",
    "max_copies": 1,
    "collector": "B836",
    "rarity": "gold"
  },
  {
    "id": "dc_b_aufklaerungsschlag_839",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Aufklärungsschlag",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen Abschnitt. Alle gegnerischen Einheiten dort gelten als aufgeklärt. Eigene Angriffe gegen aufgeklärte Einheiten haben +2 ATK bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Schlagen, wo die Quelle stimmt.",
    "image": "soforteinsatz/B839.jpg",
    "max_copies": 1,
    "collector": "B839",
    "rarity": "gold"
  },
  {
    "id": "dc_b_lokalisierung_840",
    "set": "set_nations",
    "nation": "Averon",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Lokalisierung",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle bis zu zwei gegnerische Einheiten. Sie gelten als aufgeklärt und erhalten −1 DEF bis zum Ende des Zuges. Eine eigene Einheit hat +2 ATK bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Zwei Wege. Eine genaue Stelle.",
    "image": "soforteinsatz/B840.jpg",
    "max_copies": 1,
    "collector": "B840",
    "rarity": "gold"
  },
  {
    "id": "dc_b_lage_setzen_854",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Lage setzen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe 2 Karten, dann lege 1 Karte ab. Eine eigene Einheit hat +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Ein Zug. Kein Befehl der Treue.",
    "image": "soforteinsatz/B854.jpg",
    "max_copies": 1,
    "collector": "B854",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_abriegelpunkt_855",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Abriegelpunkt",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen leeren Abschnitt. Bis zum Ende des Zuges: eine Einheit, die dort einrückt, erleidet 1 Schaden. Eine eigene Einheit hat +1 DEF.",
    "effects": [],
    "flavor": "Leer beschießen.",
    "image": "soforteinsatz/B855.jpg",
    "max_copies": 1,
    "collector": "B855",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_stillheim_quote_857",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Stillheim-Quote",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Der Gegner legt 1 Karte ab. Eine eigene Einheit hat +2 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Preis, unter dem der Rest spielt.",
    "image": "soforteinsatz/B857.jpg",
    "max_copies": 1,
    "collector": "B857",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_nila_fahrt_861",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Nila-Fahrt",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Nimm eine eigene Einheit auf die Hand zurück. Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Keine Lage über den Sinn.",
    "image": "soforteinsatz/B861.jpg",
    "max_copies": 1,
    "collector": "B861",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_partie_zug_863",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Partie-Zug",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit hat +2 ATK bis zum Ende des Zuges. Du legst 1 Karte ab.",
    "effects": [],
    "flavor": "Der nächste Zug trotzdem.",
    "image": "soforteinsatz/B863.jpg",
    "max_copies": 1,
    "collector": "B863",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_ruhigstellung_864",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Ruhigstellung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Einheit. Sie hat −1 ATK und −1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Aus dem Verkehr der Züge.",
    "image": "soforteinsatz/B864.jpg",
    "max_copies": 1,
    "collector": "B864",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_version_reicht_869",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Version reicht",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit hat +1 ATK und +1 DEF bis zum Ende des Zuges. Ziehe 1 Karte, dann lege 1 ab.",
    "effects": [],
    "flavor": "Am Abend eine andere.",
    "image": "soforteinsatz/B869.jpg",
    "max_copies": 1,
    "collector": "B869",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_gegenseitige_furcht_873",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Gegenseitige Furcht",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Bis zum Ende des Zuges: eigene und gegnerische Einheiten in einem Abschnitt haben −1 ATK. Eine eigene Einheit dort hat +2 DEF.",
    "effects": [],
    "flavor": "Jeder weiß genug.",
    "image": "soforteinsatz/B873.jpg",
    "max_copies": 1,
    "collector": "B873",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_bruderakte_876",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Bruderakte",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe 1 Karte. Der Gegner legt 1 Karte ab. Eine eigene Einheit hat +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Familie liest mit.",
    "image": "soforteinsatz/B876.jpg",
    "max_copies": 1,
    "collector": "B876",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_archivzug_880",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Archivzug",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Lege bis zu 2 Karten ab: für jede abgelegte erhält eine eigene Einheit +1 ATK und +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Archive füllen ist Krieg.",
    "image": "soforteinsatz/B880.jpg",
    "max_copies": 1,
    "collector": "B880",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_stillheim_zaun_886",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Stillheim-Zaun",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen Abschnitt. Gegnerische Einheiten dort haben −1 ATK. Eine eigene Einheit hat +3 DEF bis zum Ende des Zuges. Gegner legt 1 Karte ab.",
    "effects": [],
    "flavor": "Preis bleibt.",
    "image": "soforteinsatz/B886.jpg",
    "max_copies": 1,
    "collector": "B886",
    "rarity": "silver"
  },
  {
    "id": "dc_b_grenzversion_890",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Grenzversion",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit hat +3 ATK bis zum Ende des Zuges. Wenn sie Schaden verursacht: Gegner legt 1 Karte ab.",
    "effects": [],
    "flavor": "Echte Toten. Echte Version.",
    "image": "soforteinsatz/B890.jpg",
    "max_copies": 1,
    "collector": "B890",
    "rarity": "silver"
  },
  {
    "id": "dc_b_abriegelbefehl_893",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Abriegelbefehl",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen leeren Abschnitt und einen angrenzenden. Bis zum Ende des Zuges: Einrücken in den leeren verursacht 1 Schaden. Eigene Einheiten im angrenzenden +1 DEF.",
    "effects": [],
    "flavor": "Sperren ohne Glauben.",
    "image": "soforteinsatz/B893.jpg",
    "max_copies": 1,
    "collector": "B893",
    "rarity": "silver"
  },
  {
    "id": "dc_b_verzoegerte_wahrheit_894",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Verzögerte Wahrheit",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Der Gegner muss 1 Karte abwerfen, bevor er in diesem Zug seine nächste Einheit ausspielen darf. Eine eigene Einheit +2 DEF.",
    "effects": [],
    "flavor": "Wahrheit als Zug.",
    "image": "soforteinsatz/B894.jpg",
    "max_copies": 1,
    "collector": "B894",
    "rarity": "silver"
  },
  {
    "id": "dc_b_systemantwort_896",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Systemantwort",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Gegner legt 2 Karten ab. Bis zu zwei eigene Einheiten haben +2 ATK und +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Das Spiel stockt nicht.",
    "image": "soforteinsatz/B896.jpg",
    "max_copies": 1,
    "collector": "B896",
    "rarity": "gold"
  },
  {
    "id": "dc_b_scheinschwerpunkt_899",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Scheinschwerpunkt",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Am Ende deines Zuges: +1 DEF auf einen Abschnitt. Am Beginn deines nächsten Zuges darfst du stattdessen +2 ATK auf einen anderen Abschnitt legen (eigene Einheiten dort). Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Verlagerung ist der Zug.",
    "image": "soforteinsatz/B899.jpg",
    "max_copies": 1,
    "collector": "B899",
    "rarity": "gold"
  },
  {
    "id": "dc_b_abriegeln_900",
    "set": "set_nations",
    "nation": "Vesper",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Abriegeln",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle einen leeren Abschnitt. Bis zum Ende deines nächsten Zuges: eine Einheit, die dort einrückt, erleidet 2 Schaden. Eigene Artillerie und Einheiten in angrenzenden Abschnitten +1 DEF.",
    "effects": [],
    "flavor": "Leer. Tödlich. Gültig.",
    "image": "soforteinsatz/B900.jpg",
    "max_copies": 1,
    "collector": "B900",
    "rarity": "gold"
  },
  {
    "id": "dc_b_namen_nennen_914",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Namen nennen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Einheit. Der nächste Angriff gegen sie hat +1 ATK. Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Ziel ist ein Name.",
    "image": "soforteinsatz/B914.jpg",
    "max_copies": 1,
    "collector": "B914",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_faelligkeit_915",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Fälligkeit",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine gegnerische Einheit hat −1 DEF bis zum Ende des Zuges. Eine eigene Einheit hat +1 ATK.",
    "effects": [],
    "flavor": "Datum entscheidet.",
    "image": "soforteinsatz/B915.jpg",
    "max_copies": 1,
    "collector": "B915",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_aufruf_vorbereiten_921",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Aufruf vorbereiten",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Nimm eine eigene Einheit auf die Hand zurück. Eine andere eigene Einheit hat +1 ATK bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Zeile noch nicht gesetzt.",
    "image": "soforteinsatz/B921.jpg",
    "max_copies": 1,
    "collector": "B921",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_frueheres_datum_923",
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
    "text": "Eine eigene Einheit hat +2 ATK bis zum Ende des Zuges. Du legst 1 Karte ab.",
    "effects": [],
    "flavor": "Zwei Pflichten: die ältere.",
    "image": "soforteinsatz/B923.jpg",
    "max_copies": 1,
    "collector": "B923",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_verweigerung_nicht_924",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Verweigerung nicht",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Einheit. Sie hat −1 ATK und −1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Fälligkeit nicht verweigern.",
    "image": "soforteinsatz/B924.jpg",
    "max_copies": 1,
    "collector": "B924",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_zeile_setzen_929",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Zeile setzen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit hat +1 ATK und +1 DEF bis zum Ende des Zuges. Ziehe 1 Karte, dann lege 1 ab.",
    "effects": [],
    "flavor": "Schreiberin Kal.",
    "image": "soforteinsatz/B929.jpg",
    "max_copies": 1,
    "collector": "B929",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_gegenleistung_staat_933",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Gegenleistung Staat",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Bis zum Ende des Zuges: eigene Einheiten in einem Abschnitt haben +1 DEF. Eine davon hat +1 ATK. Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Der Familie den Menschen.",
    "image": "soforteinsatz/B933.jpg",
    "max_copies": 1,
    "collector": "B933",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_datum_pruefen_936",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Datum prüfen",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Ziehe 1 Karte. Der Gegner legt 1 Karte ab. Eine eigene Einheit +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Abschrift gegen Vorlesung.",
    "image": "soforteinsatz/B936.jpg",
    "max_copies": 1,
    "collector": "B936",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_buch_tragen_940",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Buch tragen",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Lege bis zu 2 Karten ab: für jede abgelegte erhält eine eigene Einheit +1 ATK und +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Ohne Buch gilt nichts.",
    "image": "soforteinsatz/B940.jpg",
    "max_copies": 1,
    "collector": "B940",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_aufruf_des_kaders_946",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Aufruf des Kaders",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle eine gegnerische Einheit. Der nächste Angriff gegen sie hat +2 ATK. Eine eigene Einheit hat +2 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Tat. Häuser. Material. Tag.",
    "image": "soforteinsatz/B946.jpg",
    "max_copies": 1,
    "collector": "B946",
    "rarity": "silver"
  },
  {
    "id": "dc_b_erstes_blut_950",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Erstes Blut",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit hat +3 ATK bis zum Ende des Zuges. Wenn sie Schaden verursacht: +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Erster Schaden am Ziel.",
    "image": "soforteinsatz/B950.jpg",
    "max_copies": 1,
    "collector": "B950",
    "rarity": "silver"
  },
  {
    "id": "dc_b_feld_ohne_nachstoss_953",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Feld ohne Nachstoß",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Nachdem eine eigene Einheit ein Ziel zerstört hat: sie hat +2 ATK bis zum Ende deines nächsten Zuges. Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Zeile zu. Häuser nach Hause.",
    "image": "soforteinsatz/B953.jpg",
    "max_copies": 1,
    "collector": "B953",
    "rarity": "silver"
  },
  {
    "id": "dc_b_verbotene_vergebung_954",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Verbotene Vergebung",
    "ap": 2,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Der Gegner legt 1 Karte ab. Eine eigene Einheit +2 DEF. Du darfst 1 Karte ablegen, um +1 ATK auf dieselbe Einheit zu legen.",
    "effects": [],
    "flavor": "Frieden streicht nicht.",
    "image": "soforteinsatz/B954.jpg",
    "max_copies": 1,
    "collector": "B954",
    "rarity": "silver"
  },
  {
    "id": "dc_b_buchkrieg_956",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Buchkrieg",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Zerstöre bis zu eine eigene Einheit: ziehe 2 Karten. Bis zu zwei eigene Einheiten haben +2 ATK und +1 DEF bis zum Ende des Zuges.",
    "effects": [],
    "flavor": "Namen waschen. Zeile setzen.",
    "image": "soforteinsatz/B956.jpg",
    "max_copies": 1,
    "collector": "B956",
    "rarity": "gold"
  },
  {
    "id": "dc_b_zielangriff_959",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Zielangriff",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Wähle ein gegnerisches Ziel. Der erste Angriff, der diesem Ziel Schaden zufügt, hat +2 ATK. Die angreifende Einheit hat +1 DEF. Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Erster Schaden. Mehr Kraft.",
    "image": "soforteinsatz/B959.jpg",
    "max_copies": 1,
    "collector": "B959",
    "rarity": "gold"
  },
  {
    "id": "dc_b_abschluss_960",
    "set": "set_nations",
    "nation": "Dargan",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Abschluss",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Eine eigene Einheit, die in diesem Zug ein gegnerisches Ziel zerstört hat oder als Nächstes zerstört, hat bis zum Ende deines nächsten Zuges +2 ATK. Ziehe 1 Karte.",
    "effects": [],
    "flavor": "Zerstört. Noch ein Zug.",
    "image": "soforteinsatz/B960.jpg",
    "max_copies": 1,
    "collector": "B960",
    "rarity": "gold"
  },
  {
    "id": "dc_b_weiter_397",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Weiter",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Eine beschädigte eigene Einheit +2 ATK bis Zugende.",
    "effects": [],
    "flavor": "Nicht stehenbleiben.",
    "image": "soforteinsatz/B397.jpg",
    "max_copies": 1,
    "collector": "B397",
    "rarity": "bronze"
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
    "text": "Eine eigene Einheit erleidet 1 Schaden und hat +2 ATK bis Zugende.",
    "effects": [],
    "flavor": "Schmerz als Zündung.",
    "image": "soforteinsatz/B398.jpg",
    "max_copies": 1,
    "collector": "B398",
    "rarity": "bronze"
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
    "text": "Eine eigene Infanterie greift in diesem Zug ein zweites Mal mit -1 ATK.",
    "effects": [],
    "flavor": "Der erste Stoß reicht selten.",
    "image": "soforteinsatz/B399.jpg",
    "max_copies": 1,
    "collector": "B399",
    "rarity": "bronze"
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
    "text": "Heile 2 DEF an einer beschädigten eigenen Einheit; sie hat -1 ATK bis Zugende.",
    "effects": [],
    "flavor": "Stoppen, nicht heilen.",
    "image": "soforteinsatz/B400.jpg",
    "max_copies": 1,
    "collector": "B400",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_durchbruch_401",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Durchbruch",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Füge einer gegnerischen Einheit 2 Schaden zu; eine eigene Einheit im selben Abschnitt erleidet 1 Schaden.",
    "effects": [],
    "flavor": "Öffnen kostet eigene Substanz.",
    "image": "soforteinsatz/B401.jpg",
    "max_copies": 1,
    "collector": "B401",
    "rarity": "bronze"
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
    "text": "Eine eigene Einheit +1 ATK und +1 DEF bis Zugende; erleidet zu Zugende 1 Schaden.",
    "effects": [],
    "flavor": "Eingesetzt ohne Narkose.",
    "image": "soforteinsatz/B402.jpg",
    "max_copies": 1,
    "collector": "B402",
    "rarity": "bronze"
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
    "text": "Ziehe 2. Eine eigene Einheit erleidet 1 Schaden.",
    "effects": [],
    "flavor": "Daten gegen Gewebe.",
    "image": "soforteinsatz/B403.jpg",
    "max_copies": 1,
    "collector": "B403",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_offene_wunde_404",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Offene Wunde",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Eine beschädigte eigene Einheit +1 ATK und +1 DEF bis Zugende.",
    "effects": [],
    "flavor": "Offen halten. Nutzen.",
    "image": "soforteinsatz/B404.jpg",
    "max_copies": 1,
    "collector": "B404",
    "rarity": "bronze"
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
    "text": "Zwei eigene Einheiten im selben Abschnitt je +1 ATK; eine davon erleidet 1 Schaden.",
    "effects": [],
    "flavor": "Gleicher Stoß. Ungleiche Last.",
    "image": "soforteinsatz/B405.jpg",
    "max_copies": 1,
    "collector": "B405",
    "rarity": "silver"
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
    "text": "Heile 1 DEF an einer Einheit und füge einer anderen eigenen Einheit 1 Schaden zu.",
    "effects": [],
    "flavor": "Umverteilung.",
    "image": "soforteinsatz/B406.jpg",
    "max_copies": 1,
    "collector": "B406",
    "rarity": "silver"
  },
  {
    "id": "dc_b_stosstrupp_419",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Stoßtrupp",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine eigene Einheit. Sie hat +3 ATK bis Zugende und erleidet 2 Schaden.",
    "effects": [],
    "flavor": "Der eine Stoß.",
    "image": "soforteinsatz/B419.jpg",
    "max_copies": 1,
    "collector": "B419",
    "rarity": "gold"
  },
  {
    "id": "dc_b_weiterkaempfen_420",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Weiterkämpfen",
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Eine beschädigte eigene Einheit hat +2 ATK und +1 DEF bis Zugende und kann in diesem Zug erneut angreifen.",
    "effects": [],
    "flavor": "Weitermachen, wenn es blutet.",
    "image": "soforteinsatz/B420.jpg",
    "max_copies": 1,
    "collector": "B420",
    "rarity": "gold"
  },
  {
    "id": "dc_b_marschbefehl_121",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Marschbefehl",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Ziehe eine Infanterie. Du darfst sie in diesem Zug spielen.",
    "effects": [],
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
    "name": "Blutzeuge",
    "ap": 2,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Opfere eine eigene Infanterie. Eine gegnerische Einheit im Abschnitt erleidet 3 Schaden.",
    "effects": [],
    "flavor": "Das Opfer ist erlaubt. Nicht immer nötig.",
    "image": "soforteinsatz/B122.jpg",
    "max_copies": 1,
    "collector": "B122",
    "rarity": "silver"
  },
  {
    "id": "dc_b_sammelruf_123",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Sammelruf",
    "ap": 1,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Eine eigene Infanterie hat +2 ATK bis Zugende.",
    "effects": [],
    "flavor": "Der Ruf trägt weiter als der Schuss.",
    "image": "soforteinsatz/B123.jpg",
    "max_copies": 1,
    "collector": "B123",
    "rarity": "bronze"
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
    "effects": [],
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
    "text": "Eigene Infanterie im Abschnitt hat +1 ATK bis Zugende.",
    "effects": [],
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
    "effects": [],
    "flavor": "Der Tisch bleibt. Der Ritus nimmt.",
    "image": "soforteinsatz/B126.jpg",
    "max_copies": 1,
    "collector": "B126",
    "rarity": "bronze"
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
    "text": "Wähle eine eigene Infanterie: +3 ATK bis Zugende. Danach 1 Schaden an ihr.",
    "effects": [],
    "flavor": "Der eine Schlag.",
    "image": "soforteinsatz/B127.jpg",
    "max_copies": 1,
    "collector": "B127",
    "rarity": "silver"
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
    "text": "Jede eigene Infanterie im Abschnitt hat +1 ATK bis Zugende.",
    "effects": [],
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
    "effects": [],
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
    "ap": 3,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Zerstöre eine eigene Infanterie: andere eigene Einheiten im Abschnitt +2 ATK bis Zugende.",
    "effects": [],
    "flavor": "Der Name trägt die anderen.",
    "image": "soforteinsatz/B130.jpg",
    "max_copies": 1,
    "collector": "B130",
    "rarity": "gold"
  },
  {
    "id": "dc_b_breites_aufgebot_143",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Breites Aufgebot",
    "ap": 0,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Eigene Infanterie kostet 1 AP weniger zum Ausspielen, mindestens 1. Eigene Infanterie hat +1 DEF.",
    "effects": [],
    "flavor": "Doktrin: Das Land stellt die Breite.",
    "image": "soforteinsatz/B143.jpg",
    "max_copies": 1,
    "collector": "B143",
    "rarity": "gold"
  },
  {
    "id": "dc_b_sturmangriff_144",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "",
    "name": "Sturmangriff",
    "ap": 0,
    "atk": null,
    "def": null,
    "verdeckt_ok": false,
    "tags": [
      "soforteinsatz"
    ],
    "text": "Wähle eine eigene Infanterie. Sie hat in diesem Zug +2 ATK.",
    "effects": [],
    "flavor": "Doktrin: Der eine Schlag.",
    "image": "soforteinsatz/B144.jpg",
    "max_copies": 1,
    "collector": "B144",
    "rarity": "gold"
  },
  {
    "id": "dc_b_nachschubstoss_162",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Nachschubstoß",
    "ap": 1,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Heile 2 an Panzer oder Artillerie.",
    "effects": [],
    "flavor": "Was fehlt, wird gefahren.",
    "image": "soforteinsatz/B162.jpg",
    "max_copies": 1,
    "collector": "B162",
    "rarity": "bronze"
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
    "text": "Eigene Artillerie +2 ATK diesen Zug.",
    "effects": [],
    "flavor": "Regen, der bezahlt wurde.",
    "image": "soforteinsatz/B163.jpg",
    "max_copies": 1,
    "collector": "B163",
    "rarity": "bronze"
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
    "text": "Panzer: +1 DEF und 1 heilen.",
    "effects": [],
    "flavor": "Neue Kette, alte Front.",
    "image": "soforteinsatz/B164.jpg",
    "max_copies": 1,
    "collector": "B164",
    "rarity": "bronze"
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
    "text": "Ziehe 1; Ausrüstung kostet 1 weniger diesen Zug.",
    "effects": [],
    "flavor": "Die Bestellung war schon unterwegs.",
    "image": "soforteinsatz/B165.jpg",
    "max_copies": 1,
    "collector": "B165",
    "rarity": "bronze"
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
    "text": "Zwei Feinde je 1 Schaden.",
    "effects": [],
    "flavor": "Flächig — wie die Walze.",
    "image": "soforteinsatz/B166.jpg",
    "max_copies": 1,
    "collector": "B166",
    "rarity": "silver"
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
    "text": "Ziehe 1; Einheit kostet 1 weniger diesen Zug.",
    "effects": [],
    "flavor": "Alarm heißt Produktion, nicht Panik.",
    "image": "soforteinsatz/B167.jpg",
    "max_copies": 1,
    "collector": "B167",
    "rarity": "bronze"
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
    "text": "Feind −2 ATK bis Zugende.",
    "effects": [],
    "flavor": "Druck auf die andere Bilanz.",
    "image": "soforteinsatz/B168.jpg",
    "max_copies": 1,
    "collector": "B168",
    "rarity": "bronze"
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
    "text": "Zerstöre Feind mit ≤2 DEF.",
    "effects": [],
    "flavor": "Was zu leicht steht, wird abgeschrieben.",
    "image": "soforteinsatz/B169.jpg",
    "max_copies": 1,
    "collector": "B169",
    "rarity": "silver"
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
    "text": "Eigene Artillerie greift sofort an.",
    "effects": [],
    "flavor": "Kein Warten auf das Ministerium.",
    "image": "soforteinsatz/B170.jpg",
    "max_copies": 1,
    "collector": "B170",
    "rarity": "bronze"
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
    "effects": [],
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
    "name": "Feuerwalze",
    "ap": 4,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Allen Feinden 1 Schaden; Artillerie +1 ATK.",
    "effects": [],
    "flavor": "Anhaltend. Munitionsintensiv. Geschäft.",
    "image": "soforteinsatz/B172.jpg",
    "max_copies": 1,
    "collector": "B172",
    "rarity": "gold"
  },
  {
    "id": "dc_b_materialersatz_173",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Soforteinsatz",
    "klasse": "Soforteinsatz",
    "name": "Materialersatz",
    "ap": 3,
    "atk": 0,
    "def": 0,
    "verdeckt_ok": false,
    "tags": [
      "einsatz"
    ],
    "text": "Heile alle Panzer und Artillerie um 1. Ziehe 1.",
    "effects": [],
    "flavor": "Rohre und Ketten bleiben im Spiel.",
    "image": "soforteinsatz/B173.jpg",
    "max_copies": 1,
    "collector": "B173",
    "rarity": "gold"
  }
];
