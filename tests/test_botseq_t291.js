/**
 * t291: Sequenzierter Bot-Zug.
 *  A. Step-API (Node, ohne DOM): readSettings, thinkDelay (Tempo-Grenzen, Streuung, deterministisch),
 *     nextAction (genau eine Aktion je Aufruf, nie Zugende bei offener eigener Wahl, Partien enden,
 *     gleiche Seeds → gleicher Ablauf), reactionOptions (nur bezahlbare, jetzt legale Soforteinsätze
 *     im gegnerischen Zug; echter Stand bleibt unverändert).
 *  B. Oberfläche (jsdom, virtuelle Uhr): Bot-Aktionen kommen einzeln mit Denkpause; mit Soforteinsatz
 *     und Reserve-AP öffnet sich das Reaktionsfenster, der Bot wartet, die Reaktion wirkt, danach setzt
 *     der Bot fort; ohne Reaktion und mit „Nie anhalten“ kein Halt; Zugbeginn ohne Meldungs-Rückstau.
 * Läuft über `npm test` von der Repo-Wurzel.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const L = require('../scripts/nation_pools/load_game.js');
/** Vergleich über JSON (Objekte stammen aus einem anderen vm-Kontext). */
const same = (a, b, msg) => assert.equal(JSON.stringify(a), JSON.stringify(b), msg);

/* ---------- A. Step-API ---------- */
const w = L.loadGame({ quiet: true });
// Der Bot bricht Gleichstände mit Math.random: für den Determinismus-Nachweis ein gesäter Zufall.
const SM = Object.create(Math); let rs = 1;
SM.random = () => { rs = (Math.imul(rs, 1664525) + 1013904223) >>> 0; return rs / 4294967296; };
const ctx = { window: w, console: { log() {}, warn() {} }, Math: SM, JSON, Object, Array, String, Number, Error };
vm.runInNewContext(fs.readFileSync(path.join(L.WEB, 'js/ai/bot.js'), 'utf8'), ctx);
vm.runInNewContext(fs.readFileSync(path.join(L.WEB, 'js/ai/bot-seq.js'), 'utf8'), ctx);
const Bot = w.DCBot, S = w.DCBotSeq, C = w.DC_CATALOG.cards;
assert.ok(S && typeof S.nextAction === 'function', 'DCBotSeq geladen');

// readSettings
const mem = (o) => ({ getItem: (k) => (k in o ? o[k] : null) });
same(S.readSettings(null), { tempo: 'normal', react: 'stop' });
same(S.readSettings(mem({ dc_bot_tempo: 'fast', dc_bot_react: 'off' })), { tempo: 'fast', react: 'off' });
same(S.readSettings(mem({ dc_bot_tempo: 'turbo', dc_bot_react: 'x' })), { tempo: 'normal', react: 'stop' });

// thinkDelay
for (const t of Object.keys(S.TEMPO)) {
  const T = S.TEMPO[t], seen = new Set();
  for (let i = 0; i < 40; i++) {
    const ms = S.thinkDelay(t, i * 37, 'act');
    assert.ok(ms >= T.min && ms <= T.max, t + ': ' + ms + ' in [' + T.min + ',' + T.max + ']');
    assert.equal(ms, S.thinkDelay(t, i * 37, 'act'), 'deterministisch');
    seen.add(ms);
    assert.ok(S.thinkDelay(t, i, 'start') >= T.min + T.start);
  }
  assert.ok(seen.size >= 10, t + ': Pausen variieren (' + seen.size + ')');
  assert.equal(S.thinkDelay(t, 5, 'follow'), T.follow);
}
assert.equal(S.thinkDelay('unbekannt', 3, 'follow'), S.TEMPO.normal.follow);
assert.ok(S.TEMPO.slow.min > S.TEMPO.normal.min && S.TEMPO.normal.min > S.TEMPO.fast.min, 'langsam > normal > schnell');

// nextAction: komplette Bot-gegen-Bot-Partien Schritt für Schritt
const nations = Object.keys(w.DC_NATION_DECKS);
function mixed(n) {
  const d = w.DC_NATION_DECKS[n], pool = C.filter((c) => c.nation === n && c.set === 'set_nation_pool').map((c) => c.id);
  return { cards: d.cards.slice(0, 30).concat(pool.slice(0, 30)), doctrines: d.doktrinen.slice() };
}
/**
 * Spielt eine Partie nur über die Step-API und liefert Hash + Ergebnis.
 * @param {number} g
 */
