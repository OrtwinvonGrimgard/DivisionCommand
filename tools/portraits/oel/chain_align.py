import os, sys, json; sys.path.insert(0,'/workspace/dc-t325/tools/portraits/oel')
from oelkit import *
REF=''+os.path.join(os.path.dirname(os.path.abspath(__file__)),'chain_raw_rothain_m1','01_faehnrich.jpg')+''
def lm_of(p):
    rgb=load(p); return landmarks(rgb.astype(np.uint8)), rgb
def align(src, dst, ref_lm):
    lm, rgb = lm_of(src)
    if lm is None: print('NO FACE', src); return None
    def feat(l):
        mid=(l['eL']+l['eR'])/2; return mid, l['chin'], np.arctan2(*(l['eR']-l['eL'])[::-1])
    m0,c0,a0=feat(ref_lm); m1,c1,a1=feat(lm)
    ec0=np.linalg.norm(c0-m0); ec1=np.linalg.norm(c1-m1)
    s=ec0/ec1; ang=a0-a1
    ca,sa=np.cos(ang)*s,np.sin(ang)*s
    A=np.array([[ca,-sa,0],[sa,ca,0]],np.float32)
    A[:,2]=m0-A[:,:2]@m1
    out=cv2.warpAffine(rgb.astype(np.float32),A,(rgb.shape[1],rgb.shape[0]),flags=cv2.INTER_CUBIC,borderMode=cv2.BORDER_REPLICATE)
    Image.fromarray(np.clip(out,0,255).astype(np.uint8)).save(dst,quality=95)
    return dict(scale=float(s),roll_deg=float(np.degrees(ang)),eyes=[lm['eL'].tolist(),lm['eR'].tolist()],chin=lm['chin'].tolist())
if __name__=='__main__':
    ref_lm,_=lm_of(REF)
    print('REF eyes',ref_lm['eL'].round(),ref_lm['eR'].round(),'chin',ref_lm['chin'].round(), 'eye-chin', np.linalg.norm(ref_lm['chin']-(ref_lm['eL']+ref_lm['eR'])/2).round())
    for src in sys.argv[1:]:
        dst=src.replace('/raw/','/aligned/')
        print(src.split('/')[-1], align(src,dst,ref_lm))
