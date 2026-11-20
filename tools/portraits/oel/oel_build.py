#!/usr/bin/env python3
"""Rothain oil-painting layer set: aligned AI heads, coats, caps (+ painted procedural insignia).
Run: /workspace/t325venv/bin/python tools/portraits/oel/oel_build.py [heads|coats|caps|all]
"""
import sys, os, glob, json
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE); sys.path.insert(0, os.path.dirname(HERE))
from oelkit import *
from scipy import ndimage as ndi

RAW = os.environ.get('OEL_RAW', os.path.join(HERE, 'raw_rothain'))
OUT = os.environ.get('OEL_OUT', '/workspace/t325-portraits/oel/work/layers')
SHIRT = (34, 26, 24)

# ------------------------------------------------------------------ coats
COATS = {
    # raw reference point (tip/collar line centre) -> canvas point, scale
    'rock': dict(file='uni_rock3', c=0.78, ref=(428, 336), to=(384, 560)),
    'gala': dict(file='uni_gala3', c=0.85, ref=(428, 330), to=(384, 556)),
}
GALA_HOLE = [(350, 290), (420, 284), (507, 290), (513, 308), (512, 323), (507, 337), (460, 355), (450, 367),
             (442, 397), (433, 410), (415, 410), (407, 373), (387, 353), (353, 337), (343, 323), (344, 308)]

def build_coat(name):
    p = COATS[name]
    rgb = load(f'{RAW}/{p["file"]}.jpg')
    _, a = key(rgb, strong=(name == 'rock'))
    if name == 'rock':
        rgb2, _ = key(fix_olive(rgb), strong=True)
    else:
        rgb2, _ = key(rgb)
    A = affine(p['c'], p['ref'][0], p['ref'][1], *p['to'])
    hole = np.zeros(a.shape, np.float32)
    if name == 'rock':
        # empty green region enclosed by the lapels (connected to the point below the tips), below the tips
        empty = a < 0.5
        lab, _ = ndi.label(empty)
        l0 = lab[560, 428]
        hole = (lab == l0).astype(np.float32)
        hole[:p['ref'][1] - 4] = 0
        hole[:, :336] = 0
        hole[:, 521:] = 0
        back_rgb = np.zeros_like(rgb2)
        back_rgb[:] = SHIRT
        back_a = cv2.GaussianBlur(cv2.dilate(hole, np.ones((5, 5), np.uint8)), (0, 0), 1.2)
        back = to_rgba(back_rgb, back_a)
        front = to_rgba(rgb2, a)
        shirt_collar = True
    else:
        shirt_collar = False
        hm = poly_mask(a.shape, GALA_HOLE, 1.2)
        back = to_rgba(rgb2, a * hm)
        front = to_rgba(rgb2, a * (1 - hm))
    fw = warp_rgba(front, A)
    if shirt_collar:
        band = paint(draw_shirt_collar(), seed=11, amount=0.8)
        base = band.copy()
        a_f = fw[..., 3:4] / 255.
        o = base.astype(np.float32)
        o[..., :3] = fw[..., :3] * a_f + o[..., :3] * (1 - a_f) * (o[..., 3:4] / 255.)
        o[..., 3] = np.maximum(fw[..., 3], base[..., 3])
        # un-premultiply where band shows
        mask = (fw[..., 3] < 255) & (base[..., 3] > 0)
        fw = np.where(mask[..., None], np.clip(o, 0, 255), fw).astype(np.uint8)
    return fw, warp_rgba(back, A), A

