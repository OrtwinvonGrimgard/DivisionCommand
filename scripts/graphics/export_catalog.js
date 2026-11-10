/**
 * Exportiert den autoritativen Katalog (ohne Darstellungs-Overrides) als JSON.
 * Nur Lesen; mutiert keine Kartendaten.
 */
'use strict';
// Source catalog only: presentation overrides never mutate authoritative records.
const fs=require('fs'),path=require('path'),vm=require('vm');
const L=require('../nation_pools/load_game'),w=L.loadGame({quiet:true});
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(L.WEB,'js/data/table-art-data.js'),'utf8'),ctx);
const out={baseline:'7a7c7c33e2fa8199a6335c240f187c904150f226',cards:w.DC_CATALOG.cards,keywords:w.DC_KEYWORDS,art:ctx.window.DC_TABLE_ART,legacy_images:Object.fromEntries(w.DC_CATALOG.cards.map(c=>[c.id,c.image?w.dcCardFile(c.image):'']))};
if(require.main===module)process.stdout.write(JSON.stringify(out,null,2));else module.exports=out;
