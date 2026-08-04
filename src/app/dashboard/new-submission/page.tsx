"use client";

import { useEffect, useState } from "react";
import DashboardShell from "@/components/DashboardShell";
import { useLang } from "@/components/LanguageSwitcher";
import {
  getSubmissionCaptcha,
  getSubmissionJournals,
  submitArticle,
  uploadSubmissionFile,
  type SubmissionJournal,
} from "@/lib/submission-api";

const categories = [
  "case-reports",
  "commentaries",
  "letters",
  "methodology-articles",
  "original-articles",
  "reports",
  "research-articles",
  "research-technical-notes",
  "review-articles",
];

const categoryLabels: Record<string, string> = {
  "case-reports": "Case Reports",
  commentaries: "Commentaries",
  letters: "Letters",
  "methodology-articles": "Methodology Articles",
  "original-articles": "Original Articles",
  reports: "Reports",
  "research-articles": "Research Articles",
  "research-technical-notes": "Research/Technical Notes",
  "review-articles": "Review Articles",
};

type FormState = {
  journal: string;
  category: string;
  title: string;
  authors: string;
  abstract: string;
  keywords: string;
  pages: string;
  fields: string;
  code: string;
};

const initialForm: FormState = {
  journal: "",
  category: "",
  title: "",
  authors: "",
  abstract: "",
  keywords: "",
  pages: "",
  fields: "",
  code: "",
};

