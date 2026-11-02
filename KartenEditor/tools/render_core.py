"""Karten-Kernrenderer. Reiner Python, läuft unter 3.10–3.14."""
from __future__ import annotations

import math
import os
import random
import re
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont
import numpy as np

ROOT = Path(__file__).resolve().parent.parent
CARDS = ROOT / "assets" / "cards"
OUT = ROOT / "samples"
W, H = 1536, 2136
GOLD = (214, 176, 86)
GOLD_DK = (92, 62, 22)
GOLD_LT = (246, 224, 160)
METAL_FILL = (48, 36, 18)
TAG_GAP = 14

METALS = {
    "bronze": {"GOLD": (140, 84, 36), "GOLD_DK": (72, 40, 16), "GOLD_LT": (188, 124, 58), "METAL_FILL": (42, 24, 12)},
    "gold": {"GOLD": (214, 176, 86), "GOLD_DK": (92, 62, 22), "GOLD_LT": (246, 224, 160), "METAL_FILL": (48, 36, 18)},
    "silber": {"GOLD": (168, 176, 184), "GOLD_DK": (72, 78, 86), "GOLD_LT": (220, 226, 230), "METAL_FILL": (40, 44, 48)},
}
PAL = {
    "Ausrüstung": {"accent": (176, 184, 188), "enamel": (70, 82, 90), "leather": (16, 18, 22), "pip": "#"},
    "Doktrin": {"accent": (232, 198, 110), "enamel": (168, 124, 40), "leather": (26, 16, 8), "pip": "#"},
    "Einheit": {"accent": (212, 170, 78), "enamel": (72, 92, 48), "leather": (28, 22, 14), "pip": "#"},
    "Soforteinsatz": {"accent": (196, 78, 46), "enamel": (132, 28, 24), "leather": (30, 12, 10), "pip": "#"},
    "Unterstützung": {"accent": (214, 168, 72), "enamel": (128, 86, 28), "leather": (32, 20, 10), "pip": "#"},
}
TAG_COLORS = {
    "ARTILLERIE": (118, 32, 16), "AUFKLARUNG": (16, 58, 64), "AUFKLÄRUNG": (16, 58, 64),
    "AUSRÜSTUNG": (38, 42, 48), "DREHFLÜGLER": (22, 40, 78), "ELITE": (96, 18, 24),
    "FAHRZEUG": (40, 46, 32), "GEPANZERT": (32, 40, 46), "INFANTERIE": (36, 68, 28),
    "KETTE": (28, 28, 24), "LEICHT": (92, 64, 16), "LUFTLANDE": (22, 40, 78),
    "MECH-INFANTERIE": (48, 56, 28), "MG": (70, 38, 14), "MITTEL": (78, 42, 14),
    "MOERSER": (88, 34, 16), "MÖRSER": (88, 34, 16), "PANZER": (72, 48, 16),
    "RAD": (86, 58, 22), "SCHANZEN": (58, 48, 18), "SCHWER": (52, 26, 12),
    "SPAEHER": (16, 58, 64), "SPÄHER": (16, 58, 64), "STELLUNG": (64, 40, 14),
}
SAMPLES = []


def _win_fonts():
    return Path(os.environ.get("WINDIR", r"C:\Windows")) / "Fonts"


def _pick_font(*names):
    roots = [
        Path("/usr/share/fonts/truetype/liberation"),
        Path("/usr/share/fonts/truetype/dejavu"),
        _win_fonts(),
    ]
    for root in roots:
        for name in names:
            p = root / name
            if p.is_file():
                return str(p)
    return None


FONT_B = _pick_font("LiberationSerif-Bold.ttf", "timesbd.ttf", "times.ttf", "georgia.ttf", "DejaVuSerif-Bold.ttf")
FONT_I = _pick_font("LiberationSerif-Italic.ttf", "timesi.ttf", "times.ttf", "georgiai.ttf", "DejaVuSerif-Italic.ttf")
FONT_N = _pick_font("LiberationSansNarrow-Bold.ttf", "ARIALNB.TTF", "arialbd.ttf", "arial.ttf", "calibrib.ttf")
FONT_R = _pick_font("LiberationSerif-Regular.ttf", "times.ttf", "georgia.ttf", "DejaVuSerif.ttf")


def font(path, size):
    p = path or FONT_R
    try:
        return ImageFont.truetype(p, size)
    except Exception:
        return ImageFont.load_default()


