"""Reproducible synthetic experiments accompanying the core AI articles.
Run: python core_ai.py [--output PATH]. Requires numpy and matplotlib.
These are small teaching experiments, not model-training benchmarks.
"""
import argparse, itertools, json
from pathlib import Path
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

HERE=Path(__file__).resolve().parent

def gabor(x, theta):
    z=theta[0]+.06*theta[1]*x
    return np.sin(z)*np.exp(-z*z/32)

def gabor_loss_grad(x,y,theta):
    z=theta[0]+.06*theta[1]*x
    residual=gabor(x,theta)-y
    derivative=np.exp(-z*z/32)*(np.cos(z)-z*np.sin(z)/16)
    return np.mean(residual**2),2*np.array([np.mean(residual*derivative),np.mean(residual*derivative*.06*x)])

def descent(x,y,start,lr=.5,steps=2000):
    theta=np.array(start,dtype=float);history=[theta.copy()]
    for _ in range(steps):
        _,grad=gabor_loss_grad(x,y,theta);theta-=lr*grad;history.append(theta.copy())
    return np.array(history)

def quadratic(lr,steps=120,momentum=0):
    x=np.array([-4.,2.]);v=np.zeros(2);history=[x.copy()]
    for _ in range(steps):
        v=momentum*v+np.array([1.,20.])*x
        x-=lr*v;history.append(x.copy())
    return np.array(history)

def qloss(x): return .5*(x[...,0]**2+20*x[...,1]**2)

def save(fig,name,output):
    fig.savefig(output/(name+'.png'),dpi=150);plt.close(fig)

