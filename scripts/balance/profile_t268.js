#!/usr/bin/env node
/**
 * t268: Eigene Profile für Karten mit identischen Werten und Texten.
 *
 * Funktionsschlüssel einer Karte = Typ|Klasse|AP|ATK|DEF|Tags + Schlüsselwörter + Kartentext.
 * Phase 1: Jede Gruppe mit gleichem Funktionsschlüssel behält genau eine Karte unverändert (Set alpha vor
 * Nationen-Starterset vor Pool); die übrigen erhalten die erste freie Variante:
 *   Einheiten   – Wertetausch ATK↔DEF (±1, ±2) oder Kosten ±1 mit Werten ±2 (Text bleibt).
 *   Nicht-Einheiten – Zahl im Effekt ±1 mit AP ±1, Tausch zweier Zahlen bei gleichen AP, kleiner Zusatz
 *                 (Pool: „ziehe 1“, „Wird der Träger zerstört: ziehe 1“) gegen +1 AP; zuletzt nur AP ±1.
 * Phase 2: Nicht-Einheiten mit gleichem Text (unabhängig von AP) werden auf höchstens MAXTEXT Karten je Text
 *   gebracht, soweit eine textändernde Variante frei ist.
 * Texte entstehen immer aus denselben Effektparametern (Pool: build.js; Starterset: dieselbe Zahl im Text und
 * im Effektparameter), damit die Engine weiter genau den gedruckten Text ausführt.
 *
 * Aufruf: node scripts/balance/profile_t268.js [--dry] → scripts/balance/out/profile_t268.json
 */
'use strict';
const fs = require('fs'), path = require('path');
const L = require('./cards_t268.js');
const MAXTEXT = Number(process.env.MAXTEXT || 3);
const DRY = process.argv.includes('--dry');
const PROT = L.protectedIds();

/**
 * Funktionsschlüssel (sichtbare Funktion) einer Kartendefinition.
 * @param {object} c
 * @returns {string}
 */
function fkey(c) {
  return [c.typ, c.klasse || '', c.ap, c.typ === 'Einheit' ? c.atk : '', c.typ === 'Einheit' ? c.def : '', (c.tags || []).slice().sort().join(','),
    (c.keywords || []).slice().sort().join('+'), (c.text || '').trim()].join('|');
}
/**
 * Wirkungsschlüssel: Werte + Schlüsselwörter + Effektcodes (fängt gleiche Wirkung mit anderer Formulierung).
 * @param {object} c
 * @returns {string}
 */
function ekey(c) {
  return [c.typ, c.klasse || '', c.ap, c.typ === 'Einheit' ? c.atk : '', c.typ === 'Einheit' ? c.def : '', (c.tags || []).slice().sort().join(','),
    (c.keywords || []).slice().sort().join('+'), JSON.stringify(c.effects || [])].join('|');
}
/**
 * Textschlüssel (nur Schlüsselwörter + Text).
 * @param {object} c
 * @returns {string}
 */
function tkey(c) { return c.typ + '|' + (c.keywords || []).slice().sort().join('+') + '|' + (c.text || '').trim(); }

const UNIT_D = [[0, 1, -1], [0, -1, 1], [1, 1, 1], [-1, -1, -1], [0, 2, -2], [0, -2, 2], [1, 2, 0], [1, 0, 2], [-1, -2, 0], [-1, 0, -2], [1, 3, -1], [1, -1, 3], [-1, 1, -3], [-1, -3, 1], [1, 2, 1], [1, 1, 2], [0, 1, 0], [0, 0, 1], [0, -1, 0], [0, 0, -1]];
const PARAMS = ['value', 'atk', 'def', 'n', 'draw', 'amount', 'bonus', 'heal', 'ap'];

/**
 * Ersetzt das einzige Vorkommen der Zahl v im Text durch w; null, wenn nicht eindeutig.
 * @param {string} text
 * @param {number} v
 * @param {number} w
 * @returns {string|null}
 */
function swapNum(text, v, w) {
  const rx = new RegExp('(^|[^\\d])' + v + '(?![\\d])', 'g');
  const m = text.match(rx);
  if (!m || m.length !== 1) return null;
  const out = text.replace(rx, (s, pre) => pre + w);
  // Singular/Plural direkt hinter der geänderten Zahl angleichen („1 Karte“ ↔ „2 Karten“)
  return out.replace(new RegExp('(^|[^\\d])' + w + ' Karten?\\b'), (s, pre) => pre + w + (String(w) === '1' ? ' Karte' : ' Karten'));
}

