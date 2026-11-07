#!/usr/bin/env node
'use strict';
/* Dispatch-Regressionsprüfungen für t203: keine Bild-/Browserprüfung, kein Text-Effektparser. */
const assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),cp=require('child_process');
const L=require('./nation_pools/load_game');
const plain={set:'test',status:'live',name:'Prüfeinheit',verdeckt_ok:true,typ:'Einheit',klasse:'Infanterie',tags:['einheit','infanterie'],ap:2,atk:2,def:30,effects:[],rarity:'bronze',text:'Prüfeinheit.'};
const fixtures=[{id:'tac_air',klasse:'Flugzeug',tags:['einheit','luft']},{id:'tac_sam',typ:'Soforteinsatz',effects:[{code:'CANCEL_AIR_DAMAGE'}]}, {id:'tac_inf'}, {id:'tac_move',keywords:['Stellungswechsel']}, {id:'tac_swap',keywords:['Platztausch'],effects:[{code:'RELOCATE_HIDE'}]}, {id:'tac_hide',keywords:['Hinterhalt','Platztausch'],effects:[{code:'RELOCATE_HIDE'}]}, {id:'tac_bounce',typ:'Soforteinsatz',text:'Nimm eine eigene Einheit auf die Hand.',effects:[{code:'RETURN_TO_HAND'}]}].map(c=>Object.assign({},plain,c));
const w=L.loadGame({quiet:true,inject:w=>w.DC_SET_TYPES.TaktischePruefung=fixtures});
assert(w.DC_TACTICAL_RUNTIME);
const id=name=>w.DC_CATALOG.cards.find(c=>c.name===name && c.set==='set_tactical_review').id;
const CARD={bind:id('Haltezug am Knotenpunkt'),bind2:id('Schwerer Bindungskeil'),interdict:id('Anmarschbeobachtung'),traffic:id('Taktische Verkehrsleitstelle'),cover:id('Unterstützungsgruppe am Flügel'),cover2:id('Bewegliche Feuerbasis'),break:id('Nachhutkompanie'),break2:id('Ausweichender Spähwagen'),screen:id('Vorgeschobener Meldetrupp'),screen2:id('Beobachtungswagen am Rand')};
function fresh(){const e=L.newMatch(w,'Steinmark',7);L.clearBoard(e);e.state.active=0;e.state.turn=10;e.state.phase='main';e.state.pending=null;for(const p of e.state.players){p.ap=30;p.hand=[];p.grave=[];p.flags={};p.doctrines=[];}return e;}
function put(e,p,c,s='C',r=0){return L.put(e,p,c,s,r);}
function support(e,p,c,i=0){const x=e.instFromId(c,p);x.summonedTurn=-9;e.player(p).support[i]=x;return x;}
function act(e,p,type,x={}){const r=e.dispatch(Object.assign({type,player:p},x));assert(r.ok,type+': '+r.error);return r;}
function bad(e,p,type,x={}){const ap=e.player(p).ap;const r=e.dispatch(Object.assign({type,player:p},x));assert(!r.ok,type+' hätte scheitern müssen');assert.equal(e.player(p).ap,ap,'ungültige Aktion kostet keine AP');return r;}
function choose(e,p,target){return act(e,p,'CHOOSE_TARGET',{target});}
function ability(e,p,u){return act(e,p,'USE_ABILITY',{uid:u.uid});}
function attack(e,p,a,t){return act(e,p,'ATTACK',{uid:a.uid,target:t.uid});}
function equip(e,p,c,host){const x=e.instFromId(c,p);e.player(p).hand.push(x);act(e,p,'PLAY',{uid:x.uid});choose(e,p,host.uid);return x;}
function play(e,p,c,section='C',row=0,facedown=false){const x=e.instFromId(c,p);e.player(p).hand.push(x);act(e,p,'PLAY',{uid:x.uid,facedown});if(e.state.pending && e.state.pending.kind==='deploy')act(e,p,'CHOOSE_SLOT',{slot:{section,row}});return x;}
function end(e){assert(!e.state.pending,'keine unerwartete Auswahl beim Zugende');act(e,e.state.active,'END_TURN');}
let passed=0;
function test(name,fn){fn();passed++;console.log('  PASS '+name);}
function bindSetup(target='tac_move'){const e=fresh(),a=put(e,0,CARD.bind),t=put(e,1,target);ability(e,0,a);choose(e,0,t.uid);return {e,a,t};}
function coverSetup(){const e=fresh(),a=put(e,0,CARD.cover,'C',0),ally=put(e,0,'tac_inf','C',1),t=put(e,1,'tac_inf','C',1);t.atk=5;ability(e,0,a);choose(e,0,ally.uid);choose(e,0,t.uid);return {e,a,ally,t};}

