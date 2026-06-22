"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import journalsData from "@/data/journals.json";

const { breadcrumb, search, carousel } = journalsData;

/* ---------------------------------------------------------------------------
   Journal cover artworks — inline SVG so the page renders crisply at any
   size without shipping raster assets. These match the cover designs used
   on the homepage (Biofunctional Materials, ExRNA, Law, Ethics & Technology).
--------------------------------------------------------------------------- */

function ElspBadge({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[9px] font-semibold tracking-[0.18em] ${
        tone === "dark" ? "text-white/90" : "text-slate-700"
      }`}
    >
      <span className="grid h-3.5 w-3.5 place-items-center rounded-sm bg-white/90 text-[8px] font-extrabold leading-none text-[#0b2545]">
        E
      </span>
      ELSP
    </span>
  );
}

function CoverFrame({
  issn,
  children,
  tone = "light",
  brandSlot,
  className = "",
}: {
  issn: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  brandSlot?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-lg ring-1 ring-black/10 ${className}`}
    >
      {children}
      <span
        className={`absolute right-2 top-2 text-[8px] font-semibold tracking-wider ${
          tone === "dark" ? "text-white/80" : "text-slate-700"
        }`}
      >
        ISSN {issn}
      </span>
      <div className="absolute bottom-2 left-2 flex items-center gap-2">
        {brandSlot}
        <ElspBadge tone={tone} />
      </div>
    </div>
  );
}

function BiofunctionalMaterialsCover({ className = "" }: { className?: string }) {
  return (
    <CoverFrame issn="2959-0582" tone="dark" className={className}>
      <div className="absolute inset-0 flex flex-col">
        <div className="h-2/5 bg-gradient-to-b from-cyan-200 to-cyan-100" />
        <div className="flex-1 bg-gradient-to-b from-[#0b2545] to-[#050b1f]" />
      </div>
      <div className="absolute inset-x-0 top-6 px-3 text-center">
        <p className="text-[9px] font-semibold tracking-[0.28em] text-slate-700">
          JOURNAL OF
        </p>
        <p className="mt-1 text-[11px] font-bold leading-tight tracking-wide text-[#0b2545]">
          Biofunctional
          <br />
          Materials
        </p>
      </div>
      <svg viewBox="0 0 100 60" className="absolute inset-x-0 bottom-6 h-20 w-full" aria-hidden="true">
        <g fill="none" stroke="#67e8f9" strokeWidth="0.6" opacity="0.85">
          <circle cx="30" cy="35" r="10" />
          <circle cx="55" cy="25" r="7" />
          <circle cx="70" cy="40" r="9" />
          <path d="M30 35 Q 42 20 55 25 Q 65 32 70 40" />
          <path d="M25 45 Q 40 50 55 45 Q 65 50 75 48" />
          <path d="M82 8 Q 92 18 82 28 Q 72 38 82 48" stroke="#a5f3fc" strokeWidth="0.6" />
          <path d="M92 8 Q 82 18 92 28 Q 102 38 92 48" stroke="#a5f3fc" strokeWidth="0.6" />
        </g>
        <g fill="#22d3ee" opacity="0.85">
          <circle cx="30" cy="35" r="2" />
          <circle cx="55" cy="25" r="1.6" />
          <circle cx="70" cy="40" r="2" />
          <circle cx="18" cy="48" r="1" />
          <circle cx="84" cy="32" r="1" />
        </g>
      </svg>
    </CoverFrame>
  );
}

function ExRNACover({ className = "" }: { className?: string }) {
  return (
    <CoverFrame
      issn="2398-0060"
      tone="light"
      className={className}
      brandSlot={
        <span className="text-[9px] font-bold tracking-[0.18em] text-rose-600">
          RIBIO
        </span>
      }
    >
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-x-0 top-5 px-4 text-center">
        <p className="text-[10px] tracking-[0.3em] text-slate-500">JOURNAL</p>
        <p className="mt-1 text-lg font-extrabold italic text-rose-600">
          ExRNA
        </p>
      </div>
      <svg viewBox="0 0 100 100" className="absolute inset-x-0 top-10 mx-auto h-24 w-full" aria-hidden="true">
        <g>
          <ellipse cx="30" cy="55" rx="14" ry="9" fill="#ef4444" />
          <ellipse cx="30" cy="55" rx="6" ry="4" fill="#b91c1c" />
          <ellipse cx="65" cy="68" rx="13" ry="8" fill="#dc2626" />
          <ellipse cx="65" cy="68" rx="5" ry="3.5" fill="#991b1b" />
          <ellipse cx="78" cy="48" rx="10" ry="7" fill="#ef4444" />
          <ellipse cx="78" cy="48" rx="4" ry="3" fill="#b91c1c" />
        </g>
      </svg>
      <svg viewBox="0 0 80 80" className="absolute bottom-6 right-2 h-20 w-20" aria-hidden="true">
        <g stroke="#0ea5e9" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M20 5 C 60 25, 20 45, 60 65 M60 5 C 20 25, 60 45, 20 65" />
          {[10, 22, 34, 46, 58].map((y) => (
            <line key={y} x1="22" y1={y} x2="58" y2={y} stroke="#38bdf8" />
          ))}
        </g>
      </svg>
    </CoverFrame>
  );
}

