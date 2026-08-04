import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getJournalDetail,
  getJournalContents,
  ApiError,
  type JournalContact,
  type JournalContentSummary,
  type JournalDetail,
} from "@/lib/api";
import {
  getEnrichedSlugs,
  type Contact,
  type EditorialBoardMember,
  type EditorInChief,
  getJournalEnrichment,
  getJournalEnrichmentBySlug,
  type JournalEnrichment,
} from "@/lib/journal-slugs";
import { resolveJournalCover } from "@/lib/images";
import { getServerApiLang } from "@/lib/lang.server";
import ExRNACover from "@/components/journal-detail/ExRNACover";
import JournalBanner from "@/components/journal-detail/JournalBanner";
import JournalMainColumn from "@/components/journal-detail/JournalMainColumn";
import JournalNavTabs, {
  type JournalTabKey,
} from "@/components/journal-detail/JournalNavTabs";
import JournalSidebar from "@/components/journal-detail/JournalSidebar";

type RouteParams = { id: string };
type RouteSearchParams = { tab?: string | string[] };

const ENRICHED_SLUGS = getEnrichedSlugs();

function isKnownSlug(id: string): boolean {
  return ENRICHED_SLUGS.includes(id);
}

function buildStaticJournal(slug: string): JournalDetail {
  const enrichment = getJournalEnrichmentBySlug(slug)!;
  return {
    id: 0,
    cover_image: "",
    title: enrichment.title,
    issn: enrichment.issn,
    frequency: "",
    create_time: "",
    status: 1,
    introduction: enrichment.scope,
    scope: enrichment.scope,
    policy: "",
  };
}

