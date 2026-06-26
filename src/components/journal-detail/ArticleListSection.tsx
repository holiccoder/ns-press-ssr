import Link from "next/link";
import ArticleRow from "./ArticleRow";
import type { EnrichedArticle } from "@/lib/journal-slugs";
import type { JournalContentSummary } from "@/lib/api";

export default function ArticleListSection({
  title,
  articles,
  apiArticles,
  journalId,
}: {
  title: string;
  articles?: EnrichedArticle[];
  apiArticles?: JournalContentSummary[];
  journalId: number;
}) {
  const hasEnriched = Array.isArray(articles) && articles.length > 0;
  const hasApi = Array.isArray(apiArticles) && apiArticles.length > 0;

  if (!hasEnriched && !hasApi) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-bold text-[#0b2545]">{title}</h2>
        {hasEnriched && (
          <Link
            href={`/journals/${journalId}/articles`}
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
      ) : null}
    </section>
  );
}
