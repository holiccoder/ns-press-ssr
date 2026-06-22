import Link from "next/link";
import home from "@/data/home.json";

const { scholarTestimonials } = home;

/* ---------------------------------------------------------------------------
   Stylised SVG portraits. We can't ship real photos, so each portrait is a
   compact illustrated headshot that preserves the distinguishing features
   called out in the spec (hair, glasses, attire, backdrop colour, etc.).
--------------------------------------------------------------------------- */

type PortraitProps = { className?: string };

function PortraitAsianGreyHairCheckered({ className = "" }: PortraitProps) {
  return (
    <svg viewBox="0 0 200 240" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="checker1" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#ffffff" />
          <rect width="7" height="7" fill="#dc2626" />
          <rect x="7" y="7" width="7" height="7" fill="#dc2626" />
        </pattern>
      </defs>
      <rect width="200" height="240" fill="#3f3f46" />
      <path d="M0 240 L0 200 Q 100 150 200 200 L200 240 Z" fill="url(#checker1)" />
      <path d="M70 195 Q 100 215 130 195 L130 240 L70 240 Z" fill="#f1f5f9" />
      <rect x="88" y="135" width="24" height="22" fill="#e8c9a8" />
      <ellipse cx="100" cy="105" rx="40" ry="48" fill="#f1d3b1" />
      <path d="M62 95 Q 60 60 100 55 Q 140 60 138 95 Q 130 80 100 78 Q 70 80 62 95 Z" fill="#cbd5e1" />
      <path d="M62 95 Q 70 90 80 92 M 138 95 Q 130 90 120 92" stroke="#94a3b8" strokeWidth="1.5" fill="none" />
      <ellipse cx="60" cy="108" rx="5" ry="9" fill="#e8c9a8" />
      <ellipse cx="140" cy="108" rx="5" ry="9" fill="#e8c9a8" />
      <g stroke="#334155" strokeWidth="2" fill="none">
        <circle cx="84" cy="108" r="10" />
        <circle cx="116" cy="108" r="10" />
        <line x1="94" y1="108" x2="106" y2="108" />
      </g>
      <path d="M78 108 Q 84 105 90 108 M 110 108 Q 116 105 122 108" stroke="#1e293b" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M86 128 Q 100 140 114 128" stroke="#7f1d1d" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M88 128 Q 100 132 112 128" fill="#fda4af" opacity="0.6" />
    </svg>
  );
}

function PortraitWhiteBeardSuit({ className = "" }: PortraitProps) {
  return (
    <svg viewBox="0 0 200 240" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="240" fill="#d4d4d8" />
      <path d="M0 240 L0 195 Q 100 150 200 195 L200 240 Z" fill="#1e293b" />
      <path d="M70 195 L100 230 L130 195 L130 240 L70 240 Z" fill="#f8fafc" />
      <path d="M94 195 L100 230 L106 195 Z" fill="#7f1d1d" />
      <rect x="88" y="135" width="24" height="22" fill="#f3d4b0" />
      <ellipse cx="100" cy="100" rx="40" ry="48" fill="#f8d7b3" />
      <path d="M60 95 Q 58 55 100 50 Q 142 55 140 95 Q 130 75 100 73 Q 70 75 60 95 Z" fill="#f8fafc" />
      <ellipse cx="60" cy="105" rx="5" ry="9" fill="#f3d4b0" />
      <ellipse cx="140" cy="105" rx="5" ry="9" fill="#f3d4b0" />
      <path d="M65 120 Q 70 160 100 165 Q 130 160 135 120 Q 130 145 100 150 Q 70 145 65 120 Z" fill="#f8fafc" />
      <path d="M80 125 Q 100 132 120 125 Q 110 130 100 130 Q 90 130 80 125 Z" fill="#f8fafc" />
      <circle cx="84" cy="105" r="2" fill="#1e293b" />
      <circle cx="116" cy="105" r="2" fill="#1e293b" />
      <path d="M76 96 Q 84 92 92 96 M 108 96 Q 116 92 124 96" stroke="#e5e7eb" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M92 126 Q 100 129 108 126" stroke="#fda4af" strokeWidth="1" fill="none" />
    </svg>
  );
}

