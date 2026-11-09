"""review.json + docs/karten/KARTENPRUEFUNG.md aus review_raw.json und den aktuellen Kartendaten."""
import json, collections, statistics, re
from pathlib import Path
import datafiles as DF
HERE = Path(__file__).parent; ROOT = DF.ROOT
R = json.loads((HERE / 'review_raw.json').read_text())
cards = {i: c for i, (f, c) in DF.all_cards().items()}
MODE_TXT = {'voll': 'Text vollständig in allgemeine Mechanik übersetzt', 'teilweise': 'teilweise übersetzt, Rest entfallen (protokolliert)',
            'ersetzt': 'nicht abbildbar – durch gleichwertige allgemeine Mechanik ersetzt', 'teilweise+ersetzt': 'teilweise übersetzt, Rest ersetzt',
            'aus-code': 'Text aus implementiertem Code neu erzeugt', 'aus-code+DRAW': 'Text aus Code, versprochenes Ziehen ergänzt',
            'spezifisch': 'eigene Spezialmechanik, Text geprüft/Zielseite festgelegt', 'manuell': 'Unterstützung manuell korrigiert',
            'abkürzung': 'alte Abkürzung V/A → DEF/ATK', 'unverändert': 'geprüft, unverändert', 'generiert-geprüft': 'generierter Nationenpool/Taktikentwurf, geprüft', 'vanilla': 'ohne Fähigkeit'}
# Balance: Einheiten (ATK+DEF)/AP gegen Median je AP
units = [c for c in cards.values() if c.get('typ') == 'Einheit' and c.get('set') in ('set_nations', 'set_alpha', 'set_nation_pool')]
byap = collections.defaultdict(list)
for c in units: byap[int(c.get('ap') or 0)].append(int(c.get('atk') or 0) + int(c.get('def') or 0))
med = {a: statistics.median(v) for a, v in byap.items() if v}
flags = collections.defaultdict(list)
for c in units:
    s = int(c.get('atk') or 0) + int(c.get('def') or 0); m = med.get(int(c.get('ap') or 0))
    if m and s >= m + 3: flags[c['id']].append(f'Werte {s} weit über Median {m:g} bei {c.get("ap")} AP')
    if m and s <= m - 3 and not (c.get('effects') or c.get('keywords')): flags[c['id']].append(f'Werte {s} weit unter Median {m:g} ohne Fähigkeit')
for c in cards.values():
    for e in c.get('effects') or []:
        p = e.get('param') or {}
        if e['code'] == 'COST_NEXT' and p.get('type') == 'Soforteinsatz': flags[c['id']].append('wirkungslos: Soforteinsätze kosten derzeit 0 AP (Regel instant_ap_test)')
        if e['code'] == 'EQUIP_DISCOUNT_AURA' and p.get('type') == 'Soforteinsatz': flags[c['id']].append('wirkungslos: Soforteinsätze kosten derzeit 0 AP')
        if e['code'] == 'CM' and p.get('k') == 'aura' and p.get('scope') == 'all' and not p.get('filter') and not p.get('when'): flags[c['id']].append('globale Aura ohne Filter/Bedingung – stark')
        if e['code'] == 'EQUIP_DISCOUNT': flags[c['id']].append('dauerhafter Ausrüstungsrabatt (stapelbar je Unterstützung)')
out = []
for e in R:
    e = dict(e); e['flags'] = e.get('flags', []) + flags.get(e['id'], [])
    e['modus_text'] = MODE_TXT.get(e['modus'], e['modus']); out.append(e)
(HERE / 'review.json').write_text(json.dumps({'_info': 'Kartenprüfung t212: je ID vorher/nachher, Modus, entfallene Teilsätze, Flags. Erzeugt von scripts/cards-review/apply.py + build_report.py.', 'karten': out}, ensure_ascii=False, indent=1))
C = collections.Counter(e['modus'] for e in out)
tc = [e for e in out if e['text_geaendert']]; mc = [e for e in out if e['mechanik_geaendert']]
o = ['# Kartenprüfung (t212)', '',
     'Alle 1746 Karten-IDs wurden gegen die Engine geprüft. Grundsatz: **Kartentext = Implementierung.** Wo ein Text Dinge versprach, die die Engine nicht umsetzte, wurde die Fähigkeit in die allgemeine Mechanik `CM` (Werte mit Bedingung, Kampfboni gegen Zielarten, Auren, Auslöser, Rabatte, Heilung zu Zugbeginn …) übersetzt und der Kartentext aus dieser Implementierung neu erzeugt. Nichts ist stillschweigend verloren: der alte Text steht unten je ID und vollständig in `scripts/cards-review/review.json`.', '',
     '## Zahlen', '', f'- geprüft: **{len(out)}** IDs', f'- Text geändert: **{len(tc)}**', f'- Mechanik geändert (Effekte/Werte/Ziel/Schlüsselwörter): **{len(mc)}**',
     f'- Fähigkeitstext ohne Implementierung vorher: **607** (davon 578 in `set_nations`) → jetzt **0** (Test `scripts/test_card_review.js`)',
     f'- Balance-/Regelhinweise: **{sum(1 for e in out if e["flags"])}** IDs', '', '| Modus | Anzahl | Bedeutung |', '|---|---|---|']
