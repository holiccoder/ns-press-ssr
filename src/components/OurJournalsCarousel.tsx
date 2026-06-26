"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useRef } from "react";

export type CarouselItem = {
  id: number;
  href: string;
  title: string;
  coverImage: string;
  issn: string;
};

export default function OurJournalsCarousel({
  rows,
}: {
  rows: CarouselItem[][];
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.8, 240);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  return (
    <div className="relative mt-10">
      {/* Left arrow */}
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label="Previous journals"
        className="absolute -left-12 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b2545] text-white shadow-md transition-colors hover:bg-[#1e3a8a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] md:inline-flex"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <polyline points="15 6 9 12 15 18" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label="Next journals"
        className="absolute -right-12 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b2545] text-white shadow-md transition-colors hover:bg-[#1e3a8a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] md:inline-flex"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-5 w-5"
        >
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>

      <div
        ref={scrollerRef}
        className="hide-scrollbar flex snap-x snap-mandatory flex-col gap-y-10 overflow-x-auto scroll-smooth pb-2"
      >
        {rows.map((row, ri) => (
          <div
            key={ri}
            className="grid auto-cols-[calc((100%-1.25rem*5)/6)] grid-flow-col gap-5 max-md:auto-cols-[45%] max-sm:auto-cols-[70%]"
          >
            {row.map((item) => (
              <div key={item.id} className="snap-start">
                <JournalCard item={item} />
              </div>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        .hide-scrollbar { scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}

function JournalCard({ item }: { item: CarouselItem }) {
  return (
    <Link
      href={item.href}
      className="group flex w-full flex-col gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-md ring-1 ring-black/5 transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        <Image
          src={item.coverImage}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 200px, (min-width: 640px) 25vw, 70vw"
          className="object-cover"
        />
      </div>
      <p className="text-center text-sm font-semibold leading-snug text-slate-900 group-hover:text-[#1d4ed8]">
        {item.title}
      </p>
    </Link>
  );
}
