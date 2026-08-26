import { describe, expect, test } from 'vitest';
import { FIX_GUIDES } from '../data/fixes';
import type { CheckId } from '../types';
import { fixTitle, resolveBlamedEmployer, withPersona } from './fix';
import { resolvePersona } from './verdict';

const CHECK_IDS: CheckId[] = ['aadhaar', 'identity_match', 'exit_date', 'first_deposit'];

describe('the guides', () => {
  test('cover all four conditions', () => {
    expect(Object.keys(FIX_GUIDES).sort()).toEqual([...CHECK_IDS].sort());
  });

  test('every guide carries the three blocks in the fixed order', () => {
    for (const id of CHECK_IDS) {
      const guide = FIX_GUIDES[id];
      expect(guide.whatToDo.length).toBeGreaterThan(0);
      expect(guide.howLong.length).toBeGreaterThan(0);
      expect(guide.ifItDoesNotWork.length).toBeGreaterThan(0);
    }
  });

  test('every guide translates its EPFO term rather than leading with it', () => {
    for (const id of CHECK_IDS) {
      expect(FIX_GUIDES[id].jargon).toMatch(/EPFO calls this/);
      expect(FIX_GUIDES[id].title).not.toMatch(/Date of Exit|Form 13|seeding|joint declaration/i);
    }
  });

  test('the exit-date page leads with marking it yourself, before any employer route', () => {
    const guide = FIX_GUIDES.exit_date;
    const selfIndex = guide.whatToDo.search(/yourself|your own/i);
    const employerIndex = guide.ifItDoesNotWork.search(/employer/i);

    expect(selfIndex).toBeGreaterThanOrEqual(0);
    expect(employerIndex).toBeGreaterThanOrEqual(0);
    expect(guide.whatToDo).not.toMatch(/ask your (old )?employer/i);
  });

  test('the exit-date fallbacks run employer first, then a grievance', () => {
    const fallback = FIX_GUIDES.exit_date.ifItDoesNotWork;

    expect(fallback.search(/employer/i)).toBeLessThan(fallback.search(/epfigms/i));
  });

  test('the first-deposit page says nothing is wrong rather than prescribing a fix', () => {
    expect(FIX_GUIDES.first_deposit.flag).toMatch(/nothing to fix|nothing is wrong/i);
    expect(FIX_GUIDES.first_deposit.howLong).toMatch(/check again/i);
  });
});

describe('resolveBlamedEmployer', () => {
  test('names the job the check blames', () => {
    const priya = resolvePersona('priya');
    const check = priya.checks.find((c) => c.id === 'exit_date');

    expect(resolveBlamedEmployer(priya, check)).toBe('Trilok Logistics');
  });

  test('returns null when the check blames nothing the persona has', () => {
    const priya = resolvePersona('priya');

    expect(resolveBlamedEmployer(priya, undefined)).toBeNull();
  });
});

describe('fixTitle', () => {
  test('puts the blamed employer into the heading', () => {
    const priya = resolvePersona('priya');
    const check = priya.checks.find((c) => c.id === 'exit_date');

    expect(fixTitle(FIX_GUIDES.exit_date, priya, check)).toBe(
      "Trilok Logistics hasn't recorded your last working day",
    );
  });

  test('falls back to a generic subject rather than printing a placeholder', () => {
    const priya = resolvePersona('priya');

    expect(fixTitle(FIX_GUIDES.exit_date, priya, undefined)).not.toMatch(/\{employer\}/);
  });

  test('leaves a heading that names no employer untouched', () => {
    const priya = resolvePersona('priya');
    const check = priya.checks.find((c) => c.id === 'aadhaar');

    expect(fixTitle(FIX_GUIDES.aadhaar, priya, check)).toBe(FIX_GUIDES.aadhaar.title);
  });
});

describe('withPersona', () => {
  test('carries the persona so a fix page does not silently revert to priya', () => {
    expect(withPersona('/timeline', 'rahul')).toBe('/timeline?persona=rahul');
  });

  test('leaves the path clean when no persona was named', () => {
    expect(withPersona('/timeline', null)).toBe('/timeline');
  });
});
