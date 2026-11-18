/**
 * t298 (aus t284/t285): Shards einer Nationen-Messung zusammenführen.
 * Aufruf: `node scripts/balance/merge_sim_t298.js <variant> <tag> <n> [ordner=scripts/balance/out]`
 */
const fs = require('fs'); const [v, tag, n] = process.argv.slice(2); const D = (process.argv[5] || require('path').join(__dirname, 'out')) + '/';
const parts = []; for (let i = 0; i < Number(n); i++) parts.push(JSON.parse(fs.readFileSync(D + 'sim_' + v + '_' + tag + '_s' + i + '.json', 'utf8')));
const out = { variant: v, games: 0, decided: 0, firstWins: 0, nations: {}, reasons: {}, turnsAvg: 0, cards: {}, usage: {}, playerGames: 0 };
for (const p of parts) {
  out.games += p.games; out.decided += p.decided; out.firstWins += p.firstWinRate * p.decided; out.turnsAvg += p.turns.avg * p.games;
  out.playerGames += p.playerGames || 0; for (const [k, u] of Object.entries(p.usage || {})) { const o = out.usage[k] = out.usage[k] || { uses: 0, games: 0 }; o.uses += u.uses; o.games += u.games; }
  for (const [r, c] of Object.entries(p.reasons)) out.reasons[r] = (out.reasons[r] || 0) + c;
  for (const [k, x] of Object.entries(p.nations)) { const o = out.nations[k] = out.nations[k] || { name: x.name, games: 0, w: 0, wf: 0, gf: 0 }; o.games += x.games; o.w += x.winRate * x.games; o.wf += x.winFirst * x.games / 2; o.gf += x.games / 2; }
  for (const [id, c] of Object.entries(p.cards || {})) { const o = out.cards[id] = out.cards[id] || { name: c.name, nation: c.nation, ap: c.ap, typ: c.typ, deckGames: 0, nPlayed: 0, wins: 0 }; o.deckGames += c.deckGames; o.nPlayed += c.nPlayed; o.wins += (c.winWhenPlayed || 0) * c.nPlayed; }
}
out.firstWinRate = +(out.firstWins / out.decided).toFixed(3); out.turns = { avg: +(out.turnsAvg / out.games).toFixed(1) };
for (const o of Object.values(out.nations)) { o.winRate = +(o.w / o.games).toFixed(3); o.winFirst = +(o.wf / o.gf).toFixed(3); }
for (const o of Object.values(out.cards)) o.winWhenPlayed = o.nPlayed ? +(o.wins / o.nPlayed).toFixed(3) : null;
fs.writeFileSync(D + 'sim_' + v + '_' + tag + '.json', JSON.stringify(out, null, 1)); console.log('merged', v, tag, out.games);
