#!/usr/bin/env python3
"""t212 Kartenvorderseite im Originalrahmen des KartenEditor-Renderers (KartenEditor/tools/render.py):
Kostenstern, Namensbanner in Waffenfarbe, Tag-Leiste, ATK/DEF-Plaketten, Logo, Metallrahmen nach Seltenheit.
Neu: das Motiv dominiert, die Textfläche ist so groß wie ihr Inhalt (knapper Flächentext + Schlüsselwort-Chips).
Motiv: ein einziges LANCZOS-Skalieren mit Cover-Zuschnitt, nie verzerrt, keine Unschärfefüllung.
Arbeitsformat 1536x2136 -> exakt 2/3 = 1024x1424, oben/unten je 2 px transparent -> 1024x1428."""
import sys, importlib.util
from pathlib import Path
from PIL import Image, ImageDraw, ImageEnhance
ROOT = Path(__file__).resolve().parents[2]
TOOLS = ROOT / 'KartenEditor/tools'
sys.path.insert(0, str(TOOLS))
import render as R  # noqa: E402  (Original-Renderer; lädt render_core als R._mod)
M = R._mod
W, H = 1536, 2136
ART_TOP, NAME_H, GAP = 56, 128, 14
PANEL_BOTTOM = 1890
MAX_ART_H = 1240
BODY_PX, LINE_H, CHIP_PX = 54, 66, 40
METAL = {'bronze': 'bronze', 'silber': 'silber', 'silver': 'silber', 'gold': 'gold'}

def metal_of(c):
    r = str(c.get('rarity') or '').lower()
    if r in METAL: return METAL[r]
    mc = c.get('max_copies')
    return {1: 'gold', 2: 'silber'}.get(mc, 'bronze')

def cover(path, tw, th):
    src = Image.open(path).convert('RGB')
    sw, sh = src.size
    s = max(tw / sw, th / sh)
    cw, ch = min(sw, tw / s), min(sh, th / s)
    x0, y0 = max(0.0, (sw - cw) / 2), max(0.0, (sh - ch) * 0.42)  # leicht nach oben gewichtet (Köpfe/Horizont)
    return src.resize((tw, th), Image.Resampling.LANCZOS, box=(x0, y0, x0 + cw, y0 + ch))

def wrap(text, fnt, max_w):
    d = ImageDraw.Draw(Image.new('RGB', (8, 8)))
    out = []
    for para in str(text or '').split('\n'):
        line = ''
        for w in para.split():
            t = (line + ' ' + w).strip()
            if d.textlength(t, font=fnt) <= max_w: line = t
            else:
                if line: out.append(line)
                line = w
        if line: out.append(line)
    return out

def plan(card, kurz, kws):
    typ = card.get('typ') or 'Einheit'
    tags = M.gameplay_tags(card) if typ != 'Doktrin' else []
    body = M.font(M.FONT_R, BODY_PX)
    inner = W - 2 * 78 - 76
    lines = wrap(kurz, body, inner)
    flavor = (card.get('flavor') or '').strip()
    ff = M.font(M.FONT_I, 36)
    flines = wrap('„' + flavor + '“', ff, inner)[:2] if flavor else []
    ph = 34 + (CHIP_PX + 36 if kws else 0) + LINE_H * len(lines) + (18 + 32 + 48 * len(flines) if flines else 0) + 30
    ph = max(ph, 150)
    tags_h = (M.TAG_GAP + 56 + M.TAG_GAP) if tags else 0
    sofort = typ == 'Soforteinsatz'
    head = ART_TOP + (NAME_H + 20 if sofort else 0)
    art_h = PANEL_BOTTOM - ph - tags_h - (0 if sofort else NAME_H + GAP) - GAP - head
    art_h = min(art_h, MAX_ART_H)
    art_box = (70, head, W - 70, head + art_h)
    y = art_box[3] + GAP
    name_y = ART_TOP if sofort else y
    if not sofort: y += NAME_H
    tag_y = y + M.TAG_GAP if tags else None
    y += tags_h
    panel = (78, y, W - 78, PANEL_BOTTOM)
    return dict(art_box=art_box, name_y=name_y, tag_y=tag_y, tags=tags, panel=panel, lines=lines, flines=flines, kws=kws)

def stock_for(card):
    typ = card.get('typ')
    if typ == 'Unterstützung': return R.steel_stock((W, H))
    if typ == 'Soforteinsatz': return R.burnt_stock((W, H))
    if typ == 'Ausrüstung':
        return {'brass': R.brass_stock, 'olive': R.olive_stock}.get(str(card.get('gear_style') or 'lacquer'), R.lacquer_stock)((W, H))
    return M.brushed_stock((W, H))

def draw_chips(d, x0, y, kws, rim):
    f = M.font(M.FONT_B, CHIP_PX - 6)
    x = x0
    for k in kws:
        tw = d.textlength(k.upper(), font=f)
        d.rounded_rectangle((x, y, x + tw + 44, y + CHIP_PX + 8), radius=10, fill=(26, 18, 10), outline=rim, width=3)
        d.text((x + 22, y + (CHIP_PX + 8) / 2), k.upper(), font=f, fill=(246, 224, 160), anchor='lm')
        x += tw + 44 + 18

