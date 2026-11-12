#!/usr/bin/env node
/**
 * t275: Browser-Durchlauf des Tutorials „Grundausbildung“ (Playwright + Chromium, nicht Teil von `npm test`).
 *
 * Aufruf von der Repo-Wurzel:  node tests/playwright_tutorial_t275.mjs
 * Umgebungsvariablen: DC_TUT_PORT (Standard 19276), DC_TUT_OUT (Standard /workspace/t275-shots)
 *
 * Prüft mit frischen Browserprofilen:
 *  1. Erststart: „Spiel starten“ → Tutorial → alle Schritte über die Oberfläche (Klicks auf Karten,
 *     Felder, Dialoge) → Offiziersakte → Hauptmenü. Falsche Aktionen werden geblockt, „Zurück“ geht.
 *  2. Zweiter Start (Neuladen): „Spiel starten“ führt direkt ins Hauptmenü, kein Tutorial.
 *  3. Menüpunkt „Tutorial“ startet es erneut; Überspringen führt zurück ins Hauptmenü.
 *  4. Neues Profil: Überspringen setzt den Merker; danach kein Tutorial mehr.
 *  5. Keine Seitenfehler; das Tutorial schreibt keine Benutzer, Decks oder Spielstände.
 * Exit-Code 1 bei Fehler. Bericht: <OUT>/tutorial_report.json
 */
import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GAME_DIR = path.join(path.resolve(__dirname, '..'), 'Division_Command');
const OUT = process.env.DC_TUT_OUT || '/workspace/t275-shots';
const PORT = Number(process.env.DC_TUT_PORT || 19276);
const BASE = 'http://127.0.0.1:' + PORT;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const report = { ok: [], fail: [], errors: [], steps: [], shots: [], ms: 0 };
let curPage = null;

/**
 * Hält einen Fehler fest.
 * @param {string} where
 * @param {unknown} e
 */
function fail(where, e) {
  const m = where + ': ' + (e && e.message ? e.message.split('\n')[0] : String(e));
  report.fail.push(m);
  console.log('FAIL', m);
}
/**
 * Prüft eine Bedingung.
 * @param {boolean} c
 * @param {string} msg
 */
function check(c, msg) { if (c) report.ok.push(msg); else fail('check', new Error(msg)); }

/**
 * Wartet, bis der Server antwortet.
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
 * Screenshot nach OUT.
 * @param {import('playwright').Page} page
 * @param {string} name
 */
async function shot(page, name) {
  const p = path.join(OUT, name + '.png');
  await page.screenshot({ path: p });
  report.shots.push(p);
}
/**
 * Neue Seite mit Fehlerprotokoll.
 * @param {import('playwright').BrowserContext} ctx
 * @param {string} tag
 * @returns {Promise<import('playwright').Page>}
 */