def apply_metal(kind):
    g = globals()
    pack = METALS.get(str(kind or "gold").lower(), METALS["gold"])
    g.update(pack)
    return pack


def outlined_num(d, xy, text, fnt, fill=None, stroke=2):
    col = fill or GOLD_LT
    d.text(xy, str(text), font=fnt, fill=col, stroke_width=stroke, stroke_fill=(10, 8, 6), anchor="mm")


def round_mask(size, radius=48):
    w, h = size
    m = Image.new("L", (w, h), 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, w - 1, h - 1), radius=radius, fill=255)
    return m


def rivet(draw, x, y, r=11):
    draw.ellipse((x - r - 2, y - r - 2, x + r + 2, y + r + 2), fill=GOLD_DK, outline=GOLD, width=2)
    draw.ellipse((x - r, y - r, x + r, y + r), fill=(118, 82, 32))
    draw.ellipse((x - r + 3, y - r + 2, x - 1, y + 1), fill=GOLD_LT)


def gold_band(d, box, width=22):
    x0, y0, x1, y1 = box
    d.rounded_rectangle((x0, y0, x1, y1), radius=48, outline=GOLD, width=width)
    d.rounded_rectangle((x0 + 6, y0 + 6, x1 - 6, y1 - 6), radius=42, outline=GOLD_DK, width=2)


def star_verts(cx, cy, r, inner=0.4):
    pts = []
    for i in range(5):
        a = math.radians(-90 + i * 72)
        pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
        a2 = math.radians(-90 + i * 72 + 36)
        pts.append((cx + r * inner * math.cos(a2), cy + r * inner * math.sin(a2)))
    return pts


def tag_color(name):
    return TAG_COLORS.get(str(name).upper(), (48, 32, 16))


def card_is_elite(card):
    if str((card or {}).get("klasse") or "").lower() == "elite":
        return True
    tags = (card or {}).get("tags") or []
    return any(str(t).lower() == "elite" for t in tags)


def gameplay_tags(card):
    skip = {"infanterie", "artillerie", "panzer", "aufklärer", "aufklärung", "aufklarung"}
    out = []
    for t in (card or {}).get("tags") or []:
        n = str(t).strip()
        if n and n.lower() not in skip:
            out.append(n)
    return out[:4]


def wrap(draw, text, fnt, max_w):
    words = str(text or "").split()
    lines, cur = [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=fnt) <= max_w:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def abilities(text):
    raw = (text or "").strip()
    if not raw:
        return []
    out = []
    for p in re.split(r"(?<=\.)\s+", raw):
        p = p.strip()
        if not p:
            continue
        m = re.match(r"^([A-ZÄÖÜ][^:]{0,28}):\s*(.*)$", p)
        if m:
            title = m.group(1).strip()
            if len(title.replace("(", " ").split()) <= 3:
                out.append((title, m.group(2).strip()))
                continue
        out.append(("", p))
    return out


