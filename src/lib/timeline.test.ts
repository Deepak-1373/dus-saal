import { describe, expect, test } from 'vitest';
import type { Employment } from '../types';
import { DEMO_AS_OF } from './service';
import { jobRow } from './timeline';
import { resolvePersona } from './verdict';

function employment(over: Partial<Employment>): Employment {
  return {
    id: 'e1',
    employerName: 'Test Employer',
    memberId: 'DEMO-TEST-01',
    fromDate: '2020-01-01',
    toDate: '2022-03-01',
    balancePaise: 18432000,
    balanceTransferred: true,
    serviceRecognised: true,
    exitDateMarked: true,
    ...over,
  };
}

describe('jobRow', () => {
  test('reports money and service as two independent statuses', () => {
    const row = jobRow(employment({}), DEMO_AS_OF);

    expect(row.money.tone).toBe('pass');
    expect(row.service.tone).toBe('pass');
  });

  test('names the amount still sitting in a job the member has left', () => {
    const row = jobRow(employment({ balanceTransferred: false }), DEMO_AS_OF);

    expect(row.money).toEqual({ tone: 'fail', label: '₹1,84,320 still here' });
  });

  test('says a current job is receiving deposits rather than that money is stuck', () => {
    const row = jobRow(employment({ toDate: null, balanceTransferred: false }), DEMO_AS_OF);

    expect(row.money.tone).toBe('pass');
    expect(row.money.label).toBe('Receiving deposits');
  });

  test('lets money read fine while service reads broken on the same row', () => {
    const row = jobRow(employment({ balanceTransferred: true, serviceRecognised: false }), DEMO_AS_OF);

    expect(row.money.tone).toBe('pass');
    expect(row.money.label).toBe('Money moved');
    expect(row.service.tone).toBe('fail');
    expect(row.service.label).toBe('Years not counting');
  });

  test('writes the span in years and months, not in codes', () => {
    const row = jobRow(employment({ fromDate: '2020-04-01', toDate: '2022-06-01' }), DEMO_AS_OF);

    expect(row.duration).toBe('2 years 2 months');
    expect(row.dates).toBe('2020–2022');
  });

  test('marks a current job as current and measures it to the demo date', () => {
    const row = jobRow(employment({ fromDate: '2024-08-01', toDate: null }), DEMO_AS_OF);

    expect(row.dates).toBe('2024–now');
    expect(row.duration).toBe('2 years · current');
  });
});

describe('rahul, the row the whole app argues from', () => {
  test('has a job where money settled but the years never followed', () => {
    const rows = resolvePersona('rahul').employments.map((job) => jobRow(job, DEMO_AS_OF));
    const contradiction = rows.filter((row) => row.money.tone === 'pass' && row.service.tone === 'fail');

    expect(contradiction).toHaveLength(1);
    expect(contradiction[0].employerName).toBe('Panchdhara Foods');
    expect(contradiction[0].money.label).toBe('Money moved');
    expect(contradiction[0].service.label).toBe('Years not counting');
  });
});
