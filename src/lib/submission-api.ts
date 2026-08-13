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
export type SubmissionContact = {
  name: string;
  mobile: string;
  email: string;
};

function firstNonEmptyValue(source: Record<string, unknown>, keys: string[]): string {
  for (const key of keys) {
    const value = source[key];
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return String(value).trim();
    }
  }
  return "";
}

export function normalizeSubmissionContact(source: object): SubmissionContact {
  const values = source as Record<string, unknown>;
  return {
    name: firstNonEmptyValue(values, ["real_name", "name", "realName"]),
    mobile: firstNonEmptyValue(values, ["mobile", "phone", "telephone"]),
    email: firstNonEmptyValue(values, ["email", "account", "user_email"]),
  };
}

export function appendSubmissionContactFields(
  formData: FormData,
  contact: SubmissionContact,
): void {
  formData.append("name", contact.name);
  formData.append("real_name", contact.name);
  formData.append("mobile", contact.mobile);
  formData.append("phone", contact.mobile);
  formData.append("email", contact.email);
  formData.append("account", contact.email);
}

function isRecord(value: unknown): value is SubmissionRecord {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

export function extractSubmissionList(body: unknown, depth = 0): SubmissionRecord[] {
  if (Array.isArray(body)) return body.filter(isRecord);
  if (!isRecord(body) || depth > 3) return [];

  for (const key of ["data", "list", "rows", "lists", "records", "result"]) {
    const list = extractSubmissionList(body[key], depth + 1);
    if (list.length > 0 || Array.isArray(body[key])) return list;
  }

  return [];
}

function token(): string {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem("authToken") ?? "";
}

function languageValue(lang: "en" | "zh"): string {
  return lang === "zh" ? "中文" : "English";
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
  const body = await readResponse<unknown>(response);
  return extractSubmissionList(body);
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
