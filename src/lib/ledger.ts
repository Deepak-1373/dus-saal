import { formatMonths } from './format';

const MONTHS_PER_YEAR = 12;

export type LedgerSlotState = 'counted' | 'partial' | 'uncounted' | 'remaining';

export interface LedgerSlot {
  year: number;
  state: LedgerSlotState;
  fill: number;
}

export interface LedgerInput {
  recognisedMonths: number;
  gapMonths: number;
  targetMonths: number;
}

export function ledgerSlots({ recognisedMonths, gapMonths, targetMonths }: LedgerInput): LedgerSlot[] {
  const slotCount = Math.round(targetMonths / MONTHS_PER_YEAR);
  const recognised = Math.min(recognisedMonths, targetMonths);
  const wholeYears = Math.trunc(recognised / MONTHS_PER_YEAR);
  const partMonths = recognised % MONTHS_PER_YEAR;
  const gapYears = Math.round(gapMonths / MONTHS_PER_YEAR);
  const firstGapSlot = wholeYears + (partMonths > 0 ? 1 : 0);

  return Array.from({ length: slotCount }, (_unused, index) => {
    if (index < wholeYears) return { year: index + 1, state: 'counted' as const, fill: 1 };
    if (index === wholeYears && partMonths > 0) {
      return { year: index + 1, state: 'partial' as const, fill: partMonths / MONTHS_PER_YEAR };
    }
    if (index < firstGapSlot + gapYears) return { year: index + 1, state: 'uncounted' as const, fill: 0 };
    return { year: index + 1, state: 'remaining' as const, fill: 0 };
  });
}

export function ledgerSummary({ recognisedMonths, gapMonths, targetMonths }: LedgerInput): string {
  const counting = `${formatMonths(recognisedMonths)} counting`;
  const missing = gapMonths > 0 ? `${formatMonths(gapMonths)} not counting, ` : '';
  return `${counting}, ${missing}${formatMonths(targetMonths)} needed.`;
}
