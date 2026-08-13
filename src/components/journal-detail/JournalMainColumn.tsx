import AboutJournal from "./AboutJournal";
import ArticleListSection from "./ArticleListSection";
import Pagination from "./Pagination";
import journalApc from "@/data/journal-apc.json";
import type { JournalContentSummary } from "@/lib/api";
import type { JournalTabKey } from "./JournalNavTabs";
import type { IssueSelection } from "./IssueFilter";
import type {
  EditorialBoardMember,
  EditorInChief,
  EnrichedArticle,
} from "@/lib/journal-slugs";

function EditorialBoardSection({
  chiefEditors,
  boardMembers,
}: {
  chiefEditors?: EditorInChief[];
  boardMembers?: EditorialBoardMember[];
}) {
  const hasChiefEditors = Boolean(chiefEditors?.length);
  const hasBoardMembers = Boolean(boardMembers?.length);
  if (!hasChiefEditors && !hasBoardMembers) return null;

  return (
    <section className="space-y-8">
      <h2 className="text-lg font-bold text-[#0b2545]">Editorial Board</h2>

      {hasChiefEditors && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {chiefEditors!.length > 1 ? "Chief Editors" : "Chief Editor"}
          </h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {chiefEditors!.map((chief) => (
              <li key={`${chief.name}-${chief.role}`} className="text-sm">
                <p className="font-semibold text-[#0b2545]">{chief.name}</p>
                <p className="text-slate-500">{chief.role}</p>
                {chief.affiliation && (
                  <p className="text-slate-500">{chief.affiliation}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {hasBoardMembers && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Editorial Board Members
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {boardMembers!.map((member) => (
              <li
                key={`${member.name}-${member.affiliation}`}
                className="text-sm text-slate-700"
              >
                <p className="font-medium text-[#0b2545]">{member.name}</p>
                {member.role && <p className="text-slate-500">{member.role}</p>}
                {member.affiliation && (
                  <p className="text-slate-500">{member.affiliation}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

function ApcSection() {
  return (
    <section className="space-y-8">
      <div>
        <h2 className="border-b border-slate-100 pb-2 text-lg font-bold text-[#0b2545]">
          {journalApc.title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-700 sm:text-base">
          {journalApc.description}
        </p>
      </div>

      <div className="rounded-sm border border-slate-200 bg-slate-50 p-6 shadow-sm">
        <h3 className="text-base font-bold text-[#0b2545]">
          Payment channels
        </h3>
        <div className="mt-4 flex flex-wrap gap-4">
          {journalApc.payments.map((payment) => (
            <a
              key={payment.id}
              href={payment.href}
              className="inline-flex items-center gap-2 rounded-sm bg-[#0b2545] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1e3a8a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
            >
              {payment.label}
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {journalApc.payments.map((payment) => (
          <section
            key={payment.id}
            id={payment.id}
            className="scroll-mt-6 rounded-sm border border-slate-200 bg-white p-5"
          >
            <h3 className="text-sm font-bold uppercase tracking-wide text-[#0b2545]">
              {payment.currency} payment instructions
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {payment.instructions}
            </p>
          </section>
        ))}
      </div>
    </section>
  );
}

export default function JournalMainColumn({
  scope,
  latestArticles,
  topDownloaded,
  homeArticles,
  homeArticlesTitle = "Latest Articles",
  apiArticles,
  journalId,
  activeTab,
  policy,
  authorNotice,
  chiefEditors,
  boardMembers,
  lang = "English",
  issueSelection,
  articlesCount = 0,
  articlesPage = 1,
  articlesPageSize = 10,
}: {
  scope: string;
  latestArticles?: EnrichedArticle[];
  topDownloaded?: EnrichedArticle[];
  homeArticles?: JournalContentSummary[];
  homeArticlesTitle?: string;
  apiArticles?: JournalContentSummary[];
  journalId: number;
  activeTab: JournalTabKey;
  policy?: string;
  authorNotice?: string;
  chiefEditors?: EditorInChief[];
  boardMembers?: EditorialBoardMember[];
  lang?: string;
  issueSelection?: IssueSelection;
  articlesCount?: number;
  articlesPage?: number;
  articlesPageSize?: number;
}) {
  const renderHome = activeTab === "home";
  const renderArticles = activeTab === "articles";
  const renderAbout = activeTab === "about";
  const renderPublish = activeTab === "publish";
  const renderEditorial = activeTab === "editorial";
  const isZh = lang === "中文";

  const articlesFilterLabel = issueSelection?.year
    ? issueSelection.periods != null
      ? `${issueSelection.year} · Issue ${issueSelection.periods}`
      : String(issueSelection.year)
    : "All Articles";

  const articlesTotalPages = Math.max(
    1,
    Math.ceil(articlesCount / articlesPageSize),
  );
  const hasHomeArticles = Boolean(
    topDownloaded?.length || latestArticles?.length || homeArticles?.length,
  );

  return (
    <div className="space-y-10">
      {renderHome && (
        <>
          <AboutJournal scope={scope} journalId={journalId} />
          {hasHomeArticles && (
            <ArticleListSection
              title={topDownloaded?.length ? "Top Downloaded" : homeArticlesTitle}
              articles={topDownloaded ?? latestArticles}
              apiArticles={homeArticles}
              journalId={journalId}
            />
          )}
        </>
      )}

      {renderArticles && (
        <ArticleListSection
          title={isZh ? "Articles" : "Articles"}
          articles={latestArticles}
          apiArticles={apiArticles}
          journalId={journalId}
          filterLabel={articlesFilterLabel}
          emptyMessage={
            isZh ? "No articles found for this issue." : "No articles found for this issue."
          }
          pagination={
            <Pagination
              base={`/journals/${journalId}`}
              params={{
                tab: "articles",
                year: issueSelection?.year,
                periods: issueSelection?.periods,
              }}
              currentPage={articlesPage}
              totalPages={articlesTotalPages}
            />
          }
        />
      )}

      {renderAbout && (
        <AboutJournal
          full
          scope={scope}
          journalId={journalId}
          policy={policy}
          authorNotice={authorNotice}
        />
      )}

      {renderPublish && <ApcSection />}

      {renderEditorial && (
        <EditorialBoardSection
          chiefEditors={chiefEditors}
          boardMembers={boardMembers}
        />
      )}
    </div>
  );
}
