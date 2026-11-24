#!/usr/bin/env python3
"""v2 oil chains: aligned 864x1152 paintings -> webp, per-person scar layers (plastic), manifest, sheets.

Nation-aware. Env:
  CHAIN2_NATION  rothain (default) | karsk | averon | ossaria | sahr | ...
  CHAIN2_WORK    work root (default depends on nation)
  CHAIN2_OUT     export root (default .../oel_ketten)
  CHAIN2_SHEETS  sheet dir (default /workspace/t325-portraits/oel)

Work dir: <WORK>/<uni_key>/<m1|m2|f1|f2>/{raw,aligned} and muetzen/<typ>/{raw,aligned}
Export:   <OUT>/<nation>/<uni_name>/<person>/NN_rank.webp + scars/ + muetzen/<typ>/
Manifest: rothain keeps legacy <OUT>/manifest.json; other nations write <OUT>/<nation>/manifest.json

Usage: chain2_build.py export | sheets | detail
"""
import sys, os, json
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

NATION = os.environ.get('CHAIN2_NATION', 'rothain')
UNI_BY_NATION = {
    'rothain': {'rock': 'dienstrock', 'gala': 'gala'},
    'karsk':   {'panzer': 'panzer', 'tech': 'tech'},
    'averon':  {'feld': 'feld', 'dienst': 'dienst'},
    'ossaria': {'platte': 'platte', 'klage': 'klage'},
    'sahr':    {'wickel': 'wickel', 'offen': 'offen'},
}
WORK_DEFAULT = {
    'rothain': '/workspace/t325-portraits/oel/v2',
    'karsk':   '/workspace/t325-portraits/oel/v2_karsk',
    'averon':  '/workspace/t325-portraits/oel/v2_averon',
    'ossaria': '/workspace/t325-portraits/oel/v2_ossaria',
    'sahr':    '/workspace/t325-portraits/oel/v2_sahr',
}
UNI = UNI_BY_NATION[NATION]
WORK = os.environ.get('CHAIN2_WORK', WORK_DEFAULT.get(NATION, '/workspace/t325-portraits/oel/v2'))
OUT = os.environ.get('CHAIN2_OUT', os.path.join(HERE, '..', '..', '..', 'Division_Command', 'web', 'assets', 'portraits', 'oel_ketten'))
SHEETS = os.environ.get('CHAIN2_SHEETS', '/workspace/t325-portraits/oel')
W, H = 864, 1152
PERSONS = ['m1', 'm2', 'f1', 'f2']
SECOND_CAP_BY_NATION = {
    'rothain': 'feldmuetze', 'karsk': 'barett', 'averon': 'feldmuetze',
    'ossaria': 'feldmuetze', 'sahr': 'feldmuetze',
}
def cap_types():
    return ['schirmmuetze', SECOND_CAP_BY_NATION.get(NATION, 'feldmuetze')]

RANKS_ROTHAIN = [
    ('faehnrich', 'Fähnrich', 19), ('oberfaehnrich', 'Oberfähnrich', 21), ('leutnant', 'Leutnant', 23), ('oberleutnant', 'Oberleutnant', 26),
    ('hauptmann', 'Hauptmann', 30), ('stabshauptmann', 'Stabshauptmann', 34), ('major', 'Major', 38), ('oberstleutnant', 'Oberstleutnant', 42),
    ('oberst', 'Oberst', 46), ('brigadegeneral', 'Brigadegeneral', 50), ('generalmajor', 'Generalmajor', 53), ('generalleutnant', 'Generalleutnant', 56),
    ('general', 'General', 60), ('generaloberst', 'Generaloberst', 63), ('feldmarschall', 'Feldmarschall', 67), ('generalfeldmarschall', 'Generalfeldmarschall', 70),
]
# Karsk chronological ages from Raenge.md (they often LOOK younger due to Körper-optimization)
RANKS_KARSK = [
    ('faehnrich', 'Fähnrich', 19), ('oberfaehnrich', 'Oberfähnrich', 22), ('leutnant', 'Leutnant', 24), ('oberleutnant', 'Oberleutnant', 29),
    ('hauptmann', 'Hauptmann', 35), ('stabshauptmann', 'Stabshauptmann', 39), ('major', 'Major', 41), ('oberstleutnant', 'Oberstleutnant', 47),
    ('oberst', 'Oberst', 53), ('brigadegeneral', 'Brigadegeneral', 59), ('generalmajor', 'Generalmajor', 65), ('generalleutnant', 'Generalleutnant', 71),
    ('general', 'General', 77), ('generaloberst', 'Generaloberst', 82), ('feldmarschall', 'Feldmarschall', 86), ('generalfeldmarschall', 'Generalfeldmarschall', 92),
]
# Averon chronological ages from Raenge.md midpoints; faces MUST look their age (Bindung Zeit; GFM alt aber wachsam)
RANKS_AVERON = [
    ('faehnrich', 'Fähnrich', 19), ('oberfaehnrich', 'Oberfähnrich', 22), ('leutnant', 'Leutnant', 24), ('oberleutnant', 'Oberleutnant', 29),
    ('hauptmann', 'Hauptmann', 35), ('stabshauptmann', 'Stabshauptmann', 39), ('major', 'Major', 41), ('oberstleutnant', 'Oberstleutnant', 47),
    ('oberst', 'Oberst', 53), ('brigadegeneral', 'Brigadegeneral', 59), ('generalmajor', 'Generalmajor', 65), ('generalleutnant', 'Generalleutnant', 71),
    ('general', 'General', 77), ('generaloberst', 'Generaloberst', 82), ('feldmarschall', 'Feldmarschall', 86), ('generalfeldmarschall', 'Generalfeldmarschall', 92),
]
# Ossaria chronological midpoints from Raenge.md (Bindung Tote; GFM alt und von den Toten gezeichnet)
RANKS_OSSARIA = list(RANKS_AVERON)
# Sahr midpoints from Raenge.md (Bindung Fluss; GFM alt, Ausdruck fließend, nicht gebrechlich)
RANKS_SAHR = list(RANKS_AVERON)
RANKS = {'rothain': RANKS_ROTHAIN, 'karsk': RANKS_KARSK, 'averon': RANKS_AVERON, 'ossaria': RANKS_OSSARIA, 'sahr': RANKS_SAHR}.get(NATION, RANKS_ROTHAIN)

