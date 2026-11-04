/**
 * Trophy victory mode unit tests (flag classic by default; tests force trophy).
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '../Division_Command_0.5a/web');
function load(ctx, rel) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), ctx, { filename: rel });
}
const sandbox = {
  console, setTimeout, clearTimeout,
  document: {
    getElementById: () => null, querySelector: () => null, querySelectorAll: () => [],
    createElement: () => ({ style: {}, appendChild() {}, setAttribute() {} }),
    head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } },
    addEventListener() {},
  },
  localStorage: { getItem: () => null, setItem() {} },
  navigator: {},
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
const ctx = vm.createContext(sandbox);
for (const s of [
  'js/version.js',
  'js/data/sets/types/doktrinen.js', 'js/data/sets/types/tokens.js',
  'js/data/sets/types/infanterie.js', 'js/data/sets/types/panzer.js',
  'js/data/sets/types/artillerie.js', 'js/data/sets/types/aufklaerung.js',
  'js/data/sets/types/elite.js', 'js/data/sets/types/unterstuetzung.js',
  'js/data/sets/types/soforteinsatz.js', 'js/data/sets/types/ausruestung.js',
  'js/data/decks.js', 'js/data/catalog.js',
  'js/engine/engine.js', 'js/engine/victory_trophy.js',
]) load(ctx, s);

const { DCEngine, DC_CATALOG, DC_TROPHY, DC_TROPHY_OBJECTIVES } = ctx;
let passed = 0;
function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'assert failed');
  passed++;
  console.log('ok', msg);
}

assert(DC_CATALOG.rules.victory_mode === 'classic', 'default victory_mode classic');
assert(DC_TROPHY && DC_TROPHY_OBJECTIVES, 'trophy module loaded');
assert(Object.keys(DC_TROPHY_OBJECTIVES).length === 36, '36 doctrine objectives');

function makeTrophy(doctrine0, doctrine1) {
  const catalog = DC_CATALOG;
  const rules = Object.assign({}, catalog.rules, { victory_mode: 'trophy', trophy_vp_to_win: 5 });
  const eng = new DCEngine.Engine(catalog, { seed: 42, rules });
  const deck = DCEngine.buildTestDeck(catalog, DCEngine.rng(99)).slice(0, 60);
  eng.createMatch({
    deck0: deck, deck1: deck.slice(),
    doctrine0: doctrine0 || ['dc_dok_sturmangriff', 'dc_dok_abnutzung'],
    doctrine1: doctrine1 || ['dc_dok_feuerwalze', 'dc_dok_auffangen'],
    name0: 'A', name1: 'B',
  });
  assert(eng._trophyActive(), 'trophy active');
  assert(eng._trophyVpToWin() === 5, 'vp to win 5');
  return eng;
}

function put(eng, pid, cardId, section, row) {
  const inst = eng.instFromId(cardId, pid);
  inst.summonedTurn = eng.state.turn - 2;
  inst.facedown = false;
  eng.player(pid).front[section][row] = inst;
  return inst;
}

{
  const eng = makeTrophy(['dc_dok_sturmangriff', 'dc_dok_abnutzung']);
  const p0 = eng.player(0);
  assert(p0.trophy && p0.trophy.doctrineProg.dc_dok_sturmangriff, 'sturmangriff prog');
  assert(p0.trophy.doctrineProg.dc_dok_sturmangriff.need === 2, 'sturm need 2');
}

// Elite kill +2 VP
{
  const eng = makeTrophy();
  const inf = DC_CATALOG.cards.find((c) => (c.tags || []).includes('infanterie') && c.typ === 'Einheit' && eng.byId[c.id]);
  const elite = DC_CATALOG.cards.find((c) => DC_TROPHY.isEliteDef(c) && c.typ === 'Einheit' && eng.byId[c.id]);
  assert(inf && elite, 'have inf+elite cards');
  const a = put(eng, 0, inf.id, 'C', 0);
  a.atk = 9;
  const e = put(eng, 1, elite.id, 'C', 0);
  e.def = 1; e.defMax = 1;
  eng.state.active = 0;
  eng.player(0).ap = 5;
  a.attackUsed = false;
  eng.dispatch({ type: 'ATTACK', player: 0, uid: a.uid, target: e.uid });
  assert(eng.player(0).vp >= 2, 'elite kill +2 vp got ' + eng.player(0).vp);
  assert(eng.player(0).trophy.sources.elite >= 2, 'elite source tracked');
}

// Doctrine Sturmangriff: infantry kill
{
  const eng = makeTrophy(['dc_dok_sturmangriff', 'dc_dok_abnutzung']);
  const inf = DC_CATALOG.cards.find((c) => (c.tags || []).includes('infanterie') && c.typ === 'Einheit' && eng.byId[c.id]);
  const foe = DC_CATALOG.cards.find((c) => c.typ === 'Einheit' && eng.byId[c.id] && !(c.tags || []).includes('elite'));
  const a = put(eng, 0, inf.id, 'C', 0);
  a.atk = 9;
  const t = put(eng, 1, foe.id, 'C', 0);
  t.def = 1; t.defMax = 1;
  eng.state.active = 0;
  eng.player(0).ap = 5;
  eng.dispatch({ type: 'ATTACK', player: 0, uid: a.uid, target: t.uid });
  const prog = eng.player(0).trophy.doctrineProg.dc_dok_sturmangriff;
  assert(prog.cur >= 1, 'sturmangriff progress after infantry kill, cur=' + prog.cur);
}


// Empty front safety from turn 15
{
  const eng = makeTrophy();
  eng.state.turn = 18;
  eng.state.active = 0;
  // clear front
  ['L', 'C', 'R'].forEach((s) => { eng.player(0).front[s] = [null, null, null]; });
  // put a unit for player 1 so game isn't weird
  const inf = DC_CATALOG.cards.find((c) => c.typ === 'Einheit' && eng.byId[c.id]);
  put(eng, 1, inf.id, 'C', 0);
  eng.player(0).hand = eng.player(0).hand.slice(0, 7);
  eng.dispatch({ type: 'END_TURN', player: 0 });
  assert(eng.state.winner === 1, 'empty front at 18 loses');
}

// Classic mode: no trophy VP on elite
{
  const catalog = DC_CATALOG;
  const rules = Object.assign({}, catalog.rules, { victory_mode: 'classic' });
  const eng = new DCEngine.Engine(catalog, { seed: 1, rules });
  const deck = DCEngine.buildTestDeck(catalog, DCEngine.rng(99)).slice(0, 60);
  eng.createMatch({ deck0: deck, deck1: deck.slice(), doctrine0: ['dc_dok_sturmangriff', 'dc_dok_abnutzung'], doctrine1: ['dc_dok_feuerwalze', 'dc_dok_auffangen'] });
  assert(!eng._trophyActive(), 'classic not trophy');
  const before = eng.player(0).vp;
  const inf = DC_CATALOG.cards.find((c) => (c.tags || []).includes('infanterie') && eng.byId[c.id]);
  const elite = DC_CATALOG.cards.find((c) => DC_TROPHY.isEliteDef(c) && eng.byId[c.id]);
  const a = put(eng, 0, inf.id, 'C', 0); a.atk = 9;
  const e = put(eng, 1, elite.id, 'C', 0); e.def = 1; e.defMax = 1;
  eng.state.active = 0; eng.player(0).ap = 5;
  eng.dispatch({ type: 'ATTACK', player: 0, uid: a.uid, target: e.uid });
  assert(eng.player(0).vp === before, 'classic: no elite vp auto');
}

console.log('\nALL PASSED', passed);
