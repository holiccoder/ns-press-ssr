import type { Metadata } from "next";
import Articles from "@/components/Articles";
import Hero from "@/components/Hero";
import News from "@/components/News";
import OurJournals from "@/components/OurJournals";
import Partners from "@/components/Partners";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "Natural Science Press",
  description:
    "Hong Kong Natural Science Press publishes peer-reviewed open access journals and academic books across the natural, engineering, and biomedical sciences.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Natural Science Press",
    description:
      "Peer-reviewed open access journals and academic books from Hong Kong Natural Science Press.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      <div className="animate-fade-in-up">
        <Hero />
      </div>
      <div className="animate-fade-in-up delay-100">
        <Services />
      </div>
      <div className="animate-fade-in-up delay-200">
        <OurJournals />
      </div>
      <div className="animate-fade-in-up delay-300">
        <Articles />
      </div>
      <div className="animate-fade-in-up delay-400">
        <Partners />
      </div>
      <div className="animate-fade-in-up delay-500">
        <News />
      </div>
    </main>
  );
}
