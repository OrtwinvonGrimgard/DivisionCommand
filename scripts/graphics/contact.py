#!/usr/bin/env python3
"""Kontaktbögen der gfx2-Vorderseiten: python3 contact.py OUTDIR [--ids a,b] [--nation X] [--per 24] [--name prefix]"""
import json, sys, argparse, random
from pathlib import Path
from PIL import Image
HERE = Path(__file__).resolve().parent; WEB = HERE.parents[1] / 'Division_Command_0.5a/web'
ap = argparse.ArgumentParser(); ap.add_argument('out'); ap.add_argument('--ids'); ap.add_argument('--nation'); ap.add_argument('--type'); ap.add_argument('--per', type=int, default=24); ap.add_argument('--name', default='sheet'); ap.add_argument('--sample', type=int); a = ap.parse_args()
R = [r for r in json.loads((HERE / 'graphics-manifest.json').read_text())['records'] if r['ready']]
if a.ids: s = set(a.ids.split(',')); R = [r for r in R if r['id'] in s]
if a.nation: R = [r for r in R if r['nation'] == a.nation]
if a.type: R = [r for r in R if r['type'] == a.type]
if a.sample: random.seed(212); R = random.sample(R, min(a.sample, len(R)))
cols, tw, th = 6, 300, 418
out = Path(a.out); out.mkdir(parents=True, exist_ok=True); paths = []
for k in range(0, len(R), a.per):
    chunk = R[k:k + a.per]; rows = (len(chunk) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * (tw + 8) + 8, rows * (th + 8) + 8), (24, 22, 20))
    for j, r in enumerate(chunk):
        im = Image.open(WEB / 'assets/cards' / r['output']).convert('RGBA').resize((tw, th), Image.Resampling.LANCZOS)
        sheet.paste(im, (8 + (j % cols) * (tw + 8), 8 + (j // cols) * (th + 8)), im)
    p = out / f'{a.name}-{k // a.per + 1:02d}.jpg'; sheet.save(p, quality=86); paths.append(str(p))
print('\n'.join(paths))
