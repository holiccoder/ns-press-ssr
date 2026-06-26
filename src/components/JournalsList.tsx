import Link from "next/link";
import Image from "next/image";
import { getJournalList, parseIssn, type JournalListItem } from "@/lib/api";
import { resolveJournalCover } from "@/lib/images";

function toHref(id: number): string {
  return `/journals/${id}`;
}

export default async function JournalsList() {
  let lists: JournalListItem[] = [];
  let failed = false;
  try {
    const data = await getJournalList({ page: 1, pageSize: 12, lang: "中文" });
    lists = data.lists;
  } catch (err) {
    failed = true;
    console.error("[JournalsList] failed to load journalList:", err);
  }

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div>
          {lists.length === 0 ? (
            <p className="text-sm text-slate-500">
              {failed
                ? "Unable to load journals right now. Please try again later."
                : "No journals available."}
            </p>
          ) : (
            lists.map((j) => {
              const href = toHref(j.id);
              const issns = parseIssn(j.issn);
              return (
                <article
                  key={j.id}
                  className="grid grid-cols-[140px_1fr] gap-6 border-b border-slate-200 py-8 last:border-b-0 sm:grid-cols-[180px_1fr] sm:gap-8 md:grid-cols-[200px_1fr] md:gap-10"
                >
                  <Link
                    href={href}
                    aria-label={j.title}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] focus-visible:ring-offset-2"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-md ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                      <Image
                        src={resolveJournalCover(j.id, j.cover_image)}
                        alt={j.title}
                        fill
                        sizes="(min-width: 768px) 200px, (min-width: 640px) 180px, 140px"
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  <div className="flex flex-col gap-3">
                    <Link
                      href={href}
                      className="group inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] focus-visible:ring-offset-2"
                    >
                      <h2 className="text-xl font-bold text-[#0b2545] group-hover:text-[#1d4ed8] sm:text-2xl">
                        {j.title}
                      </h2>
                    </Link>

                    <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600">
                      {issns.map((i, idx) => (
                        <span key={`${i.label}-${idx}`}>
                          <span className="font-semibold text-slate-700">
                            ISSN:
                          </span>{" "}
                          {i.value}{" "}
                          <span className="text-slate-500">({i.label})</span>
                        </span>
                      ))}
                      {j.frequency && (
                        <span>
                          <span className="font-semibold text-slate-700">
                            Frequency:
                          </span>{" "}
                          {j.frequency}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
