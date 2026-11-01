# SGD Noise Depends on How the Batch Was Sampled

In my training code, “batch size” is not just a throughput setting. It determines which gradient estimator I use and how much variation that estimator introduces. Before comparing optimizers or accumulation settings, I want to know what is random, what objective is being estimated, and whether the implementation gives each example the intended weight.

The word stochastic can hide several different experiments. Sampling examples with replacement, shuffling once per epoch, and sampling a subset without replacement have related but different variance properties. This article makes those differences concrete with a tiny population whose batches can all be enumerated.

## Start with the finite-data objective

For N examples, define the empirical objective as the average of their individual losses. At a fixed parameter vector, each example has a gradient vector. The full gradient is their average:

```math
L(w)=\frac{1}{N}\sum_i\ell_i(w),\qquad g=\frac{1}{N}\sum_i g_i,\qquad g_i=\nabla\ell_i(w).
```

If a batch contains B independently sampled uniform indices, the average batch gradient is unbiased. Its covariance is the population covariance divided by B:

```math
\mathbb{E}[\hat g]=g,\qquad \operatorname{Cov}(\hat g)=\frac{\Sigma}{B},\qquad \Sigma=\frac{1}{N}\sum_i(g_i-g)(g_i-g)^\top.
```

This expectation is conditional on the current parameters being held fixed. During optimization those parameters change, so one cannot treat all gradients along a trajectory as independent samples from a stationary distribution.

## Sampling without replacement changes the answer

If the batch is a uniformly chosen subset of B distinct examples, the finite-population correction gives:

```math
\operatorname{Cov}(\hat g)=\frac{N-B}{B(N-1)}\Sigma.
```

The normalization convention matters: Σ above uses a denominator of N. Using the sample covariance with denominator N − 1 changes the written prefactor. At B = N the variance is exactly zero, as it should be.

I used eight scalar example gradients: −4, −1, 0, 2, 3, 6, 7, 11. Their mean is 3 and their population variance is 20.5. Enumerating every possible subset produces the following exact distribution of batch means, apart from floating-point rounding.

| Batch size | Mean of batch means | Variance, without replacement |
| --- | --- | --- |
| 1 | 3 | 20.500000 |
| 2 | 3 | 8.785714 |
| 4 | 3 | 2.928571 |
| 8 | 3 | 0 |

```python
from itertools import combinations
values = np.array([-4, -1, 0, 2, 3, 6, 7, 11])
means = np.array([
    np.mean(batch) for batch in combinations(values, 4)
])
assert np.isclose(means.mean(), values.mean())
assert np.isclose(means.var(), 20.5 / 7)
```

For B = 4, the with-replacement variance would instead be 5.125. Both answers are correct for their respective sampling schemes. The figure above puts the empirical enumeration beside the finite-population formula.

## Shuffling is not independent sampling

A random permutation gives a uniformly distributed first batch. Once that batch is observed, the next batch comes from the remaining examples. Its conditional expectation need not equal the full gradient. Across an epoch, batches are coupled, and parameters also move between them.

This does not make shuffling invalid. It means the simplest independent-noise derivation is an approximation to that training loop. Similarly, curriculum sampling, language balancing, and length bucketing can change the sampling distribution. If I oversample a language, I am generally changing the objective unless I introduce appropriate importance weights.

The same issue appears in my four-track MMQA work: balancing tracks is a deliberate choice about which errors matter, not merely a convenient data-loader option.

## What accumulation does and does not reproduce

Accumulating equally weighted gradients across microbatches at unchanged parameters can reproduce a larger batch gradient. It requires consistent loss normalization, one optimizer update after accumulation, and clipping after the accumulated gradient is formed. Clipping each microbatch separately is nonlinear and generally produces a different direction.

Batch-dependent layers and random operations introduce further differences. BatchNorm sees the microbatch statistics; dropout draws different masks. Neither discrepancy is captured by saying “effective batch size equals microbatch size times accumulation steps.”

Increasing B reduces this estimator's variance, but that alone does not prove improved generalization or a proportionate speedup. Compute per update, number of updates, data coverage, and learning-rate schedule all change the comparison. The clean question is which resource budget is held constant.

The derivation follows the empirical-risk treatment in [Understanding Deep Learning](https://udlbook.github.io/udlbook/). My [experiment script](/experiments/core-ai/core_ai.py) checks the finite-population identity exhaustively. Next, [momentum](/blogs/momentum-as-gradient-filter) asks what happens when gradients are combined across time rather than across examples.
