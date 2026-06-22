"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import home from "@/data/home.json";

const { specialIssues } = home;

type SpecialIssue = (typeof specialIssues.items)[number];

/* ---------- Card ---------- */

function IssueCard({ issue }: { issue: SpecialIssue }) {
  return (
    <Link
      href={issue.href}
      className="group flex h-full flex-col justify-between rounded-md bg-[#eef2f7] p-6 text-left shadow-sm ring-1 ring-slate-200/70 transition-all duration-200 hover:-translate-y-1 hover:bg-[#e6ecf3] hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
    >
      <div>
        {/* Title — clamped to two lines with an ellipsis, matching the spec. */}
        <h3
          className="text-base font-bold leading-snug text-[#0b2545] group-hover:text-[#1d4ed8] sm:text-lg"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {issue.title}
        </h3>

        <ul className="mt-5 space-y-1 text-sm text-slate-800">
          {issue.editors.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>

      <div className="mt-6 border-t border-slate-300/60 pt-4">
        <p className="text-xs font-medium tracking-wide text-slate-600">
          {specialIssues.deadlineLabel}
        </p>
        <p className="mt-1 text-base font-bold text-orange-500">
          {issue.deadline}
        </p>
      </div>
    </Link>
  );
}

/* ---------- Main component ---------- */

export default function SpecialIssues() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.8, 280);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl md:text-4xl">
            {specialIssues.title}
          </h2>
          <Link
            href={specialIssues.moreHref}
            className="inline-flex items-center gap-1 rounded-sm border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
          >
            {specialIssues.moreLabel} <span aria-hidden>&gt;</span>
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative mt-10">
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous special issues"
            className="absolute left-0 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-sky-400 transition-colors hover:text-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 md:inline-flex"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-9 w-9"
            >
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next special issues"
            className="absolute right-0 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full text-sky-400 transition-colors hover:text-sky-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 md:inline-flex"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-9 w-9"
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>

          {/* Scroller — four cards visible on desktop, fewer on smaller screens. */}
          <div
            ref={scrollerRef}
            className="hide-scrollbar grid auto-cols-[calc((100%-1.5rem*3)/4)] grid-flow-col gap-6 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory max-lg:auto-cols-[calc((100%-1.5rem)/2)] max-sm:auto-cols-[85%]"
          >
            {specialIssues.items.map((issue) => (
              <div key={issue.title} className="snap-start">
                <IssueCard issue={issue} />
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
