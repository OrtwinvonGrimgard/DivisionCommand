/* Real options HTML + audio modules in a DOM, no browser automation. */
const { JSDOM } = require('jsdom');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const WEB = path.join(__dirname, '../Division_Command_0.5a/web');
const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
function fixture(saved) {
  const dom = new JSDOM(html, { runScripts: 'outside-only', url: 'http://localhost/' });
  const w = dom.window, media = [], gestures = [];
  if (saved) w.localStorage.setItem('dc_settings', JSON.stringify(saved));
  const native = w.document.addEventListener.bind(w.document);
  w.document.addEventListener = (type, fn, opts) => {
    if (type === 'pointerdown') gestures.push(fn); native(type, fn, opts);
  };
  w.Audio = function (src) {
    const a = { src, paused: false, ended: false, play() { return Promise.resolve(); }, load() {}, addEventListener() {}, pause() { this.paused = true; } };
    media.push(a); return a;
  };
  w.HTMLMediaElement.prototype.canPlayType = () => 'probably';
  const load = f => w.eval(fs.readFileSync(path.join(WEB, f), 'utf8'));
  load('js/data/audio-data.js'); load('js/ui/audio-feedback.js'); load('js/ui/audio-options.js');
  gestures.forEach(fn => fn({ isTrusted: true }));
  function input(id, val) {
    const el = w.document.getElementById(id); assert(el, id);
    el.value = String(val); el.dispatchEvent(new w.Event('input', { bubbles: true }));
  }
  return { dom, w, media, input };
}
async function main() {
  const h = fixture({ vol: '35', music: '1', timerSec: '300' }), { w, media, input } = h;
  assert.equal(w.document.getElementById('opt-vol').type, 'range');
  assert.equal(w.document.getElementById('opt-sfx').type, 'range');
  assert.equal(w.document.getElementById('opt-sfx').value, '35', 'migrate shared legacy level');
  assert.equal(w.document.querySelectorAll('#opt-sfx').length, 1, 'one menu SFX control');
  input('opt-sfx', 80); w.DCAudio.playSfx('ui-click', { gain: 0.5 });
  assert.equal(media.at(-1).volume, 0.4, 'SFX independent gain');
  input('opt-vol', 10);
  assert.equal(media.at(-1).volume, 0.4, 'music slider does not alter SFX');
  assert.equal(w.document.getElementById('bgm').volume, 0.1, 'music updates live');
  input('opt-sfx', 0);
  assert.equal(media.at(-1).volume, 0, 'in-flight SFX immediately muted');
  const n = media.length;
  w.DCAudio.playSfx('attack');
  w.document.getElementById('go-single').click();
  w.document.getElementById('go-options').dispatchEvent(new w.MouseEvent('pointerover', { bubbles: true }));
  assert.equal(media.length, n, 'all new effects including menu click/hover muted');
  input('opt-vol', 0);
  assert.equal(w.document.getElementById('bgm').volume, 0, 'music zero truly silent');
  assert.equal(w.document.getElementById('opt-sfx-value').textContent, '0%');
  assert.equal(w.document.getElementById('opt-vol-value').textContent, '0%');
  // Real dynamic match template: mirrors are the same settings, not competing masters.
  w.document.body.appendChild(w.document.getElementById('match-tpl').content.cloneNode(true));
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(w.document.getElementById('opt-sfx-ingame').value, '0');
  input('opt-sfx-ingame', 25);
  assert.equal(w.document.getElementById('opt-sfx').value, '25');
  assert.equal(w.document.getElementById('opt-sfx-ingame-value').textContent, '25%');
  input('opt-vol-ingame', 65);
  assert.equal(w.document.getElementById('opt-vol').value, '65');
  assert.equal(w.document.getElementById('bgm').volume, 0.65);
  const saved = JSON.parse(w.localStorage.getItem('dc_settings'));
  assert.equal(saved.timerSec, '300', 'preserve unrelated preferences');
  const reloaded = fixture(saved);
  assert.equal(reloaded.w.document.getElementById('opt-vol').value, '65');
  assert.equal(reloaded.w.document.getElementById('opt-sfx').value, '25');
  reloaded.dom.window.close();
  // Existing saveSettings must also retain the new field (exercise actual inline function).
  const start = html.indexOf('      function saveSettings() {');
  const end = html.indexOf('      function collectBotCfg', start);
  w.eval('var collectBotCfg = function () { return {}; };' + html.slice(start, end) + '; window.testSave = saveSettings;');
  w.testSave();
  assert.equal(JSON.parse(w.localStorage.getItem('dc_settings')).sfxVol, '25');
  // Throwing/rejecting optional mixer cannot block option updates.
  for (const reject of [false, true]) {
    w.DCAudio.refreshVolumes = () => { if (reject) return Promise.reject(Error('audio rejected')); throw Error('audio threw'); };
    input('opt-sfx', reject ? 42 : 41);
    assert.equal(w.document.getElementById('opt-sfx-value').textContent, reject ? '42%' : '41%');
    await new Promise(resolve => setImmediate(resolve));
  }
  const zero = fixture({ vol: 0, sfxVol: 0 });
  assert.equal(zero.w.document.getElementById('opt-vol').value, '0', 'numeric persisted zero');
  assert.equal(zero.w.document.getElementById('opt-sfx').value, '0');
  zero.dom.window.close(); h.dom.window.close();
  console.log('PASS separate options sliders, legacy migration, live music/SFX, zero mute, outputs, in-game sync, persistence/reload, audio faults');
}
main().catch(e => { console.error(e); process.exitCode = 1; });
