"""Lädt den Kartenrenderer und setzt den Elite-Orden mit maskiertem Stoffband."""
from __future__ import annotations
import importlib.util
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageChops, ImageFilter
import numpy as np

_here = Path(__file__).resolve().parent
_py = _here / "render_core.py"
_pyc = _here / "render_core.pyc"
if _py.is_file():
    _spec = importlib.util.spec_from_file_location("_dc_render", str(_py))
else:
    _spec = importlib.util.spec_from_file_location("_dc_render", str(_pyc))
_mod = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(_mod)
for _k, _v in vars(_mod).items():
    if not _k.startswith("__"):
        globals()[_k] = _v


def oil_marble_panel(size):
    """Öl-Marmor aus marmor-oel.jpg, Muster je Kartenname neu, Stil bleibt."""
    w, h = size if isinstance(size, tuple) else (int(size), int(size))
    path = Path(__file__).resolve().parent.parent / "assets" / "textures" / "marmor-oel.jpg"
    if not path.is_file():
        return Image.new("RGB", (w, h), (12, 10, 8))
    tex = Image.open(path).convert("RGB")
    card = getattr(_mod, "_current_card", {}) or {}
    rng = np.random.default_rng(_card_seed() or 1)
    tw, th = tex.size
    sc = max(w / max(1, tw), h / max(1, th)) * 1.4
    tex = tex.resize((max(w + 8, int(tw * sc)), max(h + 8, int(th * sc))), Image.Resampling.LANCZOS)
    tw, th = tex.size
    ox = int(rng.integers(0, max(1, tw - w)))
    oy = int(rng.integers(0, max(1, th - h)))
    crop = tex.crop((ox, oy, ox + w, oy + h))
    if float(rng.random()) < 0.5:
        crop = crop.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    veil = Image.new("RGB", (w, h), (0, 0, 0))
    return Image.blend(crop, veil, 0.10)


_mod.marble_panel = oil_marble_panel

_orig_cover = getattr(_mod, "cover_art", None)


def cover_art(path, tw, th):
    """Bild füllt die Box. Zoom ≥ 100 %, art_pan verschiebt den Ausschnitt."""
    card = getattr(_mod, "_current_card", None) or {}
    pan_x = float(card.get("art_pan_x") or 0) / 100.0
    pan_y = float(card.get("art_pan_y") or 0) / 100.0
    zoom = max(1.0, min(3.0, float(card.get("art_zoom") or 100) / 100.0))
    im = Image.open(path).convert("RGB")
    w, h = im.size
    sc = max(tw / max(1, w), th / max(1, h)) * zoom
    nw, nh = max(1, int(w * sc)), max(1, int(h * sc))
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    max_x = max(0, nw - tw)
    max_y = max(0, nh - th)
    x = int(round(max_x / 2 + pan_x * (max_x / 2)))
    y = int(round(max_y / 5 + pan_y * (max_y * 0.5)))
    x = max(0, min(max_x, x))
    y = max(0, min(max_y, y))
    return im.crop((x, y, x + tw, y + th))


_mod.cover_art = cover_art

IVORY = (248, 244, 236)


def draw_edition_label(d, ww, edition, number, footer_star=False):
    """ALPHA - 001 in Elfenbein. Optional Stern hinter der Schrift, gleiche Höhe."""
    label = str(edition or "ALPHA").upper() + " - " + str(number).zfill(3)
    fnt = font(FONT_N, 32)
    cy = 2066
    if not footer_star:
        outlined_num(d, (ww / 2, cy), label, fnt, fill=IVORY, stroke=4)
        return
    dummy = ImageDraw.Draw(Image.new("RGB", (8, 8)))
    box = dummy.textbbox((0, 0), label, font=fnt)
    lw = max(1, box[2] - box[0])
    lh = max(20, box[3] - box[1])
    r = int(lh * 0.48)
    gap = 12
    total = lw + gap + r * 2
    left = ww / 2 - total / 2
    outlined_num(d, (left + lw / 2, cy), label, fnt, fill=IVORY, stroke=4)
    sx = left + lw + gap + r
    verts = star_verts(sx, cy, r)
    d.polygon(verts, fill=IVORY)
    d.line(verts + [verts[0]], fill=(10, 8, 6), width=3)


_orig_brushed = getattr(_mod, "brushed_stock", None)


def brushed_stock(size):
    """Gehämmertes Metall, etwas heller, Körnung unverändert."""
    im = _orig_brushed(size).convert("RGB") if callable(_orig_brushed) else Image.new("RGB", size, (72, 54, 28))
    arr = np.clip(np.array(im, dtype=np.float32) * 1.22 + 14, 0, 255).astype(np.uint8)
    return Image.fromarray(arr, "RGB")


if callable(_orig_brushed):
    _mod.brushed_stock = brushed_stock
    globals()["brushed_stock"] = brushed_stock


def _star_flat(img, cx, cy, r, gold=None, gold_lt=None, gold_dk=None):
    """Fünfzackiger Logo-Stern: Facetten, Linien zur Mitte, Spitzen bis r."""
    d = ImageDraw.Draw(img)
    g = gold or GOLD
    gl = gold_lt or GOLD_LT
    gd = gold_dk or GOLD_DK
    verts = star_verts(cx, cy, r, inner=0.38)
    light_a = math.radians(-48)
    for i in range(10):
        p0, p1 = verts[i], verts[(i + 1) % 10]
        mx, my = (p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2
        ang = math.atan2(my - cy, mx - cx)
        lit = (math.cos(ang - light_a) + 1) * 0.5
        base, hi = (gd, g) if i % 2 else (g, gl)
        t = 0.22 + 0.78 * lit
        col = tuple(int(b * (1 - t) + h * t) for b, h in zip(base, hi))
        d.polygon([(cx, cy), p0, p1], fill=col)
    ink = (8, 8, 10)
    d.line(verts + [verts[0]], fill=ink, width=max(2, int(round(r * 0.055))))
    lw = max(1, int(round(r * 0.016)))
    for p in verts:
        d.line([(cx, cy), p], fill=ink, width=lw)
    return img


_ATK_PNG = Path(__file__).resolve().parent.parent / "assets" / "embleme" / "atk.png"
_DEF_PNG = Path(__file__).resolve().parent.parent / "assets" / "embleme" / "def.png"


def _tint_gold_png(im, gold):
    """Silber/Bronze einfärben, Gold unverändert."""
    ref = np.array([214.0, 176.0, 86.0], dtype=np.float32)
    tgt = np.array(gold[:3], dtype=np.float32)
    if abs(float(tgt.mean()) - float(ref.mean())) <= 12:
        return im
    arr = np.array(im, dtype=np.float32)
    scale = np.divide(tgt, np.maximum(ref, 1.0))
    arr[..., :3] = np.clip(arr[..., :3] * scale, 0, 255)
    return Image.fromarray(arr.astype(np.uint8), "RGBA")


def _paste_emblem(stock, path, cx, cy, size, gold):
    if not path.is_file():
        return stock
    wr = Image.open(path).convert("RGBA")
    wr = wr.resize((size, size), Image.Resampling.LANCZOS)
    wr = _tint_gold_png(wr, gold)
    base = stock.convert("RGBA")
    layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
    layer.alpha_composite(wr, (int(cx - size / 2), int(cy - size / 2)))
    return Image.alpha_composite(base, layer).convert("RGB")


def icon_crosshair(draw, cx, cy, r, col=None):
    """Ziel: zwei Kreise plus Fadenkreuz. Fallback, wenn die PNG fehlt."""
    c = col or GOLD_LT
    w = max(3, int(r * 0.12))
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), outline=c, width=w)
    r2 = int(r * 0.52)
    draw.ellipse((cx - r2, cy - r2, cx + r2, cy + r2), outline=c, width=max(2, w - 1))
    draw.line((cx, cy - r, cx, cy + r), fill=c, width=max(2, w - 1))
    draw.line((cx - r, cy, cx + r, cy), fill=c, width=max(2, w - 1))


def draw_stat_box(stock, x, y, label, value, icon):
    """Messingkasten ATK/DEF: Zielscheibe bzw. Schild aus PNG, sonst Vektor."""
    w, h = 280, 132
    box = (x, y, x + w, y + h)
    d = ImageDraw.Draw(stock)
    gold = tuple(getattr(_mod, "GOLD", GOLD)[:3])
    gold_lt = tuple(getattr(_mod, "GOLD_LT", GOLD_LT)[:3])
    d.rounded_rectangle(box, radius=10, fill=(18, 10, 6), outline=gold, width=4)
    cx_icon = x + int(w * 0.32)
    cx_num = x + int(w * 0.68)
    cy = y + h // 2
    size = 78
    if icon == "crosshair":
        if _ATK_PNG.is_file():
            stock = _paste_emblem(stock, _ATK_PNG, cx_icon, cy, size, gold)
        else:
            d = ImageDraw.Draw(stock)
            icon_crosshair(d, cx_icon, cy, 38, gold_lt)
    else:
        if _DEF_PNG.is_file():
            stock = _paste_emblem(stock, _DEF_PNG, cx_icon, cy, size, gold)
        else:
            d = ImageDraw.Draw(stock)
            icon_shield_norman_cross(d, cx_icon, cy, 40, gold_lt)
    d = ImageDraw.Draw(stock)
    outlined_num(d, (cx_num, cy), str(value), font(FONT_B, 72), fill=gold_lt)
    return stock


