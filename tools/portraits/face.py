"""Gesichts-Layer: kahler, rasierter Kopf mit Hals, ohne Haar, ohne Narben, ohne Bart. Frontal, Anker fix."""
from __future__ import annotations
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy.interpolate import PchipInterpolator
from pcommon import *

OX, OY, RW, RH = 380, 340, 776, 940      # Arbeitsfenster in SS-Pixeln
CXs, EYs, CHs, TOPs = CX * S, EYE_Y * S, CHIN_Y * S, TOP_Y * S


def _grid():
    Y, X = np.mgrid[OY:OY + RH, OX:OX + RW].astype(np.float32)
    return X, Y


def head_mask(p, X, Y):
    """Kopfmaske aus Halbbreiten-Profil. Rückgabe Maske (0..1) und Halbbreite je Zeile."""
    R = p["head_w"] * S / 2.0
    t = [0, .01, .03, .06, .10, .17, .30, .47, .62, .76, .88, .96, 1.0]
    v = [0.0, .34, .60, .78, .90, .95, .985, 1.0, .965, p["jaw"], p["chin_w"] + .30, p["chin_w"] + .12, p["chin_w"] * .55]
    f = PchipInterpolator(t, v)
    ys = np.arange(OY, OY + RH)
    tt = np.clip((ys - TOPs) / float(CHs - TOPs), -1, 2)
    hw = np.where((tt >= 0) & (tt <= 1), f(np.clip(tt, 0, 1)) * R, -1.0).astype(np.float32)
    m = (np.abs(X - CXs) <= hw[:, None]).astype(np.float32)
    m = blur(m, 1.6)
    return m, hw


def face_params(seed_vals):
    return seed_vals


def draw_strokes(shape, strokes, width, blur_s):
    im = Image.new("L", (shape[1], shape[0]), 0)
    d = ImageDraw.Draw(im)
    for pts, w in strokes:
        d.line([(x - OX, y - OY) for x, y in pts], fill=255, width=max(1, int(w * width)), joint="curve")
    return blur(np.asarray(im, dtype=np.float32) / 255.0, blur_s)


def arc(x0, y0, x1, y1, bend, n=14):
    pts = []
    for i in range(n + 1):
        u = i / n
        pts.append((x0 + (x1 - x0) * u + bend[0] * 4 * u * (1 - u), y0 + (y1 - y0) * u + bend[1] * 4 * u * (1 - u)))
    return pts


