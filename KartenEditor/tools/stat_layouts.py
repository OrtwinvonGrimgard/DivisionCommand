#!/usr/bin/env python3
"""Wo sitzen AP, ATK, DEF — acht Layouts auf Mini-Karten."""
from __future__ import annotations
import math, os, sys
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageFilter

sys.path.insert(0, os.path.dirname(__file__))
from render import (
    FONT_B, FONT_N, GOLD, GOLD_DK, GOLD_LT, CARDS, ROOT, font,
    cover_art, dispatch_panel, gold_band, round_mask,
)

OUT = os.path.join(ROOT, "samples", "stat-layouts.png")
ART = os.path.join(CARDS, "Nachtpatrouille.jpg")
CW, CH = 420, 584  # 1536x2136 scaled
ACCENT = (212, 170, 78)


def fnt(path, size):
    return ImageFont.truetype(path, size)


def base_card():
    im = Image.new("RGB", (CW, CH), (28, 22, 14))
    n = Image.effect_noise((CW, CH), 16).convert("L")
    im = Image.blend(im, Image.merge("RGB", (n, n, n)), 0.1)
    return im


def paste_art(im, box):
    x0, y0, x1, y1 = box
    art = cover_art(ART, x1 - x0, y1 - y0)
    art = ImageEnhance.Contrast(art).enhance(1.05)
    im.paste(art, (x0, y0))
    return im


def frame(d):
    gold_band(d, (3, 3, CW - 4, CH - 4), width=8)
    d.rounded_rectangle((12, 12, CW - 13, CH - 13), 10, outline=(72, 92, 48), width=3)


def name_bar(d, y, h=28):
    d.rectangle((18, y, CW - 19, y + h), fill=(28, 16, 8), outline=GOLD, width=2)
    d.text((CW / 2, y + h / 2), "NACHTPATROUILLE", font=fnt(FONT_N, 13), fill=GOLD_LT, anchor="mm")


def type_bar(d, y, h=18):
    d.rectangle((18, y, CW - 19, y + h), fill=(72, 92, 48))
    d.text((CW / 2, y + h / 2), "EINHEIT  ·  INFANTERIE", font=fnt(FONT_N, 9), fill=GOLD_LT, anchor="mm")


def text_box(im, box):
    x0, y0, x1, y1 = box
    p = dispatch_panel((x1 - x0, y1 - y0), (42, 28, 16))
    im.paste(p, (x0, y0))
    d = ImageDraw.Draw(im)
    d.rectangle(box, outline=GOLD, width=2)
    d.text((x0 + 10, y0 + 8), "Tarnung", font=fnt(FONT_B, 12), fill=ACCENT)
    d.text((x0 + 10, y0 + 24), "Darf verdeckt gelegt werden.", font=fnt(FONT_N, 10), fill=(236, 220, 186))
    return im, d


def ap_coin(d, cx, cy, r=28):
    d.ellipse((cx - r - 3, cy - r - 3, cx + r + 3, cy + r + 3), fill=(18, 10, 6), outline=GOLD, width=3)
    d.ellipse((cx - r + 4, cy - r + 4, cx + r - 4, cy + r - 4), fill=(48, 26, 10), outline=GOLD_LT, width=2)
    d.text((cx, cy - 10), "AP", font=fnt(FONT_N, 8), fill=ACCENT, anchor="mm")
    d.text((cx, cy + 8), "3", font=fnt(FONT_B, 18), fill=(250, 236, 196), anchor="mm")


def plate(d, x, y, w, h, lab, n):
    d.rounded_rectangle((x, y, x + w, y + h), 5, fill=(22, 12, 8), outline=GOLD, width=2)
    d.text((x + w / 2, y + 10), lab, font=fnt(FONT_N, 8), fill=ACCENT, anchor="mm")
    d.text((x + w / 2, y + h / 2 + 6), str(n), font=fnt(FONT_B, 18), fill=(250, 236, 196), anchor="mm")


