import { describe, expect, test } from 'vitest';
import { ledgerSlots, ledgerSummary } from './ledger';

describe('ledgerSlots', () => {
  test('gives one slot per year of the target', () => {
    expect(ledgerSlots({ recognisedMonths: 0, gapMonths: 0, targetMonths: 120 })).toHaveLength(10);
  });

  test('fills whole years, then a part year, then the gap, then what is still ahead', () => {
    const slots = ledgerSlots({ recognisedMonths: 50, gapMonths: 26, targetMonths: 120 });

    expect(slots.map((slot) => slot.state)).toEqual([
      'counted',
      'counted',
      'counted',
      'counted',
      'partial',
      'uncounted',
      'uncounted',
      'remaining',
      'remaining',
      'remaining',
    ]);
  });

  test('fills the part year by the months actually earned in it', () => {
    const slots = ledgerSlots({ recognisedMonths: 50, gapMonths: 26, targetMonths: 120 });

    expect(slots[4].fill).toBeCloseTo(2 / 12);
    expect(slots[0].fill).toBe(1);
    expect(slots[9].fill).toBe(0);
  });

  test('marks every slot counted once the target is reached', () => {
    const slots = ledgerSlots({ recognisedMonths: 120, gapMonths: 0, targetMonths: 120 });

    expect(slots.every((slot) => slot.state === 'counted')).toBe(true);
  });

  test('leaves every slot remaining when nothing counts yet', () => {
    const slots = ledgerSlots({ recognisedMonths: 0, gapMonths: 0, targetMonths: 120 });

    expect(slots.every((slot) => slot.state === 'remaining')).toBe(true);
  });

  test('never renders more slots than the target even when service overshoots', () => {
    const slots = ledgerSlots({ recognisedMonths: 200, gapMonths: 40, targetMonths: 120 });

    expect(slots).toHaveLength(10);
    expect(slots.every((slot) => slot.state === 'counted')).toBe(true);
  });

  test('shows the gap without a part year when whole years are recognised', () => {
    const slots = ledgerSlots({ recognisedMonths: 24, gapMonths: 24, targetMonths: 120 });

    expect(slots.map((slot) => slot.state).slice(0, 4)).toEqual([
      'counted',
      'counted',
      'uncounted',
      'uncounted',
    ]);
  });
});

describe('ledgerSummary', () => {
  test('reads the bar out for a screen reader', () => {
    expect(ledgerSummary({ recognisedMonths: 50, gapMonths: 26, targetMonths: 120 })).toBe(
      '4 years 2 months counting, 2 years 2 months not counting, 10 years needed.',
    );
  });

  test('omits the gap clause when nothing is missing', () => {
    expect(ledgerSummary({ recognisedMonths: 85, gapMonths: 0, targetMonths: 120 })).toBe(
      '7 years 1 month counting, 10 years needed.',
    );
  });
});
