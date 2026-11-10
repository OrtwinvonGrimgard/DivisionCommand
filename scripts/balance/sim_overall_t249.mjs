/**
 * t249: kurzer Gesamt-Balancecheck Starter + Mischdecks gegen v0.6b-Korridor.
 * Usage: node scripts/balance/sim_overall_t249.mjs [gamesPerPairing=4]
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
const gamesPer = Math.max(1, Number(process.argv[2] || 4));

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

function botAct(engine, fail) {
  const pend = engine.state.pending;
  const pid = pend && typeof pend.player === 'number' ? pend.player : engine.state.active;
  let act;
  try { act = DCBot.step(engine, pid, fail) || { type: 'END_TURN', player: pid }; }
  catch (e) { act = { type: 'END_TURN', player: pid }; }
  if (!act.player && act.player !== 0) act.player = pid;
  return act;
}

function starterOf(nat) {
  const d = DC_NATION_DECKS[nat];
  return { cards: (d.cards || []).slice(), doctrines: (d.doktrinen || []).slice(0, 2) };
}

function play(d0, d1, seed, nat0, nat1) {
  const startPlayer = seed % 2;
  const eng = new DCEngine.Engine(DC_CATALOG, { seed, rules: trophyRules });
  eng.createMatch({
    seed, mode: 'hotseat', startPlayer,
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
  return { winner: eng.state.winner, startPlayer, finished: eng.state.winner != null || eng.state.phase === 'gameover' };
}

function sweep(mode) {
  const wr = Object.fromEntries(nations.map((n) => [n, { w: 0, g: 0 }]));
  let startW = 0, startG = 0, fin = 0, games = 0;
  let gi = 0;
  for (const a of nations) {
    for (const b of nations) {
      if (a === b) continue;
      for (let g = 0; g < gamesPer; g++) {
        const seed = (mode === 'mixed' ? 410000 : 510000) + gi * 17 + g;
        const w = { DC_CATALOG, DC_NATION_DECKS };
        const d0 = mode === 'mixed' ? buildMixedDeck(w, a, seed) : starterOf(a);
        const d1 = mode === 'mixed' ? buildMixedDeck(w, b, seed + 9) : starterOf(b);
        const r = play(d0, d1, seed, a, b);
        games++;
        if (r.finished) fin++;
        if (r.winner === 0) wr[a].w++;
        if (r.winner === 1) wr[b].w++;
        wr[a].g++; wr[b].g++;
        if (r.winner === r.startPlayer) startW++;
        if (r.winner != null) startG++;
        gi++;
      }
    }
  }
  const nationsOut = {};
  let lo = 1, hi = 0;
  for (const n of nations) {
    const rate = wr[n].g ? wr[n].w / wr[n].g : 0;
    nationsOut[n] = { games: wr[n].g, wins: wr[n].w, winrate: +rate.toFixed(4) };
    if (rate < lo) lo = rate;
    if (rate > hi) hi = rate;
  }
  return {
    mode, gamesPerPairing: gamesPer, games, finished: fin,
    firstPlayerWinrate: startG ? +(startW / startG).toFixed(4) : null,
    firstPlayerGames: startG,
    span: [+lo.toFixed(4), +hi.toFixed(4)],
    nations: nationsOut,
  };
}

const out = { mixed: sweep('mixed'), starter: sweep('starter') };
console.log(JSON.stringify(out, null, 2));
fs.mkdirSync(path.join(__dirname, 'out'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'out/sim_overall_t249.json'), JSON.stringify(out, null, 2));
