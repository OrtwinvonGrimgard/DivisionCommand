#!/usr/bin/env node
/**
 * t268: Ein Balance-Schritt aus einem Nationslauf mit Kartenstatistik.
 *
 * Eingabe: JSON von `CARDSTATS=1 node scripts/balance/sim_t255.mjs nations 96 new` (Siegquoten je Nation und
 * je Nation|Karte: Partien mit ausgespielter Karte g, Siegquote wr).
 * Modell: +1 ATK oder +1 DEF an einer Einheit ändert die Siegquote ihrer Nation um etwa K · (Ausspielanteil).
 *   Starterset-Einheiten wirken im Startermodus voll und im Mischmodus etwa halb, Pool-Einheiten nur im Mischmodus.
 * Je Nation werden Starter- und Poolstufe so gewählt, dass beide Modi Richtung 50 % gehen
 * (Abweichung unter DEAD Punkten bleibt unberührt). Verstärkt werden Einheiten mit schwachem Beitrag,
 * geschwächt die mit starkem; nie zwei Funktionsgleiche (profile_t268 fkey/ekey), DEF ≥ 1, ATK ≥ 1.
 * Ausgabe: Patch anwenden und Protokoll an scripts/balance/out/tune_t268_log.json anhängen.
 *
 * Aufruf: node scripts/balance/tune_t268.js <lauf.json> [--dry]   (Umgebung K, DEAD, MAXSTEP)
 */
'use strict';
const fs = require('fs'), path = require('path');
const L = require('./cards_t268.js');
const P = require('./profile_t268.js');
const K = Number(process.env.K || 6);
const DEAD = Number(process.env.DEAD || 0.8);
const MAXSTEP = Number(process.env.MAXSTEP || 14);
/** Median ATK+DEF je AP-Stufe; Einheiten bleiben im Band ±2 (tests/test_balance_t237.js). */
const MED = { 1: 3, 2: 4, 3: 6, 4: 7, 5: 9, 6: 12 };
const GAMES = 2880; // Partien je Nation und Modus (15 Gegner × 96 × 2 Seiten)

/**
 * Hauptablauf.
 */
function main() {
  const run = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  const dry = process.argv.includes('--dry');
  const S = L.loadSources();
  const cur = {};
  for (const [id, ref] of Object.entries(S.index)) {
    if (ref.kind === 'type') { const c = S.types[ref.t].arr[ref.i]; if (c.typ === 'Doktrin') continue; cur[id] = c; }
    else cur[id] = L.poolCard(ref, ref.line);
  }
  const taken = new Set();
  Object.values(cur).forEach((c) => { taken.add('F' + P.fkey(c)); taken.add('E' + P.ekey(c)); });
  const decks = require(L.REPO + '/scripts/nation_pools/load_game.js').loadGame({ quiet: true }).DC_NATION_DECKS;
  const patch = {}, log = [];
  const PROT = L.protectedIds();
  for (const nat of Object.keys(run.starter.nations)) {
    const dS = 50 - run.starter.nations[nat], dM = 50 - run.mixed.nations[nat];
    // Starterstufe x (in K·Anteil-Punkten) und Poolstufe y: S += x, M += x/2 + y
    let x = Math.abs(dS) < DEAD ? 0 : dS;
    let y = dM - x / 2;
    if (Math.abs(y) < DEAD) y = 0;
    const plan = [['starter', x, (id) => decks[nat].cards.includes(id) && cur[id].set !== 'set_nation_pool'],
      ['mixed', y, (id) => cur[id].set === 'set_nation_pool' && cur[id].nation === nat]];
    for (const [mode, want, inSet] of plan) {
      if (!want) continue;
      const stats = run[mode + '_cards'] || {};
      const natWr = run[mode].nations[nat];
      const units = Object.keys(cur).filter((id) => cur[id].typ === 'Einheit' && cur[id].nation === nat && inSet(id) && !patch[id] && !PROT.has(id))
        .map((id) => { const st = stats[nat + '|' + id] || { g: 0, wr: natWr }; return { id, f: st.g / GAMES, contrib: st.wr - natWr }; })
        .filter((u) => u.f > 0.05)
        .sort((a, b) => (want > 0 ? a.contrib - b.contrib : b.contrib - a.contrib));
      let left = Math.abs(want), steps = 0;
      for (const u of units) {
        if (left <= 0.3 || steps >= MAXSTEP) break;
        const c = cur[u.id];
        const opts = want > 0 ? [{ def: c.def + 1 }, { atk: c.atk + 1 }] : [{ atk: c.atk - 1 }, { def: c.def - 1 }];
        if (want > 0 && c.atk + 1 < c.def) opts.reverse();
        if (want < 0 && c.def - 1 > c.atk) opts.reverse();
        for (const o of opts) {
          const nc = Object.assign({}, c, o);
          if (nc.def < 1 || nc.atk < 1) continue;
          if (Math.abs(nc.atk + nc.def - MED[nc.ap]) > 2) continue; // Wertband aus test_balance_t237
          const kf = 'F' + P.fkey(nc), ke = 'E' + P.ekey(nc);
          if (taken.has(kf) || taken.has(ke)) continue;
          taken.add(kf); taken.add(ke);
          patch[u.id] = o; cur[u.id] = nc;
          log.push({ nation: nat, mode, id: u.id, name: c.name, from: [c.ap, c.atk, c.def], to: [nc.ap, nc.atk, nc.def], f: +u.f.toFixed(2), contrib: +u.contrib.toFixed(1) });
          left -= K * u.f; steps++;
          break;
        }
      }
    }
  }
  console.log('Änderungen', Object.keys(patch).length);
  const byNat = {};
  log.forEach((l) => { byNat[l.nation] = (byNat[l.nation] || '') + (l.to[1] + l.to[2] > l.from[1] + l.from[2] ? '+' : '-'); });
  console.log(byNat);
  if (dry) return;
  L.applyPatch(patch);
  const lf = path.join(__dirname, 'out', 'tune_t268_log.json');
  const prev = fs.existsSync(lf) ? JSON.parse(fs.readFileSync(lf, 'utf8')) : [];
  prev.push({ run: path.basename(process.argv[2]), K, changes: log });
  fs.mkdirSync(path.dirname(lf), { recursive: true });
  fs.writeFileSync(lf, JSON.stringify(prev, null, 1));
}
if (require.main === module) main();
