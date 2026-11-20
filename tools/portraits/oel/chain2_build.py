#!/usr/bin/env python3
"""v2 oil chains (Rothain): aligned 864x1152 paintings -> webp, per-person scar layers (plastic), manifest, sheets.
Work dir: <WORK>/<rock|gala>/<m1|m2|f1|f2>/{raw,aligned}   (WORK=/workspace/t325-portraits/oel/v2)
Usage: chain2_build.py export | sheets | detail
Env: CHAIN2_WORK, CHAIN2_OUT, CHAIN2_SHEETS"""
import sys, os, json
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter
WORK = os.environ.get('CHAIN2_WORK', '/workspace/t325-portraits/oel/v2')
OUT = os.environ.get('CHAIN2_OUT', os.path.join(HERE, '..', '..', '..', 'Division_Command', 'web', 'assets', 'portraits', 'oel_ketten'))
SHEETS = os.environ.get('CHAIN2_SHEETS', '/workspace/t325-portraits/oel')
W, H = 864, 1152
UNI = {'rock': 'dienstrock', 'gala': 'gala'}
PERSONS = ['m1', 'm2', 'f1', 'f2']
RANKS = [('faehnrich', 'Fähnrich', 19), ('oberfaehnrich', 'Oberfähnrich', 21), ('leutnant', 'Leutnant', 23), ('oberleutnant', 'Oberleutnant', 26),
         ('hauptmann', 'Hauptmann', 30), ('stabshauptmann', 'Stabshauptmann', 34), ('major', 'Major', 38), ('oberstleutnant', 'Oberstleutnant', 42),
         ('oberst', 'Oberst', 46), ('brigadegeneral', 'Brigadegeneral', 50), ('generalmajor', 'Generalmajor', 53), ('generalleutnant', 'Generalleutnant', 56),
         ('general', 'General', 60), ('generaloberst', 'Generaloberst', 63), ('feldmarschall', 'Feldmarschall', 67), ('generalfeldmarschall', 'Generalfeldmarschall', 70)]
# scar geometry lives in the v2 face frame (eye y372, chin y555, cx384, 183 px eye->chin)
SCAR_OFF = {'wange': (-9, -13), 'braue': (0, 5), 'kiefer': (14, -10)}   # px at 864 wide, relative to the face (scaled by eye-chin)
PERSON_OFF = {}   # optional per (uni,person,scar) fine offsets: {('rock','f1','kiefer'): (dx,dy)}

def fname(i): return f'{i+1:02d}_{RANKS[i][0]}'
def adir(u, p): return f'{WORK}/{u}/{p}/aligned'
def have(u, p): return os.path.isdir(adir(u, p)) and len([f for f in os.listdir(adir(u, p)) if f[:2].isdigit()]) == 16

def anchors(u, p):
    from oelkit import landmarks, load
    cache = f'{WORK}/{u}/{p}/anchors.json'
    if os.path.exists(cache): return json.load(open(cache))
    lm = landmarks(load(f'{WORK}/{u}/{p}/raw/01_faehnrich.jpg').astype(np.uint8))
    mid = (lm['eL'] + lm['eR']) / 2
    a = dict(eye_mid=[float(mid[0]), float(mid[1])], chin_y=float(lm['chin'][1]), eye_chin=float(np.linalg.norm(lm['chin'] - mid)),
             eyes=[lm['eL'].tolist(), lm['eR'].tolist()])
    json.dump(a, open(cache, 'w')); return a

def curve(p0, p1, bow, n=40):
    p0, p1 = np.array(p0, float), np.array(p1, float); t = np.linspace(0, 1, n)[:, None]
    d = p1 - p0; nrm = np.array([-d[1], d[0]]) / (np.linalg.norm(d) + 1e-6)
    return p0 + d * t + nrm * bow * np.sin(np.pi * t)

