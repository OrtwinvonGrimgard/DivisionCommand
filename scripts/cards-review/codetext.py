"""Kanonischer Kartentext aus den Effektcodes (Text = Implementierung).
gen(card) -> dict(text, ok, unsupported, target) ; ok=False => Text bleibt, Karte wird manuell geprüft gelistet."""
import re
FIL = {None: 'Einheiten', '': 'Einheiten', 'infanterie': 'Infanterie', 'artillerie': 'Artillerie', 'panzer': 'Panzer',
       'panzer|artillerie': 'Panzer und Artillerie'}
OWN = {'HEAL', 'MOVE_SLOTS', 'SELF_DAMAGE', 'EXTRA_ATTACK'}
ENEMY = {'DEAL_DAMAGE', 'DESTROY_IF_DEF', 'MARK_OBSERVED', 'OUT_OF_COMBAT'}
GLOBAL = {'DRAW', 'REVEAL', 'COST_NEXT', 'DRAW_DISCARD', 'BUFF_ALL_OWN', 'MASS_DAMAGE', 'BUFF_SECTION'}
EQUIP = {'EQUIP_STAT', 'EQUIP_HEAL_ONCE', 'EQUIP_SOFT_DRAW', 'EQUIP_COND_DEF', 'ON_ENTER_DRAW', 'ON_DESTROY_DRAW', 'REVEAL'}

def n(x):
    """Formatiert eine Zahl ohne überflüssige Vorzeichen/Nullen für den Kartentext."""
    try: return int(x or 0)
    except Exception: return 0
def sg(v):
    """Vorzeichenbehaftete Zahl als kurzer Text (z. B. +2 / −1)."""
    return ('+' if v > 0 else '−') + str(abs(v))
def karten(v):
    """Singular/Plural „Karte/Karten“ passend zur Anzahl."""
    return f'{v} Karte' if v == 1 else f'{v} Karten'

def buff_parts(p, sec=False):
    """Baut die Textteile eines Buffs (ATK/DEF, Abschnitt optional)."""
    a, d = n(p.get('atk')), n(p.get('def'))
    out = []
    if a: out.append(f"{sg(a)} ATK" + (' bis Zugende' if p.get('until') == 'turn' else ' bis Ende des nächsten Zuges' if p.get('until') == 'next' else ''))
    dsuf = (' bis Zugende' if p.get('until') == 'turn' else ' bis Ende des nächsten Zuges' if p.get('until') == 'next' else '') if sec else ''
    if d > 0: out.append(f"+{d} DEF{dsuf}")
    if d < 0: out.append(f"−{abs(d)} DEF (mind. 1)")
    return out

def side_of(e):
    """Ermittelt die Wirkungsseite (eigen/gegnerisch) eines Effekts."""
    c, p = e['code'], e.get('param') or {}
    if c == 'BUFF':
        return 'enemy' if (p.get('enemy') or n(p.get('atk')) < 0 or n(p.get('def')) < 0) else 'own'
    if c in OWN: return 'own'
    if c in ENEMY: return 'enemy'
    return None

def per_target(e):
    """Text für einen zielbezogenen Effekt (eine oder mehrere Figuren)."""
    c, p = e['code'], e.get('param') or {}
    if c == 'BUFF': return ', '.join(buff_parts(p))
    if c == 'HEAL': return f"heile {n(p.get('value')) or 1}"
    if c == 'DEAL_DAMAGE': return f"{n(p.get('value')) or 1} Schaden"
    if c == 'SELF_DAMAGE': return f"danach erleidet sie {n(p.get('value')) or 1} Schaden"
    if c == 'MOVE_SLOTS':
        s = max(1, n(p.get('slots')) or 1)
        return 'versetze sie seitlich auf ein freies Feld derselben Reihe' + ('' if s == 1 else f' (bis {s} Felder)')
    if c == 'EXTRA_ATTACK': return 'sie darf erneut angreifen'
    if c == 'DESTROY_IF_DEF': return f"zerstöre sie, wenn sie {n(p.get('maxDef')) or 2} DEF oder weniger hat"
    if c == 'MARK_OBSERVED': return 'sie gilt als beobachtet'
    if c == 'OUT_OF_COMBAT': return 'sie kann in ihrem nächsten Zug nicht angreifen'
    return None

