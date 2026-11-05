/**
 * Audit every Soforteinsatz that needs a player choice + doctrine choice claims.
 */
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../Division_Command_0.5a/web');

function loadInto(context, rel) {
  vm.runInContext(fs.readFileSync(path.join(ROOT, rel), 'utf8'), context, { filename: rel });
}
const sandbox = {
  console, setTimeout, clearTimeout, setInterval, clearInterval,
  document: {
    getElementById: () => null, querySelector: () => null, querySelectorAll: () => [],
    createElement: () => ({ style: {}, appendChild() {}, remove() {}, setAttribute() {}, onload: null, onerror: null }),
    head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } },
    addEventListener() {}, removeEventListener() {},
  },
  localStorage: { getItem: () => null, setItem() {} },
  navigator: {},
};
sandbox.window = sandbox; sandbox.globalThis = sandbox; sandbox.self = sandbox;
const ctx = vm.createContext(sandbox);
for (const s of [
  'js/version.js',
  'js/data/sets/types/doktrinen.js', 'js/data/sets/types/tokens.js',
  'js/data/sets/types/infanterie.js', 'js/data/sets/types/panzer.js',
  'js/data/sets/types/artillerie.js', 'js/data/sets/types/aufklaerung.js',
  'js/data/sets/types/elite.js', 'js/data/sets/types/unterstuetzung.js',
  'js/data/sets/types/soforteinsatz.js', 'js/data/sets/types/ausruestung.js',
  'js/data/decks.js', 'js/data/catalog.js',
  'js/engine/engine.js', 'js/engine/victory_trophy.js', 'js/engine/doctrine_runtime.js', 'js/ai/bot.js',
]) loadInto(ctx, s);

const { DCEngine, DC_CATALOG, DC_NATION_DECKS } = ctx;
const PENDING_META = DCEngine.PENDING_META || {};
const nKeys = Object.keys(DC_NATION_DECKS);
const d0 = DC_NATION_DECKS[nKeys[0]];
const d1 = DC_NATION_DECKS[nKeys[1]];

function makeEng(seed) {
  const catalog = JSON.parse(JSON.stringify(DC_CATALOG));
  catalog.rules = Object.assign({}, catalog.rules, { deploy_protection: true, combat_counter: 'survivor_only', opening_coin: false });
  const eng = new DCEngine.Engine(catalog, { seed, rules: catalog.rules });
  eng.createMatch({
    seed, mode: 'hotseat', startPlayer: 0,
    name0: 'P0', name1: 'P1',
    deck0: (d0.cards || []).slice(), deck1: (d1.cards || []).slice(),
    doctrine0: (d0.doktrinen || []).slice(0, 2), doctrine1: (d1.doktrinen || []).slice(0, 2),
  });
  return eng;
}

function tagBag(c) {
  return ((c.tags || []).join(' ') + ' ' + (c.klasse || '')).toLowerCase();
}
function findUnit(pred) {
  return DC_CATALOG.cards.find((c) => c.typ === 'Einheit' && pred(c));
}
const INF = findUnit((c) => /infanterie/.test(tagBag(c)));
const PANZ = findUnit((c) => /panzer/.test(tagBag(c)));
const ARTY = findUnit((c) => /artillerie/.test(tagBag(c)));
const ANY = DC_CATALOG.cards.find((c) => c.typ === 'Einheit' && c.id !== INF.id);

function clearProtect(inst) {
  inst.summonedTurn = -99;
  inst.flags = inst.flags || {};
  inst.flags.deployProtect = false;
  delete inst.flags.deployProtectUntil;
  delete inst.flags.deploy_protection;
  delete inst.flags.eingraben;
}

function putUnit(eng, pid, cardId, section, row, opts) {
  const p = eng.player(pid);
  const inst = eng.instFromId(cardId, pid);
  clearProtect(inst);
  if (opts && opts.facedown) inst.facedown = true;
  if (opts && opts.damage) inst.def = Math.max(1, (inst.def || 2) - opts.damage);
  p.front[section][row] = inst;
  return inst;
}

