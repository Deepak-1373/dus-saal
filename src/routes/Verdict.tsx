import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import Disclosure from '../components/Disclosure';
import LedgerBar from '../components/LedgerBar';
import StatusRow from '../components/StatusRow';
import StickyActionBar from '../components/StickyActionBar';
import { formatMonths } from '../lib/format';
import { computeVerdict, DEMO_AS_OF, PENSION_THRESHOLD_MONTHS } from '../lib/service';
import { primaryAction, resolvePersona } from '../lib/verdict';

export default function Verdict() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const persona = resolvePersona(params.get('persona'));
  const verdict = computeVerdict(persona, DEMO_AS_OF);
  const action = primaryAction(verdict);

  return (
    <div className="md:-mx-gutter md:grid md:grid-cols-[1.15fr_1fr] md:gap-0">
      <section className="md:border-r md:border-rule md:px-gutter md:pb-6">
        <p className="mb-2 text-label uppercase text-ink-3">Your recognised service</p>
        <h1 className="mb-2 text-display-xl text-ink lg:text-display-2xl">
          {formatMonths(verdict.recognisedMonths)}
        </h1>
        <p className="mb-4 text-body text-ink-2 md:text-body-l">
          You need <strong className="font-bold">{formatMonths(PENSION_THRESHOLD_MONTHS)}</strong> for a
          monthly pension for life.
        </p>

        <LedgerBar
          recognisedMonths={verdict.recognisedMonths}
          gapMonths={verdict.gapMonths}
          targetMonths={PENSION_THRESHOLD_MONTHS}
        />

        {verdict.gapMonths > 0 ? (
          <p className="mt-4 rounded bg-uncounted-bg p-3 text-body-s text-uncounted">
            You've worked <strong className="font-semibold">{formatMonths(verdict.believedMonths)}</strong>.{' '}
            <strong className="font-semibold">{formatMonths(verdict.gapMonths)}</strong> of that isn't being
            counted.
          </p>
        ) : (
          <p className="mt-4 rounded bg-counted-bg p-3 text-body-s text-counted">
            Every month you've worked is counting. Nothing is stuck.
          </p>
        )}
      </section>

      <section className="mt-8 md:mt-0 md:bg-card md:px-gutter md:pb-6">
        <h2 className="mb-1 text-label uppercase text-ink-3">Why</h2>
        {persona.checks.map((check) => (
          <StatusRow
            key={check.id}
            status={check.status}
            label={check.label}
            detail={check.status === 'fail' ? check.detail : undefined}
            onClick={() => navigate(`/fix/${check.id}`)}
          />
        ))}

        <div className="mt-4">
          <Disclosure summary="Show technical details">
            <ul>
              {persona.employments.map((employment) => (
                <li key={employment.id} className="border-b border-rule-2 py-2 last:border-b-0">
                  <span className="block text-body-s font-semibold text-ink">{employment.employerName}</span>
                  <span className="block font-mono text-data text-ink-3">
                    {employment.memberId} · {employment.fromDate} → {employment.toDate ?? 'present'}
                  </span>
                </li>
              ))}
            </ul>
          </Disclosure>
        </div>

        <StickyActionBar>
          <Button onClick={() => navigate(action.to)}>{action.label}</Button>
        </StickyActionBar>
      </section>
    </div>
  );
}
