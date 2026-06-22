import Articles from "@/components/Articles";
import Hero from "@/components/Hero";
import News from "@/components/News";
import OurJournals from "@/components/OurJournals";
import ScholarTestimonials from "@/components/ScholarTestimonials";
import Services from "@/components/Services";
import SpecialIssues from "@/components/SpecialIssues";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <OurJournals />
      <SpecialIssues />
      <Articles />
      <Services />
      <ScholarTestimonials />
      <News />
    </main>
  );
}
