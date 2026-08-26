import type { FixGuide } from '../data/fixes';
import type { Persona, TransferCheck } from '../types';

const EMPLOYER_PLACEHOLDER = '{employer}';

export function resolveBlamedEmployer(persona: Persona, check: TransferCheck | undefined): string | null {
  if (!check?.blamedEmployerId) return null;

  const employment = persona.employments.find((job) => job.id === check.blamedEmployerId);
  return employment ? employment.employerName : null;
}

export function fixTitle(guide: FixGuide, persona: Persona, check: TransferCheck | undefined): string {
  if (!guide.title.includes(EMPLOYER_PLACEHOLDER)) return guide.title;

  const employer = resolveBlamedEmployer(persona, check);
  return guide.title.replace(EMPLOYER_PLACEHOLDER, employer ?? 'Your old employer');
}

export function withPersona(path: string, personaId: string | null): string {
  return personaId ? `${path}?persona=${personaId}` : path;
}
