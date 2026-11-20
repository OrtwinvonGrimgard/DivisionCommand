#!/usr/bin/env python3
"""Erzeugt alle Porträt-Layer (v2) + manifest.json.  Aufruf: python build.py [--out DIR] [--nations rothain,karsk] [--jobs 8] [--only face,hair,...]"""
from __future__ import annotations
import argparse, json, os, sys, time
from concurrent.futures import ProcessPoolExecutor, as_completed
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from pcommon import *
from nations import NATIONS, PERSONS, person
import face as F, hair as Hr, uniform as Un, headgear as Hg, insignia as In, scars as Sc

UNI_TIER = [0, 0, 1, 2, 3]       # Kleidergruppe -> Uniform-/Mützenstufe
KINDS = ["schirm", "zweit", "parade"]
Q = 90


def save(img, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "WEBP", quality=Q, method=5, alpha_quality=100)


def task(args):
    nkey, kind, a = args
    out = Path(args[2]["out"])
    nat = NATIONS[nkey]
    root = out / nkey if nkey != "_common" else out / "_common"
    seed = sum(ord(c) for c in nkey)
    if kind == "face":
        pid, age = a["pid"], a["age"]
        p = person(nat, pid, seed + PERSONS.index(pid) * 17)
        save(F.render_face(p, age, seed + age), root / "face" / f"{pid}_{AGE_NAMES[age]}.webp")
    elif kind == "hair":
        pid, age = a["pid"], a["age"]
        p = person(nat, pid, seed + PERSONS.index(pid) * 17)
        save(Hr.render_hair(p, age, p["hair_style"], seed + age), root / "hair" / f"{pid}_{AGE_NAMES[age]}.webp")
    elif kind == "uniform":
        u, t = a["u"], a["tier"]
        save(Un.render_uniform(dict(nat["uniforms"][u]), t, seed), root / "uniform" / f"{u}_{t}.webp")
    elif kind == "headgear":
        k, t = a["k"], a["tier"]
        save(Hg.render_headgear(k, nat["headgear"], nat, t, seed), root / "headgear" / f"{k}_{t}.webp")
    elif kind == "insignia":
        u, r = a["u"], a["rank"]
        save(In.render_insignia(r, nat["uniforms"][u], nat, seed), root / "insignia" / u / f"{RANKS[r][0]}.webp")
    elif kind == "orders":
        r = a["rank"]
        save(In.render_orders(r, nat["uniforms"][next(iter(nat["uniforms"]))], nat, seed), root / "orders" / f"{RANKS[r][0]}.webp")
    elif kind == "scar":
        save(Sc.render_scar(a["name"], 0), out / "_common" / "scars" / f"{a['name']}.webp")
    return f"{nkey}/{kind}"


def tasks_for(nkey, out, only):
    T = []
    nat = NATIONS[nkey]
    def add(kind, **a):
        if not only or kind in only:
            a["out"] = str(out)
            T.append((nkey, kind, a))
    for pid in PERSONS:
        for age in range(4):
            add("face", pid=pid, age=age); add("hair", pid=pid, age=age)
    for u in nat["uniforms"]:
        for t in range(4):
            add("uniform", u=u, tier=t)
        for r in range(16):
            add("insignia", u=u, rank=r)
    for k in KINDS:
        for t in range(4):
            add("headgear", k=k, tier=t)
    for r in range(16):
        add("orders", rank=r)
    return T


def manifest(out):
    m = {
        "version": 2, "canvas": [W, H], "format": "webp+alpha", "anchors": ANCHORS,
        "z_order": ["face", "uniform", "hair", "beard", "scars", "headgear", "insignia", "orders"],
        "z_note": "Gesicht (Kopf+Hals) liegt UNTER der Uniform: Kragen verdeckt den Halsansatz. Haar über Uniform (Bob-Haar fällt über Kragen). Narben über Haar/Bart, unter Mütze. orders (Brust) über insignia/uniform.",
        "age_stages": [{"id": AGE_NAMES[i], "years": AGE_YEARS[i]} for i in range(4)],
        "ranks": [{"id": r[0], "name": r[1], "age": AGE_NAMES[r[2]], "group": r[3], "tier": UNI_TIER[r[3]]} for r in RANKS],
        "persons": PERSONS,
        "scars": {"mode": "multi", "layers": {k: {"file": f"_common/scars/{k}.webp", "desc": v} for k, v in Sc.SCARS.items()},
                  "note": "frei kombinierbar (Liste), getrennte Gesichtsregionen"},
        "headgear_kinds": KINDS, "nations": {},
    }
    for nkey, nat in NATIONS.items():
        d = out / nkey
        if not d.exists():
            continue
        m["nations"][nkey] = {
            "name": nat["name"], "symbol": nat["symbol"], "bindung": nat["bindung"], "placements": nat["placements"],
            "second_cap": nat["second_cap"], "metals": [nat["metal_lo"], nat["metal_hi"]],
            "uniforms": {u: {"label": c.get("label", u), "collar": c.get("collar"), "base": c["base"]} for u, c in nat["uniforms"].items()},
            "files": {
                "face": "{n}/face/{person}_{age}.webp", "hair": "{n}/hair/{person}_{age}.webp",
                "uniform": "{n}/uniform/{uniform}_{tier}.webp", "headgear": "{n}/headgear/{kind}_{tier}.webp",
                "insignia": "{n}/insignia/{uniform}/{rank}.webp", "orders": "{n}/orders/{rank}.webp",
            },
        }
    (out / "manifest.json").write_text(json.dumps(m, indent=1, ensure_ascii=False), encoding="utf-8")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", default=str(Path(__file__).resolve().parents[2] / "Division_Command/web/assets/portraits/layers"))
    ap.add_argument("--nations", default="")
    ap.add_argument("--jobs", type=int, default=8)
    ap.add_argument("--only", default="")
    ap.add_argument("--skip-existing", action="store_true")
    a = ap.parse_args()
    out = Path(a.out)
    nations = [n for n in a.nations.split(",") if n] or list(NATIONS)
    only = set(x for x in a.only.split(",") if x)
    T = []
    for n in nations:
        T += tasks_for(n, out, only)
    if not only or "scar" in only:
        for s in Sc.SCARS:
            T.append(("rothain", "scar", {"name": s, "out": str(out)}))
    print(len(T), "Aufgaben", flush=True)
    t0 = time.time()
    done = 0
    with ProcessPoolExecutor(a.jobs) as ex:
        futs = [ex.submit(task, t) for t in T]
        for f in as_completed(futs):
            f.result()
            done += 1
            if done % 50 == 0:
                print(f"{done}/{len(T)} {time.time()-t0:.0f}s", flush=True)
    manifest(out)
    print("fertig", time.time() - t0)


if __name__ == "__main__":
    main()
