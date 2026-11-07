#!/usr/bin/env python3
"""Deterministic all-ID graphics inventory and source-synchronized oil-card compositor.
Never changes a rule record. No image generator typography; no clipping or font <30px.
Missing illustration => no output, honest resumable manifest (not a generic filler).
"""
from __future__ import annotations
import argparse,hashlib,json,math,re,subprocess
from pathlib import Path
from functools import lru_cache
from concurrent.futures import ProcessPoolExecutor,as_completed
from PIL import Image,ImageDraw,ImageFont,ImageFilter,ImageOps,ImageEnhance
ROOT=Path(__file__).resolve().parents[2]; WEB=ROOT/'Division_Command_0.5a/web'; HERE=Path(__file__).resolve().parent
W,H=1024,1428; VERSION='gfx1'
PAL={'infanterie':(8,92,48),'artillerie':(148,16,22),'panzer':(18,20,22),'aufklarer':(198,152,28),'support':(128,58,18),'sofort':(120,12,16),'gear':(42,48,28),'doctrine':(95,68,25)}
METAL={'bronze':(173,112,63),'silver':(184,195,203),'gold':(221,182,91)}
INK=(34,30,25); IVORY=(242,230,205)
# Faithful editorial compression of the repeated global convention paragraph only.
# Exact original retained in manifest; no game card or engine definition changed.
COMMON='Zug = Spielerzug. Front: 9 Felder; L/C/R: je 3. Nachbarn direkt links/rechts, kein Überspringen. Status folgt Instanz und endet beim Verlassen. Keine Fähigkeit aus Hand, Ablage oder verdeckt. Ziel/AP vor Zahlung prüfen; ungültig kostenlos. Aufdecken, Tausch und Zusatzangriff setzen Nutzungen nicht zurück. Zielschutz und Eingraben gelten.'
INTERACTIONS={
 'Binden':'Kein Niederhalten: ATK und Angriff bleiben. Sperrt Stellungswechsel, beide Tauschhälften und Gefechtsabbruch. Abschirmung, Sicherung und Fernschuss bleiben aktiv. Die Bindung ist kein Angriff (Staffelangriff/Hinterhalt); Zusatzangriff erneuert sie nicht.',
 'Anmarschstörung':'Kein Flächen-/Einrückschaden. Vorhandene Einheiten bleiben beweglich; Einsatz bleibt gegen Zahlung möglich. Eingraben verhindert den Aufschlag nicht. Heranführung/Ablösung zuerst verrechnen, dann +1 AP. Nur erfolgreicher Einsatz verbraucht die Markierung.',
 'Feuerschutz':'Kein ATK-Bonus oder Umleiten. Die Schutzhandlung ist kein Angriff (Staffelangriff/Hinterhalt). Reduktion vor allgemeinen Minderungen; ohne Gegenschlag nutzlos, im simultanen Modus wirksam. Fernschuss ändert nur die Zielzulässigkeit; Eingraben gilt.',
 'Gefechtsabbruch':'Reaktion im Gegenzug, nicht Stellungswechsel. Kein neuer Einsatz/Verlust: keine Zuteilung, Heranführung oder Ablösung. Binden verhindert den Abbruch; Platztausch/Absetzen ersetzen ihn nicht. Abschirmung verleiht dem nur mitgetroffenen Abschirmer keinen Abbruchtrigger.',
 'Vorpostenmeldung':'Kein DEF-Bonus, Umleiten oder Beobachtet-Marker. Aufdecken darf Platztausch und Hinterhalt vorbereiten; der Tausch löst keine weitere Meldung aus. NO_FACE_DOWN ist stärker und kann den Melder überflüssig machen.'}
def norm(x):return re.sub(r'\s+',' ',str(x or '')).strip()
def key(x):return re.sub(r'[^\w]','',norm(x).casefold())
def digest(x):return hashlib.sha256(x).hexdigest()
@lru_cache(maxsize=None)
def font(size,bold=False,title=False):return ImageFont.truetype(str(HERE/'fonts'/('LiberationSerif-Bold.ttf' if title else 'LiberationSansNarrow-Bold.ttf' if bold else 'LiberationSansNarrow-Regular.ttf')),size)
def branch(c):
 t=c['typ']; mapping={'Unterstützung':'support','Soforteinsatz':'sofort','Ausrüstung':'gear','Doktrin':'doctrine'}
 if t in mapping:return mapping[t]
 keys=[norm(v).casefold().replace('ä','a').replace('ö','o').replace('ü','u') for v in c.get('tags',[])+[c.get('klasse','')]]
 if any(v in keys for v in ['artillerie','morser','moerser']):return 'artillerie'
 if any(v in keys for v in ['aufklarung','aufklarer','spaher','spaeher']):return 'aufklarer'
 if 'panzer' in keys:return 'panzer'
 return 'infanterie'
