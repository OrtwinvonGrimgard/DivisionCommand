/**
 * Effektdarstellung liest nur echte Engine-Daten, nichts erfinden.
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
/* Effect frames/labels from real engine data; DOM only, no browser. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { setup } = require('./test_audio_actions');
const h = setup('off'), { w, eng, click, add } = h;
const $q = s => w.document.querySelector(s);
const inf = w.DC_CATALOG.cards.find(c => c.typ === 'Einheit' && ((c.tags || []).includes('infanterie') || c.klasse === 'Infanterie') && !(c.effects || []).length && !(c.keywords || []).length && c.def >= 3 && !(c.tags || []).some(t => String(t).startsWith('steilfeuer')));
const mk = (pid) => eng.instFromId(inf.id, pid);
const turn = eng.state.turn;
const burn = mk(1); burn.flags.napalm = true; eng.player(1).front.C[0] = burn;
const shield = mk(0); shield.flags.noCombatUntil = turn + 1; shield.flags.digInUntil = turn + 1; shield.flags.digInBonus = 1; eng.player(0).front.L[0] = shield;
const dmg = mk(0); dmg.def = Math.max(1, dmg.def - 2); eng.player(0).front.R[0] = dmg;
const sup = mk(0); sup.flags.suppressed = 2; sup.flags.noAttack = true; eng.player(0).front.C[1] = sup;
const buff = mk(0); buff.flags.buffAtk = 2; eng.player(0).front.C[0] = buff;
const hid = mk(1); hid.facedown = true; hid.flags.napalm = true; hid.flags.suppressed = 1; eng.player(1).front.L[0] = hid;
eng.player(0).flags.sectionAuras = [{ id: 'sa-x', section: 'R', atk: 1, def: 0, untilTurn: turn }];
eng.player(0).flags.keinLoch = { until: turn, section: 'L', left: 2 };
eng.player(1).flags.sectionEnterDamage = [{ section: 'R', value: 2, until: turn + 1, by: 1 }];
eng.player(0).flags.sectionEnterDamage = [{ section: 'C', value: 1, until: turn + 1, by: 0 }];
w.dcRender();
const T = uid => $q(`#my-front [data-uid="${uid}"], #enemy-front [data-uid="${uid}"]`);
// Burn: real napalm status
assert(T(burn.uid).classList.contains('fx-burn')); assert(T(burn.uid).querySelector('.fx-b-burn').title.includes('Napalm'));
// Ordinary damage is NOT burning
assert(!T(dmg.uid).classList.contains('fx-burn')); assert(T(dmg.uid).textContent.includes('Schaden 2'));
// Shield iridescent + existing shield svg kept
assert(T(shield.uid).classList.contains('fx-shield') && T(shield.uid).querySelector('.dig-in-shield'));
// Suppressed label with remaining turns
assert(T(sup.uid).classList.contains('fx-debuff')); assert(T(sup.uid).querySelector('.fx-b-debuff').textContent.includes('2'));
assert(T(buff.uid).classList.contains('fx-buff'));
// Hidden enemy: nothing leaks
const hEl = T(hid.uid);
assert(!/fx-(burn|debuff|shield|buff)/.test(hEl.className)); assert(!hEl.querySelector('.fx-badges')); assert(!hEl.querySelector('.fx-pulse'));
// Section frames: own aura/shield/trap; enemy trap hidden
assert($q('#my-front .slot[data-section="R"]').classList.contains('sec-buff'));
assert($q('#my-front .slot[data-section="L"]').classList.contains('sec-shield'));
assert($q('#my-front .slot[data-section="C"]').classList.contains('sec-trap'));
assert(!$q('#enemy-front .slot.sec-trap'), 'enemy trap not leaked');
assert($q('#my-front .slot[data-section="R"]').getAttribute('data-sec-fx').includes('+1 ATK'));
// Name/stats still present
assert(T(burn.uid).querySelector('.unit-name') && T(burn.uid).querySelector('.unit-stats').textContent.includes('ATK'));
// Pulses: once on real change, gone after hold window, never on unchanged renders
const fx = w.DCTableFx; fx.pulses(eng, 0);
dmg.def -= 1; let p = fx.pulses(eng, 10); assert.equal(p[dmg.uid], 'hit');
assert.equal(fx.pulses(eng, 500)[dmg.uid], 'hit', 'held across rerender');
assert.equal(fx.pulses(eng, 2000)[dmg.uid], undefined, 'expired, not repeating');
dmg.def += 1; assert.equal(fx.pulses(eng, 3000)[dmg.uid], 'heal');
// Burn pulse only with real Napalm tick log line
burn.def -= 1; eng._log(inf.name + ' brennt (Napalm 1).'); assert.equal(fx.pulses(eng, 5000)[burn.uid], 'burn');
// Expiry: removing flags removes frames
burn.flags.napalm = false; sup.flags.suppressed = 0; sup.flags.noAttack = false; eng.player(0).flags.sectionAuras = [];
w.dcRender();
assert(!T(burn.uid).classList.contains('fx-burn')); assert(!T(sup.uid).querySelector('.fx-badges'));
assert(!$q('#my-front .slot[data-section="R"]').classList.contains('sec-buff'));
const hc = add(inf.id); click(`#hand [data-uid="${hc.uid}"]`); click('#my-front .slot.legal');
assert(eng.frontList(eng.player(0)).some(l => l.inst.uid === hc.uid), 'deploy still works');
// Interaction: target class still applied over effects
eng.state.pending = { kind: 'instant-target', player: 0, choices: [{ target: buff.uid }] }; w.dcRender();
assert(T(buff.uid).classList.contains('legal-target'), 'gold target over effect frame');
eng.state.pending = null; w.dcRender();
const css = fs.readFileSync(path.join(__dirname, '../Division_Command/web/css/table-effects.css'), 'utf8');
assert(css.includes('prefers-reduced-motion'));
for (const m of css.matchAll(/@keyframes[^{]+\{([\s\S]*?)\}\s*\}/g)) assert(!/(width|height|top|left|box-shadow)\s*:/.test(m[1]), 'only opacity/transform/background-position');
assert.equal(h.errors.length, 0, String(h.errors));
h.dom.window.close();
console.log('PASS table effects: shield/burn(napalm)/buff/debuff/labels, damage≠burn, hidden no leak, section frames, enemy trap hidden, pulses once+expire, removal, targets/deploy intact');
