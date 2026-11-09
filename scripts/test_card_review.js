#!/usr/bin/env node
'use strict';
/* t212 Kartenprüfung: Text = Implementierung. Prüft die allgemeine CM-Mechanik, Ausrüstungs-CM für den Träger,
   strukturierte Zielwahl, Engine-Fixes (Mehrfachziel, COST_NEXT, OUT_OF_COMBAT, EQUIP_HEAL_ONCE pro Zug)
   und die Datenregeln der überarbeiteten Karten. */
const assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const L = require('./nation_pools/load_game.js');
const base = { set: 'test', status: 'live', rarity: 'bronze', typ: 'Einheit', ap: 2, atk: 2, def: 5, tags: ['einheit', 'infanterie'], klasse: 'Infanterie', text: '', effects: [] };
const mk = (id, o) => Object.assign({ id, name: id }, base, o);
const CMx = (p) => ({ code: 'CM', param: p });
const TEST = [
  mk('r_inf'), mk('r_wall', { atk: 0, def: 30 }), mk('r_art', { tags: ['einheit', 'artillerie'], klasse: 'Artillerie' }),
  mk('r_dmg', { effects: [CMx({ k: 'stat', atk: 2, when: 'damaged' })] }),
  mk('r_vs', { effects: [CMx({ k: 'vs', vs: 'damaged', atk: 2 })] }),
  mk('r_sup_art', { typ: 'Unterstützung', ap: 1, tags: ['unterstuetzung'], effects: [CMx({ k: 'aura', scope: 'all', filter: 'artillerie', atk: 1 }), CMx({ k: 'aura', scope: 'all', filter: 'artillerie', atk: 1, when: 'played:Soforteinsatz' })] }),
  mk('r_sup_disc', { typ: 'Unterstützung', ap: 1, tags: ['unterstuetzung'], effects: [CMx({ k: 'discount', delta: -1, once: true })] }),
  mk('r_sup_heal', { typ: 'Unterstützung', ap: 1, tags: ['unterstuetzung'], effects: [CMx({ k: 'turnheal', n: 1 })] }),
  mk('r_gear_still', { typ: 'Ausrüstung', ap: 1, tags: ['ausruestung'], effects: [{ code: 'EQUIP_STAT', param: { atk: 1, def: 0 } }, CMx({ k: 'stat', def: 0, atk: 1, when: 'damaged' })] }),
  mk('r_gear_heal', { typ: 'Ausrüstung', ap: 1, tags: ['ausruestung'], effects: [{ code: 'EQUIP_HEAL_ONCE', param: { heal: 1, perTurn: true } }] }),
  mk('r_ins_two', { typ: 'Soforteinsatz', ap: 0, tags: ['soforteinsatz'], text: 'Wähle 2 eigene Fronteinheiten: je +1 ATK bis Zugende. Ziehe 1 Karte.', target: { needs: true, side: 'own', count: 2, upto: false }, effects: [{ code: 'BUFF', param: { atk: 1, until: 'turn', count: 2 } }, { code: 'DRAW', param: { value: 1 } }] }),
  mk('r_ins_side', { typ: 'Soforteinsatz', ap: 0, tags: ['soforteinsatz'], text: 'Gegner verliert: eigene Einheit +1 ATK.', target: { needs: true, side: 'own', count: 1 }, effects: [{ code: 'BUFF', param: { atk: 1, until: 'turn' } }] }),
  mk('r_ins_ooc', { typ: 'Soforteinsatz', ap: 0, tags: ['soforteinsatz'], text: 'Wähle eine gegnerische Fronteinheit: sie kann in ihrem nächsten Zug nicht angreifen.', target: { needs: true, side: 'enemy', count: 1 }, effects: [{ code: 'OUT_OF_COMBAT' }] }),
  mk('r_ins_cost', { typ: 'Soforteinsatz', ap: 0, tags: ['soforteinsatz'], text: 'Deine nächste Ausrüstung kostet 1 AP weniger (mind. 1).', effects: [{ code: 'COST_NEXT', param: { type: 'Ausrüstung', amount: 1 } }] }),
  mk('r_gear3', { typ: 'Ausrüstung', ap: 3, tags: ['ausruestung'], effects: [{ code: 'EQUIP_STAT', param: { atk: 1, def: 0 } }] }),
];
const w = L.loadGame({ quiet: true, inject: (win) => { win.DC_SET_TYPES.__ReviewTest = TEST; } });
function fresh() { const e = L.newMatch(w, 'Steinmark', 7); L.clearBoard(e); e.state.active = 0; e.state.phase = 'main'; e.player(0).ap = 30; e.player(1).ap = 30; e.player(0).hand = []; return e; }
const put = (e, pid, id, s, r) => L.put(e, pid, id, s, r);
const tick = (e) => e.dispatch({ type: 'NOOP', player: 0 });
const hand = (e, pid, id) => { const i = e.instFromId(id, pid); e.player(pid).hand.push(i); return i; };
const sup = (e, pid, id) => { const i = e.instFromId(id, pid); const p = e.player(pid); const ix = p.support.findIndex((x) => !x); if (ix < 0) p.support.push(i); else p.support[ix] = i; return i; };
const equip = (e, host, id) => { const q = hand(e, 0, id); e.dispatch({ type: 'PLAY', player: 0, uid: q.uid }); const r = e.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: host.uid }); assert(r.ok, r.error); return q; };
let n = 0; const ok = (m) => { n++; console.log('  PASS ' + m); };

