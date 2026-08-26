import type { ReactNode } from 'react';
import AppHeader from './AppHeader';
import DemoBanner from './DemoBanner';

interface AppShellProps {
  children: ReactNode;
  headerAction?: ReactNode;
}

export default function AppShell({ children, headerAction }: AppShellProps) {
  return (
    <div className="min-h-screen bg-paper">
      {/* Sticky rather than fixed so the stack sizes itself — the banner wraps at 320px. */}
      <div className="sticky top-0 z-20">
        <DemoBanner />
        <AppHeader action={headerAction} />
      </div>

      {/* pb clears StickyActionBar, which is fixed over the page on mobile. */}
      <main className="mx-auto w-full max-w-measure px-4 pb-28 pt-6 xs:px-gutter sm:px-6 md:max-w-reading md:pb-10 lg:max-w-shell">
        {children}
      </main>
    </div>
  );
}
