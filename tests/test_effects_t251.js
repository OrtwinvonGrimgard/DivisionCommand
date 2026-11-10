/**
 * t251: Vertragsclip-Aura, Blitzkrieg-Unterstützungssperre, Schläferzelle-Neutralisierung.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const L = require('../scripts/nation_pools/load_game.js');

const CLIP = 'dc_b_vertragsclip_182';
const ELITE = 'dc_eh_kommando';
const INF = 'dc_eh_freiwilligenzug';
const PANZER = 'dc_eh_donner';
const INSTANT = 'dc_so_luftschlag';
const ART = 'dc_su_artillerie';
const SLEEPER = 'dc_su_schlaefer';
const DOK = 'dc_dok_blitzkrieg';

function boot() {
  const w = L.loadGame({ quiet: true });
  const eng = L.newMatch(w, 'Steinmark', 11);
  L.clearBoard(eng);
  eng.state.players.forEach((p) => {
    p.hand = []; p.deck = []; p.grave = []; p.ap = 10; p.flags = p.flags || {};
  });
  eng.state.pending = null;
  eng.state.turn = 4;
  eng.state.active = 0;
  eng.state.phase = 'main';
  return { w, eng };
}

function giveDoctrine(eng, pid, id) {
  const d = eng.instFromId(id, pid);
  eng.player(pid).doctrines = [d];
  return d;
}

function putSupport(eng, pid, id) {
  const inst = eng.instFromId(id, pid);
  inst.summonedTurn = -9;
  inst.playedTurn = -9;
  inst.flags = inst.flags || {};
  const p = eng.player(pid);
  const i = p.support.findIndex((x) => !x);
  if (i < 0) p.support.push(inst);
  else p.support[i] = inst;
  return inst;
}

function playFromHand(eng, pid, id) {
  const inst = eng.instFromId(id, pid);
  eng.player(pid).hand.push(inst);
  return { inst, r: eng.dispatch({ type: 'PLAY', player: pid, uid: inst.uid }) };
}

function endTurn(eng, pid) {
  const r = eng.dispatch({ type: 'END_TURN', player: pid });
  assert.ok(r && r.ok !== false, 'Zugende ' + pid);
  return r;
}

// --- Vertragsclip ---
{
  const { eng } = boot();
  const elite = L.put(eng, 0, ELITE, 'C', 0);
  const inf = L.put(eng, 0, INF, 'L', 0);
  const luft = eng.byId[INSTANT];
  const base = eng.costOf(luft, eng.player(0));
  assert.equal(base, 4, 'Luftschlag ohne Aura 4 AP');

  const { inst: clip, r } = playFromHand(eng, 0, CLIP);
  assert.ok(r && r.ok, 'Clip spielen');
  assert.equal(eng.state.pending && eng.state.pending.kind, 'equip');
  const ids = (eng.state.pending.choices || []).map((c) => c.target);
  assert.ok(ids.includes(elite.uid), 'Elite ist Träger');
  assert.ok(!ids.includes(inf.uid), 'gewöhnliche Infanterie ist kein Träger');
  eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: elite.uid });
  assert.ok((elite.attachments || []).some((a) => a.uid === clip.uid), 'Clip an Elite');
  assert.equal(eng.costOf(luft, eng.player(0)), 3, 'Luftschlag −1 durch Vertragsclip');

  // zweiter Clip stapelt
  const { r: r2 } = playFromHand(eng, 0, CLIP);
  assert.ok(r2 && r2.ok);
  eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: elite.uid });
  assert.equal(eng.costOf(luft, eng.player(0)), 2, 'zwei Clips stapeln auf −2');
  console.log('ok t251 Vertragsclip an Elite, Stapel, Trägerfilter');
}

{
  const { eng } = boot();
  const sup = putSupport(eng, 0, ART);
  const { inst: clip, r } = playFromHand(eng, 0, CLIP);
  assert.ok(r && r.ok);
  const ids = (eng.state.pending.choices || []).map((c) => c.target);
  assert.ok(ids.includes(sup.uid), 'Unterstützung ist Träger');
  eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: sup.uid });
  assert.ok((sup.attachments || []).some((a) => a.uid === clip.uid));
  assert.equal(eng.costOf(eng.byId[INSTANT], eng.player(0)), 3, 'Clip an Unterstützung senkt Sofortkosten');
  console.log('ok t251 Vertragsclip an Unterstützung');
}

// --- Blitzkrieg ---
{
  const { eng } = boot();
  giveDoctrine(eng, 0, DOK);
  L.put(eng, 0, INF, 'C', 0);
  L.put(eng, 1, INF, 'C', 0);
  const art = putSupport(eng, 1, ART);
  art.flags.exhausted = false;

  // ohne Sperre: P1 kann Feuerauftrag einleiten (nach Zugwechsel, ohne Panzer)
  endTurn(eng, 0);
  assert.equal(eng.state.active, 1);
  const open = eng.dispatch({ type: 'ACTIVATE_SUPPORT', player: 1, uid: art.uid });
  assert.ok(open && open.ok, 'ohne Panzer ist die Fähigkeit offen');
  if (eng.state.pending) eng.dispatch({ type: 'CANCEL_PENDING', player: 1 });
  // zurück zu P0
  endTurn(eng, 1);

  const { inst: pz, r } = playFromHand(eng, 0, PANZER);
  assert.ok(r && r.ok);
  assert.equal(eng.state.pending && eng.state.pending.kind, 'deploy');
  const slotAct = (eng.listActions(0) || []).find((a) => a.type === 'CHOOSE_SLOT' || (a.type === 'RESOLVE_PENDING' && (a.slot || a.section)));
  const slot = slotAct && slotAct.slot ? slotAct.slot : { section: 'L', row: 0 };
  const placed = eng.dispatch({ type: 'CHOOSE_SLOT', player: 0, slot });
  assert.ok(placed && placed.ok !== false, 'Panzer ausgelegt');
  assert.equal(eng.player(1).flags.blitzLock, 2, 'Sperre zählt 2 nach Ausspielung');
  assert.ok(eng._supportLocked(1), 'P1 ist gesperrt');

  endTurn(eng, 0);
  assert.equal(eng.state.active, 1);
  assert.equal(eng.player(1).flags.blitzLock, 1, 'Sperre überlebt das Zugende des Ausspielenden');
  assert.ok(eng._supportLocked(1));
  let blocked = null;
  try { blocked = eng.dispatch({ type: 'ACTIVATE_SUPPORT', player: 1, uid: art.uid }); }
  catch (e) { blocked = { ok: false, error: e.message }; }
  if (blocked && blocked.ok) assert.fail('Feuerauftrag trotz Blitzkrieg-Sperre');
  assert.match(String(blocked.error || blocked.code || ''), /Blitzkrieg|Sperre|nicht aktivierbar/i);

  endTurn(eng, 1);
  assert.ok(!eng._supportLocked(1), 'Sperre endet am Zugende des Gegners');
  endTurn(eng, 0);
  const again = eng.dispatch({ type: 'ACTIVATE_SUPPORT', player: 1, uid: art.uid });
  assert.ok(again && again.ok, 'nach Ablauf wieder aktivierbar');
  if (eng.state.pending) eng.dispatch({ type: 'CANCEL_PENDING', player: 1 });
  console.log('ok t251 Blitzkrieg sperrt gegnerische Unterstützung eine Runde');
}

// --- Schläferzelle ---
{
  const { eng } = boot();
  L.put(eng, 0, INF, 'C', 0); // AP der Freiwilligen typisch ≤ 3
  const sl = putSupport(eng, 1, SLEEPER);
  sl.flags.sleeper = 1;
  eng.player(0).ap = 5;
  eng.player(0).hand = [];
  const acts = eng.listActions(0) || [];
  const neut = acts.find((a) => a.ability === 'NEUTRALIZE' && a.uid === sl.uid);
  assert.ok(neut, 'listActions bietet Neutralisieren');
  assert.equal(neut.cost, 2);
  const r = eng.dispatch({ type: 'ACTIVATE_SUPPORT', player: 0, uid: sl.uid });
  assert.ok(r && r.ok, 'Neutralisieren per dispatch');
  assert.equal(eng.player(0).ap, 3, '2 AP bezahlt');
  assert.ok(!(eng.player(1).support || []).some((s) => s && s.uid === sl.uid), 'Schläferzelle entfernt');
  assert.ok((eng.player(1).grave || []).some((c) => c.uid === sl.uid), 'liegt auf dem Friedhof');
  console.log('ok t251 Neutralisierung 2 AP per listActions/dispatch');
}

{
  const { eng } = boot();
  const sl = putSupport(eng, 1, SLEEPER);
  sl.flags.sleeper = 3;
  eng.player(0).ap = 1;
  let fail = null;
  try { fail = eng.dispatch({ type: 'ACTIVATE_SUPPORT', player: 0, uid: sl.uid }); }
  catch (e) { fail = { ok: false, error: e.message }; }
  if (fail && fail.ok) assert.fail('Neutralisieren ohne AP');
  assert.ok((eng.player(1).support || []).some((s) => s && s.uid === sl.uid), 'bleibt liegen');
  console.log('ok t251 Neutralisierung ohne AP unmöglich');
}

{
  const { w, eng } = boot();
  L.put(eng, 0, INF, 'C', 0);
  L.put(eng, 0, INF, 'L', 0);
  const sl = putSupport(eng, 1, SLEEPER);
  sl.flags.sleeper = 1;
  eng.player(0).ap = 6;
  eng.player(0).hand = [];
  if (!w.DCBot) {
    vm.runInNewContext(fs.readFileSync(path.join(L.WEB, 'js/ai/bot.js'), 'utf8'), { window: w, console: { log() {}, warn() {} }, Math, JSON, Object, Array, String, Number, Error });
  }
  const DCBot = w.DCBot;
  DCBot.applyCfg({ model: 'test', delayMs: 0, aggression: 70, holdAp: 0, allowAttack: 1 });
  let seen = false;
  const skip = {};
  for (let i = 0; i < 12; i++) {
    const act = DCBot.step(eng, 0, skip) || { type: 'END_TURN', player: 0 };
    if (act.ability === 'NEUTRALIZE' || (act.type === 'ACTIVATE_SUPPORT' && act.uid === sl.uid)) {
      const r = eng.dispatch(act);
      assert.ok(r && r.ok, 'Bot-Neutralisierung');
      seen = true;
      break;
    }
    const r = eng.dispatch(act);
    if (!r || r.ok === false) skip[DCBot.actKey ? DCBot.actKey(act) : JSON.stringify(act)] = 1;
    if (act.type === 'END_TURN') break;
  }
  assert.ok(seen, 'Bot wählt Neutralisieren ohne Hänger');
  assert.ok((eng.player(1).grave || []).some((c) => c.uid === sl.uid));
  console.log('ok t251 Bot bedient Neutralisieren ohne Hänger');
}

console.log('PASS effects t251');
