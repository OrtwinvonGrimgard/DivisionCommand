/**
 * t254: Bot-KI nutzt Unterstützungsfähigkeiten und Sonderkarten sinnvoll.
 * Szenarien direkt auf der Engine; der Bot wird wie in smoke_sim über `DCBot.step` gefragt,
 * jede Antwort muss `dispatch` annehmen. Läuft über `npm test` von der Repo-Wurzel.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const L = require('../scripts/nation_pools/load_game.js');

const INF = 'dc_eh_freiwilligenzug'; // 1 AP, 2/2 Infanterie
const ELITE = 'dc_eh_kommando'; // 5 AP, 5/4 Elite
const PANZER = 'dc_eh_donner'; // 3 AP, 4/4 Panzer
const ART = 'dc_su_artillerie'; // Feuerauftrag 2 AP, 3 Schaden
const SLEEPER = 'dc_su_schlaefer';
const MASSEN = 'dc_so_massen';
const LETZTER = 'dc_so_letzter';
const BLITZ = 'dc_dok_blitzkrieg';

/**
 * Frische Partie mit leerem Brett, Spieler 0 am Zug, Bot geladen.
 * @returns {{w: object, eng: object, Bot: object}}
 */
function boot() {
  const w = L.loadGame({ quiet: true });
  vm.runInNewContext(fs.readFileSync(path.join(L.WEB, 'js/ai/bot.js'), 'utf8'), { window: w, console: { log() {}, warn() {} }, Math, JSON, Object, Array, String, Number, Error });
  const eng = L.newMatch(w, 'Steinmark', 21);
  L.clearBoard(eng);
  eng.state.players.forEach((p) => { p.hand = []; p.deck = []; p.grave = []; p.ap = 5; p.flags = p.flags || {}; p.doctrines = []; });
  eng.state.pending = null; eng.state.turn = 6; eng.state.active = 0; eng.state.phase = 'main';
  return { w, eng, Bot: w.DCBot };
}
/** Karte auf die Hand. */
function hand(eng, pid, id) { const c = eng.instFromId(id, pid); eng.player(pid).hand.push(c); return c; }
/** Karte in die Unterstützung (nicht frisch). */
function support(eng, pid, id) {
  const inst = eng.instFromId(id, pid); inst.summonedTurn = -9; inst.playedTurn = -9; inst.flags = inst.flags || {};
  const p = eng.player(pid); const i = p.support.findIndex((x) => !x); if (i < 0) p.support.push(inst); else p.support[i] = inst;
  return inst;
}
/** Bot-Schritt, der von dispatch angenommen werden muss. */
function stepOk(eng, Bot, pid) {
  const a = Bot.step(eng, pid, {});
  const r = eng.dispatch(a);
  assert.ok(r && r.ok, 'Bot-Aktion legal: ' + JSON.stringify(a) + ' → ' + (r && r.error));
  return a;
}
/** Offene eigene Wahl mit dem Bot zu Ende führen. */
function resolveAll(eng, Bot, pid) {
  let n = 0;
  while (eng.state.pending && eng.state.pending.player === pid && n++ < 30) stepOk(eng, Bot, pid);
}

// 1) Schläferzelle kurz vor dem Zünden: Neutralisieren vor allem anderen.
{
  const { eng, Bot } = boot();
  L.put(eng, 0, INF, 'C', 0);
  const sl = support(eng, 1, SLEEPER); sl.flags.sleeper = 1;
  hand(eng, 0, INF); hand(eng, 0, PANZER);
  const a = stepOk(eng, Bot, 0);
  assert.equal(a.type, 'ACTIVATE_SUPPORT'); assert.equal(a.ability, 'NEUTRALIZE'); assert.equal(a.uid, sl.uid);
  assert.ok(!eng.player(1).support.some((x) => x && x.uid === sl.uid), 'Schläferzelle entfernt');
  console.log('ok t254 Bot neutralisiert zündbereite Schläferzelle zuerst');
}

