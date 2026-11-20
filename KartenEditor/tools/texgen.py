#!/usr/bin/env python3
"""t313: Prozeduraler Textur-Generator für Kartengründe, Textfelder und Titelplatten.

Jede Karte bekommt ein frisch erzeugtes, einzigartiges Muster (kein Pool, kein fester Ausschnitt):
  * Struktur  – rein prozedural (fBm-Value-Noise, Domain-Warping, Voronoi/Worley, Ridged Noise,
                Line-Integral-Convolution als Pinselstrich-Feld, Relief-Lichtung).
  * Farbe     – Gradient-Map aus dem jeweiligen Original-Asset (Luminanz-Quantile → mittlere Farbe),
                d. h. Tonwertverteilung und Farbklima bleiben gleichwertig zu den gemalten Assets.
  * Ölstrich  – feine Pinsel-/Leinwandkörnung = Hochpass des Assets, zufälliger Ausschnitt,
                Skalierung, Spiegelung/Drehung und Verwirbelung (nie zweimal gleich).

Seed-Verhalten (t315: EIN festes Muster je Karte, nicht bei jedem Render neu):
  Reihenfolge in begin(): expliziter seed-Parameter > card["tex_seed"] > Seed-Register
  scripts/graphics/tex-seeds.json (id → seed) > crc32(Karten-ID). Kein Zufall als Standard.
  Das Register hält den Seed auch über Umbenennungen (Schlüssel = ID, nicht Name); der Build legt für
  neue Karten crc32(id) an und löst Kollisionen auf (alle Seeds eindeutig).
  Neu würfeln nur explizit: Editor-Knopf "Muster neu würfeln" (schreibt Register) oder
  scripts/graphics/render.py --reroll id,id.
  Innerhalb eines Renders liefert dieselbe (Material, Größe, salt)-Anfrage dasselbe Bild,
  damit Bänder/Ausschnitte desselben Grunds nahtlos bleiben.
Abschalten (Asset-Version Runde 4): DC_TEXGEN=0.
"""
from __future__ import annotations

import os
import secrets
import zlib
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage as ndi
from scipy.spatial import cKDTree

ON = os.environ.get("DC_TEXGEN", "1") == "1"
A = Path(__file__).resolve().parent.parent / "assets"

_state = {"seed": None, "cache": {}}


# ------------------------------------------------------------------ Seed
def _crc(s):
    return zlib.crc32(str(s).encode("utf-8")) & 0x7FFFFFFF


SEED_FILE = Path(__file__).resolve().parents[2] / "scripts" / "graphics" / "tex-seeds.json"
_registry = {"mtime": None, "data": {}}


def registry():
    """Seed-Register (id → seed); bei Änderung der Datei neu geladen."""
    try:
        mt = SEED_FILE.stat().st_mtime
    except OSError:
        return {}
    if _registry["mtime"] != mt:
        import json
        try:
            _registry["data"] = {k: int(v) for k, v in json.loads(SEED_FILE.read_text(encoding="utf-8")).get("seeds", {}).items()}
        except Exception:
            _registry["data"] = {}
        _registry["mtime"] = mt
    return _registry["data"]


def default_seed(ident):
    """Deterministischer Standard-Seed einer Karte: crc32(id) (31 Bit, nie 0)."""
    return _crc(ident) or 1


def seed_for(card):
    """Fester Seed einer Karte: card.tex_seed > Register > crc32(id/name)."""
    card = card or {}
    if card.get("tex_seed"):
        return int(card["tex_seed"]) & 0x7FFFFFFF
    ident = card.get("id") or ""
    if ident and ident in registry():
        return registry()[ident]
    return default_seed(ident or card.get("name") or "karte")


def new_seed():
    """Nur für explizites Neu-Würfeln (Editor-Knopf, --reroll)."""
    return secrets.randbits(31) or 1


def begin(card=None, seed=None):
    """Startet einen Karten-Render mit dem festen Seed der Karte. Rückgabe: verwendeter Seed."""
    s = int(seed) if seed not in (None, "", 0) else seed_for(card)
    _state["seed"] = s & 0x7FFFFFFF
    _state["cache"] = {}
    return _state["seed"]


def current_seed():
    if _state["seed"] is None:
        begin()
    return _state["seed"]


def _rng(*parts):
    return np.random.default_rng([current_seed()] + [_crc(p) for p in parts])


# ------------------------------------------------------------------ Referenzen
_refs = {}


