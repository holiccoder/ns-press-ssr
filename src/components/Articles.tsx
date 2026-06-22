import Link from "next/link";
import home from "@/data/home.json";

const { articles } = home;

/* ---------- Article visuals (inline SVG, no raster assets needed) ---------- */

function PieSegmentsVisual() {
  const segments = [
    { color: "#16a34a", start: 0,   end: 60 },
    { color: "#22c55e", start: 60,  end: 105 },
    { color: "#facc15", start: 105, end: 160 },
    { color: "#f97316", start: 160, end: 220 },
    { color: "#fb923c", start: 220, end: 265 },
    { color: "#2563eb", start: 265, end: 320 },
    { color: "#1d4ed8", start: 320, end: 360 },
  ];
  const polar = (cx: number, cy: number, r: number, deg: number) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };
  const arc = (start: number, end: number) => {
    const [x1, y1] = polar(100, 100, 80, start);
    const [x2, y2] = polar(100, 100, 80, end);
    const large = end - start > 180 ? 1 : 0;
    return `M100 100 L${x1} ${y1} A80 80 0 ${large} 1 ${x2} ${y2} Z`;
  };
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="h-full w-full">
      <g>
        {segments.map((s, i) => (
          <path key={i} d={arc(s.start, s.end)} fill={s.color} stroke="white" strokeWidth="1.2" />
        ))}
        <circle cx="100" cy="100" r="28" fill="white" />
        <circle cx="100" cy="100" r="28" fill="none" stroke="#0b2545" strokeWidth="1" />
        <text x="100" y="98" textAnchor="middle" fontSize="7" fontWeight="700" fill="#0b2545">ECL</text>
        <text x="100" y="108" textAnchor="middle" fontSize="5" fill="#475569">biosensing</text>
      </g>
      <g fontSize="5" fill="#0f172a" fontWeight="600">
        <text x="155" y="60">Bioimaging</text>
        <text x="155" y="150">Cells</text>
        <text x="15" y="60">Markers</text>
        <text x="15" y="150">Probes</text>
        <text x="80" y="30">Signals</text>
        <text x="80" y="180">Targets</text>
      </g>
    </svg>
  );
}

function UnderwaterFlowchartVisual() {
  return (
    <svg viewBox="0 0 400 220" aria-hidden="true" className="h-full w-full">
      <rect width="400" height="220" fill="#0b2545" rx="4" />
      <text x="200" y="22" textAnchor="middle" fontSize="11" fontWeight="700" fill="#e0f2fe">
        Deep Learning for Underwater Object Detection
      </text>
      {[
        { x: 20,  label: "Data",     c: "#22d3ee" },
        { x: 120, label: "Backbone", c: "#60a5fa" },
        { x: 220, label: "Neck",     c: "#a78bfa" },
        { x: 320, label: "Head",     c: "#f472b6" },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="55" width="60" height="34" rx="3" fill={s.c} opacity="0.85" />
          <text x={s.x + 30} y="76" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0b2545">
            {s.label}
          </text>
        </g>
      ))}
      <g stroke="#7dd3fc" strokeWidth="1.4" fill="none" markerEnd="url(#arrow)">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" fill="#7dd3fc" />
          </marker>
        </defs>
        <line x1="80"  y1="72" x2="120" y2="72" />
        <line x1="180" y1="72" x2="220" y2="72" />
        <line x1="280" y1="72" x2="320" y2="72" />
      </g>
      {[
        { x: 20,  items: ["RUOD", "UDD", "DUO"],     c: "#0ea5e9" },
        { x: 120, items: ["ResNet", "ViT", "Swin"],  c: "#3b82f6" },
        { x: 220, items: ["FPN", "PAN", "BiFPN"],    c: "#8b5cf6" },
        { x: 320, items: ["YOLO", "DETR", "R-CNN"],  c: "#ec4899" },
      ].map((g, gi) => (
        <g key={gi}>
          {g.items.map((it, i) => (
            <g key={i}>
              <rect x={g.x} y={110 + i * 22} width="60" height="16" rx="2" fill={g.c} opacity="0.65" />
              <text x={g.x + 30} y={121 + i * 22} textAnchor="middle" fontSize="7.5" fontWeight="600" fill="white">
                {it}
              </text>
            </g>
          ))}
        </g>
      ))}
      <rect x="60" y="190" width="280" height="18" rx="3" fill="#facc15" opacity="0.9" />
      <text x="200" y="203" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0b2545">
        Detection Output · Challenges &amp; Future Directions
      </text>
    </svg>
  );
}

