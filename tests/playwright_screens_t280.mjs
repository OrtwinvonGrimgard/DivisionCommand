#!/usr/bin/env node
/**
 * t280: Layout-Prüfung aller Bildschirme außerhalb des Tisches (Playwright; `npm run screens-test`).
 *
 * Besucht Start, Tutorial-Einstieg, Offiziersakte, Hauptmenü, Einzelspieler (+ Bot-Dialog), LAN (Suche),
 * Bibliothek/Deckbau (+ Tag-Filter, große Kartenansicht), Hilfe (Regeln), Benutzer, Playtest-Panel,
 * Optionen (alle 4 Reiter, Rückfrage „Spielstand zurücksetzen“), Rückfrage „Speicher löschen“, sowie in der
 * Partie: Optionen im Spiel, Kartenansicht, Endbildschirm nach Aufgabe und die 2,5D-Ansicht.
 * Je Bildschirm werden die sichtbaren Bedienelemente und Texte (Knöpfe, Eingaben, Überschriften, Absätze,
 * Beschriftungen) gemessen und gemeldet:
 *  - Überlappungen zwischen nicht verschachtelten Elementen,
 *  - Elemente außerhalb des Fensters (außer in Scrollflächen),
 *  - abgeschnittener Text (Überlauf versteckt bzw. Ellipse),
 *  - Knöpfe ohne Text/Titel und Schrift kleiner als 10 px.
 *
 * Umgebungsvariablen: DC_SCR_MODE test|audit, DC_SCR_OUT (Standard /workspace/t280-shots), DC_SCR_PREFIX
 * (Standard 'after'), DC_SCR_PORT (19380), DC_SCR_SIZES (Standard "1024x576,1280x720,1920x1080"),
 * DC_SCR_ONLY (Komma-Liste von Szenennamen).
 */
import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GAME_DIR = path.join(path.resolve(__dirname, '..'), 'Division_Command');
const MODE = process.env.DC_SCR_MODE || 'test';
const OUT = process.env.DC_SCR_OUT || '/workspace/t280-shots';
const PREFIX = process.env.DC_SCR_PREFIX || 'after';
const PORT = Number(process.env.DC_SCR_PORT || 19380);
const BASE = 'http://127.0.0.1:' + PORT;
const SIZES = (process.env.DC_SCR_SIZES || '1024x576,1280x720,1920x1080').split(',').map((s) => s.split('x').map(Number));
const ONLY = process.env.DC_SCR_ONLY ? new Set(process.env.DC_SCR_ONLY.split(',')) : null;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const report = { problems: [], scenes: [], errors: [], shots: [] };
const USER = { id: 'u1', name: 'Rekrut, Test', face: 'f01', uniform: 'kampf', hat: 'none', rank: 'Fhr', facing: 'left' };

/**
 * Misst im Browser die sichtbaren Bedienelemente und Texte.
 * @param {string} rootSel Wurzel der Messung (z. B. aktiver Bildschirm oder Dialog)
 * @returns {{problems: string[], count: number}}
 */
