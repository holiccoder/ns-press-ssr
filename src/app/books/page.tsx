import type { Metadata } from "next";
import BooksList from "@/components/BooksList";

export const metadata: Metadata = {
  title: "Books — NSP",
  description:
    "Browse NSP's portfolio of published textbooks and academic books.",
};

export default function BooksPage() {
  return (
    <main className="flex flex-1 flex-col">
      <BooksList />
    </main>
  );
}
