#!/usr/bin/env python3
"""Exhaustive source-to-print/layout/bitmap audit; no browser/OCR claims."""
import json,subprocess,hashlib,sys
from pathlib import Path
from collections import Counter
from PIL import Image
import render as R
D=json.loads(subprocess.check_output(['node',str(R.HERE/'export_catalog.js')],cwd=R.ROOT));M=json.loads((R.HERE/'graphics-manifest.json').read_text());C={c['id']:c for c in D['cards']}
assert len(C)==len(D['cards'])==M['catalog_ids']==1746
assert {r['id'] for r in M['records']}==set(C)
counts=Counter(); fonts=Counter();small=[]
for r in M['records']:
 c=C[r['id']];src,blocks=R.source_blocks(c,D['keywords']);assert blocks==r['printed_blocks'],r['id']+' stale printed copy'
 assert r['source_record_sha256']==R.digest(json.dumps(c,ensure_ascii=False,sort_keys=True).encode()),r['id']+' stale source record'
 assert r['printed_stats']=={'ap':c.get('ap'),'atk':c.get('atk'),'def':c.get('def'),'tags':c.get('tags',[])},r['id']
 assert r['branch_color']==list(R.PAL[R.branch(c)])
 counts[r['provenance']]+=1
 if c['typ']=='Token':continue
 p=R.plan(c,blocks);assert p==r['layout'] and p is not None,r['id']+' layout mismatch'
 assert p['font_px']>=30
 rendered=' '.join(p['lines']);assert R.key(rendered)==R.key(' '.join(blocks)),r['id']+' rule ellipsis/omission'
 for s in src:
  if s['field'].startswith('keyword:'):assert R.key(s['definition']) in R.key(rendered),r['id']+' incomplete keyword reminder'
  elif s['policy']=='verbatim':assert R.key(s['original']) in R.key(rendered),r['id']+' incomplete original text/rule'
 assert p['text_box'][1]+p['text_height']<=p['text_box'][3]
 for line in p['lines']:assert R.D.textlength(line,font=R.font(p['font_px']))<=882
 fonts[p['font_px']]+=1
 if not r['ready']:
  assert r['provenance']=='missing_illustration' and r['output'] is None
  assert r['id'] in M['missing_illustrations'];continue
 file=R.WEB/'assets/cards'/r['output'];assert hashlib.sha256(file.read_bytes()).hexdigest()==r['output_sha256'];im=Image.open(file);assert im.size==(1024,1428) and im.format=='WEBP';im.load()
 if p['art_box'][3]-p['art_box'][1]<300:small.append(r['id'])
N=json.loads((R.HERE/'new-art.json').read_text());assert counts['generated_individual_oil']==len(N);assert counts['special_warning_token_preserved']==1;assert sum(counts.values())==1746
assert M['new_faces']>=1105 and counts['missing_illustration']==len(M['missing_illustrations']);assert M['complete']==(not M['missing_illustrations'])
assert not M['layout_exceptions']
N=json.loads((R.HERE/'new-art.json').read_text());assert len(N)>=10 and len({x['sha256'] for x in N.values()})==len(N)
for x in N.values():assert hashlib.sha256((R.ROOT/x['path']).read_bytes()).hexdigest()==x['sha256']
print('PASS graphics:',M['catalog_ids'],'IDs audited;',M['new_faces'],'current faces, 1 preserved special token,',len(M['missing_illustrations']),'genuinely missing illustrations; no clipping; all keyword reminders present; body fonts',dict(fonts))
print('Dense cards with compact art inset (not reduced rule typography):',','.join(small))
