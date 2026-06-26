"use client";

import Image from "next/image";
import Link from "next/link";
import layout from "@/data/layout.json";

const { brand, footer } = layout;

/* ---------- Icons ---------- */

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function ArrowUpIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

/* ---------- Component ---------- */

export default function Footer() {
  // Back-to-top — `scrollTo` only runs in the click handler, so SSR
  // produces the same markup as the client.
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative mt-auto">
      {/* Dark navy main area */}
      <div className="bg-[#0b1023] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-0">
            {/* Column 1 — Brand & Contact */}
            <div className="lg:pr-8">
              <Link href="/" className="inline-flex items-center gap-2">
                <Image
                  src={brand.logo}
                  alt={`${brand.acronym} logo`}
                  width={160}
                  height={44}
                  className="h-9 w-auto object-contain"
                  priority
                />
              </Link>

              <ul className="mt-8 space-y-4 text-sm text-white/90">
                {footer.contact.map((c) => (
                  <li key={c.value} className="flex items-center gap-3">
                    {c.type === "phone" ? (
                      <PhoneIcon className="h-4 w-4 shrink-0 text-white/55" />
                    ) : (
                      <MailIcon className="h-4 w-4 shrink-0 text-white/55" />
                    )}
                    <a
                      href={c.href}
                      className="transition-colors hover:text-white"
                    >
                      {c.value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 — Office Locations */}
            <div className="lg:border-l lg:border-white/15 lg:px-8">
              <h3 className="text-base font-bold tracking-wide text-white">
                {footer.officeLocations.heading}
              </h3>
              <div className="mt-6 space-y-5 text-sm leading-relaxed text-white/85">
                {footer.officeLocations.addresses.map((lines, i) => (
                  <address key={i} className="not-italic">
                    {lines.map((line, li) => (
                      <span key={li}>
                        {line}
                        {li < lines.length - 1 && <br />}
                      </span>
                    ))}
                  </address>
                ))}
              </div>
            </div>

            {/* Column 3 — Useful Links */}
            <div className="lg:border-l lg:border-white/15 lg:px-8">
              <h3 className="text-base font-bold tracking-wide text-white">
                {footer.usefulLinks.heading}
              </h3>
              <ul className="mt-6 space-y-3 text-sm text-white/90">
                {footer.usefulLinks.items.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 — About */}
            <div className="lg:border-l lg:border-white/15 lg:pl-8">
              <h3 className="text-base font-bold tracking-wide text-white">
                {footer.about.heading}
              </h3>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/85">
                {footer.about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back-to-top button — straddles the boundary between dark area and white band */}
      <div className="relative bg-white">
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={footer.backToTopLabel}
          className="absolute left-1/2 top-0 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#0b2545] text-white shadow-lg ring-4 ring-white transition-colors hover:bg-[#1e3a8a] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0b2545]/40"
        >
          <ArrowUpIcon className="h-5 w-5" />
        </button>

        {/* Copyright band */}
        <div className="mx-auto max-w-7xl px-6 py-5 text-center text-xs text-slate-500">
          {footer.copyright.prefix}{" "}
          <span className="font-semibold text-slate-700">
            {footer.copyright.highlight}
          </span>{" "}
          {footer.copyright.suffix}
        </div>
      </div>
    </footer>
  );
}
