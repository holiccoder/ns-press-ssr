"use client";

import { useEffect, useState } from "react";
import { EnvelopeIcon } from "./icons";

type EAlertsModalProps = {
  journalTitle: string;
};

export default function EAlertsModal({ journalTitle }: EAlertsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [researchInterests, setResearchInterests] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsOpen(false);
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-sm border border-white/70 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1e3a8a]"
      >
        <EnvelopeIcon className="h-4 w-4" />
        Get E-Alerts
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={handleBackdropClick}
          role="presentation"
        >
          <div
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ealerts-title"
          >
            <h2
              id="ealerts-title"
              className="mb-6 text-xl font-bold text-[#0b2545]"
            >
              Subscribe
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="ealerts-title-field"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Title:
                </label>
                <input
                  id="ealerts-title-field"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="please enter title"
                  className="w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#1e3a8a] focus:outline-none focus:ring-1 focus:ring-[#1e3a8a]"
                />
              </div>

              <div>
                <label
                  htmlFor="ealerts-name"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  <span className="text-red-500">*</span> Name:
                </label>
                <input
                  id="ealerts-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#1e3a8a] focus:outline-none focus:ring-1 focus:ring-[#1e3a8a]"
                />
              </div>

              <div>
                <label
                  htmlFor="ealerts-email"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  <span className="text-red-500">*</span> Email:
                </label>
                <input
                  id="ealerts-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="please enter email"
                  required
                  className="w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#1e3a8a] focus:outline-none focus:ring-1 focus:ring-[#1e3a8a]"
                />
              </div>

              <div>
                <span className="mb-1 block text-sm font-medium text-slate-700">
                  Preferred Journals
                </span>
                <div className="rounded-sm border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  {journalTitle}
                </div>
              </div>

              <div>
                <label
                  htmlFor="ealerts-affiliation"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Affiliation:
                </label>
                <input
                  id="ealerts-affiliation"
                  type="text"
                  value={affiliation}
                  onChange={(e) => setAffiliation(e.target.value)}
                  placeholder="please enter affiliation"
                  className="w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#1e3a8a] focus:outline-none focus:ring-1 focus:ring-[#1e3a8a]"
                />
              </div>

              <div>
                <label
                  htmlFor="ealerts-research"
                  className="mb-1 block text-sm font-medium text-slate-700"
                >
                  Research Interests:
                </label>
                <input
                  id="ealerts-research"
                  type="text"
                  value={researchInterests}
                  onChange={(e) => setResearchInterests(e.target.value)}
                  placeholder="please enter research interests"
                  className="w-full rounded-sm border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#1e3a8a] focus:outline-none focus:ring-1 focus:ring-[#1e3a8a]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  className="rounded-sm bg-[#1e3a8a] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0b2545] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1e3a8a] focus-visible:ring-offset-2"
                >
                  SUBMIT
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-sm border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
