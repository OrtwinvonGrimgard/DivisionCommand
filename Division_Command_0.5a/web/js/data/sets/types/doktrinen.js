window.DC_SET_TYPES = window.DC_SET_TYPES || {};
window.DC_SET_TYPES["Doktrin"] = [
  {
    "id": "dc_dok_abloesung",
    "set": "set_alpha",
    "nummer": "A006",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Ablösung",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Einmal pro Zug: Wird eine eigene Einheit zerstört, kostet die nächste Einheit in denselben Abschnitt 1 AP weniger (min. 1). Kein DEF-Bonus — die Krone ersetzt, der Erbe trägt das Risiko.",
    "clauses": [
      {
        "title": "",
        "body": "Einmal pro Zug: Wird eine eigene Einheit zerstört, kostet die nächste Einheit in denselben Abschnitt 1 AP weniger (min. 1). Kein DEF-Bonus — die Krone ersetzt, der Erbe trägt das Risiko."
      }
    ],
    "effects": [
      {
        "code": "ABLOESUNG",
        "param": {
          "when": "own-unit-destroyed",
          "play": "hand-to-same-section",
          "play_ap": -1,
          "def": 0,
          "once_per_turn": true
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Abloesung-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_abnutzung",
    "set": "set_alpha",
    "nummer": "A031",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Abnutzung",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Zerstörst du eine gegnerische Fronteinheit, hat dieser Abschnitt bis Zugende +1 ATK und du ziehst 1 Karte — Druck ohne Verband.",
    "clauses": [
      {
        "title": "",
        "body": "Zerstörst du eine gegnerische Fronteinheit, hat dieser Abschnitt bis Zugende +1 ATK und du ziehst 1 Karte — Druck ohne Verband."
      }
    ],
    "effects": [
      {
        "code": "ABNUTZUNG",
        "param": {
          "on_destroy_in_section": {
            "section_atk": 1,
            "heal": 0,
            "draw": 1,
            "until": "end-of-turn"
          }
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Abnutzung-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_abriegeln",
    "set": "set_alpha",
    "nummer": "A012",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Abriegeln",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Eigene Artillerie hat +1 ATK. Gegen Abschnitte mit höchstens einer Feindeinheit hat sie zusätzlich +1 ATK.",
    "clauses": [
      {
        "title": "",
        "body": "Eigene Artillerie hat +1 ATK. Gegen Abschnitte mit höchstens einer Feindeinheit hat sie zusätzlich +1 ATK."
      }
    ],
    "effects": [
      {
        "code": "ABRIEGELN",
        "param": {
          "thin_atk": 1,
          "thin_max": 1,
          "who": "artillerie",
          "base_arty_atk": 1
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Abriegeln-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_abschluss",
    "set": "set_alpha",
    "nummer": "A028",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Abschluss",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Zerstört eine eigene Einheit ein Ziel, hat sie +1 ATK bis Ende deines nächsten Zuges und du ziehst 1.",
    "clauses": [
      {
        "title": "",
        "body": "Zerstört eine eigene Einheit ein Ziel, hat sie +1 ATK bis Ende deines nächsten Zuges und du ziehst 1."
      }
    ],
    "effects": [
      {
        "code": "ABSCHLUSS",
        "param": {
          "on": "destroyed-enemy",
          "atk": 1,
          "draw": 1,
          "until": "end-of-next-own-turn"
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Abschluss-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_auffangen",
    "set": "set_alpha",
    "nummer": "A003",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Auffangen",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Eigene Einheiten haben +1 DEF. Hat der Gegner mehr Einheiten im Abschnitt, zusätzlich +1 DEF. Bei Gleichstand +1 ATK.",
    "clauses": [
      {
        "title": "",
        "body": "Eigene Einheiten haben +1 DEF. Hat der Gegner mehr Einheiten im Abschnitt, zusätzlich +1 DEF. Bei Gleichstand +1 ATK."
      }
    ],
    "effects": [
      {
        "code": "AUFFANGEN",
        "param": {
          "def": 1,
          "base_def": 1,
          "equal_atk": 1
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Auffangen-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_aufklaerungsschlag",
    "set": "set_alpha",
    "nummer": "A007",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Aufklärungsschlag",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Eigene Angriffe gegen aufgedeckte Feinde haben +1 ATK — wer gesehen wird, wird getroffen.",
    "clauses": [
      {
        "title": "",
        "body": "Eigene Angriffe gegen aufgedeckte Feinde haben +1 ATK — wer gesehen wird, wird getroffen."
      }
    ],
    "effects": [
      {
        "code": "AUFKLAERUNGSSCHLAG",
        "param": {
          "against": "revealed",
          "atk": 1,
          "once_per_turn": false
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Aufklaerungsschlag-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_ausharren",
    "set": "set_alpha",
    "nummer": "A026",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Ausharren",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Eigene Einheiten in einem Abschnitt ohne Unterstützung haben +1 DEF und +1 ATK — ausharren heißt auch zubeißen.",
    "clauses": [
      {
        "title": "",
        "body": "Eigene Einheiten in einem Abschnitt ohne Unterstützung haben +1 DEF und +1 ATK — ausharren heißt auch zubeißen."
      }
    ],
    "effects": [
      {
        "code": "AUSHARREN",
        "param": {
          "if": "no-support-in-section",
          "atk": 1,
          "def": 1
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Ausharren-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_auswertung",
    "set": "set_alpha",
    "nummer": "A010",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Auswertung",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Erleidet eine eigene Einheit Schaden und überlebt, hat sie bis zum Ende dieses Zuges +1 ATK (nicht stapelbar). Zeit wird zur Waffe — knapp bemessen.",
    "clauses": [
      {
        "title": "",
        "body": "Erleidet eine eigene Einheit Schaden und überlebt, hat sie bis zum Ende dieses Zuges +1 ATK (nicht stapelbar). Zeit wird zur Waffe — knapp bemessen."
      }
    ],
    "effects": [
      {
        "code": "AUSWERTUNG",
        "param": {
          "when": "damaged-not-destroyed",
          "atk": 1,
          "until": "end-of-turn",
          "no_stack": true
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Auswertung-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_blitzkrieg",
    "set": "set_alpha",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Blitzkrieg",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Panzertruppen erhalten +1 Angriff in dem Zug, in dem sie in die Frontlinie gespielt werden. Sonderfähigkeiten gegnerischer Unterstützungskarten können in der ersten Runde nach Ausspielung einer Panzerkarte nicht aktiviert werden.",
    "effects": [
      {
        "code": "BLITZ_SUMMON_ATK",
        "param": {
          "tags": [
            "panzer"
          ],
          "atk": 1
        }
      },
      {
        "code": "BLITZ_LOCK_SUPPORT",
        "param": {
          "tag": "panzer",
          "on": "reveal-next-turn"
        }
      }
    ],
    "flavor": "Überwältige. Erdrücke. Breche ihren Willen im ersten Schlag.",
    "image": "doktrinen/Blitzkrieg-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_bollwerk",
    "set": "set_alpha",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Bollwerk",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Befestigungsanlagen +1 auf ihre Effekte. Einheiten hinter einer Befestigung +1 Angriff. Schutzwall (2 AP): eine Befestigung aus dem Ablagestapel auf die Hand.",
    "effects": [
      {
        "code": "BOLLWERK_TOKEN_PLUS",
        "param": {
          "delta": 1
        }
      },
      {
        "code": "BOLLWERK_COVER_ATK",
        "param": {
          "atk": 1
        }
      },
      {
        "code": "SCHUTZWALL",
        "param": {
          "ap": 2,
          "once_per_round": true
        }
      }
    ],
    "flavor": "Stacheldraht und Mauerwerk. Mit genug Zement gewinnt man jeden Krieg.",
    "image": "doktrinen/Bollwerk-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_breites_aufgebot",
    "set": "set_alpha",
    "nummer": "A017",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Breites Aufgebot",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Eigene Infanterie kostet 1 AP weniger zum Ausspielen (min. 1) und hat beim Einrücken +1 DEF.",
    "clauses": [
      {
        "title": "",
        "body": "Eigene Infanterie kostet 1 AP weniger zum Ausspielen (min. 1) und hat beim Einrücken +1 DEF."
      }
    ],
    "effects": [
      {
        "code": "BREITES_AUFGEBOT",
        "param": {
          "who": "infanterie",
          "play_cost": -1,
          "min": 1,
          "def": 1
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Breites-Aufgebot-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_entsatz",
    "set": "set_alpha",
    "nummer": "A024",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Entsatz",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Einheiten in Abschnitten, die im letzten Zug angegriffen wurden, haben +1 ATK und +1 DEF. Einrücken in solche Abschnitte gibt denselben Bonus bis Zugende.",
    "clauses": [
      {
        "title": "",
        "body": "Einheiten in Abschnitten, die im letzten Zug angegriffen wurden, haben +1 ATK und +1 DEF. Einrücken in solche Abschnitte gibt denselben Bonus bis Zugende."
      }
    ],
    "effects": [
      {
        "code": "ENTSATZ",
        "param": {
          "if": "section-attacked-last-turn",
          "on_enter": {
            "atk": 1,
            "def": 1
          },
          "held_def": 1,
          "held_atk": 1
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Entsatz-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_etappensicherung",
    "set": "set_alpha",
    "nummer": "A015",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Etappensicherung",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "principle": "Zu Beginn deines Zuges",
    "text": "Eigene Einheiten haben +1 DEF. Die Etappe hält — ohne automatische Versorgungsheilung.",
    "clauses": [
      {
        "title": "",
        "body": "Eigene Einheiten haben +1 DEF. Die Etappe hält — ohne automatische Versorgungsheilung."
      }
    ],
    "effects": [
      {
        "code": "ETAPPENSICHERUNG",
        "param": {
          "base_def": 1
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Etappensicherung-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_feuerplan",
    "set": "set_alpha",
    "nummer": "A001",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Feuerplan",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "principle": "Passiv — 1× pro Zug",
    "text": "Eigene Angriffe gegen aufgedeckte Feinde richten +1 Schaden an (1× pro Zug).",
    "clauses": [
      {
        "title": "",
        "body": "Eigene Angriffe gegen aufgedeckte Feinde richten +1 Schaden an (1× pro Zug)."
      }
    ],
    "effects": [
      {
        "code": "AUFKLAERUNGSSCHLAG",
        "param": {
          "against": "revealed",
          "atk": 1,
          "once_per_turn": true
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Feuerplan-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_feuerwalze",
    "set": "set_alpha",
    "nummer": "A019",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Feuerwalze",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Eigene Artillerie hat +1 ATK. Feuert sie, haben die anderen eigenen Einheiten in ihrem Abschnitt bis Zugende +1 ATK — die Rohre selbst bleiben kalt.",
    "clauses": [
      {
        "title": "",
        "body": "Eigene Artillerie hat +1 ATK. Feuert sie, haben die anderen eigenen Einheiten in ihrem Abschnitt bis Zugende +1 ATK — die Rohre selbst bleiben kalt."
      }
    ],
    "effects": [
      {
        "code": "FEUERWALZE",
        "param": {
          "artillerie_atk": 1,
          "on_shell": {
            "who": "own-units-in-section",
            "atk": 1,
            "include_self": false
          }
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Feuerwalze-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_gegenstoss",
    "set": "set_alpha",
    "nummer": "A004",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Gegenstoß",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Wurde ein eigener Abschnitt angegriffen, haben Einheiten dort bis zum Ende deines nächsten Zuges +1 ATK. Überlebt die angegriffene Einheit, heilt sie 1.",
    "clauses": [
      {
        "title": "",
        "body": "Wurde ein eigener Abschnitt angegriffen, haben Einheiten dort bis zum Ende deines nächsten Zuges +1 ATK. Überlebt die angegriffene Einheit, heilt sie 1."
      }
    ],
    "effects": [
      {
        "code": "GEGENSTOSS",
        "param": {
          "when": "attacked-this-turn",
          "atk": 1,
          "heal_survivor": 1,
          "until": "end-of-next-own-turn"
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Gegenstoss-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_gepanzerter_fuss",
    "set": "set_alpha",
    "nummer": "A032",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Gepanzerter Fuß",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Eigene Einheiten haben +1 DEF. Ausgerüstete Einheiten haben +1 ATK und +1 DEF zusätzlich.",
    "clauses": [
      {
        "title": "",
        "body": "Eigene Einheiten haben +1 DEF. Ausgerüstete Einheiten haben +1 ATK und +1 DEF zusätzlich."
      }
    ],
    "effects": [
      {
        "code": "GEPANZERTER_FUSS",
        "param": {
          "if": "equipped",
          "def": 1,
          "atk": 1,
          "base_def": 1
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Gepanzerter-Fuss-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_lauer",
    "set": "set_alpha",
    "nummer": "A029",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Lauer",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "principle": "Am Ende deines Zuges",
    "text": "Eigene Einheiten, die im letzten Zug nicht angegriffen haben, haben +1 ATK — wer wartet, schlägt einmal; der Eid zählt Totenköpfe strenger.",
    "clauses": [
      {
        "title": "",
        "body": "Eigene Einheiten, die im letzten Zug nicht angegriffen haben, haben +1 ATK — wer wartet, schlägt einmal; der Eid zählt Totenköpfe strenger."
      }
    ],
    "effects": [
      {
        "code": "LAUER",
        "param": {
          "rested": {
            "atk": 1
          }
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Lauer-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_linienkrieg",
    "set": "set_alpha",
    "nummer": "A021",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Linienkrieg",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Eigene Einheiten haben +1 DEF. Stehen mindestens zwei eigene in einem Abschnitt, zusätzlich +1 DEF. Der Fluss hält die Linie.",
    "clauses": [
      {
        "title": "",
        "body": "Eigene Einheiten haben +1 DEF. Stehen mindestens zwei eigene in einem Abschnitt, zusätzlich +1 DEF. Der Fluss hält die Linie."
      }
    ],
    "effects": [
      {
        "code": "LINIENKRIEG",
        "param": {
          "if": "section-has-at-least",
          "count": 2,
          "base_def": 1,
          "def": 1
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Linienkrieg-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_lokalisierung",
    "set": "set_alpha",
    "nummer": "A008",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Lokalisierung",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Eigene Angriffe gegen aufgedeckte Feinde richten +1 Schaden an.",
    "clauses": [
      {
        "title": "",
        "body": "Eigene Angriffe gegen aufgedeckte Feinde richten +1 Schaden an."
      }
    ],
    "effects": [
      {
        "code": "LOKALISIERUNG",
        "param": {
          "against": "revealed",
          "def": -1
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Lokalisierung-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_marsch_aus_dem_vollen",
    "set": "set_alpha",
    "nummer": "A023",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Marsch aus dem Vollen",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Einheiten kosten 1 AP weniger (min. 1), wenn Unterstützung liegt. Beim Einrücken +1 ATK und +1 DEF bis Zugende.",
    "clauses": [
      {
        "title": "",
        "body": "Einheiten kosten 1 AP weniger (min. 1), wenn Unterstützung liegt. Beim Einrücken +1 ATK und +1 DEF bis Zugende."
      }
    ],
    "effects": [
      {
        "code": "MARSCH_AUS_DEM_VOLLEN",
        "param": {
          "need": "support-in-section",
          "play_cost": -1,
          "min": 1,
          "atk": 1,
          "def": 1,
          "until": "end-of-turn"
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Marsch-aus-dem-Vollen-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_materialersatz",
    "set": "set_alpha",
    "nummer": "A020",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Materialersatz",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Panzer und Artillerie kosten 1 AP weniger (min. 1). Die Werkstatt läuft durchgehend — ohne Extra-Panzerung beim Einrücken.",
    "clauses": [
      {
        "title": "",
        "body": "Panzer und Artillerie kosten 1 AP weniger (min. 1). Die Werkstatt läuft durchgehend — ohne Extra-Panzerung beim Einrücken."
      }
    ],
    "effects": [
      {
        "code": "MATERIALERSATZ",
        "param": {
          "who": [
            "panzer",
            "geschuetze"
          ],
          "if": "always",
          "play_cost": -1,
          "min": 1
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Materialersatz-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_normverband",
    "set": "set_alpha",
    "nummer": "A002",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Normverband",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Hast du Infanterie, Panzer und Artillerie an der Front, haben alle eigenen Fronteinheiten +1 ATK (kein DEF).",
    "clauses": [
      {
        "title": "",
        "body": "Hast du Infanterie, Panzer und Artillerie an der Front, haben alle eigenen Fronteinheiten +1 ATK (kein DEF)."
      }
    ],
    "effects": [
      {
        "code": "NORMVERBAND",
        "param": {
          "need": [
            "infanterie",
            "panzer",
            "artillerie"
          ],
          "scope": "own-front",
          "atk": 1,
          "def": 0
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Normverband-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_punktfeuer",
    "set": "set_alpha",
    "nummer": "A009",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Punktfeuer",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "principle": "Zu Beginn deines Zuges",
    "text": "Eigene Artillerie hat +1 ATK. Gegen unbeschädigte Ziele +1 ATK. Eigene Angriffe gegen aufgedeckte Feinde +1 Schaden.",
    "clauses": [
      {
        "title": "",
        "body": "Eigene Artillerie hat +1 ATK. Gegen unbeschädigte Ziele +1 ATK. Eigene Angriffe gegen aufgedeckte Feinde +1 Schaden."
      }
    ],
    "effects": [
      {
        "code": "PUNKTFEUER",
        "param": {
          "who": "artillerie",
          "vs_undamaged": true,
          "atk": 1,
          "base_arty_atk": 1
        }
      },
      {
        "code": "LOKALISIERUNG",
        "param": {
          "against": "revealed",
          "def": -1
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Punktfeuer-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_rasten",
    "set": "set_alpha",
    "nummer": "A016",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Rasten",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Eigene Einheiten, die im letzten Zug nicht angegriffen haben, haben +1 ATK (kein DEF).",
    "clauses": [
      {
        "title": "",
        "body": "Eigene Einheiten, die im letzten Zug nicht angegriffen haben, haben +1 ATK (kein DEF)."
      }
    ],
    "effects": [
      {
        "code": "RASTEN",
        "param": {
          "if": "did-not-attack-last-turn",
          "atk": 1
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Rasten-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_scheinschwerpunkt",
    "set": "set_alpha",
    "nummer": "A011",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Scheinschwerpunkt",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Eigene Einheiten in Abschnitten mit höchstens zwei eigenen Einheiten haben +1 DEF und +1 ATK. Das System täuscht Stärke vor.",
    "clauses": [
      {
        "title": "",
        "body": "Eigene Einheiten in Abschnitten mit höchstens zwei eigenen Einheiten haben +1 DEF und +1 ATK. Das System täuscht Stärke vor."
      }
    ],
    "effects": [
      {
        "code": "SCHEINSCHWERPUNKT",
        "param": {
          "thin_def": 1,
          "thin_atk": 1,
          "thin_max": 2
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Scheinschwerpunkt-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_schwerpunkt",
    "set": "set_alpha",
    "nummer": "A005",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Schwerpunkt",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "principle": "Zu Beginn deines Zuges",
    "text": "Zu Beginn deines Zuges: Stehen mindestens drei eigene Einheiten in einem Abschnitt, erhält der dichteste Abschnitt +1 ATK bis Zugende.",
    "clauses": [
      {
        "title": "",
        "body": "Zu Beginn deines Zuges: Stehen mindestens drei eigene Einheiten in einem Abschnitt, erhält der dichteste Abschnitt +1 ATK bis Zugende."
      }
    ],
    "effects": [
      {
        "code": "SCHWERPUNKT",
        "param": {
          "when": "start-of-turn",
          "auto": "densest",
          "atk": 1,
          "min_units": 3,
          "until": "end-of-turn"
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Schwerpunkt-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_sicherer_nachschub",
    "set": "set_alpha",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Sicherer Nachschub",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "text": "Unterstützung −1 AP, mindestens 1. 1×/Zug gepanzerte Einheit +1 V. Überschuss (2 AP): Fähigkeit einer Unterstützung ein zweites Mal.",
    "effects": [
      {
        "code": "AURA_COST_MOD",
        "param": {
          "filter": "unterstuetzung",
          "delta": -1,
          "min": 1
        }
      },
      {
        "code": "HEAL_ARMORED",
        "param": {
          "value": 1,
          "once_per_turn": true
        }
      },
      {
        "code": "UEBERSCHUSS",
        "param": {
          "ap": 2
        }
      }
    ],
    "flavor": "Wenn wir es haben, werden wir es liefern. Bis die letzte Schraube an der Front verrostet.",
    "image": "doktrinen/Sicherer Nachschub-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_stosstrupp",
    "set": "set_alpha",
    "nummer": "A013",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Stoßtrupp",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "principle": "Zu Beginn deines Zuges",
    "text": "Eigene Einheiten haben +1 ATK. Eigene Infanterie hat zusätzlich +1 ATK. Beschädigte Einheiten haben zusätzlich +1 ATK. Der Körper ist Maß und Waffe.",
    "clauses": [
      {
        "title": "",
        "body": "Eigene Einheiten haben +1 ATK. Eigene Infanterie hat zusätzlich +1 ATK. Beschädigte Einheiten haben zusätzlich +1 ATK. Der Körper ist Maß und Waffe."
      }
    ],
    "effects": [
      {
        "code": "STOSSTRUPP",
        "param": {
          "base_all_atk": 1,
          "base_inf_atk": 1,
          "damaged_atk": 1,
          "no_def_loss": true
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Stosstrupp-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_sturmangriff",
    "set": "set_alpha",
    "nummer": "A018",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Sturmangriff",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "principle": "Zu Beginn deines Zuges",
    "text": "Zu Beginn deines Zuges erhält deine stärkste Infanterie +2 ATK bis zum Ende des Zuges.",
    "clauses": [
      {
        "title": "",
        "body": "Zu Beginn deines Zuges erhält deine stärkste Infanterie +2 ATK bis zum Ende des Zuges."
      }
    ],
    "effects": [
      {
        "code": "STURMANGRIFF",
        "param": {
          "when": "start-of-turn",
          "auto": "strongest-infantry",
          "atk": 2,
          "until": "end-of-turn"
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Sturmangriff-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_tiefenverteidigung",
    "set": "set_alpha",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Tiefenverteidigung",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "text": "Infanterie und Artillerie an der Front +1 V. Je zerstörter gegnerischer Fronteinheit +1 AP im nächsten eigenen Zug. Rohrartillerie kann gegnerischen Support angreifen, wenn eigene Aufklärung an der Front steht.",
    "effects": [
      {
        "code": "AURA_STAT",
        "param": {
          "filter": "front+infanterie|artillerie",
          "def": 1
        }
      },
      {
        "code": "BLOOD_AP",
        "param": {
          "from": "enemy-front-unit"
        }
      },
      {
        "code": "SPOTTER_SUPPORT_ATK",
        "param": {
          "need": "aufklaerung",
          "who": "rohrartillerie"
        }
      }
    ],
    "flavor": "Jeder Meter Boden den sie nehmen ist gekauft mit dem Blut ihrer Jugend.",
    "image": "doktrinen/Tiefenverteidigung-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_umgehen",
    "set": "set_alpha",
    "nummer": "A022",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Umgehen",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Hast du in einem Abschnitt mehr Einheiten als der Gegner, haben sie +2 ATK — die Flanke wird zur Zange.",
    "clauses": [
      {
        "title": "",
        "body": "Hast du in einem Abschnitt mehr Einheiten als der Gegner, haben sie +2 ATK — die Flanke wird zur Zange."
      }
    ],
    "effects": [
      {
        "code": "UMGEHEN",
        "param": {
          "if": "opponent-has-fewer-units-in-section",
          "atk": 2
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Umgehen-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_verlegung",
    "set": "set_alpha",
    "nummer": "A025",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Verlegung",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Einmal pro Zug darfst du für 1 AP eine eigene Einheit um einen Slot seitlich schieben (Weg bleibt offen). Beweglichkeit statt Panzerung.",
    "clauses": [
      {
        "title": "",
        "body": "Einmal pro Zug darfst du für 1 AP eine eigene Einheit um einen Slot seitlich schieben (Weg bleibt offen). Beweglichkeit statt Panzerung."
      }
    ],
    "effects": [
      {
        "code": "VERLEGUNG",
        "param": {
          "once": "per-turn",
          "shift": 1,
          "ap": 1
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Verlegung-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_verteilte_stellung",
    "set": "set_alpha",
    "nummer": "A030",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Verteilte Stellung",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Bist du allein im Abschnitt: +1 DEF. Verstreute Posten halten, massieren nicht.",
    "clauses": [
      {
        "title": "",
        "body": "Bist du allein im Abschnitt: +1 DEF. Verstreute Posten halten, massieren nicht."
      }
    ],
    "effects": [
      {
        "code": "VERTEILTE_STELLUNG",
        "param": {
          "alone": {
            "def": 1
          }
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Verteilte-Stellung-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_weiterkaempfen",
    "set": "set_alpha",
    "nummer": "A014",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Weiterkämpfen",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Eigene beschädigte Einheiten haben +2 ATK und +1 DEF. Zerstört eine beschädigte Einheit ein Ziel, heilt sie 1 und du erhältst 1 AP (max. 1×/Zug).",
    "clauses": [
      {
        "title": "",
        "body": "Eigene beschädigte Einheiten haben +2 ATK und +1 DEF. Zerstört eine beschädigte Einheit ein Ziel, heilt sie 1 und du erhältst 1 AP (max. 1×/Zug)."
      }
    ],
    "effects": [
      {
        "code": "WEITERKAEMPFEN",
        "param": {
          "who": "damaged",
          "atk": 2,
          "def": 1,
          "heal_on_kill": 1,
          "ap_on_kill": 1,
          "until": "destroyed"
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Weiterkaempfen-Doktrin.jpg",
    "max_copies": 1
  },
  {
    "id": "dc_dok_zielangriff",
    "set": "set_alpha",
    "nummer": "A027",
    "status": "live",
    "typ": "Doktrin",
    "klasse": "",
    "name": "Zielangriff",
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "doktrin"
    ],
    "klasse_tags": [],
    "text": "Eigene Angriffe gegen beschädigte Feinde haben +1 ATK. Beim Zerstören ziehst du 1 — der Abschluss bleibt, der Stoß wird knapper.",
    "clauses": [
      {
        "title": "",
        "body": "Eigene Angriffe gegen beschädigte Feinde haben +1 ATK. Beim Zerstören ziehst du 1 — der Abschluss bleibt, der Stoß wird knapper."
      }
    ],
    "effects": [
      {
        "code": "ZIELANGRIFF",
        "param": {
          "vs_damaged_atk": 1,
          "draw_on_damaged_kill": 1
        }
      }
    ],
    "flavor": "",
    "image": "doktrinen/Zielangriff-Doktrin.jpg",
    "max_copies": 1
  }
];
