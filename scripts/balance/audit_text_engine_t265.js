/**
 * Kartentext-gegen-Engine-Prüfung (t265). Nur Diagnose, keine Änderungen an Spielmechanik.
 *
 * Teil A (statisch, alle Karten): Aussagen im Kartentext (Ziehen, Schaden, Heilen, ±ATK/DEF, AP,
 * Zerstören, Hand abwerfen, Aufdecken) werden gegen die Effektliste geprüft. Gemeldet wird,
 * wenn keine passende Effektfamilie existiert oder die Zahl im Text in keinem Parameter vorkommt.
 *
 * Teil B (Verhalten, alle Soforteinsätze): Karte auf einem vollen Brett ausspielen, offene
 * Auswahlen automatisch auflösen und messen, ob die im Text behaupteten Wirkungen eintreten.
 *
 * Teil C: Soforteinsätze mit gegnerischem Ziel und positivem BUFF ohne `enemy`-Kennung.
 * Teil D: Parameterschlüssel, die in Engine/Taktik/Doktrin/Trophy nirgends gelesen werden.
 *
 * Ausgabe: scripts/balance/out/audit_text_engine_t265.json (Rohdaten zur Sichtung).
 * Ergebnis der Sichtung: docs/regeln/TEXT_ENGINE_AUDIT_T265.md.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const L = require('../nation_pools/load_game.js');

/** Liefert alle Zahlen eines Parameterobjekts (rekursiv, Beträge). */
function paramNums(obj, out) {
  out = out || new Set();
  if (obj == null) return out;
  if (typeof obj === 'number') { out.add(Math.abs(obj)); return out; }
  if (typeof obj === 'object') Object.values(obj).forEach((v) => paramNums(v, out));
  return out;
}

const WORDNUM = { ein: 1, eine: 1, einen: 1, einer: 1, zwei: 2, drei: 3, vier: 4, 'fünf': 5 };
/** Wandelt "2"/"eine" in eine Zahl. */
function num(s) { if (s == null) return null; const n = parseInt(s, 10); return isNaN(n) ? (WORDNUM[String(s).toLowerCase()] || null) : n; }

/**
 * Textaussagen: Art, Zahl, Satz. Familien = Effektcodes, die diese Aussage tragen können (Regex).
 */
const CLAIMS = [
  { kind: 'draw', re: /\b(?:ziehe|ziehst du|ziehen|zieht)\s+(\d+|eine?n?)\b/gi, fam: /DRAW|PEEK|DISCARD|ARMAGEDDON|CARD|HAND|DECK|TUTOR|SEARCH|INF|RECRUIT|CYCLE/ },
  { kind: 'dmg', re: /(\d+)\s+Schaden/g, fam: /DAMAGE|DMG|STRIKE|NAPALM|BOMB|FIRE|SCHADEN|MINE|SHOT|ATTACK|ART|SNIPE|BARRAGE|SALVO|KILL|AMBUSH|ÜBERLEG|UEBERLEG/ },
  { kind: 'heal', re: /\bheil(?:e|t|en)?\s+(?:[^.;:]*?\s)?(\d+)/gi, fam: /HEAL|MEDIZIN|REPAIR|LAZARETT|REGEN|RESTORE/ },
  { kind: 'atk', re: /([+−-]\s?\d+)\s*ATK/g, fam: /ATK|BUFF|STAT|CM|AURA|VS_|MARK|REVEAL|FLANK|SELF|BONUS|LEAD|FUEHR|STRIKE|UMGEHEN|PAIN|COND|FIRST|STANDARD|REST/ },
  { kind: 'def', re: /([+−-]\s?\d+)\s*DEF/g, fam: /DEF|BUFF|STAT|CM|AURA|FLANK|MOVE|OUT_OF|NO_MOVE|FUEHR|MEDIZIN|COND|HEAL|STANDARD|REST|PLAY_INF/ },
  { kind: 'ap', re: /([+−-]\s?\d+)\s*AP\b|erh[äa]lt(?:st)?\s+(\d+)\s+AP/g, fam: /AP|COST|DISCOUNT|REFUND/ },
  { kind: 'destroy', re: /\bzerst[öo]r(?:e|t|en)\b/gi, fam: /DESTROY|KILL|SACRIFICE|ARMAGEDDON|SLEEPER|EXECUT|ASSASS|NEUTRAL|CLEAR|REMOVE|ONCE_HEAL_DESTROY|ON_DESTROY|BOMB|STRIKE|MINE/ },
  { kind: 'handDiscard', re: /\b(?:Hand|Handkarte)[^.]*?(?:Ablagestapel|abwerfen)|\bwirf\b[^.]*?(?:Hand|Handkarte)/gi, fam: /DISCARD|ARMAGEDDON|HAND/ },
  { kind: 'reveal', re: /\baufdeck|\bdeckt?\b[^.]*\bauf\b/gi, fam: /REVEAL|AUFKL|PEEK|OBSERV|SPOT|SCOUT|SATELL|RECON/ },
];

