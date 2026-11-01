# He Initialization Preserves a Second Moment, Not the Mean-Centered Variance

My GPT-2 implementation uses normal initialization and a depth-dependent scale for residual projections. That led me back to a more basic question: what quantity is an initialization rule actually trying to preserve? The usual explanation of He initialization says that ReLU removes half the signal. The useful explanation specifies which moment is halved and which assumptions make the calculation possible.

This matters because a good initialization for a plain ReLU network is not automatically the right choice for a transformer, a residual network, or a pretrained model being adapted with LoRA.

## Follow one linear layer

Let a preactivation be a sum of n weighted inputs, with zero biases. Assume the weights are independent, have zero mean and variance s², and are independent of the input activations. Cross terms vanish in the second moment:

```math
z=\sum_{i=1}^{n}w_i a_i,\qquad \mathbb{E}[z^2]=n s^2\mathbb{E}[a^2].
```

Identically distributed input second moments simplify the last expression. Crucially, the inputs do not have to have zero mean for this forward calculation: the zero-mean independent weights remove the cross terms in expectation over initialization.

The statement concerns an ensemble of random networks. One finite-width network will fluctuate around it, and correlations develop as layers and training interact.

## ReLU halves the second moment under symmetry

For a preactivation distribution symmetric about zero, the positive and negative halves contribute equally to the squared magnitude:

```math
\mathbb{E}[\operatorname{ReLU}(z)^2]=\frac{1}{2}\mathbb{E}[z^2].
```

Combining the two equations, keeping the activation second moment approximately unchanged calls for weight variance 2/n. For a normal distribution, this means a standard deviation of the square root of 2/n. Confusing variance with standard deviation gives a very different network.

ReLU output has a positive mean. If the preactivation is specifically a zero-mean Gaussian with variance q, its centered output variance is:

```math
\operatorname{Var}(\operatorname{ReLU}(z))=q\left(\frac{1}{2}-\frac{1}{2\pi}\right).
```

That is not q/2. The forward preservation argument uses the uncentered second moment, not equality of centered variances across ReLU. This distinction is easy to lose when every scale measurement is casually called “variance.”

## A forty-layer numerical check

I ran three untrained, width-256 ReLU networks on a batch of 512 random inputs, with zero biases and 40 layers. I used the same underlying standard-normal weight draws for each scaling rule, so the comparison changes scale rather than the random directions.

| Weight rule | Activation second moment at layer 40 |
| --- | --- |
| Normal standard deviation 0.01 | 2.31 × 10⁻⁷⁶ |
| Variance 1/fan-in | 1.08 × 10⁻¹² |
| Variance 2/fan-in | 1.19 |

The input second moment was approximately 1.00. The figure uses a logarithmic vertical scale because the first two networks lose many orders of magnitude. The He-scaled network is not exactly flat: finite width and random draws remain visible.

```python
weights = rng.normal(size=(fan_in, fan_out))
weights *= np.sqrt(2.0 / fan_in)
activations = np.maximum(activations @ weights, 0.0)
second_moment = np.mean(activations ** 2)
```

This checks signal scale, not trainability on a task. It does not measure accuracy, prove healthy Jacobian singular values, or rule out dead units. Backward propagation introduces its own fan-in versus fan-out considerations; a non-square layer cannot generally preserve both scales with one simple rule.

## Where I would stop applying the derivation

For a leaky ReLU with negative slope a, the analogous symmetric-distribution second-moment factor is (1 + a²)/2, giving variance 2/((1 + a²)n). For GELU, residual additions, attention, and normalization layers, the plain ReLU argument no longer describes the whole signal path.

That is why I do not replace the GPT-2 initialization with He initialization merely because it sounds more principled. GPT-2 has residual streams and a different nonlinearity; its initialization needs to be understood in that architecture. I also would not reinitialize the pretrained Orpheus backbone to make its weights satisfy a new variance rule. Doing so would discard the learned representation that adaptation is meant to retain.

The primary derivation is in [He et al., Delving Deep into Rectifiers](https://arxiv.org/abs/1502.01852). My [reproduction script](/experiments/core-ai/core_ai.py) records all three traces and fixed seeds. The related [expectation article](/blogs/expectation-in-machine-learning) explains why specifying the random variable and distribution is essential when interpreting these measurements.