# Short forms so sheet captions fit in a 324px cell (Bold 15).
RANK_SHORT = {
    'Fähnrich': 'Fähnr.', 'Oberfähnrich': 'OFähnr.', 'Leutnant': 'Lt.', 'Oberleutnant': 'OLt.',
    'Hauptmann': 'Hptm.', 'Stabshauptmann': 'StHptm.', 'Major': 'Maj.', 'Oberstleutnant': 'Obstlt.',
    'Oberst': 'Obst.', 'Brigadegeneral': 'BrigGen.', 'Generalmajor': 'GenMaj.',
    'Generalleutnant': 'GenLt.', 'General': 'Gen.', 'Generaloberst': 'GenObst.',
    'Feldmarschall': 'FM', 'Generalfeldmarschall': 'GFM',
}
def rank_short(i):
    name, age = RANKS[i][1], RANKS[i][2]
    return RANK_SHORT.get(name, name), age

SCAR_OFF = {'wange': (-9, -13), 'braue': (0, 5), 'kiefer': (14, -10)}
PERSON_OFF = {}

def fname(i): return f'{i+1:02d}_{RANKS[i][0]}'
def adir(u, p): return f'{WORK}/{u}/{p}/aligned'
def cdir(u, p, typ): return f'{WORK}/{u}/{p}/muetzen/{typ}/aligned'
def have(u, p): return os.path.isdir(adir(u, p)) and len([f for f in os.listdir(adir(u, p)) if f[:2].isdigit()]) == 16
def cap_src(u, p, typ, i):
    d = cdir(u, p, typ); base = fname(i)
    for ext in ('.png', '.webp', '.jpg'):
        path = f'{d}/{base}{ext}'
        if os.path.exists(path): return path
    return None
def have_caps(u, p, typ):
    return os.path.isdir(cdir(u, p, typ)) and all(cap_src(u, p, typ, i) for i in range(16))
def man_path():
    if NATION == 'rothain':
        return f'{OUT}/manifest.json'
    return f'{OUT}/{NATION}/manifest.json'

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
    gy, gx = np.gradient(ridge); light = -(gx + gy) * 14 * SS
    hl = np.clip(light, 0, 1); sh = np.clip(-light, 0, 1)
    core = np.clip(ridge * 2.6, 0, 1)
    out = np.zeros((H * SS, W * SS, 4), np.float32)
    def over(col, a):
        nonlocal out
        a = np.clip(a, 0, 1)[..., None]; c = np.array(col, np.float32)
        oa = out[..., 3:4]; na = a + oa * (1 - a)
        out[..., :3] = np.where(na > 0, (c * a + out[..., :3] * oa * (1 - a)) / np.maximum(na, 1e-6), 0); out[..., 3:4] = na
    over((92, 48, 40), wide * 0.55 * (1 - core * 0.4))
    over((150, 84, 72), core * 0.55)
    over((228, 178, 156), hl * 0.5 * (core > 0.05))
    over((60, 26, 20), sh * 0.55 * (core > 0.05))
    out[..., 3] *= 255; im = Image.fromarray((np.clip(out, 0, 255)).astype(np.uint8), 'RGBA')
    d2 = ImageDraw.Draw(im)
    for a, b in ticks: d2.line([a, b], fill=(84, 44, 38, 110), width=max(1, int(1.2 * SS)))
    return im.filter(ImageFilter.GaussianBlur(0.4 * SS)).resize((W, H), Image.LANCZOS)

