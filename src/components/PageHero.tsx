import Link from "next/link";

type BreadcrumbItem = { label: string; href?: string };

export default function PageHero({
  title,
  breadcrumb,
}: {
  title: string;
  breadcrumb: BreadcrumbItem[];
}) {
  return (
    <section
      className="relative isolate overflow-hidden text-white"
      style={{
        backgroundImage: [
          "radial-gradient(ellipse 90% 60% at 50% 110%, rgba(56,189,248,0.45) 0%, rgba(11,37,69,0) 60%)",
          "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(255,255,255,0.25) 0%, rgba(11,37,69,0) 55%)",
          "linear-gradient(180deg, #0c2a52 0%, #15518f 55%, #3b82f6 100%)",
        ].join(", "),
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[55%] left-1/2 h-[120%] w-[160%] -translate-x-1/2 rounded-[50%]"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(96,165,250,0.25) 0%, rgba(30,64,175,0.15) 35%, rgba(11,37,69,0) 70%)",
          boxShadow: "inset 0 60px 120px rgba(147,197,253,0.15)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <h1 className="text-center text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h1>
        <nav
          aria-label="Breadcrumb"
          className="mt-6 text-xs text-white/80 sm:text-sm"
        >
          <ol className="flex items-center justify-center gap-2">
            {breadcrumb.map((crumb, i) => {
              const isLast = i === breadcrumb.length - 1;
              return (
                <li key={i} className="flex items-center gap-2">
                  {crumb.href && !isLast ? (
                    <Link href={crumb.href} className="hover:text-white">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                  {!isLast && (
                    <span aria-hidden className="text-white/50">&gt;</span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </section>
  );
}
