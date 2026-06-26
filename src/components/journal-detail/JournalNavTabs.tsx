import Link from "next/link";

const TABS = [
  { label: "Home", href: "" },
  { label: "Articles & Issues", href: "/articles" },
  { label: "About", href: "/about" },
  { label: "Publish", href: "/publish" },
];

export default function JournalNavTabs({ journalId }: { journalId: number }) {
  return (
    <nav
      aria-label="Journal sections"
      className="w-full border-b border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-7xl px-6">
        <ul className="flex flex-wrap items-center gap-1">
          {TABS.map((tab, idx) => {
            const href =
              idx === 0 ? `/journals/${journalId}` : `#${tab.href.slice(1)}`;
            const active = idx === 0;

            return (
              <li key={tab.label}>
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
