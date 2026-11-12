/**
 * t283: LAN-Sicht je Spieler (`getStateFor`, `logFor`, `resolveAliases`) und net.js-Host mit gefiltertem Stand.
 * Läuft über `npm test`. Keine Produktlogik.
 */
'use strict';
const assert = require('node:assert/strict');
const L = require('../scripts/nation_pools/load_game.js');
const w = L.loadGame({ quiet: true });
const eng = L.newMatch(w, 'Steinmark', 11);
const host = eng.state.players[0];
const leak = (obj, ids) => { const s = JSON.stringify(obj); return ids.filter((id) => s.includes('"' + id + '"')); };

// Hand und Deck des Hosts sind für den Gast nur Platzhalter.
const v1 = eng.getStateFor(1);
assert.equal(v1.players[0].hand.length, host.hand.length, 'Handanzahl bleibt');
assert.equal(v1.players[0].deck.length, host.deck.length, 'Deckanzahl bleibt');
assert(v1.players[0].hand.every((c) => c.cardId === 'dc_hidden' && /^v-/.test(c.uid)), 'Hand verdeckt');
assert(v1.players[0].deck.every((c) => c.cardId === 'dc_hidden'), 'Deck verdeckt');
const hostSecrets = host.hand.concat(host.deck).map((c) => c.uid);
assert.equal(leak(v1.players[0], hostSecrets).length, 0, 'keine echten UIDs aus Hand/Deck');
// Eigene Hand des Gastes bleibt sichtbar; der Host-Stand bleibt unverändert.
assert(v1.players[1].hand.every((c) => c.cardId !== 'dc_hidden'));
assert(eng.state.players[0].hand.every((c) => c.cardId !== 'dc_hidden'), 'Host-Stand unverändert');
assert.equal(eng.defOf({ cardId: 'dc_hidden' }).name, 'Verdeckte Karte');
// Volle Sicht ohne gültigen Betrachter
assert(eng.getStateFor(undefined).players[0].hand.every((c) => c.cardId !== 'dc_hidden'));

// Verdeckte Karte im Support: Platzhalter, Ereignis ohne Name, Protokoll mit öffentlicher Zeile.
const trap = host.hand[0];
trap.facedown = true; trap.flags.trap = true;
host.hand = host.hand.slice(1); host.support[0] = trap;
eng._evt('support', eng.defOf(trap), host.name + ' legt eine verdeckte Karte in den Support.', { owner: 0, uid: trap.uid });
eng._log(host.name + ' legt ' + eng.defOf(trap).name + ' verdeckt in den Support.', { secret: 0, pub: host.name + ' legt eine verdeckte Karte in den Support.' });
const v2 = eng.getStateFor(1);
assert.equal(v2.players[0].support[0].cardId, 'dc_hidden', 'verdeckter Support maskiert');
const al = v2.players[0].support[0].uid;
assert(/^v-/.test(al));
const ev = v2.events[v2.events.length - 1];
assert.equal(ev.cardId, null); assert.equal(ev.name, null); assert.equal(ev.uid, al);
const lg = eng.logFor(1, 5);
assert(!lg.some((l) => l.msg.includes(eng.defOf(trap).name)), 'Protokoll nennt die verdeckte Karte nicht');
assert(eng.logFor(0, 5).some((l) => l.msg.includes(eng.defOf(trap).name)), 'Host sieht seine Karte');
// Rückübersetzung: Gast zielt auf den Decknamen, der Host bekommt die echte UID.
const act = eng.resolveAliases({ type: 'ATTACK', player: 1, target: al, list: [al, 'x'] });
assert.equal(act.target, trap.uid); assert.equal(JSON.stringify(act.list), JSON.stringify([trap.uid, 'x']));
// Offene Wahl des Hosts: Optionen für den Gast leer.
eng.state.pending = { kind: 'pick', player: 0, choices: [{ target: host.hand[0].uid, label: eng.defOf(host.hand[0]).name }] };
const v3 = eng.getStateFor(1);
assert(v3.pending.choices.every((c) => c.hidden && !c.label), 'Wahl des Gegners verborgen');
eng.state.pending = null;
// Karte wird offen gelegt und kehrt verdeckt zurück: neuer Deckname.
trap.facedown = false; eng.getStateFor(1); trap.facedown = true;
assert.notEqual(eng.getStateFor(1).players[0].support[0].uid, al, 'neuer Deckname nach offener Phase');

// net.js: Host sendet gefilterten Stand, Gast-Aktion wird zurückübersetzt.
const fs = require('node:fs'), path = require('node:path');
const sent = [];
class FakeWS { constructor() { this.readyState = 1; FakeWS.last = this; } send(d) { sent.push(JSON.parse(d)); } close() {} }
let dispatched = null;
const fakeEng = Object.assign(Object.create(Object.getPrototypeOf(eng)), eng);
fakeEng.dispatch = (a) => { dispatched = a; return { ok: true }; };
w.dcGetEngine = () => fakeEng;
require('node:vm').runInNewContext(fs.readFileSync(path.join(L.WEB, 'js/net.js'), 'utf8'), { window: w, WebSocket: FakeWS, document: { getElementById: () => null }, setTimeout, clearTimeout, console, JSON });
w.DCNet.connect('ws://x', 'Host', 'host');
FakeWS.last.onopen();
w.DCNet.broadcastState();
const st = sent.filter((m) => m.type === 'state').pop();
assert(st && st.state.players[0].hand.every((c) => c.cardId === 'dc_hidden'), 'net.js sendet gefilterten Stand');
assert(!st.log.some((l) => l.msg.includes(eng.defOf(trap).name)), 'net.js sendet gefiltertes Protokoll');
const curAlias = st.state.players[0].support[0].uid;
FakeWS.last.onmessage({ data: JSON.stringify({ type: 'action', action: { type: 'ATTACK', player: 0, target: curAlias } }) });
assert.equal(dispatched.player, 1, 'Gast immer Spieler 1');
assert.equal(dispatched.target, trap.uid, 'Deckname zurückübersetzt');
console.log('PASS lan view t283: Hand/Deck/verdeckte Karten maskiert, Ereignisse und Protokoll gefiltert, Wahlen verborgen, Decknamen rückübersetzt, net.js sendet Gastsicht');
