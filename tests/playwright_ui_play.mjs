#!/usr/bin/env node
/**
 * t256: Echter Browser-Durchlauf der Oberfläche (Playwright + Chromium, nicht Teil von `npm test`).
 *
 * Aufruf von der Repo-Wurzel:  npm run ui-play
 * Umgebungsvariablen:
 *   DC_UI_GAMES   Anzahl kompletter Partien Mensch gegen Bot (Standard 3)
 *   DC_UI_SEED    Startwert für Math.random im Browser (Standard 256)
 *   DC_UI_OUT     Ordner für Screenshots und Bericht (Standard /workspace/t256-ui)
 *   DC_UI_PORT    Port für server.py (Standard 18000 + Zufall)
 *   DC_UI_MAXTURNS Zuggrenze pro Partie (Standard 120)
 *
 * Prüft:
 *  1. Hauptmenü, Bibliothek/Deckbau, Optionen, Hilfe, Benutzer, Einzelspieler, LAN-Lobby:
 *     jede sichtbare Schaltfläche wird angeklickt, danach Rückkehr zum Bildschirm.
 *  2. Spielbildschirm: Protokoll, Chat-Tab, Optionen, Playtest-Panel, Zugende.
 *  3. Partien über die Oberfläche: Einheiten per Klick UND per Ziehen in die Front,
 *     Unterstützung, Ausrüstung, Soforteinsätze, Angriffe, Support-Fähigkeiten, alle
 *     Auswahl-Dialoge. Nach jedem Legen: Karte liegt in der Engine UND als DOM-Karte im Feld.
 *  4. Keine Konsolenfehler, keine unbehandelten Ausnahmen, keine kaputten Bilder.
 *  5. Aufgeben, Frieden anbieten und Hauptmenü am Ende.
 * Exit-Code 1 bei jedem Fehler. Bericht: <OUT>/ui_play_report.json
 */
import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const GAME_DIR = path.join(ROOT, 'Division_Command');
const OUT = process.env.DC_UI_OUT || '/workspace/t256-ui';
const GAMES = Number(process.env.DC_UI_GAMES || 3);
const SEED = Number(process.env.DC_UI_SEED || 256);
const MAX_TURNS = Number(process.env.DC_UI_MAXTURNS || 120);
const PORT = Number(process.env.DC_UI_PORT || (18000 + Math.floor(Math.random() * 1500)));
const BASE = 'http://127.0.0.1:' + PORT;

const report = {
  ok: [], fail: [], console: [], pageerrors: [], brokenImages: [], shots: [],
  plays: { unitClick: 0, unitDrag: 0, support: 0, equip: 0, instant: 0, attack: 0, ability: 0, choices: 0 },
  games: [],
};
let shotNo = 0;
let srv = null;

/**
 * Wartet, bis der HTTP-Server antwortet.
 * @param {string} url
 * @param {number} [ms]
 * @returns {Promise<void>}
 */
function waitHttp(url, ms = 20000) {
  const t0 = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      http.get(url, (res) => { res.resume(); resolve(); }).on('error', () => {
        if (Date.now() - t0 > ms) reject(new Error('server timeout'));
        else setTimeout(tick, 200);
      });
    };
    tick();
  });
}

/**
 * Startet Division_Command/server.py auf PORT.
 * @returns {Promise<void>}
 */
async function startServer() {
  srv = spawn('python3', [path.join(GAME_DIR, 'server.py'), '--port', String(PORT)], {
    cwd: GAME_DIR, stdio: ['ignore', 'ignore', 'pipe'], env: { ...process.env, PYTHONUNBUFFERED: '1' },
  });
  srv.stderr.on('data', () => {});
  await waitHttp(BASE + '/');
}

/**
 * Hält einen Fehler fest (Test läuft weiter, Exit-Code wird 1).
 * @param {string} where
 * @param {unknown} err
 */
function fail(where, err) {
  const msg = where + ': ' + (err && err.message ? err.message.split('\n')[0] : String(err));
  report.fail.push(msg);
  console.log('FAIL', msg);
}

/**
 * Screenshot mit laufender Nummer.
 * @param {import('playwright').Page} page
 * @param {string} name
 * @returns {Promise<string>}
 */
async function shot(page, name) {
  const p = path.join(OUT, String(++shotNo).padStart(3, '0') + '_' + name + '.png');
  await page.screenshot({ path: p }).catch(() => {});
  report.shots.push(p);
  return p;
}

/**
 * Hängt Konsolen-, Fehler- und Bild-Prüfungen an die Seite.
 * @param {import('playwright').Page} page
 * @param {string} tag
 */
function wire(page, tag) {
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const t = msg.text();
    report.console.push({ tag, text: t.slice(0, 300) });
  });
  page.on('pageerror', (err) => report.pageerrors.push({ tag, text: String(err && err.stack || err).slice(0, 500) }));
  page.on('requestfailed', (req) => {
    const u = req.url();
    if (/\.(png|jpe?g|webp|svg)(\?|$)/i.test(u)) report.brokenImages.push({ tag, url: u, why: req.failure() && req.failure().errorText });
  });
  page.on('response', (res) => {
    if (res.status() >= 400 && /\.(png|jpe?g|webp|svg|js|css)(\?|$)/i.test(res.url())) {
      report.brokenImages.push({ tag, url: res.url(), why: 'HTTP ' + res.status() });
    }
  });
}