function LawEthicsCover({ className = "" }: { className?: string }) {
  return (
    <CoverFrame
      issn="2959-3085"
      tone="dark"
      className={className}
      brandSlot={
        <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-amber-400 text-[8px] font-extrabold leading-none text-slate-900">
          L
        </span>
      }
    >
      <div className="absolute inset-0 flex flex-col">
        <div className="h-2/5 bg-white" />
        <div className="flex-1 bg-gradient-to-b from-[#0b2545] to-[#020617]" />
      </div>
      <div className="absolute inset-x-0 top-6 px-3 text-center">
        <p className="text-[10px] font-bold leading-tight tracking-wide text-[#0b2545]">
          Law, Ethics
          <br />& Technology
        </p>
      </div>
      <svg viewBox="0 0 100 100" className="absolute inset-x-0 bottom-4 mx-auto h-24 w-24" aria-hidden="true">
        <g fill="none" stroke="#60a5fa" strokeWidth="0.5" opacity="0.85">
          <circle cx="50" cy="50" r="28" />
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse key={i} cx="50" cy="50" rx="28" ry="10" transform={`rotate(${i * 30} 50 50)`} />
          ))}
        </g>
        <g fill="#93c5fd">
          {[[22, 50], [78, 50], [50, 22], [50, 78], [32, 30], [68, 30], [32, 70], [68, 70]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.5" />
          ))}
        </g>
      </svg>
    </CoverFrame>
  );
}

/* ---------- id → cover lookup ---------- */

const COVERS: Record<string, (cls: string) => React.ReactNode> = {
  "biofunctional-materials": (cls) => <BiofunctionalMaterialsCover className={cls} />,
  "exrna":                   (cls) => <ExRNACover                  className={cls} />,
  "law-ethics-technology":   (cls) => <LawEthicsCover              className={cls} />,
};

/* ---------- Card ---------- */

type Journal = (typeof carousel.items)[number];

function JournalDetailCard({ journal }: { journal: Journal }) {
  return (
    <Link
      href={journal.href}
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
          className="relative w-[58%] -rotate-[6deg] transition-transform duration-300 group-hover:-rotate-[3deg] group-hover:scale-[1.02]"
          style={{
            filter:
              "drop-shadow(8px 12px 14px rgba(15,23,42,0.28)) drop-shadow(2px 3px 4px rgba(15,23,42,0.18))",
          }}
        >
          {COVERS[journal.id]("h-full w-full")}
        </div>
      </div>

      <dl className="mt-6 space-y-1 text-xs leading-relaxed text-slate-700 sm:text-sm">
        {journal.metadata.map((m, i) => (
          <div key={i} className="flex gap-2">
            <dt className="font-semibold text-slate-800">{m.label}:</dt>
            <dd>{m.value}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-sm leading-relaxed text-slate-700">
        {journal.description}
      </p>
    </Link>
  );
}

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

/* ---------- Main carousel ---------- */

export default function JournalsCarousel() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.8, 320);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

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
                      <Link href={crumb.href} className="hover:text-[#0b2545] hover:underline">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="font-medium text-slate-700">{crumb.label}</span>
                    )}
                    {!isLast && <span aria-hidden className="text-slate-400">&gt;</span>}
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
          <div aria-hidden className="pointer-events-none absolute -left-10 top-10 h-40 w-40 rounded-full bg-white/40 blur-2xl" />
          <div aria-hidden className="pointer-events-none absolute -right-12 bottom-0 h-48 w-48 rounded-full bg-sky-200/50 blur-3xl" />

          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous journals"
            className="absolute left-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-sky-500 shadow-md ring-1 ring-sky-100 transition-colors hover:bg-white hover:text-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 md:inline-flex"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next journals"
            className="absolute right-2 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-sky-500 shadow-md ring-1 ring-sky-100 transition-colors hover:bg-white hover:text-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 md:inline-flex"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-6 w-6">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>

          <div
            ref={scrollerRef}
            className="hide-scrollbar relative grid auto-cols-[calc((100%-2rem*2)/3)] grid-flow-col gap-8 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory max-lg:auto-cols-[calc((100%-2rem)/2)] max-md:auto-cols-[85%]"
          >
            {carousel.items.map((j) => (
              <div key={j.id} className="snap-start">
                <JournalDetailCard journal={j} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar { scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
