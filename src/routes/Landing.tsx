import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextLink from '../components/TextLink';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="mb-3 text-display-l text-ink">Changed jobs? Your PF years may not be counting.</h1>

      <p className="mb-3 text-body text-ink-2">
        You need ten years of recognised service for a monthly pension. When a transfer quietly fails,
        those years stop adding up — and nothing tells you.
      </p>
      <p className="mb-6 text-body text-ink-2">Takes about thirty seconds to check.</p>

      <Button onClick={() => navigate('/sign-in')}>Check my service record</Button>

      <p className="mt-2">
        <TextLink to="/about">How this works</TextLink>
      </p>

      <p className="mt-4 text-caption text-ink-3">
        This is a demonstration built with invented data. It does not connect to EPFO. Sign in with any
        UAN and any six digits.
      </p>
    </div>
  );
}
