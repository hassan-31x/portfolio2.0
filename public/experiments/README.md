# Article experiments

These experiments accompany Muhammad Hassan's portfolio articles. They require Python 3, NumPy, and Matplotlib. Figures are generated with the noninteractive Agg backend.

```bash
python3 -m venv .venv
. .venv/bin/activate
pip install -r requirements.txt
python core-ai/core_ai.py
python research/analyze.py
```

Run from this downloaded directory, retaining the `core-ai/` and `research/` structure. With the original repository structure, figures are written to `public/images/articles/technical/`. Both scripts accept `--output PATH` to choose a different directory. Numeric JSON is written beside its script. Floating-point and plotting differences across platforms are possible.

`core-ai/` contains synthetic teaching experiments, not production model results. The fixed seeds, objective definitions, and numerical assertions are in the script. The bias-variance experiment estimates moments over 400 datasets, rather than knowing the infinite-dataset population moments.

`research/` contains numeric extracts from saved research artifacts. The CSV does not redistribute questions, reference answers, images, or speech. `evidence.json` summarizes the completed Urdu run and saved scorer configuration. `analyze.py` executes a new exploratory five-fold image-grouped selection analysis from saved scores. It does not retrain or regenerate any of the models. The gold oracle is an upper bound using reference scores; it is not deployable.

For exact source provenance and the distinction between completed runs and planned work, see `content/evidence/research-articles.md` in the portfolio repository.
