import { permanentRedirect } from "next/navigation";

type RouteParams = { id: string };

export default async function LegacyJournalPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { id } = await params;
  permanentRedirect(`/journals/${encodeURIComponent(id)}`);
}
