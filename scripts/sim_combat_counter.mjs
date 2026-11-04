/**
 * Bot-vs-Bot combat_counter modes (deploy_protection ON).
 * Usage: node scripts/sim_combat_counter.mjs [nGames=200] [mode=survivor_only|none|simultaneous]
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../Division_Command_0.5a/web');
const nGames = Number(process.argv[2] || 200);
const mode = String(process.argv[3] || 'survivor_only');
if (!['survivor_only', 'none', 'simultaneous'].includes(mode)) {
  console.error('bad mode', mode);
  process.exit(1);
}

function loadInto(context, rel) {
  const full = path.join(ROOT, rel);
  vm.runInContext(fs.readFileSync(full, 'utf8'), context, { filename: full });
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
  'js/data/decks.js', 'js/data/catalog.js', 'js/engine/engine.js', 'js/ai/bot.js',
]) loadInto(ctx, s);

const { DCEngine, DCBot, DC_CATALOG, DC_NATION_DECKS } = ctx;
DCBot.applyCfg({ model: 'test', delayMs: 0, aggression: 70, holdAp: 0, allowAttack: 1 });
const nations = Object.keys(DC_NATION_DECKS || {});

function nationDeck(nat) {
  const d = DC_NATION_DECKS[nat];
  return { cards: (d.cards || []).slice(), doctrines: (d.doktrinen || []).slice(0, 2), name: d.name || nat };
}
function frontCount(p) {
  let n = 0;
  for (const s of ['L', 'C', 'R']) for (let r = 0; r < 3; r++) if (p.front[s][r]) n++;
  return n;
}
function isArtyDef(def) {
  const tags = ((def.klasse || '') + ' ' + (def.tags || []).join(' ')).toLowerCase();
  return tags.includes('artillerie') || tags.includes('haubitze') || tags.includes('mörser') || tags.includes('moerser');
}
function mean(a) { return a.length ? a.reduce((x, y) => x + y, 0) / a.length : null; }
function median(a) {
  if (!a.length) return null;
  const s = a.slice().sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

function instrument(engine, stats) {
  const origDestroy = engine._destroy.bind(engine);
  engine._destroy = function (loc, meta) {
    if (loc && loc.inst && loc.zone === 'front') {
      const life = this.state.turn - (loc.inst.summonedTurn || 0);
      stats.lifetimes.push(Math.max(0, life));
      if (loc.inst.flags && loc.inst.flags._deployedFresh) {
        if (!loc.inst.attackUsed && loc.inst.summonedTurn != null && this.state.turn <= loc.inst.summonedTurn + 1) {
          stats.killedBeforeActing += 1;
        }
        stats.deployedTracked += 1;
      }
      const def = this.defOf(loc.inst);
      const typ = isArtyDef(def) ? 'arty' : (def.klasse || def.typ || 'other');
      stats.deathsByType[typ] = (stats.deathsByType[typ] || 0) + 1;
      const atk = Number(def.atk) || 0;
      const dv = Number(def.def) || 0;
      if (atk >= dv + 2) stats.deathsHighAtk += 1;
      else if (dv >= atk + 2) stats.deathsHighDef += 1;
      else stats.deathsBalanced += 1;
    }
    return origDestroy(loc, meta);
  };
  const origSlot = engine._actSlot.bind(engine);
  engine._actSlot = function (pid, a) {
    const res = origSlot(pid, a);
    if (res && res.ok) {
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
  const origHits = engine._applyCombatHits.bind(engine);
  engine._applyCombatHits = function (aLoc, tLoc, dmgToT, dmgToA, fog) {
    stats.attacks += 1;
    const aDef = this.defOf(aLoc.inst);
    const tDef = this.defOf(tLoc.inst);
    const aAtk = this.currentAtkDef(aLoc.inst).atk;
    const tAtk = this.currentAtkDef(tLoc.inst).atk;
    const tDv = this.currentAtkDef(tLoc.inst).def;
    // favorable: attacker ATK >= defender DEF (likely kill) OR attacker ATK > defender ATK (wins trade)
    if (aAtk >= tDv || aAtk > tAtk) stats.favorableAttacks += 1;
    const wasArty = isArtyDef(aDef) || (this._isArtilleryAttacker && this._isArtilleryAttacker(aLoc.inst));
    if (wasArty) stats.artyAttacks += 1;
    const beforeT = tLoc.inst.def;
    const beforeA = aLoc.inst.def;
    const r = origHits(aLoc, tLoc, dmgToT, dmgToA, fog);
    if (this._isDead(tLoc.inst) || (tLoc.inst.def != null && tLoc.inst.def < beforeT)) stats.attackDamageLanded += 1;
    const countered = aLoc.inst.def != null && aLoc.inst.def < beforeA;
    if (countered) stats.countersLanded += 1;
    if (wasArty && countered) stats.artyCountersLanded += 1;
    return r;
  };
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

function playOne(seed, nat0, nat1) {
  const catalog = JSON.parse(JSON.stringify(DC_CATALOG));
  const rules = { deploy_protection: true, strict_facing: false, combat_counter: mode };
  catalog.rules = Object.assign({}, catalog.rules, rules);
  const engine = new DCEngine.Engine(catalog, { seed, rules });
  const d0 = nationDeck(nat0), d1 = nationDeck(nat1);
  engine.createMatch({
    seed, mode: 'bot', name0: nat0, name1: nat1,
    deck0: d0.cards, deck1: d1.cards, doctrine0: d0.doctrines, doctrine1: d1.doctrines,
  });
  const stats = {
    deployed: 0, deployedTracked: 0, killedBeforeActing: 0, lifetimes: [],
    firstFullControlTurn: null, fullControlEvents: 0, attacks: 0, favorableAttacks: 0,
    artyAttacks: 0, artyCountersLanded: 0, countersLanded: 0, attackDamageLanded: 0,
    deathsByType: {}, deathsHighAtk: 0, deathsHighDef: 0, deathsBalanced: 0,
    boardIntegral: [0, 0],
  };
  instrument(engine, stats);
  const fail = {};
  let steps = 0, stuck = 0;
  const MAX = 800;
  while (engine.state.winner == null && steps < MAX) {
    const st = engine.state;
    const c0 = frontCount(st.players[0]);
    const c1 = frontCount(st.players[1]);
    stats.boardIntegral[0] += c0;
    stats.boardIntegral[1] += c1;
    if (c0 === 0 && c1 >= 3) {
      if (stats.firstFullControlTurn == null) stats.firstFullControlTurn = st.turn;
      stats.fullControlEvents += 1;
    }
    if (c1 === 0 && c0 >= 3) {
      if (stats.firstFullControlTurn == null) stats.firstFullControlTurn = st.turn;
      stats.fullControlEvents += 1;
    }
    const act = botAct(engine, fail);
    let res;
    try { res = engine.dispatch(act); }
    catch (err) { res = { ok: false, error: String(err.message || err) }; }
    if (!res || !res.ok) {
      fail[DCBot.actKey(act)] = 1;
      stuck += 1;
      if (stuck > 40) {
        try { engine.dispatch({ type: 'END_TURN', player: engine.state.active }); stuck = 0; Object.keys(fail).forEach((k) => delete fail[k]); }
        catch (e2) { break; }
      }
    } else {
      stuck = 0;
      Object.keys(fail).forEach((k) => delete fail[k]);
    }
    steps += 1;
  }
  const boardShare0 = stats.boardIntegral[0] / Math.max(1, stats.boardIntegral[0] + stats.boardIntegral[1]);
  return {
    turn: engine.state.turn, winner: engine.state.winner, steps,
    firstFullControlTurn: stats.firstFullControlTurn,
    fullControlShare: stats.fullControlEvents > 0 ? 1 : 0,
    deployed: stats.deployed,
    killedBeforeActing: stats.killedBeforeActing,
    killBeforeRate: stats.deployed ? stats.killedBeforeActing / stats.deployed : 0,
    lifetimes: stats.lifetimes,
    attacks: stats.attacks,
    favorableRate: stats.attacks ? stats.favorableAttacks / stats.attacks : 0,
    artyAttackShare: stats.attacks ? stats.artyAttacks / stats.attacks : 0,
    artyCounterRate: stats.artyAttacks ? stats.artyCountersLanded / stats.artyAttacks : 0,
    counterRate: stats.attacks ? stats.countersLanded / stats.attacks : 0,
    deathsHighAtk: stats.deathsHighAtk,
    deathsHighDef: stats.deathsHighDef,
    deathsBalanced: stats.deathsBalanced,
    deathsByType: stats.deathsByType,
    boardShare0,
    nat0, nat1,
  };
}

const results = [];
for (let i = 0; i < nGames; i++) {
  const nat0 = nations[i % nations.length];
  const nat1 = nations[(i * 7 + 3) % nations.length];
  const seed = (2000 + i * 7919) >>> 0;
  try { results.push(playOne(seed, nat0, nat1)); }
  catch (err) { results.push({ error: String(err && err.stack || err), nat0, nat1, seed }); }
  if ((i + 1) % 50 === 0) process.stderr.write(`… ${mode} ${i + 1}/${nGames}\n`);
}

const ok = results.filter((r) => !r.error);
const lifetimes = ok.flatMap((r) => r.lifetimes);
const nationBoard = {};
ok.forEach((r) => {
  nationBoard[r.nat0] = nationBoard[r.nat0] || { shareSum: 0, n: 0 };
  nationBoard[r.nat1] = nationBoard[r.nat1] || { shareSum: 0, n: 0 };
  nationBoard[r.nat0].shareSum += r.boardShare0;
  nationBoard[r.nat0].n += 1;
  nationBoard[r.nat1].shareSum += (1 - r.boardShare0);
  nationBoard[r.nat1].n += 1;
});
const nationBoardAvg = {};
Object.keys(nationBoard).forEach((k) => {
  nationBoardAvg[k] = nationBoard[k].shareSum / nationBoard[k].n;
});
const deathsHighAtk = ok.reduce((a, r) => a + r.deathsHighAtk, 0);
const deathsHighDef = ok.reduce((a, r) => a + r.deathsHighDef, 0);
const deathsBal = ok.reduce((a, r) => a + r.deathsBalanced, 0);
const deathTot = deathsHighAtk + deathsHighDef + deathsBal || 1;

const summary = {
  mode,
  deploy_protection: true,
  nGames,
  ok: ok.length,
  errors: results.length - ok.length,
  avgTurnEnd: mean(ok.map((r) => r.turn)),
  shareEverFullControl: mean(ok.map((r) => r.fullControlShare)),
  avgFirstFullControlTurn: mean(ok.map((r) => r.firstFullControlTurn).filter((x) => x != null)),
  medianFirstFullControlTurn: median(ok.map((r) => r.firstFullControlTurn).filter((x) => x != null)),
  avgKillBeforeActingRate: mean(ok.map((r) => r.killBeforeRate)),
  avgUnitLifetimeTurns: mean(lifetimes),
  medianUnitLifetimeTurns: median(lifetimes),
  avgAttacksPerGame: mean(ok.map((r) => r.attacks)),
  favorableAttackShare: mean(ok.map((r) => r.favorableRate)),
  counterLandShare: mean(ok.map((r) => r.counterRate)),
  artyAttackShare: mean(ok.map((r) => r.artyAttackShare)),
  artyCounterRate: mean(ok.map((r) => r.artyCounterRate)),
  deathShareHighAtk: deathsHighAtk / deathTot,
  deathShareHighDef: deathsHighDef / deathTot,
  deathShareBalanced: deathsBal / deathTot,
  nationBoardShare: nationBoardAvg,
};

console.log(JSON.stringify(summary, null, 2));
fs.writeFileSync(
  path.resolve(__dirname, `../Division_Command_0.5a/sim_counter_${mode}.json`),
  JSON.stringify({ summary }, null, 2)
);
