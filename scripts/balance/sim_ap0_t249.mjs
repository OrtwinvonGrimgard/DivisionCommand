/**
 * t249: AP-Preise der zehn Soforteinsätze. Mischdecks, eine Kopie nur bei Spieler 0.
 * Usage: node scripts/balance/sim_ap0_t249.mjs [games=400]
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../../Division_Command/web');
const require = createRequire(import.meta.url);
const { buildMixedDeck } = require('../nation_pools/mixed_deck.js');
const gamesN = Math.max(20, Number(process.argv[2] || 400));

const CARDS = [
  { id: 'dc_so_luftschlag', name: 'Luftschlag', apNew: 4 },
  { id: 'dc_so_dammbruch', name: 'Dammbruch', apNew: 6 },
  { id: 'dc_so_massen', name: 'Psychologie der Massen', apNew: 6 },
  { id: 'dc_so_mobil', name: 'Generalmobilmachung', apNew: 4 },
  { id: 'dc_so_blinder_gehorsam', name: 'Blinder Gehorsam', apNew: 6 },
  { id: 'dc_so_gassen', name: 'Einsame Gassen', apNew: 6 },
  { id: 'dc_so_mobilisierung', name: 'Mobilisierung', apNew: 3 },
  { id: 'dc_so_deckung', name: 'Deckung suchen', apNew: 2 },
  { id: 'dc_so_selbst', name: 'Selbstopfer', apNew: 2 },
  { id: 'dc_so_letzter', name: 'Der Letzte der steht', apNew: 3 },
];

function loadInto(context, rel) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), context, { filename: rel });
}
const sandbox = {
  console, setTimeout, clearTimeout,
  document: {
    getElementById: () => null, querySelector: () => null, querySelectorAll: () => [],
    createElement: () => ({ style: {}, appendChild() {}, remove() {}, setAttribute() {}, onload: null, onerror: null }),
    head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } },
    addEventListener() {}, removeEventListener() {},
  },
  localStorage: { getItem: () => null, setItem() {} },
  navigator: {},
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
sandbox.self = sandbox;
const ctx = vm.createContext(sandbox);
for (const s of [
  'js/version.js',
  'js/data/sets/types/doktrinen.js', 'js/data/sets/types/tokens.js',
  'js/data/sets/types/infanterie.js', 'js/data/sets/types/panzer.js',
  'js/data/sets/types/artillerie.js', 'js/data/sets/types/aufklaerung.js',
  'js/data/sets/types/elite.js', 'js/data/sets/types/unterstuetzung.js',
  'js/data/sets/types/soforteinsatz.js', 'js/data/sets/types/ausruestung.js', 'js/data/sets/types/nation_pools.js',
  'js/data/decks.js', 'js/data/catalog.js',
  'js/engine/engine.js', 'js/engine/victory_trophy.js', 'js/engine/doctrine_runtime.js', 'js/ai/bot.js',
]) loadInto(ctx, s);

const { DCEngine, DCBot, DC_CATALOG, DC_NATION_DECKS } = ctx;
DCBot.applyCfg({ model: 'test', delayMs: 0, aggression: 70, holdAp: 0, allowAttack: 1 });
const nations = Object.keys(DC_NATION_DECKS);
const trophyRules = Object.assign({}, DC_CATALOG.rules, { victory_mode: 'trophy', trophy_vp_to_win: 5 });
const byId = Object.fromEntries(DC_CATALOG.cards.map((c) => [c.id, c]));

function botAct(engine, fail) {
  const pend = engine.state.pending;
  const pid = pend && typeof pend.player === 'number' ? pend.player : engine.state.active;
  let act;
  try { act = DCBot.step(engine, pid, fail) || { type: 'END_TURN', player: pid }; }
  catch (e) { act = { type: 'END_TURN', player: pid }; }
  if (!act.player && act.player !== 0) act.player = pid;
  return act;
}

function cidOf(c) { return c && (c.id || c.cardId); }
function inZone(list, id) { return (list || []).some((c) => cidOf(c) === id); }
function frontHas(p, id) {
  for (const s of ['L', 'C', 'R']) for (const x of (p.front[s] || [])) if (cidOf(x) === id) return true;
  return false;
}

function inject(deck, id) {
  const cards = deck.cards.slice();
  const idx = cards.findIndex((x) => byId[x] && byId[x].typ === 'Soforteinsatz' && x !== id);
  if (idx >= 0) cards[idx] = id;
  else cards[cards.length - 1] = id;
  return { cards, doctrines: deck.doctrines.slice() };
}

function playedOf(eng, id, name) {
  const p0 = eng.player(0);
  if (inZone(p0.grave, id)) return true;
  const msgs = (eng.log || []).map((x) => String((x && x.msg) || ''));
  if (name && msgs.some((m) => m.includes(name))) return true;
  const still = inZone(p0.deck, id) || inZone(p0.hand, id) || inZone(p0.support, id) || frontHas(p0, id);
  return !still;
}

function play(id, ap, seed, nat0, nat1) {
  const def = byId[id];
  const prev = def.ap;
  def.ap = ap;
  const w = { DC_CATALOG, DC_NATION_DECKS };
  const d0 = inject(buildMixedDeck(w, nat0, seed), id);
  const d1 = buildMixedDeck(w, nat1, seed + 17);
  const eng = new DCEngine.Engine(DC_CATALOG, { seed, rules: trophyRules });
  eng.createMatch({
    seed, mode: 'hotseat', startPlayer: seed % 2,
    deck0: d0.cards, deck1: d1.cards,
    doctrine0: d0.doctrines, doctrine1: d1.doctrines,
    name0: nat0, name1: nat1,
  });
  let steps = 0;
  const fail = {};
  while (eng.state.winner == null && steps++ < 4000) {
    const act = botAct(eng, fail);
    const r = eng.dispatch(act);
    if (!r || !r.ok) {
      fail[DCBot.actKey ? DCBot.actKey(act) : JSON.stringify(act)] = 1;
      if (act.type !== 'END_TURN') eng.dispatch({ type: 'END_TURN', player: act.player });
    }
  }
  const winner = eng.state.winner;
  const played = playedOf(eng, id, def.name);
  def.ap = prev;
  return { winner, played, finished: winner != null || eng.state.phase === 'gameover' };
}

function run(id, ap, n, salt) {
  let p0 = 0, draw = 0, played = 0, fin = 0;
  for (let i = 0; i < n; i++) {
    const nat0 = nations[i % 16];
    const nat1 = nations[(i * 3 + 5) % 16];
    const r = play(id, ap, salt + i * 13, nat0, nat1);
    if (r.finished) fin++;
    if (r.winner === 0) p0++;
    else if (r.winner == null) draw++;
    if (r.played) played++;
  }
  return {
    ap, games: n, finished: fin,
    p0Wins: p0, p0Winrate: +(p0 / n).toFixed(4),
    draws: draw, played, playRate: +(played / n).toFixed(4),
  };
}

const out = {};
for (const c of CARDS) {
  const ap0 = run(c.id, 0, gamesN, 2000);
  const apN = run(c.id, c.apNew, gamesN, 2000);
  out[c.id] = { name: c.name, ap0, apNew: apN };
  console.error(c.name, '0→' + c.apNew, 'WR', ap0.p0Winrate, '→', apN.p0Winrate, 'play', ap0.playRate, '→', apN.playRate);
}
console.log(JSON.stringify(out, null, 2));
fs.mkdirSync(path.join(__dirname, 'out'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'out/sim_ap0_t249.json'), JSON.stringify(out, null, 2));