def render(card, art_path, kurz, kws, dest, number='001', edition='ALPHA'):
    M.apply_metal(metal_of(card))
    M._current_card = card
    R._mod._current_card = card
    typ = card.get('typ') or 'Einheit'
    p = plan(card, kurz, kws)
    img = stock_for(card).convert('RGB')
    ax0, ay0, ax1, ay1 = p['art_box']
    art = cover(art_path, ax1 - ax0, ay1 - ay0)
    art = ImageEnhance.Contrast(ImageEnhance.Color(art).enhance(1.06)).enhance(1.06)
    # Original-Vignette des Renderers (weiche Kante), ohne Füllflächen
    am = Image.new('L', art.size, 255); ad = ImageDraw.Draw(am)
    for i in range(40): ad.rectangle((i, i, art.size[0] - 1 - i, art.size[1] - 1 - i), outline=255 - int(i * 2.2))
    img.paste(Image.composite(art, Image.new('RGB', art.size, (10, 6, 4)), am), (ax0, ay0))
    d = ImageDraw.Draw(img); d._image = img
    rim = tuple(getattr(M, 'GOLD', M.GOLD))
    d.rectangle(p['art_box'], outline=rim, width=3)
    for (x, y, dx, dy) in ((ax0 + 8, ay0 + 8, 1, 1), (ax1 - 8, ay0 + 8, -1, 1), (ax0 + 8, ay1 - 8, 1, -1), (ax1 - 8, ay1 - 8, -1, -1)):
        d.line([(x, y + dy * 54), (x, y), (x + dx * 54, y)], fill=M.GOLD_LT, width=6)
        d.line([(x, y + dy * 44), (x, y), (x + dx * 44, y)], fill=M.GOLD_DK, width=2)
    R.name_plaque(d, 'rect', p['name_y'], card.get('name') or '', W)
    if p['tags']: R.draw_tag_banners(d, p['tag_y'], p['tags'], W)
    tx0, ty0, tx1, ty1 = p['panel']
    if typ == 'Einheit':
        img.paste(M.make_panel('marmor', (tx1 - tx0, ty1 - ty0)), (tx0, ty0))
        d = ImageDraw.Draw(img); d._image = img
        d.rectangle((tx0, ty0, tx1, ty1), outline=rim, width=3)
    else:
        img = R.paste_leather_plaque(img, (tx0, ty0, tx1, ty1))
        d = ImageDraw.Draw(img); d._image = img
    y = ty0 + 34
    if p['kws']:
        draw_chips(d, tx0 + 36, y, p['kws'], rim); y += CHIP_PX + 36
    body = M.font(M.FONT_R, BODY_PX)
    for ln in p['lines']:
        d.text((tx0 + 38, y), ln, font=body, fill=(240, 230, 204)); y += LINE_H
    if p['flines']:
        y += 18; d.line([(tx0 + 90, y), (tx1 - 90, y)], fill=rim, width=2); y += 32
        ff = M.font(M.FONT_I, 36)
        for ln in p['flines']:
            d.text((W / 2, y + 20), ln, font=ff, fill=(196, 168, 110), anchor='mm'); y += 48
    if typ == 'Einheit':
        img = M.draw_stat_box(img, 120, 1920, 'ATK', card.get('atk', 0), 'crosshair')
        img = M.draw_stat_box(img, W - 400, 1920, 'DEF', card.get('def', 0), 'shield')
    img = R.paste_main_logo(img, number, edition, False)
    if M.card_is_elite(card) and p['tags']: img = R.paste_elite_order_at(img, p['tag_y']) if hasattr(R, 'paste_elite_order_at') else img
    img = R.finish_frame(img)
    if typ in ('Einheit', 'Unterstützung', 'Ausrüstung'):
        img = R.mill_coin(img, 210, 210, 118, int(card.get('ap') or 0))
    img = R.cut_card_corners(img)
    small = img.resize((1024, 1424), Image.Resampling.LANCZOS)
    out = Image.new('RGBA', (1024, 1428), (0, 0, 0, 0)); out.paste(small, (0, 2))
    Path(dest).parent.mkdir(parents=True, exist_ok=True)
    out.save(dest, 'WEBP', quality=82, method=6)
    return dict(p, art_box=list(p['art_box']), panel=list(p['panel']))

def render_doctrine(card, kurz, dest, number='001', edition='ALPHA'):
    tmp = Path(dest).with_suffix('.tmp.png')
    R.render(dict(card, text=kurz), None, str(tmp), metal=metal_of(card), number=number, edition=edition)
    im = Image.open(tmp).convert('RGBA'); tmp.unlink()
    small = im.resize((1024, 1424), Image.Resampling.LANCZOS)
    out = Image.new('RGBA', (1024, 1428), (0, 0, 0, 0)); out.paste(small, (0, 2))
    out.save(dest, 'WEBP', quality=82, method=6)
    return {}
