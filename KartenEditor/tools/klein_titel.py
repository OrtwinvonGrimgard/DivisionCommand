"""t310 (Test): Titel und AP-Stern im Stil der kleinen DC-Web-Karten für den alpha40-Renderer.

Nur vorhandene Assets: KartenEditor/assets/velvet/*.jpg (Samt je Waffe), assets/klein/ (aus Repo DC tex/:
banner-4.png, titles/stahl-oel.png, titles/stahl-oel-flaeche.jpg, oil-ap-*.jpg) und Cinzel (Schrift des DC-Editors, OFL).
Arbeitsformat 1536×2136. Außenrahmen bleibt alpha40.
"""
from __future__ import annotations
import math, os
import texgen as TG  # t313
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageEnhance

ON = os.environ.get("DC_T310", "1") == "1"
A = Path(__file__).resolve().parent.parent / "assets"
K = A / "klein"
CINZEL = A / "fonts" / "Cinzel.ttf"

# Geometrie (Arbeitsformat). Titel oben wie klein; Motiv rückt in den frei gewordenen Namensplatz.
TITLE = {  # typ: (y0, y1)
    "Einheit": (60, 186),
    "Unterstützung": (50, 200),
    "Soforteinsatz": (34, 226),
}
ART_TOP = {"Einheit": 198, "Unterstützung": 212, "Soforteinsatz": 236}
DAMP = 0.86  # Titelflächen leicht gedämpft (Nutzerwunsch Runde 2: nicht grell)

_cache = {}


USE_CINZEL = os.environ.get("DC_T310_CINZEL", "0") == "1"  # t311: Nutzer will die alte Schrift (FONT_B)
TITLE_FONT = None  # wird von render_core gesetzt (LiberationSerif-Bold)


def cinzel(size, weight="Bold"):
    """Titelschrift: seit t311 die alte alpha40-Schrift (FONT_B); Cinzel nur noch per DC_T310_CINZEL=1."""
    key = (int(size), weight, USE_CINZEL)
    if key not in _cache:
        if USE_CINZEL or not TITLE_FONT:
            f = ImageFont.truetype(str(CINZEL), int(size))
            try:
                f.set_variation_by_name(weight)
            except Exception:
                pass
        else:
            f = ImageFont.truetype(str(TITLE_FONT), int(size))
        _cache[key] = f
    return _cache[key]


def _damp(im, sat=DAMP, val=0.94):
    rgb = im.convert("RGB")
    rgb = ImageEnhance.Color(rgb).enhance(sat)
    rgb = ImageEnhance.Brightness(rgb).enhance(val)
    if im.mode == "RGBA":
        rgb.putalpha(im.split()[3])
    return rgb


def spaced_width(text, fnt, spacing):
    d = ImageDraw.Draw(Image.new("L", (4, 4)))
    w = 0.0
    for i, ch in enumerate(text):
        w += d.textlength(ch, font=fnt)
        if i < len(text) - 1:
            w += spacing
    return w


def fit_cinzel(text, size, max_w, min_size=46, weight="Bold", spacing_pct=0.06):
    s = int(size)
    while s > min_size and spaced_width(text, cinzel(s, weight), s * spacing_pct) > max_w:
        s -= 2
    return cinzel(s, weight), s


