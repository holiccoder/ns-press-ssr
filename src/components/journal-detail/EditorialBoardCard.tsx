import Image from "next/image";
import type {
  EditorialBoardMember,
  EditorInChief,
} from "@/lib/journal-slugs";

export default function EditorialBoardCard({
  chiefEditors,
  boardMembers,
}: {
  chiefEditors?: EditorInChief[];
  boardMembers?: EditorialBoardMember[];
}) {
  const chiefEditorList = chiefEditors ?? [];
  const boardMemberList = boardMembers ?? [];
  const hasChiefEditors = chiefEditorList.length > 0;
  const hasBoardMembers = boardMemberList.length > 0;
  if (!hasChiefEditors && !hasBoardMembers) return null;

  return (
    <div className="space-y-4">
      <h2 className="text-base font-bold text-[#0b2545]">Editorial Board</h2>

      {hasChiefEditors && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {chiefEditorList.length > 1 ? "Chief Editors" : "Chief Editor"}
          </h3>

          <div className="space-y-3">
            {chiefEditorList.map((chief) => (
              <div key={`${chief.name}-${chief.role}`} className="flex items-center gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-slate-200 to-slate-300 ring-2 ring-white shadow-md">
                  {chief.portrait ? (
                    <Image
                      src={chief.portrait}
                      alt={chief.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-xs font-bold text-slate-600">
                      {chief.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  )}
                </div>

                <div className="text-sm">
                  <p className="font-semibold text-[#0b2545]">{chief.name}</p>
                  <p className="text-slate-500">{chief.role}</p>
                  {chief.affiliation && (
                    <p className="text-slate-500">{chief.affiliation}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {hasBoardMembers && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Editorial Board Members
          </h3>
          <ul className="space-y-2 text-sm">
            {boardMemberList.map((member) => (
              <li key={`${member.name}-${member.affiliation}`} className="text-slate-700">
                <p className="font-medium text-[#0b2545]">{member.name}</p>
                {member.affiliation && (
                  <p className="text-slate-500">{member.affiliation}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
