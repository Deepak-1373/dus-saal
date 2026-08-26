import type { Employment } from '../types';
import { formatMonths, formatPaise } from './format';
import { monthsBetween } from './service';

export type StatusTone = 'pass' | 'fail';

export interface JobStatus {
  tone: StatusTone;
  label: string;
}

export interface JobRow {
  id: string;
  employerName: string;
  memberId: string;
  dates: string;
  duration: string;
  money: JobStatus;
  service: JobStatus;
}

function moneyStatus(job: Employment): JobStatus {
  // Money at a job you still hold is arriving, not stranded.
  if (job.toDate === null) return { tone: 'pass', label: 'Receiving deposits' };
  if (job.balanceTransferred) return { tone: 'pass', label: 'Money moved' };
  return { tone: 'fail', label: `${formatPaise(job.balancePaise)} still here` };
}

export function jobRow(job: Employment, asOf: string): JobRow {
  const months = monthsBetween(job.fromDate, job.toDate ?? asOf);
  const startYear = job.fromDate.slice(0, 4);
  const endYear = job.toDate ? job.toDate.slice(0, 4) : 'now';

  return {
    id: job.id,
    employerName: job.employerName,
    memberId: job.memberId,
    dates: `${startYear}–${endYear}`,
    duration: job.toDate === null ? `${formatMonths(months)} · current` : formatMonths(months),
    money: moneyStatus(job),
    service: job.serviceRecognised
      ? { tone: 'pass', label: 'Years counting' }
      : { tone: 'fail', label: 'Years not counting' },
  };
}
