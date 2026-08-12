"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useRef } from "react";
import { parseIssn } from "@/lib/api";

export type CarouselItem = {
  id: number;
  href: string;
  title: string;
  coverImage: string;
  issn: string;
};

export default function OurJournalsCarousel({
  items,
}: {
  items: CarouselItem[];
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const half = Math.ceil(items.length / 2);
  const columns = Array.from({ length: half }, (_, columnIndex) =>
    [items[columnIndex], items[columnIndex + half]].filter(
      (item): item is CarouselItem => Boolean(item),
    ),
  );

  const scrollBy = useCallback((direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy({
      left: direction * scroller.clientWidth,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="relative mt-8 px-8 sm:px-10">
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label="Previous journals"
        className="absolute left-0 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b2545] text-white shadow-md transition-colors hover:bg-[#1e3a8a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] sm:h-10 sm:w-10"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-4 w-4 sm:h-5 sm:w-5"
        >
          <polyline points="15 6 9 12 15 18" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label="Next journals"
        className="absolute right-0 top-1/2 z-10 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b2545] text-white shadow-md transition-colors hover:bg-[#1e3a8a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] sm:h-10 sm:w-10"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-4 w-4 sm:h-5 sm:w-5"
        >
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>

      <div
        ref={scrollerRef}
        className="hide-scrollbar flex gap-x-5 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory"
      >
        {columns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="grid w-[calc((100%-5rem)/5)] min-w-[calc((100%-5rem)/5)] shrink-0 snap-start grid-rows-2 gap-y-8 max-lg:w-[calc((100%-2.5rem)/3)] max-lg:min-w-[calc((100%-2.5rem)/3)] max-md:w-[calc((100%-1rem)/2)] max-md:min-w-[calc((100%-1rem)/2)]"
          >
            {column.map((item) => (
              <JournalCard key={item.id} item={item} />
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
  const issns = parseIssn(item.issn);

  return (
    <Link
      href={item.href}
      className="group flex w-full flex-col gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm transition-transform duration-300 group-hover:-translate-y-1">
        <Image
          src={item.coverImage}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover"
        />
      </div>
      <p className="line-clamp-2 text-center text-xs font-semibold leading-snug text-slate-900 group-hover:text-[#1d4ed8] sm:text-sm">
        {item.title}
      </p>
      {issns.length > 0 && (
        <div className="space-y-0.5 text-center text-[10px] font-medium leading-relaxed text-slate-500 sm:text-[11px]">
          {issns.map((m, i) => {
            const isPrint = m.label.toLowerCase() === "print";
            const isOnline = m.label.toLowerCase() === "online";
            const labelStr = isPrint ? "Print" : isOnline ? "Online" : m.label;
            return (
              <span key={i} className="block">
                ISSN ({labelStr}): {m.value}
              </span>
            );
          })}
        </div>
      )}
    </Link>
  );
}