/**
 * Sammelt sichtbare, fertig geladene Bilder ohne Pixel (kaputt).
 * @param {import('playwright').Page} page
 * @param {string} where
 */
async function checkImages(page, where) {
  const bad = await page.evaluate(() => [...document.images]
    .filter((im) => im.offsetParent && im.complete && im.getAttribute('src') && im.naturalWidth === 0)
    .map((im) => im.getAttribute('src')).slice(0, 10));
  bad.forEach((src) => report.brokenImages.push({ tag: where, url: src, why: 'naturalWidth 0' }));
}

/** @param {number} ms */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Liest den Spielstand für Entscheidungen des Testspielers.
 * @param {import('playwright').Page} page
 */
function gameState(page) {
  return page.evaluate(() => {
    const e = window.dcGetEngine && window.dcGetEngine();
    if (!e || !e.state) return null;
    const ov = document.getElementById('overlay');
    const ovOn = !!(ov && ov.style.display !== 'none' && getComputedStyle(ov).display !== 'none' && ov.innerHTML.trim());
    const layers = [...document.querySelectorAll('.modal-layer, .playtest-overlay, #end-overlay, .end-screen')]
      .filter((x) => getComputedStyle(x).display !== 'none' && x.offsetParent !== null).map((x) => x.id || x.className);
    const me = e.player(0);
    return {
      active: e.state.active, turn: e.state.turn, phase: e.state.phase, winner: e.state.winner,
      ended: e.state.winner != null || e.state.phase === 'ended' || !!e.state.endReason,
      pend: e.state.pending ? { kind: e.state.pending.kind, player: e.state.pending.player } : null,
      ap: me.ap, hold: !!window.dcTimerHold, busy: !!(window.dcEventBusy && window.dcEventBusy()), overlay: ovOn, overlayText: ovOn ? ov.textContent.slice(0, 80) : '', layers,
      hand: me.hand.map((c) => { const d = e.defOf(c); return { uid: c.uid, typ: d.typ, name: d.name, cost: e.costOf(d, me, null, c) }; }),
    };
  });
}

/**
 * Bedient ein offenes Overlay so, wie ein Mensch es täte (Auswahl, Bestätigen, Weiter).
 * @param {import('playwright').Page} page
 * @param {number} round
 * @returns {Promise<string|null>} geklickte Schaltfläche oder null
 */
async function handleOverlay(page, round) {
  const pick = await page.evaluate((r) => {
    const ov = document.getElementById('overlay');
    if (!ov || ov.style.display === 'none' || !ov.innerHTML.trim()) return null;
    const vis = (b) => b && b.offsetParent !== null && !b.disabled;
    const all = [...ov.querySelectorAll('button')].filter(vis);
    if (!all.length) return 'nobuttons:' + ov.textContent.slice(0, 40);
    const isCancel = (b) => /Abbrechen|Zurück|Cancel/i.test(b.textContent) || /cancel|-x$|^ac-x$/i.test(b.id || '');
    const choice = all.filter((b) => b.matches('.choices button, .pick-row button, [data-react], [data-id], [data-i], .pick-section')
      && !b.classList.contains('on') && !b.classList.contains('picked'));
    const confirm = all.find((b) => /confirm|^end-ok$|cw-ok|coin-start-ok|peek-ok|hp-ok|blk-ok|pend-empty-ok|react-pass/.test(b.id || ''));
    let target = null;
    if (r >= 6) target = all.find(isCancel) || all[0];
    else if (choice.length && !(r % 2 === 1 && confirm)) target = choice[0];
    else if (confirm) target = confirm;
    else target = all.find((b) => b.classList.contains('primary') && !isCancel(b)) || all.find((b) => !isCancel(b)) || all[0];
    target.setAttribute('data-ui-pick', '1');
    return (target.id || target.className || 'button') + ':' + target.textContent.trim().slice(0, 30);
  }, round);
  if (!pick) return null;
  if (pick.startsWith('nobuttons')) return pick;
  await page.click('[data-ui-pick="1"]', { timeout: 5000 }).catch(async (e) => {
    await page.evaluate(() => { const b = document.querySelector('[data-ui-pick="1"]'); if (b) b.click(); });
  });
  await page.evaluate(() => document.querySelectorAll('[data-ui-pick]').forEach((b) => b.removeAttribute('data-ui-pick')));
  report.plays.choices += 1;
  return pick;
}

/**
 * Wartet, bis der Mensch handeln kann (eigener Zug, kein Countdown, Overlays bedient).
 * Bedient dabei alle Overlays (auch Reaktionsfenster im Bot-Zug).
 * @param {import('playwright').Page} page
 * @param {number} ms
 * @returns {Promise<object|null>} Spielstand oder null bei Ende/Zeitüberschreitung
 */
