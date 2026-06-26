// Placeholder cover for the Asymmetry journal.
// Uses inline SVG gradients to evoke abstract silver/glass metallic spheres.
// Replace with a real raster cover image when the asset is available.

export default function AsymmetryCover({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 320"
      aria-hidden="true"
      className={`${className} bg-slate-100`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="sphere-silver" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor="#d1d5db" />
          <stop offset="80%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#374151" />
        </radialGradient>
        <radialGradient id="sphere-glass" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="35%" stopColor="#cbd5e1" />
          <stop offset="75%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </radialGradient>
        <radialGradient id="sphere-dark" cx="40%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </radialGradient>
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Deep blue journal spine background */}
      <rect width="240" height="320" fill="#0b2545" />

      {/* Decorative diagonal band */}
      <path d="M0 320 L240 0 L240 320 Z" fill="#0f2d52" />

      {/* Metallic sphere cluster */}
      <g filter="url(#soft-shadow)">
        <circle cx="160" cy="110" r="55" fill="url(#sphere-silver)" />
        <circle cx="80" cy="160" r="45" fill="url(#sphere-glass)" />
        <circle cx="170" cy="210" r="38" fill="url(#sphere-dark)" />
        <circle cx="95" cy="245" r="28" fill="url(#sphere-silver)" />
        <circle cx="55" cy="95" r="22" fill="url(#sphere-glass)" />
        <circle cx="205" cy="255" r="20" fill="url(#sphere-silver)" />
      </g>

      {/* Journal title */}
      <text
        x="120"
        y="295"
        textAnchor="middle"
        fontSize="22"
        fontWeight="700"
        fill="#f8fafc"
        letterSpacing="0.05em"
      >
        Asymmetry
      </text>
      <text
        x="120"
        y="312"
        textAnchor="middle"
        fontSize="9"
        fill="#94a3b8"
        letterSpacing="0.08em"
      >
        VOLUME 3 ISSUE 1 · 2026
      </text>
    </svg>
  );
}