def draw_title_text(img, cx, cy, text, size, max_w, fill=(246, 236, 214), stroke=(18, 10, 6), shadow=True,
                    weight="Bold", spacing_pct=None, gold=False, lane=None):
    """Cinzel in Versalien, 6 % Sperrung, dunkle Kontur + weicher Schlagschatten (wie kleine Karte).
    lane=(x0, x1): Ausweichbahn rechts vom AP-Stern; nur lange Namen nutzen sie (dann leicht außermittig)."""
    text = text.upper()
    if spacing_pct is None:
        spacing_pct = 0.06 if USE_CINZEL else 0.03
    fnt, s = fit_cinzel(text, size, max_w, min_size=size * 0.82 if lane else 46, weight=weight, spacing_pct=spacing_pct)
    sp = s * spacing_pct
    tw = spaced_width(text, fnt, sp)
    if lane and tw > max_w:
        lw = lane[1] - lane[0]
        fnt, s = fit_cinzel(text, size, lw, min_size=40, weight=weight, spacing_pct=spacing_pct)
        sp = s * spacing_pct
        tw = spaced_width(text, fnt, sp)
        cx = max(cx, lane[0] + tw / 2)
    base = img.convert("RGBA")
    W, H = base.size
    sw = max(2, int(s * 0.055))
    asc, desc = fnt.getmetrics()
    lay = Image.new("RGBA", base.size, (0, 0, 0, 0))
    mask = Image.new("L", base.size, 0)
    dm, dl = ImageDraw.Draw(mask), ImageDraw.Draw(lay)
    x = cx - tw / 2
    for ch in text:
        dl.text((x, cy), ch, font=fnt, anchor="lm", fill=stroke + (255,), stroke_width=sw, stroke_fill=stroke + (255,))
        dm.text((x, cy), ch, font=fnt, anchor="lm", fill=255)
        x += dm.textlength(ch, font=fnt) + sp
    if shadow:
        sh = Image.new("RGBA", base.size, (0, 0, 0, 0))
        a = lay.split()[3].filter(ImageFilter.GaussianBlur(s * 0.08))
        sh.putalpha(a.point(lambda v: int(v * 0.75)))
        base.alpha_composite(sh, (0, int(s * 0.07)))
    base.alpha_composite(lay)
    if gold:
        # Gold-Verlauf (Doktrin): hell oben, dunkler unten
        g = Image.new("RGBA", base.size, (0, 0, 0, 0))
        gd = ImageDraw.Draw(g)
        top, bot = int(cy - asc * 0.75), int(cy + asc * 0.45)
        c0, c1, c2 = (252, 232, 168), (222, 178, 84), (150, 102, 34)
        for yy in range(top, bot + 1):
            t = (yy - top) / max(1, bot - top)
            c = tuple(int(c0[i] + (c1[i] - c0[i]) * min(1, t * 2)) if t < .5 else int(c1[i] + (c2[i] - c1[i]) * (t - .5) * 2) for i in range(3))
            gd.line([(0, yy), (W, yy)], fill=c + (255,))
        g.putalpha(mask)
        base.alpha_composite(g)
    else:
        f = Image.new("RGBA", base.size, fill + (255,))
        f.putalpha(mask)
        base.alpha_composite(f)
    return base.convert("RGB"), s


def _rivet(d, x, y, r, metal):
    lt, mid, dk = metal
    d.ellipse((x - r - 2, y - r - 2, x + r + 2, y + r + 2), fill=(14, 8, 4))
    d.ellipse((x - r, y - r, x + r, y + r), fill=mid)
    d.ellipse((x - r + 2, y - r + 2, x + r * 0.15, y + r * 0.15), fill=lt)


def bevel_frame(img, box, metal, radius=10, band=8, rivets=True, rivet_r=7):
    """Metallfassung wie die kleinen Karten: dunkle Außenlinie, Metallband mit Licht oben, dunkle Innenlinie."""
    lt, mid, dk = metal
    d = ImageDraw.Draw(img)
    x0, y0, x1, y1 = box
    d.rounded_rectangle((x0 - 2, y0 - 2, x1 + 2, y1 + 2), radius=radius + 2, outline=(12, 8, 4), width=3)
    for i in range(band):
        t = i / max(1, band - 1)
        c = tuple(int(lt[k] + (dk[k] - lt[k]) * abs(t - 0.3) / 0.7) for k in range(3))
        d.rounded_rectangle((x0 + i, y0 + i, x1 - i, y1 - i), radius=max(2, radius - i), outline=c, width=1)
    d.rounded_rectangle((x0 + band, y0 + band, x1 - band, y1 - band), radius=max(2, radius - band), outline=(14, 9, 5), width=2)
    # Glanzkante oben
    d.line([(x0 + radius, y0 + 1), (x1 - radius, y0 + 1)], fill=tuple(min(255, c + 30) for c in lt), width=1)
    if rivets:
        o = band + rivet_r + 7
        for x, y in ((x0 + o, y0 + o), (x1 - o, y0 + o), (x0 + o, y1 - o), (x1 - o, y1 - o)):
            _rivet(d, x, y, rivet_r, metal)
    return img


def metal_triplet(mod):
    return (tuple(getattr(mod, "GOLD_LT")[:3]), tuple(getattr(mod, "GOLD")[:3]), tuple(getattr(mod, "GOLD_DK")[:3]))


