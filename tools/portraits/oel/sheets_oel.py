import sys, os, json
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..'))
from portrait_compose import compose, load_manifest
from PIL import Image, ImageDraw, ImageFont

D = os.environ.get('OEL_OUT', '/workspace/t325-portraits/oel/work/layers_v2')
BG = (54, 58, 70)
FONT = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 15)

def tile(spec, man, scale=0.5):
    im = compose(D, 'rothain', spec['rank'], spec['person'], spec['uniform'], spec.get('cap'), spec.get('scars', []), man=man)
    b = Image.new('RGBA', im.size, BG + (255,)); b.alpha_composite(im)
    return b.convert('RGB').resize((int(768 * scale), int(1024 * scale)), Image.LANCZOS)

def sheet(specs, labels, cols, out, scale=0.5):
    man = load_manifest(D)
    tw, th = int(768 * scale), int(1024 * scale)
    rows = (len(specs) + cols - 1) // cols
    sh = Image.new('RGB', (cols * tw, rows * (th + 22)), BG)
    dr = ImageDraw.Draw(sh)
    for i, (s, l) in enumerate(zip(specs, labels)):
        x, y = (i % cols) * tw, (i // cols) * (th + 22)
        sh.paste(tile(s, man, scale), (x, y + 22)); dr.text((x + 6, y + 3), l, fill=(235, 235, 235), font=FONT)
    sh.save(out, quality=90); print('wrote', out, sh.size)

def ranks_sheet(out, uniform='rock'):
    man = load_manifest(D)
    persons = ['m1', 'm2', 'f1']
    specs, labels = [], []
    for i, r in enumerate(man['ranks']):
        cap = None if i < 2 else ('schirm' if i < 9 else 'parade')
        if i in (0, 1, 2, 3): cap = 'zweit' if i < 2 else 'schirm'
        specs.append(dict(rank=r['id'], person='m1', uniform=uniform, cap=cap))
        labels.append(f"{i+1:02d} {r['name']} ({r['age']}, m1, {cap or 'ohne'})")
    sheet(specs, labels, 4, out)

if __name__ == '__main__':
    which = sys.argv[1]; out = sys.argv[2]
    if which == 'ranks': ranks_sheet(out, sys.argv[3] if len(sys.argv) > 3 else 'rock')

def variants_sheet(out):
    S = []
    def a(label, **kw): S.append((label, kw))
    # row 1: uniform 2 (gala) across ranks / persons
    a('gala · Fähnrich m1 jung · ohne', rank='faehnrich', person='m1', uniform='gala')
    a('gala · Hauptmann f1 reif · schirm', rank='hauptmann', person='f1', uniform='gala', cap='schirm')
    a('gala · Oberst m2 alt · parade', rank='oberst', person='m2', uniform='gala', cap='parade')
    a('gala · Gen.feldmarschall f1 greis · parade', rank='generalfeldmarschall', person='f1', uniform='gala', cap='parade')
    # row 2: headgear on the same person/rank (m2 reif, Major, rock)
    a('rock · Major m2 reif · ohne', rank='major', person='m2', uniform='rock')
    a('rock · Major m2 reif · schirm', rank='major', person='m2', uniform='rock', cap='schirm')
    a('rock · Major m2 reif · zweit (Pelzmütze)', rank='major', person='m2', uniform='rock', cap='zweit')
    a('rock · Major m2 reif · parade', rank='major', person='m2', uniform='rock', cap='parade')
    # row 3: scars, same face (f1 reif, Hauptmann, gala)
    a('Narbe: wange', rank='hauptmann', person='f1', uniform='gala', scars=['wange'])
    a('Narbe: braue', rank='hauptmann', person='f1', uniform='gala', scars=['braue'])
    a('Narbe: kiefer', rank='hauptmann', person='f1', uniform='gala', scars=['kiefer'])
    a('Narben: wange+braue+kiefer', rank='hauptmann', person='f1', uniform='gala', scars=['wange', 'braue', 'kiefer'])
    # row 4: scars on other persons/ages + cap with scars
    a('m1 jung · wange+braue', rank='leutnant', person='m1', uniform='rock', scars=['wange', 'braue'])
    a('m2 alt · braue+kiefer · schirm', rank='oberstleutnant', person='m2', uniform='rock', cap='schirm', scars=['braue', 'kiefer'])
    a('f1 greis · wange · zweit', rank='general', person='f1', uniform='rock', cap='zweit', scars=['wange'])
    a('m2 greis · alle · parade', rank='feldmarschall', person='m2', uniform='gala', cap='parade', scars=['wange', 'braue', 'kiefer'])
    sheet([s[1] for s in S], [s[0] for s in S], 4, out)

if __name__ == '__main__' and sys.argv[1] == 'variants':
    variants_sheet(sys.argv[2])
