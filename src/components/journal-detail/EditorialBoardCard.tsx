import Image from "next/image";
import type { EditorInChief } from "@/lib/journal-slugs";

export default function EditorialBoardCard({
  editor,
}: {
  editor?: EditorInChief;
}) {
  if (!editor) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-base font-bold text-[#0b2545]">Editorial Board</h2>

      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-slate-200 to-slate-300 ring-2 ring-white shadow-md">
          {editor.portrait ? (
            <Image
              src={editor.portrait}
              alt={editor.name}
              fill
              sizes="64px"
              className="object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-xs font-bold text-slate-600">
              {editor.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </span>
          )}
        </div>

        <div className="text-sm">
          <p className="font-semibold text-[#0b2545]">{editor.name}</p>
          <p className="text-slate-500">{editor.role}</p>
        </div>
      </div>

      <a
        href="#editorial-board"
        className="inline-block text-sm font-medium text-[#1d4ed8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
      >
        View full editorial board
      </a>
    </div>
  );
}
