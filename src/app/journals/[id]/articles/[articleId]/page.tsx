import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveArticle } from "@/lib/article-detail";
import ArticleHeader from "@/components/journal-detail/ArticleHeader";
import AuthorBlock from "@/components/journal-detail/AuthorBlock";
import ArticleMetadata from "@/components/journal-detail/ArticleMetadata";
import PdfPreviewCard from "@/components/journal-detail/PdfPreviewCard";
import ArticleSidebar from "@/components/journal-detail/ArticleSidebar";

type RouteParams = { id: string; articleId: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { articleId } = await params;

  try {
    const { article } = await resolveArticle(articleId);
    return {
      title: `${article.title} — NS Press`,
      description: article.abstract?.slice(0, 200),
    };
  } catch {
    return { title: "Article — NS Press" };
  }
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { articleId } = await params;

  let article;
  let volumeHref;
  try {
    const resolved = await resolveArticle(articleId);
    article = resolved.article;
    volumeHref = resolved.volumeHref;
  } catch {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col bg-white py-12 sm:py-16">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">
          <article className="space-y-8">
            <ArticleHeader
              journalSlug={article.journalSlug}
              journalTitle={article.journalTitle}
              volumeHref={volumeHref}
              volumeLabel={article.volumeLabel}
              articleType={article.articleType}
              openAccess={article.openAccess}
              title={article.title}
              pdfUrl={article.pdfUrl}
            />

            <AuthorBlock authors={article.authors} />

            <ArticleMetadata
              volumeHref={volumeHref}
              volumeLabel={article.volumeLabel}
              citation={article.citation}
              doi={article.doi}
              copyright={article.copyright}
              specialIssue={article.specialIssue}
            />

            {article.abstract && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#0b2545]">
                  Abstract
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                  {article.abstract}
                </p>
              </section>
            )}

            {article.keywords.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#0b2545]">
                  Keywords
                </h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {article.keywords.map((k, i) => (
                    <li
                      key={`${k}-${i}`}
                      className="rounded-sm border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-700"
                    >
                      {k}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <PdfPreviewCard pdfUrl={article.pdfUrl} />

            {article.references && article.references.length > 0 && (
              <section>
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#0b2545]">
                  References
                </h2>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                  {article.references.map((ref, i) => (
                    <li key={i}>{ref}</li>
                  ))}
                </ol>
              </section>
            )}
          </article>

          <ArticleSidebar
            metrics={article.metrics}
            dates={article.dates}
            recommendedArticles={article.recommendedArticles}
          />
        </div>
      </div>
    </main>
  );
}