// -------- Katalog, Volltexte, Kopien, Idempotenz und historische Kompatibilität.
test('Produktions-HTML lädt Karten vor Katalog und Laufzeit nach Engine, vor UI, ohne 404',()=>{
 const html=fs.readFileSync(path.join(L.WEB,'index.html'),'utf8');
 const files=Array.from(html.matchAll(/<script src="([^"]+)"/g),m=>m[1].split('?')[0]);
 assert(files.includes('js/data/sets/types/tactical.js'));assert(files.includes('js/engine/tactical_runtime.js'));
 assert(files.indexOf('js/data/sets/types/tactical.js')<files.indexOf('js/data/catalog.js'));
 assert(files.indexOf('js/engine/tactical_runtime.js')>files.indexOf('js/engine/doctrine_runtime.js'));
 assert(files.indexOf('js/engine/tactical_runtime.js')<files.indexOf('js/ui/app.js'));
 for(const f of files.filter(f=>f.includes('tactical')))assert(fs.existsSync(path.join(L.WEB,f)),f);
});
test('10 zusätzliche allgemeine Entwürfe, 1746 IDs, kein stiller Austausch',()=>{
 const C=w.DC_CATALOG.cards.filter(c=>c.set!=='test');assert.equal(C.length,1746);assert.equal(new Set(C.map(c=>c.id)).size,1746);
 const a=C.filter(c=>c.set==='set_tactical_review');assert.equal(a.length,10);assert.equal(a.filter(c=>c.typ==='Einheit').length,8);
 for(const c of a){assert.equal(c.nation,'neutral');assert.equal(c.art_status,'platzhalter');assert(!c.image);assert(c.text.length>500 && c.rules.length>=3);assert.equal(c.max_copies,c.rarity==='silver'?2:4);assert(w.DCKw.html(c).includes('kw-reminder'));assert(w.DC_validateDeck(Array(c.max_copies).fill(c.id),[]).ok);assert(!w.DC_validateDeck(Array(c.max_copies+1).fill(c.id),[]).ok);}
 assert.equal(C.filter(c=>c.typ==='Doktrin').length,36);assert.equal(C.filter(c=>c.typ==='Token').length,1);
 for(const [n,d] of Object.entries(w.DC_NATION_DECKS)){assert.equal(C.filter(c=>c.nation===n && !['Token','Doktrin'].includes(c.typ)).length,100);assert.equal(d.cards.length,60);assert.equal(d.doktrinen.length,2);assert(w.DC_validateDeck(d.cards,d.doktrinen).ok);}
});
test('nur identische bestehende Kerne migriert; Parameter/Abgrenzungen bleiben',()=>{
 const C=w.DC_CATALOG.cards.filter(c=>c.set!=='test'),count=k=>C.filter(c=>(c.keywords||[]).includes(k)).length;
 assert.equal(count('Indirektes Feuer'),83);assert.equal(count('Absetzen'),29);assert.equal(count('Erstschadenschutz'),14);
 for(const i of ['dc_b_feldaltar_138','dc_b_kettengebet_141','dc_b_wachsiegel_647'])assert(!(C.find(c=>c.id===i).keywords||[]).includes('Erstschadenschutz'));
 assert.equal(C.filter(c=>c.effects.some(e=>e.code==='EQUIP_NEGATE_DAMAGE')).length,8);
 assert(C.find(c=>c.id==='dc_b_kronplakette_652').text.includes('+1 DEF'));
 assert(!C.some(c=>c.set==='set_nation_pool' && /Träger 0 (?:ATK|DEF)|und 0 (?:ATK|DEF)/.test(c.text)),'0-Stat ist keine Setzung auf null');
 const original=require('./keywords/assign_lib').WORDS;assert.equal(original.length,16);original.forEach(k=>assert(w.DC_KEYWORDS[k]));
});
test('generierte Quellen und Ausgaben sind byte-idempotent',()=>{
 const files=['Division_Command_0.5a/web/js/data/sets/types/tactical.js','Division_Command_0.5a/web/js/data/sets/types/nation_pools.js','Division_Command_0.5a/web/js/data/keywords.js'];
 const before=files.map(f=>fs.readFileSync(path.join(__dirname,'..',f),'utf8'));
 cp.execFileSync(process.execPath,['scripts/tactics/build.js'],{cwd:path.join(__dirname,'..')});cp.execFileSync(process.execPath,['scripts/nation_pools/build.js'],{cwd:path.join(__dirname,'..')});
 files.forEach((f,i)=>assert.equal(fs.readFileSync(path.join(__dirname,'..',f),'utf8'),before[i],f+' reproduzierbar'));
});