async function waitHumanTurn(page, ms = 180000) {
  const t0 = Date.now();
  let round = 0;
  let lastKey = '';
  while (Date.now() - t0 < ms) {
    const st = await gameState(page);
    if (!st) { await sleep(200); continue; }
    if (st.ended) return st;
    const key = JSON.stringify([st.turn, st.active, st.pend, st.overlayText]);
    round = key === lastKey ? round + 1 : 0;
    lastKey = key;
    if (st.overlay) {
      if (/Der Krieg hat begonnen/.test(st.overlayText)) { await sleep(400); continue; }
      const live = await page.evaluate(() => !!document.querySelector('#overlay .recap-stage'));
      if (live && round < 60) { await sleep(250); continue; }
      if (live) {
        // Meldung steht 15 s unverändert: festhalten und per Klick überspringen (t256-Absicherung)
        report.recapStalls = (report.recapStalls || 0) + 1;
        const diag = await page.evaluate(() => new Promise((res) => {
          const ov = document.getElementById('overlay');
          const st = ov.querySelector('.recap-stage');
          const t0 = performance.now();
          setTimeout(() => res({ timerMs: Math.round(performance.now() - t0), stageClick: !!(st && st.onclick),
            n: document.querySelectorAll('#overlay').length, busy: window.dcEventBusy && window.dcEventBusy(),
            text: ov.textContent.slice(-60), pend: JSON.stringify(dcGetEngine().state.pending) }), 50);
        }));
        console.log('RECAP-STALL', JSON.stringify(diag));
        await page.click('#overlay .recap-stage', { timeout: 3000 }).catch(() => {});
        await sleep(300);
        continue;
      }
      await handleOverlay(page, round);
      await sleep(250);
      continue;
    }
    if (st.pend && st.pend.player === 0) {
      // Auswahl auf dem Brett (Stellung / Ziel)
      const clicked = await page.evaluate(() => {
        const s = document.querySelector('#my-front .slot.legal, .slot.legal-target, #my-front .slot.empty');
        if (s) { s.setAttribute('data-ui-pick', '1'); return true; }
        return false;
      });
      if (clicked && round < 4) {
        await page.click('[data-ui-pick="1"]', { timeout: 4000 }).catch(() => {});
        await page.evaluate(() => document.querySelectorAll('[data-ui-pick]').forEach((b) => b.removeAttribute('data-ui-pick')));
      } else if (round >= 4) {
        await page.evaluate(() => { const e = dcGetEngine(); const p = e.state.pending; if (p) window.dcRender(); });
        if (round > 12) throw new Error('Offene Auswahl ohne Bedienelement: ' + JSON.stringify(st.pend));
      }
      await sleep(250);
      continue;
    }
    if (st.active === 0 && !st.hold && !st.busy && st.phase === 'main' && !st.pend) return st;
    await sleep(250);
  }
  const dbg = await page.evaluate(() => (window.dcEventDebug ? window.dcEventDebug() : null)).catch(() => null);
  throw new Error('Zeitüberschreitung beim Warten auf den eigenen Zug: ' + JSON.stringify(await gameState(page)) + ' events=' + JSON.stringify(dbg));
}

/**
 * Spielt eine Handkarte per Klick (Karte antippen, dann leuchtendes Feld) oder per Ziehen.
 * Prüft das Ergebnis in Engine und DOM.
 * @param {import('playwright').Page} page
 * @param {{uid:string,typ:string,name:string,cost:number}} card
 * @param {'click'|'drag'} how
 * @param {string} tag
 * @returns {Promise<boolean>} true, wenn die Karte die Hand verlassen hat
 */
