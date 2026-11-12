/**
 * t279: aufgeräumter Tisch – Kopfleiste, Spielerplaketten, angedocktes Protokoll, Höhenraster.
 * Läuft über `npm test` von der Repo-Wurzel. Kein Browser (die Pixelprüfung macht `npm run layout-test`).
 */
const assert = require('node:assert/strict');
const fs = require('fs'), path = require('path');
const { setup } = require('./test_audio_actions');
const web = path.join(__dirname, '../Division_Command/web');
const html = fs.readFileSync(path.join(web, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(web, 'css/table-hud.css'), 'utf8');
const sw = fs.readFileSync(path.join(web, 'sw.js'), 'utf8');

// Stylesheet zuletzt geladen und offline verfügbar
const links = [...html.matchAll(/<link rel="stylesheet" href="([^"?]+)/g)].map(m => m[1]);
assert.equal(links[links.length - 1], 'css/table-hud.css', 'table-hud.css als letztes Stylesheet');
assert(sw.includes("'./css/table-hud.css'") && sw.includes("'divcmd-alpha42a'"), 'Offline-Cache alpha42a mit table-hud.css');
assert(html.includes('js/ui/app.js?v=alpha42a'));

// Musiktitel nicht mehr absolut über der Kopfleiste, Höhenraster mit allen sieben Zeilen
assert(/\.hud-scn \.nowplay \{[^}]*position: static !important/.test(css), 'Musiktitel im Fluss');
assert(/grid-template-rows: var\(--strip-h\) var\(--es-h\) var\(--ef-h\) var\(--nml-h\) var\(--mf-h\) var\(--ms-h\) var\(--bottom-h\)/.test(css), 'Höhenraster');
assert(/body:has\(#app \.table\) #dc-version \{ display: none !important; \}/.test(css), 'Versionsschild im Spiel aus');
assert(/body:not\(\.dc-cam\)/.test(css), '2.5D-Ansicht unberührt');

const h = setup('off'), { w, eng, click } = h, $ = s => w.document.querySelector(s);
w.dcRender();
// Kopfleiste: Logo | Mitte (Partie + Zug) | Plaketten
const top = $('#app .topbar');
assert(top.querySelector(':scope > h1') && top.querySelector(':scope > .hud-center #turnmeta') && top.querySelector('.hud-center #nowplay'), 'Kopfleiste dreiteilig');
assert(/Zug \d+ · am Zug: /.test($('#turnmeta').textContent));
assert($('#hud-scn').textContent.length > 3, 'Partiename gesetzt');
// Plaketten: Name, AP-Punkte, SP-Balken, Hand/Deck – Text bleibt lesbar für Tests/Tutorial
const st = eng.state;
[0, 1].forEach(i => {
  const el = $('#ap' + i), p = st.players[i];
  assert(el.classList.contains('pplate'));
  assert.equal(el.querySelector('.pp-name').textContent, p.name);
  assert(el.querySelectorAll('.pp-pip').length >= 5, 'AP-Punkte');
  assert.equal(el.querySelectorAll('.pp-pip.on').length, Math.min(8, p.ap), 'gefüllte AP-Punkte = AP');
  assert(el.querySelector('.pp-bar > i'), 'SP-Balken');
  assert(new RegExp(p.ap + ' AP').test(el.textContent) && /SP \d+\/\d+/.test(el.textContent) && /Hand \d+ · Deck \d+/.test(el.textContent));
  assert.equal(el.classList.contains('active'), st.active === i, 'aktiver Spieler markiert');
});
assert.equal(w.document.querySelectorAll('#app .topbar .pplate.you').length, 1, 'genau eine eigene Plakette');
// Zonenbeschriftung: Besitzer und Zone getrennt (flach nur Zone, 2.5D „Name — Zone“)
const lab = $('#enemy-front-label');
assert(lab.querySelector('.rl-who') && lab.querySelector('.rl-zone').textContent === 'Front' && / — Front$/.test(lab.title));
assert.equal($('#enemy-nml-label .rl-short').textContent, 'NML');
// Protokoll angedockt in der Befehlsspalte, nicht verschiebbar, weiter ein-/ausblendbar
const lw = $('#log-win');
assert(lw.classList.contains('docked') && lw.parentElement.classList.contains('table-side'), 'Protokoll in der Befehlsspalte');
const d0 = lw.classList.contains('off'); click('#btn-log'); assert.notEqual(lw.classList.contains('off'), d0); click('#btn-log');
// Hinweise landen nur noch in #hint, nicht in der Zonenbeschriftung
const before = $('#my-front-label').innerHTML;
w.dcRender();
assert.equal($('#my-front-label').innerHTML, before);
assert.equal(h.errors.filter(e => !/requestAnimationFrame/.test(String(e))).length, 0, h.errors.join('\n'));
console.log('PASS table hud t279: Kopfleiste dreiteilig, Plaketten mit AP/SP/Hand, Protokoll angedockt, Höhenraster, Cache alpha42a');
