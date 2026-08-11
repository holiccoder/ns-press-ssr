import Link from "next/link";

type AboutJournalProps = {
  scope?: string;
  journalId?: number;
  policy?: string;
  authorNotice?: string;
  full?: boolean;
};

export default function AboutJournal({
  scope,
  journalId,
  policy,
  authorNotice,
  full = false,
}: AboutJournalProps) {
  const hasContent = Boolean(scope || policy || authorNotice);
  if (!hasContent) return null;

  if (!full) {
    return (
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-[#0b2545]">About This Journal</h2>

        {scope && (
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
            {scope}
          </p>
        )}

        {journalId != null && (
          <Link
            href={`/journals/${journalId}?tab=about#aims-scope`}
            className="inline-flex items-center rounded-sm bg-[#0b2545] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1e3a8a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
          >
            View full aims & scope
          </Link>
        )}
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div id="aims-scope" className="scroll-mt-6 space-y-4">
        <h2 className="text-lg font-bold text-[#0b2545]">Aims &amp; Scope</h2>
        {scope && (
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
            {scope}
          </p>
        )}
      </div>

      {policy && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#0b2545]">Journal Policy</h2>
          <div
            className="prose prose-sm max-w-none text-slate-700 prose-strong:text-slate-900 sm:prose-base"
            dangerouslySetInnerHTML={{ __html: policy }}
          />
        </section>
      )}

      {authorNotice && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-[#0b2545]">Author Instructions</h2>
          <div
            className="prose prose-sm max-w-none text-slate-700 prose-strong:text-slate-900 sm:prose-base"
            dangerouslySetInnerHTML={{ __html: authorNotice }}
          />
        </section>
      )}
    </section>
  );
}
