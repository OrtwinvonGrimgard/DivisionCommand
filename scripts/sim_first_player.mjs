/**
 * First-player win rate (≥1200 RR) for classic + trophy.
 * Usage: node scripts/sim_first_player.mjs [gamesPerPairing=5]
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../Division_Command_0.5a/web');
const gamesPer = Math.max(1, Number(process.argv[2] || 5));

function loadInto(context, rel) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), context, { filename: rel });
}
const sandbox = {
  console, setTimeout, clearTimeout, setInterval, clearInterval,
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
  'js/data/sets/types/soforteinsatz.js', 'js/data/sets/types/ausruestung.js',
  'js/data/decks.js', 'js/data/catalog.js',
  'js/engine/engine.js', 'js/engine/victory_trophy.js', 'js/engine/doctrine_runtime.js', 'js/ai/bot.js',
]) loadInto(ctx, s);

const { DCEngine, DCBot, DC_CATALOG, DC_NATION_DECKS } = ctx;
DCBot.applyCfg({ model: 'test', delayMs: 0, aggression: 70, holdAp: 0, allowAttack: 1 });
const nations = Object.keys(DC_NATION_DECKS);

function nationDeck(nat) {
  const d = DC_NATION_DECKS[nat];
  return { cards: (d.cards || []).slice(), doctrines: (d.doktrinen || []).slice(0, 2), name: d.name || nat };
}
function botAct(engine, fail) {
  const pend = engine.state.pending;
  const pid = pend && typeof pend.player === 'number' ? pend.player : engine.state.active;
  let act;
  try { act = DCBot.step(engine, pid, fail) || { type: 'END_TURN', player: pid }; }
  catch (e) { act = { type: 'END_TURN', player: pid }; }
  if (!act.player && act.player !== 0) act.player = pid;
  if (pend && (!pend.choices || !pend.choices.length)) {
    if (pend.kind === 'coin' || pend.kind === 'angel-coin' || pend.kind === 'resist-coin') {
      return { type: 'COIN_FLIP', player: pid, face: engine.rand() < 0.5 ? 'kopf' : 'zahl' };
    }
  }
  if (act.type === 'RESOLVE_PENDING' && pend) {
    if (pend.kind === 'react-window') return { type: 'REACT_PASS', player: pid };
    if (pend.kind === 'geist-window') return { type: 'GEIST_PASS', player: pid };
    if (pend.kind === 'sam') return { type: 'SAM_PASS', player: pid };
  }
  return act;
}

function playMatch(nat0, nat1, seed, mode) {
  const d0 = nationDeck(nat0);
  const d1 = nationDeck(nat1);
  const rules = Object.assign({}, DC_CATALOG.rules, {
    victory_mode: mode,
    opening_coin: true,
  });
  const eng = new DCEngine.Engine(DC_CATALOG, { seed, rules });
  eng.createMatch({
    seed, mode: 'bot',
    deck0: d0.cards, deck1: d1.cards,
    doctrine0: d0.doctrines, doctrine1: d1.doctrines,
    name0: d0.name, name1: d1.name,
  });
  const startPid = (eng.state.startCoin && eng.state.startCoin.winner != null)
    ? eng.state.startCoin.winner
    : eng.state.active;
  const hand0 = eng.player(0).hand.length;
  const hand1 = eng.player(1).hand.length;

  const fail = {};
  let steps = 0, stuck = 0;
  const MAX = mode === 'classic' ? 600 : 800;
  while (eng.state.winner == null && steps < MAX) {
    const act = botAct(eng, fail);
    let res;
    try { res = eng.dispatch(act); }
    catch (err) { res = { ok: false }; }
    if (!res || !res.ok) {
      fail[DCBot.actKey(act)] = 1;
      stuck += 1;
      if (stuck > 40) {
        try {
          eng.dispatch({ type: 'END_TURN', player: eng.state.active });
          stuck = 0;
          Object.keys(fail).forEach((k) => delete fail[k]);
        } catch (e2) { break; }
      }
    } else {
      stuck = 0;
      Object.keys(fail).forEach((k) => delete fail[k]);
    }
    steps += 1;
  }
  if (eng.state.winner == null) {
    const a = eng.player(0), b = eng.player(1);
    if (a.vp !== b.vp) eng._end(a.vp > b.vp ? 0 : 1, 'timeout-SP');
    else {
      const fa = eng.frontList(a).length, fb = eng.frontList(b).length;
      if (fa !== fb) eng._end(fa > fb ? 0 : 1, 'timeout-Brett');
      else eng._end(null, 'timeout');
    }
  }
  return {
    winner: eng.state.winner,
    reason: eng.state.endReason,
    turn: eng.state.turn,
    startPid,
    firstWon: eng.state.winner === startPid,
    hand0, hand1,
  };
}

function runMode(mode, baseSeed) {
  let firstWins = 0, decided = 0, games = 0, ties = 0;
  const reasons = {};
  let seed = baseSeed;
  for (let i = 0; i < nations.length; i++) {
    for (let j = 0; j < nations.length; j++) {
      if (i === j) continue;
      for (let g = 0; g < gamesPer; g++) {
        const r = playMatch(nations[i], nations[j], seed++, mode);
        games++;
        reasons[r.reason || '?'] = (reasons[r.reason || '?'] || 0) + 1;
        if (r.winner === 0 || r.winner === 1) {
          decided++;
          if (r.firstWon) firstWins++;
        } else ties++;
        if (games % 200 === 0) process.stderr.write(mode + ' …' + games + '\n');
      }
    }
  }
  return {
    mode,
    games,
    decided,
    ties,
    firstPlayerWinRate: decided ? firstWins / decided : null,
    openingHandsEqual: true, // both hand_start; P2 +1 via turn-start draw
    topReasons: Object.entries(reasons).sort((a, b) => b[1] - a[1]).slice(0, 8),
  };
}

const classic = runMode('classic', 9000);
const trophy = runMode('trophy', 19000);
const out = {
  gamesPerPairing: gamesPer,
  pairings: nations.length * (nations.length - 1),
  note: 'Opening hands both hand_start (5). Second player draws +1 at start of their first turn (_actEnd → _draw(nxt,1)); first player has no turn-start draw on turn 1.',
  classic,
  trophy,
};
fs.writeFileSync(path.resolve(__dirname, 'sim_first_player.json'), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out, null, 2));
