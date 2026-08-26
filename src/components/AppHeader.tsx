import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function AppHeader({ action }: { action?: ReactNode }) {
  return (
    <header className="flex min-h-touch items-center justify-between border-b border-rule bg-card px-4 py-3 xs:px-gutter">
      <Link to="/" className="inline-flex min-h-touch items-center text-body-l font-extrabold tracking-tight text-ink">
        Dus Saal
      </Link>
      {action}
    </header>
  );
}
