"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getToken,
  loginApi,
  normalizeUserProfile,
  setToken,
  setUserProfile,
  AuthApiError,
} from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (getToken()) {
        router.replace("/dashboard");
      } else {
        setAuthChecked(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, [router]);

  if (!authChecked) {
    return (
      <main className="flex flex-1 items-center justify-center bg-white py-16 text-sm text-slate-500">
        Checking session...
      </main>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const data = await loginApi({
        account: form.email,
        password: form.password,
        terminal: 1,
        scene: 1,
      });

      setToken(data.token);

      const sessionSource = normalizeUserProfile(data);
      setUserProfile({
        user_id: sessionSource.user_id,
        real_name: sessionSource.real_name ?? sessionSource.account ?? form.email,
        title: sessionSource.title,
        degree: sessionSource.degree,
        affiliation: sessionSource.affiliation,
        city: sessionSource.city,
        country: sessionSource.country,
        address: sessionSource.address,
        intro: sessionSource.intro,
        account: sessionSource.account ?? form.email,
        email: sessionSource.account ?? form.email,
        phone: sessionSource.mobile,
      });

      setStatus("success");
      router.push("/dashboard");
    } catch (err) {
      setStatus("error");
      if (err instanceof AuthApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Login failed.");
      }
    }
  }

  return (
    <main className="flex flex-1 flex-col bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-md px-6">
        <div className="rounded-sm border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-center text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl">
            Login
          </h1>
          <p className="mt-2 text-center text-sm text-slate-500">
            Sign in to your NSP account
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#0b2545]">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="mt-1.5 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0b2545] focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#0b2545]">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                className="mt-1.5 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0b2545] focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-sm bg-[#0b2545] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1e3a8a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] focus-visible:ring-offset-2 disabled:opacity-60"
            >
              {status === "submitting" ? "Signing in..." : "Login"}
            </button>

            {status === "success" && (
              <p className="text-center text-sm text-green-600">
                Login successful.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-red-600">
                {errorMessage}
              </p>
            )}
          </form>

          <div className="mt-6 flex items-center justify-between text-sm">
            <Link
              href="/forgot-password"
              className="text-[#1d4ed8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
            >
              Forgot password?
            </Link>
            <Link
              href="/register"
              className="text-[#1d4ed8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