function MaintenanceAnalysisVisual() {
  return (
    <svg viewBox="0 0 400 220" aria-hidden="true" className="h-full w-full">
      <rect width="400" height="220" fill="#f8fafc" rx="4" />
      <line x1="200" y1="10" x2="200" y2="210" stroke="#cbd5e1" />
      <line x1="10" y1="110" x2="390" y2="110" stroke="#cbd5e1" />
      <g>
        <text x="20" y="22" fontSize="8" fontWeight="700" fill="#0b2545">(a) Performance Index</text>
        <polyline fill="none" stroke="#2563eb" strokeWidth="1.6" points="20,90 50,80 80,68 110,62 140,45 170,38 190,30" />
        <polyline fill="none" stroke="#f97316" strokeWidth="1.6" strokeDasharray="3 2" points="20,95 50,88 80,82 110,72 140,68 170,55 190,50" />
        <g stroke="#94a3b8" strokeWidth="0.4">
          <line x1="20" y1="100" x2="190" y2="100" />
          <line x1="20" y1="30" x2="20" y2="100" />
        </g>
      </g>
      <g>
        <text x="210" y="22" fontSize="8" fontWeight="700" fill="#0b2545">(b) Criteria Weights</text>
        {[
          { x: 220, h: 35, c: "#22c55e" }, { x: 240, h: 55, c: "#3b82f6" },
          { x: 260, h: 28, c: "#f97316" }, { x: 280, h: 60, c: "#a855f7" },
          { x: 300, h: 42, c: "#ef4444" }, { x: 320, h: 50, c: "#06b6d4" },
          { x: 340, h: 32, c: "#facc15" }, { x: 360, h: 48, c: "#10b981" },
        ].map((b, i) => (
          <rect key={i} x={b.x} y={100 - b.h} width="14" height={b.h} fill={b.c} />
        ))}
        <line x1="215" y1="100" x2="385" y2="100" stroke="#94a3b8" strokeWidth="0.5" />
      </g>
      <g transform="translate(95, 160)">
        <text x="-75" y="-40" fontSize="8" fontWeight="700" fill="#0b2545">(c) Decision Distribution</text>
        <circle r="34" fill="#3b82f6" />
        <path d="M0 0 L34 0 A34 34 0 0 1 17 29 Z" fill="#f97316" />
        <path d="M0 0 L17 29 A34 34 0 0 1 -20 27 Z" fill="#22c55e" />
        <path d="M0 0 L-20 27 A34 34 0 0 1 -34 0 Z" fill="#facc15" />
      </g>
      <g>
        <text x="210" y="125" fontSize="8" fontWeight="700" fill="#0b2545">(d) Maintenance Ranking</text>
        {["M1", "M2", "M3", "M4"].map((label, i) => (
          <g key={label}>
            <text x="212" y={142 + i * 16} fontSize="7" fill="#334155">{label}</text>
            <rect x="230" y={135 + i * 16} width={60 + i * 25} height="10" fill="#2563eb" opacity={0.4 + i * 0.18} />
            <rect x={230 + 60 + i * 25} y={135 + i * 16} width={40 - i * 6} height="10" fill="#f97316" opacity="0.85" />
          </g>
        ))}
      </g>
    </svg>
  );
}

