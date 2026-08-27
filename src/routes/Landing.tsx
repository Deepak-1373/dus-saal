import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextLink from '../components/TextLink';
import { useLanguage } from '../i18n/LanguageProvider';

export default function Landing() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div>
      <h1 className="mb-3 text-display-l text-ink">{t('landingHeadline')}</h1>

      <p className="mb-3 text-body text-ink-2">
        You need ten years of recognised service for a monthly pension. When a transfer quietly fails,
        those years stop adding up — and nothing tells you.
      </p>
      <p className="mb-6 text-body text-ink-2">Takes about thirty seconds to check.</p>

      <Button onClick={() => navigate('/sign-in')}>{t('landingPrimary')}</Button>

      <p className="mt-2">
        <TextLink to="/about">{t('landingSecondary')}</TextLink>
      </p>

      <p className="mt-4 text-caption text-ink-3">
        This is a demonstration built with invented data. It does not connect to EPFO. Sign in with any
        UAN and any six digits.
      </p>
    </div>
  );
}