def _ref(name):
    """Palette (256 Farben nach Luminanz-Quantil) + Hochpass-Körnung eines Assets, je Prozess einmal."""
    if name in _refs:
        return _refs[name]
    p = None
    for sub in ("textures", "klein", "velvet"):
        q = A / sub / name
        if q.is_file():
            p = q
            break
    if p is None:
        raise FileNotFoundError(name)
    im = Image.open(p).convert("RGB")
    sm = im.copy()
    sm.thumbnail((512, 512))
    a = np.asarray(sm, dtype=np.float32).reshape(-1, 3)
    lum = a @ np.array([0.299, 0.587, 0.114], np.float32)
    order = np.argsort(lum)
    bins = np.array_split(order, 256)
    lut = np.stack([a[b].mean(0) for b in bins]).astype(np.float32)
    lut = ndi.uniform_filter1d(lut, 5, axis=0)
    g = np.asarray(im.convert("L"), dtype=np.float32)
    hp = g - ndi.gaussian_filter(g, 3.0)
    hp /= (hp.std() + 1e-6)
    _refs[name] = (lut, hp)
    return _refs[name]


# ------------------------------------------------------------------ Noise-Bausteine
def _resize_f(a, w, h):
    return np.asarray(Image.fromarray(a.astype(np.float32), "F").resize((w, h), Image.Resampling.BICUBIC))


def value(rng, h, w, cell):
    """Glattes Value-Noise mit Zellgröße cell (px)."""
    gw, gh = max(2, int(w / cell) + 3), max(2, int(h / cell) + 3)
    g = rng.random((gh, gw)).astype(np.float32)
    big = _resize_f(g, int(gw * cell), int(gh * cell))
    oy = int(rng.integers(0, max(1, big.shape[0] - h)))
    ox = int(rng.integers(0, max(1, big.shape[1] - w)))
    return big[oy:oy + h, ox:ox + w]


def fbm(rng, h, w, cell, octaves=5, gain=0.5, lac=2.0):
    out = np.zeros((h, w), np.float32)
    amp, tot = 1.0, 0.0
    for _ in range(octaves):
        if cell < 1.5:
            break
        out += amp * value(rng, h, w, cell)
        tot += amp
        amp *= gain
        cell /= lac
    return out / tot


def norm(a, lo=1.0, hi=99.0):
    l, u = np.percentile(a[::4, ::4], [lo, hi])
    return np.clip((a - l) / (u - l + 1e-6), 0, 1)


def warp(f, dx, dy):
    h, w = f.shape
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    return ndi.map_coordinates(f, [yy + dy, xx + dx], order=1, mode="reflect")


def ridged(n, sharp=8.0):
    return (1.0 - np.abs(2.0 * n - 1.0)) ** sharp


def worley(rng, h, w, cell, dx=None, dy=None):
    """F1, F2 (Worley/Voronoi) mit optionaler Verwirbelung der Abfragekoordinaten."""
    n = max(4, int(h * w / (cell * cell)))
    pts = np.column_stack([rng.random(n) * (h + 2 * cell) - cell, rng.random(n) * (w + 2 * cell) - cell])
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    if dx is not None:
        xx = xx + dx
        yy = yy + dy
    d, _ = cKDTree(pts).query(np.column_stack([yy.ravel(), xx.ravel()]), k=2, workers=-1)
    return d[:, 0].reshape(h, w) / cell, d[:, 1].reshape(h, w) / cell


def lic(noise, angle, length=10, step=1.0):
    """Line-Integral-Convolution: verschmiert Noise entlang eines Richtungsfeldes → Pinselstriche."""
    h, w = noise.shape
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    c, s = np.cos(angle), np.sin(angle)
    acc = noise.copy()
    wsum = 1.0
    for i in range(1, length + 1):
        wt = 1.0 - i / (length + 1)
        for sg in (1, -1):
            acc += wt * ndi.map_coordinates(noise, [yy + sg * i * step * s, xx + sg * i * step * c], order=1, mode="reflect")
            wsum += wt
    return acc / wsum


def relief(hgt, k=6.0, light=(-0.6, -0.8)):
    gy, gx = np.gradient(hgt)
    return np.clip(0.5 + k * (gx * light[0] + gy * light[1]), 0, 1)


def grade(t, lut, lo=0.0, hi=1.0):
    """Quantil-Normierung von t und Gradient-Map über die Asset-Palette."""
    t = np.nan_to_num(t, nan=0.5)
    sub = t[::3, ::3].ravel()
    q = np.quantile(sub, np.linspace(0, 1, 129))
    q = np.maximum.accumulate(q + np.arange(129) * 1e-7)
    u = np.interp(t, q, np.linspace(0, 1, 129)).astype(np.float32)
    u = lo + (hi - lo) * u
    lut4 = np.stack([np.interp(np.linspace(0, 255, 1024), np.arange(256), lut[:, c]) for c in range(3)], -1).astype(np.float32)
    return lut4[np.clip((u * 1023.0).astype(np.int32), 0, 1023)]


