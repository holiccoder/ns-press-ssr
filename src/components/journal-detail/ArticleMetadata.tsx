import Link from "next/link";
import type { ArticleSpecialIssue } from "@/lib/article-slugs";

type ArticleMetadataProps = {
  volumeHref?: string;
  volumeLabel: string;
  articleHref: string;
  doi: string;
  copyright: string;
  specialIssue?: ArticleSpecialIssue;
};

export default function ArticleMetadata({
  volumeHref,
  volumeLabel,
  articleHref,
  doi,
  copyright,
  specialIssue,
}: ArticleMetadataProps) {
  const rows: { label: string; value: React.ReactNode }[] = [
    {
      label: "Volume",
      value: volumeHref ? (
        <Link
          href={volumeHref}
          className="text-[#1d4ed8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
        >
          {volumeLabel}
        </Link>
      ) : (
        <span className="text-slate-700">{volumeLabel}</span>
      ),
    },
    {
      label: "Link",
      value: (
        <Link
          href={articleHref}
          className="text-[#1d4ed8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
        >
          {articleHref}
        </Link>
      ),
    },
    {
      label: "Copyright",
      value: <span className="text-slate-700">{copyright}</span>,
    },
  ];

  if (doi) {
    rows.splice(rows.length - 1, 0, {
      label: "DOI",
      value: (
        <a
          href={`https://doi.org/${doi}`}
          className="text-[#1d4ed8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
        >
          {doi}
        </a>
      ),
    });
  }

  if (specialIssue) {
    rows.push({
      label: "Special Issue",
      value: specialIssue.href ? (
        <Link
          href={specialIssue.href}
          className="text-[#1d4ed8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
        >
          {specialIssue.title}
        </Link>
      ) : (
        <span className="text-slate-700">{specialIssue.title}</span>
      ),
    });
  }

  return (
    <div className="overflow-hidden rounded-sm border border-slate-200">
      <div>
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={`flex flex-row items-start ${
              index !== rows.length - 1 ? "border-b border-slate-200" : ""
            }`}
          >
            <div className="w-[140px] shrink-0 border-r border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-[#0b2545]">
              {row.label}
            </div>
            <div className="px-4 py-3 text-sm text-slate-800">{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
