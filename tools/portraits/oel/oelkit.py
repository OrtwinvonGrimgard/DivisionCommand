"""Phase-2 oil pipeline helpers: chroma key, landmark alignment, painterly filter."""
import os, numpy as np, cv2
from PIL import Image

W, H = 768, 1024
EYE_Y, CHIN_Y, CX = 394, 544, 384

def load(p):
    return np.asarray(Image.open(p).convert('RGB')).astype(np.float32)

def key(rgb, lo=20.0, span=80.0, strong=False):
    """Green-screen key -> (rgb_despilled, alpha) float arrays."""
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    m = np.maximum(r, b)
    a = np.clip(1.0 - (g - m - lo) / span, 0, 1)
    # kill tiny holes / speckle
    a8 = (a * 255).astype(np.uint8)
    a8 = cv2.morphologyEx(a8, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    a = a8.astype(np.float32) / 255
    # despill: limit green to the average of r,b (+ small headroom)
    lim = np.maximum(r * 0.78, b) if strong else (r + b) * 0.5 + 6
    g2 = np.minimum(g, lim)
    out = np.stack([r, g2, b], -1)
    return out, a

def to_rgba(rgb, a):
    return np.dstack([np.clip(rgb, 0, 255), a * 255]).astype(np.uint8)

_lm = None
def landmarks(rgb_u8):
    """Return dict with eyeL, eyeR (iris centres, px), chin, nose using mediapipe."""
    global _lm
    import mediapipe as mp
    from mediapipe.tasks import python as mpp
    from mediapipe.tasks.python import vision
    if _lm is None:
        opts = vision.FaceLandmarkerOptions(
            base_options=mpp.BaseOptions(model_asset_path=os.environ.get('OEL_LM_MODEL', '/workspace/t325-portraits/oel/models/face_landmarker.task')),
            num_faces=1)
        _lm = vision.FaceLandmarker.create_from_options(opts)
    h, w = rgb_u8.shape[:2]
    res = _lm.detect(mp.Image(image_format=mp.ImageFormat.SRGB, data=np.ascontiguousarray(rgb_u8)))
    if not res.face_landmarks:
        return None
    L = res.face_landmarks[0]
    P = lambda i: np.array([L[i].x * w, L[i].y * h])
    irisA = np.mean([P(i) for i in range(468, 473)], 0)
    irisB = np.mean([P(i) for i in range(473, 478)], 0)
    eL, eR = (irisA, irisB) if irisA[0] < irisB[0] else (irisB, irisA)
    return dict(eL=eL, eR=eR, chin=P(152), nose=P(1), top=P(10))

def align_matrix(lm, scale=None):
    eL, eR, chin = lm['eL'], lm['eR'], lm['chin']
    mid = (eL + eR) / 2
    d = eR - eL
    ang = np.arctan2(d[1], d[0])           # roll
    # chin distance measured perpendicular to the eye line
    up = np.array([-np.sin(ang), np.cos(ang)])   # 'down' direction of the face
    ec = float(np.dot(chin - mid, up))
    s = scale or (CHIN_Y - EYE_Y) / ec
    c, sn = np.cos(-ang) * s, np.sin(-ang) * s
    A = np.array([[c, -sn, 0], [sn, c, 0]], np.float32)
    t = np.array([CX, EYE_Y]) - A[:, :2] @ mid
    A[:, 2] = t
    return A, s, ang

def warp_rgba(rgba, A, size=(W, H)):
    f = rgba.astype(np.float32)
    f[..., :3] *= f[..., 3:4] / 255.0
    o = cv2.warpAffine(f, A, size, flags=cv2.INTER_AREA if A[0, 0] < 1 else cv2.INTER_CUBIC,
                       borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 0, 0, 0))
    a = o[..., 3:4]
    o[..., :3] = np.where(a > 0.5, o[..., :3] / np.maximum(a / 255.0, 1e-3), 0)
    return np.clip(o, 0, 255).astype(np.uint8)


# ---------------------------------------------------------------- coat colour fix / geometry
def fix_olive(rgb, strength=1.0):
    """Sleeves rendered olive-green by green-screen light: rotate hue to crimson (HSV), keep value."""
    hsv = cv2.cvtColor(np.clip(rgb, 0, 255).astype(np.uint8), cv2.COLOR_RGB2HSV).astype(np.float32)
    h, s_, v = hsv[..., 0] * 2, hsv[..., 1], hsv[..., 2]
    w = np.clip((h - 42) / 8, 0, 1) * np.clip((125 - h) / 15, 0, 1) * np.clip((s_ - 40) / 40, 0, 1) * strength
    w = cv2.GaussianBlur(w, (0, 0), 2.5)
    h2 = h * (1 - w) + (-2.0) * w
    s2 = s_ * (1 - w) + np.minimum(s_, 215) * w
    v2 = v * (1 - w) + v * 1.22 * w
    hsv2 = np.stack([(h2 % 360) / 2, s2, np.minimum(v2, 255)], -1).astype(np.uint8)
    return cv2.cvtColor(hsv2, cv2.COLOR_HSV2RGB).astype(np.float32)

