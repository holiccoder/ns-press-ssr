import type { MetadataRoute } from "next";
import {
  getArticleList,
  getJournalList,
  getBookList,
  type ArticleListItem,
  type JournalListItem,
  type BookListItem,
} from "@/lib/api";
import {
  getEnrichedArticleIds,
  getArticleEnrichment,
} from "@/lib/article-slugs";
import {
  getEnrichedSlugs,
  getJournalEnrichmentBySlug,
} from "@/lib/journal-slugs";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ns-press.com";

const PRIVATE_ROUTES = new Set(["/dashboard", "/login", "/register"]);

type SitemapEntry = MetadataRoute.Sitemap[number];

function safeUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function toDate(value: unknown): Date | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value;
  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return undefined;
}

async function fetchAllPaged<T>(
  fetcher: (pageNo: number, pageSize: number) => Promise<{ lists: T[]; count: number }>,
  pageSize = 50,
  maxPages = 40,
): Promise<T[]> {
  const items: T[] = [];
  try {
    const first = await fetcher(1, pageSize);
    items.push(...first.lists);
    const totalPages = Math.min(
      Math.ceil((first.count || items.length) / pageSize),
      maxPages,
    );
    for (let page = 2; page <= totalPages; page++) {
      try {
        const next = await fetcher(page, pageSize);
        if (!next.lists.length) break;
        items.push(...next.lists);
      } catch {
        break;
      }
    }
  } catch {
    // swallow — sitemap must not fail
  }
  return items;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: SitemapEntry[] = (
    [
      { url: safeUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
      { url: safeUrl("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.6 },
      { url: safeUrl("/books"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
      { url: safeUrl("/journals"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
      { url: safeUrl("/news"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
      { url: safeUrl("/articles"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ] satisfies SitemapEntry[]
  ).filter((e) => !PRIVATE_ROUTES.has(new URL(e.url).pathname));

  const [apiJournals, apiArticles, apiBooks] = await Promise.all([
    fetchAllPaged<JournalListItem>((pageNo, pageSize) =>
      getJournalList({ page: pageNo, pageSize }).then((p) => ({
        lists: p.lists,
        count: p.count,
      })),
    ),
    fetchAllPaged<ArticleListItem>((pageNo, pageSize) =>
      getArticleList({ pageNo, pageSize }).then((p) => ({
        lists: p.lists,
        count: p.count,
      })),
    ),
    fetchAllPaged<BookListItem>((pageNo, pageSize) =>
      getBookList({ page: pageNo, pageSize }).then((p) => ({
        lists: p.lists,
        count: p.count,
      })),
    ),
  ]);

  const journalEntries: SitemapEntry[] = apiJournals.map((j) => ({
    url: safeUrl(`/journals/${j.id}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const enrichedJournalEntries: SitemapEntry[] = getEnrichedSlugs()
    .filter((slug) => getJournalEnrichmentBySlug(slug))
    .map((slug) => ({
      url: safeUrl(`/journals/${slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  const newsEntries: SitemapEntry[] = apiArticles.map((a) => ({
    url: safeUrl(`/news/${a.id}`),
    lastModified: toDate(a.create_time) ?? now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  const bookEntries: SitemapEntry[] = apiBooks.map((b) => ({
    url: safeUrl(`/books/${b.id}`),
    lastModified: toDate(b.publication_time) ?? now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const enrichedArticleEntries: SitemapEntry[] = getEnrichedArticleIds()
    .map((id): SitemapEntry | null => {
      const article = getArticleEnrichment(id);
      if (!article) return null;
      return {
        url: safeUrl(`/articles/${id}`),
        lastModified: toDate(article.dates?.published) ?? now,
        changeFrequency: "yearly",
        priority: 0.6,
      };
    })
    .filter((e): e is SitemapEntry => e !== null);

  const all = [
    ...staticEntries,
    ...journalEntries,
    ...enrichedJournalEntries,
    ...newsEntries,
    ...bookEntries,
    ...enrichedArticleEntries,
  ];

  const seen = new Set<string>();
  return all.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return !PRIVATE_ROUTES.has(new URL(entry.url).pathname);
  });
}
