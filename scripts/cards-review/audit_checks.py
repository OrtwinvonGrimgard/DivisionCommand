"""Statische Prüfungen Text ↔ Effektdaten ↔ Engine (t212)."""
import re
HOSTILE = {'DEAL_DAMAGE','DESTROY','DESTROY_IF_DEF','OUT_OF_COMBAT','ZIELANGRIFF','UMGEHEN','SACRIFICE_INFANTRY_DAMAGE','REVEAL','MARK_OBSERVED','NO_MOVE_THIS_TURN'}
OWN = {'BUFF','HEAL','EXTRA_ATTACK','SELF_DAMAGE','REPLACE_UNIT','KEIN_LOCH'}
TARGETED = ['NO_MOVE_THIS_TURN','DEAL_DAMAGE','HEAL','DESTROY','DESTROY_IF_DEF','SACRIFICE','SACRIFICE_INFANTRY_DAMAGE','BUFF','SELF_DAMAGE','RETURN_TO_HAND','MOVE_FRONT','MOVE_SLOTS','OUT_OF_COMBAT','PLACE_TOKEN','REMOVE_TOKEN','REVEAL','MARK_OBSERVED','EXTRA_ATTACK','REPLACE_UNIT','BUFF_SECTION','ZIELANGRIFF','UMGEHEN','KEIN_LOCH']
def heuristic_side(text):
    """Schätzt die Wirkungsseite allein aus dem Fließtext."""
    if re.search(r'eigene', text, re.I) and not re.search(r'gegner', text, re.I): return 'own'
    if re.search(r'gegner|feind', text, re.I): return 'enemy'
    return 'all'
def intended_side(codes):
    """Wirkungsseite, wie sie die Effektcodes vorgeben."""
    cs = set(codes)
    if cs & HOSTILE and not cs & (OWN - {'SELF_DAMAGE'}): return 'enemy'
    if cs & OWN and not cs & HOSTILE: return 'own'
    return None
def target_count(text):
    """Zählt erwähnte Ziele im Kartentext (Audit)."""
    m = re.search(r'[Bb]is\s*(\d+)', text) or re.search(r'(\d+)\s*[–-]\s*(\d+)', text) or re.search(r'(\d+)\s*(?:benachbarte|gegnerische|feindliche|Einheiten)', text) or re.search(r'\b[Zz]wei\b', text)
    if not m: return 1
    if re.fullmatch(r'[Zz]wei', m.group(0)): return 2
    if m.lastindex and m.lastindex >= 2 and m.group(2): return int(m.group(2))
    return int(m.group(1))
def numbers_check(c):
    """Zahlen im Text gegen Parameter der häufigsten Codes."""
    t = c.get('text') or ''; out = []
    for e in c.get('effects') or []:
        p = e.get('param') or {}; code = e.get('code')
        def need(rx, val, label):
            """Prüft, ob ein erwartetes Muster im Text vorkommt; sonst Audit-Treffer."""
            if val in (None, 0, ''): return
            ms = [int(x) for x in re.findall(rx, t)]
            if ms and abs(int(val)) not in [abs(m) for m in ms]: out.append(f'{code}.{label}={val} ≠ Text {ms}')
        if code in ('BUFF', 'EQUIP_STAT', 'BUFF_SECTION', 'AURA_STAT'):
            need(r'[+−-](\d+)\s*ATK', p.get('atk'), 'atk'); need(r'[+−-](\d+)\s*DEF', p.get('def'), 'def')
        if code == 'DEAL_DAMAGE': need(r'(\d+)\s*Schaden', p.get('value'), 'value')
        if code == 'HEAL': need(r'[Hh]eil\w*\s*(?:bis zu\s*)?(\d+)', p.get('value'), 'value')
        if code == 'DRAW': need(r'[Zz]iehe\s*(\d+)', p.get('value'), 'value')
        if code == 'COST_NEXT': need(r'(\d+)\s*AP weniger', p.get('amount'), 'amount')
    return out
ABBR = re.compile(r'(?<![\w/])[+−-]?\d+\s*(?:V|A)\b(?!P)|\bV/Zug\b')
