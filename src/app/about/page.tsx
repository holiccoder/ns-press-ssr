import type { Metadata } from "next";
import Link from "next/link";
import about from "@/data/about.json";

export const metadata: Metadata = {
  title: "About NSP — NSP",
  description:
    "About NSP — company profile, open access policy, leadership, advisory committee, and office locations.",
};

/* ---------- Hero banner geometric backdrop ---------- */

function HeroGeometry() {
  return (
    <svg
      viewBox="0 0 600 260"
      preserveAspectRatio="xMaxYMid slice"
      aria-hidden="true"
      className="absolute inset-y-0 right-0 h-full w-full opacity-70"
    >
      <defs>
        <linearGradient id="aboutHeroGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(56,189,248,0.5)" />
          <stop offset="100%" stopColor="rgba(56,189,248,0.05)" />
        </linearGradient>
      </defs>
      {/* Angular building / circuit shapes */}
      <g fill="none" stroke="url(#aboutHeroGrad)" strokeWidth="1.1" strokeLinejoin="round">
        <polygon points="380,260 380,90 440,60 500,90 500,260" />
        <polygon points="440,260 440,30 470,15 500,30 500,260" />
        <polygon points="500,260 500,100 540,75 580,100 580,260" />
        <polyline points="320,260 320,140 360,120 360,260" />
        <polyline points="280,260 280,180 320,160" />
      </g>
      <g fill="rgba(56,189,248,0.08)" stroke="rgba(125,211,252,0.35)" strokeWidth="0.8">
        <polygon points="380,260 380,90 440,60 500,90 500,260" />
        <polygon points="500,260 500,100 540,75 580,100 580,260" />
      </g>
      <g stroke="rgba(125,211,252,0.25)" strokeWidth="0.6">
        <line x1="0" y1="40"  x2="600" y2="240" />
        <line x1="0" y1="80"  x2="600" y2="200" />
        <line x1="0" y1="120" x2="600" y2="160" />
      </g>
      <g fill="#7dd3fc">
        {[[440, 60], [500, 90], [380, 90], [540, 75], [580, 100], [320, 140]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.6" />
        ))}
      </g>
    </svg>
  );
}

/* ---------- Hero + breadcrumb ---------- */

