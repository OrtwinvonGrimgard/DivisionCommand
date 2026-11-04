#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const WEB = path.join(__dirname, '..', 'Division_Command_0.5a', 'web');
const TYPES_DIR = path.join(WEB, 'js/data/sets/types');

const FILE_MAP = {
  Ausrüstung: 'ausruestung.js', Soforteinsatz: 'soforteinsatz.js',
  Infanterie: 'infanterie.js', Panzer: 'panzer.js', Artillerie: 'artillerie.js',
  Aufklärung: 'aufklaerung.js', Elite: 'elite.js', Unterstützung: 'unterstuetzung.js',
  Doktrin: 'doktrinen.js', Token: 'tokens.js', Operation: 'operationen.js',
};

function clean(t) {
  return String(t || '').replace(/\[[^\]]*\]/g, '').replace(/\([^)]*\)/g, '').replace(/\s+/g, ' ').trim();
}
function minusNum(s) { return Number(String(s).replace(/[−–]/g, '-')); }
function parseAtkDef(chunk) {
  let atk = 0, def = 0;
  const both = chunk.match(/([+\-−–]?\d+)\s*ATK\s*\/\s*([+\-−–]?\d+)\s*DEF/i);
  if (both) return { atk: minusNum(both[1]), def: minusNum(both[2]) };
  const a = chunk.match(/([+\-−–]?\d+)\s*ATK/i);
  const d = chunk.match(/([+\-−–]?\d+)\s*DEF/i);
  if (a) atk = minusNum(a[1]);
  if (d) def = minusNum(d[1]);
  return { atk, def };
}
function detectOnly(t) {
  const low = t.toLowerCase();
  if (/träger/.test(low)) return null;
  if (/infanterie/.test(low) && !/panzer|artillerie|aufklärung|elite/.test(low)) return 'infanterie';
  if (/(?:^|[;:]\s*)panzer\b|panzer \+/.test(low)) return 'panzer';
  if (/(?:^|[;:]\s*)artillerie\b|artillerie \+/.test(low)) return 'artillerie';
  if (/aufklärung/.test(low) && /artillerie/.test(low)) return 'aufklaerung|artillerie';
  if (/aufklärung/.test(low)) return 'aufklaerung';
  if (/elite/.test(low)) return 'elite';
  return null;
}

