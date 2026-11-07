#!/usr/bin/env node
'use strict';
const fs = require('fs'), path = require('path');
const {migrate} = require('./migrate.js');
const root = path.join(__dirname, '../..'), types = path.join(root,'Division_Command_0.5a/web/js/data/sets/types');
// Die JSON-Arrays der alten Typdateien sind die hier benutzte kanonische Quelle.
// Editor-Altspiegel werden absichtlich nicht als zweite aktive Bibliothek behandelt.
for (const file of fs.readdirSync(types).filter(f => f.endsWith('.js') && !['nation_pools.js','tactical.js'].includes(f))) {
  const p = path.join(types,file), s=fs.readFileSync(p,'utf8');
  const m=s.match(/(window\.DC_SET_TYPES\[[^\]]+\]\s*=\s*)(\[[\s\S]*\])(\s*;\s*)$/);
  if (!m) continue;
  const a=JSON.parse(m[2]); a.forEach(migrate);
  fs.writeFileSync(p,s.slice(0,m.index)+m[1]+JSON.stringify(a,null,2)+m[3]);
}
const cards=require('./cards.json');
fs.writeFileSync(path.join(types,'tactical.js'),'/* Erzeugt: node scripts/tactics/build.js; additive allgemeine Erprobungskarten. */\nwindow.DC_SET_TYPES = window.DC_SET_TYPES || {};\nwindow.DC_SET_TYPES.Taktikentwuerfe = '+JSON.stringify(cards,null,2)+';\n');
console.log('Taktikentwürfe:',cards.length);

// Erinnerungen werden aus derselben freigegebenen Regelquelle gebaut.
const glossary=Object.assign({},require('./migrate').REMINDERS);
for (const p of require('./approved-proposals.json').proposals) glossary[p.name]=p.exact_rule.replace(new RegExp('^'+p.name+'(?: 2)?[: ]*'),'');
const kp=path.join(types,'../../keywords.js');
let kw=fs.readFileSync(kp,'utf8');
const block='  /* t203:auto */\n  Object.assign(K, '+JSON.stringify(glossary,null,2)+');\n  /* /t203:auto */\n';
kw=kw.replace(/  \/\* t203:auto \*\/[\s\S]*?  \/\* \/t203:auto \*\/\n/,'');
kw=kw.replace('  /* Umsetzungshinweise',block+'  /* Umsetzungshinweise');
fs.writeFileSync(kp,kw);