/** Statische Prüfung einer Karte; liefert Liste von Befunden. */
function staticCheck(c) {
  const text = String(c.text || '');
  const effs = c.effects || [];
  const codes = effs.map((e) => e.code).join(' ');
  const nums = paramNums(effs.map((e) => e.param));
  const findings = [];
  if (!effs.length) return findings;
  for (const cl of CLAIMS) {
    cl.re.lastIndex = 0;
    let m;
    while ((m = cl.re.exec(text))) {
      const n = num((m[1] || m[2] || '').replace(/[+−\s-]/g, ''));
      const famOk = cl.fam.test(codes);
      // Fähigkeitstexte "(2 AP)" sind Kosten, keine Aussage
      if (cl.kind === 'ap' && /\(\s*\d+\s*AP/.test(text.slice(Math.max(0, m.index - 2), m.index + 8))) continue;
      const numOk = n == null || nums.has(n) || (n === 1 && famOk);
      if (!famOk) findings.push({ kind: cl.kind, n, issue: 'keine passende Effektfamilie', at: m[0] });
      else if (!numOk) findings.push({ kind: cl.kind, n, issue: 'Zahl nicht in Parametern', at: m[0] });
    }
  }
  return findings;
}

// ---------- Teil B: Verhalten Soforteinsätze ----------

/** Effektive Werte aller Fronteinheiten eines Spielers. */
function frontStats(eng, pid) {
  const p = eng.player(pid);
  const out = [];
  ['L', 'C', 'R'].forEach((s) => (p.front[s] || []).forEach((u, r) => {
    if (!u) return;
    let st = { atk: u.atk, def: u.def };
    try { st = eng.currentAtkDef(u) || st; } catch (e) { /* Rohwerte */ }
    out.push({ uid: u.uid, s, r, atk: st.atk, def: st.def, rawDef: u.def, facedown: !!u.facedown, observed: !!(u.flags && (u.flags.observed || u.flags.revealed)) });
  }));
  return out;
}

/** Messbare Kennzahlen eines Zustands. */
function snapshot(eng, playedUid) {
  const pl = [0, 1].map((pid) => {
    const p = eng.player(pid);
    return {
      deck: (p.deck || []).length,
      hand: (p.hand || []).filter((c) => c.uid !== playedUid).map((c) => c.uid),
      grave: (p.grave || []).map((c) => c.uid),
      ap: p.ap, vp: p.vp,
      front: frontStats(eng, pid),
    };
  });
  return pl;
}

/** Volles Brett wie im Stub-Scan t250, dazu Handkarten und beschädigte eigene Einheiten. */
function richSetup(eng, w) {
  L.clearBoard(eng);
  const cards = w.DC_CATALOG.cards;
  const units = cards.filter((c) => c.typ === 'Einheit' && (c.atk || 0) >= 1 && (c.def || 0) >= 3 && !(c.effects || []).length);
  const inf = units.filter((c) => /Infanterie/i.test(c.klasse || ''));
  const tanks = units.filter((c) => /Panzer/i.test(c.klasse || ''));
  const supp = cards.filter((c) => c.typ === 'Unterstützung');
  const arty = units.filter((c) => /Artillerie/i.test(c.klasse || ''));
  const ownPick = [inf[0], tanks[0], inf[1], arty[0] || tanks[1], inf[2], tanks[2]];
  const slots = [['L', 0], ['L', 1], ['C', 0], ['C', 1], ['R', 0], ['R', 1]];
  slots.forEach((sr, i) => {
    const a = L.put(eng, 0, ownPick[i].id, sr[0], sr[1]);
    a.def = Math.max(1, (a.def || 3) - 1);
    const b = L.put(eng, 1, (i % 2 ? inf : tanks)[i % 3 + 1].id, sr[0], sr[1]);
    if (i === 1 || i === 4) b.facedown = true;
  });
  const p0 = eng.player(0), p1 = eng.player(1);
  p0.support[0] = eng.instFromId(supp[0].id, 0); p0.support[0].summonedTurn = -9;
  p1.support[0] = eng.instFromId(supp[1].id, 1); p1.support[0].summonedTurn = -9;
  p0.deck = units.slice(0, 15).map((c) => eng.instFromId(c.id, 0));
  p1.deck = units.slice(15, 30).map((c) => eng.instFromId(c.id, 1));
  p0.hand = units.slice(30, 33).map((c) => eng.instFromId(c.id, 0));
  p1.hand = units.slice(33, 36).map((c) => eng.instFromId(c.id, 1));
  p0.grave = [eng.instFromId(inf[3].id, 0)]; p1.grave = [];
  p0.flags = p0.flags || {}; p1.flags = p1.flags || {};
  eng.state.pending = null; eng.state.heldAttack = null; eng.state.active = 0;
}

/** Erste sinnvolle Aktion zum Auflösen offener Auswahlen. */
function firstAct(eng, pid, seen) {
  const acts = eng.listActions(pid) || [];
  const pref = ['CHOOSE_TARGET', 'CHOOSE_SLOT', 'RESOLVE_PENDING', 'CONFIRM_TARGETS', 'COIN_FLIP', 'REACT_PASS', 'SAM_PASS', 'GEIST_PASS', 'PEEK_DONE'];
  for (const t of pref) {
    const a = acts.find((x) => x.type === t && !(seen && seen.has(JSON.stringify(Object.assign({ player: pid }, x)))));
    if (a) return Object.assign({ player: pid }, a);
  }
  return null;
}

/** Spielt einen Soforteinsatz und misst die Wirkung. */
function playInstant(eng, w, def) {
  richSetup(eng, w);
  const p = eng.player(0);
  const inst = eng.instFromId(def.id, 0);
  p.hand.push(inst);
  p.ap = Math.max(12, (def.ap || 0) + 4);
  const before = snapshot(eng, inst.uid);
  const apBefore = p.ap;
  let r;
  try { r = eng.dispatch({ type: 'PLAY', player: 0, uid: inst.uid }); } catch (e) { return { status: 'throw', error: String(e.message || e) }; }
  if (!r || r.ok === false) return { status: 'unplayable', error: (r && (r.error || r.code)) || 'fail' };
  let steps = 0; const seen = new Set();
  while (eng.state.pending && steps < 40) {
    const pid = eng.state.pending.player != null ? eng.state.pending.player : 0;
    const act = firstAct(eng, pid, seen);
    if (!act) break;
    seen.add(JSON.stringify(act));
    try { eng.dispatch(act); } catch (e) { return { status: 'throw', error: String(e.message || e) }; }
    steps += 1;
  }
  const after = snapshot(eng, inst.uid);
  const m = {};
  m.ownDraw = before[0].deck - after[0].deck;
  m.oppDraw = before[1].deck - after[1].deck;
  m.ownHandLost = before[0].hand.filter((u) => !after[0].hand.includes(u)).length;
  m.oppHandLost = before[1].hand.filter((u) => !after[1].hand.includes(u)).length;
  const diff = (b, a) => {
    const res = { dmg: 0, heal: 0, atkUp: 0, atkDown: 0, defUp: 0, destroyed: 0, revealed: 0, moved: 0 };
    b.front.forEach((u) => {
      const x = a.front.find((y) => y.uid === u.uid);
      if (!x) { res.destroyed += 1; return; }
      if (x.rawDef < u.rawDef) res.dmg += u.rawDef - x.rawDef;
      if (x.rawDef > u.rawDef) res.heal += x.rawDef - u.rawDef;
      if (x.def > u.def) res.defUp += x.def - u.def;
      if (x.atk > u.atk) res.atkUp += x.atk - u.atk;
      if (x.atk < u.atk) res.atkDown += u.atk - x.atk;
      if ((u.facedown && !x.facedown) || (!u.observed && x.observed)) res.revealed += 1;
      if (x.s !== u.s || x.r !== u.r) res.moved += 1;
    });
    return res;
  };
  m.own = diff(before[0], after[0]);
  m.opp = diff(before[1], after[1]);
  m.apNet = p.ap - (apBefore - (def.ap || 0));
  m.vp = [after[0].vp - before[0].vp, after[1].vp - before[1].vp];
  m.pendingLeft = !!eng.state.pending;
  return { status: 'played', m, steps };
}

/** Prüft die Textaussagen eines Soforteinsatzes gegen die Messung. */
function behaviourCheck(def, res) {
  const text = String(def.text || '');
  const m = res.m;
  const miss = [];
  const has = (re) => re.test(text);
  if (has(/\bbeide\b[^.]*\bziehen\s+(\d+)/i)) {
    const n = num(text.match(/\bbeide\b[^.]*\bziehen\s+(\d+)/i)[1]);
    if (m.ownDraw < n || m.oppDraw < n) miss.push('beide ziehen ' + n + ' (gemessen ' + m.ownDraw + '/' + m.oppDraw + ')');
  } else if (has(/\b(?:ziehe|ziehst du)\s+(\d+|eine?n?)\b/i)) {
    const n = num(text.match(/\b(?:ziehe|ziehst du)\s+(\d+|eine?n?)\b/i)[1]) || 1;
    if (m.ownDraw < n) miss.push('ziehe ' + n + ' (gemessen ' + m.ownDraw + ')');
  }
  if (has(/(\d+)\s+Schaden/) && has(/gegner|feind/i) && !has(/erleidet sie|erleidest|Schaden\s*[−-]|[−-]\s*\d+\s+Schaden|verhinder|verringer/i)) {
    if (m.opp.dmg + m.opp.destroyed === 0) miss.push('Schaden am Gegner (gemessen 0)');
  }
  if (has(/\bheil/i) && !has(/heilt? nicht|keine Heilung/i)) { if (m.own.heal === 0 && m.own.defUp === 0) miss.push('Heilung (gemessen 0)'); }
  if (has(/\+\s?\d+\s*ATK/) && !has(/gegen|beim (ersten )?Angriff|im Angriff|wenn|solange|falls|nächste|Gefecht/i)) { if (m.own.atkUp === 0) miss.push('+ATK (gemessen 0)'); }
  if (has(/\+\s?\d+\s*DEF/) && !has(/wenn|solange|falls|nächste|einrück/i)) { if (m.own.defUp === 0 && m.own.heal === 0) miss.push('+DEF (gemessen 0)'); }
  if (has(/[−-]\s?\d+\s*ATK/) && has(/gegner|feind/i) && !has(/wenn|solange|falls|nächste|Angriff/i)) { if (m.opp.atkDown === 0) miss.push('Feind −ATK (gemessen 0)'); }
  if (has(/\+\s?\d+\s*AP\b|erh[äa]ltst\s+\d+\s+AP/) && !has(/nächste|Zugbeginn|wenn|falls/i)) { if (m.apNet <= 0) miss.push('+AP (gemessen ' + m.apNet + ')'); }
  if (has(/\bzerst[öo]re\b/i) && !has(/wenn|falls|nächste|stattdessen|wird .* zerstört/i)) { if (m.opp.destroyed + m.own.destroyed === 0) miss.push('Zerstören (gemessen 0)'); }
  if (has(/Hand[^.]*Ablagestapel|\bwirf\b/i)) { if (m.ownHandLost === 0 && m.oppHandLost === 0) miss.push('Hand abwerfen (gemessen 0)'); }
  if (has(/aufdeck|\bdeckt?\b[^.]*\bauf\b|beobachtet/i) && !has(/wenn|falls/i)) { if (m.opp.revealed === 0) miss.push('Aufdecken/Beobachten (gemessen 0)'); }
  if (has(/versetze|verschieb/i)) { if (m.own.moved + m.opp.moved === 0) miss.push('Versetzen (gemessen 0)'); }
  return miss;
}

/** Hauptlauf. */
function main() {
  const w = L.loadGame({ quiet: true });
  const cards = w.DC_CATALOG.cards;
  const staticRows = [];
  cards.forEach((c) => { const f = staticCheck(c); if (f.length) staticRows.push({ id: c.id, name: c.name, typ: c.typ, text: c.text, codes: (c.effects || []).map((e) => e.code + (e.param ? JSON.stringify(e.param) : '')).join(' '), findings: f }); });
  const eng = L.newMatch(w, 'Steinmark', 11);
  // Kontrolle: reiner Zieh-Soforteinsatz; seine Brettänderungen (Auren, Flanken) sind Grundrauschen
  const ctrlDef = cards.find((c) => c.typ === 'Soforteinsatz' && (c.effects || []).length === 1 && c.effects[0].code === 'DRAW');
  const ctrl = playInstant(eng, w, ctrlDef).m;
  const sub = (m) => { ['own', 'opp'].forEach((k) => Object.keys(m[k]).forEach((f) => { m[k][f] = Math.max(0, m[k][f] - ctrl[k][f]); })); return m; };
  const beh = []; const unplayable = [];
  cards.filter((c) => c.typ === 'Soforteinsatz').forEach((c) => {
    let res; try { res = playInstant(eng, w, c); } catch (e) { res = { status: 'throw', error: String(e.message || e) }; }
    if (res.status !== 'played') { unplayable.push({ id: c.id, name: c.name, text: c.text, status: res.status, error: res.error }); return; }
    sub(res.m);
    const miss = behaviourCheck(c, res);
    if (miss.length) beh.push({ id: c.id, name: c.name, ap: c.ap, text: c.text, codes: (c.effects || []).map((e) => e.code + (e.param ? JSON.stringify(e.param) : '')).join(' '), miss, m: res.m });
  });
  const enemyBuff = cards.filter((c) => c.typ === 'Soforteinsatz' && c.target && c.target.side === 'enemy' && (c.effects || []).some((e) => e.code === 'BUFF' && !(e.param || {}).enemy && (Number((e.param || {}).atk) > 0 || Number((e.param || {}).def) > 0))).map((c) => ({ id: c.id, name: c.name, text: c.text }));
  const src = ['engine.js', 'tactical_runtime.js', 'doctrine_runtime.js', 'victory_trophy.js'].map((f) => fs.readFileSync(path.join(L.WEB, 'js/engine', f), 'utf8')).join('\n');
  const keys = {};
  cards.forEach((c) => (c.effects || []).forEach((e) => {
    const walk = (o) => { if (!o || typeof o !== 'object' || Array.isArray(o)) return; Object.keys(o).forEach((k) => { (keys[k] = keys[k] || { codes: new Set(), cards: new Set() }); keys[k].codes.add(e.code); keys[k].cards.add(c.id); walk(o[k]); }); };
    walk(e.param);
  }));
  const unreadParams = Object.entries(keys).filter(([k]) => !new RegExp('(\\.|\\[[\'"])' + k + '\\b|[\'"]' + k + '[\'"]|\\b' + k + '\\s*[:,}]').test(src)).map(([k, v]) => ({ key: k, codes: [...v.codes], cards: [...v.cards] }));
  const out = { enemyBuff, unreadParams, control: { id: ctrlDef.id, m: ctrl }, generated: new Date().toISOString(), cards: cards.length, instants: cards.filter((c) => c.typ === 'Soforteinsatz').length, staticCount: staticRows.length, behaviourCount: beh.length, unplayableCount: unplayable.length, staticRows, behaviour: beh, unplayable };
  const dir = path.join(__dirname, 'out'); fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'audit_text_engine_t265.json'), JSON.stringify(out, null, 1));
  console.log({ cards: out.cards, instants: out.instants, static: out.staticCount, behaviour: out.behaviourCount, unplayable: out.unplayableCount, enemyBuff: enemyBuff.length, unreadParams: unreadParams.length });
}

main();
