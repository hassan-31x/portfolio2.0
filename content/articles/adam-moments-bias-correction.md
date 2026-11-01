# Adam's Second Moment Is Not a Variance Estimate

Adam appears in both my GPT-2 training code and the adapter-training configurations for my research projects. Its familiar defaults can make it feel like infrastructure. I want to understand the state it carries, because that state changes the scale of updates, the behavior after a restart, and the meaning of a learning-rate setting.

The useful starting point is the [original Adam paper](https://arxiv.org/abs/1412.6980). Adam combines an exponential average of gradients with an exponential average of squared gradients. The second quantity is often casually called variance. That description loses an important distinction.

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

My plot computes the first 80 steps under that constant gradient. The corrected curve stays at one update unit, while the uncorrected curve changes over time despite the unchanged signal. The [experiment](/experiments/core-ai/core_ai.py) asserts the corrected result numerically.

Under a stationary gradient distribution, the correction removes the initialization bias of each moment estimate. In real training, the gradient distribution changes. Bias correction does not make a moving average equal to the instantaneous gradient statistics.

## Beta values specify a timescale

The rough memory scale 1/(1 − β) is about ten steps for β1 = 0.9 and a thousand for β2 = 0.999. My GPT-2 runner uses β2 = 0.95, whose corresponding scale is around twenty steps. That is a configuration choice in the code, not evidence that the model completed a successful pretraining run or that this setting is universally better.

A shorter second-moment memory adapts faster to changing magnitudes but also produces a noisier denominator. The relevant unit is optimizer steps. Changing accumulation alters how many examples are represented by twenty steps, even if the beta value is unchanged.

## Restarting and regularization

Restoring weights while resetting m, v, or t changes the next update. A resumed run also needs the learning-rate schedule's position and, for reproducibility, the relevant random states. My Urdu pipeline treats these as checkpoint state rather than reconstructing them from adapter weights.

Finally, adding an L2 penalty to the loss adds a parameter-dependent term to g. Adam then passes that term through its adaptive moments. That is different from applying weight decay directly to parameters outside those moments. The distinction is formalized in [Decoupled Weight Decay Regularization](https://arxiv.org/abs/1711.05101). I check the actual optimizer class and parameter groups rather than interpreting every field named “weight_decay” as the same operation.

The synthetic result here isolates bias correction. It is not a convergence benchmark, and it does not establish Adam as the best choice for any of my projects. It gives me a small, testable reference for reading optimizer code and debugging the first few updates.
