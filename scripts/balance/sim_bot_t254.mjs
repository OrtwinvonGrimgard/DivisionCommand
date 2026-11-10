/**
 * t254: Messreihe zur Bot-KI (parallel über alle CPU-Kerne).
 *
 * Aufrufe (von der Repo-Wurzel):
 *   node scripts/balance/sim_bot_t254.mjs h2h [paare=1920]            neuer Bot gegen alten Bot
 *   node scripts/balance/sim_bot_t254.mjs nations [jePaar=24] [bot=new]  Nationsspanne Misch + Starter
 *   node scripts/balance/sim_bot_t254.mjs cards [partien=2000] [bot=new] Injektion Blitzkrieg/Massen/Letzter …
 *
 * Alter Bot: Datei aus OLD_BOT (Standard: `git show d94b5a5d:…/bot.js`).
 * Ergebnis als JSON auf stdout und unter scripts/balance/out/.
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import vm from 'vm';
import { fork, execSync } from 'child_process';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO = path.resolve(__dirname, '../..');
const ROOT = path.join(REPO, 'Division_Command/web');
const require = createRequire(import.meta.url);
const { buildMixedDeck } = require('../nation_pools/mixed_deck.js');
const OLD_REF = 'd94b5a5d';

/**
 * Lädt Engine, Katalog und Decks in einen Node-vm-Kontext (ohne DOM).
 * @returns {object} Kontext mit DCEngine, DC_CATALOG, DC_NATION_DECKS
 */
function loadGame() {
  const sandbox = {
    console, setTimeout, clearTimeout,
    document: {
      getElementById: () => null, querySelector: () => null, querySelectorAll: () => [],
      createElement: () => ({ style: {}, appendChild() {}, remove() {}, setAttribute() {} }),
      head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } },
      addEventListener() {}, removeEventListener() {},
    },
    localStorage: { getItem: () => null, setItem() {} },
    navigator: {},
  };
  sandbox.window = sandbox; sandbox.globalThis = sandbox; sandbox.self = sandbox;
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
    'js/engine/tactical_runtime.js',
  ]) {
    const p = path.join(ROOT, s);
    if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, 'utf8'), ctx, { filename: s });
  }
  return ctx;
}

/**
 * Lädt eine Bot-Datei in einen eigenen Kontext, damit alter und neuer Bot getrennte Konfigurationen haben.
 * @param {string} src Quelltext von bot.js
 * @returns {object} DCBot
 */
function loadBot(src) {
  const holder = {};
  vm.runInNewContext(src, { window: holder, console: { log() {}, warn() {} }, Math, JSON, Object, Array, String, Number, Error, Date });
  holder.DCBot.applyCfg({ model: 'test', delayMs: 0, aggression: 70, holdAp: 0, allowAttack: 1 });
  return holder.DCBot;
}

/**
 * Quelltext des alten Bots (Umgebung OLD_BOT oder git show).
 * @returns {string}
 */
function oldBotSrc() {
  if (process.env.OLD_BOT) return fs.readFileSync(process.env.OLD_BOT, 'utf8');
  return execSync('git show ' + OLD_REF + ':Division_Command/web/js/ai/bot.js', { cwd: REPO, encoding: 'utf8', maxBuffer: 1 << 24 });
}

/**
 * Spielt eine Partie Bot gegen Bot (Trophy, wie t240/t249). Scheitert eine Aktion, endet der Zug.
 * @param {object} G Spielkontext
 * @param {object[]} bots [Bot Spieler 0, Bot Spieler 1]
 * @param {object} d0 Deck 0 {cards, doctrines}
 * @param {object} d1 Deck 1
 * @param {number} seed
 * @returns {{winner: (number|null), startPlayer: number, finished: boolean, turns: number, fails: number}}
 */
