"use client";

import Link from "next/link";
import { useCallback, useRef } from "react";
import home from "@/data/home.json";

const { ourJournals } = home;

/* ---------- Small shared cover primitives ---------- */

function ElspBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-[9px] font-semibold tracking-[0.18em] text-white/90 ${className}`}
    >
      <span className="grid h-3.5 w-3.5 place-items-center rounded-sm bg-white/90 text-[8px] font-extrabold leading-none text-[#0b2545]">
        E
      </span>
      ELSP
    </span>
  );
}

function CoverShell({
  issn,
  children,
  className = "",
  elspTone = "light",
  brandSlot,
}: {
  issn: string;
  children: React.ReactNode;
  className?: string;
  elspTone?: "light" | "dark";
  brandSlot?: React.ReactNode;
}) {
  return (
    <div
      className={`relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-md ring-1 ring-black/5 ${className}`}
    >
      {children}
      <span
        className={`absolute right-2 top-2 text-[8px] font-semibold tracking-wider ${
          elspTone === "dark" ? "text-white/80" : "text-slate-700"
        }`}
      >
        ISSN {issn}
      </span>
      <div className="absolute bottom-2 left-2 flex items-center gap-2">
        {brandSlot}
        <ElspBadge
          className={elspTone === "dark" ? "text-white/90" : "text-slate-700"}
        />
      </div>
    </div>
  );
}

/* ---------- Individual cover artworks ---------- */

function AsymmetryCover() {
  return (
    <CoverShell issn="3041-9018" elspTone="dark">
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-gradient-to-br from-[#173a8a] to-[#0b2545]" />
        <div className="w-1/2 bg-gradient-to-br from-[#f97316] to-[#c2410c]" />
      </div>
      <div className="absolute inset-x-0 top-6 px-4 text-center text-white">
        <p className="text-[10px] tracking-[0.25em] opacity-80">JOURNAL OF</p>
        <p className="mt-1 text-base font-bold tracking-wide">Asymmetry</p>
      </div>
      <svg
        viewBox="0 0 100 100"
        className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="asymSphere" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="60%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#1e293b" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="34" fill="url(#asymSphere)" />
        <g fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5">
          {Array.from({ length: 10 }).map((_, i) => (
            <ellipse
              key={i}
              cx="50"
              cy="50"
              rx={34}
              ry={6 + i * 3}
              transform={`rotate(${i * 18} 50 50)`}
            />
          ))}
        </g>
      </svg>
    </CoverShell>
  );
}

function ExRNACover() {
  return (
    <CoverShell
      issn="3041-9026"
      elspTone="light"
      brandSlot={
        <span className="text-[9px] font-bold tracking-[0.18em] text-rose-600">
          RIBIO
        </span>
      }
    >
      <div className="absolute inset-0 bg-white" />
      <div className="absolute inset-x-0 top-5 px-4 text-center">
        <p className="text-[10px] tracking-[0.3em] text-slate-500">JOURNAL</p>
        <p className="mt-1 text-lg font-extrabold italic text-rose-600">
          ExRNA
        </p>
      </div>
      <svg viewBox="0 0 100 100" className="absolute inset-x-0 top-10 mx-auto h-24 w-full" aria-hidden="true">
        <g>
          <ellipse cx="30" cy="55" rx="14" ry="9" fill="#ef4444" />
          <ellipse cx="30" cy="55" rx="6" ry="4" fill="#b91c1c" />
          <ellipse cx="65" cy="68" rx="13" ry="8" fill="#dc2626" />
          <ellipse cx="65" cy="68" rx="5" ry="3.5" fill="#991b1b" />
          <ellipse cx="78" cy="48" rx="10" ry="7" fill="#ef4444" />
          <ellipse cx="78" cy="48" rx="4" ry="3" fill="#b91c1c" />
        </g>
      </svg>
      <svg viewBox="0 0 80 80" className="absolute bottom-6 right-2 h-20 w-20" aria-hidden="true">
        <g stroke="#0ea5e9" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M20 5 C 60 25, 20 45, 60 65 M60 5 C 20 25, 60 45, 20 65" />
          {[10, 22, 34, 46, 58].map((y) => (
            <line key={y} x1="22" y1={y} x2="58" y2={y} stroke="#38bdf8" />
          ))}
        </g>
      </svg>
    </CoverShell>
  );
}

function NeuroelectronicsCover() {
  return (
    <CoverShell issn="3041-9034" elspTone="dark">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e1b4b]" />
      <svg viewBox="0 0 100 130" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g stroke="#22d3ee" strokeWidth="0.4" fill="none" opacity="0.6">
          <path d="M0 30 L25 30 L30 25 L50 25" />
          <path d="M100 50 L75 50 L70 55 L50 55" />
          <path d="M10 90 L40 90 L45 85" />
          <path d="M90 100 L60 100 L55 95" />
        </g>
      </svg>
      <svg viewBox="0 0 100 100" className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-[55%]" aria-hidden="true">
        <defs>
          <radialGradient id="brainGlow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="35" fill="url(#brainGlow)" />
        <path
          d="M30 50 C 25 35, 40 25, 50 30 C 60 25, 75 35, 70 50 C 75 65, 60 75, 50 70 C 40 75, 25 65, 30 50 Z"
          fill="none"
          stroke="#a5f3fc"
          strokeWidth="1"
        />
        <path
          d="M40 35 C 45 45, 45 55, 40 65 M50 30 L50 70 M60 35 C 55 45, 55 55, 60 65"
          stroke="#67e8f9"
          strokeWidth="0.8"
          fill="none"
        />
      </svg>
      <div className="absolute inset-x-0 bottom-9 px-3 text-center">
        <p className="text-[10px] font-semibold tracking-[0.28em] text-cyan-200">
          NEURO
        </p>
        <p className="text-[11px] font-bold tracking-[0.2em] text-white">
          ELECTRONICS
        </p>
      </div>
    </CoverShell>
  );
}

function RobotLearningCover() {
  return (
    <CoverShell issn="3041-9042" elspTone="light">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-slate-100" />
      <div className="absolute inset-x-0 top-5 px-4 text-center">
        <p className="text-[10px] tracking-[0.3em] text-slate-500">JOURNAL OF</p>
        <p className="mt-1 text-base font-extrabold tracking-wide text-[#0b2545]">
          Robot Learning
        </p>
      </div>
      <svg viewBox="0 0 100 100" className="absolute inset-x-0 bottom-6 mx-auto h-28 w-full" aria-hidden="true">
        <g fill="#e2e8f0" stroke="#94a3b8" strokeWidth="0.5">
          <rect x="42" y="78" width="16" height="6" rx="2" />
          <rect x="46" y="58" width="8" height="22" />
          <circle cx="50" cy="56" r="5" fill="#cbd5e1" />
          <rect
            x="34"
            y="40"
            width="28"
            height="20"
            rx="2"
            transform="rotate(-15 48 50)"
            fill="#f1f5f9"
          />
          <circle cx="36" cy="48" r="3" fill="#cbd5e1" />
        </g>
        <g transform="rotate(-15 48 50)">
          <rect x="36" y="42" width="24" height="16" rx="1" fill="#0ea5e9" opacity="0.85" />
          <g stroke="white" strokeWidth="0.6" fill="none">
            <polyline points="38,54 42,50 46,52 50,46 54,48 58,44" />
          </g>
        </g>
      </svg>
    </CoverShell>
  );
}

function SmartConstructionCover() {
  return (
    <CoverShell issn="3041-9050" elspTone="dark">
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617] to-[#0b2545]" />
      <svg viewBox="0 0 100 130" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g stroke="#38bdf8" strokeWidth="0.6" fill="rgba(56,189,248,0.12)">
          <rect x="30" y="60" width="40" height="12" />
          <rect x="34" y="48" width="32" height="12" />
          <rect x="38" y="36" width="24" height="12" />
          <rect x="42" y="24" width="16" height="12" />
          <rect x="22" y="72" width="56" height="6" />
          <line x1="10" y1="100" x2="90" y2="100" />
          <line x1="20" y1="92" x2="80" y2="92" />
        </g>
        <g fill="#67e8f9">
          <circle cx="34" cy="60" r="1" />
          <circle cx="66" cy="60" r="1" />
          <circle cx="38" cy="48" r="1" />
          <circle cx="62" cy="48" r="1" />
          <circle cx="50" cy="24" r="1" />
        </g>
      </svg>
      <div className="absolute inset-x-0 bottom-9 px-3 text-center">
        <p className="text-[10px] font-semibold tracking-[0.28em] text-cyan-200">
          SMART
        </p>
        <p className="text-[11px] font-bold tracking-[0.2em] text-white">
          CONSTRUCTION
        </p>
      </div>
    </CoverShell>
  );
}

function BiofunctionalMaterialsCover() {
  return (
    <CoverShell issn="3041-9069" elspTone="dark">
      <div className="absolute inset-0 flex flex-col">
        <div className="h-2/5 bg-gradient-to-b from-cyan-200 to-cyan-100" />
        <div className="flex-1 bg-gradient-to-b from-[#0b2545] to-[#050b1f]" />
      </div>
      <div className="absolute inset-x-0 top-6 px-3 text-center">
        <p className="text-[9px] font-semibold tracking-[0.28em] text-slate-700">
          JOURNAL OF
        </p>
        <p className="mt-1 text-[11px] font-bold leading-tight tracking-wide text-[#0b2545]">
          Biofunctional
          <br />
          Materials
        </p>
      </div>
      <svg viewBox="0 0 100 60" className="absolute inset-x-0 bottom-6 h-20 w-full" aria-hidden="true">
        <g fill="none" stroke="#67e8f9" strokeWidth="0.6" opacity="0.8">
          <circle cx="30" cy="35" r="10" />
          <circle cx="55" cy="25" r="7" />
          <circle cx="70" cy="40" r="9" />
          <path d="M30 35 Q 42 20 55 25 Q 65 32 70 40" />
          <path d="M25 45 Q 40 50 55 45 Q 65 50 75 48" />
        </g>
        <g fill="#22d3ee" opacity="0.7">
          <circle cx="30" cy="35" r="2" />
          <circle cx="55" cy="25" r="1.6" />
          <circle cx="70" cy="40" r="2" />
          <circle cx="18" cy="48" r="1" />
          <circle cx="84" cy="32" r="1" />
        </g>
      </svg>
    </CoverShell>
  );
}

function LawEthicsCover() {
  return (
    <CoverShell
      issn="3041-9077"
      elspTone="dark"
      brandSlot={
        <span className="grid h-3.5 w-3.5 place-items-center rounded-full bg-amber-400 text-[8px] font-extrabold leading-none text-slate-900">
          L
        </span>
      }
    >
      <div className="absolute inset-0 flex flex-col">
        <div className="h-2/5 bg-white" />
        <div className="flex-1 bg-gradient-to-b from-[#0b2545] to-[#020617]" />
      </div>
      <div className="absolute inset-x-0 top-6 px-3 text-center">
        <p className="text-[10px] font-bold leading-tight tracking-wide text-[#0b2545]">
          Law, Ethics
          <br />& Technology
        </p>
      </div>
      <svg viewBox="0 0 100 100" className="absolute inset-x-0 bottom-4 mx-auto h-24 w-24" aria-hidden="true">
        <g fill="none" stroke="#60a5fa" strokeWidth="0.5" opacity="0.7">
          <circle cx="50" cy="50" r="28" />
          {Array.from({ length: 6 }).map((_, i) => (
            <ellipse
              key={i}
              cx="50"
              cy="50"
              rx="28"
              ry="10"
              transform={`rotate(${i * 30} 50 50)`}
            />
          ))}
        </g>
        <g fill="#93c5fd">
          {[
            [22, 50], [78, 50], [50, 22], [50, 78],
            [32, 30], [68, 30], [32, 70], [68, 70],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.5" />
          ))}
        </g>
      </svg>
    </CoverShell>
  );
}

function RenewableEnergyCover() {
  return (
    <CoverShell issn="3041-9085" elspTone="dark">
      <div className="absolute inset-0 flex flex-col">
        <div className="h-1/6 bg-gradient-to-r from-red-600 to-red-500" />
        <div className="flex-1 bg-gradient-to-b from-emerald-400 to-emerald-600" />
      </div>
      <div className="absolute inset-x-0 top-[18%] px-3 text-center">
        <p className="text-[10px] font-bold leading-tight tracking-wide text-white">
          Renewable and
          <br />
          Sustainable Energy
        </p>
      </div>
      <svg viewBox="0 0 100 80" className="absolute inset-x-0 bottom-6 h-24 w-full" aria-hidden="true">
        <g>
          <rect x="29" y="35" width="2" height="35" fill="#f1f5f9" />
          <circle cx="30" cy="35" r="2" fill="#f1f5f9" />
          <g fill="#f1f5f9">
            <path d="M30 35 L 50 28 L 30 32 Z" />
            <path d="M30 35 L 18 20 L 28 33 Z" />
            <path d="M30 35 L 22 55 L 30 38 Z" />
          </g>
        </g>
        <g fill="none" stroke="#a7f3d0" strokeWidth="0.8">
          <line x1="62" y1="40" x2="72" y2="34" />
          <line x1="72" y1="34" x2="82" y2="40" />
          <line x1="72" y1="34" x2="72" y2="22" />
          <line x1="62" y1="40" x2="58" y2="50" />
          <line x1="82" y1="40" x2="86" y2="50" />
        </g>
        <g fill="#ecfccb">
          {[[62, 40], [72, 34], [82, 40], [72, 22], [58, 50], [86, 50]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2" />
          ))}
        </g>
      </svg>
    </CoverShell>
  );
}

function BiomedicalInformaticsCover() {
  return (
    <CoverShell issn="3041-9093" elspTone="dark">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-white" />
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0b2545] to-[#1e3a8a]"
          style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%, 60% 35%)" }}
        />
      </div>
      <div className="absolute inset-x-0 top-5 px-3 text-left">
        <p className="text-[9px] font-semibold tracking-[0.25em] text-slate-500">
          JOURNAL OF
        </p>
        <p className="mt-1 text-[11px] font-bold leading-tight tracking-wide text-[#0b2545]">
          Biomedical
          <br />
          Informatics
        </p>
      </div>
      <svg viewBox="0 0 100 100" className="absolute right-1 bottom-6 h-24 w-24" aria-hidden="true">
        <g stroke="#60a5fa" strokeWidth="0.5" fill="none" opacity="0.8">
          <line x1="50" y1="50" x2="20" y2="30" />
          <line x1="50" y1="50" x2="80" y2="25" />
          <line x1="50" y1="50" x2="15" y2="70" />
          <line x1="50" y1="50" x2="85" y2="75" />
          <line x1="50" y1="50" x2="50" y2="90" />
        </g>
        <path
          d="M35 50 C 30 35, 50 30, 55 40 C 65 35, 75 50, 70 60 C 65 70, 50 70, 45 60 C 35 65, 30 55, 35 50 Z"
          fill="rgba(96,165,250,0.4)"
          stroke="#93c5fd"
          strokeWidth="0.6"
        />
        <g fill="#93c5fd">
          {[[20, 30], [80, 25], [15, 70], [85, 75], [50, 90]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.6" />
          ))}
        </g>
      </svg>
    </CoverShell>
  );
}

function AdvancedManufacturingCover() {
  return (
    <CoverShell issn="3041-9107" elspTone="dark">
      <div className="absolute inset-0 flex flex-col">
        <div className="h-[18%] bg-gradient-to-r from-orange-500 to-orange-400" />
        <div className="flex-1 bg-gradient-to-b from-[#0f172a] to-[#020617]" />
      </div>
      <div className="absolute inset-x-0 top-[22%] px-3 text-center">
        <p className="text-[10px] font-bold leading-tight tracking-wide text-white">
          Advanced
          <br />
          Manufacturing
        </p>
      </div>
      <svg viewBox="0 0 100 60" className="absolute inset-x-0 bottom-6 h-20 w-full" aria-hidden="true">
        <g stroke="#67e8f9" strokeWidth="0.5" fill="none" opacity="0.6">
          <path d="M0 30 L20 30 L25 25 L40 25 L45 30 L100 30" />
          <path d="M10 45 L30 45 L35 40 L60 40 L65 45 L100 45" />
        </g>
        <g transform="translate(35 35)" stroke="#22d3ee" fill="none" strokeWidth="1">
          <circle r="10" />
          <circle r="4" />
          {Array.from({ length: 8 }).map((_, i) => (
            <rect
              key={i}
              x="-1.5"
              y="-13"
              width="3"
              height="4"
              transform={`rotate(${i * 45})`}
              fill="#22d3ee"
            />
          ))}
        </g>
        <g transform="translate(70 30)">
          <rect x="-9" y="-9" width="18" height="18" fill="rgba(34,211,238,0.15)" stroke="#22d3ee" />
          <rect x="-4" y="-4" width="8" height="8" fill="#0e7490" />
          {[-12, 12].map((v) => (
            <g key={v}>
              <line x1={v} y1="-6" x2={v - Math.sign(v) * 3} y2="-6" stroke="#22d3ee" />
              <line x1={v} y1="0" x2={v - Math.sign(v) * 3} y2="0" stroke="#22d3ee" />
              <line x1={v} y1="6" x2={v - Math.sign(v) * 3} y2="6" stroke="#22d3ee" />
            </g>
          ))}
        </g>
      </svg>
    </CoverShell>
  );
}

function ElectronicsSignalCover() {
  return (
    <CoverShell issn="3041-9115" elspTone="dark">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b2545] via-[#1e3a8a] to-[#020617]" />
      <svg viewBox="0 0 100 130" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <g fill="none" stroke="#38bdf8" strokeWidth="0.6" opacity="0.65">
          <path d="M5 60 Q 30 30, 55 60 T 95 60" />
          <path d="M5 75 Q 35 50, 60 75 T 95 75" />
          <path d="M5 90 Q 30 65, 55 90 T 95 90" />
          <path d="M10 45 Q 40 75, 70 45" />
        </g>
        <g fill="#7dd3fc" opacity="0.9">
          {[[20, 60], [55, 60], [95, 60], [35, 75], [70, 90], [50, 45]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.5" />
          ))}
        </g>
      </svg>
      <div className="absolute inset-x-0 top-6 px-3 text-center">
        <p className="text-[9px] font-semibold tracking-[0.25em] text-cyan-200">
          ELECTRONICS &
        </p>
        <p className="text-[10px] font-bold tracking-[0.18em] text-white">
          SIGNAL PROCESSING
        </p>
      </div>
    </CoverShell>
  );
}

function MechatronicsCover() {
  return (
    <CoverShell issn="3041-9123" elspTone="dark">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#0b1f5e]" />
      <svg viewBox="0 0 100 100" className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
        <g fill="none" stroke="#a5b4fc" strokeWidth="0.5" opacity="0.7">
          <circle cx="50" cy="50" r="44" />
          <circle cx="50" cy="50" r="34" />
          <circle cx="50" cy="50" r="24" />
          <circle cx="50" cy="50" r="14" />
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={i} x1="50" y1="6" x2="50" y2="14" transform={`rotate(${i * 22.5} 50 50)`} />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`b-${i}`} x1="50" y1="16" x2="50" y2="26" transform={`rotate(${i * 30} 50 50)`} />
          ))}
        </g>
        <g fill="#c7d2fe">
          <circle cx="50" cy="50" r="3" />
        </g>
      </svg>
      <div className="absolute inset-x-0 bottom-9 px-3 text-center">
        <p className="text-[10px] font-bold tracking-[0.2em] text-white">
          MECHATRONICS
        </p>
        <p className="text-[9px] tracking-[0.28em] text-indigo-200">
          TECHNOLOGY
        </p>
      </div>
    </CoverShell>
  );
}

/* ---------- id → cover lookup ---------- */

const COVERS: Record<string, React.ReactNode> = {
  "asymmetry":                  <AsymmetryCover />,
  "exrna":                      <ExRNACover />,
  "neuroelectronics":           <NeuroelectronicsCover />,
  "robot-learning":             <RobotLearningCover />,
  "smart-construction":         <SmartConstructionCover />,
  "biofunctional-materials":    <BiofunctionalMaterialsCover />,
  "law-ethics-technology":      <LawEthicsCover />,
  "renewable-sustainable-energy": <RenewableEnergyCover />,
  "biomedical-informatics":     <BiomedicalInformaticsCover />,
  "advanced-manufacturing":     <AdvancedManufacturingCover />,
  "electronics-signal":         <ElectronicsSignalCover />,
  "mechatronics-technology":    <MechatronicsCover />,
};

/* ---------- Item card ---------- */

type Journal = (typeof ourJournals.row1)[number];

function JournalCard({ item }: { item: Journal }) {
  return (
    <Link
      href={item.href}
      className="group flex w-full flex-col gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] focus-visible:ring-offset-2"
    >
      <div className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
        {COVERS[item.id]}
      </div>
      <p
        className={`text-center text-sm font-semibold leading-snug ${
          item.highlighted ? "text-[#1d4ed8]" : "text-slate-900"
        } group-hover:text-[#1d4ed8]`}
      >
        {item.title}
      </p>
    </Link>
  );
}