// -------- Binden: echte Bewegungsprüfung, keine Schadens-/Angriffs-Synonyme.
test('Binden zahlt 1 AP, reserviert Angriff, erzeugt keinen Angriff/Schaden',()=>{
 const {e,a,t}=bindSetup();assert.equal(e.player(0).ap,29);assert.equal(a.flags.tacAttackSpentTurn,10);assert.equal(t.flags.tacBoundUntil,11);assert.equal(t.def,30);assert(!a.attackUsed);assert(!e.player(0).flags.kwAtk || !e.player(0).flags.kwAtk.length);assert(!e.player(0).flags.tacAnyAttackTurn);
 bad(e,0,'ATTACK',{uid:a.uid,target:t.uid});e._applyEffect(e.player(0),null,{code:'EXTRA_ATTACK'},a.uid);bad(e,0,'ATTACK',{uid:a.uid,target:t.uid});
});
test('Binden: falscher Besitzer/Zug, verdeckt/frisch/erschöpft und AP ungültig',()=>{
 for(const mode of ['owner','turn','hidden','fresh','exhausted','ap','noattack']){const e=fresh(),a=put(e,0,CARD.bind),t=put(e,1,'tac_inf');if(mode==='turn')e.state.active=1;if(mode==='hidden')a.facedown=true;if(mode==='fresh')a.summonedTurn=10;if(mode==='exhausted')a.flags.exhausted=true;if(mode==='ap')e.player(0).ap=0;if(mode==='noattack')a.flags.noAttack=true;bad(e,mode==='owner'?1:0,'USE_ABILITY',{uid:a.uid});assert(!t.flags.tacBoundUntil);}
});
test('Binden: Ziele offen, feindlich, legal, gleicher Abschnitt und nicht eingegraben',()=>{
 for(const mode of ['hidden','protected','othersection','friendly']){const e=fresh(),a=put(e,0,CARD.bind),t=put(e,mode==='friendly'?0:1,'tac_inf',mode==='othersection'?'L':'C',mode==='friendly'?1:0);if(mode==='hidden')t.facedown=true;if(mode==='protected')e._applyDeployProtection(t);bad(e,0,'USE_ABILITY',{uid:a.uid});}
 const e=fresh(),a=put(e,0,CARD.bind),t=put(e,1,'tac_inf');ability(e,0,a);bad(e,0,'CHOOSE_TARGET',{target:a.uid});assert.equal(e.state.pending.kind,'tac-bind');choose(e,0,t.uid);
});
test('Binden sperrt Stellungswechsel, beide Tauschhälften, Rücknahme/erzwungene Bewegung',()=>{
 const {e,a,t}=bindSetup('tac_swap');t.facedown=true;const other=put(e,1,'tac_swap','L',0);
 e.state.pending={kind:'kw-swap',player:1,uid:other.uid};bad(e,1,'CHOOSE_TARGET',{target:t.uid});
 assert.throws(()=>e._applyEffect(e.player(1),null,{code:'RETURN_TO_HAND'},t.uid),/darf/);
 assert.throws(()=>e._applyEffect(e.player(1),null,{code:'MOVE_SLOTS',param:{slots:1}},t.uid),/darf/);
 assert.equal(e.findInst(t.uid).zone,'front');assert.equal(e.player(1).hand.length,0);
 t.facedown=false;e.state.active=1;e.state.turn=11;bad(e,1,'KW_MOVE',{uid:t.uid,slot:{section:'L',row:0}});
 assert(!e._instantTargets || !e._instantTargets(e.player(1),w.DC_CATALOG.cards.find(c=>c.id==='tac_bounce')).some(c=>c.uid===t.uid));
});
test('Binder-Tod löst Bindung nicht; Opferung/Tod des Ziels bleibt möglich',()=>{
 const {e,a,t}=bindSetup();e._destroy(e.findInst(a.uid));e._tacAfterAction();assert.equal(t.flags.tacBoundUntil,11);e._destroy(e.findInst(t.uid));assert(!e.findInst(t.uid));assert(!t.flags.tacBoundUntil);
});
test('gebundene Einheit darf angreifen; Bindung endet nach ihrem nächsten Zug',()=>{
 const {e,a,t}=bindSetup();a.def=a.defMax=20;end(e);assert.equal(e.state.turn,11);attack(e,1,t,a);assert.equal(t.flags.tacBoundUntil,11);end(e);assert.equal(e.state.turn,12);assert(!t.flags.tacBoundUntil);assert(e._tacMayMove(t));
});
test('maximal ein Bindeneinsatz pro Besitzerzug und kein Erneuern laufender Bindung',()=>{
 const {e,t}=bindSetup();const b=put(e,0,CARD.bind2,'C',1);put(e,1,'tac_inf','C',1);bad(e,0,'USE_ABILITY',{uid:b.uid});
 e.player(0).flags.tacBindUsedTurn=null;const q=e._tacActivation(0,b.uid);assert(!q.choices.some(c=>c.target===t.uid));
});

// -------- Anmarschstörung: Kostenaufschlag nach Rabatt, kein Bewegungstoll.
function interdiction(section='C',sourceId=CARD.interdict){const e=fresh(),s=support(e,0,sourceId);ability(e,0,s);choose(e,0,'sec:'+section);return {e,s};}
test('Anmarschstörung: 1 AP, freie Abschnittswahl, ein Marker und einmal pro Quelle',()=>{
 const {e,s}=interdiction();assert.equal(e.player(0).ap,29);assert.equal(e.player(0).flags.tacInterdict.section,'C');bad(e,0,'USE_ABILITY',{uid:s.uid});const other=support(e,0,CARD.traffic,1);bad(e,0,'USE_ABILITY',{uid:other.uid});
 const e2=fresh(),s2=support(e2,0,CARD.interdict);ability(e2,0,s2);bad(e2,0,'CHOOSE_TARGET',{target:'sec:X'});assert(!e2.player(0).flags.tacInterdict);act(e2,0,'CANCEL_PENDING');assert.equal(e2.player(0).ap,30);
});
test('Anmarschstörung: falscher Zug/Besitzer, verdeckte Quelle, keine AP',()=>{
 for(const mode of ['turn','owner','hidden','ap']){const e=fresh(),s=support(e,0,CARD.interdict);if(mode==='turn')e.state.active=1;if(mode==='hidden')s.facedown=true;if(mode==='ap')e.player(0).ap=0;bad(e,mode==='owner'?1:0,'USE_ABILITY',{uid:s.uid});}
});
test('Einsatzaufschlag nach Heranführung/Ablösung; nur erfolgreicher Einsatz verbraucht',()=>{
 const {e}=interdiction();end(e);const p=e.player(1);p.ap=1;p.flags.kwHeran=11;p.flags.kwRelief={C0:{until:12}};const c=e.instFromId('tac_inf',1);p.hand.push(c);act(e,1,'PLAY',{uid:c.uid});
 bad(e,1,'CHOOSE_SLOT',{slot:{section:'C',row:0}});assert(p.hand.includes(c));assert(e.player(0).flags.tacInterdict);assert(p.flags.kwRelief.C0);
 p.ap=2;act(e,1,'CHOOSE_SLOT',{slot:{section:'C',row:0}});assert.equal(p.ap,0);assert(!e.player(0).flags.tacInterdict);assert.equal(e.findInst(c.uid).zone,'front');
});
test('kostenloser Hand-/Ablage-Einsatz kostet unter Anmarschstörung genau 1 AP',()=>{
 for(const from of ['hand','grave']){const {e}=interdiction('L');end(e);const p=e.player(1),c=e.instFromId('tac_inf',1);p.ap=0;p[from].push(c);
  const fx=from==='hand'?{code:'PLAY_FREE'}:{code:'RETURN_UNIT_GRAVE',param:{def:2}};
  e._applyEffect(p,null,fx);assert(p[from].includes(c));assert(!p.front.L[0]);assert(e.player(0).flags.tacInterdict);
  p.ap=1;e._applyEffect(p,null,fx);assert.equal(p.ap,0);assert.equal(p.front.L[0].uid,c.uid);assert(!e.player(0).flags.tacInterdict);
 }
});
test('keine Auslösung durch Bewegung, Tausch, Unterstützung/Ausrüstung oder andere Abschnitte',()=>{
 const {e}=interdiction();end(e);const p=e.player(1);p.ap=30;const u=put(e,1,'tac_move','L',0);act(e,1,'KW_MOVE',{uid:u.uid,slot:{section:'C',row:0}});assert(e.player(0).flags.tacInterdict);
 play(e,1,CARD.interdict);assert(e.player(0).flags.tacInterdict);
 equip(e,1,'dc_b_filterpatrone_410',u);assert(e.player(0).flags.tacInterdict);
 const ap=p.ap;play(e,1,'tac_inf','R',1);assert.equal(ap-p.ap,2);assert(e.player(0).flags.tacInterdict);
});
test('Quelle verdeckt/entfernt oder Frist abgelaufen: kein Aufschlag mehr',()=>{
 for(const mode of ['hidden','destroy','expiry']){const {e,s}=interdiction();if(mode==='hidden')s.facedown=true;if(mode==='destroy')e._destroy(e.findInst(s.uid));if(mode==='expiry'){end(e);end(e);}e._tacAfterAction();assert(!e.player(0).flags.tacInterdict);}
});
test('Verkehrsleitstelle gibt AP nur am eigenen Zugbeginn und nur offen',()=>{
 for(const hidden of [false,true]){const e=fresh();support(e,0,CARD.traffic).facedown=hidden;end(e);end(e);assert.equal(e.player(0).ap,e.rules.ap_per_turn+(hidden?0:1));}
});

