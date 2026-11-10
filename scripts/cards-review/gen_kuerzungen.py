#!/usr/bin/env python3
"""Erzeugt docs/regeln/KARTEN_KUERZUNGEN.md aus review.json und dem aktuellen Katalog."""
import json, collections, subprocess
from pathlib import Path
HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
OUT = ROOT / 'Division_Command/docs/regeln/KARTEN_KUERZUNGEN.md'

review = json.loads((HERE / 'review.json').read_text())
cards = [c for c in review['karten'] if c['modus'] in ('teilweise', 'teilweise+ersetzt')]
cat = {c['id']: c for c in json.loads(subprocess.check_output(['node', str(ROOT / 'scripts/graphics/export_catalog.js')], cwd=ROOT))['cards']}

RESTORED = {
    'dc_b_panzerplatte_serie_178': 'In t244 wiederhergestellt: der Parser hatte EQUIP_STAT auf atk 0 / def 0 gesetzt. Wirkung wieder „Nur an Panzer. +2 DEF, −1 ATK.“ (EQUIP_STAT atk −1, def +2).',
    'dc_b_zieloptik_konzern_177': 'In t244 wiederhergestellt: verlorenes +1 ATK und die Bedingung „gegen Aufgeklärte“ (beobachtete Ziele) sind wieder in Effekt und Text, anlegbar an Aufklärung oder Artillerie.',
    'dc_b_passoptik_255': 'In t244 wiederhergestellt: verlorenes +1 ATK und die Bedingung „gegen Einrückende“ sind wieder in Effekt und Text, anlegbar an Aufklärung oder Artillerie.',
}
SIEGEL = 'dc_b_verbindungssiegel_839'

def hint(c):
    """Kurzhinweis, welche Klausel bei einer Karte gekürzt wurde."""
    if c['id'] in RESTORED:
        return RESTORED[c['id']]
    if c['id'] == SIEGEL:
        return ('Bewusst: „einmal/Zug: decke 1 auf“ bleibt als „Beim Anlegen“. '
                'Der im Code stehen gebliebene Bonus „+1 ATK gegen beobachtete Ziele“ wurde in t244 entfernt, damit die Karte nur noch tut, was auf ihr steht.')
    if c['modus'] == 'teilweise+ersetzt':
        kw = c['nachher'].get('keywords') or []
        b, a = c['vorher'], c['nachher']
        stat = []
        if (b.get('atk'), b.get('def')) != (a.get('atk'), a.get('def')):
            stat.append(f"ATK/DEF {b.get('atk')}/{b.get('def')} → {a.get('atk')}/{a.get('def')}")
        extra = []
        if kw:
            extra.append('Schlüsselwort ' + ', '.join(kw))
        extra += stat
        tail = (' (' + '; '.join(extra) + ')') if extra else ''
        return 'Regelangleichung mit Kürzung, Rest durch eine allgemeine Mechanik ersetzt' + tail + '. Der entfallene Teil ist bewusst nicht in der Engine.'
    return 'Bewusst gestrichen, nicht in der Engine.'

modus_label = {
    'teilweise': 'Regelangleichung mit Kürzung',
    'teilweise+ersetzt': 'Regelangleichung mit Kürzung, Rest ersetzt',
}

lines = []
lines.append('# Kartenkürzungen der Prüfung t212')
lines.append('')
lines.append('Bei der Kartenprüfung t212 wurden Regeltexte an die Engine angeglichen: Teilsätze, die sich nicht in die allgemeine Mechanik `CM` (bzw. vorhandene Ausrüstungs-Codes) überführen ließen, sind entfallen oder durch eine gleichwertige allgemeine Mechanik ersetzt. Das ist **keine Sprachübersetzung** und kein stehengebliebenes Englisch. Die Bezeichnung in älteren Berichten lautete „teilweise übersetzt“; hier und in `KARTENPRUEFUNG.md` heißt der Vorgang **Regelangleichung mit Kürzung**.')
lines.append('')
lines.append('Die gestrichenen Sätze bleiben bewusst draußen (Entscheidung t244), außer den unten kenntlich gemachten Reparaturen an drei Ausrüstungen, deren Werte der Parser fälschlich auf 0 gesetzt hatte, und an Verbindungssiegel (heimlicher ATK-Bonus entfernt).')
lines.append('')
lines.append('Quelle: `scripts/cards-review/review.json` (vorher/nachher, `entfallen`). Aktueller Kartentext aus dem Katalog. Erzeugt von `scripts/cards-review/gen_kuerzungen.py`. Volltexte gekürzter Flächentexte stehen weiterhin in [KARTEN_SONDERFAELLE.md](KARTEN_SONDERFAELLE.md).')
lines.append('')

n_cl = sum(len(c.get('entfallen') or []) for c in cards)
by_typ = collections.Counter(c['typ'] for c in cards)
by_mod = collections.Counter(c['modus'] for c in cards)
lines.append(f'## Überblick')
lines.append('')
lines.append(f'- Karten: **{len(cards)}** ({by_mod["teilweise"]} mit Kürzung, {by_mod["teilweise+ersetzt"]} mit Kürzung und Ersetzung)')
lines.append(f'- Entfallene Teilsätze: **{n_cl}**')
lines.append(f'- Nach Typ: Einheit {by_typ["Einheit"]}, Ausrüstung {by_typ["Ausrüstung"]}, Unterstützung {by_typ["Unterstützung"]}')
lines.append(f'- Alle in `set_nations`.')
lines.append('')

# nation counts
by_nat = collections.Counter((cat.get(c['id']) or {}).get('nation') or '–' for c in cards)
lines.append('### Nach Nation')
lines.append('')
lines.append('| Nation | Anzahl |')
lines.append('|---|---:|')
for n, k in sorted(by_nat.items(), key=lambda x: (-x[1], x[0])):
    lines.append(f'| {n} | {k} |')
lines.append('')
lines.append('## Karten')
lines.append('')

def typ_nat(c):
    """Typ- und Nationenzeile für den Kürzungsbericht."""
    live = cat.get(c['id']) or {}
    return live.get('typ') or c['typ'], live.get('nation') or '–'

for c in sorted(cards, key=lambda x: ((cat.get(x['id']) or {}).get('nation') or '', x['name'] or '', x['id'])):
    typ, nat = typ_nat(c)
    live = cat.get(c['id']) or {}
    old = (c['vorher'].get('text') or '').strip() or '*(kein Text)*'
    new = (live.get('text') or '').strip() or '*(kein Text)*'
    dropped = c.get('entfallen') or []
    lines.append(f"### {c['name']} (`{c['id']}`, {typ}, {nat}) – {modus_label[c['modus']]}")
    lines.append('')
    lines.append(f'**Alter Text:** {old}')
    lines.append('')
    lines.append(f'**Aktueller Text:** {new}')
    lines.append('')
    if dropped:
        lines.append('**Entfallen:**')
        lines.append('')
        for d in dropped:
            lines.append(f'- {d}')
        lines.append('')
    else:
        lines.append('**Entfallen:** —')
        lines.append('')
    lines.append(f"**Hinweis:** {hint(c)}")
    lines.append('')

OUT.write_text('\n'.join(lines))
print('wrote', OUT, 'cards', len(cards), 'clauses', n_cl, 'bytes', OUT.stat().st_size)