def render_face(p, age, seed=0):
    """p: Personenparameter, age: Altersstufe 0..3. Gibt 768x1024-RGBA zurück."""
    rng = np.random.RandomState(seed)
    X, Y = _grid()
    shape = X.shape
    m, hw = head_mask(p, X, Y)
    R = p["head_w"] * S / 2.0
    fem = p.get("fem", False)
    ai = [0.05, 0.35, 0.68, 1.0][age] * p.get("age_mul", 1.0)

    # ---- Hals -----------------------------------------------------------------
    nw = p["neck_w"] * S / 2.0
    ny0 = CHs - 70
    rel = np.clip((Y - ny0) / float(OY + RH - ny0), 0, 1)
    neck_hw = nw * (0.92 + 0.30 * rel ** 1.8)
    nmask = ((np.abs(X - CXs) <= neck_hw) & (Y >= ny0)).astype(np.float32)
    nmask = blur(nmask, 1.6)

    alpha = np.maximum(m, nmask)

    # ---- Höhenfeld ------------------------------------------------------------
    hwf = np.maximum(hw, 1.0)[:, None]
    dxn = (X - CXs) / hwf
    yc = (TOPs + CHs) / 2.0 + 30
    ryv = (CHs - TOPs) / 2.0 * 1.04
    zdome = 240 * np.sqrt(np.clip(1 - dxn ** 2, 0, 1)) * np.sqrt(np.clip(1 - ((Y - yc) / ryv) ** 2, 0, 1)) ** 0.8
    z = (zdome * (m > 0.02)).astype(np.float32)
    g = lambda x0, y0, sx, sy, a: a * gblob(shape, x0, y0, sx, sy, X, Y)
    nl, nwid = p["nose_len"], p["nose_w"]
    ex = p["eye_dx"] * S
    mouth_y = ANCHORS["mouth_y"] * S
    nose_tip = ANCHORS["nose_tip_y"] * S
    # Brauenwulst, Augenhöhlen, Wangenknochen
    for s in (-1, 1):
        z += g(CXs + s * 75, EYs - 52, 80, 26, 17 * p["brow"])
        z += g(CXs + s * ex, EYs + 6, 54, 34, -30)
        z += g(CXs + s * 128, EYs + 90, 54, 46, 24 * p["cheek"])
        z += g(CXs + s * 105, EYs + 150, 60, 50, -14 * ai * p["cheek"])   # Wangenhöhlen im Alter
        z += g(CXs + s * nwid * 0.55, nose_tip - 6, 22, 18, 34)           # Nasenflügel
        z += g(CXs + s * 20, nose_tip + 32, 12, 8, -16)                   # Nasenlöcher
    # Nase
    z += g(CXs, EYs - 10, 27, 90 * nl, 22)
    z += g(CXs, nose_tip - 2, 36 * nwid / 36, 28, 50)
    # Lippen, Kinn
    z += g(CXs, mouth_y - 20, 66, 13, 24 * p["lip"])
    z += g(CXs, mouth_y + 22, 60, 16, 26 * p["lip"])
    z += g(CXs, mouth_y + 2, 76, 4.5, -30)
    z += g(CXs, mouth_y + 52, 56, 12, -16)
    z += g(CXs, CHs - 38, 66, 32, 30 * p["chin"])
    z += g(CXs, mouth_y - 52, 15, 18, -10)   # Philtrum
    # Stirn leicht vorgewölbt
    z += g(CXs, TOPs + 130, 150, 80, 20)
    z = blur(z, 3.0)
    # Hals: eigene Wölbung, unter dem Kinn Schatten
    zn = 150 * np.sqrt(np.clip(1 - ((X - CXs) / (neck_hw + 1)) ** 2, 0, 1)) * nmask
    zneck = np.where(nmask > 0.5, zn - 120 - np.clip((CHs + 40 - Y), 0, 200) * 0.0, 0)
    zfull = np.where(m > 0.5, z, np.where(nmask > 0.5, zneck + 10, 0)).astype(np.float32)
    shade = lambert(zfull * 0.5)
    # Schlagschatten des Kinns auf den Hals
    jaw_shadow = blur(np.clip(1 - np.abs(Y - (CHs + 56)) / 120.0, 0, 1) * (nmask > 0.5) * (1 - (m > 0.5)), 8)
    shade = shade * (1 - 0.36 * jaw_shadow)
    shade = np.clip(shade, 0, 1.25)

    base = np.array(p["skin"], dtype=np.float32)
    warm = np.array([1.0, 0.78, 0.70], dtype=np.float32)
    dull = 1 - 0.10 * ai
    sh = shade[..., None]
    col = base * (0.30 + 0.80 * sh ** 1.05) * dull
    col = col * (warm ** ((1 - np.clip(sh, 0, 1)) * 1.1))
    # Wangenröte, Stirnglanz, Bartschatten (Rasur)
    cheek = np.zeros(shape, np.float32)
    for s in (-1, 1):
        cheek += gblob(shape, CXs + s * 120, EYs + 120, 52, 40, X, Y)
    col += cheek[..., None] * np.array([26, -6, -8]) * p.get("blush", 1.0) * (1 - 0.4 * ai) * p.get("blush_mul", 1.0)
    stub = np.clip(1 - np.abs(X - CXs) / (R * 0.9), 0, 1) * ((Y > mouth_y - 62) & (Y < CHs)) * m
    stub = blur(stub.astype(np.float32), 18) * (0.14 if not fem else 0.0)
    col *= (1 - stub[..., None] * np.array([0.5, 0.5, 0.38]))

    # ---- Falten / Alter ---------------------------------------------------------
    wr = np.zeros(shape, np.float32)
    strokes = []
    if ai > 0.05:
        k = ai
        for i, yy in enumerate((EYs - 142, EYs - 118, EYs - 94)):
            if k > 0.2 * (i + 1) * 0.7:
                for s in (-1, 1):
                    strokes.append((arc(CXs + s * 14, yy, CXs + s * 118, yy + 3, (0, -7 - i)), 1.0))
        strokes.append((arc(CXs - 14, EYs - 64, CXs - 13, EYs - 18, (-3, 0)), 1.0))
        strokes.append((arc(CXs + 14, EYs - 64, CXs + 13, EYs - 18, (3, 0)), 1.0))
        wr = draw_strokes(shape, strokes, 4, 2.2) * 0.55 * min(1, k * 1.2)
    st2 = []
    for s in (-1, 1):
        st2.append((arc(CXs + s * 52, nose_tip + 12, CXs + s * 92, mouth_y + 18, (s * 14, 8)), 1.0))
        st2.append((arc(CXs + s * ex + s * 56, EYs + 6, CXs + s * ex + s * 96, EYs + 30, (s * 6, -6)), 0.7))
        st2.append((arc(CXs + s * ex + s * 50, EYs + 2, CXs + s * ex + s * 100, EYs - 6, (s * 4, -4)), 0.7))
        st2.append((arc(CXs + s * 96, mouth_y + 22, CXs + s * 80, mouth_y + 86, (s * 5, 0)), 0.8))
        st2.append((arc(CXs + s * (ex - 40), EYs + 44, CXs + s * (ex + 42), EYs + 46, (0, 8)), 0.9))  # Tränensack
    nf = draw_strokes(shape, st2, 4.5, 2.6)
    col -= (nf * (0.10 + 0.55 * ai))[..., None] * np.array([55, 60, 62]) + (wr)[..., None] * np.array([48, 52, 54])
    if age >= 2:  # Halsfalten, Sehnen
        nstr = [(arc(CXs - nw * 0.8, CHs + 120 + 40 * i, CXs + nw * 0.8, CHs + 120 + 40 * i, (0, 10)), 1.0) for i in range(2)]
        col -= (draw_strokes(shape, nstr, 3.5, 2.5) * 0.30 * ai)[..., None] * 55 * (nmask[..., None])
    # Halsmuskeln (Kopfnicker) als leichte Schatten
    for s in (-1, 1):
        sm = draw_strokes(shape, [(arc(CXs + s * 70, CHs + 20, CXs + s * 38, CHs + 200, (s * 6, 0)), 1.0)], 10, 7)
        col -= (sm * 0.14 * (1.0 if not fem else 0.5))[..., None] * 60 * nmask[..., None]

    img = Image.fromarray(np.clip(col, 0, 255).astype(np.uint8), "RGB").convert("RGBA")

    # ---- Ohren (hinter dem Kopf) -------------------------------------------------
    ear_l = Image.new("RGBA", (RW, RH), (0, 0, 0, 0))
    ed = ImageDraw.Draw(ear_l)
    eh = p["ear"] * S
    ey_c = EYs + 32
    skin_dark = tuple(int(c * 0.78) for c in p["skin"])
    sk = tuple(int(c) for c in p["skin"])
    for s in (-1, 1):
        hwy = hw[int(ey_c - OY)]
        ecx = CXs + s * (hwy + 6) - OX
        ed.ellipse([ecx - 22, ey_c - OY - eh * 0.55, ecx + 22, ey_c - OY + eh * 0.55], fill=skin_dark + (255,))
        ed.ellipse([ecx - 15 + s * 3, ey_c - OY - eh * 0.42, ecx + 15 + s * 3, ey_c - OY + eh * 0.42], fill=tuple(int(c * 0.9) for c in p["skin"]) + (255,))
        ed.ellipse([ecx - 8 + s * 2, ey_c - OY - eh * 0.25, ecx + 8 + s * 2, ey_c - OY + eh * 0.28], fill=skin_dark + (255,))
    ear_l = ear_l.filter(ImageFilter.GaussianBlur(1.4))
    out = Image.new("RGBA", (RW, RH), (0, 0, 0, 0))
    out.alpha_composite(ear_l)
    face_rgba = img.copy()
    face_rgba.putalpha(Image.fromarray((np.clip(alpha, 0, 1) * 255).astype(np.uint8), "L"))
    out.alpha_composite(face_rgba)

    # ---- Merkmale (Augen, Brauen, Mund, Nase) ------------------------------------
    feat = Image.new("RGBA", (RW, RH), (0, 0, 0, 0))
    fd = ImageDraw.Draw(feat)
    ew = p["eye_w"] * S
    eh2 = p["eye_h"] * S
    tilt = p["tilt"] * S
    iris = tuple(p["iris"])
    for s in (-1, 1):
        ecx = CXs + s * ex - OX
        ecy = EYs - OY
        up, lo = [], []
        N = 24
        for i in range(N + 1):
            u = -1 + 2 * i / N      # u=-1 Innenwinkel? s legt die Richtung fest
            xx = ecx + s * u * ew / 2 * -1
            inner = (u + 1) / 2    # 0 innen .. 1 außen
            ty = -tilt * inner
            up.append((xx, ecy - eh2 * (1 - u * u) ** 0.85 + ty + 3 * (1 - inner)))
            lo.append((xx, ecy + 0.62 * eh2 * (1 - u * u) ** 0.95 + ty))
        poly = up + lo[::-1]
        # Auge in eigener Ebene, dann mit Mandelform maskieren
        e_img = Image.new("RGBA", (RW, RH), (0, 0, 0, 0))
        ed2 = ImageDraw.Draw(e_img)
        ed2.polygon(poly, fill=(236, 226, 214, 255))
        # Lidschatten im Weiß
        sh_im = Image.new("L", (RW, RH), 0)
        ImageDraw.Draw(sh_im).polygon(up + [(x, y - eh2 * 0.8) for x, y in up[::-1]], fill=140)
        sh_im = sh_im.filter(ImageFilter.GaussianBlur(5))
        e_arr = np.asarray(e_img).astype(np.float32)
        e_arr[..., :3] *= (1 - np.asarray(sh_im, np.float32)[..., None] / 255 * 0.55)
        e_img = Image.fromarray(e_arr.astype(np.uint8), "RGBA")
        ed2 = ImageDraw.Draw(e_img)
        # Iris Richtung Blick geradeaus
        ir = eh2 * 0.92
        icx, icy = ecx - s * 0.0, ecy + 1
        ed2.ellipse([icx - ir, icy - ir, icx + ir, icy + ir], fill=iris + (255,))
        ed2.ellipse([icx - ir * 0.62, icy - ir * 0.62, icx + ir * 0.62, icy + ir * 0.62], fill=tuple(int(c * 0.62) for c in iris) + (255,))
        ed2.ellipse([icx - ir * 0.88, icy - ir * 0.88, icx + ir * 0.88, icy + ir * 0.88], outline=tuple(int(c * 0.45) for c in iris) + (255,), width=3)
        ed2.ellipse([icx - ir * 0.36, icy - ir * 0.36, icx + ir * 0.36, icy + ir * 0.36], fill=(14, 12, 12, 255))
        ed2.ellipse([icx - ir * 0.52, icy - ir * 0.7, icx - ir * 0.16, icy - ir * 0.34], fill=(255, 255, 255, 235))
        mask_e = Image.new("L", (RW, RH), 0)
        ImageDraw.Draw(mask_e).polygon(poly, fill=255)
        a = np.minimum(np.asarray(e_img)[..., 3], np.asarray(mask_e))
        e_img.putalpha(Image.fromarray(a))
        e_img = e_img.filter(ImageFilter.GaussianBlur(0.9))
        feat.alpha_composite(e_img)
        fd = ImageDraw.Draw(feat)
        lid = tuple(int(c * 0.38) for c in p["skin"]) + (255,)
        fd.line(up, fill=(26, 18, 16, 255), width=int(5 + (2 if fem else 0)), joint="curve")
        fd.line([(x, y - 11) for x, y in up[3:-2]], fill=lid[:3] + (120,), width=4, joint="curve")     # Lidfalte
        fd.line(lo[2:-2], fill=tuple(int(c * 0.62) for c in p["skin"]) + (150,), width=3, joint="curve")
        if fem:
            fd.line(up, fill=(14, 10, 10, 255), width=8, joint="curve")
        # Brauen
        by = EYs - OY - p["brow_h"] * S
        x_in = CXs + s * (p["brow_in"] * S) - OX
        x_out = CXs + s * (ex + 66) - OX
        thick = p["brow_t"] * S
        bc = tuple(int(c) for c in p["brow_col"])
        pts_top, pts_bot, mid = [], [], []
        for i in range(25):
            u = i / 24
            xx = x_in + (x_out - x_in) * u
            yy = by - 17 * np.sin(np.pi * min(u, 1) * 0.82) ** 1.1 + 9 * u + 4 * (1 - u)
            th = thick * (1 - 0.62 * u ** 1.6) * (1 + 0.5 * ai * (1 - u))
            pts_top.append((xx, yy - th * 0.55))
            pts_bot.append((xx, yy + th * 0.45))
            mid.append((xx, yy, th))
        br_im = Image.new("RGBA", (RW, RH), (0, 0, 0, 0))
        bdd = ImageDraw.Draw(br_im)
        bdd.polygon(pts_top + pts_bot[::-1], fill=tuple(int(c * 0.8) for c in bc) + (225,))
        for _ in range(110):
            k = rng.randint(0, 24)
            xx, yy, th = mid[k]
            x2 = xx + rng.uniform(5, 13)
            y2 = yy + rng.uniform(-th * 0.45, th * 0.45) - 2 - 0.35 * (k / 24) * 4
            v = rng.uniform(0.7, 1.3)
            bdd.line([(xx, yy + rng.uniform(-th * 0.4, th * 0.4)), (x2, y2)], fill=tuple(int(min(255, c * v)) for c in bc) + (230,), width=2)
        br_im = br_im.filter(ImageFilter.GaussianBlur(0.9))
        feat.alpha_composite(br_im)
        fd = ImageDraw.Draw(feat)
        # Nasenlöcher / Flügel
        nx = CXs + s * 20 - OX
        fd.ellipse([nx - 10, nose_tip + 26 - OY, nx + 10, nose_tip + 40 - OY], fill=(48, 22, 20, 190))
        fd.line(arc(CXs + s * (nwid * 0.9) - OX, nose_tip - 12 - OY, CXs + s * (nwid * 0.55) - OX, nose_tip + 30 - OY, (s * 8, 2)), fill=(70, 34, 30, 120), width=4)

    # Mund
    lipc = mix(p["skin"], p["lip_col"], 0.55 if not fem else 0.8)
    lipd = tuple(int(c * 0.78) for c in lipc)
    mw = p["mouth_w"] * S / 2.0
    my = mouth_y - OY
    mx = CXs - OX
    droop = p["mouth_droop"] * S
    thu, thl = 15 * p["lip"], 24 * p["lip"]
    line, top, bot = [], [], []
    for i in range(61):
        u = -1 + 2 * i / 60
        ly = my + droop * u * u
        line.append((mx + u * mw, ly))
        cupid = 4.5 * np.exp(-(u / 0.16) ** 2) - 3.0 * np.exp(-((abs(u) - 0.30) / 0.16) ** 2) * 0
        top.append((mx + u * mw, ly - thu * (1 - u * u) ** 0.75 + cupid))
        bot.append((mx + u * mw * 0.92, ly + thl * (1 - u * u) ** 0.85 * (1 - 0.1 * abs(u))))
    md = Image.new("RGBA", (RW, RH), (0, 0, 0, 0))
    mdd = ImageDraw.Draw(md)
    mdd.polygon(line + bot[::-1], fill=tuple(int(c) for c in lipc) + (255,))
    mdd.polygon(top + line[::-1], fill=lipd + (255,))
    mdd.line(line, fill=(52, 22, 22, 255), width=5, joint="curve")
    mdd.ellipse([mx - 24, my + thl * 0.55, mx + 24, my + thl * 0.55 + 7], fill=(255, 238, 228, 80))
    md = md.filter(ImageFilter.GaussianBlur(1.3))
    feat.alpha_composite(md)

    # Feinschliff: Leinwandkorn, Malerei
    feat_arr = np.asarray(feat).astype(np.float32)
    out.alpha_composite(feat)
    arr = np.asarray(out).astype(np.float32)
    n = grain((RH, RW), seed + 11)
    arr[..., :3] += n[..., None] * 2.6
    # weicher „Pinsel“: leichter Unscharf-Mix
    img2 = Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8), "RGBA")
    soft = img2.filter(ImageFilter.GaussianBlur(1.6))
    img2 = Image.blend(img2, soft, 0.35)
    full = new_layer()
    full.alpha_composite(img2, (OX, OY))
    return finish(full, 0.5)