def icon_shield_norman_cross(draw, cx, cy, r, col=None):
    """Gewöhnlicher Ritterschild (Heater), Kreuz mittig."""
    col = col or GOLD_LT
    w = max(5, int(r * 0.12))
    top = cy - r * 0.78
    bot = cy + r * 0.98
    half = r * 0.70
    pts = []
    pts.append((cx - half, top))
    pts.append((cx + half, top))
    for i in range(1, 13):
        t = i / 12.0
        x = cx + half * (1.0 - t * t)
        y = top + (bot - top) * (0.28 + 0.72 * t)
        pts.append((x, y))
    pts.append((cx, bot))
    for i in range(11, 0, -1):
        t = i / 12.0
        x = cx - half * (1.0 - t * t)
        y = top + (bot - top) * (0.28 + 0.72 * t)
        pts.append((x, y))
    draw.polygon(pts, fill=(18, 10, 6))
    draw.line(pts + [pts[0]], fill=col, width=w)
    vx, vy = cx, (top + bot) / 2.0 - r * 0.12
    arm = r * 0.36
    yw = max(3, w - 1)
    draw.line([(vx, vy - arm), (vx, vy + arm)], fill=col, width=yw)
    draw.line([(vx - arm, vy), (vx + arm, vy)], fill=col, width=yw)


_mod.draw_stat_box = draw_stat_box
_mod.icon_crosshair = icon_crosshair
_mod.icon_shield_norman_cross = icon_shield_norman_cross


BRANCH_SKIP = {
    "infanterie", "artillerie", "panzer", "aufklarer", "aufklärer",
    "aufklärung", "aufklarung", "späher", "spaeher", "späh", "spahe",
    "infantry", "artillery", "scout",
}


def gameplay_tags(card):
    """Banner-Tags ohne Gattung — die steht im Samt."""
    skip = {
        "sofort", "unterstuetzung", "einheit", "elite", "soforteinsatz",
        "ausrüstung", "unterstützung", "ausruestung", "doktrin",
    } | BRANCH_SKIP
    tags = []
    for t in list(card.get("tags") or []):
        low = str(t).lower().replace("ä", "a").replace("ö", "o").replace("ü", "u")
        if low in skip or str(t).lower() in skip:
            continue
        u = str(t).upper()
        if u not in tags:
            tags.append(u)
    return tags[:4]


_mod.gameplay_tags = gameplay_tags

_orig_mill_coin = _mod.mill_coin
_AP_KRANZ = Path(__file__).resolve().parent.parent / "assets" / "embleme" / "ap-kranz.png"


def mill_coin(img, cx, cy, r, value):
    """Gespeicherter AP-Kranz (Nabe, Zähne, Logo-Stern). Zahl darüber."""
    base = img.convert("RGBA")
    gold = tuple(getattr(_mod, "GOLD", GOLD)[:3])
    gold_lt = tuple(getattr(_mod, "GOLD_LT", GOLD_LT)[:3])
    if _AP_KRANZ.is_file():
        wr = Image.open(_AP_KRANZ).convert("RGBA")
        size = max(32, int(round(float(r) * 2.42)))
        wr = wr.resize((size, size), Image.Resampling.LANCZOS)
        tgt = np.array(gold, dtype=np.float32)
        ref = np.array([214.0, 176.0, 86.0], dtype=np.float32)
        if abs(float(tgt.mean()) - float(ref.mean())) > 12:
            arr = np.array(wr, dtype=np.float32)
            scale = np.divide(tgt, np.maximum(ref, 1.0))
            arr[..., :3] = np.clip(arr[..., :3] * scale, 0, 255)
            wr = Image.fromarray(arr.astype(np.uint8), "RGBA")
        layer = Image.new("RGBA", base.size, (0, 0, 0, 0))
        layer.alpha_composite(wr, (int(cx - wr.width / 2), int(cy - wr.height / 2)))
        base = Image.alpha_composite(base, layer)
    out = base.convert("RGB")
    d = ImageDraw.Draw(out)
    outlined_num(d, (cx, cy), str(value), font(FONT_B, 120), fill=(248, 244, 236), stroke=4)
    return out


_mod.mill_coin = mill_coin


def taper_bar(d, cx, y, half, thick):
    """Konischer Balken, in der Mitte dicker, nach außen leicht kürzer."""
    ht = thick / 2.0
    gold = tuple(getattr(_mod, "GOLD", GOLD)[:3])
    d.polygon(
        [
            (cx - half, y - ht),
            (cx + half, y - ht),
            (cx + half * 0.92, y + ht),
            (cx - half * 0.92, y + ht),
        ],
        fill=gold,
    )


def paste_logo_star(img, cx, cy, r):
    """3D-Stern wie im Hauptlogo: Schlagschatten, Facetten, Innenlinien."""
    pad = int(r * 2.1)
    size = pad * 2 + 8
    ox = oy = size / 2.0
    layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    sh = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh)
    reach = r * 1.55
    for i in range(int(reach), 0, -1):
        a = int(150 * (i / reach) ** 2.2)
        sd.ellipse((ox - i, oy - i, ox + i, oy + i), fill=(0, 0, 0, a))
    sh = sh.filter(ImageFilter.GaussianBlur(max(2, r * 0.14)))
    layer = Image.alpha_composite(layer, sh)
    d = ImageDraw.Draw(layer)
    verts = star_verts(ox, oy, r)
    light_a = math.radians(-48)
    gold = tuple(getattr(_mod, "GOLD", GOLD)[:3])
    gold_dk = tuple(getattr(_mod, "GOLD_DK", GOLD_DK)[:3])
    gold_lt = tuple(getattr(_mod, "GOLD_LT", GOLD_LT)[:3])
    for i in range(10):
        p0 = verts[i]
        p1 = verts[(i + 1) % 10]
        mx = (p0[0] + p1[0]) / 2.0
        my = (p0[1] + p1[1]) / 2.0
        ang = math.atan2(my - oy, mx - ox)
        lit = (math.cos(ang - light_a) + 1) * 0.5
        if i % 2:
            base, hi = gold_dk, gold
        else:
            base, hi = gold, gold_lt
        t = 0.28 + 0.72 * lit
        col = tuple(int(b + (h - b) * t) for b, h in zip(base, hi)) + (255,)
        d.polygon([(ox, oy), p0, p1], fill=col)
    ridge = max(1, int(round(r * 0.045)))
    for p in verts:
        d.line([(ox, oy), p], fill=(12, 12, 14, 230), width=ridge)
    d.line(list(verts) + [verts[0]], fill=(8, 8, 10, 255), width=max(2, int(round(r * 0.08))))
    out = img.convert("RGBA")
    out.alpha_composite(layer, (int(round(cx - ox)), int(round(cy - oy))))
    return out.convert("RGB")


def doctrine_crest(img, cx, cy):
    """Drei verjüngte Balken, drei Sterne (mittlerer größer), wie das Hauptlogo."""
    d = ImageDraw.Draw(img)
    cy = cy + 12
    for i, dy in enumerate((-30, 0, 30)):
        taper_bar(d, cx, cy + dy, 360 - abs(i - 1) * 18, 12)
    img = paste_logo_star(img, cx - 140, cy, 36)
    img = paste_logo_star(img, cx, cy, 54)
    img = paste_logo_star(img, cx + 140, cy, 36)
    return img


_mod.taper_bar = taper_bar
_mod.paste_logo_star = paste_logo_star
_mod.doctrine_crest = doctrine_crest


def draw_tag_banners(d, y, tags, width):
    """Tags als Schilder in Textbreite, zentriert, nicht als durchgehender Balken."""
    if not tags:
        return y
    fnt = font(FONT_N, 32)
    pads, gap, h = 22, TAG_GAP, TAG_H
    max_w = width - 140
    rows = []
    cur = []
    cw = 0
    for t in tags:
        label = str(t)
        tw = int(d.textlength(label, font=fnt)) + pads * 2
        if cur and cw + gap + tw > max_w:
            rows.append((cur, cw))
            cur, cw = [], 0
        if cur:
            cw += gap
        cur.append((label, tw))
        cw += tw
    if cur:
        rows.append((cur, cw))
    gold = tuple(getattr(_mod, "GOLD", GOLD)[:3])
    gold_dk = tuple(getattr(_mod, "GOLD_DK", GOLD_DK)[:3])
    yy = y
    for items, total in rows:
        x = (width - total) / 2.0
        for t, tw in items:
            col = tag_color(t)
            box = (x, yy, x + tw, yy + h)
            d.rounded_rectangle(box, radius=8, fill=col)
            d.rounded_rectangle(box, radius=8, outline=gold, width=3)
            d.rounded_rectangle((x + 4, yy + 4, x + tw - 4, yy + h - 4), radius=5, outline=gold_dk, width=1)
            d.text((x + tw / 2.0, yy + h / 2.0), t, font=fnt, fill=(236, 214, 150), anchor="mm")
            x += tw + gap
        yy += h + TAG_GAP
    return yy - TAG_GAP