/**
 * Varianten einer Karte aus dem Typdatei-Bestand (Starterset/alpha).
 * @param {object} c Kartendefinition
 * @returns {{p:object, textChange:boolean, card:object}[]}
 */
function typeVariants(c) {
  const out = [];
  if (c.typ === 'Einheit') {
    for (const [da, dk, dd] of UNIT_D) {
      const ap = c.ap + da, atk = c.atk + dk, def = c.def + dd;
      if (ap < 1 || ap > 7 || def < 1 || atk < (c.atk > 0 ? 1 : 0)) continue;
      out.push({ p: { ap, atk, def }, textChange: false, card: Object.assign({}, c, { ap, atk, def }) });
    }
    return out;
  }
  const text = c.text || '';
  const fx = c.effects || [];
  const minAp = c.typ === 'Soforteinsatz' ? 0 : 1; // Soforteinsätze mit 0 AP gibt es bereits (z. B. Lagebesprechung)
  // Zahl ±1 mit AP ±1
  fx.forEach((e, ei) => {
    const p = e.param || {};
    PARAMS.forEach((k) => {
      const v = p[k];
      if (typeof v !== 'number' || !Number.isInteger(v) || v === 0) return;
      const av = Math.abs(v), sg = Math.sign(v);
      for (const [dv, da] of [[1, 1], [-1, -1]]) {
        const nv = av + dv, ap = c.ap + da;
        if (nv < 1 || ap < minAp || ap > 7) continue;
        const t2 = swapNum(text, av, nv);
        if (!t2) continue;
        const eff = JSON.parse(JSON.stringify(fx)); eff[ei].param[k] = sg * nv;
        out.push({ p: { ap, text: t2, effects: eff }, textChange: true, card: Object.assign({}, c, { ap, text: t2, effects: eff }), step: 'n' + ei + k });
      }
    });
    // Tausch zweier Zahlen bei gleichen AP (z. B. Träger +1 ATK und +2 DEF)
    const ks = PARAMS.filter((k) => typeof p[k] === 'number' && p[k] > 0);
    for (let a = 0; a < ks.length; a++) for (let b = 0; b < ks.length; b++) {
      if (a === b) continue;
      const va = p[ks[a]], vb = p[ks[b]];
      if (va === vb || vb - 1 < 1) continue;
      let t2 = swapNum(text, va, '\u0001'); if (!t2) continue;
      t2 = swapNum(t2, vb, vb - 1); if (!t2) continue;
      t2 = t2.replace('\u0001', String(va + 1));
      const eff = JSON.parse(JSON.stringify(fx)); eff[ei].param[ks[a]] = va + 1; eff[ei].param[ks[b]] = vb - 1;
      out.push({ p: { text: t2, effects: eff }, textChange: true, card: Object.assign({}, c, { text: t2, effects: eff }), trade: true, step: 'n' + ei + ks[a] });
    }
  });
  // Ausrüstung nur mit EQUIP_STAT und Standardsatz: Werte tauschen, Satz neu erzeugen
  // Erster Satz aus festem Muster (EQUIP_STAT, Abschnitts-Aura, BUFF): ATK↔DEF tauschen, Satz neu erzeugen
  const PH = [
    { code: 'EQUIP_STAT', ok: (q) => !q.only, f: (a, d) => 'Träger ' + [a ? '+' + a + ' ATK' : '', d ? '+' + d + ' DEF' : ''].filter(Boolean).join(' und ') + '.' },
    { code: 'CM', ok: (q) => q.k === 'aura' && q.scope === 'section', f: (a, d) => 'Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort ' + [a ? '+' + a + ' ATK' : '', d ? '+' + d + ' DEF' : ''].filter(Boolean).join(' und ') + '.' },
    { code: 'BUFF', ok: (q) => q.until === 'turn' && !q.enemy && /^Wähle eine eigene Fronteinheit: /.test(text), f: (a, d) => 'Wähle eine eigene Fronteinheit: ' + [a ? '+' + a + ' ATK bis Zugende' : '', d ? '+' + d + ' DEF' : ''].filter(Boolean).join(', ') + '.' },
  ];
  const e0 = fx[0], q0 = (e0 && e0.param) || {};
  for (const ph of PH) {
    if (!e0 || e0.code !== ph.code || !ph.ok(q0) || (q0.atk || 0) < 0 || (q0.def || 0) < 0) continue;
    const pre = ph.f(q0.atk || 0, q0.def || 0);
    if (!text.trim().startsWith(pre)) continue;
    const rest = text.trim().slice(pre.length);
    for (const [x, y, da] of [[1, -1, 0], [-1, 1, 0], [1, 0, 1], [0, 1, 1], [-1, 0, -1], [0, -1, -1]]) {
      const a = (q0.atk || 0) + x, d = (q0.def || 0) + y, ap = c.ap + da;
      if (a < 0 || d < 0 || a + d === 0 || ap < 1 || ap > 7) continue;
      const eff = JSON.parse(JSON.stringify(fx)); eff[0].param.atk = a; eff[0].param.def = d;
      const t2 = ph.f(a, d) + rest;
      out.push({ p: { ap, text: t2, effects: eff }, textChange: true, card: Object.assign({}, c, { ap, text: t2, effects: eff }), trade: !da, step: 'n0atk' });
    }
  }
  // Zusatz gegen +1 AP: Soforteinsatz „Ziehe 1 Karte.“, Ausrüstung „Wird der Träger zerstört, ziehst du 1 Karte.“
  const rider = c.typ === 'Soforteinsatz' && !fx.some((e) => /DRAW/.test(e.code)) ? [' Ziehe 1 Karte.', { code: 'DRAW', param: { value: 1 } }]
    : c.typ === 'Ausrüstung' && !fx.some((e) => e.code === 'ON_DESTROY_DRAW') ? [' Wird der Träger zerstört, ziehst du 1 Karte.', { code: 'ON_DESTROY_DRAW', param: { draw: 1 } }]
    : c.typ === 'Unterstützung' && !fx.some((e) => e.code === 'CM' && e.param && e.param.k === 'turnheal') ? [' Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit.', { code: 'CM', param: { k: 'turnheal', n: 1 } }] : null;
  if (rider && c.ap + 1 <= 7) {
    const t2 = text.trim().replace(/\.?$/, '.') + rider[0], eff = fx.concat([rider[1]]);
    out.push({ p: { ap: c.ap + 1, text: t2, effects: eff }, textChange: true, card: Object.assign({}, c, { ap: c.ap + 1, text: t2, effects: eff }), step: 'rider' });
  }
  out.sort((x, y) => (y.trade ? 1 : 0) - (x.trade ? 1 : 0));
  for (const da of [1, -1]) {
    const ap = c.ap + da;
    if (ap >= minAp && ap <= 7) out.push({ p: { ap }, textChange: false, card: Object.assign({}, c, { ap }) });
  }
  return out;
}

