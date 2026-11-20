"""Nationssymbole als Maske (Lore: Insignien.md) + Metall-Rendering."""
from __future__ import annotations
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageChops
from pcommon import blur

N = 256  # Zeichenraster


def _ring(d, r, w, cx=128, cy=128, a0=None, a1=None, fill=255):
    box = [cx - r, cy - r, cx + r, cy + r]
    if a0 is None:
        d.ellipse(box, outline=fill, width=w)
    else:
        d.arc(box, a0, a1, fill=fill, width=w)


def _crown(d, cx, cy, s, fill=255):
    pts = [(-60, 40), (-60, -30), (-32, 4), (0, -50), (32, 4), (60, -30), (60, 40)]
    d.polygon([(cx + x * s, cy + y * s) for x, y in pts], fill=fill)
    d.rectangle([cx - 60 * s, cy + 46 * s, cx + 60 * s, cy + 62 * s], fill=fill)
    for x, y in [(-60, -30), (0, -50), (60, -30)]:
        d.ellipse([cx + x * s - 9 * s, cy + y * s - 16 * s, cx + x * s + 9 * s, cy + y * s + 2 * s], fill=fill)


def _eye(d, cx, cy, w, h, fill=255, hole=True):
    pts = []
    for i in range(21):
        u = -1 + i / 10
        pts.append((cx + u * w, cy - h * (1 - u * u) ** 0.9))
    pts2 = [(cx + (1 - i / 10) * w - w + w * 0 + (-1 + 0) * 0, cy) for i in range(0)]
    low = []
    for i in range(21):
        u = 1 - i / 10
        low.append((cx + u * w, cy + h * (1 - u * u) ** 0.9))
    d.polygon(pts + low, fill=fill)
    if hole:
        d.ellipse([cx - h * 0.62, cy - h * 0.62, cx + h * 0.62, cy + h * 0.62], fill=0)
        d.ellipse([cx - h * 0.28, cy - h * 0.28, cx + h * 0.28, cy + h * 0.28], fill=fill)


def _hex(d, cx, cy, r, w, fill=255):
    pts = [(cx + r * math.cos(math.radians(60 * i + 30)), cy + r * math.sin(math.radians(60 * i + 30))) for i in range(6)]
    d.line(pts + [pts[0]], fill=fill, width=w, joint="curve")


def _key(d, cx, cy, ang, ln=70, fill=255, hole=True):
    a = math.radians(ang)
    ux, uy = math.cos(a), math.sin(a)
    px, py = -uy, ux
    cx, cy = cx + ux * 14, cy + uy * 14
    x0, y0 = cx + ux * 22, cy + uy * 22
    x1, y1 = cx + ux * (22 + ln), cy + uy * (22 + ln)
    d.line([(x0, y0), (x1, y1)], fill=fill, width=10)
    # Bart
    for k, off in enumerate((0.55, 0.8)):
        bx, by = cx + ux * (22 + ln * off), cy + uy * (22 + ln * off)
        d.line([(bx, by), (bx + px * 16, by + py * 16)], fill=fill, width=9)
    d.ellipse([cx + ux * 10 - 20, cy + uy * 10 - 20, cx + ux * 10 + 20, cy + uy * 10 + 20], fill=fill)
    d.ellipse([cx + ux * 10 - 8, cy + uy * 10 - 8, cx + ux * 10 + 8, cy + uy * 10 + 8], fill=0)


