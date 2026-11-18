#!/usr/bin/env node
/**
 * t300: Balance-Gate. Misst Nationen (Starter- und Mischdecks) und Doktrinen (Spiegelmatch) Bot gegen Bot mit festen
 * Seeds über die t298-Harness (`sim_nations_t298.js`, `sim_doctrines_t298.js`), schreibt einen Bericht (JSON + Markdown)
 * und endet mit Code 1, wenn eine Nation oder Doktrin außerhalb des Bands 40–60 % liegt und nicht in der Ausnahmeliste
 * (`balance_allowlist.json`) steht oder ihre dort erlaubte Spanne verlässt.
 *
 * Aufruf (Repo-Wurzel): `npm run balance-gate` (voll, ~8–12 min auf 8 Kernen) oder `npm run balance-gate:quick` (CI).
 * Optionen:
 *   `--mode full|quick`     Stichprobe (siehe MODES; Standard full)
 *   `--jobs N`              parallele Prozesse (Standard: Kerne)
 *   `--root PFAD`           anderer Spielstand (z. B. alter Tag) über `SIM_ROOT`; Messung, kein Gate-Wechsel
 *   `--baseline DATEI`      Vergleichsstand (Standard `scripts/balance/baseline/balance_gate_<mode>.json`)
 *   `--update-baseline`     Ergebnis als neuen Vergleichsstand `baseline/balance_gate_<mode>.json` speichern (nach
 *                           bewusster Balance-Änderung; Vergleich im Bericht weiter gegen `--baseline`)
 *   `--out ORDNER`          Ausgabe (Standard `scripts/balance/out/`, gitignored)
 *   `--label TEXT`          Bezeichnung im Bericht (Standard: Version aus `Division_Command/VERSION`)
 * Doku: `Division_Command/docs/balance/BALANCE_GATE.md`.
 */
'use strict';
const fs = require('fs'), path = require('path'), os = require('os'), { spawn } = require('child_process');

const HERE = __dirname, REPO = path.join(HERE, '..', '..');
const BAND = { lo: 0.40, hi: 0.60, watchLo: 0.45, watchHi: 0.55 };
/**
 * Stichproben je Modus. `k` = Toleranz in Standardfehlern über das Band hinaus, ab der das Gate rot wird.
 * full: je Nation 1.260 Partien (SE ≈ 1,4 Punkte), je Doktrin 1.024 (SE ≈ 1,6); k = 0.
 * quick: je Nation 420 (SE ≈ 2,4), je Doktrin 256 (SE ≈ 3,1); k = 2, fängt nur grobe Ausreißer (CI).
 */
const MODES = {
  full: { nationShards: [50000, 150000, 250000], nationPer: 14, docPer: 64, docSeed: 90000, docChunk: 1, k: 0 },
  quick: { nationShards: [50000], nationPer: 14, docPer: 16, docSeed: 90000, docChunk: 2, k: 2 },
};
const STRIDE = 10000;

/**
 * Kommandozeile lesen.
 * @returns {{mode:string, jobs:number, root:string|null, baseline:string|null, update:boolean, out:string, label:string|null}}
 */
function parseArgs() {
  const a = process.argv.slice(2), o = { mode: 'full', jobs: os.cpus().length, root: null, baseline: null, update: false, out: path.join(HERE, 'out'), label: null };
  for (let i = 0; i < a.length; i++) {
    const v = a[i];
    if (v === '--mode') o.mode = a[++i]; else if (v === '--jobs') o.jobs = Number(a[++i]);
    else if (v === '--root') o.root = path.resolve(a[++i]); else if (v === '--baseline') o.baseline = path.resolve(a[++i]);
    else if (v === '--update-baseline') o.update = true; else if (v === '--out') o.out = path.resolve(a[++i]);
    else if (v === '--label') o.label = a[++i]; else if (v === '--quick') o.mode = 'quick';
    else throw new Error('Unbekannte Option ' + v);
  }
  if (!MODES[o.mode]) throw new Error('Modus full|quick');
  return o;
}

