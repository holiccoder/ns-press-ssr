"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Lang = "en" | "zh";
type NavLabel = { en: string; zh: string };
type NavChild = { key: string; label: NavLabel };
type NavItem = { key: string; label: NavLabel; children?: NavChild[] };
type SubmissionRecord = Record<string, unknown>;

const dashboardNavItems: NavItem[] = [
  {
    key: "Quick Submission",
    label: { en: "Quick Submission", zh: "快速投稿" },
    children: [{ key: "New Submission", label: { en: "New Submission", zh: "新建投稿" } }],
  },
  {
    key: "My Submission",
    label: { en: "My Submission", zh: "我的投稿" },
    children: [
      { key: "All My Submission", label: { en: "All My Submission", zh: "所有投稿" } },
      { key: "Under Review", label: { en: "Under Review", zh: "审稿中" } },
      { key: "Need to Revise", label: { en: "Need to Revise", zh: "需修改" } },
      { key: "Accepted", label: { en: "Accepted", zh: "已录用" } },
      { key: "Published", label: { en: "Published", zh: "已发表" } },
      { key: "Rejected", label: { en: "Rejected", zh: "已拒稿" } },
      { key: "Withdrawal", label: { en: "Withdrawal", zh: "退稿" } },
    ],
  },
  {
    key: "My Profile",
    label: { en: "My Profile", zh: "我的资料" },
    children: [
      { key: "Account Info", label: { en: "Account Info", zh: "账户信息" } },
      { key: "Logout", label: { en: "Logout", zh: "退出登录" } },
    ],
  },
];

const panels = {
  submission: {
    title: { en: "All My Submission", zh: "我的投稿" },
    tag: { en: "Author", zh: "作者" },
    columns: {
      paperId: { en: "Paper ID", zh: "论文编号" },
      paperTitle: { en: "Paper Title", zh: "论文标题" },
      journal: { en: "Journal", zh: "期刊" },
      status: { en: "Status", zh: "状态" },
      submissionDate: { en: "Submission Date", zh: "投稿日期" },
    },
    empty: { en: "No submissions yet.", zh: "暂无投稿记录" },
  },
  review: {
    title: { en: "All My Review", zh: "我的审稿" },
    tag: { en: "Reviewer", zh: "审稿人" },
    columns: {
      paperId: { en: "Paper ID", zh: "论文编号" },
      paperTitle: { en: "Paper Title", zh: "论文标题" },
      journal: { en: "Journal", zh: "期刊" },
      status: { en: "Status", zh: "状态" },
    },
    empty: { en: "No review assignments yet.", zh: "暂无审稿任务" },
  },
  editing: {
    title: { en: "All My Editing", zh: "我的编辑" },
    tag: { en: "Editor", zh: "编辑" },
    columns: {
      cover: { en: "Cover", zh: "封面" },
      journalName: { en: "Journal Name", zh: "期刊名称" },
      subject: { en: "Subject", zh: "学科" },
      issn: { en: "ISSN", zh: "ISSN" },
    },
    empty: { en: "No editing records yet.", zh: "暂无编辑记录" },
  },
} as const;

const isValidIdentifier = (value: unknown): boolean =>
  value !== undefined && value !== null && value !== "";

