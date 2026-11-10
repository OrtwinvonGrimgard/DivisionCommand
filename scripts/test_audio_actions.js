/* DOM-only integration: production event handlers + real engine; no browser. */
const { JSDOM, VirtualConsole } = require('jsdom');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const WEB = path.join(__dirname, '../Division_Command/web');
function setup(audioMode = 'on') {
  const errors = [];
  const vc = new VirtualConsole();
  vc.on('jsdomError', e => errors.push(e.detail || e));
  const dom = new JSDOM(fs.readFileSync(path.join(WEB, 'index.html'), 'utf8'), {
    runScripts: 'outside-only', url: 'http://localhost/', virtualConsole: vc,
  });
  const w = dom.window;
  const gestures = [];
  const addListener = w.document.addEventListener.bind(w.document);
  w.document.addEventListener = (type, fn, opts) => {
    if (type === 'pointerdown') gestures.push(fn);
    addListener(type, fn, opts);
  };
  w.document.body.appendChild(w.document.getElementById('match-tpl').content.cloneNode(true));
  w.setInterval = () => 0;
  const immediate = [];
  w.setTimeout = (fn, ms) => { if (ms === 0) immediate.push(fn); return 0; }; // flush task-boundary guards only
  w.HTMLMediaElement.prototype.load = function () {};
  w.HTMLMediaElement.prototype.play = function () { return Promise.resolve(); };
  w.HTMLMediaElement.prototype.pause = function () {};
  w.HTMLMediaElement.prototype.canPlayType = () => 'probably';
  const load = f => w.eval(fs.readFileSync(f === 'js/ui/app.js' && process.env.APP_SOURCE ? process.env.APP_SOURCE : path.join(WEB, f), 'utf8'));
  for (const f of ['doktrinen','tokens','infanterie','panzer','artillerie','aufklaerung','elite','unterstuetzung','soforteinsatz','ausruestung','nation_pools','tactical']) load(`js/data/sets/types/${f}.js`);
  load('js/data/decks.js'); load('js/data/image-manifest.js'); load('js/data/catalog.js'); load('js/data/card-faces.js'); load('js/engine/engine.js');
  load('js/engine/victory_trophy.js'); load('js/engine/doctrine_runtime.js'); load('js/engine/tactical_runtime.js');
  if (audioMode === 'on' || audioMode.startsWith('media-') || audioMode === 'missing-media') {
    load('js/data/audio-data.js');
    if (audioMode === 'media-throw') w.HTMLMediaElement.prototype.play = function () { throw Error('autoplay throws'); };
    if (audioMode === 'media-reject') w.HTMLMediaElement.prototype.play = function () { return Promise.reject(Error('autoplay rejected')); };
    if (audioMode === 'missing-media') w.Audio = undefined;
  }
  else if (audioMode !== 'off') {
    const fn = audioMode === 'mutate' ? (...args) => { args.forEach(a => { if (a && typeof a === 'object') { a.tags = ['corrupted']; a.typ = 'corrupted'; } }); } : audioMode === 'throw' ? () => { throw Error('intentional audio failure'); }
      : () => Promise.reject(Error('intentional audio rejection'));
    w.DCAudio = { preload: fn, playSfx: fn, playForCard: fn, playEvent: fn, notifyGameEnd: fn };
  }
  load('js/data/keywords.js'); load('js/data/table-art-data.js'); load('js/ui/card-placeholder.js'); load('js/ui/table-card-art.js'); load('js/ui/table-effects.js'); load('js/ui/table-stencil.js'); load('js/ui/table-camera.js'); load('js/ui/end-screen.js'); load('js/ui/app.js'); load('js/ui/audio-feedback.js');
  w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
  // Invoke captured gesture listeners as code tests; no browser automation.
  gestures.forEach(fn => fn({ isTrusted: true }));
  const eng = new w.DCEngine.Engine(w.DC_CATALOG, { seed: 99 });
  const decks = Object.values(w.DC_NATION_DECKS);
  eng.createMatch({ seed: 99, mode: 'hotseat', startPlayer: 0, deck0: decks[0].cards.slice(), deck1: decks[1].cards.slice(), doctrine0: [], doctrine1: [] });
  eng.state.events = []; eng.state.active = 0; eng.state.phase = 'main'; eng.state.startCoin = null;
  eng.player(0).ap = 30; eng.player(0).hand = []; eng.player(1).hand = [];
  w.dcSetMode('hotseat'); w.dcSetYou(0); w.dcSetState(eng.state);
  const real = w.dcGetEngine();
  function add(id) { const c = real.instFromId(id, 0); real.player(0).hand.push(c); w.dcRender(); return c; }
  function click(sel) { const el = w.document.querySelector(sel); assert(el, `missing ${sel}`); el.click(); while (immediate.length) immediate.shift()(); }
  return { w, dom, eng: real, errors, add, click };
}
function unitTest(mode) {
  const h = setup(mode), { w, eng, add, click } = h;
  const def = w.DC_CATALOG.cards.find(c => c.typ === 'Einheit' && ((c.tags || []).includes('infanterie') || c.klasse === 'Infanterie') && !(c.effects || []).length && !(c.keywords || []).length && !(c.tags || []).some(t => String(t).startsWith('steilfeuer')));
  const c = add(def.id), ap = eng.player(0).ap, originalDef = JSON.stringify(def);
  click(`#hand [data-uid="${c.uid}"]`);
  assert(w.document.querySelector('#my-front .slot.legal'), 'hand click must arm legal slots');
  click('#my-front .slot.legal');
  console.log('UNIT', mode, 'errors:', h.errors.map(e => e.message), 'hint', w.document.getElementById('hint').textContent);
  assert(eng.frontList(eng.player(0)).some(l => l.inst.uid === c.uid), 'unit must enter front');
  assert(eng.player(0).ap < ap, 'AP must decrease');
  assert(w.document.querySelector(`#my-front [data-uid="${c.uid}"]`), 'rendered front must contain unit');
  assert.equal(JSON.stringify(def), originalDef, 'audio cannot mutate catalog definition');
  assert.equal(h.errors.length, 0, 'no handler exceptions');
  h.dom.window.close();
}
if (require.main === module && !process.env.CHOICES_ONLY) for (const mode of ['on', 'off', 'throw', 'reject', 'mutate', 'media-throw', 'media-reject', 'missing-media']) unitTest(mode);
module.exports = { setup };
function choiceTest(mode) {
  const h = setup(mode), { w, eng, add, click } = h;
  const inf = w.DC_CATALOG.cards.find(c => c.typ === 'Einheit' && ((c.tags || []).includes('infanterie') || c.klasse === 'Infanterie') && !(c.effects || []).length && !(c.keywords || []).length && !(c.tags || []).some(t => String(t).startsWith('steilfeuer')));
  const u = eng.instFromId(inf.id, 0); u.summonedTurn = -99;
  eng.player(0).front.C[0] = u;
  eng.player(0).doctrines = [eng.instFromId('dc_dok_verlegung', 0)];
  w.dcRender();
  // Equipment: click hand, then friendly host. placeFromHand must continue after PLAY.
  const eqDef = w.DC_CATALOG.cards.find(c => c.typ === 'Ausrüstung' &&
    (c.effects || []).some(e => e.code === 'EQUIP_STAT'));
  const eq = add(eqDef.id), ap0 = eng.player(0).ap;
  click(`#hand [data-uid="${eq.uid}"]`); click(`#my-front [data-uid="${u.uid}"]`);
  console.log('EQUIP', mode, eng.state.pending && eng.state.pending.kind, h.errors.map(e=>e.message));
  assert(!eng.player(0).hand.some(c => c.uid === eq.uid), 'equipment leaves hand');
  assert(!eng.state.pending, 'equipment choice completes after PLAY');
  assert(eng.findInst(u.uid).inst.attachments.some(e => e.uid === eq.uid), 'equipment attaches to chosen unit');
  assert(eng.player(0).ap < ap0, 'equipment costs AP');
  // Section instant: hand then enemy slot, both production PLAY + CHOOSE_TARGET handlers.
  const instant = add('dc_b_lauer_249'), ap1 = eng.player(0).ap;
  const instantCost = eng.costOf(eng.defOf(instant), eng.player(0), null, instant);
  click(`#hand [data-uid="${instant.uid}"]`); click('.slot.legal[data-section="C"]');
  assert(!eng.state.pending, 'instant section choice completes');
  assert(!eng.player(0).hand.some(c => c.uid === instant.uid), 'instant leaves hand');
  assert(eng.player(0).flags.sectionEnterDamage.length, 'section effect resolves');
  assert.equal(eng.player(0).ap, ap1 - instantCost, 'instant respects current AP rules');
  // Doctrine modal -> onAction -> target button -> dispatch (not direct engine dispatch).
  click('#my-doctrine .doctrine-card'); click('[data-act="verlegung"]');
  const before = eng.findInst(u.uid).section, ap2 = eng.player(0).ap;
  click('#overlay .choices [data-i="0"]');
  assert.notEqual(eng.findInst(u.uid).section, before, 'doctrine moves chosen unit');
  assert(eng.player(0).ap < ap2, 'doctrine costs AP');
  assert.equal(h.errors.length, 0, 'no choice-handler exceptions');
  h.dom.window.close();
}
if (require.main === module) for (const mode of ['on', 'off', 'throw', 'reject', 'mutate', 'media-throw', 'media-reject', 'missing-media']) choiceTest(mode);

if (require.main === module) console.log('PASS 32 real DOM action flows: unit/slot/AP, equipment/host, instant/section, doctrine/modal/target across 8 audio modes');
