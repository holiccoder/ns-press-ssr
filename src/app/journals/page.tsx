import type { Metadata } from "next";
import JournalsCarousel from "@/components/JournalsCarousel";
import JournalsList from "@/components/JournalsList";

export const metadata: Metadata = {
  title: "Journals — ELSP",
  description:
    "Browse ELSP's portfolio of peer-reviewed open access academic journals.",
};

export default function JournalsPage() {
  return (
    <main className="flex flex-1 flex-col">
      <JournalsCarousel />
      <JournalsList />
    </main>
  );
}