def unit_plate(img, box, velvet, metal, name):
    """Samtplatte volle Breite + Metallfassung + Nieten links/rechts; Name mittig."""
    x0, y0, x1, y1 = box
    v = _damp(velvet.resize((x1 - x0, y1 - y0), Image.Resampling.LANCZOS), 0.95, 0.96)
    m = Image.new("L", v.size, 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, v.size[0] - 1, v.size[1] - 1), radius=10, fill=255)
    img.paste(v, (x0, y0), m)
    # leichte Vignette oben/unten (Samttiefe)
    sh = Image.new("RGBA", img.size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(sh)
    h = y1 - y0
    for i in range(int(h * 0.28)):
        a = int(120 * (1 - i / (h * 0.28)) ** 2)
        sd.line([(x0 + 4, y0 + i), (x1 - 4, y0 + i)], fill=(0, 0, 0, a))
        sd.line([(x0 + 4, y1 - i), (x1 - 4, y1 - i)], fill=(0, 0, 0, a))
    img = Image.alpha_composite(img.convert("RGBA"), sh).convert("RGB")
    img = bevel_frame(img, box, metal, radius=10, band=8, rivets=False)
    d = ImageDraw.Draw(img)
    for yy in (y0 + 24, y1 - 24):
        _rivet(d, x0 + 24, yy, 7, metal)
        _rivet(d, x1 - 24, yy, 7, metal)
    return img


def text_center_box(img_w, star_room=300):
    return img_w - 2 * star_room


def draw_unit_title(img, card, velvet, metal, typ="Einheit"):
    y0, y1 = TITLE[typ]
    W = img.size[0]
    box = (70, y0, W - 70, y1)
    img = unit_plate(img, box, velvet, metal, card.get("name") or "")
    img, _ = draw_title_text(img, W / 2, (y0 + y1) / 2 + 2, card.get("name") or "", 78, text_center_box(W), lane=(300, W - 104))
    return img


def draw_banner_title(img, card):
    """Soforteinsatz: ölgemaltes Stoffband (banner-4) über die volle Breite."""
    W = img.size[0]
    y0, y1 = TITLE["Soforteinsatz"]
    b = Image.open(K / "banner-4.png").convert("RGBA")
    b = _damp(b, 0.80, 0.90)
    b = b.resize((W - 72, y1 - y0), Image.Resampling.LANCZOS)
    base = img.convert("RGBA")
    sh = Image.new("RGBA", base.size, (0, 0, 0, 0))
    a = b.split()[3].filter(ImageFilter.GaussianBlur(10)).point(lambda v: int(v * 0.6))
    shl = Image.new("RGBA", b.size, (0, 0, 0, 255)); shl.putalpha(a)
    sh.alpha_composite(shl, (36, y0 + 8))
    base.alpha_composite(sh)
    base.alpha_composite(b, (36, y0))
    img = base.convert("RGB")
    # Textmitte im Mittelfeld des Bandes (Band-Körper ≈ 17–84 % Breite, Höhe ≈ 42 %)
    cy = y0 + (y1 - y0) * 0.40
    img, _ = draw_title_text(img, W / 2, cy, card.get("name") or "", 76, int((W - 72) * 0.60), lane=(310, int(W * 0.83)))
    return img


def _regen_plate(p):
    """Ersetzt die Öl-Stahlfläche innerhalb der Ornamentecken durch frisch generierten Stahl (Ton angeglichen)."""
    import numpy as np
    pw, ph = p.size
    rgb = np.asarray(p.convert("RGB"), dtype=np.float32)
    x0, x1, y0, y1 = int(pw * .16), int(pw * .84), int(ph * .13), int(ph * .87)
    ref = rgb[y0:y1, x0:x1]
    g = np.asarray(TG.texture("stahl-oel-flaeche.jpg", (pw, ph), "plate"), dtype=np.float32)
    gr = g[y0:y1, x0:x1]
    g = (g - gr.mean((0, 1))) / (gr.std((0, 1)) + 1e-6) * ref.std((0, 1)) + ref.mean((0, 1))
    m = Image.new("L", (pw, ph), 0)
    ImageDraw.Draw(m).rounded_rectangle((x0, y0, x1, y1), radius=int(ph * .18), fill=255)
    m = np.asarray(m.filter(ImageFilter.GaussianBlur(ph * .06)), dtype=np.float32)[..., None] / 255.0
    out = rgb * (1 - m) + g * m
    o = Image.fromarray(np.clip(out, 0, 255).astype("uint8"), "RGB")
    o.putalpha(p.split()[3])
    return o


def draw_steel_title(img, card):
    """Unterstützung: Stahlplatte mit Messing-Ornamentecken (titles/stahl-oel.png) oben."""
    W = img.size[0]
    y0, y1 = TITLE["Unterstützung"]
    p = Image.open(K / "stahl-oel.png").convert("RGBA")
    p = _damp(p, 0.9, 0.96).resize((W - 96, y1 - y0), Image.Resampling.LANCZOS)
    if TG.has("stahl-oel-flaeche.jpg"):  # t313: Stahlfläche frisch gemalt, Messing-Ornamente bleiben
        p = _regen_plate(p)
    base = img.convert("RGBA")
    base.alpha_composite(p, (48, y0))
    img = base.convert("RGB")
    img, _ = draw_title_text(img, W / 2, (y0 + y1) / 2 + 2, card.get("name") or "", 76, text_center_box(W), lane=(300, W - 150))
    return img


def draw_gear_title(img, card, metal, y0, h=128):
    """Ausrüstung: Titel bleibt unter dem Motiv (wie klein), Fläche gebürsteter Öl-Stahl + Fassung."""
    W = img.size[0]
    box = (70, y0, W - 70, y0 + h)
    s = TG.texture("stahl-oel-flaeche.jpg", (box[2] - box[0], h)) if TG.has("stahl-oel-flaeche.jpg") else Image.open(K / "stahl-oel-flaeche.jpg").convert("RGB")  # t313
    s = _damp(s, 0.9, 0.92).resize((box[2] - box[0], h), Image.Resampling.LANCZOS)
    m = Image.new("L", s.size, 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, s.size[0] - 1, s.size[1] - 1), radius=10, fill=255)
    img.paste(s, (box[0], box[1]), m)
    img = bevel_frame(img, box, metal, radius=10, band=7, rivets=False)
    img, _ = draw_title_text(img, W / 2, y0 + h / 2 + 2, card.get("name") or "", 78, W - 2 * 120)
    return img