function normalizeEditorialText(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function dedupeByNameAndRole<T extends { name: string; role?: string }>(
  items: T[],
): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    const key = `${item.name.toLowerCase()}|${(item.role ?? "").toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function extractEditorialTeam(team: JournalDetail["team"]): {
  chiefEditors: EditorInChief[];
  boardMembers: EditorialBoardMember[];
} {
  const chiefEditors: EditorInChief[] = [];
  const boardMembers: EditorialBoardMember[] = [];

  if (!Array.isArray(team)) {
    return { chiefEditors, boardMembers };
  }

  for (const group of team) {
    const members = group?.member;
    if (!Array.isArray(members) || members.length === 0) continue;

    const role = normalizeEditorialText(group.job) ?? "Editorial Board Member";
    const isChiefEditorGroup = /chief\s*editor|editor[-\s]*in[-\s]*chief/i.test(
      role,
    );

    for (const member of members) {
      const name = normalizeEditorialText(member?.name);
      if (!name) continue;

      const affiliation = normalizeEditorialText(member.title);
      const region = normalizeEditorialText(member.region);

      if (isChiefEditorGroup) {
        chiefEditors.push({
          name,
          role,
          portrait: "",
          affiliation,
          region,
        });
        continue;
      }

      boardMembers.push({
        name,
        role,
        affiliation,
        region,
      });
    }
  }

  return { chiefEditors, boardMembers };
}

function resolveTab(tabParam?: string | string[]): JournalTabKey {
  const value = Array.isArray(tabParam) ? tabParam[0] : tabParam;
  switch (value) {
    case "articles":
    case "about":
    case "publish":
    case "editorial":
      return value;
    default:
      return "home";
  }
}

function buildContacts(
  apiContacts: JournalContact[] | undefined,
  enrichmentContacts: Contact[] | undefined,
): Contact[] {
  if (apiContacts && apiContacts.length > 0) {
    return apiContacts.map((c) => ({
      label: c.label,
      name: c.name,
      email: c.email,
    }));
  }
  if (enrichmentContacts && enrichmentContacts.length > 0) {
    return enrichmentContacts.map((c) => ({
      ...c,
      email: "routhpub@163.com",
    }));
  }
  return [
    {
      label: "Editorial Office",
      name: "Hong Kong Natural Science Press",
      email: "routhpub@163.com",
    },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { id } = await params;
  const canonical = `/journals/${id}`;

  if (isKnownSlug(id)) {
    const enrichment = getJournalEnrichmentBySlug(id)!;
    const description = enrichment.scope.slice(0, 200);
    return {
      title: enrichment.title,
      description,
      alternates: { canonical },
      openGraph: {
        title: enrichment.title,
        description,
        url: canonical,
        type: "website",
      },
    };
  }

  const numericId = Number(id);
  if (!Number.isFinite(numericId)) {
    return { title: "Journal", alternates: { canonical } };
  }

  try {
    const lang = await getServerApiLang();
    const journal = await getJournalDetail(numericId, lang);
    const description = journal.introduction?.slice(0, 200);
    return {
      title: journal.title,
      description,
      alternates: { canonical },
      openGraph: {
        title: journal.title,
        description,
        url: canonical,
        type: "website",
        images: journal.cover_image ? [journal.cover_image] : undefined,
      },
    };
  } catch {
    return { title: "Journal", alternates: { canonical } };
  }
}

export default async function JournalDetailPage({
  params,
  searchParams,
}: {
  params: Promise<RouteParams>;
  searchParams: Promise<RouteSearchParams>;
}) {
  const { id } = await params;
  const { tab } = await searchParams;
  const activeTab = resolveTab(tab);
  const lang = await getServerApiLang();

  let journal: JournalDetail;
  let apiArticles: JournalContentSummary[] | undefined;
  let enrichment: JournalEnrichment | undefined;
  let coverSlot: React.ReactNode | undefined;

  if (isKnownSlug(id)) {
    journal = buildStaticJournal(id);
    enrichment = getJournalEnrichmentBySlug(id)!;
    if (id === "exrna") {
      coverSlot = <ExRNACover className="h-full w-full" />;
    }
  } else {
    const numericId = Number(id);
    if (!Number.isFinite(numericId) || numericId <= 0) notFound();

    const journalPromise = getJournalDetail(numericId, lang);
    const contentsPromise = getJournalContents({
      journalId: numericId,
      pageNo: 1,
      pageSize: 10,
      lang,
    }).catch((err) => {
      console.error("[journals/[id]] contents failed:", err);
      return null;
    });

    try {
      journal = await journalPromise;
    } catch (err) {
      if (err instanceof ApiError) notFound();
      throw err;
    }

    const contents = await contentsPromise;
    apiArticles = contents?.lists;
    enrichment = getJournalEnrichment(journal.title);
  }

  const scope = journal.scope ?? journal.introduction ?? enrichment?.scope ?? "";
  const editorialTeam = extractEditorialTeam(journal.team);
  const chiefEditors = dedupeByNameAndRole([
    ...(enrichment?.editorInChief ? [enrichment.editorInChief] : []),
    ...editorialTeam.chiefEditors,
  ]);
  const boardMembers = dedupeByNameAndRole([
    ...(enrichment?.editorialBoardMembers ?? []),
    ...editorialTeam.boardMembers,
  ]);
  const contacts = buildContacts(journal.contacts, enrichment?.contacts);

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ns-press.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Periodical",
    name: journal.title,
    issn: journal.issn || undefined,
    description: scope || undefined,
    url: `${siteUrl}/journals/${id}`,
    publisher: {
      "@type": "Organization",
      name: "Hong Kong Natural Science Press Limited",
      url: siteUrl,
    },
  };

  return (
    <main className="flex flex-1 flex-col bg-white pb-12 sm:pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <JournalBanner
        title={journal.title}
        issn={journal.issn}
        frequency={journal.frequency}
        coden={enrichment?.coden}
        citeScore={enrichment?.citeScore}
        coverImage={resolveJournalCover(journal.id, journal.cover_image)}
        coverSlot={coverSlot}
      />

      <JournalNavTabs journalId={journal.id} activeTab={activeTab} />

      <section className="mx-auto w-full max-w-7xl px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          <JournalSidebar
            journalId={journal.id}
            chiefEditors={chiefEditors.length > 0 ? chiefEditors : undefined}
            boardMembers={boardMembers.length > 0 ? boardMembers : undefined}
            contacts={contacts}
            databases={enrichment?.databases ?? journal.databases}
          />

          <JournalMainColumn
            scope={scope}
            latestArticles={enrichment?.latestArticles}
            topDownloaded={enrichment?.topDownloaded}
            apiArticles={apiArticles}
            journalId={journal.id}
            activeTab={activeTab}
            policy={journal.policy}
            chiefEditors={chiefEditors.length > 0 ? chiefEditors : undefined}
            boardMembers={boardMembers.length > 0 ? boardMembers : undefined}
          />
        </div>
      </section>
    </main>
  );
}
