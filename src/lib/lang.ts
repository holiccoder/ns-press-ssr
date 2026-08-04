// Shared language types and utilities used by both client and server code.
// Keep this file free of server-only imports (e.g. next/headers).

export type UiLang = "en" | "zh";
export type ApiLang = "English" | "中文";

export const COOKIE_NAME = "lang";
export const STORAGE_KEY = "ns-press:lang";

export function toApiLang(uiLang: UiLang): ApiLang {
  return uiLang === "zh" ? "中文" : "English";
}

export function toUiLang(apiLang: ApiLang): UiLang {
  return apiLang === "中文" ? "zh" : "en";
}
