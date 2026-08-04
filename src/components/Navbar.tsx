"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import layout from "@/data/layout.json";
import {
  getToken,
  getUserProfile,
  removeToken,
  removeUserProfile,
} from "@/lib/auth";
import LanguageSwitcher, { useLang } from "./LanguageSwitcher";

function formatPublisherName(name: string, lang: string): React.ReactNode {
  if (lang === "zh") return name;
  const pressIndex = name.toLowerCase().indexOf("press");
  if (pressIndex === -1) return name;
  const before = name.slice(0, pressIndex).trim();
  const after = name.slice(pressIndex).trim();
  return (
    <>
      {before}
      <br />
      {after}
    </>
  );
}

type NavItem = { label: string; href: string; hasDropdown?: boolean };
type DropdownItem = { label: string; href: string };

const { brand, navbar } = layout as {
  brand: { acronym: string; subtitle: string; logo: string; favicon: string };
  navbar: {
    items: NavItem[];
    aboutDropdown: DropdownItem[];
    searchLabel: string;
    submitLabel: string;
    submitHref: string;
  };
};

const PUBLISHER_EN =
  process.env.NEXT_PUBLIC_PUBLISHER_ENGLISH ?? "";
const PUBLISHER_ZH =
  process.env.NEXT_PUBLIC_PUBLISHER_CHINESE ?? "";

function SearchIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function ChevronDownIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CloseIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SearchModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    onClose();
    setQuery("");
  }

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-32 sm:items-center sm:pt-0"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="mx-4 w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-2xl">
        <form onSubmit={handleSubmit} className="flex items-center gap-3 p-4">
          <SearchIcon className="h-6 w-6 shrink-0 text-slate-400" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search journals, articles, books..."
            className="min-w-0 flex-1 bg-transparent text-lg text-slate-800 placeholder:text-slate-400 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close search"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </form>
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-500">
          Press <kbd className="rounded bg-white px-1.5 py-0.5 font-sans ring-1 ring-slate-200">Enter</kbd> to search, <kbd className="rounded bg-white px-1.5 py-0.5 font-sans ring-1 ring-slate-200">Esc</kbd> to close
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const lang = useLang();
  const publisherName = lang === "zh" ? PUBLISHER_ZH : PUBLISHER_EN;
  const [aboutOpen, setAboutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    const syncProfile = () => {
      setProfile(getToken() ? getUserProfile() : null);
    };
    const initialSync = window.setTimeout(syncProfile, 0);
    window.addEventListener("ns-press:auth-change", syncProfile);
    window.addEventListener("storage", syncProfile);
    return () => {
      window.clearTimeout(initialSync);
      window.removeEventListener("ns-press:auth-change", syncProfile);
      window.removeEventListener("storage", syncProfile);
    };
  }, []);

  const displayName = String(
    profile?.real_name ?? profile?.name ?? profile?.account ?? profile?.email ?? "Account",
  );

  function logout() {
    removeToken();
    removeUserProfile();
    setUserMenuOpen(false);
    router.push("/login");
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header className="w-full bg-[#0b2545] text-white">
        <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image
              src="/images/logo-white.png"
              alt={`${brand.acronym} logo`}
              width={180}
              height={56}
              className="h-14 w-auto object-contain"
              priority
            />
            {publisherName && (
              <span
                className={`hidden text-sm font-semibold tracking-wide text-white md:inline ${
                  lang === "zh" ? "" : "max-w-[16rem] leading-tight"
                }`}
              >
                {formatPublisherName(publisherName, lang)}
              </span>
            )}
          </Link>

          {/* Centered nav links */}
          <ul className="hidden items-center gap-2 md:flex">
            {navbar.items.map((item) => {
              const active = isActive(item.href);

              if (item.hasDropdown) {
                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setAboutOpen(true)}
                    onMouseLeave={() => setAboutOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setAboutOpen((v) => !v)}
                      aria-expanded={aboutOpen}
                      aria-haspopup="menu"
                      className={`flex items-center gap-1 rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide transition-colors ${
                        active
                          ? "bg-white text-[#0b2545]"
                          : "text-white hover:text-white/80"
                      }`}
                    >
                      {item.label}
                      <ChevronDownIcon
                        className={`h-3.5 w-3.5 transition-transform ${
                          aboutOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {aboutOpen && (
                      <div
                        role="menu"
                        className="absolute left-1/2 top-full z-40 mt-1 w-48 -translate-x-1/2 overflow-hidden rounded-md bg-white py-1 text-sm text-[#0b2545] shadow-lg ring-1 ring-black/5"
                      >
                        {navbar.aboutDropdown.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            role="menuitem"
                            className="block px-4 py-2 hover:bg-[#0b2545]/5"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`rounded-full px-4 py-1.5 text-sm font-semibold tracking-wide transition-colors ${
                      active
                        ? "bg-white text-[#0b2545]"
                        : "text-white hover:text-white/80"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Action items */}
          <div className="flex shrink-0 items-center gap-5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden cursor-pointer items-center gap-1.5 text-sm font-semibold tracking-wide text-white hover:text-white/80 sm:flex"
            >
              <SearchIcon className="h-4 w-4" />
              {navbar.searchLabel}
            </button>
            <Link
              href={navbar.submitHref}
              className="text-sm font-semibold tracking-wide text-white hover:text-white/80"
            >
              {navbar.submitLabel}
            </Link>
            {profile ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((open) => !open)}
                  aria-expanded={userMenuOpen}
                  aria-haspopup="menu"
                  className="flex items-center gap-1.5 text-sm font-semibold tracking-wide text-white hover:text-white/80"
                >
                  <span className="max-w-32 truncate">{displayName}</span>
                  <ChevronDownIcon
                    className={`h-3.5 w-3.5 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {userMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full z-40 mt-2 w-48 overflow-hidden rounded-md bg-white py-1 text-sm text-[#0b2545] shadow-lg ring-1 ring-black/5"
                  >
                    <Link
                      href="/dashboard/account-info"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                      className="block px-4 py-2 hover:bg-[#0b2545]/5"
                    >
                      Account Info
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      onClick={logout}
                      className="block w-full px-4 py-2 text-left hover:bg-[#0b2545]/5"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold tracking-wide text-white hover:text-white/80"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="rounded-sm bg-white px-3 py-1.5 text-sm font-semibold tracking-wide text-[#0b2545] transition-colors hover:bg-slate-100"
                >
                  Register
                </Link>
              </>
            )}
            <LanguageSwitcher />
          </div>
        </nav>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
