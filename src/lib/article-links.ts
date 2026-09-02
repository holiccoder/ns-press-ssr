/**
 * Return whether an article asset link can be exposed as a real navigable URL.
 * Placeholder anchors such as "#pdf" should not be rendered as download links
 * or advertised to crawlers as full-text files.
 */
export function isUsableArticleAssetUrl(value?: string): value is string {
  const trimmed = value?.trim();
  if (!trimmed || trimmed.startsWith("#") || /^(?:javascript|data):/i.test(trimmed)) {
    return false;
  }

  try {
    const url = new URL(trimmed, "https://ns-press.invalid");
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/**
 * Return the single public URL used for an article detail page.
 *
 * Keep this in one place so pages, redirects, Sitemap entries, and links all
 * agree on the same canonical route.
 */
export function getCanonicalArticlePath(
  journalSlug: string | number,
  articleId: string | number,
): string {
  return `/journals/${encodeURIComponent(String(journalSlug))}/articles/${encodeURIComponent(String(articleId))}`;
}

/**
 * Return the same-host PDF proxy path for an article.
 */
export function getArticlePdfPath(
  journalSlug: string | number,
  articleId: string | number,
): string {
  return `${getCanonicalArticlePath(journalSlug, articleId)}/pdf`;
}

export function getCanonicalArticleUrl(
  siteUrl: string,
  journalSlug: string | number,
  articleId: string | number,
): string {
  return new URL(
    getCanonicalArticlePath(journalSlug, articleId),
    siteUrl,
  ).toString();
}

export function resolveArticleAssetUrl(
  value: string | undefined,
  siteUrl: string,
): string | undefined {
  if (!isUsableArticleAssetUrl(value)) return undefined;

  try {
    const url = new URL(value, siteUrl);
    return url.protocol === "http:" || url.protocol === "https:"
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
}
