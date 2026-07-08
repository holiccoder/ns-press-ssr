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
              className="inline-flex items-center rounded-md bg-[#0b2545] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1e3a8a]"
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
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 md:grid-cols-2">
        {services.items.map((s) => (
          <ServiceCard key={s.id} service={s} />
        ))}
      </div>
    </section>
  );
}
