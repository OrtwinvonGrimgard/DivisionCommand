#!/usr/bin/env node
/**
 * t267: Die 14 Karten aus der Prüfung t265 (docs/regeln/TEXT_ENGINE_AUDIT_T265.md) wirken wie gedruckt.
 * Je Karte ein Einzeltest auf leerem Brett (eigene und gegnerische Werte vor/nach dem Ausspielen).
 * Läuft über `npm test` von der Repo-Wurzel. Lesarten: docs/regeln/KARTEN_T267.md.
 */
'use strict';
const assert = require('node:assert/strict');
const L = require('../scripts/nation_pools/load_game.js');

const w = L.loadGame({ quiet: true });
const C = w.DC_CATALOG.cards;
const byId = Object.fromEntries(C.map((c) => [c.id, c]));
const plain = (f) => C.find((c) => c.typ === 'Einheit' && !(c.effects || []).length && !(c.keywords || []).length && f(c));
const TANK = plain((c) => (c.tags || []).includes('panzer') && c.def >= 4);
const INF = plain((c) => (c.tags || []).includes('infanterie') && !(c.tags || []).includes('panzer') && !(c.tags || []).includes('fahrzeug') && c.def >= 4);
const ELITE = C.find((c) => c.typ === 'Einheit' && c.klasse === 'Elite' && !(c.keywords || []).length && !(c.effects || []).some((e) => /AURA|PASSIVE|CM/.test(e.code)));
assert.ok(TANK && INF && ELITE, 'Testeinheiten');
let passed = 0;

/**
 * Leeres Brett, Spieler 0 am Zug mit viel AP, leeren Händen und vollen Decks.
 * @returns {object} Engine
 */
function fresh() {
  const eng = L.newMatch(w, 'Steinmark', 267);
  L.clearBoard(eng);
  eng.state.active = 0; eng.state.phase = 'main'; eng.state.pending = null; eng.state.heldAttack = null;
  [0, 1].forEach((i) => { const p = eng.player(i); p.ap = 20; p.hand = []; p.flags = p.flags || {}; });
  return eng;
}
/**
 * Spielt eine Karte und beantwortet offene Wahlen der Reihe nach mit den angegebenen UIDs.
 * @param {object} eng
 * @param {string} id Karten-ID
 * @param {string[]} picks Zielfolge
 * @returns {object} letztes Ergebnis
 */
function play(eng, id, picks) {
  const inst = eng.instFromId(id, 0); eng.player(0).hand.push(inst);
  let r = eng.dispatch({ type: 'PLAY', player: 0, uid: inst.uid });
  assert.notEqual(r.ok, false, id + ': ' + JSON.stringify(r));
  for (const t of picks || []) {
    assert.ok(eng.state.pending, id + ': Wahl erwartet für ' + t);
    r = eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: t });
    assert.notEqual(r.ok, false, id + ' Wahl: ' + JSON.stringify(r));
  }
  assert.equal(eng.state.pending, null, id + ': keine offene Wahl mehr (' + (eng.state.pending && eng.state.pending.kind) + ')');
  if (byId[id].typ === 'Soforteinsatz') assert.ok(eng.player(0).grave.some((c) => c.uid === inst.uid), id + ': Karte im Ablagestapel');
  return r;
}
const st = (eng, u) => eng.currentAtkDef(u);
/** Prüft und zählt einen Fall. */
function ok(name, fn) { fn(); passed += 1; }