// 2) Psychologie der Massen: mit Einheiten auf der Hand spielen und alle auslegen, ohne Einheiten behalten.
{
  const { eng, Bot } = boot();
  eng.player(0).ap = 6;
  L.put(eng, 1, INF, 'C', 0);
  const m = hand(eng, 0, MASSEN); hand(eng, 0, INF); hand(eng, 0, INF); hand(eng, 0, PANZER);
  const a = stepOk(eng, Bot, 0);
  assert.equal(a.type, 'PLAY'); assert.equal(a.uid, m.uid, 'Massen zuerst');
  resolveAll(eng, Bot, 0);
  assert.equal(eng.frontList(eng.player(0)).length, 3, 'alle drei Einheiten ohne AP ausgelegt');
  assert.equal(eng.player(0).ap, 0);
}
{
  const { eng, Bot } = boot();
  eng.player(0).ap = 6;
  L.put(eng, 0, INF, 'C', 0);
  const m = hand(eng, 0, MASSEN);
  const a = Bot.step(eng, 0, {});
  assert.ok(!(a.type === 'PLAY' && a.uid === m.uid), 'Massen ohne Einheiten auf der Hand bleibt auf der Hand');
  console.log('ok t254 Bot spielt Massen nur mit Einheiten auf der Hand');
}

// 3) Der Letzte der steht: keine gesunde Front opfern; Überlebende ist die stärkste Einheit.
{
  const { eng, Bot } = boot();
  L.put(eng, 0, PANZER, 'L', 0); L.put(eng, 0, PANZER, 'C', 0); L.put(eng, 0, PANZER, 'R', 0);
  L.put(eng, 1, INF, 'C', 0);
  const lz = hand(eng, 0, LETZTER);
  const a = Bot.step(eng, 0, {});
  assert.ok(!(a.type === 'PLAY' && a.uid === lz.uid), 'keine drei gesunden Panzer opfern');
}
{
  const { eng, Bot } = boot();
  const elite = L.put(eng, 0, ELITE, 'C', 0); L.put(eng, 0, INF, 'L', 0); L.put(eng, 0, INF, 'R', 0);
  const lz = hand(eng, 0, LETZTER);
  const r = eng.dispatch({ type: 'PLAY', player: 0, uid: lz.uid });
  assert.ok(r && r.ok && eng.state.pending && eng.state.pending.kind === 'last-stand');
  const a = stepOk(eng, Bot, 0);
  assert.equal(a.target, elite.uid, 'Elite bleibt stehen');
  console.log('ok t254 Bot opfert nicht leichtfertig und wählt die stärkste Überlebende');
}

// 4) Unterstützungsfähigkeit ohne Eintrag in listActions: Feuerauftrag gegen ein vernichtbares Ziel.
{
  const { eng, Bot } = boot();
  const art = support(eng, 0, ART);
  const foe = L.put(eng, 1, INF, 'C', 0);
  const a = stepOk(eng, Bot, 0);
  assert.equal(a.type, 'ACTIVATE_SUPPORT'); assert.equal(a.uid, art.uid);
  resolveAll(eng, Bot, 0);
  assert.ok(!eng.frontList(eng.player(1)).some((l) => l.inst.uid === foe.uid), 'Feuerauftrag vernichtet das Ziel');
  console.log('ok t254 Bot nutzt Feuerauftrag der Artilleriestellung');
}

// 5) Blitzkrieg: Panzer vor gleichwertiger Nicht-Panzer-Einheit, wenn der Gegner aktivierbare Unterstützung hat.
{
  const pick = (withDok) => {
    const { eng, Bot } = boot();
    if (withDok) eng.player(0).doctrines = [eng.instFromId(BLITZ, 0)];
    support(eng, 1, ART);
    L.put(eng, 1, INF, 'C', 0);
    // Kommando 5/4 liegt in der Grundbewertung knapp über dem Panzer 4/4.
    Bot.applyCfg({ holdAp: 0 });
    const alt = { id: ELITE };
    const pz = hand(eng, 0, PANZER), other = hand(eng, 0, alt.id);
    const a = Bot.step(eng, 0, {});
    return a.uid === pz.uid ? 'panzer' : (a.uid === other.uid ? 'other' : a.type);
  };
  assert.equal(pick(false), 'other', 'ohne Doktrin die stärkere Einheit');
  assert.equal(pick(true), 'panzer', 'mit Blitzkrieg der Panzer (Sperre gegen Feuerauftrag)');
  console.log('ok t254 Bot nutzt Blitzkrieg-Sperre über Panzer-Timing');
}

// 6) Probe: der Bot schlägt keine Aktion vor, die dispatch ablehnt (Letzter mit nur einer Einheit).
{
  const { eng, Bot } = boot();
  L.put(eng, 0, INF, 'C', 0);
  const lz = hand(eng, 0, LETZTER);
  const a = Bot.step(eng, 0, {});
  assert.ok(!(a.type === 'PLAY' && a.uid === lz.uid));
  const r = eng.dispatch(a);
  assert.ok(r && r.ok, 'Vorschlag legal');
  console.log('ok t254 Bot prüft Aktionen vorab');
}
console.log('PASS test_bot_t254');
