#!/usr/bin/env node
'use strict';
/* Erzeugt Division_Command_0.5a/docs/karten/NATIONENPOOL_KARTEN.md und die Zahlentabelle in NATIONENPOOLS_100.md aus den echten Spieldaten. */
const fs = require('fs'), path = require('path');
const L = require('./load_game.js'); const w = L.loadGame({ quiet: true });
const C = w.DC_CATALOG.cards, root = path.join(L.WEB, '..', 'docs', 'karten');
const nat = Object.keys(w.DC_NATION_DECKS);
const R = { bronze: 'Bronze', silber: 'Silber', gold: 'Gold' };
let out = '# Nationenpool – vollständige Liste der 640 neuen Karten\n\nAutomatisch erzeugt aus `web/js/data/sets/types/nation_pools.js` (`node scripts/nation_pools/gen_docs.js`). Alle Karten: Artwork-Platzhalter (`art_status: platzhalter`), Effekte ausschließlich über bestehende Engine-Codes.\n\n';
const rows = [];
for (const n of nat) {
  const pool = C.filter((c) => c.nation === n && c.set === 'set_nation_pool');
  const start = new Set(w.DC_NATION_DECKS[n].cards);
  const all = new Set(C.filter((c) => c.nation === n && c.typ !== 'Doktrin').map((c) => c.id));
  rows.push([n, start.size, pool.length, all.size, w.DC_NATION_DECKS[n].doktrinen.length]);
  out += '## ' + n + ' (' + pool.length + ' neue Karten)\n\n';
  for (const c of pool) {
    const st = c.atk != null && /Infanterie|Panzer|Artillerie|Aufklärung|Elite/.test(c.typ) ? ' · ' + c.atk + '/' + c.def : '';
    out += '### ' + c.name + '\n`' + c.id + '` · ' + c.typ + ' · ' + R[c.rarity] + ' · ' + (c.typ === 'Soforteinsatz' ? (Math.max(0, Number(c.ap || 0)) + ' AP') : c.ap + ' AP') + st + '\n\n';
    out += ((c.keywords || []).map((k) => '- **' + k + '** (' + w.DC_KEYWORDS[k] + ')').join('\n') + ((c.keywords || []).length ? '\n' : '')) + (c.text ? '- Kurztext: ' + c.text + '\n' : '') + (c.rules || []).map((r) => '- ' + r).join('\n') + '\n- Effektcodes: ' + ((c.effects || []).map((e) => e.code).join(', ') || '–') + '\n- *' + c.flavor + '*\n\n';
  }
}
fs.writeFileSync(path.join(root, 'NATIONENPOOL_KARTEN.md'), out);
const tbl = '| Nation | vorher (einzigartige Starterkarten) | neu | nachher (Pool) | Doktrinen |\n|---|---|---|---|---|\n' + rows.map((r) => '| ' + r.join(' | ') + ' |').join('\n');
const f = path.join(root, 'NATIONENPOOLS_100.md');
if (fs.existsSync(f)) fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(/<!--TBL-->[\s\S]*?<!--\/TBL-->/, '<!--TBL-->\n' + tbl + '\n<!--/TBL-->'));
console.log(tbl);