_mod.draw_tag_banners = draw_tag_banners


def leather_stitch(draw, box, spacing=110, r=6):
    """Wenige kleine Nieten an den Kanten, keine Perlenkette."""
    x0, y0, x1, y1 = box
    w, h = x1 - x0, y1 - y0
    nx = max(1, min(5, int(round(w / 140))))
    ny = max(1, min(5, int(round(h / 140))))
    gold = tuple(getattr(_mod, "GOLD", GOLD)[:3])
    gold_dk = tuple(getattr(_mod, "GOLD_DK", GOLD_DK)[:3])
    gold_lt = tuple(getattr(_mod, "GOLD_LT", GOLD_LT)[:3])
    pts = []
    for i in range(nx + 1):
        pts.append((x0 + i * w / nx, y0))
    for i in range(1, ny + 1):
        pts.append((x1, y0 + i * h / ny))
    for i in range(1, nx + 1):
        pts.append((x1 - i * w / nx, y1))
    for i in range(1, ny):
        pts.append((x0, y1 - i * h / ny))
    seen = set()
    for px, py in pts:
        key = (round(px), round(py))
        if key in seen:
            continue
        seen.add(key)
        draw.ellipse((px - r, py - r, px + r, py + r), fill=gold, outline=gold_dk)
        draw.ellipse((px - r * 0.45, py - r * 0.6, px + r * 0.25, py + r * 0.15), fill=gold_lt)


def paste_leather_plaque(stock, box):
    """Rotleder mit Goldrahmen und wenigen kleinen Nieten am Rand."""
    x0, y0, x1, y1 = [int(v) for v in box]
    w, h = max(8, x1 - x0), max(8, y1 - y0)
    leather = taut_leather(rotleder_panel((w, h)))
    if leather.mode != "RGB":
        leather = leather.convert("RGB")
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, w - 1, h - 1), radius=18, fill=255)
    stock = stock.convert("RGB")
    stock.paste(leather, (x0, y0), mask)
    d = ImageDraw.Draw(stock)
    gold = tuple(getattr(_mod, "GOLD", GOLD)[:3])
    d.rounded_rectangle((x0, y0, x1, y1), radius=18, outline=gold, width=3)
    leather_stitch(d, (x0 + 12, y0 + 12, x1 - 12, y1 - 12), spacing=110, r=6)
    return stock


_mod.leather_stitch = leather_stitch
_mod.paste_leather_plaque = paste_leather_plaque


STEEL = (122, 124, 118)
STEEL_DK = (28, 30, 26)
STEEL_LT = (168, 164, 148)
STEEL_INK = (8, 8, 6)
_STEEL_TEX = Path(__file__).resolve().parent.parent / "assets" / "textures" / "stahl-gebuerstet.jpg"


def _card_seed():
    card = getattr(_mod, "_current_card", {}) or {}
    s = 1
    for ch in str(card.get("name") or "stahl"):
        s = ((s * 16777619) ^ ord(ch)) & 0xFFFFFFFF
    extra = int(card.get("marble_seed") or 0) & 0xFFFFFFFF
    return (s ^ extra) or 1


def weather_steel(im, seed=None, amount=1.0):
    """Ruß, Rostflecken, Kratzer, Vignette."""
    arr = np.array(im.convert("RGB"), dtype=np.float32)
    h, w = arr.shape[:2]
    rng = np.random.default_rng(int(seed or _card_seed()))
    arr *= 0.58
    arr += (rng.random((h, w, 1)) * 36 - 16) * amount
    yy, xx = np.ogrid[0:h, 0:w]
    for _ in range(7):
        cx = int(rng.integers(0, max(1, w)))
        cy = int(rng.integers(0, max(1, h)))
        rad = float(rng.integers(24, 110))
        blob = np.exp(-((xx - cx) ** 2 + (yy - cy) ** 2) / (2.0 * rad * rad))
        rust = np.array([78.0, 36.0, 14.0]) * float(rng.uniform(0.18, 0.45)) * amount
        arr += blob[..., None] * rust
    vx = np.minimum(xx, w - 1 - xx) / max(1.0, w * 0.32)
    vy = np.minimum(yy, h - 1 - yy) / max(1.0, h * 0.32)
    vig = np.clip(1.0 - np.minimum(vx, vy), 0, 1) ** 1.5
    arr *= 1.0 - 0.12 * amount * vig[..., None]
    out = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")
    scratch = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    sd = ImageDraw.Draw(scratch)
    for _ in range(int(10 * amount) + 4):
        x0, y0 = int(rng.integers(0, w)), int(rng.integers(0, h))
        x1 = x0 + int(rng.integers(-180, 180))
        y1 = y0 + int(rng.integers(-40, 40))
        sd.line((x0, y0, x1, y1), fill=(6, 6, 4, int(40 + 50 * amount)), width=1)
    return Image.alpha_composite(out.convert("RGBA"), scratch).convert("RGB")


def steel_sheet(size):
    """Dunkler gebürsteter Stahl, grobe Streifen."""
    w, h = size if isinstance(size, tuple) else (int(size), int(size))
    if not _STEEL_TEX.is_file():
        return Image.new("RGB", (w, h), STEEL_DK)
    tex = Image.open(_STEEL_TEX).convert("RGB")
    tw, th = tex.size
    cw, ch = max(80, int(tw * 0.72)), max(80, int(th * 0.72))
    rng = np.random.default_rng(_card_seed() ^ (w * 17 + h))
    ox = int(rng.integers(0, max(1, tw - cw)))
    oy = int(rng.integers(0, max(1, th - ch)))
    crop = tex.crop((ox, oy, ox + cw, oy + ch))
    crop = crop.resize((w, h), Image.Resampling.LANCZOS)
    arr = np.array(crop, dtype=np.float32)
    mean = float(arr.mean()) or 1.0
    arr = (arr - mean) * 1.35 + mean * 0.36
    arr = np.clip(arr, 0, 255).astype(np.uint8)
    return Image.fromarray(arr, "RGB")


OLIVE = (36, 40, 26)
OLIVE_DK = (12, 14, 10)
BRASS = (92, 74, 38)


def steel_stock(size):
    """Kartengrund: dunkler gebürsteter Stahl."""
    return steel_sheet(size)


def burnt_stock(size):
    """Sofort: warmes, fast schwarzes Eisen."""
    base = steel_sheet(size)
    arr = np.array(base, dtype=np.float32)
    arr *= np.array([0.92, 0.52, 0.40], dtype=np.float32)
    arr *= 0.62
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")


def olive_stock(size):
    """Ausrüstung: olivgrünes Feld-Canvas."""
    base = steel_sheet(size)
    arr = np.array(base, dtype=np.float32)
    luma = arr.mean(axis=2, keepdims=True)
    t = (luma - luma.min()) / (float(luma.max() - luma.min()) + 1.0)
    t = np.clip((t - 0.5) * 1.45 + 0.48, 0, 1)
    dark = np.array([18.0, 22.0, 12.0], dtype=np.float32)
    light = np.array([86.0, 94.0, 48.0], dtype=np.float32)
    out = dark + t * (light - dark)
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), "RGB")


def olive_plate(w, h):
    """Oliv-Webbing für den Ausrüstungs-Titel."""
    src = _STEEL_TEX if _STEEL_TEX.is_file() else Path(__file__).resolve().parent.parent / "assets" / "textures" / "metal-gehaemmert.jpg"
    if not src.is_file():
        return Image.new("RGB", (w, h), (48, 54, 28))
    tex = Image.open(src).convert("RGB")
    tw, th = tex.size
    cw, ch = max(80, int(tw * 0.78)), max(80, int(th * 0.78))
    rng = np.random.default_rng(_card_seed() ^ (w * 53 + h * 11))
    ox = int(rng.integers(0, max(1, tw - cw)))
    oy = int(rng.integers(0, max(1, th - ch)))
    crop = tex.crop((ox, oy, ox + cw, oy + ch)).resize((w, h), Image.Resampling.LANCZOS)
    arr = np.array(crop, dtype=np.float32)
    luma = arr.mean(axis=2, keepdims=True)
    t = (luma - luma.min()) / (float(luma.max() - luma.min()) + 1.0)
    t = np.clip((t - 0.5) * 1.55 + 0.48, 0, 1)
    dark = np.array([22.0, 28.0, 12.0], dtype=np.float32)
    light = np.array([118.0, 126.0, 58.0], dtype=np.float32)
    out = dark + t * (light - dark)
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), "RGB")


