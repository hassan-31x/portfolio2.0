# Portfolio UI and SEO audit

Audit date: 2026-10-01. Scope: the local production build, public portfolio routes, and the supplied Pratham and Sleek reference codebases. Production deployment and real-user traffic were not inspected.

## Result

The local production build, TypeScript checks, and browser checks pass. The reference layout now uses a 715px centered column, Satoshi typography, side rails, compact navigation, two-column projects, and Sleek's centered attribution footer with Muhammad Hassan's details. Existing technology stack widgets and portfolio content were preserved.

The browser audit covered `/`, `/projects`, `/about`, `/blogs`, `/contact`, `/search?q=Next.js`, a published blog article, and `/blogs/page/1`. All eight returned HTTP 200, had one H1, and had no broken images or missing image alt attributes. No page errors or horizontal page overflow were found at 320, 390, 768, and 1440px. Automated axe WCAG 2 A/AA and WCAG 2.1 AA checks returned zero violations in light and dark themes. Automated checks do not establish complete accessibility compliance.

## Confirmed fixes

| Priority | Finding and evidence | Impact and implemented fix | Confidence |
|---|---|---|---|
| P1 | Theme snapshots could overlap, and the original reveal used an SVG mask with browser-sensitive sizing and default snapshot blending. | Shared transition lock; authoritative current DOM theme; one guarded theme update; a 450ms circular clip reveal; explicit snapshot ordering and blend settings; interrupted transitions and reduced-motion fallback. Ten sequential toggles produced exactly ten theme attribute changes; rapid clicks and skipped transitions passed. | High for tested cases; cross-browser behavior remains to be tested. |
| P1 | Heading words and their backgrounds used separate viewport observers; backgrounds waited an extra second. About's tall timeline required 60% visibility. | One heading observer now drives both elements; shorter coordinated background delay; timeline triggers on partial visibility. Fast scrolling and a 320px mobile timeline passed browser checks. | High |
| P1 | Robots and sitemap routes were misplaced, and two sitemap generators competed. Blog links and CMS hooks included obsolete `/posts` paths. | Root metadata routes and a single sitemap generation path; `/blogs` article links, preview URLs, canonical URLs, and revalidation paths; published-only CMS sitemaps. Robots and all three sitemap endpoints returned HTTP 200. | High |
| P1 | Contact interactions targeted a missing endpoint or reported success without delivering mail. | Direct email/WhatsApp links and an honestly labeled email-draft form. No claim of server-side delivery. | High |
| P2 | The content column was 896px, while Pratham specifies 715px. Inner pages added 40px outer padding and up to 96px top spacing. | Shared 715px measure, consistent 16px section insets and compact page introductions; archive results use two columns within the narrower measure. Floating navbar measured 715px at rest and approximately 658px after scrolling, positioned 10px below the viewport top. | High |
| P2 | Contribution HTML included dates outside an exact trailing-year interval; chart alignment was left-biased. | UTC filtering includes today and the preceding 364 dates, excludes future dates, and centers the calendar on desktop. Public-data parsing, 365 dates, future exclusion, and leap-year boundaries passed. Mobile provides horizontal calendar scrolling without page overflow. | High |
| P2 | Shared sections rendered duplicate divider borders and inconsistent shadows. | Single section boundary rules, matching side rails, consistent project grid separators, and theme-aware form borders. | High |
| P2 | Metadata, social cards, and headings used template defaults or inconsistent paths. | Owner-specific titles/descriptions; page canonicals; article metadata; Open Graph and Twitter image handling; Person and WebSite JSON-LD; search noindex; pagination canonical rules; proper H1 structure. | High |
| P2 | The favicon did not match the portfolio identity. | Editable minimal MH mark created in Figma and exported as SVG, ICO, Apple touch icon, and 192/512px manifest icons. Icon and manifest endpoints returned HTTP 200. | High |
| P3 | Font and presentation differed from the references. | Locally hosted Satoshi variable font; compact inline hero; rotating professional titles; compact social links; preserved stack interaction; Sleek-style footer attribution. Desktop and mobile screenshots visually reviewed. | High |

Figma source: https://www.figma.com/design/gF27ieBzfFvOSzs794FlHQ

## Verification and limits

- Production build passed, including prerendering published CMS content. Existing warnings remain in unused/template components and seed files; no new build errors.
- TypeScript `--noEmit --incremental false` passed; targeted lint passed. Full lint passed with existing template/seed warnings.
- Browser interaction checks exercised normal/repeated/rapid theme clicks, persisted preference, reduced motion, missing View Transition API, and skipped transitions.
- The generated contribution calendar uses actual public GitHub data with an hourly cache and a profile-link fallback if upstream fetching fails. Cached data can lag current activity by up to an hour.
- Local canonical and sitemap origins resolve to `http://localhost:3000` from the local environment. The deployed `NEXT_PUBLIC_SERVER_URL` must contain the final HTTPS domain. This is a deployment check, not proof of an incorrect live domain.
- Real-user Core Web Vitals, field performance, indexing, Search Console, and rankings were not measured. Local build output is not a substitute for these metrics.
- Browser coverage used Chromium. Safari/Firefox, screen-reader use, and human keyboard review remain useful release checks.
- A bundled SEO HTML parser could not run because its Python HTML dependency was unavailable. DOM inspection, source review, and HTTP checks supplied the metadata/crawl evidence instead. No unsupported performance or ranking score is claimed.

## Follow-up priorities

There are no open P0 or P1 defects in the tested local scope. See `ACTION-PLAN.md` for deployment verification and optional future work.
