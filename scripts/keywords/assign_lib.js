/**
 * Zuordnung der 16 allgemeinen Schlüsselwörter zu spielbaren Einheiten.
 * Textumstellung oder deterministische Ergänzung nach Klasse/Effekt/ID.
 */
'use strict';
/* Schlüsselwort-Zuordnung für alle spielbaren Einheiten (alte Sets + Nationenpools).
   1) Texte, die einem Wort entsprechen, werden auf das Wort umgestellt (Satzteil entfernt).
   2) Sonst: passende Wörter nach Klasse/Effekten, Nationen mit Tendenzen (kein Monopol), deterministisch per ID. */
const WORDS = ['Gefechtsbereit', 'Ablösung', 'Staffelangriff', 'Fernschuss', 'Durchschlag', 'Platztausch', 'Überlast', 'Abschirmung',
  'Erbitterung', 'Heranführung', 'Stellungswechsel', 'Zuteilung', 'Sicherung', 'Nachsetzen', 'Hinterhalt', 'Zähigkeit'];

const CONVERT = [
  [/Beim Ausspielen: ziehe 1( Karte)?\.?\s*(\[[^\]]+\])?\s*$/i, ['Zuteilung']],
  [/Beim Ausspielen: ziehe 1[.;]\s*/i, ['Zuteilung']],
  [/\+[12] ATK,? wenn in diesem Zug (bereits |schon )?eine eigene (Infanterie|Einheit) (angegriffen hat|angrifft)\.?/i, ['Staffelangriff']],
  [/\+1 ATK für jede eigene Infanterie, die in diesem Zug zerstört wurde \(max\. \+2\)\.?/i, ['Erbitterung']],
  [/\+[12] ATK,? wenn in diesem Zug (eine )?eigene Einheit zerstört( wurde)?\.?/i, ['Erbitterung']],
  [/\+[12] DEF,? wenn in diesem Zug (eine )?eigene Einheit zerstört( wurde)?\.?/i, ['Zähigkeit']],
  [/\+2 ATK im Zug, in dem du bereits eine Einheit beschädigt hast\.?/i, ['Nachsetzen']],
  [/\+2 ATK gegen ein Ziel, das in diesem Zug (bereits )?(Schaden erlitten hat|beschädigt wurde)\.?/i, ['Nachsetzen']],
  [/\+2 ATK im Zug des Ausspielens[.;] [Ee]rleidet danach 1 Schaden\.?/i, ['Gefechtsbereit', 'Überlast']],
  [/\+2 ATK im Zug des Ausspielens\.?/i, ['Gefechtsbereit']],
  [/\+1 ATK beim Angriff\. Erleidet danach 1 Schaden\.?/i, ['Überlast']],
  [/Am Zugende erleidet diese Einheit 1 Schaden\.?/i, ['Überlast']],
  [/\+1 ATK, wenn sie in einen angrenzenden Abschnitt rückt\.?/i, ['Stellungswechsel']],
  [/(?<=^|[.;]\s)(Einheiten hier|Abschnitt) \+1 DEF([.;]\s*|$)/i, ['Sicherung']],
  [/nächste Einheit kostet 1 weniger \(min\. 1\)\.?/i, ['Heranführung']],
];

const PREF = {
  Steinmark: ['Sicherung', 'Ablösung', 'Zuteilung'], Eldran: ['Ablösung', 'Sicherung', 'Abschirmung'],
  Rothain: ['Staffelangriff', 'Ablösung', 'Durchschlag'], Averon: ['Gefechtsbereit', 'Zuteilung', 'Stellungswechsel'],
  Orthea: ['Durchschlag', 'Fernschuss', 'Nachsetzen'], Vesper: ['Platztausch', 'Hinterhalt', 'Stellungswechsel'],
  Karsk: ['Überlast', 'Gefechtsbereit', 'Nachsetzen'], Caldris: ['Abschirmung', 'Sicherung', 'Zähigkeit'],
  Theryn: ['Erbitterung', 'Staffelangriff', 'Gefechtsbereit'], Vael: ['Heranführung', 'Zuteilung', 'Durchschlag'],
  Sahr: ['Stellungswechsel', 'Hinterhalt', 'Heranführung'], Namar: ['Zuteilung', 'Heranführung', 'Abschirmung'],
  Merovan: ['Stellungswechsel', 'Sicherung', 'Heranführung'], Dargan: ['Nachsetzen', 'Erbitterung', 'Staffelangriff'],
  Lyr: ['Hinterhalt', 'Stellungswechsel', 'Zähigkeit'], Ossaria: ['Zähigkeit', 'Abschirmung', 'Erbitterung'],
};
const CLASS = {
  inf: ['Sicherung', 'Abschirmung', 'Ablösung', 'Staffelangriff', 'Zähigkeit', 'Erbitterung', 'Zuteilung', 'Heranführung', 'Gefechtsbereit', 'Nachsetzen', 'Überlast'],
  pz: ['Durchschlag', 'Gefechtsbereit', 'Nachsetzen', 'Staffelangriff', 'Überlast', 'Abschirmung', 'Stellungswechsel', 'Zähigkeit', 'Ablösung'],
  art: ['Fernschuss', 'Durchschlag', 'Stellungswechsel', 'Nachsetzen', 'Staffelangriff', 'Zuteilung'],
  scout: ['Zuteilung', 'Heranführung', 'Stellungswechsel', 'Fernschuss', 'Gefechtsbereit'],
  elite: ['Überlast', 'Abschirmung', 'Sicherung', 'Erbitterung', 'Zähigkeit', 'Durchschlag', 'Nachsetzen', 'Staffelangriff', 'Heranführung'],
};
/**
 * Deterministischer Zahlenhash eines Strings (für Mischdeck oder Zuordnung).
 */
