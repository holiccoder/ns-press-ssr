import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  getJournalList,
  getBookList,
  getArticleList,
  type JournalListItem,
  type BookListItem,
  type ArticleListItem,
} from "@/lib/api";
import { resolveJournalCover, resolveBookCover, resolveNewsImage } from "@/lib/images";
import { getEnrichedArticleIds, getArticleEnrichment } from "@/lib/article-slugs";
import { getServerUiLang } from "@/lib/lang.server";

// Dynamic search page metadata
export const metadata: Metadata = {
  title: "Search Results",
  description: "Search academic journals, books, and articles on NSP.",
};

type SearchPageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();
  const uiLang = await getServerUiLang();
  const isZh = uiLang === "zh";

  let matchedJournals: JournalListItem[] = [];
  let matchedBooks: BookListItem[] = [];
  let matchedNews: ArticleListItem[] = [];
  let matchedAcademicArticles: Array<ReturnType<typeof getArticleEnrichment>> = [];

  if (query) {
    // 1. Fetch search targets in parallel (safely catch to prevent crashes)
    const [journalsData, booksData, newsData] = await Promise.all([
      getJournalList({ pageSize: 50, lang: isZh ? "中文" : "English" }).catch(() => ({ lists: [], count: 0 })),
      getBookList({ pageSize: 50, lang: isZh ? "中文" : "English" }).catch(() => ({ lists: [], count: 0 })),
      getArticleList({ pageSize: 50 }).catch(() => ({ lists: [], count: 0 })),
    ]);

    // 2. Filter journals matching query
    matchedJournals = journalsData.lists.filter(
      (j) =>
        j.title.toLowerCase().includes(query) ||
        (j.issn && j.issn.toLowerCase().includes(query)),
    );

    // 3. Filter books matching query
    matchedBooks = booksData.lists.filter(
      (b) =>
        b.title.toLowerCase().includes(query) ||
        (b.ISSN && b.ISSN.toLowerCase().includes(query)) ||
        (b.introduction && b.introduction.toLowerCase().includes(query)),
    );

    // 4. Filter news matching query
    matchedNews = newsData.lists.filter(
      (n) =>
        n.title.toLowerCase().includes(query) ||
        (n.desc && n.desc.toLowerCase().includes(query)),
    );

    // 5. Filter statically enriched academic articles
    matchedAcademicArticles = getEnrichedArticleIds()
      .map((id) => getArticleEnrichment(id)!)
      .filter(
        (art) =>
          art &&
          (art.title.toLowerCase().includes(query) ||
            art.abstract?.toLowerCase().includes(query) ||
            art.keywords.some((k) => k.toLowerCase().includes(query))),
      );
  }

  const totalResults =
    matchedJournals.length +
    matchedBooks.length +
    matchedNews.length +
    matchedAcademicArticles.length;

  return (
    <main className="flex flex-1 flex-col bg-slate-50">
      {/* Header Spacer */}
      <div className="h-16 bg-[#0b2545]" />

      {/* Hero Header */}
      <section className="bg-[#0b2545] py-12 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {isZh ? "搜索结果" : "Search Results"}
          </h1>
          <p className="mt-2 text-sm text-slate-300 sm:text-base">
            {isZh
              ? `找到 ${totalResults} 个关于 "${q}" 的结果`
              : `Found ${totalResults} results for "${q}"`}
          </p>
        </div>
      </section>

      {/* Content Area */}
      <section className="mx-auto w-full max-w-7xl px-6 py-12">
        {totalResults === 0 ? (
          <div className="rounded-sm border border-slate-200 bg-white py-16 text-center shadow-sm">
            <svg
              className="mx-auto h-12 w-12 text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.637z"
              />
            </svg>
            <h3 className="mt-4 text-sm font-semibold text-slate-900">
              {isZh ? "未找到结果" : "No results found"}
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              {isZh
                ? "尝试使用不同的关键字或检查拼写。"
                : "Try searching with different keywords or check spelling."}
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-sm bg-[#0b2545] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0b2545]/90"
              >
                {isZh ? "返回首页" : "Go Home"}
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-12">
            {/* 1. Academic Journals Results */}
            {matchedJournals.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold uppercase tracking-wider text-[#0b2545] border-b border-slate-200 pb-2">
                  {isZh ? "学术期刊" : "Academic Journals"} ({matchedJournals.length})
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {matchedJournals.map((j) => (
                    <div
                      key={j.id}
                      className="flex gap-4 rounded-sm border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow"
                    >
                      <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden rounded bg-slate-100 ring-1 ring-black/5">
                        <Image
                          src={resolveJournalCover(j.id, j.cover_image)}
                          alt={j.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between min-w-0">
                        <div>
                          <Link
                            href={`/journals/${j.id}`}
                            className="block font-bold text-slate-900 hover:text-[#1d4ed8] line-clamp-2 text-sm"
                          >
                            {j.title}
                          </Link>
                          {j.issn && (
                            <p className="mt-1 text-xs text-slate-500">ISSN {j.issn}</p>
                          )}
                        </div>
                        <Link
                          href={`/journals/${j.id}`}
                          className="text-xs font-semibold text-[#0b2545] hover:underline"
                        >
                          {isZh ? "访问期刊 →" : "Visit Journal →"}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Academic Books Results */}
            {matchedBooks.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold uppercase tracking-wider text-[#0b2545] border-b border-slate-200 pb-2">
                  {isZh ? "学术图书" : "Academic Books"} ({matchedBooks.length})
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {matchedBooks.map((b) => (
                    <div
                      key={b.id}
                      className="flex gap-4 rounded-sm border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow"
                    >
                      <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden rounded bg-slate-100 ring-1 ring-black/5">
                        <Image
                          src={resolveBookCover(b.id, b.cover_image)}
                          alt={b.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between min-w-0">
                        <div>
                          <Link
                            href={`/books/${b.id}`}
                            className="block font-bold text-slate-900 hover:text-[#1d4ed8] line-clamp-2 text-sm"
                          >
                            {b.title}
                          </Link>
                          {b.ISSN && (
                            <p className="mt-1 text-xs text-slate-500">ISBN {b.ISSN}</p>
                          )}
                        </div>
                        <Link
                          href={`/books/${b.id}`}
                          className="text-xs font-semibold text-[#0b2545] hover:underline"
                        >
                          {isZh ? "阅读图书 →" : "Read Book →"}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Academic Articles/Papers */}
            {matchedAcademicArticles.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold uppercase tracking-wider text-[#0b2545] border-b border-slate-200 pb-2">
                  {isZh ? "学术论文" : "Scholarly Papers"} ({matchedAcademicArticles.length})
                </h2>
                <div className="space-y-4">
                  {matchedAcademicArticles.map((art) => (
                    <article
                      key={art!.id}
                      className="rounded-sm border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow"
                    >
                      <Link
                        href={`/articles/${art!.id}`}
                        className="text-base font-bold text-slate-900 hover:text-[#1d4ed8]"
                      >
                        {art!.title}
                      </Link>
                      <p className="mt-2 text-xs font-medium text-slate-500">
                        {isZh ? "发表于期刊:" : "Published in:"}{" "}
                        <span className="font-semibold text-slate-700">{art!.journalTitle}</span>
                        {art!.year ? ` (${art!.year})` : ""}
                      </p>
                      {art!.abstract && (
                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-600">
                          {art!.abstract}
                        </p>
                      )}
                      <div className="mt-4 flex items-center justify-between">
                        <Link
                          href={`/articles/${art!.id}`}
                          className="text-xs font-semibold text-[#0b2545] hover:underline"
                        >
                          {isZh ? "阅读全文 →" : "Read Full Paper →"}
                        </Link>
                        {art!.doi && (
                          <span className="text-xs text-slate-400">DOI: {art!.doi}</span>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {/* 4. News & Announcements */}
            {matchedNews.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold uppercase tracking-wider text-[#0b2545] border-b border-slate-200 pb-2">
                  {isZh ? "公告与新闻" : "News & Announcements"} ({matchedNews.length})
                </h2>
                <div className="space-y-4">
                  {matchedNews.map((n) => (
                    <article
                      key={n.id}
                      className="flex gap-6 rounded-sm border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow"
                    >
                      {n.image && (
                        <div className="relative hidden h-24 w-36 shrink-0 overflow-hidden rounded bg-slate-100 sm:block">
                          <Image
                            src={resolveNewsImage(n.id, n.image)}
                            alt={n.title}
                            fill
                            sizes="144px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="min-w-0 flex-1 flex flex-col justify-between">
                        <div>
                          <Link
                            href={`/news/${n.id}`}
                            className="text-base font-bold text-slate-900 hover:text-[#1d4ed8] line-clamp-1"
                          >
                            {n.title}
                          </Link>
                          {n.desc && (
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-2">
                              {n.desc}
                            </p>
                          )}
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                          <Link
                            href={`/news/${n.id}`}
                            className="text-xs font-semibold text-[#0b2545] hover:underline"
                          >
                            {isZh ? "查看详情 →" : "Read Details →"}
                          </Link>
                          {n.create_time && (
                            <span className="text-xs text-slate-400">
                              {n.create_time.split(" ")[0]}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
