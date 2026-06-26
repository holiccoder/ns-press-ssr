import { CalendarIcon } from "./icons";
import type { NewsItem } from "@/lib/journal-slugs";

export default function NewsList({ news }: { news?: NewsItem[] }) {
  if (!news || news.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-base font-bold text-[#0b2545]">News & Conferences</h2>

      <ul className="space-y-4">
        {news.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            {/* Thumbnail placeholder */}
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-sm bg-gradient-to-br from-blue-100 to-sky-200 ring-1 ring-slate-200"
            />

            <div className="min-w-0 text-sm">
              <a
                href={`#news-${item.id}`}
                className="block font-medium leading-snug text-[#0b2545] hover:text-[#1d4ed8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
              >
                {item.title}
              </a>
              <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <CalendarIcon className="h-3.5 w-3.5" />
                {item.date}
              </div>
            </div>
          </li>
        ))}
      </ul>

      <a
        href="#news"
        className="inline-block text-sm font-medium text-[#1d4ed8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
      >
        View more news
      </a>
    </div>
  );
}
