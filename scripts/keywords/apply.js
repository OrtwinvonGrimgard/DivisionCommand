#!/usr/bin/env node
/**
 * Schreibt Schlüsselwörter in die Kartendaten (alte Sets und Nationenpools).
 * Idempotent; Protokoll in `conversion_log.json`.
 */
'use strict';
/* Schreibt Schlüsselwörter in die Kartendaten:
   - alte Sets: web/js/data/sets/types/*.js (JSON-Arrays) → Feld "keywords", umgestellter "text"
   - Nationenpools: scripts/nation_pools/nations/*.js → Token "kw:Wort" in der Effektspalte
   Idempotent: bereits vorhandene keywords bleiben unverändert. Protokoll: scripts/keywords/conversion_log.json */
const fs = require('fs'), path = require('path'), vm = require('vm');
const A = require('./assign_lib.js');
const ROOT = path.join(__dirname, '..', '..');
const TYPES = path.join(ROOT, 'Division_Command/web/js/data/sets/types');
const log = [];
for (const f of fs.readdirSync(TYPES)) {
  if (!f.endsWith('.js') || f === 'nation_pools.js') continue;
  const file = path.join(TYPES, f), src = fs.readFileSync(file, 'utf8');
  const m = src.match(/^([\s\S]*?window\.DC_SET_TYPES\["([^"]+)"\] = )(\[[\s\S]*\]);?\s*$/);
  if (!m) { console.log('übersprungen (Format):', f); continue; }
  const arr = JSON.parse(m[3]);
  if (JSON.stringify(arr, null, 2) !== m[3]) { console.log('übersprungen (Rundreise):', f); continue; }
  let n = 0;
  arr.forEach((c) => {
    if (c.typ !== 'Einheit' || Array.isArray(c.keywords)) return;
    const r = A.assign(c);
    if (!r.keywords.length) return;
    if (r.converted.length) log.push({ id: c.id, nation: c.nation || null, before: c.text, after: r.text, words: r.keywords, converted: r.converted.map((x) => x.from) });
    if (r.converted.length) c.effects = (c.effects || []).filter((e) => !r.keywords.some((k) => (A.REPLACES[k] || []).includes(e.code)));
    c.keywords = r.keywords; c.text = r.text; n++;
  });
  fs.writeFileSync(file, m[1] + JSON.stringify(arr, null, 2) + ';\n');
  console.log(f, n, 'Einheiten mit Schlüsselwort');
}
// Nationenpools: Kartendefinitionen aus dem Build lesen (Effekte für hides()), DSL-Zeilen ergänzen
const B = require('../nation_pools/build.js');
const NDIR = path.join(__dirname, '..', 'nation_pools', 'nations');
for (const f of fs.readdirSync(NDIR).filter((x) => x.endsWith('.js')).sort()) {
  const file = path.join(NDIR, f); let src = fs.readFileSync(file, 'utf8');
  const data = require(file); let n = 0;
  for (const [nation, block] of Object.entries(data)) {
    block.cards.forEach((line) => {
      const parts = line.split('|');
      if (!/^[IPASE]$/.test(parts[0]) || /kw:/.test(parts[6] || '')) return;
      const card = B.build(nation, block.short, line, 0);
      const r = A.assign(card);
      if (!r.keywords.length) return;
      const fx = parts[6] === '-' ? [] : parts[6].split('+');
      parts[6] = fx.concat(r.keywords.map((k) => 'kw:' + k)).join('+');
      const nl = parts.join('|');
      const q = JSON.stringify(line).slice(1, -1);
      if (!src.includes("'" + line + "'")) throw new Error('Zeile nicht gefunden: ' + line);
      src = src.replace("'" + line + "'", "'" + nl.replace(/'/g, "\\'") + "'"); n++;
    });
  }
  fs.writeFileSync(file, src); console.log(f, n, 'Pool-Einheiten mit Schlüsselwort');
}
fs.writeFileSync(path.join(__dirname, 'conversion_log.json'), JSON.stringify(log, null, 1) + '\n');
console.log('umgestellte alte Texte:', log.length);
