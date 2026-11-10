/**
 * Katalog-Scan: Effektcodes ohne erkennbaren Handler und Soforteinsätze,
 * die den Spielzustand nicht ändern (außer Karte/AP). Nur Diagnose, keine Fixes.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const L = require('../nation_pools/load_game.js');

const ENGINE_FILES = [
  'js/engine/engine.js',
  'js/engine/tactical_runtime.js',
  'js/engine/doctrine_runtime.js',
  'js/engine/victory_trophy.js',
].map((f) => path.join(L.WEB, f));

function loadSources() {
  return ENGINE_FILES.map((f) => ({ file: path.basename(f), text: fs.readFileSync(f, 'utf8') }));
}

function codeReferenced(code, sources) {
  const reBranch = new RegExp(
    "(?:e\\.code|code|eff\\.code|fx\\.code)\\s*(?:===|!==|==|!=)\\s*['\"]" + code + "['\"]" +
    "|['\"]" + code + "['\"]\\s*(?:===|!==|==|!=)\\s*(?:e\\.code|code)" +
    "|case\\s+['\"]" + code + "['\"]" +
    "|codes\\.some\\([^)]*['\"]" + code + "['\"]" +
    "|indexOf\\(\\s*['\"]" + code + "['\"]" +
    "|includes\\(\\s*['\"]" + code + "['\"]" +
    "|hasDok\\([^)]*['\"]" + code + "['\"]" +
    "|dokParam\\([^)]*['\"]" + code + "['\"]" +
    "|dokAllParams\\([^)]*['\"]" + code + "['\"]" +
    "|_hasDoctrine\\([^)]*['\"]" + code + "['\"]" +
    "|_dokParam\\([^)]*['\"]" + code + "['\"]" +
    "|want\\(\\s*['\"]" + code + "['\"]" +
    "|fx\\([^)]*['\"]" + code + "['\"]"
  );
  const reAny = new RegExp("['\"]" + code + "['\"]");
  const hits = [];
  for (const s of sources) {
    if (reBranch.test(s.text)) hits.push({ file: s.file, kind: 'branch' });
    else if (reAny.test(s.text)) hits.push({ file: s.file, kind: 'string' });
  }
  return hits;
}

function slimInst(inst, eng) {
  if (!inst) return null;
  const def = eng.defOf(inst);
  return {
    id: inst.cardId || inst.id,
    name: def && def.name,
    atk: inst.atk,
    def: inst.def,
    defMax: inst.defMax,
    facedown: !!inst.facedown,
    flags: inst.flags || {},
    att: (inst.attachments || []).map((a) => a.cardId || a.id),
  };
}

function boardFp(eng, ignoreUids, opts) {
  opts = opts || {};
  const skipAp = opts.skipAp;
  const pl = eng.state.players.map((p, i) => {
    const front = {};
    ['L', 'C', 'R'].forEach((s) => {
      front[s] = (p.front[s] || []).map((u) => slimInst(u, eng));
    });
    return {
      vp: p.vp, sp: p.sp, flags: p.flags || {},
      ap: skipAp && i === skipAp.pid ? null : p.ap,
      front,
      support: (p.support || []).map((u) => slimInst(u, eng)),
      nml: p.nml,
      hand: (p.hand || []).map((c) => c.cardId || c.id).filter((id, idx) => {
        const u = p.hand[idx];
        return !ignoreUids.has(u.uid);
      }).sort(),
      deck: (p.deck || []).map((c) => c.cardId || c.id).sort(),
      grave: (p.grave || []).map((c) => c.cardId || c.id).filter((id, idx) => {
        const u = p.grave[idx];
        return !ignoreUids.has(u.uid);
      }).sort(),
    };
  });
  const pend = eng.state.pending;
  return {
    pl,
    pending: pend ? { kind: pend.kind, n: (pend.choices || []).length, need: pend.needCount, left: pend.left } : null,
    winner: eng.state.winner,
    held: !!eng.state.heldAttack,
  };
}

function richSetup(eng, L, w) {
  L.clearBoard(eng);
  const p0 = eng.player(0);
  const p1 = eng.player(1);
  const units = w.DC_CATALOG.cards.filter((c) => c.typ === 'Einheit' && (c.atk || 0) >= 1 && (c.def || 0) >= 1);
  const inf = units.filter((c) => /Infanterie/i.test(c.klasse || '') || (c.tags || []).includes('infanterie'));
  const supp = w.DC_CATALOG.cards.filter((c) => c.typ === 'Unterstützung');
  const putId = (list, i) => (list[i % list.length] || units[0]).id;
  // 6 own + 6 enemy front
  const slots = [['L', 0], ['L', 1], ['C', 0], ['C', 1], ['R', 0], ['R', 1]];
  slots.forEach((sr, i) => {
    const a = L.put(eng, 0, putId(inf.length ? inf : units, i), sr[0], sr[1]);
    a.def = Math.max(1, (a.def || 2) - (i === 0 ? 1 : 0)); // one damaged
    const b = L.put(eng, 1, putId(units, i + 3), sr[0], sr[1]);
    if (i === 1) b.facedown = true;
  });
  // supports
  if (supp[0]) {
    p0.support[0] = eng.instFromId(supp[0].id, 0);
    p0.support[0].summonedTurn = -9;
  }
  if (supp[1]) {
    p1.support[0] = eng.instFromId(supp[1].id, 1);
    p1.support[0].summonedTurn = -9;
  }
  // mines in NML of enemy
  if (p1.nml && p1.nml.C) {
    p1.nml.C[0] = { uid: 'mine-t250', cardId: 'dc_tok_mine', typ: 'Token', flags: { mine: true } };
  }
  // decks with mixed units / infantry / instants
  const deckFill = units.slice(0, 12).map((c) => eng.instFromId(c.id, 0));
  p0.deck = deckFill.concat(p0.deck || []);
  p1.deck = units.slice(12, 20).map((c) => eng.instFromId(c.id, 1)).concat(p1.deck || []);
  p0.grave = [];
  p1.grave = [];
  p0.hand = [];
  p1.hand = [];
  p0.ap = 12;
  p1.ap = 12;
  p0.flags = p0.flags || {};
  p1.flags = p1.flags || {};
  eng.state.pending = null;
  eng.state.heldAttack = null;
  eng.state.active = 0;
}

function firstAct(eng, pid) {
  const acts = eng.listActions(pid) || [];
  const pref = ['CHOOSE_TARGET', 'CHOOSE_SLOT', 'RESOLVE_PENDING', 'CONFIRM_TARGETS', 'COIN_FLIP', 'REACT_PASS', 'SAM_PASS', 'GEIST_PASS', 'PEEK_DONE', 'PLAY', 'ATTACK'];
  for (const t of pref) {
    const a = acts.find((x) => x.type === t);
    if (a) return a;
  }
  return acts.find((x) => x.type !== 'END_TURN' && x.type !== 'CONCEDE') || null;
}

function playInstant(eng, cardDef, L, w) {
  richSetup(eng, L, w);
  const p = eng.player(0);
  const inst = eng.instFromId(cardDef.id, 0);
  p.hand = [inst];
  p.ap = Math.max(12, (cardDef.ap || 0) + 4);
  const ignore = new Set([inst.uid]);
  const before = JSON.stringify(boardFp(eng, ignore, { skipAp: { pid: 0 } }));
  const r = eng.dispatch({ type: 'PLAY', player: 0, uid: inst.uid });
  if (!r || r.ok === false) {
    return { status: 'unplayable', error: (r && (r.error || r.code)) || 'fail', code: r && r.code };
  }
  let steps = 0;
  let hang = false;
  const seen = new Set();
  while (eng.state.pending && steps < 40) {
    const act = firstAct(eng, eng.state.pending.player != null ? eng.state.pending.player : 0);
    if (!act) break;
    const key = JSON.stringify(act);
    if (seen.has(key)) { hang = true; break; }
    seen.add(key);
    const rr = eng.dispatch(act);
    steps += 1;
    if (rr && rr.ok === false) break;
  }
  if (eng.state.pending && steps >= 40) hang = true;
  const after = JSON.stringify(boardFp(eng, ignore, { skipAp: { pid: 0 } }));
  const pendingLeft = !!eng.state.pending;
  const inGrave = (p.grave || []).some((c) => c.uid === inst.uid);
  const inSupport = (p.support || []).some((c) => c && c.uid === inst.uid);
  const changed = before !== after;
  return { status: hang ? 'hang' : (changed || pendingLeft || inSupport ? 'effect' : (inGrave || r.ok ? 'noop' : 'unclear')), changed, pendingLeft, inGrave, inSupport, steps, error: r && r.error };
}

function main() {
  const w = L.loadGame({ quiet: true });
  const sources = loadSources();
  const cards = w.DC_CATALOG.cards;
  const byCode = new Map();
  cards.forEach((c) => {
    (c.effects || []).forEach((e) => {
      if (!e || !e.code) return;
      if (!byCode.has(e.code)) byCode.set(e.code, []);
      byCode.get(e.code).push(c);
    });
  });

  const missing = [];
  const stringOnly = [];
  const handled = [];
  [...byCode.keys()].sort().forEach((code) => {
    const hits = codeReferenced(code, sources);
    const rec = { code, n: byCode.get(code).length, typ: [...new Set(byCode.get(code).map((c) => c.typ))].join(','), samples: byCode.get(code).slice(0, 8).map((c) => ({ id: c.id, name: c.name, typ: c.typ })) };
    if (!hits.length) missing.push(rec);
    else if (hits.every((h) => h.kind === 'string')) stringOnly.push(Object.assign(rec, { files: hits.map((h) => h.file) }));
    else handled.push(rec);
  });

  const eng = L.newMatch(w, 'Steinmark', 11);
  const instants = cards.filter((c) => c.typ === 'Soforteinsatz');
  const noop = [];
  const unplayable = [];
  const hangs = [];
  const effects = [];
  for (const c of instants) {
    let res;
    try { res = playInstant(eng, c, L, w); }
    catch (e) { res = { status: 'throw', error: String(e && e.message || e) }; }
    const row = { id: c.id, name: c.name, ap: c.ap, codes: (c.effects || []).map((e) => e.code).join(','), status: res.status, error: res.error, steps: res.steps };
    if (res.status === 'noop') noop.push(row);
    else if (res.status === 'unplayable' || res.status === 'throw') unplayable.push(row);
    else if (res.status === 'hang') hangs.push(row);
    else effects.push(row);
  }

  const report = { generated: new Date().toISOString(), catalog: cards.length, uniqueCodes: byCode.size, handled: handled.length, missing, stringOnly, instant: { total: instants.length, effect: effects.length, noop: noop.length, unplayable: unplayable.length, hang: hangs.length }, noop, unplayable, hangs };
  const outDir = path.join(__dirname, 'out');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'stub_scan_t250.json'), JSON.stringify(report, null, 2));

  function listCodes(arr) {
    return arr.map((r) => {
      const ex = r.samples.map((s) => s.name + ' (`' + s.id + '`)').join(', ');
      return '- `' + r.code + '` (' + r.n + '×, ' + r.typ + '): ' + ex;
    }).join('\n');
  }
  function listCards(arr) {
    return arr.map((r) => '- ' + r.name + ' (`' + r.id + '`, ' + r.ap + ' AP, ' + r.codes + ')' + (r.error ? ' — ' + r.error : '')).join('\n');
  }

  const md = [
    '# Stub-/No-Op-Scan t250',
    '',
    'Nur Diagnose, keine Änderungen. ' + cards.length + ' Katalogkarten, ' + byCode.size + ' Effektcodes, ' + instants.length + ' Soforteinsätze.',
    '',
    '## Effektcodes ohne Handler in Engine/Taktik/Doktrin/Trophy',
    '',
    missing.length ? listCodes(missing) : '_keine_',
    '',
    '## Codes nur als String (kein `code ===` / `case`)',
    '',
    stringOnly.length ? listCodes(stringOnly) : '_keine_',
    '',
    '## Soforteinsätze ohne Zustandsänderung (Karte/AP ignoriert)',
    '',
    'Reiches Brett (6+6 Front, Support, Mine, gemischtes Deck). Pending gilt als Wirkung. ' + noop.length + ' Treffer.',
    '',
    noop.length ? listCards(noop) : '_keine_',
    '',
    '## Nicht spielbar in der Probe (bedingt, nicht automatisch Stub)',
    '',
    unplayable.length ? listCards(unplayable) : '_keine_',
    '',
    '## Hänger in der Probe',
    '',
    hangs.length ? listCards(hangs) : '_keine_',
    '',
  ].join('\n');
  const mdPath = path.join(L.WEB, '..', 'docs', 'balance', 'STUB_SCAN_T250.md');
  fs.writeFileSync(mdPath, md);
  console.log(md);
  console.log('\nJSON scripts/balance/out/stub_scan_t250.json');
  console.log('MD', mdPath);
  console.log('summary', { missing: missing.length, stringOnly: stringOnly.length, noop: noop.length, unplayable: unplayable.length, hang: hangs.length, effect: effects.length });
}

main();