function probe(rootSel) {
  const vw = innerWidth, vh = innerHeight, tol = 1.5;
  const roots = [...document.querySelectorAll(rootSel)];
  const SEL = 'button, input:not([type=hidden]), select, textarea, summary, h1, h2, h3, h4, p, label, .tiny, [role=tab], .lib-tab, .deck-head, .page-title';
  const visible = (el) => {
    for (let p = el; p; p = p.parentElement) {
      const c = getComputedStyle(p);
      if (c.display === 'none' || c.visibility === 'hidden' || Number(c.opacity) < 0.05) return false;
    }
    const r = el.getBoundingClientRect();
    return r.width > 2 && r.height > 2;
  };
  /** Scrollvorfahr, in dessen sichtbarem Bereich el nicht liegt → wegscrollbar, kein Fehler. */
  const scrollClip = (el, r) => {
    for (let p = el.parentElement; p; p = p.parentElement) {
      const c = getComputedStyle(p);
      if (!/(auto|scroll)/.test(c.overflowY + c.overflowX)) continue;
      const pr = p.getBoundingClientRect();
      if (r.bottom > pr.bottom + 1 || r.top < pr.top - 1 || r.right > pr.right + 1 || r.left < pr.left - 1) return true;
    }
    return false;
  };
  /** Nächster Vorfahr mit position: sticky (klebende Leiste in einem Scrollbereich). */
  const stickyOf = (el) => {
    for (let p = el; p; p = p.parentElement) if (getComputedStyle(p).position === 'sticky') return p;
    return null;
  };
  const POPOVER = '.lib-tag-panel, [data-popover]';
  const name = (el) => {
    const t = (el.getAttribute('aria-label') || el.textContent || el.placeholder || el.id || el.tagName).trim().replace(/\s+/g, ' ').slice(0, 32);
    return el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + ' „' + t + '“';
  };
  const els = [];
  roots.forEach((root) => {
    if (!visible(root)) return;
    root.querySelectorAll(SEL).forEach((el) => { if (visible(el) && !els.includes(el)) els.push(el); });
  });
  const problems = [];
  const boxes = els.map((el) => ({ el, r: el.getBoundingClientRect() }));
  for (const { el, r } of boxes) {
    const clipped = scrollClip(el, r);
    if (!clipped && (r.left < -tol || r.top < -tol || r.right > vw + tol || r.bottom > vh + tol)) {
      problems.push(`außerhalb: ${name(el)} [${Math.round(r.left)},${Math.round(r.top)} – ${Math.round(r.right)},${Math.round(r.bottom)}]`);
    }
    const cs = getComputedStyle(el);
    const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (own && el.tagName !== 'SELECT' && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') {
      // t283: Knöpfe zählen als abgeschnitten, sobald der Inhalt breiter ist (vorher fiel „Frieden anbieten“ durch).
      const hidesX = cs.overflowX !== 'visible' || cs.textOverflow === 'ellipsis' || el.tagName === 'BUTTON' || el.closest('button') != null;
      if ((hidesX && el.scrollWidth > el.clientWidth + 1) || (cs.overflowY === 'hidden' && el.scrollHeight > el.clientHeight + 2)) {
        problems.push(`abgeschnitten: ${name(el)} (${el.scrollWidth}/${el.clientWidth})`);
      }
      if (parseFloat(cs.fontSize) < 10 && !clipped) problems.push(`Schrift ${cs.fontSize}: ${name(el)}`);
    }
    if (el.tagName === 'BUTTON' && !el.textContent.trim() && !el.title && !el.getAttribute('aria-label')) problems.push(`Knopf ohne Text: ${name(el)}`);
  }
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const a = boxes[i], b = boxes[j];
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
      if (a.el.closest('label') && a.el.closest('label') === b.el.closest('label')) continue; // Beschriftung + Feld
      // Inhalt, der unter einer klebenden Kopf-/Aktionsleiste durchscrollt, ist kein Layoutfehler
      if (!!stickyOf(a.el) !== !!stickyOf(b.el)) continue;
      // Aufklappmenüs (Tag-Filter) liegen absichtlich über der Liste
      if (!!a.el.closest(POPOVER) !== !!b.el.closest(POPOVER)) continue;
      const ox = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
      const oy = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
      if (ox > tol && oy > tol && !scrollClip(a.el, a.r) && !scrollClip(b.el, b.r)) {
        problems.push(`Überlappung: ${name(a.el)} ↔ ${name(b.el)} (${Math.round(ox)}×${Math.round(oy)})`);
      }
    }
  }
  // Hauptaktion: Hat die Ansicht Zurück- oder Hauptknöpfe, muss mindestens einer ganz im Bild sein
  const actions = boxes.filter(({ el }) => el.tagName === 'BUTTON' && (el.classList.contains('back') || el.classList.contains('primary')));
  if (actions.length && !actions.some(({ r }) => r.left >= -tol && r.top >= -tol && r.right <= vw + tol && r.bottom <= vh + tol)) {
    problems.push('Hauptaktion nicht sichtbar: ' + actions.map(({ el }) => name(el)).slice(0, 3).join(', '));
  }
  return { problems, count: els.length };
}

function waitHttp(url) {
  const t0 = Date.now();
  return new Promise((res, rej) => {
    const tick = () => http.get(url, (r) => { r.resume(); res(); }).on('error', () => (Date.now() - t0 > 20000 ? rej(new Error('server')) : setTimeout(tick, 200)));
    tick();
  });
}

/**
 * Neuer Kontext; optional mit angelegtem Benutzer und erledigtem Tutorial.
 * @returns {Promise<{ctx: any, page: any}>}
 */