def crop_art(path):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    side = min(w, h)
    x = (w - side) // 2
    y = max(0, (h - side) // 6)
    return im.crop((x, y, x + side, y + side))


def cover_art(path, tw, th):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    sc = max(tw / max(1, w), th / max(1, h))
    nw, nh = max(1, int(w * sc)), max(1, int(h * sc))
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    x = (nw - tw) // 2
    y = max(0, (nh - th) // 5)
    return im.crop((x, y, x + tw, y + th))


def _tex(name, size, fallback=(20, 16, 12)):
    folder = ROOT / "assets" / "textures"
    p = folder / name
    if not p.is_file():
        return Image.new("RGB", size, fallback)
    im = Image.open(p).convert("RGB")
    return im.resize(size, Image.Resampling.LANCZOS)


def marble_panel(size):
    return _tex("marmor-oel.jpg", size, (18, 16, 14))


def rotleder_panel(size):
    return _tex("rotleder-oel.jpg", size, (80, 18, 16))


def brushed_stock(size):
    w, h = size if isinstance(size, tuple) else (int(size), int(size))
    base = _tex("metal-gehaemmert.jpg", (w, h), METAL_FILL)
    return base


def make_panel(kind, size):
    if str(kind) == "leder":
        return rotleder_panel(size)
    return marble_panel(size)


def dispatch_panel(kind, size):
    return make_panel(kind, size)


def paper(size, col=(236, 224, 196)):
    return Image.new("RGB", size, col)


def leather_stitch(draw, box, spacing=18):
    x0, y0, x1, y1 = box
    draw.rounded_rectangle(box, radius=12, outline=(40, 18, 12), width=2)


def taut_leather(img):
    return img


def paste_leather_plaque(stock, box):
    x0, y0, x1, y1 = [int(v) for v in box]
    w, h = max(1, x1 - x0), max(1, y1 - y0)
    patch = rotleder_panel((w, h))
    stock = stock.convert("RGB")
    stock.paste(patch, (x0, y0))
    d = ImageDraw.Draw(stock)
    d.rounded_rectangle((x0, y0, x1, y1), radius=16, outline=GOLD, width=3)
    return stock


def fill_plaque(draw, pts, name, cx, cy, size):
    draw.polygon(pts, fill=(20, 14, 10), outline=GOLD)


def taper_bar(d, cx, y, half, thick):
    d.line([(cx - half, y), (cx + half, y)], fill=GOLD, width=thick)


def doctrine_crest(img, cx, cy):
    d = ImageDraw.Draw(img)
    r = 70
    d.ellipse((cx - r, cy - r, cx + r, cy + r), outline=GOLD, width=6)
    verts = star_verts(cx, cy, 42)
    d.polygon(verts, fill=GOLD)
    return img


def name_plaque(draw, style, ny, name, w=None):
    ww = w or W
    draw.rounded_rectangle((70, ny, ww - 70, ny + 110), radius=8, fill=(20, 14, 10), outline=GOLD, width=3)
    fnt = font(FONT_B, 54 if len(str(name)) < 18 else 42)
    draw.text((ww / 2, ny + 55), str(name), font=fnt, fill=GOLD_LT, anchor="mm")


_AP_KRANZ = ROOT / "assets" / "embleme" / "ap-kranz.png"


def mill_coin(img, cx, cy, r, value):
    """Gespeicherter AP-Kranz (Nabe, Zähne, Logo-Stern). Zahl darüber."""
    base = img.convert("RGBA")
    size = max(32, int(round(float(r) * 2.42)))
    if _AP_KRANZ.is_file():
        wr = Image.open(_AP_KRANZ).convert("RGBA").resize((size, size), Image.Resampling.LANCZOS)
        g = GOLD
        if g != (214, 176, 86):
            arr = np.array(wr, dtype=np.float32)
            arr[..., 0] = np.clip(arr[..., 0] * (g[0] / 214.0), 0, 255)
            arr[..., 1] = np.clip(arr[..., 1] * (g[1] / 176.0), 0, 255)
            arr[..., 2] = np.clip(arr[..., 2] * (g[2] / 86.0), 0, 255)
            wr = Image.fromarray(arr.astype(np.uint8), "RGBA")
        layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
        layer.alpha_composite(wr, (int(cx - wr.width / 2), int(cy - wr.height / 2)))
        base = Image.alpha_composite(base, layer)
    out = base.convert("RGB")
    d = ImageDraw.Draw(out)
    outlined_num(d, (cx, cy), str(value), font(FONT_B, 120), (248, 244, 236), 4)
    return out


def icon_crosshair(draw, cx, cy, r, col=None):
    """Zielscheibe: zwei Kreise und Fadenkreuz."""
    c = col or GOLD
    w = max(3, int(r * 0.12))
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=c, width=w)
    r2 = int(r * 0.52)
    draw.ellipse((cx - r2, cy - r2, cx + r2, cy + r2), outline=c, width=max(2, w - 1))
    draw.line((cx, cy - r, cx, cy + r), fill=c, width=max(2, w - 1))
    draw.line((cx - r, cy, cx + r, cy), fill=c, width=max(2, w - 1))


def icon_shield_norman_cross(draw, cx, cy, r, col=None):
    c = col or GOLD
    draw.rounded_rectangle((cx - r, cy - r, cx + r, cy + r * 1.15), radius=r * 0.3, outline=c, width=3)
    draw.line((cx, cy - r * 0.6, cx, cy + r * 0.6), fill=c, width=3)
    draw.line((cx - r * 0.45, cy - r * 0.15, cx + r * 0.45, cy - r * 0.15), fill=c, width=3)


def draw_stat_box(stock, x, y, label, value, icon):
    d = ImageDraw.Draw(stock)
    d.rounded_rectangle((x, y, x + 280, y + 120), radius=12, outline=GOLD, width=4, fill=(18, 12, 8))
    if icon == "crosshair":
        icon_crosshair(d, x + 50, y + 60, 28, GOLD)
    else:
        icon_shield_norman_cross(d, x + 50, y + 60, 28, GOLD)
    outlined_num(d, (x + 180, y + 60), value, font(FONT_B, 64), GOLD_LT, 3)
    return stock


def draw_tag_banners(d, y, tags, width):
    if not tags:
        return y
    n = min(4, len(tags))
    gap = TAG_GAP
    tw = (width - 140 - gap * (n - 1)) / n
    x = 70
    h = 44
    for t in tags[:n]:
        col = tag_color(t)
        d.rounded_rectangle((x, y, x + tw, y + h), radius=6, fill=col, outline=GOLD_DK, width=2)
        d.text((x + tw / 2, y + h / 2), str(t).upper(), font=font(FONT_N, 22), fill=(240, 230, 200), anchor="mm")
        x += tw + gap
    return y + h


def paste_elite_order(img):
    return img


def paste_logo_star(img, cx, cy, r):
    d = ImageDraw.Draw(img)
    verts = star_verts(cx, cy, r)
    d.polygon(verts, fill=GOLD, outline=GOLD_DK)
    return img


def render(card, art_file, dest, number="001", native=True, metal="gold", panel="marmor", stat_style=None):
    apply_metal(metal)
    globals()["_MARBLE_SEED"] = random.randint(1, 2147483647)
    globals()["_MARBLE_NAME"] = card.get("name") or "marmor"
    typ = card.get("typ") or "Einheit"
    pal = PAL.get(typ) or PAL["Einheit"]
    enamel, accent = pal["enamel"], pal["accent"]
    show_ap = typ == "Einheit"
    show_stats = typ == "Einheit"
    show_art = typ != "Doktrin"

    stock = brushed_stock((W, H))
    # Quadratisch bis zum Rand: Metall ist die Druckfläche.
    # Runde Ecken schneidet die Druckerei. Keine schwarze Maske.

    art_box = (70, 56, W - 70, 872 if show_art else 560)
    tw, th = art_box[2] - art_box[0], art_box[3] - art_box[1]

    if show_art and art_file and os.path.isfile(art_file):
        if native:
            art = cover_art(art_file, tw, th)
        else:
            art = crop_art(art_file).resize((tw, th), Image.Resampling.LANCZOS)
        art = ImageEnhance.Contrast(ImageEnhance.Color(art).enhance(1.08)).enhance(1.08)
        aw, ah = art.size
        am = Image.new("L", (aw, ah), 255)
        ad = ImageDraw.Draw(am)
        for i in range(70):
            ad.rectangle((i, i, aw - 1 - i, ah - 1 - i), outline=255 - int(i * 1.6))
        art = Image.composite(art, Image.new("RGB", (aw, ah), (10, 6, 4)), am)
        stock.paste(art, (art_box[0], art_box[1]))
    elif not show_art:
        stock.paste(make_panel("marmor", (tw, th)), (art_box[0], art_box[1]))

    shade = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    sd = ImageDraw.Draw(shade)
    ax0, ay0, ax1, ay1 = art_box
    for i in range(18):
        sd.rectangle((ax0 - i, ay0 - i, ax1 + i, ay1 + i), outline=(0, 0, 0, 16))
    fade = 140
    for i in range(fade):
        a = int(210 * (i / fade) ** 1.35)
        y = ay1 - fade + i
        sd.line([(ax0, y), (ax1, y)], fill=(0, 0, 0, a))
    stock = Image.alpha_composite(stock.convert("RGBA"), shade).convert("RGB")

    d = ImageDraw.Draw(stock)
    gold_band(d, (10, 10, W - 11, H - 11), width=22)
    d.rounded_rectangle((34, 34, W - 35, H - 35), radius=36, outline=enamel, width=7)
    d.rounded_rectangle((46, 46, W - 47, H - 47), radius=30, outline=GOLD_DK, width=2)
    d.rectangle(art_box, outline=GOLD, width=3)

    def corner(x, y, dx, dy, s=54):
        d.line([(x, y + dy * s), (x, y), (x + dx * s, y)], fill=GOLD_LT, width=6)
        d.line([(x, y + dy * (s - 10)), (x, y), (x + dx * (s - 10), y)], fill=GOLD_DK, width=2)

    corner(ax0 + 8, ay0 + 8, 1, 1)
    corner(ax1 - 8, ay0 + 8, -1, 1)
    corner(ax0 + 8, ay1 - 8, 1, -1)
    corner(ax1 - 8, ay1 - 8, -1, -1)
    for x, y in ((56, 56), (W - 56, 56), (56, H - 56), (W - 56, H - 56)):
        rivet(d, x, y, 11)

    if typ == "Doktrin":
        stock = doctrine_crest(stock, W / 2, 148)
        d = ImageDraw.Draw(stock)
        nm = card["name"].upper()
        nf = font(FONT_B, 92 if len(nm) < 16 else 70)
        outlined_num(d, (W / 2, 330), nm, nf, fill=GOLD_LT)
        d.line([(160, 510), (W - 160, 510)], fill=GOLD, width=3)
        stock = paste_logo_star(stock, W / 2, 510, 32)
        d = ImageDraw.Draw(stock)

    if show_ap:
        stock = mill_coin(stock, 210, 210, 118, card.get("ap", 0))
        d = ImageDraw.Draw(stock)

    if card_is_elite(card) and typ != "Doktrin":
        stock = paste_elite_order(stock)
        d = ImageDraw.Draw(stock)

    ny = 900
    if typ != "Doktrin":
        name_plaque(d, "rect", ny, card["name"])

    tags = gameplay_tags(card)
    name_bot = ny + 128
    if typ != "Doktrin" and tags:
        ty = name_bot + TAG_GAP
        text_top = draw_tag_banners(d, ty, tags, W) + TAG_GAP
    elif typ == "Doktrin":
        text_top = 644
    else:
        text_top = name_bot + 16

    tx0, ty0, tx1 = 78, text_top, W - 78
    ty1 = 1890 if show_stats else 1988
    later = typ in ("Unterstützung", "Soforteinsatz", "Ausrüstung")
    ink, head_c, flav = (236, 224, 196), accent, (196, 168, 110)
    body = font(FONT_R, 52)
    head = font(FONT_B, 54)
    ff = font(FONT_I, 36)

    if typ == "Doktrin":
        blocks = []
        dummy = ImageDraw.Draw(Image.new("RGB", (10, 10)))
        inner_w = tx1 - tx0 - 80
        for title, rest in abilities(card.get("text") or ""):
            lines = wrap(dummy, rest, body, inner_w)
            hh = 44 + (62 if title else 0) + 64 * max(1, len(lines)) + 32
            blocks.append((title, lines, hh))
        y = ty0
        for title, lines, hh in blocks:
            stock = paste_leather_plaque(stock, (tx0, y, tx1, y + hh))
            d = ImageDraw.Draw(stock)
            ty = y + 40
            if title:
                d.text((W / 2, ty), title, font=head, fill=head_c, anchor="mt")
                ty += 62
            for ln in lines:
                d.text((W / 2, ty), ln, font=body, fill=ink, anchor="mt")
                ty += 64
            y = y + hh + 24
    elif not later:
        box = make_panel(panel, (tx1 - tx0, ty1 - ty0))
        stock.paste(box, (tx0, ty0))
        d = ImageDraw.Draw(stock)
        d.rectangle((tx0, ty0, tx1, ty1), outline=GOLD, width=3)
        y = ty0 + 48
        for title, rest in abilities(card.get("text") or ""):
            if title:
                d.text((tx0 + 36, y), title, font=head, fill=head_c)
                y += 62
            for ln in wrap(d, rest, body, tx1 - tx0 - 72):
                d.text((tx0 + 36, y), ln, font=body, fill=ink)
                y += 64
            y += 18
        flavor = (card.get("flavor") or "").strip()
        if flavor:
            d.line([(tx0 + 90, ty1 - 118), (tx1 - 90, ty1 - 118)], fill=GOLD, width=2)
            fy = ty1 - 78
            quoted = "„" + flavor + "“"
            for ln in wrap(d, quoted, ff, tx1 - tx0 - 80)[:2]:
                d.text((W / 2, fy), ln, font=ff, fill=flav, anchor="mm")
                fy += 48

    if show_stats:
        d = ImageDraw.Draw(stock)
        stock = draw_stat_box(stock, 120, 1920, "ATK", card.get("atk", 0), "crosshair")
        stock = draw_stat_box(stock, W - 400, 1920, "DEF", card.get("def", card.get("def_", 0)), "shield")
        d = ImageDraw.Draw(stock)
        d.text((W / 2, 2078), str(number).zfill(3), font=font(FONT_N, 28), fill=GOLD, anchor="mm")

    os.makedirs(os.path.dirname(dest) or ".", exist_ok=True)
    stock.save(dest, "PNG")
    print("wrote", dest)
    return dest