function CompositesInfographicVisual() {
  return (
    <svg viewBox="0 0 400 220" aria-hidden="true" className="h-full w-full">
      <rect width="400" height="220" fill="#ffffff" stroke="#e2e8f0" rx="4" />
      <rect x="0" y="0" width="400" height="22" fill="#0b2545" />
      <text x="10" y="15" fontSize="10" fontWeight="700" fill="#fde68a">
        Cementitious Composites · RHA + Recycled Steel Fibers
      </text>
      <g transform="translate(20, 40)">
        <rect width="90" height="60" fill="#cbd5e1" stroke="#475569" />
        <g stroke="#1e293b" strokeWidth="0.6">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1={(i * 90) / 12} y1="0" x2={(i * 90) / 12 + 6} y2="60" opacity="0.4" />
          ))}
        </g>
        <circle cx="20" cy="20" r="2"   fill="#f97316" />
        <circle cx="55" cy="30" r="2.5" fill="#f97316" />
        <circle cx="40" cy="48" r="2"   fill="#f97316" />
        <circle cx="75" cy="15" r="1.8" fill="#f97316" />
        <text x="0" y="74" fontSize="7" fontWeight="600" fill="#0b2545">(a) Specimen</text>
      </g>
      <g transform="translate(130, 40)">
        <text x="0" y="-2" fontSize="8" fontWeight="700" fill="#0b2545">(b) Strength</text>
        {[
          { x: 0,  h: 30, c: "#64748b" }, { x: 18, h: 42, c: "#3b82f6" },
          { x: 36, h: 55, c: "#22c55e" }, { x: 54, h: 48, c: "#f97316" },
          { x: 72, h: 38, c: "#a855f7" },
        ].map((b, i) => (
          <rect key={i} x={b.x} y={60 - b.h} width="14" height={b.h} fill={b.c} />
        ))}
        <line x1="-2" y1="60" x2="92" y2="60" stroke="#94a3b8" strokeWidth="0.5" />
      </g>
      <g transform="translate(240, 40)">
        <text x="0" y="-2" fontSize="8" fontWeight="700" fill="#0b2545">(c) Statistical Fit</text>
        <rect x="0" y="0" width="140" height="62" fill="#f1f5f9" />
        <polyline fill="none" stroke="#ef4444" strokeWidth="1.4" points="0,55 20,48 40,40 60,28 80,22 100,18 120,12 140,8" />
        {[[10, 52], [25, 46], [40, 42], [55, 30], [72, 25], [90, 20], [110, 16], [130, 11]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.6" fill="#1d4ed8" />
        ))}
      </g>
      <g transform="translate(70, 160)">
        <text x="-40" y="-40" fontSize="8" fontWeight="700" fill="#0b2545">(d) Mix Composition</text>
        <circle r="28" fill="#22c55e" />
        <path d="M0 0 L28 0 A28 28 0 0 1 5 27.5 Z" fill="#3b82f6" />
        <path d="M0 0 L5 27.5 A28 28 0 0 1 -25 12 Z" fill="#f97316" />
        <path d="M0 0 L-25 12 A28 28 0 0 1 -22 -17 Z" fill="#facc15" />
      </g>
      <g transform="translate(170, 130)">
        <text x="0" y="-2" fontSize="8" fontWeight="700" fill="#0b2545">(e) Durability Indices</text>
        {Array.from({ length: 8 }).map((_, i) => {
          const h = 12 + ((i * 7) % 35);
          return (
            <rect key={i} x={i * 12} y={50 - h} width="9" height={h} fill={i % 2 === 0 ? "#0ea5e9" : "#1d4ed8"} />
          );
        })}
        <line x1="-2" y1="50" x2="100" y2="50" stroke="#94a3b8" strokeWidth="0.5" />
      </g>
      <g transform="translate(290, 130)">
        <text x="0" y="-2" fontSize="8" fontWeight="700" fill="#0b2545">(f) Failure Mode</text>
        <rect x="0" y="4" width="90" height="44" fill="#fee2e2" stroke="#b91c1c" />
        <path d="M5 30 Q 25 5, 45 25 T 85 18" fill="none" stroke="#b91c1c" strokeWidth="1.4" />
        <g fill="#b91c1c">
          <circle cx="20" cy="18" r="1.5" />
          <circle cx="50" cy="24" r="1.5" />
          <circle cx="75" cy="20" r="1.5" />
        </g>
      </g>
    </svg>
  );
}

/* ---------- id → visual lookup ---------- */

const VISUALS: Record<string, React.ReactNode> = {
  ija20260002: <PieSegmentsVisual />,
  ir20260020:  <UnderwaterFlowchartVisual />,
  sc20260011:  <MaintenanceAnalysisVisual />,
  sc20260010:  <CompositesInfographicVisual />,
};

/* ---------- Row + main component ---------- */

type Article = (typeof articles.items)[number];

function ArticleRow({ article }: { article: Article }) {
  return (
    <article className="grid grid-cols-1 gap-6 border-b border-slate-200 py-8 last:border-b-0 md:grid-cols-[1fr_320px] md:gap-10">
      {/* Left: metadata + text */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="font-semibold text-slate-700">{article.type}</span>
          <span className="text-slate-300">|</span>
          <span className="font-bold tracking-wider text-orange-600">
            {articles.openAccessLabel}
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-500">{article.date}</span>
        </div>

        <Link
          href={article.href}
          className="group inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] focus-visible:ring-offset-2"
        >
          <h3 className="text-lg font-bold leading-snug text-[#0b2545] group-hover:text-[#1d4ed8] sm:text-xl">
            {article.title}
          </h3>
        </Link>

        <p className="text-sm text-slate-600">
          {articles.doiLabel}{" "}
          <a
            href={`https://doi.org/${article.doi}`}
            className="text-[#1d4ed8] hover:underline"
          >
            {article.doi}
          </a>
        </p>

        <p className="text-sm italic text-slate-700">{article.authors}</p>
      </div>

      {/* Right: visual */}
      <div className="flex items-center justify-center">
        <div className="aspect-[16/10] w-full overflow-hidden rounded-sm bg-slate-50 ring-1 ring-slate-200">
          {VISUALS[article.id]}
        </div>
      </div>
    </article>
  );
}

export default function Articles() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl md:text-4xl">
              {articles.title}
            </h2>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              {articles.subtitle}
            </p>
          </div>
          <Link
            href={articles.moreHref}
            className="inline-flex items-center gap-1 self-start rounded-sm border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 sm:mt-6"
          >
            {articles.moreLabel} <span aria-hidden>&gt;</span>
          </Link>
        </div>

        {/* List */}
        <div className="mt-8">
          {articles.items.map((a) => (
            <ArticleRow key={a.id} article={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
