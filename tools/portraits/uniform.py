"""Uniform-Layer: Oberkörper ab Halsansatz bis Bildunterkante (Mitte Brust/Bauch), ohne Kopf, ohne Rangzeichen, ohne Orden."""
from __future__ import annotations
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy.interpolate import splprep, splev
from pcommon import *
from scipy.ndimage import distance_transform_edt

UY0 = 1080          # Arbeitsfenster (SS) ab dieser Zeile
UH = SH - UY0


def smooth(points, n=60, s=0):
    pts = np.array(points, float)
    tck, _ = splprep([pts[:, 0], pts[:, 1]], k=min(3, len(pts) - 1), s=s)
    u = np.linspace(0, 1, n)
    x, y = splev(u, tck)
    return list(zip(x, y))


def torso_polygon(widen=1.0):
    half = [(300, 600), (248, 622), (190, 640), (140, 662), (104, 690), (84, 730), (76, 800), (70, 1024)]
    left = [(CX - (CX - x) * widen, y) for x, y in half]
    sm = smooth(left, 70)
    right = [(2 * CX - x, y) for x, y in sm[::-1]]
    poly = sm + [(2 * CX - 70 * widen + (CX - 70 * widen) * 0 + 0, 1030)][0:0] + [(CX + (CX - left[-1][0]), 1030), (left[-1][0], 1030)][0:0]
    full = sm + [(sm[-1][0], 1030), (2 * CX - sm[-1][0], 1030)] + right
    # kleine Mulde am Halsansatz
    return [(x * S, (y) * S) for x, y in full]


def _mask(poly, w=SW, h=UH, oy=UY0):
    im = Image.new("L", (w, h), 0)
    ImageDraw.Draw(im).polygon([(x, y - oy) for x, y in poly], fill=255)
    return im


def _poly_c(pts):  # Canvas-Koordinaten -> SS
    return [(x * S, y * S) for x, y in pts]


def rot_rect(cx, cy, w, h, ang):
    a = np.radians(ang)
    c, s = np.cos(a), np.sin(a)
    pts = []
    for dx, dy in [(-w / 2, -h / 2), (w / 2, -h / 2), (w / 2, h / 2), (-w / 2, h / 2)]:
        pts.append((cx + dx * c - dy * s, cy + dx * s + dy * c))
    return pts


