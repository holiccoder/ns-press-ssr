"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import { useLang } from "@/components/LanguageSwitcher";
import { getMySubmissions, type SubmissionRecord } from "@/lib/submission-api";

const statusLabels: Record<number, { en: string; zh: string }> = {
  0: { en: "Under Review", zh: "审稿中" },
  1: { en: "Need to Revise", zh: "需修改" },
  2: { en: "Accepted", zh: "已录用" },
  3: { en: "Rejected", zh: "已拒稿" },
  4: { en: "Published", zh: "已发表" },
};

function value(item: SubmissionRecord, keys: string[], fallback = "--") {
  for (const key of keys) {
    const current = item[key];
    if (current !== undefined && current !== null && current !== "") return String(current);
  }
  return fallback;
}

function formatDate(raw: string, lang: "en" | "zh") {
  const numeric = Number(raw);
  const date = new Date(
    numeric > 0 && numeric < 1e12 ? numeric * 1000 : numeric || raw,
  );
  if (Number.isNaN(date.getTime())) return "--";
  return new Intl.DateTimeFormat(lang === "zh" ? "zh-CN" : "en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function MySubmissionContent() {
  const lang = useLang();
  const searchParams = useSearchParams();
  const [items, setItems] = useState<SubmissionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const rawStatusFilter = searchParams.get("status");
  const statusFilter =
    rawStatusFilter === null || rawStatusFilter === "" ? null : Number(rawStatusFilter);

  useEffect(() => {
    let mounted = true;
    getMySubmissions(lang)
      .then((result) => mounted && setItems(result))
      .catch(() => mounted && setError(true))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, [lang]);

  const visibleItems = useMemo(() => {
    if (statusFilter === null || Number.isNaN(statusFilter)) return items;
    return items.filter((item) => {
      const numeric = Number(item.status);
      if (!Number.isNaN(numeric)) return numeric === statusFilter;
      return false;
    });
  }, [items, statusFilter]);

  return (
    <section className="overflow-hidden rounded-sm border border-slate-200 bg-white">
      <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <h1 className="text-base font-bold text-[#0b2545] sm:text-lg">
          {lang === "zh" ? "我的投稿" : "All My Submission"}
        </h1>
        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
          {lang === "zh" ? "作者" : "Author"}
        </span>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">{lang === "zh" ? "论文标题" : "Paper Title"}</th>
              <th className="px-4 py-3">{lang === "zh" ? "期刊" : "Journal"}</th>
              <th className="px-4 py-3">{lang === "zh" ? "姓名" : "Name"}</th>
              <th className="px-4 py-3">{lang === "zh" ? "手机号" : "Phone"}</th>
              <th className="px-4 py-3">{lang === "zh" ? "邮箱" : "Email"}</th>
              <th className="px-4 py-3">{lang === "zh" ? "状态" : "Status"}</th>
              <th className="px-4 py-3">{lang === "zh" ? "投稿日期" : "Submission Date"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading && <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-500">Loading...</td></tr>}
            {!loading && error && <tr><td colSpan={8} className="px-4 py-8 text-center text-red-600">{lang === "zh" ? "加载失败" : "Failed to load"}</td></tr>}
            {!loading && !error && visibleItems.length === 0 && <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-500">{lang === "zh" ? "暂无投稿记录" : "No submissions yet."}</td></tr>}
            {!loading && !error && visibleItems.map((item, index) => {
              const status = Number(item.status);
              const statusText = statusLabels[status]?.[lang] ?? value(item, ["status_text", "statusText", "status"]);
              return (
                <tr key={value(item, ["id", "paper_id", "contribution_id"], `submission-${index}`)}>
                  <td className="px-4 py-3">{value(item, ["paper_id", "paperId", "contribution_id", "id"])}</td>
                  <td className="max-w-sm px-4 py-3">{value(item, ["paper_title", "paperTitle", "title"])}</td>
                  <td className="px-4 py-3">{value(item, ["journal_name", "journal", "journalName"])}</td>
                  <td className="px-4 py-3">{value(item, ["real_name", "realName", "name"])}</td>
                  <td className="px-4 py-3">{value(item, ["mobile", "phone", "telephone"])}</td>
                  <td className="px-4 py-3">{value(item, ["email", "account", "user_email"])}</td>
                  <td className="px-4 py-3">{statusText}</td>
                  <td className="px-4 py-3">{formatDate(value(item, ["create_time", "submission_date", "submissionDate", "created_at"]), lang)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function MySubmissionPage() {
  return (
    <DashboardShell>
      <Suspense fallback={<div className="rounded-sm border border-slate-200 bg-white p-8 text-slate-500">Loading...</div>}>
        <MySubmissionContent />
      </Suspense>
    </DashboardShell>
  );
}
