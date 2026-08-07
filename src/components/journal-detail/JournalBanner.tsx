import Image from "next/image";
import Link from "next/link";
import { parseIssn } from "@/lib/api";
import EAlertsModal from "./EAlertsModal";
import { PaperPlaneIcon } from "./icons";

type JournalBannerProps = {
  title: string;
  issn: string;
  frequency?: string;
  coden?: string;
  citeScore?: string;
  coverImage?: string;
  coverSlot?: React.ReactNode;
};

export default function JournalBanner({
  title,
  issn,
  frequency,
  coden,
  citeScore,
  coverImage,
  coverSlot,
}: JournalBannerProps) {
  const issns = parseIssn(issn);

  return (
    <section className="w-full bg-[#1e3a8a] pb-8 pt-5 text-white sm:pb-10 sm:pt-6">
      <div className="mx-auto max-w-7xl px-6">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm sm:mb-5">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link
                href="/"
                className="text-blue-100 hover:text-white hover:underline"
              >
                Home
              </Link>
            </li>
            <li aria-hidden className="text-white/40">
              &gt;
            </li>
            <li>
              <Link
                href="/journals"
                className="text-blue-100 hover:text-white hover:underline"
              >
                Journals
              </Link>
            </li>
            <li aria-hidden className="text-white/40">
              &gt;
            </li>
            <li className="font-medium text-white">{title}</li>
          </ol>
        </nav>

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
        {/* Cover */}
        <div className="shrink-0">
          <div className="relative aspect-[3/4] w-36 sm:w-44">
            {coverSlot ? (
              coverSlot
            ) : coverImage ? (
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-lg ring-1 ring-white/20">
                <Image
                  src={coverImage}
                  alt={`${title} journal cover`}
                  fill
                  sizes="(min-width: 640px) 176px, 144px"
                  className="object-cover"
                  priority
                />
              </div>
            ) : null}
          </div>
        </div>

        {/* Text + actions */}
        <div className="flex flex-col gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h1>

            <div className="flex flex-col gap-1 text-sm text-blue-100">
              {issns.map((i, idx) => {
                const isPrint = i.label.toLowerCase() === "print";
                const isOnline = i.label.toLowerCase() === "online";
                const isFallback = i.label.toLowerCase() === "issn";
                return (
                  <span key={`${i.label}-${idx}`}>
                    <span className="font-semibold">
                      {isPrint ? "ISSN (Print):" : isOnline ? "ISSN (Online):" : isFallback ? "ISSN:" : `ISSN (${i.label}):`}
                    </span>{" "}
                    {i.value}
                  </span>
                );
              })}
              {frequency && <span>Frequency: {frequency}</span>}
              {coden && <span>CODEN {coden}</span>}
              {citeScore && (
                <span className="font-semibold text-white">{citeScore}</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-sm bg-[#0b2545] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1e3a8a] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e3a8a]"
            >
              <PaperPlaneIcon className="h-4 w-4" />
              Submit Manuscript
            </Link>

            <EAlertsModal journalTitle={title} />
          </div>
        </div>
      </div>
    </div>
  </section>
);
}
