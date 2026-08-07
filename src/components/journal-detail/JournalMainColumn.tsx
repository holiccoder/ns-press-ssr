import AboutJournal from "./AboutJournal";
import ArticleListSection from "./ArticleListSection";
import Pagination from "./Pagination";
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
  lang = "English",
  issueSelection,
  articlesCount = 0,
  articlesPage = 1,
  articlesPageSize = 10,
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
  lang?: "中文" | "English";
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
          title={isZh ? "文章" : "Articles"}
          articles={latestArticles}
          apiArticles={apiArticles}
          journalId={journalId}
          filterLabel={articlesFilterLabel}
          emptyMessage={
            isZh ? "暂无文章。" : "No articles found for this issue."
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

      {renderAbout && <AboutJournal scope={scope} />}

      {renderPublish && (
        <section className="space-y-8">
          <div>
            <h2 className="text-lg font-bold text-[#0b2545] border-b border-slate-100 pb-2 mb-4">
              {isZh ? "出版政策" : "Publishing Policy"}
            </h2>
            {policy ? (
              <div
                className="prose prose-sm max-w-none text-slate-700 prose-strong:text-slate-900 sm:prose-base"
                dangerouslySetInnerHTML={{ __html: policy }}
              />
            ) : (
              <p className="text-sm text-slate-600 sm:text-base">
                {isZh
                  ? "该期刊暂无特定出版政策说明。"
                  : "Publishing policy is currently unavailable for this journal."}
              </p>
            )}
          </div>

          {/* Dynamic Article Processing Charge & Payments */}
          <div className="rounded-sm border border-slate-200 bg-slate-50 p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-base font-bold text-[#0b2545]">
                {isZh ? "文章处理费说明 (APC & Payments)" : "Article Processing Charge (APC) & Payments"}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">
                {isZh
                  ? "香港自然科学出版社倡导知识共享，采用开放获取（Open Access, OA）的学术出版模式，所有发表文章均可免费在线阅读、下载和传播。本刊标准文章处理费（APC）约为 1800 港币（或 230 美元）。稿件正式录用（Acceptance）后，作者可通过以下安全付款通道进行缴费："
                  : "Hong Kong Natural Science Press advocates knowledge sharing and adopts an Open Access (OA) academic publishing model. All published articles are immediately and freely available to read, download, and share. The standard Article Processing Charge (APC) for this journal is approximately 1800 HKD (or 230 USD). Upon formal manuscript acceptance, authors can complete the payment securely via the following channels:"}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#payment-hkd"
                onClick={(e) => {
                  e.preventDefault();
                  alert(isZh ? "港币付款通道已启用，请在录用通知中核对账单号进行转账。" : "HKD Payment gateway active. Please refer to your acceptance letter to verify your invoice number.");
                }}
                className="inline-flex items-center gap-2 rounded-sm bg-[#0b2545] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0b2545]/90 transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v8z"/>
                </svg>
                {isZh ? "港币付款通道 (Pay in HKD)" : "HKD Payment Link"}
              </a>
              <a
                href="#payment-usd"
                onClick={(e) => {
                  e.preventDefault();
                  alert(isZh ? "美元付款通道已启用，请在录用通知中核对账单号进行转账。" : "USD Payment gateway active. Please refer to your acceptance letter to verify your invoice number.");
                }}
                className="inline-flex items-center gap-2 rounded-sm bg-[#006837] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#00522b] transition-colors"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 12 10 10-4.48 10-12S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z"/>
                </svg>
                {isZh ? "美元付款通道 (Pay in USD)" : "USD Payment Link"}
              </a>
            </div>
          </div>

          {/* Dynamic Author Guidelines Notice */}
          <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-[#0b2545] border-b border-slate-100 pb-2">
              {isZh ? "作者投稿须知 (Author Guidelines)" : "Author Guidelines"}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-700">
              {isZh ? (
                <>
                  <li><strong>稿件要求：</strong>稿件应具有明确的学术论点、可靠的实验/理论依据、严密的逻辑和清晰的图表。</li>
                  <li><strong>篇幅与格式：</strong>字数建议在 5,000 字以上（特别简讯除外），稿件排版格式必须为 Microsoft Word (.docx)。</li>
                  <li><strong>基本要素：</strong>稿件应包含完整的学术要素：论文标题、作者姓名、工作机构、摘要、关键词、正文、参考文献等。</li>
                  <li><strong>版权与学术诚信：</strong>作者须对稿件内容的真实性、学术道德和版权独立性负全部责任。严禁一稿多投。</li>
                </>
              ) : (
                <>
                  <li><strong>Manuscript Standards:</strong> Manuscripts must present clear academic theses, reliable evidence, rigorous logic, and high-quality figures and tables.</li>
                  <li><strong>Format & Length:</strong> A word count of 5,000 words or more is recommended. Manuscripts must be compiled and submitted in Microsoft Word (.docx) format.</li>
                  <li><strong>Core Elements:</strong> All standard academic components must be present: Article Title, Author names and affiliations, Abstract, Keywords, Main text, and References.</li>
                  <li><strong>Ethics & Copyright:</strong> Authors hold sole responsibility for the originality, ethics, and copyright independence of their submissions. Dual submissions are strictly prohibited.</li>
                </>
              )}
            </ul>
          </div>
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
