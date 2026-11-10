/**
 * Trophy victory round-robin bot sim.
 * Usage: node scripts/sim_trophy_victory.mjs [gamesPerPairing=8]
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../Division_Command/web');
const gamesPer = Math.max(1, Number(process.argv[2] || 8));

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
  'js/data/sets/types/soforteinsatz.js', 'js/data/sets/types/ausruestung.js', 'js/data/sets/types/nation_pools.js',
  'js/data/decks.js', 'js/data/catalog.js',
  'js/engine/engine.js', 'js/engine/victory_trophy.js', 'js/engine/doctrine_runtime.js', 'js/ai/bot.js',
]) loadInto(ctx, s);

const { DCEngine, DCBot, DC_CATALOG, DC_NATION_DECKS, DC_TROPHY_OBJECTIVES } = ctx;
DCBot.applyCfg({ model: 'test', delayMs: 0, aggression: 70, holdAp: 0, allowAttack: 1 });
const nations = Object.keys(DC_NATION_DECKS);
const trophyRules = Object.assign({}, DC_CATALOG.rules, { victory_mode: 'trophy', trophy_vp_to_win: 5 });

function nationDeck(nat) {
  const d = DC_NATION_DECKS[nat];
  return { cards: (d.cards || []).slice(), doctrines: (d.doktrinen || []).slice(0, 2), name: d.name || nat };
}

function median(a) {
  if (!a.length) return null;
  const s = a.slice().sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function classifyReason(reason) {
  const r = String(reason || '');
  if (/Siegpunkte|Trophy/i.test(r)) return 'vp_win';
  if (/Keine Front|Zuglimit|timeout-SP|timeout-Brett/i.test(r)) return 'safety_net';
  if (/Aufgabe/i.test(r)) return 'surrender';
  if (/Frieden|unentschieden/i.test(r)) return 'peace';
  if (/timeout|Timeout|max/i.test(r)) return 'timeout';
  return 'other:' + r.slice(0, 40);
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

function playMatch(nat0, nat1, seed) {
  const d0 = nationDeck(nat0);
  const d1 = nationDeck(nat1);
  const eng = new DCEngine.Engine(DC_CATALOG, { seed, rules: trophyRules });
  eng.createMatch({
    seed, mode: 'bot',
    deck0: d0.cards, deck1: d1.cards,
    doctrine0: d0.doctrines, doctrine1: d1.doctrines,
    name0: d0.name, name1: d1.name,
  });
  const dokSeen = {};
  [0, 1].forEach((pid) => {
    const prog = eng.player(pid).trophy && eng.player(pid).trophy.doctrineProg;
    if (!prog) return;
    Object.keys(prog).forEach((id) => { dokSeen[id] = (dokSeen[id] || 0) + 1; });
  });

  const fail = {};
  let steps = 0, stuck = 0;
  const MAX = 800;
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

  const dokDone = {};
  [0, 1].forEach((pid) => {
    const prog = eng.player(pid).trophy && eng.player(pid).trophy.doctrineProg;
    if (!prog) return;
    Object.keys(prog).forEach((id) => {
      if (prog[id].done) dokDone[id] = (dokDone[id] || 0) + 1;
    });
  });

  const sources = { elite: 0, durchbruch: 0, doctrine: 0, other: 0 };
  eng.state.players.forEach((p) => {
    const s = (p.trophy && p.trophy.sources) || {};
    Object.keys(sources).forEach((k) => { sources[k] += Number(s[k] || 0); });
  });

  return {
    winner: eng.state.winner,
    reason: eng.state.endReason,
    turn: eng.state.turn,
    nat0, nat1,
    vp0: eng.player(0).vp,
    vp1: eng.player(1).vp,
    sources,
    dokSeen,
    dokDone,
  };
}

const endReasons = {};
const turns = [];
const sourcesTot = { elite: 0, durchbruch: 0, doctrine: 0, other: 0 };
const nationWins = {};
const nationGames = {};
nations.forEach((n) => { nationWins[n] = 0; nationGames[n] = 0; });
let firstWins = 0, decided = 0;
const dokSeen = {};
const dokDone = {};
Object.keys(DC_TROPHY_OBJECTIVES).forEach((id) => { dokSeen[id] = 0; dokDone[id] = 0; });

let games = 0;
let seed = 1000;
for (let i = 0; i < nations.length; i++) {
  for (let j = 0; j < nations.length; j++) {
    if (i === j) continue;
    for (let g = 0; g < gamesPer; g++) {
      const r = playMatch(nations[i], nations[j], seed++);
      games++;
      const cls = classifyReason(r.reason);
      endReasons[cls] = (endReasons[cls] || 0) + 1;
      turns.push(r.turn);
      Object.keys(sourcesTot).forEach((k) => { sourcesTot[k] += r.sources[k] || 0; });
      nationGames[r.nat0]++; nationGames[r.nat1]++;
      if (r.winner === 0) { nationWins[r.nat0]++; firstWins++; decided++; }
      else if (r.winner === 1) { nationWins[r.nat1]++; decided++; }
      Object.keys(r.dokSeen).forEach((id) => { dokSeen[id] = (dokSeen[id] || 0) + r.dokSeen[id]; });
      Object.keys(r.dokDone).forEach((id) => { dokDone[id] = (dokDone[id] || 0) + r.dokDone[id]; });
      if (games % 50 === 0) process.stderr.write('…' + games + '\n');
    }
  }
}

const dokRates = {};
Object.keys(DC_TROPHY_OBJECTIVES).forEach((id) => {
  const seen = dokSeen[id] || 0;
  const done = dokDone[id] || 0;
  dokRates[id] = {
    name: DC_TROPHY_OBJECTIVES[id].name,
    seen, done,
    rate: seen ? done / seen : null,
    need: DC_TROPHY_OBJECTIVES[id].need,
  };
});

const out = {
  games,
  gamesPerPairing: gamesPer,
  endReasons,
  medianTurns: median(turns),
  meanTurns: turns.reduce((a, b) => a + b, 0) / turns.length,
  vpSources: sourcesTot,
  firstPlayerWinRate: decided ? firstWins / decided : null,
  nationWinRates: Object.fromEntries(nations.map((n) => [n, {
    wins: nationWins[n],
    games: nationGames[n],
    rate: nationGames[n] ? nationWins[n] / nationGames[n] : null,
  }])),
  doctrineTriggerRates: dokRates,
};

const outPath = path.resolve(__dirname, 'sim_trophy_victory.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(JSON.stringify({
  games: out.games,
  endReasons: out.endReasons,
  medianTurns: out.medianTurns,
  meanTurns: +out.meanTurns.toFixed(2),
  vpSources: out.vpSources,
  firstPlayerWinRate: out.firstPlayerWinRate,
  doctrineRatesSummary: Object.values(dokRates).map((d) => ({
    name: d.name, rate: d.rate == null ? null : +d.rate.toFixed(3), seen: d.seen, need: d.need,
  })),
  nationRates: Object.entries(out.nationWinRates).map(([k, v]) => ({ nat: k, rate: v.rate == null ? null : +v.rate.toFixed(3) })),
}, null, 2));
console.error('wrote', outPath);
