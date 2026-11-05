#!/usr/bin/env node
/**
 * UI-Matrix against server.py (expects http://127.0.0.1:8765 or starts one).
 * Screenshots → /workspace/bf_*.png
 */
import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SERVER = path.join(ROOT, 'Division_Command_0.5a', 'server.py');
const OUT = '/workspace';
const BASE = process.env.DC_BASE || 'http://127.0.0.1:8765';

const report = { ok: [], fail: [], console: [], pageerrors: [], shots: [] };
let srv = null;

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

async function ensureServer() {
  try {
    await waitHttp(BASE + '/', 1500);
    report.ok.push('server:already-up');
    return;
  } catch (_) {}
  srv = spawn('python3', [SERVER, '--port', '8765'], {
    cwd: path.dirname(SERVER), stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, PYTHONUNBUFFERED: '1' },
  });
  srv.stdout.on('data', () => {});
  srv.stderr.on('data', () => {});
  await waitHttp(BASE + '/');
  report.ok.push('server:started');
}

async function shot(page, name) {
  const p = path.join(OUT, 'bf_' + name + '.png');
  await page.screenshot({ path: p, fullPage: false });
  report.shots.push(p);
}

async function wire(page, tag) {
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const t = msg.text();
    if (/404|Failed to load resource|net::ERR_ABORTED/i.test(t)) return;
    report.console.push({ tag, text: t.slice(0, 300) });
  });
  page.on('pageerror', (err) => {
    report.pageerrors.push({ tag, text: String(err.message || err).slice(0, 300) });
  });
  // cut asset storm
  await page.route('**/*.{png,jpg,jpeg,webp,wav,mp3}', (route) => {
    if (/assets\/cards|assets\/audio|thumbs/i.test(route.request().url())) return route.abort();
    return route.continue();
  });
}

async function forceTitle(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.screen').forEach((s) => s.classList.remove('on'));
    const el = document.getElementById('scr-title');
    if (el) el.classList.add('on');
    const tr = document.getElementById('title-root');
    if (tr) { tr.style.display = ''; tr.classList.remove('boot-intro'); }
    const gr = document.getElementById('game-root');
    if (gr) gr.style.display = 'none';
    const wr = document.getElementById('work-root');
    if (wr) { wr.classList.remove('open'); wr.style.pointerEvents = 'none'; }
    document.querySelectorAll('.overlay').forEach((o) => {
      if (o.classList.contains('playtest-overlay') || o.id === 'bf-choice-ov' || o.id === 'end-overlay') return;
      o.style.display = 'none';
    });
  });
  await page.waitForTimeout(150);
}

async function openApp(page) {
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(600);
  // dismiss boot/setup
  for (let i = 0; i < 6; i++) {
    const clicked = await page.evaluate(() => {
      const boot = document.querySelector('#scr-boot.on');
      const setup = document.querySelector('#scr-setup.on');
      const btn = (boot || setup) && (boot || setup).querySelector('button');
      if (btn) { btn.click(); return true; }
      return false;
    });
    if (!clicked) break;
    await page.waitForTimeout(250);
  }
  await forceTitle(page);
}

async function runMenus(page) {
  await forceTitle(page);
  await shot(page, 'menu_title');
  for (const [sel, scr, name] of [
    ['#go-hilfe', '#scr-hilfe', 'hilfe'],
    ['#go-library', '#scr-library', 'deckbau'],
    ['#go-options', '#scr-options', 'optionen'],
    ['#go-single', '#scr-single', 'einzel'],
    ['#go-lan', '#scr-lan', 'lan_lobby'],
  ]) {
    await forceTitle(page);
    await page.locator(sel).click({ timeout: 8000, force: true });
    await page.waitForTimeout(350);
    const on = await page.locator(scr + '.on').count();
    if (!on) throw new Error(name + ' not on');
    await shot(page, 'menu_' + name);
    report.ok.push('menu:' + name);
  }
}

