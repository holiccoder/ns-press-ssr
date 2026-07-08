import AboutJournal from "./AboutJournal";
import ArticleListSection from "./ArticleListSection";
import type { JournalContentSummary } from "@/lib/api";
import type { JournalTabKey } from "./JournalNavTabs";
import type {
  EnrichedArticle,
} from "@/lib/journal-slugs";

export default function JournalMainColumn({
  scope,
  latestArticles,
  topDownloaded,
  apiArticles,
  journalId,
  activeTab,
  policy,
}: {
  scope: string;
  latestArticles?: EnrichedArticle[];
  topDownloaded?: EnrichedArticle[];
  apiArticles?: JournalContentSummary[];
  journalId: number;
  activeTab: JournalTabKey;
  policy?: string;
}) {
  const renderHome = activeTab === "home";
  const renderArticles = activeTab === "articles";
  const renderAbout = activeTab === "about";
  const renderPublish = activeTab === "publish";

  return (
    <div className="space-y-10">
      {renderHome && (
        <>
          <AboutJournal scope={scope} />
          <ArticleListSection
            title="Top Downloaded"
            articles={topDownloaded}
            journalId={journalId}
          />
        </>
      )}

      {renderArticles && (
        <ArticleListSection
          title="Latest Articles"
          articles={latestArticles}
          apiArticles={apiArticles}
          journalId={journalId}
        />
      )}

      {renderAbout && (
        <AboutJournal scope={scope} />
      )}

      {renderPublish && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#0b2545]">Publish</h2>
          {policy ? (
            <div
              className="prose prose-sm max-w-none text-slate-700 prose-strong:text-slate-900 sm:prose-base"
              dangerouslySetInnerHTML={{ __html: policy }}
            />
          ) : (
            <p className="text-sm text-slate-600 sm:text-base">
              Publishing information is currently unavailable.
            </p>
          )}
        </section>
      )}
    </div>
  );
}
