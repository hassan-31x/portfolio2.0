# MMCultureQA: Changing the Scorer Changed Which Model I Would Choose

My culturally aware multimodal QA project is built around [MMCultureQA, SemEval 2027 Task 6](https://mmcultureqa-semeval27.github.io/tasks/). The task asks models to answer culturally grounded questions about images across languages and dialects. My current work focuses on the textual track: English, Modern Standard Arabic, Egyptian Arabic, and Levantine Arabic.

The most useful result so far was not a larger model winning. It was finding that the evaluator, answer format, and grouping of examples could change the conclusion. This post follows my saved model comparisons, a new grouped selection experiment, and the fine-tuning and ensemble code that is implemented but does not yet have measured training results.

## Freeze the comparison population

For the four-model comparison I used the first 100 official development items per track: 400 question-language pairs, but only 100 shared image IDs. Each image appears across four tracks. Treating this as 400 independent visual examples would overstate the diversity of the sample.

The compared systems are Qwen3.5-9B, Qwen3.5-4B, Gemma4-12B, and CulturalPangea7B. The saved study uses four-bit NF4 inference on Kaggle's two-T4 environment, a shared prompting protocol, and a 128-token generation cap. The results describe that quantized inference setup. They are not controlled evidence that one underlying architecture is universally stronger.

A separate baseline workflow generated 10,000 answers and includes its own coverage and format audits. I keep those artifacts separate from the 400-item comparison rather than borrowing their larger sample count for these model rankings. The code and reports are in my [evaluation repository](https://github.com/hassan-31x/semeval-model-eval).

## The metric backbone was part of the experiment

My initial analysis used BERTScore with `bert-base-multilingual-cased`. The official scorer uses `jhu-clsp/mmBERT-base`, layer 17, without IDF weighting or baseline rescaling in the saved configuration. I pinned the scorer implementation and encoder revision before rescoring the existing answers.

| System | Initial mBERT macro F1 | Official mmBERT macro F1 |
| --- | --- | --- |
| Qwen3.5-9B | 0.73230 | 0.70375 |
| Qwen3.5-4B | 0.73094 | 0.71822 |
| Gemma4-12B | 0.73311 | 0.72131 |
| CulturalPangea7B | 0.74595 | 0.73033 |

Qwen9B moves from slightly ahead of Qwen4B to behind it. Pangea remains first among these four. The absolute scores across columns are not interchangeable measurements on one common scale: the embedding model changed. The within-column rankings are the relevant comparison.

The pinned official repository commit is `7ec66a47acb82195a288525560c4acb26cb8b7ba`; the encoder revision is `c5955035435e2bf121cde7f3c8863ef52ff35d82`. Keeping those identifiers with the predictions makes the evaluation repeatable when upstream dependencies move. The [task repository](https://github.com/mmcultureqa-semeval27/mmcultureqa) defines the official protocol.

## A macro average can hide a language decision

| System | English | MSA | Egyptian | Levantine |
| --- | --- | --- | --- | --- |
| Qwen3.5-9B | 0.79158 | 0.68973 | 0.66142 | 0.67226 |
| Qwen3.5-4B | 0.78614 | 0.71814 | 0.68394 | 0.68467 |
| Gemma4-12B | 0.79263 | 0.72482 | 0.68008 | 0.68770 |
| CulturalPangea7B | 0.78943 | 0.73658 | 0.68448 | 0.71083 |

These are official-scorer development means on 100 items per track. Gemma has the highest English score here, while Pangea has the highest Arabic-track means. This suggests a track-based selector worth testing. It does not establish that the differences will persist on new images, especially where margins are small.

Because track counts are equal and coverage is complete in this extract, the macro mean equals the pooled item mean. If failures were dropped unevenly, that relationship could change. I retain item IDs, counts, and scoring failures alongside means rather than letting successful-output filtering silently define the denominator.

## Probe the metric without mistaking the probe for knowledge

The saved postprocessing study raises Gemma's macro score from 0.72131 to 0.73215 with formatting cleanup. Another diagnostic, prepending question text to Qwen9B's answer, scores 0.72648 instead of 0.70375. The echo-question baseline itself scores around 0.66647.

Those probes show that embedding similarity responds to wording and repeated context. They do not prove the model's cultural knowledge was already correct, or justify submitting question echoes as better answers. Any formatting policy should be fixed on development data and evaluated separately from improvements in factual correctness.

The study also includes an LLM-judge analysis of 100 English answers per system. That is an additional, fallible view of one track. It cannot stand in for grounded multilingual human assessment or explain every Arabic error. I would inspect image evidence, reference ambiguity, dialect choice, and answer specificity when auditing disagreement between a judge and BERTScore.

## Test a selector without letting the same image leak across folds

I ran a new exploratory re-analysis from the saved per-item numeric scores. The selector chooses the highest-scoring model for each track using four-fifths of image IDs, then uses that model's predictions on the held-out fifth. All four language versions of an image stay in one fold. The process repeats over five grouped folds with a fixed seed.

Choosing the best track-model pair on all 400 scored items and reporting its score on those same items would favor choices that benefited from development noise. The grouped procedure keeps each evaluation image out of the fitting decision.

| Development analysis | Official macro F1 |
| --- | --- |
| Strongest single system, Pangea | 0.73033 |
| Five-fold track selector | 0.72608 |
| Gold-answer oracle upper bound | 0.76554 |

The paired difference between the selector and Pangea is −0.00425. A paired bootstrap resampling the 100 image-ID groups gives a 95% percentile interval of approximately [−0.01052, 0.00184]. This does not support an improvement. The bootstrap describes uncertainty in this development comparison; it is not a held-out test-set claim and does not include every source of selection uncertainty.

![Official rescoring and grouped model-selection results](/images/articles/technical/mmcqa-analysis.png "Saved development predictions rescored with two embedding backbones, followed by a new image-grouped selector analysis. The gold oracle uses reference scores and is not a deployable ensemble.")

The oracle chooses the best of the four answers using the gold reference on each item. It shows candidate complementarity under the metric, not an attainable submission score. The gap motivates further work but does not tell me how much a reference-free router can recover.

## Fine-tuning: labels matter more than a short config

The implemented SFT path targets Qwen3.5-4B with four-bit NF4, double quantization, fp16 computation, and LoRA rank 16, alpha 32, dropout 0.05. Two configurations compare learning rates 0.0001 and 0.0002. Batch four with four accumulation steps gives an intended effective batch of 16; runtime limits mean the one-epoch setting is a cap, not proof of a completed epoch.

The vision tower is excluded from LoRA targets. Target discovery follows the eligible quantized linear modules rather than assuming every Qwen attention block uses an identical list of projection names.

More importantly, the collator trains on the assistant answer. It builds the inference-style prefix with thinking disabled, appends the answer and end marker, tokenizes the complete sequence, and finds the last assistant-header token sequence inside it. Prompt and padding labels are set to −100. Missing headers or empty answer spans raise an error.

```python
# Schematic: start is found in the fully tokenized sequence.
labels = torch.full_like(input_ids, -100)
labels[start:end] = input_ids[start:end]
labels[attention_mask == 0] = -100
```

Independently tokenizing the prompt and treating its length as the answer boundary can fail when tokenization changes at the join. Searching the actual sequence avoids that particular mismatch. The intended training population is 40,000 track rows sharing 10,000 images. The planned validation-loss slice uses development IDs 900–949, separate from the first-500 comparison slice. Development and test examples are not training data.

## Ensembles that remain experiments

The repository contains paths for minimum Bayes risk selection, cascades, and fusion. MBR uses agreement among candidate answers as a proxy for utility; correlated wrong answers can agree strongly. A router or weighting policy must be learned inside training folds, with at least three candidates for meaningful agreement comparisons in this setup.

The cascade passes same-track hints. Fusion balances candidate positions using a stable hash. Both choices aim to avoid cross-language information leakage and systematic position preference. Pangea and Qwen also require separate dependency environments in the current implementation, which is a real constraint on a reproducible multi-model runner.

I do not have completed adapter or MBR/cascade/fusion results to report. The measured outcomes here are baseline predictions, rescoring and format probes, and the newly executed grouped selector. Keeping that boundary explicit is more useful than presenting an ensemble architecture as a result.

The [score extract](/experiments/research/mmcqa-development-scores.csv), [analysis script](/experiments/research/analyze.py), and [analysis output](/experiments/research/analysis.json) reproduce the new selection study without including images, questions, or reference answers. The next meaningful milestone is a frozen, image-disjoint evaluation protocol for tuned adapters and reference-free selection, followed by a single final test evaluation.
