import { DEFAULT_PERSONA_ID, PERSONAS } from '../data/personas';
import type { StringKey } from '../i18n/strings';
import type { Persona, ServiceVerdict } from '../types';

export interface PrimaryAction {
  labelKey: StringKey;
  to: string;
}

export function resolvePersona(id: string | null): Persona {
  const match = PERSONAS.find((persona) => persona.id === id);
  if (match) return match;

  const fallback = PERSONAS.find((persona) => persona.id === DEFAULT_PERSONA_ID);
  if (!fallback) throw new Error(`Default persona ${DEFAULT_PERSONA_ID} is missing from the fixtures`);
  return fallback;
}

export function primaryAction(verdict: ServiceVerdict): PrimaryAction {
  const [firstFailure] = verdict.failedChecks;
  if (!firstFailure) return { labelKey: 'verdictAllClear', to: '/timeline' };

  return { labelKey: 'verdictFix', to: `/fix/${firstFailure.id}` };
}
