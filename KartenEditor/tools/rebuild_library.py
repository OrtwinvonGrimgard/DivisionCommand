#!/usr/bin/env python3
"""Bibliothekskarten über die Editor-Schablone neu aufbauen.

Motiv wird aus dem oberen Bildfenster der bemalten Originale geschnitten,
in den Editor-Rahmen gesetzt, Werte und Texte kommen aus dem Katalog.
Originale bleiben unangetastet (KartenEditor/assets/cards).
"""
from __future__ import annotations

import hashlib
import json
import os
import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
TOOLS = Path(__file__).resolve().parent
sys.path.insert(0, str(TOOLS))
import render as R  # noqa: E402

SRC = ROOT / "assets" / "cards"
GAME = Path("/workspace/artifacts/DivisionCommandApp/web/assets/cards")
SETS = Path("/workspace/artifacts/DivisionCommandApp/web/js/data/sets/alpha")

# Bildfenster der bemalten Originale (1536×2136), etwas innerhalb des Goldrands.
ART_BOX = (90, 70, 1446, 850)
TYP_ORDER = {
    "Einheit": 0,
    "Unterstützung": 1,
    "Ausrüstung": 2,
    "Soforteinsatz": 3,
    "Token": 4,
    "Doktrin": 5,
}


def load_catalog() -> list[dict]:
    js = r"""
const fs = require('fs');
const vm = require('vm');
const ctx = { window: {}, console };
ctx.window = ctx;
const dir = process.argv[1];
for (const f of ['doktrinen.js','tokens.js','einheiten.js','unterstuetzung.js','soforteinsaetze.js','ausruestung.js']) {
  vm.runInNewContext(fs.readFileSync(dir + '/' + f, 'utf8'), ctx);
}
const pack = ctx.window.DC_SET_ALPHA || {};
const cards = [];
for (const typ of Object.keys(pack)) for (const c of pack[typ] || []) cards.push(c);
process.stdout.write(JSON.stringify(cards));
"""
    raw = subprocess.check_output(["node", "-e", js, SETS], text=True)
    cards = json.loads(raw)
    cards.sort(
        key=lambda c: (
            TYP_ORDER.get(c.get("typ") or "", 9),
            str(c.get("name") or "").lower(),
        )
    )
    return cards


def find_src(name: str) -> Path | None:
    for folder in (SRC, GAME):
        p = folder / name
        if p.is_file():
            return p
    return None


def marble_seed(name: str) -> int:
    h = hashlib.md5(str(name).encode("utf-8")).hexdigest()
    return int(h[:8], 16) or 1


def extract_art(src: Path, typ: str) -> Path | None:
    if typ == "Doktrin":
        return None
    im = Image.open(src).convert("RGB")
    w, h = im.size
    if (w, h) == (1536, 2136):
        crop = im.crop(ART_BOX)
        tmp = tempfile.NamedTemporaryFile(suffix=".jpg", delete=False)
        crop.save(tmp.name, quality=95, subsampling=0)
        tmp.close()
        return Path(tmp.name)
    return src


def to_jpeg(png_path: Path, dest: Path) -> None:
    im = Image.open(png_path)
    if im.mode == "RGBA":
        bg = Image.new("RGB", im.size, (12, 8, 6))
        bg.paste(im, mask=im.split()[-1])
        im = bg
    else:
        im = im.convert("RGB")
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "JPEG", quality=92, optimize=True, subsampling=0)


def render_one(card: dict, number: str, dest_jpg: Path) -> None:
    typ = str(card.get("typ") or "Einheit")
    src = find_src(str(card.get("image") or ""))
    if not src:
        raise FileNotFoundError(card.get("name"))
    art = extract_art(src, typ)
    payload = {
        "name": card.get("name") or "Karte",
        "typ": typ,
        "klasse": card.get("klasse") or ("Infanterie" if typ == "Einheit" else ""),
        "ap": int(card.get("ap") or 0),
        "atk": int(card.get("atk") or 0),
        "def": int(card.get("def") or 0),
        "text": card.get("text") or "",
        "flavor": card.get("flavor") or "",
        "tags": list(card.get("tags") or []),
        "edition": "ALPHA",
        "n": number,
        "marble_seed": marble_seed(card.get("name") or number),
        "token_kind": card.get("token_kind") or ("nebel" if "nebel" in str(card.get("name") or "").lower() else "minenfeld"),
        "art_pan_x": 0,
        "art_pan_y": 0,
        "art_zoom": 100,
    }
    tmp = tempfile.NamedTemporaryFile(suffix=".png", delete=False)
    tmp.close()
    try:
        if typ == "Token":
            R.render_token(payload, tmp.name, metal="gold", art=str(art or src))
        else:
            R.render(
                payload,
                str(art) if art else str(src),
                tmp.name,
                number=number,
                native=True,
                metal="gold",
                panel="marmor",
                edition="ALPHA",
                footer_star=False,
            )
        if dest_jpg.suffix.lower() == ".png":
            im = Image.open(tmp.name)
            dest_jpg.parent.mkdir(parents=True, exist_ok=True)
            im.save(dest_jpg)
        else:
            to_jpeg(Path(tmp.name), dest_jpg)
    finally:
        try:
            os.unlink(tmp.name)
        except OSError:
            pass
        if art and art != src:
            try:
                os.unlink(art)
            except OSError:
                pass


def main() -> int:
    only = set(sys.argv[1:]) if len(sys.argv) > 1 else None
    out_dir = GAME
    if os.environ.get("DC_REBUILD_OUT"):
        out_dir = Path(os.environ["DC_REBUILD_OUT"])
        out_dir.mkdir(parents=True, exist_ok=True)
    cards = load_catalog()
    n = 0
    for i, card in enumerate(cards, start=1):
        if only and str(card.get("name")) not in only and str(card.get("image")) not in only:
            continue
        number = f"{i:03d}"
        image = str(card.get("image") or f"{number}.jpg")
        dest = out_dir / image
        print(f"[{number}] {card.get('typ')} · {card.get('name')} → {dest.name}", flush=True)
        render_one(card, number, dest)
        n += 1
    print(f"fertig: {n} Karten", flush=True)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
