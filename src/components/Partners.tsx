/* ---------- Partner logo artworks (inline SVG, no raster assets needed) ---------- */

function CrossrefLogo({ withWordmark = true }: { withWordmark?: boolean }) {
  // Four overlapping parallelograms in yellow / red / dark blue / teal.
  return (
    <div className="flex flex-col items-center gap-2">
      <svg viewBox="0 0 80 60" aria-hidden="true" className="h-10 w-auto">
        <g transform="skewX(-18)">
          <rect x="22" y="2" width="20" height="20" fill="#facc15" />
          <rect x="42" y="2" width="20" height="20" fill="#ef4444" />
          <rect x="22" y="22" width="20" height="20" fill="#0b2545" />
          <rect x="42" y="22" width="20" height="20" fill="#0d9488" />
        </g>
      </svg>
      {withWordmark && (
        <span className="text-base font-extrabold tracking-tight text-slate-900">
          Crossref
        </span>
      )}
    </div>
  );
}

function LetPubLogo() {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-orange-500 text-lg font-extrabold leading-none text-white">
          P
        </span>
        <span className="text-2xl font-extrabold tracking-tight text-[#1d4ed8]">
          LetPub
        </span>
      </div>
      <span className="text-[10px] tracking-wider text-slate-600">
        专业SCI论文编辑
      </span>
    </div>
  );
}

function Call4PapersLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="grid h-14 w-14 place-items-center rounded-full border-[3px] border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.45)]">
        <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7">
          <g fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round">
            <rect x="8" y="6" width="16" height="20" rx="1.5" />
            <line x1="11" y1="11" x2="21" y2="11" />
            <line x1="11" y1="15" x2="21" y2="15" />
            <line x1="11" y1="19" x2="18" y2="19" />
          </g>
        </svg>
      </div>
      <span className="text-sm font-bold text-emerald-600">Call4Papers</span>
    </div>
  );
}

function ESBKLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* Stylized deer/antelope line drawing */}
      <svg viewBox="0 0 64 64" aria-hidden="true" className="h-10 w-10">
        <g
          fill="none"
          stroke="#1d4ed8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Antlers */}
          <path d="M22 12 L18 4 M22 12 L26 6 M22 12 L14 10" />
          <path d="M42 12 L46 4 M42 12 L38 6 M42 12 L50 10" />
          {/* Head */}
          <path d="M22 14 C 22 22, 28 28, 32 28 C 36 28, 42 22, 42 14" />
          {/* Body */}
          <path d="M28 28 L24 50 M36 28 L40 50" />
          <path d="M22 38 L42 38" />
          {/* Eye */}
          <circle cx="29" cy="20" r="1" fill="#1d4ed8" />
        </g>
      </svg>
      <div className="flex flex-col">
        <span className="text-xl font-extrabold tracking-wide text-[#1d4ed8]">
          ESBK
        </span>
        <span className="text-[10px] tracking-wider text-slate-600">
          Eibook Publisher
        </span>
      </div>
    </div>
  );
}

function CentralSouthUniversityLogo() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true" className="h-16 w-16">
      <defs>
        <path
          id="csu-top"
          d="M 14 40 A 26 26 0 0 1 66 40"
          fill="none"
        />
        <path
          id="csu-bot"
          d="M 14 40 A 26 26 0 0 0 66 40"
          fill="none"
        />
      </defs>
      <circle cx="40" cy="40" r="32" fill="#0b3b8c" />
      <circle
        cx="40"
        cy="40"
        r="29"
        fill="none"
        stroke="white"
        strokeWidth="0.8"
      />
      <circle
        cx="40"
        cy="40"
        r="22"
        fill="none"
        stroke="white"
        strokeWidth="0.6"
      />
      <text fontSize="4.2" fill="white" letterSpacing="0.4">
        <textPath href="#csu-top" startOffset="50%" textAnchor="middle">
          中南大学
        </textPath>
      </text>
      <text fontSize="3.4" fill="white" letterSpacing="0.5">
        <textPath href="#csu-bot" startOffset="50%" textAnchor="middle">
          CENTRAL SOUTH UNIVERSITY
        </textPath>
      </text>
      {/* Geometric interlocking shapes */}
      <g
        transform="translate(40 40)"
        fill="none"
        stroke="white"
        strokeWidth="1"
      >
        <polygon points="0,-10 9,-3 6,8 -6,8 -9,-3" />
        <polygon points="0,-6 5,-2 3,5 -3,5 -5,-2" />
        <line x1="0" y1="-10" x2="0" y2="-15" />
        <line x1="-9" y1="-3" x2="-13" y2="-5" />
        <line x1="9" y1="-3" x2="13" y2="-5" />
      </g>
    </svg>
  );
}

