import type { Metadata } from "next";
import Link from "next/link";
import about from "@/data/about.json";

export const metadata: Metadata = {
  title: "About NSP",
  description:
    "About NSP — company profile and background of Hong Kong Natural Science Press.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About NSP",
    description:
      "About NSP — company profile and background of Hong Kong Natural Science Press.",
    url: "/about",
    type: "website",
  },
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

/* ---------- Contact information ---------- */

function ContactInfo() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl md:text-4xl">
          {about.contact.title}
        </h2>
        {about.contact.intro && (
          <p className="mt-4 text-center text-base leading-relaxed text-slate-600 sm:text-[17px]">
            {about.contact.intro}
          </p>
        )}
        <ul className="mt-10 grid gap-4 sm:grid-cols-3">
          {about.contact.items.map((item) => {
            const href = "href" in item ? item.href : undefined;
            return (
              <li
                key={item.label}
                className="rounded-md border border-slate-200 bg-white p-5 text-center shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1d4ed8]">
                  {item.label}
                </p>
                <div className="mt-2 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {href ? (
                    <a
                      href={href}
                      className="break-words font-medium text-[#0b2545] hover:text-[#1d4ed8] hover:underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="break-words">{item.value}</span>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
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
      <ContactInfo />
    </main>
  );
}