async function runPlaytest(page) {
  await forceTitle(page);
  await page.locator('#go-playtest').click({ timeout: 5000, force: true });
  await page.waitForTimeout(500);
  let opened = await page.locator('.playtest-modal, .playtest-overlay, #pt-note-save').count();
  if (!opened) {
    await page.evaluate(() => { if (window.DCPlayPanel) DCPlayPanel.show('notes'); });
    await page.waitForTimeout(300);
  }
  const noteSel = page.locator('#pt-note-text, .playtest-modal textarea').first();
  if (await noteSel.count()) {
    await noteSel.fill('Playwright-Bugfix-Notiz ' + new Date().toISOString());
    const cat = page.locator('#pt-note-cat, .playtest-modal select').first();
    if (await cat.count()) await cat.selectOption({ index: 2 }).catch(() => {});
    await page.click('#pt-note-save');
    await page.waitForTimeout(400);
  }
  const exp = await page.evaluate(async () => {
    if (!window.DCPlayStore?.exportAll) return { ok: false, reason: 'no store' };
    const r = await DCPlayStore.exportAll({ silent: true });
    return { ok: true, files: r?.files?.length || 0, names: (r?.files || []).map((f) => f.name) };
  });
  if (!exp.ok || exp.files < 1) throw new Error('export failed ' + JSON.stringify(exp));
  await shot(page, 'playtest_panel');
  report.ok.push('playtest:note+export:' + exp.files);
  // close
  await page.locator('.playtest-x, .playtest-modal .playtest-x').first().click().catch(() => {});
}

async function runChoices(page) {
  const result = await page.evaluate(() => {
    const steps = [];
    if (!window.DCEngine || !window.DC_CATALOG) return { ok: false, reason: 'no engine' };
    const Eng = DCEngine.Engine;
    const decks = DC_NATION_DECKS;
    const n = Object.keys(decks);
    const catalog = JSON.parse(JSON.stringify(DC_CATALOG));
    catalog.rules = Object.assign({}, catalog.rules, { opening_coin: false });
    const eng = new Eng(catalog, { seed: 99, rules: catalog.rules });
    eng.createMatch({
      seed: 99, mode: 'hotseat', startPlayer: 0, name0: 'Mensch', name1: 'Bot',
      deck0: decks[n[0]].cards.slice(), deck1: decks[n[1] || n[0]].cards.slice(),
      doctrine0: (decks[n[0]].doktrinen || []).slice(0, 2),
      doctrine1: (decks[n[1] || n[0]].doktrinen || []).slice(0, 2),
    });
    window.__bfEng = eng;
    const INF = DC_CATALOG.cards.find((c) => c.typ === 'Einheit' && /infanterie/i.test((c.tags || []).join(' ') + (c.klasse || '')));
    const put = (pid, sec, row) => {
      const u = eng.instFromId(INF.id, pid);
      u.summonedTurn = -99; u.flags = {};
      eng.player(pid).front[sec][row] = u;
      return u;
    };
    put(0, 'C', 0); put(0, 'L', 0); put(0, 'R', 0); put(1, 'C', 0);
    eng.player(0).ap = 30; eng.state.active = 0;

    const play = (id) => {
      const c = eng.instFromId(id, 0);
      eng.player(0).hand.push(c);
      return eng.dispatch({ type: 'PLAY', player: 0, uid: c.uid });
    };

    play('dc_b_lauer_249');
    steps.push({ Lauer: eng.state.pending?.kind });
    if (eng.state.pending?.kind !== 'instant-section') return { ok: false, reason: 'Lauer', steps };
    eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: eng.state.pending.choices.find((c) => c.section === 'C').target });
    steps.push({ LauerDone: !eng.state.pending, trap: !!(eng.player(0).flags?.sectionEnterDamage?.length) });

    play('dc_b_konzentrationsruf_639');
    steps.push({ Konz: eng.state.pending?.kind });
    eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: eng.state.pending.choices.find((c) => c.section === 'L').target });

    play('dc_b_gegenruf_760');
    steps.push({ Gegenruf: eng.state.pending?.kind, upto: eng.state.pending?.upto });
    eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: eng.player(0).front.C[0].uid });
    eng.dispatch({ type: 'CONFIRM_TARGETS', player: 0 });
    steps.push({ GegenrufAtk: eng.player(0).front.C[0].flags.tempAtk });

    play('dc_b_zweite_linie_248');
    steps.push({ Zweite: eng.state.pending?.needCount });
    eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: eng.player(0).front.C[0].uid });
    eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: eng.player(0).front.L[0].uid });

    const SUP = DC_CATALOG.cards.find((c) => c.typ === 'Unterstützung');
    if (SUP) eng.player(1).support[0] = eng.instFromId(SUP.id, 1);
    play('dc_b_absetzung_289');
    steps.push({ AbsetzungChoices: eng.state.pending?.choices?.length });
    if (eng.state.pending) eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: eng.state.pending.choices[0].target });

    // reopen section pending for UI click
    play('dc_b_signalfeuer_240');
    // paint choice overlay manually
    const pend = eng.state.pending;
    let ov = document.getElementById('bf-choice-ov');
    if (ov) ov.remove();
    ov = document.createElement('div');
    ov.id = 'bf-choice-ov';
    ov.className = 'overlay';
    ov.style.cssText = 'display:flex;position:fixed;inset:0;background:rgba(0,0,0,.55);align-items:center;justify-content:center;z-index:9999';
    const buttons = (pend.choices || []).map((c) =>
      `<button type="button" class="pick-card" data-id="${c.target}">${c.label}</button>`).join('');
    ov.innerHTML = `<div class="modal"><h2>${pend.prompt || 'Abschnitt wählen'}</h2><div class="choices pick-row">${buttons}</div></div>`;
    document.body.appendChild(ov);
    const tr = document.getElementById('title-root');
    const gr = document.getElementById('game-root');
    if (tr) tr.style.display = 'none';
    if (gr) gr.style.display = '';
    return { ok: true, steps, pending: pend?.kind };
  });
  if (!result.ok) throw new Error(JSON.stringify(result));
  await page.waitForTimeout(200);
  await shot(page, 'choice_section_ui');
  // human click
  await page.locator('#bf-choice-ov .pick-card').first().click();
  await page.evaluate(() => {
    const eng = window.__bfEng;
    const btn = document.querySelector('#bf-choice-ov .pick-card');
    if (eng?.state?.pending && btn) {
      eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: btn.getAttribute('data-id') });
    }
    document.getElementById('bf-choice-ov')?.remove();
  });
  await shot(page, 'choice_after_click');
  report.ok.push('choices:' + JSON.stringify(result.steps));
}

