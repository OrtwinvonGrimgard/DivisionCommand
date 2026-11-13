#!/usr/bin/env node
/**
 * t283: Funktionsdurchgang für Modi, die andere Browser-Tests nicht abdecken:
 * Hotseat (Start, Mulligan, Zugwechsel über mehrere Züge), Aufgeben → Endbildschirm (Rückblick),
 * Deckbau-Erzwingung 60 + 2 im Browser (DC_checkDeckForMatch), Versionsanzeige 0.6e.
 * Aufruf: npm run funcs-play   Umgebung: DC_FN_PORT, DC_FN_OUT. Exit-Code 1 bei Fehler; Bericht <OUT>/funcs_report.json
 */
import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const GAME = path.join(ROOT, 'Division_Command');
const PORT = Number(process.env.DC_FN_PORT || 19780);
const OUT = process.env.DC_FN_OUT || '/workspace/t283-funcs';
const BASE = 'http://127.0.0.1:' + PORT;
const rep = { ok: [], fail: [], pageerrors: [], console: [], shots: [] };
fs.mkdirSync(OUT, { recursive: true });
/** @param {number} ms */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
/** @param {string} w @param {unknown} e */
function fail(w, e) { const m = w + ': ' + (e && e.message ? e.message.split('\n')[0] : String(e)); rep.fail.push(m); console.log('FAIL', m); }
/** @param {string} w */
function ok(w) { rep.ok.push(w); console.log('ok', w); }
/** Wartet auf den HTTP-Server. @param {string} url */
function waitHttp(url) {
  const t0 = Date.now();
  return new Promise((res, rej) => { const t = () => http.get(url, (r) => { r.resume(); res(); }).on('error', () => (Date.now() - t0 > 20000 ? rej(new Error('server timeout')) : setTimeout(t, 250))); t(); });
}
/** Screenshot. @param {import('playwright').Page} page @param {string} n */
async function shot(page, n) { const f = path.join(OUT, n + '.png'); await page.screenshot({ path: f }); rep.shots.push(f); }
/** Bedient sichtbare Overlays (Münzwurf, Übergabe, Rückfragen) mit der ersten bestätigenden Schaltfläche. @param {import('playwright').Page} page */
async function clearOverlays(page) {
  for (let i = 0; i < 8; i++) {
    const did = await page.evaluate(() => {
      const vis = (b) => b && b.offsetParent !== null && !b.disabled;
      const c = document.getElementById('coin-start-ok'); if (vis(c)) { c.click(); return 'coin'; }
      const ov = document.getElementById('overlay');
      if (!ov || ov.style.display === 'none' || !ov.innerHTML.trim()) return null;
      const bs = [...ov.querySelectorAll('button')].filter(vis);
      const b = bs.find((x) => /confirm|ok|pass|weiter|bereit/i.test((x.id || '') + ' ' + x.textContent)) || bs.find((x) => !/Abbrechen|Zurück/i.test(x.textContent)) || bs[0];
      if (!b) return null; b.click(); return b.id || b.textContent.trim().slice(0, 20);
    });
    if (!did) return; await sleep(250);
  }
}
let srv;
async function main() {
  srv = spawn('python3', [path.join(GAME, 'server.py'), '--port', String(PORT)], { cwd: GAME, stdio: ['ignore', 'ignore', 'pipe'] });
  srv.stderr.on('data', () => {});
  await waitHttp(BASE + '/');
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => rep.pageerrors.push(String(e.message || e)));
  page.on('console', (m) => { if (m.type() === 'error') rep.console.push(m.text()); });
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForSelector('#go-start, #scr-title.on', { timeout: 20000 });
  if (await page.locator('#scr-boot.on #go-start').count()) await page.click('#go-start');
  await page.waitForSelector('#tut-skip, #scr-setup.on, #scr-title.on', { timeout: 15000 });
  if (await page.locator('#tut-skip').count()) { await page.click('#tut-skip'); await page.click('#tut-confirm .tut-leave', { timeout: 5000 }); }
  await page.waitForSelector('#scr-setup.on, #scr-title.on', { timeout: 15000 });
  if (await page.locator('#scr-setup.on').count()) { await page.fill('#setup-name', 'Test, Tester'); await page.click('#setup-ok'); }
  await page.waitForSelector('#scr-title.on', { timeout: 10000 });
  // Version
  try {
    const v = await page.evaluate(() => ({ v: window.DC_VERSION, t: document.title, d: (document.getElementById('dc-version') || {}).textContent }));
    if (v.v !== '0.6e' || !/0\.6e/.test(v.t)) throw new Error(JSON.stringify(v));
    ok('version 0.6e (' + v.t + ')');
  } catch (e) { fail('version', e); }
  // Deckbau-Erzwingung 60 + 2 (Browser-Katalog)
  try {
    const r = await page.evaluate(() => {
      const d = window.DC_NATION_DECKS.Steinmark;
      const good = DC_checkDeckForMatch(d.cards.slice(), d.doktrinen.slice());
      const short = DC_checkDeckForMatch(d.cards.slice(0, 59), d.doktrinen.slice());
      const oneDok = DC_checkDeckForMatch(d.cards.slice(), d.doktrinen.slice(0, 1));
      const many = DC_checkDeckForMatch(d.cards.slice(0, 55).concat(Array(5).fill(d.cards[0])), d.doktrinen.slice());
      return { good: good.ok, short: short.ok, oneDok: oneDok.ok, many: many.ok };
    });
    if (!r.good || r.short || r.oneDok || r.many) throw new Error(JSON.stringify(r));
    ok('Deck 60+2 und Kopienlimit erzwungen');
  } catch (e) { fail('deck60', e); }
  // Hotseat
  try {
    await page.click('#go-single'); await sleep(300);
    await page.selectOption('#mode', 'hotseat'); await sleep(200);
    await shot(page, 'fn_single_hotseat');
    await page.click('#btn-single-ready');
    await page.click('#btn-start', { timeout: 5000 });
    await page.waitForFunction(() => window.dcGetEngine && window.dcGetEngine() && window.dcGetEngine().state, null, { timeout: 15000 });
    await page.waitForSelector('#coin-start-ok', { state: 'visible', timeout: 25000 });
    await page.click('#coin-start-ok'); await sleep(600); await clearOverlays(page);
    const m0 = await page.evaluate(() => { const e = dcGetEngine(); const b = document.getElementById('btn-mulligan'); return { mode: e.state.mode, vis: b && !b.hidden && b.offsetParent !== null, hand: e.player(e.state.active).hand.length, ap: e.player(e.state.active).ap }; });
    if (!m0.vis) throw new Error('Mulligan-Knopf nicht sichtbar ' + JSON.stringify(m0));
    await page.click('#btn-mulligan'); await sleep(500); await clearOverlays(page);
    const m1 = await page.evaluate(() => { const e = dcGetEngine(); const p = e.player(e.state.active); return { hand: p.hand.length, ap: p.ap, done: !!(p.flags && p.flags.mulliganDone), btn: document.getElementById('btn-mulligan').hidden }; });
    if (m1.hand !== m0.hand || m1.ap !== m0.ap - 1 || !m1.btn) throw new Error('Mulligan ' + JSON.stringify([m0, m1]));
    ok('Hotseat-Start + Mulligan (Hand ' + m1.hand + ', AP ' + m0.ap + '→' + m1.ap + ')');
    await shot(page, 'fn_hotseat_mulligan');
    const seen = new Set();
    for (let i = 0; i < 6; i++) {
      await clearOverlays(page);
      const a = await page.evaluate(() => dcGetEngine().state.active); seen.add(a);
      await page.click('#btn-end', { timeout: 5000 }).catch(() => page.evaluate(() => document.getElementById('btn-end').click()));
      await sleep(500); await clearOverlays(page);
    }
    const st = await page.evaluate(() => ({ turn: dcGetEngine().state.turn, winner: dcGetEngine().state.winner }));
    if (seen.size < 2 || st.turn < 4) throw new Error('Zugwechsel ' + JSON.stringify({ seen: [...seen], st }));
    ok('Hotseat-Zugwechsel beide Seiten, Zug ' + st.turn);
    await shot(page, 'fn_hotseat_turn');
    // Aufgeben → Endbildschirm
    await page.evaluate(() => { const m = document.getElementById('hud-more'); if (m && m.tagName === 'DETAILS') m.open = true; });
    page.once('dialog', (d) => d.accept());
    await page.evaluate(() => document.getElementById('btn-concede').click());
    await sleep(800); await clearOverlays(page);
    await page.waitForSelector('#dc-end-screen', { timeout: 15000 });
    const es = await page.evaluate(() => document.getElementById('dc-end-screen').textContent.replace(/\s+/g, ' ').slice(0, 160));
    const head = await page.evaluate(() => (document.getElementById('dc-end-heading') || {}).textContent || '');
    if (!/^SIEGER: /.test(head)) throw new Error('Hotseat-Endbildschirm nicht neutral: ' + head); // t284
    ok('Aufgeben → Endbildschirm: ' + es.slice(0, 80));
    await shot(page, 'fn_endscreen');
  } catch (e) { fail('hotseat', e); await shot(page, 'fn_fail').catch(() => {}); }
  if (rep.pageerrors.length) fail('pageerrors', rep.pageerrors.join(' | '));
  await browser.close();
}
main().catch((e) => fail('main', e)).finally(() => {
  if (srv) srv.kill();
  fs.writeFileSync(path.join(OUT, 'funcs_report.json'), JSON.stringify(rep, null, 1));
  console.log(rep.fail.length ? 'FAIL funcs t283: ' + rep.fail.length : 'PASS funcs t283: ' + rep.ok.length + ' Prüfungen');
  process.exit(rep.fail.length ? 1 : 0);
});
