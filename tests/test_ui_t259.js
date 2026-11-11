/**
 * t259: „Der Gegner prüft Reaktionen“ darf die Partie nie dauerhaft blockieren.
 * Browser-Durchlauf (npm run ui-play, t258) hing in Zug 16: Der Warte-Dialog für eine
 * Bot-Wahl (Feindkontakt, SAM, Geist, tac-*) blieb stehen, obwohl kein Pending mehr offen war.
 *  1. Bot löst seine taktische Wahl ohne Live-Meldung → Warte-Dialog schließt sich.
 *  2. render() während einer laufenden Meldung (Recap) mit offener Bot-Wahl ersetzt den
 *     Recap nicht mehr; nach der Meldung ist das Overlay zu.
 *  3. Wächter: Ein verwaister Warte-Dialog (kein Pending) verschwindet spätestens nach ~1 s.
 *  4. Eigener Feindkontakt-Dialog ging verloren (ui-play Seed 77, „Offene Auswahl ohne
 *     Bedienelement“): render() ohne Brettänderung stellt ihn wieder her.
 *  5. Meldungs-Wache: „beschäftigt“ ohne sichtbares Overlay (ui-play Seed 259) wird nach 8
 *     Sekunden-Takten freigegeben.
 *  7. Meldungs-Wache: sichtbare, 15 Takte unveränderte Meldung (Tippen hängt) wird beendet.
 *  6. Engine: Das Feindkontakt-Fenster bietet nur bezahlbare Handreaktionen an (Napalm bei 0 AP
 *     war wählbar, scheiterte und ließ die Partie warten; ui-play Seeds 77/259).
 * Mit APP_SOURCE=<alte app.js> schlägt der Test fehl (Nachweis der Regression).
 * Läuft über `npm test` von der Repo-Wurzel.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { setup } = require('./test_audio_actions.js');
const WEB = path.join(__dirname, '../Division_Command/web');

/**
 * jsdom-Fenster im Bot-Modus mit steuerbarer Zeit.
 * @returns {{w:object, eng:object, ov:object, run:function(number):Promise<void>}}
 */
function botWindow() {
  const { w } = setup('off');
  w.eval(fs.readFileSync(path.join(WEB, 'js/ai/bot.js'), 'utf8'));
  w.DCBot.applyCfg({ model: 'test', delayMs: 350 });
  const q = []; let now = 0;
  w.setTimeout = (fn, ms) => { q.push({ fn, at: now + (ms || 0) }); return q.length; };
  w.clearTimeout = () => {};
  const intervals = [];
  w.setInterval = (fn) => { intervals.push(fn); return intervals.length; };
  w.clearInterval = () => {};
  const eng = w.dcGetEngine();
  w.dcSetMode('bot'); w.dcSetYou(0); w.dcTimerHold = false;
  eng.state.pending = null; eng.state.startCoin = null;
  w.dcPresentNewEvents && (eng.state.events = eng.state.events || []);
  /**
   * Lässt die virtuelle Uhr bis `until` ms laufen (inkl. Promise-Ketten).
   * @param {number} until
   */
  async function run(until) {
    for (let i = 0; i < 5000; i++) {
      await new Promise(r => setImmediate(r));
      q.sort((a, b) => a.at - b.at);
      if (!q.length || q[0].at > until) break;
      const t = q.shift(); now = t.at;
      try { t.fn(); } catch (e) { /* Animationsreste im jsdom ignorieren */ }
    }
    now = Math.max(now, until);
  }
  return { w, eng, ov: w.document.getElementById('overlay'), run, clock: () => now, intervals };
}

/**
 * Bot-Einheit mit Gefechtsabbruch nach einem Angriff: tac-break gehört dem Bot.
 * @param {object} eng
 * @returns {object} Pending
 */
