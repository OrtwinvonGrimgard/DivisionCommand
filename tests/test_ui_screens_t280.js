#!/usr/bin/env node
/**
 * t280: Bildschirme außerhalb des Tisches – Designsystem, Generierte Grafiken, Bibliothek-Rückmeldung, Endbildschirm.
 * Läuft über `npm test` von der Repo-Wurzel. Pixelprüfung: `npm run screens-test`.
 */
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const L = require('../scripts/nation_pools/load_game.js');

const WEB = L.WEB;
const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
const sw = fs.readFileSync(path.join(WEB, 'sw.js'), 'utf8');

// Einbindung: Klasse, Stylesheets vor table-hud.css, Skript, Offline-Cache
assert(html.includes('<html lang="de" class="ui280">'), 'html.ui280');
const links = [...html.matchAll(/<link rel="stylesheet" href="([^"?]+)/g)].map((m) => m[1]);
assert(links.indexOf('css/ui-system.css') >= 0 && links.indexOf('css/ui-system.css') < links.indexOf('css/ui-screens.css'));
assert(links.indexOf('css/ui-screens.css') < links.indexOf('css/table-hud.css'), 'Tisch-HUD bleibt zuletzt');
assert(html.includes('js/ui/ui-screens.js'), 'ui-screens.js geladen');
assert(html.includes('poster="assets/title-back-poster.webp"'), 'Standbild für das Titelvideo');
assert(sw.includes("'divcmd-alpha43c'"));

/** Liest die Bildgröße aus einem WebP-Kopf (VP8, VP8L, VP8X). */
function webpSize(buf) {
  assert.equal(buf.toString('ascii', 0, 4), 'RIFF'); assert.equal(buf.toString('ascii', 8, 12), 'WEBP');
  const kind = buf.toString('ascii', 12, 16);
  if (kind === 'VP8 ') return [buf.readUInt16LE(26) & 0x3fff, buf.readUInt16LE(28) & 0x3fff];
  if (kind === 'VP8L') { const b = buf.readUInt32LE(21); return [(b & 0x3fff) + 1, ((b >> 14) & 0x3fff) + 1]; }
  return [1 + buf.readUIntLE(24, 3), 1 + buf.readUIntLE(27, 3)];
}
const assets = {
  'assets/ui/mode-ki.webp': [960, 540], 'assets/ui/mode-hotseat.webp': [960, 540], 'assets/ui/mode-lan.webp': [960, 540],
  'assets/ui/end-victory.webp': [1280, 720], 'assets/ui/end-defeat.webp': [1280, 720], 'assets/ui/panel-grain.webp': [512, 512],
};
for (const [rel, dim] of Object.entries(assets)) {
  const buf = fs.readFileSync(path.join(WEB, rel));
  assert(buf.length < 150 * 1024, rel + ' klein genug');
  assert.deepEqual(webpSize(buf), dim, rel + ' Größe');
  assert(sw.includes("'./" + rel + "'"), rel + ' im Offline-Cache');
}
for (const rel of ['css/ui-system.css', 'css/ui-screens.css', 'js/ui/ui-screens.js', 'assets/ui/icons.svg', 'assets/ui/corner.svg', 'assets/ui/search.svg', 'assets/title-back-poster.webp']) {
  assert(fs.existsSync(path.join(WEB, rel)), rel);
  assert(sw.includes("'./" + rel + "'"), rel + ' im Offline-Cache');
}
// Jedes im Skript benutzte Symbol existiert im Sprite
const sprite = fs.readFileSync(path.join(WEB, 'assets/ui/icons.svg'), 'utf8');
const js = fs.readFileSync(path.join(WEB, 'js/ui/ui-screens.js'), 'utf8');
for (const m of js.matchAll(/'(i-[a-z]+)'/g)) assert(sprite.includes('id="' + m[1] + '"'), 'Symbol ' + m[1]);

