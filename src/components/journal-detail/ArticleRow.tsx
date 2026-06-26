import Link from "next/link";
import GraphicalAbstract from "./GraphicalAbstract";
import {
  AbstractIcon,
  FullTextIcon,
  PdfIcon,
  ReferencesIcon,
} from "./icons";
import type { EnrichedArticle } from "@/lib/journal-slugs";

const ICONS: Record<string, React.FC<{ className?: string }>> = {
  Abstract: AbstractIcon,
  PDF: PdfIcon,
  "Full Text": FullTextIcon,
  References: ReferencesIcon,
};

export default function ArticleRow({ article }: { article: EnrichedArticle }) {
  return (
    <article className="grid grid-cols-1 gap-5 border-b border-slate-200 py-6 last:border-b-0 md:grid-cols-[1fr_160px] md:gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
          <span className="font-semibold text-slate-700">{article.type}</span>
          <span className="text-slate-300">|</span>
          {article.openAccess && (
            <span className="font-bold tracking-wider text-orange-600">
              OPEN ACCESS
            </span>
          )}
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">{article.date}</span>
        </div>

        <Link
          href={`#article-${article.id}`}
          className="group block text-base font-bold leading-snug text-[#0b2545] hover:text-[#1d4ed8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] sm:text-lg"
        >
          {article.title}
        </Link>

        <p className="text-sm text-slate-600">
          DOI:{" "}
          <a
            href={`https://doi.org/${article.doi}`}
            className="text-[#1d4ed8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
          >
            {article.doi}
          </a>
        </p>

        <p className="text-sm italic text-slate-700">{article.authors}</p>

        <div className="flex flex-wrap items-center gap-4 pt-1">
          {article.links.map((link) => {
            const Icon = ICONS[link.label] ?? AbstractIcon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1d4ed8] hover:text-[#0b2545] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center">
        <div className="aspect-[16/10] w-full max-w-[180px] md:max-w-none">
          <GraphicalAbstract visualId={article.visualId} />
        </div>
      </div>
    </article>
  );
}