function SunYatSenUniversityLogo() {
  return (
    <div className="flex flex-col items-center gap-1">
      <svg viewBox="0 0 64 80" aria-hidden="true" className="h-14 w-auto">
        {/* Shield outline */}
        <path
          d="M32 4 L58 12 L58 44 C 58 60, 46 72, 32 76 C 18 72, 6 60, 6 44 L 6 12 Z"
          fill="#6d28d9"
          stroke="#4c1d95"
          strokeWidth="1.4"
        />
        {/* Abstract triangular design */}
        <g fill="white" opacity="0.95">
          <polygon points="32,18 22,40 42,40" />
          <polygon points="32,30 26,46 38,46" fill="#a78bfa" />
          <polygon points="32,40 30,52 34,52" fill="white" />
        </g>
        {/* Banner */}
        <rect x="14" y="58" width="36" height="8" fill="#fde68a" opacity="0.9" />
      </svg>
      <span className="text-[10px] font-semibold tracking-wider text-[#4c1d95]">
        SUN YAT-SEN UNIVERSITY
      </span>
    </div>
  );
}

function ZUELLogo() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true" className="h-16 w-16">
      <defs>
        <path id="zuel-top" d="M 14 40 A 26 26 0 0 1 66 40" fill="none" />
        <path id="zuel-bot" d="M 14 40 A 26 26 0 0 0 66 40" fill="none" />
      </defs>
      <circle cx="40" cy="40" r="32" fill="#9f1239" />
      <circle
        cx="40"
        cy="40"
        r="29"
        fill="none"
        stroke="#fde68a"
        strokeWidth="0.8"
      />
      <circle
        cx="40"
        cy="40"
        r="22"
        fill="none"
        stroke="#fde68a"
        strokeWidth="0.5"
      />
      <text fontSize="4" fill="#fde68a" letterSpacing="0.5">
        <textPath href="#zuel-top" startOffset="50%" textAnchor="middle">
          中南财经政法大学
        </textPath>
      </text>
      <text fontSize="2.6" fill="#fde68a" letterSpacing="0.3">
        <textPath href="#zuel-bot" startOffset="50%" textAnchor="middle">
          ZHONGNAN UNIV. OF ECONOMICS AND LAW
        </textPath>
      </text>
      {/* Scale of justice */}
      <g
        transform="translate(40 42)"
        stroke="#fde68a"
        strokeWidth="0.9"
        fill="none"
        strokeLinecap="round"
      >
        <line x1="0" y1="-10" x2="0" y2="6" />
        <line x1="-8" y1="-6" x2="8" y2="-6" />
        <line x1="-8" y1="-6" x2="-10" y2="0" />
        <line x1="-8" y1="-6" x2="-6" y2="0" />
        <line x1="-10" y1="0" x2="-6" y2="0" />
        <line x1="8" y1="-6" x2="6" y2="0" />
        <line x1="8" y1="-6" x2="10" y2="0" />
        <line x1="6" y1="0" x2="10" y2="0" />
        <line x1="-4" y1="6" x2="4" y2="6" />
      </g>
    </svg>
  );
}

