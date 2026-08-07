"use client";

import { useState } from "react";
import Link from "next/link";

export type IssueSelection = {
  year?: string;
  periods?: number;
};

export default function IssueFilter({
  journalId,
  years,
  periodsMap,
  selection,
}: {
  journalId: number;
  years: string[];
  periodsMap: Record<string, number[]>;
  selection?: IssueSelection;
}) {
  if (years.length === 0) return null;

  const activeYear = selection?.year;
  const activeIssue = selection?.periods;
  const hasSelection = Boolean(activeYear);

  // Default: expand the active year (or the first year if nothing selected).
  const initialOpen = activeYear ?? years[0];
  const [openYear, setOpenYear] = useState<string | null>(initialOpen);

  const allHref = `/journals/${journalId}?tab=articles`;

  return (
    <div className="space-y-3">
      <h2 className="text-base font-bold text-[#0b2545]">Issues</h2>

      <Link
        href={allHref}
        className={`block rounded-sm px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] ${
          !hasSelection
            ? "bg-[#0b2545] text-white"
            : "text-slate-600 hover:bg-slate-50 hover:text-[#0b2545]"
        }`}
      >
        All Articles
      </Link>

      <ul className="space-y-1">
        {years.map((year) => {
          const issues = periodsMap[year] ?? [];
          const isOpen = openYear === year;
          const yearActive = activeYear === year;

          return (
            <li key={year}>
              <button
                type="button"
                onClick={() => setOpenYear(isOpen ? null : year)}
                aria-expanded={isOpen}
                className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] ${
                  yearActive
                    ? "text-[#0b2545]"
                    : "text-slate-700 hover:bg-slate-50 hover:text-[#0b2545]"
                }`}
              >
                <span>{year}</span>
                <svg
                  className={`h-4 w-4 shrink-0 transition-transform ${
                    isOpen ? "rotate-90" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 0 1 .02-1.06L11.168 10 7.23 6.29a.75.75 0 1 1 1.04-1.08l4.5 4.25a.75.75 0 0 1 0 1.08l-4.5 4.25a.75.75 0 0 1-1.06-.02Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isOpen && issues.length > 0 && (
                <ul className="mt-1 space-y-0.5 border-l border-slate-200 pl-3">
                  {issues.map((issue) => {
                    const href = `/journals/${journalId}?tab=articles&year=${year}&periods=${issue}`;
                    const isActive = yearActive && activeIssue === issue;
                    return (
                      <li key={issue}>
                        <Link
                          href={href}
                          className={`block rounded-sm px-3 py-1.5 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] ${
                            isActive
                              ? "bg-sky-100 font-medium text-[#0b2545]"
                              : "text-slate-600 hover:bg-slate-50 hover:text-[#0b2545]"
                          }`}
                        >
                          Issue {issue}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}

              {isOpen && issues.length === 0 && (
                <p className="ml-6 py-1 text-xs text-slate-400">
                  No issues published
                </p>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