def combo(d, x, y, w, h):
    d.rounded_rectangle((x, y, x + w, y + h), 6, fill=(22, 12, 8), outline=GOLD, width=2)
    d.text((x + w * 0.28, y + 8), "ATK", font=fnt(FONT_N, 8), fill=ACCENT, anchor="mm")
    d.text((x + w * 0.72, y + 8), "DEF", font=fnt(FONT_N, 8), fill=ACCENT, anchor="mm")
    d.text((x + w * 0.28, y + h / 2 + 6), "3", font=fnt(FONT_B, 18), fill=(250, 236, 196), anchor="mm")
    d.text((x + w * 0.72, y + h / 2 + 6), "4", font=fnt(FONT_B, 18), fill=(250, 236, 196), anchor="mm")
    d.line([(x + w / 2, y + 6), (x + w / 2, y + h - 6)], fill=GOLD_DK, width=1)


def logo_tiny(im, cx, cy, max_w=90):
    path = os.path.join(ROOT, "assets", "title-logo.png")
    if not os.path.isfile(path):
        return
    logo = Image.open(path).convert("RGBA")
    sc = max_w / logo.size[0]
    logo = logo.resize((int(logo.size[0] * sc), int(logo.size[1] * sc)), Image.Resampling.LANCZOS)
    x = int(cx - logo.size[0] / 2)
    y = int(cy - logo.size[1] / 2)
    layer = im.convert("RGBA")
    layer.alpha_composite(logo, (x, y))
    return layer.convert("RGB")


def finish(im):
    m = round_mask((CW, CH), 16)
    table = Image.new("RGB", (CW, CH), (8, 4, 3))
    return Image.composite(im, table, m)


def layout_a():
    """Aktuell: AP auf Motiv, ATK/DEF unten außen."""
    im = base_card()
    im = paste_art(im, (20, 22, CW - 21, 250))
    d = ImageDraw.Draw(im)
    frame(d)
    d.rectangle((20, 22, CW - 21, 250), outline=GOLD, width=1)
    ap_coin(d, 52, 54, 26)
    name_bar(d, 248, 26)
    type_bar(d, 274, 16)
    im, d = text_box(im, (20, 294, CW - 21, 500))
    plate(d, 20, 508, 72, 48, "ATK", 3)
    plate(d, CW - 93, 508, 72, 48, "DEF", 4)
    im = logo_tiny(im, CW / 2, 532, 86) or im
    return finish(im)


def layout_b():
    """Magic: AP oben links, ATK/DEF ein Kasten unten rechts."""
    im = base_card()
    im = paste_art(im, (20, 22, CW - 21, 268))
    d = ImageDraw.Draw(im)
    frame(d)
    d.rectangle((20, 22, CW - 21, 268), outline=GOLD, width=1)
    ap_coin(d, 52, 54, 26)
    name_bar(d, 266, 26)
    type_bar(d, 292, 16)
    im, d = text_box(im, (20, 312, CW - 21, 500))
    combo(d, CW - 158, 508, 136, 48)
    im = logo_tiny(im, 90, 532, 80) or im
    return finish(im)


def layout_c():
    """Kopfleiste: AP ATK DEF in einer Zeile über dem Motiv."""
    im = base_card()
    d = ImageDraw.Draw(im)
    frame(d)
    d.rectangle((20, 22, CW - 21, 58), fill=(22, 12, 8), outline=GOLD, width=2)
    for i, (lab, n) in enumerate((("AP", "3"), ("ATK", "3"), ("DEF", "4"))):
        x = 20 + i * 126
        d.text((x + 30, 30), lab, font=fnt(FONT_N, 9), fill=ACCENT, anchor="mm")
        d.text((x + 78, 40), n, font=fnt(FONT_B, 22), fill=(250, 236, 196), anchor="mm")
        if i < 2:
            d.line([(x + 126, 26), (x + 126, 54)], fill=GOLD_DK, width=1)
    im = paste_art(im, (20, 62, CW - 21, 270))
    d = ImageDraw.Draw(im)
    d.rectangle((20, 62, CW - 21, 270), outline=GOLD, width=1)
    name_bar(d, 268, 26)
    type_bar(d, 294, 16)
    im, d = text_box(im, (20, 314, CW - 21, 530))
    im = logo_tiny(im, CW / 2, 554, 90) or im
    return finish(im)