def export():
    man = dict(version=2, style='oil-chain', nation=NATION, canvas=[W, H],
               format='webp q90, opaque painting, flat dark canvas background; native generator resolution 864x1152 (3:4), no downscale',
               note='Each rank image is an edit of the previous rank (same pose/crop/light), landmark-aligned (single Lanczos resample) to the Faehnrich master (eyes/chin). Scars and headgear are separate alpha layers, same canvas size. z_order: painting, scars, at most one cap.',
               z_order=['painting', 'scars', 'muetzen'], rank_ids=[r[0] for r in RANKS], ranks=[dict(id=r[0], name=r[1], approx_age=r[2]) for r in RANKS], uniforms={})
    types = cap_types()
    any_caps = any(have(u, p) and any(have_caps(u, p, typ) for typ in types) for u in UNI for p in PERSONS)
    man['headgear'] = 'layers' if any_caps else 'none'
    man['headgear_types'] = types if any_caps else []
    if any_caps:
        man['headgear_note'] = 'Base portraits are bareheaded. Caps are per-rank RGBA layers (Schirmmuetze + national second cap), fit-checked on each base; redrawn per portrait if they do not sit correctly.'
    for u, un in UNI.items():
        man['uniforms'][un] = dict(persons={})
        for p in PERSONS:
            if not have(u, p): continue
            d = f'{OUT}/{NATION}/{un}/{p}'; os.makedirs(d + '/scars', exist_ok=True)
            for i in range(16):
                Image.open(f'{adir(u, p)}/{fname(i)}.jpg').convert('RGB').save(f'{d}/{fname(i)}.webp', quality=90, method=6)
            an = anchors(u, p); offs = {}
            for k in SCAR_OFF:
                o = PERSON_OFF.get((u, p, k), (0, 0)); offs[k] = [round(SCAR_OFF[k][0] + o[0], 1), round(SCAR_OFF[k][1] + o[1], 1)]
                render_scar(k, an, offs[k]).save(f'{d}/scars/{k}.webp', quality=95, method=6)
            rec = dict(
                files=[f'{NATION}/{un}/{p}/{fname(i)}.webp' for i in range(16)],
                anchors=dict(eye_mid=[round(v, 1) for v in an['eye_mid']], chin_y=round(an['chin_y'], 1), eye_chin=round(an['eye_chin'], 1)),
                scars={k: dict(file=f'{NATION}/{un}/{p}/scars/{k}.webp', offset_px=offs[k]) for k in SCAR_OFF}, scar_mode='multi (freely combinable)')
            muetzen = {}
            for typ in cap_types():
                if not have_caps(u, p, typ): continue
                od = f'{d}/muetzen/{typ}'; os.makedirs(od, exist_ok=True)
                for i in range(16):
                    Image.open(cap_src(u, p, typ, i)).convert('RGBA').save(f'{od}/{fname(i)}.webp', quality=95, method=6)
                muetzen[typ] = dict(files=[f'{NATION}/{un}/{p}/muetzen/{typ}/{fname(i)}.webp' for i in range(16)])
            if muetzen:
                rec['muetzen'] = muetzen
            man['uniforms'][un]['persons'][p] = rec
            print('exported', NATION, u, p, 'caps' if muetzen else 'no-caps')
    path = man_path()
    os.makedirs(os.path.dirname(path), exist_ok=True)
    json.dump(man, open(path, 'w'), indent=1, ensure_ascii=False)
    print('wrote', path)

def compose(un, p, i, scars=(), cap=None):
    im = Image.open(f'{OUT}/{NATION}/{un}/{p}/{fname(i)}.webp').convert('RGBA')
    for s in scars: im.alpha_composite(Image.open(f'{OUT}/{NATION}/{un}/{p}/scars/{s}.webp').convert('RGBA'))
    if cap:
        cpath = f'{OUT}/{NATION}/{un}/{p}/muetzen/{cap}/{fname(i)}.webp'
        if os.path.exists(cpath):
            im.alpha_composite(Image.open(cpath).convert('RGBA'))
    return im.convert('RGB')

