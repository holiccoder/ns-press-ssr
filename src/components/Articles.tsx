import Link from "next/link";
import home from "@/data/home.json";
import { getLatestSubmissions } from "@/lib/api";

const { articles } = home;

type ArticleItem = {
  id: string;
  type: string;
  date: string;
  title: string;
  doi?: string;
  authors: string;
  href: string;
};

function formatDate(isoLike: string): string {
  const date = new Date(isoLike.replace(/-/g, "/"));
  if (Number.isNaN(date.getTime())) return isoLike;
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d} ${m} ${y}`;
}

function ArticleRow({ article }: { article: ArticleItem }) {
  return (
    <article className="border-b border-slate-200 py-8 last:border-b-0">
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="font-semibold text-slate-700">{article.type}</span>
          <span className="text-slate-300">|</span>
          <span className="font-bold tracking-wider text-orange-600">
            {articles.openAccessLabel}
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">{article.date}</span>
        </div>

        <Link
          href={article.href}
          className="group inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] focus-visible:ring-offset-2"
        >
          <h3 className="text-lg font-bold leading-snug text-[#0b2545] group-hover:text-[#1d4ed8] sm:text-xl">
            {article.title}
          </h3>
        </Link>

        {article.doi && (
          <p className="text-sm text-slate-600">
            {articles.doiLabel}{" "}
            <a
              href={`https://doi.org/${article.doi}`}
              className="text-[#1d4ed8] hover:underline"
            >
              {article.doi}
            </a>
          </p>
        )}

        <p className="text-sm italic text-slate-700">{article.authors}</p>
      </div>
    </article>
  );
}

export default async function Articles() {
  let items: ArticleItem[] = [];

  try {
    const submissions = await getLatestSubmissions();

    items = submissions.map((s) => ({
      id: String(s.id),
      type: s.journal_name,
      date: formatDate(s.create_time),
      title: s.paper_title,
      authors: s.author_list,
      href: `/articles/${s.id}`,
    }));
  } catch (err) {
    console.error("[Articles] failed to load latest submissions:", err);
    // Fallback to static data if the API is unreachable.
    items = articles.items.map((a) => ({
      ...a,
      doi: a.doi,
    }));
  }

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl md:text-4xl">
              {articles.title}
            </h2>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              {articles.subtitle}
            </p>
          </div>
          <Link
            href={articles.moreHref}
            className="inline-flex items-center gap-1 self-start rounded-sm bg-[#0b2545] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1e3a8a] sm:mt-6"
          >
            {articles.moreLabel} <span aria-hidden>&gt;</span>
          </Link>
        </div>

        {/* List */}
        <div className="mt-8">
          {items.length === 0 ? (
            <p className="text-sm text-slate-500">No articles available.</p>
          ) : (
            items.map((a) => <ArticleRow key={a.id} article={a} />)
          )}
        </div>
      </div>
    </section>
  );
}
