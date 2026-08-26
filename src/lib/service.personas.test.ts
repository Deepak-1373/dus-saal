import { describe, expect, test } from 'vitest';
import { DEFAULT_PERSONA_ID, PERSONAS } from '../data/personas';
import { formatMonths, formatPaise } from './format';
import { computeVerdict, DEMO_AS_OF } from './service';

function verdictFor(id: string) {
  const persona = PERSONAS.find((candidate) => candidate.id === id);
  if (!persona) throw new Error(`No persona fixture named ${id}`);
  return computeVerdict(persona, DEMO_AS_OF);
}

describe('the demo reference date', () => {
  test('is fixed, so a current job does not grow between runs', () => {
    expect(DEMO_AS_OF).toBe('2026-08-26');
  });
});

describe('priya, the default persona', () => {
  test('is the persona the picker opens on', () => {
    expect(DEFAULT_PERSONA_ID).toBe('priya');
  });

  test('believes six years four months and is credited four years two months', () => {
    const verdict = verdictFor('priya');

    expect(verdict.believedMonths).toBe(76);
    expect(verdict.recognisedMonths).toBe(50);
    expect(verdict.gapMonths).toBe(26);
    expect(formatMonths(verdict.believedMonths)).toBe('6 years 4 months');
    expect(formatMonths(verdict.recognisedMonths)).toBe('4 years 2 months');
    expect(formatMonths(verdict.gapMonths)).toBe('2 years 2 months');
  });

  test('has one stranded balance and one failed check', () => {
    const verdict = verdictFor('priya');

    expect(formatPaise(verdict.strandedPaise)).toBe('₹1,84,320');
    expect(verdict.failedChecks).toHaveLength(1);
    expect(verdict.failedChecks[0].id).toBe('exit_date');
  });
});

describe('rahul, the fragmented persona', () => {
  test('has a job where the money moved but the service did not follow', () => {
    const rahul = PERSONAS.find((persona) => persona.id === 'rahul');
    const orphaned = rahul?.employments.filter(
      (employment) => employment.balanceTransferred && !employment.serviceRecognised,
    );

    expect(orphaned).toHaveLength(1);
    expect(orphaned?.[0].employerName).toBe('Panchdhara Foods');
  });

  test('is credited only the current job despite nearly nine years worked', () => {
    const verdict = verdictFor('rahul');

    expect(verdict.believedMonths).toBe(107);
    expect(verdict.recognisedMonths).toBe(32);
    expect(verdict.failedChecks[0].id).toBe('identity_match');
  });
});

describe('anjali, the all-clear persona', () => {
  test('has every month counting, nothing stranded and no failed check', () => {
    const verdict = verdictFor('anjali');

    expect(verdict.recognisedMonths).toBe(85);
    expect(verdict.gapMonths).toBe(0);
    expect(verdict.strandedPaise).toBe(0);
    expect(verdict.failedChecks).toEqual([]);
    expect(formatMonths(verdict.recognisedMonths)).toBe('7 years 1 month');
  });

  test('is still short of the pension threshold, so good news is not eligibility', () => {
    const verdict = verdictFor('anjali');

    expect(verdict.eligible).toBe(false);
    expect(verdict.monthsToTen).toBe(35);
  });
});