function parseEquipment(text) {
  const t = clean(text);
  const effects = [];

  if (/zweite eigene Infanterie|Zweite eigene Infanterie|Liegt eine zweite/i.test(t)) {
    const defM = t.match(/Träger\s*\+?\s*(\d+)\s*DEF/i) || t.match(/\+(\d+)\s*DEF/);
    const atkM = t.match(/\+(\d+)\s*ATK/);
    effects.push({ code: 'EQUIP_STANDARD', param: { def: defM ? +defM[1] : 1, atk_if_second: atkM ? +atkM[1] : 1 } });
  } else {
    for (const ch of t.split(/[.;]/)) {
      const head = ch.split(/,?\s*(?:wenn|solange|gegen|nach Sofort|nach Aufdecken|bis Zugende|diesen Zug)/i)[0];
      if (!/(Träger|Infanterie|Panzer|Artillerie|Aufklärung|Elite)/i.test(head) && !/^[+\-−–]?\d+\s*(ATK|DEF)/i.test(head.trim())) continue;
      const ad = parseAtkDef(head);
      if (!(ad.atk || ad.def)) continue;
      const param = { atk: ad.atk, def: ad.def };
      const o = detectOnly(ch);
      if (o) param.only = o;
      if (!effects.some((e) => e.code === 'EQUIP_STAT' && JSON.stringify(e.param) === JSON.stringify(param))) {
        effects.push({ code: 'EQUIP_STAT', param });
      }
    }
  }

  if (/erster Angriff|ersten Angriff|im ersten Angriff|beim ersten Angriff/i.test(t)) {
    const a = t.match(/zusätzlich \+(\d+)/i) || t.match(/\+(\d+)\s*ATK/i);
    effects.push({ code: 'CARRIER_FIRST_ATTACK_ATK', param: { atk: a ? +a[1] : 1 } });
  }
  if (/Träger (?:stirbt|zerstört)|Wird der Träger zerstört|Bei Zerstörung|Wenn Träger zerstört|Stirbt Träger/i.test(t)) {
    if (/zieh/i.test(t)) effects.push({ code: 'ON_DESTROY_DRAW', param: { draw: +(t.match(/ziehe\s*(\d+)/i) || [0, 1])[1] } });
    if (/\+(\d+)\s*ATK/i.test(t) && /Abschnitt/i.test(t)) effects.push({ code: 'ON_DESTROY_SECTION_ATK', param: { atk: +t.match(/\+(\d+)\s*ATK/i)[1] } });
    if (/\+(\d+)\s*DEF/i.test(t) && /Abschnitt/i.test(t)) effects.push({ code: 'ON_DESTROY_SECTION_DEF', param: { def: +t.match(/\+(\d+)\s*DEF/i)[1] } });
    if (/Schaden an einer eigenen/i.test(t)) effects.push({ code: 'ON_DESTROY_SELF_DAMAGE', param: { damage: +(t.match(/(\d+)\s*Schaden/i) || [0, 1])[1] } });
  }
  if (/heilen bei Schaden|einmalig \d+ heilen bei Schaden/i.test(t)) {
    effects.push({ code: 'EQUIP_HEAL_ONCE', param: { heal: +(t.match(/(\d+)\s*heilen|heile\s*(\d+)/i) || [0, 1, 1])[1] || 1 } });
  }
  if (/einmal\/Zug heile|Träger: einmal\/Zug heile|einmal pro Zug.*heilen/i.test(t)) {
    effects.push({ code: 'EQUIP_HEAL_ONCE', param: { heal: +(t.match(/heile\s*(\d+)/i) || [0, 1])[1], perTurn: true } });
  }
  if (/heile\s*\d+.*zerstöre diese Karte/i.test(t)) {
    effects.push({ code: 'EQUIP_ONCE_HEAL_DESTROY', param: { heal: +(t.match(/heile\s*(\d+)/i) || [0, 2])[1] } });
  }
  if (/Einmalig:\s*heile\s*(\d+)/i.test(t)) {
    effects.push({ code: 'EQUIP_ONCE_HEAL_DESTROY', param: { heal: +t.match(/heile\s*(\d+)/i)[1], noDestroy: true, noAttack: /greift diesen Zug nicht/i.test(t) } });
  }
  if (/ignorier.*ersten?\s*Schaden|ignoriere den ersten Schaden/i.test(t)) effects.push({ code: 'EQUIP_IGNORE_FIRST_DAMAGE', param: {} });
  if (/Rauch|Nebelfeld/i.test(t) && /angegriffen|Kampf/i.test(t)) effects.push({ code: 'RAUCH' });
  if (/Wenn Träger angreift|nach Angriff|beim Angriff/i.test(t) && /Schaden/i.test(t)) {
    const d = t.match(/(\d+)\s*Schaden/i);
    if (/erleide|erleidet/i.test(t)) effects.push({ code: 'EQUIP_ON_ATTACK_DAMAGE', param: { self: d ? +d[1] : 1 } });
    else if (/\+(\d+)\s*Schaden/i.test(t)) effects.push({ code: 'EQUIP_ON_ATTACK_DAMAGE', param: { bonus: +t.match(/\+(\d+)\s*Schaden/i)[1] } });
  }
  if (/Träger kostet\s*1\s*weniger/i.test(t)) {
    if (!effects.some((e) => e.code === 'EQUIP_STAT')) effects.push({ code: 'EQUIP_STAT', param: { atk: 0, def: 0, costReduce: 1 } });
    else effects.find((e) => e.code === 'EQUIP_STAT').param.costReduce = 1;
    if (/ziehe\s*1/i.test(t)) effects.push({ code: 'ON_ENTER_DRAW', param: { value: 1 } });
    if (/decke\s*1\s*auf/i.test(t)) effects.push({ code: 'REVEAL', param: { count: 1 } });
  }
  if (/Soforteinsatz\s*[−\-–]?1\s*Kosten/i.test(t)) effects.push({ code: 'EQUIP_DISCOUNT_AURA', param: { type: 'Soforteinsatz', amount: 1 } });
  if (/Beim Ausspielen:\s*ziehe|beim Ausspielen ziehe/i.test(t) && !effects.some((e) => e.code === 'ON_ENTER_DRAW')) {
    effects.push({ code: 'ON_ENTER_DRAW', param: { value: 1 } });
  }
  if (/Beim Ausspielen:\s*decke|beim Ausspielen decke|Beim Ausspielen: decke/i.test(t)) effects.push({ code: 'REVEAL', param: { count: 1 } });
  if (/heilt\s*1 am Zugende/i.test(t)) effects.push({ code: 'MEDIZIN', param: { self: 1, flank: 0 } });
  if (/ziehe 1 wenn.*Sofort|einmal\/Zug:\s*ziehe 1 wenn Sofort/i.test(t)) effects.push({ code: 'EQUIP_SOFT_DRAW', param: { draw: 1 } });
  if (/nicht Ziel des ersten gegnerischen Angriffs/i.test(t)) effects.push({ code: 'EQUIP_IGNORE_FIRST_DAMAGE', param: { untouchableFirst: true } });
  if (/deckt einmal\/Zug kostenlos auf/i.test(t)) effects.push({ code: 'HAND_PEEK', param: { free: true } });
  if (/Angreifer gilt als aufgeklärt/i.test(t)) effects.push({ code: 'REVEAL_STRIKE' });
  if (/1 weniger aus dem Friedhof/i.test(t)) effects.push({ code: 'COST_NEXT', param: { fromGrave: true, amount: 1 } });
  if (/einmalig Angriff abbrechen/i.test(t)) {
    effects.push({ code: 'EQUIP_ONCE_HEAL_DESTROY', param: { heal: 2, noDestroy: true } });
    effects.push({ code: 'ON_ENTER_DRAW', param: { value: 1 } });
  }
  if (/Solange Träger lebt:.*ignoriert den ersten/i.test(t)) effects.push({ code: 'EQUIP_IGNORE_FIRST_DAMAGE', param: { sectionInf: true } });
  if (/wenn Infanterie den Abschnitt betritt.*Träger \+(\d+)\s*DEF/i.test(t)) effects.push({ code: 'EQUIP_STAT', param: { atk: 0, def: 1 } });
  if (/Träger deckt auf beim Angriff|Ziel\s*[−\-–](\d+)\s*DEF/i.test(t) && /Träger/i.test(t)) {
    effects.push({ code: 'REVEAL_STRIKE' });
    const m = t.match(/[−\-–](\d+)\s*DEF/i);
    if (m) effects.push({ code: 'EQUIP_ON_ATTACK_DAMAGE', param: { debuffDef: +m[1] } });
  }

  if (!effects.length) return { effects: [], status: 'none' };
  const complex = /ziehe|heile|Schaden|aufdeck|Angriff abbrechen|ignorier|kostet|Friedhof|Kill|ruht|Heilung/i.test(t);
  const rich = effects.some((e) => e.code !== 'EQUIP_STAT');
  if (complex && !rich) return { effects, status: 'partial' };
  if (/einmal\/Zug: ziehe|ziehe 1 wenn|nach Aufdecken|wenn Sofort|wenn Unterstützung|Kill|ruht|Ruhezug/i.test(t)
      && !effects.some((e) => /SOFT_DRAW|HEAL|ON_DESTROY|MEDIZIN|FIRST_ATTACK|ONCE_HEAL|ON_ENTER|IGNORE|DISCOUNT|COST_NEXT|HAND_PEEK|REVEAL|COND_|ONCE_|TURN_START|AFTER_REVEAL|REVEAL_ALLY|KILL_DRAW|DRAW_ON_|ON_REST|NEGATE_DAMAGE|ON_REVEAL_ATK/.test(e.code))) {
    return { effects, status: 'partial' };
  }
  return { effects, status: 'full' };
}

