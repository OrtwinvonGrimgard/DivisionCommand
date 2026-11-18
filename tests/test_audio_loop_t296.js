/**
 * t296: Regression gegen die Audio-Schleife. `stop()` in audio-data.js darf ein bereits pausiertes
 * Element am Anfang nicht erneut auf `currentTime = 0` setzen (löst in Chromium seeked/canplay aus,
 * worauf index.html `applyAudio` aufruft), und `playTable` darf `#bgm` nicht ständig neu setzen.
 * Läuft über `npm test`. Der Browser-Test dazu ist `npm run audio-play`.
 */
const { JSDOM } = require('jsdom');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const WEB = path.join(__dirname, '../Division_Command/web');
const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');

const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'http://localhost/' });
const w = dom.window;
w.HTMLMediaElement.prototype.canPlayType = () => 'probably';
w.Audio = function (src) { return { src, paused: true, play() { return Promise.resolve(); }, load() {}, addEventListener() {}, pause() { this.paused = true; } }; };
w.eval(fs.readFileSync(path.join(WEB, 'js/data/audio-data.js'), 'utf8'));

/**
 * Ersetzt Wiedergabe-Eigenschaften eines Elements durch zählende Fassungen.
 * @param {HTMLMediaElement} el
 * @returns {{seeks:number}} Zähler
 */
function instrument(el) {
  const st = { seeks: 0, t: 0, paused: true };
  Object.defineProperty(el, 'currentTime', { get() { return st.t; }, set(v) { st.seeks++; st.t = v; }, configurable: true });
  Object.defineProperty(el, 'paused', { get() { return st.paused; }, configurable: true });
  el.pause = () => { st.paused = true; };
  el.play = () => { st.paused = false; return Promise.resolve(); };
  return st;
}
const bgm = w.document.getElementById('bgm');
const battle = w.document.getElementById('bgm-battle');
const sb = instrument(bgm), st = instrument(battle);

// Titelmusik läuft, Tisch startet: bgm wird einmal angehalten und zurückgesetzt, danach nie wieder.
sb.paused = false; sb.t = 12;
for (let i = 0; i < 1000; i++) w.DCAudio.playTable();
assert.equal(bgm.paused, true, 'Titelmusik am Tisch aus');
assert.equal(sb.seeks, 1, 'bgm wird genau einmal zurückgesetzt, nicht pro Aufruf (' + sb.seeks + ')');
for (let i = 0; i < 1000; i++) w.DCAudio.stopTable();
assert.equal(st.seeks <= 1, true, 'stopTable setzt ein pausiertes Element am Anfang nicht immer wieder zurück (' + st.seeks + ')');

// Musik aus: playTable stoppt, ohne zu suchen.
w.document.getElementById('opt-music').checked = false;
const before = sb.seeks + st.seeks;
for (let i = 0; i < 1000; i++) w.DCAudio.playTable();
assert.equal(sb.seeks + st.seeks, before, 'Musik aus: keine Such-Schreibzugriffe');
console.log('OK test_audio_loop_t296');
