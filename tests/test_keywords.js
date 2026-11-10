#!/usr/bin/env node
/**
 * Die 16 allgemeinen Schlüsselwörter: Daten, Darstellung, Engine-Wirkung.
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
'use strict';
/* Die 16 allgemeinen Schlüsselwörter: Daten (alle spielbaren Karten), Darstellung und Engine-Wirkung je Wort
   inkl. Limits, Eingraben und keine Preisgabe verdeckter Informationen (Platztausch/Hinterhalt). */
const assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const L = require('../scripts/nation_pools/load_game.js');
const WORDS = require('../scripts/keywords/assign_lib.js').WORDS;
const base = { set: 'test', status: 'live', rarity: 'bronze', typ: 'Einheit', ap: 2, atk: 2, def: 5, tags: ['einheit', 'infanterie'], klasse: 'Infanterie', text: '', effects: [] };
/**
 * Baut eine minimale Testkarte oder -instanz.
 */
const mk = (id, o) => Object.assign({ id, name: id }, base, o);
const TEST = [mk('t_inf'), mk('t_cheap', { ap: 1 }), mk('t_wall', { atk: 0, def: 30 }), mk('t_sup', { typ: 'Unterstützung', ap: 1, tags: ['unterstuetzung'], effects: [{ code: 'REDUCE_DAMAGE', param: { n: 1 } }] }),
  mk('t_hide', { effects: [{ code: 'RELOCATE_HIDE' }] })];
WORDS.forEach((k, i) => TEST.push(mk('k_' + i, { name: 'KW ' + k, keywords: [k], effects: ['Hinterhalt', 'Platztausch'].includes(k) ? [{ code: 'RELOCATE_HIDE' }] : [] })));
const w = L.loadGame({ quiet: true, inject: (win) => { win.DC_SET_TYPES.__KwTest = TEST; } });
const C = w.DC_CATALOG.cards, K = w.DC_KEYWORDS;
/**
 * Schlüsselwort-ID bzw. -lookup für den Test.
 */
const kid = (k) => 'k_' + WORDS.indexOf(k);

// ---------- 1) Vokabular & Daten
WORDS.forEach(k=>assert(K[k], 'ursprüngliches Wort bleibt kompatibel: '+k));
assert.equal(Object.keys(K).length,23,'16 ursprüngliche +2 vereinheitlichte Kerne +5 taktische Wörter (Indirektes Feuer → Steilfeuer-Tags)');
assert.equal(K['Gefechtsbereit'], 'Kann im Zug des Einsatzes angreifen. Sie erhält keinen Eingraben-Schutz und keinen Eingraben-Bonus.');
assert.equal(K['Fernschuss'], 'Hat +1 Reichweite (bei Steilfeuer nur Stufen I–III; IV/V bereits ganze Front).');
const real = C.filter((c) => c.set !== 'test');
const count = {}, byNat = {};
real.forEach((c) => {
  const ks = c.keywords || [];
  if (!ks.length) return;
  const old=ks.filter(k=>WORDS.includes(k));
  if (old.length) assert.equal(c.typ,'Einheit',c.id+' ursprüngliche Wörter nur auf Einheiten');
  assert(old.length <= 2,c.id+' höchstens 2 ursprüngliche Wörter');
  assert.equal(new Set(ks).size, ks.length, c.id + ' doppelt');
  ks.forEach((k) => { assert(K[k], c.id + ' unbekannt ' + k); count[k] = (count[k] || 0) + 1; (byNat[k] = byNat[k] || {})[c.nation || 'neutral'] = (byNat[k][c.nation || 'neutral'] || 0) + 1; });
  if (ks.includes('Hinterhalt') || ks.includes('Platztausch')) assert((c.effects || []).some((e) => ['RELOCATE_HIDE', 'GUERRILLA_HIDE', 'SET_FACEDOWN'].includes(e.code)), c.id + ' kann verdeckt werden');
  if (c.set !== 'set_tactical_review') assert(!/\b(Gefechtsbereit|Staffelangriff|Fernschuss|Durchschlag|Platztausch|Überlast|Abschirmung|Erbitterung|Heranführung|Zuteilung|Sicherung|Nachsetzen|Zähigkeit)\b/.test(c.text || ''), c.id + ' kein paralleler Sondertext: ' + c.text);
});
WORDS.forEach((k) => {
  const nats = Object.keys(byNat[k] || {});
  assert(count[k] >= 8, k + ' zu selten: ' + count[k]);
  assert(nats.length >= 5, k + ' nur in ' + nats.length + ' Nationen');
  const max = Math.max(...Object.values(byNat[k]));
  assert(max / count[k] < 0.5, k + ' wird von einer Nation monopolisiert');
});
const units = real.filter((c) => c.typ === 'Einheit').length, withKw = real.filter((c) => c.typ === 'Einheit' && (c.keywords || []).length).length;
assert(withKw < units, 'nicht jede Karte braucht ein Wort');
// Starterdecks unverändert und legal (60+2)
Object.entries(w.DC_NATION_DECKS).forEach(([n, d]) => { assert.equal(d.cards.length, 60, n); assert.equal(d.doktrinen.length, 2, n); assert(w.DC_validateDeck(d.cards, d.doktrinen).ok, n + ' legal'); });

