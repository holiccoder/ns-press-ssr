import type { Metadata } from "next";
import type { ArticleEnrichment } from "./article-slugs";
import {
  getCanonicalArticleUrl,
  resolveArticleAssetUrl,
} from "./article-links";
import { getJournalEnrichmentBySlug } from "./journal-slugs";

type ScholarMetadata = NonNullable<Metadata["other"]>;

function citationDate(value: string | undefined, fallbackYear: number): string | undefined {
  const raw = value?.trim();
  if (raw) {
    const ymd = raw.match(/^(\d{4})[-/](\d{1,2})(?:[-/](\d{1,2}))?/);
    if (ymd) {
      const [, year, month, day] = ymd;
      return day
        ? `${year}/${month.padStart(2, "0")}/${day.padStart(2, "0")}`
        : year;
    }

    const parsed = new Date(raw);
    if (!Number.isNaN(parsed.getTime())) {
      return `${parsed.getFullYear()}/${String(parsed.getMonth() + 1).padStart(2, "0")}/${String(parsed.getDate()).padStart(2, "0")}`;
    }

    const year = raw.match(/\b(?:19|20)\d{2}\b/)?.[0];
    if (year) return year;
  }

  return fallbackYear > 0 ? String(fallbackYear) : undefined;
}

function citationIssns(value: string | undefined): string[] {
  return (value ?? "")
    .split(/[;,；，|\n]+/)
    .map((issn) => issn.replace(/\s*\([^)]*\)/g, "").trim())
    .filter(Boolean);
}

/**
 * Build Google Scholar's Highwire Press metadata for an article abstract page.
 * `other` is Next's supported escape hatch for custom <meta name=...> tags.
 */
export function getScholarArticleMetadata(
  article: ArticleEnrichment,
  siteUrl: string,
): ScholarMetadata {
  const metadata: ScholarMetadata = {
    citation_title: article.title,
  };

  const articleUrl = getCanonicalArticleUrl(siteUrl, article.journalSlug, article.id);
  metadata.citation_fulltext_html_url = articleUrl;

  const authors = article.authors
    .map((author) => author.name.trim())
    .filter(Boolean);
  if (authors.length > 0) metadata.citation_author = authors;

  const publicationDate = citationDate(article.dates.published, article.year);
  if (publicationDate) metadata.citation_publication_date = publicationDate;

  const journalTitle = article.journalTitle.trim();
  if (journalTitle) metadata.citation_journal_title = journalTitle;

  const journalIssns = citationIssns(
    article.journalIssn ?? getJournalEnrichmentBySlug(article.journalSlug)?.issn,
  );
  if (journalIssns.length > 0) metadata.citation_issn = journalIssns;

  if (article.volume > 0) metadata.citation_volume = String(article.volume);
  if (article.issue > 0) metadata.citation_issue = String(article.issue);

  const doi = article.doi.trim();
  if (doi) metadata.citation_doi = doi;

  const abstract = article.abstract.trim();
  if (abstract) metadata.citation_abstract = abstract;

  if (article.firstPage) metadata.citation_firstpage = article.firstPage;
  if (article.lastPage) metadata.citation_lastpage = article.lastPage;
  if (article.language) metadata.citation_language = article.language;

  const pdfUrl = resolveArticleAssetUrl(article.pdfUrl, siteUrl);
  if (pdfUrl) metadata.citation_pdf_url = pdfUrl;

  return metadata;
}
