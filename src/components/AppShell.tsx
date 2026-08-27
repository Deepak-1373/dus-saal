import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageProvider';
import AppHeader from './AppHeader';
import DemoBanner from './DemoBanner';
import LanguageToggle from './LanguageToggle';

export default function AppShell({ children }: { children: ReactNode }) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-paper">
      {/* Sticky rather than fixed so the stack sizes itself — the banner wraps at 320px. */}
      <div className="sticky top-0 z-20">
        <DemoBanner />
        <AppHeader action={<LanguageToggle />} />
      </div>

      {/* pb clears StickyActionBar, which is fixed over the page on mobile. */}
      <main className="mx-auto w-full max-w-measure px-4 pb-28 pt-6 xs:px-gutter sm:px-6 md:max-w-reading md:pb-10 lg:max-w-shell">
        {children}
      </main>

      <footer className="mx-auto w-full max-w-measure px-4 pb-24 xs:px-gutter sm:px-6 md:max-w-reading md:pb-8 lg:max-w-shell">
        <Link
          to="/about"
          className="inline-flex min-h-touch items-center text-caption font-semibold text-indigo underline underline-offset-2 hover:text-indigo-dark"
        >
          {t('about')}
        </Link>
      </footer>
    </div>
  );
}
