import Link from "next/link";

export type JournalTabKey = "home" | "articles" | "about" | "publish";

const TABS: Array<{ key: JournalTabKey; label: string }> = [
  { key: "home", label: "Home" },
  { key: "articles", label: "Articles & Issues" },
  { key: "about", label: "About" },
  { key: "publish", label: "Publish" },
];

export default function JournalNavTabs({
  journalId,
  activeTab = "home",
}: {
  journalId: number;
  activeTab?: JournalTabKey;
}) {
  return (
    <nav
      aria-label="Journal sections"
      className="w-full border-b border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <ul className="flex flex-wrap items-center gap-1">
          {TABS.map((tab) => {
            const href =
              tab.key === "home"
                ? `/journals/${journalId}`
                : `/journals/${journalId}?tab=${tab.key}`;
            const active = tab.key === activeTab;

            return (
              <li key={tab.key}>
                <Link
                  href={href}
                  className={`inline-block px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] focus-visible:ring-offset-2 ${
                    active
                      ? "bg-sky-100 text-[#0b2545]"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#0b2545]"
                  }`}
                >
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
