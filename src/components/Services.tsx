import Link from "next/link";
import home from "@/data/home.json";

const { services } = home;

/* ---------- Decorative artwork (inline SVG, no raster assets needed) ---------- */

function WavesArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="waveStroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.55)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#waveStroke)" strokeWidth="1.5">
        <path d="M420 -20 C 320 80, 280 180, 380 320" />
        <path d="M440 0 C 320 100, 260 220, 380 380" />
        <path d="M460 30 C 300 130, 240 260, 360 420" />
        <path d="M480 60 C 280 160, 220 300, 340 460" />
        <path d="M500 90 C 260 200, 200 340, 320 500" />
        <path d="M520 120 C 240 240, 180 380, 300 540" />
      </g>
    </svg>
  );
}

function NetworkCubesArt({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 60, y: 80 }, { x: 140, y: 50 }, { x: 230, y: 120 }, { x: 320, y: 70 },
    { x: 380, y: 180 }, { x: 280, y: 240 }, { x: 180, y: 200 }, { x: 90, y: 200 },
    { x: 60, y: 320 }, { x: 200, y: 340 }, { x: 320, y: 320 },
  ];
  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
    [2, 6], [5, 9], [7, 8], [9, 10], [8, 9], [6, 9], [4, 10],
  ];
  const Cube = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <polygon points="0,-12 14,-5 0,2 -14,-5" fill="rgb(45 212 191 / 0.85)" />
      <polygon points="-14,-5 0,2 0,18 -14,11" fill="rgb(20 184 166 / 0.85)" />
      <polygon points="14,-5 0,2 0,18 14,11" fill="rgb(13 148 136 / 0.9)" />
    </g>
  );
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <g stroke="rgb(186 230 253 / 0.35)" strokeWidth="1" fill="none">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
        ))}
      </g>
      <g fill="rgb(186 230 253 / 0.7)">
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={2.5} />
        ))}
      </g>
      <Cube x={120} y={140} s={1} />
      <Cube x={300} y={110} s={0.75} />
      <Cube x={250} y={290} s={1.1} />
      <Cube x={70} y={280} s={0.7} />
    </svg>
  );
}

function SkylineArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMaxYEnd slice" aria-hidden="true" className={className}>
      <g fill="rgba(255,255,255,0.12)">
        <rect x="180" y="220" width="34" height="180" />
        <rect x="220" y="170" width="40" height="230" />
        <rect x="266" y="120" width="28" height="280" />
        <rect x="300" y="200" width="36" height="200" />
        <rect x="342" y="150" width="44" height="250" />
        <rect x="280" y="100" width="2" height="20" />
        <rect x="360" y="130" width="2" height="20" />
      </g>
      <g fill="rgba(255,255,255,0.18)">
        {Array.from({ length: 14 }).map((_, r) =>
          Array.from({ length: 4 }).map((_, c) => (
            <rect
              key={`${r}-${c}`}
              x={186 + c * 8}
              y={230 + r * 12}
              width="3"
              height="4"
            />
          ))
        )}
      </g>
    </svg>
  );
}

function OrbitArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id="orbA" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(96,165,250,0.5)" />
          <stop offset="100%" stopColor="rgba(96,165,250,0)" />
        </radialGradient>
        <radialGradient id="orbB" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(56,189,248,0.45)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0)" />
        </radialGradient>
      </defs>
      <circle cx="320" cy="120" r="160" fill="url(#orbA)" />
      <circle cx="380" cy="280" r="180" fill="url(#orbB)" />
      <circle cx="240" cy="320" r="120" fill="url(#orbA)" />
      <g fill="none" stroke="rgba(186,230,253,0.25)" strokeWidth="1">
        <circle cx="320" cy="200" r="90" />
        <circle cx="320" cy="200" r="140" />
      </g>
    </svg>
  );
}

/* ---------- id → (background, art) lookup ---------- */

const VISUALS: Record<
  string,
  { background: string; art: React.ReactNode }
> = {
  "journal-manuscript-platform": {
    background: "linear-gradient(135deg, #0a1f4d 0%, #1e4ba8 60%, #3b82f6 100%)",
    art: <WavesArt className="h-full w-full" />,
  },
  "journal-partnership": {
    background: "linear-gradient(135deg, #0d2d8a 0%, #1d4ed8 100%)",
    art: <NetworkCubesArt className="h-full w-full" />,
  },
  "conference-paper-platform": {
    background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%)",
    art: <SkylineArt className="h-full w-full" />,
  },
  "conference-collaboration": {
    background: "linear-gradient(135deg, #050b1f 0%, #0b2545 60%, #122c5e 100%)",
    art: <OrbitArt className="h-full w-full" />,
  },
};

/* ---------- Card primitive ---------- */

type Service = (typeof services.items)[number];

function ServiceCard({ service }: { service: Service }) {
  const v = VISUALS[service.id];
  return (
    <article
      className="relative isolate overflow-hidden rounded-2xl p-8 text-white shadow-lg sm:p-10"
      style={{ background: v.background }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-3/5"
      >
        {v.art}
      </div>

      <div className="relative z-10 flex h-full max-w-sm flex-col">
        <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {service.title}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-white/90 sm:text-base">
          {service.description}
        </p>

        {service.cta && (
          <div className="mt-8">
            <Link
              href={service.cta.href}
              className="inline-flex items-center rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-[#0b2545] shadow-sm transition-colors hover:bg-white/90"
            >
              {service.cta.label}
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}

/* ---------- Grid ---------- */

export default function Services() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 md:grid-cols-2">
        {services.items.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </section>
  );
}
