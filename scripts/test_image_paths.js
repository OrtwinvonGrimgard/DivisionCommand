/* Image request audit: every card/help/menu/preload image URL must be an existing file; no extension/folder probes. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const WEB = path.join(__dirname, '../Division_Command_0.5a/web');
const { files } = require('./build_image_manifest'); // regenerates + returns disk listing
const manifestSrc = fs.readFileSync(path.join(WEB, 'js/data/image-manifest.js'), 'utf8');
const { setup } = require('./test_audio_actions');
const h = setup('off'), { w } = h;
assert.deepEqual([...w.DC_CARD_FILES], files, 'manifest matches disk exactly');
const exists = url => {
  if (!url || /^(data:|blob:)/.test(url)) return true;
  const rel = decodeURIComponent(url.replace(/^https?:\/\/[^/]+\//, '').replace(/^\.\//, '').split('?')[0]);
  return fs.existsSync(path.join(WEB, rel)) && fs.readdirSync(path.dirname(path.join(WEB, rel))).includes(path.basename(rel)); // case-exact
};
// 1) all catalog cards resolve to one exact file
const cards = w.DC_CATALOG.cards; let resolved = 0; const gaps = [];
for (const c of cards) {
  if (!c.image) continue;
  const f = w.dcCardFile(c.image);
  if (f) { resolved++; assert(exists('assets/cards/' + f), f); } else gaps.push(c.id + ' ' + c.image);
}
// 2) record every image URL the app requests (Image() preloads + <img src>)
const requested = new Set();
const desc = Object.getOwnPropertyDescriptor(w.HTMLImageElement.prototype, 'src');
Object.defineProperty(w.HTMLImageElement.prototype, 'src', { configurable: true, get: desc.get, set(v) { requested.add(String(v)); desc.set.call(this, v); } });
const origSetAttr = w.Element.prototype.setAttribute;
w.Element.prototype.setAttribute = function (k, v) { if (this.tagName === 'IMG' && k === 'src') requested.add(String(v)); return origSetAttr.call(this, k, v); };
// preload all card art exactly as startup does
cards.forEach(c => { const im = new w.Image(); im.src = w.dcCardSrc(c.image) || ''; });
w.dcRender && w.dcRender();
// rendered markup (hand/table/help/menu/library) incl. index.html static
const html = w.document.documentElement.outerHTML + fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
for (const m of html.matchAll(/<img[^>]*\ssrc="([^"]+)"/g)) requested.add(m[1].replace(/&amp;/g, '&'));
const bad = [...requested].filter(u => u && /assets\//.test(u) && !exists(u.replace(/&amp;/g, '&')));
assert.deepEqual(bad, [], 'no 404 image requests');
// 3) known old probes never generated
for (const probe of ['Nebel 1.png', 'assets/cards/Dschungelkrieger.jpg', 'assets/cards/Armageddon.jpg']) assert(![...requested].some(u => decodeURIComponent(u).endsWith(probe)), probe);
assert.equal(w.dcCardFile('token-nebel-1.png'), 'thumbs/token-nebel-1.jpg');
assert.equal(w.dcCardFile('does-not-exist.jpg'), '');
assert.equal(w.dcCardSrc('does-not-exist.jpg'), '');
assert(manifestSrc.length > 0);
console.log(`PASS ${resolved}/${cards.length} card images exact, ${requested.size} requested URLs all exist, gaps: ${gaps.length}${gaps.length ? ' ' + gaps.join(', ') : ''}`);
h.dom.window.close();
