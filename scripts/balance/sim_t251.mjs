/**
 * t251: kurze Preis-Plausibilisierung nach echter Wirkung von Vertragsclip,
 * Schläferzelle und Doktrin Blitzkrieg. Eine Kopie / die Doktrin nur bei Spieler 0.
 * Usage: node scripts/balance/sim_t251.mjs [games=400]
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
const gamesN = Math.max(20, Number(process.argv[2] || 400));

function loadInto(context, rel) {
  const p = path.join(ROOT, rel);
  if (!fs.existsSync(p)) return;
  vm.runInContext(fs.readFileSync(p, 'utf8'), context, { filename: rel });
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
  'js/version.js', 'js/data/keywords.js',
  'js/data/sets/types/doktrinen.js', 'js/data/sets/types/tokens.js',
  'js/data/sets/types/infanterie.js', 'js/data/sets/types/panzer.js',
  'js/data/sets/types/artillerie.js', 'js/data/sets/types/aufklaerung.js',
  'js/data/sets/types/elite.js', 'js/data/sets/types/unterstuetzung.js',
  'js/data/sets/types/soforteinsatz.js', 'js/data/sets/types/ausruestung.js', 'js/data/sets/types/nation_pools.js',
  'js/data/sets/types/tactical.js',
  'js/data/decks.js', 'js/data/catalog.js',
  'js/engine/engine.js', 'js/engine/victory_trophy.js', 'js/engine/doctrine_runtime.js',
  'js/engine/tactical_runtime.js', 'js/ai/bot.js',
]) loadInto(ctx, s);

const { DCEngine, DCBot, DC_CATALOG, DC_NATION_DECKS } = ctx;
DCBot.applyCfg({ model: 'test', delayMs: 0, aggression: 70, holdAp: 0, allowAttack: 1 });
const nations = Object.keys(DC_NATION_DECKS);
const trophyRules = Object.assign({}, DC_CATALOG.rules, { victory_mode: 'trophy', trophy_vp_to_win: 5 });
const byId = Object.fromEntries(DC_CATALOG.cards.map((c) => [c.id, c]));

function botAct(engine, fail) {
  const pend = engine.state.pending;
  const pid = pend && typeof pend.player === 'number' ? pend.player : engine.state.active;
  let act;
  try { act = DCBot.step(engine, pid, fail) || { type: 'END_TURN', player: pid }; }
  catch (e) { act = { type: 'END_TURN', player: pid }; }
  if (!act.player && act.player !== 0) act.player = pid;
  return act;
}

function cidOf(c) { return c && (c.id || c.cardId); }
function inZone(list, id) { return (list || []).some((c) => cidOf(c) === id); }
function frontHas(p, id) {
  for (const s of ['L', 'C', 'R']) {
    for (const x of (p.front[s] || [])) {
      if (cidOf(x) === id) return true;
      if ((x && x.attachments || []).some((a) => cidOf(a) === id)) return true;
    }
  }
  return false;
}
function supportHas(p, id) {
  return (p.support || []).some((s) => {
    if (!s) return false;
    if (cidOf(s) === id) return true;
    return (s.attachments || []).some((a) => cidOf(a) === id);
  });
}

function injectCard(deck, id) {
  const typ = byId[id].typ;
  const cards = deck.cards.slice();
  const idx = cards.findIndex((x) => byId[x] && byId[x].typ === typ && x !== id);
  if (idx >= 0) cards[idx] = id;
  else cards[cards.length - 1] = id;
  return { cards, doctrines: deck.doctrines.slice() };
}

function injectDok(deck, id) {
  const doks = deck.doctrines.slice();
  if (!doks.includes(id)) {
    if (doks.length) doks[0] = id;
    else doks.push(id);
  }
  return { cards: deck.cards.slice(), doctrines: doks };
}

function playedOf(eng, id, name, isDok) {
  const p0 = eng.player(0);
  if (isDok) return (p0.doctrines || []).some((d) => cidOf(d) === id);
  if (inZone(p0.grave, id)) return true;
  const msgs = (eng.log || []).map((x) => String((x && x.msg) || ''));
  if (name && msgs.some((m) => m.includes(name))) return true;
  const still = inZone(p0.deck, id) || inZone(p0.hand, id) || supportHas(p0, id) || frontHas(p0, id);
  return !still;
}

function playOnce(spec, seed, nat0, nat1) {
  const def = spec.id ? byId[spec.id] : null;
  const prev = def && spec.ap != null ? def.ap : null;
  if (def && spec.ap != null) def.ap = spec.ap;
  const w = { DC_CATALOG, DC_NATION_DECKS };
  let d0 = buildMixedDeck(w, nat0, seed);
  const d1 = buildMixedDeck(w, nat1, seed + 17);
  if (spec.mode === 'card') d0 = injectCard(d0, spec.id);
  else if (spec.mode === 'dok') d0 = injectDok(d0, spec.id);
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
  const winner = eng.state.winner;
  const played = spec.id ? playedOf(eng, spec.id, def && def.name, spec.mode === 'dok') : false;
  if (def && prev != null) def.ap = prev;
  return { winner, played, finished: winner != null || eng.state.phase === 'gameover' };
}

function run(spec, n, salt) {
  let p0 = 0, draw = 0, played = 0, fin = 0;
  for (let i = 0; i < n; i++) {
    const nat0 = nations[i % 16];
    const nat1 = nations[(i * 3 + 5) % 16];
    const r = playOnce(spec, salt + i * 13, nat0, nat1);
    if (r.finished) fin++;
    if (r.winner === 0) p0++;
    else if (r.winner == null) draw++;
    if (r.played) played++;
  }
  return {
    ap: spec.ap, games: n, finished: fin,
    p0Wins: p0, p0Winrate: +(p0 / n).toFixed(4),
    draws: draw, played, playRate: +(played / n).toFixed(4),
  };
}

const CASES = [
  { key: 'clip', name: 'Vertragsclip', mode: 'card', id: 'dc_b_vertragsclip_182', ap: 2 },
  { key: 'sleeper', name: 'Schläferzelle', mode: 'card', id: 'dc_su_schlaefer', ap: 3 },
  { key: 'blitz', name: 'Blitzkrieg', mode: 'dok', id: 'dc_dok_blitzkrieg' },
];

const out = {};
for (const c of CASES) {
  const ctrl = run({ mode: 'none' }, gamesN, 2510);
  const on = run(c, gamesN, 2510);
  let zero = null;
  if (c.ap != null) zero = run(Object.assign({}, c, { ap: 0 }), gamesN, 2510);
  out[c.key] = { name: c.name, id: c.id, ap: c.ap, control: ctrl, current: on, ap0: zero };
  const z = zero ? (' 0AP WR ' + zero.p0Winrate + ' play ' + zero.playRate) : '';
  console.error(c.name, 'ctrl', ctrl.p0Winrate, '→ current', on.p0Winrate, 'play', on.playRate, z);
}
console.log(JSON.stringify(out, null, 2));
fs.mkdirSync(path.join(__dirname, 'out'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'out/sim_t251.json'), JSON.stringify(out, null, 2));