// ---------- 2) Darstellung (fett + vollständiger Erinnerungstext; UI-Einbindung)
const vm = require('vm'); const g = {}; vm.runInNewContext(fs.readFileSync(path.join(L.WEB, 'js/data/keywords.js'), 'utf8'), { window: g });
const h = g.DCKw.html({ keywords: ['Sicherung', 'Durchschlag'] });
assert(h.includes('<b class="kw-word">Sicherung</b>') && h.includes('(' + K['Sicherung'] + ')') && h.includes('(' + K['Durchschlag'] + ')'));
assert.equal(g.DCKw.html({}), '');
const app = fs.readFileSync(path.join(L.WEB, 'js/ui/app.js'), 'utf8'), lib = fs.readFileSync(path.join(L.WEB, 'js/ui/library.js'), 'utf8'), html = fs.readFileSync(path.join(L.WEB, 'index.html'), 'utf8');
assert(/!facedown && window\.DCKw \? DCKw\.html\(def/.test(app), 'Detailansicht zeigt Wörter nur offen');
assert(/DCKw\.html\(c\)/.test(lib), 'Deckbuilder-Großansicht');
assert(html.indexOf('js/data/keywords.js') > 0 && html.indexOf('js/data/keywords.js') < html.indexOf('js/ui/app.js'));
const tca = fs.readFileSync(path.join(L.WEB, 'js/ui/table-card-art.js'), 'utf8');
assert(/if \(hidden\) return '<div class="table-motif table-hidden"/.test(tca) && tca.indexOf('if (hidden)') < tca.indexOf('DCKw'), 'verdeckte Tischkarte ohne Wortleiste');

// ---------- 3) Engine je Wort
function fresh() { const e = L.newMatch(w, 'Steinmark', 5); L.clearBoard(e); e.state.active = 0; e.state.phase = 'main'; e.player(0).ap = 30; e.player(1).ap = 30; e.player(0).hand = []; return e; }
/**
 * Spielt eine Karte aus der Hand im Test.
 */
function play(e, id, section, row, pid) {
  pid = pid || 0; const p = e.player(pid), inst = e.instFromId(id, pid); p.hand.push(inst); const ap = p.ap;
  const r = e.dispatch({ type: 'PLAY', player: pid, uid: inst.uid, slot: { section, row } }); assert(r.ok, id + ' ' + r.error);
  return { inst, spent: ap - p.ap };
}
/**
 * Legt eine Einheit aus dem Katalog auf eine Stellung.
 */
const put = (e, pid, id, s, r) => L.put(e, pid, id, s, r);
/**
 * Führt einen Testangriff zwischen zwei Stellungen aus.
 */
const atk = (e, a, t) => { a.attackUsed = false; a.flags.exhausted = false; const r = e.dispatch({ type: 'ATTACK', player: a.owner, uid: a.uid, target: t.uid }); return r; };
/**
 * Führt den nächsten Engine-Schritt bzw. Zugtakt im Test aus.
 */
const tick = (e) => e.dispatch({ type: 'NOOP', player: 0 }); // löst die Neuberechnung aus (unbekannte Aktion, ändert nichts)

{ // Gefechtsbereit
  const e = fresh(); const { inst } = play(e, kid('Gefechtsbereit'), 'C', 0); const { inst: plain } = play(e, 't_inf', 'L', 0);
  assert.equal(inst.def, 5, 'kein Eingraben-Bonus'); assert(!e._isDeployProtected(inst), 'kein Eingraben-Schutz');
  assert.equal(plain.def, 6); assert(e._isDeployProtected(plain));
  put(e, 1, 't_wall', 'C', 0);
  assert(e.listActions(0).some((a) => a.type === 'ATTACK' && a.uid === inst.uid), 'greift im Einsatzzug an');
  assert(!e.listActions(0).some((a) => a.type === 'ATTACK' && a.uid === plain.uid), 'normale Einheit nicht');
}
{ // Ablösung
  const e = fresh(); const p = e.player(0); const a = put(e, 0, kid('Ablösung'), 'C', 1);
  e._destroy(e.findInst(a.uid)); assert(p.flags.kwRelief.C1, 'Markierung');
  assert.equal(play(e, 't_inf', 'C', 1).spent, 1, 'Feld kostet 1 weniger');
  assert(!p.flags.kwRelief.C1, 'Markierung verbraucht');
  const b = put(e, 0, kid('Ablösung'), 'L', 1); e._destroy(e.findInst(b.uid));
  assert.equal(play(e, 't_inf', 'R', 1).spent, 2, 'anderes Feld ohne Rabatt');
  assert.equal(play(e, 't_cheap', 'L', 1).spent, 1, 'mindestens 1');
  const c = put(e, 0, kid('Ablösung'), 'L', 2); e._destroy(e.findInst(c.uid));
  e.state.turn += 3; tick(e); assert(!p.flags.kwRelief.L2, 'verfällt nach dem Ende deines nächsten Zugs');
}
{ // Staffelangriff
  const e = fresh(); const s = put(e, 0, kid('Staffelangriff'), 'C', 0), o = put(e, 0, 't_inf', 'L', 0); put(e, 1, 't_wall', 'C', 0); const t = put(e, 1, 't_wall', 'L', 0);
  assert.equal(e.currentAtkDef(s).atk, 2); assert(atk(e, o, t).ok); assert.equal(e.currentAtkDef(s).atk, 3, '+1 nach anderem Angriff');
  e.state.active = 1; assert.equal(e.currentAtkDef(s).atk, 2, 'nicht im gegnerischen Zug');
}
{ // Fernschuss
  const e = fresh(); const f = put(e, 0, kid('Fernschuss'), 'C', 0), n = put(e, 0, 't_inf', 'C', 1); const far = put(e, 1, 't_wall', 'C', 2);
  const legal = (u) => e.legalAttackTargets(e.findInst(u.uid)).map((x) => x.inst.uid);
  assert(legal(f).includes(far.uid), '+1 Reichweite'); assert(!legal(put(e, 0, 't_inf', 'L', 0)).includes(far.uid), 'ohne Fernschuss nicht');
  assert(e._canReachForCounter(e.findInst(f.uid), e.findInst(far.uid)), 'Gegenschlag-Reichweite ebenso +1');
}
{ // Durchschlag + Eingraben
  const e = fresh(); const d = put(e, 0, kid('Durchschlag'), 'C', 0); const t = put(e, 1, 't_wall', 'C', 0);
  assert(atk(e, d, t).ok); assert.equal(30 - t.def, 3, 'ATK 2 + 1 ignorierte DEF');
  const dug = put(e, 1, 't_wall', 'C', 1); dug.flags.noCombatUntil = e.state.turn + 1;
  assert(!e.legalAttackTargets(e.findInst(d.uid)).some((x) => x.inst.uid === dug.uid), 'eingegrabene Ziele tabu');
}
{ // Platztausch (kein Leak)
  const e = fresh(); const pz = put(e, 0, kid('Platztausch'), 'C', 0), other = put(e, 0, 't_hide', 'L', 0);
  pz.facedown = true; other.facedown = true; tick(e);
  const r = e.dispatch({ type: 'REVEAL_UNIT', player: 0, uid: pz.uid }); assert(r.ok, r.error);
  const pend = e.state.pending; assert(pend && pend.kind === 'kw-swap', 'Wahl existiert');
  assert(!JSON.stringify(pend).includes('t_hide'), 'kein Name der anderen Karte');
  assert(pend.choices.every((c) => !/t_hide/.test(c.label)));
  const until0 = other.flags.noCombatUntil;
  assert(e.dispatch({ type: 'CHOOSE_TARGET', player: 0, target: other.uid }).ok);
  assert.equal(e.player(0).front.C[0].uid, other.uid); assert.equal(e.player(0).front.L[0].uid, pz.uid);
  assert(other.facedown, 'andere bleibt verdeckt'); assert.equal(other.flags.noCombatUntil, until0, 'kein neues Eingraben');
  const logTxt = JSON.stringify(e.state.log || []) + JSON.stringify(e.state.events || []);
  assert(!logTxt.includes('t_hide'), 'Protokoll nennt die andere Karte nicht');
}
{ // Überlast (nicht verhinderbar)
  const e = fresh(); e.player(0).support[0] = e.instFromId('t_sup', 0); const { inst } = play(e, kid('Überlast'), 'C', 0);
  assert.equal(e.currentAtkDef(inst).atk, 4, '+2 ATK'); assert.equal(inst.def, 5 + 1 + 1, '+1 DEF (+1 Eingraben)');
  const d0 = inst.def; e.dispatch({ type: 'END_TURN', player: 0 }); assert.equal(inst.def, d0 - 1, '1 Schaden trotz Eingraben und Schadensreduktion');
  e.dispatch({ type: 'END_TURN', player: 1 }); const d1 = inst.def; e.dispatch({ type: 'END_TURN', player: 0 }); assert.equal(inst.def, d1 - 1);
}
{ // Abschirmung (1×/Zug, nur benachbart)
  const e = fresh(); const s = put(e, 0, kid('Abschirmung'), 'C', 0), n = put(e, 0, 't_inf', 'L', 0), far = put(e, 0, 't_inf', 'R', 2);
  e._damage(n, 3, {}); assert.equal(n.def, 3); assert.equal(s.def, 4, 'leitet 1 um');
  e._damage(n, 1, {}); assert.equal(n.def, 2, 'nur einmal pro Zug'); assert.equal(s.def, 4);
  e.state.turn += 2; e._damage(far, 2, {}); assert.equal(far.def, 3, 'nicht benachbart'); assert.equal(s.def, 4);
}
{ // Erbitterung / Zähigkeit (je Verlust, max +3, laufend neu berechnet)
  const e = fresh(); const er = put(e, 0, kid('Erbitterung'), 'C', 0), z = put(e, 0, kid('Zähigkeit'), 'L', 0); tick(e);
  for (let i = 0; i < 5; i++) { const x = put(e, 0, 't_inf', 'R', 0); e._destroy(e.findInst(x.uid)); tick(e);
    assert.equal(e.currentAtkDef(er).atk, 2 + Math.min(3, i + 1)); assert.equal(z.def, 5 + Math.min(3, i + 1)); }
}
{ // Heranführung
  const e = fresh(); play(e, kid('Heranführung'), 'C', 0);
  assert.equal(play(e, 't_inf', 'L', 0).spent, 1, 'nächste Einheit −1'); assert.equal(play(e, 't_inf', 'R', 0).spent, 2, 'nur die nächste');
  const e2 = fresh(); play(e2, kid('Heranführung'), 'C', 0); assert.equal(play(e2, 't_cheap', 'L', 0).spent, 1, 'mindestens 1');
  const e3 = fresh(); play(e3, kid('Heranführung'), 'C', 0); e3.state.turn += 2; assert.equal(play(e3, 't_inf', 'L', 0).spent, 2, 'nur in diesem Zug');
}
{ // Stellungswechsel
  const e = fresh(); const s = put(e, 0, kid('Stellungswechsel'), 'C', 1); put(e, 1, 't_wall', 'C', 1); const until0 = s.flags.noCombatUntil;
  assert.equal(JSON.stringify(e.kwMoveSlots(s.uid).map((x) => x.section).sort()), '["L","R"]');
  assert(!e.dispatch({ type: 'KW_MOVE', player: 0, uid: s.uid, slot: { section: 'C', row: 2 } }).ok, 'nur gleiche Reihe');
  assert(e.dispatch({ type: 'KW_MOVE', player: 0, uid: s.uid, slot: { section: 'L', row: 1 } }).ok);
  assert.equal(e.player(0).front.L[1].uid, s.uid); assert.equal(s.flags.noCombatUntil, until0, 'kein neuer Einsatz');
  assert(!e.dispatch({ type: 'ATTACK', player: 0, uid: s.uid }).ok, 'greift danach nicht an');
  assert(!e.dispatch({ type: 'KW_MOVE', player: 0, uid: s.uid, slot: { section: 'C', row: 1 } }).ok, 'einmal pro Zug');
  e.state.active = 1; assert(!e.dispatch({ type: 'KW_MOVE', player: 0, uid: s.uid, slot: { section: 'C', row: 1 } }).ok, 'nur im eigenen Zug');
}
{ // Zuteilung
  const e = fresh(); const h0 = e.player(0).hand.length; play(e, kid('Zuteilung'), 'C', 0); assert.equal(e.player(0).hand.length, h0 + 1);
}
{ // Sicherung (laufende Neuberechnung bei Einsatz, Verdecken, Verlust, Versetzen)
  const e = fresh(); const a = put(e, 0, 't_inf', 'C', 0), far = put(e, 0, 't_inf', 'L', 0); tick(e);
  const { inst: s } = play(e, kid('Sicherung'), 'C', 1); assert.equal(a.def, 6, '+1 im Abschnitt'); assert.equal(far.def, 5, 'anderer Abschnitt nicht'); assert.equal(s.def, 6, 'nicht sich selbst (nur Eingraben)');
  const s2 = put(e, 0, kid('Sicherung'), 'C', 2); tick(e); assert.equal(a.def, 7, 'mehrere addieren sich');
  s2.facedown = true; tick(e); assert.equal(a.def, 6, 'nur offen');
  e._destroy(e.findInst(s.uid)); tick(e); assert.equal(a.def, 5, 'entfällt bei Verlust');
  e._damage(a, 4, {}); s2.facedown = false; tick(e); assert.equal(a.def, 2); s2.facedown = true; tick(e); assert.equal(a.def, 1, 'Wegfall tötet nicht');
}
{ // Nachsetzen
  const e = fresh(); const n = put(e, 0, kid('Nachsetzen'), 'C', 0), o = put(e, 0, 't_inf', 'L', 0); const t = put(e, 1, 't_wall', 'C', 0);
  const t2 = put(e, 1, 't_wall', 'L', 0);
  assert(atk(e, n, t2).ok); assert.equal(30 - t2.def, 2, 'unbeschädigtes Ziel: kein Bonus');
  assert(atk(e, o, t).ok); const d = t.def; assert(atk(e, n, t).ok); assert.equal(d - t.def, 4, '+2 gegen bereits beschädigtes Ziel');
}
{ // Hinterhalt (+2 nur erster Angriff nach Aufdecken, kein Leak solange verdeckt)
  const e = fresh(); const hh = put(e, 0, kid('Hinterhalt'), 'C', 0); const t = put(e, 1, 't_wall', 'C', 0);
  hh.facedown = true; tick(e); assert(!hh.flags.kwAmbushReady);
  e.state.active = 1; const foeView = e.listActions(1).concat([]); e.state.active = 0;
  assert(!JSON.stringify(foeView).includes('KW Hinterhalt'), 'Gegner sieht den Namen nicht');
  assert(e.dispatch({ type: 'REVEAL_UNIT', player: 0, uid: hh.uid }).ok); assert(hh.flags.kwAmbushReady);
  assert(atk(e, hh, t).ok); assert.equal(30 - t.def, 4, '+2 beim ersten Angriff');
  hh.facedown = false; hh.flags.kwHidden = false; const d = t.def; e.state.turn += 2; assert(atk(e, hh, t).ok); assert.equal(d - t.def, 2, 'danach normal');
}
console.log('PASS keywords: 16 Wörter (Daten ' + withKw + '/' + units + ' Einheiten, Darstellung, Engine je Wort inkl. Limits/Eingraben/kein Leak)');
console.log('  ' + WORDS.map((k) => k + ' ' + count[k] + ' (' + Object.keys(byNat[k]).length + ' Nat.)').join(' · '));
