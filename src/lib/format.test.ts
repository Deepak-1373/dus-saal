import { describe, expect, test } from 'vitest';
import { formatMonths, formatPaise } from './format';

describe('formatPaise', () => {
  test('groups Indian-style, lakh before thousand', () => {
    expect(formatPaise(18432000)).toBe('₹1,84,320');
  });

  test('groups a seven-figure rupee amount at the crore boundary', () => {
    expect(formatPaise(1234567800)).toBe('₹1,23,45,678');
  });

  test('leaves amounts below a thousand ungrouped', () => {
    expect(formatPaise(45000)).toBe('₹450');
  });

  test('renders zero', () => {
    expect(formatPaise(0)).toBe('₹0');
  });

  test('truncates stray paise rather than showing a decimal', () => {
    expect(formatPaise(18432099)).toBe('₹1,84,320');
  });
});

describe('formatMonths', () => {
  test('renders years and months together', () => {
    expect(formatMonths(50)).toBe('4 years 2 months');
  });

  test('renders a single month in the singular', () => {
    expect(formatMonths(25)).toBe('2 years 1 month');
  });

  test('renders a single year in the singular', () => {
    expect(formatMonths(12)).toBe('1 year');
  });

  test('omits the month part when a whole number of years', () => {
    expect(formatMonths(24)).toBe('2 years');
  });

  test('omits the year part below twelve months', () => {
    expect(formatMonths(10)).toBe('10 months');
  });

  test('renders zero as no months', () => {
    expect(formatMonths(0)).toBe('0 months');
  });
});

describe('formatMonths in Hindi', () => {
  test('renders years and months in Devanagari words', () => {
    expect(formatMonths(50, 'hi')).toBe('4 साल 2 महीने');
  });

  test('uses the singular month form for one month', () => {
    expect(formatMonths(25, 'hi')).toBe('2 साल 1 महीना');
  });

  test('omits the month part on a whole number of years', () => {
    expect(formatMonths(24, 'hi')).toBe('2 साल');
  });

  test('omits the year part below twelve months', () => {
    expect(formatMonths(10, 'hi')).toBe('10 महीने');
  });

  test('renders zero', () => {
    expect(formatMonths(0, 'hi')).toBe('0 महीने');
  });

  test('still defaults to English when no language is given', () => {
    expect(formatMonths(50)).toBe('4 years 2 months');
  });
});