def grain(rng, name, w, h, rotate=True, scale=(0.85, 1.25)):
    """Ölstrich-Körnung: zufälliger, skalierter, gespiegelter/gedrehter und verwirbelter Hochpass-Ausschnitt."""
    _, hp = _ref(name)
    k = int(rng.integers(0, 4)) if rotate else 2 * int(rng.integers(0, 2))
    src = np.rot90(hp, k)
    if rng.random() < 0.5:
        src = src[:, ::-1]
    sc = float(rng.uniform(*scale))
    need_w, need_h = int(w / sc) + 2, int(h / sc) + 2
    if need_w > src.shape[1] or need_h > src.shape[0]:
        sc = max(w / (src.shape[1] - 2), h / (src.shape[0] - 2), sc)
        need_w, need_h = min(src.shape[1], int(w / sc) + 2), min(src.shape[0], int(h / sc) + 2)
    oy = int(rng.integers(0, max(1, src.shape[0] - need_h)))
    ox = int(rng.integers(0, max(1, src.shape[1] - need_w)))
    crop = np.ascontiguousarray(src[oy:oy + need_h, ox:ox + need_w])
    # stufenloser Ausschnitt + Skalierung + Spiegelung/Drehung → praktisch nie deckungsgleich;
    # (volle Verwirbelung per map_coordinates kostete ~0,3 s je Kartengrund und brachte optisch nichts)
    return _resize_f(crop, w, h)


def _final(rgb, rng, name, w, h, g_amt, rotate=True, scale=(0.85, 1.25)):
    out = rgb + grain(rng, name, w, h, rotate, scale)[..., None] * g_amt
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8), "RGB")


def _lo(w, h, f):
    return max(8, int(w * f)), max(8, int(h * f))


def _up(a, w, h):
    return _resize_f(a, w, h)


# ------------------------------------------------------------------ Materialien
def granite(rng, lh, lw, cell, warpamp=3.0, gamma=2.2):
    """Körniger Stein: Worley-Zellen mit zufälligem Grauwert je Korn (scharfe, organische Körner)."""
    dxw = (fbm(rng, lh, lw, 24, 3) - .5) * warpamp
    dyw = (fbm(rng, lh, lw, 24, 3) - .5) * warpamp
    n = max(4, int(lh * lw / (cell * cell)))
    pts = np.column_stack([rng.random(n) * lh, rng.random(n) * lw])
    yy, xx = np.mgrid[0:lh, 0:lw].astype(np.float32)
    _, idx = cKDTree(pts).query(np.column_stack([(yy + dyw).ravel(), (xx + dxw).ravel()]), k=1, workers=-1)
    val = rng.random(n).astype(np.float32) ** gamma
    return val[idx].reshape(lh, lw)


def vein_lines(rng, lh, lw, n, dirs, width, fray, S):
    """Lange, leicht gewundene Quarzadern (Abstandsfeld zu gewarpten Geraden) + Knoten an Kreuzungen."""
    yy, xx = np.mgrid[0:lh, 0:lw].astype(np.float32)
    wx = (fbm(rng, lh, lw, S * .35, 4) - .5) * S * .12
    wy = (fbm(rng, lh, lw, S * .35, 4) - .5) * S * .12
    fr = (fbm(rng, lh, lw, 10, 3) - .5)
    acc = np.zeros((lh, lw), np.float32)
    knots = np.zeros((lh, lw), np.float32)
    prev = []
    for i in range(n):
        a = dirs[i % len(dirs)] + rng.normal(0, 0.12)
        nx, ny = -np.sin(a), np.cos(a)
        c = rng.uniform(-0.1, 1.1) * (abs(nx) * lw + abs(ny) * lh) + min(0, nx * lw) + min(0, ny * lh)
        d = np.abs((xx + wx) * nx + (yy + wy) * ny - c + fr * fray)
        wd = width * rng.uniform(0.4, 1.4) * (0.4 + norm(fbm(rng, lh, lw, S * .2, 3)))
        v = np.exp(-(d / wd) ** 2) * (0.35 + 0.65 * norm(fbm(rng, lh, lw, S * .25, 3)) ** 0.8)
        for p in prev:
            knots += v * p
        prev.append(v)
        acc = np.maximum(acc, v)
    return acc, knots