/**
 * Einen Messprozess starten.
 * @param {string} script Skript in scripts/balance
 * @param {string[]} args Argumente
 * @param {Object<string,string>} env Zusatzumgebung
 * @returns {Promise<void>}
 */
function run(script, args, env) {
  return new Promise((res, rej) => {
    const p = spawn(process.execPath, [path.join(HERE, script)].concat(args), { env: Object.assign({}, process.env, env), stdio: ['ignore', 'ignore', 'pipe'] });
    let err = ''; p.stderr.on('data', (d) => { err += d; });
    p.on('exit', (c) => (c === 0 ? res() : rej(new Error(script + ' ' + args.join(' ') + ' rc=' + c + '\n' + err.slice(-2000)))));
  });
}

/**
 * Aufgaben mit begrenzter Parallelität abarbeiten.
 * @param {Array<function(): Promise<void>>} tasks
 * @param {number} n parallele Prozesse
 * @param {function(number, number): void} onDone Fortschritt
 * @returns {Promise<void>}
 */
async function pool(tasks, n, onDone) {
  let i = 0, done = 0;
  const worker = async () => { while (i < tasks.length) { const t = tasks[i++]; await t(); onDone(++done, tasks.length); } };
  await Promise.all(Array.from({ length: Math.max(1, Math.min(n, tasks.length)) }, worker));
}

/**
 * Standardfehler einer Quote.
 * @param {number} p Quote 0..1
 * @param {number} n Partien
 * @returns {number}
 */
const se = (p, n) => Math.sqrt(Math.max(p * (1 - p), 0.0625) / Math.max(1, n));

/**
 * Einen Messwert gegen Band und Ausnahmeliste prüfen.
 * @param {{kind:string,id:string,mode:string,rate:number,games:number}} it Messwert
 * @param {Array<Object>} allow Ausnahmeliste
 * @param {number} k Toleranz in SE
 * @returns {{status:'ok'|'watch'|'warn'|'fail', note:string, allow:Object|null}}
 */
function judge(it, allow, k) {
  const s = se(it.rate, it.games), tol = k * s;
  const outside = it.rate < BAND.lo - tol || it.rate > BAND.hi + tol;
  const a = allow.find((x) => x.kind === it.kind && x.id === it.id && (!x.modes || x.modes.includes(it.mode))) || null;
  if (!outside) {
    const watch = it.rate < BAND.watchLo || it.rate > BAND.watchHi;
    return { status: watch ? 'watch' : 'ok', note: a ? 'Ausnahme nicht mehr nötig (im Band)' : '', allow: a };
  }
  if (!a) return { status: 'fail', note: 'außerhalb 40–60 %', allow: null };
  const lo = a.min != null ? a.min - tol : -1, hi = a.max != null ? a.max + tol : 2;
  if (it.rate < lo || it.rate > hi) return { status: 'fail', note: 'außerhalb der erlaubten Ausnahme-Spanne ' + pct(a.min) + '–' + pct(a.max), allow: a };
  return { status: 'warn', note: 'bekannte Ausnahme: ' + a.reason + ' → Ziel: ' + a.target, allow: a };
}

const pct = (x) => (x == null ? '–' : (x * 100).toFixed(1).replace('.', ','));
const dlt = (x) => (x == null ? '' : (x >= 0 ? '+' : '−') + Math.abs(x * 100).toFixed(1).replace('.', ','));

