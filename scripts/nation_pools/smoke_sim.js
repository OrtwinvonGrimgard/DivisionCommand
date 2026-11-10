#!/usr/bin/env node
'use strict';
/* Technischer Smoke-Test (keine Balance-Aussage): Bot-gegen-Bot-Partien mit Decks aus 30 Starter- + 30 neuen Poolkarten. */
const fs = require('fs'), path = require('path'), vm = require('vm');
const L = require('./load_game.js');
const w = L.loadGame({ quiet: true });
const ctxWin = w; vm.runInNewContext(fs.readFileSync(path.join(L.WEB, 'js/ai/bot.js'), 'utf8'), { window: w, console: { log() {}, warn() {} }, Math, JSON, Object, Array, String, Number, Error });
const Bot = w.DCBot; if (!Bot) throw new Error('Bot nicht geladen');
const nations = Object.keys(w.DC_NATION_DECKS), C = w.DC_CATALOG.cards;
function mixed(n) {
  const d = w.DC_NATION_DECKS[n], pool = C.filter((c) => c.nation === n && c.set === 'set_nation_pool').map((c) => c.id);
  return { cards: d.cards.slice(0, 30).concat(pool.slice(0, 30)), doctrines: d.doktrinen.slice() };
}
const games = Number(process.argv[2] || 32), used = {}, errs = [];
let finished = 0, totalTurns = 0, forcedEnds = 0; const unfinished = [];
for (let g = 0; g < games; g++) {
  const a = nations[g % 16], b = nations[(g * 7 + 3) % 16], d0 = mixed(a), d1 = mixed(b);
  const eng = new w.DCEngine.Engine(w.DC_CATALOG, { seed: 1000 + g });
  eng.createMatch({ seed: 1000 + g, mode: 'bot', name0: a, name1: b, deck0: d0.cards, deck1: d1.cards, doctrine0: d0.doctrines, doctrine1: d1.doctrines });
  const orig = eng.dispatch.bind(eng);
  let steps = 0, stuck = 0; const fail = {};
  while (eng.state.winner == null && steps < 4000 && eng.state.turn <= 30) {
    const pend = eng.state.pending, pid = pend && typeof pend.player === 'number' ? pend.player : eng.state.active;
    let act; try { act = Bot.step(eng, pid, fail) || { type: 'END_TURN', player: pid }; } catch (e) { act = { type: 'END_TURN', player: pid }; }
    if (act.player == null) act.player = pid;
    if (act.type === 'PLAY') { const inst = eng.player(pid).hand.find((c) => c.uid === act.uid); if (inst && /^dc_np_/.test(inst.id || inst.cardId || '')) used[inst.id || inst.cardId] = 1; }
    let res; try { res = orig(act); } catch (e) { errs.push(a + '/' + b + ' ' + e.message); res = { ok: false }; }
    if (!res || !res.ok) { fail[Bot.actKey(act)] = 1; if (++stuck > 40) { forcedEnds++; try { orig({ type: 'END_TURN', player: eng.state.active }); } catch (e) { break; } stuck = 0; for (const k in fail) delete fail[k]; } }
    else { stuck = 0; for (const k in fail) delete fail[k]; }
    steps++;
  }
  if (eng.state.winner != null) finished++; else unfinished.push(a + '/' + b + ' seed ' + (1000 + g) + ' turn ' + eng.state.turn);
  totalTurns += eng.state.turn;
}
console.log(JSON.stringify({ games, finished, avgTurns: +(totalTurns / games).toFixed(1), distinctPoolCardsPlayed: Object.keys(used).length, thrownErrors: errs.length, forcedEnds, unfinished: unfinished.slice(0, 5), sampleErrors: errs.slice(0, 5) }));
/* Hänger (erzwungenes Zugende) oder unbeendete Partien sind Fehler. */
if (errs.length || forcedEnds || finished < games) process.exit(1);
