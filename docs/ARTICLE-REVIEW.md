# Portfolio articles

Written and reviewed on 2026-10-11 using `skills/article-writing/SKILL.md`. The user's request for simple technical prose and no em dashes takes precedence over the skill's punctuation suggestions. No experimental results or performance gains were invented to satisfy its numerical-comparison checklist.

## Evidence used

Reviewed the portfolio's profile, resume, experience, about page, full project inventory, existing GitHub project curation, and article rendering/CMS architecture.

The five article sources are in `content/articles/`. Each is 535–572 whitespace-separated words including code and source links. They distinguish hypothetical examples and proposed improvements from implemented behavior.

| Article | Implementation evidence |
| --- | --- |
| BPE Encoding Has to Remember the Order | `hassan-31x/gpt-tokenizer`: `bpe.py`, `base.py` |
| Why Model Weights Don't Tell You the Training Memory | `hassan-31x/tensorforge`: `src/sim/engine.ts`; PyTorch's activation-checkpointing explanation |
| A Scraped Value Needs Its Evidence Attached | `hassan-31x/college-scraper`: README, crawler, record schema, validation, registry |
| A Vision Model's Score Needs a Denominator | `hassan-31x/semeval-model-eval`: `evaluate_run.py`; upstream BERTScore documentation |
| The Restaurant Agent Shouldn't Invent the Bill | Local `restaurant-agent/agent/index.js` and `restaurant.js`; portfolio project description |

The restaurant article covers the inspected local tool-loop prototype. It does not claim that the proposed validation, idempotency, or transactional persistence already exists in the deployed voice app.

The current Postloom README describes a reference-note-driven writing workspace, which differs from the portfolio's RAG description. No article relies on that description as proof of the current public implementation. Portfolio project copy was left for a separate review.

## X review limitation

TinyFish fetched the profile and used browser automation to scroll the public timeline. Only five recent posts were exposed in that session, with older posts unavailable without login. Search did not recover the AI learning threads. The articles therefore use project artifacts rather than inferred claims about unseen learning posts.

Accessible posts included the [October 4 project-finishing update](https://x.com/hassan_dev31/status/2106787176092770618), [October 3 business-knowledge observation](https://x.com/hassan_dev31/status/2106304376168161544), and [September 29 explainability comment](https://x.com/hassan_dev31/status/2105023549396467849). No claim is made that all recent posts were reviewed.

## Content integration

These articles ship with the repository. Existing CMS posts remain in the combined list, and a published CMS post with the same slug takes precedence. No CMS records were created, updated, deleted, or seeded. Draft preview still queries Payload's draft content.

Edit the Markdown or manifest, then run `npm run articles:build`. The generated `src/content/articles.json` uses the existing Lexical renderer and code blocks. `npm run articles:check` verifies that generated content matches its sources, covers exist, slugs are unique, article lengths stay within bounds, and prohibited dashes are absent.

Bundled articles do not appear as editable records in Payload Admin. To remove one, remove its manifest entry and regenerate. Unpublishing a same-slug CMS override reveals the bundled original; remove that manifest entry too if the article must disappear entirely.

The homepage, blog list, individual routes, paginated list, search API, and posts sitemap use the combined collection. If the CMS query fails, the bundled articles remain available and a sanitized server warning is logged.

## Covers

Five original covers were generated separately with the built-in image generation tool. No internet stock images were used. Originals remain in Codex's generated-image directory; optimized 1536×1024 WebP files are in `public/images/articles/` (about 71–131 KB each). Each cover has descriptive alt text and is used in the article body, lists, and social metadata.