function playStepwise(g) {
  const a = nations[g % 16], b = nations[(g * 5 + 3) % 16], d0 = mixed(a), d1 = mixed(b);
  const eng = new w.DCEngine.Engine(w.DC_CATALOG, { seed: 7100 + g });
  eng.createMatch({ seed: 7100 + g, mode: 'bot', name0: a, name1: b, deck0: d0.cards, deck1: d1.cards, doctrine0: d0.doctrines, doctrine1: d1.doctrines });
  rs = 4000 + g;
  const h = crypto.createHash('sha1'); const fail = {}; let steps = 0;
  while (eng.state.winner == null && steps < 4000 && eng.state.turn <= 30) {
    const pend = eng.state.pending, pid = pend && typeof pend.player === 'number' ? pend.player : eng.state.active;
    const act = S.nextAction(eng, pid, Bot, fail);
    assert.equal(typeof act, 'object'); assert.equal(act.player, pid, 'Aktion trägt den Sitz');
    if (pend && pend.player === pid) assert.notEqual(act.type, 'END_TURN', 'nie Zugende bei offener eigener Wahl');
    let res; try { res = eng.dispatch(act); } catch (e) { res = { ok: false }; }
    h.update(JSON.stringify([act.type, act.uid || '', act.target || '', !!(res && res.ok)]));
    if (!res || !res.ok) fail[Bot.actKey(act)] = 1; else for (const k in fail) delete fail[k];
    steps++;
  }
  return { hash: h.digest('hex'), winner: eng.state.winner, turn: eng.state.turn };
}
let finished = 0;
for (let g = 0; g < 6; g++) {
  const r1 = playStepwise(g), r2 = playStepwise(g);
  assert.equal(r1.hash, r2.hash, 'gleicher Seed → gleicher Ablauf (Partie ' + g + ')');
  if (r1.winner != null) finished++;
}
assert.equal(finished, 6, 'alle Step-API-Partien beendet');

// reactionOptions
const decks = Object.values(w.DC_NATION_DECKS);
function scene(ap) {
  const eng = new w.DCEngine.Engine(w.DC_CATALOG, { seed: 91 });
  eng.createMatch({ seed: 91, mode: 'bot', startPlayer: 1, deck0: decks[0].cards.slice(), deck1: decks[1].cards.slice(), doctrine0: [], doctrine1: [] });
  eng.state.startCoin = null; eng.state.pending = null; eng.state.active = 1; eng.state.phase = 'main';
  const unit = C.find((c) => c.typ === 'Einheit' && !(c.effects || []).length && !(c.keywords || []).length && c.atk >= 2);
  const foe = eng.instFromId(unit.id, 1); foe.summonedTurn = -9; eng.player(1).front.C = [foe, null, null];
  const nap = eng.instFromId('dc_so_napalm', 0);
  const massen = eng.instFromId('dc_so_massen', 0);
  eng.player(0).hand = [nap, massen]; eng.player(0).ap = ap;
  return { eng, nap, massen, foe };
}
{
  const { eng, nap } = scene(3);
  const before = JSON.stringify(eng.state);
  const r = S.reactionOptions(eng, 0);
  assert.equal(JSON.stringify(eng.state), before, 'Probe ändert den echten Stand nicht');
  same(r.map((o) => o.uid), [nap.uid], 'nur Napalm (Massen ist nur im eigenen Zug)');
  assert.equal(r[0].need, 'target');
  eng.state.active = 0; same(S.reactionOptions(eng, 0), [], 'im eigenen Zug kein Reaktionsfenster');
  eng.state.active = 1; eng.state.pending = { kind: 'deploy', player: 1, choices: [] };
  same(S.reactionOptions(eng, 0), [], 'bei offener Wahl kein Reaktionsfenster');
}
same(S.reactionOptions(scene(0).eng, 0), [], 'ohne Reserve-AP keine Reaktion');
same(S.reactionOptions(scene(2).eng, 0), [], 'zu wenig Reserve-AP für Napalm (3)');
assert.equal(S.isMainAction({ type: 'PLAY' }), true);
assert.equal(S.isMainAction({ type: 'RESOLVE_PENDING' }), false);
assert.equal(S.isMainAction({ type: 'END_TURN' }), false);

/* ---------- B. Oberfläche (jsdom) ---------- */
const { setup } = require('./test_audio_actions.js');
const WEB = path.join(__dirname, '../Division_Command/web');
/**
 * jsdom-Fenster im Bot-Modus mit virtueller Uhr; Bot (Sitz 1) am Zug mit drei einfachen Einheiten.
 * @param {{ap:number, react?:string, instant?:boolean}} o
 */
