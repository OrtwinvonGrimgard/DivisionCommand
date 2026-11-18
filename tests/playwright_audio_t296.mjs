#!/usr/bin/env node
/**
 * t296: Browser-Test gegen die Audio-Schleife am Spieltisch (Playwright + Chromium, nicht Teil von `npm test`).
 *
 * Aufruf von der Repo-Wurzel:  npm run audio-play
 * Umgebungsvariablen: DC_AUDIO_GAME_DIR (Spielordner, Standard Division_Command; zum Messen alter Staende),
 *                     DC_AUDIO_PORT (Port fuer server.py), DC_AUDIO_MS (Messdauer, Standard 3000),
 *                     DC_AUDIO_MAX (erlaubte Schreibzugriffe, Standard 20), DC_AUDIO_NOASSERT=1 (nur messen)
 * Prueft am Spieltisch (Partie laeuft, Musik an):
 *  - `localStorage.setItem` fuer `dc_music`/`dc_vol` (Schreiben von `applyAudio`) bleibt klein,
 *  - die Medien-Ereignisse `canplay`/`seeked` auf dem Titel-Audio (`#bgm`) schaukeln sich nicht auf,
 *  - Timer laufen puenktlich (Ereignisschleife nicht belastet).
 * Exit-Code 1 bei Verstoss. Bericht: stdout (JSON).
 */
import { chromium } from 'playwright';
import { spawn } from 'child_process';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GAME_DIR = process.env.DC_AUDIO_GAME_DIR || path.join(path.resolve(__dirname, '..'), 'Division_Command');
const PORT = Number(process.env.DC_AUDIO_PORT || (20100 + Math.floor(Math.random() * 150)));
const BASE = 'http://127.0.0.1:' + PORT;
const MS = Number(process.env.DC_AUDIO_MS || 3000);
const MAX = Number(process.env.DC_AUDIO_MAX || 20);
let srv = null;

/** @param {string} url */
function waitHttp(url) {
  const t0 = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => http.get(url, (res) => { res.resume(); resolve(); }).on('error', () => { if (Date.now() - t0 > 20000) reject(new Error('server timeout')); else setTimeout(tick, 200); });
    tick();
  });
}

/**
 * Misst im Seitenkontext Schreibzugriffe, Medien-Ereignisse und Timer-Verzug ueber `ms` Millisekunden.
 * @param {import('playwright').Page} page
 * @param {number} ms
 * @returns {Promise<{writes:number, music:number, vol:number, canplay:number, seeked:number, maxLagMs:number, secs:number}>}
 */
async function measure(page, ms) {
  return page.evaluate((ms) => new Promise((resolve) => {
    const w = window.__dcAudioProbe;
    const bgm = document.getElementById('bgm');
    const base = { music: w.music, vol: w.vol, writes: w.writes, canplay: w.canplay, seeked: w.seeked };
    let maxLag = 0; let last = performance.now(); const t0 = last;
    const id = setInterval(() => { const n = performance.now(); maxLag = Math.max(maxLag, n - last - 50); last = n; }, 50);
    setTimeout(() => {
      clearInterval(id);
      const secs = (performance.now() - t0) / 1000;
      const battle = document.getElementById('bgm-battle');
      resolve({ battlePaused: battle ? battle.paused : null, battleSrc: battle ? battle.getAttribute('src') || '' : null, writes: w.writes - base.writes, music: w.music - base.music, vol: w.vol - base.vol, canplay: w.canplay - base.canplay, seeked: w.seeked - base.seeked, maxLagMs: Math.round(maxLag), secs: Math.round(secs * 100) / 100, bgmPaused: bgm ? bgm.paused : null });
    }, ms);
  }), ms);
}

