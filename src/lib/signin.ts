export const CODE_LENGTH = 6;

const SIX_DIGITS = /^\d{6}$/;

export function isAcceptedCode(value: string): boolean {
  return SIX_DIGITS.test(value);
}

export function codeError(value: string): string | null {
  if (value === '' || isAcceptedCode(value)) return null;
  return 'Enter any six digits. The demo does not check them.';
}
