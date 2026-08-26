import type { ButtonHTMLAttributes, ReactNode } from 'react';

const VARIANT_CLASSES = {
  primary: 'w-full rounded bg-indigo text-card hover:bg-indigo-dark active:bg-indigo-dark',
  text: 'text-indigo underline underline-offset-2 hover:text-indigo-dark',
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof VARIANT_CLASSES;
  children: ReactNode;
}

export default function Button({ variant = 'primary', className = '', children, ...rest }: ButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-touch items-center justify-center px-4 text-body font-semibold ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