async function playHandCard(page, card, how, tag) {
  const el = page.locator(`#hand .card[data-uid="${card.uid}"]`);
  if (!(await el.count())) throw new Error('Handkarte fehlt im DOM: ' + card.name);
  await el.scrollIntoViewIfNeeded().catch(() => {});
  const cb = await el.boundingBox();
  if (!cb) throw new Error('Handkarte ohne Box: ' + card.name);
  const vp = page.viewportSize();
  if (cb.y + 10 > vp.height) throw new Error('Handkarte außerhalb des Bildes: ' + card.name + ' y=' + cb.y);
  const grabY = Math.min(cb.y + cb.height / 2, vp.height - 6);
  const legalSel = card.typ === 'Einheit' ? '#my-front .front-line .slot.empty'
    : card.typ === 'Unterstützung' ? '#my-support .slot.empty'
      : card.typ === 'Ausrüstung' ? '#my-front .slot.filled' : null;
  if (how === 'drag' && legalSel) {
    const target = page.locator(legalSel).first();
    if (!(await target.count())) return false;
    const tb = await target.boundingBox();
    await page.mouse.move(cb.x + cb.width / 2, grabY);
    await page.mouse.down();
    const steps = 14;
    for (let i = 1; i <= steps; i++) {
      await page.mouse.move(cb.x + cb.width / 2 + (tb.x + tb.width / 2 - cb.x - cb.width / 2) * i / steps,
        grabY + (tb.y + tb.height / 2 - grabY) * i / steps);
      await sleep(15);
    }
    await page.mouse.up();
  } else {
    await page.mouse.click(cb.x + cb.width / 2, grabY);
    await sleep(250);
    const legal = page.locator('.slot.legal');
    const n = await legal.count();
    if (!n) {
      // Soforteinsatz ohne Feldziel: zweiter Klick spielt nicht automatisch → abbrechen
      await page.mouse.click(cb.x + cb.width / 2, grabY);
      await sleep(150);
      return false;
    }
    // Einheiten: mittleres freies Feld bevorzugen, sonst das erste
    let pickIdx = 0;
    if (card.typ === 'Einheit') {
      pickIdx = await page.evaluate(() => {
        const l = [...document.querySelectorAll('.slot.legal')];
        const i = l.findIndex((s) => s.closest('#my-front') && s.getAttribute('data-section') === 'C');
        return i >= 0 ? i : 0;
      });
    }
    await legal.nth(pickIdx).click({ timeout: 5000 }).catch(async (e) => {
      const m = /<[^>]+> (?:from <[^>]+> subtree )?intercepts pointer events/.exec(e.message || '');
      throw new Error('Feld nicht klickbar' + (m ? ': ' + m[0].slice(0, 200) : ': ' + (e.message || '').split('\n')[0]));
    });
  }
  await sleep(400);
  const res = await page.evaluate((uid) => {
    const e = dcGetEngine();
    const me = e.player(0);
    const inHand = me.hand.some((c) => c.uid === uid);
    let zone = null;
    ['L', 'C', 'R'].forEach((s) => (me.front[s] || []).forEach((x) => { if (x && x.uid === uid) zone = 'front'; }));
    (me.support || []).forEach((x) => { if (x && x.uid === uid) zone = 'support'; });
    const domFront = !!document.querySelector(`#my-front .slot[data-uid="${uid}"]`);
    const domSupport = !!document.querySelector(`#my-support .slot[data-uid="${uid}"]`);
    const domHand = !!document.querySelector(`#hand .card[data-uid="${uid}"]`);
    const img = document.querySelector(`#my-front .slot[data-uid="${uid}"] img, #my-support .slot[data-uid="${uid}"] img`);
    return { inHand, zone, domFront, domSupport, domHand, hint: (document.getElementById('hint') || {}).textContent,
      pend: e.state.pending && e.state.pending.kind, img: img ? { src: img.getAttribute('src'), w: img.naturalWidth, complete: img.complete } : null };
  }, card.uid);
  if (card.typ === 'Einheit' && !res.inHand) {
    if (res.zone !== 'front') throw new Error(`${card.name} hat die Hand verlassen, liegt aber nicht in der Front (${JSON.stringify(res)})`);
    if (!res.domFront) throw new Error(`${card.name} liegt in der Engine-Front, aber nicht im DOM (${JSON.stringify(res)})`);
    if (res.domHand) throw new Error(`${card.name} liegt gelegt, wird aber noch in der Hand gezeichnet`);
  }
  if (card.typ === 'Einheit' && res.inHand && !res.pend) {
    throw new Error(`${card.name} (${how}) wurde nicht gelegt: ${res.hint}`);
  }
  if (card.typ === 'Unterstützung' && !res.inHand && res.zone === 'support' && !res.domSupport) {
    throw new Error(`${card.name} im Support der Engine, aber nicht im DOM`);
  }
  if (!res.inHand) {
    if (card.typ === 'Einheit') report.plays[how === 'drag' ? 'unitDrag' : 'unitClick'] += 1;
    else if (card.typ === 'Unterstützung') report.plays.support += 1;
    else if (card.typ === 'Ausrüstung') report.plays.equip += 1;
    else report.plays.instant += 1;
    if (card.typ === 'Einheit' && (report.plays.unitClick + report.plays.unitDrag) <= 2) {
      // Meldung abwarten, Maus aus dem Brett, dann das gelegte Feld fotografieren
      await page.waitForFunction(() => !(window.dcEventBusy && window.dcEventBusy()), null, { timeout: 60000 }).catch(() => {});
      await page.mouse.move(5, 5);
      await sleep(400);
      await shot(page, tag + '_unit_in_front_' + how);
    }
  }
  return !res.inHand;
}

/**
 * Spielt Soforteinsätze, die ein Ziel auf dem Brett brauchen (Karte antippen, Ziel antippen).
 * @param {import('playwright').Page} page
 * @param {{uid:string,name:string}} card
 * @returns {Promise<boolean>}
 */
async function playInstant(page, card) {
  return playHandCard(page, card, 'click', 'instant');
}

/**
 * Greift mit einer eigenen Einheit an (Einheit antippen → „Angreifen“ → Ziel).
 * @param {import('playwright').Page} page
 * @returns {Promise<boolean>}
 */
