const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.ns-press.com/api";

type ApiEnvelope<T> = {
  code?: number;
  msg?: string;
  data?: T;
  list?: T;
  rows?: T;
};

export type SubmissionRecord = Record<string, unknown>;
export type SubmissionJournal = {
  id: number | string;
  title?: string;
  name?: string;
  label?: string;
};

function token(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem("authToken") ?? "";
}

function languageValue(lang: "en" | "zh"): string {
  return lang === "zh" ? "涓枃" : "English";
}

async function readResponse<T>(response: Response): Promise<T> {
  const body = (await response.json()) as ApiEnvelope<T> | T;
  if (!response.ok) throw new Error(`Request failed with ${response.status}`);

  if (
    body &&
    typeof body === "object" &&
    "code" in body &&
    typeof (body as ApiEnvelope<T>).code === "number" &&
    (body as ApiEnvelope<T>).code !== 1
  ) {
    throw new Error((body as ApiEnvelope<T>).msg || "Request failed");
  }

  return body as T;
}

export async function getMySubmissions(lang: "en" | "zh") {
  const authToken = token();
  const params = new URLSearchParams({ lang: languageValue(lang) });
  if (authToken) params.set("token", authToken);
  const response = await fetch(
    `${API_BASE}/index/myContributions?${params.toString()}`,
    {
      cache: "no-store",
      headers: authToken ? { token: authToken } : undefined,
    },
  );
  const body = await readResponse<
    SubmissionRecord[] | { data?: SubmissionRecord[]; list?: SubmissionRecord[]; rows?: SubmissionRecord[] }
  >(response);

  if (Array.isArray(body)) return body;
  if (Array.isArray(body.data)) return body.data;
  if (Array.isArray(body.list)) return body.list;
  if (Array.isArray(body.rows)) return body.rows;
  return [];
}

export async function getSubmissionJournals(lang: "en" | "zh") {
  const params = new URLSearchParams({
    page: "1",
    pageSize: "200",
    lang: languageValue(lang),
  });
  const response = await fetch(`${API_BASE}/index/journalList?${params}`, {
    cache: "no-store",
  });
  const body = await readResponse<{
    lists?: SubmissionJournal[];
    data?: { lists?: SubmissionJournal[] };
  }>(response);
  return body.lists ?? body.data?.lists ?? [];
}

export async function getSubmissionCaptcha(lang: "en" | "zh") {
  const response = await fetch(
    `${API_BASE}/index/captcha?lang=${encodeURIComponent(languageValue(lang))}`,
    { cache: "no-store" },
  );
  const body = await readResponse<{ image?: string } | { data?: { image?: string } }>(response);
  const wrapped = body as { data?: { image?: string } };
  return wrapped.data?.image ?? (body as { image?: string }).image ?? "";
}

export async function uploadSubmissionFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const authToken = token();
  const response = await fetch(`${API_BASE}/upload/file`, {
    method: "POST",
    body: formData,
    headers: authToken ? { token: authToken } : undefined,
  });
  const body = await readResponse<{
    data?: { uri?: string; url?: string; path?: string };
    uri?: string;
    url?: string;
    path?: string;
  }>(response);
  return body.data?.uri ?? body.data?.url ?? body.data?.path ?? body.uri ?? body.url ?? body.path ?? "";
}

export async function submitArticle(formData: FormData, lang: "en" | "zh") {
  formData.append("lang", languageValue(lang));
  const authToken = token();
  if (authToken) formData.append("token", authToken);
  const response = await fetch(`${API_BASE}/index/contribute`, {
    method: "POST",
    body: formData,
    headers: authToken ? { token: authToken } : undefined,
  });
  return readResponse<{ msg?: string }>(response);
}

export async function getSubmissionGuidelines(
  lang: "en" | "zh",
): Promise<Record<string, string>> {
  const response = await fetch(
    `${API_BASE}/index/policyInfo?lang=${encodeURIComponent(languageValue(lang))}`,
    { cache: "no-store" },
  );
  const body = await readResponse<
    Record<string, string> | { data?: Record<string, string> }
  >(response);
  const wrapped = body as { data?: Record<string, string> };
  return wrapped.data ?? (body as Record<string, string>);
}
