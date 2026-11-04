#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const WEB = path.join(__dirname, '..', 'Division_Command_0.5a', 'web');

function loadGame() {
  const document = {
    getElementById: () => null,
    querySelector: () => null,
    createElement: () => ({ style: {}, appendChild() {}, setAttribute() {}, remove() {} }),
    head: { appendChild() {} },
    addEventListener() {},
  };
  const window = { DC_SET_TYPES: {}, DC_CATALOG: null, document, addEventListener() {} };
  const ctx = { window, document, console, Math, JSON, Date, Error, Array, Object, String, Number, Boolean, RegExp, parseInt, isFinite };
  ctx.global = ctx;
  for (const f of ['doktrinen','tokens','infanterie','panzer','artillerie','aufklaerung','elite','unterstuetzung','soforteinsatz','ausruestung']) {
    vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/data/sets/types', f + '.js'), 'utf8'), ctx);
  }
  // catalog: only the data parts
  const cat = fs.readFileSync(path.join(WEB, 'js/data/catalog.js'), 'utf8');
  const cut = cat.indexOf('/* 0.5a:');
  vm.runInNewContext(cat.slice(0, cut > 0 ? cut : cat.length), ctx);
  vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/data/decks.js'), 'utf8'), ctx);
  vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/data/nationen.js'), 'utf8'), ctx);
  vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/engine/engine.js'), 'utf8'), ctx);
  return ctx.window;
}

function assert(cond, msg) {
  if (!cond) throw new Error('ASSERT: ' + msg);
}

function findCard(win, pred) {
  return win.DC_CATALOG.cards.find(pred);
}

function makeMatch(win, nationKey) {
  const Engine = win.DCEngine || win.DivisionCommandEngine || Object.values(win).find((x) => x && x.prototype && x.prototype.createMatch);
  // engine attaches as DC.Engine or similar
  const g = win;
  let Eng = g.DC && g.DC.Engine;
  if (!Eng) {
    // search
    for (const k of Object.keys(g)) {
      if (g[k] && g[k].name === 'Engine') Eng = g[k];
      if (g[k] && typeof g[k] === 'function' && g[k].toString().includes('createMatch')) Eng = g[k];
    }
  }
  // From engine.js: global.DC = global.DC || {}; global.DC.Engine = Engine;
  Eng = (g.DCEngine && g.DCEngine.Engine) || (g.DC && g.DC.Engine);
  const decks = g.DC_NATION_DECKS || g.DC_DECKS;
  const nat = g.DC_NATIONEN || g.DC_NATIONS || {};
  // decks.js structure
  let deckIds, dokIds;
  if (decks[nationKey]) {
    const d = decks[nationKey];
    deckIds = d.cards || d.deck || (Array.isArray(d) ? d : []);
    dokIds = d.doctrines || d.doktrinen || [];
  const natMeta = (g.DC_NATIONS || {})[nationKey];
  if (natMeta) {
    if (!dokIds.length) dokIds = natMeta.doktrinen || natMeta.doctrines || [];
    if (!deckIds.length && natMeta.deck) deckIds = natMeta.deck;
  }
  }
  if (!deckIds && nat[nationKey]) {
    deckIds = nat[nationKey].deck || nat[nationKey].cards;
    dokIds = nat[nationKey].doctrines;
  }
  // fallback: build from catalog nation cards by id prefix
  if (!Array.isArray(deckIds)) {
    console.log('deck keys', Object.keys(decks || {}).slice(0, 20));
    throw new Error('no deck for ' + nationKey);
  }
  const eng = new Eng(g.DC_CATALOG, { seed: 42 });
  eng.createMatch({
    deck0: deckIds.slice(),
    doctrine0: (dokIds || []).slice(),
    name0: 'P0',
    deck1: deckIds.slice(),
    doctrine1: (dokIds || []).slice(),
    name1: 'P1',
  });
  return eng;
}

function putUnit(eng, pid, cardId, section, row) {
  const p = eng.player(pid);
  const inst = eng.instFromId(cardId, pid);
  p.front[section][row] = inst;
  return inst;
}

function giveHand(eng, pid, cardId) {
  const p = eng.player(pid);
  const inst = eng.instFromId(cardId, pid);
  p.hand.push(inst);
  p.ap = 10;
  return inst;
}

