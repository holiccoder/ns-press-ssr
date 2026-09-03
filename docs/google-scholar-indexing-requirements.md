# Google Scholar indexing requirements and troubleshooting

Research date: 2026-09-03

## Scope and source hierarchy

The first sections summarize Google's requirements; the live audit and application findings are recorded at the end of this document.

- **Scholar requirement** means the point is stated in Google Scholar's own [Inclusion Guidelines for Webmasters](https://scholar.google.com/intl/en/scholar/inclusion.html) or [Publisher Support](https://scholar.google.com/intl/en/scholar/publishers.html).
- **Google Search guidance** is labeled separately. It is useful because Scholar says its crawler operates similarly to regular Google Search, but it should not be represented as a Scholar-specific inclusion rule.

## Explicit Google Scholar requirements

### Content and article URLs

- The site must consist primarily of scholarly articles (including papers, reports, dissertations, preprints/postprints, drafts, or abstracts). To be considered, each result URL must expose either the article's full text or its **complete author-written abstract**, freely and plainly. Bare bibliographic records are insufficient. The user or crawler must not have to sign in, install software, accept a disclaimer, dismiss an interstitial, click to reveal content, or scroll down before the entire abstract can be read. The abstract belongs in visible page content; an abstract meta tag is not a substitute. [Scholar: content guidelines and abstract FAQ](https://scholar.google.com/intl/en/scholar/inclusion.html#content)
- Put each article and each abstract in a separate HTML or PDF file. Scholar says it cannot effectively index multiple abstracts on one page, multiple papers in one PDF, or one paper split across files. Every paper therefore needs its own unique URL. [Scholar: preparing article URLs](https://scholar.google.com/intl/en/scholar/inclusion.html#indexing)

### Crawlability, availability, and discovery

- Scholar's crawlers must be able to discover and fetch every article URL and revisit it periodically. Article and browse pages must remain available to both users and crawlers; persistent server errors, misconfiguration, slow responses, crawl throttling, or frequent failures can delay coverage or cause papers to drop out. Scholar asks sites to use `5xx` for temporary errors and `4xx` for permanent errors. [Scholar: crawl guidelines](https://scholar.google.com/intl/en/scholar/inclusion.html#crawl)
- A browse interface is necessary. Scholar recommends making every article reachable from the home page through no more than ten simple HTML links. For thousands of papers, provide chronological browsing by publication or record-entry date; for more than 100,000 papers, also expose a small interface listing papers added in the last two weeks. Flash, JavaScript, and form-based navigation are described as hard for Scholar, so a browse-by-date path made only of simple HTML `GET` links should also exist. [Scholar: browse interface](https://scholar.google.com/intl/en/scholar/inclusion.html#crawl)
- `robots.txt` must not block Google's crawlers from article URLs or browse URLs. Scholar recommends blocking large, dynamically generated, non-article spaces (for example, carts, comment forms, and internal-search result pages) when they waste crawl capacity. [Scholar: robots exclusion protocol](https://scholar.google.com/intl/en/scholar/inclusion.html#crawl)

### Bibliographic HTML meta tags

- For journal/repository software, Scholar asks for machine-readable bibliographic metadata and supports Highwire Press (`citation_*`), BE Press (`bepress_citation_*`), and PRISM. Dublin Core is a last resort because its journal citation fields are ambiguous. [Scholar: configuring meta tags](https://scholar.google.com/intl/en/scholar/inclusion.html#indexing)
- The page must provide, at minimum, the article title, the full name of at least the first author, and publication year. In Highwire form these are `citation_title`, one `citation_author` per actual author, and `citation_publication_date`. If any of those three core fields is absent, Scholar says it processes the page as though it has no meta tags. Do not put the journal/repository name in the article-title field, contributors in author fields, or repository ingest date in the publication-date field. [Scholar: required fields](https://scholar.google.com/intl/en/scholar/inclusion.html#indexing)
- Supply the remaining citation fields needed to match a formal reference. For journal/conference papers this normally includes `citation_journal_title` or `citation_conference_title`, volume and issue where applicable, and first page, with ISSN/ISBN and last page as applicable. Metadata values must be correctly HTML-escaped. Omitted or unusually presented key fields can cause misidentification. [Scholar: citation metadata](https://scholar.google.com/intl/en/scholar/inclusion.html#indexing)
- If an HTML abstract has a separate PDF full text, connect it with an absolute `citation_pdf_url` (or `DC.identifier`). Scholar states that, for security reasons, the PDF must be in the same subdirectory as the abstract page. The metadata applies only to the page carrying it; failing to link versions can make Scholar parse the PDF separately without the HTML metadata. Scholar recommends metadata on all versions. [Scholar: linking full-text versions](https://scholar.google.com/intl/en/scholar/inclusion.html#indexing)

### PDF requirements

- Scholar accepts HTML or PDF. A PDF must contain searchable text, be no larger than 5 MB, and contain one complete article rather than several papers or separately downloaded sections. Larger files and scanned page images requiring OCR are directed to Google Books. [Scholar: file formats](https://scholar.google.com/intl/en/scholar/inclusion.html#crawl), [Scholar: publisher PDF FAQ](https://scholar.google.com/intl/en/scholar/publishers.html)
- When a paper is supplied without HTML meta tags, Scholar relies on visual parsing: the title should be the largest text at the top (at least 24 pt in PDF), authors should be adjacent in a slightly smaller 16-23 pt font, and a conventional bibliographic citation or version date should be present. Avoid Type 3 fonts. A standard `References` or `Bibliography` heading and conventionally formatted references help citation extraction. Scholar warns that these loosely defined formats are less reliable than HTML abstract pages with meta tags. [Scholar: content without meta tags and references](https://scholar.google.com/intl/en/scholar/inclusion.html#indexing)
- For an individual-author PDF workflow, Scholar additionally says the file name should end in `.pdf`, with title at the top, authors immediately below on a separate line, and a bibliography section at the end. [Scholar: individual authors](https://scholar.google.com/intl/en/scholar/inclusion.html#overview)

### Redirects and URL moves

- If an article moves, Scholar explicitly requires an HTTP `301` from the old article URL to that article's new URL. Do not redirect old article URLs to the home page; the destination must let the user see at least the abstract. [Scholar: website availability](https://scholar.google.com/intl/en/scholar/inclusion.html#crawl)
- Scholar's inclusion guide does **not** state a `rel="canonical"` requirement. Canonical recommendations below are general Google Search guidance, not an additional Scholar rule.

## Supplemental Google Search guidance

Use these checks to eliminate general Google indexing conflicts while keeping their scope clear:

- A robots `noindex` directive prevents a resource from appearing in Google Search; `nofollow` tells Google not to follow links on that page. For PDFs, the equivalent controls may arrive in the `X-Robots-Tag` response header. Google can read these page-level rules only when `robots.txt` permits crawling, so blocking a URL in `robots.txt` while expecting Google to read its `noindex` is contradictory. [Google Search: robots meta and `X-Robots-Tag`](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag), [Google Search: robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- For duplicate or near-duplicate URLs, Google Search treats redirects and `rel="canonical"` as strong canonical signals and sitemap inclusion as weaker. It recommends self-referential canonicals, consistent signals, and internal links that point to the preferred URL. For PDFs, canonical can be sent as an HTTP header. These are Search practices; Scholar separately requires one unique article URL and its own HTML-to-PDF linkage via `citation_pdf_url`. [Google Search: canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
- Google Search prefers permanent server-side redirects for permanent moves and treats `301`/`308` targets as canonical signals. Scholar's narrower, explicit move instruction is the per-article `301` above. [Google Search: redirects](https://developers.google.com/search/docs/crawling-indexing/301-redirects)

## Timing and escalation

- Scholar says an individual author's conforming paper should normally be found and included within **several weeks**, while new papers are normally added **several times a week**. These are expectations, not a promised deadline. [Scholar: overview and troubleshooting](https://scholar.google.com/intl/en/scholar/inclusion.html#troubleshooting)
- Updates to papers already in Scholar usually take **6-9 months**; Scholar's general help warns they can take a year or longer. Very large sites may take several years to recrawl. After a site-side fix, the inclusion guide gives a broad reflection window of **a few days to 6-9 months**. [Scholar: troubleshooting](https://scholar.google.com/intl/en/scholar/inclusion.html#troubleshooting), [Scholar: search help](https://scholar.google.com/intl/en/scholar/help.html)
- Diagnose first by searching Scholar for the exact titles of several dozen representative papers. Scholar cautions that the `site:` result count is estimated and is not a reliable coverage measure. If included records have wrong titles/authors, prioritize parser and metadata fixes; if metadata is mostly correct but coverage is sparse, prioritize crawl/discovery checks. [Scholar: troubleshooting sequence](https://scholar.google.com/intl/en/scholar/inclusion.html#troubleshooting)
- Escalate only when the guidelines have been implemented and evidence points to a Google-side technical indexing error on a site you own. Use the **contact link in Scholar's troubleshooting section** (currently [`scholar-support@google.com`](mailto:scholar-support@google.com)), include the technical details, and provide specific example article URLs that are absent or wrong. Scholar says it cannot waive the guidelines, help index third-party sites, or provide website-management, compatibility-testing, or site-testing services. [Scholar: contact and support limits](https://scholar.google.com/intl/en/scholar/inclusion.html#troubleshooting)

## Practical diagnostic checklist for `ns-press.com`

The following is a proposed test plan only; none of these items has been checked against the live site.

1. **Measure coverage correctly:** choose several dozen papers across journals/years and search Scholar by exact title; record absent, present-correct, and present-misparsed results. Do not infer coverage from the `site:` count alone.
2. **Check the inclusion URL:** confirm each paper has one stable, unique HTML or PDF URL and that the URL immediately exposes a complete author-written abstract or full text without authentication, overlays, consent gates, click-to-expand controls, or bare-metadata-only content.
3. **Inspect raw article metadata:** verify `citation_title`, a separate `citation_author` for every author, and `citation_publication_date`; then verify journal/conference title, volume/issue, first/last page, ISSN/ISBN as applicable. Confirm values describe the paper - not the site - and are correctly escaped.
4. **Verify HTML/PDF linkage:** where HTML and PDF are separate, confirm an absolute `citation_pdf_url`, same-subdirectory placement as required by Scholar, and one PDF per paper.
5. **Validate PDFs:** confirm searchable text, size at or below 5 MB, conventional title/author/citation layout, non-Type-3 fonts, and a recognizable references section. Confirm the PDF response does not carry an indexing-blocking `X-Robots-Tag`.
6. **Trace discovery paths:** starting from the home page, reach each sampled article within ten simple HTML links. Verify chronological browse pages use ordinary `GET` links and do not depend solely on JavaScript, forms, or internal search.
7. **Check crawler controls:** test `robots.txt` against article, PDF, and browse URLs; inspect HTML robots meta tags and response headers for `noindex`/`nofollow`; ensure non-article parameter spaces do not consume crawl capacity.
8. **Check HTTP behavior:** sampled canonical article pages should be reliably fetchable and should not intermittently time out or emit incorrect status codes. Moved articles should use one-to-one `301` redirects to the new article URL, never blanket redirects to the home page.
9. **Check URL consistency:** as a Google Search hygiene check, align internal links, sitemap URLs, redirects, and canonical signals on the preferred article URL. Treat this as supplemental Search guidance, not proof of Scholar eligibility.
10. **Allow the documented interval:** distinguish a genuinely new paper from a correction to an existing record. Wait several weeks for new discovery where appropriate; allow months for updates before concluding the fix failed.
11. **Escalate with evidence:** if the site meets the Scholar requirements but specific owned URLs remain missing or wrong after an appropriate interval, contact Scholar from its troubleshooting page with those exact URLs, observed Scholar results, dates, and the completed checks above.

## Live audit of `ns-press.com` (2026-09-03)

### Executive finding

The production site is not blocked site-wide by `robots.txt`, and the current canonical article pages are broadly crawlable. The strongest immediate blocker is instead a broken legacy-URL migration: requests to the previously indexed `/articles/{id}` URLs return `301`, but their `Location` header points to the server's internal origin, `http://localhost:3000/...`, rather than `https://www.ns-press.com/...`.

This is especially important because the canonical routing and same-host PDF changes were only committed on 2026-09-02. Before that migration, the article pages used `/articles/{id}` and exposed PDFs from the separate `api.ns-press.com` host. Google Scholar explicitly requires a moved article URL to return a per-article `301`, and requires `citation_pdf_url` to point to an absolute PDF URL in the same subdirectory as the HTML abstract. The newly compliant structure therefore has not existed long enough for a normal Scholar recrawl, while the broken redirect prevents old discovery signals from transferring cleanly.

### Production evidence

- The old URLs for article IDs 101, 171, and 220 all returned `301 Moved Permanently` with destinations such as `http://localhost:3000/journals/7/articles/171`. The response was also cacheable for one year and observed as an nginx cache hit, so a code deployment alone may not replace already cached bad redirects.
- The current canonical sample, [`/journals/7/articles/171`](https://www.ns-press.com/journals/7/articles/171), returned `200`, exposed its complete abstract in HTML, declared `index, follow`, emitted 12 Highwire `citation_*` tags, and used a self-referential canonical URL.
- Its [`citation_pdf_url`](https://www.ns-press.com/journals/7/articles/171/pdf) returned `200 application/pdf`, was about 313 KB, contained searchable text, and placed the article title and author clearly at the top of the first page. These checks pass Scholar's basic PDF requirements.
- [`robots.txt`](https://www.ns-press.com/robots.txt) allows `/` and blocks only dashboard/authentication routes. [`sitemap.xml`](https://www.ns-press.com/sitemap.xml) returned `200` and contained 241 journal-scoped article URLs, including the canonical URL for article 171 and not its legacy URL.
- Journal issue pages expose ordinary HTML links to articles. For example, the [2026 Issue 2 page for journal 7](https://www.ns-press.com/journals/7?periods=2&tab=articles&year=2026) links directly to article 171, so there is no evidence that JavaScript-only navigation is blocking discovery.
- Eight sampled articles (101, 130, 166, 171, 198, 210, 217, and 220) all had the core title, author, publication date, journal title, volume, issue, DOI, and PDF tags. However, all eight omitted `citation_firstpage` and `citation_lastpage`, despite Scholar recommending sufficient citation data including the first page.
- Author normalization is not consistently clean. Article 220 emitted two one-character author values that need editorial confirmation; article 166 emitted `李明 *`, retaining a correspondence marker in the author field. Scholar says each `citation_author` must contain one actual author's name and no extra contributor markup.
- The sampled PDF's running journal title says “Humanities and Social Sciences Research”, while the HTML, DOI metadata, and journal page say “Humanities and Social Sciences”. This is not a crawl blocker, but inconsistent bibliographic values can reduce parser confidence and version matching.
- Direct automated Google Scholar result pages returned `403`, and no interactive browser was connected for a manual title search. Web-search queries restricted to `scholar.google.com` found no matches for the domain, DOI, or exact sample title, but this is weaker evidence than Scholar's own title-search workflow. Coverage should still be confirmed manually using several dozen exact titles, as Scholar recommends.

### Ranked causes

1. **Broken 301 destinations (confirmed):** the legacy URLs Google already knows send crawlers to `localhost`. This violates the move requirement and is the first issue to fix.
2. **The Scholar-compatible URL/PDF structure is too new (confirmed):** full canonicalization and the same-subdirectory PDF proxy were deployed on 2026-09-02. Scholar says new discovery usually takes several weeks and site changes can take from days to 6-9 months to appear.
3. **Incomplete or malformed citation data (confirmed on samples):** missing page ranges and malformed author names can cause misidentification or exclusion of individual papers.
4. **Site-wide crawl exclusion (not supported):** current robots rules, canonical article status, issue navigation, visible abstracts, PDF responses, and sitemap all passed the sampled checks.

### Recommended order of work

1. Build legacy redirect destinations from the configured public site origin, never from the proxy-facing `request.url`. Verify that `/articles/{id}` returns a one-to-one `301` whose `Location` begins with `https://www.ns-press.com/`.
2. Purge nginx/CDN cache entries for `/articles/*` after deploying the redirect fix, because the bad redirects currently advertise a one-year immutable cache lifetime.
3. Keep those redirects in place long-term and ensure all internal links, canonical tags, sitemap entries, DOI destinations, and `citation_fulltext_html_url` values use the journal-scoped canonical URL.
4. Populate `citation_firstpage` and `citation_lastpage` from authoritative publication data, and normalize author names before emitting `citation_author` tags. Remove footnote/correspondence symbols without splitting Chinese given names.
5. Use real article modification/publication timestamps in the sitemap instead of assigning the current time to every dynamic article on each sitemap request; this avoids telling crawlers that all 241 papers changed continuously.
6. After the fixes, manually search Google Scholar for 20-30 exact titles across different journals and record the date and result. Allow several weeks for new discovery. If the same URLs are still absent after an appropriate recrawl interval, contact Scholar with the tested URLs and this evidence.
