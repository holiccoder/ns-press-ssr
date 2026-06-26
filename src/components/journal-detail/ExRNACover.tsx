function NspBadge({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[9px] font-semibold tracking-[0.18em] ${
        tone === "dark" ? "text-white/90" : "text-slate-700"
      }`}
    >
      <span className="grid h-3.5 w-3.5 place-items-center rounded-sm bg-white/90 text-[8px] font-extrabold leading-none text-[#0b2545]">
        N
      </span>
      NSP
    </span>
  );
}

function CoverFrame({
  issn,
  children,
  className = "",
}: {
  issn: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-lg ring-1 ring-black/10 ${className}`}
    >
      {children}
      <span className="absolute right-2 top-2 text-[8px] font-semibold tracking-wider text-slate-700">
        ISSN {issn}
      </span>
      <div className="absolute bottom-2 left-2 flex items-center gap-2">
        <span className="text-[9px] font-bold tracking-[0.18em] text-rose-600">
          RIBIO
        </span>
        <NspBadge tone="light" />
      </div>
    </div>
  );
}

export default function ExRNACover({ className = "" }: { className?: string }) {
  return (
    <CoverFrame issn="2398-0060" className={className}>
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-x-0 top-5 px-4 text-center">
        <p className="text-[10px] tracking-[0.3em] text-slate-500">JOURNAL</p>
        <p className="mt-1 text-lg font-extrabold italic text-rose-600">
          ExRNA
        </p>
      </div>
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-x-0 top-10 mx-auto h-24 w-full"
        aria-hidden="true"
      >
        <g>
          <ellipse cx="30" cy="55" rx="14" ry="9" fill="#ef4444" />
          <ellipse cx="30" cy="55" rx="6" ry="4" fill="#b91c1c" />
          <ellipse cx="65" cy="68" rx="13" ry="8" fill="#dc2626" />
          <ellipse cx="65" cy="68" rx="5" ry="3.5" fill="#991b1b" />
          <ellipse cx="78" cy="48" rx="10" ry="7" fill="#ef4444" />
          <ellipse cx="78" cy="48" rx="4" ry="3" fill="#b91c1c" />
        </g>
      </svg>
      <svg
        viewBox="0 0 80 80"
        className="absolute bottom-6 right-2 h-20 w-20"
        aria-hidden="true"
      >
        <g
          stroke="#0ea5e9"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        >
          <path d="M20 5 C 60 25, 20 45, 60 65 M60 5 C 20 25, 60 45, 20 65" />
          {[10, 22, 34, 46, 58].map((y) => (
            <line key={y} x1="22" y1={y} x2="58" y2={y} stroke="#38bdf8" />
          ))}
        </g>
      </svg>
    </CoverFrame>
  );
}