def ap_star(img, cx, cy, r, value, metal_name):
    """AP-Stern der kleinen Karten: Öl-Metallfüllung je Seltenheit, schwarze Kontur, Zahl in Cinzel."""
    tex = {"gold": "oil-ap-gold.jpg", "silber": "oil-ap-silver.jpg", "silver": "oil-ap-silver.jpg"}.get(str(metal_name), "oil-ap-bronze.jpg")
    size = int(r * 2 + 40)
    pts = []
    m = size / 2
    for i in range(10):
        a = math.radians(-90 + i * 36)
        rr = r if i % 2 == 0 else r * 0.47
        pts.append((m + rr * math.cos(a), m + rr * math.sin(a)))
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).polygon(pts, fill=255)
    t = Image.open(K / tex).convert("RGB")
    t = t.crop((int(t.width * .18), int(t.height * .18), int(t.width * .82), int(t.height * .82))).resize((size, size), Image.Resampling.LANCZOS)
    star = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    star.paste(t, (0, 0), mask)
    d = ImageDraw.Draw(star)
    d.line(pts + [pts[0]], fill=(6, 4, 2, 255), width=max(6, int(r * 0.10)), joint="curve")
    base = img.convert("RGBA")
    sh = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    sm = mask.filter(ImageFilter.MaxFilter(9)).filter(ImageFilter.GaussianBlur(r * 0.12)).point(lambda v: int(v * 0.75))
    sh.putalpha(sm)
    ox, oy = int(cx - m), int(cy - m)
    base.alpha_composite(sh, (ox, oy + int(r * 0.12)))
    base.alpha_composite(star, (ox, oy))
    img = base.convert("RGB")
    dd = ImageDraw.Draw(img)
    f = cinzel(int(r * 0.92), "Bold")
    dd.text((cx, cy + r * 0.10), str(value), font=f, anchor="mm", fill=(250, 244, 228), stroke_width=max(3, int(r * 0.05)), stroke_fill=(10, 6, 4))
    return img


