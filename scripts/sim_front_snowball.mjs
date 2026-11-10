/**
 * Headless Bot-vs-Bot Front-Snowball Simulation
 * Usage: node scripts/sim_front_snowball.mjs [nGames=200] [mode=baseline|deploy_protection|strict_facing|both]
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../Division_Command/web');

const nGames = Number(process.argv[2] || 200);
const mode = String(process.argv[3] || 'baseline');

const ruleOverrides = {
  baseline: {},
  deploy_protection: { deploy_protection: true },
  strict_facing: { strict_facing: true },
  both: { deploy_protection: true, strict_facing: true },
}[mode];
if (!ruleOverrides) {
  console.error('Unknown mode', mode);
  process.exit(1);
}

function loadInto(context, rel) {
  const full = path.join(ROOT, rel);
  const code = fs.readFileSync(full, 'utf8');
  vm.runInContext(code, context, { filename: full });
}

const sandbox = {
  console,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval,
  window: null,
  document: {
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    createElement: () => ({ style: {}, appendChild() {}, remove() {}, setAttribute() {}, onload: null, onerror: null }),
    head: { appendChild() {} },
    body: { classList: { add() {}, remove() {} } },
    addEventListener() {},
    removeEventListener() {},
  },
  localStorage: { getItem: () => null, setItem() {} },
  navigator: {},
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
sandbox.self = sandbox;
const ctx = vm.createContext(sandbox);

const scripts = [
  'js/version.js',
  'js/data/sets/types/doktrinen.js',
  'js/data/sets/types/tokens.js',
  'js/data/sets/types/infanterie.js',
  'js/data/sets/types/panzer.js',
  'js/data/sets/types/artillerie.js',
  'js/data/sets/types/aufklaerung.js',
  'js/data/sets/types/elite.js',
  'js/data/sets/types/unterstuetzung.js',
  'js/data/sets/types/soforteinsatz.js',
  'js/data/sets/types/ausruestung.js', 'js/data/sets/types/nation_pools.js',
  'js/data/decks.js',
  'js/data/catalog.js',
  'js/engine/engine.js',
  'js/ai/bot.js',
];
for (const s of scripts) loadInto(ctx, s);

const { DCEngine, DCBot, DC_CATALOG, DC_NATION_DECKS } = ctx;
if (!DCEngine || !DCBot || !DC_CATALOG) {
  console.error('Load failed', !!DCEngine, !!DCBot, !!DC_CATALOG);
  process.exit(1);
}
DCBot.applyCfg({ model: 'test', delayMs: 0, aggression: 70, holdAp: 0, allowAttack: 1 });

const nations = Object.keys(DC_NATION_DECKS || {});
if (!nations.length) {
  console.error('No nation decks');
  process.exit(1);
}

function nationDeck(nat) {
  const d = DC_NATION_DECKS[nat];
  return {
    cards: (d.cards || []).slice(),
    doctrines: (d.doktrinen || []).slice(0, 2),
    name: d.name || nat,
  };
}

function frontCount(p) {
  let n = 0;
  for (const s of ['L', 'C', 'R']) for (let r = 0; r < 3; r++) if (p.front[s][r]) n++;
  return n;
}

function emptyFront(p) {
  return frontCount(p) === 0;
}

function instrument(engine, stats) {
  const origDestroy = engine._destroy.bind(engine);
  engine._destroy = function (loc, meta) {
    if (loc && loc.inst && loc.zone === 'front') {
      const life = (this.state.turn - (loc.inst.summonedTurn || 0));
      stats.lifetimes.push(Math.max(0, life));
      if (loc.inst.flags && loc.inst.flags._deployedFresh) {
        if (!loc.inst.attackUsed && (loc.inst.summonedTurn != null) && this.state.turn <= loc.inst.summonedTurn + 1) {
          stats.killedBeforeActing += 1;
        }
        stats.deployedTracked += 1;
      }
    }
    return origDestroy(loc, meta);
  };
  const origSlot = engine._actSlot.bind(engine);
  engine._actSlot = function (pid, a) {
    const before = this.state && this.state.pending && this.state.pending.uid;
    const res = origSlot(pid, a);
    if (res && res.ok && before) {
      const loc = this.findInst(before) || null;
      // after deploy uid is on board; pending cleared — search by summonedTurn
      const p = this.player(pid);
      this.frontList(p).forEach((l) => {
        if (l.inst && l.inst.summonedTurn === this.state.turn && !l.inst.flags._deployMarked) {
          l.inst.flags._deployMarked = true;
          l.inst.flags._deployedFresh = true;
          stats.deployed += 1;
        }
      });
    }
    return res;
  };
}

function botAct(engine, fail) {
  const pend = engine.state.pending;
  const pid = pend && typeof pend.player === 'number' ? pend.player : engine.state.active;
  let act;
  try {
    act = DCBot.step(engine, pid, fail) || { type: 'END_TURN', player: pid };
  } catch (e) {
    act = { type: 'END_TURN', player: pid };
  }
  if (!act.player && act.player !== 0) act.player = pid;

  // coin / confirm pending without choices
  if (pend && (!pend.choices || !pend.choices.length)) {
    if (pend.kind === 'coin' || pend.kind === 'angel-coin' || pend.kind === 'resist-coin') {
      return { type: 'COIN_FLIP', player: pid, face: engine.rand() < 0.5 ? 'kopf' : 'zahl' };
    }
    if (act.type === 'RESOLVE_PENDING' && act.confirm) {
      if (pend.kind === 'react-window' || pend.kind === 'geist-window' || pend.kind === 'sam') {
        return { type: pend.kind === 'sam' ? 'SAM_PASS' : (pend.kind === 'geist-window' ? 'GEIST_PASS' : 'REACT_PASS'), player: pid };
      }
    }
  }
  if (act.type === 'RESOLVE_PENDING' && pend && pend.kind === 'react-window') {
    return { type: 'REACT_PASS', player: pid };
  }
  if (act.type === 'RESOLVE_PENDING' && pend && pend.kind === 'geist-window') {
    return { type: 'GEIST_PASS', player: pid };
  }
  if (act.type === 'RESOLVE_PENDING' && pend && pend.kind === 'sam') {
    return { type: 'SAM_PASS', player: pid };
  }
  return act;
}

function playOne(seed, nat0, nat1) {
  const catalog = JSON.parse(JSON.stringify(DC_CATALOG));
  catalog.rules = Object.assign({}, catalog.rules, ruleOverrides);
  const engine = new DCEngine.Engine(catalog, { seed, rules: ruleOverrides });
  const d0 = nationDeck(nat0);
  const d1 = nationDeck(nat1);
  engine.createMatch({
    seed,
    mode: 'bot',
    name0: nat0,
    name1: nat1,
    deck0: d0.cards,
    deck1: d1.cards,
    doctrine0: d0.doctrines,
    doctrine1: d1.doctrines,
  });

  const stats = {
    deployed: 0,
    deployedTracked: 0,
    killedBeforeActing: 0,
    lifetimes: [],
    firstFullControlTurn: null,
    fullControlEvents: 0,
    boardLostThenRecovered: 0,
    maxLead: 0,
  };
  instrument(engine, stats);

  let sawEmpty = [false, false];
  let recovered = [false, false];
  const fail = {};
  let steps = 0;
  const MAX = 800;
  let stuck = 0;

  while (engine.state.winner == null && steps < MAX) {
    const st = engine.state;
    const c0 = frontCount(st.players[0]);
    const c1 = frontCount(st.players[1]);
    stats.maxLead = Math.max(stats.maxLead, Math.abs(c0 - c1));

    if (c0 === 0 && c1 >= 3) {
      if (stats.firstFullControlTurn == null) stats.firstFullControlTurn = st.turn;
      stats.fullControlEvents += 1;
      sawEmpty[0] = true;
    }
    if (c1 === 0 && c0 >= 3) {
      if (stats.firstFullControlTurn == null) stats.firstFullControlTurn = st.turn;
      stats.fullControlEvents += 1;
      sawEmpty[1] = true;
    }
    if (sawEmpty[0] && c0 > 0) recovered[0] = true;
    if (sawEmpty[1] && c1 > 0) recovered[1] = true;

    const beforeSeq = st.seq;
    const beforePend = st.pending && st.pending.kind;
    const act = botAct(engine, fail);
    let res;
    try {
      res = engine.dispatch(act);
    } catch (err) {
      res = { ok: false, error: String(err.message || err) };
    }
    if (!res || !res.ok) {
      const key = DCBot.actKey(act);
      fail[key] = 1;
      stuck += 1;
      if (stuck > 40) {
        // force end turn if possible
        try {
          engine.dispatch({ type: 'END_TURN', player: engine.state.active });
          stuck = 0;
          Object.keys(fail).forEach((k) => delete fail[k]);
        } catch (e2) {
          break;
        }
      }
    } else {
      stuck = 0;
      if (engine.state.seq !== beforeSeq || (engine.state.pending && engine.state.pending.kind) !== beforePend) {
        Object.keys(fail).forEach((k) => delete fail[k]);
      }
    }
    steps += 1;
  }

  if ((sawEmpty[0] && recovered[0]) || (sawEmpty[1] && recovered[1])) stats.boardLostThenRecovered = 1;

  return {
    steps,
    turn: engine.state.turn,
    winner: engine.state.winner,
    firstFullControlTurn: stats.firstFullControlTurn,
    fullControlShare: stats.fullControlEvents > 0 ? 1 : 0,
    deployed: stats.deployed,
    killedBeforeActing: stats.killedBeforeActing,
    killBeforeRate: stats.deployed ? stats.killedBeforeActing / stats.deployed : 0,
    lifetimes: stats.lifetimes,
    comeback: stats.boardLostThenRecovered,
    maxLead: stats.maxLead,
    nat0,
    nat1,
  };
}

function mean(arr) {
  if (!arr.length) return null;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
function median(arr) {
  if (!arr.length) return null;
  const s = arr.slice().sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

const results = [];
for (let i = 0; i < nGames; i++) {
  const nat0 = nations[i % nations.length];
  const nat1 = nations[(i * 7 + 3) % nations.length];
  const seed = (1000 + i * 9973) >>> 0;
  try {
    results.push(playOne(seed, nat0, nat1));
  } catch (err) {
    results.push({ error: String(err && err.stack || err), nat0, nat1, seed });
  }
  if ((i + 1) % 25 === 0) process.stderr.write(`… ${i + 1}/${nGames}\n`);
}

const ok = results.filter((r) => !r.error);
const lifetimes = ok.flatMap((r) => r.lifetimes);
const summary = {
  mode,
  ruleOverrides,
  nGames,
  ok: ok.length,
  errors: results.length - ok.length,
  avgTurnEnd: mean(ok.map((r) => r.turn)),
  shareEverFullControl: mean(ok.map((r) => r.fullControlShare)),
  avgFirstFullControlTurn: mean(ok.map((r) => r.firstFullControlTurn).filter((x) => x != null)),
  medianFirstFullControlTurn: median(ok.map((r) => r.firstFullControlTurn).filter((x) => x != null)),
  avgKillBeforeActingRate: mean(ok.map((r) => r.killBeforeRate)),
  totalDeployed: ok.reduce((a, r) => a + r.deployed, 0),
  totalKilledBeforeActing: ok.reduce((a, r) => a + r.killedBeforeActing, 0),
  avgUnitLifetimeTurns: mean(lifetimes),
  medianUnitLifetimeTurns: median(lifetimes),
  comebackRateAfterBoardLoss: mean(ok.map((r) => r.comeback)),
  avgMaxFrontLead: mean(ok.map((r) => r.maxLead)),
};

console.log(JSON.stringify(summary, null, 2));
const outDir = path.resolve(__dirname, '../Division_Command');
fs.writeFileSync(path.join(outDir, `sim_front_${mode}.json`), JSON.stringify({ summary, results: ok.slice(0, 20) }, null, 2));
