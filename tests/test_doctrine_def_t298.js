/**
 * t298: Lage-DEF zählt im Kampf, Überlast zerstört, Kampftext meldet nur echten Gegenschlag.
 *
 * Vor 0.619 addierte `currentAtkDef` Doktrin-DEF (Auffangen, Verteilte Stellung, Linienkrieg …) nur auf den
 * Anzeigewert; Schaden und Tod liefen über `inst.def`. Flankenschutz (FLANK_DEF) und Satelliten-Auren standen
 * doppelt in der Anzeige. Überlast/Religiöser Eifer/Zugbeginn-Kontrolle riefen `_destroy` mit `frontList`-Einträgen
 * ohne Spieler auf und brachen still ab. Szenarien direkt auf der Engine wie in test_doctrine_actives_t285.js.
 * Läuft über `npm test` von der Repo-Wurzel.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const L = require('../scripts/nation_pools/load_game.js');

const BOTE = 'dc_b_parlamentsbote_722'; // Eldran 1/2 (Playtest mwmhnwd9 Eintrag 45: „2/4“, starb an 2 Schaden)
const GASSE = 'dc_b_gassenmelder_744';
const PFAD = 'dc_b_pfadwaechter_226'; // Lyr 1/3
const SCHILD = 'dc_b_passhaus_schild_72';
const LAUERND = 'dc_np_lyr_lauernde_schuetzen'; // Lyr 3/1, Überlast (Playtest Eintrag 53/54)
const INF = 'dc_eh_freiwilligenzug'; // 2/2 Infanterie
const KOMMANDO = 'dc_eh_kommando'; // FLANK_DEF: Nachbarn +2 DEF

/**
 * Frische Partie mit leerem Brett, Spieler `active` am Zug, Bot geladen.
 * @param {number} [active]
 * @returns {{eng: object, Bot: object, w: object}}
 */
function boot(active) {
  const w = L.loadGame({ quiet: true });
  vm.runInNewContext(fs.readFileSync(path.join(L.WEB, 'js/ai/bot.js'), 'utf8'), { window: w, console: { log() {}, warn() {} }, Math, JSON, Object, Array, String, Number, Error });
  const eng = L.newMatch(w, 'Eldran', 21);
  L.clearBoard(eng);
  eng.state.players.forEach((p) => { p.hand = []; p.deck = []; p.grave = []; p.ap = 5; p.flags = p.flags || {}; p.doctrines = []; });
  eng.state.pending = null; eng.state.turn = 10; eng.state.active = active || 0; eng.state.phase = 'main';
  return { eng, Bot: w.DCBot, w };
}
/**
 * Doktrinen für Spieler `pid` setzen.
 * @param {object} eng @param {number} pid @param {string[]} ids
 */
function doctrines(eng, pid, ids) { eng.player(pid).doctrines = ids.map((id) => eng.instFromId(id, pid)); }
/**
 * Alle Neuberechnungen wie nach einer Aktion (Schlüsselwörter, CM, Lage-DEF).
 * @param {object} eng
 */
function settle(eng) { eng._kwRecompute(); eng._cmRecompute(); eng._dynDefSync(); }
/**
 * Anzeige-DEF (UI, Bot, Logbuch).
 * @param {object} eng @param {object} inst @returns {number}
 */
const shown = (eng, inst) => eng.currentAtkDef(inst).def;
/** @param {object} eng @param {object} inst @returns {boolean} */
const onFront = (eng, inst) => { const l = eng.findInst(inst.uid); return !!(l && l.zone === 'front'); };
/** @param {object} eng @param {number} n @returns {string[]} letzte Ereignistexte */
const lastEvents = (eng, n) => (eng.state.events || []).slice(-(n || 6)).map((e) => e.text);

