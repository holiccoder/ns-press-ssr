import Link from "next/link";
import home from "@/data/home.json";
import { getJournalList, type JournalListItem } from "@/lib/api";
import { resolveJournalCover } from "@/lib/images";
import OurJournalsCarousel, {
  type CarouselItem,
} from "./OurJournalsCarousel";

const { ourJournals } = home;

function toHref(id: number): string {
  return `/journals/${id}`;
}

function chunkRows<T>(items: T[], rowSize: number): T[][] {
  if (items.length === 0) return [];
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += rowSize) {
    rows.push(items.slice(i, i + rowSize));
  }
  // Always render at least one row; if a single row, still wrap as [row].
  return rows;
}

export default async function OurJournals() {
  let lists: JournalListItem[] = [];
  try {
    const data = await getJournalList({ page: 1, pageSize: 12, lang: "中文" });
    lists = data.lists;
  } catch (err) {
    // Upstream API hiccup — log it and render an empty section rather than
    // crashing the whole homepage. Next's revalidation will refresh later.
    console.error("[OurJournals] failed to load journalList:", err);
  }

  const items: CarouselItem[] = lists.map((j) => ({
    id: j.id,
    title: j.title,
    coverImage: resolveJournalCover(j.id, j.cover_image),
    issn: j.issn,
    href: toHref(j.id),
  }));

  // Two rows when we have at least 4 items, otherwise one row.
  const rowSize = items.length >= 4 ? Math.ceil(items.length / 2) : items.length;
  const rows = chunkRows(items, rowSize);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl md:text-4xl">
            {ourJournals.title}
          </h2>
          <Link
            href={ourJournals.moreHref}
            className="inline-flex items-center gap-1 rounded-sm bg-[#0b2545] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1e3a8a]"
          >
            {ourJournals.moreLabel} <span aria-hidden>&gt;</span>
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="mt-10 text-sm text-slate-500">No journals available.</p>
        ) : (
          <OurJournalsCarousel rows={rows} />
        )}
      </div>
    </section>
  );
}
