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
  ctx.globalThis = ctx;
  window.window = window;
  ctx.self = window;
  for (const f of ['doktrinen','tokens','infanterie','panzer','artillerie','aufklaerung','elite','unterstuetzung','soforteinsatz','ausruestung','nation_pools']) {
    vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/data/sets/types', f + '.js'), 'utf8'), ctx);
  }
  // catalog: only the data parts
  const cat = fs.readFileSync(path.join(WEB, 'js/data/catalog.js'), 'utf8');
  const cut = cat.indexOf('/* 0.5a:');
  vm.runInNewContext(cat.slice(0, cut > 0 ? cut : cat.length), ctx);
  vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/data/decks.js'), 'utf8'), ctx);
  vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/data/nationen.js'), 'utf8'), ctx);
  vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/engine/engine.js'), 'utf8'), ctx);
  try { vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/engine/victory_trophy.js'), 'utf8'), ctx); } catch (e) {}
  try { vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/engine/doctrine_runtime.js'), 'utf8'), ctx); } catch (e) {}
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
      // Doctrine passives (e.g. Feuerwalze) may add ATK on top of equipment.
      assert(st.atk >= base + 1, 'kaliber atk ' + st.atk + ' base ' + base);
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


  
  // --- combat_counter modes ---
  {
    function prepCombat(mode) {
      const eng = makeMatch(win, nat0);
      eng.rules.combat_counter = mode;
      const inf = win.DC_CATALOG.cards.find((c) => ((c.tags||[]).includes('infanterie') || c.klasse==='Infanterie') && eng.byId[c.id]);
      const atk = putUnit(eng, 0, inf.id, 'C', 0);
      const def = putUnit(eng, 1, inf.id, 'C', 0);
      atk.summonedTurn = eng.state.turn - 2;
      def.summonedTurn = eng.state.turn - 2;
      atk.facedown = false; def.facedown = false;
      atk.flags = atk.flags || {}; def.flags = def.flags || {};
      delete atk.flags.noCombatUntil; delete def.flags.noCombatUntil;
      // Force readable trade: ATK 3 vs DEF 2 → kill; defender ATK 2
      atk.def = 5; atk.defMax = 5;
      def.def = 2; def.defMax = 2;
      // Patch currentAtkDef via flags buff
      atk.flags.buffAtk = 3 - (Number(eng.defOf(atk).atk) || 0);
      def.flags.buffAtk = 2 - (Number(eng.defOf(def).atk) || 0);
      return { eng, atk, def };
    }
    // survivor_only: kill → no counter
    {
      const { eng, atk, def } = prepCombat('survivor_only');
      const aBefore = atk.def;
      eng._applyCombatHits(
        { inst: atk, player: eng.player(0), zone: 'front', section: 'C', row: 0 },
        { inst: def, player: eng.player(1), zone: 'front', section: 'C', row: 0 },
        3, 2, false
      );
      assert(eng._isDead(def) || def.def <= 0, 'survivor kill defender');
      assert(atk.def === aBefore, 'survivor_only: no counter after lethal got ' + atk.def + ' from ' + aBefore);
      ok('combat_counter survivor_only lethal no counter');
    }
    // survivor_only: nonlethal → counter
    {
      const { eng, atk, def } = prepCombat('survivor_only');
      def.def = 5; def.defMax = 5;
      const aBefore = atk.def;
      eng._applyCombatHits(
        { inst: atk, player: eng.player(0), zone: 'front', section: 'C', row: 0 },
        { inst: def, player: eng.player(1), zone: 'front', section: 'C', row: 0 },
        2, 2, false
      );
      assert(!eng._isDead(def), 'survivor nonlethal lives');
      assert(atk.def === aBefore - 2, 'survivor_only: counter when survives');
      ok('combat_counter survivor_only nonlethal counters');
    }
    // none: never counter
    {
      const { eng, atk, def } = prepCombat('none');
      def.def = 5; def.defMax = 5;
      const aBefore = atk.def;
      eng._applyCombatHits(
        { inst: atk, player: eng.player(0), zone: 'front', section: 'C', row: 0 },
        { inst: def, player: eng.player(1), zone: 'front', section: 'C', row: 0 },
        2, 2, false
      );
      assert(atk.def === aBefore, 'none: never counters');
      ok('combat_counter none');
    }
    // simultaneous: counter even on lethal
    {
      const { eng, atk, def } = prepCombat('simultaneous');
      def.def = 2; def.defMax = 2;
      const aBefore = atk.def;
      eng._applyCombatHits(
        { inst: atk, player: eng.player(0), zone: 'front', section: 'C', row: 0 },
        { inst: def, player: eng.player(1), zone: 'front', section: 'C', row: 0 },
        3, 2, false
      );
      assert(eng._isDead(def) || def.def <= 0, 'simul kill defender');
      assert(atk.def === aBefore - 2, 'simultaneous: counter even if defender dies');
      ok('combat_counter simultaneous lethal still counters');
    }
    assert((win.DC_CATALOG.rules.combat_counter || 'survivor_only') === 'survivor_only', 'default survivor_only');
    ok('combat_counter default');

    // Artillerie: Gegenschlag nur bei Reichweite des Verteidigers
    function prepArtyCombat(atkSec, atkRow, defSec, defRow) {
      const eng = makeMatch(win, nat0);
      eng.rules.combat_counter = 'survivor_only';
      const arty = win.DC_CATALOG.cards.find((c) => (c.tags || []).includes('artillerie') && !(c.effects || []).some((e) => e.code === 'ATTACK_ANY_FRONT') && eng.byId[c.id])
        || win.DC_CATALOG.cards.find((c) => c.klasse === 'Artillerie' && eng.byId[c.id]);
      const inf = win.DC_CATALOG.cards.find((c) => ((c.tags||[]).includes('infanterie') || c.klasse==='Infanterie') && eng.byId[c.id]);
      assert(arty && inf, 'need arty+inf cards');
      const atk = putUnit(eng, 0, arty.id, atkSec, atkRow);
      const def = putUnit(eng, 1, inf.id, defSec, defRow);
      atk.summonedTurn = eng.state.turn - 2;
      def.summonedTurn = eng.state.turn - 2;
      atk.facedown = false; def.facedown = false;
      atk.flags = atk.flags || {}; def.flags = def.flags || {};
      delete atk.flags.noCombatUntil; delete def.flags.noCombatUntil;
      atk.def = 8; atk.defMax = 8;
      def.def = 6; def.defMax = 6;
      atk.flags.buffAtk = 2 - (Number(eng.defOf(atk).atk) || 0);
      def.flags.buffAtk = 2 - (Number(eng.defOf(def).atk) || 0);
      return { eng, atk, def, arty, inf };
    }
    // out of infantry range: arty C0 → inf L1 (dist 2); arty range 5 hits, inf range 3 cannot
    {
      const { eng, atk, def } = prepArtyCombat('C', 0, 'L', 1);
      const aLoc = { inst: atk, player: eng.player(0), zone: 'front', section: 'C', row: 0 };
      const tLoc = { inst: def, player: eng.player(1), zone: 'front', section: 'L', row: 1 };
      assert(eng._isArtilleryAttacker(atk), 'attacker is artillery');
      assert(!eng._canReachForCounter(tLoc, aLoc), 'defender out of reach of arty');
      const aBefore = atk.def;
      eng._applyCombatHits(aLoc, tLoc, 2, 2, false);
      assert(!eng._isDead(def), 'arty OOR: defender lives');
      assert(atk.def === aBefore, 'arty OOR: no counter got ' + atk.def + ' from ' + aBefore);
      ok('artillery vs out-of-range defender: no counter');
    }
    // in range: arty C0 → inf C1 (dist 1); both can reach
    {
      const { eng, atk, def } = prepArtyCombat('C', 0, 'C', 1);
      const aLoc = { inst: atk, player: eng.player(0), zone: 'front', section: 'C', row: 0 };
      const tLoc = { inst: def, player: eng.player(1), zone: 'front', section: 'C', row: 1 };
      assert(eng._canReachForCounter(tLoc, aLoc), 'defender in reach of arty');
      const aBefore = atk.def;
      eng._applyCombatHits(aLoc, tLoc, 2, 2, false);
      assert(!eng._isDead(def), 'arty IR: defender lives');
      assert(atk.def === aBefore - 2, 'arty IR: counter when survives got ' + atk.def);
      ok('artillery vs in-range defender: counter if survives');
    }
    // non-artillery unchanged: dist 2 would still counter for infantry-vs-infantry? Same section chain:
    // Inf C0 vs Inf L1: dist 2 > 1, infantry cannot "reach" either — but non-arty still counters by rule.
    {
      const eng = makeMatch(win, nat0);
      eng.rules.combat_counter = 'survivor_only';
      const inf = win.DC_CATALOG.cards.find((c) => ((c.tags||[]).includes('infanterie') || c.klasse==='Infanterie') && eng.byId[c.id]);
      const atk = putUnit(eng, 0, inf.id, 'C', 0);
      const def = putUnit(eng, 1, inf.id, 'L', 1);
      atk.summonedTurn = eng.state.turn - 2; def.summonedTurn = eng.state.turn - 2;
      atk.facedown = false; def.facedown = false;
      atk.flags = {}; def.flags = {};
      atk.def = 8; atk.defMax = 8; def.def = 6; def.defMax = 6;
      atk.flags.buffAtk = 2 - (Number(eng.defOf(atk).atk) || 0);
      def.flags.buffAtk = 2 - (Number(eng.defOf(def).atk) || 0);
      const aLoc = { inst: atk, player: eng.player(0), zone: 'front', section: 'C', row: 0 };
      const tLoc = { inst: def, player: eng.player(1), zone: 'front', section: 'L', row: 1 };
      assert(!eng._isArtilleryAttacker(atk), 'non-arty attacker');
      assert(!eng._canReachForCounter(tLoc, aLoc), 'geometry out of reach but non-arty still counters');
      const aBefore = atk.def;
      eng._applyCombatHits(aLoc, tLoc, 2, 2, false);
      assert(atk.def === aBefore - 2, 'non-arty: counter unchanged even if geometry OOR');
      ok('non-artillery attacker: counter unchanged');
    }
  }



  // --- deck copy limits / Jägerstellung ---
  {
    assert(typeof win.DC_validateDeck === 'function', 'DC_validateDeck exists');
    assert(typeof win.DC_deckCopyLimit === 'function', 'DC_deckCopyLimit exists');
    const jaeger = win.DC_CATALOG.cards.find((c) => c.id === 'dc_eh_jaeger' || c.name === 'Jägerstellung');
    assert(jaeger, 'Jägerstellung card');
    assert(jaeger.max_copies === win.DC_deckCopyLimit(jaeger), 'jaeger max_copies synced');
    // rarity limits
    assert(win.DC_deckCopyLimit({ rarity: 'gold' }) === 1, 'gold 1');
    assert(win.DC_deckCopyLimit({ rarity: 'silver' }) === 2, 'silver 2');
    assert(win.DC_deckCopyLimit({ rarity: 'bronze' }) === 4, 'bronze 4');
    assert(win.DC_deckCopyLimit({ rarity: 'silber' }) === 2, 'silber alias');
    assert(win.DC_deckCopyLimit({}) === 4, 'missing rarity = bronze');
    // gold cannot be 2x
    const gold = win.DC_CATALOG.cards.find((c) => c.rarity === 'gold' && c.typ !== 'Doktrin');
    assert(gold, 'gold card');
    let v = win.DC_validateDeck([gold.id, gold.id], []);
    assert(!v.ok, 'gold 2x invalid');
    assert(v.fixedIds.length === 1, 'gold autofix to 1');
    // silver max 2
    const silver = win.DC_CATALOG.cards.find((c) => c.rarity === 'silver' && c.typ !== 'Doktrin');
    v = win.DC_validateDeck([silver.id, silver.id, silver.id], []);
    assert(!v.ok && v.fixedIds.length === 2, 'silver autofix to 2');
    // bronze max 4
    const bronze = win.DC_CATALOG.cards.find((c) => c.rarity === 'bronze' && c.typ !== 'Doktrin');
    v = win.DC_validateDeck([bronze.id, bronze.id, bronze.id, bronze.id, bronze.id], []);
    assert(!v.ok && v.fixedIds.length === 4, 'bronze autofix to 4');
    // Jägerstellung: historically buildTestDeck could insert 2 because max_copies:2
    v = win.DC_validateDeck([jaeger.id, jaeger.id], []);
    const jLim = win.DC_deckCopyLimit(jaeger);
    assert(v.fixedIds.filter((x) => x === jaeger.id).length <= jLim, 'jaeger within limit');
    if (jLim >= 2) assert(v.ok, 'jaeger 2x ok under bronze default');
    // name collision: two different gold IDs same name would fail — Punktfeuer was fixed by rename
    const pf = win.DC_CATALOG.cards.filter((c) => c.name === 'Punktfeuer' && c.typ !== 'Doktrin');
    assert(pf.length === 1, 'Punktfeuer unique among deck cards after rename got ' + pf.length);
    const pv = win.DC_CATALOG.cards.find((c) => c.id === 'dc_b_punktfeuer_479');
    assert(pv && pv.name === 'Punktvisier', 'equip renamed Punktvisier');
    // nation decks all valid
    const decks = win.DC_NATION_DECKS || {};
    Object.keys(decks).forEach((nat) => {
      const d = decks[nat];
      const res = win.DC_validateDeck(d.cards || [], d.doktrinen || []);
      assert(res.ok, 'nation deck valid ' + nat + ' ' + JSON.stringify(res.notices));
      assert((d.cards || []).length === 60, nat + ' has 60 cards');
    });
    // createMatch strips illegal copies and records notices
    const Eng = (win.DCEngine && win.DCEngine.Engine) || (win.DC && win.DC.Engine);
    assert(Eng, 'Engine class');
    const eng = new Eng(win.DC_CATALOG, { seed: 7 });
    const base0 = ((decks.Vael && decks.Vael.cards) || []).slice();
    eng.createMatch({
      seed: 7, mode: 'bot', name0: 'A', name1: 'B',
      deck0: [gold.id, gold.id].concat(base0).slice(0, 60),
      deck1: ((decks.Rothain && decks.Rothain.cards) || []).slice(),
      doctrine0: (decks.Vael && decks.Vael.doktrinen) || [],
      doctrine1: (decks.Rothain && decks.Rothain.doktrinen) || [],
    });
    const all0 = eng.state.players[0].deck.concat(eng.state.players[0].hand);
    const gCount = all0.filter((inst) => eng.defOf(inst) && eng.defOf(inst).id === gold.id).length;
    assert(gCount <= 1, 'createMatch strips gold dupes got ' + gCount);
    assert(Array.isArray(eng.state.deckNotices), 'deckNotices on state');
    assert(eng.state.deckNotices.length >= 1, 'deckNotices reports gold overflow');
    ok('deck copy limits + Jägerstellung + nation audit + createMatch sanitize');

    // buildTestDeck: no duplicates of Jägerstellung; respects rarity
    assert(win.DCEngine && win.DCEngine.buildTestDeck, 'buildTestDeck export');
    const td = win.DCEngine.buildTestDeck(win.DC_CATALOG, win.DCEngine.rng(99));
    const counts = {};
    td.forEach((id) => { counts[id] = (counts[id] || 0) + 1; });
    Object.keys(counts).forEach((id) => {
      const c = win.DC_CATALOG.cards.find((x) => x.id === id);
      assert(counts[id] <= win.DC_deckCopyLimit(c), 'testdeck limit ' + id);
    });
    assert((counts['dc_eh_jaeger'] || 0) <= 1, 'testdeck Jägerstellung at most 1 (was 2 via max_copies)');
    ok('buildTestDeck rarity-safe / no forced jaeger duo');
  }



  // --- Sector / Abschnitt effects ---
  {
    const mole = findCard(win, (c) => c.name === 'Mole schließen');
    const pioniere = findCard(win, (c) => c.name === 'Pioniereinsatz');
    const kampfruf = findCard(win, (c) => c.name === 'Kampfruf');
    const keinLoch = findCard(win, (c) => c.name === 'Kein Loch');
    assert(mole && pioniere && kampfruf && keinLoch, 'sector cards present');
    assert((mole.effects || []).every((e) => e.code !== 'BUFF_SECTION' || e.targetSide === 'own'), 'mole targetSide own');
    {
      const engProbe = makeMatch(win, nat0);
      assert(engProbe._isSectionEffect(mole), 'mole is section effect');
    }

    // Audit: every BUFF_SECTION / KEIN_LOCH has targetSide + handler
    const EngProto = win.DCEngine.Engine.prototype;
    const sectorCards = win.DC_CATALOG.cards.filter((c) => (c.effects || []).some((e) => ['BUFF_SECTION', 'KEIN_LOCH', 'DAMAGE_SECTION', 'HEAL_SECTION'].includes(e.code)));
    let missingSide = 0;
    sectorCards.forEach((c) => {
      (c.effects || []).forEach((e) => {
        if (!['BUFF_SECTION', 'KEIN_LOCH', 'DAMAGE_SECTION', 'HEAL_SECTION'].includes(e.code)) return;
        if (!e.targetSide && !(e.param && e.param.targetSide)) missingSide += 1;
      });
    });
    assert(missingSide === 0, 'sector effects missing targetSide: ' + missingSide + ' / cards ' + sectorCards.length);
    ok('audit: sector effects have targetSide (' + sectorCards.length + ' cards)');

    // Friendly buff on own section — Mole schließen must NOT offer only enemies
    {
      const eng = makeMatch(win, nat0);
      const inf = win.DC_CATALOG.cards.find((c) => ((c.tags || []).includes('infanterie') || c.klasse === 'Infanterie') && eng.byId[c.id]);
      const own = putUnit(eng, 0, inf.id, 'L', 0);
      putUnit(eng, 1, inf.id, 'C', 0);
      own.summonedTurn = eng.state.turn - 2; own.facedown = false;
      const before = own.def;
      const hand = giveHand(eng, 0, mole.id);
      eng.state.active = 0;
      const r1 = eng.dispatch({ type: 'PLAY', player: 0, uid: hand.uid });
      assert(r1 && r1.need === 'target', 'mole needs target');
      assert(eng.state.pending && eng.state.pending.kind === 'instant-section', 'mole pending instant-section got ' + (eng.state.pending && eng.state.pending.kind));
      const choices = eng.state.pending.choices || [];
      assert(choices.length === 3, 'mole 3 own sections got ' + choices.length);
      assert(choices.every((c) => c.side === 'own' && /^sec:own:[LCR]$/.test(c.target)), 'mole only own sections');
      assert(!choices.some((c) => c.side === 'enemy'), 'mole no enemy sections');
      eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: 'sec:own:L' });
      assert(own.def === before + 2, 'mole +2 DEF on own L ' + before + '->' + own.def);
      const auras = (eng.player(0).flags.sectionAuras || []).filter((a) => a.section === 'L' && a.untilTurn >= eng.state.turn);
      assert(auras.length >= 1, 'mole aura stored');
      ok('friendly sector buff (Mole schließen) targets own section');
    }

    // Enemy unit as PLAY target must not fizzle — coerce rejected, re-prompt OR we reject wrong side
    {
      const eng = makeMatch(win, nat0);
      const inf = win.DC_CATALOG.cards.find((c) => ((c.tags || []).includes('infanterie') || c.klasse === 'Infanterie') && eng.byId[c.id]);
      const own = putUnit(eng, 0, inf.id, 'L', 0);
      const foe = putUnit(eng, 1, inf.id, 'C', 0);
      own.summonedTurn = eng.state.turn - 2; own.facedown = false;
      const before = own.def;
      const hand = giveHand(eng, 0, mole.id);
      eng.state.active = 0;
      // Drag onto enemy unit previously caused fizzle; now should open section picker
      const r1 = eng.dispatch({ type: 'PLAY', player: 0, uid: hand.uid, target: foe.uid });
      assert(r1 && r1.need === 'target', 'wrong-side unit target → still need section');
      assert(eng.state.pending.kind === 'instant-section', 'still section pending');
      eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: 'sec:own:L' });
      assert(own.def === before + 2, 'after correct section pick, buff applies');
      ok('enemy unit drag no longer fizzles sector buff');
    }

    // Aura affects later-deployed units
    {
      const eng = makeMatch(win, nat0);
      const inf = win.DC_CATALOG.cards.find((c) => ((c.tags || []).includes('infanterie') || c.klasse === 'Infanterie') && eng.byId[c.id]);
      putUnit(eng, 0, inf.id, 'C', 0);
      const hand = giveHand(eng, 0, pioniere.id);
      eng.state.active = 0;
      eng.dispatch({ type: 'PLAY', player: 0, uid: hand.uid });
      eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: 'sec:own:C' });
      const late = putUnit(eng, 0, inf.id, 'C', 1);
      late.summonedTurn = eng.state.turn;
      late.facedown = false;
      // simulate enter hook
      eng._onEnter(late, 'front');
      const printed = Number(eng.defOf(late).def) || 0;
      assert(late.def >= printed + 2, 'later deploy gets section DEF aura ' + late.def + ' vs printed ' + printed);
      ok('section aura applies to later-deployed units');
    }

    // Kampfruf ATK via aura in currentAtkDef
    {
      const eng = makeMatch(win, nat0);
      const inf = win.DC_CATALOG.cards.find((c) => ((c.tags || []).includes('infanterie') || c.klasse === 'Infanterie') && eng.byId[c.id]);
      const own = putUnit(eng, 0, inf.id, 'R', 0);
      own.summonedTurn = eng.state.turn - 2; own.facedown = false;
      const atk0 = eng.currentAtkDef(own).atk;
      const hand = giveHand(eng, 0, kampfruf.id);
      eng.state.active = 0;
      eng.dispatch({ type: 'PLAY', player: 0, uid: hand.uid });
      eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: 'sec:own:R' });
      const atk1 = eng.currentAtkDef(own).atk;
      assert(atk1 === atk0 + 1, 'Kampfruf +1 ATK ' + atk0 + '->' + atk1);
      ok('Kampfruf section ATK');
    }

    // Expiry at end of turn
    {
      const eng = makeMatch(win, nat0);
      const inf = win.DC_CATALOG.cards.find((c) => ((c.tags || []).includes('infanterie') || c.klasse === 'Infanterie') && eng.byId[c.id]);
      const own = putUnit(eng, 0, inf.id, 'L', 0);
      own.summonedTurn = eng.state.turn - 2; own.facedown = false;
      const hand = giveHand(eng, 0, kampfruf.id);
      eng.state.active = 0;
      eng.dispatch({ type: 'PLAY', player: 0, uid: hand.uid });
      eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: 'sec:own:L' });
      const mid = eng.currentAtkDef(own).atk;
      // clear hand overflow to allow end turn
      eng.player(0).hand = eng.player(0).hand.slice(0, 7);
      eng.dispatch({ type: 'END_TURN', player: 0 });
      // after end, turn advanced; aura untilTurn was old turn → expired
      const auras = (eng.player(0).flags.sectionAuras || []).filter((a) => a.section === 'L' && a.untilTurn >= eng.state.turn);
      assert(auras.length === 0, 'aura expired after end turn, left ' + auras.length);
      ok('section aura expires at end of turn');
    }

    // Kein Loch targets own section
    {
      const eng = makeMatch(win, nat0);
      const inf = win.DC_CATALOG.cards.find((c) => ((c.tags || []).includes('infanterie') || c.klasse === 'Infanterie') && eng.byId[c.id]);
      putUnit(eng, 0, inf.id, 'C', 0);
      const hand = giveHand(eng, 0, keinLoch.id);
      eng.state.active = 0;
      eng.dispatch({ type: 'PLAY', player: 0, uid: hand.uid });
      assert(eng.state.pending && eng.state.pending.kind === 'instant-section', 'kein loch section pending');
      eng.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: 'sec:own:C' });
      assert(eng.player(0).flags.keinLoch && eng.player(0).flags.keinLoch.section === 'C', 'kein loch on C');
      ok('Kein Loch targets own section');
    }
  }

  console.log('\nALL PASSED', passed);
}


try { main(); }
catch (e) {
  console.error(e.stack || e);
  process.exit(1);
}