def glob(e):
    """Text für einen globalen (nicht zielbezogenen) Effekt."""
    c, p = e['code'], e.get('param') or {}
    if c == 'DRAW': return f"Ziehe {karten(n(p.get('value')) or 1)}."
    if c == 'REVEAL':
        k = n(p.get('count')) or 1
        return 'Decke eine verdeckte gegnerische Einheit auf.' if k == 1 else f'Decke bis zu {k} verdeckte gegnerische Einheiten auf.'
    if c == 'COST_NEXT':
        t = p.get('type') or 'Einheit'
        what = {'Einheit': 'Einheit', 'Infanterie': 'Infanterie', 'Ausrüstung': 'Ausrüstung', 'Soforteinsatz': 'Soforteinsatz', 'Unterstützung': 'Unterstützung'}.get(t, t)
        art = 'Dein nächster' if t == 'Soforteinsatz' else 'Deine nächste'
        mind = '0' if t == 'Soforteinsatz' else '1'
        return f"{art} {what} kostet {n(p.get('amount')) or 1} AP weniger (mind. {mind})."
    if c == 'DRAW_DISCARD':
        return f"Ziehe {karten(n(p.get('draw')) or 2)}, dann wirf deine älteste Handkarte ab."
    if c == 'BUFF_ALL_OWN':
        return f"Alle eigenen {FIL.get(p.get('filter'), p.get('filter'))}: {', '.join(buff_parts(p))}."
    if c == 'MASS_DAMAGE':
        if p.get('onEnter'): return None
        return f"Alle gegnerischen Fronteinheiten erleiden {n(p.get('value')) or 1} Schaden."
    if c == 'HEAL' and p.get('all'):
        return f"Heile {n(p.get('value')) or 1} an allen eigenen {FIL.get(p.get('filter'), p.get('filter'))}."
    if c == 'BUFF_SECTION':
        side = p.get('targetSide') or e.get('targetSide') or 'own'
        if side != 'own': return None
        return f"Wähle einen eigenen Abschnitt: {FIL.get(p.get('filter'), p.get('filter'))} dort {', '.join(buff_parts(p, True))}."
    return None

def gen_instant(card, upto_hint=None):
    """Erzeugt den gedruckten Kurztext eines Soforteinsatzes aus den Codes."""
    fx = card.get('effects') or []
    tgt = [e for e in fx if per_target(e) is not None and not (e['code'] == 'HEAL' and (e.get('param') or {}).get('all'))]
    gl = [e for e in fx if e not in tgt]
    bad = [e['code'] for e in gl if glob(e) is None]
    if bad or not fx: return {'ok': False, 'unsupported': bad}
    parts = []; target = {'needs': bool(tgt)}
    if tgt:
        sides = [side_of(e) for e in tgt if side_of(e)]
        # SELF_DAMAGE nach BUFF/HEAL ist dasselbe Ziel; DEAL_DAMAGE nach eigenem Buff = Selbstschaden
        side = sides[0] if sides else 'own'
        if side == 'own' and any(e['code'] == 'DEAL_DAMAGE' for e in tgt):
            tgt = [dict(e, code='SELF_DAMAGE') if e['code'] == 'DEAL_DAMAGE' else e for e in tgt]
        cnt = max([n((e.get('param') or {}).get('count')) for e in tgt] + [1])
        if any(e['code'] == 'MOVE_SLOTS' for e in tgt): cnt = 1  # Bewegen löst eigene Zielwahl aus
        upto = cnt > 1 and (upto_hint if upto_hint is not None else True) or any((e.get('param') or {}).get('upto') for e in tgt)
        target.update(side=side, count=cnt, upto=upto)
        who = 'eigene' if side == 'own' else 'gegnerische'
        head = f"Wähle eine {who} Fronteinheit" if cnt == 1 else (f"Wähle bis zu {cnt} {who} Fronteinheiten" if upto else f"Wähle {cnt} {who} Fronteinheiten")
        eff = [per_target(e) for e in tgt]
        body = '; '.join(eff)
        if cnt > 1: body = 'je ' + body
        parts.append(f"{head}: {body}.")
    secs = [e for e in gl if e['code'] == 'BUFF_SECTION']
    if len(secs) > 1:  # eine Abschnittswahl, mehrere Boni
        bon = []
        for e in secs:
            p = e.get('param') or {}; bon.append(f"{FIL.get(p.get('filter'), p.get('filter'))} dort {', '.join(buff_parts(p, True))}")
        gl = [e for e in gl if e['code'] != 'BUFF_SECTION']
        parts.append('Wähle einen eigenen Abschnitt: ' + '; '.join(bon) + '.')
    for e in gl: parts.append(glob(e))
    t = ' '.join(parts)
    return {'ok': True, 'text': t[0].upper() + t[1:], 'target': target, 'unsupported': []}