// --- negateBonus-Familie ---
for (const id of ['dc_b_verfahrensbruch_589', 'dc_b_keine_sterne_529', 'dc_b_modellstopp_463']) {
  ok(id, () => {
    const eng = fresh();
    const foe = L.put(eng, 1, (id === 'dc_b_modellstopp_463' ? TANK : ELITE).id, 'C', 0);
    const own = L.put(eng, 0, INF.id, 'C', 0);
    foe.flags.buffAtk = 2; foe.def += 2; foe.defMax = (foe.defMax || foe.def - 2) + 2;
    const base = byId[foe.cardId || foe.id] || eng.defOf(foe);
    const deck = eng.player(0).deck.length;
    play(eng, id, [foe.uid]);
    assert.equal(eng.player(0).deck.length, deck - 1, id + ': ziehe 1');
    assert.ok(st(eng, foe).atk <= Number(base.atk), id + ': ATK-Bonus negiert');
    assert.ok(foe.def <= Number(base.def), id + ': DEF-Bonus negiert');
    assert.equal(st(eng, own).atk, INF.atk, id + ': eigene Einheit unverändert');
  });
}
ok('Elite-Filter', () => {
  const eng = fresh();
  L.put(eng, 1, TANK.id, 'C', 0);
  const inst = eng.instFromId('dc_b_verfahrensbruch_589', 0); eng.player(0).hand.push(inst);
  const r = eng.dispatch({ type: 'PLAY', player: 0, uid: inst.uid });
  assert.equal(r.ok, false, 'ohne feindliche Elite kein Ziel');
});
ok('dc_b_kein_schrein_284', () => {
  const eng = fresh();
  const foe = L.put(eng, 1, TANK.id, 'C', 0); foe.flags.buffAtk = 2;
  const own = L.put(eng, 0, INF.id, 'L', 0); const own2 = L.put(eng, 0, INF.id, 'R', 0);
  play(eng, 'dc_b_kein_schrein_284', [foe.uid, own2.uid]);
  assert.equal(st(eng, foe).atk, TANK.atk, 'Feindbonus negiert');
  assert.equal(own2.def, INF.def + 1, 'eigene +1 DEF');
  assert.equal(own.def, INF.def, 'nur gewählte eigene');
});
ok('dc_b_stillprobe_467', () => {
  const eng = fresh();
  const foe = L.put(eng, 1, TANK.id, 'C', 0); foe.facedown = true;
  L.put(eng, 1, TANK.id, 'L', 0).facedown = true;
  play(eng, 'dc_b_stillprobe_467', [foe.uid]);
  assert.equal(foe.facedown, false, 'gewählte Einheit aufgedeckt');
  assert.equal(st(eng, foe).atk, TANK.atk - 2, '−2 ATK');
  assert.ok(!/\?/.test(byId.dc_b_stillprobe_467.text), 'Text ohne Fragezeichen');
});
// --- Opfern ---
ok('dc_b_opfergabe_126', () => {
  const eng = fresh();
  const weak = L.put(eng, 0, INF.id, 'L', 0); weak.def = 2;
  const strong = L.put(eng, 0, INF.id, 'C', 0);
  const hurt = L.put(eng, 0, TANK.id, 'R', 0); hurt.def = 1; hurt.defMax = TANK.def;
  const f1 = L.put(eng, 1, TANK.id, 'C', 0), f2 = L.put(eng, 1, TANK.id, 'L', 0);
  // nur DEF ≤ 2 wählbar
  const probe = eng.instFromId('dc_b_opfergabe_126', 0); eng.player(0).hand.push(probe);
  eng.dispatch({ type: 'PLAY', player: 0, uid: probe.uid });
  const ch = eng.state.pending.choices.map((c) => c.target);
  assert.ok(ch.includes(weak.uid) && ch.includes(hurt.uid) && !ch.includes(strong.uid), 'nur DEF ≤ 2');
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: weak.uid });
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: hurt.uid });
  assert.equal(eng.state.pending, null);
  assert.equal(eng.findInst(weak.uid), null, 'geopfert');
  assert.equal(hurt.def, 3, 'andere um 2 geheilt');
  assert.ok(eng.findInst(f1.uid) && eng.findInst(f2.uid), 'keine Feinde zerstört');
});
ok('dc_b_abloesung_660', () => {
  const eng = fresh();
  const old = L.put(eng, 0, TANK.id, 'R', 1);
  const f1 = L.put(eng, 1, TANK.id, 'C', 0), f2 = L.put(eng, 1, TANK.id, 'L', 0);
  const p0 = eng.player(0);
  const cheap = eng.instFromId(INF.id, 0);
  const pricey = C.find((c) => c.typ === 'Einheit' && !(c.effects || []).length && c.ap > TANK.ap + 1);
  const exp = eng.instFromId(pricey.id, 0);
  p0.hand.push(cheap, exp);
  play(eng, 'dc_b_abloesung_660', [old.uid]);
  assert.equal(eng.findInst(old.uid), null, 'eigene zerstört');
  const placed = p0.front.R.find((u) => u && u.uid === cheap.uid);
  assert.ok(placed, 'Einheit aus der Hand in denselben Abschnitt');
  assert.ok(p0.hand.some((c) => c.uid === exp.uid), 'zu teure Einheit bleibt auf der Hand');
  assert.equal(placed.def, INF.def, 'Heilen um 1 ändert unbeschädigte Einheit nicht (kein Max-Bonus)');
  assert.ok(eng.findInst(f1.uid) && eng.findInst(f2.uid), 'keine Feinde zerstört');
});
// --- Ausrüstung ---
/**
 * Rüstet eine Einheit aus.
 * @param {object} eng
 * @param {string} id Ausrüstung
 * @param {object} host Träger
 */
