"""Lesen/Schreiben der Kartendaten-Dateien (JSON in window.DC_SET_TYPES[...] = [...];)."""
import json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
TYPES=ROOT/'Division_Command/web/js/data/sets/types'
FILES=['doktrinen','tokens','infanterie','panzer','artillerie','aufklaerung','elite','unterstuetzung','soforteinsatz','ausruestung','nation_pools','tactical']
RX=re.compile(r'^(.*?window\.DC_SET_TYPES(?:\[[^\]]+\]|\.\w+)\s*=\s*)(\[.*\])(\s*;?\s*)$',re.S)
def load(name):
    s=(TYPES/(name+'.js')).read_text(encoding='utf8')
    m=RX.match(s); assert m,name
    return m.group(1),json.loads(m.group(2)),m.group(3)
def indent_of(name):
    s=(TYPES/(name+'.js')).read_text(encoding='utf8')
    m=re.search(r'\[\n( +)\{',s); return len(m.group(1)) if m else 2
def save(name,head,arr,tail):
    ind=indent_of(name)
    (TYPES/(name+'.js')).write_text(head+json.dumps(arr,ensure_ascii=False,indent=ind)+(tail if tail.strip() else ';\n'),encoding='utf8')
def all_cards():
    out={}
    for f in FILES:
        if not (TYPES/(f+'.js')).exists(): continue
        h,a,t=load(f)
        for c in a: out[c['id']]=(f,c)
    return out
