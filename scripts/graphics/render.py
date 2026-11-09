#!/usr/bin/env python3
"""Vorderseiten-Build (alpha40 / old-alpha): faces-v2/<id>.webp via KartenEditor-Renderer
(40 % Motiv, Schrift 60/62, Elite-Einzug, Bollwerk-Doktrinen). Flächentext = kurz.json;
Volltext bleibt in `text` / docs/regeln/KARTEN_SONDERFAELLE.md.
Aufruf: python3 render.py [--only id,id] [--jobs 4] [--all]"""
from __future__ import annotations
import argparse, hashlib, json, subprocess, sys
from pathlib import Path
from concurrent.futures import ProcessPoolExecutor, as_completed
ROOT = Path(__file__).resolve().parents[2]; WEB = ROOT / 'Division_Command_0.5a/web'; HERE = Path(__file__).resolve().parent
VERSION = 'alpha40'; OUTDIR = 'faces-v2'
TOOLS = ROOT / 'KartenEditor' / 'tools'
def digest(b): return hashlib.sha256(b).hexdigest()
def src_sha(c): return digest(json.dumps(c, ensure_ascii=False, sort_keys=True).encode())
def renderer_digest():
    parts = b''
    for p in (HERE / 'alpha40.py', TOOLS / 'render.py', TOOLS / 'render_core.py'):
        parts += p.read_bytes()
    return digest(parts)
def catalog():
    return json.loads(subprocess.check_output(['node', str(HERE / 'export_catalog.js')], cwd=ROOT))
def art_for(ident, data):
    for sub in ('art-v2', 'art-v1'):
        p = WEB / 'assets/cards' / sub / (ident + '.jpg')
        if p.is_file(): return p, ('generated_art' if sub == 'art-v2' else 'generated_art_v1')
    rec = data['art'].get(ident)
    if rec and rec['kind'] == 'artwork': return WEB / rec['src'], 'existing_art'
    return None, None
def job(c, art, kurz, number):
    sys.path.insert(0, str(HERE))
    import alpha40
    dest = WEB / 'assets/cards' / OUTDIR / (c['id'] + '.webp')
    art_s = str(art) if art else None
    lay = alpha40.render(c, art_s, kurz, str(dest), number=number)
    return c['id'], lay
