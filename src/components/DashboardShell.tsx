"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { removeToken, removeUserProfile } from "@/lib/auth";
import { useLang } from "@/lib/lang";

const statusLinks = [
  ["Under Review", 0],
  ["Need to Revise", 1],
  ["Accepted", 2],
  ["Published", 4],
  ["Rejected", 3],
  ["Withdrawal", 3],
] as const;

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const lang = useLang();

  function isActive(path: string) {
    return pathname === path;
  }

  function logout() {
    removeToken();
    removeUserProfile();
    router.push("/login");
  }

  return (
    <main className="flex flex-1 flex-col bg-slate-50 py-12 sm:py-16">
      <section className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="rounded-sm border border-slate-200 bg-white p-4">
            <nav className="space-y-2" aria-label="Dashboard navigation">
              <div className="rounded-sm border border-slate-200">
                <div className="px-3 py-2 text-sm font-semibold text-[#0b2545]">
                  {lang === "zh" ? "快速投稿" : "Quick Submission"}
                </div>
                <Link
                  href="/dashboard/new-submission"
                  className={`block px-3 py-1.5 text-sm hover:bg-slate-100 ${isActive("/dashboard/new-submission") ? "font-semibold text-[#0b2545]" : "text-slate-700"}`}
                >
                  {lang === "zh" ? "新建投稿" : "New Submission"}
                </Link>
              </div>

              <div className="rounded-sm border border-slate-200">
                <div className="px-3 py-2 text-sm font-semibold text-[#0b2545]">
                  {lang === "zh" ? "我的投稿" : "My Submission"}
                </div>
                <Link
                  href="/dashboard/my-submission"
                  className={`block px-3 py-1.5 text-sm hover:bg-slate-100 ${isActive("/dashboard/my-submission") ? "font-semibold text-[#0b2545]" : "text-slate-700"}`}
                >
                  {lang === "zh" ? "所有投稿" : "All My Submission"}
                </Link>
                {statusLinks.map(([label, status]) => (
                  <Link
                    key={label}
                    href={`/dashboard/my-submission?status=${status}`}
                    className="block px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
                  >
                    {label}
                  </Link>
                ))}
              </div>

              <div className="rounded-sm border border-slate-200">
                <div className="px-3 py-2 text-sm font-semibold text-[#0b2545]">
                  {lang === "zh" ? "我的资料" : "My Profile"}
                </div>
                <Link
                  href="/dashboard/account-info"
                  className={`block px-3 py-1.5 text-sm hover:bg-slate-100 ${isActive("/dashboard/account-info") ? "font-semibold text-[#0b2545]" : "text-slate-700"}`}
                >
                  {lang === "zh" ? "账户信息" : "Account Info"}
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="block w-full px-3 py-1.5 text-left text-sm text-slate-700 hover:bg-slate-100"
                >
                  {lang === "zh" ? "退出登录" : "Logout"}
                </button>
              </div>
            </nav>
          </aside>

          <div className="min-w-0">{children}</div>
        </div>
      </section>
    </main>
  );
}
