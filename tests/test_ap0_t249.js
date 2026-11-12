#!/usr/bin/env node
/**
 * t249: AP-Preise und Engine-Wirkung der zehn zuvor 0-AP-Soforteinsätze.
 * Läuft über `npm test` von der Repo-Wurzel.
 */
'use strict';
const assert = require('node:assert/strict');
const L = require('../scripts/nation_pools/load_game.js');

const w = L.loadGame({ quiet: true });
const C = w.DC_CATALOG.cards;
const byId = Object.fromEntries(C.map((c) => [c.id, c]));

const EXPECT = {
  dc_so_luftschlag: 4,
  dc_so_dammbruch: 5, // t283: AP-6+ auf 5 (max. AP 5)
  dc_so_massen: 5, // t283: AP-6+ auf 5 (max. AP 5)
  dc_so_mobil: 4,
  dc_so_blinder_gehorsam: 5, // t283: AP-6+ auf 5 (max. AP 5)
  dc_so_gassen: 5, // t283: AP-6+ auf 5 (max. AP 5)
  dc_so_mobilisierung: 3,
  dc_so_deckung: 2,
  dc_so_selbst: 2,
  dc_so_letzter: 3,
};

for (const [id, ap] of Object.entries(EXPECT)) {
  const c = byId[id];
  assert.ok(c, 'fehlt ' + id);
  assert.equal(c.typ, 'Soforteinsatz', id + ' typ');
  assert.equal(Number(c.ap), ap, id + ' soll ' + ap + ' AP kosten, ist ' + c.ap);
}
console.log('ok gedruckte AP für 10 Karten');

function fresh(ap) {
  const eng = L.newMatch(w, 'Steinmark', 11);
  L.clearBoard(eng);
  eng.state.active = 0;
  eng.state.phase = 'main';
  eng.player(0).ap = ap == null ? 8 : ap;
  eng.player(0).hand = [];
  return eng;
}

function hasCode(c, code) {
  return (c.effects || []).some((e) => e.code === code);
}
function unit(minDef) {
  const plain = (c) => {
    if (c.typ !== 'Einheit' || Number(c.def) < (minDef || 4)) return false;
    if (['SCHADEN_MINUS', 'REDUCE_DAMAGE', 'AA_REDUCE'].some((k) => hasCode(c, k))) return false;
    if ((c.effects || []).some((e) => e.code === 'CM' && e.param && e.param.k === 'negate')) return false;
    const kw = [].concat(c.keywords || [], c.kw || []);
    if (kw.includes('Zähigkeit') || kw.includes('Abschirmung')) return false;
    return true;
  };
  return C.find((c) => plain(c) && Number(c.atk) >= 1) || C.find(plain);
}

function infantry() {
  return C.find((c) => c.typ === 'Einheit' && Array.isArray(c.tags) && c.tags.includes('infanterie') && Number(c.def) >= 3);
}

function supportCard() {
  return C.find((c) => c.typ === 'Unterstützung');
}

function play(eng, id) {
  const def = byId[id];
  const inst = eng.instFromId(id, 0);
  eng.player(0).hand.push(inst);
  const r = eng.dispatch({ type: 'PLAY', player: 0, uid: inst.uid });
  return { inst, def, r };
}

function logMsgs(eng) {
  const log = Array.isArray(eng.log) ? eng.log : [];
  return log.map((x) => String((x && (x.msg || x.text)) || x));
}

// Luftschlag: 5 Schaden, 4 AP, Einheit
{
  const eng = fresh(5);
  const u = unit(6);
  const inst = L.put(eng, 1, u.id, 'C', 0);
  if ((inst.def || 0) < 6) { inst.def = 6; inst.defMax = Math.max(inst.defMax || 0, 6); }
  const ap0 = eng.player(0).ap;
  const { inst: card, r } = play(eng, 'dc_so_luftschlag');
  assert.ok(r.ok, 'Luftschlag PLAY ' + (r && r.error));
  assert.equal(eng.state.pending && eng.state.pending.kind, 'air-strike');
  const r2 = eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: inst.uid });
  assert.ok(r2.ok, 'Luftschlag RESOLVE ' + (r2 && r2.error));
  assert.equal(ap0 - eng.player(0).ap, 4, 'Luftschlag 4 AP');
  assert.ok(logMsgs(eng).some((m) => /nimmt 5 Schaden/.test(m)), 'Luftschlag 5 Schaden im Log: ' + logMsgs(eng).slice(-4).join(' | '));
  console.log('ok Luftschlag 5 Schaden / 4 AP');
}