// Laufzeit im DOM: Hauptmenü-Symbole, Modus-Karten, Esc = Zurück, Bot-Dialog hat immer einen Ausgang
const dom = new JSDOM(html, { url: 'http://localhost/', runScripts: 'outside-only' });
const w = dom.window;
w.eval(js);
w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
const single = w.document.getElementById('go-single');
assert(single.querySelector('svg.ui-ico use'), 'Symbol am Menüknopf');
assert.equal(single.textContent.trim(), 'Einzelspieler', 'sichtbarer Text unverändert');
assert.equal(w.document.querySelectorAll('#scr-single .ui-modes .ui-mode').length, 2, 'zwei Modus-Karten');
const mode = w.document.getElementById('mode');
w.document.getElementById('ui-mode-hotseat').click();
assert.equal(mode.value, 'hotseat');
assert.equal(w.document.getElementById('scr-single').getAttribute('data-mode'), 'hotseat');
w.document.getElementById('ui-mode-bot').click();
assert.notEqual(mode.value, 'hotseat');
const foot = w.document.querySelector('#bot-modal .ui-dlg-foot');
assert(foot && foot.querySelector('#bot-apply') && foot.querySelector('#bot-cancel'), 'Speichern/Abbrechen außerhalb der Regler');
assert(!w.document.getElementById('bot-sliders').contains(w.document.getElementById('bot-cancel')));
assert(w.document.querySelector('#scr-user .ui-actionbar #user-save'), 'Akte speichern in der Aktionsleiste');
assert(w.document.querySelector('#scr-lan .ui-banner'), 'LAN-Bildband');
let backed = 0;
w.document.getElementById('work-root').classList.add('open');
const opt = w.document.getElementById('scr-options'); opt.classList.add('on');
const back = w.document.getElementById('back-opt');
back.addEventListener('click', () => backed++);
Object.defineProperty(back, 'offsetParent', { get: () => opt });
w.document.dispatchEvent(new w.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
assert.equal(backed, 1, 'Esc drückt Zurück');

// Bibliothek: Kopienabzeichen, Fortschritt 60 + 2, Limitmeldung auf Deutsch, leerer Zustand mit Ausweg
const d2 = new JSDOM(html, { url: 'http://localhost/', runScripts: 'outside-only' });
const w2 = d2.window;
const G = L.loadGame({ quiet: true });
w2.DC_CATALOG = G.DC_CATALOG; w2.DC_NATION_DECKS = G.DC_NATION_DECKS; w2.DC_IMAGES = {};
w2.dcCardImage = (c) => (c && c.id ? 'faces-v2/' + c.id + '.webp' : '');
w2.localStorage = { _m: {}, getItem(k) { return this._m[k] || null; }, setItem(k, v) { this._m[k] = String(v); }, removeItem(k) { delete this._m[k]; } };
w2.eval(fs.readFileSync(path.join(WEB, 'js/ui/library.js'), 'utf8'));
w2.DCLib.render();
const doc = w2.document;
const silver = doc.querySelector('#lib-list .lib-card[data-rarity="silver"]');
assert(silver && silver.querySelector('.lib-copies.r-silver').textContent === '0/2', 'Abzeichen 0/2');
const prog = doc.getElementById('deck-progress');
assert(prog && /noch 60 Karten/.test(prog.textContent) && /2 Doktrinen/.test(prog.textContent), 'Fortschritt 60 + 2');
const id = silver.getAttribute('data-add');
for (let i = 0; i < 3; i++) doc.querySelector('#lib-list .lib-card[data-add="' + id + '"]').dispatchEvent(new w2.MouseEvent('dblclick', { bubbles: true }));
assert.equal(doc.querySelector('#lib-list .lib-card[data-add="' + id + '"] .lib-copies').textContent, '2/2');
assert(/maximal 2× \(Silber\)/.test(doc.getElementById('deck-limit-msg').textContent), 'Limitmeldung deutsch');
assert(/noch 58 Karten/.test(prog.textContent));
const q = doc.getElementById('lib-search'); q.value = 'zzzz-keine-karte'; q.dispatchEvent(new w2.Event('input', { bubbles: true }));
const reset = doc.getElementById('lib-reset-filters');
assert(reset, 'leerer Zustand mit „Filter zurücksetzen“');
reset.click();
assert(doc.querySelector('#lib-list .lib-card'), 'nach Zurücksetzen wieder Karten');
assert(/Doppelklick = eine Kopie ins Deck/.test(html), 'Hinweis passt zur Bedienung');

// Endbildschirm-Stimmung
const d3 = new JSDOM('<body></body>', { url: 'http://localhost/', runScripts: 'outside-only' });
d3.window.eval(fs.readFileSync(path.join(WEB, 'js/ui/end-screen.js'), 'utf8'));
const E = d3.window.DCEndScreen;
assert.equal(E.tone('GEWONNEN'), 'win'); assert.equal(E.tone('VERLOREN'), 'loss'); assert.equal(E.tone('UNENTSCHIEDEN'), 'draw');
E.show({ winner: 0, players: [{ name: 'A', vp: 5 }, { name: 'B', vp: 1 }] }, { you: 0 });
const es = d3.window.document.getElementById('dc-end-screen');
assert(es.classList.contains('is-win') && d3.window.document.getElementById('dc-end-again').classList.contains('primary'));

console.log('PASS ui screens t280: Designsystem eingebunden, 9 Grafiken im Cache, Menüsymbole, Modus-Karten, Esc, Bot-Dialog-Ausgang, Kopien/60+2, leerer Zustand, Endbildschirm');
