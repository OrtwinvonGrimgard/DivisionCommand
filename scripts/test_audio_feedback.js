/* DOM/event-listener tests only. No browser or desktop automation. */
const { JSDOM } = require('jsdom');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const WEB = path.join(__dirname, '../Division_Command_0.5a/web');
function fixture() {
  const dom = new JSDOM(`<button id="menu"><span>A</span><b>B</b></button><button id="next">Next</button>
    <button id="disabled" disabled>No</button><div id="hand"><div class="card"><img><span>C</span></div></div>
    <input id="opt-vol" value="55"><input id="opt-sfx" value="40">`, { runScripts: 'outside-only' });
  const w = dom.window, listeners = {}, media = [];
  const nativeAdd = w.document.addEventListener.bind(w.document);
  w.document.addEventListener = (type, fn, opts) => {
    (listeners[type] ||= []).push(fn); nativeAdd(type, fn, opts);
  };
  let now = 1000;
  w.Date.now = () => now;
  w.setTimeout = () => 0;
  w.Audio = function (src) {
    const a = { src, paused: false, ended: false, volume: 0, play() { return Promise.resolve(); },
      addEventListener() {}, load() {}, pause() { this.paused = true; } };
    media.push(a); return a;
  };
  w.HTMLMediaElement.prototype.canPlayType = () => 'probably';
  const load = f => w.eval(fs.readFileSync(path.join(WEB, f), 'utf8'));
  const emit = (type, event) => (listeners[type] || []).forEach(fn => fn(event));
  const hover = (target, relatedTarget = null) => emit('pointerover', { target, relatedTarget });
  return { w, dom, media, load, emit, hover, tick: (ms = 101) => { now += ms; } };
}
async function main() {
  const h = fixture(), { w, load, emit, hover, media, tick } = h;
  load('js/data/audio-data.js'); load('js/ui/audio-feedback.js');
  const menu = w.document.getElementById('menu'), child = menu.firstElementChild, card = w.document.querySelector('.card');
  hover(menu); w.DCAudio.playSfx('ui-click');
  assert.equal(media.length, 0, 'no sound before trusted activation');
  emit('pointerdown', { isTrusted: false }); hover(menu);
  assert.equal(media.length, 0, 'synthetic interaction cannot unlock audio');
  emit('pointerdown', { isTrusted: true });
  hover(menu);
  assert.equal(media.length, 1, 'menu enter gets soft feedback');
  assert(Math.abs(media[0].volume - 0.4 * 0.18) < 1e-9, 'hover respects opt-sfx gain');
  hover(child, menu); tick(); hover(menu.lastElementChild, child);
  assert.equal(media.length, 1, 'child transition is not re-entry');
  hover(card); assert.equal(media.length, 2, 'game hand card enter gets feedback');
  hover(menu); assert.equal(media.length, 2, 'global cooldown prevents rapid card/button spam');
  tick(); hover(w.document.getElementById('disabled')); assert.equal(media.length, 2, 'disabled button silent');
  emit('focusin', { target: w.document.getElementById('next'), relatedTarget: menu });
  assert.equal(media.length, 3, 'keyboard focus feedback');
  tick(); emit('click', { target: child, isTrusted: true });
  assert.equal(media.length, 4, 'menu navigation click feedback');
  w.document.getElementById('opt-sfx').value = '0'; tick(); hover(menu);
  assert.equal(media.length, 4, 'zero SFX volume skips playback entirely');
  w.document.getElementById('opt-sfx').remove(); w.document.getElementById('opt-vol').value = '20';
  tick(); hover(card); assert.equal(media.length, 5, 'master volume fallback plays');
  assert(Math.abs(media[4].volume - 0.2 * 0.18) < 1e-9, 'master fallback gain');
  // Native autoplay failures and missing Audio are harmless.
  media.forEach(a => { a.paused = true; });
  w.Audio = function () { throw Error('no audio'); };
  assert.doesNotThrow(() => w.DCAudio.playSfx('ui-click'));
  w.Audio = function () { return { addEventListener() {}, play() { return Promise.reject(Error('blocked autoplay')); } }; };
  assert.doesNotThrow(() => w.DCAudio.playSfx('ui-click'));
  await new Promise(resolve => setImmediate(resolve));
  h.dom.window.close();
  // Exceptions/rejections in replacement DCAudio must not stop menu click handlers.
  for (const mode of ['throw', 'reject', 'missing']) {
    const x = fixture(); x.load('js/ui/audio-feedback.js');
    x.w.DCAudio = mode === 'missing' ? undefined : { playSfx() {
      if (mode === 'throw') throw Error('test audio');
      return Promise.reject(Error('test audio rejection'));
    } };
    x.emit('keydown', { isTrusted: true });
    assert.doesNotThrow(() => x.hover(x.w.document.getElementById('menu')));
    let navigated = false;
    const el = x.w.document.getElementById('menu');
    el.onclick = () => { navigated = true; };
    el.click(); assert(navigated, `${mode}: menu navigation continues`);
    await new Promise(resolve => setImmediate(resolve)); x.dom.window.close();
  }
  console.log('PASS menu/card hover, child dedup, cooldown, keyboard focus, navigation, activation, volume, audio failure isolation');
}
main().catch(e => { console.error(e); process.exitCode = 1; });
