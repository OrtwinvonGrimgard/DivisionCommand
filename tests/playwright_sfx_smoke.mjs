#!/usr/bin/env node
/**
 * Playwright-Smoke für Soundeffekte (braucht Browser).
 * Aufruf von der Repo-Wurzel.
 */
import { chromium } from 'playwright';
import { spawn } from 'child_process';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SERVER = path.join(ROOT, 'Division_Command', 'server.py');
const BASE = process.env.DC_BASE || 'http://127.0.0.1:8765';

const report = { ok: [], fail: [], console: [], pageerrors: [], failed404: [], sfxLog: [] };
let srv = null;

/**
 * Wartet, bis der lokale HTTP-Server auf dem Port antwortet.
 */
function waitHttp(url, ms = 25000) {
  const t0 = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      http.get(url, (res) => { res.resume(); resolve(true); }).on('error', () => {
        if (Date.now() - t0 > ms) reject(new Error('server timeout'));
        else setTimeout(tick, 250);
      });
    };
    tick();
  });
}

/**
 * Startet bei Bedarf den lokalen Spielserver und wartet auf Bereitschaft.
 */
async function ensureServer() {
  try { await waitHttp(BASE + '/', 1200); report.ok.push('server:up'); return; } catch (_) {}
  srv = spawn('python3', [SERVER, '--port', '8765'], {
    cwd: path.dirname(SERVER), stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, PYTHONUNBUFFERED: '1' },
  });
  await waitHttp(BASE + '/');
  report.ok.push('server:started');
}

/**
 * Schließt störende Overlays (Hilfe, Hinweise), damit der Screenshot sauber ist.
 */
async function dismissOverlays(page) {
  await page.evaluate(() => {
    const ov = document.getElementById('overlay');
    if (ov && ov.style.display !== 'none') {
      const btn = ov.querySelector('#cw-ok, #end-ok, button.primary, button');
      if (btn) btn.click();
    }
  });
}

/**
 * Playwright-Smoke: startet den Server, spielt Kernaktionen und prüft SFX-Hooks.
 */
