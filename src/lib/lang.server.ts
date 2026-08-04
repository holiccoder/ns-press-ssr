import { cookies } from "next/headers";
import { COOKIE_NAME, type ApiLang, type UiLang, toApiLang } from "./lang";

/**
 * Read the user's language preference from the `lang` cookie on the server.
 * Falls back to "en" so it matches the client-side default in
 * LanguageSwitcher.
 */
export async function getServerUiLang(): Promise<UiLang> {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (value === "en" || value === "zh") return value;
  return "en";
}

/**
 * Return the API-facing language string for the current request.
 */
export async function getServerApiLang(): Promise<ApiLang> {
  return toApiLang(await getServerUiLang());
}