def marble(w, h, rng, ref="marmor-oel.jpg", g_amt=8.0):
    """Öl-Marmor schwarz: dunkle Pinsel-Grundfläche (LIC) + warp-ridged Adern + kristalline Quarzfelder
    (scharf begrenzte warp-fBm-Inseln mit Worley-Kristallkanten)."""
    lw, lh = _lo(w, h, 0.5)
    S = max(lw, lh)
    q1 = fbm(rng, lh, lw, S * 0.45, 4)
    q2 = fbm(rng, lh, lw, S * 0.45, 4)
    base = warp(fbm(rng, lh, lw, S * 0.35, 6), (q1 - .5) * S * .25, (q2 - .5) * S * .25)
    ang = rng.uniform(0, np.pi) + (q1 - .5) * 2.5
    strokes = norm(lic(ndi.gaussian_filter(rng.random((lh, lw)).astype(np.float32), 1.2), ang, 8, 1.5))
    veins = np.zeros((lh, lw), np.float32)
    for k, sh in ((1.0, 16), (0.65, 26), (0.45, 34)):
        n = fbm(rng, lh, lw, S * rng.uniform(0.35, 0.7), 6, 0.55)
        n = warp(n, (q1 - .5) * S * .35, (q2 - .5) * S * .35)
        r = ridged((n * rng.uniform(1.2, 2.6)) % 1.0, sh)
        mask = norm(fbm(rng, lh, lw, S * 0.3, 3)) ** 1.4
        veins = np.maximum(veins, k * r * mask)
    qz = warp(fbm(rng, lh, lw, S * 0.16, 6, 0.62), (q2 - .5) * S * .25, (q1 - .5) * S * .25)
    thr = rng.uniform(0.62, 0.72)
    qn = norm(qz) + 0.10 * (fbm(rng, lh, lw, 10, 3) - .5)
    island = np.clip((qn - thr) * 9, 0, 1)
    fib = ridged(warp(fbm(rng, lh, lw, 14, 3), (q1 - .5) * 20, (q2 - .5) * 20), 5)
    halo = np.clip((qn - thr + 0.10) * 5, 0, 1)
    quartz = island * (0.35 + 0.45 * fib + 0.3 * norm(fbm(rng, lh, lw, 30, 3))) + 0.45 * fib * halo * (1 - island)
    quartz = quartz + 0.35 * island * (fbm(rng, lh, lw, 3, 2) > 0.62)

    t = 0.18 * norm(base) + 0.16 * strokes + 0.9 * veins + 0.95 * quartz
    t = ndi.gaussian_filter(t, 0.45)
    T = _up(t, w, h)
    hl = hairlines(rng, lh, lw, w, h, S, q1, q2, 6, 1.3, np.clip(halo * 1.6 + 0.08, 0, 1))
    T = T + 0.5 * hl
    lut, _ = _ref(ref)
    rgb = grade(T, lut)
    rgb = rgb + (hl * 0.8)[..., None] * (lut[-8][None, None, :] - rgb)  # Fäden hell wie Quarz im Asset
    return _final(rgb, rng, ref, w, h, g_amt)


def hairlines(rng, lh, lw, w, h, S, q1, q2, n=3, px=0.9, bias=None):
    """Feine, scharfe Quarzfäden in voller Auflösung: Isolinien gewarpter fBm-Felder
    (Abstand |n-0.5|/|grad n| in Pixeln → konstante, gestochen scharfe Linienbreite)."""
    acc = np.zeros((h, w), np.float32)
    for _ in range(n):
        f = warp(fbm(rng, lh, lw, S * rng.uniform(.08, .16), 5, .55), (q1 - .5) * S * .12, (q2 - .5) * S * .12)
        F = _up(f, w, h)
        gy, gx = np.gradient(F)
        dist = np.abs(F - np.median(f)) / (np.sqrt(gx * gx + gy * gy) + 1e-5)
        m = norm(fbm(rng, lh, lw, S * .12, 3)) ** 2.0
        if bias is not None:
            m = np.clip((0.35 + 0.65 * m) * bias, 0, 1)
        acc = np.maximum(acc, np.exp(-(dist / (px * rng.uniform(.7, 1.4))) ** 2) * np.clip(_up(m, w, h), 0, 1))
    return acc


