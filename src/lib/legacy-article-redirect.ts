import { getServerApiLang } from "@/lib/lang.server";
import { ApiError } from "@/lib/api";
import { resolveArticle } from "@/lib/article-detail";
import { getCanonicalArticlePath } from "@/lib/article-links";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ns-press.com";

/**
 * Redirect every legacy article detail URL to the article's own canonical
 * journal-scoped URL. Next's permanentRedirect uses 308, so this helper uses
 * an explicit response to preserve the requested 301 status.
 */
export async function redirectLegacyArticle(
  request: Request,
  articleId: string,
): Promise<Response> {
  try {
    const lang = await getServerApiLang();
    const { article } = await resolveArticle(articleId, lang);
    const destination = new URL(
      getCanonicalArticlePath(article.journalSlug, article.id),
      SITE_URL,
    );

    return new Response(null, {
      status: 301,
      headers: {
        Location: destination.toString(),
        // Keep redirects revalidatable so a future routing change does not
        // leave an old destination cached for an entire year.
        "Cache-Control": "public, max-age=3600, s-maxage=86400, must-revalidate",
      },
    });
  } catch (error) {
    const status = error instanceof ApiError ? 404 : 503;
    return new Response(
      status === 404 ? "Article not found" : "Article redirect unavailable",
      { status },
    );
  }
}
