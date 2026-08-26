const INDIAN_GROUPING = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });

export function formatPaise(paise: number): string {
  // Integer division keeps money in whole rupees; paise never reach a float.
  return `₹${INDIAN_GROUPING.format(Math.trunc(paise / 100))}`;
}

export function formatMonths(months: number): string {
  const years = Math.trunc(months / 12);
  const remainder = months % 12;
  const parts: string[] = [];

  if (years > 0) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  if (remainder > 0) parts.push(`${remainder} ${remainder === 1 ? 'month' : 'months'}`);

  return parts.length > 0 ? parts.join(' ') : '0 months';
}
