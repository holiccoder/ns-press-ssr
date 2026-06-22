import Link from "next/link";
import home from "@/data/home.json";

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

/** Recruitment poster (blue → orange gradient, ELSP logo, October date). */
function RecruitmentGradientArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 220"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="recBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="55%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill="url(#recBg)" />
      <g transform="translate(24 26)" fill="#ffffff" opacity="0.95">
        <path d="M28 0l-2 4-3-1-2 3 3 2-5 5-6-2-4 3 2 3-5 5 2 2 6-4 4 2 3-3-2-3 6-6 3 1 2-3-3-2 2-4-1-2z" />
      </g>
      <text x="62" y="44" fill="#ffffff" fontSize="18" fontWeight={700} letterSpacing="1.5" fontFamily="Arial, Helvetica, sans-serif">ELSP</text>
      <text x="24" y="104" fill="#ffffff" fontSize="20" fontWeight={800} fontFamily="Arial, Helvetica, sans-serif">Recruitment of Youth</text>
      <text x="24" y="130" fill="#ffffff" fontSize="20" fontWeight={800} fontFamily="Arial, Helvetica, sans-serif">Editorial Board Members</text>
      <text x="24" y="178" fill="rgba(255,255,255,0.9)" fontSize="13" fontFamily="Arial, Helvetica, sans-serif">Deadline: October 1, 2026</text>
    </svg>
  );
}

/** Recruitment poster: white background with stylized 3D teal cubes. */
function RecruitmentCubesArt({ className = "" }: { className?: string }) {
  const Cube = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <polygon points="0,-14 16,-6 0,2 -16,-6" fill="#5eead4" />
      <polygon points="-16,-6 0,2 0,20 -16,12" fill="#14b8a6" />
      <polygon points="16,-6 0,2 0,20 16,12" fill="#0d9488" />
    </g>
  );
  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <rect width="400" height="220" fill="#ffffff" />
      <g transform="translate(24 24)" fill="#0b2545">
        <path d="M28 0l-2 4-3-1-2 3 3 2-5 5-6-2-4 3 2 3-5 5 2 2 6-4 4 2 3-3-2-3 6-6 3 1 2-3-3-2 2-4-1-2z" />
      </g>
      <text x="62" y="42" fill="#0b2545" fontSize="16" fontWeight={700} letterSpacing="1.2" fontFamily="Arial, Helvetica, sans-serif">ELSP</text>
      <text x="24" y="96" fill="#0b2545" fontSize="13" fontWeight={700} letterSpacing="2" fontFamily="Arial, Helvetica, sans-serif">RECRUITMENT</text>
      <text x="24" y="120" fill="#0b2545" fontSize="18" fontWeight={800} letterSpacing="1" fontFamily="Arial, Helvetica, sans-serif">YOUTH EDITORIAL</text>
      <text x="24" y="144" fill="#0b2545" fontSize="18" fontWeight={800} letterSpacing="1" fontFamily="Arial, Helvetica, sans-serif">BOARD MEMBERS</text>
      <Cube x={300} y={70} s={1.1} />
      <Cube x={340} y={130} s={0.85} />
      <Cube x={270} y={160} s={0.95} />
    </svg>
  );
}

/** Conference-stage photo placeholder — silhouettes on stage with blue backdrop. */
function ConferenceStageArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="stageBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e3a8a" />
          <stop offset="100%" stopColor="#0b2545" />
        </linearGradient>
      </defs>
      <rect width="400" height="160" fill="url(#stageBg)" />
      <text x="200" y="60" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="14" fontWeight={700} letterSpacing="1.5" fontFamily="Arial, Helvetica, sans-serif">
        12th China-US Cancer Research Conference
      </text>
      <text x="200" y="84" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="11" letterSpacing="1" fontFamily="Arial, Helvetica, sans-serif">
        2026 • Joint Symposium
      </text>
      <rect y="160" width="400" height="60" fill="#111827" />
      <g fill="#0b1023">
        {[40, 90, 140, 200, 250, 300, 350].map((cx, i) => (
          <g key={i} transform={`translate(${cx} 130)`}>
            <circle cx="0" cy="0" r="8" />
            <path d="M-10 30 C -10 14, 10 14, 10 30 L 10 36 L -10 36 Z" />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Inaugural-issue dark graphic with a stylized portrait placeholder. */
function InauguralIssueArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <rect width="400" height="220" fill="#0f172a" />
      <circle cx="80" cy="40" r="120" fill="rgba(20,184,166,0.18)" />
      <g transform="translate(60 60)">
        <circle cx="60" cy="55" r="36" fill="#475569" />
        <circle cx="60" cy="44" r="16" fill="#cbd5e1" />
        <path d="M30 95 C 30 70, 90 70, 90 95 L 90 110 L 30 110 Z" fill="#cbd5e1" />
      </g>
      <text x="200" y="80" fill="#ffffff" fontSize="14" fontWeight={700} fontFamily="Arial, Helvetica, sans-serif">Inaugural Issue</text>
      <text x="200" y="104" fill="rgba(255,255,255,0.75)" fontSize="12" fontFamily="Arial, Helvetica, sans-serif">Int. Journal of</text>
      <text x="200" y="122" fill="rgba(255,255,255,0.75)" fontSize="12" fontFamily="Arial, Helvetica, sans-serif">Environmental</text>
      <text x="200" y="140" fill="rgba(255,255,255,0.75)" fontSize="12" fontFamily="Arial, Helvetica, sans-serif">Epidemiology</text>
    </svg>
  );
}

/** Composite: "Asymmetry" journal cover + DOAJ seal. */
function AsymmetryDoajArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <rect width="400" height="220" fill="#f1f5f9" />
      <g transform="translate(30 26)">
        <rect width="140" height="170" fill="#1e3a8a" rx="2" />
        <rect x="10" y="14" width="120" height="60" fill="#3b82f6" opacity="0.6" />
        <text x="10" y="100" fill="#ffffff" fontSize="18" fontWeight={800} fontFamily="Arial, Helvetica, sans-serif">Asymmetry</text>
        <text x="10" y="120" fill="rgba(255,255,255,0.75)" fontSize="9" fontFamily="Arial, Helvetica, sans-serif">Open Access Journal</text>
        <line x1="10" y1="148" x2="130" y2="148" stroke="#ffffff" strokeWidth="0.5" opacity="0.5" />
        <text x="10" y="162" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="Arial, Helvetica, sans-serif">Vol 3 • Issue 2 • 2026</text>
      </g>
      <g transform="translate(240 60)">
        <circle cx="60" cy="60" r="58" fill="#ffffff" stroke="#0b2545" strokeWidth="2" />
        <circle cx="60" cy="60" r="48" fill="none" stroke="#0b2545" strokeWidth="1" />
        <text x="60" y="56" textAnchor="middle" fill="#0b2545" fontSize="22" fontWeight={800} fontFamily="Arial, Helvetica, sans-serif">DOAJ</text>
        <text x="60" y="76" textAnchor="middle" fill="#0b2545" fontSize="7" letterSpacing="0.5" fontFamily="Arial, Helvetica, sans-serif">DIRECTORY OF OPEN</text>
        <text x="60" y="86" textAnchor="middle" fill="#0b2545" fontSize="7" letterSpacing="0.5" fontFamily="Arial, Helvetica, sans-serif">ACCESS JOURNALS</text>
      </g>
    </svg>
  );
}

