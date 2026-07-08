import Articles from "@/components/Articles";
import Hero from "@/components/Hero";
import News from "@/components/News";
import OurJournals from "@/components/OurJournals";
import Partners from "@/components/Partners";
import Services from "@/components/Services";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <Services />
      <OurJournals />
      <Articles />
      <Partners />
      <News />
    </main>
  );
}