{ const e = fresh(); const u = put(e, 0, 'r_dmg', 'C', 0); tick(e);
  assert.equal(e.currentAtkDef(u).atk, 2); u.def = 3; tick(e); assert.equal(e.currentAtkDef(u).atk, 4); ok('CM stat mit Bedingung (beschädigt)'); }
{ const e = fresh(); const a = put(e, 0, 'r_vs', 'C', 0), t = put(e, 1, 'r_wall', 'C', 0); t.def = 29;
  a.attackUsed = false; a.flags.exhausted = false; assert(e.dispatch({ type: 'ATTACK', player: 0, uid: a.uid, target: t.uid }).ok);
  assert.equal(29 - t.def, 4, 'ATK 2 +2 gegen beschädigte Ziele'); ok('CM vs (gegen beschädigte Ziele)'); }
{ const e = fresh(); const a = put(e, 0, 'r_art', 'C', 0), i = put(e, 0, 'r_inf', 'L', 0); sup(e, 0, 'r_sup_art'); tick(e);
  assert.equal(e.currentAtkDef(a).atk, 3); assert.equal(e.currentAtkDef(i).atk, 2, 'nur Artillerie');
  e._cmTrack('instant', { typ: 'Soforteinsatz' }); tick(e); assert.equal(e.currentAtkDef(a).atk, 4, '+1 weitere nach Soforteinsatz'); ok('Unterstützungs-Aura mit Filter und Zugbedingung (Feuerleitung)'); }
{ const e = fresh(); sup(e, 0, 'r_sup_disc'); const p = e.player(0); const ap = p.ap;
  const a = hand(e, 0, 'r_inf'); assert(e.dispatch({ type: 'PLAY', player: 0, uid: a.uid, slot: { section: 'C', row: 0 } }).ok); assert.equal(ap - p.ap, 1, 'erste Einheit −1');
  const b = hand(e, 0, 'r_inf'); const ap2 = p.ap; assert(e.dispatch({ type: 'PLAY', player: 0, uid: b.uid, slot: { section: 'L', row: 0 } }).ok); assert.equal(ap2 - p.ap, 2, 'nur einmal pro Zug'); ok('Rabatt einmal pro Zug (Schichtplan)'); }
{ const e = fresh(); const u = put(e, 0, 'r_inf', 'C', 0); u.def = 2; sup(e, 0, 'r_sup_heal'); e._cmTurnStart(e.player(0)); assert.equal(u.def, 3); ok('Heilung zu Zugbeginn (turnheal)'); }
{ const e = fresh(); const h = put(e, 0, 'r_inf', 'C', 0); equip(e, h, 'r_gear_still'); tick(e);
  assert.equal(e.currentAtkDef(h).atk, 3, 'Träger +1'); h.def -= 1; tick(e); assert.equal(e.currentAtkDef(h).atk, 4, 'CM der Ausrüstung wirkt für den Träger'); ok('Ausrüstungs-CM wirkt für den Träger'); }
{ const e = fresh(); const h = put(e, 0, 'r_wall', 'C', 0); equip(e, h, 'r_gear_heal'); const d0 = h.def;
  e._damage(h, 2); assert.equal(h.def, d0 - 1, 'heilt 1'); e._damage(h, 2); assert.equal(h.def, d0 - 3, 'nur einmal im Zug');
  e.state.turn += 1; e._damage(h, 2); assert.equal(h.def, d0 - 4, 'im nächsten Zug wieder'); ok('EQUIP_HEAL_ONCE perTurn setzt je Zug zurück'); }
{ const e = fresh(); const a = put(e, 0, 'r_inf', 'L', 0), b = put(e, 0, 'r_inf', 'C', 0); const hs = e.player(0).hand.length;
  const c = hand(e, 0, 'r_ins_two'); e.dispatch({ type: 'PLAY', player: 0, uid: c.uid }); assert.equal(e.state.pending.needCount, 2);
  e.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: a.uid }); e.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: b.uid });
  assert(!e.state.pending); assert(a.flags.tempAtk >= 1 && b.flags.tempAtk >= 1);
  assert.equal(e.player(0).hand.length, hs + 1, 'Ziehen nur einmal, nicht je Ziel'); ok('Mehrfachziel: zielfreie Effekte nur einmal'); }
{ const e = fresh(); const own = put(e, 0, 'r_inf', 'C', 0), foe = put(e, 1, 'r_inf', 'C', 0);
  const c = hand(e, 0, 'r_ins_side'); e.dispatch({ type: 'PLAY', player: 0, uid: c.uid });
  const opts = e.state.pending.choices.map((o) => o.target);
  assert(opts.includes(own.uid) && !opts.includes(foe.uid), 'target.side=own schlägt Textheuristik („Gegner“)'); ok('Strukturierte Zielseite hat Vorrang vor Text'); }
{ const e = fresh(); const foe = put(e, 1, 'r_inf', 'C', 0); put(e, 0, 'r_wall', 'C', 0);
  const c = hand(e, 0, 'r_ins_ooc'); e.dispatch({ type: 'PLAY', player: 0, uid: c.uid }); e.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: foe.uid });
  assert(foe.flags.noAttack); assert(e.dispatch({ type: 'END_TURN', player: 0 }).ok); assert.equal(e.state.active, 1);
  assert(foe.flags.noAttack, 'gilt im nächsten gegnerischen Zug'); ok('OUT_OF_COMBAT wirkt im nächsten gegnerischen Zug'); }
{ const e = fresh(); const h = put(e, 0, 'r_inf', 'C', 0); const p = e.player(0);
  const c = hand(e, 0, 'r_ins_cost'); assert(e.dispatch({ type: 'PLAY', player: 0, uid: c.uid }).ok);
  const ap = p.ap; equip(e, h, 'r_gear3'); assert.equal(ap - p.ap, 2, 'Ausrüstung 3 → 2, kein Doppelrabatt');
  const u = hand(e, 0, 'r_inf'); const ap2 = p.ap; e.dispatch({ type: 'PLAY', player: 0, uid: u.uid, slot: { section: 'L', row: 0 } }); assert.equal(ap2 - p.ap, 2, 'Einheit danach voller Preis'); ok('COST_NEXT ohne zusätzlichen Pauschalrabatt'); }

