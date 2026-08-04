export default function GlobalLoading() {
  return (
    <div className="flex flex-1 flex-col bg-slate-50">
      {/* Top Header spacer to account for sticky navbar */}
      <div className="h-16 bg-[#0b2545]/10 animate-pulse" />

      {/* Pulsing Hero Banner */}
      <div className="w-full bg-[#0b2545]/90 py-16 text-white animate-pulse">
        <div className="mx-auto max-w-7xl px-6 space-y-4">
          {/* Breadcrumb skeleton */}
          <div className="h-4 w-40 rounded bg-white/20" />
          {/* Title skeleton */}
          <div className="h-8 w-1/2 rounded bg-white/30 sm:h-10 md:w-1/3" />
        </div>
      </div>

      {/* Main Container */}
      <div className="mx-auto w-full max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          {/* Sidebar Skeleton (left or right depending on page context, here standard left) */}
          <aside className="hidden space-y-6 lg:block animate-pulse">
            <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="h-5 w-24 rounded bg-slate-200" />
              <div className="space-y-2">
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-4 w-5/6 rounded bg-slate-200" />
                <div className="h-4 w-4/6 rounded bg-slate-200" />
              </div>
            </div>
            <div className="rounded-sm border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="h-5 w-32 rounded bg-slate-200" />
              <div className="h-10 w-full rounded bg-slate-200" />
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <div className="space-y-8 animate-pulse">
            {/* Main Title/Section Card */}
            <div className="rounded-sm border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                {/* Visual placeholder (e.g., book cover or article thumbnail) */}
                <div className="aspect-[3/4] w-36 shrink-0 rounded bg-slate-200" />
                {/* Meta text lines */}
                <div className="flex-1 space-y-3">
                  <div className="h-6 w-3/4 rounded bg-slate-200" />
                  <div className="h-4 w-1/2 rounded bg-slate-200" />
                  <div className="h-4 w-1/3 rounded bg-slate-200" />
                  <div className="h-10 w-40 rounded bg-slate-100" />
                </div>
              </div>
            </div>

            {/* List Row placeholders */}
            <div className="rounded-sm border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-8">
              <div className="space-y-3">
                <div className="h-5 w-36 rounded bg-slate-200" />
                <hr className="border-slate-100" />
              </div>

              {/* Mock items */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3 border-b border-slate-100 pb-6 last:border-b-0 last:pb-0">
                  <div className="h-5 w-5/6 rounded bg-slate-200" />
                  <div className="h-4 w-2/3 rounded bg-slate-200" />
                  <div className="space-y-1.5 pt-1">
                    <div className="h-3 w-full rounded bg-slate-100" />
                    <div className="h-3 w-full rounded bg-slate-100" />
                    <div className="h-3 w-4/5 rounded bg-slate-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
