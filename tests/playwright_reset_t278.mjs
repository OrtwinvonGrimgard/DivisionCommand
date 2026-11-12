#!/usr/bin/env node
/**
 * t278: Browser-Prüfung „Spielstand zurücksetzen“ (Playwright, nicht Teil von `npm test`).
 * Aufruf: node tests/playwright_reset_t278.mjs   (DC_RESET_PORT, DC_RESET_OUT=/workspace/t278-shots)
 *
 * Frisches Profil: Spiel starten → Tutorial überspringen → Offiziersakte → Hauptmenü, Playtest-DB anlegen →
 * Optionen › System → „Spielstand zurücksetzen“ → zweistufige Bestätigung → Neuladen auf den Startbildschirm →
 * kein dc_-Schlüssel, keine Playtest-DB → „Spiel starten“ öffnet wieder das Tutorial.
 * Zusätzlich: Knopf auf dem Startbildschirm öffnet denselben Dialog, „Abbrechen“ löscht nichts.
 */
import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GAME_DIR = path.join(path.resolve(__dirname, '..'), 'Division_Command');
const OUT = process.env.DC_RESET_OUT || '/workspace/t278-shots';
const PORT = Number(process.env.DC_RESET_PORT || 19278);
const BASE = 'http://127.0.0.1:' + PORT;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const report = { ok: [], fail: [], errors: [], shots: [] };

/**
 * @param {boolean} c
 * @param {string} msg
 */
function check(c, msg) { if (c) report.ok.push(msg); else { report.fail.push(msg); console.log('FAIL', msg); } }
/**
 * @param {string} url
 * @returns {Promise<void>}
 */
function waitHttp(url) {
  const t0 = Date.now();
  return new Promise((res, rej) => {
    const tick = () => http.get(url, (r) => { r.resume(); res(); }).on('error', () => (Date.now() - t0 > 20000 ? rej(new Error('server')) : setTimeout(tick, 200)));
    tick();
  });
}
/**
 * @param {import('playwright').Page} page
 * @param {string} name
 */
async function shot(page, name) { const p = path.join(OUT, name + '.png'); await page.screenshot({ path: p }); report.shots.push(p); }
/** @param {import('playwright').Page} page */
const dcKeys = (page) => page.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith('dc_')).sort());

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const srv = spawn('python3', [path.join(GAME_DIR, 'server.py'), '--port', String(PORT)], { cwd: GAME_DIR, stdio: 'ignore' });
  await waitHttp(BASE + '/');
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 }, serviceWorkers: 'block' });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => report.errors.push(e.message));
    await page.goto(BASE + '/');
    await page.waitForSelector('#scr-boot.on #go-start', { timeout: 20000 });
    await page.click('#go-start');
    await page.waitForSelector('#tut-skip', { timeout: 20000 });
    await page.click('#tut-skip');
    await page.click('#tut-confirm .tut-leave');
    await page.waitForSelector('#scr-setup.on', { timeout: 15000 });
    await page.fill('#setup-name', 'Alt, Offizier');
    await page.click('#setup-ok');
    await page.waitForSelector('#scr-title.on', { timeout: 10000 });
    await page.evaluate(async () => { await DCPlayStore.put('notes', { id: 'n1', text: 'Notiz' }); });
    const before = await dcKeys(page);
    check(before.includes('dc_users') && before.includes('dc_tutorial_done'), 'vorher: Benutzer und Tutorial-Merker gespeichert (' + before.join(',') + ')');
    // Optionen › System
    await page.click('#go-options');
    await page.click('.opt-tab[data-pane="opt-sys"]');
    await page.waitForSelector('#opt-reset', { state: 'visible' });
    await sleep(300);
    await shot(page, '01_optionen_system_knopf');
    await page.click('#opt-reset');
    await page.waitForSelector('#dc-reset .dc-reset-next', { state: 'visible' });
    await sleep(400);
    await shot(page, '02_bestaetigung_schritt1');
    await page.click('#dc-reset .dc-reset-next');
    await sleep(400);
    await shot(page, '03_bestaetigung_schritt2');
    await page.click('#dc-reset .dc-reset-go');
    await page.waitForSelector('#scr-boot.on #go-start', { timeout: 20000 });
    await sleep(800);
    const after = await dcKeys(page);
    check(!after.includes('dc_users') && !after.includes('dc_user_active') && !after.includes('dc_tutorial_done') && !after.includes('dc_decks'), 'nachher: keine Benutzer, Decks, Tutorial-Merker (' + after.join(',') + ')');
    const dbs = await page.evaluate(async () => (indexedDB.databases ? (await indexedDB.databases()).map((d) => d.name) : []));
    check(!dbs.includes('dc_playtest'), 'Playtest-Datenbank gelöscht (' + dbs.join(',') + ')');
    check(await page.evaluate(() => location.search === ''), 'Neu geladen auf den Startbildschirm');
    await shot(page, '04_startbildschirm_nach_reset');
    // Startbildschirm-Knopf: Dialog, Abbrechen löscht nichts
    await page.evaluate(() => localStorage.setItem('dc_probe', '1'));
    await page.click('#boot-reset');
    await page.waitForSelector('#dc-reset', { state: 'visible' });
    await page.click('#dc-reset [data-step="1"] .dc-reset-cancel');
    check(!(await page.locator('#dc-reset').count()) && (await page.evaluate(() => localStorage.getItem('dc_probe'))) === '1', 'Startbildschirm-Knopf: Abbrechen löscht nichts');
    await page.evaluate(() => localStorage.removeItem('dc_probe'));
    // Erststart wieder aktiv
    await page.click('#go-start');
    await page.waitForSelector('#tut-coach', { timeout: 20000 });
    await sleep(900);
    check(await page.evaluate(() => DCTutorial.status().step === 'intro'), 'Spiel starten öffnet wieder das Tutorial');
    await shot(page, '05_tutorial_nach_reset');
    await ctx.close();
  } catch (e) {
    check(false, 'Ablauf: ' + (e.message || e).split('\n')[0]);
  } finally {
    await browser.close();
    srv.kill();
  }
  if (report.errors.length) check(false, 'Seitenfehler: ' + report.errors.slice(0, 3).join(' | '));
  fs.writeFileSync(path.join(OUT, 'reset_report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ ok: report.ok.length, fail: report.fail, shots: report.shots }, null, 1));
  process.exit(report.fail.length ? 1 : 0);
}
main();
