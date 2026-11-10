#!/usr/bin/env node
/**
 * Zufällige Partien: Engine-Invarianten (keine hängenden pending, Partie endet, Stand bleibt legal).
 * Aufruf von der Repo-Wurzel.
 */
/**
 * Engine fuzz: many seeds, bot-vs-bot, invariant checks.
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../Division_Command/web');

/**
 * Lädt eine Spiel-JS-Datei in den Node-vm-Kontext (ohne Browser-DOM).
 */
function loadInto(context, rel) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), context, { filename: rel });
}
const sandbox = {
  console, setTimeout, clearTimeout, setInterval, clearInterval,
  document: {
    /**
     * DOM-Attrappe im Node-Kontext; liefert ein Minimal-Element oder null.
     */
    getElementById: () => null, querySelector: () => null, querySelectorAll: () => [],
    /**
     * DOM-Attrappe: erzeugt ein Minimal-Element für die Engine im Node-Kontext.
     */
    createElement: () => ({ style: {}, appendChild() {}, remove() {}, setAttribute() {}, onload: null, onerror: null }),
    head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } },
    /**
     * DOM-Attrappe: Event-Listener werden ignoriert (kein Browser).
     */
    addEventListener() {}, removeEventListener() {},
  },
  localStorage: { getItem: () => null, setItem() {} },
  navigator: {},
  TextEncoder, TextDecoder, Uint8Array, Uint32Array, ArrayBuffer, DataView, Promise, Blob, URL,
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
  'js/playtest/store.js', 'js/playtest/logger.js',
]) loadInto(ctx, s);

const { DCEngine, DCBot, DC_CATALOG, DC_NATION_DECKS, DCPlayStore, DCPlayLogger } = ctx;
DCBot.applyCfg({ model: 'test', delayMs: 0, aggression: 55, holdAp: 0, allowAttack: 1 });

const mem = { games: new Map(), notes: new Map(), meta: new Map() };
DCPlayStore.put = (s, v) => { const k = v.id != null ? v.id : v.key; mem[s].set(k, JSON.parse(JSON.stringify(v))); return Promise.resolve(v); };
DCPlayStore.get = (s, k) => Promise.resolve(mem[s].has(k) ? JSON.parse(JSON.stringify(mem[s].get(k))) : null);
DCPlayStore.getAll = (s) => Promise.resolve([...mem[s].values()].map((v) => JSON.parse(JSON.stringify(v))));
DCPlayStore.clearStore = (s) => { mem[s].clear(); return Promise.resolve(); };

/**
 * Starterdeck der genannten Nation aus dem geladenen Katalog.
 */
function nationDeck(nat) {
  const d = DC_NATION_DECKS[nat];
  return { cards: (d.cards || []).slice(), doctrines: (d.doktrinen || []).slice(0, 2), name: d.name || nat };
}

/**
 * Nächste legale Bot-Aktion (`DCBot.step`) oder Zugende, falls nichts möglich ist.
 */
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
  return act;
}

/**
 * Sammelt alle Instanz-UIDs der aktuellen Partie.
 */
function collectUids(engine) {
  const seen = new Map();
  const add = (uid, where) => {
    if (uid == null) return;
    if (seen.has(uid)) seen.get(uid).push(where);
    else seen.set(uid, [where]);
  };
  engine.state.players.forEach((p, pi) => {
    (p.hand || []).forEach((c, i) => add(c.uid, `hand${pi}:${i}`));
    (p.deck || []).forEach((c, i) => add(c.uid, `deck${pi}:${i}`));
    (p.grave || []).forEach((c, i) => add(c.uid, `grave${pi}:${i}`));
    (p.support || []).forEach((c, i) => { if (!c) { /* hole */ } else add(c.uid, `sup${pi}:${i}`); });
    (p.doctrines || []).forEach((c, i) => { if (c) add(c.uid, `dok${pi}:${i}`); });
    ['L','C','R'].forEach((sec) => {
      (p.front[sec] || []).forEach((u, row) => {
        if (!u) return;
        add(u.uid, `front${pi}:${sec}${row}`);
        (u.attachments || []).forEach((a, ai) => add(a.uid, `att${pi}:${sec}${row}:${ai}`));
      });
    });
  });
  return seen;
}

/**
 * Prüft Engine-Invarianten (Zonen, AP, Instanzen) und wirft bei Verletzung.
 */