async function tryAttack(page) {
  const uids = await page.evaluate(() => {
    const e = dcGetEngine();
    return (e.listActions(0) || []).filter((a) => a.type === 'ATTACK').map((a) => a.uid);
  });
  for (const uid of uids.slice(0, 3)) {
    const slot = page.locator(`#my-front .slot[data-uid="${uid}"]`);
    if (!(await slot.count())) throw new Error('Angreifer ohne DOM-Feld ' + uid);
    const before = await page.evaluate(() => dcGetEngine().state.seq || dcGetEngine().log.length);
    await slot.click({ timeout: 5000 });
    await sleep(300);
    const btn = page.locator('#overlay button:not([disabled])').filter({ hasText: /Angreifen|Angriff/ }).first();
    if (!(await btn.count())) {
      await page.keyboard.press('Escape').catch(() => {});
      await handleOverlay(page, 9);
      continue;
    }
    await btn.click({ timeout: 5000 });
    await sleep(300);
    for (let r = 0; r < 8; r++) {
      const st = await gameState(page);
      if (!st || st.ended) return true;
      if (st.overlay) { await handleOverlay(page, r); await sleep(250); continue; }
      if (st.pend && st.pend.player === 0) {
        const t = page.locator('.slot.legal-target').first();
        if (await t.count()) { await t.click({ timeout: 4000 }).catch(() => {}); await sleep(250); continue; }
      }
      break;
    }
    const after = await page.evaluate(() => dcGetEngine().state.seq || dcGetEngine().log.length);
    if (after !== before) { report.plays.attack += 1; return true; }
  }
  return false;
}

/**
 * Aktiviert eine Support-Fähigkeit über den Dialog, wenn die Engine sie anbietet.
 * @param {import('playwright').Page} page
 * @returns {Promise<boolean>}
 */
async function tryAbility(page) {
  const uid = await page.evaluate(() => {
    const e = dcGetEngine();
    const a = (e.listActions(0) || []).find((x) => x.type === 'ACTIVATE_SUPPORT');
    return a ? a.uid : null;
  });
  if (!uid) return false;
  // t271: ACTIVATE_SUPPORT ist das Neutralisieren eines gegnerischen Supports (Schläferzelle);
  // das Feld liegt daher in #enemy-support, der Dialog im Karten-Inspektor (#inspect).
  const slot = page.locator(`#my-support .slot[data-uid="${uid}"], #enemy-support .slot[data-uid="${uid}"], #enemy-support [data-uid="${uid}"]`).first();
  if (!(await slot.count())) throw new Error('Support ohne DOM-Feld ' + uid);
  await slot.click({ timeout: 5000 });
  await sleep(300);
  const btn = page.locator('#overlay button:not([disabled]), #inspect button:not([disabled])').filter({ hasText: /Fähigkeit|Neutralisieren|Aktivieren/ }).first();
  if (!(await btn.count())) { await handleOverlay(page, 9); return false; }
  await btn.click({ timeout: 5000 });
  await sleep(300);
  report.plays.ability += 1;
  return true;
}

/**
 * Prüft, dass das Brett gezeichnet ist (Felder, Karten, Bilder).
 * @param {import('playwright').Page} page
 * @param {string} where
 */
async function checkBoard(page, where) {
  const b = await page.evaluate(() => {
    const e = dcGetEngine();
    const cnt = (sel) => document.querySelectorAll(sel).length;
    const engFront = (p) => ['L', 'C', 'R'].reduce((n, s) => n + (e.player(p).front[s] || []).filter(Boolean).length, 0);
    return {
      mySlots: cnt('#my-front .front-line .slot'), enemySlots: cnt('#enemy-front .front-line .slot'),
      myFilled: cnt('#my-front .slot[data-uid]'), enemyFilled: cnt('#enemy-front .slot[data-uid]'),
      engMine: engFront(0), engEnemy: engFront(1),
      hand: cnt('#hand .card'), engHand: e.player(0).hand.length,
    };
  });
  if (b.mySlots !== 9 || b.enemySlots !== 9) throw new Error(where + ': Front nicht 3×3 gezeichnet ' + JSON.stringify(b));
  if (b.myFilled !== b.engMine || b.enemyFilled !== b.engEnemy) throw new Error(where + ': DOM-Front ≠ Engine-Front ' + JSON.stringify(b));
  if (b.hand !== b.engHand) throw new Error(where + ': DOM-Hand ≠ Engine-Hand ' + JSON.stringify(b));
  await checkImages(page, where);
}

/**
 * Öffnet die App frisch und legt (falls nötig) eine Benutzerakte an.
 * @param {import('playwright').BrowserContext} ctx
 * @param {string} tag
 */
async function openApp(ctx, tag) {
  const page = await ctx.newPage();
  wire(page, tag);
  await page.goto(BASE + '/', { waitUntil: 'load' });
  await page.waitForSelector('#go-start, #scr-title.on', { timeout: 20000 });
  if (await page.locator('#scr-boot.on #go-start').count()) await page.click('#go-start');
  await sleep(300);
  if (await page.locator('#scr-setup.on').count()) {
    await page.fill('#setup-name', 'Test, Tester');
    await page.click('#setup-ok');
  }
  await page.waitForSelector('#scr-title.on', { timeout: 10000 });
  return page;
}

/**
 * Klickt alle sichtbaren Schaltflächen eines Bildschirms; danach zurück auf den Bildschirm.
 * @param {import('playwright').Page} page
 * @param {string} entry Selektor im Hauptmenü
 * @param {string} screen Bildschirm-ID
 * @param {string[]} skip IDs, die nicht geklickt werden (Navigation/Beenden)
 */
