/**
 * t298: Nationen-Messung (Bot gegen Bot), übernommen aus dem t283–t285-Harness (`tmp_t283/sim.js`, vorher nicht im Repo).
 * Round-Robin aller 16 Nationen, Startspieler abwechselnd, feste Seeds (vorher/nachher vergleichbar).
 *
 * Aufruf (Repo-Wurzel): `node scripts/balance/sim_nations_t298.js <starter|mixed> [proPaarung=4]`
 * Umgebung: `SIM_SEED` (Start-Seed, Standard 50000), `SIM_OUT` (Zielordner), `SIM_TAG` (Dateisuffix),
 * `SIM_ROOT` (anderer Klon/Stand, Standard dieses Repo), `SIM_PATCH` (JSON {kartenId: {CODE: {param…}}} – nur Messung).
 * Ergebnis: `sim_<variant>[_TAG].json` mit Siegquoten je Nation, Startspieler-Quote, Zuglängen, Kartenstatistik.
 * Shards zusammenführen: `node scripts/balance/merge_sim_t298.js <variant> <tag> <n> [ordner]`.
 */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const L = require((process.env.SIM_ROOT || path.join(__dirname, '..', '..')) + '/scripts/nation_pools/load_game.js');
const w = L.loadGame({ quiet: true });
if (process.env.SIM_PATCH) { const P = JSON.parse(process.env.SIM_PATCH); w.DC_CATALOG.cards.forEach((c) => { const q = P[c.id]; if (!q) return; (c.effects || []).forEach((e) => { if (q[e.code]) Object.assign(e.param = e.param || {}, q[e.code]); }); }); }
/**
 * t300: Der Bot nutzt `Math.random` (Gleichstände, Zufallswahl). Damit eine Messung mit gleichen Seeds genau dieselben
 * Zahlen liefert (Balance-Gate), bekommt der Bot ein eigenes `Math`, dessen `random` je Partie aus dem Partie-Seed
 * neu gestartet wird (mulberry32).
 * @param {number} a Seed
 * @returns {function(): number} Zufallszahl in [0, 1)
 */
