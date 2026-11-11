/**
 * t271: Das Feindkontakt-Fenster bietet nur Reaktionen an, deren Bedingung erfüllt ist
 * (ui-play Seed 1234: „Militärische Ehren“ ohne Veteranen wurde angeboten und scheiterte).
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
'use strict';
const assert = require('assert');
const L = require('../scripts/nation_pools/load_game.js');
const w = L.loadGame({ quiet: true });
const cards = w.DC_CATALOG.cards;
const unitId = cards.find((c) => c.typ === 'Einheit' && (c.atk || 0) >= 1 && (c.def || 0) >= 3 && !(c.effects || []).length).id;
const honorsDef = cards.find((c) => c.typ === 'Soforteinsatz' && (c.effects || []).some((e) => e.code === 'HONORS'));
assert.ok(honorsDef, 'HONORS-Karte vorhanden');

/**
 * Baut einen Angriff auf und liefert die Feindkontakt-Wahlen des Verteidigers.
 * @param {number} kills Abschüsse der verteidigenden Einheit
 * @param {boolean} trap HONORS verdeckt im Support statt auf der Hand
 * @returns {{eng:object, def:object, card:object, acts:object[]}}
 */
function setup(kills, trap) {
  const eng = L.newMatch(w, 'Steinmark', 31 + kills);
  const st = eng.state;
  const atkP = eng.player(st.active), defP = eng.opponent(st.active);
  st.pending = null; st.heldAttack = null;
  ['L', 'C', 'R'].forEach((s) => [0, 1, 2].forEach((r) => { atkP.front[s][r] = null; defP.front[s][r] = null; }));
  const put = (pl) => { const u = eng.instFromId(unitId, pl.id); u.summonedTurn = -9; u.facedown = false; pl.front.C[0] = u; return u; };
  const attacker = put(atkP);
  const target = put(defP);
  target.flags.kills = kills;
  const card = eng.instFromId(honorsDef.id, defP.id);
  defP.hand = []; defP.support = [];
  if (trap) { card.facedown = true; card.flags.trap = true; defP.support.push(card); } else defP.hand.push(card);
  defP.ap = 3; atkP.ap = 5;
  const r = eng.dispatch({ type: 'ATTACK', player: atkP.id, uid: attacker.uid, target: target.uid });
  assert.ok(r.ok, 'Angriff legal: ' + JSON.stringify(r));
  const acts = st.pending && st.pending.kind === 'react-window' ? eng.listActions(defP.id) : [];
  return { eng, def: defP, card, acts };
}

[false, true].forEach((trap) => {
  const none = setup(0, trap);
  assert.ok(!none.acts.some((a) => a.target === none.card.uid), 'ohne Veteranen nicht angeboten (trap=' + trap + ')');
  const vet = setup(1, trap);
  const pick = vet.acts.find((a) => a.type === 'RESOLVE_PENDING' && a.target === vet.card.uid);
  assert.ok(pick, 'mit Veteran angeboten (trap=' + trap + ')');
  const r = vet.eng.dispatch(Object.assign({ player: vet.def.id }, pick));
  assert.ok(r.ok, 'Wahl gelingt: ' + JSON.stringify(r));
});
console.log('PASS react usable t271: Feindkontakt bietet Militärische Ehren nur mit Veteranen an');
