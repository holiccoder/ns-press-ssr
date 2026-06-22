import Link from "next/link";
import journalsData from "@/data/journals.json";

const { list } = journalsData;

/* ---------- Cover artworks (inline SVG, no raster assets needed) ---------- */

function ElspBadge({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-semibold tracking-[0.18em] ${
        tone === "dark" ? "text-white/90" : "text-slate-700"
      }`}
    >
      <span
        className={`grid h-4 w-4 place-items-center rounded-sm text-[9px] font-extrabold leading-none ${
          tone === "dark" ? "bg-white/90 text-[#0b2545]" : "bg-[#0b2545] text-white"
        }`}
      >
        E
      </span>
      ELSP
    </span>
  );
}

function AdvancedCancerResearchCover() {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-md ring-1 ring-black/5">
      <div className="absolute inset-0 flex flex-col">
        <div className="h-2/5 bg-white" />
        <div className="flex-1 bg-gradient-to-b from-[#0b2545] to-[#020617]" />
      </div>
      <div className="absolute inset-x-0 top-5 px-3 text-center">
        <p className="text-[9px] tracking-[0.3em] text-slate-500">JOURNAL</p>
        <p className="mt-1 text-[12px] font-extrabold leading-tight text-[#0b2545]">
          Advanced
          <br />
          Cancer Research
        </p>
      </div>
      <svg viewBox="0 0 200 200" className="absolute inset-x-0 bottom-9 mx-auto h-[58%] w-full" aria-hidden="true">
        <defs>
          <radialGradient id="acr-pink" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#fda4af" stopOpacity="0.95" />
            <stop offset="80%" stopColor="#e11d48" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="acr-blue" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0.95" />
            <stop offset="80%" stopColor="#0369a1" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="acr-orange" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#fdba74" stopOpacity="0.95" />
            <stop offset="80%" stopColor="#c2410c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="70"  cy="70"  r="36" fill="url(#acr-pink)" />
        <circle cx="140" cy="90"  r="30" fill="url(#acr-blue)" />
        <circle cx="100" cy="140" r="34" fill="url(#acr-orange)" />
        <g fill="none" stroke="#fbcfe8" strokeWidth="0.8" opacity="0.8">
          <line x1="70"  y1="70"  x2="140" y2="90"  />
          <line x1="70"  y1="70"  x2="100" y2="140" />
          <line x1="140" y1="90"  x2="100" y2="140" />
          <line x1="140" y1="90"  x2="160" y2="50"  />
        </g>
        <g fill="#fda4af">
          <circle cx="70"  cy="70"  r="3" />
          <circle cx="140" cy="90"  r="3" />
          <circle cx="100" cy="140" r="3" />
          <circle cx="160" cy="50"  r="2" />
        </g>
        <g stroke="#f1f5f9" strokeWidth="2.2" fill="none" strokeLinecap="round">
          <circle cx="125" cy="115" r="22" fill="rgba(125,211,252,0.15)" />
          <line x1="141" y1="131" x2="160" y2="150" />
        </g>
      </svg>
      <span className="absolute right-2 top-2 text-[8px] font-semibold tracking-wider text-slate-700">
        ISSN 3106-0382
      </span>
      <div className="absolute bottom-2 left-2">
        <ElspBadge tone="dark" />
      </div>
    </div>
  );
}

function AdvancedEquipmentCover() {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-md ring-1 ring-black/5">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b2545] via-[#0f1f4d] to-[#02071f]" />
      <div className="absolute inset-x-0 top-6 px-3 text-center">
        <p className="text-[9px] tracking-[0.3em] text-cyan-200/80">JOURNAL OF</p>
        <p className="mt-1 text-[13px] font-extrabold leading-tight text-white">Advanced</p>
        <p className="text-[13px] font-extrabold leading-tight text-amber-300">Equipment</p>
      </div>
      <svg viewBox="0 0 200 220" className="absolute inset-x-0 bottom-10 mx-auto h-[60%] w-full" aria-hidden="true">
        <defs>
          <linearGradient id="ae-metal" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%"   stopColor="#e2e8f0" />
            <stop offset="55%"  stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="ae-accent" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%"   stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <ellipse cx="100" cy="200" rx="70" ry="6" fill="#22d3ee" opacity="0.18" />
        <rect x="70" y="180" width="60" height="14" rx="3" fill="url(#ae-metal)" />
        <rect x="80" y="172" width="40" height="10" rx="2" fill="#cbd5e1" />
        <g transform="rotate(-15 100 170)">
          <rect x="92" y="100" width="16" height="72" rx="4" fill="url(#ae-metal)" />
          <circle cx="100" cy="170" r="8" fill="#fbbf24" />
          <circle cx="100" cy="170" r="3" fill="#0b2545" />
        </g>
        <g transform="rotate(35 100 100)">
          <rect x="92" y="40" width="16" height="68" rx="4" fill="url(#ae-metal)" />
          <circle cx="100" cy="100" r="8" fill="#fbbf24" />
          <circle cx="100" cy="100" r="3" fill="#0b2545" />
          <circle cx="100" cy="40"  r="6" fill="#cbd5e1" />
        </g>
        <g transform="translate(140 60) rotate(20)">
          <rect width="22" height="8" rx="2" fill="url(#ae-accent)" />
          <rect x="2"  y="8" width="3" height="10" fill="#fbbf24" />
          <rect x="17" y="8" width="3" height="10" fill="#fbbf24" />
        </g>
        <path d="M100 170 C 110 150, 90 130, 105 100" fill="none" stroke="#22d3ee" strokeWidth="0.8" opacity="0.65" />
      </svg>
      <span className="absolute right-2 top-2 text-[8px] font-semibold tracking-wider text-white/80">
        ISSN 3007-5114
      </span>
      <div className="absolute bottom-2 left-2">
        <ElspBadge tone="dark" />
      </div>
    </div>
  );
}

function AdvancedInfoCommCover() {
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-md ring-1 ring-black/5">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b2545] to-[#020617]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-orange-500/70 via-orange-500/20 to-transparent" />
      </div>
      <div className="absolute inset-x-0 top-5 px-3 text-left">
        <p className="text-[9px] tracking-[0.28em] text-cyan-200/80">JOURNAL OF</p>
        <p className="mt-1 text-[12px] font-extrabold leading-tight text-white">
          Advanced
          <br />
          Information &amp;
          <br />
          <span className="text-amber-300">Communication</span>
        </p>
      </div>
      <svg viewBox="0 0 200 200" className="absolute inset-x-0 bottom-8 mx-auto h-[55%] w-full" aria-hidden="true">
        <defs>
          <radialGradient id="aic-glow" cx="50%" cy="50%" r="55%">
            <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0b2545" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="120" cy="90" r="58" fill="url(#aic-glow)" />
        <g fill="none" stroke="#67e8f9" strokeWidth="0.8" opacity="0.85">
          <circle  cx="120" cy="90" r="38" />
          <ellipse cx="120" cy="90" rx="38" ry="14" />
          <ellipse cx="120" cy="90" rx="38" ry="26" />
          <ellipse cx="120" cy="90" rx="14" ry="38" />
          <ellipse cx="120" cy="90" rx="26" ry="38" />
        </g>
        <g fill="#fde68a">
          {[[120, 52], [120, 128], [82, 90], [158, 90], [95, 65], [145, 65], [95, 115], [145, 115]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.8" />
          ))}
        </g>
        <g fill="none" stroke="#fde68a" strokeWidth="0.6" opacity="0.6">
          <path d="M120 52 Q 160 70, 158 90" />
          <path d="M82 90 Q 110 70, 120 52" />
          <path d="M95 65 Q 120 90, 145 115" />
        </g>
        <g fill="#fbbf24" stroke="#92400e" strokeWidth="0.6">
          <path d="M30 170 C 35 150, 50 140, 60 138 L 78 130 C 84 128, 88 132, 86 138 L 80 148 L 92 144 C 98 144, 100 150, 96 154 L 86 160 L 94 162 C 99 164, 99 170, 94 172 L 78 178 L 82 180 C 85 184, 82 188, 78 188 L 50 190 C 38 190, 30 184, 30 170 Z" />
        </g>
        <g stroke="#fbbf24" strokeWidth="0.6" fill="none" opacity="0.7">
          <line x1="78" y1="130" x2="100" y2="115" />
          <line x1="86" y1="138" x2="105" y2="122" />
        </g>
      </svg>
      <span className="absolute right-2 top-2 text-[8px] font-semibold tracking-wider text-white/80">
        ISSN 3106-1443
      </span>
      <div className="absolute bottom-2 left-2">
        <ElspBadge tone="dark" />
      </div>
    </div>
  );
}

/* ---------- id → cover lookup ---------- */

const COVERS: Record<string, React.ReactNode> = {
  "advanced-cancer-research": <AdvancedCancerResearchCover />,
  "advanced-equipment":       <AdvancedEquipmentCover />,
  "advanced-info-comm":       <AdvancedInfoCommCover />,
};

/* ---------- Row + main component ---------- */

type Journal = (typeof list.items)[number];

function JournalRow({ journal }: { journal: Journal }) {
  return (
    <article className="grid grid-cols-[140px_1fr] gap-6 border-b border-slate-200 py-8 last:border-b-0 sm:grid-cols-[180px_1fr] sm:gap-8 md:grid-cols-[200px_1fr] md:gap-10">
      {/* Cover */}
      <Link
        href={journal.href}
        aria-label={journal.title}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] focus-visible:ring-offset-2"
      >
        <div className="transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
          {COVERS[journal.id]}
        </div>
      </Link>

      {/* Text block */}
      <div className="flex flex-col gap-3">
        <Link
          href={journal.href}
          className="group inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] focus-visible:ring-offset-2"
        >
          <h2 className="text-xl font-bold text-[#0b2545] group-hover:text-[#1d4ed8] sm:text-2xl">
            {journal.title}
          </h2>
        </Link>

        {/* Metadata */}
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-600">
          {journal.issns.map((i) => (
            <span key={i.label}>
              <span className="font-semibold text-slate-700">ISSN:</span>{" "}
              {i.value}{" "}
              <span className="text-slate-500">({i.label})</span>
            </span>
          ))}
          {journal.coden && (
            <span>
              <span className="font-semibold text-slate-700">CODEN:</span>{" "}
              {journal.coden}
            </span>
          )}
        </div>

        {/* Description — leads with the italicized journal title, per spec */}
        <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
          <em>
            <span className="font-semibold text-slate-900">{journal.title}</span>
            {journal.description.startsWith(journal.title)
              ? journal.description.slice(journal.title.length)
              : ` ${journal.description}`}
          </em>
        </p>
      </div>
    </article>
  );
}

export default function JournalsList() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div>
          {list.items.map((j) => (
            <JournalRow key={j.id} journal={j} />
          ))}
        </div>
      </div>
    </section>
  );
}