def crackle_marble(w, h, rng, ref="bg-einsatz-a.jpg"):
    """Sofort-Grund: schwarzer Granit-Marmor mit sich kreuzenden Quarzadern + hellen Knoten (bg-einsatz)."""
    lw, lh = _lo(w, h, 0.4)
    S = max(lw, lh)
    gr = granite(rng, lh, lw, rng.uniform(2.2, 3.2), 2.0, 3.0)
    a0 = rng.uniform(0, np.pi)
    veins, knots = vein_lines(rng, lh, lw, int(rng.integers(7, 11)), (a0, a0 + np.pi / 2 + rng.normal(0, .15)), S * 0.006, S * 0.03, S)
    n = warp(fbm(rng, lh, lw, S * .3, 6, .55), (gr - .5) * 3, (gr - .5) * 3)
    fine = ridged((n * 3) % 1.0, 40) * norm(fbm(rng, lh, lw, S * .2, 3)) ** 2
    kn = ndi.gaussian_filter(knots, S * 0.008)
    kn = kn / (kn.max() + 1e-6)
    t = 0.22 * gr + 0.15 * norm(fbm(rng, lh, lw, S * .3, 4)) + 1.0 * veins + 0.35 * fine + 1.2 * kn * (0.5 + gr)
    t = ndi.gaussian_filter(t, 0.5)
    lut, _ = _ref(ref)
    rgb = grade(_up(t, w, h), lut)
    return _final(rgb, rng, ref, w, h, 7.0)


def leather(w, h, rng, ref="leather.jpg", pebble=1.0, g_amt=6.0):
    """Genarbtes Leder: Faltennetz (gewarpte Worley-Kanten, mittlere Zellen) + feine Narbung
    (kleine Worley-Kuppen) + fBm-Wölbung, alles über Relief-Licht geschattet."""
    lw, lh = _lo(w, h, 0.5)
    S = max(lw, lh)
    dxw = (fbm(rng, lh, lw, 30, 3) - .5) * 10
    dyw = (fbm(rng, lh, lw, 30, 3) - .5) * 10
    f1, f2 = worley(rng, lh, lw, rng.uniform(3.5, 5.0), dxw * .4, dyw * .4)
    cells = np.clip((f2 - f1) / 0.6, 0, 1) ** 0.7
    g1, g2 = worley(rng, lh, lw, rng.uniform(8, 11), dxw * .6, dyw * .6)
    grooves = np.exp(-((g2 - g1) / 0.10) ** 2) * (0.4 + 0.6 * norm(fbm(rng, lh, lw, S * .2, 3)))
    bulge = fbm(rng, lh, lw, S * .3, 4)
    hgt = 0.35 * pebble * cells - 0.8 * grooves + 0.25 * np.clip((g2 - g1) * 2, 0, 1) + 0.5 * bulge
    hgt = ndi.gaussian_filter(hgt, 0.7)
    sh = relief(hgt, 3.5)
    t = 0.55 * sh + 0.5 * norm(bulge) - 0.2 * grooves
    lut, _ = _ref(ref)
    rgb = grade(_up(t, w, h), lut)
    return _final(rgb, rng, ref, w, h, g_amt)


def oil_leather(w, h, rng, ref="rotleder-oel.jpg"):
    """Glattes Rotleder in Öl: diagonale Pinselzüge (LIC) + weiche Wölbung."""
    lw, lh = _lo(w, h, 0.5)
    S = max(lw, lh)
    ang = rng.uniform(-0.9, -0.4) + (fbm(rng, lh, lw, S * .4, 3) - .5) * 1.2
    nz = ndi.gaussian_filter(rng.random((lh, lw)).astype(np.float32), 1.0)
    strokes = norm(lic(nz, ang, 14, 1.6))
    low = fbm(rng, lh, lw, S * .35, 5)
    low = warp(low, (strokes - .5) * 8, 0)
    t = 0.85 * norm(low) + 0.08 * strokes + 0.15 * relief(ndi.gaussian_filter(low, 2) * 30, 3)
    lut, _ = _ref(ref)
    rgb = grade(_up(t, w, h), lut)
    return _final(rgb, rng, ref, w, h, 7.0)


def patina(w, h, rng, ref="metal-gehaemmert.jpg"):
    """Gehämmertes Bronze-/Eisenblech mit Patina: warp-fBm-Wolken + Hammerdellen (Worley-Relief)."""
    lw, lh = _lo(w, h, 0.4)
    S = max(lw, lh)
    q1 = fbm(rng, lh, lw, S * .4, 4); q2 = fbm(rng, lh, lw, S * .4, 4)
    cl = fbm(rng, lh, lw, S * .3, 6)
    cl = warp(cl, (q1 - .5) * S * .3, (q2 - .5) * S * .3)
    f1, _ = worley(rng, lh, lw, rng.uniform(14, 22))
    dent = relief(-(f1 ** 2), 1.6)
    scr = ridged(fbm(rng, lh, lw, 8, 2), 20)
    t = 0.85 * norm(cl) + 0.22 * dent + 0.12 * scr
    lut, _ = _ref(ref)
    rgb = grade(_up(t, w, h), lut)
    return _final(rgb, rng, ref, w, h, 8.0)


