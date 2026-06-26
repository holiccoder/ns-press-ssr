"use client";

import { useCallback, useRef, type ReactNode } from "react";

export default function CarouselScroller({
  children,
}: {
  children: ReactNode;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.8, 320);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => scrollBy(-1)}
        aria-label="Previous journals"
        className="absolute left-5 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b2545] text-white shadow-md transition-colors hover:bg-[#1e3a8a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] md:inline-flex"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-6 w-6"
        >
          <polyline points="15 6 9 12 15 18" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => scrollBy(1)}
        aria-label="Next journals"
        className="absolute right-5 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b2545] text-white shadow-md transition-colors hover:bg-[#1e3a8a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] md:inline-flex"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="h-6 w-6"
        >
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>

      <div
        ref={scrollerRef}
        className="hide-scrollbar relative grid auto-cols-[calc((100%-2rem*2)/3)] grid-flow-col gap-8 overflow-x-auto scroll-smooth pb-2 snap-x snap-mandatory max-lg:auto-cols-[calc((100%-2rem)/2)] max-md:auto-cols-[85%]"
      >
        {children}
      </div>

      <style>{`
        .hide-scrollbar { scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  );
}
