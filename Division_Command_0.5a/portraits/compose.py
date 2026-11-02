#!/usr/bin/env python3
"""Legt Porträtebenen übereinander und verwirft Kopfebenen, die unter die Kinnlinie ragen."""

from __future__ import annotations

import json
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent
FRAME_PATH = ROOT / "frame.json"
LAYER_DIR = ROOT / "layers"
OUT_PATH = ROOT / "build" / "portrait.png"


def load_frame() -> dict:
    with FRAME_PATH.open(encoding="utf-8") as handle:
        return json.load(handle)


def layer_path(name: str) -> Path:
    return LAYER_DIR / f"{name}.png"


def opaque_below(image: Image.Image, chin_y: int) -> int:
    width, height = image.size
    start = max(0, min(chin_y, height))
    pixels = image.load()
    count = 0
    for y in range(start, height):
        for x in range(width):
            if pixels[x, y][3] > 0:
                count += 1
    return count


def compose() -> int:
    frame = load_frame()
    width = frame["canvas"]["width"]
    height = frame["canvas"]["height"]
    chin_y = frame["chin_y"]
    forbidden = set(frame["forbid_below_chin"])
    canvas = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    used = []
    errors = []

    for name in frame["order"]:
        path = layer_path(name)
        if not path.exists():
            continue
        layer = Image.open(path).convert("RGBA")
        if layer.size != (width, height):
            errors.append(f"{name}: {layer.size[0]}×{layer.size[1]}, erwartet {width}×{height}")
            continue
        if name in forbidden:
            spilled = opaque_below(layer, chin_y)
            if spilled:
                errors.append(f"{name}: {spilled} deckende Pixel unter der Kinnlinie y={chin_y}")
                continue
        canvas.alpha_composite(layer)
        used.append(name)

    if "body" not in used:
        errors.append("body: layers/body.png fehlt")

    OUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    if errors:
        print("verworfen")
        for line in errors:
            print(f"- {line}")
        if not frame.get("locked", False):
            print("Hinweis: frame.json ist noch nicht gesperrt. Die Kinnlinie ist nur ein Messwert.")
        return 2

    canvas.save(OUT_PATH)
    state = "gesperrt" if frame.get("locked") else "offen"
    print(f"geschrieben {OUT_PATH.relative_to(ROOT)} ({', '.join(used)}; Rahmen {state})")
    return 0


if __name__ == "__main__":
    sys.exit(compose())
