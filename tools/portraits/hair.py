"""Haar-Layer (eigene Ebene über dem Kopf, ohne Gesicht). Altersgrau, Rückgang des Haaransatzes."""
from __future__ import annotations
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from pcommon import *
from face import OX, OY, RW, RH, CXs, EYs, CHs, TOPs, head_mask, _grid

STYLES = ["kurz", "scheitel", "buzz", "zurueck", "bob"]


def render_hair(p, age, style, seed=0):
    rng = np.random.RandomState(seed + 1000)
    X, Y = _grid()
    shape = X.shape
    m, hw = head_mask(p, X, Y)
    R = p["head_w"] * S / 2.0
    dx = X - CXs
    hw = np.broadcast_to(np.maximum(hw, 0)[:, None], X.shape)
    adx = np.abs(dx) / R
    rec = [0.0, 0.12, 0.35, 0.6][age] * p.get("recede", 1.0)
    gray = [0.0, 0.10, 0.50, 0.92][age] * p.get("gray_mul", 1.0)
    vol = {"kurz": 22, "scheitel": 34, "buzz": 5, "zurueck": 14, "bob": 26}[style]
    thick = {"kurz": 12, "scheitel": 14, "buzz": 5, "zurueck": 8, "bob": 22}[style]
    hl = ANCHORS["hairline_y"] * S - (rec * 70) * (1 if style != "buzz" else 0.3)
    yh = hl + 62 * adx ** 2.2 - rec * 95 * np.clip(adx, 0, 1) ** 1.5 * (adx < 0.95)
    ss = np.clip((adx - 0.74) / 0.26, 0, 1)
    ss = ss * ss * (3 - 2 * ss)
    yh = yh * (1 - ss) + (EYs - 18 + 30 * ss) * ss
    if style == "scheitel":
        side = -1 if p.get("part", 1) > 0 else 1
        yh = yh + 18 * np.clip(dx * side / R, -1, 1) - 6
    # äußere Hüllkurve
    yc2 = TOPs + 120
    rx = R + thick
    ry = yc2 - (TOPs - vol)
    ell = np.where(Y <= yc2, rx * np.sqrt(np.clip(1 - ((yc2 - Y) / ry) ** 2, 0, 1)), 0)
    ho = np.maximum(ell, np.where((Y > yc2) & (Y < CHs), hw + thick * 0.9, 0))
    inside = (np.abs(dx) <= ho) & (ho > 1)
    top_zone = Y < yh
    side_zone = (adx > 0.93) & (Y < EYs - 10) & (np.abs(dx) <= ho)
    hair = inside & (top_zone | side_zone)
    if style == "bob":
        extra = np.where(Y < EYs - 30, 58.0, 58.0 * np.sqrt(np.clip(1 - ((Y - (EYs - 30)) / (CHs - EYs + 80)) ** 2, 0, 1)))
        ramp = np.clip((Y - (TOPs + 40)) / (EYs - 60 - (TOPs + 40)), 0, 1)
        extra = extra * (ramp * ramp * (3 - 2 * ramp))
        bob = (adx > 0.74) & (Y < CHs + 20) & (Y > TOPs + 60) & (np.abs(dx) <= hw + extra)
        hair = hair | bob
        hair &= ~((adx < 0.74) & (Y > yh + 40))
    if style == "zurueck":
        hair &= (Y < yh + 2) | side_zone
    if rec > 0.55 and style in ("kurz", "scheitel", "buzz"):
        # Tonsur: Scheitel kahl, nur Kranz an den Seiten
        crown = (np.abs(dx) < R * (0.5 + 0.0 * rec)) & (Y > TOPs + 2 * (1 - rec) * 40) & (Y < TOPs + 150)
        if style != "buzz":
            hair &= ~(crown & (rng.rand(RH, RW) < 0.0 + 0.0) | crown)
            hair |= side_zone & inside
    mask = hair.astype(np.float32)
    mask = blur(mask, 2.0)
    # Randunschärfe: Haarspitzen
    edge = np.clip(1 - np.abs(mask - 0.5) * 2, 0, 1)
    nz = blur(rng.randn(RH, RW).astype(np.float32), 1.2)
    mask = np.clip(mask + nz * 0.5 * edge, 0, 1)
    if style == "buzz":
        mask *= 0.55
    # Beleuchtung
    zh = blur(mask * 90, 14) + blur(mask * 60, 40)
    zh += 40 * np.sqrt(np.clip(1 - ((Y - (TOPs + 40)) / 260.0) ** 2, 0, 1)) * (mask > 0.1)
    sh = lambert(zh * 0.55)
    # Strähnen
    L = Image.new("L", (RW, RH), 128)
    ld = ImageDraw.Draw(L)
    cx0, cy0 = CXs - OX, TOPs + 120 - OY
    ys, xs = np.nonzero(mask > 0.4)
    n = len(ys)
    if n:
        sel = rng.choice(n, size=min(n, 5200), replace=False)
        for i in sel:
            x, y = xs[i], ys[i]
            vx, vy = x - cx0, y - cy0
            ang = np.arctan2(vy, vx) + (0.25 * np.sign(vx) if style != "zurueck" else 0)
            if style == "bob":
                ang = np.pi / 2 + 0.2 * np.sign(vx)
            if style == "scheitel":
                ang = np.arctan2(vy, vx) + (0.7 if vx < -30 else -0.5)
            ln = rng.randint(18, 46)
            x2, y2 = x + np.cos(ang) * ln, y + np.sin(ang) * ln
            ld.line([(x, y), (x2, y2)], fill=int(128 + rng.randn() * 55), width=int(rng.choice([2, 3])))
    La = np.asarray(L.filter(ImageFilter.GaussianBlur(0.8)), np.float32) / 128.0
    hc = np.array(p["hair"], np.float32)
    gr = np.array([208, 206, 202], np.float32)
    gmap = np.clip(gray + blur(rng.randn(RH, RW).astype(np.float32), 3.0) * 1.2 * (0.25 if gray > 0.05 else 0) + 0.25 * gray * np.clip(adx, 0, 1), 0, 1)[..., None]
    col = hc * (1 - gmap) + gr * gmap
    col = col * (0.34 + 0.70 * sh[..., None]) * (0.55 + 0.45 * La[..., None])
    # Glanzlicht oben links
    col += 14 * np.clip(sh[..., None] - 0.95, 0, 1) * 4
    # Schläfen- und Nackenschatten
    img = arr_to_img(col, mask)
    full = new_layer()
    full.alpha_composite(img, (OX, OY))
    return finish(full, 0.5)
