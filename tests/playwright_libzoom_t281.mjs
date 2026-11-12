#!/usr/bin/env node
/**
 * t281: Browserprüfung „Blättern in der großen Kartenansicht“ (`npm run libzoom-play`).
 * Bibliothek öffnen, Karte anklicken, mit Knopf und Pfeiltasten blättern, Enden, Filter (Reiter),
 * „Zum Deck hinzufügen“ auf der geblätterten Karte, Esc, Pfeiltasten im Suchfeld. Misst, dass die
 * Leiste unter dem Kartenbild im Fenster liegt und nichts überlappt. Bilder nach DC_ZOOM_OUT.
 * Umgebungsvariablen: DC_ZOOM_PORT (19700), DC_ZOOM_OUT (/workspace/t281-shots), DC_ZOOM_SIZES.
 */
import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GAME_DIR = path.join(path.resolve(__dirname, '..'), 'Division_Command');
const PORT = Number(process.env.DC_ZOOM_PORT || 19700);
const OUT = process.env.DC_ZOOM_OUT || '/workspace/t281-shots';
const SIZES = (process.env.DC_ZOOM_SIZES || '1024x576,1280x720,1920x1080').split(',').map((s) => s.split('x').map(Number));
const BASE = 'http://127.0.0.1:' + PORT;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const report = { ok: [], fail: [], errors: [], shots: [] };
const USER = { id: 'u1', name: 'Rekrut, Test', face: 'f01', uniform: 'kampf', hat: 'none', rank: 'Fhr', facing: 'left' };
/** @param {boolean} c @param {string} m */
const check = (c, m) => (c ? report.ok.push(m) : report.fail.push(m));

function waitHttp(url) {
  const t0 = Date.now();
  return new Promise((res, rej) => {
    const tick = () => http.get(url, (r) => { r.resume(); res(); }).on('error', () => (Date.now() - t0 > 20000 ? rej(new Error('server')) : setTimeout(tick, 200)));
    tick();
  });
}
/** Zustand der Ansicht im Browser. */
const state = (p) => p.evaluate(() => {
  const ov = document.getElementById('lib-zoom');
  const open = !!ov && ov.style.display !== 'none';
  const nav = ov && ov.querySelector('.zoom-nav');
  const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { l: b.left, t: b.top, r: b.right, b: b.bottom }; };
  return {
    open, id: window.DCLib.zoomId(), ids: window.DCLib.visibleIds(), pos: nav ? nav.querySelector('.zoom-pos').textContent : '',
    prevDis: nav ? nav.querySelector('.zoom-prev').disabled : null, nextDis: nav ? nav.querySelector('.zoom-next').disabled : null,
    name: open ? ov.querySelector('.info h3').textContent : '', nav: r(nav), hero: r(ov && ov.querySelector('.inspect-modal > .hero, .inspect-modal > .card-ph')),
    acts: r(ov && ov.querySelector('.acts')), vw: innerWidth, vh: innerHeight, draft: window.DCLib.draft(),
  };
});

