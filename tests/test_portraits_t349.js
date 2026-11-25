#!/usr/bin/env node
/**
 * t349: Offiziersporträts – Manifest-Vollständigkeit, Ebenen, Migration alter Kit-IDs, „folgt“-Optionen, Editor-Markup.
 * Läuft über `npm test`.
 */
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { JSDOM } = require('jsdom');

const ROOT = path.join(__dirname, '..');
const WEB = path.join(ROOT, 'Division_Command', 'web');

// 1) Erzeugtes Manifest ist aktuell und prüft selbst jede Datei.
execFileSync(process.execPath, [path.join(ROOT, 'scripts/portraits/build_portrait_manifest.js'), '--check'], { stdio: 'pipe' });

const dom = new JSDOM('<!doctype html><html><body></body></html>', { runScripts: 'outside-only' });
const w = dom.window;
for (const f of ['js/data/nationen.js', 'js/data/portrait-manifest.js', 'js/ui/portraits.js']) w.eval(fs.readFileSync(path.join(WEB, f), 'utf8'));
const P = w.DCPortrait;
const M = w.DC_PORTRAIT_MANIFEST;
assert(P && M, 'DCPortrait + Manifest geladen');

function fileOf(url) { return path.join(WEB, String(url).replace(/\?.*$/, '')); }
function webpSize(buf) {
  assert.equal(buf.toString('ascii', 0, 4), 'RIFF'); assert.equal(buf.toString('ascii', 8, 12), 'WEBP');
  const kind = buf.toString('ascii', 12, 16);
  if (kind === 'VP8 ') return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
  if (kind === 'VP8L') { const b = buf.readUInt32LE(21); return [(b & 0x3fff) + 1, ((b >> 14) & 0x3fff) + 1]; }
  return [1 + buf.readUIntLE(24, 3), 1 + buf.readUIntLE(27, 3)];
}

// 2) Ränge: 16, alte IDs bleiben, neue Zwischenränge.
assert.equal(P.RANKS.length, 16);
assert.deepEqual(P.RANKS.map(r => r.id), ['Fhr', 'OFhr', 'Lt', 'OLt', 'Hptm', 'StHptm', 'Maj', 'Obstlt', 'Obst', 'Bg', 'Genmj', 'Genlt', 'Gen', 'GenOb', 'Fm', 'Gfm']);
assert.equal(P.rankMeta('Generaloberst').id, 'GenOb');
assert.equal(P.rankMeta('Oberfähnrich').id, 'OFhr');
assert.equal(P.rankMeta('Stabshauptmann').id, 'StHptm');
assert.equal(P.rankMeta('Oberst').id, 'Obst');
assert.equal(P.rankMeta('Generalfeldmarschall').id, 'Gfm');
assert.equal(P.rankMeta('quatsch').id, 'Fhr');

// 3) Alle 16 Nationen + Altbestand im Manifest; fertige Ketten vollständig.
const nat = Object.keys(w.DC_NATIONS).map(s => s.toLowerCase()).sort();
assert.equal(nat.length, 16);
for (const n of nat) assert(M.nations.some(x => x.id === n), 'Nation im Manifest: ' + n);
const oil = M.nations.filter(n => n.uniforms.length);
assert.deepEqual(oil.map(n => n.id).sort(), ['averon', 'karsk', 'ossaria', 'rothain', 'sahr']);
let checked = new Set(); let chains = 0;
for (const n of oil) {
  assert.deepEqual(n.persons, ['m1', 'm2', 'f1', 'f2'], n.id + ' Personen');
  assert.equal(n.uniforms.length, 2, n.id + ' zwei Uniformen');
  assert.equal(n.headgear.length, 2, n.id + ' zwei Mützen');
  assert.deepEqual(n.scars, ['wange', 'braue', 'kiefer']);
  for (const u of n.uniforms) for (const p of n.persons) {
    chains++;
    for (const hat of ['none'].concat(n.headgear)) for (const r of P.RANKS) {
      const kit = { nation: n.id, uniform: u.id, person: p, hat, scars: ['wange', 'braue', 'kiefer'] };
      const id = P.kitId(P.normalize(kit));
      assert(id.startsWith('oel-' + n.id + '-' + u.id + '-' + p + '-' + hat + '-'), 'Kit-ID ' + id);
      assert.equal(P.kitId(P.parseKit(id)), id, 'Rundlauf ' + id);
      const ls = P.layers(id, r.id);
      assert.equal(ls.length, 1 + 3 + (hat === 'none' ? 0 : 1), 'Ebenen ' + id);
      assert(ls[0].includes('/' + String(r.index).padStart(2, '0') + '_'), 'Rang-Datei ' + ls[0]);
      for (const l of ls) {
        const f = fileOf(l);
        if (checked.has(f)) continue;
        assert(fs.existsSync(f), 'Datei fehlt: ' + l);
        const [wd, ht] = webpSize(fs.readFileSync(f));
        assert(wd === 864 && ht === 1152, 'Leinwand 864x1152: ' + l);
        checked.add(f);
      }
    }
  }
}
assert.equal(chains, 40, '40 Ketten');
assert.equal(checked.size, 5 * 408, 'alle 2040 Dateien verknüpft');