def brass_stock(size):
    """Ausrüstung: warmes Messingblech."""
    base = steel_sheet(size)
    arr = np.array(base, dtype=np.float32)
    luma = arr.mean(axis=2, keepdims=True)
    t = (luma - luma.min()) / (float(luma.max() - luma.min()) + 1.0)
    t = np.clip((t - 0.5) * 1.6 + 0.46, 0, 1)
    dark = np.array([36.0, 22.0, 8.0], dtype=np.float32)
    light = np.array([176.0, 132.0, 52.0], dtype=np.float32)
    out = dark + t * (light - dark)
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), "RGB")


def lacquer_stock(size):
    """Ausrüstung: schwarz lackiertes Metall mit Glanzstreifen."""
    base = steel_sheet(size)
    arr = np.array(base, dtype=np.float32)
    luma = arr.mean(axis=2, keepdims=True)
    t = (luma - luma.min()) / (float(luma.max() - luma.min()) + 1.0)
    t = np.clip((t - 0.5) * 1.8 + 0.42, 0, 1)
    dark = np.array([6.0, 6.0, 7.0], dtype=np.float32)
    light = np.array([58.0, 58.0, 62.0], dtype=np.float32)
    out = dark + t * (light - dark)
    h, w = out.shape[:2]
    yy = np.linspace(0, 1, h)[:, None]
    xx = np.linspace(0, 1, w)[None, :]
    sheen = np.clip(1.0 - np.abs((xx * 0.55 + yy * 0.45) - 0.42) * 7.5, 0, 1)[..., None]
    out = out + sheen * np.array([38.0, 38.0, 44.0], dtype=np.float32)
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), "RGB")


def lacquer_plate(w, h):
    """Schwarzer Lack für den Ausrüstungs-Titel."""
    src = _STEEL_TEX if _STEEL_TEX.is_file() else Path(__file__).resolve().parent.parent / "assets" / "textures" / "metal-gehaemmert.jpg"
    if not src.is_file():
        return Image.new("RGB", (w, h), (18, 18, 20))
    tex = Image.open(src).convert("RGB")
    tw, th = tex.size
    cw, ch = max(80, int(tw * 0.78)), max(80, int(th * 0.78))
    rng = np.random.default_rng(_card_seed() ^ (w * 71 + h * 13))
    ox = int(rng.integers(0, max(1, tw - cw)))
    oy = int(rng.integers(0, max(1, th - ch)))
    crop = tex.crop((ox, oy, ox + cw, oy + ch)).resize((w, h), Image.Resampling.LANCZOS)
    arr = np.array(crop, dtype=np.float32)
    luma = arr.mean(axis=2, keepdims=True)
    t = (luma - luma.min()) / (float(luma.max() - luma.min()) + 1.0)
    t = np.clip((t - 0.5) * 1.7 + 0.42, 0, 1)
    dark = np.array([8.0, 8.0, 10.0], dtype=np.float32)
    light = np.array([72.0, 72.0, 78.0], dtype=np.float32)
    out = dark + t * (light - dark)
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), "RGB")


def grim_card(img):
    """Ganze Karte: Rußvignette, weniger Glanz."""
    ww, hh = img.size
    dark = Image.new("RGB", (ww, hh), (6, 5, 4))
    img = Image.blend(img, dark, 0.16)
    vig = Image.new("L", (ww, hh), 0)
    vd = ImageDraw.Draw(vig)
    vd.ellipse((-ww * 0.08, -hh * 0.06, ww * 1.08, hh * 1.06), fill=255)
    vig = vig.filter(ImageFilter.GaussianBlur(90))
    black = Image.new("RGB", (ww, hh), (4, 3, 2))
    return Image.composite(img, black, vig)


def _steel_rivet(d, x, y, r=6):
    d.ellipse((x - r, y - r, x + r, y + r), fill=STEEL, outline=STEEL_DK, width=2)
    d.ellipse((x - 3, y - 4, x + 2, y), fill=STEEL_LT)


def crate_corner(d, x, y, sx, sy, arm=42, thick=9):
    """L-Beschlag einer Munitionskiste."""
    x2 = x + sx * arm
    y2 = y + sy * arm
    xa = x + sx * thick
    ya = y + sy * thick
    d.polygon(
        [(x, y), (x2, y), (x2, ya), (xa, ya), (xa, y2), (x, y2)],
        fill=STEEL,
        outline=STEEL_DK,
    )
    _steel_rivet(d, x + sx * 16, y + sy * 16, 5)


def strap(d, x0, y0, x1, y1, t=10):
    """Stahlband über eine Platte."""
    d.rectangle((x0, y0, x1, y1), fill=STEEL_DK, outline=OLIVE)
    d.rectangle((x0, y0 + 2, x1, y0 + t - 2), outline=STEEL, width=1)


def paste_steel_plaque(img, box, tab=None):
    """Kistenplatte: Bänder, Ecken, Nieten, optional Positionsreiter."""
    x0, y0, x1, y1 = [int(v) for v in box]
    w, h = max(8, x1 - x0), max(8, y1 - y0)
    plate = steel_sheet((w, h))
    plate = Image.blend(plate, Image.new("RGB", (w, h), OLIVE_DK), 0.32)
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, w - 1, h - 1), radius=6, fill=255)
    img.paste(plate, (x0, y0), mask)
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((x0, y0, x1, y1), radius=6, outline=GOLD, width=3)
    d.rounded_rectangle((x0 + 3, y0 + 3, x1 - 3, y1 - 3), radius=4, outline=STEEL_DK, width=1)
    strap(d, x0 + 8, y0 + 8, x1 - 8, y0 + 18, 10)
    strap(d, x0 + 8, y1 - 18, x1 - 8, y1 - 8, 10)
    crate_corner(d, x0 + 4, y0 + 4, 1, 1, 28, 7)
    crate_corner(d, x1 - 4, y0 + 4, -1, 1, 28, 7)
    crate_corner(d, x0 + 4, y1 - 4, 1, -1, 28, 7)
    crate_corner(d, x1 - 4, y1 - 4, -1, -1, 28, 7)
    if tab:
        tw = 70
        d.rectangle((x0 + 22, y0 - 14, x0 + 22 + tw, y0 + 8), fill=OLIVE, outline=STEEL_LT, width=2)
        d.text((x0 + 22 + tw / 2, y0 - 2), str(tab), font=font(FONT_N, 16), fill=STEEL_LT, anchor="mm")
    return img


def hazard_bar(img, box):
    """Schmale Warnschraffur, oliv/messing."""
    x0, y0, x1, y1 = [int(v) for v in box]
    d = ImageDraw.Draw(img)
    d.rectangle((x0, y0, x1, y1), fill=OLIVE_DK, outline=STEEL_DK)
    step = 18
    i = 0
    x = x0 - (y1 - y0)
    while x < x1:
        col = BRASS if i % 2 == 0 else OLIVE_DK
        d.polygon(
            [(x, y1), (x + step, y1), (x + step + (y1 - y0), y0), (x + (y1 - y0), y0)],
            fill=col,
        )
        x += step
        i += 1
    d.rectangle((x0, y0, x1, y1), outline=STEEL, width=1)
    return img


def nachschub_watermark(img, box):
    """Blasse Schablone NACHSCHUB im Textfeld."""
    x0, y0, x1, y1 = box
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    d.text((cx, cy), "NACHSCHUB", font=font(FONT_N, 92), fill=(110, 102, 78, 36), anchor="mm")
    return Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")


def dress_support_frame(img):
    """Kistenecken und Nietreihe um Bildfenster und Kartenrand."""
    ww, hh = img.size
    d = ImageDraw.Draw(img)
    crate_corner(d, 36, 28, 1, 1, 54, 11)
    crate_corner(d, ww - 36, 28, -1, 1, 54, 11)
    crate_corner(d, 36, hh - 28, 1, -1, 54, 11)
    crate_corner(d, ww - 36, hh - 28, -1, -1, 54, 11)
    ax0, ay0, ax1, ay1 = 70, 56, ww - 70, 872
    for x in range(ax0 + 28, ax1 - 20, 46):
        _steel_rivet(d, x, ay0 + 10, 5)
        _steel_rivet(d, x, ay1 - 10, 5)
    return img


VELVET = {
    "infanterie": (8, 92, 48),
    "artillerie": (148, 16, 22),
    "panzer": (18, 20, 22),
    "aufklarer": (198, 152, 28),
    "support": (128, 58, 18),
    "sofort": (120, 12, 16),
    "gear": (42, 48, 28),
}


def unit_branch(card):
    """Infanterie, Artillerie, Panzer, Aufklärer, Support-Messing oder Sofort-Karmesin."""
    typ = (card or {}).get("typ") or ""
    if typ == "Unterstützung":
        return "support"
    if typ == "Soforteinsatz":
        return "sofort"
    if typ == "Ausrüstung":
        return "gear"
    def norm(s):
        return str(s).lower().replace("ä", "a").replace("ö", "o").replace("ü", "u")
    tags = [norm(t) for t in (card or {}).get("tags") or []]
    klasse = norm((card or {}).get("klasse") or "")
    name = norm((card or {}).get("name") or "")
    keys = tags + [klasse]
    if "artillerie" in keys or "morser" in keys or "moerser" in keys:
        return "artillerie"
    if any(k in keys for k in ("aufklarung", "aufklarer", "spaher", "spaeher")):
        return "aufklarer"
    if "panzer" in keys or "panzer" in name.split():
        return "panzer"
    return "infanterie"


