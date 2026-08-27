import { useLanguage } from '../i18n/LanguageProvider';
import type { StringKey } from '../i18n/strings';
import { ledgerSlots, ledgerSummary, type LedgerInput, type LedgerSlot } from '../lib/ledger';

const SLOT_CLASSES = {
  counted: 'border-counted',
  partial: 'border-counted',
  uncounted: 'border-dashed border-uncounted ledger-hatch',
  remaining: 'border-rule',
} as const;

const KEY_ITEMS: { label: StringKey; swatch: string }[] = [
  { label: 'ledgerCounting', swatch: 'bg-counted border-counted' },
  { label: 'ledgerNotCounting', swatch: 'border-dashed border-uncounted ledger-hatch' },
  { label: 'ledgerAhead', swatch: 'border-rule' },
];

function Slot({ slot, index }: { slot: LedgerSlot; index: number }) {
  return (
    <div
      className={`relative h-slot flex-1 overflow-hidden rounded-sm border-hair xs:h-slot-xs ${SLOT_CLASSES[slot.state]}`}
    >
      {slot.fill > 0 ? (
        <span
          className="ledger-fill absolute inset-x-0 bottom-0 block bg-counted"
          style={{ height: `${slot.fill * 100}%`, animationDelay: `${index * 40}ms` }}
        />
      ) : null}
    </div>
  );
}

export default function LedgerBar({ recognisedMonths, gapMonths, targetMonths }: LedgerInput) {
  const { t } = useLanguage();
  const input = { recognisedMonths, gapMonths, targetMonths };
  const slots = ledgerSlots(input);

  return (
    <div>
      <div role="img" aria-label={ledgerSummary(input)} className="flex gap-0.5 xs:gap-ledger">
        {slots.map((slot, index) => (
          <Slot key={slot.year} slot={slot} index={index} />
        ))}
      </div>

      <div aria-hidden="true" className="mt-2 flex justify-between text-caption text-ink-3">
        <span>Year 1</span>
        <span>Year {slots.length}</span>
      </div>

      <ul aria-hidden="true" className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-caption text-ink-2">
        {KEY_ITEMS.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span className={`h-3 w-3 shrink-0 rounded-sm border-hair ${item.swatch}`} />
            {t(item.label)}
          </li>
        ))}
      </ul>
    </div>
  );
}