function resolveDashboardLanguage(): Lang {
  if (typeof window === "undefined") return "en";
  const legacy = window.localStorage.getItem("language");
  if (legacy === "zh" || legacy === "en") return legacy;
  const current = window.localStorage.getItem("ns-press:lang");
  if (current === "zh" || current === "en") return current;
  const nav = window.navigator.language?.toLowerCase() ?? "";
  return nav.startsWith("zh") ? "zh" : "en";
}

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [language] = useState<Lang>(resolveDashboardLanguage);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    "Quick Submission": true,
    "My Submission": true,
  });
  const [submissionList, setSubmissionList] = useState<SubmissionRecord[]>([]);
  const [submissionLoading, setSubmissionLoading] = useState(true);
  const [submissionError, setSubmissionError] = useState(false);

  const loadingSubmissionText = language === "zh" ? "加载中..." : "Loading...";
  const errorSubmissionText = language === "zh" ? "加载失败" : "Failed to load";
  const emptySubmissionText = panels.submission.empty[language];

  const rawStatusFilter = searchParams.get("status");
  const statusFilter =
    rawStatusFilter === null || rawStatusFilter === "" ? null : Number(rawStatusFilter);

  const statusDisplayMap: Record<number, { en: string; zh: string }> = {
    0: { en: "Under Review", zh: "审稿中" },
    1: { en: "Revised", zh: "已修改" },
    2: { en: "Accepted", zh: "已录用" },
    3: { en: "Withdrawal", zh: "退稿" },
    4: { en: "Published", zh: "已发表" },
    5: { en: "Rejected", zh: "已拒稿" },
    6: { en: "Withdrawal", zh: "退稿" },
  };

  const statusAliasMap: Record<number, string[]> = {
    0: ["Under Review", "审稿中"],
    1: ["Revised", "Need to Revise", "已修改", "需修改"],
    2: ["Accepted", "已录用"],
    3: ["Withdrawal", "Withdrawn", "Rejected", "退稿", "已拒稿"],
    4: ["Published", "已发表"],
    5: ["Rejected", "已拒稿"],
    6: ["Withdrawal", "退稿"],
  };

  function toggleMenu(key: string, hasChildren: boolean) {
    if (!hasChildren) return;
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  function handleNavClick(key: string) {
    const submissionStatusMap: Record<string, number> = {
      "Under Review": 0,
      "Need to Revise": 1,
      Accepted: 2,
      Published: 4,
      Rejected: 3,
      Withdrawal: 3,
    };

    if (key === "All My Submission") {
      router.push("/dashboard/my-submission");
      return;
    }

    if (Object.prototype.hasOwnProperty.call(submissionStatusMap, key)) {
      router.push(`/dashboard/my-submission?status=${submissionStatusMap[key]}`);
      return;
    }

    if (key === "New Submission") {
      router.push("/dashboard/new-submission");
      return;
    }

    if (key === "Logout") {
      window.localStorage.removeItem("authToken");
      router.push("/login");
    }
  }

  function getValue(
    item: SubmissionRecord,
    keys: string[],
    fallback: string | number | null = "--",
  ): string | number | null {
    for (const key of keys) {
      const value = item[key];
      if (value !== undefined && value !== null && value !== "") {
        if (typeof value === "string" || typeof value === "number") {
          return value;
        }
      }
    }
    return fallback;
  }

  function formatDate(value: unknown, fallback = "--"): string {
    if (!isValidIdentifier(value)) return fallback;

    const normalizeTimestamp = (raw: string | number): number | null => {
      const num = Number(raw);
      if (Number.isNaN(num)) return null;
      if (num > 0 && num < 1e12) return num * 1000;
      return num;
    };

    let dateObj: Date | null = null;
    if (value instanceof Date) {
      dateObj = value;
    } else if (typeof value === "number") {
      const ts = normalizeTimestamp(value);
      dateObj = ts ? new Date(ts) : null;
    } else if (typeof value === "string") {
      const trimmed = value.trim();
      const numericValue = normalizeTimestamp(trimmed);
      if (numericValue) {
        dateObj = new Date(numericValue);
      } else {
        const parsed = Date.parse(trimmed);
        dateObj = Number.isNaN(parsed) ? null : new Date(parsed);
      }
    }

    if (!dateObj || Number.isNaN(dateObj.getTime())) return fallback;

    return new Intl.DateTimeFormat(language === "zh" ? "zh-CN" : "en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(dateObj);
  }

  function getStatusCodeByText(statusText: string | null): number | null {
    if (!isValidIdentifier(statusText)) return null;
    const normalizedStatusText = String(statusText).trim();
    if (!normalizedStatusText) return null;

    for (const [statusCode, aliases] of Object.entries(statusAliasMap)) {
      if (aliases.includes(normalizedStatusText)) {
        return Number(statusCode);
      }
    }
    return null;
  }

  function matchesStatusFilter(item: SubmissionRecord): boolean {
    if (statusFilter === null || Number.isNaN(statusFilter)) return true;

    const numericStatus = item.status;
    if (isValidIdentifier(numericStatus) && Number(numericStatus) === statusFilter) {
      return true;
    }

    const statusText = getValue(item, ["status_text", "statusText", "status"], null);
    if (!statusText) return false;
    return statusAliasMap[statusFilter]?.includes(String(statusText)) ?? false;
  }

  function getDisplayStatus(item: SubmissionRecord): string {
    const statusValue = getValue(item, ["status"], null);
    const numericStatus = Number(statusValue);
    if (!Number.isNaN(numericStatus) && statusDisplayMap[numericStatus]) {
      return statusDisplayMap[numericStatus][language] || statusDisplayMap[numericStatus].en;
    }

    const statusText = getValue(item, ["status_text", "statusText", "status"], null);
    const statusCodeByText = getStatusCodeByText(statusText ? String(statusText) : null);
    if (statusCodeByText !== null && statusDisplayMap[statusCodeByText]) {
      return (
        statusDisplayMap[statusCodeByText][language] || statusDisplayMap[statusCodeByText].en
      );
    }

    return isValidIdentifier(statusText) ? String(statusText) : "--";
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchMyContribution() {
      setSubmissionLoading(true);
      setSubmissionError(false);
      try {
        const token = window.localStorage.getItem("authToken") ?? "";
        const lang = language === "zh" ? "中文" : "English";
        const params = new URLSearchParams({ lang });
        if (token) params.set("token", token);

        const response = await fetch(
          `https://api.ns-press.com/api/index/myContributions?${params.toString()}`,
          {
            cache: "no-store",
            headers: token ? { token } : undefined,
          },
        );

        if (!response.ok) {
          throw new Error(`myContributions failed with ${response.status}`);
        }

        const payload = (await response.json()) as {
          code?: number;
          data?: unknown;
          list?: unknown;
          rows?: unknown;
        };

        if (payload.code === 0) {
          throw new Error("myContributions returned code=0");
        }

        const list = Array.isArray(payload)
          ? payload
          : Array.isArray(payload.data)
            ? payload.data
            : Array.isArray(payload.list)
              ? payload.list
              : Array.isArray(payload.rows)
                ? payload.rows
                : [];

        if (isMounted) {
          setSubmissionList(list as SubmissionRecord[]);
        }
      } catch {
        if (isMounted) {
          setSubmissionList([]);
          setSubmissionError(true);
        }
      } finally {
        if (isMounted) {
          setSubmissionLoading(false);
        }
      }
    }

    fetchMyContribution();
    return () => {
      isMounted = false;
    };
  }, [language]);

  const visibleSubmissionList = submissionList.filter(matchesStatusFilter);

  return (
    <main className="flex flex-1 flex-col bg-slate-50 py-12 sm:py-16">
      <section className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-sm border border-slate-200 bg-white p-4">
            <nav className="space-y-2">
              {dashboardNavItems.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const isOpen = Boolean(openMenus[item.key]);
                return (
                  <div key={item.key} className="rounded-sm border border-slate-200">
                    <button
                      type="button"
                      onClick={() => toggleMenu(item.key, hasChildren)}
                      className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-semibold text-[#0b2545]"
                    >
                      <span>{item.label[language] || item.label.en}</span>
                      <span aria-hidden className="text-slate-500">
                        +
                      </span>
                    </button>
                    {hasChildren && isOpen && (
                      <div className="border-t border-slate-200 bg-slate-50 py-1">
                        {item.children!.map((child) => (
                          <button
                            key={child.key}
                            type="button"
                            onClick={() => handleNavClick(child.key)}
                            className="block w-full px-3 py-1.5 text-left text-sm text-slate-700 hover:bg-slate-100 hover:text-[#0b2545]"
                          >
                            {child.label[language] || child.label.en}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </aside>

          <div className="space-y-6">
            <section className="overflow-hidden rounded-sm border border-slate-200 bg-white">
              <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <h2 className="text-base font-bold text-[#0b2545]">
                  {panels.submission.title[language]}
                </h2>
                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
                  {panels.submission.tag[language]}
                </span>
              </header>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-left text-slate-600">
                    <tr>
                      <th className="px-4 py-3">{panels.submission.columns.paperId[language]}</th>
                      <th className="px-4 py-3">{panels.submission.columns.paperTitle[language]}</th>
                      <th className="px-4 py-3">{panels.submission.columns.journal[language]}</th>
                      <th className="px-4 py-3">{panels.submission.columns.status[language]}</th>
                      <th className="px-4 py-3">
                        {panels.submission.columns.submissionDate[language]}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {submissionLoading && (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                          {loadingSubmissionText}
                        </td>
                      </tr>
                    )}
                    {!submissionLoading && submissionError && (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                          {errorSubmissionText}
                        </td>
                      </tr>
                    )}
                    {!submissionLoading &&
                      !submissionError &&
                      visibleSubmissionList.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                            {emptySubmissionText}
                          </td>
                        </tr>
                      )}
                    {!submissionLoading &&
                      !submissionError &&
                      visibleSubmissionList.length > 0 &&
                      visibleSubmissionList.map((item, index) => {
                        const rowKey =
                          item.id ??
                          item.contribution_id ??
                          item.contributionId ??
                          item.contribute_id ??
                          item.paper_id ??
                          item.paperId ??
                          `submission-${index}`;

                        return (
                          <tr key={String(rowKey)}>
                            <td className="px-4 py-3">
                              {getValue(item, [
                                "paper_id",
                                "paperId",
                                "contribution_id",
                                "contributionId",
                                "contribute_id",
                                "id",
                              ])}
                            </td>
                            <td className="px-4 py-3">
                              {getValue(item, ["paper_title", "paperTitle", "title"])}
                            </td>
                            <td className="px-4 py-3">
                              {getValue(item, ["journal_name", "journal", "journalName"])}
                            </td>
                            <td className="px-4 py-3">{getDisplayStatus(item)}</td>
                            <td className="px-4 py-3">
                              {formatDate(
                                getValue(item, [
                                  "create_time",
                                  "submission_date",
                                  "submissionDate",
                                  "submitted_at",
                                  "created_at",
                                ]),
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="overflow-hidden rounded-sm border border-slate-200 bg-white">
              <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <h2 className="text-base font-bold text-[#0b2545]">
                  {panels.review.title[language]}
                </h2>
                <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  {panels.review.tag[language]}
                </span>
              </header>
              <div className="px-4 py-8 text-center text-sm text-slate-500">
                {panels.review.empty[language]}
              </div>
            </section>

            <section className="overflow-hidden rounded-sm border border-slate-200 bg-white">
              <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
                <h2 className="text-base font-bold text-[#0b2545]">
                  {panels.editing.title[language]}
                </h2>
                <span className="rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
                  {panels.editing.tag[language]}
                </span>
              </header>
              <div className="px-4 py-8 text-center text-sm text-slate-500">
                {panels.editing.empty[language]}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-600">
          Loading...
        </div>
      }
    >
      <DashboardContent />
    </Suspense>
  );
}