async function clickAllOnScreen(page, entry, screen, skip) {
  const goScreen = async () => {
    if (await page.locator(`#${screen}.on`).count()) return;
    await page.evaluate(() => {
      document.querySelectorAll('.modal-layer, .playtest-overlay').forEach((m) => { m.style.display = 'none'; });
      const ov = document.getElementById('overlay'); if (ov) ov.style.display = 'none';
    });
    if (!(await page.locator('#scr-title.on').count())) {
      const back = page.locator('.screen.on button.back').first();
      if (await back.count()) await back.click({ timeout: 3000 }).catch(() => {});
      await sleep(250);
    }
    await page.click(entry, { timeout: 5000 });
    await sleep(350);
  };
  await goScreen();
  await shot(page, 'menu_' + screen);
  const ids = await page.evaluate((scr) => {
    const root = document.getElementById(scr);
    return [...root.querySelectorAll('button')].filter((b) => b.offsetParent !== null).map((b, i) => {
      if (!b.id) b.setAttribute('data-ui-k', scr + '-' + i);
      return b.id ? '#' + b.id : `[data-ui-k="${scr}-${i}"]`;
    });
  }, screen);
  let clicked = 0;
  for (const sel of ids) {
    if (skip.some((s) => sel === '#' + s)) continue;
    await goScreen();
    const loc = page.locator(sel).first();
    if (!(await loc.count()) || !(await loc.isVisible()) || !(await loc.isEnabled())) continue;
    try {
      await loc.click({ timeout: 4000 });
      clicked += 1;
      await sleep(250);
      // Dialog schließen
      for (let k = 0; k < 3; k++) {
        const close = page.locator('.modal-layer:visible button, .playtest-overlay:visible button, #overlay:visible button').filter({ hasText: /Zurück|Abbrechen|Schließen|Verstanden|OK|×/ }).first();
        if (await close.count()) { await close.click({ timeout: 2000 }).catch(() => {}); await sleep(150); } else break;
      }
    } catch (e) { fail(`click ${screen} ${sel}`, e); }
  }
  report.ok.push(`menu:${screen}:${clicked} Schaltflächen`);
}

/**
 * Menüs, Bibliothek, Optionen, Hilfe, Benutzer, Einzelspieler, LAN-Lobby.
 * @param {import('playwright').BrowserContext} ctx
 */
async function runMenus(ctx) {
  const page = await openApp(ctx, 'menus');
  await shot(page, 'title');
  const titleBtns = await page.evaluate(() => [...document.querySelectorAll('#scr-title button')].filter((b) => b.offsetParent).map((b) => b.id));
  report.ok.push('title-buttons:' + titleBtns.join(','));
  await clickAllOnScreen(page, '#go-hilfe', 'scr-hilfe', ['back-hilfe']);
  await clickAllOnScreen(page, '#go-library', 'scr-library', ['back-lib']);
  // Bibliothek: Karten anklicken, Nation/Seltenheitsfilter umstellen
  try {
    await page.click('#go-library').catch(() => {});
    await sleep(400);
    const selects = await page.locator('#scr-library select:visible').count();
    for (let i = 0; i < selects; i++) {
      const s = page.locator('#scr-library select:visible').nth(i);
      const n = await s.locator('option').count();
      if (n > 1) await s.selectOption({ index: Math.min(1, n - 1) });
      await sleep(200);
    }
    const tiles = page.locator('#scr-library .lib-card, #scr-library .card, #scr-library [data-id]');
    const tn = await tiles.count();
    for (let i = 0; i < Math.min(tn, 3); i++) {
      await tiles.nth(i).click({ timeout: 3000 }).catch(() => {});
      await sleep(200);
      await page.keyboard.press('Escape').catch(() => {});
      const close = page.locator('.modal-layer:visible button, #overlay:visible button').filter({ hasText: /Zurück|Schließen/ }).first();
      if (await close.count()) await close.click().catch(() => {});
    }
    await checkImages(page, 'library');
    await shot(page, 'library_filtered');
    report.ok.push(`library:selects=${selects}, tiles=${tn}`);
  } catch (e) { fail('library', e); }
  await clickAllOnScreen(page, '#go-options', 'scr-options', ['back-opt']);
  await clickAllOnScreen(page, '#go-user', 'scr-user', ['back-user', 'user-add']);
  await clickAllOnScreen(page, '#go-single', 'scr-single', ['back-single', 'btn-start']);
  await clickAllOnScreen(page, '#go-lan', 'scr-lan', ['back-lan', 'btn-lan-start', 'btn-lan-leave']);
  await shot(page, 'lan_after_clicks');
  // Playtest-Panel aus dem Titel
  try {
    await page.evaluate(() => { document.querySelectorAll('.screen').forEach((s) => s.classList.remove('on')); });
    await page.goto(BASE + '/');
    await page.waitForSelector('#scr-title.on, #go-start', { timeout: 15000 });
    if (await page.locator('#scr-boot.on #go-start').count()) await page.click('#go-start');
    await page.click('#go-playtest', { timeout: 5000 });
    await sleep(400);
    await shot(page, 'playtest_panel');
    const x = page.locator('.playtest-x').first();
    if (await x.count()) await x.click().catch(() => {});
    report.ok.push('playtest-panel');
  } catch (e) { fail('playtest-panel', e); }
  await page.close();
}

