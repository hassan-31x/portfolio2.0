"""Reproduce the blog figures from derived metrics; no dataset text or media required.
Requires numpy and matplotlib. Run: python analyze.py [--output PATH]
"""
import argparse, csv, json
from pathlib import Path
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

HERE = Path(__file__).resolve().parent
TRACKS = ['en', 'msa', 'arz', 'ajp']
MODELS = ['qwen3_5_9b', 'qwen3_5_4b', 'gemma_4_12b', 'culturalpangea_7b']
LABELS = ['Qwen 3.5 9B', 'Qwen 3.5 4B', 'Gemma 4 12B', 'CulturalPangea 7B']
COLORS = ['#3369a8', '#4b9386', '#c88b36', '#96568a']

def rows(name):
    return list(csv.DictReader((HERE / name).open()))

def style():
    plt.rcParams.update({'font.family':'DejaVu Sans', 'font.size':11, 'axes.spines.top':False,
      'axes.spines.right':False,'axes.labelcolor':'#333333','text.color':'#222222',
      'figure.facecolor':'#faf9f5','axes.facecolor':'#faf9f5','savefig.facecolor':'#faf9f5',
      'axes.grid':True,'grid.alpha':0.16,'figure.constrained_layout.use':True})

def main(output):
    output.mkdir(parents=True, exist_ok=True)
    style()
    records=rows('mmcqa-development-scores.csv')
    by={(r['system'],r['track'],r['id']):r for r in records}
    ids=sorted({r['id'] for r in records if r['system'] in MODELS})
    assert len(ids)==100
    # Shape: image group x language x candidate. The image ID is the resampling unit.
    scores=np.array([[[float(by[m,t,i]['mm_f1']) for m in MODELS] for t in TRACKS] for i in ids])
    old=np.array([[[float(by[m,t,i]['mbert_f1']) for m in MODELS] for t in TRACKS] for i in ids])
    assert scores.shape==(100,4,4)
    assert np.isfinite(scores).all()
    rng=np.random.default_rng(3107)
    permutation=rng.permutation(len(ids))
    selected=np.zeros((len(ids),len(TRACKS)))
    for test in np.array_split(permutation,5):
        train=np.setdiff1d(np.arange(len(ids)),test)
        best=scores[train].mean(axis=0).argmax(axis=1)
        selected[test]=scores[test][:,np.arange(4),best]
    oracle=scores.max(axis=2)
    best_single=MODELS.index('culturalpangea_7b')
    draw=rng.integers(0,len(ids),(5000,len(ids)))
    paired_delta=selected-scores[:,:,best_single]
    result={
      'scope':'100 shared development images, four parallel language tracks; exploratory re-analysis, not held-out test results',
      'seed':3107,'folds':5,'bootstrap_draws':5000,'resampling_unit':'image id, preserving all four languages',
      'models':{m:{'mbert_macro':float(old[:,:,j].mean()),'official_macro':float(scores[:,:,j].mean()),'track_f1':{t:float(scores[:,k,j].mean()) for k,t in enumerate(TRACKS)}} for j,m in enumerate(MODELS)},
      'cv_per_track_selection_macro':float(selected.mean()),
      'cv_delta_vs_pangea':float(paired_delta.mean()),
      'cv_delta_group_bootstrap_ci95':np.percentile(paired_delta[draw].mean(axis=(1,2)),[2.5,97.5]).tolist(),
      'oracle_upper_bound_macro':float(oracle.mean()),
    }
    (HERE/'analysis.json').write_text(json.dumps(result,indent=2)+'\n')
    fig,ax=plt.subplots(1,2,figsize=(12,5.8))
    x=np.arange(4);width=.34
    ax[0].bar(x-width/2,old.mean((0,1)),width,label='Initial mBERT scorer',color='#c4cbd0')
    ax[0].bar(x+width/2,scores.mean((0,1)),width,label='Official mmBERT scorer',color=COLORS)
    ax[0].set_xticks(x,['Qwen 9B','Qwen 4B','Gemma 12B','Pangea 7B'],rotation=18)
    ax[0].set(ylim=(.65,.78),ylabel='Macro BERTScore F1',title='The scorer changes the ranking')
    ax[0].legend(fontsize=9)
    values=[scores[:,:,best_single].mean(),selected.mean(),oracle.mean()]
    ax[1].bar(['Pangea\nsingle model','Track selector\n5-fold grouped CV','Gold oracle\nnot deployable'],values,color=['#96568a','#3369a8','#c4cbd0'])
    for j,v in enumerate(values):ax[1].text(j,v+.002,f'{v:.4f}',ha='center')
    ax[1].set(ylim=(.65,max(values)+.025),ylabel='Official macro F1',title='Selection headroom is not a measured gain')
    fig.suptitle('MMCultureQA: 100 image IDs × 4 languages',fontsize=16,fontweight='bold')
    fig.savefig(output/'mmcqa-analysis.png',dpi=150);plt.close(fig)
    validation=rows('urdu-validation.csv'); diagnostic=rows('urdu-checkpoints.csv')
    evidence=json.loads((HERE/'evidence.json').read_text())
    fig,ax=plt.subplots(1,2,figsize=(12,5.8))
    ax[0].plot([int(r['step']) for r in validation],[float(r['eval_loss']) for r in validation],color='#3369a8',label='Periodic evaluation: up to 256 clips')
    ax[0].scatter([2014],[evidence['urdu']['full_validation_loss']],color='#c88b36',s=65,label='Final evaluation: 1,965 clips')
    ax[0].set(xlabel='Optimizer step',ylabel='Cross entropy, nats/token',title='Held-out token prediction improves');ax[0].legend(fontsize=9)
    steps=[int(r['step']) for r in diagnostic]
    ax[1].plot(steps,[float(r['urdu_prefix_CER'])*100 for r in diagnostic],'-o',color='#4b9386',label='Truncation-aware CER')
    ax[1].plot(steps,[float(r['urdu_CER'])*100 for r in diagnostic],'--',color='#c88b36',label='Full-prompt CER')
    ax[1].set(xlabel='Optimizer step',ylabel='Character error rate (%)',title='2 Urdu prompts, 1 sample per checkpoint')
    ax[1].legend(fontsize=9)
    fig.suptitle('Urdu adaptation: loss and speech are different checks',fontsize=16,fontweight='bold')
    fig.savefig(output/'urdu-training.png',dpi=150);plt.close(fig)
    print(json.dumps(result,indent=2))

if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--output',type=Path,default=HERE.parents[1]/'images/articles/technical')
    main(ap.parse_args().output)