// 1) Playtest mwmhnwd9 Eintrag 45: Parlamentsbote zeigte 4 DEF (0.611: Auffangen +1 Grund, +1 bei Unterzahl) und
//    starb bei inst.def 2. Seit t300 (0.624) hat Auffangen keinen Grundbonus mehr: Anzeige 3 = echte DEF 3,
//    er überlebt 2 Gegenschaden mit 1.
{
  const { eng } = boot(1);
  doctrines(eng, 0, ['dc_dok_lauer', 'dc_dok_verteilte_stellung']);
  doctrines(eng, 1, ['dc_dok_auffangen', 'dc_dok_gegenstoss']);
  const bote = L.put(eng, 1, BOTE, 'C', 1); L.put(eng, 1, GASSE, 'C', 2);
  const pfad = L.put(eng, 0, PFAD, 'C', 0); L.put(eng, 0, SCHILD, 'C', 1); L.put(eng, 0, LAUERND, 'C', 2);
  pfad.flags.dokRested = true; // Lauer: geruht → +1 ATK (Gegenschlag 2 wie im Playtest)
  settle(eng);
  assert.equal(shown(eng, bote), 3, 'Anzeige 3 DEF (gedruckt 2 + Unterzahl 1)');
  assert.equal(bote.def, 3, 'die angezeigte DEF ist die echte DEF');
  assert.equal(eng.currentAtkDef(pfad).atk, 2, 'Gegenschlag 2');
  const r = eng.dispatch({ type: 'ATTACK', player: 1, uid: bote.uid, target: pfad.uid });
  assert.ok(r.ok, r.error);
  assert.ok(onFront(eng, bote), 'Parlamentsbote überlebt 2 Schaden bei 3 DEF');
  assert.equal(bote.def, 1); assert.equal(shown(eng, bote), 1, 'Anzeige nach dem Treffer = echte DEF');
  assert.ok(lastEvents(eng).some((t) => /richtet 1 Schaden an, erhält 2\./.test(t)), 'Gegenschlag im Kampftext');
  console.log('ok t298 Playtest-Fall: Auffangen-DEF zählt im Kampf');
}

// 2) Auffangen (seit t300 ohne Grundbonus): Unterzahl-Bonus; Verlust des Bonus senkt DEF, tötet aber nie (mind. 1).
{
  const { eng } = boot(0);
  doctrines(eng, 0, ['dc_dok_auffangen']);
  const u = L.put(eng, 0, INF, 'L', 0);
  const p = Number(eng.defOf(u).def);
  settle(eng);
  assert.equal(u.def, p, 'kein Grundbonus (t300)'); assert.equal(shown(eng, u), u.def);
  L.put(eng, 1, INF, 'L', 0); L.put(eng, 1, INF, 'L', 1);
  settle(eng);
  assert.equal(u.def, p + 1, 'Unterzahl +1'); assert.equal(u.defMax, p + 1, 'Höchst-DEF wächst mit');
  eng._damage(u, p, { tag: 'test' });
  assert.equal(u.def, 1, 'überlebt Schaden in Höhe der gedruckten DEF');
  assert.ok(!eng._isDead(u));
  eng.player(1).front.L[1] = null; settle(eng); // Unterzahl endet: −1 DEF, aber nicht unter 1
  assert.equal(u.def, 1, 'Bonusverlust tötet nicht'); assert.equal(u.defMax, p);
  assert.equal(shown(eng, u), 1, 'Anzeige stimmt nach Bonusverlust');
  eng._damage(u, 1, { tag: 'test' });
  assert.ok(eng._isDead(u), 'danach tödlich');
  console.log('ok t298 Auffangen: Bonus zählt, Verlust tötet nicht');
}

