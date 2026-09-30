/**
 * Zusammensetzbare Offiziersporträts.
 * Gesicht (G) + Uniform-Archetyp (U) + Hut (H).
 * Jeder Dienstgrad hat eigene Rangabzeichen, Alter und Bildausschnitt.
 */
(function (w) {
  'use strict';

  var FACES = [
    { id: 'f01', label: 'G01', hint: 'dunkle Locken, Schnurrbart' },
    { id: 'f02', label: 'G02', hint: 'schwarzes Haar, Knoten' },
    { id: 'f03', label: 'G03', hint: 'kurz, dunkel' },
    { id: 'f04', label: 'G04', hint: 'rotes Haar' },
    { id: 'f05', label: 'G05', hint: 'hell, kurz' },
    { id: 'f06', label: 'G06', hint: 'Braids' },
    { id: 'f07', label: 'G07', hint: 'Profil, dunkles Haar' },
    { id: 'f08', label: 'G08', hint: 'Locken, seitlich' },
    { id: 'f09', label: 'G09', hint: 'blond, kantig' },
    { id: 'f10', label: 'G10', hint: 'oliv, Vollbart' },
    { id: 'f11', label: 'G11', hint: 'grau-blond, Brille' },
    { id: 'f12', label: 'G12', hint: 'kurze Wellen, Sommersprossen' },
    { id: 'f13', label: 'G13', hint: 'glatte Stirn, dunkle Augen' },
    { id: 'f14', label: 'G14', hint: 'sidecut, Narbe' },
    { id: 'f15', label: 'G15', hint: 'hellbraun, rundes Gesicht' },
    { id: 'f16', label: 'G16', hint: 'silbernes Haaransatz, streng' }
  ];

  var UNIFORMS = [
    { id: 'dienst', label: 'U01 Dienst', hint: 'Marineblau, Stehkragen-Tunika' },
    { id: 'feld', label: 'U02 Feld', hint: 'Feldgrau, Stehkragen-Tunika' },
    { id: 'gala', label: 'U03 Gala', hint: 'Weiß-Gold, Paradekragen' },
    { id: 'historisch', label: 'U04 Historisch', hint: 'Husarenrot, Litzen' },
    { id: 'khaki', label: 'U05 Khaki', hint: 'Khaki, Feldtunika' },
    { id: 'oliv', label: 'U06 Oliv', hint: 'Oliv, Stehkragen-Tunika' },
    { id: 'stahl', label: 'U07 Stahl', hint: 'Stahlblau, Stehkragen-Tunika' },
    { id: 'jaeger', label: 'U08 Jäger', hint: 'Dunkelgrün, Stehkragen-Tunika' },
    { id: 'nacht', label: 'U09 Nacht', hint: 'Schwarz, Stehkragen-Tunika' },
    { id: 'luft', label: 'U10 Luft', hint: 'Hellblau, Stehkragen-Tunika' },
    { id: 'burgund', label: 'U11 Burgund', hint: 'Weinrot, Stehkragen-Tunika' },
    { id: 'sand', label: 'U12 Sand', hint: 'Sandfarben, Stehkragen-Tunika' }
  ];

  var UNI_IDS = {};
  var i;
  for (i = 0; i < UNIFORMS.length; i++) UNI_IDS[UNIFORMS[i].id] = true;

  var HATS = [
    { id: 'none', label: 'H01 Ohne' },
    { id: 'schirm', label: 'H02 Schirm' }
  ];

  var RANKS = [
    { id: 'Lt', label: 'Lt', title: 'Leutnant', age: 'lt', years: '22', mark: '1 silberner Stern' },
    { id: 'OLt', label: 'OLt', title: 'Oberleutnant', age: 'olt', years: '25', mark: '2 silberne Sterne' },
    { id: 'Hptm', label: 'Hptm', title: 'Hauptmann', age: 'hptm', years: '32', mark: '3 silberne Sterne' },
    { id: 'Maj', label: 'Maj', title: 'Major', age: 'maj', years: '40', mark: '1 goldener Stern + Eichenlaub' },
    { id: 'Obstlt', label: 'Obstlt', title: 'Oberstleutnant', age: 'obstlt', years: '48', mark: '2 goldene Sterne + Eichenlaub' },
    { id: 'Obst', label: 'Obst', title: 'Oberst', age: 'obst', years: '55', mark: '3 goldene Sterne + Eichenlaub' },
    { id: 'Gen', label: 'Gen', title: 'General', age: 'gen', years: '63', mark: 'großer Stern + goldene Tresse' }
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
  var VER = '9';

  function rankMeta(rank) {
    var id = String(rank || 'Lt');
    var j;
    for (j = 0; j < RANKS.length; j++) if (RANKS[j].id === id) return RANKS[j];
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
    var m = s.match(/^(f\d{2})(?:-([a-z]+))?(?:-([a-z]+))?/);
    if (!m) return null;
    var uni = m[2] || 'dienst';
    var hat = m[3] || 'none';
    if (uni === 'base') { uni = 'dienst'; hat = 'none'; }
    if (hat === 'y' || hat === 'm' || hat === 's' || hat === 'lt' || hat === 'olt' ||
        hat === 'hptm' || hat === 'maj' || hat === 'obstlt' || hat === 'obst' || hat === 'gen') {
      hat = 'none';
    }
    if (!UNI_IDS[uni]) uni = 'dienst';
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

  function exactName(kit, rank) {
    kit = kit || {};
    return (kit.face || 'f01') + '-' + (kit.uniform || 'dienst') + '-' + (kit.hat || 'none') + '-' + rankMeta(rank).age;
  }

  function candidates(id, rank) {
    var kit = parseKit(id);
    if (!kit) return [legacyUrl(id)];
    return [fileUrl(exactName(kit, rank))];
  }

  function src(id, rank) {
    return candidates(id, rank)[0];
  }

  function bindImg(img, id, rank) {
    if (!img) return;
    var url = candidates(id, rank)[0];
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
    img.removeAttribute('data-cands');
    img.removeAttribute('data-ci');
    img.onerror = null;
    img.src = url;
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
    exactName: exactName,
    candidates: candidates,
    src: src,
    bindImg: bindImg,
    faceThumb: faceThumb,
    uniformThumb: uniformThumb,
    hatThumb: hatThumb,
    legacyUrl: legacyUrl
  };
})(window);