// Dammbruch: gesamte gegnerische Unterstützung weg, 5 AP (t283)
{
  const eng = fresh(5);
  const sdef = supportCard();
  assert.ok(sdef, 'keine Unterstützung');
  const a = eng.instFromId(sdef.id, 1);
  const b = eng.instFromId(sdef.id, 1);
  eng.player(1).support[0] = a;
  eng.player(1).support[1] = b;
  const { r } = play(eng, 'dc_so_dammbruch');
  assert.ok(r.ok, 'Dammbruch PLAY ' + (r && r.error));
  assert.equal(eng.player(1).support.filter(Boolean).length, 0, 'Support geleert');
  assert.ok(eng.player(1).grave.some((c) => c.uid === a.uid) && eng.player(1).grave.some((c) => c.uid === b.uid), 'Support im Friedhof');
  assert.equal(eng.player(0).ap, 0, 'Dammbruch 5 AP');
  console.log('ok Dammbruch räumt Support / 5 AP');
}

// Generalmobilmachung: ziehe 3, +2 AP, zahlt 4 → netto −2, Hand +3
{
  const eng = fresh(5);
  const p = eng.player(0);
  const before = p.hand.length;
  const deck0 = p.deck.length;
  const { r } = play(eng, 'dc_so_mobil');
  assert.ok(r.ok, 'Generalmobilmachung PLAY ' + (r && r.error));
  assert.equal(p.hand.length, before + 3, 'zieht 3');
  assert.equal(p.deck.length, deck0 - 3, 'Deck −3');
  assert.equal(p.ap, 5 - 4 + 2, 'netto −2 AP (zahlt 4, erhält 2)');
  console.log('ok Generalmobilmachung Draw 3 / +2 AP / zahlt 4');
}

// Deckung suchen: +3 V, endet beim Angriff, 2 AP; als Reaktion ohne eigenen-Zug-Sperre
{
  const eng = fresh(3);
  const u = unit(4);
  const mine = L.put(eng, 0, u.id, 'C', 0);
  mine.def = 4; mine.defMax = 4;
  const foe = L.put(eng, 1, u.id, 'C', 0);
  foe.def = 5; foe.defMax = 5;
  const ap0 = eng.player(0).ap;
  const { r } = play(eng, 'dc_so_deckung');
  assert.ok(r.ok, 'Deckung PLAY ' + (r && r.error));
  assert.equal(eng.state.pending && eng.state.pending.kind, 'cover-seek');
  const r2 = eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: mine.uid });
  assert.ok(r2.ok, 'Deckung RESOLVE ' + (r2 && r2.error));
  assert.equal(ap0 - eng.player(0).ap, 2, 'Deckung 2 AP');
  assert.equal(mine.def, 7, 'Def +3, def=' + mine.def);
  assert.equal(mine.defMax, 7, 'defMax +3');
  assert.ok((mine.tokens || []).some((t) => t.type === 'deckung'), 'Deckungsmarke');
  mine.attackUsed = false;
  mine.flags.exhausted = false;
  const atk = eng.dispatch({ type: 'ATTACK', player: 0, uid: mine.uid, target: foe.uid });
  assert.ok(atk.ok, 'Angriff nach Deckung ' + (atk && atk.error));
  // nach Angriff fällt der Bonus (mind. 1 bleibt)
  assert.equal(mine.defMax, 4, 'defMax nach Angriff wieder 4, ist ' + mine.defMax);
  assert.ok(!(mine.tokens || []).some((t) => t.type === 'deckung'), 'Marke nach Angriff weg');
  assert.ok(eng.player(0).grave.some((c) => (c.id || c.cardId) === 'dc_so_deckung'), 'Karte auf dem Friedhof');
  console.log('ok Deckung suchen +3 V, fällt beim Angriff / 2 AP');
}

