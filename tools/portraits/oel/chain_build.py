#!/usr/bin/env python3
"""Chain set Rothain/m1: aligned oil paintings -> 768x1024 webp + scar layers + manifest + sheets.
Usage: chain_build.py export|sheets   (aligned/ comes from chain_align.py, see NOTES)"""
import sys, os, json, glob
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE); sys.path.insert(0, os.path.dirname(HERE))
import numpy as np
from PIL import Image, ImageDraw, ImageFont
ALIGNED = os.environ.get('CHAIN_ALIGNED', '/workspace/t325-portraits/oel/kette/aligned')
OUT = os.environ.get('CHAIN_OUT', '/workspace/dc-t325/Division_Command/web/assets/portraits/oel_ketten')
W, H = 768, 1024
RANKS = [('faehnrich', 'Fähnrich', 19), ('oberfaehnrich', 'Oberfähnrich', 21), ('leutnant', 'Leutnant', 23), ('oberleutnant', 'Oberleutnant', 26),
         ('hauptmann', 'Hauptmann', 30), ('stabshauptmann', 'Stabshauptmann', 34), ('major', 'Major', 38), ('oberstleutnant', 'Oberstleutnant', 42),
         ('oberst', 'Oberst', 46), ('brigadegeneral', 'Brigadegeneral', 50), ('generalmajor', 'Generalmajor', 53), ('generalleutnant', 'Generalleutnant', 56),
         ('general', 'General', 60), ('generaloberst', 'Generaloberst', 63), ('feldmarschall', 'Feldmarschall', 67), ('generalfeldmarschall', 'Generalfeldmarschall', 70)]
# anchors of the Fähnrich master (864x1152 raw -> x0.8889): eye midpoint (428,314), chin y 532
K = W / 864.0
ANCH = dict(eye_mid=[428 * K, 314 * K], chin_y=532 * K)

def fname(i): return f'{i+1:02d}_{RANKS[i][0]}'

def export():
    d = os.path.join(OUT, 'rothain', 'm1'); os.makedirs(d, exist_ok=True)
    for i in range(16):
        im = Image.open(f'{ALIGNED}/{fname(i)}.jpg').convert('RGB').resize((W, H), Image.LANCZOS)
        im.save(f'{d}/{fname(i)}.webp', quality=92, method=5)
    # scars: reuse the v2 oil-set scar drawing, mapped from the v2 face frame (eye 372 / chin 555 / cx 384) to this master
    from oel_build import build_scars
    sc = build_scars()
    s = (ANCH['chin_y'] - ANCH['eye_mid'][1]) / 183.0
    ex, ey = ANCH['eye_mid']
    os.makedirs(os.path.join(OUT, '_common', 'scars'), exist_ok=True)
    OFF = dict(wange=(-8, -12), braue=(0, 4), kiefer=(22, -2))   # px in the 768x1024 target, fitted on the Faehnrich master
    for k, arr in sc.items():
        im = Image.fromarray(arr)
        im = im.transform(im.size, Image.AFFINE, (1 / s, 0, 384 - (ex + OFF[k][0]) / s, 0, 1 / s, 372 - (ey + OFF[k][1]) / s), resample=Image.BICUBIC)
        im.save(os.path.join(OUT, '_common', 'scars', f'{k}.webp'), quality=95, method=5)
    man = dict(version=1, style='oil-chain', nation='rothain', person='m1', canvas=[W, H], format='webp (opaque painting, flat dark background #2b2724)',
               note='Each rank image is an edit of the previous one (same pose/crop/light), landmark-aligned to the Faehnrich (eyes/chin). Scars are separate alpha layers.',
               anchors=ANCH, z_order=['painting', 'scars'], headgear='none (caps are optional separate layers, not part of the chain)',
               ranks=[dict(id=r[0], name=r[1], approx_age=r[2], file=f'rothain/m1/{fname(i)}.webp') for i, r in enumerate(RANKS)],
               scars=dict(mode='multi', layers={k: dict(file=f'_common/scars/{k}.webp') for k in ('wange', 'braue', 'kiefer')}))
    json.dump(man, open(os.path.join(OUT, 'manifest.json'), 'w'), indent=1, ensure_ascii=False)

def compose(rank_index, scars=()):
    im = Image.open(f'{OUT}/rothain/m1/{fname(rank_index)}.webp').convert('RGBA')
    for s in scars:
        im.alpha_composite(Image.open(f'{OUT}/_common/scars/{s}.webp').convert('RGBA'))
    return im.convert('RGB')

def sheet(path, items, cols=4, tw=324):
    th = int(tw * H / W)
    f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 15)
    rows = (len(items) + cols - 1) // cols
    sh = Image.new('RGB', (cols * tw, rows * (th + 22)), (30, 30, 34)); d = ImageDraw.Draw(sh)
    for n, (i, scars, label) in enumerate(items):
        x, y = (n % cols) * tw, (n // cols) * (th + 22)
        sh.paste(compose(i, scars).resize((tw, th), Image.LANCZOS), (x, y + 22)); d.text((x + 6, y + 3), label, fill=(235, 235, 235), font=f)
    sh.save(path, quality=90); print('wrote', path, sh.size)

def sheets(prefix):
    sheet(f'{prefix}/kette_rothain_m1.jpg', [(i, (), f'{i+1:02d} {RANKS[i][1]} (~{RANKS[i][2]})') for i in range(16)])
    var = [(0, ('wange',), '01 Fähnrich · wange'), (4, ('braue',), '05 Hauptmann · braue'), (8, ('wange', 'braue'), '09 Oberst · wange+braue'),
           (12, ('kiefer',), '13 General · kiefer'), (7, ('wange', 'kiefer'), '08 Oberstlt. · wange+kiefer'), (10, ('braue', 'kiefer'), '11 Generalmajor · braue+kiefer'),
           (15, ('wange', 'braue', 'kiefer'), '16 Gen.feldm. · alle drei'), (2, ('wange', 'braue', 'kiefer'), '03 Leutnant · alle drei')]
    sheet(f'{prefix}/kette_rothain_m1_narben.jpg', var)

if __name__ == '__main__':
    if sys.argv[1] == 'export': export()
    if sys.argv[1] == 'sheets': sheets(sys.argv[2] if len(sys.argv) > 2 else '/workspace/t325-portraits/oel')