def brass_plate(w, h):
    """Gebürstete Messingplatte für den Kartentitel."""
    src = _STEEL_TEX if _STEEL_TEX.is_file() else Path(__file__).resolve().parent.parent / "assets" / "textures" / "metal-gehaemmert.jpg"
    if not src.is_file():
        return Image.new("RGB", (w, h), (128, 92, 36))
    tex = Image.open(src).convert("RGB")
    tw, th = tex.size
    cw, ch = max(80, int(tw * 0.78)), max(80, int(th * 0.78))
    rng = np.random.default_rng(_card_seed() ^ (w * 29 + h * 7))
    ox = int(rng.integers(0, max(1, tw - cw)))
    oy = int(rng.integers(0, max(1, th - ch)))
    crop = tex.crop((ox, oy, ox + cw, oy + ch)).resize((w, h), Image.Resampling.LANCZOS)
    arr = np.array(crop, dtype=np.float32)
    luma = arr.mean(axis=2, keepdims=True)
    t = (luma - luma.min()) / (float(luma.max() - luma.min()) + 1.0)
    t = np.clip((t - 0.5) * 1.7 + 0.48, 0, 1)
    dark = np.array([48.0, 30.0, 8.0], dtype=np.float32)
    light = np.array([214.0, 172.0, 72.0], dtype=np.float32)
    out = dark + t * (light - dark)
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), "RGB")


def crimson_plate(w, h):
    """Lackiertes Karmesin für Soforteinsätze."""
    src = _STEEL_TEX if _STEEL_TEX.is_file() else Path(__file__).resolve().parent.parent / "assets" / "textures" / "metal-gehaemmert.jpg"
    if not src.is_file():
        return Image.new("RGB", (w, h), (120, 12, 16))
    tex = Image.open(src).convert("RGB")
    tw, th = tex.size
    cw, ch = max(80, int(tw * 0.78)), max(80, int(th * 0.78))
    rng = np.random.default_rng(_card_seed() ^ (w * 41 + h * 3))
    ox = int(rng.integers(0, max(1, tw - cw)))
    oy = int(rng.integers(0, max(1, th - ch)))
    crop = tex.crop((ox, oy, ox + cw, oy + ch)).resize((w, h), Image.Resampling.LANCZOS)
    arr = np.array(crop, dtype=np.float32)
    luma = arr.mean(axis=2, keepdims=True)
    t = (luma - luma.min()) / (float(luma.max() - luma.min()) + 1.0)
    t = np.clip((t - 0.5) * 1.55 + 0.48, 0, 1)
    dark = np.array([48.0, 6.0, 8.0], dtype=np.float32)
    light = np.array([168.0, 28.0, 32.0], dtype=np.float32)
    out = dark + t * (light - dark)
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), "RGB")


def make_velvet(w, h, rgb, branch="infanterie"):
    """Öl-Samt in der Waffenfarbe; Unterstützung Messing; Sofort Karmesin."""
    if branch == "support":
        return brass_plate(w, h)
    if branch == "sofort":
        return crimson_plate(w, h)
    if branch == "gear":
        return oil_marble_panel((w, h))
    path = Path(__file__).resolve().parent.parent / "assets" / "velvet" / f"{branch}.jpg"
    if path.is_file():
        tex = Image.open(path).convert("RGB")
        return tex.resize((w, h), Image.Resampling.LANCZOS)
    rng = np.random.default_rng(int(sum(rgb) * 97 + w * h) & 0xFFFFFFFF)
    arr = np.clip(np.array(rgb, dtype=np.float32) * (0.75 + 0.25 * rng.random((h, w, 1))), 0, 255).astype(np.uint8)
    return Image.fromarray(arr, "RGB")


def name_plaque(draw, style, ny, name, w=None):
    """Namensschild als Samt in der Waffenfarbe, Goldrand, Name mittig."""
    if w is None:
        w = W
    x0, x1 = 70, w - 70
    y0, y1 = ny, ny + 128
    cx, cy = w / 2, ny + 66
    size = 86 if len(name) < 18 else 62 if len(name) < 26 else 50
    card = getattr(_mod, "_current_card", None) or {}
    branch = unit_branch(card)
    rgb = VELVET[branch]
    velvet = make_velvet(x1 - x0, y1 - y0, rgb, branch)
    img = getattr(draw, "_image", None)
    rim = getattr(_mod, "GOLD", GOLD)
    if img is not None:
        mask = Image.new("L", velvet.size, 0)
        md = ImageDraw.Draw(mask)
        md.rounded_rectangle((0, 0, velvet.size[0] - 1, velvet.size[1] - 1), radius=6, fill=255)
        img.paste(velvet, (x0, y0), mask)
    else:
        draw.rounded_rectangle((x0, y0, x1, y1), radius=6, fill=rgb, outline=rim, width=5)
    draw.rounded_rectangle((x0, y0, x1, y1), radius=6, outline=rim, width=5)
    fill = (248, 244, 236)
    outlined_num(draw, (cx, cy), name.upper(), font(FONT_B, size), fill=fill)


_mod.name_plaque = name_plaque
_mod.unit_branch = unit_branch

TEXT_GAP = 14
TAG_H = 56


def support_text_top(card, after_y=1028):
    """Textbox sitzt wie bei der Einheit direkt unter Titel/Tags."""
    tags = gameplay_tags(card)
    if tags:
        return int(after_y + TAG_GAP + TAG_H + TAG_GAP)
    return int(after_y + TEXT_GAP)


def fill_band(img, stock_fn, y0, y1, keep=None):
    """Streifen mit dem Typ-Hintergrund füllen. Optional einen Streifen (Tags) zurücklegen."""
    rgb = img.convert("RGB")
    ww, hh = rgb.size
    y0, y1 = max(0, int(y0)), min(hh, int(y1))
    if y1 <= y0:
        return rgb
    maker = stock_fn if callable(stock_fn) else steel_stock
    stock = maker((ww, hh)).convert("RGB")
    saved = None
    rgb.paste(stock.crop((48, y0, ww - 48, y1)), (48, y0))
    return rgb


def clear_support_well(img, stock_fn=None, y0=1028, y1=None, card=None):
    """Alles zwischen Titel und Textbox ist Typ-Hintergrund, keine Marmor-Restfläche."""
    if y1 is None:
        y1 = support_text_top(card, y0)
    keep = None
    if card and gameplay_tags(card):
        keep = (int(y0 + TAG_GAP), int(y0 + TAG_GAP + TAG_H))
    return fill_band(img, stock_fn, y0, y1, keep=keep)


def restack_under_art(img, card, stock_fn, art_bottom=872):
    """Titel und Tags direkt unter die Bildbox, ohne Restfläche dazwischen."""
    rgb = img.convert("RGB")
    ww, hh = rgb.size
    maker = stock_fn if callable(stock_fn) else steel_stock
    stock = maker((ww, hh)).convert("RGB")
    title_y = int(art_bottom) + 6
    title_h = 128
    after = title_y + title_h
    ty0 = support_text_top(card, after)
    rgb.paste(stock.crop((48, art_bottom + 2, ww - 48, ty0 + 2)), (48, art_bottom + 2))
    d = ImageDraw.Draw(rgb)
    name_plaque(d, "rect", title_y, str((card or {}).get("name") or ""), ww)
    rim = getattr(_mod, "GOLD", GOLD)
    d.rounded_rectangle((70, title_y, ww - 70, title_y + title_h), radius=6, outline=rim, width=5)
    tags = gameplay_tags(card)
    if tags:
        draw_tag_banners(d, after + TAG_GAP, tags, ww)
    return rgb, ty0, title_y, title_h


