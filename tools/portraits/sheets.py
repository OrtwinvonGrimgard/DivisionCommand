#!/usr/bin/env python3
"""Kontaktbögen: pro Nation (1) 16 Ränge, Uniform 1, barhäuptig, Person m1; (2) Uniform 2, Person m2/f1, Mützen je Stufe, Narben-Kombinationen; (3) Varianten (Personen x Alter)."""
import sys, itertools
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from portrait_compose import *

SCAR_SETS = [[], ["wange"], ["braue"], ["kiefer"], ["wange", "braue"], ["braue", "kiefer"], ["wange", "kiefer"], ["wange", "braue", "kiefer"]]


def run(nations, out, d=DEFAULT_DIR):
    man = load_manifest(d)
    out = Path(out); out.mkdir(parents=True, exist_ok=True)
    for n in nations:
        us = list(man["nations"][n]["uniforms"])
        contact_sheet(d, n, "m1", us[0], None).save(out / f"{n}_1_raenge_{us[0]}.jpg", quality=88)
        sec = man["nations"][n]["second_cap"]
        def hg(r):
            t = r["tier"]
            return ["schirm", "zweit", "schirm", "parade"][t] if t != 2 else "parade"
        contact_sheet(d, n, lambda r: "f1" if r["tier"] % 2 else "m2", us[1], hg, lambda i: SCAR_SETS[i % 8]).save(out / f"{n}_2_varianten_{us[1]}.jpg", quality=88)
        # Personen x Alter (Leutnant/Hauptmann/Oberst/General), Uniform 1
        from PIL import Image
        W, H = man["canvas"]
        sc = 0.42
        rows = ["leutnant", "hauptmann", "oberst", "general"]
        sheet = Image.new("RGB", (int(W * sc) * 3, int(H * sc) * 4), (54, 58, 70))
        for r, rid in enumerate(rows):
            for c, p in enumerate(man["persons"]):
                im = compose(d, n, rid, p, us[0], None, [], man=man)
                b = Image.new("RGBA", im.size, (54, 58, 70, 255)); b.alpha_composite(im)
                sheet.paste(b.convert("RGB").resize((int(W * sc), int(H * sc)), Image.LANCZOS), (c * int(W * sc), r * int(H * sc)))
        sheet.save(out / f"{n}_3_personen_alter.jpg", quality=88)


if __name__ == "__main__":
    run(sys.argv[2].split(","), sys.argv[1])