function checkInvariants(engine, tag) {
  const errs = [];
  for (let pi = 0; pi < 2; pi++) {
    const p = engine.player(pi);
    if (p.ap < 0) errs.push(`${tag}: AP negative p${pi}=${p.ap}`);
    if (p.vp < 0) errs.push(`${tag}: VP negative p${pi}`);
    (p.hand || []).forEach((c, i) => { if (c == null) errs.push(`${tag}: null hand hole p${pi}@${i}`); });
    (p.deck || []).forEach((c, i) => { if (c == null) errs.push(`${tag}: null deck hole p${pi}@${i}`); });
    // front slots
    ['L','C','R'].forEach((sec) => {
      const arr = p.front[sec] || [];
      if (arr.length > 3) errs.push(`${tag}: front ${sec} len ${arr.length}`);
      arr.forEach((u, row) => {
        if (!u) return;
        if (u.def != null && u.def < 0) errs.push(`${tag}: def<0 ${u.uid}`);
        if (u.atk != null && u.atk < -50) errs.push(`${tag}: atk absurd ${u.uid}`);
        // ghost: cardId must exist
        if (u.cardId && !engine.byId[u.cardId] && !engine.defOf(u)) {
          errs.push(`${tag}: ghost unit ${u.uid} cardId=${u.cardId}`);
        }
      });
    });
  }
  // duplicate uids
  const seen = collectUids(engine);
  for (const [uid, places] of seen) {
    if (places.length > 1) errs.push(`${tag}: duplicate uid ${uid} @ ${places.join(',')}`);
  }
  // copy limits in deck+hand+front+grave+support roughly vs catalog max
  // soft check: count cardIds in all zones per player <= 10 (sanity)
  for (let pi = 0; pi < 2; pi++) {
    const p = engine.player(pi);
    const counts = {};
    const bump = (c) => {
      if (!c) return;
      const id = typeof c === 'string' ? c : c.cardId;
      if (!id) return;
      counts[id] = (counts[id] || 0) + 1;
    };
    (p.hand||[]).forEach(bump); (p.deck||[]).forEach(bump); (p.grave||[]).forEach(bump); (p.support||[]).forEach(bump);
    ['L','C','R'].forEach((sec) => (p.front[sec]||[]).forEach((u) => { bump(u); (u&&u.attachments||[]).forEach(bump); }));
    for (const [id, n] of Object.entries(counts)) {
      const def = engine.byId[id];
      const max = def && def.maxCopies != null ? def.maxCopies : (def && def.rarity === 'legendär' ? 1 : 3);
      if (def && max && n > max + 2) { // +2 slack for tokens/transforms
        // tokens often exceed - skip token typ
        if (def.typ === 'Token' || (def.tags||[]).includes('token')) continue;
        errs.push(`${tag}: copy limit? ${id} n=${n} max=${max}`);
      }
    }
  }
  return errs;
}

/**
 * Spielt eine vollständige Bot-gegen-Bot-Partie bis zum Ende oder Zuglimit.
 */
