# GitHub project curation

Reviewed: 2026-10-01. Source: the 40 newest public repositories, ordered by creation date from the GitHub API. TinyFish and the GitHub connector also confirmed the public profile and repository inventory.

Selection favors substantive implemented functionality, runnable/documented entry points, dependency evidence, and tests or committed outputs. This is a source review, not a claim that every project was executed end to end. Public frontend landing pages were opened and returned HTTP 200. No private repositories were published.

Ten additions preserve the existing four projects, giving 14 projects on `/projects`; the homepage keeps its four featured projects.

## Selected projects and stack evidence

### TensorForge

Repository: [tensorforge](https://github.com/hassan-31x/tensorforge). Reviewed tree: `07e2a606fa9ad2cc3a814c6159056eab95c0dd8a`.

Stack: Next.js, React, TypeScript, React Flow.

- Build model graphs, connect GPUs, and compare estimates for memory, throughput, energy, and training cost.
- Includes reference model presets, profiling views, local saves, JSON import/export, and canvas/report exports.
- An educational simulator: estimates and training animations do not train models or quote live cloud prices.

Evidence: [README.md](https://github.com/hassan-31x/tensorforge/blob/main/README.md), [package.json](https://github.com/hassan-31x/tensorforge/blob/main/package.json), [src/sim/engine.ts](https://github.com/hassan-31x/tensorforge/blob/main/src/sim/engine.ts), [src/sim/topology.ts](https://github.com/hassan-31x/tensorforge/blob/main/src/sim/topology.ts), [src/components/Studio.tsx](https://github.com/hassan-31x/tensorforge/blob/main/src/components/Studio.tsx).

### UniScrape

Repository: [college-scraper](https://github.com/hassan-31x/college-scraper). Reviewed tree: `1338d0d0c9bb07e0cf398611f59d8187ddb34a1d`.

Stack: Python, Playwright, HTTPX, Beautiful Soup, JSON Schema, PyPDF.

- Crawls HTML and PDFs, prioritizes admissions links, and extracts evidence candidates; Playwright renders JavaScript-only pages.
- Validates agent-produced records against JSON Schema and publishes them to a searchable admissions dashboard.
- Keeps citations, verification status, conflicting information, and unresolved questions attached to the records.

Evidence: [README.md](https://github.com/hassan-31x/college-scraper/blob/main/README.md), [pyproject.toml](https://github.com/hassan-31x/college-scraper/blob/main/pyproject.toml), [package.json](https://github.com/hassan-31x/college-scraper/blob/main/package.json), [uni_scrape/crawler.py](https://github.com/hassan-31x/college-scraper/blob/main/uni_scrape/crawler.py), [uni_scrape/registry.py](https://github.com/hassan-31x/college-scraper/blob/main/uni_scrape/registry.py).

### Visual QA Benchmarks

Repository: [semeval-model-eval](https://github.com/hassan-31x/semeval-model-eval). Reviewed tree: `a50442005b5c93841f97e229c67e1f880f9c316b`.

Stack: Python, PyTorch, Transformers, Hugging Face Datasets, Pillow, BERTScore.

- A SemEval cultural visual question-answering research pipeline with separate question-answering and image-evidence requests.
- Supports Hugging Face inference and a local LM Studio runner, resumable predictions, image variants, and per-language comparisons.
- Reports BERTScore, exact match, coverage, latency, and structured visual-output checks; no benchmark placement is claimed.

Evidence: [README.md](https://github.com/hassan-31x/semeval-model-eval/blob/main/README.md), [requirements.txt](https://github.com/hassan-31x/semeval-model-eval/blob/main/requirements.txt), [local/requirements.txt](https://github.com/hassan-31x/semeval-model-eval/blob/main/local/requirements.txt), [run.py](https://github.com/hassan-31x/semeval-model-eval/blob/main/run.py), [models.py](https://github.com/hassan-31x/semeval-model-eval/blob/main/models.py), [evaluate_run.py](https://github.com/hassan-31x/semeval-model-eval/blob/main/evaluate_run.py), [compare.py](https://github.com/hassan-31x/semeval-model-eval/blob/main/compare.py).

### Crosswalk RL

Repository: [road-crossing-rl](https://github.com/hassan-31x/road-crossing-rl). Reviewed tree: `4dcbe8ad42474f097072e6fe59e6dbfb8bfce1d0`.

Stack: Python, PyTorch, Gymnasium, PyBullet, NumPy, Matplotlib.

- A collaborative reinforcement-learning project with a custom traffic simulation, coordinated signals, collision-aware rewards, and sequential crossings.
- Includes a PyTorch DQN agent, replay buffer, training/evaluation scripts, and checkpoint save/load support and a training-progress plot.
- Built with @AbdullahShheik and @aanasakhtar. My contributions include environment improvements, zebra-crossing support, and multi-round navigation.

Evidence: [README.md](https://github.com/hassan-31x/road-crossing-rl/blob/main/README.md), [requirements.txt](https://github.com/hassan-31x/road-crossing-rl/blob/main/requirements.txt), [dqn_agent.py](https://github.com/hassan-31x/road-crossing-rl/blob/main/dqn_agent.py), [gym_crossroad_env.py](https://github.com/hassan-31x/road-crossing-rl/blob/main/gym_crossroad_env.py), [train_agent.py](https://github.com/hassan-31x/road-crossing-rl/blob/main/train_agent.py), [evaluate_agent.py](https://github.com/hassan-31x/road-crossing-rl/blob/main/evaluate_agent.py).

This is a collaborative fork, not an unmodified third-party project. Commit history verified `hassan-31x` changes to the environment, zebra-crossing support, and multi-round navigation. Collaborators are credited in the public details.

### BytePair Tokenizer

Repository: [gpt-tokenizer](https://github.com/hassan-31x/gpt-tokenizer). Reviewed tree: `ad4ef6f6a65aade7e73e67acffae2e9b7f83e873`.

Stack: Python.

- Learns frequent byte-pair merges from a text corpus and builds a configurable vocabulary without a tokenizer library.
- Supports UTF-8 encoding and decoding, model save/load, human-readable vocabulary export, and round-trip checks.
- Includes an example trained vocabulary and merge summary; the implementation uses Python's standard library.

Evidence: [README.md](https://github.com/hassan-31x/gpt-tokenizer/blob/main/README.md), [base.py](https://github.com/hassan-31x/gpt-tokenizer/blob/main/base.py), [bpe.py](https://github.com/hassan-31x/gpt-tokenizer/blob/main/bpe.py), [main.py](https://github.com/hassan-31x/gpt-tokenizer/blob/main/main.py).

### Pattern Search Benchmarks

Repository: [string-matching-algo-comparison](https://github.com/hassan-31x/string-matching-algo-comparison). Reviewed tree: `23f0e29ae26ffadd99e1ecbde850cdcf219c6b8b`.

Stack: Python, NumPy, Matplotlib.

- Implements Naive, Rabin–Karp, KMP, Boyer–Moore–Horspool, and frequency-based anchor selection (FBAS).
- Measures character comparisons and runtime across natural text, DNA, synthetic inputs, and varying text/pattern lengths.
- Includes benchmark scripts, stored results, plots, and a written analysis of algorithm behavior.

Evidence: [README.md](https://github.com/hassan-31x/string-matching-algo-comparison/blob/main/README.md), [algorithms.py](https://github.com/hassan-31x/string-matching-algo-comparison/blob/main/algorithms.py), [benchmark.py](https://github.com/hassan-31x/string-matching-algo-comparison/blob/main/benchmark.py), [datasets.py](https://github.com/hassan-31x/string-matching-algo-comparison/blob/main/datasets.py), [plot_results.py](https://github.com/hassan-31x/string-matching-algo-comparison/blob/main/plot_results.py).

### Blood Donation Manager

Repository: [blood-donation-system](https://github.com/hassan-31x/blood-donation-system). Reviewed tree: `640e916592586800b7bd7c5c644dbd9d6735718a`.

Stack: Python, Streamlit, SQL Server, pyodbc, Matplotlib.

- A database-management course project with separate donor, hospital, and administrator workflows.
- Handles donor registration, appointments, donation history, blood requests, inventory, dispatch, and blood-drive management.
- Includes a SQL Server schema and local setup instructions; requires a configured database to run.

Evidence: [README.md](https://github.com/hassan-31x/blood-donation-system/blob/main/README.md), [requirements.txt](https://github.com/hassan-31x/blood-donation-system/blob/main/requirements.txt), [app.py](https://github.com/hassan-31x/blood-donation-system/blob/main/app.py), [pages/donor.py](https://github.com/hassan-31x/blood-donation-system/blob/main/pages/donor.py), [pages/hospital.py](https://github.com/hassan-31x/blood-donation-system/blob/main/pages/hospital.py), [pages/admin.py](https://github.com/hassan-31x/blood-donation-system/blob/main/pages/admin.py), [query.sql](https://github.com/hassan-31x/blood-donation-system/blob/main/query.sql).

### Inspectr

Repository: [web-analyzer](https://github.com/hassan-31x/web-analyzer). Reviewed tree: `2411d59420cec1847ebd1f113d6c884188b4f6bb`.

Stack: Next.js, React, TypeScript, Tailwind, Cheerio, JSDOM.

- Fetches a page's HTML through a Next.js API route and inspects title tags, descriptions, canonicals, viewport settings, and structured data.
- Checks Open Graph/Twitter metadata and response headers, then presents categorized findings in the interface.
- Provides HTML and header-based checks, rather than a browser performance benchmark or real-user Core Web Vitals measurement.

Evidence: [README.md](https://github.com/hassan-31x/web-analyzer/blob/main/README.md), [package.json](https://github.com/hassan-31x/web-analyzer/blob/main/package.json), [src/app/api/analyze/route.ts](https://github.com/hassan-31x/web-analyzer/blob/main/src/app/api/analyze/route.ts), [src/app/analyze/page.tsx](https://github.com/hassan-31x/web-analyzer/blob/main/src/app/analyze/page.tsx).

### PFAB Security Lab

Repository: [pfab-vulnerability-app](https://github.com/hassan-31x/pfab-vulnerability-app). Reviewed tree: `dae65f6ebc18aeef597471e56ec1468aa09fe713`.

Stack: Python, FastAPI, Next.js, TypeScript, MongoDB, Prisma, OpenAI, Twilio.

- Combines a Next.js finance interface, authentication and role-based flows with a Python FastAPI backend for WhatsApp integration.
- Includes transaction handling, AI-assisted message processing, MongoDB access, Docker configuration, and documented security exercises.
- Intentionally vulnerable for education and testing; this is not presented as a production-secure financial product.

Evidence: [README.md](https://github.com/hassan-31x/pfab-vulnerability-app/blob/main/README.md), [frontend/package.json](https://github.com/hassan-31x/pfab-vulnerability-app/blob/main/frontend/package.json), [backend/requirements.txt](https://github.com/hassan-31x/pfab-vulnerability-app/blob/main/backend/requirements.txt), [backend/app.py](https://github.com/hassan-31x/pfab-vulnerability-app/blob/main/backend/app.py).

README correction: the README names Flask, but `backend/app.py` imports FastAPI and the dependency manifest installs FastAPI/Uvicorn. The portfolio therefore lists FastAPI. README-only test claims were not repeated because the inspected frontend manifest does not provide a test script. The live landing page contains marketing statistics; the portfolio text does not repeat these unverified numbers.

### RISC-V Processor

Repository: [risc_v_processor](https://github.com/hassan-31x/risc_v_processor). Reviewed tree: `3d3ee14f6161ea41fddb18804e9b7141bb496e37`.

Stack: Verilog, Vivado.

- Implements instruction decoding, register files, ALU operations, data memory, and control logic across two processor designs.
- The pipelined design includes forwarding and load-use hazard detection; the repository contains simulation testbenches and Vivado artifacts.
- An educational hardware implementation; no physical chip fabrication or hardware performance result is claimed.

Evidence: [single-cycle-processor/sources/RISC_V_Processor.v](https://github.com/hassan-31x/risc_v_processor/blob/main/single-cycle-processor/sources/RISC_V_Processor.v), [pipelined-processor/riscVprocessor.srcs/sources_1/new/RISCV_processor.v](https://github.com/hassan-31x/risc_v_processor/blob/main/pipelined-processor/riscVprocessor.srcs/sources_1/new/RISCV_processor.v), [pipelined-processor/riscVprocessor.srcs/sources_1/new/hazardDetectionUnit.v](https://github.com/hassan-31x/risc_v_processor/blob/main/pipelined-processor/riscVprocessor.srcs/sources_1/new/hazardDetectionUnit.v), [pipelined-processor/riscVprocessor.srcs/sim_1/new/test_processor.v](https://github.com/hassan-31x/risc_v_processor/blob/main/pipelined-processor/riscVprocessor.srcs/sim_1/new/test_processor.v).

## All 40 repositories screened

| Repository | Decision |
|---|---|
| [semeval-model-eval](https://github.com/hassan-31x/semeval-model-eval) | Selected |
| [tensorforge](https://github.com/hassan-31x/tensorforge) | Selected |
| [breakscale](https://github.com/hassan-31x/breakscale) | Not selected: fork without a verified distinctive contribution in this review. |
| [gpt-2](https://github.com/hassan-31x/gpt-2) | Not selected: trainer references inspect without importing it; no README or dependency manifest. |
| [langgraph-learning](https://github.com/hassan-31x/langgraph-learning) | Not selected: practice chapters and notebooks rather than a single packaged application. |
| [langchain-learning](https://github.com/hassan-31x/langchain-learning) | Not selected: introductory learning examples. |
| [college-scraper](https://github.com/hassan-31x/college-scraper) | Selected |
| [pytorch-learning](https://github.com/hassan-31x/pytorch-learning) | Not selected: learning exercises; not a distinct delivered application. |
| [gpt-tokenizer](https://github.com/hassan-31x/gpt-tokenizer) | Selected |
| [open-seo](https://github.com/hassan-31x/open-seo) | Not selected: fork without a verified distinctive contribution in this review. |
| [khaata360](https://github.com/hassan-31x/khaata360) | Not selected: fork without a verified distinctive contribution in this review. |
| [pfab-vulnerability-app](https://github.com/hassan-31x/pfab-vulnerability-app) | Selected |
| [string-matching-algo-comparison](https://github.com/hassan-31x/string-matching-algo-comparison) | Selected |
| [openscreen](https://github.com/hassan-31x/openscreen) | Not selected: fork without a verified distinctive contribution in this review. |
| [dvwa-security-lab](https://github.com/hassan-31x/dvwa-security-lab) | Not selected: retained PFAB as the stronger security-lab portfolio entry. |
| [road-crossing-rl](https://github.com/hassan-31x/road-crossing-rl) | Selected (collaborative work with verified contributions) |
| [secure-architecture-cybersec](https://github.com/hassan-31x/secure-architecture-cybersec) | Not selected: architecture/documentation rather than a runnable application. |
| [treasures-cron-2](https://github.com/hassan-31x/treasures-cron-2) | Not selected: narrow service/cron implementation with limited portfolio documentation. |
| [mr-cron-2](https://github.com/hassan-31x/mr-cron-2) | Not selected: narrow service/cron implementation with limited portfolio documentation. |
| [invoice-builder](https://github.com/hassan-31x/invoice-builder) | Not selected: editor save handler only logs content; persistence is commented out. |
| [shopify-cron-2](https://github.com/hassan-31x/shopify-cron-2) | Not selected: narrow service/cron implementation with limited portfolio documentation. |
| [shopify-cron](https://github.com/hassan-31x/shopify-cron) | Not selected: empty repository. |
| [cron-shopify-2](https://github.com/hassan-31x/cron-shopify-2) | Not selected: narrow service/cron implementation with limited portfolio documentation. |
| [app-use](https://github.com/hassan-31x/app-use) | Not selected: fork without a verified distinctive contribution in this review. |
| [rebrowse-app](https://github.com/hassan-31x/rebrowse-app) | Not selected: fork without a verified distinctive contribution in this review. |
| [blurr](https://github.com/hassan-31x/blurr) | Not selected: fork without a verified distinctive contribution in this review. |
| [superagent](https://github.com/hassan-31x/superagent) | Not selected: fork without a verified distinctive contribution in this review. |
| [web-analyzer](https://github.com/hassan-31x/web-analyzer) | Selected |
| [nextauth-mongo](https://github.com/hassan-31x/nextauth-mongo) | Not selected: starter/authentication implementation rather than a differentiated project. |
| [prompts-for-ai-pages](https://github.com/hassan-31x/prompts-for-ai-pages) | Not selected: prompt collection, not a runnable project. |
| [ai-crypto-landing-page](https://github.com/hassan-31x/ai-crypto-landing-page) | Not selected: smaller landing-page project, lower priority than the selected tools. |
| [portfolio2.0](https://github.com/hassan-31x/portfolio2.0) | Not selected: this portfolio itself. |
| [resume-ai](https://github.com/hassan-31x/resume-ai) | Not selected: lower priority than the ten selected entries; template-derived documentation requires further verification. |
| [ds2-project](https://github.com/hassan-31x/ds2-project) | Not selected: PQ-tree reduce operation is a stub that returns true. |
| [system-prompts-and-models-of-ai-tools](https://github.com/hassan-31x/system-prompts-and-models-of-ai-tools) | Not selected: fork without a verified distinctive contribution in this review. |
| [risc_v_processor](https://github.com/hassan-31x/risc_v_processor) | Selected |
| [ai-restaurant-agent](https://github.com/hassan-31x/ai-restaurant-agent) | Not selected: narrow service/cron implementation with limited portfolio documentation. |
| [device-tracker-on-map](https://github.com/hassan-31x/device-tracker-on-map) | Not selected: small implementation with no README or documented setup. |
| [pearai-app](https://github.com/hassan-31x/pearai-app) | Not selected: fork without a verified distinctive contribution in this review. |
| [blood-donation-system](https://github.com/hassan-31x/blood-donation-system) | Selected |

## Covers

Six concept illustrations were produced with the built-in Codex image-generation tool, not substituted with SVG placeholders. Four frontend previews are actual Chromium screenshots of verified public deployments. Final assets are WebP files under `public/images/projects/`; originals were left in their generated-image location. All ten final assets total approximately 528KB.

Concept illustrations are clearly described as such in alt text; they are not claimed to show a real interface. Full generation prompts are saved in `PROJECT-COVER-PROMPTS.md`.

## Verification

Production build, TypeScript, and targeted ESLint checks passed. Chromium verified 14 cards, ten Code links, ten keyboard-operable Details sections, all image previews, and the unchanged four-card homepage. No horizontal overflow appeared at 320, 390, 640, 768, or 1440px, and axe found no WCAG A/AA violations in either theme. A temporary MongoDB DNS timeout interrupted the initial browser run; the successful rerun suppressed background route prefetching in the test harness and waited for image decoding. External Python/model/database projects were inspected without running their training pipelines or changing their repositories.