function playGame(G, bots, d0, d1, seed) {
  const rules = Object.assign({}, G.DC_CATALOG.rules, { victory_mode: 'trophy', trophy_vp_to_win: 5 });
  const startPlayer = seed % 2;
  const eng = new G.DCEngine.Engine(G.DC_CATALOG, { seed, rules });
  eng.createMatch({ seed, mode: 'hotseat', startPlayer, deck0: d0.cards, deck1: d1.cards, doctrine0: d0.doctrines, doctrine1: d1.doctrines, name0: 'A', name1: 'B' });
  let steps = 0, fails = 0;
  const failsBy = [0, 0];
  const usedBy = [{}, {}];
  const fail = {};
  while (eng.state.winner == null && steps++ < 4000) {
    const pend = eng.state.pending;
    const pid = pend && typeof pend.player === 'number' ? pend.player : eng.state.active;
    const bot = bots[pid];
    let act;
    try { act = bot.step(eng, pid, fail) || { type: 'END_TURN', player: pid }; } catch (e) { act = { type: 'END_TURN', player: pid }; }
    if (act.player == null) act.player = pid;
    const r = eng.dispatch(act);
    if (r && r.ok && !pend) {
      const k = act.ability === 'NEUTRALIZE' ? 'NEUTRALIZE' : act.type;
      usedBy[pid][k] = (usedBy[pid][k] || 0) + 1;
    }
    if (!r || !r.ok) {
      fails++;
      failsBy[pid]++;
      fail[bot.actKey(act)] = 1;
      if (act.type !== 'END_TURN') eng.dispatch({ type: 'END_TURN', player: act.player });
    }
  }
  return { winner: eng.state.winner, startPlayer, finished: eng.state.winner != null || eng.state.phase === 'gameover', turns: eng.state.turn, fails, failsBy, usedBy, eng };
}

/**
 * Startdeck einer Nation (60+2).
 * @param {object} G
 * @param {string} nat
 * @returns {{cards: string[], doctrines: string[]}}
 */
function starterOf(G, nat) {
  const d = G.DC_NATION_DECKS[nat];
  return { cards: (d.cards || []).slice(), doctrines: (d.doktrinen || []).slice(0, 2) };
}

/**
 * Tauscht genau eine Karte gleichen Typs gegen `id` (Injektion wie t249–t251).
 * @param {object} byId
 * @param {object} deck
 * @param {string} id
 * @returns {object}
 */
function injectCard(byId, deck, id) {
  const typ = byId[id].typ;
  const cards = deck.cards.slice();
  const idx = cards.findIndex((x) => byId[x] && byId[x].typ === typ && x !== id);
  if (idx >= 0) cards[idx] = id; else cards[cards.length - 1] = id;
  return { cards, doctrines: deck.doctrines.slice() };
}

/**
 * Ersetzt die erste Doktrin durch `id`.
 * @param {object} deck
 * @param {string} id
 * @returns {object}
 */
function injectDok(deck, id) {
  const doks = deck.doctrines.slice();
  if (!doks.includes(id)) { if (doks.length) doks[0] = id; else doks.push(id); }
  return { cards: deck.cards.slice(), doctrines: doks };
}

/**
 * True, wenn Spieler 0 die injizierte Karte gespielt hat (Friedhof, Log oder nicht mehr in Deck/Hand).
 * @param {object} eng
 * @param {object} def
 * @returns {boolean}
 */
function playedBy0(eng, def) {
  const p0 = eng.player(0), id = def.id, cid = (c) => c && (c.id || c.cardId);
  if (def.typ === 'Doktrin') return true;
  const inDeck = (p0.deck || []).some((c) => cid(c) === id) || (p0.hand || []).some((c) => cid(c) === id);
  return !inDeck;
}

/* ---------------------------------------------------------------- Worker */

/**
 * Führt eine Liste von Partie-Jobs aus und liefert Rohergebnisse.
 * @param {object[]} jobs
 * @returns {object[]}
 */