/* ---------- Main component ---------- */

export default function OurJournals() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.max(el.clientWidth * 0.8, 240);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }, []);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl md:text-4xl">
            {ourJournals.title}
          </h2>
          <Link
            href={ourJournals.moreHref}
            className="inline-flex items-center gap-1 rounded-sm border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
          >
            {ourJournals.moreLabel} <span aria-hidden>&gt;</span>
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative mt-10">
          {/* Left arrow */}
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous journals"
            className="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] md:inline-flex"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
              <polyline points="15 6 9 12 15 18" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next journals"
            className="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0b2545] md:inline-flex"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>

          {/* Scroller — two rows that scroll horizontally in sync */}
          <div
            ref={scrollerRef}
            className="hide-scrollbar flex snap-x snap-mandatory flex-col gap-y-10 overflow-x-auto scroll-smooth pb-2"
          >
            {[ourJournals.row1, ourJournals.row2].map((row, ri) => (
              <div
                key={ri}
                className="grid auto-cols-[calc((100%-1.25rem*5)/6)] grid-flow-col gap-5 max-md:auto-cols-[45%] max-sm:auto-cols-[70%]"
              >
                {row.map((item) => (
                  <div key={item.id} className="snap-start">
                    <JournalCard item={item} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar { scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}
