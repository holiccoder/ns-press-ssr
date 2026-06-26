import { getJournalContentDetail, ApiError } from "@/lib/api";
import {
  getArticleEnrichment,
  isEnrichedArticleId,
  type ArticleEnrichment,
} from "@/lib/article-slugs";

export type ResolvedArticle = {
  article: ArticleEnrichment;
  volumeHref: string;
};

/**
 * Build an ArticleEnrichment object from the API's journalContentDetail
 * response. Fills in sensible defaults for fields the API does not expose.
 */
export function buildArticleFromApi(
  apiArticle: Awaited<ReturnType<typeof getJournalContentDetail>>,
): ArticleEnrichment {
  const keywordChips = apiArticle.keywords
    ? apiArticle.keywords
        .split(/[;,]/)
        .map((k) => k.trim().replace(/\.$/, ""))
        .filter(Boolean)
    : [];

  return {
    id: String(apiArticle.id),
    journalSlug: String(apiArticle.journal_id),
    journalTitle: apiArticle.Journal?.title ?? "Journal",
    title: apiArticle.title,
    articleType: "Article",
    openAccess: true,
    authors: apiArticle.author
      ? [
          {
            name: apiArticle.author,
            affiliation: apiArticle.address,
          },
        ]
      : [],
    abstract: apiArticle.abstract,
    keywords: keywordChips,
    references: apiArticle.references,
    year: Number(apiArticle.year) || 0,
    volume: Number(apiArticle.periods) || 0,
    issue: 0,
    volumeLabel:
      apiArticle.year || apiArticle.periods
        ? `Volume ${apiArticle.year}${apiArticle.periods ? ` Issue ${apiArticle.periods}` : ""}`
        : "Article",
    citation: "",
    doi: apiArticle.doi ?? "",
    copyright: "",
    pdfUrl: apiArticle.content,
    metrics: { accesses: 0, downloads: 0 },
    dates: { received: "", accepted: "", published: "" },
    recommendedArticles: [],
  };
}

/**
 * Resolve an article by its route id/slug. Supports static enrichment and
 * API-backed numeric IDs. Returns the enriched article plus the canonical
 * journal href derived from the article's own data.
 */
export async function resolveArticle(
  articleId: string,
): Promise<ResolvedArticle> {
  if (isEnrichedArticleId(articleId)) {
    const article = getArticleEnrichment(articleId)!;
    return {
      article,
      volumeHref: `/journals/${article.journalSlug}`,
    };
  }

  const numericArticleId = Number(articleId);
  if (!Number.isFinite(numericArticleId) || numericArticleId <= 0) {
    throw new ApiError(
      `Invalid article id: ${articleId}`,
      "journalContentDetail",
    );
  }

  try {
    const apiArticle = await getJournalContentDetail(numericArticleId, "中文");
    const enrichment = getArticleEnrichment(String(apiArticle.id));
    const article = enrichment ?? buildArticleFromApi(apiArticle);
    const journalId = apiArticle.journal_id ?? article.journalSlug;
    return {
      article,
      volumeHref: `/journals/${journalId}`,
    };
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(
      `Failed to load article ${articleId}: ${
        err instanceof Error ? err.message : String(err)
      }`,
      "journalContentDetail",
      err,
    );
  }
}
