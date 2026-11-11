#!/usr/bin/env node
/**
 * Baut `web/js/data/sets/types/nation_pools.js` aus den Nationenlisten
 * (`scripts/nation_pools/nations/*.js`). Nur Effektcodes, die die Tests prüfen.
 */
'use strict';
/* Baut web/js/data/sets/types/nation_pools.js aus den handgeschriebenen Nationenlisten (nations/*.js).
   Jede Karte nutzt NUR Effektcodes, deren Verhalten in test_nation_pools.js gegen die Engine geprüft wird.
   Kurztext (text) steuert zugleich die Zielwahl-Heuristik der Engine (eigene ↔ gegnerische); die
   ausführliche Regel steht in rules[] und wird in der Detailansicht vollständig angezeigt. */
const fs = require('fs'), path = require('path');
const OUT = path.join(__dirname, '..', '..', 'Division_Command', 'web', 'js', 'data', 'sets', 'types', 'nation_pools.js');

/**
 * Kurzmap der allgemeinen Schlüsselwort-IDs für die Pool-Fabriken (IIFE, unveränderlich).
 */
const KW = (() => { const g = {}; require('vm').runInNewContext(fs.readFileSync(path.join(__dirname, '../../Division_Command/web/js/data/keywords.js'), 'utf8'), { window: g }); return g.DC_KEYWORDS; })();
const KIND = {
  I: { typ: 'Einheit', klasse: 'Infanterie', tags: ['einheit', 'infanterie'] },
  P: { typ: 'Einheit', klasse: 'Panzer', tags: ['einheit', 'panzer', 'kette', 'gepanzert'] },
  A: { typ: 'Einheit', klasse: 'Artillerie', tags: ['einheit', 'artillerie'] },
  S: { typ: 'Einheit', klasse: 'Aufklärung', tags: ['einheit', 'aufklaerung'] },
  E: { typ: 'Einheit', klasse: 'Elite', tags: ['einheit', 'elite', 'infanterie'] },
  U: { typ: 'Unterstützung', tags: ['unterstuetzung'] },
  X: { typ: 'Soforteinsatz', tags: ['soforteinsatz'] },
  R: { typ: 'Ausrüstung', tags: ['ausruestung'] },
};
const RAR = { b: 'bronze', s: 'silver', g: 'gold' };
const ONLY = { infanterie: 'Infanterie', panzer: 'Panzer', artillerie: 'Artillerie', aufklaerung: 'Aufklärung', elite: 'Elite' };
const FILTER = { infanterie: 'Infanterie', panzer: 'Panzer', artillerie: 'Artillerie' };
const PROT = 'Eingegrabene oder anderweitig geschützte gegnerische Einheiten stehen nicht zur Wahl; gibt es kein gültiges Ziel, kann die Karte nicht gespielt werden.';
const NBR = 'Benachbart = gleiche Reihe im direkt angrenzenden Abschnitt (links ↔ Mitte ↔ rechts) oder direkt davor/dahinter im selben Abschnitt.';

