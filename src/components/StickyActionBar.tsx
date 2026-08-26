import type { ReactNode } from 'react';

// Fixed over the page on mobile; inline from md, where AppShell stops padding for it.
export default function StickyActionBar({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 border-t border-rule bg-card px-4 py-3 shadow-sticky xs:px-gutter md:static md:mt-6 md:border-t-0 md:bg-transparent md:px-0 md:py-0 md:shadow-none">
      <div className="mx-auto w-full max-w-measure md:mx-0 md:max-w-action">{children}</div>
    </div>
  );
}
