/**
 * Verdeckte Support-Fallen lösen bei Feindkontakt als Reaktion ohne AP aus (RULES §12.1).
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
'use strict';
/* t238: Verdeckte Fallen im Support lösen als Feindkontakt-Reaktion aus (RULES §12.1). */
const assert = require('assert');
const L = require('../scripts/nation_pools/load_game.js');
const w = L.loadGame({ quiet: true });
const cards = w.DC_CATALOG.cards;
const eng = L.newMatch(w, 'Steinmark', 21);
const st = eng.state;
const atkP = eng.player(st.active), defP = eng.opponent(st.active);
st.pending = null; st.heldAttack = null;
const unitId = cards.find((c) => c.typ === 'Einheit' && (c.atk || 0) >= 1 && (c.def || 0) >= 3 && !(c.effects || []).length).id;
/**
 * Legt eine Einheit aus dem Katalog auf eine Stellung.
 */
const put = (pl, sec) => { const u = eng.instFromId(unitId, pl.id); u.summonedTurn = -9; u.facedown = false; pl.front[sec][0] = u; return u; };
['L', 'C', 'R'].forEach((s) => [0, 1, 2].forEach((r) => { atkP.front[s][r] = null; defP.front[s][r] = null; }));
const attacker = put(atkP, 'C');
const target = put(defP, 'C');
// Falle: Soforteinsatz mit LAY_MINE, verdeckt im Support (AP beim Legen bezahlt).
const trapDef = cards.find((c) => c.typ === 'Soforteinsatz' && (c.effects || []).some((e) => e.code === 'LAY_MINE'));
assert.ok(trapDef, 'LAY_MINE-Karte vorhanden');
const trap = eng.instFromId(trapDef.id, defP.id);
trap.facedown = true; trap.flags.trap = true;
defP.support = defP.support || [];
const si = defP.support.findIndex((s) => !s);
if (si < 0) defP.support.push(trap); else defP.support[si] = trap;
defP.hand = []; defP.ap = 0; atkP.ap = 5;
const r = eng.dispatch({ type: 'ATTACK', player: atkP.id, uid: attacker.uid, target: target.uid });
assert.ok(r.ok, 'Angriff legal: ' + JSON.stringify(r));
assert.strictEqual(st.pending && st.pending.kind, 'react-window', 'Feindkontakt öffnet');
const acts = eng.listActions(defP.id);
const pick = acts.find((a) => a.type === 'RESOLVE_PENDING' && a.target === trap.uid);
assert.ok(pick, 'verdeckte Falle wird mit 0 AP angeboten');
assert.ok(acts.some((a) => a.type === 'REACT_PASS'), 'Weitergeben bleibt legal');
const r2 = eng.dispatch(Object.assign({ player: defP.id }, pick));
assert.ok(r2.ok, 'Falle löst aus: ' + JSON.stringify(r2));
assert.ok(!defP.support.some((c) => c && c.uid === trap.uid), 'Falle verlässt den Support');
assert.strictEqual(trap.facedown, false, 'Falle ist aufgedeckt');
assert.strictEqual(defP.ap, 0, 'keine AP verbraucht');
assert.strictEqual(st.pending && st.pending.kind, 'lay-mine', 'Mine wird gelegt');
// Nicht auslösbare Falle: bleibt verdeckt liegen, wird nicht erneut angeboten.
const eng2 = L.newMatch(w, 'Steinmark', 22);
const a2 = eng2.player(eng2.state.active), d2 = eng2.opponent(eng2.state.active);
eng2.state.pending = null;
['L', 'C', 'R'].forEach((s) => [0, 1, 2].forEach((r0) => { a2.front[s][r0] = null; d2.front[s][r0] = null; }));
const t2 = eng2.instFromId(trapDef.id, d2.id); t2.facedown = true; t2.flags.trap = true;
d2.support = [t2]; d2.ap = 0;
eng2.state.pending = { kind: 'react-window', player: d2.id, choices: [{ target: t2.uid, label: 'x' }], prompt: 'Feindkontakt!' };
const r3 = eng2.dispatch({ type: 'RESOLVE_PENDING', player: d2.id, target: t2.uid });
assert.ok(!r3.ok, 'ohne eigene Front nicht auslösbar');
assert.ok(d2.support[0] === t2 && t2.facedown, 'Falle bleibt verdeckt im Support');
assert.ok(!d2.hand.some((c) => c.uid === t2.uid), 'nicht auf der Hand');
assert.strictEqual(JSON.stringify(eng2.listActions(d2.id).map((a) => a.type)), JSON.stringify(['REACT_PASS']));
console.log('PASS hidden trap: verdeckte Support-Falle löst als Reaktion ohne AP aus, sonst bleibt sie liegen');
