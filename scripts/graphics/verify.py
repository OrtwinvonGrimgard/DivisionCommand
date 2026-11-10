#!/usr/bin/env python3
"""alpha40-Prüfung aller 1746 IDs: Quelle, Flächentext (<=120), Motiv, WebP 1024x1428,
Renderer-Hash (alpha40+KartenEditor), Laufzeitmanifest. Keine OCR-Behauptung."""
import json, hashlib, subprocess, re
from pathlib import Path
from PIL import Image
HERE = Path(__file__).resolve().parent; ROOT = HERE.parents[1]; WEB = ROOT / 'Division_Command/web'
TOOLS = ROOT / 'KartenEditor' / 'tools'
sha = lambda b: hashlib.sha256(b).hexdigest()
def renderer_digest():
    parts = b''
    for p in (HERE / 'alpha40.py', TOOLS / 'render.py', TOOLS / 'render_core.py'):
        parts += p.read_bytes()
    return sha(parts)
D = json.loads(subprocess.check_output(['node', str(HERE / 'export_catalog.js')], cwd=ROOT)); C = {c['id']: c for c in D['cards']}
M = json.loads((HERE / 'graphics-manifest.json').read_text()); K = json.loads((ROOT / 'scripts/cards-review/kurz.json').read_text())
assert M['version'] == 'alpha40' and len(C) == M['catalog_ids'] == 1746 and {r['id'] for r in M['records']} == set(C)
rd = renderer_digest(); ready = 0
for r in M['records']:
    c = C[r['id']]
    assert r['source_record_sha256'] == sha(json.dumps(c, ensure_ascii=False, sort_keys=True).encode()), r['id'] + ' veraltete Quelle'
    assert r['kurz'] == K[r['id']]['kurz'] and len(r['kurz']) <= 120, r['id'] + ' Flächentext'
    assert r['keywords'] == (c.get('keywords') or []), r['id']
    assert r['printed_stats'] == {'ap': c.get('ap'), 'atk': c.get('atk'), 'def': c.get('def'), 'tags': c.get('tags', [])}, r['id']
    if r['art']: assert sha((WEB / r['art']).read_bytes()) == r['art_sha256'], r['id'] + ' Motiv'
    if r['ready']:
        ready += 1
        f = WEB / 'assets/cards' / r['output']; assert sha(f.read_bytes()) == r['output_sha256'], r['id'] + ' Ausgabe'
        im = Image.open(f); assert im.size == (1024, 1428) and im.format == 'WEBP', r['id']
        assert r['renderer'] == rd, r['id'] + ' mit altem Renderer'
        if r['type'] == 'Doktrin':
            assert r['provenance'] == 'doctrine_design' and not r['art']
        elif r['type'] == 'Token':
            assert r['provenance'] == 'special_token'
        else:
            assert r['art'] and r['provenance'] in ('existing_art', 'generated_art', 'generated_art_v1')
    else:
        assert r['provenance'] == 'missing_illustration' and r['output'] is None
assert M['new_faces'] == ready and M['missing_illustrations'] == [r['id'] for r in M['records'] if r['provenance'] == 'missing_illustration']
assert M['complete'] == (not M['missing_illustrations'])
js = (WEB / 'js/data/card-faces.js').read_text(); rt = json.loads(re.search(r'DC_CARD_FACES = (\{.*?\});\n', js, re.S).group(1))
assert set(rt) == {r['id'] for r in M['records'] if r['ready']}
miss = json.loads((HERE / 'missing-illustrations.json').read_text()); assert miss['remaining_count'] == len(M['missing_illustrations'])
print(f"PASS graphics alpha40: {len(C)} IDs; {ready} Vorderseiten 1024x1428; {len(M['missing_illustrations'])} ohne Motiv offen; Flächentexte <=120")
