"use client";

// Root error boundary for the app. Catches any unhandled error from a server
// component below this segment (e.g. a fetch failure that escaped a try/catch)
// so the rest of the page can still render and the user gets a retry button.

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app/error] caught:", error);
  }, [error]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <h1 className="text-2xl font-bold text-[#0b2545]">Something went wrong</h1>
      <p className="mt-3 max-w-md text-sm text-slate-600">
        We hit an unexpected error loading this page. This is usually temporary.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex items-center gap-1 rounded-sm bg-[#0b2545] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1e3a8a]"
      >
        Try again
      </button>
    </main>
  );
}
