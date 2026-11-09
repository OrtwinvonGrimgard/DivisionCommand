"""Ausrüstung: Text = Implementierung. Reine Werte -> EQUIP_STAT, bedingte Werte -> CM (wirkt für den Träger),
bekannte Equip-Codes behalten (Text aus Code), Rest protokolliert."""
import re, mechanics as M, codetext as CT
COVER = [  # Klauselmuster -> vorhandener Code, der sie abdeckt
    (r'heil', 'EQUIP_HEAL_ONCE'), (r'ziehe.*sofort|sofort.*ziehe', 'EQUIP_SOFT_DRAW'),
    (r'(?:wenn|solange) unterstützung angrenzt', 'EQUIP_COND_DEF'), (r'beim (?:ausspielen|anlegen).*ziehe', 'ON_ENTER_DRAW'),
    (r'(?:zerstört|stirbt).*zieh', 'ON_DESTROY_DRAW'), (r'kostet \d weniger', 'costReduce'), (r'decke \d auf|aufdecken', 'REVEAL'),
]
def split(t):
    t = re.sub(r'\b(mind?)\. ', r'\1§ ', M.clean(t))
    return [p.strip().replace('§', '.') for p in re.split(r'(?<=[.;])\s+|;\s*', t) if p.strip()]
def gen(card):
    fx0 = card.get('effects') or []
    codes = {e['code'] for e in fx0}
    keep = [e for e in fx0 if e['code'] != 'EQUIP_STAT']
    unknown = [e['code'] for e in keep if e['code'] not in CT.EQUIP]
    st = next((e for e in fx0 if e['code'] == 'EQUIP_STAT'), None)
    only = (st or {}).get('param', {}).get('only')
    cost = {k: v for k, v in ((st or {}).get('param') or {}).items() if k in ('costReduce', 'ifSupportSection')}
    a = d = 0; cm = []; texts = []; dropped = []; covered = []
    for cl in split(card.get('text') or ''):
        s = cl.strip(' .;')
        m = re.match(r'^(?:an )?(infanterie|panzer|artillerie)(?:\s*:|\s+(?=[+−-]\d))\s*', s, re.I)
        if m: only = only or m.group(1).lower(); s = s[m.end():]
        s = re.sub(r'^(?:der )?träger(?:\s*hat|\s*erhält|:)?\s*', '', s, flags=re.I)
        s = re.sub(r'^([+−-]\d\s*(?:ATK|DEF)(?:\s*(?:/|und)\s*[+−-]\d\s*DEF)?)\s+(?=(?:wenn|solange|gegen|im|in|bei|nach)\b)', r'\1, ', s)
        ps = M.parse_stat(s.lower())
        if ps and not ps[2].strip(' .;'):
            a += ps[0]; d += ps[1]; continue
        low = s.lower()
        cov = next((c for rx, c in COVER if re.search(rx, low) and (c in codes or (c == 'costReduce' and cost))), None)
        if cov: covered.append(cov); continue
        out = {'fx': [], 'kw': [], 'print': [0, 0], 'ctx': None}
        r = None
        for f in (M.clause, M.clause2):
            try: r = f(s, dict(card, typ='Einheit'), out)
            except Exception: r = None
            if r is not None: break
        if r is not None and (out['fx'] or out['print'] != [0, 0]) and not out['kw']:
            a += out['print'][0]; d += out['print'][1]
            ok = all(e['code'] == 'CM' and e['param'].get('k') in ('stat', 'vs', 'negate', 'kill', 'death', 'turnheal', 'turn', 'hitdebuff') for e in out['fx'])
            if ok:
                cm += out['fx']
                if r and re.match(r'^[+−-]\d', r): r = 'Träger ' + r
                if r: texts.append(re.sub(r'\b[Ss]ie\b', 'er', r).replace('Diese Einheit', 'Der Träger').replace('diese Einheit', 'der Träger').replace('Ihr erster', 'Sein erster'))
                continue
        dropped.append(cl)
    fx = []
    if a or d or cost or only:
        p = {'atk': a, 'def': d}
        if only: p['only'] = only
        p.update(cost); fx.append({'code': 'EQUIP_STAT', 'param': p})
    fx += keep + cm
    if unknown:
        return {'ok': False, 'unsupported': unknown}
    base = CT.gen_equip({'typ': 'Ausrüstung', 'effects': [e for e in fx if e['code'] != 'CM']}) if [e for e in fx if e['code'] != 'CM'] else {'ok': True, 'text': ''}
    text = (base['text'] + ' ' + ' '.join(t[0].upper() + t[1:] for t in texts)).strip()
    if not fx:
        return {'ok': False, 'unsupported': [], 'dropped': dropped}
    return {'ok': True, 'fx': fx, 'text': text, 'dropped': dropped, 'unsupported': []}
