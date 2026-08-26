import type { ReactNode } from 'react';

interface DisclosureProps {
  summary: string;
  children: ReactNode;
}

export default function Disclosure({ summary, children }: DisclosureProps) {
  return (
    <details className="border-t border-rule-2">
      <summary className="flex min-h-touch cursor-pointer items-center text-body-s font-semibold text-indigo">
        {summary}
      </summary>
      <div className="pb-3 text-caption text-ink-2">{children}</div>
    </details>
  );
}