def make_symbol(name: str) -> Image.Image:
    im = Image.new("L", (N, N), 0)
    d = ImageDraw.Draw(im)
    if name == "rothain":
        _ring(d, 118, 14, a0=-60, a1=290)          # gebrochener Ring
        d.polygon([(204, 52), (222, 64), (210, 80)], fill=255)
        d.polygon([(190, 38), (176, 56), (200, 52)], fill=0)
        _crown(d, 128, 120, 0.95)
    elif name == "averon":
        _eye(d, 128, 120, 100, 56)
        for i, yy in enumerate((184, 202, 220)):
            w = 70 - i * 18
            d.rectangle([128 - w, yy, 128 + w, yy + 8], fill=255)
        for s in (-1, 1):
            d.rectangle([128 + s * 112 - 6, 100, 128 + s * 112 + 6, 140], fill=255)
    elif name == "karsk":
        _hex(d, 128, 128, 112, 16)
        _eye(d, 128, 128, 62, 34)
        for s in (-1, 1):
            d.line([(128 + s * 62, 128), (128 + s * 98, 128)], fill=255, width=8)
            d.ellipse([128 + s * 98 - 8, 120, 128 + s * 98 + 8, 136], fill=255)
        d.line([(128, 94), (128, 52)], fill=255, width=8)
        d.line([(128, 162), (128, 204)], fill=255, width=8)
    elif name == "caldris":
        shield = [(40, 36), (216, 36), (216, 128), (128, 232), (40, 128)]
        d.line(shield + [shield[0]], fill=255, width=14, joint="curve")
        d.ellipse([100, 120, 156, 176], fill=255)
        for ang, ln in ((-100, 70), (-60, 74), (-20, 60), (20, 44), (-140, 62)):
            a = math.radians(ang)
            d.line([(128, 150), (128 + math.cos(a) * ln, 150 + math.sin(a) * ln)], fill=255, width=11)
    elif name == "dargan":
        d.rectangle([122, 40, 134, 208], fill=255)
        d.line([(40, 70), (216, 70)], fill=255, width=10)
        for s in (-1, 1):
            cx = 128 + s * 78
            d.line([(cx, 70), (cx - 40, 140)], fill=255, width=6)
            d.line([(cx, 70), (cx + 40, 140)], fill=255, width=6)
            d.pieslice([cx - 44, 100, cx + 44, 180], 0, 180, fill=255)
        d.rectangle([84, 208, 172, 220], fill=255)
        d.ellipse([108, 28, 148, 56], fill=255)
    elif name == "eldran":
        d.rectangle([121, 20, 135, 236], fill=255)
        d.ellipse([108, 12, 148, 52], fill=255)
        _crown(d, 128, 150, 0.8)
        d.rectangle([121, 20, 135, 60], fill=255)
    elif name == "lyr":
        _ring(d, 104, 22, a0=-30, a1=250)
    elif name == "merovan":
        _ring(d, 112, 14)
        d.polygon([(76, 180), (176, 80)] + [(176, 80)], fill=255)
        d.line([(80, 176), (170, 86)], fill=255, width=20)
        d.polygon([(190, 66), (190, 134), (122, 66)], fill=255)
    elif name == "namar":
        d.ellipse([108, 24, 148, 64], outline=255, width=11)
        d.rectangle([122, 60, 134, 200], fill=255)
        d.rectangle([84, 84, 172, 98], fill=255)
        d.arc([40, 100, 216, 236], 10, 170, fill=255, width=14)
        d.polygon([(30, 150), (62, 168), (40, 190)], fill=255)
        d.polygon([(226, 150), (194, 168), (216, 190)], fill=255)
        d.rectangle([30, 232, 226, 242], fill=255)
    elif name == "orthea":
        _ring(d, 112, 12)
        for i in range(24):
            a = math.radians(i * 15)
            r0 = 92 if i % 6 else 80
            d.line([(128 + math.cos(a) * r0, 128 + math.sin(a) * r0), (128 + math.cos(a) * 104, 128 + math.sin(a) * 104)], fill=255, width=5)
        d.polygon([(128, 36), (146, 128), (128, 220), (110, 128)], fill=255)
        d.ellipse([112, 112, 144, 144], fill=0)
        d.ellipse([120, 120, 136, 136], fill=255)
    elif name == "ossaria":
        _ring(d, 118, 12)
        d.ellipse([72, 50, 184, 150], fill=255)
        d.rounded_rectangle([92, 132, 164, 186], 10, fill=255)
        for s in (-1, 1):
            d.ellipse([128 + s * 28 - 17, 92 - 14, 128 + s * 28 + 17, 92 + 20], fill=0)
        d.polygon([(128, 112), (118, 134), (138, 134)], fill=0)
        for x in range(104, 160, 14):
            d.line([(x, 150), (x, 182)], fill=0, width=3)
        for s in (-1, 1):
            d.line([(128 + s * 52, 200), (128 + s * 96, 168)], fill=255, width=9)
    elif name == "sahr":
        for k, yy in enumerate((70, 128, 186)):
            pts = [(30 + i * 5.2, yy + 22 * math.sin(i * 0.28 + k * 0.7)) for i in range(0, 43)]
            d.line(pts, fill=255, width=16, joint="curve")
    elif name == "steinmark":
        _ring(d, 118, 12)
        for ang in (-90, 30, 150):
            _key(d, 128, 128, ang, ln=58)
    elif name == "theryn":
        pts = [(128, 30), (170, 96), (190, 150), (164, 206), (128, 222), (92, 206), (66, 150), (88, 104), (104, 130), (112, 80)]
        d.polygon(pts, fill=255)
        d.polygon([(128, 120), (150, 160), (138, 196), (118, 196), (106, 160)], fill=0)
        d.arc([22, 20, 234, 232], 200, 340, fill=255, width=9)
        for a in (215, 250, 290, 325):
            r = math.radians(a)
            d.line([(128 + math.cos(r) * 112, 126 + math.sin(r) * 112), (128 + math.cos(r) * 132, 126 + math.sin(r) * 132)], fill=255, width=7)
    elif name == "vael":
        d.rectangle([122, 52, 134, 214], fill=255)
        d.line([(40, 84), (216, 84)], fill=255, width=10)
        for s in (-1, 1):
            cx = 128 + s * 76
            d.line([(cx, 84), (cx - 34, 144)], fill=255, width=5)
            d.line([(cx, 84), (cx + 34, 144)], fill=255, width=5)
            d.pieslice([cx - 38, 120, cx + 38, 184], 0, 180, fill=255)
        d.ellipse([100, 20, 156, 76], fill=255)
        d.ellipse([112, 32, 144, 64], fill=0)
        d.rectangle([84, 214, 172, 226], fill=255)
    elif name == "vesper":
        _ring(d, 118, 12)
        _ring(d, 92, 6)
        d.arc([48, 78, 208, 178], 20, 160, fill=255, width=14)
        for a in (30, 60, 90, 120, 150):
            r = math.radians(a)
            d.line([(128 + math.cos(r) * 80, 128 + math.sin(r) * 50 + 20), (128 + math.cos(r) * 100, 128 + math.sin(r) * 66 + 24)], fill=255, width=7)
        d.rectangle([110, 100, 146, 108], fill=255)
    else:
        raise KeyError(name)
    return im


