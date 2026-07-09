import type { Metadata } from "next";
import BooksList from "@/components/BooksList";

export const metadata: Metadata = {
  title: "Books",
  description:
    "Browse NSP's portfolio of published textbooks and academic books.",
  alternates: { canonical: "/books" },
  openGraph: {
    title: "Books",
    description:
      "Browse NSP's portfolio of published textbooks and academic books.",
    url: "/books",
    type: "website",
  },
};

export default function BooksPage() {
  return (
    <main className="flex flex-1 flex-col">
      <BooksList />
    </main>
  );
}