async function run(browser, w, h) {
  const size = w + 'x' + h;
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' });
  await ctx.addInitScript((u) => {
    if (localStorage.getItem('dc_users')) return;
    localStorage.setItem('dc_users', JSON.stringify([u])); localStorage.setItem('dc_user_active', u.id);
    localStorage.setItem('dc_tutorial_done', '{"v":1,"how":"done"}');
  }, USER);
  const p = await ctx.newPage();
  p.on('pageerror', (e) => report.errors.push(size + ' ' + e.message));
  try {
    await p.goto(BASE + '/'); await p.waitForSelector('#scr-boot.on #go-start', { timeout: 20000 }); await sleep(2500);
    await p.click('#go-start'); await p.waitForSelector('#scr-title.on'); await sleep(600);
    await p.click('#go-library'); await p.waitForSelector('#lib-list .lib-card'); await sleep(1200);
    await p.locator('#lib-list .lib-card').first().click(); await p.waitForSelector('#lib-zoom .zoom-nav'); await sleep(500);
    let s = await state(p);
    check(s.open && s.id === s.ids[0] && s.pos === '1 / ' + s.ids.length && s.prevDis && !s.nextDis, size + ' geöffnet auf 1 / ' + s.ids.length + ', Zurück gesperrt');
    check(s.nav && s.hero && s.nav.t >= s.hero.b - 2 && s.nav.l >= s.hero.l - 2 && s.nav.r <= s.hero.r + 2, size + ' Leiste unter dem Kartenbild');
    check(s.nav && s.nav.b <= s.vh && s.nav.r <= s.vw && s.nav.l >= 0, size + ' Leiste im Fenster');
    await p.screenshot({ path: path.join(OUT, `zoom_erste_${size}.png`) }); report.shots.push(`zoom_erste_${size}.png`);
    const n0 = s.name;
    await p.click('#lib-zoom .zoom-next'); await sleep(350);
    s = await state(p);
    check(s.id === s.ids[1] && s.pos === '2 / ' + s.ids.length && s.name !== n0 && !s.prevDis, size + ' Weiter-Knopf → 2, Detail gewechselt');
    await p.keyboard.press('ArrowRight'); await sleep(300); s = await state(p);
    check(s.id === s.ids[2], size + ' Pfeil rechts → 3');
    await p.keyboard.press('ArrowLeft'); await sleep(300); s = await state(p);
    check(s.id === s.ids[1], size + ' Pfeil links → 2');
    await p.screenshot({ path: path.join(OUT, `zoom_geblaettert_${size}.png`) }); report.shots.push(`zoom_geblaettert_${size}.png`);
    await p.click('#lib-zoom [data-lib-add]'); await sleep(300); s = await state(p);
    const shown = s.id;
    check((s.draft.cards[shown] || (s.draft.doctrines.includes(shown) ? 1 : 0)) === 1 && /1 im Deck/.test(await p.textContent('#lib-zoom')), size + ' Zum Deck hinzufügen wirkt auf die gezeigte Karte');
    await p.click('#lib-zoom [data-lib-back]'); await sleep(250);
    await p.keyboard.press('Escape'); await sleep(300); s = await state(p);
    check(!s.open && (await p.isVisible('#scr-library.on')), size + ' Esc schließt nur die Ansicht');
    // Reiter-Filter: Panzer → Blättern bleibt in der gefilterten Liste, letzte Karte gesperrt
    const allN = (await state(p)).ids.length; await p.click('#lib-tabs [data-tab="Panzer"]');
    await sleep(700);
    const ids = (await state(p)).ids;
    await p.locator('#lib-list .lib-card').last().click(); await p.waitForSelector('#lib-zoom .zoom-nav', { timeout: 5000 }).catch(() => {}); await sleep(500);
    s = await state(p);
    check(ids.length > 1 && ids.length < allN && s.id === ids[ids.length - 1] && s.nextDis && s.pos === ids.length + ' / ' + ids.length, size + ' Filter: letzte von ' + ids.length + ', Weiter gesperrt');
    await p.keyboard.press('ArrowRight'); await sleep(250);
    check((await state(p)).id === ids[ids.length - 1], size + ' kein Umlauf am Ende');
    await p.screenshot({ path: path.join(OUT, `zoom_ende_${size}.png`) }); report.shots.push(`zoom_ende_${size}.png`);
    await p.keyboard.press('Escape'); await sleep(250);
    // Pfeiltasten im Suchfeld bleiben dem Feld
    await p.locator('#lib-list .lib-card').first().click(); await sleep(500);
    const before = (await state(p)).id;
    await p.evaluate(() => { const q = document.getElementById('lib-search'); q.focus(); q.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true })); });
    check((await state(p)).id === before, size + ' Pfeiltaste im Suchfeld blättert nicht');
  } catch (e) {
    report.fail.push(size + ' Ablauf: ' + (e.message || String(e)).split('\n')[0]);
    await p.screenshot({ path: path.join(OUT, `zoom_fehler_${size}.png`) }).catch(() => {});
  } finally { await ctx.close(); }
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const srv = spawn('python3', [path.join(GAME_DIR, 'server.py'), '--port', String(PORT)], { cwd: GAME_DIR, stdio: 'ignore' });
  await waitHttp(BASE + '/');
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  try { for (const [w, h] of SIZES) await run(browser, w, h); } finally { await browser.close(); srv.kill(); }
  fs.writeFileSync(path.join(OUT, 'libzoom_report.json'), JSON.stringify(report, null, 2));
  report.fail.forEach((f) => console.log('FAIL ' + f));
  console.log(JSON.stringify({ ok: report.ok.length, fail: report.fail.length, errors: report.errors }));
  process.exit(report.fail.length || report.errors.length ? 1 : 0);
}
main();