def gen_equip(card):
    """Erzeugt den gedruckten Kurztext einer Ausrüstung aus den Codes."""
    fx = card.get('effects') or []
    bad = [e['code'] for e in fx if e['code'] not in EQUIP]
    if bad or not fx: return {'ok': False, 'unsupported': bad}
    parts = []
    for e in fx:
        c, p = e['code'], e.get('param') or {}
        if c == 'EQUIP_STAT':
            if p.get('only'): parts.insert(0, f"Nur an {FIL.get(p['only'], p['only'])}.")
            st = ', '.join(x for x in [sg(n(p.get('atk'))) + ' ATK' if n(p.get('atk')) else '', sg(n(p.get('def'))) + ' DEF' if n(p.get('def')) else ''] if x)
            if st: parts.append(f"Träger {st}.")
            if p.get('costReduce'):
                cond = ', wenn du eine Unterstützung im Feld hast' if p.get('ifSupportSection') else ''
                parts.append(f"Kostet {n(p['costReduce'])} AP weniger{cond}.")
        elif c == 'EQUIP_HEAL_ONCE':
            h = n(p.get('heal')) or 1
            parts.append(("Einmal pro Zug" if p.get('perTurn') else "Einmalig") + f": Erleidet der Träger Schaden, heilt er danach {h}.")
        elif c == 'EQUIP_SOFT_DRAW':
            what = 'einen Soforteinsatz mit Aufdecken' if p.get('needRevealSofort') else 'einen Soforteinsatz'
            parts.append(f"Einmal pro Zug: Spielst du {what}, ziehe {karten(n(p.get('draw')) or 1)}.")
        elif c == 'EQUIP_COND_DEF':
            parts.append(f"Träger +{n(p.get('def')) or 1} DEF, solange du eine Unterstützung im Feld hast.")
        elif c == 'ON_ENTER_DRAW':
            parts.append(f"Beim Anlegen: ziehe {karten(n(p.get('value')) or 1)}.")
        elif c == 'ON_DESTROY_DRAW':
            parts.append(f"Wird der Träger zerstört, ziehe {karten(n(p.get('draw')) or 1)}.")
        elif c == 'REVEAL':
            parts.append("Beim Anlegen: " + glob(e)[0].lower() + glob(e)[1:])
    return {'ok': True, 'text': ' '.join(parts), 'unsupported': []}

def gen(card):
    """Erzeugt den gedruckten Kurztext einer beliebigen Karte aus Typ und Effektcodes."""
    if card.get('typ') == 'Soforteinsatz': return gen_instant(card)
    if card.get('typ') == 'Ausrüstung': return gen_equip(card)
    return {'ok': False, 'unsupported': []}