function parseInstant(text) {
  const t = clean(text);
  const effects = [];

  if (/Ziehe zwei Karten|ziehe zwei Karten|Ziehe\s*2\s*Karten/i.test(t)) {
    effects.push({ code: 'DRAW', param: { value: 2 } });
  } else if (/Wirf\s*1\s*ab;\s*ziehe\s*2|Ziehe\s*2.*(?:wirf|lege)\s*1\s*ab/i.test(t)) {
    effects.push({ code: 'DRAW_DISCARD', param: { draw: 2, discard: 1 } });
  } else {
    const m = t.match(/ziehe\s*(\d+)\s*Karten?/i) || t.match(/(?:^|[.]\s*)Ziehe\s*(\d+)(?!\s*Infanterie)/i);
    if (m && !/ziehe eine Infanterie/i.test(t)) effects.push({ code: 'DRAW', param: { value: +m[1] } });
  }
  if (/ziehe eine Infanterie/i.test(t)) {
    effects.push({ code: /Ablage/i.test(t) ? 'RETURN_INFANTRY_FROM_DISCARD' : 'DRAW_AND_PLAY_INFANTRY' });
  }

  const healAll = t.match(/Heile alle[^.]*um\s*(\d+)/i);
  if (healAll) effects.push({ code: 'HEAL', param: { value: +healAll[1], all: true, filter: /Panzer und Artillerie/i.test(t) ? 'panzer|artillerie' : null } });
  else {
    const heal = t.match(/Heile\s*(\d+)(?:\s*DEF)?/i);
    if (heal) effects.push({ code: 'HEAL', param: { value: +heal[1] } });
  }

  if (/Allen Feinden\s*(\d+)\s*Schaden/i.test(t)) {
    effects.push({ code: 'MASS_DAMAGE', param: { value: +t.match(/Allen Feinden\s*(\d+)/i)[1] } });
  } else if (/Zwei Feinde je\s*(\d+)\s*Schaden/i.test(t)) {
    effects.push({ code: 'DEAL_DAMAGE', param: { value: +t.match(/(\d+)\s*Schaden/i)[1], count: 2 } });
  } else if (/füge[^.]*?(\d+)\s*Schaden|erleidet\s*(\d+)\s*Schaden|(\d+)\s*Schaden/i.test(t) && !/Allen Feinden|Zwei Feinde|einrückende erleiden/i.test(t)) {
    const m = t.match(/füge[^.]*?(\d+)\s*Schaden/i) || t.match(/erleidet\s*(\d+)\s*Schaden/i) || t.match(/(\d+)\s*Schaden/i);
    const isOwn = /eigene[rn]? (?:Einheit|Infanterie).{0,30}erleidet|danach\s*\d+\s*Schaden an ihr|erleidet 1 Schaden und hat|eine eigene Einheit erleidet/i.test(t);
    const isEnemy = /gegner|Feind|feindlich/i.test(t);
    if (isOwn && !isEnemy) effects.push({ code: 'SELF_DAMAGE', param: { value: +(m[1] || m[2] || m[3]) } });
    else effects.push({ code: 'DEAL_DAMAGE', param: { value: +(m[1] || m[2] || m[3]) } });
  }

  // ATK buffs
  if (/\+(\d+)\s*ATK/i.test(t)) {
    const m = t.match(/\+(\d+)\s*ATK/i);
    const all = /Jede eigene|Eigene Infanterie|Eigene Artillerie|Eigene Angriffe|Eigene Einheiten|Artillerie und Infanterie|Zwei Einheiten|1–2 Einheiten/i.test(t);
    const section = /im Abschnitt/i.test(t);
    if (all || section) {
      effects.push({
        code: section && !/Eigene Einheiten/i.test(t) ? 'BUFF_SECTION' : 'BUFF_ALL_OWN',
        param: {
          atk: +m[1],
          filter: /Artillerie und Infanterie/i.test(t) ? null : /Infanterie/i.test(t) ? 'infanterie' : /Artillerie/i.test(t) ? 'artillerie' : null,
          until: 'turn',
        },
      });
    } else if (/Sie hat in diesem Zug|hat in diesem Zug|Wähle eine eigene|1 Einheit|Einheit, die|Einheit \+/i.test(t) || /bis Zugende|diesen Zug|Ende nächsten/i.test(t)) {
      const ad = parseAtkDef(t);
      effects.push({ code: 'BUFF', param: { atk: ad.atk || +m[1], def: ad.def || 0, until: 'turn' } });
    }
  }
  if (/\+(\d+)\s*DEF/i.test(t) && !effects.some((e) => (e.code === 'BUFF' || e.code === 'BUFF_SECTION' || e.code === 'BUFF_ALL_OWN') && e.param.def)) {
    const m = t.match(/\+(\d+)\s*DEF/i);
    if (/Abschnitt \+/i.test(t)) effects.push({ code: 'BUFF_SECTION', param: { def: +m[1], until: 'turn' } });
    else if (/1 Einheit \+|Einheit \+|Einheit \+/i.test(t) || /bis Zugende|diesen Zug/i.test(t)) {
      effects.push({ code: 'BUFF', param: { def: +m[1], until: 'turn' } });
    }
  }
  if (/\+(\d+)\s*ATK\/\+(\d+)\s*DEF/i.test(t) && !effects.some((e) => e.code === 'BUFF' && e.param.atk && e.param.def)) {
    const m = t.match(/\+(\d+)\s*ATK\/\+(\d+)\s*DEF/i);
    effects.push({ code: 'BUFF', param: { atk: +m[1], def: +m[2], until: 'turn' } });
  }

  if (/Ziel\s*[−\-–](\d+)\s*DEF|[−\-–](\d+)\s*DEF bis Zugende/i.test(t)) {
    effects.push({ code: 'BUFF', param: { def: -((t.match(/[−\-–](\d+)\s*DEF/i) || [0, 1])[1]), until: 'turn', enemy: true } });
  }
  if (/Feind\s*[−\-–](\d+)\s*ATK|[−\-–](\d+)\s*ATK bis Zugende|Angreifer\s*-?\s*(\d+)\s*ATK/i.test(t)) {
    const m = t.match(/[−\-–-](\d+)\s*ATK/i) || t.match(/-\s*(\d+)\s*ATK/i);
    effects.push({ code: 'BUFF', param: { atk: -(m ? +m[1] : 1), until: 'turn', enemy: true } });
  }

  if (/Zerstöre Feind mit\s*[≤<=]?\s*(\d+)\s*DEF/i.test(t)) {
    effects.push({ code: 'DESTROY_IF_DEF', param: { maxDef: +t.match(/(\d+)\s*DEF/i)[1] } });
  } else if (/Zerstöre eine gegnerische|Zerstöre Feind(?! mit)/i.test(t)) {
    effects.push({ code: 'DESTROY', param: { enemy: true } });
  }
  if (/Opfere eine eigene Infanterie/i.test(t) && /Schaden/i.test(t)) {
    effects.push({ code: 'SACRIFICE_INFANTRY_DAMAGE', param: { damage: +(t.match(/(\d+)\s*Schaden/i) || [0, 3])[1] } });
  } else if (/Zerstöre eine eigene|Opfere eine eigene/i.test(t)) {
    effects.push({ code: 'SACRIFICE', param: {} });
    if (/Spiele eine Einheit aus der Hand/i.test(t)) effects.push({ code: 'REPLACE_UNIT', param: {} });
  }

  if (/Ausrüstung kostet\s*1\s*weniger|Spiele Ausrüstung um\s*1\s*weniger/i.test(t)) effects.push({ code: 'COST_NEXT', param: { type: 'Ausrüstung', amount: 1 } });
  if (/Einheit kostet\s*1\s*weniger|nächste Einheit kostet|Spiele eine Einheit aus der Hand mit\s*\d+\s*weniger|Spiele eine Einheit aus der Hand um\s*\d+\s*weniger/i.test(t)) {
    const m = t.match(/(?:mit|um)\s*(\d+)\s*weniger/i);
    effects.push({ code: 'COST_NEXT', param: { type: 'Einheit', amount: m ? +m[1] : 1 } });
  }
  if (/Nächste Sofort kostet\s*1\s*weniger|Sofort um\s*1\s*weniger/i.test(t)) effects.push({ code: 'COST_NEXT', param: { type: 'Soforteinsatz', amount: 1 } });
  if (/Spiele eine Infanterie aus der Hand|Infanterie kostet\s*1/i.test(t)) effects.push({ code: 'PLAY_INF_DISCOUNT', param: { amount: 1 } });

  if (/greift sofort an|ein zweites Mal|Extraangriff/i.test(t)) effects.push({ code: 'EXTRA_ATTACK', param: {} });
  if (/Bringe zerstörten|mit\s*\d+\s*DEF zurück/i.test(t)) {
    effects.push({ code: 'RETURN_UNIT_GRAVE', param: { def: +(t.match(/mit\s*(\d+)\s*DEF/i) || [0, 2])[1], filter: /Panzer/i.test(t) ? 'panzer|artillerie' : null } });
  }
  if (/Decke.*auf|decke\s*\d+\s*auf|Markiere.*beobachtet|gilt als beobachtet/i.test(t)) {
    if (/Markiere 2|Doppelbeobachtung/i.test(t)) effects.push({ code: 'MARK_OBSERVED', param: { count: 2 } });
    else if (/Hand des Gegners/i.test(t)) effects.push({ code: 'LOOK_HAND', param: {} });
    else effects.push({ code: 'REVEAL', param: { count: 1 } });
  }
  if (/(\d+)\s*AP/i.test(t) && /erhält|gewinnt|zusätzlich/i.test(t)) effects.push({ code: 'GAIN_AP', param: { value: +t.match(/(\d+)\s*AP/i)[1] } });
  if (/Schiebe|Bewege\s*\d|umgruppierung|Verlegung|um 1 Abschnitt|um 1;/i.test(t)) {
    effects.push({ code: 'MOVE_SLOTS', param: { slots: 1, count: /zwei|bis zu zwei/i.test(t) ? 2 : 1 } });
  }
  if (/Unterstützung.*entferne|Entferne eine feindliche Unterstützung|Unterstützungslinie/i.test(t)) {
    effects.push({ code: 'CLEAR_SUPPORT_OR_DEBUFF', param: {} });
  }
  if (/Negiere/i.test(t)) effects.push({ code: 'CLEAR_ATK_MALUS', param: { negateBonus: true } });
  if (/oberste Deckkarte|Sieh die oberste/i.test(t)) effects.push({ code: 'LOOK_TOP', param: { count: 1, infantryToHand: true } });
  if (/kann diesen Zug nicht angreifen|darf diesen Zug nicht bewegt/i.test(t)) effects.push({ code: 'OUT_OF_COMBAT', param: {} });
  // Remaining nation-specific fallbacks
  if (/Panzer:\s*\+(\d+)\s*DEF und\s*(\d+)\s*heilen/i.test(t)) {
    const m = t.match(/\+(\d+)\s*DEF und\s*(\d+)\s*heilen/i);
    effects.push({ code: 'BUFF', param: { def: +m[1], until: 'turn' } });
    effects.push({ code: 'HEAL', param: { value: +m[2] } });
  }
  if (/Einrückende Einheit\s*[−\-–](\d+)\s*ATK/i.test(t)) effects.push({ code: 'BUFF', param: { atk: -1, until: 'turn', enemy: true } });
  if (/Allein stehende|Abschnitte mit 2\+/i.test(t)) {
    effects.push({ code: 'BUFF_ALL_OWN', param: { def: 1, until: 'turn' } });
    effects.push({ code: 'BUFF_SECTION', param: { atk: 1, until: 'turn' } });
  }
  if (/einrückende erleiden\s*(\d+)/i.test(t)) effects.push({ code: 'MASS_DAMAGE', param: { value: +(t.match(/erleiden\s*(\d+)/i)||[0,1])[1], onEnter: true } });
  if (/Ziel gilt als aufgeklärt|Angriffe gegen es \+(\d+)\s*ATK/i.test(t)) {
    effects.push({ code: 'REVEAL', param: { count: 1 } });
    effects.push({ code: 'BUFF_ALL_OWN', param: { atk: 1, until: 'turn' } });
  }
  if (/sie greifen nicht an, heilen\s*(\d+)/i.test(t)) {
    effects.push({ code: 'OUT_OF_COMBAT', param: {} });
    effects.push({ code: 'HEAL', param: { value: +(t.match(/heilen\s*(\d+)/i)||[0,2])[1], count: 2 } });
    effects.push({ code: 'BUFF', param: { def: 1, until: 'turn' } });
  }
  if (/Unterstützung im Abschnitt: Einheiten \+(\d+)\s*DEF/i.test(t)) {
    effects.push({ code: 'BUFF_SECTION', param: { def: 1, until: 'turn' } });
    if (/zieh/i.test(t)) effects.push({ code: 'DRAW', param: { value: 1 } });
  }
  if (/Einheit rückt in beliebigen Abschnitt|Spiele eine Einheit aus der Hand in einen zuletzt/i.test(t)) {
    effects.push({ code: 'COST_NEXT', param: { type: 'Einheit', amount: 0 } });
    effects.push({ code: 'BUFF', param: { atk: 1, until: 'turn' } });
  }
  if (/Zwei Feinde: eigene Angriffe gegen sie gelten als Flanke/i.test(t)) effects.push({ code: 'BUFF_ALL_OWN', param: { atk: 1, until: 'turn' } });
  if (/Wähle ein Ziel\.\s*Erster Schaden daran/i.test(t) || (/Erster Schaden daran \+1 ATK/i.test(t) && /Angreifer \+1 DEF/i.test(t))) {
    effects.push({ code: 'ZIELANGRIFF', param: { firstDmgBonus: 1, attackerDef: 1, drawOnKill: 1 } });
  } else if (/Erster Schaden daran|Wenn das Ziel fällt/i.test(t)) {
    effects.push({ code: 'BUFF', param: { atk: 1, def: 1, until: 'turn' } });
    effects.push({ code: 'ON_DESTROY_DRAW', param: { draw: 1 } });
  }
  if (/als stünden sie angrenzend/i.test(t)) {
    effects.push({ code: 'UMGEHEN', param: { atk: 1 } });
  }
  if (/Negiere\s*(\d+)\s*Schaden an Abschnitt/i.test(t)) {
    const nm = t.match(/Negiere\s*(\d+)/i);
    const hm = t.match(/heile\s*(\d+)/i);
    effects.push({ code: 'KEIN_LOCH', param: { negate: nm ? +nm[1] : 2, heal: hm ? +hm[1] : 1 } });
  }
  if (/Scheinschwerpunkt|Ende Zug:\s*\+\d+\s*DEF auf einen Abschnitt|Nächster Zugbeginn:.*\+\d+\s*ATK auf einen anderen/i.test(t)) {
    effects.push({ code: 'BUFF_SECTION', param: { def: 1, until: 'turn' } });
    effects.push({ code: 'BUFF_SECTION', param: { atk: 1, until: 'next' } });
  }

  if (!effects.length) return { effects: [], status: 'none' };
  let status = 'full';
  const clauses = t.split(/[.;]/).filter((x) => x.trim().length > 10);
  if (clauses.length > effects.length + 1) status = 'partial';
  if (/Scheinschwerpunkt|Ablösung|Kostendifferenz/i.test(t)) status = 'partial';
  if (effects.some((e) => e.code === 'ZIELANGRIFF' || e.code === 'UMGEHEN' || e.code === 'KEIN_LOCH')) status = 'full';
  return { effects, status };
}

