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
    { id: 'schirm', label: 'H02 Schirm' },
    { id: 'mutze', label: 'H03 Mütze' }
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
  var VER = '12';

  /* Nur Dateien, die wirklich im Repo liegen. Kein Request auf Fehlendes. */
  var HAVE = {
    'f01-dienst-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f01-feld-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f01-gala-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f01-historisch-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f02-dienst-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f02-dienst-schirm': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f02-feld-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f02-gala-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f02-historisch-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f02-khaki-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f02-oliv-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f02-stahl-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f02-jaeger-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f02-nacht-none': 'lt',
    'f02-luft-none': 'lt',
    'f02-burgund-none': 'lt',
    'f02-sand-none': 'lt',
    'f03-dienst-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f03-feld-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f03-gala-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f03-historisch-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f03-khaki-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f03-oliv-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f03-stahl-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f04-dienst-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f04-dienst-schirm': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f04-feld-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f04-gala-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f04-historisch-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f05-dienst-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f05-dienst-schirm': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f05-feld-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f05-gala-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f05-historisch-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f06-dienst-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f06-dienst-schirm': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f06-feld-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f06-gala-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f06-historisch-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f07-dienst-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f08-dienst-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f09-dienst-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f10-dienst-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f11-dienst-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f12-dienst-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f13-dienst-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f14-dienst-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f15-dienst-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f16-dienst-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f01-khaki-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f01-oliv-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f01-stahl-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f01-jaeger-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f01-nacht-none': 'lt',
    'f01-luft-none': 'lt',
    'f01-burgund-none': 'lt',
    'f01-sand-none': 'lt',
    'f04-khaki-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f04-oliv-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f04-stahl-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f04-jaeger-none': 'lt',
    'f04-nacht-none': 'lt',
    'f04-luft-none': 'lt',
    'f04-burgund-none': 'lt',
    'f04-sand-none': 'lt',
    'f05-khaki-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f05-oliv-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f05-stahl-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f05-jaeger-none': 'lt',
    'f05-nacht-none': 'lt',
    'f05-luft-none': 'lt',
    'f05-burgund-none': 'lt',
    'f05-sand-none': 'lt',
    'f03-jaeger-none': 'lt',
    'f03-nacht-none': 'lt',
    'f03-luft-none': 'lt',
    'f03-burgund-none': 'lt',
    'f03-sand-none': 'lt',
    'f06-khaki-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f06-oliv-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f06-stahl-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f06-jaeger-none': 'lt',
    'f06-nacht-none': 'lt',
    'f06-luft-none': 'lt',
    'f06-burgund-none': 'lt',
    'f06-sand-none': 'lt',
    'f07-feld-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f07-gala-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f07-historisch-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f07-khaki-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f07-oliv-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f07-stahl-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f07-jaeger-none': 'lt',
    'f07-nacht-none': 'lt',
    'f07-luft-none': 'lt',
    'f07-burgund-none': 'lt',
    'f07-sand-none': 'lt',
    'f08-feld-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f08-gala-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f08-historisch-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f08-khaki-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f08-oliv-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f08-stahl-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f08-jaeger-none': 'lt',
    'f08-nacht-none': 'lt',
    'f08-luft-none': 'lt',
    'f08-burgund-none': 'lt',
    'f08-sand-none': 'lt',
    'f09-feld-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f09-gala-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f09-historisch-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f09-khaki-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f09-oliv-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f09-stahl-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f09-jaeger-none': 'lt',
    'f09-nacht-none': 'lt',
    'f09-luft-none': 'lt',
    'f09-burgund-none': 'lt',
    'f09-sand-none': 'lt',
    'f10-feld-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f10-gala-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f10-historisch-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f10-khaki-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f10-oliv-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f10-stahl-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f10-jaeger-none': 'lt',
    'f10-nacht-none': 'lt',
    'f10-luft-none': 'lt',
    'f10-burgund-none': 'lt',
    'f10-sand-none': 'lt',
    'f11-feld-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f11-gala-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f11-historisch-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f11-khaki-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f11-oliv-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f11-stahl-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f11-jaeger-none': 'lt',
    'f11-nacht-none': 'lt',
    'f11-luft-none': 'lt',
    'f11-burgund-none': 'lt',
    'f11-sand-none': 'lt',
    'f12-feld-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f12-gala-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f12-historisch-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f12-khaki-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f12-oliv-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f12-stahl-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f12-jaeger-none': 'lt',
    'f12-nacht-none': 'lt',
    'f12-luft-none': 'lt',
    'f12-burgund-none': 'lt',
    'f12-sand-none': 'lt',
    'f13-feld-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f13-gala-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f13-historisch-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f13-khaki-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f13-oliv-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f13-stahl-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f13-jaeger-none': 'lt',
    'f13-nacht-none': 'lt',
    'f13-luft-none': 'lt',
    'f13-burgund-none': 'lt',
    'f13-sand-none': 'lt',
    'f14-feld-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f14-gala-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f14-historisch-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f14-khaki-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f14-oliv-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f14-stahl-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f14-jaeger-none': 'lt',
    'f14-nacht-none': 'lt',
    'f14-luft-none': 'lt',
    'f14-burgund-none': 'lt',
    'f14-sand-none': 'lt',
    'f15-feld-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f15-gala-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f15-historisch-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f15-khaki-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f15-oliv-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f15-stahl-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f15-jaeger-none': 'lt',
    'f15-nacht-none': 'lt',
    'f15-luft-none': 'lt',
    'f15-burgund-none': 'lt',
    'f15-sand-none': 'lt',
    'f16-feld-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f16-gala-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f16-historisch-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f16-khaki-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f16-oliv-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f16-stahl-none': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f16-jaeger-none': 'lt',
    'f16-nacht-none': 'lt',
    'f16-luft-none': 'lt',
    'f16-burgund-none': 'lt',
    'f16-sand-none': 'lt',
    'f01-dienst-schirm': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f01-dienst-mutze': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f02-dienst-mutze': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f03-dienst-schirm': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f03-dienst-mutze': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f04-dienst-mutze': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f05-dienst-mutze': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f06-dienst-mutze': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f07-dienst-schirm': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f07-dienst-mutze': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f08-dienst-schirm': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f08-dienst-mutze': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f09-dienst-schirm': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f09-dienst-mutze': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f10-dienst-schirm': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f10-dienst-mutze': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f11-dienst-schirm': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f11-dienst-mutze': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f12-dienst-schirm': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f12-dienst-mutze': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f13-dienst-schirm': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f13-dienst-mutze': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f14-dienst-schirm': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f14-dienst-mutze': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f15-dienst-schirm': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f15-dienst-mutze': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f16-dienst-schirm': 'lt,olt,hptm,maj,obstlt,obst,gen',
    'f16-dienst-mutze': 'lt,olt,hptm,maj,obstlt,obst,gen'
  };

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
    if (hat !== 'none' && hat !== 'schirm' && hat !== 'mutze') hat = 'none';
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
    return (kit.face || 'f01') + '-' + (kit.uniform || 'dienst') + '-' + (kit.hat || 'none') + '-' + ageOf(rank);
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
      return has((face || 'f01') + '-' + (uniform || 'dienst') + '-' + h.id, 'Lt');
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
    legacyUrl: legacyUrl
  };
})(window);
