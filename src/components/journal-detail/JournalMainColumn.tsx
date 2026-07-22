import AboutJournal from "./AboutJournal";
import ArticleListSection from "./ArticleListSection";
import type { JournalContentSummary } from "@/lib/api";
import type { JournalTabKey } from "./JournalNavTabs";
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
  return (
    <section className="space-y-8">
      <h2 className="text-lg font-bold text-[#0b2545]">Editorial Board</h2>

      {chiefEditors && chiefEditors.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {chiefEditors.length > 1 ? "Chief Editors" : "Chief Editor"}
          </h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            {chiefEditors.map((chief) => (
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

      {boardMembers && boardMembers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Editorial Board Members
          </h3>
          <ul className="grid gap-3 sm:grid-cols-2">
            {boardMembers.map((member) => (
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

export default function JournalMainColumn({
  scope,
  latestArticles,
  topDownloaded,
  apiArticles,
  journalId,
  activeTab,
  policy,
  chiefEditors,
  boardMembers,
}: {
  scope: string;
  latestArticles?: EnrichedArticle[];
  topDownloaded?: EnrichedArticle[];
  apiArticles?: JournalContentSummary[];
  journalId: number;
  activeTab: JournalTabKey;
  policy?: string;
  chiefEditors?: EditorInChief[];
  boardMembers?: EditorialBoardMember[];
}) {
  const renderHome = activeTab === "home";
  const renderArticles = activeTab === "articles";
  const renderAbout = activeTab === "about";
  const renderPublish = activeTab === "publish";
  const renderEditorial = activeTab === "editorial";

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

      {renderAbout && <AboutJournal scope={scope} />}

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

      {renderEditorial && (
        <EditorialBoardSection
          chiefEditors={chiefEditors}
          boardMembers={boardMembers}
        />
      )}
    </div>
  );
}