/** Wireless-power technical diagram: schematic + waveform + formula. */
function WirelessSchematicArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 220" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <rect width="400" height="220" fill="#ffffff" />
      <g stroke="#e5e7eb" strokeWidth="0.5">
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 20} x2="400" y2={i * 20} />
        ))}
        {Array.from({ length: 21 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 20} y1="0" x2={i * 20} y2="220" />
        ))}
      </g>
      <path d="M 10 60 Q 30 20, 50 60 T 90 60 T 130 60 T 170 60 T 210 60" fill="none" stroke="#1d4ed8" strokeWidth="1.5" />
      <path d="M 10 80 Q 30 100, 50 80 T 90 80 T 130 80 T 170 80 T 210 80" fill="none" stroke="#ef4444" strokeWidth="1.5" />
      <g stroke="#0b2545" strokeWidth="1.5" fill="none">
        <line x1="40" y1="160" x2="80" y2="160" />
        <rect x="80" y="150" width="30" height="20" />
        <line x1="110" y1="160" x2="160" y2="160" />
        <path d="M 160 160 q 5 -10, 10 0 q 5 -10, 10 0 q 5 -10, 10 0 q 5 -10, 10 0" />
        <line x1="200" y1="160" x2="240" y2="160" />
        <line x1="240" y1="150" x2="240" y2="170" />
        <line x1="248" y1="150" x2="248" y2="170" />
        <line x1="248" y1="160" x2="290" y2="160" />
        <line x1="290" y1="160" x2="290" y2="180" />
        <line x1="280" y1="180" x2="300" y2="180" />
        <line x1="284" y1="185" x2="296" y2="185" />
      </g>
      <text x="230" y="65" fill="#374151" fontSize="13" fontStyle="italic" fontFamily="Georgia, serif">η = P</text>
      <text x="266" y="60" fill="#374151" fontSize="9" fontFamily="Georgia, serif">out</text>
      <text x="280" y="65" fill="#374151" fontSize="13" fontStyle="italic" fontFamily="Georgia, serif">/ P</text>
      <text x="306" y="60" fill="#374151" fontSize="9" fontFamily="Georgia, serif">in</text>
    </svg>
  );
}

/* ---------- id → visual lookup ---------- */

const ART: Record<string, React.ReactNode> = {
  "recruitment-esp":          <RecruitmentGradientArt className="h-full w-full" />,
  "recruitment-biofunctional":<RecruitmentCubesArt    className="h-full w-full" />,
  "china-us-cancer":          <ConferenceStageArt     className="h-full w-full" />,
  "inaugural-issue":          <InauguralIssueArt      className="h-full w-full" />,
  "asymmetry-doaj":           <AsymmetryDoajArt       className="h-full w-full" />,
  "wireless-power":           <WirelessSchematicArt   className="h-full w-full" />,
};

/* ---------- Small card ---------- */

type Item = (typeof news.items)[number];

function SmallNewsCard({ item }: { item: Item }) {
  return (
    <Link
      href={item.href}
      className="group flex flex-col overflow-hidden rounded-lg ring-1 ring-slate-200 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        {ART[item.id]}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-[#0b2545] group-hover:text-[#1e4ba8]">
          {item.title}
        </h3>
        <p className="mt-auto pt-3 text-xs text-slate-500">
          {news.publishedDateLabel} {item.date}
        </p>
      </div>
    </Link>
  );
}

/* ---------- Section ---------- */

export default function News() {
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
            className="inline-flex items-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm transition-colors hover:bg-slate-50"
          >
            {news.moreLabel} &gt;
          </Link>
        </div>

        {/* Grid: featured (left, ~40%) + 2x3 (right) */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Featured */}
          <article className="relative isolate flex flex-col overflow-hidden rounded-lg bg-[#2a2a2e] text-white shadow-lg lg:col-span-2">
            <Link
              href={news.featured.href}
              className="flex flex-1 flex-col"
            >
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
            {news.items.map((item) => (
              <SmallNewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
