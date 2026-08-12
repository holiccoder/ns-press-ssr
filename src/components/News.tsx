import Image from "next/image";
import Link from "next/link";
import home from "@/data/home.json";
import { getArticleList, type ArticleListItem } from "@/lib/api";
import { resolveNewsImage } from "@/lib/images";

const { news } = home;

export type NewsCardItem = {
  id: string;
  title: string;
  href: string;
  date: string;
  excerpt?: string;
  image?: string;
  bannerHeadline?: string;
  dates?: string[];
};

export type NewsData = {
  featured: NewsCardItem;
  items: NewsCardItem[];
  all: NewsCardItem[];
  fromApi: boolean;
};

function formatDate(isoLike: string): string {
  const date = new Date(isoLike.replace(/-/g, "/"));
  if (Number.isNaN(date.getTime())) return isoLike;
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d} ${m} ${y}`;
}

function toApiCard(item: ArticleListItem): NewsCardItem {
  return {
    id: String(item.id),
    title: item.title,
    href: `/news/${item.id}`,
    date: item.create_time,
    excerpt: item.desc,
    image: item.image,
    bannerHeadline: item.title,
  };
}

function staticCard(item: (typeof news.items)[number]): NewsCardItem {
  return {
    id: String(item.id),
    title: item.title,
    href: "/news",
    date: item.date,
  };
}

async function fetchAllNews(): Promise<ArticleListItem[]> {
  const pageSize = 50;
  const first = await getArticleList({
    pageNo: 1,
    pageSize,
    sort: "new",
  });
  const items = [...first.lists];
  const totalPages = Math.ceil((first.count || items.length) / pageSize);

  for (let pageNo = 2; pageNo <= totalPages; pageNo++) {
    const next = await getArticleList({ pageNo, pageSize, sort: "new" });
    if (!next.lists.length) break;
    items.push(...next.lists);
  }

  return items;
}

export async function loadNews(): Promise<NewsData> {
  try {
    const apiItems = await fetchAllNews();
    if (apiItems.length > 0) {
      const cards = apiItems.map(toApiCard);
      return {
        featured: cards[0],
        items: cards.slice(1),
        all: cards,
        fromApi: true,
      };
    }
  } catch (err) {
    console.error("[News] failed to load article list:", err);
  }

  const fallbackFeatured: NewsCardItem = {
    id: "featured",
    title: news.featured.headline,
    href: "/news",
    date: news.featured.date,
    excerpt: news.featured.excerpt,
    bannerHeadline: news.featured.bannerHeadline,
    dates: news.featured.dates,
  };
  const fallbackItems = news.items.map(staticCard);
  return {
    featured: fallbackFeatured,
    items: fallbackItems,
    all: fallbackItems,
    fromApi: false,
  };
}

/* ---------- Thumbnail artworks (inline SVG, no raster assets needed) ---------- */

function CtespBannerArt({ className = "" }: { className?: string }) {
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
        {lines.map((line, i) => (
          <line key={i} x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2} />
        ))}
      </g>
      <g fill="rgba(186,230,253,0.9)">
        {dots.map((dot, i) => (
          <circle key={i} cx={dot.x} cy={dot.y} r={2} />
        ))}
      </g>
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

function resolvedImage(item: NewsCardItem): string | undefined {
  if (!item.image) return undefined;
  const numericId = Number(item.id);
  return Number.isFinite(numericId)
    ? resolveNewsImage(numericId, item.image)
    : item.image;
}

export function SmallNewsCard({ item }: { item: NewsCardItem }) {
  const image = resolvedImage(item);
  return (
    <Link
      href={item.href}
      className="group flex flex-col overflow-hidden rounded-lg bg-white ring-1 ring-slate-200 transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        {image ? (
          <Image
            src={image}
            alt={item.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <CtespBannerArt className="absolute inset-0 h-full w-full opacity-80" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-[#0b2545] group-hover:text-[#1e4ba8]">
          {item.title}
        </h3>
        <p className="mt-auto pt-3 text-xs text-slate-500">
          {news.publishedDateLabel} {formatDate(item.date)}
        </p>
      </div>
    </Link>
  );
}

export function FeaturedNewsCard({ item }: { item: NewsCardItem }) {
  const image = resolvedImage(item);
  const dates = item.dates ?? [formatDate(item.date)];

  return (
    <article className="relative isolate flex flex-col overflow-hidden rounded-lg bg-[#2a2a2e] text-white shadow-lg">
      <Link href={item.href} className="flex flex-1 flex-col">
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={item.title}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <CtespBannerArt className="absolute inset-0 h-full w-full" />
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 p-5">
            <p className="text-center text-base font-extrabold leading-tight text-white drop-shadow-md sm:text-lg">
              {item.bannerHeadline ?? item.title}
            </p>
          </div>
          <div className="absolute bottom-3 left-4 space-y-0.5 text-[11px] leading-tight text-white/90">
            {dates.map((date, i) => (
              <p key={i}>{date}</p>
            ))}
          </div>
        </div>
        <div className="flex flex-1 flex-col px-6 pb-4 pt-5">
          <h3 className="text-base font-bold leading-snug text-white sm:text-lg">
            {item.title}
          </h3>
          {item.excerpt && (
            <p className="mt-3 line-clamp-4 text-sm leading-relaxed text-white/85">
              {item.excerpt}
            </p>
          )}
          <p className="mt-auto pt-6 text-xs text-white/55">
            {news.publishedDateLabel} {formatDate(item.date)}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default async function News() {
  const data = await loadNews();

  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
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

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <FeaturedNewsCard item={data.featured} />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:col-span-3">
            {data.items.slice(0, 6).map((item) => (
              <SmallNewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export async function NewsArchiveList() {
  const data = await loadNews();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.all.map((item) => (
        <SmallNewsCard key={item.id} item={item} />
      ))}
    </div>
  );
}
