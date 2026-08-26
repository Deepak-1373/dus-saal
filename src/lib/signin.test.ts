import { describe, expect, test } from 'vitest';
import { CODE_LENGTH, codeError, isAcceptedCode } from './signin';

describe('isAcceptedCode', () => {
  test('accepts any six digits, because nothing is verified', () => {
    expect(isAcceptedCode('123456')).toBe(true);
    expect(isAcceptedCode('000000')).toBe(true);
    expect(isAcceptedCode('987654')).toBe(true);
  });

  test('rejects a code that is not six digits long', () => {
    expect(isAcceptedCode('12345')).toBe(false);
    expect(isAcceptedCode('1234567')).toBe(false);
    expect(isAcceptedCode('')).toBe(false);
  });

  test('rejects letters and punctuation rather than silently passing them', () => {
    expect(isAcceptedCode('12345a')).toBe(false);
    expect(isAcceptedCode('12 34 5')).toBe(false);
  });

  test('agrees with the length the screen advertises', () => {
    expect(isAcceptedCode('1'.repeat(CODE_LENGTH))).toBe(true);
  });
});

describe('codeError', () => {
  test('says nothing while the field is untouched', () => {
    expect(codeError('')).toBeNull();
  });

  test('explains what to type rather than apologising', () => {
    const message = codeError('123');

    expect(message).toBe('Enter any six digits. The demo does not check them.');
    expect(message).not.toMatch(/sorry|error occurred|invalid/i);
  });

  test('says nothing once the code is acceptable', () => {
    expect(codeError('123456')).toBeNull();
  });
});
