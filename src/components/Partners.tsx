import Image from "next/image";
import home from "@/data/home.json";

const { partners } = home;

export default function Partners() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl md:text-4xl">
          {partners.title}
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {partners.items.map((logo) => (
            <div
              key={logo.src}
              className="flex w-full items-center justify-center p-4 opacity-90 transition-opacity hover:opacity-100"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={80}
                className="h-16 w-auto max-w-full object-contain sm:h-20"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
