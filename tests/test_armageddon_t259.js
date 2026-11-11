#!/usr/bin/env node
/**
 * Armageddon (t259) exakt nach Kartentext: „Sämtliche Karten und Tokens vom Spielfeld und
 * beide Hände auf den Ablagestapel. Beide ziehen 5. Münze bestimmt, wer wieder beginnt.“
 *  1. Front, Support und Hände beider Spieler landen auf dem eigenen Ablagestapel,
 *     Armageddon selbst ebenfalls; beide haben danach genau 5 Karten; dann die Münze.
 *  2. Leeres Deck: normales Ziehen mischt den Ablagestapel (inkl. eben abgeworfener Karten).
 *  3. Deck + Ablage zusammen < 5: Ziehen endet ohne Fehler und ohne Niederlage.
 *  4. Bot: spielt Armageddon nicht, wenn er auf dem Brett vorne liegt; erwägt es bei klarem Rückstand.
 * Läuft über `npm test` von der Repo-Wurzel.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const L = require('../scripts/nation_pools/load_game.js');

const w = L.loadGame({ quiet: true });
const C = w.DC_CATALOG.cards;
const ARM = C.find((c) => c.id === 'dc_so_armageddon');
assert.ok(ARM, 'Armageddon fehlt');
assert.match(ARM.text, /beide Hände auf den Ablagestapel\. Beide ziehen 5\./);
const UNIT = C.find((c) => c.typ === 'Einheit' && !(c.effects || []).length && !(c.keywords || []).length);
const SUP = C.find((c) => c.typ === 'Unterstützung' && !(c.effects || []).length) || C.find((c) => c.typ === 'Unterstützung');
const FILL = C.find((c) => c.typ === 'Soforteinsatz' && c.id !== ARM.id);

/**
 * Leeres Brett, Spieler 0 am Zug mit Armageddon auf der Hand.
 * @returns {{eng: object, arm: object}}
 */
function fresh() {
  const eng = L.newMatch(w, 'Steinmark', 17);
  L.clearBoard(eng);
  eng.state.active = 0; eng.state.phase = 'main'; eng.state.pending = null;
  eng.player(0).ap = 10;
  eng.player(0).hand = []; eng.player(1).hand = [];
  const arm = eng.instFromId(ARM.id, 0);
  eng.player(0).hand.push(arm);
  return { eng, arm };
}
const cnt = (p) => p.hand.length + p.deck.length + p.grave.length;

// 1. Vollständiger Ablauf
{
  const { eng, arm } = fresh();
  const p0 = eng.player(0), p1 = eng.player(1);
  const u0 = L.put(eng, 0, UNIT.id, 'C', 0), u1 = L.put(eng, 1, UNIT.id, 'L', 0);
  const s1 = eng.instFromId(SUP.id, 1); p1.support[0] = s1;
  for (let i = 0; i < 3; i++) p0.hand.push(eng.instFromId(FILL.id, 0));
  for (let i = 0; i < 4; i++) p1.hand.push(eng.instFromId(FILL.id, 1));
  const oldHand0 = p0.hand.filter((c) => c !== arm).map((c) => c.uid);
  const oldHand1 = p1.hand.map((c) => c.uid);
  const deck0 = p0.deck.length, deck1 = p1.deck.length;
  assert.ok(deck0 >= 5 && deck1 >= 5, 'Decks groß genug');
  const r = eng.dispatch({ type: 'PLAY', player: 0, uid: arm.uid });
  assert.equal(r.ok, true, JSON.stringify(r));
  assert.equal(eng.frontList(p0).length + eng.frontList(p1).length, 0, 'Front leer');
  assert.ok([...p0.support, ...p1.support].every((x) => !x), 'Support leer');
  assert.equal(p0.hand.length, 5, 'Ausspieler zieht 5');
  assert.equal(p1.hand.length, 5, 'Gegner zieht 5');
  assert.equal(p0.deck.length, deck0 - 5); assert.equal(p1.deck.length, deck1 - 5);
  const g0 = p0.grave.map((c) => c.uid), g1 = p1.grave.map((c) => c.uid);
  oldHand0.forEach((u) => assert.ok(g0.includes(u), 'alte Hand A auf Ablage'));
  oldHand1.forEach((u) => assert.ok(g1.includes(u), 'alte Hand B auf Ablage'));
  assert.ok(g0.includes(arm.uid), 'Armageddon selbst auf Ablage');
  assert.ok(g0.includes(u0.uid) && g1.includes(u1.uid) && g1.includes(s1.uid), 'Feldkarten auf Ablage');
  assert.equal(eng.state.pending && eng.state.pending.kind, 'coin', 'danach Münze');
  assert.equal(eng.state.pending.reason, 'armageddon');
  const c = eng.dispatch({ type: 'COIN_FLIP', player: 0 });
  assert.equal(c.ok, true);
  assert.equal(eng.state.pending, null);
  assert.equal(eng.player(eng.state.active).ap, eng.rules.ap_per_turn);
}

