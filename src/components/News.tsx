import Link from "next/link";
import Image from "next/image";
import home from "@/data/home.json";
import { getArticleList, type ArticleListItem } from "@/lib/api";
import { resolveNewsImage } from "@/lib/images";

const { news } = home;

/* ---------- Thumbnail artworks (inline SVG, no raster assets needed) ---------- */

/**
 * Featured: dark futuristic banner with abstract diagonal lines and
 * a faint "CTESP" wordmark in the upper-left, matching the spec.
 */
function CtespBannerArt({ className = "" }: { className?: string }) {
  // Deterministic diagonal "circuit" lines — no Math.random() so SSR is stable.
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [
    { x1: 40, y1: 20, x2: 380, y2: 220 },
    { x1: 0, y1: 80, x2: 320, y2: 260 },
    { x1: 120, y1: 0, x2: 440, y2: 180 },
    { x1: 60, y1: 140, x2: 400, y2: 40 },
    { x1: 200, y1: 260, x2: 480, y2: 80 },
    { x1: 20, y1: 200, x2: 280, y2: 0 },
    { x1: 240, y1: 30, x2: 460, y2: 240 },
    { x1: 80, y1: 240, x2: 420, y2: 120 },
  ];
  const dots: { x: number; y: number }[] = [
    { x: 80, y: 60 },
    { x: 180, y: 30 },
    { x: 260, y: 120 },
    { x: 360, y: 70 },
    { x: 420, y: 180 },
    { x: 140, y: 200 },
    { x: 320, y: 230 },
    { x: 60, y: 160 },
  ];

  return (
    <svg
      viewBox="0 0 480 270"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="ctespBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a0b3a" />
          <stop offset="50%" stopColor="#2a1d6b" />
          <stop offset="100%" stopColor="#0c1a4a" />
        </linearGradient>
        <radialGradient id="ctespGlow" cx="80%" cy="20%" r="60%">
          <stop offset="0%" stopColor="rgba(99,102,241,0.55)" />
          <stop offset="100%" stopColor="rgba(99,102,241,0)" />
        </radialGradient>
      </defs>
      <rect width="480" height="270" fill="url(#ctespBg)" />
      <rect width="480" height="270" fill="url(#ctespGlow)" />
      <g stroke="rgba(186,230,253,0.35)" strokeWidth="1">
        {lines.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
        ))}
      </g>
      <g fill="rgba(186,230,253,0.9)">
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={2} />
        ))}
      </g>
      {/* Faint "CTESP" wordmark, upper-left */}
      <text
        x="20"
        y="38"
        fill="rgba(255,255,255,0.18)"
        fontSize="22"
        fontWeight={700}
        letterSpacing="3"
        fontFamily="Arial, Helvetica, sans-serif"
      >
        CTESP
      </text>
    </svg>
  );
}

/* ---------- Small card ---------- */

function formatDate(isoLike: string): string {
  const date = new Date(isoLike.replace(/-/g, "/"));
  if (Number.isNaN(date.getTime())) return isoLike;
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d} ${m} ${y}`;
}

function SmallNewsCard({ item }: { item: ArticleListItem }) {
  const href = `/news/${item.id}`;
  const image = resolveNewsImage(item.id, item.image);
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-lg bg-white ring-1 ring-slate-200 transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={item.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-[#0b2545] group-hover:text-[#1e4ba8]">
          {item.title}
        </h3>
        <p className="mt-auto pt-3 text-xs text-slate-500">
          {news.publishedDateLabel} {formatDate(item.create_time)}
        </p>
      </div>
    </Link>
  );
}

/* ---------- Section ---------- */

export default async function News() {
  let items: ArticleListItem[] = [];
  try {
    const data = await getArticleList({ pageNo: 1, pageSize: 5, sort: "new" });
    items = data.lists;
  } catch (err) {
    console.error("[News] failed to load article list:", err);
  }

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="flex items-end justify-between">
          <h2 className="text-4xl font-extrabold tracking-tight text-[#0b2545] sm:text-5xl">
            {news.title}
          </h2>
          <Link
            href={news.moreHref}
            className="inline-flex items-center rounded-md bg-[#0b2545] px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#1e3a8a]"
          >
            {news.moreLabel} &gt;
          </Link>
        </div>

        {/* Grid: featured (left, ~40%) + 2x3 (right) */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Featured */}
          <article className="relative isolate flex flex-col overflow-hidden rounded-lg bg-[#2a2a2e] text-white shadow-lg lg:col-span-2">
            <Link href={news.featured.href} className="flex flex-1 flex-col">
              {/* Banner */}
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <CtespBannerArt className="absolute inset-0 h-full w-full" />
                {/* Headline overlay */}
                <div className="absolute inset-0 flex items-center justify-center p-5">
                  <p className="text-center text-base font-extrabold leading-tight text-white drop-shadow-md sm:text-lg">
                    {news.featured.bannerHeadline}
                  </p>
                </div>
                {/* Date overlay, bottom-left */}
                <div className="absolute bottom-3 left-4 space-y-0.5 text-[11px] leading-tight text-white/90">
                  {news.featured.dates.map((d, i) => (
                    <p key={i}>{d}</p>
                  ))}
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col px-6 pt-5 pb-4">
                <h3 className="text-base font-bold leading-snug text-white sm:text-lg">
                  {news.featured.headline}
                </h3>
                <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-white/85">
                  {news.featured.excerpt}
                </p>
                <p className="mt-auto pt-6 text-xs text-white/55">
                  {news.publishedDateLabel} {news.featured.date}
                </p>
              </div>
            </Link>
          </article>

          {/* 2x3 grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:col-span-3">
            {items.length === 0 ? (
              <p className="text-sm text-slate-500">No news available.</p>
            ) : (
              items.map((item) => (
                <SmallNewsCard key={item.id} item={item} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
