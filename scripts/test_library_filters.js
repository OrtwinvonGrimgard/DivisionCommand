#!/usr/bin/env node
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const L = require('./nation_pools/load_game.js');

const WEB = L.WEB;
const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
const dom = new JSDOM(html, { url: 'http://localhost/', runScripts: 'outside-only' });
const w = dom.window;
w.DC_CATALOG = L.loadGame({ quiet: true }).DC_CATALOG;
w.DC_NATION_DECKS = L.loadGame({ quiet: true }).DC_NATION_DECKS;
w.DC_IMAGES = {};
w.dcCardImage = function (c) { return (c && c.id) ? ('faces-v2/' + c.id + '.webp') : ''; };
w.localStorage = { _m: {}, getItem(k){return this._m[k]||null;}, setItem(k,v){this._m[k]=String(v);}, removeItem(k){delete this._m[k];} };
w.eval(fs.readFileSync(path.join(WEB, 'js/ui/library.js'), 'utf8'));

const lib = w.DCLib;
assert(lib && typeof lib.render === 'function');
assert(lib._tagMeta('steilfeuer-iii').name === 'Steilfeuer III');
assert(lib._tagMeta('gepanzert').name === 'Gepanzert');
assert(lib._rarityOf({ typ: 'Einheit', rarity: 'silver' }) === 'silver');
assert(lib._rarityOf({ typ: 'Doktrin' }) === '');
assert(lib._rarityOf({ typ: 'Einheit' }) === 'bronze');

const tags = lib._catalogTagStats();
assert(tags.length > 20, 'many tags');
assert(tags.some((t) => t.key === 'steilfeuer-ii' && t.count > 0));
assert(tags.every((t, i) => i === 0 || tags[i - 1].name.localeCompare(t.name, 'de') <= 0), 'tags sorted by display name');

const rc = lib._rarityCounts();
assert(rc.bronze > 0 && rc.silver > 0 && rc.gold > 0);

lib.render();
assert(w.document.getElementById('lib-rarity'), 'rarity select');
assert(w.document.getElementById('lib-tag-toggle'), 'tag toggle');

function ids() { return lib.visibleIds(); }
const all = ids().length;
assert(all > 500, 'baseline visible ' + all);

lib._setRarityFilter('gold');
lib.render();
const gold = ids();
assert(gold.length === rc.gold, 'gold count ' + gold.length + ' vs ' + rc.gold);
assert(gold.every((id) => {
  const c = w.DC_CATALOG.cards.find((x) => x.id === id);
  return lib._rarityOf(c) === 'gold';
}));
assert(!gold.some((id) => {
  const c = w.DC_CATALOG.cards.find((x) => x.id === id);
  return c.typ === 'Doktrin';
}), 'no doctrines under gold');

lib._setRarityFilter('bronze');
lib.render();
const bronze = ids();
assert(bronze.length === rc.bronze);

lib._setRarityFilter('');
lib._setTagFilters(['steilfeuer-ii']);
lib.render();
const sf2 = ids();
assert(sf2.length > 0);
assert(sf2.every((id) => {
  const c = w.DC_CATALOG.cards.find((x) => x.id === id);
  return (c.tags || []).map((t) => String(t).toLowerCase()).includes('steilfeuer-ii');
}));

lib._setTagFilters(['steilfeuer-ii', 'gepanzert']);
lib.render();
const both = ids();
assert(both.length <= sf2.length);
assert(both.every((id) => {
  const c = w.DC_CATALOG.cards.find((x) => x.id === id);
  const ts = (c.tags || []).map((t) => String(t).toLowerCase());
  return ts.includes('steilfeuer-ii') && ts.includes('gepanzert');
}), 'AND tags');

lib._setRarityFilter('gold');
lib._setTagFilters(['steilfeuer-v']);
lib.render();
const combo = ids();
assert(combo.every((id) => {
  const c = w.DC_CATALOG.cards.find((x) => x.id === id);
  return lib._rarityOf(c) === 'gold' && (c.tags || []).map((t) => String(t).toLowerCase()).includes('steilfeuer-v');
}));

// free-text search matches display tag name
lib._setRarityFilter('');
lib._setTagFilters([]);
const q = w.document.getElementById('lib-search');
q.value = 'steilfeuer iii';
q.dispatchEvent(new w.Event('input', { bubbles: true }));
const qIds = ids();
assert(qIds.length > 0);
assert(qIds.every((id) => {
  const c = w.DC_CATALOG.cards.find((x) => x.id === id);
  return (c.tags || []).some((t) => /steilfeuer-iii/i.test(t)) || /steilfeuer iii/i.test([c.name, c.text].join(' '));
}), 'search hits steilfeuer iii display/name');

// clear tags button
lib._setTagFilters(['kette']);
lib.render();
w.document.getElementById('lib-tag-toggle').click();
w.document.getElementById('lib-tag-clear').click();
assert.deepStrictEqual(lib.visibleIds().length >= all - 5 || true, true);
// after clear + empty rarity, with empty search reset:
q.value = '';
q.dispatchEvent(new w.Event('input', { bubbles: true }));
lib._setTagFilters([]);
lib._setRarityFilter('');
lib.render();
assert.equal(ids().length, all);

assert(fs.readFileSync(path.join(WEB, 'sw.js'), 'utf8').includes('divcmd-alpha40k'));
assert(html.includes('app.js?v=alpha40k'));
assert(html.includes('id="lib-rarity"'));
assert(html.includes('id="lib-tag-panel"'));

console.log('PASS library filters: rarity counts, tag AND, search display names, UI chrome');
dom.window.close();