async function main() {
  srv = spawn('python3', [path.join(GAME_DIR, 'server.py'), '--port', String(PORT)], { cwd: GAME_DIR, stdio: ['ignore', 'ignore', 'pipe'] });
  srv.stderr.on('data', () => {});
  await waitHttp(BASE + '/');
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  let code = 0;
  try {
    const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 }, serviceWorkers: 'block' });
    await ctx.addInitScript(() => {
      let x = 296; Math.random = function () { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; return x / 4294967296; };
      if (!localStorage.getItem('dc_users')) {
        localStorage.setItem('dc_users', JSON.stringify([{ id: 'u1', name: 'Rekrut, Test', face: 'f01', uniform: 'kampf', hat: 'none', rank: 'Fhr', facing: 'left' }]));
        localStorage.setItem('dc_user_active', 'u1');
        localStorage.setItem('dc_tutorial_done', '{"v":1,"how":"done"}');
        localStorage.setItem('dc_fly', '50'); localStorage.setItem('dc_dialog', '400');
      }
      // Messfuehler: zaehlt Schreibzugriffe auf die Audio-Einstellungen und Medienereignisse des Titel-Audios.
      const probe = { writes: 0, music: 0, vol: 0, canplay: 0, seeked: 0 };
      window.__dcAudioProbe = probe;
      const orig = Storage.prototype.setItem;
      Storage.prototype.setItem = function (k, v) {
        if (k === 'dc_music') { probe.music++; probe.writes++; }
        if (k === 'dc_vol') { probe.vol++; probe.writes++; }
        return orig.call(this, k, v);
      };
      document.addEventListener('DOMContentLoaded', () => {
        const b = document.getElementById('bgm');
        if (b) { b.addEventListener('canplay', () => probe.canplay++); b.addEventListener('seeked', () => probe.seeked++); }
      });
    });
    const page = await ctx.newPage();
    await page.goto(BASE + '/');
    await page.waitForSelector('#scr-boot.on #go-start', { timeout: 20000 });
    await page.click('#go-start');
    await page.waitForSelector('#scr-title.on', { timeout: 15000 });
    const menu = await measure(page, MS);
    await page.click('#go-single');
    await page.click('#btn-single-ready');
    await page.click('#btn-start', { timeout: 5000 });
    await page.waitForSelector('#coin-start-ok', { state: 'visible', timeout: 30000 });
    await page.click('#coin-start-ok');
    // Tisch erst messen, wenn der Einstieg (Ausblenden der Titelmusik, "Der Krieg hat begonnen") vorbei ist.
    await page.waitForFunction(() => window.dcGetEngine && window.dcGetEngine() && document.getElementById('title-root').classList.contains('dc-off') && !window.dcTimerHold, null, { timeout: 60000 });
    const table = await measure(page, MS);
    // Einstellung aendern muss weiterhin genau einmal schreiben (kein Verhaltensverlust).
    const before = await page.evaluate(() => ({ m: localStorage.getItem('dc_music'), v: localStorage.getItem('dc_vol') }));
    await page.evaluate(() => { const v = document.getElementById('opt-vol'); v.value = '33'; v.dispatchEvent(new Event('input', { bubbles: true })); });
    await page.waitForTimeout(500);
    const after = await page.evaluate(() => ({ m: localStorage.getItem('dc_music'), v: localStorage.getItem('dc_vol') }));
    const out = { version: await page.evaluate(() => window.DC_VERSION), menu, table, perSecTable: Math.round(table.writes / table.secs), perSecMenu: Math.round(menu.writes / menu.secs), before, after };
    console.log(JSON.stringify(out));
    if (process.env.DC_AUDIO_NOASSERT !== '1') {
      const errs = [];
      const cap = Math.ceil(MAX * MS / 3000);
      if (table.writes > cap) errs.push('Tisch: ' + table.writes + ' Schreibzugriffe in ' + table.secs + ' s (erlaubt ' + cap + ')');
      if (menu.writes > cap) errs.push('Menue: ' + menu.writes + ' Schreibzugriffe (erlaubt ' + cap + ')');
      if (table.seeked > cap) errs.push('Tisch: ' + table.seeked + ' seeked-Ereignisse auf #bgm');
      if (table.maxLagMs > 400) errs.push('Timer-Verzug ' + table.maxLagMs + ' ms');
      // Verhalten der Musik bleibt: am Tisch ist die Titelmusik aus und ein Kampfstueck eingestellt.
      if (table.bgmPaused !== true) errs.push('Tisch: Titelmusik laeuft noch');
      if (!table.battleSrc) errs.push('Tisch: kein Kampfstueck eingestellt');
      if (table.battlePaused !== false) errs.push('Tisch: Kampfstueck laeuft nicht');
      if (after.v !== '33') errs.push('Lautstaerke 33 nicht gespeichert: ' + after.v);
      if (errs.length) { errs.forEach((e) => console.log('FAIL', e)); code = 1; } else console.log('OK audio-play');
    }
  } catch (e) { console.log('FAIL', e && e.message ? e.message.split('\n')[0] : String(e)); code = 1; }
  await browser.close().catch(() => {});
  if (srv) srv.kill();
  process.exit(code);
}
main();
