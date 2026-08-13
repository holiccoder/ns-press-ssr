// Client-side authentication utilities.
// These helpers run in the browser, so all localStorage accesses are guarded
// against SSR.

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.ns-press.com/api";

export class AuthApiError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthApiError";
  }
}

type ApiEnvelope<T> = {
  code: number;
  msg: string;
  data: T;
};

export type UserProfile = {
  id?: number | string;
  user_id?: number;
  real_name?: string;
  name?: string;
  title?: string;
  degree?: string;
  affiliation?: string;
  city?: string;
  country?: string;
  address?: string;
  intro?: string;
  account?: string;
  email?: string;
  mobile?: string;
  phone?: string;
};

export type LoginData = UserProfile & {
  token: string;
};

export type LoginPayload = {
  account: string;
  password: string;
  terminal: number;
  scene: number;
};

export type RegisterPayload = {
  name: string;
  account: string;
  password: string;
  confirm: string;
  password_confirm: string;
  phone: string;
  title: string;
  degree: string;
  affiliation: string;
  address: string;
  city: string;
  country: string;
  channel: number;
};

async function authPost<T>(
  path: string,
  body: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(`${API_BASE}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new AuthApiError(`Request failed: ${res.status} ${res.statusText}`);
  }

  const envelope = (await res.json()) as ApiEnvelope<T>;
  if (envelope.code !== 1) {
    throw new AuthApiError(envelope.msg || "Operation failed");
  }

  return envelope.data;
}

function notifyAuthChanged(): void {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("ns-press:auth-change"));
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function positiveInteger(value: unknown): number | null {
  if (typeof value === "string" && value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export function getUserId(profile: unknown): number | null {
  if (!isRecord(profile)) return null;
  return positiveInteger(profile.user_id) ?? positiveInteger(profile.id);
}

export function normalizeUserProfile(profile: unknown): UserProfile {
  if (!isRecord(profile)) return {};
  const normalized = { ...profile } as UserProfile;
  const userId = getUserId(profile);
  if (userId !== null) normalized.user_id = userId;
  return normalized;
}

async function profileRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const authToken = getToken();
  const response = await fetch(`${API_BASE}/${path}`, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      ...(authToken ? { token: authToken } : {}),
    },
  });
  if (!response.ok) {
    throw new AuthApiError(`Request failed: ${response.status} ${response.statusText}`);
  }
  const envelope = (await response.json()) as ApiEnvelope<T>;
  if (envelope.code !== 1) {
    throw new AuthApiError(envelope.msg || "Operation failed");
  }
  return envelope.data;
}

export async function loginApi(payload: LoginPayload): Promise<LoginData> {
  return authPost<LoginData>("login/account", payload as Record<string, unknown>);
}

export async function registerApi(payload: RegisterPayload): Promise<void> {
  await authPost<void>("login/register", payload as Record<string, unknown>);
}

// Token management
export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("authToken");
}

export function setToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("authToken", token);
  notifyAuthChanged();
}

export function removeToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("authToken");
  notifyAuthChanged();
}

// User profile management
export function getUserProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("userProfile");
  if (!raw) return null;
  try {
    const profile = normalizeUserProfile(JSON.parse(raw) as unknown);
    return Object.keys(profile).length > 0 ? profile : null;
  } catch {
    return null;
  }
}

export function setUserProfile(profile: UserProfile | Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("userProfile", JSON.stringify(normalizeUserProfile(profile)));
  notifyAuthChanged();
}

export function removeUserProfile(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("userProfile");
  notifyAuthChanged();
}

export async function getProfileApi(): Promise<UserProfile> {
  const profile = await profileRequest<unknown>("user/info");
  return normalizeUserProfile(profile);
}

export async function updateProfileApi(
  profile: Record<string, unknown>,
): Promise<UserProfile | void> {
  const updated = await profileRequest<unknown>("user/setInfo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  if (!isRecord(updated)) return;
  return normalizeUserProfile(updated);
}
