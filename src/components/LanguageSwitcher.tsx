"use client";

import { useSyncExternalStore, useTransition } from "react";
import { useRouter } from "next/navigation";

export type LangCode = "en" | "zh";

const COOKIE_NAME = "lang";
const STORAGE_KEY = "ns-press:lang";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function writeCookie(name: string, value: string) {
  // 1-year persistence, root-scoped, lax samesite so SSR sees it on next nav.
  const oneYear = 60 * 60 * 24 * 365;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${oneYear}; samesite=lax`;
}

function resolveLang(): LangCode {
  if (typeof window === "undefined") return "en";
  const cookie = readCookie(COOKIE_NAME);
  if (cookie === "en" || cookie === "zh") return cookie;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "zh") return stored;
  } catch {
    /* private mode etc. */
  }
  const nav = window.navigator.language?.toLowerCase() ?? "";
  return nav.startsWith("zh") ? "zh" : "en";
}

// useSyncExternalStore subscription — fires the listener when anything that
// might change the language preference happens in another tab.
function subscribe(listener: () => void) {
  window.addEventListener("storage", listener);
  return () => window.removeEventListener("storage", listener);
}

const SERVER_SNAPSHOT: LangCode = "en";

export default function LanguageSwitcher() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const lang = useSyncExternalStore(
    subscribe,
    resolveLang,
    () => SERVER_SNAPSHOT,
  );

  const choose = (next: LangCode) => {
    if (next === lang) return;
    writeCookie(COOKIE_NAME, next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* localStorage may be unavailable — cookie is enough */
    }
    // Re-render the page tree so server components see the new cookie.
    startTransition(() => router.refresh());
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className={`hidden items-center rounded-full border border-white/30 text-xs font-semibold sm:inline-flex ${
        isPending ? "opacity-70" : ""
      }`}
    >
      <button
        type="button"
        onClick={() => choose("en")}
        aria-pressed={lang === "en"}
        className={`rounded-l-full px-2.5 py-1 tracking-wide transition-colors ${
          lang === "en"
            ? "bg-white text-[#0b2545]"
            : "text-white hover:text-white/80"
        }`}
      >
        EN
      </button>
      <span aria-hidden className="h-3 w-px bg-white/30" />
      <button
        type="button"
        onClick={() => choose("zh")}
        aria-pressed={lang === "zh"}
        className={`rounded-r-full px-2.5 py-1 tracking-wide transition-colors ${
          lang === "zh"
            ? "bg-white text-[#0b2545]"
            : "text-white hover:text-white/80"
        }`}
      >
        中
      </button>
    </div>
  );
}
