import Image from "next/image";
import Link from "next/link";
import { parseIssn } from "@/lib/api";
import { ChevronDownIcon, EnvelopeIcon, PaperPlaneIcon } from "./icons";

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
    <section className="w-full bg-[#1e3a8a] py-8 text-white sm:py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-center md:gap-10">
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

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-blue-100">
              {issns.map((i, idx) => (
                <span key={`${i.label}-${idx}`}>
                  ISSN {i.value} ({i.label})
                </span>
              ))}
              {coden && <span>CODEN {coden}</span>}
              {citeScore && (
                <span className="font-semibold text-white">{citeScore}</span>
              )}
              {frequency && <span>Frequency: {frequency}</span>}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <details className="group relative">
              <summary className="flex cursor-pointer list-none items-center gap-2 rounded-sm bg-white px-4 py-2 text-sm font-semibold text-[#0b2545] transition-colors hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e3a8a]"
              >
                Quick Volumes
                <ChevronDownIcon className="h-4 w-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="absolute left-0 top-full z-20 mt-1 w-44 rounded-sm border border-slate-200 bg-white py-1 text-sm text-[#0b2545] shadow-lg">
                <a
                  href="#volumes"
                  className="block px-4 py-2 hover:bg-slate-50"
                >
                  Volume 2025
                </a>
                <a
                  href="#volumes"
                  className="block px-4 py-2 hover:bg-slate-50"
                >
                  Volume 2024
                </a>
                <a
                  href="#volumes"
                  className="block px-4 py-2 hover:bg-slate-50"
                >
                  Volume 2023
                </a>
              </div>
            </details>

            <Link
              href="#submit"
              className="inline-flex items-center gap-2 rounded-sm bg-[#0b2545] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1e3a8a] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e3a8a]"
            >
              <PaperPlaneIcon className="h-4 w-4" />
              Submit Manuscript
            </Link>

            <Link
              href="#alerts"
              className="inline-flex items-center gap-2 rounded-sm border border-white/70 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e3a8a]"
            >
              <EnvelopeIcon className="h-4 w-4" />
              Get E-Alerts
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
