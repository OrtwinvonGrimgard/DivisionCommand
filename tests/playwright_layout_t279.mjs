#!/usr/bin/env node
/**
 * t279: Layout-Prüfung des Spieltisches (Playwright, nicht Teil von `npm test`; `npm run layout-test`).
 *
 * Misst bei 1024×576, 1280×720, 1366×768, 1600×900, 1920×1080 und 2560×1440 die Bounding-Boxen aller
 * HUD-Bausteine (Kopfleiste, Plaketten, Stapel, Doktrinen, Zonen-Beschriftungen, Zonen, Hand, Befehlsspalte,
 * Protokoll, Versionshinweis) und meldet
 *  - Überlappungen zwischen Bausteinen, die nicht ineinander verschachtelt sind,
 *  - Bausteine, die aus dem Fenster ragen,
 *  - abgeschnittenen Text (scrollWidth > clientWidth bei verstecktem Überlauf).
 * Lagen: normale Partie (eigener Zug), Gegnerzug, Tutorial (Spotlight-Schritt) und Feindkontakt (Tutorial).
 *
 * Umgebungsvariablen:
 *   DC_LAYOUT_MODE  'test' (Standard: Fehler → Exit 1) oder 'audit' (nur Bericht)
 *   DC_LAYOUT_OUT   Ordner für Screenshots/Bericht (Standard /workspace/t279-shots)
 *   DC_LAYOUT_PREFIX Dateipräfix der Screenshots (Standard 'after')
 *   DC_LAYOUT_PORT  Port für server.py (Standard 19280)
 *   DC_LAYOUT_SIZES optional, z. B. "1280x720,1920x1080"
 */
import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GAME_DIR = path.join(path.resolve(__dirname, '..'), 'Division_Command');
const MODE = process.env.DC_LAYOUT_MODE || 'test';
const OUT = process.env.DC_LAYOUT_OUT || '/workspace/t279-shots';
const PREFIX = process.env.DC_LAYOUT_PREFIX || 'after';
const PORT = Number(process.env.DC_LAYOUT_PORT || 19280);
const BASE = 'http://127.0.0.1:' + PORT;
const SIZES = (process.env.DC_LAYOUT_SIZES || '1024x576,1280x720,1366x768,1600x900,1920x1080,2560x1440')
  .split(',').map((s) => s.split('x').map(Number));
const SHOT_SIZES = new Set(['1024x576', '1280x720', '1920x1080']);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const report = { problems: [], scenes: [], errors: [], shots: [] };

/** HUD-Bausteine: [Name, Selektor]. Mehrfachtreffer werden einzeln geprüft. */
const PARTS = [
  ['Titel', '#app .topbar h1'], ['Zuganzeige', '#turnmeta'], ['Musiktitel', '#nowplay'], ['Plakette ich', '#ap0'], ['Plakette Gegner', '#ap1'],
  ['Name Gegner', '#plate-enemy'], ['Stapel Gegner', '#enemy-piles'], ['Doktrinen Gegner', '#enemy-doctrine'],
  ['Label Support Gegner', '#enemy-support-label'], ['Support Gegner', '#enemy-support'], ['Label Front Gegner', '#enemy-front-label'],
  ['Front Gegner', '#enemy-front'], ['Label NML Gegner', '#enemy-nml-label'], ['NML Gegner', '#enemy-nml'], ['NML ich', '#my-nml'],
  ['Label NML ich', '#my-nml-label'], ['Label Front ich', '#my-front-label'], ['Front ich', '#my-front'], ['Label Support ich', '#my-support-label'],
  ['Support ich', '#my-support'], ['Doktrinen ich', '#my-doctrine'], ['Hand', '#hand .card'], ['Stapel ich', '#my-piles'], ['Name ich', '#plate-me'],
  ['Befehlsspalte', '#app .table-side .panel'], ['Protokoll', '#log-win'], ['Version', '#dc-version'],
];

/**
 * Misst im Browser alle Bausteine und findet Überlappungen, Randüberstand und abgeschnittenen Text.
 * @param {Array<[string,string]>} parts
 * @returns {{problems: string[], boxes: object[]}}
 */