{
  const eng = fresh(1);
  L.put(eng, 0, unit(4).id, 'C', 0);
  const { r } = play(eng, 'dc_so_deckung');
  assert.ok(!r.ok, 'Deckung mit 1 AP unerschwinglich');
  console.log('ok Deckung unerschwinglich bei 1 AP');
}

// Selbstopfer: eigene Einheit weg, zwei gegnerische in Reichweite weg, 2 AP
{
  const eng = fresh(4);
  const u = unit(3);
  const self = L.put(eng, 0, u.id, 'C', 1);
  const f1 = L.put(eng, 1, u.id, 'C', 0);
  const f2 = L.put(eng, 1, u.id, 'C', 1);
  const f3 = L.put(eng, 1, u.id, 'C', 2);
  const ap0 = eng.player(0).ap;
  const { r } = play(eng, 'dc_so_selbst');
  assert.ok(r.ok, 'Selbstopfer PLAY ' + (r && r.error));
  assert.equal(eng.state.pending && eng.state.pending.kind, 'selfsac-self');
  const r2 = eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: self.uid });
  assert.ok(r2.ok, 'Selbstopfer self ' + (r2 && r2.error));
  assert.ok(!eng.player(0).front.C[1], 'eigene Einheit geopfert');
  const pend = eng.state.pending;
  assert.equal(pend && pend.kind, 'selfsac-foe');
  const choices = (pend.choices || []).map((c) => c.target);
  assert.ok(choices.length >= 2, 'mindestens zwei Ziele in Reichweite, got ' + choices.length);
  const t1 = choices[0], t2 = choices[1];
  const r3 = eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: t1 });
  assert.ok(r3.ok, 'ziel 1 ' + (r3 && r3.error));
  if (eng.state.pending && eng.state.pending.kind === 'selfsac-foe') {
    const r4 = eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: t2 });
    assert.ok(r4.ok, 'ziel 2 ' + (r4 && r4.error));
  }
  const alive = [f1, f2, f3].filter((x) => {
    const loc = eng.findInst(x.uid);
    return loc && loc.zone === 'front';
  });
  assert.equal(alive.length, 1, 'zwei Gegner zerstört, lebendig=' + alive.length);
  assert.equal(ap0 - eng.player(0).ap, 2, 'Selbstopfer 2 AP');
  console.log('ok Selbstopfer 1:2 Zerstörung / 2 AP');
}

// Mobilisierung: bis zu 2 Infanterie auf die Hand, eine frei spielbar, 3 AP
{
  const eng = fresh(5);
  const inf = infantry() || unit(3);
  const p = eng.player(0);
  // Deck mit mindestens 3 Infanterie füllen
  const extra = [eng.instFromId(inf.id, 0), eng.instFromId(inf.id, 0), eng.instFromId(inf.id, 0)];
  p.deck = extra.concat(p.deck || []);
  const hand0 = p.hand.length;
  const ap0 = p.ap;
  const { r } = play(eng, 'dc_so_mobilisierung');
  assert.ok(r.ok, 'Mobilisierung PLAY ' + (r && r.error));
  const pend = eng.state.pending;
  assert.ok(pend && (pend.kind === 'mob-pick' || pend.kind === 'mob-play'), 'pending ' + (pend && pend.kind));
  if (pend.kind === 'mob-pick') {
    const ch = pend.choices || [];
    assert.ok(ch.length >= 2, 'Auswahl aus dem Deck');
    eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: ch[0].target });
    eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: ch[1].target });
  }
  assert.equal(eng.state.pending && eng.state.pending.kind, 'mob-play', 'dann eine frei spielen');
  assert.equal(p.hand.filter((c) => (c.id || c.cardId) === inf.id).length, 2, '2 Infanterie auf der Hand');
  assert.equal(ap0 - p.ap, 3, 'Mobilisierung 3 AP');
  const playUid = eng.state.pending.pool[0];
  const rPlay = eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: playUid });
  assert.ok(rPlay.ok, 'mob-play ' + (rPlay && rPlay.error));
  assert.equal(eng.state.pending && eng.state.pending.kind, 'deploy');
  const slot = (eng.state.pending.choices || [])[0] && eng.state.pending.choices[0].slot;
  assert.ok(slot, 'freier Slot');
  const placed = eng.dispatch({ type: 'CHOOSE_SLOT', player: 0, slot });
  const alt = placed.ok ? placed : eng.dispatch({ type: 'SLOT', player: 0, slot });
  assert.ok((placed && placed.ok) || (alt && alt.ok), 'frei ausgelegt ' + ((placed && placed.error) || (alt && alt.error) || ''));
  const onFront = ['L', 'C', 'R'].some((s) => (eng.player(0).front[s] || []).some((x) => x && x.uid === playUid));
  assert.ok(onFront, 'Infanterie steht an der Front');
  assert.equal(p.ap, ap0 - 3, 'Auslegen kostenlos');
  console.log('ok Mobilisierung 2 Inf auf Hand, eine frei / 3 AP');
}

