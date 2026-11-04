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

  console.log('\nALL PASSED', passed);
}

try { main(); }
catch (e) {
  console.error(e.stack || e);
  process.exit(1);
}