// -------- Feuerschutz: drei konkrete Instanzen; keine ATK- oder Stroboskop-Kosmetik.
test('Feuerschutz wählt echte unmittelbar benachbarte sichtbare Slots (auch Abschnittsgrenze)',()=>{
 const {e,a,ally,t}=coverSetup();assert.equal(e.player(0).ap,29);assert.deepEqual(Array.from(e.player(0).flags.tacCover.ids),[a.uid,ally.uid,t.uid]);assert.equal(a.flags.tacAttackSpentTurn,10);assert(!a.attackUsed);
 const l=e.findInst(a.uid),nb=e._tacAdjacent(l);assert(nb.some(s=>s.section==='L'&&s.row===2));assert(nb.some(s=>s.section==='C'&&s.row===1));assert(!nb.some(s=>s.section==='L'&&s.row===0));
});
test('Feuerschutz-Zielwahl bleibt bis zur letzten gültigen Wahl kostenlos und atomar',()=>{
 const e=fresh(),a=put(e,0,CARD.cover),ally=put(e,0,'tac_inf','C',1),t=put(e,1,'tac_inf','C',1);ability(e,0,a);bad(e,0,'CHOOSE_TARGET',{target:t.uid});choose(e,0,ally.uid);assert.equal(e.player(0).ap,30);bad(e,0,'CHOOSE_TARGET',{target:a.uid});assert(!e.player(0).flags.tacCover);act(e,0,'CANCEL_PENDING');assert.equal(e.player(0).ap,30);assert(!a.flags.tacAttackSpentTurn);
});
test('Feuerschutz: verdeckte/eingegrabene/fremde/entfernte Ziele und unbereite Quellen ungültig',()=>{
 for(const mode of ['sourcehidden','allyhidden','allyfar','targethidden','protected','sourcefresh','owner','ap']){const e=fresh(),a=put(e,0,CARD.cover),ally=put(e,0,'tac_inf',mode==='allyfar'?'R':'C',1),t=put(e,1,'tac_inf','C',1);if(mode==='sourcehidden')a.facedown=true;if(mode==='allyhidden')ally.facedown=true;if(mode==='targethidden')t.facedown=true;if(mode==='protected')e._applyDeployProtection(t);if(mode==='sourcefresh')a.summonedTurn=10;if(mode==='ap')e.player(0).ap=0;bad(e,mode==='owner'?1:0,'USE_ABILITY',{uid:a.uid});}
});
test('Feuerschutz reduziert genau Gegenschlag/Nebel-Erstschlag um 2, nicht Zielschaden',()=>{
 for(const fog of [false,true]){const {e,ally,t}=coverSetup();ally.def=ally.defMax=30;t.def=t.defMax=30;if(fog)t.tokens.push({type:'nebelfeld'});const old=ally.def,td=t.def;attack(e,0,ally,t);assert.equal(old-ally.def,3);assert.equal(td-t.def,2);assert(!e.player(0).flags.tacCover);}
});
test('Feuerschutz-Marke bleibt bei anderem Angriff, verbraucht beim passenden Kampf vor Minentod',()=>{
 const {e,ally,t}=coverSetup(),other=put(e,1,'tac_inf','C',0);other.atk=0;attack(e,0,ally,other);assert(e.player(0).flags.tacCover);e._applyEffect(e.player(0),null,{code:'EXTRA_ATTACK'},ally.uid);ally.def=1;t.tokens.push({type:'minenfeld',charges:2});attack(e,0,ally,t);assert(!e.player(0).flags.tacCover);assert(!e.findInst(ally.uid));
});
test('Feuerschutz endet bei Feldwechsel, Verdecken, Tod jeder beteiligten Instanz und Zugende',()=>{
 for(const role of ['a','ally','t'])for(const how of ['hide','die','move']){const x=coverSetup(),u=x[role];if(how==='hide')u.facedown=true;if(how==='die')x.e._destroy(x.e.findInst(u.uid));if(how==='move'){const l=x.e.findInst(u.uid);x.e._tacDepart(u,false);l.player.front[l.section][l.row]=null;l.player.front.R[2]=u;}x.e._tacAfterAction();assert(!x.e.player(0).flags.tacCover,role+' '+how);}
 const x=coverSetup();end(x.e);assert(!x.e.player(0).flags.tacCover);
});
test('keine Stapelung oder Reaktivierung durch Zusatzangriff/Aufdecken',()=>{
 const {e,a}=coverSetup();bad(e,0,'USE_ABILITY',{uid:a.uid});delete e.player(0).flags.tacCover;e._applyEffect(e.player(0),null,{code:'EXTRA_ATTACK'},a.uid);a.facedown=true;e._revealInst(a);bad(e,0,'USE_ABILITY',{uid:a.uid});
});

