import type { Metadata } from "next";
import Link from "next/link";
import contributionData from "@/data/author-services.json";

const { authorContribution } = contributionData;

export const metadata: Metadata = {
  title: "Author Contribution Statement",
  description:
    "Author contribution statement guidelines for NSP submissions.",
  alternates: { canonical: "/author-contribution" },
  openGraph: {
    title: "Author Contribution Statement",
    description: "Author contribution statement guidelines for NSP submissions.",
    url: "/author-contribution",
    type: "website",
  },
};

function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0b2545] via-[#0f1f4d] to-[#020617] text-white">
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          {authorContribution.hero.title}
        </h1>
        <nav aria-label="Breadcrumb" className="mt-6 text-xs text-white/80 sm:text-sm">
          <ol className="flex items-center justify-center gap-2">
            {authorContribution.hero.breadcrumb.map((crumb, i) => {
              const isLast = i === authorContribution.hero.breadcrumb.length - 1;
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

export default function AuthorContributionPage() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroBanner />
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          {/* Form fields */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="w-40 shrink-0 text-sm font-semibold text-slate-700">
                {authorContribution.form.manuscriptTitle}
              </label>
              <div className="h-10 flex-1 rounded border border-slate-300 bg-slate-50" />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="w-40 shrink-0 text-sm font-semibold text-slate-700">
                {authorContribution.form.authorName}
              </label>
              <div className="h-10 flex-1 rounded border border-slate-300 bg-slate-50" />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="w-40 shrink-0 text-sm font-semibold text-slate-700">
                {authorContribution.form.submittedJournal}
              </label>
              <div className="h-10 flex-1 rounded border border-slate-300 bg-slate-50" />
            </div>
          </div>

          {/* Guidelines */}
          <div className="mt-10 text-slate-700">
            <p>{authorContribution.guidelines}</p>
          </div>

          {/* Obligations */}
          <div className="mt-10">
            <h2 className="text-lg font-bold text-[#0b2545]">{authorContribution.obligations.title}</h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-slate-700">
              {authorContribution.obligations.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>

          {/* Clarification & confirmation */}
          <div className="mt-10 space-y-4 text-slate-700">
            <p>{authorContribution.clarification}</p>
            <p>{authorContribution.confirmation}</p>
          </div>

          {/* Contribution statements */}
          <div className="mt-12">
            <h2 className="text-lg font-bold text-[#0b2545]">{authorContribution.contributionTitle}</h2>
            <div className="mt-4 space-y-3">
              {Array.from({ length: authorContribution.contributionRows }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-slate-700">{i + 1}.</span>
                  <div className="h-10 flex-1 rounded border border-slate-300 bg-slate-50" />
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-slate-500">{authorContribution.note}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
