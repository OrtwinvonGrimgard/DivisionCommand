#!/usr/bin/env python3
"""Publish final file hashes, special-asset inventory and exact next work queue."""
import json,hashlib,subprocess
from pathlib import Path
from PIL import Image
import render as R
p=R.HERE/'graphics-manifest.json';m=json.loads(p.read_text())
for r in m['records']:
 if r['ready']:
  f=R.WEB/'assets/cards'/r['output'];assert f.is_file(),f
  r['output_sha256']=hashlib.sha256(f.read_bytes()).hexdigest()
m['special_assets']=[]
for name in ['thumbs/rueckseite-schwarz.png','thumbs/rueckseite-rot.png']:
 f=R.WEB/'assets/cards'/name
 m['special_assets'].append({'role':'hidden_back_not_a_catalog_card','path':name,'status':'preserved_no_information','dimensions':list(Image.open(f).size),'sha256':hashlib.sha256(f.read_bytes()).hexdigest()})
p.write_text(json.dumps(m,ensure_ascii=False,indent=2)+'\n')
d=json.loads(subprocess.check_output(['node',str(R.HERE/'export_catalog.js')],cwd=R.ROOT));C={c['id']:c for c in d['cards']};missing=[C[i] for i in m['missing_illustrations']]
(R.HERE/'missing-illustrations.json').write_text(json.dumps({'remaining_count':len(missing),'cards':missing},ensure_ascii=False,indent=2)+'\n')
batch=[c for c in missing if c.get('nation')=='Steinmark'][:16]
(R.HERE/'next-batch.json').write_text(json.dumps({'status':'not_generated','purpose':'next individual illustration batch; do not invent cards or rules','style_reference':'Division_Command_0.5a/web/assets/cards/art/A033.jpg','lore':'Division_Command_0.5a/docs/nationen/LORE_NATIONEN.md; Steinmark chapter is required before prompts','cards':batch},ensure_ascii=False,indent=2)+'\n')
print('Finalized:',m['new_faces'],'faces,',len(missing),'missing illustrations;',len(batch),'in next executable batch')
