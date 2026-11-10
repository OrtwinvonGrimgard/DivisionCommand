#!/usr/bin/env node
/**
 * Wertet einen Playtest-Export aus (ZIP oder Ordner mit logs/ + notes/).
 * Nutzung: node scripts/playtest/analyze_playtest_logs.mjs <export.zip|export-dir>
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';
import os from 'os';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const target = process.argv[2];
if (!target) {
  console.error('Nutzung: node scripts/playtest/analyze_playtest_logs.mjs <export.zip|ordner>');
  process.exit(1);
}

/**
 * Liest einen exportierten Playtest-Log (JSON) von der Platte.
 */
function loadExport(src) {
  const abs = path.resolve(src);
  if (!fs.existsSync(abs)) throw new Error('nicht gefunden: ' + abs);
  const st = fs.statSync(abs);
  let root = abs;
  let tmp = null;
  if (st.isFile() && /\.zip$/i.test(abs)) {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dc-pt-'));
    const r = spawnSync('unzip', ['-qq', '-o', abs, '-d', tmp], { encoding: 'utf8' });
    if (r.status !== 0) throw new Error('unzip fehlgeschlagen: ' + (r.stderr || r.stdout || ''));
    root = tmp;
  }
  const logsDir = path.join(root, 'logs');
  const notesDir = path.join(root, 'notes');
  const games = [];
  if (fs.existsSync(logsDir)) {
    for (const f of fs.readdirSync(logsDir).filter((x) => x.endsWith('.json'))) {
      games.push(JSON.parse(fs.readFileSync(path.join(logsDir, f), 'utf8')));
    }
  } else {
    // flat json dump
    for (const f of fs.readdirSync(root).filter((x) => x.endsWith('.json') && x !== 'manifest.json')) {
      const j = JSON.parse(fs.readFileSync(path.join(root, f), 'utf8'));
      if (j && j.turns) games.push(j);
    }
  }
  let notes = [];
  if (fs.existsSync(notesDir)) {
    for (const f of fs.readdirSync(notesDir).filter((x) => x.endsWith('.json') && !x.startsWith('_'))) {
      notes.push(JSON.parse(fs.readFileSync(path.join(notesDir, f), 'utf8')));
    }
  }
  return { games, notes, root, tmp };
}

/**
 * Prozentwert (0–100) aus Anteil und Gesamtzahl.
 */
function pct(n, d) {
  if (!d) return '—';
  return ((100 * n) / d).toFixed(1) + '%';
}

/**
 * Liest exportierte Playtest-Logs und gibt eine kurze Statistik aus.
 */
function main() {
  const { games, notes, tmp } = loadExport(target);
  console.log('=== Division Command Playtest-Auswertung ===');
  console.log('Partien:', games.length, '· Anmerkungen:', notes.length);

  const byNation = {};
  const byDoctrine = {};
  const endKinds = {};
  const cardPlay = {};
  let durations = [];
  let turnCounts = [];
  let botCmp = { total: 0, match: 0 };

  for (const g of games) {
    const end = g.end || {};
    const kind = end.aborted ? 'aborted' : (end.reason || end.kind || 'unknown');
    endKinds[kind] = (endKinds[kind] || 0) + 1;
    if (end.durationMs) durations.push(end.durationMs);
    turnCounts.push((g.turns || []).length);

    (g.players || []).forEach((p, idx) => {
      const nat = p.nation || '?';
      if (!byNation[nat]) byNation[nat] = { games: 0, wins: 0 };
      byNation[nat].games += 1;
      if (end.winner === idx) byNation[nat].wins += 1;
      (p.doctrines || []).forEach((d) => {
        const id = (d && d.id) || d || '?';
        if (!byDoctrine[id]) byDoctrine[id] = { games: 0, wins: 0, name: (d && d.name) || id };
        byDoctrine[id].games += 1;
        if (end.winner === idx) byDoctrine[id].wins += 1;
      });
    });

    for (const t of g.turns || []) {
      const a = t.action || {};
      if (a.type === 'PLAY_CARD' || a.type === 'PLAY') {
        const cid = a.cardId || a.id || (a.uid ? 'uid:' + a.uid : a.type);
        cardPlay[cid] = (cardPlay[cid] || 0) + 1;
      }
      if (t.botMatch != null) {
        botCmp.total += 1;
        if (t.botMatch) botCmp.match += 1;
      }
    }
  }

  console.log('\n--- Siegarten ---');
  Object.entries(endKinds).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => {
    console.log(' ', k + ':', v, '(' + pct(v, games.length) + ')');
  });

  console.log('\n--- WR je Nation ---');
  Object.entries(byNation).sort((a, b) => b[1].games - a[1].games).forEach(([k, v]) => {
    console.log(' ', k + ':', v.wins + '/' + v.games, '(' + pct(v.wins, v.games) + ')');
  });

  console.log('\n--- WR je Doktrin ---');
  Object.entries(byDoctrine).sort((a, b) => b[1].games - a[1].games).slice(0, 30).forEach(([k, v]) => {
    console.log(' ', v.name + ' [' + k + ']:', v.wins + '/' + v.games, '(' + pct(v.wins, v.games) + ')');
  });

  console.log('\n--- Kartennutzung (PLAY) Top 25 ---');
  Object.entries(cardPlay).sort((a, b) => b[1] - a[1]).slice(0, 25).forEach(([k, v]) => {
    console.log(' ', k + ':', v);
  });

  const avg = (arr) => arr.length ? arr.reduce((s, x) => s + x, 0) / arr.length : 0;
  console.log('\n--- Partielänge ---');
  console.log('  Aktionen mittel:', avg(turnCounts).toFixed(1), '· min', turnCounts.length ? Math.min(...turnCounts) : 0, '· max', turnCounts.length ? Math.max(...turnCounts) : 0);
  console.log('  Dauer mittel (min):', (avg(durations) / 60000).toFixed(2));

  console.log('\n--- Mensch vs. Bot-Vorschlag ---');
  console.log('  Vergleiche:', botCmp.total, '· Übereinstimmung:', botCmp.match, '(' + pct(botCmp.match, botCmp.total) + ')');

  console.log('\n--- Anmerkungen / Bugs ---');
  const byCat = {};
  notes.forEach((n) => {
    const c = n.category || 'anmerkung';
    byCat[c] = (byCat[c] || 0) + 1;
  });
  Object.entries(byCat).forEach(([k, v]) => console.log(' ', k + ':', v));
  notes.slice().sort((a, b) => String(a.t).localeCompare(String(b.t))).forEach((n) => {
    console.log('  [' + (n.category || '?') + '] ' + (n.t || '').slice(0, 19) + ' · ' + String(n.text || '').slice(0, 120));
  });

  if (tmp) {
    try { fs.rmSync(tmp, { recursive: true, force: true }); } catch (e) {}
  }
}

main();
