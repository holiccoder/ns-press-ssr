"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/LanguageSwitcher";
import {
  getSubmissionCaptcha,
  getSubmissionGuidelines,
  getSubmissionJournals,
  submitArticle,
  uploadSubmissionFile,
  type SubmissionJournal,
} from "@/lib/submission-api";

type QuickForm = { journal: string; name: string; mobile: string; email: string; introduction: string; code: string };
const initialForm: QuickForm = { journal: "", name: "", mobile: "", email: "", introduction: "", code: "" };

export default function SubmissionPage() {
  const lang = useLang();
  const [form, setForm] = useState(initialForm);
  const [journals, setJournals] = useState<SubmissionJournal[]>([]);
  const [guidelines, setGuidelines] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [filePath, setFilePath] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function refreshCaptcha() {
    try { setCaptcha(await getSubmissionCaptcha(lang)); } catch { setCaptcha(""); }
  }

  useEffect(() => {
    getSubmissionJournals(lang).then(setJournals).catch(() => setJournals([]));
    getSubmissionGuidelines(lang).then((data) => setGuidelines(data.submission_notice ?? "")).catch(() => setGuidelines(""));
    getSubmissionCaptcha(lang)
      .then(setCaptcha)
      .catch(() => setCaptcha(""));
  }, [lang]);

  function update(name: keyof QuickForm, value: string) { setForm((current) => ({ ...current, [name]: value })); }

  async function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      setFilePath(await uploadSubmissionFile(file));
      setFileName(file.name);
      setMessage("");
    } catch { setMessage(lang === "zh" ? "文件上传失败" : "File upload failed."); }
    finally { setUploading(false); }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!filePath) { setMessage(lang === "zh" ? "请先上传文章" : "Please upload the article first."); return; }
    setLoading(true);
    setMessage("");
    try {
      const data = new FormData();
      data.append("journal", form.journal);
      data.append("journal_id", form.journal);
      data.append("name", form.name);
      data.append("mobile", form.mobile);
      data.append("email", form.email);
      data.append("file", filePath);
      data.append("article", filePath);
      data.append("Introduction", form.introduction);
      data.append("code", form.code);
      await submitArticle(data, lang);
      setMessage(lang === "zh" ? "投稿成功" : "Submission successful!");
      setForm(initialForm);
      setFilePath("");
      setFileName("");
      await refreshCaptcha();
    } catch (error) { setMessage(error instanceof Error ? error.message : "Submission failed!"); await refreshCaptcha(); }
    finally { setLoading(false); }
  }

  return (
    <main className="flex flex-1 flex-col bg-white">
      <section className="bg-[#0b2545] px-6 py-12 text-white sm:py-16">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{lang === "zh" ? "在线投稿" : "Online Submission"}</h1>
          {guidelines && <div className="prose prose-invert mt-6 max-w-none text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: guidelines }} />}
        </div>
      </section>
      <section className="flex-1 bg-slate-50 px-6 py-12 sm:py-16">
        <form onSubmit={handleSubmit} className="mx-auto max-w-3xl space-y-5 rounded-sm border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <label className="block text-sm font-semibold text-[#0b2545]">{lang === "zh" ? "投稿期刊" : "Submission Journal"}<select required value={form.journal} onChange={(e) => update("journal", e.target.value)} className="mt-1.5 w-full rounded-sm border border-slate-300 bg-white px-3 py-2 font-normal text-slate-800"><option value="">{lang === "zh" ? "选择期刊" : "Select journal"}</option>{journals.map((journal) => <option key={journal.id} value={String(journal.id)}>{journal.title ?? journal.name ?? journal.label}</option>)}</select></label>
          <div className="grid gap-5 sm:grid-cols-2"><QuickField label={lang === "zh" ? "您的姓名" : "Your Name"} value={form.name} onChange={(value) => update("name", value)} required /><QuickField label={lang === "zh" ? "您的邮箱" : "Your E-mail"} type="email" value={form.email} onChange={(value) => update("email", value)} required /><QuickField label={lang === "zh" ? "您的手机号" : "Your Phone Number"} value={form.mobile} onChange={(value) => update("mobile", value)} required /></div>
          <label className="block text-sm font-semibold text-[#0b2545]">{lang === "zh" ? "上传文章" : "Upload Article"}<input type="file" required={!filePath} accept=".doc,.docx,.pdf,.txt,.zip,.rar,.7z" onChange={handleFile} className="mt-1.5 block w-full rounded-sm border border-slate-300 px-3 py-2 text-sm font-normal text-slate-700" /><span className="mt-1 block text-xs font-normal text-slate-500">{uploading ? "Uploading..." : fileName || "doc, docx, pdf, zip, rar"}</span></label>
          <label className="block text-sm font-semibold text-[#0b2545]">{lang === "zh" ? "个人简介" : "Your Personal Introduction"}<textarea required rows={6} value={form.introduction} onChange={(e) => update("introduction", e.target.value)} className="mt-1.5 w-full rounded-sm border border-slate-300 px-3 py-2 font-normal text-slate-800" /></label>
          <div className="flex flex-wrap items-end gap-4"><QuickField label={lang === "zh" ? "验证码" : "Verification Code"} value={form.code} onChange={(value) => update("code", value)} required /><button type="button" onClick={refreshCaptcha} className="h-10 overflow-hidden rounded-sm border border-slate-300 px-2">{captcha ? <img src={captcha} alt="captcha" className="h-8 w-24 object-contain" /> : "Refresh"}</button></div>
          {message && <p className={`text-sm ${message.toLowerCase().includes("success") || message.includes("成功") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
          <button type="submit" disabled={loading || uploading} className="rounded-sm bg-[#0b2545] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1e3a8a] disabled:opacity-60">{loading ? "Submitting..." : lang === "zh" ? "立即提交" : "Submit Now"}</button>
        </form>
      </section>
    </main>
  );
}

function QuickField({ label, value, onChange, required, type = "text" }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string }) {
  return <label className="block text-sm font-semibold text-[#0b2545]">{label}<input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1.5 w-full rounded-sm border border-slate-300 px-3 py-2 font-normal text-slate-800" /></label>;
}