function probe(parts) {
  const vw = innerWidth, vh = innerHeight;
  const boxes = [];
  const visible = (el) => {
    for (let p = el; p; p = p.parentElement) { const c = getComputedStyle(p); if (c.display === 'none' || c.visibility === 'hidden' || Number(c.opacity) === 0) return false; }
    const r = el.getBoundingClientRect();
    return r.width > 2 && r.height > 2;
  };
  for (const [name, sel] of parts) {
    document.querySelectorAll(sel).forEach((el, i) => {
      if (!visible(el)) return;
      const r = el.getBoundingClientRect();
      boxes.push({ name: name + (i ? ' #' + (i + 1) : ''), el, x: r.left, y: r.top, r: r.right, b: r.bottom });
    });
  }
  /** Liegt el außerhalb des sichtbaren Bereichs eines scrollbaren Vorfahren? */
  const scrolledAway = (el, r) => {
    for (let p = el.parentElement; p; p = p.parentElement) {
      const c = getComputedStyle(p);
      if (!/(auto|scroll)/.test(c.overflowY + c.overflowX)) continue;
      const pr = p.getBoundingClientRect();
      if (r.bottom > pr.bottom + 1 || r.top < pr.top - 1 || r.right > pr.right + 1 || r.left < pr.left - 1) return true;
    }
    return false;
  };
  const problems = [];
  const tol = 1.5;
  for (let i = 0; i < boxes.length; i++) {
    const a = boxes[i];
    if (a.x < -tol || a.y < -tol || a.r > vw + tol || a.b > vh + tol) problems.push(`ragt aus dem Fenster: ${a.name} [${Math.round(a.x)},${Math.round(a.y)} – ${Math.round(a.r)},${Math.round(a.b)}]`);
    for (let j = i + 1; j < boxes.length; j++) {
      const b = boxes[j];
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
      if (a.name.startsWith('Hand') && b.name.startsWith('Hand')) continue; // Fächer der Hand darf sich überdecken
      const ox = Math.min(a.r, b.r) - Math.max(a.x, b.x);
      const oy = Math.min(a.b, b.b) - Math.max(a.y, b.y);
      if (ox > tol && oy > tol) problems.push(`Überlappung: ${a.name} ↔ ${b.name} (${Math.round(ox)}×${Math.round(oy)} px)`);
    }
  }
  const seen = new Set();
  for (const bx of boxes) {
    const els = [bx.el, ...bx.el.querySelectorAll('*')];
    for (const el of els) {
      if (seen.has(el) || !visible(el)) continue;
      seen.add(el);
      const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (!own) continue;
      const cs = getComputedStyle(el);
      // t283: Knöpfe zählen als abgeschnitten, sobald der Inhalt breiter ist (vorher fiel „Frieden anbieten“ durch).
      const hidesX = cs.overflowX !== 'visible' || cs.textOverflow === 'ellipsis' || el.tagName === 'BUTTON' || el.closest('button') != null;
      if ((hidesX && el.scrollWidth > el.clientWidth + 1) || (cs.overflowY === 'hidden' && el.scrollHeight > el.clientHeight + 2)) {
        problems.push(`Text abgeschnitten: ${bx.name} „${el.textContent.trim().slice(0, 40)}“ (${el.scrollWidth}/${el.clientWidth} px)`);
      }
      const r = el.getBoundingClientRect();
      if (scrolledAway(el, r)) continue; // in einer Scrollfläche (z. B. Protokoll) weggescrollt – erreichbar, nicht abgeschnitten
      if (r.top < -1 || r.left < -1 || r.right > vw + 1 || r.bottom > vh + 1) problems.push(`Text außerhalb: ${bx.name} „${el.textContent.trim().slice(0, 40)}“`);
    }
  }
  return { problems, boxes: boxes.map((b) => ({ name: b.name, x: Math.round(b.x), y: Math.round(b.y), w: Math.round(b.r - b.x), h: Math.round(b.b - b.y) })) };
}

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
 * Wartet, bis keine Meldung läuft.
 * @param {import('playwright').Page} page
 */
async function calm(page) {
  await page.waitForFunction(() => !(window.dcEventBusy && window.dcEventBusy()), null, { timeout: 30000 }).catch(() => {});
  await sleep(500);
}
/**
 * Misst eine Lage und hält Probleme fest; macht bei ausgewählten Größen einen Screenshot.
 * @param {import('playwright').Page} page
 * @param {string} scene
 * @param {string} size
 */
