/**
 * t300: Balance-Grobkorrektur p2 (Version 0.624) und Balance-Gate.
 *
 * 1) Doktrin-Parameter wie gemessen (p2 aus `docs/balance/BALANCE_T298.md`), Kartentext = Wirkung:
 *    Linienkrieg nur +1 DEF bei drei eigenen im Abschnitt, Auffangen ohne Grundbonus, Gepanzerter Fuß nur
 *    ausgerüstet +1 ATK/+1 DEF, Entsatz hält nur +1 ATK (Einrücken weiter +1 ATK/+1 DEF).
 * 2) Bewertungslogik des Balance-Gates (`scripts/balance/balance_gate.js`): Band, Toleranz, Ausnahmeliste.
 * 3) Ausnahmeliste und Vergleichsstand sind gültig (Pflichtfelder, bekannte IDs).
 * Läuft über `npm test` von der Repo-Wurzel; misst selbst nicht (dafür `npm run balance-gate`).
 */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const L = require('../scripts/nation_pools/load_game.js');
const G = require('../scripts/balance/balance_gate.js');

const w = L.loadGame({ quiet: true });
const byId = Object.fromEntries(w.DC_CATALOG.cards.map((c) => [c.id, c]));
/** @param {string} id @param {string} code @returns {object} Parameter des Effekts */
const param = (id, code) => (byId[id].effects.find((e) => e.code === code) || {}).param;

// 1a) Parameter und Texte
{
  assert.deepEqual([param('dc_dok_linienkrieg', 'LINIENKRIEG').base_def, param('dc_dok_linienkrieg', 'LINIENKRIEG').count, param('dc_dok_linienkrieg', 'LINIENKRIEG').def], [0, 3, 1]);
  assert.equal(param('dc_dok_auffangen', 'AUFFANGEN').base_def, 0);
  const gf = param('dc_dok_gepanzerter_fuss', 'GEPANZERTER_FUSS'); assert.deepEqual([gf.base_def, gf.def, gf.atk], [0, 1, 1]);
  const en = param('dc_dok_entsatz', 'ENTSATZ'); assert.deepEqual([en.held_def, en.held_atk, en.on_enter.atk, en.on_enter.def], [0, 1, 1, 1]);
  for (const id of ['dc_dok_linienkrieg', 'dc_dok_auffangen', 'dc_dok_gepanzerter_fuss']) assert.ok(!/^Eigene Einheiten haben \+1 DEF/.test(byId[id].text), id + ': kein pauschaler Grundbonus im Text');
  assert.match(byId.dc_dok_linienkrieg.text, /drei eigenen Einheiten/);
  assert.match(byId.dc_dok_gepanzerter_fuss.text, /Ausgerüstete eigene Einheiten haben \+1 ATK und \+1 DEF/);
  assert.match(byId.dc_dok_entsatz.text, /haben \+1 ATK\. Wer dort einrückt, hat bis Zugende zusätzlich \+1 ATK und \+1 DEF/);
  const kurz = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'scripts/cards-review/kurz.json'), 'utf8'));
  assert.match(kurz.dc_dok_linienkrieg.kurz, /3 eigenen/); assert.match(kurz.dc_dok_gepanzerter_fuss.kurz, /\+1 ATK und \+1 DEF/);
  console.log('ok t300 p2-Parameter und Texte stimmen überein');
}

/**
 * Leeres Brett, Spieler 0 am Zug.
 * @returns {object} Engine
 */
function boot() {
  const eng = L.newMatch(w, 'Eldran', 7); L.clearBoard(eng);
  eng.state.players.forEach((p) => { p.hand = []; p.deck = []; p.grave = []; p.ap = 5; p.flags = {}; p.doctrines = []; });
  eng.state.pending = null; eng.state.turn = 10; eng.state.active = 0; eng.state.phase = 'main';
  return eng;
}
/** @param {object} eng @param {object} u @returns {{atk:number, def:number}} Anzeige nach Abgleich */
const stats = (eng, u) => { eng._dynDefSync(); return eng.currentAtkDef(u); };