def render_scar(name, an, off):
    """plastic scar: raised ridge with highlight (light upper left), shadow groove, rosy core, stitch marks. Returns RGBA 864x1152."""
    SS = 3; s = an['eye_chin'] / 183.0; ex, ey = an['eye_mid']; ox, oy = off
    def M(p): return ((ex + ox + (p[0] - 384) * s) * SS, (ey + oy + (p[1] - 372) * s) * SS)
    mask = Image.new('L', (W * SS, H * SS), 0); d = ImageDraw.Draw(mask)
    ticks = []
    def stroke(pts, w):
        P = [M(q) for q in pts]
        taper = np.sin(np.linspace(0.15, np.pi - 0.15, len(P)))
        for k in range(len(P) - 1):
            d.line([P[k], P[k + 1]], fill=255, width=max(1, int(w * 1.7 * s * (0.55 + 0.45 * taper[k]) * SS)))
        for k in range(3, len(pts) - 2, 4):
            a = np.array(pts[k + 1]) - np.array(pts[k - 1]); a = a / (np.linalg.norm(a) + 1e-6); nn = np.array([-a[1], a[0]])
            ticks.append((M(np.array(pts[k]) - nn * 4.5), M(np.array(pts[k]) + nn * 4.5)))
    if name == 'wange': stroke(curve((312, 404), (338, 478), -6), 4.4)
    elif name == 'braue': stroke(curve((452, 312), (440, 352), 3), 4.0)
    elif name == 'kiefer':
        rng = np.random.RandomState(5); cx, cy = 430, 514; poly = []
        for q in range(26):
            a = q / 26 * 2 * np.pi; r = 1 + .22 * np.sin(a * 3 + 1) + rng.uniform(-.08, .08)
            poly.append(M((cx + np.cos(a) * 10 * r, cy + np.sin(a) * 16 * r)))
        d.polygon(poly, fill=90); stroke(curve((424, 482), (418, 548), 4), 3.4)
    ridge = np.asarray(mask.filter(ImageFilter.GaussianBlur(1.1 * SS)), np.float32) / 255
    wide = np.asarray(mask.filter(ImageFilter.GaussianBlur(2.6 * SS)), np.float32) / 255
    gy, gx = np.gradient(ridge); light = -(gx + gy) * 14 * SS            # light from upper left: + lit slope, - shadow slope
    hl = np.clip(light, 0, 1); sh = np.clip(-light, 0, 1)
    core = np.clip(ridge * 2.6, 0, 1)
    out = np.zeros((H * SS, W * SS, 4), np.float32)
    def over(col, a):
        nonlocal out
        a = np.clip(a, 0, 1)[..., None]; c = np.array(col, np.float32)
        oa = out[..., 3:4]; na = a + oa * (1 - a)
        out[..., :3] = np.where(na > 0, (c * a + out[..., :3] * oa * (1 - a)) / np.maximum(na, 1e-6), 0); out[..., 3:4] = na
    over((92, 48, 40), wide * 0.55 * (1 - core * 0.4))        # soft dark groove around the ridge
    over((150, 84, 72), core * 0.55)                          # rosy scar tissue
    over((228, 178, 156), hl * 0.5 * (core > 0.05))         # specular lit edge
    over((60, 26, 20), sh * 0.55 * (core > 0.05))             # shadowed edge
    out[..., 3] *= 255; im = Image.fromarray((np.clip(out, 0, 255)).astype(np.uint8), 'RGBA')
    d2 = ImageDraw.Draw(im)
    for a, b in ticks: d2.line([a, b], fill=(84, 44, 38, 110), width=max(1, int(1.2 * SS)))
    return im.filter(ImageFilter.GaussianBlur(0.4 * SS)).resize((W, H), Image.LANCZOS)

def export():
    man = dict(version=2, style='oil-chain', nation='rothain', canvas=[W, H],
               format='webp q90, opaque painting, flat dark canvas background; native generator resolution 864x1152 (3:4), no downscale',
               note='Each rank image is an edit of the previous rank (same pose/crop/light), landmark-aligned (single Lanczos resample) to the Faehnrich master (eyes/chin). Scars are separate alpha layers per person, same canvas size, z_order painting+scars.',
               z_order=['painting', 'scars'], headgear='none', rank_ids=[r[0] for r in RANKS], ranks=[dict(id=r[0], name=r[1], approx_age=r[2]) for r in RANKS], uniforms={})
    for u, un in UNI.items():
        man['uniforms'][un] = dict(persons={})
        for p in PERSONS:
            if not have(u, p): continue
            d = f'{OUT}/rothain/{un}/{p}'; os.makedirs(d + '/scars', exist_ok=True)
            for i in range(16):
                Image.open(f'{adir(u, p)}/{fname(i)}.jpg').convert('RGB').save(f'{d}/{fname(i)}.webp', quality=90, method=6)
            an = anchors(u, p); offs = {}
            for k in SCAR_OFF:
                o = PERSON_OFF.get((u, p, k), (0, 0)); offs[k] = [round(SCAR_OFF[k][0] + o[0], 1), round(SCAR_OFF[k][1] + o[1], 1)]
                render_scar(k, an, offs[k]).save(f'{d}/scars/{k}.webp', quality=95, method=6)
            man['uniforms'][un]['persons'][p] = dict(
                files=[f'rothain/{un}/{p}/{fname(i)}.webp' for i in range(16)],
                anchors=dict(eye_mid=[round(v, 1) for v in an['eye_mid']], chin_y=round(an['chin_y'], 1), eye_chin=round(an['eye_chin'], 1)),
                scars={k: dict(file=f'rothain/{un}/{p}/scars/{k}.webp', offset_px=offs[k]) for k in SCAR_OFF}, scar_mode='multi (freely combinable)')
            print('exported', u, p)
    json.dump(man, open(f'{OUT}/manifest.json', 'w'), indent=1, ensure_ascii=False)

