window.DC_SET_TYPES = window.DC_SET_TYPES || {};
window.DC_SET_TYPES["Token"] = [
  {
    "id": "dc_tok_minenfeld",
    "set": "set_alpha",
    "status": "live",
    "typ": "Token",
    "klasse": "",
    "name": "Minenfeld",
    "verdeckt_ok": true,
    "ap": 0,
    "atk": null,
    "def": null,
    "tags": [
      "befestigung",
      "minenfeld",
      "token"
    ],
    "text": "Token vor einer Einheit. Deckung auch verdeckt. Löst vor dem Kampf aus.",
    "effects": [
      {
        "code": "MINE_TOKEN",
        "param": {
          "dmg": 3
        }
      }
    ],
    "image": "tokens/MINE.png",
    "max_copies": 99
  }
];
