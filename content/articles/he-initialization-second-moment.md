# Why Initialization Matters: Random Weights, Zero Biases, and the Right Scale

Before the first optimizer step, initialization has already shaped the learning problem. It determines whether units begin with distinct roles, whether signals survive through depth, and whether the first gradients have useful magnitudes. A good optimizer cannot reliably compensate for a network whose units remain identical or whose signal has almost vanished.

My GPT-2 implementation uses normal initialization and a depth-dependent scale for residual projections. To understand why a particular standard deviation matters, I start with a simpler plain ReLU network, where the forward signal calculation can be derived directly.

## Why not initialize every weight to the same value?

Consider two hidden neurons with identical incoming weights, biases, activation functions, and identical outgoing connections. They produce identical activations. Backpropagation gives them identical gradients, so a deterministic optimizer updates them identically. Training preserves the symmetry rather than discovering two different features.

Setting every weight to zero is an especially restrictive version of this. In a multilayer ReLU network, zero activations and the usual zero derivative at the origin can prevent useful gradients from reaching earlier layers. Small equal constants do not solve the symmetry problem either.

Randomizing the weight matrix gives hidden units different initial projections of the input. The purpose is to break that parameter symmetry, not to encode useful semantic features in random numbers. These statements concern ordinary hidden-layer initialization; specialized zero-initialized output or residual branches can be intentional architectural choices.

## Why biases can usually start at zero

A bias is an additive offset. Once the incoming weight vectors differ, equal zero biases do not make the neurons identical. For a linear layer, the gradient with respect to its bias is the upstream error signal, summed or averaged according to the loss. A zero bias can therefore receive a nonzero update.

Zero is a useful neutral starting offset. Large positive biases could activate almost every ReLU; large negative ones could silence many units. Neither is a universal improvement. Some architectures or imbalanced classification heads use informed nonzero biases, but the ordinary random-weights, zero-biases combination is consistent.

## Zero mean helps; zero scale does not

A zero-mean random weight distribution avoids building a shared positive or negative offset into every projection. It does not mean every finite matrix has an exactly zero empirical mean, or that learned weights must remain centered at zero.

The standard deviation controls signal scale. A tiny standard deviation can shrink activations and gradients repeatedly through depth. An excessively large one can amplify signals, destabilize early updates, or saturate nonlinearities that have bounded outputs. The appropriate scale depends on fan-in, activation, and architecture.

For n inputs with equal second moments, zero biases, and independent zero-mean weights of variance s² independent of the activations:

```math
z=\sum_{i=1}^{n}w_i a_i,\qquad \mathbb{E}[z^2]=n s^2\mathbb{E}[a^2].
```

The zero-mean weights remove cross terms in expectation over initialization. This is an ensemble argument, not a promise that every finite layer has exactly the predicted scale.

## Derive the ReLU scale

If the preactivation distribution is symmetric about zero, its positive half contributes half of its squared magnitude:

```math
\mathbb{E}[\operatorname{ReLU}(z)^2]=\frac{1}{2}\mathbb{E}[z^2].
```

Combining the equations, preserving activation second moments suggests n s²/2 = 1. For normally distributed weights, He initialization is therefore:

```math
w_{ij}\sim\mathcal N\!\left(0,\frac{2}{n}\right),\qquad \operatorname{std}(w_{ij})=\sqrt{\frac{2}{n}},\qquad b_j=0.
```

The variance is 2/n; the standard deviation is its square root. Mixing them up produces a very different network. At fan-in 256, the standard deviation is approximately 0.0884, not 0.0078125.

ReLU output also has a positive mean. For Gaussian preactivations with variance q, its centered variance is q(1/2 − 1/(2π)), rather than q/2. The preservation calculation concerns the uncentered second moment. Calling every scale statistic “variance” hides that difference.

## Watch the signal across forty layers

I propagated 512 random inputs through 40 untrained width-256 ReLU layers. All biases are zero. Each scaling uses the same underlying standard-normal weight draws, so the comparison changes scale without changing their random directions.

| Initialization | Activation second moment at layer 40 |
| --- | --- |
| Normal standard deviation 0.01 | 2.31 × 10⁻⁷⁶ |
| Weight variance 1/fan-in | 1.08 × 10⁻¹² |
| Weight variance 2/fan-in | 1.19 |

![Signal propagation under three initialization scales](/images/articles/technical/he-signal-propagation.png "Input second moment is approximately one. He scaling preserves its order of magnitude in this plain ReLU experiment; finite-width fluctuations remain.")

```python
weights = rng.normal(size=(fan_in, fan_out))
weights *= np.sqrt(2.0 / fan_in)
bias = np.zeros(fan_out)
activations = np.maximum(activations @ weights + bias, 0.0)
```

This measures forward signal scale, not accuracy or guaranteed trainability. Backward signal propagation adds fan-out considerations, and well-scaled moments alone do not guarantee well-conditioned Jacobians.

## Match the rule to the model

For a leaky ReLU with negative slope a, the analogous variance is 2/((1 + a²)n). GELU, residual additions, attention, and normalization alter the calculation. That is why I do not replace GPT-2's initialization with a ReLU rule, or reinitialize the pretrained Orpheus backbone during [Urdu adaptation](/blogs/urdu-tts-adaptation).

Initialization chooses the starting geometry; [SGD](/blogs/stochastic-gradient-noise), [momentum](/blogs/momentum-as-gradient-filter), and [Adam](/blogs/adam-moments-bias-correction) determine how parameters move afterward. The [Gabor experiment](/blogs/gabor-loss-landscape) gives a small example where changing only the starting point changes the final fit.

The primary derivation is [He et al., Delving Deep into Rectifiers](https://arxiv.org/abs/1502.01852). My [reproduction script](/experiments/core-ai/core_ai.py) generates the forty-layer comparison with fixed seeds and records its numerical output.