// -------- Gefechtsabbruch: Nachkampfreaktion vor dem nächsten Befehl.
function breakSetup(){const e=fresh(),a=put(e,0,'tac_inf'),t=put(e,1,CARD.break);a.atk=1;t.def=t.defMax=20;attack(e,0,a,t);return {e,a,t};}
test('Nachkampfreaktion erscheint erst nach Schaden/Gegenschlag und sperrt nächste Befehle',()=>{
 const {e,a,t}=breakSetup();assert.equal(t.def,19);assert.equal(a.def,28);assert.equal(e.state.pending.kind,'tac-break');assert.equal(e.state.pending.player,1);bad(e,0,'END_TURN');bad(e,0,'PLAY',{uid:'unbekannt'});
});
test('Gefechtsabbruch erhält ID, Schaden, Ausrüstung, Token; kein neues Eingraben',()=>{
 const {e,t}=breakSetup();const eq=e.instFromId('dc_b_filterpatrone_410',1);t.attachments.push(eq);t.tokens.push({type:'test'});const hp=t.def,uid=t.uid;
 bad(e,1,'CHOOSE_SLOT',{slot:{section:'R',row:0}});act(e,1,'CHOOSE_SLOT',{slot:{section:'C',row:1}});
 assert.equal(e.findInst(uid).row,1);assert.equal(t.def,hp);assert.equal(t.attachments[0].uid,eq.uid);assert.equal(t.tokens[0].type,'test');assert(!t.facedown);assert(!t.flags.digInBonus);assert.equal(t.flags.tacNoAttackUntil,11);assert.equal(e.player(1).ap,29);
});
test('Gefechtsabbruch: Angriffsverbot überlebt Zusatzangriff bis Ende nächsten eigenen Zuges',()=>{
 const {e,a,t}=breakSetup();act(e,1,'CHOOSE_SLOT',{slot:{section:'C',row:1}});end(e);e._applyEffect(e.player(1),null,{code:'EXTRA_ATTACK'},t.uid);bad(e,1,'ATTACK',{uid:t.uid,target:a.uid});end(e);assert(!t.flags.tacNoAttackUntil);assert(e._canAct(t,1));
});
test('abgelehnter Gefechtsabbruch kostet nichts; keine Reaktion bei Tod, Bindung, verdeckt, vollen Nachbarn oder AP0',()=>{
 const x=breakSetup();act(x.e,1,'CANCEL_PENDING');assert.equal(x.e.player(1).ap,30);
 for(const how of ['dead','bound','hidden','blocked','ap']){const e=fresh(),a=put(e,0,'tac_inf'),t=put(e,1,CARD.break);if(how==='dead')a.atk=99;if(how==='bound')t.flags.tacBoundUntil=11;if(how==='hidden')t.facedown=true;if(how==='blocked'){put(e,1,'tac_inf','L',2);put(e,1,'tac_inf','C',1);}if(how==='ap')e.player(1).ap=0;attack(e,0,a,t);assert(!e.state.pending || e.state.pending.kind!=='tac-break',how);}
});
test('kein Abbruch bei Soforteinsatzschaden/eigenem Angriff; nur einmal pro gegnerischem Zug',()=>{
 const e=fresh(),t=put(e,1,CARD.break);e._damage(t,1,{tag:'spell'});e._tacAfterAction();assert(!e.state.pending);
 const {e:q,a,t:u}=breakSetup();act(q,1,'CHOOSE_SLOT',{slot:{section:'C',row:1}});q._applyEffect(q.player(0),null,{code:'EXTRA_ATTACK'},a.uid);attack(q,0,a,u);assert(!q.state.pending || q.state.pending.kind!=='tac-break');
 const own=fresh(),z=put(own,0,CARD.break),enemy=put(own,1,'tac_inf');enemy.atk=0;attack(own,0,z,enemy);assert(!own.state.pending);
});
test('Nachkampfqueue wartet auf bestehende andere Auswahl; kein vorzeitiger Slotwechsel',()=>{
 const e=fresh(),t=put(e,1,CARD.break);e.state.pending={kind:'test-existing',player:0,choices:[]};e._tacAfterCombat(0,t.uid);e._tacAfterAction();assert.equal(e.state.pending.kind,'test-existing');e.state.pending=null;e._tacAfterAction();assert.equal(e.state.pending.kind,'tac-break');
});