// 4) Migration alter Kit-IDs und Spielerakten.
assert.equal(P.kitId(P.parseKit('f03-kampf-none')), 'oel-rothain-dienstrock-m1-none-none');
assert.equal(P.kitId(P.parseKit('f10-kampf-none')), 'oel-karsk-panzer-m2-none-none');
assert.equal(P.kitId(P.parseKit('f14-kampf-none')), 'oel-ossaria-platte-m2-none-none');
assert.equal(P.kitId(P.parseKit('f11-kampf-none')), 'oel-sahr-wickel-m1-none-none');
assert.equal(P.kitId(P.parseKit('f05-kampf-none')), 'f05-kampf-none', 'Steinmark bleibt Altporträt');
assert(fs.existsSync(fileOf(P.layers('f05-kampf-none', 'Hptm')[0])), 'Altporträt mit Rangordner');
for (const r of P.RANKS) for (const f of P.FACES) {
  const ls = P.layers(f.id + '-kampf-none', r.id);
  assert.equal(ls.length, 1); assert(fs.existsSync(fileOf(ls[0])), 'Altporträt fehlt: ' + ls[0]);
}
assert.equal(P.parseKit('lt-01'), null);
assert(P.kitFromUser({ portrait: 'lt-01' }).nation, 'unbekannter Alt-Key -> Standard-Kit');
assert.equal(P.kitId(P.kitFromUser({ portrait: 'f09-kampf-none', face: 'f09', uniform: 'kampf', hat: 'none' })), 'oel-karsk-panzer-m1-none-none');
assert.equal(P.kitId(P.kitFromUser({ nation: 'averon', person: 'f2', uniform: 'dienst', hat: 'feldmuetze', scars: ['kiefer', 'x'] })), 'oel-averon-dienst-f2-feldmuetze-kiefer');
assert.equal(P.kitId(P.parseKit('oel-rothain-gala-f1-barett-none')), 'oel-rothain-gala-f1-none-none', 'fremde Mütze fällt weg');
assert.equal(P.kitId(P.parseKit('oel-eldran-feld-m1-none-none')), 'oel-rothain-dienstrock-m1-none-none', 'Nation ohne Assets -> Rückfall');

// 5) Menüoptionen: „folgt“ statt fehlend.
const ns = P.nations();
assert.equal(ns.length, 17);
assert.equal(ns.filter(n => n.oil).length, 5);
assert(ns.find(n => n.id === 'eldran').available === false && ns.find(n => n.id === 'eldran').status === 'folgt');
const st = P.personsFor('steinmark');
assert.deepEqual(st.map(x => x.available), [true, true, false, false]);
assert.equal(st[2].note, 'folgt');
const stKit = P.normalize({ nation: 'steinmark', person: 'm2' });
assert.equal(stKit.face, 'f06');
assert(P.hatsForKit(stKit).slice(1).every(h => !h.available && h.note === 'folgt'));
assert(P.scarsForKit(stKit).every(s => !s.available && s.note === 'folgt'));
assert.equal(P.uniformsForKit(stKit).filter(u => u.available).length, 1);
const kk = P.normalize({ nation: 'karsk', person: 'f1', uniform: 'tech' });
assert.deepEqual(P.hatsForKit(kk).map(h => h.id), ['none', 'schirmmuetze', 'barett']);
assert(P.hatsForKit(kk).every(h => h.available));
assert(P.uniformsForKit(kk).every(u => u.available));

// 6) Botgegner, Komposit-Schlüssel, synchrones src.
for (let s = 0; s < 50; s++) { const id = P.botKitId(s * 7919); assert(/^oel-/.test(id) && P.layers(id, P.botRank(s)).length >= 1, id); }
assert.equal(P.key('oel-sahr-offen-f1-schirmmuetze-braue', 'Gen'), 'oel-sahr-offen-f1-schirmmuetze-braue@Gen');
assert(P.src('oel-sahr-offen-f1-schirmmuetze-braue', 'Gen').endsWith('sahr/offen/f1/13_general.webp?v=' + P.VER));
const img = w.document.createElement('img');
P.bindImg(img, 'oel-ossaria-klage-m2-feldmuetze-none', 'GenOb');
assert.equal(img.getAttribute('data-dcp-key'), 'oel-ossaria-klage-m2-feldmuetze-none@GenOb');
assert(img.src.includes('ossaria/klage/m2/14_generaloberst.webp'));

// 7) Editor-Markup und Ladereihenfolge.
const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
for (const which of ['setup', 'user']) for (const g of ['nations', 'faces', 'uniforms', 'hats', 'scars', 'ages']) assert(html.includes('id="' + which + '-' + g + '"'), which + '-' + g);
assert(html.indexOf('js/data/portrait-manifest.js') > 0 && html.indexOf('js/data/portrait-manifest.js') < html.indexOf('js/ui/portraits.js'));
assert(html.includes('DCPortrait.imgAttrs('), 'Titelporträt mit Komposit');
const app = fs.readFileSync(path.join(WEB, 'js/ui/app.js'), 'utf8');
assert(app.includes('DCPortrait.botKitId(seed)') && app.includes('data-dcp-key'), 'Tischanzeige verknüpft');

console.log('PASS portraits t349: ' + chains + ' Ketten, ' + checked.size + ' Dateien, 16 Ränge, Migration und „folgt“ geprüft');
