import type {
  Contact,
  EditorialBoardMember,
  EditorInChief,
} from "@/lib/journal-slugs";
import type { JournalDatabase } from "@/lib/api";
import ContactCard from "./ContactCard";
import DatabaseLogos from "./DatabaseLogos";
import EditorialBoardCard from "./EditorialBoardCard";

export default function JournalSidebar({
  journalId,
  chiefEditors,
  boardMembers,
  contacts,
  databases,
}: {
  journalId: number;
  chiefEditors?: EditorInChief[];
  boardMembers?: EditorialBoardMember[];
  contacts?: Contact[];
  databases?: JournalDatabase[];
}) {
  return (
    <aside className="space-y-8">
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
