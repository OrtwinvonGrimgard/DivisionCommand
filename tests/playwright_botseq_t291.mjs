#!/usr/bin/env node
/**
 * t291: Browser-Test für den sequenzierten Bot-Zug (Playwright + Chromium, nicht Teil von `npm test`).
 *
 * Aufruf von der Repo-Wurzel:  npm run botseq-play
 * Umgebungsvariablen: DC_BOTSEQ_OUT (Screenshots + Bericht, Standard /workspace/t291-shots),
 *                     DC_BOTSEQ_PORT (Port für server.py)
 * Prüft:
 *  0. Optionen: „Bot-Tempo“ und „Reaktionsfenster“ sind vorhanden und werden gespeichert.
 *  A. Ohne Reaktionsmöglichkeit: Bot-Aktionen kommen einzeln mit Abstand (Denkpause), das Laufband
 *     zeigt sie, kein Reaktionsfenster, Zugbeginn ohne nachgeholte Meldungen.
 *  B. Napalm auf der Hand + 3 Reserve-AP: Reaktionsfenster erscheint, der Bot wartet, Napalm wird über
 *     das Fenster gespielt und wirkt (Hand, AP, Ziel), danach setzt der Bot fort und beendet den Zug.
 *  C. Einstellung „Nie anhalten“: gleiche Lage, kein Fenster.
 * Exit-Code 1 bei jedem Fehler. Bericht: <OUT>/botseq_report.json
 */
import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GAME_DIR = path.join(path.resolve(__dirname, '..'), 'Division_Command');
const OUT = process.env.DC_BOTSEQ_OUT || '/workspace/t291-shots';
const PORT = Number(process.env.DC_BOTSEQ_PORT || (19800 + Math.floor(Math.random() * 150)));
const BASE = 'http://127.0.0.1:' + PORT;
const report = { ok: [], fail: [], errors: [], shots: [], gaps: [], scenarios: {} };
let srv = null;
/** @param {number} ms */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Hält einen Fehler fest.
 * @param {string} where
 * @param {unknown} e
 */
function fail(where, e) { const m = where + ': ' + (e && e.message ? e.message.split('\n')[0] : String(e)); report.fail.push(m); console.log('FAIL', m); }
/**
 * Wartet, bis der HTTP-Server antwortet.
 * @param {string} url
 */
function waitHttp(url) {
  const t0 = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => http.get(url, (res) => { res.resume(); resolve(); }).on('error', () => { if (Date.now() - t0 > 20000) reject(new Error('server timeout')); else setTimeout(tick, 200); });
    tick();
  });
}
/**
 * Screenshot unter OUT.
 * @param {import('playwright').Page} page
 * @param {string} name
 */
async function shot(page, name) { const p = path.join(OUT, name + '.png'); await page.screenshot({ path: p }).catch(() => {}); report.shots.push(p); return p; }

/**
 * Bedient Dialoge bis der Mensch am Zug ist (Reaktionsfenster: Weiter; Meldungen: abwarten).
 * @param {import('playwright').Page} page
 * @param {number} [ms]
 */
async function waitHuman(page, ms = 90000) {
  const t0 = Date.now();
  while (Date.now() - t0 < ms) {
    const st = await page.evaluate(() => {
      const e = window.dcGetEngine && window.dcGetEngine(); if (!e) return null;
      const ov = document.getElementById('overlay');
      const on = !!(ov && ov.style.display !== 'none' && ov.innerHTML.trim());
      return { active: e.state.active, you: window.dcGetYou(), pend: e.state.pending && e.state.pending.player, hold: !!window.dcTimerHold,
        busy: !!(window.dcEventBusy && window.dcEventBusy()), on, react: !!(ov && ov.querySelector('.bot-react')), recap: !!(ov && ov.querySelector('.recap-stage')), ended: e.state.winner != null };
    });
    if (!st) { await sleep(200); continue; }
    if (st.ended) throw new Error('Partie unerwartet beendet');
    if (st.react) { await page.click('#botseq-react-pass').catch(() => {}); await sleep(200); continue; }
    if (st.on && !st.recap) {
      await page.evaluate(() => { const ov = document.getElementById('overlay'); const b = ov.querySelector('#cw-ok, #react-pass, #sam-no, #gv-no, #end-ok, #pend-empty-ok, button.primary, button'); if (b) b.click(); });
      await sleep(250); continue;
    }
    if (st.active === st.you && st.pend == null && !st.hold && !st.busy && !st.on) return st;
    await sleep(200);
  }
  throw new Error('Zeitüberschreitung: eigener Zug kommt nicht');
}

