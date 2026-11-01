# Gradient Descent: The Learning Rate Is a Curvature Constraint

When I read a training configuration, a learning rate by itself tells me very little. Its effect depends on how the loss is reduced, how parameters are scaled, and how sharply the objective bends along different directions. I use a two-dimensional quadratic to make that dependence explicit before reasoning about more complicated training runs.

This experiment is part of my optimization notes alongside the [Gabor loss landscape](/blogs/gabor-loss-landscape). The Gabor example shows why initialization matters. The quadratic gives an exact answer to a narrower question: when does a fixed gradient step converge?

## Diagonalize the update

Consider the objective and its gradient:

```math
L(w)=\frac{1}{2}w^\top H w,\qquad \nabla L(w)=Hw,\qquad H=\operatorname{diag}(1,20).
```

The minimum is at the origin. Gradient descent subtracts the current gradient, scaled by a positive learning rate:

```math
w_{t+1}=(I-\alpha H)w_t.
```

Because this Hessian is diagonal, each coordinate evolves independently. Along an eigenvector with eigenvalue λ, the error is multiplied by 1 − αλ on every step. Its magnitude shrinks precisely when the magnitude of that multiplier is less than one. For a positive definite quadratic, convergence from every starting point therefore requires:

```math
0<\alpha<\frac{2}{\lambda_{\max}(H)}.
```

Here the upper boundary is 0.1. At the boundary, the sharp coordinate simply changes sign without shrinking. Above it, that coordinate grows. This is an exact statement for this quadratic, not a universal learning-rate formula for a changing neural-network Hessian.

## Three rates around one boundary

I start at (−4, 2). With α = 0.04, the two contraction factors are 0.96 and 0.2. The sharp direction disappears quickly; the flat direction dominates the tail of training. With α = 0.095, they are 0.905 and −0.9. Both converge, but the sharp coordinate alternates signs. With α = 0.105, the sharp factor is −1.1: the iterates diverge despite being only slightly beyond the threshold.

The figure plots objective values on a logarithmic scale. The curve is meaningful because the objective is nonnegative and its optimum is zero. A log plot of an arbitrary signed loss would require a different treatment.

```python
H = np.diag([1.0, 20.0])
w = np.array([-4.0, 2.0])
for step in range(120):
    value = 0.5 * w @ H @ w
    gradient = H @ w
    w = w - learning_rate * gradient
```

The order in this loop matters for interpretation: the recorded value belongs to the parameters before that update. Off-by-one plotting differences can otherwise make two equivalent implementations look inconsistent.

## Why the steepest direction limits everyone else

A scalar learning rate must respect the sharpest direction even when most remaining error lies along a flat one. For the best constant rate on a positive definite quadratic, α = 2/(λmax + λmin), the worst contraction factor is (κ − 1)/(κ + 1), where κ is the ratio of the largest to smallest eigenvalue. As that condition number grows, convergence slows.

That is one reason parameter scaling and preconditioning matter. Re-expressing a parameter changes the geometry seen by Euclidean gradient descent. The gradient is the steepest ascent direction under the chosen Euclidean distance; “steepest” is not independent of the coordinates or metric.

## Loss reduction is part of the configuration

If I replace a mean loss with a sum over B examples, every gradient is multiplied by B. Under otherwise identical conditions, dividing the learning rate by B restores the same update. Gradient accumulation introduces another reduction decision: averaging each microbatch loss and then summing gradients without dividing by the number of accumulation steps increases the effective update.

This arithmetic also depends on whether microbatches have equal sizes. Averaging averages gives every microbatch equal weight, which is not the same as weighting every example equally when their sizes differ. For token losses, the analogous question is whether examples or non-masked tokens receive equal weight.

These details are directly relevant to my Urdu adaptation run, which uses a microbatch of one and eight accumulation steps. I cannot interpret “learning rate 0.0001” without the accumulation and masking conventions beside it.

For nonconvex neural objectives, curvature changes throughout training and negative eigenvalues may exist. The quadratic argument remains a useful local diagnostic, not a guarantee. [Understanding Deep Learning](https://udlbook.github.io/udlbook/) develops this connection between curvature and optimization. My [reproducible script](/experiments/core-ai/core_ai.py) generates the three trajectories; [SGD](/blogs/stochastic-gradient-noise) introduces the next complication: the gradient itself becomes an estimate.
