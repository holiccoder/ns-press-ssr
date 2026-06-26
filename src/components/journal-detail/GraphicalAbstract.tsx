// Placeholder graphical abstracts for the journal detail page.
// These are intentionally simple SVG compositions so the page renders without
// external raster assets. Replace with real images when assets are available.

function VirusInhibitorVisual() {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" className="h-full w-full">
      <rect width="200" height="120" fill="#fef2f2" />
      <g fill="#ef4444">
        <circle cx="60" cy="60" r="24" />
        <circle cx="60" cy="36" r="4" />
        <circle cx="60" cy="84" r="4" />
        <circle cx="36" cy="60" r="4" />
        <circle cx="84" cy="60" r="4" />
        <circle cx="43" cy="43" r="3" />
        <circle cx="77" cy="77" r="3" />
        <circle cx="43" cy="77" r="3" />
        <circle cx="77" cy="43" r="3" />
      </g>
      <text x="110" y="55" fontSize="11" fontWeight="700" fill="#0b2545">
        MIR2911
      </text>
      <path
        d="M100 60 L140 60 M130 54 L140 60 L130 66"
        stroke="#1d4ed8"
        strokeWidth="2"
        fill="none"
      />
      <text x="110" y="78" fontSize="9" fill="#475569">
        Nipah virus inhibitor
      </text>
    </svg>
  );
}

function RnaTherapeuticsVisual() {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" className="h-full w-full">
      <rect width="200" height="120" fill="#eff6ff" />
      <g stroke="#2563eb" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M30 90 C 50 40, 80 30, 100 60 S 150 90, 170 40" />
        <path d="M40 90 C 60 50, 90 40, 110 70 S 160 100, 180 50" />
      </g>
      <g fill="#1d4ed8">
        {[
          [55, 55],
          [75, 42],
          [105, 68],
          [135, 78],
          [155, 62],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" />
        ))}
      </g>
      <text x="100" y="22" fontSize="10" fontWeight="700" fill="#0b2545" textAnchor="middle">
        RNA interference therapeutics
      </text>
    </svg>
  );
}

function EvRnaIbdVisual() {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" className="h-full w-full">
      <rect width="200" height="120" fill="#f0fdf4" />
      <g fill="#22c55e" opacity="0.85">
        <ellipse cx="70" cy="60" rx="35" ry="22" />
        <ellipse cx="70" cy="60" rx="18" ry="10" fill="#15803d" />
      </g>
      <g stroke="#0ea5e9" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <path d="M105 60 C 125 40, 145 50, 160 60" />
        <path d="M105 70 C 125 90, 145 80, 160 70" />
      </g>
      <text x="130" y="58" fontSize="9" fontWeight="600" fill="#0b2545" textAnchor="middle">
        EV RNA
      </text>
      <text x="130" y="82" fontSize="9" fontWeight="600" fill="#0b2545" textAnchor="middle">
        IBD management
      </text>
    </svg>
  );
}

function ThalassemiaMirnaVisual() {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" className="h-full w-full">
      <rect width="200" height="120" fill="#fff7ed" />
      <g fill="#3b82f6">
        {Array.from({ length: 8 }).map((_, i) => {
          const x = 25 + i * 20;
          const h = 20 + ((i * 13) % 45);
          return <rect key={i} x={x - 6} y={80 - h} width="10" height={h} rx="2" />;
        })}
      </g>
      <line x1="15" y1="80" x2="175" y2="80" stroke="#94a3b8" strokeWidth="1" />
      <text x="100" y="24" fontSize="10" fontWeight="700" fill="#0b2545" textAnchor="middle">
        Circulating microRNA profiling
      </text>
      <text x="100" y="105" fontSize="8" fill="#475569" textAnchor="middle">
        Thalassemia vs healthy controls
      </text>
    </svg>
  );
}

function ProstateMirnaVisual() {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" className="h-full w-full">
      <rect width="200" height="120" fill="#fdf2f8" />
      <g fill="none" stroke="#db2777" strokeWidth="2" strokeLinecap="round">
        <path d="M30 90 C 50 50, 80 30, 100 60 S 150 90, 170 30" />
      </g>
      <g fill="#be185d">
        {[
          [50, 55],
          [80, 40],
          [110, 72],
          [140, 82],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.5" />
        ))}
      </g>
      <text x="100" y="22" fontSize="10" fontWeight="700" fill="#0b2545" textAnchor="middle">
        Prostate cancer EV miRNA
      </text>
    </svg>
  );
}

const VISUALS: Record<string, React.ReactNode> = {
  "virus-inhibitor": <VirusInhibitorVisual />,
  "rna-therapeutics": <RnaTherapeuticsVisual />,
  "ev-rna-ibd": <EvRnaIbdVisual />,
  "thalassemia-mirna": <ThalassemiaMirnaVisual />,
  "prostate-mirna": <ProstateMirnaVisual />,
};

export default function GraphicalAbstract({ visualId }: { visualId: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-sm bg-slate-50 ring-1 ring-slate-200">
      <div className="aspect-[16/10] w-full">{VISUALS[visualId] ?? null}</div>
    </div>
  );
}
