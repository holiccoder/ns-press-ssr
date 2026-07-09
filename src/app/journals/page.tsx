import type { Metadata } from "next";
import JournalsCarousel from "@/components/JournalsCarousel";
import JournalsList from "@/components/JournalsList";

export const metadata: Metadata = {
  title: "Journals",
  description:
    "Browse NSP's portfolio of peer-reviewed open access academic journals.",
  alternates: { canonical: "/journals" },
  openGraph: {
    title: "Journals",
    description:
      "Browse NSP's portfolio of peer-reviewed open access academic journals.",
    url: "/journals",
    type: "website",
  },
};

export default function JournalsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <JournalsCarousel />
      <JournalsList />
    </main>
  );
}
