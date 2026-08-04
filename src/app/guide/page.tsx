import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import guideData from "@/data/guide.json";
import { getServerUiLang } from "@/lib/lang.server";

export const metadata: Metadata = {
  title: "Information Guide",
  description:
    "Information Guide for authors, reviewers, and open access policy at NSP.",
  alternates: { canonical: "/guide" },
  openGraph: {
    title: "Information Guide",
    description:
      "Author guide, reviewer guide, and open access policy at Hong Kong Natural Science Press.",
    url: "/guide",
    type: "website",
  },
};

type TabKey = "author_guide" | "reviewer_guide" | "open_access";

type RouteSearchParams = { tab?: string | string[] };

function resolveTab(tabParam?: string | string[]): TabKey {
  const value = Array.isArray(tabParam) ? tabParam[0] : tabParam;
  switch (value) {
    case "reviewer_guide":
    case "open_access":
      return value;
    default:
      return "author_guide";
  }
}

function TabNav({ activeTab, lang }: { activeTab: TabKey; lang: string }) {
  const isZh = lang === "zh";
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-4xl px-6">
        <nav aria-label="Guide tabs" className="flex gap-6 overflow-x-auto py-4">
          {guideData.tabs.map((tab) => {
            const isActive = tab.key === activeTab;
            return (
              <Link
                key={tab.key}
                href={`/guide?tab=${tab.key}`}
                className={`whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? "border-[#0b2545] text-[#0b2545]"
                    : "border-transparent text-slate-500 hover:text-[#0b2545]"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {isZh ? tab.labelZh : tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function TabContent({
  activeTab,
  policyInfo,
}: {
  activeTab: TabKey;
  policyInfo: Record<string, string>;
}) {
  const contentKey = activeTab === "open_access" ? "open_policy" : activeTab;
  const html = policyInfo[contentKey] ?? "";

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div
          className="max-w-none text-slate-700"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </section>
  );
}

export default async function GuidePage({
  searchParams,
}: {
  searchParams: Promise<RouteSearchParams>;
}) {
  const { tab } = await searchParams;
  const activeTab = resolveTab(tab);
  const lang = await getServerUiLang();

  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        title={guideData.hero.title}
        breadcrumb={guideData.hero.breadcrumb}
      />
      <TabNav activeTab={activeTab} lang={lang} />
      <TabContent activeTab={activeTab} policyInfo={guideData.fallback} />
    </main>
  );
}
