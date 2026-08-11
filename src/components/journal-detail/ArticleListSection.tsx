import Link from "next/link";
import ArticleRow from "./ArticleRow";
import type { EnrichedArticle } from "@/lib/journal-slugs";
import type { JournalContentSummary } from "@/lib/api";

export default function ArticleListSection({
  title,
  articles,
  apiArticles,
  journalId,
  filterLabel,
  pagination,
  emptyMessage,
}: {
  title: string;
  articles?: EnrichedArticle[];
  apiArticles?: JournalContentSummary[];
  journalId: number;
  filterLabel?: string;
  pagination?: React.ReactNode;
  emptyMessage?: string;
}) {
  const hasEnriched = Array.isArray(articles) && articles.length > 0;
  const hasApi = Array.isArray(apiArticles) && apiArticles.length > 0;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-baseline gap-2">
          <h2 className="text-lg font-bold text-[#0b2545]">{title}</h2>
          {filterLabel && (
            <span className="rounded-sm bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
              {filterLabel}
            </span>
          )}
        </div>
        {hasEnriched && (
          <Link
            href={`/journals/${journalId}?tab=articles`}
            className="text-sm font-medium text-[#1d4ed8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
          >
            View all
          </Link>
        )}
      </div>

      {hasEnriched ? (
        <div className="divide-y divide-slate-200">
          {articles.map((article) => (
            <ArticleRow key={article.id} article={article} />
          ))}
        </div>
      ) : hasApi ? (
        <ul className="divide-y divide-slate-200">
          {apiArticles.map((article) => (
            <li key={article.id} className="py-4">
              <Link
                href={`/journals/${journalId}/articles/${article.id}`}
                className="group block text-sm font-semibold text-[#0b2545] hover:text-[#1d4ed8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] sm:text-base"
              >
                {article.title}
              </Link>
              {article.author && (
                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  {article.author}
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-6 text-sm text-slate-500">
          {emptyMessage ?? "No articles found."}
        </p>
      )}

      {pagination}
    </section>
  );
}
