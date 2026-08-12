import type { Metadata } from "next";
import Articles from "@/components/Articles";

export const metadata: Metadata = {
  title: "Articles",
  description: "Latest articles published by Hong Kong Natural Science Press.",
  alternates: { canonical: "/articles" },
};

type RouteSearchParams = {
  page?: string | string[];
};

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function resolvePage(value?: string): number {
  const page = Number(value);
  return Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<RouteSearchParams>;
}) {
  const { page } = await searchParams;

  return (
    <main className="flex flex-1 flex-col">
      <Articles showMore={false} page={resolvePage(firstParam(page))} />
    </main>
  );
}
