import { permanentRedirect } from "next/navigation";

type RouteParams = { id: string; articleId: string };

export default async function SingularArticleRedirect({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { id, articleId } = await params;
  permanentRedirect(
    `/journals/${encodeURIComponent(id)}/articles/${encodeURIComponent(articleId)}`,
  );
}