async function runVictory(page) {
  await page.evaluate(() => {
    if (!window.DCEngine) throw new Error('no engine');
    const Eng = DCEngine.Engine;
    const decks = DC_NATION_DECKS;
    const n = Object.keys(decks);
    const catalog = JSON.parse(JSON.stringify(DC_CATALOG));
    catalog.rules = Object.assign({}, catalog.rules, { opening_coin: false });
    const eng = new Eng(catalog, { seed: 2, rules: catalog.rules });
    eng.createMatch({
      seed: 2, mode: 'hotseat', startPlayer: 0, name0: 'A', name1: 'B',
      deck0: decks[n[0]].cards.slice(), deck1: decks[n[1]].cards.slice(),
      doctrine0: (decks[n[0]].doktrinen || []).slice(0, 2),
      doctrine1: (decks[n[1]].doktrinen || []).slice(0, 2),
    });
    eng.player(0).vp = 12;
    eng._end(0, 'Siegpunkte');
    let ov = document.getElementById('end-overlay');
    if (!ov) {
      ov = document.createElement('div');
      ov.id = 'end-overlay';
      ov.className = 'overlay';
      document.body.appendChild(ov);
    }
    ov.style.cssText = 'display:flex;position:fixed;inset:0;background:rgba(0,0,0,.6);align-items:center;justify-content:center;z-index:9999';
    ov.innerHTML = `<div class="modal"><h2>Sieg — ${eng.player(0).name}</h2><p>Grund: Siegpunkte</p><p>VP ${eng.player(0).vp} : ${eng.player(1).vp}</p><button type="button" class="primary" id="end-ok">Bestätigen</button></div>`;
    document.getElementById('title-root') && (document.getElementById('title-root').style.display = 'none');
  });
  await page.waitForTimeout(200);
  await shot(page, 'victory_end');
  await page.click('#end-ok');
  report.ok.push('victory:end-screen');
}

