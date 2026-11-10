/**
 * Trophy victory mode unit tests (default victory_mode: trophy).
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '../Division_Command/web');
/**
 * Lädt Spielmodule (Katalog/Engine/UI) in den Test- oder Simulationskontext.
 */
function load(ctx, rel) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), ctx, { filename: rel });
}
const sandbox = {
  console, setTimeout, clearTimeout,
  document: {
    /**
     * DOM-Attrappe im Node-Kontext; liefert ein Minimal-Element oder null.
     */
    getElementById: () => null, querySelector: () => null, querySelectorAll: () => [],
    /**
     * DOM-Attrappe: erzeugt ein Minimal-Element für die Engine im Node-Kontext.
     */
    createElement: () => ({ style: {}, appendChild() {}, setAttribute() {} }),
    head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } },
    /**
     * DOM-Attrappe: Event-Listener werden ignoriert (kein Browser).
     */
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
  'js/data/sets/types/soforteinsatz.js', 'js/data/sets/types/ausruestung.js', 'js/data/sets/types/nation_pools.js',
  'js/data/decks.js', 'js/data/catalog.js',
  'js/engine/engine.js', 'js/engine/tactical_runtime.js', 'js/engine/victory_trophy.js',
]) load(ctx, s);

const { DCEngine, DC_CATALOG, DC_TROPHY, DC_TROPHY_OBJECTIVES } = ctx;
let passed = 0;
/**
 * Testprüfung: wirft mit Meldung, wenn die Bedingung nicht gilt.
 */
function assert(cond, msg) {
  if (!cond) throw new Error(msg || 'assert failed');
  passed++;
  console.log('ok', msg);
}

assert(DC_CATALOG.rules.victory_mode === 'trophy', 'default victory_mode trophy');
assert(DC_TROPHY && DC_TROPHY_OBJECTIVES, 'trophy module loaded');
assert(Object.keys(DC_TROPHY_OBJECTIVES).length === 36, '36 doctrine objectives');

/**
 * Legt eine Trophäe für den Test ins Spiel.
 */
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
    startPlayer: 0,
  });
  assert(eng._trophyActive(), 'trophy active');
  assert(eng._trophyVpToWin() === 5, 'vp to win 5');
  return eng;
}

/**
 * Legt eine Einheit aus dem Katalog auf eine Stellung.
 */
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



// Empty front before safety turn does not end
{
  const eng = makeTrophy();
  eng.state.turn = 25;
  eng.state.active = 0;
  ['L', 'C', 'R'].forEach((s) => { eng.player(0).front[s] = [null, null, null]; });
  const inf = DC_CATALOG.cards.find((c) => c.typ === 'Einheit' && eng.byId[c.id]);
  put(eng, 1, inf.id, 'C', 0);
  eng.player(0).hand = eng.player(0).hand.slice(0, 7);
  eng.dispatch({ type: 'END_TURN', player: 0 });
  assert(eng.state.winner == null, 'empty front at 25 does not end');
}

// Empty front safety from turn 26 (tuned)
{
  const eng = makeTrophy();
  eng.state.turn = 26;
  eng.state.active = 0;
  // clear front
  ['L', 'C', 'R'].forEach((s) => { eng.player(0).front[s] = [null, null, null]; });
  // put a unit for player 1 so game isn't weird
  const inf = DC_CATALOG.cards.find((c) => c.typ === 'Einheit' && eng.byId[c.id]);
  put(eng, 1, inf.id, 'C', 0);
  eng.player(0).hand = eng.player(0).hand.slice(0, 7);
  eng.dispatch({ type: 'END_TURN', player: 0 });
  assert(eng.state.winner === 1, 'empty front at 26 loses');
}