// 2. Leeres Deck → Ablagestapel wird gemischt (wie beim normalen Ziehen)
{
  const { eng, arm } = fresh();
  const p0 = eng.player(0);
  for (let i = 0; i < 6; i++) p0.hand.push(eng.instFromId(FILL.id, 0));
  p0.deck = []; p0.grave = [];
  const total = cnt(p0) - 1 + 1; // Hand inkl. Armageddon, das ebenfalls abgelegt wird
  const r = eng.dispatch({ type: 'PLAY', player: 0, uid: arm.uid });
  assert.equal(r.ok, true);
  assert.equal(p0.hand.length, 5, 'zieht 5 aus dem neu gemischten Ablagestapel');
  assert.equal(cnt(p0), total, 'keine Karte verloren oder doppelt');
  assert.equal(eng.state.winner, null, 'kein Deckout-Sieg');
}

// 3. Weniger als 5 Karten insgesamt → so viele wie da sind, keine Niederlage
{
  const { eng, arm } = fresh();
  const p1 = eng.player(1);
  p1.deck = [eng.instFromId(FILL.id, 1)]; p1.grave = []; p1.hand = [eng.instFromId(FILL.id, 1)];
  const r = eng.dispatch({ type: 'PLAY', player: 0, uid: arm.uid });
  assert.equal(r.ok, true);
  assert.equal(p1.hand.length, 2, 'Gegner zieht nur die 2 vorhandenen Karten');
  assert.equal(p1.deck.length + p1.grave.length, 0);
  assert.equal(eng.state.winner, null);
  assert.equal(eng.state.pending && eng.state.pending.kind, 'coin');
}

// 4. Bot-Bewertung (über DCBot.step wie smoke_sim)
{
  vm.runInNewContext(fs.readFileSync(path.join(L.WEB, 'js/ai/bot.js'), 'utf8'), { window: w, console: { log() {}, warn() {} }, Math, JSON, Object, Array, String, Number, Error });
  const Bot = w.DCBot;
  Bot.applyCfg({ model: 'test', delayMs: 1, allowInstant: 1 });
  const played = (eng, arm) => {
    for (let i = 0; i < 12; i++) {
      const a = Bot.step(eng, 0, {});
      if (!a || a.type === 'END_TURN') return false;
      if (a.type === 'PLAY' && a.uid === arm.uid) return true;
      const r = eng.dispatch(Object.assign({ player: 0 }, a));
      if (!r || !r.ok) return false;
    }
    return false;
  };
  const lead = fresh();
  ['L', 'C', 'R'].forEach((s) => L.put(lead.eng, 0, UNIT.id, s, 0));
  lead.eng.frontList(lead.eng.player(0)).forEach((l) => { l.inst.attackUsed = true; });
  assert.equal(played(lead.eng, lead.arm), false, 'mit Brettvorsprung behält der Bot Armageddon');
  const behind = fresh();
  ['L', 'C', 'R'].forEach((s) => { L.put(behind.eng, 1, UNIT.id, s, 0); L.put(behind.eng, 1, UNIT.id, s, 1); });
  assert.equal(played(behind.eng, behind.arm), true, 'bei klarem Rückstand spielt der Bot Armageddon');
}
console.log('test_armageddon_t259: ok');
