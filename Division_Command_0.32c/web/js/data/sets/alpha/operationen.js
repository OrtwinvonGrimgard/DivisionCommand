window.DC_SET_ALPHA = window.DC_SET_ALPHA || {};
window.DC_SET_ALPHA["Operation"] = [
  {
    "id": "dc_op_belagerung",
    "set": "set_alpha",
    "nummer": "OP001",
    "status": "live",
    "typ": "Operation",
    "klasse": "",
    "name": "Belagerung",
    "ap": 2,
    "atk": null,
    "def": null,
    "tags": ["operation"],
    "klasse_tags": [],
    "text": "Bleibt liegen. Nach 3 Zügen: +1 ATK für eigene Infanterie im Zielabschnitt.",
    "effects": [
      {"code": "OP_COMPLETE", "param": {"turns": 3, "atk": 1, "target": "own-infantry-section"}}
    ],
    "flavor": "Die Stadt fällt nicht. Sie wird aufgegeben.",
    "image": "Belagerung-Operation.png",
    "max_copies": 1
  }
];
