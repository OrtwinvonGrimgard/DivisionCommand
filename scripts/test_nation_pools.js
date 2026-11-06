#!/usr/bin/env node
'use strict';
/* Nationenpools: 100 einzigartige Karten je Nation (+2 Doktrinen), Starterdecks 60+2 unverändert, Limits,
   und jede neue Karte wird über die Produktions-Dispatch-Pfade gespielt und ihr Effekt geprüft. */
const assert = require('node:assert/strict');
const L = require('./nation_pools/load_game.js');
const mk = (id, o) => Object.assign({ id, set: 'test', status: 'live', name: id, rarity: 'bronze', typ: 'Einheit', ap: 1, atk: 2, def: 5, tags: ['einheit', 'infanterie'], klasse: 'Infanterie', text: 'Keine Sonderfähigkeit.', effects: [] }, o);
const w = L.loadGame({ quiet: true, inject: (w) => { w.DC_SET_TYPES.__Test = [mk('t_inf'), mk('t_pz', { tags: ['einheit', 'panzer', 'kette', 'gepanzert'], klasse: 'Panzer' }), mk('t_wall', { atk: 0 }), mk('t_wallpz', { atk: 0, tags: ['einheit', 'panzer', 'kette', 'gepanzert'], klasse: 'Panzer' }), mk('t_eq', { typ: 'Ausrüstung', ap: 2, text: 'Testausrüstung.', effects: [{ code: 'EQUIP_STAT', param: { atk: 0, def: 0 } }] }), mk('t_sup', { typ: 'Unterstützung', text: 'Testunterstützung.' })]; } });
const C = w.DC_CATALOG.cards, NP = C.filter((c) => c.set === 'set_nation_pool');
const WL = new Set(['ATTACK_ANY_FRONT', 'ATTACK_SUPPORT', 'AUFKLAERUNG', 'RELOCATE_HIDE', 'FLANK_DEF', 'MECH_AURA', 'FUEHRUNG_V', 'VS_INF', 'IGNORE_DEF', 'FEUERUEBERLEGENHEIT', 'AMBUSH', 'SCHADEN_MINUS', 'HAND_PEEK',
  'BUFF', 'HEAL', 'SELF_DAMAGE', 'EXTRA_ATTACK', 'DEAL_DAMAGE', 'MARK_OBSERVED', 'DRAW', 'DRAW_DISCARD', 'COST_NEXT', 'BUFF_SECTION',
  'EQUIP_STAT', 'EQUIP_IGNORE_FIRST_DAMAGE', 'EQUIP_NEGATE_DAMAGE', 'ON_DESTROY_DRAW', 'EQUIP_ON_ATTACK_DAMAGE', 'CARRIER_FIRST_ATTACK_ATK', 'EQUIP_COND_ATK',
  'TURN_DRAW', 'TURN_AP', 'REDUCE_DAMAGE', 'AURA_ENEMY_ATK', 'AURA_FRONT_ATK']);

