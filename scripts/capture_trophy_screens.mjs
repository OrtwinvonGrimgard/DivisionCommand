/**
 * Headless bot-vs-bot trophy match → mid/end HTML fixtures → PNG screenshots.
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';
import { spawnSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../Division_Command/web');
const OUT = '/workspace';

function loadInto(context, rel) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), context, { filename: rel });
}
const sandbox = {
  console, setTimeout, clearTimeout, setInterval, clearInterval,
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
  'js/version.js',
  'js/data/sets/types/doktrinen.js', 'js/data/sets/types/tokens.js',
  'js/data/sets/types/infanterie.js', 'js/data/sets/types/panzer.js',
  'js/data/sets/types/artillerie.js', 'js/data/sets/types/aufklaerung.js',
  'js/data/sets/types/elite.js', 'js/data/sets/types/unterstuetzung.js',
  'js/data/sets/types/soforteinsatz.js', 'js/data/sets/types/ausruestung.js', 'js/data/sets/types/nation_pools.js',
  'js/data/decks.js', 'js/data/catalog.js',
  'js/engine/engine.js', 'js/engine/victory_trophy.js', 'js/engine/doctrine_runtime.js', 'js/ai/bot.js',
]) loadInto(ctx, s);

const { DCEngine, DCBot, DC_CATALOG, DC_NATION_DECKS } = ctx;
DCBot.applyCfg({ model: 'test', delayMs: 0, aggression: 70, holdAp: 0, allowAttack: 1 });

function nationDeck(nat) {
  const d = DC_NATION_DECKS[nat];
  return { cards: (d.cards || []).slice(), doctrines: (d.doktrinen || []).slice(0, 2), name: d.name || nat };
}

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
  if (act.type === 'RESOLVE_PENDING' && pend) {
    if (pend.kind === 'react-window') return { type: 'REACT_PASS', player: pid };
    if (pend.kind === 'geist-window') return { type: 'GEIST_PASS', player: pid };
    if (pend.kind === 'sam') return { type: 'SAM_PASS', player: pid };
  }
  return act;
}

function snap(eng) {
  const need = eng._trophyVpToWin();
  const players = [0, 1].map((pid) => {
    const p = eng.player(pid);
    const prog = p.trophy && p.trophy.doctrineProg || {};
    return {
      name: p.name,
      vp: p.vp || 0,
      ap: p.ap || 0,
      doctrines: Object.keys(prog).map((id) => ({
        id, name: prog[id].name || id,
        cur: prog[id].cur, need: prog[id].need, done: !!prog[id].done, label: prog[id].label || '',
      })),
    };
  });
  return {
    turn: eng.state.turn,
    winner: eng.state.winner,
    endReason: eng.state.endReason,
    need,
    players,
  };
}

function playUntilDone(seed) {
  const nats = Object.keys(DC_NATION_DECKS);
  const nat0 = nats[seed % nats.length];
  const nat1 = nats[(seed + 3) % nats.length];
  const d0 = nationDeck(nat0);
  const d1 = nationDeck(nat1);
  const eng = new DCEngine.Engine(DC_CATALOG, { seed, rules: Object.assign({}, DC_CATALOG.rules) });
  eng.createMatch({
    seed, mode: 'bot',
    deck0: d0.cards, deck1: d1.cards,
    doctrine0: d0.doctrines, doctrine1: d1.doctrines,
    name0: d0.name, name1: d1.name,
  });
  if (!eng._trophyActive()) throw new Error('trophy not active with default rules');

  const fail = {};
  let steps = 0, stuck = 0, mid = null;
  const MAX = 900;
  while (eng.state.winner == null && steps < MAX) {
    const act = botAct(eng, fail);
    let res;
    try { res = eng.dispatch(act); } catch (err) { res = { ok: false }; }
    if (!res || !res.ok) {
      fail[DCBot.actKey(act)] = 1;
      stuck += 1;
      if (stuck > 40) {
        try { eng.dispatch({ type: 'END_TURN', player: eng.state.active }); stuck = 0; Object.keys(fail).forEach((k) => delete fail[k]); }
        catch (e2) { break; }
      }
    } else {
      stuck = 0;
      Object.keys(fail).forEach((k) => delete fail[k]);
    }
    steps += 1;
    const s = snap(eng);
    const hasDokProg = s.players.some((p) => p.doctrines.some((d) => d.cur > 0));
    const hasVp = s.players.some((p) => p.vp > 0);
    if (!mid && s.turn >= 6 && (hasVp || hasDokProg)) mid = s;
  }
  if (eng.state.winner == null) {
    const a = eng.player(0), b = eng.player(1);
    if (a.vp !== b.vp) eng._end(a.vp > b.vp ? 0 : 1, 'timeout-SP');
    else {
      const fa = eng.frontList(a).length, fb = eng.frontList(b).length;
      if (fa !== fb) eng._end(fa > fb ? 0 : 1, 'timeout-Brett');
      else eng._end(null, 'timeout');
    }
  }
  const end = snap(eng);
  if (!mid) mid = end;
  return { mid, end, steps, seed, nat0, nat1 };
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

function reasonLabel(raw) {
  const reasonRaw = String(raw || '');
  if (/Siegpunkte|Trophy/i.test(reasonRaw)) return 'Siegpunkte';
  if (/Keine Front/i.test(reasonRaw)) return 'Sicherheitsnetz — keine Front';
  if (/Zuglimit/i.test(reasonRaw)) return 'Zug 28 Wertung';
  if (/Aufgabe/i.test(reasonRaw)) return 'Aufgabe';
  if (/Frieden|unentschieden/i.test(reasonRaw)) return 'Weißer Frieden';
  if (/timeout-SP/i.test(reasonRaw)) return 'Zeitlimit (SP)';
  if (/timeout-Brett/i.test(reasonRaw)) return 'Zeitlimit (Brett)';
  return reasonRaw || 'Ende';
}

function cssHref() {
  return 'file://' + path.join(ROOT, 'css/app.css');
}

function midHtml(s) {
  const p0 = s.players[0], p1 = s.players[1];
  const dokCards = (p) => p.doctrines.map((d) => {
    const cls = d.done ? ' dok-vp-done' : '';
    return `<div class="dok-card" style="display:inline-block;margin:8px;padding:10px 12px;border:1px solid #445;border-radius:8px;min-width:160px;background:#1a2230;color:#e8eef8">
      <div style="font-weight:600;margin-bottom:6px">${esc(d.name)}</div>
      <div class="dok-vp${cls}" title="${esc(d.label)}">SP ${d.cur}/${d.need}${d.done ? ' ✓' : ''}</div>
      <div class="tiny" style="opacity:.75;margin-top:4px;font-size:11px">${esc(d.label)}</div>
    </div>`;
  }).join('');
  return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${cssHref()}">
<style>
body{margin:0;background:#0d121a;color:#e8eef8;font-family:system-ui,sans-serif}
.wrap{padding:24px}
.hud{display:flex;gap:16px;justify-content:space-between;margin-bottom:20px}
.badge{background:#243044;padding:10px 14px;border-radius:8px;font-size:15px}
.dok-vp{display:inline-block;background:#2a4a6a;padding:3px 8px;border-radius:4px;font-size:12px}
.dok-vp-done{background:#2a6a3a}
h1{font-size:18px;margin:0 0 12px}
</style></head><body><div class="wrap">
<h1>Division Command — Zug ${s.turn} · Trophy SP</h1>
<div class="hud">
  <div class="badge" id="ap0">${esc(p0.name)} · ${p0.ap} AP · SP ${p0.vp}/${s.need}</div>
  <div class="badge" id="ap1">${esc(p1.name)} · ${p1.ap} AP · SP ${p1.vp}/${s.need}</div>
</div>
<h2 style="font-size:15px;opacity:.85">Doktrin-Ziele</h2>
<div>${dokCards(p0)}${dokCards(p1)}</div>
</div></body></html>`;
}

function endHtml(s) {
  const p0 = s.players[0], p1 = s.players[1];
  const label = reasonLabel(s.endReason);
  const who = s.winner == null ? 'Unentschieden.' : (esc(s.players[s.winner].name) + ' gewinnt.');
  const detail = (s.endReason && String(s.endReason) !== label) ? `<p class="tiny">${esc(s.endReason)}</p>` : '';
  return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="${cssHref()}">
<style>
body{margin:0;background:#0d121a;color:#e8eef8;font-family:system-ui,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center}
.modal{background:#1a2230;border:1px solid #3a4a60;border-radius:12px;padding:28px 32px;min-width:320px;text-align:center;box-shadow:0 12px 40px rgba(0,0,0,.45)}
.modal h2{margin:0 0 10px;font-size:1.6rem}
.end-who{font-size:1.15rem;margin:8px 0}
.end-vp{margin-top:10px;opacity:.9}
button.primary{margin-top:16px;padding:10px 18px;border-radius:8px;border:0;background:#3b82f6;color:#fff;font-weight:600}
</style></head><body>
<div class="overlay" id="overlay" style="display:flex">
  <div class="modal end-modal">
    <h2>${esc(label)}</h2>
    <p class="end-who">${who}</p>
    ${detail}
    <p class="tiny end-vp">SP ${esc(p0.name)}: <strong>${p0.vp}</strong> · ${esc(p1.name)}: <strong>${p1.vp}</strong></p>
    <button type="button" class="primary" id="again">Neue Partie</button>
  </div>
</div>
</body></html>`;
}

let result = null;
for (let seed = 100; seed < 200; seed++) {
  const r = playUntilDone(seed);
  const hasDok = r.mid.players.some((p) => p.doctrines.some((d) => d.cur > 0));
  const hasVp = r.mid.players.some((p) => p.vp > 0) || r.end.players.some((p) => p.vp > 0);
  if (r.end.winner != null && (hasDok || hasVp)) {
    result = r;
    console.log('match seed', seed, 'steps', r.steps, 'turn', r.end.turn, 'reason', r.end.endReason, 'vp', r.end.players.map(p=>p.vp), 'midDok', hasDok);
    break;
  }
}
if (!result) {
  result = playUntilDone(42);
  console.log('fallback seed 42', result.end.endReason, result.end.players.map(p=>p.vp));
}

const tmp = path.join(OUT, '.trophy_shots');
fs.mkdirSync(tmp, { recursive: true });
const midPath = path.join(tmp, 'mid.html');
const endPath = path.join(tmp, 'end.html');
fs.writeFileSync(midPath, midHtml(result.mid));
fs.writeFileSync(endPath, endHtml(result.end));
fs.writeFileSync(path.join(tmp, 'match.json'), JSON.stringify(result, null, 2));

function shot(html, png) {
  const r = spawnSync('google-chrome', [
    '--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
    `--window-size=1280,800`,
    `--screenshot=${png}`,
    'file://' + html,
  ], { encoding: 'utf8', timeout: 60000 });
  if (r.status !== 0) {
    console.error(r.stderr || r.stdout);
    throw new Error('chrome screenshot failed for ' + png);
  }
  console.log('wrote', png, fs.statSync(png).size, 'bytes');
}

shot(midPath, path.join(OUT, 'vp_mid.png'));
shot(endPath, path.join(OUT, 'vp_end.png'));
console.log('DONE');
