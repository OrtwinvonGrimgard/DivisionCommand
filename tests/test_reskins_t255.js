/**
 * t255: Reskin-Unterschiede und neue CM-Bedingungen (`is:`, `superior`, `wounded`, `count`,
 * Beobachten-Vorrang, REVEAL `observe`), Sturmangriff `count`, Heilung nur bei Überleben.
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
'use strict';
const assert = require('node:assert/strict');
const L = require('../scripts/nation_pools/load_game.js');

const INF = 'dc_eh_freiwilligenzug';
const PANZER = 'dc_eh_donner';

/**
 * Frisches Match mit leerem Brett.
 * @returns {{w: object, eng: object}}
 */
function boot() {
  const w = L.loadGame({ quiet: true });
  const eng = L.newMatch(w, 'Steinmark', 5);
  L.clearBoard(eng);
  eng.state.players.forEach((p) => { p.hand = []; p.deck = []; p.grave = []; p.ap = 10; p.flags = p.flags || {}; });
  eng.state.turn = 4; eng.state.active = 0; eng.state.phase = 'main';
  return { w, eng };
}
/**
 * Legt eine Unterstützung offen in den ersten freien Platz.
 * @param {object} eng
 * @param {number} pid
 * @param {string} id
 * @returns {object}
 */
function putSupport(eng, pid, id) {
  const inst = eng.instFromId(id, pid); inst.summonedTurn = -9; inst.playedTurn = -9; inst.flags = inst.flags || {};
  const p = eng.player(pid); const i = p.support.findIndex((x) => !x);
  if (i < 0) p.support.push(inst); else p.support[i] = inst;
  return inst;
}
/**
 * Hängt eine Ausrüstung direkt an eine Einheit.
 * @param {object} eng
 * @param {object} host
 * @param {string} id
 * @returns {object}
 */
function attach(eng, host, id) {
  const eq = eng.instFromId(id, host.owner); eq.flags = {};
  host.attachments = (host.attachments || []).concat([eq]);
  return eq;
}
let n = 0;
const ok = (m) => { n += 1; console.log('  ok ' + m); };