function parseUnit(text, typ) {
  const t = clean(text);
  const effects = [];
  if (/Beim Ausspielen:\s*ziehe/i.test(t)) effects.push({ code: 'ON_ENTER_DRAW', param: { value: +(t.match(/ziehe\s*(\d+)/i) || [0, 1])[1] } });
  if (/Beim Ausspielen:.*\+(\d+)\s*ATK/i.test(t)) effects.push({ code: 'ON_ENTER_BUFF', param: { atk: +t.match(/\+(\d+)\s*ATK/i)[1], until: 'turn' } });
  if (/Beim Ausspielen:.*heile/i.test(t)) effects.push({ code: 'ON_ENTER_BUFF', param: { heal: +(t.match(/heile\s*(\d+)/i) || [0, 1])[1] } });
  if (/Wenn.*stirbt:.*ziehe|Wenn zerstört:.*ziehe|stirbt: ziehe/i.test(t)) effects.push({ code: 'ON_DESTROY_DRAW', param: { draw: 1 } });
  if (/Kostet\s*1\s*weniger/i.test(t)) effects.push({ code: 'COST_REDUCE', param: { amount: 1 } });
  if (/verdeckt spielbar|Guerrilla/i.test(t)) effects.push({ code: 'GUERRILLA_HIDE' });
  if (/Hinterhalt/i.test(t)) effects.push({ code: 'AMBUSH' });
  if (/^\+(\d+)\s*ATK(?!,?\s*(?:wenn|solange|gegen))/i.test(t)) effects.push({ code: 'PASSIVE_ATK', param: { atk: +t.match(/\+(\d+)\s*ATK/i)[1] } });
  else if (/\+(\d+)\s*ATK/i.test(t) && /wenn|solange|gegen/i.test(t)) effects.push({ code: 'COND_ATK', param: { atk: +t.match(/\+(\d+)\s*ATK/i)[1], text: t } });
  if (/\+(\d+)\s*DEF/i.test(t) && /wenn|solange/i.test(t)) effects.push({ code: 'COND_DEF', param: { def: +t.match(/\+(\d+)\s*DEF/i)[1], text: t } });
  else if (/^\+(\d+)\s*DEF/i.test(t)) effects.push({ code: 'PASSIVE_DEF', param: { def: +t.match(/\+(\d+)\s*DEF/i)[1] } });
  if (typ === 'Artillerie' && /Angriff.*benachbart|1 Schaden auch an benachbart/i.test(t)) effects.push({ code: 'ATTACK_ANY_FRONT' });
  if (!effects.length) return { effects: [], status: 'none' };
  if (effects.some((e) => e.code === 'COND_ATK' || e.code === 'COND_DEF')) return { effects, status: 'partial' };
  return { effects, status: 'full' };
}