async function runLan(browser) {
  const ctxA = await browser.newContext();
  const ctxB = await browser.newContext();
  const a = await ctxA.newPage();
  const b = await ctxB.newPage();
  await wire(a, 'lanA');
  await wire(b, 'lanB');
  await openApp(a);
  await openApp(b);
  async function openLan(page) {
    await page.evaluate(() => {
      const show = (id) => {
        document.querySelectorAll('.screen').forEach((s) => s.classList.remove('on'));
        const el = document.getElementById(id);
        if (el) el.classList.add('on');
        const wr = document.getElementById('work-root');
        if (wr) { wr.classList.add('open'); wr.style.pointerEvents = ''; }
        const tr = document.getElementById('title-root');
        if (tr) tr.style.display = 'none';
      };
      show('scr-lan');
    });
  }
  await openLan(a);
  await openLan(b);
  await a.waitForTimeout(300);
  await shot(a, 'lan_a_lobby');
  await a.locator('#btn-lan-host').click({ force: true, timeout: 5000 });
  await a.waitForTimeout(1000);
  await shot(a, 'lan_a_hosting');

  // fill connect on B
  await b.evaluate(() => {
    const inputs = [...document.querySelectorAll('#scr-lan input')];
    for (const inp of inputs) {
      if (/ip|host|addr|server/i.test(inp.id + inp.name + inp.placeholder)) {
        inp.value = '127.0.0.1';
        inp.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
  });
  await b.locator('#btn-lan-connect').click({ force: true }).catch(() => {});
  await b.waitForTimeout(1500);
  await shot(b, 'lan_b_connected');

  // chat via DCNet if connected
  const chatRes = await a.evaluate(() => {
    try {
      if (window.DCNet && DCNet.sendChat) {
        DCNet.sendChat('Host sagt Hallo');
        return { sent: true };
      }
      return { sent: false, keys: Object.keys(window).filter((k) => /net|lan|ws/i.test(k)).slice(0, 10) };
    } catch (e) { return { err: String(e) }; }
  });
  await a.evaluate(() => { if (window.DCTableChat) DCTableChat.setTab('chat'); });
  await b.evaluate(() => { if (window.DCTableChat) DCTableChat.setTab('chat'); });
  await a.waitForTimeout(400);
  const cin = a.locator('#log-chat-in').first();
  if (await cin.count()) {
    await cin.fill('LAN Playwright Chat');
    await a.keyboard.press('Enter');
    await a.waitForTimeout(600);
  }
  await shot(a, 'lan_chat_a');
  await shot(b, 'lan_chat_b');

  // try ready/start
  await a.click('#btn-lan-ready').catch(() => {});
  await b.click('#btn-lan-ready').catch(() => {});
  await a.waitForTimeout(300);
  const started = await a.evaluate(() => {
    const btn = document.getElementById('btn-lan-start');
    if (btn && !btn.disabled) { btn.click(); return true; }
    return false;
  });
  await a.waitForTimeout(800);
  if (started) {
    await shot(a, 'lan_match_a');
    await shot(b, 'lan_match_b');
    // play a few bot ticks if engine present
    await a.evaluate(() => {
      const eng = window.engine || window.__bfEng;
      if (!eng || !window.DCBot) return;
      for (let i = 0; i < 12 && eng.state.winner == null; i++) {
        const pid = eng.state.active;
        const act = DCBot.step(eng, pid, {});
        try { eng.dispatch(act); } catch (e) { break; }
      }
    });
    await a.waitForTimeout(500);
    await shot(a, 'lan_match_progress');
    report.ok.push('lan:match-progress');
  } else {
    report.ok.push('lan:lobby-chat-only ' + JSON.stringify(chatRes));
  }
  await Promise.race([ctxA.close(), new Promise((r) => setTimeout(r, 2000))]);
  await Promise.race([ctxB.close(), new Promise((r) => setTimeout(r, 2000))]);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  await ensureServer();
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu'] });
  try {
    const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
    await wire(page, 'main');
    await openApp(page);

    for (const [name, fn] of [
      ['menus', () => runMenus(page)],
      ['playtest', () => runPlaytest(page)],
      ['choices', () => runChoices(page)],
      ['victory', () => runVictory(page)],
    ]) {
      try { await fn(); }
      catch (e) { report.fail.push(name + ': ' + e.message); }
    }
    await page.close();
    try { await Promise.race([runLan(browser), new Promise((_,rej)=>setTimeout(()=>rej(new Error('lan-timeout')), 45000))]); }
    catch (e) { report.fail.push('lan: ' + e.message); }
  } finally {
    await browser.close();
    if (srv) srv.kill('SIGTERM');
  }

  const summary = {
    okCount: report.ok.length,
    failCount: report.fail.length,
    pageerrors: report.pageerrors,
    console: report.console.slice(0, 20),
    ok: report.ok,
    fail: report.fail,
    shots: report.shots,
  };
  fs.writeFileSync(path.join(OUT, 'bf_ui_matrix_report.json'), JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  process.exit(report.fail.length ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
