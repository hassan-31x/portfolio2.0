# A Two-Parameter Gabor Model Is Enough to Expose a Difficult Loss Surface

My GPT-2 implementation has millions of parameters. That makes it a poor place to build intuition about why an optimizer gets stuck: I cannot draw its loss surface, and a falling loss does not tell me which direction was missed. For this experiment I went back to a model with just two trainable numbers. It is small enough to inspect completely, but its objective still has valleys, oscillations, and multiple attractive solutions.

This is the Gabor-style regression example in Simon Prince's [Understanding Deep Learning](https://udlbook.github.io/udlbook/): a sinusoid inside a Gaussian envelope. It is an optimization testbed here, rather than the bank of oriented Gabor filters often used in image processing.

## Two parameters, several competing fits

For a scalar input, I define the prediction as:

```math
z=\theta_0+0.06\theta_1x,\qquad f(x;\theta)=\sin(z)\exp(-z^2/32).
```

The offset shifts the carrier and its envelope together. The other parameter changes how quickly both evolve with the input. These are coupled effects: changing frequency also changes which part of the envelope a point sees. They are not independent controls for phase and amplitude.

I generated 48 equally spaced inputs between −15 and 15 from parameters (0.8, 16), then added Gaussian noise with standard deviation 0.08. These are synthetic observations, not results from a trained language model. The objective is mean squared error over those same observations:

```math
L(\theta)=\frac{1}{N}\sum_{i=1}^{N}\left[f(x_i;\theta)-y_i\right]^2.
```

The averaging matters. Replacing the mean with a sum multiplies the gradient by 48; keeping the learning rate would change the optimization experiment.

## Derive the gradient before trusting the trajectory

Let the residual be the prediction minus the observation. Differentiating the envelope is the easy term to forget:

```math
\frac{\partial f}{\partial z}=e^{-z^2/32}\left[\cos(z)-\frac{z}{16}\sin(z)\right].
```

Since the derivatives of z with respect to the two parameters are 1 and 0.06x, the complete gradient is:

```math
\nabla_\theta L=\frac{2}{N}\sum_i r_i e^{-z_i^2/32}\left[\cos(z_i)-\frac{z_i}{16}\sin(z_i)\right]\begin{bmatrix}1\\0.06x_i\end{bmatrix}.
```

A missing envelope derivative still produces plausible curves. That is why visual inspection alone is a weak gradient check. In the accompanying experiment I compare this expression with central finite differences at a fixed parameter vector. With a step of 0.00001, the maximum absolute discrepancy was approximately 3.4 × 10⁻¹² in float64. This checks that implementation at that point; it does not prove every possible input is handled correctly.

```python
# theta is a float64 NumPy array with two entries.
for j in range(2):
    delta = np.zeros(2)
    delta[j] = 1e-5
    numerical[j] = (
        loss(theta + delta) - loss(theta - delta)
    ) / (2e-5)
np.testing.assert_allclose(analytic, numerical, atol=1e-7)
```

## Same optimizer, different basin

I used full-batch gradient descent, learning rate 0.5, and 2,000 updates for each initialization. The figure above plots both fitted functions and the parameter trajectories. The objective and data are identical across runs.

| Initial parameters | Final parameters, rounded | Training MSE |
| --- | --- | --- |
| (−5, 5) | (−6.145, 7.195) | 0.253516 |
| (4, 24) | (0.786, 15.931) | 0.006218 |
| (0.2, 13) | (0.784, 15.887) | 0.006210 |

The poor fit is not evidence that gradient descent is implemented incorrectly. It follows a different region of a nonconvex surface. Equally, the two good fits do not recover the generating parameters exactly: the observations contain noise, and the optimization budget is finite. I would need stationary-point and curvature checks before labeling every endpoint a strict local minimum.

A learning-rate sweep could change these endpoints. It would not remove the need to understand the surface. A large update can cross a basin boundary, but can also become unstable.

## What I take back to larger models

This example separates three questions that are often collapsed into “training worked”: is the derivative correct, did the update rule reduce the specified objective, and did the resulting function solve the intended problem? Each needs a different check.

The numerical result is deliberately modest. It does not establish that one optimizer is best for transformers. It gives me an inspectable reference when thinking about initialization, curvature, and optimizer state in larger training code. In the [gradient descent article](/blogs/gradient-descent-curvature), I replace the oscillating objective with a quadratic so the stability boundary can be derived exactly.

The complete experiment, seeds, figures, and numerical assertions are in [core_ai.py](/experiments/core-ai/core_ai.py); the values above are recorded in [results.json](/experiments/core-ai/results.json).
