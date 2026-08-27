import type { Lang } from '../i18n/lang';

const INDIAN_GROUPING = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });

const UNITS = {
  en: { year: 'year', years: 'years', month: 'month', months: 'months' },
  hi: { year: 'साल', years: 'साल', month: 'महीना', months: 'महीने' },
} as const;

export function formatPaise(paise: number): string {
  // Integer division keeps money in whole rupees; paise never reach a float.
  return `₹${INDIAN_GROUPING.format(Math.trunc(paise / 100))}`;
}

export function formatMonths(months: number, lang: Lang = 'en'): string {
  const years = Math.trunc(months / 12);
  const remainder = months % 12;
  const units = UNITS[lang];
  const parts: string[] = [];

  if (years > 0) parts.push(`${years} ${years === 1 ? units.year : units.years}`);
  if (remainder > 0) parts.push(`${remainder} ${remainder === 1 ? units.month : units.months}`);

  return parts.length > 0 ? parts.join(' ') : `0 ${units.months}`;
}
