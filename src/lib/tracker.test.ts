import { describe, expect, test } from 'vitest';
import { CLAIM_SUBMITTED_ON, STALL_THRESHOLD_DAYS } from '../data/claim';
import { DEMO_AS_OF } from './service';
import { claimProgress, daysBetween } from './tracker';
import { resolvePersona } from './verdict';

describe('daysBetween', () => {
  test('counts whole days across a month boundary', () => {
    expect(daysBetween('2026-08-14', '2026-08-26')).toBe(12);
  });

  test('is zero on the same day', () => {
    expect(daysBetween('2026-08-14', '2026-08-14')).toBe(0);
  });

  test('does not go negative when the dates are reversed', () => {
    expect(daysBetween('2026-08-26', '2026-08-14')).toBe(0);
  });
});

describe('claimProgress for a persona with a failed condition', () => {
  const progress = claimProgress(resolvePersona('priya'), DEMO_AS_OF);

  test('has a claim in progress', () => {
    expect(progress.hasClaim).toBe(true);
  });

  test('waits on the employer that actually caused the failure', () => {
    expect(progress.blamedEmployer).toBe('Trilok Logistics');
    expect(progress.stages[1].title).toBe('Waiting on Trilok Logistics');
  });

  test('runs four states in order, one of them current', () => {
    expect(progress.stages).toHaveLength(4);
    expect(progress.stages.map((stage) => stage.state)).toEqual(['done', 'now', 'upcoming', 'upcoming']);
  });

  test('gives every state an expected duration and a line on what to do if it stalls', () => {
    for (const stage of progress.stages) {
      expect(stage.duration.length).toBeGreaterThan(0);
      expect(stage.ifStalled.length).toBeGreaterThan(0);
    }
  });

  test('counts the days waited from the submitted date', () => {
    expect(progress.submittedOn).toBe(CLAIM_SUBMITTED_ON);
    expect(progress.daysWaiting).toBe(12);
  });

  test('is not stalled at twelve days', () => {
    expect(progress.daysWaiting).toBeLessThan(STALL_THRESHOLD_DAYS);
    expect(progress.stalled).toBe(false);
  });

  test('names no EPFO status code anywhere a reader can see it', () => {
    const visible = progress.stages.flatMap((stage) => [stage.title, stage.duration, stage.ifStalled]);

    for (const text of visible) {
      expect(text).not.toMatch(/form 13|annexure|claim id|status code|[A-Z]{2,}\d{3,}/i);
    }
  });
});

describe('a claim that has stalled', () => {
  test('passes the threshold and is flagged once the wait runs long', () => {
    const progress = claimProgress(resolvePersona('priya'), '2026-09-05');

    expect(progress.daysWaiting).toBe(22);
    expect(progress.stalled).toBe(true);
  });

  test('routes a stalled claim to the grievance service', () => {
    const progress = claimProgress(resolvePersona('priya'), '2026-09-05');

    expect(progress.stages[1].ifStalled).toMatch(/epfigms\.gov\.in/);
  });
});

describe('claimProgress for an all-clear persona', () => {
  test('has nothing in progress, because nothing needed fixing', () => {
    const progress = claimProgress(resolvePersona('anjali'), DEMO_AS_OF);

    expect(progress.hasClaim).toBe(false);
    expect(progress.blamedEmployer).toBeNull();
  });
});