// -------- Vorpostenmeldung: Eintritt ist nicht Aufdecken/Verdecken/Tausch.
test('Gefechtsabbruch wartet bei Luftangriff auf SAM-Pass oder Block',()=>{
 for(const block of [false,true]){const e=fresh(),a=put(e,0,'tac_air'),t=put(e,1,CARD.break);t.def=t.defMax=30;e.player(1).hand.push(e.instFromId('tac_sam',1));attack(e,0,a,t);if(e.state.pending.kind==='react-window')act(e,1,'REACT_PASS');assert.equal(e.state.pending.kind,'sam');assert.equal(e.findInst(t.uid).row,0);act(e,1,block?'SAM_BLOCK':'SAM_PASS');assert.equal(t.def,block?30:28);assert.equal(e.state.pending.kind,'tac-break');act(e,1,'CANCEL_PENDING');assert(!e.state.pending);}
});
test('Vorpostenmeldung deckt nach bezahltem verdecktem Einsatz auf, ohne Eingraben zu löschen',()=>{
 const e=fresh();e.rules.deploy_protection=false;put(e,1,CARD.screen);const c=play(e,0,'tac_hide','C',0,true);assert(!c.facedown);assert.equal(e.player(1).flags.tacScreen.C,10);assert(c.flags.kwAmbushReady);assert(!c.flags.observed);
 // Derselbe Ereignispfad mit Schutzmarkierung lässt alle Schutzfelder unangetastet.
 const q=fresh();put(q,1,CARD.screen);const u=put(q,0,'tac_inf','C',0);q._applyDeployProtection(u);u.facedown=true;const until=u.flags.noCombatUntil;q._tacOnEntry(u,'C');assert(!u.facedown);assert.equal(u.flags.noCombatUntil,until);assert(u.flags.digInBonus);
});
test('offener Eintritt verbraucht Meldung nicht; alte Einheiten/anderer Abschnitt unverändert',()=>{
 const e=fresh();put(e,1,CARD.screen);const old=put(e,0,'tac_inf','C',0);old.facedown=true;const open=play(e,0,'tac_inf','C',1);assert(old.facedown);assert(!e.player(1).flags.tacScreen);e.rules.deploy_protection=false;const other=play(e,0,'tac_inf','L',0,true);assert(other.facedown);
});
test('mehrere Melder teilen Limit pro Besitzer/Abschnitt/Spielerzug; Quellenwechsel setzt nicht zurück',()=>{
 const e=fresh();e.rules.deploy_protection=false;const s=put(e,1,CARD.screen,'C',0);put(e,1,CARD.screen2,'C',1);const a=play(e,0,'tac_inf','C',0,true),b=play(e,0,'tac_inf','C',1,true);assert(!a.facedown);assert(b.facedown);e._destroy(e.findInst(s.uid));put(e,1,CARD.screen,'C',0);const c=play(e,0,'tac_inf','C',2,true);assert(c.facedown);end(e);const d=put(e,0,'tac_inf','L',2);d.facedown=true;e._applyEffect(e.player(0),null,{code:'MOVE_SLOTS',param:{slots:1}},d.uid); // move to C2 occupied -> may offer R2, no false trigger
 assert.equal(e.player(1).flags.tacScreen.C,10);
});
test('gewöhnlicher Abschnittseintritt löst aus, innerer Wechsel und Platztausch nicht',()=>{
 const e=fresh();put(e,1,CARD.screen);const u=put(e,0,'tac_inf','L',0);u.facedown=true;e._applyEffect(e.player(0),null,{code:'MOVE_SLOTS',param:{slots:1}},u.uid);assert(!u.facedown);assert.equal(e.player(1).flags.tacScreen.C,10);
 const q=fresh();put(q,1,CARD.screen);const a=put(q,0,'tac_swap','L',0),b=put(q,0,'tac_inf','C',0);b.facedown=true;q.state.pending={kind:'kw-swap',player:0,uid:a.uid};choose(q,0,b.uid);assert(b.facedown);assert(!q.player(1).flags.tacScreen);
 const r=fresh();put(r,1,CARD.screen);const c=put(r,0,'tac_inf','C',0);c.facedown=true;r._tacOnEntry(c,'C','C');assert(c.facedown);
});
test('verdeckter/toter Melder inert; neues Limit im folgenden Spielerzug',()=>{
 for(const mode of ['hidden','dead']){const e=fresh();e.rules.deploy_protection=false;const s=put(e,1,CARD.screen);if(mode==='hidden')s.facedown=true;else e._destroy(e.findInst(s.uid));const c=play(e,0,'tac_inf','C',0,true);assert(c.facedown);}
 const e=fresh();e.rules.deploy_protection=false;put(e,1,CARD.screen);play(e,0,'tac_inf','C',0,true);end(e);e.state.active=0;const c=play(e,0,'tac_inf','C',1,true);assert(!c.facedown);assert.equal(e.player(1).flags.tacScreen.C,11);
});

