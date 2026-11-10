"""Phase 2: knapper Kartenflächentext (<=120 Zeichen) je ID. Langform bleibt in `text` (Detailansicht)
und steht für jede gekürzte Karte in docs/regeln/KARTEN_SONDERFAELLE.md. Ausgabe: kurz.json."""
import json, re
from pathlib import Path
import datafiles as DF, subprocess
def catalog():
    d = json.loads(subprocess.check_output(['node', str(ROOT / 'scripts/graphics/export_catalog.js')], cwd=ROOT))
    return {c['id']: ('runtime', c) for c in d['cards']}
HERE = Path(__file__).parent; ROOT = DF.ROOT
MANUAL = json.loads((HERE / 'kurz_manual.json').read_text()) if (HERE / 'kurz_manual.json').exists() else {}
RULES = [
    (r'\s*\[[^\]]*\]', ''),
    (r'Wähle beim Ausspielen einen Abschnitt: ', 'Abschnitt wählen: '),
    (r'Zu Beginn jedes deiner Züge: Ziehe 1 zusätzliche Karte, solange diese Unterstützung liegt\. Das Handlimit gilt unverändert\.', 'Zugbeginn: ziehe 1 zusätzlich.'),
    (r'Einmalig: Erleidet der Träger erstmals noch positiven, verhinderbaren Schaden, wird dieser Treffer um bis zu (\d) verringert\. Danach ist dieser Schutz verbraucht\. Nicht verhinderbarer Schaden bleibt nicht verhinderbar\.', r'Einmalig: erster verhinderbarer Treffer am Träger −\1.'),
    (r'Eigene Einheiten im gewählten Abschnitt: Der erste Schaden je Zug sinkt um 1', 'Dort sinkt der erste Schaden je Zug um 1'),
    (r'Ziele ohne benachbarte Einheit ihres Besitzers', 'isolierte Ziele'),
    (r'decke (?:1|eine) verdeckte gegnerische Fronteinheit auf', 'decke einen verdeckten Feind auf'),
    (r'Zerstört sie im Angriff eine Einheit: ', 'Zerstört sie im Angriff: '),
    (r'Zu Beginn deines Zuges: ', 'Zugbeginn: '), (r'Am Ende deines Zuges: ', 'Zugende: '),
    (r'Einmal pro Zug', '1×/Zug'), (r'[Ee]inmal/Zug', '1×/Zug'), (r'Beim Ausspielen: ', 'Einsatz: '),
    (r'eigene Fronteinheiten', 'eigene Einheiten'), (r'eigene Fronteinheit', 'eigene Einheit'),
    (r'gegnerische Fronteinheiten', 'Feinde'), (r'gegnerische Fronteinheit', 'Feind'), (r'gegnerischen Fronteinheiten', 'Feinde'),
    (r'eine verdeckte gegnerische Einheit', 'einen verdeckten Feind'), (r'verdeckte gegnerische Einheiten', 'verdeckte Feinde'),
    (r'wenn du in diesem Zug (?:einen |eine )?(\w+) gespielt hast', r'nach \1 in diesem Zug'),
    (r'solange du eine offene Unterstützung hast', 'mit offener Unterstützung'), (r'solange du eine Unterstützung im Feld hast', 'mit Unterstützung im Feld'),
    (r'solange eine weitere eigene Einheit im Abschnitt steht', 'mit 2+ eigenen Einheiten im Abschnitt'),
    (r'wenn sie seit deinem letzten Zug nicht versetzt wurde', 'wenn unbewegt'), (r'wenn er seit deinem letzten Zug nicht versetzt wurde', 'wenn unbewegt'),
    (r'heile (\d) DEF an deiner am stärksten beschädigten Einheit', r'heile \1 (stärkst beschädigte)'),
    (r'heile (\d) DEF an einer beschädigten eigenen Einheit', r'heile \1 eigene Einheit'),
    (r'Ziele, die in diesem Zug Schaden erlitten haben', 'diesen Zug getroffene Ziele'),
    (r'Einheiten, die seit dem letzten Zug eingerückt sind', 'frisch eingerückte Ziele'),
    (r'(\d) AP weniger \(mind\. 1\)', r'\1 AP weniger'), (r' bis Zugende', ' (Zug)'), (r'Karten\b', 'K.'), (r'\b1 Karte\b', '1 K.'),
    (r'\s+', ' '),
]
def shorten(t):
    for rx, rep in RULES:
        if len(t) <= 120 and rx not in (r'\s*\[[^\]]*\]', r'\s+'): continue
        t = re.sub(rx, rep, t)
    return t.strip()
def main():
    out = {}; long_ = []
    for i, (f, c) in catalog().items():
        t = (c.get('text') or '').strip()
        k = MANUAL.get(i) or shorten(t)
        out[i] = {'kurz': k, 'gekuerzt': k != t, 'keywords': c.get('keywords') or []}
        if len(k) > 120: long_.append((i, c.get('typ'), len(k), k))
    (HERE / 'kurz.json').write_text(json.dumps(out, ensure_ascii=False, indent=1))
    print('kurz', len(out), 'gekürzt', sum(v['gekuerzt'] for v in out.values()), 'noch >120:', len(long_))
    return long_
if __name__ == '__main__':
    for x in main(): print(x[0], x[1], x[2], '|', x[3])

def write_docs():
    K = json.loads((HERE / 'kurz.json').read_text()); A = catalog()
    o = ['# Karten – Sonderfälle und Langtexte', '',
         'Auf der Kartenfläche steht ein knapper Text (höchstens 120 Zeichen) plus Schlüsselwort-Chips. Die vollständige Regel steht in der Detailansicht (Datenfeld `text`) und – für jede Karte, deren Flächentext gekürzt ist – hier, wortgleich, nach ID sortiert. Erzeugt von `scripts/cards-review/kurz.py`; `tests/test_card_faces_text.js` prüft, dass nichts verloren geht.', '']
    for i in sorted(K):
        v = K[i]
        if not v['gekuerzt']: continue
        f, c = A[i]
        o += [f'## `{i}` – {c.get("name")} ({c.get("typ")})', '', f'**Fläche:** {v["kurz"]}', '', '**Volltext:**', '', '> ' + (c.get('text') or '').replace('\n', '\n> '), '']
    (ROOT / 'Division_Command/docs/regeln/KARTEN_SONDERFAELLE.md').write_text('\n'.join(o) + '\n')
    print('docs', sum(v['gekuerzt'] for v in K.values()))
if __name__ == '__main__':
    write_docs()