async function main() {
  await ensureServer();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') report.console.push(msg.text().slice(0, 400));
  });
  page.on('pageerror', (err) => {
    report.pageerrors.push(String(err.message || err).slice(0, 400));
  });
  page.on('response', (res) => {
    const u = res.url();
    if (/\/assets\/sfx\//i.test(u) && res.status() >= 400) {
      report.failed404.push({ url: u.replace(BASE, ''), status: res.status() });
    }
  });

  // Stub heavy art/music; keep sfx. Fulfill (not abort) avoids spurious pageerrors.
  const EMPTY_PNG = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
    'base64'
  );
  await page.route('**/*.{png,jpg,jpeg,webp,wav}', async (route) => {
    const u = route.request().url();
    if (/assets\/cards|thumbs/i.test(u) && /\.(png|jpg|jpeg|webp)$/i.test(u)) {
      return route.fulfill({ status: 200, contentType: 'image/png', body: EMPTY_PNG });
    }
    if (/assets\/audio/i.test(u) && /\.wav$/i.test(u)) {
      return route.fulfill({ status: 200, contentType: 'audio/wav', body: Buffer.alloc(44) });
    }
    return route.continue();
  });

  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(700);

  for (let i = 0; i < 8; i++) {
    const clicked = await page.evaluate(() => {
      const boot = document.querySelector('#scr-boot.on');
      const setup = document.querySelector('#scr-setup.on');
      const btn = (boot || setup) && (boot || setup).querySelector('button');
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (!clicked) break;
    await page.waitForTimeout(200);
  }

  await page.evaluate(() => { window.__DC_SFX_LOG = []; });

  await page.locator('#go-single').click({ timeout: 8000, force: true }).catch(() => {});
  await page.waitForTimeout(300);

  await page.evaluate(() => {
    const mode = document.getElementById('mode');
    if (mode) {
      mode.value = 'bot';
      mode.dispatchEvent(new Event('change', { bubbles: true }));
    }
    const ready = document.getElementById('btn-single-ready');
    if (ready) {
      ready.dataset.on = '0';
      ready.click();
    }
    const st = document.getElementById('btn-start');
    if (st) st.disabled = false;
  });
  await page.waitForTimeout(150);
  await page.locator('#btn-start').click({ timeout: 5000, force: true }).catch(async () => {
    await page.evaluate(() => { if (window.dcStart) window.dcStart(); });
  });
  await page.waitForTimeout(800);

  for (let i = 0; i < 12; i++) {
    await dismissOverlays(page);
    await page.waitForTimeout(200);
  }

  const inGame = await page.evaluate(() => {
    const eng = window.dcGetEngine && window.dcGetEngine();
    return !!(eng && eng.state && document.getElementById('hand'));
  });
  report.ok.push('inGame:' + inGame);
  if (!inGame) report.fail.push('not-in-game');

  const probe = await page.evaluate(() => {
    const out = { ok: true, played: [], err: null, sfxCount: 0 };
    try {
      if (!window.DCAudio) { out.ok = false; out.err = 'no DCAudio'; return out; }
      out.sfxCount = (DCAudio.sfx || []).length;
      window.__DC_SFX_LOG = window.__DC_SFX_LOG || [];
      const samples = [
        ['select', { tags: ['infanterie'], typ: 'Einheit' }],
        ['select', { tags: ['panzer'], typ: 'Einheit' }],
        ['deploy', { tags: ['infanterie'], typ: 'Einheit' }],
        ['deploy', { tags: ['panzer'], typ: 'Einheit' }],
        ['deploy', { tags: ['artillerie'], typ: 'Einheit' }],
        ['deploy', { tags: ['aufklaerung'], typ: 'Einheit' }],
        ['deploy', { tags: ['elite', 'infanterie'], typ: 'Elite' }],
        ['deploy', { tags: ['unterstuetzung'], typ: 'Unterstützung' }],
        ['deploy', { tags: ['einsatz'], typ: 'Soforteinsatz' }],
        ['deploy', { tags: ['ausruestung'], typ: 'Ausrüstung' }],
        ['deploy', { tags: ['doktrin'], typ: 'Doktrin' }],
        ['deploy', { name: 'Minenfeld', tags: ['befestigung'], typ: 'Token' }],
        ['attack', { tags: ['infanterie'], typ: 'Einheit' }],
        ['attack', { tags: ['panzer'], typ: 'Einheit' }],
        ['attack', { tags: ['artillerie'], typ: 'Einheit' }],
        ['attack', { tags: ['aufklaerung'], typ: 'Einheit' }],
        ['attack', { tags: ['elite', 'infanterie'], typ: 'Elite' }],
        ['death', { tags: ['infanterie'], typ: 'Einheit' }],
        ['death', { tags: ['panzer'], typ: 'Einheit' }],
      ];
      samples.forEach(([k, d]) => DCAudio.playForCard(k, d));
      DCAudio.playSfx('draw');
      DCAudio.playSfx('turn');
      DCAudio.playSfx('coin');
      DCAudio.playSfx('trophy');
      DCAudio.playSfx('mine');
      DCAudio.playSfx('this-missing-should-be-silent');
      DCAudio.playEvent({ kind: 'destroy', _def: { tags: ['infanterie'] } });
      DCAudio.playEvent({ kind: 'draw' });
      DCAudio.notifyGameEnd(true);
      out.played = (window.__DC_SFX_LOG || []).map((x) => x.id);
    } catch (e) {
      out.ok = false;
      out.err = String(e);
    }
    return out;
  });
  report.probe = probe;
  if (!probe.ok) report.fail.push('probe:' + probe.err);
  else report.ok.push('probe:sfx=' + probe.sfxCount + ':played=' + probe.played.length);
  if (probe.sfxCount < 90) report.fail.push('sfx-catalog-too-small:' + probe.sfxCount);

  if (inGame) {
    for (let t = 0; t < 5; t++) {
      await page.evaluate(() => {
        const card = document.querySelector('#hand .card');
        if (card) card.click();
      });
      await page.waitForTimeout(250);
      await page.evaluate(() => {
        const slot = document.querySelector('.slot.can-drop, .drop-ok, [data-drop], .front .slot');
        if (slot) slot.click();
        document.querySelectorAll('.drop-mark, .hl').forEach((el, i) => { if (i === 0) el.click(); });
      });
      await page.waitForTimeout(300);
      await dismissOverlays(page);
      await page.evaluate(() => {
        const btns = [...document.querySelectorAll('button')];
        const b = btns.find((x) => /zugende|ende|fertig/i.test(x.textContent || '')) ||
          document.querySelector('#btn-end, #end-turn');
        if (b) b.click();
      });
      await page.waitForTimeout(400);
      await dismissOverlays(page);
      await page.waitForTimeout(900);
      await dismissOverlays(page);
    }
  }

  const sfxLog = await page.evaluate(() => window.__DC_SFX_LOG || []);
  report.sfxLog = sfxLog.slice(0, 100);
  report.ok.push('sfxCalls:' + sfxLog.length);
  if (sfxLog.length < 5) report.fail.push('too-few-sfx:' + sfxLog.length);

  const badConsole = report.console.filter((t) =>
    !/net::ERR_ABORTED|net::ERR_FAILED|Failed to load resource/i.test(t) &&
    !/AudioContext|play\(\).*user.*gesture|NotAllowedError|The play\(\) request was interrupted/i.test(t)
  );
  const badPage = report.pageerrors.filter((t) =>
    !/Unexpected end of input|EncodingError|NotSupportedError|Failed to load because no supported source/i.test(t)
  );
  if (report.failed404.length) report.fail.push('sfx404:' + JSON.stringify(report.failed404.slice(0, 5)));
  if (badPage.length) report.fail.push('pageerrors:' + badPage.slice(0, 3).join(' | '));
  if (badConsole.length) report.fail.push('console:' + badConsole.slice(0, 3).join(' | '));

  await browser.close();
  if (srv) try { srv.kill(); } catch (_) {}

  fs.writeFileSync('/workspace/sfx_smoke_report.json', JSON.stringify(report, null, 2));
  const unique = [...new Set(sfxLog.map((x) => x.id))];
  console.log(JSON.stringify({
    ok: report.fail.length === 0,
    fails: report.fail,
    sfxCalls: sfxLog.length,
    uniqueIds: unique.slice(0, 50),
    probePlayed: (probe.played || []).slice(0, 40),
    sfxCount: probe.sfxCount,
    pageerrorsKept: badPage.slice(0, 5),
    consoleKept: badConsole.slice(0, 5),
    sfx404: report.failed404.slice(0, 8),
  }, null, 2));
  process.exit(report.fail.length ? 1 : 0);
}

main().catch((e) => {
  console.error(e);
  if (srv) try { srv.kill(); } catch (_) {}
  process.exit(2);
});
