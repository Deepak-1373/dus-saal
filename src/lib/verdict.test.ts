import { describe, expect, test } from 'vitest';
import { PERSONAS } from '../data/personas';
import { computeVerdict, DEMO_AS_OF } from './service';
import { primaryAction, resolvePersona } from './verdict';

const verdictFor = (id: string) => computeVerdict(resolvePersona(id), DEMO_AS_OF);

describe('resolvePersona', () => {
  test('returns the persona named in the url', () => {
    expect(resolvePersona('rahul').id).toBe('rahul');
  });

  test('falls back to the demo default when nothing is named', () => {
    expect(resolvePersona(null).id).toBe('priya');
  });

  test('falls back rather than throwing when the name is not a persona', () => {
    expect(resolvePersona('nobody').id).toBe('priya');
  });
});

describe('primaryAction', () => {
  test('sends someone with a failed condition to that condition’s fix page', () => {
    expect(primaryAction(verdictFor('priya'))).toEqual({
      label: 'Fix this',
      to: '/fix/exit_date',
    });
  });

  test('names the failing condition, not the first condition in the list', () => {
    expect(primaryAction(verdictFor('rahul')).to).toBe('/fix/identity_match');
  });

  test('offers an all-clear persona the timeline instead of a fix', () => {
    expect(primaryAction(verdictFor('anjali'))).toEqual({
      label: 'See how your years add up',
      to: '/timeline',
    });
  });

  test('gives exactly one action, never a list', () => {
    const action = primaryAction(verdictFor('priya'));

    expect(Object.keys(action).sort()).toEqual(['label', 'to']);
  });
});

describe('every persona', () => {
  test('produces a verdict with a single primary action', () => {
    for (const persona of PERSONAS) {
      const action = primaryAction(computeVerdict(persona, DEMO_AS_OF));

      expect(action.to.startsWith('/')).toBe(true);
      expect(action.label.length).toBeGreaterThan(0);
    }
  });
});
