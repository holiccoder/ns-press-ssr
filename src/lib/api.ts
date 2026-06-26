// Thin server-side wrappers around the api.ns-press.com index endpoints.
// All calls run during SSR; results are cached for 5 minutes via Next's
// extended fetch. Timeouts and HTTP failures are converted into ApiError so
// callers can decide between rethrowing and falling back gracefully.

const API_BASE = "https://api.ns-press.com/api/index";
const DEFAULT_REVALIDATE = 300; // seconds
const DEFAULT_TIMEOUT_MS = 8000;
const DEFAULT_RETRIES = 1; // one retry on transient network failure

export type Lang = "中文" | "English";

export type JournalListItem = {
  id: number;
  cover_image: string;
  title: string;
  issn: string;
  frequency: string;
  lang: string;
};

export type BookListItem = {
  id: number;
  title: string;
  ISSN: string;
  lang: string;
  introduction: string;
  publication_time: string;
  cover_image: string;
};

export type JournalDetail = {
  id: number;
  cover_image: string;
  title: string;
  issn: string;
  frequency: string;
  create_time: string;
  status: number;
  introduction: string;
  scope: string;
  policy: string;
};

export type JournalContentSummary = {
  id: number;
  title: string;
  author: string;
};

export type JournalContentDetail = {
  id: number;
  journal_id: number;
  year: string;
  periods: number;
  title: string;
  author: string;
  address: string;
  abstract: string;
  keywords: string;
  references: string[];
  doi?: string;
  content?: string;
  Journal?: {
    id: number;
    title: string;
  };
};

type ApiEnvelope<T> = {
  code: number;
  show: number;
  msg: string;
  data: T;
};

export type PagedData<T> = {
  lists: T[];
  count: number;
  page_no: number;
  page_size: number;
  extend: unknown[];
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly path: string,
    public readonly cause?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchWithTimeout(
  url: string,
  timeoutMs: number,
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      next: { revalidate: DEFAULT_REVALIDATE },
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}

async function apiGet<T>(
  path: string,
  params: Record<string, string | number>,
  baseUrl: string = API_BASE,
): Promise<T> {
  const url = new URL(`${baseUrl}/${path}`);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, String(v));
  }
  const target = url.toString();

  let lastErr: unknown;
  for (let attempt = 0; attempt <= DEFAULT_RETRIES; attempt++) {
    try {
      const res = await fetchWithTimeout(target, DEFAULT_TIMEOUT_MS);
      if (!res.ok) {
        throw new ApiError(
          `API ${path} failed: ${res.status} ${res.statusText}`,
          path,
        );
      }
      const body = (await res.json()) as ApiEnvelope<T>;
      if (body.code !== 1) {
        throw new ApiError(
          `API ${path} returned code=${body.code}: ${body.msg}`,
          path,
        );
      }
      return body.data;
    } catch (err) {
      lastErr = err;
      // Don't retry on explicit API errors (bad code / non-2xx); only retry
      // network-level failures (TypeError / AbortError).
      if (err instanceof ApiError) break;
    }
  }
  throw new ApiError(
    `API ${path} unreachable: ${
      lastErr instanceof Error ? lastErr.message : String(lastErr)
    }`,
    path,
    lastErr,
  );
}

export function getJournalList(opts?: {
  page?: number;
  pageSize?: number;
  lang?: Lang;
}): Promise<PagedData<JournalListItem>> {
  return apiGet<PagedData<JournalListItem>>("journalList", {
    page: opts?.page ?? 1,
    pageSize: opts?.pageSize ?? 12,
    lang: opts?.lang ?? "中文",
  });
}

export function getBookList(opts?: {
  page?: number;
  pageSize?: number;
  lang?: Lang;
}): Promise<PagedData<BookListItem>> {
  return apiGet<PagedData<BookListItem>>("bookList", {
    page: opts?.page ?? 1,
    pageSize: opts?.pageSize ?? 8,
    lang: opts?.lang ?? "中文",
  });
}

export function getJournalDetail(
  id: number,
  lang: Lang = "中文",
): Promise<JournalDetail> {
  return apiGet<JournalDetail>("journalDetail", { id, lang });
}

export function getJournalContents(opts: {
  journalId: number;
  pageNo?: number;
  pageSize?: number;
  lang?: Lang;
}): Promise<PagedData<JournalContentSummary>> {
  return apiGet<PagedData<JournalContentSummary>>("journalContents", {
    journal_id: opts.journalId,
    page_no: opts.pageNo ?? 1,
    page_size: opts.pageSize ?? 10,
    lang: opts.lang ?? "中文",
  });
}

export function getJournalContentDetail(
  id: number,
  lang: Lang = "中文",
): Promise<JournalContentDetail> {
  return apiGet<JournalContentDetail>("journalContentDetail", { id, lang });
}

export type LatestSubmission = {
  id: number;
  journal_name: string;
  paper_title: string;
  author_list: string;
  abstract: string;
  keywords: string;
  file: string;
  create_time: string;
  status: number;
  real_name: string;
  mobile: string;
  email: string;
};

export function getLatestSubmissions(): Promise<LatestSubmission[]> {
  return apiGet<LatestSubmission[]>("latestSubmissions", {});
}

export type ArticleListItem = {
  id: number;
  cid: number;
  title: string;
  desc: string;
  image: string;
  click: number;
  collect: boolean;
  create_time: string;
};

const ARTICLE_API_BASE = "https://api.ns-press.com/api";

export function getArticleList(opts?: {
  pageNo?: number;
  pageSize?: number;
  sort?: "new" | "hot";
}): Promise<PagedData<ArticleListItem>> {
  return apiGet<PagedData<ArticleListItem>>(
    "article/lists",
    {
      page_no: opts?.pageNo ?? 1,
      page_size: opts?.pageSize ?? 5,
      sort: opts?.sort ?? "new",
    },
    ARTICLE_API_BASE,
  );
}

export type ArticleDetail = {
  id: number;
  cid: number;
  title: string;
  desc: string;
  abstract: string;
  image: string;
  author: string;
  content: string;
  click: number;
  collect: boolean;
  is_show: number;
  sort: number;
  create_time: string;
  update_time: string;
  delete_time: string | null;
};

export function getArticleDetail(id: number): Promise<ArticleDetail> {
  return apiGet<ArticleDetail>("article/detail", { id }, ARTICLE_API_BASE);
}

/**
 * Parse the API's ISSN string ("3106-3365(Print); 3106-3373(Online)") into
 * structured entries. Falls back to a single "ISSN" entry if no parenthetical
 * label is found.
 */
export function parseIssn(
  raw: string,
): Array<{ label: string; value: string }> {
  if (!raw) return [];
  const parts = raw
    .split(/;|\s{2,}/)
    .map((s) => s.trim())
    .filter(Boolean);

  return parts.map((part) => {
    const match = part.match(/^([\dA-Z-]+)\s*\(([^)]+)\)/i);
    if (match) return { label: match[2], value: match[1] };
    return { label: "ISSN", value: part };
  });
}