function runJobs(jobs) {
  const G = loadGame();
  const byId = Object.fromEntries(G.DC_CATALOG.cards.map((c) => [c.id, c]));
  const srcNew = fs.readFileSync(path.join(ROOT, 'js/ai/bot.js'), 'utf8');
  const cache = {};
  const botOf = (k) => {
    if (cache[k]) return cache[k];
    cache[k] = loadBot(k === 'old' ? oldBotSrc() : srcNew);
    // Ablation: NEW_CFG='{"tiered":0}' schaltet einzelne t254-Bausteine des neuen Bots ab.
    if (k === 'new' && process.env.NEW_CFG) cache[k].applyCfg(JSON.parse(process.env.NEW_CFG));
    return cache[k];
  };
  // Nur Messung: RULES_OVERRIDE='{"opening_starter_ap_penalty":1}' prüft Regelvarianten, ohne den Katalog zu ändern.
  if (process.env.RULES_OVERRIDE) Object.assign(G.DC_CATALOG.rules, JSON.parse(process.env.RULES_OVERRIDE));
  const W = { DC_CATALOG: G.DC_CATALOG, DC_NATION_DECKS: G.DC_NATION_DECKS };
  const out = [];
  for (const j of jobs) {
    let d0 = j.deck === 'starter' ? starterOf(G, j.n0) : buildMixedDeck(W, j.n0, j.seed);
    let d1 = j.deck === 'starter' ? starterOf(G, j.n1) : buildMixedDeck(W, j.n1, j.seed + 9);
    let def = null, prevAp = null;
    if (j.inject) {
      def = byId[j.inject];
      if (def.typ === 'Doktrin') d0 = injectDok(d0, j.inject); else d0 = injectCard(byId, d0, j.inject);
      if (j.ap != null) { prevAp = def.ap; def.ap = j.ap; }
    }
    const r = playGame(G, [botOf(j.b0), botOf(j.b1)], d0, d1, j.seed);
    if (def && prevAp != null) def.ap = prevAp;
    out.push({ id: j.id, winner: r.winner, startPlayer: r.startPlayer, finished: r.finished, turns: r.turns, fails: r.fails, failsBy: r.failsBy, usedBy: r.usedBy, played: def ? playedBy0(r.eng, def) : null });
  }
  return out;
}

if (process.argv[2] === '--worker') {
  process.on('message', (jobs) => { process.send(runJobs(jobs), () => process.exit(0)); });
} else {
  main();
}

/**
 * Verteilt Jobs auf Kindprozesse.
 * @param {object[]} jobs
 * @returns {Promise<object[]>}
 */
function parallel(jobs) {
  const n = Math.max(1, Math.min(Number(process.env.WORKERS || os.cpus().length), jobs.length));
  const chunks = Array.from({ length: n }, () => []);
  jobs.forEach((j, i) => chunks[i % n].push(j));
  return Promise.all(chunks.map((c) => new Promise((res, rej) => {
    const ch = fork(__filename, ['--worker'], { stdio: ['ignore', 'inherit', 'inherit', 'ipc'] });
    ch.on('message', res); ch.on('error', rej);
    ch.on('exit', (code) => { if (code) rej(new Error('Worker-Abbruch ' + code)); });
    ch.send(c);
  }))).then((parts) => parts.flat());
}

/**
 * 95-%-Konfidenzhalbbreite in Prozentpunkten.
 * @param {number} p
 * @param {number} n
 * @returns {number}
 */
function ci(p, n) { return n ? +(196 * Math.sqrt(p * (1 - p) / n)).toFixed(1) : 0; }

/**
 * Einstieg: Modus wählen, Jobs bauen, auswerten.
 */
