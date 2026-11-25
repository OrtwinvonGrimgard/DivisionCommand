/**
 * Offiziersporträts (t349): datengetrieben aus window.DC_PORTRAIT_MANIFEST (js/data/portrait-manifest.js).
 * Ölketten: Nation × Uniform × Person (m1, m2, f1, f2) × 16 Ränge, darüber Narben- und Mützen-Ebenen
 * (Alpha-Layer gleicher Größe, z-Reihenfolge Bild → Narben → höchstens eine Mütze).
 * Nationen ohne Ölkette fallen auf Altporträts (Gesichter f01–f16) zurück; fehlende Optionen meldet
 * das Menü als „folgt“. Neue Nation = Export + Manifest neu bauen, kein UI-Umbau.
 *
 * Kit-IDs: neu  oel-<nation>-<uniform>-<person>-<hut|none>-<narbe+narbe|none>
 *          alt  fNN-kampf-none (wird bei Ölketten-Gesichtern automatisch migriert)
 */
(function (w) {
  'use strict';

  var MAN = w.DC_PORTRAIT_MANIFEST || { base: 'assets/portraits/oel_ketten/', ranks: [], nations: [] };
  var BASE = MAN.base || 'assets/portraits/oel_ketten/';
  var VER = '27';

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
  var FACE_FILE = {
    f01: 'Vael/male/01.png', f02: 'Vael/male/02.png', f03: 'Rothain/male/01.png', f04: 'Rothain/male/02.png',
    f05: 'Steinmark/male/01.png', f06: 'Steinmark/male/02.png', f07: 'Vesper/male/01.png', f08: 'Vesper/male/02.png',
    f09: 'Karsk/male/01.png', f10: 'Karsk/male/02.png', f11: 'Sahr/male/01.png', f12: 'Sahr/male/02.png',
    f13: 'Ossar/male/01.png', f14: 'Ossar/male/02.png', f15: 'Jetzt/male/01.png', f16: 'Jetzt/male/02.png'
  };
  var RIGHT_FILE = { f09: 'Karsk/male/01-right.png', f10: 'Karsk/male/02-right.png' };

  /* 16 Ränge; ids der alten 13 Ränge bleiben (Spielstände), drei neue: OFhr, StHptm, GenOb. */
  var RANK_DEF = [
    ['Fhr', 'Fhr', 'fhr', 'Kadettenzeichen'],
    ['OFhr', 'OFhr', 'ofhr', 'Kadettenzeichen und Litze'],
    ['Lt', 'Lt', 'lt', 'Kompanie 1'],
    ['OLt', 'OLt', 'olt', 'Kompanie 2'],
    ['Hptm', 'Hptm', 'hptm', 'Kompanie 3'],
    ['StHptm', 'StHptm', 'sthptm', 'Kompanie 4'],
    ['Maj', 'Maj', 'maj', 'Stab 1'],
    ['Obstlt', 'Obstlt', 'obstlt', 'Stab 2'],
    ['Obst', 'Obst', 'obst', 'Stab 3'],
    ['Bg', 'Bg', 'bg', 'General 1'],
    ['Genmj', 'GenMj', 'genmj', 'General 2'],
    ['Genlt', 'GenLt', 'genlt', 'General 3'],
    ['Gen', 'Gen', 'gen', 'General 4'],
    ['GenOb', 'GenOb', 'genob', 'General 5'],
    ['Fm', 'FM', 'fm', 'Marschallzeichen'],
    ['Gfm', 'GFM', 'gfm', 'Marschallzeichen und Zusatz']
  ];
  var DEFAULT_TITLES = ['Fähnrich', 'Oberfähnrich', 'Leutnant', 'Oberleutnant', 'Hauptmann', 'Stabshauptmann', 'Major',
    'Oberstleutnant', 'Oberst', 'Brigadegeneral', 'Generalmajor', 'Generalleutnant', 'General', 'Generaloberst',
    'Feldmarschall', 'Generalfeldmarschall'];
  var DEFAULT_FILES = ['faehnrich', 'oberfaehnrich', 'leutnant', 'oberleutnant', 'hauptmann', 'stabshauptmann', 'major',
    'oberstleutnant', 'oberst', 'brigadegeneral', 'generalmajor', 'generalleutnant', 'general', 'generaloberst',
    'feldmarschall', 'generalfeldmarschall'];
  var RANKS = RANK_DEF.map(function (r, i) {
    var m = (MAN.ranks || [])[i] || {};
    return { id: r[0], label: r[1], title: m.name || DEFAULT_TITLES[i], age: r[2], index: i + 1,
      years: String(m.age || ''), mark: r[3], file: m.id || DEFAULT_FILES[i] };
  });
  var AGE_LABEL = {};
  RANKS.forEach(function (r) {
    AGE_LABEL[r.age] = r.index <= 2 ? 'Kadett' : r.index <= 6 ? 'Kompanie' : r.index <= 9 ? 'Stab' : r.index <= 14 ? 'General' : 'Marschall';
  });

  var PERSON_LABEL = { m1: 'Offizier 1', m2: 'Offizier 2', f1: 'Offizierin 1', f2: 'Offizierin 2' };
  var PERSONS = ['m1', 'm2', 'f1', 'f2'];
  var HAT_LABEL = { none: 'Ohne', schirmmuetze: 'Schirmmütze', feldmuetze: 'Feldmütze', barett: 'Barett' };
  var SCAR_LABEL = { wange: 'Wange', braue: 'Braue', kiefer: 'Kiefer' };
  var SCARS_STD = ['wange', 'braue', 'kiefer'];
  var SOON = 'folgt';

  /* Kompatibilität: alte Konstanten des Gesichts-Editors. */
  var UNIFORMS = [{ id: 'kampf', label: 'Kampfanzug', hint: 'die Uniform sitzt schon im Bild' }];
  var HATS = [{ id: 'none', label: 'Ohne' }];

  var NATIONS = MAN.nations || [];
  var NAT = {};
  NATIONS.forEach(function (n) { NAT[n.id] = n; });
  var FACE_TO = {};
  NATIONS.forEach(function (n) {
    if (n.legacy) Object.keys(n.legacy).forEach(function (p) { FACE_TO[n.legacy[p]] = { nation: n.id, person: p }; });
  });

  function hasOil(n) { return !!(n && n.uniforms && n.uniforms.length); }
  function uniformOf(n, uid) {
    if (!n || !n.uniforms) return null;
    for (var k = 0; k < n.uniforms.length; k++) if (n.uniforms[k].id === uid) return n.uniforms[k];
    return null;
  }
  function oilPerson(n, uid, p) {
    var u = uniformOf(n, uid);
    return (u && u.persons && u.persons[p]) || null;
  }

  function rankMeta(rank) {
    var id = String(rank || 'Lt');
    var j;
    for (j = 0; j < RANKS.length; j++) if (RANKS[j].id === id) return RANKS[j];
    var low = id.toLowerCase();
    var alias = [
      [/generalfeld|gfm/, 'Gfm'],
      [/feldmarschall|^fm$/, 'Fm'],
      [/generaloberst|genob/, 'GenOb'],
      [/brigade|^bg$/, 'Bg'],
      [/generalmajor|genmj/, 'Genmj'],
      [/generalleut|genlt/, 'Genlt'],
      [/^gen$|general$/, 'Gen'],
      [/obstlt|oberstleut/, 'Obstlt'],
      [/obst|oberst/, 'Obst'],
      [/maj/, 'Maj'],
      [/sthptm|stabshaupt/, 'StHptm'],
      [/hptm|haupt/, 'Hptm'],
      [/olt|oberleut/, 'OLt'],
      [/^lt$|leutnant/, 'Lt'],
      [/ofhr|oberf(ae|ä)hn/, 'OFhr'],
      [/fhr|faehn|fähn/, 'Fhr']
    ];
    for (var a = 0; a < alias.length; a++) {
      if (alias[a][0].test(low)) {
        for (j = 0; j < RANKS.length; j++) if (RANKS[j].id === alias[a][1]) return RANKS[j];
      }
    }
    return RANKS[0];
  }
  function ageOf(rank) { return rankMeta(rank).age; }

  /* ---------- Kits ---------- */
  function cleanScars(list, allowed) {
    var out = [];
    (list || []).forEach(function (s) {
      if (SCARS_STD.indexOf(s) >= 0 && (!allowed || allowed.indexOf(s) >= 0) && out.indexOf(s) < 0) out.push(s);
    });
    return SCARS_STD.filter(function (s) { return out.indexOf(s) >= 0; });
  }

  /** Bringt jede Auswahl auf einen gültigen Stand (verfügbare Person/Uniform/Mütze/Narben). */
  function normalize(kit) {
    kit = kit || {};
    var n = NAT[kit.nation];
    if (!n && kit.face && FACE_TO[kit.face]) { n = NAT[FACE_TO[kit.face].nation]; kit.person = kit.person || FACE_TO[kit.face].person; }
    if (!n || (!hasOil(n) && !n.legacy)) n = NAT.rothain || NATIONS.filter(function (x) { return hasOil(x) || x.legacy; })[0];
    var out = { nation: n ? n.id : '', person: 'm1', uniform: 'kampf', hat: 'none', scars: [], face: '' };
    if (!n) { out.face = kit.face || 'f01'; return out; }
    var person = PERSONS.indexOf(kit.person) >= 0 ? kit.person : 'm1';
    if (hasOil(n)) {
      if (n.persons.indexOf(person) < 0) person = n.persons[0];
      var u = oilPerson(n, kit.uniform, person) ? kit.uniform : null;
      if (!u) n.uniforms.some(function (x) { if (x.persons[person]) { u = x.id; return true; } return false; });
      var rec = oilPerson(n, u, person);
      out.person = person;
      out.uniform = u;
      out.hat = rec.caps.indexOf(kit.hat) >= 0 ? kit.hat : 'none';
      out.scars = cleanScars(kit.scars, rec.scars);
      return out;
    }
    if (!n.legacy[person]) person = n.legacy.m1 ? 'm1' : Object.keys(n.legacy)[0];
    out.person = person;
    out.face = n.legacy[person];
    return out;
  }

  function isOil(kit) { return !!(kit && kit.uniform && kit.uniform !== 'kampf' && hasOil(NAT[kit.nation])); }

  function kitId(kit) {
    kit = kit || {};
    if (isOil(kit)) {
      return ['oel', kit.nation, kit.uniform, kit.person || 'm1', kit.hat || 'none',
        (kit.scars && kit.scars.length) ? kit.scars.join('+') : 'none'].join('-');
    }
    return (kit.face || 'f01') + '-kampf-none';
  }

  /** Liest neue und alte IDs. Alte Ölketten-Gesichter (f03 …) werden auf die Kette der Nation migriert. */
  function parseKit(id) {
    var s = String(id || '');
    var m = s.match(/^oel-([a-z]+)-([a-z]+)-([mf][12])-([a-z]+)-([a-z+]+)/);
    if (m) {
      return normalize({ nation: m[1], uniform: m[2], person: m[3], hat: m[4], scars: m[5] === 'none' ? [] : m[5].split('+') });
    }
    m = s.match(/^(f\d{2})(?:-|$)/);
    if (!m || !FACE_FILE[m[1]]) return null;
    var to = FACE_TO[m[1]];
    if (to && hasOil(NAT[to.nation])) return normalize({ nation: to.nation, person: to.person });
    return { nation: to ? to.nation : '', person: to ? to.person : 'm1', uniform: 'kampf', hat: 'none', scars: [], face: m[1] };
  }

  /** Spielerakte (localStorage dc_users) → Kit; migriert alte Felder face/uniform/hat. */
  function kitFromUser(u) {
    if (!u) return normalize({});
    var k = null;
    if (u.nation && NAT[u.nation]) {
      k = normalize({ nation: u.nation, person: u.person, uniform: u.uniform, hat: u.hat, scars: u.scars, face: u.face });
    }
    if (!k) k = parseKit(u.portrait) || (u.face && parseKit(u.face)) || normalize({});
    return k;
  }

  /* ---------- Bildpfade ---------- */
  function pad(i) { return (i < 10 ? '0' : '') + i; }
  function oilFile(kit, rank, layer) {
    var r = rankMeta(rank);
    var dir = kit.nation + '/' + kit.uniform + '/' + kit.person + '/';
    if (layer === 'scar') return BASE + dir + 'scars/' + rank + '.webp?v=' + VER; // rank = Narbe
    var name = pad(r.index) + '_' + r.file + '.webp?v=' + VER;
    if (layer) return BASE + dir + 'muetzen/' + layer + '/' + name;
    return BASE + dir + name;
  }
  function legacyFile(face, rank) {
    var file = FACE_FILE[face];
    if (!file) return '';
    var age = ageOf(rank);
    if (age === 'lt') file = file.replace('male/', 'male/leutnant/');
    else if (age === 'olt') file = file.replace('male/', 'male/oberleutnant/');
    else if (age === 'hptm' || age === 'sthptm') file = file.replace('male/', 'male/hauptmann/');
    return 'assets/portraits/' + file + '?v=' + VER;
  }

  /** Alle Ebenen von unten nach oben. */
  function layers(id, rank) {
    var kit = typeof id === 'object' ? normalize(id) : parseKit(id);
    if (!kit) return [];
    if (!isOil(kit)) { var f = legacyFile(kit.face, rank); return f ? [f] : []; }
    var out = [oilFile(kit, rank)];
    (kit.scars || []).forEach(function (s) { out.push(oilFile(kit, s, 'scar')); });
    if (kit.hat && kit.hat !== 'none') out.push(oilFile(kit, rank, kit.hat));
    return out;
  }

  /* ---------- Komposit (Canvas, Cache) ---------- */
  var cache = {};
  var cacheOrder = [];
  var pending = {};
  function key(id, rank) {
    var kit = typeof id === 'object' ? normalize(id) : parseKit(id);
    return kit ? kitId(kit) + '@' + rankMeta(rank).id : '';
  }
  function loadImg(url) {
    return new Promise(function (res, rej) {
      var im = new w.Image();
      im.decoding = 'async';
      im.onload = function () { res(im); };
      im.onerror = function () { rej(new Error('load ' + url)); };
      im.src = url;
    });
  }
  function publish(k, url) {
    if (!w.document || !w.document.querySelectorAll) return;
    var list = w.document.querySelectorAll('img[data-dcp-key]');
    for (var j = 0; j < list.length; j++) if (list[j].getAttribute('data-dcp-key') === k) list[j].src = url;
  }
  function compose(id, rank) {
    var k = key(id, rank);
    if (!k) return Promise.resolve('');
    if (cache[k]) return Promise.resolve(cache[k]);
    if (pending[k]) return pending[k];
    var urls = layers(id, rank);
    if (urls.length < 2 || !w.document || typeof w.document.createElement !== 'function' || typeof w.Promise !== 'function') {
      return Promise.resolve(urls[0] || '');
    }
    pending[k] = Promise.all(urls.map(loadImg)).then(function (ims) {
      var c = w.document.createElement('canvas');
      if (!c || !c.getContext) return urls[0];
      c.width = ims[0].naturalWidth || 864;
      c.height = ims[0].naturalHeight || 1152;
      var g = c.getContext('2d');
      if (!g) return urls[0];
      ims.forEach(function (im) { g.drawImage(im, 0, 0, c.width, c.height); });
      var url;
      try { url = c.toDataURL('image/webp', 0.9); } catch (e) { return urls[0]; } // file:// → Basisbild
      if (!url || url.length < 32) return urls[0];
      cache[k] = url;
      cacheOrder.push(k);
      if (cacheOrder.length > 160) delete cache[cacheOrder.shift()];
      publish(k, url);
      return url;
    }).catch(function () { return urls[0]; }).then(function (u) { delete pending[k]; return u; });
    return pending[k];
  }

  /** Synchron: fertiges Komposit aus dem Cache, sonst Basisbild (Komposit wird nachgereicht, s. data-dcp-key). */
  function src(id, rank) {
    var urls = layers(id, rank);
    if (!urls.length) return '';
    if (urls.length > 1) {
      var k = key(id, rank);
      if (cache[k]) return cache[k];
      compose(id, rank);
    }
    return urls[0];
  }
  function candidates(id, rank) { var u = src(id, rank); return u ? [u] : []; }
  function has(id, rank) { return layers(id, rank).length > 0; }

  function bindImg(img, id, rank) {
    if (!img) return;
    img.setAttribute('loading', img.getAttribute('loading') || 'lazy');
    img.setAttribute('decoding', 'async');
    img.removeAttribute('data-cands');
    img.onerror = function () { this.removeAttribute('src'); };
    var k = key(id, rank);
    if (k) img.setAttribute('data-dcp-key', k); else img.removeAttribute('data-dcp-key');
    var url = src(id, rank);
    if (url) img.src = url;
    else { img.removeAttribute('src'); img.alt = ''; }
  }
  /** Attribut-Text für <img>, die per innerHTML entstehen (Komposit wird nachgetragen). */
  function imgAttrs(id, rank) {
    var k = key(id, rank);
    var u = src(id, rank);
    return (u ? ' src="' + u + '"' : '') + (k ? ' data-dcp-key="' + k + '"' : '');
  }

  function rightUrl(face, rank) {
    var file = RIGHT_FILE[String(face || '')];
    if (!file) return '';
    var age = ageOf(rank || 'Fhr');
    if (age === 'lt') file = file.replace('male/', 'male/leutnant/');
    else if (age === 'olt') file = file.replace('male/', 'male/oberleutnant/');
    else if (age === 'hptm' || age === 'sthptm') file = file.replace('male/', 'male/hauptmann/');
    return 'assets/portraits/' + file + '?v=' + VER;
  }
  function legacyUrl() { return 'assets/portraits/Vael/male/01.png?v=' + VER; }

  /* ---------- Menü-Optionen (mit „folgt“ für fehlende Assets) ---------- */
  function nations() {
    return NATIONS.map(function (n) {
      var oil = hasOil(n);
      return { id: n.id, label: n.label, oil: oil, available: oil || !!n.legacy,
        status: oil ? 'Ölkette' : (n.legacy ? 'Altporträt' : SOON) };
    });
  }
  function personsFor(nation) {
    var n = NAT[nation];
    return PERSONS.map(function (p) {
      var ok = !!n && (hasOil(n) ? n.persons.indexOf(p) >= 0 : !!(n.legacy && n.legacy[p]));
      return { id: p, label: PERSON_LABEL[p], available: ok, note: ok ? '' : SOON };
    });
  }
  function uniformsForKit(kit) {
    var n = NAT[kit.nation];
    if (!n) return [];
    if (!hasOil(n)) return [{ id: 'kampf', label: 'Altporträt', available: true, note: '' }, { id: '', label: 'Ölkette', available: false, note: SOON }];
    return n.uniforms.map(function (u) {
      var ok = !!u.persons[kit.person];
      return { id: u.id, label: u.label, available: ok, note: ok ? '' : SOON };
    });
  }
  function hatsForKit(kit) {
    var n = NAT[kit.nation];
    var rec = n && hasOil(n) ? oilPerson(n, kit.uniform, kit.person) : null;
    var types = (n && n.headgear && n.headgear.length) ? n.headgear : ['schirmmuetze', ''];
    var out = [{ id: 'none', label: HAT_LABEL.none, available: true, note: '' }];
    types.forEach(function (t, i) {
      var ok = !!(rec && t && rec.caps.indexOf(t) >= 0);
      out.push({ id: t || ('typ' + (i + 1)), label: t ? (HAT_LABEL[t] || t) : 'Zweite Mütze', available: ok, note: ok ? '' : SOON });
    });
    return out;
  }
  function scarsForKit(kit) {
    var n = NAT[kit.nation];
    var rec = n && hasOil(n) ? oilPerson(n, kit.uniform, kit.person) : null;
    return SCARS_STD.map(function (s) {
      var ok = !!(rec && rec.scars.indexOf(s) >= 0);
      return { id: s, label: SCAR_LABEL[s], available: ok, on: (kit.scars || []).indexOf(s) >= 0, note: ok ? '' : SOON };
    });
  }
  /* Alte API (Gesichtsraster) bleibt für Altaufrufer erhalten. */
  function uniformsFor() { return UNIFORMS.slice(); }
  function hatsFor() { return HATS.slice(); }
  function exactName(kit, rank) { return kitId(kit) + '-' + ageOf(rank); }
  function faceThumb(face) { return src(face + '-kampf-none', 'Lt'); }
  function uniformThumb(face, uniform) { return src(face + '-' + uniform + '-none', 'Lt'); }
  function hatThumb(face, uniform, hat) { return src(face + '-' + uniform + '-' + hat, 'Lt'); }

  /** Gegner im Botspiel: deterministisch aus dem Seed eine fertige Ölkette. */
  function botKitId(seed) {
    var oil = NATIONS.filter(hasOil);
    if (!oil.length) return 'f07-kampf-none';
    var s = Math.abs(Number(seed) || 0);
    var n = oil[s % oil.length];
    var p = n.persons[Math.floor(s / 7) % n.persons.length];
    var u = n.uniforms[Math.floor(s / 3) % n.uniforms.length].id;
    var kit = normalize({ nation: n.id, person: p, uniform: u, hat: (n.headgear || [])[Math.floor(s / 5) % 3] || 'none' });
    return kitId(kit);
  }
  function botRank(seed) { return RANKS[4 + (Math.abs(Number(seed) || 0) % 6)].id; }

  var HAVE = {};
  FACES.forEach(function (f) { HAVE[f.id + '-kampf-none'] = RANKS.map(function (r) { return r.age; }).join(','); });

  w.DCPortrait = {
    MANIFEST: MAN,
    FACES: FACES,
    UNIFORMS: UNIFORMS,
    HATS: HATS,
    RANKS: RANKS,
    PERSONS: PERSONS,
    AGE_LABEL: AGE_LABEL,
    SOON: SOON,
    VER: VER,
    parseKit: parseKit,
    normalize: normalize,
    kitFromUser: kitFromUser,
    kitId: kitId,
    isOil: isOil,
    ageOf: ageOf,
    rankMeta: rankMeta,
    layers: layers,
    compose: compose,
    key: key,
    candidates: candidates,
    exactName: exactName,
    has: has,
    HAVE: HAVE,
    nations: nations,
    personsFor: personsFor,
    uniformsForKit: uniformsForKit,
    hatsForKit: hatsForKit,
    scarsForKit: scarsForKit,
    uniformsFor: uniformsFor,
    hatsFor: hatsFor,
    src: src,
    imgAttrs: imgAttrs,
    bindImg: bindImg,
    faceThumb: faceThumb,
    uniformThumb: uniformThumb,
    hatThumb: hatThumb,
    rightUrl: rightUrl,
    legacyUrl: legacyUrl,
    botKitId: botKitId,
    botRank: botRank
  };
})(window);