STAR = {  # typ: (cx, cy, r) im Arbeitsformat
    "Einheit": (172, 128, 108),
    "Unterstützung": (172, 128, 108),
    "Soforteinsatz": (176, 124, 108),
    "Ausrüstung": (176, 176, 108),
}


# ---------------- t311: Kartengrund + Textfelder des kleinen Designs ----------------
GROUND_ON = os.environ.get("DC_T311", "1") == "1"
GROUND_FN = None  # aktiver Grund während eines Renders (render.py setzt/löscht)
INK = (255, 248, 225)        # #fff8e1 wie klein
INK_STROKE = (10, 22, 40)    # #0a1628 wie klein (Navy-Kontur)
FLAVOR_INK = (232, 240, 255)  # #e8f0ff wie klein
HEAD_INK = (244, 210, 124)


def _seed_pick(seed, opts):
    return opts[(sum(map(ord, str(seed or "x"))) % len(opts))]


def _cover(tex, w, h, seed=""):
    """Cover-Zuschnitt einer Textur (nie verzerrt), Ausschnitt je Karte leicht verschoben."""
    tw, th = tex.size
    sc = max(w / tw, h / th)
    nw, nh = max(w, int(tw * sc + 0.5)), max(h, int(th * sc + 0.5))
    t = tex.resize((nw, nh), Image.Resampling.LANCZOS)
    k = sum(map(ord, str(seed))) if seed else 0
    ox = (k * 37) % max(1, nw - w + 1)
    oy = (k * 53) % max(1, nh - h + 1)
    return t.crop((ox, oy, ox + w, oy + h))


GROUND = {  # wie das kleine Design (DC-Bundle Jr): Infanterie Zeltbahn, übrige Einheiten Tarnstoff, Einsatz Marmor, Support Stahl, Doktrin Karte
    "infanterie": (["01-zeltbahn.jpg"], 0.78),
    "einheit": (["bg-einheit-a.jpg", "bg-einheit-b.jpg"], 0.70),
    "Soforteinsatz": (["bg-einsatz-a.jpg", "bg-einsatz-b.jpg"], 0.42),
    "Unterstützung": (["bg-unterstuetzung-a.jpg", "bg-unterstuetzung-b.jpg"], 0.55),
    "Doktrin": (["bg-doktrin-a.jpg"], 0.86),  # -b (Karte mit Pfeilen) zu unruhig; klein nutzt ruhiges Pergament
}


UNITS_GROUND = os.environ.get("DC_T311_UNITS", "0") == "1"  # t312: Nutzer: Einheiten ohne neuen Grund/Textbox


def ground_key(typ, branch):
    if typ == "Einheit":
        if not UNITS_GROUND:
            return None
        return "infanterie" if branch == "infanterie" else "einheit"
    return typ if typ in GROUND else None


def make_ground_fn(key, seed):
    files, val = GROUND[key]
    f = _seed_pick(seed, files)
    if TG.ON:  # t313: Farbreferenz a/b zufällig je Render
        f = files[int(TG._rng("ground", key).integers(0, len(files)))]
    cache = {}
    def fn(size):
        size = tuple(size)
        if size not in cache:
            if TG.has(f):  # t313: Kartengrund frisch generiert
                g = TG.texture(f, size)
            else:
                t = Image.open(K / f).convert("RGB")
                g = _cover(t, size[0], size[1], seed)
            g = ImageEnhance.Brightness(g).enhance(val)
            g = ImageEnhance.Color(g).enhance(0.85)
            # Randabdunklung wie Mr() im kleinen Design
            w, h = size
            vig = Image.new("L", (w, h), 0)
            vd = ImageDraw.Draw(vig)
            n = 60
            for i in range(n):
                a = int(150 * (1 - i / n) ** 2)
                vd.rectangle((i * 4, i * 4, w - 1 - i * 4, h - 1 - i * 4), outline=a, width=4)
            g = Image.composite(Image.new("RGB", size, (0, 0, 0)), g, vig)
            cache[size] = g
        return cache[size].copy()
    return fn


