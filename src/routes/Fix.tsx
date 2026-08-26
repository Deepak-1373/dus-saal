import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import StickyActionBar from '../components/StickyActionBar';
import TextLink from '../components/TextLink';
import { FIX_GUIDES } from '../data/fixes';
import { fixTitle, withPersona } from '../lib/fix';
import { resolvePersona } from '../lib/verdict';
import type { CheckId } from '../types';

function isCheckId(value: string | undefined): value is CheckId {
  return value !== undefined && value in FIX_GUIDES;
}

function Block({ heading, children }: { heading: string; children: string }) {
  return (
    <section className="mb-3 rounded border border-rule bg-card p-4">
      <h2 className="mb-2 text-label uppercase text-ink-3">{heading}</h2>
      <p className="text-caption text-ink-2">{children}</p>
    </section>
  );
}

export default function Fix() {
  const { checkId } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const personaId = params.get('persona');
  const persona = resolvePersona(personaId);

  if (!isCheckId(checkId)) {
    return (
      <div>
        <h1 className="mb-3 text-display-l text-ink">We don't have a page for that</h1>
        <p className="mb-4 text-body text-ink-2">
          That link doesn't match any of the four conditions we check.
        </p>
        <TextLink to={withPersona('/verdict', personaId)}>Back to your verdict</TextLink>
      </div>
    );
  }

  const guide = FIX_GUIDES[checkId];
  const check = persona.checks.find((candidate) => candidate.id === checkId);

  if (check && check.status !== 'fail') {
    return (
      <div>
        <p className="mb-2 text-label uppercase text-counted">Already in order</p>
        <h1 className="mb-3 text-display-l text-ink">{check.label}</h1>
        <p className="mb-4 text-body text-ink-2">{check.detail}</p>
        <p className="mb-6 text-caption text-ink-3">{guide.jargon}</p>
        <StickyActionBar>
          <Button onClick={() => navigate(withPersona('/verdict', personaId))}>Back to your verdict</Button>
        </StickyActionBar>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-3 text-display-l text-ink">{fixTitle(guide, persona, check)}</h1>

      <p className="mb-4 rounded-r border-l-4 border-indigo bg-indigo-bg px-4 py-3 text-body-s text-ink">
        {guide.flag}
      </p>

      <Block heading="What to do">{guide.whatToDo}</Block>
      <Block heading="How long it takes">{guide.howLong}</Block>
      <Block heading="If that doesn't work">{guide.ifItDoesNotWork}</Block>

      <p className="mt-3 text-caption text-ink-3">{guide.jargon}</p>

      <StickyActionBar>
        <Button onClick={() => navigate(withPersona('/timeline', personaId))}>See my job history</Button>
      </StickyActionBar>
    </div>
  );
}
