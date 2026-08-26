import type { Persona, ServiceVerdict } from '../types';

export const PENSION_THRESHOLD_MONTHS = 120;

// The persona fixtures are authored to be exact on this date. Pass it as asOf
// so the demo reads the same for a judge in October as it does today.
export const DEMO_AS_OF = '2026-08-26';

// Whole months elapsed, day-aware: the final month only counts once its
// day-of-month is reached. DUS-102's fixture dates depend on this rule.
export function monthsBetween(fromDate: string, toDate: string): number {
  const [fromYear, fromMonth, fromDay] = fromDate.split('-').map(Number);
  const [toYear, toMonth, toDay] = toDate.split('-').map(Number);

  let months = (toYear - fromYear) * 12 + (toMonth - fromMonth);
  if (toDay < fromDay) months -= 1;

  return months > 0 ? months : 0;
}

// asOf is required rather than read from the clock so the result is pure and
// a current job (toDate: null) does not silently grow between runs.
export function computeVerdict(persona: Persona, asOf: string): ServiceVerdict {
  let believedMonths = 0;
  let recognisedMonths = 0;
  let strandedPaise = 0;
  let totalPaise = 0;

  for (const employment of persona.employments) {
    const months = monthsBetween(employment.fromDate, employment.toDate ?? asOf);

    believedMonths += months;
    if (employment.serviceRecognised) recognisedMonths += months;

    totalPaise += employment.balancePaise;
    // Money at the current job is where it belongs, so it is never stranded.
    if (employment.toDate !== null && !employment.balanceTransferred) {
      strandedPaise += employment.balancePaise;
    }
  }

  return {
    believedMonths,
    recognisedMonths,
    gapMonths: believedMonths - recognisedMonths,
    strandedPaise,
    totalPaise,
    monthsToTen: Math.max(0, PENSION_THRESHOLD_MONTHS - recognisedMonths),
    eligible: recognisedMonths >= PENSION_THRESHOLD_MONTHS,
    failedChecks: persona.checks.filter((check) => check.status === 'fail'),
  };
}