def field_panel(kind, size, seed=""):
    """Textfeld wie klein: mud (Einheit), blue (Unterstützung, mit Bauplan-Raster), leather (Einsatz)."""
    w, h = size
    src = {"mud": "oil-mud.jpg", "blue": "oil-blue.jpg", "leather": "leather.jpg"}[kind]
    if TG.has(src):  # t313: Textfeld frisch generiert
        p = TG.texture(src, (w, h), kind)
    else:
        t = Image.open(K / src).convert("RGB")
        p = _cover(t, w, h, seed + kind)
    base0 = p.copy()
    if kind == "leather":
        # leatherBase (74,30,26) per Farbton wie DC 'color'-Blend
        hsv = p.convert("HSV")
        hh, ss, vv = hsv.split()
        ref = Image.new("RGB", (1, 1), (74, 30, 26)).convert("HSV").getpixel((0, 0))
        hh = Image.new("L", p.size, ref[0]); ss = Image.new("L", p.size, ref[1])
        p = Image.merge("HSV", (hh, ss, vv)).convert("RGB")
        p = ImageEnhance.Brightness(p).enhance(1.25)
    if kind == "mud":
        p = ImageEnhance.Brightness(p).enhance(0.92)
    if kind == "blue":
        d = ImageDraw.Draw(p)
        step = 96
        for x in range(step // 2, w, step):
            d.line([(x, 0), (x, h)], fill=(150, 176, 220), width=1)
        for y in range(step // 2, h, step):
            d.line([(0, y), (w, y)], fill=(150, 176, 220), width=1)
        p = Image.blend(base0, p, 0.45)
    # Innenschatten (fr/hr im kleinen Design)
    sh = Image.new("L", (w, h), 0)
    sd = ImageDraw.Draw(sh)
    b = int(min(w, h) * 0.30)
    for i in range(0, b, 3):
        a = int(130 * (1 - i / b) ** 1.75)
        sd.rectangle((i, i, w - 1 - i, h - 1 - i), outline=a, width=3)
    return Image.composite(Image.new("RGB", (w, h), (0, 0, 0)), p, sh)


def paste_field(img, box, kind, seed="", metal=None):
    x0, y0, x1, y1 = [int(v) for v in box]
    p = field_panel(kind, (x1 - x0, y1 - y0), seed)
    m = Image.new("L", p.size, 0)
    ImageDraw.Draw(m).rounded_rectangle((0, 0, p.size[0] - 1, p.size[1] - 1), radius=12, fill=255)
    out = img.convert("RGB")
    out.paste(p, (x0, y0), m)
    if metal:
        out = bevel_frame(out, (x0, y0, x1, y1), metal, radius=12, band=8, rivets=True)
    return out


# ------------------------------------------------------------------ t316: Ausrüstung – Ocker-Feld mit Winkeln
GEAR_CHEVRON = os.environ.get("DC_T316", "1") != "0"
GEAR_INK = (24, 14, 4)          # dunkle Tinte auf Ocker
GEAR_HEAD_INK = (110, 26, 8)    # Überschrift Ochsenblut
GEAR_FLAVOR_INK = (58, 34, 12)
# wie klein (Gt): bronze 1 Winkel, silber 2, gold 3 – die Stufe = Seltenheit/Metall der Karte
CHEVRONS = {"bronze": (0,), "silber": (-1, 0), "silver": (-1, 0), "gold": (-1, 0, 1)}


def chevron_count(metal):
    return len(CHEVRONS.get(str(metal).lower(), (0,)))


def gear_field(size, metal):
    """Ocker-Pergament (prozedural, fester Karten-Seed) + helle, rund abgeschlossene Winkel (Geometrie
    wie klein Kt(): Mitte y=.46h, o=.4·min, Halbbreite min(.36w, 2.3o), Strich .36o, Höhe .58o, Abstand .42o)."""
    w, h = size
    if TG.has("parchment.jpg"):
        p = TG.texture("parchment.jpg", (w, h), "gearfield")
    else:
        p = _cover(Image.open(K / "parchment.jpg").convert("RGB"), w, h, "gearfield")
    # gelber/heller als das Asset, damit dunkle Tinte gut lesbar bleibt
    p = ImageEnhance.Color(ImageEnhance.Brightness(p).enhance(1.42)).enhance(1.12)
    light = ImageEnhance.Color(ImageEnhance.Brightness(p).enhance(1.40)).enhance(0.62)
    ss = 2
    W, H = w * ss, h * ss
    cx, a = W / 2, H * 0.46
    o = min(W, H) * 0.40
    hw = min(W * 0.36, o * 2.3)
    lw = o * 0.36
    c, l = o * 0.58, o * 0.42
    u = a - c / 2
    m = Image.new("L", (W, H), 0)
    d = ImageDraw.Draw(m)
    r = lw / 2
    for t in CHEVRONS.get(str(metal).lower(), (0,)):
        n = u + t * l
        pts = [(cx - hw, n + c), (cx, n), (cx + hw, n + c)]
        d.line(pts, fill=255, width=int(lw), joint="curve")
        for (x, y) in pts:
            d.ellipse((x - r, y - r, x + r, y + r), fill=255)
    m = m.resize((w, h), Image.Resampling.LANCZOS)
    # weicher dunkler Schlagschatten unter den Winkeln → Winkel klar vom Grund abgesetzt
    sh = m.filter(ImageFilter.GaussianBlur(6)).point(lambda v: int(v * 0.6))
    sh = ImageChops_offset(sh, 3, 5)
    p = Image.composite(Image.new("RGB", (w, h), (60, 30, 6)), p, sh)
    p = Image.composite(light, p, m)
    # Innenschatten (hr im kleinen Design, rgba(62,28,6))
    shd = Image.new("L", (w, h), 0)
    sd = ImageDraw.Draw(shd)
    b = int(min(w, h) * 0.22)
    for i in range(0, b, 3):
        sd.rectangle((i, i, w - 1 - i, h - 1 - i), outline=int(120 * (1 - i / b) ** 1.6), width=3)
    return Image.composite(Image.new("RGB", (w, h), (62, 28, 6)), p, shd)


def ImageChops_offset(im, dx, dy):
    from PIL import ImageChops
    return ImageChops.offset(im, dx, dy)


def paste_gear_field(img, box, metal, frame_metal=None):
    x0, y0, x1, y1 = [int(v) for v in box]
    p = gear_field((x1 - x0, y1 - y0), metal)
    mk = Image.new("L", p.size, 0)
    ImageDraw.Draw(mk).rounded_rectangle((0, 0, p.size[0] - 1, p.size[1] - 1), radius=12, fill=255)
    out = img.convert("RGB")
    out.paste(p, (x0, y0), mk)
    if frame_metal:
        out = bevel_frame(out, (x0, y0, x1, y1), frame_metal, radius=12, band=8, rivets=True)
    return out


# ------------------------------------------------------------------ t318: Schrift auf Ocker = Variante C
GEAR_TXT_C = os.environ.get("DC_T318", "1") != "0"
# t319: identisch zu Unterstützung/Soforteinsatz (INK, 2 px Navy-Kontur INK_STROKE, HEAD_INK, FLAVOR_INK);
# einziger Zusatz auf dem hellen Ocker: weicher Schlagschatten (DC_T318_SHADOW=0 → ohne, exakt wie die anderen)
GEAR_C_INK = INK
GEAR_C_STROKE = INK_STROKE
GEAR_C_FLAVOR = FLAVOR_INK
GEAR_C_SHADOW = os.environ.get("DC_T318_SHADOW", "1") != "0"


def soft_text(img, calls, sk, off=(3, 3), blur=6, alpha=210, shade=(6, 4, 2)):
    """Zeichnet gesammelte Textaufrufe [(xy, text, kw)] mit weichem Schlagschatten darunter und
    dünner Kontur (sk) – Variante C (weiß + dünne schwarze Kontur + weicher Schatten)."""
    if not GEAR_C_SHADOW:
        alpha = 0
    sh = Image.new("L", img.size, 0)
    sd = ImageDraw.Draw(sh)
    for (xy, t, kw) in calls:
        k2 = {k: v for k, v in kw.items() if k in ("font", "anchor")}
        sd.text((xy[0] + off[0], xy[1] + off[1]), t, fill=255, stroke_width=2, **k2)
    gain = alpha / 255 * 1.6
    sh = sh.filter(ImageFilter.GaussianBlur(blur)).point(lambda v: min(255, int(v * gain)))
    out = Image.composite(Image.new("RGB", img.size, shade), img.convert("RGB"), sh)
    d = ImageDraw.Draw(out)
    for (xy, t, kw) in calls:
        kw = dict(kw)
        kw.update(sk)
        d.text(xy, t, **kw)
    return out
