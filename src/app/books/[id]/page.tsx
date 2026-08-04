import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBookDetail, ApiError } from "@/lib/api";
import { resolveBookCover } from "@/lib/images";
import { getServerUiLang, getServerApiLang } from "@/lib/lang.server";

type RouteParams = { id: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { id } = await params;
  const canonical = `/books/${id}`;
  const numericId = Number(id);
  if (!Number.isFinite(numericId) || numericId <= 0) {
    return { title: "Book Detail", alternates: { canonical } };
  }

  try {
    const apiLang = await getServerApiLang();
    const book = await getBookDetail(numericId, apiLang);
    const description = book.introduction?.slice(0, 200);
    const coverImage = resolveBookCover(book.id, book.cover_image);

    return {
      title: book.title,
      description,
      alternates: { canonical },
      openGraph: {
        title: book.title,
        description,
        url: canonical,
        type: "book",
        images: coverImage ? [coverImage] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: book.title,
        description,
        images: coverImage ? [coverImage] : undefined,
      },
    };
  } catch {
    return { title: "Book Detail", alternates: { canonical } };
  }
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId) || numericId <= 0) notFound();

  const uiLang = await getServerUiLang();
  const apiLang = await getServerApiLang();

  let book;
  try {
    book = await getBookDetail(numericId, apiLang);
  } catch (err) {
    if (err instanceof ApiError) notFound();
    throw err;
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ns-press.com";
  const coverImage = resolveBookCover(book.id, book.cover_image);

  // Schema.org structured data (JSON-LD) for the book
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    isbn: book.ISSN || undefined,
    inLanguage: book.lang || (uiLang === "zh" ? "zh-CN" : "en-US"),
    author: book.author
      ? book.author.split(/[,，;；]/).map((authorName) => ({
          "@type": "Person",
          name: authorName.trim(),
        }))
      : undefined,
    description: book.introduction || undefined,
    url: `${siteUrl}/books/${id}`,
    image: coverImage ? [coverImage] : undefined,
    publisher: {
      "@type": "Organization",
      name: "Hong Kong Natural Science Press Limited",
      url: siteUrl,
    },
  };

  const isZh = uiLang === "zh";

  return (
    <main className="flex flex-1 flex-col bg-slate-50">
      {/* Schema.org Integration */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header Spacer */}
      <div className="h-16 bg-[#0b2545]" />

      {/* Hero Header section */}
      <section className="bg-[#0b2545] py-12 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-300">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white hover:underline">
                  {isZh ? "首页" : "Home"}
                </Link>
              </li>
              <span aria-hidden className="text-slate-500">
                &gt;
              </span>
              <li>
                <Link href="/books" className="hover:text-white hover:underline">
                  {isZh ? "图书" : "Books"}
                </Link>
              </li>
              <span aria-hidden className="text-slate-500">
                &gt;
              </span>
              <li>
                <span className="font-medium text-white truncate max-w-[200px] sm:max-w-[400px] inline-block align-bottom">
                  {book.title}
                </span>
              </li>
            </ol>
          </nav>
          <h1 className="mt-6 text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl text-white">
            {book.title}
          </h1>
        </div>
      </section>

      {/* Book Metadata & Intro Panel */}
      <section className="bg-white py-12 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-10 md:flex-row md:items-start">
            {/* Left Cover aspect */}
            <div className="mx-auto w-[200px] flex-shrink-0 md:mx-0 sm:w-[240px]">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-lg ring-1 ring-black/10">
                <Image
                  src={coverImage}
                  alt={book.title}
                  fill
                  priority
                  sizes="(min-width: 768px) 240px, 200px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Information detail */}
            <div className="flex-1 space-y-6">
              <h2 className="text-xl font-bold text-[#0b2545] border-b border-slate-100 pb-3 sm:text-2xl">
                {isZh ? "基本信息" : "Book Details"}
              </h2>

              <dl className="grid grid-cols-1 gap-y-3 text-sm text-slate-600 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-slate-50 pb-2">
                  <dt className="w-24 font-semibold text-slate-700">{isZh ? "ISBN / ISSN:" : "ISBN / ISSN:"}</dt>
                  <dd className="mt-1 sm:mt-0 text-slate-900 font-medium">{book.ISSN || "-"}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-slate-50 pb-2">
                  <dt className="w-24 font-semibold text-slate-700">{isZh ? "语言:" : "Language:"}</dt>
                  <dd className="mt-1 sm:mt-0 text-slate-900 font-medium">{book.lang || "-"}</dd>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline border-b border-slate-50 pb-2 sm:col-span-2">
                  <dt className="w-24 font-semibold text-slate-700">{isZh ? "作者 / 编著:" : "Authors:"}</dt>
                  <dd className="mt-1 sm:mt-0 text-slate-900 font-medium">{book.author || "-"}</dd>
                </div>
              </dl>

              {book.content && (
                <div className="pt-4">
                  <a
                    href={book.content}
                    download={`${book.title}.pdf`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm bg-[#006837] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#00522b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#006837]"
                  >
                    <svg
                      className="-ml-0.5 h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                      />
                    </svg>
                    {isZh ? "PDF 全文下载" : "Download Full PDF"}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Anchor Navigation */}
      <nav aria-label="Book sections" className="sticky top-0 z-20 w-full border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6">
          <ul className="flex items-center gap-6">
            <li>
              <a
                href="#description"
                className="inline-block border-b-2 border-transparent py-4 text-sm font-semibold text-slate-600 transition-colors hover:border-[#0b2545] hover:text-[#0b2545] focus:outline-none"
              >
                {isZh ? "图书简介" : "Book Description"}
              </a>
            </li>
            <li>
              <a
                href="#catalogue"
                className="inline-block border-b-2 border-transparent py-4 text-sm font-semibold text-slate-600 transition-colors hover:border-[#0b2545] hover:text-[#0b2545] focus:outline-none"
              >
                {isZh ? "目录" : "Table of Contents"}
              </a>
            </li>
            <li>
              <a
                href="#author_info"
                className="inline-block border-b-2 border-transparent py-4 text-sm font-semibold text-slate-600 transition-colors hover:border-[#0b2545] hover:text-[#0b2545] focus:outline-none"
              >
                {isZh ? "作者信息" : "Author Information"}
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Detail Sections */}
      <section className="mx-auto w-full max-w-7xl px-6 py-12 space-y-12">
        {/* Book Description */}
        <div id="description" className="scroll-mt-24 rounded-sm border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-bold text-[#0b2545] border-b border-slate-100 pb-3 mb-4">
            {isZh ? "图书简介" : "Book Description"}
          </h3>
          <div className="text-sm leading-relaxed text-slate-700 whitespace-pre-wrap sm:text-base">
            {book.introduction || (isZh ? "暂无简介" : "No description available.")}
          </div>
        </div>

        {/* Table of Contents */}
        <div id="catalogue" className="scroll-mt-24 rounded-sm border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-bold text-[#0b2545] border-b border-slate-100 pb-3 mb-4">
            {isZh ? "目录" : "Table of Contents"}
          </h3>
          {book.catalogue ? (
            <div
              className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700"
              dangerouslySetInnerHTML={{ __html: book.catalogue }}
            />
          ) : (
            <div className="text-sm text-slate-400">
              {isZh ? "暂无目录" : "No table of contents available."}
            </div>
          )}
        </div>

        {/* Author Information */}
        <div id="author_info" className="scroll-mt-24 rounded-sm border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h3 className="text-lg font-bold text-[#0b2545] border-b border-slate-100 pb-3 mb-4">
            {isZh ? "作者信息" : "Author Information"}
          </h3>
          {book.author_info ? (
            <div
              className="prose prose-slate max-w-none text-sm leading-relaxed text-slate-700"
              dangerouslySetInnerHTML={{ __html: book.author_info }}
            />
          ) : (
            <div className="text-sm text-slate-400">
              {isZh ? "暂无作者信息" : "No author information available."}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