async function open(browser, w, h, { fresh = false, cam = false } = {}) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, serviceWorkers: 'block' });
  await ctx.addInitScript(([user, fresh, cam]) => {
    if (fresh || localStorage.getItem('dc_users')) return;
    localStorage.setItem('dc_users', JSON.stringify([user]));
    localStorage.setItem('dc_user_active', user.id);
    localStorage.setItem('dc_tutorial_done', '{"v":1,"how":"done"}');
    if (cam) localStorage.setItem('dc_camera_prefs', JSON.stringify({ enabled: true, autoFocus: false }));
  }, [USER, fresh, cam]);
  const page = await ctx.newPage();
  page.on('pageerror', (e) => report.errors.push(e.message));
  await page.goto(BASE + '/');
  await page.waitForSelector('#scr-boot.on #go-start', { timeout: 20000 });
  // Startsequenz (Hintergrund → Logo → Knopf) abwarten
  await page.waitForFunction(() => { const t = document.getElementById('title-root'); return !t || !t.classList.contains('boot-intro') || t.classList.contains('btn-in'); }, null, { timeout: 12000 }).catch(() => {});
  await sleep(900);
  return { ctx, page };
}
/** Vom Start ins Hauptmenü. */
async function toTitle(page) {
  await page.click('#go-start');
  await page.waitForSelector('#scr-title.on', { timeout: 15000 });
  await sleep(700);
}
/** Startet ein Einzelspieler-Gefecht und wartet bis der Tisch ruhig ist. */
async function toMatch(page) {
  await toTitle(page);
  await page.click('#go-single');
  await page.click('#btn-single-ready');
  await page.click('#btn-start', { timeout: 5000 });
  await page.waitForSelector('#coin-start-ok', { state: 'visible', timeout: 30000 });
  await page.click('#coin-start-ok');
  await sleep(6500);
  await page.waitForFunction(() => !(window.dcEventBusy && window.dcEventBusy()), null, { timeout: 30000 }).catch(() => {});
  // Rückblick („Handlung“) oder Bot-Zug abwarten, bis der Tisch wirklich frei ist
  await page.waitForFunction(() => {
    const ov = document.getElementById('overlay');
    const open = ov && getComputedStyle(ov).display !== 'none';
    const ok = document.getElementById('recap-ok');
    if (open && ok && ok.offsetParent) ok.click();
    return !open && !(window.dcEventBusy && window.dcEventBusy());
  }, null, { timeout: 40000, polling: 400 }).catch(() => {});
  await sleep(500);
}
const ACTIVE = '.screen.on';
const MODAL = '.overlay:not([style*="display: none"]) .modal, .modal-layer:not([style*="display: none"]) .modal, [role=dialog]';