// Classic mode: no trophy VP on elite
{
  const catalog = DC_CATALOG;
  const rules = Object.assign({}, catalog.rules, { victory_mode: 'classic' });
  const eng = new DCEngine.Engine(catalog, { seed: 1, rules });
  const deck = DCEngine.buildTestDeck(catalog, DCEngine.rng(99)).slice(0, 60);
  eng.createMatch({ deck0: deck, deck1: deck.slice(), doctrine0: ['dc_dok_sturmangriff', 'dc_dok_abnutzung'], doctrine1: ['dc_dok_feuerwalze', 'dc_dok_auffangen'], startPlayer: 0 });
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


// Opening coin toss
{
  assert(DC_CATALOG.rules.opening_coin === true, 'opening_coin default on');
  const deck = DCEngine.buildTestDeck(DC_CATALOG, DCEngine.rng(99)).slice(0, 60);
  const eng = new DCEngine.Engine(DC_CATALOG, { seed: 7, rules: Object.assign({}, DC_CATALOG.rules, { victory_mode: 'classic' }) });
  eng.createMatch({ seed: 7, deck0: deck, deck1: deck.slice(), doctrine0: [], doctrine1: [], name0: 'A', name1: 'B' });
  assert(eng.state.startCoin && (eng.state.startCoin.face === 'kopf' || eng.state.startCoin.face === 'zahl'), 'coin face');
  assert(eng.state.active === eng.state.startCoin.winner, 'active matches coin');
  const engF = new DCEngine.Engine(DC_CATALOG, { seed: 8 });
  engF.createMatch({ seed: 8, startPlayer: 1, deck0: deck, deck1: deck.slice(), doctrine0: [], doctrine1: [], name0: 'A', name1: 'B' });
  assert(engF.state.active === 1 && engF.state.startCoin.forced, 'startPlayer override');
}

// Trophy knobs defaults (candidate K)
{
  assert(DC_CATALOG.rules.trophy_safety_empty_from === 26, 'safety empty 26');
  assert(DC_CATALOG.rules.trophy_safety_vp_cap === 28, 'safety cap 28');
  assert(DC_CATALOG.rules.trophy_durchbruch_max_claims === 3, 'db max 3');
  assert(DC_CATALOG.rules.trophy_doctrine_need_scale === 0.65, 'dok scale 0.65');
  const eng = makeTrophy(['dc_dok_abnutzung', 'dc_dok_sturmangriff']);
  const need = eng.player(0).trophy.doctrineProg.dc_dok_abnutzung.need;
  assert(need === Math.max(1, Math.ceil(5 * 0.65)), 'abnutzung scaled need got ' + need);
}


// Second player +1 via turn-start draw (not opening hand)
{
  const deck = DCEngine.buildTestDeck(DC_CATALOG, DCEngine.rng(3)).slice(0, 60);
  const eng = new DCEngine.Engine(DC_CATALOG, { seed: 3 });
  eng.createMatch({
    seed: 3, startPlayer: 0,
    deck0: deck, deck1: deck.slice(), doctrine0: [], doctrine1: [],
    name0: 'A', name1: 'B',
  });
  assert(eng.player(0).hand.length === DC_CATALOG.rules.hand_start, 'P1 opening = hand_start');
  assert(eng.player(1).hand.length === DC_CATALOG.rules.hand_start, 'P2 opening = hand_start (no extra opening card)');
  const before = eng.player(1).hand.length;
  eng.player(0).hand = eng.player(0).hand.slice(0, 7);
  eng.dispatch({ type: 'END_TURN', player: 0 });
  assert(eng.state.active === 1, 'P2 becomes active');
  assert(eng.player(1).hand.length === before + 1, 'P2 drew +1 at turn start, got ' + eng.player(1).hand.length);
}


// t257: kein Startspieler-AP-Abzug mehr – beide 5 AP im ersten Zug; später normal
{
  assert(DC_CATALOG.rules.opening_starter_ap_penalty === 0, 'starter AP penalty default 0 (t257)');
  const deck = DCEngine.buildTestDeck(DC_CATALOG, DCEngine.rng(11)).slice(0, 60);
  const eng = new DCEngine.Engine(DC_CATALOG, { seed: 11 });
  eng.createMatch({
    seed: 11, startPlayer: 0,
    deck0: deck, deck1: deck.slice(), doctrine0: [], doctrine1: [],
    name0: 'A', name1: 'B',
  });
  assert(eng.state.active === 0, 'P1 starts');
  assert(eng.player(0).ap === 5, 'starter first turn 5 AP got ' + eng.player(0).ap);
  assert(eng.player(1).ap === 5, 'second still 5 AP bank got ' + eng.player(1).ap);
  assert(eng.state.startCoin && eng.state.startCoin.starterApFirst === 5, 'coin records starterApFirst');
  eng.player(0).hand = eng.player(0).hand.slice(0, 7);
  eng.dispatch({ type: 'END_TURN', player: 0 });
  assert(eng.state.active === 1, 'P2 turn');
  assert(eng.player(1).ap === 5, 'P2 first own turn 5 AP got ' + eng.player(1).ap);
  eng.player(1).hand = eng.player(1).hand.slice(0, 7);
  eng.dispatch({ type: 'END_TURN', player: 1 });
  assert(eng.state.active === 0, 'P1 second turn');
  assert(eng.player(0).ap === 5, 'P1 later turns 5 AP got ' + eng.player(0).ap);
}

console.log('\nALL PASSED', passed);