export default function NewSubmissionPage() {
  const lang = useLang();
  const [form, setForm] = useState(initialForm);
  const [journals, setJournals] = useState<SubmissionJournal[]>([]);
  const [captcha, setCaptcha] = useState("");
  const [paperFile, setPaperFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  async function refreshCaptcha() {
    try {
      setCaptcha(await getSubmissionCaptcha(lang));
    } catch {
      setCaptcha("");
    }
  }

  useEffect(() => {
    getSubmissionJournals(lang).then(setJournals).catch(() => setJournals([]));
    getSubmissionCaptcha(lang)
      .then(setCaptcha)
      .catch(() => setCaptcha(""));
  }, [lang]);

  function update(name: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage("");
    try {
      const path = await uploadSubmissionFile(file);
      if (!path) throw new Error("Upload returned no file path");
      setPaperFile(path);
    } catch {
      setMessage(lang === "zh" ? "文件上传失败" : "File upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    if (!paperFile) {
      setMessage(lang === "zh" ? "请先上传论文文件" : "Please upload the paper file first.");
      return;
    }

    setLoading(true);
    try {
      const profile = JSON.parse(window.localStorage.getItem("userProfile") ?? "{}") as Record<string, unknown>;
      const data = new FormData();
      data.append("name", String(profile.real_name ?? ""));
      data.append("email", String(profile.account ?? profile.email ?? ""));
      data.append("mobile", String(profile.phone ?? ""));
      data.append("Introduction", String(profile.intro ?? ""));
      data.append("journal", form.journal);
      data.append("journal_id", form.journal);
      data.append("paper_category", form.category);
      data.append("paper_title", form.title);
      data.append("author_list", form.authors);
      data.append("abstract", form.abstract);
      data.append("keywords", form.keywords);
      data.append("number_of_pages", form.pages);
      data.append("paper_fields", form.fields);
      data.append("file", paperFile);
      data.append("code", form.code);
      data.append("user_id", String(profile.user_id ?? "0"));
      await submitArticle(data, lang);
      setMessage(lang === "zh" ? "投稿成功" : "Submission successful.");
      setForm(initialForm);
      setPaperFile("");
      await refreshCaptcha();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : lang === "zh" ? "投稿失败" : "Submission failed.");
      await refreshCaptcha();
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardShell>
      <section className="overflow-hidden rounded-sm border border-slate-200 bg-white">
        <header className="border-b border-slate-200 px-4 py-3">
          <h1 className="text-base font-bold text-[#0b2545] sm:text-lg">{lang === "zh" ? "新建投稿" : "New Submission"}</h1>
        </header>
        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-7">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold text-[#0b2545]">
              {lang === "zh" ? "投稿期刊" : "Journal"}
              <select required value={form.journal} onChange={(e) => update("journal", e.target.value)} className="mt-1.5 w-full rounded-sm border border-slate-300 bg-white px-3 py-2 font-normal text-slate-800">
                <option value="">{lang === "zh" ? "选择期刊" : "Select journal"}</option>
                {journals.map((journal) => <option key={journal.id} value={String(journal.id)}>{journal.title ?? journal.name ?? journal.label}</option>)}
              </select>
            </label>
            <label className="text-sm font-semibold text-[#0b2545]">
              {lang === "zh" ? "论文类别" : "Paper Category"}
              <select required value={form.category} onChange={(e) => update("category", e.target.value)} className="mt-1.5 w-full rounded-sm border border-slate-300 bg-white px-3 py-2 font-normal text-slate-800">
                <option value="">{lang === "zh" ? "选择类别" : "Select category"}</option>
                {categories.map((category) => <option key={category} value={category}>{categoryLabels[category]}</option>)}
              </select>
            </label>
          </div>
          <Field label={lang === "zh" ? "论文标题" : "Paper Title"} value={form.title} onChange={(value) => update("title", value)} required />
          <TextField label={lang === "zh" ? "作者列表" : "Author List"} value={form.authors} onChange={(value) => update("authors", value)} required rows={3} />
          <TextField label={lang === "zh" ? "摘要" : "Abstract"} value={form.abstract} onChange={(value) => update("abstract", value)} required rows={6} />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label={lang === "zh" ? "关键词" : "Keywords"} value={form.keywords} onChange={(value) => update("keywords", value)} required />
            <Field label={lang === "zh" ? "页数" : "Number of Pages"} type="number" value={form.pages} onChange={(value) => update("pages", value)} required />
          </div>
          <TextField label={lang === "zh" ? "论文领域" : "Paper Fields"} value={form.fields} onChange={(value) => update("fields", value)} required rows={3} />
          <label className="block text-sm font-semibold text-[#0b2545]">
            {lang === "zh" ? "论文文件" : "Paper File"}
            <input required={!paperFile} type="file" accept=".doc,.docx,.pdf,.txt,.zip,.rar,.7z" onChange={handleFileChange} className="mt-1.5 block w-full rounded-sm border border-slate-300 px-3 py-2 text-sm font-normal text-slate-700" />
            <span className="mt-1 block text-xs font-normal text-slate-500">{uploading ? "Uploading..." : paperFile || "doc, docx, pdf, zip, rar"}</span>
          </label>
          <div className="flex flex-wrap items-end gap-4">
            <Field label={lang === "zh" ? "验证码" : "Verification Code"} value={form.code} onChange={(value) => update("code", value)} required />
            <button type="button" onClick={refreshCaptcha} className="h-10 overflow-hidden rounded-sm border border-slate-300 bg-slate-50 px-2" aria-label="Refresh captcha">
              {captcha ? <img src={captcha} alt="captcha" className="h-8 w-24 object-contain" /> : "Refresh"}
            </button>
          </div>
          {message && <p className={`text-sm ${message.toLowerCase().includes("success") || message.includes("成功") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
          <button type="submit" disabled={loading || uploading} className="rounded-sm bg-[#0b2545] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1e3a8a] disabled:opacity-60">{loading ? "Submitting..." : lang === "zh" ? "提交" : "Submit"}</button>
        </form>
      </section>
    </DashboardShell>
  );
}

function Field({ label, value, onChange, required, type = "text" }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; type?: string }) {
  return <label className="block flex-1 text-sm font-semibold text-[#0b2545]">{label}<input required={required} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1.5 w-full rounded-sm border border-slate-300 px-3 py-2 font-normal text-slate-800 focus:border-[#0b2545] focus:outline-none" /></label>;
}

function TextField({ label, value, onChange, required, rows }: { label: string; value: string; onChange: (value: string) => void; required?: boolean; rows: number }) {
  return <label className="block text-sm font-semibold text-[#0b2545]">{label}<textarea required={required} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} className="mt-1.5 w-full rounded-sm border border-slate-300 px-3 py-2 font-normal text-slate-800 focus:border-[#0b2545] focus:outline-none" /></label>;
}