def brushed_steel(w, h, rng, ref="stahl-gebuerstet.jpg", clouds=0.35, sky=0.0, g_amt=6.0, lowf=0.5, streak=1.0):
    """Gebürsteter Stahl: anisotrop gefiltertes Rauschen (Bürstzug), leicht gewellt + Lichtwolken."""
    lw, lh = _lo(w, h, lowf)
    S = max(lw, lh)
    nz = rng.random((lh, lw)).astype(np.float32)
    br = ndi.gaussian_filter(nz, (0.6, rng.uniform(18, 40)))
    br2 = ndi.gaussian_filter(rng.random((lh, lw)).astype(np.float32), (2.5, 80))
    wav = (fbm(rng, lh, lw, S * .3, 3) - .5) * 10
    br = warp(br, 0, wav)
    t = streak * (0.55 * norm(br) + 0.35 * norm(br2)) + clouds * norm(fbm(rng, lh, lw, S * .35, 4))
    if sky:
        yy = np.linspace(0, 1, lh, dtype=np.float32)[:, None]
        t = t + sky * (1 - yy) * rng.uniform(0.7, 1.2) + sky * 0.6 * norm(warp(fbm(rng, lh, lw, S * .3, 5), wav * 6, wav * 3)) * (1 - yy)
    lut, _ = _ref(ref)
    rgb = grade(_up(t, w, h), lut)
    return _final(rgb, rng, ref, w, h, g_amt, rotate=False, scale=(0.9, 1.15))


