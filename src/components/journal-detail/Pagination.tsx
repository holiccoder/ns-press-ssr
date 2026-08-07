import Link from "next/link";

function buildHref(
  base: string,
  params: Record<string, string | number | undefined>,
  page: number,
): string {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      search.set(key, String(value));
    }
  }
  search.set("page", String(page));
  const qs = search.toString();
  return qs ? `${base}?${qs}` : base;
}

export default function Pagination({
  base,
  params,
  currentPage,
  totalPages,
}: {
  base: string;
  params: Record<string, string | number | undefined>;
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + 4);
  for (let p = Math.max(1, end - 4); p <= end; p++) {
    pages.push(p);
  }

  const linkClass =
    "inline-flex h-8 min-w-8 items-center justify-center rounded-sm px-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]";

  return (
    <nav
      aria-label="Pagination"
      className="mt-8 flex items-center justify-center gap-1"
    >
      {currentPage > 1 && (
        <Link
          href={buildHref(base, params, currentPage - 1)}
          className={`${linkClass} border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[#0b2545]`}
        >
          Prev
        </Link>
      )}
      {pages.map((p) => {
        const active = p === currentPage;
        return (
          <Link
            key={p}
            href={buildHref(base, params, p)}
            className={`${linkClass} ${
              active
                ? "bg-[#0b2545] text-white"
                : "border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[#0b2545]"
            }`}
          >
            {p}
          </Link>
        );
      })}
      {currentPage < totalPages && (
        <Link
          href={buildHref(base, params, currentPage + 1)}
          className={`${linkClass} border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-[#0b2545]`}
        >
          Next
        </Link>
      )}
    </nav>
  );
}
