import home from "@/data/home.json";

const { hero } = home;

function DeerLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M52 8l-4 8-6-2-3 5 5 4-10 10-12-4-8 6 4 6-10 10 4 4 12-8 8 4 6-6-4-6 12-12 6 2 3-6-5-3 4-8-2-4z" />
      <circle cx="50" cy="12" r="2" />
    </svg>
  );
}

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

/**
 * Constellation / network overlay rendered as inline SVG so it scales
 * crisply at any viewport size without shipping a raster asset.
 */
function NetworkOverlay({ className = "" }: { className?: string }) {
  // Deterministic node positions — chosen by hand to avoid Math.random()
  // (which would also break SSR snapshots).
  const nodes: { x: number; y: number; r: number }[] = [
    { x: 80, y: 40, r: 3 },
    { x: 160, y: 90, r: 2 },
    { x: 240, y: 50, r: 4 },
    { x: 320, y: 130, r: 2 },
    { x: 110, y: 180, r: 3 },
    { x: 210, y: 220, r: 2 },
    { x: 300, y: 200, r: 3 },
    { x: 380, y: 80, r: 2 },
    { x: 60, y: 280, r: 2 },
    { x: 170, y: 320, r: 3 },
    { x: 270, y: 300, r: 2 },
    { x: 360, y: 260, r: 4 },
    { x: 130, y: 420, r: 2 },
    { x: 240, y: 400, r: 3 },
    { x: 340, y: 380, r: 2 },
    { x: 90, y: 500, r: 3 },
    { x: 220, y: 510, r: 2 },
    { x: 330, y: 470, r: 3 },
  ];

  // Pairs of node indices to connect.
  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [1, 4], [2, 5], [3, 7],
    [4, 5], [5, 6], [6, 7], [4, 8], [5, 9], [6, 10],
    [7, 11], [9, 10], [10, 11], [9, 12], [10, 13],
    [11, 14], [12, 13], [13, 14], [12, 15], [13, 16],
    [14, 17], [15, 16], [16, 17],
  ];

  return (
    <svg
      viewBox="0 0 440 560"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      className={className}
    >
      <g stroke="rgb(125 211 252 / 0.55)" strokeWidth="1">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
          />
        ))}
      </g>
      <g fill="rgb(186 230 253 / 0.95)">
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r} />
        ))}
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden text-white"
      style={{
        // Deep cosmic gradient + a soft radial highlight for the Earth's
        // curvature glow at the bottom of the banner.
        backgroundImage: [
          "radial-gradient(ellipse 90% 60% at 50% 110%, rgba(56,189,248,0.45) 0%, rgba(11,37,69,0) 60%)",
          "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(255,255,255,0.25) 0%, rgba(11,37,69,0) 55%)",
          "linear-gradient(180deg, #050b1f 0%, #0b2545 55%, #0a3d7a 100%)",
        ].join(", "),
      }}
    >
      {/* Earth curvature arc at the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[55%] left-1/2 h-[120%] w-[160%] -translate-x-1/2 rounded-[50%]"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(96,165,250,0.35) 0%, rgba(30,64,175,0.25) 35%, rgba(11,37,69,0) 70%)",
          boxShadow: "inset 0 60px 120px rgba(147,197,253,0.25)",
        }}
      />

      {/* Network / constellation graphic on the right */}
      <NetworkOverlay
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 opacity-80 md:block"
      />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-20 pb-28 text-center sm:pt-24 sm:pb-32">
        {/* Central branding */}
        <div className="flex items-center gap-3">
          <DeerLogo className="h-14 w-14 text-white sm:h-16 sm:w-16" />
          <span className="flex items-baseline gap-2 leading-none">
            <span className="text-3xl font-bold tracking-wide sm:text-4xl">
              {hero.brand.acronym}
            </span>
            <span className="text-xl font-light tracking-wide text-white/85 sm:text-2xl">
              {hero.brand.subtitle}
            </span>
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-10 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          {hero.headline}
        </h1>

        {/* Tagline */}
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
          {hero.tagline}
        </p>

        {/* Search bar */}
        <form
          role="search"
          action={hero.search.action}
          className="mt-12 flex w-full max-w-2xl items-stretch overflow-hidden rounded-full bg-white shadow-xl shadow-black/20"
        >
          <label htmlFor="hero-search" className="sr-only">
            {hero.search.label}
          </label>
          <input
            id="hero-search"
            type="search"
            name="q"
            placeholder={hero.search.placeholder}
            className="min-w-0 flex-1 bg-transparent px-6 py-4 text-base text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="submit"
            aria-label={hero.search.submitLabel}
            className="flex shrink-0 items-center justify-center bg-[#0b2545] px-7 text-white transition-colors hover:bg-[#1e3a8a] focus:outline-none focus:ring-2 focus:ring-[#0b2545]/50"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </section>
  );
}
