import Image from "next/image";
import type { JournalDatabase } from "@/lib/api";

export default function DatabaseLogos({
  databases,
}: {
  databases?: JournalDatabase[];
}) {
  if (!databases || databases.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-base font-bold text-[#0b2545]">Indexed In</h2>
      <div className="flex flex-wrap items-center gap-3">
        {databases.map((db) => {
          const inner = (
            <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 shadow-sm transition-shadow hover:shadow">
              <Image
                src={db.src}
                alt={db.name}
                width={80}
                height={32}
                className="h-6 w-auto object-contain"
              />
            </div>
          );

          if (db.href && db.href !== "#") {
            return (
              <a
                key={db.id}
                href={db.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                {inner}
              </a>
            );
          }

          return <div key={db.id}>{inner}</div>;
        })}
      </div>
    </div>
  );
}