/**
 * Varianten einer Poolkarte (über die Poolzeile, Text aus build.js).
 * @param {object} ref Indexeintrag
 * @param {object} c aktuelle Kartendefinition
 * @returns {{p:object, textChange:boolean, card:object}[]}
 */
function poolVariants(ref, c, line0) {
  line0 = line0 || ref.line;
  const f = line0.split('|');
  const ap0 = +f[3], spec = f[6];
  const out = [];
  const minAp = c.typ === 'Soforteinsatz' ? 0 : 1;
  const mk = (p, textChange, tag, step) => {
    try {
      const line = L.patchLine(line0, p);
      const card = L.poolCard(ref, line);
      out.push({ p, textChange, card, tag, line, step: step || tag });
    } catch (e) { /* ungültige Variante (z. B. gemischte Zielseiten) */ }
  };
  if (c.typ === 'Einheit') {
    for (const [da, dk, dd] of UNIT_D) {
      const ap = ap0 + da, atk = +f[4] + dk, def = +f[5] + dd;
      if (ap < 1 || ap > 7 || def < 1 || atk < (+f[4] > 0 ? 1 : 0)) continue;
      mk({ ap, atk, def }, false);
    }
    return out;
  }
  const toks = spec.split('+');
  // Tausch zweier Zahlen in einem Baustein (stat:a:d, buff:a:d) bei gleichen AP
  toks.forEach((t, ti) => {
    const [k, ...args] = t.split(':');
    const nums = args.map((x) => (/^-?\d+$/.test(x) ? +x : null));
    if (['stat', 'buff'].includes(k) && nums[0] != null && nums[1] != null) {
      for (const [x, y] of [[1, -1], [-1, 1]]) {
        const a = nums[0] + x, d = nums[1] + y;
        if (a < 0 || d < 0 || a + d === 0) continue;
        const nt = toks.slice(); nt[ti] = [k, a, d].concat(args.slice(2)).join(':');
        mk({ spec: nt.join('+') }, true, 'trade', 't' + ti);
      }
    }
  });
  // Beschränkung auf eine Klasse gegen +1 Wert (stat:a:d → stat:a+1:d:infanterie usw.)
  toks.forEach((t, ti) => {
    const [k, ...args] = t.split(':');
    if (k !== 'stat' || args.length > 2) return;
    for (const only of ['infanterie', 'panzer', 'artillerie']) for (const [x, y] of [[1, 0], [0, 1]]) {
      const nt = toks.slice(); nt[ti] = ['stat', +args[0] + x, +args[1] + y, only].join(':');
      mk({ spec: nt.join('+') }, true, 'only', 't' + ti);
    }
  });
  // Zahl ±1 mit AP ±1
  toks.forEach((t, ti) => {
    const [k, ...args] = t.split(':');
    args.forEach((x, ai) => {
      if (!/^\d+$/.test(x) || +x === 0) return;
      if (k === 'dd' && ai === 1) return; // Abwurf bleibt 1
      if ((k === 'stat' || k === 'buff') && ai > 1) return;
      for (const [dv, da] of [[1, 1], [-1, -1]]) {
        const nv = +x + dv, ap = ap0 + da;
        if (nv < 1 || ap < minAp || ap > 7) continue;
        const na = args.slice(); na[ai] = String(nv);
        const nt = toks.slice(); nt[ti] = [k].concat(na).join(':');
        mk({ spec: nt.join('+'), ap }, true, 'num', 't' + ti);
      }
    });
  });
  // Kleiner Zusatz gegen +1 AP (Aufdecken/Beobachten ohne Aufpreis)
  const RIDERS = {
    Soforteinsatz: [['draw:1', 1], ['obs', 0], ['cost:Einheit:1', 1], ['heal:1', 1], ['buff:1:0', 1], ['buff:0:1', 1], ['dmg:1', 1], ['secdef:1', 1], ['secatk:1', 1]],
    'Ausrüstung': [['odraw:1', 1], ['first:1', 1], ['bonus:1', 1], ['stat:0:1', 1], ['stat:1:0', 1], ['cond:1', 1]],
    'Unterstützung': [['theal:1', 1], ['sdef:0:1', 1], ['sdef:1:0', 1], ['tdraw', 2], ['tap', 2], ['red', 2], ['eatk', 2], ['fatk', 3]],
  };
  for (const [r, da] of RIDERS[c.typ] || []) {
    const k = r.split(':')[0];
    if (toks.some((t) => t.split(':')[0] === k)) continue;
    if (ap0 + da <= 7) mk({ spec: spec + '+' + r, ap: ap0 + da }, true, 'rider', 'rider');
  }
  for (const da of [1, -1]) { const ap = ap0 + da; if (ap >= minAp && ap <= 7) mk({ ap }, false); }
  return out;
}