def compose(un, p, i, scars=()):
    im = Image.open(f'{OUT}/rothain/{un}/{p}/{fname(i)}.webp').convert('RGBA')
    for s in scars: im.alpha_composite(Image.open(f'{OUT}/rothain/{un}/{p}/scars/{s}.webp').convert('RGBA'))
    return im.convert('RGB')

def sheet(path, items, cols=4, tw=324):
    th = int(tw * H / W); f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 15)
    rows = (len(items) + cols - 1) // cols; sh = Image.new('RGB', (cols * tw, rows * (th + 22)), (30, 30, 34)); dr = ImageDraw.Draw(sh)
    for n, (un, p, i, scars, label) in enumerate(items):
        x, y = (n % cols) * tw, (n // cols) * (th + 22)
        sh.paste(compose(un, p, i, scars).resize((tw, th), Image.LANCZOS), (x, y + 22)); dr.text((x + 6, y + 3), label, fill=(235, 235, 235), font=f)
    sh.save(path, quality=90); print('wrote', path, sh.size)

def sheets():
    for u, un in UNI.items():
        for p in PERSONS:
            if not have(u, p): continue
            tag = f'{un}_{p}'
            sheet(f'{SHEETS}/kette_rothain_{tag}.jpg', [(un, p, i, (), f'{p} {un} · {i+1:02d} {RANKS[i][1]} (~{RANKS[i][2]})') for i in range(16)])
            var = [(0, ('wange',)), (4, ('braue',)), (8, ('wange', 'braue')), (12, ('kiefer',)), (7, ('wange', 'kiefer')), (10, ('braue', 'kiefer')), (15, ('wange', 'braue', 'kiefer')), (2, ('wange', 'braue', 'kiefer'))]
            sheet(f'{SHEETS}/kette_rothain_{tag}_narben.jpg', [(un, p, i, sc, f'{p} · {i+1:02d} {RANKS[i][1]} · {"+".join(sc)}') for i, sc in var])
    items = [(UNI[u], p, i, (), f'{p} {UNI[u]} · {RANKS[i][1]}') for u in UNI for p in PERSONS if have(u, p) for i in (0, 8, 15)]
    sheet(f'{SHEETS}/kette_rothain_uebersicht.jpg', items, cols=6, tw=240)

def detail():
    old = Image.open('/workspace/t325-portraits/oel/kette/aligned/09_oberst.jpg').convert('RGB')      # old m1 (864x1152 raw, downscaled in export)
    new = Image.open(f'{WORK}/rock/m1/aligned/09_oberst.jpg').convert('RGB')
    old2 = Image.open('/workspace/t325-portraits/oel/kette/aligned/16_generalfeldmarschall.jpg').convert('RGB')
    new2 = Image.open(f'{WORK}/rock/m1/aligned/16_generalfeldmarschall.jpg').convert('RGB')
    box = (230, 150, 630, 550); box2 = (0, 400, 400, 800)
    out = Image.new('RGB', (1600 + 30, 800 + 10), (20, 20, 20)); f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 16)
    dr = ImageDraw.Draw(out)
    for n, (im, b, lab) in enumerate([(old, box, 'ALT (Phase 3) Gesicht 100%'), (new, box, 'NEU Gesicht 100%'), (old, box2, 'ALT Uniform 100%'), (new, box2, 'NEU Uniform 100%')]):
        x, y = (n % 4) * 405, 0
        out.paste(im.crop(b), (x, 24)); dr.text((x + 4, 3), lab, fill=(255, 255, 255), font=f)
    # second row: rank 16
    for n, (im, b, lab) in enumerate([(old2, (0, 400, 400, 800), 'ALT R16 Epaulette 100%'), (new2, (0, 400, 400, 800), 'NEU R16 Epaulette 100%'), (old2, (230, 150, 630, 550), 'ALT R16 Gesicht'), (new2, (230, 150, 630, 550), 'NEU R16 Gesicht')]):
        x, y = (n % 4) * 405, 420
        out.paste(im.crop(b), (x, y + 24)); dr.text((x + 4, y + 3), lab, fill=(255, 255, 255), font=f)
    out.save(f'{SHEETS}/detail_vergleich_alt_neu.jpg', quality=93); print('wrote detail')

if __name__ == '__main__':
    {'export': export, 'sheets': sheets, 'detail': detail}[sys.argv[1]]()