for k, v in C.most_common(): o.append(f'| {k} | {v} | {MODE_TXT.get(k, k)} |')
o += ['', '## Engine-Korrekturen', '',
      '- **CM-Vokabular** (allgemein): `stat`, `cost`, `vs`, `enter`, `kill`, `death`, `negate`, `first`, `aura`, `trigger`, `turnheal`, `turn`, `discount`, `hitdebuff` mit Bedingungen (gespielt in diesem Zug, Unterstützung, benachbart, allein, beschädigt, unbewegt, beobachtet …).',
      '- Ausrüstung mit CM-Effekten wirkt für ihren Träger.',
      '- Soforteinsätze: strukturierte Zielwahl `target {side,count,upto,needs}` hat Vorrang vor der Textheuristik; Textänderungen ändern das Verhalten nicht mehr.',
      '- Mehrfachziel-Soforteinsätze lösten zielfreie Effekte (Ziehen, Aufdecken, Rabatt) **je Ziel** aus → jetzt einmal.',
      '- `COST_NEXT` für Ausrüstung/Soforteinsatz gab zusätzlich einen Pauschalrabatt auf die nächste Nicht-Sofort-Karte → entfernt.',
      '- `OUT_OF_COMBAT` auf gegnerische Einheiten verfiel zu Beginn ihres Zuges (wirkungslos) → gilt jetzt in ihrem nächsten Zug.',
      '- `EQUIP_HEAL_ONCE` mit `perTurn` wurde nie zurückgesetzt → einmal pro Zug.',
      '- Alpha: Freiwilligenzug, Zweite Welle, Stoßkolonne, Nachrücker, Feldprediger implementiert; Unterstützungsfähigkeiten (Feuerauftrag, Drohnenschlag, Finte, Lazarett, Nachangriff, Aufklärung, Nachschub, Satellit) startbar; Lazarett behält den Patienten; Kommunikationszentrale macht eine Einheit erneut angriffsbereit.',
      '- Sammelpunkt / Glaubensbanner: tote Codes durch implementierte ersetzt.', '',
      '## Offene Systemhinweise', '', '- Soforteinsätze kosten derzeit regelseitig 0 AP (`rules.instant_ap_test`); gedruckte AP und Rabatte auf Soforteinsätze sind wirkungslos (markiert).', '',
      '## Geänderte Karten (vorher → nachher)', '']
for e in out:
    if not (e['text_geaendert'] or e['mechanik_geaendert']): continue
    o.append(f"### {e['name']} (`{e['id']}`, {e['typ']}) – {e['modus']}")
    o.append(f"- vorher: {e['vorher']['text'] or '—'}")
    o.append(f"- nachher: {e['nachher']['text'] or '—'}" + (f" · Wörter: {', '.join(e['nachher'].get('keywords') or [])}" if e['nachher'].get('keywords') else ''))
    va, vd, na, nd = e['vorher'].get('atk'), e['vorher'].get('def'), e['nachher'].get('atk'), e['nachher'].get('def')
    if (va, vd) != (na, nd): o.append(f'- Werte: {va}/{vd} → {na}/{nd}')
    if e['vorher'].get('ap') != e['nachher'].get('ap'): o.append(f"- AP: {e['vorher'].get('ap')} → {e['nachher'].get('ap')}")
    if e.get('entfallen'): o.append('- entfallen/ersetzt: ' + ' | '.join(e['entfallen']))
    if e['flags']: o.append('- Hinweis: ' + '; '.join(e['flags']))
    o.append('')
o += ['## Balance-Hinweise (unverändert gelassen)', '']
for e in out:
    if e['flags'] and not (e['text_geaendert'] or e['mechanik_geaendert']): o.append(f"- {e['name']} (`{e['id']}`): " + '; '.join(e['flags']))
(ROOT / 'Division_Command_0.5a/docs/karten/KARTENPRUEFUNG.md').write_text('\n'.join(o) + '\n')
print('review', len(out), 'text', len(tc), 'mech', len(mc), 'flags', sum(1 for e in out if e['flags']))
