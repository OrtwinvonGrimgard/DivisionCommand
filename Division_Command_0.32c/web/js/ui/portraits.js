/**
 * Zusammensetzbare Offiziersporträts.
 * Gesicht + Uniform + Kopfbedeckung, Alter aus dem Rang.
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
    { id: 'feld', label: 'Feld', hint: 'Feldgrau, Stehkragen' },
    { id: 'dienst', label: 'Dienst', hint: 'Dunkle Dienstjacke' },
    { id: 'gala', label: 'Gala', hint: 'Weiß-Gold' },
    { id: 'historisch', label: 'Historisch', hint: 'Husarenrot' }
  ];

  var HATS = [
    { id: 'none', label: 'Ohne' },
    { id: 'schirm', label: 'Schirmmütze' }
  ];

  var RANKS = [
    { id: 'Lt', label: 'Lt', title: 'Leutnant', age: 'y' },
    { id: 'OLt', label: 'OLt', title: 'Oberleutnant', age: 'y' },
    { id: 'Hptm', label: 'Hptm', title: 'Hauptmann', age: 'm' },
    { id: 'Maj', label: 'Maj', title: 'Major', age: 'm' },
    { id: 'Obstlt', label: 'Obstlt', title: 'Oberstleutnant', age: 'm' },
    { id: 'Obst', label: 'Obst', title: 'Oberst', age: 's' },
    { id: 'Gen', label: 'Gen', title: 'General', age: 's' }
  ];

  var AGE_LABEL = { y: 'jung', m: 'mittel', s: 'älter' };
  var VER = '4';

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

  function parseKit(id) {
    var s = String(id || '');
    var m = s.match(/^(f0[1-6])(?:-([a-z]+))?(?:-([a-z]+))?/);
    if (!m) return null;
    var uni = m[2] || 'dienst';
    var hat = m[3] || 'none';
    if (uni === 'base') { uni = 'dienst'; hat = 'none'; }
    if (hat === 'y' || hat === 'm' || hat === 's') hat = 'none';
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
    var age = ageOf(rank);
    var face = kit.face;
    var uni = kit.uniform;
    var hat = kit.hat;
    var list = [];
    function add(name) {
      var u = fileUrl(name);
      if (list.indexOf(u) < 0) list.push(u);
    }
    add(face + '-' + uni + '-' + hat + '-' + age);
    if (age !== 'y') add(face + '-' + uni + '-' + hat + '-y');
    if (hat !== 'none') {
      add(face + '-' + uni + '-none-' + age);
      add(face + '-' + uni + '-none-y');
    }
    add(face + '-' + uni + '-y');
    if (uni !== 'dienst') {
      add(face + '-dienst-' + hat + '-' + age);
      add(face + '-dienst-' + hat + '-y');
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
