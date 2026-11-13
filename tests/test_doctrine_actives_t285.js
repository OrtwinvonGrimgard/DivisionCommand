/**
 * t285: Aktive Doktrin-Fähigkeiten und Stellungswechsel. Die Engine listet sie in `listActions`, setzt die
 * Regeln durch (1× pro Zug, Ziele, Kosten), und der Test-Bot setzt sie in passenden Lagen ein.
 * Szenarien direkt auf der Engine wie in test_bot_t254.js. Läuft über `npm test` von der Repo-Wurzel.
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const L = require('../scripts/nation_pools/load_game.js');

const INF = 'dc_eh_freiwilligenzug'; // 1 AP, 2/2 Infanterie
const PANZER = 'dc_eh_donner'; // 3 AP, 4/4 Panzer (gepanzert)
const ART = 'dc_su_artillerie'; // Feuerauftrag 2 AP, 3 Schaden
const FESTUNG = 'dc_su_festung'; // Befestigung (Unterstützung)
const MOVER = 'dc_b_wartebach_wache_46'; // Infanterie 2/4 mit Stellungswechsel
const NACHSCHUB = 'dc_dok_sicherer_nachschub';
const BOLLWERK = 'dc_dok_bollwerk';

/**
 * Frische Partie mit leerem Brett, Spieler 0 am Zug, Bot geladen.
 * @returns {{eng: object, Bot: object}}
 */
function boot() {
  const w = L.loadGame({ quiet: true });
  vm.runInNewContext(fs.readFileSync(path.join(L.WEB, 'js/ai/bot.js'), 'utf8'), { window: w, console: { log() {}, warn() {} }, Math, JSON, Object, Array, String, Number, Error });
  const eng = L.newMatch(w, 'Steinmark', 21);
  L.clearBoard(eng);
  eng.state.players.forEach((p) => { p.hand = []; p.deck = []; p.grave = []; p.ap = 5; p.flags = p.flags || {}; p.doctrines = []; });
  eng.state.pending = null; eng.state.turn = 6; eng.state.active = 0; eng.state.phase = 'main';
  return { eng, Bot: w.DCBot };
}
/**
 * Doktrin für Spieler `pid` setzen.
 * @param {object} eng @param {number} pid @param {string} id
 */
function doctrine(eng, pid, id) { eng.player(pid).doctrines = [eng.instFromId(id, pid)]; }
/**
 * Karte in die Unterstützung (nicht frisch).
 * @param {object} eng @param {number} pid @param {string} id @returns {object}
 */
function support(eng, pid, id) {
  const inst = eng.instFromId(id, pid); inst.summonedTurn = -9; inst.playedTurn = -9; inst.flags = inst.flags || {};
  const p = eng.player(pid); const i = p.support.findIndex((x) => !x); if (i < 0) p.support.push(inst); else p.support[i] = inst;
  return inst;
}
/**
 * Bot-Schritt, der von dispatch angenommen werden muss.
 * @param {object} eng @param {object} Bot @param {number} pid @returns {object}
 */
function stepOk(eng, Bot, pid) {
  const a = Bot.step(eng, pid, {});
  const r = eng.dispatch(a);
  assert.ok(r && r.ok, 'Bot-Aktion legal: ' + JSON.stringify(a) + ' → ' + (r && r.error));
  return a;
}
/** @param {object} eng @param {string} type @returns {object[]} */
const listed = (eng, type) => eng.listActions(0).filter((a) => a.type === type);

// 1) Feldreparatur: nur beschädigte gepanzerte eigene Einheit, heilt 1, 1× pro Zug; Bot nutzt sie zuerst.
{
  const { eng, Bot } = boot();
  doctrine(eng, 0, NACHSCHUB);
  const pz = L.put(eng, 0, PANZER, 'C', 0); pz.def = 2;
  const inf = L.put(eng, 0, INF, 'L', 0); inf.def = 1;
  L.put(eng, 1, INF, 'R', 0);
  assert.equal(listed(eng, 'HEAL_ARMORED').map((a) => a.uid).join(','), pz.uid, 'nur der beschädigte Panzer ist Ziel');
  assert.equal(eng.dispatch({ type: 'HEAL_ARMORED', player: 0, uid: inf.uid }).code, 'HEAL_NONE', 'Infanterie ist kein Ziel');
  const a = stepOk(eng, Bot, 0);
  assert.equal(a.type, 'HEAL_ARMORED'); assert.equal(pz.def, 3, 'heilt 1'); assert.equal(eng.player(0).ap, 5, 'kostenlos');
  assert.equal(listed(eng, 'HEAL_ARMORED').length, 0, 'danach nicht mehr gelistet');
  assert.equal(eng.dispatch({ type: 'HEAL_ARMORED', player: 0, uid: pz.uid }).code, 'HEAL_USED', '1× pro Zug');
  console.log('ok t285 Feldreparatur: Regeln und Bot-Nutzung');
}
{
  const { eng } = boot();
  const pz = L.put(eng, 0, PANZER, 'C', 0); pz.def = 2;
  assert.equal(listed(eng, 'HEAL_ARMORED').length, 0, 'ohne Doktrin keine Feldreparatur');
  assert.equal(eng.dispatch({ type: 'HEAL_ARMORED', player: 0, uid: pz.uid }).ok, false);
}

