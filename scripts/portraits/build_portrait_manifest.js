#!/usr/bin/env node
/**
 * t349: Baut web/js/data/portrait-manifest.js aus den Ölketten-Manifesten (oel_ketten/<nation>/manifest.json).
 * Eine neue Nation kommt dazu, indem ihr Export (chain2_build.py export) unter oel_ketten/<nation>/ liegt
 * und dieses Skript neu läuft. Die UI liest nur das erzeugte Manifest; kein Umbau nötig.
 * Prüft, dass jede referenzierte Datei existiert und der Dateiname der Konvention entspricht.
 * Aufruf: node scripts/portraits/build_portrait_manifest.js [--check]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const WEB = path.join(__dirname, '..', '..', 'Division_Command', 'web');
const OEL = path.join(WEB, 'assets', 'portraits', 'oel_ketten');
const OUT = path.join(WEB, 'js', 'data', 'portrait-manifest.js');

/* Reihenfolge und Anzeigenamen der 16 Nationen; legacy = Altporträts (Gesicht fNN) als Rückfall für m1/m2. */
const NATIONS = [
  ['rothain', 'Rothain', { m1: 'f03', m2: 'f04' }],
  ['karsk', 'Karsk', { m1: 'f09', m2: 'f10' }],
  ['averon', 'Averon', null],
  ['ossaria', 'Ossaria', { m1: 'f13', m2: 'f14' }],
  ['sahr', 'Sahr', { m1: 'f11', m2: 'f12' }],
  ['steinmark', 'Steinmark', { m1: 'f05', m2: 'f06' }],
  ['vael', 'Vael', { m1: 'f01', m2: 'f02' }],
  ['vesper', 'Vesper', { m1: 'f07', m2: 'f08' }],
  ['caldris', 'Caldris', null],
  ['dargan', 'Dargan', null],
  ['eldran', 'Eldran', null],
  ['lyr', 'Lyr', null],
  ['merovan', 'Merovan', null],
  ['namar', 'Namar', null],
  ['orthea', 'Orthea', null],
  ['theryn', 'Theryn', null],
  ['jetzt', 'Altbestand', { m1: 'f15', m2: 'f16' }]
];
const UNIFORM_LABEL = {
  dienstrock: 'Dienstrock', gala: 'Gala', panzer: 'Panzerrock', tech: 'Technikanzug',
  feld: 'Feldanzug', dienst: 'Dienstanzug', platte: 'Plattenrock', klage: 'Klagegewand',
  wickel: 'Wickelrock', offen: 'Offener Rock'
};
const PERSONS = ['m1', 'm2', 'f1', 'f2'];

function manifestPath(id) {
  const own = path.join(OEL, id, 'manifest.json');
  if (fs.existsSync(own)) return own;
  const root = path.join(OEL, 'manifest.json');
  if (fs.existsSync(root) && JSON.parse(fs.readFileSync(root, 'utf8')).nation === id) return root;
  return null;
}
function pad(i) { return (i < 9 ? '0' : '') + (i + 1); }

const errors = [];
let ranks = null;
let fileCount = 0;
const nations = NATIONS.map(([id, label, legacy]) => {
  const n = { id, label, legacy: legacy || null, uniforms: [], persons: [], headgear: [], scars: [] };
  const mp = manifestPath(id);
  if (!mp) return n;
  const m = JSON.parse(fs.readFileSync(mp, 'utf8'));
  if (!ranks) ranks = m.ranks.map(r => ({ id: r.id, name: r.name, age: r.approx_age }));
  else if (m.rank_ids.join() !== ranks.map(r => r.id).join()) errors.push(id + ': Rangfolge weicht ab');
  n.manifest = path.relative(OEL, mp).split(path.sep).join('/');
  const hg = new Set(); const sc = new Set(); const ps = new Set();
  Object.keys(m.uniforms).forEach(uid => {
    const persons = m.uniforms[uid].persons;
    const u = { id: uid, label: UNIFORM_LABEL[uid] || (uid[0].toUpperCase() + uid.slice(1)), persons: {} };
    PERSONS.forEach(p => {
      const rec = persons[p];
      if (!rec) return;
      ps.add(p);
      const caps = Object.keys(rec.muetzen || {});
      const scars = Object.keys(rec.scars || {});
      u.persons[p] = { caps, scars };
      caps.forEach(c => hg.add(c)); scars.forEach(s => sc.add(s));
      const want = [];
      rec.files.forEach((f, i) => {
        const conv = `${id}/${uid}/${p}/${pad(i)}_${ranks[i].id}.webp`;
        if (f !== conv) errors.push('Konvention: ' + f + ' != ' + conv);
        want.push(f);
      });
      caps.forEach(c => rec.muetzen[c].files.forEach((f, i) => {
        const conv = `${id}/${uid}/${p}/muetzen/${c}/${pad(i)}_${ranks[i].id}.webp`;
        if (f !== conv) errors.push('Konvention: ' + f + ' != ' + conv);
        want.push(f);
      }));
      scars.forEach(s => {
        const f = rec.scars[s].file;
        if (f !== `${id}/${uid}/${p}/scars/${s}.webp`) errors.push('Konvention: ' + f);
        want.push(f);
      });
      want.forEach(f => { fileCount++; if (!fs.existsSync(path.join(OEL, f))) errors.push('fehlt: ' + f); });
      if (rec.files.length !== 16) errors.push(`${id}/${uid}/${p}: ${rec.files.length} statt 16 Ränge`);
    });
    n.uniforms.push(u);
  });
  n.persons = PERSONS.filter(p => ps.has(p));
  n.headgear = (m.headgear_types || []).filter(h => hg.has(h));
  n.scars = Array.from(sc);
  return n;
});

if (errors.length) { console.error(errors.slice(0, 40).join('\n')); console.error(errors.length + ' Fehler'); process.exit(1); }

const data = { version: 1, base: 'assets/portraits/oel_ketten/', ranks, nations, files: fileCount };
const text = '/* Automatisch erzeugt von scripts/portraits/build_portrait_manifest.js (t349). Nicht von Hand ändern. */\n' +
  'window.DC_PORTRAIT_MANIFEST = ' + JSON.stringify(data, null, 1) + ';\n';
if (process.argv.includes('--check')) {
  const cur = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
  if (cur !== text) { console.error('portrait-manifest.js veraltet: node scripts/portraits/build_portrait_manifest.js'); process.exit(1); }
  console.log('portrait-manifest.js aktuell (' + fileCount + ' Dateien)');
} else {
  fs.writeFileSync(OUT, text);
  console.log('geschrieben: ' + path.relative(process.cwd(), OUT) + ' – ' + nations.filter(n => n.uniforms.length).length + ' Nationen mit Ölketten, ' + fileCount + ' Dateien');
}
