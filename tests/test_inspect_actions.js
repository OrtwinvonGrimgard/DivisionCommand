/**
 * Aktionen in der Kartenansicht.
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
/* Detailansicht: Aktionen nur aus Engine-Regeln, Dispatch über Produktionspfad, Gegner read-only. */
const assert = require('node:assert/strict');
const { setup } = require('./test_audio_actions');
const h = setup('off'), { w, eng } = h, $ = s => w.document.querySelector(s);
const defs = w.DC_CATALOG.cards.filter(d => d.typ === 'Einheit' && !(d.effects || []).length && !d.noAttack);
const inf = defs[0]; assert(inf, 'plain infantry');
const st = eng.state; st.active = 0; st.phase = 'main'; st.pending = null;
const own = eng.instFromId(inf.id, 0), enemy = eng.instFromId(inf.id, 1);
own.flags = {}; own.attackUsed = false; own.playedTurn = -99; own.placedTurn = -99; eng.player(0).front.C[0] = own; eng.player(1).front.C[0] = enemy;
const hidden = eng.instFromId(inf.id, 1); hidden.facedown = true; eng.player(1).front.L[0] = hidden;
eng.player(0).ap = 5; w.dcRender();
const dbl = el => el.dispatchEvent(new w.MouseEvent('dblclick', { bubbles: true, cancelable: true }));
const tile = uid => $(`[data-uid="${uid}"]`);
// eigene Einheit: Angreifen nur wenn listActions es erlaubt
dbl(tile(own.uid));
assert.equal($('#inspect').style.display, 'flex', 'inspect open');
const legal = eng.listActions(0).find(a => a.type === 'ATTACK' && a.uid === own.uid);
const btn = $('#inspect [data-act="dc-attack"]'); assert(btn, 'attack button');
assert.equal(!btn.disabled, !!legal, 'button state = engine');
assert($('#inspect .inspect-act-notes').textContent.includes('keine aktivierbare'), 'honest label');
if (legal) {
  const ap = eng.player(0).ap, ev = eng.state.events ? eng.state.events.length : 0;
  btn.click();
  assert.equal($('#inspect').style.display, 'none', 'modal closes');
  assert(eng.state.pending || eng.player(0).ap < ap, 'production ATTACK dispatched (target selection or resolve)');
  const apAfter = eng.player(0).ap; btn.click(); assert.equal(eng.player(0).ap, apAfter, 'no double dispatch');
  eng.state.pending = null;
}
const e2 = eng.instFromId(inf.id, 1); eng.player(1).front.C[1] = e2; w.dcRender();
// Gegner + verdeckter Gegner: keine Aktionsbuttons, kein Leak
dbl(tile(e2.uid)); assert(!$('#inspect [data-act^="dc-"]'), 'enemy read-only'); $('#inspect [data-act="close"]').click();
const ht = tile(hidden.uid); if (ht) { dbl(ht); assert(!$('#inspect [data-act^="dc-"]')); assert(!$('#inspect').textContent.includes(inf.name), 'no hidden leak'); $('#inspect [data-act="close"]') && $('#inspect [data-act="close"]').click(); }
// Hotseat: Gegner-Karten des aktiven Spielers bleiben read-only; bereits angegriffen -> deaktiviert mit Engine-Grund
eng.player(0).front.C[0] = own; own.attackUsed = true; w.dcRender(); dbl(tile(own.uid));
const b2 = $('#inspect [data-act="dc-attack"]'); assert(b2 && b2.disabled && b2.title.length > 3, 'disabled with reason');
const ap0 = eng.player(0).ap; b2.click(); assert.equal($('#inspect').style.display, 'flex', 'disabled does nothing'); assert.equal(eng.player(0).ap, ap0);
w.document.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
assert.equal($('#inspect').style.display, 'none', 'Escape closes');
// Probe verändert echten Zustand nicht
own.attackUsed = false; const snap = JSON.stringify(eng.state); dbl(tile(own.uid)); assert.equal(JSON.stringify(eng.state), snap, 'probe is side-effect free');
// Passive Fähigkeit: Label statt Button
const pas = w.DC_CATALOG.cards.filter(d => d.typ === 'Einheit' && (d.effects || []).length).map(d => { const i = eng.instFromId(d.id, 0); i.flags = {}; i.playedTurn = -99; i.placedTurn = -99; return i; })
  .find(i => { eng.player(0).front.R[0] = i; const r = (() => { try { const p = new w.DCEngine.Engine(eng.catalog, { seed: 1 }); p.state = JSON.parse(JSON.stringify(eng.state)); return p.dispatch({ type: 'USE_ABILITY', player: 0, uid: i.uid }); } catch (e) { return { error: e.message }; } })(); return !r.ok && /Keine aktivierbare/.test(r.error || ''); });
if (pas) { w.dcRender(); dbl(tile(pas.uid)); assert($('#inspect').textContent.includes('Passiv')); assert(!$('#inspect [data-act="dc-ability"]'), 'passive not clickable'); $('#inspect [data-act="close"]').click(); }
const errs = h.errors.filter(e => !/requestAnimationFrame/.test(String(e))); assert.equal(errs.length, 0, errs.join('\n'));
console.log('inspect actions ok', { legalAttack: !!legal, passive: !!pas });
