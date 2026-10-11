# Why Model Weights Don't Tell You the Training Memory

In TensorForge, I built a simulator for exploring model architectures and their training costs. One calculation deserves its own explanation: parameter count multiplied by bytes per weight. It tells me how much space the weights occupy. Training needs several more allocations, and some grow without adding a single parameter.

## Put every allocation on the bill

I split the simulator's memory estimate into parameters, gradients, optimizer state, activations, temporary buffers, and runtime overhead. It is a packing problem: knowing the size of one suitcase doesn't tell me whether everything fits in the boot.

Take a hypothetical one-billion-parameter model. With two-byte weights, two-byte gradients, and two FP32 Adam moment tensors, the persistent tensors alone need:

```python
parameters = 1_000_000_000
weights = parameters * 2
gradients = parameters * 2
adam_moments = parameters * 8

print(weights / 1e9)  # 2.0 GB
print((weights + gradients + adam_moments) / 1e9)  # 12.0 GB
```

That is six times the weight storage, before activations or workspace. These are decimal GB; dividing by `1024 ** 3` would give GiB. TensorForge uses that binary divisor internally, so I need to pay attention to units when comparing estimates.

The assumptions matter too. Some mixed-precision training setups keep an additional FP32 master copy of the weights. In that case, this example gains another 4 GB. Gradient dtype and optimizer implementation can change the total. Twelve bytes per parameter is the arithmetic for this example, not a universal training constant.

## Sequence length changes the problem

Activations depend on the work performed during the forward pass. Increasing the microbatch or sequence length can increase memory even when the model architecture stays identical.

A straightforward attention implementation materializes a score tensor with shape `[batch, heads, sequence, sequence]`. For one sequence, 32 heads, and two-byte elements, its storage looks like this:

```python
def attention_scores_gib(sequence):
    return 1 * 32 * sequence * sequence * 2 / 1024**3

print(attention_scores_gib(2048))  # 0.25
print(attention_scores_gib(4096))  # 1.0
```

Doubling the sequence quadruples this particular tensor. That is one attention-score allocation, not the full model's peak memory. Memory-efficient attention implementations avoid storing the complete matrix in GPU memory, so I wouldn't apply this estimate unchanged to every kernel.

Activation checkpointing addresses a different part of the budget: it saves fewer intermediate tensors and recomputes them during backward. It trades extra computation for lower saved-activation memory, as described in [PyTorch's checkpointing explanation](https://pytorch.org/blog/activation-checkpointing-techniques/).

## Where the simulator stops

TensorForge makes these categories visible, but its output is an educational estimate. The activation multipliers and efficiency factors are heuristics. Its training animation doesn't execute a training run.

There is also a useful limitation in the current memory calculation: it divides parameter-related storage across connected GPUs. Ordinary replicated data parallelism keeps a full model copy on each GPU. That division only makes sense under an appropriate sharding assumption, and real sharding introduces its own communication and temporary-memory costs.

Before choosing hardware for an actual run, I would measure peak memory through forward, backward, and an optimizer step with the intended precision and sequence length. The simulator helps me identify which allocation to investigate. The measured run tells me whether it fits.

[TensorForge's memory and throughput estimator](https://github.com/hassan-31x/tensorforge/blob/main/src/sim/engine.ts).
