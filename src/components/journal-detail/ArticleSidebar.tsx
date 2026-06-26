import Link from "next/link";
import AsymmetryCover from "./AsymmetryCover";
import { ArrowRightIcon } from "./icons";
import type {
  ArticleMetrics,
  ArticleDates,
  RecommendedArticle,
} from "@/lib/article-slugs";

type ArticleSidebarProps = {
  metrics: ArticleMetrics;
  dates: ArticleDates;
  recommendedArticles: RecommendedArticle[];
};

export default function ArticleSidebar({
  metrics,
  dates,
  recommendedArticles,
}: ArticleSidebarProps) {
  return (
    <aside className="space-y-6">
      {/* Cover */}
      <div className="overflow-hidden rounded-sm shadow-sm ring-1 ring-slate-200">
        <AsymmetryCover className="h-auto w-full" />
      </div>

      {/* Submit */}
      <a
        href="#submit"
        className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#0b2545] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#1e3a8a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] focus-visible:ring-offset-2"
      >
        SUBMIT
        <ArrowRightIcon className="h-4 w-4" />
      </a>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-4 rounded-sm border border-slate-200 p-4">
        <MetricItem value={metrics.accesses} label="Accesses" />
        <MetricItem value={metrics.downloads} label="Downloads" />
      </div>

      {/* Dates */}
      <div className="rounded-sm border border-slate-200 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0b2545]">
          Key Dates
        </h3>
        <ul className="mt-3 space-y-2 text-sm">
          <DateItem label="Received" value={dates.received} />
          <DateItem label="Accepted" value={dates.accepted} />
          <DateItem label="Published" value={dates.published} />
        </ul>
      </div>

      {/* Recommended Articles */}
      <div className="rounded-sm border border-slate-200 p-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0b2545]">
          Recommended Articles
        </h3>
        <ul className="mt-3 space-y-4">
          {recommendedArticles.map((article) => (
            <li key={article.id} className="text-sm">
              <Link
                href={article.href || "#"}
                className="block font-medium leading-snug text-[#0b2545] hover:text-[#1d4ed8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
              >
                {article.title}
              </Link>
              <p className="mt-1 text-xs text-slate-500">
                {article.date} by {article.authors}
              </p>
            </li>
          ))}
        </ul>
        <Link
          href="#more"
          className="mt-4 inline-block text-sm font-semibold text-[#1d4ed8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
        >
          View more &gt;
        </Link>
      </div>
    </aside>
  );
}

function MetricItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-[#0b2545]">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function DateItem({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex justify-between">
      <span className="font-medium text-slate-600">{label}:</span>
      <span className="text-slate-800">{value}</span>
    </li>
  );
}