function parseSupport(text) {
  const t = clean(text);
  const effects = [];
  if (/Artillerie \+(\d+)\s*ATK|Eigene Artillerie \+/i.test(t)) effects.push({ code: 'AURA_FRONT_ATK' });
  if (/Eigene.*\+(\d+)\s*DEF|Front \+(\d+)\s*DEF/i.test(t)) effects.push({ code: 'AURA_FRONT_DEF' });
  if (/Nächste Einheit kostet|Einheit kostet 1 weniger/i.test(t)) effects.push({ code: 'UNIT_DISCOUNT' });
  if (/Soforteinsatz kostet 1 weniger/i.test(t)) effects.push({ code: 'TACTIC_DISCOUNT' });
  if (/Ausrüstung.*weniger/i.test(t)) effects.push({ code: 'EQUIP_DISCOUNT' });
  if (!effects.length) return { effects: [], status: 'none' };
  return { effects, status: 'partial' };
}

const FULL_SIDE_CODES = new Set([
  'EQUIP_COND_ATK','EQUIP_COND_DEF','EQUIP_ONCE_PAIN_ATK','EQUIP_ONCE_DRAW_PAIN',
  'EQUIP_TURN_START_HEAL','EQUIP_AFTER_REVEAL_DEF','EQUIP_SOFT_DRAW','EQUIP_REVEAL_ALLY_DEF',
  'EQUIP_KILL_DRAW_BUFF','EQUIP_DRAW_ON_ATTACK','EQUIP_DRAW_ON_HEAL','EQUIP_ON_REST',
  'EQUIP_NEGATE_DAMAGE','EQUIP_ON_REVEAL_ATK','ZIELANGRIFF','UMGEHEN','KEIN_LOCH',
  'EQUIP_STAT','EQUIP_STANDARD','REVEAL_STRIKE','EQUIP_IGNORE_FIRST_DAMAGE',
  'EQUIP_HEAL_ONCE','EQUIP_ONCE_HEAL_DESTROY','EQUIP_ON_ATTACK_DAMAGE','ON_DESTROY_DRAW',
  'ON_DESTROY_SECTION_ATK','ON_DESTROY_SECTION_DEF','ON_ENTER_DRAW','MEDIZIN','RAUCH',
  'CARRIER_FIRST_ATTACK_ATK','EQUIP_DISCOUNT_AURA','COST_NEXT','HAND_PEEK',
]);