/** Hauptablauf. @returns {Promise<number>} Exit-Code */
async function main() {
  const o = parseArgs(), M = MODES[o.mode], t0 = Date.now();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'dc-balance-gate-'));
  const env = o.root ? { SIM_ROOT: o.root } : {};
  const L = require((o.root || REPO) + '/scripts/nation_pools/load_game.js');
  const w = L.loadGame({ quiet: true });
  const docIds = w.DC_CATALOG.cards.filter((c) => c.typ === 'Doktrin').map((c) => c.id);
  const docName = Object.fromEntries(w.DC_CATALOG.cards.filter((c) => c.typ === 'Doktrin').map((c) => [c.id, c.name]));
  const label = o.label || ('v' + fs.readFileSync(path.join(o.root || REPO, 'Division_Command', 'VERSION'), 'utf8').trim());
  const tasks = [];
  for (const v of ['starter', 'mixed']) M.nationShards.forEach((seed, i) => tasks.push(() => run('sim_nations_t298.js', [v, String(M.nationPer)], Object.assign({ SIM_SEED: String(seed), SIM_OUT: tmp, SIM_TAG: 'g' + i }, env))));
  for (let i = 0; i < docIds.length; i += M.docChunk) {
    const ch = docIds.slice(i, i + M.docChunk), j = i;
    tasks.push(() => run('sim_doctrines_t298.js', [String(M.docPer)], Object.assign({ SIM_SEED: String(M.docSeed), SIM_DOC_SEED_STRIDE: String(STRIDE), SIM_DOCS: ch.join(','), SIM_OUT: tmp, SIM_TAG: 'c' + j }, env)));
  }
  process.stderr.write(`Balance-Gate ${o.mode} (${label}): ${tasks.length} Messprozesse, ${o.jobs} parallel\n`);
  await pool(tasks, o.jobs, (d, n) => process.stderr.write(`  ${d}/${n} fertig (${Math.round((Date.now() - t0) / 1000)} s)\n`));

  // zusammenführen
  const res = { label, mode: o.mode, date: new Date().toISOString(), sample: M, band: BAND, nations: {}, doctrines: {}, firstPlayer: {}, games: 0, errs: 0, forced: 0 };
  for (const v of ['starter', 'mixed']) {
    const acc = {}; let dec = 0, fw = 0;
    M.nationShards.forEach((_, i) => {
      const p = JSON.parse(fs.readFileSync(path.join(tmp, `sim_${v}_g${i}.json`), 'utf8'));
      res.games += p.games; res.errs += p.errs || 0; res.forced += p.forced || 0; dec += p.decided; fw += p.firstWinRate * p.decided;
      for (const [n, x] of Object.entries(p.nations)) { const a = acc[n] = acc[n] || { games: 0, w: 0 }; a.games += x.games; a.w += x.winRate * x.games; }
    });
    res.nations[v] = Object.fromEntries(Object.entries(acc).map(([n, a]) => [n, { games: a.games, rate: +(a.w / a.games).toFixed(4) }]));
    res.firstPlayer[v] = +(fw / dec).toFixed(4);
  }
  for (let i = 0; i < docIds.length; i += M.docChunk) {
    const p = JSON.parse(fs.readFileSync(path.join(tmp, `sim_doc_c${i}.json`), 'utf8'));
    for (const [id, x] of Object.entries(p)) { res.doctrines[id] = { name: x.name, games: x.games, rate: x.winRate }; res.games += x.games; }
  }
  fs.rmSync(tmp, { recursive: true, force: true });
  res.seconds = Math.round((Date.now() - t0) / 1000);

  // bewerten
  const allowFile = path.join(HERE, 'balance_allowlist.json');
  const allow = fs.existsSync(allowFile) ? JSON.parse(fs.readFileSync(allowFile, 'utf8')).entries || [] : [];
  const basePath = o.baseline || path.join(HERE, 'baseline', `balance_gate_${o.mode}.json`);
  const base = fs.existsSync(basePath) ? JSON.parse(fs.readFileSync(basePath, 'utf8')) : null;
  const items = [];
  for (const v of ['starter', 'mixed']) for (const [n, x] of Object.entries(res.nations[v])) items.push({ kind: 'nation', id: n, name: n, mode: v, rate: x.rate, games: x.games, base: base && base.nations[v] && base.nations[v][n] ? base.nations[v][n].rate : null });
  for (const [id, x] of Object.entries(res.doctrines)) items.push({ kind: 'doctrine', id, name: x.name || docName[id], mode: 'mirror', rate: x.rate, games: x.games, base: base && base.doctrines[id] ? base.doctrines[id].rate : null });
  items.forEach((it) => Object.assign(it, judge(it, allow, M.k)));
  res.items = items.map((it) => ({ kind: it.kind, id: it.id, mode: it.mode, rate: it.rate, games: it.games, se: +se(it.rate, it.games).toFixed(4), base: it.base, status: it.status, note: it.note }));
  const cnt = (s) => items.filter((x) => x.status === s).length;
  res.summary = { fail: cnt('fail'), warn: cnt('warn'), watch: cnt('watch'), ok: cnt('ok'), baseline: base ? base.label : null };

  // Bericht
  const icon = { ok: '', watch: '◦', warn: '⚠', fail: '✗' };
  const md = [`# Balance-Gate ${o.mode} – ${label}`, '', `Stand ${res.date} · ${res.games} Partien · ${res.seconds} s · Band 40–60 % (Toleranz ${M.k} SE) · Vergleich: ${base ? base.label + ' (' + path.relative(REPO, basePath) + ')' : 'kein Vergleichsstand'}`, '',
    `**Ergebnis: ${res.summary.fail ? 'ROT' : 'GRÜN'}** – ${res.summary.fail} Fehler, ${res.summary.warn} bekannte Ausnahmen, ${res.summary.watch} beobachten (40–45 / 55–60 %), ${res.summary.ok} im Kernband.`, '',
    `Startspieler: Starter ${pct(res.firstPlayer.starter)} %${base ? ' (' + dlt(res.firstPlayer.starter - base.firstPlayer.starter) + ')' : ''}, Misch ${pct(res.firstPlayer.mixed)} %${base ? ' (' + dlt(res.firstPlayer.mixed - base.firstPlayer.mixed) + ')' : ''}. Engine-Fehler ${res.errs}, erzwungene Zugenden ${res.forced}.`, ''];
  const tbl = (title, list) => { md.push(`## ${title}`, '', '| | Name | Quote % | ± SE | Vergleich | Δ | Hinweis |', '|---|---|---|---|---|---|---|');
    list.sort((a, b) => b.rate - a.rate).forEach((it) => md.push(`| ${icon[it.status]} | ${it.name} | ${pct(it.rate)} | ${pct(se(it.rate, it.games))} | ${pct(it.base)} | ${it.base == null ? '' : dlt(it.rate - it.base)} | ${it.note} |`)); md.push(''); };
  tbl('Nationen – Starterdecks', items.filter((x) => x.mode === 'starter'));
  tbl('Nationen – Mischdecks', items.filter((x) => x.mode === 'mixed'));
  tbl('Doktrinen – Spiegelmatch', items.filter((x) => x.kind === 'doctrine'));
  fs.mkdirSync(o.out, { recursive: true });
  fs.writeFileSync(path.join(o.out, `balance_gate_${o.mode}.json`), JSON.stringify(res, null, 1));
  fs.writeFileSync(path.join(o.out, `balance_gate_${o.mode}.md`), md.join('\n'));
  if (o.update) { const bp = path.join(HERE, 'baseline', `balance_gate_${o.mode}.json`); fs.mkdirSync(path.dirname(bp), { recursive: true }); const b = Object.assign({}, res); delete b.items; delete b.date; fs.writeFileSync(bp, JSON.stringify(b, null, 1) + '\n'); }
  console.log(md.slice(0, 7).join('\n'));
  items.filter((x) => x.status === 'fail' || x.status === 'warn').forEach((x) => console.log(`${x.status === 'fail' ? 'FEHLER' : 'WARNUNG'} ${x.kind} ${x.name} (${x.mode}) ${pct(x.rate)} %: ${x.note}`));
  console.log('Bericht: ' + path.relative(process.cwd(), path.join(o.out, `balance_gate_${o.mode}.md`)));
  return res.summary.fail ? 1 : 0;
}

module.exports = { judge, se, BAND, MODES };
if (require.main === module) main().then((c) => process.exit(c), (e) => { console.error(e && e.stack || e); process.exit(2); });
