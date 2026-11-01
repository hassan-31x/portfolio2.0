# Why Adam Adds Adaptive Step Sizes to Momentum

[Momentum](/blogs/momentum-as-gradient-filter) addresses one weakness of ordinary SGD: it remembers consistent directions instead of letting each mini-batch entirely replace the previous one. But it still applies a shared learning-rate scale across coordinates. Parameters with very different gradient magnitudes can therefore receive very different effective treatment.

Adam combines momentum-like directional memory with a moving measure of each coordinate's gradient magnitude. It uses the second quantity to rescale the first. This is the motivation I want to understand before treating Adam as a default optimizer in my GPT-2 runner and adapter-training configurations.

## Why memory alone is not enough

Imagine one coordinate receiving gradients around 100 while another receives gradients around 0.01. With a common rate, their raw displacements differ by four orders of magnitude. Gradient magnitude does not by itself tell me the ideal displacement: the coordinates may have different scales and curvature.

Adam tracks squared gradients to build a coordinatewise denominator. A persistently large gradient raises that denominator; a smaller one lowers it. The resulting direction is an adaptively rescaled momentum estimate. This can reduce sensitivity to coordinate scaling, but it is not a full curvature correction and does not remove the need to tune a learning rate.

For a constant nonzero gradient, after bias correction and ignoring epsilon, the update approaches the learning rate times the gradient's sign. That illustrates normalization of magnitude. It does not describe every noisy or changing gradient sequence.

The [original Adam paper](https://arxiv.org/abs/1412.6980) defines the actual algorithm. “Momentum plus an adaptive denominator” is a useful motivation, not a replacement for its equations.

## Write all four state equations

For a gradient g at step t, with moment buffers initially zero:

```math
m_t=\beta_1m_{t-1}+(1-\beta_1)g_t,\qquad v_t=\beta_2v_{t-1}+(1-\beta_2)g_t^2.
```

All squares, divisions, and square roots here are coordinatewise. The bias-corrected estimates and update are:

```math
\hat m_t=\frac{m_t}{1-\beta_1^t},\qquad \hat v_t=\frac{v_t}{1-\beta_2^t},\qquad w_{t+1}=w_t-\alpha\frac{\hat m_t}{\sqrt{\hat v_t}+\epsilon}.
```

The epsilon is outside the square root in this formulation. Moving it inside changes the numerical algorithm. Framework details matter when trying to reproduce a run, especially at small gradient magnitudes.

## Squared magnitude includes the mean

For a scalar random gradient:

```math
\mathbb{E}[g^2]=\operatorname{Var}(g)+(\mathbb{E}[g])^2.
```

A perfectly constant gradient has zero variance but a nonzero second moment. Adam's denominator therefore responds to sustained gradient magnitude as well as variability. It is not a direct uncertainty estimate, and dividing by it is not equivalent to computing a statistical confidence interval.

The coordinatewise scaling also does not make Adam Newton's method. It does not estimate a full Hessian, rotate into its eigenvectors, or model cross-coordinate curvature. These distinctions matter when interpreting an apparently faster loss curve.

## Why correcting two small moments can shrink an update

With a constant gradient g = 1, β1 = 0.9, and β2 = 0.999, the first raw moment is 0.1 and the second is 0.001. Without correction, their ratio is approximately 3.162, ignoring epsilon. With correction, both estimates become one, so the update magnitude is approximately α.

Thus “zero initialization underestimates the moments” does not imply it underestimates the update. The ratio contains a square root and two different decay factors. In this example, correcting the bias reduces the first update.

My plot computes the first 80 steps under that constant gradient. The corrected curve stays at one update unit, while the uncorrected curve changes over time despite the unchanged signal.

![Adam update magnitude with and without moment bias correction](/images/articles/technical/adam-bias-correction.png "A constant unit gradient isolates initialization bias. It is an update-rule diagnostic, not a model-quality benchmark.")

The [experiment](/experiments/core-ai/core_ai.py) asserts the corrected result numerically.

Under a stationary gradient distribution, the correction removes the initialization bias of each moment estimate. In real training, the gradient distribution changes. Bias correction does not make a moving average equal to the instantaneous gradient statistics.

## Beta values specify a timescale

The rough memory scale 1/(1 − β) is about ten steps for β1 = 0.9 and a thousand for β2 = 0.999. My GPT-2 runner uses β2 = 0.95, whose corresponding scale is around twenty steps. That is a configuration choice in the code, not evidence that the model completed a successful pretraining run or that this setting is universally better.

A shorter second-moment memory adapts faster to changing magnitudes but also produces a noisier denominator. The relevant unit is optimizer steps. Changing accumulation alters how many examples are represented by twenty steps, even if the beta value is unchanged.

## Restarting and regularization

Restoring weights while resetting m, v, or t changes the next update. A resumed run also needs the learning-rate schedule's position and, for reproducibility, the relevant random states. My [Urdu pipeline](/blogs/urdu-tts-adaptation) treats these as checkpoint state rather than reconstructing them from adapter weights.

Finally, adding an L2 penalty to the loss adds a parameter-dependent term to g. Adam then passes that term through its adaptive moments. That is different from applying weight decay directly to parameters outside those moments. The distinction is formalized in [Decoupled Weight Decay Regularization](https://arxiv.org/abs/1711.05101). I check the actual optimizer class and parameter groups rather than interpreting every field named “weight_decay” as the same operation.

The synthetic result here isolates bias correction. It is not a convergence benchmark, and it does not establish Adam as the best choice for any of my projects. It gives me a small, testable reference for reading optimizer code and debugging the first few updates.

The sequence is useful to keep in mind: [SGD](/blogs/stochastic-gradient-noise) estimates a direction, [momentum](/blogs/momentum-as-gradient-filter) remembers its history, and Adam also rescales it per coordinate. None replaces [appropriate initialization](/blogs/he-initialization-second-moment).