// 1) Heilung nach Schaden rettet nicht vor tödlichem Schaden
{
  const { eng } = boot();
  const u = L.put(eng, 0, INF, 'C', 0); attach(eng, u, 'dc_b_nov_werkzeug_835');
  u.def = 1; eng._damage(u, 3);
  assert.equal(u.def, 0, 'tödlicher Treffer bleibt tödlich');
  const v = L.put(eng, 0, INF, 'L', 0); attach(eng, v, 'dc_b_nov_werkzeug_835');
  v.defMax = 4; v.def = 4; eng._damage(v, 2);
  assert.equal(v.def, 3, 'überlebt → heilt 1');
  ok('EQUIP_HEAL_ONCE nur bei Überleben');
}
// 2) Bedingungen is:/superior/wounded
{
  const { eng } = boot();
  const a = L.put(eng, 0, INF, 'C', 0); const b = L.put(eng, 0, PANZER, 'C', 1);
  L.put(eng, 1, INF, 'C', 0);
  const p = eng.player(0);
  assert.equal(eng._cmWhen('is:infanterie', p, a), true);
  assert.equal(eng._cmWhen('is:infanterie', p, b), false);
  assert.equal(eng._cmWhen('is:panzer_art', p, b), true);
  assert.equal(eng._cmWhen('superior', p, a), true, '2 gegen 1');
  L.put(eng, 1, INF, 'C', 1);
  assert.equal(eng._cmWhen('superior', p, a), false, '2 gegen 2');
  assert.equal(eng._cmWhen('wounded', p, null), false);
  a.defMax = (a.def || 2) + 1;
  assert.equal(eng._cmWhen('wounded', p, null), true);
  ok('is:/superior/wounded');
}
// 3) turnheal count (Sicherheitsforum) und is:panzer_art (Auftragsring)
{
  const { eng } = boot();
  const a = L.put(eng, 0, INF, 'L', 0); const b = L.put(eng, 0, INF, 'R', 0); const c = L.put(eng, 0, PANZER, 'C', 0);
  [a, b, c].forEach((x) => { x.defMax = x.def + 2; });
  putSupport(eng, 0, 'dc_b_sicherheitsforum_335');
  const before = [a.def, b.def, c.def];
  eng._cmTurnStart(eng.player(0));
  const healed = [a, b, c].filter((x, i) => x.def > before[i]).length;
  assert.equal(healed, 2, 'zwei verschiedene Einheiten geheilt');
  const { eng: e2 } = boot();
  const i2 = L.put(e2, 0, INF, 'L', 0); const p2 = L.put(e2, 0, PANZER, 'C', 0);
  [i2, p2].forEach((x) => { x.defMax = x.def + 3; });
  putSupport(e2, 0, 'dc_b_auftragsring_154');
  const d0 = [i2.def, p2.def];
  e2._cmTurnStart(e2.player(0));
  assert.equal(i2.def, d0[0], 'Infanterie nicht');
  assert.equal(p2.def, d0[1] + 2, 'Panzer heilt 2');
  ok('turnheal count / is:panzer_art');
}
// 4) Beobachten bevorzugt noch nicht beobachtete Feinde; REVEAL observe markiert sichtbare Feinde
{
  const { eng } = boot();
  const x = L.put(eng, 1, INF, 'L', 0); const y = L.put(eng, 1, INF, 'R', 0);
  x.flags.observed = true;
  eng._cmDo(eng.player(0), 'observe', 1, null);
  assert.equal(!!y.flags.observed, true, 'zweiter Feind markiert');
  const { eng: e2 } = boot();
  const z = L.put(e2, 1, INF, 'C', 0);
  const src = e2.instFromId('dc_b_fruehe_meldung_819', 0);
  e2._applyEffect(e2.player(0), src, { code: 'REVEAL', param: { count: 1, observe: true } }, null);
  assert.equal(!!z.flags.observed, true, 'REVEAL observe ohne verdeckte Feinde');
  ok('observe-Vorrang / REVEAL observe');
}
// 5) Sturmangriff count 2
{
  const { eng } = boot();
  const a = L.put(eng, 0, INF, 'L', 0); const b = L.put(eng, 0, INF, 'C', 0); const c = L.put(eng, 0, INF, 'R', 0);
  eng.player(0).doctrines = [eng.instFromId('dc_dok_sturmangriff', 0)];
  eng._dokTurnStart(eng.player(0));
  assert.equal([a, b, c].filter((u) => u.flags.dokAtk === 2).length, 2, 'zwei Infanterien');
  ok('Sturmangriff count');
}
// 6) Rabatt nur für die genannte Klasse (Lehrbach)
{
  const { eng } = boot();
  putSupport(eng, 0, 'dc_b_lehrbach_937');
  const p = eng.player(0);
  const inf = eng.byId[INF]; const pz = eng.byId[PANZER];
  assert.equal(eng.costOf(inf, p), Math.max(1, inf.ap - 1), 'Infanterie billiger');
  assert.equal(eng.costOf(pz, p), pz.ap, 'Panzer voller Preis');
  ok('discount filter');
}
// 6b) Auswertung hält bis zum Ende des nächsten eigenen Zuges
{
  const { eng } = boot();
  const u = L.put(eng, 1, INF, 'C', 0); u.defMax = 5; u.def = 5;
  eng.player(1).doctrines = [eng.instFromId('dc_dok_auswertung', 1)];
  eng._damage(u, 1); // Spieler 0 ist am Zug
  assert.equal(u.flags.dokAuswUntil, eng.state.turn + 1, 'gilt im nächsten Zug von Spieler 1');
  ok('Auswertung bis nächster eigener Zug');
}
// 7) Bot spielt volle Partien mit den geänderten Decks; jede Bot-Aktion muss dispatch bestehen
{
  const fs = require('node:fs'); const path = require('node:path'); const vm = require('node:vm');
  const w = L.loadGame({ quiet: true });
  vm.runInNewContext(fs.readFileSync(path.join(L.WEB, 'js/ai/bot.js'), 'utf8'), { window: w, console: { log() {}, warn() {} }, Math, JSON, Object, Array, String, Number, Error });
  const Bot = w.DCBot; assert.ok(Bot && Bot.step, 'Bot geladen');
  const D = w.DC_NATION_DECKS;
  [['Averon', 'Sahr'], ['Lyr', 'Ossaria'], ['Vael', 'Caldris'], ['Theryn', 'Karsk']].forEach(([a, b], k) => {
    const eng = new w.DCEngine.Engine(w.DC_CATALOG, { seed: 40 + k });
    eng.createMatch({ seed: 40 + k, mode: 'hotseat', startPlayer: 0, deck0: D[a].cards.slice(), deck1: D[b].cards.slice(), doctrine0: D[a].doktrinen.slice(), doctrine1: D[b].doktrinen.slice(), name0: a, name1: b });
    let steps = 0;
    while (eng.state.winner == null && steps < 6000 && eng.state.turn <= 30) {
      const pid = eng.state.pending ? eng.state.pending.player : eng.state.active;
      const act = Bot.step(eng, pid, {});
      const r = eng.dispatch(act);
      assert.ok(r && r.ok !== false, a + '/' + b + ' Bot-Aktion legal: ' + JSON.stringify(act) + ' → ' + (r && r.error));
      steps += 1;
    }
    assert.ok(eng.state.winner != null || eng.state.turn > 10, a + '/' + b + ' Partie läuft');
  });
  ok('Bot-Partien ohne Hänger');
}
console.log('PASS t255 reskins: ' + n + ' Prüfungen');
