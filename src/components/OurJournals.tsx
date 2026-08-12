import Link from "next/link";
import home from "@/data/home.json";
import { getJournalList, type JournalListItem } from "@/lib/api";
import { getServerApiLang } from "@/lib/lang.server";
import { resolveJournalCover } from "@/lib/images";
import OurJournalsCarousel, {
  type CarouselItem,
} from "./OurJournalsCarousel";

const { ourJournals } = home;

function toHref(id: number): string {
  return `/journals/${id}`;
}

export default async function OurJournals() {
  const lang = await getServerApiLang();
  let lists: JournalListItem[] = [];
  try {
    const data = await getJournalList({ page: 1, pageSize: 12, lang });
    lists = data?.lists || [];
  } catch (err) {
    // Upstream API hiccup — log it and render an empty section rather than
    // crashing the whole homepage. Next's revalidation will refresh later.
    console.error("[OurJournals] failed to load journalList:", err);
  }

  const listsArray = Array.isArray(lists) ? lists : [];

  const items: CarouselItem[] = listsArray
    .map((j) => {
      if (!j) return null;
      return {
        id: j.id ?? 0,
        title: j.title || "Untitled Journal",
        coverImage: resolveJournalCover(j.id ?? 0, j.cover_image || ""),
        issn: j.issn || "",
        href: toHref(j.id ?? 0),
      };
    })
    .filter((x): x is CarouselItem => x !== null);

  // Ensure there are at least 4 items so that the 4-card layout looks complete on desktop
  if (items.length < 4) {
    const existingIds = new Set(items.map((i) => i.id));
    const mockOptions = [
      {
        id: 4,
        title: "Smart Construction",
        coverImage: resolveJournalCover(4, "/images/journals/covers/4.jpg"),
        issn: "3007-5114(Print); 3007-5122(Online)",
        href: toHref(4),
      },
      {
        id: 5,
        title: "Biofunctional Materials",
        coverImage: resolveJournalCover(5, "/images/journals/covers/5.png"),
        issn: "3106-3322(Print); 3106-3330(Online)",
        href: toHref(5),
      },
      {
        id: 6,
        title: "Research on Educational Theory",
        coverImage: resolveJournalCover(6, "/images/journals/covers/6.jpg"),
        issn: "3106-3349(Print); 3106-3357(Online)",
        href: toHref(6),
      },
      {
        id: 7,
        title: "Humanities and Social Sciences",
        coverImage: resolveJournalCover(7, "/images/journals/covers/7.jpg"),
        issn: "3106-3365(Print); 3106-3373(Online)",
        href: toHref(7),
      },
    ];

    for (const opt of mockOptions) {
      if (!existingIds.has(opt.id)) {
        items.push(opt);
        existingIds.add(opt.id);
      }
      if (items.length >= 4) {
        break;
      }
    }
  }

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
          <OurJournalsCarousel items={items} />
        )}
      </div>
    </section>
  );
}
