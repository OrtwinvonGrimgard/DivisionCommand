#!/usr/bin/env python3
"""Compositor für die modularen Porträt-Layer (v2).

Beispiel:
  python tools/portrait_compose.py --nation rothain --rank oberst --person m1 --uniform rock \
      --headgear schirm --scars wange,braue --out /tmp/p.png
  python tools/portrait_compose.py --sheet rothain --out /tmp/rothain.jpg      # Kontaktbogen 16 Ränge
Als Modul: compose(manifest_dir, nation, rank, person, uniform, headgear=None, scars=[...]) -> PIL RGBA
"""
from __future__ import annotations
import argparse, json, sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

DEFAULT_DIR = Path(__file__).resolve().parents[1] / "Division_Command/web/assets/portraits/layers"


def load_manifest(d=DEFAULT_DIR):
    return json.loads((Path(d) / "manifest.json").read_text(encoding="utf-8"))


def compose(d, nation, rank, person="m1", uniform=None, headgear=None, scars=(), orders=True, hair=True, man=None):
    """Legt die Layer in Manifest-Z-Reihenfolge übereinander. scars ist eine Liste (beliebige Teilmenge)."""
    d = Path(d)
    man = man or load_manifest(d)
    nat = man["nations"][nation]
    rk = next(r for r in man["ranks"] if r["id"] == rank)
    uniform = uniform or next(iter(nat["uniforms"]))
    if isinstance(scars, str):
        scars = [s for s in scars.split(",") if s]
    W, H = man["canvas"]
    cv = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    f = nat["files"]
    fmt = dict(n=nation, person=person, age=rk["age"], uniform=uniform, tier=rk["tier"], rank=rank)
    def put(rel):
        p = d / rel
        if not p.exists():
            raise FileNotFoundError(p)
        cv.alpha_composite(Image.open(p).convert("RGBA"))
    for z in man["z_order"]:
        if z == "face":
            put(f["face"].format(**fmt))
        elif z == "uniform":
            put(f["uniform"].format(**fmt))
        elif z == "hair" and hair and not (headgear and headgear != "none" and False):
            put(f["hair"].format(**fmt))
        elif z == "scars":
            for s in scars:
                if s not in man["scars"]["layers"]:
                    raise KeyError(f"unbekannte Narbe: {s}")
                put(man["scars"]["layers"][s]["file"])
        elif z == "headgear" and headgear and headgear != "none":
            put(f["headgear"].format(kind=headgear, **{k: v for k, v in fmt.items() if k != "kind"}))
        elif z == "insignia":
            put(f["insignia"].format(**fmt))
        elif z == "orders" and orders:
            put(f["orders"].format(**fmt))
    return cv


def contact_sheet(d, nation, person="m1", uniform=None, headgear=None, scars_cycle=None, bg=(54, 58, 70), cols=4, scale=0.5):
    man = load_manifest(d)
    W, H = man["canvas"]
    tw, th = int(W * scale), int(H * scale)
    rows = (len(man["ranks"]) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * tw, rows * (th + 22)), bg)
    dr = ImageDraw.Draw(sheet)
    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 15)
    except Exception:
        font = ImageFont.load_default()
    for i, r in enumerate(man["ranks"]):
        hg = headgear(r) if callable(headgear) else headgear
        sc = scars_cycle(i) if scars_cycle else []
        pc = person(r) if callable(person) else person
        im = compose(d, nation, r["id"], pc, uniform, hg, sc, man=man)
        b = Image.new("RGBA", im.size, bg + (255,))
        b.alpha_composite(im)
        b = b.convert("RGB").resize((tw, th), Image.LANCZOS)
        x, y = (i % cols) * tw, (i // cols) * (th + 22)
        sheet.paste(b, (x, y + 22))
        dr.text((x + 6, y + 3), f"{i+1:02d} {r['name']}  ({r['age']})", fill=(235, 235, 235), font=font)
    return sheet


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dir", default=str(DEFAULT_DIR))
    ap.add_argument("--nation"); ap.add_argument("--rank", default="leutnant"); ap.add_argument("--person", default="m1")
    ap.add_argument("--uniform"); ap.add_argument("--headgear", default="none"); ap.add_argument("--scars", default="")
    ap.add_argument("--sheet", help="Nation für Kontaktbogen")
    ap.add_argument("--out", required=True)
    a = ap.parse_args()
    if a.sheet:
        contact_sheet(a.dir, a.sheet, a.person, a.uniform, a.headgear if a.headgear != "none" else None).save(a.out, quality=90)
    else:
        compose(a.dir, a.nation, a.rank, a.person, a.uniform, a.headgear, a.scars).save(a.out)
    print("geschrieben", a.out)


if __name__ == "__main__":
    main()
