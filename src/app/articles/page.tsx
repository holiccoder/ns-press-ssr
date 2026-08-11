import type { Metadata } from "next";
import Articles from "@/components/Articles";

export const metadata: Metadata = {
  title: "Articles",
  description: "Latest articles published by Hong Kong Natural Science Press.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return <main className="flex flex-1 flex-col"><Articles showMore={false} /></main>;
}
