"""Procedural insignia / orders / scars for the oil layer set, placed on oil-coat anchors and painted."""
import sys, os
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE); sys.path.insert(0, os.path.dirname(HERE))
import numpy as np
from PIL import Image
import pcommon
from pcommon import *
import insignia as ins
from nations import NATIONS
from oelkit import paint

NAT = NATIONS['rothain']
# per-coat anchors on the 768x1024 canvas (measured on the aligned coats)
OIL_ANCHORS = {
    'rock': dict(boards=[(190, 714, 27), (572, 706, -26)], board_scale=0.78,
                 patches=[(322, 742, -22), (468, 736, 22)], patch_scale=0.7,
                 chest_right=(505, 855), chest_left=(352, 822)),
    'gala': dict(boards=[(194, 667, 24), (576, 665, -24)], board_scale=0.78,
                 patches=[(320, 602, -6), (448, 602, 6)], patch_scale=0.62,
                 chest_right=(512, 772), chest_left=(300, 800)),
}

# anchors above were measured for the v1 coat placement; transform to the v2 placement
V1 = {'rock': dict(k=0.82 / 0.78, y_old=560, y_new=548), 'gala': dict(k=0.88 / 0.85, y_old=556, y_new=552)}
def _tf(u):
    t = V1[u]; k = t['k']
    X = lambda x: 384 + (x - 384) * k
    Y = lambda y: t['y_new'] + (y - t['y_old']) * k
    an = OIL_ANCHORS[u]
    an['boards'] = [(X(x), Y(y), a) for x, y, a in an['boards']]
    an['patches'] = [(X(x), Y(y), a) for x, y, a in an['patches']]
    an['board_scale'] *= k; an['patch_scale'] *= k
    an['chest_right'] = (X(an['chest_right'][0]), Y(an['chest_right'][1]))
    an['chest_left'] = (X(an['chest_left'][0]), Y(an['chest_left'][1]))
for _u in V1: _tf(_u)

def _scaled(im, k):
    return im.resize((max(1, int(im.width * k)), max(1, int(im.height * k))), Image.LANCZOS)

def render_insignia(rank_i, uname):
    an = OIL_ANCHORS[uname]
    cfg_u = NAT['uniforms'][uname]
    spec = ins.RANKSPEC[rank_i]
    layer = new_layer()
    for k, (bx, by, ang) in enumerate(an['boards']):
        patch = _scaled(ins.draw_board(spec, cfg_u, NAT, mirror=(k == 1)), an['board_scale'])
        ins.paste_rot(layer, patch, bx, by, ang)
    for k, (px, py, ang) in enumerate(an['patches']):
        patch = _scaled(ins.draw_collar_patch(rank_i, cfg_u, NAT, -1 if k == 0 else 1), an['patch_scale'])
        ins.paste_rot(layer, patch, px, py, ang)
    img = finish(layer, 0.5)
    return Image.fromarray(paint(np.asarray(img), seed=100 + rank_i, amount=0.9))

def render_orders(rank_i, uname):
    an = OIL_ANCHORS[uname]
    cfg_u = NAT['uniforms'][uname]
    pcommon.ANCHORS['chest_right_c'] = list(an['chest_right'])
    pcommon.ANCHORS['chest_left_c'] = [an['chest_left'][0], an['chest_left'][1] - 20]
    img = ins.render_orders(rank_i, cfg_u, NAT, seed=3)
    return Image.fromarray(paint(np.asarray(img), seed=200 + rank_i, amount=0.9))
