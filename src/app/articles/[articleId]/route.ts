import { redirectLegacyArticle } from "@/lib/legacy-article-redirect";

type RouteParams = { articleId: string };

export async function GET(
  request: Request,
  { params }: { params: Promise<RouteParams> },
) {
  const { articleId } = await params;
  return redirectLegacyArticle(request, articleId);
}

export async function HEAD(
  request: Request,
  { params }: { params: Promise<RouteParams> },
) {
  const { articleId } = await params;
  return redirectLegacyArticle(request, articleId);
}
