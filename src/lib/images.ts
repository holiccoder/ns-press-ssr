/**
 * Static manifest of localized cover images. These assets live under
 * public/images and are resolved at runtime without filesystem access,
 * keeping serverless bundles small and Turbopack traces clean.
 */

const JOURNAL_COVERS: Record<string, string> = {
  "2": "/images/journals/covers/2.jpg",
  "3": "/images/journals/covers/3.jpg",
  "4": "/images/journals/covers/4.jpg",
  "5": "/images/journals/covers/5.png",
  "6": "/images/journals/covers/6.jpg",
  "7": "/images/journals/covers/7.jpg",
  "13": "/images/journals/covers/13.png",
  "14": "/images/journals/covers/14.png",
  "15": "/images/journals/covers/15.png",
  "16": "/images/journals/covers/16.png",
  "17": "/images/journals/covers/17.png",
  "18": "/images/journals/covers/18.png",
  "19": "/images/journals/covers/19.png",
  "20": "/images/journals/covers/20.png",
  "21": "/images/journals/covers/21.png",
};

const BOOK_COVERS: Record<string, string> = {
  "3": "/images/books/covers/3.png",
  "4": "/images/books/covers/4.png",
};

const NEWS_IMAGES: Record<string, string> = {
  "1": "/images/news/202606261855049c7d74866.png",
  "2": "/images/news/20260626185611635a95692.png",
  "3": "/images/news/202606261857341ced56794.jpg",
  "4": "/images/news/20260626185611635a95692.png",
};

/**
 * Resolve a journal cover image to a local path when the asset has been
 * downloaded to public/images/journals/covers/<id>.<ext>. Falls back to the
 * original URL so the UI keeps working while assets are being localized.
 */
export function resolveJournalCover(
  id: number,
  originalUrl: string,
): string {
  return JOURNAL_COVERS[String(id)] ?? originalUrl;
}

/**
 * Resolve a book cover image to a local path when the asset has been
 * downloaded to public/images/books/covers/<id>.<ext>.
 */
export function resolveBookCover(
  id: number,
  originalUrl: string,
): string {
  return BOOK_COVERS[String(id)] ?? originalUrl;
}

/**
 * Resolve a news article image to a local path when the asset has been
 * downloaded to public/images/news/. Falls back to the original URL so the
 * UI keeps working while assets are being localized.
 */
export function resolveNewsImage(
  id: number,
  originalUrl: string,
): string {
  return NEWS_IMAGES[String(id)] ?? originalUrl;
}
