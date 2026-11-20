"""Gemeinsame Hilfen und Anker für das Porträt-Layer-System v2 (Canvas 768x1024, Frontalansicht)."""
from __future__ import annotations
import math, random
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy.ndimage import gaussian_filter, distance_transform_edt

W, H = 768, 1024          # Ausgabegröße
S = 2                     # Supersampling beim Zeichnen
SW, SH = W * S, H * S

# ---- Anker (Canvas-Pixel, Ausgabe 768x1024) ------------------------------------------
ANCHORS = {
    "canvas": [W, H],
    "center_x": 384,
    "skull_top_y": 249,       # Oberkante Schädel (kahl)
    "hairline_y": 284,        # Haaransatz Mitte
    "brow_y": 369,
    "eye_line_y": 394,        # Pupillenlinie (fix für alle Gesichter)
    "eye_dx": 62,             # Abstand Pupille zur Mittelachse (Standard, Person darf +-4 abweichen)
    "nose_tip_y": 454,
    "mouth_y": 494,
    "chin_y": 544,            # Kinnunterkante (fix)
    "head_width": 220,        # Schädelbreite Standard (Person +-6 %)
    "neck_base_y": 640,       # Halsansatz / Kragenoberkante
    "shoulder_y": 690,        # Schulterpunkt-Höhe (Außenpunkt)
    "shoulder_x": [84, 684],  # Außenpunkte der Schultern
    "shoulder_board_c": [[196, 672], [572, 672]],   # Schulterstück-Mitten (links/rechts im Bild)
    "collar_patch_c": [[322, 626], [446, 626]],     # Kragenspiegel-Mitten
    "chest_left_c": [270, 800],   # Brusttasche / Orden: Bildlinks (rechte Brust der Person)
    "chest_right_c": [498, 800],  # Bildrechts (linke Brust der Person, klassische Ordensseite)
    "sleeve_c": [[118, 860], [650, 860]],           # Oberarm / Ärmelabzeichen
    "cap_badge_c": [384, 200],
    "bottom_y": H,
}
CX, EYE_Y, CHIN_Y, TOP_Y = ANCHORS["center_x"], ANCHORS["eye_line_y"], ANCHORS["chin_y"], ANCHORS["skull_top_y"]

RANKS = [  # id, Anzeigename, Altersstufe(0-3), Kleidergruppe(0-4: Kadett, Kompanie, Stab, Generalität, Marschälle)
    ("faehnrich", "Fähnrich", 0, 0), ("oberfaehnrich", "Oberfähnrich", 0, 0),
    ("leutnant", "Leutnant", 0, 1), ("oberleutnant", "Oberleutnant", 0, 1),
    ("hauptmann", "Hauptmann", 1, 1), ("stabshauptmann", "Stabshauptmann", 1, 2),
    ("major", "Major", 1, 2), ("oberstleutnant", "Oberstleutnant", 2, 2),
    ("oberst", "Oberst", 2, 2), ("brigadegeneral", "Brigadegeneral", 2, 3),
    ("generalmajor", "Generalmajor", 3, 3), ("generalleutnant", "Generalleutnant", 3, 3),
    ("general", "General", 3, 3), ("generaloberst", "Generaloberst", 3, 3),
    ("feldmarschall", "Feldmarschall", 3, 4), ("generalfeldmarschall", "Generalfeldmarschall", 3, 4),
]
AGE_NAMES = ["jung", "reif", "alt", "greis"]     # Altersstufen 0..3
AGE_YEARS = [(17, 32), (32, 44), (44, 62), (62, 90)]


def rgb(c, a=255):
    return (int(c[0]), int(c[1]), int(c[2]), a)


def mix(a, b, t):
    return tuple(a[i] * (1 - t) + b[i] * t for i in range(3))


def blur(a, s):
    return gaussian_filter(a, s, mode="nearest")


def gblob(shape, x0, y0, sx, sy, X, Y):
    return np.exp(-(((X - x0) / sx) ** 2 + ((Y - y0) / sy) ** 2) / 2.0).astype(np.float32)


def new_layer():
    return Image.new("RGBA", (SW, SH), (0, 0, 0, 0))


def finish(img, soft=0.6):
    """SS-Bild -> Ausgabegröße, leichte Glättung."""
    if soft:
        img = img.filter(ImageFilter.GaussianBlur(soft))
    return img.resize((W, H), Image.LANCZOS)


def grain(shape, seed, scale=1.0, amp=1.0):
    rng = np.random.RandomState(seed)
    n = rng.randn(*shape).astype(np.float32)
    return (blur(n, 0.9 * scale) * 2.2 * amp + blur(rng.randn(*shape).astype(np.float32), 4 * scale) * 1.2 * amp)


def lambert(z, light=(-0.30, -0.38, 0.87)):
    gy, gx = np.gradient(z)
    nx, ny, nz = -gx, -gy, np.ones_like(z)
    n = np.sqrt(nx * nx + ny * ny + nz * nz)
    L = np.array(light, dtype=np.float32)
    L /= np.linalg.norm(L)
    d = (nx * L[0] + ny * L[1] + nz * L[2]) / n
    return 0.42 + 0.58 * np.clip(d / L[2], -0.2, 1.18)


def arr_to_img(rgb_arr, alpha):
    a = np.clip(alpha, 0, 1)
    out = np.dstack([np.clip(rgb_arr, 0, 255), a * 255]).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def paste_region(base_img, region_img, x0, y0):
    base_img.alpha_composite(region_img, (x0, y0))
