/**
 * HUD-Layout, Klick-Durchlass, Zugende- und Log-Handler.
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
/* t171u HUD: Struktur, klick-durchlässige Container, Handler intakt, Kamera-Trennung. Kein Browser. */
const assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { setup } = require('./test_audio_actions');
const web = path.join(__dirname, '../Division_Command/web');
const css = fs.readFileSync(path.join(web, 'css/hud-pro.css'), 'utf8');
const html = fs.readFileSync(path.join(web, 'index.html'), 'utf8');
assert(html.indexOf('hud-pro.css') > html.indexOf('table-chat.css'), 'hud css loaded last');
// Container transparent + pointer-events none, Inhalte auto
const rule = sel => { const i = css.indexOf(sel); assert(i >= 0, sel); return css.slice(i, css.indexOf('}', i)); };
const cont = rule('#app .top-bar, #app .bottom-bar, #app .hand-dock, #app .hand, #app .piles {');
assert(/background: transparent/.test(cont) && /pointer-events: none/.test(cont));
assert(/#app \.hand \.card[^{]*\{[^}]*pointer-events: auto/.test(css.replace(/\n/g, ' ')), 'cards clickable');
assert(/#app \.table-side \{[^}]*background: transparent[^}]*pointer-events: none/.test(css), 'side column not a block');
assert(/#app \.table-side \.panel \{[^}]*pointer-events: auto/.test(css));
assert(/border-radius: var\(--hud-r\)/.test(css) && /prefers-reduced-motion/.test(css) && /focus-visible/.test(css));
assert(!/z-index/.test(css), 'no z-index changes (endscreen/inspect/modals untouched)');
const h = setup('off'), { w, eng, click } = h, $ = s => w.document.querySelector(s);
w.dcRender();
// Wichtige Infos immer sichtbar, Nebenbefehle eingeklappt
assert($('.table-side > .panel .actions > #btn-end'), 'Zugende top level');
assert($('.actions > #btn-log') && $('.actions > #btn-opts'));
const more = $('#hud-more'); assert(more && !more.open);
['btn-peace', 'btn-accept', 'btn-menu', 'btn-concede', 'btn-playtest'].forEach(id => assert(more.querySelector('#' + id), id));
assert(/AP/.test($('#ap0').textContent) && /SP/.test($('#ap0').textContent) && /Hand \d+/.test($('#ap0').textContent));
// Handler: Zugende über Produktionsbutton
const t0 = eng.state.turn, a0 = eng.state.active; click('#btn-end');
assert(eng.state.turn !== t0 || eng.state.active !== a0, 'end turn dispatched');
// Protokoll-Toggle
const lw = $('#log-win'), d0 = lw.classList.contains('off'); click('#btn-log'); assert.notEqual(lw.classList.contains('off'), d0, 'log toggles'); click('#btn-log');
// Kamera: Hand/HUD bleiben außerhalb der Welt
const sel = $('#opt-table-view'); sel.value = 'cam'; sel.dispatchEvent(new w.Event('change', { bubbles: true })); w.dcRender();
assert($('#cam-world #my-front') && !$('#cam-world #hand') && !$('#cam-world .table-side') && !$('#cam-world #hud-more'));
sel.value = 'flat'; sel.dispatchEvent(new w.Event('change', { bubbles: true }));
assert.equal(h.errors.filter(e => !/requestAnimationFrame/.test(String(e))).length, 0, h.errors.join('\n'));
console.log('PASS hud pro: panels, click-through containers, collapsed secondary commands, end turn/log handlers, camera separation');
