import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getArticleDetail, ApiError } from "@/lib/api";
import { resolveNewsImage } from "@/lib/images";

type RouteParams = { id: string };

function formatDate(isoLike: string): string {
  const date = new Date(isoLike.replace(/-/g, "/"));
  if (Number.isNaN(date.getTime())) return isoLike;
  const d = date.getDate().toString().padStart(2, "0");
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const y = date.getFullYear();
  return `${d} ${m} ${y}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId) || numericId <= 0) {
    return { title: "News — NS Press" };
  }

  try {
    const article = await getArticleDetail(numericId);
    return {
      title: `${article.title} — NS Press`,
      description: article.desc?.slice(0, 200),
    };
  } catch {
    return { title: "News — NS Press" };
  }
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId) || numericId <= 0) notFound();

  let article;
  try {
    article = await getArticleDetail(numericId);
  } catch (err) {
    if (err instanceof ApiError) notFound();
    throw err;
  }

  return (
    <main className="flex flex-1 flex-col bg-white py-12 sm:py-16">
      <div className="mx-auto w-full max-w-4xl px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link
                href="/"
                className="hover:text-[#0b2545] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
              >
                Home
              </Link>
            </li>
            <li aria-hidden className="text-slate-400">
              &gt;
            </li>
            <li>
              <Link
                href="/"
                className="hover:text-[#0b2545] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
              >
                News
              </Link>
            </li>
            <li aria-hidden className="text-slate-400">
              &gt;
            </li>
            <li className="font-medium text-slate-700 line-clamp-1">
              {article.title}
            </li>
          </ol>
        </nav>

        {/* Header */}
        <header className="mt-8">
          <h1 className="text-2xl font-bold leading-tight text-[#0b2545] sm:text-3xl md:text-4xl">
            {article.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
            <span>Published: {formatDate(article.create_time)}</span>
            {article.author && (
              <span>Author: {article.author}</span>
            )}
          </div>
        </header>

        {/* Featured image */}
        {article.image && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-lg bg-slate-100">
            <Image
              src={resolveNewsImage(article.id, article.image)}
              alt={article.title}
              fill
              sizes="(min-width: 1024px) 896px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Content */}
        <article className="prose prose-slate mt-8 max-w-none prose-headings:text-[#0b2545] prose-a:text-[#1d4ed8] prose-img:rounded-lg">
          {article.content ? (
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          ) : (
            <p className="text-slate-600">{article.desc}</p>
          )}
        </article>

        {/* Footer actions */}
        <div className="mt-10 flex items-center justify-between border-t border-slate-200 pt-6">
          <Link
            href="/"
            className="text-sm font-medium text-[#1d4ed8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
          >
            &larr; Back to News
          </Link>
        </div>
      </div>
    </main>
  );
}