def source_blocks(c,kw):
 src=[{'field':'text','original':norm(c.get('text'))}]+[{'field':'rules:'+str(i),'original':norm(t)} for i,t in enumerate(c.get('rules',[]))]
 src += [{'field':'keyword:'+k,'original':k+': '+kw[k],'definition':kw[k]} for k in c.get('keywords',[]) if k in kw]
 src=[s for s in src if s['original']]
 for s in src:
  s['printed']=COMMON if s['original'].startswith('Ein Spielzug meint einen vollständigen Spielerzug') else s['original']
  s['policy']='equivalent_common_conventions' if s['printed']==COMMON else 'verbatim'
  if c.get('set')=='set_tactical_review' and s['field']=='rules:1':
   mechanic=next(k for k in c.get('keywords',[]) if k in INTERACTIONS);s['printed']=INTERACTIONS[mechanic];s['policy']='equivalent_interaction_reminder'
 out=[]
 for i,s in enumerate(src):
  target=key(s.get('definition',s['original']))
  candidates=[x for j,x in enumerate(src) if x is not s and not x['field'].startswith('keyword:') and target in key(x['original']) and (len(key(x['original']))>len(target) or j<i)]
  if candidates:s['covered_by']=candidates[0]['field'];continue
  out.append(s)
 # Duplicates always point backward or to a strictly larger source; never erase
 # both text and rules merely because their entire core is identical.
 for s in src:
  seen=set()
  while s.get('covered_by'):
   dest=s['covered_by']
   if dest in seen:raise ValueError('Circular text coverage: '+c['id'])
   seen.add(dest);root=next(x for x in src if x['field']==dest)
   if not root.get('covered_by'):break
   s['covered_by']=root['covered_by']
 return src,[s['printed'] for s in out]

D=ImageDraw.Draw(Image.new('RGB',(10,10)))
def wrap(text,f,width):
 out=[];line=''
 for word in text.split():
  if D.textlength(word,font=f)>width: raise ValueError('Unbreakable text wider than safe box: '+word)
  v=(line+' '+word).strip()
  if line and D.textlength(v,font=f)>width:out.append(line);line=word
  else:line=v
 if line:out.append(line)
 return out

def plan(c,blocks):
 # Body font stays >=30; art shrinks before any reduction in type size.
 bottom=1240 if c['typ']=='Einheit' else 1322
 for size in [36,34,32,30]:
  lines=[]
  for i,b in enumerate(blocks):
   if i:lines.append('')
   lines.extend(wrap(b,font(size),882))
  lineh=round(size*1.17); need=sum(lineh if ln else round(lineh*.32) for ln in lines)+42
  art_h=min(520,bottom-218-need-22)
  if art_h>=200:return {'font_px':size,'line_height':lineh,'lines':lines,'art_box':[48,196,976,196+art_h],'text_box':[48,218+art_h,976,bottom],'text_height':need,'bottom':bottom}
 return None

def stock(c,metal):
 # Source material has no lettering. A subdued oil-metal substrate, never faux artwork.
 p=ROOT/'KartenEditor/assets/textures/metal-gehaemmert.jpg';im=Image.open(p).convert('RGB').resize((W,H),Image.Resampling.LANCZOS)
 im=ImageEnhance.Brightness(im).enhance(.26);d=ImageDraw.Draw(im)
 for inset,col,width in [(8,metal,8),(21,(59,48,35),3),(28,metal,2)]:d.rounded_rectangle((inset,inset,W-1-inset,H-1-inset),radius=27,outline=col,width=width)
 for x,y in [(37,37),(987,37),(37,1391),(987,1391)]:d.ellipse((x-5,y-5,x+5,y+5),fill=metal,outline=(36,28,17),width=1)
 return im

