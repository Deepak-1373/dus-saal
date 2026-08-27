import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../components/Button';
import Disclosure from '../components/Disclosure';
import LedgerBar from '../components/LedgerBar';
import StatusRow from '../components/StatusRow';
import StickyActionBar from '../components/StickyActionBar';
import { formatMonths } from '../lib/format';
import { computeVerdict, DEMO_AS_OF, PENSION_THRESHOLD_MONTHS } from '../lib/service';
import { useLanguage } from '../i18n/LanguageProvider';
import { withPersona } from '../lib/fix';
import { primaryAction, resolvePersona } from '../lib/verdict';

// Renders "…{token}…" with each value emphasised, so translated sentences keep
// their emphasis instead of being concatenated in fixed English order.
function Sentence({ template, values }: { template: string; values: Record<string, string> }) {
  return (
    <>
      {template.split(/(\{\w+\})/g).map((piece, index) => {
        const key = piece.slice(1, -1);
        return piece.startsWith('{') && key in values ? (
          <strong key={index} className="font-bold">
            {values[key]}
          </strong>
        ) : (
          piece
        );
      })}
    </>
  );
}

export default function Verdict() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const personaId = params.get('persona');
  const persona = resolvePersona(personaId);
  const verdict = computeVerdict(persona, DEMO_AS_OF);
  const action = primaryAction(verdict);

  return (
    <div className="md:-mx-gutter md:grid md:grid-cols-[1.15fr_1fr] md:gap-0">
      <section className="md:border-r md:border-rule md:px-gutter md:pb-6">
        <p className="mb-2 text-label uppercase text-ink-3">{t('verdictEyebrow')}</p>
        <h1
          // display-xl sets leading 1, which is too tight for Devanagari ascenders and matras
          className={`mb-2 text-display-xl text-ink lg:text-display-2xl ${lang === 'hi' ? 'leading-tight' : ''}`}
        >
          {formatMonths(verdict.recognisedMonths, lang)}
        </h1>
        <p className="mb-4 text-body text-ink-2 md:text-body-l">
          <Sentence
            template={t('verdictNeed')}
            values={{ target: formatMonths(PENSION_THRESHOLD_MONTHS, lang) }}
          />
        </p>

        <LedgerBar
          recognisedMonths={verdict.recognisedMonths}
          gapMonths={verdict.gapMonths}
          targetMonths={PENSION_THRESHOLD_MONTHS}
        />

        {verdict.gapMonths > 0 ? (
          <p className="mt-4 rounded bg-uncounted-bg p-3 text-body-s text-uncounted">
            <Sentence
              template={t('verdictCompare')}
              values={{
                believed: formatMonths(verdict.believedMonths, lang),
                gap: formatMonths(verdict.gapMonths, lang),
              }}
            />
          </p>
        ) : (
          <p className="mt-4 rounded bg-counted-bg p-3 text-body-s text-counted">
            {t('verdictAllCounting')}
          </p>
        )}
      </section>

      <section className="mt-8 md:mt-0 md:bg-card md:px-gutter md:pb-6">
        <h2 className="mb-1 text-label uppercase text-ink-3">{t('verdictWhy')}</h2>
        {persona.checks.map((check) => (
          <StatusRow
            key={check.id}
            status={check.status}
            label={lang === 'hi' ? check.labelHi : check.label}
            detail={
              check.status === 'fail' ? (lang === 'hi' ? check.detailHi : check.detail) : undefined
            }
            onClick={() => navigate(withPersona(`/fix/${check.id}`, personaId))}
          />
        ))}

        <div className="mt-4">
          <Disclosure summary={t('verdictShowDetails')}>
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
          <Button onClick={() => navigate(withPersona(action.to, personaId))}>{t(action.labelKey)}</Button>
        </StickyActionBar>
      </section>
    </div>
  );
}