/**
 * Startet eine Partie Mensch gegen Bot über das Einzelspieler-Menü.
 * @param {import('playwright').Page} page
 */
async function startSingle(page) {
  await page.click('#go-single');
  await sleep(250);
  await page.click('#btn-single-ready');
  await page.click('#btn-start', { timeout: 5000 });
  await page.waitForFunction(() => window.dcGetEngine && window.dcGetEngine() && window.dcGetEngine().state, null, { timeout: 15000 });
  // Bot schneller, Ablauf sonst unverändert
  await page.evaluate(() => { if (window.DCBot && DCBot.cfg) DCBot.cfg.delayMs = 60; });
  // Münzwurf muss nach dem Countdown sichtbar und klickbar sein
  await page.waitForSelector('#coin-start-ok', { state: 'visible', timeout: 25000 });
  await shot(page, 'coin_visible');
  await page.click('#coin-start-ok');
}

/**
 * Ein Zug des Testspielers: Karten legen, angreifen, Fähigkeit, Zugende.
 * @param {import('playwright').Page} page
 * @param {number} g Partienummer
 * @param {number} turnNo
 */
async function humanTurn(page, g, turnNo) {
  let tries = 0;
  const tried = new Set();
  while (tries++ < 12) {
    const st = await gameState(page);
    if (!st || st.ended || st.active !== 0 || st.pend || st.overlay) break;
    const playable = st.hand.filter((c) => c.cost <= st.ap && !tried.has(c.uid));
    const order = ['Einheit', 'Unterstützung', 'Ausrüstung', 'Soforteinsatz'];
    playable.sort((a, b) => order.indexOf(a.typ) - order.indexOf(b.typ));
    const card = playable[0];
    if (!card) break;
    tried.add(card.uid);
    const how = card.typ === 'Einheit' && ((turnNo + g) % 2 === 1) ? 'drag' : 'click';
    try {
      if (card.typ === 'Soforteinsatz') await playInstant(page, card);
      else await playHandCard(page, card, how, `g${g}`);
    } catch (e) { fail(`g${g} t${turnNo} spielen ${card.typ} ${card.name}`, e); await shot(page, `g${g}_fail_play`); }
    await waitHumanTurn(page, 120000).catch((e) => fail(`g${g} nach Karte`, e));
  }
  try { await tryAbility(page); await waitHumanTurn(page, 120000); } catch (e) { fail(`g${g} t${turnNo} Fähigkeit`, e); }
  for (let a = 0; a < 3; a++) {
    try {
      const st = await gameState(page);
      if (!st || st.ended || st.active !== 0) break;
      if (!(await tryAttack(page))) break;
      await waitHumanTurn(page, 120000);
    } catch (e) { fail(`g${g} t${turnNo} Angriff`, e); break; }
  }
  const st = await gameState(page);
  if (st && !st.ended && st.active === 0) {
    try { await checkBoard(page, `g${g}t${turnNo}`); } catch (e) { fail('board', e); await shot(page, `g${g}_fail_board`); }
    if (turnNo === 3 || turnNo === 8) await shot(page, `g${g}_board_turn${turnNo}`);
    await page.click('#btn-end', { timeout: 5000 });
    await sleep(200);
  }
}

/**
 * Eine komplette Partie Mensch gegen Bot über die Oberfläche.
 * @param {import('playwright').BrowserContext} ctx
 * @param {number} g
 * @param {'play'|'concede'|'peace'} variant
 */
