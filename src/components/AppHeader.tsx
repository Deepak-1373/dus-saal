import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import BrandMark from './BrandMark';

// The mocks swap the wordmark for a back affordance once you are inside the journey.
const BACK_FROM = ['/fix', '/timeline', '/tracker'];

export default function AppHeader({ action }: { action?: ReactNode }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const showBack = BACK_FROM.some((prefix) => pathname.startsWith(prefix));

  return (
    <header className="flex min-h-touch items-center justify-between border-b border-rule bg-card px-4 py-3 xs:px-gutter">
      {showBack ? (
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex min-h-touch items-center text-body font-semibold text-indigo hover:text-indigo-dark"
        >
          <span aria-hidden="true" className="mr-1">
            ‹
          </span>
          Back
        </button>
      ) : (
        <Link
          to="/"
          className="inline-flex min-h-touch items-center gap-2 text-body-l font-extrabold tracking-tight text-ink"
        >
          <BrandMark className="h-6 w-6 shrink-0" />
          Dus Saal
        </Link>
      )}
      {action}
    </header>
  );
}
