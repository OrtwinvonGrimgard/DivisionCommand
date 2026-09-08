#!/usr/bin/env python3
"""Vergleichstafel: AP / ATK / DEF Schilder."""
from __future__ import annotations
import math, os, sys
from PIL import Image, ImageDraw, ImageFilter, ImageFont

sys.path.insert(0, os.path.dirname(__file__))
from render import FONT_B, FONT_N, GOLD, GOLD_DK, GOLD_LT, mill_coin, rivet, font

OUT = os.path.join(os.path.dirname(__file__), "..", "samples", "schilder.png")
ACCENT = (212, 170, 78)
W, H = 1600, 2480


def bg():
    im = Image.new("RGB", (W, H), (14, 8, 6))
    n = Image.effect_noise((W, H), 18).convert("L")
    im = Image.blend(im, Image.merge("RGB", (n, n, n)), 0.08)
    return im


def label_row(d, y, text):
    d.text((80, y), text, font=font(FONT_N, 28), fill=GOLD_LT)


def v1_current(d, y):
    mill_coin(d, 280, y, 78, ACCENT, "AP", 3)
    d.rounded_rectangle((520, y - 70, 760, y + 70), 10, fill=(22, 12, 8), outline=GOLD, width=5)
    rivet(d, 542, y - 48, 8)
    rivet(d, 738, y - 48, 8)
    d.text((640, y - 32), "ATK", font=font(FONT_N, 24), fill=ACCENT, anchor="mm")
    d.text((640, y + 22), "3", font=font(FONT_B, 64), fill=(250, 236, 196), anchor="mm")
    d.rounded_rectangle((860, y - 70, 1100, y + 70), 10, fill=(22, 12, 8), outline=GOLD, width=5)
    rivet(d, 882, y - 48, 8)
    rivet(d, 1078, y - 48, 8)
    d.text((980, y - 32), "DEF", font=font(FONT_N, 24), fill=ACCENT, anchor="mm")
    d.text((980, y + 22), "4", font=font(FONT_B, 64), fill=(250, 236, 196), anchor="mm")


def hexagon(cx, cy, r):
    return [(cx + r * math.cos(math.radians(a)), cy + r * math.sin(math.radians(a))) for a in range(0, 360, 60)]


def v2_stencil(d, y):
    for cx, lab, n in ((280, "AP", "3"), (640, "ATK", "3"), (980, "DEF", "4")):
        d.polygon(hexagon(cx, y, 78), fill=(18, 12, 8), outline=GOLD, width=4)
        d.polygon(hexagon(cx, y, 68), outline=GOLD_DK, width=1)
        d.text((cx, y - 28), lab, font=font(FONT_N, 22), fill=ACCENT, anchor="mm")
        d.text((cx, y + 18), n, font=font(FONT_B, 58), fill=(250, 236, 196), anchor="mm")


def v3_dogtag(d, y):
    mill_coin(d, 280, y, 70, ACCENT, "AP", 3)
    def tag(x, lab, n):
        d.rounded_rectangle((x, y - 62, x + 220, y + 70), 40, fill=(70, 72, 68), outline=(180, 182, 170), width=4)
        d.ellipse((x + 96, y - 88, x + 124, y - 58), outline=(180, 182, 170), width=4)
        d.text((x + 110, y - 18), lab, font=font(FONT_N, 20), fill=(30, 28, 22), anchor="mm")
        d.text((x + 110, y + 28), n, font=font(FONT_B, 56), fill=(18, 16, 12), anchor="mm")
    tag(520, "ATK", "3")
    tag(860, "DEF", "4")


def v4_enamel(d, y):
    cols = [(280, "AP", "3", (86, 56, 18)), (640, "ATK", "3", (92, 28, 22)), (980, "DEF", "4", (42, 62, 40))]
    for cx, lab, n, fill in cols:
        d.ellipse((cx - 82, y - 82, cx + 82, y + 82), fill=(18, 10, 6), outline=GOLD, width=6)
        d.ellipse((cx - 68, y - 68, cx + 68, y + 68), fill=fill, outline=GOLD_LT, width=3)
        d.text((cx, y - 26), lab, font=font(FONT_N, 20), fill=GOLD_LT, anchor="mm")
        d.text((cx, y + 20), n, font=font(FONT_B, 56), fill=(250, 236, 196), anchor="mm")


def v5_crate(d, y):
    mill_coin(d, 280, y, 70, ACCENT, "AP", 3)
    def crate(x, lab, n):
        d.rectangle((x, y - 68, x + 230, y + 68), fill=(48, 30, 14), outline=GOLD, width=4)
        d.line([(x + 10, y - 68), (x + 10, y + 68)], fill=GOLD_DK, width=3)
        d.line([(x + 220, y - 68), (x + 220, y + 68)], fill=GOLD_DK, width=3)
        d.text((x + 115, y - 28), lab, font=font(FONT_N, 22), fill=GOLD, anchor="mm")
        d.text((x + 115, y + 22), n, font=font(FONT_B, 62), fill=(250, 236, 196), anchor="mm")
    crate(510, "ATK", "3")
    crate(860, "DEF", "4")


def v6_prägung(d, y):
    d.ellipse((280 - 78, y - 78, 280 + 78, y + 78), outline=GOLD_DK, width=3)
    d.text((280, y - 28), "AP", font=font(FONT_N, 22), fill=GOLD_DK, anchor="mm")
    d.text((280, y + 18), "3", font=font(FONT_B, 64), fill=GOLD_LT, anchor="mm")
    for x, lab, n in ((640, "ATK", "3"), (980, "DEF", "4")):
        d.text((x, y - 32), lab, font=font(FONT_N, 22), fill=GOLD_DK, anchor="mm")
        d.text((x + 2, y + 22 + 2), n, font=font(FONT_B, 78), fill=(20, 12, 8), anchor="mm")
        d.text((x, y + 20), n, font=font(FONT_B, 78), fill=GOLD_LT, anchor="mm")


def main():
    im = bg()
    d = ImageDraw.Draw(im)
    d.text((W / 2, 56), "SCHILDER — VARIANTEN", font=font(FONT_B, 36), fill=GOLD_LT, anchor="mm")
    rows = [
        (280, "1  MÜNZE + NIETENPLATTE  (aktuell)", v1_current),
        (640, "2  SECHSECK-SCHABLONE", v2_stencil),
        (1000, "3  HUNDEMARKE", v3_dogtag),
        (1360, "4  EMAILLE-SIEGEL", v4_enamel),
        (1720, "5  KISTEN-STENCIL", v5_crate),
        (2080, "6  PRÄGUNG IM LEDER  (ohne Kasten)", v6_prägung),
    ]
    for y, title, fn in rows:
        label_row(d, y - 150, title)
        fn(d, y)
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    im.save(OUT, "PNG")
    print("wrote", OUT)


if __name__ == "__main__":
    main()
