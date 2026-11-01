# Before Taking an Expectation, Name the Distribution

A loss is an expectation. An evaluation score is usually an expectation under an empirical distribution. Initialization arguments take expectations over random weights. These statements use the same mathematical operator, but they average over different sources of randomness. Confusing those sources makes otherwise correct equations answer the wrong question.

This became concrete in my MMQA evaluation work. An average across four language tracks and an average across all successfully answered questions can look like interchangeable summaries. They only coincide under particular coverage and weighting conditions.

## Expectation is a weighted sum

For a discrete random variable, expectation multiplies each possible value by its probability and adds the results:

```math
\mathbb{E}[X]=\sum_x p(x)x.
```

Take values −2, 1, and 4 with probabilities 0.2, 0.5, and 0.3. Their expectation is 1.3. It need not be a possible observation. The second moment is 6.1; the centered variance is 6.1 − 1.3² = 4.41.

```python
values = np.array([-2.0, 1.0, 4.0])
probabilities = np.array([0.2, 0.5, 0.3])
mean = probabilities @ values
second_moment = probabilities @ values**2
variance = second_moment - mean**2
```

The figure above shows the distribution and these three quantities. It is a small synthetic example, but the distinction carries into [He initialization](/blogs/he-initialization-second-moment) and [Adam](/blogs/adam-moments-bias-correction): an uncentered second moment is not a centered variance.

Linearity gives E[aX + bY] = aE[X] + bE[Y] whenever the expectations exist. Independence is unnecessary. By contrast, E[XY] equals E[X]E[Y] only under additional conditions such as independence. Applying the second identity where only the first is justified is a common way to erase correlations from a derivation.

## A mean score chooses whose errors count

Suppose a hypothetical evaluation contains 90% English examples scoring 0.9 and 10% other-language examples scoring 0.3. The example-weighted mean is 0.84. Giving the two groups equal weight produces 0.60. Neither number is an arithmetic mistake: they estimate performance under different distributions.

```math
R_{\text{micro}}=\sum_k\frac{N_k}{\sum_j N_j}R_k,\qquad R_{\text{macro}}=\frac{1}{K}\sum_kR_k.
```

My MMQA comparison has 100 examples per track across four tracks, so macro and micro means agree when every item is included. If failed predictions disappear from one track's denominator, that equality can vanish. Worse, the distribution becomes conditional on the system returning a scorable answer. A seemingly better score can then reflect changed coverage rather than better answers.

I therefore keep expected item counts and errors beside the score. Assigning an explicit failure score or reporting coverage separately is a protocol choice that should be made before comparing systems.

## Conditioning changes the question

The law of total expectation reconstructs a population mean from conditional means and their group probabilities:

```math
\mathbb{E}[Y]=\mathbb{E}_{G}\!\left[\mathbb{E}[Y\mid G]\right].
```

The outside expectation supplies weights. Averaging group means equally silently replaces those weights with a uniform distribution. That can be exactly the policy I want for multilingual evaluation, but it should be stated rather than treated as a neutral summary.

The same reasoning applies to training. Sampling every language equally optimizes a different mixture than sampling rows uniformly from an imbalanced corpus. Importance weighting can target another distribution, but large weights may increase estimator variance.

## Ratios do not commute with averaging

An expected per-example ratio is generally different from the ratio of expected numerator and denominator. This appears in precision, recall, character error rates, and token-normalized losses. Averaging utterance-level CER gives short utterances equal influence to long ones; aggregating edit counts and dividing by all reference characters weights utterances by reference length.

For the Urdu diagnostics, I need the aggregation rule as well as the label “CER.” For the training loss, I need to know whether averaging happens across examples, valid tokens, or accumulation steps. The operator is the same, but the random variable being averaged is different.

## The empirical mean is still an estimate

A sample average approximates an expectation under a sampling assumption. A large sample does not remove systematic selection bias, correlated observations, or a mismatch between development and deployment data. In MMQA, four language versions sharing the same image are not four wholly independent draws of visual content. My grouped re-analysis resamples image IDs together for that reason.

[Understanding Deep Learning](https://udlbook.github.io/udlbook/) provides the probability foundations. The [runnable example](/experiments/core-ai/core_ai.py) records the discrete moments. My [MMQA case study](/blogs/vision-evaluation-coverage) applies the weighting and dependence questions to actual saved predictions rather than a hypothetical distribution.
