# Research article provenance

Editorial audit for the November 2026 technical articles. Local project files were read without modifying the research repositories. Public experiment assets contain derived numeric metrics only, not the underlying task media, questions, references, or audio.

## Urdu

Local source: `Habib/sem7/dl/project/orpheus-ft-aslp`.

- `configs/aslp50h.json`, `finetune_aslp_50h.py`, `orpheus_utils.py`: architecture/configuration, serializer, all-token objective, filtering, accumulation, checkpoint behavior.
- `METHODOLOGY.md`, `REVIEW.md`, `evaluation_report/README.md`, report tables/intermediate JSON: completed run `aslp50h-r32-lr1e4-seed3407-v2`, duration/count audits, validation history, two-Urdu-prompt checkpoint diagnostics, ASR calibration.
- Public source: https://github.com/hassan-31x/orpheus-ft-urdu
- Separate local `orpheus-ft-urdutts/WORKFLOW_REVIEW.md` and `audio_storage.py`: later prepared UrduTTS data and disk reserve stop BEFORE optimization. These hours are not included in completed-training claims.

Interpretation deliberately avoids the report's broad “no overfitting” conclusion. Periodic and full validation have different denominators. Prefix CER is optimistic under truncation; full CER remains in the figure/CSV. Emotion control is future work, not a measured result. Human-audio ASR calibration and synthesized checkpoint diagnostics use different samples.

## MMCultureQA

Local source: `Habib/sem7/nlp/project/data-processing`.

- `analysis/README.md`: initial mBERT scoring.
- `analysis/official/README.md`, `official_report.json`, `scores/per_item_scores.jsonl`, `scores/official_results.json`, `postprocessing_probes.json`: saved 400-item comparison, scorer identity, per-track metrics and style probes.
- `mmcqa-experiments/mmcqa_exp/sft/{configs,collate,train}.py`: implemented Qwen adapter configuration, last-assistant-header detection in full tokenization, masking, LoRA target exclusions.
- `mmcqa-experiments/plans/`, `phase1/phase2.py`, `local_analysis/ensemble_select.py`, `mbr.py`: planned/implemented SFT and ensemble workflows. No completed adapter/MBR/cascade/fusion outcomes found. Do not present these as performance improvements.
- Public source: https://github.com/hassan-31x/semeval-model-eval

New analysis executed for the article: `public/experiments/research/analyze.py`. Numeric input extracted from saved per-item scores; five shuffled image-grouped folds, seed 3107, and 5,000 paired image-group bootstrap draws. All four tracks for an image remain together. Selection is trained only on the other folds. Baseline Pangea was the strongest saved single system, selected on the full development comparison; analysis remains exploratory, not an unbiased final benchmark. The gold oracle is labeled nondeployable. Original report uncertainty intervals are not substituted for the new grouped interval.

## Theory

All eight figures are newly executed synthetic NumPy experiments, not claims about production models. `public/experiments/core-ai/core_ai.py` defines seeds and assumptions, asserts Gabor gradient agreement, exact batch-gradient moments, corrected constant-gradient Adam behavior, and finite-ensemble squared-error decomposition. JSON outputs preserve measured values. Primary literature links are in each article. Personal project connections describe inspected code/configuration, without inventing completed runs or autobiographical debugging stories.