def main():
    ap = argparse.ArgumentParser(); ap.add_argument('--only'); ap.add_argument('--jobs', type=int, default=4); ap.add_argument('--all', action='store_true'); a = ap.parse_args()
    data = catalog(); K = json.loads((ROOT / 'scripts/cards-review/kurz.json').read_text())
    mp = HERE / 'graphics-manifest.json'
    old = {r['id']: r for r in json.loads(mp.read_text()).get('records', [])} if mp.is_file() and json.loads(mp.read_text()).get('version') == VERSION else {}
    only = set(a.only.split(',')) if a.only else None
    rd = renderer_digest()
    recs, todo = [], []
    for n, c in enumerate(data['cards'], 1):
        i = c['id']; art, prov = art_for(i, data)
        if c['typ'] == 'Doktrin': art, prov = None, 'doctrine_design'
        if c['typ'] == 'Token':
            # Token: try special render; use existing image path as art hint
            tok = WEB / 'assets/cards' / (c.get('image') or 'tokens/MINE.png')
            art = tok if tok.is_file() else None
            prov = 'special_token'
        r = {'id': i, 'name': c['name'], 'type': c['typ'], 'nation': c.get('nation') or 'neutral', 'rarity': c.get('rarity'),
             'source_record_sha256': src_sha(c), 'kurz': K.get(i, {}).get('kurz', ''), 'keywords': c.get('keywords') or [],
             'printed_stats': {'ap': c.get('ap'), 'atk': c.get('atk'), 'def': c.get('def'), 'tags': c.get('tags', [])},
             'art': str(art.relative_to(WEB)) if art else None, 'art_sha256': digest(art.read_bytes()) if art else None,
             'provenance': prov or 'missing_illustration', 'ready': False, 'output': None}
        ready_prov = ('existing_art', 'generated_art', 'generated_art_v1', 'doctrine_design', 'special_token')
        if prov in ready_prov and (prov != 'special_token' or art):
            # Token always attempted; others need art except doctrine
            if prov == 'special_token' or prov == 'doctrine_design' or art:
                r['ready'] = True; r['output'] = OUTDIR + '/' + i + '.webp'
                o = old.get(i); dest = WEB / 'assets/cards' / r['output']
                fresh = o and dest.is_file() and o.get('source_record_sha256') == r['source_record_sha256'] and o.get('kurz') == r['kurz'] and o.get('art_sha256') == r['art_sha256'] and o.get('renderer') == rd
                if only: 
                    if i in only: todo.append((c, art, r['kurz'], str(n).zfill(3)))
                elif a.all or not fresh: todo.append((c, art, r['kurz'], str(n).zfill(3)))
                elif o: r['layout'] = o.get('layout'); r['renderer'] = o.get('renderer')
        recs.append(r)
    print('render', len(todo), 'faces (alpha40)')
    lay = {}
    failed = []
    with ProcessPoolExecutor(a.jobs) as ex:
        futs = {ex.submit(job, *t): t[0]['id'] for t in todo}
        for f in as_completed(futs):
            try:
                i, l = f.result(); lay[i] = l
            except Exception as e:
                failed.append((futs[f], str(e))); print('FAIL', futs[f], e)
    for r in recs:
        if r['id'] in lay: r['layout'] = lay[r['id']]; r['renderer'] = rd
        if r['ready']:
            dest = WEB / 'assets/cards' / r['output']
            if dest.is_file():
                r['output_sha256'] = digest(dest.read_bytes())
            else:
                r['ready'] = False; r['output'] = None; r['provenance'] = 'render_failed'
    missing = [r['id'] for r in recs if r['provenance'] == 'missing_illustration']
    m = {'version': VERSION, 'catalog_ids': len(recs), 'new_faces': sum(1 for r in recs if r['ready']), 'missing_illustrations': missing,
         'complete': not missing, 'failed': failed, 'records': recs}
    mp.write_text(json.dumps(m, ensure_ascii=False, indent=1) + '\n')
    def face_art(r):
        if not r.get('art'): return None
        # Token behält table-art-Semantik (kind rendered); übrige Motivquellen sind artwork
        kind = 'rendered' if r['provenance'] == 'special_token' else 'artwork'
        return {'kind': kind, 'src': r['art']}
    runtime = {r['id']: {'file': r['output'], 'art': face_art(r)} for r in recs if r['ready']}
    (WEB / 'js/data/card-faces.js').write_text('// Generated by scripts/graphics/render.py (alpha40): ready faces only. Rule records unchanged.\nwindow.DC_CARD_FACES = ' + json.dumps(runtime, ensure_ascii=False, separators=(',', ':')) + ';\nwindow.dcCardImage = function(def) { var ready=def && window.DC_CARD_FACES[def.id]; return ready ? ready.file : (def && def.image) || ""; };\n')
    C = {c['id']: c for c in data['cards']}
    cards = [{k: C[i].get(k) for k in ('id', 'name', 'typ', 'nation', 'rarity', 'klasse', 'tags', 'ap', 'atk', 'def', 'text', 'flavor')} for i in missing]
    (HERE / 'missing-illustrations.json').write_text(json.dumps({'remaining_count': len(missing), 'done_generated': sum(1 for r in recs if r['provenance'] == 'generated_art'), 'cards': cards}, ensure_ascii=False, indent=1) + '\n')
    print('faces', m['new_faces'], 'missing', len(missing), 'failed', len(failed))
    if failed: sys.exit(1)
if __name__ == '__main__': main()