async function main() {
  const mode = process.argv[2] || 'h2h';
  const G = loadGame();
  const nations = Object.keys(G.DC_NATION_DECKS);
  const jobs = [];
  let id = 0;
  const t0 = Date.now();
  let out;
  if (mode === 'h2h') {
    const pairs = Number(process.argv[3] || 1920), deck = process.argv[4] || 'mixed';
    for (let i = 0; i < pairs; i++) {
      const n0 = nations[i % 16], n1 = nations[(Math.floor(i / 16) + 1 + i) % 16];
      const seed = 254000 + i * 7;
      jobs.push({ id: id++, n0, n1, seed, b0: 'new', b1: 'old', deck });
      jobs.push({ id: id++, n0, n1, seed, b0: 'old', b1: 'new', deck });
    }
    const res = await parallel(jobs);
    let nw = 0, ow = 0, dr = 0, fin = 0, turns = 0;
    const fails = { new: 0, old: 0 };
    const used = { new: {}, old: {} };
    res.forEach((r) => {
      const j = jobs[r.id];
      if (r.finished) fin++;
      turns += r.turns;
      fails[j.b0] += r.failsBy[0]; fails[j.b1] += r.failsBy[1];
      [j.b0, j.b1].forEach((b, pi) => { for (const k in r.usedBy[pi]) used[b][k] = (used[b][k] || 0) + r.usedBy[pi][k]; });
      if (r.winner == null) dr++;
      else if ((r.winner === 0 ? j.b0 : j.b1) === 'new') nw++; else ow++;
    });
    const p = nw / Math.max(1, nw + ow);
    out = { mode, deck, games: res.length, finished: fin, newWins: nw, oldWins: ow, draws: dr, newWinrate: +(100 * p).toFixed(1), ci95: ci(p, nw + ow),
      avgTurns: +(turns / res.length).toFixed(1), rejectedPerGame: { new: +(fails.new / res.length).toFixed(2), old: +(fails.old / res.length).toFixed(2) },
      actionsPerGame: Object.fromEntries(['new', 'old'].map((b) => [b, Object.fromEntries(Object.entries(used[b]).map(([k, v]) => [k, +(v / res.length).toFixed(2)]))])) };
  } else if (mode === 'nations') {
    const per = Number(process.argv[3] || 24), bot = process.argv[4] || 'new';
    for (const deck of ['mixed', 'starter']) {
      let gi = 0;
      for (const a of nations) for (const b of nations) {
        if (a === b) continue;
        for (let g = 0; g < per; g++) {
          jobs.push({ id: id++, n0: a, n1: b, seed: (deck === 'mixed' ? 1900000 : 2900000) + gi * 31 + g, b0: bot, b1: bot, deck });
          gi++;
        }
      }
    }
    const res = await parallel(jobs);
    out = { mode, bot, perPair: per };
    for (const deck of ['mixed', 'starter']) {
      const wr = Object.fromEntries(nations.map((n) => [n, { w: 0, g: 0 }]));
      let sW = 0, sG = 0, fin = 0, games = 0, turns = 0, rej = 0;
      res.forEach((r) => {
        const j = jobs[r.id];
        if (j.deck !== deck) return;
        games++; if (r.finished) fin++;
        turns += r.turns; rej += r.fails;
        wr[j.n0].g++; wr[j.n1].g++;
        if (r.winner === 0) wr[j.n0].w++;
        if (r.winner === 1) wr[j.n1].w++;
        if (r.winner != null) { sG++; if (r.winner === r.startPlayer) sW++; }
      });
      const nat = {};
      let lo = 100, hi = 0;
      nations.forEach((n) => { const p = 100 * wr[n].w / wr[n].g; nat[n] = +p.toFixed(1); lo = Math.min(lo, p); hi = Math.max(hi, p); });
      out[deck] = { games, finished: fin, avgTurns: +(turns / games).toFixed(1), rejectedPerGame: +(rej / games).toFixed(2), firstPlayer: +(100 * sW / sG).toFixed(1), span: [+lo.toFixed(1), +hi.toFixed(1)], ci95PerNation: ci(0.5, wr[nations[0]].g), nations: nat };
    }
  } else if (mode === 'cards') {
    const n = Number(process.argv[3] || 2000), bot = process.argv[4] || 'new';
    const CASES = [
      { key: 'control' },
      { key: 'blitzkrieg', inject: 'dc_dok_blitzkrieg' },
      { key: 'massen', inject: 'dc_so_massen' },
      { key: 'massen_ap0', inject: 'dc_so_massen', ap: 0 },
      { key: 'letzter', inject: 'dc_so_letzter' },
      { key: 'gehorsam', inject: 'dc_so_blinder_gehorsam' },
      { key: 'gassen', inject: 'dc_so_gassen' },
      { key: 'mobilisierung', inject: 'dc_so_mobilisierung' },
      { key: 'schlaefer', inject: 'dc_su_schlaefer' },
      { key: 'vertragsclip', inject: 'dc_b_vertragsclip_182' },
    ];
    for (const c of CASES) for (let i = 0; i < n; i++) {
      jobs.push({ id: id++, key: c.key, n0: nations[i % 16], n1: nations[(i * 3 + 5) % 16], seed: 2540 + i * 13, b0: bot, b1: bot, deck: 'mixed', inject: c.inject, ap: c.ap });
    }
    const res = await parallel(jobs);
    out = { mode, bot, gamesPerCase: n, cases: {} };
    for (const c of CASES) {
      const rs = res.filter((r) => jobs[r.id].key === c.key);
      const w = rs.filter((r) => r.winner === 0).length, pl = rs.filter((r) => r.played).length;
      out.cases[c.key] = { winrateP0: +(100 * w / rs.length).toFixed(1), ci95: ci(w / rs.length, rs.length), playRate: c.inject ? +(100 * pl / rs.length).toFixed(1) : null, finished: rs.filter((r) => r.finished).length };
    }
  }
  out.seconds = Math.round((Date.now() - t0) / 1000);
  console.log(JSON.stringify(out, null, 2));
  fs.mkdirSync(path.join(__dirname, 'out'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'out', 'sim_bot_t254_' + mode + (process.argv[4] ? '_' + process.argv[4] : '') + '.json'), JSON.stringify(out, null, 2));
}
