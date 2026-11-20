"""Narben-Layer (frei kombinierbar, getrennte Gesichtsregionen, nur Alpha-Pixel auf der Haut)."""
from __future__ import annotations
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from pcommon import *
from face import arc

SCARS = {
    "wange": "Schnittnarbe linke Wange (Bildlinks), diagonal vom Jochbein zum Mundwinkel",
    "braue": "Schnitt durch die rechte Braue (Bildrechts), über das Lid",
    "kiefer": "Verbrennung/Granatsplitter-Narbe Kiefer und Kinn (Bildrechts)",
}


def _poly(d, pts, fill, w):
    d.line(pts, fill=fill, width=w, joint="curve")


def render_scar(name, seed=0):
    rng = np.random.RandomState(seed + 5)
    img = Image.new("RGBA", (SW, SH), (0, 0, 0, 0))
    base = Image.new("L", (SW, SH), 0)      # Narbengewebe
    hl = Image.new("L", (SW, SH), 0)        # Glanz auf Wulst
    st = Image.new("L", (SW, SH), 0)        # Nahtmarken
    bd, hd, sd = ImageDraw.Draw(base), ImageDraw.Draw(hl), ImageDraw.Draw(st)
    cx, ey, ch = CX * S, EYE_Y * S, CHIN_Y * S
    pts = []
    if name == "wange":
        # von Jochbein (links) schräg nach unten zum Mundwinkel
        p0, p1 = (cx - 132, ey + 62), (cx - 78, ey + 150)
        pts = arc(p0[0], p0[1], p1[0], p1[1], (-10, 6), 24)
        _poly(bd, pts, 255, 10)
        _poly(hd, [(x - 2, y - 2) for x, y in pts], 255, 3)
        for i in range(2, 22, 3):
            x, y = pts[i]
            sd.line([(x - 9, y - 6), (x + 9, y + 6)], fill=255, width=3)
    elif name == "braue":
        # durch die rechte Braue und über das Lid
        p0, p1 = (cx + 70, ey - 100), (cx + 96, ey + 24)
        pts = arc(p0[0], p0[1], p1[0], p1[1], (8, 0), 22)
        _poly(bd, pts, 255, 9)
        _poly(hd, [(x + 2, y - 2) for x, y in pts], 255, 3)
        for i in range(2, 20, 4):
            x, y = pts[i]
            sd.line([(x - 8, y), (x + 8, y)], fill=255, width=3)
    elif name == "kiefer":
        # Verbrennung: unregelmäßiger Fleck am Kiefer rechts + Zug zum Hals
        c0 = (cx + 66, ch - 52)
        poly = []
        for i in range(24):
            a = i / 24 * 2 * np.pi
            r = 46 + 14 * np.sin(a * 3 + 1) + rng.uniform(-6, 6)
            poly.append((c0[0] + np.cos(a) * r * 0.52, c0[1] + np.sin(a) * r * 0.85))
        bd.polygon(poly, fill=255)
        pts = arc(c0[0] - 20, c0[1] - 30, c0[0] - 6, ch + 4, (6, 4), 14)
        _poly(bd, pts, 255, 8)
        hd.polygon([(x - 4, y - 4) for x, y in poly[:12]], fill=120)
    B = blur(np.asarray(base, np.float32) / 255.0, 2.0)
    if name == "kiefer":
        noise = blur(rng.randn(SH, SW).astype(np.float32), 5) * 1.6
        B = np.clip(B + noise * B * 0.5, 0, 1)
    Hh = blur(np.asarray(hl, np.float32) / 255.0, 1.5)
    Sd = blur(np.asarray(st, np.float32) / 255.0, 1.0)
    if name == "kiefer":
        col = np.array([158, 84, 78], np.float32)
        a = np.clip(B * 0.75, 0, 0.85)
    else:
        col = np.array([176, 108, 98], np.float32)
        a = np.clip(B * 0.9, 0, 0.9)
    rgb = np.ones((SH, SW, 3), np.float32) * col
    rgb = rgb * (1 - 0.35 * np.clip(blur(B, 5) - B, 0, 1)[..., None] * 0) + Hh[..., None] * np.array([60, 55, 52])
    rgb = rgb - Sd[..., None] * np.array([70, 60, 60])
    # dunkler Rand
    edge = np.clip(blur(B, 2.2) - blur(B, 5.0) * 0.0, 0, 1)
    rim = np.clip(B - blur(B, 4), 0, 1)
    rgb = rgb - np.clip(blur(B, 4.0) - B, 0, 1)[..., None] * 0
    rgb = rgb * (1 - 0.30 * rim[..., None] * 3)
    out = arr_to_img(rgb, a)
    return finish(out, 0.5)