def oil_blue(w, h, rng, ref="oil-blue.jpg"):
    """Bauplan-Blau in Öl: breite, flache Farbtupfer (grobes Rauschen, kurz per LIC verzogen) mit
    Impasto-Relief über einer fBm-Tiefe."""
    lw, lh = _lo(w, h, 0.5)
    S = max(lw, lh)
    ang = rng.uniform(0.5, 1.1) + (fbm(rng, lh, lw, S * .35, 3) - .5) * 1.4
    dab = _resize_f(rng.random((lh // 7 + 2, lw // 7 + 2)).astype(np.float32), lw, lh)
    dab = warp(dab, (fbm(rng, lh, lw, 20, 2) - .5) * 10, (fbm(rng, lh, lw, 20, 2) - .5) * 10)
    dab = np.floor(norm(dab) * 5.0) / 5.0 + 0.08 * rng.random((lh, lw)).astype(np.float32)
    strokes = norm(lic(dab, ang, 5, 1.8))
    imp = relief(strokes, 3.0)
    low = norm(fbm(rng, lh, lw, S * .3, 5))
    t = 0.45 * strokes + 0.2 * imp + 0.55 * low
    lut, _ = _ref(ref)
    rgb = grade(_up(t, w, h), lut)
    return _final(rgb, rng, ref, w, h, 12.0, scale=(1.1, 1.5))


def parchment(w, h, rng, ref="bg-doktrin-a.jpg"):
    """Kartenpergament: Wolken, leichte Flecken, Faltraster mit Knickschatten, Höhenlinien (Isolinien
    eines gewarpten fBm), Flussläufe (Isolinie eines gewarpten fBm) – Linien in voller Auflösung gezogen."""
    lw, lh = _lo(w, h, 0.5)
    S = max(lw, lh)
    q1 = fbm(rng, lh, lw, S * .4, 4); q2 = fbm(rng, lh, lw, S * .4, 4)
    cl = norm(warp(fbm(rng, lh, lw, S * .25, 6), (q1 - .5) * S * .2, (q2 - .5) * S * .2))
    stain = norm(fbm(rng, lh, lw, S * .12, 4))
    t = 0.78 + 0.14 * cl - 0.10 * np.clip(stain - 0.72, 0, 1) * 3.5
    yy, xx = np.mgrid[0:lh, 0:lw].astype(np.float32)
    nx, ny = int(rng.integers(3, 5)), int(rng.integers(4, 6))
    fold = np.zeros_like(t)
    for i in range(1, nx):
        x = lw * i / nx + rng.normal(0, lw * .012)
        fold += np.exp(-((xx - x) / 1.3) ** 2) - 0.45 * np.exp(-((xx - x - 3) / 2.5) ** 2) + 0.25 * np.exp(-((xx - x) / 14) ** 2)
    for j in range(1, ny):
        y = lh * j / ny + rng.normal(0, lh * .01)
        fold += np.exp(-((yy - y) / 1.3) ** 2) - 0.45 * np.exp(-((yy - y - 3) / 2.5) ** 2) + 0.25 * np.exp(-((yy - y) / 14) ** 2)
    t = t - 0.10 * fold
    t = t + 0.03 * norm(fbm(rng, lh, lw, 4, 2))
    # Linien in voller Auflösung (scharf): Felder glatt hochskalieren, dann Isolinien/Ridges bilden
    T = _up(t, w, h)
    topo = _up(warp(fbm(rng, lh, lw, S * .3, 5, .5), (q1 - .5) * S * .15, (q2 - .5) * S * .15), w, h)
    k = rng.uniform(28, 40)
    f = topo * k
    gy, gx = np.gradient(f)
    gm = np.sqrt(gx * gx + gy * gy) + 1e-4
    iso = np.abs((f % 1.0) - 0.5) / gm          # Abstand in Pixeln zur nächsten Isolinie
    major = np.abs(((f / 5.0) % 1.0) - 0.5) * 5.0 / gm
    lines = np.exp(-(iso / 0.9) ** 2) * 0.55 + np.exp(-(major / 1.3) ** 2) * 0.45
    lines *= np.clip(_up(norm(fbm(rng, lh, lw, S * .3, 3)), w, h) * 1.8 - 0.3, 0, 1)
    T = T - 0.13 * lines
    for _ in range(int(rng.integers(2, 4))):
        n = _up(warp(fbm(rng, lh, lw, S * .5, 6, 0.55), (q1 - .5) * S * .3, (q2 - .5) * S * .3), w, h)
        gy, gx = np.gradient(n)
        dist = np.abs(n - 0.5) / (np.sqrt(gx * gx + gy * gy) + 1e-5)
        T = T - 0.32 * np.exp(-(dist / 1.1) ** 2) * np.clip(_up(norm(fbm(rng, lh, lw, S * .3, 3)), w, h), 0, 1) ** 0.6
    lut, _ = _ref(ref)
    rgb = grade(T, lut)
    return _final(rgb, rng, ref, w, h, 6.0)


def velvet(w, h, rng, ref="infanterie.jpg"):
    """Öl-Samt: Faltenwurf (gewarpte Sinusfalten + fBm), Relief-Licht, breite Pinselzüge entlang der Falten (LIC)."""
    lw, lh = _lo(w, h, 0.5)
    S = max(lw, lh)
    yy, xx = np.mgrid[0:lh, 0:lw].astype(np.float32)
    a = rng.uniform(0, np.pi)
    lam = S * rng.uniform(0.26, 0.40)
    wp = fbm(rng, lh, lw, S * .45, 3)
    ph = ((xx * np.cos(a) + yy * np.sin(a)) / lam + (wp - .5) * 2.2) * 2 * np.pi
    a2 = a + rng.uniform(0.9, 2.2)
    ph2 = ((xx * np.cos(a2) + yy * np.sin(a2)) / (lam * rng.uniform(0.7, 1.0)) + (wp - .5) * 3.0) * 2 * np.pi
    hgt = 0.6 * np.sin(ph) + 0.25 * np.sin(ph2) + 0.6 * (fbm(rng, lh, lw, S * .35, 3) - .5) * 2
    hgt = ndi.gaussian_filter(hgt, 1.5)
    gy, gx = np.gradient(hgt)
    ang = np.arctan2(gy, gx) + np.pi / 2
    nz = ndi.gaussian_filter(rng.random((lh, lw)).astype(np.float32), 1.0)
    strokes = norm(lic(nz, ang, 9, 1.5))
    sh = norm(relief(hgt * 10, 1.0))
    t = (0.6 * sh + 0.3 * norm(hgt)) * (0.55 + 0.7 * strokes) + 0.15 * strokes
    lut, _ = _ref(ref)
    rgb = grade(_up(t, w, h), lut)
    return _final(rgb, rng, ref, w, h, 14.0)


def zeltbahn(w, h, rng, ref="01-zeltbahn.jpg"):
    """Tarnstoff (Splitter/Flecken) – Reserve für Einheiten-Gründe (derzeit nicht aktiv)."""
    lw, lh = _lo(w, h, 0.4)
    S = max(lw, lh)
    f1, f2 = worley(rng, lh, lw, S * .12, (fbm(rng, lh, lw, S * .2, 3) - .5) * 30, (fbm(rng, lh, lw, S * .2, 3) - .5) * 30)
    _, idx = None, None
    t = norm(fbm(rng, lh, lw, S * .2, 4)) * 0.4 + 0.6 * (np.floor(norm(fbm(rng, lh, lw, S * .12, 4)) * 4) / 3)
    t = t - 0.15 * np.exp(-((f2 - f1) / .05) ** 2)
    lut, _ = _ref(ref)
    rgb = grade(_up(t, w, h), lut)
    return _final(rgb, rng, ref, w, h, 8.0)


def vellum(w, h, rng, ref="parchment.jpg"):
    """t316: Ocker-Pergament (Ausrüstungs-Textfeld wie klein 'parchment'): gewarpte fBm-Wolken,
    fleckige Sprenkel (Schwellen-fBm) und feine Faserkörnung, Palette aus parchment.jpg."""
    lw, lh = _lo(w, h, 0.5)
    S = max(lw, lh)
    q1 = fbm(rng, lh, lw, S * .4, 4); q2 = fbm(rng, lh, lw, S * .4, 4)
    cl = norm(warp(fbm(rng, lh, lw, S * .22, 6), (q1 - .5) * S * .25, (q2 - .5) * S * .25))
    mot = norm(fbm(rng, lh, lw, S * .07, 5, .55))
    spots = np.clip(mot - 0.58, 0, 1) * 2.4
    speck = ndi.gaussian_filter(rng.random((lh, lw)).astype(np.float32), 0.8)
    speck = np.clip((norm(speck) - 0.80) * 5, 0, 1)
    fib = norm(ndi.gaussian_filter(rng.random((lh, lw)).astype(np.float32), (0.5, 6)))
    t = 0.62 * cl - 0.22 * spots - 0.08 * speck + 0.10 * fib
    lut, _ = _ref(ref)
    rgb = grade(_up(t, w, h), lut, 0.18, 1.0)
    return _final(rgb, rng, ref, w, h, 7.0)


# Asset-Name → Generator
GEN = {
    "marmor-oel.jpg": lambda w, h, r: marble(w, h, r),
    "bg-einsatz-a.jpg": lambda w, h, r: crackle_marble(w, h, r, "bg-einsatz-a.jpg"),
    "bg-einsatz-b.jpg": lambda w, h, r: crackle_marble(w, h, r, "bg-einsatz-b.jpg"),
    "rotleder-oel.jpg": lambda w, h, r: oil_leather(w, h, r),
    "leather.jpg": lambda w, h, r: leather(w, h, r),
    "metal-gehaemmert.jpg": lambda w, h, r: patina(w, h, r),
    "stahl-gebuerstet.jpg": lambda w, h, r: brushed_steel(w, h, r),
    "stahl-oel-flaeche.jpg": lambda w, h, r: brushed_steel(w, h, r, "stahl-oel-flaeche.jpg", clouds=0.55, g_amt=9.0),
    "bg-unterstuetzung-a.jpg": lambda w, h, r: brushed_steel(w, h, r, "bg-unterstuetzung-a.jpg", clouds=0.9, sky=0.5, lowf=0.4, streak=0.35),
    "bg-unterstuetzung-b.jpg": lambda w, h, r: brushed_steel(w, h, r, "bg-unterstuetzung-b.jpg", clouds=0.9, sky=0.5, lowf=0.4, streak=0.35),
    "oil-blue.jpg": lambda w, h, r: oil_blue(w, h, r),
    "bg-doktrin-a.jpg": lambda w, h, r: parchment(w, h, r),
    "01-zeltbahn.jpg": lambda w, h, r: zeltbahn(w, h, r),
    "parchment.jpg": lambda w, h, r: vellum(w, h, r),
}
for _v in ("infanterie", "panzer", "artillerie", "aufklarer", "support"):
    GEN[f"{_v}.jpg"] = (lambda ref: (lambda w, h, r: velvet(w, h, r, ref)))(f"{_v}.jpg")


def has(name):
    return ON and Path(str(name)).name in GEN


def texture(name, size, salt=""):
    """Frisch generierte Textur für ein Asset (Dateiname) in Zielgröße; je Render gecacht."""
    name = Path(str(name)).name
    w, h = int(size[0]), int(size[1])
    key = (name, w, h, str(salt))
    c = _state["cache"]
    if key not in c:
        c[key] = GEN[name](w, h, _rng(name, w, h, salt))
    return c[key].copy()
