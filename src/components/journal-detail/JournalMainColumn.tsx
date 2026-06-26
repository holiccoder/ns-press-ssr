import AboutJournal from "./AboutJournal";
import ArticleListSection from "./ArticleListSection";
import type { JournalContentSummary } from "@/lib/api";
import type {
  EnrichedArticle,
} from "@/lib/journal-slugs";

export default function JournalMainColumn({
  scope,
  latestArticles,
  topDownloaded,
  apiArticles,
  journalId,
}: {
  scope: string;
  latestArticles?: EnrichedArticle[];
  topDownloaded?: EnrichedArticle[];
  apiArticles?: JournalContentSummary[];
  journalId: number;
}) {
  return (
    <div className="space-y-10">
      <AboutJournal scope={scope} />

      <ArticleListSection
        title="Latest Articles"
        articles={latestArticles}
        apiArticles={apiArticles}
        journalId={journalId}
      />

      <ArticleListSection
        title="Top Downloaded"
        articles={topDownloaded}
        journalId={journalId}
      />
    </div>
  );
}