// Psychologie der Massen: 5 AP (t283), beliebig viele Einheiten kostenlos nacheinander
{
  const eng = fresh(5);
  const u = unit(3);
  const a = eng.instFromId(u.id, 0);
  const b = eng.instFromId(u.id, 0);
  eng.player(0).hand.push(a, b);
  const { r } = play(eng, 'dc_so_massen');
  assert.ok(r.ok, 'Massen PLAY ' + (r && r.error));
  assert.equal(eng.player(0).ap, 0, 'Massen 5 AP');
  assert.equal(eng.state.pending && eng.state.pending.kind, 'mass-pick');
  const r2 = eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: a.uid });
  assert.ok(r2.ok, 'mass-pick ' + (r2 && r2.error));
  assert.equal(eng.state.pending && eng.state.pending.kind, 'deploy');
  const slot = eng.state.pending.choices[0].slot;
  let placed = eng.dispatch({ type: 'CHOOSE_SLOT', player: 0, slot });
  if (!placed.ok) placed = eng.dispatch({ type: 'SLOT', player: 0, slot });
  assert.ok(placed.ok, 'Massen deploy ' + (placed && placed.error));
  const onFront = ['L', 'C', 'R'].some((s) => (eng.player(0).front[s] || []).some((x) => x && x.uid === a.uid));
  assert.ok(onFront, 'erste Einheit liegt');
  assert.equal(eng.state.pending && eng.state.pending.kind, 'mass-pick', 'weitere Einheit anbieten');
  const slotWait = eng.dispatch({ type: 'CONFIRM_TARGETS', player: 0 });
  assert.ok(slotWait.ok, 'fertig ' + (slotWait && slotWait.error));
  assert.equal(eng.state.pending, null, 'Folge beendet');
  const stillHand = eng.player(0).hand.some((c) => c.uid === b.uid);
  assert.ok(stillHand, 'zweite Einheit bleibt auf der Hand wenn man aufhört');
  console.log('ok Psychologie der Massen 5 AP, Folge, vorzeitig beenden');
}

// Blinder Gehorsam: +2 ATK, freie Angriffe der Front
{
  const eng = fresh(5);
  const u = unit(3);
  const mine = L.put(eng, 0, u.id, 'C', 0);
  const foe = L.put(eng, 1, u.id, 'C', 0);
  foe.def = 20; foe.defMax = 20;
  const printed = Number((eng.defOf(mine).atk));
  const ap0 = eng.player(0).ap;
  const { r } = play(eng, 'dc_so_blinder_gehorsam');
  assert.ok(r.ok, 'Gehorsam PLAY ' + (r && r.error));
  assert.equal(eng.player(0).ap, ap0 - 5, 'Gehorsam 5 AP');
  assert.equal(mine.flags.commandAtkUntil, eng.state.turn, '+2-Flag');
  const stats = eng.currentAtkDef(mine);
  assert.equal(stats.atk, printed + 2, 'ATK +2, got ' + stats.atk);
  assert.equal(eng.state.pending && eng.state.pending.kind, 'command-atk', 'Zielwahl');
  const tgt = (eng.state.pending.choices || []).map((c) => c.target);
  assert.ok(tgt.includes(foe.uid), 'Feind ist Ziel');
  const startDef = foe.def;
  const r2 = eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: foe.uid });
  assert.ok(r2.ok, 'Gehorsam Angriff ' + (r2 && r2.error));
  assert.equal(eng.player(0).ap, ap0 - 5, 'Angriff ohne AP');
  assert.ok(foe.def < startDef, 'Schaden durch befohlenen Angriff');
  console.log('ok Blinder Gehorsam +2 ATK, freier Angriff / 5 AP');
}