// Daten: überarbeitete Karten
const C = w.DC_CATALOG.cards.filter((c) => c.set !== 'test');
const KINDS = ['stat', 'cost', 'vs', 'enter', 'kill', 'death', 'negate', 'first', 'aura', 'trigger', 'turnheal', 'turn', 'discount', 'hitdebuff'];
C.forEach((c) => (c.effects || []).forEach((e) => { if (e.code === 'CM') assert(KINDS.includes(e.param.k), c.id + ' CM-Art ' + e.param.k); }));
const nat = C.filter((c) => c.set === 'set_nations');
const noImpl = nat.filter((c) => (c.text || '').trim() && !/^Keine Sonderfähigkeit/.test(c.text) && !(c.effects || []).length && !(c.keywords || []).length);
assert.equal(noImpl.length, 0, 'set_nations: kein Fähigkeitstext ohne Implementierung: ' + noImpl.map((c) => c.id).join(','));
ok('set_nations: jede Fähigkeit implementiert (' + nat.length + ' Karten)');
const tgt = C.filter((c) => c.typ === 'Soforteinsatz' && c.target);
tgt.forEach((c) => { if (c.target.side) assert(['own', 'enemy', 'all'].includes(c.target.side), c.id); });
ok('strukturierte Ziele: ' + tgt.length + ' Soforteinsätze');
const abbr = C.filter((c) => /(?<![\w/])[+−-]?\d+\s*(?:V|A)\b(?!P)/.test(c.text || ''));
assert.equal(abbr.length, 0, 'keine alten V/A-Abkürzungen: ' + abbr.map((c) => c.id).join(','));
ok('keine alten V/A-Abkürzungen');
console.log('PASS card review: ' + n + ' Prüfungen');