function uiScene(o) {
  const { w: win } = setup('off');
  win.eval(fs.readFileSync(path.join(WEB, 'js/ai/bot.js'), 'utf8'));
  win.eval(fs.readFileSync(path.join(WEB, 'js/ai/bot-seq.js'), 'utf8'));
  win.DCBot.applyCfg({ model: 'test', delayMs: 350 });
  win.localStorage.setItem('dc_bot_tempo', 'normal');
  win.localStorage.setItem('dc_bot_react', o.react || 'stop');
  const q = []; let now = 0;
  win.setTimeout = (fn, ms) => { q.push({ fn, at: now + (ms || 0) }); return q.length; };
  win.clearTimeout = () => {};
  win.setInterval = (fn, ms) => { const iv = { fn, ms: ms || 1000, next: now + (ms || 1000), on: true }; ivs.push(iv); return ivs.length; };
  win.clearInterval = (id) => { if (ivs[id - 1]) ivs[id - 1].on = false; };
  const ivs = [];
  const eng = win.dcGetEngine();
  win.dcSetMode('bot'); win.dcSetYou(0); win.dcTimerHold = false;
  eng.state.pending = null; eng.state.startCoin = null; eng.state.active = 1; eng.state.phase = 'main'; eng.state.turn = 6;
  const plain = C.filter((c) => c.typ === 'Einheit' && !(c.effects || []).length && !(c.keywords || []).length && Number(c.ap) <= 2 && c.atk >= 1);
  const p1 = eng.player(1), p0 = eng.player(0);
  ['L', 'C', 'R'].forEach((s) => { p1.front[s] = [null, null, null]; p0.front[s] = [null, null, null]; });
  const foe = eng.instFromId(plain[0].id, 1); foe.summonedTurn = -9; foe.playedTurn = -9; p1.front.L[0] = foe;
  p1.hand = [eng.instFromId(plain[1].id, 1), eng.instFromId(plain[2].id, 1), eng.instFromId(plain[3].id, 1)];
  p1.ap = 5; p1.support = p1.support.map(() => null);
  const nap = eng.instFromId('dc_so_napalm', 0);
  p0.hand = o.instant === false ? [] : [nap]; p0.ap = o.ap; p0.support = p0.support.map(() => null);
  const log = [];
  const orig = eng.dispatch.bind(eng);
  eng.dispatch = (a) => { const r = orig(a); log.push({ t: now, type: a.type, player: a.player, ok: !!(r && r.ok) }); return r; };
  /** Virtuelle Uhr bis `until` laufen lassen (Timer, Intervalle, Promise-Ketten). */
  async function run(until) {
    for (let i = 0; i < 20000; i++) {
      await new Promise((r) => setImmediate(r));
      ivs.forEach((iv) => { if (iv.on && iv.next < (q.length ? Math.min(q[0].at, until) : until)) { /* später */ } });
      q.sort((a, b) => a.at - b.at);
      const nextIv = ivs.filter((iv) => iv.on).sort((a, b) => a.next - b.next)[0];
      const nextT = Math.min(q.length ? q[0].at : Infinity, nextIv ? nextIv.next : Infinity);
      if (nextT > until) break;
      if (nextIv && nextIv.next === nextT && !(q.length && q[0].at < nextT)) { now = nextT; nextIv.next += nextIv.ms; try { nextIv.fn(); } catch (e) { /* jsdom */ } continue; }
      const t = q.shift(); now = t.at;
      try { t.fn(); } catch (e) { /* Animationsreste im jsdom ignorieren */ }
    }
    now = Math.max(now, until);
  }
  return { win, eng, nap, foe, log, run, clock: () => now, ov: win.document.getElementById('overlay') };
}
const mainOf = (log) => log.filter((x) => x.player === 1 && x.ok && S.isMainAction(x));