/**
 * Lage für den nächsten Bot-Zug herstellen und Aufzeichnung der Engine-Aktionen anschalten.
 * @param {import('playwright').Page} page
 * @param {{napalm:boolean, ap:number}} o
 */
async function prepareBotTurn(page, o) {
  return page.evaluate((o) => {
    const e = window.dcGetEngine(); const C = window.DC_CATALOG.cards;
    const plain = C.filter((c) => c.typ === 'Einheit' && !(c.effects || []).length && !(c.keywords || []).length && Number(c.ap) <= 2 && c.atk >= 1);
    const me = e.player(0), foe = e.player(1);
    me.hand = me.hand.filter((c) => e.defOf(c).typ !== 'Soforteinsatz');
    let nap = null;
    if (o.napalm) { nap = e.instFromId('dc_so_napalm', 0); me.hand.push(nap); }
    me.ap = o.ap;
    // Bot: Platz an der Front, drei einfache Einheiten auf der Hand, eine Einheit liegt schon (Napalm-Ziel).
    ['L', 'C', 'R'].forEach((s) => { foe.front[s] = [null, null, null]; });
    const u0 = e.instFromId(plain[0].id, 1); u0.summonedTurn = -9; u0.playedTurn = -9; foe.front.L[0] = u0;
    foe.hand = [e.instFromId(plain[1].id, 1), e.instFromId(plain[2].id, 1), e.instFromId(plain[3].id, 1)];
    window.__seq = [];
    if (!e.__seqHooked) {
      const prev = e.dispatch; e.__seqHooked = true;
      e.dispatch = function (a) { const r = prev.call(this, a); try { window.__seq.push({ t: Math.round(performance.now()), type: a && a.type, player: a && a.player, ok: !!(r && r.ok) }); } catch (x) { /* nur Aufzeichnung */ } return r; };
    }
    window.dcRender();
    return { nap: nap && nap.uid, foeUnit: u0.uid };
  }, o);
}

/**
 * Hauptaktionen des Bots aus der Aufzeichnung.
 * @param {Array<{type:string, player:number, ok:boolean}>} seq
 */
