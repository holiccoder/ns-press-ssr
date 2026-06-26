import Articles from "@/components/Articles";
import Hero from "@/components/Hero";
import News from "@/components/News";
import OurJournals from "@/components/OurJournals";
import Partners from "@/components/Partners";
import ScholarTestimonials from "@/components/ScholarTestimonials";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Services />
      <OurJournals />
      <Articles />
      <ScholarTestimonials />
      <Partners />
      <News />
    </main>
  );
}