function playMatch(seed, mode) {
  const nats = Object.keys(DC_NATION_DECKS);
  const nat0 = nats[seed % nats.length];
  const nat1 = nats[(seed * 7 + 3) % nats.length];
  const d0 = nationDeck(nat0);
  const d1 = nationDeck(nat1);
  const eng = new DCEngine.Engine(DC_CATALOG, { seed, rules: Object.assign({}, DC_CATALOG.rules) });
  eng.createMatch({
    seed, mode: mode || 'bot',
    deck0: d0.cards, deck1: d1.cards,
    doctrine0: d0.doctrines, doctrine1: d1.doctrines,
    name0: d0.name, name1: d1.name,
  });
  DCPlayLogger.beginMatch({ engine: eng, mode: mode || 'bot', you: 0, nation0: nat0, nation1: nat1 });

  const fail = {};
  let steps = 0, stuck = 0;
  const MAX = 4000; // Schrittobergrenze; Partien enden regulär spätestens bei Zuglimit 28
  const TURN_CAP = 30;
  const errors = [];
  let lastPending = null, pendingStuck = 0;

  while (eng.state.winner == null && !eng.state.endReason && steps < MAX) {
    const inv = checkInvariants(eng, `s${seed}@${steps}`);
    for (const e of inv) {
      if (!errors.includes(e)) errors.push(e);
    }
    if (errors.filter((e) => /AP negative|duplicate uid|pending soft-lock|throw /.test(e)).length > 0) break;

    const pendKey = eng.state.pending ? JSON.stringify({
      k: eng.state.pending.kind, p: eng.state.pending.player,
      n: (eng.state.pending.choices||[]).length,
      c: eng.state.pending.code || eng.state.pending.cardId || null,
    }) : null;
    if (pendKey && pendKey === lastPending) pendingStuck++;
    else pendingStuck = 0;
    lastPending = pendKey;
    if (pendingStuck === 30) {
      errors.push(`s${seed}: pending hang ${pendKey}`);
      try {
        const pid = eng.state.pending.player;
        const acts = eng.listActions(pid) || [];
        const pick = acts.find((a) => a.type === 'RESOLVE_PENDING' && a.target) || acts[0];
        if (pick) eng.dispatch(Object.assign({ player: pid }, pick));
        pendingStuck = 0;
        Object.keys(fail).forEach((k) => delete fail[k]);
      } catch (e) {}
    }
    if (pendingStuck > 80) {
      errors.push(`s${seed}: pending soft-lock ${pendKey}`);
      break;
    }

    const act = botAct(eng, fail);
    let res;
    try {
      // bot suggestion cheap path
      const sug = (steps % 5 === 0) ? DCPlayLogger.botSuggest(eng, act.player) : null;
      res = eng.dispatch(act);
      DCPlayLogger.recordAction({ engine: eng, action: act, result: res || { ok: true }, actor: 'bot', botSuggestion: sug });
    } catch (err) {
      errors.push(`s${seed}: throw ${err.message || err} act=${JSON.stringify(act).slice(0,120)}`);
      break;
    }
    if (!res || !res.ok) {
      fail[DCBot.actKey(act)] = 1;
      stuck++;
      if (stuck > 50) {
        errors.push(`s${seed}: hang (50 abgelehnte Aktionen) act=${JSON.stringify(act).slice(0,120)}`);
        try {
          eng.dispatch({ type: 'END_TURN', player: eng.state.active });
          stuck = 0; Object.keys(fail).forEach((k) => delete fail[k]);
        } catch (e2) {
          errors.push(`s${seed}: stuck cannot end turn`);
          break;
        }
      }
    } else {
      stuck = 0;
      Object.keys(fail).forEach((k) => delete fail[k]);
    }
    steps++;
    if (eng.state.turn > TURN_CAP) { errors.push(`s${seed}: turn cap ${TURN_CAP} überschritten`); break; }
  }

  if (eng.state.winner == null && !eng.state.endReason) {
    // force timeout end like production safety
    const a = eng.player(0), b = eng.player(1);
    if (a.vp !== b.vp) eng._end(a.vp > b.vp ? 0 : 1, 'fuzz-timeout-SP');
    else {
      const fa = eng.frontList(a).length, fb = eng.frontList(b).length;
      if (fa !== fb) eng._end(fa > fb ? 0 : 1, 'fuzz-timeout-Brett');
      else eng._end(null, 'fuzz-timeout');
    }
    errors.push(`s${seed}: did-not-end naturally steps=${steps}`);
  }

  const g = DCPlayLogger.getCurrent();
  if (g && !g.end) {
    DCPlayLogger.finish('completed', eng.state.winner, eng.state.endReason);
  }
  if (g && g.turns.length === 0 && steps > 0) errors.push(`s${seed}: logger empty turns`);
  if (g && g.end && g.turns.length !== steps && Math.abs(g.turns.length - steps) > 2) {
    // recordAction may finish early - soft
  }

  return { seed, nat0, nat1, steps, winner: eng.state.winner, reason: eng.state.endReason, errors, logTurns: g && g.turns.length };
}

const N = Number(process.argv[2] || 80);
const allErr = [];
let ended = 0, natural = 0;
for (let i = 0; i < N; i++) {
  const seed = 1000 + i * 17;
  const r = playMatch(seed, 'bot');
  ended++;
  if (!String(r.reason || '').startsWith('fuzz-timeout')) natural++;
  if (r.errors.length) {
    allErr.push(r);
    console.log('FAIL seed', r.seed, r.errors.slice(0, 5));
  }
}
console.log(JSON.stringify({
  matches: N, ended, naturalEnd: natural,
  failMatches: allErr.length,
  sample: allErr.slice(0, 8).map((r) => ({ seed: r.seed, reason: r.reason, steps: r.steps, errs: r.errors.slice(0, 6) })),
}, null, 2));
if (allErr.length || natural < N) process.exitCode = 1;