function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0b2545] via-[#0f1f4d] to-[#020617] text-white">
      <HeroGeometry />
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          {about.hero.title}
        </h1>
        <nav aria-label="Breadcrumb" className="mt-6 text-xs text-white/80 sm:text-sm">
          <ol className="flex items-center gap-2">
            {about.hero.breadcrumb.map((crumb, i) => {
              const isLast = i === about.hero.breadcrumb.length - 1;
              return (
                <li key={i} className="flex items-center gap-2">
                  {crumb.href && !isLast ? (
                    <Link href={crumb.href} className="hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                  {!isLast && <span aria-hidden className="text-white/50">&gt;</span>}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </section>
  );
}

/* ---------- Company profile ---------- */

function CompanyProfile() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl md:text-4xl">
          {about.companyProfile.title}
        </h2>
        <div className="mt-10 space-y-6 text-base leading-relaxed text-slate-700 sm:text-[17px]">
          {about.companyProfile.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Open Access ---------- */

function OpenAccess() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl md:text-4xl">
          {about.openAccess.title}
        </h2>
        <p className="mt-8 text-center text-base leading-relaxed text-slate-700 sm:text-[17px]">
          {about.openAccess.intro}
        </p>
        <ul className="mt-10 space-y-5">
          {about.openAccess.points.map((p) => (
            <li
              key={p.title}
              className="flex gap-4 rounded-md border border-slate-200 bg-white p-5 shadow-sm"
            >
              <span
                aria-hidden
                className="mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-[#1d4ed8]"
              />
              <p className="text-base leading-relaxed text-slate-700">
                <span className="font-bold text-[#0b2545]">{p.title}:</span>{" "}
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Benefits infographic ---------- */

function BenefitsInfographic() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl md:text-4xl">
          {about.benefits.title}
        </h2>

        {/* Visual: light-blue oval loop behind 5 numbered circles */}
        <div className="relative mt-14">
          <svg
            viewBox="0 0 1000 320"
            aria-hidden="true"
            className="absolute inset-x-0 top-1/2 -z-0 mx-auto h-44 w-full max-w-5xl -translate-y-1/2 sm:h-56"
          >
            <defs>
              <linearGradient id="benefitsLoop" x1="0" x2="1">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="100%" stopColor="#93c5fd" />
              </linearGradient>
            </defs>
            <ellipse
              cx="500" cy="160" rx="450" ry="120"
              fill="none" stroke="url(#benefitsLoop)" strokeWidth="22" opacity="0.7"
            />
            <ellipse
              cx="500" cy="160" rx="450" ry="120"
              fill="none" stroke="#e0f2fe" strokeWidth="2"
            />
          </svg>

          <ul className="relative z-10 grid grid-cols-1 gap-y-10 sm:grid-cols-3 md:grid-cols-5">
            {about.benefits.items.map((b, i) => (
              <li
                key={b.n}
                className={`flex flex-col items-center text-center ${
                  // alternate vertical position on md+ to mimic the oval-loop placement
                  i % 2 === 0 ? "md:mt-0" : "md:mt-16"
                }`}
              >
                <div className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-[#1d4ed8] to-[#0b2545] text-lg font-extrabold text-white shadow-lg ring-4 ring-white sm:h-20 sm:w-20 sm:text-xl">
                  {b.n}
                </div>
                <h3 className="mt-4 text-sm font-bold text-[#0b2545] sm:text-base">
                  {b.title}
                </h3>
                <p className="mt-2 max-w-[200px] text-xs leading-relaxed text-slate-600 sm:text-sm">
                  {b.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Portrait avatar (inline SVG, no raster assets) ---------- */

function PortraitAvatar({ hue, initials }: { hue: string; initials: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      className="h-28 w-28 shrink-0 rounded-full shadow-md ring-4 ring-white sm:h-32 sm:w-32"
    >
      <defs>
        <linearGradient id={`portrait-${hue}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={hue} stopOpacity="1" />
          <stop offset="100%" stopColor="#0b2545" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="60" fill={`url(#portrait-${hue})`} />
      <text
        x="60" y="74" textAnchor="middle"
        fontSize="38" fontWeight="700" fill="white"
        fontFamily="sans-serif"
      >
        {initials}
      </text>
    </svg>
  );
}

/* ---------- People list helper ---------- */

type Person = (typeof about.management.people)[number];

function PeopleList({
  title,
  people,
}: {
  title: string;
  people: Person[];
}) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl md:text-4xl">
          {title}
        </h2>
        <div className="mt-10 space-y-8">
          {people.map((p) => (
            <article
              key={p.id}
              className="flex flex-col items-center gap-5 rounded-md border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-start sm:gap-8"
            >
              <PortraitAvatar hue={p.hue} initials={p.initials} />
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold text-[#0b2545] sm:text-2xl">{p.name}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-[#1d4ed8]">
                  {p.role}
                </p>
                <p className="mt-3 text-base leading-relaxed text-slate-700">{p.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Office collages (CSS-only placeholders) ---------- */

type PhotoVariant =
  | "tower"
  | "street"
  | "reception"
  | "workstations"
  | "meeting"
  | "lounge"
  | "tower-tall";

function PhotoTile({
  className = "",
  label,
  variant,
}: {
  className?: string;
  label: string;
  variant: PhotoVariant;
}) {
  // CSS-gradient stand-ins for office photography.
  const bgByVariant: Record<PhotoVariant, string> = {
    tower:        "bg-[linear-gradient(135deg,#1e293b_0%,#334155_45%,#94a3b8_70%,#cbd5e1_100%)]",
    "tower-tall": "bg-[linear-gradient(160deg,#0f172a_0%,#1e3a8a_40%,#60a5fa_75%,#bae6fd_100%)]",
    street:       "bg-[linear-gradient(180deg,#cbd5e1_0%,#94a3b8_40%,#475569_100%)]",
    reception:    "bg-[linear-gradient(135deg,#f1f5f9_0%,#e2e8f0_55%,#0b2545_100%)]",
    workstations: "bg-[linear-gradient(135deg,#fef3c7_0%,#e0f2fe_55%,#bfdbfe_100%)]",
    meeting:      "bg-[linear-gradient(135deg,#0b2545_0%,#1e3a8a_65%,#fbbf24_100%)]",
    lounge:       "bg-[linear-gradient(135deg,#fde68a_0%,#fdba74_50%,#f97316_100%)]",
  };

  const overlay = (() => {
    if (variant === "tower" || variant === "tower-tall") {
      return (
        <div
          aria-hidden
          className="absolute inset-4 opacity-50"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
            backgroundSize: "14px 22px",
          }}
        />
      );
    }
    if (variant === "workstations" || variant === "meeting") {
      return (
        <svg viewBox="0 0 100 60" aria-hidden className="absolute inset-0 h-full w-full opacity-60">
          <g fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="0.6">
            <rect x="10" y="30" width="22" height="10" />
            <rect x="40" y="30" width="22" height="10" />
            <rect x="70" y="30" width="22" height="10" />
            <line x1="0" y1="48" x2="100" y2="48" />
          </g>
        </svg>
      );
    }
    if (variant === "lounge") {
      return (
        <svg viewBox="0 0 100 60" aria-hidden className="absolute inset-0 h-full w-full opacity-70">
          <rect x="55" y="5" width="40" height="36" fill="rgba(255,255,255,0.55)" stroke="rgba(255,255,255,0.85)" strokeWidth="0.6" />
          <line x1="75" y1="5" x2="75" y2="41" stroke="rgba(255,255,255,0.85)" strokeWidth="0.4" />
        </svg>
      );
    }
    return null;
  })();

  return (
    <div
      role="img"
      aria-label={label}
      title={label}
      className={`relative overflow-hidden rounded-md shadow-sm ring-1 ring-black/10 ${bgByVariant[variant]} ${className}`}
    >
      {overlay}
      <span className="absolute bottom-1.5 left-2 text-[10px] font-semibold tracking-wider text-white/90 mix-blend-screen">
        {label}
      </span>
    </div>
  );
}

function OfficeLocations() {
  const [hk, changsha] = about.officeLocations.offices;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl md:text-4xl">
          {about.officeLocations.title}
        </h2>

        {/* Hong Kong — fixed 3-tile composition (1 large + 2 below) */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-[#0b2545] sm:text-2xl">{hk.title}</h3>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <PhotoTile
              variant={hk.photos[0].variant as PhotoVariant}
              label={hk.photos[0].label}
              className="col-span-2 sm:col-span-4 aspect-[16/7]"
            />
            {hk.photos.slice(1).map((p, i) => (
              <PhotoTile
                key={i}
                variant={p.variant as PhotoVariant}
                label={p.label}
                className="col-span-1 sm:col-span-2 aspect-[16/9]"
              />
            ))}
          </div>
          <p className="mt-5 text-sm leading-relaxed text-slate-700 sm:text-base">
            <span className="font-semibold text-[#0b2545]">{about.officeLocations.addressLabel}</span>{" "}
            {hk.address}
          </p>
        </div>

        {/* Changsha — large vertical tower + 4 squares; plus 2 extra thumbnails */}
        <div className="mt-16">
          <h3 className="text-xl font-bold text-[#0b2545] sm:text-2xl">{changsha.title}</h3>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            <PhotoTile
              variant={changsha.photos[0].variant as PhotoVariant}
              label={changsha.photos[0].label}
              className="col-span-2 row-span-2 aspect-[3/4] sm:col-span-2"
            />
            {changsha.photos.slice(1).map((p, i) => (
              <PhotoTile
                key={i}
                variant={p.variant as PhotoVariant}
                label={p.label}
                className="aspect-[4/3]"
              />
            ))}
          </div>
          {changsha.extraPhotos && (
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
              {changsha.extraPhotos.map((p, i) => (
                <PhotoTile
                  key={i}
                  variant={p.variant as PhotoVariant}
                  label={p.label}
                  className="aspect-[4/3]"
                />
              ))}
            </div>
          )}
          <p className="mt-5 text-sm leading-relaxed text-slate-700 sm:text-base">
            <span className="font-semibold text-[#0b2545]">{about.officeLocations.addressLabel}</span>{" "}
            {changsha.address}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroBanner />
      <CompanyProfile />
      <OpenAccess />
      <BenefitsInfographic />
      <PeopleList title={about.management.title} people={about.management.people} />
      <PeopleList title={about.advisory.title}   people={about.advisory.people}   />
      <OfficeLocations />
    </main>
  );
}
