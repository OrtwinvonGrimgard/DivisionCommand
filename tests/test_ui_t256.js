/**
 * t256: Regressionen aus dem Browser-Durchlauf (tests/playwright_ui_play.mjs), ohne Chromium.
 *  1. Bot-Proben (cloneEngine) laufen nie über eigene dispatch-Hooks der Oberfläche
 *     (Playtest-Logger, LAN). Vorher: Proben veränderten den echten Stand, und der Logger rief
 *     pro Probe erneut DCBot.step → Rekursion, Browser hing beim Legen einer Karte.
 *  2. Mit eingehängtem Logger (botSuggest → DCBot.step) legt eine Einheit schnell und korrekt.
 *  3. „Gefecht beginnen“ startet nur einmal; Countdown zeigt danach den Münzwurf; der Bot wartet
 *     auf „Los“; Meldungen zeigen gegnerische Ziehkarten verdeckt.
 *  4. server.py: /api/quit beim Neuladen (pagehide + neue Anfrage) beendet den Server nicht.
 * Läuft über `npm test` von der Repo-Wurzel.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { spawn } = require('node:child_process');
const { setup } = require('./test_audio_actions.js');
const WEB = path.join(__dirname, '../Division_Command/web');

/**
 * Neue Partie im jsdom-Fenster.
 * @param {object} w Fenster
 * @param {number} seed
 * @returns {object} Engine
 */
function newMatch(w, seed) {
  const C = JSON.parse(JSON.stringify(w.DC_CATALOG));
  const eng = new w.DCEngine.Engine(C, { seed, rules: C.rules });
  const d = w.DC_NATION_DECKS, n = Object.keys(d);
  eng.createMatch({ seed, mode: 'bot', startPlayer: 0, name0: 'A', name1: 'B',
    deck0: d[n[seed % n.length]].cards.slice(), deck1: d[n[(seed + 3) % n.length]].cards.slice(),
    doctrine0: d[n[seed % n.length]].doktrinen.slice(0, 2), doctrine1: d[n[(seed + 3) % n.length]].doktrinen.slice(0, 2) });
  eng.state.startCoin = null;
  return eng;
}

// 1. cloneEngine ignoriert eigene Hooks
{
  const { w } = setup('off');
  w.eval(fs.readFileSync(path.join(WEB, 'js/ai/bot.js'), 'utf8'));
  for (let seed = 1; seed <= 4; seed++) {
    const eng = newMatch(w, seed);
    const raw = eng.dispatch.bind(eng);
    let hookCalls = 0, depth = 0, maxDepth = 0;
    eng.dispatch = function (a) { // wie installPlayLogger: Vorschlag vor jeder Aktion
      hookCalls++; depth++; maxDepth = Math.max(maxDepth, depth);
      if (depth > 2) { depth--; throw new Error('Hook-Rekursion'); } // schnell scheitern statt hängen
      try { w.DCBot.step(eng, a.player); return raw(a); } finally { if (depth > 0) depth--; }
    };
    eng._playLogHooked = true;
    for (let i = 0; i < 25 && eng.state.winner == null; i++) {
      const pid = eng.state.pending ? eng.state.pending.player : eng.state.active;
      const before = JSON.stringify(eng.state);
      const callsBefore = hookCalls;
      const act = w.DCBot.step(eng, pid) || { type: 'END_TURN', player: pid };
      assert.equal(hookCalls, callsBefore, 'DCBot.step ruft den UI-Hook nicht auf (Seed ' + seed + ')');
      assert.equal(JSON.stringify(eng.state), before, 'DCBot.step verändert den echten Stand nicht');
      act.player = pid;
      const r = eng.dispatch(act);
      if (!r || !r.ok) eng.dispatch({ type: eng.state.pending ? 'CANCEL_PENDING' : 'END_TURN', player: pid });
    }
    assert.equal(maxDepth, 1, 'keine verschachtelten Hook-Aufrufe');
  }
  console.log('ok t256 Bot-Proben laufen ohne UI-Hooks und ohne Seiteneffekt');
}