(async () => {
  // B1: ohne Reaktion → kein Halt, Aktionen einzeln mit Denkpause, Zugbeginn ohne Rückstau
  {
    const u = uiScene({ ap: 0, instant: false });
    u.win.dcRender();
    await u.run(60000);
    const mains = mainOf(u.log);
    assert.ok(mains.length >= 2, 'Bot macht mehrere Hauptaktionen: ' + mains.length);
    for (let i = 1; i < mains.length; i++) {
      const gap = mains[i].t - mains[i - 1].t;
      assert.ok(gap >= S.TEMPO.normal.min, 'Abstand zwischen Bot-Aktionen ' + gap + ' ms ≥ ' + S.TEMPO.normal.min);
    }
    assert.ok(!u.ov.querySelector('.bot-react'), 'ohne Reaktion kein Reaktionsfenster');
    assert.equal(u.eng.state.active, 0, 'Zug ist zurück beim Menschen');
    assert.ok(!u.win.dcEventBusy(), 'Zugbeginn: keine nachgeholten Meldungen');
    const tick = u.win.document.getElementById('bot-ticker');
    assert.ok(tick && tick.querySelector('.bt-lines').textContent.length > 0, 'Laufband zeigte die Bot-Aktionen');
  }
  // B2: Napalm + 3 Reserve-AP → Reaktionsfenster, Bot wartet, Reaktion wirkt, Bot setzt fort
  {
    const u = uiScene({ ap: 3 });
    u.win.dcRender();
    for (let i = 0; i < 200 && !u.ov.querySelector('.bot-react'); i++) await u.run(u.clock() + 250);
    const btn = u.ov.querySelector('.bot-react [data-botreact]');
    assert.ok(btn, 'Reaktionsfenster mit Soforteinsatz erscheint');
    assert.equal(btn.getAttribute('data-botreact'), u.nap.uid);
    assert.ok(u.ov.querySelector('#botseq-react-pass'), 'Weiter-Knopf vorhanden');
    const n0 = u.log.filter((x) => x.player === 1).length;
    await u.run(u.clock() + 15000);
    assert.equal(u.log.filter((x) => x.player === 1).length, n0, 'Bot pausiert, solange das Fenster offen ist');
    assert.ok(u.ov.querySelector('.bot-react'), 'Fenster bleibt im Modus „Immer anhalten“ offen');
    btn.click();
    assert.ok(!u.ov.querySelector('.bot-react'), 'Fenster schließt nach der Wahl');
    const pend = u.eng.state.pending;
    assert.ok(pend && pend.player === 0, 'Napalm verlangt die Zielwahl des Menschen');
    const tgt = u.eng.listActions(0).find((a) => a.type === 'RESOLVE_PENDING' && a.target);
    assert.ok(tgt, 'Napalm-Ziel wählbar');
    u.win.dcDispatch(Object.assign({ player: 0 }, tgt));
    assert.ok(!u.eng.player(0).hand.some((c) => c.uid === u.nap.uid), 'Napalm hat die Hand verlassen');
    assert.equal(u.eng.player(0).ap, 0, '3 Reserve-AP bezahlt');
    await u.run(u.clock() + 60000);
    assert.ok(u.log.filter((x) => x.player === 1).length > n0, 'Bot setzt nach der Reaktion fort');
    assert.equal(u.eng.state.active, 0, 'Bot-Zug endet danach regulär');
  }
  // B3: „Weiter“ setzt fort; „Nie anhalten“ zeigt kein Fenster
  {
    const u = uiScene({ ap: 3 });
    u.win.dcRender();
    for (let i = 0; i < 200 && !u.ov.querySelector('.bot-react'); i++) await u.run(u.clock() + 250);
    u.ov.querySelector('#botseq-react-skip').click();
    await u.run(u.clock() + 60000);
    assert.equal(u.eng.state.active, 0, '„In diesem Zug nicht mehr anhalten“: Bot beendet den Zug ohne weiteres Fenster');
    assert.ok(u.eng.player(0).hand.some((c) => c.uid === u.nap.uid), 'Napalm bleibt auf der Hand');
    const v = uiScene({ ap: 3, react: 'off' });
    v.win.dcRender();
    let seen = false;
    for (let i = 0; i < 240 && v.eng.state.active === 1; i++) { await v.run(v.clock() + 250); if (v.ov.querySelector('.bot-react')) seen = true; }
    assert.ok(!seen, '„Nie anhalten“: kein Reaktionsfenster');
    assert.equal(v.eng.state.active, 0);
  }
  // B4: „Kurz anbieten“ läuft nach 5 s selbst weiter
  {
    const u = uiScene({ ap: 3, react: 'brief' });
    u.win.dcRender();
    for (let i = 0; i < 200 && !u.ov.querySelector('.bot-react'); i++) await u.run(u.clock() + 250);
    assert.ok(u.ov.querySelector('.bot-react #botseq-react-count'), 'Countdown sichtbar');
    await u.run(u.clock() + S.BRIEF_MS + 1500);
    assert.ok(!u.ov.querySelector('.bot-react') || u.log.filter((x) => x.player === 1).length > 1, 'Fenster schließt sich selbst');
  }
  console.log('PASS botseq t291: Step-API, Denkpausen, Reaktionsfenster (anhalten/weiter/kurz/aus)');
})().catch((e) => { console.error(e); process.exit(1); });
