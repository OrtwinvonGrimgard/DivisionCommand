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
      {"title": "Zielbeobachtung", "body": "Wähle eine feindliche Einheit. Wenn diese Einheit im Begriff ist eine Aktion auszuführen, darf eine aktive Artillerieeinheit in Reichweite zuerst mit +1 ATK angreifen."},
      {"title": "Raumüberwachung", "body": "Wähle eine gegnerische Stellung aus der Frontlinie, auch eine leere. Taucht dort eine feindliche Einheit auf, darf eine aktive Artillerieeinheit in Reichweite zuerst mit +1 ATK angreifen."}
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
      {"title": "Verband", "body": "Besitzt deine Front je eine Infanterie, einen Panzer und eine Artillerie, hat die gesamte Frontlinie +1 ATK und +1 DEF."}
    ],
    "effects": [
      {"code": "VERBAND", "param": {"need": ["infanterie", "panzer", "artillerie"], "scope": "own-front", "atk": 1, "def": 1}}
    ],
    "flavor": "",
    "image": "Normverband-Doktrin.jpg",
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
