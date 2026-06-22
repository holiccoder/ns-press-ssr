import Link from "next/link";
import books from "@/data/books.json";

/* ---------------------------------------------------------------------------
   Book cover artworks — inline SVG so the page renders crisply without any
   raster assets. Each cover keeps the distinguishing palette and motifs
   described in the spec (yellow/orange geometric, white with photo grid, etc.).
--------------------------------------------------------------------------- */

function ElspMark({ tone = "dark" }: { tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[8px] font-semibold tracking-[0.18em] ${
        tone === "dark" ? "text-slate-700" : "text-white/90"
      }`}
    >
      <span className="grid h-3 w-3 place-items-center rounded-sm bg-white/95 text-[7px] font-extrabold leading-none text-[#0b2545]">
        E
      </span>
      ELSP
    </span>
  );
}

/* Yellow & orange entrepreneurship textbook — abstract geometry, hexagon. */
function EntrepreneurshipCover({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative aspect-[3/4] overflow-hidden rounded-sm shadow-md ring-1 ring-black/10 ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500" />
      <svg viewBox="0 0 100 130" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g fill="none" stroke="#ffffff" strokeWidth="0.7" opacity="0.45">
          <polygon points="78,10 92,18 92,32 78,40 64,32 64,18" />
          <polygon points="78,15 88,20 88,30 78,35 68,30 68,20" />
          <circle cx="20" cy="100" r="22" />
          <circle cx="20" cy="100" r="14" />
          <path d="M0 70 L100 60 M0 78 L100 68 M0 86 L100 76" />
        </g>
        <g fill="#ffffff" opacity="0.85">
          <polygon points="78,18 88,22 88,30 78,34 68,30 68,22" />
        </g>
        <g fill="#ea580c" opacity="0.85">
          <polygon points="78,22 84,25 84,30 78,33 72,30 72,25" />
        </g>
      </svg>
      <div className="absolute inset-x-3 top-6 text-white drop-shadow">
        <p className="text-[7.5px] font-bold tracking-[0.25em] uppercase opacity-90">
          Higher Education Series
        </p>
        <p className="mt-2 text-[11px] font-extrabold leading-tight">
          The Foundation
          <br />
          of Entrepreneurship
          <br />
          for College Students
        </p>
      </div>
      <div className="absolute inset-x-3 bottom-2 flex items-center justify-between">
        <ElspMark tone="light" />
        <span className="text-[7px] font-semibold tracking-wider text-white/80">
          ELSP PRESS
        </span>
      </div>
    </div>
  );
}

/* Shared "photo grid" cover used for both medical computer applications books. */
function MedicalComputerCover({
  titleLines,
  className = "",
}: {
  titleLines: string[];
  className?: string;
}) {
  const cells: { fill: string; accent?: string }[] = [
    { fill: "#0ea5e9", accent: "#bae6fd" }, { fill: "#f97316", accent: "#fed7aa" },
    { fill: "#10b981", accent: "#a7f3d0" }, { fill: "#6366f1", accent: "#c7d2fe" },
    { fill: "#ec4899", accent: "#fbcfe8" }, { fill: "#eab308", accent: "#fde68a" },
    { fill: "#0891b2", accent: "#a5f3fc" }, { fill: "#dc2626", accent: "#fecaca" },
    { fill: "#2563eb", accent: "#bfdbfe" }, { fill: "#14b8a6", accent: "#99f6e4" },
    { fill: "#7c3aed", accent: "#ddd6fe" }, { fill: "#f59e0b", accent: "#fde68a" },
  ];

  return (
    <div
      className={`relative aspect-[3/4] overflow-hidden rounded-sm bg-white shadow-md ring-1 ring-slate-200 ${className}`}
    >
      <div className="absolute inset-x-3 bottom-9 top-[42%] grid grid-cols-3 grid-rows-4 gap-1">
        {cells.map((c, i) => (
          <svg key={i} viewBox="0 0 30 22" className="h-full w-full" aria-hidden="true">
            <rect width="30" height="22" fill={c.fill} />
            {c.accent && (
              <>
                <rect x={(i * 3) % 18} y={(i * 2) % 10} width="10" height="6" fill={c.accent} opacity="0.85" />
                <circle cx={20 - (i % 5) * 2} cy={14 - (i % 3) * 2} r="3" fill="#ffffff" opacity="0.6" />
              </>
            )}
            <rect y="18" width="30" height="4" fill="#000000" opacity="0.18" />
          </svg>
        ))}
      </div>
      <div className="absolute inset-x-3 top-4">
        <p className="text-[8px] font-bold tracking-[0.25em] text-sky-500">
          MEDICAL COMPUTING
        </p>
        <div className="mt-2 flex items-start gap-1.5">
          <span className="mt-0.5 text-[10px] font-bold text-sky-600">▸</span>
          <p className="text-[10px] font-extrabold leading-tight text-sky-700">
            {titleLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < titleLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-slate-200 bg-white px-3 py-1.5">
        <ElspMark tone="dark" />
        <span className="text-[7px] font-semibold tracking-wider text-slate-500">
          ELSP PRESS
        </span>
      </div>
    </div>
  );
}

/* ---------- id → cover lookup ---------- */

type Book = (typeof books.items)[number];

function coverFor(book: Book) {
  switch (book.id) {
    case "entrepreneurship":
      return <EntrepreneurshipCover className="w-full" />;
    case "medical-computer-fundamentals":
    case "medical-computer-training":
      return (
        <MedicalComputerCover
          titleLines={book.coverTitle ?? [book.title]}
          className="w-full"
        />
      );
    default:
      return null;
  }
}

/* ---------- Row ---------- */

function BookRow({ book }: { book: Book }) {
  return (
    <article className="grid grid-cols-[140px_1fr] gap-6 border-b border-slate-200 py-8 first:pt-2 last:border-b-0 sm:grid-cols-[180px_1fr] sm:gap-8 md:grid-cols-[200px_1fr]">
      {/* Cover */}
      <Link
        href={book.href}
        className="block transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
      >
        {coverFor(book)}
      </Link>

      {/* Text block */}
      <div className="min-w-0">
        <Link href={book.href} className="focus:outline-none focus-visible:underline">
          <h3 className="text-lg font-bold leading-snug tracking-tight text-[#0b2545] hover:text-[#1d4ed8] sm:text-xl">
            {book.title}
          </h3>
        </Link>
        <p className="mt-3 text-sm text-slate-600">
          <span className="font-semibold text-slate-700">{books.editorLabel}</span>
          {book.editors}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
          {book.description}
        </p>
      </div>
    </article>
  );
}

/* ---------- Main component ---------- */

export default function BooksList() {
  return (
    <section className="bg-white pb-16 pt-8 sm:pb-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <ol className="flex items-center gap-1.5">
            {books.breadcrumb.map((crumb, i) => {
              const isLast = i === books.breadcrumb.length - 1;
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

        {/* List */}
        <div className="mt-6 divide-slate-200">
          {books.items.map((b) => (
            <BookRow key={b.id} book={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
