import Image from "next/image";

const PARTNER_LOGOS = [
  { src: "/partners/01.jpg", alt: "Partner logo 1" },
  { src: "/partners/02.png", alt: "Partner logo 2" },
  { src: "/partners/03.jpg", alt: "Partner logo 3" },
  { src: "/partners/04.png", alt: "Partner logo 4" },
  { src: "/partners/07.jpg", alt: "Partner logo 5" },
  { src: "/partners/08.png", alt: "Partner logo 6" },
  { src: "/partners/09.png", alt: "Partner logo 7" },
  { src: "/partners/10.png", alt: "Partner logo 8" },
];

export default function Partners() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl md:text-4xl">
          Our Partners
        </h2>

        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {PARTNER_LOGOS.map((logo) => (
            <div
              key={logo.src}
              className="flex w-full items-center justify-center p-4 transition-opacity hover:opacity-100 opacity-90"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={280}
                height={160}
                className="h-auto w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
