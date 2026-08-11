import type { Metadata } from "next";
import Link from "next/link";
import { NewsArchiveList } from "@/components/News";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news from Hong Kong Natural Science Press.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  return (
    <main className="flex flex-1 flex-col bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-6">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <Link href="/" className="hover:text-[#0b2545] hover:underline">
            Home
          </Link>
          <span aria-hidden className="px-2">&gt;</span>
          <span className="font-medium text-slate-700">News</span>
        </nav>
        <header className="mt-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#0b2545] sm:text-4xl">
            News
          </h1>
        </header>
        <div className="mt-8">
          <NewsArchiveList />
        </div>
      </div>
    </main>
  );
}
