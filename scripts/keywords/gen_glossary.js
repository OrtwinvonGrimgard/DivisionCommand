#!/usr/bin/env node
/**
 * Erzeugt `docs/regeln/SCHLUESSELWOERTER.md` aus den Spieldaten.
 */
'use strict';
/* Erzeugt Division_Command/docs/regeln/SCHLUESSELWOERTER.md aus den Spieldaten. */
const fs = require('fs'), path = require('path');
const L = require('../nation_pools/load_game.js'); const w = L.loadGame({ quiet: true });
const WORDS = Object.keys(w.DC_KEYWORDS);
const C = w.DC_CATALOG.cards.filter((c) => !['Doktrin','Token'].includes(c.typ));
const log = require('./conversion_log.json');
const nat = Object.keys(w.DC_NATION_DECKS).concat(['neutral']);
const cnt = {}; WORDS.forEach((k) => { cnt[k] = {}; });
C.forEach((c) => (c.keywords || []).forEach((k) => { const n = c.nation || 'neutral'; cnt[k][n] = (cnt[k][n] || 0) + 1; }));
let o = '# Schlüsselwörter – **implementiert**\n\n';
o += 'Die 24 Wörter (16 ursprüngliche, 3 vereinheitlichte Bestandskerne, 5 neue taktische Mechaniken) sind allgemeines Vokabular und an keine Nation gebunden. Sie stehen auf den Karten als **fettes Wort** mit vollständigem Erinnerungstext in Klammern. Das gilt für die Detailansicht, die Deckbuilder-Großansicht und die Platzhalterkarten. Auf dem Tisch erscheint eine Wortleiste.\n\n';
o += 'Die Engine wertet die Wörter strukturiert aus (`def.keywords`, strukturierte `effects`, `engine.js` und `tactical_runtime.js`). Sie verlässt sich nicht auf Fließtext. Quelle des Vokabulars ist `web/js/data/keywords.js`, die Tests liegen in `tests/test_keywords.js`.\n\n';
o += '> Die Sondermechaniken je Nation in [NEUE_EFFEKTIDEEN.md](../entwicklung/NEUE_EFFEKTIDEEN.md) sind davon getrennt und bleiben **Vorschläge, nicht implementiert**.\n\n## Die 24 Wörter\n\n';
WORDS.forEach((k) => { o += '- **' + k + '** (' + w.DC_KEYWORDS[k] + ')' + (w.DCKw.notes[k] ? ' — *' + w.DCKw.notes[k] + '*' : '') + '\n'; });
o += '\n## Verteilung (Deckkarten mit dem Wort)\n\n| Wort | gesamt | ' + nat.join(' | ') + ' |\n|---|---|' + nat.map(() => '---').join('|') + '|\n';
WORDS.forEach((k) => { const t = Object.values(cnt[k]).reduce((a, b) => a + b, 0); o += '| ' + k + ' | ' + t + ' | ' + nat.map((n) => cnt[k][n] || '·').join(' | ') + ' |\n'; });
const withKw = C.filter((c) => (c.keywords || []).length).length;
o += '\n' + withKw + ' von ' + C.length + ' Deckkarten tragen mindestens ein Wort, ' + C.filter((c) => (c.keywords || []).length === 2).length + ' davon genau zwei. Ausrüstung und Unterstützung können die passenden neuen allgemeinen Wörter tragen.\n';
o += '\nDie Umsetzung t203 mit zehn additiven neutralen Erprobungskarten, Abgrenzungen, Quellen und dokumentierten Konfliktentscheidungen steht in [TAKTISCHE_SCHLUESSELWOERTER.md](TAKTISCHE_SCHLUESSELWOERTER.md). Reproduzierbarer Build: `npm run build:tactics`.\n';
o += '\n## Umgestellte alte Kartentexte (' + log.length + ')\n\nDiese Texte entsprachen einem Wort. Der Satzteil wurde durch das Wort ersetzt, ein Resttext bleibt als eigener Effekt stehen.\n\n| Karte | Nation | alter Satzteil | Wort | Resttext |\n|---|---|---|---|---|\n';
log.forEach((x) => { const c = w.DC_CATALOG.cards.find((y) => y.id === x.id); o += '| ' + c.name + ' | ' + (x.nation || 'neutral') + ' | ' + x.converted.join(' / ') + ' | ' + x.words.join(', ') + ' | ' + (x.after || '—') + ' |\n'; });
o += '\n## Umsetzungsdetails und Grenzen\n\n';
o += '- **Neuberechnung:** Sicherung, Zähigkeit und die DEF aus Überlast werden nach jeder Aktion neu berechnet. Fällt ein Bonus weg, sinkt die DEF höchstens auf 1; der Wegfall allein zerstört keine Einheit.\n';
o += '- **Hinterhalt/Platztausch:** Diese Wörter stehen nur auf Einheiten, die verdeckt werden können (Absetzen/Verdecken nach dem Angriff). Mit Eingraben werden neue Einheiten offen gelegt, deshalb wären die Wörter sonst wirkungslos.\n';
o += '- **Platztausch:** Die Wahl erscheint, sobald der Besitzer am Zug ist und keine andere Auswahl offen ist. Die Auswahl zeigt nur Felder, keine Namen.\n';
o += '- **Abschirmung:** Wird automatisch genutzt, wenn die abschirmende Einheit offen liegt und den umgeleiteten Schaden überlebt.\n';
o += '- **Stellungswechsel:** Bedienung über die Detailansicht der eigenen Einheit, Aktion `KW_MOVE`. Der Bot nutzt das Versetzen nicht.\n';
o += '- **Bestehende Engine-Eigenheiten wurden nicht geändert:** die doppelt gezählte Front-DEF, Niederhalten, die Rabatt-Typen und Soforteinsätze zu 0 AP.\n';
o += '- **Balance ist ungetestet.** Der Bot-Smoke-Test prüft nur, dass nichts abstürzt.\n';
o += '- **Artwork:** Auf den alten Kartenbildern (Hand und Großbild) ist der Text eingedruckt; dort steht das Wort nicht im Bild. Es erscheint in der Detailansicht und auf dem Tisch als Leiste.\n';
fs.writeFileSync(path.join(L.WEB, '..', 'docs', 'regeln', 'SCHLUESSELWOERTER.md'), o);
console.log('SCHLUESSELWOERTER.md', withKw, '/', C.length);
