# Bias, Variance, and Noise Describe Repeated Training Sets

When a model misses an example, I cannot inspect that single prediction and label the error “bias” or “variance.” The decomposition concerns a learning procedure trained repeatedly on different datasets. That perspective is useful in my research work because the temptation is to interpret every development-score change as a property of the architecture, even when it may be sampling variation or selection noise.

I built a small repeated-regression experiment to make the averages explicit. The result also shows why a tidy U-shaped cartoon should not be mistaken for a universal law.

## What is being averaged?

Assume the target has the form Y = f(X) + ε, with conditional noise mean zero. At a fixed test input x, a fitted predictor depends on the random training dataset D. Denote its average prediction across training datasets by the expectation over D. With an independent test noise draw, squared-error risk decomposes as:

```math
\mathbb{E}_{D,\epsilon}\!\left[(Y-\hat f_D(x))^2\right]=\left(\mathbb{E}_D[\hat f_D(x)]-f(x)\right)^2+\operatorname{Var}_D(\hat f_D(x))+\operatorname{Var}(\epsilon\mid x).
```

The cross terms vanish because prediction deviations from their mean average to zero, and the independent test noise has conditional mean zero. The first term is squared bias, the second is variability across fitted predictors, and the third is irreducible noise under this input representation and target model.

If optimization or initialization is random, that randomness must also be included or explicitly held fixed. Otherwise “variance across datasets” and “variance across seeds” refer to different experiments.

## Repeated datasets rather than repeated test splits

I generated 400 independent training datasets. Each contains 32 inputs sampled uniformly from −1 to 1, targets sin(πx), and independent Gaussian noise with standard deviation 0.15. I fit unregularized polynomials of degrees 1, 3, 5, and 9 using a Legendre basis and least squares.

The evaluation grid contains 181 fixed inputs between −0.9 and 0.9. The reported average therefore describes that grid's uniform empirical weighting, not exactly the continuous training-input distribution. I know the noiseless target, so I can estimate bias directly. With real data, that target is usually unavailable.

```python
mean_prediction = predictions.mean(axis=0)
bias_squared = np.mean((mean_prediction - truth) ** 2)
variance = np.mean(predictions.var(axis=0, ddof=0))
expected_test_mse = bias_squared + variance + 0.15**2
```

Using ddof = 0 makes the finite-ensemble algebra exact: average squared error against the noiseless target equals the squared error of the ensemble mean plus the average squared deviation around that mean. The script asserts this identity. It is distinct from asking for an unbiased sample estimator of an unknown population variance.

## The measured tradeoff

| Polynomial degree | Estimated squared bias | Estimated variance | Added test-noise variance |
| --- | --- | --- | --- |
| 1 | 0.150390 | 0.013914 | 0.022500 |
| 3 | 0.003016 | 0.003395 | 0.022500 |
| 5 | 0.000015 | 0.004707 | 0.022500 |
| 9 | 0.009513 | 1.938330 | 0.022500 |

Degree one cannot represent the target's curvature well. Degrees three and five reduce that approximation error substantially. The degree-nine fits are much more sensitive to which 32 points happen to be sampled. Gaps in the sampled inputs permit large excursions even within the evaluation interval.

The estimated bias also rises at degree nine. I would not turn this finite Monte Carlo observation into a theorem that increasing polynomial degree increases population bias. A finite ensemble mean is itself sensitive to extreme fits. The error bars on the decomposition estimates would matter for that claim. The plotted example fits and logarithmic scale make this sensitivity visible rather than hiding it behind a smooth schematic curve.

## Noise is conditional on the information available

Calling a term irreducible does not mean nothing could ever reduce it. In the assumed experiment, ε is independent noise added after the input is generated. In an application, unexplained variation may become predictable after adding relevant information, improving labels, or changing the target.

For Urdu speech, ambiguity in a transcript-only conditioning signal may include speaker and speaking-style variation. For cultural question answering, an underspecified question can admit several reasonable answers. Neither automatically satisfies the additive, independent, squared-error assumptions above. I would not apply this numeric decomposition directly to BERTScore or character error rate.

## What the decomposition changes in my evaluations

A single train-validation gap is not an estimate of these three terms. Cross-validation estimates risk under its splitting assumptions; it does not reveal the unknown target function. Likewise, an ensemble can reduce variance when errors differ, but averaging correlated mistakes may accomplish little.

That is why my MMQA model-selection experiment uses grouped folds and reports a paired uncertainty interval. It measures a limited development-set comparison rather than declaring that an ensemble “solves variance.” The theoretical background is developed in [An Introduction to Statistical Learning](https://www.statlearning.com/) and [Stanford's bias-variance notes](https://cs229.stanford.edu/notes2022fall/bias-variance.pdf). The [complete experiment](/experiments/core-ai/core_ai.py) and [numeric output](/experiments/core-ai/results.json) make every synthetic assumption inspectable.