function PortraitVNeckSweaterTie({ className = "" }: PortraitProps) {
  return (
    <svg viewBox="0 0 200 240" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="240" fill="#e5e7eb" />
      <path d="M0 240 L0 195 Q 100 155 200 195 L200 240 Z" fill="#cbd5e1" />
      <path d="M82 175 L100 215 L118 175 L130 200 L130 240 L70 240 L70 200 Z" fill="#f8fafc" />
      <path d="M95 178 L100 188 L105 178 L108 220 L100 230 L92 220 Z" fill="#0c4a6e" />
      <rect x="88" y="138" width="24" height="22" fill="#eccdaa" />
      <ellipse cx="100" cy="105" rx="40" ry="48" fill="#f1d3b1" />
      <path d="M62 90 Q 60 58 100 55 Q 140 58 138 90 Q 130 78 100 76 Q 70 78 62 90 Z" fill="#1f2937" />
      <ellipse cx="60" cy="108" rx="5" ry="9" fill="#eccdaa" />
      <ellipse cx="140" cy="108" rx="5" ry="9" fill="#eccdaa" />
      <g stroke="#1e293b" strokeWidth="1" fill="none">
        <circle cx="84" cy="110" r="10" />
        <circle cx="116" cy="110" r="10" />
        <line x1="94" y1="110" x2="106" y2="110" />
        <line x1="74" y1="110" x2="68" y2="108" />
        <line x1="126" y1="110" x2="132" y2="108" />
      </g>
      <circle cx="84" cy="110" r="1.8" fill="#0f172a" />
      <circle cx="116" cy="110" r="1.8" fill="#0f172a" />
      <path d="M92 132 Q 100 135 108 132" stroke="#7f1d1d" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function PortraitLabCoat({ className = "" }: PortraitProps) {
  return (
    <svg viewBox="0 0 200 240" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="240" fill="#e0f2fe" />
      <g opacity="0.5">
        <rect x="0" y="40" width="200" height="3" fill="#bae6fd" />
        <rect x="0" y="80" width="200" height="3" fill="#bae6fd" />
        <rect x="0" y="120" width="200" height="3" fill="#bae6fd" />
        <rect x="10" y="50" width="14" height="28" fill="#bfdbfe" />
        <rect x="30" y="55" width="10" height="23" fill="#a7f3d0" opacity="0.8" />
        <rect x="160" y="48" width="12" height="30" fill="#fde68a" opacity="0.8" />
        <rect x="178" y="55" width="14" height="23" fill="#bfdbfe" />
      </g>
      <path d="M0 240 L0 195 Q 100 155 200 195 L200 240 Z" fill="#f8fafc" />
      <path d="M78 178 L100 210 L122 178 L122 240 L78 240 Z" fill="#bae6fd" />
      <path d="M88 175 L100 195 L112 175" fill="none" stroke="#7dd3fc" strokeWidth="1.5" />
      <path d="M70 200 L100 220 L130 200" stroke="#cbd5e1" strokeWidth="1.2" fill="none" />
      <rect x="88" y="138" width="24" height="22" fill="#f3d4b0" />
      <ellipse cx="100" cy="105" rx="40" ry="48" fill="#f8d7b3" />
      <path d="M62 92 Q 60 60 100 55 Q 140 60 138 92 Q 130 78 100 76 Q 70 78 62 92 Z" fill="#92400e" />
      <ellipse cx="60" cy="108" rx="5" ry="9" fill="#f3d4b0" />
      <ellipse cx="140" cy="108" rx="5" ry="9" fill="#f3d4b0" />
      <circle cx="84" cy="108" r="2" fill="#1e293b" />
      <circle cx="116" cy="108" r="2" fill="#1e293b" />
      <path d="M76 100 Q 84 96 92 100 M 108 100 Q 116 96 124 100" stroke="#78350f" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M90 128 Q 100 134 110 128" stroke="#7f1d1d" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function PortraitGoateeGreenWall({ className = "" }: PortraitProps) {
  return (
    <svg viewBox="0 0 200 240" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="240" fill="#bbf7d0" />
      <path d="M0 240 L0 195 Q 100 150 200 195 L200 240 Z" fill="#1e1b4b" />
      <path d="M70 195 L100 225 L130 195 L130 240 L70 240 Z" fill="#f8fafc" />
      <path d="M94 195 L100 230 L106 195 Z" fill="#0c4a6e" />
      <g fill="#fbbf24" opacity="0.85">
        <circle cx="100" cy="205" r="1.2" />
        <circle cx="100" cy="212" r="1.2" />
        <circle cx="100" cy="219" r="1.2" />
        <circle cx="100" cy="226" r="1.2" />
      </g>
      <rect x="88" y="138" width="24" height="22" fill="#f3d4b0" />
      <ellipse cx="100" cy="105" rx="40" ry="48" fill="#f8d7b3" />
      <path d="M62 105 Q 58 70 78 65 Q 80 78 75 100 Z" fill="#3f3f46" />
      <path d="M138 105 Q 142 70 122 65 Q 120 78 125 100 Z" fill="#3f3f46" />
      <path d="M62 105 Q 65 130 75 130 L 75 110 Z M 138 105 Q 135 130 125 130 L 125 110 Z" fill="#3f3f46" />
      <ellipse cx="60" cy="108" rx="5" ry="9" fill="#f3d4b0" />
      <ellipse cx="140" cy="108" rx="5" ry="9" fill="#f3d4b0" />
      <g stroke="#1e293b" strokeWidth="1.6" fill="none">
        <rect x="74" y="100" width="20" height="14" rx="2" />
        <rect x="106" y="100" width="20" height="14" rx="2" />
        <line x1="94" y1="107" x2="106" y2="107" />
      </g>
      <circle cx="84" cy="107" r="1.8" fill="#0f172a" />
      <circle cx="116" cy="107" r="1.8" fill="#0f172a" />
      <path d="M92 135 Q 100 152 108 135 Q 105 145 100 145 Q 95 145 92 135 Z" fill="#3f3f46" />
      <path d="M88 128 Q 100 134 112 128 Q 104 130 100 130 Q 96 130 88 128 Z" fill="#3f3f46" />
    </svg>
  );
}

function PortraitDarkSuitBlackBg({ className = "" }: PortraitProps) {
  return (
    <svg viewBox="0 0 200 240" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="240" fill="#0a0a0a" />
      <path d="M0 240 L0 195 Q 100 155 200 195 L200 240 Z" fill="#111827" />
      <path d="M72 192 L100 218 L128 192 L128 240 L72 240 Z" fill="#bae6fd" />
      <path d="M82 188 L100 205 L118 188" fill="none" stroke="#7dd3fc" strokeWidth="1.4" />
      <rect x="88" y="138" width="24" height="22" fill="#eccdaa" />
      <ellipse cx="100" cy="105" rx="40" ry="48" fill="#f1d3b1" />
      <path d="M62 90 Q 60 58 100 55 Q 140 58 138 90 Q 130 76 100 74 Q 70 76 62 90 Z" fill="#0f172a" />
      <ellipse cx="60" cy="108" rx="5" ry="9" fill="#eccdaa" />
      <ellipse cx="140" cy="108" rx="5" ry="9" fill="#eccdaa" />
      <g stroke="#1e293b" strokeWidth="1.6" fill="none">
        <circle cx="84" cy="110" r="10" />
        <circle cx="116" cy="110" r="10" />
        <line x1="94" y1="110" x2="106" y2="110" />
      </g>
      <path d="M78 112 Q 84 106 90 112 M 110 112 Q 116 106 122 112" stroke="#0f172a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M84 128 Q 100 144 116 128" stroke="#7f1d1d" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M86 128 Q 100 138 114 128" fill="#fda4af" opacity="0.5" />
    </svg>
  );
}

function PortraitWomanScarfLab({ className = "" }: PortraitProps) {
  return (
    <svg viewBox="0 0 200 240" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="240" fill="#e7e5e4" />
      <g opacity="0.55">
        <rect x="0" y="60" width="200" height="3" fill="#a8a29e" />
        <rect x="0" y="100" width="200" height="3" fill="#a8a29e" />
        <rect x="0" y="140" width="200" height="3" fill="#a8a29e" />
        <rect x="10" y="68" width="10" height="32" fill="#78716c" />
        <rect x="24" y="72" width="8" height="28" fill="#a8a29e" />
        <rect x="36" y="68" width="12" height="32" fill="#57534e" />
        <rect x="155" y="68" width="14" height="32" fill="#78716c" />
        <rect x="173" y="74" width="10" height="26" fill="#a8a29e" />
      </g>
      <path d="M0 240 L0 195 Q 100 155 200 195 L200 240 Z" fill="#0f172a" />
      <g fill="#f97316" opacity="0.9">
        <circle cx="100" cy="220" r="6" />
        <rect x="92" y="215" width="16" height="2" />
      </g>
      <path d="M72 175 Q 100 195 128 175 L 132 200 Q 100 215 68 200 Z" fill="#7c2d12" />
      <g fill="#fde68a" opacity="0.85">
        <circle cx="82" cy="187" r="2" />
        <circle cx="95" cy="192" r="2" />
        <circle cx="108" cy="190" r="2" />
        <circle cx="120" cy="186" r="2" />
        <circle cx="76" cy="197" r="1.5" />
        <circle cx="92" cy="202" r="1.5" />
        <circle cx="115" cy="200" r="1.5" />
      </g>
      <ellipse cx="100" cy="108" rx="38" ry="46" fill="#f8d7b3" />
      <path d="M64 100 Q 60 60 100 56 Q 140 60 136 100 Q 130 75 100 72 Q 72 75 64 100 Z" fill="#78350f" />
      <path d="M70 90 Q 85 85 100 92 Q 115 85 130 90 Q 115 100 100 98 Q 85 100 70 90 Z" fill="#78350f" />
      <ellipse cx="62" cy="112" rx="5" ry="9" fill="#f8d7b3" />
      <ellipse cx="138" cy="112" rx="5" ry="9" fill="#f8d7b3" />
      <path d="M80 112 Q 86 107 92 112 M 108 112 Q 114 107 120 112" stroke="#1e293b" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M78 102 Q 86 99 94 102 M 106 102 Q 114 99 122 102" stroke="#78350f" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M88 132 Q 100 142 112 132" stroke="#be123c" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M90 132 Q 100 138 110 132" fill="#fda4af" opacity="0.6" />
    </svg>
  );
}

/* ---------- id → portrait lookup ---------- */

const PORTRAITS: Record<string, (cls: string) => React.ReactNode> = {
  "grey-hair-checkered": (cls) => <PortraitAsianGreyHairCheckered className={cls} />,
  "white-beard-suit":    (cls) => <PortraitWhiteBeardSuit         className={cls} />,
  "vneck-sweater-tie":   (cls) => <PortraitVNeckSweaterTie        className={cls} />,
  "lab-coat":            (cls) => <PortraitLabCoat                className={cls} />,
  "goatee-green-wall":   (cls) => <PortraitGoateeGreenWall        className={cls} />,
  "dark-suit-black-bg":  (cls) => <PortraitDarkSuitBlackBg        className={cls} />,
  "woman-scarf-lab":     (cls) => <PortraitWomanScarfLab          className={cls} />,
};

/* ---------- Quote card ---------- */

function QuoteCard({ text }: { text: string }) {
  return (
    <div className="relative flex h-full flex-col justify-center overflow-hidden rounded-md bg-[#dbeafe] p-7">
      <span
        aria-hidden
        className="pointer-events-none absolute -left-1 -top-4 select-none text-[110px] font-serif font-bold leading-none text-white/85"
        style={{ textShadow: "0 1px 0 rgba(148,163,184,0.4)" }}
      >
        &ldquo;
      </span>
      <p className="relative z-10 text-lg font-semibold leading-snug text-[#0b2545] sm:text-xl">
        {text}
      </p>
    </div>
  );
}

/* ---------- Portrait card wrapper ---------- */

function PortraitTile({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative aspect-[5/6] w-full overflow-hidden rounded-md bg-slate-200 shadow-sm ring-1 ring-slate-200/70"
    >
      {children}
    </div>
  );
}

/* ---------- Main component ---------- */

// JSON loses our discriminated-union types — re-narrow at the edge.
type GridItem =
  | { kind: "portrait"; id: string; label: string }
  | { kind: "quote"; text: string };

export default function ScholarTestimonials() {
  const rows = [
    scholarTestimonials.row1,
    scholarTestimonials.row2,
  ] as unknown as GridItem[][];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl md:text-4xl">
            {scholarTestimonials.title}
          </h2>
          <Link
            href={scholarTestimonials.moreHref}
            className="inline-flex items-center gap-1 rounded-sm border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
          >
            {scholarTestimonials.moreLabel} <span aria-hidden>&gt;</span>
          </Link>
        </div>

        {/* Two-row staggered grid. */}
        <div className="mt-10 flex flex-col gap-6">
          {rows.map((row, ri) => (
            <div
              key={ri}
              className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5"
            >
              {row.map((item, i) =>
                item.kind === "portrait" ? (
                  <PortraitTile key={i} label={item.label}>
                    {PORTRAITS[item.id]("h-full w-full")}
                  </PortraitTile>
                ) : (
                  <div key={i} className="aspect-[5/6] w-full">
                    <QuoteCard text={item.text} />
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
