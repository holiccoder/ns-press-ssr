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