// ---- Einheiten-Fähigkeiten
const UNIT = {
  // Steilfeuer: any/sup are legacy tokens; final level/effects come from steilfeuer-map.json in applySteilfeuer().
  any: () => ({ fx: [], t: '', r: ['Die Einheit zählt für alle Regeln als Artillerie.'], sfHint: true }),
  /**
   * Steilfeuer-Platzhalter (legacy); Stufe und Effekte setzt später `applySteilfeuer`.
   */
  sup: () => ({ fx: [], t: '', r: [], sfHint: true }),
  /**
   * Steilfeuer IV: die Einheit kann die gesamte gegnerische Front beschießen.
   */
  iv: () => ({ fx: [{ code: 'ATTACK_ANY_FRONT' }], t: 'Steilfeuer IV: ganze Front.', r: ['Steilfeuer IV: ganze Front.', 'Die Einheit zählt für alle Regeln als Artillerie.'] }),
  /**
   * Aufklärung: deckt beim Ausspielen (und als Fähigkeit) eine verdeckte gegnerische Einheit auf.
   */
  scout: () => ({ fx: [{ code: 'AUFKLAERUNG', param: { n: 1, onEnter: true } }], t: 'Beim Ausspielen: decke 1 verdeckte gegnerische Fronteinheit auf. Fähigkeit (1 AP): erneut.', r: ['Beim Ausspielen (kostenlos): Hat der Gegner verdeckte Fronteinheiten, wählst du genau eine davon; sie wird aufgedeckt. Ohne verdeckte Ziele passiert nichts.', 'Fähigkeit „Aufklären“: Kostet 1 AP und erschöpft diese Einheit (nicht im Zug, in dem sie gelegt wurde). Wähle eine verdeckte gegnerische Fronteinheit und decke sie auf. Ohne verdeckte Ziele nicht nutzbar.'] }),
  /**
   * Absetzen: nach einem eigenen Angriff wird die Einheit bis zum nächsten Zug verdeckt.
   */
  hide: () => ({ fx: [{ code: 'RELOCATE_HIDE' }], t: 'Nach jedem eigenen Angriff verdeckt bis zu deinem nächsten Zug.', r: ['Absetzen: Nachdem diese Einheit angegriffen hat, wird sie verdeckt und bleibt verdeckt, bis dein nächster Zug beginnt. Der Gegner sieht dann nur „Verdeckte Einheit“.', 'Liegt beim Gegner eine Unterstützung, die verdeckte Karten verbietet, entfällt das Verdecken.'] }),
  /**
   * Flankenschutz: benachbarte eigene Fronteinheiten erhalten +2 DEF.
   */
  flank: () => ({ fx: [{ code: 'FLANK_DEF' }], t: 'Benachbarte eigene Fronteinheiten +2 DEF.', r: ['Flankenschutz (solange diese Einheit steht): Jede benachbarte eigene Fronteinheit hat +2 DEF. ' + NBR + ' Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).'] }),
  /**
   * Begleitschutz: benachbarte eigene Infanterie erhält +1 DEF.
   */
  mech: () => ({ fx: [{ code: 'MECH_AURA' }], t: 'Benachbarte eigene Infanterie +1 DEF.', r: ['Begleitschutz (solange diese Einheit steht): Jede benachbarte eigene Infanterie hat +1 DEF. ' + NBR + ' Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).'] }),
  /**
   * Verbund: +2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.
   */
  lead: () => ({ fx: [{ code: 'FUEHRUNG_V' }], t: '+2 DEF, solange eine benachbarte eigene gepanzerte Einheit steht.', r: ['Verbund: Diese Einheit hat +2 DEF, solange mindestens eine benachbarte eigene Einheit gepanzert ist (Panzer/Kette). ' + NBR + ' Der Bonus wird jedes Mal neu berechnet, wenn du eine eigene Einheit auslegst (bis dahin bleibt der zuletzt berechnete Wert).'] }),
  /**
   * +2 Schaden gegen Infanterie.
   */
  vsinf: () => ({ fx: [{ code: 'VS_INF' }], t: 'Angriffe gegen Infanterie: +2 Schaden.', r: ['Greift diese Einheit eine Infanterie an, verursacht sie 2 Schaden zusätzlich zu ihrem ATK. Der Gegenschlag des Ziels bleibt unverändert.'] }),
  /**
   * Panzerbrechend: zusätzlicher Schaden gegen gepanzerte Ziele.
   */
  ign: (n) => ({ fx: [{ code: 'IGNORE_DEF', param: { ignore_def: +n } }], t: 'Angriffe gegen gepanzerte Ziele: +' + n + ' Schaden.', r: ['Panzerbrechend: Greift diese Einheit ein gepanzertes Ziel an (Panzer, Kettenfahrzeuge), verursacht sie ' + n + ' Schaden zusätzlich zu ihrem ATK.'] }),
  /**
   * Feuerüberlegenheit: +1 Schaden gegen ungepanzerte Ziele.
   */
  fire: () => ({ fx: [{ code: 'FEUERUEBERLEGENHEIT' }], t: 'Angriffe gegen ungepanzerte Ziele: +1 Schaden.', r: ['Feuerüberlegenheit: Greift diese Einheit ein ungepanzertes Ziel an, verursacht sie 1 Schaden zusätzlich zu ihrem ATK.'] }),
  /**
   * Überfall: +1 Schaden im Angriff; im Nebelfeld +1 beim Gegenschlag.
   */
  ambush: () => ({ fx: [{ code: 'AMBUSH' }], t: 'Überfall: +1 Schaden beim Angriff; im Nebelfeld trifft ihr Gegenschlag mit +1.', r: ['Greift diese Einheit an und liegt kein Nebelfeld auf Angreifer oder Ziel, verursacht sie 1 Schaden zusätzlich.', 'Wird sie angegriffen, während ein Nebelfeld liegt, erleidet der Angreifer 1 zusätzlichen Gegenschaden.'] }),
  /**
   * Schwere Panzerung: jeder erlittene Schaden wird um n verringert.
   */
  minus: (n) => { const k = n != null && n !== '' ? +n : 2; return { fx: [n != null && n !== '' ? { code: 'SCHADEN_MINUS', param: { n: k } } : { code: 'SCHADEN_MINUS' }], t: 'Jeder Schaden an dieser Einheit −' + k + '.', r: ['Schwere Panzerung: Jeder einzelne Schaden, den diese Einheit erleidet (Kampf, Soforteinsatz, Effekt), wird um ' + k + ' verringert, mindestens auf 0.'] }; },
  /**
   * Weist der Einheit nur das genannte Schlüsselwort zu (ohne weiteren Effektcode).
   */
  kw: (w) => { if (!KW[w]) throw new Error('Unbekanntes Schlüsselwort ' + w); return { fx: [], kw: [w], t: '', r: [] }; },
  /**
   * Beim Ausspielen: sieh dir bis zu n gegnerische Handkarten an.
   */
  peek: () => ({ fx: [{ code: 'HAND_PEEK', param: { n: 2 } }], t: 'Beim Ausspielen: sieh dir 2 gegnerische Handkarten an.', r: ['Beim Ausspielen: Hat der Gegner Handkarten, wählst du bis zu 2 davon (verdeckt) und siehst sie dir an. Die Karten bleiben auf seiner Hand; nur du erfährst sie.'] }),
};
// ---- Soforteinsatz-Bausteine: o = eigenes Ziel, h = gegnerisches Ziel, n = ohne Ziel, s = Abschnitt
const SOF = {
  /**
   * Soforteinsatz: stärkt eine eigene Fronteinheit (ATK bis Zugende / DEF dauerhaft).
   */
  buff: (a, d) => ({ side: 'o', fx: [{ code: 'BUFF', param: { atk: +a, def: +d, until: 'turn' } }], t: 'Eine eigene Fronteinheit: ' + [a > 0 ? '+' + a + ' ATK bis Zugende' : '', d > 0 ? '+' + d + ' DEF dauerhaft' : ''].filter(Boolean).join(', ') + '.', r: ['Ziel: eine eigene Fronteinheit (Pflichtwahl).' + (a > 0 ? ' Sie erhält +' + a + ' ATK bis zum Ende dieses Zuges.' : '') + (d > 0 ? ' Sie erhält +' + d + ' DEF; der Bonus ist dauerhaft und erhöht auch ihre maximale DEF.' : '')] }),
  /**
   * Soforteinsatz: heilt DEF an einer eigenen Fronteinheit.
   */
  heal: (v) => ({ side: 'o', fx: [{ code: 'HEAL', param: { value: +v } }], t: 'Heile ' + v + ' DEF an einer eigenen Fronteinheit.', r: ['Ziel: eine eigene Fronteinheit (Pflichtwahl). Sie heilt bis zu ' + v + ' DEF, höchstens bis zu ihrer maximalen DEF. Unbeschädigte Ziele erhalten nichts.'] }),
  /**
   * Soforteinsatz-Preis: dieselbe eigene Einheit erleidet anschließend Schaden.
   */
  self: (v) => ({ side: 'o', fx: [{ code: 'SELF_DAMAGE', param: { value: +v } }], t: 'Danach erleidet sie ' + v + ' Schaden.', r: ['Preis: Dieselbe eigene Einheit erleidet danach ' + v + ' Schaden. Sinkt ihre DEF auf 0, wird sie zerstört.'] }),
  /**
   * Soforteinsatz: eine eigene Einheit darf in diesem Zug erneut angreifen.
   */
  extra: () => ({ side: 'o', fx: [{ code: 'EXTRA_ATTACK', param: {} }], t: 'Eine eigene Fronteinheit darf in diesem Zug erneut angreifen.', r: ['Die gewählte eigene Einheit wird bereit gemacht: Sie darf in diesem Zug noch einmal angreifen (normale AP-Kosten des Angriffs gelten).'] }),
  /**
   * Soforteinsatz: fügt einer gegnerischen Fronteinheit Schaden zu.
   */
  dmg: (v) => ({ side: 'h', fx: [{ code: 'DEAL_DAMAGE', param: { value: +v } }], t: 'Füge einer gegnerischen Fronteinheit ' + v + ' Schaden zu.', r: ['Ziel: eine gegnerische Fronteinheit (Pflichtwahl, auch verdeckt). Sie erleidet ' + v + ' Schaden; Schadensminderungen gelten. ' + PROT] }),
  /**
   * Soforteinsatz: deckt eine gegnerische Einheit auf und markiert sie als beobachtet.
   */
  obs: () => ({ side: 'h', fx: [{ code: 'MARK_OBSERVED', param: { count: 1 } }], t: 'Wähle eine gegnerische Fronteinheit: sie wird aufgedeckt und gilt als beobachtet.', r: ['Ziel: eine gegnerische Fronteinheit (Pflichtwahl). Ist sie verdeckt, wird sie aufgedeckt. Sie gilt als „beobachtet“ (für Aufklärungs-Doktrinen wie Lokalisierung relevant). ' + PROT] }),
  /**
   * Soforteinsatz: der Spieler zieht n Karten.
   */
  draw: (v) => ({ side: 'n', fx: [{ code: 'DRAW', param: { value: +v } }], t: 'Ziehe ' + v + ' Karte' + (v > 1 ? 'n' : '') + '.', r: ['Ziehe ' + v + ' Karte' + (v > 1 ? 'n' : '') + ' von deinem Deck. Ist das Deck leer, wird der Friedhof neu gemischt; bei voller Hand (7 Karten) wandert jede weitere gezogene Karte direkt auf den Friedhof.'] }),
  /**
   * Soforteinsatz: ziehen, danach die älteste Handkarte abwerfen.
   */
  dd: (d, x) => ({ side: 'n', fx: [{ code: 'DRAW_DISCARD', param: { draw: +d, discard: +x } }], t: 'Ziehe ' + d + ', dann wirf deine älteste Handkarte ab.', r: ['Ziehe ' + d + ' Karten. Danach wird automatisch die am längsten gehaltene Handkarte (ganz links) abgeworfen – keine freie Wahl. Handlimit 7: Überzählige gezogene Karten gehen auf den Friedhof.'] }),
  /**
   * Soforteinsatz: die nächste Einheit oder Unterstützung kostet weniger AP.
   */
  cost: (type, n) => { if (type !== 'Einheit') throw new Error('Rabatt nur für Einheit geprüft'); return { side: 'n', fx: [{ code: 'COST_NEXT', param: { type, amount: +n } }], t: 'Deine nächste Einheit oder Unterstützung kostet ' + n + ' AP weniger (mind. 1).', r: ['Rabatt: Die nächste Einheit oder Unterstützung, die du ausspielst, kostet ' + n + ' AP weniger, mindestens aber 1 AP. Der Rabatt verfällt nicht am Zugende, sondern wird beim nächsten passenden Ausspielen verbraucht. Soforteinsätze und Ausrüstung sind ausgenommen.'] }; },
  /**
   * Soforteinsatz: ATK-Bonus für einen eigenen Frontabschnitt bis Zugende.
   */
  secatk: (a, f) => ({ side: 's', fx: [{ code: 'BUFF_SECTION', targetSide: 'own', param: { atk: +a, filter: f || null, until: 'turn', targetSide: 'own' } }], t: 'Wähle einen eigenen Abschnitt: ' + (f ? 'deine ' + FILTER[f] : 'alle eigenen Einheiten') + ' dort +' + a + ' ATK bis Zugende.', r: ['Ziel: ein eigener Frontabschnitt (links, Mitte oder rechts; Pflichtwahl). ' + (f ? 'Jede eigene ' + FILTER[f] + '-Einheit' : 'Jede eigene Einheit') + ' dort hat bis zum Ende dieses Zuges +' + a + ' ATK. Auch leere Abschnitte dürfen gewählt werden (dann ohne Wirkung).'] }),
  /**
   * Soforteinsatz: dauerhafter DEF-Bonus für einen eigenen Frontabschnitt.
   */
  secdef: (d, f) => ({ side: 's', fx: [{ code: 'BUFF_SECTION', targetSide: 'own', param: { def: +d, filter: f || null, until: 'turn', targetSide: 'own' } }], t: 'Wähle einen eigenen Abschnitt: ' + (f ? 'deine ' + FILTER[f] : 'alle eigenen Einheiten') + ' dort +' + d + ' DEF dauerhaft.', r: ['Ziel: ein eigener Frontabschnitt (Pflichtwahl). ' + (f ? 'Jede eigene ' + FILTER[f] + '-Einheit' : 'Jede eigene Einheit') + ', die jetzt dort steht, erhält +' + d + ' DEF; der Bonus bleibt dauerhaft und erhöht auch die maximale DEF. Später gelegte Einheiten erhalten nichts.'] }),
};
// ---- Ausrüstung
const EQ = {
  /**
   * Ausrüstung: ändert ATK/DEF des Trägers, optional beschränkt auf einen Typ.
   */
  stat: (a, d, only) => ({ fx: [{ code: 'EQUIP_STAT', param: Object.assign({ atk: +a, def: +d }, only ? { only } : {}) }], t: 'Träger ' + [Number(a) ? (a > 0 ? '+' : '') + a + ' ATK' : '', Number(d) ? (d > 0 ? '+' : '') + d + ' DEF' : ''].filter(Boolean).join(' und ') + '.', r: ['Ausrüsten: Lege diese Karte an eine eigene Fronteinheit' + (only ? ' (nur ' + ONLY[only] + ')' : '') + '. Solange sie angelegt ist, hat der Träger ' + [Number(a) ? (a > 0 ? '+' : '') + a + ' ATK' : '', Number(d) ? (d > 0 ? '+' : '') + d + ' DEF' : ''].filter(Boolean).join(' und ') + '. Wird der Träger zerstört, geht die Ausrüstung mit auf den Friedhof.'] }),
  /**
   * Ausrüstung: der erste Schaden am Träger wird einmalig vollständig ignoriert.
   */
  ign1: () => ({ fx: [{ code: 'EQUIP_IGNORE_FIRST_DAMAGE', param: { untouchableFirst: true } }], t: 'Der erste Schaden am Träger wird ignoriert (einmalig).', r: ['Einmalig: Der erste Schaden, den der Träger erleidet, wird vollständig ignoriert. Danach hat diese Ausrüstung keine Schutzwirkung mehr.'] }),
  /**
   * Ausrüstung: verringert einmalig den nächsten Schaden am Träger um n.
   */
  neg: (n) => ({ fx: [{ code: 'EQUIP_NEGATE_DAMAGE', param: { amount: +n, once: true } }], t: 'Einmalig: verhindere ' + n + ' Schaden am Träger.', r: ['Einmalig: Erleidet der Träger erstmals Schaden, wird dieser um ' + n + ' verringert. Danach verbraucht.'] }),
  /**
   * Ausrüstung: beim Zerstören des Trägers zieht der Spieler n Karten.
   */
  odraw: (n) => ({ fx: [{ code: 'ON_DESTROY_DRAW', param: { draw: +n } }], t: 'Wird der Träger zerstört: ziehe ' + n + '.', r: ['Wird der Träger zerstört, ziehst du ' + n + ' Karte' + (n > 1 ? 'n' : '') + '.'] }),
  /**
   * Ausrüstung: Angriffe des Trägers verursachen zusätzlichen Schaden.
   */
  bonus: (n) => ({ fx: [{ code: 'EQUIP_ON_ATTACK_DAMAGE', param: { bonus: +n } }], t: 'Angriffe des Trägers: +' + n + ' Schaden.', r: ['Jeder Angriff des Trägers verursacht ' + n + ' Schaden zusätzlich zu seinem ATK. Der Gegenschlag bleibt unverändert.'] }),
  /**
   * Ausrüstung: zusätzlicher Angriffsschaden, aber der Träger erleidet selbst Schaden.
   */
  pain: (n, b) => ({ fx: [{ code: 'EQUIP_ON_ATTACK_DAMAGE', param: { bonus: +b, self: +n } }], t: 'Angriffe des Trägers: +' + b + ' Schaden, aber er erleidet selbst ' + n + '.', r: ['Jeder Angriff des Trägers verursacht ' + b + ' zusätzlichen Schaden. Preis: Bei jedem Angriff erleidet der Träger zuvor selbst ' + n + ' Schaden; kann ihn das zerstören, wird er zerstört.'] }),
  /**
   * Ausrüstung: der erste Angriff des Trägers erfolgt mit +n ATK.
   */
  first: (n) => ({ fx: [{ code: 'CARRIER_FIRST_ATTACK_ATK', param: { atk: +n } }], t: 'Erster Angriff des Trägers: +' + n + ' ATK.', r: ['Der erste Angriff, den der Träger nach dem Anlegen ausführt, erfolgt mit +' + n + ' ATK. Danach entfällt der Bonus.'] }),
  /**
   * Ausrüstung: +n ATK, solange der Träger beschädigt ist.
   */
  cond: (n) => ({ fx: [{ code: 'EQUIP_COND_ATK', param: { atk: +n, ifDamaged: true } }], t: 'Solange der Träger beschädigt ist: +' + n + ' ATK.', r: ['Solange der Träger unter seiner maximalen DEF steht (beschädigt), hat er +' + n + ' ATK.'] }),
};
// ---- Unterstützung (wirkt, solange sie in deiner Unterstützungsreihe liegt)
const SUP = {
  /**
   * Unterstützung: zu Beginn des eigenen Zuges eine zusätzliche Karte ziehen.
   */
  tdraw: () => ({ fx: [{ code: 'TURN_DRAW', param: { n: 1 } }], t: 'Zu Beginn deines Zuges: ziehe 1 zusätzliche Karte.', r: ['Zu Beginn jedes deiner Züge ziehst du 1 zusätzliche Karte, solange diese Unterstützung liegt (Handlimit 7 gilt).'] }),
  /**
   * Unterstützung: zu Beginn des eigenen Zuges +1 AP.
   */
  tap: () => ({ fx: [{ code: 'TURN_AP', param: { ap: 1 } }], t: 'Zu Beginn deines Zuges: +1 AP.', r: ['Zu Beginn jedes deiner Züge erhältst du 1 zusätzlichen AP, solange diese Unterstützung liegt.'] }),
  /**
   * Unterstützung: jeder Schaden an eigenen Fronteinheiten wird um 1 verringert.
   */
  red: () => ({ fx: [{ code: 'REDUCE_DAMAGE', param: { n: 1 } }], t: 'Jeder Schaden an deinen Fronteinheiten −1.', r: ['Jeder einzelne Schaden, den eine deiner Fronteinheiten erleidet, wird um 1 verringert (mindestens 0). Mehrere solcher Karten addieren sich.'] }),
  /**
   * Unterstützung: alle gegnerischen Fronteinheiten haben −1 ATK.
   */
  eatk: () => ({ fx: [{ code: 'AURA_ENEMY_ATK', param: { atk: -1 } }], t: 'Gegnerische Fronteinheiten −1 ATK.', r: ['Solange diese Unterstützung liegt, haben alle gegnerischen Fronteinheiten −1 ATK (Angriff und Gegenschlag).'] }),
  /**
   * Unterstützung: alle eigenen Fronteinheiten haben +1 ATK.
   */
  fatk: () => ({ fx: [{ code: 'AURA_FRONT_ATK', param: { atk: 1 } }], t: 'Deine Fronteinheiten +1 ATK.', r: ['Solange diese Unterstützung liegt, haben alle deine Fronteinheiten +1 ATK.'] }),
  /**
   * t268 – Unterstützung: zu Beginn des eigenen Zuges heilt eine beschädigte eigene Einheit n DEF (CM turnheal, wie im Starterset).
   */
  theal: (n) => ({ fx: [{ code: 'CM', param: { k: 'turnheal', n: +n } }], t: 'Zu Beginn deines Zuges: heile ' + n + ' DEF an einer beschädigten eigenen Einheit.', r: ['Zu Beginn jedes deiner Züge heilt eine beschädigte eigene Fronteinheit bis zu ' + n + ' DEF (höchstens bis zur maximalen DEF), solange diese Unterstützung liegt.'] }),
  /**
   * t268 – Unterstützung: beim Ausspielen einen eigenen Abschnitt wählen; eigene Einheiten dort +a ATK/+d DEF (CM aura, wie im Starterset).
   */
  sdef: (a, d) => { const s = [+a ? '+' + a + ' ATK' : '', +d ? '+' + d + ' DEF' : ''].filter(Boolean).join(' und '); return { fx: [{ code: 'CM', param: { k: 'aura', scope: 'section', atk: +a, def: +d } }], t: 'Wähle beim Ausspielen einen Abschnitt: eigene Einheiten dort ' + s + '.', r: ['Beim Ausspielen wählst du einen eigenen Frontabschnitt. Solange diese Unterstützung liegt, haben deine Einheiten in diesem Abschnitt ' + s + '.'] }; },
};