async function measure(page, scene, size) {
  await page.mouse.move(2, 2);
  await sleep(250);
  const res = await page.evaluate(probe, PARTS);
  // t283: „Weitere Befehle“ kurz aufklappen und die Knöpfe auf abgeschnittenen Text prüfen.
  const more = await page.evaluate(() => {
    const d = document.getElementById('hud-more'); if (!d) return [];
    const was = d.open; d.open = true;
    const out = [...d.querySelectorAll('button')].filter((b) => b.offsetParent && b.scrollWidth > b.clientWidth + 1).map((b) => `Knopf abgeschnitten: „${b.textContent.trim()}“ (${b.scrollWidth}/${b.clientWidth} px)`);
    d.open = was; return out;
  });
  res.problems.push(...more);
  report.scenes.push({ scene, size, problems: res.problems, boxes: res.boxes });
  res.problems.forEach((p) => report.problems.push(`${size} ${scene}: ${p}`));
  if (SHOT_SIZES.has(size)) {
    const p = path.join(OUT, `${PREFIX}_${scene}_${size}.png`);
    await page.screenshot({ path: p });
    report.shots.push(p);
  }
}
/**
 * Neues Profil mit Benutzer, Tutorial als erledigt markiert, im Hauptmenü.
 * @param {import('playwright').Browser} browser
 * @param {number} w
 * @param {number} h
 * @returns {Promise<{ctx: import('playwright').BrowserContext, page: import('playwright').Page}>}
 */
async function freshMenu(browser, w, h) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' });
  await ctx.addInitScript(() => {
    if (!localStorage.getItem('dc_users')) {
      localStorage.setItem('dc_users', JSON.stringify([{ id: 'u1', name: 'Rekrut, Test', face: 'f01', uniform: 'kampf', hat: 'none', rank: 'Fhr', facing: 'left' }]));
      localStorage.setItem('dc_user_active', 'u1');
      localStorage.setItem('dc_tutorial_done', '{"v":1,"how":"done"}');
    }
  });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => report.errors.push(e.message));
  await page.goto(BASE + '/');
  await page.waitForSelector('#scr-boot.on #go-start', { timeout: 20000 });
  await page.click('#go-start');
  await page.waitForSelector('#scr-title.on', { timeout: 15000 });
  return { ctx, page };
}
/**
 * Führt das Tutorial bis zum Schritt `want` (Info: Weiter; Handlung: Lösungsweg über die Oberflächen-Schnittstelle).
 * @param {import('playwright').Page} tp
 * @param {string} want
 */
async function tutToStep(tp, want) {
  const deadline = Date.now() + 120000;
  for (let g = 0; g < 80; g++) {
    const st = await tp.evaluate(() => DCTutorial.status());
    if (Date.now() > deadline) throw new Error('Tutorial hängt bei Schritt ' + st.step + (st.waiting ? ' (wartet)' : '') + ' auf dem Weg zu ' + want);
    if (st.step === want && !st.waiting) return;
    if (st.waiting) { await sleep(300); continue; }
    const kind = await tp.evaluate((id) => DCTutorialScenario.STEPS.find((s) => s.id === id).kind, st.step);
    if (kind === 'info') { await tp.click('#tut-coach .tut-next'); await sleep(250); continue; }
    if (kind === 'watch') { await sleep(400); continue; }
    await tp.evaluate((id) => {
      const e = window.dcGetEngine(); const S = window.DCTutorialScenario; const C = S.CARDS;
      const find = (pid, cid) => { const p = e.player(pid); const all = [...p.hand, ...p.deck, ...['L', 'C', 'R'].flatMap((s) => p.front[s] || [])]; const c = all.find((x) => x && x.cardId === cid); return c && c.uid; };
      const u = { recruit: find(0, C.recruit), cover: find(0, C.cover), kitchen: find(0, C.kitchen), push: find(0, C.push), strap: find(0, C.strap), vet: find(0, C.vet), art: find(0, C.art), foeA: find(1, C.foeA), foeB: find(1, C.foeB), elite: find(1, C.elite) };
      for (const a of S.STEPS.find((s) => s.id === id).solve(e, { u })) window.dcDispatch(a);
    }, st.step);
    await tp.waitForFunction((id) => DCTutorial.status().step !== id, st.step, { timeout: 15000 }).catch(() => {});
  }
}

/**
 * Misst alle Lagen bei einer Fenstergröße: Partie (eigener Zug, Gegnerzug) und Tutorial (Einsatz, Feindkontakt).
 * @param {import('playwright').Browser} browser
 * @param {number} w
 * @param {number} h
 */