/**
 * Rangfolge, welche Karte einer Gruppe unverändert bleibt.
 * @param {object} c
 * @returns {number}
 */
function rank(c) { if (PROT.has(c.id)) return -1; return { set_alpha: 0, set_tactical_review: 0, set_nations: 1, set_nation_pool: 2 }[c.set] ?? 3; }

/**
 * Hauptablauf: Gruppen bilden, Varianten wählen, Patch schreiben und anwenden.
 */
function main() {
  const S = L.loadSources();
  const cur = {};
  for (const [id, ref] of Object.entries(S.index)) {
    if (ref.kind === 'type') { const c = S.types[ref.t].arr[ref.i]; if (c.typ === 'Doktrin' || c.typ === 'Token') continue; cur[id] = c; }
    else cur[id] = L.poolCard(ref, ref.line);
  }
  const taken = new Map();
  const both = (c) => ['F' + fkey(c), 'E' + ekey(c)];
  Object.values(cur).forEach((c) => both(c).forEach((k) => taken.set(k, (taken.get(k) || 0) + 1)));
  const isFree = (c) => both(c).every((k) => !taken.get(k));
  const textCount = new Map();
  const bumpText = (c, d) => { if (c.typ === 'Einheit') return; const k = tkey(c); textCount.set(k, (textCount.get(k) || 0) + d); };
  Object.values(cur).forEach((c) => bumpText(c, 1));
  const patch = {}, unresolved = [];
  /**
   * Varianten Stufe 1, danach Kombinationen zweier Schritte (Netto-AP höchstens ±1), jeweils relativ zum Ausgangsstand.
   */
  const variants = (id) => {
    const ref = S.index[id], base = orig[id];
    const v1 = ref.kind === 'type' ? typeVariants(base) : poolVariants(ref, base, ref.line);
    const v2 = [];
    for (const v of v1) {
      const sub = ref.kind === 'type' ? typeVariants(v.card) : poolVariants(ref, v.card, v.line);
      for (const w of sub) {
        if (Math.abs((w.card.ap || 0) - (base.ap || 0)) > 2) continue;
        if (base.typ !== 'Einheit' && !w.textChange) continue; // kein Gratis-Zusatz über „Zusatz +1 AP, dann AP −1“
        if (base.typ !== 'Einheit' && v.step && v.step === w.step) continue; // nicht zweimal dieselbe Zahl bzw. zwei Zusätze
        const p = Object.assign({}, v.p, w.p);
        if (ref.kind === 'pool') { const f = w.line.split('|'); Object.assign(p, { ap: +f[3], spec: f[6] }, base.typ === 'Einheit' ? { atk: +f[4], def: +f[5] } : {}); }
        v2.push({ p, textChange: v.textChange || w.textChange, card: w.card, line: w.line });
      }
    }
    const near = (v) => Math.abs((v.card.ap || 0) - (base.ap || 0)) <= 1;
    return v1.concat(v2.filter(near), v2.filter((v) => !near(v))).filter((v) => fkey(v.card) !== fkey(base) && ekey(v.card) !== ekey(base));
  };
  const orig = Object.assign({}, cur);
  /**
   * Übernimmt eine Variante in den Arbeitsstand.
   */
  const take = (id, v) => {
    const old = cur[id];
    both(old).forEach((k) => taken.set(k, taken.get(k) - 1)); bumpText(old, -1);
    cur[id] = v.card; both(v.card).forEach((k) => taken.set(k, (taken.get(k) || 0) + 1)); bumpText(v.card, 1);
    patch[id] = v.p;
  };
  // Phase 1: gleiche Funktion
  const groups = {};
  Object.entries(cur).forEach(([id, c]) => { both(c).forEach((k) => { (groups[k] = groups[k] || []).push(id); }); });
  for (const [gk, ids] of Object.entries(groups)) {
    if (ids.length < 2) continue;
    ids.sort((a, b) => rank(cur[a]) - rank(cur[b]) || a.localeCompare(b));
    for (const id of ids.slice(1)) {
      if (!both(cur[id]).includes(gk) || (taken.get(gk) || 0) < 2) continue; // schon aufgelöst
      if (PROT.has(id)) { unresolved.push(id); continue; } // von Tests festgeschrieben
      const vs = variants(id);
      const free = (v) => isFree(v.card);
      const best = vs.find((v) => free(v) && (!v.textChange || (textCount.get(tkey(v.card)) || 0) < MAXTEXT))
        || vs.find((v) => free(v));
      if (best) take(id, best); else unresolved.push(id);
    }
  }
  // Phase 2: gleicher Text bei Nicht-Einheiten
  const tg = {};
  Object.entries(cur).forEach(([id, c]) => { if (c.typ !== 'Einheit') (tg[tkey(c)] = tg[tkey(c)] || []).push(id); });
  for (const ids of Object.values(tg)) {
    if (ids.length <= MAXTEXT) continue;
    ids.sort((a, b) => rank(cur[a]) - rank(cur[b]) || a.localeCompare(b));
    for (const id of ids.slice(MAXTEXT)) {
      if ((textCount.get(tkey(cur[id])) || 0) <= MAXTEXT) break;
      if (PROT.has(id)) continue;
      const v = variants(id).find((x) => x.textChange && isFree(x.card) && Math.abs((x.card.ap || 0) - (orig[id].ap || 0)) <= 1 && (textCount.get(tkey(x.card)) || 0) < MAXTEXT);
      if (v) take(id, v);
    }
  }
  // Handentscheidungen (manual_t268.json) für Paare, deren beide Karten Tests festschreiben
  const MAN = JSON.parse(fs.readFileSync(path.join(__dirname, 'manual_t268.json'), 'utf8'));
  for (const [id, p] of Object.entries(MAN)) {
    if (id === '_info') continue;
    const nc = Object.assign({}, cur[id], p);
    if (!isFree(nc)) throw new Error('Handentscheidung kollidiert: ' + id);
    take(id, { p, card: nc });
  }
  const out = { patch, unresolved: [...new Set(unresolved)].filter((id) => !MAN[id] && both(cur[id]).some((k) => taken.get(k) > 1)), changed: Object.keys(patch).length };
  fs.mkdirSync(path.join(__dirname, 'out'), { recursive: true });
  fs.writeFileSync(path.join(__dirname, 'out', 'profile_t268.json'), JSON.stringify(out, null, 1));
  console.log('Profile: geändert', out.changed, 'ungelöst', out.unresolved.length);
  if (!DRY) L.applyPatch(patch);
}
if (require.main === module) main();
module.exports = { fkey, ekey, tkey, typeVariants, poolVariants };
