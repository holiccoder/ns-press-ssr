import type {
  Contact,
  EditorialBoardMember,
  EditorInChief,
} from "@/lib/journal-slugs";
import type { JournalDatabase } from "@/lib/api";
import ContactCard from "./ContactCard";
import DatabaseLogos from "./DatabaseLogos";
import EditorialBoardCard from "./EditorialBoardCard";
import IssueFilter, { type IssueSelection } from "./IssueFilter";

export default function JournalSidebar({
  journalId,
  chiefEditors,
  boardMembers,
  contacts,
  databases,
  years,
  periodsMap,
  issueSelection,
}: {
  journalId: number;
  chiefEditors?: EditorInChief[];
  boardMembers?: EditorialBoardMember[];
  contacts?: Contact[];
  databases?: JournalDatabase[];
  years?: string[];
  periodsMap?: Record<string, number[]>;
  issueSelection?: IssueSelection;
}) {
  const hasIssues = Array.isArray(years) && years.length > 0;

  return (
    <aside className="space-y-8">
      {hasIssues && (
        <IssueFilter
          journalId={journalId}
          years={years!}
          periodsMap={periodsMap ?? {}}
          selection={issueSelection}
        />
      )}
      <DatabaseLogos databases={databases} />
      <EditorialBoardCard
        chiefEditors={chiefEditors}
        boardMembers={boardMembers}
        viewAllHref={`/journals/${journalId}?tab=editorial`}
      />
      <ContactCard contacts={contacts} />
    </aside>
  );
}