def draw_shirt_collar():
    from PIL import ImageDraw
    S2 = 2
    im = Image.new('RGBA', (W * S2, H * S2), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    cx, hw, y0, th = 384, 80, 584, 26
    xs = np.linspace(cx - hw, cx + hw, 60)
    up = [(x * S2, (y0 + 15 * (1 - ((x - cx) / hw) ** 2)) * S2) for x in xs]
    lo = [(x * S2, (y0 + th + 15 * (1 - ((x - cx) / hw) ** 2)) * S2) for x in xs[::-1]]
    d.polygon(up + lo, fill=(48, 42, 40, 255))
    d.line(up, fill=(74, 66, 60, 255), width=3 * S2)
    d.line([(x, y + 7 * S2) for x, y in up], fill=(30, 26, 24, 255), width=1 * S2)
    # shirt body below the band up into the V is the back layer
    return np.asarray(im.resize((W, H), Image.LANCZOS))

# ------------------------------------------------------------------ heads
HEAD_NAMES = [f'{p}_{a}' for p in ('m1', 'm2', 'f1') for a in ('jung', 'reif', 'alt', 'greis')]

def build_head(n, cut=585):
    rgb = load(f'{RAW}/{n}.jpg')
    lm = landmarks(rgb.astype(np.uint8))
    A, s, ang = align_matrix(lm)
    rgb2, a = key(rgb)
    h = warp_rgba(to_rgba(rgb2, a), A)
    h = extend_neck(h, SHIRT, run=34, y0=cut + 10)
    yy, xx = np.mgrid[0:H, 0:W]
    hw = np.where(yy < 566, 999, 80 - np.clip(yy - 566, 0, 30) * 0.2)
    h[..., 3] = np.where(np.abs(xx - 384) > hw, 0, h[..., 3])
    return h, dict(scale=float(s), roll=float(np.degrees(ang)))

# ------------------------------------------------------------------ caps
CAPS = {
    'schirm': dict(file='cap_schirm', c=0.49, cy=0.42, cx=514, bottom=352),
    'zweit': dict(file='cap_zweit', c=0.40, cy=0.36, cx=514, bottom=338),
    'parade': dict(file='cap_parade', c=0.49, cy=0.42, cx=517, bottom=352),
}

def build_cap(name):
    p = CAPS[name]
    rgb = load(f'{RAW}/{p["file"]}.jpg')
    rgb2, a = key(rgb, strong=True)
    ys, xs = np.where(a > .5)
    ry = ys.max()
    A = affine(p['c'], p['cx'], ry, 384, p['bottom'])
    A[1, 1] = p.get('cy', p['c']); A[1, 2] = p['bottom'] - ry * A[1, 1]
    return warp_rgba(to_rgba(rgb2, a), A)

def over(bg, fg):
    a = fg[..., 3:4] / 255.
    return bg * (1 - a) + fg[..., :3] * a

def save(arr, rel):
    path = os.path.join(OUT, rel)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    Image.fromarray(arr).save(path, quality=93, alpha_quality=100, method=4) if path.endswith('.webp') else Image.fromarray(arr).save(path)

def build_scars():
    import scars as sc
    out = {}
    for name in ('wange', 'braue', 'kiefer'):
        im = sc.render_scar(name)
        a = np.asarray(im.convert('RGBA')).copy()
        if name == 'wange':
            a = np.roll(a, 14, axis=1)
        if name == 'kiefer':
            m = Image.fromarray(a)
            k = 0.8; cx, cy = 417, 518
            m = m.transform(m.size, Image.AFFINE, (1 / k, 0, cx - cx / k, 0, 1 / k, cy - cy / k), resample=Image.BICUBIC)
            a = np.asarray(m).copy()
        # earthier, less saturated scar tissue, then painted
        rgb = a[..., :3].astype(np.float32)
        lum = rgb.mean(-1, keepdims=True) / 130.0
        rgb = np.array([150, 78, 56], np.float32) * np.clip(lum, 0.5, 1.3)
        a[..., :3] = np.clip(rgb, 0, 255).astype(np.uint8)
        al = cv2.dilate(a[..., 3], np.ones((3, 3), np.uint8)) if name != 'kiefer' else a[..., 3]
        a[..., 3] = np.clip(al.astype(np.float32) * 1.1, 0, 205).astype(np.uint8)
        out[name] = paint(a, seed=300, amount=0.7, shade_edge=False)
    return out

def build_insignia_all():
    import oel_insignia as oi
    from pcommon import RANKS
    for u in COATS:
        for i, r in enumerate(RANKS):
            save(np.asarray(oi.render_insignia(i, u).convert('RGBA')), f'rothain/insignia/{u}/{r[0]}.webp')
            save(np.asarray(oi.render_orders(i, u).convert('RGBA')), f'rothain/orders/{u}/{r[0]}.webp')

def write_manifest():
    src = json.load(open('/workspace/dc-t325/Division_Command/web/assets/portraits/layers/manifest.json'))
    nat = src['nations']['rothain']
    nat['files'] = {
        'face': '{n}/face/{person}_{age}.webp',
        'uniform_back': '{n}/uniform_back/{uniform}.webp',
        'uniform': '{n}/uniform/{uniform}.webp',
        'headgear': '{n}/headgear/{kind}.webp',
        'insignia': '{n}/insignia/{uniform}/{rank}.webp',
        'orders': '{n}/orders/{uniform}/{rank}.webp',
    }
    nat['style'] = 'oil'
    nat['uniforms'] = {k: dict(label=v['label']) for k, v in nat['uniforms'].items()}
    nat['uniforms']['rock']['collar'] = 'stand_fur'; nat['uniforms']['gala']['collar'] = 'stand'
    nat.pop('metals', None)
    src['nations'] = {'rothain': nat}
    src['z_order'] = ['uniform_back', 'face', 'uniform', 'hair', 'beard', 'scars', 'headgear', 'insignia', 'orders']
    src['z_note'] = 'Oil set: uniform_back (dark undershirt / inner collar wall) lies UNDER the face; hair is baked into the face (AI paintings), no separate hair/beard layer.'
    src['style'] = 'oil'
    for k, v in src['scars']['layers'].items():
        v['file'] = f'_common/scars/{k}.webp'
    json.dump(src, open(os.path.join(OUT, 'manifest.json'), 'w'), indent=1, ensure_ascii=False)

def main(what):
    meta = {}
    if what in ('heads', 'all'):
        for n in HEAD_NAMES:
            h, m = build_head(n); save(h, f'rothain/face/{n}.webp'); meta[n] = m
    if what in ('coats', 'all'):
        for u in COATS:
            f, b, _ = build_coat(u)
            save(f, f'rothain/uniform/{u}.webp'); save(b, f'rothain/uniform_back/{u}.webp')
    if what in ('caps', 'all'):
        for k in CAPS:
            save(build_cap(k), f'rothain/headgear/{k}.webp')
    if what in ('scars', 'all'):
        for k, v in build_scars().items():
            save(v, f'_common/scars/{k}.webp')
    if what in ('ins', 'all'):
        build_insignia_all()
    if what in ('all', 'manifest'):
        os.makedirs(OUT, exist_ok=True); write_manifest()
    json.dump(meta, open(os.path.join(OUT, 'head_meta.json'), 'w'), indent=1) if meta else None

if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'all')
