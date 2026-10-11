# A Vision Model's Score Needs a Denominator

In my multilingual visual question-answering evaluation project, I separate generating predictions from scoring them. That lets me rerun evaluation without paying for inference again. It also makes an uncomfortable question visible: which examples actually made it into the average?

## Successful answers are a subset

The pipeline records predictions and errors in JSONL. Evaluation selects the latest record for each combination of track, split, example ID, image variant, and task. That keeps retries from being counted as new examples.

Before scoring, it treats an empty or special-token-only prediction as an error, even if the request was marked successful. A completed request isn't necessarily an answer.

Consider this hypothetical comparison, not a result from my benchmark:

```python
runs = {
    "A": {"attempted": 100, "successful": 60, "mean_f1": 0.84},
    "B": {"attempted": 100, "successful": 100, "mean_f1": 0.80},
}
for name, run in runs.items():
    coverage = run["successful"] / run["attempted"]
    print(name, coverage, run["mean_f1"])
# A 0.6 0.84
# B 1.0 0.8
```

A has a higher score over its successful answers. B answered every attempted example. I can't call A the better system from those two averages alone. The failed examples could be systematically harder, or concentrated in one language. It's the same problem as grading a class after quietly removing the unfinished exam papers.

My evaluator reports attempted and successful counts, errors, and latency alongside answer scores. For QA, I also need to distinguish successful requests from scored rows: scoring requires a reference answer and the selected split and image variant.

## Similarity doesn't establish correctness

Exact match is easy to interpret but sensitive to wording. My implementation strips surrounding whitespace and case-folds strings; it doesn't normalize every punctuation difference or paraphrase.

BERTScore compares contextual token embeddings and reports precision, recall, and F1. It can recognize similarity that exact match misses, but it isn't a factual verifier. A fluent answer about the wrong cultural object can still share substantial language with the reference. The [BERTScore implementation](https://github.com/Tiiiger/bert_score) also documents why model and tokenizer choices affect scores.

I record the scoring model, tokenizer setting, IDF setting, baseline rescaling, and package version where available. My evaluator uses `bert-base-multilingual-cased` and labels the result a local estimate. Those settings don't establish equivalence with an official competition scorer.

## Keep language tracks visible

The evaluator calculates a micro average over scored examples and a macro average over language-track means. Micro gives larger tracks more influence. Macro gives each included track equal weight.

Neither average tells me everything about a missing track. The code excludes tracks with no score from the macro calculation, so I need to inspect per-track counts rather than interpret that macro value as complete multilingual coverage.

The project also makes separate image-evidence requests. Their output includes visible details, image text, location clues, and uncertain inferences. Parsing those fields checks structure. Human review is still needed to judge whether the details are actually visible and whether the cultural claims are supported.

Before comparing two models, I would fix the same example set, inspect failures by track, and review a sample of answers against their images. A slightly higher F1 is interesting. Knowing exactly what it was calculated over makes it useful.

[Prediction selection, scoring, and review-sheet generation](https://github.com/hassan-31x/semeval-model-eval/blob/main/evaluate_run.py).
