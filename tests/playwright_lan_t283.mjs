#!/usr/bin/env node
/**
 * t283: LAN mit zwei lokalen Clients (`npm run lan-play`). Ein server.py, zwei Browser-Kontexte (Host, Gast).
 * Prüft Lobby, Start, abwechselnde Züge per Bot-Vorschlag über das Netz, gleiche Sicht auf öffentliche Werte,
 * keine Host-Geheimnisse im Gast-Stand oder Gast-DOM, keine Seitenfehler. Bilder nach DC_LAN_OUT.
 * Umgebungsvariablen: DC_LAN_PORT (19760), DC_LAN_OUT (/workspace/t283-shots), DC_LAN_STEPS (40).
 */
import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GAME_DIR = path.join(path.resolve(__dirname, '..'), 'Division_Command');
const PORT = Number(process.env.DC_LAN_PORT || 19760);
const OUT = process.env.DC_LAN_OUT || '/workspace/t283-shots';
const STEPS = Number(process.env.DC_LAN_STEPS || 40);
const BASE = 'http://127.0.0.1:' + PORT;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const report = { ok: [], fail: [], errors: [], shots: [], turns: 0, actions: 0 };
/** @param {boolean} c @param {string} m */
const check = (c, m) => (c ? report.ok.push(m) : report.fail.push(m));