def main(output):
    output.mkdir(parents=True,exist_ok=True)
    plt.rcParams.update({'font.family':'DejaVu Sans','font.size':11,'axes.spines.top':False,
      'axes.spines.right':False,'axes.grid':True,'grid.alpha':.15,'figure.facecolor':'#faf9f5',
      'axes.facecolor':'#faf9f5','savefig.facecolor':'#faf9f5','figure.constrained_layout.use':True})
    result={'seed':3107,'scope':'Synthetic teaching experiments; no claim about production model performance'}
    rng=np.random.default_rng(3107)
    x=np.linspace(-15,15,48);truth=np.array([.8,16.]);y=gabor(x,truth)+rng.normal(0,.08,len(x))
    theta=np.array([1.1,13.]);_,analytic=gabor_loss_grad(x,y,theta)
    numeric=np.array([(gabor_loss_grad(x,y,theta+np.eye(2)[i]*1e-5)[0]-gabor_loss_grad(x,y,theta-np.eye(2)[i]*1e-5)[0])/(2e-5) for i in range(2)])
    assert np.allclose(analytic,numeric,rtol=1e-5,atol=1e-7)
    starts=[[-5.,5.],[4.,24.],[.2,13.]]
    histories=[descent(x,y,s) for s in starts]
    result['gabor']={'gradient_max_error':float(np.max(np.abs(analytic-numeric))),'runs':[{'start':s,'end':h[-1].tolist(),'mse':float(gabor_loss_grad(x,y,h[-1])[0])} for s,h in zip(starts,histories)]}
    colors=['#3369a8','#be7f36','#4b9386']
    fig,ax=plt.subplots(1,2,figsize=(12,6))
    ax[0].scatter(x,y,s=15,color='#555555',label='48 noisy observations')
    dense=np.linspace(-15,15,500)
    for j,h in enumerate(histories):ax[0].plot(dense,gabor(dense,h[-1]),color=colors[j],label=f'Initialization {j+1}')
    ax[0].set(xlabel='x',ylabel='Predicted y',title='Same model, different fitted curves');ax[0].legend(fontsize=9)
    p0=np.linspace(-7,7,150);p1=np.linspace(2,29,150)
    grid=np.array([[gabor_loss_grad(x,y,[a,b])[0] for a in p0] for b in p1])
    ax[1].contour(p0,p1,grid,levels=22,cmap='Greys',linewidths=.6)
    for j,h in enumerate(histories):
        ax[1].plot(h[:,0],h[:,1],color=colors[j],linewidth=2);ax[1].scatter(*h[0],color=colors[j],marker='x');ax[1].scatter(*h[-1],color=colors[j],s=25)
    ax[1].set(xlabel='Phase parameter',ylabel='Frequency parameter',title='Gradient descent follows local geometry')
    fig.suptitle('Fitting a two-parameter Gabor model',fontsize=16,fontweight='bold');save(fig,'gabor-landscape',output)
    fig,ax=plt.subplots(figsize=(11,6))
    for lr,c in zip([.04,.095,.105],colors):ax.semilogy(qloss(quadratic(lr)),label=f'Learning rate {lr}',color=c)
    ax.set(xlabel='Update',ylabel='Quadratic loss (log scale)',title='A step size is stable only relative to curvature');ax.legend();save(fig,'gradient-descent-stability',output)
    gradients=np.array([-4.,-1.,0.,2.,3.,6.,7.,11.]);N=len(gradients)
    batches=[1,2,4,8];variances=[]
    for b in batches:
        means=np.array([np.mean(gradients[list(ix)]) for ix in itertools.combinations(range(N),b)])
        expected=(N-b)/(b*(N-1))*gradients.var()
        assert np.isclose(means.mean(),gradients.mean()) and np.isclose(means.var(),expected)
        variances.append(float(means.var()))
    result['sgd']={'population_gradient_mean':float(gradients.mean()),'population_gradient_variance':float(gradients.var()),'batch_sizes':batches,'exact_batch_mean_variance':variances}
    fig,ax=plt.subplots(figsize=(11,6));ax.bar([str(b) for b in batches],variances,color='#4b9386')
    ax.set(xlabel='Batch size, sampled without replacement from N = 8',ylabel='Variance of the batch-mean gradient',title='Exact enumeration: the gradient mean stays fixed; its variance changes');save(fig,'sgd-variance',output)
    fig,ax=plt.subplots(1,2,figsize=(12,6))
    for beta,c in [(0,'#be7f36'),(.9,'#3369a8')]:
        h=quadratic(.04,momentum=beta)
        ax[0].plot(h[:,0],h[:,1],color=c,label=f'Momentum {beta}')
        ax[1].semilogy(qloss(h),color=c,label=f'Momentum {beta}')
    ax[0].set(xlabel='Shallow direction',ylabel='Steep direction',title='History changes the path');ax[1].set(xlabel='Update',ylabel='Loss (log scale)',title='Momentum can overshoot before settling');ax[1].legend();save(fig,'momentum-dynamics',output)
    m=v=0.;raw=[];corrected=[]
    for t in range(1,81):
        m=.9*m+.1;v=.999*v+.001
        raw.append(m/(np.sqrt(v)+1e-8));corrected.append((m/(1-.9**t))/(np.sqrt(v/(1-.999**t))+1e-8))
    assert np.isclose(raw[0],np.sqrt(10),rtol=1e-5) and np.allclose(corrected,1.,atol=1e-7)
    result['adam']={'first_uncorrected_step_over_lr':raw[0],'first_corrected_step_over_lr':corrected[0]}
    fig,ax=plt.subplots(figsize=(11,6));ax.plot(range(1,81),raw,color='#be7f36',label='Without moment bias correction');ax.plot(range(1,81),corrected,color='#3369a8',label='With moment bias correction')
    ax.set(xlabel='Update with constant gradient g = 1',ylabel='Update magnitude / learning rate',title='Biased moments do not imply an underestimated step');ax.legend();save(fig,'adam-bias-correction',output)
    rng=np.random.default_rng(3108);base=rng.normal(size=(512,256));moments={}
    fig,ax=plt.subplots(figsize=(11,6))
    for std,label,c in [(.01,'Fixed standard deviation 0.01','#be7f36'),(1/16,'Variance 1 / fan-in','#96568a'),(np.sqrt(2/256),'He: variance 2 / fan-in','#3369a8')]:
        h=base.copy();values=[float(np.mean(h*h))]
        generator=np.random.default_rng(3109)
        for layer in range(40):
            W=generator.normal(size=(256,256))*std
            h=np.maximum(h@W,0);values.append(float(np.mean(h*h)))
        moments[label]=values;ax.semilogy(values,label=label,color=c)
    result['he']={k:{'input_second_moment':v[0],'layer40_second_moment':v[-1]} for k,v in moments.items()}
    ax.set(xlabel='Layer',ylabel='Mean squared activation (log scale)',title='Initialization controls signal scale before the first update');ax.legend();save(fig,'he-signal-propagation',output)
    values=np.array([-2.,1.,4.]);prob=np.array([.2,.5,.3]);mean=values@prob;second=values**2@prob
    assert np.isclose(mean,1.3) and np.isclose(second,6.1)
    result['expectation']={'mean':float(mean),'second_moment':float(second),'variance':float(second-mean**2),'micro_example':.9*.9+.1*.3,'macro_example':(.9+.3)/2}
    fig,ax=plt.subplots(1,2,figsize=(12,6));ax[0].bar(values,prob,color='#4b9386',width=.8);ax[0].axvline(mean,color='#be7f36',label=f'E[X] = {mean:.1f}');ax[0].set(xlabel='Outcome x',ylabel='Probability',title='An expectation belongs to a distribution');ax[0].legend()
    ax[1].bar(['E[X²]','E[X]²','Var(X)'],[second,mean**2,second-mean**2],color=['#3369a8','#be7f36','#4b9386']);ax[1].set(ylabel='Value',title='Squaring and averaging do not commute');save(fig,'expectation-moments',output)
    rng=np.random.default_rng(3110);degrees=[1,3,5,9];grid=np.linspace(-.9,.9,181);truth=np.sin(np.pi*grid);pred={d:[] for d in degrees};sigma=.15
    for repeat in range(400):
        tx=rng.uniform(-1,1,32);ty=np.sin(np.pi*tx)+rng.normal(0,sigma,len(tx))
        for degree in degrees:
            X=np.polynomial.legendre.legvander(tx,degree);coef=np.linalg.lstsq(X,ty,rcond=None)[0]
            pred[degree].append(np.polynomial.legendre.legvander(grid,degree)@coef)
    stats=[]
    for degree in degrees:
        p=np.array(pred[degree]);bias=float(np.mean((p.mean(0)-truth)**2));var=float(p.var(0).mean());noise=sigma**2
        assert np.isclose(np.mean((p-truth)**2),bias+var,rtol=1e-8)
        stats.append({'degree':degree,'squared_bias':bias,'variance':var,'noise':noise,'estimated_test_mse':bias+var+noise})
    result['bias_variance']={'repeated_datasets':400,'training_rows':32,'noise_std':sigma,'evaluation_interval':[-.9,.9],'statistics':stats}
    fig,ax=plt.subplots(1,2,figsize=(12,6))
    p=np.array(pred[9]);ax[0].plot(grid,p[:12].T,color='#3369a8',alpha=.12);ax[0].plot(grid,truth,color='#222222',label='True function');ax[0].plot(grid,p.mean(0),color='#be7f36',label='Mean fitted predictor');ax[0].set(ylim=(-1.8,1.8),xlabel='x',ylabel='Prediction',title='Degree 9: fit changes with the training set');ax[0].legend(fontsize=9)
    for key,c in [('squared_bias','#be7f36'),('variance','#3369a8'),('estimated_test_mse','#4b9386')]:ax[1].semilogy(degrees,[s[key] for s in stats],'-o',label=key.replace('_',' '),color=c)
    ax[1].axhline(sigma**2,color='#777777',linestyle='--',label='Noise');ax[1].set(xlabel='Polynomial degree',ylabel='Squared error (log scale)',title='A decomposition, not a universal U-shaped law');ax[1].legend(fontsize=9)
    save(fig,'bias-variance-noise',output)
    (HERE/'results.json').write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result,indent=2))

if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('--output',type=Path,default=HERE.parents[1]/'images/articles/technical')
    main(ap.parse_args().output)