async function newPage(ctx, tag) {
  const page = await ctx.newPage();
  curPage = page;
  page.on('pageerror', (e) => report.errors.push(tag + ': ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/favicon|ERR_|404/.test(m.text())) report.errors.push(tag + ' console: ' + m.text()); });
  return page;
}
/** @param {import('playwright').Page} page */
const status = (page) => page.evaluate(() => (window.DCTutorial ? DCTutorial.status() : null));
/** @param {import('playwright').Page} page */
const tutFlag = (page) => page.evaluate(() => localStorage.getItem('dc_tutorial_done'));

/**
 * Klickt „Spiel starten“ im Startbildschirm.
 * @param {import('playwright').Page} page
 */
async function clickStart(page) {
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForSelector('#scr-boot.on #go-start', { timeout: 20000 });
  await page.click('#go-start');
}
/**
 * Wartet, bis das Tutorial bei Schritt `id` steht und bereit ist.
 * @param {import('playwright').Page} page
 * @param {string} [id]
 * @param {number} [ms]
 */
async function waitStep(page, id, ms = 30000) {
  await page.waitForFunction((want) => {
    const s = window.DCTutorial && DCTutorial.status();
    const c = document.getElementById('tut-coach');
    return s && s.running && !s.waiting && (!want || s.step === want) && c && !c.classList.contains('tut-ok');
  }, id || null, { timeout: ms });
  await sleep(450);
}
/**
 * Klickt eine Handkarte (Mitte), wie ein Spieler.
 * @param {import('playwright').Page} page
 * @param {string} uid
 */
async function clickHand(page, uid) {
  const el = page.locator(`#hand .card[data-uid="${uid}"]`);
  const b = await el.boundingBox();
  if (!b) throw new Error('Handkarte fehlt ' + uid);
  const vp = page.viewportSize();
  await page.mouse.click(b.x + b.width / 2, Math.min(b.y + b.height / 2, vp.height - 6));
  await sleep(350);
}
/**
 * Zieht eine Handkarte mit der Maus auf ein Feld (wie ein Spieler).
 * @param {import('playwright').Page} page
 * @param {string} uid
 * @param {string} targetSel
 */
async function dragHand(page, uid, targetSel) {
  const b = await page.locator(`#hand .card[data-uid="${uid}"]`).boundingBox();
  const t = await page.locator(targetSel).boundingBox();
  if (!b || !t) throw new Error('Ziehen: Karte oder Ziel fehlt');
  const vp = page.viewportSize();
  const x0 = b.x + b.width / 2, y0 = Math.min(b.y + b.height / 2, vp.height - 6);
  const x1 = t.x + t.width / 2, y1 = t.y + t.height / 2;
  await page.mouse.move(x0, y0);
  await page.mouse.down();
  for (let i = 1; i <= 16; i++) { await page.mouse.move(x0 + (x1 - x0) * i / 16, y0 + (y1 - y0) * i / 16); await sleep(15); }
  await page.mouse.up();
  await sleep(350);
}
/**
 * Angriff über die Oberfläche: Einheit antippen → „Angreifen“ → Ziel antippen.
 * @param {import('playwright').Page} page
 * @param {string} atk
 * @param {string} target
 */
async function uiAttack(page, atk, target) {
  await page.click(`#my-front .slot[data-uid="${atk}"]`);
  await sleep(350);
  await page.locator('#overlay #ac-atk, #inspect button[data-act="dc-attack"]').first().click({ timeout: 5000 });
  await sleep(350);
  await pickTarget(page, target);
}
/**
 * Wählt ein Ziel der offenen Wahl: im Zielwahl-Dialog (Kartenbild) oder als leuchtendes Feld.
 * @param {import('playwright').Page} page
 * @param {string} uid
 */
async function pickTarget(page, uid) {
  // Erst die Meldung („… wird ausgewählt“) abwarten, dann steht die Zielwahl.
  await page.waitForFunction(() => {
    const p = window.dcGetEngine().state.pending;
    if (window.dcEventBusy()) return false;
    if (!p) return true; // nur ein Ziel: Angriff ohne Wahl ausgeführt
    return p.player === 0 && !!document.querySelector('#overlay .choices button[data-i], .slot.legal-target');
  }, null, { timeout: 20000 });
  if (!(await page.evaluate(() => !!window.dcGetEngine().state.pending))) return;
  await sleep(250);
  const idx = await page.evaluate((u) => (window.dcGetEngine().state.pending.choices || []).findIndex((c) => c && (c.target === u || c.uid === u)), uid);
  const btn = page.locator(`#overlay .choices button[data-i="${idx}"]`);
  if (idx >= 0 && await btn.count()) await btn.click({ timeout: 5000 });
  else await page.locator(`.slot.legal-target[data-uid="${uid}"]`).first().click({ timeout: 5000 });
  await sleep(300);
}

/**
 * Spielt das komplette Tutorial über die Oberfläche.
 * @param {import('playwright').Page} page
 */
async function playThrough(page) {
  const u = await page.evaluate(() => {
    const e = window.dcGetEngine();
    const S = window.DCTutorialScenario;
    const byCard = (pid, id) => {
      const p = e.player(pid); let f = null;
      p.hand.forEach((c) => { if (c.cardId === id) f = f || c.uid; });
      p.deck.forEach((c) => { if (c.cardId === id) f = f || c.uid; });
      ['L', 'C', 'R'].forEach((s) => (p.front[s] || []).forEach((c) => { if (c && c.cardId === id) f = f || c.uid; }));
      return f;
    };
    const C = S.CARDS;
    return { recruit: byCard(0, C.recruit), cover: byCard(0, C.cover), kitchen: byCard(0, C.kitchen), push: byCard(0, C.push), strap: byCard(0, C.strap),
      vet: byCard(0, C.vet), art: byCard(0, C.art), foeA: byCard(1, C.foeA), foeB: byCard(1, C.foeB), elite: byCard(1, C.elite) };
  });
  const t0 = Date.now();
  for (let guard = 0; guard < 80; guard++) {
    const st = await status(page);
    if (!st || !st.running) break;
    if (st.waiting) { await sleep(300); continue; }
    await waitStep(page, st.step);
    if (!report.steps.includes(st.step)) report.steps.push(st.step);
    const id = st.step;
    if (id === 'intro') await shot(page, '01_intro_ausbilder');
    if (id === 'goal') {
      // Info-Schritt: Klick auf den Tisch wird freundlich abgefangen
      await page.mouse.click(700, 450);
      await sleep(250);
      check(await page.locator('#tut-coach .tut-hint:not([hidden])').count() === 1, 'Info-Schritt blockt Tischklick mit Hinweis');
    }
    if (id === 'deploy') {
      await shot(page, '02_spotlight_einheit_legen');
      await page.click('#btn-end');
      await sleep(300);
      const blocked = await page.evaluate(() => window.dcGetEngine().state.active === 0 && !document.querySelector('#tut-coach .tut-hint').hidden);
      check(blocked, 'Falsche Aktion (Zugende) wird geblockt, Hinweis sichtbar');
      // Ziehen auf die falsche Stellung: abgelehnt, Karte bleibt auf der Hand
      await dragHand(page, u.recruit, '#my-front .slot[data-section="L"][data-row="0"]');
      await sleep(600);
      const stay = await page.evaluate((uid) => window.dcGetEngine().player(0).hand.some((c) => c.uid === uid) && !!document.querySelector('#hand .card[data-uid="' + uid + '"]'), u.recruit);
      check(stay, 'Ziehen auf falsche Stellung wird abgelehnt, Karte bleibt auf der Hand');
      await shot(page, '02b_hinweis_falsche_stellung');
      // richtig: per Ziehen auf die markierte Stellung
      await dragHand(page, u.recruit, '#my-front .slot[data-section="C"][data-row="2"]');
    } else if (id === 'attack') {
      if (!report.backTested) {
        report.backTested = true;
        await page.click('#tut-coach .tut-back');
        await waitStep(page, 'digin', 8000);
        check(true, 'Zurück: von „Feuer frei“ zurück zu „Eingegraben“');
        await page.click('#tut-coach .tut-next');
        continue;
      }
      await uiAttack(page, u.vet, u.foeA);
    } else if (id === 'steil') {
      await uiAttack(page, u.art, u.elite);
    } else if (id === 'endturn') {
      await page.click('#btn-end');
    } else if (id === 'react') {
      await page.waitForSelector(`#overlay [data-react="${u.cover}"]`, { timeout: 15000 });
      await sleep(300);
      await shot(page, '03_feindkontakt_reaktion');
      await page.click(`#overlay [data-react="${u.cover}"]`);
      await sleep(400);
      await pickTarget(page, u.vet);
    } else if (id === 'support') {
      await clickHand(page, u.kitchen);
      await page.locator('#my-support .slot.legal').first().click({ timeout: 5000 });
    } else if (id === 'equip') {
      await clickHand(page, u.strap);
      const t = page.locator(`#my-front .slot.legal[data-uid="${u.recruit}"]`);
      if (await t.count()) await t.first().click({ timeout: 5000 }); else await pickTarget(page, u.recruit);
    } else if (id === 'instant') {
      await clickHand(page, u.push);
      const t2 = page.locator(`.slot.legal[data-uid="${u.elite}"]`);
      if (await t2.count()) await t2.first().click({ timeout: 5000 }); else await pickTarget(page, u.elite);
    } else if (id === 'final') {
      await uiAttack(page, u.recruit, u.elite);
    } else if (id === 'enemy') {
      // Gegner handelt allein
    } else {
      if (id === 'victory') { await sleep(600); await shot(page, '04_sieg'); }
      if (id === 'rarity') await shot(page, '05_deckbau_seltenheit');
      await page.click('#tut-coach .tut-next');
    }
    // auf den nächsten Schritt warten
    await page.waitForFunction((prev) => { const s = DCTutorial.status(); return !s.running || s.step !== prev || s.waiting; }, id, { timeout: 40000 })
      .catch((e) => fail('Schritt ' + id + ' kommt nicht weiter', e));
  }
  report.ms = Date.now() - t0;
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const srv = spawn('python3', [path.join(GAME_DIR, 'server.py'), '--port', String(PORT)], { cwd: GAME_DIR, stdio: 'ignore' });
  await waitHttp(BASE + '/');
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
  try {
    /* 1.–3. Erststart, vollständiger Durchlauf, Zweitstart, Menü-Wiederholung */
    const ctxA = await browser.newContext({ viewport: { width: 1600, height: 900 }, serviceWorkers: 'block' });
    const page = await newPage(ctxA, 'A');
    await clickStart(page);
    await page.waitForSelector('#tut-coach', { timeout: 20000 });
    const keys0 = await page.evaluate(() => Object.keys(localStorage).sort());
    await playThrough(page);
    await page.waitForSelector('#scr-setup.on', { timeout: 15000 });
    check(!(await page.locator('#tut-layer').count()), 'Overlay nach Abschluss entfernt');
    check(JSON.parse(await tutFlag(page)).how === 'done', 'Merker „done“ gesetzt');
    const keys1 = await page.evaluate(() => Object.keys(localStorage).sort());
    const added = keys1.filter((k) => !keys0.includes(k));
    check(added.every((k) => /^dc_tutorial|^dc_music$|^dc_vol$|^dc_sfx/.test(k)), 'Tutorial schreibt nur den eigenen Merker (neu: ' + added.join(',') + ')');
    check(!(await page.evaluate(() => localStorage.getItem('dc_users'))), 'kein Benutzer angelegt');
    check(report.steps.length === 25, 'alle 25 Schritte durchlaufen (' + report.steps.length + ')');
    await page.fill('#setup-name', 'Rekrut, Test');
    await page.click('#setup-ok');
    await page.waitForSelector('#scr-title.on', { timeout: 10000 });
    check(await page.locator('#go-tutorial').isVisible(), 'Menüpunkt Tutorial sichtbar');
    // Zweiter Start
    await clickStart(page);
    await page.waitForSelector('#scr-title.on', { timeout: 10000 });
    await sleep(3500);
    check(!(await page.locator('#tut-layer').count()), 'Zweitstart: kein Tutorial, direkt Hauptmenü');
    await shot(page, '06_zweitstart_hauptmenue');
    // Wiederholen über das Menü, dann überspringen
    await page.click('#go-tutorial');
    await page.waitForSelector('#tut-skip', { timeout: 15000 });
    await waitStep(page, 'intro');
    check(await page.evaluate(() => DCTutorial.status().step === 'intro'), 'Menü startet das Tutorial erneut');
    await page.click('#tut-skip');
    await page.waitForSelector('#tut-confirm:not([hidden])');
    await sleep(500);
    await shot(page, '07_ueberspringen_rueckfrage');
    await page.click('#tut-confirm .tut-leave');
    await page.waitForSelector('#scr-title.on', { timeout: 10000 });
    await sleep(1200);
    check(!(await page.locator('#tut-layer').count()), 'Wiederholung übersprungen → Hauptmenü');
    // Normale Partie danach unberührt startbar
    await page.click('#go-single');
    await page.click('#btn-single-ready');
    await page.click('#btn-start', { timeout: 5000 });
    await page.waitForSelector('#coin-start-ok', { state: 'visible', timeout: 30000 });
    check(await page.evaluate(() => { const e = window.dcGetEngine(); return !e.state.tutorial && e.state.mode !== 'tutorial' && e.player(0).hand.length >= 4; }), 'Normale Partie danach ohne Tutorial-Stand');
    await ctxA.close();

    /* 4. Neues Profil: Überspringen beim Erststart */
    const ctxB = await browser.newContext({ viewport: { width: 1366, height: 768 }, serviceWorkers: 'block' });
    const pb = await newPage(ctxB, 'B');
    await clickStart(pb);
    await pb.waitForSelector('#tut-skip', { timeout: 20000 });
    await waitStep(pb, 'intro');
    await pb.click('#tut-skip');
    await pb.click('#tut-confirm .tut-stay');
    check(await pb.evaluate(() => DCTutorial.status().running), 'Rückfrage „Weiter üben“ bleibt im Tutorial');
    await pb.click('#tut-skip');
    await pb.click('#tut-confirm .tut-leave');
    await pb.waitForSelector('#scr-setup.on', { timeout: 10000 });
    check(JSON.parse(await tutFlag(pb)).how === 'skip', 'Überspringen setzt Merker „skip“');
    await clickStart(pb);
    await pb.waitForSelector('#scr-setup.on', { timeout: 10000 });
    await sleep(3500);
    check(!(await pb.locator('#tut-layer').count()), 'nach Überspringen: kein Tutorial beim nächsten Start');
    await ctxB.close();
  } catch (e) {
    fail('Ablauf', e);
    if (curPage) {
      await curPage.screenshot({ path: path.join(OUT, 'zz_fehler.png') }).catch(() => {});
      report.failMut = await curPage.evaluate(() => new Promise((res) => {
        let n = 0; const log = []; const ov = document.getElementById('overlay');
        const mo = new MutationObserver((ms) => { ms.forEach((m) => { n++; if (log.length < 8) log.push(m.type + ':' + (m.target.id || m.target.className) + ':' + (m.attributeName || '')); }); });
        mo.observe(ov, { childList: true, subtree: true, attributes: true });
        setTimeout(() => { mo.disconnect(); res({ n, log, stack: window.__dcLastRender || null }); }, 2000);
      })).catch(() => null);
      report.failDom = await curPage.evaluate(() => ({ status: window.DCTutorial && DCTutorial.status(), inspect: (document.getElementById('inspect') || {}).outerHTML, overlay: (document.getElementById('overlay') || {}).outerHTML })).catch(() => null);
    }
  } finally {
    await browser.close();
    srv.kill();
  }
  if (report.errors.length) fail('Seitenfehler', new Error(report.errors.slice(0, 5).join(' | ')));
  fs.writeFileSync(path.join(OUT, 'tutorial_report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ ok: report.ok.length, fail: report.fail, steps: report.steps.length, ms: report.ms, shots: report.shots }, null, 1));
  process.exit(report.fail.length ? 1 : 0);
}
main();