class Canvas:
    """Kleine Hilfsklasse: RGBA-Ebene im SS-Fenster, Zeichnen in Canvas-Koordinaten."""

    def __init__(self):
        self.im = Image.new("RGBA", (SW, UH), (0, 0, 0, 0))
        self.d = ImageDraw.Draw(self.im)

    def P(self, pts):
        return [(x * S, y * S - UY0) for x, y in pts]

    def poly(self, pts, fill, outline=None, width=2):
        self.d.polygon(self.P(pts), fill=fill + (255,) if len(fill) == 3 else fill)
        if outline:
            self.d.line(self.P(list(pts) + [pts[0]]), fill=outline + (255,) if len(outline) == 3 else outline, width=width * S // 1, joint="curve")

    def line(self, pts, fill, width=2):
        self.d.line(self.P(pts), fill=fill + (255,) if len(fill) == 3 else fill, width=max(1, int(width * S)), joint="curve")

    def ell(self, cx, cy, rx, ry, fill, outline=None, width=1):
        self.d.ellipse([(cx - rx) * S, (cy - ry) * S - UY0, (cx + rx) * S, (cy + ry) * S - UY0], fill=(fill + (255,) if len(fill) == 3 else fill), outline=(outline + (255,)) if outline else None, width=int(width * S))


def button(c, x, y, col, r=9):
    c.ell(x + 1.5, y + 2, r, r, (0, 0, 0, 90))
    c.ell(x, y, r, r, tuple(int(v * 0.65) for v in col))
    c.ell(x - 1, y - 1, r * 0.8, r * 0.8, col)
    c.ell(x - 3, y - 3, r * 0.3, r * 0.3, tuple(min(255, int(v * 1.4) + 30) for v in col))


def render_uniform(cfg, tier, seed=0):
    """cfg: Uniformtyp-Konfiguration (siehe nations.py); tier 0..3: basic, staff, general, marshal."""
    rng = np.random.RandomState(seed + 77)
    Y, X = np.mgrid[UY0:UY0 + UH, 0:SW].astype(np.float32)
    poly = torso_polygon(cfg.get("widen", 1.0) * (1.0 + 0.025 * tier))
    mask_im = _mask(poly)
    m = np.asarray(mask_im, np.float32) / 255.0
    m = blur(m, 1.4)
    cxs = CX * S
    # --- Höhenfeld
    d = distance_transform_edt(m > 0.5)
    z = 150 * np.sqrt(1 - (1 - np.minimum(d / 120.0, 1)) ** 2)
    zc = 70 * np.sqrt(np.clip(1 - ((X - cxs) / (330.0 * S / 1.0 * 0.95)) ** 2, 0, 1))
    z = z * 0.55 + zc
    # Armnähte
    for s_ in (-1, 1):
        crease = gblob(X.shape, cxs + s_ * 236 * S / 1.0 * 0.0 + s_ * 232 * 1.0 * 2 * 0.5 * 1.0, 1750, 10 * S / 2, 760, X, Y)
        z -= 55 * gblob(X.shape, cxs + s_ * 244, 1800, 9, 520, X, Y) * np.clip((Y - 1500) / 200, 0, 1)
    # Falten
    nz = blur(rng.randn(*X.shape).astype(np.float32), 26) * 90
    z += nz
    for _ in range(7):
        x0 = rng.uniform(cxs - 330, cxs + 330); y0 = rng.uniform(1500, 2040)
        z += rng.uniform(-18, 18) * gblob(X.shape, x0, y0, rng.uniform(12, 24), rng.uniform(60, 130), X, Y)
    sh = lambert(z * 0.9)
    base = np.array(cfg["base"], np.float32)
    # Webstruktur
    weave = (np.sin(X * 1.7) * np.sin(Y * 1.7) * 3.5 + np.sin(X * 0.45 + Y * 0.12) * 2)
    fine = blur(rng.randn(*X.shape).astype(np.float32), 0.7) * 6
    def shade_col(color, amt=1.0):
        c = np.array(color, np.float32)
        cool = np.array([0.82, 0.88, 1.0], np.float32)
        return c * (0.30 + 0.82 * sh[..., None]) * (cool ** ((1 - np.clip(sh[..., None], 0, 1)) * 0.9)) + (weave + fine)[..., None] * amt
    col = shade_col(base)
    if cfg.get("pattern") == "tweed":
        col += (blur(rng.randn(*X.shape).astype(np.float32), 1.2) * 9)[..., None]
    # Detail-Ebene
    c = Canvas()
    trim = tuple(cfg["trim"])
    metal = tuple(cfg.get("metal", trim))
    dark = tuple(cfg.get("dark", [int(v * 0.5) for v in cfg["base"]]))
    straps = cfg.get("straps")
    closure = cfg.get("closure", "single")
    sz = cfg.get("collar", "stand")
    ccol = tuple(cfg.get("collar_col", cfg["base"]))
    # Mittelnaht/Knopfleiste
    if closure in ("single", "frogging"):
        c.line([(CX, 640), (CX, 1030)], tuple(int(v * 0.55) for v in cfg["base"]) + (255,), 3)
        c.line([(CX + 3, 640), (CX + 3, 1030)], tuple(min(255, int(v * 1.25)) for v in cfg["base"]) + (140,), 2)
    if closure == "double":
        for s_ in (-1, 1):
            c.line([(CX + s_ * 10, 640), (CX + s_ * 10, 1030)], tuple(int(v * 0.55) for v in cfg["base"]) + (255,), 3)
        # Überschlag (rechts über links)
        c.poly([(CX + 4, 644), (CX + 104, 700), (CX + 112, 1030), (CX + 4, 1030)], tuple(int(v * 1.0) for v in cfg["base"]) + (60,), None)
        c.line([(CX + 4, 644), (CX + 104, 700), (CX + 112, 1030)], tuple(int(v * 0.5) for v in cfg["base"]) + (255,), 3)
    # Taschen
    if cfg.get("pockets"):
        for (px, py) in (ANCHORS["chest_left_c"], ANCHORS["chest_right_c"]):
            c.poly([(px - 56, py - 40), (px + 56, py - 40), (px + 56, py + 38), (px, py + 52), (px - 56, py + 38)], tuple(int(v * 1.04) for v in cfg["base"]), tuple(int(v * 0.5) for v in cfg["base"]), 2)
            c.poly([(px - 56, py - 40), (px + 56, py - 40), (px + 56, py - 12), (px, py + 2), (px - 56, py - 12)], tuple(int(v * 0.94) for v in cfg["base"]), tuple(int(v * 0.45) for v in cfg["base"]), 2)
            button(c, px, py - 4, metal, 8)
    # Riemenzeug / Ausrüstung
    if straps == "cross_belt":
        leather = tuple(cfg.get("leather", (150, 118, 74)))
        c.poly([(500, 628), (548, 652), (292, 1030), (236, 1030)], leather, tuple(int(v * 0.5) for v in leather), 2)
        c.line([(508, 640), (255, 1030)], tuple(int(v * 0.7) for v in leather), 2)
        pc = (262, 972)
        c.poly([(pc[0] - 72, pc[1] - 36), (pc[0] + 72, pc[1] - 36), (pc[0] + 72, 1034), (pc[0] - 72, 1034)], (36, 32, 30), (14, 12, 12), 2)
        c.poly([(pc[0] - 72, pc[1] - 36), (pc[0] + 72, pc[1] - 36), (pc[0] + 72, pc[1] - 8), (pc[0], pc[1] + 6), (pc[0] - 72, pc[1] - 8)], (44, 38, 34), (14, 12, 12), 2)
        button(c, pc[0], pc[1] - 8, metal, 9)
        for k in (-1, 0, 1):
            c.line([(pc[0] + k * 36, pc[1] + 14), (pc[0] + k * 36, 1030)], (22, 20, 18), 3)
    if straps == "braces":
        leather = tuple(cfg.get("leather", (30, 28, 28)))
        for s_ in (-1, 1):
            c.poly([(CX + s_ * 112, 640), (CX + s_ * 160, 650), (CX + s_ * 150, 1030), (CX + s_ * 102, 1030)], leather, (10, 10, 10), 2)
            c.ell(CX + s_ * 126, 905, 14, 14, (10, 10, 10, 0), tuple(int(v * 0.9) for v in metal), 3)
        c.poly([(70, 1004), (698, 1004), (698, 1030), (70, 1030)], (24, 22, 22), (8, 8, 8), 2)
        c.poly([(CX - 24, 1004), (CX + 24, 1004), (CX + 24, 1030), (CX - 24, 1030)], tuple(int(v * 0.8) for v in metal), (20, 20, 20), 2)
    if straps == "plate":
        pc2 = tuple(cfg.get("plate_col", [int(v * 0.8) for v in cfg["base"]]))
        c.poly([(CX - 176, 676), (CX + 176, 676), (CX + 186, 1030), (CX - 186, 1030)], pc2, tuple(int(v * 0.45) for v in pc2), 3)
        # MOLLE-Gurtbänder
        for yy in range(716, 900, 26):
            c.line([(CX - 168, yy), (CX + 168, yy)], tuple(int(v * 0.72) for v in pc2) + (255,), 5)
            for xx in range(CX - 160, CX + 164, 18):
                c.line([(xx, yy - 3), (xx, yy + 3)], tuple(int(v * 0.55) for v in pc2), 2)
        for s_ in (-1, 1):
            c.poly([(CX + s_ * 68, 912), (CX + s_ * 150, 912), (CX + s_ * 152, 1030), (CX + s_ * 66, 1030)], tuple(int(v * 0.9) for v in pc2), tuple(int(v * 0.4) for v in pc2), 3)
            c.poly([(CX + s_ * 68, 912), (CX + s_ * 150, 912), (CX + s_ * 148, 936), (CX + s_ * 70, 936)], tuple(int(v * 1.05) for v in pc2), tuple(int(v * 0.4) for v in pc2), 2)
            button(c, CX + s_ * 109, 936, tuple(int(v * 0.7) for v in pc2), 7)
        c.poly([(CX - 60, 700), (CX + 60, 700), (CX + 60, 770), (CX - 60, 770)], tuple(int(v * 0.88) for v in pc2), tuple(int(v * 0.4) for v in pc2), 2)
        sand = tuple(cfg.get("stripe", (206, 186, 140)))
        for s_ in (-1, 1):
            c.poly([(CX + s_ * 96, 640), (CX + s_ * 150, 650), (CX + s_ * 156, 700), (CX + s_ * 100, 690)], tuple(int(v * 0.85) for v in pc2), tuple(int(v * 0.4) for v in pc2), 2)
            c.line([(CX + s_ * 106, 654), (CX + s_ * 120, 690)], sand, 5)
            c.line([(CX + s_ * 126, 658), (CX + s_ * 140, 694)], sand, 5)
    if straps == "harness":
        hc = tuple(cfg.get("leather", (44, 46, 50)))
        for s_ in (-1, 1):
            c.poly([(CX + s_ * 96, 636), (CX + s_ * 144, 646), (CX + s_ * 40, 1030), (CX + s_ * 0 + s_ * (-8), 1030)], hc, tuple(int(v * 0.5) for v in hc), 2)
            c.line([(CX + s_ * 110, 650), (CX + s_ * 20, 1030)], tuple(int(v * 1.5) + 8 for v in hc), 1.5)
        # Sammelplatte
        c.poly([(CX - 38, 836), (CX + 38, 836), (CX + 38, 880), (CX - 38, 880)], tuple(int(v * 1.0) for v in metal), (20, 22, 24), 3)
        for xx in (-18, 0, 18):
            c.line([(CX + xx, 844), (CX + xx, 872)], (40, 44, 48), 2)
    # Zierschnur Gala
    if closure == "frogging":
        for yy in (700, 765, 830, 895, 960):
            wid = 150 - (yy - 700) * 0.12
            for s_ in (-1, 1):
                c.line([(CX + s_ * 6, yy), (CX + s_ * wid, yy - 4)], tuple(int(v * 0.55) for v in trim), 7)
                c.line([(CX + s_ * 6, yy), (CX + s_ * wid, yy - 4)], trim, 4)
                c.ell(CX + s_ * wid, yy - 4, 11, 11, (0, 0, 0, 0), trim, 3)
                c.line([(CX + s_ * 6, yy + 12), (CX + s_ * (wid * 0.8), yy + 8)], tuple(int(v * 0.55) for v in trim), 5)
                c.line([(CX + s_ * 6, yy + 12), (CX + s_ * (wid * 0.8), yy + 8)], trim, 2.5)
            button(c, CX, yy, metal, 8)
    elif closure in ("single",):
        for yy in (722, 800, 878, 956):
            button(c, CX, yy, metal, 9)
    elif closure == "double":
        for yy in (730, 810, 890, 970):
            button(c, CX - 52, yy, metal, 9)
            button(c, CX + 52, yy, metal, 9)
    elif closure == "zip":
        c.line([(CX, 620), (CX, 1030)], (14, 16, 18), 6)
        for yy in range(640, 1030, 12):
            c.line([(CX - 4, yy), (CX + 4, yy)], (150, 156, 164), 1.5)
    # Ärmelnaht und Manschetten-Andeutung (Oberarme)
    for s_ in (-1, 1):
        c.line([(CX + s_ * 232, 700 + 30), (CX + s_ * 262, 1030)], tuple(int(v * 0.55) for v in cfg["base"]) + (200,), 3)
    # Schulterstück-Unterlage (nur Schlaufe, Rangzeichen später)
    for (bx, by), sgn in zip(ANCHORS["shoulder_board_c"], (-1, 1)):
        ang = 20 * -sgn * -1
        ang = 19 if sgn == -1 else -19
        base_ep = tuple(cfg.get("epaulette_col", [int(v * 0.9) for v in cfg["base"]]))
        c.poly(rot_rect(bx, by, 134 + 4 * tier, 50, ang), base_ep, tuple(int(v * 0.5) for v in base_ep), 2)
        nx = bx + (-sgn) * 0 + (CX - bx) * 0.56
        ny = by - 22 * 1.0 + (-10)
    # Kragen
    ccd = tuple(int(v * 0.5) for v in ccol)
    if sz in ("stand", "stand_fur", "high"):
        top = 586 if sz != "high" else 566
        left_pts = [(CX - 4, top + 18), (CX - 40, top + 4), (CX - 82, top - 4), (CX - 92, top + 26), (CX - 98, 646), (CX - 52, 664), (CX - 4, 666)]
        for s_ in (-1, 1):
            pts = [(CX + s_ * (x - CX) * -1 * -1, y) for x, y in left_pts]
            pts = [(CX + s_ * (CX - x), y) for x, y in left_pts]
            if sz == "stand_fur":
                c.poly(pts, (22, 20, 20), (8, 8, 8), 2)
            else:
                c.poly(pts, ccol, ccd, 2)
        if sz == "stand_fur":
            frng = np.random.RandomState(seed + 5)
            for _ in range(900):
                s_ = frng.choice([-1, 1])
                u = frng.uniform(0, 1)
                x0 = CX + s_ * (6 + u * 90)
                y0 = (top + 14 + 70 * (1 - np.sin(u * np.pi / 2) ** 2) * 0.1) + frng.uniform(-14, 70)
                if y0 < top - 6 + 30 * u or y0 > 664:
                    continue
                ang = frng.normal(-1.4, 0.5)
                l = frng.uniform(8, 22)
                shade_v = int(frng.uniform(14, 70))
                c.line([(x0, y0), (x0 + np.cos(ang) * l, y0 + np.sin(ang) * l)], (shade_v, shade_v - 2, shade_v - 3), 1.6)
        else:
            for s_ in (-1, 1):
                c.line([(CX + s_ * 4, top + 18), (CX + s_ * 40, top + 4), (CX + s_ * 82, top - 4)], tuple(min(255, int(v * 1.3)) for v in trim) + (255,), 2)
        c.line([(CX, top + 18), (CX, 666)], (10, 10, 12), 3)
    elif sz == "fold":
        shirt = tuple(cfg.get("shirt", (222, 218, 205)))
        c.poly([(CX - 74, 590), (CX + 74, 590), (CX + 6, 800), (CX - 6, 800)], shirt, tuple(int(v * 0.6) for v in shirt), 2)
        tie = tuple(cfg.get("tie", (36, 40, 36)))
        c.poly([(CX - 14, 618), (CX + 14, 618), (CX + 8, 640), (CX - 8, 640)], tie, None)
        c.poly([(CX - 8, 640), (CX + 8, 640), (CX + 20, 760), (CX, 786), (CX - 20, 760)], tie, tuple(int(v * 0.6) for v in tie), 2)
        lap = ccol
        for s_ in (-1, 1):
            c.poly([(CX + s_ * 70, 586), (CX + s_ * 112, 612), (CX + s_ * 150, 700), (CX + s_ * 98, 790), (CX + s_ * 8, 806), (CX + s_ * 40, 700), (CX + s_ * 70, 640)], lap, ccd, 3)
            c.poly([(CX + s_ * 70, 586), (CX + s_ * 96, 596), (CX + s_ * 124, 640), (CX + s_ * 82, 650)], tuple(int(v * 1.1) for v in lap), ccd, 2)
            c.line([(CX + s_ * 70, 640), (CX + s_ * 40, 700), (CX + s_ * 8, 806)], tuple(int(v * 0.55) for v in lap) + (255,), 3)
    # Stufen: Besätze
    if tier >= 1:
        # Passepoil an Armnähten & Kragenrand
        for s_ in (-1, 1):
            c.line([(CX + s_ * 232, 730), (CX + s_ * 262, 1030)], tuple(trim) + (200,), 2)
    if tier >= 2:
        for s_ in (-1, 1):
            c.line([(CX + s_ * 100, 650), (CX + s_ * 110, 1030)], trim + (140,), 2)
    if tier >= 3:
        # Aiguillette (Fangschnur) von der rechten Schulter zur Brust
        cord = trim
        for k in range(2):
            pts = [(ANCHORS["shoulder_board_c"][1][0] - 60, 690), (ANCHORS["shoulder_board_c"][1][0] - 90, 790 + 20 * k), (CX + 120, 840 + 24 * k), (CX + 70, 900 + 18 * k)]
            c.line(smooth(pts, 40), tuple(int(v * 0.6) for v in cord) + (255,), 7)
            c.line(smooth(pts, 40), cord + (255,), 4)
        for k in range(3):
            c.line([(CX + 70 + 6 * k, 900 + 18), (CX + 66 + 6 * k, 962)], cord + (255,), 3)
    if cfg.get("extra"):
        cfg["extra"](c, tier)

    det = c.im
    det_arr = np.asarray(det).astype(np.float32)
    da = det_arr[..., 3:4] / 255.0
    mod = (0.62 + 0.52 * sh[..., None])
    # Details bekommen nur schwache Wölbungs-Modulation
    out_rgb = col * (1 - da) + np.clip(det_arr[..., :3] * mod, 0, 255) * da
    alpha = m
    # Schatten auf dem Hals / Kragenkante (weicher Schlagschatten oberhalb)
    img = arr_to_img(out_rgb, alpha)
    full = new_layer()
    full.alpha_composite(img, (0, UY0))
    # Kragenschatten auf den Hals (weich, halbtransparent)
    sh_l = Image.new("RGBA", (SW, UH), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh_l)
    ytop = (586 if sz != "high" else 566) * S - UY0 - 36
    sd.rectangle([(CX - 80) * S, ytop, (CX + 80) * S, ytop + 40], fill=(10, 6, 6, 120))
    sh_l = sh_l.filter(ImageFilter.GaussianBlur(14))
    sh_alpha = np.asarray(sh_l)[..., 3].astype(np.float32)
    # Maske: Schatten nur dort, wo noch kein Stoff ist; wird auf Hals-Ebene wirksam, deshalb in der Uniform-Ebene als Eigenpixel
    sh_l_arr = np.asarray(sh_l).copy()
    sh_l_arr[..., 3] = (sh_l_arr[..., 3] * (1 - np.clip(m, 0, 1))).astype(np.uint8)
    full.alpha_composite(Image.fromarray(sh_l_arr, "RGBA"), (0, UY0))
    return finish(full, 0.5)
