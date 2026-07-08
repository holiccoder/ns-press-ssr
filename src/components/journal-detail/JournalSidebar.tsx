import type {
  Contact,
  EditorialBoardMember,
  EditorInChief,
  NewsItem,
} from "@/lib/journal-slugs";
import ContactCard from "./ContactCard";
import EditorialBoardCard from "./EditorialBoardCard";
import NewsList from "./NewsList";

export default function JournalSidebar({
  chiefEditors,
  boardMembers,
  contacts,
  news,
}: {
  chiefEditors?: EditorInChief[];
  boardMembers?: EditorialBoardMember[];
  contacts?: Contact[];
  news?: NewsItem[];
}) {
  return (
    <aside className="space-y-8">
      <EditorialBoardCard
        chiefEditors={chiefEditors}
        boardMembers={boardMembers}
      />
      <ContactCard contacts={contacts} />
      <NewsList news={news} />
    </aside>
  );
}