def sheet(path, items, cols=4, tw=324):
    th = int(tw * H / W); f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 14)
    rows = (len(items) + cols - 1) // cols; sh = Image.new('RGB', (cols * tw, rows * (th + 22)), (30, 30, 34)); dr = ImageDraw.Draw(sh)
    for n, item in enumerate(items):
        un, p, i, scars, label = item[:5]
        cap = item[5] if len(item) > 5 else None
        x, y = (n % cols) * tw, (n // cols) * (th + 22)
        sh.paste(compose(un, p, i, scars, cap=cap).resize((tw, th), Image.LANCZOS), (x, y + 22))
        # shrink or ellipsize if a caption would still run into the next cell
        font, lab = f, label
        while font.size >= 11 and font.getbbox(lab)[2] > tw - 10:
            font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', font.size - 1)
        while font.getbbox(lab)[2] > tw - 10 and len(lab) > 4:
            lab = lab[:-2].rstrip(' ·.,') + '…'
        dr.text((x + 6, y + 3), lab, fill=(235, 235, 235), font=font)
    sh.save(path, quality=90); print('wrote', path, sh.size)

def sheets():
    for u, un in UNI.items():
        for p in PERSONS:
            if not have(u, p): continue
            tag = f'{un}_{p}'
            sheet(f'{SHEETS}/kette_{NATION}_{tag}.jpg', [(un, p, i, (), f'{p} {un} · {i+1:02d} {rank_short(i)[0]} (~{rank_short(i)[1]})') for i in range(16)])
            var = [(0, ('wange',)), (4, ('braue',)), (8, ('wange', 'braue')), (12, ('kiefer',)), (7, ('wange', 'kiefer')), (10, ('braue', 'kiefer')), (15, ('wange', 'braue', 'kiefer')), (2, ('wange', 'braue', 'kiefer'))]
            sheet(f'{SHEETS}/kette_{NATION}_{tag}_narben.jpg', [(un, p, i, sc, f'{p} · {i+1:02d} {rank_short(i)[0]} · {"+".join(sc)}') for i, sc in var])
            for typ in cap_types():
                if not have_caps(u, p, typ): continue
                sheet(f'{SHEETS}/kette_{NATION}_{tag}_{typ}.jpg', [(un, p, i, (), f'{p} {un} {typ} · {i+1:02d} {rank_short(i)[0]} (~{rank_short(i)[1]})', typ) for i in range(16)])
    items = [(UNI[u], p, i, (), f'{p} {UNI[u]} · {rank_short(i)[0]}') for u in UNI for p in PERSONS if have(u, p) for i in (0, 8, 15)]
    if items:
        cols = 6 if len(items) >= 6 else max(3, len(items))
        sheet(f'{SHEETS}/kette_{NATION}_uebersicht.jpg', items, cols=cols, tw=240)
    cap_items = [(UNI[u], p, i, (), f'{p} {UNI[u]} {typ} · {rank_short(i)[0]}', typ) for u in UNI for p in PERSONS for typ in cap_types() if have(u, p) and have_caps(u, p, typ) for i in (0, 8, 15)]
    if cap_items:
        cols = 6 if len(cap_items) >= 6 else max(3, len(cap_items))
        sheet(f'{SHEETS}/kette_{NATION}_uebersicht_muetzen.jpg', cap_items, cols=cols, tw=240)

def detail():
    if NATION != 'rothain':
        print('detail is Rothain-only, skip'); return
    old = Image.open('/workspace/t325-portraits/oel/kette/aligned/09_oberst.jpg').convert('RGB')
    new = Image.open(f'{WORK}/rock/m1/aligned/09_oberst.jpg').convert('RGB')
    old2 = Image.open('/workspace/t325-portraits/oel/kette/aligned/16_generalfeldmarschall.jpg').convert('RGB')
    new2 = Image.open(f'{WORK}/rock/m1/aligned/16_generalfeldmarschall.jpg').convert('RGB')
    box = (230, 150, 630, 550); box2 = (0, 400, 400, 800)
    out = Image.new('RGB', (1600 + 30, 800 + 10), (20, 20, 20)); f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 16)
    dr = ImageDraw.Draw(out)
    for n, (im, b, lab) in enumerate([(old, box, 'ALT (Phase 3) Gesicht 100%'), (new, box, 'NEU Gesicht 100%'), (old, box2, 'ALT Uniform 100%'), (new, box2, 'NEU Uniform 100%')]):
        x, y = (n % 4) * 405, 0
        out.paste(im.crop(b), (x, 24)); dr.text((x + 4, 3), lab, fill=(255, 255, 255), font=f)
    for n, (im, b, lab) in enumerate([(old2, (0, 400, 400, 800), 'ALT R16 Epaulette 100%'), (new2, (0, 400, 400, 800), 'NEU R16 Epaulette 100%'), (old2, (230, 150, 630, 550), 'ALT R16 Gesicht'), (new2, (230, 150, 630, 550), 'NEU R16 Gesicht')]):
        x, y = (n % 4) * 405, 420
        out.paste(im.crop(b), (x, y + 24)); dr.text((x + 4, y + 3), lab, fill=(255, 255, 255), font=f)
    out.save(f'{SHEETS}/detail_vergleich_alt_neu.jpg', quality=93); print('wrote detail')

if __name__ == '__main__':
    {'export': export, 'sheets': sheets, 'detail': detail}[sys.argv[1]]()