/**
 * Bildet einen Datei- bzw. ID-Slug aus einem Namen.
 */
function slug(s) { return s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss').replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''); }
/**
 * Liest Effektcodes aus einer Pool-Kurzschreibweise.
 */
function parseFx(lib, spec) {
  if (!spec || spec === '-') return [];
  return spec.split('+').map((tok) => {
    const [k, ...args] = tok.split(':');
    if (!lib[k]) throw new Error('Unbekannter Effekt ' + tok);
    return lib[k](...args);
  });
}
/**
 * Baut das Nationenpool-Array und schreibt `nation_pools.js`.
 */
function build(nation, short, line, idx) {
  const [k, name, r, ap, atk, def, spec, flavor] = line.split('|').map((x) => x.trim());
  const kind = KIND[k]; if (!kind) throw new Error(nation + ': Typ ' + k);
  const unit = kind.typ === 'Einheit';
  const lib = unit ? UNIT : kind.typ === 'Soforteinsatz' ? SOF : kind.typ === 'Ausrüstung' ? EQ : SUP;
  const parts = parseFx(lib, spec);
  if (kind.typ === 'Soforteinsatz') {
    if (!parts.length) throw new Error(name + ': Soforteinsatz ohne Effekt');
    const sides = new Set(parts.map((p) => p.side).filter((s) => s !== 'n'));
    if (sides.size > 1) throw new Error(name + ': gemischte Zielseiten ' + [...sides]);
  }
  if ((kind.typ === 'Ausrüstung' || kind.typ === 'Unterstützung') && !parts.length) throw new Error(name + ': ohne Effekt');
  const keywords = [].concat(...parts.map((p) => p.kw || []));
  const own = parts.filter((p) => !p.kw);
  const text = own.length ? own.map((p) => p.t).join(' ') : (keywords.length ? '' : 'Keine Sonderfähigkeit.');
  const rules = own.length ? [].concat(...own.map((p) => p.r)) : (keywords.length ? [] : ['Keine Zusatzregel – kämpft ausschließlich mit ATK und DEF nach den Grundregeln.']);
  const tags = kind.tags.slice();
  if (unit && parts.some((p) => p.fx.some((f) => f.code === 'ATTACK_ANY_FRONT')) && tags.indexOf('artillerie') < 0) tags.push('artillerie');
  const c = {
    id: 'dc_np_' + slug(nation) + '_' + slug(name), set: 'set_nation_pool', nation, status: 'live', typ: kind.typ,
    name, ap: +ap, rarity: RAR[r], tags, text, rules, effects: [].concat(...parts.map((p) => p.fx)), flavor,
    collector: 'NP-' + short + '-' + String(idx + 1).padStart(2, '0'), art_status: 'platzhalter',
  };
  if (!c.rarity) throw new Error(name + ': Seltenheit ' + r);
  if (kind.klasse) c.klasse = kind.klasse;
  if (unit) { c.atk = +atk; c.def = +def; c.verdeckt_ok = true; }
  if (keywords.length) { if (!unit) throw new Error(name + ': Schlüsselwörter nur auf Einheiten'); if (keywords.length > 2) throw new Error(name + ': max. 2 Schlüsselwörter'); c.keywords = keywords; }
  const migrated = require('../tactics/migrate.js').migrate(c);
  return applySteilfeuer(migrated);
}
const SF_MAP = JSON.parse(fs.readFileSync(path.join(__dirname, 'steilfeuer-map.json'), 'utf8'));
const SF_TEXT = { I: 'Steilfeuer I.', II: 'Steilfeuer II.', III: 'Steilfeuer III.', IV: 'Steilfeuer IV: ganze Front.', V: 'Steilfeuer V: Front + Support (+2 AP).' };
const SF_TAG = { I: 'steilfeuer-i', II: 'steilfeuer-ii', III: 'steilfeuer-iii', IV: 'steilfeuer-iv', V: 'steilfeuer-v' };
/**
 * Markiert bzw. ergänzt Steilfeuer an den betroffenen Poolkarten.
 */
function applySteilfeuer(c) {
  if (c.typ !== 'Einheit' || c.klasse !== 'Artillerie') return c;
  const lvl = SF_MAP[c.id] || 'II';
  const tag = SF_TAG[lvl];
  c.tags = (c.tags || []).filter((t) => !/^steilfeuer-/i.test(t));
  const ei = c.tags.findIndex((t) => t === 'einheit');
  if (ei >= 0) c.tags.splice(ei + 1, 0, tag); else c.tags.unshift(tag);
  // effects: only IV/V keep ANY_FRONT; only V keeps SUPPORT
  c.effects = (c.effects || []).filter((e) => e.code !== 'ATTACK_ANY_FRONT' && e.code !== 'ATTACK_SUPPORT');
  if (lvl === 'IV' || lvl === 'V') c.effects.unshift({ code: 'ATTACK_ANY_FRONT' });
  if (lvl === 'V') c.effects.push({ code: 'ATTACK_SUPPORT' });
  // strip Indirektes Feuer / old any/sup text leftovers
  c.keywords = (c.keywords || []).filter((k) => k !== 'Indirektes Feuer');
  if (!c.keywords.length) delete c.keywords;
  let body = String(c.text || '')
    .replace(/Indirektes Feuer:[^.]*\.\s*/gi, '')
    .replace(/Darf auch gegnerische Unterstützungen angreifen\.\s*/gi, '')
    .replace(/Steilfeuer [IVX0-9]+:?[^.]*\.\s*/gi, '')
    .trim();
  c.text = (SF_TEXT[lvl] + (body ? ' ' + body : '')).trim();
  const baseRules = ['Die Einheit zählt für alle Regeln als Artillerie.'];
  if (lvl === 'V') baseRules.push('Supportzone-Angriff 3 AP; Front 1 AP.');
  const keep = (c.rules || []).filter((r) => !/Indirektes Feuer|Weitreichend:|Steilfeuer |Supportzone-Angriff|Die Einheit zählt für alle Regeln als Artillerie/i.test(r));
  c.rules = [SF_TEXT[lvl]].concat(keep).concat(baseRules.filter((r) => !keep.includes(r) && r !== SF_TEXT[lvl]));
  // dedupe rules
  const seen = new Set(); c.rules = c.rules.filter((r) => { const k = String(r); if (seen.has(k)) return false; seen.add(k); return true; });
  return c;
}

/**
 * CLI: erzeugt `nation_pools.js` aus den Nationenlisten und prüft die Schreibweise.
 */
function main() {
  const dir = path.join(__dirname, 'nations');
  const all = [];
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js')).sort()) {
    const mod = require(path.join(dir, f));
    for (const [nation, def] of Object.entries(mod)) def.cards.forEach((line, i) => all.push(build(nation, def.short, line, i)));
  }
  const ids = new Set(); all.forEach((c) => { if (ids.has(c.id)) throw new Error('Doppelte ID ' + c.id); ids.add(c.id); });
  const head = '/* GENERIERT von scripts/nation_pools/build.js – nicht von Hand ändern.\n   Nationenpool-Erweiterung (Entwurf, ohne fertiges Artwork: art_status "platzhalter"). */\n';
  fs.writeFileSync(OUT, head + 'window.DC_SET_TYPES = window.DC_SET_TYPES || {};\nwindow.DC_SET_TYPES["Nationenpool"] = ' + JSON.stringify(all, null, 1) + ';\n');
  console.log('nation_pools.js:', all.length, 'Karten');
}
if (require.main === module) main();
module.exports = { build, UNIT, SOF, EQ, SUP };
