/**
 * Zusammensetzbare Offiziersporträts.
 * Gesicht + Uniform-Archetyp + Hut.
 * Jeder Dienstgrad hat eigene Alters- und Prunkstufe.
 */
(function (w) {
  'use strict';

  var FACES = [
    { id: 'f01', label: 'I' },
    { id: 'f02', label: 'II' },
    { id: 'f03', label: 'III' },
    { id: 'f04', label: 'IV' },
    { id: 'f05', label: 'V' },
    { id: 'f06', label: 'VI' }
  ];

  var UNIFORMS = [
    { id: 'feld', label: 'Feld', hint: 'Feldgrau, Stehkragen — wird mit dem Rang zum Mantel' },
    { id: 'dienst', label: 'Dienst', hint: 'Dunkle Dienstjacke — Sterne, Spange, Achselschnur' },
    { id: 'gala', label: 'Gala', hint: 'Weiß-Gold — Stickerei, Sterne, Schärpe' },
    { id: 'historisch', label: 'Historisch', hint: 'Husarenrot — Litzen, Pelisse, Orden' }
  ];

  var HATS = [
    { id: 'none', label: 'Ohne' },
    { id: 'schirm', label: 'Schirmmütze' }
  ];

  var RANKS = [
    { id: 'Lt', label: 'Lt', title: 'Leutnant', age: 'lt', years: '22' },
    { id: 'OLt', label: 'OLt', title: 'Oberleutnant', age: 'olt', years: '25' },
    { id: 'Hptm', label: 'Hptm', title: 'Hauptmann', age: 'hptm', years: '32' },
    { id: 'Maj', label: 'Maj', title: 'Major', age: 'maj', years: '40' },
    { id: 'Obstlt', label: 'Obstlt', title: 'Oberstleutnant', age: 'obstlt', years: '48' },
    { id: 'Obst', label: 'Obst', title: 'Oberst', age: 'obst', years: '55' },
    { id: 'Gen', label: 'Gen', title: 'General', age: 'gen', years: '63' }
  ];

  var AGE_ORDER = ['gen', 'obst', 'obstlt', 'maj', 'hptm', 'olt', 'lt', 's', 'm', 'y'];
  var AGE_LABEL = {
    lt: 'jung',
    olt: 'jung',
    hptm: 'erfahren',
    maj: 'gereift',
    obstlt: 'altgedient',
    obst: 'senior',
    gen: 'general',
    y: 'jung',
    m: 'mittel',
    s: 'älter'
  };
  var VER = '5';

  function rankMeta(rank) {
    var id = String(rank || 'Lt');
    var i;
    for (i = 0; i < RANKS.length; i++) if (RANKS[i].id === id) return RANKS[i];
    var low = id.toLowerCase();
    if (/gen|general/.test(low)) return RANKS[6];
    if (/obst(?!lt)|oberst(?!leut)/.test(low)) return RANKS[5];
    if (/obstlt|oberstleut/.test(low)) return RANKS[4];
    if (/maj/.test(low)) return RANKS[3];
    if (/hptm|haupt/.test(low)) return RANKS[2];
    if (/olt|oberleut/.test(low)) return RANKS[1];
    return RANKS[0];
  }

  function ageOf(rank) {
    return rankMeta(rank).age;
  }

  function agesFrom(age) {
    var start = AGE_ORDER.indexOf(String(age || 'lt'));
    if (start < 0) start = AGE_ORDER.indexOf('lt');
    return AGE_ORDER.slice(start);
  }

  function parseKit(id) {
    var s = String(id || '');
    var m = s.match(/^(f0[1-6])(?:-([a-z]+))?(?:-([a-z]+))?/);
    if (!m) return null;
    var uni = m[2] || 'dienst';
    var hat = m[3] || 'none';
    if (uni === 'base') { uni = 'dienst'; hat = 'none'; }
    if (hat === 'y' || hat === 'm' || hat === 's' || hat === 'lt' || hat === 'olt' ||
        hat === 'hptm' || hat === 'maj' || hat === 'obstlt' || hat === 'obst' || hat === 'gen') {
      hat = 'none';
    }
    if (uni !== 'feld' && uni !== 'dienst' && uni !== 'gala' && uni !== 'historisch') uni = 'dienst';
    if (hat !== 'none' && hat !== 'schirm') hat = 'none';
    return { face: m[1], uniform: uni, hat: hat };
  }

  function kitId(kit) {
    kit = kit || {};
    return (kit.face || 'f01') + '-' + (kit.uniform || 'dienst') + '-' + (kit.hat || 'none');
  }

  function fileUrl(name) {
    return 'assets/portraits/kit/' + name + '.jpg?v=' + VER;
  }

  function legacyUrl(id) {
    var n = parseInt(String(id || '').replace(/^lt-/, ''), 10);
    if (!(n >= 1 && n <= 24)) n = 1;
    var key = 'lt-' + (n < 10 ? '0' : '') + n;
    return 'assets/portraits/' + key + '.jpg?v=3';
  }

  function candidates(id, rank) {
    var kit = parseKit(id);
    if (!kit) return [legacyUrl(id)];
    var ages = agesFrom(ageOf(rank));
    var face = kit.face;
    var uni = kit.uniform;
    var hat = kit.hat;
    var list = [];
    function add(name) {
      var u = fileUrl(name);
      if (list.indexOf(u) < 0) list.push(u);
    }
    var a, i;
    for (i = 0; i < ages.length; i++) {
      a = ages[i];
      add(face + '-' + uni + '-' + hat + '-' + a);
    }
    if (hat !== 'none') {
      for (i = 0; i < ages.length; i++) add(face + '-' + uni + '-none-' + ages[i]);
    }
    add(face + '-' + uni + '-y');
    if (uni !== 'dienst') {
      for (i = 0; i < ages.length; i++) {
        add(face + '-dienst-' + hat + '-' + ages[i]);
        add(face + '-dienst-none-' + ages[i]);
      }
      add(face + '-dienst-none-y');
      add(face + '-dienst-y');
    }
    add(face + '-base');
    list.push(legacyUrl('lt-01'));
    return list;
  }

  function src(id, rank) {
    return candidates(id, rank)[0];
  }

  function bindImg(img, id, rank) {
    if (!img) return;
    var list = candidates(id, rank);
    img.setAttribute('data-cands', list.join('|'));
    img.setAttribute('data-ci', '0');
    img.onerror = function () {
      var c = (this.getAttribute('data-cands') || '').split('|');
      var i = Number(this.getAttribute('data-ci') || 0) + 1;
      if (i < c.length) {
        this.setAttribute('data-ci', String(i));
        this.src = c[i];
      }
    };
    img.src = list[0];
  }

  function faceThumb(face) {
    return candidates(face + '-dienst-none', 'Lt')[0];
  }

  function uniformThumb(face, uniform) {
    return candidates(face + '-' + uniform + '-none', 'Lt')[0];
  }

  function hatThumb(face, uniform, hat) {
    return candidates(face + '-' + uniform + '-' + hat, 'Lt')[0];
  }

  w.DCPortrait = {
    FACES: FACES,
    UNIFORMS: UNIFORMS,
    HATS: HATS,
    RANKS: RANKS,
    AGE_LABEL: AGE_LABEL,
    VER: VER,
    parseKit: parseKit,
    kitId: kitId,
    ageOf: ageOf,
    rankMeta: rankMeta,
    candidates: candidates,
    src: src,
    bindImg: bindImg,
    faceThumb: faceThumb,
    uniformThumb: uniformThumb,
    hatThumb: hatThumb,
    legacyUrl: legacyUrl
  };
})(window);