function setupBoard(eng) {
  putUnit(eng, 0, INF.id, 'L', 0);
  putUnit(eng, 0, PANZ.id, 'C', 0, { damage: 1 });
  putUnit(eng, 0, ARTY.id, 'R', 0);
  putUnit(eng, 1, INF.id, 'L', 0);
  putUnit(eng, 1, PANZ.id, 'C', 0, { facedown: true });
  putUnit(eng, 1, ARTY.id, 'R', 0);
  if (ANY) putUnit(eng, 1, ANY.id, 'C', 1);
  // also place a mine for CLEAR_MINE cards
  const p1 = eng.player(1);
  if (!p1.nml) p1.nml = { L: [null, null, null], C: [null, null, null], R: [null, null, null] };
  const tok = eng.instFromId('dc_tok_minenfeld', 1);
  tok.flags = { type: 'minenfeld', charges: 2 };
  tok.charges = 2;
  p1.nml.L[1] = tok;
}

function giveHand(eng, pid, cardId) {
  const p = eng.player(pid);
  const inst = eng.instFromId(cardId, pid);
  p.hand.push(inst);
  p.ap = 12;
  eng.state.active = pid;
  return inst;
}

const AUTO_CODES = new Set([
  'WILL_PEOPLE','MASS_DAMAGE','BUFF_ALL_OWN','DRAW','DRAW_DISCARD','DRAW_AP','COST_NEXT',
  'PLAY_INF_DISCOUNT','CLEAR_ENEMY_SUPPORT','EMPTY_STREETS','LOOK_TOP',
  'RETURN_INFANTRY_FROM_DISCARD','RETURN_UNIT_GRAVE','CANCEL_AIR_DAMAGE','COMMAND_ATTACK',
  'GHOST_RUINS','CAVALRY_ATK','KEIN_LOCH' /* section handled separately */,
]);
const SECTION_CODES = new Set(['BUFF_SECTION','KEIN_LOCH','DAMAGE_SECTION','HEAL_SECTION','BOMBARD_SECTION']);
const SPECIAL_CHOICE = new Set([
  'RESIST','CLEAR_ATK_MALUS','RATIONS','RADIATION','FORMATION','COURT_MARTIAL','SILVER_ANGEL',
  'SELF_SAC','ZEAL','CLEAR_MINE','MASS_DEPLOY','NAPALM','AIR_STRIKE','LAY_MINE','HONORS',
  'PAUSE_UNIT','MARTYR','BRIEFING','REPAIR_BOUNCE','DOUBLE_COMBAT','GHOST_STRIKE','COVER_SEEK',
  'LAST_STAND','MOBILIZE_INF','DRAW_AND_PLAY_INFANTRY','COIN_PREVENT','CLEAR_SUPPORT_OR_DEBUFF','ARMAGEDDON',
]);
const TARGET_CODES = new Set([
  'DEAL_DAMAGE','HEAL','DESTROY','DESTROY_IF_DEF','SACRIFICE','SACRIFICE_INFANTRY_DAMAGE','BUFF',
  'SELF_DAMAGE','RETURN_TO_HAND','MOVE_FRONT','MOVE_SLOTS','OUT_OF_COMBAT','PLACE_TOKEN','REMOVE_TOKEN',
  'REVEAL','MARK_OBSERVED','EXTRA_ATTACK','REPLACE_UNIT','ZIELANGRIFF','UMGEHEN',
]);

function expectsChoice(def) {
  const codes = (def.effects || []).map((e) => e.code);
  if (!codes.length) {
    if (/wähle|gewählte|ziel|eine (gegner|feind|eigene)|abschnitt/i.test(def.text || '')) return { kind: 'text' };
    return { kind: 'none' };
  }
  if (codes.some((c) => SECTION_CODES.has(c))) return { kind: 'section' };
  if (codes.some((c) => SPECIAL_CHOICE.has(c))) return { kind: 'special' };
  if (codes.some((c) => TARGET_CODES.has(c))) return { kind: 'target' };
  if (codes.every((c) => AUTO_CODES.has(c))) return { kind: 'none' };
  if (/wähle|gewählte|ziel wählen|eine (gegnerische|feindliche|eigene) /i.test(def.text || '')) return { kind: 'text' };
  return { kind: 'none' };
}

