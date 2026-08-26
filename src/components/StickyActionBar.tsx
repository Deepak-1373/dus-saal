import type { ReactNode } from 'react';

// Fixed on mobile; AppShell pads the page by its height so it never covers content.
export default function StickyActionBar({ children }: { children: ReactNode }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 border-t border-rule bg-card px-4 py-3 shadow-sticky md:static md:border-t-0 md:px-0 md:shadow-none xs:px-gutter">
      <div className="mx-auto w-full max-w-measure md:max-w-none">{children}</div>
    </div>
  );
}