async function runGame(ctx, g, variant) {
  const page = await openApp(ctx, 'game' + g);
  const t0 = Date.now();
  try {
    await startSingle(page);
    let turnNo = 0;
    let st = await waitHumanTurn(page);
    await shot(page, `g${g}_first_turn`);
    if (variant === 'play' && g === 1) {
      // Tisch-Schaltflächen
      for (const id of ['btn-log', 'btn-opts']) {
        await page.click('#' + id, { timeout: 4000 }).catch((e) => fail('ingame ' + id, e));
        await sleep(250);
        await shot(page, 'ingame_' + id);
        const close = page.locator('#opt-ingame-close:visible, #ingame-opts button:visible').filter({ hasText: /Zurück/ }).first();
        if (await close.count()) await close.click().catch(() => {});
        if (id === 'btn-log') {
          await page.click('#log-tab-chat').catch(() => {});
          await page.click('#log-tab-proto').catch(() => {});
          await page.click('#btn-log').catch(() => {});
        }
      }
      await page.click('#hud-more summary').catch(() => {});
      await page.click('#btn-playtest', { timeout: 5000 }).catch((e) => fail('ingame playtest', e));
      await sleep(250);
      await page.locator('.playtest-x').first().click().catch(() => {});
      report.ok.push('ingame-buttons');
    }
    if (variant === 'concede') {
      page.once('dialog', (d) => d.accept());
      await page.click('#hud-more summary').catch(() => {});
      await page.locator('#btn-concede').click({ timeout: 4000 });
      await sleep(600);
      for (let r = 0; r < 4; r++) { await handleOverlay(page, 1); await sleep(200); }
    } else if (variant === 'peace') {
      await page.click('#hud-more summary').catch(() => {});
      await page.locator('#btn-peace').click({ timeout: 4000 }).catch((e) => fail('peace', e));
      await sleep(800);
      report.ok.push('peace-offered');
      await page.click('#btn-end').catch(() => {});
    }
    while (st && !st.ended && turnNo < MAX_TURNS) {
      turnNo += 1;
      await humanTurn(page, g, turnNo);
      st = await waitHumanTurn(page, 120000);
      if (variant === 'peace' && turnNo >= 2) break;
    }
    st = await gameState(page);
    await sleep(800);
    await shot(page, `g${g}_end`);
    const end = await page.evaluate(() => {
      const e = dcGetEngine();
      const vis = [...document.querySelectorAll('#end-overlay, .end-screen, .end-modal, [class*="end-"]')]
        .some((x) => x.offsetParent !== null && getComputedStyle(x).display !== 'none');
      return { winner: e && e.state.winner, reason: e && e.state.endReason, turn: e && e.state.turn, endVisible: vis,
        vp: e && e.state.players.map((p) => p.vp) };
    });
    report.games.push({ g, variant, turns: turnNo, ms: Date.now() - t0, ...end });
    if (variant === 'play') {
      if (end.winner == null) fail(`g${g}`, new Error('Partie nicht beendet nach ' + turnNo + ' Zügen'));
      else if (!end.endVisible) fail(`g${g}`, new Error('Endbildschirm nicht sichtbar'));
      else report.ok.push(`game${g}: Sieger ${end.winner} (${end.reason}) nach ${turnNo} eigenen Zügen`);
    }
    if (variant === 'concede') {
      if (end.winner !== 1) fail('concede', new Error('Aufgeben beendet die Partie nicht: ' + JSON.stringify(end)));
      else report.ok.push('concede');
      // Hauptmenü aus dem Endbild
      const menu = page.locator('button:visible').filter({ hasText: /Hauptmenü|Menü/ }).first();
      if (await menu.count()) {
        await menu.click().catch(() => {});
        await sleep(500);
        if (await page.locator('#scr-title.on, #scr-single.on').count()) report.ok.push('end->menu');
        else fail('end->menu', new Error('Kein Menü nach Endbild'));
      }
    }
  } catch (e) {
    fail(`game${g}`, e);
    await shot(page, `g${g}_exception`);
  }
  await page.close();
}

/**
 * Programmeinstieg.
 */
async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  for (const f of fs.readdirSync(OUT)) if (/^\d{3}_.*\.png$/.test(f)) fs.unlinkSync(path.join(OUT, f));
  await startServer();
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const mk = () => browser.newContext({ viewport: { width: 1600, height: 900 }, serviceWorkers: 'block' })
    .then(async (ctx) => {
      await ctx.addInitScript((seed) => {
        let x = seed >>> 0;
        Math.random = function () { x = (Math.imul(x, 1664525) + 1013904223) >>> 0; return x / 4294967296; };
        // Animationen über die Nutzeroptionen verkürzen (Flug 50 ms, Meldung 400 ms = Minimum)
        try { localStorage.setItem('dc_fly', '50'); localStorage.setItem('dc_dialog', '400'); } catch (e) {}
      }, SEED + report.games.length * 7919);
      return ctx;
    });
  try {
    let ctx = await mk();
    await runMenus(ctx).catch((e) => fail('menus', e));
    await ctx.close();
    for (let g = 1; g <= GAMES; g++) {
      ctx = await mk();
      await runGame(ctx, g, 'play');
      await ctx.close();
    }
    ctx = await mk();
    await runGame(ctx, GAMES + 1, 'concede');
    await ctx.close();
    ctx = await mk();
    await runGame(ctx, GAMES + 2, 'peace');
    await ctx.close();
  } finally {
    await browser.close();
    if (srv) srv.kill('SIGTERM');
  }
  const ignorable = (t) => /Service Worker registration blocked/i.test(t);
  report.console = report.console.filter((c) => !ignorable(c.text));
  if (report.console.length) fail('console', new Error(report.console.length + ' Konsolenfehler, z. B. ' + report.console[0].text));
  if (report.pageerrors.length) fail('pageerror', new Error(report.pageerrors.length + ' Ausnahmen, z. B. ' + report.pageerrors[0].text));
  if (report.brokenImages.length) fail('images', new Error(report.brokenImages.length + ' kaputte Bilder/Dateien, z. B. ' + JSON.stringify(report.brokenImages[0])));
  if (report.plays.unitClick < 1 || report.plays.unitDrag < 1) fail('plays', new Error('Einheiten nicht per Klick und Ziehen gelegt: ' + JSON.stringify(report.plays)));
  fs.writeFileSync(path.join(OUT, 'ui_play_report.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ ok: report.ok, fail: report.fail, plays: report.plays, games: report.games,
    shots: report.shots.length, out: OUT }, null, 2));
  process.exit(report.fail.length ? 1 : 0);
}

main().catch((e) => { console.error(e); if (srv) srv.kill('SIGTERM'); process.exit(1); });
