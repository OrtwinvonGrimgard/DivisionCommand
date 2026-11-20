"""Kopfbedeckungs-Layer: schirm (Schirmmütze), zweit (Barett/Feldmütze je Nation), parade (hohe Paradeschirmmütze)."""
from __future__ import annotations
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from pcommon import *
from symbols import symbol_mask, metalize
from scipy.ndimage import distance_transform_edt

DY = 44   # Kopf sitzt 44 px tiefer als beim Entwurf der Mütze
HY0, HH = 150 * 0 + 160, 560      # Fenster (SS) y 160..720  (Canvas 80..360)


def _P(pts):
    return [(x * S, y * S - HY0) for x, y in pts]


def _light(c, f):
    return tuple(max(0, min(255, int(v * f))) for v in c)


def fabric(mask_img, col, rng, seed, dome_cx=CX * S, dome_cy=None, strength=1.0):
    """Mütze schattieren: Maske -> RGB-Array mit Wölbung und Gewebe."""
    m = np.asarray(mask_img, np.float32) / 255.0
    Y, X = np.mgrid[HY0:HY0 + HH, 0:SW].astype(np.float32)
    d = distance_transform_edt(m > 0.5)
    z = 100 * np.sqrt(1 - (1 - np.minimum(d / 60.0, 1)) ** 2) + 30 * np.sqrt(np.clip(1 - ((X - dome_cx) / 330.0) ** 2, 0, 1))
    z += blur(rng.randn(*X.shape).astype(np.float32), 18) * 40
    sh = lambert(z * 0.9)
    base = np.array(col, np.float32)
    w = np.sin(X * 1.6) * np.sin(Y * 1.6) * 3 + blur(rng.randn(*X.shape).astype(np.float32), 0.7) * 5
    rgb = base * (0.30 + 0.82 * sh[..., None]) + w[..., None]
    return rgb, sh


