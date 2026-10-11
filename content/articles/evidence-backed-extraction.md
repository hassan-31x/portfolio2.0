# A Scraped Value Needs Its Evidence Attached

I built UniScrape to turn university websites into structured admissions records. A deadline looks easy to extract until the same site contains last year's prospectus, a department page, and a different date for international applicants. Getting a date-shaped string is easy. Knowing what it applies to takes more work.

## Keep discovery separate from assertion

My crawler collects HTML and PDFs, normalizes their text, and discovers candidate evidence. A Playwright helper handles pages that need JavaScript rendering. Those candidates are leads for investigation, not final admissions facts.

An agent then reads the collected material, investigates gaps, and fills a structured record. I keep the value together with its scope, source IDs, evidence excerpts, and verification status. A citation is the receipt for the assertion: it gives the next person something concrete to inspect.

Here's an illustrative fact object using the project's schema. The institution and deadline are invented for this example:

```json
{
  "value": "15 January 2027",
  "status": "verified",
  "scope": "2027 undergraduate intake, domestic applicants",
  "source_ids": ["admissions-page"],
  "evidence": [{
    "source_id": "admissions-page",
    "excerpt": "Domestic undergraduate applications close 15 January 2027.",
    "location": "Application deadlines"
  }],
  "notes": null
}
```

The date alone cannot distinguish undergraduate from postgraduate admissions, or this cycle from the previous one. The scope makes those distinctions explicit. I can normalize the date for filtering while retaining the original wording as evidence.

## Valid JSON is only the first check

I validate the record with JSON Schema, then run additional checks over its citations. The validator checks that source IDs are unique, references point to existing sources, and a verified fact includes evidence. It also checks that an evidence item's source appears in that fact's source list.

A simplified version of that last rule is:

```python
for fact in facts:
    cited = set(fact["source_ids"])
    for evidence in fact["evidence"]:
        assert evidence["source_id"] in cited
        assert evidence["source_id"] in known_source_ids
```

These checks catch broken references. They don't establish that an excerpt actually proves the value, or that the agent selected the right academic cycle. That still requires reading the source in context. A perfectly shaped record can contain a perfectly wrong deadline (annoyingly tidy).

## Conflicts deserve their own place

If two sources disagree, I preserve the competing values and source references in a conflict entry. I first check whether they describe different applicant groups or cycles. If they really contradict each other and I can't resolve it, the disagreement stays visible.

Missing information stays explicit too. The record supports unresolved questions with reasons such as ambiguous information, a crawl limit, or a requirement to contact the institution. An empty field should tell me where research stopped, rather than invite a plausible guess.

The publishing command validates the record before copying it into the dashboard's data directory and updating the registry. That gives me a clean boundary between unfinished research and a record the interface can display. Publication here means it passed the implemented validation, not that every assertion has been independently audited.

For the next iteration, I would add review cases that deliberately pair a real excerpt with the wrong scope. That would test the part structural validation cannot: whether the evidence supports this particular claim.

[Record schema](https://github.com/hassan-31x/college-scraper/blob/main/schema/admissions.schema.json), [citation validation](https://github.com/hassan-31x/college-scraper/blob/main/uni_scrape/validation.py), and [publication boundary](https://github.com/hassan-31x/college-scraper/blob/main/uni_scrape/registry.py).