// 1b) Gepanzerter Fuß: ohne Ausrüstung nichts, mit Ausrüstung +1 ATK/+1 DEF gegenüber ohne Doktrin
{
  const eng = boot(); const u = L.put(eng, 0, 'dc_eh_freiwilligenzug', 'C', 0);
  const plain = stats(eng, u);
  eng.player(0).doctrines = [eng.instFromId('dc_dok_gepanzerter_fuss', 0)];
  assert.deepEqual(stats(eng, u), plain, 'ohne Ausrüstung kein Bonus');
  eng.player(0).doctrines = [];
  u.attachments = [eng.instFromId('dc_au_sturmleitern', 0)];
  const eq = stats(eng, u);
  eng.player(0).doctrines = [eng.instFromId('dc_dok_gepanzerter_fuss', 0)];
  const eqD = stats(eng, u);
  assert.equal(eqD.atk - eq.atk, 1); assert.equal(eqD.def - eq.def, 1);
  assert.equal(u.def, eqD.def, 'Bonus ist echte DEF');
  console.log('ok t300 Gepanzerter Fuß: nur ausgerüstet +1/+1');
}

// 1c) Entsatz: gehaltener angegriffener Abschnitt +1 ATK, keine DEF
{
  const eng = boot(); const u = L.put(eng, 0, 'dc_eh_freiwilligenzug', 'L', 0);
  eng.player(0).doctrines = [eng.instFromId('dc_dok_entsatz', 0)];
  const a = stats(eng, u);
  eng.player(0).flags.dokAttackedSections = { L: 9 };
  const b = stats(eng, u);
  assert.equal(b.atk - a.atk, 1); assert.equal(b.def, a.def, 'gehalten: keine DEF mehr (t300)');
  u.flags.dokEntsatzUntil = eng.state.turn;
  const c = stats(eng, u);
  assert.equal(c.atk - a.atk, 2); assert.equal(c.def - a.def, 1, 'eingerückt: zusätzlich +1 ATK/+1 DEF');
  console.log('ok t300 Entsatz: gehalten +1 ATK, eingerückt zusätzlich +1/+1');
}

// 2) Gate-Bewertung
{
  const allow = [{ kind: 'nation', id: 'X', reason: 'r', target: 't', min: 0.55, max: 0.66 }];
  const J = (rate, k, id) => G.judge({ kind: 'nation', id: id || 'Y', mode: 'mixed', rate, games: 1260 }, allow, k).status;
  assert.equal(J(0.50, 0), 'ok'); assert.equal(J(0.57, 0), 'watch'); assert.equal(J(0.43, 0), 'watch');
  assert.equal(J(0.605, 0), 'fail'); assert.equal(J(0.395, 0), 'fail');
  assert.equal(J(0.62, 0, 'X'), 'warn', 'Ausnahme → Warnung'); assert.equal(J(0.68, 0, 'X'), 'fail', 'Ausnahme verlassen → Fehler');
  assert.equal(J(0.62, 2), 'watch', 'quick: 2 SE Toleranz'); assert.equal(J(0.66, 2), 'fail');
  assert.ok(Math.abs(G.se(0.5, 1260) - 0.0141) < 0.0005, 'SE bei 1.260 Partien ≈ 1,4 Punkte');
  console.log('ok t300 Balance-Gate: Band, Toleranz, Ausnahmen');
}

// 3) Ausnahmeliste und Vergleichsstände
{
  const A = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'scripts/balance/balance_allowlist.json'), 'utf8'));
  const nations = Object.keys(w.DC_NATION_DECKS);
  for (const e of A.entries) {
    for (const k of ['kind', 'id', 'reason', 'target', 'since']) assert.ok(e[k], 'Ausnahme braucht ' + k + ': ' + JSON.stringify(e));
    assert.ok(e.min != null || e.max != null, 'Ausnahme braucht min/max: ' + e.id);
    assert.ok(e.kind === 'nation' ? nations.includes(e.id) : (byId[e.id] && byId[e.id].typ === 'Doktrin'), 'unbekannte ID ' + e.id);
  }
  for (const m of ['full', 'quick']) {
    const B = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'scripts/balance/baseline/balance_gate_' + m + '.json'), 'utf8'));
    assert.equal(Object.keys(B.nations.starter).length, nations.length); assert.equal(Object.keys(B.doctrines).length, w.DC_CATALOG.cards.filter((c) => c.typ === 'Doktrin').length);
    assert.ok(B.label && B.mode === m);
  }
  console.log('ok t300 Ausnahmeliste und Vergleichsstände gültig');
}