def finish_support(img, card, edition="ALPHA", number="001", footer_star=False):
    """Stahlkarte, Textbox aus Doktrin-Rotleder, ohne ATK/DEF."""
    img = mill_coin(img, 210, 210, 118, int((card or {}).get("ap") or 0))
    img = clip_support_panel(img)
    img, ty0, title_y, title_h = restack_under_art(img, card, steel_stock)
    ww, hh = img.size
    tx0, tx1, ty1 = 78, ww - 78, 1890
    img = paste_leather_plaque(img, (tx0, ty0, tx1, ty1))
    rim = getattr(_mod, "GOLD", GOLD)
    d = ImageDraw.Draw(img)
    d._image = img
    ink = (236, 224, 196)
    head_c = rim
    body = font(FONT_R, 52)
    head = font(FONT_B, 54)
    y = ty0 + 48
    inner_w = tx1 - tx0 - 80
    dummy = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    for title, rest in abilities(str((card or {}).get("text") or "")):
        if title:
            d.text((tx0 + 36, y), title, font=head, fill=head_c)
            y += 62
        for ln in wrap(dummy, rest, body, inner_w):
            d.text((tx0 + 36, y), ln, font=body, fill=ink)
            y += 64
        y += 24
    d.line([(tx0 + 90, ty1 - 118), (tx1 - 90, ty1 - 118)], fill=rim, width=2)
    flavor = str((card or {}).get("flavor") or "").strip()
    if flavor:
        ff = font(FONT_I, 36)
        quoted = "„" + flavor + "“"
        lines = wrap(dummy, quoted, ff, tx1 - tx0 - 80)[:2]
        fy = ty1 - 78
        for ln in lines:
            d.text((ww / 2, fy), ln, font=ff, fill=(196, 168, 110), anchor="mm")
            fy += 48
    return paste_main_logo(img, number, edition, footer_star)


def paste_field_leather(img, box):
    """Braunes Feldleder, gleicher Schnitt wie Doktrin-Leder."""
    x0, y0, x1, y1 = [int(v) for v in box]
    w, h = max(8, x1 - x0), max(8, y1 - y0)
    leather = taut_leather(rotleder_panel((w, h))).convert("RGB")
    arr = np.array(leather, dtype=np.float32)
    arr[..., 0] *= 0.78
    arr[..., 1] *= 0.55
    arr[..., 2] *= 0.22
    leather = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, w - 1, h - 1), radius=18, fill=255)
    rgb = img.convert("RGB")
    rgb.paste(leather, (x0, y0), mask)
    d = ImageDraw.Draw(rgb)
    rim = getattr(_mod, "GOLD", GOLD)
    d.rounded_rectangle((x0, y0, x1, y1), radius=18, outline=rim, width=3)
    leather_stitch(d, (x0 + 12, y0 + 12, x1 - 12, y1 - 12))
    return rgb


def finish_gear(img, card, edition="ALPHA", number="001", footer_star=False):
    """Lackgrund, Marmor-Titel, Doktrin-Rotleder. Maße wie Unterstützung."""
    img = mill_coin(img, 210, 210, 118, int((card or {}).get("ap") or 0))
    img = clip_support_panel(img, lacquer_stock)
    img, ty0, title_y, title_h = restack_under_art(img, card, lacquer_stock)
    ww, hh = img.size
    tx0, tx1, ty1 = 78, ww - 78, 1890
    img = paste_leather_plaque(img, (tx0, ty0, tx1, ty1))
    rim = getattr(_mod, "GOLD", GOLD)
    d = ImageDraw.Draw(img)
    d._image = img
    ink = (236, 224, 196)
    head_c = rim
    body = font(FONT_R, 52)
    head = font(FONT_B, 54)
    y = ty0 + 48
    inner_w = tx1 - tx0 - 80
    dummy = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    for title, rest in abilities(str((card or {}).get("text") or "")):
        if title:
            d.text((tx0 + 36, y), title, font=head, fill=head_c)
            y += 62
        for ln in wrap(dummy, rest, body, inner_w):
            d.text((tx0 + 36, y), ln, font=body, fill=ink)
            y += 64
        y += 24
    d.line([(tx0 + 90, ty1 - 118), (tx1 - 90, ty1 - 118)], fill=rim, width=2)
    flavor = str((card or {}).get("flavor") or "").strip()
    if flavor:
        ff = font(FONT_I, 36)
        quoted = "„" + flavor + "“"
        lines = wrap(dummy, quoted, ff, tx1 - tx0 - 80)[:2]
        fy = ty1 - 78
        for ln in lines:
            d.text((ww / 2, fy), ln, font=ff, fill=(196, 168, 110), anchor="mm")
            fy += 48
    return paste_main_logo(img, number, edition, footer_star)


def wax_seal(img, cx=210, cy=210, r=118):
    """Rotes Wachssiegel statt AP — Soforteinsätze kosten nichts."""
    rgb = img.convert("RGB")
    size = int(r * 2) + 8
    yy, xx = np.ogrid[0:size, 0:size]
    m = size / 2.0
    dist = np.sqrt((xx - m) ** 2 + (yy - m) ** 2)
    rng = np.random.default_rng(_card_seed() ^ 4243)
    n = rng.random((size, size))
    rad = r * 0.88
    wax = np.zeros((size, size, 4), dtype=np.float32)
    inside = dist < rad
    wax[inside, 0] = 96 + n[inside] * 62
    wax[inside, 1] = 10 + n[inside] * 20
    wax[inside, 2] = 12 + n[inside] * 16
    wax[inside, 3] = 255
    seal = Image.fromarray(np.clip(wax, 0, 255).astype(np.uint8), "RGBA")
    d = ImageDraw.Draw(seal)
    rim = tuple(getattr(_mod, "GOLD", GOLD)) + (255,)
    inset = int(size * 0.08)
    d.ellipse((inset, inset, size - inset - 1, size - inset - 1), outline=rim, width=7)
    d.ellipse((inset + 11, inset + 11, size - inset - 12, size - inset - 12), outline=rim, width=2)
    verts = star_verts(m, m, r * 0.32)
    d.polygon(verts, fill=rim)
    d.line(verts + [verts[0]], fill=(18, 8, 6, 255), width=2)
    out = rgb.convert("RGBA")
    out.alpha_composite(seal, (int(cx - size / 2), int(cy - size / 2)))
    return out.convert("RGB")


def finish_sofort(img, card, edition="ALPHA", number="001", footer_star=False):
    """Soforteinsatz: Titel oben, Bild darunter, Rotleder, ohne AP."""
    img = img.convert("RGB")
    ww, hh = img.size
    x0, x1 = 70, ww - 70
    art = img.crop((x0, 56, x1, 872))
    title_y, title_h, gap = 56, 128, 28
    art_y0 = title_y + title_h + gap
    art_y1 = 1028
    stock = burnt_stock(img.size)
    gx0, gx1 = 54, ww - 54
    img.paste(stock.crop((gx0, title_y, gx1, art_y0 + 4)), (gx0, title_y))
    art_h = art_y1 - art_y0
    placed = art.resize((x1 - x0, art_h), Image.Resampling.LANCZOS)
    mask = Image.new("L", placed.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, placed.size[0] - 1, placed.size[1] - 1), radius=8, fill=255)
    img.paste(placed, (x0, art_y0), mask)
    gy0, gy1 = title_y + title_h + 3, art_y0 - 3
    if gy1 > gy0:
        img.paste(stock.crop((48, gy0, ww - 48, gy1)), (48, gy0))
    d = ImageDraw.Draw(img)
    d._image = img
    name_plaque(d, "rect", title_y, str((card or {}).get("name") or ""), ww)
    rim = getattr(_mod, "GOLD", GOLD)
    d.rounded_rectangle((x0, title_y, x1, title_y + title_h), radius=6, outline=rim, width=5)
    d.rounded_rectangle((x0, art_y0, x1, art_y1), radius=8, outline=rim, width=4)
    img = clip_support_panel(img, burnt_stock)
    ty0 = support_text_top(card, art_y1)
    img = clear_support_well(img, burnt_stock, art_y1, ty0, card)
    d = ImageDraw.Draw(img)
    tags = gameplay_tags(card)
    if tags:
        draw_tag_banners(d, art_y1 + TAG_GAP, tags, ww)
    ww, hh = img.size
    tx0, tx1, ty1 = 78, ww - 78, 1890
    img = paste_leather_plaque(img, (tx0, ty0, tx1, ty1))
    d = ImageDraw.Draw(img)
    ink = (236, 224, 196)
    body = font(FONT_R, 52)
    head = font(FONT_B, 54)
    y = ty0 + 48
    inner_w = tx1 - tx0 - 80
    dummy = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    for title, rest in abilities(str((card or {}).get("text") or "")):
        if title:
            d.text((tx0 + 36, y), title, font=head, fill=rim)
            y += 62
        for ln in wrap(dummy, rest, body, inner_w):
            d.text((tx0 + 36, y), ln, font=body, fill=ink)
            y += 64
        y += 24
    d.line([(tx0 + 90, ty1 - 118), (tx1 - 90, ty1 - 118)], fill=rim, width=2)
    flavor = str((card or {}).get("flavor") or "").strip()
    if flavor:
        ff = font(FONT_I, 36)
        quoted = "„" + flavor + "“"
        lines = wrap(dummy, quoted, ff, tx1 - tx0 - 80)[:2]
        fy = ty1 - 78
        for ln in lines:
            d.text((ww / 2, fy), ln, font=ff, fill=(196, 168, 110), anchor="mm")
            fy += 48
    return paste_main_logo(img, number, edition, footer_star)


