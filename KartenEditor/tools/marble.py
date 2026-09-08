#!/usr/bin/env python3
"""Ölgemälde-Marmor: schwarz, Quarz. Gleicher Generator wie js/marble.js (Mulberry32)."""
from __future__ import annotations
from PIL import Image, ImageEnhance, ImageFilter

BRIGHTNESS = 0.78
CONTRAST = 1.08
VEIL = 26
QUARTZ = 0.18


def _i32(x):
    x = x & 0xFFFFFFFF
    return x - 0x100000000 if x >= 0x80000000 else x


def _u32(x):
    return x & 0xFFFFFFFF


def _imul(a, b):
    return _i32((_i32(a) * _i32(b)))


class Mulberry32:
    """Gleicher PRNG wie js/marble.js, damit gleicher Seed = gleiches Muster."""

    def __init__(self, seed):
        self.a = _i32(seed)

    def random(self):
        self.a = _i32(self.a + 0x6D2B79F5)
        t = _imul(self.a ^ (_u32(self.a) >> 15), 1 | self.a)
        t = _i32(t + _imul(t ^ (_u32(t) >> 7), 61 | t) ^ t)
        return _u32(t ^ (_u32(t) >> 14)) / 4294967296.0


def _noise(w, h, cell, rng):
    gw = max(2, w // max(2, cell) + 1)
    gh = max(2, h // max(2, cell) + 1)
    buf = bytes(int(rng.random() * 255) for _ in range(gw * gh))
    return Image.frombytes("L", (gw, gh), buf).resize((w, h), Image.Resampling.BICUBIC)


def name_seed(name):
    s = 2166136261
    for ch in str(name or "marmor"):
        s ^= ord(ch)
        s = (s * 16777619) & 0xFFFFFFFF
    return s or 1


def make_marble(w, h, seed=1, brightness=BRIGHTNESS, contrast=CONTRAST, veil=VEIL, quartz=QUARTZ):
    rng = Mulberry32(int(seed) & 0xFFFFFFFF)
    tw = 320
    th = max(160, int(320 * h / max(1, w)))
    n1 = _noise(tw, th, 26, rng)
    n2 = _noise(tw, th, 16, rng)
    n3 = _noise(tw, th, 9, rng)
    n4 = _noise(tw, th, 40, rng)
    p1, p2, p3, p4 = n1.load(), n2.load(), n3.load(), n4.load()
    out = Image.new("L", (tw, th))
    px = out.load()
    qcut = 0.78 + (1.0 - quartz) * 0.16
    for y in range(th):
        for x in range(tw):
            wx = (x + int((p1[x, y] - 128) * 0.62)) % tw
            wy = (y + int((p2[x, y] - 128) * 0.48)) % th
            v = p3[wx, wy] / 255.0
            ridge = 1.0 - abs(v * 2.0 - 1.0)
            ridge = ridge * ridge
            g = 0.035 + ridge * 0.14 + p4[x, y] / 255.0 * 0.04
            if ridge > qcut and p1[x, y] > 188:
                g = 0.32 + ridge * 0.38 + p2[x, y] / 255.0 * 0.08
            px[x, y] = int(max(0, min(255, g * 255)))
    out = out.resize((w, h), Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(1.8))
    rgb = Image.merge("RGB", (out, out.point(lambda p: int(p * 0.90)), out.point(lambda p: int(p * 0.84))))
    rgb = ImageEnhance.Brightness(rgb).enhance(brightness)
    rgb = ImageEnhance.Contrast(rgb).enhance(contrast)
    veil_img = Image.new("RGBA", (w, h), (0, 0, 0, int(veil)))
    return Image.alpha_composite(rgb.convert("RGBA"), veil_img).convert("RGB")


if __name__ == "__main__":
    import sys
    seed = int(sys.argv[1]) if len(sys.argv) > 1 else 1
    dest = sys.argv[2] if len(sys.argv) > 2 else "marmor.png"
    make_marble(1024, 768, seed=seed).save(dest, "PNG")
    print("wrote", dest, "seed", seed)