// 2. Einheit legen mit eingehängtem Logger über die Seite
{
  const { w, errors } = setup('off');
  w.eval(fs.readFileSync(path.join(WEB, 'js/ai/bot.js'), 'utf8'));
  w.DCBot.applyCfg({ model: 'test', delayMs: 1 });
  let suggestions = 0;
  w.DCPlayLogger = {
    beginMatch() {}, recordAction() {}, finish() {}, abort() {}, getCurrent() { return null; },
    botSuggest(e, pid) { suggestions++; if (suggestions > 50) throw new Error('Rekursion'); return w.DCBot.step(e, pid); },
  };
  w.document.getElementById('mode').value = 'bot';
  w.dcStart();
  const eng = w.dcGetEngine();
  assert(eng._playLogHooked, 'Logger eingehängt');
  eng.state.active = 0; eng.state.pending = null; eng.player(0).ap = 20;
  const unitDef = w.DC_CATALOG.cards.find((c) => c.typ === 'Einheit' && (c.ap || c.kosten || 0) <= 5);
  const card = eng.instFromId(unitDef.id, 0);
  eng.player(0).hand.push(card);
  w.dcTimerHold = false;
  w.dcRender();
  const t0 = Date.now();
  const r = eng.dispatch({ type: 'PLAY', player: 0, uid: card.uid, slot: { section: 'C', row: 1 } });
  const ms = Date.now() - t0;
  const placed = r && r.need === 'slot' ? eng.dispatch({ type: 'CHOOSE_SLOT', player: 0, slot: { section: 'C', row: 1 } }) : r;
  assert(placed && placed.ok, 'Einheit gelegt: ' + JSON.stringify(placed));
  assert.equal(eng.player(0).front.C[1] && eng.player(0).front.C[1].uid, card.uid, 'Einheit liegt auf C2');
  assert(ms < 5000, 'Legen dauert ' + ms + ' ms (vorher Rekursion/Hänger)');
  assert(suggestions >= 1 && suggestions < 10, 'Logger-Vorschläge begrenzt: ' + suggestions);
  w.dcRender();
  assert(w.document.querySelector(`#my-front .slot[data-uid="${card.uid}"]`), 'Einheit im DOM der Front');
  assert.equal(errors.length, 0, 'keine DOM-Fehler');
  console.log('ok t256 Einheit legen mit Logger: ' + ms + ' ms, ' + suggestions + ' Vorschläge');
}

// 3. Quelltext-Verdrahtung Start/Countdown/Münzwurf/Meldung
{
  const app = fs.readFileSync(path.join(WEB, 'js/ui/app.js'), 'utf8');
  const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
  assert(!/bind\('btn-start'/.test(app), 'app.js bindet btn-start nicht zusätzlich (Doppelstart)');
  assert(/getElementById\('btn-start'\)\.onclick[\s\S]{0,600}dcStart\(\)/.test(html), 'index.html startet über dcStart');
  assert(/dcKickoff\(afterKickoff\)/.test(app), 'Münzwurf/Bot nach dem Countdown');
  assert(/if \(coinDialogOpen\(\)\) return;/.test(app), 'Bot wartet auf „Los“');
  assert(/gen !== window\.dcKickGen/.test(html), 'Countdown nur einmal aktiv');
  assert(/recapHidden\(ev\) \? backFile\(null\)/.test(app), 'Meldung verdeckt gegnerische Ziehkarten');
  console.log('ok t256 Start, Countdown, Münzwurf und Meldungen verdrahtet');
}

// 4. server.py überlebt Neuladen, beendet sich nach Schließen
/**
 * Einfache HTTP-Anfrage.
 * @param {number} port
 * @param {string} p
 * @param {string} [method]
 * @returns {Promise<number>} Status oder 0 bei Fehler
 */
function req(port, p, method = 'GET') {
  return new Promise((resolve) => {
    const r = http.request({ host: '127.0.0.1', port, path: p, method, headers: { 'Content-Type': 'application/json' } }, (res) => { res.resume(); resolve(res.statusCode); });
    r.on('error', () => resolve(0));
    if (method === 'POST') r.write('{}');
    r.end();
  });
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const port = 19000 + Math.floor(Math.random() * 900);
  const env = { ...process.env };
  delete env.DC_KEEP_ALIVE;
  const srv = spawn('python3', [path.join(__dirname, '../Division_Command/server.py'), '--port', String(port)], { stdio: 'ignore', env });
  try {
    let up = 0;
    for (let i = 0; i < 50 && up !== 200; i++) { await sleep(150); up = await req(port, '/api/status'); }
    assert.equal(up, 200, 'server.py startet');
    assert.equal(await req(port, '/api/quit', 'POST'), 200);
    await sleep(500);
    assert.equal(await req(port, '/index.html'), 200, 'Neuladen nach pagehide');
    await sleep(4800);
    assert.equal(await req(port, '/api/status'), 200, 'Server lebt nach Neuladen weiter');
    await req(port, '/api/quit', 'POST');
    await sleep(5200);
    assert.equal(await req(port, '/api/status'), 0, 'Server beendet nach Schließen des Fensters');
    console.log('ok t256 server.py: Neuladen ja, Schließen beendet');
    console.log('PASS test_ui_t256');
  } finally {
    try { srv.kill('SIGTERM'); } catch (e) {}
  }
})().catch((e) => { console.error(e); process.exit(1); });
