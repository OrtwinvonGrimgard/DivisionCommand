#!/usr/bin/env node
/**
 * Regression t244: reparierte Ausrüstungswerte und Verbindungssiegel ohne heimlichen ATK-Bonus.
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
'use strict';
/* t244: Parser-Nullwerte an drei Ausrüstungen und Verbindungssiegel ohne heimlichen ATK-Bonus. */
const assert = require('node:assert/strict');
const L = require('../scripts/nation_pools/load_game.js');
const w = L.loadGame({ quiet: true });
const C = w.DC_CATALOG.cards;
/**
 * Sucht eine Kartendefinition anhand der ID im geladenen Katalog.
 */
const by = (id) => { const c = C.find((x) => x.id === id); assert.ok(c, id); return c; };

/**
 * Liest die Effektliste einer Karte bzw. Instanz.
 */
function fx(c) { return c.effects || []; }
/**
 * Prüft, ob ein bestimmter Effektcode auf der Karte vorkommt.
 */
function has(c, pred) { return fx(c).some(pred); }
/**
 * Liest einen Ausrüstungswert (ATK/DEF) aus dem Effekt.
 */
function stat(c) {
  const e = fx(c).find((x) => x.code === 'EQUIP_STAT');
  assert.ok(e, c.id + ' EQUIP_STAT');
  return e.param || {};
}

const platte = by('dc_b_panzerplatte_serie_178');
assert.equal(platte.text, 'Nur an Panzer. +2 DEF, −1 ATK.');
assert.equal(stat(platte).atk, -1);
assert.equal(stat(platte).def, 2);
assert.equal(stat(platte).only, 'panzer');

const ziel = by('dc_b_zieloptik_konzern_177');
assert.match(ziel.text, /Nur an Aufklärung oder Artillerie/);
assert.match(ziel.text, /\+1 ATK gegen beobachtete Ziele/);
assert.equal(stat(ziel).only, 'artillerie|aufklaerung');
assert.ok(has(ziel, (e) => e.code === 'CM' && e.param && e.param.k === 'vs' && e.param.vs === 'observed' && e.param.atk === 1), 'Zieloptik CM vs observed');

const pass = by('dc_b_passoptik_255');
assert.match(pass.text, /Nur an Aufklärung oder Artillerie/);
assert.match(pass.text, /eingerückt/);
assert.equal(stat(pass).only, 'artillerie|aufklaerung');
assert.ok(has(pass, (e) => e.code === 'CM' && e.param && e.param.k === 'vs' && e.param.vs === 'entering' && e.param.atk === 1), 'Passoptik CM vs entering');

const siegel = by('dc_b_verbindungssiegel_839');
assert.equal(siegel.text, 'Beim Anlegen: decke eine verdeckte gegnerische Einheit auf.');
assert.equal(fx(siegel).length, 1);
assert.equal(fx(siegel)[0].code, 'REVEAL');
assert.equal(fx(siegel)[0].param.count, 1);
assert.ok(!has(siegel, (e) => e.code === 'CM'), 'Verbindungssiegel ohne CM-vs');

// runtime: Panzerplatte ändert Trägerwerte; nicht an Infanterie anlegbar
function giveHand(eng, pid, id) {
  const inst = eng.instFromId(id, pid);
  eng.player(pid).hand.push(inst);
  return inst;
}
/**
 * Spielt eine Ausrüstung im Test auf eine vorhandene Einheit.
 */
function playEquip(eng, host, eqId) {
  const eq = giveHand(eng, 0, eqId);
  const r = eng.dispatch({ type: 'PLAY', player: 0, uid: eq.uid });
  return { r, eq, pend: eng.state.pending };
}

{
  const eng = L.newMatch(w, 'Vael', 11);
  L.clearBoard(eng);
  const pz = L.put(eng, 0, 'dc_b_werkrott_kolonne_614', 'C', 0);
  const before = { atk: eng.currentAtkDef(pz).atk, def: pz.def };
  const { pend } = playEquip(eng, pz, 'dc_b_panzerplatte_serie_178');
  assert.ok(pend && pend.kind === 'equip', 'equip pending');
  assert.ok(pend.choices.some((c) => c.target === pz.uid), 'Panzer ist Ziel');
  eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: pz.uid });
  assert.equal(pz.attachments.length, 1);
  const st = eng.currentAtkDef(pz);
  assert.equal(st.atk, before.atk - 1, 'platte −1 ATK, got ' + st.atk);
  assert.equal(pz.def, before.def + 2, 'platte +2 DEF, got ' + pz.def);
}

{
  const eng = L.newMatch(w, 'Vael', 12);
  L.clearBoard(eng);
  const inf = L.put(eng, 0, 'dc_eh_freiwilligenzug', 'C', 0);
  const eq = giveHand(eng, 0, 'dc_b_panzerplatte_serie_178');
  let threw = false;
  try {
    const r = eng.dispatch({ type: 'PLAY', player: 0, uid: eq.uid });
    if (r && r.ok && eng.state.pending && eng.state.pending.kind === 'equip') {
      assert.ok(!eng.state.pending.choices.some((c) => c.target === inf.uid), 'Infanterie kein Ziel für Panzerplatte');
    } else {
      threw = !r || !r.ok;
    }
  } catch (e) {
    threw = true;
  }
  assert.ok(threw || (eng.state.pending && !eng.state.pending.choices.some((c) => c.target === inf.uid)), 'Panzerplatte nicht an Infanterie');
}

{
  const eng = L.newMatch(w, 'Vael', 13);
  L.clearBoard(eng);
  const art = L.put(eng, 0, 'dc_eh_haubitze', 'C', 0);
  const { pend } = playEquip(eng, art, 'dc_b_zieloptik_konzern_177');
  assert.ok(pend && pend.kind === 'equip' && pend.choices.some((c) => c.target === art.uid), 'Zieloptik an Artillerie');
}

{
  const eng = L.newMatch(w, 'Lyr', 14);
  L.clearBoard(eng);
  const auf = C.find((c) => c.nation === 'Lyr' && (c.typ === 'Aufklärung' || (c.tags || []).includes('aufklaerung')) && c.typ === 'Einheit')
    || C.find((c) => (c.tags || []).includes('aufklaerung') && c.typ === 'Einheit');
  assert.ok(auf, 'Aufklärungs-Einheit');
  const u = L.put(eng, 0, auf.id, 'C', 0);
  const { pend } = playEquip(eng, u, 'dc_b_passoptik_255');
  assert.ok(pend && pend.kind === 'equip' && pend.choices.some((c) => c.target === u.uid), 'Passoptik an Aufklärung');
}

console.log('test_equip_fix_t244: OK');
