/**
 * t298: Doktrin-Messung im Spiegelmatch (übernommen aus `tmp_t283/sim_doc.js`): gleiche Nation, Spieler A tauscht
 * Doktrin 2 gegen X, B behält die Nationsdoktrinen; Sitz und Startspieler wechseln.
 *
 * Aufruf (Repo-Wurzel): `node scripts/balance/sim_doctrines_t298.js [proNation=4]`
 * Umgebung: `SIM_DOCS` (Kommaliste Doktrin-IDs), `SIM_SEED` (Standard 90000), `SIM_OUT`, `SIM_TAG`, `SIM_ROOT`, `SIM_PATCH`.
 * Ergebnis: `sim_doc[_TAG].json` mit Siegquote je Doktrin (Sitz A).
 */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const L = require((process.env.SIM_ROOT || path.join(__dirname, '..', '..')) + '/scripts/nation_pools/load_game.js');
const w = L.loadGame({ quiet: true });
if (process.env.SIM_PATCH) { const P = JSON.parse(process.env.SIM_PATCH); w.DC_CATALOG.cards.forEach((c) => { const q = P[c.id]; if (!q) return; (c.effects || []).forEach((e) => { if (q[e.code]) Object.assign(e.param = e.param || {}, q[e.code]); }); }); }
vm.runInNewContext(fs.readFileSync(path.join(L.WEB, 'js/ai/bot.js'), 'utf8'), { window: w, console: { log() {}, warn() {} }, Math, JSON, Object, Array, String, Number, Error });
const Bot = w.DCBot, C = w.DC_CATALOG.cards, nations = Object.keys(w.DC_NATION_DECKS), per = Number(process.argv[2] || 4);
const docs = C.filter((c) => c.typ === 'Doktrin' && (!process.env.SIM_DOCS || process.env.SIM_DOCS.split(',').includes(c.id)));
const res = {}; let seed = Number(process.env.SIM_SEED || 90000);
for (const d of docs) {
  let g = 0, wins = 0;
  for (const n of nations) {
    const base = w.DC_NATION_DECKS[n];
    let docA = [base.doktrinen[0], d.id]; if (base.doktrinen[0] === d.id) docA = [d.id, base.doktrinen[1]];
    for (let k = 0; k < per; k++) {
      seed++; const aSeat = k % 2, sp = (k >> 1) % 2;
      const decks = [base.cards, base.cards], dd = aSeat === 0 ? [docA, base.doktrinen] : [base.doktrinen, docA];
      const eng = new w.DCEngine.Engine(w.DC_CATALOG, { seed });
      eng.createMatch({ seed, mode: 'bot', name0: n, name1: n, deck0: decks[0].slice(), deck1: decks[1].slice(), doctrine0: dd[0].slice(), doctrine1: dd[1].slice(), startPlayer: sp });
      let steps = 0, stuck = 0; const fail = {};
      while (eng.state.winner == null && steps < 5000 && eng.state.turn <= 40) {
        const pend = eng.state.pending, pid = pend && typeof pend.player === 'number' ? pend.player : eng.state.active;
        let act; try { act = Bot.step(eng, pid, fail) || { type: 'END_TURN', player: pid }; } catch (e) { act = { type: 'END_TURN', player: pid }; }
        if (act.player == null) act.player = pid;
        let r; try { r = eng.dispatch(act); } catch (e) { r = { ok: false }; }
        if (!r || !r.ok) { fail[Bot.actKey(act)] = 1; if (++stuck > 40) { try { eng.dispatch({ type: 'END_TURN', player: eng.state.active }); } catch (e) { break; } stuck = 0; for (const x in fail) delete fail[x]; } }
        else { stuck = 0; for (const x in fail) delete fail[x]; }
        steps++;
      }
      g++; if (eng.state.winner === aSeat) wins++;
    }
  }
  res[d.id] = { name: d.name, nation: d.nation || null, games: g, winRate: +(wins / g).toFixed(3) };
}
fs.mkdirSync(process.env.SIM_OUT || path.join(__dirname, 'out'), { recursive: true });
fs.writeFileSync(path.join(process.env.SIM_OUT || path.join(__dirname, 'out'), 'sim_doc' + (process.env.SIM_TAG ? '_' + process.env.SIM_TAG : '') + '.json'), JSON.stringify(res, null, 1));
console.log('done', Object.keys(res).length);
