import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import StickyActionBar from '../components/StickyActionBar';
import { useLanguage } from '../i18n/LanguageProvider';

const DISCLOSURES = [
  'All names, UANs, employers, balances and dates are invented. No real person’s data appears anywhere.',
  'No live government system is contacted, queried or scraped. No APIs, documented or otherwise.',
  'No Aadhaar, PAN, password, OTP or payment data is collected. The code field accepts any six digits and validates nothing.',
  'Nothing is stored. No database, no analytics, no cookies. State lives in memory for the length of your session.',
  'Not affiliated with, endorsed by, or connected to EPFO, the Ministry of Labour and Employment, or any government body. No government logos or emblems are used.',
];

const OUT_OF_SCOPE = [
  ['Duplicate UANs', 'A separate and messier problem. The older UAN has to be formally closed before balances can move.'],
  ['Exempted establishments', 'Companies running their own private PF trusts follow a different process, on different timelines.'],
  ['Annexure K reconciliation', 'We flag that a service record can lag a settled transfer. We do not reconcile it.'],
];

export default function About() {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  return (
    <div>
      <h1 className="mb-3 text-display-l text-ink">{t('aboutTitle')}</h1>
      <p className="mb-6 text-body text-ink-2">
        This is a prototype built with entirely invented data. Please read this before you take anything
        here as fact about your own pension.
      </p>

      {lang === 'hi' ? (
        <p lang="en" className="mb-4 text-caption text-ink-3">{t('englishOnly')}</p>
      ) : null}

      <h2 className="mb-2 text-label uppercase text-ink-3">What this is, honestly</h2>
      <ul className="mb-6">
        {DISCLOSURES.map((line) => (
          <li key={line} className="border-b border-rule-2 py-3 text-body-s text-ink-2 last:border-b-0">
            {line}
          </li>
        ))}
      </ul>

      <h2 className="mb-2 text-label uppercase text-ink-3">What we deliberately did not build</h2>
      <ul className="mb-6">
        {OUT_OF_SCOPE.map(([term, detail]) => (
          <li key={term} className="border-b border-rule-2 py-3 last:border-b-0">
            <span className="block text-body-s font-semibold text-ink">{term}</span>
            <span className="block text-caption text-ink-2">{detail}</span>
          </li>
        ))}
      </ul>

      <h2 className="mb-2 text-label uppercase text-ink-3">How current this is</h2>
      <p className="mb-3 text-body-s text-ink-2">
        The four-condition logic reflects publicly reported EPFO rules <strong>as of August 2026</strong>.
        Rules changed substantially this year and are still changing.
      </p>
      <p className="mb-6 text-body-s text-ink-2">
        Verify anything you plan to act on at{' '}
        <a
          href="https://www.epfindia.gov.in"
          className="font-semibold text-indigo underline underline-offset-2 hover:text-indigo-dark"
          rel="noreferrer"
        >
          epfindia.gov.in
        </a>
        . Nothing here is financial or legal advice.
      </p>

      <StickyActionBar>
        <Button onClick={() => navigate('/')}>{t('aboutBack')}</Button>
      </StickyActionBar>
    </div>
  );
}
