import type { Metadata } from "next";
import type { ReactElement } from "react";
import PageHero from "@/components/PageHero";
import about from "@/data/about.json";
import { getServerUiLang } from "@/lib/lang.server";

export const metadata: Metadata = {
  title: "About NSP",
  description:
    "About NSP — company profile and background of Hong Kong Natural Science Press.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About NSP",
    description:
      "About NSP — company profile and background of Hong Kong Natural Science Press.",
    url: "/about",
    type: "website",
  },
};

/* ---------- Company profile ---------- */

function CompanyProfile({ lang }: { lang: string }) {
  const isZh = lang === "zh";
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl md:text-4xl">
          {isZh ? about.companyProfile.titleZh : about.companyProfile.title}
        </h2>
        <div className="mt-10 space-y-10 text-base leading-relaxed text-slate-700 sm:text-[17px]">
          {about.companyProfile.sections.map((section, i) => (
            <div key={i} className="space-y-4">
              <h3 className="text-xl font-bold text-[#0b2545]">
                {isZh ? section.headingZh : section.heading}
              </h3>
              {section.paragraphs.map((p, pi) => (
                <p key={pi}>{p}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact icons ---------- */

function AddressIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function EmailIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function PostalIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}

function WebsiteIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

const ICONS: Record<string, (props: { className?: string }) => ReactElement> = {
  address: AddressIcon,
  phone: PhoneIcon,
  email: EmailIcon,
  postal: PostalIcon,
  website: WebsiteIcon,
};

/* ---------- Contact information ---------- */

function ContactInfo({ lang }: { lang: string }) {
  const isZh = lang === "zh";
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="text-center text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl md:text-4xl">
          {isZh ? about.contact.titleZh : about.contact.title}
        </h2>
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {about.contact.items.map((item) => {
            const Icon = ICONS[item.type] ?? AddressIcon;
            const content = item.href ? (
              <a
                href={item.href}
                className="break-words font-medium text-[#0b2545] hover:text-[#1d4ed8] hover:underline"
              >
                {item.value}
              </a>
            ) : (
              <span className="break-words font-medium text-[#0b2545]">{item.value}</span>
            );
            return (
              <li
                key={item.label}
                className="flex items-start gap-4 rounded-md border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#0b2545]/5 text-[#0b2545]">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {isZh ? item.labelZh : item.label}
                  </p>
                  <div className="mt-1 text-sm leading-relaxed text-slate-700 sm:text-base">
                    {content}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

export default async function AboutPage() {
  const lang = await getServerUiLang();
  return (
    <main className="flex flex-1 flex-col">
      <PageHero
        title={about.hero.title}
        breadcrumb={about.hero.breadcrumb}
      />
      <CompanyProfile lang={lang} />
      <ContactInfo lang={lang} />
    </main>
  );
}
