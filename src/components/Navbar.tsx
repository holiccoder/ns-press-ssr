"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import layout from "@/data/layout.json";

const { brand, navbar } = layout;

function DeerLogo({ className = "" }: { className?: string }) {
  // Stylized leaping deer/antelope mark
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M52 8l-4 8-6-2-3 5 5 4-10 10-12-4-8 6 4 6-10 10 4 4 12-8 8 4 6-6-4-6 12-12 6 2 3-6-5-3 4-8-2-4z" />
      <circle cx="50" cy="12" r="2" />
    </svg>
  );
}

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

export default function Navbar() {
  const pathname = usePathname();
  const [aboutOpen, setAboutOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="w-full bg-[#0b2545] text-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <DeerLogo className="h-7 w-7 text-white" />
          <span className="flex items-baseline gap-1 leading-none">
            <span className="text-lg font-bold tracking-wide">
              {brand.acronym}
            </span>
            <span className="text-sm font-light tracking-wide text-white/80">
              {brand.subtitle}
            </span>
          </span>
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
                      className="absolute left-1/2 top-full z-50 mt-1 w-48 -translate-x-1/2 overflow-hidden rounded-md bg-white py-1 text-sm text-[#0b2545] shadow-lg ring-1 ring-black/5"
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
        <div className="flex items-center gap-5 shrink-0">
          <button
            type="button"
            className="hidden items-center gap-1.5 text-sm font-semibold tracking-wide text-white hover:text-white/80 sm:flex"
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
        </div>
      </nav>
    </header>
  );
}