def render_headgear(kind, cfg, nat, tier, seed=0):
    """kind: schirm|zweit|parade. tier 0..3 (Kadett/Kompanie=0, Stab=1, Generalität=2, Marschall=3)."""
    rng = np.random.RandomState(seed + 31)
    crown = tuple(cfg["crown"])
    band = tuple(cfg["band"])
    pip = tuple(cfg.get("piping") or nat["metal_lo"])
    lo, hi = tuple(nat["metal_lo"]), tuple(nat["metal_hi"])
    emb = hi if tier >= 2 else lo
    out = new_layer()
    body = Image.new("RGBA", (SW, HH), (0, 0, 0, 0))
    bd = ImageDraw.Draw(body)
    mask = Image.new("L", (SW, HH), 0)
    md = ImageDraw.Draw(mask)
    badge_xy = (CX, 258)
    if kind in ("schirm", "parade"):
        tall = 1.0 if kind == "schirm" else 1.0
        top = 140 if kind == "schirm" else 112
        flare = 148 if kind == "schirm" else 140
        crown_poly = [(CX - 114, 262), (CX - 118, 236), (CX - 138, 196), (CX - flare, top + 26), (CX - flare + 8, top + 8)]
        left = crown_poly
        outline = left + [(CX, top - 6)] + [(2 * CX - x, y) for x, y in left[::-1]]
        # Kronenfläche (Vorderseite) + obere Fläche
        md.polygon(_P(outline + [(CX + 114, 262), (CX - 114, 262)][0:0]), fill=255)
        md.polygon(_P([(CX - 114, 262), (CX + 114, 262), (CX + 118, 236), (CX + 138, 196), (CX + flare, top + 26), (CX + flare - 8, top + 8), (CX, top - 6), (CX - flare + 8, top + 8), (CX - flare, top + 26), (CX - 138, 196), (CX - 118, 236)]), fill=255)
        # Band
        band_poly = [(CX - 116, 232), (CX + 116, 232), (CX + 112, 274), (CX, 280), (CX - 112, 274)]
        md.polygon(_P(band_poly), fill=255)
        mask = mask.filter(ImageFilter.GaussianBlur(1.2))
        rgb, sh = fabric(mask, crown, rng, seed)
        arr = rgb
        # Obere Fläche etwas heller (Deckel)
        top_im = Image.new("L", (SW, HH), 0)
        ImageDraw.Draw(top_im).ellipse([(CX - flare + 4) * S, (top - 12) * S - HY0, (CX + flare - 4) * S, (top + 26) * S - HY0], fill=255)
        tm = blur(np.asarray(top_im, np.float32) / 255.0, 3)
        arr = arr * (1 - 0.0) + tm[..., None] * np.array([26, 24, 22])
        # Band
        bm = Image.new("L", (SW, HH), 0)
        ImageDraw.Draw(bm).polygon(_P(band_poly), fill=255)
        bmn = blur(np.asarray(bm, np.float32) / 255.0, 1.0)
        brgb, _ = fabric(bm, band, rng, seed + 1)
        arr = arr * (1 - bmn[..., None]) + brgb * bmn[..., None]
        alpha = np.asarray(mask, np.float32) / 255.0
        img = arr_to_img(arr, alpha)
        body.alpha_composite(img)
        bd = ImageDraw.Draw(body)
        # Paspel am Bandrand und Kronenkante
        bd.line(_P([(CX - 116, 232), (CX - 114, 262)] * 0 + [(CX - 116, 232), (CX, 236), (CX + 116, 232)]), fill=pip + (255,), width=3 * S)
        bd.line(_P([(CX - 112, 274), (CX, 280), (CX + 112, 274)]), fill=_light(pip, 0.6) + (255,), width=2 * S)
        if kind == "parade":
            bd.line(_P([(CX - flare + 8, top + 8), (CX, top - 6), (CX + flare - 8, top + 8)]), fill=pip + (255,), width=3 * S)
        # Nähte der Krone
        for s_ in (-1, 1):
            bd.line(_P([(CX + s_ * 40, 232), (CX + s_ * 70, top + 22)]), fill=_light(crown, 0.55) + (200,), width=2 * S)
        # Mützenschirm (Vorderansicht: gebogene, dunkle Linse über der Stirn)
        visor = [(CX - 104, 270), (CX - 70, 296), (CX, 308), (CX + 70, 296), (CX + 104, 270), (CX + 112, 276), (CX + 76, 304), (CX, 316), (CX - 76, 304), (CX - 112, 276)]
        vm = Image.new("L", (SW, HH), 0)
        ImageDraw.Draw(vm).polygon(_P(visor), fill=255)
        vmn = blur(np.asarray(vm, np.float32) / 255.0, 1.0)
        Y, X = np.mgrid[HY0:HY0 + HH, 0:SW].astype(np.float32)
        vcol = np.array(cfg.get("visor", (20, 18, 18)), np.float32)
        vgrad = 0.55 + 0.9 * np.clip(1 - np.abs(X - CX * S) / 190.0, 0, 1) ** 2 * np.clip((Y - 560) / 80.0, 0, 1)
        vrgb = vcol[None, None, :] * vgrad[..., None] + 12
        vim = arr_to_img(vrgb, vmn)
        body.alpha_composite(vim)
        bd = ImageDraw.Draw(body)
        # Schirm: Stirnschatten (Wurf auf Gesicht)
        shadow = Image.new("RGBA", (SW, HH), (0, 0, 0, 0))
        ImageDraw.Draw(shadow).polygon(_P([(CX - 100, 292), (CX, 316), (CX + 100, 292), (CX + 90, 322), (CX, 336), (CX - 90, 322)]), fill=(10, 6, 6, 150))
        shadow = shadow.filter(ImageFilter.GaussianBlur(10))
        body.alpha_composite(shadow)
        if tier >= 2:
            # Eichenlaub auf dem Schirm
            for i in range(-6, 7):
                x = CX + i * 14
                y = 296 + 14 - abs(i) * 1.1 + (-2 if i % 2 else 0)
                bd.ellipse(_P([(x - 5, y - 4), (x + 5, y + 4)])[0] + _P([(x - 5, y - 4), (x + 5, y + 4)])[1], fill=hi + (255,), outline=_light(hi, 0.55) + (255,))
        if tier >= 1:
            bd.line(_P([(CX - 100, 278), (CX, 290), (CX + 100, 278)]), fill=(emb if tier >= 2 else lo) + (255,), width=3 * S)
        if tier >= 3:
            bd.line(_P([(CX - 112, 246), (CX, 252), (CX + 112, 246)]), fill=hi + (255,), width=4 * S)
        # Kinnriemen/Zierschnur
        if tier >= 2:
            bd.line(_P([(CX - 112, 268), (CX, 288), (CX + 112, 268)]), fill=hi + (255,), width=2 * S)
        badge_xy = (CX, 256)
    elif kind == "zweit":
        style = nat["second_cap"]
        if style == "barett":
            # Barett: flache Scheibe, nach rechts gekippt, enges Band
            bw = 164
            poly = [(CX - 120, 258), (CX - 142, 214), (CX - 130, 178), (CX - 60, 148), (CX + 50, 138), (CX + 130, 160), (CX + 164, 196), (CX + 140, 230), (CX + 118, 258)]
            md.polygon(_P(poly), fill=255)
            mask = mask.filter(ImageFilter.GaussianBlur(2.0))
            rgb, sh = fabric(mask, crown, rng, seed + 2)
            alpha = np.asarray(mask, np.float32) / 255.0
            body.alpha_composite(arr_to_img(rgb, alpha))
            bd = ImageDraw.Draw(body)
            bd.line(_P([(CX - 118, 252), (CX, 262), (CX + 116, 252)]), fill=_light(crown, 0.45) + (255,), width=6 * S)
            bd.line(_P([(CX - 118, 250), (CX, 259), (CX + 116, 250)]), fill=pip + (200,), width=2 * S)
            badge_xy = (CX - 56, 214)
        else:
            # Feldmütze (Schiffchen, frontal): trapezförmig mit Aufschlag und Frontspitze
            poly = [(CX - 112, 262), (CX - 120, 214), (CX - 100, 168), (CX - 30, 150), (CX, 126), (CX + 30, 150), (CX + 100, 168), (CX + 120, 214), (CX + 112, 262), (CX, 272)]
            md.polygon(_P(poly), fill=255)
            mask = mask.filter(ImageFilter.GaussianBlur(1.6))
            rgb, sh = fabric(mask, crown, rng, seed + 3)
            alpha = np.asarray(mask, np.float32) / 255.0
            body.alpha_composite(arr_to_img(rgb, alpha))
            bd = ImageDraw.Draw(body)
            # Klappe: Aufschlag mit Kontrastkante
            bd.polygon(_P([(CX - 112, 262), (CX - 118, 232), (CX, 246), (CX + 118, 232), (CX + 112, 262), (CX, 272)]), fill=band + (255,), outline=_light(band, 0.5) + (255,))
            bd.line(_P([(CX - 118, 232), (CX, 246), (CX + 118, 232)]), fill=pip + (255,), width=3 * S)
            bd.line(_P([(CX - 100, 168), (CX - 30, 150), (CX, 126), (CX + 30, 150), (CX + 100, 168)]), fill=pip + (255,), width=3 * S)
            badge_xy = (CX, 212)
        if tier >= 2:
            bd.line(_P([(CX - 112, 250), (CX, 262), (CX + 112, 250)]), fill=hi + (255,), width=4 * S)
    # Mützenabzeichen (Nationssymbol)
    bsz = int((36 if kind != "zweit" else 30) * S)
    if tier >= 2:
        bsz = int(bsz * 1.2)
    g = metalize(symbol_mask(nat["symbol"], bsz), emb)
    body.alpha_composite(g, (int(badge_xy[0] * S - bsz / 2), int(badge_xy[1] * S - bsz / 2 - HY0)))
    out.alpha_composite(body, (0, HY0 + DY * S))
    return finish(out, 0.5)