function mulberry32(a) { return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
const botRng = { f: Math.random };
const BotMath = Object.create(Math); BotMath.random = () => botRng.f();
vm.runInNewContext(fs.readFileSync(path.join(L.WEB, 'js/ai/bot.js'), 'utf8'), { window: w, console: { log() {}, warn() {} }, Math: BotMath, JSON, Object, Array, String, Number, Error });
const Bot = w.DCBot, C = w.DC_CATALOG.cards, byId = Object.fromEntries(C.map((c) => [c.id, c]));
const nations = Object.keys(w.DC_NATION_DECKS);
const variant = process.argv[2] || 'starter', per = Number(process.argv[3] || 4);
/**
 * Deck einer Nation für die Variante (Starter: Starterdeck; mixed: 30 Starter- + 30 Poolkarten).
 * @param {string} n Nation
 * @returns {{cards: string[], doctrines: string[]}}
 */
function deck(n) {
  const d = w.DC_NATION_DECKS[n];
  if (variant === 'starter') return { cards: d.cards.slice(), doctrines: d.doktrinen.slice() };
  const pool = C.filter((c) => c.nation === n && c.set === 'set_nation_pool').map((c) => c.id);
  return { cards: d.cards.slice(0, 30).concat(pool.slice(0, 30)), doctrines: d.doktrinen.slice() };
}
const nat = {}; nations.forEach((n) => nat[n] = { g: 0, w: 0, d: 0, gFirst: 0, wFirst: 0, vs: {} });
const card = {}; const reasons = {}; const turns = []; let firstWins = 0, decided = 0, draws = 0, errs = 0, forced = 0, games = 0;
const apFirst = [];
let seed = Number(process.env.SIM_SEED || 50000);
for (const a of nations) for (const b of nations) {
  if (a === b) continue;
  for (let g = 0; g < per; g++) {
    seed++; games++;
    const d0 = deck(a), d1 = deck(b), sp = g % 2;
    botRng.f = mulberry32((seed * 2654435761) >>> 0);
    const eng = new w.DCEngine.Engine(w.DC_CATALOG, { seed });
    eng.createMatch({ seed, mode: 'bot', name0: a, name1: b, deck0: d0.cards, deck1: d1.cards, doctrine0: d0.doctrines, doctrine1: d1.doctrines, startPlayer: sp });
    apFirst.push(eng.state.players[sp].ap);
    const played = [new Set(), new Set()], inDeck = [new Set(d0.cards), new Set(d1.cards)];
    let steps = 0, stuck = 0; const fail = {};
    while (eng.state.winner == null && steps < 5000 && eng.state.turn <= 40) {
      const pend = eng.state.pending, pid = pend && typeof pend.player === 'number' ? pend.player : eng.state.active;
      let act; try { act = Bot.step(eng, pid, fail) || { type: 'END_TURN', player: pid }; } catch (e) { act = { type: 'END_TURN', player: pid }; }
      if (act.player == null) act.player = pid;
      let cid = null;
      if (act.type === 'PLAY') { const inst = eng.player(pid).hand.find((c) => c.uid === act.uid); if (inst) cid = inst.id || inst.cardId; }
      let res; try { res = eng.dispatch(act); } catch (e) { errs++; res = { ok: false }; }
      if (res && res.ok && cid) { played[pid].add(cid); const k = card[cid] = card[cid] || { plays: 0, games: 0, wins: 0, deckGames: 0 }; k.plays++; }
      if (!res || !res.ok) { fail[Bot.actKey(act)] = 1; if (++stuck > 40) { forced++; try { eng.dispatch({ type: 'END_TURN', player: eng.state.active }); } catch (e) { break; } stuck = 0; for (const k in fail) delete fail[k]; } }
      else { stuck = 0; for (const k in fail) delete fail[k]; }
      steps++;
    }
    const win = eng.state.winner; const r = eng.state.endReason || (win == null ? 'unbeendet' : '?');
    reasons[r] = (reasons[r] || 0) + 1; turns.push(eng.state.turn);
    [a, b].forEach((n, pid) => {
      const N = nat[n]; N.g++; if (pid === sp) N.gFirst++;
      N.vs[pid ? a : b] = N.vs[pid ? a : b] || { g: 0, w: 0 }; N.vs[pid ? a : b].g++;
      if (win === pid) { N.w++; N.vs[pid ? a : b].w++; if (pid === sp) N.wFirst++; }
      if (win !== 0 && win !== 1) N.d++;
      inDeck[pid].forEach((id) => { const k = card[id] = card[id] || { plays: 0, games: 0, wins: 0, deckGames: 0 }; k.deckGames++; });
      played[pid].forEach((id) => { card[id].games++; if (win === pid) card[id].wins++; });
    });
    if (win === 0 || win === 1) { decided++; if (win === sp) firstWins++; } else draws++;
  }
}
turns.sort((x, y) => x - y);
const out = { variant, per, games, decided, draws, errs, forced, firstWinRate: +(firstWins / decided).toFixed(3), apFirstTurnStarter: [...new Set(apFirst)],
  turns: { avg: +(turns.reduce((x, y) => x + y, 0) / turns.length).toFixed(1), p10: turns[Math.floor(turns.length * .1)], med: turns[Math.floor(turns.length / 2)], p90: turns[Math.floor(turns.length * .9)], max: turns[turns.length - 1] },
  reasons, nations: Object.fromEntries(nations.map((n) => [n, { name: w.DC_NATION_DECKS[n].name, games: nat[n].g, winRate: +(nat[n].w / nat[n].g).toFixed(3), drawRate: +(nat[n].d / nat[n].g).toFixed(3), winFirst: +(nat[n].wFirst / nat[n].gFirst).toFixed(3), winSecond: +((nat[n].w - nat[n].wFirst) / (nat[n].g - nat[n].gFirst)).toFixed(3), doctrines: w.DC_NATION_DECKS[n].doktrinen, vs: Object.fromEntries(Object.entries(nat[n].vs).map(([k, v]) => [k, +(v.w / v.g).toFixed(2)])) }])),
  cards: Object.fromEntries(Object.entries(card).map(([id, k]) => [id, { name: (byId[id] || {}).name, typ: (byId[id] || {}).typ, ap: (byId[id] || {}).ap, nation: (byId[id] || {}).nation, deckGames: k.deckGames, playRate: +(k.games / Math.max(1, k.deckGames)).toFixed(3), playsPerGame: +(k.plays / Math.max(1, k.deckGames)).toFixed(2), winWhenPlayed: k.games ? +(k.wins / k.games).toFixed(3) : null, nPlayed: k.games }])) };
fs.mkdirSync(process.env.SIM_OUT || path.join(__dirname, 'out'), { recursive: true });
fs.writeFileSync(path.join(process.env.SIM_OUT || path.join(__dirname, 'out'), 'sim_' + variant + (process.env.SIM_TAG ? '_' + process.env.SIM_TAG : '') + '.json'), JSON.stringify(out, null, 1));
console.log(JSON.stringify({ variant, games, decided, draws, errs, forced, firstWinRate: out.firstWinRate, turns: out.turns, reasons }));
