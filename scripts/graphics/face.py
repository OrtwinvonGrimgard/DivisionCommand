#!/usr/bin/env python3
"""t212 Kartenvorderseite im Originalrahmen des KartenEditor-Renderers (KartenEditor/tools/render.py):
Kostenstern, Namensbanner in Waffenfarbe, Tag-Leiste, ATK/DEF-Plaketten, Logo, Metallrahmen nach Seltenheit.
gfx3.1: Grundschrift 100 px, nur bei Bedarf kleiner (bis 42 px); Karten ohne Regeltext zeigen Schlüsselwort-Erinnerungen; Doktrinen mit eigenem Motiv.
gfx3: festes Motivfenster 42 % Kartenhöhe (Original 38 %), feste große Textfläche; Schriftgröße stuft sich
bei langen Texten automatisch ab (58 -> 40 px), Flavor fällt notfalls weg.
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
ART_H = 900  # fest 1396x900 (42 % Kartenhöhe; Original-Renderer 816 = 38 %); 4:3-Motive nur zugeschnitten, nie gestreckt
STEPS = [(100, 118), (94, 111), (88, 104), (83, 98), (78, 94), (74, 89), (70, 84), (66, 80), (62, 76), (58, 71), (54, 66), (50, 61), (46, 56), (42, 51)]  # gfx3.1: groß beginnen, nur bei Bedarf kleiner
FLAVOR_PX, FLAVOR_LH = 40, 52
# Kurz-Erinnerungstexte für Karten ohne eigenen Regeltext (Volltext: docs/regeln/SCHLUESSELWOERTER.md)
REMIND = {
 'Gefechtsbereit': 'Greift schon im Zug des Einsatzes an; ohne Eingraben-Schutz.',
 'Ablösung': 'Zerstört: nächste eigene Einheit auf diesem Feld kostet 1 AP weniger.',
 'Staffelangriff': '+1 ATK, wenn diesen Zug schon eine andere eigene Einheit angriff.',
 'Fernschuss': '+1 Reichweite.',
 'Durchschlag': 'Ignoriert 1 DEF des Ziels.',
 'Platztausch': 'Beim Aufdecken darf sie mit einer eigenen verdeckten Einheit tauschen.',
 'Überlast': '+2 ATK, +1 DEF; am Ende deines Zugs 1 unverhinderbarer Schaden.',
 'Abschirmung': '1× pro Zug 1 Schaden einer benachbarten eigenen Einheit auf sich umleiten.',
 'Erbitterung': '+1 ATK je zerstörter eigener Einheit (max. +3).',
 'Heranführung': 'Beim Einsatz: nächste Einheit in diesem Zug kostet 1 AP weniger.',
 'Stellungswechsel': '1× pro Zug auf ein freies Nachbarfeld der Reihe; dann kein Angriff.',
 'Zuteilung': 'Beim Einsatz: ziehe 1 Karte.',
 'Sicherung': 'Andere eigene Einheiten im Abschnitt +1 DEF, solange sie offen liegt.',
 'Nachsetzen': '+2 ATK gegen Ziele, die diesen Zug schon Schaden nahmen.',
 'Hinterhalt': '+2 ATK beim ersten Angriff nach dem Aufdecken.',
 'Zähigkeit': '+1 DEF je zerstörter eigener Einheit (max. +3).',
 'Indirektes Feuer': 'Darf jede gegnerische Fronteinheit angreifen.',
 'Absetzen': 'Nach ihrem Angriff verdeckt bis zu deinem nächsten Zug.',
 'Erstschadenschutz': 'Der erste verhinderbare Schaden wird ignoriert.',
 'Binden': '1 AP, statt Angriff: gegnerische Fronteinheit gegenüber darf nicht weg.',
 'Anmarschstörung': '1 AP: erste neue gegnerische Einheit im Abschnitt kostet +1 AP.',
 'Feuerschutz': '1 AP, statt Angriff: Nachbar greift gewähltes Ziel verstärkt an.',
 'Gefechtsabbruch': 'Reaktion, 1 AP: nach überlebtem Angriff aufs Nachbarfeld ausweichen.',
 'Vorpostenmeldung': 'Deckt die erste neu gegenüber eingesetzte verdeckte Einheit auf.',
}

def body_text(kurz, kws):
    """Kein eigener Regeltext -> Erinnerungstexte der Schlüsselwörter statt leerer Fläche (dann ohne Chips)."""
    if (kurz or '').strip() or not kws: return kurz, kws, False
    return '\n'.join(k + ': ' + REMIND.get(k, '') for k in kws), [], True
CHIP_PX = 40
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

def fit(kurz, kws, flavor, avail):
    inner = W - 2 * 78 - 76
    ff = M.font(M.FONT_I, FLAVOR_PX)
    fl = wrap('„' + flavor + '“', ff, inner)[:2] if flavor else []
    chips = CHIP_PX + 36 if kws else 0
    for keep_fl in (True, False):
        for px, lh in STEPS:
            if keep_fl and px < 70: break  # Regeltext hat Vorrang: lieber Flavor weglassen als winzige Schrift
            lines = wrap(kurz, M.font(M.FONT_R, px), inner)
            f2 = fl if keep_fl else []
            h = chips + lh * len(lines) + (24 + 36 + FLAVOR_LH * len(f2) if f2 else 0)
            if h <= avail - 60: return px, lh, lines, f2, h
    return px, lh, lines, [], h

def plan(card, kurz, kws):
    """Eine Geometrie für alle Typen/Nationen: Motivfenster, Namensbanner, Tag-Leiste, Textfläche immer gleich groß und gleich platziert."""
    typ = card.get('typ') or 'Einheit'
    tags = M.gameplay_tags(card) if typ != 'Doktrin' else []
    art_box = (70, ART_TOP, W - 70, ART_TOP + ART_H)
    name_y = art_box[3] + GAP
    tag_y = name_y + NAME_H + M.TAG_GAP
    y = name_y + NAME_H + M.TAG_GAP + 56 + M.TAG_GAP  # Tag-Leiste immer reserviert
    panel = (78, y, W - 78, PANEL_BOTTOM)
    kurz, kws, remind = body_text(kurz, kws)
    px, lh, lines, flines, h = fit(kurz, kws, (card.get('flavor') or '').strip(), PANEL_BOTTOM - y)
    return dict(art_box=art_box, name_y=name_y, tag_y=tag_y, tags=tags, panel=panel, lines=lines, flines=flines, kws=kws, remind=remind,
                body_px=px, line_h=lh, content_h=h)

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
    if art_path: art = cover(art_path, ax1 - ax0, ay1 - ay0)
    else:  # Doktrin ohne Motiv: dunkler Marmor im selben Fenster + Doktrin-Stern
        art = Image.blend(M.make_panel('marmor', (ax1 - ax0, ay1 - ay0)).convert('RGB'), Image.new('RGB', (ax1 - ax0, ay1 - ay0), (12, 9, 6)), 0.35)
        sd = ImageDraw.Draw(art); cx, cy, ro = (ax1 - ax0) / 2, (ay1 - ay0) / 2, 300
        import math
        pts = [(cx + (ro if k % 2 == 0 else ro * 0.4) * math.sin(math.pi * k / 5), cy - (ro if k % 2 == 0 else ro * 0.4) * math.cos(math.pi * k / 5)) for k in range(10)]
        sd.polygon(pts, outline=tuple(M.GOLD), width=10); sd.ellipse((cx - ro - 40, cy - ro - 40, cx + ro + 40, cy + ro + 40), outline=tuple(M.GOLD_DK), width=6)
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
        pan = M.make_panel('marmor', (tx1 - tx0, ty1 - ty0)).convert('RGB')
        pan = Image.blend(pan, Image.new('RGB', pan.size, (12, 9, 6)), 0.45)  # Marmor abdunkeln -> Text lesbar
        img.paste(pan, (tx0, ty0))
        d = ImageDraw.Draw(img); d._image = img
        d.rectangle((tx0, ty0, tx1, ty1), outline=rim, width=3)
    else:
        img = R.paste_leather_plaque(img, (tx0, ty0, tx1, ty1))
        d = ImageDraw.Draw(img); d._image = img
    y = ty0 + max(30, (ty1 - ty0 - p['content_h']) // 2)  # Inhalt vertikal zentriert
    if p['kws']:
        draw_chips(d, tx0 + 36, y, p['kws'], rim); y += CHIP_PX + 36
    body = M.font(M.FONT_R, p['body_px'])
    bold = M.font(M.FONT_B, p['body_px'])
    for ln in p['lines']:
        if p.get('remind') and ':' in ln and ln.split(':')[0] in REMIND:  # Schlüsselwort fett, Erinnerung normal
            k, rest = ln.split(':', 1)
            d.text((tx0 + 38, y), k + ':', font=bold, fill=(246, 224, 160))
            d.text((tx0 + 38 + d.textlength(k + ':', font=bold), y), rest, font=body, fill=(240, 230, 204))
        else:
            d.text((tx0 + 38, y), ln, font=body, fill=(240, 230, 204))
        y += p['line_h']
    if p['flines']:
        y += 24; d.line([(tx0 + 90, y), (tx1 - 90, y)], fill=rim, width=2); y += 36
        ff = M.font(M.FONT_I, FLAVOR_PX)
        for ln in p['flines']:
            d.text((W / 2, y + 22), ln, font=ff, fill=(196, 168, 110), anchor='mm'); y += FLAVOR_LH
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
    return dict(p, art_box=list(p['art_box']), panel=list(p['panel']), body_px=p['body_px'])

def render_doctrine_old(card, kurz, dest, number='001', edition='ALPHA'):  # gfx2, nicht mehr benutzt
    tmp = Path(dest).with_suffix('.tmp.png')
    R.render(dict(card, text=kurz), None, str(tmp), metal=metal_of(card), number=number, edition=edition)
    im = Image.open(tmp).convert('RGBA'); tmp.unlink()
    small = im.resize((1024, 1424), Image.Resampling.LANCZOS)
    out = Image.new('RGBA', (1024, 1428), (0, 0, 0, 0)); out.paste(small, (0, 2))
    out.save(dest, 'WEBP', quality=82, method=6)
    return {}