function storedEffectsCover(card) {
  const fx = card.effects || [];
  if (!fx.length) return false;
  const codes = fx.map((e) => e.code);
  if (codes.some((c) => c !== 'EQUIP_STAT' && FULL_SIDE_CODES.has(c))) return true;
  if (codes.includes('EQUIP_STAT') && codes.length === 1) {
    const param = fx[0].param || {};
    if (param.costReduce) return true;
    const t = String(card.text || '');
    if (!/wenn|solange|Einmal|Ruhezug|ruht|Aufdecken|Sofort|Kill|heilen|negiere|angrenzt/i.test(t)) return true;
  }
  return false;
}

function parseCard(card) {
  if (card.effects && card.effects.length && card.set === 'set_alpha') return { effects: card.effects, status: 'full', kept: true };
  if (card.effects && card.effects.length && card.set === 'set_nations' && storedEffectsCover(card)) {
    return { effects: card.effects, status: 'full', kept: true };
  }
  const typ = card.typ || '';
  if (typ === 'Ausrüstung') return parseEquipment(card.text);
  if (typ === 'Soforteinsatz') return parseInstant(card.text);
  if (typ === 'Unterstützung') return parseSupport(card.text);
  if (['Infanterie', 'Panzer', 'Artillerie', 'Aufklärung', 'Elite'].includes(typ)) return parseUnit(card.text, typ);
  return { effects: card.effects || [], status: (card.effects && card.effects.length) ? 'full' : 'none' };
}