const mains = (seq) => seq.filter((x) => x.player === 1 && x.ok && !['END_TURN', 'CANCEL_PENDING', 'RESOLVE_PENDING', 'CHOOSE_SLOT', 'CHOOSE_TARGET', 'COIN_FLIP', 'SAM_PASS', 'GEIST_PASS', 'REACT_PASS', 'PEEK_DONE'].includes(x.type));

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  srv = spawn('python3', [path.join(GAME_DIR, 'server.py'), '--port', String(PORT)], { cwd: GAME_DIR, stdio: ['ignore', 'ignore', 'pipe'] });
  srv.stderr.on('data', () => {});
  await waitHttp(BASE + '/');
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 }, serviceWorkers: 'block' });
    await ctx.addInitScript(() => {
      let x = 291; Math.random = function () { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; return x / 4294967296; };
      if (!localStorage.getItem('dc_users')) {
        localStorage.setItem('dc_users', JSON.stringify([{ id: 'u1', name: 'Rekrut, Test', face: 'f01', uniform: 'kampf', hat: 'none', rank: 'Fhr', facing: 'left' }]));
        localStorage.setItem('dc_user_active', 'u1');
        localStorage.setItem('dc_tutorial_done', '{"v":1,"how":"done"}');
        localStorage.setItem('dc_fly', '50'); localStorage.setItem('dc_dialog', '400');
      }
    });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => report.errors.push(String(e && e.message || e)));
    page.on('console', (m) => { if (m.type() === 'error' && !/Service Worker/i.test(m.text())) report.errors.push(m.text().slice(0, 200)); });
    await page.goto(BASE + '/');
    await page.waitForSelector('#scr-boot.on #go-start', { timeout: 20000 });
    await page.click('#go-start');
    await page.waitForSelector('#scr-title.on', { timeout: 15000 });
    // 0. Optionen
    try {
      await page.click('#go-options');
      await page.click('.opt-tab[data-pane="opt-game"]');
      await page.selectOption('#opt-bot-tempo', 'fast');
      await page.selectOption('#opt-bot-react', 'brief');
      const saved = await page.evaluate(() => [localStorage.getItem('dc_bot_tempo'), localStorage.getItem('dc_bot_react')]);
      if (saved[0] !== 'fast' || saved[1] !== 'brief') throw new Error('nicht gespeichert: ' + saved);
      await shot(page, 'optionen_bot');
      await page.selectOption('#opt-bot-tempo', 'normal');
      await page.selectOption('#opt-bot-react', 'stop');
      await page.locator('#scr-options button.back').first().click().catch(() => page.evaluate(() => window.dcShowTitle && window.dcShowTitle()));
      await page.waitForSelector('#scr-title.on', { timeout: 8000 });
      report.ok.push('optionen');
    } catch (e) { fail('optionen', e); await page.goto(BASE + '/'); await page.click('#go-start').catch(() => {}); await page.waitForSelector('#scr-title.on', { timeout: 15000 }); }
    await page.evaluate(() => { localStorage.setItem('dc_bot_tempo', 'normal'); localStorage.setItem('dc_bot_react', 'stop'); });
    await page.click('#go-single');
    await page.click('#btn-single-ready');
    await page.click('#btn-start', { timeout: 5000 });
    await page.waitForSelector('#coin-start-ok', { state: 'visible', timeout: 30000 });
    await page.click('#coin-start-ok');
    await waitHuman(page);

    // A. ohne Reaktion
    try {
      await prepareBotTurn(page, { napalm: false, ap: 0 });
      await page.click('#btn-end');
      let reactSeen = false, tickerSeen = false;
      const t0 = Date.now();
      while (Date.now() - t0 < 60000) {
        const s = await page.evaluate(() => ({ a: window.dcGetEngine().state.active, r: !!document.querySelector('#overlay .bot-react'), t: !!document.querySelector('#bot-ticker:not(.off)') }));
        if (s.r) reactSeen = true; if (s.t) tickerSeen = true;
        if (s.a === 0) break;
        await sleep(120);
      }
      const after = await page.evaluate(() => ({ a: window.dcGetEngine().state.active, busy: window.dcEventBusy(), seq: window.__seq }));
      await sleep(400);
      const busyLater = await page.evaluate(() => window.dcEventBusy());
      const m = mains(after.seq);
      const gaps = m.slice(1).map((x, i) => x.t - m[i].t);
      report.scenarios.A = { mains: m.length, gaps, reactSeen, tickerSeen, busyAtTurnStart: after.busy || busyLater };
      report.gaps.push(...gaps);
      if (after.a !== 0) throw new Error('Bot-Zug endet nicht');
      if (m.length < 2) throw new Error('zu wenige Bot-Aktionen: ' + m.length);
      if (gaps.some((g) => g < 550)) throw new Error('Bot-Aktionen ohne Denkpause: ' + gaps.join(','));
      if (reactSeen) throw new Error('Reaktionsfenster ohne Reaktionsmöglichkeit');
      if (!tickerSeen) throw new Error('Laufband nicht sichtbar');
      if (after.busy || busyLater) throw new Error('Zugbeginn holt Meldungen nach');
      report.ok.push('A: ' + m.length + ' Bot-Aktionen einzeln, Abstände ' + gaps.join('/') + ' ms, kein Fenster');
    } catch (e) { fail('A', e); await shot(page, 'fehler_A'); }

    // B. Reaktion mit Napalm
    try {
      await waitHuman(page);
      const ids = await prepareBotTurn(page, { napalm: true, ap: 3 });
      await page.click('#btn-end');
      await page.waitForSelector('#overlay .bot-react [data-botreact]', { state: 'visible', timeout: 30000 });
      await sleep(350);
      await shot(page, 'reaktionsfenster');
      const n0 = await page.evaluate(() => window.__seq.filter((x) => x.player === 1).length);
      await sleep(3500);
      const n1 = await page.evaluate(() => window.__seq.filter((x) => x.player === 1).length);
      if (n1 !== n0) throw new Error('Bot handelt trotz offenem Reaktionsfenster (' + n0 + '→' + n1 + ')');
      await page.click(`#overlay [data-botreact="${ids.nap}"]`);
      await sleep(300);
      const pend = await page.evaluate(() => { const p = window.dcGetEngine().state.pending; return p && { kind: p.kind, player: p.player }; });
      if (!pend || pend.player !== 0) throw new Error('keine Zielwahl nach Napalm: ' + JSON.stringify(pend));
      const target = await page.evaluate(() => { const a = window.dcGetEngine().listActions(0).find((x) => x.type === 'RESOLVE_PENDING' && x.target); return a && a.target; });
      const tile = page.locator(`#enemy-front [data-uid="${target}"]`).first();
      if (await tile.count()) await tile.click({ timeout: 4000 }).catch(() => {});
      await sleep(300);
      const still = await page.evaluate(() => { const p = window.dcGetEngine().state.pending; return !!(p && p.player === 0); });
      if (still) await page.evaluate((t) => window.dcDispatch({ type: 'RESOLVE_PENDING', player: 0, target: t }), target);
      await sleep(500);
      await shot(page, 'reaktion_gespielt');
      const res = await page.evaluate((uid) => { const e = window.dcGetEngine(); return { inHand: e.player(0).hand.some((c) => c.uid === uid), ap: e.player(0).ap, inGrave: e.player(0).grave.some((c) => c.uid === uid) }; }, ids.nap);
      if (res.inHand) throw new Error('Napalm noch auf der Hand');
      if (res.ap !== 0) throw new Error('Reserve-AP nicht bezahlt: ' + res.ap);
      await waitHuman(page);
      const n2 = await page.evaluate(() => window.__seq.filter((x) => x.player === 1).length);
      if (n2 <= n1) throw new Error('Bot setzt nach der Reaktion nicht fort');
      const apNow = await page.evaluate(() => window.dcGetEngine().player(0).ap);
      report.scenarios.B = { pauseHeld: true, napalm: res, botActionsAfter: n2 - n1, apAtOwnTurn: apNow };
      report.ok.push('B: Reaktionsfenster, Bot wartete 3,5 s, Napalm gespielt (3 AP), Bot setzte mit ' + (n2 - n1) + ' Aktionen fort');
    } catch (e) { fail('B', e); await shot(page, 'fehler_B'); }

    // C. „Nie anhalten“
    try {
      await waitHuman(page);
      await page.evaluate(() => localStorage.setItem('dc_bot_react', 'off'));
      await prepareBotTurn(page, { napalm: true, ap: 3 });
      await page.click('#btn-end');
      let seen = false; const t0 = Date.now();
      while (Date.now() - t0 < 60000) {
        const s = await page.evaluate(() => ({ a: window.dcGetEngine().state.active, r: !!document.querySelector('#overlay .bot-react') }));
        if (s.r) seen = true;
        if (s.a === 0) break;
        await sleep(120);
      }
      if (seen) throw new Error('Fenster trotz „Nie anhalten“');
      report.scenarios.C = { windowSeen: seen };
      report.ok.push('C: „Nie anhalten“ ohne Fenster');
    } catch (e) { fail('C', e); await shot(page, 'fehler_C'); }
    await ctx.close();
  } finally {
    await browser.close();
    if (srv) srv.kill('SIGTERM');
  }
  if (report.errors.length) fail('console', new Error(report.errors.length + ' Fehler, z. B. ' + report.errors[0]));
  fs.writeFileSync(path.join(OUT, 'botseq_report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ ok: report.ok, fail: report.fail, scenarios: report.scenarios, shots: report.shots }, null, 2));
  process.exit(report.fail.length ? 1 : 0);
}
main().catch((e) => { console.error(e); if (srv) srv.kill('SIGTERM'); process.exit(1); });
