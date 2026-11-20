"""Rangabzeichen-Layer (Schulterstücke, Kragenspiegel, Ärmel) und Orden-Layer (Brust) - prozedural, nationstypisch."""
from __future__ import annotations
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from pcommon import *
from symbols import symbol_mask, metalize
from PIL import ImageChops

# Rangspezifikation: (Brett, Anzahl Symbole, Größe, Extras)
RANKSPEC = [
    ("strap", 1, "s", ()), ("strap", 2, "s", ()),
    ("plain", 1, "m", ()), ("plain", 2, "m", ()), ("plain", 3, "m", ()), ("plain", 3, "m", ("bar",)),
    ("staff", 1, "l", ()), ("staff", 2, "l", ()), ("staff", 3, "l", ()),
    ("general", 1, "l", ("ring",)), ("general", 2, "l", ("ring",)), ("general", 3, "l", ("ring",)), ("general", 4, "l", ("ring",)),
    ("general", 4, "l", ("ring", "laurel")),
    ("marshal", 1, "xl", ("batons", "ring")), ("marshal", 1, "xl", ("batons", "ring", "laurel", "crown_ring")),
]
SYM_PX = {"s": 24, "m": 30, "l": 36, "xl": 46}
BOARD_DIM = {"strap": (118, 22), "plain": (128, 42), "staff": (134, 46), "general": (140, 52), "marshal": (148, 58)}
ORDER_COUNT = [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]


def _lighter(c, f):
    return tuple(min(255, int(v * f)) for v in c)