def fit_art(im,box,source):
 x,y,r,b=box;sw,sh=r-x,b-y
 original=Image.open(source).convert('RGB')
 # Preserve the whole illustration, never squash; background is a quiet oil-toned mat.
 mat=ImageOps.fit(original,(sw,sh),method=Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(22))
 mat=ImageEnhance.Brightness(mat).enhance(.45);a=ImageOps.contain(original,(sw,sh),Image.Resampling.LANCZOS)
 mat.paste(a,((sw-a.width)//2,(sh-a.height)//2));im.paste(mat,(x,y))

def render(c,p,art,style,nation):
 rarity=c.get('rarity') or ('gold' if c['typ']=='Doktrin' else 'bronze');metal=METAL[rarity];im=stock(c,metal);d=ImageDraw.Draw(im);col=PAL[branch(c)]
 d.rounded_rectangle((48,45,976,148),radius=8,fill=col,outline=metal,width=2)
 name=c['name']; titlefont=font(45,title=True)
 while D.textlength(name,font=titlefont)>770 and titlefont.size>32:titlefont=font(titlefont.size-1,title=True)
 titlelines=wrap(name,titlefont,770)
 if len(titlelines)>2:raise ValueError('Title exceeds two lines: '+c['id'])
 for i,line in enumerate(titlelines):d.text((180,70+i*43 if len(titlelines)>1 else 86),line,font=titlefont,fill=IVORY,anchor='lm')
 # Existing AP star visual language, exactly typeset source cost; doctrines chosen separately.
 if c['typ']!='Doktrin':
  pts=[]
  for n in range(10):
   angle=-math.pi/2+n*math.pi/5;r=53 if n%2==0 else 26;pts.append((111+r*math.cos(angle),96+r*math.sin(angle)))
  d.polygon(pts,fill=metal,outline=(22,16,10),width=3);d.text((111,96),str(c.get('ap',0)),font=font(48,True),fill=(20,17,12),anchor='mm')
 else:
  for x in [85,111,137]:d.regular_polygon((x,95,11),5,rotation=0,fill=metal)
 fit_art(im,p['art_box'],art)
 d=ImageDraw.Draw(im);d.rectangle(p['art_box'],outline=metal,width=2)
 # Uniform dedicated type/nation line; color does not replace an explicit label.
 subtype=c.get('klasse') or c['typ'];tags=[str(t) for t in c.get('tags',[]) if str(t).casefold() not in [subtype.casefold(),'einheit','doktrin']]
 label=' · '.join([c['typ'],subtype] if subtype!=c['typ'] else [subtype]); label+=' · '+nation
 if tags:label+=' · '+', '.join(tags)
 labelfont=font(23,True)
 while D.textlength(label,font=labelfont)>912 and labelfont.size>17:labelfont=font(labelfont.size-1,True)
 if D.textlength(label,font=labelfont)>912:raise ValueError('Type/tag label too long: '+c['id'])
 d.text((56,172),label,font=labelfont,fill=IVORY,anchor='lm')
 x,y,r,b=p['text_box'];d.rounded_rectangle((x,y,r,b),radius=5,fill=(235,225,205),outline=metal,width=2)
 yy=y+20
 for ln in p['lines']:
  if ln:d.text((x+23,yy),ln,font=font(p['font_px']),fill=INK,anchor='lt');yy+=p['line_height']
  else:yy+=round(p['line_height']*.32)
 if yy>b-12:raise ValueError('Text overflow: '+c['id'])
 flavor=norm(c.get('flavor'))
 if flavor:
  fl=wrap(flavor,font(26),876);fy=b-24-len(fl)*31
  if fy>yy+48:
   d.line((x+24,fy-18,r-24,fy-18),fill=(165,140,98),width=1)
   for line in fl:d.text((x+24,fy),line,font=font(26),fill=(100,79,48),anchor='lt');fy+=31
 if c['typ']=='Einheit':
  for sx,lab,val in [(48,'ATK',c['atk']),(726,'DEF',c['def'])]:
   d.rounded_rectangle((sx,1260,sx+250,1340),radius=5,fill=(24,23,21),outline=metal,width=2)
   d.text((sx+20,1300),lab,font=font(28,True),fill=metal,anchor='lm');d.text((sx+210,1300),str(val),font=font(50,True),fill=IVORY,anchor='rm')
  d.text((512,1296),'GRUNDWERTE',font=font(24,True),fill=IVORY,anchor='mm');d.text((512,1324),'LIVE-WERTE AM TISCH',font=font(18),fill=IVORY,anchor='mm')
 copies=1 if c['typ']=='Doktrin' else {'bronze':4,'silver':2,'gold':1}[rarity]
 raritytext={'bronze':'BRONZE','silver':'SILBER','gold':'GOLD'}[rarity]
 d.line((50,1360,974,1360),fill=metal,width=2)
 d.text((55,1380),'DIVISION COMMAND',font=font(23,True),fill=metal,anchor='lm')
 d.text((970,1380),raritytext+' · '+('SEPARAT' if c['typ']=='Doktrin' else 'MAX. '+str(copies)+'×'),font=font(23,True),fill=IVORY,anchor='rm')
 d.text((512,1407),c['id'],font=font(15),fill=(180,170,150),anchor='mm')
 return im

def render_job(job):
 c,p,art,kind,nation=job
 outdir=WEB/'assets/cards/faces-v1'
 if c['typ']=='Doktrin':
  original=Image.open(art).convert('RGB');aw,ah=original.size
  clean=original.crop((int(aw*.10),int(ah*.40),int(aw*.90),int(ah*.84)))
  special=outdir/(c['id']+'-map-source.png');clean.save(special)
  im=render(c,p,special,kind,nation);special.unlink()
 else:im=render(c,p,art,kind,nation)
 im.save(outdir/(c['id']+'.webp'),format='WEBP',quality=93,method=6,exact=True)
 return c['id']

def main():
 ap=argparse.ArgumentParser();ap.add_argument('--dry-run',action='store_true');ap.add_argument('--only',nargs='*');args=ap.parse_args()
 data=json.loads(subprocess.check_output(['node',str(HERE/'export_catalog.js')],cwd=ROOT));new=json.loads((HERE/'new-art.json').read_text());records=[];runtime={};ready=0;failed=[];jobs=[]
 outdir=WEB/'assets/cards/faces-v1';outdir.mkdir(parents=True,exist_ok=True)
 for c in data['cards']:
  ident=c['id'];legacy=data['legacy_images'][ident];rec=data['art'].get(ident);src,blocks=source_blocks(c,data['keywords']);p=plan(c,blocks)
  art=None;kind='missing_illustration'
  if ident in new:art=ROOT/new[ident]['path'];kind='generated_individual_oil'
  elif rec and rec['kind']=='artwork':art=WEB/rec['src'];kind='existing_verified_illustration'
  elif c['typ']=='Doktrin':
   kind='existing_doctrine_map_design';art=WEB/'assets/cards'/legacy
  elif c['typ']=='Token':kind='special_warning_token_preserved'
  r={'id':ident,'name':c['name'],'type':c['typ'],'nation':c.get('nation') or 'neutral','rarity':c.get('rarity') or ('gold' if c['typ']=='Doktrin' else 'bronze'),'source_record_sha256':digest(json.dumps(c,ensure_ascii=False,sort_keys=True).encode()),'printed_stats':{'ap':c.get('ap'),'atk':c.get('atk'),'def':c.get('def'),'tags':c.get('tags',[])},'branch_color':list(PAL[branch(c)]),'old_image_reference':c.get('image'),'old_resolved_face':legacy,'old_art_status':c.get('art_status'),'legacy_bitmap_text_qa':'not OCR-verified; legacy bitmap is not the authoritative text source','provenance':kind,'source_illustration':str(art.relative_to(ROOT)) if art else None,'text_sources':src,'printed_blocks':blocks,'layout':p,'ready':False,'output':None,'text_qa':'layout_fits' if p else 'requires_editorial_layout_review'}
  if p is None:failed.append(ident)
  if kind=='special_warning_token_preserved':r['ready']=True;r['output']=legacy;r['text_qa']='special non-deck warning marker; original image preserved'
  elif art and p:
   rel='faces-v1/'+ident+'.webp';r['output']=rel;r['ready']=True;r['dimensions']=[W,H]
   nation=c.get('nation') if c.get('nation') not in [None,'','neutral'] else 'Allgemein'
   if not args.dry_run and (not args.only or ident in args.only):jobs.append((c,p,art,kind,nation))
   runtime[ident]={'file':rel,'art':rec if rec and rec['kind']=='artwork' else {'src':str(art.relative_to(WEB)),'kind':'artwork'} if kind=='generated_individual_oil' else None}
   ready+=1
  records.append(r)
  if len(records)%100==0:print('inventory/render',len(records),'/',len(data['cards']),flush=True)
 manifest={'version':VERSION,'baseline':data['baseline'],'catalog_ids':len(records),'new_faces':ready,'preserved_token':1,'missing_illustrations':[r['id'] for r in records if r['provenance']=='missing_illustration'],'layout_exceptions':failed,'complete':not failed and not any(not r['ready'] for r in records),'records':records}
 if jobs:
  with ProcessPoolExecutor(max_workers=4) as pool:
   futures=[pool.submit(render_job,j) for j in jobs]
   for i,f in enumerate(as_completed(futures),1):
    f.result()
    if i%50==0 or i==len(jobs):print('faces completed',i,'/',len(jobs),flush=True)
 target=(ROOT.parent/'t204-graphics/layout-plan.json') if (args.dry_run or args.only) else HERE/'graphics-manifest.json'
 target.parent.mkdir(parents=True,exist_ok=True)
 target.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
 if not args.dry_run and not args.only:
  js='// Generated: ready faces only. No rule fields or unfinished art are changed.\nwindow.DC_CARD_FACES = '+json.dumps(runtime,ensure_ascii=False,sort_keys=True,separators=(',',':'))+';\nwindow.dcCardImage = function(def) { var ready=def && window.DC_CARD_FACES[def.id]; return ready ? ready.file : (def && def.image) || \"\"; };\n'
  (WEB/'js/data/card-faces.js').write_text(js)
 print(json.dumps({k:v for k,v in manifest.items() if k not in ['records','missing_illustrations']},ensure_ascii=False));print('missing illustrations',len(manifest['missing_illustrations']))
if __name__=='__main__':main()