_cache = {}


def symbol_mask(name, size):
    """Maske der Kantenlänge size (SS-Pixel) mit weicher Kante."""
    key = (name, size)
    if key not in _cache:
        big = make_symbol(name).resize((N * 2, N * 2), Image.LANCZOS)
        _cache[key] = big.resize((size, size), Image.LANCZOS)
    return _cache[key]


def metalize(mask: Image.Image, color, dark=0.35, hi=1.0, shadow=True):
    """Maske -> RGBA Metall: Verlauf, geprägte Kante, dunkle Kontur, Schlagschatten."""
    w, h = mask.size
    m = np.asarray(mask, np.float32) / 255.0
    base = np.array(color, np.float32)
    k = max(1.0, w / 64.0)
    mb = blur(m, 1.6 * k)
    gy, gx = np.gradient(mb)
    emb = np.clip((-gx * 0.8 - gy * 0.8) * 7 * k, -1, 1)
    yy = np.linspace(0, 1, h, dtype=np.float32)[:, None]
    grad = 1.12 - 0.42 * yy
    rgb = base[None, None, :] * (grad * (0.88 + 0.12 * 0))[..., None] * (1 + 0.5 * emb[..., None] * hi)
    rgb = np.clip(rgb + np.clip(emb[..., None], 0, 1) * 60, 0, 255)
    # Kontur
    mi = np.asarray(mask.filter(ImageFilter.MaxFilter(int(2 * round(2 * k) + 1))), np.float32) / 255.0
    outline = np.clip(mi - m, 0, 1)
    rgb = rgb * (1 - outline[..., None]) + (base * dark)[None, None, :] * outline[..., None]
    alpha = np.maximum(m, outline)
    out = np.dstack([rgb, alpha * 255]).astype(np.uint8)
    img = Image.fromarray(out, "RGBA")
    if shadow:
        sh = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        a = (np.asarray(mask.filter(ImageFilter.MaxFilter(3)), np.float32) * 0.55).astype(np.uint8)
        sh.putalpha(Image.fromarray(a))
        sh = sh.filter(ImageFilter.GaussianBlur(1.4 * k))
        canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        canvas.alpha_composite(sh, (int(round(1.6 * k)), int(round(2.4 * k))))
        canvas.alpha_composite(img)
        return canvas
    return img
