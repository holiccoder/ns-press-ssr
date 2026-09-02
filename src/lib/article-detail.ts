import {
  getJournalContentDetail,
  getJournalDetail,
  ApiError,
  type Lang,
} from "@/lib/api";
import {
  getArticlePdfPath,
  isUsableArticleAssetUrl,
} from "@/lib/article-links";
import {
  getArticleEnrichment,
  isEnrichedArticleId,
  resolveArticleMetrics,
  type ArticleEnrichment,
} from "@/lib/article-slugs";

export type ResolvedArticle = {
  article: ArticleEnrichment;
  volumeHref: string;
};

export function splitArticleAuthors(value: string): string[] {
  return value
    .split(/[;；、，\n]|\u3000+|\s{2,}/)
    .map((author) => author.trim())
    .filter(Boolean);
}

/**
 * Build an ArticleEnrichment object from the API's journalContentDetail
 * response. Fills in sensible defaults for fields the API does not expose.
 */
export function buildArticleFromApi(
  apiArticle: Awaited<ReturnType<typeof getJournalContentDetail>>,
  journal?: { title?: string; issn?: string },
): ArticleEnrichment {
  const year = Number(apiArticle.year) || 0;
  const volume = Number(apiArticle.volume) || 0;
  const issue = Number(apiArticle.periods) || 0;
  const journalTitle =
    apiArticle.Journal?.title ?? journal?.title ?? "Journal";
  const sourcePdfUrl = apiArticle.content;
  const doi = apiArticle.doi?.trim() ?? "";
  const citation = [
    apiArticle.author?.trim(),
    apiArticle.title ? `${apiArticle.title}.` : undefined,
    journalTitle,
    year ? String(year) : undefined,
    volume ? `Volume ${volume}` : undefined,
    issue ? `Issue ${issue}` : undefined,
    doi ? `DOI: ${doi}` : undefined,
  ]
    .filter(Boolean)
    .join(" ");
  const keywordChips = apiArticle.keywords
    ? apiArticle.keywords
        .split(/[;,]/)
        .map((k) => k.trim().replace(/\.$/, ""))
        .filter(Boolean)
    : [];

  return {
    id: String(apiArticle.id),
    journalSlug: String(apiArticle.journal_id),
    journalTitle,
    journalIssn: apiArticle.Journal?.issn ?? journal?.issn,
    title: apiArticle.title,
    articleType: "Article",
    openAccess: true,
    authors: apiArticle.author
      ? splitArticleAuthors(apiArticle.author).map((name) => ({
          name,
          affiliation: apiArticle.address,
        }))
      : [],
    abstract: apiArticle.abstract,
    keywords: keywordChips,
    references: apiArticle.references,
    year,
    volume,
    issue,
    volumeLabel: volume
      ? `Volume ${volume}${issue ? ` Issue ${issue}` : ""}${year ? `, ${year}` : ""}`
      : year
        ? `Volume ${year}${issue ? ` Issue ${issue}` : ""}`
        : "Article",
    citation,
    doi,
    copyright: "Published by NSP.",
    pdfUrl: sourcePdfUrl,
    sourcePdfUrl,
    firstPage:
      apiArticle.first_page != null ? String(apiArticle.first_page) : undefined,
    lastPage:
      apiArticle.last_page != null ? String(apiArticle.last_page) : undefined,
    metrics: resolveArticleMetrics(String(apiArticle.id), {
      accesses: apiArticle.accesses ?? apiArticle.click,
      downloads: apiArticle.downloads ?? apiArticle.download,
    }),
    dates: {
      received: "",
      accepted: "",
      published: apiArticle.create_time ?? "",
      modified: apiArticle.update_time ?? apiArticle.create_time ?? "",
    },
    recommendedArticles: [],
  };
}

function normalizeArticle(article: ArticleEnrichment): ArticleEnrichment {
  const sourcePdfUrl = article.sourcePdfUrl ?? article.pdfUrl;
  return {
    ...article,
    copyright: "Published by NSP.",
    metrics: resolveArticleMetrics(article.id, article.metrics),
    sourcePdfUrl,
    pdfUrl: isUsableArticleAssetUrl(sourcePdfUrl)
      ? getArticlePdfPath(article.journalSlug, article.id)
      : article.pdfUrl,
  };
}

/**
 * Resolve an article by its route id/slug. Supports static enrichment and
 * API-backed numeric IDs. Returns the enriched article plus the canonical
 * journal href derived from the article's own data.
 */
export async function resolveArticle(
  articleId: string,
  lang: Lang = "English",
): Promise<ResolvedArticle> {
  if (isEnrichedArticleId(articleId)) {
    const article = normalizeArticle(getArticleEnrichment(articleId)!);
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
    const apiArticle = await getJournalContentDetail(numericArticleId, lang);
    const enrichment = getArticleEnrichment(String(apiArticle.id));
    const journal = enrichment
      ? undefined
      : await getJournalDetail(apiArticle.journal_id, lang).catch(() => undefined);
    const article = normalizeArticle(
      enrichment ?? buildArticleFromApi(apiArticle, journal),
    );
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
