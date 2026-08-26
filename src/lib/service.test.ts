import { describe, expect, test } from 'vitest';
import type { Employment, Persona, TransferCheck } from '../types';
import { computeVerdict, monthsBetween, PENSION_THRESHOLD_MONTHS } from './service';

const AS_OF = '2026-08-26';

function employment(over: Partial<Employment> & Pick<Employment, 'id'>): Employment {
  return {
    employerName: 'Test Employer',
    memberId: 'DEMO-TEST-00',
    fromDate: '2020-01-01',
    toDate: '2022-01-01',
    balancePaise: 0,
    balanceTransferred: true,
    serviceRecognised: true,
    exitDateMarked: true,
    ...over,
  };
}

function check(over: Partial<TransferCheck> & Pick<TransferCheck, 'id'>): TransferCheck {
  return {
    status: 'pass',
    label: 'Check',
    labelHi: 'जाँच',
    detail: 'Detail.',
    detailHi: 'विवरण।',
    blamedEmployerId: 'e1',
    jargon: 'Jargon',
    ...over,
  };
}

function persona(employments: Employment[], checks: TransferCheck[] = []): Persona {
  return {
    id: 'test',
    displayName: 'Test',
    mockUan: '0000 0000 0009',
    scenarioLabel: 'Test scenario',
    employments,
    checks,
  };
}

describe('monthsBetween', () => {
  test('counts whole months elapsed', () => {
    expect(monthsBetween('2020-04-01', '2022-06-01')).toBe(26);
  });

  test('does not count a month the end day has not reached', () => {
    expect(monthsBetween('2018-04-15', '2020-06-14')).toBe(25);
  });

  test('counts the month once the end day reaches the start day', () => {
    expect(monthsBetween('2018-04-15', '2020-06-15')).toBe(26);
  });

  test('returns zero for the same day', () => {
    expect(monthsBetween('2020-04-01', '2020-04-01')).toBe(0);
  });

  test('clamps a reversed range to zero rather than going negative', () => {
    expect(monthsBetween('2022-06-01', '2020-04-01')).toBe(0);
  });
});

describe('computeVerdict', () => {
  test('a clean persona has no gap and counts every month', () => {
    const verdict = computeVerdict(
      persona([
        employment({ id: 'e1', fromDate: '2019-07-01', toDate: '2023-05-01' }),
        employment({ id: 'e2', fromDate: '2023-05-01', toDate: null }),
      ]),
      AS_OF,
    );

    expect(verdict.believedMonths).toBe(85);
    expect(verdict.recognisedMonths).toBe(85);
    expect(verdict.gapMonths).toBe(0);
    expect(verdict.failedChecks).toEqual([]);
  });

  test('a gap persona reports the months that are not counting', () => {
    const verdict = computeVerdict(
      persona([
        employment({ id: 'e1', fromDate: '2020-04-01', toDate: '2022-06-01' }),
        employment({
          id: 'e2',
          fromDate: '2022-06-01',
          toDate: '2024-08-01',
          serviceRecognised: false,
        }),
        employment({ id: 'e3', fromDate: '2024-08-01', toDate: null }),
      ]),
      AS_OF,
    );

    expect(verdict.believedMonths).toBe(76);
    expect(verdict.recognisedMonths).toBe(50);
    expect(verdict.gapMonths).toBe(26);
  });

  test('measures a current job with a null toDate against the reference date', () => {
    const verdict = computeVerdict(
      persona([employment({ id: 'e1', fromDate: '2024-08-01', toDate: null })]),
      AS_OF,
    );

    expect(verdict.believedMonths).toBe(24);
    expect(verdict.recognisedMonths).toBe(24);
  });

  test('a persona with no employments has zero service and needs the full ten years', () => {
    const verdict = computeVerdict(persona([]), AS_OF);

    expect(verdict.believedMonths).toBe(0);
    expect(verdict.recognisedMonths).toBe(0);
    expect(verdict.gapMonths).toBe(0);
    expect(verdict.totalPaise).toBe(0);
    expect(verdict.strandedPaise).toBe(0);
    expect(verdict.monthsToTen).toBe(PENSION_THRESHOLD_MONTHS);
    expect(verdict.eligible).toBe(false);
  });

  test('counts an untransferred balance at a job already left as stranded', () => {
    const verdict = computeVerdict(
      persona([
        employment({ id: 'e1', balancePaise: 22800000 }),
        employment({ id: 'e2', balancePaise: 18432000, balanceTransferred: false }),
      ]),
      AS_OF,
    );

    expect(verdict.strandedPaise).toBe(18432000);
    expect(verdict.totalPaise).toBe(41232000);
  });

  test('does not strand money sitting at the current job', () => {
    const verdict = computeVerdict(
      persona([employment({ id: 'e1', toDate: null, balancePaise: 32680000, balanceTransferred: false })]),
      AS_OF,
    );

    expect(verdict.strandedPaise).toBe(0);
    expect(verdict.totalPaise).toBe(32680000);
  });

  test('ten years of recognised service clears the threshold', () => {
    const verdict = computeVerdict(
      persona([employment({ id: 'e1', fromDate: '2010-01-01', toDate: '2020-01-01' })]),
      AS_OF,
    );

    expect(verdict.recognisedMonths).toBe(120);
    expect(verdict.monthsToTen).toBe(0);
    expect(verdict.eligible).toBe(true);
  });

  test('one month short of ten years is not eligible', () => {
    const verdict = computeVerdict(
      persona([employment({ id: 'e1', fromDate: '2010-02-01', toDate: '2020-01-01' })]),
      AS_OF,
    );

    expect(verdict.recognisedMonths).toBe(119);
    expect(verdict.monthsToTen).toBe(1);
    expect(verdict.eligible).toBe(false);
  });

  test('returns only the failed checks', () => {
    const failing = check({ id: 'exit_date', status: 'fail' });
    const verdict = computeVerdict(
      persona(
        [employment({ id: 'e1' })],
        [check({ id: 'aadhaar' }), failing, check({ id: 'first_deposit', status: 'not_applicable' })],
      ),
      AS_OF,
    );

    expect(verdict.failedChecks).toEqual([failing]);
  });
});
