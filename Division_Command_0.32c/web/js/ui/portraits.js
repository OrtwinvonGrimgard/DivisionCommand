/**
 * Zusammensetzbare Offiziersporträts.
 * Gesicht (G) + Uniform-Archetyp (U) + Hut (H).
 * Jeder Dienstgrad hat eigene Rangabzeichen, Alter und Bildausschnitt.
 */
(function (w) {
  'use strict';

  var FACES = [
    { id: 'f01', label: 'Vael 01', hint: 'schwarz, Ring' },
    { id: 'f02', label: 'Vael 02', hint: 'schwarz, kahl' },
    { id: 'f03', label: 'Rothain 01', hint: 'Ringkragen, 18. Jahrhundert' },
    { id: 'f04', label: 'Rothain 02', hint: 'dunkelblond, schmales Gesicht' },
    { id: 'f05', label: 'Steinmark 01', hint: 'blond, Koppel' },
    { id: 'f06', label: 'Steinmark 02', hint: 'rostrot, kantig' },
    { id: 'f07', label: 'Vesper 01', hint: 'russisch, dunkles Haar' },
    { id: 'f08', label: 'Vesper 02', hint: 'dunkelblond, langes Gesicht' },
    { id: 'f09', label: 'Karsk 01', hint: 'weißes Haar, Implantat' },
    { id: 'f10', label: 'Karsk 02', hint: 'chemisch schwarz, Implantat' },
    { id: 'f11', label: 'Sahr 01', hint: 'arabisch, Knoten' },
    { id: 'f12', label: 'Sahr 02', hint: 'arabisch, rundes Gesicht' },
    { id: 'f13', label: 'Ossar 01', hint: 'asiatisch, Knochenplatte' },
    { id: 'f14', label: 'Ossar 02', hint: 'dunkelbraun, Knochenplatte' },
    { id: 'f15', label: 'Jetzt 01', hint: 'oliv, Koppelweste' },
    { id: 'f16', label: 'Jetzt 02', hint: 'schwarz, rundes Gesicht' }
  ];

  var UNIFORMS = [
    { id: 'kampf', label: 'Kampfanzug', hint: 'die Uniform sitzt schon im Bild' }
  ];

  var UNI_IDS = {};
  var i;
  for (i = 0; i < UNIFORMS.length; i++) UNI_IDS[UNIFORMS[i].id] = true;

  var HATS = [
    { id: 'none', label: 'Ohne' }
  ];

  var RANKS = [
    { id: 'Fhr', label: 'Fhr', title: 'Fähnrich', age: 'fhr', years: '19', mark: 'Kadettenzeichen' },
    { id: 'Lt', label: 'Lt', title: 'Leutnant', age: 'lt', years: '22', mark: 'Kompanie 1' },
    { id: 'OLt', label: 'OLt', title: 'Oberleutnant', age: 'olt', years: '25', mark: 'Kompanie 2' },
    { id: 'Hptm', label: 'Hptm', title: 'Hauptmann', age: 'hptm', years: '32', mark: 'Kompanie 3' },
    { id: 'Maj', label: 'Maj', title: 'Major', age: 'maj', years: '40', mark: 'Stab 1' },
    { id: 'Obstlt', label: 'Obstlt', title: 'Oberstleutnant', age: 'obstlt', years: '48', mark: 'Stab 2' },
    { id: 'Obst', label: 'Obst', title: 'Oberst', age: 'obst', years: '55', mark: 'Stab 3' },
    { id: 'Bg', label: 'Bg', title: 'Brigadegeneral', age: 'bg', years: '58', mark: 'General 1' },
    { id: 'Genmj', label: 'GenMj', title: 'Generalmajor', age: 'genmj', years: '60', mark: 'General 2' },
    { id: 'Genlt', label: 'GenLt', title: 'Generalleutnant', age: 'genlt', years: '62', mark: 'General 3' },
    { id: 'Gen', label: 'Gen', title: 'General', age: 'gen', years: '64', mark: 'General 4' },
    { id: 'Fm', label: 'FM', title: 'Feldmarschall', age: 'fm', years: '66', mark: 'Marschallzeichen' },
    { id: 'Gfm', label: 'GFM', title: 'Generalfeldmarschall', age: 'gfm', years: '68', mark: 'Marschallzeichen und Zusatz' }
  ];

  var AGE_ORDER = ['gfm', 'fm', 'gen', 'genlt', 'genmj', 'bg', 'obst', 'obstlt', 'maj', 'hptm', 'olt', 'lt', 'fhr'];
  var AGE_LABEL = {
    fhr: 'Kadett',
    lt: 'Kompanie',
    olt: 'Kompanie',
    hptm: 'Kompanie',
    maj: 'Stab',
    obstlt: 'Stab',
    obst: 'Stab',
    bg: 'General',
    genmj: 'General',
    genlt: 'General',
    gen: 'General',
    fm: 'Marschall',
    gfm: 'Marschall'
  };
  var RANK_AGES = 'fhr,lt,olt,hptm,maj,obstlt,obst,bg,genmj,genlt,gen,fm,gfm';

  var VER = '21';

  var FACE_FILE = {
    f01: 'Vael/male/01.png',
    f02: 'Vael/male/02.png',
    f03: 'Rothain/male/01.png',
    f04: 'Rothain/male/02.png',
    f05: 'Steinmark/male/01.png',
    f06: 'Steinmark/male/02.png',
    f07: 'Vesper/male/01.png',
    f08: 'Vesper/male/02.png',
    f09: 'Karsk/male/01.png',
    f10: 'Karsk/male/02.png',
    f11: 'Sahr/male/01.png',
    f12: 'Sahr/male/02.png',
    f13: 'Ossar/male/01.png',
    f14: 'Ossar/male/02.png',
    f15: 'Jetzt/male/01.png',
    f16: 'Jetzt/male/02.png'
  };

  var RIGHT_FILE = {
    f09: 'Karsk/male/01-right.png',
    f10: 'Karsk/male/02-right.png'
  };

  function rankPath(file, age) {
    if (age === 'lt') return String(file).replace('male/', 'male/leutnant/');
    if (age === 'olt') return String(file).replace('male/', 'male/oberleutnant/');
    return file;
  }

  function rightUrl(face, rank) {
    var file = RIGHT_FILE[String(face || '')];
    if (!file) return '';
    file = rankPath(file, ageOf(rank || 'Fhr'));
    return 'assets/portraits/' + file + '?v=' + VER;
  }

  var HAVE = {
    'f01-kampf-none': RANK_AGES,
    'f02-kampf-none': RANK_AGES,
    'f03-kampf-none': RANK_AGES,
    'f04-kampf-none': RANK_AGES,
    'f05-kampf-none': RANK_AGES,
    'f06-kampf-none': RANK_AGES,
    'f07-kampf-none': RANK_AGES,
    'f08-kampf-none': RANK_AGES,
    'f09-kampf-none': RANK_AGES,
    'f10-kampf-none': RANK_AGES,
    'f11-kampf-none': RANK_AGES,
    'f12-kampf-none': RANK_AGES,
    'f13-kampf-none': RANK_AGES,
    'f14-kampf-none': RANK_AGES,
    'f15-kampf-none': RANK_AGES,
    'f16-kampf-none': RANK_AGES
  };

  function rankMeta(rank) {
    var id = String(rank || 'Lt');
    var j;
    for (j = 0; j < RANKS.length; j++) if (RANKS[j].id === id) return RANKS[j];
    var low = id.toLowerCase();
    var alias = [
      [/generalfeld|gfm/, 'Gfm'],
      [/feldmarschall|^fm$/, 'Fm'],
      [/brigade|^bg$/, 'Bg'],
      [/generalmajor|genmj/, 'Genmj'],
      [/generalleut|genlt/, 'Genlt'],
      [/^gen$|general$/, 'Gen'],
      [/obstlt|oberstleut/, 'Obstlt'],
      [/obst|oberst/, 'Obst'],
      [/maj/, 'Maj'],
      [/hptm|haupt/, 'Hptm'],
      [/olt|oberleut/, 'OLt'],
      [/^lt$|leutnant/, 'Lt'],
      [/fhr|faehn|fähn/, 'Fhr']
    ];
    var a;
    for (a = 0; a < alias.length; a++) {
      if (alias[a][0].test(low)) {
        for (j = 0; j < RANKS.length; j++) if (RANKS[j].id === alias[a][1]) return RANKS[j];
      }
    }
    return RANKS[0];
  }

  function ageOf(rank) {
    return rankMeta(rank).age;
  }

  function agesFrom(age) {
    var start = AGE_ORDER.indexOf(String(age || 'fhr'));
    if (start < 0) start = AGE_ORDER.indexOf('fhr');
    return AGE_ORDER.slice(start);
  }

  function parseKit(id) {
    var s = String(id || '');
    var m = s.match(/^(f\d{2})(?:-([a-z]+))?(?:-([a-z]+))?/);
    if (!m) return null;
    var uni = m[2] || 'kampf';
    var hat = m[3] || 'none';
    if (uni === 'base' || uni === 'dienst') { uni = 'kampf'; hat = 'none'; }
    if (hat === 'y' || hat === 'm' || hat === 's' || hat === 'fhr' || hat === 'lt' || hat === 'olt' ||
        hat === 'hptm' || hat === 'maj' || hat === 'obstlt' || hat === 'obst' || hat === 'gen') {
      hat = 'none';
    }
    if (!UNI_IDS[uni]) uni = 'kampf';
    if (hat !== 'none' && hat !== 'schirm' && hat !== 'mutze') hat = 'none';
    return { face: m[1], uniform: uni, hat: hat };
  }

  function kitId(kit) {
    kit = kit || {};
    return (kit.face || 'f01') + '-' + (kit.uniform || 'kampf') + '-' + (kit.hat || 'none');
  }

  function fileUrl(name) {
    var text = String(name || '');
    var m = text.match(/^(f\d{2})/);
    var file = m && FACE_FILE[m[1]];
    if (!file) return '';
    var age = text.match(/-(fhr|lt|olt|hptm|maj|obstlt|obst|bg|genmj|genlt|gen|fm|gfm)$/);
    if (age) file = rankPath(file, age[1]);
    return 'assets/portraits/' + file + '?v=' + VER;
  }

  function legacyUrl(id) {
    return 'assets/portraits/Vael/male/01.png?v=' + VER;
  }

  function exactName(kit, rank) {
    kit = kit || {};
    return (kit.face || 'f01') + '-' + (kit.uniform || 'kampf') + '-' + (kit.hat || 'none') + '-' + ageOf(rank);
  }

  function has(id, rank) {
    var kit = parseKit(id);
    if (!kit) return false;
    var ages = HAVE[kitId(kit)];
    if (!ages) return false;
    return (',' + ages + ',').indexOf(',' + ageOf(rank) + ',') >= 0;
  }

  function uniformsFor(face) {
    return UNIFORMS.filter(function (u) {
      return has((face || 'f01') + '-' + u.id + '-none', 'Lt');
    });
  }

  function hatsFor(face, uniform) {
    return HATS.filter(function (h) {
      return has((face || 'f01') + '-' + (uniform || 'kampf') + '-' + h.id, 'Lt');
    });
  }

  function candidates(id, rank) {
    if (!has(id, rank)) return [];
    var kit = parseKit(id);
    if (!kit) return [];
    return [fileUrl(exactName(kit, rank))];
  }

  function src(id, rank) {
    return candidates(id, rank)[0] || '';
  }

  function bindImg(img, id, rank) {
    if (!img) return;
    img.setAttribute('loading', img.getAttribute('loading') || 'lazy');
    img.setAttribute('decoding', 'async');
    img.removeAttribute('data-cands');
    img.onerror = function () { this.removeAttribute('src'); };
    var url = src(id, rank);
    if (url) img.src = url;
    else {
      img.removeAttribute('src');
      img.alt = '';
    }
  }

  function faceThumb(face) {
    return candidates(face + '-kampf-none', 'Lt')[0];
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
    exactName: exactName,
    has: has,
    HAVE: HAVE,
    uniformsFor: uniformsFor,
    hatsFor: hatsFor,
    src: src,
    bindImg: bindImg,
    faceThumb: faceThumb,
    uniformThumb: uniformThumb,
    hatThumb: hatThumb,
    rightUrl: rightUrl,
    legacyUrl: legacyUrl
  };
})(window);
