import journalDetailData from "@/data/journal-detail.json";

export type ArticleLink = {
  label: string;
  href: string;
};

export type EnrichedArticle = {
  id: string;
  title: string;
  doi: string;
  authors: string;
  type: string;
  date: string;
  openAccess: boolean;
  links: ArticleLink[];
  visualId: string;
};

export type NewsItem = {
  id: string;
  title: string;
  date: string;
  thumbnail: string;
};

export type Contact = {
  label: string;
  name: string;
  email: string;
};

export type EditorInChief = {
  name: string;
  role: string;
  portrait: string;
};

export type JournalEnrichment = {
  title: string;
  issn: string;
  coden?: string;
  citeScore?: string;
  scope: string;
  editorInChief?: EditorInChief;
  contacts?: Contact[];
  news?: NewsItem[];
  latestArticles?: EnrichedArticle[];
  topDownloaded?: EnrichedArticle[];
};

/**
 * Convert a journal title into a URL-friendly slug.
 * Examples:
 *   "ExRNA" -> "exrna"
 *   "Biofunctional Materials" -> "biofunctional-materials"
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const data = journalDetailData as Record<string, JournalEnrichment>;

/**
 * List of journal slugs that have static enrichment data.
 */
export function getEnrichedSlugs(): string[] {
  return Object.keys(data);
}

/**
 * Look up enrichment data for a journal by its title-derived slug.
 * Returns undefined when no enrichment exists.
 */
export function getJournalEnrichment(
  title: string,
): JournalEnrichment | undefined {
  return data[slugify(title)];
}

/**
 * Look up enrichment data by an explicit slug.
 * Returns undefined when no enrichment exists.
 */
export function getJournalEnrichmentBySlug(
  slug: string,
): JournalEnrichment | undefined {
  return data[slug];
}
