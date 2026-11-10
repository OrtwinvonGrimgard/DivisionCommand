#!/usr/bin/env python3
"""Old-alpha Kartenvorderseite (freigegebenes Layout):
- Motivfenster 40 % der Kartenhöhe (854 von 2136), Cover-Zuschnitt, nie gestreckt
- Grundschrift 60/62 px mit Auto-Stufen bis 36; Flavor fällt vor zu kleiner Schrift weg
- Elite: Textpanel rechts um Ordenbreite eingezogen
- Doktrinen: Bollwerk-Stil (Sternwappen, Leder-Tafeln, kein Motiv)
Arbeitet über KartenEditor/tools/render.py (+ render_core.py). Ausgabe 1024×1428 WEBP.
"""
from __future__ import annotations
import sys
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[2]
TOOLS = ROOT / 'KartenEditor' / 'tools'
sys.path.insert(0, str(TOOLS))

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

ART_H = 854  # 40 % von 2136
ART_PCT = 40.0


def metal_of(c):
    """Wählt die Metallfarbe (Gold/Silber/Bronze) zur Seltenheit."""
    r = str(c.get('rarity') or '').lower()
    if r in ('gold', 'silber', 'silver', 'bronze'):
        return {'silver': 'silber'}.get(r, r)
    return {1: 'gold', 2: 'silber'}.get(c.get('max_copies'), 'bronze')


def face_text(kurz, card):
    """Setzt den sichtbaren Fronttext aus kurz.json und Kartendaten zusammen."""
    kurz = (kurz or '').strip()
    kws = card.get('keywords') or []
    if kurz:
        return kurz
    if kws:
        return ' '.join(f'{k}: {REMIND[k]}' if k in REMIND else f'{k}.' for k in kws)
    return (card.get('text') or '').strip()


def enrich_tags(card):
    """Ergänzt sichtbare Spiel-Tags für die Front (ohne Regeländerung)."""
    tags = list(card.get('tags') or [])
    have = {str(t).lower() for t in tags}
    for k in (card.get('keywords') or []):
        if k.lower() not in have and len(tags) < 6:
            tags.append(k)
    return tags


def to_face(im: Image.Image, dest: Path):
    """1536×2136 (oder Token-Native) -> 1024×1428 WEBP, nie gestreckt (gleicher 2/3-Pfad wie gfx)."""
    im = im.convert('RGBA')
    if im.size != (1536, 2136):
        # Token frames may differ; fit into 1536x2136 canvas centered then downscale
        canvas = Image.new('RGBA', (1536, 2136), (0, 0, 0, 0))
        src = im
        sc = min(1536 / src.size[0], 2136 / src.size[1])
        nw, nh = max(1, int(src.size[0] * sc)), max(1, int(src.size[1] * sc))
        src = src.resize((nw, nh), Image.Resampling.LANCZOS)
        canvas.paste(src, ((1536 - nw) // 2, (2136 - nh) // 2), src if src.mode == 'RGBA' else None)
        im = canvas
    small = im.resize((1024, 1424), Image.Resampling.LANCZOS)
    out = Image.new('RGBA', (1024, 1428), (0, 0, 0, 0))
    out.paste(small, (0, 2))
    dest.parent.mkdir(parents=True, exist_ok=True)
    out.save(dest, 'WEBP', quality=82, method=6)
    return {'art_h': ART_H, 'art_pct': ART_PCT}


def render(card, art_path, kurz, dest, number='001', edition='ALPHA'):
    """Rendert eine Kartenfront im alpha40-Layout (1024×1428, ohne Strecken) nach dest."""
    import render as R  # KartenEditor/tools/render.py
    c = dict(card)
    typ = c.get('typ') or 'Einheit'
    c['text'] = face_text(kurz, c)
    c['tags'] = enrich_tags(c)
    if typ == 'Doktrin':
        c['tags'] = ['doktrin']
        art_path = None
    metal = metal_of(c)
    dest = Path(dest)
    tmp = dest.with_suffix('.tmp.png')
    if typ == 'Token':
        R.render_token(c, str(tmp), metal=metal, art=art_path)
    else:
        R.render(c, art_path, str(tmp), number=number, metal=metal, edition=edition)
    im = Image.open(tmp)
    lay = to_face(im, dest)
    tmp.unlink(missing_ok=True)
    return lay