def layout_d():
    """Motiv-HUD: Werte auf dem unteren Bildrand."""
    im = base_card()
    im = paste_art(im, (20, 22, CW - 21, 280))
    d = ImageDraw.Draw(im)
    frame(d)
    d.rectangle((20, 22, CW - 21, 280), outline=GOLD, width=1)
    d.rectangle((22, 236, CW - 23, 278), fill=(10, 6, 4, ))
    overlay = Image.new("RGBA", (CW, CH), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.rectangle((22, 232, CW - 23, 278), fill=(8, 4, 2, 190))
    im = Image.alpha_composite(im.convert("RGBA"), overlay).convert("RGB")
    d = ImageDraw.Draw(im)
    for i, (lab, n) in enumerate((("AP", "3"), ("ATK", "3"), ("DEF", "4"))):
        x = 70 + i * 120
        d.text((x, 244), lab, font=fnt(FONT_N, 9), fill=ACCENT, anchor="mm")
        d.text((x + 36, 256), n, font=fnt(FONT_B, 20), fill=(250, 236, 196), anchor="mm")
    name_bar(d, 282, 26)
    type_bar(d, 308, 16)
    im, d = text_box(im, (20, 328, CW - 21, 548))
    im = logo_tiny(im, CW / 2, 564, 80) or im
    return finish(im)


def layout_e():
    """Namensflanken: ATK und DEF sitzen links/rechts im Namensschild."""
    im = base_card()
    im = paste_art(im, (20, 22, CW - 21, 268))
    d = ImageDraw.Draw(im)
    frame(d)
    d.rectangle((20, 22, CW - 21, 268), outline=GOLD, width=1)
    ap_coin(d, 52, 54, 24)
    d.rectangle((18, 266, CW - 19, 304), fill=(28, 16, 8), outline=GOLD, width=2)
    d.text((50, 285), "3", font=fnt(FONT_B, 18), fill=(250, 236, 196), anchor="mm")
    d.text((50, 272), "ATK", font=fnt(FONT_N, 7), fill=ACCENT, anchor="mm")
    d.text((CW / 2, 285), "NACHTPATROUILLE", font=fnt(FONT_N, 11), fill=GOLD_LT, anchor="mm")
    d.text((CW - 50, 272), "DEF", font=fnt(FONT_N, 7), fill=ACCENT, anchor="mm")
    d.text((CW - 50, 285), "4", font=fnt(FONT_B, 18), fill=(250, 236, 196), anchor="mm")
    type_bar(d, 304, 16)
    im, d = text_box(im, (20, 324, CW - 21, 548))
    im = logo_tiny(im, CW / 2, 564, 80) or im
    return finish(im)


def layout_f():
    """Typzeile trägt die Zahlen rechts."""
    im = base_card()
    im = paste_art(im, (20, 22, CW - 21, 270))
    d = ImageDraw.Draw(im)
    frame(d)
    d.rectangle((20, 22, CW - 21, 270), outline=GOLD, width=1)
    ap_coin(d, 52, 54, 24)
    name_bar(d, 268, 24)
    d.rectangle((18, 292, CW - 19, 318), fill=(72, 92, 48))
    d.text((22, 305), "EINHEIT · INFANTERIE", font=fnt(FONT_N, 8), fill=GOLD_LT, anchor="lm")
    d.text((CW - 118, 305), "AP 3", font=fnt(FONT_B, 10), fill=GOLD_LT, anchor="mm")
    d.text((CW - 74, 305), "ATK 3", font=fnt(FONT_B, 10), fill=GOLD_LT, anchor="mm")
    d.text((CW - 30, 305), "DEF 4", font=fnt(FONT_B, 10), fill=GOLD_LT, anchor="mm")
    im, d = text_box(im, (20, 322, CW - 21, 548))
    im = logo_tiny(im, CW / 2, 564, 80) or im
    return finish(im)


def layout_g():
    """Rechte Schiene am Motiv."""
    im = base_card()
    im = paste_art(im, (20, 22, CW - 70, 270))
    d = ImageDraw.Draw(im)
    frame(d)
    d.rectangle((20, 22, CW - 70, 270), outline=GOLD, width=1)
    d.rectangle((CW - 68, 22, CW - 21, 270), fill=(22, 12, 8), outline=GOLD, width=2)
    for i, (lab, n) in enumerate((("AP", "3"), ("ATK", "3"), ("DEF", "4"))):
        y = 50 + i * 72
        d.text((CW - 44, y), lab, font=fnt(FONT_N, 8), fill=ACCENT, anchor="mm")
        d.text((CW - 44, y + 22), n, font=fnt(FONT_B, 20), fill=(250, 236, 196), anchor="mm")
    name_bar(d, 272, 24)
    type_bar(d, 296, 16)
    im, d = text_box(im, (20, 316, CW - 21, 548))
    im = logo_tiny(im, CW / 2, 564, 80) or im
    return finish(im)


def layout_h():
    """Unten eine durchgehende Leiste: ATK · Logo · DEF, AP klein dabei."""
    im = base_card()
    im = paste_art(im, (20, 22, CW - 21, 278))
    d = ImageDraw.Draw(im)
    frame(d)
    d.rectangle((20, 22, CW - 21, 278), outline=GOLD, width=1)
    name_bar(d, 276, 24)
    type_bar(d, 300, 16)
    im, d = text_box(im, (20, 320, CW - 21, 500))
    d.rectangle((18, 504, CW - 19, 560), fill=(22, 12, 8), outline=GOLD, width=2)
    d.text((48, 518), "AP", font=fnt(FONT_N, 8), fill=ACCENT, anchor="mm")
    d.text((48, 540), "3", font=fnt(FONT_B, 20), fill=(250, 236, 196), anchor="mm")
    d.text((108, 518), "ATK", font=fnt(FONT_N, 8), fill=ACCENT, anchor="mm")
    d.text((108, 540), "3", font=fnt(FONT_B, 20), fill=(250, 236, 196), anchor="mm")
    d.text((CW - 48, 518), "DEF", font=fnt(FONT_N, 8), fill=ACCENT, anchor="mm")
    d.text((CW - 48, 540), "4", font=fnt(FONT_B, 20), fill=(250, 236, 196), anchor="mm")
    im = logo_tiny(im, CW / 2, 532, 100) or im
    return finish(im)


LAYOUTS = [
    ("A  AKTUELL\nAP aufs Motiv, ATK/DEF unten außen", layout_a),
    ("B  MAGIC\nAP oben, ATK+DEF ein Kasten rechts", layout_b),
    ("C  KOPFLEISTE\nDrei Werte über dem Motiv, Bild frei", layout_c),
    ("D  MOTIV-HUD\nWerte auf dem unteren Bildrand", layout_d),
    ("E  NAMENSFLANKEN\nATK und DEF im Namensschild", layout_e),
    ("F  TYPZEILE\nZahlen rechts in der Emaille-Leiste", layout_f),
    ("G  RECHTE SCHIENE\nAP ATK DEF am Motivrand", layout_g),
    ("H  FUSSLEISTE\nAlles unten, Motiv ungestört", layout_h),
]


def main():
    cols, rows = 2, 4
    pad, cap = 28, 56
    sheet_w = pad + cols * (CW + pad)
    sheet_h = pad + rows * (CH + cap + pad) + 40
    sheet = Image.new("RGB", (sheet_w, sheet_h), (12, 8, 6))
    n = Image.effect_noise((sheet_w, sheet_h), 14).convert("L")
    sheet = Image.blend(sheet, Image.merge("RGB", (n, n, n)), 0.08)
    d = ImageDraw.Draw(sheet)
    d.text((sheet_w / 2, 26), "WO SITZEN AP · ATK · DEF", font=fnt(FONT_B, 22), fill=GOLD_LT, anchor="mm")
    for i, (title, fn) in enumerate(LAYOUTS):
        r, c = divmod(i, cols)
        # 2-col: i//2 row, i%2 col
        r, c = i // cols, i % cols
        x = pad + c * (CW + pad)
        y = 48 + r * (CH + cap + pad)
        card = fn()
        sheet.paste(card, (x, y))
        for j, line in enumerate(title.split("\n")):
            d.text((x + CW / 2, y + CH + 14 + j * 16), line, font=fnt(FONT_N, 12), fill=GOLD if j == 0 else (186, 154, 90), anchor="mm")
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    sheet.save(OUT, "PNG")
    print("wrote", OUT, sheet.size)


if __name__ == "__main__":
    main()
