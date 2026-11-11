/**
 * t268: Lesen und Schreiben von Kartenwerten in den kanonischen Quellen.
 *
 * - Typdateien `web/js/data/sets/types/*.js` (Set alpha und Nationen-Startersets): JSON-Arrays, werden
 *   byte-genau neu geschrieben (JSON.stringify, Einrückung 2).
 * - Nationenpool: Zeilen in `scripts/nation_pools/nations/*.js` (Typ|Name|Seltenheit|AP|ATK|DEF|Effekte|Flavor);
 *   danach baut `scripts/nation_pools/build.js` `nation_pools.js` neu (Text und Effekte aus denselben Bausteinen).
 *
 * Patchformat je Karten-ID: { ap?, atk?, def?, name?, text?, effects?, spec? } (spec nur für Poolkarten).
 * Export: `loadSources`, `applyPatch`, `poolCard`, `catalogNow`.
 */
'use strict';
const fs = require('fs'), path = require('path');
const REPO = path.resolve(__dirname, '../..');
const TYPES = path.join(REPO, 'Division_Command/web/js/data/sets/types');
const NATDIR = path.join(REPO, 'scripts/nation_pools/nations');
const TYPE_FILES = ['infanterie', 'panzer', 'artillerie', 'aufklaerung', 'elite', 'unterstuetzung', 'soforteinsatz', 'ausruestung', 'doktrinen'];

/**
 * Liest eine Typdatei als { head, arr, tail }.
 * @param {string} name Dateiname ohne .js
 * @returns {{file:string, head:string, arr:object[], tail:string}}
 */
function readType(name) {
  const file = path.join(TYPES, name + '.js'), s = fs.readFileSync(file, 'utf8');
  const i = s.indexOf('= [') + 2, j = s.lastIndexOf(']');
  return { file, head: s.slice(0, i), arr: JSON.parse(s.slice(i, j + 1)), tail: s.slice(j + 1) };
}

/**
 * Lädt alle Quellen: Typdateien und Poolzeilen, mit Index je Karten-ID.
 * @returns {{types:object, pool:object, index:object}}
 */
function loadSources() {
  const { build } = require('../nation_pools/build.js');
  const types = {}, index = {}, pool = {};
  for (const t of TYPE_FILES) {
    if (!fs.existsSync(path.join(TYPES, t + '.js'))) continue;
    types[t] = readType(t);
    types[t].arr.forEach((c, i) => { index[c.id] = { kind: 'type', t, i }; });
  }
  for (const f of fs.readdirSync(NATDIR).filter((x) => x.endsWith('.js')).sort()) {
    const file = path.join(NATDIR, f);
    delete require.cache[require.resolve(file)];
    const mod = require(file);
    pool[f] = { file, src: fs.readFileSync(file, 'utf8'), mod };
    for (const [nation, def] of Object.entries(mod)) def.cards.forEach((line, i) => {
      const c = build(nation, def.short, line, i);
      index[c.id] = { kind: 'pool', f, nation, short: def.short, i, line };
    });
  }
  return { types, pool, index };
}

/**
 * Baut eine Poolkarte aus einer (ggf. geänderten) Zeile, ohne etwas zu schreiben.
 * @param {object} ref Indexeintrag (kind 'pool')
 * @param {string} line Poolzeile
 * @returns {object} Kartendefinition wie in nation_pools.js
 */
function poolCard(ref, line) {
  const { build } = require('../nation_pools/build.js');
  return build(ref.nation, ref.short, line, ref.i);
}

/**
 * Setzt Felder einer Poolzeile.
 * @param {string} line
 * @param {object} p Patch
 * @returns {string}
 */
function patchLine(line, p) {
  const f = line.split('|');
  if (p.ap != null) f[3] = String(p.ap);
  if (p.atk != null) f[4] = String(p.atk);
  if (p.def != null) f[5] = String(p.def);
  if (p.spec != null) f[6] = p.spec;
  if (p.name != null) throw new Error('Poolkarten nicht umbenennen (ID hängt am Namen): ' + line);
  return f.join('|');
}

/**
 * Wendet einen Patch {id: änderungen} auf die Quellen an und schreibt die Dateien.
 * @param {object} patch
 * @param {{rebuild?: boolean}} [opt]
 * @returns {number} Anzahl geänderter Karten
 */
function applyPatch(patch, opt) {
  const S = loadSources();
  const dirtyT = new Set(), dirtyP = new Set();
  let n = 0;
  for (const [id, p] of Object.entries(patch)) {
    const ref = S.index[id];
    if (!ref) throw new Error('Unbekannte ID ' + id);
    if (ref.kind === 'type') {
      const c = S.types[ref.t].arr[ref.i];
      for (const k of ['ap', 'atk', 'def', 'name', 'text', 'effects', 'target']) if (p[k] !== undefined) c[k] = p[k];
      dirtyT.add(ref.t);
    } else {
      const P = S.pool[ref.f], nl = patchLine(ref.line, p);
      const q = JSON.stringify(ref.line), nq = JSON.stringify(nl);
      // Zeilen stehen in einfachen Anführungszeichen; Flavor kann Apostrophe enthalten → exakter Teilstring
      const sq = "'" + ref.line + "'";
      if (P.src.indexOf(sq) < 0) throw new Error('Zeile nicht gefunden ' + q);
      P.src = P.src.replace(sq, "'" + nl + "'");
      ref.line = nl; void nq;
      dirtyP.add(ref.f);
    }
    n++;
  }
  for (const t of dirtyT) { const T = S.types[t]; fs.writeFileSync(T.file, T.head + JSON.stringify(T.arr, null, 2) + T.tail); }
  for (const f of dirtyP) fs.writeFileSync(S.pool[f].file, S.pool[f].src);
  if (dirtyP.size && (!opt || opt.rebuild !== false)) {
    require('child_process').execFileSync('node', [path.join(REPO, 'scripts/nation_pools/build.js')], { stdio: 'ignore' });
  }
  return n;
}

/**
 * IDs, die ein Test mit festen Werten prüft (tests/*.js|mjs): Profil- und Balance-Schritte lassen sie unverändert,
 * damit frühere Entscheidungen (t231–t267) nicht still kippen.
 * @returns {Set<string>}
 */
function protectedIds() {
  const dir = path.join(REPO, 'tests'), ids = new Set();
  for (const f of fs.readdirSync(dir).filter((x) => /\.(m?js)$/.test(x))) {
    const s = fs.readFileSync(path.join(dir, f), 'utf8');
    (s.match(/dc_[a-z0-9_]+/g) || []).forEach((m) => ids.add(m));
  }
  return ids;
}

/**
 * Aktueller Katalog (frisch geladen, ohne Cache).
 * @returns {object[]} DC_CATALOG.cards
 */
function catalogNow() {
  const lg = require.resolve('../nation_pools/load_game.js');
  delete require.cache[lg];
  return require(lg).loadGame({ quiet: true }).DC_CATALOG.cards;
}

module.exports = { loadSources, applyPatch, poolCard, catalogNow, patchLine, protectedIds, REPO };
