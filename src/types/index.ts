// src/types/index.ts — DUS-101. Do not change without telling the other person.

export type CheckId = 'aadhaar' | 'identity_match' | 'exit_date' | 'first_deposit';
export type CheckStatus = 'pass' | 'fail' | 'not_applicable';

export interface TransferCheck {
  id: CheckId;
  status: CheckStatus;
  label: string;          // plain language, user-facing
  labelHi: string;
  detail: string;         // what it means, one sentence
  detailHi: string;
  blamedEmployerId?: string;   // which job caused this
  jargon?: string;        // e.g. "Date of Exit" — shown in parentheses only
}

export interface Employment {
  id: string;
  employerName: string;
  memberId: string;             // hidden by default in UI
  fromDate: string;             // 'YYYY-MM-DD'
  toDate: string | null;        // null = current job
  balancePaise: number;         // integers only, never floats for money
  balanceTransferred: boolean;  // did the money move?
  serviceRecognised: boolean;   // do these years count? ← the whole point
  exitDateMarked: boolean;
}

export interface Persona {
  id: string;
  displayName: string;
  mockUan: string;              // obviously invalid, e.g. '0000 0000 0001'
  scenarioLabel: string;        // shown in the picker: "Exit date not marked"
  employments: Employment[];
  checks: TransferCheck[];
}

// Everything below is DERIVED. Never stored in the persona fixtures.
export interface ServiceVerdict {
  believedMonths: number;
  recognisedMonths: number;
  gapMonths: number;
  strandedPaise: number;
  totalPaise: number;
  monthsToTen: number;
  eligible: boolean;
  failedChecks: TransferCheck[];
}