function equip(eng, id, host) { play(eng, id, [host.uid]); }
ok('dc_b_verbandskasten_351', () => {
  const eng = fresh();
  const a = L.put(eng, 0, INF.id, 'C', 0), n = L.put(eng, 0, INF.id, 'C', 1);
  equip(eng, 'dc_b_verbandskasten_351', a);
  a.def = 1; n.def = 1;
  eng.dispatch({ type: 'END_TURN', player: 0 });
  assert.equal(a.def, 2, 'Träger heilt 1 am Zugende ohne Angriff');
  assert.equal(n.def, 1, 'Nachbar heilt nicht');
  eng.dispatch({ type: 'END_TURN', player: 1 });
  assert.equal(a.def, 2, 'keine Heilung zu Zugbeginn');
  a.attackUsed = true; eng.dispatch({ type: 'END_TURN', player: 0 });
  assert.equal(a.def, 2, 'nach Angriff keine Heilung');
});
ok('dc_b_werkstattmarke_657', () => {
  const eng = fresh();
  const tank = L.put(eng, 0, TANK.id, 'C', 0); const inf = L.put(eng, 0, INF.id, 'L', 0);
  const inst = eng.instFromId('dc_b_werkstattmarke_657', 0); eng.player(0).hand.push(inst);
  eng.dispatch({ type: 'PLAY', player: 0, uid: inst.uid });
  const ch = eng.state.pending.choices.map((c) => c.target);
  assert.ok(ch.includes(tank.uid) && !ch.includes(inf.uid), 'nur Panzer/Fahrzeug');
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: tank.uid });
  assert.equal(tank.def, TANK.def + 1, '+1 DEF');
  tank.def -= 2;
  const before = tank.def;
  eng.dispatch({ type: 'END_TURN', player: 0 }); eng.dispatch({ type: 'END_TURN', player: 1 });
  assert.equal(tank.def, before + 1, 'heilt 1 zu Zugbeginn, solange beschädigt');
});
ok('dc_b_lokalisierung_480', () => {
  const eng = fresh();
  const a = L.put(eng, 0, INF.id, 'C', 0);
  const t = L.put(eng, 1, INF.id, 'C', 0); t.def = 9; t.defMax = 9;
  equip(eng, 'dc_b_lokalisierung_480', a);
  const atk = st(eng, a).atk;
  const r = eng.dispatch({ type: 'ATTACK', player: 0, uid: a.uid, target: t.uid });
  while (eng.state.pending) {
    const acts = eng.listActions(eng.state.pending.player);
    const pass = acts.find((x) => x.pass) || acts[0];
    eng.dispatch(Object.assign({ player: eng.state.pending.player }, pass));
  }
  assert.notEqual(r.ok, false, JSON.stringify(r));
  assert.equal(t.def, 9 - 1 - atk, 'Ziel −1 DEF zusätzlich zum Schaden');
});
// --- Feindziel, eigener Bonus ---
ok('dc_b_notimplantat_402', () => {
  const eng = fresh();
  const foe = L.put(eng, 1, TANK.id, 'C', 0); const own = L.put(eng, 0, INF.id, 'C', 0); L.put(eng, 0, INF.id, 'L', 0);
  play(eng, 'dc_b_notimplantat_402', [foe.uid, own.uid]);
  assert.equal(foe.def, TANK.def - 1, '1 Schaden'); assert.equal(st(eng, foe).atk, TANK.atk, 'Feind ohne Bonus');
  assert.equal(st(eng, own).atk, INF.atk + 1, 'eigene +1 ATK'); assert.equal(own.def, INF.def + 1, 'eigene +1 DEF');
});
ok('dc_b_stosstrupp_419', () => {
  const eng = fresh();
  const foe = L.put(eng, 1, TANK.id, 'C', 0); const own = L.put(eng, 0, INF.id, 'C', 0);
  play(eng, 'dc_b_stosstrupp_419', [foe.uid]); // nur eine eigene Einheit: Bonus ohne Wahl
  assert.equal(foe.def, TANK.def - 2, '2 Schaden'); assert.equal(st(eng, foe).atk, TANK.atk, 'Feind ohne Bonus');
  assert.equal(st(eng, own).atk, INF.atk + 3, 'eigene +3 ATK');
});
ok('dc_b_lokalisierung_823', () => {
  const eng = fresh();
  const foe = L.put(eng, 1, TANK.id, 'C', 0); const own = L.put(eng, 0, INF.id, 'C', 0); L.put(eng, 0, INF.id, 'L', 0);
  play(eng, 'dc_b_lokalisierung_823', [foe.uid, own.uid]);
  assert.equal(st(eng, foe).atk, TANK.atk, 'Feind ohne ATK-Bonus'); assert.equal(foe.def, TANK.def - 1, 'Feind −1 DEF');
  assert.equal(st(eng, own).atk, INF.atk + 1, 'eigene +1 ATK'); assert.equal(own.def, INF.def - 1, 'eigene −1 DEF (mind. 1)');
});
ok('dc_b_rasten_341', () => {
  const eng = fresh();
  const f1 = L.put(eng, 1, TANK.id, 'C', 0), f2 = L.put(eng, 1, TANK.id, 'L', 0);
  f1.def = 2; f1.defMax = TANK.def;
  const own = L.put(eng, 0, INF.id, 'C', 0); own.def = 1; own.defMax = INF.def; L.put(eng, 0, INF.id, 'L', 0);
  play(eng, 'dc_b_rasten_341', [f1.uid, f2.uid, own.uid]);
  assert.ok(f1.flags.noAttack && f2.flags.noAttack, 'beide Feinde greifen nicht an');
  assert.equal(f1.def, 2, 'Feind nicht geheilt'); assert.equal(f2.def, TANK.def, 'Feind ohne +1 DEF');
  assert.equal(own.def, 1 + 2 + 1, 'eigene heilt 2 und +1 DEF');
});
// --- gemeinsame Schlüssel ---
ok('Eigen-Bonus: Abbrechen gibt die Karte nicht zurück, direktes Ziel prüft Bedingungen', () => {
  const eng = fresh();
  const foe = L.put(eng, 1, TANK.id, 'C', 0); L.put(eng, 0, INF.id, 'C', 0); L.put(eng, 0, INF.id, 'L', 0);
  const inst = eng.instFromId('dc_b_stosstrupp_419', 0); eng.player(0).hand.push(inst);
  eng.dispatch({ type: 'PLAY', player: 0, uid: inst.uid, target: foe.uid });
  assert.equal(eng.state.pending && eng.state.pending.kind, 'own-bonus', 'Wahl nach direktem Feindziel');
  eng.dispatch({ type: 'CANCEL_PENDING', player: 0 });
  assert.equal(eng.state.pending, null);
  assert.ok(!eng.player(0).hand.some((c) => c.uid === inst.uid) && eng.player(0).grave.some((c) => c.uid === inst.uid), 'Karte gespielt');
  assert.equal(foe.def, TANK.def - 2, 'Schaden bleibt');
  const strong = L.put(eng, 0, INF.id, 'R', 0);
  const op = eng.instFromId('dc_b_opfergabe_126', 0); eng.player(0).hand.push(op);
  const r = eng.dispatch({ type: 'PLAY', player: 0, uid: op.uid, target: strong.uid });
  assert.equal(r.ok, false, 'Opfergabe auf DEF > 2 abgelehnt');
  assert.ok(eng.player(0).hand.some((c) => c.uid === op.uid) && eng.findInst(strong.uid), 'nichts passiert');
});
ok('dc_b_letzter_ruf_130 (gleicher Schlüssel SACRIFICE): nur eigene Infanterie', () => {
  const eng = fresh();
  const inf = L.put(eng, 0, INF.id, 'C', 0), tank = L.put(eng, 0, TANK.id, 'C', 1);
  const f1 = L.put(eng, 1, TANK.id, 'C', 0);
  const probe = eng.instFromId('dc_b_letzter_ruf_130', 0); eng.player(0).hand.push(probe);
  eng.dispatch({ type: 'PLAY', player: 0, uid: probe.uid });
  const ch = eng.state.pending.choices.map((c) => c.target);
  assert.ok(ch.includes(inf.uid) && !ch.includes(tank.uid), 'nur Infanterie');
  eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: inf.uid });
  assert.equal(st(eng, tank).atk, TANK.atk + 2, 'andere im Abschnitt +2 ATK');
  assert.ok(eng.findInst(f1.uid), 'kein Feind zerstört');
});
ok('SACRIFICE ohne then_destroy zerstört keine Feinde (alle Karten)', () => {
  C.filter((c) => (c.effects || []).some((e) => e.code === 'SACRIFICE')).forEach((c) => {
    c.effects.filter((e) => e.code === 'SACRIFICE').forEach((e) => assert.ok(!(e.param || {}).then_destroy, c.id + ' then_destroy nur mit Kartentext'));
  });
});
ok('Feldlazarett-Ausrüstung MEDIZIN 3/2 unverändert', () => {
  const eng = fresh();
  const a = L.put(eng, 0, INF.id, 'C', 0), n = L.put(eng, 0, INF.id, 'C', 1);
  equip(eng, 'dc_eq_med', a);
  eng.dispatch({ type: 'END_TURN', player: 0 });
  a.def = 1; n.def = 1;
  eng.dispatch({ type: 'END_TURN', player: 1 });
  assert.equal(a.def, Math.min(a.defMax, 4), 'Träger +3'); assert.equal(n.def, 3, 'Nachbar +2');
});
ok('Feindziel-Soforteinsätze ohne Gegner-Bonus', () => {
  C.filter((c) => c.typ === 'Soforteinsatz' && c.target && c.target.side === 'enemy').forEach((c) => {
    (c.effects || []).forEach((e) => {
      const q = e.param || {};
      if (e.code === 'BUFF' && !q.enemy && q.side !== 'own') assert.ok(!(Number(q.atk) > 0 || Number(q.def) > 0), c.id + ' stärkt Feind');
      if (e.code === 'HEAL' && q.side !== 'own') assert.fail(c.id + ' heilt Feind');
    });
  });
});
console.log('PASS cards t267: ' + passed + ' Fälle');
