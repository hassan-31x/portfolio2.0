# Momentum Remembers Gradients, Including the Ones You No Longer Want

Momentum is often described as a ball rolling downhill. I find the recurrence more useful. It explains the memory length, exposes a learning-rate convention that changes between implementations, and shows why momentum can continue moving in an unhelpful direction after the gradient changes sign.

I use the same ill-conditioned quadratic as in my [gradient descent experiment](/blogs/gradient-descent-curvature). Keeping the objective fixed lets me attribute differences to the update rule, rather than to a new dataset or initialization.

## State the convention first

Here I use the unnormalized velocity convention, initialized at zero:

```math
v_t=\beta v_{t-1}+g_t,\qquad w_{t+1}=w_t-\alpha v_t.
```

Some descriptions instead define an exponential moving average with a factor of 1 − β multiplying the gradient. For zero initial state, that moving average is exactly (1 − β) times the velocity above. Matching parameter updates therefore requires a compensating learning-rate change. Copying the same α between the two equations does not reproduce the same optimizer.

Expanding the recurrence makes its memory explicit:

```math
v_t=g_t+\beta g_{t-1}+\beta^2g_{t-2}+\cdots+\beta^{t-1}g_1.
```

The optimizer has no special knowledge of the minimum. It simply weights recent gradients more strongly than older ones.

## Constant signal and alternating noise

For a constant gradient, the unnormalized velocity approaches g/(1 − β). At β = 0.9, that is ten times the gradient. This is why an apparent speedup can partly reflect a larger steady-state update; momentum comparisons should make their tuning choices explicit.

For independent, zero-mean gradient noise with covariance Σ, the stationary covariance of the normalized moving average is:

```math
\operatorname{Cov}(\bar g)=\frac{1-\beta}{1+\beta}\Sigma.
```

This follows by summing the squared geometric weights. It does not say the real training gradient is stationary or independent over time. The parameters change, and successive batches can be correlated. It is a reference calculation showing why slowly varying signal and rapidly alternating noise are treated differently.

The rough memory scale 1/(1 − β) is ten steps at 0.9. The exact exponential decay time is −1/log β, and the half-life is log(0.5)/log β. These are different summaries, not interchangeable definitions.

## Curvature gives a second-order recurrence

Along a quadratic eigen-direction with curvature λ, eliminating the velocity gives:

```math
w_{t+1}=(1+\beta-\alpha\lambda)w_t-\beta w_{t-1}.
```

The characteristic roots determine whether this direction decays smoothly, oscillates, or diverges. For 0 ≤ β < 1 and λ > 0, stability requires 0 < αλ < 2(1 + β). Complex roots can produce oscillation while their magnitude remains below one. Stability therefore does not imply that the loss decreases on every update.

This is a more precise explanation of “overshoot” than the rolling-ball analogy. The previous displacement remains in the recurrence even when the new gradient points back toward the minimum.

## The controlled comparison

My figure uses H = diag(1, 20), starting point (−4, 2), α = 0.04, and 120 updates. I compare β = 0 with β = 0.9 under the same unnormalized convention. The trajectory panel makes the oscillations visible; the loss panel shows how they affect progress.

```python
velocity = np.zeros_like(w)
for step in range(120):
    gradient = H @ w
    velocity = 0.9 * velocity + gradient
    w = w - 0.04 * velocity
```

This is an illustrative same-rate comparison, not a claim that I found the best hyperparameters for either optimizer. A fair benchmark would tune both methods and state whether the budget is measured in gradient evaluations, wall time, or examples processed.

## Optimizer state belongs to a checkpoint

The recurrence has a practical consequence for my training pipelines: restoring weights without restoring momentum does not resume the same trajectory. It initializes a different dynamical system at the same parameter vector. The same applies to Adam's two moment buffers and step count.

That is why the Urdu training recovery logic records optimizer and scheduler state alongside adapter weights and RNG state. A checkpoint is more than the artifact needed for inference. Conversely, starting a fresh schedule intentionally can be reasonable, but it should be recorded as a new training phase rather than an exact continuation.

The optimizer treatment in [Understanding Deep Learning](https://udlbook.github.io/udlbook/) provides the theoretical background. My [script](/experiments/core-ai/core_ai.py) generates the trajectories. The next article examines [Adam](/blogs/adam-moments-bias-correction), where remembering both a signed gradient and its squared magnitude introduces another set of assumptions.
