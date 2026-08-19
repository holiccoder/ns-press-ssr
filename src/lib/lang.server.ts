import { type ApiLang, type UiLang, toApiLang } from "./lang";

/**
 * Site is English-only; the language switcher has been removed.
 */
export async function getServerUiLang(): Promise<UiLang> {
  return "en";
}

/**
 * Return the API-facing language string for the current request.
 */
export async function getServerApiLang(): Promise<ApiLang> {
  return toApiLang(await getServerUiLang());
}
