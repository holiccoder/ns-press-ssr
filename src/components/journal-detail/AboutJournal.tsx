export default function AboutJournal({ scope }: { scope: string }) {
  if (!scope) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-[#0b2545]">About This Journal</h2>

      <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
        {scope}
      </p>

      <a
        href="#aims-scope"
        className="inline-flex items-center rounded-sm bg-[#0b2545] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1e3a8a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
      >
        View full aims & scope
      </a>
    </section>
  );
}
