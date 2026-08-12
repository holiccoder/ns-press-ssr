import articleDetailData from "@/data/article-detail.json";

export type ArticleAuthor = {
  name: string;
  affiliation?: string;
  email?: string;
};

export type ArticleSpecialIssue = {
  title: string;
  href?: string;
};

export type ArticleMetrics = {
  accesses: number;
  downloads: number;
};

function stableMetric(seed: string): number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) % 101;
}

export function resolveArticleMetrics(
  articleId: string,
  metrics?: Partial<ArticleMetrics>,
): ArticleMetrics {
  return {
    accesses:
      typeof metrics?.accesses === "number" && metrics.accesses > 0
        ? metrics.accesses
        : stableMetric(`${articleId}:accesses`),
    downloads:
      typeof metrics?.downloads === "number" && metrics.downloads > 0
        ? metrics.downloads
        : stableMetric(`${articleId}:downloads`),
  };
}

export type ArticleDates = {
  received: string;
  accepted: string;
  published: string;
};

export type RecommendedArticle = {
  id: string;
  title: string;
  date: string;
  authors: string;
  href?: string;
};

export type ArticleEnrichment = {
  id: string;
  journalSlug: string;
  journalTitle: string;
  journalIssn?: string;
  title: string;
  articleType: string;
  openAccess: boolean;
  authors: ArticleAuthor[];
  abstract: string;
  keywords: string[];
  references?: string[];
  year: number;
  volume: number;
  issue: number;
  volumeLabel: string;
  citation: string;
  doi: string;
  copyright: string;
  specialIssue?: ArticleSpecialIssue;
  pdfUrl?: string;
  metrics: ArticleMetrics;
  dates: ArticleDates;
  recommendedArticles: RecommendedArticle[];
};

const data = articleDetailData as Record<string, ArticleEnrichment>;

/**
 * List of article slugs that have static enrichment data.
 */
export function getEnrichedArticleIds(): string[] {
  return Object.keys(data);
}

/**
 * Look up article enrichment data by its slug.
 * Returns undefined when no enrichment exists.
 */
export function getArticleEnrichment(id: string): ArticleEnrichment | undefined {
  return data[id];
}

/**
 * Check whether an article id is a known enriched slug.
 */
export function isEnrichedArticleId(id: string): boolean {
  return id in data;
}
