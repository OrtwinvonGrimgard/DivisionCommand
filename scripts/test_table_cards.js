/* Actual production renderer + DOM handlers. No browser automation. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { setup } = require('./test_audio_actions');
const WEB = path.join(__dirname, '../Division_Command_0.5a/web');
const h = setup('off'), { w, eng, add, click } = h;
let artwork = 0, textures = 0;
for (const def of w.DC_CATALOG.cards) {
  if (w.DCCardPh.is(def)) { // neue Pool-Karten: ehrlicher Platzhalter, keine Bildzuordnung
    assert(!w.DC_TABLE_ART[def.id] && !def.image, `placeholder must not map art ${def.id}`);
    assert.match(w.DCTableArt.html(def, false), /Entwurf · ohne Artwork/); continue;
  }
  const face=w.DC_CARD_FACES && w.DC_CARD_FACES[def.id];
  const m = (face && face.art) || w.DC_TABLE_ART[def.id]; assert(m, `mapping missing ${def.id}`);
  assert(fs.existsSync(path.join(WEB, m.src)), `file missing ${m.src}`);
  if (m.kind === 'artwork') {
    artwork++;
    if (def.image) assert.equal(path.basename(m.src, '.jpg'), path.basename(def.image).replace(/\.[^.]+$/, ''), 'exact collector art mapping');
    else assert.equal(path.basename(m.src,'.jpg'),def.id,'new generated illustration belongs to exact ID');
  } else if (m.kind === 'doctrine-texture') {
    textures++; assert.equal(def.typ, 'Doktrin'); assert.equal(m.src, 'assets/cards/' + def.image);
  }
}
const plainInf = c => c.typ === 'Einheit' && (c.tags || []).includes('infanterie') && !(c.keywords || []).length && w.DC_TABLE_ART[c.id];
const inf = w.DC_CATALOG.cards.find(c => plainInf(c) && !(c.effects || []).length) || w.DC_CATALOG.cards.find(c => plainInf(c) && (c.effects || []).every(e => e.code === 'CM' && ['kill', 'death', 'turnheal'].includes(e.param.k)));
const eq = w.DC_CATALOG.cards.find(c => c.typ === 'Ausrüstung' && (c.effects || []).some(e => e.code === 'EQUIP_STAT'));
const sup = w.DC_CATALOG.cards.find(c => c.typ === 'Unterstützung');
const own = eng.instFromId(inf.id, 0), enemy = eng.instFromId(inf.id, 1), equip = eng.instFromId(eq.id, 0);
own.flags.noCombatUntil = eng.state.turn + 1; own.flags.noCombatUntil = eng.state.turn + 1; own.flags.digInUntil = eng.state.turn + 1; own.flags.digInBonus = 1;
own.flags.tempAtk = 2; own.defMax = 10; own.def = 7; own.attackUsed = true; own.attachments = [equip];
eng.player(0).front.C[0] = own; eng.player(1).front.C[0] = enemy;
eng.player(0).support[0] = eng.instFromId(sup.id, 0);
const hidden = eng.instFromId(inf.id, 1); hidden.facedown = true; eng.player(1).front.L[0] = hidden;
eng.player(1).support[0] = eng.instFromId(sup.id, 1); eng.player(1).support[0].facedown = true;
eng.player(0).doctrines = [eng.instFromId('dc_dok_verlegung', 0)];
const hand = add(inf.id); w.dcRender();
const tile = w.document.querySelector(`#my-front [data-uid="${own.uid}"]`);
assert.equal(tile.querySelector('.unit-name').textContent, inf.name);
assert.equal(tile.querySelector('.table-art').getAttribute('src'), w.DC_TABLE_ART[inf.id].src);
assert(tile.querySelector('.unit-stats').textContent.includes('ATK'));
assert(tile.querySelector('.unit-stats').textContent.includes('DEF'));
assert(tile.querySelector('.stat-chip.up'), 'buff color badge');
assert(tile.querySelector('.dig-in-shield'), 'dig-in shield');
assert(tile.textContent.includes('Schaden 3')); assert(tile.textContent.includes('Angriff genutzt'));
assert.equal(tile.querySelector('.equipment-name').textContent, eq.name);
assert.equal(tile.querySelector('.equipment-tile .table-art').getAttribute('src'), w.DC_TABLE_ART[eq.id].src);
assert.equal(w.document.querySelector('#my-support .unit-name').textContent, sup.name);
const enemyTile = w.document.querySelector(`#enemy-front [data-uid="${enemy.uid}"]`);
assert(enemyTile.querySelector('.table-art') && enemyTile.querySelector('.unit-name'));
const hiddenTile = w.document.querySelector(`#enemy-front [data-uid="${hidden.uid}"]`);
assert(!hiddenTile.querySelector('img')); assert.equal(hiddenTile.querySelector('.unit-name').textContent, 'Verdeckte Einheit');
assert(!hiddenTile.querySelector('.unit-stats').textContent.trim(), 'hidden stats not leaked');
assert.equal(w.document.querySelector('#enemy-support .unit-name').textContent, 'Verdeckte Unterstützung');
assert(!w.document.querySelector('#enemy-support img'));
assert(w.document.querySelector('#my-doctrine .doctrine-texture'));
assert.equal(w.document.querySelector('#my-doctrine .dn').textContent, 'Verlegung');
if (eng._trophyActive && eng._trophyActive() && eng.trophyProgressFor(0, 'dc_dok_verlegung')) assert(w.document.querySelector('#my-doctrine .dok-vp'), 'trophy progress still visible');
assert(w.document.querySelector('#hand .card img.art'), 'hand still full-card renderer');
assert(!w.document.querySelector('#hand .table-motif'), 'hand not changed to motif');
// Missing art is honest, no substitution or fabricated request.
const absent = w.DCTableArt.html({ id: 'not-real', name: 'Absent' }, false);
assert(absent.includes('Motiv nicht verfügbar') && !absent.includes('<img'));
const img = tile.querySelector('.table-art'), oldSrc = img.src;
w.DCTableArt.failed(img); assert(img.hidden); assert.equal(img.src, oldSrc); assert(!img.parentElement.querySelector('.art-missing-label').hidden);
// Equipment button reaches full detail, not parent attack/target handler.
click(`[data-equipment="${equip.uid}"]`);
assert.equal(w.document.getElementById('inspect').style.display, 'flex'); assert(w.document.getElementById('inspect').textContent.includes(eq.name));
click('#inspect [data-act="close"]');
// Genuine hand/slot chain still consumes AP and renders motif after deploy.
const before = eng.player(0).ap;
click(`#hand [data-uid="${hand.uid}"]`); click('#my-front .slot.legal');
assert(eng.frontList(eng.player(0)).some(l => l.inst.uid === hand.uid)); assert(eng.player(0).ap < before);
assert(w.document.querySelector(`#my-front [data-uid="${hand.uid}"] .table-art`));
// Target markers and keyboard doctrine detail remain actionable.
eng.state.pending = { kind: 'instant-target', player: 0, choices: [{ target: enemy.uid }] };
w.dcRender();
assert(w.document.querySelector(`#enemy-front [data-uid="${enemy.uid}"]`).classList.contains('legal-target'));
eng.state.pending = null; w.dcRender();
const doctrine = w.document.querySelector('#my-doctrine .doctrine-card');
let kbClicked = 0; doctrine.addEventListener('click', () => kbClicked++);
doctrine.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
assert.equal(kbClicked, 1, 'Enter activates tile');
// Bubbling from inner child (image/name) of a legal filled slot reaches the production handler.
const eqHand = add(eq.id); const host = eng.frontList(eng.player(0)).find(l => l.inst.uid === hand.uid).inst;
click(`#hand [data-uid="${eqHand.uid}"]`);
const hostEl = w.document.querySelector(`#my-front [data-uid="${host.uid}"]`);
assert(hostEl.classList.contains('legal'), 'equipment host marked legal');
hostEl.querySelector('.table-art').dispatchEvent(new w.MouseEvent('click', { bubbles: true, cancelable: true }));
assert((host.attachments || []).some(a => a.uid === eqHand.uid), 'equipment attached via bubbled child click');
assert.equal(h.errors.length, 0);
const css = fs.readFileSync(path.join(WEB, 'css/table-cards.css'), 'utf8');
assert(css.includes('repeat(9, minmax(0, 1fr))'), 'nine columns fit width, no forced horizontal overflow');
// Regression t166u: slots must stay viewport-sized so own front/support are not pushed under the sticky hand dock.
assert(/height: 12vh !important/.test(css) && !/min-height: 1[0-9]{2}px !important/.test(css), 'slot height bounded by viewport');
assert(!/#my-doctrine\s*\{[^}]*grid-row/.test(css), 'no extra bottom-bar row above the hand');
assert(!/min-width: 1020px/.test(css), 'no forced 1020px front width');
assert(/\.slot\.empty\.legal[^{]*\{[^}]*background: rgba\(226, 195, 106/.test(css), 'playable empty slots override stripe pattern');
const fxCss = fs.readFileSync(path.join(WEB, 'css/table-effects.css'), 'utf8');
assert(/\.fx-badges \{ position: absolute/.test(fxCss), 'effect badges do not grow slot height');
for (const block of (css + fxCss).match(/[^{}]*::(before|after)[^{]*\{[^}]*\}/g) || []) {
  if (/content:\s*""/.test(block) && /inset: 0/.test(block)) assert(/pointer-events: none/.test(block), 'full-cover pseudo overlay must not catch clicks: ' + block.slice(0, 80));
}
assert(!/#app\s+\.hand\s*[{.]/.test(css), 'no hand style changes');
h.dom.window.close();
console.log(`PASS ${artwork} verified motif paths / ${textures} explicit doctrine texture crops; own/enemy unit/support, equipment detail, stats/shield/damage/buffs, hidden privacy, hand unchanged, slot/AP/target/keyboard handlers`);
