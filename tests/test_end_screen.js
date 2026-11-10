/**
 * Endbildschirm: Gründe, Rematch, Fokusfalle, keine Regeländerungen.
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
/* DOM-only integration of production end screen, action handlers and engine lifecycle. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { setup } = require('./test_audio_actions.js');
const WEB = path.join(__dirname, '../Division_Command/web');
const reasons = ['5 Siegpunkte', 'Trophy: Bollwerk', 'Sicherheitsnetz — Keine Front', 'Zuglimit 28 Wertung', 'Aufgabe', 'timeout-SP', 'timeout-Brett'];
let checked = 0;
for (const reason of reasons) {
  for (const [mode, you, winner, expected] of [
    ['bot', 0, 0, 'GEWONNEN'], ['bot', 0, 1, 'VERLOREN'],
    ['lan', 1, 1, 'GEWONNEN'], ['lan', 1, 0, 'VERLOREN'],
    ['hotseat', 0, 1, 'VERLOREN'], ['bot-vs-bot', 0, 1, 'SIEGER:'],
  ]) {
    const h = setup('off'), { w, eng, click } = h;
    let finishes = 0, sounds = 0;
    w.DCAudio = { notifyGameEnd: () => { sounds++; }, stopSfx() {} };
    w.DCPlayLogger = { finish() { finishes++; } };
    w.dcSetMode(mode); w.dcSetYou(you);
    eng.player(0).vp = 3; eng.player(1).vp = 5;
    eng._end(winner, reason); w.dcRender(); w.dcRender(); w.dcPresentNewEvents();
    assert(w.document.getElementById('dc-end-heading').textContent.startsWith(expected), `${mode}/${winner}/${reason}`);
    assert.equal(w.document.getElementById('dc-end-reason').textContent, reason);
    const score = w.document.querySelector('.dc-end-score').textContent;
    assert(score.includes('3 SP') && score.includes('5 SP'));
    assert.equal(finishes, 1, 'finish exactly once');
    assert.equal(sounds, mode === 'bot-vs-bot' ? 0 : 1, 'result sound once, no fake human win in simulation');
    assert.equal(w.document.querySelectorAll('#dc-end-screen').length, 1);
    assert.equal(w.document.activeElement.id, 'dc-end-again');
    assert(w.document.getElementById('hand').closest('[aria-hidden="true"]'), 'battlefield hidden to assistive tech');
    const before = JSON.stringify(eng.state);
    click('#btn-end');
    assert.equal(JSON.stringify(eng.state), before, 'programmatic old board button cannot change ended state');
    assert.equal(eng.dispatch({ type: 'END_TURN', player: 0 }).ok, false);
    assert.equal(eng.listActions(0).length, 0);
    // Receiving the same LAN snapshot must not replay end sound/log.
    w.dcSetState(JSON.parse(JSON.stringify(eng.state)));
    assert.equal(finishes, 1); assert.equal(sounds, mode === 'bot-vs-bot' ? 0 : 1);
    assert.equal(h.errors.length, 0);
    h.dom.window.close(); checked++;
  }
}
{
  const h = setup('off'), { w, eng, click } = h;
  let finishes = 0;
  w.DCPlayLogger = { getCurrent: () => ({ end: { kind: 'completed' } }), finish() { finishes++; } };
  eng.state.pending = { kind: 'instant-target', player: 0, choices: [] };
  w.dcRender(); assert(!w.document.getElementById('dc-end-screen'), 'no end screen during target choice');
  eng._end(null, 'Weißer Frieden'); w.dcRender();
  assert.equal(w.document.getElementById('dc-end-heading').textContent, 'UNENTSCHIEDEN');
  assert.equal(finishes, 0, 'recordAction already finished: no duplicate finish call');
  assert.equal(eng.dispatch({ type: 'END_TURN', player: 0 }).ok, false, 'draw is terminal too');
  assert.equal(eng.listActions(0).length, 0);
  click('#dc-end-menu'); assert(!w.document.getElementById('dc-end-screen'));
  assert.equal(w.dcGetEngine(), null); assert(!w.document.body.classList.contains('dc-game-ended'));
  assert.equal(w.document.getElementById('title-root').style.display, 'flex');
  h.dom.window.close();
}
{
  const h = setup('off'), { w, eng, click } = h;
  let disconnects = 0, lobby = 0;
  w.DCNet = { disconnect() { disconnects++; } };
  w.document.getElementById('go-lan').onclick = () => { lobby++; };
  w.dcSetMode('lan'); eng._end(1, 'Aufgabe'); w.dcRender();
  assert.equal(w.document.getElementById('dc-end-again').textContent, 'Zur Lobby');
  click('#dc-end-again'); assert.equal(disconnects, 1); assert.equal(lobby, 1);
  assert.equal(w.dcGetEngine(), null, 'no unsolicited LAN match created');
  h.dom.window.close();
}
{
  // Start via real startGame: remember initial deck/doc setup, not shuffled/consumed terminal state.
  const h = setup('off'), { w, click } = h;
  w.document.getElementById('mode').value = 'bot';
  w.dcStart(); const old = w.dcGetEngine();
  const start = JSON.parse(JSON.stringify(old.state));
  const deckIds = p => p.deck.concat(p.hand).map(c => typeof c === 'string' ? c : c.cardId).sort();
  const docs = p => p.doctrines.map(c => c.cardId).sort();
  let stopped = 0, starts = 0;
  w.DCAudio = { stopSfx() { stopped++; }, notifyGameEnd() {} };
  w.DCPlayLogger = { beginMatch() { starts++; }, recordAction() {}, finish() {}, botSuggest() { return null; } };
  old.player(0).deck = []; old.player(0).hand = []; old.player(0).vp = 99;
  old.state.pending = { kind: 'equip', player: 0 }; old._end(0, '5 Siegpunkte'); w.dcRender();
  click('#dc-end-again'); const fresh = w.dcGetEngine();
  assert.notEqual(fresh, old); assert.notEqual(fresh.state.seed, start.seed);
  assert.equal(fresh.state.mode, start.mode); assert.equal(fresh.state.turn, 1);
  assert.equal(fresh.state.winner, null); assert.equal(fresh.state.endReason, null);
  assert(!fresh.state.pending || fresh.state.pending.kind !== 'equip');
  assert(fresh.state.startCoin && !fresh.state.startCoin.forced, 'new regular opening coin');
  for (const pid of [0, 1]) {
    assert.equal(JSON.stringify(deckIds(fresh.player(pid))), JSON.stringify(deckIds(start.players[pid])));
    assert.equal(JSON.stringify(docs(fresh.player(pid))), JSON.stringify(docs(start.players[pid])));
    assert.equal(fresh.player(pid).vp, 0);
  }
  assert(!fresh.log.some(entry => /99|5 Siegpunkte/.test(entry.msg)), 'new engine log');
  assert.equal(starts, 1, 'fresh match begins a new log exactly once');
  assert(stopped >= 2); assert(!w.document.getElementById('dc-end-screen'));
  assert.equal(h.errors.length, 0);
  h.dom.window.close();
}
{
  const h = setup('off'), { w, eng } = h;
  eng._end(0, '5 Siegpunkte'); w.dcRender();
  const buttons = w.document.querySelectorAll('.dc-end-buttons button');
  buttons[1].focus(); buttons[1].dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true }));
  assert.equal(w.document.activeElement, buttons[0], 'focus stays in end dialog');
  buttons[0].dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true }));
  assert.equal(w.document.activeElement, buttons[1]);
  h.dom.window.close();
}
{
  const h = setup('off'), { w, click } = h;
  const records = [];
  let logId = 0;
  w.DCPlayStore = { uid: () => 'game-' + (++logId), put: (table, value) => { records.push(JSON.parse(JSON.stringify(value))); return Promise.resolve(); } };
  w.eval(fs.readFileSync(path.join(WEB, 'js/playtest/logger.js'), 'utf8'));
  w.document.getElementById('mode').value = 'hotseat';
  w.dcStart();
  const eng = w.dcGetEngine(), firstLog = w.DCPlayLogger.getCurrent();
  assert(firstLog && !firstLog.end);
  click('#btn-concede');
  assert(w.document.getElementById('dc-end-screen'), 'concede click shows result, no auto menu transition');
  const completed = w.DCPlayLogger.getCurrent();
  assert.equal(completed.end.kind, 'completed');
  const terminalWrites = records.filter(r => r.id === firstLog.id && r.end).length;
  w.dcRender(); w.dcRender();
  assert.equal(records.filter(r => r.id === firstLog.id && r.end).length, terminalWrites, 'renders never re-finalize logger');
  click('#dc-end-again');
  const nextLog = w.DCPlayLogger.getCurrent();
  assert.notEqual(nextLog.id, firstLog.id); assert(!nextLog.end); assert.equal(nextLog.turns.length, 0);
  const nextTurns = nextLog.turns.length;
  eng.dispatch({ type: 'END_TURN', player: 0 });
  assert.equal(nextLog.turns.length, nextTurns, 'stale ended engine cannot log into new match');
  h.dom.window.close();
}
const css = fs.readFileSync(path.join(WEB, 'css/end-screen.css'), 'utf8');
assert(css.includes('overflow-y: auto') && css.includes('flex-wrap: wrap') && css.includes('max-width: 480px'));
console.log(`PASS ${checked} terminal reason/perspective cases, draw, postgame guards, once-only logging/audio, rematch, menu/LAN lobby, focus trap; responsive CSS checked (not browser-rendered)`);
