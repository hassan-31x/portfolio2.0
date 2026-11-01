# Why SGD Learns Through Small, Frequent Updates

A training loop does not have to wait until it has processed an entire dataset before changing the model. That is the practical idea behind stochastic gradient descent: estimate a useful direction from a small amount of data, take a controlled step, then estimate the direction again at the new parameters.

This matters in my Urdu adaptation pipeline, where a microbatch contains one example and eight microbatches contribute to an optimizer update. The important questions are how frequently parameters change, how the gradients are averaged, and how much each update should be trusted. “Use smaller steps” needs to distinguish the learning rate from the batch size.

## The full gradient waits for everyone

For an empirical objective averaging N examples, the full gradient is:

```math
L(w)=\frac{1}{N}\sum_{i=1}^{N}\ell_i(w),\qquad g(w)=\frac{1}{N}\sum_{i=1}^{N}\nabla\ell_i(w).
```

Full-batch gradient descent evaluates every example at the same parameters, averages those gradients, and updates once. This gives the exact gradient of the finite training objective, apart from numerical effects. It can be expensive to compute before every update, and neural-network activations make processing everything simultaneously impractical.

Mini-batch SGD replaces that average with an estimate from B examples. Strict single-example SGD has B = 1; in deep learning, the name is also commonly used for mini-batch updates.

```math
\hat g_t=\frac{1}{B}\sum_{i\in\mathcal B_t}\nabla\ell_i(w_t),\qquad w_{t+1}=w_t-\alpha\hat g_t.
```

The learning rate α controls the displacement for a given gradient. Reducing B changes the estimator and the update frequency; it does not automatically make the parameter step smaller.

## Why the loss can rise after a useful step

For a sufficiently small displacement, a first-order expansion gives:

```math
L(w-\alpha\hat g)\approx L(w)-\alpha\nabla L(w)^\top\hat g.
```

Using the exact full gradient makes the first-order change negative unless that gradient is zero. A sampled gradient can point against the full gradient on a particular update. The loss of the sampled batch may fall while another batch's loss rises. Curvature adds a second-order term, so even the full-gradient argument requires a sufficiently controlled learning rate.

If the sampled gradient is conditionally unbiased at the current parameters, the expected first-order change is −α times the squared norm of the full gradient. That is a local statement. It does not guarantee that the realized full loss decreases after every SGD step.

This is why I inspect a smoothed training curve and a fixed evaluation population rather than demand that consecutive batch losses fall. Different batches are different measurements.

## Recomputing the direction changes the trajectory

Suppose two examples provide gradients g1 and g2. One update on their average evaluates both at the original parameters. Two sequential updates evaluate the second gradient after the first update:

```math
w'=w-\alpha g_1(w),\qquad w''=w'-\alpha g_2(w').
```

Even if I rescale learning rates to match the aggregate first-order displacement, these procedures are generally different: g2 at w′ is not g2 at w. Locally, the difference contains a curvature-dependent term of order α². Repeated modest updates let the direction adapt as parameters move, but introduce ordering effects and stochastic variation.

Smaller learning rates reduce each displacement. They also require more updates for a comparable distance. Large rates can overshoot a narrow valley; tiny rates can spend the budget making negligible progress. Batch size, rate, and total optimizer steps therefore need to be reported together.

## Measure the gradient noise directly

At fixed parameters, let Σ be the population covariance of per-example gradients, using denominator N. Independent uniform sampling with replacement gives covariance Σ/B for the batch mean. Uniform subsets without replacement instead give:

```math
\operatorname{Cov}(\hat g)=\frac{N-B}{B(N-1)}\Sigma.
```

I enumerated all subsets of eight scalar gradients: −4, −1, 0, 2, 3, 6, 7, 11. Their full mean is 3. Every batch-size distribution has that same mean, while its variance changes:

| Batch size | Expected batch gradient | Variance without replacement |
| --- | --- | --- |
| 1 | 3 | 20.500000 |
| 2 | 3 | 8.785714 |
| 4 | 3 | 2.928571 |
| 8 | 3 | 0 |

![Exact mini-batch gradient variance](/images/articles/technical/sgd-variance.png "An exhaustive finite-population calculation at fixed parameters. Smaller batches change gradient variability, not the expected gradient in this uniform sampling experiment.")

```python
optimizer.zero_grad()
for microbatch in accumulation_window:
    loss = model_loss(microbatch) / accumulation_steps
    loss.backward()
# Clip the combined gradient, then update once.
clip_grad_norm_(model.parameters(), max_norm)
optimizer.step()
```

This schematic assumes equal microbatch weighting and a complete accumulation window. A shorter final window needs its own normalization. Token-weighted losses need additional care when valid token counts differ. Clipping each microbatch separately also changes the result because clipping is nonlinear.

## Why I use it, and what it does not solve

SGD makes learning possible without repeatedly processing all training data before every update. It offers a practical memory and compute tradeoff, and frequent estimates can make useful progress long before an epoch finishes. Noise can affect which solutions are reached, but it is not a guarantee of better generalization or escape from every poor basin.

The remaining problem is that a noisy gradient can zigzag across a steep valley while moving slowly along it. [Momentum](/blogs/momentum-as-gradient-filter) uses gradient history to retain consistent direction. [Adam](/blogs/adam-moments-bias-correction) adds coordinatewise scaling to that memory. Both still depend on a sensible starting point, which is the subject of [initialization](/blogs/he-initialization-second-moment).

The [reproduction script](/experiments/core-ai/core_ai.py) checks the batch-variance calculation. [Understanding Deep Learning](https://udlbook.github.io/udlbook/) develops the optimization background; my [Urdu training case study](/blogs/urdu-tts-adaptation) shows where accumulation enters an actual constrained run.