{
  const eng = fresh(5);
  const u = unit(3);
  eng.player(0).deck = [];
  for (let i = 0; i < 3; i++) eng.player(0).deck.unshift(eng.instFromId(u.id, 0));
  const { r } = play(eng, 'dc_so_gassen');
  assert.ok(r.ok, 'Gassen PLAY ' + (r && r.error));
  assert.equal(eng.player(0).ap, 0, 'Gassen 5 AP');
  assert.ok(eng.state.pending && (eng.state.pending.kind === 'gassen-slot' || eng.state.pending.kind === 'gassen-pick'), 'pending ' + (eng.state.pending && eng.state.pending.kind));
  let steps = 0;
  while (eng.state.pending && steps++ < 12) {
    const pend = eng.state.pending;
    if (pend.kind === 'gassen-pick') {
      const ch = pend.choices || [];
      const need = pend.needCount || ch.length;
      for (let i = 0; i < need && i < ch.length; i++) {
        const rr = eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: ch[i].target });
        assert.ok(rr.ok, 'gassen-pick ' + (rr && rr.error));
        if (!eng.state.pending || eng.state.pending.kind !== 'gassen-pick') break;
      }
      continue;
    }
    if (pend.kind === 'gassen-slot' || pend.kind === 'deploy') {
      const slot = (pend.choices || []).map((c) => c.slot).find(Boolean);
      assert.ok(slot, 'Slot');
      let pl = eng.dispatch({ type: 'CHOOSE_SLOT', player: 0, slot });
      if (!pl.ok) pl = eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, slot });
      assert.ok(pl.ok, 'gassen place ' + (pl && pl.error));
      continue;
    }
    break;
  }
  const onFront = ['L', 'C', 'R'].reduce((n, s) => n + (eng.player(0).front[s] || []).filter(Boolean).length, 0);
  assert.equal(onFront, 3, 'drei Einheiten offen ausgelegt, got ' + onFront);
  console.log('ok Einsame Gassen 5 AP, Front aus dem Deck gefüllt');
}

{
  const eng = fresh(3);
  const u = unit(3);
  const a = L.put(eng, 0, u.id, 'C', 0);
  const b = L.put(eng, 0, u.id, 'L', 0);
  a.atk = 2; a.def = 4; a.defMax = 4;
  const { r } = play(eng, 'dc_so_letzter');
  assert.ok(r.ok, 'Letzter PLAY ' + (r && r.error));
  assert.equal(eng.state.pending && eng.state.pending.kind, 'last-stand');
  const r2 = eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: a.uid });
  assert.ok(r2.ok, 'Letzter resolve ' + (r2 && r2.error));
  assert.equal(eng.player(0).ap, 0, 'Letzter 3 AP');
  assert.ok(eng.player(0).front.C[0], 'Überlebende bleibt');
  assert.ok(!eng.player(0).front.L[0], 'zweite Einheit geopfert');
  assert.equal(!!a.flags.letzterDerSteht, true, 'Flag letzterDerSteht');
  assert.equal(a.atk, 3, ' +1 ATK, atk=' + a.atk);
  assert.equal(a.def, 5, ' +1 DEF, def=' + a.def);
  const vp1 = eng.player(1).vp || 0;
  const loc = eng.findInst(a.uid);
  loc.inst.def = 0;
  eng._destroy(loc);
  assert.equal(eng.player(1).vp, vp1 + 1, 'Gegner +1 SP beim Tod');
  console.log('ok Der Letzte der steht 3 AP, Opfer, +1/+1, SP-Pfad');
}

console.log('PASS ap0 t249: Preise und geprüfte Wirkungen');