function resolveAll(eng, pid) {
  let guard = 0;
  let last = { ok: true };
  while (eng.state.pending && eng.state.pending.player === pid && guard++ < 12) {
    const pend = eng.state.pending;
    const kind = pend.kind;
    if (kind === 'coin' || kind === 'angel-coin' || kind === 'resist-coin') {
      last = eng.dispatch({ type: 'COIN_FLIP', player: pid });
      continue;
    }
    if (kind === 'react-window') { last = eng.dispatch({ type: 'REACT_PASS', player: pid }); continue; }
    if (kind === 'sam') { last = eng.dispatch({ type: 'SAM_PASS', player: pid }); continue; }
    if (kind === 'geist-window') { last = eng.dispatch({ type: 'GEIST_PASS', player: pid }); continue; }
    const cs = pend.choices || [];
    if (pend.upto && (pend.selected || []).length > 0 && (!cs.length || (pend.selected || []).length >= (pend.needCount || 1))) {
      try { last = eng.dispatch({ type: 'CONFIRM_TARGETS', player: pid }); continue; } catch (e) {}
    }
    if (!cs.length) {
      try { last = eng.dispatch({ type: 'RESOLVE_PENDING', player: pid, confirm: true, kind }); }
      catch (e) { return { ok: false, error: 'empty:' + kind + ':' + e.message }; }
      continue;
    }
    const used = new Set(pend.selected || []);
    const next = cs.find((c) => c && c.target && !used.has(c.target)) || cs[0];
    if (next.slot) last = eng.dispatch({ type: 'CHOOSE_SLOT', player: pid, slot: next.slot });
    else last = eng.dispatch({ type: 'CHOOSE_TARGET', player: pid, target: next.target });
    if (last && last.ok === false) return last;
  }
  return last;
}

const results = { ok: [], broken: [], autoOk: [], rejected: [], doctrineIssues: [] };
const soforte = DC_CATALOG.cards.filter((c) => c.typ === 'Soforteinsatz');

for (const def of soforte) {
  const exp = expectsChoice(def);
  try {
    const eng = makeEng(1000 + soforte.indexOf(def));
    setupBoard(eng);
    const card = giveHand(eng, 0, def.id);
    const playRes = eng.dispatch({ type: 'PLAY', player: 0, uid: card.uid });
    if (!playRes || playRes.ok === false) {
      results.rejected.push({ id: def.id, name: def.name, exp: exp.kind, error: playRes && (playRes.error || playRes.code) });
      continue;
    }
    const pend = eng.state.pending;
    if (exp.kind === 'none') {
      if (pend) results.broken.push({ id: def.id, name: def.name, issue: 'UNEXPECTED_PENDING', kind: pend.kind });
      else results.autoOk.push({ id: def.id, name: def.name });
      continue;
    }
    if (!pend) {
      results.broken.push({
        id: def.id, name: def.name, issue: 'NO_PENDING_AUTO_RESOLVED',
        exp: exp.kind, codes: (def.effects || []).map((e) => e.code),
        note: 'Spieler bekam keine UI-Auswahl',
      });
      continue;
    }
    if (!PENDING_META[pend.kind]) {
      results.broken.push({ id: def.id, name: def.name, issue: 'MISSING_PENDING_META', kind: pend.kind });
    }
    const meta = DCEngine.pendingMeta(pend.kind);
    if (!(pend.choices || []).length && meta.needs && meta.pick !== 'coin' && meta.pick !== 'confirm') {
      results.broken.push({ id: def.id, name: def.name, issue: 'EMPTY_CHOICES', kind: pend.kind });
      continue;
    }
    const kindBefore = pend.kind;
    const nChoices = (pend.choices || []).length;
    const res2 = resolveAll(eng, 0);
    if (eng.state.pending && eng.state.pending.player === 0) {
      results.broken.push({ id: def.id, name: def.name, issue: 'PENDING_STUCK', kind: eng.state.pending.kind, resolve: res2 && res2.error });
      continue;
    }
    results.ok.push({ id: def.id, name: def.name, kind: kindBefore, choices: nChoices, exp: exp.kind });
  } catch (e) {
    results.broken.push({ id: def.id, name: def.name, issue: 'THROW', error: String(e && e.message || e), exp: exp.kind });
  }
}

