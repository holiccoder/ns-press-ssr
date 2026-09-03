import { ApiError } from "@/lib/api";
import { getServerApiLang } from "@/lib/lang.server";
import { resolveArticle } from "@/lib/article-detail";
import {
  getArticlePdfPath,
  isUsableArticleAssetUrl,
  resolveArticleAssetUrl,
} from "@/lib/article-links";

type RouteParams = { id: string; articleId: string };

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ns-press.com";

/**
 * Serve article PDFs from the same public host as the abstract page while
 * keeping the upstream storage URL private from page links and metadata.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<RouteParams> },
) {
  const { id, articleId } = await params;

  let article;
  try {
    const lang = await getServerApiLang();
    article = (await resolveArticle(articleId, lang)).article;
  } catch (error) {
    return new Response(
      error instanceof ApiError ? "Article not found" : "PDF unavailable",
      { status: error instanceof ApiError ? 404 : 503 },
    );
  }

  if (String(id) !== article.journalSlug) {
    const destination = new URL(
      getArticlePdfPath(article.journalSlug, article.id),
      SITE_URL,
    );
    return new Response(null, {
      status: 301,
      headers: { Location: destination.toString() },
    });
  }

  if (!isUsableArticleAssetUrl(article.sourcePdfUrl)) {
    return new Response("PDF not found", { status: 404 });
  }

  const sourceUrl = resolveArticleAssetUrl(article.sourcePdfUrl, SITE_URL);
  if (!sourceUrl) return new Response("PDF not found", { status: 404 });

  let upstream: Response;
  try {
    upstream = await fetch(sourceUrl, {
      redirect: "follow",
      headers: { Accept: "application/pdf" },
      next: { revalidate: 86400 },
    });
  } catch {
    return new Response("PDF unavailable", { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    return new Response("PDF unavailable", { status: upstream.status || 502 });
  }

  const headers = new Headers();
  headers.set("Content-Type", "application/pdf");
  headers.set("Content-Disposition", "inline");
  headers.set("Cache-Control", "public, max-age=86400, s-maxage=604800");
  headers.set("X-Content-Type-Options", "nosniff");

  const contentLength = upstream.headers.get("content-length");
  if (contentLength) headers.set("Content-Length", contentLength);

  return new Response(upstream.body, { status: 200, headers });
}

export async function HEAD(
  request: Request,
  context: { params: Promise<RouteParams> },
) {
  const response = await GET(request, context);
  return new Response(null, {
    status: response.status,
    headers: response.headers,
  });
}
