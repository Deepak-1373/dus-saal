import type { InputHTMLAttributes } from 'react';
import { useId } from 'react';

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'id'> {
  label: string;
  hint?: string;
  mono?: boolean;
}

export default function Field({ label, hint, mono = false, className = '', ...rest }: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-2 block text-body-s font-semibold text-ink">
        {label}
      </label>
      <input
        id={id}
        aria-describedby={hint ? hintId : undefined}
        className={`min-h-touch w-full rounded border border-rule bg-card px-3 text-body text-ink ${mono ? 'font-mono text-data' : ''} ${className}`}
        {...rest}
      />
      {hint ? (
        <p id={hintId} className="mt-2 text-caption text-ink-3">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
