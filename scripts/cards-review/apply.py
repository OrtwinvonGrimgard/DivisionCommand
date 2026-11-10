"""t212 Phase 1: Kartentexte und Mechanik angleichen (Text = Implementierung).
Schreibt die Kartendaten (außer generierte nation_pools/tactical) und review.json.
Idempotent: Ausgangsbasis ist immer orig_snapshot.json (vor der ersten Anwendung erzeugt)."""
import json, re, copy, sys, collections
from pathlib import Path
import datafiles as DF, mechanics as M, codetext as CT, equipgen as EG, audit_checks as AC
HERE = Path(__file__).parent
SNAP = HERE / 'orig_snapshot.json'
EDIT = ['doktrinen', 'tokens', 'infanterie', 'panzer', 'artillerie', 'aufklaerung', 'elite', 'unterstuetzung', 'soforteinsatz', 'ausruestung']
UNIT_FILES = ['infanterie', 'panzer', 'artillerie', 'aufklaerung', 'elite']

def snapshot():
    """Sichert den aktuellen Stand der Typdateien vor einer Batch-Änderung."""
    if SNAP.exists(): return json.loads(SNAP.read_text())
    snap = {f: DF.load(f)[1] for f in DF.FILES}
    SNAP.write_text(json.dumps(snap, ensure_ascii=False))
    return snap

ABBR_FIX = [(re.compile(r'([+−-]?\d+)\s*V\b(?!P)'), r'\1 DEF'), (re.compile(r'([+−-]?\d+)\s*A\b(?!P)'), r'\1 ATK'), (re.compile(r'\bV/Zug\b'), 'DEF/Zug')]
def fix_abbr(t):
    """Normalisiert Abkürzungen im Kartentext (ATK, DEF, AP)."""
    for rx, rep in ABBR_FIX: t = rx.sub(rep, t)
    return t

SUPPORT_MANUAL = {
    'dc_b_feuerleitung_153': ([{'code': 'CM', 'param': {'k': 'aura', 'scope': 'all', 'filter': 'artillerie', 'atk': 1}},
                               {'code': 'CM', 'param': {'k': 'aura', 'scope': 'all', 'filter': 'artillerie', 'atk': 1, 'when': 'played:Soforteinsatz'}}],
                              'Eigene Artillerie +1 ATK, weitere +1 ATK, wenn du in diesem Zug einen Soforteinsatz gespielt hast.'),
    'dc_b_schichtplan_155': ([{'code': 'CM', 'param': {'k': 'discount', 'delta': -1, 'once': True}}],
                             'Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1).'),
    'dc_b_glaubensbanner_113': ([{'code': 'TACTICAL_SECTION_INF_DEF', 'param': {'amount': 1}}],
                                'Wähle beim Ausspielen einen Abschnitt: eigene Infanterie dort +1 DEF.'),
    'dc_su_glaubensbanner': ([{'code': 'TACTICAL_SECTION_INF_DEF', 'param': {'amount': 1}}],
                             'Wähle beim Ausspielen einen Abschnitt: eigene Infanterie dort +1 DEF.'),
    'dc_b_sammelpunkt_111': ([{'code': 'AURA_COST_MOD', 'param': {'filter': 'infanterie', 'delta': -1}}],
                             'Eigene Infanterie kostet 1 AP weniger (mind. 1).'),
    'dc_su_sammelpunkt': ([{'code': 'AURA_COST_MOD', 'param': {'filter': 'infanterie', 'delta': -1}}],
                          'Eigene Infanterie kostet 1 AP weniger (mind. 1).'),
    'dc_b_kronrat_633': ([{'code': 'CM', 'param': {'k': 'aura', 'scope': 'all', 'filter': 'elite_panzer', 'def': 1}}],
                         'Eigene Elite und Panzer +1 DEF.'),
    'dc_b_implantatlager_388': ([{'code': 'EQUIP_DISCOUNT'}], 'Eigene Ausrüstung kostet 1 AP weniger (mind. 1).'),
    'dc_b_feldschmied_270': ([{'code': 'EQUIP_DISCOUNT'}], 'Eigene Ausrüstung kostet 1 AP weniger (mind. 1).'),
    'dc_b_versorgungspunkt_332': ([{'code': 'CM', 'param': {'k': 'turnheal', 'n': 1}}, {'code': 'CM', 'param': {'k': 'discount', 'delta': -1, 'once': True}}],
                                  'Zu Beginn deines Zuges: heile 1 DEF an einer beschädigten eigenen Einheit. Einmal pro Zug: deine nächste Einheit kostet 1 AP weniger (mind. 1).'),
}
BOGUS_SUPPORT = {'AURA_FRONT_DEF', 'AURA_FRONT_ATK', 'UNIT_DISCOUNT'}

