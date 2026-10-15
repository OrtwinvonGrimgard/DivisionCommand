window.DC_SET_ALPHA = window.DC_SET_ALPHA || {};
window.DC_SET_ALPHA["Doktrin"] = [
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "principle": "Wähle 1 am Ende deines Zuges.",
    "text": "Zielbeobachtung: Wähle eine feindliche Einheit. Wenn diese Einheit im Begriff ist eine Aktion auszuführen, darf eine aktive Artillerieeinheit in Reichweite zuerst mit +1 ATK angreifen. Raumüberwachung: Wähle eine gegnerische Stellung aus der Frontlinie, auch eine leere. Taucht dort eine feindliche Einheit auf, darf eine aktive Artillerieeinheit in Reichweite zuerst mit +1 ATK angreifen.",
    "clauses": [
      {"title": "", "body": "Wähle eine feindliche Einheit. Wenn diese Einheit im Begriff ist eine Aktion auszuführen, darf eine aktive Artillerieeinheit in Reichweite zuerst mit +1 ATK angreifen."},
      {"title": "", "body": "Wähle eine gegnerische Stellung aus der Frontlinie, auch eine leere. Taucht dort eine feindliche Einheit auf, darf eine aktive Artillerieeinheit in Reichweite zuerst mit +1 ATK angreifen."}
    ],
    "effects": [
      {"code": "ZIELBEOBACHTUNG", "param": {"when": "end-of-turn", "choose": 1, "target": "enemy-unit", "trigger": "about-to-act", "atk": 1, "first": true}},
      {"code": "RAUMUEBERWACHUNG", "param": {"when": "end-of-turn", "choose": 1, "target": "enemy-position", "allow_empty": true, "trigger": "unit-appears", "atk": 1, "first": true}}
    ],
    "flavor": "",
    "image": "Feuerplan-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Besitzt deine Front je eine Infanterie, einen Panzer und eine Artillerie, hat die gesamte Frontlinie +1 ATK und +1 DEF.",
    "clauses": [
      {"title": "", "body": "Besitzt deine Front je eine Infanterie, einen Panzer und eine Artillerie, hat die gesamte Frontlinie +1 ATK und +1 DEF."}
    ],
    "effects": [
      {"code": "NORMVERBAND", "param": {"need": ["infanterie", "panzer", "artillerie"], "scope": "own-front", "atk": 1, "def": 1}}
    ],
    "flavor": "",
    "image": "Normverband-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Hat der Gegner in einem Abschnitt mehr Einheiten als du, hat dieser Abschnitt +1 DEF. Ein Abschnitt sind drei Stellungen.",
    "clauses": [
      {"title": "", "body": "Hat der Gegner in einem Abschnitt mehr Einheiten als du, hat dieser Abschnitt +1 DEF. Ein Abschnitt sind drei Stellungen."}
    ],
    "effects": [
      {"code": "AUFFANGEN", "param": {"section": 3, "when": "enemy-more-units", "scope": "section", "def": 1}}
    ],
    "flavor": "",
    "image": "Auffangen-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Wurde eine eigene Einheit in diesem Zug angegriffen, hat sie +1 ATK bis zum Ende deines nächsten Zuges.",
    "clauses": [
      {"title": "", "body": "Wurde eine eigene Einheit in diesem Zug angegriffen, hat sie +1 ATK bis zum Ende deines nächsten Zuges."}
    ],
    "effects": [
      {"code": "GEGENSTOSS", "param": {"when": "attacked-this-turn", "atk": 1, "until": "end-of-next-own-turn"}}
    ],
    "flavor": "",
    "image": "Gegenstoss-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "principle": "Zu Beginn deines Zuges",
    "text": "Wähle einen Abschnitt. Einheiten in diesem Abschnitt haben +1 ATK bis zum Ende des Zuges.",
    "clauses": [
      {"title": "", "body": "Wähle einen Abschnitt. Einheiten in diesem Abschnitt haben +1 ATK bis zum Ende des Zuges."}
    ],
    "effects": [
      {"code": "SCHWERPUNKT", "param": {"when": "start-of-turn", "choose": "section", "atk": 1, "until": "end-of-turn"}}
    ],
    "flavor": "",
    "image": "Schwerpunkt-Doktrin.jpg",
    "max_copies": 1
  },
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Wird eine eigene Einheit zerstört, darfst du sofort eine Einheit aus der Hand in dieselbe Stellung spielen. Sie kostet 1 AP weniger zum Ausspielen und hat dauerhaft +1 DEF.",
    "clauses": [
      {"title": "", "body": "Wird eine eigene Einheit zerstört, darfst du sofort eine Einheit aus der Hand in dieselbe Stellung spielen. Sie kostet 1 AP weniger zum Ausspielen und hat dauerhaft +1 DEF."}
    ],
    "effects": [
      {"code": "ABLOESUNG", "param": {"when": "own-unit-destroyed", "play": "hand-to-same-stellung", "play_ap": -1, "def": 1, "permanent": true}}
    ],
    "flavor": "",
    "image": "Abloesung-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Eigene Angriffe gegen aufgeklärte Einheiten haben +1 ATK.",
    "clauses": [
      {"title": "", "body": "Eigene Angriffe gegen aufgeklärte Einheiten haben +1 ATK."}
    ],
    "effects": [
      {"code": "AUFKLAERUNGSSCHLAG", "param": {"against": "revealed", "atk": 1}}
    ],
    "flavor": "",
    "image": "Aufklaerungsschlag-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Aufgeklärte Einheiten erhalten −1 DEF bis zum Ende des Zuges.",
    "clauses": [
      {"title": "", "body": "Aufgeklärte Einheiten erhalten −1 DEF bis zum Ende des Zuges."}
    ],
    "effects": [
      {"code": "LOKALISIERUNG", "param": {"against": "revealed", "def": -1, "until": "end-of-turn"}}
    ],
    "flavor": "",
    "image": "Lokalisierung-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "principle": "Zu Beginn deines Zuges",
    "text": "Wähle ein Ziel. Eigene Artillerie hat +1 ATK gegen dieses Ziel bis zum Ende des Zuges.",
    "clauses": [
      {"title": "", "body": "Wähle ein Ziel. Eigene Artillerie hat +1 ATK gegen dieses Ziel bis zum Ende des Zuges."}
    ],
    "effects": [
      {"code": "PUNKTFEUER", "param": {"when": "start-of-turn", "choose": "target", "who": "artillerie", "atk": 1, "until": "end-of-turn"}}
    ],
    "flavor": "",
    "image": "Punktfeuer-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Wird eine eigene Einheit beschädigt, aber nicht zerstört, hat sie +1 ATK gegen die gegnerische Einheit, die sie beschädigt hat, bis zum Ende deines nächsten Zuges.",
    "clauses": [
      {"title": "", "body": "Wird eine eigene Einheit beschädigt, aber nicht zerstört, hat sie +1 ATK gegen die gegnerische Einheit, die sie beschädigt hat, bis zum Ende deines nächsten Zuges."}
    ],
    "effects": [
      {"code": "AUSWERTUNG", "param": {"when": "damaged-not-destroyed", "against": "source", "atk": 1, "until": "end-of-next-own-turn"}}
    ],
    "flavor": "",
    "image": "Auswertung-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Am Ende deines Zuges lege +1 DEF auf einen Abschnitt. Am Beginn deines nächsten Zuges darfst du stattdessen +1 ATK auf einen anderen Abschnitt legen.",
    "clauses": [
      {"title": "", "body": "Am Ende deines Zuges lege +1 DEF auf einen Abschnitt. Am Beginn deines nächsten Zuges darfst du stattdessen +1 ATK auf einen anderen Abschnitt legen."}
    ],
    "effects": [
      {"code": "SCHEINSCHWERPUNKT", "param": {"end": {"section": "def", "value": 1}, "next_start": {"move_to_other_section": "atk", "value": 1}}}
    ],
    "flavor": "",
    "image": "Scheinschwerpunkt-Doktrin.jpg",
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
    "text": "Panzertruppen und mechanisierte Infanterie erhalten +1 Angriff in dem Zug, in dem sie in die Frontlinie gespielt werden. Sonderfähigkeiten gegnerischer Unterstützungskarten können in der ersten Runde nach Ausspielung einer Panzerkarte nicht aktiviert werden.",
    "effects": [
      {
        "code": "BLITZ_SUMMON_ATK",
        "param": {
          "tags": [
            "panzer",
            "mech-infanterie"
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
    "image": "Blitzkrieg-Doktrin.jpg",
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
    "image": "Bollwerk-Doktrin.jpg",
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
    "image": "Sicherer Nachschub-Doktrin.jpg",
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
    "image": "Tiefenverteidigung-Doktrin.jpg",
    "max_copies": 1
  }
];
