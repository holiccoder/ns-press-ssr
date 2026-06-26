import type {
  Contact,
  EditorInChief,
  NewsItem,
} from "@/lib/journal-slugs";
import ContactCard from "./ContactCard";
import EditorialBoardCard from "./EditorialBoardCard";
import NewsList from "./NewsList";

export default function JournalSidebar({
  editor,
  contacts,
  news,
}: {
  editor?: EditorInChief;
  contacts?: Contact[];
  news?: NewsItem[];
}) {
  return (
    <aside className="space-y-8">
      <EditorialBoardCard editor={editor} />
      <ContactCard contacts={contacts} />
      <NewsList news={news} />
    </aside>
  );
}
