import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getJournalDetail,
  getJournalContents,
  ApiError,
  type JournalContentSummary,
  type JournalDetail,
} from "@/lib/api";
import {
  getEnrichedSlugs,
  getJournalEnrichment,
  getJournalEnrichmentBySlug,
  type JournalEnrichment,
} from "@/lib/journal-slugs";
import { resolveJournalCover } from "@/lib/images";
import ExRNACover from "@/components/journal-detail/ExRNACover";
import JournalBanner from "@/components/journal-detail/JournalBanner";
import JournalMainColumn from "@/components/journal-detail/JournalMainColumn";
import JournalNavTabs from "@/components/journal-detail/JournalNavTabs";
import JournalSidebar from "@/components/journal-detail/JournalSidebar";

type RouteParams = { id: string };

const ENRICHED_SLUGS = getEnrichedSlugs();

function isNumericId(id: string): boolean {
  return /^\d+$/.test(id);
}

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

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { id } = await params;

  if (isKnownSlug(id)) {
    const enrichment = getJournalEnrichmentBySlug(id)!;
    return {
      title: `${enrichment.title} — NS Press`,
      description: enrichment.scope.slice(0, 200),
    };
  }

  const numericId = Number(id);
  if (!Number.isFinite(numericId)) return { title: "Journal — NS Press" };

  try {
    const journal = await getJournalDetail(numericId, "中文");
    return {
      title: `${journal.title} — NS Press`,
      description: journal.introduction?.slice(0, 200),
    };
  } catch {
    return { title: "Journal — NS Press" };
  }
}

export default async function JournalDetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { id } = await params;

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

    const journalPromise = getJournalDetail(numericId, "中文");
    const contentsPromise = getJournalContents({
      journalId: numericId,
      pageNo: 1,
      pageSize: 10,
      lang: "中文",
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

  const scope = enrichment?.scope ?? journal.scope ?? journal.introduction ?? "";

  return (
    <main className="flex flex-1 flex-col bg-white pb-12 sm:pb-16">
      <JournalBanner
        title={journal.title}
        issn={journal.issn}
        frequency={journal.frequency}
        coden={enrichment?.coden}
        citeScore={enrichment?.citeScore}
        coverImage={resolveJournalCover(journal.id, journal.cover_image)}
        coverSlot={coverSlot}
      />

      <JournalNavTabs journalId={journal.id} />

      <section className="mx-auto w-full max-w-7xl px-6 py-8 sm:py-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-slate-500">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link
                href="/"
                className="hover:text-[#0b2545] hover:underline"
              >
                Home
              </Link>
            </li>
            <li aria-hidden className="text-slate-400">
              &gt;
            </li>
            <li>
              <Link
                href="/journals"
                className="hover:text-[#0b2545] hover:underline"
              >
                Journals
              </Link>
            </li>
            <li aria-hidden className="text-slate-400">
              &gt;
            </li>
            <li className="font-medium text-slate-700">{journal.title}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          <JournalSidebar
            editor={enrichment?.editorInChief}
            contacts={enrichment?.contacts}
            news={enrichment?.news}
          />

          <JournalMainColumn
            scope={scope}
            latestArticles={enrichment?.latestArticles}
            topDownloaded={enrichment?.topDownloaded}
            apiArticles={apiArticles}
            journalId={journal.id}
          />
        </div>

        {/* Editorial policy (API-only content) */}
        {journal.policy && (
          <section className="mt-12">
            <h2 className="text-lg font-bold text-[#0b2545]">
              Editorial Policy
            </h2>
            <div
              className="prose prose-sm mt-3 max-w-none text-slate-700 prose-strong:text-slate-900 sm:prose-base"
              dangerouslySetInnerHTML={{ __html: journal.policy }}
            />
          </section>
        )}
      </section>
    </main>
  );
}