function hash(s) { let h = 2166136261; for (const ch of String(s)) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
/**
 * Ordnet eine Einheit einer Wortklasse (Aufklärer, Führung, …) zu.
 */
function klass(c) {
  const t = ((c.klasse || '') + ' ' + (c.tags || []).join(' ')).toLowerCase();
  if (c.elite || /elite|kommandant/.test(t)) return 'elite';
  if (/artillerie|haubitze|rohr|mörser|moerser/.test(t)) return 'art';
  if (/aufkl/.test(t)) return 'scout';
  if (/panzer|gepanzert|fahrzeug/.test(t)) return 'pz';
  return 'inf';
}
/**
 * Prüft, ob ein Schlüsselwort auf dieser Klasse verborgen bleiben soll.
 */
function hides(c) { return (c.effects || []).some((e) => ['RELOCATE_HIDE', 'GUERRILLA_HIDE', 'SET_FACEDOWN'].includes(e.code)); }

/* Liefert { keywords, text, converted: [{from, words}] } – ändert die Karte nicht. */
function assign(c) {
  if (c.typ !== 'Einheit') return { keywords: [], text: c.text, converted: [] };
  let text = String(c.text || ''); const kws = []; const converted = [];
  for (const [re, words] of CONVERT) {
    const m = text.match(re);
    if (!m || kws.length >= 2) continue;
    converted.push({ from: m[0].trim(), words });
    words.forEach((w) => { if (!kws.includes(w) && kws.length < 2) kws.push(w); });
    text = text.replace(re, '').replace(/^\s*[;.,]\s*/, '').replace(/\s{2,}/g, ' ').trim().replace(/[;:,]$/, '.');
    if (text) text = text[0].toUpperCase() + text.slice(1);
  }
  const k = klass(c), h = hash(c.id);
  if (!kws.length) {
    let pool = CLASS[k].slice();
    if (hides(c) && (h >>> 12) % 100 < 85) pool = (h >>> 3) % 3 ? ['Hinterhalt'] : ['Platztausch'];
    const pref = (PREF[c.nation] || []).filter((w) => pool.includes(w) || (hides(c) && ['Hinterhalt', 'Platztausch'].includes(w)));
    const roll = h % 100;
    const share = hides(c) ? 100 : (c.nation ? 62 : 70);          // nicht jede Karte braucht ein Wort
    if (roll < share) {
      const usePref = pref.length && pool.length > 2 && (h >>> 8) % 100 < 55;
      const src = usePref ? pref : pool;
      kws.push(src[(h >>> 16) % src.length]);
    }
  }
  if (kws.length === 1 && (k === 'elite' || (c.rarity === 'gold')) && (h >>> 4) % 100 < 45) {
    const pool = CLASS[k].filter((w) => w !== kws[0] && !(kws[0] === 'Erbitterung' && w === 'Zähigkeit'));
    kws.push(pool[(h >>> 20) % pool.length]);
  }
  // Hinterhalt/Platztausch nur auf Karten, die verdeckt werden können (sonst wirkungslos)
  const final = kws.filter((w) => !['Hinterhalt', 'Platztausch'].includes(w) || hides(c) || converted.some((x) => x.words.includes(w)));
  return { keywords: final, text, converted };
}
/* Effektcodes, die durch ein Wort ersetzt werden (sonst doppelte Wirkung). */
const REPLACES = { Staffelangriff: ['ATK_IF_INFANTRY_ATTACKED'] };
module.exports = { WORDS, assign, hides, klass, REPLACES };