function loadTypes() {
  const ctx = { window: { DC_SET_TYPES: {} } };
  for (const f of fs.readdirSync(TYPES_DIR).filter((x) => x.endsWith('.js'))) {
    vm.runInNewContext(fs.readFileSync(path.join(TYPES_DIR, f), 'utf8'), ctx);
  }
  return ctx.window.DC_SET_TYPES;
}

function rewriteFile(typName, cards) {
  const file = FILE_MAP[typName];
  if (!file) return;
  const out = 'window.DC_SET_TYPES = window.DC_SET_TYPES || {};\nwindow.DC_SET_TYPES[' +
    JSON.stringify(typName) + '] = ' + JSON.stringify(cards, null, 2) + ';\n';
  fs.writeFileSync(path.join(TYPES_DIR, file), out);
}

function summarize(types) {
  const byTyp = {};
  const noneEq = [], noneSo = [], partialEq = [], partialSo = [];
  let wiredEq = 0, wiredSo = 0, emptyEq = 0, emptySo = 0;
  for (const [typ, arr] of Object.entries(types)) {
    const info = { total: arr.length, full: 0, partial: 0, none: 0, withEffects: 0 };
    for (const c of arr) {
      const r = parseCard(c);
      info[r.status]++;
      if ((c.effects || []).length) info.withEffects++;
      if (typ === 'Ausrüstung' && c.set === 'set_nations') {
        if ((c.effects || []).length) wiredEq++; else emptyEq++;
        if (r.status === 'none') noneEq.push(c);
        if (r.status === 'partial') partialEq.push({ c, r });
      }
      if (typ === 'Soforteinsatz' && c.set === 'set_nations') {
        if ((c.effects || []).length) wiredSo++; else emptySo++;
        if (r.status === 'none') noneSo.push(c);
        if (r.status === 'partial') partialSo.push({ c, r });
      }
    }
    byTyp[typ] = info;
  }
  return { byTyp, noneEq, noneSo, partialEq, partialSo, wiredEq, wiredSo, emptyEq, emptySo };
}

function main() {
  const apply = process.argv.includes('--apply');
  const types = loadTypes();
  if (apply) {
    for (const [typ, arr] of Object.entries(types)) {
      for (const card of arr) {
        if (card.set !== 'set_nations') continue;
        card.effects = parseCard(card).effects;
      }
      rewriteFile(typ, arr);
    }
  }
  const types2 = apply ? loadTypes() : types;
  // For after-apply, status from stored effects presence + reparse
  const s = summarize(types2);
  console.log(JSON.stringify(s.byTyp, null, 2));
  console.log('Ausrüstung nation wired/empty', s.wiredEq, s.emptyEq, 'parse none/partial', s.noneEq.length, s.partialEq.length);
  console.log('Sofort nation wired/empty', s.wiredSo, s.emptySo, 'parse none/partial', s.noneSo.length, s.partialSo.length);
  if (s.noneEq.length) {
    console.log('NONE Ausr:');
    s.noneEq.forEach((c) => console.log(' ', c.id, c.text));
  }
  if (s.noneSo.length) {
    console.log('NONE Sofort (' + s.noneSo.length + '):');
    s.noneSo.slice(0, 30).forEach((c) => console.log(' ', c.id, c.text));
  }
}

main();