// 3) Verteilte Stellung (+2 DEF allein im Abschnitt) und Linienkrieg (seit t300: nur +1 bei drei eigenen im Abschnitt).
{
  const { eng } = boot(0);
  doctrines(eng, 0, ['dc_dok_verteilte_stellung']);
  const u = L.put(eng, 0, INF, 'R', 0); const p = Number(eng.defOf(u).def);
  settle(eng);
  assert.equal(u.def, p + 2, 'allein +2');
  eng._damage(u, p + 1, { tag: 'test' });
  assert.ok(!eng._isDead(u) && u.def === 1, 'überlebt gedruckte DEF + 1 Schaden');
  L.put(eng, 0, INF, 'R', 1); settle(eng);
  assert.equal(u.def, 1, 'zweite Einheit: Bonus weg, DEF bleibt mind. 1'); assert.equal(shown(eng, u), 1);

  const b = boot(0); doctrines(b.eng, 0, ['dc_dok_linienkrieg']);
  const a1 = L.put(b.eng, 0, INF, 'C', 0);
  settle(b.eng);
  assert.equal(a1.def, p, 'Linienkrieg: kein Grundbonus (t300)');
  const a2 = L.put(b.eng, 0, INF, 'C', 1); settle(b.eng);
  assert.equal(a1.def, p, 'zwei Einheiten: noch kein Bonus'); assert.equal(a2.def, p);
  const a3 = L.put(b.eng, 0, INF, 'C', 2); settle(b.eng);
  assert.equal(a1.def, p + 1, 'drei Einheiten +1'); assert.equal(a3.def, p + 1);
  b.eng._damage(a1, p, { tag: 'test' });
  assert.ok(!b.eng._isDead(a1), 'Linienkrieg-DEF hält im Kampf');
  console.log('ok t298 Verteilte Stellung und Linienkrieg zählen im Kampf');
}

// 4) Flankenschutz (FLANK_DEF): Anzeige = echte DEF (vorher doppelt), Bonus endet mit dem Nachbarn.
{
  const { eng } = boot(0);
  const u = L.put(eng, 0, INF, 'C', 0); const p = Number(eng.defOf(u).def);
  L.put(eng, 0, KOMMANDO, 'C', 1);
  settle(eng);
  assert.equal(u.def, p + 2, 'Flankenschutz +2 echt'); assert.equal(shown(eng, u), p + 2, 'nicht doppelt angezeigt');
  eng.player(0).front.C[1] = null; settle(eng);
  assert.equal(u.def, p, 'Nachbar weg: Bonus weg'); assert.equal(shown(eng, u), p);
  console.log('ok t298 Flankenschutz: einfach und echt');
}

