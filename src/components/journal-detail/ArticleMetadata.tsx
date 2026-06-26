import Link from "next/link";
import type { ArticleSpecialIssue } from "@/lib/article-slugs";

type ArticleMetadataProps = {
  volumeHref?: string;
  volumeLabel: string;
  citation: string;
  doi: string;
  copyright: string;
  specialIssue?: ArticleSpecialIssue;
};

export default function ArticleMetadata({
  volumeHref,
  volumeLabel,
  citation,
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
      label: "Citation",
      value: (
        <span className="text-slate-700">
          {citation}{" "}
          <a
            href={`https://doi.org/${doi}`}
            className="text-[#1d4ed8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
          >
            https://doi.org/{doi}
          </a>
        </span>
      ),
    },
    {
      label: "DOI",
      value: (
        <a
          href={`https://doi.org/${doi}`}
          className="text-[#1d4ed8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
        >
          {doi}
        </a>
      ),
    },
    {
      label: "Copyright",
      value: <span className="text-slate-700">{copyright}</span>,
    },
  ];

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
      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr]">
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={`flex flex-col sm:flex-row ${
              index !== rows.length - 1 ? "border-b border-slate-200" : ""
            }`}
          >
            <div className="bg-slate-50 px-4 py-3 text-sm font-semibold text-[#0b2545] sm:w-[140px] sm:border-r sm:border-slate-200">
              {row.label}
            </div>
            <div className="px-4 py-3 text-sm text-slate-800">{row.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
