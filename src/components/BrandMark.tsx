// The ledger in miniature: one year counted, one part-counted, one still ahead.
export default function BrandMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" className={className}>
      <rect width="32" height="32" rx="7" className="fill-indigo" />
      <rect x="6" y="8" width="6" height="16" rx="1.5" className="fill-counted-bg" />
      <rect
        x="14"
        y="8"
        width="6"
        height="16"
        rx="1.5"
        fill="none"
        strokeWidth="1.5"
        strokeOpacity=".55"
        className="stroke-counted-bg"
      />
      <path
        d="M14.75 18.5h4.5v4.75a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75z"
        className="fill-counted-bg"
      />
      <rect
        x="22"
        y="8"
        width="6"
        height="16"
        rx="1.5"
        fill="none"
        strokeWidth="1.5"
        strokeOpacity=".32"
        className="stroke-counted-bg"
      />
    </svg>
  );
}
