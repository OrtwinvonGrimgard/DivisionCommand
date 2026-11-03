window.DC_SET_TYPES = window.DC_SET_TYPES || {};
window.DC_SET_TYPES["Elite"] = [
  {
    "id": "dc_eh_helden",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Helden der zweiten Kompanie",
    "ap": 4,
    "atk": 4,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "mittel"
    ],
    "text": "Wenn eine eigene Fronteinheit stirbt: kostenlos offen in denselben Slot.",
    "effects": [
      {
        "code": "BREACH_JUMP"
      }
    ],
    "flavor": "Was die anderen nicht wagen, haben wir schon getan.",
    "image": "elite/A052.jpg",
    "max_copies": 2,
    "collector": "A052"
  },
  {
    "id": "dc_eh_kommando",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Kommandogruppe",
    "ap": 5,
    "atk": 5,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie",
      "elite",
      "leicht"
    ],
    "text": "Nachbarn +2 V. Beide Flanken Infanterie: kämpft nach dem Angreifer in deren Gefecht mit.",
    "effects": [
      {
        "code": "FLANK_DEF",
        "param": {
          "def": 2
        }
      },
      {
        "code": "OP_MITKAEMPFEN"
      }
    ],
    "flavor": "Nur wenige erreichen den Geist der nötig ist.",
    "image": "elite/A055.jpg",
    "max_copies": 2,
    "collector": "A055"
  },
  {
    "id": "dc_eh_faustkeil",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Panzerzug Faustkeil",
    "ap": 5,
    "atk": 8,
    "def": 6,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "fahrzeug",
      "gepanzert",
      "kette",
      "panzer",
      "schwer",
      "elite"
    ],
    "text": "Führungsfahrzeug: +2 V wenn eine Flanke gepanzert ist.",
    "effects": [
      {
        "code": "FUEHRUNG_V",
        "param": {
          "def": 2
        }
      }
    ],
    "flavor": "Wir sind die Front!",
    "image": "elite/A062.jpg",
    "max_copies": 2,
    "collector": "A062"
  },
  {
    "id": "dc_eh_sniper",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Infanterie",
    "name": "Scharfschütze",
    "ap": 3,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": true,
    "tags": [
      "einheit",
      "infanterie",
      "elite",
      "leicht",
      "stellung",
      "scharfschuetze"
    ],
    "text": "+2 A gegen Infanterie. Nach Angriff verdeckt bis zum nächsten eigenen Zug.",
    "effects": [
      {
        "code": "VS_INF",
        "param": {
          "atk": 2
        }
      },
      {
        "code": "RELOCATE_HIDE"
      }
    ],
    "flavor": "Feuer! Feuer. Treffer! Treffer.",
    "image": "elite/A064.jpg",
    "max_copies": 2,
    "collector": "A064"
  },
  {
    "id": "dc_eh_koloss",
    "set": "set_alpha",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Panzer",
    "name": "Schwerer Panzer Koloss",
    "ap": 5,
    "atk": 7,
    "def": 9,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "fahrzeug",
      "gepanzert",
      "kette",
      "panzer",
      "schwer",
      "elite"
    ],
    "text": "Jeder erlittene Schaden -2.",
    "effects": [
      {
        "code": "SCHADEN_MINUS",
        "param": {
          "n": 2
        }
      }
    ],
    "flavor": "Ein Koloss fällt nicht. Er entscheidet sich zu knien.",
    "image": "elite/A065.jpg",
    "max_copies": 2,
    "collector": "A065"
  },
  {
    "id": "dc_b_silberschwur_624",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Silberschwur",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "elite",
      "infanterie"
    ],
    "text": "+2 ATK, solange du in diesem Zug eine Einheit ersetzt oder geheilt hast.",
    "effects": [],
    "flavor": "Silbersterne. Kein Thron. Trotzdem Befehl.",
    "image": "elite/B624.jpg",
    "max_copies": 1,
    "collector": "B624",
    "rarity": "silver"
  },
  {
    "id": "dc_b_kronmarschall_625",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Kronmarschall",
    "ap": 5,
    "atk": 5,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "elite",
      "infanterie"
    ],
    "text": "Beim Ausspielen: eigene Einheiten in einem Abschnitt haben +1 ATK bis Zugende.",
    "effects": [],
    "flavor": "Wo er steht, gilt das Dekret.",
    "image": "elite/B625.jpg",
    "max_copies": 1,
    "collector": "B625",
    "rarity": "gold"
  },
  {
    "id": "dc_b_veteranenrat_626",
    "set": "set_nations",
    "nation": "Rothain",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Veteranenrat",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "elite",
      "infanterie"
    ],
    "text": "+2 DEF. Einmal pro Zug: heile 1 DEF an einer eigenen Einheit im selben Abschnitt.",
    "effects": [],
    "flavor": "Narben statt Amt — und trotzdem Gehör.",
    "image": "elite/B626.jpg",
    "max_copies": 1,
    "collector": "B626",
    "rarity": "silver"
  },
  {
    "id": "dc_b_optimat_384",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Optimat",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "elite",
      "infanterie"
    ],
    "text": "+2 ATK, solange beschädigt. Beim Ausspielen: erleidet 1 Schaden.",
    "effects": [],
    "flavor": "Der Staat hat ihn fertig gebaut.",
    "image": "elite/B384.jpg",
    "max_copies": 1,
    "collector": "B384",
    "rarity": "silver"
  },
  {
    "id": "dc_b_chirurgenrat_385",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Chirurgenrat",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "elite",
      "infanterie"
    ],
    "text": "+1 DEF. Einmal pro Zug: heile 1 DEF an einer eigenen Einheit; diese hat -1 ATK bis Zugende.",
    "effects": [],
    "flavor": "Heilung als Leistungsdrossel.",
    "image": "elite/B385.jpg",
    "max_copies": 1,
    "collector": "B385",
    "rarity": "silver"
  },
  {
    "id": "dc_b_masskommandant_386",
    "set": "set_nations",
    "nation": "Karsk",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Maßkommandant",
    "ap": 5,
    "atk": 5,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "elite",
      "infanterie"
    ],
    "text": "Beim Ausspielen: wähle einen Abschnitt; eigene Einheiten dort +1 ATK bis Zugende und erleiden je 1 Schaden.",
    "effects": [],
    "flavor": "Befehl in Ampere.",
    "image": "elite/B386.jpg",
    "max_copies": 1,
    "collector": "B386",
    "rarity": "gold"
  },
  {
    "id": "dc_b_glaubenszeuge_108",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Glaubenszeuge",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Opfere diese Einheit: eine gegnerische Einheit im Abschnitt erleidet 3 Schaden.",
    "effects": [],
    "flavor": "Anerkannt. Nicht allein selig.",
    "image": "elite/B108.jpg",
    "max_copies": 1,
    "collector": "B108",
    "rarity": "silver"
  },
  {
    "id": "dc_b_eifererzug_109",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Eifererzug",
    "ap": 4,
    "atk": 4,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "+2 ATK. Am Zugende erleidet diese Einheit 1 Schaden.",
    "effects": [],
    "flavor": "Voss prüft, ob sie lau geworden sind.",
    "image": "elite/B109.jpg",
    "max_copies": 1,
    "collector": "B109",
    "rarity": "silver"
  },
  {
    "id": "dc_b_masskommandant_110",
    "set": "set_nations",
    "nation": "Theryn",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Maßkommandant",
    "ap": 5,
    "atk": 4,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "einheit",
      "infanterie"
    ],
    "text": "Beim Ausspielen: eigene Infanterie im Abschnitt +1 ATK bis Zugende.",
    "effects": [],
    "flavor": "Der Plan darf Nein sagen.",
    "image": "elite/B110.jpg",
    "max_copies": 1,
    "collector": "B110",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_konzernsekundant_150",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Konzernsekundant",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Einmal/Zug: eigener Panzer oder Artillerie +1 ATK.",
    "effects": [],
    "flavor": "Er spricht für das Buch, nicht für das Ministerium.",
    "image": "elite/B150.jpg",
    "max_copies": 1,
    "collector": "B150",
    "rarity": "silver"
  },
  {
    "id": "dc_b_werkmeister_front_151",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Werkmeister Front",
    "ap": 4,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: heile 2 verteilt auf Panzer/Artillerie.",
    "effects": [],
    "flavor": "Reparatur ist der Auftrag in Uniform.",
    "image": "elite/B151.jpg",
    "max_copies": 1,
    "collector": "B151",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_kriegsaktie_152",
    "set": "set_nations",
    "nation": "Vael",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Kriegsaktie",
    "ap": 4,
    "atk": 4,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Soforteinsatz kostet 1 weniger (min. 1).",
    "effects": [],
    "flavor": "Die Aktie steigt mit dem Verbrauch.",
    "image": "elite/B152.jpg",
    "max_copies": 1,
    "collector": "B152",
    "rarity": "gold"
  },
  {
    "id": "dc_b_kai_leutnant_189",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Kai-Leutnant",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Einmal/Zug: schiebe eine eigene Einheit um 1 Slot.",
    "effects": [],
    "flavor": "Er hält. Er lizenziert nicht.",
    "image": "elite/B189.jpg",
    "max_copies": 1,
    "collector": "B189",
    "rarity": "silver"
  },
  {
    "id": "dc_b_lucs_sitz_190",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Lucs Sitz",
    "ap": 3,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: heile 2 verteilt; keine Garnison befehligen.",
    "effects": [],
    "flavor": "Im Parlament. Ohne Amt über die Kompanie.",
    "image": "elite/B190.jpg",
    "max_copies": 1,
    "collector": "B190",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_offener_weg_191",
    "set": "set_nations",
    "nation": "Merovan",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Offener Weg",
    "ap": 4,
    "atk": 4,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Soforteinsatz zum Schieben kostet 1 weniger (min. 1).",
    "effects": [],
    "flavor": "Kommt der Weg, ist der Ort gewöhnlich — später und teurer.",
    "image": "elite/B191.jpg",
    "max_copies": 1,
    "collector": "B191",
    "rarity": "gold"
  },
  {
    "id": "dc_b_jona_leserbach_228",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Jona Leserbach",
    "ap": 3,
    "atk": 3,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Einmal/Zug: eine eigene Einheit in anderem Abschnitt +1 DEF.",
    "effects": [],
    "flavor": "Er schickt Leser. Er entscheidet nicht für die Täler.",
    "image": "elite/B228.jpg",
    "max_copies": 1,
    "collector": "B228",
    "rarity": "silver"
  },
  {
    "id": "dc_b_mar_aschen_229",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Mar Aschen",
    "ap": 3,
    "atk": 2,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: heile 2; ziehe 1 wenn allein.",
    "effects": [],
    "flavor": "Die Abschrift zurück. Kein besserer Ort.",
    "image": "elite/B229.jpg",
    "max_copies": 1,
    "collector": "B229",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_talruf_230",
    "set": "set_nations",
    "nation": "Lyr",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Talruf",
    "ap": 4,
    "atk": 4,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: ziehe eine Infanterie; sie +1 DEF wenn allein.",
    "effects": [],
    "flavor": "Der Ruf geht an die, die der Eid noch zeigt.",
    "image": "elite/B230.jpg",
    "max_copies": 1,
    "collector": "B230",
    "rarity": "gold"
  },
  {
    "id": "dc_b_ina_oss_267",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Ina Oss",
    "ap": 3,
    "atk": 2,
    "def": 4,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Einmal/Zug: Ausrüstung kostet 1 weniger; ziehe 1 wenn keine neue Zerstörung.",
    "effects": [],
    "flavor": "Sie zählt, wie wenige Namen hinzukommen.",
    "image": "elite/B267.jpg",
    "max_copies": 1,
    "collector": "B267",
    "rarity": "silver"
  },
  {
    "id": "dc_b_retter_grenz_268",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Retter Grenz",
    "ap": 3,
    "atk": 3,
    "def": 3,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Beim Ausspielen: Feind −1 ATK; stirbt eigene: Untersuchung — ziehe 1.",
    "effects": [],
    "flavor": "Der letzte Tote war ein Fehler. Kein Heiligtum.",
    "image": "elite/B268.jpg",
    "max_copies": 1,
    "collector": "B268",
    "rarity": "bronze"
  },
  {
    "id": "dc_b_ahnenschmied_269",
    "set": "set_nations",
    "nation": "Ossaria",
    "status": "live",
    "typ": "Einheit",
    "klasse": "Elite",
    "name": "Ahnenschmied",
    "ap": 4,
    "atk": 3,
    "def": 5,
    "verdeckt_ok": false,
    "tags": [
      "elite"
    ],
    "text": "Einmal/Zug: rüste Infanterie aus der Hand aus (−1 Kosten). Sie +1 DEF.",
    "effects": [],
    "flavor": "Erinnerung wird Rüstung. Nicht Befehl.",
    "image": "elite/B269.jpg",
    "max_copies": 1,
    "collector": "B269",
    "rarity": "gold"
  }
];
