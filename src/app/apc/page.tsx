import type { Metadata } from "next";
import Link from "next/link";
import apcData from "@/data/author-services.json";

const { apc } = apcData;

export const metadata: Metadata = {
  title: "Article Processing Charge",
  description:
    "Article Processing Charge (APC) information for NSP open access journals.",
  alternates: { canonical: "/apc" },
  openGraph: {
    title: "Article Processing Charge",
    description: "APC information for NSP open access journals.",
    url: "/apc",
    type: "website",
  },
};

function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0b2545] via-[#0f1f4d] to-[#020617] text-white">
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          {apc.hero.title}
        </h1>
        <nav aria-label="Breadcrumb" className="mt-6 text-xs text-white/80 sm:text-sm">
          <ol className="flex items-center justify-center gap-2">
            {apc.hero.breadcrumb.map((crumb, i) => {
              const isLast = i === apc.hero.breadcrumb.length - 1;
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

export default function APCPage() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroBanner />
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="text-center text-lg leading-relaxed text-slate-700">
            {apc.description}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {apc.details.map((item, i) => (
              <article
                key={i}
                className="rounded-xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <h2 className="text-lg font-bold text-[#0b2545]">{item.title}</h2>
                <p className="mt-3 text-slate-700">{item.content}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
