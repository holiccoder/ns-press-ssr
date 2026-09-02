import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveArticle } from "@/lib/article-detail";
import { getScholarArticleMetadata } from "@/lib/scholar-metadata";
import { resolveJournalCover } from "@/lib/images";
import { getServerApiLang } from "@/lib/lang.server";
import ArticleHeader from "@/components/journal-detail/ArticleHeader";
import AuthorBlock from "@/components/journal-detail/AuthorBlock";
import ArticleMetadata from "@/components/journal-detail/ArticleMetadata";
import PdfPreviewCard from "@/components/journal-detail/PdfPreviewCard";
import ArticleSidebar from "@/components/journal-detail/ArticleSidebar";

type RouteParams = { articleId: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { articleId } = await params;
  const canonical = `/articles/${articleId}`;

  try {
    const lang = await getServerApiLang();
    const { article } = await resolveArticle(articleId, lang);
    const description = article.abstract?.slice(0, 200);
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ns-press.com";
    return {
      title: article.title,
      description,
      alternates: { canonical },
      other: getScholarArticleMetadata(article, siteUrl),
      openGraph: {
        title: article.title,
        description,
        url: canonical,
        type: "article",
        authors: article.authors.map((a) => a.name),
        publishedTime: article.dates?.published || undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description,
      },
    };
  } catch {
    return { title: "Article", alternates: { canonical } };
  }
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { articleId } = await params;
  const lang = await getServerApiLang();
  const articleHref = `/articles/${articleId}`;

  let article;
  let volumeHref;
  try {
    const resolved = await resolveArticle(articleId, lang);
    article = resolved.article;
    volumeHref = resolved.volumeHref;
  } catch {
    notFound();
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ns-press.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: article.title,
    name: article.title,
    abstract: article.abstract || undefined,
    keywords: article.keywords.length ? article.keywords.join(", ") : undefined,
    inLanguage: "en",
    url: `${siteUrl}${articleHref}`,
    datePublished: article.dates?.published || undefined,
    author: article.authors.map((a) => ({
      "@type": "Person",
      name: a.name,
      affiliation: a.affiliation
        ? { "@type": "Organization", name: a.affiliation }
        : undefined,
    })),
    isPartOf: article.journalTitle
      ? {
          "@type": "Periodical",
          name: article.journalTitle,
          url: `${siteUrl}${volumeHref}`,
        }
      : undefined,
    identifier: article.doi
      ? { "@type": "PropertyValue", propertyID: "DOI", value: article.doi }
      : undefined,
    publisher: {
      "@type": "Organization",
      name: "Hong Kong Natural Science Press Limited",
      url: siteUrl,
    },
  };

  return (
    <main className="flex flex-1 flex-col bg-white py-12 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
              articleHref={articleHref}
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
                <ul className="mt-3 list-none space-y-2 text-sm leading-relaxed text-slate-700">
                  {article.references.map((ref, i) => (
                    <li key={i}>{ref}</li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          <ArticleSidebar
            dates={article.dates}
            recommendedArticles={article.recommendedArticles}
            journalCoverImage={resolveJournalCover(Number(article.journalSlug), "")}
            journalTitle={article.journalTitle}
          />
        </div>
      </div>
    </main>
  );
}