def add_draw_reveal(orig_text, fx):
    """Im alten Text versprochenes Ziehen/Aufdecken ergänzen, wenn der Code es nicht hatte."""
    t = M.clean(orig_text).lower(); codes = {e['code'] for e in fx}; added = []
    m = re.search(r'\bziehe (\d|eine?|zwei)\b(?! infanterie)', t)
    if m and not codes & {'DRAW', 'DRAW_DISCARD', 'DRAW_THEN_CHOOSE_DISCARD', 'LOOK_TOP'} and 'wenn' not in t[max(0, m.start() - 25):m.start()]:
        v = {'ein': 1, 'eine': 1, 'zwei': 2}.get(m.group(1)) or int(m.group(1))
        fx.append({'code': 'DRAW', 'param': {'value': v}}); added.append('DRAW')
    m = re.search(r'\bdecke (\d|eine?)\b[^.;]*\bauf\b', t)
    if m and 'REVEAL' not in codes and 'MARK_OBSERVED' not in codes:
        v = 1 if not m.group(1).isdigit() else int(m.group(1))
        fx.append({'code': 'REVEAL', 'param': {'count': v}}); added.append('REVEAL')
    return added

def main():
    """Wendet Review-Korrekturen (Abkürzungen, gezogene Effekte) auf die Typdateien an."""
    snap = snapshot()
    review = []; stats = collections.Counter()
    for f in EDIT:
        head, arr, tail = DF.load(f)
        orig = {c['id']: c for c in snap[f]}
        out = []
        for c0 in arr:
            c = copy.deepcopy(orig.get(c0['id'], c0))
            before = copy.deepcopy(c)
            entry = {'id': c['id'], 'name': c.get('name'), 'set': c.get('set'), 'typ': c.get('typ'), 'datei': f, 'flags': []}
            fx = c.get('effects') or []
            text0 = c.get('text') or ''
            mode = None; dropped = []
            nat = c.get('set') == 'set_nations'
            if c['id'] in SUPPORT_MANUAL:
                c['effects'], c['text'] = copy.deepcopy(SUPPORT_MANUAL[c['id']][0]), SUPPORT_MANUAL[c['id']][1]
                mode = 'manuell'
            elif nat and c.get('typ') in ('Einheit', 'Unterstützung') and (not fx or (c['typ'] == 'Unterstützung' and {e['code'] for e in fx} & BOGUS_SUPPORT)):
                r = M.translate(dict(c, effects=[]))
                mode = r['mode']; dropped = r['dropped']
                if mode != 'vanilla':
                    c['effects'] = r['fx']
                    if r['kw']:
                        have = list(c.get('keywords') or []); words = json.loads((HERE / 'words.json').read_text())
                        for k in r['kw']:
                            if k in have: continue
                            if k in words and sum(1 for x in have if x in words) >= 2:
                                dropped = dropped + [f'Schlüsselwort {k} (max. 2 Grundwörter je Karte)']; continue
                            have.append(k)
                        c['keywords'] = have
                    if r['print'] != [0, 0] and c['typ'] == 'Einheit':
                        c['atk'] = int(c.get('atk') or 0) + r['print'][0]; c['def'] = max(1, int(c.get('def') or 0) + r['print'][1])
                    c['text'] = r['text']
            elif nat and c.get('typ') == 'Soforteinsatz' and fx:
                fx2 = copy.deepcopy(fx); added = add_draw_reveal(text0, fx2)
                r = CT.gen_instant(dict(c, effects=fx2), upto_hint=bool(re.search(r'[Bb]is\s*(zu\s*)?\d|\d\s*[–-]\s*\d', text0)))
                if r['ok']:
                    c['effects'] = fx2; c['text'] = r['text']; c['target'] = r['target']
                    if any(e['code'] == 'BUFF_SECTION' for e in fx2): c.pop('target', None)
                    mode = 'aus-code' + ('+' + '+'.join(added) if added else '')
                else:
                    mode = 'spezifisch'; c['text'] = fix_abbr(text0)
                    side = AC.intended_side([e['code'] for e in fx]) or AC.heuristic_side(text0)
                    if side in ('own', 'enemy'):
                        c['target'] = {'side': side}
            elif nat and c.get('typ') == 'Ausrüstung' and fx:
                r = EG.gen(c)
                if r['ok']:
                    fx2 = r['fx']
                    for e in fx2:
                        p = e.get('param') or {}
                        if e['code'] == 'EQUIP_STAT' and p.get('costReduce') and not p.get('ifSupportSection'):
                            c['ap'] = max(0, int(c.get('ap') or 0) - int(p.pop('costReduce'))); entry['flags'].append('Selbstrabatt in AP eingerechnet')
                    added = add_draw_reveal(' '.join(r['dropped']), fx2) if r['dropped'] else []
                    r2 = EG.gen(dict(c, effects=fx2)) if False else None
                    c['effects'] = fx2
                    base = CT.gen_equip({'typ': 'Ausrüstung', 'effects': [e for e in fx2 if e['code'] != 'CM']}) if [e for e in fx2 if e['code'] != 'CM'] else {'text': ''}
                    cmtxt = r['text'][len(CT.gen_equip({'typ': 'Ausrüstung', 'effects': [e for e in r['fx'] if e['code'] != 'CM']})['text']):].strip() if [e for e in r['fx'] if e['code'] != 'CM'] else r['text']
                    c['text'] = (base['text'] + ' ' + cmtxt).strip()
                    dropped = [d for d in r['dropped']]
                    mode = 'aus-code' if not dropped else 'teilweise'
                else:
                    mode = 'spezifisch'; c['text'] = fix_abbr(text0)
            else:
                t2 = fix_abbr(text0)
                if t2 != text0: c['text'] = t2; mode = 'abkürzung'
            if c.get('text') == '' and not c.get('keywords') and not c.get('effects'):
                c['text'] = text0  # nie leeren Text ohne Mechanik schreiben
            entry['modus'] = mode or 'unverändert'
            entry['vorher'] = {'text': text0, 'effects': before.get('effects') or [], 'atk': before.get('atk'), 'def': before.get('def'), 'ap': before.get('ap')}
            entry['nachher'] = {'text': c.get('text'), 'effects': c.get('effects') or [], 'atk': c.get('atk'), 'def': c.get('def'), 'ap': c.get('ap'), 'keywords': c.get('keywords') or [], 'target': c.get('target')}
            entry['entfallen'] = dropped
            entry['text_geaendert'] = c.get('text') != text0
            entry['mechanik_geaendert'] = json.dumps(c.get('effects') or [], sort_keys=True) != json.dumps(before.get('effects') or [], sort_keys=True) or c.get('atk') != before.get('atk') or c.get('def') != before.get('def') or c.get('ap') != before.get('ap') or c.get('keywords') != before.get('keywords') or c.get('target') != before.get('target')
            review.append(entry); out.append(c)
        DF.save(f, head, out, tail)
    # generierte Dateien nur prüfen
    for f in ('nation_pools', 'tactical'):
        for c in DF.load(f)[1]:
            t = c.get('text') or ''
            review.append({'id': c['id'], 'name': c.get('name'), 'set': c.get('set'), 'typ': c.get('typ'), 'datei': f, 'modus': 'generiert-geprüft',
                           'flags': ['Abkürzung V/A'] if AC.ABBR.search(t) else [], 'vorher': {'text': t, 'effects': c.get('effects') or []},
                           'nachher': {'text': t, 'effects': c.get('effects') or []}, 'entfallen': [], 'text_geaendert': False, 'mechanik_geaendert': False})
    (HERE / 'review_raw.json').write_text(json.dumps(review, ensure_ascii=False, indent=1))
    c = collections.Counter(e['modus'] for e in review)
    print(len(review), dict(c))
    print('text', sum(e['text_geaendert'] for e in review), 'mech', sum(e['mechanik_geaendert'] for e in review))
main()
