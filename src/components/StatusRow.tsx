import type { ReactNode } from 'react';
import { useLanguage } from '../i18n/LanguageProvider';
import type { StringKey } from '../i18n/strings';
import type { CheckStatus } from '../types';

const PRESENTATION = {
  pass: { glyph: '✓', word: 'statusPass' as StringKey, iconClass: 'bg-counted', wordClass: 'text-counted' },
  fail: { glyph: '!', word: 'statusFail' as StringKey, iconClass: 'bg-uncounted', wordClass: 'text-uncounted' },
  not_applicable: { glyph: '–', word: 'statusNotApplicable' as StringKey, iconClass: 'bg-ink-3', wordClass: 'text-ink-3' },
} as const satisfies Record<CheckStatus, unknown>;

interface StatusRowProps {
  status: CheckStatus;
  label: string;
  detail?: string;
  statusWord?: string;
  onClick?: () => void;
  children?: ReactNode;
}

export default function StatusRow({ status, label, detail, statusWord, onClick, children }: StatusRowProps) {
  const { t } = useLanguage();
  const { glyph, word, iconClass, wordClass } = PRESENTATION[status];
  const body = (
    <>
      <span
        aria-hidden="true"
        className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-caption font-bold text-card ${iconClass}`}
      >
        {glyph}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-body font-semibold text-ink">{label}</span>
        {detail ? <span className="mt-1 block text-caption text-ink-2">{detail}</span> : null}
        {/* Status is never colour alone: the word ships alongside the icon and hue. */}
        <span className={`mt-1 block text-label uppercase ${wordClass}`}>{statusWord ?? t(word)}</span>
        {children}
      </span>
      {onClick ? (
        <span aria-hidden="true" className="mt-1 shrink-0 self-start text-body-l text-ink-3">
          ›
        </span>
      ) : null}
    </>
  );

  // -mx-2 lets the hover fill bleed past the text so it never meets the chevron.
  const shared = 'flex w-full min-h-touch items-start gap-3 rounded border-b border-rule-2 -mx-2 px-2 py-3 text-left';

  return onClick ? (
    <button type="button" onClick={onClick} className={`${shared} hover:bg-indigo-bg`}>
      {body}
    </button>
  ) : (
    <div className={shared}>{body}</div>
  );
}