// ---- 1) Bestand / Pools
const nations = Object.keys(w.DC_NATION_DECKS);
assert.equal(nations.length, 16);
const ids = new Set(), names = new Set();
C.forEach((c) => { assert(!ids.has(c.id), 'doppelte ID ' + c.id); ids.add(c.id); });
NP.forEach((c) => { const k = c.name.toLowerCase(); assert(!names.has(k), 'doppelter Name ' + c.name); names.add(k); });
C.filter((c) => c.set !== 'set_nation_pool').forEach((c) => assert(!names.has(c.name.trim().toLowerCase()), 'Namenskollision mit Bestand: ' + c.name));
const report = [];
for (const n of nations) {
  const pool = C.filter((c) => c.nation === n && c.typ !== 'Doktrin' && c.typ !== 'Token');
  assert(pool.length >= 100, n + ' Pool ' + pool.length);
  assert.equal(new Set(pool.map((c) => c.id)).size, pool.length);
  const d = w.DC_NATION_DECKS[n];
  assert.equal(d.cards.length, 60, n + ' Starterdeck 60'); assert.equal(d.doktrinen.length, 2, n + ' 2 Doktrinen');
  assert(d.cards.every((id) => !id.startsWith('dc_np_')), n + ' Starterdeck unverändert (keine Poolkarten)');
  d.doktrinen.forEach((id) => assert.equal(C.find((c) => c.id === id).typ, 'Doktrin'));
  const v = w.DC_validateDeck(d.cards, d.doktrinen); assert(v.ok, n + ' Starterdeck legal');
  report.push(n + ' ' + pool.length);
}
// ---- 2) Karten-Daten
const LIM = { bronze: 4, silver: 2, gold: 1 };
for (const c of NP) {
  const kwn = (c.keywords || []).length;
  assert((c.text || kwn) && c.rules && (c.rules.length || kwn) && c.flavor, 'Texte ' + c.id);
  (c.keywords || []).forEach((k) => assert(w.DC_KEYWORDS ? w.DC_KEYWORDS[k] : true, c.id + ' Schlüsselwort ' + k));
  assert.equal(c.art_status, 'platzhalter'); assert(!c.image, 'kein erfundenes Bild ' + c.id);
  assert.equal(c.max_copies, LIM[c.rarity], 'Kopienlimit ' + c.id);
  assert.notEqual(c.klasse, 'Schützenpanzer');
  (c.effects || []).forEach((e) => assert(WL.has(e.code), c.id + ' ungeprüfter Code ' + e.code));
  if (c.typ !== 'Einheit') assert((c.effects || []).length, 'Effekt verdrahtet ' + c.id);
}
// Kopienlimits im Deckbau
const br = NP.find((c) => c.rarity === 'bronze' && c.typ !== 'Einheit'), go = NP.find((c) => c.rarity === 'gold');
assert(w.DC_validateDeck(Array(4).fill(br.id), []).ok); assert(!w.DC_validateDeck(Array(5).fill(br.id), []).ok);
assert(w.DC_validateDeck([go.id], []).ok); assert(!w.DC_validateDeck([go.id, go.id], []).ok);
// Eigenes 60+2-Deck aus Pool legal baubar
for (const n of nations) {
  const pool = C.filter((c) => c.nation === n && c.typ !== 'Doktrin' && c.typ !== 'Token');
  const deck = []; for (const c of pool) for (let i = 0; i < Math.min(LIM[c.rarity] || 1, 1); i++) if (deck.length < 60) deck.push(c.id);
  const mix = deck.slice(0, 30).concat(pool.filter((c) => c.set === 'set_nation_pool').slice(0, 30).map((c) => c.id));
  assert.equal(new Set(mix).size, 60); assert(w.DC_validateDeck(mix, w.DC_NATION_DECKS[n].doktrinen).ok, n + ' gemischtes Deck legal');
}

