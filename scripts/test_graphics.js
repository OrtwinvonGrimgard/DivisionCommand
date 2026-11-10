'use strict';
const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),cp=require('child_process');
const ROOT=path.join(__dirname,'..'),WEB=path.join(ROOT,'Division_Command_0.5a/web');
cp.execFileSync('python3',['scripts/graphics/verify.py'],{cwd:ROOT,stdio:'inherit'});
const {setup}=require('./test_audio_actions'),h=setup('off'),{w,eng,add,click}=h;
const records=require('./graphics/graphics-manifest.json').records,faces=w.DC_CARD_FACES;
assert.equal(Object.keys(faces).length,require('./graphics/graphics-manifest.json').new_faces);assert(Object.keys(faces).length>=1105);
for(const r of records.filter(r=>r.ready))assert(r.output.startsWith('faces-v2/'),'gfx2 face '+r.id);
for(const r of records){const c=w.DC_CATALOG.cards.find(c=>c.id===r.id);assert(c);
 if(faces[r.id]){assert.equal(w.dcCardImage(c),r.output);assert.equal(w.dcCardFile(r.output),r.output);assert(!w.DCCardPh.is(c));assert(fs.existsSync(path.join(WEB,'assets/cards',r.output)));}
 else if(r.provenance==='missing_illustration'){assert(w.DCCardPh.is(c));assert(!w.dcCardImage(c));assert(!faces[c.id]);}
 else assert.equal(c.typ,'Token');
}
// Same full-resolution face across hand, 2.5D slot and inspect; hidden must not leak it.
const c=w.DC_CATALOG.cards.find(c=>c.id==='dc_tac_haltezug_am_knotenpunkt');const u=add(c.id);w.dcRender();
assert(w.document.querySelector(`#hand [data-uid="${u.uid}"] img.art`).getAttribute('src').endsWith(faces[c.id].file));
click(`#hand [data-uid="${u.uid}"]`);click('#my-front .slot.legal');
const el=w.document.querySelector(`#my-front [data-uid="${u.uid}"]`);assert(el);
assert(el.querySelector('.slot-face-img').getAttribute('src').endsWith(faces[c.id].file));
el.dispatchEvent(new w.MouseEvent('dblclick',{bubbles:true,cancelable:true}));
const hero=w.document.querySelector('#inspect img.hero');assert(hero && hero.getAttribute('src').endsWith(faces[c.id].file));
click('#inspect [data-act="close"]');const conceal=eng.instFromId(c.id,1);conceal.facedown=true;eng.player(1).front.L[0]=conceal;w.dcRender();
assert(!w.document.querySelector(`#enemy-front [data-uid="${conceal.uid}"] img`),'hidden opposing board card has no face image');
assert(!w.DCTableArt.html(c,true).includes(faces[c.id].file));
// Collection/deckbuilder must not bypass the same current full face or use stale embedded thumbs.
w.eval(fs.readFileSync(path.join(WEB,'js/ui/library.js'),'utf8'));w.DCLib.render();
const collection=new Map(Array.from(w.document.querySelectorAll('#lib-list [data-add]'),el=>[el.dataset.add,el]));
for(const r of records.filter(r=>r.ready && r.type!=='Token')){
 assert(collection.has(r.id));const imgs=collection.get(r.id).querySelectorAll('img');assert(imgs.length,`collection face ${r.id}`);
 imgs.forEach(img=>{assert(img.getAttribute('src').endsWith(r.output),`collection current full face ${r.id}`);assert.equal(img.style.objectFit,'contain');});
}
// All non-doctrine cards now have art; keep the placeholder check for any future unfinished card.
const unfinished=records.find(r=>r.provenance==='missing_illustration');if(unfinished)assert(collection.get(unfinished.id).querySelector('.card-ph'));
// The source model remains unchanged: presentation manifest alone retires a placeholder.
assert.equal(c.art_status,'platzhalter');assert(!c.image);
const html=fs.readFileSync(path.join(WEB,'index.html'),'utf8');assert(html.indexOf('js/data/card-faces.js')>html.indexOf('js/data/catalog.js'));assert(html.indexOf('js/data/card-faces.js')<html.indexOf('js/ui/app.js'));assert(html.includes('app.js?v=alpha40l'));
assert(fs.readFileSync(path.join(WEB,'sw.js'),'utf8').includes('divcmd-alpha40l'));
console.log('PASS graphics UI: ready-only routing; full-resolution hand/slot/inspect/collection/deckbuilder; hidden privacy; no unfinished artwork relabelled; rule records unchanged');
h.dom.window.close();
