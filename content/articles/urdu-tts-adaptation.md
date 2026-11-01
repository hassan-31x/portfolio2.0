# Adapting Orpheus to Urdu: The Data Contract Was Half the Training System

My longer-term project is an emotionally aware Urdu-speaking agent. The work described here is a narrower prerequisite: adapting a pretrained speech model to Urdu while keeping the data, tokenization, checkpoints, and evaluation auditable. I have not yet established emotion control or production-quality conversational speech.

The completed run is `aslp50h-r32-lr1e4-seed3407-v2` in my [Urdu Orpheus repository](https://github.com/hassan-31x/orpheus-ft-urdu). It trained an adapter for 2,014 optimizer steps on one Tesla T4 in approximately 5.04 hours. This article follows the implementation and saved artifacts, including a later data-preparation run that stopped before optimization and a checkpoint diagnostic that got worse at the final step.

## Turn audio into a sequence the model can learn

The backbone is `unsloth/orpheus-3b-0.1-pretrained`, a roughly three-billion-parameter pretrained model. [Orpheus](https://github.com/canopyai/Orpheus-TTS) represents speech through discrete audio tokens. My pipeline uses the [SNAC](https://github.com/hubertsiuzdak/snac) codec at 24 kHz, with three hierarchical codebooks.

One coarse time frame corresponds to one code from the coarsest stream, two from the middle stream, and four from the finest stream. Interleaving these creates seven tokens per frame. The serializer assigns distinct offset ranges to the seven positions, using 4,096-code ranges, so the decoder can reconstruct which stream and position a token belongs to. The speech-token offset and boundary tokens are part of the model's sequence format as well.

This is a contract between preprocessing, training, generation, and decoding. A valid integer token is not necessarily valid at every position. Flattening the three streams by simple concatenation would produce a different language from the one the pretrained model expects. My default also preserves frames rather than deduplicating coarse-frame codes and silently changing timing.

The objective in this run is causal next-token prediction across both text and audio tokens. It is not answer-only audio loss. That distinction matters when comparing its loss with a speech-only or assistant-only fine-tuning objective.

## The context limit changed the actual dataset

I normalize transcripts to NFC, remove problematic control characters, and standardize whitespace. Audio is checked against the required 24 kHz mono PCM16 representation. I audit duplicates and split overlap before constructing token sequences.

The 2,048-token context budget is a hard constraint. Speech uses roughly 82 serialized tokens per second in this setup, so longer clips can consume the budget before allowing for text and boundary tokens. The pipeline excludes an over-budget text-audio pair as a unit rather than truncating audio while leaving a full transcript attached.

| Split | Audited deduplicated clips / hours | Retained clips / hours |
| --- | --- | --- |
| Training | 17,392 / 37.41 | 16,111 / 26.09 |
| Validation | 2,129 / 4.64 | 1,965 / 3.18 |
| Test audit | 2,142 / 4.69 | Not used for training |

The configuration name contains “50h.” It is not a measurement of the audio the optimizer actually saw. The retained training set contains about 26.09 hours. Reporting that denominator prevents a run label from becoming an inflated data claim.

The source is [ASLP-lab/UrduSpeech](https://huggingface.co/datasets/ASLP-lab/UrduSpeech). A duration-filtered subset may also shift the distribution toward shorter utterances, so the exclusions are a modeling choice, not just data-loader housekeeping.

## Make a T4-sized training configuration explicit

The run uses a four-bit backbone with LoRA rank 32 and alpha 64, targeting attention and MLP projections. The microbatch is one, with eight accumulation steps. The learning rate is 0.0001, the schedule is cosine with 3% warmup, and the seed is 3407. It completes one epoch over the retained training examples.

These are settings for the measured run, not a claim that I conducted an exhaustive hyperparameter search. Quantizing the frozen backbone reduces its storage, while adapter parameters, gradients, optimizer state, activations, and codec preparation still consume resources. “Four-bit training” does not mean every tensor occupies four bits.

Periodic validation uses up to 256 clips every 100 optimizer steps. The first recorded periodic loss is 6.3016 at step 100; the best recorded periodic value is 5.5768 at step 1,600. The final evaluation uses all 1,965 retained validation clips and reports 5.5684.

![Periodic validation loss and checkpoint speech diagnostics](/images/articles/technical/urdu-training.png "Left: periodic validation on up to 256 clips; the final full-validation point uses 1,965 clips. Right: ASR-based diagnostics on only two Urdu prompts, one sample each, with prefix and full-reference CER shown separately.")

The final number and periodic series use different populations. I cannot attribute their small difference solely to another 414 updates. Nor does a small train-validation loss gap prove that overfitting is absent or that speech sounds good. Token likelihood is one diagnostic; generated speech is another.

## Resume the computation, not just the adapter

My recovery code treats a checkpoint as model state plus optimizer state, scheduler state, and RNG state. The cache identity includes dataset, model, codec, and preprocessing information. Saved files are verified with hashes, and the remote pointer is updated atomically after a usable checkpoint exists.

Restoring an adapter while restarting the scheduler is a new trajectory. Reusing a token cache after changing serialization can be worse: training may run successfully on the wrong representation. These are failures that a decreasing loss might not expose immediately.

A later workflow using the UrduTTS Arrow source reached preparation of 40,225 training clips, about 63.65 hours, and 11,484 validation clips, about 18.24 hours. It then stopped before optimization because the required checkpoint reserve was approximately 5.07 GiB while free space was about 4.83 GiB. Those prepared hours are not additional completed training.

That failure led to storage handling that can reclaim unchanged generated WAV files only after validating their source, manifest, and token-cache identities. Unknown, modified, or reference files are not interchangeable with disposable intermediates. Disk space was a training constraint alongside VRAM.

## The final checkpoint was not the best speech diagnostic

The checkpoint report samples three prompts once per checkpoint. Only two are Urdu; the third is Pashto and is excluded from the Urdu aggregate. This is a small diagnostic set, not a corpus-level benchmark.

For those two Urdu prompts, the truncation-aware prefix CER improves from about 0.8437 near the base checkpoint to 0.1047 at step 1,750, then worsens to 0.5132 at the final step. Prefix WER follows a similar pattern: 1.0000, 0.1571, then 0.6765. The final short-prompt sample includes a sustained hum; longer generation is also confounded by the roughly 17-second generation cap.

Prefix CER searches for an appropriate reference prefix when generation is capped. It can forgive missing suffixes and reward an early stop. I therefore retain full-reference CER beside it in the plot and downloadable data. A better prefix metric is not automatically better complete speech.

The report also calibrates ASR on 40 human-audio clips, yielding roughly 25.3% CER. That uses a different sample set from the two generated prompts. It cannot establish that a synthesized checkpoint outperforms human speech. It establishes that the ASR proxy itself has substantial error on this material.

## What remains before the agent claim

The next evaluation needs a larger fixed Urdu prompt set, multiple generation seeds, duration and termination checks, and human listening assessments separated into intelligibility, naturalness, and pronunciation. Emotion and speaker control need their own conditioning design and held-out tests; neither follows from lower language-adaptation loss.

I would select a checkpoint with a declared protocol rather than pick the lowest number from two repeatedly inspected prompts. The saved diagnostics suggest which failures to investigate, but do not support a deployment-quality claim.

The [numeric extracts](/experiments/research/evidence.json), [checkpoint CSV](/experiments/research/urdu-checkpoints.csv), [validation CSV](/experiments/research/urdu-validation.csv), and [plotting script](/experiments/research/analyze.py) reproduce the figures without redistributing source audio. They preserve the distinction between the completed ASLP run, later preparation work, and the emotionally aware agent still to be built.
