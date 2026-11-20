#!/usr/bin/env python3
"""t315: Jede Karte EIN festes, eigenes Texturmuster.
Prüft: Register vollständig + eindeutig; Seed deterministisch (crc32(id)/Register, kein Zufall);
gleicher Seed → bytegleiche Textur; zwei Karten gleicher Art → verschiedene Muster (Texturen und
gerenderte Faces: Ausschnitt reiner Textur)."""
import json, sys, hashlib, subprocess
from pathlib import Path
import numpy as np
from PIL import Image
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'KartenEditor/tools'))
import texgen as TG
reg = json.loads((ROOT / 'scripts/graphics/tex-seeds.json').read_text())['seeds']
cat = json.loads(subprocess.check_output(['node', str(ROOT / 'scripts/graphics/export_catalog.js')], cwd=ROOT))['cards']
ids = [c['id'] for c in cat]
assert set(ids) <= set(reg), 'Register unvollständig'
assert len(set(reg.values())) == len(reg), 'Seeds nicht eindeutig'
for c in cat[:50]:
    assert TG.seed_for(c) == TG.seed_for(dict(c)) == (int(c['tex_seed']) if c.get('tex_seed') else reg[c['id']])
    assert TG.begin(c) == TG.begin(c)
# gleiche Karte → bytegleich; andere Karte gleicher Art → anderes Muster
a, b = cat[0], cat[1]
for name in ('marmor-oel.jpg', 'leather.jpg', 'bg-doktrin-a.jpg', 'oil-blue.jpg', 'metal-gehaemmert.jpg', 'infanterie.jpg'):
    TG.begin(a); x1 = np.asarray(TG.texture(name, (320, 240)))
    TG.begin(a); x2 = np.asarray(TG.texture(name, (320, 240)))
    TG.begin(b); y = np.asarray(TG.texture(name, (320, 240)))
    assert (x1 == x2).all(), name + ' nicht deterministisch'
    assert np.abs(x1.astype(int) - y).mean() > 4, name + ' zwei Karten gleich'
# gerenderte Faces: reiner Texturausschnitt je Kartenart paarweise verschieden
M = json.loads((ROOT / 'scripts/graphics/graphics-manifest.json').read_text())
WEB = ROOT / 'Division_Command/web/assets/cards'
REG = {'Einheit': (40, 1250, 140, 1290), 'Soforteinsatz': (30, 1350, 300, 1400), 'Unterstützung': (30, 1330, 300, 1400),
       'Doktrin': (60, 1250, 960, 1340), 'Ausrüstung': (30, 1330, 300, 1400)}
checked = 0
for typ, box in REG.items():
    recs = [r for r in M['records'] if r['ready'] and r['type'] == typ][:40]
    hs = {}
    for r in recs:
        im = Image.open(WEB / r['output']).convert('RGB').crop(box)
        h = hashlib.sha1(im.tobytes()).hexdigest()
        assert h not in hs, f'{typ}: {r["id"]} und {hs.get(h)} gleiches Muster'
        hs[h] = r['id']; checked += 1
print(f'PASS tex seeds t315: {len(ids)} Karten, {len(set(reg.values()))} eindeutige Seeds; deterministisch; {checked} Faces paarweise verschieden')
