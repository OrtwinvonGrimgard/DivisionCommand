/**
 * t248: Napalm-Preis. Mischdecks, eine Kopie Napalm nur bei Spieler 0.
 * Usage: node scripts/balance/sim_napalm_ap.mjs [games=600]
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
const gamesN = Math.max(20, Number(process.argv[2] || 600));

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
const napDef = DC_CATALOG.cards.find((c) => c.id === 'dc_so_napalm');
if (!napDef) throw new Error('Napalm fehlt');

function botAct(engine, fail) {
  const pend = engine.state.pending;
  const pid = pend && typeof pend.player === 'number' ? pend.player : engine.state.active;
  let act;
  try { act = DCBot.step(engine, pid, fail) || { type: 'END_TURN', player: pid }; }
  catch (e) { act = { type: 'END_TURN', player: pid }; }
  if (!act.player && act.player !== 0) act.player = pid;
  return act;
}

function injectNapalm(deck) {
  const cards = deck.cards.slice();
  const by = Object.fromEntries(DC_CATALOG.cards.map((c) => [c.id, c]));
  const idx = cards.findIndex((id) => by[id] && by[id].typ === 'Soforteinsatz' && id !== 'dc_so_napalm');
  if (idx >= 0) cards[idx] = 'dc_so_napalm';
  else cards[cards.length - 1] = 'dc_so_napalm';
  return { cards, doctrines: deck.doctrines.slice() };
}

function play(ap, seed, nat0, nat1) {
  const prev = napDef.ap;
  napDef.ap = ap;
  const w = { DC_CATALOG, DC_NATION_DECKS };
  const d0 = injectNapalm(buildMixedDeck(w, nat0, seed));
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
  const played = (eng.log || []).some((x) => /Napalm!/.test((x && x.msg) || ''));
  const ticks = (eng.log || []).filter((x) => /brennt \(Napalm/.test((x && x.msg) || '')).length;
  const winner = eng.state.winner;
  napDef.ap = prev;
  return { winner, played, ticks, finished: winner != null || eng.state.phase === 'gameover', turns: eng.state.turn };
}

function run(ap, n) {
  let p0 = 0, draw = 0, played = 0, tickSum = 0, fin = 0;
  for (let i = 0; i < n; i++) {
    const nat0 = nations[i % 16];
    const nat1 = nations[(i * 3 + 5) % 16];
    const r = play(ap, 1000 + i * 13, nat0, nat1);
    if (r.finished) fin++;
    if (r.winner === 0) p0++;
    else if (r.winner == null) draw++;
    if (r.played) played++;
    tickSum += r.ticks;
  }
  return {
    ap, games: n, finished: fin,
    p0Wins: p0, p0Winrate: +(p0 / n).toFixed(4),
    draws: draw,
    napalmPlayed: played, playRate: +(played / n).toFixed(4),
    avgTicksWhenPlayed: played ? +(tickSum / played).toFixed(2) : 0,
  };
}

const out = { ap0: run(0, gamesN), ap3: run(3, gamesN) };
console.log(JSON.stringify(out, null, 2));
fs.mkdirSync(path.join(__dirname, 'out'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'out/sim_napalm_ap.json'), JSON.stringify(out, null, 2));
