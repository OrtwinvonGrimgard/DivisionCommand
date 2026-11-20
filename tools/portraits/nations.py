"""Nationskonfiguration (Lore: docs/nationen/<Nation>/Raenge.md + Insignien.md, Uniformsprache: docs/technik/PORTRAIT_SYSTEM.md)."""
from __future__ import annotations
import numpy as np

PERSONS = ["m1", "m2", "f1"]

ARCH = {
    "m1": dict(head_w=220, jaw=.80, chin_w=.42, neck_w=150, nose_len=1.0, nose_w=40, eye_w=50, eye_h=11, tilt=2, brow=1.1, cheek=1.0, lip=.9, chin=1.1,
               ear=56, brow_h=33, brow_in=26, brow_t=8, brow_arch=1, mouth_w=66, mouth_droop=3, fem=False),
    "m2": dict(head_w=206, jaw=.70, chin_w=.36, neck_w=138, nose_len=1.12, nose_w=36, eye_w=47, eye_h=10.5, tilt=3, brow=.85, cheek=1.2, lip=.8, chin=.9,
               ear=52, brow_h=31, brow_in=24, brow_t=6.5, brow_arch=1, mouth_w=60, mouth_droop=4, fem=False),
    "f1": dict(head_w=200, jaw=.66, chin_w=.33, neck_w=122, nose_len=.92, nose_w=33, eye_w=52, eye_h=12.5, tilt=3.5, brow=.55, cheek=1.0, lip=1.3, chin=.8,
               ear=46, brow_h=37, brow_in=26, brow_t=5, brow_arch=1, mouth_w=58, mouth_droop=0, fem=True, blush=.8),
}


def lerp(a, b, t):
    return tuple(int(a[i] * (1 - t) + b[i] * t) for i in range(3))


def person(nat, pid, seed):
    p = dict(ARCH[pid])
    rng = np.random.RandomState(seed)
    for k in ("jaw", "chin_w", "nose_len", "cheek"):
        p[k] = p[k] * (1 + rng.uniform(-0.05, 0.05))
    p["head_w"] = p["head_w"] * (1 + rng.uniform(-0.02, 0.02))
    p["eye_dx"] = 62 + rng.randint(-3, 4)
    sk, hr, ir, st = nat["persons"][pid]
    p["skin"], p["hair"], p["iris"], p["hair_style"] = sk, hr, ir, st
    p["brow_col"] = tuple(int(c * 0.82) for c in hr)
    p["lip_col"] = lerp(sk, (150, 60, 62), .6)
    p.update(nat.get("face_mod", {}).get(pid, {}))
    return p


def N(**kw):
    return kw


def U(base, trim, **kw):
    d = dict(base=base, trim=trim)
    d.update(kw)
    return d


def cap(base, band=None, piping=None):
    return dict(crown=base, band=band or tuple(int(v * .45) for v in base), piping=piping)


SK_LIGHT = (228, 186, 160); SK_MED = (208, 164, 130); SK_OLIVE = (196, 156, 116); SK_PALE = (214, 200, 190); SK_TAN = (186, 140, 100)
SK_BROWN = (140, 96, 68); SK_DARK = (98, 66, 50); SK_BLACK = (66, 44, 36)