def clip_support_panel(img, stock_fn=None):
    """Textbox-Kante wie Einheit. Fußmetall bis an den Innenrahmen, Box unten geschlossen."""
    rgb = img.convert("RGB")
    ww, hh = rgb.size
    x0, x1 = 76, ww - 76
    y_cut = 1888
    y1 = hh - 36
    maker = stock_fn if callable(stock_fn) else steel_stock
    fill = maker((ww, hh)).convert("RGB")
    rgb.paste(fill.crop((x0, 1788, x1, y_cut)), (x0, 1788))
    y = y_cut + 2
    fx0, fx1 = 48, ww - 48
    rgb.paste(fill.crop((fx0, y, fx1, y1)), (fx0, y))
    d = ImageDraw.Draw(rgb)
    rim = getattr(_mod, "GOLD", GOLD)
    # Nur die untere Kante schließen — kein zweiter Rahmen um die Tags.
    yb = y_cut + 2
    r = 12
    d.line([(78, y_cut - 28), (78, yb - r)], fill=rim, width=3)
    d.line([(ww - 78, y_cut - 28), (ww - 78, yb - r)], fill=rim, width=3)
    d.arc((78, yb - 2 * r, 78 + 2 * r, yb), 90, 180, fill=rim, width=3)
    d.arc((ww - 78 - 2 * r, yb - 2 * r, ww - 78, yb), 0, 90, fill=rim, width=3)
    d.line([(78 + r, yb), (ww - 78 - r, yb)], fill=rim, width=3)
    return rgb


def wipe_atk_def(img):
    """ATK/DEF-Schilder mit dem gehämmerten Metall dazwischen überdecken."""
    rgb = img.convert("RGB")
    ww, hh = rgb.size
    y0, y1 = 1914, 2058
    boxes = [(114, y0, 406, y1), (ww - 406, y0, ww - 114, y1)]
    src = rgb.crop((620, y0, 916, y1))
    sw = src.size[0]
    for x0, ya, x1, yb in boxes:
        x = x0
        while x < x1:
            w = min(sw, x1 - x)
            rgb.paste(src.crop((0, 0, w, y1 - y0)), (x, y0))
            x += w
    return rgb


def paste_elite_order(img):
    """Öl-Orden: Spange sitzt mit gleichem Abstand in der Tag-Leiste."""
    path = Path(__file__).resolve().parent.parent / "assets" / "elite-orden.png"
    if not path.is_file():
        return img
    medal = Image.open(path).convert("RGBA")
    ww, hh = img.size
    # Spange im PNG: Gold von y=4 bis y=148
    clasp_top, clasp_bot = 4, 112
    clasp_png_h = clasp_bot - clasp_top
    bar_y, bar_h, pad = 1042, 56, 4
    clasp_h = bar_h - 2 * pad
    sc = clasp_h / clasp_png_h
    nw, nh = max(1, int(medal.size[0] * sc)), max(1, int(medal.size[1] * sc))
    medal = medal.resize((nw, nh), Image.Resampling.LANCZOS)
    x = ww - 64 - nw
    y = bar_y + pad - int(round(clasp_top * sc)) - 10
    out = img.convert("RGBA")
    out.alpha_composite(medal, (x, y))
    return out.convert("RGB")


_mod.paste_elite_order = paste_elite_order
_orig_render = _mod.render


def paste_main_logo(img, number="001", edition="ALPHA", footer_star=False):
    """Hauptlogo zwischen ATK und DEF. Stern hängt an ALPHA - 001."""
    path = Path(__file__).resolve().parent.parent / "assets" / "title-logo.png"
    if not path.is_file():
        return img
    rgb = img.convert("RGB")
    ww, hh = rgb.size
    star_src = rgb.crop((424, 1926, 624, 2062))
    rgb.paste(star_src, (656, 1926))
    num_src = rgb.crop((424, 2062, 520, 2108))
    rgb.paste(num_src, (int(ww / 2 - 48), 2062))
    logo = Image.open(path).convert("RGBA")
    bbox = logo.getbbox()
    if bbox:
        logo = logo.crop(bbox)
    max_w, max_h = 680, 118
    sc = min(max_w / logo.size[0], max_h / logo.size[1])
    nw, nh = max(1, int(logo.size[0] * sc)), max(1, int(logo.size[1] * sc))
    logo = logo.resize((nw, nh), Image.Resampling.LANCZOS)
    x = (ww - nw) // 2
    y = 1928
    out = rgb.convert("RGBA")
    out.alpha_composite(logo, (x, y))
    d = ImageDraw.Draw(out)
    draw_edition_label(d, ww, edition, number, footer_star)
    return out.convert("RGB")


def cut_card_corners(img, radius=48):
    """Ecken abschneiden: rund, transparent, kein Metall darunter."""
    rgba = img.convert("RGBA")
    m = round_mask(rgba.size, radius)
    out = Image.new("RGBA", rgba.size, (0, 0, 0, 0))
    out.paste(rgba, (0, 0), m)
    return out


def finish_frame(img):
    """Außenrahmen, Innenlinie und Ecken-Nieten vollständig neu, in der Metallfarbe."""
    rgb = img.convert("RGB")
    ww, hh = rgb.size
    d = ImageDraw.Draw(rgb)
    gold_band(d, (10, 10, ww - 11, hh - 11), 22)
    enamel = getattr(_mod, "GOLD", GOLD)
    dk = getattr(_mod, "GOLD_DK", GOLD_DK)
    d.rounded_rectangle((34, 34, ww - 35, hh - 35), radius=36, outline=enamel, width=7)
    d.rounded_rectangle((46, 46, ww - 47, hh - 47), radius=30, outline=dk, width=2)
    for x, y in ((56, 56), (ww - 56, 56), (56, hh - 56), (ww - 56, hh - 56)):
        rivet(d, x, y, 11)
    return rgb


def render(card, *args, **kwargs):
    """Orden erst nach Tags und Text, damit die Spange in der Leiste sitzt."""
    _mod._current_card = card
    extra = (card or {}).get("tag_colors") or {}
    if extra:
        colors = dict(getattr(_mod, "TAG_COLORS", {}) or {})
        for k, v in extra.items():
            colors[str(k).upper()] = tuple(v)
        _mod.TAG_COLORS = colors
        globals()["TAG_COLORS"] = colors
    _mod.paste_elite_order = lambda img: img
    core_kw = {k: kwargs[k] for k in ("number", "native", "metal", "panel", "stat_style") if k in kwargs}
    if "metal" in core_kw:
        kind = str(core_kw["metal"] or "gold").lower()
        core_kw["metal"] = {"silver": "silber", "silber": "silber", "gold": "gold", "bronze": "bronze"}.get(kind, "gold")
    is_support = (card or {}).get("typ") == "Unterstützung"
    is_sofort = (card or {}).get("typ") == "Soforteinsatz"
    is_gear = (card or {}).get("typ") == "Ausrüstung"
    if is_support:
        _mod.brushed_stock = steel_stock
    elif is_sofort:
        _mod.brushed_stock = burnt_stock
        _mod.mill_coin = lambda im, *a, **k: im
    elif is_gear:
        style = str((card or {}).get("gear_style") or "lacquer")
        _mod.brushed_stock = {"brass": brass_stock, "olive": olive_stock}.get(style, lacquer_stock)
    dest = _orig_render(card, *args, **core_kw)
    if is_support or is_sofort or is_gear:
        _mod.brushed_stock = brushed_stock
        _mod.mill_coin = mill_coin
    for k in ("GOLD", "GOLD_DK", "GOLD_LT"):
        if hasattr(_mod, k):
            globals()[k] = getattr(_mod, k)
    _mod.paste_elite_order = paste_elite_order
    im = Image.open(dest)
    edition = kwargs.get("edition", (card or {}).get("edition", "ALPHA"))
    number = kwargs.get("number", (card or {}).get("n", "001"))
    star = bool(kwargs.get("footer_star", (card or {}).get("footer_star", False)))
    if (card or {}).get("typ") == "Unterstützung":
        im = finish_support(im, card, edition, number, star)
    elif (card or {}).get("typ") == "Soforteinsatz":
        im = finish_sofort(im, card, edition, number, star)
    elif (card or {}).get("typ") == "Ausrüstung":
        im = finish_gear(im, card, edition, number, star)
    elif (card or {}).get("typ", "Einheit") != "Doktrin":
        im = paste_main_logo(im, number, edition, star)
    if card_is_elite(card):
        im = paste_elite_order(im)
    im = finish_frame(im)
    typ = (card or {}).get("typ") or "Einheit"
    if typ in ("Einheit", "Unterstützung", "Ausrüstung"):
        im = mill_coin(im, 210, 210, 118, int((card or {}).get("ap") or 0))
    if (card or {}).get("typ") == "Doktrin":
        d = ImageDraw.Draw(im)
        draw_edition_label(d, im.size[0], edition, number, star)
    im = cut_card_corners(im)
    im.save(dest, "PNG")
    return dest


_mod.render = render

_CARDS = Path(__file__).resolve().parent.parent / "assets" / "cards"
CARDS = _CARDS