// -------- Konkrete Text-/Engine-Konflikte, keine kosmetischen Keyword-only-Fixes.
test('Notdepot zieht 2 und lässt danach genau 1 eigene Handkarte frei wählen',()=>{
 const e=fresh(),p=e.player(0),keep=e.instFromId('tac_inf',0);p.hand.push(keep);const n=e.instFromId('dc_b_notdepot_643',0);p.hand.push(n);const deck=p.deck.length;act(e,0,'PLAY',{uid:n.uid});assert.equal(p.deck.length,deck-2);assert.equal(p.hand.length,3);assert.equal(e.state.pending.kind,'tac-discard');bad(e,0,'CANCEL_PENDING');bad(e,1,'CHOOSE_TARGET',{target:keep.uid});bad(e,0,'CHOOSE_TARGET',{target:'fremd'});const chosen=p.hand[2];choose(e,0,chosen.uid);assert(p.hand.includes(keep));assert(p.grave.includes(chosen));assert.equal(p.hand.length,2);assert(p.grave.includes(n));assert(!e.state.pending);
});
test('Filterpatrone: erste gegnerische Attacke pro Spielerzug +1 Kampf-DEF, keine permanente DEF/ATK',()=>{
 const e=fresh(),a=put(e,0,'tac_inf'),t=put(e,1,'tac_inf');const eq=e.instFromId('dc_b_filterpatrone_410',1);t.attachments.push(eq);assert.equal(e.currentAtkDef(t).atk,2);assert.equal(t.def,30);attack(e,0,a,t);assert.equal(t.def,29);e._applyEffect(e.player(0),null,{code:'EXTRA_ATTACK'},a.uid);attack(e,0,a,t);assert.equal(t.def,27);end(e);end(e);a.attackUsed=false;attack(e,0,a,t);assert.equal(t.def,26);
});
test('Notdepot/Filterpatrone sind strukturierte Effekte; keine Fließtext-Ratesemantik',()=>{
 assert.equal(w.DC_CATALOG.cards.find(c=>c.id==='dc_b_notdepot_643').effects[0].code,'DRAW_THEN_CHOOSE_DISCARD');assert.equal(w.DC_CATALOG.cards.find(c=>c.id==='dc_b_filterpatrone_410').effects[0].code,'FIRST_DEFENSE_BONUS');
});
test('Verlegung reicht bis 2 Abschnitte; Aktenbefehl/Tausch sperren Bewegung, nicht Angriff',()=>{
 const e=fresh(),u=put(e,0,'tac_move','L',0);const c=play(e,0,'dc_b_verlegung_210');choose(e,0,u.uid);assert(e.state.pending.choices.some(c=>c.slot.section==='R'));act(e,0,'CHOOSE_SLOT',{slot:{section:'R',row:0}});assert.equal(e.findInst(u.uid).section,'R');
 for(const card of ['dc_b_aktenbefehl_887','dc_b_tausch_945']){const q=fresh(),a=put(q,0,'tac_move'),t=put(q,1,'tac_inf');play(q,0,card);choose(q,0,a.uid);assert.equal(a.flags.tacNoMoveTurn,10);assert(!a.flags.noAttack);bad(q,0,'KW_MOVE',{uid:a.uid,slot:{section:'L',row:0}});attack(q,0,a,t);end(q);assert(!a.flags.tacNoMoveTurn);}
});
test('Sturmleitern pro Zug vs Pool-Ausrüstung einmal pro Anlegen; nie auf Gegenschlag',()=>{
 const e=fresh(),a=put(e,0,'tac_inf'),t=put(e,1,'tac_inf');const eq=equip(e,0,'dc_au_sturmleitern',a);assert.equal(e.currentAtkDef(a).atk,3);assert.equal(e.currentAtkDef(a,{defending:true}).atk,2);attack(e,0,a,t);assert.equal(t.def,27);e._applyEffect(e.player(0),null,{code:'EXTRA_ATTACK'},a.uid);assert.equal(e.currentAtkDef(a).atk,2);end(e);end(e);assert.equal(e.currentAtkDef(a).atk,3);
 const np=w.DC_CATALOG.cards.find(c=>c.set==='set_nation_pool'&&c.effects.some(e=>e.code==='CARRIER_FIRST_ATTACK_ATK'));const q=fresh(),host=put(q,0,'tac_inf'),target=put(q,1,'tac_inf');const x=equip(q,0,np.id,host);const bonus=np.effects.find(e=>e.code==='CARRIER_FIRST_ATTACK_ATK').param.atk;attack(q,0,host,target);assert(x.flags.tacFirstAttackUsed);const before=q.currentAtkDef(host).atk;const y=equip(q,0,np.id,host);assert(!y.flags.tacFirstAttackUsed);assert.equal(q.currentAtkDef(host).atk,before+bonus);
});
test('B133-Sturmleitern-Zusatz nur im Anlegezug, nicht dauerhaft neu jeden Zug',()=>{
 const e=fresh(),a=put(e,0,'tac_inf');equip(e,0,'dc_b_sturmleitern_133',a);assert.equal(e.currentAtkDef(a).atk,4);end(e);end(e);assert.equal(e.currentAtkDef(a).atk,3);
});
test('Feldaltar verweigert erstes Angriffsziel statt einmal Schaden zu verschlucken',()=>{
 const e=fresh(),a=put(e,0,'tac_inf'),t=put(e,1,'tac_inf');t.attachments.push(e.instFromId('dc_b_feldaltar_138',1));assert(!e.legalAttackTargets(e.findInst(a.uid)).some(x=>x.inst.uid===t.uid));bad(e,0,'ATTACK',{uid:a.uid,target:t.uid});e._damage(t,2,{tag:'spell'});assert.equal(t.def,28);const other=put(e,1,'tac_inf','C',1);attack(e,0,a,other);e._applyEffect(e.player(0),null,{code:'EXTRA_ATTACK'},a.uid);attack(e,0,a,t);assert.equal(t.def,26);
});
test('Kettengebet: nur Infanterie im Trägerabschnitt, 1 Punkt pro Empfänger/Spielerzug, nicht ganzer Treffer',()=>{
 const e=fresh(),host=put(e,0,'tac_inf','C',0),mate=put(e,0,'tac_inf','C',1),away=put(e,0,'tac_inf','L',0);host.attachments.push(e.instFromId('dc_b_kettengebet_141',0));e._damage(mate,3,{});assert.equal(mate.def,28);e._damage(mate,3,{});assert.equal(mate.def,25);e._damage(away,3,{});assert.equal(away.def,27);end(e);e._damage(mate,3,{});assert.equal(mate.def,23);
});
test('Kettengebet verlangt laut Druck nur einen lebenden, nicht einen offenen Träger',()=>{
 const e=fresh(),host=put(e,0,'tac_inf','C',0),mate=put(e,0,'tac_inf','C',1);host.attachments.push(e.instFromId('dc_b_kettengebet_141',0));host.facedown=true;e._damage(mate,3,{});assert.equal(mate.def,28);e._destroy(e.findInst(host.uid));end(e);e._damage(mate,3,{});assert.equal(mate.def,25);
});
test('Wachsiegel: erst beim Schutzverbrauch −1 ATK und nur bis Ende dieses Spielerzuges',()=>{
 const e=fresh(),host=put(e,0,'tac_inf');equip(e,0,'dc_b_wachsiegel_647',host);assert.equal(e.currentAtkDef(host).atk,2);const hp=host.def;e._damage(host,4,{});assert.equal(host.def,hp);assert.equal(e.currentAtkDef(host).atk,1);e._damage(host,1,{});assert.equal(host.def,hp-1);end(e);assert.equal(e.currentAtkDef(host).atk,2);
});
test('Glaubensbanner: explizite Abschnittswahl, Infanterie +1, kein globales +2',()=>{
 const e=fresh(),p=e.player(0),near=put(e,0,'tac_inf'),away=put(e,0,'tac_inf','L',0),vehicle=put(e,0,CARD.cover2,'C',1);const vhp=vehicle.def;const s=play(e,0,'dc_b_glaubensbanner_113');assert.equal(e.state.pending.kind,'tac-aura-section');bad(e,0,'CANCEL_PENDING');choose(e,0,'sec:C');assert.equal(near.def,31);assert.equal(away.def,30);assert.equal(vehicle.def,vhp);e._destroy(e.findInst(s.uid));e._tacAfterAction();assert.equal(near.def,30);
});
test('Erstschadenschutz/Teilreduktion: positive Treffer einmalig, Überlast bleibt unverhinderbar',()=>{
 const e=fresh(),host=put(e,0,'tac_inf');const a=equip(e,0,'dc_np_averon_tarnnetz_averon',host),b=equip(e,0,'dc_np_eldran_sperrdraht_kit',host);e._damage(host,0,{});assert(!a.flags.usedIgnore);e._damage(host,4,{});assert(a.flags.usedIgnore);assert(!b.flags.usedNegate);assert.equal(host.def,30);e._damage(host,4,{});assert(b.flags.usedNegate);assert.equal(host.def,28);
 const q=fresh(),over=w.DC_CATALOG.cards.find(c=>c.set!=='test'&&(c.keywords||[]).includes('Überlast'));const u=put(q,0,over.id),shield=equip(q,0,'dc_np_averon_tarnnetz_averon',u);q._kwRecompute();const hp=u.def;end(q);assert.equal(u.def,hp-1);assert(!shield.flags.usedIgnore);
});


