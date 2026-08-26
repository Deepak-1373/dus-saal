import type { CheckId } from '../types';

export interface FixGuide {
  title: string;
  flag: string;
  whatToDo: string;
  howLong: string;
  ifItDoesNotWork: string;
  jargon: string;
}

export const FIX_GUIDES: Record<CheckId, FixGuide> = {
  exit_date: {
    title: "{employer} hasn't recorded your last working day",
    flag: "You don't need them. You can record it yourself — most people never find out this is possible.",
    whatToDo:
      'Sign in to the EPFO member portal and mark your own last working day. You can do this about two months after your final contribution there. Use the real date, the one on your relieving letter.',
    howLong: 'It usually appears within a few days. Your transfer can go through after that.',
    ifItDoesNotWork:
      'Email your old employer with your relieving letter attached. If they still do not act, raise a grievance with EPFO at epfigms.gov.in.',
    jargon: 'EPFO calls this your Date of Exit. Worth knowing if you search for it later.',
  },
  identity_match: {
    title: "Your name and date of birth don't match across your records",
    flag: 'You can correct this yourself. In most cases it no longer needs your employer to approve it.',
    whatToDo:
      'On the member portal, open Manage and choose to change your basic details. Enter your name, date of birth and gender exactly as they appear on your Aadhaar, then submit.',
    howLong: 'Checking usually takes a week or two. Once it clears, the transfer can start on its own.',
    ifItDoesNotWork:
      'If the portal still asks your employer to approve it, send them the request in writing. If it stalls after that, raise a grievance with EPFO at epfigms.gov.in.',
    jargon: 'EPFO calls this a joint declaration to correct member details.',
  },
  aadhaar: {
    title: "Your Aadhaar isn't linked to your PF account",
    flag: 'This is the quickest of the four to sort out, and you can start it yourself today.',
    whatToDo:
      'On the member portal, open Manage and choose KYC. Add your Aadhaar number and save it. Your employer then approves it from their side.',
    howLong: 'Approval usually takes a few days. Nothing else can move until this is done.',
    ifItDoesNotWork:
      'Ask your employer in writing to approve the KYC entry. If they do not, raise a grievance with EPFO at epfigms.gov.in.',
    jargon: 'EPFO calls this Aadhaar seeding.',
  },
  first_deposit: {
    title: 'Nothing is wrong here',
    flag: "There's nothing to fix. Your new employer simply hasn't paid into your account yet.",
    whatToDo:
      'Wait until after your first salary at the new job. That first PF deposit is what tells EPFO your new account is live, and the transfer can only follow it.',
    howLong: 'Usually one salary cycle, about a month. Then check again.',
    ifItDoesNotWork:
      'If two salaries have gone by and nothing has appeared, ask your employer when they filed your PF. If they cannot say, raise a grievance with EPFO at epfigms.gov.in.',
    jargon: 'EPFO calls this your first contribution.',
  },
};