// Doctrines — principle vs body mismatch
for (const d of DC_CATALOG.cards.filter((c) => c.typ === 'Doktrin')) {
  if (/wähle/i.test(d.principle || '') && !/wähle/i.test(d.text || '')) {
    results.doctrineIssues.push({ id: d.id, name: d.name, issue: 'STALE_PRINCIPLE_WAEHLE', principle: d.principle, text: d.text });
  }
}

// Verify VERLEGUNG: DOK_SHIFT appears when a lateral slot is free
{
  const eng = makeEng(7);
  // clear fronts then one unit in C with free L/R
  ['L','C','R'].forEach((s) => { eng.player(0).front[s] = [null, null, null]; });
  putUnit(eng, 0, INF.id, 'C', 0);
  const dok = eng.instFromId('dc_dok_verlegung', 0);
  eng.player(0).doctrines = [dok];
  eng._dokTurnStart(eng.player(0));
  const acts = eng.listActions(0);
  const shift = acts.filter((a) => a.type === 'DOK_SHIFT');
  if (!shift.length) {
    results.doctrineIssues.push({ id: 'dc_dok_verlegung', name: 'Verlegung', issue: 'NO_SHIFT_ACTION_IN_LISTACTIONS', actionsSample: acts.slice(0, 8).map((a) => a.type) });
  } else {
    results.ok.push({ id: 'dc_dok_verlegung', name: 'Verlegung', kind: 'DOK_SHIFT', choices: shift.length, exp: 'doctrine' });
  }
}

// Stoßtrupp: passives must NOT also set dokAtk on turn-start
{
  const eng = makeEng(8);
  const dok = eng.instFromId('dc_dok_stosstrupp', 0);
  eng.player(0).doctrines = [dok];
  putUnit(eng, 0, INF.id, 'C', 0);
  const u = eng.player(0).front.C[0];
  const before = eng.currentAtkDef(u).atk;
  eng._dokTurnStart(eng.player(0));
  const after = eng.currentAtkDef(u).atk;
  const flagBonus = (u.flags && u.flags.dokAtk) || 0;
  if (flagBonus > 0) {
    results.doctrineIssues.push({
      id: 'dc_dok_stosstrupp', name: 'Stoßtrupp', issue: 'CONFIRMED_DOUBLE_DIP',
      passiveAtk: before, afterTurnStart: after, dokAtkFlag: flagBonus,
    });
  } else {
    results.ok.push({ id: 'dc_dok_stosstrupp', name: 'Stoßtrupp', kind: 'passive-only', choices: 0, exp: 'doctrine', atk: after });
  }
}

const summary = {
  soforteTotal: soforte.length,
  choiceOk: results.ok.length,
  broken: results.broken.length,
  autoOk: results.autoOk.length,
  rejected: results.rejected.length,
  doctrineIssues: results.doctrineIssues.length,
  brokenList: results.broken,
  doctrineList: results.doctrineIssues,
  rejectedSample: results.rejected.slice(0, 30),
  okSample: results.ok.slice(0, 20),
  botHeuristic: {
    pending: 'Test-Bot scorePending: Slot-Wahl Mitte bevorzugt (+8, Mitte +2). Eigene Ziele: ATK + 0,5·DEF. Feindziele: 2·ATK + DEF, +6 verdeckt, +8 wenn DEF≤3. Plus Zufall. Schloter-Bot: zufällige Pending-Wahl.',
    doctrineAuto: 'Schwerpunkt → dichtester Abschnitt (≥min_units). Sturmangriff → Infanterie mit höchstem Basis-ATK. Etappe → erste beschädigte heilen. Verlegung → DOK_SHIFT (Mitte bevorzugt). Stoßtrupp → nur Passive, kein TurnStart-dokAtk.',
  },
};
fs.writeFileSync(path.join(__dirname, 'audit_choice_cards.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify({
  soforteTotal: summary.soforteTotal,
  choiceOk: summary.choiceOk,
  broken: summary.broken,
  autoOk: summary.autoOk,
  rejected: summary.rejected,
  doctrineIssues: summary.doctrineIssues,
  brokenList: summary.brokenList,
  doctrineList: summary.doctrineList,
}, null, 2));