// 2) Schutzwall: Befestigung aus dem Ablagestapel für 2 AP; Bot nutzt übrige AP dafür, 1× pro Zug.
{
  const { eng, Bot } = boot();
  doctrine(eng, 0, BOLLWERK);
  const f = eng.instFromId(FESTUNG, 0); eng.player(0).grave.push(f);
  eng.player(0).ap = 2;
  assert.equal(listed(eng, 'SCHUTZWALL').length, 1);
  const a = stepOk(eng, Bot, 0);
  assert.equal(a.type, 'SCHUTZWALL');
  assert.ok(eng.player(0).hand.some((c) => c.uid === f.uid), 'Festung auf der Hand'); assert.equal(eng.player(0).ap, 0);
  assert.equal(listed(eng, 'SCHUTZWALL').length, 0);
  console.log('ok t285 Schutzwall: Bot holt Befestigung mit übrigen AP');
}
{
  const { eng } = boot();
  doctrine(eng, 0, BOLLWERK);
  eng.player(0).ap = 5;
  assert.equal(listed(eng, 'SCHUTZWALL').length, 0, 'leerer Ablagestapel: nicht gelistet');
  assert.equal(eng.dispatch({ type: 'SCHUTZWALL', player: 0 }).code, 'SCHUTZWALL_EMPTY');
}

// 3) Überschuss: Unterstützung, die ihre Fähigkeit schon eingesetzt hat, wird für 2 AP wieder bereit.
{
  const { eng, Bot } = boot();
  doctrine(eng, 0, NACHSCHUB);
  const art = support(eng, 0, ART);
  const foe = L.put(eng, 1, INF, 'C', 0);
  assert.equal(listed(eng, 'UEBERSCHUSS').length, 0, 'bereite Unterstützung ist kein Ziel');
  art.flags.exhausted = true;
  eng.player(0).ap = 4;
  assert.equal(listed(eng, 'UEBERSCHUSS').map((a) => a.uid).join(','), art.uid);
  const a = stepOk(eng, Bot, 0);
  assert.equal(a.type, 'UEBERSCHUSS', 'Bot nutzt Überschuss für einen zweiten Feuerauftrag');
  assert.equal(art.flags.exhausted, false); assert.equal(eng.player(0).ap, 2);
  let n = 0;
  while (eng.frontList(eng.player(1)).some((l) => l.inst.uid === foe.uid) && n++ < 6) stepOk(eng, Bot, 0);
  assert.ok(!eng.frontList(eng.player(1)).some((l) => l.inst.uid === foe.uid), 'zweiter Feuerauftrag vernichtet das Ziel');
  art.flags.exhausted = true; eng.player(0).ap = 5;
  assert.equal(eng.dispatch({ type: 'UEBERSCHUSS', player: 0, uid: art.uid }).code, 'UEBER_USED', '1× pro Zug');
  console.log('ok t285 Überschuss: Regeln und Bot-Nutzung');
}
{
  const { eng, Bot } = boot();
  doctrine(eng, 0, NACHSCHUB);
  const art = support(eng, 0, ART); art.flags.exhausted = true;
  L.put(eng, 1, INF, 'C', 0);
  eng.player(0).ap = 3; // 2 AP Überschuss + 2 AP Feuerauftrag passen nicht
  const a = Bot.step(eng, 0, {});
  assert.notEqual(a.type, 'UEBERSCHUSS', 'kein Überschuss, wenn die zweite Fähigkeit nicht bezahlbar ist');
}

// 4) Stellungswechsel (Bot-Schalter kwMove, Standard 0): leeren Abschnitt besetzen, wenn die Einheit schon angegriffen
//    hat; nie eine Lücke vor dem Feind öffnen. Im Standard bleibt der Bot beim bisherigen Verhalten.
{
  const { eng, Bot } = boot();
  assert.equal(Number(Bot.cfg.kwMove), 0, 'Standard: Stellungswechsel aus');
  const mv = L.put(eng, 0, MOVER, 'L', 0); mv.attackUsed = true;
  L.put(eng, 0, INF, 'L', 1); L.put(eng, 1, INF, 'L', 0); L.put(eng, 1, INF, 'R', 0);
  eng.player(0).ap = 0;
  assert.notEqual(Bot.step(eng, 0, {}).type, 'KW_MOVE', 'Standard: kein Stellungswechsel');
}
{
  const { eng, Bot } = boot();
  Bot.applyCfg({ kwMove: 2 });
  const mv = L.put(eng, 0, MOVER, 'L', 0); mv.attackUsed = true;
  L.put(eng, 0, INF, 'L', 1);
  L.put(eng, 1, INF, 'L', 0); L.put(eng, 1, INF, 'R', 0);
  eng.player(0).ap = 0;
  assert.ok(listed(eng, 'KW_MOVE').some((a) => a.uid === mv.uid && a.slot.section === 'C'), 'Stellungswechsel gelistet');
  const a = stepOk(eng, Bot, 0);
  assert.equal(a.type, 'KW_MOVE'); assert.equal(a.slot.section, 'C');
  assert.equal(eng.player(0).front.C[0] && eng.player(0).front.C[0].uid, mv.uid);
  console.log('ok t285 Stellungswechsel: Bot besetzt leeren Abschnitt');
}
{
  const { eng, Bot } = boot();
  Bot.applyCfg({ kwMove: 2 });
  const mv = L.put(eng, 0, MOVER, 'L', 0); mv.attackUsed = true;
  L.put(eng, 1, INF, 'L', 0);
  eng.player(0).ap = 0;
  const a = Bot.step(eng, 0, {});
  assert.notEqual(a.type, 'KW_MOVE', 'letzte Einheit verlässt den umkämpften Abschnitt nicht');
  console.log('ok t285 Stellungswechsel: keine Lücke vor dem Feind');
}
console.log('PASS doctrine actives t285');