/** Szenen: [Name, Optionen, Schritte → Messwurzel]. */
const SCENES = [
  ['start', {}, async () => ACTIVE],
  ['start_reset', {}, async (p) => { await p.click('#boot-reset'); await sleep(500); return MODAL; }],
  ['tutorial_einstieg', { fresh: true }, async (p) => { await p.click('#go-start'); await p.waitForSelector('#tut-coach', { timeout: 20000 }); await sleep(900); return '#tut-coach'; }],
  ['offiziersakte', { fresh: true }, async (p) => {
    await p.click('#go-start'); await p.waitForSelector('#tut-coach', { timeout: 20000 });
    await p.evaluate(() => { localStorage.setItem('dc_tutorial_done', '{"v":1,"how":"skip"}'); });
    await p.goto(BASE + '/'); await p.waitForSelector('#scr-boot.on #go-start'); await sleep(500); await p.click('#go-start');
    await p.waitForSelector('#scr-setup.on', { timeout: 15000 }); await sleep(800); return ACTIVE;
  }],
  ['hauptmenue', {}, async (p) => { await toTitle(p); return ACTIVE; }],
  ['einzelspieler', {}, async (p) => { await toTitle(p); await p.click('#go-single'); await sleep(600); return ACTIVE; }],
  ['einzelspieler_bot', {}, async (p) => { await toTitle(p); await p.click('#go-single'); await p.click('#btn-bot-cfg'); await sleep(400); const s = p.locator('#bot-stock'); if (await s.isChecked()) await s.uncheck(); await sleep(300); return '#bot-modal .modal'; }],
  ['lan', {}, async (p) => { await toTitle(p); await p.click('#go-lan'); await sleep(500); return ACTIVE; }],
  ['lan_suchen', {}, async (p) => { await toTitle(p); await p.click('#go-lan'); await p.click('#btn-lan-seek'); await sleep(500); return ACTIVE; }],
  ['bibliothek', {}, async (p) => {
    await toTitle(p); await p.click('#go-library'); await p.waitForSelector('#lib-list .lib-card, #lib-list > *', { timeout: 15000 }).catch(() => {}); await sleep(1200);
    const tiles = p.locator('#lib-list > *'); const n = Math.min(await tiles.count(), 6);
    for (let i = 0; i < n; i++) { await p.locator('#lib-list .lib-card').nth(i).dblclick().catch(() => {}); await sleep(150); }
    await sleep(500); return ACTIVE;
  }],
  ['bibliothek_tags', {}, async (p) => { await toTitle(p); await p.click('#go-library'); await sleep(1200); await p.click('#lib-tag-toggle'); await sleep(400); return ACTIVE; }],
  ['bibliothek_karte', {}, async (p) => { await toTitle(p); await p.click('#go-library'); await sleep(1500); await p.locator('#lib-list .lib-card').first().click(); await sleep(900); return '#lib-zoom'; }],
  ['hilfe', {}, async (p) => { await toTitle(p); await p.click('#go-hilfe'); await sleep(500); return ACTIVE; }],
  ['hilfe_regeln', {}, async (p) => { await toTitle(p); await p.click('#go-hilfe'); await p.click('[data-hilfe="regeln"]'); await sleep(500); return ACTIVE; }],
  ['benutzer', {}, async (p) => { await toTitle(p); await p.click('#go-user'); await sleep(700); return ACTIVE; }],
  ['playtest', {}, async (p) => { await toTitle(p); await p.click('#go-playtest'); await sleep(700); return '#playtest-panel'; }],
  ['optionen_audio', {}, async (p) => { await toTitle(p); await p.click('#go-options'); await sleep(400); return ACTIVE; }],
  ['optionen_gameplay', {}, async (p) => { await toTitle(p); await p.click('#go-options'); await p.click('[data-pane="opt-game"]'); await sleep(300); return ACTIVE; }],
  ['optionen_grafik', {}, async (p) => { await toTitle(p); await p.click('#go-options'); await p.click('[data-pane="opt-gfx"]'); await sleep(300); return ACTIVE; }],
  ['optionen_system', {}, async (p) => { await toTitle(p); await p.click('#go-options'); await p.click('[data-pane="opt-sys"]'); await sleep(300); return ACTIVE; }],
  ['optionen_reset', {}, async (p) => { await toTitle(p); await p.click('#go-options'); await p.click('[data-pane="opt-sys"]'); await p.click('#opt-reset'); await sleep(500); return MODAL; }],
  ['partie_optionen', {}, async (p) => { await toMatch(p); await p.click('#btn-opts'); await sleep(500); return '#ingame-opts .modal'; }],
  ['partie_karte', {}, async (p) => { await toMatch(p); await p.locator('#hand .card').first().dblclick(); await sleep(800); return '#inspect'; }],
  ['partie_ende', {}, async (p) => {
    await toMatch(p); await p.click('#hud-more summary'); await p.click('#btn-concede'); await sleep(500);
    const ok = p.locator('#overlay button.primary, #overlay button:has-text("Aufgeben")'); if (await ok.count()) await ok.first().click().catch(() => {});
    await p.waitForSelector('#dc-end-screen', { timeout: 20000 }).catch(() => {}); await sleep(2500); return '#dc-end-screen';
  }],
  ['partie_2_5d', { cam: true }, async (p) => { await toMatch(p); return '#app .topbar, #app .table-side, .cam-hud'; }],
];

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const srv = spawn('python3', [path.join(GAME_DIR, 'server.py'), '--port', String(PORT)], { cwd: GAME_DIR, stdio: 'ignore' });
  await waitHttp(BASE + '/');
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    for (const [w, h] of SIZES) {
      const size = w + 'x' + h;
      for (const [scene, opts, run] of SCENES) {
        if (ONLY && !ONLY.has(scene)) continue;
        let done = false;
        for (let attempt = 1; attempt <= 2 && !done; attempt++) {
          const { ctx, page } = await open(browser, w, h, opts);
          try {
            const root = await run(page);
            await page.mouse.move(1, 1); await sleep(200);
            const res = await page.evaluate(probe, root);
            if (!res.count) res.problems.push('nichts gemessen (Wurzel ' + root + ' unsichtbar)');
            report.scenes.push({ scene, size, count: res.count, problems: res.problems });
            res.problems.forEach((x) => report.problems.push(`${size} ${scene}: ${x}`));
            const file = path.join(OUT, `${PREFIX}_${scene}_${size}.png`);
            await page.screenshot({ path: file }); report.shots.push(file);
            console.log(`${size} ${scene}: ${res.count} Elemente, ${res.problems.length} Befunde`);
            done = true;
          } catch (e) {
            const msg = `Ablauf ${size} ${scene}: ${(e.message || String(e)).split('\n')[0]}`;
            console.log(msg + (attempt === 1 ? ' (wiederhole)' : ''));
            await page.screenshot({ path: path.join(OUT, `${PREFIX}_fehler_${scene}_${size}.png`) }).catch(() => {});
            if (attempt === 2) report.errors.push(msg);
          } finally { await ctx.close(); }
        }
      }
    }
  } finally { await browser.close(); srv.kill(); }
  fs.writeFileSync(path.join(OUT, PREFIX + '_screens_report.json'), JSON.stringify(report, null, 2));
  const uniq = [...new Set(report.problems)];
  console.log(uniq.join('\n'));
  console.log(JSON.stringify({ mode: MODE, problems: uniq.length, errors: report.errors, shots: report.shots.length }));
  process.exit(MODE === 'test' && (uniq.length || report.errors.length) ? 1 : 0);
}
main();
