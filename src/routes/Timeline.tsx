import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import Disclosure from '../components/Disclosure';
import StickyActionBar from '../components/StickyActionBar';
import { withPersona } from '../lib/fix';
import { DEMO_AS_OF } from '../lib/service';
import { jobRow, type JobStatus } from '../lib/timeline';
import { resolvePersona } from '../lib/verdict';

const TONE_CLASSES = {
  pass: 'bg-counted-bg text-counted',
  fail: 'bg-uncounted-bg text-uncounted',
} as const;

function Pill({ status }: { status: JobStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm px-2 py-1 text-caption font-semibold ${TONE_CLASSES[status.tone]}`}
    >
      <span aria-hidden="true">{status.tone === 'pass' ? '✓' : '!'}</span>
      {status.label}
    </span>
  );
}

export default function Timeline() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const personaId = params.get('persona');
  const persona = resolvePersona(personaId);
  const rows = persona.employments.map((job) => jobRow(job, DEMO_AS_OF));

  return (
    <div>
      <h1 className="mb-2 text-display-l text-ink">Your job history</h1>
      <p className="mb-5 text-body-s text-ink-2">
        Money and years are tracked separately. They don't always agree.
      </p>

      <ul>
        {rows.map((row) => (
          <li
            key={row.id}
            className={`mb-3 rounded border bg-card p-4 ${
              row.service.tone === 'fail' ? 'border-uncounted' : 'border-rule'
            }`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-body font-semibold text-ink">{row.employerName}</h2>
              <span className="shrink-0 whitespace-nowrap font-mono text-data text-ink-3">{row.dates}</span>
            </div>
            <p className="mt-1 text-caption text-ink-2">{row.duration}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Pill status={row.money} />
              <Pill status={row.service} />
            </div>
          </li>
        ))}
      </ul>

      <Disclosure summary="Show technical details">
        <ul>
          {rows.map((row) => (
            <li key={row.id} className="border-b border-rule-2 py-2 last:border-b-0">
              <span className="block text-body-s font-semibold text-ink">{row.employerName}</span>
              <span className="block font-mono text-data text-ink-3">{row.memberId}</span>
            </li>
          ))}
        </ul>
      </Disclosure>

      <StickyActionBar>
        <Button onClick={() => navigate(withPersona('/tracker', personaId))}>Track a fix request</Button>
      </StickyActionBar>
    </div>
  );
}
