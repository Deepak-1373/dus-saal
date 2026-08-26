import { CLAIM_SUBMITTED_ON, GRIEVANCE_HOST, STALL_THRESHOLD_DAYS } from '../data/claim';
import type { Persona } from '../types';
import { resolveBlamedEmployer } from './fix';

const MS_PER_DAY = 86_400_000;

export type StageState = 'done' | 'now' | 'upcoming';

export interface ClaimStage {
  title: string;
  duration: string;
  ifStalled: string;
  state: StageState;
}

export interface ClaimProgress {
  hasClaim: boolean;
  blamedEmployer: string | null;
  submittedOn: string;
  daysWaiting: number;
  stalled: boolean;
  stages: ClaimStage[];
}

export function daysBetween(from: string, to: string): number {
  const start = Date.parse(`${from}T00:00:00Z`);
  const end = Date.parse(`${to}T00:00:00Z`);
  const days = Math.round((end - start) / MS_PER_DAY);
  return days > 0 ? days : 0;
}

export function claimProgress(persona: Persona, asOf: string): ClaimProgress {
  const failed = persona.checks.find((check) => check.status === 'fail');
  const blamedEmployer = failed ? resolveBlamedEmployer(persona, failed) : null;
  const daysWaiting = daysBetween(CLAIM_SUBMITTED_ON, asOf);
  const waitingOn = blamedEmployer ?? 'your old employer';

  return {
    hasClaim: Boolean(failed),
    blamedEmployer,
    submittedOn: CLAIM_SUBMITTED_ON,
    daysWaiting,
    stalled: daysWaiting > STALL_THRESHOLD_DAYS,
    stages: [
      {
        title: 'You sent the request',
        duration: 'Confirmed the same day.',
        ifStalled: 'If you never saw a confirmation, send it again before waiting any longer.',
        state: 'done',
      },
      {
        title: `Waiting on ${waitingOn}`,
        duration: `Usually 7 to 15 days. It has been ${daysWaiting}.`,
        ifStalled: `Past ${STALL_THRESHOLD_DAYS} days, raise a grievance at ${GRIEVANCE_HOST} and we will show you what to write.`,
        state: 'now',
      },
      {
        title: 'With the EPFO office',
        duration: 'Usually about a week after that.',
        ifStalled: `If it sits here more than ${STALL_THRESHOLD_DAYS} days, raise a grievance at ${GRIEVANCE_HOST}.`,
        state: 'upcoming',
      },
      {
        title: 'Done — your years start counting',
        duration: 'Your record updates within a day or two.',
        ifStalled: `If your service still has not changed a week later, raise a grievance at ${GRIEVANCE_HOST}.`,
        state: 'upcoming',
      },
    ],
  };
}
