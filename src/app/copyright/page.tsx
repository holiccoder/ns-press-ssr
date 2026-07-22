import type { Metadata } from "next";
import Link from "next/link";
import copyrightData from "@/data/author-services.json";

const { copyright } = copyrightData;

export const metadata: Metadata = {
  title: "Copyright Transfer Agreement",
  description:
    "Copyright transfer agreement for authors publishing with NSP.",
  alternates: { canonical: "/copyright" },
  openGraph: {
    title: "Copyright Transfer Agreement",
    description: "Copyright transfer agreement for NSP authors.",
    url: "/copyright",
    type: "website",
  },
};

function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0b2545] via-[#0f1f4d] to-[#020617] text-white">
      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          {copyright.hero.title}
        </h1>
        <nav aria-label="Breadcrumb" className="mt-6 text-xs text-white/80 sm:text-sm">
          <ol className="flex items-center justify-center gap-2">
            {copyright.hero.breadcrumb.map((crumb, i) => {
              const isLast = i === copyright.hero.breadcrumb.length - 1;
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

export default function CopyrightPage() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroBanner />
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-6">
          {/* Form fields */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="w-40 shrink-0 text-sm font-semibold text-slate-700">
                {copyright.form.manuscriptTitle}
              </label>
              <div className="h-10 flex-1 rounded border border-slate-300 bg-slate-50" />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="w-40 shrink-0 text-sm font-semibold text-slate-700">
                {copyright.form.authorName}
              </label>
              <div className="h-10 flex-1 rounded border border-slate-300 bg-slate-50" />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <label className="w-40 shrink-0 text-sm font-semibold text-slate-700">
                {copyright.form.submittedJournal}
              </label>
              <div className="h-10 flex-1 rounded border border-slate-300 bg-slate-50" />
            </div>
          </div>

          {/* Introduction */}
          <div className="mt-10 text-slate-700">
            <p>{copyright.introduction}</p>
          </div>

          {/* Terms */}
          <ol className="mt-8 list-decimal space-y-4 pl-5 text-slate-700">
            {copyright.terms.map((term, i) => (
              <li key={i}>
                <strong className="text-[#0b2545]">{term.title}</strong>: {term.content}
              </li>
            ))}
          </ol>

          {/* Signature table */}
          <div className="mt-12">
            <p className="font-semibold text-[#0b2545]">{copyright.signature.title}</p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full border-collapse border border-slate-300 text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    {copyright.signature.headers.map((header, i) => (
                      <th key={i} className="border border-slate-300 px-3 py-2 text-left font-semibold text-slate-700">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: copyright.signature.rows }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                      {copyright.signature.headers.map((_, colIndex) => (
                        <td key={colIndex} className="border border-slate-300 px-3 py-4"></td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-2 text-xs text-slate-500">{copyright.signature.note}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
