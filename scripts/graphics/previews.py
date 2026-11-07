#!/usr/bin/env python3
from pathlib import Path
import json,math
from PIL import Image,ImageDraw
import render as R
M=json.loads((R.HERE/'graphics-manifest.json').read_text());out=Path('/workspace/t204-graphics');out.mkdir(exist_ok=True)
def sheet(records,name,cols=4,w=320):
 h=round(w*1428/1024);canvas=Image.new('RGB',(cols*w,math.ceil(len(records)/cols)*(h+38)),(29,28,25));d=ImageDraw.Draw(canvas)
 for i,r in enumerate(records):
  im=Image.open(R.WEB/'assets/cards'/r['output']).convert('RGB').resize((w,h),Image.Resampling.LANCZOS);x=(i%cols)*w;y=(i//cols)*(h+38);canvas.paste(im,(x,y));d.text((x+4,y+h+7),r['name'][:42],font=R.font(17),fill=(240,230,205))
 canvas.save(out/name,quality=94)
ready=[r for r in M['records'] if r['ready'] and r['type']!='Token']
sheet([r for r in ready if r['provenance']=='generated_individual_oil'],'tactical-contact.jpg',cols=5,w=400)
chosen=[]
for k in ['Infanterie','Panzer','Artillerie','Aufklärung','Elite','Unterstützung','Soforteinsatz','Ausrüstung','Doktrin']:
 for r in ready:
  if r not in chosen and ((k in r['printed_stats']['tags']) or r['type']==k or k.casefold().replace('ä','ae') in [x.casefold().replace('ä','ae') for x in r['printed_stats']['tags']]):chosen.append(r);break
chosen.extend([r for r in ready if r['id'] in ['dc_b_notdepot_643','dc_b_filterpatrone_410','dc_tac_taktische_verkehrsleitstelle']])
sheet(chosen,'types-and-corrections.jpg',cols=4,w=400)
# Complete thumbnail contact book, 24 cards/page, for resumable visual inspection.
book=out/'contact-book';book.mkdir(exist_ok=True)
for start in range(0,len(ready),24):sheet(ready[start:start+24],str(Path('contact-book')/('page-%03d.jpg'%(start//24+1))),cols=6,w=190)
print('Previews:',out,'full-face count',len(ready))
