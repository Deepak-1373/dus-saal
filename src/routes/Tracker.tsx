import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import StickyActionBar from '../components/StickyActionBar';
import { GRIEVANCE_HOST, SMS_MOCK, STALL_THRESHOLD_DAYS } from '../data/claim';
import { withPersona } from '../lib/fix';
import { DEMO_AS_OF } from '../lib/service';
import { claimProgress, type StageState } from '../lib/tracker';
import { resolvePersona } from '../lib/verdict';

const DOT_CLASSES: Record<StageState, string> = {
  done: 'bg-counted border-counted',
  now: 'bg-indigo border-indigo ring-4 ring-indigo/20',
  upcoming: 'bg-card border-rule',
};

export default function Tracker() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const personaId = params.get('persona');
  const persona = resolvePersona(personaId);
  const progress = claimProgress(persona, DEMO_AS_OF);

  if (!progress.hasClaim) {
    return (
      <div>
        <h1 className="mb-3 text-display-l text-ink">Nothing is in progress</h1>
        <p className="mb-4 text-body text-ink-2">
          All four conditions are already in order, so there is no request to follow. If that ever
          changes, this is where you would watch it.
        </p>
        <StickyActionBar>
          <Button onClick={() => navigate(withPersona('/verdict', personaId))}>
            Back to your verdict
          </Button>
        </StickyActionBar>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4 text-display-l text-ink">Where your request is</h1>

      <ol>
        {progress.stages.map((stage) => (
          <li key={stage.title} className="flex gap-3 border-b border-rule-2 py-3">
            <span
              aria-hidden="true"
              className={`mt-2 h-3 w-3 shrink-0 rounded-full border-hair ${DOT_CLASSES[stage.state]}`}
            />
            <span className="min-w-0">
              <span className="block text-body font-semibold text-ink">{stage.title}</span>
              <span className="mt-1 block text-caption text-ink-2">{stage.duration}</span>
              {stage.state === 'now' ? (
                <span className="mt-1 block text-caption text-ink-3">{stage.ifStalled}</span>
              ) : null}
            </span>
          </li>
        ))}
      </ol>

      {progress.stalled ? (
        <p className="mt-4 rounded bg-uncounted-bg p-3 text-body-s text-uncounted">
          This has been waiting {progress.daysWaiting} days, past the {STALL_THRESHOLD_DAYS} it should
          take. Raise a grievance at {GRIEVANCE_HOST} — we will show you what to write.
        </p>
      ) : null}

      <div className="mt-4 rounded bg-rule-2 p-3">
        <p className="mb-1 text-label uppercase text-ink-3">Example message — mock only</p>
        <p className="text-caption text-ink-2">{SMS_MOCK}</p>
        <p className="mt-2 text-caption text-ink-3">
          Nothing is sent. This shows how updates would reach someone without a smartphone.
        </p>
      </div>

      <p className="mt-4 text-caption text-ink-3">
        Stuck past {STALL_THRESHOLD_DAYS} days? Raise a grievance at {GRIEVANCE_HOST} — we will show you
        what to write.
      </p>

      <StickyActionBar>
        <Button onClick={() => navigate(withPersona('/verdict', personaId))}>Back to your verdict</Button>
      </StickyActionBar>
    </div>
  );
}