test('Binden-Reichweite ist der Abschnitt, sobald irgendein legaler Angriff möglich wäre',()=>{
 const e=fresh(),a=put(e,0,CARD.bind,'C',0);put(e,1,'tac_inf','C',0);const t=put(e,1,'tac_inf','C',2);ability(e,0,a);assert(e.state.pending.choices.some(c=>c.target===t.uid));choose(e,0,t.uid);assert(t.flags.tacBoundUntil);
});
test('alle zehn Entwürfe tatsächlich über PLAY/Slot im geladenen Spiel spielbar',()=>{
 for(const card of Object.values(CARD)){const e=fresh(),c=play(e,0,card),d=e.defOf(c);assert.equal(e.findInst(c.uid).zone,d.typ==='Unterstützung'?'support':'front');assert.equal(e.player(0).ap,30-d.ap);assert.equal(c.cardId,card);}
});
function uiFresh(){const h=require('./test_audio_actions').setup('off');h.eng.state.turn=10;L.clearBoard(h.eng);h.eng.state.active=0;h.eng.state.phase='main';for(const p of h.eng.state.players){p.flags={};p.hand=[];p.ap=30;}return h;}
function uiInspect(h,u){h.w.dcRender();const el=h.w.document.querySelector('[data-uid="'+u.uid+'"]');assert(el);el.dispatchEvent(new h.w.MouseEvent('dblclick',{bubbles:true,cancelable:true}));}
function uiChoose(h,test){const i=h.eng.state.pending.choices.findIndex(test);assert(i>=0);h.click('#overlay .choices button[data-i="'+i+'"]');}
test('DOM: Binden über echte Detailansicht/Fähigkeitsknopf/Zielwahl, ohne AP bei Öffnen',()=>{
 const h=uiFresh(),e=h.eng,inf=e.catalog.cards.find(c=>c.typ==='Einheit'&&!c.effects.length&&!(c.keywords||[]).length),a=put(e,0,CARD.bind),t=put(e,1,inf.id);uiInspect(h,a);assert.equal(e.player(0).ap,30);h.click('#inspect [data-act="dc-ability"]');assert.equal(e.state.pending.kind,'tac-bind');uiChoose(h,c=>c.target===t.uid);assert(t.flags.tacBoundUntil);assert.equal(e.player(0).ap,29);assert.equal(h.errors.length,0);h.dom.window.close();
});
test('DOM: Feuerschutz beide Wahlen und vollständige Regeln in Entwurf/Detail',()=>{
 const h=uiFresh(),e=h.eng,inf=e.catalog.cards.find(c=>c.typ==='Einheit'&&!c.effects.length&&!(c.keywords||[]).length),a=put(e,0,CARD.cover),ally=put(e,0,inf.id,'C',1),t=put(e,1,inf.id,'C',1);uiInspect(h,a);assert(h.w.document.querySelector('#inspect').textContent.includes('Feuerschutz 2'));h.click('#inspect [data-act="dc-ability"]');uiChoose(h,c=>c.target===ally.uid);uiChoose(h,c=>c.target===t.uid);assert(e.player(0).flags.tacCover);assert.equal(e.player(0).ap,29);assert.equal(h.errors.length,0);h.dom.window.close();
});
test('DOM: Gefechtsabbruch im Gegenzug per echtem Slot-Auswahldialog',()=>{
 const h=uiFresh(),e=h.eng,inf=e.catalog.cards.find(c=>c.typ==='Einheit'&&!c.effects.length&&!(c.keywords||[]).length),a=put(e,0,inf.id),t=put(e,1,CARD.break);a.atk=1;t.def=t.defMax=20;attack(e,0,a,t);h.w.dcRender();assert.equal(e.state.pending.kind,'tac-break');uiChoose(h,c=>c.slot&&c.slot.section==='C'&&c.slot.row===1);assert.equal(e.findInst(t.uid).row,1);assert.equal(e.player(1).ap,29);assert.equal(h.errors.length,0);h.dom.window.close();
});
console.log('PASS tactical keywords: '+passed+' Szenarien; 5 Mechaniken, 10 Entwürfe, Bestandsmigrationen, Textkonflikte und Build-Reproduzierbarkeit');