NATIONS = {
    "rothain": N(name="Rothain", symbol="rothain", bindung="Erbe / Die Krone versagt nie", placements=["shoulder", "collar"],
        metal_lo=(204, 204, 212), metal_hi=(216, 180, 90), accent=(214, 216, 224), patch_col=(60, 14, 20), order_style="ring", second_cap="feldmuetze",
        ribbons=[(120, 24, 32), (196, 196, 204), (40, 36, 40), (160, 120, 50)],
        persons=dict(m1=(SK_LIGHT, (84, 50, 30), (96, 118, 128), "kurz"), m2=(SK_MED, (46, 32, 26), (104, 84, 56), "scheitel"), f1=(SK_LIGHT, (150, 96, 54), (80, 120, 100), "bob")),
        uniforms=dict(
            rock=U((108, 28, 36), (200, 200, 208), collar="stand_fur", closure="double", straps="cross_belt", epaulette_col=(84, 20, 28), leather=(150, 118, 74), label="Dienstrock mit Pelzkragen, Kreuzriemen, Patronentasche"),
            gala=U((98, 22, 32), (206, 206, 214), collar="stand", collar_col=(66, 16, 22), closure="frogging", epaulette_col=(80, 18, 26), label="Paradejacke mit Silberschnüren")),
        headgear=cap((98, 24, 32), (28, 24, 24), (204, 204, 212))),
    "karsk": N(name="Karsk", symbol="karsk", bindung="Körper", placements=["shoulder", "collar", "sleeve"],
        metal_lo=(170, 176, 188), metal_hi=(222, 228, 238), accent=(188, 40, 44), patch_col=(40, 42, 46), order_style="hex", second_cap="barett",
        ribbons=[(176, 36, 40), (90, 96, 106), (30, 32, 36), (150, 156, 168)], collar_symbol_always=False,
        persons=dict(m1=(SK_PALE, (236, 236, 232), (150, 158, 164), "kurz"), m2=((200, 188, 182), (22, 22, 26), (110, 120, 124), "zurueck"), f1=((218, 206, 200), (230, 230, 228), (130, 150, 156), "zurueck")),
        face_mod=dict(m1=dict(age_mul=.6, blush_mul=.3), m2=dict(age_mul=.5, blush_mul=.3), f1=dict(age_mul=.5, blush_mul=.3)),
        uniforms=dict(
            panzer=U((60, 62, 68), (186, 190, 198), collar="stand", closure="single", straps="harness", epaulette_col=(46, 48, 54), metal=(176, 182, 192), leather=(40, 42, 46), label="Anthrazit-Dienstrock mit Gurtgeschirr"),
            tech=U((52, 54, 60), (176, 182, 192), collar="high", closure="zip", epaulette_col=(40, 42, 48), metal=(176, 182, 192), label="Hochgeschlossener Technikanzug mit Reißverschluss")),
        headgear=cap((58, 60, 66), (150, 30, 34), (176, 182, 192))),
    "averon": N(name="Averon", symbol="averon", bindung="Zeit", placements=["shoulder", "collar"],
        metal_lo=(206, 192, 150), metal_hi=(146, 228, 196), accent=(150, 230, 200), patch_col=(44, 56, 40), order_style="plaque", second_cap="feldmuetze",
        ribbons=[(206, 192, 150), (60, 120, 100), (70, 82, 52), (150, 230, 200)],
        persons=dict(m1=(SK_OLIVE, (40, 32, 26), (96, 110, 80), "buzz"), m2=(SK_MED, (120, 84, 50), (88, 120, 140), "kurz"), f1=(SK_TAN, (60, 42, 30), (100, 80, 56), "zurueck")),
        uniforms=dict(
            feld=U((76, 86, 56), (206, 192, 150), collar="stand", closure="single", straps="plate", plate_col=(62, 72, 46), stripe=(206, 186, 140), epaulette_col=(62, 72, 46), label="Olivfarbene Feldbluse mit Plattenträger und Sandstreifen"),
            dienst=U((72, 82, 54), (206, 192, 150), collar="fold", collar_col=(66, 76, 50), closure="single", pockets=True, shirt=(214, 212, 196), tie=(40, 52, 40), epaulette_col=(60, 70, 44), label="Dienstjacke mit offenem Kragen, Hemd und Krawatte")),
        headgear=cap((74, 84, 54), (44, 54, 36), (206, 192, 150))),
    "ossaria": N(name="Ossaria", symbol="ossaria", bindung="Tote", placements=["collar", "shoulder"],
        metal_lo=(214, 206, 184), metal_hi=(236, 230, 208), accent=(214, 206, 184), patch_col=(20, 20, 22), order_style="ring", second_cap="feldmuetze",
        ribbons=[(214, 206, 184), (30, 30, 34), (110, 106, 98)],
        persons=dict(m1=((214, 190, 160), (28, 24, 22), (70, 60, 52), "kurz"), m2=((196, 160, 128), (20, 18, 18), (60, 50, 44), "zurueck"), f1=((220, 196, 170), (22, 20, 20), (74, 60, 50), "bob")),
        uniforms=dict(
            platte=U((30, 30, 34), (214, 206, 184), collar="stand", closure="double", straps="braces", leather=(20, 20, 22), epaulette_col=(22, 22, 26), label="Schwarzer Rock mit Knochenplatten-Koppel"),
            klage=U((26, 26, 30), (214, 206, 184), collar="high", closure="single", epaulette_col=(18, 18, 22), label="Hoher Trauerkragen")),
        headgear=cap((30, 30, 34), (16, 16, 18), (214, 206, 184))),
    "sahr": N(name="Sahr", symbol="sahr", bindung="Fluss", placements=["shoulder", "sleeve"],
        metal_lo=(196, 150, 96), metal_hi=(232, 204, 130), accent=(236, 226, 196), patch_col=(120, 96, 64), order_style="ring", second_cap="feldmuetze",
        ribbons=[(236, 226, 196), (60, 110, 120), (196, 150, 96)],
        persons=dict(m1=(SK_TAN, (24, 20, 18), (60, 44, 30), "kurz"), m2=(SK_BROWN, (18, 16, 16), (50, 36, 26), "scheitel"), f1=((190, 142, 104), (20, 18, 18), (56, 40, 30), "zurueck")),
        uniforms=dict(
            wickel=U((180, 152, 106), (240, 230, 200), collar="stand", closure="single", straps="braces", leather=(120, 80, 50), epaulette_col=(150, 124, 84), label="Sandrock mit gewickeltem Gürtel"),
            offen=U((172, 144, 98), (240, 230, 200), collar="fold", collar_col=(150, 124, 84), closure="single", shirt=(236, 226, 200), tie=(150, 110, 70), pockets=True, label="Offene Dienstjacke")),
        headgear=cap((176, 148, 100), (120, 96, 64), (236, 226, 196))),
    "steinmark": N(name="Steinmark", symbol="steinmark", bindung="Recht", placements=["shoulder", "collar"],
        metal_lo=(196, 198, 200), metal_hi=(214, 180, 96), accent=(200, 200, 204), patch_col=(40, 44, 44), order_style="ring", second_cap="feldmuetze",
        ribbons=[(40, 40, 42), (196, 198, 200), (130, 40, 40)],
        persons=dict(m1=(SK_LIGHT, (190, 160, 90), (104, 130, 150), "kurz"), m2=((214, 168, 140), (140, 70, 40), (110, 120, 90), "scheitel"), f1=(SK_LIGHT, (170, 140, 90), (96, 124, 140), "zurueck")),
        uniforms=dict(
            koppel=U((88, 92, 90), (196, 198, 200), collar="stand", closure="single", straps="braces", leather=(26, 26, 28), epaulette_col=(70, 74, 72), label="Feldgrauer Rock mit schwarzem Koppelzeug"),
            litze=U((84, 88, 86), (196, 198, 200), collar="fold", collar_col=(70, 74, 72), closure="single", pockets=True, shirt=(214, 212, 204), tie=(30, 30, 32), epaulette_col=(68, 72, 70), label="Dienstjacke mit Litzen")),
        headgear=cap((86, 90, 88), (26, 26, 28), (196, 198, 200))),
    "vael": N(name="Vael", symbol="vael", bindung="Geschäft", placements=["shoulder", "collar"],
        metal_lo=(200, 202, 208), metal_hi=(222, 224, 232), accent=(210, 212, 220), patch_col=(46, 42, 46), order_style="ring", second_cap="barett",
        ribbons=[(210, 212, 220), (46, 42, 46), (150, 130, 80)],
        persons=dict(m1=(SK_BLACK, (14, 12, 12), (50, 36, 28), "kurz"), m2=((80, 54, 42), (14, 12, 12), (44, 34, 26), "buzz"), f1=((74, 50, 40), (14, 12, 12), (46, 34, 26), "zurueck")),
        uniforms=dict(
            hell=U((206, 200, 184), (200, 202, 208), collar="stand", collar_col=(50, 46, 48), closure="single", epaulette_col=(190, 184, 168), label="Helle Dienstjacke mit dunklem Kragen"),
            kontor=U((196, 190, 174), (200, 202, 208), collar="fold", collar_col=(50, 46, 48), closure="single", pockets=True, shirt=(232, 230, 222), tie=(50, 46, 48), epaulette_col=(180, 174, 158), label="Kontorjacke mit Revers")),
        headgear=cap((200, 194, 178), (50, 46, 48), (200, 202, 208))),
    "vesper": N(name="Vesper", symbol="vesper", bindung="System", placements=["collar", "shoulder"],
        metal_lo=(150, 150, 140), metal_hi=(190, 188, 176), accent=(24, 24, 26), patch_col=(24, 26, 24), order_style="hex", second_cap="barett",
        ribbons=[(24, 24, 26), (110, 112, 90), (150, 150, 140)],
        persons=dict(m1=(SK_LIGHT, (60, 44, 34), (100, 110, 100), "kurz"), m2=((222, 180, 150), (140, 110, 70), (90, 110, 130), "scheitel"), f1=((226, 188, 162), (70, 50, 36), (100, 110, 96), "zurueck")),
        uniforms=dict(
            siegel=U((86, 88, 62), (150, 150, 140), collar="stand", closure="single", pockets=True, epaulette_col=(66, 68, 48), label="Stumpf-Oliv Rock mit schwarzen Siegeln"),
            kommando=U((80, 82, 58), (150, 150, 140), collar="high", closure="zip", epaulette_col=(62, 64, 44), label="Kommandoanzug hochgeschlossen")),
        headgear=cap((84, 86, 60), (24, 26, 24), (150, 150, 140))),
    "eldran": N(name="Eldran", symbol="eldran", bindung="Krone und Parlament", placements=["shoulder", "collar"],
        metal_lo=(190, 190, 176), metal_hi=(208, 172, 92), accent=(208, 172, 92), patch_col=(48, 62, 50), order_style="ring", second_cap="feldmuetze",
        ribbons=[(208, 172, 92), (60, 84, 66), (170, 170, 160)],
        persons=dict(m1=(SK_LIGHT, (120, 90, 60), (100, 120, 110), "scheitel"), m2=(SK_MED, (44, 36, 30), (90, 100, 80), "kurz"), f1=(SK_MED, (100, 70, 44), (96, 118, 100), "bob")),
        uniforms=dict(
            festung=U((84, 100, 86), (190, 190, 176), collar="high", closure="single", epaulette_col=(66, 80, 68), label="Steingrüner Rock mit Befestigungskragen"),
            parlament=U((80, 96, 82), (190, 190, 176), collar="fold", collar_col=(62, 78, 64), closure="single", pockets=True, shirt=(224, 222, 210), tie=(60, 76, 62), epaulette_col=(64, 78, 66), label="Parlamentsjacke")),
        headgear=cap((82, 98, 84), (44, 56, 46), (190, 190, 176))),
    "namar": N(name="Namar", symbol="namar", bindung="Häfen", placements=["shoulder", "collar"],
        metal_lo=(200, 204, 210), metal_hi=(214, 180, 96), accent=(214, 180, 96), patch_col=(20, 32, 60), order_style="ring", second_cap="barett",
        ribbons=[(30, 50, 100), (200, 204, 210), (214, 180, 96)],
        persons=dict(m1=(SK_BROWN, (22, 18, 16), (60, 44, 30), "kurz"), m2=(SK_DARK, (14, 12, 12), (50, 36, 26), "buzz"), f1=((120, 82, 60), (24, 18, 16), (56, 40, 30), "bob")),
        uniforms=dict(
            marine=U((28, 42, 78), (200, 204, 210), collar="stand", closure="double", epaulette_col=(20, 32, 62), label="Dunkelblauer Marinerock zweireihig"),
            kai=U((26, 40, 74), (200, 204, 210), collar="fold", collar_col=(20, 32, 62), closure="single", pockets=True, shirt=(226, 226, 220), tie=(20, 30, 56), epaulette_col=(20, 32, 62), label="Hafenjacke mit offenem Kragen")),
        headgear=cap((28, 42, 78), (14, 22, 44), (200, 204, 210))),
    "orthea": N(name="Orthea", symbol="orthea", bindung="Erkenntnis", placements=["collar", "shoulder"],
        metal_lo=(186, 192, 200), metal_hi=(226, 232, 240), accent=(90, 140, 170), patch_col=(120, 126, 134), order_style="ring", second_cap="barett",
        ribbons=[(90, 140, 170), (226, 232, 240), (120, 126, 134)],
        persons=dict(m1=(SK_LIGHT, (150, 140, 120), (96, 120, 140), "scheitel"), m2=(SK_PALE, (50, 44, 40), (100, 110, 120), "kurz"), f1=(SK_PALE, (110, 90, 70), (96, 124, 140), "zurueck")),
        uniforms=dict(
            mess=U((170, 174, 180), (186, 192, 200), collar="stand", closure="single", epaulette_col=(150, 154, 160), label="Hellgrauer Rock mit feiner Linie"),
            labor=U((164, 168, 174), (186, 192, 200), collar="fold", collar_col=(140, 144, 150), closure="single", pockets=True, shirt=(232, 234, 236), tie=(90, 140, 170), epaulette_col=(146, 150, 156), label="Labor-Dienstjacke")),
        headgear=cap((168, 172, 178), (96, 102, 110), (186, 192, 200))),
    "dargan": N(name="Dargan", symbol="dargan", bindung="Schuld", placements=["shoulder", "collar"],
        metal_lo=(196, 192, 180), metal_hi=(222, 218, 206), accent=(24, 22, 22), patch_col=(80, 58, 40), order_style="plaque", second_cap="feldmuetze",
        ribbons=[(222, 218, 206), (24, 22, 22), (110, 80, 54)],
        persons=dict(m1=(SK_MED, (70, 48, 34), (100, 80, 56), "kurz"), m2=(SK_LIGHT, (30, 26, 24), (96, 110, 120), "zurueck"), f1=(SK_MED, (80, 56, 40), (96, 76, 54), "bob")),
        uniforms=dict(
            gerade=U((114, 84, 58), (222, 218, 206), collar="stand", closure="single", epaulette_col=(92, 66, 44), label="Nussbrauner gerader Rock"),
            zeile=U((108, 80, 54), (222, 218, 206), collar="fold", collar_col=(90, 66, 44), closure="single", pockets=True, shirt=(236, 232, 218), tie=(30, 26, 24), epaulette_col=(90, 64, 42), label="Rock mit papierheller Manschette")),
        headgear=cap((112, 82, 56), (60, 44, 30), (222, 218, 206))),
    "lyr": N(name="Lyr", symbol="lyr", bindung="Eid", placements=["shoulder", "sleeve"],
        metal_lo=(170, 176, 184), metal_hi=(214, 220, 228), accent=(214, 220, 228), patch_col=(56, 62, 70), order_style="ring", second_cap="feldmuetze",
        ribbons=[(214, 220, 228), (56, 62, 70), (120, 130, 140)],
        persons=dict(m1=(SK_LIGHT, (110, 100, 90), (110, 124, 134), "kurz"), m2=(SK_PALE, (44, 40, 38), (100, 110, 116), "scheitel"), f1=(SK_PALE, (90, 80, 70), (100, 120, 130), "zurueck")),
        uniforms=dict(
            kurz=U((90, 96, 104), (170, 176, 184), collar="stand", closure="single", pockets=True, epaulette_col=(70, 76, 84), label="Schiefergraue Kurzjacke"),
            umhang=U((84, 90, 98), (170, 176, 184), collar="high", closure="single", epaulette_col=(64, 70, 78), label="Schiefergraue Jacke mit hohem Kragen (Umhang-Palette)")),
        headgear=cap((88, 94, 102), (50, 56, 62), (170, 176, 184))),
    "caldris": N(name="Caldris", symbol="caldris", bindung="Fürsorge", placements=["shoulder", "sleeve"],
        metal_lo=(200, 206, 196), metal_hi=(228, 232, 220), accent=(60, 130, 104), patch_col=(100, 130, 100), order_style="ring", second_cap="barett",
        ribbons=[(60, 130, 104), (228, 232, 220), (120, 150, 120)],
        persons=dict(m1=(SK_LIGHT, (130, 100, 70), (100, 130, 120), "scheitel"), m2=(SK_OLIVE, (40, 34, 30), (90, 100, 80), "kurz"), f1=(SK_MED, (90, 66, 44), (96, 126, 110), "bob")),
        uniforms=dict(
            institut=U((140, 164, 138), (200, 206, 196), collar="stand", closure="single", epaulette_col=(116, 140, 114), label="Blassgrüner Institutionsrock"),
            sanitaet=U((134, 158, 132), (200, 206, 196), collar="fold", collar_col=(112, 136, 110), closure="single", pockets=True, shirt=(236, 240, 232), tie=(60, 130, 104), epaulette_col=(112, 136, 110), label="Sanitätsjacke")),
        headgear=cap((138, 162, 136), (80, 110, 84), (200, 206, 196))),
    "merovan": N(name="Merovan", symbol="merovan", bindung="Weg", placements=["shoulder", "sleeve"],
        metal_lo=(204, 190, 150), metal_hi=(232, 214, 160), accent=(238, 228, 204), patch_col=(150, 130, 94), order_style="ring", second_cap="barett",
        ribbons=[(238, 228, 204), (150, 130, 94), (90, 110, 120)],
        persons=dict(m1=(SK_TAN, (60, 44, 32), (96, 80, 56), "kurz"), m2=(SK_MED, (100, 76, 50), (104, 120, 110), "scheitel"), f1=(SK_TAN, (70, 50, 36), (90, 76, 54), "zurueck")),
        uniforms=dict(
            expedition=U((188, 166, 122), (238, 228, 204), collar="fold", collar_col=(170, 148, 106), closure="single", pockets=True, shirt=(232, 224, 200), tie=(120, 100, 70), epaulette_col=(168, 146, 104), label="Expeditionsrock mit heller Paspel"),
            marsch=U((182, 160, 116), (238, 228, 204), collar="stand", closure="single", pockets=True, epaulette_col=(160, 138, 96), label="Marschjacke")),
        headgear=cap((186, 164, 120), (130, 108, 72), (238, 228, 204))),
    "theryn": N(name="Theryn", symbol="theryn", bindung="Glaube", placements=["shoulder", "collar"],
        metal_lo=(208, 190, 150), metal_hi=(232, 186, 80), accent=(226, 170, 70), patch_col=(90, 48, 36), order_style="ring", second_cap="feldmuetze",
        ribbons=[(226, 170, 70), (90, 48, 36), (208, 190, 150)],
        persons=dict(m1=(SK_MED, (40, 30, 24), (80, 60, 44), "kurz"), m2=(SK_TAN, (90, 60, 40), (96, 84, 60), "zurueck"), f1=(SK_MED, (50, 36, 28), (84, 64, 46), "bob")),
        uniforms=dict(
            masse=U((120, 66, 50), (208, 190, 150), collar="stand", closure="double", epaulette_col=(96, 52, 40), label="Rotbraune Massenjacke"),
            glaube=U((114, 62, 48), (208, 190, 150), collar="high", closure="single", epaulette_col=(92, 50, 38), label="Schlichte Glaubensjacke mit glattem Balken")),
        headgear=cap((118, 64, 50), (70, 38, 30), (208, 190, 150))),
}
FIRST = ["rothain", "karsk", "averon"]