function botTacBreak(eng) {
  eng.state.active = 0; eng.state.turn = 6;
  const d = eng.instFromId('dc_tac_nachhutkompanie', 1); d.summonedTurn = -9; d.playedTurn = -9;
  eng.player(1).front.C[0] = d; eng.player(1).ap = 5;
  eng.state.events = eng.state.events || [];
  eng.state.pending = eng._sealPending({ kind: 'tac-break', player: 1, uid: d.uid,
    choices: eng._tacAdjacent(eng.findInst(d.uid), true).map(slot => ({ slot, label: 'x' })) });
  assert.ok(eng.state.pending, 'tac-break offen');
  return eng.state.pending;
}
const waitShown = ov => ov.style.display !== 'none' && /prüft Reaktionen/.test(ov.textContent);

(async () => {
  // 1. Bot löst seine Wahl, ohne dass eine Live-Meldung folgt
  {
    const { w, eng, ov, run } = botWindow();
    botTacBreak(eng);
    w.DCBot.step = () => ({ type: 'CANCEL_PENDING', player: 1 });
    eng.state.events.length = 0; w.dcRender();
    assert.ok(waitShown(ov), 'Warte-Dialog sichtbar, solange der Bot wählt');
    const evBefore = eng.state.events.length;
    await run(1500);
    assert.equal(eng.state.pending, null, 'Bot hat seine Wahl erledigt');
    assert.equal(eng.state.events.length, evBefore, 'keine Live-Meldung (Ausgangslage des Hängers)');
    assert.ok(!waitShown(ov), 'Warte-Dialog nach der Bot-Wahl geschlossen');
  }

  // 2. render() während eines Recaps darf den Recap nicht durch den Warte-Dialog ersetzen
  {
    const { w, eng, ov, run } = botWindow();
    w.DCBot.step = () => ({ type: 'CANCEL_PENDING', player: 1 });
    eng.state.active = 0;
    eng.state.events.push({ kind: 'spell', actor: 0, name: 'Testmeldung', text: 'Meldung läuft.' });
    w.dcPresentNewEvents();
    await run(50);
    assert.ok(w.dcEventBusy(), 'Meldung läuft');
    botTacBreak(eng);
    w.dcRender();
    assert.ok(ov.querySelector('.recap-stage') && !waitShown(ov), 'Recap bleibt stehen');
    await run(60000);
    assert.equal(eng.state.pending, null);
    assert.ok(!w.dcEventBusy(), 'Meldung beendet');
    assert.ok(ov.style.display === 'none', 'Overlay nach Meldung und Bot-Wahl zu: ' + ov.textContent.slice(0, 60));
  }

  // 3. Wächter: verwaister Warte-Dialog
  {
    const { w, eng, ov, run, clock } = botWindow();
    botTacBreak(eng);
    w.DCBot.step = () => ({ type: 'CANCEL_PENDING', player: 1 });
    w.dcRender();
    assert.ok(waitShown(ov));
    eng.state.pending = null; // z. B. Netz-/Fremdpfad räumt das Pending ohne UI-Aufruf
    await run(clock() + 1500);
    assert.ok(!waitShown(ov), 'Wächter schließt den verwaisten Warte-Dialog');
  }
  // 4. Verlorener eigener Dialog wird bei render() ohne DOM-Änderung wiederhergestellt
  {
    const { w, eng, ov, run } = botWindow();
    eng.state.active = 1;
    w.dcRender(); w.dcRender(); // zweiter Lauf: Brett unverändert (dirty = false)
    await run(10);
    const atk = eng.instFromId('dc_tac_nachhutkompanie', 1);
    eng.state.pending = { kind: 'react-window', player: 0, prompt: 'Feindkontakt!',
      choices: [{ target: atk.uid, label: 'Test' }] };
    ov.style.display = 'none'; ov.innerHTML = '';
    w.dcRender();
    assert.ok(ov.style.display !== 'none' && ov.querySelector('#react-pass'), 'Feindkontakt-Dialog wieder sichtbar');
    eng.state.pending = null;
  }
  // 5. Meldungs-Wache über den Sekundentakt des Zugtimers
  {
    const { w, eng, ov, intervals } = botWindow();
    eng.state.active = 0;
    w.dcRender();
    const tick = intervals[intervals.length - 1];
    assert.equal(typeof tick, 'function', 'Zugtimer-Takt angelegt');
    eng.state.events.push({ kind: 'spell', actor: 1, name: 'Hängende Meldung', text: 'x' });
    w.dcPresentNewEvents(); // Timer laufen nicht weiter → Meldung bleibt „beschäftigt“
    assert.ok(w.dcEventBusy());
    ov.style.display = 'none'; ov.innerHTML = ''; // Overlay verschwindet, Lauf bleibt gesetzt
    for (let i = 0; i < 7; i++) tick();
    assert.ok(w.dcEventBusy(), 'kurze Lücken (Flug-Animation) bleiben unberührt');
    tick();
    assert.ok(!w.dcEventBusy(), 'nach 8 s ohne sichtbare Meldung freigegeben');
  }
  // 6. Nur bezahlbare Handreaktionen
  {
    const { w, eng } = botWindow();
    const C = w.DC_CATALOG.cards;
    const unit = C.find((c) => c.typ === 'Einheit' && !(c.effects || []).length && !(c.keywords || []).length && c.atk >= 2);
    const attack = (ap) => {
      eng.state.active = 1; eng.state.turn = 5; eng.state.pending = null; eng.state.heldAttack = null;
      eng.player(0).front.C = [null, null, null]; eng.player(1).front.C = [null, null, null];
      const a = eng.instFromId(unit.id, 1); a.summonedTurn = -9; a.playedTurn = -9; eng.player(1).front.C[0] = a;
      const d = eng.instFromId(unit.id, 0); d.summonedTurn = -9; d.playedTurn = -9; eng.player(0).front.C[0] = d;
      const n = eng.instFromId('dc_so_napalm', 0);
      eng.player(0).hand = [n]; eng.player(0).support = eng.player(0).support.map(() => null);
      eng.player(0).ap = ap; eng.player(1).ap = 5;
      return { r: eng.dispatch({ type: 'ATTACK', player: 1, uid: a.uid, target: d.uid }), n };
    };
    const poor = attack(0);
    assert.notEqual(poor.r.need, 'react', 'bei 0 AP kein Feindkontakt-Fenster für Napalm (3 AP)');
    assert.ok(!eng.state.pending || eng.state.pending.kind !== 'react-window');
    const rich = attack(3);
    assert.equal(rich.r.need, 'react', 'mit 3 AP wird Napalm angeboten');
    assert.ok(eng.state.pending.choices.some((c) => c.target === rich.n.uid));
    assert.equal(eng.dispatch({ type: 'PLAY', player: 0, uid: rich.n.uid, target: eng.player(1).front.C[0].uid }).ok !== undefined, true);
    eng.state.pending = null;
  }
  // 7. Sichtbare, aber hängende Meldung (Timer laufen nicht → Text ändert sich nicht)
  {
    const { w, eng, ov, intervals } = botWindow();
    eng.state.active = 0;
    w.dcRender();
    const tick = intervals[intervals.length - 1];
    eng.state.events.push({ kind: 'deploy', actor: 1, name: 'Hängende Meldung', text: 'x' });
    w.dcPresentNewEvents();
    assert.ok(w.dcEventBusy() && ov.querySelector('.recap-stage'), 'Meldung sichtbar');
    for (let i = 0; i < 14; i++) tick();
    assert.ok(w.dcEventBusy(), 'unter 15 s unberührt');
    tick(); tick();
    assert.ok(!w.dcEventBusy(), 'hängende sichtbare Meldung beendet');
    assert.equal(ov.style.display, 'none');
  }
  console.log('test_ui_t259: ok');
})().catch(e => { console.error(e); process.exit(1); });
