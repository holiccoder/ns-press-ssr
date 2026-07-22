import Image from "next/image";
import Link from "next/link";
import type {
  EditorialBoardMember,
  EditorInChief,
} from "@/lib/journal-slugs";

export default function EditorialBoardCard({
  chiefEditors,
  boardMembers,
  viewAllHref,
}: {
  chiefEditors?: EditorInChief[];
  boardMembers?: EditorialBoardMember[];
  viewAllHref?: string;
}) {
  const chiefEditorList = chiefEditors ?? [];
  const boardMemberList = boardMembers ?? [];
  const hasChiefEditors = chiefEditorList.length > 0;
  const hasBoardMembers = boardMemberList.length > 0;
  if (!hasChiefEditors && !hasBoardMembers) return null;

  const firstChief = chiefEditorList[0];

  return (
    <div className="space-y-4">
      <h2 className="text-base font-bold text-[#0b2545]">Editorial Board</h2>

      {hasChiefEditors && firstChief && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Chief Editor
          </h3>

          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-slate-200 to-slate-300 ring-2 ring-white shadow-md">
              {firstChief.portrait ? (
                <Image
                  src={firstChief.portrait}
                  alt={firstChief.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              ) : (
                <span className="flex h-full w-full items-center justify-center text-xs font-bold text-slate-600">
                  {firstChief.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
              )}
            </div>

            <div className="text-sm">
              <p className="font-semibold text-[#0b2545]">{firstChief.name}</p>
              <p className="text-slate-500">{firstChief.role}</p>
              {firstChief.affiliation && (
                <p className="text-slate-500">{firstChief.affiliation}</p>
              )}
            </div>
          </div>

          {viewAllHref &&
            (chiefEditorList.length > 1 || boardMemberList.length > 0) && (
            <Link
              href={viewAllHref}
              className="inline-block text-sm font-medium text-[#1d4ed8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
            >
              View all editorial board members
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