function BJUTLogo() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true" className="h-16 w-16">
      <defs>
        <path id="bjut-top" d="M 14 40 A 26 26 0 0 1 66 40" fill="none" />
        <path id="bjut-bot" d="M 14 40 A 26 26 0 0 0 66 40" fill="none" />
      </defs>
      <circle cx="40" cy="40" r="32" fill="#bae6fd" />
      <circle cx="40" cy="40" r="32" fill="none" stroke="#0369a1" strokeWidth="1" />
      <circle cx="40" cy="40" r="22" fill="white" />
      <circle cx="40" cy="40" r="22" fill="none" stroke="#0369a1" strokeWidth="0.6" />
      <text fontSize="3.4" fill="#0c4a6e" letterSpacing="0.4">
        <textPath href="#bjut-top" startOffset="50%" textAnchor="middle">
          BEIJING UNIVERSITY OF TECHNOLOGY
        </textPath>
      </text>
      <text fontSize="4.2" fill="#0c4a6e" letterSpacing="0.6">
        <textPath href="#bjut-bot" startOffset="50%" textAnchor="middle">
          北京工业大学
        </textPath>
      </text>
      {/* Stylized B */}
      <g transform="translate(40 42)">
        <text
          textAnchor="middle"
          fontSize="22"
          fontWeight="900"
          fontStyle="italic"
          fill="#0369a1"
          y="7"
        >
          B
        </text>
      </g>
    </svg>
  );
}

function CrossrefSimilarityLogo() {
  return (
    <div className="flex items-center gap-3">
      <CrossrefLogo withWordmark={false} />
      <div className="flex flex-col">
        <span className="text-sm font-semibold tracking-tight text-slate-500">
          Crossref Similarity Check
        </span>
        <span className="text-[10px] text-slate-400">
          Powered by iThenticate
        </span>
      </div>
    </div>
  );
}

function CUPLogo() {
  return (
    <svg viewBox="0 0 80 80" aria-hidden="true" className="h-16 w-16">
      <defs>
        <path id="cup-top" d="M 14 40 A 26 26 0 0 1 66 40" fill="none" />
        <path id="cup-bot" d="M 14 40 A 26 26 0 0 0 66 40" fill="none" />
      </defs>
      <circle cx="40" cy="40" r="32" fill="#0b2545" />
      <circle
        cx="40"
        cy="40"
        r="29"
        fill="none"
        stroke="white"
        strokeWidth="0.8"
      />
      <circle
        cx="40"
        cy="40"
        r="22"
        fill="none"
        stroke="white"
        strokeWidth="0.5"
      />
      <text fontSize="4" fill="white" letterSpacing="0.5">
        <textPath href="#cup-top" startOffset="50%" textAnchor="middle">
          中国石油大学
        </textPath>
      </text>
      <text fontSize="2.8" fill="white" letterSpacing="0.4">
        <textPath href="#cup-bot" startOffset="50%" textAnchor="middle">
          CHINA UNIVERSITY OF PETROLEUM
        </textPath>
      </text>
      {/* Derrick + gear + flame */}
      <g transform="translate(40 42)">
        {/* Derrick */}
        <g stroke="white" strokeWidth="0.9" fill="none" strokeLinecap="round">
          <line x1="-6" y1="8" x2="-1" y2="-10" />
          <line x1="6" y1="8" x2="1" y2="-10" />
          <line x1="-4" y1="2" x2="4" y2="2" />
          <line x1="-3" y1="-4" x2="3" y2="-4" />
          <line x1="-1" y1="-10" x2="1" y2="-10" />
        </g>
        {/* Flame */}
        <path
          d="M 0 -10 C -2 -14, 2 -14, 0 -18 C 3 -15, 3 -11, 0 -10 Z"
          fill="#f97316"
        />
        {/* Gear */}
        <g
          transform="translate(0 10)"
          fill="white"
          stroke="white"
          strokeWidth="0.4"
        >
          <circle r="4" fill="none" />
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              x="-0.7"
              y="-5.5"
              width="1.4"
              height="1.6"
              transform={`rotate(${i * 45})`}
            />
          ))}
          <circle r="1.4" />
        </g>
      </g>
    </svg>
  );
}