def affine(c, rx, ry, tx, ty):
    """raw point (rx,ry) -> canvas (tx,ty), uniform scale c."""
    return np.array([[c, 0, tx - rx * c], [0, c, ty - ry * c]], np.float32)

def poly_mask(shape, pts, feather=1.5):
    m = np.zeros(shape[:2], np.uint8)
    cv2.fillPoly(m, [np.array(pts, np.int32)], 255)
    m = m.astype(np.float32) / 255
    return cv2.GaussianBlur(m, (0, 0), feather) if feather else m

def extend_neck(head_rgba, shirt=(34, 26, 24), run=110, grow=0.30, y0=None):
    """Head layer (canvas size, RGBA uint8): extend neck downwards with a fade into shirt colour."""
    a = head_rgba[..., 3]
    ys = np.where(a.max(1) > 128)[0]
    yb = int(ys.max()) if y0 is None else y0
    ref = yb - 10
    row = head_rgba[ref].astype(np.float32)
    xs = np.where(row[:, 3] > 128)[0]
    x0, x1 = xs.min(), xs.max()
    out = head_rgba.copy().astype(np.float32)
    # clear the rounded bottom: rebuild rows from ref downwards
    out[ref:, :, :] = 0
    sh = np.array(shirt, np.float32)
    for y in range(ref, min(H, ref + run)):
        t = (y - ref) / run
        d = (y - ref) * grow
        xa, xb = int(round(x0 - d)), int(round(x1 + d))
        src_x = np.clip(np.linspace(x0, x1, xb - xa + 1), 0, W - 1).astype(int)
        seg = row[src_x].copy()
        # take colours from a few rows above (smoother) then blend to shirt
        col = seg[:, :3] * (1 - min(1, t * 1.15)) + sh * min(1, t * 1.15)
        out[y, xa:xb + 1, :3] = col
        out[y, xa:xb + 1, 3] = 255
    return np.clip(out, 0, 255).astype(np.uint8)

# ---------------------------------------------------------------- painterly filter
_rng = np.random.RandomState(7)
def _stroke_noise(shape, ang, length, seed):
    rs = np.random.RandomState(seed)
    n = rs.randn(*shape).astype(np.float32)
    k = np.zeros((length, length), np.float32)
    c = length // 2
    dx, dy = np.cos(np.radians(ang)), np.sin(np.radians(ang))
    for i in range(-c, c + 1):
        k[int(round(c + dy * i)), int(round(c + dx * i))] = 1
    k /= k.sum()
    n = cv2.filter2D(n, -1, k)
    n = cv2.GaussianBlur(n, (0, 0), 0.8)
    return n / (n.std() + 1e-6)

def paint(rgba, seed=1, amount=1.0, shade_edge=True):
    """Make a procedural RGBA layer look painted: soften, brush strokes, canvas grain, edge darkening."""
    a = rgba[..., 3].astype(np.float32) / 255
    rgb = rgba[..., :3].astype(np.float32)
    # premultiplied smoothing to avoid dark fringes
    pm = rgb * a[..., None]
    sm = cv2.bilateralFilter(rgb.astype(np.uint8), 7, 28, 5).astype(np.float32)
    sm = cv2.bilateralFilter(sm.astype(np.uint8), 5, 20, 3).astype(np.float32)
    n1 = _stroke_noise(a.shape, 25, 11, seed)
    n2 = _stroke_noise(a.shape, -40, 7, seed + 1)
    grain = _stroke_noise(a.shape, 0, 3, seed + 2)
    lum = (0.5 * n1 + 0.35 * n2 + 0.25 * grain)
    mod = 1 + amount * 0.075 * lum
    out = sm * mod[..., None]
    # slight dark/earthy grade like the oils
    out = out * 0.93 + np.array([6, 3, 0], np.float32)
    # edge darkening (wet-paint rim) and softening of alpha edge
    if shade_edge:
        er = cv2.erode((a * 255).astype(np.uint8), np.ones((3, 3), np.uint8)).astype(np.float32) / 255
        rim = np.clip(a - cv2.GaussianBlur(er, (0, 0), 1.2), 0, 1)
        out = out * (1 - 0.35 * rim[..., None])
    a2 = cv2.GaussianBlur(a, (0, 0), 0.6)
    a2 = np.where(a > 0.02, np.maximum(a2, a * 0.9), a2)
    return np.dstack([np.clip(out, 0, 255), a2 * 255]).astype(np.uint8)
