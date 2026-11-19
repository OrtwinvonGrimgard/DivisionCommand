/**
 * t301: Etappensicherung heilt statt +1 DEF (RULES §8.3, BALANCE_T301).
 * Zu Beginn des eigenen Zuges heilt die beschädigte eigene Einheit mit dem größten Fehlbetrag, die im letzten Zug
 * nicht angegriffen hat, um 1 (Gleichstand: erste von links). Kein DEF-Bonus mehr, kein versteckter Abschnittsbonus.
 * Szenarien direkt auf der Engine wie in test_doctrine_def_t298.js. Läuft über `npm test` von der Repo-Wurzel.
 */
'use strict';
const assert = require('node:assert/strict');
const L = require('../scripts/nation_pools/load_game.js');

const ETAPPE = 'dc_dok_etappensicherung';
const INF = 'dc_eh_freiwilligenzug'; // 2/2 Infanterie
const PANZER = 'dc_eh_donner'; // 4/4 Panzer

/**
 * Frische Partie mit leerem Brett, Spieler 0 hat Etappensicherung.
 * @returns {object} Engine
 */
function boot() {
  const w = L.loadGame({ quiet: true });
  const eng = L.newMatch(w, 'Caldris', 21);
  L.clearBoard(eng);
  eng.state.players.forEach((p) => { p.hand = []; p.deck = []; p.grave = []; p.ap = 5; p.flags = p.flags || {}; p.doctrines = []; });
  eng.state.pending = null; eng.state.turn = 10; eng.state.active = 0; eng.state.phase = 'main';
  eng.player(0).doctrines = [eng.instFromId(ETAPPE, 0)];
  return eng;
}
/**
 * Einheit setzen, Schaden geben und „ruhend“ markieren (wie am Ende des eigenen Zuges gesetzt).
 * @param {object} eng @param {string} id @param {string} sec @param {number} row @param {number} dmg @param {boolean} rested
 * @returns {object} Instanz
 */
function unit(eng, id, sec, row, dmg, rested) {
  const u = L.put(eng, 0, id, sec, row);
  eng._dynDefSync();
  u.def = (u.defMax != null ? u.defMax : u.def) - dmg;
  u.flags.dokRested = rested;
  return u;
}
const missing = (u) => u.defMax - u.def;

// 1) Kein DEF-Bonus mehr (bis 0.624: +1 DEF für alle, dazu +1 im dichtesten Abschnitt im eigenen Zug).
{
  const eng = boot();
  const a = L.put(eng, 0, INF, 'C', 0), b = L.put(eng, 0, INF, 'C', 1);
  eng._dokTurnStart(eng.player(0));
  eng._dynDefSync();
  assert.equal(eng.currentAtkDef(a).def, 2, 'gedruckte DEF 2, kein Doktrin-Bonus');
  assert.equal(eng.currentAtkDef(b).def, 2, 'kein versteckter Abschnittsbonus');
  assert.equal(a.def, 2);
}

// 2) Geheilt wird die ruhende Einheit mit dem größten Fehlbetrag; wer angegriffen hat, nicht.
{
  const eng = boot();
  const a = unit(eng, PANZER, 'L', 0, 1, true);
  const b = unit(eng, PANZER, 'C', 0, 2, true);
  const c = unit(eng, PANZER, 'R', 0, 3, false); // hat angegriffen
  eng._dokTurnStart(eng.player(0));
  assert.deepEqual([missing(a), missing(b), missing(c)], [1, 1, 3], 'B heilt 1, A und C unverändert');
  assert.ok((eng.log || []).some((e) => /Etappensicherung heilt Mittlerer Panzer Donnerkeil/.test(e.msg || '')), 'Protokoll nennt die Einheit');
}

// 3) Gleichstand: erste von links (L vor C vor R).
{
  const eng = boot();
  const r = unit(eng, PANZER, 'R', 0, 2, true);
  const l = unit(eng, PANZER, 'L', 2, 2, true);
  eng._dokTurnStart(eng.player(0));
  assert.deepEqual([missing(l), missing(r)], [1, 2], 'links zuerst');
}

// 4) Erster eigener Zug (noch kein „letzter Zug“, kein Ruhe-Merker): niemand wird geheilt. Nie über die Höchst-DEF.
{
  const eng = boot();
  const u = L.put(eng, 0, PANZER, 'C', 0); eng._dynDefSync(); u.def = u.defMax - 1;
  eng._dokTurnStart(eng.player(0));
  assert.equal(missing(u), 1, 'ohne Ruhe-Merker keine Heilung');
  u.flags.dokRested = true;
  eng._dokTurnStart(eng.player(0)); eng._dokTurnStart(eng.player(0));
  assert.equal(missing(u), 0, 'voll geheilt, nicht darüber');
}

// 5) Im echten Ablauf: Gegner beendet seinen Zug → Zugbeginn von Spieler 0 heilt die ruhende Einheit.
{
  const eng = boot();
  const u = unit(eng, PANZER, 'C', 1, 2, true);
  L.put(eng, 1, INF, 'L', 0);
  eng.state.active = 1;
  const r = eng.dispatch({ type: 'END_TURN', player: 1 });
  assert.ok(r && r.ok, 'END_TURN');
  assert.equal(eng.state.active, 0);
  assert.equal(missing(u), 1, 'Zugbeginn heilt 1');
}

console.log('test_doctrine_etappen_t301: ok');