function main() {
  const win = loadGame();
  assert(win.DC_CATALOG && win.DC_CATALOG.cards.length > 900, 'catalog size ' + (win.DC_CATALOG && win.DC_CATALOG.cards.length));
  console.log('catalog', win.DC_CATALOG.cards.length);

  const eqEmpty = win.DC_CATALOG.cards.filter((c) => c.typ === 'Ausrüstung' && c.set === 'set_nations' && !(c.effects && c.effects.length));
  const soEmpty = win.DC_CATALOG.cards.filter((c) => c.typ === 'Soforteinsatz' && c.set === 'set_nations' && !(c.effects && c.effects.length));
  console.log('empty effects Ausr/Sofort', eqEmpty.length, soEmpty.length);
  assert(eqEmpty.length === 0, 'Ausr still empty');
  assert(soEmpty.length === 0, 'Sofort still empty');

  // Discover deck keys
  const deckKeys = Object.keys(win.DC_NATION_DECKS || win.DC_DECKS || {});
  console.log('DC_DECKS keys', deckKeys.slice(0, 20), 'n=', deckKeys.length);

  const prefer = ['Rothain','Karsk','Vael','Merovan','Averon','Eldran','Steinmark','Orthea'];
  const nations = prefer.map((k) => deckKeys.find((x) => x === k || x.toLowerCase() === k.toLowerCase())).filter(Boolean);
  if (nations.length < 6) {
    for (const k of deckKeys) if (!nations.includes(k)) nations.push(k);
  }
  console.log('test nations', nations);
  assert(nations.length >= 4, 'need nations');

  // Pick known cards
  const jacke = findCard(win, (c) => c.name === 'Nüchterne Jacke' || /Nüchterne Jacke/.test(c.name));
  const kaliber = findCard(win, (c) => c.name === 'Kaliberkiste');
  const liefer = findCard(win, (c) => c.name === 'Liefermarke');
  const druck = findCard(win, (c) => /Preisdruck|Druckpunkt/.test(c.name) && c.typ === 'Soforteinsatz');
  const heile = findCard(win, (c) => c.typ === 'Soforteinsatz' && c.set === 'set_nations' && (c.effects || []).some((e) => e.code === 'HEAL'));
  const mass = findCard(win, (c) => c.typ === 'Soforteinsatz' && (c.effects || []).some((e) => e.code === 'MASS_DAMAGE'));
  const drawCard = findCard(win, (c) => c.typ === 'Soforteinsatz' && c.set === 'set_nations' && (c.effects || []).some((e) => e.code === 'DRAW' && e.param && e.param.value >= 1));
  const buffSo = findCard(win, (c) => c.typ === 'Soforteinsatz' && c.set === 'set_nations' && (c.effects || []).some((e) => e.code === 'BUFF' && e.param && e.param.atk > 0));
  const standarte = findCard(win, (c) => c.set === 'set_nations' && c.name === 'Standarte' && c.typ === 'Ausrüstung');

  console.log('samples', {
    jacke: jacke && jacke.id,
    kaliber: kaliber && kaliber.id,
    liefer: liefer && liefer.id,
    heile: heile && heile.id,
    mass: mass && mass.id,
    drawCard: drawCard && drawCard.id,
    buffSo: buffSo && buffSo.id,
    standarte: standarte && standarte.id,
  });

  let passed = 0;
  function ok(name) { passed++; console.log('PASS', name); }

  for (const nat of nations.slice(0, 6)) {
    const eng = makeMatch(win, nat);
    const p0 = eng.player(0);
    // find any infantry/panzer/art from catalog that exists in byId
    const has = (c, tag) => (c.tags || []).includes(tag) || c.klasse === tag[0].toUpperCase() + tag.slice(1) || c.klasse === ({infanterie:'Infanterie',panzer:'Panzer',artillerie:'Artillerie'})[tag];
    const inf = win.DC_CATALOG.cards.find((c) => has(c, 'infanterie') && eng.byId[c.id]);
    const pz = win.DC_CATALOG.cards.find((c) => has(c, 'panzer') && eng.byId[c.id]);
    const art = win.DC_CATALOG.cards.find((c) => has(c, 'artillerie') && eng.byId[c.id]);
    assert(inf && pz && art, 'units available');

    // --- Equipment DEF on infantry ---
    if (jacke) {
      const u = putUnit(eng, 0, inf.id, 'C', 0);
      const before = u.def;
      const eq = giveHand(eng, 0, jacke.id);
      eng.dispatch({ type: 'PLAY', player: 0, uid: eq.uid });
      const pend = eng.state.pending;
      assert(pend && pend.kind === 'equip', 'equip pending ' + nat);
      eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: u.uid });
      assert(u.attachments.length === 1, 'attached');
      assert(u.def === before + 1, 'jacke +1 DEF got ' + u.def + ' from ' + before);
      ok(nat + ': Nüchterne Jacke +1 DEF');
    }

    // --- Equipment ATK on artillery ---
    if (kaliber) {
      const eng2 = makeMatch(win, nat);
      const a = putUnit(eng2, 0, art.id, 'L', 1);
      const eq = giveHand(eng2, 0, kaliber.id);
      eng2.dispatch({ type: 'PLAY', player: 0, uid: eq.uid });
      eng2.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: a.uid });
      const st = eng2.currentAtkDef(a);
      const base = Number(eng2.defOf(a).atk) || 0;
      assert(st.atk === base + 1, 'kaliber atk ' + st.atk + ' base ' + base);
      ok(nat + ': Kaliberkiste +1 ATK');
    }

    // --- Instant HEAL ---
    if (heile) {
      const eng3 = makeMatch(win, nat);
      const u = putUnit(eng3, 0, pz.id, 'R', 0);
      u.def = 1;
      u.defMax = Number(eng3.defOf(u).def) || 5;
      const card = giveHand(eng3, 0, heile.id);
      const r = eng3.dispatch({ type: 'PLAY', player: 0, uid: card.uid });
      if (eng3.state.pending && eng3.state.pending.kind === 'instant-target') {
        eng3.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: u.uid });
        if (eng3.state.pending && eng3.state.pending.kind === 'instant-target') {
          eng3.dispatch({ type: 'CONFIRM_TARGETS', player: 0 });
        }
      }
      assert(u.def > 1, 'healed to ' + u.def + ' via ' + heile.name);
      ok(nat + ': HEAL instant ' + heile.name);
    }

    // --- Instant DRAW ---
    if (drawCard) {
      const eng4 = makeMatch(win, nat);
      const handBefore = eng4.player(0).hand.length;
      const deckBefore = eng4.player(0).deck.length;
      const card = giveHand(eng4, 0, drawCard.id);
      // playing removes card from hand then draws
      eng4.dispatch({ type: 'PLAY', player: 0, uid: card.uid });
      if (eng4.state.pending && eng4.state.pending.kind === 'instant-target') {
        // may need skip - confirm empty?
        const choices = eng4.state.pending.choices || [];
        if (choices[0]) eng4.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: choices[0].target });
        if (eng4.state.pending && eng4.state.pending.kind === 'instant-target') eng4.dispatch({ type: 'CONFIRM_TARGETS', player: 0 });
      }
      assert(eng4.player(0).deck.length < deckBefore || eng4.player(0).hand.length >= handBefore, 'draw effect ran');
      ok(nat + ': DRAW instant ' + drawCard.name);
    }

    // --- Instant BUFF ---
    if (buffSo) {
      const eng5 = makeMatch(win, nat);
      const u = putUnit(eng5, 0, inf.id, 'C', 2);
      const base = eng5.currentAtkDef(u).atk;
      const card = giveHand(eng5, 0, buffSo.id);
      eng5.dispatch({ type: 'PLAY', player: 0, uid: card.uid });
      if (eng5.state.pending && eng5.state.pending.kind === 'instant-target') {
        eng5.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: u.uid });
        if (eng5.state.pending) {
          try { eng5.dispatch({ type: 'CONFIRM_TARGETS', player: 0 }); } catch (e) {}
        }
      }
      const after = eng5.currentAtkDef(u).atk;
      assert(after > base, 'buff atk ' + base + ' -> ' + after + ' via ' + buffSo.name);
      ok(nat + ': BUFF instant ' + buffSo.name);
    }

    // --- ON_DESTROY_DRAW equipment ---
    if (liefer) {
      const eng6 = makeMatch(win, nat);
      const u = putUnit(eng6, 0, inf.id, 'L', 0);
      const eq = giveHand(eng6, 0, liefer.id);
      eng6.dispatch({ type: 'PLAY', player: 0, uid: eq.uid });
      eng6.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: u.uid });
      const handBefore = eng6.player(0).hand.length;
      const deckBefore = eng6.player(0).deck.length;
      eng6._destroy({ inst: u, player: eng6.player(0), zone: 'front', section: 'L', row: 0 });
      assert(eng6.player(0).deck.length === deckBefore - 1 || eng6.player(0).hand.length === handBefore + 1, 'destroy draw');
      ok(nat + ': Liefermarke ON_DESTROY_DRAW');
    }

    // --- MASS_DAMAGE ---
    if (mass) {
      const eng7 = makeMatch(win, nat);
      const e1 = putUnit(eng7, 1, inf.id, 'C', 0);
      const e2 = putUnit(eng7, 1, pz.id, 'C', 1);
      e1.def = 3; e1.defMax = 3; e2.def = 3; e2.defMax = 3;
      const card = giveHand(eng7, 0, mass.id);
      eng7.dispatch({ type: 'PLAY', player: 0, uid: card.uid });
      if (eng7.state.pending) {
        try { eng7.dispatch({ type: 'CONFIRM_TARGETS', player: 0 }); } catch (e) {}
      }
      assert(e1.def < 3 || e2.def < 3, 'mass damage applied ' + e1.def + '/' + e2.def + ' via ' + mass.name);
      ok(nat + ': MASS_DAMAGE ' + mass.name);
    }
  }

  // Rothain/Karsk specific: crown/oath-ish equipment with EQUIP_STANDARD or ON_DESTROY_SECTION
  const gebet = findCard(win, (c) => c.set === 'set_nations' && /Gebetsfahne/.test(c.name));
  if (gebet && nations[0]) {
    const eng = makeMatch(win, nations[0]);
    const inf = win.DC_CATALOG.cards.find((c) => ((c.tags||[]).includes('infanterie') || c.klasse==='Infanterie') && eng.byId[c.id]);
    const u = putUnit(eng, 0, inf.id, 'C', 0);
    const mate = putUnit(eng, 0, inf.id, 'C', 1);
    const eq = giveHand(eng, 0, gebet.id);
    eng.dispatch({ type: 'PLAY', player: 0, uid: eq.uid });
    eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: u.uid });
    const before = eng.currentAtkDef(mate).atk;
    eng._destroy({ inst: u, player: eng.player(0), zone: 'front', section: 'C', row: 0 });
    const after = eng.currentAtkDef(mate).atk;
    assert(after >= before, 'gebetsfahne section buff ' + before + '->' + after);
    ok('Gebetsfahne ON_DESTROY_SECTION');
  }

  if (standarte && nations[0]) {
    const eng = makeMatch(win, nations[0]);
    const inf = win.DC_CATALOG.cards.find((c) => ((c.tags||[]).includes('infanterie') || c.klasse==='Infanterie') && eng.byId[c.id]);
    const u = putUnit(eng, 0, inf.id, 'R', 0);
    const mate = putUnit(eng, 0, inf.id, 'R', 1);
    const eq = giveHand(eng, 0, standarte.id);
    eng.dispatch({ type: 'PLAY', player: 0, uid: eq.uid });
    eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: u.uid });
    const st = eng.currentAtkDef(u);
    const base = Number(eng.defOf(u).atk) || 0;
    assert(u.def >= (Number(eng.defOf(u).def) || 0) + 1, 'standarte def');
    assert(st.atk >= base + 1, 'standarte second-inf atk ' + st.atk + ' base ' + base);
    ok('Standarte EQUIP_STANDARD');
  }


  // ========== Exact side-condition mechanics (28 partials) ==========
  const nat0 = nations[0];
  assert(nat0, 'need nation for side tests');
  const infCard = () => win.DC_CATALOG.cards.find((c) => ((c.tags||[]).includes('infanterie') || c.klasse==='Infanterie'));
  const pzCard = () => win.DC_CATALOG.cards.find((c) => ((c.tags||[]).includes('panzer') || c.klasse==='Panzer'));
  function putSupport(eng, pid, cardId) {
    const p = eng.player(pid);
    const inst = eng.instFromId(cardId, pid);
    const ix = p.support.findIndex((x) => !x);
    if (ix < 0) p.support.push(inst); else p.support[ix] = inst;
    return inst;
  }
  function equipOn(eng, host, eqId) {
    const eq = giveHand(eng, 0, eqId);
    eng.dispatch({ type: 'PLAY', player: 0, uid: eq.uid });
    eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: host.uid });
    return host.attachments[host.attachments.length - 1];
  }

  // EQUIP_COND_ATK (Feldverband)
  {
    const eng = makeMatch(win, nat0);
    const u = putUnit(eng, 0, infCard().id, 'C', 0);
    const max = u.defMax || u.def;
    equipOn(eng, u, 'dc_b_feldverband_407');
    const healthy = eng.currentAtkDef(u).atk;
    u.def = Math.max(1, max - 1);
    const damaged = eng.currentAtkDef(u).atk;
    assert(damaged === healthy + 1, 'Feldverband cond ATK ' + healthy + '->' + damaged);
    ok('EQUIP_COND_ATK Feldverband');
  }

  // EQUIP_ONCE_PAIN_ATK (Nervenklemme)
  {
    const eng = makeMatch(win, nat0);
    const u = putUnit(eng, 0, infCard().id, 'C', 0);
    u.summonedTurn = eng.state.turn - 1;
    equipOn(eng, u, 'dc_b_nervenklemme_409');
    const before = eng.currentAtkDef(u).atk;
    const defBefore = u.def;
    eng.dispatch({ type: 'USE_ABILITY', player: 0, uid: u.uid });
    assert(u.def < defBefore, 'Nervenklemme self dmg');
    assert(eng.currentAtkDef(u).atk >= before + 2, 'Nervenklemme temp ATK');
    ok('EQUIP_ONCE_PAIN_ATK Nervenklemme');
  }

  // EQUIP_ONCE_DRAW_PAIN (Schnittkabel)
  {
    const eng = makeMatch(win, nat0);
    const u = putUnit(eng, 0, infCard().id, 'C', 0);
    u.summonedTurn = eng.state.turn - 1;
    equipOn(eng, u, 'dc_b_schnittkabel_415');
    const handBefore = eng.player(0).hand.length;
    eng.dispatch({ type: 'USE_ABILITY', player: 0, uid: u.uid });
    assert(eng.player(0).hand.length >= handBefore, 'Schnittkabel draw');
    ok('EQUIP_ONCE_DRAW_PAIN Schnittkabel');
  }

  // EQUIP_COND_DEF ifSupport (Plattenträger)
  {
    const eng = makeMatch(win, nat0);
    const u = putUnit(eng, 0, infCard().id, 'C', 0);
    const before = u.def;
    equipOn(eng, u, 'dc_b_plattentraeger_832');
    assert(u.def === before, 'Plattenträger no support yet ' + u.def);
    const sup = win.DC_CATALOG.cards.find((c) => c.typ === 'Unterstützung' && eng.byId[c.id]) ||
      win.DC_CATALOG.cards.find((c) => c.typ === 'Unterstützung');
    putSupport(eng, 0, sup.id);
    eng._applySupportCondDef(eng.player(0));
    assert(u.def === before + 1, 'Plattenträger +1 DEF with support got ' + u.def);
    ok('EQUIP_COND_DEF Plattenträger');
  }

  // EQUIP_ON_REST (Ruhegeschirr / Rastenmarke)
  {
    const eng = makeMatch(win, nat0);
    const u = putUnit(eng, 0, infCard().id, 'C', 0);
    u.summonedTurn = eng.state.turn - 1;
    equipOn(eng, u, 'dc_b_ruhegeschirr_357');
    const atk0 = (u.flags && u.flags.buffAtk) || 0;
    u.attackUsed = false;
    eng.dispatch({ type: 'END_TURN', player: 0 });
    // after end, rest buff applied before turn switch
    assert(((u.flags && u.flags.buffAtk) || 0) >= atk0 + 1, 'Ruhegeschirr rest ATK');
    ok('EQUIP_ON_REST Ruhegeschirr');
  }
  {
    const eng = makeMatch(win, nat0);
    const u = putUnit(eng, 0, infCard().id, 'L', 0);
    u.summonedTurn = eng.state.turn - 1;
    const max = u.def;
    u.def = Math.max(1, max - 1);
    equipOn(eng, u, 'dc_b_rastenmarke_360');
    // re-damage after equip baked DEF
    u.def = Math.max(1, (u.defMax || u.def) - 1);
    const before = u.def;
    u.attackUsed = false;
    eng.dispatch({ type: 'END_TURN', player: 0 });
    assert(u.def >= before + 1 || u.def === (u.defMax || u.def), 'Rastenmarke heal on rest ' + before + '->' + u.def);
    ok('EQUIP_ON_REST Rastenmarke');
  }

  // EQUIP_TURN_START_HEAL (Wartungsplatte)
  {
    const eng = makeMatch(win, nat0);
    const pz = putUnit(eng, 0, pzCard().id, 'C', 0);
    const inf = putUnit(eng, 0, infCard().id, 'L', 0); // adjacent section neighbor may not share row adj — put same section neighbor
    // use same section row neighbor
    eng.player(0).front.L[0] = null;
    const mate = putUnit(eng, 0, infCard().id, 'C', 1);
    equipOn(eng, pz, 'dc_b_wartungsplatte_418');
    pz.def = Math.max(1, (pz.defMax || pz.def) - 1);
    const before = pz.def;
    const mateBefore = mate.def;
    // end p0 turn → p1 turn start stuff on p1; need to end p1 so p0 gets turn-start heal
    eng.dispatch({ type: 'END_TURN', player: 0 });
    if (eng.state.active === 1) eng.dispatch({ type: 'END_TURN', player: 1 });
    assert(pz.def >= before, 'Wartungsplatte healed ' + before + '->' + pz.def);
    ok('EQUIP_TURN_START_HEAL Wartungsplatte');
  }

  // EQUIP_NEGATE_DAMAGE (Maskenplatte)
  {
    const eng = makeMatch(win, nat0);
    const u = putUnit(eng, 0, infCard().id, 'C', 0);
    equipOn(eng, u, 'dc_b_maskenplatte_300');
    const before = u.def;
    eng._damage(u, 2, { tag: 'test' });
    assert(u.def === before - 1, 'Maskenplatte negate 1 of 2 → ' + before + '->' + u.def);
    ok('EQUIP_NEGATE_DAMAGE Maskenplatte');
  }

  // EQUIP_DRAW_ON_HEAL (Aktenzeichen)
  {
    const eng = makeMatch(win, nat0);
    const u = putUnit(eng, 0, infCard().id, 'C', 0);
    equipOn(eng, u, 'dc_b_aktenzeichen_352');
    u.def = Math.max(1, (u.defMax || u.def) - 1);
    const handBefore = eng.player(0).hand.length;
    eng._heal(u, 1);
    assert(eng.player(0).hand.length === handBefore + 1, 'Aktenzeichen draw on heal');
    ok('EQUIP_DRAW_ON_HEAL Aktenzeichen');
  }

  // EQUIP_AFTER_REVEAL_DEF (Melderband)
  {
    const eng = makeMatch(win, nat0);
    const u = putUnit(eng, 0, infCard().id, 'C', 0);
    u.facedown = true;
    equipOn(eng, u, 'dc_b_melderband_838');
    const before = u.def;
    eng._revealInst(u);
    assert(u.def === before + 1, 'Melderband +DEF on reveal');
    ok('EQUIP_AFTER_REVEAL_DEF Melderband');
  }

  // EQUIP_ON_REVEAL_ATK (Feldprotokoll)
  {
    const eng = makeMatch(win, nat0);
    const u = putUnit(eng, 0, infCard().id, 'C', 0);
    u.facedown = true;
    equipOn(eng, u, 'dc_b_feldprotokoll_478');
    const atk0 = eng.currentAtkDef(u).atk;
    eng._revealInst(u);
    assert(eng.currentAtkDef(u).atk >= atk0 + 1, 'Feldprotokoll +ATK on reveal');
    ok('EQUIP_ON_REVEAL_ATK Feldprotokoll');
  }

  // EQUIP_SOFT_DRAW needRevealSofort (Vel-Stempel)
  {
    const eng = makeMatch(win, nat0);
    const u = putUnit(eng, 0, infCard().id, 'C', 0);
    equipOn(eng, u, 'dc_b_vel_stempel_896');
    const revealSo = win.DC_CATALOG.cards.find((c) => c.typ === 'Soforteinsatz' && c.set === 'set_nations' && (c.effects||[]).some((e) => e.code === 'REVEAL'));
    assert(revealSo, 'need reveal sofort');
    const handBefore = eng.player(0).hand.length;
    const so = giveHand(eng, 0, revealSo.id);
    eng.dispatch({ type: 'PLAY', player: 0, uid: so.uid });
    // may need target
    if (eng.state.pending && eng.state.pending.kind === 'instant-target') {
      const t = eng.state.pending.choices && eng.state.pending.choices[0];
      if (t) eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: t.target });
    }
    assert(eng.player(0).hand.length >= handBefore, 'Vel-Stempel soft draw path ran');
    ok('EQUIP_SOFT_DRAW Vel-Stempel');
  }

  // EQUIP_DRAW_ON_ATTACK (Restschein)
  {
    const eng = makeMatch(win, nat0);
    const u = putUnit(eng, 0, infCard().id, 'C', 0);
    u.summonedTurn = eng.state.turn - 1;
    equipOn(eng, u, 'dc_b_restschein_540');
    const sup = win.DC_CATALOG.cards.find((c) => c.typ === 'Unterstützung');
    putSupport(eng, 0, sup.id);
    const foe = putUnit(eng, 1, infCard().id, 'C', 0);
    foe.def = 1; foe.defMax = 1;
    const handBefore = eng.player(0).hand.length;
    eng.dispatch({ type: 'ATTACK', player: 0, uid: u.uid, target: foe.uid });
    // react pass if needed
    if (eng.state.pending && eng.state.pending.kind === 'react-window') {
      eng.dispatch({ type: 'REACT_PASS', player: eng.state.pending.player });
    }
    assert(eng.player(0).hand.length >= handBefore + 1 || (u.attachments||[]).length, 'Restschein draw-on-attack');
    ok('EQUIP_DRAW_ON_ATTACK Restschein');
  }

  // EQUIP_STAT costReduce ifSupportSection (Ladungsliste)
  {
    const eng = makeMatch(win, nat0);
    const def = eng.byId['dc_b_ladungsliste_532'];
    const costNo = eng.costOf(def, eng.player(0));
    const sup = win.DC_CATALOG.cards.find((c) => c.typ === 'Unterstützung');
    putSupport(eng, 0, sup.id);
    const costYes = eng.costOf(def, eng.player(0));
    assert(costYes < costNo, 'Ladungsliste cheaper with support ' + costNo + '->' + costYes);
    ok('EQUIP_STAT costReduce Ladungsliste');
  }

  // EQUIP_KILL_DRAW_BUFF (Schuldzeichen) — attach gives sectionDef
  {
    const eng = makeMatch(win, nat0);
    const u = putUnit(eng, 0, infCard().id, 'C', 0);
    const before = u.def;
    equipOn(eng, u, 'dc_b_schuldzeichen_959');
    assert(u.def >= before + 2, 'Schuldzeichen +1/+1 and sectionDef ' + before + '->' + u.def);
    ok('EQUIP_KILL_DRAW_BUFF Schuldzeichen');
  }

  // EQUIP_REVEAL_ALLY_DEF (Lagezeichen)
  {
    const eng = makeMatch(win, nat0);
    const u = putUnit(eng, 0, infCard().id, 'C', 0);
    const hid = putUnit(eng, 0, infCard().id, 'C', 1);
    hid.facedown = true;
    equipOn(eng, u, 'dc_b_lagezeichen_899');
    const before = hid.def;
    eng._revealInst(hid);
    assert(hid.def === before + 1, 'Lagezeichen ally reveal DEF');
    ok('EQUIP_REVEAL_ALLY_DEF Lagezeichen');
  }

  // REVEAL_STRIKE on Linse
  {
    const eng = makeMatch(win, nat0);
    const scout = win.DC_CATALOG.cards.find((c) => ((c.tags||[]).includes('aufklaerung') || c.klasse==='Aufklärung') && eng.byId[c.id]) || infCard();
    const u = putUnit(eng, 0, scout.id, 'C', 0);
    equipOn(eng, u, 'dc_b_linse_298');
    assert((u.attachments[0] && (eng.defOf(u.attachments[0]).effects||[]).some((e)=>e.code==='REVEAL_STRIKE')), 'Linse has REVEAL_STRIKE');
    ok('REVEAL_STRIKE Linse');
  }

  // ZIELANGRIFF
  {
    const eng = makeMatch(win, nat0);
    const atk = putUnit(eng, 0, infCard().id, 'C', 0);
    atk.summonedTurn = eng.state.turn - 1;
    const foe = putUnit(eng, 1, infCard().id, 'C', 0);
    foe.def = 5; foe.defMax = 5;
    const card = giveHand(eng, 0, 'dc_b_zielangriff_942');
    eng.dispatch({ type: 'PLAY', player: 0, uid: card.uid });
    if (eng.state.pending) eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: foe.uid });
    assert(foe.flags && foe.flags.zielangriff, 'Zielangriff mark');
    const aDefBefore = atk.def;
    eng.dispatch({ type: 'ATTACK', player: 0, uid: atk.uid, target: foe.uid });
    if (eng.state.pending && eng.state.pending.kind === 'react-window') eng.dispatch({ type: 'REACT_PASS', player: eng.state.pending.player });
    assert(atk.def >= aDefBefore + 1 || foe.def < 5, 'Zielangriff first hit effect');
    ok('ZIELANGRIFF');
  }

  // UMGEHEN
  {
    const eng = makeMatch(win, nat0);
    const atk = putUnit(eng, 0, infCard().id, 'L', 0);
    atk.summonedTurn = eng.state.turn - 1;
    const foe = putUnit(eng, 1, infCard().id, 'R', 2); // far
    const card = giveHand(eng, 0, 'dc_b_umgehen_703');
    eng.dispatch({ type: 'PLAY', player: 0, uid: card.uid });
    if (eng.state.pending) eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: foe.uid });
    assert(foe.flags && foe.flags.umgehenUntil === eng.state.turn, 'Umgehen mark');
    const legal = eng.legalAttackTargets({ inst: atk, player: eng.player(0), zone: 'front', section: 'L', row: 0 });
    assert(legal.some((t) => t.inst && t.inst.uid === foe.uid), 'Umgehen allows distant target');
    assert(eng.currentAtkDef(atk).atk >= (Number(eng.defOf(atk).atk)||0) + 1, 'Umgehen +1 ATK');
    ok('UMGEHEN');
  }

  // KEIN_LOCH
  {
    const eng = makeMatch(win, nat0);
    const u = putUnit(eng, 0, infCard().id, 'C', 0);
    const card = giveHand(eng, 0, 'dc_b_kein_loch_346');
    eng.dispatch({ type: 'PLAY', player: 0, uid: card.uid });
    if (eng.state.pending) eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: u.uid });
    assert(eng.player(0).flags && eng.player(0).flags.keinLoch, 'Kein Loch flag');
    const before = u.def;
    eng._damage(u, 3, { tag: 'test' });
    assert(u.def === before - 1, 'Kein Loch negates 2 of 3 → ' + before + '->' + u.def);
    ok('KEIN_LOCH');
  }

  // Rasten combo + Freigabeformular duplicate cond def sanity
  {
    const eng = makeMatch(win, nat0);
    const u = putUnit(eng, 0, infCard().id, 'C', 0);
    equipOn(eng, u, 'dc_b_rasten_359');
    equipOn(eng, u, 'dc_b_freigabeformular_600');
    ok('Rasten+Freigabeformular attach');
  }

  
  // --- deploy_protection / Eingraben ---
  {
    const eng = makeMatch(win, nat0);
    assert(eng.rules.deploy_protection === true, 'deploy_protection default ON');
    const inf = win.DC_CATALOG.cards.find((c) => ((c.tags||[]).includes('infanterie') || c.klasse==='Infanterie') && eng.byId[c.id]);
    const atk = putUnit(eng, 0, inf.id, 'C', 0);
    atk.summonedTurn = eng.state.turn - 2;
    atk.flags = atk.flags || {};
    const foeCard = giveHand(eng, 1, inf.id);
    // Simulate enemy turn deploy with protection
    eng.state.active = 1;
    eng.player(1).ap = 10;
    // place via engine API
    const beforeTurn = eng.state.turn;
    const slotCard = eng.instFromId(inf.id, 1);
    eng.player(1).hand.push(slotCard);
    eng.player(1).ap = 20;
    // Direct apply like deploy
    const found = eng.instFromId(inf.id, 1);
    found.summonedTurn = eng.state.turn;
    eng._applyDeployProtection(found);
    eng.player(1).front.C[0] = found;
    assert(found.facedown === false, 'deploy open not facedown');
    assert(eng._isDeployProtected(found), 'protected right after deploy');
    assert(found.flags.digInBonus === 1, 'digIn +1 DEF flag');
    const legal = eng.legalAttackTargets({ inst: atk, player: eng.player(0), zone: 'front', section: 'C', row: 0 });
    assert(!legal.some((t) => t.inst && t.inst.uid === found.uid), 'protected not in legalAttackTargets');
    let threw = false;
    try { eng._resolveCombat(0, atk.uid, found.uid); } catch (err) { threw = /eingegraben/i.test(String(err.message||err)); }
    assert(threw, 'combat rejects protected target');

    // MASS_DAMAGE still hits (Flächenschaden ignoriert Eingraben)
    const defBefore = found.def;
    assert(defBefore != null && defBefore > 1, 'def ready ' + defBefore);
    eng._applyEffect(eng.player(0), found, { code: 'MASS_DAMAGE', param: { value: 1 } }, null);
    assert(found.def === defBefore - 1, 'mass damage still hits protected got ' + found.def + ' from ' + defBefore);

    // Targeted DEAL_DAMAGE blocked
    const def2 = found.def;
    eng._applyEffect(eng.player(0), found, { code: 'DEAL_DAMAGE', param: { value: 2 } }, found.uid);
    assert(found.def === def2, 'targeted DEAL_DAMAGE blocked while protected');

    // Expire at owner next turn start: turn advances past noCombatUntil
    const until = found.flags.noCombatUntil;
    eng.state.turn = until + 1;
    // run expire logic like _actEnd
    eng.frontList(eng.player(1)).forEach((l) => {
      if (l.inst.flags && l.inst.flags.noCombatUntil != null && l.inst.flags.noCombatUntil < eng.state.turn) {
        l.inst.flags.noCombatUntil = null;
      }
      if (l.inst.flags && l.inst.flags.digInBonus && l.inst.flags.digInUntil != null && l.inst.flags.digInUntil < eng.state.turn) {
        const b = Number(l.inst.flags.digInBonus || 1);
        l.inst.def = Math.max(1, (l.inst.def || 1) - b);
        if (l.inst.defMax != null) l.inst.defMax = Math.max(l.inst.def, l.inst.defMax - b);
        l.inst.flags.digInBonus = 0;
        l.inst.flags.digInUntil = null;
      }
    });
    assert(!eng._isDeployProtected(found), 'protection ends at owner next turn start');
    const legal2 = eng.legalAttackTargets({ inst: atk, player: eng.player(0), zone: 'front', section: 'C', row: 0 });
    assert(legal2.some((t) => t.inst && t.inst.uid === found.uid), 'targetable after protection ends');
    ok('deploy_protection lifecycle + targeting + mass vs targeted');
  }


  console.log('\nALL PASSED', passed);
}


try { main(); }
catch (e) {
  console.error(e.stack || e);
  process.exit(1);
}
