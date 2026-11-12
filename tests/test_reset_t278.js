/**
 * t278: „Spielstand zurücksetzen“.
 * 1. Jeder Speicherschlüssel, den der Code benutzt, beginnt mit `dc_` (sonst bliebe er beim Zurücksetzen liegen)
 *    und steht in `KNOWN_KEYS` (Dialogtext vollständig).
 * 2. `wipeAll` löscht alle `dc_`-Schlüssel aus localStorage und sessionStorage, lässt fremde Schlüssel stehen
 *    und löscht die IndexedDB `dc_playtest`.
 * 3. Danach gilt der Erststart wieder: `DCTutorial.shouldAutoStart()` ist true.
 * 4. Knöpfe in Optionen › System und auf dem Startbildschirm, Skript und Cache eingebunden.
 * Läuft über `npm test` von der Repo-Wurzel. Keine Produktlogik.
 */
'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const WEB = path.join(__dirname, '..', 'Division_Command', 'web');

/**
 * Alle Dateien mit Endung unter einem Ordner.
 * @param {string} dir
 * @param {RegExp} re
 * @returns {string[]}
 */
function walk(dir, re) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'assets') out = out.concat(walk(p, re)); } else if (re.test(e.name)) out.push(p);
  }
  return out;
}

/* ---------- 1. Schlüssel aus dem Code ---------- */
const files = walk(path.join(WEB, 'js'), /\.js$/).concat([path.join(WEB, 'index.html')]);
const keys = new Set();
const dynamic = [];
for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  for (const m of src.matchAll(/(?:localStorage|sessionStorage)\.(?:get|set|remove)Item\(\s*(['"])([^'"]+)\1/g)) keys.add(m[2]);
  for (const m of src.matchAll(/(?:KEY|PREF_KEY|DB_NAME)\s*=\s*'([^']+)'/g)) keys.add(m[1]);
  for (const m of src.matchAll(/(?:localStorage|sessionStorage)\.(?:get|set|remove)Item\(\s*([A-Za-z_][\w.]*)\s*[,)]/g)) dynamic.push(path.basename(f) + ':' + m[1]);
}
const R = (() => {
  const win = {};
  vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/ui/reset.js'), 'utf8'), { window: win, Promise, setTimeout, clearTimeout });
  return win.DCReset;
})();
assert.ok(keys.size >= 10, 'Schlüssel gefunden: ' + [...keys].join(','));
for (const k of keys) {
  assert.ok(k.startsWith(R.PREFIX), 'Schlüssel ohne Präfix dc_: ' + k);
  if (k !== 'dc_playtest') assert.ok(k in R.KNOWN_KEYS, 'Schlüssel fehlt in KNOWN_KEYS: ' + k);
}
assert.ok(R.DATABASES.includes('dc_playtest'));
// Dynamische Zugriffe nur über bekannte Hilfen (Parameter `key`, `KEY`, `PREF_KEY`)
for (const d of dynamic) assert.ok(/:(key|KEY|PREF_KEY|k)$/.test(d), 'unbekannter dynamischer Speicherzugriff ' + d);

/* ---------- 2./3. Löschen ---------- */
/**
 * Einfacher Storage-Ersatz mit key()/length wie im Browser.
 * @param {Object<string,string>} init
 * @returns {object}
 */
function fakeStorage(init) {
  const m = new Map(Object.entries(init));
  return {
    get length() { return m.size; },
    key: (i) => [...m.keys()][i] ?? null,
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => { m.set(k, String(v)); },
    removeItem: (k) => { m.delete(k); },
    _keys: () => [...m.keys()].sort(),
  };
}
(async () => {
  const local = fakeStorage({
    dc_users: '[{"id":"u1","name":"Alt"}]', dc_user_active: 'u1', dc_decks: '[]', dc_tutorial_done: '{"v":1,"how":"done"}',
    dc_settings: '{}', dc_vol: '40', dc_camera_prefs: '{}', fremd_app: 'bleibt', 'dc-nicht': 'bleibt'
  });
  const session = fakeStorage({ dc_tmp: '1', other: 'x' });
  const deleted = [];
  let closed = 0;
  const idb = { deleteDatabase(n) { deleted.push(n); const r = {}; setTimeout(() => r.onsuccess && r.onsuccess(), 5); return r; } };
  const win = { localStorage: local, sessionStorage: session, indexedDB: idb, DCPlayStore: { closeDb: () => { closed++; return Promise.resolve(); } }, location: { search: '' } };
  win.window = win;
  const ctx = { window: win, localStorage: local, location: win.location, Promise, setTimeout, clearTimeout, JSON, Date, console };
  vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/ui/reset.js'), 'utf8'), ctx);
  vm.runInNewContext(fs.readFileSync(path.join(WEB, 'js/ui/tutorial.js'), 'utf8'), ctx);
  assert.strictEqual(win.DCTutorial.shouldAutoStart(), false, 'vorher: kein Erststart');
  assert.strictEqual(win.DCReset.inventory().local.length, 7);
  const res = await win.DCReset.wipeAll();
  assert.deepStrictEqual(local._keys(), ['dc-nicht', 'fremd_app'], 'nur dc_-Schlüssel gelöscht');
  assert.deepStrictEqual(session._keys(), ['other']);
  assert.deepStrictEqual(deleted, ['dc_playtest'], 'IndexedDB gelöscht');
  assert.strictEqual(res.databases.dc_playtest, 'deleted');
  assert.strictEqual(closed, 1, 'offene Playtest-DB vorher geschlossen');
  assert.strictEqual(res.removed.length, 8);
  assert.strictEqual(win.DCTutorial.shouldAutoStart(), true, 'nachher: Erststart → Tutorial');

  /* ---------- 4. Einbindung ---------- */
  const html = fs.readFileSync(path.join(WEB, 'index.html'), 'utf8');
  assert.ok(/id="opt-reset"/.test(html) && /id="boot-reset"/.test(html), 'Knöpfe vorhanden');
  assert.ok(html.indexOf('id="opt-reset"') > html.indexOf('id="opt-sys"'), 'Knopf in Optionen › System');
  assert.ok(html.includes('js/ui/reset.js') && html.includes('css/reset.css'), 'eingebunden');
  assert.ok(!/localStorage\.clear\(\)/.test(fs.readFileSync(path.join(WEB, 'js/ui/reset.js'), 'utf8')), 'kein globales clear()');
  const sw = fs.readFileSync(path.join(WEB, 'sw.js'), 'utf8');
  assert.ok(sw.includes('js/ui/reset.js') && sw.includes("'divcmd-alpha44a'"), 'Offline-Cache');
  console.log('PASS reset t278: ' + keys.size + ' Speicherschlüssel mit dc_, Löschen nach Präfix + IndexedDB, danach Erststart');
})().catch((e) => { console.error(e); process.exit(1); });
