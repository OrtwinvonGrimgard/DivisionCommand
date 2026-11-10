/**
 * Trophy parameter sweep. ≥1200 RR matches per candidate.
 * Usage: node scripts/sim_trophy_sweep.mjs [gamesPerPairing=5]
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../Division_Command/web');
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
  'js/data/sets/types/soforteinsatz.js', 'js/data/sets/types/ausruestung.js', 'js/data/sets/types/nation_pools.js',
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

function playMatch(nat0, nat1, seed, rulesPatch) {
  const d0 = nationDeck(nat0);
  const d1 = nationDeck(nat1);
  const rules = Object.assign({}, DC_CATALOG.rules, { victory_mode: 'trophy', opening_coin: true }, rulesPatch);
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

  const sources = { elite: 0, durchbruch: 0, doctrine: 0, other: 0 };
  eng.state.players.forEach((p) => {
    const s = (p.trophy && p.trophy.sources) || {};
    Object.keys(sources).forEach((k) => { sources[k] += Number(s[k] || 0); });
  });

  return {
    winner: eng.state.winner,
    reason: eng.state.endReason,
    turn: eng.state.turn,
    startPid,
    firstWon: eng.state.winner === startPid,
    sources,
    vp0: eng.player(0).vp,
    vp1: eng.player(1).vp,
  };
}

const CANDIDATES = [
  {
    id: 'C_ref',
    label: 'VP4 · S20/22 · DB×2/cd2 · E2 · Dok0.75 (ref)',
    rules: {
      trophy_vp_to_win: 4, trophy_safety_empty_from: 20, trophy_safety_vp_cap: 22,
      trophy_durchbruch_max_claims: 2, trophy_durchbruch_cooldown: 2,
      trophy_elite_vp: 2, trophy_doctrine_need_scale: 0.75,
    },
  },
  {
    id: 'K_vp5_late_dok65',
    label: 'VP5 · S26/28 · DB×3/cd2 · E2 · Dok0.65',
    rules: {
      trophy_vp_to_win: 5, trophy_safety_empty_from: 26, trophy_safety_vp_cap: 28,
      trophy_durchbruch_max_claims: 3, trophy_durchbruch_cooldown: 2,
      trophy_elite_vp: 2, trophy_doctrine_need_scale: 0.65,
    },
  },
  {
    id: 'L_vp5_late_elite3',
    label: 'VP5 · S26/28 · DB×3/cd2 · E3 · Dok0.7',
    rules: {
      trophy_vp_to_win: 5, trophy_safety_empty_from: 26, trophy_safety_vp_cap: 28,
      trophy_durchbruch_max_claims: 3, trophy_durchbruch_cooldown: 2,
      trophy_elite_vp: 3, trophy_doctrine_need_scale: 0.7,
    },
  },
  {
    id: 'M_vp5_s24_dok60',
    label: 'VP5 · S24/26 · DB×3/cd1 · E2 · Dok0.6',
    rules: {
      trophy_vp_to_win: 5, trophy_safety_empty_from: 24, trophy_safety_vp_cap: 26,
      trophy_durchbruch_max_claims: 3, trophy_durchbruch_cooldown: 1,
      trophy_elite_vp: 2, trophy_doctrine_need_scale: 0.6,
    },
  },
  {
    id: 'N_vp5_s28_db4',
    label: 'VP5 · S28/30 · DB×4/cd2 · E3 · Dok0.65',
    rules: {
      trophy_vp_to_win: 5, trophy_safety_empty_from: 28, trophy_safety_vp_cap: 30,
      trophy_durchbruch_max_claims: 4, trophy_durchbruch_cooldown: 2,
      trophy_elite_vp: 3, trophy_doctrine_need_scale: 0.65,
    },
  },
  {
    id: 'O_vp4_s28_dok1',
    label: 'VP4 · S28/30 · DB×2/cd3 · E2 · Dok1.0',
    rules: {
      trophy_vp_to_win: 4, trophy_safety_empty_from: 28, trophy_safety_vp_cap: 30,
      trophy_durchbruch_max_claims: 2, trophy_durchbruch_cooldown: 3,
      trophy_elite_vp: 2, trophy_doctrine_need_scale: 1,
    },
  },
  {
    id: 'P_vp5_s22_dok55',
    label: 'VP5 · S22/24 · DB×3/cd1 · E3 · Dok0.55',
    rules: {
      trophy_vp_to_win: 5, trophy_safety_empty_from: 22, trophy_safety_vp_cap: 24,
      trophy_durchbruch_max_claims: 3, trophy_durchbruch_cooldown: 1,
      trophy_elite_vp: 3, trophy_doctrine_need_scale: 0.55,
    },
  },
];

function runCandidate(cand, baseSeed) {
  const endReasons = {};
  const turns = [];
  const sourcesTot = { elite: 0, durchbruch: 0, doctrine: 0, other: 0 };
  let firstWins = 0, decided = 0, games = 0;
  let seed = baseSeed;
  for (let i = 0; i < nations.length; i++) {
    for (let j = 0; j < nations.length; j++) {
      if (i === j) continue;
      for (let g = 0; g < gamesPer; g++) {
        const r = playMatch(nations[i], nations[j], seed++, cand.rules);
        games++;
        const cls = classifyReason(r.reason);
        endReasons[cls] = (endReasons[cls] || 0) + 1;
        turns.push(r.turn);
        Object.keys(sourcesTot).forEach((k) => { sourcesTot[k] += r.sources[k] || 0; });
        if (r.winner === 0 || r.winner === 1) {
          decided++;
          if (r.firstWon) firstWins++;
        }
        if (games % 200 === 0) process.stderr.write('  ' + cand.id + ' …' + games + '\n');
      }
    }
  }
  const vp = endReasons.vp_win || 0;
  const safety = endReasons.safety_net || 0;
  const timeout = endReasons.timeout || 0;
  return {
    id: cand.id,
    label: cand.label,
    rules: cand.rules,
    games,
    endReasons,
    rates: {
      vp_win: vp / games,
      safety_net: safety / games,
      timeout: timeout / games,
    },
    medianTurns: median(turns),
    meanTurns: turns.reduce((a, b) => a + b, 0) / turns.length,
    firstPlayerWinRate: decided ? firstWins / decided : null,
    vpSources: sourcesTot,
  };
}

function score(row) {
  // Prefer VP≥70%, safety≤25%, timeout small, median 14–18
  const vp = row.rates.vp_win;
  const saf = row.rates.safety_net;
  const to = row.rates.timeout;
  const med = row.medianTurns;
  let s = 0;
  s += Math.min(vp, 0.85) * 100;
  s -= Math.max(0, saf - 0.25) * 220;
  s -= Math.max(0, 0.70 - vp) * 160;
  s -= to * 90;
  if (med >= 14 && med <= 18) s += 25;
  else s -= Math.min(35, Math.abs(med - 16) * 5);
  return s;
}

const results = [];
let baseSeed = 5000;
for (const cand of CANDIDATES) {
  process.stderr.write('=== ' + cand.id + ' ===\n');
  const row = runCandidate(cand, baseSeed);
  row.score = score(row);
  results.push(row);
  baseSeed += 100000;
  console.error(JSON.stringify({
    id: row.id,
    vp: +row.rates.vp_win.toFixed(3),
    safety: +row.rates.safety_net.toFixed(3),
    timeout: +row.rates.timeout.toFixed(3),
    med: row.medianTurns,
    fp: row.firstPlayerWinRate == null ? null : +row.firstPlayerWinRate.toFixed(3),
    score: +row.score.toFixed(2),
  }));
}

results.sort((a, b) => b.score - a.score);
const best = results[0];
const out = {
  gamesPerPairing: gamesPer,
  pairings: nations.length * (nations.length - 1),
  gamesPerCandidate: results[0] && results[0].games,
  candidates: results,
  bestId: best.id,
  bestRules: best.rules,
  target: { vp_win: '≥70%', safety_net: '≤25%', medianTurns: '14–18' },
};
const outPath = path.resolve(__dirname, 'sim_trophy_sweep.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(JSON.stringify({
  bestId: out.bestId,
  bestRules: out.bestRules,
  ranking: results.map((r) => ({
    id: r.id,
    label: r.label,
    vp: +r.rates.vp_win.toFixed(3),
    safety: +r.rates.safety_net.toFixed(3),
    timeout: +r.rates.timeout.toFixed(3),
    medianTurns: r.medianTurns,
    firstPlayerWinRate: r.firstPlayerWinRate == null ? null : +r.firstPlayerWinRate.toFixed(3),
    score: +r.score.toFixed(2),
    sources: r.vpSources,
  })),
}, null, 2));
console.error('wrote', outPath);