def draw_board(spec, cfg_u, nat, mirror):
    """Schulterstück in lokalen Koordinaten (SS), waagerecht. Gibt RGBA zurück."""
    kind, n, size, extras = spec
    bw, bh = BOARD_DIM[kind]
    W_, H_ = int((bw + 40) * S), int((bh + 60) * S)
    im = Image.new("RGBA", (W_, H_), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    cx, cy = W_ / 2, H_ / 2
    tier = {"strap": 0, "plain": 1, "staff": 2, "general": 3, "marshal": 4}[kind]
    lo, hi = tuple(nat["metal_lo"]), tuple(nat["metal_hi"])
    metal = lo if tier < 3 else hi
    base = tuple(cfg_u.get("board_col", cfg_u.get("epaulette_col", [int(v * 0.92) for v in cfg_u["base"]])))
    edge = tuple(nat.get("board_edge", metal)) if tier >= 1 else _lighter(base, 0.55)
    rect = [cx - bw * S / 2, cy - bh * S / 2, cx + bw * S / 2, cy + bh * S / 2]
    # Brett mit abgeschrägter Außenkante
    pts = [(rect[0], rect[1]), (rect[2] - 18 * S, rect[1]), (rect[2], cy), (rect[2] - 18 * S, rect[3]), (rect[0], rect[3])]
    d.polygon([(x + 2 * S, y + 3 * S) for x, y in pts], fill=(0, 0, 0, 100))
    d.polygon(pts, fill=base + (255,))
    # Gewebe/Plastik
    d.polygon(pts, outline=tuple(int(v * 0.4) for v in base) + (255,), width=2 * S)
    if tier >= 1:
        ew = {1: 3, 2: 5, 3: 7, 4: 9}[tier]
        d.line(pts + [pts[0]], fill=edge + (255,), width=ew * S // 1, joint="curve")
        d.line([(x, y) for x, y in pts + [pts[0]]], fill=_lighter(edge, 1.25) + (200,), width=max(1, (ew // 3) * S), joint="curve")
    if tier >= 2:
        # Geflecht/Stickerei: Zickzack zwischen den Rändern
        zz = []
        steps = 18 if tier == 2 else 26
        for i in range(steps + 1):
            x = rect[0] + 8 * S + (rect[2] - rect[0] - 30 * S) * i / steps
            zz.append((x, rect[1] + (7 if tier == 2 else 10) * S if i % 2 == 0 else rect[3] - (7 if tier == 2 else 10) * S))
        if tier >= 3:
            d.line(zz, fill=edge + (230,), width=2 * S, joint="curve")
        else:
            d.line([(rect[0] + 8 * S, rect[1] + 8 * S), (rect[2] - 26 * S, rect[1] + 8 * S)], fill=edge + (230,), width=2 * S)
            d.line([(rect[0] + 8 * S, rect[3] - 8 * S), (rect[2] - 26 * S, rect[3] - 8 * S)], fill=edge + (230,), width=2 * S)
    if tier == 4:
        # Fransen am äußeren Ende
        for k in range(-5, 6):
            y = cy + k * 4.6 * S
            d.line([(rect[2] - 4 * S, y), (rect[2] + 12 * S, y + k * 0.9 * S)], fill=hi + (255,), width=2 * S)
    # Knopf am inneren Ende
    bx = rect[0] + 10 * S
    d.ellipse([bx - 6 * S, cy - 6 * S, bx + 6 * S, cy + 6 * S], fill=_lighter(metal, 0.7) + (255,), outline=(20, 20, 20, 255), width=S)
    d.ellipse([bx - 3 * S, cy - 4 * S, bx + 1 * S, cy - 1 * S], fill=_lighter(metal, 1.5) + (255,))
    # Symbole
    sp = int(SYM_PX[size] * S)
    sx0 = rect[0] + 28 * S
    sx1 = rect[2] - 26 * S
    centers = []
    if n <= 3:
        for i in range(n):
            centers.append((sx0 + (sx1 - sx0) * ((i + 0.5) / n if n > 1 else 0.5), cy))
    else:
        sp = int(SYM_PX[size] * 0.72 * S)
        for i in range(2):
            for j in range(2):
                centers.append((sx0 + (sx1 - sx0) * (0.35 + 0.30 * i) + (0 if True else 0), cy + (j - 0.5) * (sp + 3 * S) * 0.95))
    if "batons" in extras:
        for sgn in (-1, 1):
            a = math.radians(32 * sgn)
            ln = 62 * S
            cxm = (sx0 + sx1) / 2
            p0 = (cxm - math.cos(a) * ln / 2, cy - math.sin(a) * ln / 2 * -1)
            p1 = (cxm + math.cos(a) * ln / 2, cy + math.sin(a) * ln / 2 * -1)
            d.line([p0, p1], fill=_lighter(hi, 0.6) + (255,), width=9 * S)
            d.line([p0, p1], fill=hi + (255,), width=6 * S)
            for p in (p0, p1):
                d.ellipse([p[0] - 6 * S, p[1] - 6 * S, p[0] + 6 * S, p[1] + 6 * S], fill=_lighter(hi, 0.8) + (255,))
    if "laurel" in extras:
        cxm = (sx0 + sx1) / 2
        for sgn in (-1, 1):
            for k in range(7):
                ang = math.radians(100 + k * 20)
                lx = cxm + sgn * (math.cos(ang) * -1) * 34 * S * 1.0 + sgn * 0
                ly = cy + math.sin(ang) * 22 * S - 2 * S
                lx = cxm + sgn * 36 * S * math.sin(math.radians(20 + k * 22)) * 0 + sgn * (18 + 4.5 * k) * S * 0.0
                lx = cxm + sgn * (34 * S) * math.cos(math.radians(110 - k * 14))
                ly = cy + (30 * S) * math.sin(math.radians(60 + k * 20)) * 0.9 - 4 * S
                d.ellipse([lx - 4 * S, ly - 8 * S, lx + 4 * S, ly + 8 * S], fill=_lighter(hi, 0.85) + (255,), outline=_lighter(hi, 0.5) + (255,))
    for (x, y) in centers:
        m = symbol_mask(nat["symbol"], sp)
        g = metalize(m, metal if tier < 3 else hi)
        im.alpha_composite(g, (int(x - sp / 2), int(y - sp / 2)))
    if "ring" in extras and n == 1 and "crown_ring" not in extras:
        pass
    if "bar" in extras:
        d.rectangle([rect[0] + 14 * S, cy - bh * S * 0.5 + 4 * S, rect[0] + 20 * S, cy + bh * S * 0.5 - 4 * S], fill=metal + (255,))
    if mirror:
        im = im.transpose(Image.FLIP_LEFT_RIGHT)
    return im


def paste_rot(layer, patch, cx, cy, ang):
    r = patch.rotate(ang, resample=Image.BICUBIC, expand=True)
    layer.alpha_composite(r, (int(cx * S - r.width / 2), int(cy * S - r.height / 2)))


def draw_collar_patch(rank_i, cfg_u, nat, side):
    """Kragenspiegel, aufrecht, ca. 48x34 Canvas-Pixel."""
    tier = RANKS[rank_i][3]
    w_, h_ = 54, 38
    im = Image.new("RGBA", (int((w_ + 20) * S), int((h_ + 20) * S)), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    cx, cy = im.width / 2, im.height / 2
    patch_col = tuple(nat.get("patch_col", [int(v * 0.75) for v in cfg_u["base"]]))
    acc = tuple(nat.get("accent", nat["metal_lo"]))
    metal = tuple(nat["metal_lo"] if tier < 3 else nat["metal_hi"])
    rect = [cx - w_ * S / 2, cy - h_ * S / 2, cx + w_ * S / 2, cy + h_ * S / 2]
    d.rectangle([rect[0] + 2 * S, rect[1] + 3 * S, rect[2] + 2 * S, rect[3] + 3 * S], fill=(0, 0, 0, 90))
    d.rectangle(rect, fill=patch_col + (255,), outline=_lighter(patch_col, 0.45) + (255,), width=2 * S)
    if tier >= 1:
        d.rectangle([rect[0] + 3 * S, rect[1] + 3 * S, rect[2] - 3 * S, rect[3] - 3 * S], outline=metal + (255,), width=2 * S)
    if tier >= 3:
        # Eichenlaub-/Zickzackstickerei
        for i in range(10):
            x = rect[0] + 6 * S + (rect[2] - rect[0] - 12 * S) * i / 9
            d.line([(x, rect[1] + 5 * S), (x + 3 * S, rect[1] + 9 * S)], fill=metal + (255,), width=2 * S)
            d.line([(x, rect[3] - 5 * S), (x + 3 * S, rect[3] - 9 * S)], fill=metal + (255,), width=2 * S)
    if rank_i >= 9 or nat.get("collar_symbol_always"):
        sp = int((24 if rank_i < 14 else 28) * S)
        g = metalize(symbol_mask(nat["symbol"], sp), metal)
        im.alpha_composite(g, (int(cx - sp / 2), int(cy - sp / 2)))
    else:
        nb = min(4, 1 + rank_i // 3) if not nat.get("collar_symbol_always") else 0
        for k in range(nb):
            x = rect[0] + (rect[2] - rect[0]) * (k + 1) / (nb + 1)
            d.rectangle([x - 2 * S, rect[1] + 8 * S, x + 2 * S, rect[3] - 8 * S], fill=acc + (255,))
    return im


def render_insignia(rank_i, cfg_u, nat, seed=0):
    spec = RANKSPEC[rank_i]
    layer = new_layer()
    place = nat["placements"]
    if "shoulder" in place:
        for sgn, (bx, by) in zip((-1, 1), ANCHORS["shoulder_board_c"]):
            patch = draw_board(spec, cfg_u, nat, mirror=(sgn == 1))
            ang = 19 if sgn == -1 else -19
            paste_rot(layer, patch, bx, by, ang)
    if "collar" in place:
        for sgn, (px, py) in zip((-1, 1), ANCHORS["collar_patch_c"]):
            patch = draw_collar_patch(rank_i, cfg_u, nat, sgn)
            ang = -16 if sgn == -1 else 16
            if cfg_u.get("collar") == "fold":
                ang = -34 if sgn == -1 else 34
            paste_rot(layer, patch, px, py + (6 if cfg_u.get("collar") == "fold" else 0), ang)
    if "sleeve" in place:
        tier = RANKS[rank_i][3]
        for sgn, (sx, sy) in zip((-1, 1), ANCHORS["sleeve_c"]):
            w_, h_ = 62, 108
            im = Image.new("RGBA", (int((w_ + 20) * S), int((h_ + 20) * S)), (0, 0, 0, 0))
            d = ImageDraw.Draw(im)
            cx, cy = im.width / 2, im.height / 2
            pcol = tuple(nat.get("patch_col", [int(v * 0.7) for v in cfg_u["base"]]))
            acc = tuple(nat.get("accent", nat["metal_lo"]))
            metal = tuple(nat["metal_lo"] if tier < 3 else nat["metal_hi"])
            d.rectangle([cx - w_ * S / 2 + 2 * S, cy - h_ * S / 2 + 3 * S, cx + w_ * S / 2 + 2 * S, cy + h_ * S / 2 + 3 * S], fill=(0, 0, 0, 90))
            d.rectangle([cx - w_ * S / 2, cy - h_ * S / 2, cx + w_ * S / 2, cy + h_ * S / 2], fill=pcol + (255,), outline=_lighter(pcol, 0.5) + (255,), width=2 * S)
            g = metalize(symbol_mask(nat["symbol"], int(40 * S)), metal)
            im.alpha_composite(g, (int(cx - 20 * S), int(cy - h_ * S / 2 + 6 * S)))
            nst = 1 + rank_i // 2
            nst = min(nst, 7)
            for k in range(nst):
                y = cy - h_ * S / 2 + 56 * S + k * 6.4 * S
                d.rectangle([cx - w_ * S / 2 + 6 * S, y, cx + w_ * S / 2 - 6 * S, y + 3.2 * S], fill=acc + (255,))
            paste_rot(layer, im, sx, sy, 0)
    return finish(layer, 0.4)


# ------------------------------- Orden -----------------------------------------------------
def render_orders(rank_i, cfg_u, nat, seed=0):
    rng = np.random.RandomState(seed + rank_i)
    layer = new_layer()
    d = ImageDraw.Draw(layer)
    n = ORDER_COUNT[rank_i]
    rib = [tuple(c) for c in nat["ribbons"]]
    lo, hi = tuple(nat["metal_lo"]), tuple(nat["metal_hi"])
    bx0, by0 = ANCHORS["chest_right_c"]
    # Ordensspangen: 3 pro Reihe, neueste oben
    rows = (n + 2) // 3
    for r in range(rows):
        cnt = min(3, n - r * 3)
        for k in range(cnt):
            x = bx0 - 48 + k * 33 + (3 - cnt) * 16
            y = by0 - 56 + r * 15
            col = rib[(r * 3 + k) % len(rib)]
            x0, y0, x1, y1 = x * S, y * S, (x + 30) * S, (y + 13) * S
            d.rectangle([x0 + S, y0 + 2 * S, x1 + S, y1 + 2 * S], fill=(0, 0, 0, 100))
            d.rectangle([x0, y0, x1, y1], fill=col + (255,), outline=(20, 20, 20, 255), width=S)
            d.rectangle([x0 + 11 * S, y0, x0 + 14 * S, y1], fill=_lighter(col, 1.7) + (255,))
            d.rectangle([x0 + 18 * S, y0, x0 + 20 * S, y1], fill=_lighter(col, 0.5) + (255,))
    # Hängende Orden
    nmed = 0 if rank_i < 4 else (1 if rank_i < 9 else (2 if rank_i < 13 else 3))
    style = nat.get("order_style", "ring")
    for k in range(nmed):
        x = bx0 - (nmed - 1) * 30 + k * 60
        y = by0 - 56 + rows * 15 + 34
        col = hi if (rank_i >= 9 or k == 0 and rank_i >= 6) else lo
        rcol = rib[k % len(rib)]
        d.polygon([((x - 7) * S, (y - 26) * S), ((x + 7) * S, (y - 26) * S), ((x + 6) * S, (y - 4) * S), ((x - 6) * S, (y - 4) * S)], fill=rcol + (255,), outline=(20, 20, 20, 255))
        sp = int(50 * S)
        if style == "plaque":
            m = Image.new("L", (sp, sp), 0)
            md = ImageDraw.Draw(m)
            md.rectangle([sp * 0.15, sp * 0.12, sp * 0.85, sp * 0.88], fill=255)
            for yy in (0.28, 0.44, 0.60, 0.76):
                md.rectangle([sp * 0.28, sp * yy, sp * 0.72, sp * yy + sp * 0.06], fill=0)
        elif style == "hex":
            m = Image.new("L", (sp, sp), 0)
            md = ImageDraw.Draw(m)
            md.polygon([(sp / 2 + sp * 0.46 * math.cos(math.radians(60 * i + 30)), sp / 2 + sp * 0.46 * math.sin(math.radians(60 * i + 30))) for i in range(6)], fill=255)
            sm = symbol_mask(nat["symbol"], int(sp * 0.58))
            hole = ImageChops.invert(sm) if False else sm
            m.paste(0, (int(sp * 0.21), int(sp * 0.21)), hole)
        else:
            m = Image.new("L", (sp, sp), 0)
            md = ImageDraw.Draw(m)
            md.ellipse([sp * 0.06, sp * 0.06, sp * 0.94, sp * 0.94], fill=255)
            md.ellipse([sp * 0.26, sp * 0.26, sp * 0.74, sp * 0.74], fill=0)
            sm = symbol_mask(nat["symbol"], int(sp * 0.5))
            m.paste(255, (int(sp * 0.25), int(sp * 0.25)), sm)
        g = metalize(m, col)
        layer.alpha_composite(g, (int(x * S - sp / 2), int(y * S)))
    # Brust-Stern ab Brigadegeneral (Bildlinks)
    if rank_i >= 9:
        sx, sy = ANCHORS["chest_left_c"][0], ANCHORS["chest_left_c"][1] + 20
        rays = 8 if rank_i < 12 else (12 if rank_i < 15 else 16)
        size = int((92 if rank_i < 14 else 112) * S)
        m = Image.new("L", (size, size), 0)
        md = ImageDraw.Draw(m)
        c0 = size / 2
        pts = []
        for i in range(rays * 2):
            ang = math.radians(i * 180 / rays - 90)
            r = size * (0.48 if i % 2 == 0 else 0.30)
            pts.append((c0 + math.cos(ang) * r, c0 + math.sin(ang) * r))
        md.polygon(pts, fill=255)
        md.ellipse([c0 - size * 0.24, c0 - size * 0.24, c0 + size * 0.24, c0 + size * 0.24], fill=0)
        g = metalize(m, hi if rank_i >= 11 else lo)
        layer.alpha_composite(g, (int(sx * S - size / 2), int(sy * S - size / 2)))
        sm = metalize(symbol_mask(nat["symbol"], int(size * 0.42)), lo if rank_i >= 11 else hi)
        layer.alpha_composite(sm, (int(sx * S - size * 0.21), int(sy * S - size * 0.21)))
    if rank_i == 15:
        sx, sy = ANCHORS["chest_left_c"][0] + 20, ANCHORS["chest_left_c"][1] + 140
        size = int(70 * S)
        g = metalize(symbol_mask(nat["symbol"], size), hi)
        layer.alpha_composite(g, (int(sx * S - size / 2), int(sy * S - size / 2)))
    return finish(layer, 0.4)