// 5) Bot-Partien: nach jeder Aktion stimmt die Anzeige-DEF mit der echten DEF überein (alle Quellen).
{
  const w = L.loadGame({ quiet: true });
  // t300: Bot-Zufall je Partie gesät (vorher globales Math.random → Test nicht reproduzierbar).
  const mb = (x) => () => { x |= 0; x = (x + 0x6D2B79F5) | 0; let t = Math.imul(x ^ (x >>> 15), 1 | x); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const R = { f: mb(1) }; const BotMath = Object.create(Math); BotMath.random = () => R.f();
  vm.runInNewContext(fs.readFileSync(path.join(L.WEB, 'js/ai/bot.js'), 'utf8'), { window: w, console: { log() {}, warn() {} }, Math: BotMath, JSON, Object, Array, String, Number, Error });
  const Bot = w.DCBot, nations = Object.keys(w.DC_NATION_DECKS);
  let checks = 0, bad = 0, first = null;
  for (let g = 0; g < 24; g++) {
    R.f = mb(g * 7919 + 1);
    const a = nations[g % 16], b = nations[(g * 5 + 3) % 16], d0 = w.DC_NATION_DECKS[a], d1 = w.DC_NATION_DECKS[b];
    const eng = new w.DCEngine.Engine(w.DC_CATALOG, { seed: 29800 + g });
    eng.createMatch({ seed: 29800 + g, mode: 'bot', name0: a, name1: b, deck0: d0.cards.slice(), deck1: d1.cards.slice(), doctrine0: d0.doktrinen.slice(), doctrine1: d1.doktrinen.slice() });
    let steps = 0, stuck = 0; const fail = {};
    while (eng.state.winner == null && steps < 3000 && eng.state.turn <= 30) {
      const pend = eng.state.pending, pid = pend && typeof pend.player === 'number' ? pend.player : eng.state.active;
      let act; try { act = Bot.step(eng, pid, fail) || { type: 'END_TURN', player: pid }; } catch (e) { act = { type: 'END_TURN', player: pid }; }
      if (act.player == null) act.player = pid;
      const r = eng.dispatch(act);
      if (!r || !r.ok) { fail[Bot.actKey(act)] = 1; if (++stuck > 40) { eng.dispatch({ type: 'END_TURN', player: eng.state.active }); stuck = 0; } } else { stuck = 0; for (const k in fail) delete fail[k]; }
      steps++;
      eng.state.players.forEach((p) => eng.frontList(p).forEach((l) => {
        if (l.inst.def == null) return;
        checks++;
        if (shown(eng, l.inst) !== l.inst.def) { bad++; if (!first) first = eng.defOf(l.inst).name + ' ' + shown(eng, l.inst) + ' vs ' + l.inst.def + ' nach ' + act.type; }
        if (l.inst.def <= 0) { bad++; if (!first) first = 'Einheit mit DEF ' + l.inst.def + ' auf dem Feld: ' + eng.defOf(l.inst).name; }
      }));
    }
  }
  assert.ok(checks > 5000, 'genug Prüfungen: ' + checks);
  assert.equal(bad, 0, 'Anzeige-DEF ≠ echte DEF oder tote Einheit auf dem Feld: ' + first);
  console.log('ok t298 Invariante Anzeige = echte DEF in 24 Bot-Partien (' + checks + ' Prüfungen)');
}

// 5b) t300: Schaden aus Soforteinsätzen zerstört sofort (vorher blieb das Ziel mit 0 DEF auf dem Feld).
{
  const one = (cardId, target) => {
    const { eng } = boot(0);
    const u = L.put(eng, 1, INF, 'C', 0); u.def = 1;
    const c = eng.instFromId(cardId, 0); eng.player(0).hand.push(c); eng.player(0).ap = 9;
    const r = eng.dispatch({ type: 'PLAY', player: 0, uid: c.uid });
    assert.ok(r && r.ok, cardId + ' spielbar: ' + JSON.stringify(r));
    if (eng.state.pending && target) eng.dispatch({ type: 'RESOLVE_PENDING', player: 0, target: u.uid });
    return { eng, u };
  };
  let t = one('dc_np_ossaria_teurer_meter', true);
  assert.equal(t.eng.findInst(t.u.uid), null, 'DEAL_DAMAGE 1 auf DEF 1 zerstört sofort');
  t = one('dc_b_feuerwalze_172', false);
  assert.equal(t.eng.findInst(t.u.uid), null, 'MASS_DAMAGE 1 auf DEF 1 zerstört sofort');
  console.log('ok t300 Soforteinsatz-Schaden zerstört Einheiten mit 0 DEF sofort');
}

// 6) Überlast: Playtest Eintrag 53/54 – Lauernde Schützen mit DEF 1 fallen am eigenen Zugende (vorher blieb DEF 0).
{
  const { eng } = boot(0);
  const u = L.put(eng, 0, LAUERND, 'C', 2); L.put(eng, 1, INF, 'L', 0);
  settle(eng);
  assert.equal(u.def, Number(eng.defOf(u).def) + 1, 'Überlast +1 DEF');
  u.def = 1;
  const r = eng.dispatch({ type: 'END_TURN', player: 0 });
  assert.ok(r.ok, r.error);
  assert.ok(!onFront(eng, u), 'Lauernde Schützen zerstört');
  assert.ok(eng.player(0).grave.some((c) => c.uid === u.uid), 'auf dem Friedhof');
  console.log('ok t298 Überlast zerstört bei DEF 0');
}

// 7) Alle Karten mit Überlast: +2 ATK, +1 DEF, am eigenen Zugende 1 Schaden; bei DEF 1 zerstört, sonst −1.
{
  const w0 = L.loadGame({ quiet: true });
  const ids = w0.DC_CATALOG.cards.filter((c) => c.typ === 'Einheit' && JSON.stringify(c.keywords || c.schluesselwoerter || c.text || '').includes('Überlast')).map((c) => c.id);
  assert.equal(ids.length, 18, '18 Karten mit Überlast');
  ids.forEach((id) => {
    const { eng } = boot(0);
    const u = L.put(eng, 0, id, 'L', 0); L.put(eng, 1, INF, 'R', 0);
    settle(eng);
    const d = eng.defOf(u);
    assert.ok(eng._kwAtkBonus(u, eng.player(0)).why.some((x) => /Überlast: \+2/.test(x)), d.name + ': +2 ATK');
    assert.equal(u.flags.kwOver, 1, d.name + ': +1 DEF gebucht');
    const before = u.def, cm0 = Number(u.flags.cmDefBonus || 0);
    assert.ok(eng.dispatch({ type: 'END_TURN', player: 0 }).ok);
    // Kartentext „+1 DEF, solange beschädigt“ (Maßeinheit) darf den Schaden danach ausgleichen.
    if (before > 1) assert.equal(u.def, before - 1 + Number(u.flags.cmDefBonus || 0) - cm0, d.name + ': 1 Schaden am Zugende');
    const e2 = boot(0).eng;
    const v = L.put(e2, 0, id, 'L', 0); L.put(e2, 1, INF, 'R', 0); settle(e2); v.def = 1;
    assert.ok(e2.dispatch({ type: 'END_TURN', player: 0 }).ok);
    assert.ok(!onFront(e2, v), d.name + ': bei DEF 1 zerstört');
  });
  console.log('ok t298 alle 18 Überlast-Karten wie im Text');
}

// 8) Religiöser Eifer (Schaden am Zugende) und Zugbeginn-Kontrolle zerstören ebenfalls.
{
  const { eng } = boot(0);
  const u = L.put(eng, 0, INF, 'C', 0); L.put(eng, 1, INF, 'R', 0);
  u.flags.eiferUntil = eng.state.turn; u.def = 1;
  assert.ok(eng.dispatch({ type: 'END_TURN', player: 0 }).ok);
  assert.ok(!onFront(eng, u), 'Eifer-Schaden zerstört');
  const b = boot(0);
  const z = L.put(b.eng, 1, INF, 'C', 0); L.put(b.eng, 0, INF, 'R', 0);
  z.def = 0; // Einheit mit DEF 0 beim Gegner: fällt zu Beginn seines Zuges
  b.eng._dynDefClear(z);
  assert.ok(b.eng.dispatch({ type: 'END_TURN', player: 0 }).ok);
  assert.ok(!onFront(b.eng, z), 'Zugbeginn-Kontrolle räumt DEF 0');
  // _destroy mit einem frontList-Eintrag (ohne Spieler) bricht nicht mehr still ab
  const c = boot(0); const q = L.put(c.eng, 0, INF, 'L', 1);
  c.eng._destroy(c.eng.frontList(c.eng.player(0)).find((l) => l.inst.uid === q.uid));
  assert.ok(!onFront(c.eng, q), '_destroy schlägt den Fundort nach');
  console.log('ok t298 Eifer, Zugbeginn-Kontrolle und _destroy mit frontList-Eintrag');
}

// 9) Kampftext: „erhält N“ nur bei echtem Gegenschlag (Playtest Einträge 12 und 16).
{
  const { eng } = boot(0);
  const a = L.put(eng, 0, INF, 'C', 0); const t = L.put(eng, 1, INF, 'C', 0);
  t.def = 1; settle(eng);
  const r = eng.dispatch({ type: 'ATTACK', player: 0, uid: a.uid, target: t.uid });
  assert.ok(r.ok, r.error);
  assert.ok(!onFront(eng, t), 'Ziel fällt');
  const txt = lastEvents(eng, 8).find((x) => /richtet \d+ Schaden an/.test(x));
  assert.ok(txt && !/erhält/.test(txt), 'kein Gegenschaden im Text, wenn das Ziel fällt: ' + txt);
  assert.equal(a.def, a.defMax, 'Angreifer unverletzt');
  const b = boot(0);
  const a2 = L.put(b.eng, 0, INF, 'C', 0); const t2 = L.put(b.eng, 1, KOMMANDO, 'C', 0); settle(b.eng);
  assert.ok(b.eng.dispatch({ type: 'ATTACK', player: 0, uid: a2.uid, target: t2.uid }).ok);
  const txt2 = lastEvents(b.eng, 8).find((x) => /richtet \d+ Schaden an/.test(x));
  const got = (Number(b.eng.defOf(a2).def) || 0) - (onFront(b.eng, a2) ? a2.def : 0);
  assert.ok(/erhält \d+/.test(txt2), 'Gegenschlag steht im Text: ' + txt2);
  assert.ok(got > 0, 'Angreifer hat Schaden genommen');
  console.log('ok t298 Kampftext meldet nur echten Gegenschlag');
}
