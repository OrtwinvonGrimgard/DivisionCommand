window.DC_SET_ALPHA = window.DC_SET_ALPHA || {};
window.DC_SET_ALPHA["Soforteinsatz"] = [
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
    "image": "Armageddon.jpg",
    "max_copies": 2
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
    "image": "Blinder Gehorsam.jpg",
    "max_copies": 2
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
    "image": "Boden-Luft-Rakete.jpg",
    "max_copies": 2
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
    "image": "Dammbruch.jpg",
    "max_copies": 2
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
    "image": "Der Letzte der steht.jpg",
    "max_copies": 2
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
    "image": "Duckung suchen.jpg",
    "max_copies": 2
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
    "image": "Eingriff der Kavallerie.jpg",
    "max_copies": 2
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
    "image": "Einsame Gassen.jpg",
    "max_copies": 2
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
    "image": "Geist in den Trümmern.jpg",
    "max_copies": 2
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
    "image": "Geistiger Vorsprung.jpg",
    "max_copies": 2
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
    "image": "Generalmobilmachung.jpg",
    "max_copies": 2
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
    "image": "Glatter Durchschuss.jpg",
    "max_copies": 2
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
    "image": "Instandsetzung.jpg",
    "max_copies": 2
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
    "image": "Lagebesprechung.jpg",
    "max_copies": 2
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
    "image": "Luftschlag.jpg",
    "max_copies": 2
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
    "image": "Martyrium.jpg",
    "max_copies": 2
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
    "image": "Militärische Ehren.jpg",
    "max_copies": 2
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
    "image": "Minenfeld.jpg",
    "max_copies": 2
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
    "image": "Mobilisierung.jpg",
    "max_copies": 2
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
    "image": "Munitionstreffer.jpg",
    "max_copies": 2
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
    "image": "Napalm.jpg",
    "max_copies": 2
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
    "image": "Pause.jpg",
    "max_copies": 2
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
    "image": "Psychologie der Massen.jpg",
    "max_copies": 2
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
    "image": "Raeumkommando.jpg",
    "max_copies": 2
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
    "image": "Religioeser Eifer.jpg",
    "max_copies": 2
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
    "image": "Selbstopfer.jpg",
    "max_copies": 2
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
    "image": "Silberner Engel.jpg",
    "max_copies": 2
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
    "image": "Standgericht.jpg",
    "max_copies": 2
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
    "image": "Standhafte Formation.jpg",
    "max_copies": 2
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
    "image": "Strahlung.jpg",
    "max_copies": 2
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
    "image": "Verpflegung.jpg",
    "max_copies": 2
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
    "image": "Waffenlieferung.jpg",
    "max_copies": 2
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
    "image": "Widerstand.jpg",
    "max_copies": 2
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
    "image": "Wille des Volkes.jpg",
    "max_copies": 2
  }
];
