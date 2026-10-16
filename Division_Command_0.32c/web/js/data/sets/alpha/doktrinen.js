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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Eigene Artillerie darf einen leeren Abschnitt beschießen. Eine Einheit, die in diesem Zug dort einrückt, erleidet 1 Schaden.",
    "clauses": [
      {"title": "", "body": "Eigene Artillerie darf einen leeren Abschnitt beschießen. Eine Einheit, die in diesem Zug dort einrückt, erleidet 1 Schaden."}
    ],
    "effects": [
      {"code": "ABRIEGELN", "param": {"who": "artillerie", "target": "empty-section", "on_enter": {"damage": 1}}}
    ],
    "flavor": "",
    "image": "Abriegeln-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "principle": "Zu Beginn deines Zuges",
    "text": "Wähle eine eigene Infanterie. Sie hat in diesem Zug +2 ATK und −1 DEF.",
    "clauses": [
      {"title": "", "body": "Wähle eine eigene Infanterie. Sie hat in diesem Zug +2 ATK und −1 DEF."}
    ],
    "effects": [
      {"code": "STOSSTRUPP", "param": {"when": "start-of-turn", "choose": "own-infantry", "atk": 2, "def": -1, "until": "end-of-turn"}}
    ],
    "flavor": "",
    "image": "Stosstrupp-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Beschädigte eigene Einheiten haben +1 ATK, bis sie zerstört werden. Liegt in einem Abschnitt eigene Unterstützung, haben beschädigte eigene Einheiten dort +1 DEF.",
    "clauses": [
      {"title": "", "body": "Beschädigte eigene Einheiten haben +1 ATK, bis sie zerstört werden."},
      {"title": "", "body": "Liegt in einem Abschnitt eigene Unterstützung, haben beschädigte eigene Einheiten dort +1 DEF."}
    ],
    "effects": [
      {"code": "WEITERKAEMPFEN", "param": {"who": "damaged", "atk": 1, "until": "destroyed"}},
      {"code": "SANITAET", "param": {"need": "support-in-section", "who": "damaged", "def": 1}}
    ],
    "flavor": "",
    "image": "Weiterkaempfen-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "principle": "Zu Beginn deines Zuges",
    "text": "Wähle einen Abschnitt. Er hat in diesem Zug +1 DEF.",
    "clauses": [
      {"title": "", "body": "Wähle einen Abschnitt. Er hat in diesem Zug +1 DEF."}
    ],
    "effects": [
      {"code": "ETAPPENSICHERUNG", "param": {"when": "start-of-turn", "choose": "section", "def": 1, "until": "end-of-turn"}}
    ],
    "flavor": "",
    "image": "Etappensicherung-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Eigene Einheiten, die im letzten Zug nicht angegriffen haben, haben +1 ATK.",
    "clauses": [
      {"title": "", "body": "Eigene Einheiten, die im letzten Zug nicht angegriffen haben, haben +1 ATK."}
    ],
    "effects": [
      {"code": "RASTEN", "param": {"if": "did-not-attack-last-turn", "atk": 1}}
    ],
    "flavor": "",
    "image": "Rasten-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Eigene Infanterie kostet 1 AP weniger zum Ausspielen, mindestens 1. Eigene Infanterie hat +1 DEF.",
    "clauses": [
      {"title": "", "body": "Eigene Infanterie kostet 1 AP weniger zum Ausspielen, mindestens 1."},
      {"title": "", "body": "Eigene Infanterie hat +1 DEF."}
    ],
    "effects": [
      {"code": "BREITES_AUFGEBOT", "param": {"who": "infanterie", "play_cost": -1, "min": 1, "def": 1}}
    ],
    "flavor": "",
    "image": "Breites-Aufgebot-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "principle": "Zu Beginn deines Zuges",
    "text": "Wähle eine eigene Infanterie. Sie hat in diesem Zug +2 ATK.",
    "clauses": [
      {"title": "", "body": "Wähle eine eigene Infanterie. Sie hat in diesem Zug +2 ATK."}
    ],
    "effects": [
      {"code": "STURMANGRIFF", "param": {"when": "start-of-turn", "choose": "own-infantry", "atk": 2, "until": "end-of-turn"}}
    ],
    "flavor": "",
    "image": "Sturmangriff-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Eigene Artillerie hat +1 ATK. Wird ein Abschnitt von eigener Artillerie beschossen, haben eigene Einheiten in diesem Abschnitt +1 ATK.",
    "clauses": [
      {"title": "", "body": "Eigene Artillerie hat +1 ATK."},
      {"title": "", "body": "Wird ein Abschnitt von eigener Artillerie beschossen, haben eigene Einheiten in diesem Abschnitt +1 ATK."}
    ],
    "effects": [
      {"code": "FEUERWALZE", "param": {"artillerie_atk": 1, "on_shell": {"who": "own-units-in-section", "atk": 1}}}
    ],
    "flavor": "",
    "image": "Feuerwalze-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Eigene Panzer und Geschütze, die die Front verlassen und wieder einrücken, kosten 1 AP weniger zum Ausspielen, mindestens 1. Sie haben in diesem Zug +1 ATK.",
    "clauses": [
      {"title": "", "body": "Eigene Panzer und Geschütze, die die Front verlassen und wieder einrücken, kosten 1 AP weniger zum Ausspielen, mindestens 1."},
      {"title": "", "body": "Sie haben in diesem Zug +1 ATK."}
    ],
    "effects": [
      {"code": "MATERIALERSATZ", "param": {"who": ["panzer", "geschuetze"], "if": "left-and-reentered", "play_cost": -1, "min": 1, "atk": 1, "until": "end-of-turn"}}
    ],
    "flavor": "",
    "image": "Materialersatz-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Ein Abschnitt mit mindestens zwei eigenen Einheiten hat +1 DEF.",
    "clauses": [
      {"title": "", "body": "Ein Abschnitt mit mindestens zwei eigenen Einheiten hat +1 DEF."}
    ],
    "effects": [
      {"code": "LINIENKRIEG", "param": {"if": "section-has-at-least", "count": 2, "def": 1}}
    ],
    "flavor": "",
    "image": "Linienkrieg-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Ein eigener Angriff in einem Abschnitt, in dem der Gegner weniger Einheiten hat als du, hat +1 ATK.",
    "clauses": [
      {"title": "", "body": "Ein eigener Angriff in einem Abschnitt, in dem der Gegner weniger Einheiten hat als du, hat +1 ATK."}
    ],
    "effects": [
      {"code": "UMGEHEN", "param": {"if": "opponent-has-fewer-units-in-section", "atk": 1}}
    ],
    "flavor": "",
    "image": "Umgehen-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Liegt in einem Abschnitt eigene Unterstützung, kosten eigene Einheiten dort 1 AP weniger zum Ausspielen, mindestens 1. Diese Einheiten haben in diesem Zug +1 ATK.",
    "clauses": [
      {"title": "", "body": "Liegt in einem Abschnitt eigene Unterstützung, kosten eigene Einheiten dort 1 AP weniger zum Ausspielen, mindestens 1."},
      {"title": "", "body": "Diese Einheiten haben in diesem Zug +1 ATK."}
    ],
    "effects": [
      {"code": "MARSCH_AUS_DEM_VOLLEN", "param": {"need": "support-in-section", "play_cost": -1, "min": 1, "atk": 1, "until": "end-of-turn"}}
    ],
    "flavor": "",
    "image": "Marsch-aus-dem-Vollen-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Eigene Einheiten, die in einen Abschnitt rücken, der im letzten Zug angegriffen wurde, haben +1 ATK und +1 DEF.",
    "clauses": [
      {"title": "", "body": "Eigene Einheiten, die in einen Abschnitt rücken, der im letzten Zug angegriffen wurde, haben +1 ATK und +1 DEF."}
    ],
    "effects": [
      {"code": "ENTSATZ", "param": {"if": "section-attacked-last-turn", "on_enter": {"atk": 1, "def": 1}}}
    ],
    "flavor": "",
    "image": "Entsatz-Doktrin.jpg",
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
    "tags": ["doktrin"],
    "klasse_tags": [],
    "text": "Einmal pro Zug darfst du eine eigene Einheit um einen Slot nach links oder rechts schieben. Liegt in ihrem Abschnitt Unterstützung, kostet das 1 AP weniger, mindestens 1. Die verlegte Einheit hat in diesem Zug +1 DEF.",
    "clauses": [
      {"title": "", "body": "Einmal pro Zug darfst du eine eigene Einheit um einen Slot nach links oder rechts schieben."},
      {"title": "", "body": "Liegt in ihrem Abschnitt Unterstützung, kostet das 1 AP weniger, mindestens 1. Die verlegte Einheit hat in diesem Zug +1 DEF."}
    ],
    "effects": [
      {"code": "VERLEGUNG", "param": {"once": "per-turn", "shift": 1, "if_support": {"cost": -1, "min": 1}, "def": 1, "until": "end-of-turn"}}
    ],
    "flavor": "",
    "image": "Verlegung-Doktrin.jpg",
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
