import sys, os; sys.path.insert(0,'/workspace/dc-t325/tools/portraits/oel')
from oelkit import *
def lm_of(p):
    rgb=load(p); return landmarks(rgb.astype(np.uint8)), rgb
def feat(l):
    mid=(l['eL']+l['eR'])/2; return mid, l['chin'], np.arctan2(*(l['eR']-l['eL'])[::-1])
def align(src,dst,ref_lm):
    lm,rgb=lm_of(src)
    if lm is None: print('NO FACE',src); return
    m0,c0,a0=feat(ref_lm); m1,c1,a1=feat(lm)
    s=np.linalg.norm(c0-m0)/np.linalg.norm(c1-m1); ang=a0-a1
    ca,sa=np.cos(ang)*s,np.sin(ang)*s
    A=np.array([[ca,-sa,0],[sa,ca,0]],np.float32); A[:,2]=m0-A[:,:2]@m1
    out=cv2.warpAffine(rgb.astype(np.float32),A,(rgb.shape[1],rgb.shape[0]),flags=cv2.INTER_LANCZOS4,borderMode=cv2.BORDER_REPLICATE)
    Image.fromarray(np.clip(out,0,255).astype(np.uint8)).save(dst,quality=96,subsampling=0)
    print(os.path.basename(src),'scale %.3f roll %.2f shift %s'%(s,np.degrees(ang),(m0-m1).round(0)))
if __name__=='__main__':
    d=sys.argv[1]  # chain dir with raw/ aligned/ ; first arg
    ref=[f for f in sorted(os.listdir(d+'/raw')) if f.startswith('01_')][0]
    ref_lm,_=lm_of(d+'/raw/'+ref)
    for f in sys.argv[2:]:
        align(d+'/raw/'+f, d+'/aligned/'+f, ref_lm)
