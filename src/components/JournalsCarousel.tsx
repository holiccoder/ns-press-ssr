import Link from "next/link";
import Image from "next/image";
import journalsData from "@/data/journals.json";
import { getJournalList, parseIssn, type JournalListItem } from "@/lib/api";
import { resolveJournalCover } from "@/lib/images";
import CarouselScroller from "./CarouselScroller";

const { breadcrumb, search } = journalsData;

/* ---------- Search icon ---------- */

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/* ---------- Card ---------- */

function JournalDetailCard({ journal }: { journal: JournalListItem }) {
  const issns = parseIssn(journal.issn);
  const href = `/journals/${journal.id}`;
  const coverImage = resolveJournalCover(journal.id, journal.cover_image);

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-2xl bg-white/55 p-6 ring-1 ring-white/70 backdrop-blur-sm transition-all duration-200 hover:bg-white/75 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
    >
      <h3 className="text-lg font-bold tracking-tight text-[#0b2545] group-hover:text-[#1d4ed8] sm:text-xl">
        {journal.title}
      </h3>

      <div className="relative mt-5 flex justify-center">
        <div
          aria-hidden
          className="absolute inset-x-6 top-4 bottom-2 -rotate-3 rounded-3xl bg-gradient-to-br from-[#bfd6ee] to-[#7aa6d6] opacity-80"
        />
        <div
          aria-hidden
          className="absolute inset-x-10 top-7 bottom-5 rotate-2 rounded-2xl bg-gradient-to-br from-[#dbeafe] to-[#93c5fd] opacity-70"
        />
        <div
          className="relative aspect-[3/4] w-[58%] -rotate-[6deg] transition-transform duration-300 group-hover:-rotate-[3deg] group-hover:scale-[1.02]"
          style={{
            filter:
              "drop-shadow(8px 12px 14px rgba(15,23,42,0.28)) drop-shadow(2px 3px 4px rgba(15,23,42,0.18))",
          }}
        >
          <Image
            src={coverImage}
            alt={`${journal.title} journal cover`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 85vw"
            className="rounded-sm object-cover"
          />
        </div>
      </div>

      <dl className="mt-6 space-y-1 text-xs leading-relaxed text-slate-700 sm:text-sm">
        {issns.map((m, i) => (
          <div key={i} className="flex gap-2">
            <dt className="font-semibold text-slate-800">ISSN:</dt>
            <dd>
              {m.value} ({m.label})
            </dd>
          </div>
        ))}
        {journal.frequency && (
          <div className="flex gap-2">
            <dt className="font-semibold text-slate-800">Frequency:</dt>
            <dd>{journal.frequency}</dd>
          </div>
        )}
      </dl>
    </Link>
  );
}

/* ---------- Main carousel ---------- */

export default async function JournalsCarousel() {
  let lists: JournalListItem[] = [];
  try {
    const data = await getJournalList({ page: 1, pageSize: 12, lang: "中文" });
    lists = data.lists;
  } catch (err) {
    console.error("[JournalsCarousel] failed to load journalList:", err);
  }

  return (
    <section className="bg-white pb-16 pt-8 sm:pb-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Top row: breadcrumb + search bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <ol className="flex items-center gap-1.5">
              {breadcrumb.map((crumb, i) => {
                const isLast = i === breadcrumb.length - 1;
                return (
                  <li key={i} className="flex items-center gap-1.5">
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="hover:text-[#0b2545] hover:underline"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="font-medium text-slate-700">
                        {crumb.label}
                      </span>
                    )}
                    {!isLast && (
                      <span aria-hidden className="text-slate-400">
                        &gt;
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <form
            role="search"
            action={search.action}
            className="flex w-full max-w-sm items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-slate-200"
          >
            <label htmlFor="journals-search" className="sr-only">
              {search.label}
            </label>
            <input
              id="journals-search"
              type="search"
              name="q"
              placeholder={search.placeholder}
              className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              aria-label={search.label}
              className="text-slate-400 transition-colors hover:text-slate-600"
            >
              <SearchIcon className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Carousel container with the soft blue/grey tinted background. */}
        <div
          className="relative mt-8 overflow-hidden rounded-3xl px-8 py-10 sm:px-12"
          style={{
            background:
              "linear-gradient(135deg, rgba(219,234,254,0.85) 0%, rgba(191,219,254,0.65) 50%, rgba(186,230,253,0.75) 100%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-white/40 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-12 bottom-0 h-48 w-48 rounded-full bg-sky-200/50 blur-3xl"
          />

          {lists.length === 0 ? (
            <p className="text-sm text-slate-600">
              No journals available right now.
            </p>
          ) : (
            <CarouselScroller>
              {lists.map((j) => (
                <div key={j.id} className="snap-start">
                  <JournalDetailCard journal={j} />
                </div>
              ))}
            </CarouselScroller>
          )}
        </div>
      </div>
    </section>
  );
}
