"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { registerApi, AuthApiError } from "@/lib/auth";
import { countryOptions } from "@/data/countries";

const TITLE_OPTIONS = [
  "Ms",
  "Mr",
  "Lecturer",
  "Assistant Professor",
  "Associate Professor",
  "Professor",
  "Engineer",
];

const DEGREE_OPTIONS = ["Bachelor", "Master", "Doctor"];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    titlePrefix: "Mr",
    name: "",
    phone: "",
    title: "",
    degree: "",
    affiliation: "",
    address: "",
    city: "",
    countryRegion: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const requiredFields = [
      form.name,
      form.phone,
      form.title,
      form.degree,
      form.affiliation,
      form.address,
      form.city,
      form.countryRegion,
      form.email,
      form.password,
      form.confirmPassword,
    ];
    if (requiredFields.some((value) => !value.trim())) {
      setError("Please fill in all required fields.");
      return;
    }

    setStatus("submitting");

    registerApi({
      name: form.name,
      account: form.email,
      password: form.password,
      confirm: form.confirmPassword,
      password_confirm: form.confirmPassword,
      phone: form.phone,
      title: form.title,
      degree: form.degree,
      affiliation: form.affiliation,
      address: form.address,
      city: form.city,
      country: form.countryRegion,
      channel: 4,
    })
      .then(() => {
        setStatus("success");
        router.push("/login");
      })
      .catch((err) => {
        setStatus("error");
        if (err instanceof AuthApiError) {
          setError(err.message);
        } else {
          setError("Registration failed. Please try again.");
        }
      });
  }

  return (
    <main className="flex flex-1 flex-col bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-2xl px-6">
        <div className="rounded-sm border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-center text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl">
            Register
          </h1>
          <p className="mt-2 text-center text-sm text-slate-500">
            Create your NSP account
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Title prefix + Name */}
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-semibold text-[#0b2545]">
                  Name
                </label>
                <div className="mt-1.5 flex gap-3">
                  <select
                    name="titlePrefix"
                    value={form.titlePrefix}
                    onChange={handleChange}
                    className="w-32 shrink-0 rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-[#0b2545] focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
                  >
                    {TITLE_OPTIONS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="min-w-0 flex-1 rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0b2545] focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-[#0b2545]">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0b2545] focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
                  placeholder="Your phone number"
                />
              </div>

              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-semibold text-[#0b2545]"
                >
                  Title
                </label>
                <select
                  id="title"
                  name="title"
                  required
                  value={form.title}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-[#0b2545] focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
                >
                  <option value="">Select title</option>
                  {TITLE_OPTIONS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="degree"
                  className="block text-sm font-semibold text-[#0b2545]"
                >
                  Degree
                </label>
                <select
                  id="degree"
                  name="degree"
                  required
                  value={form.degree}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:border-[#0b2545] focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
                >
                  <option value="">Select degree</option>
                  {DEGREE_OPTIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="affiliation" className="block text-sm font-semibold text-[#0b2545]">
                  Affiliation / Institution
                </label>
                <input
                  id="affiliation"
                  name="affiliation"
                  type="text"
                  value={form.affiliation}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0b2545] focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
                  placeholder="Your institution or organization"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-semibold text-[#0b2545]">
                  Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0b2545] focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
                  placeholder="Street address"
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-semibold text-[#0b2545]">
                  City
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  value={form.city}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0b2545] focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
                  placeholder="City"
                />
              </div>

              <div>
                <label
                  htmlFor="countryRegion"
                  className="block text-sm font-semibold text-[#0b2545]"
                >
                  Country / Region
                </label>
                <input
                  id="countryRegion"
                  name="countryRegion"
                  type="text"
                  list="country-list"
                  required
                  value={form.countryRegion}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0b2545] focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
                  placeholder="Country or region"
                />
                <datalist id="country-list">
                  {countryOptions.map((c) => (
                    <option key={c} value={c} />
                  ))}
                </datalist>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-semibold text-[#0b2545]">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
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
                  name="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0b2545] focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-[#0b2545]">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="mt-1.5 w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0b2545] focus:outline-none focus:ring-1 focus:ring-[#0b2545]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-sm bg-[#0b2545] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1e3a8a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] focus-visible:ring-offset-2 disabled:opacity-60"
            >
              {status === "submitting" ? "Registering..." : "Register"}
            </button>

            {status === "success" && (
              <p className="text-center text-sm text-green-600">
                Registration simulation succeeded.
              </p>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#1d4ed8] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545]"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