def _triangle_mask(w, h, inset=18):
    m = Image.new("L", (w, h), 0)
    ImageDraw.Draw(m).polygon(
        [(w / 2, inset), (w - inset, h - inset), (inset, h - inset)],
        fill=255,
    )
    return m.filter(ImageFilter.GaussianBlur(1))


def _circle_mask(w, h, inset=10):
    m = Image.new("L", (w, h), 0)
    ImageDraw.Draw(m).ellipse((inset, inset, w - inset - 1, h - inset - 1), fill=255)
    return m


def _paint_metal_yellow(rgb):
    arr = np.array(rgb.convert("RGB"), dtype=np.float32)
    r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]
    yellow = (r > 70) & (g > 50) & (r > b * 1.12) & (g > b * 0.95)
    gold = np.array(getattr(_mod, "GOLD", GOLD), dtype=np.float32)
    dk = np.array(getattr(_mod, "GOLD_DK", GOLD_DK), dtype=np.float32)
    luma = (r + g + b) / 3.0 / 255.0
    t = np.clip((luma - 0.18) / 0.65, 0, 1)[..., None]
    painted = dk + t * (gold - dk)
    arr[yellow] = painted[yellow]
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGB")


def _erode_mask(m, n):
    out = m
    for _ in range(max(0, int(n))):
        out = out.filter(ImageFilter.MinFilter(3))
    return out


def _metal_fill(w, h):
    enamel = np.array(getattr(_mod, "GOLD", GOLD), dtype=np.float32)
    dk = np.array(getattr(_mod, "GOLD_DK", GOLD_DK), dtype=np.float32)
    plate = brass_plate(w, h)
    arr = np.array(plate, dtype=np.float32)
    luma = arr.mean(axis=2, keepdims=True)
    t = (luma - luma.min()) / (float(luma.max() - luma.min()) + 1.0)
    t = np.clip((t - 0.5) * 1.4 + 0.5, 0, 1)
    metal = dk + t * (enamel - dk)
    return Image.fromarray(np.clip(metal, 0, 255).astype(np.uint8), "RGB"), tuple(int(v) for v in enamel), tuple(int(v) for v in dk)


def _paint_rivet(d, x, y, enamel, dk, r=11):
    d.ellipse((x - r, y - r, x + r, y + r), fill=enamel, outline=dk, width=3)
    d.ellipse((x - 4, y - 5, x + 3, y - 1), fill=(240, 220, 150, 255))


def frame_circle(art, gold_w=24, black_w=34, inner=6):
    """Rundes Schild mit echtem Kreis, gleicher Goldrahmen wie die Mine."""
    src = art.convert("RGB")
    S = 1480
    margin = 56
    yy, xx = np.mgrid[0:S, 0:S]
    cx = cy = (S - 1) / 2.0
    dist = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2)
    r_out = S / 2.0 - margin
    r_gold = r_out - gold_w
    r_black = r_gold - black_w
    r_inner = r_black - inner
    r_art = r_inner - 2
    gold_m = Image.fromarray(np.where((dist <= r_out) & (dist > r_gold), 255, 0).astype(np.uint8), "L")
    black_m = Image.fromarray(np.where((dist <= r_gold) & (dist > r_black), 255, 0).astype(np.uint8), "L")
    inner_m = Image.fromarray(np.where((dist <= r_black) & (dist > r_inner), 255, 0).astype(np.uint8), "L")
    art_m = Image.fromarray(np.where(dist <= r_art, 255, 0).astype(np.uint8), "L")
    metal, enamel, dk = _metal_fill(S, S)
    canvas = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    canvas.paste(Image.new("RGBA", (S, S), (8, 7, 6, 255)), mask=black_m)
    canvas.paste(metal.convert("RGBA"), mask=gold_m)
    canvas.paste(Image.new("RGBA", (S, S), enamel + (255,)), mask=inner_m)
    bbox = art_m.getbbox()
    bx0, by0, bx1, by1 = bbox
    bw, bh = bx1 - bx0, by1 - by0
    sc = max(bw / src.size[0], bh / src.size[1]) * 1.18
    nw, nh = max(1, int(src.size[0] * sc)), max(1, int(src.size[1] * sc))
    fitted = src.resize((nw, nh), Image.Resampling.LANCZOS)
    layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    layer.paste(fitted.convert("RGBA"), (bx0 + (bw - nw) // 2, by0 + (bh - nh) // 2))
    layer.putalpha(ImageChops.multiply(layer.split()[-1], art_m))
    canvas.alpha_composite(layer)
    d = ImageDraw.Draw(canvas)
    rad = r_out - gold_w * 0.45
    for ang in (45, 135, 225, 315):
        a = math.radians(ang)
        _paint_rivet(d, cx + rad * math.cos(a), cy + rad * math.sin(a), enamel, dk)
    aa = np.clip((r_out + 0.8 - dist) / 1.6, 0, 1)
    token_a = Image.fromarray((aa * 255).astype(np.uint8), "L")
    r, g, b, a = canvas.split()
    canvas.putalpha(ImageChops.multiply(a, token_a))
    pad = 6
    box = (int(cx - r_out - pad), int(cy - r_out - pad), int(cx + r_out + pad + 1), int(cy + r_out + pad + 1))
    return canvas.crop(box)


def frame_inverted_triangle(art, gold_w=24, black_w=34, inner=6):
    """Gleichmäßiger Schwarzrand, Goldrahmen und Nieten wie die Karten."""
    src = art.convert("RGB")
    W, H = 1680, 1480
    margin = 48
    pts = [(margin, margin + 8), (W - margin, margin + 8), (W / 2, H - margin)]
    size = (W, H)
    outer = Image.new("L", size, 0)
    ImageDraw.Draw(outer).polygon(pts, fill=255)
    after_gold = _erode_mask(outer, gold_w)
    after_black = _erode_mask(after_gold, black_w)
    after_inner = _erode_mask(after_black, inner)
    art_m = _erode_mask(after_inner, 2)
    gold_m = ImageChops.subtract(outer, after_gold)
    black_m = ImageChops.subtract(after_gold, after_black)
    inner_m = ImageChops.subtract(after_black, after_inner)
    metal, enamel, dk = _metal_fill(W, H)
    canvas = Image.new("RGBA", size, (0, 0, 0, 0))
    canvas.paste(Image.new("RGBA", size, (8, 7, 6, 255)), mask=black_m)
    canvas.paste(metal.convert("RGBA"), mask=gold_m)
    canvas.paste(Image.new("RGBA", size, enamel + (255,)), mask=inner_m)
    bbox = art_m.getbbox()
    bx0, by0, bx1, by1 = bbox
    bw, bh = bx1 - bx0, by1 - by0
    sc = max(bw / src.size[0], bh / src.size[1]) * 1.02
    nw, nh = max(1, int(src.size[0] * sc)), max(1, int(src.size[1] * sc))
    fitted = src.resize((nw, nh), Image.Resampling.LANCZOS)
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    layer.paste(fitted.convert("RGBA"), (bx0 + (bw - nw) // 2, by0 + (bh - nh) // 2))
    layer.putalpha(ImageChops.multiply(layer.split()[-1], art_m))
    canvas.alpha_composite(layer)
    d = ImageDraw.Draw(canvas)
    cx, cy = W / 2, (pts[0][1] + pts[2][1]) / 2
    for px, py in pts:
        dx, dy = cx - px, cy - py
        L = max(1.0, (dx * dx + dy * dy) ** 0.5)
        x = px + dx / L * (gold_w * 0.55)
        y = py + dy / L * (gold_w * 0.55)
        _paint_rivet(d, x, y, enamel, dk)
    bb = canvas.getbbox()
    return canvas.crop(bb) if bb else canvas


def render_mine_token(card, art=None):
    """Öl-Minen-Schild, Spitze unten, Kartenrahmen."""
    path = Path(art) if art else _CARDS / "token-mine-oil.jpg"
    if not Path(path).is_file():
        path = _CARDS / "token-mine-oil.jpg"
    if not Path(path).is_file():
        path = _CARDS / "MINE.png"
    src = Image.open(path).convert("RGB")
    return frame_inverted_triangle(src)


def render_fog_token(card, art=None):
    """Rundes Öl-Nebelschild, gleicher Kartenrahmen wie die Mine."""
    path = Path(art) if art else _CARDS / "token-nebel-oil.jpg"
    if not Path(path).is_file():
        path = _CARDS / "token-nebel-oil.jpg"
    if not Path(path).is_file():
        path = _CARDS / "token-nebel-1.jpg"
    src = Image.open(path).convert("RGB")
    return frame_circle(src)


def render_token(card, dest, metal="gold", art=None):
    kind = str((card or {}).get("token_kind") or "minenfeld").lower()
    apply_metal({"silver": "silber", "silber": "silber"}.get(str(metal).lower(), str(metal).lower()))
    _mod._current_card = card
    if "nebel" in kind or "fog" in kind:
        im = render_fog_token(card, art)
    else:
        im = render_mine_token(card, art)
    Path(dest).parent.mkdir(parents=True, exist_ok=True)
    im.save(dest)
    return dest