// ---- 3) Funktionsprüfung je Karte
const INF = C.find((c) => c.id === 't_inf'), PZ = C.find((c) => c.id === 't_pz'), SUPX = C.find((c) => c.id === 't_sup');
function fresh() { const eng = L.newMatch(w, 'Steinmark', 3); L.clearBoard(eng); eng.state.active = 0; eng.state.phase = 'main'; eng.player(0).ap = 20; eng.player(1).ap = 20; return eng; }
function stats(eng, i) { return eng.currentAtkDef(i); }
function deploy(eng, c, section, row) {
  const p = eng.player(0), inst = eng.instFromId(c.id, 0); p.hand.push(inst);
  const expect = eng.costOf(c, p), ap = p.ap, r = eng.dispatch({ type: 'PLAY', player: 0, uid: inst.uid }); assert(r.ok, c.id + ' PLAY ' + r.error);
  if (eng.state.pending && eng.state.pending.kind === 'deploy') { const r2 = eng.dispatch({ type: 'CHOOSE_SLOT', player: 0, slot: { section, row } }); assert(r2.ok, c.id + ' SLOT ' + r2.error); }
  return { inst, spent: ap - p.ap, expect };
}
function attack(eng, a, t) { const r = eng.dispatch({ type: 'ATTACK', player: 0, uid: a.uid }); if (r.ok && eng.state.pending) return eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: t.uid }); return r; }
function dummy(eng, pid, s, row, def, armored) { const base = armored ? PZ : INF; const i = L.put(eng, pid, base.id, s, row); i.def = i.defMax = def || 30; return i; }
const seen = {};
for (const c of NP) {
  const codes = (c.effects || []).map((e) => e.code); codes.forEach((k) => { seen[k] = (seen[k] || 0) + 1; });
  const eng = fresh(), p = eng.player(0), q = eng.player(1);
  if (c.typ === 'Einheit') {
    const hid = dummy(eng, 1, 'R', 2, 30); hid.facedown = true;
    const enemyL = L.put(eng, 1, codes.includes('IGNORE_DEF') ? 't_wallpz' : 't_wall', 'L', 0); enemyL.def = enemyL.defMax = 30;
    const nb = dummy(eng, 0, 'C', 1, 10);
    const pk = q.hand.length; q.hand.push(eng.instFromId(INF.id, 1));
    const nbDef0 = stats(eng, nb).def;
    const { inst, spent, expect } = deploy(eng, c, 'C', 0);
    assert.equal(spent, expect, c.id + ' AP-Kosten');
    const pend = eng.state.pending && eng.state.pending.kind;
    if (codes.includes('AUFKLAERUNG')) { assert.equal(pend, 'scout-rev', c.id); eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: hid.uid }); assert(!hid.facedown, c.id + ' deckt auf'); }
    else if (codes.includes('HAND_PEEK')) { assert.equal(pend, 'hand-peek', c.id); eng.state.pending = null; }
    else assert(!eng.state.pending, c.id + ' kein offener Zustand: ' + pend);
    eng._applyFlankDef && eng._applyFlankDef(p);
    const nbDef = stats(eng, nb).def;
    if (codes.includes('FLANK_DEF')) assert(nbDef >= nbDef0 + 2, c.id + ' Flanke ' + nbDef0 + '→' + nbDef);
    if (codes.includes('MECH_AURA')) { assert(stats(eng, nb).def >= nbDef0 + 1, c.id + ' Begleitschutz'); }
    if (codes.includes('SCHADEN_MINUS')) { const d0 = inst.def; eng._damage(inst, 3, {}); assert.equal(d0 - inst.def, 1, c.id + ' −2'); }
    if (codes.includes('FUEHRUNG_V')) { const d0 = stats(eng, inst).def; p.ap = 20; deploy(eng, PZ, 'L', 0); assert(stats(eng, inst).def >= d0 + 2, c.id + ' Verbund'); }
    // Angriff (nächster eigener Zug, damit Einsatzsperre vorbei)
    inst.summonedTurn = -9; inst.playedTurn = -9; inst.attackUsed = false; inst.flags.exhausted = false; inst.flags.noCombatUntil = 0; p.ap = 20;
    const acts = eng.listActions(0).filter((a) => a.type === 'ATTACK' && a.uid === inst.uid);
    if (codes.includes('ATTACK_ANY_FRONT')) assert(acts.length && acts[0].targets.some((t) => t.uid === enemyL.uid), c.id + ' indirektes Feuer');
    if (codes.includes('ATTACK_SUPPORT')) { q.support[0] = eng.instFromId(SUPX.id, 1); const a2 = eng.listActions(0).find((a) => a.type === 'ATTACK' && a.uid === inst.uid); assert(a2 && a2.targets.some((t) => t.uid === q.support[0].uid), c.id + ' Support-Ziel'); q.support[0] = null; }
    const tgt = codes.includes('ATTACK_ANY_FRONT') ? enemyL : L.put(eng, 1, codes.includes('IGNORE_DEF') ? 't_wallpz' : 't_wall', 'C', 0); tgt.def = tgt.defMax = 30;
    if (codes.includes('VS_INF') && tgt.facedown) tgt.facedown = false;
    const atkNow = stats(eng, inst).atk, d0 = tgt.def, r = attack(eng, inst, tgt);
    assert(r.ok, c.id + ' Angriff ' + r.error);
    const dealt = d0 - tgt.def;
    let bonus = 0;
    if (codes.includes('VS_INF')) bonus += 2;
    if (codes.includes('IGNORE_DEF')) bonus += c.effects.find((e) => e.code === 'IGNORE_DEF').param.ignore_def;
    if (codes.includes('FEUERUEBERLEGENHEIT')) bonus += 1;
    if (codes.includes('AMBUSH')) bonus += 1;
    assert(dealt >= atkNow + bonus, c.id + ' Schaden ' + dealt + ' < ' + atkNow + '+' + bonus);
    if (codes.includes('RELOCATE_HIDE')) { assert(inst.facedown, c.id + ' verdeckt'); eng.dispatch({ type: 'END_TURN', player: 0 }); assert(inst.facedown); eng.dispatch({ type: 'END_TURN', player: 1 }); assert(!inst.facedown, c.id + ' wieder offen'); }
  } else if (c.typ === 'Soforteinsatz') {
    const own = dummy(eng, 0, 'C', 0, 10), foe = dummy(eng, 1, 'C', 0, 10), hid = dummy(eng, 1, 'L', 0, 10); hid.facedown = true;
    own.def = 5; own.attackUsed = true; p.hand = []; for (let i = 0; i < 6; i++) p.deck.push(eng.instFromId(INF.id, 0));
    const inst = eng.instFromId(c.id, 0); p.hand.push(inst);
    const a0 = stats(eng, own).atk, dOwn = own.def, dFoe = foe.def, h0 = p.hand.length, ap0 = p.ap;
    const r = eng.dispatch({ type: 'PLAY', player: 0, uid: inst.uid }); assert(r.ok, c.id + ' ' + r.error);
    const pend = eng.state.pending;
    const hostile = codes.some((k) => k === 'DEAL_DAMAGE' || k === 'MARK_OBSERVED');
    if (pend) {
      const ch = (pend.choices || []).map((x) => x.target || x.uid);
      let pick;
      if (pend.kind === 'instant-section') pick = 'sec:own:C';
      else if (hostile) { assert(ch.includes(hid.uid) && !ch.includes(own.uid), c.id + ' gegnerische Ziele'); pick = codes.includes('MARK_OBSERVED') ? hid.uid : foe.uid; }
      else { assert(ch.includes(own.uid) && !ch.includes(foe.uid), c.id + ' eigene Ziele ' + ch); pick = own.uid; }
      const r2 = eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: pick }); assert(r2.ok, c.id + ' Ziel ' + r2.error);
      if (eng.state.pending && eng.state.pending.kind === 'instant-target') eng.dispatch({ type: 'CONFIRM_TARGETS', player: 0 });
    } else assert(!codes.some((k) => ['BUFF', 'HEAL', 'DEAL_DAMAGE', 'MARK_OBSERVED', 'BUFF_SECTION', 'EXTRA_ATTACK'].includes(k)), c.id + ' Ziel fehlt');
    assert(!eng.state.pending, c.id + ' Rest-Pending');
    assert.equal(ap0 - p.ap, eng.costOf(c, p), c.id + ' AP');
    const fx = (k) => c.effects.find((e) => e.code === k);
    const sd = fx('SELF_DAMAGE') ? fx('SELF_DAMAGE').param.value : 0;
    if (fx('BUFF')) { const b = fx('BUFF').param; assert.equal(stats(eng, own).atk, a0 + b.atk, c.id + ' ATK'); assert.equal(own.def, dOwn + b.def - sd, c.id + ' DEF'); }
    if (fx('HEAL')) assert.equal(own.def, Math.min(own.defMax, dOwn + fx('HEAL').param.value) - sd, c.id + ' Heilung');
    if (fx('SELF_DAMAGE') && !fx('BUFF') && !fx('HEAL')) assert.equal(own.def, dOwn - sd, c.id);
    if (fx('EXTRA_ATTACK')) assert.equal(own.attackUsed, false, c.id + ' erneut');
    if (fx('DEAL_DAMAGE')) { const t = codes.includes('MARK_OBSERVED') ? hid : foe; assert.equal((codes.includes('MARK_OBSERVED') ? 10 : dFoe) - t.def, fx('DEAL_DAMAGE').param.value, c.id + ' Schaden'); }
    if (fx('MARK_OBSERVED')) assert(!hid.facedown, c.id + ' aufgedeckt');
    const draw = (fx('DRAW') ? fx('DRAW').param.value : 0) + (fx('DRAW_DISCARD') ? fx('DRAW_DISCARD').param.draw - 1 : 0);
    assert.equal(p.hand.length, h0 - 1 + draw, c.id + ' Handgröße');
    if (fx('COST_NEXT')) {
      assert(p.flags.costNext.some((x) => x.type === fx('COST_NEXT').param.type), c.id);
      const tid = { Einheit: 't_pz', 'Unterstützung': 't_sup', 'Ausrüstung': 't_eq' }[fx('COST_NEXT').param.type];
      const u = C.find((x) => x.id === tid), ui = eng.instFromId(tid, 0); p.hand.push(ui); const apb = p.ap; eng.dispatch({ type: 'PLAY', player: 0, uid: ui.uid });
      if (eng.state.pending && eng.state.pending.kind === 'deploy') eng.dispatch({ type: 'CHOOSE_SLOT', player: 0, slot: { section: 'R', row: 2 } });
      if (eng.state.pending && eng.state.pending.choices) eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: own.uid });
      assert(apb - p.ap < eng.costOf(u, p) + 1, c.id + ' Rabatt verbraucht'); assert(!p.flags.costNext.length, c.id + ' Rabatt einmalig');
    }
    if (fx('BUFF_SECTION')) { const b = fx('BUFF_SECTION').param; if (b.atk) assert.equal(stats(eng, own).atk, a0 + (!b.filter || b.filter === 'infanterie' ? b.atk : 0), c.id + ' Abschnitt ATK'); if (b.def) assert.equal(own.def, dOwn + (!b.filter || b.filter === 'infanterie' ? b.def : 0), c.id + ' Abschnitt DEF'); }
  } else if (c.typ === 'Ausrüstung') {
    const only = (c.effects.find((e) => e.param && e.param.only) || {}).param;
    const hostDef = only && only.only === 'panzer' ? PZ : INF;
    const host = dummy(eng, 0, 'C', 0, 10, only && only.only === 'panzer'); host.def = host.defMax = 10;
    const wrong = only ? dummy(eng, 0, 'L', 0, 10, only.only !== 'panzer') : null;
    const s0 = stats(eng, host), inst = eng.instFromId(c.id, 0); p.hand.push(inst);
    const r = eng.dispatch({ type: 'PLAY', player: 0, uid: inst.uid }); assert(r.ok, c.id + ' ' + r.error);
    const ch = (eng.state.pending.choices || []).map((x) => x.target || x.uid);
    if (wrong) assert(!ch.includes(wrong.uid), c.id + ' nur ' + only.only);
    assert(eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: host.uid }).ok);
    assert(host.attachments.some((a) => a.uid === inst.uid), c.id + ' angelegt');
    const st = c.effects.filter((e) => e.code === 'EQUIP_STAT').reduce((a, e) => ({ atk: a.atk + (e.param.atk || 0), def: a.def + (e.param.def || 0) }), { atk: 0, def: 0 });
    const first = c.effects.find((e) => e.code === 'CARRIER_FIRST_ATTACK_ATK');
    const s1 = stats(eng, host);
    assert.equal(s1.atk, s0.atk + st.atk + (first ? first.param.atk : 0), c.id + ' ATK');
    assert.equal(s1.def, s0.def + st.def, c.id + ' DEF');
    const cond = c.effects.find((e) => e.code === 'EQUIP_COND_ATK');
    if (c.effects.some((e) => e.code === 'EQUIP_IGNORE_FIRST_DAMAGE')) { const d0 = host.def; eng._damage(host, 2, {}); assert.equal(host.def, d0, c.id + ' erster Schaden ignoriert'); }
    else if (c.effects.some((e) => e.code === 'EQUIP_NEGATE_DAMAGE')) { const n = c.effects.find((e) => e.code === 'EQUIP_NEGATE_DAMAGE').param.amount, d0 = host.def; eng._damage(host, 3, {}); assert.equal(d0 - host.def, 3 - n, c.id + ' negiert'); }
    if (cond) { if (host.def >= host.defMax) eng._damage(host, 1, {}); if (host.def >= host.defMax) host.def = host.defMax - 1; assert.equal(stats(eng, host).atk, s1.atk + cond.param.atk, c.id + ' beschädigt +ATK'); }
    const oa = c.effects.find((e) => e.code === 'EQUIP_ON_ATTACK_DAMAGE');
    if (oa || first) {
      host.summonedTurn = -9; host.attackUsed = false; host.flags.exhausted = false; p.ap = 20;
      const tgt = dummy(eng, 1, 'C', 0, 30); const atkNow = stats(eng, host).atk, hd0 = host.def, d0 = tgt.def; const rr = attack(eng, host, tgt); assert(rr.ok, c.id + ' Angriff ' + rr.error);
      if (oa) { assert.equal(d0 - tgt.def, atkNow + (oa.param.bonus || 0), c.id + ' Bonus'); if (oa.param.self) assert(hd0 - host.def >= oa.param.self, c.id + ' Eigenschaden'); }
      if (first) { host.attackUsed = false; assert.equal(stats(eng, host).atk, atkNow - first.param.atk, c.id + ' erster Angriff verbraucht'); }
    }
    if (c.effects.some((e) => e.code === 'ON_DESTROY_DRAW')) { for (let i = 0; i < 3; i++) p.deck.push(eng.instFromId(INF.id, 0)); const h0 = p.hand.length; eng._destroy(eng.findInst(host.uid)); assert.equal(p.hand.length, h0 + c.effects.find((e) => e.code === 'ON_DESTROY_DRAW').param.draw, c.id + ' Ziehen'); }
  } else if (c.typ === 'Unterstützung') {
    const own = dummy(eng, 0, 'C', 0, 10), foe = dummy(eng, 1, 'C', 0, 10);
    const so = stats(eng, own), sf = stats(eng, foe);
    const inst = eng.instFromId(c.id, 0); p.hand.push(inst);
    const ap0 = p.ap; const r = eng.dispatch({ type: 'PLAY', player: 0, uid: inst.uid }); assert(r.ok, c.id + ' ' + r.error);
    if (eng.state.pending && eng.state.pending.kind === 'deploy') assert(eng.dispatch({ type: 'CHOOSE_SLOT', player: 0, slot: { section: 'C', row: 0 } }).ok);
    assert(p.support.some((s) => s && s.uid === inst.uid), c.id + ' liegt'); assert.equal(ap0 - p.ap, eng.costOf(c, p), c.id + ' AP');
    const has = (k) => codes.includes(k);
    assert.equal(stats(eng, own).atk, so.atk + (has('AURA_FRONT_ATK') ? 1 : 0), c.id + ' eigene ATK');
    assert.equal(stats(eng, own).def, so.def + (has('AURA_FRONT_DEF') ? 2 : 0), c.id + ' eigene DEF');
    assert.equal(stats(eng, foe).atk, Math.max(0, sf.atk - (has('AURA_ENEMY_ATK') ? 1 : 0)), c.id + ' Feind ATK');
    if (has('REDUCE_DAMAGE')) { const d0 = own.def; eng._damage(own, 2, {}); assert.equal(d0 - own.def, 1, c.id + ' −1'); }
    if (has('TURN_DRAW') || has('TURN_AP')) {
      const ctl = fresh(); for (const e of [eng, ctl]) for (let i = 0; i < 6; i++) e.player(0).deck.push(e.instFromId(INF.id, 0));
      for (const e of [eng, ctl]) { e.dispatch({ type: 'END_TURN', player: 0 }); e.dispatch({ type: 'END_TURN', player: 1 }); }
      if (has('TURN_DRAW')) assert.equal(eng.player(0).hand.length - p.hand.length, 0); // gleicher Spieler
      const dh = eng.player(0).hand.length - ctl.player(0).hand.length, dap = eng.player(0).ap - ctl.player(0).ap;
      if (has('TURN_DRAW')) assert(dh >= 1, c.id + ' +1 Karte (' + dh + ')');
      if (has('TURN_AP')) assert(dap >= 1, c.id + ' +1 AP (' + dap + ')');
    }
  }
}
// Deckbuilder-Filter + Platzhalter im echten UI-Code
{
  const { setup } = require('./test_audio_actions');
  const h = setup('off'), fs = require('fs'), path = require('path');
  h.w.eval(fs.readFileSync(path.join(L.WEB, 'js/ui/library.js'), 'utf8'));
  for (const n of nations) assert.equal(h.w.DCLib.nationPool(n).length, 100, n + ' im Deckbuilder wählbar');
  const pc = h.w.DC_CATALOG.cards.find((c) => c.set === 'set_nation_pool' && c.typ === 'Soforteinsatz');
  const ph = h.w.DCCardPh.html(pc, 'hero'); assert(/Entwurf · noch kein Artwork/.test(ph) && !/<img/.test(ph) && ph.includes(pc.name));
  const rh = h.w.DCCardPh.rulesHtml(pc); pc.rules.forEach((r) => assert(rh.includes(r.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'))));
}
console.log('PASS nation pools: ' + NP.length + ' neue Karten, alle 16 Nationen ≥100 einzigartig (+2 Doktrinen), Starterdecks 60+2 unverändert, Limits, Zielseiten/AP/Effekte je Karte geprüft');
console.log('  ' + report.join(' · '));
console.log('  Codes: ' + Object.entries(seen).map(([k, v]) => k + '×' + v).join(' '));
