/**
 * First-player advantage analysis (no permanent rule changes).
 * Baseline + ablations, ≥1200 RR each when gamesPer=5.
 * Usage: node scripts/sim_fp_advantage_analysis.mjs [gamesPerPairing=5] [which=all|baseline|ablate]
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../Division_Command_0.5a/web');
const gamesPer = Math.max(1, Number(process.argv[2] || 5));
const which = process.argv[3] || 'all';

function loadBundle() {
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
  sandbox.window = sandbox; sandbox.globalThis = sandbox; sandbox.self = sandbox;
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
  ]) vm.runInContext(fs.readFileSync(path.join(ROOT, s), 'utf8'), ctx, { filename: s });
  return ctx;
}

function nationDeck(DC_NATION_DECKS, nat) {
  const d = DC_NATION_DECKS[nat];
  return { cards: (d.cards || []).slice(), doctrines: (d.doktrinen || []).slice(0, 2), name: d.name || nat };
}

function botAct(DCBot, engine, fail) {
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

function isElite(eng, inst) {
  const d = eng.defOf(inst);
  if (!d) return false;
  if (eng._isEliteDef) return eng._isEliteDef(d);
  const bag = [].concat(d.tags || []).concat(String(d.klasse || '').split(','));
  return bag.some((x) => String(x).trim().toLowerCase() === 'elite') || d.klasse === 'Elite';
}

function applyAblationHooks(eng, ablation, startPid) {
  // (a) P2 +1 AP on their first own turn
  if (ablation === 'p2_plus1ap_t1') {
    const second = startPid === 0 ? 1 : 0;
    let given = false;
    const _end = eng._actEnd.bind(eng);
    eng._actEnd = function (pid) {
      const res = _end(pid);
      if (!given && this.state.active === second && this.state.turn <= 3) {
        // After P1 ends first turn, second becomes active with ap=5; add +1 once
        if (this.player(second).ap === (this.rules.ap_per_turn || 5) || this.player(second).ap >= 5) {
          this.player(second).ap += 1;
          given = true;
        }
      }
      return res;
    };
  }

  // (b) P1 cannot attack on global turn 1 (first own turn)
  if (ablation === 'p1_no_attack_t1') {
    const _atk = eng._actAttack.bind(eng);
    eng._actAttack = function (pid, a) {
      if (pid === startPid && this.state.turn === 1) throw new Error('Ablation: no P1 attack T1');
      return _atk(pid, a);
    };
  }

  // (c) Eingraben until end of opponent's next turn:
  //     noCombatUntil = summonTurn + 2 (protect through opponent's full turn after yours)
  //     Actually request: "protection until end of opponent's next turn"
  //     Current: until = turn+1 (protects through opponent's immediate turn).
  //     Symmetric alternative often discussed: protect until end of OPPONENT's next turn
  //     from deploy = through one full enemy turn after yours ends.
  //     Current already covers: P1 deploy T1 until=2 → protected on P2 T1.
  //     Ablation: make protection shorter OR longer. Try "until end of opponent turn only
  //     counted differently": set until = summonTurn (expire at start of next global turn)
  //     so P1 units become attackable on P2's first turn — classic "summoning sickness only".
  //     Better named ablation: dig_in_shorter — until = summonTurn (not +1), so enemy can
  //     attack your fresh units on their immediate turn.
  if (ablation === 'dig_in_shorter') {
    eng._applyDeployProtection = function (card) {
      if (!this.rules.deploy_protection || !card) return;
      card.flags = card.flags || {};
      card.facedown = false;
      // expire at end of summon turn → unprotected for opponent's next turn
      card.flags.noCombatUntil = this.state.turn; // turn <= until only same turn
      card.flags.digInUntil = this.state.turn;
      card.def = (card.def == null ? 0 : card.def) + 1;
      card.defMax = (card.defMax == null ? card.def : card.defMax) + 1;
      card.flags.digInBonus = 1;
    };
  }
  if (ablation === 'dig_in_opp_end') {
    // Longer: protect until end of opponent's next turn (= summonTurn+2)
    eng._applyDeployProtection = function (card) {
      if (!this.rules.deploy_protection || !card) return;
      card.flags = card.flags || {};
      card.facedown = false;
      card.flags.noCombatUntil = this.state.turn + 2;
      card.flags.digInUntil = this.state.turn + 2;
      card.def = (card.def == null ? 0 : card.def) + 1;
      card.defMax = (card.defMax == null ? card.def : card.defMax) + 1;
      card.flags.digInBonus = 1;
    };
  }

  // (d) If P1 would win on VP and P2 hasn't had equal own-turns, give P2 one more turn
  if (ablation === 'p2_last_reply') {
    const _endWin = eng._end.bind(eng);
    eng._end = function (winner, reason) {
      if (winner === startPid && /Siegpunkte|Trophy|SP/i.test(String(reason || ''))) {
        const ownTurns = this.state._ablOwnTurns || { 0: 0, 1: 0 };
        const second = startPid === 0 ? 1 : 0;
        if ((ownTurns[startPid] || 0) > (ownTurns[second] || 0) && !this.state._ablReplyUsed) {
          this.state._ablReplyUsed = true;
          this.state._ablPendingWin = { winner, reason };
          // Don't end yet — force continue; bot will play P2's turn
          return null;
        }
      }
      return _endWin(winner, reason);
    };
    const _ae = eng._actEnd.bind(eng);
    eng._actEnd = function (pid) {
      this.state._ablOwnTurns = this.state._ablOwnTurns || { 0: 0, 1: 0 };
      this.state._ablOwnTurns[pid] = (this.state._ablOwnTurns[pid] || 0) + 1;
      const res = _ae(pid);
      if (this.state._ablPendingWin && this.state.active === startPid) {
        // P2 finished reply turn; now apply pending win unless P2 already won
        if (this.state.winner == null) {
          const pw = this.state._ablPendingWin;
          this.state._ablPendingWin = null;
          _endWin(pw.winner, pw.reason + ' (nach P2-Antwort)');
        }
      }
      return res;
    };
  }

  // (e) AP ramp shift: P2 starts with same "tempo" — give P1 only 4 AP on turn 1
  if (ablation === 'p1_ap4_t1') {
    eng.player(startPid).ap = Math.max(1, (eng.rules.ap_per_turn || 5) - 1);
  }
  if (ablation === 'ap_ramp_both') {
    // Both get 4 on first own turn, 5 thereafter — remove any first-mover AP edge
    const seen = { 0: false, 1: false };
    // Fix starter immediately
    eng.player(startPid).ap = 4;
    seen[startPid] = true;
    const _ae = eng._actEnd.bind(eng);
    eng._actEnd = function (pid) {
      const res = _ae(pid);
      const nxt = this.state.active;
      if (!seen[nxt]) {
        this.player(nxt).ap = 4;
        seen[nxt] = true;
      }
      return res;
    };
  }

  return eng;
}

function snapshot(eng, startPid) {
  const front = (pid) => eng.frontList(eng.player(pid)).length;
  const dig = (pid) => eng.frontList(eng.player(pid)).filter((l) => eng._isDeployProtected(l.inst)).length;
  const elite = (pid) => eng.frontList(eng.player(pid)).filter((l) => isElite(eng, l.inst)).length;
  const cheapHand = (pid) => eng.player(pid).hand.filter((c) => {
    const d = eng.defOf(c); return d && d.typ === 'Einheit' && Number(d.ap || 99) <= 2;
  }).length;
  return {
    turn: eng.state.turn,
    active: eng.state.active,
    ap0: eng.player(0).ap,
    ap1: eng.player(1).ap,
    front0: front(0),
    front1: front(1),
    dig0: dig(0),
    dig1: dig(1),
    elite0: elite(0),
    elite1: elite(1),
    vp0: eng.player(0).vp || 0,
    vp1: eng.player(1).vp || 0,
    hand0: eng.player(0).hand.length,
    hand1: eng.player(1).hand.length,
    cheap0: cheapHand(0),
    cheap1: cheapHand(1),
  };
}

function playMatch(ctx, nat0, nat1, seed, mode, ablation) {
  const { DCEngine, DCBot, DC_CATALOG, DC_NATION_DECKS } = ctx;
  const d0 = nationDeck(DC_NATION_DECKS, nat0);
  const d1 = nationDeck(DC_NATION_DECKS, nat1);
  const rules = Object.assign({}, DC_CATALOG.rules, { victory_mode: mode, opening_coin: true });
  const eng = new DCEngine.Engine(DC_CATALOG, { seed, rules });
  eng.createMatch({
    seed, mode: 'bot',
    deck0: d0.cards, deck1: d1.cards,
    doctrine0: d0.doctrines, doctrine1: d1.doctrines,
    name0: d0.name, name1: d1.name,
  });
  const startPid = (eng.state.startCoin && eng.state.startCoin.winner != null)
    ? eng.state.startCoin.winner : eng.state.active;
  const secondPid = startPid === 0 ? 1 : 0;
  applyAblationHooks(eng, ablation, startPid);

  const metrics = {
    startPid,
    firstAttackBy: null,
    firstKillBy: null,
    firstEliteBy: null,
    firstSectorOccupyBy: null, // first to have unit in a sector the foe never occupied yet — simplify: first empty-enemy section with own presence
    firstDurchbruchBy: null,
    ownTurns: { 0: 0, 1: 0 },
    apSpent: { 0: 0, 1: 0 },
    apGranted: { 0: eng.player(0).ap, 1: eng.player(1).ap },
    attacks: { 0: 0, 1: 0 },
    kills: { 0: 0, 1: 0 },
    cheapPlays: { 0: 0, 1: 0 },
    // per own-turn index (1..) for starter / second
    curve: { starter: [], second: [] },
    digFreeAttackWindow: null, // who first could attack an unprotected enemy front unit
    vpReach5: { 0: null, 1: null },
    p2OneTurnShort: false,
    snapshots: [],
  };

  // Track AP granted on turn starts
  const _ae0 = eng._actEnd.bind(eng);
  eng._actEnd = function (pid) {
    metrics.ownTurns[pid] = (metrics.ownTurns[pid] || 0) + 1;
    const res = _ae0(pid);
    const nxt = this.state.active;
    metrics.apGranted[nxt] = (metrics.apGranted[nxt] || 0) + (this.player(nxt).ap || 0);
    return res;
  };

  const fail = {};
  let steps = 0, stuck = 0;
  const MAX = mode === 'classic' ? 500 : 700;
  let lastSnapTurn = -1;

  while (eng.state.winner == null && steps < MAX) {
    // snapshot at start of each global turn once
    if (eng.state.turn !== lastSnapTurn && !eng.state.pending) {
      lastSnapTurn = eng.state.turn;
      const snap = snapshot(eng, startPid);
      metrics.snapshots.push(snap);
      // free attack window: active has a unit that can act and foe has unprotected front
      const active = eng.state.active;
      const foe = active === 0 ? 1 : 0;
      const canHit = eng.frontList(eng.player(foe)).some((l) => !eng._isDeployProtected(l.inst));
      const canStrike = eng.frontList(eng.player(active)).some((l) => {
        try { return eng._canAct(l.inst, active); } catch (e) { return false; }
      });
      if (metrics.digFreeAttackWindow == null && canHit && canStrike) {
        metrics.digFreeAttackWindow = active;
      }
      if (metrics.firstEliteBy == null) {
        if (snap.elite0 > 0) metrics.firstEliteBy = 0;
        else if (snap.elite1 > 0) metrics.firstEliteBy = 1;
      }
      // sector occupy: own unit in section where foe has 0
      ['L', 'C', 'R'].forEach((sec) => {
        if (metrics.firstSectorOccupyBy != null) return;
        const o0 = eng.frontList(eng.player(0)).filter((l) => l.section === sec).length;
        const o1 = eng.frontList(eng.player(1)).filter((l) => l.section === sec).length;
        if (o0 > 0 && o1 === 0) metrics.firstSectorOccupyBy = 0;
        if (o1 > 0 && o0 === 0 && metrics.firstSectorOccupyBy == null) metrics.firstSectorOccupyBy = 1;
      });
    }

    const act = botAct(DCBot, eng, fail);
    const pid = act.player;
    const apBefore = eng.player(pid).ap;
    const frontBefore = { 0: eng.frontList(eng.player(0)).length, 1: eng.frontList(eng.player(1)).length };

    if (act.type === 'ATTACK' && metrics.firstAttackBy == null) metrics.firstAttackBy = pid;
    if (act.type === 'ATTACK') metrics.attacks[pid] = (metrics.attacks[pid] || 0) + 1;
    if (act.type === 'PLAY' || act.type === 'CHOOSE_SLOT') {
      // cheap unit detect after
    }

    let res;
    try { res = eng.dispatch(act); }
    catch (err) { res = { ok: false }; }

    const apAfter = eng.player(pid).ap;
    if (res && res.ok && apAfter < apBefore) metrics.apSpent[pid] += (apBefore - apAfter);

    if (act.type === 'PLAY' && res && res.ok) {
      // check if a cheap unit was just played — look at last front add
      const fronts = eng.frontList(eng.player(pid));
      const last = fronts[fronts.length - 1];
      if (last) {
        const d = eng.defOf(last.inst);
        if (d && d.typ === 'Einheit' && Number(d.ap || 99) <= 2) metrics.cheapPlays[pid]++;
      }
    }

    // kills
    const frontAfter = { 0: eng.frontList(eng.player(0)).length, 1: eng.frontList(eng.player(1)).length };
    const foe = pid === 0 ? 1 : 0;
    if (frontAfter[foe] < frontBefore[foe]) {
      const k = frontBefore[foe] - frontAfter[foe];
      metrics.kills[pid] += k;
      if (metrics.firstKillBy == null) metrics.firstKillBy = pid;
    }

    // VP race
    [0, 1].forEach((p) => {
      if (metrics.vpReach5[p] == null && (eng.player(p).vp || 0) >= 5) {
        metrics.vpReach5[p] = eng.state.turn;
      }
    });

    // durchbruch source tracking via trophy
    if (eng._trophyActive && eng._trophyActive()) {
      [0, 1].forEach((p) => {
        const s = eng.player(p).trophy && eng.player(p).trophy.sources;
        if (s && s.durchbruch > 0 && metrics.firstDurchbruchBy == null) metrics.firstDurchbruchBy = p;
      });
    }

    if (!res || !res.ok) {
      fail[DCBot.actKey(act)] = 1;
      stuck++;
      if (stuck > 40) {
        try { eng.dispatch({ type: 'END_TURN', player: eng.state.active }); stuck = 0; Object.keys(fail).forEach((k) => delete fail[k]); }
        catch (e2) { break; }
      }
    } else { stuck = 0; Object.keys(fail).forEach((k) => delete fail[k]); }
    steps++;
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

  // P2 one turn short: P1 won on VP and P2 was at >=4 or ownTurns unequal
  if (eng.state.winner === startPid && /Siegpunkte|Trophy|SP/i.test(String(eng.state.endReason || ''))) {
    const p2vp = eng.player(secondPid).vp || 0;
    if (p2vp >= 4 || (metrics.ownTurns[startPid] > metrics.ownTurns[secondPid])) {
      metrics.p2OneTurnShort = true;
    }
  }

  // Build per-own-turn curves from snapshots: group by active at snap
  metrics.snapshots.forEach((s) => {
    const role = s.active === startPid ? 'starter' : 'second';
    metrics.curve[role].push({
      gturn: s.turn,
      ap: s.active === 0 ? s.ap0 : s.ap1,
      front: s.active === 0 ? s.front0 : s.front1,
      foeFront: s.active === 0 ? s.front1 : s.front0,
      digOwn: s.active === 0 ? s.dig0 : s.dig1,
      digFoe: s.active === 0 ? s.dig1 : s.dig0,
      vp: s.active === 0 ? s.vp0 : s.vp1,
      hand: s.active === 0 ? s.hand0 : s.hand1,
    });
  });

  return {
    winner: eng.state.winner,
    reason: eng.state.endReason,
    turn: eng.state.turn,
    startPid,
    firstWon: eng.state.winner === startPid,
    secondWon: eng.state.winner === secondPid,
    metrics,
  };
}

function avg(arr) { return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null; }

function runVariant(ctx, label, mode, ablation, baseSeed) {
  const { DC_NATION_DECKS } = ctx;
  const nations = Object.keys(DC_NATION_DECKS);
  let firstWins = 0, decided = 0, games = 0;
  const agg = {
    firstAttackStarter: 0, firstAttackN: 0,
    firstKillStarter: 0, firstKillN: 0,
    firstEliteStarter: 0, firstEliteN: 0,
    firstWindowStarter: 0, firstWindowN: 0,
    firstSectorStarter: 0, firstSectorN: 0,
    firstDbStarter: 0, firstDbN: 0,
    p2OneTurnShort: 0, vpWinsStarter: 0, vpWins: 0,
    ownTurnsStarter: [], ownTurnsSecond: [],
    apSpentStarter: [], apSpentSecond: [],
    apGrantedStarter: [], apGrantedSecond: [],
    attacksStarter: [], attacksSecond: [],
    killsStarter: [], killsSecond: [],
    cheapStarter: [], cheapSecond: [],
    // curve averages by own-turn index
    curveApS: {}, curveAp2: {}, curveFrontS: {}, curveFront2: {},
    curveDigFoeS: {}, curveDigFoe2: {},
  };
  let seed = baseSeed;
  for (let i = 0; i < nations.length; i++) {
    for (let j = 0; j < nations.length; j++) {
      if (i === j) continue;
      for (let g = 0; g < gamesPer; g++) {
        const r = playMatch(ctx, nations[i], nations[j], seed++, mode, ablation);
        games++;
        if (r.winner === 0 || r.winner === 1) {
          decided++;
          if (r.firstWon) firstWins++;
        }
        const m = r.metrics;
        const sp = m.startPid;
        const sec = sp === 0 ? 1 : 0;
        const isSt = (pid) => pid === sp;

        if (m.firstAttackBy != null) { agg.firstAttackN++; if (isSt(m.firstAttackBy)) agg.firstAttackStarter++; }
        if (m.firstKillBy != null) { agg.firstKillN++; if (isSt(m.firstKillBy)) agg.firstKillStarter++; }
        if (m.firstEliteBy != null) { agg.firstEliteN++; if (isSt(m.firstEliteBy)) agg.firstEliteStarter++; }
        if (m.digFreeAttackWindow != null) { agg.firstWindowN++; if (isSt(m.digFreeAttackWindow)) agg.firstWindowStarter++; }
        if (m.firstSectorOccupyBy != null) { agg.firstSectorN++; if (isSt(m.firstSectorOccupyBy)) agg.firstSectorStarter++; }
        if (m.firstDurchbruchBy != null) { agg.firstDbN++; if (isSt(m.firstDurchbruchBy)) agg.firstDbStarter++; }

        if (/Siegpunkte|Trophy/i.test(String(r.reason || ''))) {
          agg.vpWins++;
          if (r.firstWon) agg.vpWinsStarter++;
          if (m.p2OneTurnShort) agg.p2OneTurnShort++;
        }

        agg.ownTurnsStarter.push(m.ownTurns[sp] || 0);
        agg.ownTurnsSecond.push(m.ownTurns[sec] || 0);
        agg.apSpentStarter.push(m.apSpent[sp] || 0);
        agg.apSpentSecond.push(m.apSpent[sec] || 0);
        agg.apGrantedStarter.push(m.apGranted[sp] || 0);
        agg.apGrantedSecond.push(m.apGranted[sec] || 0);
        agg.attacksStarter.push(m.attacks[sp] || 0);
        agg.attacksSecond.push(m.attacks[sec] || 0);
        agg.killsStarter.push(m.kills[sp] || 0);
        agg.killsSecond.push(m.kills[sec] || 0);
        agg.cheapStarter.push(m.cheapPlays[sp] || 0);
        agg.cheapSecond.push(m.cheapPlays[sec] || 0);

        m.curve.starter.forEach((c, idx) => {
          const k = idx + 1;
          (agg.curveApS[k] = agg.curveApS[k] || []).push(c.ap);
          (agg.curveFrontS[k] = agg.curveFrontS[k] || []).push(c.front);
          (agg.curveDigFoeS[k] = agg.curveDigFoeS[k] || []).push(c.digFoe);
        });
        m.curve.second.forEach((c, idx) => {
          const k = idx + 1;
          (agg.curveAp2[k] = agg.curveAp2[k] || []).push(c.ap);
          (agg.curveFront2[k] = agg.curveFront2[k] || []).push(c.front);
          (agg.curveDigFoe2[k] = agg.curveDigFoe2[k] || []).push(c.digFoe);
        });

        if (games % 300 === 0) process.stderr.write(label + ' …' + games + '\n');
      }
    }
  }

  const rate = (a, n) => (n ? a / n : null);
  const curveMean = (obj) => {
    const out = {};
    Object.keys(obj).map(Number).sort((a, b) => a - b).slice(0, 8).forEach((k) => {
      out[k] = +avg(obj[k]).toFixed(2);
    });
    return out;
  };

  return {
    label, mode, ablation, games, decided,
    firstPlayerWinRate: decided ? firstWins / decided : null,
    firstAttackStarterRate: rate(agg.firstAttackStarter, agg.firstAttackN),
    firstKillStarterRate: rate(agg.firstKillStarter, agg.firstKillN),
    firstEliteStarterRate: rate(agg.firstEliteStarter, agg.firstEliteN),
    firstFreeAttackWindowStarterRate: rate(agg.firstWindowStarter, agg.firstWindowN),
    firstSectorStarterRate: rate(agg.firstSectorStarter, agg.firstSectorN),
    firstDurchbruchStarterRate: rate(agg.firstDbStarter, agg.firstDbN),
    vpWinStarterRate: rate(agg.vpWinsStarter, agg.vpWins),
    p2OneTurnShortRateAmongVpWins: rate(agg.p2OneTurnShort, agg.vpWins),
    meanOwnTurns: { starter: +avg(agg.ownTurnsStarter).toFixed(2), second: +avg(agg.ownTurnsSecond).toFixed(2) },
    meanApSpent: { starter: +avg(agg.apSpentStarter).toFixed(1), second: +avg(agg.apSpentSecond).toFixed(1) },
    meanApGranted: { starter: +avg(agg.apGrantedStarter).toFixed(1), second: +avg(agg.apGrantedSecond).toFixed(1) },
    meanAttacks: { starter: +avg(agg.attacksStarter).toFixed(2), second: +avg(agg.attacksSecond).toFixed(2) },
    meanKills: { starter: +avg(agg.killsStarter).toFixed(2), second: +avg(agg.killsSecond).toFixed(2) },
    meanCheapPlays: { starter: +avg(agg.cheapStarter).toFixed(2), second: +avg(agg.cheapSecond).toFixed(2) },
    apCurveByOwnTurn: { starter: curveMean(agg.curveApS), second: curveMean(agg.curveAp2) },
    frontCurveByOwnTurn: { starter: curveMean(agg.curveFrontS), second: curveMean(agg.curveFront2) },
    foeDigInCurveByOwnTurn: { starter: curveMean(agg.curveDigFoeS), second: curveMean(agg.curveDigFoe2) },
  };
}

const VARIANTS = [
  { id: 'classic_base', mode: 'classic', ablation: null, seed: 10000 },
  { id: 'trophy_base', mode: 'trophy', ablation: null, seed: 20000 },
  { id: 'trophy_p2_ap', mode: 'trophy', ablation: 'p2_plus1ap_t1', seed: 30000 },
  { id: 'trophy_p1_noatk', mode: 'trophy', ablation: 'p1_no_attack_t1', seed: 40000 },
  { id: 'trophy_dig_short', mode: 'trophy', ablation: 'dig_in_shorter', seed: 50000 },
  { id: 'trophy_dig_long', mode: 'trophy', ablation: 'dig_in_opp_end', seed: 55000 },
  { id: 'trophy_p2_reply', mode: 'trophy', ablation: 'p2_last_reply', seed: 60000 },
  { id: 'trophy_p1_ap4', mode: 'trophy', ablation: 'p1_ap4_t1', seed: 70000 },
  { id: 'trophy_ap_ramp', mode: 'trophy', ablation: 'ap_ramp_both', seed: 80000 },
  { id: 'classic_p2_ap', mode: 'classic', ablation: 'p2_plus1ap_t1', seed: 90000 },
  { id: 'classic_dig_short', mode: 'classic', ablation: 'dig_in_shorter', seed: 95000 },
  { id: 'classic_p2_reply', mode: 'classic', ablation: 'p2_last_reply', seed: 98000 },
];

const ctx = loadBundle();
const results = [];
for (const v of VARIANTS) {
  if (which !== 'all' && which !== 'baseline' && which !== v.id && !(which === 'ablate' && v.ablation)) continue;
  if (which === 'baseline' && v.ablation) continue;
  process.stderr.write('=== ' + v.id + ' ===\n');
  // Fresh bundle per variant so prototype patches don't stack
  const c = loadBundle();
  const row = runVariant(c, v.id, v.mode, v.ablation, v.seed);
  results.push(row);
  console.error(JSON.stringify({
    id: row.label,
    fp: row.firstPlayerWinRate == null ? null : +row.firstPlayerWinRate.toFixed(3),
    atk1: row.firstAttackStarterRate == null ? null : +row.firstAttackStarterRate.toFixed(3),
    kill1: row.firstKillStarterRate == null ? null : +row.firstKillStarterRate.toFixed(3),
    winDig: row.firstFreeAttackWindowStarterRate == null ? null : +row.firstFreeAttackWindowStarterRate.toFixed(3),
    p2short: row.p2OneTurnShortRateAmongVpWins == null ? null : +row.p2OneTurnShortRateAmongVpWins.toFixed(3),
  }));
}

const out = {
  gamesPerPairing: gamesPer,
  note: 'Analysis only. Ablations are temporary hooks in the sim, not committed rules.',
  digInRules: {
    current: 'noCombatUntil = summonTurn+1; protected while state.turn <= until. Turn increments each END_TURN.',
    implication: 'P1 deploys T_g=1 until=2 → safe during P2 first turn. P2 deploys T_g=2 until=3 → safe during P1 second turn. First free attacks on enemy opening line often open on P2 second turn (T_g=4) for P2, or later.',
  },
  results,
};
const outPath = path.resolve(__dirname, 'sim_fp_advantage_analysis.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2));
console.log(JSON.stringify({
  summary: results.map((r) => ({
    id: r.label,
    fp: r.firstPlayerWinRate == null ? null : +r.firstPlayerWinRate.toFixed(4),
    firstAttack: r.firstAttackStarterRate == null ? null : +r.firstAttackStarterRate.toFixed(3),
    firstKill: r.firstKillStarterRate == null ? null : +r.firstKillStarterRate.toFixed(3),
    freeAtkWindow: r.firstFreeAttackWindowStarterRate == null ? null : +r.firstFreeAttackWindowStarterRate.toFixed(3),
    firstElite: r.firstEliteStarterRate == null ? null : +r.firstEliteStarterRate.toFixed(3),
    firstSector: r.firstSectorStarterRate == null ? null : +r.firstSectorStarterRate.toFixed(3),
    firstDB: r.firstDurchbruchStarterRate == null ? null : +r.firstDurchbruchStarterRate.toFixed(3),
    vpStarter: r.vpWinStarterRate == null ? null : +r.vpWinStarterRate.toFixed(3),
    p2short: r.p2OneTurnShortRateAmongVpWins == null ? null : +r.p2OneTurnShortRateAmongVpWins.toFixed(3),
    turns: r.meanOwnTurns,
    apSpent: r.meanApSpent,
    kills: r.meanKills,
    apCurve: r.apCurveByOwnTurn,
    frontCurve: r.frontCurveByOwnTurn,
  })),
}, null, 2));
console.error('wrote', outPath);
