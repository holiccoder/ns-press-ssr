import Link from "next/link";
import {
  CiteIcon,
  DownloadIcon,
  ExpandIcon,
  ShareIcon,
} from "./icons";

type ArticleHeaderProps = {
  journalSlug: string;
  journalTitle: string;
  volumeHref?: string;
  volumeLabel: string;
  articleType: string;
  openAccess: boolean;
  title: string;
  pdfUrl?: string;
};

export default function ArticleHeader({
  journalSlug,
  journalTitle,
  volumeHref,
  volumeLabel,
  articleType,
  openAccess,
  title,
  pdfUrl = "#pdf",
}: ArticleHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link
              href="/"
              className="hover:text-[#0b2545] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
            >
              Home
            </Link>
          </li>
          <li aria-hidden className="text-slate-400">
            &gt;
          </li>
          <li>
            <Link
              href="/journals"
              className="hover:text-[#0b2545] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
            >
              Journals
            </Link>
          </li>
          <li aria-hidden className="text-slate-400">
            &gt;
          </li>
          <li>
            <Link
              href={`/journals/${journalSlug}`}
              className="hover:text-[#0b2545] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
            >
              {journalTitle}
            </Link>
          </li>
          <li aria-hidden className="text-slate-400">
            &gt;
          </li>
          <li>
            {volumeHref ? (
              <Link
                href={volumeHref}
                className="hover:text-[#0b2545] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
              >
                {volumeLabel}
              </Link>
            ) : (
              <span className="font-medium text-slate-700">{volumeLabel}</span>
            )}
          </li>
        </ol>
      </nav>

      {/* Type / Open Access / Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <span className="font-semibold text-[#0b2545]">{articleType}</span>
          <span className="text-slate-300">|</span>
          {openAccess && (
            <span className="font-bold tracking-wider text-green-600">
              OPEN ACCESS
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          <ActionButton icon={CiteIcon} label="Cite" />
          <ActionButton icon={ShareIcon} label="Share" />
          <ActionButton icon={ExpandIcon} label="Expand" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold leading-tight text-[#0b2545] sm:text-3xl">
        {title}
      </h1>

      {/* Download PDF */}
      <a
        href={pdfUrl}
        className="inline-flex items-center gap-2 rounded-sm bg-[#0b2545] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1e3a8a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] focus-visible:ring-offset-2"
      >
        <DownloadIcon className="h-4 w-4" />
        DOWNLOAD PDF
      </a>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
}: {
  icon: React.FC<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      type="button"
      className="inline-flex flex-col items-center gap-0.5 rounded-sm px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-[#0b2545] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );
}
