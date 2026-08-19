"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import DashboardShell from "@/components/DashboardShell";
import { useLang } from "@/lib/lang";
import {
  AuthExpiredError,
  getProfileApi,
  getUserProfile,
  handleAuthExpired,
  setUserProfile,
  subscribeToAuthChange,
  updateProfileApi,
} from "@/lib/auth";
import { countryOptions } from "@/data/countries";

const titleOptions = [
  "Ms",
  "Mr",
  "Lecturer",
  "Assistant Professor",
  "Associate Professor",
  "Professor",
  "Engineer",
];
const degreeOptions = ["Bachelor", "Master", "Doctor"];

type AccountForm = {
  name: string;
  phone: string;
  title: string;
  degree: string;
  affiliation: string;
  city: string;
  country: string;
  address: string;
  intro: string;
};

function formFromProfile(profile: Record<string, unknown> | null): AccountForm {
  return {
    name: String(profile?.real_name ?? profile?.name ?? ""),
    phone: String(profile?.phone ?? profile?.mobile ?? ""),
    title: String(profile?.title ?? ""),
    degree: String(profile?.degree ?? ""),
    affiliation: String(profile?.affiliation ?? ""),
    city: String(profile?.city ?? ""),
    country: String(profile?.country ?? ""),
    address: String(profile?.address ?? ""),
    intro: String(profile?.intro ?? ""),
  };
}

export default function AccountInfoPage() {
  const lang = useLang();
  const cachedProfile = useSyncExternalStore(
    subscribeToAuthChange,
    getUserProfile,
    () => null,
  );
  // Start empty so SSR and hydration match; the cached profile from
  // localStorage is applied during the post-hydration render below.
  const [form, setForm] = useState<AccountForm>(() => formFromProfile(null));
  const [formInitialized, setFormInitialized] = useState(false);
  if (!formInitialized && cachedProfile) {
    setForm(formFromProfile(cachedProfile));
    setFormInitialized(true);
  }
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    getProfileApi()
      .then((profile) => {
        if (!mounted) return;
        const merged = { ...(getUserProfile() ?? {}), ...profile };
        setUserProfile(merged);
        setForm(formFromProfile(merged));
      })
      .catch((fetchError) => {
        if (fetchError instanceof AuthExpiredError) {
          handleAuthExpired();
          return;
        }
        // Cached profile data remains available when the profile endpoint is unavailable.
      });
    return () => {
      mounted = false;
    };
  }, []);

  function update(name: keyof AccountForm, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      await updateProfileApi(form as unknown as Record<string, unknown>);
      const current = getUserProfile() ?? {};
      setUserProfile({
        ...current,
        ...form,
        real_name: form.name,
        phone: form.phone,
        mobile: form.phone,
      });
      setMessage(lang === "zh" ? "保存成功" : "Saved");
    } catch {
      setMessage(lang === "zh" ? "保存失败" : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <DashboardShell>
      <section className="overflow-hidden rounded-sm border border-slate-200 bg-white">
        <header className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <h1 className="text-base font-bold text-[#0b2545] sm:text-lg">
            {lang === "zh" ? "账户信息" : "Account Info"}
          </h1>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">
            {lang === "zh" ? "账户" : "Account"}
          </span>
        </header>
        <form onSubmit={handleSubmit} className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7">
          <Field label={lang === "zh" ? "姓名" : "Name"} value={form.name} onChange={(value) => update("name", value)} required />
          <Field label={lang === "zh" ? "电话" : "Phone"} value={form.phone} onChange={(value) => update("phone", value)} required />
          <SelectField label={lang === "zh" ? "职称" : "Title"} value={form.title} onChange={(value) => update("title", value)} options={titleOptions} required />
          <SelectField label={lang === "zh" ? "学位" : "Degree"} value={form.degree} onChange={(value) => update("degree", value)} options={degreeOptions} required />
          <Field label={lang === "zh" ? "单位/机构" : "Affiliation"} value={form.affiliation} onChange={(value) => update("affiliation", value)} required />
          <Field label={lang === "zh" ? "城市" : "City"} value={form.city} onChange={(value) => update("city", value)} required />
          <SelectField label={lang === "zh" ? "国家/地区" : "Country/Region"} value={form.country} onChange={(value) => update("country", value)} options={countryOptions} required />
          <Field label={lang === "zh" ? "地址" : "Address"} value={form.address} onChange={(value) => update("address", value)} />
          <label className="block text-sm font-semibold text-[#0b2545] sm:col-span-2">
            {lang === "zh" ? "个人简介" : "Intro"}
            <textarea rows={4} value={form.intro} onChange={(event) => update("intro", event.target.value)} className="mt-1.5 w-full rounded-sm border border-slate-300 px-3 py-2 font-normal text-slate-800 focus:border-[#0b2545] focus:outline-none" />
          </label>
          <div className="flex items-center gap-4 sm:col-span-2">
            <button type="submit" disabled={saving} className="rounded-sm bg-[#0b2545] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1e3a8a] disabled:opacity-60">
              {saving ? "Saving..." : lang === "zh" ? "保存" : "Save"}
            </button>
            {message && <span className={message === "Saved" || message === "保存成功" ? "text-sm text-green-600" : "text-sm text-red-600"}>{message}</span>}
          </div>
        </form>
      </section>
    </DashboardShell>
  );
}

function Field({ label, value, onChange, required = false }: { label: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-[#0b2545]">
      {label}
      <input required={required} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1.5 w-full rounded-sm border border-slate-300 px-3 py-2 font-normal text-slate-800 focus:border-[#0b2545] focus:outline-none" />
    </label>
  );
}

function SelectField({ label, value, onChange, options, required = false }: { label: string; value: string; onChange: (value: string) => void; options: string[]; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-[#0b2545]">
      {label}
      <select required={required} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1.5 w-full rounded-sm border border-slate-300 bg-white px-3 py-2 font-normal text-slate-800 focus:border-[#0b2545] focus:outline-none">
        <option value="">Select...</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}
