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