/** Wartet, bis der HTTP-Server antwortet. */
function waitHttp(url) {
  const t0 = Date.now();
  return new Promise((res, rej) => {
    const tick = () => http.get(url, (r) => { r.resume(); res(); }).on('error', () => (Date.now() - t0 > 20000 ? rej(new Error('server')) : setTimeout(tick, 200)));
    tick();
  });
}
/** Neuer Kontext mit vorbereitetem Benutzer, ohne Tutorial. */
async function client(browser, id, name) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 720 }, serviceWorkers: 'block' });
  await ctx.addInitScript((u) => {
    if (localStorage.getItem('dc_users')) return;
    localStorage.setItem('dc_users', JSON.stringify([u])); localStorage.setItem('dc_user_active', u.id);
    localStorage.setItem('dc_tutorial_done', '{"v":1,"how":"done"}');
  }, { id, name, face: 'f01', uniform: 'kampf', hat: 'none', rank: 'Fhr', facing: 'left' });
  const p = await ctx.newPage();
  p.on('pageerror', (e) => report.errors.push(name + ': ' + e.message + (report.errors.length ? '' : ' @ ' + String(e.stack || '').split('\n').slice(1, 4).join(' | '))));
  await p.goto(BASE + '/'); await p.waitForSelector('#scr-boot.on #go-start', { timeout: 20000 }); await sleep(2000);
  await p.click('#go-start'); await p.waitForSelector('#scr-title.on'); await sleep(500);
  await p.click('#go-lan'); await p.waitForSelector('#scr-lan.on'); await p.fill('#lan-name', name);
  return { ctx, p };
}
/** Öffentliche Kennzahlen eines Clients. */
const pub = (p) => p.evaluate(() => {
  const e = window.dcGetEngine && window.dcGetEngine(); const s = e && e.state;
  if (!s || !s.players) return null;
  return { turn: s.turn, active: s.active, winner: s.winner, ap: s.players.map((x) => x.ap), vp: s.players.map((x) => x.vp),
    hand: s.players.map((x) => x.hand.length), deck: s.players.map((x) => x.deck.length), grave: s.players.map((x) => x.grave.length) };
});

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const env = Object.assign({}, process.env, { DC_KEEP_ALIVE: '1' });
  const srv = spawn('python3', [path.join(GAME_DIR, 'server.py'), '--port', String(PORT)], { cwd: GAME_DIR, stdio: 'ignore', env });
  await waitHttp(BASE + '/');
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    const H = await client(browser, 'uh', 'Hostin');
    const G = await client(browser, 'ug', 'Gast');
    await H.p.click('#btn-lan-host'); await H.p.waitForSelector('#lan-room', { state: 'visible' });
    await G.p.click('#btn-lan-seek'); await G.p.fill('#join-ip', '127.0.0.1:' + PORT); await G.p.click('#btn-lan-connect');
    await G.p.waitForSelector('#btn-lan-ready', { state: 'visible', timeout: 10000 });
    await sleep(500); await G.p.click('#btn-lan-ready');
    await H.p.waitForFunction(() => !document.getElementById('btn-lan-start').disabled, null, { timeout: 10000 });
    check(true, 'Lobby: Host und Gast sitzen, Gast bereit');
    await H.p.click('#btn-lan-start');
    await G.p.waitForFunction(() => { const e = window.dcGetEngine && window.dcGetEngine(); return e && e.state && e.state.players; }, null, { timeout: 15000 });
    await sleep(1500);
    // Münzwurf-Dialog auf beiden Seiten bestätigen (wie ein Spieler)
    for (const pg of [H.p, G.p]) { for (let k = 0; k < 40; k++) { const b0 = await pg.$('#coin-start-ok'); if (b0 && await b0.isVisible()) { await b0.click(); break; } await sleep(250); } }
    await sleep(800);
    let a = await pub(H.p), b = await pub(G.p);
    check(a && b && JSON.stringify(a) === JSON.stringify(b), 'Start: Host und Gast sehen dieselben öffentlichen Werte');
    // t283 Mulligan über den Knopf: Startspieler im ersten Zug; ist das der Host, beendet er den Zug und der Gast nimmt ihn in Zug 2 (LAN-Weg).
    const mull = async (pg, who) => {
      const before = await pub(H.p);
      const vis = await pg.evaluate(() => { const b = document.getElementById('btn-mulligan'); return !!b && !b.hidden && b.offsetParent !== null; });
      if (!vis) return { vis, ok: false };
      await pg.waitForFunction(() => !document.getElementById('coin-start-ok'), null, { timeout: 15000 }).catch(() => {});
      await pg.locator('#overlay').waitFor({ state: 'hidden', timeout: 20000 }).catch(() => {});
      await pg.click('#btn-mulligan', { timeout: 15000 }); await sleep(900);
      const after = await pub(H.p); const after2 = await pub(pg);
      const hidden = await pg.evaluate(() => document.getElementById('btn-mulligan').hidden);
      return { vis, ok: after.ap[who] === before.ap[who] - 1 && after2.ap[who] === after.ap[who] && hidden };
    };
    if (a.active === 0) {
      const m0 = await mull(H.p, 0);
      check(m0.vis && m0.ok, 'Mulligan Host: Knopf sichtbar, −1 AP, danach verborgen');
      await H.p.evaluate(() => window.dcGetEngine().dispatch({ type: 'END_TURN', player: 0 })); await sleep(900);
    }
    const m1 = await mull(G.p, 1);
    check(m1.vis && m1.ok, 'Mulligan Gast über LAN: Knopf sichtbar, −1 AP auf Host und Gast, danach verborgen');
    const hv = await H.p.evaluate(() => { const b = document.getElementById('btn-mulligan'); return !!b && !b.hidden; });
    check(!hv, 'Host sieht keinen Mulligan-Knopf, solange der Gast am Zug ist');
    for (let i = 0; i < STEPS; i++) {
      const s = await pub(H.p); if (!s || s.winner != null) break;
      const pend = await H.p.evaluate(() => { const st = window.dcGetEngine().state; return st.pending && typeof st.pending.player === 'number' ? st.pending.player : null; });
      const who = pend != null ? pend : s.active;
      const page = who === 0 ? H.p : G.p;
      const res = await page.evaluate((pid) => {
        const e = window.dcGetEngine(); const fail = {};
        let act; try { act = window.DCBot.step(e, pid, fail); } catch (err) { act = null; }
        if (!act || act.type === 'RESOLVE_PENDING' && !e.state.pending) act = { type: 'END_TURN', player: pid };
        act.player = pid;
        try { const r = e.dispatch(act); return { ok: !!(r && r.ok !== false), type: act.type }; } catch (err) { return { ok: false, type: act.type, err: String(err.message || err) }; }
      }, who);
      report.actions++;
      await sleep(who === 1 ? 700 : 350);
      const hs = await pub(H.p);
      if (hs && hs.turn > report.turns) report.turns = hs.turn;
      if (res.type === 'END_TURN' && !res.ok) { await page.evaluate((pid) => window.dcGetEngine().dispatch({ type: 'END_TURN', player: pid }), who); await sleep(500); }
      if (i === 6) { await G.p.screenshot({ path: path.join(OUT, 'lan_gast_1280x720.png') }); report.shots.push('lan_gast_1280x720.png'); }
    }
    await sleep(1200);
    a = await pub(H.p); b = await pub(G.p);
    check(a && b && a.turn === b.turn && a.active === b.active && JSON.stringify(a.hand) === JSON.stringify(b.hand) && JSON.stringify(a.vp) === JSON.stringify(b.vp), 'Nach ' + report.actions + ' Aktionen: Zug, Handzahlen und SP gleich (Zug ' + (a && a.turn) + ')');
    check(report.turns >= 4, 'Partie läuft über mehrere Züge (' + report.turns + ')');
    const leak = await G.p.evaluate(() => {
      const s = window.dcGetEngine().state; const h = s.players[0];
      const hidden = h.hand.concat(h.deck).every((c) => c.cardId === 'dc_hidden');
      const fd = (h.support || []).filter((c) => c && c.facedown).every((c) => c.cardId === 'dc_hidden');
      return { hidden, fd };
    });
    check(leak.hidden && leak.fd, 'Gast-Stand: Hand, Deck und verdeckte Karten des Hosts sind Platzhalter');
    const names = await H.p.evaluate(() => { const e = window.dcGetEngine(); return e.state.players[0].hand.map((c) => e.defOf(c).name); });
    const gText = await G.p.evaluate(() => document.body.innerText);
    const shown = names.filter((n) => n && n.length > 5 && gText.includes(n) && !/Verdeckte Karte/.test(n));
    // Namen können legitim auch öffentlich sichtbar sein (gleiche Karte offen im Spiel/Friedhof) – dann nur Hinweis.
    const pubNames = await G.p.evaluate(() => { const e = window.dcGetEngine(); const out = []; e.state.players.forEach((p) => { (p.grave || []).concat(p.support || []).forEach((c) => c && c.cardId !== 'dc_hidden' && out.push(e.defOf(c).name)); ['L', 'C', 'R'].forEach((s) => (p.front[s] || []).forEach((c) => c && c.cardId !== 'dc_hidden' && out.push(e.defOf(c).name))); p.hand.forEach((c) => c.cardId !== 'dc_hidden' && out.push(e.defOf(c).name)); }); return out; });
    const realLeak = shown.filter((n) => !pubNames.includes(n));
    check(realLeak.length === 0, 'Gast-DOM nennt keine Handkarte des Hosts' + (realLeak.length ? ': ' + realLeak.join(', ') : ''));
    await H.p.screenshot({ path: path.join(OUT, 'lan_host_1280x720.png') }); report.shots.push('lan_host_1280x720.png');
    await H.ctx.close(); await G.ctx.close();
  } catch (e) {
    const lines = (e.message || String(e)).split('\n');
    report.fail.push('Ablauf: ' + lines[0] + ' | ' + lines.filter((l) => /intercepts|waiting for|not visible|not stable/.test(l)).slice(-3).join(' | '));
    try { for (const pg of browser.contexts().flatMap((c) => c.pages())) await pg.screenshot({ path: path.join(OUT, 'lan_fail_' + Math.random().toString(36).slice(2, 6) + '.png') }); } catch (eShot) { console.warn('shot', eShot.message); }
  } finally { await browser.close(); srv.kill(); }
  fs.writeFileSync(path.join(OUT, 'lan_report.json'), JSON.stringify(report, null, 2));
  report.fail.forEach((f) => console.log('FAIL ' + f));
  console.log(JSON.stringify({ ok: report.ok.length, fail: report.fail.length, errors: report.errors, turns: report.turns, actions: report.actions }));
  process.exit(report.fail.length || report.errors.length ? 1 : 0);
}
main();