async function runSize(browser, w, h) {
  const size = w + 'x' + h;
  const { ctx, page } = await freshMenu(browser, w, h);
  try {
    await page.click('#go-single');
    await page.click('#btn-single-ready');
    await page.click('#btn-start', { timeout: 5000 });
    await page.waitForSelector('#coin-start-ok', { state: 'visible', timeout: 30000 });
    await page.click('#coin-start-ok');
    await sleep(6500); // Countdown „Der Krieg hat begonnen“
    await calm(page);
    const mine = await page.evaluate(() => window.dcGetEngine().state.active === window.dcGetYou());
    await measure(page, mine ? 'partie_eigenerzug' : 'partie_gegnerzug', size);
    if (mine) {
      await page.click('#btn-end').catch(() => {});
      await sleep(400);
      const ok = page.locator('#end-ok');
      if (await ok.count()) await ok.click().catch(() => {});
      // Gegnerzug messen, sobald keine Ereignis-Meldung den Tisch verdeckt (sonst nach 12 s trotzdem).
      await page.waitForFunction(() => {
        const eng = window.dcGetEngine && window.dcGetEngine();
        const ov = document.getElementById('overlay');
        return eng && eng.state.active !== window.dcGetYou() && !(window.dcEventBusy && window.dcEventBusy()) &&
          (!ov || getComputedStyle(ov).display === 'none');
      }, null, { timeout: 12000, polling: 40 }).catch(() => {});
      await measure(page, 'partie_gegnerzug', size);
    }
  } catch (e) {
    await page.screenshot({ path: path.join(OUT, PREFIX + '_fehler_' + size + '.png') }).catch(() => {});
    throw e;
  } finally {
    await ctx.close();
  }
  const t = await browser.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' });
  const tp = await t.newPage();
  tp.on('pageerror', (e) => report.errors.push(e.message));
  try {
    await tp.goto(BASE + '/');
    await tp.waitForSelector('#scr-boot.on #go-start', { timeout: 20000 });
    await tp.click('#go-start');
    await tp.waitForSelector('#tut-coach', { timeout: 20000 });
    await tutToStep(tp, 'deploy');
    await sleep(700);
    await measure(tp, 'tutorial', size);
    await tutToStep(tp, 'react');
    await tp.waitForSelector('#overlay [data-react]', { timeout: 20000 }).catch(() => {});
    await sleep(700);
    await measure(tp, 'feindkontakt', size);
  } catch (e) {
    await tp.screenshot({ path: path.join(OUT, PREFIX + '_fehler_tutorial_' + size + '.png') }).catch(() => {});
    throw e;
  } finally {
    await t.close();
  }
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const srv = spawn('python3', [path.join(GAME_DIR, 'server.py'), '--port', String(PORT)], { cwd: GAME_DIR, stdio: 'ignore' });
  await waitHttp(BASE + '/');
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    for (const [w, h] of SIZES) {
      const size = w + 'x' + h;
      for (let attempt = 1; attempt <= 2; attempt++) {
        console.log('== ' + size + ' ' + new Date().toTimeString().slice(0, 8) + (attempt > 1 ? ' (2. Versuch)' : ''));
        // Ergebnisse eines abgebrochenen Versuchs verwerfen
        report.scenes = report.scenes.filter((x) => x.size !== size);
        report.problems = report.problems.filter((x) => !x.startsWith(size + ' '));
        report.shots = report.shots.filter((x) => !x.includes('_' + size + '.png'));
        try { await runSize(browser, w, h); break; } catch (e) {
          const msg = 'Ablauf ' + size + ': ' + (e.message || String(e)).split('\n')[0];
          console.log(msg);
          if (attempt === 2) report.errors.push(msg);
        }
      }
    }
  } finally {
    await browser.close();
    srv.kill();
  }
  fs.writeFileSync(path.join(OUT, PREFIX + '_layout_report.json'), JSON.stringify(report, null, 2));
  const uniq = [...new Set(report.problems)];
  console.log(uniq.join('\n'));
  console.log(JSON.stringify({ mode: MODE, problems: uniq.length, errors: report.errors, shots: report.shots.length }));
  process.exit(MODE === 'test' && (uniq.length || report.errors.length) ? 1 : 0);
}
main();
