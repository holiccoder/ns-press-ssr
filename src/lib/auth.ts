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

export type LoginData = {
  token: string;
  user: {
    user_id?: number;
    real_name?: string;
    title?: string;
    degree?: string;
    affiliation?: string;
    city?: string;
    country?: string;
    address?: string;
    intro?: string;
    account?: string;
    mobile?: string;
  };
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
}

export function removeToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("authToken");
}

// User profile management
export function getUserProfile(): Record<string, unknown> | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("userProfile");
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function setUserProfile(profile: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("userProfile", JSON.stringify(profile));
}

export function removeUserProfile(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("userProfile");
}
