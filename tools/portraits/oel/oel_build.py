#!/usr/bin/env python3
"""Rothain oil-painting layer set: aligned AI heads, coats, caps (+ painted procedural insignia).
Run: /workspace/t325venv/bin/python tools/portraits/oel/oel_build.py [heads|coats|caps|all]
"""
import sys, os, glob, json
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE); sys.path.insert(0, os.path.dirname(HERE))
from oelkit import *
from scipy import ndimage as ndi
from PIL import ImageFilter

RAW = os.environ.get('OEL_RAW', os.path.join(HERE, 'raw_rothain'))
OUT = os.environ.get('OEL_OUT', '/workspace/t325-portraits/oel/work/layers')
SHIRT = (52, 19, 25)   # undertunic / neck fade colour

# ------------------------------------------------------------------ coats
COATS = {
    # raw reference point (tip/collar line centre) -> canvas point, scale
    'rock': dict(file='uni_rock3', c=0.82, ref=(428, 336), to=(384, 548)),
    'gala': dict(file='uni_gala3', c=0.88, ref=(428, 330), to=(384, 552)),
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
        back_a = cv2.GaussianBlur(cv2.dilate(hole, np.ones((5, 5), np.uint8)), (0, 0), 1.2)
        back = to_rgba(np.zeros_like(rgb2), back_a)
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
    bw = warp_rgba(back, A)
    if shirt_collar:
        bw = make_tunic(bw[..., 3])
    return fw, bw, A

def draw_shirt_collar():
    """Dark-crimson stand collar of the under-tunic (sits at the neck base, under the fur coat)."""
    from PIL import ImageDraw
    S2 = 2
    im = Image.new('RGBA', (W * S2, H * S2), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    cx, hw, y0, th = 384, 78, 556, 32
    xs = np.linspace(cx - hw, cx + hw, 70)
    f = lambda x: 13 * (1 - ((x - cx) / hw) ** 2)
    up = [(x * S2, (y0 + f(x)) * S2) for x in xs]
    lo = [(x * S2, (y0 + th + f(x)) * S2) for x in xs[::-1]]
    d.polygon(up + lo, fill=(66, 22, 29, 255))
    d.line(up, fill=(176, 176, 186, 255), width=2 * S2)                       # silver piping
    d.line([(x, y + 6 * S2) for x, y in up], fill=(36, 12, 16, 255), width=2 * S2)  # shadow under piping
    return np.asarray(im.resize((W, H), Image.LANCZOS))

def make_tunic(mask):
    """Under-tunic filling the open V of the coat: crimson wool, edge shadow, placket with buttons."""
    from PIL import ImageDraw
    m = mask.astype(np.float32) / 255
    yy, xx = np.mgrid[0:H, 0:W]
    dist = ndi.distance_transform_edt(m > 0.5)
    base = np.array([68, 22, 29], np.float32)
    shade = 1 - 0.45 * np.exp(-dist / 16.0)
    shade *= 1 - 0.30 * np.clip(np.abs(xx - 384) / 95.0, 0, 1) ** 1.6
    rgb = base[None, None, :] * shade[..., None]
    S2 = 2
    im = Image.new('RGBA', (W * S2, H * S2), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.line([(384 * S2, 585 * S2), (384 * S2, H * S2)], fill=(30, 10, 14, 255), width=2 * S2)
    for k in range(7):
        y = 636 + 58 * k
        r = 8
        d.ellipse([(384 - r + 2) * S2, (y - r + 3) * S2, (384 + r + 2) * S2, (y + r + 3) * S2], fill=(0, 0, 0, 110))
        d.ellipse([(384 - r) * S2, (y - r) * S2, (384 + r) * S2, (y + r) * S2], fill=(168, 168, 178, 255), outline=(60, 60, 68, 255), width=S2)
        d.ellipse([(384 - r * .55) * S2, (y - r * .65) * S2, (384 - r * .05) * S2, (y - r * .1) * S2], fill=(228, 228, 236, 255))
    btn = np.asarray(im.resize((W, H), Image.LANCZOS)).astype(np.float32)
    ba = btn[..., 3:4] / 255
    rgb = rgb * (1 - ba) + btn[..., :3] * ba
    out = paint(np.dstack([rgb, m * 255]).astype(np.uint8), seed=21, amount=0.9, shade_edge=False)
    out[..., 3] = (m * 255).astype(np.uint8)
    return out

# ------------------------------------------------------------------ heads
HEAD_NAMES = [f'{p}_{a}' for p in ('m1', 'm2', 'f1') for a in ('jung', 'reif', 'alt', 'greis')]

def _smooth(t):
    t = np.clip(t, 0, 1); return t * t * (3 - 2 * t)

def neck_fix(h):
    """Anatomical neck: squeeze below the jaw so it fits the collar opening, shade it under the jaw."""
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    f = 1 - 0.25 * _smooth((yy - (CHIN_Y - 8)) / 60.0)
    srcx = (384 + (xx - 384) / f).astype(np.float32)
    pm = h.astype(np.float32); pm[..., :3] *= pm[..., 3:4] / 255
    o = cv2.remap(pm, srcx, yy, cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0, 0))
    a = o[..., 3:4]
    o[..., :3] = np.where(a > 1, o[..., :3] / np.maximum(a / 255, 1e-3), 0)
    # jaw shadow on the neck
    dx = np.abs(xx - 384)
    ys = CHIN_Y - 4 - 40 * _smooth((dx - 28) / 40.0)
    sh = 1 - 0.46 * _smooth((yy - ys) / 36.0) * (yy > ys)
    o[..., :3] *= sh[..., None]
    return np.clip(o, 0, 255).astype(np.uint8)

def build_head(n, cut=600):
    rgb = load(f'{RAW}/{n}.jpg')
    lm = landmarks(rgb.astype(np.uint8))
    A, s, ang = align_matrix(lm)
    rgb2, a = key(rgb)
    h = warp_rgba(to_rgba(rgb2, a), A)
    h = neck_fix(h)
    h = extend_neck(h, SHIRT, run=16, grow=0.0, y0=cut + 10)
    yy, xx = np.mgrid[0:H, 0:W]
    hw = np.where(yy < 580, 999, 76 - np.clip(yy - 580, 0, 30) * 0.1)
    h[..., 3] = np.where(np.abs(xx - 384) > hw, 0, h[..., 3])
    return h, dict(scale=float(s), roll=float(np.degrees(ang)))

# ------------------------------------------------------------------ caps
CAPS = {
    'schirm': dict(file='cap_schirm', c=0.60, cy=0.40, cx=514, bottom=322),
    'zweit': dict(file='cap_zweit', c=0.47, cy=0.31, cx=514, bottom=306),
    'parade': dict(file='cap_parade', c=0.60, cy=0.40, cx=517, bottom=322),
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
    """Natural scars in the v2 face frame (eye y372, chin y555): rosy-brown ridge, dark edge, stitch ticks."""
    from PIL import ImageDraw
    SS = 3
    def canvas():
        im = Image.new('RGBA', (W * SS, H * SS), (0, 0, 0, 0)); return im, ImageDraw.Draw(im)
    def curve(p0, p1, bow, n=28):
        p0, p1 = np.array(p0, float), np.array(p1, float)
        t = np.linspace(0, 1, n)[:, None]
        d = p1 - p0; nrm = np.array([-d[1], d[0]]) / (np.linalg.norm(d) + 1e-6)
        pts = p0 + d * t + nrm * bow * np.sin(np.pi * t)
        return pts
    def stroke(d, pts, w, edge=(112, 62, 52), core=(176, 112, 94), hl=(214, 160, 138), ticks=True, tickw=7):
        P = [tuple(q * SS) for q in pts]
        d.line(P, fill=edge + (120,), width=int((w + 3.2) * SS), joint='curve')
        d.line(P, fill=core + (215,), width=int(w * SS), joint='curve')
        d.line([(x - SS * .8, y - SS * .8) for x, y in P], fill=hl + (120,), width=max(1, int(w * .35 * SS)), joint='curve')
        if ticks:
            for k in range(2, len(pts) - 1, 3):
                a = pts[k + 1] - pts[k - 1]; a = a / (np.linalg.norm(a) + 1e-6); nn = np.array([-a[1], a[0]])
                c = pts[k]
                d.line([tuple((c - nn * tickw / 2) * SS), tuple((c + nn * tickw / 2) * SS)], fill=(96, 52, 44, 150), width=max(1, int(1.1 * SS)))
    out = {}
    # wange: viewer-left cheek, cheekbone -> mouth corner
    im, d = canvas(); stroke(d, curve((312, 404), (338, 478), -6), 4.2); out['wange'] = im
    # braue: viewer-right brow, cut through the brow only (stops above the lid)
    im, d = canvas(); stroke(d, curve((452, 312), (440, 352), 3), 3.8, tickw=6); out['braue'] = im
    # kiefer: burn / shrapnel scarring on the viewer-right jaw
    im, d = canvas(); rng = np.random.RandomState(5)
    cx, cy = 430, 514
    poly = []
    for q in range(26):
        a = q / 26 * 2 * np.pi
        r = 1 + .22 * np.sin(a * 3 + 1) + rng.uniform(-.08, .08)
        poly.append(((cx + np.cos(a) * 17 * r) * SS, (cy + np.sin(a) * 27 * r) * SS))
    d.polygon(poly, fill=(150, 92, 78, 110))
    d.polygon([(x * .62 + cx * SS * .38, y * .62 + cy * SS * .38) for x, y in poly], fill=(176, 112, 96, 120))
    stroke(d, curve((424, 482), (418, 548), 4), 3.2, ticks=False); out['kiefer'] = im
    res = {}
    for k, im in out.items():
        im = im.filter(ImageFilter.GaussianBlur(0.7 * SS / 2)).resize((W, H), Image.LANCZOS)
        res[k] = paint(np.asarray(im), seed=300, amount=0.5, shade_edge=False)
    return res

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
