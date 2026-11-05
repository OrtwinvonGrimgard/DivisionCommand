/**
 * ANALYSIS ONLY — nation deck strength round-robin + static metrics.
 * Usage: node scripts/sim_nation_strength.mjs [gamesPerPairing=10]
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../Division_Command_0.5a/web');
const gamesPer = Math.max(1, Number(process.argv[2] || 10));

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
  'js/data/decks.js', 'js/data/catalog.js',
  'js/engine/engine.js', 'js/engine/victory_trophy.js', 'js/ai/bot.js',
]) loadInto(ctx, s);

const { DCEngine, DCBot, DC_CATALOG, DC_NATION_DECKS } = ctx;
DCBot.applyCfg({ model: 'test', delayMs: 0, aggression: 70, holdAp: 0, allowAttack: 1 });
const nations = Object.keys(DC_NATION_DECKS);
const byId = Object.fromEntries(DC_CATALOG.cards.map((c) => [c.id, c]));

function nationDeck(nat) {
  const d = DC_NATION_DECKS[nat];
  return { cards: (d.cards || []).slice(), doctrines: (d.doktrinen || []).slice(0, 2), name: d.name || nat, theme: d.theme || '' };
}
function frontCount(p) {
  let n = 0;
  for (const s of ['L', 'C', 'R']) for (let r = 0; r < 3; r++) if (p.front[s][r]) n++;
  return n;
}
function isArtyDef(def) {
  if (!def) return false;
  const tags = ((def.klasse || '') + ' ' + (def.tags || []).join(' ')).toLowerCase();
  return tags.includes('artillerie') || tags.includes('haubitze') || tags.includes('mörser') || tags.includes('moerser')
    || (def.effects || []).some((e) => e.code === 'ATTACK_ANY_FRONT');
}
function mean(a) { return a.length ? a.reduce((x, y) => x + y, 0) / a.length : null; }
function median(a) {
  if (!a.length) return null;
  const s = a.slice().sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

const SELFISH = /SELF_DAMAGE|SELF_DMG|PAIN|SACRIFICE|THEN_DESTROY|KILL_SELF|DAMAGE_SELF|COST_LIFE|MARTYR|SELBST/;
const DRAWISH = /DRAW|HAND|NACHZIEH|ZIEHE/;
const HEALISH = /HEAL|HEILE|REPAIR|INSTAND/;
const APISH = /AP_|GAIN_AP|EXTRA_AP|AP_BANK|AKTION/;
const CONDITIONAL = /IF_|WHEN_|ON_|COND_|GEGEN_|NUR_/;
const PROTECT = /NEGATE|SHIELD|DIG|EINGRAB|PROTECT|NO_COMBAT|DEPLOY/;

function classifyEffects(card) {
  const codes = (card.effects || []).map((e) => String(e.code || '').toUpperCase());
  const text = String(card.text || '').toLowerCase();
  const bag = codes.join(' ') + ' ' + text;
  return {
    selfHurt: SELFISH.test(bag) || /selbstschaden|verliere \d|opfer|implant|schnitt/.test(text),
    draw: DRAWISH.test(bag) || /ziehe|nachzieh/.test(text),
    heal: HEALISH.test(bag) || /heile|heilung/.test(text),
    ap: APISH.test(bag) || /\+\d+\s*ap|aktionspunkt/.test(text),
    conditional: CONDITIONAL.test(bag) || /solange|wenn |falls |gegen /.test(text),
    protect: PROTECT.test(bag) || /schutz|negier|eingrab/.test(text),
    codes,
  };
}

function staticNation(nat) {
  const d = nationDeck(nat);
  const cards = d.cards.map((id) => byId[id]).filter(Boolean);
  const units = cards.filter((c) => c.typ === 'Einheit');
  const byTyp = {};
  cards.forEach((c) => { byTyp[c.typ] = (byTyp[c.typ] || 0) + 1; });
  const rar = { bronze: 0, silver: 0, gold: 0, other: 0 };
  cards.forEach((c) => {
    const r = String(c.rarity || 'other').toLowerCase();
    if (r === 'gold') rar.gold++;
    else if (r === 'silver' || r === 'silber') rar.silver++;
    else if (r === 'bronze') rar.bronze++;
    else rar.other++;
  });
  const costs = cards.map((c) => Number(c.ap) || 0);
  const unitStats = units.map((c) => {
    const ap = Math.max(1, Number(c.ap) || 1);
    const atk = Number(c.atk) || 0;
    const def = Number(c.def) || 0;
    return { ap, atk, def, atkPerAp: atk / ap, defPerAp: def / ap, sumPerAp: (atk + def) / ap, name: c.name, id: c.id };
  });
  const costBuckets = { '0-1': 0, '2': 0, '3': 0, '4': 0, '5+': 0 };
  costs.forEach((ap) => {
    if (ap <= 1) costBuckets['0-1']++;
    else if (ap === 2) costBuckets['2']++;
    else if (ap === 3) costBuckets['3']++;
    else if (ap === 4) costBuckets['4']++;
    else costBuckets['5+']++;
  });
  let fx = { selfHurt: 0, draw: 0, heal: 0, ap: 0, conditional: 0, protect: 0, withEffects: 0, empty: 0 };
  const selfHurtCards = [];
  const drawCards = [];
  const healCards = [];
  cards.forEach((c) => {
    const cl = classifyEffects(c);
    if (!(c.effects || []).length) fx.empty++;
    else fx.withEffects++;
    if (cl.selfHurt) { fx.selfHurt++; selfHurtCards.push(c.name); }
    if (cl.draw) { fx.draw++; drawCards.push(c.name); }
    if (cl.heal) { fx.heal++; healCards.push(c.name); }
    if (cl.ap) fx.ap++;
    if (cl.conditional) fx.conditional++;
    if (cl.protect) fx.protect++;
  });
  const arty = units.filter(isArtyDef).length;
  const cheapUnits = units.filter((c) => (Number(c.ap) || 0) <= 2).map((c) => `${c.name}(${c.ap}/${c.atk}/${c.def})`);
  const doctrines = d.doctrines.map((id) => {
    const c = byId[id];
    return c ? { id, name: c.name, text: (c.text || '').slice(0, 160), effects: (c.effects || []).map((e) => e.code) } : { id };
  });
  return {
    nat, theme: d.theme, displayName: d.name,
    byTyp, rar,
    avgAp: mean(costs),
    medianAp: median(costs),
    costBuckets,
    unitCount: units.length,
    avgUnitAtk: mean(unitStats.map((u) => u.atk)),
    avgUnitDef: mean(unitStats.map((u) => u.def)),
    avgAtkPerAp: mean(unitStats.map((u) => u.atkPerAp)),
    avgDefPerAp: mean(unitStats.map((u) => u.defPerAp)),
    avgSumPerAp: mean(unitStats.map((u) => u.sumPerAp)),
    artyUnits: arty,
    artyShareUnits: units.length ? arty / units.length : 0,
    fx,
    selfHurtCards: selfHurtCards.slice(0, 8),
    drawCards: drawCards.slice(0, 8),
    healCards: healCards.slice(0, 8),
    cheapUnits: cheapUnits.slice(0, 10),
    topEfficient: unitStats.slice().sort((a, b) => b.sumPerAp - a.sumPerAp).slice(0, 5)
      .map((u) => `${u.name} ${(u.sumPerAp).toFixed(2)} (${u.atk}/${u.def}@${u.ap})`),
    bottomEfficient: unitStats.slice().sort((a, b) => a.sumPerAp - b.sumPerAp).slice(0, 5)
      .map((u) => `${u.name} ${(u.sumPerAp).toFixed(2)} (${u.atk}/${u.def}@${u.ap})`),
    doctrines,
  };
}

function instrument(engine, stats, focusPid) {
  const origHits = engine._applyCombatHits.bind(engine);
  engine._applyCombatHits = function (aLoc, tLoc, dmgToT, dmgToA, fog) {
    stats.attacks += 1;
    const aDef = this.defOf(aLoc.inst);
    const owner = aLoc.player && aLoc.player.id;
    if (owner === focusPid) {
      stats.focusAttacks += 1;
      if (isArtyDef(aDef) || (this._isArtilleryAttacker && this._isArtilleryAttacker(aLoc.inst))) {
        stats.focusArtyAttacks += 1;
        const beforeA = aLoc.inst.def;
        const r = origHits(aLoc, tLoc, dmgToT, dmgToA, fog);
        if (aLoc.inst.def != null && aLoc.inst.def < beforeA) stats.focusArtyCounters += 1;
        return r;
      }
    }
    return origHits(aLoc, tLoc, dmgToT, dmgToA, fog);
  };
  const origDmg = engine._damage.bind(engine);
  engine._damage = function (inst, amt, meta) {
    const loc = this.findInst(inst.uid || inst);
    const tag = (meta && meta.tag) || '';
    if (loc && loc.player && loc.player.id === focusPid) {
      if (tag === 'self' || tag === 'self-damage' || /self/i.test(tag)) stats.focusSelfDamage += Number(amt) || 0;
      if (meta && meta.self) stats.focusSelfDamage += Number(amt) || 0;
    }
    // detect self-damage via attacker==target patterns in log-less path: compare owner playing effect
    return origDmg(inst, amt, meta);
  };
  const origDestroy = engine._destroy.bind(engine);
  engine._destroy = function (loc, meta) {
    if (loc && loc.zone === 'front' && loc.player) {
      const life = this.state.turn - (loc.inst.summonedTurn || 0);
      if (loc.player.id === focusPid) stats.focusDeaths.push(Math.max(0, life));
      else stats.foeDeaths.push(Math.max(0, life));
    }
    return origDestroy(loc, meta);
  };
  // Hook _applyEffect for conditional/self tags roughly
  if (engine._applyEffect) {
    const origFx = engine._applyEffect.bind(engine);
    engine._applyEffect = function (p, cardOrInst, effect, targetUid) {
      const pid = p && p.id;
      const code = effect && effect.code;
      if (pid === focusPid && code) {
        stats.fxFired[code] = (stats.fxFired[code] || 0) + 1;
        if (SELFISH.test(String(code).toUpperCase())) stats.focusSelfFx += 1;
        if (DRAWISH.test(String(code).toUpperCase())) stats.focusDrawFx += 1;
        if (HEALISH.test(String(code).toUpperCase())) stats.focusHealFx += 1;
      }
      return origFx(p, cardOrInst, effect, targetUid);
    };
  }
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
  catalog.rules = Object.assign({}, catalog.rules, { deploy_protection: true, combat_counter: 'survivor_only' });
  const engine = new DCEngine.Engine(catalog, { seed, rules: catalog.rules });
  const d0 = nationDeck(nat0), d1 = nationDeck(nat1);
  engine.createMatch({
    seed, mode: 'bot', name0: nat0, name1: nat1,
    deck0: d0.cards, deck1: d1.cards, doctrine0: d0.doctrines, doctrine1: d1.doctrines,
  });
  const stats = {
    attacks: 0, focusAttacks: 0, focusArtyAttacks: 0, focusArtyCounters: 0,
    focusSelfDamage: 0, focusSelfFx: 0, focusDrawFx: 0, focusHealFx: 0,
    focusDeaths: [], foeDeaths: [], fxFired: {},
    boardIntegral: [0, 0], firstFullControlTurn: null,
  };
  // instrument both perspectives via two wrappers — use player 0 as "focus" for nat0 metrics separately after
  instrument(engine, stats, 0);
  const fail = {};
  let steps = 0, stuck = 0;
  const MAX = 800;
  while (engine.state.winner == null && steps < MAX) {
    const st = engine.state;
    const c0 = frontCount(st.players[0]);
    const c1 = frontCount(st.players[1]);
    stats.boardIntegral[0] += c0;
    stats.boardIntegral[1] += c1;
    if ((c0 === 0 && c1 >= 3) || (c1 === 0 && c0 >= 3)) {
      if (stats.firstFullControlTurn == null) stats.firstFullControlTurn = st.turn;
    }
    const act = botAct(engine, fail);
    let res;
    try { res = engine.dispatch(act); }
    catch (err) { res = { ok: false }; }
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
  const sum = stats.boardIntegral[0] + stats.boardIntegral[1] || 1;
  return {
    turn: engine.state.turn,
    winner: engine.state.winner,
    boardShare0: stats.boardIntegral[0] / sum,
    boardShare1: stats.boardIntegral[1] / sum,
    firstFullControlTurn: stats.firstFullControlTurn,
    focusArtyAttacks: stats.focusArtyAttacks,
    focusArtyCounters: stats.focusArtyCounters,
    focusAttacks: stats.focusAttacks,
    focusSelfFx: stats.focusSelfFx,
    focusDrawFx: stats.focusDrawFx,
    focusHealFx: stats.focusHealFx,
    focusAvgLife: mean(stats.focusDeaths),
    foeAvgLife: mean(stats.foeDeaths),
    fxFired: stats.fxFired,
    nat0, nat1, seed,
  };
}

// ---- static ----
const statics = {};
nations.forEach((n) => { statics[n] = staticNation(n); });

// ---- round robin directed ----
const pairResults = [];
const perNat = {};
nations.forEach((n) => {
  perNat[n] = {
    games: 0, boardShareSum: 0, wins: 0, // wins only if winner set
    vs: {},
    artyAttacks: 0, artyCounters: 0, attacks: 0,
    selfFx: 0, drawFx: 0, healFx: 0,
    avgLifeSum: 0, avgLifeN: 0,
    turns: [],
  };
});

let done = 0;
const total = nations.length * (nations.length - 1) * gamesPer;
for (let i = 0; i < nations.length; i++) {
  for (let j = 0; j < nations.length; j++) {
    if (i === j) continue;
    const a = nations[i], b = nations[j];
    for (let g = 0; g < gamesPer; g++) {
      const seed = (10000 + i * 1000 + j * 40 + g * 7919) >>> 0;
      let r;
      try { r = playOne(seed, a, b); }
      catch (err) { r = { error: String(err && err.stack || err), nat0: a, nat1: b, boardShare0: 0.5, boardShare1: 0.5 }; }
      pairResults.push(r);
      if (!r.error) {
        perNat[a].games++;
        perNat[a].boardShareSum += r.boardShare0;
        perNat[a].vs[b] = perNat[a].vs[b] || { n: 0, shareSum: 0 };
        perNat[a].vs[b].n++;
        perNat[a].vs[b].shareSum += r.boardShare0;
        if (r.winner === 0) perNat[a].wins++;
        if (r.winner === 1) perNat[b].wins++;
        perNat[a].artyAttacks += r.focusArtyAttacks || 0;
        perNat[a].artyCounters += r.focusArtyCounters || 0;
        perNat[a].attacks += r.focusAttacks || 0;
        perNat[a].selfFx += r.focusSelfFx || 0;
        perNat[a].drawFx += r.focusDrawFx || 0;
        perNat[a].healFx += r.focusHealFx || 0;
        if (r.focusAvgLife != null) { perNat[a].avgLifeSum += r.focusAvgLife; perNat[a].avgLifeN++; }
        perNat[a].turns.push(r.turn);
        // also credit board share for player1 nation
        perNat[b].games++;
        perNat[b].boardShareSum += r.boardShare1;
        perNat[b].vs[a] = perNat[b].vs[a] || { n: 0, shareSum: 0 };
        perNat[b].vs[a].n++;
        perNat[b].vs[a].shareSum += r.boardShare1;
        perNat[b].turns.push(r.turn);
      }
      done++;
      if (done % 200 === 0) process.stderr.write(`… ${done}/${total}\n`);
    }
  }
}

const ranking = nations.map((n) => {
  const p = perNat[n];
  const st = statics[n];
  const worstVs = Object.entries(p.vs).map(([foe, v]) => ({ foe, share: v.shareSum / v.n }))
    .sort((x, y) => x.share - y.share).slice(0, 3);
  const bestVs = Object.entries(p.vs).map(([foe, v]) => ({ foe, share: v.shareSum / v.n }))
    .sort((x, y) => y.share - x.share).slice(0, 3);
  return {
    nat: n,
    theme: st.theme,
    boardShare: p.boardShareSum / Math.max(1, p.games),
    games: p.games,
    winRateWhenDecided: (p.wins) / Math.max(1, p.games), // sparse — winner often null
    avgTurn: mean(p.turns),
    artyAttackShare: p.attacks ? p.artyAttacks / p.attacks : 0,
    artyCounterRate: p.artyAttacks ? p.artyCounters / p.artyAttacks : 0,
    selfFxPerGame: p.selfFx / Math.max(1, p.games / 2), // games counted twice-ish; use directed: games as nat0 only roughly
    drawFx: p.drawFx,
    healFx: p.healFx,
    avgUnitLife: p.avgLifeN ? p.avgLifeSum / p.avgLifeN : null,
    worstVs, bestVs,
    static: {
      avgSumPerAp: st.avgSumPerAp,
      avgAtkPerAp: st.avgAtkPerAp,
      avgDefPerAp: st.avgDefPerAp,
      avgAp: st.avgAp,
      costBuckets: st.costBuckets,
      fx: st.fx,
      artyShareUnits: st.artyShareUnits,
      cheapUnits: st.cheapUnits,
      topEfficient: st.topEfficient,
      bottomEfficient: st.bottomEfficient,
      selfHurtCards: st.selfHurtCards,
      drawCards: st.drawCards,
      healCards: st.healCards,
      doctrines: st.doctrines,
      byTyp: st.byTyp,
      rar: st.rar,
    },
  };
}).sort((a, b) => b.boardShare - a.boardShare);

const summary = {
  meta: {
    gamesPerDirectedPairing: gamesPer,
    totalGames: pairResults.filter((r) => !r.error).length,
    errors: pairResults.filter((r) => r.error).length,
    nations: nations.length,
    rules: {
      victory_mode: (DC_CATALOG.rules && DC_CATALOG.rules.victory_mode) || 'trophy',
      deploy_protection: true,
      combat_counter: 'survivor_only',
      opening_starter_ap_penalty: (DC_CATALOG.rules && DC_CATALOG.rules.opening_starter_ap_penalty) || 1,
      trophy_vp_to_win: (DC_CATALOG.rules && DC_CATALOG.rules.trophy_vp_to_win) || 5,
    },
    caveat: 'Trophy default (catalog.rules). Board-share + win rate; generic test bot may underplay nation-specific mechanics.',
    commit: null,
  },
  ranking,
  statics,
};

const outPath = path.resolve(__dirname, '../Division_Command_0.5a/sim_nation_strength.json');
fs.writeFileSync(outPath, JSON.stringify(summary, null, 2));
console.log(JSON.stringify({
  meta: summary.meta,
  ranking: ranking.map((r) => ({
    nat: r.nat,
    boardShare: +r.boardShare.toFixed(3),
    avgSumPerAp: r.static.avgSumPerAp && +r.static.avgSumPerAp.toFixed(3),
    avgAp: +r.static.avgAp.toFixed(2),
    selfHurt: r.static.fx.selfHurt,
    draw: r.static.fx.draw,
    heal: r.static.fx.heal,
    conditional: r.static.fx.conditional,
    cheap01: r.static.costBuckets['0-1'],
    artyShare: +r.artyAttackShare.toFixed(3),
    doctrines: r.static.doctrines.map((d) => d.name),
  })),
}, null, 2));
process.stderr.write(`wrote ${outPath}\n`);
