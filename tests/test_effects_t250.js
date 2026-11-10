#!/usr/bin/env node
/**
 * t250: Engine setzt die fünf Soforteinsätze so um, wie der Kartentext es sagt.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const L = require('../scripts/nation_pools/load_game.js');

const w = L.loadGame({ quiet: true });
const C = w.DC_CATALOG.cards;
function hasCode(c, code) { return (c.effects || []).some((e) => e.code === code); }
function unit(minDef) {
  const plain = (c) => c.typ === 'Einheit' && Number(c.def) >= (minDef || 3) && Number(c.atk) >= 1 &&
    !hasCode(c, 'SCHADEN_MINUS') && !((c.keywords || []).includes('Zähigkeit'));
  return C.find(plain);
}
function infantry() {
  return C.find((c) => c.typ === 'Einheit' && (c.tags || []).includes('infanterie') && Number(c.def) >= 2);
}
function fresh(ap) {
  const eng = L.newMatch(w, 'Steinmark', 21);
  L.clearBoard(eng);
  eng.state.active = 0;
  eng.state.phase = 'main';
  eng.player(0).ap = ap == null ? 8 : ap;
  eng.player(0).hand = [];
  return eng;
}
function play(eng, id) {
  const inst = eng.instFromId(id, 0);
  eng.player(0).hand.push(inst);
  return { inst, r: eng.dispatch({ type: 'PLAY', player: 0, uid: inst.uid }) };
}
function frontCount(p) {
  return ['L', 'C', 'R'].reduce((n, s) => n + (p.front[s] || []).filter(Boolean).length, 0);
}

// Massen: zwei Einheiten nacheinander kostenlos auslegen
{
  const eng = fresh(6);
  const u = unit(3);
  const a = eng.instFromId(u.id, 0);
  const b = eng.instFromId(u.id, 0);
  eng.player(0).hand.push(a, b);
  const { r } = play(eng, 'dc_so_massen');
  assert.ok(r.ok, r && r.error);
  function place(uid) {
    assert.equal(eng.state.pending && eng.state.pending.kind, 'mass-pick');
    const r1 = eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: uid });
    assert.ok(r1.ok, r1 && r1.error);
    assert.equal(eng.state.pending && eng.state.pending.kind, 'deploy');
    const slot = eng.state.pending.choices[0].slot;
    let pl = eng.dispatch({ type: 'CHOOSE_SLOT', player: 0, slot });
    if (!pl.ok) pl = eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, slot });
    assert.ok(pl.ok, pl && pl.error);
  }
  place(a.uid);
  place(b.uid);
  assert.equal(frontCount(eng.player(0)), 2, 'beide liegen');
  assert.ok(!eng.player(0).hand.some((c) => c.uid === a.uid || c.uid === b.uid), 'nicht mehr auf der Hand');
  assert.equal(eng.player(0).ap, 0, 'nur die 6 AP der Karte');
  console.log('ok t250 Massen zwei Einheiten frei');
}

// Mobilisierung: bei >2 Infanterie bis zu 2 wählen (hier genau 1)
{
  const eng = fresh(3);
  const inf = infantry() || unit(3);
  const p = eng.player(0);
  const extras = [0, 1, 2, 3].map(() => eng.instFromId(inf.id, 0));
  p.deck = extras.concat(p.deck || []);
  const deckUnits = p.deck.filter((c) => (c.cardId || c.id) === inf.id).length;
  assert.ok(deckUnits >= 4);
  const { r } = play(eng, 'dc_so_mobilisierung');
  assert.ok(r.ok, r && r.error);
  assert.equal(eng.state.pending && eng.state.pending.kind, 'mob-pick');
  assert.equal(!!eng.state.pending.upto, true, 'upto');
  const first = eng.state.pending.choices[0].target;
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: first });
  assert.equal(eng.state.pending && eng.state.pending.kind, 'mob-pick', 'noch nicht fertig nach einer Wahl');
  const conf = eng.dispatch({ type: 'CONFIRM_TARGETS', player: 0 });
  assert.ok(conf.ok, conf && conf.error);
  assert.equal(p.hand.filter((c) => (c.cardId || c.id) === inf.id).length, 1, 'nur eine auf der Hand');
  const back = p.deck.filter((c) => (c.cardId || c.id) === inf.id).length;
  assert.ok(back >= 3, 'Rest zurück im Deck, got ' + back);
  assert.equal(eng.state.pending && eng.state.pending.kind, 'mob-play');
  console.log('ok t250 Mobilisierung bis zu 2 (eine gewählt)');
}

// Blinder Gehorsam: zwei Einheiten greifen nacheinander frei an
{
  const eng = fresh(6);
  const u = unit(3);
  const m1 = L.put(eng, 0, u.id, 'C', 0);
  const m2 = L.put(eng, 0, u.id, 'L', 0);
  const f1 = L.put(eng, 1, u.id, 'C', 0);
  const f2 = L.put(eng, 1, u.id, 'L', 0);
  f1.def = 15; f1.defMax = 15; f2.def = 15; f2.defMax = 15;
  const { r } = play(eng, 'dc_so_blinder_gehorsam');
  assert.ok(r.ok, r && r.error);
  let attacks = 0;
  let steps = 0;
  const defBefore = f1.def + f2.def;
  while (eng.state.pending && eng.state.pending.kind === 'command-atk' && steps++ < 6) {
    const t = eng.state.pending.choices[0].target;
    const rr = eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: t });
    assert.ok(rr.ok, rr && rr.error);
    attacks++;
  }
  assert.equal(attacks, 2, 'beide greifen an, got ' + attacks);
  assert.equal(eng.player(0).ap, 0, 'Angriffe kosten 0, Karte 6');
  assert.ok((f1.def + f2.def) < defBefore, 'Schaden verteilt');
  assert.equal(eng.currentAtkDef(m1).atk, Number(eng.defOf(m1).atk) + 2);
  console.log('ok t250 Gehorsam zwei freie Angriffe');
}

// Einsame Gassen: mehr Einheiten als Slots → Wahl, dann offen hinlegen
{
  const eng = fresh(6);
  const u = unit(3);
  // 7 belegt, 2 frei, 4 Einheiten im Deck → Spieler wählt 2
  for (const [s, r] of [['L', 0], ['L', 1], ['L', 2], ['C', 0], ['C', 1], ['C', 2], ['R', 0]]) {
    L.put(eng, 0, u.id, s, r);
  }
  assert.equal(frontCount(eng.player(0)), 7);
  const ids = [];
  for (let i = 0; i < 4; i++) {
    const c = eng.instFromId(u.id, 0);
    ids.push(c.uid);
    eng.player(0).deck.unshift(c);
  }
  const { r } = play(eng, 'dc_so_gassen');
  assert.ok(r.ok, r && r.error);
  assert.equal(eng.state.pending && eng.state.pending.kind, 'gassen-pick', 'Wahl aus 4 für 2 Plätze');
  assert.equal(eng.state.pending.needCount, 2);
  const ch = eng.state.pending.choices;
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: ch[0].target });
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: ch[1].target });
  let placed = 0;
  let steps = 0;
  while (eng.state.pending && (eng.state.pending.kind === 'gassen-slot' || eng.state.pending.kind === 'deploy') && steps++ < 6) {
    const slot = (eng.state.pending.choices || []).map((c) => c.slot).find(Boolean);
    let pl = eng.dispatch({ type: 'CHOOSE_SLOT', player: 0, slot });
    if (!pl.ok) pl = eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, slot });
    assert.ok(pl.ok, pl && pl.error);
    placed++;
  }
  assert.equal(frontCount(eng.player(0)), 9, 'Front voll');
  assert.equal(placed, 2);
  const leftover = eng.player(0).deck.filter((c) => ids.includes(c.uid)).length;
  assert.equal(leftover, 2, '2 nicht gewählte bleiben im Deck');
  console.log('ok t250 Gassen Wahl und offenes Auslegen');
}

// Der Letzte der steht: zwei Opfer, +2/+2, 1 SP
{
  const eng = fresh(3);
  const u = unit(3);
  const a = L.put(eng, 0, u.id, 'C', 1);
  L.put(eng, 0, u.id, 'L', 0);
  L.put(eng, 0, u.id, 'R', 0);
  a.atk = 2; a.def = 3; a.defMax = 3;
  play(eng, 'dc_so_letzter');
  const r2 = eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: a.uid });
  assert.ok(r2.ok, r2 && r2.error);
  assert.equal(frontCount(eng.player(0)), 1);
  assert.equal(a.atk, 4);
  assert.equal(a.def, 5);
  assert.equal(a.defMax, 5);
  assert.equal(!!a.flags.letzterDerSteht, true);
  const vp = eng.player(1).vp || 0;
  a.def = 0;
  eng._destroy(eng.findInst(a.uid));
  assert.equal(eng.player(1).vp, vp + 1);
  console.log('ok t250 Letzter Opfer +2/+2 und SP');
}

// Bot: die neuen Folgen ohne Hänger zu Ende bringen
{
  if (!w.DCBot) {
    vm.runInNewContext(fs.readFileSync(path.join(L.WEB, 'js/ai/bot.js'), 'utf8'), { window: w, console: { log() {}, warn() {} }, Math, JSON, Object, Array, String, Number, Error });
  }
  const DCBot = w.DCBot;
  assert.ok(DCBot && DCBot.step, 'DCBot');
  DCBot.applyCfg({ model: 'test', delayMs: 0, aggression: 70, holdAp: 0, allowAttack: 1 });
  function drive(eng, max) {
    let steps = 0;
    const fail = {};
    while (eng.state.pending && steps++ < (max || 40)) {
      if (eng.state.pending.player !== 0 && eng.state.pending.kind === 'react-window') {
        const r = eng.dispatch({ type: 'REACT_PASS', player: eng.state.pending.player });
        if (!r.ok) break;
        continue;
      }
      const act = DCBot.step(eng, 0, fail) || { type: 'CANCEL_PENDING', player: 0 };
      const r = eng.dispatch(act);
      if (!r || !r.ok) {
        fail[DCBot.actKey ? DCBot.actKey(act) : JSON.stringify(act)] = 1;
        if (act.type === 'CANCEL_PENDING') break;
      }
    }
    return steps;
  }

  const engM = fresh(6);
  const u = unit(3);
  engM.player(0).hand.push(engM.instFromId(u.id, 0), engM.instFromId(u.id, 0));
  assert.ok(play(engM, 'dc_so_massen').r.ok);
  const sm = drive(engM);
  assert.ok(!engM.state.pending || sm < 40, 'Massen-Bot hängt nicht, pending=' + (engM.state.pending && engM.state.pending.kind));
  assert.ok(frontCount(engM.player(0)) >= 1, 'Bot legt mindestens eine aus');

  const engG = fresh(6);
  const foe = L.put(engG, 1, u.id, 'C', 0);
  foe.def = 12; foe.defMax = 12;
  L.put(engG, 0, u.id, 'C', 0);
  assert.ok(play(engG, 'dc_so_blinder_gehorsam').r.ok);
  drive(engG, 20);
  assert.ok(!engG.state.pending || engG.state.pending.kind !== 'command-atk', 'Gehorsam-Folge beendet');

  const engS = fresh(6);
  for (const [s, r] of [['L', 0], ['L', 1], ['C', 0], ['C', 1], ['R', 0], ['R', 1], ['R', 2]]) L.put(engS, 0, u.id, s, r);
  for (let i = 0; i < 4; i++) engS.player(0).deck.unshift(engS.instFromId(u.id, 0));
  assert.ok(play(engS, 'dc_so_gassen').r.ok);
  drive(engS, 30);
  assert.ok(!engS.state.pending, 'Gassen-Bot endet, kind=' + (engS.state.pending && engS.state.pending.kind));
  assert.equal(frontCount(engS.player(0)), 9, 'Bot füllt die freien Plätze');

  console.log('ok t250 Bot bedient Massen/Gehorsam/Gassen ohne Hänger');
}

console.log('PASS effects t250');
