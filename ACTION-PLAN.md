# Portfolio action plan

## Completed

- [x] Narrow the entire public layout to Pratham's 715px measure.
- [x] Restore the original navbar scroll contraction, top offset, and floating shadow while retaining the current layout and theme.
- [x] Center actual GitHub activity and restrict dates to the preceding 365 days including today.
- [x] Use Sleek's centered footer attribution with the owner's details.
- [x] Fix heading/background observer synchronization and mobile timeline triggers.
- [x] Prevent overlapping theme snapshots and handle reduced motion, missing APIs, and interrupted transitions.
- [x] Normalize inner-page padding, page introduction spacing, and archive result columns.
- [x] Correct metadata, published blog URLs, robots, sitemaps, search indexing, structured data, and icon assets.
- [x] Run production build, TypeScript, route, responsive, accessibility, and interaction checks.

## Deployment checks (P2)

1. Verify `NEXT_PUBLIC_SERVER_URL` uses the final HTTPS portfolio domain in deployment. Recheck canonical tags, sitemap URLs, and social image URLs there.
2. Submit the sitemap in Search Console and check that intended public routes are indexed. Search pages deliberately remain noindex.
3. Measure the deployed homepage and a blog article with PageSpeed Insights and real-user Core Web Vitals. Local checks cannot establish live LCP, INP, or CLS.
4. Smoke-test the theme reveal and floating navbar in Safari and Firefox; review keyboard navigation and screen-reader announcements.

## Optional next iteration (P3)

- Replace remaining demonstration About-page collage content with the owner's actual photos when supplied.
- Add project repository links only when real repository URLs are available.
- Add a server-backed contact form only if direct in-site delivery is wanted; the current form opens an email draft and says so.
- Clean up unused template component and seed lint warnings independently of the visual changes.