function EurekAlertLogo() {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-2">
        {/* Signal tower / abstract E */}
        <svg viewBox="0 0 28 28" aria-hidden="true" className="h-7 w-7">
          <g fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round">
            <line x1="14" y1="4" x2="14" y2="24" />
            <path d="M14 8 C 9 8, 6 11, 6 14" />
            <path d="M14 14 C 11 14, 9 16, 9 18" />
            <path d="M14 8 C 19 8, 22 11, 22 14" />
            <path d="M14 14 C 17 14, 19 16, 19 18" />
            <circle cx="14" cy="4" r="1.5" fill="#dc2626" />
          </g>
        </svg>
        <span className="text-xl font-extrabold tracking-tight text-red-600">
          EurekAlert!
        </span>
      </div>
      <span className="text-[10px] text-slate-900">
        The Global Source for Science News
      </span>
    </div>
  );
}

function STMLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <span className="text-2xl font-extrabold tracking-tight text-slate-900">
          STM
        </span>
        {/* Tiny molecular icon */}
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
          <g fill="none" stroke="#0f172a" strokeWidth="1.4">
            <circle cx="6" cy="12" r="2.5" />
            <circle cx="18" cy="6" r="2.5" />
            <circle cx="18" cy="18" r="2.5" />
            <line x1="8" y1="11" x2="16" y2="7" />
            <line x1="8" y1="13" x2="16" y2="17" />
          </g>
        </svg>
      </div>
      <span className="text-sm font-medium text-slate-900">Member 2026</span>
    </div>
  );
}

function OASPALogo() {
  return (
    <span className="text-3xl font-extrabold tracking-tight text-[#0b2545]">
      OASPA
    </span>
  );
}

/* ---------- Partner item type ---------- */

type Partner = {
  name: string;
  logo: React.ReactNode;
};

const rows: Partner[][] = [
  [
    { name: "Crossref", logo: <CrossrefLogo /> },
    { name: "LetPub", logo: <LetPubLogo /> },
    { name: "Call4Papers", logo: <Call4PapersLogo /> },
    { name: "ESBK", logo: <ESBKLogo /> },
    { name: "Central South University", logo: <CentralSouthUniversityLogo /> },
  ],
  [
    { name: "Sun Yat-sen University", logo: <SunYatSenUniversityLogo /> },
    {
      name: "Zhongnan University of Economics and Law",
      logo: <ZUELLogo />,
    },
    { name: "Beijing University of Technology", logo: <BJUTLogo /> },
    { name: "Crossref Similarity Check", logo: <CrossrefSimilarityLogo /> },
    { name: "China University of Petroleum", logo: <CUPLogo /> },
  ],
  [
    { name: "EurekAlert!", logo: <EurekAlertLogo /> },
    { name: "STM", logo: <STMLogo /> },
    { name: "OASPA", logo: <OASPALogo /> },
  ],
];

/* ---------- Main component ---------- */

export default function Partners() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <h2 className="text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl md:text-4xl">
          Our Partners
        </h2>

        {/* Logo grid */}
        <div className="mt-10 flex flex-col gap-y-10">
          {rows.map((row, ri) => (
            <div
              key={ri}
              className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-5"
              role="list"
              aria-label={`Partners row ${ri + 1}`}
            >
              {row.map((p) => (
                <div
                  key={p.name}
                  role="listitem"
                  title={p.name}
                  className="flex h-20 w-full items-center justify-center grayscale-0 opacity-90 transition-opacity hover:opacity-100"
                >
                  {p.logo}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
